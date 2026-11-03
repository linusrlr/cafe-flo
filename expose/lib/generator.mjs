#!/usr/bin/env node
// Exposé-Generator: liest objekte/<slug>/objekt.yaml, firma.yaml und rechtstexte/,
// schreibt dist/web (öffentlich) und dist/expose-backend (außerhalb des Webroots).
//
//   node lib/generator.mjs                 Vorschau (baut alles inkl. Muster, Marker erlaubt)
//   node lib/generator.mjs --produktion    nur status: veroeffentlicht|reserviert|verkauft, ohne Muster,
//                                          bricht bei Markern [LINUS]/[ZU PRÜFEN]/[ENTWURF] ab
//   --basis https://roessler-immo.de       absolute Basis-URL für Links in E-Mails (Standard aus firma.yaml)
//   --aus <ordner>                         Ausgabeordner (Standard: dist)

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';
import { mdZuHtml, mdZuText, esc, frontmatter } from './markdown.mjs';
import { sha256, euro, zahl, zahlFrei, prozent, flaeche, datum, fuelle, MARKER_RE, KLASSEN, KLASSEN_FARBEN, klasseFuer } from './werkzeuge.mjs';

const WURZEL = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const require = createRequire(import.meta.url);
function ladeYamlModul() {
  for (const p of [path.join(WURZEL, 'node_modules/yaml'), path.join(WURZEL, '../site/node_modules/yaml'), 'yaml']) {
    try { return require(p); } catch { /* nächster Versuch */ }
  }
  throw new Error('Paket „yaml“ fehlt. Im Ordner expose/ „npm install“ ausführen.');
}
const YAML = ladeYamlModul();
const ladeYaml = (p) => YAML.parse(fs.readFileSync(p, 'utf8'));

// ---------- Argumente ----------
const args = process.argv.slice(2);
const opt = (name, std) => { const i = args.indexOf(name); return i >= 0 ? args[i + 1] : std; };
const PRODUKTION = args.includes('--produktion');
const AUS = path.resolve(WURZEL, opt('--aus', 'dist'));
const WEB = path.join(AUS, 'web');
const BACK = path.join(AUS, 'expose-backend');

const fehler = []; const warnungen = [];
const F = (o, m) => fehler.push(`${o}: ${m}`);
const W = (o, m) => warnungen.push(`${o}: ${m}`);

// ---------- Firma, Fakten-Abgleich ----------
const firma = ladeYaml(path.join(WURZEL, 'firma.yaml'));
const BASIS = (opt('--basis', firma.web) || '').replace(/\/$/, '');
const links = {
  widerruf: `${BASIS}/vertrag-widerrufen/`,
  widerrufsbelehrung: `${BASIS}/expose-recht/widerrufsbelehrung/`,
  datenschutz: `${BASIS}/expose-recht/datenschutz/`,
};
(function faktenAbgleich() {
  const p = path.join(WURZEL, '../bauplan/fakten.yaml');
  if (!fs.existsSync(p)) return;
  try {
    const f = ladeYaml(p);
    if (f?.firma?.telefon?.wert && f.firma.telefon.wert !== firma.telefon) W('firma.yaml', `Telefon weicht von bauplan/fakten.yaml ab (${f.firma.telefon.wert})`);
    if (f?.firma?.email?.wert && f.firma.email.wert !== firma.email) W('firma.yaml', `E-Mail weicht von bauplan/fakten.yaml ab (${f.firma.email.wert})`);
    firma._fakten_provision = f?.provision?.satz?.zahl ? Number(f.provision.satz.zahl) * 100 : null;
    if (f?.grunderwerbsteuer_bw?.zahl && Number(f.grunderwerbsteuer_bw.zahl) * (Number(f.grunderwerbsteuer_bw.zahl) < 1 ? 100 : 1) !== Number(firma.kaufnebenkosten.grunderwerbsteuer.prozent)) {
      W('firma.yaml', 'Grunderwerbsteuer weicht von bauplan/fakten.yaml ab');
    }
  } catch (e) { W('bauplan/fakten.yaml', `nicht lesbar (${e.message})`); }
})();

// ---------- Rechtstexte ----------
function ladeRechtstext(id) {
  const roh = fs.readFileSync(path.join(WURZEL, 'rechtstexte', `${id}.md`), 'utf8');
  const { kopf, rumpf } = frontmatter(roh);
  return { meta: YAML.parse(kopf) || {}, md: rumpf };
}
const RT_IDS = ['maklervertrag-kaeufer', 'widerrufsbelehrung', 'widerrufsformular', 'datenschutz-expose', 'weitergabeverbot', 'gwg-hinweis'];
const RT = Object.fromEntries(RT_IDS.map((id) => [id, ladeRechtstext(id)]));
const BEST = ladeYaml(path.join(WURZEL, 'rechtstexte', 'bestaetigungen.yaml'));
const FLOSKELN = JSON.parse(fs.readFileSync(path.join(WURZEL, 'lib', 'floskeln.json'), 'utf8')).woerter;

function rechtstext(id, ctx) {
  const t = RT[id];
  const c = { ...ctx, rechtstext: { version: t.meta.version } };
  const md = fuelle(t.md, c, `rechtstexte/${id}.md`);
  const text = mdZuText(md);
  return { id, titel: t.meta.titel, version: t.meta.version, md, html: mdZuHtml(md), text, sha256: sha256(text) };
}

// ---------- Hilfen ----------
const schreibe = (p, inhalt) => { fs.mkdirSync(path.dirname(p), { recursive: true }); fs.writeFileSync(p, inhalt); };
const kopiere = (von, nach) => { fs.mkdirSync(path.dirname(nach), { recursive: true }); fs.copyFileSync(von, nach); };
const MIME = { '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.png': 'image/png', '.webp': 'image/webp', '.svg': 'image/svg+xml', '.woff2': 'font/woff2' };
const dataUri = (p) => `data:${MIME[path.extname(p).toLowerCase()] || 'application/octet-stream'};base64,${fs.readFileSync(p).toString('base64')}`;
const jaNein = (v) => (v === true ? 'ja' : v === false ? 'nein' : '');
const etageText = (e, ges) => (e === null || e === undefined ? '' : (Number(e) === 0 ? 'Erdgeschoss' : `${e}. Obergeschoss`) + (ges ? ` von ${ges}` : ''));

function zeile(th, td) { return td === '' || td === null || td === undefined ? '' : `<tr><th>${esc(th)}</th><td>${td}</td></tr>`; }

function layout({ titel, beschreibung, inhalt, muster, noindex = true, skript = false }) {
  return `<!doctype html>
<html lang="de">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(titel)} | ${esc(firma.name)}</title>
${beschreibung ? `<meta name="description" content="${esc(beschreibung)}">` : ''}
${noindex ? '<meta name="robots" content="noindex, nofollow">' : ''}
<meta name="referrer" content="strict-origin-when-cross-origin">
<link rel="stylesheet" href="/expose-assets/expose.css">
${skript ? '<script src="/expose-assets/formular.js" defer></script>' : ''}
</head>
<body>
<a class="skiplink" href="#inhalt">Zum Inhalt</a>
${muster ? '<div class="muster-banner" role="note">MUSTER: Alle Angaben auf dieser Seite sind frei erfunden. Diese Wohnung gibt es nicht.</div>' : ''}
<header class="top"><div class="wrap">
<a class="brand" href="${esc(firma.web)}/">Rössler Immobilien<small>Linus Rössler · Eigentumswohnungen</small></a>
<nav aria-label="Kurznavigation"><a class="nur-breit" href="${esc(firma.links.wohnung_verkaufen)}">Wohnung verkaufen</a><a href="${esc(firma.telefon_href)}">${esc(firma.telefon)}</a></nav>
</div></header>
<main id="inhalt">
${inhalt}
</main>
<footer class="fuss"><div class="wrap">
<div><strong>${esc(firma.name)}</strong><br>${esc(firma.inhaber)} · ${esc(firma.zeile)}<br><a href="${esc(firma.telefon_href)}">${esc(firma.telefon)}</a> · <a href="mailto:${esc(firma.email)}">${esc(firma.email)}</a></div>
<ul>
<li><a href="${esc(firma.links.impressum)}">Impressum</a></li>
<li><a href="${esc(firma.links.datenschutz)}">Datenschutz</a></li>
<li><a href="/expose-recht/datenschutz/">Datenschutz Exposé</a></li>
<li><a href="/expose-recht/widerrufsbelehrung/">Widerrufsbelehrung</a></li>
</ul>
<a class="widerruf-link" href="/vertrag-widerrufen/">Vertrag widerrufen</a>
</div></footer>
</body>
</html>
`;
}

