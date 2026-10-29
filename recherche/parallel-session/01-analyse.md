# Analyse der bestehenden Webseite roessler-immo.de

**Stand der Analyse:** 29.10.2026 (Live-Seite, `last-modified` laut Server: 19.10.2026)
**Analysiert von:** Claude (Cloud-Session), auf Basis des Quelltexts, automatisierter Browser-Screenshots (Desktop 1366 px, Mobil 390 px) und HTTP-Messungen.

> Hinweis: Die Seite ist technisch eine **einzige HTML-Datei (45 KB)**. „Unterseiten“ wie `#verkaufen`, `#ankauf`, `#person`, `#kontakt`, `#impressum`, `#datenschutz` sind per JavaScript ein- und ausgeblendete Abschnitte (`<div class="view" hidden>`). Das prägt fast alle Befunde zu SEO und Struktur. Es gibt keine Seite „Kaufen/Angebote“; die Seite richtet sich ausschließlich an **Verkäufer von Eigentumswohnungen**.

---

## 1. Inhalte und Texte

### Was gut ist
- **Klare Positionierung.** Die H1 der Startseite lautet: *„Ihre Wohnung verkaufen. Mit einem klaren Plan.“* Der Fokus auf Eigentumswohnungen (nicht Häuser, nicht Vermietung) ist ungewöhnlich scharf und differenziert deutlich von Wettbewerbern, die „alles“ anbieten.
- **Konkretes Alleinstellungsmerkmal:** der *„schriftliche Verkaufsplan“* (eigener Abschnitt „Ihr Verkaufsplan“: *„Im Verkaufsplan halten wir fest, mit welchem Preis wir starten, welche Käufer wir ansprechen und was vor der Veröffentlichung zu erledigen ist.“*). Das ist greifbar und nachprüfbar.
- **Ehrliche, nüchterne Sprache.** Keine Superlative, keine „Traumimmobilie“, keine Stockfoto-Phrasen. Beispiel aus dem FAQ: *„Lassen Sie Ihre persönliche Situation vor einer verbindlichen Vereinbarung steuerlich prüfen; ich erbringe keine Steuerberatung.“*
- **Transparente Provision** direkt im FAQ: *„Verkäufer und Käufer zahlen jeweils 2,98 % des Kaufpreises einschließlich Umsatzsteuer. Bei 300.000 Euro sind das 8.940 Euro je Seite.“* Kaum ein Wettbewerber nennt Zahlen (siehe `02-wettbewerb.md`).
- **Sehr gute FAQ-Qualität** (10 Fragen Verkauf, 4 Fragen Direktankauf), inkl. heikler Punkte: Alleinauftrag-Laufzeit (6 Monate + 3 Monate Verlängerung, 4 Wochen Kündigungsfrist), Widerrufsrecht, Spekulationsfrist, Energieausweis.
- **Interessenkonflikt beim Direktankauf wird offen benannt:** *„Bei einem Eigenankauf bin ich Ihr Vertragspartner auf der Käuferseite. Mein Angebot berücksichtigt meine Kosten, Risiken und den geplanten Gewinn. Eine zusätzliche unabhängige Einschätzung können Sie jederzeit einholen.“* Das ist vorbildlich und schafft Vertrauen.

