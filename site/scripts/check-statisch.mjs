// Statische Prüfungen am Build-Ergebnis (04-tests.md: T-MARK, T-ERL, T-LINK offline, T-BUDGET, T-SCHEMA, T-3P).
// Aufruf: node scripts/check-statisch.mjs dist
import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { gzipSync } from 'node:zlib';
import path from 'node:path';
import { parse } from 'yaml';

const dist = path.resolve(process.argv[2] ?? 'dist');
const fakten = parse(readFileSync('../bauplan/fakten.yaml', 'utf8'));
const erteilt = fakten.erlaubnis.status.wert === 'erteilt';
const fehler = [];
const warn = [];
const html = [];
const lauf = (d) => { for (const f of readdirSync(d)) { const p = path.join(d, f); if (statSync(p).isDirectory()) lauf(p); else if (f.endsWith('.html')) html.push(p); } };
lauf(dist);
const rel = (p) => '/' + path.relative(dist, p).replace(/index\.html$/, '');
const gz = (p) => gzipSync(readFileSync(p)).length;
const idsCache = new Map();
const idsVon = (datei) => {
  if (!idsCache.has(datei)) idsCache.set(datei, new Set([...readFileSync(datei, 'utf8').matchAll(/\sid="([^"]+)"/g)].map((m) => m[1])));
  return idsCache.get(datei);
};
function zielDatei(pfad) {
  const p = path.join(dist, decodeURIComponent(pfad));
  if (pfad.endsWith('/')) return existsSync(path.join(p, 'index.html')) ? path.join(p, 'index.html') : null;
  if (existsSync(p) && statSync(p).isFile()) return p;
  if (/\.php$/.test(pfad) && existsSync(path.join('public', pfad))) return p;
  return null;
}

let links = 0;
for (const f of html) {
  const t = readFileSync(f, 'utf8');
  const u = rel(f);
  const noindex = /<meta name="robots" content="noindex/.test(t);
  // T-MARK
  if (/\[(LINUS|ZU PRÜFEN)/.test(t) || /<mark class="marker"/.test(t)) fehler.push(`${u}: offener Marker im HTML`);
  if (/\{\{/.test(t)) fehler.push(`${u}: unaufgelöster Platzhalter {{…}}`);
  if (/<!--[^>]*(LINUS|Umsetzung|JSON-LD|FAQPage-Schema|SPEZIFIKATION)/.test(t)) fehler.push(`${u}: interner HTML-Kommentar im HTML`);
  // T-ERL
  const sichtbar = t.replace(/<script[\s\S]*?<\/script>/g, '');
  if (erteilt && /(beantragt, aber noch nicht erteilt|ist beantragt|und noch nicht erteilt|Erlaubnis nach § 34c GewO beantragt)/.test(sichtbar)) fehler.push(`${u}: Erlaubnis als „beantragt“ beschrieben, obwohl fakten.yaml erlaubnis.status = erteilt`);
  if (!erteilt && /Beratungsgespr|Investor vorstell|jetzt beauftragen|Verkaufsplan (bekommen Sie )?sofort/.test(sichtbar)) fehler.push(`${u}: Formulierung aus der Vermeiden-Liste (07-recht-erlaubnis.md 9)`);
  // T-3P
  for (const m of t.matchAll(/<(?:script|link|img|source|iframe)\b[^>]*\b(?:src|href|srcset)="(https?:)?\/\/(?!roessler-immo\.de)[^"]+"/g)) {
    if (/rel="canonical"|property="og:/.test(m[0])) continue;
    fehler.push(`${u}: externe Ressource ${m[0].slice(0, 120)}`);
  }
  if (/fonts\.(googleapis|gstatic)|googletagmanager|google-analytics/.test(t)) fehler.push(`${u}: Google-Dienst referenziert`);
  // T-LINK (intern, inkl. Anker)
  for (const m of t.matchAll(/\s(?:href|src)="([^"]+)"/g)) {
    const h = m[1].replace(/&amp;/g, '&');
    if (/^(https?:|mailto:|tel:|data:)/.test(h)) continue;
    links++;
    const [p, anker] = h.split('#');
    const datei = p ? zielDatei(p.split('?')[0]) : f;
    if (!datei) { fehler.push(`${u}: Link-Ziel fehlt: ${h}`); continue; }
    if (anker && datei.endsWith('.html') && !idsVon(datei).has(decodeURIComponent(anker))) fehler.push(`${u}: Anker fehlt: ${h}`);
  }
  // T-SCHEMA
  const ld = [...t.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)];
  if (!noindex && !ld.length) fehler.push(`${u}: kein JSON-LD`);
  for (const [, j] of ld) {
    let g;
    try { g = JSON.parse(j); } catch (e) { fehler.push(`${u}: JSON-LD ungültig (${e.message})`); continue; }
    if (g['@context'] !== 'https://schema.org') fehler.push(`${u}: JSON-LD ohne @context`);
    const ids = new Set();
    for (const k of g['@graph'] ?? []) { if (k['@id'] && ids.has(k['@id'])) fehler.push(`${u}: doppelte @id ${k['@id']}`); ids.add(k['@id']); }
    const lauf2 = (o) => { if (o && typeof o === 'object') { if (Object.keys(o).length === 1 && o['@id'] && !ids.has(o['@id'])) fehler.push(`${u}: @id-Referenz ohne Knoten: ${o['@id']}`); Object.values(o).forEach(lauf2); } };
    for (const k of g['@graph'] ?? []) Object.entries(k).forEach(([key, v]) => key !== '@id' && lauf2(v));
    const faq = (g['@graph'] ?? []).find((k) => k['@type'] === 'FAQPage');
    const details = (t.match(/<details class="faq-frage"/g) ?? []).length;
    if ((faq?.mainEntity?.length ?? 0) !== details) fehler.push(`${u}: FAQPage hat ${faq?.mainEntity?.length ?? 0} Fragen, sichtbar sind ${details}`);
    if (j.includes('{{')) fehler.push(`${u}: Platzhalter im JSON-LD`);
    if (!erteilt && /hasCredential|Immobilienvermittlung/.test(j)) fehler.push(`${u}: Erlaubnis-Auszeichnung vor Erteilung`);
  }
  // H1
  const h1 = (t.match(/<h1[\s>]/g) ?? []).length;
  if (h1 !== 1) fehler.push(`${u}: ${h1} H1-Überschriften`);
  // T-BUDGET (gzip)
  const groesse = gz(f);
  const grenze = /quelle-1"/.test(t) ? 40 : 30;
  if (groesse > grenze * 1024) fehler.push(`${u}: HTML ${Math.round(groesse / 1024)} kB gzip > ${grenze} kB`);
  let css = 0, js = 0;
  for (const m of t.matchAll(/<link rel="stylesheet" href="([^"]+)"/g)) css += gz(path.join(dist, m[1]));
  for (const m of t.matchAll(/<script[^>]*\ssrc="([^"]+)"/g)) js += gz(path.join(dist, m[1]));
  if (css > 20 * 1024) fehler.push(`${u}: CSS ${Math.round(css / 1024)} kB gzip > 20 kB`);
  const jsGrenze = /<form/.test(t) ? 15 : 8;
  if (js > jsGrenze * 1024) fehler.push(`${u}: JS ${Math.round(js / 1024)} kB gzip > ${jsGrenze} kB`);
}
const schriften = readdirSync(path.join(dist, 'fonts')).filter((f) => f.endsWith('.woff2'));
const fontKb = schriften.reduce((a, f) => a + statSync(path.join(dist, 'fonts', f)).size, 0) / 1024;
if (schriften.length > 2 || fontKb > 90) fehler.push(`Schriften: ${schriften.length} Dateien, ${Math.round(fontKb)} kB (Budget 2 / 90 kB)`);
for (const f of readdirSync(path.join(dist, '_astro')).filter((x) => x.endsWith('.avif'))) if (statSync(path.join(dist, '_astro', f)).size > 160 * 1024) fehler.push(`AVIF über 160 kB: ${f}`);
// Sitemap nur indexierbare, gebaute Seiten
const sm = existsSync(path.join(dist, 'sitemap-0.xml')) ? readFileSync(path.join(dist, 'sitemap-0.xml'), 'utf8') : '';
for (const m of sm.matchAll(/<loc>https:\/\/roessler-immo\.de([^<]+)<\/loc>/g)) {
  const d = zielDatei(m[1]);
  if (!d) fehler.push(`Sitemap: ${m[1]} existiert nicht`);
  else if (/noindex/.test(readFileSync(d, 'utf8').slice(0, 3000))) fehler.push(`Sitemap: ${m[1]} ist noindex`);
}
if (!existsSync(path.join(dist, 'robots.txt'))) fehler.push('robots.txt fehlt');
if (!existsSync(path.join(dist, '404.html'))) fehler.push('404.html fehlt');

console.log(`check-statisch: ${html.length} Seiten, ${links} interne Verweise, Schriften ${Math.round(fontKb)} kB geprüft.`);
for (const w of warn) console.log('WARNUNG ' + w);
if (fehler.length) { console.error(fehler.map((x) => 'FEHLER ' + x).join('\n')); process.exit(1); }
console.log('check-statisch: alles grün (T-MARK, T-ERL, T-LINK intern, T-BUDGET, T-SCHEMA, T-3P).');