// ---------- Objekt laden und prüfen ----------
function pruefeObjekt(slug, o, ordner) {
  const ort = `objekte/${slug}`;
  if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(slug)) F(ort, 'Ordnername nur a-z, 0-9 und Bindestrich');
  const pflicht = [['titel', o.titel], ['teaser', o.teaser], ['lage.ort', o.lage?.ort], ['preis.kaufpreis', o.preis?.kaufpreis],
    ['wohnung.wohnflaeche', o.wohnung?.wohnflaeche], ['wohnung.zimmer', o.wohnung?.zimmer], ['nummer', o.nummer],
    ['energieausweis.vorhanden', o.energieausweis?.vorhanden], ['gebaeude.baujahr', o.gebaeude?.baujahr]];
  for (const [k, v] of pflicht) if (v === null || v === undefined || v === '') F(ort, `Pflichtfeld ${k} fehlt`);
  if (o.titel && o.titel.length > 100) F(ort, `Titel hat ${o.titel.length} Zeichen, ImmoScout24 erlaubt 100`);
  const ea = o.energieausweis || {};
  if (ea.vorhanden === true) {
    for (const k of ['art', 'kennwert', 'energietraeger', 'baujahr_laut_ausweis', 'effizienzklasse']) {
      if (ea[k] === null || ea[k] === undefined || ea[k] === '') F(ort, `Energieausweis liegt vor, Pflichtangabe nach § 87 GModG fehlt: ${k}`);
    }
    if (!['verbrauch', 'bedarf'].includes(ea.art)) F(ort, 'energieausweis.art muss „verbrauch“ oder „bedarf“ sein');
    if (!ea.ausgestellt_am) W(ort, 'energieausweis.ausgestellt_am fehlt (ab 01.01.2027 voraussichtlich Pflichtangabe)');
    if (ea.kennwert && ea.effizienzklasse && klasseFuer(ea.kennwert) !== ea.effizienzklasse) W(ort, `Effizienzklasse ${ea.effizienzklasse} passt rechnerisch nicht zu ${ea.kennwert} kWh/(m²·a) (erwartet ${klasseFuer(ea.kennwert)}); Wert im Ausweis prüfen`);
    if (ea.gueltig_bis && new Date(ea.gueltig_bis) < new Date()) F(ort, 'Energieausweis ist abgelaufen (§ 80 Abs. 3 GModG: neuen ausstellen lassen)');
  } else if (ea.vorhanden === false) {
    W(ort, 'Kein Energieausweis: Verkäufer muss vor Besichtigung einen ausstellen lassen (§ 80 Abs. 3, 4 GModG)');
  }
  const pv = o.provision || {};
  const k = Number(pv.kaeufer_prozent); const v = Number(pv.verkaeufer_prozent);
  if (Number.isNaN(k) || Number.isNaN(v)) F(ort, 'provision.kaeufer_prozent und verkaeufer_prozent als Zahl angeben');
  else if (k !== 0 && k !== v) F(ort, `Käuferprovision ${k} % ungleich Verkäuferprovision ${v} %: unwirksam bei Verbraucher-Käufern (§ 656c Abs. 1 und 2 BGB)`);
  if (firma._fakten_provision && v && Math.abs(v - firma._fakten_provision) > 0.001) W(ort, `Verkäuferprovision ${v} % weicht vom Standard in bauplan/fakten.yaml ab (${firma._fakten_provision} %)`);
  for (const f of o.fotos || []) {
    const p = path.join(ordner, 'bilder', f.datei);
    if (!fs.existsSync(p)) F(ort, `Foto fehlt: bilder/${f.datei}`);
    else if (fs.statSync(p).size > 600 * 1024) W(ort, `Foto bilder/${f.datei} ist ${(fs.statSync(p).size / 1024).toFixed(0)} kB groß (Ziel unter 600 kB)`);
    if (!f.rechte) W(ort, `Foto ${f.datei}: Feld „rechte“ (Urheber, Nutzungsrecht) fehlt`);
  }
  if (!(o.fotos || []).some((f) => f.oeffentlich)) W(ort, 'kein Foto mit oeffentlich: true für das Kurz-Exposé');
  if (o.grundriss?.datei && !fs.existsSync(path.join(ordner, 'bilder', o.grundriss.datei))) F(ort, `Grundriss fehlt: bilder/${o.grundriss.datei}`);
  const texte = [o.titel, o.teaser, o.lage?.text, o.beschreibung].filter(Boolean).join('\n').toLowerCase();
  for (const w of FLOSKELN) if (texte.includes(w.toLowerCase())) W(ort, `Floskel „${w}“: durch prüfbare Angabe ersetzen`);
  if (o.muster) W(ort, 'MUSTER-Objekt (frei erfundene Werte)');
}

// ---------- Seiten ----------
function faktenGitter(o) {
  const items = [
    ['Kaufpreis', euro(o.preis.kaufpreis), o.preis.stellplatz?.kaufpreis && !o.preis.stellplatz.im_kaufpreis ? `zzgl. ${esc(o.preis.stellplatz.art)} ${euro(o.preis.stellplatz.kaufpreis)}` : ''],
    ['Wohnfläche', flaeche(o.wohnung.wohnflaeche), ''],
    ['Zimmer', zahlFrei(o.wohnung.zimmer), ''],
    ['Etage', o.wohnung.etage === 0 ? 'EG' : o.wohnung.etage !== null && o.wohnung.etage !== undefined ? `${o.wohnung.etage}. OG` : '–', o.wohnung.aufzug === false ? 'ohne Aufzug' : o.wohnung.aufzug ? 'mit Aufzug' : ''],
    ['Baujahr', String(o.gebaeude.baujahr ?? '–'), ''],
    ['Hausgeld', o.weg?.hausgeld_monat ? `${euro(o.weg.hausgeld_monat)}` : '–', o.weg?.hausgeld_monat ? 'je Monat' : ''],
  ];
  return `<dl class="fakten">${items.map(([dt, dd, s]) => `<div><dt>${dt}</dt><dd>${esc(dd)}${s ? `<small>${s}</small>` : ''}</dd></div>`).join('')}</dl>`;
}

function energieHtml(ea, klein = false) {
  if (ea.vorhanden !== true) return `<p>${ea.vorhanden === false ? 'Ein Energieausweis liegt derzeit nicht vor; er wird vor der ersten Besichtigung ausgestellt.' : 'Angaben folgen.'}</p>`;
  const skala = `<div class="skala" aria-hidden="true">${KLASSEN.map(([kl]) => `<span style="background:${KLASSEN_FARBEN[kl]}" class="${kl === ea.effizienzklasse ? 'aktiv' : ''}">${kl}</span>`).join('')}</div>`;
  return `<table class="daten"><tbody>
${zeile('Art des Energieausweises', ea.art === 'bedarf' ? 'Energiebedarfsausweis' : 'Energieverbrauchsausweis')}
${zeile(ea.art === 'bedarf' ? 'Endenergiebedarf' : 'Endenergieverbrauch', `${zahlFrei(ea.kennwert)} kWh/(m²·a)${ea.art === 'verbrauch' && ea.warmwasser_enthalten ? ', einschließlich Warmwasser' : ''}`)}
${zeile('Wesentlicher Energieträger', esc(ea.energietraeger))}
${zeile('Baujahr laut Energieausweis', esc(ea.baujahr_laut_ausweis))}
${zeile('Energieeffizienzklasse', `<strong>${esc(ea.effizienzklasse)}</strong>`)}
${zeile('Ausgestellt am', datum(ea.ausgestellt_am))}
${zeile('Gültig bis', datum(ea.gueltig_bis))}
</tbody></table>${skala}${klein ? '' : '<p class="klein">Pflichtangaben nach § 87 Gebäudemodernisierungsgesetz. Den Energieausweis lege ich spätestens bei der Besichtigung vor.</p>'}`;
}

