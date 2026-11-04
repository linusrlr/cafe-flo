# Sicherheit und Beweisfestigkeit der Exposé-Freigabe

Stand: 4. November 2026. Prüfung des Codes in `expose/` (Generator, PHP-Backend, Tests) nach OWASP ASVS 4.0 Level 2 bzw. OWASP Top 10 (2021), danach Behebung, Infrastruktur für netcup und Tests. Angriffe wurden per Skript gegen `php -S` mit dem Test-Router ausgeführt, zuerst gegen den alten Stand (Belege in der Befundliste), dann als feste Tests in `tests/test.mjs`.

> Rechtstexte und Fristen bleiben **Entwürfe für die Anwältin**. Dieses Dokument trifft keine Rechtsaussagen; wo eine technische Entscheidung eine Rechtsfrage berührt, steht **[ZU PRÜFEN]**.

## 1. Bedrohungsmodell

**Schützenswert**
1. **Beweis des Vertragsschlusses** (Textform § 656a, Button § 312j, Belehrung, Verlangen des vorzeitigen Beginns): muss im Streit vorgelegt und als unverändert belegt werden können.
2. **Widerrufe** (§ 356a BGB): dürfen nicht verloren gehen, müssen fristwahrend und mit Eingangsbestätigung protokolliert sein.
3. **Voll-Exposé** (Adresse = Maklerleistung, Interesse des Verkäufers): nur für Berechtigte, zeitlich begrenzt, sperrbar.
4. **Personendaten** der Interessenten (Name, E-Mail, Telefon, gekürzte IP, User-Agent): Vertraulichkeit, Löschung nach Frist.
5. **Geheimnisse**: HMAC-Schlüssel, SMTP-Passwort, Admin-Passwort, Backup-Schlüssel.
6. **Ruf der Domain** (Mailversand nicht missbrauchbar, Zustellbarkeit).

**Angreifer und Szenarien**

| Angreifer | Ziel | Abwehr |
|---|---|---|
| Neugieriger Interessent / Konkurrent | Adresse ohne Vertrag, Link raten oder verändern, fremde Vorgänge (IDOR) | HMAC-Token mit Domänentrennung, Bindung an Vorgang, Objekt und Ausstellung (`n`), Ablauf, Sperre, Rate-Limit auf Fehlversuche |
| Bot / Spammer | Massenhaft Verträge und Mails an Dritte, Speicher füllen | Honeypot, signiertes Formular-Token (einmalig, Mindestzeit 3 s), Limits je IP (IPv6 /64), je E-Mail, global, Speicherprüfung, nur urlencoded bis 64 KB |
| Fremde Webseite (CSRF) | Besucher ungewollt Erklärungen absenden lassen | Origin, Sec-Fetch-Site, Referer; Admin zusätzlich SameSite=Strict + CSRF-Token |
| Injektion | Mail-Header/SMTP-Befehle, XSS in Mails/Admin/Exposé, Pfad-Traversal | strenge Validierung (ablehnen statt kürzen), Header-/SMTP-Prüfung, Punkt-Maskierung, HTML-/CSS-Kodierung, CSP ohne `unsafe-inline`, `/D`-Regexe |
| Dritter mit bekannter E-Mail | Fremden Vertrag widerrufen | Eingangsbestätigung geht an diese Adresse; Rest siehe Risiken |
| Streitpartei (auch gegen Linus) | Protokoll als manipuliert hinstellen | Hash-Kette, Prüfwert in der Kundenmail, Tagesanker an externes Postfach, Mail-Kopien mit SHA-256, unabhängiges Prüfskript |
| Angreifer mit Zugriff auf den Server | Daten lesen, Protokoll umschreiben | Daten außerhalb des Webroots, Rechte 700/600; Umschreiben fällt gegen externe Anker auf; Backups mit öffentlichem Schlüssel verschlüsselt. Volle Serverübernahme bleibt Restrisiko |
| Betriebsfehler | Code/Daten im Webroot, Stack-Traces, Deploy löscht Seiten, Token im Log | Startverweigerung im Produktionsmodus, globale Fehlerbehandlung, Deploy-Hinweis, Log-Format ohne Query |

