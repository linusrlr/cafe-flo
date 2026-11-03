# 01 Technik: Bau-Spezifikation roessler-immo.de

Stand: 1. November 2026. Grundlage: `analyse-aktuelle-webseite/01-analyse.md` (Abschnitte 1, 3, 7, 8), `03-massnahmen.md` (M1 bis M20), `04-seitenplan.md`, Frontmatter und Struktur der Dateien in `texte/`. Diese Datei beschreibt, **wie** gebaut wird. Was auf den Seiten steht, steht in `texte/`; veränderliche Fakten stehen in `bauplan/fakten.yaml`.

Verbindliche Begriffe: **Text** = Markdown-Datei in `texte/`. **Seite** = gerenderte URL. **Marker** = `[LINUS: …]` oder `[ZU PRÜFEN: …]`. **Platzhalter** = `{{fakten.…}}`. **Produktion** = Build für roessler-immo.de. **Vorschau** = Build mit allen Entwürfen, nicht indexierbar.

---

## 1. Stack-Entscheidung

### 1.1 Ist-Zustand (aus 01-analyse.md)

| Punkt | Heute |
|---|---|
| Seite | eine HTML-Datei (45,6 kB, 709 Zeilen), sieben `<section hidden>`, Umschaltung per JS und `history.replaceState('#name')` |
| Server | nginx bei netcup, TLS 1.3, HTTP/2, HTTP→HTTPS 301 vorhanden, `www` ohne Umleitung |
| Backend | `kontakt.php` (POST, JSON-Antwort, GET → 303 auf `/`), Honeypot + JS-Marker |
| Extern | Google Fonts (Instrument Sans, Libre Franklin) |
| Tracking | keines, keine Cookies |
| Bilder | 5 JPEG, 1,59 MB, ohne `srcset`, `lazy`, `width`/`height` |
| Lighthouse mobil | Performance 67, A11y 100, Best Practices 100, SEO 100; LCP 5,7 s |

### 1.2 Entscheidung: Astro, statischer Build

**Astro 5 (aktuelle Minor beim Projektstart, exakt in `package-lock.json` gepinnt), `output: 'static'`, Node 22 LTS.**

Begründung:

1. Die Seite besteht aus 30 reinen Inhaltsseiten und drei Formularen. Es gibt keinen Zustand, kein Login, keine Personalisierung. Statisches HTML ist das schnellste und sicherste Ergebnis und läuft auf dem vorhandenen nginx ohne Node-Prozess.
2. **Content Collections mit Zod-Schema**: Die 22 Texte bleiben Markdown mit Frontmatter. Fehlende oder falsche Felder brechen den Build mit Dateiname und Feld ab. Das ist der Kern des Qualitätsversprechens (keine Seite ohne Quelle, Stand, Status).
3. **Remark/Rehype-Plugins** für die Besonderheiten der Texte: Fußnoten `[n]`, Marker, Platzhalter, Button-Syntax, FAQ-Erkennung. In Astro ist das Standard-Konfiguration, kein Eigenbau eines Generators.
4. **`astro:assets`** liefert AVIF/WebP, `srcset`, `width`/`height` aus einer Quelldatei (M3) ohne Zusatzwerkzeug.
5. **Null JavaScript per Default.** Skripte entstehen nur dort, wo sie gebraucht werden (Menü, Formularschritte, Anrufleiste) und werden als Dateien gebündelt. Das macht eine strikte CSP ohne `unsafe-inline` möglich (Abschnitt 15).
6. Komponenten in `.astro` sind HTML mit Props. Eine spätere Session ohne React-Kenntnisse kann sie lesen und ändern.

**Alternative Eleventy 3** (gleichwertig, falls Astro aus einem Grund ausscheidet): Markdown mit Frontmatter nativ, Nunjucks/WebC-Komponenten, Bilder über `@11ty/eleventy-img`. Nachteile gegenüber Astro: kein eingebautes Schema für Frontmatter (Validierung per eigenem Skript mit Zod), Skript-Bündelung muss selbst eingerichtet werden. Alles in dieser Spezifikation außer Abschnitt 3.3 (Astro-Code) gilt unverändert.

**Next.js nur, wenn zwingend**, also nur dann, wenn eine Anforderung serverseitige Laufzeit braucht, die PHP nicht abdeckt (zum Beispiel ein eingeloggter Bereich mit Exposé-Freigaben). Das ist im ersten Jahr nicht geplant. Für den reinen Inhaltsbetrieb wäre Next.js (`output: 'export'`) ein Mehr an Abhängigkeiten, React-Runtime im Client und eine aufwendigere CSP ohne Gewinn. Das alte Café-Flo-Next.js-Setup des Repos wird nicht weiterverwendet; `vercel.json` bleibt mit deaktivierten Deployments stehen.

### 1.3 Hosting und Deploy

- Hosting bleibt **netcup, nginx**, Rechenzentrum in Deutschland. Kein CDN, kein Drittanbieter.
- **Vor Session 1 klären** (per SSH: `nginx -v`, `ls /etc/nginx`, `php -v`, Plesk vorhanden?): Ist es ein **VPS/Root-Server** (volle nginx-Konfiguration) oder **netcup Webhosting mit Plesk** (SPF-Eintrag `include:_spf.webhosting.systems` deutet darauf hin)? Abschnitt 15 liefert die Konfiguration als vollständige `server`-Blöcke für den VPS und sagt, wo dieselben Zeilen in Plesk hingehören.
- **Deploy per GitHub Action mit rsync über SSH** (Abschnitt 16). Manueller Fallback: `npm run deploy` mit demselben rsync-Befehl vom Laptop.
- PHP 8.2 oder neuer für `kontakt.php`/`bewertung.php` (Spezifikation in `02-formular-backend.md`).

---

## 2. Ordnerstruktur

```
cafe-flo/                       Repo (Standardbranch: master)
├── texte/                      INHALT, Single Source. Nur *.md direkt im Ordner werden gebaut.
│   └── _langfassung/           wird ignoriert (Unterstrich-Ordner)
├── bauplan/
│   ├── fakten.yaml             FAKTEN, Single Source (Abschnitt 5)
│   └── 01…04-*.md, README.md
├── alt/                        Live-Code von heute (index.html, kontakt.php, bilder/), nur Archiv, wird nicht gebaut
└── site/                       Astro-Projekt
    ├── astro.config.mjs
    ├── package.json  package-lock.json  .nvmrc (22)
    ├── src/
    │   ├── content.config.ts   Collection "seiten" (liest ../texte)
    │   ├── data/formulare.json Felddefinitionen, gemeinsam für Astro UND PHP (02-formular-backend.md)
    │   ├── lib/
    │   │   ├── fakten.ts       lädt ../bauplan/fakten.yaml, Auflösung, Formatierung
    │   │   ├── seo.ts          Title, Canonical, OG
    │   │   ├── schema-org.ts   JSON-LD-Bausteine (03-strukturierte-daten.md)
    │   │   ├── remark/         kommentare.mjs, fakten.mjs, marker.mjs, konventionen.mjs,
    │   │   │                   fussnoten.mjs, faq.mjs, interne-links.mjs, heading-id.mjs, lesezeit.mjs
    │   │   └── rehype/         tabellen.mjs, externe-links.mjs
    │   ├── layouts/            Basis.astro, Inhalt.astro
    │   ├── components/         siehe Abschnitt 6
    │   ├── pages/
    │   │   ├── [...pfad].astro alle Seiten aus der Collection
    │   │   ├── 404.astro       rendert texte/404.md nach dist/404.html
    │   │   └── formular-fehler.astro  Vorlage für PHP ohne JS (noindex)
    │   ├── scripts/            menue.ts, anrufleiste.ts, formular.ts, ereignisse.ts
    │   ├── styles/             tokens.css, basis.css, komponenten.css, druck.css
    │   └── assets/bilder/      Original-Bilder (JPEG/PNG, mind. 1600 px breit)
    ├── public/                 unverändert ausgeliefert
    │   ├── kontakt.php  bewertung.php        dünne Endpunkte, Logik in ../php/lib
    │   ├── favicon.ico  favicon.svg  apple-touch-icon.png  site.webmanifest
    │   ├── og/                 OG-Bilder 1200×630 (JPEG)
    │   ├── downloads/          Muster-Verkaufsplan.pdf, checkliste-unterlagen.pdf
    │   ├── robots.txt
    │   └── .well-known/security.txt
    ├── php/
    │   ├── lib/                bootstrap.php, formulare.php, validierung.php, mail.php, ratelimit.php, speicher.php
    │   ├── vorlagen/           bestaetigung-*.txt, benachrichtigung.txt
    │   └── composer.json       phpmailer/phpmailer ^6.9
    ├── deploy/
    │   ├── nginx/roessler-immo.conf      server-Blöcke (Abschnitt 15)
    │   ├── nginx/sicherheit.conf         Header-Snippet
    │   ├── csp-hashes.txt                erlaubte Inline-Skript-Hashes
    │   └── rsync-ausschluss.txt
    ├── scripts/                check-inhalte.mjs, check-fakten.mjs, fakten-verwendung.mjs,
    │                           migriere-frontmatter.mjs, csp-hashes.mjs, check-budget.mjs,
    │                           check-schema.mjs, precompress.mjs, header-check.sh
    └── tests/                  playwright.config.ts, e2e/*.spec.ts, lighthouserc.cjs,
                                .htmlvalidate.json, lychee.toml   (04-tests.md)
```

Grundsatz: **Texte und Fakten werden nie in `site/` kopiert.** Die Collection liest `../texte`, die Fakten-Bibliothek liest `../bauplan/fakten.yaml`. Damit gibt es genau eine Stelle pro Inhalt.

---

## 3. Content-Modell

### 3.1 Collection

