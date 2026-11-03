# Exposé und Exposé-Freigabe

Stand: 3. November 2026. Eigenbau für roessler-immo.de: öffentliches Kurz-Exposé, Online-Maklervertrag mit Widerrufsbelehrung vor der Freigabe, druckbares Voll-Exposé, PHP-Backend mit Nachweisprotokoll und Widerrufsfunktion. Rechtliche Grundlagen mit Quellen: `../recherche/expose/recherche.md`.

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
| `backend/lib/kern.php` | Anfrage, Exposé-Auslieferung, Widerruf, manuelle Freigabe |
| `backend/config.beispiel.php` | Vorlage für die Server-Konfiguration |
| `tests/test.mjs` | Ende-zu-Ende-Test mit PHP-Server und Playwright |
| `screenshots/` | Ergebnis des letzten Testlaufs, inkl. `voll-expose-muster.pdf` |

## Ablauf für Interessenten

1. **Kurz-Exposé** `/objekte/<slug>/`: Fotos (nur die mit `oeffentlich: true`), Eckdaten, Lage ohne Adresse, Energieausweis-Pflichtangaben (§ 87 GModG), Käuferprovision. Knopf „Vollständiges Exposé anfordern“.
2. **Freigabe-Formular** `/objekte/<slug>/anfordern/`: Name, E-Mail, Telefon (freiwillig). Vertragstext und Widerrufsbelehrung zum Aufklappen und als eigene Seite. Häkchen, **keines vorausgewählt**: Maklervertrag mit Provision, Widerrufsbelehrung zur Kenntnis, Vertraulichkeit. Auswahl „Sofort“ oder „Nach Ablauf der Widerrufsfrist“; nur bei „Sofort“ zwei weitere Häkchen (Verlangen des vorzeitigen Beginns, Kenntnis von Wertersatz und Erlöschen). Kasten „Das bestellen Sie“ direkt vor der Schaltfläche **„zahlungspflichtig bestellen“** (§ 312j BGB, BGH I ZR 159/24). Datenschutz als Hinweis, nicht als Häkchen.
3. **E-Mail** an den Interessenten: Eingangs- und Vertragsbestätigung, Erklärungen im Wortlaut mit Fassung und Uhrzeit, Link zum Exposé, Vertragstext, Widerrufsbelehrung, Muster-Widerrufsformular, Datenschutzhinweis. E-Mail an Linus mit Kontaktdaten (ohne IP).
4. **Voll-Exposé** `/expose.php?t=…`: signierter, zeitlich begrenzter Link (Standard 30 Tage, bei „nach Frist“ erst ab dem 17. Tag gültig); Name des Empfängers auf jeder Seite; „Drucken oder als PDF speichern“.
5. **Vertrag widerrufen** `/vertrag-widerrufen/` (§ 356a BGB, Pflicht seit 19.06.2026): auf jeder Seite verlinkt; Schritt 1 Angaben, Schritt 2 „Widerruf bestätigen“; Eingangsbestätigung mit Datum und Uhrzeit per E-Mail; der Exposé-Link wird gesperrt.

Manuelle Freigabe (`freigabe.modus: manuell` in `firma.yaml` oder je Objekt): Der Interessent bekommt Vertrag und Belehrung sofort, den Link erst, wenn Linus in seiner E-Mail auf den Freigabe-Link klickt und dort „Exposé jetzt freigeben“ drückt.

## Neues Objekt anlegen und veröffentlichen (Schritt für Schritt)

Einmalig: Node 20 oder neuer installieren, im Ordner `expose/` `npm install` ausführen.

1. **Unterlagen einsammeln** (Checkliste unten). Ohne Energieausweis nicht inserieren.
2. **Ordner anlegen:** `cp -r objekte/_vorlage objekte/leonberg-eltingen-3-zimmer` (Ordnername wird die Adresse der Seite; keine Hausnummer, keine Umlaute).
3. **Fotos und Grundriss** nach `objekte/<ordner>/bilder/` kopieren. JPEG, höchstens 2000 Pixel breit, möglichst unter 600 kB. Für das Kurz-Exposé 3 bis 5 Fotos mit `oeffentlich: true` markieren; Fotos mit Bewohnern, Namen an Klingeln, Familienfotos weglassen.
4. **`objekt.yaml` ausfüllen.** Jede Angabe aus einer Unterlage übernehmen und die Quelle in die Belegfelder schreiben (`wohnflaeche_grundlage`, `ruecklage_quelle`, `beleg`). Energieausweis-Werte genau wie im Ausweis. Käuferprovision = Verkäuferprovision (sonst bricht der Generator ab, § 656c BGB) oder `0` für provisionsfrei.
5. **Texte ohne Floskeln:** statt „lichtdurchflutet“ die Himmelsrichtung und Fenstergröße, statt „hochwertig“ Material und Jahr, statt „zentrale Lage“ Minuten zu Fuß. Der Generator warnt bei Wörtern aus `lib/floskeln.json`.
6. **Vorschau bauen:** `npm run bauen`. Fehler (✗) beheben, Warnungen (!) lesen. Dann `npm test` (startet einen lokalen Server und macht Screenshots) oder selbst ansehen:
   `php -S 127.0.0.1:8765 -t dist/web tests/router.php` und im Browser `http://127.0.0.1:8765/objekte/<ordner>/`. (Für Formulartests vorher eine `dist/expose-backend/config.php` mit `'transport' => 'datei'` anlegen, siehe `tests/test.mjs`.)
