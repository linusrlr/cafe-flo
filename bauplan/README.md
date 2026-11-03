# Bauplan roessler-immo.de

Stand: 3. November 2026. Diese Mappe ist die technische Ebene für den Relaunch. Mit ihr kann eine spätere Session (auch auf einem anderen Rechner, mit dem bisherigen Live-Code) die Seite ohne weitere Konzeptarbeit bauen.

| Datei | Inhalt |
|---|---|
| `01-technik.md` | Stack (Astro statisch), Ordnerstruktur, Content-Modell, Markdown-Konventionen, Marker- und Fakten-Checks, Komponenten, Routing, Weiterleitungen, Bilder, Schriften, Budget, Barrierefreiheit, SEO, Analytics, nginx/CSP, Build und Deploy |
| `02-formular-backend.md` | `kontakt.php`/`bewertung.php`: Felder, Validierung, Spam-Schutz, Rate-Limit, Mail (DMARC), Bestätigungstexte, JSON/ohne JS, Danke-Seiten, Speicherung, Datenschutz |
| `03-strukturierte-daten.md` | JSON-LD-Vorlagen und Zuordnung zu den Seiten |
| `04-tests.md` | Abnahmetests als Checkliste und Befehle |
| `fakten.yaml` | **einzige** Stelle für veränderliche Fakten (Provision, Fristen, Preise, Zinsen, Kontakt, Erlaubnis-Bausteine A bis F) |

Weitere Pflichtlektüre: `analyse-aktuelle-webseite/03-massnahmen.md` (M1 bis M20), `04-seitenplan.md`, `07-recht-erlaubnis.md` (was vor Erteilung der Erlaubnis gesagt werden darf). Inhalte stehen in `texte/` (nur `*.md` direkt im Ordner; `_langfassung/` wird nicht gebaut).

## Grundregeln für jede Bau-Session

1. Texte und Fakten nie nach `site/` kopieren und nie in Komponenten abschreiben. Texte in `texte/`, Fakten in `bauplan/fakten.yaml`.
2. Keine Seite mit `status: veröffentlicht`, die Marker enthält; der Build bricht dann ab (01-technik.md 4). `status: veröffentlicht` setzt nur Linus oder es wird von ihm ausdrücklich bestätigt.
3. **Erlaubnis-Aussagen nur über den zentralen Baustein** `ErlaubnisHinweis` mit den Texten `fakten.erlaubnis.baustein_a` bis `baustein_e` (Wortlaut aus 07-recht-erlaubnis.md Abschnitt 9). Am Tag der Erteilung wird **nur** `fakten.yaml` geändert (`erlaubnis.status: erteilt`, `erteilt_am`, `behoerde`); Baustein F beschreibt die automatische Umschaltung. Keine Textdatei anfassen.
4. Jede Session endet mit grünem `npm run build`, `npm run test:statisch`, `npm run test:e2e` und einem Commit; ausgeliefert wird nur über die GitHub Action.
5. Ohne Cookies, ohne Drittanbieter-Requests. Wer etwas Externes einbinden will, braucht eine Entscheidung von Linus und eine Änderung der Datenschutzerklärung.

## Vor Session 1 (Entscheidungen und Vorbereitung, ohne Code)

| Was | Wer | Ergebnis |
|---|---|---|
| Live-Code (`index.html`, `kontakt.php`, `bilder/`) nach `alt/` ins Repo legen | Session auf dem Laptop mit dem Code | Commit „Live-Stand vom …“ |
| Hosting-Typ feststellen: VPS oder netcup Webhosting mit Plesk (`nginx -v`, `php -v`, SSH-Zugang, Pfade) | Linus / Session | Eintrag in `01-technik.md` 1.3 |
| Standort/Impressum (M6 Punkt 3); bei Sitz in Baden-Württemberg ist die **IHK** zuständig, nicht Landratsamt/Stadt (07-recht-erlaubnis.md 6) | Linus | `fakten.firma.anschrift`, `fakten.erlaubnis.behoerde` |
| Bausteine A bis E anwaltlich prüfen lassen (07-recht-erlaubnis.md 11) | Linus | Bausteine bestätigt oder geändert in `fakten.yaml` |
| WhatsApp ja/nein (M10) | Linus | Notiz |
| Parallele Kürzung der Texte in `texte/` abgeschlossen | Text-Session | `texte/ort-*.md` liegen wieder direkt in `texte/` |

