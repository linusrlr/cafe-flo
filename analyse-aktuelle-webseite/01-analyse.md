# Analyse der bestehenden Webseite roessler-immo.de

Stand der Analyse: 29. Oktober 2026 (Live-Seite, `last-modified` laut Server: 19. Oktober 2026).
Geprüft wurde ausschließlich von außen: HTML-Quelltext, HTTP-Header, Bilder, Ladeverhalten (Playwright/Chromium, Desktop 1366 px und iPhone-13-Viewport 390 px), Screenshots liegen unter `screenshots/`. Zusätzlich wurden Lighthouse 12, axe-core 4.10, html-validate 9, eine Viewport-Serie von 320 bis 1920 px, eine gedrosselte Ladezeitmessung und DNS-/E-Mail-Prüfungen gefahren (Abschnitt 8.4).

Kurzfazit vorab: Die Seite ist inhaltlich ungewöhnlich ehrlich, konkret und gut geschrieben, technisch schlank und ohne Tracking. Ihre größten Schwächen sind struktureller Natur: Sie ist eine einzige HTML-Datei mit per JavaScript ein- und ausgeblendeten Abschnitten, dadurch gibt es für Google nur eine URL, keinerlei Unterseiten, keine Ortsseiten, keine Ratgeber. Dazu kommen fehlende Vertrauensbeweise (keine Bewertungen, Referenzen, Zahlen), ein mobiler Einstieg, bei dem Headline und Call-to-Action unter dem sichtbaren Bereich liegen, 1,6 MB unoptimierte Bilder und das dreifach wiederholte Signal „Erlaubnis noch nicht erteilt“.

---

## 1. Überblick: Was die Seite heute ist

| Merkmal | Befund |
|---|---|
| Technik | Eine statische HTML-Datei (45,6 kB, 709 Zeilen) mit Inline-CSS und Inline-JS, nginx, Hosting netcup (Deutschland) |
| Seitenmodell | „Views“ `start`, `verkaufen`, `ankauf`, `person`, `kontakt`, `impressum`, `datenschutz` als `<section hidden>` in einem Dokument, Umschaltung per JS (`history.replaceState('#name')`) |
| Navigation | Start · Immobilie verkaufen · Direktankauf · Über mich · Kontakt · Telefonnummer |
| Einziger Backend-Endpunkt | `kontakt.php` (POST, Antwort als JSON; GET leitet mit 303 auf `/` um) |
| Externe Abhängigkeiten | Google Fonts (Instrument Sans, Libre Franklin) |
| Tracking/Cookies | keine (kein Cookie-Banner nötig) |
| Bilder | 5 JPEGs, zusammen 1,59 MB, alle 1600 px breit, ohne `srcset`, ohne `loading="lazy"`, ohne `width`/`height` |

Der in der Aufgabenstellung genannte Bereich „Kaufen/Angebote“ existiert auf der Seite nicht. Es gibt keine Objektliste, keine Käufer-Ansprache und keine Suchfunktion. Das ist als Positionierung (reiner Verkäufer-Makler plus Direktankauf) konsequent, muss aber bewusst entschieden bleiben (siehe Abschnitt 3.4).

---

## 2. Inhalte und Texte

### 2.1 Was gut ist

**Klare Positionierung in einem Satz.** Die H1 der Startseite lautet „Ihre Wohnung verkaufen. Mit einem klaren Plan.“ Die Subline sagt sofort, wer spricht, was er tut und was der Kunde bekommt:

> „Ich bin Linus Rössler. Vor dem Verkauf kläre ich mit Ihnen, welcher Preis realistisch ist, welche Käufer infrage kommen und welche Vorbereitung sich lohnt. Sie erhalten einen schriftlichen Verkaufsplan. Anschließend übernehme ich die Vermarktung, Besichtigungen und Verhandlungen.“

Das ist besser als bei den meisten Maklerseiten, die mit „Ihr kompetenter Partner rund um Immobilien“ beginnen. Der „schriftliche Verkaufsplan“ ist ein echtes, benennbares Produkt und taugt als Alleinstellungsmerkmal.

**Fachlich konkret statt generisch.** Die Texte enthalten Details, die nur jemand schreibt, der das Geschäft kennt. Beispiele:

> „Bei Bestandswohnungen prüfe ich neben der Wohnung auch das Gebäude: Welche Arbeiten sind geplant? Welche Rücklagen bestehen? Sind Sonderumlagen beschlossen?“

> „Grundbuchauszug, Teilungserklärung, Grundriss und Wohnflächenberechnung, Energieausweis, die aktuellen Abrechnungen und der Wirtschaftsplan, Protokolle der Eigentümerversammlungen und bei vermieteten Wohnungen der Mietvertrag.“

**Transparenz bei Kosten und Vertrag.** Die FAQ nennt die Provision mit Rechenbeispiel („2,98 % des Kaufpreises einschließlich Umsatzsteuer. Bei 300.000 Euro sind das 8.940 Euro je Seite“), die Laufzeit des Alleinauftrags (sechs Monate, Verlängerung um drei Monate, vier Wochen Kündigungsfrist) und das Widerrufsrecht. Kaum ein Wettbewerber in der Region nennt seine Provision überhaupt auf der Website (siehe `02-wettbewerb.md`). Das ist ein Differenzierungsmerkmal.

**Ehrliche Interessenlage beim Direktankauf.** Der Abschnitt „In welcher Rolle ich stehe“ sagt offen: „Mein Angebot berücksichtigt meine Kosten, Risiken und den geplanten Gewinn. Eine zusätzliche unabhängige Einschätzung können Sie jederzeit einholen.“ Diese Offenheit schafft Vertrauen und ist rechtlich klug.

**Steuer- und Energieausweis-FAQ sind korrekt und vorsichtig formuliert** (Zehnjahresfrist, Eigennutzungsausnahme, Hinweis „ich erbringe keine Steuerberatung“; Energieausweis als Gebäudeausweis über die Hausverwaltung, Pflichtangaben in der Anzeige).

**Tonalität:** durchgehend „ich“ und „Sie“, sachlich, kurze Sätze, keine Superlative. Das passt zu einem Einzelmakler und wirkt nicht wie ein Template.

