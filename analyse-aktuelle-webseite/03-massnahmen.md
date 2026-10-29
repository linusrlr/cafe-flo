# Maßnahmenliste für roessler-immo.de (priorisiert)

**Stand:** 29.10.2026. Grundlage: `01-analyse.md` und `02-wettbewerb.md`.
**Zielgruppe dieser Datei:** eine spätere Claude-Session (oder Linus/Annika), die die Punkte direkt umsetzt, sobald der Quellcode der Seite im Repo liegt.

**Wichtige Rahmenbedingungen für die Umsetzung:**
- Der Code der Live-Seite liegt noch nicht im Repo (kommt nach dem Urlaub). Die Seite ist derzeit **eine statische HTML-Datei** (`index.html`, 45 KB, Inline-CSS, ein Inline-Script, `kontakt.php` als Formular-Backend, Bilder unter `bilder/`), gehostet bei netcup (nginx, vermutlich Plesk). Kein Build-System, kein CMS.
- Empfehlung: **Beim Umbau auf mehrere echte HTML-Seiten bleiben** (statisch, ohne Framework) – das ist für SEO, Ladezeit, Datenschutz und Wartbarkeit die beste Lösung für eine 6-Seiten-Site. Nur wenn Blog/Ortsseiten stark wachsen, lohnt ein Static-Site-Generator (z. B. Astro oder Eleventy). Das vorhandene Next.js-Projekt (Café Flo) sollte **nicht** als Basis dienen; es ist unnötig schwer für diesen Zweck.
- Jede Maßnahme hat: **Was**, **Warum**, **Wie (konkret)**, **Aufwand** (S < 1 h, M = halber Tag, L = 1–3 Tage), **Abhängigkeit**.
- Die Marker `[CODE]`, `[TEXT]`, `[LINUS]`, `[EXTERN]` zeigen, ob eine Session es im Code lösen kann, ob Text geschrieben werden muss, ob Linus etwas liefern muss (Foto, Nummer, Entscheidung) oder ob es außerhalb der Website passiert.

---

## Priorität HOCH (vor oder direkt mit dem Relaunch)

### H1. § 34c-Hinweis entfernen, sobald die Erlaubnis erteilt ist `[LINUS]` `[CODE]` – Aufwand S
- **Warum:** Der Hinweis steht dreimal (Hero, Kontakt-Band, Impressum fett) und sagt jedem Verkäufer „noch nicht im Geschäft“. Er ist die größte Konversionsbremse der Seite.
- **Wie:** Am Tag der Erteilung (1) Hero-Absatz `.hinweis` löschen, (2) Hinweis im Kontakt-Band löschen, (3) Impressum-Absatz ersetzen durch: „Erlaubnis nach § 34c Abs. 1 Satz 1 Nr. 1 GewO, erteilt am TT.MM.JJJJ durch [Behörde], Aktenzeichen […]“. (4) In der Datenschutzerklärung bleibt alles gleich.
- **Bis dahin:** Hinweis **nur im Impressum** fett lassen und im Hero auf einen Satz kürzen: „Erlaubnis nach § 34c GewO beantragt – Erstgespräch und Einschätzung sind schon jetzt möglich.“ Der Kontakt-Band-Hinweis kann weg, weil das Impressum verlinkt ist. *(Rechtliche Mindestanforderung: keine Maklerleistung vor Erteilung – ein Gespräch und eine unverbindliche Einschätzung gelten gemeinhin nicht als Maklerleistung; im Zweifel mit der IHK abstimmen.)*
- **Abhängigkeit:** Erteilung durch IHK München.

