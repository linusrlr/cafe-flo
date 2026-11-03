# 04 Abnahmetests

Stand: 3. November 2026. Jeder Test hat eine ID (T-…), eine Checkliste für Menschen und einen Befehl für die Maschine. Alle Befehle laufen aus `site/` nach `npm run build`. Dieselben Befehle laufen in der GitHub Action (01-technik.md 16.2); ein roter Test verhindert das Ausliefern.

Werkzeuge (exakte Versionen in `package-lock.json` pinnen): `@playwright/test`, `@axe-core/playwright`, `@lhci/cli`, `html-validate`, `lychee` (Binary, im CI per `lycheeverse/lychee-action` oder `cargo-binstall`), PHP ≥ 8.2 (CI-Runner `ubuntu-24.04` hat PHP vorinstalliert), `curl`, `jq`.

## 0. Checkliste Abnahme je Welle

| ID | Prüfpunkt | Automatisch |
|---|---|---|
| T-BUILD | Build grün, keine Fehler aus `check-inhalte`/`check-fakten`; Warnungen gelesen | ja |
| T-MARK | keine `[LINUS: …]`/`[ZU PRÜFEN: …]` und keine HTML-Kommentare mit Umsetzungsnotizen in veröffentlichten Seiten | ja |
| T-ERL | Erlaubnis-Aussagen nur über `ErlaubnisHinweis`, Baustein passend zum Status | ja |
| T-VIEW | 360/390/1366 px: H1 und primärer CTA im ersten Bildschirm mobil, kein horizontaler Scroll | ja |
| T-NAV | echte Links, Browser-Zurück funktioniert, alte `#hash`-Links leiten um | ja |
| T-FORM | alle drei Formulare ohne JS und mit JS absendbar; Schritte und Zurück-Taste | ja |
| T-SPAM | Honeypot, Zeitprüfung, Rate-Limit | ja (lokal), Rate-Limit zusätzlich live per curl |
| T-A11Y | axe-core ohne `serious`/`critical`; Tastaturrundgang manuell | ja + manuell |
| T-LH | Lighthouse mobil Performance ≥ 90, A11y ≥ 95, SEO 100, Best Practices ≥ 95 | ja |
| T-BUDGET | Budgets aus 01-technik.md 11 | ja |
| T-HTML | html-validate ohne Fehler | ja |
| T-LINK | interne Links und Anker ok (offline); externe wöchentlich | ja |
| T-SCHEMA | JSON-LD gültig, Regeln aus 03-strukturierte-daten.md 5 | ja + manuell Rich Results Test |
| T-HEAD | Header, Weiterleitungen, Caching live per curl | ja (nach Deploy) |
| T-3P | kein Request an fremde Hosts | ja |
| T-MAIL | SPF/DKIM/DMARC pass, Bestätigung nicht im Spam | manuell |
| T-LINUS | Linus hat jede Seite der Welle gelesen und freigegeben (`status: veröffentlicht` von ihm gesetzt oder bestätigt) | manuell |

## 1. Inhalte und Marker (T-BUILD, T-MARK, T-ERL)

```bash
npm run build                                   # prebuild: check-inhalte + check-fakten, bricht bei Fehlern ab
# Nachkontrolle in der Ausgabe:
! grep -rlE '\[(LINUS|ZU PRÜFEN)' dist --include='*.html'
! grep -rlE '<!--[^>]*(LINUS|Umsetzung|Hinweise zur Umsetzung|JSON-LD|FAQPage-Schema)' dist --include='*.html'
! grep -rl '{{' dist --include='*.html'          # kein unaufgelöster Platzhalter
# Erlaubnis (solange fakten.erlaubnis.status = beantragt):
! grep -rlE 'Beratungsgespr|Investor vorstell|jetzt beauftragen|Verkaufsplan (bekommen Sie )?sofort' dist --include='*.html'
test "$(grep -l 'class="hinweis-erlaubnis"' dist/index.html dist/wohnung-verkaufen/index.html dist/kontakt/index.html | wc -l)" -eq 3
```

Negativtest (einmal je Session, nicht im CI): In einer Kopie `texte/start.md` auf `status: veröffentlicht` setzen und einen `[LINUS: x]` lassen; `npm run build` muss mit Exit-Code 1 und Dateiname, Zeile und Markertext abbrechen. Dasselbe mit `{{fakten.gibtsnicht}}` und mit einem Faktenwert `status: zu_pruefen`.