function provisionHtml(c) {
  if (!c.mitVertrag) return `<p><strong>Für Käufer provisionsfrei.</strong> Die Provision zahlt der Verkäufer.</p>`;
  return `<p><strong>Käuferprovision: ${esc(c.provision.kaeufer_text)} des Kaufpreises inkl. USt</strong>, nur bei Kauf, fällig mit dem notariellen Kaufvertrag. Beim Angebotspreis sind das ${esc(c.provision.kaeufer_beispiel)}.</p>
<p class="klein">Der Verkäufer zahlt Provision in gleicher Höhe (§ 656c BGB). Für das vollständige Exposé schließen Sie online einen Maklervertrag in Textform; Sie können ihn 14 Tage widerrufen.</p>`;
}

function kurzExpose(c) {
  const { o, slug } = c;
  const fotos = (o.fotos || []).filter((f) => f.oeffentlich).slice(0, 5);
  const galerie = fotos.length ? `<div class="galerie">${fotos.map((f, i) => `<figure><img src="/expose-assets/objekte/${slug}/${esc(f.datei)}" alt="${esc(f.titel)}" ${i ? 'loading="lazy"' : 'fetchpriority="high"'} width="1600" height="1000"><figcaption>${esc(f.titel)}</figcaption></figure>`).join('')}</div>` : '';
  const verfuegbar = !['reserviert', 'verkauft'].includes(o.status);
  const statusText = o.status === 'reserviert' ? 'Reserviert' : o.status === 'verkauft' ? 'Verkauft' : '';
  const cta = verfuegbar
    ? `<div class="cta-zeile"><a class="btn" href="/objekte/${slug}/anfordern/">Vollständiges Exposé anfordern</a><a class="btn line" href="${esc(firma.telefon_href)}">Anrufen: ${esc(firma.telefon)}</a></div>`
    : `<p class="lede"><strong>${statusText}.</strong> Ähnliche Wohnung gesucht? Rufen Sie mich an: <a href="${esc(firma.telefon_href)}">${esc(firma.telefon)}</a>.</p>`;
  const w = o.wohnung;
  const inhalt = `
<section><div class="wrap">
<p class="eyebrow">Eigentumswohnung · ${esc(c.lageKurz)} · Nr. ${esc(o.nummer)}${statusText ? ` · ${statusText}` : ''}</p>
<h1>${esc(o.titel)}</h1>
<p class="lede">${esc(o.teaser)}</p>
${galerie}
${faktenGitter(o)}
${cta}
</div></section>
<section><div class="wrap zwei">
<div>
<h2>Lage</h2>
<div class="prosa" style="margin-top:14px"><p>${esc(o.lage.text || '')}</p></div>
${(o.lage.entfernungen || []).length ? `<table class="daten" style="margin-top:16px"><tbody>${o.lage.entfernungen.map((e) => zeile(e.ziel, esc(e.weg))).join('')}</tbody></table><p class="klein" style="margin-top:6px">${esc(o.lage.entfernungen_quelle || '')}</p>` : ''}
<h2 style="margin-top:34px">Die Wohnung in Zahlen</h2>
<table class="daten" style="margin-top:14px"><tbody>
${zeile('Wohnungstyp', esc(w.typ || ''))}
${zeile('Lage im Haus', esc(etageText(w.etage, w.etagen_gesamt)))}
${zeile('Wohnfläche', `${flaeche(w.wohnflaeche)}${w.wohnflaeche_grundlage ? `<br><span class="klein">${esc(w.wohnflaeche_grundlage)}</span>` : ''}`)}
${zeile('Zimmer', esc(zahlFrei(w.zimmer)))}
${zeile('Balkon/Terrasse', esc(w.balkon || ''))}
${zeile('Keller', esc(w.keller || ''))}
${zeile('Stellplatz', o.preis.stellplatz?.art ? esc(`${o.preis.stellplatz.art}${o.preis.stellplatz.kaufpreis ? `, ${o.preis.stellplatz.im_kaufpreis ? 'im Kaufpreis enthalten' : `${euro(o.preis.stellplatz.kaufpreis)} zusätzlich`}` : ''}`) : '')}
${zeile('Zustand', esc(w.zustand || ''))}
${zeile('Bezug', esc(w.nutzung?.vermietet ? `vermietet${w.nutzung.kaltmiete_monat ? `, Kaltmiete ${euro(w.nutzung.kaltmiete_monat)} je Monat` : ''}` : w.nutzung?.frei_ab ? `frei, ${w.nutzung.frei_ab}` : ''))}
${zeile('Heizung', esc(w.heizung || ''))}
${zeile('Wohnungen im Haus', esc(o.gebaeude.einheiten ?? ''))}
</tbody></table>
</div>
<div>
<div class="box"><h2 style="font-size:1.25rem">Energieausweis</h2>${energieHtml(o.energieausweis)}</div>
<div class="box hell" style="margin-top:18px"><h2 style="font-size:1.25rem">Provision</h2>${provisionHtml(c)}</div>
</div>
</div></section>
${verfuegbar ? `<section class="band"><div class="wrap zwei">
<div>
<h2>Im vollständigen Exposé</h2>
<ul class="prosa" style="margin-top:14px;padding-left:22px">
<li>Adresse und Lage im Haus</li><li>alle Fotos und der Grundriss</li><li>Hausgeld im Detail, Erhaltungsrücklage, Sonderumlagen und Beschlüsse der Eigentümer</li><li>Modernisierungen mit Jahr und Beleg</li><li>Kaufnebenkosten und Liste der Unterlagen</li>
</ul>
</div>
<div>
<h2>So geht es</h2>
<ol class="prosa" style="margin-top:14px;padding-left:22px">
<li>Sie geben Name und E-Mail an und bestätigen den Maklervertrag. Dauer: etwa drei Minuten.</li>
<li>Sie wählen: Exposé sofort oder erst nach Ablauf der 14-tägigen Widerrufsfrist.</li>
<li>Sie erhalten eine E-Mail mit allen Vertragstexten und einem persönlichen Link zum Exposé.</li>
</ol>
<div class="cta-zeile"><a class="btn" href="/objekte/${slug}/anfordern/">Vollständiges Exposé anfordern</a></div>
</div>
</div></section>` : ''}`;
  return layout({ titel: o.titel, beschreibung: o.teaser, inhalt, muster: o.muster, noindex: o.muster || o.status !== 'veroeffentlicht' });
}

function erklaerungHtml(e, c) {
  const link = e.link ? ` <a href="${e.link === 'maklervertrag' ? `/objekte/${c.slug}/maklervertrag/` : e.link === 'widerrufsbelehrung' ? '/expose-recht/widerrufsbelehrung/' : '/expose-recht/vertraulichkeit/'}" target="_blank" rel="noopener">Volltext in neuem Fenster</a>` : '';
  return `<div class="check"><input type="checkbox" id="e-${e.id}" name="erklaerung[${e.id}]" value="1"${e.wann === 'immer' ? ' required' : ''}>
<label for="e-${e.id}">${esc(e.text)}</label>
<p class="meta">Fassung ${esc(e.version)}${link}</p></div>`;
}

