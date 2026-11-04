# Exposé und Exposé-Freigabe

Stand: 3. November 2026. Eigenbau für roessler-immo.de: öffentliches Kurz-Exposé, Online-Maklervertrag mit Widerrufsbelehrung vor der Freigabe, druckbares Voll-Exposé, PHP-Backend mit Nachweisprotokoll und Widerrufsfunktion. Rechtliche Grundlagen mit Quellen: `../recherche/expose/recherche.md`. Sicherheitskonzept, Befunde, Restrisiken und Checkliste vor dem Einsatz: **`SICHERHEIT.md`**. Einrichtung auf netcup: **`deploy/WEBHOSTING.md`**.

> **Alle Rechtstexte und der Ablauf sind Entwürfe. Vor dem ersten echten Objekt anwaltlich prüfen lassen** (Maklerrecht, Fernabsatz). Der Produktionslauf bricht ab, solange in einer Seite `[ENTWURF]`, `[LINUS]` oder `[ZU PRÜFEN]` steht.

## Was wo liegt

| Pfad | Inhalt |
|---|---|
| `firma.yaml` | Firmendaten, Kaufnebenkosten, Freigabe-Standard (automatisch/manuell, Gültigkeit, Button-Text) |
| `objekte/<slug>/objekt.yaml` + `bilder/` | ein Objekt; `_vorlage/` ist die leere Vorlage; `muster-leonberg-eltingen-3-zimmer/` ist ein **frei erfundenes Muster** |
| `rechtstexte/*.md` | Maklervertrag Käufer, Widerrufsbelehrung, Muster-Widerrufsformular, Datenschutzhinweis, Vertraulichkeit, GwG-Hinweis (mit Version) |
| `rechtstexte/bestaetigungen.yaml` | Wortlaut der Häkchen im Formular (eine Quelle für Formular, Backend und Nachweis) |
| `lib/generator.mjs` | erzeugt `dist/` aus allem oben |
| `assets/` | CSS (Farben und Schriften von roessler-immo.de), Formular-JavaScript, Druck-CSS |
| `backend/lib/kern.php` | Anfrage, Exposé-Auslieferung, Widerruf, manuelle Freigabe, Validierung, Rate-Limits, Header |
| `backend/lib/kette.php` | Nachweiskette (Hash-Kette, Schwärzen), ohne Abhängigkeit von der Konfiguration |
| `backend/lib/mail.php` | Mailaufbau und SMTP-Client (TLS, ohne Fremdbibliothek) |
| `backend/lib/admin.php` | Admin-Übersicht `/expose-admin.php`: Vorgänge, Freigabe, Sperre, Aufbewahrung, Nachweis-Export |
| `backend/werkzeuge/` | `nachweis-pruefen.php` (Streitfall), `loeschen.php` (Fristen, Cron), `anker.php` (Tagesanker, Cron) |
| `backend/config.beispiel.php` | Vorlage für die Server-Konfiguration (ohne Geheimnisse) |
| `deploy/` | nginx-Snippets, `WEBHOSTING.md`, `DNS-MAIL.md`, `geheimnisse-erzeugen.php`, `backup.sh`, `cron.txt`, `user.ini` |
| `tests/test.mjs` | Ende-zu-Ende- und Sicherheitstest mit PHP-Server und Playwright |
| `screenshots/` | Ergebnis des letzten Testlaufs, inkl. `voll-expose-muster.pdf` |

## Ablauf für Interessenten