`check-fakten` Ausgabe prüfen: Warnungen „veraltet“, „läuft bald ab“ (Sperrfrist/Mietpreisbremse bis 31.12.2026), „Stichtag“ (GModG 1.1.2027) müssen erscheinen, solange die Daten nicht aktualisiert sind.

## 2. Playwright (T-VIEW, T-NAV, T-FORM, T-SPAM, T-A11Y, T-3P)

### 2.1 Konfiguration

```ts
// tests/playwright.config.ts
import { defineConfig, devices } from '@playwright/test';
export default defineConfig({
  testDir: './e2e',
  use: { baseURL: 'http://127.0.0.1:4321', trace: 'retain-on-failure' },
  webServer: {   // PHP-Server liefert dist/ und führt kontakt.php/bewertung.php aus (Mail-Transport "datei")
    command: 'FORMULAR_CONFIG=tests/config.test.php php -S 127.0.0.1:4321 -t dist tests/router.php',
    url: 'http://127.0.0.1:4321/', reuseExistingServer: !process.env.CI,
  },
  projects: [
    { name: 'm360',  use: { ...devices['Galaxy S9+'], viewport: { width: 360, height: 640 } } },
    { name: 'm390',  use: { ...devices['iPhone 13'], viewport: { width: 390, height: 664 }, browserName: 'chromium' } },
    { name: 'd1366', use: { viewport: { width: 1366, height: 768 } } },
    { name: 'nojs',  use: { viewport: { width: 390, height: 664 }, javaScriptEnabled: false } },
  ],
});
```

`tests/router.php` bildet nginx nach: `/pfad/` → `dist/pfad/index.html`, unbekannt → `dist/404.html` mit Status 404, `*.php` ausführen. `tests/config.test.php` setzt `transport => 'datei'`, Datenverzeichnis `tests/.daten/`, Rate-Limit-Grenzen wie produktiv.

Seitenliste für alle Tests: `tests/e2e/seiten.ts` liest `dist/sitemap-0.xml` (alle indexierbaren URLs) und ergänzt die Danke- und 404-Seiten.

### 2.2 Viewports (T-VIEW)

```ts
// tests/e2e/viewport.spec.ts
import { test, expect } from '@playwright/test';
import { seiten } from './seiten';

for (const url of seiten()) {
  test(`kein horizontaler Scroll: ${url}`, async ({ page }) => {
    await page.goto(url);
    const [sw, cw] = await page.evaluate(() => [document.documentElement.scrollWidth, document.documentElement.clientWidth]);
    expect(sw).toBeLessThanOrEqual(cw);
  });
}

for (const url of ['/', '/wohnung-verkaufen/', '/wohnung-bewerten/', '/direktankauf/', '/wohnung-verkaufen/leonberg/']) {
  test(`H1 und CTA im ersten Bildschirm: ${url}`, async ({ page }, info) => {
    test.skip(!info.project.name.startsWith('m'), 'nur mobil');
    await page.goto(url);
    const h = page.viewportSize()!.height;
    const h1 = await page.locator('h1').boundingBox();
    const cta = await page.locator('main .btn-primaer, main form legend').first().boundingBox();
    expect(h1!.y + h1!.height).toBeLessThanOrEqual(h);
    expect(cta!.y + cta!.height).toBeLessThanOrEqual(h);
  });
}

test('Telefon-Icon mobil sichtbar', async ({ page }, info) => {
  test.skip(!info.project.name.startsWith('m'));
  await page.goto('/');
  await expect(page.locator('header a[href^="tel:"]')).toBeVisible();
});
```

Zusatz manuell einmal je Welle: 320 px ohne horizontalen Scroll (M4 Akzeptanz).

### 2.3 Navigation und Zurück-Taste (T-NAV)