**Vertrauensgrenzen:** Browser ↔ nginx/Apache (TLS) ↔ PHP-Endpunkte im Webroot ↔ `expose-backend/` (Code, nicht öffentlich) ↔ `expose-daten/` (nur PHP-Benutzer) ↔ SMTP-Server (TLS, Zertifikat geprüft) ↔ Laptop (Backup-Privatschlüssel, Prüfskript).

## 2. Befunde und Behebung

Schwere: **H** hoch, **M** mittel, **N** niedrig. „Test“ = Abschnitt in `tests/test.mjs`. Fundstellen beziehen sich auf den Stand vor der Änderung (`backend/lib/kern.php`, 662 Zeilen).

| # | Schwere | Befund (Fundstelle) | Fix | Test |
|---|---|---|---|---|
| 1 | H | **Race Condition, Widerruf ging verloren.** `expose()` las den Vorgang, zählte `abrufe` hoch und schrieb ihn ohne Sperre zurück (kern.php 511/528–530); ein gleichzeitiger Widerruf (597) wurde überschrieben, der Link war wieder offen. Gleiches bei `freigabe()`. Leser konnten halb geschriebene Dateien sehen. | `vorgang_aendern()`: Lesen-Prüfen-Schreiben unter exklusiver Sperre; atomares Schreiben (temp + rename); Widerruf durchsucht unter derselben Sperre. | 17 (16 parallele Abrufe + Widerruf, 4 PHP-Worker) |
| 2 | H | **Nachweis nicht manipulationssicher, Reihenfolge riskant.** JSONL ohne Verkettung, jede Zeile unbemerkt änderbar; Mail wurde vor dem Protokoll verschickt (398 vor 417): Absturz dazwischen = Vertrag ohne Nachweis. | Hash-Kette `lib/kette.php` (seq, vorher, hash, inhalt_sha256, kanonisches JSON), Sperre beim Anhängen, `fsync`. Protokoll **vor** der Mail, bei Fehler Rücknahme des Vorgangs. Prüfwert in Kunden- und Linus-Mail, Tagesanker, Mail-Kopien mit SHA-256, Export, `nachweis-pruefen.php`. Schwärzen statt Löschen hält die Kette prüfbar. | 5, 16, 18, 19, 20, 23 |
| 3 | H | **Betrieb: Exposé auf dem Server nicht lauffähig bzw. wird gelöscht.** Hauptkonfiguration liefert jede `*.php` außer kontakt/bewertung mit 404 aus; `deploy/deploy.sh` (`rsync --delete-after`) löscht bei jedem Deploy der Hauptseite Exposé-Seiten und Widerrufsfunktion (§ 356a verlangt ständige Verfügbarkeit); das README-Snippet `location ^~ /objekte/ { add_header … }` hob alle Sicherheits-Header der Hauptseite auf. | `deploy/nginx-expose.conf` + `nginx-expose-php.conf` (eigene locations, Header bewusst gesetzt), Include-Hinweis in `deploy/nginx-roessler-immo.conf`. `deploy.sh` wurde **nicht** geändert (außerhalb des Auftrags): die nötigen `--filter='P …'`-Zeilen stehen in `deploy/WEBHOSTING.md`, Schritt 2. **Offen bis eingetragen.** | Doku, Checkliste |
| 4 | M | **E-Mail-Validierung zu lax.** `FILTER_VALIDATE_EMAIL` akzeptierte `"<script>alert(1)</script>"@example.com`, `"a,b@evil.com"@x.de` (Komma im To) und `x@[127.0.0.1]` (Mail an interne Hosts); Angriff ergab jeweils 303 = Vertrag + Mail. | `adresse_normalisieren()`: nur Punkt-Atom mit üblichen Zeichen, Domain mit Buchstaben-TLD, IDN → Punycode, kein Quote/Komma/IP-Literal. Gilt auch für Konfigurationsadressen. | 12 |
| 5 | M | **Header und CSP fehlten.** PHP-Antworten (Fehler, Widerruf, Freigabe) ohne CSP/X-Frame-Options/nosniff (Clickjacking des Widerruf-Bestätigens möglich); Voll-Exposé mit `script-src 'unsafe-inline'` (onclick) und `style-src 'unsafe-inline'`; statische Seiten auf Webhosting ohne jede CSP; `X-Powered-By`. | `sicherheitsheader()` für alle PHP-Antworten; Voll-Exposé: CSP mit SHA-256 der eingebetteten Stile (zur Laufzeit berechnet), Skript nur `'self'` (`drucken.js`); Generator ohne Inline-Styles (Hilfsklassen, Energieklassen als Klassen), Meta-CSP in jeder Seite, `.htaccess` mit Headern; HSTS aus PHP. | 1, 5, 16; jede Browser-Seite meldet CSP-Verstöße (0) |
| 6 | M | **Replay und Bot-Schutz nur clientseitig.** Gleicher POST erzeugte beliebig viele Verträge; Zeitprüfung über das vom Client gesendete Feld `t`; POST ohne Origin, mit `Sec-Fetch-Site: cross-site` oder fremdem Referer akzeptiert. | Signiertes Formular-Token (`anfrage.php?ft=`), zustandslos ausgegeben, serverseitige Mindestzeit 3 s, Höchstalter 6 h, **einmal** verwendbar; ohne Token (kein JS) strengeres Limit; Dublettenschutz 10 min; Herkunftsprüfung Origin/Sec-Fetch-Site/Referer. Kein reCAPTCHA. | 8, 14 |
| 7 | M | **Rate-Limit umgehbar, Speicher-DoS, Mail-Flut.** Limit je IPv6-Adresse (Wechsel im /64 trivial), kein globales Limit, E-Mail-Limit nur je Objekt, bei Dateifehler „erlaubt“ (fail open), keine Speicherprüfung; Widerruf ohne E-Mail-Limit (Mails an beliebige Adressen). | IPv6 je /64; Limits je IP, ohne Token, je E-Mail, je E-Mail+Objekt, global; Widerruf je IP und je E-Mail; fail closed; `min_frei_mb`; Rate-Limit-Dateien begrenzt und aufgeräumt. | 15 (25 parallele POSTs → genau 3 angenommen) |
| 8 | M | **Fehlerbehandlung.** Keine globalen Handler: Anzeige von Fehlern hing an `display_errors` des Hosts; `?t[]=x` und `freigabe.php?v[]=` erzeugten „Array to string“-Warnungen; die Freigabe-Seite zeigte Exception-Texte. | Fehler-/Exception-Handler: Fehlernummer für den Besucher, Details nur ins Log; `display_errors=0` im Code; Typprüfung aller Parameter. | 10, 16 |
| 9 | M | **Freigabe-Link unbefristet.** HMAC nur über die Vorgangsnummer, gültig für immer, zeigt Name, E-Mail, Telefon; Datei wurde vor der Signatur geprüft. | Ablaufzeit (14 Tage) in der Signatur, Signatur zuerst in konstanter Zeit, Fehlversuche gebremst; Freigabe zusätzlich in der Admin-Übersicht. | 9, 10 |
| 10 | M | **Exposé-Token im Access-Log.** Das nginx-Format `anon` loggt `$request` mit `?t=…`. | `log_format anon_ohne_query` für alle Exposé-Endpunkte. | Doku (nginx nicht im Testsystem) |
| 11 | M | **Links nicht einzeln sperrbar, keine Schlüsselrotation.** | Token enthält Ausstellungsnummer `n`; Vorgang `gesperrt`; Admin „Link sperren“; HMAC mit Zweck-Präfix `expose|`; `geheim_alt` hält alte Links bei Schlüsselwechsel gültig. | 10, 18 |
| 12 | M | **Widerruf mit Honeypot wurde still verworfen** (Antwort „Danke“). Ein echter Widerruf (z. B. Autofill) ginge verloren. | Wird als `widerruf_verdacht` in die Kette geschrieben, ohne Mail und Sperre; Linus sieht ihn. | 8 |
| 13 | N | **Stilles Kürzen** überlanger Felder (`mb_substr`), z. B. E-Mail auf 254 Zeichen: andere Adresse als eingegeben. | Ablehnen statt kürzen; Steuer- und Bidi-Zeichen abgelehnt. | 12, 15 |
| 14 | N | **Regex-Anker `$` ohne `D`** (Slug, Vorgang, Token): Zeilenumbruch am Ende passierte. Nicht ausnutzbar, aber unsauber. | `/D` überall. | 10, 11 |
| 15 | N | **Name im Druck-CSS HTML-kodiert** statt CSS-kodiert (`O&#039;Brien` im PDF-Fuß). | `css_text()` mit `\HEX`-Escapes. | 12 |
| 16 | N | **multipart erlaubt:** Datei-Uploads landeten vor dem Skriptstart in `/tmp`. | Nur `application/x-www-form-urlencoded`; Formular-JS sendet `URLSearchParams`; `.user.ini`/Pool-Hinweise. | 15 |
| 17 | N | **SMTP über PHPMailer aus fremdem Projektordner** (`formular/vendor/autoload.php`), ungeprüfte Versionspflege. | Eigener SMTP-Client (`lib/mail.php`, ~90 Zeilen): STARTTLS/TLS mit Zertifikatsprüfung, AUTH PLAIN/LOGIN, ein Empfänger, Punkt-Maskierung, Antwortcodes geprüft; SMTP ohne TLS nur im Testmodus. Begründung unten. | 22 |
| 18 | N | **Geheimnisse und Produktionskonfiguration.** HMAC-Schlüssel ab 32 Zeichen, gemeinsam mit Einstellungen in `config.php`, kein Erzeugungsskript; keine Prüfung auf `https`, Testtransport oder Datenordner im Webroot. | `geheimnisse.php` (600) per `deploy/geheimnisse-erzeugen.php`; Modus `produktion` verlangt https-Basis, ≥ 64 Zeichen, kein `datei`-Transport, `https_erzwingen`, Code und Daten außerhalb des Webroots, sonst Start verweigert. `.gitignore` erweitert. | 16, 21 |
| 19 | N | **HTTPS nur über nginx.** Auf Webhosting ohne Weiterleitung lief alles über http. | `https_pruefen()`: GET → 301, POST → 403; `X-Forwarded-Proto` nur mit `hinter_proxy`. | 16 |
| 20 | N | **Dateirechte von der umask abhängig.** | `umask(0077)`, Ordner 700, Dateien 600. | 5 |
| 21 | N | **Kein Backup, Löschung nur per `find`**, Nachweise ohne Löschkonzept. | `deploy/backup.sh` (OpenSSL CMS, AES-256, öffentlicher Schlüssel), `werkzeuge/loeschen.php` (Probelauf, Schwärzen, Aufbewahrung bei Kauf), Cron. | 20, 21 |
| 22 | N | **Link-Vorschauen** (HEAD) zählten als Abruf. | HEAD zählt nicht, kein Nachweiseintrag. | 10 |
| 23 | N | **Zustellbarkeit:** kein DKIM, kein DMARC. | Anleitung `deploy/DNS-MAIL.md`; From/Envelope immer `anfrage@`, Interessent nur in `Reply-To`. | Checkliste |