```ts
// site/src/content.config.ts
import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';
import { loeseText } from './lib/fakten';

const ORTE = ['leonberg', 'pforzheim', 'heimsheim', 'ditzingen', 'renningen'] as const;
const TYPEN = ['start', 'leistung', 'ort', 'ratgeber', 'bewertung', 'ankauf',
               'person', 'kontakt', 'hub', 'recht', 'danke', 'fehler'] as const;

const seiten = defineCollection({
  // nur Dateien direkt in texte/, keine Unterordner (_langfassung bleibt draußen)
  loader: glob({ pattern: '*.md', base: '../texte' }),
  schema: ({ image }) => z.object({
    url: z.string().regex(/^\/([a-z0-9-]+\/)*$/, 'url mit / beginnen und enden, nur a-z0-9-'),
    typ: z.enum(TYPEN),
    id: z.string().regex(/^(S|O|R|P)-\d{2}$/).optional(),          // aus 04-seitenplan
    title: z.string().min(20).max(75).transform(loeseText),
    description: z.string().min(70).max(200).transform(loeseText),
    kurztitel: z.string().max(40),                                   // Navigation, Breadcrumb, Teaser
    status: z.enum(['entwurf', 'prüfung', 'veröffentlicht']),
    stand: z.coerce.date(),                                          // Datum der letzten Faktenprüfung
    veroeffentlicht_am: z.coerce.date().optional(),
    aktualisiert_am: z.coerce.date().optional(),
    ort: z.enum(ORTE).optional(),
    rubrik: z.enum(['verkaufen', 'lebenssituationen', 'recht-steuern', 'entscheiden']).optional(),
    reihenfolge: z.number().int().optional(),
    hero: z.object({
      bild: image(),                                                 // Pfad relativ zur .md-Datei
      bild_mobil: image().optional(),                                // 16:10-Ausschnitt
      alt: z.string().min(10),
      unterschrift: z.string().optional(),
    }).optional(),
    og_bild: z.string().optional(),                                  // /og/leonberg.jpg
    noindex: z.boolean().default(false),
    inhaltsverzeichnis: z.boolean().optional(),                      // Default je typ, Abschnitt 3.2
    autorbox: z.boolean().optional(),
    schema: z.array(z.enum(['Article', 'FAQPage', 'Service', 'WebPageCity'])).optional(),
  }).superRefine((d, ctx) => {
    if (d.typ === 'ort' && !d.ort) ctx.addIssue({ code: 'custom', path: ['ort'], message: 'Ortsseite ohne ort' });
    if (d.typ === 'ratgeber' && !d.rubrik) ctx.addIssue({ code: 'custom', path: ['rubrik'], message: 'Ratgeber ohne rubrik' });
    if (d.status === 'veröffentlicht' && ['ratgeber', 'ort', 'bewertung'].includes(d.typ) && !d.veroeffentlicht_am)
      ctx.addIssue({ code: 'custom', path: ['veroeffentlicht_am'], message: 'veröffentlicht ohne Datum' });
  }).transform((d) => ({ ...d, noindex: d.noindex || d.typ === 'danke' || d.typ === 'fehler' })),
});

export const collections = { seiten };
```

Hinweis: Bild-Pfade im Frontmatter sind relativ zur Markdown-Datei, also `../site/src/assets/bilder/leonberg-marktplatz.jpg`. Falls Vite beim Dev-Server den Zugriff außerhalb von `site/` verweigert: `vite.server.fs.allow: ['..']`.

### 3.2 Frontmatter-Felder

| Feld | Pflicht | Typ | Regel / Default | Beispiel |
|---|---|---|---|---|
| `url` | ja | String | beginnt und endet mit `/`; eindeutig über alle Texte (Build-Check) | `/wohnung-verkaufen/leonberg/` |
| `typ` | ja | Enum | bestimmt Template, Schema, Defaults | `ort` |
| `id` | nein | `S-01` … `R-12` | Nummer aus `04-seitenplan.md` | `O-01` |
| `title` | ja | String | 20 bis 75 Zeichen; Warnung über 60; Platzhalter erlaubt; wird **nicht** ergänzt (Marke steht schon drin) | `Wohnung verkaufen in Leonberg \| Rössler Immobilien` |
| `description` | ja | String | Warnung außerhalb 140 bis 160 Zeichen | |
| `kurztitel` | ja | String | max. 40 Zeichen | `Leonberg` |
| `status` | ja | Enum | `entwurf` → `prüfung` (Linus liest) → `veröffentlicht` | |
| `stand` | ja | Datum | Tag der letzten Faktenprüfung; Anzeige „Stand: Oktober 2026 · zuletzt geprüft am 29.10.2026“ | `2026-10-29` |
| `veroeffentlicht_am` | bei Ratgeber/Ort/Bewertung, sobald veröffentlicht | Datum | `datePublished` | |
| `aktualisiert_am` | nein | Datum | `dateModified`, Sitemap `lastmod`; Default `stand` | |
| `ort` | bei `typ: ort` | Enum | Schlüssel in `fakten.yaml` | `leonberg` |
| `rubrik` | bei `typ: ratgeber` | Enum | Hub-Gruppierung (04-seitenplan Abschnitt 4) | `lebenssituationen` |
| `reihenfolge` | nein | Zahl | Sortierung im Hub | `20` |
| `hero.bild`, `hero.alt` | bei start, leistung, ort, ankauf, person | Bild, String | LCP-Bild; `alt` beschreibt Ort und Motiv | |
| `hero.bild_mobil` | nein | Bild | 16:10-Ausschnitt für < 840 px | |
| `og_bild` | nein | Pfad | Default `/og/standard.jpg`, Ortsseiten `/og/<ort>.jpg` | |
| `noindex` | nein | Bool | `true` bei danke/fehler erzwungen | |
| `inhaltsverzeichnis` | nein | Bool | Default `true` bei ratgeber, ort, leistung, ankauf, bewertung | |
| `autorbox` | nein | Bool | Default `true` bei allen Inhaltsseiten außer start, kontakt, recht, danke | |
| `schema` | nein | Liste | überschreibt die Typ-Defaults aus `03-strukturierte-daten.md` | `[Article, FAQPage, Service]` |

**Migration der bestehenden Frontmatter** (Session 1, Skript `scripts/migriere-frontmatter.mjs`, erst nachdem die parallele Kürzung in `texte/` abgeschlossen ist):

| Heute | Neu |
|---|---|
| `status: Entwurf` / `status: Entwurf, nicht veröffentlicht` | `status: entwurf` |
| `stand: Oktober 2026` | `stand: 2026-10-29` (Datum „zuletzt geprüft“ aus der Quellenliste; fehlt es, 2026-10-29) |
| fehlt | `typ`, `kurztitel`, `id`, `ort`/`rubrik` aus der Routing-Tabelle (Abschnitt 7) |
| Zeile `*Stand: Oktober 2026 · Lesezeit … · Von Linus Rössler, … (Erlaubnis … beantragt)*` direkt unter der H1 | wird gelöscht; die Komponente `SeitenMeta` erzeugt sie aus `stand`, Lesezeit und `fakten.erlaubnis` |
| Abschnitt „Formular … (Spezifikation)“ in `wohnung-bewerten.md`, „Ankauf prüfen lassen: das Kurzformular“ in `direktankauf.md`, Feldliste in `kontakt.md` | ersetzt durch `::formular{typ="bewertung"}` bzw. `ankauf`, `kontakt`; die Feldtabellen wandern nach `site/src/data/formulare.json` |
| „Text für die Danke-Seite“ in `wohnung-bewerten.md` und `kontakt.md` | eigene Texte `danke-bewertung.md`, `danke-kontakt.md`, `danke-ankauf.md` (`typ: danke`) |
| Preistabellen in `wohnung-bewerten.md` und Ortsseiten | `::preistabelle{orte="alle"}` bzw. `::preistabelle{ort="leonberg"}` |
| Erlaubnis-Hinweis literal (Baustein A in start, wohnung-verkaufen, kontakt; B in ueber-mich, seit 01.11.2026 eingesetzt) und Investor-Satz plus Kommentar mit Baustein C in direktankauf | `::erlaubnis{baustein="a"}` bzw. `b`, `c`; Impressum erhält `d` |
| manuelle Abschnitte `## Inhalt` mit Sprunglinks | gelöscht, `inhaltsverzeichnis: true` erzeugt sie aus den H2 |
| literale Faktenwerte (2,98 %, fünf Jahre, 4,20 % …) | Platzhalter; Skript schlägt Ersetzungen anhand der `muster` aus `fakten.yaml` vor (`--vorschlag`), Mensch bestätigt jede Stelle |

Fehlende Texte, die in Session 1 neu angelegt werden: `impressum.md`, `datenschutz.md`, `widerruf.md` (Wortlaut aus `alt/index.html`, angepasst nach M6/M7), `ratgeber.md` (Hub-Intro), `404.md`, `danke-*.md`.

### 3.3 Markdown-Konventionen der Texte und ihr Rendering

| Im Text | Bedeutung | Rendering (Plugin) |
|---|---|---|
| `# …` | H1, genau eine je Text | `<h1>`; Build-Fehler bei 0 oder mehr als 1 (`check-inhalte`) |
| `<!-- … -->` | interne Umsetzungsnotiz | **entfernt**, erscheint nie im HTML (`remark/kommentare`). Test in 04-tests.md |
| `[3]`, `[2][4]` | Fußnote auf Quelle n | `<sup class="fn"><a href="#quelle-3" id="fn-3-1" aria-label="Quelle 3">3</a></sup>`; mehrere als `2, 4` in einem `<sup>` (`remark/fussnoten`) |
| `## Quellen` oder `## Quellen und Stand` + nummerierte Liste | Quellenliste | Komponente `SourceList`; `<li id="quelle-n">`, URLs als Links, Rücksprung zur ersten Fundstelle. Fußnote ohne Listeneintrag = Build-Fehler, Listeneintrag ohne Fußnote = Warnung |
| `**[Button: Text → /pfad]**` | Call-to-Action | Absatz nur aus Buttons → `<p class="cta-reihe">`, erster `.btn-primaer`, weitere `.btn-sekundaer`; `tel:` erhält Telefon-Icon (`remark/konventionen`) |
| `[Text → /pfad]`, `[Weiterlesen → /pfad]` | Link | `<a href="/pfad">Text</a>` mit `<span aria-hidden="true">→</span>` |
| `[Download: Text → /x.pdf]` | Download | `<a href download>Text (PDF, 240 kB)</a>`; Größe aus `public/` zur Build-Zeit |
| `**[Button: … → POST]**` | Platzhalter im Formulartext | ignoriert (Formular-Komponente rendert Button) |
| `## Überschrift {#anker}` | feste Anker-ID | `id="anker"` (`remark/heading-id`) |
| `<a id="x"></a>` | Anker | erlaubt; einziges zulässiges Roh-HTML neben Kommentaren (`check-inhalte` meldet anderes Roh-HTML) |
| `## Häufige Fragen…` (H2 oder H3) mit Fragen als `### Frage?` **oder** als Absatz `**Frage?**` | FAQ | Komponente `Faq` (`remark/faq` erkennt beide Formen, heute gemischt) |
| `[LINUS: …]`, `[ZU PRÜFEN: …]` | offener Punkt | Vorschau: `<mark class="marker">`; Produktion auf veröffentlichter Seite: Build-Abbruch (Abschnitt 4) |
| `{{fakten.pfad}}` | Faktenwert | Abschnitt 5 |
| `::formular{typ="bewertung"}` | Formular | Komponente `Formular` |
| `::preistabelle{ort="leonberg"}` | Preistabelle | Komponente `PriceTable` |
| `::cta{variante="mitte"}` | CTA-Block | Komponente `CtaBlock` |
| `::erlaubnis{baustein="a"}` | Erlaubnis-Hinweis A bis E | Komponente `ErlaubnisHinweis` (Abschnitt 6) |
| `:::kacheln` … `:::` um eine Liste | Kachelraster (Orte, Lebenssituationen, Zusagen) | `<ul class="kacheln">` |
| Markdown-Tabelle | Tabelle | `<div class="tabelle" role="region" tabindex="0" aria-label="{vorherige Überschrift}">`, `th scope="col"`; leere Kopfzelle erhält `<span class="sr-only">Merkmal</span>` (`rehype/tabellen`, behebt axe `empty-table-header` und `scrollable-region-focusable`) |
| externe URL | Link | `rel="noopener"`, kein `target="_blank"`, kein `nofollow` (Quellen sind Belege); nackte URLs in Quellenlisten werden verlinkt (`rehype/externe-links`) |