## Bau-Sessions

Angelehnt an `03-massnahmen.md` Abschnitt D. Je Session: Ziel, Maßnahmen, Arbeitspakete, Definition of Done (DoD). DoD-Punkte verweisen auf Test-IDs aus `04-tests.md`.

### Session 1: Gerüst, Migration der bestehenden Seiten, technisches Fundament
**Maßnahmen:** M1, M2, M3, M7, M14, M16.

Arbeitspakete:
1. `site/` mit Astro, Ordnerstruktur, `content.config.ts` (Schema aus 01-technik.md 3.1), `lib/fakten.ts`, alle Remark/Rehype-Plugins, `check-inhalte`, `check-fakten`, `csp-hashes`, `check-budget`, `precompress`.
2. Frontmatter-Migration (`npm run migration:frontmatter`, Vorschläge prüfen) und Umstellung der Erlaubnis-Stellen auf `::erlaubnis{baustein=…}` (A in start, wohnung-verkaufen, kontakt; B in ueber-mich; C in direktankauf ersetzt den Investor-Satz).
3. Layout und Komponenten: Basis, SkipLink, Header, Footer (NAP aus Fakten), Breadcrumbs, SeitenMeta, AuthorBox, SourceList mit Fußnoten, Faq, CtaBlock, ErlaubnisHinweis, Inhaltsverzeichnis, Tabellen-Wrapper. Design der Live-Seite 1:1 (Farben, Abstände) aus `alt/index.html`.
4. Seiten: `/`, `/wohnung-verkaufen/`, `/direktankauf/` (ohne Formular), `/ueber-mich/`, `/kontakt/` (Formular in Session 1 mit den heutigen Feldern an das bestehende `kontakt.php`; neues Formular und Backend in Session 2), `/impressum/` (Baustein D), `/datenschutz/` (ohne Google Fonts), `/widerruf/`, `404`.
5. Bilder über `astro:assets`, Hero-Preload, Schriften lokal.
6. nginx: www → Apex, Header-Snippet, CSP mit Hash, Caching, `server_tokens off`; HSTS zunächst mit `max-age=300`.
7. GitHub Action, Secrets, Vorschau-Build.

**DoD Session 1:**
- [ ] T-BUILD, T-MARK, T-ERL grün; Negativtest Marker schlägt erwartungsgemäß fehl.
- [ ] T-HTML, T-SCHEMA, T-BUDGET, T-LINK (offline), T-3P grün.
- [ ] T-NAV: jede Seite eigene URL, `curl` liefert vollständigen Inhalt ohne JS, Zurück-Taste, alle sechs alten `#hash`-Links leiten um.
- [ ] T-LH mobil auf allen Seiten der Session: Performance ≥ 90, A11y ≥ 95, SEO 100, LCP < 2,5 s; Start < 500 kB.
- [ ] T-A11Y ohne serious/critical; Skip-Link, Landmark-Namen, H1 auf jeder Seite.
- [ ] T-HEAD grün nach Deploy (HSTS kurz).
- [ ] Erlaubnis-Hinweis steht nur über den Baustein, auf start, wohnung-verkaufen, kontakt genau einmal (A), auf ueber-mich (B), im Impressum (D); kein Investor-Satz auf direktankauf.
- [ ] Google Search Console (DNS) eingerichtet, Sitemap eingereicht.
- [ ] Livegang nur, wenn die Seiten der Welle 1 von Linus freigegeben sind (keine Marker); sonst bleibt die alte Seite live und die Vorschau läuft.

