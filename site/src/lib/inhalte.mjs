// Lädt alle Seiten (texte/*.md, texte/aktuell/*.md, site/src/content/**) und rendert ihr Markdown.
// Reines Node-ESM ohne Astro-Abhängigkeit, damit scripts/offen.mjs dieselbe Logik nutzt.
//
// Abweichung von 01-technik.md 3.1/3.2 (bewusst, texte/ darf derzeit nicht geändert werden):
// Statt einer Frontmatter-Migration werden fehlende Felder (typ, kurztitel, status, ort, rubrik)
// hier aus Dateiname und URL abgeleitet; die Erlaubnis-Sätze werden per Wortlaut-Abgleich durch
// den Baustein aus fakten.yaml ersetzt; Formular-Spezifikationen in den Texten werden durch das
// Formular ersetzt. Welche Seiten live gehen, steht in site/veroeffentlichen.yaml.
import { readFileSync, readdirSync, existsSync, statSync } from 'node:fs';
import path from 'node:path';
import { parse as parseYaml } from 'yaml';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';
import remarkRehype from 'remark-rehype';
import { toHtml } from 'hast-util-to-html';
import GithubSlugger from 'github-slugger';
import { REPO, loeseText, bausteinRoh, erlaubnisErteilt, bekannteWortlaute, ORTE, firma } from './fakten.mjs';

export const SITE = path.join(REPO, 'site');
export const MODUS = process.env.SITE_MODE === 'vorschau' ? 'vorschau' : 'produktion';
export const VORSCHAU = MODUS === 'vorschau';
export const BASIS_URL = 'https://roessler-immo.de';

// ---------------------------------------------------------------------------
// Quellen der Seiten
function mdDateien(dir) {
  if (!existsSync(dir)) return [];
  return readdirSync(dir).filter((f) => f.endsWith('.md') && !f.startsWith('_')).map((f) => path.join(dir, f));
}
function quellDateien() {
  const liste = [
    ...mdDateien(path.join(REPO, 'texte')),
    ...mdDateien(path.join(REPO, 'texte/aktuell')),
    ...mdDateien(path.join(SITE, 'inhalte/recht')),
    ...mdDateien(path.join(SITE, 'inhalte/seiten')),
  ];
  if (process.env.EXTRA_INHALTE) liste.push(...mdDateien(path.resolve(SITE, process.env.EXTRA_INHALTE)));
  return liste;
}

// ---------------------------------------------------------------------------
// Ableitungen (ersetzt die Frontmatter-Migration)
const KURZ = {
  start: 'Start', 'wohnung-verkaufen': 'Wohnung verkaufen', 'wohnung-bewerten': 'Wohnung bewerten',
  direktankauf: 'Direktankauf', 'ueber-mich': 'Über mich', kontakt: 'Kontakt', impressum: 'Impressum',
  datenschutz: 'Datenschutz', widerruf: 'Widerruf', ratgeber: 'Ratgeber', aktuell: 'Aktuelles',
};
const TYP = {
  start: 'start', 'wohnung-verkaufen': 'leistung', 'wohnung-bewerten': 'bewertung', direktankauf: 'ankauf',
  'ueber-mich': 'person', kontakt: 'kontakt', ratgeber: 'hub', aktuell: 'hub', '404': 'fehler',
};
const RUBRIK = {
  'eigentumswohnung-verkaufen': 'verkaufen', maklerprovision: 'verkaufen', 'ohne-makler-verkaufen': 'verkaufen',
  'sofortankauf-vs-makler': 'verkaufen', 'vermietete-wohnung-verkaufen': 'lebenssituationen',
  'geerbte-wohnung-verkaufen': 'lebenssituationen', 'wohnung-scheidung': 'lebenssituationen',
  'verkauf-im-alter': 'lebenssituationen', spekulationssteuer: 'recht-steuern', energieausweis: 'recht-steuern',
  'verkaufen-oder-vermieten': 'entscheiden',
};
export const RUBRIKEN = {
  verkaufen: 'Verkaufen', lebenssituationen: 'Lebenssituationen', 'recht-steuern': 'Recht und Steuern', entscheiden: 'Entscheiden',
};
const MONATE = ['januar', 'februar', 'märz', 'april', 'mai', 'juni', 'juli', 'august', 'september', 'oktober', 'november', 'dezember'];