1. **Kurz-Exposé** `/objekte/<slug>/`: Fotos (nur die mit `oeffentlich: true`), Eckdaten, Lage ohne Adresse, Energieausweis-Pflichtangaben (§ 87 GModG), Käuferprovision. Knopf „Vollständiges Exposé anfordern“.
2. **Freigabe-Formular** `/objekte/<slug>/anfordern/`: Name, E-Mail, Telefon (freiwillig). Vertragstext und Widerrufsbelehrung zum Aufklappen und als eigene Seite. Häkchen, **keines vorausgewählt**: Maklervertrag mit Provision, Widerrufsbelehrung zur Kenntnis, Vertraulichkeit. Auswahl „Sofort“ oder „Nach Ablauf der Widerrufsfrist“; nur bei „Sofort“ zwei weitere Häkchen (Verlangen des vorzeitigen Beginns, Kenntnis von Wertersatz und Erlöschen). Kasten „Das bestellen Sie“ direkt vor der Schaltfläche **„zahlungspflichtig bestellen“** (§ 312j BGB, BGH I ZR 159/24). Datenschutz als Hinweis, nicht als Häkchen.
3. **E-Mail** an den Interessenten: Eingangs- und Vertragsbestätigung, Erklärungen im Wortlaut mit Fassung und Uhrzeit, Link zum Exposé, Vertragstext, Widerrufsbelehrung, Muster-Widerrufsformular, Datenschutzhinweis. E-Mail an Linus mit Kontaktdaten (ohne IP).
4. **Voll-Exposé** `/expose.php?t=…`: signierter, zeitlich begrenzter Link (Standard 30 Tage, bei „nach Frist“ erst ab dem 17. Tag gültig); Name des Empfängers auf jeder Seite; „Drucken oder als PDF speichern“.
5. **Vertrag widerrufen** `/vertrag-widerrufen/` (§ 356a BGB, Pflicht seit 19.06.2026): auf jeder Seite verlinkt; Schritt 1 Angaben, Schritt 2 „Widerruf bestätigen“; Eingangsbestätigung mit Datum und Uhrzeit per E-Mail; der Exposé-Link wird gesperrt.

Manuelle Freigabe (`freigabe.modus: manuell` in `firma.yaml` oder je Objekt): Der Interessent bekommt Vertrag und Belehrung sofort, den Link erst, wenn Linus in seiner E-Mail auf den Freigabe-Link klickt (14 Tage gültig) und dort „Exposé jetzt freigeben“ drückt, oder in der Admin-Übersicht freigibt.

**Nachweis:** Jeder Schritt (Vertragsschluss, Bestätigungs-Mail, Freigabe, jeder Abruf, Widerruf, Eingangsbestätigung, Sperre, Löschung) wird als Eintrag einer Hash-Kette in `expose-daten/nachweise/JJJJ-MM.jsonl` geschrieben. Der Prüfwert des Vertragsschlusses steht in der Bestätigungs-Mail an den Interessenten; jede Nacht geht der Kettenkopf als „Tagesanker“ an Linus. Im Streitfall: Admin-Übersicht → Vorgang → Nachweis-Datei herunterladen, dann `php nachweis-pruefen.php --export <datei> --anker <Prüfwert aus der Mail>` (siehe `SICHERHEIT.md`, Abschnitt 3).

**Admin-Übersicht** `/expose-admin.php` (nur wenn ein Admin-Passwort-Hash eingerichtet ist): Liste der Vorgänge, Freigeben, Link sperren/entsperren, Aufbewahrung verlängern (Kauf), Nachweis als PDF (Browser-Druck) und als prüfbare JSON-Datei, Kettenprüfung. Eigenes Login mit Passwort-Hash, Sitzung 30 min, CSRF-Schutz, Sperre nach Fehlversuchen; zusätzlich IP-Liste oder Basic-Auth empfohlen.

## Neues Objekt anlegen und veröffentlichen (Schritt für Schritt)

Einmalig: Node 20 oder neuer installieren, im Ordner `expose/` `npm install` ausführen.