function anfordern(c) {
  const { o, slug } = c;
  const immer = c.erklaerungen.filter((e) => e.wann === 'immer');
  const sofort = c.erklaerungen.filter((e) => e.wann === 'sofort');
  const titelbild = (o.fotos || []).find((f) => f.oeffentlich);
  const rt = c.rechtstexte;
  const pflichtinfo = c.mitVertrag ? `<div class="pflichtinfo" aria-labelledby="pi-titel">
<h3 id="pi-titel">Das bestellen Sie</h3>
<dl>
<dt>Leistung</dt><dd>Nachweis und Vermittlung der Wohnung „${esc(o.titel)}“ (Nr. ${esc(o.nummer)}) durch ${esc(firma.name)}, ${esc(firma.inhaber)}; vollständiges Exposé mit Anschrift, Unterlagen, Besichtigungen.</dd>
<dt>Preis</dt><dd><strong>${esc(c.provision.kaeufer_text)} des Kaufpreises einschließlich 19 % Umsatzsteuer</strong>, nur wenn Sie die Wohnung kaufen; fällig mit dem notariellen Kaufvertrag. Beim Angebotspreis von ${esc(c.kaufpreisText)}: ${esc(c.provision.kaeufer_beispiel)}. Sonst keine Kosten.</dd>
<dt>Laufzeit</dt><dd>unbefristet, jederzeit ohne Frist kündbar.</dd>
<dt>Widerruf</dt><dd>14 Tage ab Vertragsschluss, auch online über „Vertrag widerrufen“.</dd>
</dl></div>` : '';

  const inhalt = `
<section><div class="wrap">
<p class="eyebrow">Schritt 2 von 2 · Nr. ${esc(o.nummer)}</p>
<h1>Vollständiges Exposé anfordern</h1>
<p class="lede">Für das vollständige Exposé mit Adresse schließen wir einen Maklervertrag. ${c.mitVertrag ? `Die Provision von ${esc(c.provision.kaeufer_text)} fällt nur an, wenn Sie kaufen.` : ''} Alle Texte erhalten Sie zusätzlich per E-Mail.</p>
</div></section>
<section><div class="wrap zwei">
<form id="anfrage" class="formular" method="post" action="/anfrage.php" novalidate data-ab-tage="${15 + c.freigabe.karenz_tage}">
<p id="meldung" class="meldung" role="alert" hidden></p>
<input type="hidden" name="objekt" value="${esc(slug)}">
<input type="hidden" name="fassung" value="${esc(c.fassung)}">
<input type="hidden" name="t" value="">
<input type="hidden" name="js" value="">
<div class="hp" aria-hidden="true"><label for="f-website">Bitte leer lassen</label><input id="f-website" name="website" type="text" tabindex="-1" autocomplete="off"></div>

<fieldset>
<span class="schritt">1 · Kontakt</span>
<legend>Wie erreiche ich Sie?</legend>
<div class="feld"><label for="f-name">Vor- und Nachname</label><input id="f-name" name="name" type="text" required maxlength="80" autocomplete="name"></div>
<div class="feld"><label for="f-email">E-Mail-Adresse</label><input id="f-email" name="email" type="email" required maxlength="254" autocomplete="email"><p class="hilfe">Hierhin schicke ich Vertragstexte, Widerrufsbelehrung und den Link zum Exposé.</p></div>
<div class="feld"><label for="f-telefon">Telefon <span class="opt">(freiwillig, für Rückfragen und Besichtigungstermin)</span></label><input id="f-telefon" name="telefon" type="tel" maxlength="30" autocomplete="tel" pattern="[0-9 +\\(\\)\\/\\-]{6,30}"></div>
</fieldset>

${c.mitVertrag ? `<fieldset>
<span class="schritt">2 · Vertrag</span>
<legend>Maklervertrag und Widerrufsrecht</legend>
<details class="text"><summary>${esc(rt['maklervertrag-kaeufer'].titel)} lesen (Fassung ${esc(rt['maklervertrag-kaeufer'].version)})</summary><div class="prosa">${rt['maklervertrag-kaeufer'].html}</div></details>
<details class="text"><summary>Widerrufsbelehrung und Muster-Widerrufsformular lesen (Fassung ${esc(rt.widerrufsbelehrung.version)})</summary><div class="prosa">${rt.widerrufsbelehrung.html}${rt.widerrufsformular.html}</div></details>
${immer.filter((e) => e.id !== 'vertraulichkeit').map((e) => erklaerungHtml(e, c)).join('\n')}
</fieldset>

<fieldset data-feld="beginn">
<span class="schritt">3 · Zeitpunkt</span>
<legend>${esc(c.beginn.frage)}</legend>
${c.beginn.optionen.map((op) => `<div class="radio"><input type="radio" id="b-${op.wert}" name="beginn" value="${op.wert}" required><label for="b-${op.wert}"><strong>${esc(op.label)}</strong><span class="klein">${op.wert === 'nach_frist' ? esc(op.hilfe).replace(esc(c.freigabe.ab_text), `<span data-ab-datum>${esc(c.freigabe.ab_text)}</span>`) : esc(op.hilfe)}</span></label></div>`).join('\n')}
<div id="sofort-erklaerungen">
<p class="hilfe" style="margin-top:14px"><strong>Nur bei „Sofort“:</strong> Diese beiden Erklärungen sind nötig, damit ich vor Ablauf der Widerrufsfrist beginnen darf.</p>
${sofort.map((e) => erklaerungHtml(e, c)).join('\n')}
</div>
</fieldset>` : ''}

<fieldset>
<span class="schritt">${c.mitVertrag ? '4' : '2'} · Vertraulichkeit</span>
<legend>Umgang mit dem Exposé</legend>
${immer.filter((e) => e.id === 'vertraulichkeit').map((e) => erklaerungHtml(e, c)).join('\n')}
</fieldset>

<fieldset>
<span class="schritt">${c.mitVertrag ? '5' : '3'} · Prüfen und abschließen</span>
<legend>Ihre Angaben prüfen</legend>
<div id="zusammenfassung" class="zusammenfassung" hidden aria-live="polite"></div>
${pflichtinfo}
<p class="klein" style="margin-top:14px">Datenschutz: Ich verarbeite Ihre Angaben, um den Vertrag zu schließen und Ihnen das Exposé zu schicken (Art. 6 Abs. 1 lit. b DSGVO), und protokolliere Ihre Erklärungen als Nachweis (Art. 6 Abs. 1 lit. f DSGVO). Keine Weitergabe an Dritte, keine Cookies. Details im <a href="/expose-recht/datenschutz/" target="_blank" rel="noopener">Datenschutzhinweis zum Exposé</a>.</p>
<div class="absenden">
<button class="btn" type="submit">${esc(c.mitVertrag ? c.freigabe.button_text : 'Exposé anfordern')}</button>
<p class="klein">${c.mitVertrag ? `Mit dem Klick schließen Sie den Maklervertrag. Provision nur bei Kauf. ` : ''}Bis zum Klick können Sie alle Angaben oben ändern. Der Vertragstext wird gespeichert und Ihnen sofort per E-Mail geschickt.</p>
</div>
</fieldset>

<details class="text"><summary>So kommt der Vertrag technisch zustande</summary><div class="prosa">
<ol><li>Sie füllen die Felder aus und setzen die Häkchen selbst; nichts ist vorausgewählt.</li><li>Eingabefehler können Sie bis zum Klick auf „${esc(c.freigabe.button_text)}“ direkt im Formular korrigieren; die Zusammenfassung oben zeigt Ihre Angaben.</li><li>Mit dem Klick geben Sie Ihre Vertragserklärung ab. Ich bestätige den Eingang sofort per E-Mail; die E-Mail enthält den Vertragstext, Ihre Erklärungen im Wortlaut, die Widerrufsbelehrung und das Muster-Widerrufsformular.</li><li>Ich speichere den Vertragstext. Sie können ihn jederzeit unter <a href="/objekte/${slug}/maklervertrag/">diesem Link</a> abrufen und speichern.</li><li>Vertragssprache ist Deutsch. Ich bin keinem Verhaltenskodex unterworfen.</li></ol>
</div></details>
<p style="margin-top:22px"><a class="widerruf-link" href="/vertrag-widerrufen/">Vertrag widerrufen</a></p>
</form>
<aside class="objektkarte" aria-label="Objekt">
${titelbild ? `<img src="/expose-assets/objekte/${slug}/${esc(titelbild.datei)}" alt="${esc(titelbild.titel)}" width="1600" height="1000">` : ''}
<div class="box"><h3>${esc(o.titel)}</h3>
<p class="klein">${esc(c.lageKurz)} · ${flaeche(o.wohnung.wohnflaeche)} · ${zahlFrei(o.wohnung.zimmer)} Zimmer · ${euro(o.preis.kaufpreis)}</p>
<p class="klein" style="margin-top:8px"><a href="/objekte/${slug}/">Zurück zum Kurz-Exposé</a></p>
<p class="klein" style="margin-top:8px">Fragen? <a href="${esc(firma.telefon_href)}">${esc(firma.telefon)}</a></p></div>
</aside>
</div></section>`;
  return layout({ titel: `Exposé anfordern: ${o.titel}`, inhalt, muster: o.muster, skript: true });
}