`astro.config.mjs`, Ausschnitt:

```js
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import remarkDirective from 'remark-directive';
import kommentare from './src/lib/remark/kommentare.mjs';
import fakten from './src/lib/remark/fakten.mjs';
import marker from './src/lib/remark/marker.mjs';
import konventionen from './src/lib/remark/konventionen.mjs';
import headingId from './src/lib/remark/heading-id.mjs';
import fussnoten from './src/lib/remark/fussnoten.mjs';
import faq from './src/lib/remark/faq.mjs';
import interneLinks from './src/lib/remark/interne-links.mjs';
import lesezeit from './src/lib/remark/lesezeit.mjs';
import tabellen from './src/lib/rehype/tabellen.mjs';
import externeLinks from './src/lib/rehype/externe-links.mjs';
import { noindexUrls } from './src/lib/seo.ts';

const MODUS = process.env.SITE_MODE ?? 'produktion';   // 'produktion' | 'vorschau'

export default defineConfig({
  site: 'https://roessler-immo.de',
  trailingSlash: 'always',
  build: { format: 'directory', inlineStylesheets: 'never' },
  vite: { build: { assetsInlineLimit: 0 }, server: { fs: { allow: ['..'] } } },
  markdown: {
    smartypants: false,              // Texte haben schon „deutsche“ Anführungszeichen
    remarkPlugins: [kommentare, [fakten, { MODUS }], [marker, { MODUS }], remarkDirective,
                    konventionen, headingId, fussnoten, faq, [interneLinks, { MODUS }], lesezeit],
    rehypePlugins: [tabellen, externeLinks],
  },
  integrations: [sitemap({ filter: (u) => !noindexUrls().has(new URL(u).pathname) })],
});
```

Reihenfolge der Plugins ist verbindlich: Kommentare zuerst entfernen (sonst würden Marker in Kommentaren gezählt), dann Platzhalter auflösen (ein Faktenwert kann selbst `zu_pruefen` sein), dann Marker prüfen.

Die Plugins legen Ergebnisse in `file.data.astro.frontmatter` ab (`faq`, `quellen`, `marker`, `lesezeit`, `fakten_genutzt`). Die Seite liest sie über `remarkPluginFrontmatter` aus `render(entry)` und baut daraus FAQ, Quellenliste und JSON-LD. **FAQPage-Schema und sichtbare FAQ kommen damit aus derselben Datenstruktur** und können nicht auseinanderlaufen.

---

## 4. Marker beim Build: `[LINUS: …]` und `[ZU PRÜFEN: …]`

Regel: **Eine Seite mit `status: veröffentlicht` darf keinen Marker enthalten. Der Produktions-Build bricht sonst ab.**

Erkennung (nach Entfernen der HTML-Kommentare, im Body und in `title`/`description`):

```js
const MARKER = /\[(LINUS|ZU PRÜFEN)(:[^\]]*)?\]/g;
```

Zusätzlich gilt als Marker: ein Platzhalter, dessen Faktenwert `status: zu_pruefen` oder `status: offen` hat oder `wert: null` ist (Abschnitt 5.4).

Verhalten:

| Modus | Status der Seite | Marker vorhanden | Ergebnis |
|---|---|---|---|
| Produktion | `veröffentlicht` | ja | **Build-Fehler**, Ausgabe: Datei, Zeile, Markertext, alle Fundstellen gesammelt |
| Produktion | `entwurf`/`prüfung` | egal | Seite wird **nicht gebaut**; Links auf sie werden zu reinem Text (Abschnitt 7.3) |
| Vorschau | alle | ja | Seite wird gebaut, Marker als `<mark class="marker" data-art="linus">` gelb hervorgehoben, Zähler im Vorschau-Banner |

Umsetzung an zwei Stellen, damit nichts durchrutscht:

1. `scripts/check-inhalte.mjs` läuft als `prebuild`, liest alle Texte, sammelt **alle** Fehler (Marker, H1-Anzahl, doppelte URLs, unbekannte Platzhalter, Fußnoten ohne Quelle, verbotenes Roh-HTML) und beendet sich mit Code 1 und einer Tabelle. So sieht man alle Probleme auf einmal.
2. `remark/marker.mjs` wirft im Produktionsmodus zusätzlich einen Fehler, falls eine Seite trotzdem in den Build gelangt.
3. Nach dem Build prüft `grep` die Ausgabe (04-tests.md, Test T-MARK): `grep -rlE '\[(LINUS|ZU PRÜFEN)' dist --include='*.html'` muss leer sein.

Folge für die Planung: Welle-1-Seiten gehen erst live, wenn Linus ihre Marker aufgelöst hat (heute z. B. `start.md` 4 × LINUS, 3 × ZU PRÜFEN). Bis dahin läuft die Vorschau.

---

## 5. Fakten zentral: `bauplan/fakten.yaml` und Platzhalter

### 5.1 Platzhalter-Syntax

```
{{fakten.<pfad>}}                       → Feld "wert" des Blatts
{{fakten.<pfad>.<feld>}}                → beliebiges Feld des Blatts (langform, spanne, rechtsgrundlage …)
{{fakten.<pfad>.<datumsfeld>}}          → Datum als 31.12.2026
{{fakten.<pfad>.<datumsfeld>|lang}}     → 31. Dezember 2026
{{fakten.<pfad>.stand|monat}}           → Oktober 2026
\{{ … }}                                → wird wörtlich ausgegeben
```

Beispiele aus den Texten nach Migration:

```markdown
In Leonberg beträgt die Sperrfrist 2026 {{fakten.sperrfrist.leonberg}} statt der gesetzlichen
{{fakten.sperrfrist.gesetzlich}}; die Verordnung gilt bis zum {{fakten.sperrfrist.verordnung.gueltig_bis|lang}} [10].

Provision {{fakten.provision.satz}} inkl. USt je Seite; bei 290.000 € sind das {{fakten.provision.beispiel_290000}}.

| immoportal (Stichtag {{fakten.angebotspreise_etw.leonberg.immoportal.stand}}) | {{fakten.angebotspreise_etw.leonberg.immoportal}} |
```

Ein **Blatt** ist jedes Objekt mit dem Schlüssel `wert`. Ein Pfad, der nicht auf ein Blatt oder ein Feld eines Blatts zeigt, ist ein Build-Fehler mit Dateiname und Zeile.

Platzhalter funktionieren in Fließtext, Tabellenzellen, Linktexten, Überschriften sowie in `title` und `description` (dort über `loeseText` im Schema). Texte bleiben `.md`, **nicht** `.mdx`: In MDX wären `{…}` JavaScript-Ausdrücke.

Komponenten (Header, Footer, CtaBlock, JSON-LD, PHP-Mails) lesen dieselbe Datei direkt über `src/lib/fakten.ts` bzw. eine beim Build erzeugte `php/lib/fakten.json` (nur `firma` und `erlaubnis`).

Faktenwerte dürfen selbst Platzhalter enthalten (die Bausteine B, D, E verweisen auf `erlaubnis.behoerde`, `erteilt_am`). `loese` löst rekursiv auf, maximal 3 Ebenen, Zyklus = Build-Fehler. Ist ein referenzierter Wert `null`/`offen` (z. B. `beantragt_am`), gilt der Baustein als ungeprüft (Abschnitt 5.4) und blockiert die Veröffentlichung der Seite, die ihn nutzt.

### 5.2 Auflösung

```ts
// site/src/lib/fakten.ts (Kern)
import { readFileSync } from 'node:fs';
import { parse } from 'yaml';
const F = parse(readFileSync(new URL('../../../bauplan/fakten.yaml', import.meta.url), 'utf8'));
const RE = /(?<!\\)\{\{\s*fakten\.([a-z0-9_.]+)(?:\|(lang|monat))?\s*\}\}/g;

export function loese(pfad: string, filter?: string) {
  const teile = pfad.split('.'); let knoten: any = F; let blatt: any = null; const rest: string[] = [];
  for (const t of teile) {
    if (blatt) { rest.push(t); continue; }
    knoten = knoten?.[t];
    if (knoten === undefined) throw new Error(`Unbekannter Fakt: fakten.${pfad}`);
    if (knoten && typeof knoten === 'object' && 'wert' in knoten) blatt = knoten;
  }
  if (!blatt) throw new Error(`fakten.${pfad} ist kein Blatt (Objekt mit "wert")`);
  const v = rest.length ? blatt[rest[0]] : blatt.wert;
  if (v === null || v === undefined) throw new Error(`fakten.${pfad} ist leer (status: ${blatt.status})`);
  return { text: formatiere(v, filter), blatt };
}
export const loeseText = (s: string) => s.replace(RE, (_, p, f) => loese(p, f).text);
// formatiere: Date → 31.12.2026 | "31. Dezember 2026" (lang) | "Oktober 2026" (monat), Locale de-DE, TZ Europe/Berlin
```

