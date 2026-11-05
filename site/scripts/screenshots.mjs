// npm run screenshots [-- dist-vorschau]  JPEG-Screenshots nach site/screenshots/ (klein, für die Durchsicht).
import { spawn } from 'node:child_process';
import { mkdirSync } from 'node:fs';
import { chromium } from 'playwright';
const dir = process.argv[2] ?? 'dist-vorschau';
const php = spawn('php', ['-S', '127.0.0.1:4351', '-t', dir, 'tests/router.php'], { stdio: 'ignore' });
await new Promise((r) => setTimeout(r, 800));
mkdirSync('screenshots', { recursive: true });
const AUFNAHMEN = [
  ['start-mobil', '/', 390, 844, false],
  ['start-desktop', '/', 1366, 900, false],
  ['start-mobil-ganz', '/', 390, 844, true],
  ['ort-leonberg-mobil', '/wohnung-verkaufen/leonberg/', 390, 844, false],
  ['ort-leonberg-desktop', '/wohnung-verkaufen/leonberg/', 1366, 900, false],
  ['ratgeber-vermietete-wohnung-desktop', '/ratgeber/vermietete-wohnung-verkaufen/', 1366, 900, false],
  ['ratgeber-vermietete-wohnung-mobil', '/ratgeber/vermietete-wohnung-verkaufen/', 390, 844, false],
  ['ort-leonberg-mobil-ganz', '/wohnung-verkaufen/leonberg/', 390, 844, true],
  ['ratgeber-vermietete-wohnung-desktop-ganz', '/ratgeber/vermietete-wohnung-verkaufen/', 1366, 900, true],
  ['ort-pforzheim-desktop', '/wohnung-verkaufen/pforzheim/', 1366, 900, false],
  ['ort-heimsheim-desktop', '/wohnung-verkaufen/heimsheim/', 1366, 900, false],
  ['aktuell-bauzinsen-mobil', '/aktuell/bauzinsen-november-2026/', 390, 844, false],
  ['bildnachweis-desktop', '/bildnachweis/', 1366, 900, false],
  ['bewertung-formular-mobil', '/wohnung-bewerten/#formular', 390, 844, false],
  ['bewertung-desktop', '/wohnung-bewerten/', 1366, 900, false],
  ['kontakt-mobil', '/kontakt/', 390, 844, false],
];
const b = await chromium.launch();
for (const [name, url, w, h, ganz] of AUFNAHMEN) {
  const c = await b.newContext({ viewport: { width: w, height: h }, deviceScaleFactor: 1 });
  const p = await c.newPage();
  await p.goto(`http://127.0.0.1:4351${url}`, { waitUntil: 'networkidle' });
  await p.screenshot({ path: `screenshots/${name}.jpg`, type: 'jpeg', quality: ganz ? 35 : 55, fullPage: ganz });
  await c.close();
}
await b.close(); php.kill();
console.log(`${AUFNAHMEN.length} Screenshots in site/screenshots/`);
