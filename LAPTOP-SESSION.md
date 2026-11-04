# Laptop-Session: Fragen beantworten, prüfen, veröffentlichen

Ziel: In einer Sitzung mit Linus die offenen Stellen schließen und die neue Seite live schalten. Alle Befehle laufen im Ordner `site/`.

Arbeitsliste ist **`LAPTOP-FRAGEBOGEN.md`**: 9 Fragen (etwa 15 Minuten), dazu Werte zum Ablesen am Veröffentlichungstag und die Anwaltspunkte. Jede offene Stelle auf der Seite gehört zu genau einer dieser Fragen.

## 0. Voraussetzungen (einmalig, etwa 10 Minuten)

- Node.js 22 (`node -v`), PHP 8.2 oder neuer (`php -v`), Git.
- Im Ordner `site/`: `npm install`, danach einmalig `npx playwright install chromium`.
- Probe: `npm run vorschau` muss mit „nach-build: … Inline-Skripte ok“ enden.

## 1. Vorschau ansehen

```
npm run vorschau          # baut alle Seiten nach site/dist-vorschau, Marker gelb markiert
npm run vorschau:start    # http://127.0.0.1:4321/ (Formulare funktionieren, Mails landen in site/tests/.daten/test-mails)
```

Jede Seite zeigt oben „Offene Marker auf dieser Seite: n“. Gelb heißt `[LINUS: …]` (fast immer „Wert fehlt in bauplan/fakten.yaml: …“) oder `[ZU PRÜFEN: …]`, orange heißt fehlendes Linkziel (z. B. PDF). Stand 4.11.2026: 43 Stellen auf 19 Seiten, kein `[ZU PRÜFEN]`.

## 2. Fragen beantworten

1. `LAPTOP-FRAGEBOGEN.md` mit Linus durchgehen, Gruppe 1 bis 4 (9 Fragen). Antworten direkt in das Antwortfeld schreiben.
2. `npm run offen` zeigt jede offene Stelle mit Datei und Zeile, gruppiert nach den Fragen des Fragebogens, und am Ende, welche Seiten aus `veroeffentlichen.yaml` noch blockiert sind. Nur eine Seite: `npm run offen -- --seite /kontakt/`.

## 3. Antworten einsetzen

| Was | Wo |
|---|---|
| Antworten auf Frage 1.1 bis 4.1 | `bauplan/fakten.yaml`, Feld laut Fragebogen: `wert` eintragen (Satzteil oder Satz, Beispiele im `hinweis`), `status: geprueft`, `stand` = heute. Die Texte holen den Wert per `{{fakten.…}}` an alle Stellen. |
| **Erlaubnis nach § 34c GewO (Frage 1.2)** | `erlaubnis.erteilt_am` (Format `2026-10-15`), `erlaubnis.aktenzeichen`, `erlaubnis.behoerde` (`wert` = Name der IHK, `anschrift`), jeweils `status: geprueft`. `erlaubnis.status` steht schon auf `erteilt`. Danach zeigen Impressum (Baustein E) und Über mich Datum, IHK und Aktenzeichen; ohne diese Angaben bleibt das Impressum blockiert. |
| Werte vom Veröffentlichungstag (KfW-Zins, Bauzinsen, Gesetzblatt) | Tabelle „Am Veröffentlichungstag kurz ablesen“ im Fragebogen |
| Muster-Widerrufsbelehrung vom Anwalt (A1) | `site/inhalte/recht/widerruf.md` |

Regel: Weiß Linus etwas nicht, nicht raten. Den Platzhalter samt Satz in der Textdatei streichen (Datei und Zeile zeigt `npm run offen`) oder die Seite noch nicht freischalten. Nach jeder Änderung `npm run offen` erneut. Die Kommentare `<!-- Später ergänzen (N…) -->` blockieren nichts; sie gehören zur Liste „Nach dem Livegang ergänzen“.

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
3. Log-Rotation für die Datenschutzerklärung (14 Tage): `/etc/logrotate.d/roessler-immo` mit `/var/log/nginx/roessler-immo.*.log { daily rotate 14 missingok compress delaycompress notifempty sharedscripts postrotate nginx -s reopen endscript }`. Die IP-Kürzung macht `log_format anon` in `deploy/nginx-roessler-immo.conf`.
4. Auf dem Server neben (nicht in) den Webroot: `formular-config.php` aus `site/formular-config.example.php` (SMTP-Passwort für `anfrage@roessler-immo.de`, `hmac_geheim` mit `openssl rand -hex 32`), `chmod 600`.
5. nginx: `deploy/nginx-roessler-immo.conf` und `deploy/sicherheit.conf` installieren (Anleitung im Dateikopf; bei Plesk die Zeilen unter „Zusätzliche nginx-Anweisungen“). HSTS zuerst mit `max-age=300`.
6. DNS für Mail: DKIM im netcup-CCP aktivieren, DMARC `v=DMARC1; p=none; rua=mailto:dmarc@roessler-immo.de`.

## 7. Veröffentlichen

Vorher die Tabelle „Am Veröffentlichungstag kurz ablesen“ in `LAPTOP-FRAGEBOGEN.md` abarbeiten (vor allem KfW-308-Zins im Konditionenanzeiger, `kfw_308.zins` mit `stand`).

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