`remark/fakten.mjs` wendet `loese` auf alle Text- und `inlineCode`-freien Knoten an und merkt sich je Seite die genutzten Pfade samt Blatt in `fakten_genutzt` (für 5.4 und für die Fußzeile „Stand der Marktdaten“).

### 5.3 Abgeleitete Werte

`provision.beispiel_290000.zahl` muss `290000 × provision.satz.zahl` ergeben (gerundet auf ganze Euro). `check-fakten` rechnet nach und bricht bei Abweichung ab. Damit kann der Provisionssatz an einer Stelle geändert werden, ohne dass ein falsches Rechenbeispiel stehen bleibt. Weitere Rechenbeispiele in Texten (8.716,50 € bei 292.500 €, Direktankauf-Tabelle) werden bei der Migration entweder als eigenes Blatt mit `rechnung` angelegt oder als Rechnung im Text belassen und in `check-fakten` als Regel hinterlegt.

### 5.4 Frische- und Gültigkeits-Check

`scripts/check-fakten.mjs` läuft im `prebuild` und wöchentlich per GitHub Action (Abschnitt 16). Heute = Datum in `Europe/Berlin`.

| Prüfung | Bedingung | Ergebnis |
|---|---|---|
| Veraltet | `stand + (pruefintervall_monate ?? 6 Monate) < heute` | **Warnung** mit Pfad, Stand, verwendeten Seiten |
| Läuft bald ab | `gueltig_bis − 45 Tage ≤ heute ≤ gueltig_bis` | Warnung „läuft am … ab“ |
| Abgelaufen | `gueltig_bis < heute` | **Fehler**, wenn auf einer veröffentlichten Seite genutzt; sonst Warnung |
| Stichtag erreicht | `stichtag ≤ heute` (z. B. GModG 1.1.2027, Hebesatz Leonberg 2027) | Warnung „Text auf Rechtslage ab … umstellen“; ab `stichtag + 14 Tage` Fehler auf veröffentlichten Seiten |
| Ungeprüft | `status` ist `zu_pruefen` oder `offen`, oder `wert: null` | Fehler auf veröffentlichten Seiten (wie Marker) |
| Rechnung | `rechnung` vorhanden und `zahl` passt nicht | Fehler |
| Literal statt Platzhalter | `muster` eines Blatts trifft im Text außerhalb eines Platzhalters | Warnung (nach Migration), damit keine Werte neben der Datei gepflegt werden |

Warnungen erscheinen in der Build-Ausgabe und als Annotation in der GitHub Action (`::warning file=…::`). Der wöchentliche Lauf öffnet bei Warnungen ein GitHub-Issue „Fakten prüfen: KW nn“ mit der Liste.

Beispiele mit Stand heute (1.11.2026): `sperrfrist.*` und `mietpreisbremse.*` (gültig bis 31.12.2026) warnen ab 16.11.2026; `bauzins.topzins_10j` (Intervall 1 Monat, Stand 29.10.2026) warnt ab 30.11.2026; `angebotspreise_etw.*.immoverkauf24` (Q2 2026, Intervall 3 Monate) warnt bereits jetzt.

### 5.5 `verwendet_in` aktuell halten

`npm run fakten:verwendung` (`scripts/fakten-verwendung.mjs`) ermittelt je Blatt die Texte, die den Platzhalter **oder** ein Literal nach `muster` enthalten, und schreibt die Liste in `fakten.yaml` zurück (Kommentare bleiben erhalten: Bibliothek `yaml`, `parseDocument`). Die heutigen Listen sind am 1.11.2026 per grep über `texte/*.md` und `texte/_langfassung/*.md` erhoben; nach Abschluss der parallelen Kürzung neu erzeugen.

---

## 6. Komponenten

Alle in `site/src/components/`. Props in Klammern. Keine Komponente lädt externe Ressourcen.

| Komponente | Zweck und Verhalten | Barrierefreiheit / SEO |
|---|---|---|
| `Basis.astro` (Layout) (`seite`, `extra`) | `<html lang="de">`, Head (Abschnitt 13), `SkipLink`, `Header`, `<main id="inhalt" tabindex="-1">`, `Footer`, `Anrufleiste`, JSON-LD. Im Vorschaumodus `VorschauBanner` und `noindex`. | genau ein `<main>`, Landmarks benannt |
| `SkipLink` | „Zum Inhalt springen“ → `#inhalt`, erstes fokussierbares Element, sichtbar bei Fokus | M16 |
| `Header` (`aktiv`) | Wortmarke (Link `/`), `<nav aria-label="Hauptnavigation">` mit 6 Links aus 04-seitenplan (Wohnung verkaufen · Wohnung bewerten · Direktankauf · Ratgeber · Über mich · Kontakt), Telefonnummer ab 840 px. Unter 840 px: Telefon-Icon-Link (`aria-label="Anrufen: 0159 05844641"`) dauerhaft sichtbar neben Menü-Button. Menü ohne JS: Liste unter der Kopfzeile sichtbar (`.no-js`); mit JS `<button type="button" aria-expanded aria-controls="hauptmenue">`, Escape schließt, Fokus zurück auf Button. Nur veröffentlichte Ziele. | `aria-current="page"` auf aktivem Link und auf dem Elternpunkt bei Unterseiten (`aria-current="true"`) |
| `Anrufleiste` (MobileCallBar) | fixiert unten, nur < 840 px, zwei Buttons: „Anrufen“ (`tel:` aus Fakten) und „Wohnung einschätzen lassen“ (`/wohnung-bewerten/`). Erscheint nach 300 px Scroll (IntersectionObserver auf Sentinel), ausgeblendet auf `/wohnung-bewerten/`, Danke-Seiten und solange ein Formularfeld Fokus hat. Ohne JS nicht sichtbar (Kopfzeile hat das Telefon-Icon). `body` erhält `padding-bottom` in Leistenhöhe, damit nichts verdeckt wird. Höhe 56 px, Ziele ≥ 48 × 48 px. | `<aside aria-label="Schnellkontakt">`; Klick auf `tel:` sendet Ereignis (Abschnitt 14) |
| `Hero` (`h1`, `bild`, `bild_mobil`, `alt`, `buttons`) | H1, Unterzeile, Orte-Zeile, Buttons, optional `ErlaubnisHinweis`. Mobil Text vor Bild, Bild 16:10, max. 220 px hoch; Desktop zweispaltig. Bild über `HeroBild` mit `fetchpriority="high"`, `loading="eager"`. Ziel: H1 und primärer Button im ersten Bildschirm bei 360 × 640 und 390 × 664. | Bild hat Alt-Text mit Ort; H1 kommt aus dem Text (erste `#`-Zeile), nicht doppelt |
| `CtaBlock` (`variante`: `mitte`/`ende`/`ort`, `ort?`) | Überschrift, Satz mit `fakten.firma.antwortzeit`, Button „Wohnung kostenlos einschätzen lassen“ → `/wohnung-bewerten/`, Button „Anrufen“, Link „Nachricht schreiben“ → `/kontakt/#formular`. `ort`-Variante nennt den Ort. Automatisch: `mitte` nach dem dritten H2 bei Ratgebern (04-seitenplan 5.1 Punkt 5), `ende` vor FAQ, sofern der Text keinen eigenen Button-Absatz an dieser Stelle hat. | Buttons sind `<a>`, keine `<button>` |
| `Faq` (`fragen[]`, `ueberschrift`, `id`) | `<section aria-labelledby>` mit H2 aus dem Text; je Frage `<details name="faq-{id}"><summary>Frage</summary><div>Antwort</div></details>`. Liefert Daten für FAQPage (03-strukturierte-daten.md). | nativ tastaturbedienbar; `summary` ohne Überschrift darin |
| `PriceTable` (`ort?` oder `orte="alle"`, `quellen?`) | Tabelle aus `fakten.angebotspreise_etw`: Zeilen Orte, Spalten Quellen mit Stand im Spaltenkopf (`stand_text` oder Datum), Zellen `wert` plus `spanne`/`veraenderung` klein. `<caption>` „Angebotspreise Eigentumswohnungen, keine Kaufpreise“. Fußzeile mit Quellenlinks. Fehlwert (`null`) → „keine Angabe“. | `th scope="col"`/`scope="row"`, Scroll-Container mit `tabindex="0"`, `role="region"`, `aria-label` |
| `SeitenMeta` (`stand`, `lesezeit`) | Zeile unter der H1: „Stand: Oktober 2026 · zuletzt geprüft am 29.10.2026 · Lesezeit 13 Minuten · Von [Linus Rössler](/ueber-mich/), {fakten.erlaubnis.text_autorzeile}“ | `<time datetime>` |
| `AuthorBox` | Foto 96 × 96 (WebP/AVIF), Name, Rolle aus `erlaubnis.text_autorzeile` (schaltet bei `erlaubnis.status: erteilt` automatisch um), Spezialisierung, zwei Sätze Arbeitsweise, Link „Mehr über mich“. Platz: vor der Quellenliste. | Bild `alt="Linus Rössler"`; Person-`@id` im JSON-LD |
| `SourceList` (`quellen[]`) | H2 „Quellen“ (bzw. „Quellen und Stand“ wie im Text), `<ol>` mit `<li id="quelle-n">`, URLs als Links mit Domain als sichtbarem Anfang, Rücksprung „zurück zum Text“ (`href="#fn-n-1"`, `aria-label="Zurück zur Fundstelle von Quelle n"`). Daten aus `remark/fussnoten`. | Fußnoten-Links `aria-label="Quelle n"`; Liste bleibt im HTML vollständig (kein Aufklappen) |
| Fußnoten-Rendering (`remark/fussnoten`) | Regex `/\[(\d{1,2})\](?!\()/` auf Textknoten, aufeinanderfolgende `[2][4]` zusammengefasst; nicht in Code, nicht in Links. `id="fn-{n}-{k}"` (k = Vorkommen). | hochgestellt per `<sup>`, Schrift 0,75 em, Trefferfläche über `padding` vergrößert |
| `Breadcrumbs` (`pfad`) | aus URL-Segmenten: `/ratgeber/x/` → Start › Ratgeber › kurztitel; `/wohnung-verkaufen/leonberg/` → Start › Wohnung verkaufen › Leonberg. Nicht auf Start. | `<nav aria-label="Brotkrumen"><ol>`, letztes Element `aria-current="page"` ohne Link; BreadcrumbList aus denselben Daten |
| `Inhaltsverzeichnis` (`headings`) | alle H2 außer Quellen/FAQ-Unterpunkten; mobil eingeklappt als `<details>` „Inhalt“ | `<nav aria-label="Inhalt">` |
| `ErlaubnisHinweis` (`baustein`: `a`/`b`/`c`/`d`/`e`) | **Zentraler Baustein, einzige Quelle für Erlaubnis-Aussagen.** Text aus `fakten.erlaubnis.baustein_<x>` (Wortlaut aus `analyse-aktuelle-webseite/07-recht-erlaubnis.md` Abschnitt 9). Umschaltlogik nach Baustein F: Ist `fakten.erlaubnis.status` = `beantragt`, rendert er `wert`; bei `erteilt` rendert er `wert_erteilt`, und A entfällt ersatzlos, D wird durch E ersetzt, B wird zur Vertrauenszeile, C zum Live-Wortlaut. Einsatz: A auf start, wohnung-verkaufen, kontakt (je genau einmal); B auf ueber-mich (nach Erteilung zusätzlich im Footer); C auf direktankauf im Abschnitt „In welcher Rolle ich stehe“; D/E auf impressum. In Texten über die Direktive `::erlaubnis{baustein="a"}`. `check-inhalte` meldet einen Fehler, wenn ein Text den Erlaubnis-Wortlaut literal enthält (Muster `Erlaubnis[^.]{0,60}(beantragt|noch nicht erteilt)` außerhalb der Autorzeile) oder Formulierungen aus der Vermeiden-Liste von 07-recht-erlaubnis.md Abschnitt 9 („Beratungsgespräch“, „Verkaufsplan sofort“, „Investor vorstellen“, „jetzt beauftragen“), solange `status: beantragt`. | `<p class="hinweis-erlaubnis">`, kein `role="alert"` |
| `Formular` (`typ`: `kontakt`/`bewertung`/`ankauf`) | Felder aus `src/data/formulare.json`. **Ohne JS:** alle Schritte als `<fieldset>` untereinander mit `<legend>` „Schritt 1 von 4: Wo liegt die Wohnung?“, ein Absende-Button, normaler POST an `/bewertung.php` bzw. `/kontakt.php`. **Mit JS** (`scripts/formular.ts`): ein Fieldset sichtbar, „Weiter“/„Zurück“ (`type="button"`), `<progress max="4">` plus Text „Schritt 2 von 4“ in `aria-live="polite"`, Fokus auf die Legend des neuen Schritts, Prüfung je Schritt per Constraint Validation API, `history.pushState({schritt:n}, '', '?schritt=n#formular')` und `popstate`, damit der Browser-Zurück-Button einen Schritt zurückgeht. Absenden per `fetch` mit `Accept: application/json`, Erfolg → `location.assign(antwort.weiter)`, Fehler → Feldfehler, Fehlerzusammenfassung oben mit Links, Sprung zum ersten fehlerhaften Schritt; Netzwerkfehler → wörtlicher Fehlertext aus `wohnung-bewerten.md`. Keine Zwischenspeicherung (Microcopy: „gespeichert wird erst beim Absenden“). Honeypot und Zeitfeld nach 02-formular-backend.md. | jedes Feld mit `<label for>`; Pflicht mit `required` und sichtbarem „(Pflicht)“; Fehler `aria-invalid="true"` + `aria-describedby`; `autocomplete` (`name`, `email`, `tel`, `street-address`); Zahlenfelder `inputmode="numeric"`; `type="button"` an allen Nicht-Submit-Buttons |
| `Footer` | NAP-Block (`fakten.firma`: Name, Telefon, E-Mail, Anschrift erst nach M6, Erreichbarkeit), „Einsatzgebiet“ mit fünf Ortslinks (nur veröffentlichte), Ratgeber-Rubriken, `<nav aria-label="Rechtliches">` (Impressum, Datenschutz, Widerruf), „Stand der Marktdaten: {jüngstes stand aus angebotspreise_etw}“ | Telefon mit `&nbsp;` (`0159&nbsp;05844641`) |
| `RatgeberListe` | Hub `/ratgeber/`: vier Rubriken, Karten aus der Collection (`kurztitel`, `description`, `stand`) | Liste, Überschriften H2 je Rubrik |
| `HeroBild`, `Bild` | Wrapper um `getImage`/`<Picture>` (Abschnitt 9) | `alt` Pflicht |
| `JsonLd` (`graph`) | ein `<script type="application/ld+json">` je Seite mit `@graph` | |
| `VorschauBanner` | nur Vorschau: „Vorschau, nicht veröffentlicht. Offene Marker: n“ | |