**Was schon gut war (beibehalten):** HMAC-SHA256 mit `hash_equals`, Häkchen serverseitig erzwungen (nur Wert `1`), keine Vorauswahl, Fassungs-Hash über Erklärungen, Rechtstexte und Button-Text (409 bei veralteter Seite), Mails als reiner Text (kein HTML-XSS), Daten außerhalb des Webroots, gekürzte IP + HMAC, GET auf Freigabe löst nichts aus, Widerruf zweistufig mit Eingangsbestätigung.

**Rechtlich-technische Punkte (technisch umgesetzt, rechtlich [ZU PRÜFEN]):** Schaltfläche „zahlungspflichtig bestellen“ (Test 3), keine Vorauswahl (Test 3) und serverseitige Pflicht jedes Häkchens (Test 13), Wortlaut mit Version und SHA-256 im Nachweis (Test 5), Bestätigungs-Mail mit Vertrag, Belehrung, Muster-Formular, Datenschutz als dauerhafter Datenträger plus Kopie mit Prüfwert (Test 5), Widerruf mit „Widerruf bestätigen“ und Eingangsbestätigung mit Datum, Uhrzeit, Inhalt (Test 7, 23), Bot-Schutz ohne Drittanbieter (Test 14).

### Warum kein PHPMailer

