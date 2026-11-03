# site/: Astro-Bau von roessler-immo.de

Anleitung für die Freigabe-Sitzung: `../LAPTOP-SESSION.md`. Spezifikation: `../bauplan/`.

| Befehl | Zweck |
|---|---|
| `npm run vorschau` / `npm run vorschau:start` | alle Seiten mit gelben Markern nach `dist-vorschau/`, lokal mit PHP starten |
| `npm run offen` | offene `[LINUS]`/`[ZU PRÜFEN]`-Stellen nach Fragen, blockierte Seiten |
| `npm run build:prod` | nur Seiten aus `veroeffentlichen.yaml`; Abbruch bei Markern |
| `npm run pruefen` | build:prod, statische Tests, html-validate, Playwright (Produktion + Vorschau), axe |
| `npm run pruefen:test` | wie pruefen, mit `tests/veroeffentlichen.test.yaml` (nur `/testseite/` aus `tests/fixtures/`) |
| `npm run lighthouse -- dist / /pfad/` | Lighthouse mobil gegen einen lokalen Build |
| `npm run screenshots` | JPEGs nach `screenshots/` |
| `npm run veroeffentlichen` | Vorabprüfung, pruefen, `../deploy/deploy.sh` |

## Aufbau
- `src/lib/inhalte.mjs` lädt `../texte/*.md`, `../texte/aktuell/*.md`, `inhalte/recht/*.md`, `inhalte/seiten/*.md` und rendert die Text-Konventionen (Fußnoten, Buttons, FAQ als `<details>`, Tabellen, Marker, Quellen). `src/lib/fakten.mjs` liest `../bauplan/fakten.yaml`, `src/lib/schema.mjs` erzeugt das JSON-LD.
- `src/data/formulare.json` definiert alle Formularfelder für Astro und PHP. `public/kontakt.php`, `public/bewertung.php` und `public/_formular/kern.php` bilden das PHP-Backend; die Konfiguration liegt außerhalb des Webroots (`formular-config.example.php`).

## Abweichungen von der Spezifikation (bewusst, einfachste Lösung)
1. **Keine Frontmatter-Migration und keine Astro-Content-Collection.** `texte/` durfte nicht geändert werden. `typ`, `kurztitel`, `status`, `ort`, `rubrik` werden aus Dateiname und URL abgeleitet. `status: Entwurf…` gilt als Entwurf. Veröffentlicht wird nur über `veroeffentlichen.yaml`, nicht über `status`. Eigenes unified/remark-Rendering statt Astro-Markdown-Plugins.
2. **Erlaubnis-Bausteine:** Der bekannte Wortlaut von Baustein A, B und C wird beim Rendern erkannt (tolerant gegenüber Zeilenumbruch und eingeschobenem Marker) und durch den Baustein aus `fakten.yaml` ersetzt; `::erlaubnis{baustein="x"}` funktioniert ebenfalls (Impressum). Status `erteilt` seit 03.11.2026: A entfällt, D wird zu E (blockiert, bis `erteilt_am`, `behoerde` und `aktenzeichen` geprüft sind), B wird zur Vertrauenszeile, C zum Investor-Satz. Der Byline-Zusatz „beantragt“ wird entfernt.
3. **Formulare:** Die Spezifikationen in den Texten (Kommentarblock in `wohnung-bewerten.md`, Feldtabelle in `direktankauf.md`, Feldliste vor dem POST-Button in `kontakt.md`) werden durch das Formular ersetzt. Danke-Texte stehen in `inhalte/seiten/danke-*.md`. PHP ohne PHPMailer, mit eigenem SMTP-Client (STARTTLS, AUTH LOGIN). Der Kern liegt unter `/_formular/` im Webroot, nginx sperrt ihn, und er bricht bei direktem Aufruf ab. Kein Foto-Upload.
4. **Kein automatisches Inhaltsverzeichnis, kein CtaBlock, keine Preistabellen-Komponente:** Die manuellen Abschnitte „Inhalt“, „Nächster Schritt“ und die Preistabellen der Texte werden gerendert (Kontaktabschnitte als dunkelblaues Band mit Porträt).
5. **Schriften** liegen als WOFF2 unter `public/fonts/` (von Google Fonts heruntergeladen), nicht über @fontsource. **Sitemap und robots.txt** sind eigene Endpunkte; die Vorschau hat eine leere Sitemap und `Disallow: /`.
6. **Links auf nicht veröffentlichte Seiten** werden zu Text; Buttons und reine „Weiterlesen“-Links entfallen. Fehlende Linkziele (z. B. nicht vorhandene PDFs) sind in der Vorschau orange markiert und brechen den Produktions-Build ab.
7. **Tests:** Statt lychee und Lighthouse CI gibt es `scripts/check-statisch.mjs` (Marker, Erlaubnis, interne Links und Anker, JSON-LD, Budget, Drittanbieter) und `scripts/lighthouse.mjs`. Die Formular-, Navigations- und axe-Tests laufen zusätzlich auf dem Vorschau-Build, damit sie auch greifen, solange noch keine Formularseite freigeschaltet ist. Im Testmodus gelten die Rate-Limits je Testlauf (Header `X-Testlauf`).
8. **Nicht umgesetzt:** Anrufleisten-Ereignis-Beacon `/e` (nginx-Location ist vorbereitet), Plausible, wöchentlicher Fakten-CI-Lauf und Frische-Check (`check-fakten`). Der Workflow ist nur manuell auslösbar.