---

## 7. Routing

### 7.1 Routing-Tabelle

Alle Seiten entstehen aus `src/pages/[...pfad].astro` (Pfad = Frontmatter `url`), außer 404 und Formular-Fehlervorlage. „Schema“ verweist auf `03-strukturierte-daten.md`; RealEstateAgent, WebSite und BreadcrumbList (außer Start) stehen auf jeder Seite und sind hier nicht wiederholt.

| URL | Text | Nr. | typ | Zusätzliches Schema | Index | Welle |
|---|---|---|---|---|---|---|
| `/` | `start.md` | S-01 | start | FAQPage | ja | 1 |
| `/wohnung-verkaufen/` | `wohnung-verkaufen.md` | S-02 | leistung | FAQPage; Service (Vermittlung) erst nach Erteilung der Erlaubnis | ja | 1 |
| `/wohnung-bewerten/` | `wohnung-bewerten.md` | S-03 / R-08 | bewertung | Service (Ersteinschätzung), Article (Teil B), FAQPage (beide Blöcke) | ja | 1 |
| `/wohnung-bewerten/danke/` | `danke-bewertung.md` | | danke | keins | noindex | 1 |
| `/direktankauf/` | `direktankauf.md` | S-04 | ankauf | Service (Direktankauf), FAQPage | ja | 1 |
| `/direktankauf/danke/` | `danke-ankauf.md` | | danke | keins | noindex | 1 |
| `/ueber-mich/` | `ueber-mich.md` | S-05 | person | ProfilePage + Person | ja | 1 |
| `/kontakt/` | `kontakt.md` | S-06 | kontakt | ContactPage | ja | 1 |
| `/kontakt/danke/` | `danke-kontakt.md` | | danke | keins | noindex | 1 |
| `/impressum/` | `impressum.md` (neu) | | recht | WebPage | ja | 1 |
| `/datenschutz/` | `datenschutz.md` (neu) | | recht | WebPage | ja | 1 |
| `/widerruf/` | `widerruf.md` (neu) | | recht | WebPage | ja | 1 |
| `/wohnung-verkaufen/leonberg/` | `ort-leonberg.md` | O-01 | ort | WebPage+about City, FAQPage | ja | 2 |
| `/wohnung-verkaufen/pforzheim/` | `ort-pforzheim.md` | O-02 | ort | WebPage+about City, FAQPage | ja | 2 |
| `/wohnung-verkaufen/heimsheim/` | `ort-heimsheim.md` | O-03 | ort | WebPage+about City, FAQPage | ja | 2 |
| `/wohnung-verkaufen/ditzingen/` | `ort-ditzingen.md` | O-04 | ort | WebPage+about City, FAQPage | ja | 3 |
| `/wohnung-verkaufen/renningen/` | `ort-renningen.md` | O-05 | ort | WebPage+about City, FAQPage | ja | 3 |
| `/ratgeber/` | `ratgeber.md` (neu) | | hub | CollectionPage | ja | 2 |
| `/ratgeber/eigentumswohnung-verkaufen/` | `ratgeber-eigentumswohnung-verkaufen.md` | R-01 | ratgeber (verkaufen) | Article, FAQPage | ja | 2 |
| `/ratgeber/vermietete-wohnung-verkaufen/` | `ratgeber-vermietete-wohnung-verkaufen.md` | R-02 | ratgeber (lebenssituationen) | Article, FAQPage | ja | 2 |
| `/ratgeber/geerbte-wohnung-verkaufen/` | `ratgeber-geerbte-wohnung-verkaufen.md` | R-03 | ratgeber (lebenssituationen) | Article, FAQPage | ja | 2 |
| `/ratgeber/wohnung-scheidung/` | `ratgeber-wohnung-scheidung.md` | R-04 | ratgeber (lebenssituationen) | Article, FAQPage | ja | 3 |
| `/ratgeber/spekulationssteuer/` | `ratgeber-spekulationssteuer.md` | R-05 | ratgeber (recht-steuern) | Article, FAQPage | ja | 3 |
| `/ratgeber/maklerprovision/` | `ratgeber-maklerprovision.md` | R-06 | ratgeber (verkaufen) | Article, FAQPage | ja | 2 |
| `/ratgeber/energieausweis/` | `ratgeber-energieausweis.md` | R-07 | ratgeber (recht-steuern) | Article, FAQPage | ja | 3 |
| `/ratgeber/verkaufen-oder-vermieten/` | `ratgeber-verkaufen-oder-vermieten.md` | R-09 | ratgeber (entscheiden) | Article, FAQPage | ja | 3 |
| `/ratgeber/verkauf-im-alter/` | `ratgeber-verkauf-im-alter.md` | R-10 | ratgeber (lebenssituationen) | Article, FAQPage | ja | 4 |
| `/ratgeber/ohne-makler-verkaufen/` | `ratgeber-ohne-makler.md` | R-11 | ratgeber (verkaufen) | Article, FAQPage | ja | 4 |
| `/ratgeber/sofortankauf-vs-makler/` | `ratgeber-sofortankauf-vs-makler.md` | R-12 | ratgeber (verkaufen) | Article, FAQPage | ja | 3 |
| `/404.html` | `404.md` (neu) | | fehler | keins | noindex | 1 |
| `/formular-fehler/` | `src/pages/formular-fehler.astro` | | fehler | keins | noindex | 2 |
| `/kontakt.php` | `public/kontakt.php` | | PHP | | | 2 |
| `/bewertung.php` | `public/bewertung.php` | | PHP | | | 2 |
| `/sitemap-index.xml`, `/sitemap-0.xml` | `@astrojs/sitemap` | | | | | 1 |
| `/robots.txt` | `public/robots.txt` | | | | | 1 |