Gebraucht wird genau eines: eine Textmail an einen Empfänger über ein authentifiziertes Postfach mit TLS. Das sind in PHP ~90 Zeilen mit `stream_socket_client` und `stream_socket_enable_crypto`, vollständig getestet (Test 22). PHPMailer (rund 5 000 Zeilen) brächte Composer oder einen manuell gepflegten `vendor/`-Ordner auf den Webspace, eigene Sicherheitsupdates und eine Abhängigkeit vom Ordner der Hauptseite. Nachteile des eigenen Clients: kein DKIM-Signieren in PHP (macht der netcup-Mailserver), kein OAuth2 (netcup braucht es nicht). Sollte ein künftiger Anbieter Exotisches verlangen, ist PHPMailer an einer Stelle (`nachricht_senden`) einsetzbar.

## 3. Nachweis: wie Linus im Streitfall vorgeht

1. Admin-Übersicht → Vorgang → „Nachweis-Datei herunterladen (JSON)“ und „Nachweis ansehen und als PDF drucken“.
2. Prüfen, auch auf einem anderen Rechner: `php nachweis-pruefen.php --export nachweis-EX-….json --anker <Prüfwert aus der Bestätigungs-Mail des Interessenten>`. Ergebnis „in Ordnung“ + „Anker gefunden“ heißt: Der Eintrag ist derselbe, dessen Prüfwert der Interessent seit dem Vertragsschluss in seiner Mail hat.
3. Gesamte Kette: `php nachweis-pruefen.php --daten expose-daten --anker <Prüfwert aus einer Tagesanker-Mail>`.
4. Die Mail-Kopie (`.eml`) ist in der Datei enthalten; ihr SHA-256 steht in der Kette. Die Antwort des SMTP-Servers („queued as …“) belegt die Übergabe, nicht den Zugang.