### Was fehlt oder schwach ist
- **Kein Vertrauensbeweis außer der Person.** Keine Kundenstimmen, keine Referenzen („verkauft“), keine Zahlen (Anzahl Verkäufe, durchschnittliche Vermarktungsdauer), keine Siegel/Mitgliedschaften (IVD, IHK-Zertifikat), kein Google-Bewertungs-Link. Alle untersuchten Wettbewerber haben mindestens eines davon.
- **Der § 34c-Hinweis bremst die Konversion massiv.** Er erscheint dreimal (Hero, Kontakt, Impressum), im Impressum sogar fett: *„Bis zur Erteilung werden keine Maklerleistungen erbracht und keine Aufträge angenommen.“* Rechtlich korrekt und notwendig, aber für einen Verkäufer das Signal „noch nicht im Geschäft“. Sobald die Erlaubnis da ist, muss das **sofort** raus (siehe `03-massnahmen.md`, Priorität Hoch).
- **„Über mich“ ist dünn:** drei Absätze, keine Qualifikation mit Nachweis (z. B. IHK-Sachkundeprüfung, Bewertungs-Zertifikat), kein Werdegang mit Stationen, kein Foto im Arbeitskontext, keine „Warum ich / Warum nicht ein großes Büro“-Argumentation.
- **Kein lokaler Inhalt.** Die fünf Orte (Heimsheim, Leonberg, Ditzingen, Renningen, Pforzheim) werden nur aufgezählt – als unverlinkte „Chips“ ohne Inhalt. Es gibt keine Aussage zu Preisniveau, Marktlage, Stadtteilen, typischen Wohnungsbeständen. Von Poll und Gäu Immobilien haben eigene Ortsseiten.
- **Keine Inhalte für die Phase „Orientierung“.** Das Formular bietet zwar *„zunächst orientieren“* als Option, aber auf der Seite gibt es keine Ratgeber, Checklisten (z. B. „Unterlagen-Checkliste als PDF“), Blog oder Marktbericht, die diese Zielgruppe binden.
- **Direktankauf wirkt für Erstbesucher potenziell verwirrend**, weil zwei gegensätzliche Rollen (Makler vs. Käufer) gleichrangig neben dem Hauptangebot stehen. Das kann die Glaubwürdigkeit als neutraler Makler untergraben, wenn es nicht noch klarer als „Option B für Sonderfälle“ gerahmt wird.
- **Standort-Widerspruch:** Das Geschäftsgebiet liegt im Raum Stuttgart/Pforzheim, die Impressum-Adresse ist *„Am Rück 19, 97618 Niederlauer“* (Unterfranken), Aufsichtsbehörde IHK München, Kammer IHK Würzburg-Schweinfurt. Für Verkäufer und für Google ist nicht erkennbar, dass es einen lokalen Bezug gibt. Es fehlt eine Erklärung („Ich bin in Heimsheim aufgewachsen / wohne in …“) oder eine lokale Kontaktadresse.

### Textliche Details
- Die Marke heißt im Title „Rössler Immobilien — Linus Rössler“, in der Hero-Zeile „Ich bin Linus Rössler“, im Footer „Rössler Immobilien, Linus Rössler“ – konsistent.
- Die Zahl „2,98 % je Seite“ taucht in FAQ und Vergleichstabelle auf; „ohne Maklerprovision“ beim Direktankauf. Konsistent.
- Kleinere Stil-Inkonsistenz: Im Hero heißt der zweite Button *„Mein Ablauf“*, im Karten-Abschnitt *„Ablauf ansehen →“*, der Nav-Punkt heißt *„Immobilie verkaufen“*, die H1 der Unterseite *„Ich begleite Ihren Wohnungsverkauf.“* (Immobilie ≠ Wohnung). Für die Positionierung wäre „Wohnung verkaufen“ überall konsequenter.

---

## 2. Struktur und Navigation

### Aufbau
| Nav-Punkt | Technisch | Inhalt |
|---|---|---|
| Start | `#start` | Hero, „Was wir vor dem Verkauf klären“ (3 Karten), „Vermittlung und Direktankauf“ (2 Karten), „Wohnungen in Heimsheim und Umgebung“, Kontakt-Band |
| Immobilie verkaufen | `#verkaufen` | Hero, „Der Ablauf in sieben Schritten“, „Ihr Verkaufsplan“, FAQ (10) |
| Direktankauf | `#ankauf` | Hero, „In drei Schritten“, „Welche Wohnungen infrage kommen“, Vergleichstabelle, „In welcher Rolle ich stehe“, FAQ (4) |
| Über mich | `#person` | 3 Absätze + Porträt |
| Kontakt | `#kontakt` | Kontakt-Band + Formular |
| (Footer) | `#impressum`, `#datenschutz` | Pflichtangaben |