Hinweis zu R-08: Der Bewertungsratgeber ist in `/wohnung-bewerten/` integriert und hat keinen eigenen Ratgeber-Slug (04-seitenplan). Der Hub `/ratgeber/` listet ihn trotzdem in der Rubrik „Verkaufen“ mit Ziel `/wohnung-bewerten/#verfahren` oder dem Anker des Teil-B-H2.

Die Ratgeber-Rubrik „Entscheiden“ enthält zusätzlich die Direktankauf-Entscheidungshilfe (`/direktankauf/#welcher-weg-passt-zu-ihnen`).

### 7.2 Kein Client-Routing

Navigation sind ausschließlich `<a href>`. Kein `ClientRouter`/View Transitions, kein `history.replaceState` für Inhalte. Browser-Zurück funktioniert damit nativ (Test in 04-tests.md). Einzige `pushState`-Nutzung: Schritte im Bewertungsformular (Abschnitt 6).

### 7.3 Interne Links auf nicht veröffentlichte Seiten

`remark/interne-links.mjs` prüft jeden internen Link gegen die Menge der URLs (Collection plus statische Ziele wie `/downloads/…`):

- Ziel existiert nicht als Text: **Build-Fehler** (Tippfehler im Slug).
- Ziel existiert, ist in Produktion aber nicht veröffentlicht: Link wird durch seinen Text ersetzt, Warnung im Build. Das setzt die Regel aus `start.md` um („Links auf die Ortsseiten erst aktivieren, wenn diese live sind“).
- Anker (`#…`) prüft `lychee` nach dem Build (04-tests.md).

---

## 8. Weiterleitungen

| Von | Nach | Wo | Code |
|---|---|---|---|
| `http://roessler-immo.de/*`, `http://www.…/*` | `https://roessler-immo.de/*` | nginx | 301 |
| `https://www.roessler-immo.de/*` | `https://roessler-immo.de/*` | nginx, eigener `server`-Block | 301 |
| `/index.html` | `/` | nginx `location = /index.html` | 301 |
| `/wohnung-verkaufen` (ohne Schrägstrich) | `/wohnung-verkaufen/` | nginx automatisch (Verzeichnis), `absolute_redirect off` | 301 |
| `/#verkaufen`, `#ankauf`, `#person`, `#kontakt`, `#impressum`, `#datenschutz`, `#start` | `/wohnung-verkaufen/`, `/direktankauf/`, `/ueber-mich/`, `/kontakt/`, `/impressum/`, `/datenschutz/`, `/` | Inline-Skript nur auf `/` | `location.replace` |
| `/kontakt.php` GET | Referer-Seite oder `/kontakt/` | PHP | 303 |
| alte `/bilder/*.jpg` | bleiben 404 | | keine externen Verweise bekannt |

Hash-Weiterleitung (Hashes erreichen den Server nicht, daher clientseitig). Steht als erstes Element im `<head>` von `/`, `is:inline`, damit Astro es nicht bündelt:

```html
<script is:inline>(function(){var m={verkaufen:"/wohnung-verkaufen/",ankauf:"/direktankauf/",person:"/ueber-mich/",kontakt:"/kontakt/",impressum:"/impressum/",datenschutz:"/datenschutz/"};var z=m[location.hash.slice(1)];if(z)location.replace(z);})();</script>
```

Die Startseite darf deshalb kein Element mit diesen sechs IDs haben (`check-inhalte` prüft). Der SHA-256 dieses exakten Skripttexts steht in `deploy/csp-hashes.txt` und in der CSP (Abschnitt 15). Jede Änderung am Skript ändert den Hash; `scripts/csp-hashes.mjs --pruefen` bricht den Build dann ab und gibt den neuen Hash aus.

---

## 9. Bild-Pipeline

| Punkt | Festlegung |
|---|---|
| Quelle | `site/src/assets/bilder/<ort>-<motiv>.jpg`, sRGB, mind. 1600 px, max. 4000 px breit; Dateiname mit Ort (M12) |
| Werkzeug | `astro:assets` mit Sharp (Default) |
| Formate | AVIF (Qualität 55) und WebP (Qualität 72) über `<Picture formats={['avif','webp']}>`, JPEG (Qualität 78) als `<img>`-Fallback |
| Breiten | `widths={[480, 800, 1200, 1600]}`; Porträt AuthorBox `[96, 192]` |
| `sizes` | Hero Desktop zweispaltig: `(min-width: 840px) 50vw, 100vw`; Inhaltsbild: `(min-width: 760px) 720px, 100vw`; Ortskachel: `(min-width: 840px) 33vw, 100vw` |
| Maße | `width`/`height` immer gesetzt (automatisch aus der Quelle), CSS `height: auto`; CLS-Ziel 0 |
| Laden | Default `loading="lazy" decoding="async"`; Hero `loading="eager" fetchpriority="high"` |
| Art Direction Hero | `HeroBild.astro` erzeugt mit `getImage` zwei Sätze: mobil 16:10-Ausschnitt (`bild_mobil` oder zentrierter Crop) für `(max-width: 839px)`, Desktop-Original; `<picture>` mit `<source media type>` je Format |
| LCP-Preload | im `<head>` je Seite mit Hero, nur AVIF (Browser ohne AVIF ignorieren den Preload wegen `type`): `<link rel="preload" as="image" type="image/avif" imagesrcset="…" imagesizes="…" media="(max-width: 839px)" fetchpriority="high">` und dasselbe mit `media="(min-width: 840px)"` für den Desktop-Satz. Ohne `media` würden beide Sätze geladen. |
| Gewicht | Hero AVIF bei 800 px ≤ 70 kB, bei 1600 px ≤ 160 kB; Inhaltsbilder ≤ 120 kB (Budget-Check) |
| Alt-Texte | Pflicht im Schema; beschreiben Motiv und Ort („Fachwerkhäuser am Leonberger Marktplatz“); dekorative Bilder `alt=""` nur in Komponenten, nie in Texten |
| OG-Bilder | `public/og/standard.jpg` und `public/og/<ort>.jpg`, 1200 × 630, JPEG ≤ 150 kB, mit Wortmarke und Ortsnennung (M13) |
| Icons | Inline-SVG in Komponenten (`aria-hidden="true"`, `focusable="false"`), kein Icon-Font |
| Favicons | `favicon.ico` (32 px), `favicon.svg`, `apple-touch-icon.png` (180 px), `site.webmanifest` |

---

## 10. Schriften lokal

- Pakete `@fontsource-variable/instrument-sans` und `@fontsource-variable/libre-franklin` (beide als variable Schrift verfügbar), exakt gepinnt. Eingebunden über `import '@fontsource-variable/…/wght.css'` in `styles/basis.css`; Dateien landen gehasht unter `/_astro/`.
- Das `unicode-range` der Pakete sorgt dafür, dass nur die Latin-Datei geladen wird; sie enthält „ “ ‚ ‘ € § und die Umlaute.
- Genutzte Schnitte vor dem Bau aus der CSS der Live-Seite (`alt/index.html`) ablesen; erwartet: Instrument Sans für Überschriften (600), Libre Franklin für Text (400, 600). Variable Fonts decken das mit je einer Datei ab.
- `font-display: swap`. Fallback-Schrift mit angepassten Metriken gegen Layout-Sprung, berechnet mit `fontaine` oder Capsize in Session 1:

```css
@font-face { font-family: "Libre Franklin Fallback"; src: local("Arial");
  size-adjust: 106%; ascent-override: 90%; descent-override: 23%; line-gap-override: 0%; } /* Werte messen */
:root { --schrift-text: "Libre Franklin Variable", "Libre Franklin Fallback", system-ui, sans-serif; }
```

- Preload der zwei Latin-Dateien im `<head>`:

```astro
---
import text from '@fontsource-variable/libre-franklin/files/libre-franklin-latin-wght-normal.woff2?url';
import titel from '@fontsource-variable/instrument-sans/files/instrument-sans-latin-wght-normal.woff2?url';
---
<link rel="preload" href={text} as="font" type="font/woff2" crossorigin>
<link rel="preload" href={titel} as="font" type="font/woff2" crossorigin>
```

- Danach in der Datenschutzerklärung den Abschnitt „Schriftarten/Google Fonts“ streichen (M7). Test: kein Request an fremde Hosts (04-tests.md).

---

## 11. Performance-Budget

Gemessen am Produktions-Build. `scripts/check-budget.mjs` prüft die Größen deterministisch (gzip-Größe der Dateien, die eine Seite referenziert), Lighthouse CI prüft die Zeiten (04-tests.md).

| Größe | Budget je Seite |
|---|---|
| HTML (gzip) | ≤ 30 kB (Ratgeber mit Quellenliste ≤ 40 kB) |
| CSS gesamt (gzip) | ≤ 20 kB |
| JS gesamt (gzip) | ≤ 8 kB; Seiten mit Formular ≤ 15 kB |
| Schriften | 2 Dateien, zusammen ≤ 90 kB |
| Bilder im ersten Bildschirm | ≤ 100 kB mobil, ≤ 200 kB Desktop |
| Gesamtgewicht beim ersten Aufruf | Start ≤ 500 kB (M3), alle anderen ≤ 600 kB |
| Requests beim ersten Aufruf | ≤ 15 |
| Drittanbieter-Requests | 0 |

| Metrik (Lighthouse mobil, simulierte Drosselung) | Ziel |
|---|---|
| LCP | < 2,5 s |
| FCP | < 1,8 s |
| CLS | ≤ 0,05 |
| TBT | ≤ 100 ms |
| Performance-Score | ≥ 90 |

Server: `gzip_static` mit vorkomprimierten `.gz` (und `.br`, falls das nginx-Modul vorhanden ist) aus `scripts/precompress.mjs`; HTTP/2 bleibt aktiv.

---

## 12. Barrierefreiheit (Ziel WCAG 2.2 AA)

Pflichtpunkte, jeder im Test abgedeckt (04-tests.md):