### 2.2 Was fehlt oder schwächt

**Kein einziger Beweis.** Auf der ganzen Seite gibt es keine Bewertung, keine Referenz, kein verkauftes Objekt, keine Zahl („x Wohnungen bewertet“), kein Zitat eines Kunden, kein Siegel, keine Mitgliedschaft (IVD o. ä.). Alle Aussagen sind Behauptungen des Anbieters über sich selbst. Für einen Neueinsteiger ist das erklärbar, aber die Seite bietet auch keine Ersatz-Beweise (z. B. anonymisierte Beispielrechnung eines Verkaufsplans, Auszug aus einer Markteinschätzung, Vorher-nachher der eigenen renovierten Wohnung).

**Der Erlaubnis-Vorbehalt steht dreimal auf der Seite und ist an zwei Stellen widersprüchlich.**
Startseite: „Meine Erlaubnis nach § 34c GewO ist beantragt. Makleraufträge nehme ich nach Erteilung an. Über Ihre Wohnung sprechen und sie einschätzen kann ich schon jetzt.“
Kontakt: „Makleraufträge nehme ich an, sobald sie erteilt ist.“
Impressum: „Bis zur Erteilung werden keine Maklerleistungen erbracht und keine Aufträge angenommen.“
Gleichzeitig verspricht die Verkaufen-Seite im Präsens „Ich veröffentliche das Angebot auf Immobilienportalen“ und die FAQ regelt bereits Provision und Alleinauftrag. Ein Eigentümer, der das liest, weiß nicht, ob er heute beauftragen kann. Sobald die Erlaubnis da ist, müssen alle drei Stellen entfernt werden; bis dahin sollte ein einziger, positiv formulierter Hinweis genügen („Kostenlose Ersteinschätzung ab sofort, Vermarktung ab Erteilung der Erlaubnis, voraussichtlich [Monat]“).

**Ortsangabe im Impressum passt nicht zum Einsatzgebiet.** Impressum und Datenschutz nennen „Am Rück 19, 97618 Niederlauer“ (Landkreis Rhön-Grabfeld, Unterfranken), Aufsichtsbehörde IHK für München und Oberbayern, Kammer IHK Würzburg-Schweinfurt. Das Einsatzgebiet liegt 250 km entfernt in Baden-Württemberg. Für einen Eigentümer in Leonberg, der das Impressum liest, ist das irritierend („Wer ist das, wo sitzt der?“), und für Google ist es ein widersprüchliches Standortsignal (siehe SEO). Die Seite erklärt nirgends, warum Heimsheim/Leonberg das Gebiet ist (Herkunft? Wohnort? eigene Wohnung dort?). Ein Satz dazu auf „Über mich“ würde das auflösen.

**„Über mich“ ist zu dünn für einen Einzelmakler, dessen einziges Verkaufsargument er selbst ist.** Drei Absätze, ein Portrait, keine Angaben zu Ausbildung (Hochschule, Abschlussjahr), Arbeitgebern, Zeitraum, der eigenen Wohnung (Ort, Baujahr, was renoviert), Bezug zur Region, Erreichbarkeit, Arbeitsweise. Vergleichbare Einzelmakler-Seiten erzählen hier eine Geschichte mit Fotos (siehe `02-wettbewerb.md`, Abschnitt „Was gute Einzelmakler-Seiten anders machen“).

**Kein Inhalt für die Phase vor der Verkaufsentscheidung.** Die Seite spricht nur Eigentümer an, die schon verkaufen wollen. Die größere Gruppe (geerbt, Trennung, Vermieter mit Ärger, „verkaufen oder vermieten?“, „was ist meine Wohnung wert?“) findet keinen Einstieg. Genau diese Themen sind die Ratgeber-Seiten der Wettbewerber und die Suchanfragen bei Google.

**Die fünf Orte sind nur Chips ohne Inhalt.** „Heimsheim · Leonberg · Ditzingen · Renningen · Pforzheim“ sind nicht klickbar, es gibt keine Aussage über den jeweiligen Markt, keine Preise, kein Foto aus dem Ort. Die Hero-Bilder (Neubauquartier, Fachwerk-Dächer, Architekturdetail, Altbau) sind erkennbar nicht aus Heimsheim oder Leonberg und wirken wie Stockmaterial, obwohl sie es vielleicht nicht sind.

**Direktankauf und Vermittlung konkurrieren auf der Startseite gleichwertig.** Beide Karten („Ich verkaufe für Sie“ / „Ich prüfe einen Ankauf“) stehen nebeneinander. Das kann Verkäufer verunsichern (Interessenkonflikt: „Will er mir meine Wohnung billig abkaufen?“). Die Transparenz-Sektion auf der Ankauf-Seite fängt das auf, aber erst dort. Empfehlung: Vermittlung als Hauptweg, Direktankauf als klar nachgeordnete Option („Falls Sie keine öffentliche Vermarktung möchten“).

**Kleinere Textpunkte**
- „Wohnfläche ca.“ mit Platzhalter „m²“ und Typ `text` statt `number` (Mobil-Tastatur ist durch `inputmode="numeric"` aber korrekt).
- FAQ „Wie lange dauert ein Verkauf?“ gibt keine Orientierung („Eine Einschätzung gebe ich Ihnen nach Besichtigung“). Hier wäre eine ehrliche Spanne aus Marktdaten besser (z. B. „Bei marktgerechtem Preis in der Region 2 bis 4 Monate bis zum Notartermin“), sonst wirkt die Antwort ausweichend.
- Das Wort „Immobilie“ in Navigation („Immobilie verkaufen“) widerspricht der Spezialisierung „Wohnung“ in allen Überschriften. Konsequent wäre „Wohnung verkaufen“, auch für SEO.

---

## 3. Struktur und Navigation

### 3.1 Ein Dokument, sieben versteckte Abschnitte

Der Quelltext zeigt das Modell (Auszug aus dem Inline-Skript):

```js
var views=["start","verkaufen","ankauf","person","kontakt","impressum","datenschutz"];
function show(name,push){
  views.forEach(function(v){var el=document.getElementById("v-"+v); if(el) el.hidden=(v!==name);});
  ...
  if(push){try{history.replaceState(null,"","#"+name);}catch(e){}}
}
```