### Bewertung
- **Positiv:** flache, verständliche Struktur mit 5 Punkten; Telefonnummer rechts in der Navigation (Desktop) und im Mobilmenü; jede Seite endet mit einem CTA „Verkauf besprechen“ bzw. „Wohnung anbieten“.
- **Problem 1 – Navigation besteht aus `<button>`-Elementen, nicht aus Links.** Quelltext: `<button data-go="verkaufen">Immobilie verkaufen</button>`. Folgen: Kein Rechtsklick „in neuem Tab öffnen“, keine URL zum Teilen pro Unterseite (nur `#hash`, das per `history.replaceState` gesetzt wird), Browser-Zurück-Taste führt nicht zur vorherigen Unterseite (replaceState statt pushState), Suchmaschinen und Screenreader erkennen keine Site-Struktur.
- **Problem 2 – Keine echten URLs.** `/verkaufen`, `/direktankauf` etc. existieren nicht; `sitemap.xml` liefert 404 (Server-Fehlerseite in Englisch: „Server Error 404 Page Not Found“). Google indexiert faktisch nur eine Seite mit einem Title.
- **Problem 3 – Startseite dupliziert die Unterseiten.** Die Kacheln „Was wir vor dem Verkauf klären“ und die Kontakt-Bänder wiederholen Inhalte von `#verkaufen` und `#kontakt`. Auf Desktop wirkt das aufgeräumt, auf Mobil wird die Startseite dadurch sehr lang (Screenshot: ca. 10.500 px bei 390 px Breite).
- **Problem 4 – Kein Breadcrumb / kein Footer-Menü.** Der Footer enthält nur „Impressum“ und „Datenschutz“; keine Wiederholung der Hauptnavigation, keine Adresse, keine Öffnungszeiten/Erreichbarkeit.
- **Problem 5 – „Kontakt“ ist Nav-Punkt und gleichzeitig Ziel aller CTAs.** Das ist in Ordnung, aber die Kontaktseite enthält kein Verkäufer-spezifisches Versprechen („Sie erhalten innerhalb von 24 Stunden eine Rückmeldung“ o. ä.).

---

## 3. Design und Markenwirkung

### Positiv
- **Ruhiges, seriöses Design:** Weiß, Dunkelblau (`#16233D`), eine Display-Schrift (Instrument Sans) und eine Leseschrift (Libre Franklin). Großzügige Abstände, klare Hierarchie, Split-Hero mit Bild. Wirkt professioneller als viele regionale Maklerseiten mit Baukasten-Optik.
- **Konsistente Komponenten:** Karten mit dünnem Rahmen, Navy-Bänder für CTAs, Akkordeon-FAQ (`<details>`), nummerierte Schritte. Alles handgeschrieben in einer CSS-Datei, keine Framework-Fremdkörper.
- **Porträtfoto** ist freundlich, hell, professionell (Anzug, Lächeln). Gute Grundlage für Personal Branding.

### Schwächen
- **Keine Marke jenseits des Namens.** Logo ist reiner Text („RÖSSLER / IMMOBILIEN“), Favicon ist ein 240-Byte-SVG. Kein Bildzeichen, keine Farb-Akzentfarbe (nur Navy + Grau), kein wiedererkennbares Element. Das ist nicht falsch, lässt aber Chancen liegen (Visitenkarte, Schilder, Exposé, Social Media).
- **Bildwelt ist generisch.** `neubau.jpg` (Neubaublock mit Rasen), `daecher.jpg` (Fachwerk-Altstadt von oben), `architektur.jpg`, `altbau.jpg`: alle wirken wie Stock-/Symbolbilder ohne erkennbaren Bezug zu Heimsheim, Leonberg oder Pforzheim. Ein Verkäufer aus Leonberg erkennt seine Stadt nicht wieder. Alt-Texte bestätigen das: *„Dächer einer gewachsenen Altstadt von oben“*.
- **Kein Bild zeigt den Makler bei der Arbeit** (Besichtigung, Gespräch, Unterlagen). Das Porträt erscheint zweimal identisch (`portrait.jpg` im Kontakt-Band und bei „Über mich“).
- **Hero-Text ist sehr lang für einen Hero** (4 Sätze + Ortsliste + 2 Buttons + grauer Hinweiskasten). Auf Mobil ist der erste Screen fast nur Text; das Bild rutscht per CSS (`order:-1`) nach oben, der Headline-Text beginnt erst nach dem Bild.
- **Sekundär-Button („Mein Ablauf“)** mit hellgrauem Rahmen hat auf Weiß wenig Kontrast und wirkt deaktiviert.
- **Farbe `--fg-soft: #55627A`** für Fließtext auf Weiß hat ein Kontrastverhältnis von ca. 6:1 (OK), auf dem hellgrauen Band `#F4F7FA` etwas weniger – gerade noch WCAG AA. Auf Navy ist `--on-navy-mute: #AEBCD4` ca. 7,5:1 (gut).