7. **Voll-Exposé prüfen:** im Browser drucken (A4) und das PDF Seite für Seite durchlesen. Stimmen Adresse, Hausgeld, Rücklage, Energiewerte?
8. **Dem Verkäufer zur Freigabe schicken** (Kurz- und Voll-Exposé als PDF); seine Bestätigung ablegen.
9. **Freigeben:** in `objekt.yaml` `status: veroeffentlicht` setzen und `npm run bauen:produktion`. Der Lauf bricht ab, solange Marker offen sind.
10. **Hochladen** (netcup, per SFTP oder `rsync`):
    - `dist/web/*` in den Webroot (z. B. `~/roessler-immo/web/`, neben der Astro-Seite),
    - `dist/expose-backend/` nach `~/roessler-immo/expose-backend/` (**nicht** in den Webroot),
    - einmalig `expose-backend/config.php` aus `config.beispiel.php` anlegen (`chmod 600`), geheimen Schlüssel erzeugen, Datenordner `expose-daten/` anlegen (`chmod 700`).
11. **Testanfrage** mit eigener zweiter E-Mail-Adresse durchspielen, inklusive Widerruf.
12. **Portale:** `dist/is24/<ordner>.json` enthält die Werte für ImmoScout24 (Feldnamen der API). Im Portal als Kontaktweg auf die eigene Seite `/objekte/<ordner>/anfordern/` verweisen, damit alle Interessenten denselben belegten Ablauf durchlaufen.
13. **Reserviert/verkauft:** `status: reserviert` bzw. `verkauft` setzen und neu bauen. Das Formular verschwindet, bestehende Links zeigen bei „verkauft“ einen Hinweis.

### nginx (Ergänzung zur bestehenden Konfiguration, `bauplan/01-technik.md` 15)

```nginx
location = /anfrage.php  { limit_req zone=formulare burst=5; include fastcgi_php.conf; }
location = /widerruf.php { limit_req zone=formulare burst=5; include fastcgi_php.conf; }
location = /expose.php   { include fastcgi_php.conf; }
location = /freigabe.php { include fastcgi_php.conf; }
location ^~ /objekte/    { add_header X-Robots-Tag "noindex" always; }   # erst entfernen, wenn Objekte gefunden werden sollen
```

### Aufbewahrung und Löschung (Vorschlag, recherche.md 1.5)

Daten liegen in `expose-daten/` (außerhalb des Webroots): `nachweise/JJJJ-MM.jsonl` (Vertragsschlüsse mit Wortlaut, Version, Prüfwert, gekürzter IP und HMAC, User-Agent), `nachweise/mails/` (Kopie jeder Bestätigungs-Mail), `vorgaenge/`, `widerrufe/`, `zugriffe/`, `ratelimit/` (24 h), `log/`. Ohne Kauf löschen nach Ablauf des dritten Kalenderjahres nach dem letzten Kontakt; mit Kauf Rechnungsunterlagen 6 bis 8 Jahre, GwG-Daten 5 Jahre. Cron-Vorschlag:

```cron
20 3 * * * find ~/roessler-immo/expose-daten/ratelimit -type f -mmin +1440 -delete
25 3 * * * find ~/roessler-immo/expose-daten/log -type f -mtime +90 -delete
```

Die Löschung der Nachweise macht Linus einmal im Jahr bewusst (nicht automatisch, weil ein Kauf die Frist verlängert).

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
4. **Absender-Mail:** `anfrage@roessler-immo.de` anlegen (Envelope/DMARC wie `bauplan/02-formular-backend.md` 6.2), From-Name „Linus Rössler“, Antwort an `linus@roessler-immo.de`? PHPMailer ist dort ohnehin vorgesehen.
5. **Speicherort der Logs/Nachweise:** `~/roessler-immo/expose-daten/` auf dem netcup-Webspace? Wer macht das Backup (verschlüsselt, außerhalb des Servers)?
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
npm test             # Generator + php -S + Playwright, Screenshots nach screenshots/
```

Der Test prüft u. a.: keine Hausnummer im Kurz-Exposé, Energieausweis-Pflichtangaben, keine vorausgewählte Checkbox, Schaltflächentext, Fehlermeldungen am Feld, Vertragsschluss „sofort“ und „nach Frist“, Inhalt der Bestätigungs-Mail (Vertrag, Belehrung, Muster-Formular, Datenschutz), Nachweisprotokoll (Wortlaut, Fassung, SHA-256, IP nur gekürzt/HMAC), Voll-Exposé personalisiert, PDF-Export, gesperrter Link vor Fristablauf, manipulierte Tokens, Widerruf in zwei Schritten mit Eingangsbestätigung und Sperre, Honeypot, veraltete Vertragsfassung, fremder Origin, Formular ohne JavaScript, manuelle Freigabe, Rate-Limit, kein horizontales Scrollen auf 390 px.