function danke(c, fall) {
  const { o, slug } = c;
  const texte = {
    sofort: ['Danke. Der Link zum Exposé ist unterwegs.', `Sie erhalten gleich eine E-Mail an Ihre Adresse mit Ihrem persönlichen Link zum vollständigen Exposé, dem Vertragstext, Ihren Erklärungen im Wortlaut, der Widerrufsbelehrung und dem Muster-Widerrufsformular. Der Link gilt ${c.freigabe.link_gueltig_tage} Tage.`],
    frist: ['Danke. Ihr Vertrag ist bestätigt.', `Sie erhalten gleich eine E-Mail mit dem Vertragstext, Ihren Erklärungen, der Widerrufsbelehrung und dem Muster-Widerrufsformular. Der Link zum Exposé steht ebenfalls darin; er funktioniert nach Ablauf der Widerrufsfrist (das genaue Datum steht in der E-Mail).`],
    manuell: ['Danke. Ich schalte Ihr Exposé persönlich frei.', 'Sie erhalten gleich eine E-Mail mit dem Vertragstext, Ihren Erklärungen, der Widerrufsbelehrung und dem Muster-Widerrufsformular. Den Link zum Exposé schicke ich Ihnen, sobald ich Ihre Anfrage gesehen habe, meist innerhalb eines Werktags.'],
  }[fall];
  const inhalt = `<section><div class="wrap prosa">
<p class="eyebrow">Nr. ${esc(o.nummer)}</p>
<h1>${esc(texte[0])}</h1>
<p class="lede">${esc(texte[1])}</p>
<p>Keine E-Mail nach zehn Minuten? Bitte schauen Sie im Spam-Ordner nach oder rufen Sie mich an: <a href="${esc(firma.telefon_href)}">${esc(firma.telefon)}</a>.</p>
<p><a href="/objekte/${slug}/">Zurück zum Objekt</a></p>
<p><a class="widerruf-link" href="/vertrag-widerrufen/">Vertrag widerrufen</a></p>
</div></section>`;
  return layout({ titel: 'Danke', inhalt, muster: o.muster });
}

function rechtstextSeite(titel, html, muster = false, zurueck = '') {
  const inhalt = `<section><div class="wrap prosa">${zurueck ? `<p class="klein"><a href="${zurueck}">Zurück</a></p>` : ''}${html}<p class="klein" style="margin-top:28px">Diese Seite können Sie mit der Druckfunktion Ihres Browsers speichern oder als PDF ablegen.</p></div></section>`;
  return layout({ titel, inhalt, muster });
}