### H2. Google Fonts lokal hosten `[CODE]` – Aufwand S
- **Warum:** Abmahnrisiko (LG München I, 3 O 17493/20). Außerdem 1 externer Request weniger → schnellere Ladezeit.
- **Wie:** Instrument Sans (500/600/700) und Libre Franklin (400/500/600) als WOFF2 herunterladen (beide SIL OFL, z. B. via google-webfonts-helper oder direkt von den Font-Repos), unter `/fonts/` ablegen, `@font-face` mit `font-display: swap` in das CSS, den `<link href="https://fonts.googleapis.com/…">` entfernen. Absatz „Schriftarten“ in der Datenschutzerklärung streichen und stattdessen ergänzen: „Diese Website setzt keine Cookies und bindet keine Dienste Dritter ein. Schriften werden vom eigenen Server geladen.“
- **Prüfung:** Nach dem Umbau darf im Network-Tab kein Request an `googleapis.com`/`gstatic.com` mehr auftauchen.

### H3. Echte Unterseiten mit eigenen URLs statt JS-Views `[CODE]` – Aufwand M–L
- **Warum:** Google indexiert derzeit genau eine URL mit einem Title. Jede Unterseite braucht eigenen Title, Description, H1 und URL, sonst ist lokales SEO unmöglich. Zusätzlich: teilbare Links, funktionierende Zurück-Taste, echte `<a>`-Navigation für Screenreader.
- **Wie:** Aus `index.html` sechs Dateien machen:
  - `/` (Start) – Title: „Wohnung verkaufen in Heimsheim, Leonberg & Pforzheim | Rössler Immobilien“
  - `/wohnung-verkaufen/` – Title: „Wohnung verkaufen mit schriftlichem Verkaufsplan – Ablauf, Kosten, FAQ | Rössler Immobilien“
  - `/direktankauf/` – Title: „Direktankauf: Eigentumswohnung ohne Vermarktung verkaufen | Rössler Immobilien“
  - `/ueber-mich/` – Title: „Linus Rössler – Immobilienmakler für Eigentumswohnungen im Raum Leonberg“
  - `/kontakt/` – Title: „Kontakt & kostenlose Ersteinschätzung | Rössler Immobilien“
  - `/impressum/`, `/datenschutz/`
  - Gemeinsamer Header/Footer: entweder per Copy (6 Dateien, akzeptabel) oder per einfachem Build-Schritt (z. B. ein 30-Zeilen-Node-Script, das Partials einsetzt; oder Eleventy).
  - Navigation auf `<a href="/wohnung-verkaufen/">` umstellen; `aria-current="page"` serverseitig/statisch setzen. Das `show()`-JavaScript entfällt komplett; nur Burger-Menü und Formular-Script bleiben.
  - **Redirects** für die alten Hash-Links sind nicht nötig (Hashes erreichen den Server nicht), aber ein kleines Script auf der Startseite kann `#verkaufen` → `/wohnung-verkaufen/` weiterleiten, falls alte Links kursieren.
  - Pro Seite: eigene `<meta name="description">`, `<link rel="canonical">`, Open-Graph-Tags (`og:title`, `og:description`, `og:image` mit 1200×630-Bild, `og:locale="de_DE"`).
  - `sitemap.xml` anlegen und in `robots.txt` verlinken (`Sitemap: https://roessler-immo.de/sitemap.xml`).
  - www → non-www per 301 (in Plesk „Bevorzugte Domain“ oder nginx-Regel).
- **Abhängigkeit:** Quellcode im Repo.