### Session 2: Mobil-Hero, Anrufleiste, Formulare mit Backend, Erlaubnis/Standort, Mail-Zustellbarkeit
**Maßnahmen:** M4, M5, M6, M10, M15.

Arbeitspakete:
1. Hero mobil (Text vor Bild), Telefon-Icon, `Anrufleiste`.
2. `src/data/formulare.json`, Komponente `Formular` (progressive enhancement, Schritte, `pushState`), `formular-fehler`-Vorlage.
3. PHP-Kern nach `02-formular-backend.md`, Endpunkte `kontakt.php`, `bewertung.php`, Vorlagen, Rate-Limit, optional CSV, Cron.
4. Seiten `/wohnung-bewerten/` (Teil A und B), drei Danke-Seiten, Kontakt- und Ankauf-Formular.
5. DNS: DKIM aktivieren, DMARC `p=none`; Postfach `anfrage@`; SMTP-Absenderprüfung (02 Abschnitt 6.2).
6. Impressum/Datenschutz nach Standortentscheidung (Anschrift, IHK, Aufsichtsbehörde Datenschutz); Abschnitte zu Formularen.
7. Erreichbarkeit in `fakten.firma.erreichbarkeit`.

**DoD Session 2:**
- [ ] T-VIEW: H1 und primärer CTA im ersten Bildschirm bei 360 × 640 und 390 × 664; kein horizontaler Scroll bei 320 px.
- [ ] T-FORM: alle drei Formulare ohne JS und mit JS, Fehlerseite ohne JS, Zurück-Taste im Bewertungsformular geht einen Schritt zurück.
- [ ] T-SPAM: Honeypot, Zeitprüfung, Rate-Limit lokal und live (303 303 303 429).
- [ ] T-MAIL: SPF/DKIM/DMARC pass, Bestätigung nicht im Spam, mail-tester ≥ 9/10, `From` nie Kundenadresse.
- [ ] Datenschutzerklärung um Formulare, Bestätigungsmail, Logs ergänzt; AV-Vertrag netcup abgelegt.
- [ ] Danke-Seiten `noindex`, nicht in der Sitemap, Zählung im Log sichtbar.
- [ ] Alle Tests aus Session 1 weiter grün.

### Session 3: Vertrauen, Direktankauf-Umbau, Marke, vollständige strukturierte Daten
**Maßnahmen:** M8, M11, M13.

Arbeitspakete:
1. `/ueber-mich/` ausbauen (Fotos, Werdegang, eigene Wohnung), `ProfilePage`.
2. Muster-Verkaufsplan als PDF in `public/downloads/` (Download-Link, Größe automatisch). Vor Erteilung nur als Muster, nicht als Angebot (07-recht-erlaubnis.md 9: „Verkaufsplan erst mit Maklervertrag“).
3. Startseite: Vermittlung als Hauptweg, Direktankauf nachgeordnet; Direktankauf-Seite: „In welcher Rolle ich stehe“ nach oben, Vergleichstabelle zugänglich.
4. Logo (SVG), Favicons, OG-Bilder (`standard.jpg`, je Ort), `logo-512.png`.
5. JSON-LD vollständig nach `03-strukturierte-daten.md`; Google-Unternehmensprofil als `sameAs`, sobald verifiziert.
6. Entscheidung Plausible ja/nein umsetzen; sonst GoAccess-Bericht einrichten (M17).

**DoD Session 3:**
- [ ] T-SCHEMA grün, Rich Results Test und validator.schema.org für `/`, `/ueber-mich/`, `/direktankauf/`, `/wohnung-bewerten/` ohne Fehler; kein Vermittlungs-Service und kein `hasCredential` vor Erteilung.
- [ ] Teilen-Vorschau (WhatsApp/LinkedIn Post Inspector) zeigt Bild und Titel.
- [ ] `/ueber-mich/` ohne Marker veröffentlicht; Baustein B korrekt.
- [ ] Muster-PDF ≤ 500 kB, barrierearm (getaggt), ohne Kontaktdaten-Pflicht.
- [ ] Alle vorherigen Tests grün.