function vollExpose(c, ordner) {
  const { o } = c;
  const w = o.wohnung; const weg = o.weg || {}; const ea = o.energieausweis || {};
  const bild = (f) => dataUri(path.join(ordner, 'bilder', f));
  const fotos = o.fotos || [];
  const kaufpreis = Number(o.preis.kaufpreis);
  const grest = kaufpreis * Number(firma.kaufnebenkosten.grunderwerbsteuer.prozent) / 100;
  const prov = c.mitVertrag ? kaufpreis * c.provisionProzent / 100 : 0;
  const fonts = `@font-face{font-family:"Instrument Sans";font-weight:500 700;src:url(${dataUri(path.join(WURZEL, 'assets/instrument-sans-latin.woff2'))}) format("woff2")}
@font-face{font-family:"Libre Franklin";font-weight:400 600;src:url(${dataUri(path.join(WURZEL, 'assets/libre-franklin-latin.woff2'))}) format("woff2")}`;
  const css = fs.readFileSync(path.join(WURZEL, 'assets/vollexpose.css'), 'utf8');
  const rt = c.rechtstexte;
  const kopf = `<div class="kopf"><div><strong>${esc(firma.name)}</strong><br>${esc(firma.inhaber)} · ${esc(firma.telefon)} · ${esc(firma.email)}</div><div>Exposé · Nr. ${esc(o.nummer)}<br>Stand ${datum(new Date())}</div></div>`;
  return `<!doctype html>
<html lang="de">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex, nofollow, noarchive">
<title>Exposé ${esc(o.nummer)}: ${esc(o.titel)}</title>
<style>${fonts}
${css}</style>
<style>@page{@bottom-left{content:"<!--EMPFAENGER_CSS-->";font-family:Helvetica,Arial,sans-serif;font-size:7.5pt;color:#55627A}}</style>
</head>
<body>
<div class="werkzeug"><span>Persönliches Exposé · <!--EMPFAENGER--></span><span><button type="button" onclick="window.print()">Drucken oder als PDF speichern</button> &nbsp; <a href="/vertrag-widerrufen/">Vertrag widerrufen</a></span></div>
<div class="dokument">

<div class="kapitel">
${o.muster ? '<p class="muster">MUSTER: Alle Angaben in diesem Exposé sind frei erfunden.</p>' : ''}
${kopf}
<p class="empfaenger">Persönliches Exposé für <!--EMPFAENGER--> · Vorgang <!--VORGANG--> · abgerufen <!--ABRUF--> · nur zur eigenen Verwendung</p>
<p class="klein" style="text-transform:uppercase;letter-spacing:.14em;font-weight:600">Eigentumswohnung · ${esc(c.lageKurz)}</p>
<h1>${esc(o.titel)}</h1>
<p class="lead">${esc(c.adresseVoll)}</p>
${fotos[0] ? `<img class="titelbild" src="${bild(fotos[0].datei)}" alt="${esc(fotos[0].titel)}">` : ''}
<dl class="eckdaten">
<div><dt>Kaufpreis</dt><dd>${euro(kaufpreis)}</dd></div>
<div><dt>Wohnfläche</dt><dd>${flaeche(w.wohnflaeche)}</dd></div>
<div><dt>Zimmer</dt><dd>${zahlFrei(w.zimmer)}</dd></div>
<div><dt>Lage im Haus</dt><dd>${esc(o.lage.lage_im_haus || etageText(w.etage))}</dd></div>
<div><dt>Baujahr</dt><dd>${esc(o.gebaeude.baujahr)}</dd></div>
<div><dt>Hausgeld</dt><dd>${weg.hausgeld_monat ? euro(weg.hausgeld_monat) + ' / Monat' : '–'}</dd></div>
</dl>
<p style="margin-top:6mm">${esc(o.teaser)}</p>
</div>

<div class="kapitel">
${kopf}
<h2>Die Wohnung</h2>
${mdZuHtml(o.beschreibung || '')}
<div class="zwei">
<div><h3>Eckdaten</h3><table><tbody>
${zeile('Wohnungstyp', esc(w.typ || ''))}
${zeile('Etage', esc(etageText(w.etage, w.etagen_gesamt)))}
${zeile('Aufzug', jaNein(w.aufzug))}
${zeile('Wohnfläche', `${flaeche(w.wohnflaeche)}<br><span class="klein">${esc(w.wohnflaeche_grundlage || '')}</span>`)}
${zeile('Zimmer', esc(zahlFrei(w.zimmer)))}
${zeile('Schlafzimmer', esc(w.schlafzimmer ?? ''))}
${zeile('Badezimmer', esc(w.badezimmer ?? ''))}
${zeile('Gäste-WC', jaNein(w.gaeste_wc))}
${zeile('Balkon/Terrasse', esc(w.balkon || ''))}
${zeile('Keller', esc(w.keller || ''))}
${zeile('Einbauküche', esc(w.einbaukueche || ''))}
${zeile('Heizung', esc(w.heizung || ''))}
${zeile('Zustand', esc(w.zustand || ''))}
${zeile('Bezug', esc(w.nutzung?.vermietet ? `vermietet${w.nutzung.kaltmiete_monat ? `, Kaltmiete ${euro(w.nutzung.kaltmiete_monat)} je Monat` : ''}` : w.nutzung?.frei_ab ? `frei, ${w.nutzung.frei_ab}` : ''))}
${zeile('Denkmalschutz', jaNein(o.gebaeude.denkmalschutz))}
</tbody></table></div>
<div><h3>Modernisierungen und Ausstattung</h3><table><thead><tr><th>Was</th><th>Jahr</th><th>Beleg</th></tr></thead><tbody>
${(w.ausstattung || []).map((a) => `<tr><td>${esc(a.was)}</td><td>${esc(a.jahr ?? '')}</td><td class="klein">${esc(a.beleg || '')}</td></tr>`).join('')}
</tbody></table>
<h3>Lage</h3><p>${esc(o.lage.text || '')}</p>
${(o.lage.entfernungen || []).length ? `<table><tbody>${o.lage.entfernungen.map((e) => zeile(e.ziel, esc(e.weg))).join('')}</tbody></table><p class="klein">${esc(o.lage.entfernungen_quelle || '')}</p>` : ''}
</div></div>
</div>

<div class="kapitel">
${kopf}
<h2>Eigentümergemeinschaft und laufende Kosten</h2>
<div class="zwei">
<div><table><tbody>
${zeile('Wohnungen im Haus', esc(o.gebaeude.einheiten ?? ''))}
${zeile('Miteigentumsanteil', esc(weg.miteigentumsanteil || ''))}
${zeile('Verwaltung', esc(weg.verwaltung || ''))}
${zeile('Hausgeld gesamt je Monat', weg.hausgeld_monat ? euro(weg.hausgeld_monat) : '')}
${zeile('davon auf Mieter umlegbar', weg.hausgeld_umlagefaehig_monat ? euro(weg.hausgeld_umlagefaehig_monat) : '')}
${zeile('davon Zuführung Erhaltungsrücklage', weg.ruecklage_zufuehrung_monat ? euro(weg.ruecklage_zufuehrung_monat) : '')}
${zeile('Erhaltungsrücklage der Gemeinschaft', weg.ruecklage_gesamt ? `${euro(weg.ruecklage_gesamt)}${weg.ruecklage_stand ? ` (Stand ${datum(weg.ruecklage_stand)})` : ''}<br><span class="klein">${esc(weg.ruecklage_quelle || '')}</span>` : '')}
${zeile('Letzte Eigentümerversammlung', datum(weg.letzte_versammlung))}
${zeile('Sondernutzungsrechte', esc(weg.sondernutzungsrechte || ''))}
${zeile('Verwalterzustimmung zum Verkauf', esc(weg.verwalterzustimmung || ''))}
</tbody></table></div>
<div>
<h3>Sonderumlagen</h3>
${(weg.sonderumlagen || []).length ? `<table><thead><tr><th>Jahr</th><th>Anteil Wohnung</th><th>Zweck</th><th>Status</th></tr></thead><tbody>${weg.sonderumlagen.map((s) => `<tr><td>${esc(s.jahr)}</td><td>${euro(s.betrag_anteil)}</td><td>${esc(s.zweck)}</td><td>${esc(s.status || '')}</td></tr>`).join('')}</tbody></table>` : '<p>Keine Sonderumlagen bekannt.</p>'}
<h3>Beschlüsse mit Kostenfolge</h3>
${(weg.beschluesse || []).length ? `<table><thead><tr><th>Datum</th><th>Inhalt</th><th>Kosten Wohnung</th></tr></thead><tbody>${weg.beschluesse.map((b) => `<tr><td>${datum(b.datum)}</td><td>${esc(b.inhalt)}</td><td>${esc(b.kosten_anteil || '')}</td></tr>`).join('')}</tbody></table>` : '<p>Keine beschlossenen Maßnahmen mit Kostenfolge bekannt.</p>'}
</div></div>
<h2 style="margin-top:8mm">Energieausweis</h2>
<div class="keinumbruch">${energieHtml(ea, true)}<p class="klein">Pflichtangaben nach § 87 Gebäudemodernisierungsgesetz. Der Energieausweis liegt bei der Besichtigung aus; eine Kopie erhalten Sie auf Anfrage.</p></div>
</div>

<div class="kapitel">
${kopf}
<h2>Grundriss</h2>
${o.grundriss?.datei ? `<figure class="grundriss keinumbruch" style="margin:0"><img src="${bild(o.grundriss.datei)}" alt="Grundriss der Wohnung"><figcaption>${esc(o.grundriss.quelle || '')}</figcaption></figure>` : '<p>Grundriss folgt.</p>'}
${o.rundgang_url ? `<p style="margin-top:6mm">360°-Rundgang: <a href="${esc(o.rundgang_url)}">${esc(o.rundgang_url)}</a></p>` : ''}
</div>

${fotos.length > 1 ? `<div class="kapitel">
${kopf}
<h2>Fotos</h2>
<div class="fotos">${fotos.slice(1).map((f) => `<figure><img src="${bild(f.datei)}" alt="${esc(f.titel)}"><figcaption>${esc(f.titel)}</figcaption></figure>`).join('')}</div>
</div>` : ''}

<div class="kapitel">
${kopf}
<h2>Kaufpreis und Nebenkosten</h2>
<table><tbody>
${zeile('Kaufpreis Wohnung', euro(kaufpreis))}
${o.preis.stellplatz?.art ? zeile(o.preis.stellplatz.art, o.preis.stellplatz.im_kaufpreis ? 'im Kaufpreis enthalten' : euro(o.preis.stellplatz.kaufpreis)) : ''}
${zeile(`Grunderwerbsteuer (${zahlFrei(firma.kaufnebenkosten.grunderwerbsteuer.prozent)} %, Baden-Württemberg)`, euro(grest))}
${zeile('Notar und Grundbuch', esc(firma.kaufnebenkosten.notar_grundbuch.text))}
${c.mitVertrag ? zeile(`Käuferprovision (${c.provision.kaeufer_text} inkl. USt)`, euro(prov, 2)) : zeile('Käuferprovision', 'keine')}
</tbody></table>
<p class="klein">Beträge für die Wohnung ohne Stellplatz. Grunderwerbsteuer und Provision berechnen sich vom tatsächlichen Kaufpreis. ${esc(firma.kaufnebenkosten.grunderwerbsteuer.quelle)}.</p>
<h2 style="margin-top:8mm">Unterlagen</h2>
<table><thead><tr><th>Unterlage</th><th>Stand</th><th>Für Sie</th></tr></thead><tbody>
${(o.dokumente || []).map((d) => `<tr><td>${esc(d.titel)}</td><td>${esc(d.stand || '')}</td><td>${d.vorhanden ? esc(d.weitergabe || 'auf Anfrage') : `<em>${esc(d.weitergabe || 'folgt')}</em>`}</td></tr>`).join('')}
</tbody></table>
<div class="kontakt keinumbruch"><div><strong>Besichtigung und Fragen</strong><br>${esc(firma.inhaber)} · ${esc(firma.telefon)} · ${esc(firma.email)}</div></div>
</div>

<div class="kapitel recht">
${kopf}
<h2>Hinweise</h2>
<h3>Angaben in diesem Exposé</h3>
<p>Die Angaben beruhen auf Unterlagen und Auskünften des Verkäufers, der Hausverwaltung und Behörden. Ich habe sie auf Plausibilität geprüft, aber nicht technisch oder rechtlich im Einzelnen. Maßgeblich ist der notarielle Kaufvertrag. Was mir bekannt ist, sage ich Ihnen, auch wenn es gegen den Kauf spricht.</p>
${rt.weitergabeverbot.html}
${rt['gwg-hinweis'].html}
${c.mitVertrag ? `<h3>Widerruf</h3><p>Ihren Maklervertrag können Sie innerhalb der Widerrufsfrist auch online widerrufen: ${esc(links.widerruf)}. Die vollständige Widerrufsbelehrung haben Sie per E-Mail erhalten; sie steht auch unter ${esc(links.widerrufsbelehrung)}.</p>` : ''}
<p class="klein">${esc(firma.name)}, Inhaber ${esc(firma.inhaber)}, ${esc(firma.anschrift)}. Erlaubnis nach § 34c Abs. 1 Satz 1 Nr. 1 GewO, erteilt durch ${esc(firma.erlaubnis.behoerde)}. Fotos und Grundriss sind urheberrechtlich geschützt.</p>
</div>

</div>
</body>
</html>
`.replace(MARKER_RE, (m) => `<mark class="marker">${m}</mark>`);
}

