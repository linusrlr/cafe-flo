// npm run offen [-- --seite /kontakt/] [-- --kurz]
// Listet alle offenen [LINUS: …]- und [ZU PRÜFEN: …]-Stellen mit Datei und Zeile, ordnet LINUS-Stellen den
// Fragen aus LAPTOP-FRAGEBOGEN.md zu (sonst FRAGEN-AN-LINUS.md) und zeigt, welche Seiten aus veroeffentlichen.yaml blockiert sind.
// Zuordnung im Fragebogen: über das fakten.yaml-Feld („Wert fehlt in bauplan/fakten.yaml: firma.anschrift“ → Frage, die `firma.anschrift` nennt)
// oder über einen Verweis „Fragebogen A1“ im Markertext.
import { readFileSync, existsSync } from 'node:fs';
import path from 'node:path';

process.env.SITE_MODE = 'vorschau'; // alle Seiten rendern
const { alleSeiten, rendere, leseVeroeffentlichen, REPO_PFAD } = await import('../src/lib/inhalte.mjs').then((m) => ({ ...m, REPO_PFAD: path.resolve('..') }));

const args = process.argv.slice(2);
const nurSeite = args.includes('--seite') ? args[args.indexOf('--seite') + 1] : null;
const kurz = args.includes('--kurz');
const fett = (s) => (process.stdout.isTTY ? `\x1b[1m${s}\x1b[0m` : s);
const gelb = (s) => (process.stdout.isTTY ? `\x1b[33m${s}\x1b[0m` : s);
const gruen = (s) => (process.stdout.isTTY ? `\x1b[32m${s}\x1b[0m` : s);
const rot = (s) => (process.stdout.isTTY ? `\x1b[31m${s}\x1b[0m` : s);