function leiteAb(datei, fm) {
  const base = path.basename(datei, '.md');
  const ordner = path.basename(path.dirname(datei));
  let url = fm.url;
  if (!url) {
    if (base === 'start') url = '/';
    else if (base.startsWith('ort-')) url = `/wohnung-verkaufen/${base.slice(4)}/`;
    else if (base.startsWith('ratgeber-')) url = `/ratgeber/${base.slice(9)}/`;
    else if (ordner === 'aktuell') url = `/aktuell/${base}/`;
    else url = `/${base}/`;
  }
  let typ = fm.typ;
  if (!typ) {
    if (ordner === 'recht') typ = 'recht';
    else if (ordner === 'aktuell') typ = 'aktuell';
    else if (base.startsWith('ort-')) typ = 'ort';
    else if (base.startsWith('ratgeber-')) typ = 'ratgeber';
    else if (base.startsWith('danke-')) typ = 'danke';
    else typ = TYP[base] ?? 'seite';
  }
  const slug = url.split('/').filter(Boolean).pop() ?? 'start';
  const ort = fm.ort ?? (typ === 'ort' ? slug : undefined);
  let kurztitel = fm.kurztitel ?? KURZ[base] ?? (ort ? ORTE[ort] : undefined);
  if (!kurztitel) kurztitel = String(fm.title ?? base).split(/[:|]/)[0].trim().slice(0, 40);
  const st = String(fm.status ?? 'entwurf').toLowerCase();
  const status = st.startsWith('entwurf') ? 'entwurf' : st.startsWith('prüf') ? 'prüfung' : st.startsWith('veröffentlicht') ? 'veröffentlicht' : 'entwurf';
  // stand: Datum oder "Oktober 2026"
  let standIso, standText;
  const s = fm.stand instanceof Date ? fm.stand.toISOString().slice(0, 10) : String(fm.stand ?? '');
  if (/^\d{4}-\d{2}-\d{2}$/.test(s)) {
    standIso = s;
    const d = new Date(s + 'T12:00:00Z');
    standText = `${MONATE[d.getUTCMonth()][0].toUpperCase()}${MONATE[d.getUTCMonth()].slice(1)} ${d.getUTCFullYear()}`;
  } else {
    const m = s.toLowerCase().match(/([a-zä]+)\s+(\d{4})/);
    standText = s || 'Oktober 2026';
    if (m && MONATE.includes(m[1])) {
      const mo = MONATE.indexOf(m[1]);
      // Datum "zuletzt geprüft" ist im Text nicht angegeben: Monat Oktober 2026 → 2026-10-29 (01-technik.md 3.2), sonst Monatsende
      standIso = mo === 9 && m[2] === '2026' ? '2026-10-29' : new Date(Date.UTC(+m[2], mo + 1, 0)).toISOString().slice(0, 10);
    } else standIso = '2026-10-29';
  }
  return {
    url, typ, kurztitel, status, ort, standIso, standText,
    rubrik: fm.rubrik ?? (typ === 'ratgeber' ? RUBRIK[slug] : undefined),
    noindex: fm.noindex === true || typ === 'danke' || typ === 'fehler',
    id: fm.id, reihenfolge: fm.reihenfolge,
    veroeffentlichtAm: fm.veroeffentlicht_am ? String(fm.veroeffentlicht_am instanceof Date ? fm.veroeffentlicht_am.toISOString().slice(0, 10) : fm.veroeffentlicht_am) : undefined,
    aktualisiertAm: fm.aktualisiert_am ? String(fm.aktualisiert_am instanceof Date ? fm.aktualisiert_am.toISOString().slice(0, 10) : fm.aktualisiert_am) : undefined,
  };
}

function leseDatei(datei) {
  const roh = readFileSync(datei, 'utf8').replace(/\r\n/g, '\n');
  const m = roh.match(/^---\n([\s\S]*?)\n---\n?/);
  let fm = {};
  if (m) {
    try { fm = parseYaml(m[1]) ?? {}; } catch {
      // Texte haben teils kein striktes YAML („title: Kontakt: …“): zeilenweise lesen
      for (const z of m[1].split('\n')) {
        const k = z.match(/^([a-z_]+):\s?(.*)$/);
        if (k) fm[k[1]] = k[2].replace(/^"(.*)"$/, '$1');
      }
    }
  }
  const body = m ? roh.slice(m[0].length) : roh;
  const zeilenOffset = m ? m[0].split('\n').length - 1 : 0;
  const fmZeilen = {};
  if (m) m[1].split('\n').forEach((z, i) => { const k = z.match(/^([a-z_]+):/); if (k) fmZeilen[k[1]] = i + 2; });
  return { fm, body, zeilenOffset, fmZeilen };
}

// ---------------------------------------------------------------------------
// Veröffentlichung
export function leseVeroeffentlichen() {
  const datei = process.env.VEROEFFENTLICHEN ? path.resolve(SITE, process.env.VEROEFFENTLICHEN) : path.join(SITE, 'veroeffentlichen.yaml');
  if (!existsSync(datei)) return { datei, urls: [] };
  const y = parseYaml(readFileSync(datei, 'utf8')) ?? {};
  return { datei, urls: (y.seiten ?? []).map(String) };
}

let _alle = null;
/** Alle Seiten mit Metadaten (ohne Rendering). */
export function alleSeiten() {
  if (_alle) return _alle;
  const seiten = [];
  const urls = new Map();
  for (const datei of quellDateien()) {
    const { fm, body, zeilenOffset, fmZeilen } = leseDatei(datei);
    const meta = leiteAb(datei, fm);
    if (urls.has(meta.url)) throw new Error(`Doppelte URL ${meta.url}: ${urls.get(meta.url)} und ${datei}`);
    urls.set(meta.url, datei);
    seiten.push({ ...meta, datei, relDatei: path.relative(REPO, datei), fm, body, zeilenOffset, fmZeilen });
  }
  const { datei: vDatei, urls: vUrls } = leseVeroeffentlichen();
  for (const u of vUrls) if (!urls.has(u)) throw new Error(`${path.relative(REPO, vDatei)}: unbekannte URL ${u}`);
  const gewuenscht = new Set(vUrls);
  for (const s of seiten) {
    s.gewuenscht = gewuenscht.has(s.url);
    if (VORSCHAU) s.gebaut = true;
    else if (s.typ === 'fehler') s.gebaut = true;
    else if (s.typ === 'danke') s.gebaut = gewuenscht.has(s.url.replace(/danke\/$/, '')); // Danke-Seite folgt ihrer Formularseite
    else s.gebaut = gewuenscht.has(s.url);
  }
  _alle = seiten;
  return seiten;
}
export const seiteFuer = (url) => alleSeiten().find((s) => s.url === url);
export const istGebaut = (url) => !!seiteFuer(url)?.gebaut;