1. **Unterlagen einsammeln** (Checkliste unten). Ohne Energieausweis nicht inserieren.
2. **Ordner anlegen:** `cp -r objekte/_vorlage objekte/leonberg-eltingen-3-zimmer` (Ordnername wird die Adresse der Seite; keine Hausnummer, keine Umlaute).
3. **Fotos und Grundriss** nach `objekte/<ordner>/bilder/` kopieren. JPEG, höchstens 2000 Pixel breit, möglichst unter 600 kB. Für das Kurz-Exposé 3 bis 5 Fotos mit `oeffentlich: true` markieren; Fotos mit Bewohnern, Namen an Klingeln, Familienfotos weglassen.
4. **`objekt.yaml` ausfüllen.** Jede Angabe aus einer Unterlage übernehmen und die Quelle in die Belegfelder schreiben (`wohnflaeche_grundlage`, `ruecklage_quelle`, `beleg`). Energieausweis-Werte genau wie im Ausweis. Käuferprovision = Verkäuferprovision (sonst bricht der Generator ab, § 656c BGB) oder `0` für provisionsfrei.
5. **Texte ohne Floskeln:** statt „lichtdurchflutet“ die Himmelsrichtung und Fenstergröße, statt „hochwertig“ Material und Jahr, statt „zentrale Lage“ Minuten zu Fuß. Der Generator warnt bei Wörtern aus `lib/floskeln.json`.
6. **Vorschau bauen:** `npm run bauen`. Fehler (✗) beheben, Warnungen (!) lesen. Dann `npm test` (startet einen lokalen Server und macht Screenshots) oder selbst ansehen:
   `php -S 127.0.0.1:8765 -t dist/web tests/router.php` und im Browser `http://127.0.0.1:8765/objekte/<ordner>/`. (Für Formulartests vorher eine `dist/expose-backend/config.php` mit `'modus' => 'test'`, `'https_erzwingen' => false` und `'transport' => 'datei'` anlegen, siehe `basisKonfig` in `tests/test.mjs`.)
7. **Voll-Exposé prüfen:** im Browser drucken (A4) und das PDF Seite für Seite durchlesen. Stimmen Adresse, Hausgeld, Rücklage, Energiewerte?
8. **Dem Verkäufer zur Freigabe schicken** (Kurz- und Voll-Exposé als PDF); seine Bestätigung ablegen.
9. **Freigeben:** in `objekt.yaml` `status: veroeffentlicht` setzen und `npm run bauen:produktion`. Der Lauf bricht ab, solange Marker offen sind.
10. **Hochladen** (netcup, per SFTP oder `rsync`), Einzelheiten und Pfade für Webhosting und vServer in `deploy/WEBHOSTING.md`:
    - `dist/web/*` in den Webroot (neben der Astro-Seite, inklusive der `.htaccess`-Dateien),
    - `dist/expose-backend/` **neben** den Webroot (nie hinein; im Produktionsmodus verweigert der Code sonst den Start),
    - einmalig: `config.php` aus `config.beispiel.php` (`chmod 600`), Geheimnisse mit `php expose-backend/werkzeuge/geheimnisse-erzeugen.php expose-backend --admin-passwort --smtp-passwort`, Datenordner `expose-daten/` (`chmod 700`), Cron aus `deploy/cron.txt`, DKIM/DMARC nach `deploy/DNS-MAIL.md`.
    - **Wichtig:** `../deploy/deploy.sh` der Hauptseite löscht mit `--delete-after` sonst die Exposé-Dateien; Filterzeilen aus `deploy/WEBHOSTING.md` eintragen.
11. **Testanfrage** mit eigener zweiter E-Mail-Adresse durchspielen, inklusive Widerruf.
12. **Portale:** `dist/is24/<ordner>.json` enthält die Werte für ImmoScout24 (Feldnamen der API). Im Portal als Kontaktweg auf die eigene Seite `/objekte/<ordner>/anfordern/` verweisen, damit alle Interessenten denselben belegten Ablauf durchlaufen.
13. **Reserviert/verkauft:** `status: reserviert` bzw. `verkauft` setzen und neu bauen. Das Formular verschwindet, bestehende Links zeigen bei „verkauft“ einen Hinweis.

### nginx

Für den vServer: `deploy/nginx-expose.conf` und `deploy/nginx-expose-php.conf` (eigene locations für die fünf PHP-Endpunkte, Limits, Access-Log ohne Token, Header). In `../deploy/nginx-roessler-immo.conf` steht der Include-Hinweis. Für netcup Webhosting ohne eigene nginx-Konfiguration setzt PHP alle Header selbst; die statischen Seiten haben eine Meta-CSP und `.htaccess`-Dateien.

### Aufbewahrung, Löschung, Backup (Vorschlag, recherche.md 1.5)

Daten liegen in `expose-daten/` (außerhalb des Webroots, Rechte 700/600): `nachweise/JJJJ-MM.jsonl` (Hash-Kette: Vertragsschlüsse mit Wortlaut, Version, Prüfwert, gekürzter IP und HMAC, User-Agent; Bestätigungen; Abrufe; Widerrufe), `nachweise/mails/` (Kopie jeder Bestätigungs-Mail, SHA-256 in der Kette), `vorgaenge/`, `ratelimit/` (24 h), `sitzungen/` (Admin), `log/` (ohne Personendaten, 90 Tage).