1. `lang="de"`; genau eine H1 je Seite; Überschriften ohne Sprung (H2 → H3).
2. Skip-Link als erstes fokussierbares Element, Ziel `<main id="inhalt" tabindex="-1">`.
3. Landmarks: `header`, `nav aria-label="Hauptnavigation"`, `nav aria-label="Brotkrumen"`, `nav aria-label="Inhalt"`, `main`, `aside aria-label="Schnellkontakt"`, `footer` mit `nav aria-label="Rechtliches"` (behebt axe `landmark-unique`).
4. Fokus: `:focus-visible` mit 3 px Umriss in Kontrastfarbe (≥ 3:1 zum Hintergrund), nie `outline: none` ohne Ersatz; Fokus wird von der fixierten Anrufleiste nicht verdeckt (`scroll-padding-bottom: 72px`, WCAG 2.4.11).
5. Menü-Button `aria-expanded`/`aria-controls`, Escape schließt, Fokus kehrt zurück.
6. Formulare: sichtbare Labels, Pflichtangabe im Label, Fehlertext am Feld mit `aria-describedby`, `aria-invalid`, Fehlerzusammenfassung mit Links, Fokus auf Zusammenfassung; Schrittwechsel kündigt „Schritt n von 4“ per `aria-live="polite"` an und setzt den Fokus auf die Legend.
7. Tabellen mit `scope`, keine leeren Kopfzellen, scrollbare Container fokussierbar und benannt.
8. Kontrast Text ≥ 4,5:1 (bestehende Farben `#55627A` auf Weiß 6,2:1, ok), große Schrift und Bedienelemente ≥ 3:1; keine Versal-Labels unter 12 px.
9. Zielgrößen ≥ 24 × 24 px (WCAG 2.5.8), Buttons und Anrufleiste ≥ 44 × 44 px.
10. `prefers-reduced-motion`: keine Animationen außer Opazität.
11. Alle Nicht-Submit-Buttons mit `type="button"`; Telefonnummern mit geschütztem Leerzeichen.
12. Links mit verständlichem Text; „Weiterlesen“-Links erhalten `aria-describedby` auf die Kachelüberschrift.
13. Druck: `druck.css` blendet Navigation, Anrufleiste, Formulare aus und druckt URLs der Quellen (M19). Dark Mode bewusst nicht (`color-scheme: light`).

---

## 13. SEO

| Punkt | Umsetzung |
|---|---|
| `<title>` | `title` aus Frontmatter, unverändert (Platzhalter aufgelöst) |
| Meta-Description | `description` aus Frontmatter |
| Canonical | `<link rel="canonical" href="https://roessler-immo.de{url}">`, immer Apex, immer mit Schrägstrich |
| Robots | `noindex` → `<meta name="robots" content="noindex, follow">`; Vorschau-Build zusätzlich nginx `X-Robots-Tag: noindex` |
| Sitemap | `@astrojs/sitemap`, ohne noindex-Seiten, `lastmod` = `aktualisiert_am` oder `stand`; Index unter `/sitemap-index.xml` |
| robots.txt | `User-agent: *` / `Allow: /` / `Sitemap: https://roessler-immo.de/sitemap-index.xml` |
| Open Graph | `og:type` (`website`, Ratgeber `article`), `og:title` = `title`, `og:description`, `og:url` = Canonical, `og:image` (absolut, 1200 × 630) mit `og:image:width`/`height`/`alt`, `og:locale` = `de_DE`, `og:site_name` = Rössler Immobilien; `twitter:card` = `summary_large_image`; Ratgeber zusätzlich `article:published_time`/`modified_time` |
| JSON-LD | `03-strukturierte-daten.md` |
| Überschriften | eine H1, H2 aus den Texten; FAQ-Fragen in `<summary>` |
| Interne Verlinkung | nur `<a href>`; Ortsseiten ↔ Ratgeber nach 04-seitenplan Abschnitt 4 (Texte enthalten die Links) |
| Search Console | Domain-Property per DNS-TXT (kein Meta-Tag), Sitemap einreichen (M2) |
| 404 | deutsche Seite mit Navigation, Suche nach Thema (Linkliste Ratgeber), Telefon; Status 404 |
| URL-Regeln | Kleinbuchstaben, Bindestrich, Schrägstrich am Ende, keine Jahreszahl (04-seitenplan 5.1) |
| hreflang | entfällt (nur Deutsch) |

---

## 14. Analytics ohne Cookies

1. **Serverlogs als Hauptquelle.** nginx schreibt ein anonymisiertes Log (letztes IPv4-Oktett bzw. IPv6 ab dem dritten Block genullt), Aufbewahrung 14 Tage per logrotate:

```nginx
map $remote_addr $ip_anon {
  ~(?P<a>\d+\.\d+\.\d+)\.\d+        $a.0;
  ~(?P<a>[0-9a-f]+:[0-9a-f]+:[0-9a-f]+):  $a::;
  default                           0.0.0.0;
}
log_format anon '$ip_anon - - [$time_local] "$request" $status $body_bytes_sent "$http_referer" "$http_user_agent"';
access_log /var/log/nginx/roessler-immo.access.log anon;
```

2. **Auswertung mit GoAccess** (`goaccess roessler-immo.access.log --log-format=COMBINED -o report.html`), wöchentlich per Cron in ein Verzeichnis außerhalb des Webroots oder hinter Basic Auth. Kennzahlen (M17): Aufrufe je Seite, Einstiegsseiten, Referrer (Suche), Abschlüsse = Aufrufe von `/wohnung-bewerten/danke/`, `/kontakt/danke/`, `/direktankauf/danke/`.
3. **Ereignisse ohne Cookies:** `scripts/ereignisse.ts` sendet bei Klick auf `tel:`-Links und auf Download-Links `navigator.sendBeacon('/e?t=tel&s=' + encodeURIComponent(location.pathname))`. nginx beantwortet `/e` mit 204 und schreibt es ins selbe anonymisierte Log:

```nginx
location = /e { access_log /var/log/nginx/roessler-immo.events.log anon; return 204; }
```

4. Kein Cookie, kein `localStorage`, keine Fingerprints, keine externen Skripte. Damit bleibt die Seite ohne Einwilligungsbanner (M7).
5. Option für ein Dashboard: Plausible Community Edition selbst gehostet (cookielos) auf eigener Subdomain. Nur nach Entscheidung von Linus; dann Datenschutzerklärung ergänzen und `connect-src`/`script-src` um die Subdomain erweitern.
6. Google Search Console für Suchanfragen und Indexierung.

---

## 15. Sicherheit und Server-Konfiguration

### 15.1 CSP-Strategie: Hash, kein Nonce

- **Grundsatz: kein Inline-JavaScript.** Alle Skripte sind gebündelte Dateien unter `/_astro/` (`script-src 'self'`). `assetsInlineLimit: 0` verhindert, dass Vite kleine Skripte inline setzt.
- **Einzige Ausnahme:** das Hash-Weiterleitungsskript auf `/` (Abschnitt 8). Es wird per `'sha256-…'` erlaubt.
- **Warum Hash statt Nonce:** Die Seiten sind statische Dateien. Ein Nonce müsste je Anfrage neu erzeugt und per `sub_filter` ins HTML geschrieben werden; das verhindert Caching und ist ohne Gewinn. Ein Hash ist pro Build fest.
- **Warum nicht Astros eingebaute CSP** (`experimental.csp`/`csp` je nach Version): Sie setzt die Richtlinie als `<meta>`; `frame-ancestors` und Reporting funktionieren dort nicht. Der Header aus nginx ist vollständig.
- `scripts/csp-hashes.mjs` sucht nach dem Build alle `<script>` ohne `src` und ohne `type="application/ld+json"`, berechnet SHA-256 (Base64) und vergleicht mit `deploy/csp-hashes.txt`. Abweichung oder unbekanntes Inline-Skript bricht den Build ab und nennt den Hash. JSON-LD ist ein Datenblock und fällt nicht unter `script-src`.
- **Kein Inline-CSS:** `inlineStylesheets: 'never'`, keine `style=""`-Attribute (html-validate-Regel `no-inline-style`), daher `style-src 'self'` ohne `unsafe-inline`.

### 15.2 Header-Snippet

`deploy/nginx/sicherheit.conf` (Wichtig: `add_header` in einem `location`-Block hebt alle `add_header` der Ebene darüber auf. Deshalb wird dieses Snippet in **jedem** `location` mit eigenen Headern erneut eingebunden.)

```nginx
add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;  # erst nach Test der www-Umleitung aktivieren; später "; preload" prüfen
add_header X-Content-Type-Options "nosniff" always;
add_header Referrer-Policy "strict-origin-when-cross-origin" always;
add_header Permissions-Policy "camera=(), microphone=(), geolocation=(), payment=(), usb=(), browsing-topics=()" always;
add_header Cross-Origin-Opener-Policy "same-origin" always;
add_header X-Frame-Options "DENY" always;
add_header Content-Security-Policy "default-src 'none'; script-src 'self' 'sha256-HASH_AUS_csp-hashes.txt'; style-src 'self'; img-src 'self' data:; font-src 'self'; connect-src 'self'; form-action 'self'; frame-ancestors 'none'; base-uri 'none'; manifest-src 'self'; object-src 'none'; upgrade-insecure-requests" always;
```

### 15.3 Server-Blöcke (VPS-Variante)

`deploy/nginx/roessler-immo.conf`:

