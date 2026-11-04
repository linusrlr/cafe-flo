# Exposé-Freigabe auf netcup: Einrichtung

Zwei Wege. Beide nutzen denselben Code; der Unterschied ist nur, wer die Server-Header und Sperren setzt.

| | netcup Webhosting (Plesk) | netcup vServer (eigenes nginx + PHP-FPM) |
|---|---|---|
| Webroot | `/var/www/vhosts/roessler-immo.de/httpdocs/` | `/var/www/roessler-immo/web/` |
| Code (`expose-backend/`) | daneben: `/var/www/vhosts/roessler-immo.de/expose-backend/` | `/var/www/roessler-immo/expose-backend/` |
| Daten (`expose-daten/`) | `/var/www/vhosts/roessler-immo.de/expose-daten/` | `/var/www/roessler-immo/expose-daten/` |
| Header, Sperren | PHP setzt die Header selbst; `.htaccess` (vom Generator) und Meta-CSP für statische Seiten | `nginx-expose.conf` + `nginx-expose-php.conf` |
| PHP-Einstellungen | `user.ini` als `httpdocs/.user.ini` bzw. Plesk „PHP-Einstellungen“ | php.ini/Pool, siehe `nginx-expose-php.conf` |
| Cron | Plesk „Geplante Aufgaben“ | `crontab -e` |

Die PHP-Endpunkte im Webroot (`anfrage.php`, `expose.php`, `widerruf.php`, `freigabe.php`, `expose-admin.php`) laden den Code aus `../expose-backend/`. Deshalb muss `expose-backend` **neben** dem Webroot liegen, nie darin. Im Modus `produktion` verweigert der Code den Start, wenn `expose-backend` oder `expose-daten` im Webroot liegen.

Plesk-Hinweis: `open_basedir` steht bei Plesk standardmäßig auf `{WEBSPACEROOT}{/}{:}{TMP}{/}`. Damit sind Ordner neben `httpdocs` erreichbar. Steht dort nur `{DOCROOT}`, in Plesk unter „PHP-Einstellungen“ auf `{WEBSPACEROOT}` ändern. (Menünamen in Plesk können je nach Version etwas abweichen.)

## Schritt für Schritt (einmalig)

1. **Bauen:** `npm run bauen:produktion` (bricht ab, solange Marker offen sind).
2. **Hochladen** (SFTP/rsync), Ziel siehe Tabelle:
   - `dist/web/*` in den Webroot (inklusive der `.htaccess`-Dateien in `objekte/`, `expose-recht/`, `vertrag-widerrufen/`, `expose-assets/`),
   - `dist/expose-backend/` nach `expose-backend/`.
   - Erledigt: `deploy/deploy.sh` der Hauptseite schützt die Exposé-Dateien beim `--delete-after` per `--filter='P …'` (Array `EXPOSE_SCHUTZ`). Neue Exposé-Pfade im Webroot dort ergänzen.
3. **Datenordner:** `mkdir -m 700 expose-daten expose-backup`.
4. **Konfiguration:** `cp expose-backend/config.beispiel.php expose-backend/config.php`, `chmod 600 expose-backend/config.php`, Pfade, SMTP-Server und Benutzer eintragen.
5. **Geheimnisse:** `php expose-backend/werkzeuge/geheimnisse-erzeugen.php expose-backend --admin-passwort --smtp-passwort`
   (HMAC-Schlüssel 256 Bit, Admin-Passwort als Hash, SMTP-Passwort; Datei `geheimnisse.php`, Rechte 600).
6. **Backup-Schlüssel auf dem Laptop:** `bash deploy/backup.sh schluessel ~/expose-backup-schluessel` (fragt ein Passwort für den privaten Schlüssel). Nur `backup-zertifikat.pem` nach `expose-backend/` hochladen. `backup-privat.pem` und Passwort in den Passwortmanager, nie auf den Server.
7. **PHP-Einstellungen:** Webhosting: `deploy/user.ini` als `httpdocs/.user.ini`; in Plesk `expose_php` aus. vServer: siehe `nginx-expose-php.conf`.
8. **nginx (nur vServer):** siehe Kopf von `nginx-expose.conf`; in `deploy/nginx-roessler-immo.conf` steht der Include-Hinweis.
   **Webhosting:** In Plesk „Apache & nginx → Zusätzliche nginx-Anweisungen“ keine `add_header`-Zeilen auf Server-Ebene für CSP eintragen, die auch für `/expose.php` gelten: eine fremde CSP würde das Voll-Exposé blockieren (es braucht die von PHP berechneten Stil-Hashes). Für die Hauptseite die Header in `location`-Blöcke legen oder für `^/(anfrage|expose|widerruf|freigabe|expose-admin)\.php$` aussparen.
9. **Cron:** Zeilen aus `cron.txt` übernehmen (Pfade anpassen).
10. **Mail-DNS:** `DNS-MAIL.md` (DKIM, DMARC).
11. **HTTPS:** Let’s-Encrypt-Zertifikat in Plesk bzw. certbot; „Permanente SEO-sichere 301-Weiterleitung von HTTP zu HTTPS“ in Plesk einschalten. HSTS sendet PHP selbst (`'hsts'` in config.php).
12. **Prüfen:** Checkliste in `../SICHERHEIT.md`, Abschnitt „Vor dem ersten echten Einsatz“.

## Rauchtest nach jedem Hochladen

```bash
curl -sI https://roessler-immo.de/objekte/<slug>/                     # 200, Content-Security-Policy, X-Frame-Options
curl -s  -o /dev/null -w '%{http_code}\n' https://roessler-immo.de/../expose-backend/config.php   # 404
curl -s  -o /dev/null -w '%{http_code}\n' https://roessler-immo.de/expose-backend/config.php      # 404
curl -s  -o /dev/null -w '%{http_code}\n' "https://roessler-immo.de/expose.php?t=x"              # 404
curl -sI http://roessler-immo.de/expose.php | head -1                                            # 301
php expose-backend/werkzeuge/nachweis-pruefen.php                                                # ERGEBNIS: in Ordnung
```