// ---------------------------------------------------------------------------
// Vorverarbeitung auf Textebene (mit Token für Marker, Fußnoten, Bausteine, Formulare)
const T0 = '', T1 = '';
const TOKEN = /([A-Z])([^]*)/g;
const tok = (art, inhalt = '') => `${T0}${art}${inhalt}${T1}`;

/** Findet [LINUS: …] / [ZU PRÜFEN: …] mit verschachtelten Klammern. */
export function findeMarker(text) {
  const funde = [];
  const re = /\[(LINUS|ZU PRÜFEN)\b/g;
  let m;
  while ((m = re.exec(text))) {
    let tiefe = 0, ende = -1;
    for (let i = m.index; i < text.length; i++) {
      if (text[i] === '[') tiefe++;
      else if (text[i] === ']') { tiefe--; if (tiefe === 0) { ende = i; break; } }
    }
    if (ende < 0) ende = text.indexOf('\n', m.index) > 0 ? text.indexOf('\n', m.index) - 1 : text.length - 1;
    funde.push({ start: m.index, ende: ende + 1, art: m[1] === 'LINUS' ? 'linus' : 'pruefen', text: text.slice(m.index, ende + 1) });
    re.lastIndex = ende + 1;
  }
  return funde;
}
const zeileVon = (text, index) => text.slice(0, index).split('\n').length;
// Wortlaut-Regex: tolerant gegenüber Zeilenumbrüchen und einem eingeschobenen Marker (z. B. in ueber-mich.md)
const wsRegex = (s) => new RegExp(s.trim().split(/\s+|(?=[.,;:])/).filter(Boolean)
  .map((w) => w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))
  .join('(?:\\s*\\[(?:LINUS|ZU PRÜFEN):[^\\]]*\\])?\\s*'), 'g');

function vorverarbeite(seite, ctx) {
  let t = seite.body;
  // 1. Formular-Spezifikation (Kommentarblock in wohnung-bewerten.md) wird zum Formular
  t = t.replace(/<!--(?:(?!-->)[^])*?SPEZIFIKATION FÜR DIE ENTWICKLUNG[^]*?-->/g, (k) => '\n' + tok('X', 'bewertung') + '\n' + '\n'.repeat(Math.max(0, k.split('\n').length - 3)));
  // 2. HTML-Kommentare entfernen, Zeilenzahl erhalten
  t = t.replace(/<!--[^]*?-->/g, (k) => '\n'.repeat(k.split('\n').length - 1));
  // 2b. Anker-Zeilen <a id="x"></a> (sonst schluckt der HTML-Block die folgende Überschrift)
  t = t.replace(/^<a id="([a-z0-9-]+)"><\/a>[ \t]*$/gm, (_, id) => tok('A', id));
  // 3. Direktiven ::formular{typ="…"} und ::erlaubnis{baustein="…"} (für neue Texte)
  t = t.replace(/^::formular\{typ="?(\w+)"?\}\s*$/gm, (_, x) => tok('X', x));
  t = t.replace(/^::erlaubnis\{baustein="?([a-e])"?\}\s*$/gm, (_, x) => tok('E', x));
  // 4. Platzhalter {{fakten.…}} auflösen (Fehler bei unbekanntem Pfad, Probleme werden zu Markern)
  t = loeseText(t);
  // 5. Erlaubnis-Sätze, die literal im Text stehen, durch den Baustein ersetzen
  for (const w of bekannteWortlaute()) t = t.replace(wsRegex(w.text), () => tok('E', w.baustein));
  // 5b. Nach Erteilung (Baustein F): Byline-Zusatz „beantragt“ entfällt, wo er noch im Fließtext steht
  if (erlaubnisErteilt) t = t.replace(/Erlaubnis nach § 34c GewO beantragt/g, 'Erlaubnis nach § 34c GewO');
  // 6. Marker
  const funde = findeMarker(t);
  for (let i = funde.length - 1; i >= 0; i--) {
    const f = funde[i];
    const id = ctx.marker.length + i;
    ctx.markerRoh[id] = { art: f.art, text: f.text.replace(/\s+/g, ' '), zeile: zeileVon(t, f.start) + seite.zeilenOffset };
    t = t.slice(0, f.start) + tok('M', String(id)) + t.slice(f.ende);
  }
  // 7. Fußnoten [n] und [2][4]
  t = t.replace(/((?:\[\d{1,2}\])+)(?![(:])/g, (m) => tok('F', m.slice(1, -1).split('][').join(',')));
  // 8. Buttons, Pfeil-Links, Downloads
  t = t.replace(/\*\*\[Button:\s*([^\]]+?)\s*→\s*([^\]\s]+)\s*\]\*\*/g, (_, txt, url) => url === 'POST' ? tok('P') : `[${txt}](${url} "btn")`);
  t = t.replace(/\[Download:\s*([^\]]+?)\s*→\s*([^\]\s]+)\s*\]/g, (_, txt, url) => `[${txt}](${url} "download")`);
  t = t.replace(/(?<!!)\[([^\]\n]*?)\s*→\s*([^\]\s]+)\s*\](?!\()/g, (_, txt, url) => `[${txt.trim() || 'Weiterlesen'}](${url} "pfeil")`);
  return t;
}

