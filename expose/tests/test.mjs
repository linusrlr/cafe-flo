#!/usr/bin/env node
// Ende-zu-Ende- und Sicherheitstest: Generator, PHP-Backend (php -S mit mehreren Workern), Playwright,
// Angriffe (Token, Pfade, Injektion, XSS, Replay, Massen-POSTs), Nachweiskette, Admin, Löschen, Backup, SMTP.
//   node tests/test.mjs            (aus dem Ordner expose/)
// Ergebnis: Screenshots und PDFs in screenshots/, Testdaten in tests/tmp/ (wird bei jedem Lauf neu angelegt).
import fs from 'node:fs';
import path from 'node:path';
import net from 'node:net';
import crypto from 'node:crypto';
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
const GEHEIM = 't'.repeat(64);
const WERKZEUGE = path.join(DIST, 'expose-backend', 'werkzeuge');

let ok = 0; let nok = 0;
const pruefe = (bed, text) => { if (bed) { ok++; console.log('  ✓ ' + text); } else { nok++; console.log('  ✗ ' + text); } };
const warte = (ms) => new Promise((r) => setTimeout(r, ms));
let nr = 0;
const adresse = (p = 't') => `${p}${++nr}.${process.pid}@example.org`;

// ---------- Kryptohilfen (wie kern.php) zum Fälschen von Tokens mit bekanntem Testschlüssel ----------
const b64u = (b) => Buffer.from(b).toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
const schl = (zweck, g = GEHEIM) => crypto.createHmac('sha256', g).update(zweck).digest();
const exposeToken = (obj, g = GEHEIM) => { const p = b64u(JSON.stringify(obj)); return `${p}.${b64u(crypto.createHmac('sha256', schl('token', g)).update('expose|' + p).digest())}`; };
const formToken = (obj) => { const p = b64u(JSON.stringify(obj)); return `${p}.${b64u(crypto.createHmac('sha256', schl('formular')).update('ft|' + p).digest())}`; };
const freigabeSig = (v, e) => b64u(crypto.createHmac('sha256', schl('freigabe')).update(`freigabe|${v}|${e}`).digest());

// ---------- 1. Generator ----------
console.log('1. Generator');
fs.rmSync(TMP, { recursive: true, force: true }); fs.mkdirSync(DATEN, { recursive: true });
const gen = spawnSync('node', ['lib/generator.mjs', '--basis', BASIS], { cwd: WURZEL, encoding: 'utf8' });
pruefe(gen.status === 0, 'Generator läuft ohne Fehler');
if (gen.status !== 0) { console.log(gen.stdout, gen.stderr); process.exit(1); }
for (const p of [`web/objekte/${SLUG}/index.html`, `web/objekte/${SLUG}/anfordern/index.html`, `web/vertrag-widerrufen/index.html`, `expose-backend/geschuetzt/${SLUG}.html`, `expose-backend/objekte/${SLUG}.json`, `is24/${SLUG}.json`, 'expose-backend/werkzeuge/nachweis-pruefen.php', 'web/expose-assets/drucken.js']) {
  pruefe(fs.existsSync(path.join(DIST, p)), `erzeugt: ${p}`);
}
const kurzHtml = fs.readFileSync(path.join(DIST, `web/objekte/${SLUG}/index.html`), 'utf8');
pruefe(!/Musterweg|12, 71229/.test(kurzHtml), 'Kurz-Exposé enthält keine Hausnummer/Straße');
pruefe(/Energieverbrauchsausweis/.test(kurzHtml) && /128 kWh/.test(kurzHtml) && /Erdgas/.test(kurzHtml) && />D</.test(kurzHtml), 'Kurz-Exposé enthält Energieausweis-Pflichtangaben (§ 87 GModG)');
pruefe(!fs.readdirSync(path.join(DIST, 'web/expose-assets/objekte', SLUG)).includes('bad.svg'), 'nicht-öffentliche Fotos liegen nicht im Webroot');
const alleHtml = [];
(function scan(d) { for (const n of fs.readdirSync(d)) { const p = path.join(d, n); if (fs.statSync(p).isDirectory()) scan(p); else if (n.endsWith('.html')) alleHtml.push(p); } })(DIST);
const mitInline = alleHtml.filter((p) => /\sstyle="|\son[a-z]+="|<script>/.test(fs.readFileSync(p, 'utf8')));
pruefe(mitInline.length === 0, `keine Inline-Styles/-Handler/-Skripte in ${alleHtml.length} Seiten (CSP ohne 'unsafe-inline')${mitInline.length ? ': ' + mitInline.slice(0, 2).join(', ') : ''}`);
pruefe(/http-equiv="Content-Security-Policy"/.test(kurzHtml), 'statische Seiten tragen eine CSP (Meta) auch ohne Server-Konfiguration');
pruefe(['objekte', 'expose-recht', 'vertrag-widerrufen', 'expose-assets'].every((d) => fs.existsSync(path.join(DIST, 'web', d, '.htaccess'))) && fs.readFileSync(path.join(DIST, 'expose-backend/.htaccess'), 'utf8').includes('Require all denied'), '.htaccess für Webhosting: Header-Dateien und Backend gesperrt');
const prod = spawnSync('node', ['lib/generator.mjs', '--produktion', '--aus', 'tests/tmp/dist-prod'], { cwd: WURZEL, encoding: 'utf8' });
pruefe(/übersprungen \(Muster\)/.test(prod.stdout), 'Produktionslauf überspringt das Muster-Objekt');

// ---------- 2. Server ----------
console.log('2. PHP-Server (4 Worker, echte Parallelität)');
const ADMIN_PW = 'Test-Passwort-fuer-Linus-1';
const ADMIN_HASH = spawnSync('php', ['-r', `echo password_hash('${ADMIN_PW}', PASSWORD_DEFAULT);`], { encoding: 'utf8' }).stdout;
const GROSS = [[1000, 600], [5000, 86400]];
const basisKonfig = () => ({
  modus: 'test', https_erzwingen: false, basis_url: BASIS, origin: [BASIS], geheim: GEHEIM, daten: DATEN, zeitzone: 'Europe/Berlin',
  freigabe_modus: null, max_abrufe: 60, ip_modus: 'gekuerzt+hmac', min_frei_mb: 1,
  limits: { ip: GROSS, ip_ohne_token: GROSS, email: GROSS, email_objekt: GROSS, global: GROSS, widerruf_ip: GROSS, widerruf_email: GROSS, token_fehler: GROSS, login: GROSS, login_global: GROSS },
  admin: { benutzer: 'linus', passwort_hash: ADMIN_HASH, ip_erlaubt: [] },
  mail: { transport: 'datei', absender: 'anfrage@roessler-immo.de', absender_name: 'Linus Rössler', antwort_an: 'linus@roessler-immo.de', an_linus: 'linus@roessler-immo.de' },
});
const phpKonfig = (c) => `<?php return json_decode(${JSON.stringify(JSON.stringify(c)).replace(/\$/g, '\\$')}, true, 512, JSON_THROW_ON_ERROR);\n`;
const CFG = path.join(DIST, 'expose-backend', 'config.php');
const schreibeConfig = async (aendern = (c) => c) => { const c = basisKonfig(); fs.writeFileSync(CFG, phpKonfig(aendern(c) || c)); await warte(150); };
await schreibeConfig();
const php = spawn('php', ['-d', 'opcache.enable=0', '-S', `127.0.0.1:${PORT}`, '-t', path.join(DIST, 'web'), path.join(WURZEL, 'tests/router.php')], { stdio: ['ignore', 'pipe', 'pipe'], env: { ...process.env, PHP_CLI_SERVER_WORKERS: '4' } });
let phpLog = ''; php.stderr.on('data', (d) => { phpLog += d; }); php.stdout.on('data', (d) => { phpLog += d; });
await warte(900);
const ende = (code) => { php.kill(); process.exit(code); };

const mails = () => (fs.existsSync(path.join(DATEN, 'test-mails')) ? fs.readdirSync(path.join(DATEN, 'test-mails')).sort().map((f) => path.join(DATEN, 'test-mails', f)) : []);
const qp = (eml) => {
  const i = eml.indexOf('\r\n\r\n'); const kopf = eml.slice(0, i); const k = eml.slice(i + 4).replace(/=\r?\n/g, '');
  const bytes = []; for (let j = 0; j < k.length; j++) { if (k[j] === '=' && /^[0-9A-F]{2}$/.test(k.substr(j + 1, 2))) { bytes.push(parseInt(k.substr(j + 1, 2), 16)); j += 2; } else bytes.push(k.charCodeAt(j)); }
  return kopf + '\n\n' + Buffer.from(bytes).toString('utf8').replace(/\r\n/g, '\n');
};
const neueMail = (vorher, art) => mails().filter((m) => !vorher.includes(m) && m.endsWith(`-${art}.eml`)).map((m) => qp(fs.readFileSync(m, 'latin1')));
const linkAus = (t) => (t.match(/(http:\/\/127\.0\.0\.1:\d+\/expose\.php\?t=[A-Za-z0-9_.-]+)/) || [])[1];
const vorgangAus = (t) => (t.match(/Vorgang (EX-\d{6}-[0-9A-F]{8})/) || [])[1];
const kette = () => fs.readdirSync(path.join(DATEN, 'nachweise')).filter((f) => /^\d{4}-\d\d\.jsonl$/.test(f)).sort().flatMap((f) => fs.readFileSync(path.join(DATEN, 'nachweise', f), 'utf8').trim().split('\n').filter(Boolean).map((z) => JSON.parse(z)));
const vorgaenge = () => fs.readdirSync(path.join(DATEN, 'vorgaenge')).filter((f) => f.endsWith('.json'));
const vorgangDatei = (v) => JSON.parse(fs.readFileSync(path.join(DATEN, 'vorgaenge', `${v}.json`), 'utf8'));
const pruefen = (...args) => spawnSync('php', [path.join(WERKZEUGE, 'nachweis-pruefen.php'), ...args], { encoding: 'utf8' });
const objJson = JSON.parse(fs.readFileSync(path.join(DIST, `expose-backend/objekte/${SLUG}.json`), 'utf8'));
const form = (extra = {}) => new URLSearchParams({ objekt: SLUG, fassung: objJson.fassung, name: 'Bot Test', email: adresse('bot'), beginn: 'sofort', 'erklaerung[maklervertrag]': '1', 'erklaerung[widerrufsbelehrung]': '1', 'erklaerung[vertraulichkeit]': '1', 'erklaerung[vorzeitig_verlangen]': '1', 'erklaerung[vorzeitig_kenntnis]': '1', ...extra });
const post = (pfad, body, headers = {}) => fetch(`${BASIS}${pfad}`, { method: 'POST', body, headers, redirect: 'manual' });
const holeFt = async () => (await (await fetch(`${BASIS}/anfrage.php?ft=${SLUG}`)).json()).ft;
// Anfrage wie ein Browser mit JavaScript: Token holen, warten (Mindestzeit 3 s), absenden
const anfrageMitToken = async (extra = {}, ft = null) => { const t = ft || await holeFt(); if (!ft) await warte(3100); return post('/anfrage.php', form({ ft: t, js: '1', ...extra })); };
const raw = (anfrage) => new Promise((res) => { const s = net.connect(PORT, '127.0.0.1', () => s.write(anfrage)); let d = ''; s.on('data', (x) => { d += x; }); s.on('end', () => res(d)); s.on('error', () => res(d)); setTimeout(() => { s.destroy(); res(d); }, 3000); });
const cspFehler = [];
const beobachte = (page) => { page.on('console', (m) => { if (/Content Security Policy|Refused to/i.test(m.text())) cspFehler.push(`${page.url()}: ${m.text()}`); }); page.on('dialog', (d) => { cspFehler.push('Dialog (XSS?): ' + d.message()); d.dismiss(); }); return page; };