### Sessions 4 bis 6: Ortsseiten und Ratgeber nach Wellen
**Maßnahmen:** M9, M12. Je Session 3 bis 4 Seiten in der Reihenfolge aus `04-seitenplan.md` Abschnitt 3: Welle 2 (Leonberg, Pforzheim, Heimsheim, R-01, R-02, R-03, R-06, `/ratgeber/`), Welle 3 (Ditzingen, Renningen, R-04, R-05, R-07, R-09, R-12), Welle 4 (R-10, R-11).

Arbeitspakete je Seite:
1. Literale Fakten durch Platzhalter ersetzen (`muster` aus `fakten.yaml`), `npm run fakten:verwendung`.
2. Preistabellen durch `::preistabelle` ersetzen; veraltete Werte vorher in `fakten.yaml` aktualisieren (Stand prüfen, `check-fakten` ohne Warnung für die genutzten Pfade).
3. Hero- und Ortsfotos aus dem Fototermin (M12), Alt-Texte mit Ort.
4. Linus löst Marker auf und gibt frei; erst dann `status: veröffentlicht`, `veroeffentlicht_am`.
5. Interne Links: Ortsseiten und Ratgeber verlinken sich gegenseitig (04-seitenplan 4); bisher unverlinkte Erwähnungen werden durch die Veröffentlichung automatisch zu Links (01-technik.md 7.3).

**DoD je Seite:**
- [ ] keine Marker, keine Faktenwerte mit `status: zu_pruefen`/`offen`, keine Warnung „veraltet“ für genutzte Fakten.
- [ ] Quellenliste vollständig, jede Fußnote hat eine Quelle, T-LINK extern für diese Seite ohne tote Links.
- [ ] Ortsseite: mindestens drei geprüfte Marktzahlen, ein lokaler WEG-Absatz, ein lokales FAQ (04-seitenplan 5.2); mindestens eine eigene Beobachtung von Linus.
- [ ] Keine Formulierung aus der Vermeiden-Liste in 07-recht-erlaubnis.md 9 (z. B. „Verkaufsplan sofort“ in den Ortsseiten-Langfassungen streichen oder „nach Erteilung der Erlaubnis“ ergänzen).
- [ ] T-LH, T-A11Y, T-SCHEMA, T-HTML für die neuen URLs grün; Seite in der Sitemap, in Search Console zur Indexierung eingereicht.

### Laufend: Messung, Pflege, Radar
**Maßnahmen:** M17, M20.

- Wöchentlicher CI-Lauf (montags): `check-fakten` und externe Links; Warnungen werden als GitHub-Issue angelegt.
- Monatlich: Lighthouse gegen die Live-Domain, Search Console, Testanfrage über jedes Formular, GoAccess-Bericht.
- Fakten-Termine aus `fakten.yaml`: Zinsen monatlich (Intervall 1), Portalpreise quartalsweise (Intervall 3), **Sperrfrist, Mietpreisbremse, Kappungsgrenze bis 31.12.2026** (Nachfolgeverordnungen ab 1.1.2027 eintragen), **GModG-Stichtag 1.1.2027** (Texte zum Energieausweis ins Präsens), Hebesatz Leonberg ab 2027.
- **Tag der Erlaubniserteilung:** `fakten.erlaubnis.status: erteilt`, `erteilt_am`, `behoerde` (+ `anschrift`) setzen, Build, Deploy. Prüfen: Baustein A verschwunden, Impressum zeigt E, Über mich die Vertrauenszeile, Direktankauf den Investor-Satz, Bylines ohne „beantragt“, JSON-LD mit `hasCredential` und Vermittlungs-Service; HSTS ist dann längst auf ein Jahr.

**DoD laufend:** kein offenes Fakten-Issue älter als zwei Wochen; jede Rechtsänderung aus dem Radar innerhalb einer Woche in `fakten.yaml` und, falls nötig, im Text.