Folgen:
- Es gibt genau eine indexierbare URL: `https://roessler-immo.de/`. `#verkaufen` ist für Google keine eigene Seite. `/verkaufen` liefert 404.
- Alle sieben Abschnitte liegen im DOM, sechs davon mit `hidden`. Google indexiert versteckten Text nur eingeschränkt und gewichtet ihn niedriger. Die FAQ, die 7-Schritte-Liste und die Ankauf-Seite sind damit praktisch unsichtbar für die Suche.
- Die Navigation besteht aus `<button data-go="...">`, nicht aus `<a href>`. Crawler folgen Buttons nicht; auch Screenreader kündigen „Schaltfläche“ statt „Link“ an, und „Link in neuem Tab öffnen“/„Link kopieren“ funktionieren nicht.
- `history.replaceState` statt `pushState`: Der Browser-Zurück-Button führt nicht zur vorherigen Ansicht, sondern verlässt die Seite. Das ist ein echtes Usability-Problem auf dem Handy.
- Drei `<h1>` im Dokument (Start, Verkaufen, Ankauf); „Über mich“ hat als Überschrift nur ein `<h2>`.
- Beim Umschalten wird immer `window.scrollTo(0,0)` ausgeführt. Der CTA „Verkauf besprechen“ auf der Verkaufen-Seite springt also zur Kontakt-Ansicht ganz oben; das Formular liegt dort erst nach dem dunklen Intro-Block (mobil ca. 900 px tiefer).

### 3.2 Informationsarchitektur

Die heutige Hierarchie ist flach und für die aktuelle Größe angemessen. Für die geplanten Unterseiten fehlt aber ein Gerüst. Vorschlag für die Zielstruktur (Details in `03-massnahmen.md`):

```
/                          Start
/wohnung-verkaufen/        Leistung Vermittlung (Ablauf, Verkaufsplan, FAQ)
/direktankauf/             Leistung Ankauf
/wohnung-bewerten/         Einstieg „Was ist meine Wohnung wert?“ (Lead-Formular)
/ratgeber/                 Übersicht
/ratgeber/<thema>/         z. B. vermietete-wohnung-verkaufen, geerbte-wohnung, scheidung, spekulationssteuer, unterlagen, energieausweis, maklerprovision, verkaufen-oder-vermieten
/wohnung-verkaufen/leonberg/ (und heimsheim, ditzingen, renningen, pforzheim)  Ortsseiten
/ueber-mich/
/kontakt/
/impressum/  /datenschutz/
```

### 3.3 Navigation und Footer

- Desktop-Navigation ist klar und kurz (fünf Punkte plus Telefonnummer). Gut.
- Der Footer enthält nur „Rössler Immobilien, Linus Rössler“ sowie Impressum/Datenschutz. Es fehlen Adresse/NAP (Name, Adresse, Telefon), die Orte, eine Mini-Sitemap und ggf. Öffnungs-/Erreichbarkeitszeiten. Für lokales SEO und Vertrauen ist ein informativer Footer Standard.
- Kein Logo als Bild/SVG, nur Text „RÖSSLER IMMOBILIEN“. Das ist sauber, aber nicht wiedererkennbar (Favicon ist ein SVG, Social-Vorschaubild fehlt ganz).

### 3.4 Fehlender Bereich „Kaufen“

Es gibt bewusst keine Angebote. Solange keine Objekte da sind, ist das richtig. Spätestens mit dem ersten Auftrag braucht die Seite aber eine Stelle, an der Exposés erscheinen (auch als Beweis für Verkäufer: „so präsentiert er Wohnungen“). Außerdem ist eine „Suchauftrag“-Funktion für Kaufinteressenten die zweite klassische Lead-Quelle; Käuferkontakte sind in Verkaufsgesprächen ein Argument („Ich habe bereits 12 vorgemerkte Interessenten für 3-Zimmer-Wohnungen in Leonberg“).

---

## 4. Design und Markenwirkung

### 4.1 Positiv

- **Ruhiges, hochwertiges Grundlayout**: Weiß, Dunkelblau (`#16233D`), hellgraue Flächen, zwei gut gewählte Schriften (Instrument Sans für Überschriften, Libre Franklin für Text). Keine Stock-Icons, keine Effekte, viel Weißraum. Die Seite wirkt seriöser als die meisten regionalen Maklerseiten mit WordPress-Themes.
- **Split-Hero** (Text links, Bild rechts) auf Desktop ist klar und schnell erfassbar; der primäre Button ist eindeutig.
- **Dunkelblaue Kontakt-Bänder** mit Portrait am Seitenende sind ein guter Abschluss jeder Ansicht.
- Das Portrait ist professionell, freundlich und passt zur Tonalität.
- Typografische Details stimmen: `text-wrap:balance`, Tabellenziffern bei Telefonnummern, 17 px Grundschrift, Zeilenhöhe 1,65.

### 4.2 Schwächen

- **Austauschbare Bildsprache.** Neubauquartier mit Wiese, Fachwerkdächer von oben, Schwarz-Weiß-Architekturfoto, Altbau mit Gerüst. Keines der Motive verortet die Marke in Heimsheim oder Leonberg. Für einen lokalen Makler ist das die verschenkte Chance schlechthin: Ein Foto vom Leonberger Marktplatz, von der Heimsheimer Altstadt oder aus dem Ditzinger Neubaugebiet sagt „der kennt sich hier aus“ ohne ein Wort Text.
- **Keine Wiedererkennung.** Es gibt kein Logo, keine Bildmarke, keine Akzentfarbe neben Dunkelblau. Die Wortmarke in Versalien ist sauber, aber auf Google-Unternehmensprofil, Portalen, Visitenkarte und Schild muss etwas Reproduzierbares stehen.
- **Die „Über mich“-Ansicht ist visuell leer**: große Überschrift, Portrait, drei Absätze, Footer. Kein Lebenslauf, keine Fotos vom Arbeiten, keine Handschrift, keine Werte. Dort entscheidet sich bei einem Einzelmakler das Vertrauen.
- **Fehlende Hierarchie der Handlungsaufforderungen.** Auf der Startseite gibt es „Verkauf besprechen“ (primär), „Mein Ablauf“, „Ablauf ansehen →“, „Wie das abläuft →“, „Verkauf besprechen“ (unten). Es gibt keinen weichen Einstieg wie „Wohnung kostenlos einschätzen lassen“, der für Unentschlossene die niedrigste Hürde ist. In der Branche ist die kostenlose Bewertung der mit Abstand stärkste Einstieg (siehe Wettbewerb).
- **Dunkelblauer Block auf der Kontakt-Ansicht ist zu lang** (mobil ca. 650 px), bevor das Formular beginnt.
- **Keine Illustration des „Verkaufsplans“.** Das zentrale Produkt bleibt abstrakt. Eine stilisierte Abbildung (Deckblatt, Preisspanne, Zeitplan) oder ein Muster-PDF würde es greifbar machen.