```ts
// tests/e2e/navigation.spec.ts
test('Navigation sind Links, Zurück funktioniert', async ({ page }) => {
  await page.goto('/');
  expect(await page.locator('nav[aria-label="Hauptnavigation"] button:not([aria-controls])').count()).toBe(0);
  await page.locator('nav[aria-label="Hauptnavigation"] a[href="/wohnung-verkaufen/"]').first().click({ force: true });
  await expect(page).toHaveURL('/wohnung-verkaufen/');
  await expect(page.locator('a[aria-current="page"]').first()).toHaveAttribute('href', '/wohnung-verkaufen/');
  await page.goBack();
  await expect(page).toHaveURL('/');
});

for (const [hash, ziel] of [['verkaufen', '/wohnung-verkaufen/'], ['ankauf', '/direktankauf/'], ['person', '/ueber-mich/'],
                            ['kontakt', '/kontakt/'], ['impressum', '/impressum/'], ['datenschutz', '/datenschutz/']]) {
  test(`alter Link #${hash}`, async ({ page }, info) => {
    test.skip(info.project.name === 'nojs');
    await page.goto(`/#${hash}`);
    await expect(page).toHaveURL(ziel);
  });
}

test('Inhalt ohne JS vollständig', async ({ page }, info) => {
  test.skip(info.project.name !== 'nojs');
  await page.goto('/wohnung-verkaufen/');
  await expect(page.locator('h1')).toHaveCount(1);
  await expect(page.locator('#haeufige-fragen, [id^="haeufige-fragen"]').first()).toBeAttached();
});
```

### 2.4 Formulare (T-FORM)

```ts
// tests/e2e/formular.spec.ts
import { test, expect } from '@playwright/test';
import { letzteMail, leereMails } from './mails';   // liest tests/.daten/test-mails/*.eml

test.beforeEach(() => leereMails());

test('Bewertung ohne JS absendbar', async ({ page }, info) => {
  test.skip(info.project.name !== 'nojs');
  await page.goto('/wohnung-bewerten/');
  await expect(page.locator('form fieldset')).toHaveCount(4);          // alle Schritte sichtbar
  await page.selectOption('[name=ort]', 'leonberg');
  await page.fill('[name=wohnflaeche]', '72');
  await page.fill('[name=name]', 'Maria Beispiel');
  await page.fill('[name=email]', 'maria@example.org');
  await page.click('form button[type=submit]');
  await expect(page).toHaveURL('/wohnung-bewerten/danke/');
  const mails = letzteMail();
  expect(mails.benachrichtigung.subject).toContain('[Bewertung] Leonberg');
  expect(mails.benachrichtigung.headers['reply-to']).toContain('maria@example.org');
  expect(mails.benachrichtigung.headers.from).toContain('@roessler-immo.de');
  expect(mails.bestaetigung.subject).toBe('Ihre Anfrage bei Rössler Immobilien');
});

test('Bewertung ohne JS: Fehlerseite', async ({ page }, info) => {
  test.skip(info.project.name !== 'nojs');
  await page.goto('/wohnung-bewerten/');
  await page.selectOption('[name=ort]', 'leonberg');
  await page.fill('[name=name]', 'Maria Beispiel');                     // weder E-Mail noch Telefon
  await page.click('form button[type=submit]');
  await expect(page.locator('main')).toContainText('E-Mail-Adresse oder eine Telefonnummer');
  await expect(page.locator('a[href="/wohnung-bewerten/#formular"]')).toBeVisible();
});