### H4. „Kostenlose Ersteinschätzung“ als Haupteinstieg + mehrstufiges Formular `[CODE]` `[TEXT]` – Aufwand M
- **Warum:** Alle Wettbewerber und der Markt sprechen von „kostenloser Bewertung“. Rössler bietet genau das (Preisspanne + Verkaufsplan), nennt es aber nicht so und hat keinen niedrigschwelligen Einstieg. Mehrstufige Formulare (Objektdaten zuerst, Kontakt zuletzt) konvertieren besser als einstufige.
- **Wie:**
  1. Primär-CTA überall umbenennen: „Verkauf besprechen“ → **„Kostenlose Ersteinschätzung anfragen“** (oder „Preisspanne für meine Wohnung anfragen“). „Verkauf besprechen“ als Sekundär-Variante nur auf der Verkaufen-Seite behalten.
  2. Neue Seite `/wohnung-einschaetzen/` (oder das Formular auf `/kontakt/` umbauen) mit 3 Schritten:
     - **Schritt 1 – Wohnung:** Ort (Select mit den 5 Orten + „anderer Ort“), Wohnfläche, Zimmer, Baujahr (ca.), Zustand (Select: renoviert / normal / renovierungsbedürftig), vermietet/frei/wird frei.
     - **Schritt 2 – Vorhaben:** Was Sie vorhaben (verkaufen lassen / Ankauf prüfen / orientieren), Zeitrahmen (sofort / 3–6 Monate / später / offen), **Anlass** (optional: Umzug, Erbschaft, Scheidung, Kapitalanlage auflösen, sonstiges).
     - **Schritt 3 – Kontakt:** Name, Telefon **oder** E-Mail (eines Pflicht, JS- und serverseitig prüfen), Nachricht optional, Datenschutz-Hinweis. Button: „Einschätzung anfordern“.
     - Fortschrittsanzeige „Schritt 1 von 3“; alles ohne Framework in ~80 Zeilen JS, ohne Seitenwechsel; `kontakt.php` um die neuen Felder erweitern.
  3. Neben dem Formular das **Versprechen**: „Sie erhalten innerhalb von 2 Werktagen eine telefonische Rückmeldung mit einer ersten Preisspanne. Kostenlos, unverbindlich, ohne Vertragsbindung.“ (Zeitraum mit Linus abstimmen `[LINUS]`.)
  4. **Danke-Seite** `/danke/` mit nächsten Schritten („Was jetzt passiert: 1. Ich sehe mir Ihre Angaben an … 2. … 3. …“) und Unterlagen-Checkliste (siehe M4). Die Danke-Seite ist später auch der Messpunkt für Konversionen.
  5. Im Hero zwei gleichwertige Wege wie bei Homeday: „Kostenlose Ersteinschätzung“ (Formular) und „Direkt anrufen: 0159 …“.
- **Abhängigkeit:** H3 (eigene Seiten), `kontakt.php`-Zugriff.

### H5. Google Business Profile anlegen und verlinken `[LINUS]` `[EXTERN]` – Aufwand S (+ Wartezeit Verifizierung)
- **Warum:** Für „Immobilienmakler Leonberg“ zeigt Google zuerst die Karten-Box mit drei Profilen. Ohne Profil ist Rössler dort unsichtbar. Es ist auch der Ort, an dem Bewertungen gesammelt werden (siehe H6).
- **Wie:** Profil als „Dienstleister ohne Ladengeschäft“ mit **Einzugsgebiet** (Heimsheim, Leonberg, Ditzingen, Renningen, Pforzheim) anlegen – die Impressum-Adresse muss dann nicht öffentlich sein, aber Google braucht eine Postadresse zur Verifizierung. Kategorie „Immobilienmakler“, Telefon, Website, Öffnungs-/Erreichbarkeitszeiten, Porträt und 3–5 Fotos, Leistungsbeschreibung mit den Keywords. Link zum Profil auf der Website (Footer, Über-mich).
- **Hinweis:** Wenn Linus einen Wohnsitz oder eine c/o-Adresse im Gebiet hat, die Verifizierung darüber laufen lassen; ein Postfach genügt Google nicht.