- `werkzeuge/loeschen.php`: Frist Ende des 3. Kalenderjahres nach dem letzten Kontakt **[ZU PRÜFEN]**; mit „Aufbewahren bis“ (Admin, z. B. bei Kauf: Rechnung 6–8 Jahre, GwG 5 Jahre) länger. Ohne `--ausfuehren` nur Probelauf. Gelöscht werden Vorgangsdatei und Mail-Kopien; in der Kette werden die Inhalte geschwärzt, die Prüfwerte bleiben, die Kette bleibt prüfbar.
- `deploy/backup.sh`: täglich verschlüsselt (öffentlicher Schlüssel auf dem Server, privater nur auf dem Laptop), 30 Stände; Abholung und Wiederherstellungstest siehe Skriptkopf.
- Cron-Zeilen: `deploy/cron.txt`.

## Checkliste: Unterlagen und Angaben vom Verkäufer

Vor der Vermarktung (Pflicht):
- [ ] Unterschriebener Maklervertrag mit dem Verkäufer (Textform), Provision 2,98 % inkl. USt, Widerrufsbelehrung erteilt
- [ ] GwG: Verkäufer spätestens bei ernsthaftem Kaufinteresse identifizieren (Ausweis, Kopie), besser gleich beim Termin
- [ ] **Energieausweis** (gültig; sonst vor Inserat ausstellen lassen, § 80 Abs. 3 GModG): Art, Kennwert, Energieträger, Baujahr, Klasse, Ausstellungsdatum
- [ ] Grundbuchauszug (aktuell): Eigentümer, Belastungen Abteilung II/III
- [ ] Teilungserklärung mit Aufteilungsplan und Gemeinschaftsordnung (Sondernutzungsrechte, Verwalterzustimmung?)
- [ ] Wohnflächenberechnung (Grundlage: WoFlV? Balkon wie angerechnet?)
- [ ] Grundriss (eigener oder mit Nutzungsrecht)
- [ ] Hausgeldabrechnung/Wirtschaftsplan aktuell, Jahresabrechnung Vorjahr
- [ ] Vermögensbericht mit Stand der Erhaltungsrücklage (§ 28 Abs. 4 WEG)
- [ ] Protokolle der Eigentümerversammlungen der letzten 3 Jahre, Beschluss-Sammlung
- [ ] Beschlossene oder diskutierte Maßnahmen, Sonderumlagen (bezahlt/offen)
- [ ] Name und Kontakt der Hausverwaltung, Vollmacht zur Auskunft
- [ ] Bei Vermietung: Mietvertrag, Mieterhöhungen, Kaution, Kündigungen; Zustimmung des Mieters zu Fotos und Besichtigungen
- [ ] Rechnungen/Belege für Modernisierungen (Jahr, Umfang)
- [ ] Bekannte Mängel, Schäden, Feuchtigkeit, Streit in der Gemeinschaft (schriftlich vom Verkäufer)
- [ ] Fotos: selbst gemacht oder Nutzungsrecht schriftlich (§ 72 UrhG), Freigabe des Verkäufers

Für das Exposé hilfreich:
- [ ] Stellplatz (Art, Nummer, Kaufpreis, im Kaufpreis?), Keller (Nummer, Fläche)
- [ ] Einbauküche, Zubehör, was bleibt in der Wohnung
- [ ] Bezugstermin, Bindungen (Wohnungsbindung, Vorkaufsrechte)
- [ ] Altlasten, Baulasten (bei WEG selten relevant), Denkmalschutz
- [ ] Entfernungen messen (Weg und Minuten, Quelle notieren)

## Offene Fragen an Linus