## 4. Verbleibende Risiken

- **Hash-Kette ist kein Zeitstempel eines Dritten.** Wer Server-Zugriff hat (auch Linus), kann die Kette komplett neu berechnen. Das fällt nur gegen Anker auf, die außerhalb liegen: Prüfwert in der Mail des Interessenten, Tagesanker an ein Postfach bei einem anderen Anbieter (`anker_an`), Sicherungen. Ein qualifizierter Zeitstempel (RFC 3161) wäre stärker, wurde aber bewusst nicht eingebaut (Drittanbieter). [ZU PRÜFEN: Beweiswert mit der Anwältin]
- **Identität:** Es gibt keine Bestätigung der E-Mail-Adresse vor dem Vertragsschluss. Jemand kann mit fremder Adresse bestellen; der Link geht aber nur an diese Adresse, Abrufe stehen im Protokoll. Ob ein Double-Opt-in vor Vertragsschluss sinnvoll ist, ist eine Rechts- und Ablauffrage. [ZU PRÜFEN]
- **Widerruf durch Dritte:** Wer Vorgangsnummer oder E-Mail kennt, kann einen Widerruf absenden (§ 356a verbietet einen Login). Die Eingangsbestätigung geht an die Adresse des Vertrags; Linus sieht es in der Übersicht.
- **Link-Weitergabe:** Der Token ist ein Inhaber-Link. Personalisierung, Abrufzähler (60) und Sperre mildern das.
- **Mail-Sicherheitsscanner**, die Links per GET öffnen, erzeugen Abruf-Einträge. Ein Abruf beweist nicht, dass ein Mensch das Exposé gelesen hat.
- **deploy.sh** der Hauptseite löscht die Exposé-Dateien, bis die Filterzeilen eingetragen sind (Befund 3).
- **nginx-Konfiguration** wurde nicht mit `nginx -t` geprüft (kein nginx im Testsystem); Plesk-Menünamen und `.htaccess`-Wirkung auf dem konkreten netcup-Tarif vor Ort prüfen. Meta-CSP kann kein `frame-ancestors`; dafür sorgen `.htaccess`/nginx.
- **Dateibasierte Speicherung** ist für Hunderte, nicht Zehntausende Vorgänge ausgelegt (Widerruf und Admin lesen alle Vorgänge).
- **Serverübernahme:** `geheimnisse.php`, Daten und Mail-Passwort sind dann offen. Backups bleiben geschützt (privater Schlüssel nur auf dem Laptop). Updates von PHP/Plesk sind Pflicht.
- **Zustellung:** Ohne DKIM/DMARC landen Bestätigungen eher im Spam (Anleitung `deploy/DNS-MAIL.md`).
- **Rechtlich offen** (nur technisch vorbereitet): Löschfrist (Vorschlag Ende des 3. Kalenderjahres), IP-Speicherung, Wertersatz, „vollständige Leistung“, Texte der Belehrung (Postanschrift fehlt noch).