---

## 5. Mobilansicht

Gemessen mit iPhone-13-Viewport (390 × 844 px).

| Messwert | Ergebnis |
|---|---|
| Unterkante des Hero-Bildes | 309 px (das Bild belegt knapp die Hälfte des ersten Bildschirms) |
| Position der H1 vom oberen Rand | 361 px (untere Hälfte des ersten Bildschirms, Viewport-Höhe 664 px) |
| Position des ersten CTA-Buttons „Verkauf besprechen“ | 810 px (unterhalb des ersten Bildschirms) |
| Horizontaler Scroll | keiner (sauber) |
| Grundschriftgröße | 17 px (gut lesbar) |
| Telefonnummer in der Kopfzeile | ausgeblendet (`.topnum{display:none}`), nur im aufgeklappten Menü |

**Problem 1: Der erste Bildschirm besteht zur Hälfte aus einem Foto, der Button liegt darunter.** Das Hero-Bild (1600 × 1200 px, 292 kB) wird mobil oben in voller Breite gezeigt; die H1 beginnt erst in der unteren Hälfte, die Subline wird angeschnitten, und „Verkauf besprechen“ erscheint erst nach dem Scrollen (Screenshot `screenshots/mobile-fold.jpg`). Dazu kommt, dass genau dieses Bild das LCP-Element ist und bei langsamer Verbindung erst nach etwa 7 Sekunden erscheint (siehe 8.4). Ein Eigentümer, der über Google auf dem Handy kommt, sieht in den ersten Sekunden ein leeres Rechteck und eine halbe Überschrift. Lösung: mobil Text vor Bild (CSS `order`) oder Bild als kleineres Querformat unter der Headline, dazu ein kleineres, vorrangig geladenes Hero-Bild.

**Problem 2: Kein ständig sichtbarer Anruf-Button.** Auf dem Handy ist Anrufen der wichtigste Kontaktweg eines Einzelmaklers. Die Nummer steckt im Menü. Üblich ist ein Telefon-Icon in der Kopfzeile oder eine schmale Leiste unten („Anrufen · Nachricht“).

**Problem 3: Die Ansichten sind lang und ohne Sprungmarken.** Die Verkaufen-Ansicht ist mobil ca. 6.100 px hoch (sieben Schritte plus zehn FAQ). Ohne Inhaltsverzeichnis oder Zwischen-CTA müssen Nutzer bis unten scrollen, um den Button zu finden.

**Gut gelöst:** Das Burger-Menü ist groß, kontrastreich (dunkelblauer Overlay), mit Telefonnummer, schließt per Escape und Scrim-Klick, hat `aria-expanded`. Formularfelder sind groß genug, Tastaturtypen (`tel`, `email`, `inputmode="numeric"`) sind korrekt gesetzt, `autocomplete` ist vorhanden.

---

## 6. Kontaktwege und Anfrage-Funnel (Schwerpunkt „Verkaufen“)

### 6.1 Ist-Zustand des Funnels

1. Einstieg: Hero mit „Verkauf besprechen“ (führt zur Kontakt-Ansicht) oder „Mein Ablauf“ (führt zur Verkaufen-Ansicht).
2. Verkaufen-Ansicht: Intro, sieben Schritte, Verkaufsplan-Absatz, zehn FAQ, am Ende „Verkauf besprechen“.
3. Kontakt-Ansicht: dunkelblauer Block mit Telefon/E-Mail und Erlaubnis-Hinweis, danach Formular „Nachricht schreiben“ mit Name (Pflicht), Telefon, E-Mail, Ort der Wohnung, Wohnfläche, Vermietet/frei, Vorhaben (verkaufen lassen / Ankauf prüfen lassen / zunächst orientieren), Nachricht. Honeypot-Feld und JS-Marker gegen Spam. Versand per `fetch` an `kontakt.php`, Antwort inline.

Was daran gut ist: Das Formular ist kurz, fragt die richtigen Dinge (Ort, Fläche, vermietet, Vorhaben) und bietet „zunächst orientieren“ als niedrigschwellige Option. Die Pflichtangabe ist nur der Name; der Datenschutz-Hinweis ist direkt darunter. Fehlerfall ist abgefangen („Die Nachricht konnte nicht verschickt werden. Bitte rufen Sie mich an…“).

### 6.2 Schwächen des Funnels