test('Bewertung mit JS: Schritte, Zurück-Taste, Erfolg', async ({ page }, info) => {
  test.skip(info.project.name === 'nojs');
  await page.goto('/wohnung-bewerten/');
  await expect(page.locator('form fieldset:visible')).toHaveCount(1);
  await page.click('button:has-text("Weiter")');                         // Pflichtfeld Ort fehlt
  await expect(page.locator('[name=ort]')).toHaveAttribute('aria-invalid', 'true');
  await page.selectOption('[name=ort]', 'pforzheim');
  await page.click('button:has-text("Weiter")');
  await expect(page.locator('[aria-live]')).toContainText('Schritt 2 von 4');
  await expect(page).toHaveURL(/schritt=2/);
  await page.goBack();                                                   // Browser-Zurück = Schritt zurück
  await expect(page.locator('[aria-live]')).toContainText('Schritt 1 von 4');
  await expect(page).toHaveURL(/\/wohnung-bewerten\//);
  await page.goForward();
  for (let i = 0; i < 2; i++) await page.click('button:has-text("Weiter")');
  await page.waitForTimeout(8100);                                       // Zeitprüfung Bewertung: 8 s
  await page.fill('[name=name]', 'Peter Muster');
  await page.fill('[name=telefon]', '0711 123456');
  await page.click('form button[type=submit]');
  await expect(page).toHaveURL('/wohnung-bewerten/danke/');
  await page.goBack();
  await expect(page).toHaveURL(/\/wohnung-bewerten\//);                  // zurück aufs Formular, nicht aus der Seite
});

for (const [seite, danke, art] of [['/kontakt/', '/kontakt/danke/', 'Kontakt'], ['/direktankauf/', '/direktankauf/danke/', 'Ankauf']]) {
  test(`${art} ohne JS`, async ({ page }, info) => {
    test.skip(info.project.name !== 'nojs');
    await page.goto(seite);
    const f = page.locator('form');
    await f.locator('[name=name]').fill('Anna Probe');
    await f.locator('[name=telefon]').fill('0159 1234567');
    if (art === 'Ankauf') await f.locator('[name=ort]').selectOption('ditzingen');
    await f.locator('button[type=submit]').click();
    await expect(page).toHaveURL(danke);
    expect(letzteMail().benachrichtigung.subject).toContain(`[${art}]`);
    expect(letzteMail().bestaetigung).toBeUndefined();                   // keine E-Mail angegeben
  });
}
```

### 2.5 Spam (T-SPAM)

```ts
// tests/e2e/spam.spec.ts  (direkte POSTs, unabhängig vom Browser)
test('Honeypot: Erfolg vortäuschen, keine Mail', async ({ request }) => {
  const r = await request.post('/kontakt.php', { form: { formular: 'kontakt', name: 'Bot', telefon: '0123456789', website: 'x' }, maxRedirects: 0 });
  expect(r.status()).toBe(303);
  expect(r.headers().location).toBe('/kontakt/danke/');
  expect(letzteMail().benachrichtigung).toBeUndefined();
});
test('Zeitprüfung', async ({ request }) => {
  const r = await request.post('/kontakt.php', { headers: { accept: 'application/json' },
    form: { formular: 'kontakt', name: 'Schnell', telefon: '0123456789', t: '500', js: '1' } });
  expect((await r.json()).ok).toBe(true);
  expect(letzteMail().benachrichtigung).toBeUndefined();
});
test('Rate-Limit: 4. Anfrage in 10 Minuten', async ({ request }) => {
  const f = { formular: 'kontakt', name: 'Limit Test', telefon: '0123456789' };
  for (let i = 0; i < 3; i++) expect((await request.post('/kontakt.php', { form: f, maxRedirects: 0 })).status()).toBe(303);
  expect((await request.post('/kontakt.php', { form: f, maxRedirects: 0 })).status()).toBe(429);
});
test('GET kontakt.php leitet um', async ({ request }) => {
  expect((await request.get('/kontakt.php', { maxRedirects: 0 })).status()).toBe(303);
});
test('Validierung JSON', async ({ request }) => {
  const r = await request.post('/bewertung.php', { headers: { accept: 'application/json' }, form: { formular: 'bewertung', name: 'X' } });
  expect(r.status()).toBe(422);
  const j = await r.json();
  expect(Object.keys(j.fehler)).toEqual(expect.arrayContaining(['ort', 'email', 'telefon', 'name']));
});
```

Rate-Limit-Dateien werden in `test.beforeEach` des Spam-Tests gelöscht, damit die Tests unabhängig sind.

### 2.6 Barrierefreiheit (T-A11Y)

```ts
// tests/e2e/a11y.spec.ts
import AxeBuilder from '@axe-core/playwright';
for (const url of seiten()) {
  test(`axe ${url}`, async ({ page }) => {
    await page.goto(url);
    const r = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa', 'best-practice']).analyze();
    const schwer = r.violations.filter(v => v.impact === 'serious' || v.impact === 'critical');
    expect(schwer, JSON.stringify(schwer.map(v => [v.id, v.nodes.length]), null, 1)).toEqual([]);
  });
}
test('Skip-Link ist erstes Fokusziel', async ({ page }) => {
  await page.goto('/ratgeber/');
  await page.keyboard.press('Tab');
  await expect(page.locator(':focus')).toHaveText(/Zum Inhalt springen/);
  await page.keyboard.press('Enter');
  await expect(page.locator('main#inhalt')).toBeFocused();
});
test('Menü mit Tastatur', async ({ page }, info) => {
  test.skip(!info.project.name.startsWith('m') || info.project.name === 'nojs');
  await page.goto('/');
  const b = page.locator('header button[aria-controls]');
  await b.focus(); await page.keyboard.press('Enter');
  await expect(b).toHaveAttribute('aria-expanded', 'true');
  await page.keyboard.press('Escape');
  await expect(b).toHaveAttribute('aria-expanded', 'false');
  await expect(b).toBeFocused();
});
```

Die Formular-Seiten werden zusätzlich im Fehlerzustand geprüft (nach Absenden ohne Pflichtfelder axe erneut laufen lassen). Manuell je Welle: kompletter Rundgang nur mit Tastatur durch Bewertungsformular; VoiceOver iOS auf `/wohnung-bewerten/` (Schrittansage, Fehleransage).

### 2.7 Keine Drittanbieter (T-3P)

```ts
test('nur eigene Requests', async ({ page }) => {
  const fremd: string[] = [];
  page.on('request', r => { const h = new URL(r.url()).host; if (h !== '127.0.0.1:4321') fremd.push(r.url()); });
  for (const url of seiten()) await page.goto(url, { waitUntil: 'networkidle' });
  expect(fremd).toEqual([]);
});
```

Und statisch: `! grep -rE 'fonts\.(googleapis|gstatic)|googletagmanager|google-analytics' dist`.

Aufruf:

```bash
npx playwright install --with-deps chromium
npm run test:e2e                         # alle Projekte
npx playwright test -c tests/playwright.config.ts --project=nojs formular   # gezielt
```

## 3. Lighthouse CI (T-LH)

```js
// tests/lighthouserc.cjs
module.exports = {
  ci: {
    collect: {
      staticDistDir: './dist',
      url: ['/', '/wohnung-verkaufen/', '/wohnung-bewerten/', '/direktankauf/', '/kontakt/', '/ueber-mich/',
            '/wohnung-verkaufen/leonberg/', '/ratgeber/', '/ratgeber/vermietete-wohnung-verkaufen/'],   // nur veröffentlichte; Liste je Welle pflegen
      numberOfRuns: 3,
      settings: { preset: undefined, formFactor: 'mobile', throttlingMethod: 'simulate' },
    },
    assert: {
      assertions: {
        'categories:performance':    ['error', { minScore: 0.90, aggregationMethod: 'median-run' }],
        'categories:accessibility':  ['error', { minScore: 0.95 }],
        'categories:seo':            ['error', { minScore: 1 }],
        'categories:best-practices': ['error', { minScore: 0.95 }],
        'largest-contentful-paint':  ['error', { maxNumericValue: 2500, aggregationMethod: 'median-run' }],
        'first-contentful-paint':    ['warn',  { maxNumericValue: 1800 }],
        'cumulative-layout-shift':   ['error', { maxNumericValue: 0.05 }],
        'total-blocking-time':       ['error', { maxNumericValue: 100 }],
        'resource-summary:script:size':      ['error', { maxNumericValue: 16000 }],
        'resource-summary:font:count':       ['error', { maxNumericValue: 2 }],
        'resource-summary:third-party:count':['error', { maxNumericValue: 0 }],
        'resource-summary:total:size':       ['error', { maxNumericValue: 600000 }],
      },
    },
    upload: { target: 'filesystem', outputDir: './.lighthouseci' },
  },
};
```

Danke-, 404- und Fehlerseiten sind ausgenommen (noindex senkt den SEO-Score absichtlich). Desktop-Lauf zusätzlich mit `--collect.settings.preset=desktop` (Ziel Performance ≥ 95, nur Warnung). Bei schwankenden CI-Werten: Median aus 3 Läufen gilt; die deterministische Größenprüfung macht T-BUDGET.

```bash
npm run test:lh
npx lhci autorun --config=tests/lighthouserc.cjs --collect.settings.preset=desktop   # Desktop
```

Nach dem Livegang einmal gegen die echte Domain (TTFB aus Deutschland): `npx lhci collect --url=https://roessler-immo.de/ --numberOfRuns=3 && npx lhci assert --config=tests/lighthouserc.cjs`.

## 4. Budget (T-BUDGET)

`node scripts/check-budget.mjs` liest jede HTML-Datei in `dist`, sammelt referenzierte CSS/JS/Fonts/Preload-Bilder, misst gzip-Größen und vergleicht mit 01-technik.md 11. Ausgabe als Tabelle, Exit-Code 1 bei Überschreitung. Zusätzlich:

```bash
find dist/_astro -name '*.avif' -size +160k -print | grep . && exit 1 || true    # kein AVIF über 160 kB
```

## 5. HTML-Validierung (T-HTML)

```json
// tests/.htmlvalidate.json
{
  "extends": ["html-validate:recommended"],
  "rules": {
    "no-inline-style": "error",
    "require-sri": "off",
    "no-trailing-whitespace": "off",
    "long-title": ["warn", { "maxlength": 70 }],
    "prefer-native-element": "error",
    "no-redundant-for": "off",
    "tel-non-breaking": "error",
    "valid-id": ["error", { "relaxed": true }]
  }
}
```

```bash
npx html-validate --config tests/.htmlvalidate.json "dist/**/*.html"
```

`valid-id relaxed`, weil Überschriften-IDs Umlaute enthalten (github-slugger). `tel-non-breaking` deckt die Telefonnummern ab (Befund 01-analyse.md 8.4).

## 6. Links (T-LINK)

```toml
# tests/lychee.toml
include_fragments = true
max_concurrency = 4
accept = ["200..=299", "403", "429"]       # Portale (ImmoScout24, McMakler) sperren Bots, 403 ist kein Beweis für tot
exclude = ["^tel:", "^mailto:", "^https://wa\\.me/"]
timeout = 20
user_agent = "Mozilla/5.0 (Linkpruefung roessler-immo.de)"
```

```bash
# im Build (schnell, nur intern inkl. Anker):
lychee --config tests/lychee.toml --offline --root-dir "$PWD/dist" "dist/**/*.html"
# wöchentlich (extern, Quellenlinks):
lychee --config tests/lychee.toml --root-dir "$PWD/dist" --format markdown --output lychee.md "dist/**/*.html"
```

Ein toter Quellenlink ist ein Inhaltsfehler: Quelle ersetzen oder mit Abrufdatum und Archiv-Link (web.archive.org) belegen, dann `stand` des Texts anpassen.

## 7. Strukturierte Daten (T-SCHEMA)

```bash
node scripts/check-schema.mjs          # Regeln aus 03-strukturierte-daten.md Abschnitt 5
# Stichprobe Syntax ohne Skript:
for f in dist/index.html dist/wohnung-bewerten/index.html; do
  sed -n 's#.*<script type="application/ld+json">\(.*\)</script>.*#\1#p' "$f" | jq -e '."@graph" | length > 2' >/dev/null || echo "FEHLER $f"
done
```

Manuell je Welle: https://search.google.com/test/rich-results und https://validator.schema.org/ für `/`, eine Ortsseite, einen Ratgeber, `/wohnung-bewerten/`; Ergebnis ohne Fehler, Warnungen dokumentieren.

## 8. Header und Server (T-HEAD), nach jedem Deploy

`scripts/header-check.sh`:

```bash
#!/usr/bin/env bash
set -u; D=https://roessler-immo.de; F=0
pruef() { if eval "$2"; then echo "ok   $1"; else echo "FEHL $1"; F=1; fi; }
H=$(curl -sSI "$D/")
pruef "HTTP 200 Start"         '[[ $(curl -s -o /dev/null -w "%{http_code}" $D/) == 200 ]]'
pruef "http -> https 301"      '[[ $(curl -s -o /dev/null -w "%{http_code} %{redirect_url}" http://roessler-immo.de/x/) == "301 https://roessler-immo.de/x/" ]]'
pruef "www -> Apex 301"        '[[ $(curl -s -o /dev/null -w "%{http_code} %{redirect_url}" https://www.roessler-immo.de/x/?a=1) == "301 https://roessler-immo.de/x/?a=1" ]]'
pruef "/index.html -> /"       '[[ $(curl -s -o /dev/null -w "%{http_code}" $D/index.html) == 301 ]]'
pruef "ohne Slash -> mit"      '[[ $(curl -sI $D/kontakt | grep -i ^location) == *"/kontakt/"* ]]'
for h in strict-transport-security x-content-type-options referrer-policy permissions-policy content-security-policy cross-origin-opener-policy; do
  pruef "Header $h"            "grep -qi '^$h:' <<<\"\$H\""
done
pruef "CSP ohne unsafe-inline" "! grep -i '^content-security-policy' <<<\"\$H\" | grep -q unsafe-inline"
pruef "CSP frame-ancestors"    "grep -i '^content-security-policy' <<<\"\$H\" | grep -q \"frame-ancestors 'none'\""
pruef "kein Server-Version"    "! grep -qiE '^server: nginx/[0-9]' <<<\"\$H\""
pruef "HTML max-age=600"       "grep -qi '^cache-control: public, max-age=600' <<<\"\$H\""
A=$(grep -o '/_astro/[^"]*\.css' <(curl -s $D/) | head -1)
pruef "Asset immutable"        "curl -sI $D$A | grep -qi 'cache-control:.*immutable'"
pruef "Header auch auf Asset"  "curl -sI $D$A | grep -qi '^content-security-policy'"
pruef "gzip"                   "curl -sI -H 'Accept-Encoding: gzip' $D/ | grep -qi '^content-encoding: gzip'"
pruef "404 echt, deutsch"      '[[ $(curl -s -o /tmp/404.html -w "%{http_code}" $D/gibt-es-nicht/) == 404 ]] && grep -q "lang=\"de\"" /tmp/404.html'
pruef "GET kontakt.php 303"    '[[ $(curl -s -o /dev/null -w "%{http_code}" $D/kontakt.php) == 303 ]]'
pruef "andere PHP 404"         '[[ $(curl -s -o /dev/null -w "%{http_code}" $D/phpinfo.php) == 404 ]]'
pruef ".git gesperrt"          '[[ $(curl -s -o /dev/null -w "%{http_code}" $D/.git/HEAD) =~ ^40[34]$ ]]'
pruef "Formulardaten nicht erreichbar" '[[ $(curl -s -o /dev/null -w "%{http_code}" $D/formular-daten/) == 404 && $(curl -s -o /dev/null -w "%{http_code}" $D/../formular/config.php) =~ ^40 ]]'
pruef "sitemap"                '[[ $(curl -s -o /dev/null -w "%{http_code}" $D/sitemap-index.xml) == 200 ]]'
pruef "robots mit Sitemap"     'curl -s $D/robots.txt | grep -q "^Sitemap: https://roessler-immo.de/sitemap-index.xml"'
pruef "Danke noindex"          'curl -s $D/kontakt/danke/ | grep -q "noindex"'
pruef "security.txt"           '[[ $(curl -s -o /dev/null -w "%{http_code}" $D/.well-known/security.txt) == 200 ]]'
pruef "TLS 1.1 abgelehnt"      '! curl -s --tls-max 1.1 -o /dev/null $D/ 2>/dev/null'
exit $F
```

```bash
bash scripts/header-check.sh
```

Rate-Limit live (einmal nach Session 2, nicht im CI, danach Rate-Limit-Dateien auf dem Server löschen):

```bash
for i in 1 2 3 4; do curl -s -o /dev/null -w "%{http_code}\n" -X POST -d 'formular=kontakt&name=Test&telefon=0123456&website=x' https://roessler-immo.de/kontakt.php; done
# erwartet: 303 303 303 429  (Honeypot gesetzt, damit keine Mail entsteht)
```

## 9. Mail (T-MAIL), manuell nach Session 2

1. Bewertungsformular live mit eigener Gmail- und GMX-Adresse ausfüllen.
2. In Gmail „Original anzeigen“: `SPF: PASS`, `DKIM: PASS` mit `d=roessler-immo.de`, `DMARC: PASS`. Bestätigung im Posteingang, nicht im Spam.
3. Benachrichtigung bei Linus: `Reply-To` = Testadresse, Antworten landet bei der Testadresse.
4. mail-tester.com: Formular mit der dort angezeigten Adresse absenden, Ergebnis ≥ 9/10.
5. `dig +short TXT _dmarc.roessler-immo.de` liefert den DMARC-Eintrag.

## 10. Reihenfolge im CI

```
npm run build            → T-BUILD, T-MARK (Teil), CSP-Hashes
npm run test:statisch    → T-HTML, T-SCHEMA, T-BUDGET, T-LINK (offline)
grep-Checks aus 1        → T-MARK, T-ERL
npm run test:e2e         → T-VIEW, T-NAV, T-FORM, T-SPAM, T-A11Y, T-3P
npm run test:lh          → T-LH
(deploy)
bash scripts/header-check.sh → T-HEAD
```