function immoscout(c) {
  const { o } = c; const w = o.wohnung; const ea = o.energieausweis || {};
  return {
    _hinweis: 'Kopiervorlage für ImmoScout24 (API apartmentBuy, Feldnamen laut https://api.immobilienscout24.de/api-docs/import-export/introduction/#wohnung-kauf-apartmentbuy). Effizienzklasse und Ausstellungsdatum im Portal gesondert eintragen.',
    externalId: o.nummer, title: o.titel, street: o.lage.strasse, houseNumber: o.lage.hausnummer, postcode: o.lage.plz, city: o.lage.ort,
    showAddress: false, descriptionNote: [o.teaser, o.beschreibung].filter(Boolean).join('\n\n').slice(0, 3999), locationNote: o.lage.text,
    furnishingNote: (w.ausstattung || []).map((a) => `${a.was} (${a.jahr})`).join('; '),
    apartmentType: { Etagenwohnung: 'APARTMENT', Dachgeschoss: 'ROOF_STOREY', Erdgeschoss: 'GROUND_FLOOR', Maisonette: 'MAISONETTE', Penthouse: 'PENTHOUSE', Souterrain: 'HALF_BASEMENT' }[w.typ] || 'NO_INFORMATION',
    floor: w.etage, numberOfFloors: w.etagen_gesamt, lift: w.aufzug, cellar: w.keller ? 'YES' : 'NOT_APPLICABLE', balcony: Boolean(w.balkon),
    builtInKitchen: Boolean(w.einbaukueche), guestToilet: w.gaeste_wc ? 'YES' : 'NOT_APPLICABLE', constructionYear: o.gebaeude.baujahr,
    lastRefurbishment: Math.max(0, ...(w.ausstattung || []).map((a) => Number(a.jahr) || 0)) || undefined,
    value: o.preis.kaufpreis, currency: 'EUR', livingSpace: w.wohnflaeche, numberOfRooms: w.zimmer, numberOfBedRooms: w.schlafzimmer, numberOfBathRooms: w.badezimmer,
    serviceCharge: o.weg?.hausgeld_monat, rented: w.nutzung?.vermietet ? 'YES' : 'NOT_APPLICABLE', rentalIncome: w.nutzung?.kaltmiete_monat ?? undefined,
    freeFrom: w.nutzung?.frei_ab, parkingSpacePrice: o.preis.stellplatz?.im_kaufpreis ? undefined : o.preis.stellplatz?.kaufpreis,
    hasCourtage: c.mitVertrag ? 'YES' : 'NO', courtage: c.mitVertrag ? `${c.provision.kaeufer_text} inkl. MwSt.` : undefined,
    courtageNote: c.mitVertrag ? `Käuferprovision ${c.provision.kaeufer_text} des Kaufpreises inkl. 19 % USt, fällig mit notariellem Kaufvertrag. Der Verkäufer zahlt Provision in gleicher Höhe. Maklervertrag in Textform mit Widerrufsbelehrung vor Exposé-Versand: ${BASIS}/objekte/${c.slug}/anfordern/` : undefined,
    energyPerformanceCertificate: ea.vorhanden === true, buildingEnergyRatingType: ea.art === 'bedarf' ? 'ENERGY_REQUIRED' : ea.art === 'verbrauch' ? 'ENERGY_CONSUMPTION' : 'NO_INFORMATION',
    thermalCharacteristic: ea.kennwert, energyConsumptionContainsWarmWater: ea.warmwasser_enthalten ? 'YES' : 'NOT_APPLICABLE',
    _energieeffizienzklasse: ea.effizienzklasse, _energieausweis_ausgestellt_am: ea.ausgestellt_am, _energietraeger: ea.energietraeger,
  };
}

// ---------- Hauptlauf ----------
fs.rmSync(AUS, { recursive: true, force: true });
const objekteOrdner = path.join(WURZEL, 'objekte');
const slugs = fs.readdirSync(objekteOrdner).filter((d) => !d.startsWith('_') && !d.startsWith('.') && fs.existsSync(path.join(objekteOrdner, d, 'objekt.yaml')));
const gebaut = [];
const globalCtx = { firma, links, freigabe: { ...firma.freigabe } };

for (const slug of slugs) {
  const ordner = path.join(objekteOrdner, slug);
  const o = ladeYaml(path.join(ordner, 'objekt.yaml'));
  if (PRODUKTION && (o.muster || !['veroeffentlicht', 'reserviert', 'verkauft'].includes(o.status))) { console.log(`übersprungen (${o.muster ? 'Muster' : o.status}): ${slug}`); continue; }
  pruefeObjekt(slug, o, ordner);
  if (fehler.length) continue;

  const freigabe = { ...firma.freigabe, ...(o.freigabe?.modus ? { modus: o.freigabe.modus } : {}) };
  freigabe.ab_text = `dem ${15 + freigabe.karenz_tage}. Tag nach Ihrer Bestellung`;
  const provisionProzent = Number(o.provision.kaeufer_prozent);
  const mitVertrag = provisionProzent > 0;
  const lageKurz = [o.lage.ort, o.lage.stadtteil].filter(Boolean).join('-');
  const c = {
    slug, o, mitVertrag, provisionProzent, lageKurz, freigabe,
    kaufpreisText: euro(o.preis.kaufpreis),
    adresseVoll: [[o.lage.strasse, o.lage.hausnummer].filter(Boolean).join(' '), [o.lage.plz, o.lage.ort].filter(Boolean).join(' ') + (o.lage.stadtteil ? `-${o.lage.stadtteil}` : ''), o.lage.lage_im_haus].filter(Boolean).join(', '),
    provision: {
      kaeufer_text: prozent(o.provision.kaeufer_prozent), verkaeufer_text: prozent(o.provision.verkaeufer_prozent),
      kaeufer_beispiel: euro(Math.round(Number(o.preis.kaufpreis) * provisionProzent) / 100, 2),
    },
  };
  const ctx = { ...globalCtx, freigabe, objekt: { titel: o.titel, nummer: o.nummer, lage_kurz: lageKurz, kaufpreis_text: c.kaufpreisText }, provision: c.provision };
  c.rechtstexte = Object.fromEntries(RT_IDS.map((id) => [id, rechtstext(id, ctx)]));
  c.erklaerungen = BEST.erklaerungen
    .filter((e) => mitVertrag || e.id === 'vertraulichkeit')
    .map((e) => { const text = fuelle(e.text, ctx, `bestaetigungen.yaml/${e.id}`).replace(/\s+/g, ' ').trim(); return { id: e.id, wann: e.wann, link: e.link, text, version: BEST.version, sha256: sha256(text) }; });
  c.beginn = { frage: BEST.beginn.frage, optionen: BEST.beginn.optionen.map((op) => ({ ...op, hilfe: fuelle(op.hilfe, ctx) })) };
  c.fassung = `${BEST.version}:${sha256(JSON.stringify([c.erklaerungen.map((e) => e.sha256), Object.values(c.rechtstexte).map((r) => r.sha256), freigabe.button_text])).slice(0, 16)}`;

  // öffentliche Seiten
  schreibe(path.join(WEB, 'objekte', slug, 'index.html'), kurzExpose(c));
  if (!['reserviert', 'verkauft'].includes(o.status)) {
    schreibe(path.join(WEB, 'objekte', slug, 'anfordern', 'index.html'), anfordern(c));
    for (const fall of ['sofort', 'frist', 'manuell']) schreibe(path.join(WEB, 'objekte', slug, 'danke', fall, 'index.html'), danke(c, fall));
  }
  if (mitVertrag) schreibe(path.join(WEB, 'objekte', slug, 'maklervertrag', 'index.html'), rechtstextSeite(c.rechtstexte['maklervertrag-kaeufer'].titel, c.rechtstexte['maklervertrag-kaeufer'].html, o.muster, `/objekte/${slug}/anfordern/`));
  for (const f of (o.fotos || []).filter((x) => x.oeffentlich)) kopiere(path.join(ordner, 'bilder', f.datei), path.join(WEB, 'expose-assets', 'objekte', slug, f.datei));

  // geschützt
  schreibe(path.join(BACK, 'geschuetzt', `${slug}.html`), vollExpose(c, ordner));
  schreibe(path.join(BACK, 'objekte', `${slug}.json`), JSON.stringify({
    slug, nummer: o.nummer, titel: o.titel, muster: Boolean(o.muster), status: o.status, lage_kurz: lageKurz, adresse_voll: c.adresseVoll,
    mit_maklervertrag: mitVertrag, provision: c.provision, kaufpreis: o.preis.kaufpreis, freigabe, fassung: c.fassung,
    erklaerungen: c.erklaerungen.map(({ id, wann, text, version, sha256: h }) => ({ id, wann, text, version, sha256: h })),
    beginn_optionen: c.beginn.optionen.map((x) => x.wert),
    rechtstexte: Object.fromEntries(Object.entries(c.rechtstexte).map(([id, r]) => [id, { titel: r.titel, version: r.version, sha256: r.sha256, text: r.text }])),
    urls: { kurz: `/objekte/${slug}/`, anfordern: `/objekte/${slug}/anfordern/`, danke: { sofort: `/objekte/${slug}/danke/sofort/`, frist: `/objekte/${slug}/danke/frist/`, manuell: `/objekte/${slug}/danke/manuell/` } },
  }, null, 2));
  schreibe(path.join(AUS, 'is24', `${slug}.json`), JSON.stringify(immoscout(c), null, 2));
  gebaut.push({ slug, titel: o.titel, nummer: o.nummer, muster: Boolean(o.muster) });
}