### H6. Vertrauensbeweise einbauen `[LINUS]` `[TEXT]` `[CODE]` – Aufwand M (laufend)
- **Warum:** Kein einziger Beleg auf der Seite, dass andere zufrieden waren oder dass Linus qualifiziert ist. Alle Wettbewerber haben mindestens Bewertungen oder Siegel.
- **Wie, in dieser Reihenfolge:**
  1. **Qualifikationen sichtbar machen** (sofort möglich): Wirtschaftsingenieur-Abschluss (Hochschule nennen), bisherige Stationen (Projektcontrolling, Wohnungsbewertung – bei welchem Arbeitgeber/welcher Art Unternehmen, soweit nennbar), ggf. IHK-Sachkundeprüfung/Weiterbildungen (z. B. „Geprüfter Immobilienmakler (IHK)“ – falls nicht vorhanden, in Erwägung ziehen `[EXTERN]`). Als Liste mit Icons auf „Über mich“ und als Kurzzeile unter dem Hero („Wirtschaftsingenieur · Erfahrung in Wohnungsbewertung · selbst Eigentümer“).
  2. **Erste Stimmen** (sobald Gespräche stattfinden, auch vor dem ersten Verkauf): Verkäufer um 2–3 Sätze bitten, die die Erst­einschätzung/den Verkaufsplan bewerten („Herr Rössler hat mir in 30 Minuten erklärt, was meine Wohnung realistisch wert ist und warum.“ – Vorname, Ort). Mit Einwilligung veröffentlichen.
  3. **Google-Bewertungen** aktiv einsammeln (Link per E-Mail nach jedem Erstgespräch) und auf der Seite mit Zahl + Link zeigen („4,9 ★ bei Google – 12 Bewertungen“) – **nur echte Werte, nichts erfinden**.
  4. **Referenzen „verkauft“** nach den ersten Abschlüssen, anonymisiert: Objektart, Ort, m², Vermarktungsdauer, ggf. „Verkaufspreis über Angebotspreis“.
  5. Eine Zeile im Kontakt-Band: „Ihr Ansprechpartner von Anfang bis Ende – kein Callcenter, kein Wechsel.“

### H7. Bilder optimieren `[CODE]` – Aufwand S
- **Warum:** 1,6 MB Bilder, alle sofort geladen, auch die in unsichtbaren Views; kein Lazy-Loading, kein responsives Format, keine Größenangaben (Layout-Shift).
- **Wie:** Alle JPEGs in WebP (und optional AVIF) konvertieren in drei Breiten (480/960/1600), `<img src width height loading="lazy" decoding="async" srcset sizes>` (Hero-Bild: `loading="eager"` + `fetchpriority="high"`). Ziel: < 400 KB Gesamtgewicht auf Mobil beim ersten Aufruf. Beispielkommando: `cwebp -q 80 neubau.jpg -o neubau.webp` bzw. `sharp`-Script.

---

## Priorität MITTEL (in den ersten Wochen nach dem Relaunch)

### M1. Lokale Inhalte: fünf Ortsseiten `[TEXT]` `[CODE]` – Aufwand L
- **Warum:** „Wohnung verkaufen Leonberg“ wird nie auf eine Seite ranken, die „Leonberg“ nur in einer Chip-Liste nennt. Von Poll und Gäu haben Ortsseiten; Von Poll sogar Stadtteil-Beschreibungen.
- **Wie:** `/wohnung-verkaufen/leonberg/`, `/…/heimsheim/`, `/…/ditzingen/`, `/…/renningen/`, `/…/pforzheim/`. Pro Seite 400–700 Wörter mit: typische Wohnungsbestände (Baujahre, Siedlungen, Neubaugebiete), Käufergruppen (Pendler nach Stuttgart/Bosch/Porsche, Anleger), Preisniveau-Spanne (Quelle: Gutachterausschuss-Bodenrichtwerte/Grundstücksmarktbericht, immowelt/IS24-Preisspiegel – **mit Quelle und Datum**, nicht geschätzt), Besonderheiten (S-Bahn-Anschluss, Hochschule Pforzheim, Heimsheim als Enzkreis-Lage), 2–3 lokale FAQ, CTA. **Ein eigenes Foto pro Ort** (siehe M3). Title-Schema: „Wohnung verkaufen in Leonberg – Makler mit schriftlichem Verkaufsplan | Rössler Immobilien“.
- **Wichtig:** Texte müssen unterschiedlich sein, nicht Ortsname-austauschen (Google erkennt Doorway-Pages).