- **Nur ein Ziel: „Nachricht schreiben“.** Es gibt kein Angebot, das dem Eigentümer sofort etwas gibt (Preisspanne, Checkliste, Beispiel-Verkaufsplan). Die Konkurrenz bietet fast ausnahmslos „Kostenlose Immobilienbewertung“ als Einstieg und erhält dadurch Kontaktdaten von Menschen, die noch nicht verkaufen wollen.
- **Der Button-Text verspricht ein Gespräch, landet aber auf einem Formular**, dessen Bestätigung nur „Gesendet“ lautet. Unklar bleibt: Wann meldet er sich? Was passiert dann? Ein Erwartungs-Satz („Ich melde mich innerhalb eines Werktags telefonisch“) und eine kurze „Was passiert nach Ihrer Anfrage“-Liste fehlen.
- **Keine Terminbuchung, kein WhatsApp, kein Rückruf-Wunschzeitfenster.** Für Berufstätige ist „Rückruf zwischen 18 und 20 Uhr“ oder ein Kalenderlink oft die einzige realistische Kontaktform. Ob Linus Rössler WhatsApp anbieten will, ist eine Geschäftsentscheidung; viele regionale Makler tun es inzwischen.
- **Keine Erreichbarkeitsangabe.** Weder Zeiten noch „auch abends und samstags“.
- **Keine Bestätigungs-E-Mail an den Absender** (nicht prüfbar ohne Testversand; im JS ist nur die Inline-Meldung vorgesehen). Eine automatische Eingangsbestätigung mit nächsten Schritten ist Standard.
- **Kein Erfolgs-Tracking.** Ohne eigene Danke-Seite oder Event lässt sich später nicht messen, welche Seite Anfragen bringt (Datenschutz-freundlich möglich, z. B. serverseitiges Zählen in `kontakt.php` oder eine cookiefreie Lösung wie Plausible/Matomo ohne Cookies).
- **Direktankauf-Formular ist dasselbe Formular.** Für einen Ankauf wären andere Felder sinnvoll (Baujahr, Etage, Hausgeld, Miete, gewünschter Zeitpunkt). Das Feld „Vorhaben“ fängt das zwar ab, aber ein eigener kurzer Ankauf-Check würde Ernsthaftigkeit signalisieren.

### 6.3 Sichtbarkeit der Kontaktwege

Telefon und E-Mail stehen auf Desktop in der Kopfzeile und in jedem Abschluss-Band; `tel:`- und `mailto:`-Links sind korrekt. Mobil ist die Telefonnummer wie beschrieben nur im Menü. Eine Adresse für persönliche Treffen gibt es nicht (verständlich bei Home-Office, aber dann sollte stehen „Termine bei Ihnen vor Ort in Heimsheim, Leonberg, …“).

---

## 7. SEO

### 7.1 Technische Grundlagen

| Prüfpunkt | Befund | Bewertung |
|---|---|---|
| `<title>` | „Rössler Immobilien — Linus Rössler“ | Kein Keyword, kein Ort. Schwach. |
| Meta-Description | „Rössler Immobilien, Linus Rössler — Verkauf von Eigentumswohnungen in Heimsheim, Leonberg, Ditzingen, Renningen und Pforzheim.“ | Ok, aber ohne Nutzenversprechen und Handlungsaufforderung. |
| Indexierbare URLs | 1 | Kritisch (siehe 3.1). |
| `sitemap.xml` | 404 | Fehlt. |
| `robots.txt` | vorhanden, `Allow: /` | Ok, ohne Sitemap-Verweis. |
| Canonical | fehlt | `www.roessler-immo.de` liefert 200 ohne Weiterleitung; damit existieren zwei Hosts mit identischem Inhalt (Duplicate Content). |
| Open-Graph / Twitter Cards | keine | Beim Teilen per WhatsApp/LinkedIn erscheint kein Bild und kein Titel. |
| Strukturierte Daten (JSON-LD) | keine | `RealEstateAgent`/`LocalBusiness` mit Servicegebiet und `FAQPage` für die zehn FAQ fehlen. |
| Überschriften | 3 × H1 im DOM, nur eine sichtbar | Unsauber. |
| `lang` | `de` | Ok. |
| Bild-Alt-Texte | alle vorhanden, beschreibend | Gut. |
| Interne Verlinkung | keine (Buttons statt Links) | Kritisch. |
| Blog/Ratgeber | keiner | Kein Inhalt für informationelle Suchanfragen. |
| Google-Unternehmensprofil | von außen nicht feststellbar | Muss geprüft werden; mit Niederlauer-Adresse wäre es für Leonberg unbrauchbar (Servicegebiet-Profil ohne Adresse ist möglich). |

### 7.2 Lokale Suchbegriffe

Die Orte kommen im Text vor (Startseite, Gebiets-Sektion, Ankauf-Seite), aber nie in Überschriften, Title oder URL. Suchanfragen wie „Wohnung verkaufen Leonberg“, „Immobilienmakler Heimsheim“, „Wohnung verkaufen Pforzheim“ werden heute von Portalen (immoverkauf24, ImmoScout24, jacasa, immoportal) und von Franchise-Büros (Von Poll Leonberg, Engel & Völkers) beherrscht; eine One-Page-Seite ohne Ortsseiten hat dort keine Chance (Rechercheergebnisse in `02-wettbewerb.md`).

Das Impressum verortet das Unternehmen in Niederlauer (Bayern). Google nutzt Impressums- und Profiladressen als Standortsignal. Ohne eine Geschäftsadresse oder zumindest ein klar deklariertes Servicegebiet in Baden-Württemberg bleibt die Seite für lokale Suchen in Leonberg schwach.

### 7.3 Inhaltliche Lücken aus SEO-Sicht

Keine Seite beantwortet eine Frage, die jemand googelt, bevor er einen Makler sucht:
„geerbte Wohnung verkaufen Steuer“, „vermietete Wohnung verkaufen Mieter“, „Wohnung verkaufen Scheidung“, „Wohnung verkaufen oder vermieten“, „Spekulationsfrist Wohnung“, „Unterlagen Wohnungsverkauf WEG“, „Wohnung verkaufen Kosten Makler Baden-Württemberg“, „Energieausweis Eigentumswohnung Verkauf“. Die FAQ enthält zu mehreren dieser Themen bereits gute Kurzantworten, versteckt in einem `<details>`-Block einer verborgenen Sektion.

### 7.4 Aktuelle Sichtbarkeit und Namensverwechslung

Eine Suche nach `site:roessler-immo.de` liefert kein Ergebnis von der Domain, und auch „Rössler Immobilien Heimsheim“ bzw. „Linus Rössler“ führen nicht zur Seite. Die Domain ist entweder noch nicht indexiert oder rangiert unter Verzeichnisseiten. Zwei Namenskollisionen erschweren das zusätzlich:

- **„Rössler Immobilien“ in Hausen (Bayern, immo-roessler.de)**: etabliertes Büro mit 4,9 Sternen aus 20 Bewertungen auf Portalen. Wer „Rössler Immobilien“ googelt, landet heute dort.
- **„Rössle Roland Immobilien“ in Heimsheim selbst** (Alte Mönsheimer Str. 92): ein bestehender Makler im Kernort mit fast gleichem Namen.