---

## 4. Mobilansicht

Getestet mit Playwright, Viewport 390 × 844 (iPhone-Größe), DPR 2.

### Positiv
- **Kein horizontales Scrollen**, Viewport-Meta korrekt, Schriftgröße 17 px, Zeilenlänge gut lesbar.
- **Burger-Menü** funktioniert: Vollflächiges Navy-Overlay mit großen Tap-Zielen, Telefonnummer als letzter Eintrag, Schließen per X, Scrim oder Escape. Das ist handwerklich sauber.
- **Formular** auf Mobil gut nutzbar: Felder in voller Breite, `type="tel"`, `type="email"`, `inputmode="numeric"`, `autocomplete`-Attribute gesetzt, Button in voller Breite.
- Das Layout bricht an sinnvollen Breakpoints (840/860/900 px) sauber auf eine Spalte um.

### Schwächen
- **Die Startseite ist auf Mobil ca. 27 Bildschirmhöhen lang** (10.500 px). Grund: die 3 + 2 Karten, der Ortsblock mit Bild, das Kontakt-Band mit Porträt. Der eigentliche CTA „Verkauf besprechen“ ist zwar früh da, aber die Wiederholungen ermüden.
- **Telefonnummer verschwindet auf Mobil aus der Kopfzeile** (`.topnum{display:none}` unter 840 px) und ist nur im geöffneten Menü sichtbar. Für eine lokale Dienstleistung ist ein **sticky Anruf-Button** oder die Nummer neben dem Burger Standard.
- **Kein Sticky-CTA** am unteren Rand (z. B. „Jetzt Wohnung einschätzen lassen“), wie ihn Homeday und Gäu Immobilien nutzen (Rückruf/WhatsApp-Leisten).
- **Die Karten-Links „Ablauf ansehen →“ und „Wie das abläuft →“** sind nur 18 px hoch (gemessen) – unterhalb der empfohlenen 44 px Tap-Höhe, obwohl die ganze Breite anklickbar ist. Die Karten selbst sind nicht klickbar.
- **Bilder werden auf Mobil in voller Desktop-Auflösung geladen** (1600 px breit, bis 500 KB) – kein `srcset`, kein `loading="lazy"`, kein WebP/AVIF. Auf 390 px Breite werden 1,6 MB Bilder für einen Screen mit 780 px Pixelbreite geladen.

---

## 5. Kontaktwege und Anfrage-Funnel (Schwerpunkt „Verkaufen“)

### Vorhandene Kontaktwege
| Weg | Vorhanden | Bewertung |
|---|---|---|
| Telefon (Mobilnummer 0159 …) | Ja, `tel:`-Link | Gut; aber nur Handynummer, keine Erreichbarkeitszeiten |
| E-Mail | Ja, `mailto:` | Gut |
| Kontaktformular | Ja | Siehe unten |
| WhatsApp | Nein | Wettbewerber (Gäu) bieten es |
| Rückruf-Service / Terminbuchung | Nein | Von Poll, Gäu, Homeday bieten es |
| Online-Wertermittlung | Nein | Der wichtigste Lead-Magnet der Branche fehlt |
| Adresse vor Ort / Karte | Nein | Nur Impressum-Adresse in Unterfranken |
| Social Media / Google Business | Nein | Nicht verlinkt |

### Das Kontaktformular (`#anfrage`, POST an `kontakt.php`)
Felder: Name (Pflicht), Telefon, E-Mail, Ort der Wohnung, Wohnfläche ca. (m²), Vermietet oder frei (Select), Was Sie vorhaben (Select: verkaufen lassen / Ankauf prüfen lassen / zunächst orientieren), Ihre Nachricht, Honeypot („Bitte frei lassen“, per CSS ausgeblendet) und ein verstecktes JS-Flag.