// ---------------------------------------------------------------------------
// mdast-Hilfen
const textVon = (n) => (n.type === 'text' || n.type === 'inlineCode' ? n.value : (n.children ?? []).map(textVon).join(''));
const ohneToken = (s) => s.replace(TOKEN, '').replace(/\s+/g, ' ').trim();

function mdastUmbau(baum, seite, ctx) {
  const k = baum.children;
  // a) Byline "*Stand: … · Von Linus Rössler …*" unter der H1 entfernen (SeitenMeta erzeugt sie)
  for (let i = 0; i < k.length; i++) {
    const n = k[i];
    // auch die Variante der Ortsseiten: "*Linus Rössler, Makler … · Stand Oktober 2026 · Erlaubnis … · [Über mich](/ueber-mich/)*"
    if (i < 4 && n.type === 'paragraph' && n.children.length === 1 && n.children[0].type === 'emphasis' && /(^Stand:|· Stand )/.test(textVon(n))) { k.splice(i, 1); i--; }
  }
  // b) Abschnitte "Text für …" (Danke-Text-Vorlagen in kontakt.md) entfernen
  for (let i = 0; i < k.length; i++) {
    if (k[i].type === 'heading' && k[i].depth === 2 && /^Text für /.test(textVon(k[i]))) {
      let j = i + 1;
      while (j < k.length && !(k[j].type === 'heading' && k[j].depth <= 2)) j++;
      let start = i;
      if (k[i - 1]?.type === 'thematicBreak') start--;
      k.splice(start, j - start);
      i = start - 1;
    }
  }
  // c) Formular-Spezifikationen: Feldtabelle (Kopf "Feld") bzw. Feldliste vor dem POST-Button
  const formTyp = seite.typ === 'ankauf' ? 'ankauf' : seite.typ === 'bewertung' ? 'bewertung' : 'kontakt';
  const formKnoten = (typ) => ({ type: 'paragraph', children: [{ type: 'text', value: tok('X', typ) }] });
  for (let i = 0; i < k.length; i++) {
    const n = k[i];
    if (n.type === 'table' && /^Feld$/i.test(textVon(n.children[0].children[0]).trim())) {
      k.splice(i, 1, formKnoten(formTyp));
      // Folgeabsatz "Unter dem Formular: …" ist ebenfalls Spezifikation
      if (k[i + 1]?.type === 'paragraph' && /^Unter dem Formular:/.test(textVon(k[i + 1]))) k.splice(i + 1, 1);
    }
    if (n.type === 'paragraph' && ohneToken(textVon(n)) === '' && textVon(n).includes(tok('P'))) {
      if (k[i - 1]?.type === 'list') { k.splice(i - 1, 2, formKnoten(formTyp)); i--; }
      else k.splice(i, 1, formKnoten(formTyp));
    }
  }
  // d) Überschriften mit {#anker}
  const lauf = (n) => {
    if (n.type === 'heading') {
      const letzt = n.children[n.children.length - 1];
      if (letzt?.type === 'text') {
        const m = letzt.value.match(/\s*\{#([a-z0-9-]+)\}\s*$/);
        if (m) { letzt.value = letzt.value.slice(0, m.index); n.data = { ...(n.data ?? {}), hProperties: { id: m[1] } }; }
      }
    }
    (n.children ?? []).forEach(lauf);
  };
  lauf(baum);
  // e) FAQ-Abschnitte → <details>
  for (let i = 0; i < k.length; i++) {
    const h = k[i];
    if (h.type !== 'heading' || h.depth > 3 || !/^Häufige Fragen/i.test(textVon(h))) continue;
    let j = i + 1;
    while (j < k.length && !(k[j].type === 'heading' && k[j].depth <= h.depth)) j++;
    const block = k.slice(i + 1, j);
    const fragen = [];
    const vorher = [];
    const unterH = block.some((n) => n.type === 'heading' && n.depth === h.depth + 1);
    for (const n of block) {
      const istFrageH = unterH && n.type === 'heading' && n.depth === h.depth + 1;
      const istFrageP = !unterH && n.type === 'paragraph' && n.children[0]?.type === 'strong' && /\?\s*$/.test(textVon(n.children[0]));
      if (istFrageH) fragen.push({ frage: n.children, antwort: [] });
      else if (istFrageP) {
        const rest = n.children.slice(1);
        while (rest.length && (rest[0].type === 'break' || (rest[0].type === 'text' && !rest[0].value.trim()))) rest.shift();
        if (rest[0]?.type === 'text') rest[0] = { ...rest[0], value: rest[0].value.replace(/^\s+/, '') };
        fragen.push({ frage: n.children[0].children, antwort: rest.length ? [{ type: 'paragraph', children: rest }] : [] });
      } else if (fragen.length) fragen[fragen.length - 1].antwort.push(n);
      else vorher.push(n);
    }
    if (!fragen.length) continue;
    const faq = {
      type: 'faqListe', data: { hName: 'div', hProperties: { className: ['faq'] } },
      children: fragen.map((f) => ({
        type: 'faqFrage', data: { hName: 'details', hProperties: { className: ['faq-frage'] } },
        children: [
          { type: 'faqSummary', data: { hName: 'summary' }, children: f.frage },
          { type: 'faqAntwort', data: { hName: 'div', hProperties: { className: ['faq-antwort'] } }, children: f.antwort },
        ],
      })),
    };
    k.splice(i + 1, j - i - 1, ...vorher, faq);
  }
}

// ---------------------------------------------------------------------------
// hast-Hilfen
const el = (tagName, properties = {}, children = []) => ({ type: 'element', tagName, properties, children });
const txt = (value) => ({ type: 'text', value });
const hText = (n) => (n.type === 'text' ? n.value : (n.children ?? []).map(hText).join(''));
const klassen = (n) => [].concat(n.properties?.className ?? []);
const addKlasse = (n, ...k) => { n.properties.className = [...klassen(n), ...k]; };
function walk(n, f, eltern = null, index = 0) {
  if (f(n, eltern, index) === false) return;
  const kids = n.children ?? [];
  for (let i = 0; i < kids.length; i++) walk(kids[i], f, n, i);
}
const translit = (s) => s.replace(/ä/g, 'ae').replace(/ö/g, 'oe').replace(/ü/g, 'ue').replace(/ß/g, 'ss');

const ICON_TEL = el('svg', { className: ['icon'], viewBox: '0 0 24 24', width: 18, height: 18, ariaHidden: 'true', focusable: 'false' },
  [el('path', { fill: 'currentColor', d: 'M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25 11.4 11.4 0 0 0 3.6.57 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.45.57 3.57a1 1 0 0 1-.25 1z' })]);
export { ICON_TEL };

/** Prüft ein internes Linkziel. Rückgabe: 'ok' | 'unveroeffentlicht' | 'fehlt' */
function linkZiel(href) {
  const p = href.split('#')[0].split('?')[0];
  if (!p) return 'ok';
  const seite = seiteFuer(p.endsWith('/') ? p : p + '/');
  if (seite) return seite.gebaut ? 'ok' : 'unveroeffentlicht';
  if (existsSync(path.join(SITE, 'public', p)) && statSync(path.join(SITE, 'public', p)).isFile()) return 'ok';
  return 'fehlt';
}

function hastUmbau(baum, seite, ctx) {
  const slugger = new GithubSlugger();
  const ids = new Set();
  walk(baum, (n) => { if (n.type === 'element' && n.properties?.id) ids.add(n.properties.id); });

  // Token in Textknoten ersetzen
  const fnZaehler = {};
  const inlineAusText = (wert, zeileHinweis) => {
    // für Bausteine: Text mit Marker-Strings → Knoten
    const funde = findeMarker(wert);
    const out = [];
    let pos = 0;
    for (const f of funde) {
      if (f.start > pos) out.push(txt(wert.slice(pos, f.start)));
      out.push(markerKnoten({ art: f.art, text: f.text, zeile: zeileHinweis }));
      pos = f.ende;
    }
    if (pos < wert.length) out.push(txt(wert.slice(pos)));
    return out;
  };
  const markerKnoten = (m) => {
    ctx.marker.push(m);
    return el('mark', { className: ['marker'], dataArt: m.art }, [txt(m.text)]);
  };
  const ersetze = (wert) => {
    const out = [];
    let pos = 0;
    for (const m of wert.matchAll(TOKEN)) {
      if (m.index > pos) out.push(txt(wert.slice(pos, m.index)));
      const [, art, inhalt] = m;
      if (art === 'M') out.push(markerKnoten(ctx.markerRoh[+inhalt]));
      else if (art === 'F') {
        const nummern = inhalt.split(',').map(Number);
        const kids = [];
        nummern.forEach((n, i) => {
          ctx.fussnoten.add(n);
          fnZaehler[n] = (fnZaehler[n] ?? 0) + 1;
          if (i) kids.push(txt(', '));
          kids.push(el('a', { href: `#quelle-${n}`, id: `fn-${n}-${fnZaehler[n]}`, ariaLabel: `Quelle ${n}` }, [txt(String(n))]));
        });
        out.push(el('sup', { className: ['fn'] }, kids));
      } else if (art === 'E') {
        const roh = bausteinRoh(inhalt);
        ctx.bausteine.push(inhalt);
        if (roh) out.push(el('span', { className: ['erlaubnis'], dataBaustein: inhalt }, inlineAusText(loeseText(roh), null)));
      } else if (art === 'X') out.push(el('span', { dataFormular: inhalt }));
      else if (art === 'A') out.push(el('span', { id: inhalt, className: ['anker'] }));
      // 'P' wurde im mdast entfernt
      pos = m.index + m[0].length;
    }
    if (pos < wert.length) out.push(txt(wert.slice(pos)));
    return out;
  };
  walk(baum, (n) => {
    if (!n.children) return;
    for (let i = 0; i < n.children.length; i++) {
      const c = n.children[i];
      if (c.type === 'text' && c.value.includes(T0)) {
        const neu = ersetze(c.value);
        n.children.splice(i, 1, ...neu);
        i += neu.length - 1;
      }
    }
  });

  // Blockebene: Absätze nur aus Formular / Baustein / Marker
  walk(baum, (n) => {
    if (!n.children) return;
    for (let i = 0; i < n.children.length; i++) {
      const p = n.children[i];
      if (p.type !== 'element' || p.tagName !== 'p') continue;
      const inhalt = p.children.filter((c) => !(c.type === 'text' && !c.value.trim()));
      if (inhalt.length >= 1 && inhalt.every((c) => klassen(c).includes('anker'))) {
        n.children.splice(i, 1, ...inhalt); i += inhalt.length - 1;
      } else if (inhalt.length === 1 && inhalt[0].properties?.dataFormular) {
        n.children[i] = el('div', { dataFormular: inhalt[0].properties.dataFormular });
      } else if (inhalt.length >= 1 && inhalt[0].properties?.dataBaustein) {
        const b = inhalt[0];
        p.children = [...b.children, ...p.children.slice(p.children.indexOf(b) + 1)];
        p.properties.className = ['hinweis', 'hinweis-erlaubnis'];
        p.properties.dataBaustein = b.properties.dataBaustein;
      } else if (inhalt.length === 0 && p.children.length === 0) {
        n.children.splice(i, 1); i--;
      } else if (inhalt.length === 1 && inhalt[0].tagName === 'mark') addKlasse(p, 'marker-absatz');
    }
  });

  // Überschriften-IDs (github-slugger wie in den Textlinks) plus umlautfreier Zweitanker
  walk(baum, (n, eltern, index) => {
    if (n.type !== 'element' || !/^h[1-6]$/.test(n.tagName)) return;
    const titel = hText(n).replace(/\s+/g, ' ').trim();
    if (!n.properties.id) {
      n.properties.id = slugger.slug(titel);
      ids.add(n.properties.id);
    } else slugger.slug(titel);
    const alias = translit(n.properties.id);
    if (alias !== n.properties.id && !ids.has(alias)) {
      ids.add(alias);
      n.children.unshift(el('span', { id: alias, className: ['anker'] }));
    }
  });

  // Links
  walk(baum, (n, eltern, index) => {
    if (n.type !== 'element' || n.tagName !== 'a' || !n.properties.href) return;
    const href = String(n.properties.href);
    const titel = n.properties.title;
    delete n.properties.title;
    if (titel === 'btn') n.properties.dataBtn = '1';
    if (titel === 'pfeil') n.children.push(txt(' '), el('span', { ariaHidden: 'true' }, [txt('→')]));
    if (titel === 'download') n.properties.download = true;
    if (/^https?:\/\//.test(href)) { n.properties.rel = 'noopener'; return; }
    if (href.startsWith('/')) {
      const z = linkZiel(href);
      if (z === 'ok') return;
      const info = { href, text: hText(n).trim() };
      if (z === 'unveroeffentlicht') {
        ctx.linksAufUnveroeffentlicht.push(info);
        // Buttons und reine "Weiterlesen"-Links entfallen, sonst bleibt der Text stehen (01-technik.md 7.3)
        if (titel === 'btn' || titel === 'pfeil' && /^Weiterlesen|^→/.test(info.text)) eltern.children.splice(index, 1);
        else eltern.children.splice(index, 1, ...n.children.filter((c) => !(c.tagName === 'span' && c.properties?.ariaHidden)));
        return false;
      }
      ctx.linksFehlend.push(info);
      if (VORSCHAU) {
        eltern.children.splice(index, 1, markerKnoten({ art: 'link', text: `${info.text} [Linkziel fehlt: ${href}]`, zeile: null }));
        ctx.marker.pop(); // fehlende Linkziele zählen separat (ctx.linksFehlend)
      } else eltern.children.splice(index, 1, ...n.children);
      return false;
    }
  });

  // Button-Absätze → .cta-reihe, erster primär
  walk(baum, (n) => {
    if (n.type !== 'element' || n.tagName !== 'p') return;
    const echt = n.children.filter((c) => !(c.type === 'text' && !c.value.trim()) && !(c.tagName === 'br'));
    const buttons = echt.filter((c) => c.tagName === 'a' && c.properties.dataBtn);
    if (!buttons.length) return;
    if (buttons.length === echt.length) {
      n.tagName = 'div';
      n.properties.className = ['actions', 'cta-reihe'];
      n.children = buttons;
    }
    buttons.forEach((b, i) => {
      const erster = i === 0 && n.tagName === 'div';
      b.properties.className = erster ? ['btn', 'btn-primaer'] : ['btn', 'line', 'btn-sekundaer'];
      delete b.properties.dataBtn;
      if (String(b.properties.href).startsWith('tel:')) b.children.unshift(structuredClone(ICON_TEL));
    });
  });
  // aufeinanderfolgende cta-reihen zusammenfassen (zwei Button-Zeilen hintereinander)
  walk(baum, (n) => {
    if (!n.children) return;
    for (let i = 0; i < n.children.length - 1; i++) {
      const a = n.children[i];
      let j = i + 1;
      while (n.children[j]?.type === 'text' && !n.children[j].value.trim()) j++;
      const b = n.children[j];
      if (a.tagName === 'div' && klassen(a).includes('cta-reihe') && b?.tagName === 'div' && klassen(b).includes('cta-reihe')) {
        b.children.forEach((x) => { x.properties.className = ['btn', 'line', 'btn-sekundaer']; });
        a.children.push(...b.children);
        n.children.splice(i + 1, j - i);
        i--;
      }
    }
  });

  // Tabellen: scrollbarer, fokussierbarer, benannter Container; scope; leere Kopfzellen
  let letzteUeberschrift = seite.kurztitel;
  walk(baum, (n, eltern, index) => {
    if (n.type === 'element' && /^h[2-4]$/.test(n.tagName)) letzteUeberschrift = hText(n).trim();
    if (n.type !== 'element' || n.tagName !== 'table' || !eltern) return;
    walk(n, (c) => {
      if (c.tagName === 'th') {
        c.properties.scope = 'col';
        if (!hText(c).trim()) c.children = [el('span', { className: ['sr-only'] }, [txt('Merkmal')])];
      }
    });
    addKlasse(n, 'compare');
    eltern.children[index] = el('div', { className: ['tablewrap', 'tabelle'], role: 'region', tabIndex: 0, ariaLabel: `Tabelle: ${letzteUeberschrift}` }, [n]);
    return false;
  });

  // Quellenliste
  let inQuellen = false;
  const kids = baum.children;
  for (let i = 0; i < kids.length; i++) {
    const n = kids[i];
    if (n.type === 'element' && n.tagName === 'h2') inQuellen = /^Quellen/.test(hText(n));
    if (inQuellen && n.type === 'element' && n.tagName === 'ol') {
      addKlasse(n, 'quellen');
      let nr = Number(n.properties.start ?? 1);
      for (const li of n.children.filter((c) => c.tagName === 'li')) {
        li.properties.id = `quelle-${nr}`;
        ctx.quellen.push({ nr, text: hText(li).replace(/\s+/g, ' ').trim(), url: (hText(li).match(/https?:\/\/[^\s;,)]+/) ?? [])[0] });
        // nackte URLs verlinken
        walk(li, (c, el2, idx) => {
          if (c.type === 'element' && c.tagName === 'a') return false;
          if (c.type !== 'text' || !el2) return;
          const teile = c.value.split(/(https?:\/\/[^\s;,)]+[^\s;,.)])/);
          if (teile.length === 1) return;
          el2.children.splice(idx, 1, ...teile.map((t, k) => (k % 2 ? el('a', { href: t, rel: 'noopener' }, [txt(t)]) : txt(t))));
        });
        if (ctx.fussnoten.has(nr)) li.children.push(txt(' '), el('a', { href: `#fn-${nr}-1`, className: ['zurueck'], ariaLabel: `Zurück zur Fundstelle von Quelle ${nr}` }, [txt('↩')]));
        nr++;
      }
    }
  }

  // Listen-Gestaltung wie die Live-Seite: nummerierte Schritte mit fettem Anfang → .items
  walk(baum, (n) => {
    if (n.type !== 'element' || (n.tagName !== 'ol' && n.tagName !== 'ul') || klassen(n).includes('quellen')) return;
    const lis = n.children.filter((c) => c.tagName === 'li');
    const fett = lis.length >= 3 && lis.every((li) => {
      const erstes = (li.children.find((c) => c.tagName === 'p') ?? li).children.find((c) => !(c.type === 'text' && !c.value.trim()));
      return erstes?.tagName === 'strong';
    });
    if (fett) addKlasse(n, n.tagName === 'ol' ? 'schritte' : 'kacheln');
  });
}