Konsequenz: Marke und Suchbegriffe müssen konsequent mit Ort und Person verknüpft werden („Rössler Immobilien Leonberg“, „Linus Rössler Immobilienmakler Heimsheim“), das Google-Unternehmensprofil muss angelegt und verifiziert werden, und Title/H1/Impressum sollten die Region nennen. Ob eine Markenanmeldung oder ein Zusatz („Rössler Wohnungsverkauf“) sinnvoll ist, sollte Linus Rössler mit Blick auf die Hausener Firma prüfen.

---

## 8. Technik

### 8.1 Ladezeit und Gewicht

Gemessen aus einer Cloud-Umgebung (nicht Deutschland), daher sind die absoluten Zeiten eher pessimistisch:

| Messwert | Wert |
|---|---|
| Time to First Byte | ca. 1,1 s |
| DOMContentLoaded | ca. 1,5 s |
| Load-Event | ca. 2,8 s |
| HTML (gzip) | 13 kB |
| Bilder gesamt | 1.590 kB (5 JPEGs à 1600 px) |
| Externe Requests | Google Fonts CSS + 2 WOFF2 |

Das HTML selbst ist vorbildlich klein. Das Problem sind ausschließlich die Bilder:
- Alle fünf Bilder werden beim ersten Aufruf geladen, obwohl vier davon in versteckten Abschnitten liegen (Browser laden `<img>` in `hidden`-Elementen trotzdem).
- Keine responsiven Varianten (`srcset`/`sizes`), kein modernes Format (WebP/AVIF), keine Größenangaben (`width`/`height`), kein `loading="lazy"`, kein `fetchpriority="high"` für das Hero-Bild. Mit WebP in 800/1200/1600 px wäre das Gesamtvolumen bei etwa 250 bis 350 kB.
- `daecher.jpg` (463 kB) und `altbau.jpg` (500 kB) sind die größten Einzelposten.

### 8.2 HTTP-Header und Sicherheit

| Prüfpunkt | Befund |
|---|---|
| TLS | TLS 1.3, Let's Encrypt, HTTP/2, TLS 1.1 abgelehnt. Gut. |
| HTTP → HTTPS | 301. Gut. |
| `www` → Apex | keine Weiterleitung (200 auf beiden). Fehlt. |
| `Strict-Transport-Security` | fehlt |
| `Content-Security-Policy` | fehlt (Inline-Skript und -Styles müssten per Nonce/Hash erlaubt werden) |
| `X-Content-Type-Options`, `X-Frame-Options`/`frame-ancestors`, `Referrer-Policy`, `Permissions-Policy` | fehlen |
| `Cache-Control` | fehlt (Bilder und HTML werden ohne Caching-Anweisung ausgeliefert; nur `ETag`/`Last-Modified`) |
| Verzeichnislisting `/bilder/` | 403. Gut. |
| `.git`, `.env`, Backups, `phpinfo.php` | 404. Gut. |
| `kontakt.php` per GET | 303 auf `/`. Sauber. |
| Spam-Schutz | Honeypot-Feld + JS-Marker. Angemessen; kein Captcha nötig. |
| Cookies/Tracking | keine. Sehr gut (kein Banner, keine Einwilligung nötig). |

Es ist nichts Gefährliches erkennbar. Die fehlenden Security-Header sind Standardhärtung, die in der nginx-Konfiguration in zehn Minuten nachgezogen ist (HSTS erst nach Test der `www`-Weiterleitung aktivieren).

Nicht prüfbar von außen: PHP-Version, Mail-Versand (SPF/DKIM/DMARC der Domain, damit Anfragen nicht im Spam landen), Rate-Limiting für `kontakt.php`, Backups.

### 8.3 Barrierefreiheit (soweit erkennbar)

Positiv: `lang="de"`, `<main>`-Landmark, Alt-Texte, `label for` bei allen Feldern (nur das Honeypot-Feld ist ohne, das ist korrekt), `:focus-visible`-Stil, `aria-expanded` am Burger, `aria-current="page"` in der Navigation, `prefers-reduced-motion` berücksichtigt, Schriftgröße 17 px, Kontrast der Haupttexte sehr hoch.

Verbesserungswürdig:
- Navigation als Buttons statt Links (Semantik, Tastaturerwartung).
- Kein „Zum Inhalt springen“-Link.
- Beim Umschalten der Ansichten wird der Fokus nicht auf die neue Überschrift gesetzt; Screenreader-Nutzer erfahren nicht, dass sich die Seite geändert hat.
- Sekundärtext-Farbe `#55627A` auf Weiß: Kontrast ca. 6,2:1, in Ordnung. `#AEBCD4` auf Dunkelblau `#16233D` im Kontaktband: ca. 8,2:1, in Ordnung. Die kleinen Versal-Labels (0,56 rem = ca. 9 px) unter der Wortmarke sind zu klein für WCAG-Komfort, aber nur dekorativ.
- `<details>`-FAQ ist nativ zugänglich. Gut.

### 8.4 Messergebnisse der Testbatterie

**Lighthouse 12 (Chromium headless, simulierte Drosselung; Mobil = Moto G Power, Slow 4G):**

| Kategorie | Mobil | Desktop |
|---|---|---|
| Performance | 67 | 88 |
| Accessibility | 100 | 100 |
| Best Practices | 100 | 100 |
| SEO | 100 | 100 |

| Metrik (Mobil) | Wert | Einordnung |
|---|---|---|
| First Contentful Paint | 3,0 s | zu langsam (Ziel < 1,8 s) |
| Largest Contentful Paint | 5,7 s | schlecht (Ziel < 2,5 s); LCP-Element ist `bilder/neubau.jpg` |
| Speed Index | 7,0 s | schlecht |
| Total Blocking Time | 0 ms | sehr gut |
| Cumulative Layout Shift | 0 | sehr gut |
| Server-Antwortzeit | 240 ms | gut |

Desktop: FCP 0,8 s, LCP 2,3 s, Speed Index 1,0 s.