**Positiv:**
- Nur **ein Pflichtfeld** (Name), bewusst niedrige Hürde: *„Eine Telefonnummer oder E-Mail-Adresse genügt für die Rückmeldung.“*
- Die Qualifizierungsfelder (Ort, Fläche, vermietet, Vorhaben) sind genau die Angaben, die ein Makler für das Erstgespräch braucht. Das ist klug und knapp.
- Spam-Schutz ohne Captcha (Honeypot + JS-Flag). Versand per `fetch` mit JSON-Antwort, Fehlerfall zeigt Telefon/E-Mail als Alternative. `kontakt.php` antwortet auf GET mit 303 (d. h. der Endpunkt existiert und leitet um).
- Datenschutzhinweis unter dem Formular mit Link.

**Schwächen:**
- **Nur Name ist Pflicht, Telefon und E-Mail sind beide optional.** Technisch kann ein Nutzer das Formular ohne Kontaktmöglichkeit absenden. Mindestens „Telefon **oder** E-Mail“ sollte serverseitig und per JS erzwungen werden.
- **Kein Mehrwert-Versprechen am Formular.** Es gibt keinen Grund, *jetzt* zu schreiben: keine „kostenlose Erst­einschätzung innerhalb von 48 Stunden“, kein „Sie erhalten eine schriftliche Preisspanne“. Das Verkaufsplan-Argument der Startseite wird am Formular nicht wiederholt.
- **Einstufiges Formular statt Funnel.** Wettbewerber (Apfel: 5 Schritte, Homeday: „Ergebnis in 2 Minuten“) nutzen mehrstufige Bewertungs-Funnels, bei denen der Nutzer erst Objektdaten eingibt und zuletzt die Kontaktdaten – das erhöht nachweislich die Abschlussquote, weil der Nutzer bereits investiert hat.
- **Keine Bestätigungsseite / kein Tracking.** Nach dem Senden erscheint nur ein Text im selben Formularbereich. Es gibt keine Danke-Seite mit nächsten Schritten, keine Möglichkeit, Konversionen zu messen (kein Analytics – was datenschutzrechtlich entspannt ist, aber jede Optimierung blind macht).
- **Fehlende Checkbox zur Datenschutz-Kenntnisnahme** ist bei Art. 6 Abs. 1 lit. b DSGVO nicht zwingend, viele Wettbewerber setzen sie trotzdem (Von Poll, Wohntraum). Eher Vertrauens- als Rechtsfrage.
- **Der § 34c-Hinweis steht direkt über dem Formular** („Makleraufträge nehme ich an, sobald sie erteilt ist.“) – an der konversionskritischsten Stelle der Seite.

### Funnel-Logik insgesamt
Der Pfad ist: Hero → (optional Ablauf lesen) → „Verkauf besprechen“ → Formular. Es gibt **keinen Zwischenschritt mit geringerer Hürde** (z. B. „Preisspanne für meine Wohnung anfragen“, „Unterlagen-Checkliste herunterladen“, „Wie viel ist meine Wohnung wert?“). Für Verkäufer in der Orientierungsphase (die Mehrheit) ist der Sprung zum Kontaktformular zu groß.

---

## 6. SEO

### Technische Basis
| Element | Ist-Zustand | Bewertung |
|---|---|---|
| `<title>` | „Rössler Immobilien — Linus Rössler“ | Kein Suchbegriff, kein Ort. Sollte z. B. „Wohnung verkaufen in Heimsheim, Leonberg & Pforzheim – Rössler Immobilien“ lauten |
| Meta-Description | „Rössler Immobilien, Linus Rössler — Verkauf von Eigentumswohnungen in Heimsheim, Leonberg, Ditzingen, Renningen und Pforzheim.“ | Enthält Orte, aber keine Handlungsaufforderung/kein Nutzen |
| `lang` | `de` | Gut |
| Canonical | fehlt | Ergänzen (www und non-www liefern beide 200 ohne Redirect → Duplicate Content) |
| Open Graph / Twitter Cards | fehlen | Beim Teilen (WhatsApp, LinkedIn) erscheint keine Vorschau |
| Strukturierte Daten (JSON-LD) | fehlen | `RealEstateAgent`/`LocalBusiness` mit Adresse, Telefon, Gebiet, `FAQPage` für die 14 FAQs wären direkt umsetzbar |
| robots.txt | `User-agent: * / Allow: /` | OK, aber kein Sitemap-Verweis |
| sitemap.xml | 404 | Fehlt |
| H1 | 3 × H1 im DOM (Start, Verkaufen, Ankauf), nur eine sichtbar | Für Google sind alle drei im Quelltext – unklare Hierarchie |
| Überschriften | 16 × H2, 36 × H3 in einer Datei | Zu viel Struktur für „eine Seite“, zu wenig für sechs |
| Google Fonts | extern von `fonts.googleapis.com` | Datenschutz- und Ladezeit-Thema (siehe 7 und 8) |
| HTTPS | Ja, http → 301 https | Gut |
| www-Variante | `https://www.roessler-immo.de/` antwortet mit 200, kein Redirect | Duplicate Content, Canonical-Problem |

