# Laptop-Session: Fragen beantworten, prüfen, veröffentlichen

Ziel: In einer Sitzung mit Linus die offenen Stellen schließen und die neue Seite live schalten. Alle Befehle laufen im Ordner `site/`.

## 0. Voraussetzungen (einmalig, etwa 10 Minuten)

- Node.js 22 (`node -v`), PHP 8.2 oder neuer (`php -v`), Git.
- Im Ordner `site/`: `npm install`, danach einmalig `npx playwright install chromium`.
- Probe: `npm run vorschau` muss mit „nach-build: … Inline-Skripte ok“ enden.

## 1. Vorschau ansehen

```
npm run vorschau          # baut alle Seiten nach site/dist-vorschau, Marker gelb markiert
npm run vorschau:start    # http://127.0.0.1:4321/ (Formulare funktionieren, Mails landen in site/tests/.daten/test-mails)
```

Jede Seite zeigt oben „Offene Marker auf dieser Seite: n“. Gelb heißt `[LINUS: …]` oder `[ZU PRÜFEN: …]`, orange heißt fehlendes Linkziel (z. B. PDF).

## 2. Fragen beantworten

1. `FRAGEN-AN-LINUS.md` mit Linus durchgehen: zuerst Teil 1, dann aus Teil 2 die Fragen zu den Seiten der Welle 1.
2. `npm run offen` zeigt jede offene Stelle mit Datei und Zeile, sortiert nach diesen Fragen, und am Ende, welche Seiten aus `veroeffentlichen.yaml` noch blockiert sind. Nur eine Seite: `npm run offen -- --seite /kontakt/`.

## 3. Antworten einsetzen

| Was | Wo |
|---|---|
| Text einer Seite (Marker durch Antwort ersetzen oder Satz streichen) | `texte/<seite>.md`, Zeile laut `npm run offen` |
| Impressum, Datenschutz, Widerruf | `site/inhalte/recht/*.md` |
| Fakten (Telefon, Provision, Fristen, Erreichbarkeit, Anschrift) | `bauplan/fakten.yaml`: `wert` eintragen, `status: geprueft`, `stand` = heute |
| **Erlaubnis nach § 34c GewO (am 03.11.2026 erteilt)** | `bauplan/fakten.yaml` → `erlaubnis.status` steht schon auf `erteilt`. Noch eintragen: `erlaubnis.erteilt_am` (Datum aus dem Bescheid, Format `2026-10-15`), `erlaubnis.aktenzeichen`, `erlaubnis.behoerde` (`wert` = Name der IHK, `anschrift`). Jeweils `status: geprueft`. Danach zeigen Impressum (Baustein E) und Über mich automatisch Datum und IHK; ohne diese Angaben bleibt das Impressum blockiert. Ein „beantragt“-Hinweis erscheint nirgends mehr; das Vorstellen von Käufern und Investoren (Direktankauf) ist freigeschaltet. |
| Muster-Widerrufsbelehrung vom Anwalt | `site/inhalte/recht/widerruf.md` |

Regel: Weiß Linus etwas nicht, den Satz samt Marker streichen. Nach jeder Änderung `npm run offen` erneut.

## 4. Seiten freischalten

In `site/veroeffentlichen.yaml` bei jeder freigegebenen Seite das `#` entfernen. Welle 1: `/`, `/wohnung-verkaufen/`, `/wohnung-bewerten/`, `/direktankauf/`, `/ueber-mich/`, `/kontakt/`, `/impressum/`, `/datenschutz/`, `/widerruf/`. Pflicht für den Livegang: `/`, `/impressum/`, `/datenschutz/`. Nicht freigeschaltete Seiten werden nicht gebaut und nicht verlinkt (Links werden zu Text, Buttons entfallen). Danke-Seiten folgen ihrer Formularseite automatisch.

## 5. Prüfen

```
npm run pruefen
```

Produktions-Build (bricht mit Datei, Zeile und Markertext ab, wenn eine freigeschaltete Seite noch Marker hat), statische Tests (Marker, Erlaubnis-Wortlaut, interne Links und Anker, JSON-LD, Budget, keine Drittanbieter, html-validate), Playwright auf dem Produktions-Build und danach Formular-, Navigations- und axe-Tests auf der Vorschau. Am Ende muss „passed“ ohne „failed“ stehen. Optional: `npm run lighthouse -- dist / /wohnung-verkaufen/`.

## 6. Server-Zugang einrichten (einmalig)

1. Hosting-Typ klären (`ssh … 'nginx -v; php -v; ls /etc/nginx'`): VPS oder netcup Webhosting mit Plesk.
2. Datei `~/.roessler-deploy.env` auf dem Laptop anlegen:
   ```
   DEPLOY_HOST=roessler-immo.de
   DEPLOY_USER=…
   DEPLOY_PATH=/var/www/roessler-immo/web
   # DEPLOY_PORT=22
   # DEPLOY_KEY=~/.ssh/id_ed25519
   ```
3. Auf dem Server neben (nicht in) den Webroot: `formular-config.php` aus `site/formular-config.example.php` (SMTP-Passwort für `anfrage@roessler-immo.de`, `hmac_geheim` mit `openssl rand -hex 32`), `chmod 600`.
4. nginx: `deploy/nginx-roessler-immo.conf` und `deploy/sicherheit.conf` installieren (Anleitung im Dateikopf; bei Plesk die Zeilen unter „Zusätzliche nginx-Anweisungen“). HSTS zuerst mit `max-age=300`.
5. DNS für Mail: DKIM im netcup-CCP aktivieren, DMARC `v=DMARC1; p=none; rua=mailto:dmarc@roessler-immo.de`.

## 7. Veröffentlichen

```
npm run veroeffentlichen
```

Prüft Pflichtseiten und Server-Zugang, führt `npm run pruefen` aus und liefert danach per rsync aus (`deploy/deploy.sh`). Alternativ in GitHub: Actions → „bauen-und-ausliefern“ → Run workflow mit „ausliefern“ (Secrets `DEPLOY_HOST`, `DEPLOY_USER`, `DEPLOY_PATH`, `DEPLOY_SSH_KEY`, `DEPLOY_KNOWN_HOSTS` vorher setzen).

## 8. Kontrolle nach dem Livegang

- https://roessler-immo.de/ und jede freigeschaltete Seite auf dem Handy öffnen; alte Links `/#kontakt`, `/#impressum` leiten um.
- Je ein Testformular (Bewertung, Kontakt, Ankauf) mit eigener Gmail-Adresse: Mail bei Linus, Bestätigung nicht im Spam, in Gmail „Original anzeigen“: SPF, DKIM, DMARC = PASS.
- `curl -sI https://www.roessler-immo.de/` zeigt 301 auf `https://roessler-immo.de/`; `curl -s -o /dev/null -w '%{http_code}' https://roessler-immo.de/kontakt.php` = 303.
- Google Search Console: Domain-Property per DNS-TXT anlegen, Sitemap `https://roessler-immo.de/sitemap-index.xml` einreichen, Start und Welle-1-Seiten per URL-Prüfung zur Indexierung anmelden.
- Nach einer Woche ohne Fehler HSTS in `sicherheit.conf` auf `max-age=31536000` erhöhen.