Lighthouse nennt als Ursachen genau die Bildprobleme: „Serve images in next-gen formats“ (Ersparnis 726 kB), „Properly size images“ (630 kB), „Use efficient cache lifetimes“ (1.556 kB ohne Cache-Header), „Eliminate render-blocking resources“ (Google-Fonts-CSS, 670 ms mobil) sowie fehlendes `preconnect`. Die 100-Punkte-Werte für SEO und Accessibility sind mit Vorsicht zu lesen: Lighthouse prüft nur die eine URL und erkennt weder die versteckten Abschnitte noch die Button-Navigation als Problem.

**Eigene Messung mit Drosselung (1,6 Mbit/s, 150 ms Latenz, iPhone-Viewport):** Load-Event nach 8,8 s, LCP nach etwa 7,0 s. Auf dem Land zwischen Heimsheim und Pforzheim ist diese Verbindungsqualität realistisch.

**axe-core 4.10 (WCAG 2.2 AA + Best Practice), alle sieben Ansichten, Desktop und Mobil:**
- `landmark-unique` (moderat): Die Haupt- und die Footer-Navigation sind beide `<nav>` ohne `aria-label`.
- `page-has-heading-one` (moderat): Die Ansichten „Über mich“, „Kontakt“, „Impressum“, „Datenschutz“ haben keine H1.
- `empty-table-header` (gering) und `scrollable-region-focusable` (ernst, mobil): Die Vergleichstabelle „Vermittlung / Direktankauf“ hat eine leere Kopfzelle und ist mobil horizontal scrollbar, aber nicht per Tastatur erreichbar.
- Sonst keine Verstöße. Das ist ein sehr gutes Ergebnis.

**html-validate 9 (Empfehlungs-Regelsatz):** 34 Meldungen, alle unkritisch: 13 × `<button>` ohne `type="button"`, 6 × `<th>` ohne `scope`, 8 × redundantes `for` (Label umschließt Feld und hat zusätzlich `for`), 2 × Leerzeichen in Telefonnummer statt geschütztem Leerzeichen, 1 × Landmark ohne Namen. Kein Strukturfehler.

**Tastatur und Verlauf:** Die Tab-Reihenfolge ist logisch (Marke, fünf Navigationspunkte, Telefon, Buttons). Nach Klick auf „Immobilie verkaufen“ führt der Zurück-Button des Browsers auf `about:blank`, also aus der Seite heraus (Folge von `history.replaceState`).

**Viewport-Serie 320 bis 1920 px:** Kein horizontaler Überlauf bei keiner Breite. Umschaltpunkt zum Burger-Menü bei 840 px; die Telefonnummer ist unterhalb von 841 px ausgeblendet. H1-Größe 33,6 px (mobil) bis 51,2 px (Desktop), gut lesbar. Dark-Mode wird durch `color-scheme:light` korrekt neutralisiert, Druckansicht funktioniert.

**DNS und E-Mail-Zustellbarkeit (für Anfragen aus dem Formular und Antworten an Kunden):**

| Eintrag | Befund |
|---|---|
| A / AAAA | 46.38.249.69 / 2a03:4000:6d:2b6e::25:206 (netcup) |
| MX | mail.roessler-immo.de (10), mxf947.netcup.net (50) |
| SPF | `v=spf1 mx a include:_spf.webhosting.systems ~all` vorhanden |
| DKIM | kein Eintrag unter den üblichen Selektoren gefunden (default, mail, netcup, s1, k1, google, selector1, dkim) |
| DMARC | fehlt (`_dmarc.roessler-immo.de` ohne TXT) |
| CAA | fehlt (optional) |
| MTA-STS | fehlt (optional) |

Ohne DKIM und DMARC landen E-Mails von `linus@roessler-immo.de` bei Gmail, Outlook und GMX häufiger im Spam, und seit 2024 verlangen Google und Yahoo DMARC für Absender mit nennenswertem Volumen. Beides lässt sich im netcup Customer Control Panel einrichten (DKIM für die Domain aktivieren, DMARC-TXT `v=DMARC1; p=none; rua=mailto:...` anlegen, später `p=quarantine`).

**Weitere Kleinigkeiten:** Die 404-Seite ist die englische Standardseite des Hosters („Server Error 404 Page Not Found“, `lang="en"`). `favicon.ico` und `apple-touch-icon.png` fehlen (nur SVG-Favicon; ältere Browser und einige Messenger zeigen dann kein Icon). Kein Web-Manifest, keine `security.txt` (beides optional).

### 8.5 Wartbarkeit

Alles liegt in einer Datei: CSS, Markup für sieben Ansichten, JS. Für den jetzigen Umfang ist das vertretbar, für 20+ Unterseiten nicht. Das Repo-Setup (Next.js aus dem Café-Flo-Projekt) oder ein einfacher statischer Generator (Astro, Eleventy) wären der natürliche nächste Schritt; wichtig ist nur: echte URLs, serverseitig gerendert, keine Client-Routing-Views.

---

## 9. Rechtliches

### 9.1 Impressum

Vorhanden und weitgehend vollständig: Name, Anschrift, Telefon, E-Mail, Hinweis zur fehlenden USt-IdNr., Berufsbezeichnung, Rechtsgrundlagen (GewO § 34c, MaBV), Aufsichtsbehörde mit Anschrift, Kammer, Verbraucherstreitbeilegung, Haftungshinweis, Bezug auf § 5 DDG (korrekt, seit Mai 2024 statt TMG).

