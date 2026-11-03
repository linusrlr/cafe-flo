#!/usr/bin/env node
// Ende-zu-Ende-Test: Generator, PHP-Backend (php -S), Playwright-Screenshots, PDF.
//   node tests/test.mjs            (aus dem Ordner expose/)
// Ergebnis: Screenshots und PDF in screenshots/, Testdaten in tests/tmp/ (wird bei jedem Lauf neu angelegt).
import fs from 'node:fs';
import path from 'node:path';
import { spawn, spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const { chromium } = require('playwright');
const WURZEL = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const DIST = path.join(WURZEL, 'dist');
const TMP = path.join(WURZEL, 'tests', 'tmp');
const DATEN = path.join(TMP, 'expose-daten');
const SHOTS = path.join(WURZEL, 'screenshots');
const PORT = 8765;
const BASIS = `http://127.0.0.1:${PORT}`;
const SLUG = 'muster-leonberg-eltingen-3-zimmer';

let ok = 0; let nok = 0;
const pruefe = (bed, text) => { if (bed) { ok++; console.log('  ✓ ' + text); } else { nok++; console.log('  ✗ ' + text); } };

// ---------- 1. Generator ----------
console.log('1. Generator');
fs.rmSync(TMP, { recursive: true, force: true }); fs.mkdirSync(DATEN, { recursive: true });
const gen = spawnSync('node', ['lib/generator.mjs', '--basis', BASIS], { cwd: WURZEL, encoding: 'utf8' });
pruefe(gen.status === 0, 'Generator läuft ohne Fehler');
if (gen.status !== 0) { console.log(gen.stdout, gen.stderr); process.exit(1); }
for (const p of [`web/objekte/${SLUG}/index.html`, `web/objekte/${SLUG}/anfordern/index.html`, `web/vertrag-widerrufen/index.html`, `expose-backend/geschuetzt/${SLUG}.html`, `expose-backend/objekte/${SLUG}.json`, `is24/${SLUG}.json`]) {
  pruefe(fs.existsSync(path.join(DIST, p)), `erzeugt: ${p}`);
}
const kurzHtml = fs.readFileSync(path.join(DIST, `web/objekte/${SLUG}/index.html`), 'utf8');
pruefe(!/Musterweg|12, 71229/.test(kurzHtml), 'Kurz-Exposé enthält keine Hausnummer/Straße');
pruefe(/Energieverbrauchsausweis/.test(kurzHtml) && /128 kWh/.test(kurzHtml) && /Erdgas/.test(kurzHtml) && />D</.test(kurzHtml), 'Kurz-Exposé enthält Energieausweis-Pflichtangaben (§ 87 GModG)');
pruefe(!fs.readdirSync(path.join(DIST, 'web/expose-assets/objekte', SLUG)).includes('bad.svg'), 'nicht-öffentliche Fotos liegen nicht im Webroot');

// Produktionslauf muss wegen Muster/Markern scheitern bzw. Muster überspringen
const prod = spawnSync('node', ['lib/generator.mjs', '--produktion', '--aus', 'tests/tmp/dist-prod'], { cwd: WURZEL, encoding: 'utf8' });
pruefe(/übersprungen \(Muster\)/.test(prod.stdout), 'Produktionslauf überspringt das Muster-Objekt');

// ---------- 2. Server ----------
console.log('2. PHP-Server');
const config = (extra = '') => `<?php return [
  'basis_url' => '${BASIS}', 'origin' => ['${BASIS}'], 'geheim' => '${'t'.repeat(64)}',
  'daten' => '${DATEN}', 'zeitzone' => 'Europe/Berlin', 'freigabe_modus' => null, 'max_abrufe' => 60,
  'limits' => ['ip' => [[200, 600], [500, 86400]], 'email' => [[3, 86400]]], 'ip_modus' => 'gekuerzt+hmac',
  'mail' => ['transport' => 'datei', 'absender' => 'anfrage@roessler-immo.de', 'absender_name' => 'Linus Rössler', 'antwort_an' => 'linus@roessler-immo.de', 'an_linus' => 'linus@roessler-immo.de'],
  ${extra}
];`;
const CFG = path.join(DIST, 'expose-backend', 'config.php');
fs.writeFileSync(CFG, config());
const php = spawn('php', ['-S', `127.0.0.1:${PORT}`, '-t', path.join(DIST, 'web'), path.join(WURZEL, 'tests/router.php')], { stdio: ['ignore', 'pipe', 'pipe'] });
let phpLog = ''; php.stderr.on('data', (d) => { phpLog += d; });
await new Promise((r) => setTimeout(r, 800));
const schreibeConfig = async (inhalt) => { fs.writeFileSync(CFG, inhalt); await new Promise((r) => setTimeout(r, 2100)); }; // OPcache prüft Zeitstempel alle 2 s
const ende = (code) => { php.kill(); process.exit(code); };

const mails = () => (fs.existsSync(path.join(DATEN, 'test-mails')) ? fs.readdirSync(path.join(DATEN, 'test-mails')).sort().map((f) => path.join(DATEN, 'test-mails', f)) : []);
const qp = (eml) => {
  const i = eml.indexOf('\r\n\r\n'); const kopf = eml.slice(0, i); let k = eml.slice(i + 4).replace(/=\r?\n/g, '');
  const bytes = []; for (let j = 0; j < k.length; j++) { if (k[j] === '=' && /^[0-9A-F]{2}$/.test(k.substr(j + 1, 2))) { bytes.push(parseInt(k.substr(j + 1, 2), 16)); j += 2; } else bytes.push(k.charCodeAt(j)); }
  return kopf + '\n\n' + Buffer.from(bytes).toString('utf8').replace(/\r\n/g, '\n');
};
const neueMail = (vorher, art) => mails().filter((m) => !vorher.includes(m) && m.endsWith(`-${art}.eml`)).map((m) => qp(fs.readFileSync(m, 'latin1')));

const browser = await chromium.launch();
try {
  // ---------- 3. Kurz-Exposé ----------
  console.log('3. Kurz-Exposé und Formular (Screenshots)');
  const desk = await browser.newContext({ viewport: { width: 1280, height: 900 }, deviceScaleFactor: 1 });
  const mob = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true });
  for (const [ctx, n] of [[desk, 'desktop'], [mob, 'mobil']]) {
    const p = await ctx.newPage();
    const r = await p.goto(`${BASIS}/objekte/${SLUG}/`);
    pruefe(r.status() === 200, `Kurz-Exposé lädt (${n})`);
    await p.screenshot({ path: path.join(SHOTS, `kurz-expose-${n}.png`), fullPage: true });
    const breit = await p.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1);
    pruefe(breit, `kein horizontales Scrollen (${n})`);
    await p.goto(`${BASIS}/objekte/${SLUG}/anfordern/`);
    const vorbelegt = await p.evaluate(() => [...document.querySelectorAll('input[type=checkbox],input[type=radio]')].filter((i) => i.checked || i.defaultChecked || i.hasAttribute('checked')).length);
    pruefe(vorbelegt === 0, `keine Checkbox/Option vorausgewählt (${n})`);
    const btn = await p.textContent('button[type=submit]');
    pruefe(btn.trim() === 'zahlungspflichtig bestellen', `Schaltfläche heißt „zahlungspflichtig bestellen“ (${n})`);
    pruefe(await p.isHidden('#sofort-erklaerungen'), `Sofort-Erklärungen erst nach Auswahl sichtbar (${n})`);
    await p.check('#b-sofort');
    pruefe(await p.isVisible('#sofort-erklaerungen'), `Sofort-Erklärungen nach Auswahl „Sofort“ sichtbar (${n})`);
    await p.uncheck('#b-sofort').catch(() => {});
    await p.reload();
    await p.screenshot({ path: path.join(SHOTS, `freigabe-formular-${n}.png`), fullPage: true });
    pruefe(await p.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1), `Formular ohne horizontales Scrollen (${n})`);
  }

  // ---------- 4. Validierung ----------
  console.log('4. Validierung');
  const p = await mob.newPage();
  await p.goto(`${BASIS}/objekte/${SLUG}/anfordern/`);
  await p.click('button[type=submit]');
  await p.waitForSelector('.fehlermeldung');
  const nFehler = await p.locator('.fehlermeldung').count();
  pruefe(nFehler >= 4, `leeres Formular: ${nFehler} Fehlermeldungen am Feld`);
  await p.locator('#meldung').scrollIntoViewIfNeeded();
  await p.screenshot({ path: path.join(SHOTS, 'freigabe-formular-fehler-mobil.png'), fullPage: false });

  // ---------- 5. Vertragsschluss „sofort“ ----------
  console.log('5. Vertragsschluss „sofort“, Mails, Nachweis, Exposé');
  let vorher = mails();
  await p.fill('#f-name', 'Erika Mustermann');
  await p.fill('#f-email', 'erika@example.org');
  await p.fill('#f-telefon', '0711 123456');
  await p.check('#e-maklervertrag'); await p.check('#e-widerrufsbelehrung');
  await p.check('#b-sofort'); await p.check('#e-vorzeitig_verlangen'); await p.check('#e-vorzeitig_kenntnis');
  await p.check('#e-vertraulichkeit');
  await p.waitForTimeout(4200); // Zeitprüfung gegen Bots
  await Promise.all([p.waitForURL(/danke\/sofort/), p.click('button[type=submit]')]);
  pruefe(true, 'Weiterleitung auf /danke/sofort/');
  await p.screenshot({ path: path.join(SHOTS, 'danke-mobil.png') });
  const mI = neueMail(vorher, 'interessent'); const mL = neueMail(vorher, 'linus');
  pruefe(mI.length === 1 && mL.length === 1, 'je eine Mail an Interessent und Linus');
  const mail = mI[0] || '';
  for (const s of ['MAKLERVERTRAG FÜR KAUFINTERESSENTEN', 'WIDERRUFSBELEHRUNG', 'MUSTER-WIDERRUFSFORMULAR', 'DATENSCHUTZHINWEIS', '„zahlungspflichtig bestellen“', '[x] Ich verlange ausdrücklich', 'Fassung 2026-11-03.1', '/vertrag-widerrufen/']) pruefe(mail.includes(s), `Interessenten-Mail enthält ${s}`);
  const ohneUrls = (t) => t.replace(/https?:\/\/127\.0\.0\.1:\d+/g, '').replace(/@127\.0\.0\.1>/g, '');
  pruefe(!/127\.0\.0\.1/.test(ohneUrls(mL[0] || '')), 'Mail an Linus ohne IP-Adresse');
  const link = (mail.match(/(http:\/\/127\.0\.0\.1:\d+\/expose\.php\?t=[A-Za-z0-9_.-]+)/) || [])[1];
  const vorgang = (mail.match(/Vorgang (EX-\d{6}-[0-9A-F]{8})/) || [])[1];
  pruefe(Boolean(link) && Boolean(vorgang), `Exposé-Link und Vorgangsnummer in der Mail (${vorgang})`);
  const nachweis = fs.readFileSync(path.join(DATEN, 'nachweise', fs.readdirSync(path.join(DATEN, 'nachweise')).find((f) => f.endsWith('.jsonl'))), 'utf8').trim().split('\n').map((z) => JSON.parse(z)).find((z) => z.vorgang === vorgang);
  pruefe(nachweis && nachweis.erklaerungen.length === 5 && nachweis.erklaerungen.every((e) => e.text && e.version && e.sha256), 'Nachweis: 5 Erklärungen mit Wortlaut, Fassung und SHA-256');
  pruefe(nachweis && nachweis.technik.ip_gekuerzt === '127.0.0.0' && /^[0-9a-f]{64}$/.test(nachweis.technik.ip_hmac) && !/127\.0\.0\.1/.test(ohneUrls(JSON.stringify(nachweis))), 'Nachweis: IP nur gekürzt und als HMAC');
  pruefe(nachweis && nachweis.technik.user_agent.length > 10 && nachweis.schaltflaeche === 'zahlungspflichtig bestellen', 'Nachweis: User-Agent und Schaltflächentext');
  pruefe(fs.existsSync(path.join(DATEN, 'nachweise/mails', `${vorgang}-interessent.eml`)), 'Nachweis: Kopie der Bestätigungs-Mail gespeichert');

  const dp = await desk.newPage();
  const rE = await dp.goto(link);
  pruefe(rE.status() === 200 && (await dp.content()).includes('Erika Mustermann'), 'Voll-Exposé abrufbar und personalisiert');
  pruefe((await dp.content()).includes('Musterweg 12'), 'Voll-Exposé enthält die Adresse');
  await dp.screenshot({ path: path.join(SHOTS, 'voll-expose-desktop.png'), fullPage: false });
  await dp.emulateMedia({ media: 'print' });
  await dp.pdf({ path: path.join(SHOTS, 'voll-expose-muster.pdf'), format: 'A4', printBackground: true, preferCSSPageSize: true });
  await dp.emulateMedia({ media: 'screen' });
  pruefe(fs.statSync(path.join(SHOTS, 'voll-expose-muster.pdf')).size > 50000, 'PDF erzeugt');
  const mp = await mob.newPage(); await mp.goto(link);
  await mp.screenshot({ path: path.join(SHOTS, 'voll-expose-mobil.png'), fullPage: false });
  pruefe(await mp.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1), 'Voll-Exposé mobil ohne horizontales Scrollen');

  const kaputt = link.slice(0, -3) + (link.endsWith('AAA') ? 'BBB' : 'AAA');
  pruefe((await (await fetch(kaputt)).status) === 404, 'manipulierter Token → 404');
  pruefe((await (await fetch(`${BASIS}/expose.php?t=abc`)).status) === 404, 'geratener Token → 404');
  pruefe((await (await fetch(`${BASIS}/../expose-backend/geschuetzt/${SLUG}.html`)).status) === 404, 'geschützte Datei nicht über HTTP erreichbar');

  // ---------- 6. „nach Frist“ ----------
  console.log('6. Vertragsschluss „nach Ablauf der Widerrufsfrist“');
  vorher = mails();
  const p2 = await desk.newPage();
  await p2.goto(`${BASIS}/objekte/${SLUG}/anfordern/`);
  await p2.fill('#f-name', 'Max Beispiel'); await p2.fill('#f-email', 'max@example.org');
  await p2.check('#e-maklervertrag'); await p2.check('#e-widerrufsbelehrung'); await p2.check('#b-nach_frist'); await p2.check('#e-vertraulichkeit');
  await p2.waitForTimeout(4200);
  await Promise.all([p2.waitForURL(/danke\/frist/), p2.click('button[type=submit]')]);
  const m2 = neueMail(vorher, 'interessent')[0] || '';
  const link2 = (m2.match(/(http:\/\/127\.0\.0\.1:\d+\/expose\.php\?t=[A-Za-z0-9_.-]+)/) || [])[1];
  pruefe(/funktioniert er erst nach Ablauf der Widerrufsfrist, ab \d\d\.\d\d\.\d{4}/.test(m2), 'Mail nennt das Datum der Freischaltung');
  pruefe(!m2.includes('[x] Ich verlange ausdrücklich'), 'kein „vorzeitiger Beginn“ protokolliert');
  const r2 = await fetch(link2);
  pruefe(r2.status === 403 && (await r2.text()).includes('freigeschaltet'), 'Link vor Fristablauf gesperrt (403)');

  // ---------- 7. Widerrufsfunktion ----------
  console.log('7. Widerrufsfunktion (§ 356a BGB)');
  vorher = mails();
  const w = await mob.newPage();
  await w.goto(`${BASIS}/vertrag-widerrufen/`);
  await w.screenshot({ path: path.join(SHOTS, 'widerruf-mobil.png'), fullPage: true });
  await w.fill('#w-name', 'Erika Mustermann'); await w.fill('#w-email', 'erika@example.org'); await w.fill('#w-vorgang', vorgang);
  await Promise.all([w.waitForLoadState('load'), w.click('button[type=submit]')]);
  pruefe((await w.textContent('h1')).includes('bestätigen') && (await w.textContent('button[type=submit]')).trim() === 'Widerruf bestätigen', 'Schritt 2 mit Schaltfläche „Widerruf bestätigen“');
  await w.screenshot({ path: path.join(SHOTS, 'widerruf-bestaetigen-mobil.png'), fullPage: true });
  await Promise.all([w.waitForLoadState('load'), w.click('button[type=submit]')]);
  pruefe((await w.textContent('h1')).includes('eingegangen'), 'Widerruf eingegangen');
  const mw = neueMail(vorher, 'widerruf')[0] || '';
  pruefe(/Eingang: +\d\d\.\d\d\.\d{4} um \d\d:\d\d:\d\d Uhr/.test(mw) && mw.includes('Hiermit widerrufe ich'), 'Eingangsbestätigung mit Inhalt, Datum und Uhrzeit');
  pruefe((await fetch(link)).status === 410, 'Exposé-Link nach Widerruf gesperrt (410)');

  // ---------- 8. Spam, Fassung, ohne JavaScript ----------
  console.log('8. Honeypot, veraltete Fassung, ohne JavaScript');
  const objJson = JSON.parse(fs.readFileSync(path.join(DIST, `expose-backend/objekte/${SLUG}.json`), 'utf8'));
  const form = (extra) => new URLSearchParams({ objekt: SLUG, fassung: objJson.fassung, name: 'Bot Test', email: 'bot@example.org', beginn: 'sofort', 'erklaerung[maklervertrag]': '1', 'erklaerung[widerrufsbelehrung]': '1', 'erklaerung[vertraulichkeit]': '1', 'erklaerung[vorzeitig_verlangen]': '1', 'erklaerung[vorzeitig_kenntnis]': '1', ...extra });
  vorher = mails();
  const rh = await fetch(`${BASIS}/anfrage.php`, { method: 'POST', body: form({ website: 'spam' }), redirect: 'manual' });
  pruefe(rh.status === 303 && neueMail(vorher, 'interessent').length === 0, 'Honeypot: scheinbarer Erfolg, keine Mail');
  const rf = await fetch(`${BASIS}/anfrage.php`, { method: 'POST', body: form({ fassung: '2020-01-01.1:abc' }), redirect: 'manual' });
  pruefe(rf.status === 409, 'veraltete Vertragsfassung → 409');
  const ro = await fetch(`${BASIS}/anfrage.php`, { method: 'POST', body: form({}), headers: { Origin: 'https://boese.example' }, redirect: 'manual' });
  pruefe(ro.status === 403, 'fremder Origin → 403');
  pruefe((await fetch(`${BASIS}/anfrage.php`, { redirect: 'manual' })).status === 303, 'GET auf anfrage.php → 303');
  const nojs = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 1280, height: 900 } });
  const pn = await nojs.newPage();
  await pn.goto(`${BASIS}/objekte/${SLUG}/anfordern/`);
  pruefe(await pn.isVisible('#e-vorzeitig_verlangen'), 'ohne JS: Sofort-Erklärungen sichtbar');
  await pn.fill('#f-name', 'Ohne Skript'); await pn.fill('#f-email', 'nojs@example.org');
  await pn.check('#e-maklervertrag'); await pn.check('#e-widerrufsbelehrung'); await pn.check('#b-nach_frist'); await pn.check('#e-vertraulichkeit');
  await Promise.all([pn.waitForURL(/danke\/frist/), pn.click('button[type=submit]')]);
  pruefe(true, 'ohne JS: normaler POST endet auf der Danke-Seite');

  // ---------- 9. Manuelle Freigabe ----------
  console.log('9. Manuelle Freigabe durch Linus');
  await schreibeConfig(config().replace(`'freigabe_modus' => null`, `'freigabe_modus' => 'manuell'`));
  vorher = mails();
  const pm = await desk.newPage();
  await pm.goto(`${BASIS}/objekte/${SLUG}/anfordern/`);
  await pm.fill('#f-name', 'Paula Manuell'); await pm.fill('#f-email', 'paula@example.org');
  await pm.check('#e-maklervertrag'); await pm.check('#e-widerrufsbelehrung'); await pm.check('#b-sofort'); await pm.check('#e-vorzeitig_verlangen'); await pm.check('#e-vorzeitig_kenntnis'); await pm.check('#e-vertraulichkeit');
  await pm.waitForTimeout(4200);
  await Promise.all([pm.waitForURL(/danke\/manuell/), pm.click('button[type=submit]')]);
  const ml = neueMail(vorher, 'linus')[0] || '';
  const fl = (ml.match(/(http:\/\/127\.0\.0\.1:\d+\/freigabe\.php\?v=[^\s]+)/) || [])[1];
  pruefe(Boolean(fl) && !/expose\.php\?t=/.test(neueMail(vorher, 'interessent')[0] || ''), 'Interessent bekommt noch keinen Link, Linus einen Freigabe-Link');
  await pm.goto(fl);
  pruefe((await pm.textContent('button[type=submit]')).includes('freigeben'), 'Freigabe-Seite zeigt Knopf (GET gibt nichts frei)');
  await pm.screenshot({ path: path.join(SHOTS, 'freigabe-linus-desktop.png') });
  await Promise.all([pm.waitForLoadState('load'), pm.click('button[type=submit]')]);
  const mf = neueMail(vorher, 'freigabe')[0] || '';
  const lf = (mf.match(/(http:\/\/127\.0\.0\.1:\d+\/expose\.php\?t=[A-Za-z0-9_.-]+)/) || [])[1];
  pruefe(Boolean(lf) && (await fetch(lf)).status === 200, 'nach Freigabe: Link per Mail, Exposé abrufbar');
  await schreibeConfig(config());

  // ---------- 10. Rate-Limit ----------
  console.log('10. Rate-Limit');
  await schreibeConfig(config().replace(`'ip' => [[200, 600], [500, 86400]]`, `'ip' => [[1, 600], [5, 86400]]`));
  fs.rmSync(path.join(DATEN, 'ratelimit'), { recursive: true, force: true }); fs.mkdirSync(path.join(DATEN, 'ratelimit'));
  await fetch(`${BASIS}/anfrage.php`, { method: 'POST', body: form({ email: 'rl@example.org' }), redirect: 'manual' });
  const rl = await fetch(`${BASIS}/anfrage.php`, { method: 'POST', body: form({ email: 'rl2@example.org' }), redirect: 'manual' });
  pruefe(rl.status === 429, 'zweite Anfrage innerhalb des Limits → 429');
  await schreibeConfig(config());
} catch (e) {
  nok++; console.error('ABBRUCH:', e); if (phpLog) console.error(phpLog.split('\n').filter((z) => /Fatal|Warning|Error/.test(z)).slice(-10).join('\n'));
} finally {
  await browser.close();
}