// Fragen aus LAPTOP-FRAGEBOGEN.md (bevorzugt) oder FRAGEN-AN-LINUS.md
const fragebogenDatei = path.join(REPO_PFAD, 'LAPTOP-FRAGEBOGEN.md');
const neuerBogen = existsSync(fragebogenDatei);
const fragenDatei = neuerBogen ? fragebogenDatei : path.join(REPO_PFAD, 'FRAGEN-AN-LINUS.md');
const fragen = [];
if (existsSync(fragenDatei)) {
  const t = readFileSync(fragenDatei, 'utf8');
  for (const m of t.matchAll(/^- \[[ x]\] \*\*(\d+\.\d+|A\d+) ([^*]+)\*\*([^\n]*)\n((?:(?!^- \[|^#).*\n?)*)/gm)) {
    const seiten = (m[3].match(/\(([^)]*)\)/) ?? [])[1] ?? '';
    const felder = [...(m[3] + m[4]).matchAll(/`([a-z0-9_]+\.[a-z0-9_.]+)`/g)].map((x) => x[1]);
    fragen.push({ nr: m[1], titel: m[2].trim().replace(/\.$/, ''), seiten: seiten.toLowerCase(), felder, text: (m[2] + m[3] + m[4]).toLowerCase() });
  }
}
// feste Zuordnungen (Stichwort im Marker → Frage); danach Wortähnlichkeit
const REGELN = [
  [/erreichbar|abends|samstag|sonntag|rückrufzeit|zeiten, zum beispiel/i, '1.6'],
  [/anschrift|standort|geschäftsadresse|sitz in baden|niederlauer|ihk des neuen|lfdi|aufsichtsbehörde/i, '1.1'],
  [/erlaubnis\.(erteilt_am|behoerde)|aktenzeichen|zuständige ihk|bescheid/i, '1.2'],
  [/widerruf|muster.*anwalt/i, '1.8'],
  [/whatsapp|video/i, '1.4'],
  [/provision|kleinunternehmer|innenprovision/i, '1.7'],
  [/alleinauftrag|maklervertrag/i, '1.8'],
  [/verkaufsplan.*(muster|beispiel)|muster-verkaufsplan/i, '1.9'],
  [/studium|ausbildung|berufsweg|projektcontrolling|werdegang/i, '2.1'],
  [/bezug zu|aufgewachsen|wohnhaft|rössle/i, '2.2'],
  [/eigene wohnung|eigenen wohnung/i, '2.3'],
  [/auswärtig|besichtigungen für .*erben/i, '2.16'],
  [/foto|porträt/i, '2.4'],
  [/ivd|bvfi|weiterbildung|zertifikat|haftpflicht/i, '2.5'],
  [/zwei werktage|frist bestätigen|finanzierungsnachweis|nachweis vor der besichtigung|wochenbericht/i, '2.6'],
  [/zahlungsziel|rechnung an/i, '2.7'],
  [/home staging|portale|fotograf/i, '2.8'],
  [/grundbuchauszug|unterlagen.*pauschale|beschaffung/i, '2.9'],
  [/vorgemerkte|käuferkartei|interessenten/i, '2.10'],
  [/verkaufsdauer|eigene einschätzung für leonberg|monate.*notartermin/i, '2.11'],
  [/allein verkauft|ohne folgeauftrag/i, '2.12'],
  [/einzelleistung|privatverkäufer/i, '2.13'],
  [/wertermittlung gegen honorar|neutrale/i, '2.14'],
  [/scheidung|beide gemeinsam/i, '2.15'],
  [/auswärtig|erben/i, '2.16'],
  [/bedenkzeit|bindend|abschlag|ankauf/i, '2.17'],
  [/eigenankauf/i, '2.18'],
  [/pdf|download|checkliste|linkziel fehlt/i, '2.19'],
  [/musterschreiben|mieterinformation/i, '2.20'],
  [/rechner/i, '2.21'],
  [/beobachtung|stimmt das|aufzug/i, '2.22'],
  [/steuerberater|sachverständig|notar|familienrecht|entrümpel|netzwerk/i, '2.23'],
  [/sofortankauf|60 %|40 %/i, '2.24'],
  [/telefonnummer.*überall|antwort in einem werktag/i, '2.25'],
  [/wohnanlage|hausgeld-spanne/i, '3.1'], [/hausverwaltung/i, '3.2'], [/gutachterausschuss|amtsgericht/i, '3.3'],
];
const stamm = (s) => new Set((s.toLowerCase().match(/[a-zäöüß]{5,}/g) ?? []).map((w) => w.slice(0, 6)));
function ordneZu(marker, seite) {
  if (neuerBogen) {
    const verweis = marker.text.match(/Fragebogen (\d+\.\d+|A\d+)/);
    if (verweis && fragen.some((f) => f.nr === verweis[1])) return verweis[1];
    const feld = marker.text.match(/fakten\.yaml: ([a-z0-9_.]+)/)?.[1];
    if (feld) {
      let best = null, laenge = 0;
      for (const f of fragen) for (const x of f.felder) if ((feld === x || feld.startsWith(x + '.')) && x.length > laenge) { best = f.nr; laenge = x.length; }
      if (best) return best;
    }
  } else for (const [re, nr] of REGELN) if (re.test(marker.text)) return nr;
  const ms = stamm(marker.text);
  let best = null, punkte = 0;
  for (const f of fragen) {
    const fs = stamm(f.text);
    let p = [...ms].filter((w) => fs.has(w)).length;
    if (f.seiten.includes(seite.kurztitel.toLowerCase())) p += 1;
    if (p > punkte) { punkte = p; best = f.nr; }
  }
  return punkte >= 3 ? best : null;
}

const seiten = alleSeiten().filter((s) => (!nurSeite || s.url === nurSeite) && s.typ !== 'fehler');
const gruppen = new Map(); // nr → [eintrag]
const pruefen = [];
const proSeite = new Map();
for (const s of seiten) {
  const r = rendere(s);
  const liste = [...r.marker, ...r.linksFehlend.map((l) => ({ art: 'linus', text: `[Linkziel fehlt: ${l.href} („${l.text}“) – Datei anlegen oder Link streichen]`, zeile: null }))];
  proSeite.set(s.url, { seite: s, linus: 0, pruefen: 0 });
  for (const m of liste) {
    const e = { s, m };
    if (m.art === 'pruefen') { pruefen.push(e); proSeite.get(s.url).pruefen++; continue; }
    proSeite.get(s.url).linus++;
    const nr = ordneZu(m, s) ?? 'ohne';
    if (!gruppen.has(nr)) gruppen.set(nr, []);
    gruppen.get(nr).push(e);
  }
}
const zeile = ({ s, m }) => `    ${s.relDatei}:${m.zeile ?? '?'}  ${gelb(s.url)}  ${kurz ? m.text.slice(0, 110) + (m.text.length > 110 ? '…' : '') : m.text}`;

if (!kurz || true) {
  console.log(fett(`\n=== [LINUS]-Stellen nach Fragen (${path.basename(fragenDatei)}) ===\n`));
  const reihenfolge = [...gruppen.keys()].sort((a, b) => (a === 'ohne') - (b === 'ohne') || a.localeCompare(b, 'de', { numeric: true }));
  for (const nr of reihenfolge) {
    const f = fragen.find((x) => x.nr === nr);
    console.log(fett(nr === 'ohne' ? 'Ohne Zuordnung (direkt im Text beantworten)' : `Frage ${nr}: ${f?.titel ?? ''}`) + `  (${gruppen.get(nr).length})`);
    for (const e of gruppen.get(nr)) console.log(zeile(e));
    console.log('');
  }
  console.log(fett(`=== [ZU PRÜFEN]-Stellen (Fakten prüfen, ggf. bauplan/fakten.yaml) ===  (${pruefen.length})\n`));
  for (const e of pruefen) console.log(zeile(e));
}

// Veröffentlichung
const { datei, urls } = leseVeroeffentlichen();
console.log(fett(`\n=== Freigabe laut ${path.relative(REPO_PFAD, datei)} ===\n`));
if (!urls.length) console.log('  (noch keine Seite eingetragen)');
for (const u of urls) {
  const p = proSeite.get(u);
  if (!p) { console.log(`  ${u}  (Systemseite)`); continue; }
  const n = p.linus + p.pruefen;
  console.log(`  ${n ? rot('BLOCKIERT') : gruen('bereit   ')}  ${u.padEnd(42)} ${n ? `${p.linus} LINUS, ${p.pruefen} ZU PRÜFEN` : ''}`);
}
const fertig = [...proSeite.values()].filter((p) => !p.linus && !p.pruefen && !urls.includes(p.seite.url) && !['danke'].includes(p.seite.typ));
if (fertig.length) console.log(`\n  Ohne offene Stellen, aber noch nicht freigeschaltet: ${fertig.map((p) => p.seite.url).join(', ')}`);
const pflicht = ['/impressum/', '/datenschutz/'].filter((u) => urls.length && !urls.includes(u));
if (pflicht.length) console.log(rot(`\n  Achtung: ${pflicht.join(' und ')} fehlen in der Liste. Ohne Impressum und Datenschutz nicht veröffentlichen.`));
const summe = [...proSeite.values()].reduce((a, p) => a + p.linus + p.pruefen, 0);
console.log(`\nGesamt: ${summe} offene Stellen auf ${[...proSeite.values()].filter((p) => p.linus + p.pruefen).length} Seiten.\n`);