### Lokale Suchbegriffe
- Die Orte stehen in H2 (*„Wohnungen in Heimsheim und Umgebung“*), in der Meta-Description, als Chips und in Fließtext. Das ist ein Anfang.
- Es fehlen aber die **Suchphrasen, die Verkäufer tatsächlich eingeben**: „Wohnung verkaufen Leonberg“, „Immobilienmakler Heimsheim“, „Eigentumswohnung verkaufen Pforzheim“, „Wohnung bewerten lassen Renningen“, „Makler Ditzingen Provision“. Keine davon kommt als zusammenhängende Phrase vor.
- Da alle Inhalte in **einer URL** liegen, kann Google pro Suchbegriff nur diese eine Seite ausspielen. Wettbewerber (Gäu Immobilien) haben separate Ortsseiten `/immobilienmakler-leonberg/`, `/immobilienmakler-ditzingen/` usw.
- **Google Business Profile** ist nicht verlinkt und – ohne Geschäftsadresse im Gebiet – schwer anzulegen. Für die lokale 3er-Box („Map Pack“) ist das der größte Hebel überhaupt.
- Keine Backlinks erkennbar (nicht messbar von außen, aber die Seite ist neu und in keinem Verzeichnis gelistet: Immoscout-, Jacasa-, Immoportal-Suchen für Heimsheim/Leonberg zeigen Rössler Immobilien nicht).

---

## 7. Technik

Messung per curl und Playwright (Rechenzentrum in Europa, kein Mobilfunk):

| Kennzahl | Wert |
|---|---|
| HTML-Größe | 45,6 KB (unkomprimiert; `Vary: Accept-Encoding` gesetzt) |
| Time to First Byte | ca. 0,9–1,0 s (Server: nginx bei netcup, Karlsruhe) |
| Gesamt-Transfer beim ersten Aufruf | ca. 1,6 MB |
| davon Bilder | 1,59 MB (5 JPEGs à 142–488 KB, 1600 px breit) |
| DOMContentLoaded | 0,4–1,1 s |
| Load-Event | 1,8–2,5 s |
| Externe Requests | Google Fonts (1 CSS + Schriftdateien) |
| JavaScript | 1 Inline-Script, ca. 2,5 KB, kein Framework |

### Positiv
- **Extrem schlank:** kein CMS, kein jQuery, kein Cookie-Tool, keine Tracker, kein Chat-Widget. Das HTML ist sauber und valide strukturiert (ein `<main>`, ein `<header>`, ein `<footer>`, `<details>` für FAQ, `<address>` im Impressum).
- HTTPS mit HTTP/2, 301 von http auf https.
- Formular mit Honeypot, `autocomplete`, Input-Typen.