## 5. Vor dem ersten echten Einsatz (Betriebs-Checkliste)

- [ ] Anwältin hat Rechtstexte, Button, Ablauf „sofort/nach Frist“, Löschfristen und IP-Speicherung freigegeben; Marker aufgelöst, `npm run bauen:produktion` läuft durch.
- [ ] `npm test` grün auf dem aktuellen Stand.
- [ ] `deploy/deploy.sh`: Filterzeilen aus `deploy/WEBHOSTING.md` Schritt 2 eingetragen; danach Hauptseite deployen und prüfen, dass `/vertrag-widerrufen/` noch da ist.
- [ ] Verzeichnisse wie in `deploy/WEBHOSTING.md`: `expose-backend/` und `expose-daten/` **neben** dem Webroot, Rechte 700/600.
- [ ] `config.php` aus der Vorlage, `'modus' => 'produktion'`; `geheimnisse.php` mit `geheimnisse-erzeugen.php` (Admin-Passwort ≥ 12 Zeichen, im Passwortmanager).
- [ ] vServer: `nginx-expose.conf` eingebunden, `log_format anon_ohne_query` und `limit_req_zone expose_abruf` im http-Kontext, `nginx -t`. Webhosting: `.user.ini`, `expose_php` aus, keine Server-CSP auf `/expose.php`.
- [ ] HTTPS mit gültigem Zertifikat, http → https; nach einer Woche HSTS auf `max-age=31536000` (nginx-Snippet und `'hsts'` in config.php).
- [ ] Admin-Übersicht: zusätzlich IP-Liste (`admin.ip_erlaubt`) oder Basic-Auth in nginx; Login einmal testen, Abmelden testen.
- [ ] Postfach `anfrage@roessler-immo.de`, SMTP in config.php, DKIM aktiv, DMARC `p=none` angelegt; Testmails an Gmail/GMX/Outlook: SPF/DKIM/DMARC PASS.
- [ ] Backup: Schlüsselpaar auf dem Laptop, Zertifikat auf dem Server, Cron aktiv; **einmal Wiederherstellung üben** (`backup.sh entschluesseln` + `nachweis-pruefen.php`), Abholung vom Server regelmäßig (rsync auf den Laptop oder externes Ziel).
- [ ] Cron: `loeschen.php --technik` täglich, `anker.php` täglich (optional `anker_an` mit Postfach bei anderem Anbieter), `loeschen.php --bericht` monatlich (erst Probelauf).
- [ ] Rauchtest aus `deploy/WEBHOSTING.md` (404 für Backend-Pfade, 301 auf https, Header vorhanden).
- [ ] Testanfrage mit eigener zweiter Adresse: „sofort“ und „nach Frist“, Link öffnen, Widerruf, Link gesperrt, Nachweis exportieren und mit `nachweis-pruefen.php --export … --anker <Prüfwert aus der Mail>` prüfen.
- [ ] Testvorgänge danach im Admin sperren bzw. mit `loeschen.php` entfernen; Tagesanker-Mail kommt an.