Prüfpunkte:
- **„Berufsbezeichnung: Immobilienmakler (verliehen in der Bundesrepublik Deutschland)“** ist eine Vorlagen-Floskel für reglementierte Berufe. „Immobilienmakler“ ist keine verliehene Berufsbezeichnung. Besser: „Tätigkeit: Immobilienmakler (erlaubnispflichtig nach § 34c Abs. 1 Satz 1 Nr. 1 GewO)“.
- **Aufsichtsbehörde IHK für München und Oberbayern** ist laut IHK München für Erlaubnisse nach § 34c in ganz Bayern (außer Kammerbezirk Aschaffenburg) zuständig, die Angabe ist also plausibel. „Zuständige Kammer IHK Würzburg-Schweinfurt“ ergibt sich aus dem Sitz Niederlauer. Beide Angaben werden hinfällig, sobald der Sitz nach Baden-Württemberg verlegt wird (dann IHK Region Stuttgart bzw. Nordschwarzwald; dort erteilt in BW das Landratsamt/die Stadt die § 34c-Erlaubnis). Das muss beim Umzug nachgezogen werden.
- Der Satz „Bis zur Erteilung werden keine Maklerleistungen erbracht und keine Aufträge angenommen“ ist rechtlich vorsichtig und richtig, sollte aber am Tag der Erteilung gelöscht werden. Erlaubnisnummer/-datum und die erteilende Behörde dann ergänzen.
- Hinweis auf die EU-Streitschlichtungsplattform (OS-Plattform) ist seit Juli 2025 nicht mehr erforderlich; das Fehlen ist in Ordnung.
- Kein Link vom Impressum zur Datenschutzerklärung nötig, beide sind im Footer. Beide sind von jeder Ansicht erreichbar (Footer). Gut.

### 9.2 Datenschutzerklärung

Enthalten: Verantwortlicher, Server-Logs (7 Tage, Art. 6 Abs. 1 lit. f), Kontaktaufnahme (lit. b/f), Pflichtfelder, Löschfristen, Weitergabe, Geldwäschegesetz (richtig und selten), Betroffenenrechte, Beschwerderecht (BayLDA Ansbach), Hosting netcup mit AV-Vertrag, Google Fonts.

Prüfpunkte:
- **Google Fonts werden vom Google-Server geladen.** Die Datenschutzerklärung stützt das auf berechtigtes Interesse. Das LG München I (Urteil vom 20.01.2022, 3 O 17493/20) hat genau diese Einbindung als DSGVO-Verstoß gewertet; es folgte eine Abmahnwelle. Die Schriften lokal zu hosten ist die Standardlösung, kostet nichts und beschleunigt die Seite zusätzlich (kein Fremd-Request, kein Font-Swap).
- Die Aufsichtsbehörde (BayLDA) ändert sich bei Sitzverlegung nach BW (LfDI Baden-Württemberg, Stuttgart).
- Beim Formular ist keine Einwilligungs-Checkbox vorhanden. Das ist bei Anfrage zur Vertragsanbahnung (lit. b) vertretbar; der Hinweistext unter dem Button ist vorhanden. In Ordnung.
- Wenn später ein Bewertungstool, Kartenfunktion (Google Maps), Terminbuchung (Calendly), Video (YouTube) oder Analytics hinzukommt, braucht es eine Einwilligungslösung (Consent-Banner) und entsprechende Abschnitte. Heute: nicht nötig, das ist ein Vorteil, der erhalten bleiben sollte (cookiefreie Analytics, selbst gehostete Karten-Tiles oder statische Kartenbilder, selbst gebaute Terminanfrage).

### 9.3 Sonstiges

- Preisangaben: Provision „inkl. USt“ wird genannt. Gut. Bei Erlaubniserteilung ggf. USt-IdNr. ergänzen oder den Kleinunternehmer-Status klarstellen (derzeit „liegt nicht vor“).
- Sobald Exposés auf der Seite erscheinen: Pflichtangaben aus dem Energieausweis in jeder Anzeige (§ 87 GModG, das Gebäudemodernisierungsgesetz hat das GEG zum 29.7.2026 abgelöst; ab 1.1.2027 gelten erweiterte Pflichtangaben, Bußgeld bis 10.000 Euro, siehe `../recherche/marktthemen-2026.md` Kapitel 2), Widerrufsbelehrung für Maklerverträge im Fernabsatz, Provisionsangabe in Anzeigen. Die FAQ-Antwort „Brauche ich einen Energieausweis?“ auf der Live-Seite ist inhaltlich noch richtig, nennt aber kein Gesetz; beim Umbau GModG und die Änderungen 2027 ergänzen.
- Bildrechte der vier Motivbilder: nicht prüfbar. Falls Stockfotos, Lizenz dokumentieren; falls eigene, ist das ein Argument, es zu sagen („Fotos: eigene Aufnahmen aus der Region“).

---

## 10. Zusammenfassung der Befunde nach Schwere

**Kritisch (verhindert Sichtbarkeit und Vertrauen)**
1. One-Page-Architektur mit versteckten Abschnitten und Button-Navigation: nur eine URL, kein Inhalt für Google, kein Browser-Zurück.
2. Keinerlei Vertrauensbeweise (Bewertungen, Referenzen, Zahlen, Mitgliedschaften).
3. Erlaubnis-Vorbehalt dreifach und widersprüchlich; Standort Niederlauer vs. Einsatzgebiet BW unerklärt.
4. Mobiler Einstieg: Headline und CTA unter dem Fold, keine dauerhaft sichtbare Telefonnummer.

**Hoch**
5. Kein niedrigschwelliger Einstieg (kostenlose Einschätzung/Bewertung) und kein Inhalt für Eigentümer vor der Verkaufsentscheidung (Erbe, Trennung, vermietet, verkaufen oder vermieten).
6. Title/Meta ohne Keyword und Ort, keine Sitemap, kein Canonical, `www` nicht umgeleitet, keine strukturierten Daten, keine Open-Graph-Daten.
7. Bilder: 1,6 MB, nicht responsiv, kein modernes Format, alle sofort geladen.
8. Google Fonts extern (DSGVO-Risiko, Ladezeit).

**Mittel**
9. „Über mich“ zu dünn; Bildsprache ohne Ortsbezug; kein Logo/OG-Bild.
10. Funnel ohne Erwartungsmanagement (Antwortzeit, nächste Schritte), ohne Terminbuchung/Rückrufzeit, ohne Erfolgsmessung.
11. Fehlende Security-Header und Caching-Header.
12. Direktankauf gleichwertig neben Vermittlung platziert (Interessenkonflikt-Wahrnehmung).

**Niedrig**
13. Impressums-Floskel „verliehen in der Bundesrepublik Deutschland“, Navigation „Immobilie“ statt „Wohnung“, FAQ „Dauer“ ohne Orientierungswert, Footer ohne NAP, fehlender Skip-Link und Fokus-Management.

Die priorisierte Umsetzungsliste steht in `03-massnahmen.md`.