### M2. Strukturierte Daten (JSON-LD) `[CODE]` – Aufwand S
- `RealEstateAgent` (name, telephone, email, url, image, areaServed: die 5 Orte, address nur wenn gewünscht, `priceRange`, `openingHoursSpecification` für Erreichbarkeit), `Person` für Linus, `FAQPage` für die 14 FAQs (ergibt Rich Snippets), `BreadcrumbList` auf Unterseiten. Mit dem Google Rich-Results-Test prüfen.

### M3. Eigene Bildwelt `[LINUS]` – Aufwand M (Fototermin)
- **Warum:** Aktuelle Bilder sind ortlose Symbolbilder. Verkäufer aus Leonberg erkennen nichts wieder.
- **Wie:** Ein halber Tag mit Fotograf oder guter Kamera: (1) Linus vor erkennbaren Motiven in Leonberg (Marktplatz), Heimsheim (Schloss/Schleglerschloss), Pforzheim, Ditzingen, Renningen; (2) 2–3 Arbeitsbilder (Gespräch am Tisch mit Unterlagen, Besichtigung, Handy/Notizen); (3) typische Wohnhaus-Fassaden aus den 70ern/80ern und Neubauten aus den Orten – das sind die Objekte, um die es geht. Hero-Bild: Linus + Ortsmotiv, nicht Stock-Neubau.

### M4. Lead-Magnet: Unterlagen-Checkliste als PDF `[TEXT]` `[CODE]` – Aufwand S
- Die FAQ-Antwort „Welche Unterlagen werden gebraucht?“ als einseitige PDF-Checkliste („Checkliste: Unterlagen für den Wohnungsverkauf – mit Hinweis, wo man sie bekommt“) gestalten. Download ohne E-Mail-Pflicht (Vertrauen > Lead-Erpressung), aber mit dezentem Hinweis „Fragen? 0159 …“. Verlinkt auf Verkaufen-Seite, Danke-Seite und in Ortsseiten.

### M5. Mobile Kontaktleiste `[CODE]` – Aufwand S
- Unter 840 px eine fixierte untere Leiste mit zwei Buttons: „Anrufen“ (`tel:`) und „Einschätzung anfragen“ (Link zum Formular). Auf der Formularseite selbst ausblenden. Alternativ die Telefonnummer links vom Burger-Icon als Icon-Link zeigen. Zusätzlich **WhatsApp-Link** (`https://wa.me/4915905844641?text=…`) erwägen, falls Linus WhatsApp Business nutzen möchte `[LINUS]`; in der Datenschutzerklärung dann einen Absatz zu WhatsApp (Meta) ergänzen.

### M6. Startseite straffen und Hero schärfen `[TEXT]` `[CODE]` – Aufwand S
- Hero: Headline behalten („Ihre Wohnung verkaufen. Mit einem klaren Plan.“), Lede auf 2 Sätze kürzen, darunter **drei Bullet-Belege** („Schriftlicher Verkaufsplan mit Preisspanne“, „2,98 % Provision je Seite – nur bei Erfolg“, „Ein Ansprechpartner von Gespräch bis Übergabe“), dann CTA-Paar.
- Die 3 Karten „Was wir vor dem Verkauf klären“ behalten, die 2 Karten „Vermittlung und Direktankauf“ zu einem kurzen Absatz mit Link zusammenziehen (Direktankauf ist Option B, nicht gleichrangig). Ortsblock bleibt, aber mit Links auf die Ortsseiten (M1). Kontakt-Band bleibt.
- Mobil-Ziel: Startseite < 6 Bildschirmhöhen.

### M7. Erreichbarkeit und Reaktionsversprechen `[LINUS]` `[TEXT]` – Aufwand S
- Erreichbarkeitszeiten nennen („Mo–Sa 9–19 Uhr, auch abends nach Absprache“), Rückmeldeversprechen („innerhalb von 24 h / 2 Werktagen“). Im Kontakt-Band, im Footer und im Google-Profil identisch.