// PDF-Seiten als Bild zur Sichtprüfung
const pdf = path.join(SHOTS, 'voll-expose-muster.pdf');
if (fs.existsSync(pdf) && spawnSync('which', ['pdftoppm']).status === 0) {
  for (const f of fs.readdirSync(SHOTS)) if (f.startsWith('voll-expose-pdf-seite-')) fs.rmSync(path.join(SHOTS, f));
  spawnSync('pdftoppm', ['-png', '-r', '60', pdf, path.join(SHOTS, 'voll-expose-pdf-seite')]);
  const seiten = spawnSync('pdfinfo', [pdf], { encoding: 'utf8' }).stdout.match(/Pages:\s+(\d+)/)?.[1];
  console.log(`   PDF: ${seiten} Seiten, Vorschaubilder screenshots/voll-expose-pdf-seite-*.png`);
}
const phpFehler = phpLog.split('\n').filter((z) => /PHP (Fatal|Warning|Notice|Deprecated)/.test(z));
pruefe(phpFehler.length === 0, `keine PHP-Warnungen im Server-Log${phpFehler.length ? ': ' + phpFehler.slice(0, 3).join(' | ') : ''}`);
console.log(`\n${ok} bestanden, ${nok} fehlgeschlagen`);
ende(nok ? 1 : 0);