// ---------------------------------------------------------------------------
// Rendering einer Seite
const cache = new Map();

export function rendere(seite) {
  if (cache.has(seite.url)) return cache.get(seite.url);
  const ctx = { marker: [], markerRoh: {}, fussnoten: new Set(), quellen: [], bausteine: [], linksAufUnveroeffentlicht: [], linksFehlend: [], faq: [] };
  // Marker in title/description
  const titel = loeseText(seite.fm.title ?? seite.kurztitel);
  const beschreibung = loeseText(seite.fm.description ?? '');
  for (const [feld, wert] of [['title', titel], ['description', beschreibung]]) {
    for (const f of findeMarker(wert)) ctx.marker.push({ art: f.art, text: f.text, zeile: seite.fmZeilen[feld] ?? 1 });
  }
  const md = vorverarbeite(seite, ctx);
  const proc = unified().use(remarkParse).use(remarkGfm);
  const mdast = proc.runSync(proc.parse(md));
  mdastUmbau(mdast, seite, ctx);
  const hast = unified().use(remarkRehype, {
    handlers: {
      html(state, node) {
        const m = node.value.trim().match(/^<a id="([^"]+)"><\/a>$/);
        if (m) return el('span', { id: m[1], className: ['anker'] });
        ctx.rohHtml = (ctx.rohHtml ?? 0) + 1;
        return undefined;
      },
    },
  }).runSync(mdast);
  hastUmbau(hast, seite, ctx);

  // FAQ-Daten für JSON-LD (aus denselben Knoten wie die sichtbare FAQ)
  walk(hast, (n) => {
    if (n.type === 'element' && n.tagName === 'details' && klassen(n).includes('faq-frage')) {
      const [sum, antw] = n.children.filter((c) => c.type === 'element');
      const sauber = structuredClone(antw);
      walk(sauber, (c, e, i) => {
        if (c.type === 'element' && (c.tagName === 'sup' || c.tagName === 'mark')) { e.children.splice(i, 1); return false; }
        if (c.type === 'element' && c.tagName === 'a' && String(c.properties.href).startsWith('/')) c.properties.href = BASIS_URL + c.properties.href;
        if (c.type === 'element' && c.tagName === 'a' && String(c.properties.href).startsWith('#')) c.properties.href = BASIS_URL + seite.url + c.properties.href;
      });
      ctx.faq.push({ frage: hText(sum).replace(/\s+/g, ' ').trim(), antwort: toHtml(sauber.children).replace(/\s+/g, ' ').replace(/ class="[^"]*"/g, '').trim() });
    }
  });

  // Gliederung: H1, Intro (bis zur ersten H2), Abschnitte je H2
  const top = hast.children.filter((c) => !(c.type === 'text' && !c.value.trim()));
  let h1 = null;
  const intro = [];
  const abschnitte = [];
  for (const n of top) {
    if (n.tagName === 'h1' && !h1) { h1 = n; continue; }
    if (n.tagName === 'h2') { abschnitte.push({ kopf: n, inhalt: [] }); continue; }
    if (!abschnitte.length) intro.push(n); else abschnitte[abschnitte.length - 1].inhalt.push(n);
  }
  const teile = (knoten) => {
    // trennt an Formular-Platzhaltern: [{html}|{formular}]
    const out = [];
    let puffer = [];
    for (const n of knoten) {
      if (n.properties?.dataFormular) { if (puffer.length) out.push({ html: toHtml(puffer) }); puffer = []; out.push({ formular: n.properties.dataFormular }); }
      else puffer.push(n);
    }
    if (puffer.length) out.push({ html: toHtml(puffer) });
    return out;
  };
  // Hero-Bestandteile aus dem Intro: Lead (erster Absatz), Orte-Zeile, Buttons, Erlaubnis-Hinweis
  const hero = { lead: null, region: null, actions: null, hinweis: null };
  const restIntro = [];
  const ortsZeile = (n) => n.tagName === 'p' && Object.values(ORTE).every((o) => hText(n).includes(o)) && hText(n).includes('·') && hText(n).length < 90;
  for (const n of intro) {
    if (!hero.region && ortsZeile(n)) { addKlasse(n, 'region'); hero.region = n; }
    else if (!hero.actions && !restIntro.length && klassen(n).includes('cta-reihe')) hero.actions = n;
    else if (!hero.hinweis && !restIntro.length && klassen(n).includes('hinweis-erlaubnis')) hero.hinweis = n;
    else if (!hero.lead && !restIntro.length && n.tagName === 'p' && !n.properties?.dataFormular && !klassen(n).includes('marker-absatz')) { addKlasse(n, 'lede'); hero.lead = n; }
    else restIntro.push(n);
  }
  const woerter = hText(hast).split(/\s+/).filter(Boolean).length;
  const erg = {
    titel, beschreibung,
    h1Html: h1 ? toHtml(h1.children) : seite.kurztitel,
    h1Text: h1 ? hText(h1).replace(/\s+/g, ' ').trim() : seite.kurztitel,
    h1Id: h1?.properties?.id,
    hero: Object.fromEntries(Object.entries(hero).map(([k, v]) => [k, v ? toHtml(v) : null])),
    intro: teile(restIntro),
    introAlles: teile(intro),
    abschnitte: abschnitte.map((a) => {
      const t = hText(a.kopf).trim();
      return {
        id: a.kopf.properties.id, titel: t, kopfHtml: toHtml(a.kopf),
        teile: teile(a.inhalt),
        art: /^Quellen/.test(t) ? 'quellen' : /^(Sprechen wir|Nächster Schritt)/.test(t) ? 'kontakt' : /^Häufige Fragen/.test(t) ? 'faq' : /^Inhalt$/.test(t) ? 'inhalt' : 'normal',
        kacheln: a.inhalt.some((c) => klassen(c).includes('kacheln')),
      };
    }),
    faq: ctx.faq, quellen: ctx.quellen, marker: ctx.marker, bausteine: ctx.bausteine,
    linksAufUnveroeffentlicht: ctx.linksAufUnveroeffentlicht, linksFehlend: ctx.linksFehlend,
    fussnotenOhneQuelle: [...ctx.fussnoten].filter((n) => !ctx.quellen.some((q) => q.nr === n)),
    rohHtml: ctx.rohHtml ?? 0,
    woerter, lesezeit: Math.max(1, Math.round(woerter / 200)),
  };
  cache.set(seite.url, erg);
  return erg;
}

/** Produktions-Prüfung: Fehlerliste für alle gebauten Seiten (Marker, fehlende Linkziele, Fußnoten ohne Quelle). */
export function pruefeProduktion() {
  const fehler = [];
  for (const s of alleSeiten().filter((x) => x.gebaut)) {
    const r = rendere(s);
    for (const m of r.marker) fehler.push(`${s.relDatei}:${m.zeile ?? '?'}  ${s.url}  ${m.text}`);
    for (const l of r.linksFehlend) fehler.push(`${s.relDatei}  ${s.url}  Linkziel existiert nicht: ${l.href} („${l.text}“)`);
    for (const n of r.fussnotenOhneQuelle) fehler.push(`${s.relDatei}  ${s.url}  Fußnote [${n}] ohne Eintrag in der Quellenliste`);
  }
  return fehler;
}

export { firma };
export const NAV = [
  ['/wohnung-verkaufen/', 'Wohnung verkaufen'], ['/wohnung-bewerten/', 'Wohnung bewerten'], ['/direktankauf/', 'Direktankauf'],
  ['/ratgeber/', 'Ratgeber'], ['/ueber-mich/', 'Über mich'], ['/kontakt/', 'Kontakt'],
];