### Schwächen
- **Bilder sind der einzige Performance-Posten – und ein großer.** Alle Bilder werden sofort geladen (auch die in versteckten Views!), da `hidden` das Laden von `<img>` nicht verhindert. Auf Mobil werden also 1,6 MB geladen, obwohl nur 1–2 Bilder sichtbar sind. Lösung: `loading="lazy"`, `srcset`/`sizes`, WebP/AVIF, Breite/Höhe-Attribute (fehlen bei allen 6 Bildern → Layout-Shift).
- **TTFB von ca. 1 s** für eine statische Datei ist hoch. Mögliche Ursachen: kein Caching-Header, keine Kompression bestätigt, günstiger Shared-Host. `Cache-Control` fehlt komplett.
- **Keine Security-Header** (kein `Strict-Transport-Security`, `Content-Security-Policy`, `X-Content-Type-Options`, `Referrer-Policy`). Kein Risiko für Besucher, aber bei Sicherheits-Scannern und bei „Seriositäts“-Prüfungen (z. B. durch Banken-Kooperationspartner) ein Minuspunkt.
- **Google Fonts extern** = zusätzlicher DNS/TLS-Handshake zu Google (ca. 100–300 ms) und ein Datenschutzthema (siehe 8). Lokales Hosting der zwei Schriften ist ein 15-Minuten-Fix.
- **Englische Server-Fehlerseite** (404) im Plesk/nginx-Standard-Design („Server Error – Page Not Found – That's what you can do“). Sollte durch eine eigene deutsche 404-Seite ersetzt werden.
- **404 für /sitemap.xml**, keine 404-Behandlung für Tippfehler-URLs mit Rücksprung.

### Barrierefreiheit (von außen prüfbar)
- Positiv: Alle Bilder haben Alt-Texte; alle Formularfelder haben `<label>`; Burger hat `aria-label="Menü"` und `aria-expanded`; aktive Nav hat `aria-current="page"`; Escape schließt das Menü; `hidden`-Attribut blendet Views auch für Screenreader korrekt aus; `color-scheme: light` gesetzt.
- Negativ: Navigation per `<button>` ohne `href` (Screenreader kündigen „Schaltfläche“ statt „Link“ an, keine Link-Liste); **kein Skip-Link** („Zum Inhalt springen“); `window.scrollTo(0,0)` ohne Fokus-Management (nach Klick bleibt der Fokus auf dem Button im Header, Screenreader-Nutzer erfahren nicht, dass sich der Inhalt geändert hat); Sekundär-Button-Kontrast grenzwertig; Tap-Ziele der Karten-Links zu klein; keine `prefers-reduced-motion`-Behandlung (nur minimale Transitions, daher unkritisch).

---

## 8. Rechtliches

### Impressum (§ 5 DDG)
- Vorhanden und gut strukturiert: Name, Firmierung, Anschrift, Telefon, E-Mail, Berufsbezeichnung, berufsrechtliche Regelungen (GewO, MaBV mit Link gesetze-im-internet.de), Aufsichtsbehörde (IHK München, Referat VIII-4), zuständige Kammer (IHK Würzburg-Schweinfurt), Verbraucherstreitbeilegung (Ablehnung), Haftungshinweis.
- **Auffällig / zu prüfen:**
  - *„Berufsbezeichnung: Immobilienmakler (verliehen in der Bundesrepublik Deutschland)“* – „Immobilienmakler“ ist keine verliehene Berufsbezeichnung; die Formulierung ist aus Impressum-Generatoren für reglementierte Berufe übernommen. Besser: „Tätigkeit: Immobilienmakler nach § 34c GewO“.
  - Aufsichtsbehörde **IHK München und Oberbayern** bei Sitz in Niederlauer (Unterfranken) und Kammer **IHK Würzburg-Schweinfurt** – in Bayern erteilt die IHK München zentral die § 34c-Erlaubnis für alle bayerischen IHKs, insofern plausibel. Bei Umzug des Geschäftssitzes ins Tätigkeitsgebiet (Baden-Württemberg) wird das Landratsamt/die Stadt zuständig; dann Impressum anpassen.
  - **USt-ID:** *„Eine Umsatzsteuer-Identifikationsnummer liegt derzeit nicht vor.“* Korrekt, falls keine vorhanden; Hinweis auf Kleinunternehmerregelung (§ 19 UStG) fehlt aber – und die Provision wird mit „einschließlich Umsatzsteuer“ (2,98 % = 2,5 % + 19 %) angegeben. Steuerlich klären: entweder Kleinunternehmer (dann ohne USt-Ausweis) oder Regelbesteuerung (dann USt-IdNr. oder Steuernummer).
  - **Das Erlaubnis-Statement** („… ist beantragt und noch nicht erteilt. Bis zur Erteilung werden keine Maklerleistungen erbracht und keine Aufträge angenommen.“) ist rechtlich die richtige Vorgehensweise. Es muss **am Tag der Erteilung** durch die Erlaubnis-Nummer/Behörde ersetzt werden.

### Datenschutzerklärung (DSGVO)
- Vorhanden, verständlich formuliert, deckt ab: Verantwortlicher, Server-Logs (Art. 6 Abs. 1 lit. f, Löschung nach 7 Tagen), Kontaktaufnahme (lit. b/f), Weitergabe an Dritte (Notar, Bank, Hausverwaltung), **Geldwäschegesetz** (lit. c, 5 Jahre – gut, das vergessen viele Makler), Betroffenenrechte, Beschwerderecht (BayLDA Ansbach), Hosting (netcup, AVV nach Art. 28), Google Fonts.
- **Kritischer Punkt – Google Fonts:** Die Erklärung sagt: *„Diese Seite lädt Schriftarten von Google Fonts (Google Ireland Limited). Dabei wird Ihre IP-Adresse an Google übertragen. Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO.“* Seit dem Urteil des LG München I (3 O 17493/20, Januar 2022) ist die dynamische Einbindung von Google Fonts ohne Einwilligung ein **Abmahnrisiko**; die Berufung auf lit. f wird von Gerichten und Aufsichtsbehörden überwiegend nicht akzeptiert. **Lösung: Schriften lokal hosten** (Instrument Sans und Libre Franklin sind beide unter SIL Open Font License frei) und den Absatz streichen. Das ist die wichtigste rechtliche Maßnahme.
- **Cookies:** Die Seite setzt **keine Cookies** und bindet keine Tracker ein – daher ist **kein Cookie-Banner nötig**. Das ist ein echter Vorteil (kein nerviges Overlay) und sollte in der Datenschutzerklärung ausdrücklich erwähnt werden („Diese Website setzt keine Cookies.“).
- **Fehlt:** Hinweis auf den Formular-Versandweg (wo landen die Mails? Beim Hoster netcup – ist abgedeckt), Auftragsverarbeiter für E-Mail falls extern; Hinweis auf Widerrufsbelehrung für Verbraucher beim Maklervertrag im Fernabsatz (steht nur im FAQ, nicht als eigene Seite/Muster-Widerrufsformular – wird spätestens beim ersten Auftrag gebraucht).
- **Fehlt:** Hinweis nach § 36 VSBG ist vorhanden (Ablehnung), OS-Plattform-Link (Art. 14 ODR-VO) wird seit Juli 2025 nicht mehr benötigt – korrekt weggelassen.

### Fazit Rechtliches
Grundsolide und ehrlich, weit über dem Durchschnitt kleiner Maklerseiten. Zwei konkrete To-dos: **Google Fonts lokal hosten** (Abmahnrisiko) und **Berufsbezeichnungs-/USt-Formulierung** schärfen. Dazu der Pflicht-Update am Tag der § 34c-Erteilung.

---

## 9. Gesamtbewertung

| Bereich | Note (1–5) | Kurzurteil |
|---|---|---|
| Inhalte & Texte | 4 | Klar, ehrlich, fachlich stark; fehlt Vertrauensbeweis und lokaler Inhalt |
| Struktur & Navigation | 2,5 | Logisch, aber technisch eine Seite mit Buttons statt Links |
| Design & Marke | 3,5 | Seriös und ruhig; generische Bilder, kaum Markenzeichen |
| Mobil | 3 | Sauber umgesetzt; zu lang, keine Nummer/CTA im Sichtbereich, schwere Bilder |
| Kontakt & Funnel | 2,5 | Gutes schlankes Formular; kein Lead-Magnet, kein Zwischenschritt, § 34c-Hinweis vor dem Formular |
| SEO | 1,5 | Praktisch nicht auffindbar: ein Title ohne Keyword, eine URL, keine Ortsseiten, kein Google-Profil |
| Technik | 3,5 | Schlank und sauber; Bilder unoptimiert, TTFB hoch, keine Caching/Security-Header |
| Rechtliches | 4 | Vollständig und verständlich; Google Fonts extern ist das einzige echte Risiko |

**Kernsatz:** Die Seite ist eine sehr gute *Visitenkarte* mit ungewöhnlich ehrlichen und fachlich starken Texten – aber sie ist derzeit **kein Akquise-Instrument**: Niemand findet sie über Google, und wer sie findet, bekommt keinen leichten ersten Schritt und keinen Beleg, dass andere Verkäufer zufrieden waren.