```nginx
limit_req_zone $binary_remote_addr zone=formulare:1m rate=6r/m;
server_tokens off;

server {                                   # HTTP -> HTTPS Apex
  listen 80; listen [::]:80;
  server_name roessler-immo.de www.roessler-immo.de;
  location /.well-known/acme-challenge/ { root /var/www/letsencrypt; }
  location / { return 301 https://roessler-immo.de$request_uri; }
}

server {                                   # www -> Apex
  listen 443 ssl; listen [::]:443 ssl; http2 on;
  server_name www.roessler-immo.de;
  ssl_certificate     /etc/letsencrypt/live/roessler-immo.de/fullchain.pem;   # Zertifikat muss www enthalten
  ssl_certificate_key /etc/letsencrypt/live/roessler-immo.de/privkey.pem;
  return 301 https://roessler-immo.de$request_uri;
}

server {
  listen 443 ssl; listen [::]:443 ssl; http2 on;
  server_name roessler-immo.de;
  ssl_certificate     /etc/letsencrypt/live/roessler-immo.de/fullchain.pem;
  ssl_certificate_key /etc/letsencrypt/live/roessler-immo.de/privkey.pem;
  ssl_protocols TLSv1.2 TLSv1.3;

  root /var/www/roessler-immo/web;
  index index.html;
  charset utf-8;
  absolute_redirect off;
  gzip on; gzip_static on; gzip_vary on;
  gzip_types text/css application/javascript application/json image/svg+xml application/xml text/plain application/manifest+json;
  # brotli_static on;                      # nur wenn libnginx-mod-http-brotli-static installiert ist

  access_log /var/log/nginx/roessler-immo.access.log anon;   # map/log_format aus Abschnitt 14 im http-Kontext
  error_page 404 /404.html;

  include /etc/nginx/snippets/roessler-sicherheit.conf;

  location = /index.html { return 301 /; }

  location / {
    include /etc/nginx/snippets/roessler-sicherheit.conf;
    add_header Cache-Control "public, max-age=600" always;       # HTML
    try_files $uri $uri/ =404;
  }

  location ^~ /_astro/ {                   # gehashte CSS/JS/Bilder/Schriften; ^~ verhindert, dass die Regex unten greift
    include /etc/nginx/snippets/roessler-sicherheit.conf;
    add_header Cache-Control "public, max-age=31536000, immutable" always;
    try_files $uri =404;
  }

  location ^~ /.well-known/ { include /etc/nginx/snippets/roessler-sicherheit.conf; try_files $uri =404; }
  location ~ /\. { deny all; }             # .git, .env usw.; steht vor allen übrigen Regex-Blöcken

  location ~* \.(?:ico|svg|png|jpg|webmanifest|pdf|txt)$ {   # ungehashte Dateien aus public/
    include /etc/nginx/snippets/roessler-sicherheit.conf;
    add_header Cache-Control "public, max-age=86400" always;
    try_files $uri =404;
  }

  location ~ ^/(kontakt|bewertung)\.php$ {
    limit_req zone=formulare burst=5 nodelay;
    limit_req_status 429;
    client_max_body_size 30m;              # Ankauf-Fotos, siehe 02-formular-backend.md
    include /etc/nginx/snippets/roessler-sicherheit.conf;
    add_header Cache-Control "no-store" always;
    include fastcgi_params;
    fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
    fastcgi_pass unix:/run/php/php8.3-fpm.sock;
  }

  location ~ \.php$ { return 404; }        # keine weiteren PHP-Dateien ausführbar
  location = /e { access_log /var/log/nginx/roessler-immo.events.log anon; return 204; }
  location = /404.html { internal; }      # erbt die Header der server-Ebene
}
```

Installation: `deploy/nginx/sicherheit.conf` → `/etc/nginx/snippets/roessler-sicherheit.conf`, `roessler-immo.conf` → `/etc/nginx/sites-available/`, `nginx -t && systemctl reload nginx`. `http2 on;` braucht nginx ≥ 1.25.1; bei älterem nginx stattdessen `listen 443 ssl http2;`. `scripts/precompress.mjs` erzeugt `.gz`/`.br` nur für html, css, js, svg, xml, json, txt, nie für `.php`.

PHP-FPM: `expose_php = Off`, `display_errors = Off`, `log_errors = On`, `open_basedir` = Webroot plus Datenverzeichnis (`02-formular-backend.md`), `upload_max_filesize = 8M`, `post_max_size = 30M`, `max_file_uploads = 5`.

**Plesk-Variante (netcup Webhosting):** `www`-Weiterleitung über „Hosting-Einstellungen → Bevorzugte Domain: roessler-immo.de“ (301). Die Zeilen aus `sicherheit.conf` sowie die `location`-Blöcke für `/_astro/`, PHP-Begrenzung (`limit_req` ohne `limit_req_zone`, das im `http`-Kontext nicht setzbar ist; dann nur PHP-seitiges Rate-Limit), `/e` und Caching in „Apache & nginx → Zusätzliche nginx-Anweisungen“. `map`/`log_format` sind dort nicht möglich; Analytics dann über die Plesk-Logs (Anonymisierung in Plesk aktivieren) oder nur über die Danke-Seiten-Zählung in PHP.

`public/.well-known/security.txt`:

```
Contact: mailto:linus@roessler-immo.de
Expires: 2027-10-31T23:00:00.000Z
Preferred-Languages: de, en
Canonical: https://roessler-immo.de/.well-known/security.txt
```

HSTS-Reihenfolge: zuerst `www`-Umleitung und Zertifikat für beide Namen testen (04-tests.md, Header-Check), dann HSTS mit `max-age=300` einschalten, nach einer Woche ohne Fehler auf `31536000`.

---

## 16. Build und Deploy

### 16.1 npm-Skripte (`site/package.json`)

```json
{
  "scripts": {
    "dev": "astro dev",
    "prebuild": "node scripts/check-inhalte.mjs && node scripts/check-fakten.mjs",
    "build": "astro build && node scripts/csp-hashes.mjs --pruefen && node scripts/precompress.mjs",
    "build:vorschau": "SITE_MODE=vorschau astro build --outDir dist-vorschau",
    "test:statisch": "html-validate \"dist/**/*.html\" && node scripts/check-schema.mjs && node scripts/check-budget.mjs && lychee --config tests/lychee.toml --offline --root-dir \"$PWD/dist\" \"dist/**/*.html\"",
    "test:e2e": "playwright test -c tests/playwright.config.ts",
    "test:lh": "lhci autorun --config=tests/lighthouserc.cjs",
    "fakten:verwendung": "node scripts/fakten-verwendung.mjs --schreiben",
    "migration:frontmatter": "node scripts/migriere-frontmatter.mjs --vorschlag",
    "deploy": "bash scripts/deploy.sh"
  }
}
```

### 16.2 GitHub Action

`.github/workflows/bauen-und-ausliefern.yml`:

```yaml
name: bauen-und-ausliefern
on:
  push: { branches: [master], paths: ['texte/**', 'bauplan/fakten.yaml', 'site/**'] }
  workflow_dispatch:
  schedule: [{ cron: '17 5 * * 1' }]        # montags: Fakten-Frische und externe Links
concurrency: { group: deploy, cancel-in-progress: false }
jobs:
  bauen:
    runs-on: ubuntu-24.04
    defaults: { run: { working-directory: site } }
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version-file: site/.nvmrc, cache: npm, cache-dependency-path: site/package-lock.json }
      - run: npm ci
      - run: npm run build
      - run: npm run test:statisch
      - run: npx playwright install --with-deps chromium && npm run test:e2e
      - run: npm run test:lh
      - uses: actions/upload-artifact@v4
        with: { name: dist, path: site/dist }
  ausliefern:
    needs: bauen
    if: github.event_name != 'schedule'
    runs-on: ubuntu-24.04
    environment: produktion
    steps:
      - uses: actions/download-artifact@v4
        with: { name: dist, path: dist }
      - name: rsync
        env:
          KEY: ${{ secrets.DEPLOY_SSH_KEY }}
          KNOWN: ${{ secrets.DEPLOY_KNOWN_HOSTS }}
          ZIEL: ${{ secrets.DEPLOY_USER }}@${{ secrets.DEPLOY_HOST }}:${{ secrets.DEPLOY_PATH }}
        run: |
          install -d -m 700 ~/.ssh && printf '%s\n' "$KEY" > ~/.ssh/id_ed25519 && chmod 600 ~/.ssh/id_ed25519
          printf '%s\n' "$KNOWN" > ~/.ssh/known_hosts
          # 1. neue gehashte Assets zuerst, ohne zu löschen
          rsync -rlptz --checksum --exclude='*.html' dist/ "$ZIEL/"
          # 2. HTML und Rest, alte Dateien danach entfernen
          rsync -rlptz --checksum --delete-after dist/ "$ZIEL/"
      - name: Rauchtest
        run: |
          curl -fsS -o /dev/null -w '%{http_code}\n' https://roessler-immo.de/
          curl -fsSI https://www.roessler-immo.de/ | grep -qi '^location: https://roessler-immo.de/'
```

Die PHP-Bibliothek (`site/php/lib`, `vendor/` nach `composer install --no-dev`) wird mit einem dritten rsync in ein Verzeichnis **außerhalb** des Webroots ausgeliefert (`$DEPLOY_PATH/../formular/lib`); `config.php` mit Zugangsdaten liegt nur auf dem Server (`02-formular-backend.md`).

Beim `schedule`-Lauf schreibt `check-fakten` Warnungen; ein Schritt `gh issue create` legt bei Warnungen oder externen Linkfehlern (`lychee` ohne `--offline`) ein Issue an (M20).

Vorschau: `build:vorschau` wird auf Wunsch nach `vorschau.roessler-immo.de` (Basic Auth, `X-Robots-Tag: noindex`) ausgeliefert, damit Linus Entwürfe mit hervorgehobenen Markern lesen kann.

---

## 17. Offene Entscheidungen mit technischer Wirkung

| Entscheidung (Linus) | Wirkung | Bis |
|---|---|---|
| Standort/Impressum (M6 Punkt 3) | `fakten.firma.anschrift`, NAP im Footer, `address` im JSON-LD, Datenschutz-Aufsichtsbehörde (BayLDA oder LfDI BW), `fakten.erlaubnis.behoerde` (bei Sitz in BW die IHK, nicht Landratsamt/Stadt; 07-recht-erlaubnis.md Abschnitt 6) | vor Session 1 |
| Anwaltliche Prüfung der Bausteine A bis E (07-recht-erlaubnis.md Abschnitt 11) | `status` der Bausteine bleibt bis dahin fachlich offen; Livegang der Welle 1 erst danach | vor Livegang Welle 1 |
| Erteilung der Erlaubnis | `fakten.erlaubnis.status: erteilt`, `erteilt_am`, `behoerde` setzen, Build, Deploy; keine Textdatei anfassen | sobald Bescheid da |
| WhatsApp ja/nein (M10 Punkt 4) | vierter Kontaktweg, Datenschutzerklärung, kein Skript nötig (`https://wa.me/…`-Link) | vor Session 2 |
| Fotos beim Ankauf-Formular, Anzahl | Upload ja/nein, `client_max_body_size`, Mailgröße | Session 2 |
| Erreichbarkeit | `fakten.firma.erreichbarkeit`, `openingHoursSpecification` | Session 2 |
| Hosting-Typ (VPS oder Plesk) | Abschnitt 15.3, Analytics-Variante | vor Session 1 |
| Plausible ja/nein | Abschnitt 14 Punkt 5 | Session 3 |