const browser = await chromium.launch();
try {
  // ---------- 3. Kurz-Exposé ----------
  console.log('3. Kurz-Exposé und Formular (Screenshots, CSP-Verstöße werden mitgezählt)');
  const desk = await browser.newContext({ viewport: { width: 1280, height: 900 }, deviceScaleFactor: 1 });
  const mob = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true });
  for (const [ctx, n] of [[desk, 'desktop'], [mob, 'mobil']]) {
    const p = beobachte(await ctx.newPage());
    const r = await p.goto(`${BASIS}/objekte/${SLUG}/`);
    pruefe(r.status() === 200, `Kurz-Exposé lädt (${n})`);
    await p.screenshot({ path: path.join(SHOTS, `kurz-expose-${n}.png`), fullPage: true });
    pruefe(await p.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1), `kein horizontales Scrollen (${n})`);
    await p.goto(`${BASIS}/objekte/${SLUG}/anfordern/`);
    const vorbelegt = await p.evaluate(() => [...document.querySelectorAll('input[type=checkbox],input[type=radio]')].filter((i) => i.checked || i.defaultChecked || i.hasAttribute('checked')).length);
    pruefe(vorbelegt === 0, `keine Checkbox/Option vorausgewählt (${n})`);
    const btn = await p.textContent('button[type=submit]');
    pruefe(btn.trim() === 'zahlungspflichtig bestellen', `Schaltfläche heißt „zahlungspflichtig bestellen“ (${n})`);
    pruefe(await p.isHidden('#sofort-erklaerungen'), `Sofort-Erklärungen erst nach Auswahl sichtbar (${n})`);
    await p.check('#b-sofort');
    pruefe(await p.isVisible('#sofort-erklaerungen'), `Sofort-Erklärungen nach Auswahl „Sofort“ sichtbar (${n})`);
    await p.waitForFunction(() => document.querySelector('input[name=ft]').value.length > 20);
    pruefe(true, `Formular-Token vom Server geholt (${n})`);
    await p.uncheck('#b-sofort').catch(() => {});
    await p.reload();
    await p.screenshot({ path: path.join(SHOTS, `freigabe-formular-${n}.png`), fullPage: true });
    pruefe(await p.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1), `Formular ohne horizontales Scrollen (${n})`);
  }

  // ---------- 4. Validierung ----------
  console.log('4. Validierung');
  const p = beobachte(await mob.newPage());
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
  await p.waitForTimeout(4200); // Mindestzeit gegen Bots
  await Promise.all([p.waitForURL(/danke\/sofort/), p.click('button[type=submit]')]);
  pruefe(true, 'Weiterleitung auf /danke/sofort/');
  await p.screenshot({ path: path.join(SHOTS, 'danke-mobil.png') });
  const mI = neueMail(vorher, 'interessent'); const mL = neueMail(vorher, 'linus');
  pruefe(mI.length === 1 && mL.length === 1, 'je eine Mail an Interessent und Linus');
  const mail = mI[0] || '';
  for (const s of ['MAKLERVERTRAG FÜR KAUFINTERESSENTEN', 'WIDERRUFSBELEHRUNG', 'MUSTER-WIDERRUFSFORMULAR', 'DATENSCHUTZHINWEIS', '„zahlungspflichtig bestellen“', '[x] Ich verlange ausdrücklich', 'Fassung 2026-11-03.1', '/vertrag-widerrufen/']) pruefe(mail.includes(s), `Interessenten-Mail enthält ${s}`);
  const ohneUrls = (t) => t.replace(/https?:\/\/127\.0\.0\.1:\d+/g, '').replace(/@127\.0\.0\.1>/g, '');
  pruefe(!/127\.0\.0\.1/.test(ohneUrls(mL[0] || '')), 'Mail an Linus ohne IP-Adresse');
  const link = linkAus(mail);
  const vorgang = vorgangAus(mail);
  pruefe(Boolean(link) && Boolean(vorgang), `Exposé-Link und Vorgangsnummer in der Mail (${vorgang})`);
  const k1 = kette();
  const nachweis = k1.find((e) => e.vorgang === vorgang && e.typ === 'vertragsschluss');
  const ni = nachweis?.inhalt;
  pruefe(ni && ni.erklaerungen.length === 5 && ni.erklaerungen.every((e) => e.text && e.version && e.sha256), 'Nachweis: 5 Erklärungen mit Wortlaut, Fassung und SHA-256');
  pruefe(ni && ni.technik.ip_gekuerzt === '127.0.0.0' && /^[0-9a-f]{64}$/.test(ni.technik.ip_hmac) && !/127\.0\.0\.1/.test(ohneUrls(JSON.stringify(nachweis))), 'Nachweis: IP nur gekürzt und als HMAC');
  pruefe(ni && ni.technik.user_agent.length > 10 && ni.schaltflaeche === 'zahlungspflichtig bestellen' && ni.technik.formular_token === 'ok', 'Nachweis: User-Agent, Schaltflächentext, Formular-Token geprüft');
  pruefe(Boolean(nachweis) && mail.includes(nachweis.hash) && mail.includes(`Protokolleintrag Nr. ${nachweis.seq}`), 'Prüfwert des Nachweises steht in der Bestätigungs-Mail (externer Anker beim Kunden)');
  const best = k1.find((e) => e.vorgang === vorgang && e.typ === 'bestaetigung');
  pruefe(best && fs.existsSync(path.join(DATEN, best.inhalt.kopie)) && crypto.createHash('sha256').update(fs.readFileSync(path.join(DATEN, best.inhalt.kopie))).digest('hex') === best.inhalt.eml_sha256, 'Nachweis: Kopie der Bestätigungs-Mail gespeichert, SHA-256 in der Kette');
  const modus = (f) => (fs.statSync(f).mode & 0o777).toString(8);
  pruefe(modus(path.join(DATEN, 'nachweise')) === '700' && modus(path.join(DATEN, 'vorgaenge', `${vorgang}.json`)) === '600' && modus(path.join(DATEN, best.inhalt.kopie)) === '600', 'Dateirechte: Ordner 700, Dateien 600');

  const dp = beobachte(await desk.newPage());
  const rE = await dp.goto(link);
  pruefe(rE.status() === 200 && (await dp.content()).includes('Erika Mustermann'), 'Voll-Exposé abrufbar und personalisiert');
  pruefe((await dp.content()).includes('Musterweg 12'), 'Voll-Exposé enthält die Adresse');
  const csp = rE.headers()['content-security-policy'] || '';
  pruefe(/style-src 'sha256-/.test(csp) && !/unsafe-inline/.test(csp) && /script-src 'self'/.test(csp), 'Voll-Exposé: CSP mit Stil-Hashes, ohne unsafe-inline');
  pruefe(rE.headers()['referrer-policy'] === 'no-referrer' && /no-store/.test(rE.headers()['cache-control']), 'Voll-Exposé: Referrer-Policy no-referrer, no-store (Token leckt nicht)');
  await dp.screenshot({ path: path.join(SHOTS, 'voll-expose-desktop.png'), fullPage: false });
  await dp.emulateMedia({ media: 'print' });
  await dp.pdf({ path: path.join(SHOTS, 'voll-expose-muster.pdf'), format: 'A4', printBackground: true, preferCSSPageSize: true });
  await dp.emulateMedia({ media: 'screen' });
  pruefe(fs.statSync(path.join(SHOTS, 'voll-expose-muster.pdf')).size > 50000, 'PDF erzeugt');
  const mp = beobachte(await mob.newPage()); await mp.goto(link);
  await mp.screenshot({ path: path.join(SHOTS, 'voll-expose-mobil.png'), fullPage: false });
  pruefe(await mp.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1), 'Voll-Exposé mobil ohne horizontales Scrollen');
  pruefe(kette().filter((e) => e.vorgang === vorgang && e.typ === 'abruf').length === 2, 'jeder Abruf steht in der Nachweiskette');

  // ---------- 6. „nach Frist“ ----------
  console.log('6. Vertragsschluss „nach Ablauf der Widerrufsfrist“');
  vorher = mails();
  const p2 = beobachte(await desk.newPage());
  await p2.goto(`${BASIS}/objekte/${SLUG}/anfordern/`);
  await p2.fill('#f-name', 'Max Beispiel'); await p2.fill('#f-email', 'max@example.org');
  await p2.check('#e-maklervertrag'); await p2.check('#e-widerrufsbelehrung'); await p2.check('#b-nach_frist'); await p2.check('#e-vertraulichkeit');
  await p2.waitForTimeout(4200);
  await Promise.all([p2.waitForURL(/danke\/frist/), p2.click('button[type=submit]')]);
  const m2 = neueMail(vorher, 'interessent')[0] || '';
  const link2 = linkAus(m2);
  pruefe(/funktioniert er erst nach Ablauf der Widerrufsfrist, ab \d\d\.\d\d\.\d{4}/.test(m2), 'Mail nennt das Datum der Freischaltung');
  pruefe(!m2.includes('[x] Ich verlange ausdrücklich'), 'kein „vorzeitiger Beginn“ protokolliert');
  const r2 = await fetch(link2);
  pruefe(r2.status === 403 && (await r2.text()).includes('freigeschaltet'), 'Link vor Fristablauf gesperrt (403)');

  // ---------- 7. Widerrufsfunktion ----------
  console.log('7. Widerrufsfunktion (§ 356a BGB)');
  vorher = mails();
  const w = beobachte(await mob.newPage());
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
  const kw = kette();
  pruefe(kw.some((e) => e.typ === 'widerruf' && e.inhalt.gesperrt.includes(vorgang)) && kw.some((e) => e.typ === 'eingangsbestaetigung' && e.inhalt.message_id), 'Widerruf und Eingangsbestätigung stehen in der Nachweiskette');

  // ---------- 8. Spam, Fassung, ohne JavaScript ----------
  console.log('8. Honeypot, veraltete Fassung, Herkunft, ohne JavaScript');
  vorher = mails();
  const rh = await post('/anfrage.php', form({ website: 'spam' }));
  pruefe(rh.status === 303 && neueMail(vorher, 'interessent').length === 0, 'Honeypot: scheinbarer Erfolg, keine Mail');
  pruefe((await post('/anfrage.php', form({ fassung: '2020-01-01.1:abc' }))).status === 409, 'veraltete Vertragsfassung → 409');
  pruefe((await post('/anfrage.php', form(), { Origin: 'https://boese.example' })).status === 403, 'fremder Origin → 403');
  pruefe((await post('/anfrage.php', form(), { Origin: 'null' })).status === 403, 'Origin „null“ (Sandbox/Datei) → 403');
  pruefe((await post('/anfrage.php', form(), { 'Sec-Fetch-Site': 'cross-site' })).status === 403, 'Sec-Fetch-Site: cross-site ohne Origin → 403');
  pruefe((await post('/anfrage.php', form(), { Referer: 'https://boese.example/formular' })).status === 403, 'fremder Referer ohne Origin → 403');
  pruefe((await fetch(`${BASIS}/anfrage.php`, { redirect: 'manual' })).status === 303, 'GET auf anfrage.php → 303');
  vorher = mails();
  const rwh = await post('/widerruf.php', new URLSearchParams({ schritt: '2', name: 'Honig Topf', email: 'honig@example.org', website: 'x' }));
  pruefe(rwh.status === 200 && kette().some((e) => e.typ === 'widerruf_verdacht' && e.inhalt.name === 'Honig Topf') && neueMail(vorher, 'widerruf').length === 0, 'Widerruf mit Honeypot: nicht verworfen, sondern als Verdacht protokolliert (ohne Mail, ohne Sperre)');
  const nojs = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 1280, height: 900 } });
  const pn = await nojs.newPage();
  await pn.goto(`${BASIS}/objekte/${SLUG}/anfordern/`);
  pruefe(await pn.isVisible('#e-vorzeitig_verlangen'), 'ohne JS: Sofort-Erklärungen sichtbar');
  await pn.fill('#f-name', 'Ohne Skript'); await pn.fill('#f-email', 'nojs@example.org');
  await pn.check('#e-maklervertrag'); await pn.check('#e-widerrufsbelehrung'); await pn.check('#b-nach_frist'); await pn.check('#e-vertraulichkeit');
  await Promise.all([pn.waitForURL(/danke\/frist/), pn.click('button[type=submit]')]);
  pruefe(true, 'ohne JS: normaler POST endet auf der Danke-Seite');

  // ---------- 9. Manuelle Freigabe ----------
  console.log('9. Manuelle Freigabe durch Linus (Mail-Link)');
  await schreibeConfig((c) => { c.freigabe_modus = 'manuell'; });
  vorher = mails();
  const pm = beobachte(await desk.newPage());
  await pm.goto(`${BASIS}/objekte/${SLUG}/anfordern/`);
  await pm.fill('#f-name', 'Paula Manuell'); await pm.fill('#f-email', 'paula@example.org');
  await pm.check('#e-maklervertrag'); await pm.check('#e-widerrufsbelehrung'); await pm.check('#b-sofort'); await pm.check('#e-vorzeitig_verlangen'); await pm.check('#e-vorzeitig_kenntnis'); await pm.check('#e-vertraulichkeit');
  await pm.waitForTimeout(4200);
  await Promise.all([pm.waitForURL(/danke\/manuell/), pm.click('button[type=submit]')]);
  const ml = neueMail(vorher, 'linus')[0] || '';
  const fl = (ml.match(/(http:\/\/127\.0\.0\.1:\d+\/freigabe\.php\?v=\S+)/) || [])[1];
  const vorgangManuell = vorgangAus(neueMail(vorher, 'interessent')[0] || '');
  pruefe(Boolean(fl) && /&e=\d+&s=/.test(fl) && !/expose\.php\?t=/.test(neueMail(vorher, 'interessent')[0] || ''), 'Interessent bekommt noch keinen Link, Linus einen befristeten Freigabe-Link');
  await pm.goto(fl);
  pruefe((await pm.textContent('button[type=submit]')).includes('freigeben'), 'Freigabe-Seite zeigt Knopf (GET gibt nichts frei)');
  await pm.screenshot({ path: path.join(SHOTS, 'freigabe-linus-desktop.png') });
  await Promise.all([pm.waitForLoadState('load'), pm.click('button[type=submit]')]);
  const mf = neueMail(vorher, 'freigabe')[0] || '';
  const lf = linkAus(mf);
  pruefe(Boolean(lf) && (await fetch(lf)).status === 200, 'nach Freigabe: Link per Mail, Exposé abrufbar');
  const flU = new URL(fl);
  const abgelaufen = Math.floor(Date.now() / 1000) - 10;
  pruefe((await fetch(`${BASIS}/freigabe.php?v=${flU.searchParams.get('v')}&e=${abgelaufen}&s=${freigabeSig(flU.searchParams.get('v'), abgelaufen)}`)).status === 404, 'abgelaufener Freigabe-Link (korrekt signiert) → 404');
  pruefe((await fetch(`${BASIS}/freigabe.php?v=${flU.searchParams.get('v')}&e=${Number(flU.searchParams.get('e')) + 1}&s=${flU.searchParams.get('s')}`)).status === 404, 'Freigabe-Link mit verlängerter Ablaufzeit → 404');
  await schreibeConfig();

  // ---------- 10. Angriffe auf Token und Links ----------
  console.log('10. Angriffe: Token, Links, IDOR');
  const tPayload = JSON.parse(Buffer.from(lf.split('t=')[1].split('.')[0].replace(/-/g, '+').replace(/_/g, '/'), 'base64').toString());
  const [pTeil, sigTeil] = lf.split('t=')[1].split('.');
  const anders = b64u(JSON.stringify({ ...tPayload, bis: tPayload.bis + 86400 * 365 }));
  pruefe((await fetch(`${BASIS}/expose.php?t=${anders}.${sigTeil}`)).status === 404, 'Payload verändert (Ablauf verlängert), alte Signatur → 404');
  pruefe((await fetch(`${BASIS}/expose.php?t=${pTeil}.${sigTeil.slice(0, -2)}${sigTeil.endsWith('AA') ? 'BB' : 'AA'}`)).status === 404, 'Signatur verändert → 404');
  pruefe((await fetch(`${BASIS}/expose.php?t=${pTeil}.${b64u(crypto.createHmac('sha256', 'falsch').update('expose|' + pTeil).digest())}`)).status === 404, 'mit falschem Schlüssel signiert → 404');
  pruefe((await fetch(`${BASIS}/expose.php?t=${exposeToken({ ...tPayload, ab: 0, bis: Math.floor(Date.now() / 1000) - 60 })}`)).status === 410, 'abgelaufener Token (gültig signiert) → 410');
  pruefe((await fetch(`${BASIS}/expose.php?t=${b64u(JSON.stringify({ ...tPayload, v: vorgang }))}.${sigTeil}`)).status === 404, 'eigener Link, Vorgangsnummer gegen eine fremde getauscht (IDOR) → 404');
  pruefe((await fetch(`${BASIS}/expose.php?t=${exposeToken({ ...tPayload, n: 2 })}`)).status === 404, 'Token mit falscher Ausstellungsnummer → 404');
  pruefe((await fetch(`${BASIS}/expose.php?t=${exposeToken({ ...tPayload, o: 'anderes-objekt' })}`)).status === 404, 'Token mit fremdem Objekt → 404');
  pruefe((await fetch(`${BASIS}/expose.php?t=${exposeToken({ ...tPayload, v: '../../config' })}`)).status === 404, 'Token mit Pfad im Vorgang (gültig signiert) → 404');
  pruefe((await fetch(`${BASIS}/expose.php?t=${exposeToken({ ...tPayload, ab: '0', bis: '9999999999' })}`)).status === 404, 'Token mit Zeichenketten statt Zahlen → 404');
  pruefe((await fetch(`${BASIS}/expose.php?t[]=x`)).status === 404 && (await fetch(`${BASIS}/freigabe.php?v[]=x&s[]=y`)).status === 404, 'Array-Parameter → 404 ohne PHP-Warnung');
  pruefe((await fetch(`${BASIS}/expose.php?t=${'A'.repeat(5000)}`)).status === 404, 'überlanger Token → 404');
  const vorAbrufe = vorgangDatei(vorgangManuell).abrufe;
  pruefe((await fetch(lf, { method: 'HEAD' })).status === 200 && vorgangDatei(vorgangManuell).abrufe === vorAbrufe, 'HEAD (Link-Vorschau) zählt nicht als Abruf');
  pruefe((await fetch(lf, { method: 'POST' })).status === 405, 'POST auf expose.php → 405');
  pruefe((await fetch(`${BASIS}/freigabe.php?v=${vorgangManuell}&e=9999999999&s=AAAA`)).status === 404, 'Freigabe mit geratener Signatur → 404');
  await schreibeConfig((c) => { c.limits.token_fehler = [[5, 600]]; });
  const versuche = await Promise.all(Array.from({ length: 8 }, () => fetch(`${BASIS}/expose.php?t=abc`)));
  pruefe(versuche.some((r) => r.status === 429), 'viele falsche Links von einer IP → 429 (Raten gebremst)');
  fs.rmSync(path.join(DATEN, 'ratelimit'), { recursive: true, force: true }); fs.mkdirSync(path.join(DATEN, 'ratelimit'));
  await schreibeConfig((c) => { c.geheim = 'u'.repeat(64); c.geheim_alt = [GEHEIM]; });
  pruefe((await fetch(lf)).status === 200, 'Schlüsselwechsel: alte Links gelten über geheim_alt weiter');
  await schreibeConfig((c) => { c.geheim = 'u'.repeat(64); });
  pruefe((await fetch(lf)).status === 404, 'Schlüsselwechsel ohne geheim_alt: alte Links ungültig');
  await schreibeConfig();

  // ---------- 11. Pfad-Traversal ----------
  console.log('11. Pfad-Traversal und gesperrte Dateien');
  for (const s of ['../config', '../../expose-backend/config', 'muster-leonberg-eltingen-3-zimmer\nx', '..%2fconfig', 'MUSTER', '']) {
    pruefe((await post('/anfrage.php', form({ objekt: s }))).status === 404, `objekt=${JSON.stringify(s)} → 404`);
  }
  for (const pfad of ['/../expose-backend/config.php', '/%2e%2e/expose-backend/config.php', '/objekte/../../expose-backend/geschuetzt/' + SLUG + '.html', '/objekte/.htaccess', '/expose-backend/config.php', '/anfrage.php/../../expose-backend/config.php', '/router.php']) {
    const a = await raw(`GET ${pfad} HTTP/1.0\r\nHost: 127.0.0.1\r\n\r\n`);
    pruefe(/^HTTP\/1\.[01] 404/.test(a) && !/'geheim'|<\?php|Musterweg/.test(a), `GET ${pfad} → 404, nichts ausgeliefert`);
  }
  pruefe((await fetch(`${BASIS}/anfrage.php?ft=../../config`)).status === 404, 'Formular-Token für ungültiges Objekt → 404');

  // ---------- 12. Injektion und XSS ----------
  console.log('12. Header-/SMTP-Injektion und XSS');
  const vorgaengeVorher = vorgaenge().length;
  vorher = mails();
  const boese = [
    ['name', 'Eve\r\nBcc: opfer@example.net'], ['name', 'Eve\nX-Test: 1'], ['email', 'eve@example.org\r\nBcc: opfer@example.net'], ['email', 'eve@example.org%0d%0aBcc:opfer@example.net'],
    ['email', '"<script>alert(1)</script>"@example.com'], ['email', '"a,b@evil.example"@example.org'], ['email', 'x@[127.0.0.1]'], ['email', 'eve@example.org, opfer@example.net'],
    ['email', 'eve@localhost'], ['email', 'eve..x@example.org'], ['email', '<eve@example.org>'], ['name', '<script>alert(1)</script>'], ['name', '<img src=x onerror=alert(1)>'],
    ['name', 'Eve\u202Eevil'], ['telefon', '0711<script>'], ['name', 'Eve\u0000Null'],
  ];
  for (const [feld, wert] of boese) {
    const r = await post('/anfrage.php', form({ [feld]: wert }), { Accept: 'application/json' });
    const j = await r.json().catch(() => ({}));
    pruefe(r.status === 422 && j.fehler && j.fehler[feld], `${feld}=${JSON.stringify(wert).slice(0, 48)} → 422 am Feld`);
  }
  const rx = await post('/anfrage.php', form({ name: '<script>alert(1)</script>' }));
  const tx = await rx.text();
  pruefe(!tx.includes('<script>alert(1)') && !/Stack|kern\.php|\/home\//.test(tx), 'Fehlerseite spiegelt keine Eingabe roh zurück, keine Pfade');
  pruefe(vorgaenge().length === vorgaengeVorher && mails().length === vorher.length, 'keine dieser Anfragen hat einen Vorgang oder eine Mail erzeugt');
  const rwx = await post('/widerruf.php', new URLSearchParams({ name: 'Erika Test', email: 'erika@example.org', vorgang: '"><script>alert(1)</script>' }));
  const twx = await rwx.text();
  pruefe(rwx.status === 422 && !twx.includes('<script>alert(1)'), 'Widerruf: XSS in der Vorgangsnummer wird abgewiesen und nicht gespiegelt');
  const rwo = await post('/widerruf.php', new URLSearchParams({ name: "Renée O'Brien-Müller", email: 'renee@example.org', objekt: '"><img src=x>' }));
  const two = await rwo.text();
  pruefe(rwo.status === 200 && two.includes('Renée O&apos;Brien-Müller') && !two.includes('"><img'), 'Widerruf Schritt 2: Name korrekt kodiert, unbekanntes Objekt verworfen');
  // Umlaute im Namen landen kodiert im Betreff, keine zusätzliche Kopfzeile
  vorher = mails();
  await anfrageMitToken({ name: 'Jörg Bcc-Zuß', email: adresse('joerg') });
  const mj = neueMail(vorher, 'linus')[0] || '';
  const kopfJ = mj.split('\n\n')[0];
  pruefe(/^Subject: .*=\?UTF-8\?Q\?/m.test(kopfJ) && !/^Bcc:/mi.test(kopfJ) && (kopfJ.match(/^To:/gm) || []).length === 1, 'Mailkopf: Betreff RFC 2047-kodiert, genau ein To, kein Bcc');
  // gespeicherte, feindliche Daten (z. B. Altbestand) werden in Exposé und Admin kodiert ausgegeben
  const boeseId = 'EX-261104-DEADBEEF';
  const jetztS = Math.floor(Date.now() / 1000);
  fs.writeFileSync(path.join(DATEN, 'vorgaenge', `${boeseId}.json`), JSON.stringify({ vorgang: boeseId, objekt: SLUG, nummer: 'MUSTER-001', titel: '<b>T</b>', name: '<img src=x onerror=alert(1)>"\\', email: 'x@example.org', email_hash: 'x', telefon: '', beginn: 'sofort', modus: 'automatisch', vertrag: new Date().toISOString(), widerrufsfrist_ende: new Date().toISOString(), ab: jetztS - 10, bis: jetztS + 3600, token_nr: 1, freigegeben: true, widerrufen: false, gesperrt: false, abrufe: 0, muster: true }));
  const xp = beobachte(await desk.newPage());
  const rxp = await xp.goto(`${BASIS}/expose.php?t=${exposeToken({ v: boeseId, o: SLUG, ab: jetztS - 10, bis: jetztS + 3600, n: 1 })}`);
  const xhtml = await rxp.text();
  pruefe(rxp.status() === 200 && xhtml.includes('&lt;img src=x onerror=alert(1)&gt;') && !xhtml.includes('<img src=x onerror'), 'Voll-Exposé: feindlicher Name HTML-kodiert');
  pruefe(/content:"[^"<>]*\\3C [^"]*"/.test(xhtml), 'Voll-Exposé: Name im Druck-CSS als CSS-Escape (kein Ausbruch aus der Zeichenkette)');

  // ---------- 13. Checkboxen serverseitig ----------
  console.log('13. Häkchen direkt per POST (ohne Browser)');
  const pflicht = ['maklervertrag', 'widerrufsbelehrung', 'vertraulichkeit', 'vorzeitig_verlangen', 'vorzeitig_kenntnis'];
  const vg13 = vorgaenge().length;
  for (const id of pflicht) {
    const f = form(); f.delete(`erklaerung[${id}]`);
    const r = await post('/anfrage.php', f, { Accept: 'application/json' });
    const j = await r.json();
    pruefe(r.status === 422 && j.fehler[`erklaerung[${id}]`], `ohne Häkchen „${id}“ → 422`);
  }
  for (const wert of ['0', 'on', 'true', '']) {
    pruefe((await post('/anfrage.php', form({ 'erklaerung[maklervertrag]': wert }))).status === 422, `Häkchen-Wert ${JSON.stringify(wert)} statt „1“ → 422`);
  }
  const fa = form(); fa.delete('erklaerung[maklervertrag]'); fa.append('erklaerung[maklervertrag][]', '1');
  pruefe((await post('/anfrage.php', fa)).status === 422, 'Häkchen als Array → 422');
  pruefe((await post('/anfrage.php', form({ beginn: 'gestern' }))).status === 422, 'unbekannter Beginn → 422');
  const fNichts = new URLSearchParams({ objekt: SLUG, fassung: objJson.fassung, name: 'Ohne Haken', email: adresse('ohne'), beginn: 'sofort' });
  pruefe((await post('/anfrage.php', fNichts)).status === 422, 'gar keine Häkchen → 422');
  pruefe(vorgaenge().length === vg13, 'kein Vorgang ohne alle Pflicht-Häkchen');
  const rFrist = await anfrageMitToken({ beginn: 'nach_frist', email: adresse('frist') });
  const vFrist = kette().filter((e) => e.typ === 'vertragsschluss').pop();
  pruefe(rFrist.status === 303 && vFrist.inhalt.beginn === 'nach_frist' && !vFrist.inhalt.erklaerungen.some((e) => e.id.startsWith('vorzeitig')), '„nach Frist“ mit mitgesendeten Sofort-Häkchen: diese werden nicht protokolliert');

  // ---------- 14. Formular-Token: Replay, Zeit, Fälschung ----------
  console.log('14. Formular-Token: Replay, Mindestzeit, Fälschung');
  const ft1 = await holeFt(); await warte(3100);
  const em14 = adresse('replay');
  const r14a = await post('/anfrage.php', form({ ft: ft1, email: em14 }));
  const r14b = await post('/anfrage.php', form({ ft: ft1, email: adresse('replay') }));
  pruefe(r14a.status === 303 && r14b.status === 409, 'derselbe Formular-POST zweimal (Replay) → zweites Mal 409');
  vorher = mails();
  const r14c = await post('/anfrage.php', form({ ft: await holeFt(), email: adresse('schnell') }));
  pruefe(r14c.status === 303 && neueMail(vorher, 'interessent').length === 0, 'unter 3 Sekunden ausgefüllt → scheinbarer Erfolg, keine Mail');
  pruefe((await post('/anfrage.php', form({ ft: ft1.slice(0, -2) + 'AA' }))).status === 400, 'verändertes Formular-Token → 400');
  pruefe((await post('/anfrage.php', form({ ft: formToken({ z: Math.floor(Date.now() / 1000) - 10, n: 'x'.repeat(16), o: 'anderes-objekt' }) }))).status === 400, 'Formular-Token für anderes Objekt → 400');
  pruefe((await post('/anfrage.php', form({ ft: formToken({ z: Math.floor(Date.now() / 1000) - 7 * 3600, n: 'y'.repeat(16), o: SLUG }) }))).status === 409, 'abgelaufenes Formular-Token (7 h) → 409');
  vorher = mails();
  const em14d = adresse('doppelt');
  const [d1, d2] = [await post('/anfrage.php', form({ email: em14d })), await post('/anfrage.php', form({ email: em14d }))];
  pruefe(d1.status === 303 && d2.status === 303 && neueMail(vorher, 'interessent').length === 1, 'gleiche Anfrage ohne Token zweimal in 10 Minuten → nur ein Vertrag');

  // ---------- 15. Massen-POSTs, Speicher-DoS, überlange Felder ----------
  console.log('15. Massen-POSTs, Speicher, überlange Felder');
  await schreibeConfig((c) => { c.limits.ip = [[3, 600]]; });
  fs.rmSync(path.join(DATEN, 'ratelimit'), { recursive: true, force: true }); fs.mkdirSync(path.join(DATEN, 'ratelimit'));
  let vg15 = vorgaenge().length;
  const masse = await Promise.all(Array.from({ length: 25 }, () => post('/anfrage.php', form({ email: adresse('masse') }))));
  const st = masse.map((r) => r.status);
  pruefe(st.filter((s) => s === 303).length === 3 && st.filter((s) => s === 429).length === 22, `25 parallele POSTs einer IP: 3 angenommen, 22 → 429 (${[...new Set(st)].join(',')})`);
  pruefe(vorgaenge().length - vg15 === 3, 'nur 3 Vorgänge gespeichert (keine Race im Rate-Limit)');
  await schreibeConfig((c) => { c.limits.global = [[4, 3600]]; });
  fs.rmSync(path.join(DATEN, 'ratelimit'), { recursive: true, force: true }); fs.mkdirSync(path.join(DATEN, 'ratelimit'));
  vg15 = vorgaenge().length;
  const masse2 = await Promise.all(Array.from({ length: 12 }, () => post('/anfrage.php', form({ email: adresse('global') }))));
  pruefe(masse2.filter((r) => r.status === 303).length === 4 && masse2.filter((r) => r.status === 503).length === 8 && vorgaenge().length - vg15 === 4, 'globales Limit (viele IPs): höchstens 4 Verträge je Stunde, Rest 503');
  await schreibeConfig((c) => { c.limits.ip_ohne_token = [[2, 600]]; });
  fs.rmSync(path.join(DATEN, 'ratelimit'), { recursive: true, force: true }); fs.mkdirSync(path.join(DATEN, 'ratelimit'));
  const ohne = [];
  for (let i = 0; i < 4; i++) ohne.push((await post('/anfrage.php', form({ email: adresse('ohnejs') }))).status);
  pruefe(ohne.join() === '303,303,429,429', `ohne Formular-Token gilt ein strengeres Limit (${ohne.join()})`);
  await schreibeConfig((c) => { c.min_frei_mb = 1e12; });
  pruefe((await post('/anfrage.php', form({ email: adresse('voll') }))).status === 503, 'zu wenig freier Speicher → 503 statt vollem Datenträger');
  await schreibeConfig();
  pruefe((await post('/anfrage.php', form({ name: 'A'.repeat(81) }))).status === 422, 'Name mit 81 Zeichen → 422 (keine stille Kürzung)');
  pruefe((await post('/anfrage.php', form({ email: 'a'.repeat(64) + '@' + 'b'.repeat(63) + '.' + 'c'.repeat(63) + '.' + 'd'.repeat(61) + '.de' }))).status === 422, 'E-Mail über 254 Zeichen → 422');
  pruefe((await post('/anfrage.php', form({ telefon: '0'.repeat(31) }))).status === 422, 'Telefon über 30 Zeichen → 422');
  pruefe((await post('/anfrage.php', form({ name: 'A'.repeat(70000) }))).status === 413, 'Formular über 64 KB → 413');
  const mp15 = new FormData(); for (const [k, v] of form()) mp15.append(k, v); mp15.append('datei', new Blob(['x'.repeat(1000)]), 'x.php');
  pruefe((await fetch(`${BASIS}/anfrage.php`, { method: 'POST', body: mp15, redirect: 'manual' })).status === 415, 'multipart/Datei-Upload → 415');
  pruefe((await fetch(`${BASIS}/anfrage.php`, { method: 'PUT', body: form(), redirect: 'manual' })).status === 405, 'PUT → 405');
  pruefe((await post('/anfrage.php', JSON.stringify({ a: 1 }), { 'Content-Type': 'application/json' })).status === 415, 'JSON-Body → 415');
  pruefe(fs.readdirSync(path.join(DATEN, 'ratelimit')).length < 200, 'Rate-Limit-Speicher bleibt klein');

  // ---------- 16. Sicherheits-Header ----------
  console.log('16. Sicherheits-Header und Fehlerbehandlung');
  for (const [n, r] of [['widerruf.php', await post('/widerruf.php', new URLSearchParams({ name: 'x' }))], ['expose.php (ungültig)', await fetch(`${BASIS}/expose.php?t=x`)], ['anfrage.php (422)', await post('/anfrage.php', form({ name: '' }))]]) {
    const hd = r.headers;
    pruefe(/default-src 'none'/.test(hd.get('content-security-policy') || '') && /frame-ancestors 'none'/.test(hd.get('content-security-policy')) && hd.get('x-content-type-options') === 'nosniff' && hd.get('x-frame-options') === 'DENY' && !hd.get('x-powered-by'), `${n}: CSP, nosniff, X-Frame-Options, kein X-Powered-By`);
  }
  const monat = spawnSync('php', ['-r', 'date_default_timezone_set("Europe/Berlin"); echo date("Y-m");'], { encoding: 'utf8' }).stdout;
  const mDatei = path.join(DATEN, 'nachweise', `${monat}.jsonl`);
  fs.renameSync(mDatei, mDatei + '.weg'); fs.mkdirSync(mDatei);
  const vg16 = vorgaenge().length;
  const rf = await anfrageMitToken({ email: adresse('kaputt') });
  const tf = await rf.text();
  pruefe(rf.status === 500 && /Fehlernummer/.test(tf) && !/Stack|\.php|\/home\/|Exception|jsonl/.test(tf), 'Speicherfehler → 500 mit Fehlernummer, ohne Stack-Trace oder Pfad');
  pruefe(vorgaenge().length === vg16, 'Speicherfehler: Vorgang zurückgenommen (kein Vertrag ohne Nachweis)');
  fs.rmdirSync(mDatei); fs.renameSync(mDatei + '.weg', mDatei);
  pruefe(fs.readdirSync(path.join(DATEN, 'log')).some((f) => f.startsWith('fehler-') && fs.readFileSync(path.join(DATEN, 'log', f), 'utf8').includes('FEHLER')), 'Fehler mit Nummer im Fehlerlog (für Linus)');
  await schreibeConfig((c) => { c.modus = 'produktion'; });
  const rp = await fetch(`${BASIS}/expose.php?t=x`);
  const tp = await rp.text();
  pruefe(rp.status === 500 && !/basis_url|https|geheim/.test(tp) && /basis_url muss https/.test(phpLog), 'Produktionsmodus mit http-Adresse: Start verweigert, Grund nur im Log');
  await schreibeConfig((c) => { c.https_erzwingen = true; });
  const rh1 = await fetch(`${BASIS}/expose.php?t=x`, { redirect: 'manual' });
  pruefe(rh1.status === 301 && rh1.headers.get('location') === `https://127.0.0.1:${PORT}/expose.php?t=x`, 'https_erzwingen: GET über http → 301 auf https');
  pruefe((await post('/anfrage.php', form())).status === 403, 'https_erzwingen: POST über http → 403');
  const rh2 = await fetch(`${BASIS}/expose.php?t=x`, { redirect: 'manual', headers: { 'X-Forwarded-Proto': 'https' } });
  pruefe(rh2.status === 301, 'X-Forwarded-Proto wird ohne hinter_proxy nicht geglaubt');
  await schreibeConfig();

  // ---------- 17. Race Condition: Widerruf während Abrufen ----------
  console.log('17. Gleichzeitige Abrufe und Widerruf (Dateisperren)');
  vorher = mails();
  const em17 = adresse('race');
  await anfrageMitToken({ email: em17, name: 'Rita Rennen' });
  const m17 = neueMail(vorher, 'interessent')[0] || '';
  const l17 = linkAus(m17); const v17 = vorgangAus(m17);
  const auftraege = [];
  for (let i = 0; i < 16; i++) {
    auftraege.push(fetch(l17).then((r) => r.status));
    if (i === 8) auftraege.push(post('/widerruf.php', new URLSearchParams({ schritt: '2', name: 'Rita Rennen', email: em17, vorgang: v17 })).then((r) => 'w' + r.status));
  }
  const erg = await Promise.all(auftraege);
  const vg17 = vorgangDatei(v17);
  const n200 = erg.filter((s) => s === 200).length;
  pruefe(vg17.widerrufen === true && erg.includes('w200'), 'Widerruf bleibt bestehen, obwohl gleichzeitig abgerufen wurde');
  pruefe(vg17.abrufe === n200 && kette().filter((e) => e.vorgang === v17 && e.typ === 'abruf').length === n200, `Abrufzähler und Nachweis stimmen (${n200} Abrufe vor dem Widerruf)`);
  pruefe((await fetch(l17)).status === 410, 'danach gesperrt (410)');
  pruefe(pruefen('--daten', DATEN).status === 0, 'Kette nach parallelen Schreibvorgängen lückenlos');

  // ---------- 18. Admin-Übersicht ----------
  console.log('18. Admin-Übersicht: Login, Sitzung, CSRF, Export');
  const cookies = {};
  const merke = (r) => { for (const c of r.headers.getSetCookie()) { const [kv] = c.split(';'); const [k, v] = kv.split('='); cookies[k] = v; } return r; };
  const ck = () => Object.entries(cookies).map(([k, v]) => `${k}=${v}`).join('; ');
  const aget = async (q = '') => merke(await fetch(`${BASIS}/expose-admin.php${q}`, { headers: { Cookie: ck() }, redirect: 'manual' }));
  const apost = async (body) => merke(await fetch(`${BASIS}/expose-admin.php`, { method: 'POST', body: new URLSearchParams(body), headers: { Cookie: ck() }, redirect: 'manual' }));
  const csrfAus = (t) => (t.match(/name="csrf" value="([^"]+)"/) || [])[1];
  const r18 = await aget();
  const t18 = await r18.text();
  pruefe(r18.status === 200 && /type="password"/.test(t18) && !t18.includes('erika@example.org'), 'ohne Anmeldung nur das Login, keine Daten');
  const setCookie = r18.headers.getSetCookie().join(';');
  pruefe(/HttpOnly/i.test(setCookie) && /SameSite=Strict/i.test(setCookie), 'Sitzungs-Cookie HttpOnly, SameSite=Strict (Secure/__Host- unter HTTPS)');
  const loginCsrf = csrfAus(t18);
  pruefe((await apost({ aktion: 'anmelden', csrf: loginCsrf, benutzer: 'linus', passwort: 'falsch' })).status === 401, 'falsches Passwort → 401');
  pruefe((await apost({ aktion: 'anmelden', csrf: 'x', benutzer: 'linus', passwort: ADMIN_PW })).status === 403, 'Login ohne gültiges Login-Token → 403');
  const vorLogin = cookies.expose_admin;
  const rl18 = await apost({ aktion: 'anmelden', csrf: loginCsrf, benutzer: 'linus', passwort: ADMIN_PW });
  pruefe(rl18.status === 303 && cookies.expose_admin !== vorLogin, 'richtiges Passwort → angemeldet, neue Sitzungs-ID (Session Fixation)');
  const liste = await (await aget()).text();
  pruefe(liste.includes(vorgang) && liste.includes('erika@example.org'), 'Liste der Vorgänge sichtbar');
  pruefe(liste.includes('&lt;img src=x onerror=alert(1)&gt;') && !liste.includes('<img src=x onerror'), 'Admin-Liste: feindliche Daten HTML-kodiert (kein gespeichertes XSS)');
  const csrf = csrfAus(liste);
  pruefe((await apost({ aktion: 'sperren', v: vorgangManuell })).status === 403, 'Aktion ohne CSRF-Token → 403');
  pruefe((await apost({ aktion: 'sperren', v: vorgangManuell, csrf: 'falsch' })).status === 403, 'Aktion mit falschem CSRF-Token → 403');
  pruefe((await fetch(`${BASIS}/expose-admin.php`, { method: 'POST', body: new URLSearchParams({ aktion: 'sperren', v: vorgangManuell, csrf }), headers: { Cookie: ck(), Origin: 'https://boese.example' }, redirect: 'manual' })).status === 403, 'Aktion von fremdem Origin → 403');
  pruefe((await apost({ aktion: 'sperren', v: vorgangManuell, csrf })).status === 303 && (await fetch(lf)).status === 410, 'Link sperren wirkt sofort (410)');
  pruefe((await apost({ aktion: 'entsperren', v: vorgangManuell, csrf })).status === 303 && (await fetch(lf)).status === 200, 'Link entsperren');
  // manuelle Freigabe über die Übersicht
  await schreibeConfig((c) => { c.freigabe_modus = 'manuell'; });
  vorher = mails();
  await anfrageMitToken({ email: adresse('adminfrei'), name: 'Anna Admin' });
  const vAdmin = vorgangAus(neueMail(vorher, 'interessent')[0] || '');
  await schreibeConfig();
  pruefe((await apost({ aktion: 'freigeben', v: vAdmin, csrf })).status === 303 && Boolean(linkAus(neueMail(vorher, 'freigabe')[0] || '')), 'Freigabe in der Übersicht schickt den Link');
  pruefe((await apost({ aktion: 'aufbewahren', v: vAdmin, csrf, jahr: '2035', grund: 'Kauf' })).status === 303 && vorgangDatei(vAdmin).aufbewahren_bis === '2035-12-31', 'Aufbewahrung verlängern (Kauf)');
  pruefe((await aget(`?seite=vorgang&v=${encodeURIComponent('../../config')}`)).status === 404, 'Admin: Vorgangsnummer mit Pfad → 404');
  const ex = await aget(`?seite=export&v=${vorgang}&format=json`);
  const exText = await ex.text();
  pruefe(ex.status === 200 && /attachment; filename="nachweis-EX-/.test(ex.headers.get('content-disposition') || ''), 'Nachweis-Export als Datei');
  const exDatei = path.join(TMP, `nachweis-${vorgang}.json`);
  fs.writeFileSync(exDatei, exText);
  const exJ = JSON.parse(exText);
  pruefe(exJ.pruefung.ok && exJ.kette.filter((e) => 'inhalt' in e).every((e) => e.vorgang === vorgang || (e.inhalt && (e.inhalt.gesperrt || []).includes(vorgang)) || e.typ === 'eingangsbestaetigung'), 'Export: nur Einträge dieses Vorgangs mit Inhalt, fremde nur als Prüfwerte');
  const pe = pruefen('--export', exDatei, '--anker', nachweis.hash);
  pruefe(pe.status === 0 && /in Ordnung/.test(pe.stdout) && /gefunden bei Nr\./.test(pe.stdout), 'nachweis-pruefen --export: Datei unabhängig prüfbar, Anker aus der Kundenmail gefunden');
  const exFalsch = JSON.parse(exText); exFalsch.kette.find((e) => e.typ === 'vertragsschluss' && e.vorgang === vorgang).inhalt.beginn = 'nach_frist';
  fs.writeFileSync(exDatei + '.falsch.json', JSON.stringify(exFalsch));
  const pf = pruefen('--export', exDatei + '.falsch.json');
  pruefe(pf.status === 1 && /Inhalt verändert/.test(pf.stdout), 'manipulierter Export (Beginn geändert) wird erkannt');
  const exMail = JSON.parse(exText); const mk = Object.keys(exMail.mails)[0]; exMail.mails[mk].eml_base64 = Buffer.from('gefälscht').toString('base64');
  fs.writeFileSync(exDatei + '.mail.json', JSON.stringify(exMail));
  pruefe(pruefen('--export', exDatei + '.mail.json').status === 1, 'ausgetauschte Mail-Kopie im Export wird erkannt');
  // Export als druckbare Seite und PDF (Browser)
  const ac = await browser.newContext({ viewport: { width: 1100, height: 900 } });
  const ap = beobachte(await ac.newPage());
  await ap.goto(`${BASIS}/expose-admin.php`);
  await ap.fill('#a-benutzer', 'linus'); await ap.fill('#a-passwort', ADMIN_PW);
  await Promise.all([ap.waitForLoadState('load'), ap.click('button[type=submit]')]);
  await ap.goto(`${BASIS}/expose-admin.php?seite=vorgang&v=${vorgang}`);
  await ap.screenshot({ path: path.join(SHOTS, 'admin-vorgang-desktop.png'), fullPage: true });
  await ap.goto(`${BASIS}/expose-admin.php?seite=export&v=${vorgang}&format=html`);
  pruefe((await ap.textContent('body')).includes('Kette unverändert'), 'Nachweis-Seite zeigt Prüfergebnis');
  await ap.pdf({ path: path.join(SHOTS, 'nachweis-muster.pdf'), format: 'A4', printBackground: true });
  pruefe(fs.statSync(path.join(SHOTS, 'nachweis-muster.pdf')).size > 20000, 'Nachweis als PDF gedruckt (screenshots/nachweis-muster.pdf)');
  await ap.goto(`${BASIS}/expose-admin.php?seite=kette`);
  pruefe((await ap.textContent('body')).includes('vollständig und unverändert'), 'Kettenprüfung in der Übersicht');
  await apost({ aktion: 'abmelden', csrf });
  pruefe(!(await (await aget()).text()).includes('erika@example.org'), 'nach Abmelden keine Daten mehr');
  await schreibeConfig((c) => { c.limits.login = [[3, 900]]; });
  fs.rmSync(path.join(DATEN, 'ratelimit'), { recursive: true, force: true }); fs.mkdirSync(path.join(DATEN, 'ratelimit'));
  const lc = csrfAus(await (await aget()).text());
  const lv = [];
  for (let i = 0; i < 5; i++) lv.push((await apost({ aktion: 'anmelden', csrf: lc, benutzer: 'linus', passwort: 'falsch' + i })).status);
  const lr = (await apost({ aktion: 'anmelden', csrf: lc, benutzer: 'linus', passwort: ADMIN_PW })).status;
  pruefe(lv.join() === '401,401,401,429,429' && lr === 429, `Brute Force: nach 3 Fehlversuchen gesperrt, auch für das richtige Passwort (${lv.join()},${lr})`);
  await schreibeConfig((c) => { c.admin.ip_erlaubt = ['203.0.113.0/24']; });
  pruefe((await aget()).status === 404, 'Admin mit IP-Liste: fremde IP → 404');
  await schreibeConfig((c) => { c.admin.passwort_hash = ''; });
  pruefe((await aget()).status === 404, 'Admin ohne Passwort-Hash: abgeschaltet (404)');
  await schreibeConfig();
  fs.rmSync(path.join(DATEN, 'vorgaenge', `${boeseId}.json`));

  // ---------- 19. Nachweiskette manipulieren ----------
  console.log('19. Nachweiskette: Prüfung und Manipulation');
  const pk = pruefen('--daten', DATEN, '--anker', nachweis.hash, '--vorgang', vorgang);
  pruefe(pk.status === 0 && /in Ordnung/.test(pk.stdout) && /vertragsschluss/.test(pk.stdout), 'nachweis-pruefen: Kette und Mail-Kopien in Ordnung, Einträge des Vorgangs gelistet');
  const kopie = (n) => { const d = path.join(TMP, n); fs.rmSync(d, { recursive: true, force: true }); fs.cpSync(DATEN, d, { recursive: true }); return d; };
  const zeilenDatei = (d) => path.join(d, 'nachweise', `${monat}.jsonl`);
  let d19 = kopie('manip1');
  fs.writeFileSync(zeilenDatei(d19), fs.readFileSync(zeilenDatei(d19), 'utf8').replace('"name":"Erika Mustermann"', '"name":"Erika Musterfrau"'));
  let r19 = pruefen('--daten', d19);
  pruefe(r19.status === 1 && /Inhalt verändert/.test(r19.stdout), 'geänderter Name im Protokoll wird erkannt');
  d19 = kopie('manip2');
  const z19 = fs.readFileSync(zeilenDatei(d19), 'utf8').split('\n'); z19.splice(3, 1);
  fs.writeFileSync(zeilenDatei(d19), z19.join('\n'));
  r19 = pruefen('--daten', d19);
  pruefe(r19.status === 1 && /Lücke|Verkettung gebrochen/.test(r19.stdout), 'gelöschter Eintrag wird erkannt');
  d19 = kopie('manip3');
  const z3 = fs.readFileSync(zeilenDatei(d19), 'utf8').trim().split('\n').map((z) => JSON.parse(z));
  z3[2].inhalt = { gefaelscht: true };
  const hashOf = (o) => crypto.createHash('sha256').update(o).digest('hex');
  z3[2].inhalt_sha256 = hashOf('{"gefaelscht":true}');
  fs.writeFileSync(zeilenDatei(d19), z3.map((e) => JSON.stringify(e)).join('\n') + '\n');
  r19 = pruefen('--daten', d19);
  pruefe(r19.status === 1 && /Eintrag verändert/.test(r19.stdout), 'Inhalt samt Inhalts-Prüfwert ersetzt: Kettenprüfwert passt nicht mehr');
  d19 = kopie('manip4');
  const mk19 = fs.readdirSync(path.join(d19, 'nachweise/mails'))[0];
  fs.appendFileSync(path.join(d19, 'nachweise/mails', mk19), 'x');
  r19 = pruefen('--daten', d19);
  pruefe(r19.status === 1 && /Mail-Kopie verändert/.test(r19.stdout), 'veränderte Mail-Kopie wird erkannt');
  r19 = pruefen('--daten', DATEN, '--anker', 'f'.repeat(64));
  pruefe(r19.status === 1 && /NICHT GEFUNDEN/.test(r19.stdout), 'unbekannter Anker (Kette ersetzt) wird gemeldet');

  // ---------- 20. Löschen nach Frist ----------
  console.log('20. Löschskript (DSGVO-Fristen)');
  const d20 = kopie('loeschen');
  const cfg20 = path.join(TMP, 'config-loeschen.php');
  fs.writeFileSync(cfg20, phpKonfig({ ...basisKonfig(), daten: d20 }));
  const loesch = (...a) => spawnSync('php', [path.join(WERKZEUGE, 'loeschen.php'), ...a], { encoding: 'utf8', env: { ...process.env, EXPOSE_CONFIG: cfg20 } });
  const anzahlV = fs.readdirSync(path.join(d20, 'vorgaenge')).filter((f) => f.endsWith('.json')).length;
  const probe = loesch('--heute', '2030-01-02');
  pruefe(probe.status === 0 && new RegExp(`${anzahlV - 1} Vorgang`).test(probe.stdout) && fs.readdirSync(path.join(d20, 'vorgaenge')).filter((f) => f.endsWith('.json')).length === anzahlV, `Probelauf 2030: ${anzahlV - 1} fällig (einer mit Aufbewahrung bis 2035), nichts gelöscht`);
  pruefe(/0 Vorgang/.test(loesch('--heute', '2029-12-31').stdout), 'vor Fristende (31.12. des 3. Folgejahres) nichts fällig');
  const lauf = loesch('--heute', '2030-01-02', '--ausfuehren');
  const rest = fs.readdirSync(path.join(d20, 'vorgaenge')).filter((f) => f.endsWith('.json'));
  pruefe(lauf.status === 0 && rest.length === 1 && rest[0] === `${vAdmin}.json`, 'Löschlauf: nur der Vorgang mit Aufbewahrung bleibt');
  const nachLoeschen = fs.readFileSync(path.join(d20, 'nachweise', `${monat}.jsonl`), 'utf8');
  pruefe(!nachLoeschen.includes('erika@example.org') && !nachLoeschen.includes('Erika Mustermann') && nachLoeschen.includes('Anna Admin'), 'Personendaten geschwärzt, aufbewahrter Vorgang unverändert');
  const pl = pruefen('--daten', d20, '--anker', nachweis.hash);
  pruefe(pl.status === 0 && /geschwärzt: [1-9]/.test(pl.stdout), 'Kette bleibt nach dem Schwärzen prüfbar, alter Anker weiter gültig');
  pruefe(fs.readdirSync(path.join(d20, 'nachweise/mails')).every((f) => f.startsWith(vAdmin)), 'Mail-Kopien gelöschter Vorgänge entfernt');
  const tech = loesch('--technik');
  pruefe(tech.status === 0 && /Technik:/.test(tech.stdout), 'technischer Aufräumlauf (Rate-Limit, Sitzungen, Logs)');

  // ---------- 21. Backup und Geheimnisse ----------
  console.log('21. Verschlüsseltes Backup, Geheimnisse');
  const bk = path.join(TMP, 'backup'); const schl21 = path.join(TMP, 'backup-schluessel'); const zur = path.join(TMP, 'zurueck');
  const sh = (a, env = {}) => spawnSync('bash', [path.join(WURZEL, 'deploy/backup.sh'), ...a], { encoding: 'utf8', env: { ...process.env, ...env } });
  pruefe(sh(['schluessel', schl21], { BACKUP_OHNE_PASSWORT: '1' }).status === 0, 'Schlüsselpaar erzeugt');
  const s21 = sh(['sichern', DATEN, bk, path.join(schl21, 'backup-zertifikat.pem')]);
  const bDatei = fs.readdirSync(bk).find((f) => f.endsWith('.cms'));
  pruefe(s21.status === 0 && bDatei && !fs.readFileSync(path.join(bk, bDatei)).includes('Erika'), 'Sicherung verschlüsselt (kein Klartext)');
  const e21 = sh(['entschluesseln', path.join(bk, bDatei), path.join(schl21, 'backup-privat.pem'), zur]);
  pruefe(e21.status === 0 && pruefen('--daten', path.join(zur, 'expose-daten'), '--anker', nachweis.hash).status === 0, 'Sicherung entschlüsselt, Kette darin geprüft, Anker gefunden');
  const gd = path.join(TMP, 'geheim'); fs.mkdirSync(gd);
  const g1 = spawnSync('php', [path.join(WURZEL, 'deploy/geheimnisse-erzeugen.php'), gd, '--admin-passwort-zufaellig'], { encoding: 'utf8' });
  const pw = (g1.stdout.match(/Admin-Passwort \(nur jetzt sichtbar.*\): (\S+)/) || [])[1];
  const gDatei = path.join(gd, 'geheimnisse.php');
  const gPruef = spawnSync('php', ['-r', `$g = require '${gDatei}'; echo strlen($g['geheim']), ' ', password_verify('${pw}', $g['admin']['passwort_hash']) ? 'ok' : 'nein';`], { encoding: 'utf8' }).stdout;
  pruefe(g1.status === 0 && gPruef === '64 ok' && modus(gDatei) === '600', 'geheimnisse.php: 64-Zeichen-Schlüssel, Passwort-Hash, Rechte 600');
  spawnSync('php', [path.join(WURZEL, 'deploy/geheimnisse-erzeugen.php'), gd, '--neuer-schluessel'], { encoding: 'utf8' });
  const gAlt = spawnSync('php', ['-r', `$g = require '${gDatei}'; echo count($g['geheim_alt']);`], { encoding: 'utf8' }).stdout;
  pruefe(gAlt === '1', 'Schlüsselwechsel: alter Schlüssel nach geheim_alt');
  pruefe(!/geheim'\s*=>\s*'[0-9a-f]{64}/.test(fs.readFileSync(path.join(WURZEL, 'backend/config.beispiel.php'), 'utf8')) && fs.readFileSync(path.join(WURZEL, '.gitignore'), 'utf8').includes('geheimnisse.php'), 'keine Geheimnisse im Repo, geheimnisse.php in .gitignore');

  // ---------- 22. SMTP ohne Fremdbibliothek ----------
  console.log('22. SMTP-Versand (Test-Server ohne TLS), Punkt-Maskierung, ein Empfänger');
  const smtpLog = [];
  const smtp = net.createServer((s) => {
    let puffer = ''; let daten = false; let msg = '';
    const t = { befehle: [], daten: '' }; smtpLog.push(t);
    s.write('220 test ESMTP\r\n');
    s.on('data', (d) => {
      puffer += d.toString('latin1');
      while (true) {
        if (daten) { const i = puffer.indexOf('\r\n.\r\n'); if (i < 0) return; msg += puffer.slice(0, i + 2); t.daten = msg; puffer = puffer.slice(i + 5); daten = false; s.write('250 2.0.0 Ok: queued as TEST123\r\n'); continue; }
        const i = puffer.indexOf('\r\n'); if (i < 0) return;
        const z = puffer.slice(0, i); puffer = puffer.slice(i + 2); t.befehle.push(z);
        if (/^EHLO/i.test(z)) s.write('250-test\r\n250-AUTH PLAIN LOGIN\r\n250 8BITMIME\r\n');
        else if (/^AUTH PLAIN/i.test(z)) s.write(Buffer.from(z.slice(11), 'base64').toString() === '\0anfrage@roessler-immo.de\0smtp-geheim' ? '235 ok\r\n' : '535 nein\r\n');
        else if (/^(MAIL|RCPT)/i.test(z)) s.write('250 ok\r\n');
        else if (/^DATA/i.test(z)) { daten = true; s.write('354 los\r\n'); }
        else if (/^QUIT/i.test(z)) { s.write('221 tschüss\r\n'); s.end(); }
        else s.write('500 ?\r\n');
      }
    });
  });
  await new Promise((r) => smtp.listen(0, '127.0.0.1', r));
  const sPort = smtp.address().port;
  const smtpSkript = path.join(TMP, 'smtp-test.php');
  fs.writeFileSync(smtpSkript, `<?php require '${path.join(DIST, 'expose-backend/lib/mail.php')}';
$m = ['transport' => 'smtp', 'absender' => 'anfrage@roessler-immo.de', 'absender_name' => 'Linus Rössler', 'antwort_an' => 'linus@roessler-immo.de',
  'smtp' => ['host' => '127.0.0.1', 'port' => ${sPort}, 'sicherheit' => 'keine', 'user' => 'anfrage@roessler-immo.de', 'pass' => 'smtp-geheim']];
$r = Expose\\nachricht_senden($m, 'kunde@example.org', 'Test', "Zeile 1\\n.\\nRCPT TO:<opfer@example.net>\\n.Punkt am Anfang", null, 'x', 'roessler-immo.de', '/tmp', true);
echo $r['antwort'];
try { Expose\\nachricht_senden($m, 'kunde@example.org', 'Test', 'x', null, 'x', 'roessler-immo.de', '/tmp', false); echo ' FEHLER'; } catch (Throwable $e) { echo ' | ', $e->getMessage(); }
try { Expose\\nachricht_senden($m, "kunde@example.org>\\r\\nRCPT TO:<b@example.net", 'Test', 'x', null, 'x', 'roessler-immo.de', '/tmp', true); echo ' FEHLER'; } catch (Throwable $e) { echo ' | ', $e->getMessage(); }
`);
  // asynchron starten: der Test-SMTP-Server läuft im selben Node-Prozess
  const so = await new Promise((res) => { const c = spawn('php', [smtpSkript]); let out = ''; c.stdout.on('data', (d) => { out += d; }); c.stderr.on('data', (d) => { out += d; }); c.on('close', (code) => res({ status: code, stdout: out })); });
  const t22 = smtpLog[0] || { befehle: [], daten: '' };
  pruefe(/queued as TEST123/.test(so.stdout) && t22.befehle.some((b) => b.startsWith('AUTH PLAIN')), 'SMTP: Anmeldung (AUTH PLAIN) und Übergabe, Antwort des Servers wird gemeldet');
  pruefe(t22.befehle.filter((b) => /^RCPT/i.test(b)).length === 1 && /\r\n\.\.\r\nRCPT TO/.test(t22.daten) && /\r\n\.\.Punkt/.test(t22.daten), 'SMTP: Punkt-Zeilen maskiert, nur ein RCPT (keine SMTP-Injektion über den Text)');
  pruefe(/nur im Testmodus/.test(so.stdout) && /Ungültige Adresse/.test(so.stdout) && smtpLog.length === 1, 'SMTP ohne TLS außerhalb des Testmodus verweigert, Adresse mit CRLF verweigert');
  await schreibeConfig((c) => { c.mail.transport = 'smtp'; c.mail.smtp = { host: '127.0.0.1', port: sPort, sicherheit: 'keine', user: 'anfrage@roessler-immo.de', pass: 'smtp-geheim' }; });
  const vorSmtp = smtpLog.length;
  const rs = await anfrageMitToken({ email: adresse('smtp') });
  const neu22 = smtpLog.slice(vorSmtp);
  const best22 = kette().filter((e) => e.typ === 'bestaetigung').pop();
  pruefe(rs.status === 303 && neu22.length === 2 && /queued as TEST123/.test(best22.inhalt.server), 'Anfrage über SMTP: zwei Mails übergeben, Server-Quittung im Nachweis');
  await schreibeConfig();
  smtp.close();

  // ---------- 23. Ende-zu-Ende (komplett) ----------
  console.log('23. Ende-zu-Ende: Formular → Mail → Link → Exposé → Widerruf → gesperrt → Export → Prüfung');
  vorher = mails();
  const e2e = beobachte(await desk.newPage());
  await e2e.goto(`${BASIS}/objekte/${SLUG}/`);
  await Promise.all([e2e.waitForURL(/anfordern/), e2e.click('a[href$="/anfordern/"]')]);
  await e2e.fill('#f-name', 'Ende Zuende'); await e2e.fill('#f-email', 'e2e@example.org');
  await e2e.check('#e-maklervertrag'); await e2e.check('#e-widerrufsbelehrung'); await e2e.check('#b-sofort'); await e2e.check('#e-vorzeitig_verlangen'); await e2e.check('#e-vorzeitig_kenntnis'); await e2e.check('#e-vertraulichkeit');
  await e2e.waitForTimeout(3600);
  await Promise.all([e2e.waitForURL(/danke\/sofort/), e2e.click('button[type=submit]')]);
  const mE = neueMail(vorher, 'interessent')[0] || '';
  const lE = linkAus(mE); const vE = vorgangAus(mE); const hE = (mE.match(/Prüfwert \(SHA-256\):\n([0-9a-f]{64})/) || [])[1];
  pruefe(Boolean(lE && vE && hE), 'E2E: Bestätigungs-Mail abgefangen (Link, Vorgang, Prüfwert)');
  await e2e.goto(lE);
  pruefe((await e2e.content()).includes('Ende Zuende'), 'E2E: Voll-Exposé personalisiert');
  await e2e.goto(`${BASIS}/vertrag-widerrufen/`);
  await e2e.fill('#w-name', 'Ende Zuende'); await e2e.fill('#w-email', 'e2e@example.org'); await e2e.selectOption('#w-objekt', SLUG);
  await Promise.all([e2e.waitForLoadState('load'), e2e.click('button[type=submit]')]);
  await Promise.all([e2e.waitForLoadState('load'), e2e.click('button[type=submit]')]);
  pruefe((await e2e.textContent('h1')).includes('eingegangen') && neueMail(vorher, 'widerruf').length === 1, 'E2E: Widerruf in zwei Schritten, Eingangsbestätigung');
  const gE = await e2e.goto(lE);
  pruefe(gE.status() === 410, 'E2E: Link danach gesperrt');
  cookies.expose_admin = undefined;
  const lc2 = csrfAus(await (await aget()).text());
  await apost({ aktion: 'anmelden', csrf: lc2, benutzer: 'linus', passwort: ADMIN_PW });
  const exE = path.join(TMP, `nachweis-${vE}.json`);
  fs.writeFileSync(exE, await (await aget(`?seite=export&v=${vE}&format=json`)).text());
  const pE = pruefen('--export', exE, '--anker', hE);
  const exEJ = JSON.parse(fs.readFileSync(exE, 'utf8'));
  const typen = exEJ.kette.filter((e) => 'inhalt' in e).map((e) => e.typ);
  pruefe(pE.status === 0 && ['vertragsschluss', 'bestaetigung', 'abruf', 'widerruf', 'eingangsbestaetigung'].every((t) => typen.includes(t)), `E2E: Nachweis-Export vollständig (${[...new Set(typen)].join(', ')}) und Hash-Kette geprüft`);
  pruefe(pruefen('--daten', DATEN).status === 0, 'E2E: gesamte Kette in Ordnung');

  pruefe(cspFehler.length === 0, `keine CSP-Verstöße und keine Dialoge in allen Browser-Seiten${cspFehler.length ? ': ' + cspFehler.slice(0, 3).join(' | ') : ''}`);
} catch (e) {
  nok++; console.error('ABBRUCH:', e); if (phpLog) console.error(phpLog.split('\n').filter((z) => /Fatal|Warning|Error|FEHLER/.test(z)).slice(-10).join('\n'));
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
const unerwartet = phpLog.split('\n').filter((z) => /FEHLER [0-9A-F]{8}/.test(z) && !/nicht schreibbar|Is a directory|failed to open|Nachweisdatei|basis_url muss https/.test(z));
pruefe(unerwartet.length === 0, `keine unerwarteten Ausnahmen im Server-Log${unerwartet.length ? ': ' + unerwartet.slice(0, 3).join(' | ') : ''}`);
console.log(`\n${ok} bestanden, ${nok} fehlgeschlagen`);
ende(nok ? 1 : 0);