1. **Käuferprovision ja oder nein, und wie hoch?** Vorschlag: 2,98 % inkl. USt wie beim Verkäufer (Doppeltätigkeit; § 656c BGB verlangt gleiche Höhe). Alternative: provisionsfrei für Käufer (`kaeufer_prozent: 0`; dann kein Maklervertrag mit dem Käufer, Formulierung anwaltlich prüfen wegen § 656c Abs. 1 Satz 2).
2. **Postanschrift** für Widerrufsbelehrung, Datenschutzhinweis und Impressum (`firma.yaml: anschrift`). Ohne sie ist die Muster-Belehrung nicht korrekt ausgefüllt.
3. **Erlaubnisbescheid:** ausstellende IHK und Datum (`firma.yaml: erlaubnis`).
4. **Absender-Mail:** `anfrage@roessler-immo.de` anlegen (Envelope/DMARC wie `bauplan/02-formular-backend.md` 6.2, DKIM/DMARC nach `deploy/DNS-MAIL.md`), From-Name „Linus Rössler“, Antwort an `linus@roessler-immo.de`? Versand per SMTP mit eingebautem Client (kein PHPMailer nötig, Begründung in `SICHERHEIT.md`).
5. **Speicherort und Backup:** `expose-daten/` neben dem Webroot; Backup verschlüsselt mit `deploy/backup.sh`. Wohin wird es abgeholt (Laptop, externer Speicher), und wer übt einmal die Wiederherstellung? Zweites Postfach bei einem anderen Anbieter für den Tagesanker?
6. **Freigabe automatisch oder manuell?** Standard ist automatisch. Manuell gibt Kontrolle über jede Anfrage, kostet aber Reaktionszeit.
7. **Telefon Pflicht?** Derzeit freiwillig (Datenminimierung). Pflicht nur, wenn Sie wirklich jeden anrufen.
8. **IP im Nachweis:** gekürzt + HMAC (Standard), nur gekürzt oder gar nicht? Bitte mit der Anwältin entscheiden.
9. **Exposé „sofort“ ohne Wahl?** Der Bau lässt den Interessenten wählen. Wenn Sie nur „sofort“ anbieten wollen, ist das eine Zeile in `bestaetigungen.yaml`; anwaltlich klären.
10. **Datenschutz-Aufsicht** je nach Sitz (LfDI BW oder BayLDA).
11. **Fotograf/Grundriss-Dienst** für das erste Objekt? Nutzungsrechte schriftlich auch für Portale und Druck.
12. **Anwalt:** wer prüft Maklervertrag Käufer, Widerrufsbelehrung, Button-Text, Ablauf „sofort/nach Frist“ und die Wertersatz-Frage (recherche.md 1.4)?

## Tests

```bash
cd expose
npm install          # einmalig (yaml); Playwright und php müssen installiert sein
npm test             # Generator + php -S (4 Worker) + Playwright, Screenshots und PDFs nach screenshots/
```

Der Test (240+ Prüfungen) deckt ab: Inhalte (keine Hausnummer im Kurz-Exposé, Energieausweis, keine vorausgewählte Checkbox, Schaltflächentext, Fehlermeldungen am Feld), Vertragsschluss „sofort“, „nach Frist“, ohne JavaScript und mit manueller Freigabe, Bestätigungs-Mail (Vertrag, Belehrung, Muster-Formular, Datenschutz, Prüfwert), Nachweiskette, Voll-Exposé mit PDF, Widerruf in zwei Schritten mit Eingangsbestätigung und Sperre, und die Sicherheitsfälle: manipulierte, abgelaufene, fremde und gefälschte Tokens, IDOR, Pfad-Traversal (auch rohe `../`-Pfade), CRLF-/Header-Injektion, XSS in Formular, Widerruf, Exposé und Admin, fehlende Häkchen per direktem POST, Replay, Mindestzeit, Massen-POSTs (25 parallel), globales Limit, Speicherprüfung, überlange Felder, Uploads, Sicherheits-Header und CSP-Verstöße im Browser, Fehler ohne Stack-Trace, HTTPS-Zwang, Race Condition Widerruf/Abruf, Admin (Login, Brute Force, Sitzung, CSRF, Export als JSON und PDF), Manipulation von Kette, Export und Mail-Kopien, Löschlauf, verschlüsseltes Backup mit Wiederherstellung, Geheimnisse, SMTP-Client (Punkt-Maskierung, ein Empfänger) und ein kompletter Ende-zu-Ende-Ablauf bis zur geprüften Nachweis-Datei.