if (fehler.length) {
  console.error('\nFEHLER (nichts gebaut):'); for (const f of fehler) console.error('  ✗ ' + f);
  if (warnungen.length) { console.error('\nWarnungen:'); for (const w of warnungen) console.error('  ! ' + w); }
  fs.rmSync(AUS, { recursive: true, force: true });
  process.exit(1);
}

// globale Seiten
const ctxG = { ...globalCtx };
const wb = rechtstext('widerrufsbelehrung', ctxG); const wf = rechtstext('widerrufsformular', ctxG);
const ds = rechtstext('datenschutz-expose', ctxG); const wv = rechtstext('weitergabeverbot', ctxG); const gw = rechtstext('gwg-hinweis', ctxG);
schreibe(path.join(WEB, 'expose-recht', 'widerrufsbelehrung', 'index.html'), rechtstextSeite('Widerrufsbelehrung', wb.html + wf.html + '<p><a class="widerruf-link" href="/vertrag-widerrufen/">Vertrag widerrufen</a></p>'));
schreibe(path.join(WEB, 'expose-recht', 'datenschutz', 'index.html'), rechtstextSeite('Datenschutzhinweis Exposé', ds.html));
schreibe(path.join(WEB, 'expose-recht', 'vertraulichkeit', 'index.html'), rechtstextSeite('Vertraulichkeit', wv.html));
schreibe(path.join(WEB, 'expose-recht', 'gwg', 'index.html'), rechtstextSeite('Geldwäschegesetz', gw.html));

// Widerrufsfunktion (§ 356a BGB), Schritt 1
const objektOptionen = gebaut.map((g) => `<option value="${esc(g.slug)}">${esc(g.nummer)}: ${esc(g.titel)}</option>`).join('');
schreibe(path.join(WEB, 'vertrag-widerrufen', 'index.html'), layout({ titel: 'Vertrag widerrufen', inhalt: `<section><div class="wrap">
<p class="eyebrow">Widerruf · Schritt 1 von 2</p>
<h1>Vertrag widerrufen</h1>
<p class="lede">Hier widerrufen Sie einen Maklervertrag, den Sie online mit ${esc(firma.name)} geschlossen haben. Eine Begründung ist nicht nötig. Im nächsten Schritt sehen Sie Ihre Angaben noch einmal und bestätigen den Widerruf.</p>
<form class="formular" method="post" action="/widerruf.php" style="margin-top:28px">
<input type="hidden" name="schritt" value="1">
<div class="hp" aria-hidden="true"><label for="w-website">Bitte leer lassen</label><input id="w-website" name="website" type="text" tabindex="-1" autocomplete="off"></div>
<div class="feld"><label for="w-name">Ihr Name</label><input id="w-name" name="name" type="text" required maxlength="80" autocomplete="name"></div>
<div class="feld"><label for="w-email">E-Mail-Adresse für die Eingangsbestätigung</label><input id="w-email" name="email" type="email" required maxlength="254" autocomplete="email"><p class="hilfe">Am besten die Adresse, mit der Sie das Exposé angefordert haben.</p></div>
<div class="feld"><label for="w-vorgang">Vorgangsnummer <span class="opt">(steht in der Bestätigungs-E-Mail, falls zur Hand)</span></label><input id="w-vorgang" name="vorgang" type="text" maxlength="40" autocomplete="off"></div>
<div class="feld"><label for="w-objekt">Welcher Vertrag? <span class="opt">(Objekt)</span></label><select id="w-objekt" name="objekt"><option value="">alle meine Maklerverträge mit dieser E-Mail-Adresse</option>${objektOptionen}</select></div>
<div class="absenden"><button class="btn" type="submit">Weiter zur Bestätigung</button></div>
<p class="klein" style="margin-top:14px">Sie können auch per E-Mail an <a href="mailto:${esc(firma.email)}">${esc(firma.email)}</a> oder per Brief widerrufen (<a href="/expose-recht/widerrufsbelehrung/">Widerrufsbelehrung</a>).</p>
</form></div></section>` }));

// Seitenhülle für PHP-Antworten
schreibe(path.join(BACK, 'vorlagen', 'seite.html'), layout({ titel: '<!--TITEL-->', inhalt: '<section><div class="wrap prosa"><!--INHALT--></div></section>' }).replace(`&lt;!--TITEL--&gt;`, '<!--TITEL-->'));

// Assets, Backend, PHP-Endpunkte
for (const f of ['expose.css', 'formular.js']) kopiere(path.join(WURZEL, 'assets', f), path.join(WEB, 'expose-assets', f));
for (const f of ['instrument-sans-latin.woff2', 'libre-franklin-latin.woff2']) kopiere(path.join(WURZEL, 'assets', f), path.join(WEB, 'expose-assets', 'fonts', f));
for (const f of fs.readdirSync(path.join(WURZEL, 'backend', 'lib'))) kopiere(path.join(WURZEL, 'backend', 'lib', f), path.join(BACK, 'lib', f));
for (const f of fs.readdirSync(path.join(WURZEL, 'backend', 'oeffentlich'))) kopiere(path.join(WURZEL, 'backend', 'oeffentlich', f), path.join(WEB, f));
kopiere(path.join(WURZEL, 'backend', 'config.beispiel.php'), path.join(BACK, 'config.beispiel.php'));
schreibe(path.join(BACK, 'objekte', 'index.json'), JSON.stringify(gebaut, null, 2));
schreibe(path.join(WEB, 'objekte', 'robots.txt'), '');

// Marker-Prüfung
const markerFunde = [];
(function scan(d) {
  for (const n of fs.readdirSync(d)) {
    const p = path.join(d, n);
    if (fs.statSync(p).isDirectory()) scan(p);
    else if (/\.(html|json)$/.test(n)) {
      const t = fs.readFileSync(p, 'utf8'); const m = t.match(MARKER_RE);
      if (m) markerFunde.push(`${path.relative(AUS, p)}: ${[...new Set(m)].slice(0, 3).join(', ')}${m.length > 3 ? ' …' : ''}`);
    }
  }
})(AUS);

console.log(`Gebaut: ${gebaut.length} Objekt(e) → ${path.relative(process.cwd(), AUS) || AUS}`);
for (const g of gebaut) console.log(`  ✓ /objekte/${g.slug}/${g.muster ? '  (MUSTER)' : ''}`);
if (warnungen.length) { console.log('\nWarnungen:'); for (const w of warnungen) console.log('  ! ' + w); }
if (markerFunde.length) {
  console.log(`\nOffene Marker in ${markerFunde.length} Datei(en)${PRODUKTION ? '' : ' (in der Vorschau erlaubt)'}:`);
  for (const m of markerFunde.slice(0, 12)) console.log('  · ' + m);
  if (PRODUKTION) { console.error('\nProduktion abgebrochen: Marker [LINUS]/[ZU PRÜFEN]/[ENTWURF] auflösen.'); fs.rmSync(AUS, { recursive: true, force: true }); process.exit(1); }
}