### M8. Texte konsolidieren `[TEXT]` – Aufwand S
- „Immobilie verkaufen“ (Nav) → „Wohnung verkaufen“ (Positionierung konsequent). H1 der Verkaufen-Seite: „Ihren Wohnungsverkauf begleite ich mit einem schriftlichen Plan.“ Buttons vereinheitlichen („Mein Ablauf“ vs. „Ablauf ansehen“). Im Impressum „Berufsbezeichnung: Immobilienmakler (verliehen in …)“ ersetzen durch „Tätigkeit: Immobilienmakler nach § 34c GewO“. USt-Formulierung mit Steuerberater klären (Kleinunternehmer vs. Regelbesteuerung; dann ggf. „Kleinunternehmer gemäß § 19 UStG, es wird keine Umsatzsteuer ausgewiesen“ – das würde allerdings die Provisionsangabe „einschließlich Umsatzsteuer“ ändern) `[LINUS]`.

### M9. Server-Konfiguration `[CODE]` `[LINUS]` (Plesk-Zugang) – Aufwand S
- `Cache-Control: public, max-age=31536000, immutable` für `/fonts/`, `/bilder/`, CSS; `max-age=3600` für HTML. Gzip/Brotli prüfen (`curl -H "Accept-Encoding: br" -I`). Security-Header: `Strict-Transport-Security: max-age=31536000`, `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, `Permissions-Policy: camera=(), microphone=(), geolocation=()`, eine einfache `Content-Security-Policy` (`default-src 'self'; img-src 'self' data:; style-src 'self' 'unsafe-inline'; script-src 'self' 'unsafe-inline'`). Eigene deutsche 404-Seite (`/404.html`, in Plesk/nginx als `error_page 404` eintragen) mit Navigation.

### M10. Formular-Validierung und Mail-Qualität `[CODE]` – Aufwand S
- Telefon **oder** E-Mail Pflicht (HTML `required` lässt sich hier nicht nutzen → JS-Check + serverseitig in `kontakt.php`). Fehlermeldungen pro Feld statt nur global. Nach Erfolg Redirect auf `/danke/` (statt Text im Formular). In `kontakt.php`: Absender-Reply-To auf die Nutzer-E-Mail setzen, Betreff „Anfrage Wohnung {Ort}, {m²}, {Status}“ – damit Linus auf dem Handy sofort sieht, worum es geht. Auto-Antwort an den Nutzer erwägen („Danke, ich melde mich bis …“).

---

## Priorität NIEDRIG (nice to have, nach den ersten Verkäufen)

### N1. Ratgeber/Blog `[TEXT]` – Aufwand L (laufend)
- 1 Artikel/Monat zu Verkäufer-Fragen mit lokalem Bezug: „Vermietete Wohnung verkaufen: Was Anleger in Leonberg zahlen“, „Spekulationsfrist bei Eigentumswohnungen – Beispiele“, „Sonderumlage beschlossen – jetzt verkaufen oder warten?“, „Energieausweis für die WEG: wer besorgt ihn?“. Die FAQ liefern bereits die Themen. Jeder Artikel endet mit dem Ersteinschätzungs-CTA.

### N2. Markenzeichen und Farbakzent `[EXTERN]` – Aufwand M
- Ein einfaches Bildzeichen (z. B. stilisiertes „R“ oder Grundriss-Motiv) und eine Akzentfarbe für CTAs (ein warmes Ocker/Kupfer auf dem Navy würde die Buttons deutlich sichtbarer machen). Favicon als PNG/ICO-Set ergänzen (Safari/alte Browser), `og:image` mit Logo.

### N3. Marktbericht Eigentumswohnungen `[TEXT]` – Aufwand M (jährlich)
- Einseitiger Bericht pro Jahr: Preisspannen für ETW in den 5 Orten (Gutachterausschuss, Portale), Vermarktungsdauern, Zinsumfeld. Als PDF und Seite. Starkes Argument für Fachkompetenz und ein natürlicher Grund für Lokalpresse/Backlinks.

### N4. Verzeichniseinträge und Backlinks `[EXTERN]` – Aufwand S (einmalig)
- Jacasa, Immoportal, 11880, Gelbe Seiten, werkenntdenBESTEN, IHK-Maklerverzeichnis, Immoscout-Anbieterprofil (sobald erstes Objekt inseriert ist). Überall identische Daten (Name, Telefon, Website, Gebiet) wie im Google-Profil (NAP-Konsistenz).

### N5. Direktankauf schärfer rahmen `[TEXT]` – Aufwand S
- Direktankauf als „Option für Sonderfälle: schneller Verkauf, keine Besichtigungen, vermietet oder renovierungsbedürftig“ positionieren; die Vergleichstabelle Vermittlung/Direktankauf um eine Zeile „Preis“ ergänzen („marktnah“ vs. „unter Marktpreis, dafür sicher und schnell“) – diese Ehrlichkeit ist bereits im Text, aber nicht in der Tabelle. Prüfen, ob Direktankauf überhaupt Nav-Punkt bleiben oder als Unterpunkt von „Wohnung verkaufen“ laufen soll `[LINUS]`.

### N6. Barrierefreiheit `[CODE]` – Aufwand S
- Skip-Link („Zum Inhalt springen“), Fokus nach Seitenwechsel auf `<main>` setzen (entfällt mit echten Seiten weitgehend), Tap-Ziele der Karten-Links auf ≥ 44 px (Karte komplett verlinken), Sekundär-Button-Rahmen dunkler (`--fg-soft` statt `--line`), `prefers-reduced-motion` respektieren. Danach mit Lighthouse/axe prüfen (Ziel: Accessibility ≥ 95).

### N7. Messung ohne Cookies `[CODE]` – Aufwand S
- Wenn Konversionen gemessen werden sollen: serverseitige Log-Auswertung (z. B. GoAccess) oder ein cookieloses, datenschutzfreundliches Tool mit Hosting in der EU (z. B. Plausible selbst gehostet). Kein Google Analytics – damit bleibt die Seite ohne Cookie-Banner. Datenschutzerklärung entsprechend ergänzen.

### N8. Terminbuchung `[EXTERN]` `[CODE]` – Aufwand S
- Ein Buchungslink (z. B. Cal.com selbst gehostet oder ein EU-Dienst) für „15-Minuten-Telefongespräch“ als dritter Kontaktweg. Nur, wenn Linus feste Slots freihalten will `[LINUS]`.

---

## Reihenfolge-Empfehlung für die nächste Session

1. **Sofort, auch ohne Repo-Code** (kann Linus am Laptop in `index.html` machen): H2 (Fonts lokal), H7 (Bilder), M8 (Texte), M10 (Formular-Pflichtfeld-Logik), M9 (Header in Plesk).
2. **Sobald der Code im Repo liegt:** H3 (echte Seiten) → H4 (Funnel + Danke-Seite) → M2 (JSON-LD) → M5 (Mobile Leiste) → M6 (Startseite straffen).
3. **Parallel durch Linus:** H5 (Google-Profil), H1 (Erlaubnis-Update vorbereiten), H6.1 (Qualifikationen liefern), M3 (Fototermin), M7 (Erreichbarkeitszeiten festlegen).
4. **Danach, laufend:** M1 (Ortsseiten), M4 (Checkliste), H6.2–4 (Bewertungen, Referenzen), N1–N8.

## Erfolgskriterien (messbar nach 3 Monaten)
- Google Search Console: Impressionen für „wohnung verkaufen leonberg/heimsheim/…“ und „immobilienmakler leonberg/…“ > 0, Rössler in den Top 20.
- Google Business Profile aktiv, ≥ 5 Bewertungen.
- Lighthouse Mobil: Performance ≥ 90, Accessibility ≥ 95, SEO = 100, Best Practices ≥ 95.
- Seitengewicht Startseite mobil < 500 KB.
- Kein Request an Drittanbieter (Google Fonts) mehr.
- Mindestens 1 Anfrage pro Woche über das Formular (abhängig von Erlaubnis und Saison).
