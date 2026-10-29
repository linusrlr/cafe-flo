# Benchmark-Recherche: Makler-Websites in deutschen Großstädten
## Lernvorlage für Rössler Immobilien (Linus Rössler, Heimsheim / Leonberg / Ditzingen / Renningen / Pforzheim)

Stand der Recherche: 29. Oktober 2026
Ersteller: Recherche-Agent (automatisierte Abrufe per curl/Python, Sitemaps, Quelltext-Analyse)
Zielseite: https://roessler-immo.de/ (One-Pager; H1 laut Quelltext: „Ihre Wohnung verkaufen. Mit einem klaren Plan.", Sektionen u. a. „Was wir vor dem Verkauf klären", „Vermittlung und Direktankauf", „Ich verkaufe für Sie")

---

## 0. Methodik, Auswahl und Lesehinweise

### 0.1 Vorgehen
1. Websuchen (WebSearch) mit den vorgegebenen Suchideen: „Immobilienmakler Hamburg Wohnung verkaufen Einzelmakler", „Immobilienmakler Berlin Eigentumswohnung verkaufen Spezialist vermietete Wohnung", „vermietete Wohnung verkaufen Makler Spezialist", „Direktankauf Wohnung Makler Ankauf", „Immobilienmakler Frankfurt Ratgeber Erbimmobilie", „Immobilienmakler Köln Einzelmakler persönlich", „Immobilienmakler Stuttgart Wohnung verkaufen Ratgeber Erbimmobilie", „Immobilienmakler Nürnberg …", „Immobilienmakler Düsseldorf …", außerdem „beste Immobilienmakler Webseiten Deutschland Beispiele", „Makler Website Award".
2. Ergebnis der „Best-Practice"-Suchen: Es gibt in Deutschland **keinen belastbaren Award für Makler-Websites**. Gefunden wurden nur allgemeine Makler-Auszeichnungen (ImmoScout24 „ImmoAward", BELLEVUE „Best Property Agents", Capital „Makler-Kompass", F.A.Z.-Institut „TOP Makler", DISQ-Studie 2020 zu regionalen Makler-Portalen) sowie Agentur-Listen (Hostinger, Magier), die nicht auf Deutschland fokussiert sind und laut Magier-Artikel teilweise Seiten nicht existierender Betreiber enthielten. Die Auswahl unten beruht deshalb auf eigener Sichtung der Suchtreffer (Seitenstruktur, Sitemap-Umfang, Inhaltstiefe, Positionierung).
3. Pro Website wurden Startseite, Sitemap(s) und mindestens 4–13 Unterseiten vollständig heruntergeladen (Verzeichnis: `/tmp/claude-0/-home-user/e7214d44-0169-5a35-af11-cf04a7507b2a/scratchpad/dl-staedte/<kürzel>/`). Aus dem Quelltext wurden Title, Meta-Description, Überschriften (H1–H3), Schema.org-Typen, Tracking-/Cookie-Tools, Fonts, Farbwerte, Alt-Texte, Medien-Embeds extrahiert.
4. Alles Zitierte ist wörtlich aus den heruntergeladenen Seiten übernommen (Zeichensetzung ggf. normalisiert). Nicht Prüfbares ist als **„nicht prüfbar"** markiert. Visuelle Eigenschaften (Layout, Bildwirkung) sind aus Quelltext/Alt-Texten/Farbwerten abgeleitet und entsprechend gekennzeichnet („aus Quelltext abgeleitet").
5. Ladezeit: Es wurde keine Lighthouse-Messung durchgeführt; Angaben zur Ladezeit beruhen auf HTML-Größe, Anzahl externer Skripte und CMS-Hinweisen („grob").

### 0.2 Ausgewählte Websites (9)

| # | Website | Stadt | Warum ausgewählt |
|---|---------|-------|------------------|
| 1 | aēstates GmbH – https://aestates.com/ | Hamburg | Inhabergeführtes „Boutique-Office", Social-Media-/Video-Vermarktung, kleine Seite (9 URLs) |
| 2 | David Gramzow – https://www.david-gramzow.de/ | Berlin | Einzelmakler-Persona („Ich"), Spezialist für vermietete Wohnungen, Erbe/Scheidung, Finanzierungsprüfung; sehr starker Ratgeber |
| 3 | Marc Härter Immobilien – https://marchaerter-immobilien.de/ | Frankfurt | Inhabergeführter Boutique-Makler, 5,0/178 Google, ~90 Ratgeberartikel, Stadtteilseiten, Erbe/Scheidung/vermietete Wohnung |
| 4 | Baumann Immobilien – https://www.baumann-immobilien.com/ | Frankfurt | Klassischer Einzelmakler (Inhaber Bernd Baumann), „Ich"-Tonalität, schlanke Seite – Gegenbeispiel zu 3 |
| 5 | PORTIMMO GmbH – https://www.portimmo.de/ | Stuttgart | Inhabergeführt, DEKRA-Bewertung, **Direktankauf-Seite**, Ortsseiten u. a. für Leonberg, Ditzingen, Pforzheim (= Rösslers Gebiet) |
| 6 | Immo Invest GmbH – https://immoinvest-stuttgart.de/ | Stuttgart | Direktankauf-Spezialist („Kauf mit Eigenkapital", „provisionsfrei"), 8-URL-Seite mit Funnel |
| 7 | Oerter Immobilien e.K. – https://oerter-immobilien.de/ | Nürnberg | Inhabergeführt (e.K.), „Besondere Situationen"-Seite, Anlageobjekte, sehr eigenständige Textsprache |
| 8 | AusBlick Immobilien eGbR – https://ausblick-immobilien.com/ | Düsseldorf | Zwei Inhaberinnen, 44 Ratgeber + 32 Stadtteilseiten mit amtlichen Marktdaten, Fallstudien |
| 9 | Philipp Weiß Immobilien – https://www.philipp-weiss-immobilien.de/ | Köln | Einzelmakler, Spezialist „Rendite- & Wohnimmobilien", „Verkaufs-Zusicherung" mit Kennzahlen |

Einzelmakler/kleine Büros: 1, 2, 3, 4, 7, 8, 9. Spezialisten (Wohnungen/Anleger/Direktankauf): 2, 5, 6, 9 (und 3 thematisch).

### 0.3 Nicht ausgewählt (zur Einordnung)
- Rheingold Immobilien (Köln) und Weihofen Immobilien (Köln): eigene Domain über Suche nicht auffindbar (nur Verzeichniseinträge) → **nicht prüfbar**.
- Citak Immobilien (Köln, https://citak-immobilien.de/): Divi/onOffice-Seite mit 813 Sitemap-URLs (überwiegend Objekte), ProvenExpert, FAQ-Schema; eher Büro als Einzelmakler, deshalb zugunsten von Philipp Weiß nicht vertieft.
- Alexander Immobilienmakler Hamburg (474 URLs, Stadtteilseiten), Bricks & Mortar Nürnberg (51+ Mitarbeiter), duesselraum.de (Bot-Schutz „Sicherheitscheck…", nicht abrufbar), Makler Max Stuttgart (274 URLs, Ratgeber-lastig, Inhaberstruktur unklar), Dornbusch Immobilien Frankfurt (119 URLs, onOffice/Usercentrics).

---

## 1. aēstates GmbH – https://aestates.com/ – Hamburg

### 1.1 Typ, Team, Spezialisierung, Zielgruppe
- **Typ:** kleines inhabergeführtes Büro („Boutique-Office"), GmbH. Selbstbeschreibung auf /uber-uns: „aestates ist kein Franchise-Unternehmen mit Schaufenster oder Werbefläche. Wir sind ein modernes Boutique-Office aus Hamburg – inhabergeführt, unabhängig und klar positioniert."
- **Teamgröße:** 8 Personen laut Startseite/Über uns: „Susanne Liss Gründerin, Geschäftsführerin · Tino Krohn Gründer · Olivia Wolf Assistenz der Geschäftsführung · Lina Köhlert Immobilienmaklerin · Deana Leann Reinecke Immobilienmaklerin · Fabio Rafii Immobilienmakler · Lutz Paare Objektbewertung · Akiki Moerchen Objektbewertung & Immobilienmaklerin".
- **Spezialisierung:** Wohnimmobilien in Hamburg mit Schwerpunkt Social-Media-/Video-Vermarktung und Luxussegment („Exklusives Wohnen im Luxus durch aestates"), zusätzlich eigenes Neubauprojekt „The Gardens – Finest Living in Winterhude".
- **Zielgruppe:** private Verkäufer in Hamburgs gefragten Lagen („Ob Altbau in Eppendorf, Neubau in Winterhude oder Stadtvilla an der Elbe") und Käufer.

### 1.2 Navigation und Seitenumfang
- **Hauptnavigation (wörtlich):** „Startseite | Verkaufen | Immobilien | Über uns | Kontakt" + Button „Immobilie bewerten" + „Kontakt aufnehmen".
- **Footer (wörtlich):** Block „Unternehmen": „Verkaufen | Immobilien | Über uns | Kontakt"; Block „aestates Objekte": „Immowelt | ImmoScout24 | Immobilie bewerten lassen"; „Aestates Immobilien @aestates.immobilien | 5.100+ Follower"; „Impressum | Datenschutz © 2025 aestates GmbH. Alle Rechte vorbehalten"; Adresse „aestates GmbH Poelchaukamp 8 22301 Hamburg", „info@aestates.com", „040 987682800".
- **Sitemap (https://aestates.com/sitemap.xml):** 9 URLs: `/`, `/datenschutz`, `/immobilien`, `/immobilien-bewertung`, `/impressum`, `/kontakt`, `/social-media-managerin`, `/uber-uns`, `/verkaufen`. → Keine Ratgeber-, keine Stadtteilseiten.

### 1.3 Startseite
- **Title:** „aestates GmbH | Digitale Immobilienvermittlung in Hamburg für Käufer & Verkäufer"
- **Meta-Description:** „Immobilie sicher verkaufen? Verlässliche Betreuung, geprüfte Käufer & transparente Abwicklung. Jetzt Vorort beraten lassen und Ersteinschätzung erhalten."
- **Hero-Headline (H1):** „Immobilien sorglos verkaufen - Persönlich. Digital. Erfolgsorientiert." Darüber Kicker „THE NEW ERA".
- **Subline/erste H2:** „Weil der erste Eindruck zählt." mit Text: „Während andere noch suchen, wird Ihre Immobilie bereits entdeckt – emotional inszeniert und gezielt ausgespielt. Durch hochwertige und kinoreife Verkaufsvideos auf Social Media entsteht echtes Interesse schon vor der ersten Besichtigung – emotional, zielgerichtet und dort, wo Käufer heute suchen."
- **Primärer CTA:** „Immobilie bewerten" (Header-Button) und Inline-Formular „Erhalten Sie eine persönliche Bewertung Ihrer Immobilie." mit Auswahl „Einfamilienhaus | Wohnung | Grundstück | Andere" → Button „Bewertung fortsetzen". Sekundär: „Jetzt Verkaufsberatung per WhatsApp starten" / „Direktkontakt über WhatsApp".
- **Sektionen in Reihenfolge (aus Quelltext):**
  1. Hero (H1, CTA, Instagram-Hinweis „@aestates.immobilien | 5.100+ Follower", „Instagram Kooperationspartner @Hamburg & @mr.unrealestate 566.000 & 381.000 Abonnenten")
  2. „Weil der erste Eindruck zählt." (Video-/Social-Argument)
  3. Bewertungs-Formular (Schritt 1: Objektart)
  4. WhatsApp-Block
  5. „Erfahrung trifft Ehrgeiz – das ist aestates." (Team-Vorstellung mit 8 Personenfotos, Alt-Texte z. B. „Susanne Liss, Gründerin und Geschäftsführerin der aestates GmbH")
  6. „Unkomplizierte & transparente Zusammenarbeit mit aestates" – 4 Schritte: „1 Persönliches Kennenlernen und Bewertung Ihrer Immobilie", „2 Individuelles Exposé & Vermarktungsstrategie", „3 Marketing und Vermarktung", „4 Rechtssicher bis zum Abschluss"
  7. Standort-Block „aestates – Boutique-Office in Winterhude", Öffnungszeiten „Mo. - Fr.: 08:00 - 19:00 Uhr / Sa. - So.: 10:00 - 16:00 Uhr"
  8. Newsletter „Der Newsletter für Immobilien – ohne Spam!"
  9. FAQ-Akkordeon „Auf die meistgestellten Fragen haben wir schnell eine Antwort." (7 Fragen: „Wie hilft ein Makler? | Warum nicht selbst verkaufen? | Was kostet ein Makler? | Wie lange dauert ein Verkauf? | Vermarktung der Immobilie | Was bedeutet "gekauft wie gesehen"? | Was kommt nach dem Notartermin?") – Antworten werden per JavaScript geladen, Inhalte im statischen HTML nicht enthalten → **nicht prüfbar**.
  10. SEO-Textblöcke: „aestates – moderne Immobilienvermarktung in Hamburg", „Leben in der schönsten Stadt Deutschlands", „Exklusives Wohnen im Luxus durch aestates", „Immobilien bewerten lassen - Ohne Mondpreise", „The Gardens - Finest Living in Winterhude"
- **Persönlichkeit:** Team statt Einzelperson; Vorstellung über Portraits und „Lerne das Team besser kennen"; auf /uber-uns Buttons „Lerne Susi kennen | Lerne Deana kennen | Lerne Lina kennen | Lerne Lutz kennen | Lerne Tino kennen | Lerne Akiki kennen" (Inhalte per Modal, nicht im HTML → nicht prüfbar). Kein Gründer-Video im Quelltext; Videos werden als Vermarktungsinstrument („kinoreife Verkaufsvideos") beschrieben, nicht als Über-uns-Element. Duzen in Team-Buttons („Lerne Susi kennen"), Siezen im Rest.

### 1.4 Verkaufen-Funnel (https://aestates.com/verkaufen)
- **Title:** „Immobilie verkaufen | aestates GmbH – Effizienter Immobilienverkauf für optimale Erlöse"; **Meta:** „Verkaufen Sie Ihre Immobilie mit aestates in Hamburg – effiziente Vermarktung, digitale Reichweite und professionelle Beratung für beste Erlöse."
- **Hero-Text:** „Stressfrei verkaufen. Persönlich begleitet. Mit klarer Strategie. Persönliche Betreuung, eine klare Vermarktungsstrategie und volle Transparenz. - Das ist aestates."
- **Versprechen:** „Dank digitalisierter Dokumentation behalten Sie jederzeit den Überblick und sehen live, welche Schritte gerade umgesetzt werden" / „Sie wissen jederzeit, was mit Ihrer Immobilie passiert – ob per Live-Aktivitätenbericht oder persönlichem Ansprechpartner."
- **Einwandbehandlung (Privatverkauf):** Zitat-Block „"Ich verkaufe lieber selbst, um Maklerkosten zu sparen." Klang gut – bis zur Realität." mit Stichpunkten „Wochenlang keine Anfragen | Nur Besichtigungstouristen | Falscher Preis, Geld verschenkt | Schlechte Verhandlungsposition | Stress statt Ersparnis | Haftungsrisiko bei Fehlern".
- **Ehrlichkeits-Claim:** „Was uns dabei besonders macht: Wir sind ehrlich. Wir nehmen kein Objekt an, nur um Erwartungen zu schüren, die nicht erfüllbar sind."
- **Schritte „Die effektivste Methode, um den passenden Käufer zu finden.":** „1. Immobilie inserieren (ImmoScout24, Immowelt …) 2. Sichtbarkeit stärken (Social-Media-Strategie) 3. Starkes Netzwerk (Newsletter, Netzwerk, Offline-Kanäle) 4. Persönliche Vorqualifizierung (Jeder Interessent wird persönlich kontaktiert, vorab geprüft und gezielt zur Einzelbesichtigung eingeladen) 5. Verkaufsabwicklung (über unseren Partnernotar – oder auf Wunsch über Ihren eigenen)".
- **Bewertungstool (/immobilien-bewertung):** mehrstufiges Formular; Schritt 1 Objektart; weitere Schritte sichtbar als Erklärtexte: „Immobilienzustand: Neuwertig / Erstbezug – Sehr gepflegt / modernisiert – Teilmodernisiert – Renovierungsbedürftig" und „Qualität: luxuriös – gehoben – normal – einfach" mit jeweils einer Satz-Definition (z. B. „Teilmodernisiert: Einige Bereiche der Immobilie (z. B. Badezimmer, Küche) wurden bereits erneuert …"). Kein Sofort-Ergebnis; Lead-Formular. Versprechen: „schnell, diskret und unverbindlich."
- **Besonderheiten:** keine Festpreisgarantie, kein Direktankauf, kein Verkaufsplan-Download.

### 1.5 Ratgeber-/Info-Seiten
- **Keine** Ratgeber-Seiten (Sitemap). Wissensvermittlung nur über FAQ-Akkordeon (Fragen s. o., Antworten nicht prüfbar) und Newsletter-Versprechen „Exklusive Vermarktungsstrategien über Social Media … nur für private Verkäufer".
- Lebenssituationen (Erbe/Scheidung): nicht vorhanden.

### 1.6 Stadtteil-/Ortsseiten
- Keine. Lagen nur als Aufzählung im Text („Altbau in Eppendorf, Neubau in Winterhude oder Stadtvilla an der Elbe").

### 1.7 Vertrauenselemente
- Instagram-Follower: „@aestates.immobilien | 5.100+ Follower"; Kooperations-Accounts „@Hamburg & @mr.unrealestate 566.000 & 381.000 Abonnenten".
- Google-/Portal-Bewertungen auf der Website: nicht dargestellt (Elfsight-Widget im Quelltext erkennbar, Inhalt nicht im HTML → nicht prüfbar). Drittquelle JACASA (Suchergebnis): „5,0 … 207 Bewertungen auf 3 Portalen" – nicht von der Website selbst.
- Referenzen „verkauft in X Tagen": keine. Zahlen: keine außer Follower.
- Siegel/Presse: keine. Garantien: keine. Video: beschrieben, nicht eingebettet (nicht prüfbar).

### 1.8 Kontaktwege
- Telefon „040 987682800", E-Mail, **WhatsApp** (wa.me, mehrfach als CTA), Kontaktformular (Anrede Herr/Frau, Felder ohne Label-Text im HTML, AGB-Checkbox, Button „Anliegen absenden"), Zusage „wir melden uns innerhalb 24 Stunden per E-Mail". Calendly-Skript im Quelltext (Terminbuchung), Öffnungszeiten inkl. Wochenende („Sa. - So.: 10:00 - 16:00 Uhr").

### 1.9 Design & Marke (aus Quelltext abgeleitet)
- Farben: dominant Anthrazit „#444444" (89×), helles Grau „#f7f7f7", warme Beige-/Brauntöne „#d3cabd", „#5f523f" → gedeckt, „Boutique"-Look. Font: „Circular" (Custom-Font), CSS-Variablen.
- Bildsprache: 30 Bilder, überwiegend Team-Portraits (Alt-Texte mit Namen/Funktion) – Menschen statt Stock-Häuser.
- Tonalität: „Wir", Sie-Form im Fließtext; Du-Form in Team-Buttons („Lerne Susi kennen") und Newsletter-Teaser („Merkmale, die dir bei der Einschätzung helfen") – inkonsistent.
- Nicht generisch: Social-Media-/Video-Positionierung, Newsletter „ohne Spam", WhatsApp-First, Boutique-Narrativ. Wirkt Template-/Baukasten-artig: Divi-Klassen, „onepage"-Marker, englischer Kicker „THE NEW ERA", viele leere `<li>`-Container, Elfsight-Widget.

### 1.10 SEO
- Title/Meta Start und Verkaufen s. o. H1 Start: „Immobilien sorglos verkaufen - Persönlich. Digital. Erfolgsorientiert." – kein Keyword „Immobilienmakler Hamburg" in H1; Verkaufen-Seite hat **keine H1** (nur H2s).
- Lokale Keywords: „Hamburg", „Winterhude", „Eppendorf", „Elbe" im Text. Blog-Frequenz: kein Blog. Schema.org: nur `WebSite` ohne Namen (`"name": ""`) – kein RealEstateAgent, kein FAQPage.

### 1.11 Technik
- CMS: Divi-Klassen und „onepage"-Strings im Quelltext, kein WordPress-Generator-Tag (nicht eindeutig; vermutlich WordPress/Divi oder Divi-Export → nicht prüfbar). Tracking: gtag, Google Tag Manager, Facebook Pixel (fbq), Calendly, Elfsight. Cookie-Banner: im HTML nicht erkennbar (Borlabs/Cookiebot/Usercentrics fehlen) → Consent-Lösung **nicht prüfbar**, Tracking-Skripte sind im Quelltext vorhanden.
- Ladezeit grob: schlank (≈1.100 Wörter, 30 Bilder, wenige Skripte) – vermutlich schnell.

### 1.12 Rechtliches
- Impressum (/impressum): „aestates GmbH Poelchaukamp 8 22301 Hamburg … Geschäftsführerin Susanne Liss USt.-ID-Nr. DE 362888699 Zuständige Aufsichtsbehörde Fachamt Verbraucherschutz, Gewerbe und Umwelt Kümmellstraße 6 20249 Hamburg 040 428040 … Erlaubnis nach § 34c der Gewerbeordnung (GewO) durc…" → § 34c und Aufsichtsbehörde vorhanden; Handelsregisternummer im extrahierten Text nicht sichtbar → **nicht prüfbar**.

### 1.13 Stärken / Schwächen / Übernahme für Rössler
**Stärken**
- Klare Positionierung über ein einziges Differenzierungsmerkmal (Social-Video-Vermarktung) statt „Alles für alle".
- Sehr direkte Kontaktwege (WhatsApp, 24-h-Antwortzusage, Wochenend-Zeiten).
- Einwandbehandlung Privatverkauf als pointierter Zitat-Block.
- Transparenz-Versprechen „Live-Aktivitätenbericht".

**Schwächen**
- Null Ratgeber-/Ortsinhalte → keine SEO-Tiefe, keine Lebenssituationen.
- FAQ-Antworten und Team-Profile nur per JS (für Crawler/Nutzer ohne JS unsichtbar).
- Keine belegten Zahlen (Verkäufe, Dauer, Bewertungen) auf der Seite selbst; Schema unvollständig; Verkaufen-Seite ohne H1.
- Du/Sie-Mischung.

**Für Rössler übernehmen**
1. Einwandbehandlung „Ich verkaufe lieber selbst" als eigene Sektion mit 5–6 konkreten Risiken (auf Eigentumswohnungen gemünzt: WEG-Unterlagen, Besichtigungstouristen, Finanzierung platzt).
2. Antwortzusage („innerhalb 24 Stunden") und WhatsApp-Direktkontakt sichtbar im Header/Footer.
3. 4-Schritte-Prozess mit knappen Verben – aber mit Zahlen/Belegen anreichern (was aēstates fehlt).
4. Nicht übernehmen: Verzicht auf Ratgeber/Ortsseiten; englische Kicker; Du/Sie-Mix.

---

## 2. David Gramzow GmbH – https://www.david-gramzow.de/ – Berlin

### 2.1 Typ, Team, Spezialisierung, Zielgruppe
- **Typ:** Einzelmakler-Persona mit GmbH („David Gramzow GmbH", Impressum), Büro im Coworking („Leipziger Platz 16, c/o Design Offices, 10117 Berlin"). Sitemap enthält zwei Autoren (`/author/david/`, `/author/heyer/`) → mindestens eine zweite Person; nach außen tritt ausschließlich David Gramzow auf („Ich bin David Gramzow — studierter Immobilienökonom, Jurist mit Bachelor of Laws (LL.B.) in Rechtswissenschaften und Finanzierungsexperte in Berlin.").
- **Teamgröße:** nicht prüfbar (Seite `/ansprechpartner/` liefert HTTP 500).
- **Spezialisierung:** „Problemlöser" für schwierige Verkäufe (Erbengemeinschaft, laufender Kredit, vermietete Wohnung, Zinshaus) + Baufinanzierung (eigene Plattform „keymatch.ai"); Objektarten Wohnung/Haus/Mehrfamilienhaus; zusätzlich Denkmalimmobilien, Mikroapartments, Kapitalanlage.
- **Zielgruppe:** Eigentümer in Berlin, „gerade dann, wenn es nicht der Standardfall ist"; Kapitalanleger; englischsprachige Käufer (Seiten „buying-house-in-germany", „german-mortgage-calculator", „indian-guide-buying-house-in-germany").

### 2.2 Navigation und Seitenumfang
- **Hauptnavigation (wörtlich):** „Kaufen | Verkaufen | Über uns | David Gramzow | Karriere | YouTube Kanal | Magazin zum Immobilienmarkt | Kontakt".
- **Footer (wörtlich, Spalten):** „Darlehensarten: Annuitätendarlehen | Endfällige Darlehen | Volltilger-Darlehen | Konstantdarlehen | Zwischenfinanzierung | Bausparen" — „Immobilien Berlin: Immobilie verkaufen Berlin | Haus verkaufen Berlin | wohnung verkaufen Berlin | Immobilienmakler Berlin | Denkmalimmobilie kaufen | Denkmalimmobilien Berlin | Denkmalimmobilie Leipzig | Kapitalanlage Immobilien | Kapitalanlage Immobilien Berlin | Mehrfamilienhaus verkaufen Berlin | Microapartments Berlin" — „Kontakt: Leipziger Platz 16, c/o Design Offices 10117, Berlin Deutschland" — „Folge uns" — „© 2022 David Gramzow GmbH | Impressum | Datenschutz".
- **Sitemap (Yoast: sitemap_index.xml → page/post/property/…):** 118 Seiten-URLs (ohne Bilder), davon ca. 50 Magazin-Artikel unter `/immobilien-news/`, ca. 10 Objektseiten `/properties/…`, ca. 25 Finanzierungs-/Rechner-Seiten, 4 Verkaufs-Landingpages, Stadtteil-Landingpages (`/wohnung-verkaufen-berlin-mitte/`, `/eigentumswohnung-verkaufen-berlin-prenzlauer-berg/`).

### 2.3 Startseite
- **Title:** „Ihr lokaler Experte für den Immobilienverkauf in Berlin."
- **Meta:** „Wir verkaufen Ihre Immobilie in Berlin. Immobilienexperte für den Verkauf von Häusern, Wohnungen und Mehrfamilienhäuser in Berlin."
- **H1:** „Immobilien­probleme lösen."
- **Subline:** „Immobilie verkaufen in Berlin — gelöst, nicht nur vermittelt." / „Ich denke Wert, Preis, Käufer und Finanzierung zusammen — und sage ehrlich, was für Sie möglich ist."
- **Primärer CTA:** „Problem schildern" (!) – sekundär „Immobilie bewerten". Direkt darunter Presse-Leiste: „Zitiert in DIE ZEIT Frankfurter Allgemeine Handelsblatt Berliner Morgenpost – Alle Pressestimmen →".
- **Sektionen in Reihenfolge:**
  1. Hero + Presse
  2. „Das Problem" – H2 „Manche Immobilien verkauft man. Andere muss man lösen." Text: „Sobald ein Verkauf kompliziert wird — Erbengemeinschaft, laufender Kredit, vermietete oder ungewöhnliche Immobilie — hängen Wert, Finanzierung, Recht, Käufer und Timing zusammen. Dann braucht es keine weitere Anzeige, sondern jemanden, der die ganze Lage versteht und löst."
  3. „Die Lösung" – H2 „Das Zwei-Schlüssel-Prinzip." – „Ein Immobilienverkauf ist erst sicher, wenn beide Schlüssel passen: Ihre Entscheidung — und die gesicherte Finanzierung des Käufers. Klassische Makler kümmern sich um den ersten Schlüssel und hoffen beim zweiten."; „Mein Vorteil: keymatch.ai — meine eigene KI-Plattform mit Zugang zu über 700 Banken."
  4. „Leistungen" – „Vier klare Wege zu einem Ziel": „01 Immobilie verkaufen | 02 Immobilie bewerten | 03 Finanzierung lösen | 04 Abschluss sichern"
  5. „Der Ablauf" – H2 „Zum Punkt. Zur Lösung. Zum Abschluss." – „01 Verstehen 02 Klarheit 03 Lösung 04 Durchziehen"
  6. „Fälle" – H2 „Das könnte genau Ihre Situation sein." – drei Fallmuster je mit „Situation / Problem / Lösung / Ergebnis", z. B. „Geerbte Eigentumswohnung in Kreuzberg, drei Miterben mit unterschiedlichen Vorstellungen. Problem: Keine gemeinsame Entscheidung über Preis und Verkauf. Lösung: Neutrale Bewertung, Moderation und ein strukturierter Verkaufsprozess. Ergebnis: Verkauf zum ermittelten Wert, einvernehmlich abgeschlossen." Disclaimer: „Beispielhafte Darstellung realer Fallmuster. Konkrete Fälle und Zahlen auf Basis echter Transaktionsdaten im Gespräch."
  7. „Über David" – Zitat „„Ich verspreche Ihnen keine Wunschzahl — sondern einen Verkauf, der beim Notar ankommt."" + Kurzvita; Badge-Zeile „Immobilienökonom · LL.B. Rechtswissenschaften · Finanzierungsexperte · Gründer keymatch.ai"
  8. „Fragen" – H2 „Was Eigentümer vor dem Verkauf fragen." (6 FAQ, s. u.)
  9. H2 „Sie wollen verkaufen? Sprechen wir." – „Ein Erstgespräch, in dem wir klären, was für Ihre Immobilie sinnvoll ist. Unverbindlich." Button „Anfrage senden", „Lieber direkt? 0176 834 12 806"
- **Persönlichkeit:** Ich-Form durchgängig, Profilbild (Alt „David Gramzow, Immobilienökonom Berlin"), Zitat, Qualifikations-Badges, eigener YouTube-Kanal in der Hauptnavigation, Presse-Logos. Kein Video im Hero (nicht prüfbar, ob eingebettet – nur Kanal-Link).
- **FAQ Startseite (wörtlich, gekürzt):** „Was kostet der Verkauf einer Immobilie in Berlin? Als Verkäufer zahlen Sie in Berlin üblicherweise 3,57 % Maklerprovision inklusive Mehrwertsteuer — der Käufer trägt denselben Anteil. … Realistisch liegen die Verkäuferkosten zwischen rund 4 und 8 Prozent des Verkaufspreises." / „Wie lange dauert der Verkauf? … typischerweise rund drei Monate. Bis der Kaufpreis fließt, vergehen danach noch einmal vier bis acht Wochen." / „Was ist meine Immobilie wert? …" / „Wann fällt Spekulationssteuer an? …" / „Was unterscheidet Sie von einem klassischen Makler? Ich erstelle nicht nur ein Exposé und warte. Ich denke Verkauf und Finanzierung zusammen …" / „Bin ich mit einem ganz normalen Verkauf bei Ihnen richtig? Ja." Fußnote: „Angaben nach bestem Wissen, Stand 2026, ohne Gewähr."

### 2.4 Verkaufen-Funnel
- **/immobilie-verkaufen-berlin/** – Title „Immobilie verkaufen Berlin 2026 – Haus, Wohnung, Zinshaus"; Meta „Immobilie in Berlin verkaufen ohne Besichtigungstourismus. Haus, Wohnung, Mehrfamilienhaus. ImmoScout24 Gold-Partner · 5,0 Google."; H1 „Immobilie verkaufen Berlin. Gelöst."
  - Objekttyp-Verteiler: „Wohnung verkaufen → Eigentumswohnung, bezugsfrei oder vermietet — richtig bewertet und an die passende Zielgruppe verkauft." / „Haus verkaufen →" / „Mehrfamilienhaus & Zinshaus verkaufen →" / „Immobilienmakler Berlin →"
  - Einwand-/Fehler-Sektion: „Die zwei teuersten Fehler beim Immobilienverkauf in Berlin – Der teuerste Fehler ist der falsche Startpreis — der zweitteuerste der falsche Käufer."
  - 6 Schritte „So verkaufen Sie Ihre Immobilie in Berlin erfolgreich": „Bankgenaue Bewertung (Der Angebotspreis basiert auf dem vdp-Bewertungstool und Vergleichsverkäufen in Ihrer Mikrolage, nicht auf einer Wunschzahl.) | Vollständige Unterlagen vor dem Start | Professionelle Präsentation | Geprüfte Käufer statt Besichtigungstourismus (Besichtigt wird nur mit Finanzierungsnachweis. Über keymatch.ai prüfe ich die Finanzierbarkeit jedes Interessenten vorab.) | Verhandlung mit Zahlen | Abwicklung bis zur Übergabe"
  - Referenzen mit Zahlen: „Eigentumswohnung in Berlin-Kreuzberg, 83 m², gepflegt. Problem: Ein anderer Makler wertete das Objekt auf 595.000 € ein. … Ergebnis: Verkauft für 640.000 € — 45.000 € über der Einschätzung des anderen Maklers." (weitere: Mitte 100 m² 750.000 € statt 695.000 €; Kleinmachnow 1.975.000 € statt 1.870.000 €; Moabit 38 m² 195.000 € statt 172.000 €). Fußnote: „Ausgewählte reale Verkäufe. Die Bankeneinwertung stammt aus dem vdp-Bewertungstool; „anderer Makler" ist das jeweils vorliegende Vergleichsangebot."
  - FAQ: 13 Fragen (H3) inkl. „Wie kann ich meine Immobilie in Berlin schnell verkaufen? … Ein Schnellverkauf unter Wert an Ankaufportale ist dagegen fast immer die teuerste Lösung." und „Welche Unterlagen benötige ich für den Verkauf? … Bei Eigentumswohnungen zusätzlich Teilungserklärung, die letzten drei WEG-Protokolle, Hausgeldabrechnung, Wirtschaftsplan und Instandhaltungsrücklage …" FAQPage-Schema vorhanden.
- **/wohnung-verkaufen-berlin/** – Title „Ihr Problemlöser für den Wohnungsverkauf in Berlin"; H1 „Wohnung verkaufen Berlin. Gelöst."; Sektion „Eigentumswohnung verkaufen in Berlin: typische Ausgangslagen" mit 6 Kacheln: „Erbschaft & Erbengemeinschaft | Trennung oder Scheidung | Sanierungsbedürftig | Vermietet oder frei | Eigentümergemeinschaft | Laufender Kredit" (je 1–2 Sätze, z. B. „Eigentümergemeinschaft: Teilungserklärung, Rücklagen und Beschlüsse aufbereiten, bevor der Käufer fragt — und der Deal daran scheitert."). Bildhafte Einwandbehandlung: „Würden Sie jeden in Ihr Schlafzimmer lassen? Ich prüfe jeden Interessenten vorab auf Eigenkapital und Finanzierbarkeit." 17 FAQ-H3 inkl. „Was kostet eine 70-m²-Wohnung in Berlin?", „Warum sind bezugsfreie Wohnungen teurer als vermietete?", „Sollte ich vor dem Verkauf renovieren oder sanieren?"; FAQ-Schema mit Preisspannen „Mitte und Prenzlauer Berg 5.500–7.500 €/m², … Lichtenberg und Marzahn 3.000–4.200 €/m²".
- **Bewertungstool (/immobilienbewertung-berlin/):** H1 „Immobilie bewerten von Banken-Experten."; Meta (bewusst provokant): „KEIN allgemeines Makler-BLA-BLA bei Ihrer Immobilienbewertung in Berlin. Immobilien-bewertung aus Sicher einer Bank und Immobilien Experten." Bullet-Versprechen: „Sie erhalten eine fundierte Bewertung von Sprengnetter zu Ihrer Immobilie | Zusätzlich bekommen Sie eine Bewertung ,,aus Bankensicht´´ von vpd (Verein deutscher Pfandbriefbanken) | Wir arbeiten mit über 600 Banken deutschlandweit". 6-Schritt-Formular: „Welche Immobilie möchten Sie bewerten? (Haus / Wohnung / Mehrfamilienhaus/Gewerbe) → Baujahr → Zustand (guter Zustand / mittlerer Zustand / sanierungsbedürftig) → Wohn- und Geschäftsfläche (in qm) → Jahresnettokaltmiete (Falls vorhanden) → Adresse (… Geben Sie daher bitte unbedingt die vollständige Adresse inklusive der Hausnummer an.) → Kontakt + „Am besten erreichbar: Vormittags/Mittags/Nachmittags/Abends"". Kein Sofort-Ergebnis. Zusätzlich Methoden-Erklärung (H2 „Welche Methoden gibt es für die Immobilienbewertung?", H3 „Warum können wir die Vergleichswertmethode … nur selten empfehlen?") und ungewöhnlich ehrlich: H2 „Nachteile wenn Sie uns als Immobilienmakler beauftragen".
- **Besonderheiten:** „Zwei-Schlüssel-Prinzip", Finanzierungsprüfung aller Käufer vor Besichtigung, Off-Market-Option, Referenzen „über der Einschätzung anderer Makler" mit Euro-Differenz; keine Festpreisgarantie, kein Direktankauf (Ankaufportale werden explizit als „teuerste Lösung" abgewertet).

### 2.5 Ratgeber-/Info-Seiten („Magazin zum Immobilienmarkt", /immobilien-news/)
**Vollständige Themenliste (H2-Titel der Magazin-Übersicht, Stand Oktober 2026):**
1. Immobilienpreise in Berlin bröckeln (Presse · Tagesspiegel-Interview, Oktober 2026)
2. Wohnung verkaufen in Berlin: Der vollständige Ratgeber für Eigentümer 2026
3. Immobilie verkaufen in Berlin: Die 22 häufigsten Fragen — beantwortet
4. Wohnung verkaufen in Charlottenburg 2026: Preise, Mikrolagen, Strategie
5. Tippgeber werden für Immobilien in Berlin: Ihr Tipp. Ihre Prämie.
6. Wohnung verkaufen in Berlin 2026: Welche Kosten der Verkäufer wirklich trägt
7. Wohnung verkaufen in Berlin 2026: Welche Steuern will das Finanzamt haben?
8. Wohnung verkaufen in Berlin von privat ohne Makler
9. Eigentumswohnung verkaufen in Berlin 2026 was WEG-Eigentümer wissen müssen.
10. Haus verkaufen trotz Berliner Testament was möglich ist und was nicht.
11. Haus verkaufen in Berlin-Zehlendorf 2026 was Eigentümer wissen müssen.
12. Haus verkaufen in Berlin Kosten: Was Verkäufer 2026 wirklich zahlen.
13. Haus verkaufen trotz Kredit in Berlin: Was wirklich geht.
14. Haus verkaufen in Berlin: Wieviel Steuern will das Finanzamt wirklich.
15. Haus verkaufen ohne Makler in Berlin: Ehrlich kalkuliert.
16. Wie ein Berliner Makler mithilfe von ChatGPT-5 und Claudes Reasoning den deutschen Immobilienmarkt angreift.
17. Mietrechtsreform 2026 — Was Berliner Eigentümer jetzt entscheiden müssen
18. Mehrfamilienhaus verkaufen in Berlin: Kaufpreisrechner & Experten-Ratgeber
19. Wohnung verkaufen in Berlin-Neukölln 2026: Experten-Ratgeber für Eigentümer
20. Wohnung verkaufen in Berlin-Kreuzberg 2026: Der vollständige Ratgeber für Eigentümer
21. Wohnung verkaufen in Berlin-Friedrichshain 2026: Markt, Preise & Tipps
22. Babyboomer, Millennials, Gen Z — welche Generation hatte es auf dem Immobilienmarkt seit dem Zweiten Weltkrieg am schwersten?
23. Immobilie verkaufen bei Scheidung in Berlin — was Eigentümer wirklich wissen müssen
24. Haus verkaufen Berlin 2026: Ratgeber + Preisrechner
25. Wohnung verkaufen Prenzlauer Berg: Ratgeber & Preise 2026
26. Top 10 Immobilienmakler Berlin 2026 – Vergleich besten Makler in der Hauptstadt.
27. Neues Heizungsgesetz 2026 und Auswirkungen für Eigentümer und Vermieter
28. Was Eigentümer über den Verkauf Ihrer vermieteten Wohnung in Berlin wissen müssen
29. Verkaufen Sie Ihre Wohnung in Berlin-Mitte mit unseren Experten Ratgeber für anspruchsvolle Eigentümer inkl. Kiez-Kaufpreisrechner.
30. Verkaufen Sie 2026 Ihre Wohnung in Berlin mit dem Experten Ratgeber inkl. Kaufpreisrechner
Weitere Artikel laut Sitemap (ältere Finanz-/Marktbeiträge): „abschreibung-denkmal-afa", „annuitaetendarlehen-excel", „baufinanzierung-ohne-eigenkapital", „corona-probleme-baufinanzierung", „darlehensarten-baufinanzierung", „ezb-bauzinsen", „gas-heizung-verboten", „guenstige-immobilien-berlin", „haeuser-kaufen-berlin-zehlendorf", „immobilie-erfolgreich-verkaufen-in-berlin", „immobilien-investments", „immobilienmarkt-2022", „interview-mit-dem-handelsblatt", „kfw-neubau-foerderung-2023", „ki-immobiliensuche-mit-keymatch-ai", „leitzinsen-europaeische-zentralbank", „leitzinsen-ezb", „rich-kids-und-junge-erben-erobern-den-berliner-immobilienmarkt", „sanierungspflicht-eu", „was-ist-ein-hypothekendarlehen", „wie-viel-haus-kann-ich-mir-leisten", „wohnung-kaufe-berlin", „wohnung-kaufen-berlin-charlottenburg", „wohnungssuch-berlin", „buying-house-in-berlin", „indian-guide-buying-house-in-germany". Gesamt ≈ 55 Beiträge. Datierung der jüngsten: Oktober 2026, Juni 2026, Mai 2026, April 2026 → 2026 nahezu monatlich.

**Detail 1 – Vermietete Wohnung (https://www.david-gramzow.de/immobilien-news/vermietete-wohnung-verkaufen-berlin/)**
- Title: „Vermietete Wohnung verkaufen in Berlin: Rendite-Experten-Tipps"; Meta: „Verkaufen Sie ihre vermietete Wohnung in Berlin mit unseren Rendite-Experten-Tipps. Aktuelle Preise uns Konditionen inklusive Finanzierung." (Tippfehler im Original).
- Schema: Article mit `"wordCount":1749`, `datePublished 2026-04-14`, `dateModified 2026-05-11`, Autor „David Gramzow"; zusätzlich FAQPage. Eigene Wortzählung des HTML-Textes: ≈2.000 Wörter inkl. Navigation.
- Überschrift (Headline im Schema): „Was Eigentümer über den Verkauf Ihrer vermieteten Wohnung in Berlin wissen müssen" (im HTML keine H1 ausgezeichnet).
- H2/H3-Struktur wörtlich:
  - H2 „Kann man eine vermietete Wohnung in Berlin verkaufen?" → H3 „Was ändert sich für den Mieter beim Verkauf?", H3 „Vorkaufsrecht des Mieters (§ 577 BGB)"
  - H2 „Für wen ist eine vermietete Wohnung in Berlin interessant?"
  - H2 „Wie wird der Preis einer vermieteten Wohnung bestimmt?" → H3 „Vergleichswertverfahren", H3 „Ertragswertverfahren", H3 „Typischer Preisabschlag: Wie viel weniger erzielt eine vermietete Wohnung?"
  - H2 „Unterlagen-Checkliste für den Verkauf einer vermieteten Wohnung"
  - H2 „Vermietet verkaufen oder vorher leer machen?" → H3 „Wann lohnt sich die Freimachung vor dem Verkauf?"
  - H2 „Das Exposé für Investoren: Was Anleger wirklich sehen wollen" → H3 „Was ein Investoren-Exposé enthalten muss"
  - H2 „Typische Fehler beim Verkauf einer vermieteten Wohnung" → H3 „1. Preis aus bezugsfreien Vergleichen abgeleitet", „2. Falsche Zielgruppe angesprochen", „3. Unvollständige Unterlagen", „4. Mieter nicht frühzeitig informiert", „5. Besichtigungen nicht ordnungsgemäß angekündigt"
  - H2 „Steuer beim Verkauf: Spekulationssteuer nicht vergessen"
  - H2 „Häufige Fragen zum Verkauf einer vermieteten Wohnung in Berlin"
  - H3 „Vermietete Wohnung in Berlin verkaufen — wir übernehmen den Prozess" (Abschluss-CTA)
- Interaktive Elemente: „Das Wichtigste in Kürze"-Box (5 Bullets, z. B. „Preisabschlag gegenüber bezugsfreien Objekten: typisch 10–30 %, je nach Lage und Mietverhältnis."), **Renditerechner** („Berechnen Sie Bruttomietrendite, Vervielfältiger und Nettoerlös" mit Feldern Wohnfläche, Kaltmiete, Lage/Bezirk (4 Stufen), Mietverhältnis (Marktnahe Miete / Altmiete / Neue Vermietung); „Orientierungswerte auf Basis Berliner Marktdaten 2026 (Gutachterausschuss, JLL)"), Rechenbeispiel („Wohnung 70 m², Kaltmiete 900 €/Monat … Ertragswert: 10.800 € × 26 = 280.800 € … Abschlag vermietet vs. bezugsfrei: ca. 27 %"), Abschlags-Tabelle (4 Zeilen, z. B. „Altmiete weit unter Marktniveau 20–35 %"), **Checkliste mit Checkboxen** („0 von 0 erledigt", 12 Punkte in drei Gruppen „Mietrechtliche Unterlagen / WEG-Unterlagen / Pflichtunterlagen"), Pro/Contra-Spalten „Vermietet verkaufen" vs. „Erst räumen, dann verkaufen", Expertenzitat „„Bei vermieteten Eigentumswohnungen entscheiden Taschenrechner und Ertragswert — nicht klassischer Wohnwert." David Gramzow, Immobilienökonom (IREBS) & Makler Berlin".
- FAQ (6 Fragen wörtlich): „Kann ich meine vermietete Wohnung in Berlin verkaufen?", „Wie viel weniger erziele ich beim Verkauf einer vermieteten Wohnung?", „Hat der Mieter ein Vorkaufsrecht?", „Muss ich den Mieter über den Verkauf informieren?", „Darf ich Kaufinteressenten zur Besichtigung mitbringen?", „Lohnt es sich, den Mieter vorher rauszukündigen?"
- CTAs: „Jetzt kostenfrei anfragen", Telefon „0176 834 12 806", Autorenbox „DG David Gramzow Immobilienökonom & Makler · Berlin – Bachelor of Law (TU Dresden), Master in Real Estate Economics (IREBS) … Mitglied im KI Bundesverband", „Kontakt aufnehmen"; Vor/Zurück-Links zu Nachbarartikeln.

**Detail 2 – Berliner Testament / Erbe (https://www.david-gramzow.de/immobilien-news/haus-verkaufen-trotz-berliner-testament/)**
- Title: „Haus verkaufen trotz Berliner Testament: Was möglich ist & nicht"; Meta: „… Was der überlebende Ehegatte darf, wann Schlusserben den Verkauf anfechten können — mit Schnellprüfung in 6 Fragen."
- H1: „Haus verkaufen trotz Berliner Testament was möglich ist und was nicht." Eigene Wortzählung ≈3.100 Wörter (Schema nennt fälschlich `"wordCount":12`). Datum 24.05.2026.
- Kennzahlen-Leiste im Intro: „§ 2270 BGB Bindungswirkung wechselbezüglicher Verfügungen | § 2287 BGB Anfechtbare Schenkungen zum Nachteil der Schlusserben | 25 % Pflichtteilsquote pro Kind (bei zwei Kindern, gesetzl. Güterstand) | 4–6 Mon. Typische Klärungsdauer Erbfall vor Verkauf".
- **Interaktive „Schnellprüfung: Verkauf möglich?" (6 Fragen mit Buttons):** „Sind beide Ehepartner noch am Leben?" → „Sind Sie der überlebende Ehegatte und als Alleinerbe eingesetzt?" → „Haben Sie nach dem Tod Ihres Ehepartners wieder geheiratet?" → „Verkaufen Sie das Haus zum üblichen Marktpreis?" → „Haben Kinder bereits den Pflichtteil nach dem ersten Erbfall gefordert?" → „Liegen Sterbeurkunde, Eröffnungsniederschrift und Erbschein/notarielles Testament vor?" – mit 8 Ergebnis-Karten (H3), z. B. „Als Alleinerbe können Sie verkaufen." / „Erbnachweis muss zuerst beschafft werden." / „Verkauf unter Marktwert ist nach § 2287 BGB angreifbar." / „Sie sind Schlusserbe — Verkauf nur einstimmig." – jede Karte mit „Was zu tun ist" und eigenem CTA („Termin anfragen", „Beratungstermin", „Bewertung anfragen", „Kontakt aufnehmen") und lokalem Bezug („Grundbuchberichtigung … beim Amtsgericht Schöneberg etwa 4–8 Wochen").
- H2-Gliederung danach: „Was ist das Berliner Testament?", „Verkauf vor dem ersten Todesfall", „Verkauf nach dem ersten Todesfall — die Rolle der Bindungswirkung" (mit Tabelle Konstellation/Verkauf möglich?/Zustimmung Schlusserben?), „§ 2287 BGB — wann Schlusserben den Verkauf anfechten können", „Pflichtteilsanspruch der Kinder", „Wiederverheiratungsklausel", „Erbengemeinschaft nach Tod beider Ehegatten", „Lockerung der Bindungswirkung", „Praktische Schritte vor dem Verkauf" (H3: Testament prüfen und kategorisieren | Erbnachweis beschaffen | Grundbuchberichtigung beantragen | Marktwertgutachten / qualifizierte Bewertung | Pflichtteilsforderungen klären | Vermarktung starten), „Häufige Fragen zum Hausverkauf bei Berliner Testament" (6 Fragen, u. a. „Müssen die Kinder dem Verkauf zustimmen?", „Was passiert bei Wiederheirat des überlebenden Ehegatten?"), „Fazit", H3 „Verkaufsberatung in Erbangelegenheiten".
- Rechtshinweis: „Diese Schnellprüfung ersetzt keine Rechtsberatung. … Für rechtsverbindliche Auskünfte ist die Konsultation eines Fachanwalts für Erbrecht oder eines Notars erforderlich."
- Scheidungs-Artikel (`/immobilien-news/immobilie-verkaufen-bei-scheidung-in-berlin/`): Abruf lieferte nur eine Partner-Iframe-Seite → **nicht prüfbar**.

### 2.6 Stadtteil-/Ortsseiten
- Landingpages: `/wohnung-verkaufen-berlin-mitte/` (HTTP-Fehler beim Abruf → nicht prüfbar), `/eigentumswohnung-verkaufen-berlin-prenzlauer-berg/`; Magazin-Artikel zu Charlottenburg, Neukölln, Kreuzberg, Friedrichshain, Zehlendorf, Prenzlauer Berg, Mitte → ca. 8 Stadtteile.
- Aufbau Prenzlauer Berg (Title „Eigentumswohnung verkaufen in Berlin-Prenzlauer Berg 2026", ≈4.150 Wörter): H1 „Wohnung in Berlin Prenzlauer Berg verkaufen. Nur qualifizierte Käufer mit Finanzierung. Für einen strukturierten Verkaufsprozess." → 3 Schritte (H3 „1. Schritt: Kostenlose Objektbewertung … mit unserem vdp Bewertungstool", „2. Schritt: Objekt anbieten - Interessenten selektieren", „3. Schritt: Immobilie verkaufen - Sicherstellung Kaufpreiszahlung") → zweite H1 „Immobilie anfragen" (Formular) → „Auswahl unserer Referenzen" mit **Kennzahlen pro Objekt**: „Willibald-Alexis-Straße, Berlin Kreuzberg – Kaufpreis: 640.000 Euro · Flächen: 83 m² · Unsere Bankeneinwertung: 642.000 Euro · Anderer Makler: 595.000 Euro · Interessenten insgesamt: 30 · Interessenten mit genügend Eigenkapital: …" (ebenso Rostocker Straße Moabit, Köpenicker Straße Mitte, Schlüterstraße Charlottenburg) → Bewertungsformular → SEO-Textteil (H2 „Berlin Prenzlauer Berg: Der Markt für Ihren Wohnungsverkauf", „Wer kauft in Berlin Prenzlauer Berg?", „Marktdaten: Wohnungsverkauf in Prenzlauer Berg 2026", „Kosten und Steuern beim Wohnungsverkauf" …) → YouTube-Teaser → „Presseartikel" (3 Teaser) → FAQ (11 Fragen, z. B. „Was passiert, wenn der Käufer keine Finanzierung bekommt?", „Wie viel Eigenkapital brauchen Käufer meiner Wohnung?").
- Marktdaten-Quelle: im Fließtext „In Prenzlauer Berg liegen die Quadratmeterpreise für Bestandswohnungen aktuell zwischen 5.500 und 8.500 €/m² …"; Quellenangaben im Renditerechner „Gutachterausschuss, JLL"; sonst keine Fußnoten → Herkunft der Stadtteilpreise **nicht prüfbar**.

### 2.7 Vertrauenselemente
- Google: Trustindex-Widget „AUSGEZEICHNET Basierend auf 25 Bewertungen" (Bewertungs-/Prenzlauer-Berg-Seite), Meta-Texte nennen „5,0 Google" bzw. „4,9 Google Bewertung" (inkonsistent); ProvenExpert-Skript vorhanden.
- Presse: „Zitiert in DIE ZEIT Frankfurter Allgemeine Handelsblatt Berliner Morgenpost", Seite `/presse/`, Tagesspiegel-Interview (Oktober 2026), Title der Makler-Seite „Bester Immobilienmakler Berlin – bekannt aus DIE ZEIT, FAZ, BILD".
- Referenzen mit harten Zahlen (Kaufpreis vs. Fremdeinwertung, Interessentenzahl, Eigenkapital-geprüfte Interessenten).
- Qualifikationen: „Immobilienökonom (IREBS)", „LL.B.", „ImmoScout24 Gold-Partner" (Meta), „Mitglied im KI Bundesverband". Garantien: keine formale. Video: YouTube-Kanal.
- Kritische Selbstreflexion als Vertrauenselement: FAQ „Sind Auszeichnungen bei Immobilienmaklern in Berlin aussagekräftig? Nur bedingt. Viele Siegel und „Top-Makler"-Rankings beruhen auf Selbstauskünften …"

### 2.8 Kontaktwege
- Mobil „0176 834 12 806" (Hero-Nähe), Festnetz „030 629 32 914", E-Mail „david@david-gramzow.de", Formular „Anfrage senden", „Problem schildern"-CTA, WhatsApp-Link im Quelltext, Erreichbarkeits-Wunschzeit im Bewertungsformular. Keine Terminbuchung (Calendly) erkennbar.

### 2.9 Design & Marke (aus Quelltext abgeleitet)
- Farben: Rot „#c4151c" (133×), Türkis „#0eaaa6", Dunkel „#1e1e1e", Blau „#3858e9" (WordPress-Standard) → kräftige Signalfarben. Fonts: Inter (Google Fonts), Open Sans.
- Bildsprache: wenige Bilder (6), Profilbild + Berlin-Motive („Eigentumswohnung Berliner Altbau", „Stadtvilla in Berlin").
- Tonalität: **Ich**, Sie-Form; kurze, harte Sätze („Gelöst.", „Durchziehen"); Provokation in Metas („Makler-BLA-BLA"); juristisch präzise Ratgeber.
- Nicht generisch: Problemlöser-Framing, Zwei-Schlüssel-Prinzip, Fallmuster, Zahlen-Referenzen, interaktive Rechner/Checklisten/Schnellprüfung. Template-/Altlasten: Mischung aus neuem Design (Startseite 2026) und älteren Divi-Seiten mit Großbuchstaben-H2 („IMMOBILIENBEWERTUNG ANFRAGEN"), doppelte H1 auf Landingpages, „© 2022" im Footer, Tippfehler in Metas, `"wordCount":12`.

### 2.10 SEO
- Start: Title „Ihr lokaler Experte für den Immobilienverkauf in Berlin." / H1 „Immobilien­probleme lösen." (Soft-Hyphen in H1). Verkaufen: Title „Immobilie verkaufen Berlin 2026 – Haus, Wohnung, Zinshaus" / H1 „Immobilie verkaufen Berlin. Gelöst."
- Lokale Keywords: „Berlin" in fast jedem Title, Stadtteil-Cluster (Mitte, Prenzlauer Berg, Charlottenburg, Kreuzberg, Friedrichshain, Neukölln, Zehlendorf), Jahreszahl „2026" in Titles.
- Blog-Frequenz: ≈1–2 Artikel/Monat in 2026.
- Schema.org: Yoast-Graph (WebPage, Organization, Person, Article, BreadcrumbList) + manuell FAQPage auf Start/Verkaufen/Wohnung/Ratgeber.

### 2.11 Technik
- WordPress 7.1.3 (Generator), Divi-Klassen, Yoast-Sitemaps; Tracking: gtag, GTM, Facebook Pixel; Cookie-Hinweis selbstgebaut („Wir verwenden Cookies. Wir benötigen die funktionalen Cookies … Akzeptieren / Ablehnen"). Sprengnetter-Erwähnung. Ladezeit grob: mittel (Divi + Widgets + Rechner-Skripte); Fehlerseiten (500) bei Unterseiten.

### 2.12 Rechtliches
- Impressum: „David Gramzow GmbH Leipziger Platz 16 c/o Design Offices 10117 Berlin HRB: B 206741 Ust Idr: 27 / 138 / 55791" + E-Mail. **Keine Angabe zu § 34c GewO und keine Aufsichtsbehörde im Impressumstext** (Geschäftsführer-Name ebenfalls nicht im extrahierten Text) → unvollständig.

### 2.13 Stärken / Schwächen / Übernahme für Rössler
**Stärken**
- Einziger Makler der Stichprobe mit echtem „Spezialisten"-Narrativ für Eigentumswohnungen inkl. vermieteter Wohnungen, Erbe, Scheidung – als Kacheln auf der Wohnung-Seite.
- Belege mit Zahlen (Preis vs. Fremdeinwertung, Interessentenzahlen) statt Adjektiven.
- Interaktive Tools (Renditerechner, Schnellprüfung, Checkliste) direkt im Ratgeber.
- Konsequente Ich-Persona mit Qualifikationen und Presse.

**Schwächen**
- Technische Fehler (500er, Iframe-Seite, falsche wordCounts, doppelte H1), inkonsistente Bewertungszahl (5,0 vs. 4,9), Impressum ohne § 34c.
- Starke Verästelung in Finanzierungsthemen verwässert den Fokus.
- Provokante Metas („BLA-BLA") passen nicht zum seriösen Erbrechts-Content.

**Für Rössler übernehmen**
1. Wohnung-verkaufen-Seite mit 6 „Ausgangslagen"-Kacheln (Erbe, Trennung, vermietet, WEG, Kredit, sanierungsbedürftig) → jede Kachel später eigene Ratgeberseite.
2. Referenzformat „Situation / Problem / Lösung / Ergebnis" – auch ohne Euro-Zahlen anwendbar (z. B. „Verkauft nach 5 Wochen, 2 Besichtigungen").
3. „Das Wichtigste in Kürze"-Box + FAQ + FAQPage-Schema in jedem Ratgeber.
4. Ein interaktives Element pro Kernthema (z. B. „Vermietet verkaufen oder frei?"-Rechner für Ertragswert/Vervielfältiger in Leonberg/Pforzheim).
5. Ehrliche „Nachteile, wenn Sie mich beauftragen"-Sektion als Vertrauensanker.
6. Nicht übernehmen: Finanzierungs-Nebenpfade, provokante Metas.

---

## 3. Marc Härter Immobilien – https://marchaerter-immobilien.de/ – Frankfurt am Main

### 3.1 Typ, Team, Spezialisierung, Zielgruppe
- **Typ:** Einzelunternehmen („Inhaber und Diensteanbieter: Marc Härter", Impressum), selbst bezeichnet als „inhabergeführter Boutique-Makler in Frankfurt am Main mit besonderer Expertise für Altbau-Immobilien in den gefragten Wohnlagen der Stadt". Zweiter Standort „Immobilienmakler Kronberg, Merianstraße 21, 61476 Kronberg im Taunus".
- **Teamgröße:** Außendarstellung als Einzelperson („Die entscheidenden Gespräche führe ich selbst."); eine Google-Rezension spricht von „Hr. Härter und sein Team" → Team nicht prüfbar, vermutlich sehr klein. Seit 2010 in der Branche, „Über 16 Jahre Erfahrung".
- **Spezialisierung:** Altbau, hochwertige Wohnungen/Häuser/Mehrfamilienhäuser in Westend, Nordend, Bockenheim, Sachsenhausen, Vordertaunus; Immobilienbewertung („Immobilienbewerter nach ImmoWertV"); Luxus/Off-Market.
- **Zielgruppe:** Eigentümer in Frankfurts Top-Lagen („Eine Adresse wie Ihre verkauft man nicht nebenbei."), Erben, Scheidungspaare, Vermieter; sekundär Käufer (Suchprofil, Kaufberatung).

### 3.2 Navigation und Seitenumfang
- **Hauptnavigation (wörtlich):** „Bewerten | Verkaufen | Portfolio | Über uns | Kontakt aufnehmen"; Mobile-Menü nummeriert „01 Bewerten 02 Verkaufen 03 Portfolio 04 Über uns 05 Kontakt" + „069 667748060 Frankfurt · Taunus".
- **Footer:** vier Spalten mit H2 „Unternehmen", „Leistungen", „Tätigkeitsgebiete", „Wissenswertes & Rechtliches" (Linklisten im statischen HTML nicht extrahierbar → Einträge nicht prüfbar); Copyright „© 2026 Marc Härter Immobilien — Immobilienmakler Frankfurt am Main".
- **Sitemap (sitemap.xml + page-sitemap.xml):** 115 URLs: Kernseiten (`/immobilie-verkaufen-frankfurt/`, `/immobilienbewertung-frankfurt/`, `/portfolio/`, `/unternehmen/`, `/kontakt/`), 8 Orts-/Stadtteilseiten (`/immobilienmakler-frankfurt-westend/`, `/immobilienmakler-nordend-frankfurt/`, `/immobilienmakler-bockenheim/`, `/immobilienmakler-sachsenhausen-frankfurt/`, `/immobilienmakler-bad-homburg/`, `/immobilienmakler-koenigstein-im-taunus/`, `/immobilienmakler-kronberg-im-taunus/`, `/immobilienmakler-oberursel/`), ca. 90 Ratgeber-URLs auf Root-Ebene (ohne /ratgeber/-Präfix), 5 Objektseiten (`/immobilie/?id=…`), Marktberichte Westend Q1/Q2/Q3 2026, `/immobilienpreise-frankfurt/`, `/mietspiegel-frankfurt-2026/`.

### 3.3 Startseite
- **Title:** „Marc Härter Immobilien: Immobilienmakler Frankfurt"
- **Meta:** „Immobilienmakler Frankfurt und Experte für Altbau-Immobilien in besten Lagen. Persönlich begleitet beim Verkauf. 178+ Google-Bewertungen mit 5,0 Sternen."
- **H1:** „Immobilienmakler Frankfurt"; **Hero-Claim (p):** „Eine Adresse wie Ihre verkauft man nicht nebenbei."; **Subline:** „Wir vermitteln hochwertige Wohnungen und Häuser – mit besonderer Expertise für Altbauimmobilien. Inhabergeführt und persönlich, vom ersten Gespräch bis zum Verkauf."
- **Primäre CTAs:** „Über Ihren Verkauf sprechen" / „Immobilie bewerten lassen". Direkt daneben Trust-Leiste: „Frankfurt am Main 50° 6′ 58″ N, 8° 40′ 13″ O | 5,0 Sterne · 178 Bewertungen Durchgehend ausgezeichnete Google-Bewertungen von Eigentümern und Käufern. | BELLEVUE Best Property Agent Ausgezeichnet als einer der besten Immobilienmakler Deutschlands 2026. | Capital Makler-Kompass 2026 Als Top-Makler für Wohnimmobilien in Frankfurt am Main mit fünf Sternen ausgezeichnet."
- **Sektionen in Reihenfolge:**
  1. Cookie-Dialog „Ihre Wahl." (eigene Lösung, s. Technik)
  2. Hero
  3. „Altbau-Expertise · Immobilienboutique" – H2 „Was eine Immobilie ausmacht, liegt oft im Detail." („Die Proportionen eines Altbaus, sorgfältig erhaltene Materialien, eine ungewöhnliche Raumfolge oder der Blick ins Grüne mitten in der Stadt …")
  4. „Ausgewählte Verkäufe" – H2 „Arbeit, die sich belegen lässt." – Slider mit 6 Fällen, je mit Kennzahlen: „Eigentums­wohnung im Nordend · Dauer 34 Tage · Nachfrage 15 Anfragen · Termine 5 Besichtigungen · Ergebnis Verkauft zum Angebotspreis"; „Neu positioniert. Erfolgreich verkauft. (Westend) Dauer 78 Tage · 27 Anfragen · Knapp unter Angebotspreis"; „Die passenden Käufer nach gut fünf Wochen. (Vordertaunus Villa) 46 Anfragen · 12 Besichtigungen · Verkauft zum Angebotspreis"; „Großzügige Altbau­wohnung in Sachsen­hausen 112 Anfragen · 35 Besichtigungen · Verkauft knapp unter Angebotspreis"; „Designer­wohnung im Dornbusch Dauer 30 Tage · 8 Anfragen · 4 Besichtigungen · Verkauft zum Angebotspreis"; „Einfamilien­haus in Oberursel 22 Anfragen · 7 Besichtigungen · Verkauft knapp unter Angebotspreis".
  5. „Für Käufer" – H2 „Eine Immobilie finden, die zu Ihnen passt." (Suchprofil, Kaufberatung)
  6. „Für Eigentümer · Persönliche Begleitung" – H2 „Verantwortung für den Verkauf." („Besichtigungen finden als Einzeltermine statt. … Anschließend erfahren Sie, was überzeugt hat, welche Vorbehalte bestehen und wie konkret die Kaufabsicht ist.")
  7. „Immobilienbewertung in Frankfurt" – H2 „Was Ihre Immobilie wert ist. Und warum."
  8. „Frankfurt · Markt & Wohnlagen" – H2 „Eine Stadt. Viele Unterschiede." mit 4 Stadtteil-Kacheln (Westend, Nordend, Bockenheim, Sachsenhausen) + Link „Frankfurter Immobilienpreise"
  9. „Marc Härter · Inhaber" – H2 „Die entscheidenden Gespräche führe ich selbst." – „Ich berate so, wie ich selbst beraten werden möchte: mit Zeit für das Gespräch, einer ehrlichen Einschätzung und einer klaren Empfehlung. …" + „Fachlicher Hintergrund: Seit 2010 in der Immobilienwirtschaft. Immobilienkaufmann (IHK) und Diplom-Immobilienwirt (EIA)." + Auszeichnungen „BELLEVUE Best Property Agent | F.A.Z. Institut · TOP Makler 2026 | Capital Makler-Kompass 2026"
  10. „Ausgewählte Google-Bewertungen" – H2 „Was Eigentümer sagen. ★★★★★ 5,0 aus 178 Bewertungen Stand Oktober 2026" – ca. 22 Rezensionen mit Namen und Monat (Oktober 2026 … Januar 2026), je mit „Vollständig lesen ↗" und Link „Alle Bewertungen bei Google ansehen ↗"
  11. „Unser Büro · Frankfurt am Main" – H2 „Zu Hause im Westend." („Der OpernTurm ist unser Standort in Frankfurt.")
  12. H2 „Fragen zum Immobilienverkauf in Frankfurt." (FAQ, FAQPage-Schema, u. a. „Wie erkenne ich einen seriösen Immobilienmakler?", „Was übernimmt ein Makler in Frankfurt beim Immobilienverkauf?")
  13. H2 „Sprechen wir über Ihre Immobilie." (Formular)
- **Persönlichkeit:** Ein Inhaber-Portrait (Alt „Marc Härter im hellen Anzug auf der Terrasse einer historischen Villa"), Ich-Zitatblock, Qualifikationen, Link „Mehr über Marc Härter". Kein Video auf der Startseite (YouTube-Kanal-Link im Footer/Schema). Wechsel „Wir" (Unternehmen) ↔ „Ich" (Inhaber-Sektion) – bewusst gesetzt.

### 3.4 Verkaufen-Funnel (https://marchaerter-immobilien.de/immobilie-verkaufen-frankfurt/)
- **Title:** „Immobilie verkaufen Frankfurt | Marc Härter Immobilien"; **Meta:** „Immobilie in Frankfurt verkaufen: Marc Härter betreut Ihren Verkauf persönlich – von der Bewertung über Besichtigungen und Verhandlungen bis zur Übergabe."; **H1:** „Immobilie verkaufen in Frankfurt Ihr Verkauf. Unsere Verantwortung."
- **Struktur (H2 wörtlich):** „Ein Verkauf, der zu Ihren Plänen passt." → „Was Ihre Immobilie beim Verkauf braucht." (H3 Eigentumswohnungen / Häuser und Villen / Mehrfamilienhäuser) → „Charakter erkennen. Wert einordnen." → „Ein Preis, den Sie nachvollziehen können." (H3 „Die Immobilie vor Ort verstehen", „Den Wert begründen", „Den Marktstart festlegen") → „Zeigen, was Ihre Immobilie ausmacht." (H3 „Vom ersten Bild bis ins Exposé.", „Gut vorbereitet. Mit Augenmaß.") → „Nicht jede Immobilie braucht dieselbe Öffentlichkeit." (Diskretion) → „Für vorgemerkte Kunden suchen wir." (H3 Penthouse- oder Altbauwohnung | Townhouse | Villa / Einfamilienhaus | Mehrfamilienhaus | Eigentumswohnung mit „Kaufpreisrahmen bis 500.000 €" u. ä. → „Passt Ihre Immobilie zu einem unserer Kunden?") → „Zeit für Fragen. Klarheit für Entscheidungen." → „Ihr Verkauf in sechs Schritten." → Google-Bewertungen → „Fragen zum Verkauf in Frankfurt." → „Sprechen wir über Ihren Verkauf."
- **Sechs Schritte wörtlich:** „01 Erstgespräch – Wir besprechen Ihre Pläne und klären die ersten Fragen zum Verkauf. 02 Besichtigung und Bewertung – Auf den Vor-Ort-Termin folgen Bewertung und Preisempfehlung. 03 Beauftragung und Vorbereitung – Nach Vereinbarung von Leistungen, Provision und Laufzeit bereiten wir den Marktstart vor. 04 Vermarktung – Die Vermarktung beginnt auf dem mit Ihnen abgestimmten Weg. 05 Besichtigungen und Verhandlung – Aus den Gesprächen entstehen konkrete Angebote. Sie entscheiden über Käufer und Konditionen. 06 Notar und Übergabe – Wir koordinieren die Vertragsvorbereitung und begleiten Notartermin und Übergabe."
- **FAQ (8, wörtlich):** „Sind Erstgespräch und Besichtigung kostenfrei und unverbindlich?" (Ja …) | „Wie lange dauert ein Immobilienverkauf in Frankfurt?" („Eine feste Verkaufsfrist lässt sich vorab nicht seriös zusagen.") | „Welche Unterlagen benötigen Sie für den Verkauf?" (mit Link „Checkliste: Unterlagen für den Immobilienverkauf") | „Wie hoch ist die Maklerprovision und wann wird sie fällig?" („jeweils 3,57 % des Kaufpreises inklusive Mehrwertsteuer … Ihre Verkäuferprovision zahlen Sie bei uns erst, wenn der Kaufpreis vollständig bei Ihnen eingegangen ist. Diesen späteren Zahlungszeitpunkt halten wir ausdrücklich im Maklervertrag fest.") | „Welche weiteren Kosten können beim Verkauf entstehen?" | „Kann ich eine vermietete Immobilie verkaufen?" („Bei einer Eigentumswohnung prüfen wir frühzeitig mit dem Notariat, ob ein gesetzliches Vorkaufsrecht des Mieters zu beachten ist.") | „Können Sie meinen Verkauf betreuen, wenn ich nicht vor Ort bin?" | „Kann ich den Verkauf schon vorbereiten, wenn er erst später ansteht?" – jede Antwort verlinkt auf einen passenden Ratgeber.
- **Formularfelder (Kontakt):** Vorname, Nachname, E-Mail, Telefon, Ihre Nachricht, Honeypot „Website", Datenschutz-Checkbox, Button „Nachricht senden →" bzw. „Gespräch anfragen →".
- **Bewertungstool (/immobilienbewertung-frankfurt/):** kein Online-Rechner; H1 „Immobilienbewertung Frankfurt"; H2 „Eine marktgerechte Bewertung beginnt vor Ort.", „Mikrolage ist kein Detail. Sie ist entscheidend." (H3 Adresse & Umfeld / Gebäude & Einheit / Nachfrage & Zeitpunkt), Prozess „Gespräch → Termin → Unterlagen → Wertermittlung", Button „Persönliches Gespräch anfragen →"; Schema: Service + City + FAQPage.
- **Versprechen/Besonderheiten:** Provision erst nach Kaufpreiseingang (vertraglich fixiert); Einzelbesichtigungen; Off-Market für vorgemerkte Kunden mit Kaufpreisrahmen; „Immobilienbewerter nach ImmoWertV"; Betreuung aus dem Ausland. Keine Festpreis-/Verkaufsgarantie, kein Direktankauf.

### 3.5 Ratgeber-/Info-Seiten (https://marchaerter-immobilien.de/immobilien-ratgeber/)
- Übersichtsseite: Title „Immobilienratgeber: Altbau, Bewertung & Verkauf in Frankfurt", H1 „Immobilienratgeber", Schema CollectionPage/ItemList. **Vollständige Themenliste (H3 wörtlich, 90 Beiträge):**
  1. Mehrfamilienhaus im Ganzen verkaufen oder aufteilen? Kosten, Steuern und typische Fehler
  2. Dichterviertel Frankfurt: Warum diese Wohnlage ihren besonderen Charakter bewahrt hat
  3. Wie alt ist mein Haus wirklich? Die Geschichte einer Immobilie in Frankfurt recherchieren
  4. Ensembleschutz, Erhaltungssatzung oder Baudenkmal: Unterschiede für Eigentümer
  5. Was ist eine Beletage? Bedeutung, Merkmale und Beispiele aus Frankfurt
  6. Setzungsrisse am Haus: Ursachen, Sanierung und Verkauf in Frankfurt
  7. Holzhausenviertel Frankfurt: Geschichte, Altbauten und Wohnen am Park
  8. Ausgebautes Dachgeschoss: Wann zählt es als Wohnfläche?
  9. Wegerecht im Grundbuch: Was gilt bei Kauf und Verkauf?
  10. Wo wohnen die Reichen in Deutschland? Wohnlagen und Immobilienpreise
  11. Altbauwohnung verkaufen in Frankfurt: Bewertung, Käufer und Vermarktung
  12. Malerviertel Frankfurt: Karte, Geschichte und Altbauten in Sachsenhausen
  13. Gründerzeitvillen in Frankfurt: Wie sie Westend und Nordend prägen
  14. Energieausweis beim Immobilienverkauf: Pflichten, Kosten und Änderungen ab 2027
  15. Haus verkaufen und wohnen bleiben: Wohnrecht, Nießbrauch, Rückmietung und Teilverkauf im Vergleich
  16. Immobilie verkaufen trotz laufender Finanzierung: Restschuld, Ablösung und Nettoerlös
  17. Gebäudemodernisierungsgesetz: Was das GModG für den Immobilienverkauf bedeutet
  18. Wie viele Besichtigungen bis zum Immobilienverkauf?
  19. Wie finde ich einen guten Immobilienmakler in Frankfurt?
  20. Immobilie selbst verkaufen: Ablauf, Checkliste und Risiken
  21. Was passiert nach dem Notartermin? Immobilienverkauf bis zur Übergabe
  22. Verwalterzustimmung beim Wohnungsverkauf: Wann sie erforderlich ist und was Eigentümer beachten müssen
  23. Restnutzungsdauergutachten in Frankfurt: Voraussetzungen, Nachweise und steuerliche Wirkung
  24. Erst verkaufen oder erst neu kaufen? Die richtige Reihenfolge beim Immobilienwechsel
  25. Immobilie verkaufen oder behalten? Eine Entscheidungshilfe für Eigentümer
  26. Marktbericht Westend Frankfurt Q3 2026: Was die neuen Angebotsdaten zeigen
  27. Neuer Mietspiegel Frankfurt 2026: Was Mieter und Vermieter nun wissen müssen
  28. Hausschätzung Frankfurt: Was ist Ihr Haus wirklich wert?
  29. Immobilienpreise Westend Frankfurt Q2 2026: Was kostet eine Wohnung wirklich?
  30. DaVinci Haus verkaufen: Wert, Bewertung und Verkaufsstrategie im Rhein-Main-Gebiet
  31. Sanierungsbedürftige Immobilien verkaufen: Preisabschläge, Käufer & Rechtspflichten im Überblick
  32. Wohnung verkaufen am Rebstockpark Frankfurt — Preise, Besonderheiten & Verkaufsstrategie
  33. §1365 BGB beim Immobilienverkauf: Wann muss der Ehepartner zustimmen?
  34. Anzahlung beim Immobilienkauf: Was rechtlich gilt — und wie Sie sich sicher absichern
  35. Immobilie möbliert oder unmöbliert verkaufen: Alle Vor- und Nachteile im Überblick
  36. Wohnflächenberechnung Frankfurt bei Verkauf: WoFlV, DIN 277 und was Sie als Käufer und Verkäufer wissen müssen
  37. Lage, Lage, Lage: Was ist damit wirklich gemeint — und was bedeutet es für den Wert Ihrer Immobilie in Frankfurt?
  38. Baum fällen Frankfurt: Genehmigung, Baumschutz & Strafen
  39. Erhaltungssatzungen und Milieuschutz Frankfurt: Was Eigentümer und Käufer wissen müssen
  40. Spekulationssteuer beim Immobilienverkauf: Was Eigentümer in Frankfurt wissen müssen
  41. Kaufnebenkosten Immobilie Frankfurt — der vollständige Überblick mit exakten Rechenbeispielen
  42. Bodenrichtwert erklärt: Warum der Richtwert nicht 1:1 auf Ihr Grundstück anwendbar ist
  43. Sonderumlage Eigentumswohnung: Pflichten für Käufer & Verkäufer
  44. Haus verkaufen wegen Pflegeheim Frankfurt: Sozialamt, Vollmacht und Pflegekosten erklärt
  45. Immobilie mit Denkmalschutz in Frankfurt verkaufen: Wert, Steuern und Käufer richtig einschätzen
  46. Immobilie bei Scheidung verkaufen in Frankfurt: Zugewinnausgleich, Spekulationssteuer und der richtige Verkaufsprozess
  47. Erbengemeinschaft Immobilie verkaufen: Was tun, wenn Geschwister oder Miterben uneinig sind?
  48. Arten von Maklerverträgen: Einfacher Auftrag, Alleinauftrag und qualifizierter Alleinauftrag im Vergleich
  49. Immobilienpreise Marktbericht Frankfurt Westend Q1 2026 | Marc Härter Immobilien
  50. Baulasten: Was ist das? — Definition, Beispiele und Baulastenauskunft Frankfurt
  51. Warum Maklervertrag bei Exposé oder Besichtigung? Rechte, Pflichten und Widerrufsbelehrung verständlich erklärt
  52. Immobilie gekauft wie gesehen: Wann Verkäufer trotzdem haften — Haftung & arglistige Täuschung erklärt
  53. Die teuersten Viertel in Frankfurt: Aktuelle Preise, Stadtteile und Marktdaten Q1 2026
  54. Erbbaurecht Frankfurt: Was Käufer, Eigentümer und Investoren wissen müssen
  55. Immobilie steuerfrei verkaufen in Frankfurt: Die Drei-Jahres-Regel einfach erklärt
  56. Eigenbedarfskündigung nach Kauf: Rechte & Pflichten für Käufer und Mieter
  57. Immobilienmakler werden – Ratgeber für Einsteiger und Quereinsteiger
  58. Checkliste Immobilienbesichtigung: So bereiten Sie sich als Käufer optimal vor
  59. Sichtbarkeit für Immobilienmakler: Jetzt als Makler gefunden werden
  60. Grundschuldbrief verloren: Aufgebotsverfahren erklärt – Ablauf, Kosten & Tipps
  61. Immobilie verkaufen mit Makler oder privat – Vor- und Nachteile im Vergleich 2026
  62. Immobilienpreis verhandeln: Der vollständige Ratgeber zu Strategien, Psychologie und Verhandlungsspielraum 2026
  63. Preisstrategie beim Immobilienverkauf: So finden Sie den optimalen Angebotspreis
  64. Immobilie für Verkauf vorbereiten – Eine Schritt für Schritt Anleitung
  65. Besichtigungsrecht bei vermieteten Immobilien
  66. Maklervertrag kündigen: Fristen, Gründe und Vorlage
  67. Real Estate Frankfurt
  68. Mehrfamilienhaus verkaufen Frankfurt
  69. Luxusimmobilien Frankfurt 2026: Lagen, Preise & Off-Market
  70. Off Market Immobilien Frankfurt – Diskret kaufen & verkaufen
  71. Vermietete Wohnung verkaufen: Wert, Käuferkreis und Ablauf
  72. Schätzung Ortsgericht: Erfahrungen, Kosten, Vor- und Nachteile
  73. Eigentumswohnung in Frankfurt verkaufen: Wert, WEG und Unterlagen
  74. Grundbuch erklärt: Grundbuchauszug lesen und verstehen
  75. 10 Fehler beim Immobilienverkauf
  76. Immobilie erben: Was tun mit Haus oder Wohnung?
  77. Verkehrswert ermitteln: Die 3 Wertermittlungsverfahren nach ImmoWertV im Überblick
  78. Maklerprovision Hessen: Höhe, Aufteilung und wer sie zahlt
  79. Bieterverfahren: Wenn mehrere Interessenten kaufen möchten
  80. Bester Zeitpunkt Immobilie verkaufen Frankfurt
  81. Wenn eine Versteigerung die Immobilie bedroht
  82. Grundstückskaufvertrag: Diese Daten werden benötigt
  83. Widerrufsbelehrung Maklervertrag – Was hat es damit auf sich?
  84. Immobilie richtig präsentieren: Home Staging, Fotografie & Exposé für Frankfurt
  85. Unterlagen für den Immobilienverkauf Vollständige Checkliste für Haus, Wohnung und Grundstück
  86. Kaufnebenkosten: Notar und Gericht
  87. Kaufnebenkosten – Grunderwerbsteuer sparen
  (zusätzlich in Sitemap, nicht in der Liste: Hauskaufberatung Frankfurt, Immobilie finden Suchauftrag, Zwangsversteigerung abwehren, Zeitpunkt für einen Immobilienverkauf, Immobilienmakler auswählen Frankfurt)
- Datierungen in Teasern: „7. September 2026", „3. August 2026", „11. Oktober 2026", „26. April 2026", „18. März 2026", „15. April 2026", „21. August 2026" → Frequenz 2026 ≈ 2–4 Beiträge/Monat.

**Detail 1 – Erbe (https://marchaerter-immobilien.de/immobilie-erben-was-ist-zu-tun/)**
- Title „Immobilie geerbt – was tun? Fristen, Grundbuch & Verkauf"; Meta „Immobilie geerbt: Fristen, Finanzamt, Erbnachweis und Grundbuch klären. Mit Entscheidungshilfe zu Behalten, Vermieten, Auszahlung und Verkauf."
- H1 „Immobilie erben: Was tun mit Haus oder Wohnung?"; Wortzahl ≈5.400 (HTML-Text); Autorenzeile „Von Marc Härter · Diplom-Immobilienwirt (EIA)"; Kennzeichnung „KI Generiert" (!) und Prüfvermerk am Ende: „Zuletzt fachlich geprüft am 25. Oktober 2026 Redaktionell überarbeitet und in zwei getrennten fachlichen Durchgängen einschließlich der rechtlichen und steuerlichen Aussagen am 25. Oktober 2026 …"; Inhaltsverzeichnis „In diesem Beitrag 01 … 14".
- H2/H3 wörtlich: H2 „Immobilie geerbt: Was ist jetzt in welcher Reihenfolge zu tun?" | H2 „Erste Schritte: Immobilie, Unterlagen und laufende Kosten sichern" → H3 „Darf ich die Wohnung ohne Erbschein betreten?", H3 „Sterbeurkunde, Todesbescheinigung und Erbnachweis unterscheiden" | H2 „Welche Fristen gelten – und wann sollte ich die Erbschaft ausschlagen?" | H2 „Wann muss ich die geerbte Immobilie dem Finanzamt melden?" | H2 „Wer erbt das Haus – und wem gehört welcher Anteil?" → H3 „Gesetzliche Erbfolge und überlebender Ehepartner", „Erbteil ist nicht gleich ein frei verkäuflicher Anteil am Haus", „Pflichtteil und Liquidität" | H2 „Grundbuchberichtigung nach Todesfall: Antrag, Erbnachweis und Kosten" | H2 „Verstorbenen Ehepartner aus dem Grundbuch austragen: Was ändert sich?" → H3 „Wenn beide im Grundbuch stehen und einer stirbt", „Wenn nur der verstorbene Ehepartner im Grundbuch steht" | H2 „Kann ich das geerbte Haus ohne Erbschein verkaufen?" | H2 „Welcher Immobilienwert zählt bei Erbschaft, Auszahlung und Verkauf?" → H3 „Was gehört in die Bestandsaufnahme?" | H2 „Geerbtes Haus behalten, vermieten oder verkaufen?" → H3 „Fiktives Beispiel: Auszahlung und Verkaufserlös auseinanderhalten", „Renovieren oder im bestehenden Zustand verkaufen?" | H2 „Mehrere Erben: Wessen Zustimmung ist zum Verkauf nötig?" | H2 „Vorerbe, Nacherbe und Testament: Welche Beschränkungen sind zu prüfen?" | H2 „Welche Steuern sind beim Erben und beim späteren Verkauf zu unterscheiden?" → H3 „Erbschaftsteuer: Freibeträge und Familienheim", „Spekulationssteuer: Beginnen die zehn Jahre durch das Erbe neu?" | H2 „Geerbtes Haus verkaufen: Was muss vor der Vermarktung feststehen?" | H2 „Bewertung und Verkauf einer geerbten Immobilie in Frankfurt" | H2 „Quellen und fachliche Einordnung" | H2 „Häufige Fragen zu geerbten Immobilien" | H2 „Marc Härter" (Autorenbox) | H2 „Die geerbte Immobilie auf einer klaren Grundlage bewerten" (CTA) | H2 „Passende Beiträge zum Thema".
- Inhalte: Freibetrags-Tabelle („Ehepartner und eingetragene Lebenspartner 500.000 Euro | Kinder … 400.000 Euro | Übrige Enkel 200.000 Euro | … 20.000 Euro"), Rechenbeispiel („Zwei Geschwister erben je zur Hälfte … Haus … 750.000 Euro; die offene Darlehensschuld beträgt 150.000 Euro … blieben … 570.000 Euro, also 285.000 Euro je Erbe"), Paragraphen-Links (§ 2032, 2033, 2038, 2040 BGB).
- FAQ: Einleitungsfrage „Ich habe eine Immobilie geerbt – was ist jetzt zu tun?" (weitere FAQ-Fragen im HTML als Fließtext, nicht einzeln extrahierbar → Anzahl nicht prüfbar).
- CTAs: Telefon „069 667748060", Autorenbox, „Die geerbte Immobilie auf einer klaren Grundlage bewerten", verwandte Beiträge (Erbengemeinschaft, Unterlagen-Checkliste, Verkehrswert).

**Detail 2 – Scheidung (https://marchaerter-immobilien.de/scheidung-immobilie-verkaufen-frankfurt/)**
- Title „Immobilie bei Scheidung verkaufen: Ablauf & Entscheidungen"; H1 „Immobilie bei Scheidung verkaufen in Frankfurt: Zugewinnausgleich, Spekulationssteuer und der richtige Verkaufsprozess"; Wortzahl ≈4.250.
- H2/H3 wörtlich: „Immobilienmarkt Frankfurt: Warum Timing und Preis jetzt entscheidend sind" | „Rechtliche Grundlagen: Wem gehört die Immobilie bei Scheidung?" → H3 „Das Grundbuch entscheidet — nicht das Gefühl", „Güterstand: Zugewinngemeinschaft als Normalfall" | „Die vier Optionen: Was mit der Immobilie bei Scheidung passieren kann" → H3 „Option 1: Gemeinsamer Verkauf der Immobilie", „Option 2: Auszahlung — ein Partner übernimmt die Immobilie", „Option 3: Fortführung als Miteigentümer (Vermietung)", „Option 4: Teilungsversteigerung — der schlechteste Ausweg" | „Spekulationssteuer bei Scheidung: Die unterschätzte Steuerfalle" → H3 „Die 10-Jahres-Frist und die Selbstnutzungsregel", „Freigrenze und Steuerhöhe: Was konkret anfällt" | „Bewertung bei Scheidung: Verkaufsentscheidung und Streitfall trennen" | „Schritt für Schritt: Immobilie bei Scheidung in Frankfurt verkaufen" → H3 Schritt 1 „Grundbuch und Güterstand klären" … Schritt 5 „Kaufvertrag und Erlösaufteilung notariell regeln" | „Die häufigsten Fehler beim Immobilienverkauf in der Scheidung — und wie Sie sie vermeiden" → H3 „Fehler 1: Zu später Verkaufsstart — Zeitdruck drückt den Preis" … „Fehler 5: Fehlende Scheidungsfolgenvereinbarung" | „Warum ein spezialisierter Makler bei Scheidungsimmobilien in Frankfurt entscheidend ist" | „Grafiken zum Beitrag" | „Häufige Fragen zu Immobilie bei Scheidung verkaufen in Frankfurt" (erste Frage: „Kann ich die Immobilie während des Trennungsjahres bereits verkaufen?") | Autorenbox | „Planen Sie den Verkauf Ihrer Immobilie in Frankfurt?" | „Passende Beiträge zum Thema" (§1365 BGB, Pflegeheim, Erbengemeinschaft).
- Lokale Statistik als Hook: „Laut Statistikportal der Stadt Frankfurt am Main (2025 …) wurden in Frankfurt im Jahr 2024 exakt 1.253 Ehen gerichtlich geschieden — bei 2.639 Eheschließungen im selben Jahr". BFH-Zitat „Urteil vom 14. Februar 2023 (IX R …)". CTA „Jetzt unverbindlich Kontakt aufnehmen".

**Detail 3 – Vermietete Wohnung (https://marchaerter-immobilien.de/vermietete-wohnung-verkaufen-2026/)**
- Title „Vermietete Wohnung verkaufen: Preis, Mieterrechte & Ablauf"; H1 „Vermietete Wohnung verkaufen: Wert, Käuferkreis und Ablauf"; ≈5.660 Wörter.
- H2: „Vermietete Wohnung verkaufen: die Vorbereitung in fünf Schritten" | „Kann man eine Wohnung mit Mietern verkaufen?" | „Wertminderung durch Vermietung: Warum es keinen festen Abschlag gibt" (H3 „Beispielrechnung: Was eine niedrige Miete für einen Anleger bedeutet" – Tabelle: „Ist-Nettokaltmiete 900 Euro × 12 10.800 Euro … Verlangt ein Anleger … 3,5 Prozent Rendite … 8.600 Euro ÷ 0,035 rund 245.700 Euro. Bei angenommenen 4,0 Prozent wären es 215.000 Euro.") | „Vermietete Eigentumswohnung verkaufen – „Kauf bricht nicht Miete"" | „Käuferzielgruppen und Preisstrategie" (H3 Kapitalanleger / Selbstnutzer / Der Mieter als Käufer / Preisstrategie) | „Kündigungssperrfrist nach Umwandlung" (H3 „Drei Jahre Grundfrist – regional bis zu zehn Jahre", „Frankfurt und Hessen: Rechtsstand im Einzelfall prüfen", „Milieuschutz und Aufteilung sind eigene Prüfungen") | „Vorkaufsrecht des Mieters (§ 577 BGB)" (4 H3) | „Steuerliche Aspekte: Die Spekulationssteuer vermeiden" (4 H3) | „Ablauf und Vorbereitung des Verkaufs" (H3 „Kommunikation mit dem Mieter abstimmen", „Das Besichtigungsrecht: Was Sie dürfen – und was nicht", „Unterlagen für Käufer und Finanzierung", „Mietaufhebungsvertrag wirtschaftlich prüfen") | „Fazit: Strategie entscheidet über den Preis" | „Quellen der ergänzten Antworten" | „Primärquellen zur Aktualisierung" | „Grafiken zum Beitrag" | „Häufige Fragen …" (erste: „Wie wirkt die Ist-Miete auf den Verkaufspreis einer vermieteten Wohnung?").
- Bemerkenswert: Quellenabschnitte mit Gerichtsentscheidungen („Entscheidung des AG Frankfurt vom 9. September 2026, 33029 C 147/25 …") und ausdrücklicher Warnung vor Pauschalversprechen („Weder eine Eigenbedarfskündigung noch ein bestimmter Räumungstermin darf als sicherer Verkaufsweg vorausgesetzt werden.").

### 3.6 Stadtteil-/Ortsseiten
- 8 Seiten (4 Frankfurter Stadtteile, 4 Taunus-Orte) + Marktseiten (Immobilienpreise Frankfurt, Westend-Quartalsberichte, Viertel-Porträts Dichterviertel/Holzhausenviertel/Malerviertel/Rebstockpark).
- Aufbau Nordend (Title „Immobilienmakler Nordend Frankfurt | Marc Härter Immobilien", ≈3.600 Wörter): H1 „Immobilienmakler Nordend Frankfurt" → H2 „Immobilien im Nordend. Persönlich verkauft." → „Ihr Immobilienverkauf im Nordend." → „Marc Härter." → „Erfahrungen unserer Kunden." (Google-Rezensionen) → „Was Ihre Immobilie im Nordend wert ist." → „So lernen Käufer Ihre Immobilie kennen." → „Wir kümmern uns um den Ablauf. Sie entscheiden über das Angebot." (H3 „Die Arbeit zwischen den Entscheidungen.", „Das Angebot. Und was dazugehört.") → „Ihre Fragen zum Verkauf." (u. a. Provision „Käufer und Verkäufer zahlen bei uns in der Regel jeweils 3,57 % … Bei einem Verkaufspreis von 600.000 Euro sind das 21.420 Euro je Partei.") → „Sprechen wir über Ihren Verkauf." Schema: RealEstateAgent + Service + WebPage.
- Aufbau Westend (≈1.500 Wörter): H1 „Immobilienmakler Westend Frankfurt" → „Eine Immobilie im Westend verlangt Präzision." → „Großbürgerliche Architektur. Grüne Straßen und kurze Wege" → „Der Verkauf bleibt persönlich." → „Kaufpreise und Marktspannen richtig einordnen." (H3 „Eigentumswohnungen nach Baujahr", „Eigentumswohnungen im Westend", „Einfamilienhäuser und größere Doppelhaushälften", „Mehrfamilienhäuser in sehr guten Frankfurter Lagen") → „Ein Quadratmeterpreis ist noch keine Bewertung." → 5-Schritte „Klar geführt." → FAQ „Was Eigentümer im Westend wissen möchten." → CTA.
- Marktdaten-Quelle: /immobilienpreise-frankfurt/ mit H2 „Methodik und Datenstand" (H3 „Median und Preisspanne", „Kartengrundlage", „Angebotsdaten", „Warum zwei Hauspreiswerte?", „Kaufpreisdaten", „Marktbandbreiten") und Fußnote „Gutachterausschuss Frankfurt, Immobilienmarktbericht 2026, Seiten 17 und 19; alle Verträge, 100-Prozent-Stichprobe …"; Westend-Berichte: „Eigene Erhebung, Stand 23. Juli 2026".

### 3.7 Vertrauenselemente
- „5,0 Sterne · 178 Bewertungen" (Google, „Stand Oktober 2026"), ca. 22 Rezensionen im Volltext mit Namen und Monat; Link zu Google.
- Auszeichnungen: „BELLEVUE Best Property Agent", „F.A.Z. Institut · TOP Makler 2026", „Capital Makler-Kompass 2026 … fünf Sternen".
- Referenzen mit Kennzahlen (Dauer/Anfragen/Besichtigungen/Ergebnis) – ohne Preise.
- Qualifikationen: „Immobilienkaufmann (IHK)", „Diplom-Immobilienwirt (EIA)", „Immobilienbewerter (EIA & IHK)", „Immobilienbewerter nach ImmoWertV"; Berufshaftpflicht „HISCOX SA" im Impressum.
- Garantien: Provision erst bei Kaufpreiseingang. Presse: F.A.Z.-Institut-Siegel; YouTube-Kanal.

### 3.8 Kontaktwege
- Telefon „069 667748060", E-Mail „info@marchaerter-immobilien.de", Formular; Erreichbarkeit „Mo–Fr 08:00–20:00 Uhr · Sa 08:00–18:00 Uhr Termine nur nach Vereinbarung"; kein WhatsApp, keine Online-Terminbuchung, kein Chat.

### 3.9 Design & Marke (aus Quelltext abgeleitet)
- Farben: fast ausschließlich Schwarz/Weiß („#1e1e1c"), keine Akzentfarbe im Start-HTML → reduzierter, editorialer Look. Fonts: keine Google Fonts eingebunden (Systemfonts oder self-hosted, nicht prüfbar).
- Bildsprache: Architekturfotografie mit präzisen Alt-Texten („Blick durch historische Flügeltüren in eine Altbauwohnung mit Parkett", „Patinierte Messingklinke und profilierte Holztür im seitlichen Tageslicht", „OpernTurm im Frankfurter Westend"), ein Inhaberfoto. Keine Stock-Motive erkennbar.
- Typografie-Stil: kurze, mit Punkt getrennte Headline-Paare („Ihr Verkauf. Unsere Verantwortung.", „Was Ihre Immobilie wert ist. Und warum.", „Eine Stadt. Viele Unterschiede.").
- Tonalität: Sie-Form; „Wir" für das Unternehmen, „Ich" für den Inhaber; ruhig, präzise, ohne Superlative („Eine feste Verkaufsfrist lässt sich vorab nicht seriös zusagen.").
- Nicht generisch: Altbau-Fokus, Kennzahlen-Referenzen, Methodik-Abschnitte, Gerichtsquellen, Provisionsfälligkeit, Koordinaten-Spielerei im Hero. Template-Anteile: Divi-Klassen; Footer-Linklisten per JS; „KI Generiert"-Kennzeichnung zeigt, dass Ratgeber KI-gestützt entstehen (transparent gemacht).

### 3.10 SEO
- Start: Title „Marc Härter Immobilien: Immobilienmakler Frankfurt" / H1 „Immobilienmakler Frankfurt". Verkaufen: Title „Immobilie verkaufen Frankfurt | Marc Härter Immobilien" / H1 „Immobilie verkaufen in Frankfurt Ihr Verkauf. Unsere Verantwortung."
- Lokale Keywords: Frankfurt + Stadtteile + Taunus-Orte in Titles/H1; Jahreszahlen 2026/2027 in Ratgeber-Titeln. Blog-Frequenz ≈2–4/Monat. Schema: WebSite, RealEstateAgent (mit hasMap, telephone), Service, City, FAQPage, BlogPosting, CollectionPage/ItemList, BreadcrumbList.
- Auffällig: Ratgeber-URLs auf Root-Ebene (kein /ratgeber/-Ordner), Marktberichte als Quartalsserie.

### 3.11 Technik
- CMS: kein Generator-Tag; Divi-Klassen vorhanden; HTML sehr sauber → vermutlich WordPress/Divi mit entferntem Generator oder Custom-Theme (nicht prüfbar). Cookie: eigene Consent-Lösung „Ihre Wahl." mit „Nur notwendige / Alle akzeptieren / Auswahl speichern", Hinweis „Merkt sich Ihre Auswahl für sechs Monate."; Tracking nur Google Analytics/Ads nach Einwilligung. Ladezeit grob: schnell (wenige Skripte, keine externen Fonts, ca. 11 Bilder).

### 3.12 Rechtliches
- Impressum vollständig: „Marc Härter Immobilien Inhaber und Diensteanbieter: Marc Härter … Umsatzsteuer-Identifikationsnummer gemäß § 27a UStG: DE319230328 … Erlaubnispflichtige Tätigkeit: Tätigkeit als Immobilienmakler gemäß § 34c Abs. 1 Satz 1 Nr. 1 Gewerbeordnung (GewO). Erlaubnisbehörde: Amt für Aufsichts- und Ordnungsangelegenheiten, Ordnungs- und Gewerberecht, Vogelsbergkreis … Goldhelg 20, 36329 Lauterbach"; „Zuständige Aufsichtsbehörde" (Text nicht extrahiert → nicht prüfbar), „Berufsrechtliche Regelungen § 34c GewO", Berufshaftpflicht „HISCOX SA Arnulfstraße 31, 80636 München"; „Stand: 22. Juli 2026".

### 3.13 Stärken / Schwächen / Übernahme für Rössler
**Stärken**
- Beste Kombination aus Persönlichkeit (Inhaber-Ich), Beweisen (Kennzahlen-Referenzen, 178 Rezensionen mit Datum) und Tiefe (90 Ratgeber mit Quellen, Prüfdatum, Rechenbeispielen).
- Konsequent nüchterne Sprache; keine Garantie-Floskeln, dafür ein echtes vertragliches Versprechen (Provision erst nach Kaufpreiseingang).
- Stadtteilseiten, die nicht nur SEO-Text sind, sondern Marktspannen nach Baujahr und Methodik liefern.

**Schwächen**
- Kein Online-Bewertungstool, keine Sofort-Kontaktwege (WhatsApp/Termin); Footer-Links per JS; Ratgeber als Root-URLs erschweren Struktur; „KI Generiert"-Label könnte Vertrauen kosten; Team-Größe intransparent.

**Für Rössler übernehmen**
1. Referenzkarten mit „Dauer · Anfragen · Besichtigungen · Ergebnis" – ab dem ersten verkauften Objekt pflegen.
2. Headline-Stil „Kurz. Punkt. Kurz." und Verzicht auf Superlative; „Ich"-Sektion mit Qualifikationen, Foto am echten Ort (Heimsheim/Leonberg statt Stock).
3. Provisions-Fälligkeit und Einzelbesichtigungen als konkrete, prüfbare Versprechen.
4. Ratgeber mit Rechenbeispiel, Quellen (Gutachterausschuss Leonberg/Enzkreis/Pforzheim), „Zuletzt geprüft am"-Vermerk und FAQ.
5. Ortsseiten mit Preisspannen nach Baujahrsklassen + Methodik-Abschnitt.

---

## 4. Baumann Immobilien – https://www.baumann-immobilien.com/ – Frankfurt am Main

### 4.1 Typ, Team, Spezialisierung, Zielgruppe
- **Typ:** klassischer Einzelmakler („Baumann Immobilien Inhaber: Bernd Baumann", Impressum; Schema-Description: „Inhabergeführtes Maklerbüro in Frankfurt am Main. Verkauf, Vermietung und Bewertung von Wohnimmobilien sowie diskrete Vermittlung – mit über 30 Jahren Erfahrung auf dem Frankfurter Immobilienmarkt."). Büro „Keplerstr. 30, 60318 Frankfurt" (Nordend).
- **Teamgröße:** 1 Person nach außen („Von meinem Büro im Frankfurter Nordend aus betreue ich Sie persönlich"); Kontaktseite: „Bernd Baumann ist Ihr persönlicher Ansprechpartner."
- **Spezialisierung:** Verkauf **und Vermietung** von Wohnimmobilien, Altbau/Nordend-Bornheim-Westend-Sachsenhausen („mit besonderer Marktkenntnis im Nordend, in Bornheim, im Westend und in Sachsenhausen"), diskreter Verkauf.
- **Zielgruppe:** Eigentümer (Verkauf/Vermietung) in Frankfurt und Umgebung (Objekte auch in Hanau).

### 4.2 Navigation und Seitenumfang
- **Hauptnavigation (wörtlich):** „Immobilienangebote (Dropdown) | Verkaufen | Vermieten | Kontakt | Immobilie bewerten" (Button).
- **Footer:** H3 „Leistungen" / H3 „Kontakt" (Linktexte nicht extrahierbar → nicht prüfbar); Adresse „Keplerstr. 30 60318 Frankfurt", „069 596 82 83", „© 2026 Baumann Immobilien"; Links „Impressum", „Datenschutz", „EU AI Act" (eigene Seite `/eu-ai-act/`), „Vertrag widerrufen".
- **Sitemap (sitemap.xml → sitemap-pages/-immobilien/-routes):** 42 URLs, davon 35 Objektseiten (`/immobilie/…`, Slugs mit Emojis wie „✨-dg-altbau-maisonette…", „🏠charmante-altbauetage…"), 7 Seiten: `/`, `/datenschutz/`, `/eu-ai-act/`, `/immobilienangebote/`, `/impressum/`, `/kontakt/`, `/referenzen/`, `/vertrag-widerrufen/`. **Keine** eigene Verkaufen-, Vermieten-, Bewertungs-, Über-mich- oder Ratgeberseite in der Sitemap (Navigation „Verkaufen/Vermieten/Über mich" verweist auf Sprungmarken der Startseite → nicht prüfbar, ob Unterseiten existieren).

### 4.3 Startseite
- **Title:** „Ihr Immobilienmakler in Frankfurt am Main | Baumann Immobilien"; **Meta:** „Baumann Immobilien – Ihr Immobilienmakler in Frankfurt am Main. Verkauf, Vermietung und Bewertung von Wohnimmobilien mit über 30 Jahren Erfahrung auf dem Frankfurter Immobilienmarkt."
- **H1:** „Verkauf und Vermietung von Wohnimmobilien"; **Subline:** „Seit über 30 Jahren Ihr zuverlässiger Partner." / „Persönliche Beratung, fundierte Marktkenntnis und professionelle Vermittlung – vom ersten Gespräch bis zum erfolgreichen Abschluss."; Kicker „BAUMANN IMMOBILIEN · Frankfurt am Main".
- **CTAs:** „Immobilie bewerten lassen" (primär), „Verkauf besprechen", „Scrollen".
- **Sektionen in Reihenfolge:** Hero → „Warum Baumann Immobilien – Persönliche Betreuung und individuelle Vermarktung" (Ich-Text, Diskret-Hinweis) → Objekt-Teaser „Aktuelle Immobilien in Frankfurt und Umgebung" → „In Frankfurt zu Hause" (Portrait „Bernd Baumann Geschäftsführer", Link „Über mich") → „Was für mich spricht – Erfahrung und Netzwerk für Ihre Immobilie" mit Zähler-Kacheln („0+ Jahre am Frankfurter Immobilienmarkt | 0+ Vermittelte Immobilien – Verkauf und Vermietung | 0+ Vorgemerkte Kaufinteressenten | 0% Zufriedene Kundinnen und Kunden" – Zahlen werden per JS animiert, Zielwerte im HTML nicht enthalten → **nicht prüfbar**) → 3 Leistungs-Kacheln „Verkaufen / Vermieten / Immobilien­bewertung" → „Mein Verkaufsprozess – Ihre Immobilie verkaufen: in fünf klaren Schritten zum Abschluss" → „Auf Wunsch – Diskret verkaufen – ohne öffentliche Vermarktung" → „Mein Leistungspaket für Vermieter – Ihre Immobilie vermieten – ich übernehme den gesamten Prozess" (4 Schritte mit detaillierten Bullet-Listen) → „Kostenfreie Ersteinschätzung – Was ist Ihre Immobilie wert?" (Objektart-Auswahl Haus/Wohnung/Mehrfamilienhaus/Grundstück/Gewerbe) → „Aktuelle Immobilienangebote" (3 Objekte mit Baujahr/Wohnfläche/Zimmer/Grundstück/Kaufpreis) → „Bernd Baumann – persönlich und engagiert" → „Kundenstimmen" → Footer.
- **Persönlichkeit:** Ich-Form durchgängig („Ich wähle geeignete Interessenten aus, prüfe die vorgelegten Bonitätsunterlagen, führe die Besichtigungen durch"), Portrait (Alt „Bernd Baumann, Geschäftsführer von Baumann Immobilien"), kein Video, keine Story (Über-mich-Inhalt im HTML nicht separat vorhanden → nicht prüfbar).

### 4.4 Verkaufen-Funnel
- **5 Schritte wörtlich:** „01 Das Erstgespräch – Im ersten Gespräch berate ich Sie, nehme Ihre Immobilie auf und schätze den marktgerechten Verkaufspreis ein – unverbindlich und kostenfrei. 02 Vermarktung – Preis und Vermarktungsstrategie lege ich gemeinsam mit Ihnen fest. Ich erstelle ein Exposé mit professionellen Fotos und veröffentliche die Inserate auf geeigneten Plattformen. 03 Besichtigungen – Ich wähle geeignete Interessenten aus, prüfe die vorgelegten Bonitätsunterlagen, führe die Besichtigungen durch und informiere Sie regelmäßig über den aktuellen Stand. 04 Kaufvertrag – Ich führe die Kaufpreisverhandlungen, stimme die wesentlichen Vereinbarungen mit den Beteiligten ab und bereite den Notartermin vor. 05 Schlüsselübergabe – Ich organisiere die Übergabe mit Protokoll und den relevanten Unterlagen und stehe Ihnen auch nach dem Verkauf als Ansprechpartner zur Verfügung."
- **Diskret-Option:** „Keine Inserate im Internet | Ansprache vorgemerkter Kaufinteressenten" → CTA „Vertraulich anfragen".
- **Bewertungstool:** Objektart-Auswahl auf der Startseite („Wählen Sie die Art Ihrer Immobilie und übermitteln Sie die wichtigsten Eckdaten. Auf dieser Grundlage erhalten Sie eine unverbindliche Ersteinschätzung …") – Folgeschritte per JS, nicht prüfbar; Lead-Formular, kein Sofortwert.
- **Kontaktformular (/kontakt/) – Felder wörtlich:** „Anrede (Herr/Frau/Divers) | Vorname * | Nachname * | Straße | Hausnr. | PLZ | Stadt | Telefon | E-Mail * | Sind Sie Eigentümer einer Immobilie? (Ja, ich bin Eigentümer / Ja, ich bin Miteigentümer / Nein, aber ein Verwandter / Nein) | Wie sind Sie auf uns aufmerksam geworden? (Google / Empfehlung / Social Media / KI-Assistent / ChatGPT / Immobilienportal / Schild / Print / QR-Code / Ich kenne Sie bereits / Sonstiges) | Nachricht * | Einverständnis Kontaktaufnahme | Datenschutz". → Lead-Qualifizierung (Eigentümer-Status, Kanal inkl. „KI-Assistent / ChatGPT") direkt im Formular.
- **Versprechen:** „Seit über 30 Jahren", „auch nach dem Verkauf als Ansprechpartner"; keine Garantien, kein Direktankauf, keine Verkaufsdauer-Angabe.
- **Einwandbehandlung:** keine explizite.

### 4.5 Ratgeber-/Info-Seiten
- Keine. Einzig „EU AI Act"-Seite (Transparenzhinweis, Inhalt nicht geprüft) und Widerrufsseite.

### 4.6 Stadtteil-/Ortsseiten
- Keine; Stadtteile nur im Text („Nordend, Bornheim, Westend, Sachsenhausen"). `/referenzen/` zeigt laut H1 „Referenzen: Wo Baumann Immobilien vermittelt hat" eine Karte („Diese Immobilien haben wir vermittelt", „Steht Ihre Immobilie als Nächstes auf dieser Karte?") – Kartendaten nicht prüfbar.

### 4.7 Vertrauenselemente
- Schema `AggregateRating ratingValue 4.99, reviewCount 92` (Quelle der Bewertungen im HTML nicht genannt; im Fließtext „Kundenstimmen" – Inhalte per Widget, nicht prüfbar). Zähler-Kacheln ohne sichtbare Zahlen. Referenzkarte. „Seit über 30 Jahren". Berufshaftpflicht im Impressum. Keine Siegel, keine Presse, kein Video.

### 4.8 Kontaktwege
- Telefon „069 596 82 83", Mobil „0171 71 71 056", **WhatsApp**-Link, E-Mail, Formular; Öffnungszeiten „Mo, Di, Mi, Do, Fr, Sa 09:00 - 18:00"; keine Terminbuchung.

### 4.9 Design & Marke (aus Quelltext abgeleitet)
- Farben: Gelb „#fbbf24" (13×) als Akzent, Petrol „#2c7f7b", Dunkel „#1a2528", helle Petrol-Töne „#eef7f6/#daeceb". Font „Inter Variable".
- Bildsprache: Frankfurt-Skyline (Alt „Skyline von Frankfurt am Main mit Mainufer im Abendlicht"), Altbaufassade, Innenräume, Symbolbild „Holzhaus-Modell neben Münzstapeln als Symbol für die Immobilienbewertung" (= Stock-typisch), Portrait.
- Tonalität: Ich-Form, Sie; sachlich-freundlich, Listen statt Storytelling.
- Nicht generisch: ausführliches Vermieter-Leistungspaket (Haus & Grund-Mietvertrag, Mieterbericht), Lead-Qualifizierung im Formular, Emojis in Objekttiteln (eher unprofessionell). Template-artig: Zähler-Animation ohne Werte, Symbol-Stockbild, Wix-Baukasten.

### 4.10 SEO
- Title/H1 Start s. o.; Verkaufen als Sektion ohne eigene URL → kein eigener Title/H1 (nicht prüfbar). Lokale Keywords: „Frankfurt am Main", Stadtteile im Text. Kein Blog. Schema: RealEstateAgent (mit Adresse, Telefon, E-Mail), WebSite, WebPage, AggregateRating, auf Referenzen City/GeoCoordinates/QuantitativeValue.

### 4.11 Technik
- CMS: Wix-Marker im Quelltext (Divi-String ebenfalls, vermutlich Fehlzuordnung); Google Tag Manager; Cookie-Banner „Cookie-Einstellungen"-Button vorhanden (Anbieter nicht prüfbar). Ladezeit grob: Wix-typisch mittel.

### 4.12 Rechtliches
- Impressum vollständig: „Baumann Immobilien Inhaber: Bernd Baumann Keplerstr. 30 60318 Frankfurt am Main Telefon: +49 69 5968283 Mobil: +49 171 7171056 … USt-Ident-Nummer: DE156236463 … Die Gewerbeanmeldung nach § 34c GewO wurde erteilt durch: Landrat des Main-Kinzig-Kreises … Aufsichtsbehörde Ordnungsamt Frankfurt am Main Kleyerstraße 86 60326 Frankfurt am Main … Berufshaftpflichtversicherung: Wüba / AIG Europe Limited Karlstraße 68-72 74076 Heilbronn … Geltungsraum: Deutschland … Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren … teilzunehmen."

### 4.13 Stärken / Schwächen / Übernahme für Rössler
**Stärken**
- Ehrliche Einzelmakler-Darstellung in der Ich-Form; klare 5-Schritte-Logik; Lead-Qualifizierung im Formular; Vermietungs-Angebot als zweites Standbein; WhatsApp.
**Schwächen**
- Praktisch keine Inhaltstiefe (keine Unterseiten für Verkaufen/Bewertung/Über mich, kein Ratgeber, keine Ortsseiten); Zähler ohne Zahlen und Rating ohne Quelle wirken wie Platzhalter; Emojis in Objekttiteln.
**Für Rössler übernehmen**
1. Formularfelder „Sind Sie Eigentümer?" und „Wie sind Sie auf mich aufmerksam geworden?" (inkl. „KI-Assistent") – kostenlose Marktforschung.
2. Ich-Form in Prozessschritten („Ich prüfe…", „Ich führe…") – passt zur Einzelmakler-Positionierung von Rössler.
3. Warnbeispiel: Keine animierten Zähler ohne belegte Werte; keine Rating-Zahl ohne sichtbare Quelle.

---

## 5. PORTIMMO GmbH – https://www.portimmo.de/ – Stuttgart (mit Ortsseiten für Leonberg, Ditzingen, Pforzheim)

### 5.1 Typ, Team, Spezialisierung, Zielgruppe
- **Typ:** inhabergeführtes Maklerbüro (GmbH), „seit 2017 am Markt und weder an ein Finanzinstitut noch an ein Franchise gebunden"; Historie: „2017 Gegründet in Stuttgart – Als Einzelfirma 2017 gegründet … 2021 Aus Porthun Immobilien wird PORTIMMO GmbH … Heute Unabhängig & inhabergeführt". Zweitstandort Aachen („Standort Aachen Bendelstraße 15 | 52062 Aachen Termine nach Vereinbarung").
- **Teamgröße:** „besonders engagiertes und dynamisches Team", „hausinterne Marketingabteilung" – konkrete Zahl nicht genannt → nicht prüfbar; Gesicht: „Erik Porthun – Geschäftsführer, Immobilienmakler und Sachverständiger", „Ing. Erik Porthun zertifizierter Immobilienmakler IHK, zertifizierter Sachverständiger DEKRA, freier Finanzierungsvermittler & EnergieWert-Experte."
- **Spezialisierung:** Verkauf von Häusern, Wohnungen, Mehrfamilienhäusern mit DEKRA-Bewertung; **Direktankauf**; Off-Market („Secret Sale Service"); Kapitalanleger/Neubau/Bauträgervertrieb; Verkehrswertgutachten; Energieausweis.
- **Zielgruppe:** Eigentümer in Stuttgart und Region (33 Orts-/Umlandseiten), Erben, Scheidung, Pflegefall, Vermieter, Kapitalanleger, Bauträger.

### 5.2 Navigation und Seitenumfang
- **Hauptnavigation (wörtlich, Mega-Menü):** „Home | Beratung | Verkaufen ▾ [Leistungen: Immobilie verkaufen · Wohnung verkaufen Stuttgart · Immobilienbewertung Stuttgart · Direktankauf durch PORTIMMO · Vermarktung · Verkehrswertgutachten · Energieausweis | Ihre Situation: Immobilie geerbt · Immobilie in der Scheidung · Verkaufen und wohnen bleiben · Vermieter: halten oder verkaufen · Vermietete Wohnung verkaufen · Pflegefall: Haus verkaufen? · Bauträger und Neubau | Tools und Wissen: Wert-Rechner: Sofort-Ergebnis (Neu) · Immobilienpreise Stuttgart · Online-Wertermittlung · Referenzen · Ratgeber · Checklisten] | Kaufen | Kapitalanlage | News | Über uns | Jetzt Immobilie bewerten ↗". Header-Leiste: „0711 340 329 40 Mo. - Fr. 09.00 - 18.00 Uhr".
- **Footer (wörtlich):** „PORTIMMO GmbH Calwer Straße 23 70173 Stuttgart · 0711 340 329 40 · info@portimmo.de · portimmo.de" — „Unternehmen: Über uns · Referenzen · Kundenbewertungen · Tippgeber · Karriere" — „Leistungen: Beratung · Direktankauf Immobilien · Direktvermittlung Immobilien · Mehrfamilienhaus verkaufen · Energieausweis · Online-Wertermittlung · Vermarktung · Immobilienbewertung Stuttgart · Immobilienverkauf für Bauträger" — „Ratgeber: Immobilie verkaufen · Bewertung und Gutachten · Recht und Steuern · Energie und Sanierung · Erbe, Scheidung, Pflege, Alter · Markt und Region Stuttgart · Kaufen und Kapitalanlage · Checklisten" — Ortsliste „Stuttgart · Backnang · Bietigheim-Bissingen · Böblingen · …" — „© 2026 Portimmo GmbH - Ihr Immobilienmakler".
- **Sitemap (sitemap_index.xml → sitemap-0.xml):** 222 URLs: ca. 45 Orts-/Umlandseiten (`/immobilienmakler-in-<ort>/` für Aachen-Region und Region Stuttgart: Backnang, Bietigheim-Bissingen, Böblingen, Bretten, **Ditzingen**, Esslingen, Fellbach, Filderstadt, Freiberg, **Gerlingen**, Herrenberg, Holzgerlingen, Kirchheim/Teck, Kornwestheim, Leinfelden-Echterdingen, **Leonberg**, Ludwigsburg, Mühlacker, Nürtingen, Ostfildern, **Pforzheim**, Plochingen, Schorndorf, Schwäbisch Gmünd, Sindelfingen, Sulzfeld, Vaihingen/Enz, Waiblingen, Weinstadt, **Weissach**, Wendlingen, Winnenden u. a.), 6 Stuttgarter Bezirksseiten (`/immobilienmakler-stuttgart/bad-cannstatt/`, `/degerloch/`, `/sued/`, `/vaihingen/`, `/west/`, `/zuffenhausen/`), 8 „Hausverkauf in …"- und 9 „Immobilienbewertung in …"-/„Immobiliengutachter in …"-Seiten, ca. 90 Ratgeber-/News-Artikel, 7 Ratgeber-Rubriken, Tools (`/immobilienwert-rechner/`, `/online-wertermittlung/`, `/immobilienpreise-stuttgart/`, `/mietspiegel-stuttgart/`), Rechtsseiten, englische Seite `/real-estate-agent-stuttgart-english/`.

### 5.3 Startseite
- **Title:** „Immobilienmakler Stuttgart | PORTIMMO, DEKRA-Bewertung"; **Meta:** „Immobilienmakler Stuttgart: Haus oder Wohnung verkaufen mit DEKRA-Bewertung, 5,0 Sterne aus über 90 Rezensionen, Provision nur im Erfolgsfall."
- **H1:** „Ihr Immobilienmakler in Stuttgart für den sicheren Immobilienverkauf"; **Subline:** „PORTIMMO verbindet als Immobilienmakler in Stuttgart die Bewertung durch einen DEKRA-zertifizierten Sachverständigen mit modernem digitalem Marketing - für Häuser, Wohnungen und Mehrfamilienhäuser in Stuttgart und der Region."
- **Primärer CTA:** „Wie viel ist Ihre Immobilie wert? → Bewertung starten" (Hero), Header „Jetzt Immobilie bewerten ↗". Hero-Video (`<video>`-Tag mit .mp4 im Quelltext).
- **Sektionen in Reihenfolge:**
  1. Hero + Kennzahlen-Leiste „★★★★★ 5.0 Sterne Bewertungen Zufriedene Kunden | 0+ Verkaufte Immobilien | 0M+ Transaktionsvolumen | 0+ Zufriedene Kunden | 0% Über Marktwert verkauft" (JS-Zähler; Zielwerte auf /uber-uns: „350+ Verkaufte Immobilien · 50M+ Transaktionsvolumen · 250+ Zufriedene Kunden · 7% Über Marktwert verkauft")
  2. „Kurz beantwortet – Welcher Immobilienmakler in Stuttgart passt zu meinem Verkauf?" – Antwort mit Prüfkriterien („Prüfbar ist das an vier Dingen: Bewertungsqualifikation, festes Büro in der Stadt, öffentliche Bewertungen und eine Vergütung erst im Erfolgsfall.") und Wegeauswahl: „Wer den Höchstpreis will, braucht Vorlauf … Wer schnell und ohne Besichtigungsverkehr abschließen will, ist mit einer Off-Market-Vermittlung oder dem Direktankauf besser bedient. Welcher Weg trägt, klären wir vor dem Auftrag - nicht danach."
  3. „Der sichere Hafen für Ihre Immobilie in Stuttgart" (strategische Beratung, Steuer, Renovierungsbedarf) → CTA „Kostenfreie Wertindikation anfordern"
  4. „Warum PORTIMMO Ihr Immobilienmakler in Stuttgart sein sollte" – 4 Checks (Sachverständiger statt Vertriebler / Büro Stuttgart-Mitte / Vorgemerkte Käufer + „Secret Sale Service" / Provision nur im Erfolgsfall)
  5. „Stuttgart ist nicht ein Markt, sondern viele: Was Ihr Bezirk für den Verkauf bedeutet" – 5 Bezirkscluster mit Mikro-Argumenten (z. B. „Halbhöhenlage, Killesberg, Degerloch: Aussicht, Hang, Stützmauern und Stellplatzfrage entscheiden hier über sechsstellige Unterschiede bei baugleichen Häusern."; „West, Süd, Mitte, Ost: Gründerzeit-Altbau, Eigentumswohnungen, WEG-Themen: Hier verkaufen wir vor allem Wohnungen - mit Rücklage, Protokollen und Hausgeld als Preisfaktoren.")
  6. „Starten Sie jetzt mit Ihrer Online Immobilienbewertung" (Tool-Einbettung, „Kostenlos und ohne Anmeldung")
  7. „ERPROBTE QUALITÄT – Wir haben bereits viele Kunden glücklich gemacht" → CTA „Jetzt Preisspanne berechnen"
  8. „Ihre Vorteile mit PORTIMMO – Wenn Sie uns für sich arbeiten lassen:" (6 Bullets inkl. „Gehen Sie mit einem Lächeln aus dem Notartermin") / „Vermeiden Sie mit uns, dass:" (4 Bullets, z. B. „Ein zu hoher Angebotspreis abschreckt")
  9. „Unsere Qualitätsgarantie" – 6 Kacheln: „Bewertung vom DEKRA-Sachverständigen | Büro mitten in Stuttgart | Geprüfte Käufer sind vorgemerkt | Erfahrung aus über 350 Verkäufen | Provision nur im Erfolgsfall | 5,0 Sterne bei Google (93 öffentlich nachlesbare Bewertungen …)"
  10. „6 Schritte, ein Ziel - der Verkauf Ihrer Immobilie" – „SCHRITT 1 INDIVIDUELLE BERATUNG … SCHRITT 2 KOMPETENTE IMMOBILIENBEWERTUNG (… kombinieren modernste Sprengnetter-Software mit lokaler Expertise …) SCHRITT 3 EXKLUSIVE VERMARKTUNG (Wer zuerst auf Portalen landet, hat oft schon verloren. …) SCHRITT 4 INDIVIDUELLES MARKETINGKONZEPT (… Social-Media-Targeting, virtuelle 360°-Rundgänge …) SCHRITT 5 OPTIMALE BESICHTIGUNGSPLANUNG (Schluss mit Immobilientourismus. Wir qualifizieren Interessenten vorab (Finanzierungsbestätigung!) und führen nur Einzelbesichtigungen durch.) SCHRITT 6 REGELMÄSSIGER REPORT ZUM VERKAUFSSTATUS"
  11. „Was Kunden über uns sagen" (Slider, 4 Zitate mit Namen) + „Google-Bewertungen 5,0 ★★★★★ 93 Bewertungen" + „Bewertung schreiben"
  12. „Rundum-Service für Ihren Immobilienverkauf" (Bewertung / Hausverkauf / Kapitalanlagen)
  13. „PORTIMMO auf einen Blick", FAQ „Häufige Fragen an Ihren Immobilienmakler in Stuttgart" (FAQPage-Schema, z. B. „Was kostet ein Immobilienmakler in Stuttgart? Die Maklerprovision fällt nur im Erfolgsfall an … 3,57 % inkl. MwSt. je Partei."), „Warum ein Makler mit Büro in der Stadt einen Unterschied macht", „Wo wir in Stuttgart unterwegs sind", „Weitere Seiten für Stuttgart", „Wir sind auch in der Umgebung für Sie da" (Ortslinks), Newsletter, „Ratgeber für Eigentümer in Stuttgart".
- **Persönlichkeit:** Geschäftsführer-Portrait + Signatur-Zeile „Erik Porthun DEKRA-zertifizierter Sachverständiger (D2)" mehrfach; Wir-Form; Hero-Video (Inhalt nicht prüfbar); Team-Foto auf Über-uns nicht extrahierbar.

### 5.4 Verkaufen-Funnel
- **/verkaufen/** – Title „Wir bringen die Sicherheit beim Verkaufsprozess Ihres Hauses"; H1 „Sicherheit beim Hausverkauf"; „Unsere Qualitätsgarantie" (H3 „Immobilienberatung & Bewertung | Höchstpreis erzielen | Immobilienpräsentation | Transparenz & Sicherheit | Respekt & Vertrauen | Expertennetzwerk"); „Während des Verkaufsprozesses"; **Unterlagenliste** „Diese Unterlagen brauchen Sie für den Verkauf - wir holen sie für Sie ein" (11 Punkte, u. a. „Bei Wohnungen: Teilungserklärung mit Nachträgen und Aufteilungsplan | Aktueller Wirtschaftsplan mit Instandhaltungsrücklage und Hausordnung | Die letzten drei Protokolle der Eigentümerversammlung | Die letzten drei Nebenkosten-/Wohngeldabrechnungen"); FAQ; CTA „Beratungsgespräch Anfragen".
- **/wohnung-verkaufen-stuttgart/** – Title „Wohnung verkaufen in Stuttgart: sicher zum besten Preis"; H1 „Wohnung verkaufen in Stuttgart: sicher, diskret und zum besten Preis"; „Wohnung verkaufen in 5 Schritten" (H3 „Wert ermitteln | WEG-Unterlagen komplettieren | Zielgruppe festlegen | Professionell vermarkten | Verhandeln und beurkunden"); „Was eine Wohnung in Stuttgart wert macht" (H3 „Der Stadtbezirk | Die Eigentümergemeinschaft | Energie und Zustand | Frei oder vermietet"); FAQ mit Marktzahl „Bestandswohnungen in Stuttgart liegen aktuell im Schnitt bei rund 5.200 €/m² (Stand Q3/2026), … Spanne … zwischen ca. 3.800 und 7.000 €/m²"; Abschluss „Über 350 Vermittlungen in Stuttgart und der Region - vom Apartment bis zur Halbhöhen-Wohnung. … Die Erstberatung ist kostenfrei."; CTA „Kostenlose Wohnungsbewertung in Stuttgart anfragen".
- **Direktankauf (/direktankauf/) – für Rössler zentral:**
  - Title „Immobilie direkt verkaufen: Direktankauf durch PORTIMMO"; Meta „Direktankauf in Stuttgart und Region: kostenfreie, diskrete Prüfung Ihrer Immobilie ohne öffentliche Vermarktung - zeitnah ein unverbindliches Ankaufsangebot."; H1 „Immobilie direkt verkaufen: Wir prüfen den Ankauf Ihrer Immobilie"
  - Intro: „Sie möchten Ihr Haus, Ihre Wohnung oder Ihr Grundstück direkt verkaufen - ohne öffentliche Vermarktung, ohne Besichtigungstourismus und ohne monatelanges Warten? PORTIMMO kauft Immobilien in Stuttgart und der Region auch selbst an. Nach kostenfreier Prüfung erhalten Sie zeitnah unser unverbindliches Ankaufsangebot." + Trust-Zeile „★ 5,0 von 5 · 93 Google-Bewertungen · über 350 Vermittlungen"
  - H2 „Direktankauf: Wann der direkte Verkauf an PORTIMMO die bessere Lösung ist" – 4 Situationen: „Erbschaft oder Scheidung | Sanierungsstau (Wir kaufen auch Objekte mit Renovierungs- oder Sanierungsbedarf - ohne dass Sie vorher investieren müssen.) | Schnelle Abwicklung (Umzug, Pflegefall, Auslandsjob oder Finanzierungsdruck: Nach Ihrer Zusage steht der Notartermin oft innerhalb weniger Wochen.) | Diskretion (Kein Inserat, keine Fotos im Internet, keine fremden Menschen im Haus.)"
  - H2 „Ankaufsprüfung in vier Schritten": „1 Eckdaten senden – Objekttyp, Adresse, Wohnfläche, Baujahr, Name und Telefonnummer - über das Formular unten in unter einer Minute. 2 Kostenfreie Prüfung – Wir prüfen Lage, Zustand und Marktwert - auf Basis der Kaufpreissammlung Stuttgart und, wenn gewünscht, bei einem diskreten Vor-Ort-Termin. 3 Unverbindliches Ankaufsangebot – … Sie entscheiden in Ruhe - ohne Verpflichtung. 4 Notartermin nach Ihrem Zeitplan – … auch ein späterer Auszug ist möglich."
  - **Ehrliche Einordnung** H2 „Direktankauf oder Vermittlung zum Höchstpreis?": „Wir sagen es offen: Ein Direktankauf ist ein Geschäft mit kalkuliertem Risiko für den Käufer - Preis, Sanierung, Vermarktung und Zeit liegen danach bei uns. Deshalb liegt ein Ankaufsangebot in der Regel unter dem Preis, den eine professionelle Vermarktung am offenen Markt erzielen kann. Dafür bekommen Sie Sicherheit, Tempo und Diskretion. Was für Sie besser passt, besprechen wir ehrlich - als Immobilienmakler in Stuttgart haben wir beide Wege im Angebot und kein Interesse daran, Ihnen den falschen zu empfehlen."
  - Formular „Ankaufsprüfung für Ihre Immobilie anfragen": Objekttyp (Eigentumswohnung / Einfamilienhaus / Doppelhaushälfte / Reihenhaus / Mehrfamilienhaus / Grundstück / Gewerbeimmobilie), Adresse, Wohnfläche, Baujahr, Name, Telefon, Einwilligung; Zusage „Wir melden uns in der Regel innerhalb eines Werktags telefonisch bei Ihnen."; Disclaimer „Ein Ankauf erfolgt ausschließlich nach positiver Prüfung des Objekts und Einigung über die Konditionen. Es besteht kein Anspruch auf Abgabe eines Ankaufsangebots."
  - „Direktankauf bei PORTIMMO auf einen Blick": „Wer kauft (PORTIMMO GmbH …) | Was es kostet (Die Ankaufsprüfung ist kostenfrei … keine Maklerprovision) | Wie lange es dauert (Erste Rückmeldung in der Regel innerhalb eines Werktags …) | Wer prüft (Geschäftsführer Erik Porthun, DEKRA-zertifizierter Sachverständiger …)"
  - FAQ (FAQPage-Schema): „Was bedeutet Direktankauf einer Immobilie?", „Welche Immobilien kauft PORTIMMO an?", „Fällt beim Direktankauf eine Provision an? Nein. …", „Erziele ich beim Direktankauf den gleichen Preis wie am Markt? In der Regel liegt ein Ankaufsangebot unter dem am offenen Markt erzielbaren Höchstpreis …", Verweis auf Leibrente als Alternative.
- **Bewertungstools:** (a) `/immobilienwert-rechner/` – „Was ist Ihre Immobilie wert? Sofort-Ergebnis ohne E-Mail." („Immobilienwert in 30 Sekunden berechnen - kostenlos, anonym, ohne E-Mail. KI-gestützte Preisspanne"), Baujahrsklassen als Optionen, Hinweis „statistischer Durchschnittswert auf Basis regionaler Marktdaten und stellt kein Ve[rkehrswertgutachten dar]"; (b) `/online-wertermittlung/` – Sprengnetter-Auswertung „in rund 2 Minuten", „Mehr als 1.000 Eigentümer haben sie bereits genutzt."; (c) Vor-Ort-Bewertung durch DEKRA-Sachverständigen „Der Termin dauert je nach Objekt 45 Minuten bis zwei Stunden. Die schriftliche Einschätzung erhalten Sie innerhalb weniger Tage". Seite `/immobilienbewertung-in-stuttgart/`: H1 „Immobilienbewertung Stuttgart: kostenlos vom DEKRA-zertifizierten Sachverständigen", H2 „Warum ein Online-Rechner in Stuttgart besonders oft danebenliegt" (Hanglagen-Argument).
- **Versprechen/Besonderheiten:** „Provision nur im Erfolgsfall", „Secret Sale Service", Direktankauf, DEKRA D2, Live-Reporting, Calendly-Terminbuchung („Kostenlosen Termin buchen"), Immobilien-Leibrente, Tippgeber-Programm. Keine Festpreisgarantie.

### 5.5 Ratgeber-/Info-Seiten (https://www.portimmo.de/ratgeber/)
- H1 „Unsere Ratgeber - Kostenloses Insiderwissen"; 7 Rubriken (H3-Links): „Ratgeber Immobilienverkauf | Ratgeber zu Wert und Gutachten im Überblick | Ratgeber Immobilienrecht und Steuern | Ratgeber Energie und Sanierung | Ratgeber Erbe, Scheidung, Pflege und Alter | Immobilienmarkt Stuttgart und Region | Ratgeber Immobilienkauf und Kapitalanlage"; dazu **PDF-Downloads**: „RATGEBER: WOHNEN IM ALTER | DER RICHTIGE IMMOBILIENPREIS | PRIVATER IMMOBILIENVERKAUF | SANIERUNG EINER IMMOBILIE | IMMOBILIE IN DER SCHEIDUNG (HERUNTERLADEN) | IMMOBILIE GEERBT (HERUNTERLADEN) | IMMOBILIENWELT ERKLÄRT"; „Checklisten für Eigentümer".
- **Vollständige Themenliste (aus Sitemap, Slugs → Titel sinngemäß; ≈90 Artikel):** 5 Gründe für eine Immobilie in Esslingen · 5 Gründe fürs Wohnen in Schorndorf · Ablauf Hauskauf · Aus alt mach neu: Haus/Wohnung sanieren · Bauträger Immobilienverkauf · BGH stärkt Mieter beim Vorkaufsrecht · Checkliste Haus kaufen · CO2-Abgabe Vermieter · Das große Immobilien-ABC · Der aktuelle Immobilienmarkt in Stuttgart · Die Bedeutung eines qualifizierten Immobilienmaklers · Vorteile von Wärmepumpen · Einbau neuer Gas- und Ölheizungen ab 2024 verboten · Energieausweis 2026 neue Klassen · Energieausweis 2027 · Energieausweis Hausverkauf/Wohnungsverkauf · Fallen Sie nicht auf diese Tricks hinein · Fehler bei Ihrer Wohnflächenberechnung · Gebäudemodernisierungsgesetz (GModG) 2026 · Geerbtes Haus verkaufen: Steuern · Grunderwerbsteuer Baden-Württemberg · Grundsteuer-Anstieg · Grundsteuer Baden-Württemberg Verkauf · Grundstücksbewertung · Gutachter Hausverkauf · Gutachterausschuss Stuttgart Kaufpreissammlung · Haus geerbt: Sanierungspflicht · Haus in Wohnungen aufteilen · Haus verkaufen mit oder ohne Makler · Haus verkaufen Pflegeheim · Haus verkaufen Steuern · Haus verkaufen über Sparkasse oder Bank · Haus von Eltern erben oder übertragen · Heiz- und Stromkosten sparen · Heizungsförderung 2026 · Immobilie geerbt – was mache ich nun? · Immobilie geerbt (PDF-Seite) · Immobilie im Scheidungsfall · Immobilie in der Scheidung · Immobilie ohne Makler verkaufen · Immobilien als Kapitalanlagen in Stuttgart · Immobilien als Vermögensstrategie · Diese Kosten kommen auf Eigentümer zu · Immobilien-Finanzierung · Immobilien-Glossar für Privatverkäufer · Immobilien-Leibrente · Immobilien mit Charakter verkaufen · Immobilienbewertung ImmoScout24/Check24/Sparkasse Vergleich · Immobilienbewertung kostenlos ohne E-Mail · Immobilienblase · Neue Grundsteuer · Immobilienfinanzierung Stuttgart · Immobilienkauf Stuttgart 5 Gründe · Immobilienlexikon Stuttgart · Vorteile Immobilienmakler Hausverkauf · Immobilienpreise Deutschland Prognose · Immobilienpreise Stuttgart · Immobilienverkauf 10 Tipps · Immobilienverkauf Stuttgart voreiliger Online-Auftritt · Investoren: neue Steuervorteile Wohnungsneubau · Kapitalanleger Investment · KfW-Förderung energetische Sanierung 2025/2026 · KfW-Förderung Region Stuttgart · Kleinreparaturklausel · Makler für Mietersuche · Mieterhöhung Mietspiegel Stuttgart · Mietspiegel Stuttgart · Mythen über Immobilienmakler · Neubau Kapitalanleger · Neubau Reihenhaus/DHH kaufen Stuttgart · Privat verkaufen Stuttgart 7 Fehler · Sanieren vs. verkaufen · Sanierung einer Immobilie · Sanierungsbedürftiges Haus verkaufen · Sanierungspflicht Rechte und Pflichten · Sanierungspflicht Vermieter · Schlechte Vorzeichen für Vermieter/Kapitalanleger · Schlechtes Bauchgefühl beim Immobilienmakler · Schonvermögen Pflegeheim · Smart Home/KI Immobilienwert · So erkennst du, ob dein Makler für dich oder für sich arbeitet · Solarpflicht Baden-Württemberg · Sondervermietung Mehrfamilienhaus Rendite · Spekulationssteuer · Unterlagen Hauskauf · Verkaufsunterlagen · Verkaufszeitpunkt 3 Wochen · Verkehrswert vs. Marktpreis · Verkehrswertgutachten Stuttgart · Verlangt dein Vermieter zu viel Miete · Vermieten oder verkaufen Rechnung · Vermieter Stuttgart · Vermietete Wohnung verkaufen · Vom Verkäufer- zum Käufermarkt · Wärmeplanung Stuttgart · Was ist ein Immobilien-Sachverständiger · Was ist Ihre Immobilie wert · Was kostet ein Makler · Was macht eigentlich ein Immobilienmakler · Welche Schorndorfer Stadtteile für Familien · Wenn die Welt verrückt spielt · Wie sich der Wert einer Immobilie berechnet · Wohnen im Alter (2) · Wohnen in Fellbach/Herrenberg/Weinstadt 5 Gründe · Wohnung verkaufen ohne Makler · Wohnung verkaufen Stuttgart.
- Rubrik „Lebenssituationen" (`/ratgeber/lebenssituationen/`): H1 „Ratgeber Erbe, Scheidung, Pflege und Alter", H2 „… 8 Artikel": „Haus von den Eltern erben oder zu Lebzeiten übertragen? | Schonvermögen im Pflegeheim: Haus und Wohnung | Haus geerbt: Sanierungspflicht nach GModG 2026 | Haus verkaufen wegen Pflegeheim? Was wirklich gilt | Geerbtes Haus verkaufen: Diese Steuern fallen an | Barrierefrei wohnen: Immobilie fit für den Ruhestand machen | Immobilie geerbt - Was mache ich nun? | Immobilie im Scheidungsfall"; Daten „17. September 2026", „18. September 2026", „03. September 2026", „29. März 2023", „16. November 2021", „04. August 2021"; Kurzfazit-Block „Das Wichtigste aus der Rubrik" (H3 „Immobilie geerbt: erst klären, dann entscheiden | Pflegefall: Muss das Haus wirklich verkauft werden? | Scheidung und Alter: Verkauf ohne Zeitdruck | Erbengemeinschaft: die Zahl vor der Diskussion | Schonvermögen und Sozialamt: früh prüfen, nicht spät | Übertragen statt vererben - wann das sinnvoll ist").

**Detail 1 – Immobilie geerbt (https://www.portimmo.de/immobilie-geerbt/)**
- Title „Immobilie Geerbt - Welche Gesetze und Fristen gibt es?"; Meta „Immobilie geerbt? Sorgfältig zusammengestelltes Expertenwissen zur Erbimmobilie: Gesetze und Fristen im Überblick. Jetzt Ratgeber herunterladen."
- H1 „Sie haben eine Immobilie geerbt? Wir helfen Ihnen!"; Wortzahl ≈1.140 (inkl. Navigation) → kurze Lead-Seite, kein Fachartikel.
- H2 „Dieser Ratgeber klärt auf:" (Bullets: „✓über verborgene Risiken, Paragrafen und Fristen. ✓wie kann ich die Erbschaftssteuer optimieren? ✓was ein Erbschein ist. ✓wie Sie einen Überblick über rechtliche Aspekte gewinnen. ✓dass Sie verschiedene Handlungsoptionen haben: z.B. Verkauf, Selbsteinzug, etc..") → CTA „Ratgeber Erbimmobilie herunterladen PDF · 8 Seiten · kostenlos" → H2 „Starten Sie jetzt mit Ihrer Online Immobilienbewertung" → H2 „Diese Unterlagen brauchen Erben für Bewertung und Verkauf" (Erbnachweis „… innerhalb von zwei Jahren nach dem Erbfall gebührenfrei", Grundbuchauszug, Objektunterlagen, „Bei Eigentumswohnungen: Teilungserklärung, Wirtschaftsplan mit Rücklage, Protokolle und Nebenkostenabrechnungen - erhältlich über die Hausverwaltung") → Erfahrungsbeleg „Wir haben bereits mehrere Mehrfamilienhäuser und Immobilien von Erbengemeinschaften erfolgreich verkauft - auch als neutraler Vermittler zwischen den Erben …" → Links zu Steuer-/Makler-/Pflegeheim-Ratgebern → Persona-Box „Erik Porthun Immobilienexperte aus Stuttgart – Sie brauchen eine belastbare Einschätzung zur geerbten Immobilie? Rufen Sie an oder schreiben Sie uns - wir antworten am selben Werktag."
- FAQ: keine. Schema: kein FAQPage/Article (nur Organisation/Geo).

**Detail 2 – Vermietete Wohnung (https://www.portimmo.de/vermietete-wohnung-verkaufen/)**
- Title „Vermietete Wohnung verkaufen: Preis, Mieterrechte, Steuern"; H1 „Vermietete Wohnung verkaufen: Was Eigentümer wissen müssen"; ≈1.600 Wörter.
- H2/H3: „Dieser Ratgeber klärt auf:" | „Wer kauft eine vermietete Wohnung?" | „Wie groß ist der Preisabschlag wirklich?" → H3 „Mietanpassung prüfen", „Unterlagen komplettieren", „Timing mit dem Mieter" | „Muss ich den Mieter informieren - und hat er ein Vorkaufsrecht?" | „Welche Steuern fallen an?" | „So gehen Sie vor" → H3 „Wert und Rendite ermitteln", „Unterlagen zusammenstellen", „Zielgruppe festlegen" | „Häufige Fragen zum Verkauf vermieteter Wohnungen" (FAQPage; z. B. „Kann ich eine vermietete Wohnung überhaupt verkaufen? Ja, jederzeit und ohne Zustimmung des Mieters. …").
- CTAs: „Ratgeber vermietete Wohnung herunterladen PDF · 7 Seiten · kostenlos", Online-Wertermittlung, Telefon.
- Scheidungs-Seite (`/immobilie-im-scheidungsfall/`): H1 „Immobilie im Scheidungsfall", ≈1.470 Wörter, Einstieg „In Deutschland werden jedes Jahr ungefähr 160.000 Ehen geschieden, wie das Statistische Bundesamt ermittelte. …", H2 „Sie haben Fragen oder wollen den Wert Ihrer Immobilie wissen? Dann wenden Sie sich an PORTIMMO Immobilien.", Verweis auf PDF „Der richtige Immobilienpreis", Newsletter; keine FAQ, kein Schema.

### 5.6 Stadtteil-/Ortsseiten
- Anzahl: 6 Stuttgarter Bezirke + ca. 33 Umlandorte (Region Stuttgart) + ca. 7 Aachen-Region = ca. 46 Ortsseiten; zusätzlich 8 „Hausverkauf in …", 9 „Immobilienbewertung/Immobiliengutachter in …".
- **Aufbau Leonberg (https://www.portimmo.de/immobilienmakler-in-leonberg/, ≈1.620 Wörter):** H1 „Immobilienmakler Leonberg: Ihre Immobilie verkaufen - die Nachfrage kommt von außen." → H2-Intro „S6 nach Stuttgart, A8 und A81 vor der Tür: Leonberg ist Pendlerland, und Ihre Käufer suchen im ganzen Raum Stuttgart. Wir sorgen dafür, dass Ihr Objekt genau diese Interessenten erreicht - über unseren Standort Gerlingen sind wir direkt nebenan. Der erste Schritt ist eine kostenfreie Immobilienbewertung durch unseren DEKRA-zertifizierten Sachverständigen (D2)." + Badges „5,0 aus 93 Google-Bewertungen | DEKRA zertifiziert (D2) | IVD Mitglied" → Online-Bewertung → H2 „Warum ein Immobilienmakler bei Ihrem Verkauf in Leonberg sinnvoll ist" („Der Leonberger Bestand reicht vom Fachwerkhaus in der Altstadt über das Reihenhaus im Ramtel bis zum Einfamilienhaus in Warmbronn oder Höfingen - drei Produkte, drei Käufergruppen, drei Preislogiken.") → H2 „Was macht ein Immobilienmakler eigentlich?" (6 Checks) → H2 „Immobilienbewertung in Leonberg durch einen zertifizierten Sachverständigen" („… Ortsteil-Preisniveau in Eltingen, Höfingen, Gebersheim und Warmbronn") + „Secret Sale Service" → H2 „Pendlerlage mit zwei Autobahnen und S-Bahn - die Nachfrage kommt von außen" → H2 „Wo wir in Leonberg unterwegs sind" (Lage / Verkehr / Stadtteile: „Kernstadt, Eltingen, Höfingen, Gebersheim, Warmbronn") → FAQ „Häufige Fragen: Immobilienmakler in Leonberg" (4 Fragen: „Kommen Kaufinteressenten aus Stuttgart nach Leonberg?", „Was ist bei Objekten in der Altstadt zu beachten?", „Sind Sie auch in den Ortsteilen tätig?", „Immobilienmakler, Immobilienberater oder Immobilienagentur in Leonberg: Was ist der Unterschied?" – mit § 34c-Erklärung) → Ortslinks → Kontakt.
- Ditzingen: Title „Immobilienmakler Ditzingen - Verkauf im Strohgäu"; Pforzheim: Title „Immobilienmakler Pforzheim - überregional vermarktet"; Stuttgart-West: „Immobilienmakler Stuttgart-West | PORTIMMO" (je ≈1.300–1.700 Wörter, gleiche Schablone).
- Marktdaten-Quelle: Ortsseiten ohne Zahlen (qualitative Lagebeschreibung); Preise zentral auf `/immobilienpreise-stuttgart/`, Verweise auf „Kaufpreissammlung Stuttgart" und „Gutachterausschuss Stuttgart Kaufpreissammlung" (eigener Ratgeber); Sprengnetter als Datenbasis der Online-Wertermittlung.

### 5.7 Vertrauenselemente
- Google „5,0 ★ 93 Bewertungen" (mehrfach, mit Namen im Slider: Sabine Eller, Tjerk Dames, Patrick Stotz, Harald Kloz – z. B. „Erik ist ein Top Immobilienmakler, mein Bruder und ich hatten ihn in 2024 beauftragt die Wohnung unserer verstorbenen Mutter zu verkaufen."); eigene Seite `/kundenbewertungen/`.
- Siegel/Mitgliedschaften (Alt-Texte): „DEKRA-Sachverständigen", „IVD Mitglied", „Business Partner des VfB Stuttgart", „BIB Busz Immobilienbewertung - Sachverständige Karin Busz" (Partner), „ImmoScout24"-Partner (eigene Seite `/unser-immobilienpartner-immoscout24/`).
- Zahlen: „350+ Verkaufte Immobilien · 50M+ Transaktionsvolumen · 250+ Zufriedene Kunden · 7% Über Marktwert verkauft", „Mehr als 1.000 Eigentümer haben [die Online-Bewertung] bereits genutzt".
- Garantien: „Provision nur im Erfolgsfall", „Unsere Qualitätsgarantie" (6 Punkte). Video: Hero-Video, YouTube-Kanal „@portimmo_de". Presse: keine.

### 5.8 Kontaktwege
- Telefon „0711 340 329 40" (Header, überall), E-Mail, Formulare, **Calendly** („Kostenlosen Termin buchen", „Vereinbaren Sie einen Termin mit uns"), Öffnungszeiten „Mo.-Fr. 9.00-18.00 Uhr, Sa. + So. nach Vereinbarung", Anfahrt („U-Bahn- und S-Bahn-Haltestelle Stadtmitte/Rotebühlplatz … 50 Meter"), Antwortzusagen („innerhalb eines Werktags", „am selben Werktag"), Kontakt-FAQ („Wie schnell bekomme ich einen Termin? In der Regel innerhalb von zwei bis drei Werktagen … Wenn es eilig ist, etwa bei einem Erbfall mit Frist oder einem Pflegeheimplatz, sagen Sie es uns am Telefon."). Kein WhatsApp, kein Chat.

### 5.9 Design & Marke (aus Quelltext abgeleitet)
- Farben: Orange „#ff6e1a/#ff6a14" als Akzent (Google-Logo-Farben stammen vom Review-Widget); CSS-Variablen; Fonts nicht über Google Fonts geladen (nicht prüfbar).
- Bildsprache: 39 Bilder, Mischung aus Siegel-Grafiken, Beispielobjekten, Portrait; Alt-Texte teils generisch („Beispielhafte Immobilien-Angebote", „+200 Möglichkeiten in der Region").
- Tonalität: Wir-Form, Sie; Marketing-Sprache mit Versalien-Schritten („EXKLUSIVE VERMARKTUNG"), Metaphern („sicherer Hafen"), teils aggressive Verkaufsrhetorik („Wir verkaufen das Lebensgefühl Ihrer Immobilie und moderieren Einwände professionell weg"), daneben sehr nüchterne, ehrliche Passagen (Direktankauf-Abwägung, Makler-Kriterien).
- Nicht generisch: DEKRA-Sachverständiger als Kern, Direktankauf-Seite mit Ehrlichkeits-Absatz, Bezirks-Mikroargumente (Hang, Stützmauer, Stellplatz), Lebenssituations-Menü, PDF-Ratgeber, Kontakt-FAQ. Template-artig: Zähler „0+", Versalien-H3, austauschbare Vorteils-Bullets („Gehen Sie mit einem Lächeln aus dem Notartermin"), Ortsseiten als Schablone mit Textbausteinen, Aachen-Seiten verwässern die Regionalität.

### 5.10 SEO
- Start: Title „Immobilienmakler Stuttgart | PORTIMMO, DEKRA-Bewertung" / H1 „Ihr Immobilienmakler in Stuttgart für den sicheren Immobilienverkauf". Verkaufen: Title „Wir bringen die Sicherheit beim Verkaufsprozess Ihres Hauses" / H1 „Sicherheit beim Hausverkauf" (ohne „Stuttgart"); Wohnung: Title „Wohnung verkaufen in Stuttgart: sicher zum besten Preis".
- Lokale Keywords: „Immobilienmakler in <Ort>" für >40 Orte, Stuttgarter Bezirke, „Stuttgart" in fast allen Titles. Blog-Frequenz: 2026 mehrere Artikel/Monat (September 2026: 3 Erb-/Pflege-Artikel). Schema: Organization+RealEstateAgent (Adresse, Geo, Logo), FAQPage auf vielen Seiten, Article/CollectionPage auf Ratgeber-Rubriken, BreadcrumbList.

### 5.11 Technik
- WordPress (wp-content; Elementor-Klassen; Generator entfernt), Sprengnetter-Widget, gtag/GTM, Calendly (laut Hinweis „laden NICHT beim Seitenaufruf"), Cookie-Banner „Alle akzeptieren / Nur notwendige" (Anbieter nicht erkennbar). Ladezeit grob: mittel–schwer (Hero-Video, 39 Bilder, Widgets).

### 5.12 Rechtliches
- Impressum vollständig: „Anbieter: PORTIMMO GmbH … Geschäftsführer: Erik Porthun … HRB: 780416 … Registergericht Amtsgericht Stuttgart Zuständige Aufsichtsbehörde IHK Region Stuttgart Jägerstraße 30 | 70174 Stuttgart … Gewerbeerlaubnis gem. §34c GewO wurde erteilt durch: IHK Region Stuttgart … Zuständige Aufsichtsbehörde für die Tätigkeit nach § 34c Abs. 1 S. 1 Nr.4 GewO: IHK Region Stuttgart"; Standort Aachen ergänzt; AGB-, Widerrufsbelehrungs-Seiten vorhanden.

### 5.13 Stärken / Schwächen / Übernahme für Rössler
**Stärken**
- Einzige Seite der Stichprobe mit **ausgearbeiteter Direktankauf-Seite** inkl. ehrlicher Preis-Einordnung, 4-Schritte-Prüfung, Formular und FAQ – direkt übertragbar.
- Navigation nach „Ihre Situation" (Erbe, Scheidung, Pflege, Vermieter, vermietete Wohnung) – Lebenssituationen als eigene Menüspalte.
- Mehrstufiges Bewertungsangebot (anonymer Sofort-Rechner → Sprengnetter-Auswertung → DEKRA vor Ort) mit klarer Abgrenzung zum Gutachten.
- Ortsseiten mit echtem Lokalbezug (Pendlerargument Leonberg, Ortsteile Eltingen/Höfingen/Gebersheim/Warmbronn, Strohgäu) – zeigt, wie Rösslers Orte beschrieben werden können.
- Prüfbare Zahlen (350+ Verkäufe, 93 Rezensionen) und Kontakt-FAQ mit Reaktionszeiten.

**Schwächen**
- Vermischung Stuttgart/Aachen; viele Orts- und Ratgeberseiten sind Schablonen; Verkaufsrhetorik stellenweise überdreht; Erb-/Scheidungsseiten sind eher PDF-Lead-Magnete als Fachtexte (Härter/AusBlick deutlich tiefer); Zähler-Platzhalter.

**Für Rössler übernehmen**
1. Direktankauf-Seite 1:1 als Struktur: „Wann sinnvoll (4 Situationen) → 4-Schritte-Prüfung → ehrliche Preis-Einordnung → Kurzformular (Objekttyp/Adresse/Fläche/Baujahr/Name/Telefon) → Auf einen Blick (Wer kauft / Was es kostet / Wie lange / Wer prüft) → FAQ". Da Rössler Eigentumswohnungen ankauft, Objekttyp-Auswahl auf ETW fokussieren.
2. Mega-Menü-Spalte „Ihre Situation" – auch mit zunächst 3–4 Einträgen.
3. Ortsseiten-Schablone à la Leonberg, aber mit Zahlen (Gutachterausschuss) ergänzen; Rössler kennt Heimsheim/Renningen – Ortsteile nennen (z. B. Malmsheim, Perouse, Dachtel-Region nicht, nur eigene Orte).
4. Kontakt-FAQ mit Reaktionszeit und „Was kostet die Erstberatung? Nichts."
5. Vermeiden: Versalien-Schritte, Zähler ohne Werte, austauschbare Vorteils-Bullets.

---

## 6. Immo Invest GmbH – https://immoinvest-stuttgart.de/ – Stuttgart (Direktankauf-Spezialist)

### 6.1 Typ, Team, Spezialisierung, Zielgruppe
- **Typ:** Maklerbüro mit Ankaufsgeschäft (GmbH, „Geschäftsführer: Zeki Üci", „SEIT 1989 Lokales Immobilienbüro"), Büro „Böblinger Str. 165, 70199 Stuttgart (Stuttgart-Süd)".
- **Teamgröße:** nicht genannt; Rezensionen sprechen von „Team" → nicht prüfbar.
- **Spezialisierung:** Zwei Wege: „Premium-Vermarktung oder provisionsfreier Direktankauf." Direktankauf „mit echtem Eigenkapital", „im Ist-Zustand"; Vermarktung mit „strukturiertem Bieterverfahren".
- **Zielgruppe:** Eigentümer in „Alle 23 Stadtbezirke[n]" Stuttgarts in Sondersituationen (Erbe, Scheidung, Sanierungsstau, Finanzdruck, Pflegeheim) sowie Premium-Objekte.

### 6.2 Navigation und Seitenumfang
- **Hauptnavigation (wörtlich):** „Immobilienmakler | Immobilienbewertung | Kontakt" (plus Logo-Claim „Immo Invest GmbH | Immobilienmakler Stuttgart 5,0 Google-Bewertungen").
- **Footer:** Adresse/Telefon/E-Mail, Öffnungszeiten, Links Impressum/Datenschutz/AGB (Linktexte im Extrakt nicht vollständig → teilweise nicht prüfbar).
- **Sitemap:** 8 URLs: `/`, `/agb/`, `/datenschutz/`, `/immobilien/`, `/immobilienbewertung-stuttgart/`, `/impressum/`, `/kontakt/`, `/locations.kml`. → Keine Ratgeber, keine Ortsseiten; Startseite trägt die gesamte Argumentation (≈3.450 Wörter).

### 6.3 Startseite
- **Title:** „Immo Invest GmbH | Immobilienmakler Stuttgart"; **Meta:** „Immo Invest GmbH | Immobilienmakler Stuttgart - Sicherer Direktankauf oder Vermittlung zum Höchstpreis von Immobilien jeglicher Art in Stuttgart."
- **H1:** „Immo­bilien­makler in Stuttgart. Sicher verkaufen."; **Subline:** „Immobilienmakler Stuttgart: Wir bieten Ihnen zwei Möglichkeiten für den Verkauf. Den sofortigen Direktankauf durch uns. Oder die professionelle Vermarktung, um für Sie den Höchstpreis zu erzielen – seriös kalkuliert auf Basis des realistischen, aktuellen Marktwerts."
- **Bullet-Versprechen im Hero:** „Kostenlose Immobilienbewertung | Kauf mit Eigenkapital | Provisionsfreier Direktankauf | Höchstpreis erzielen | Sofortiger Direktankauf"; **Badge-Leiste:** „5,0 GOOGLE STERNE Verifizierte Bewertungen | PLATZ 1 STUTTGART werkenntdenBESTEN.de | IHK MITGLIED Industrie- & Handelskammer | SEIT 1989 Lokales Immobilienbüro".
- **Primärer CTA:** mehrstufiger Funnel direkt auf der Seite („FORTSCHRITT: 0% Schritt 1: Immobilienart auswählen – Mit welcher Immobilie möchten Sie den Höchstpreis erzielen? Haus / Wohnung / Mehrfamilienhaus / Gewerbe / Grund"), außerdem „JETZT HÖCHSTPREIS ERZIELEN", „Jetzt bewerten", „Rückruf anfordern".
- **Sektionen in Reihenfolge:**
  1. Hero (H1, Bullets, Badges, Hero-Video `<video autoplay muted loop playsinline>`)
  2. H2 „Immobilienmakler in Stuttgart" – „Premium-Vermarktung oder provisionsfreier Direktankauf." + H3 „Ihr lokaler Immobilien-Makler in Stuttgart" mit Aufzählung aller Bezirke („Immobilienverkauf und Direktankauf in den inneren Stadtbezirken: Stuttgart-Mitte, Stuttgart-Nord, Stuttgart-Ost, Stuttgart-Süd und Stuttgart-West. … äußeren Stadtbezirken: Bad Cannstatt, Birkach, Botnang, Degerloch, Feuerbach, Hedelfingen, Möhringen, Mühlhausen, Münster, Obertürkheim, Plieningen, Sillenbuch, Stammheim, Untertürkheim, Vaihingen, Wangen, Weilimdorf und Zuffenhausen.")
  3. „AUSGEZEICHNET VON UNSEREN KUNDEN AUF GOOGLE" – 6 anonymisierte Zitate („D. B. 5,0 „Vom ersten Gespräch bis zur Schlüsselübergabe …"", „P. S. 5,0 „… extrem schnelle Abwicklung ohne Maklerprovision beim Direktankauf."") + „Weitere Bewertungen auf Google lesen"
  4. H2 „WIE WIR FÜR SIE DEN HÖCHSTPREIS ERZIELEN." – 4 nummerierte Blöcke: „01. FACHGERECHTE MARKTWERTANALYSE VOR ORT (… Bodenrichtwerte des Gutachterausschusses nach ImmoWertV …) 02. MULTIMEDIALE VERMARKTUNG (… Digitales Home Staging, HDR-Fotografie und virtuelle 3D-Rundgänge … 4K-Drohnenaufnahmen …) 03. STRUKTURIERTES BIETERVERFAHREN & WETTBEWERB (… Obligatorische Bonitätsprüfung aller Kaufinteressenten vor der Besichtigung … Erzeugung künstlicher Verknappung durch eng getaktete Besichtigungstermine …) 04. RECHTSSICHERHEIT & NOTARABWICKLUNG"
  5. H2 „IMMOBILIENBEWERTUNG STUTTGART. HÖCHSTPREIS ERZIELEN. MIT ECHTEN FAKTEN." – „Vergessen Sie ungenaue Online-Rechner. …" + Funnel (s. 6.4)
  6. H2 „Wohnung verkaufen Stuttgart" (Inhalt im Extrakt nicht separat sichtbar → nicht prüfbar)
  7. H2 „Immobilienverkauf In jeder Situation" – 8 Kacheln: „Immobilie geerbt (Nach einem Erbfall bieten wir Erbengemeinschaften eine zügige, faire Lösung. Die Immobilie wird unkompliziert in liquide Mittel umgewandelt.) | Trennung & Scheidung | Sanierungsstau (… Wir kaufen Ihre Immobilie zuverlässig exakt in dem Zustand, in dem sie sich befindet.) | Diskreter Verkauf (… Weder Nachbarn noch das Internet erfahren vom Immobilienverkauf.) | Finanzielle Engpässe (… sofortige Liquidität …) | Haus zu groß geworden | Umzug ins Pflegeheim (… auch wenn die Wohnung noch voll möbliert hinterlassen wird.) | Exklusive Immobilien"
  8. H2 „Komplexe Ausgangslagen. Diskrete Abwicklungen." („Immobilienmakler Stuttgart • Aus der Praxis" – Fallbeispiele, Inhalte nicht extrahiert → nicht prüfbar)
  9. H2 „WARUM EIGENTLICH IMMO INVEST GMBH?" – „Keine theoretischen Marktberichte. Keine Fließband-Bewertungen. … Wir sind täglich draußen am Markt."
  10. H2 „IMMOBILIE VERKAUFEN STUTTGART. IHR DIREKTANKAUF." – „Wir kaufen Ihr Objekt provisionsfrei und mit echtem Eigenkapital. Das bedeutet für Sie: Keine platzenden Bankfinanzierungen. Wir kaufen exakt im Ist-Zustand. Ohne vorheriges Renovieren oder Aufräumen. Keine späteren Reklamationen. Der gesamte Prozess ist diskret, notariell abgesichert und extrem schnell." + zweiter Funnel (Ankauf)
  11. H2 „Stuttgarter Handschlagqualität", H2 „Immo Invest GmbH Besuchen Sie uns.", H3 „Vielen Dank!" (Formular-Dank), H2 „IMMOBILIENMAKLER STUTTGART. SEIT 1989."
- **Persönlichkeit:** keine Person mit Namen auf der Startseite (Geschäftsführer nur im Impressum); „Wir"; Alt-Texte wie „Immobilienbüro Stuttgart Immobilienmakler für Vermarktung und Ankauf"; Hero-Video (Inhalt nicht prüfbar). → Firma statt Mensch.

### 6.4 Verkaufen-/Ankauf-Funnel
- **Funnel 1 (Bewertung/Verkaufsweg), Schritte wörtlich:** „Schritt 1: Immobilienart auswählen (Haus / Wohnung / Mehrfamilienhaus / Gewerbe / Grund)" → „Gewerbe oder Grundstück? (Bebautes Gewerbeobjekt / Unbebautes Grundstück)" → „Gewünschter Verkaufsweg – Welchen Weg bevorzugen Sie? (Diskreter Direktankauf durch uns / Professionelle Vermarktung am Markt / Noch unsicher (Beratung gewünscht))" → „Postleitzahl" → „Straße und Hausnummer" → „Wohnfläche (… Weiß ich nicht genau)" → „Grundstücksfläche" → „Anzahl der Zimmer (−/+)" → „Keller vorhanden? Ja/Nein" → … Kontakt.
- **Funnel 2 (Direktankauf), Schritte wörtlich:** „Was möchten Sie verkaufen? (Haus / Wohnung / Mehrfamilienhaus / Grundstück / Gewerbe)" → „Wo befindet sich das Objekt? (PLZ, Straße, Nr.)" → „Zimmer & Fläche" bzw. „Anzahl Wohneinheiten / Gesamtwohnfläche" → „Wie ist der Zustand? (Sehr gepflegt / Normaler Zustand / Leicht renovierungsbedürftig / Umfassend renovierungsbedürftig / Freies Grundstück / Grundstück mit Altbestand / Gewerbe / Mischobjekt)" → „Haben Sie aktuelle Fotos? (Nein, reiche ich später nach / Ja, jetzt hochladen (Max. 20) – JPG, PNG, PDF)" → „Ihre Kontaktdaten – Wann dürfen wir Sie anrufen? (Jederzeit / Vormittags / Nachmittags)".
- **Bewertungsseite (/immobilienbewertung-stuttgart/):** Title „Kostenlose Immobilienbewertung Stuttgart | Seit 1989"; H2 „IMMOBILIENBEWERTUNG in STUTTGART. KOSTENLOS VOR ORT.", „So ermitteln wir den Marktwert", „Ablauf der Immobilien­bewertung", „Wie geht es weiter nach der Bewertung?" („Weg B (Direktankauf): Wenn Sie absolute Diskretion und einen schnellen Abschluss ohne Besichtigungstermine wünschen, kaufen wir Ihre Immobilie direkt an. Die Zahlung erfolgt gesichert und provisionsfrei."), „Online-Rechner vs. Immo Invest GmbH", FAQ („Wo kann ich meine Immobilie kostenlos bewerten lassen?"), „Die Wahrheit über Immobilienwerte in der Landeshauptstadt" (H3 „Fundierte Expertise: Die drei gesetzlichen Säulen", „Die Auswirkungen des Gebäudeenergiegesetzes (GEG)", „Mehrfamilienhäuser und der Stuttgarter Mietspiegel"); Kosten-Einordnung „Ca. 500 – 1.000 Euro: Sachverständigen-Kurzgutachten …"; „Kostenlos: 0,00 € für die realistische Marktwertanalyse"; Rechtshinweis zu Richtwerten. Schema sehr umfangreich: RealEstateAgent, LocalBusiness, Service, Offer, Review (2), Rating, Person, ItemList, FAQPage, BreadcrumbList.
- **Versprechen:** „Kauf mit Eigenkapital", „Keine platzenden Bankfinanzierungen", „Keine späteren Reklamationen" (vgl. Suchtreffer: „inkl. 100 % Übernahme von Sachmängeln" – auf der Website so nicht gefunden → nicht prüfbar), „Notartermin … in der Regel sehr kurzfristig". **Keine** Aussage, dass der Ankaufspreis unter Marktpreis liegt (im Gegensatz zu PORTIMMO) → Transparenzlücke.
- **Einwandbehandlung:** gegen Online-Rechner („Vergessen Sie ungenaue Online-Rechner"), gegen „Makler-Phrasen" (Kontaktseite: „Sie brauchen keine leeren Makler-Phrasen, sondern jemanden, der Ihnen die komplette Arbeit abnimmt").

### 6.5 Ratgeber-/Info-Seiten
- Keine eigenen Ratgeberseiten. Wissens-Content nur innerhalb der Bewertungsseite (GEG, Mietspiegel, drei Wertermittlungsverfahren). Lebenssituationen nur als 8 Kacheln (2–3 Sätze) auf der Startseite.

### 6.6 Stadtteil-/Ortsseiten
- Keine; alle 23 Bezirke als Aufzählung; `locations.kml` (Google-Maps-Ebenen) in der Sitemap. Alt-Texte deuten auf Bezirks-Bilder („Haus verkaufen Stuttgart Degerloch", „Immobilien Stuttgart West Eigentumswohnung", „Immobilienankauf Stuttgart Feuerbach").

### 6.7 Vertrauenselemente
- „5,0 GOOGLE STERNE Verifizierte Bewertungen" (Anzahl nicht genannt), „PLATZ 1 STUTTGART werkenntdenBESTEN.de", „IHK MITGLIED", „SEIT 1989"; 6 anonymisierte Kundenzitate (Initialen); Review-Schema mit 2 Reviews; Hero-Video; keine Presse, keine Fallzahlen (Verkäufe/Ankäufe), keine Referenzobjekte mit Daten. Garantie-Sprache („Wir garantieren eine rechtssichere Verkaufsabwicklung", „Wir garantieren Ihnen vollkommene Verschwiegenheit").

### 6.8 Kontaktwege
- Telefon „0711 60 15 86 66" (auch „Jetzt anrufen"), E-Mail, Formular mit Anliegen-Auswahl „Direktankauf / Off-Market / Vermarktung" und Feldern „Titel (optional) | Firma (optional) | Name * | E-Mail * | Telefon * | Anliegen *", „Rückruf anfordern", Rückrufzeit-Auswahl im Funnel, WhatsApp-Link im Quelltext, Öffnungszeiten „Mo - Fr: 08:00 - 17:00 Uhr", „Termine nach Absprache". Keine Online-Terminbuchung.

### 6.9 Design & Marke (aus Quelltext abgeleitet)
- Farben: Gold „#d4af37" (132×), „#c3a343", Schwarz „#050505", Grau → „Privatbank-Look" (eigene Wortwahl der Seite: „Wir präsentieren Ihre Immobilie auf Privatbank-Niveau"). Fonts: Outfit, Open Sans, Montserrat (Google Fonts).
- Bildsprache: 35 Bilder, Bezirks-Motive, Siegel, Logo; Hero-Video. Tonalität: Wir, Sie, Versalien-Headlines, viele Absolutbegriffe („absolut diskret", „extrem schnell", „rigoros", „exakt", „absolute Sicherheit").
- Nicht generisch: klare Zweiwege-Logik (Vermarktung vs. Ankauf) als Kern, Foto-Upload im Ankauf-Funnel, Bezirksliste. Template-artig/kritisch: Superlativ-Dichte, Versalien, keine Person, „künstliche Verknappung" als offen kommunizierte Taktik (kann Verkäufer irritieren), Gold-Schwarz-Ästhetik wirkt austauschbar.

### 6.10 SEO
- Start: Title „Immo Invest GmbH | Immobilienmakler Stuttgart" / H1 „Immobilienmakler in Stuttgart. Sicher verkaufen."; Bewertung: Title „Kostenlose Immobilienbewertung Stuttgart | Seit 1989". Keyword-Dichte „Immobilienmakler Stuttgart" sehr hoch; alle Bezirke namentlich. Kein Blog. Schema: sehr umfangreich (s. o.), inkl. Review/Rating – bei nur zwei Reviews im Markup grenzwertig.

### 6.11 Technik
- WordPress 7.1 + Elementor 4.2.4 + WP Rocket 3.23.3.3 (Generator-Tags), Hero-Video, kein Tracking-Skript erkennbar (kein gtag/GTM im Start-HTML), Cookie-Banner nicht erkennbar → ggf. bewusst trackingfrei (nicht prüfbar). Ladezeit grob: mittel (Video, Fonts), WP Rocket-Caching.

### 6.12 Rechtliches
- Impressum: „Immo Invest GmbH | Immobilienmakler Stuttgart … Geschäftsführer: Zeki Üci … Registergericht: Amtsgericht Stuttgart Registernummer: HRB 726373 … Aufsichtsbehörde (§ 34c GewO) Erlaubnis nach § 34c Absatz 1 Satz 1 Nummer 1 GewO (Immobilienmakler). Zuständige Aufsichtsbehörde: IHK Region Stuttgart"; zusätzlich GwG-Hinweis („… nach dem deutschen Geldwäschegesetz (GwG) streng gesetzlich dazu verpflichtet, die Identität unserer Kunden … festzustellen"). Vollständig.

### 6.13 Stärken / Schwächen / Übernahme für Rössler
**Stärken**
- Konsequente Zweiwege-Positionierung (Höchstpreis vs. Direktankauf) bereits im H1-Umfeld und als Auswahlschritt im Funnel („Noch unsicher (Beratung gewünscht)" als dritte Option).
- Ankauf-Funnel fragt genau die Daten ab, die ein Ankäufer braucht (Zustand in 4 Stufen, Fotos, Rückrufzeit).
- Lebenssituations-Kacheln in Ankäufer-Logik formuliert („auch wenn die Wohnung noch voll möbliert hinterlassen wird").
**Schwächen**
- Keine Transparenz über Preisabschlag beim Ankauf; keine Person; keine Belege (Anzahl Ankäufe, Rezensionszahl); keine Ratgeber/Ortsseiten; Superlative.
**Für Rössler übernehmen**
1. Funnel-Schritt „Welchen Weg bevorzugen Sie? Direktankauf / Vermarktung / Noch unsicher" – ideal für Rösslers Doppelangebot.
2. Zustandsstufen + optionaler Foto-Upload im Ankaufsformular.
3. Situations-Kacheln mit Ankauf-Nutzen formulieren („möbliert hinterlassen", „im Ist-Zustand").
4. Gegenteil lernen: Rössler sollte den Preisabschlag beim Direktankauf offen benennen (wie PORTIMMO) und als Person auftreten.

---

## 7. Oerter Immobilien e.K. – https://oerter-immobilien.de/ – Nürnberg

### 7.1 Typ, Team, Spezialisierung, Zielgruppe
- **Typ:** eingetragener Kaufmann („Christian Oerter Oerter Immobilien e.K. Bucher Straße 103 90419 Nürnberg Handelsregister: HRA 19772"), „Unabhängig & inhabergeführt", Gewerbeerlaubnis „am 30.05.22" erteilt (junges Unternehmen trotz „Über 25 Jahre Branchenerfahrung").
- **Teamgröße:** Inhaber + kleines Team („Christian Oerter und Team"; auf /ansatz-arbeitsweise/ H2 „Wer Sie bei Oerter Immobilien begleitet." mit H3 „Christian Oerter" und zwei Platzhaltern „[Name vor Veröffentlichung ergänzen]" → Seite ist live mit Platzhaltern!). Alt-Text „Das Team von Oerter Immobilien in Nürnberg".
- **Spezialisierung:** „Immobilienberatung mit Substanz": Einwertung „auf gutachterlicher Grundlage", Verkauf, Vermietung, Anlageobjekte/Projektvertrieb (Mehrfamilienhäuser, Aufteilung, Bauträgervertrieb), „Besondere Situationen".
- **Zielgruppe:** Eigentümer in Nürnberg/Metropolregion (Fürth, Erlangen; Referenzen in Neumarkt, Regensburg, Berching, Deining), Erbengemeinschaften, Trennungspaare, Betreuer/Bevollmächtigte, Investoren, Bauträger.

### 7.2 Navigation und Seitenumfang
- **Hauptnavigation (wörtlich):** „Verkaufen ▾ (Immobilie verkaufen · Besondere Situationen · Vermieten · Anlageobjekte) | Bewerten | Immobilien | Über uns | Kontakt" + Button „Erstgespräch vereinbaren".
- **Footer (wörtlich, soweit extrahierbar):** „Oerter Immobilien e.K. Bucher Straße 103 90419 Nürnberg", „© 2026 Oerter Immobilien e.K.", H3 „Vertrag widerrufen" (Widerrufs-Hinweis im Footer), Links Impressum/Datenschutz.
- **Sitemap (Yoast):** 59 URLs, davon 29 Objektseiten (`/immobilie/?listing_id=…`), 20 Taxonomie-/Filterseiten (`/immobilien-ort/ort-1/` …), 10 Inhaltsseiten: `/`, `/anlageobjekte/`, `/ansatz-arbeitsweise/`, `/besondere-situationen/`, `/events/`, `/immobilie-bewerten/`, `/immobilie-verkaufen/`, `/immobilie-verkaufen-22-oktober-2026/` (Event-Landingpage), `/immobilie-vermieten/`, `/immobilien/`, `/kontakt/`. → Keine Ratgeber-Artikel, keine Ortsseiten.

### 7.3 Startseite
- **Title:** „Oerter Immobilien | Immobilienmakler Nürnberg"; **Meta:** „Fundierte Einwertung, klare Verkaufsstrategie und persönliche Begleitung: Oerter Immobilien in Nürnberg und der Metropolregion."
- **Kicker:** „Immobilienberatung mit Substanz"; **H1:** „Wer Immobilien richtig einordnet, trifft bessere Entscheidungen."; **Subline:** „Wir verbinden Einwertung auf gutachterlicher Grundlage mit regionaler Marktkenntnis und persönlicher Begleitung – für Klarheit bei Verkauf, Vermietung und Bewertung."
- **CTAs:** „Gespräch vereinbaren" (primär) / „Bewertung anfragen"; Trust-Zeile „4,9 Google-Bewertung · Basierend auf 67 Bewertungen | Nürnberg · Metropolregion | Über 25 Jahre Branchenerfahrung | Unabhängig & inhabergeführt".
- **Sektionen in Reihenfolge:**
  1. Hero
  2. 3 Einstiegskacheln: „BERATUNG – Immobilienberatung: Wenn der nächste Schritt noch offen ist, klären wir Ausgangslage, Ziele und sinnvolle Optionen. | VERKAUF – Immobilie verkaufen: Einwertung, Preisstrategie, Vermarktung und Abschluss werden schlüssig aufeinander abgestimmt. | BEWERTUNG – Immobilie bewerten lassen: Vom ersten Wertrahmen bis zur fundierten Einwertung – passend zu Ihrer konkreten Fragestellung."
  3. Fakten-Leiste: „Regional verankert – In Nürnberg und der Metropolregion | 1.000+ Mandate – ERFAHRUNG, DIE IN JEDE ENTSCHEIDUNG EINFLIESST | Persönlich begleitet – KLAR GEFÜHRT BIS ZUM ABSCHLUSS | Fundiert eingewertet – AUF GUTACHTERLICHER GRUNDLAGE"
  4. Event-Teaser: „INFORMATIONSABEND FÜR EIGENTÜMER – Die eigene Immobilie verkaufen? Gut vorbereitet entscheiden. … Ein Immobilienberater und ein Notar geben Ihnen Orientierung. … Die Teilnahme ist für Sie kostenfrei. 22. Oktober 2026 Beginn: 18:00 Uhr Einlass: ab 17:30 Uhr nutsraum Karl-Grillenberger-Str. 3a 90402 Nürnberg DETAILS & ANMELDUNG" (laut /events/ wurde der Termin abgesagt: „Informationsabend am 22. Oktober 2026 entfällt" – Startseite nicht aktualisiert)
  5. „Aktuelle Immobilien" (3 Objekte, u. a. „Reihenendhaus in Nürnberg Brunn … 599.000 €")
  6. „Wie wir denken" – H2 „Ein guter Verkauf folgt einer klaren Strategie." – 4 Schritte: „01 Grundlage schaffen – Immobilie, Unterlagen und Markt einordnen. 02 Preisstrategie entwickeln – Wertgrundlage und Angebotspreis nachvollziehbar ableiten. 03 Marktauftritt abstimmen – Zielgruppe, Darstellung und Ansprache zusammenführen. 04 Verkauf steuern – Anfragen, Verhandlungen und Abschluss koordinieren." (im HTML doppelt vorhanden – Desktop/Mobile-Variante, einmal mit Tippfehler „Verkaufsteuern" und „klaren Strategie klaren Strategie")
  7. „Persönlich für Sie da" – H2 „Verantwortung endet für uns nicht bei einer Empfehlung." – „Christian Oerter behält Ihre Ausgangslage, die vereinbarte Strategie und den weiteren Verlauf im Blick. Im Team werden Einwertung, Vermarktung und Organisation fachlich abgestimmt …" + 4 Kacheln „Klare Zuständigkeiten | Abgestimmte Kommunikation | Gebündelte Kompetenz | Verlässliche Begleitung"
  8. „Besondere Situationen" – H2 „Wenn die Situation den Weg bestimmt." – 5 Kacheln „Erbe & Nachlass | Komplexe Verkaufssituationen | Verkauf bei rechtlicher Betreuung | Scheidung & Trennung | Persönliche Veränderung"
  9. H2 „Erfahrungen schaffen Vertrauen." (Google-Widget, „Alle Bewertungen ansehen")
  10. „Aus der Praxis" – H2 „Erfolgreiche Vermarktung zeigt sich im Ergebnis." – Referenzprojekt „Verkauf eines Mehrfamilienhauses – Neumarkt i.d.OPf. · 24 Wohneinheiten · ca. 1.850 m² Wohnfläche – Ausgangssituation: Bestandsobjekt mit Aufwertungspotenzial und besonderer Anforderung an die Käuferansprache. Unser Ansatz: Fundierte Einwertung, strukturierte Aufbereitung und gezielte Ansprache geeigneter Investoren. Ergebnis: Erfolgreich veräußert …" + 4 Kurzreferenzen („Mehrfamilienhaus Regensburg · 18 Wohneinheiten – Strategisch neu positioniert." / „Eigentumswohnung Neumarkt · 3 Zimmer · 82 m² – Sicher und zielgerichtet verkauft." / „Villenanwesen Berching · ca. 420 m² – Diskret vermarktet." / „Baugrundstück Deining · ca. 4.200 m² – Potenziale sichtbar gemacht.")
  11. „Persönlich in Nürnberg" – H2 „Lassen Sie uns Ihre Immobilienfrage besprechen." (Kontakt)
- **Persönlichkeit:** Inhaber namentlich in Text und Kontakt („Christian Oerter Geschäftsführer"), Team-Foto, keine Vita, kein Video, kein Zitat; „Wir"-Form. Hinweis im Impressum: „Auf dieser Website werden neben Fotografien auch KI-gestützt erzeugte oder bearbeitete Illustrationen und Bildmontagen verwendet. Einzelne Motive zeigen reale Personen in KI-gestützt erzeugten Szenen …" (Alt-Texte wie „Älteres Paar hält den Grundriss einer Wohnung in einem hellen Wohnraum", „Visualisierung eines modernen Einfamilienhauses auf Bauplänen").

### 7.4 Verkaufen-Funnel (https://oerter-immobilien.de/immobilie-verkaufen/)
- **Title:** „Immobilie verkaufen | Metropolregion Nürnberg"; **Meta:** „Immobilie verkaufen in Nürnberg, Fürth und Erlangen: Einwertung auf gutachterlicher Grundlage, klare Verkaufsstrategie und persönliche Begleitung."; **H1:** „Immobilie verkaufen – mit klarer Strategie und persönlicher Begleitung."
- **Struktur (H2/H3 wörtlich):** „Drei Fragen, die früh geklärt sein sollten." (H3 „Was soll der Verkauf erreichen?", „Welche Wert- und Preisgrundlage ist belastbar?", „Ist die Immobilie verkaufsbereit?") → „Vom Verkaufsziel bis zur Übergabe." (6 H3: „Ausgangslage und Ziele klären | Immobilie und Unterlagen erfassen | Wert und Preisstrategie ableiten | Marktauftritt vorbereiten | Nachfrage gezielt steuern | Verhandlung und Abschluss koordinieren") → „Marktwert und Angebotspreis sind nicht dasselbe." → „Passende Nachfrage beginnt mit klarer Positionierung." (H3 „Klare Informationsbasis | Passende Käufergruppen | Glaubwürdige Darstellung | Marktreaktionen einordnen") → „Wenn der Verkauf nicht der erste Schritt ist." (5 Prüffragen als H3: „Wer ist beteiligt und entscheidungsbefugt? | Welche Interessen müssen zusammengeführt werden? | Welche Fragen zur Immobilie sind noch offen? | Welche Rahmenbedingungen setzen Grenzen? | Welcher nächste Schritt ist tatsächlich sinnvoll?") → „Fachlich fundiert. Persönlich begleitet." (H3 „Nachvollziehbare Grundlagen | Eine passende Verkaufsstrategie | Klare Abläufe und Kommunikation | Persönliche Verantwortung") → „Jede Lage hat ihren eigenen Markt." → „Besprechen wir, was jetzt sinnvoll ist."
- **Formulare:** kein Verkaufsformular auf der Seite; CTA „Immobilie bewerten lassen" / Telefon „0911 394 105 00". Kontaktformular (/kontakt/): „Vorname | Nachname | E-Mail | Telefon | Mein Anliegen (Immobilienbewertung / Immobilie verkaufen / Immobilie vermieten / Anlageobjekt / Projekt / Besondere Situation / Erstorientierung / Allgemeine Frage) | Ihre Nachricht | Bevorzugte Kontaktart (Telefonrückruf / E-Mail-Antwort / Termin buchen) | Einverständnis".
- **Bewertungsseite (/immobilie-bewerten/):** H1 „Welcher Bewertungsweg passt zu Ihrer Immobilie und Ihrer Entscheidung?"; drei Wege (H3 „Digitale Werteinschätzung | Einwertung auf gutachterlicher Grundlage | Preisstrategie für den Immobilienverkauf"); H2 „Vom Wunschpreis zum Verkaufspreis." (H3 „Der Wunschpreis | Der Marktwert | Der Angebotspreis | Der Verkaufspreis"); „Vier Faktoren für ein belastbares Ergebnis."; „Diese Unterlagen helfen bei der Einordnung." (4 Gruppen); Ablauf „Ausgangslage besprechen → Unterlagen und Immobilie erfassen → Drei Verfahren anwenden → Ergebnis persönlich erläutern"; FAQ (FAQPage-Schema) „Ist eine Einwertung mit einem Verkaufsauftrag verbunden? | Ist die Einwertung ein förmliches Verkehrswertgutachten? | Was passiert, wenn Unterlagen fehlen? | Warum werden drei Bewertungsverfahren angewendet? | Wie lange bleibt eine Einwertung aktuell?". Kein Online-Rechner.
- **Versprechen/Einwandbehandlung:** keine Garantien, keine Zahlen zu Dauer/Preis; stattdessen Erwartungsmanagement („Die Einwertung schafft eine fachliche Grundlage – sie nimmt die Entscheidung nicht vorweg."; „Nicht jede besondere Situation führt automatisch zu einem Verkauf."). Kein Direktankauf, keine Festpreisgarantie.

### 7.5 Ratgeber-/Info-Seiten
- Keine klassischen Ratgeber-Artikel. Wissensvermittlung über (a) Leistungsseiten mit Erklärcharakter (Bewerten: „Wunschpreis/Marktwert/Angebotspreis/Verkaufspreis"), (b) **Infoabend-Format** („Wissen rund um Immobilien. Zeit für Ihre Fragen." – /events/ mit Anmeldung, Newsletter „Neue Termine? Wir geben Ihnen Bescheid."), (c) Seite „Besondere Situationen" (/besondere-situationen/, ≈1.440 Wörter): H1 „Wenn eine Immobilie Teil einer größeren Entscheidung wird."; H2 „Was vor dem nächsten Schritt geklärt sein sollte." (H3 „Wer ist an der Entscheidung beteiligt? | Was ist zur Immobilie verlässlich bekannt? | Welche Lösung passt zur Situation?"); H2 „Welche Ausgangslage beschäftigt Sie?" mit 5 Kacheln (Kicker + H3 + Satz): „EIGENTUM NEU ORDNEN – Trennung oder Scheidung: Wenn eine gemeinsame Immobilie neu geregelt werden muss, helfen nachvollziehbare Fakten, realistische Optionen und ein klarer Rahmen für die nächsten Entscheidungen." | „INTERESSEN ABSTIMMEN – Erbengemeinschaft: Wenn mehrere Erben gemeinsam entscheiden, braucht es eine verlässliche Grundlage …" | „VERANTWORTUNG WAHRNEHMEN – Betreuung oder gesundheitliche Veränderungen: Wenn Angehörige, Bevollmächtigte oder Betreuer eingebunden sind …" | „PERSPEKTIVEN NEU PRÜFEN – Veränderungen im persönlichen Lebensumfeld: … ohne den Verkauf bereits vorauszusetzen." | „BESONDERHEITEN EINORDNEN – Komplexe oder besondere Objekte"; „Sie finden sich hier nicht eindeutig wieder?" → „Situation besprechen"; H2 „Was sollte zuerst geklärt werden?" (4 H3), H2 „Was Oerter Immobilien in dieser Situation beitragen kann" (H3 „Immobilie fundiert einordnen | Optionen verständlich machen | Beteiligte verlässlich informieren | Entscheidung konsequent umsetzen"), H2 „Verkaufen oder halten?", H2 „Sie müssen Ihre Situation nicht vollständig vorsortiert haben." Abschluss: „Unverbindlich. Persönlich. Klar eingeordnet." Keine FAQ, kein Schema außer WebPage.
- Eigene Erbe-/Scheidungs-Fachtexte mit Paragraphen/Fristen: **nicht vorhanden**.

### 7.6 Stadtteil-/Ortsseiten
- Keine; nur Taxonomie-Filter „immobilien-ort/ort-1…3". H2 „Jede Lage hat ihren eigenen Markt." bleibt ohne Ortsseiten.

### 7.7 Vertrauenselemente
- „4,9 Google-Bewertung · Basierend auf 67 Bewertungen", Google-Widget; „1.000+ Mandate", „Über 25 Jahre Branchenerfahrung"; Referenzen mit Objektdaten (Einheiten, Fläche, Ort) aber ohne Dauer/Preis; Infoabend mit Notar als Kompetenznachweis; Kontaktversprechen „Antwort innerhalb von 24 Stunden | Absolut vertraulich | Direkte Ansprechpartner | Erstgespräch kostenlos". Keine Siegel, keine Presse, kein Video.

### 7.8 Kontaktwege
- Telefon „0911 394 105 00", E-Mail „info@oerter-immobilien.de", Formular mit Anliegen + bevorzugter Kontaktart (Rückruf/E-Mail/Termin), WhatsApp-Link im Quelltext, Erreichbarkeit „Werktags 10:00 – 18:00 Uhr, Termine nach Vereinbarung, Samstag [nach Vereinbarung]". Kontakt-H1 „Wir sind für Sie da. Persönlich und ohne Umwege." – „Kein Formularmarathon, keine Warteschleife."

### 7.9 Design & Marke (aus Quelltext abgeleitet)
- Farben: Petrol/Tannengrün „#115b5e" (38×), Sand „#d8d2c5", Creme „#f7f5f0", Olive „#707b49", Blaugrau „#7ea7a8" → warme, gedeckte Palette, bewusst nicht „Makler-Blau". Font „Mulish" (Google Fonts).
- Bildsprache: Team-Foto, Illustrationen/KI-Montagen (offengelegt), Pläne/Grundrisse – keine Hochglanz-Objekte im Hero.
- Tonalität: Wir, Sie; **beratend, entschleunigt, fast juristisch-nüchtern**; Verben wie „einordnen", „klären", „ableiten"; kaum Adjektive, keine Superlative; viele Fragen als Überschriften („Wer ist beteiligt und entscheidungsbefugt?").
- Nicht generisch: Entscheidungs- statt Verkaufsrhetorik („ohne den Verkauf bereits vorauszusetzen"), Infoabend mit Notar, Widerrufs-Hinweis im Footer, KI-Bild-Transparenz, Kontaktart-Auswahl. Template-/Fehler-Anteile: Platzhalter „[Name vor Veröffentlichung ergänzen]" auf Live-Seite, doppelte Sektionen, Tippfehler, abgesagter Event noch im Hero, Elementor-Standardstruktur.

### 7.10 SEO
- Start: Title „Oerter Immobilien | Immobilienmakler Nürnberg" / H1 „Wer Immobilien richtig einordnet, trifft bessere Entscheidungen." (kein Keyword in H1). Verkaufen: Title „Immobilie verkaufen | Metropolregion Nürnberg" / H1 „Immobilie verkaufen – mit klarer Strategie und persönlicher Begleitung."
- Lokale Keywords: Nürnberg, Fürth, Erlangen, Metropolregion in Metas; keine Stadtteile. Blog-Frequenz: kein Blog. Schema: Yoast-Graph (WebPage, Organization), FAQPage nur auf Bewerten-Seite.

### 7.11 Technik
- WordPress 7.1.4, Elementor 4.2.2, Site Kit by Google; Cookie: Complianz; Tracking: gtag/GTM. Ladezeit grob: mittel (Elementor, Google Fonts, 19 Bilder).

### 7.12 Rechtliches
- Impressum vollständig: Inhaber, e.K., HRA 19772 Nürnberg, USt-ID DE361256445, „Die Gewerbeerlaubnis nach 34c Abs.1 Satz1 GewO wurde am 30.05.22 von folgender Stelle erteilt: IHK München und Oberbayern.", redaktionell Verantwortlicher, KI-Bild-Hinweis. Aufsichtsbehörde = IHK (genannt als erteilende Stelle).

### 7.13 Stärken / Schwächen / Übernahme für Rössler
**Stärken**
- Sprachlich die eigenständigste Seite: Beratungs- statt Verkaufsmodus, Fragen als Struktur, klare Trennung „Wunschpreis / Marktwert / Angebotspreis / Verkaufspreis".
- „Besondere Situationen" als eigene Leistungsseite mit Betreuungs-/Vollmachtsfall (den sonst keiner nennt).
- Offline-Format (Infoabend mit Notar) + Kontaktformular mit Kontaktart-Wahl.
- Transparenz-Signale (KI-Bilder, Widerruf, 24-h-Antwort).
**Schwächen**
- Live-Platzhalter und Dubletten; keine Ratgeber-Artikel, keine Ortsseiten, keine harten Verkaufszahlen; H1 ohne Keyword; Event-Absage nicht auf der Startseite nachgezogen.
**Für Rössler übernehmen**
1. Die Vier-Preise-Erklärung („Wunschpreis → Marktwert → Angebotspreis → Verkaufspreis") als Kern der Bewertungsseite – passt exakt zu Rösslers H1 „Mit einem klaren Plan" und zur Sektion „Welcher Preis ist realistisch?".
2. Lebenssituationen als Kacheln „Kicker + Situation + ein Satz ohne Verkaufsdruck" („… ohne den Verkauf bereits vorauszusetzen").
3. Formularfeld „Bevorzugte Kontaktart: Rückruf / E-Mail / Termin".
4. Vermeiden: Platzhalter online stellen; Events ohne Pflegeprozess.

---

## 8. AusBlick Immobilien eGbR – https://ausblick-immobilien.com/ – Düsseldorf

### 8.1 Typ, Team, Spezialisierung, Zielgruppe
- **Typ:** kleines inhabergeführtes Büro, Rechtsform eGbR („AusBlick Immobilien eGbR Königsallee 27 40212 Düsseldorf … Gesellschaftsregister: GsR 902 Registergericht: Amtsgericht Düsseldorf … Vertreten durch: Salima Homborg, Elisabeth Santos").
- **Teamgröße:** 2 Inhaberinnen („Sali Homborg und Elisabeth Santos – beide Inhaberinnen und Geschäftsführerinnen von AusBlick Immobilien – bilden das Kern-Team"); „Karriere"-Seite vorhanden.
- **Spezialisierung:** Verkauf von Wohnimmobilien in Düsseldorf + Umland (Meerbusch, Neuss) nach dem „AusBlick-Prinzip" (Preisstrategie, Fotografie, Objektvideo, Drohne, Home-Staging-Beratung); Fallschwerpunkte: vermietete Wohnung, Erbe, Scheidung, Verkauf mit Wohnrecht/Verrentung; Off-Market/Suchauftrag.
- **Zielgruppe:** Eigentümer in Düsseldorf und Umgebung, besonders in „schwierigen Lebenssituationen – nach einer Erbschaft, einer Trennung, beim Übergang in eine kleinere Wohnung".

### 8.2 Navigation und Seitenumfang
- **Hauptnavigation (wörtlich, Mega-Menü):** „Verkauf | Bewertung | Immobilien ▾ (Immobilienangebote · Suchagent · Tippgeber) | Referenzen | Über uns | Ratgeber ▾ [Immobilie verkaufen: der Leitfaden | Nach Immobilientyp: Haus verkaufen · Wohnung verkaufen · Vermietete Wohnung verkaufen · Grundstück verkaufen · Mehrfamilienhaus verkaufen | Nach Anlass: Geerbte Immobilie: verkaufen, vermieten oder behalten? · Immobilie bei Scheidung & Sondersituation · Verkaufen oder vermieten im Alter · Verrentung: Nießbrauch, Wohnrecht & Teilverkauf · GEG & Sanierungspflichten beim Eigentümerwechsel | Gut zu wissen: Immobilie verkaufen: der Leitfaden · Was ist meine Immobilie wert? · Steuern beim Immobilienverkauf · Mit oder ohne Makler verkaufen · Wie lange dauert der Verkauf? · Alle Ratgeber →] | Aktuelles ▾ (Karriere · Veranstaltungen · Kooperationspartner) | Kostenlose Bewertung" + Header-Kontakt „Anrufen +49 211 238 55-335 · E-Mail office@ausblick-immobilien.com".
- **Footer:** Adresse „Königsallee 27 40212 Düsseldorf", „© 2026 AusBlick Immobilien", Sticky-CTA „Kostenlos · 2 Minuten Was ist Ihre Immobilie wert? Kostenlose Bewertung"; Linklisten nicht vollständig extrahierbar (nicht prüfbar).
- **Sitemap (sitemap.xml):** 86 URLs: `/`, `/bewertung/`, `/verkauf/`, `/ueber-uns/`, `/referenzen/`, `/immobilienangebote/`, `/suchagent/`, `/tippgeber/`, `/karriere/`, `/kooperationspartner/`, `/veranstaltungen/`, `/ratgeber/` + **44 Ratgeber-Unterseiten** (`/ratgeber/<slug>/`) + **32 Stadtteilseiten** (`/standort/immobilienmakler-duesseldorf-<stadtteil>/`: Angermund, Benrath, Bilk, Derendorf, Düsseltal, Eller, Friedrichstadt, Gerresheim, Golzheim, Grafenberg, Heerdt, Himmelgeist, Holthausen, Kaiserswerth, Kalkum, Lörick, Lohausen, Ludenberg, Mörsenbroich, Niederkassel, Oberbilk, Oberkassel, Pempelfort, Rath, Stockum, Unterbach, Unterbilk, Unterrath, Urdenbach, Vennhausen, Wersten, Wittlaer) + Rechtsseiten. `/kontakt/` existiert nicht (404) – Kontakt über Formulare auf jeder Seite.

### 8.3 Startseite
- **Title:** „Immobilienmakler Düsseldorf - AusBlick Immobilien"; **Meta:** „Ihr Immobilienmakler in Düsseldorf: ehrliche Bewertung, Verkauf nach Plan und persönliche Begleitung bis zur Schlüsselübergabe. Jetzt anfragen."
- **H1:** „Ihr Immobilien­makler in Düsseldorf und Umgebung."; **Subline:** „Als inhabergeführter Immobilien­makler in Düsseldorf und Umgebung sagen wir Ihnen ehrlich, was realistisch ist – persönlich vor Ort, keine Online-Schätzung, unverbindlich."; drei Hero-Bullets: „Über 18 Jahre Erfahrung – inhabergeführt, von der ersten Einschätzung bis zur Schlüsselübergabe | Ehrliche Bewertung statt Lockpreis – wir setzen nie zu hoch an, nur um den Auftrag zu gewinnen | Verkauf in Ø 4–6 Wochen – nach dem AusBlick-Prinzip – System statt Bauchgefühl".
- **Primärer CTA:** „Was ist Ihre Immobilie wert? →" mit Microcopy „Kostenlos · Anfrage in 2 Minuten · Unverbindlich"; Trust-Badge „★★★★★ 5,0 auf Google"; Kennzahlen „5,0 Google-Bewertung | 18+ Jahre Erfahrung | 4–6 Wochen Ø Verkaufsdauer".
- **Sektionen in Reihenfolge:**
  1. Hero
  2. „Warum AusBlick Immobilien" – H2 „Der richtige Preis schützt Sie vor dem teuersten Fehler." – 4 H3: „Ehrlicher Preis, kein Lockpreis (Wir nennen keine Wunschzahl, nur um Ihren Auftrag zu bekommen.) | Das AusBlick-Prinzip (Marktgerechte Preisstrategie, professionelle Fotografie, Objektvideo und Drohnenaufnahmen, hochwertiges Exposé und Home-Staging-Beratung. … in Ø 4–6 Wochen zum Verkauf.) | Inhaberinnen führen persönlich (Sie haben durchgehend dieselbe Ansprechpartnerin … Keine wechselnden Sachbearbeiter, kein anonymer Callcenter-Kontakt.) | Begleitung bis zur Schlüsselübergabe"
  3. „Partner & Mitgliedschaften" (Logos, u. a. Alt „ImmoScout24-Partner")
  4. „Kundenstimmen" – H2 „Was Eigentümer nach dem Verkauf über uns sagen." (Google-Widget: „Die echten Google-Rezensionen lesen Sie direkt hier.")
  5. „Unsere Leistungen" – H2 „Womit wir Sie in Düsseldorf und Umgebung weiterbringen." – 4 Kacheln (Verkauf nach Plan / Was ist Ihre Immobilie wirklich wert? / Aktuelle Immobilienangebote / Suchauftrag & Off-Market)
  6. „Immobilien" – H2 „Aktuelle Angebote in Düsseldorf und Umgebung."
  7. „AUS DER PRAXIS" – H2 „Verkauft – auch wenn es kompliziert wurde." – 3 **Fallstudien** als Akkordeon „Ausgangssituation / Herausforderung / Der Verkauf mit uns / Ergebnis": „Fallstudie 01 Vermietete Eigentumswohnung – vom Ladenhüter zum Verkauf (Eigentümer aus Düsseldorf) … Die Wohnung war bereits zuvor durch einen anderen Makler vermarktet worden – ohne Abschluss. … In Abstimmung mit Verkäufer und Mieter erarbeiteten wir einen Aufhebungsvertrag, der die Nutzungsperspektive verbesserte und die Zielgruppe auf Eigennutzer und Kapitalanleger erweiterte. … Ergebnis: Innerhalb kurzer Zeit deutlich mehr Aufmerksamkeit und erfolgreiche Vermittlung an einen passenden Käufer." / „Fallstudie 02 Saniert in der Niedrigzinsphase – Verkauf ohne Verlust" / „Fallstudie 03 Verkauf mit Wohnrecht auf Zeit – Planungssicherheit (Eigentümer aus Neuss)". Hinweis: „Echte Verkäufe, anonymisiert dargestellt".
  8. H2 „Die wichtigsten Fragen vor dem Verkauf." – 6 FAQ mit Kategorie-Tags „Markt & Preis / Markt / Preis / Lagen / Verkauf" (z. B. „Ist es aktuell gut, ein Haus zu verkaufen? Ja, wenn der Preis stimmt. …", „Welches ist das teuerste Viertel in Düsseldorf? Lagen wie Oberkassel, Niederkassel, Golzheim und Kaiserswerth …", „Wie kann ich am schnellsten meine Wohnung verkaufen? … Nach dem AusBlick-Prinzip erreichen wir so eine durchschnittliche Verkaufsdauer von 4–6 Wochen.")
  9. „Kostenlose Bewertung" – H2 „Wie viel ist Ihre Immobilie wert?" – „In 2 Minuten angefragt — wir melden uns persönlich mit Ihrer Einschätzung, vor Ort statt online." Schritte „1 Objekt wählen → 2 Eckdaten angeben → 3 Persönliche Einschätzung"; Kacheln „Haus bewerten (Einfamilien-, Reihen- & Mehrfamilienhaus) | Wohnung bewerten (Eigentums- oder Penthousewohnung) | Grundstück bewerten"; Microcopy „Persönlich vor Ort · Kostenlos & unverbindlich · Anfrage in 2 Minuten · SSL- & DSGVO-konform"
  10. H2 „Markteinblicke und Aktuelles aus Düsseldorf." – 16 eingebettete Instagram-Reels („Instagram: @ausblick_immobilien →")
  11. „Über uns" – H2 „Zwei Inhaberinnen, ein klarer Grundsatz." – „… und den Mut, Ihnen auch eine unbequeme Einschätzung zu geben, wenn Ihr Wunschpreis am Markt nicht trägt."
  12. H2 „Ihr Immobilienmakler in Düsseldorf und der gesamten Region." (Stadtteil-Links)
  13. H2 „Sprechen Sie direkt mit uns." – H3 „Wie können wir Ihnen helfen?" (Formular mit Toggle „Nachricht / Anrufen")
  14. H2 „Starten Sie mit dem richtigen Preis." (Abschluss-CTA)
- **Persönlichkeit:** zwei Inhaberinnen mit Foto (Alt „Die Inhaberinnen von AusBlick Immobilien im Büro an der Königsallee", „Elisabeth Santos · AusBlick Immobilien"), Ich-Vita von Elisabeth Santos auf /ueber-uns („Düsseldorf ist nicht nur meine Heimat – es ist der Ort, an dem ich aufgewachsen bin …"), Instagram-Reels als „Behind-the-scenes", YouTube-Kanal „@AusBlickImmobilien". Wir-Form; Hauptansprechpartnerin wird als „dieselbe Ansprechpartnerin" versprochen.

### 8.4 Verkaufen-Funnel (https://ausblick-immobilien.com/verkauf/)
- **Title:** „Immobilie verkaufen in Düsseldorf – Ablauf & Marktwert"; **Meta:** „Immobilie verkaufen in Düsseldorf: Marktwert realistisch einschätzen, klarer Ablauf und Beratung durch Ihren Makler vor Ort. Jetzt kostenlos bewerten."; **H1:** „Immobilie verkaufen in Düsseldorf und Umgebung – zum realistischen Preis."
- **Struktur (H2 wörtlich):** „Verkaufen – und keinen teuren Fehler machen?" (Einstiegs-Empathie: „Diese Unsicherheit ist normal – und sie lässt sich auflösen. Wir hören zuerst zu, schätzen ehrlich ein und zeigen Ihnen einen klaren Weg …") → „Mehr als ein Schild im Garten." (H3 „Ehrliche Marktbewertung | Professionelle Präsentation | Strategische Vermarktung | Begleitung bis zur Schlüsselübergabe") → „Echte Verkäufe, echte Ergebnisse." (3 Fallstudien) → „In klaren Schritten zur Schlüsselübergabe." („Ein guter Verkauf folgt keiner Improvisation, sondern einem nachvollziehbaren Plan." – Schrittinhalte per JS, nicht prüfbar) → „Wie viel ist Ihre Immobilie wert?" (3 Bewertungs-Kacheln) → „Verkaufen in Düsseldorf und Umgebung." (Markttext) → „Ihre Fragen zum Verkauf." (8 FAQ, z. B. „Kann ich mein Haus so billig verkaufen wie ich möchte? … Sinnvoll ist ein zu niedriger Preis aber selten – Sie verschenken damit Geld", „Werden die Immobilienpreise 2026 wieder steigen? Seriöse Prognosen … sind mit Vorsicht zu genießen – niemand kann sie garantieren.") → „Mit oder ohne Makler verkaufen?" (Vergleichstabelle „Zeitaufwand: Wir übernehmen Besichtigungen und Organisation – Sie müssen nicht einmal anwesend sein. | Anfragen, Besichtigungen und Koordination liegen vollständig bei Ihnen." …) → „Erbschaft, Scheidung, Umzug – wir begleiten Sie." → „So machen wir Ihre Immobilie sichtbar." → „Ihr Verkauf beginnt mit einer ehrlichen Einschätzung."
- **Bewertungstool (/bewertung/):** H1 „Immobilienbewertung Düsseldorf und Umgebung – was ist Ihre Immobilie wirklich wert?"; ausdrücklich **kein Sofort-Ergebnis**: „Sie geben Eckdaten Ihrer Immobilie ein und stellen damit in rund zwei Minuten Ihre Anfrage. Wir verstehen das nicht als Sofort-Ergebnis, sondern als Start: Den verlässlichen Wert ermitteln wir anschließend persönlich vor Ort."; H2 „Hinter jeder Bewertung steht ein Grund – wir kennen ihn", „Online-Tool oder persönlich vor Ort?", „Eine Bewertung ist kein Gutachten – und das ist gut so" (H3 „Markteinschätzung (das machen wir)" / „Verkehrswertgutachten (dafür verweisen wir weiter)"), 6 Wertfaktoren, 8 FAQ („Was kostet eine Immobilienbewertung in Düsseldorf?", „Wie genau sind Online-Bewertungstools?" …). Schema: Service + Offer + Place + RealEstateAgent.
- **Versprechen:** „Verkauf in Ø 4–6 Wochen", „Ehrliche Bewertung statt Lockpreis", „dieselbe Ansprechpartnerin", „Wir nehmen keinen Auftrag an, dessen Preis wir nicht ehrlich vertreten können." Keine Garantie, kein Direktankauf, keine Festpreis-Zusage; Verrentung/Teilverkauf als Alternative im Ratgeber.
- **Einwandbehandlung:** „Klartext – Wir wissen, was Sie über Makler denken. Zu teuer, zu wenig erreichbar, macht schnell den Abschluss und ist dann weg. Dieses Bild hat sich die Branche über Jahre selbst erarbeitet – und es ist nicht unberechtigt. … Wir sagen das offen, weil wir genau dagegen arbeiten." (/ueber-uns).

### 8.5 Ratgeber-/Info-Seiten (https://ausblick-immobilien.com/ratgeber/)
- H1 „Ratgeber"; Meta nennt 6 Hauptratgeber. **Vollständige Themenliste (44 Seiten, H3 wörtlich, nach Rubrik):**
  - **Erben & Immobilie:** Geerbte Immobilie: verkaufen, vermieten oder behalten? · Erbengemeinschaft: Haus verkaufen · Erbschaftssteuer & Freibeträge · Haus geerbt: Ablauf & Fristen · Pflichtteil & Immobilie · Grundbuchberichtigung & Unterlagen im Erbfall
  - **Steuern beim Verkauf:** Steuern beim Immobilienverkauf · Spekulationssteuer & Fristen · Steuerfrei verkaufen (Eigennutzung) · Schenkung statt Erbe
  - **Verkaufsprozess & Kosten:** Immobilie verkaufen: der Leitfaden · Unterlagen-Checkliste · Was kostet der Verkauf? · Haus verkaufen Düsseldorf · Wohnung verkaufen Düsseldorf · Wie lange dauert der Verkauf? · Die 7 teuersten Fehler beim Hausverkauf · Mit oder ohne Makler verkaufen · Diskret verkaufen (Off-Market) · Vermietete Wohnung verkaufen · Grundschuld löschen & Übergabeprotokoll · Versteckte Mängel & Informationspflichten · Grundstück verkaufen Düsseldorf · Mehrfamilienhaus verkaufen Düsseldorf
  - **Scheidung & Lebenslagen:** Immobilie bei Scheidung & Sondersituation · Zugewinnausgleich & Haus · Teilungsversteigerung vermeiden · Verkauf trotz laufendem Kredit · Verrentung: Nießbrauch, Wohnrecht & Teilverkauf · Verkaufen oder vermieten im Alter
  - **Wert verstehen:** Was ist meine Immobilie wert? · Verkehrswert & die 3 Verfahren · Bodenrichtwert: finden & richtig lesen · Online-Bewertung vs. Makler vor Ort vs. Gutachten · Was steigert den Wert? Modernisierung vor dem Verkauf · Kaufpreisfaktor erklärt
  - **Energie & Pflichten:** Energieausweis: Pflicht & Kosten · GEG & Sanierungspflichten beim Eigentümerwechsel · Grundsteuer & Grunderwerbsteuer kompakt
  - **Lokaler Markt:** Immobilienmarkt & Preise Düsseldorf · Stadtteile & Lagen Düsseldorf · Immobilienpreise: der Marktbericht
- Teaser-Texte sind schablonenhaft („Alles zu Bodenrichtwert: finden & richtig lesen in Düsseldorf: Antworten, Ablauf und echte Marktdaten – plus kostenlose Einschätzung vom Makler vor Ort." – identisch für jeden Artikel) → maschinell erzeugte Übersicht.
- Datierung: Artikel tragen „Stand: 22.08.2026" (vermietete Wohnung, Stadtteile) → Ratgeber offenbar in einem Zug im August 2026 erstellt; Blog-Frequenz danach nicht prüfbar.

**Detail 1 – Geerbte Immobilie (https://ausblick-immobilien.com/ratgeber/geerbte-immobilie/)**
- Title „Geerbte Immobilie in Düsseldorf – Ratgeber & Antworten | AusBlick Immobilien"; Meta „Geerbte Immobilie verkaufen in Düsseldorf und Umgebung: Wer darf verkaufen, welche Fristen gelten, was bleibt nach Kosten übrig?"
- H1 „Geerbte Immobilie in Düsseldorf und Umgebung verkaufen — alle wichtigen Antworten"; ≈3.670 Wörter; Schema Article + FAQPage + Person (Autorinnen).
- „Das Wichtigste in Kürze" (4 Bullets, wörtlich): „Wer verkaufen darf, regelt der Erbschein oder das Testament — bei einer Erbengemeinschaft müssen alle Miterben zustimmen. | Der Wert einer geerbten Immobilie hängt von Lage, Zustand und aktuellem Markt ab — eine Vor-Ort-Bewertung schützt vor einem falschen Preis. | Fristen können relevant werden: Erbschaftssteuer ist innerhalb von drei Monaten nach Kenntnis des Erbfalls anzumelden. | Ein Makler mit Ortskenntnis — etwa in Stadtteilen wie Oberkassel, Gerresheim oder Benrath — kann entscheidend dazu beitragen …"
- H2/H3: „Die Themen dieses Ratgebers auf einen Blick" (H3-Links zu 3 Unterratgebern: Erbengemeinschaft / Erbschaftssteuer & Freibeträge / Haus geerbt: Ablauf & Fristen) | „Wer darf eine geerbte Immobilie überhaupt verkaufen?" | „Wie läuft der Verkauf einer geerbten Immobilie ab?" (H3 „Erbnachweis | Wertermittlung | Unterlagen | Vermarktung und Abschluss") | „Was kostet der Verkauf — und was bleibt übrig?" | „Erbschaftssteuer: Freibeträge und Steuerklassen im Überblick" | „Was eine geerbte Immobilie in Düsseldorf wert ist" | „Geerbte Immobilie verkaufen — Antworten auf die wichtigsten Fragen" (FAQ, u. a. „Was ist meine geerbte Immobilie in Düsseldorf wert?", „Sollte ich meine geerbte Immobilie privat oder mit Makler verkaufen?") | „Geerbte Immobilie verkaufen — was Sie wirklich wissen müssen" (Fazit) | „Was ist Ihre geerbte Immobilie in Düsseldorf wert?" (3 Bewertungs-Kacheln).
- Praxisdetail: „Auch wenn alle Miterben grundsätzlich verkaufen wollen, braucht es für den Notartermin eine gemeinsame Vollmacht oder die persönliche Anwesenheit aller." CTAs: „Kostenlose Bewertung anfragen →", Sticky-Bewertungs-CTA, Abschluss „Sie haben gelesen, was zu beachten ist — jetzt geht es um Ihre konkrete Situation."

**Detail 2 – Vermietete Wohnung (https://ausblick-immobilien.com/ratgeber/vermietete-wohnung-verkaufen/)**
- Title „Vermietete Wohnung verkaufen in Düsseldorf – Ratgeber | AusBlick Immobilien"; H1 „Vermietete Wohnung in Düsseldorf verkaufen: Was Sie wirklich wissen müssen"; ≈3.680 Wörter; Autorenzeile „Sali Homborg | Inhaberin & Geschäftsführerin Fachlich geprüft von Elisabeth Santos Stand: 22.08.2026 · Lesezeit ca. 13 Min."
- „Das Wichtigste in Kürze" (6 Bullets, u. a. „Der Verkehrswert einer vermieteten Wohnung liegt in der Regel unter dem einer freistehenden, weil potenzielle Eigennutzer wegfallen.", „Kapitalanleger zahlen nach Rendite – eine realistische Mietrendite und saubere Mietunterlagen sind entscheidend.").
- H2/H3: „Was ist Ihre vermietete Wohnung wirklich wert?" (H3 „Ertragswert oder Vergleichswert – was gilt?", „Was Käufer wirklich prüfen") | „Wie der Verkauf einer vermieteten Wohnung abläuft" (H3 Schritt 1 „Wertermittlung und Strategie" … Schritt 6 „Übergabe und Abschluss") | „Steuer und Recht: Was Eigentümer beim Verkauf beachten müssen" (H3 „Spekulationssteuer: Die Zehn-Jahres-Frist", „Vorkaufsrecht des Mieters", „Eigenbedarfskündigung: Was ist möglich?" (doppelt), „Grunderwerbsteuer und Notarkosten", „AfA und steuerliche Abschreibung beim Käufer") | „Besondere Situationen beim Verkauf einer vermieteten Wohnung" (H3 „Wohnung geerbt, Mieter bleibt | Mieter zahlt unregelmäßig oder verweigert Besichtigungen | Umwandlung in Wohnungseigentum noch nicht abgeschlossen | Sanierung geplant, Mieter wohnt noch") | „Düsseldorf als Anlegermarkt: Was das für Ihren Verkauf bedeutet" | „Häufige Fragen zum Verkauf einer vermieteten Wohnung" (erste: „Was ist meine vermietete Wohnung in Düsseldorf wert?") | „Fazit: Informiert verkaufen lohnt sich" | „Sprechen Sie direkt mit uns."
- Scheidungs-Ratgeber (/ratgeber/immobilie-scheidung/, ≈3.760 Wörter): H1 „Immobilie bei Scheidung verkaufen — Ihr Leitfaden für Düsseldorf und Umgebung"; „Das Wichtigste in Kürze": „Beide Ehepartner müssen dem Verkauf zustimmen, sofern die Immobilie gemeinsam gehört — ein einseitiger Verkauf ist rechtlich nicht möglich. | Der erzielte Verkaufserlös fließt in den Zugewinnausgleich ein … | Wer eine Teilungsversteigerung vermeiden will, sollte frühzeitig handeln — ein guter Verkauf am freien Markt erzielt in der Regel deutlich mehr."; H2 „Was passiert mit dem Haus bei einer Scheidung?", „Wie läuft der Verkauf der Immobilie bei Scheidung ab?" (5 H3), „Was tun, wenn keine Einigung möglich ist?", „Die drei Wege beim Scheidungsverkauf im Überblick", FAQ, „Bereit für den nächsten Schritt?".

### 8.6 Stadtteil-/Ortsseiten
- **32 Stadtteilseiten** + Übersicht `/ratgeber/stadtteile/` (H1 „Immobilie in Düsseldorf verkaufen: Was Ihr Stadtteil wirklich wert ist", ≈2.930 Wörter).
- **Aufbau Oberkassel (https://ausblick-immobilien.com/standort/immobilienmakler-duesseldorf-oberkassel/, ≈2.550 Wörter):** H1 „Ihr Immobilienmakler in Oberkassel" → H2 „Ein Preis, der hält – kein Auftrag um jeden Preis." (H3 „Ehrliche Bewertung zuerst | Wir kennen die Halbinsel | Ein fester Ansprechpartner") → H2 „Das sagen Eigentümer in Oberkassel." → **H2 „Oberkassel in Zahlen & Fakten."** mit amtlichen Daten: „Zahlen zu Oberkassel 3,69 km² · Stadtteil-Nr. 041 · 4.979 Einw./km² | Einwohner 2022 18.372 +11,2 % bis 2035 (Zensus 15.05.2022 · Ø-Alter 44,6 Jahre · Prognose der Stadt: 21.140 (2035)) | Eigentümerquote 27,4 % (Selbst genutzte Wohnungen (Zensus 2022) · Düsseldorf gesamt 26,6 %) | Wohnungsgröße 95 m² (Ø Wohnfläche je Wohnung (Zensus 2022) · Düsseldorf gesamt 78 m² · 11.000 Wohnungen) | Nettokaltmiete 11,26 €/m² (Ø Bestandsmiete je m² (Zensus 2022) · Düsseldorf gesamt 9,32 €/m²) | Altersstruktur 2019 ■ Prognose 2035 | Düsseldorf gesamt 2024 · Eigentumswohnungen Ø Kaufpreis Neubau 7.358 €/m² · Baujahr ab 2010 6.218 €/m² · Baujahr 2000–2009 4.340 €/m² · Baujahr 1994–1999 3.738 €/m² | 2.704 Wohnungsverkäufe · 449 Verkäufe von Ein-/Zweifamilienhäusern (2024)" mit **Quellenangabe**: „Quellen: Zensus 2022 (Statistische Ämter des Bundes und der Länder, 100-m-Gitterzellen, Stichtag 15.05.2022, auf die Stadtteilgrenzen umgerechnet …); Landeshauptstadt Düsseldorf – Open Data (Stadtteilprofile/Bevölkerungsprognose 2035, Flächen); Gutachterausschuss für Grundstückswerte Düsseldorf – Grundstücksmarktdaten NRW 2024 (BORIS NRW). Datenlizenz Deutschland – Namensnennung 2.0." → Lagetext („Prägend ist das Gründerzeitquartier mit vorherrschender Blockrandbebauung aus den Jahren 1900 bis 1914, das 1992 großflächig unter Denkmalschutz gestellt wurde. … ob Ihre Immobilie an der Luegallee als Magistrale … liegt, am Verkehrsknotenpunkt Belsenplatz oder am ruhigen Rheinufer …") → H2 „Wie viel ist Ihre Immobilie in Oberkassel wert?" → „Wir sind in ganz Düsseldorf für Sie da." → „Von der Bewertung bis zum Notartermin." (H3 „Was ist Ihre Immobilie wert? | Verkaufen mit Strategie | Off-Market-Zugang in Oberkassel") → „Aktuelle Angebote in Düsseldorf." → FAQ „Häufige Fragen zu Immobilien in Oberkassel." (H3 „Was kostet ein Haus in Oberkassel?") → „Ihre Ansprechpartnerinnen für Oberkassel" → Kontakt (inkl. „Schreiben Sie uns per WhatsApp", „Jetzt anrufen").
- Marktdaten-Quelle: Zensus 2022, Open Data Düsseldorf, Gutachterausschuss/BORIS NRW – **die sauberste Quellenarbeit der Stichprobe**.

### 8.7 Vertrauenselemente
- „5,0 auf Google" (Anzahl nicht genannt; „Alle Bewertungen stammen direkt aus dem Google Business Profil – öffentlich einsehbar und verifiziert."), Google-Widget; „Über 18 Jahre Erfahrung"; „Ø 4–6 Wochen Verkaufsdauer" (Herkunft nicht belegt); 4 Fallstudien auf /referenzen/ („Vier echte Verkaufsfälle – was wirklich hinter einem Abschluss steckt", inkl. „Drohende Sonderumlage – Verkauf durch Transparenz statt Schweigen"); Qualifikation „zertifizierte Immobilienmaklerin (IHK)"; Partner-Logos (ImmoScout24); Instagram-Reels, YouTube; Autorenzeile mit „Fachlich geprüft von …" und Lesezeit in Ratgebern. Keine Siegel von BELLEVUE/Capital, keine Presse.

### 8.8 Kontaktwege
- Telefon „+49 211 238 55-335" (Header), E-Mail „office@ausblick-immobilien.com", **WhatsApp** („wa.me/4915161101453"), Formulare auf jeder Seite (Toggle Nachricht/Anrufen; Felder „Ihr Name …", Einwilligung), Sticky-Bewertungs-CTA, Instagram/YouTube. Keine Terminbuchung, keine Öffnungszeiten im Extrakt (nicht prüfbar). Kontaktseite 404.

### 8.9 Design & Marke (aus Quelltext abgeleitet)
- Farben: Kupfer/Bronze „#b87a52", Creme „#f5f1ea", (Google-Farben vom Widget) → warm, editorial. Fonts: „Cormorant Garamond" (Serif für Headlines, Google Fonts) + Sans (CSS-Variablen) → bewusst „nicht Makler-Standard".
- Bildsprache: Inhaberinnen im Büro an der Königsallee, Düsseldorf am Rhein, Altbau-Angebote; Reels als Bewegtbild.
- Tonalität: Wir, Sie; empathisch-direkt („Wir wissen, was Sie über Makler denken."), kurze H2 mit Punkt, Fragen-Überschriften; weibliche Formen („Ansprechpartnerin", „Inhaberinnen") als Differenzierung.
- Nicht generisch: Fallstudien-Akkordeon, Stadtteilseiten mit Zensus-Daten + Quellen, Makler-Klischee-Einwand, „Das Wichtigste in Kürze"/Lesezeit/Prüfer in Ratgebern, Serif-Typo. Template-/Automations-Anteile: identische Teaser-Schablone in der Ratgeber-Übersicht, Template-Reste im HTML („${s.title}", „'+s.title+'" als H3), FAQ-Akkordeons teils leer, Kontaktseite fehlt.

### 8.10 SEO
- Start: Title „Immobilienmakler Düsseldorf - AusBlick Immobilien" / H1 „Ihr Immobilien­makler in Düsseldorf und Umgebung."; Verkaufen: Title „Immobilie verkaufen in Düsseldorf – Ablauf & Marktwert" / H1 „Immobilie verkaufen in Düsseldorf und Umgebung – zum realistischen Preis."
- Lokale Keywords: Düsseldorf + 32 Stadtteile + Meerbusch/Neuss; Ratgeber-Titel fast alle mit „in Düsseldorf". Blog-Frequenz: Sammelveröffentlichung 08/2026, danach nicht prüfbar. Schema: RealEstateAgent (mit founder-Personen, vatID), Article + FAQPage + Person auf Ratgebern, Service/Offer/Place auf Bewertung, BreadcrumbList überall.

### 8.11 Technik
- CMS: kein Generator; Divi-String, aber Template-Literale („${s.title}") deuten auf eigenes JS/Static-Setup → nicht prüfbar. Tracking: gtag/GTM mit „GCM sync"-Kommentaren (Google Consent Mode); Cookie-Banner-Anbieter nicht erkennbar. Ladezeit grob: mittel (16 Instagram-Embeds auf der Startseite sind ein Performance-Risiko).

### 8.12 Rechtliches
- Impressum: eGbR, GsR 902 Amtsgericht Düsseldorf, Vertreterinnen, USt-ID DE456206998, „Aufsichtsbehörde Ordnungsamt Düsseldorf Worringer Straße 111, 40210 Düsseldorf", redaktionell Verantwortliche, Streitbeilegungshinweis. **Hinweis auf § 34c GewO / Erlaubnisbehörde im Impressumstext nicht gefunden** → nicht prüfbar/unvollständig (Aufsichtsbehörde ist genannt).

### 8.13 Stärken / Schwächen / Übernahme für Rössler
**Stärken**
- Stadtteilseiten mit amtlichen Daten und Quellen – Vorbild für Ortsseiten Heimsheim/Leonberg/Ditzingen/Renningen/Pforzheim (Zensus 2022 liegt für alle Gemeinden vor; Gutachterausschüsse Leonberg, Böblingen, Pforzheim/Enzkreis liefern Kaufpreisdaten).
- Ratgeber-Architektur „Nach Immobilientyp / Nach Anlass / Gut zu wissen" im Menü; jeder Artikel mit „Das Wichtigste in Kürze", Inhaltsverzeichnis, FAQ, Autorin + Prüferin + Stand + Lesezeit.
- Fallstudien in 4 Schritten (Ausgangssituation/Herausforderung/Verkauf mit uns/Ergebnis) – anonymisiert, aber konkret (Aufhebungsvertrag, Wohnrecht auf Zeit, Sonderumlage).
- Klartext-Einwand („Wir wissen, was Sie über Makler denken.") und ehrliche Grenzziehung („Eine Bewertung ist kein Gutachten").
**Schwächen**
- Ratgeber-Übersicht und einige Artikel wirken automatisiert (identische Teaser, Template-Reste, Dubletten-H3); „Ø 4–6 Wochen" unbelegt; § 34c-Angabe fehlt; Kontaktseite 404; viele Embeds.
**Für Rössler übernehmen**
1. Ortsseiten-Datenblock „<Ort> in Zahlen & Fakten" mit Zensus-2022-Werten (Einwohner, Eigentümerquote, Ø Wohnfläche, Ø Miete) + Kaufpreise nach Baujahrsklasse vom Gutachterausschuss + Quellenzeile + Datenlizenz.
2. Menüstruktur „Nach Anlass" (Erbe, Scheidung, Alter, vermietet) als erstes Ratgeber-Cluster.
3. Fallstudien-Format für die ersten 3 Verkäufe/Ankäufe.
4. Ratgeber-Kopfzeile: Autor (Linus Rössler), Stand, Lesezeit, „Das Wichtigste in Kürze".
5. Vermeiden: automatisierte Teaser-Texte; unbelegte Durchschnittsdauer.

---

## 9. Philipp Weiß Immobilien – https://www.philipp-weiss-immobilien.de/ – Köln

### 9.1 Typ, Team, Spezialisierung, Zielgruppe
- **Typ:** Einzelmakler („Philipp Weiß Immobilien Max-Pechstein-Str. 37 50858 Köln Vertreten durch: Philipp Weiß"; Kicker „Philipp Weiß Inhaber aus Köln-Lindenthal"), gegründet 2023 („Um hier eine echte Benchmark zu setzen, gründete er 2023 …"), Erfahrung „bereits vor knapp zehn Jahren" im Anlagesegment.
- **Teamgröße:** 1 Person (Über-uns: „… im Umgang mit Immobilieneigentümern, Käufern oder den eigenen Mitarbeitern" deutet auf Mitarbeiter → nicht prüfbar).
- **Spezialisierung:** „Ihr Experte für Rendite- & Wohnimmobilien" – Eigentumswohnungen, Häuser, Mehrfamilienhäuser „mit 3-19 Wohneinheiten", Wohn- & Geschäftshäuser; Investoren-Datenbank/Off-Market-Pool; Vermietung.
- **Zielgruppe:** Eigentümer, Investoren und Unternehmen in Köln/Bonn/Düsseldorf („Wir vermitteln Anlage- & Wohnimmobilien in und um Köln. Sie finden uns also auch in Bonn, Bergisch Gladbach, Leverkusen und im Rhein-Sieg-Kreis sowie in Düsseldorf, Neuss, Meerbusch, Krefeld, Duisburg, Essen, Bochum, Dortmund und Wuppertal.").

### 9.2 Navigation und Seitenumfang
- **Hauptnavigation (wörtlich):** „Immobilienbewertung | Verkäufer ▾ (Verkaufen & Vermieten · Marktpreiseinschätzung · Ratgeber · Annuitätenrechner) | Käufer ▾ (Kaufen & Mieten · Suchprofil-Exklusive · Ratgeber · Immo-Tippgeber werden) | Unternehmen ▾ (Über uns · Unser Versprechen · Kontakt) | Kontakt ▾ (Kontakt · Terminbuchung)"; Topbar „✆ +49 160 97550000 ✉ info@philipp-weiss-immobilien.de".
- **Footer (wörtlich):** „Impressum | Datenschutz" + „Nach oben scrollen" – sonst nichts.
- **Sitemap:** nicht vorhanden/abrufbar (sitemap.xml, wp-sitemap.xml ohne `<loc>`) → **Seitenzahl nicht prüfbar**. Aus Links ermittelt: `/`, `/wohnung-haus-und-mehrfamilienhaus-verkaufen/`, `/immobilienbewertung/`, `/immobilien-ratgeber/`, `/ueber-uns/`, `/verkaufs-zusicherung/`, `/kontaktseite/`, `/immo-tippgeber-werden/`, `/suchprofil-exklusive/`, `/annuitaetenrechner-…/`, `/impressum/`, `/datenschutz/` + Ratgeber-Artikel (Anzahl ≈ 12–15 laut Übersicht).

### 9.3 Startseite
- **Title:** „Ihr Immobilienmakler für Mehrfamilienhäuser und Wohnimmobilien in Köln, Bonn, Düsseldorf und Umgebung -" (endet mit Bindestrich = leerer Site-Name); **Meta:** automatisch aus Seitentext generiert („Philipp Weiß Immobilien Ihr Experte für Rendite- & Wohnimmobilien "Sie möchten Ihre Wohnung, Ihr Haus oder Mehrfamilienhaus in Köln/Bonn verkaufen? …") → keine gepflegte Description.
- **H1 (mehrere!):** „Ihr Experte für Rendite- & Wohnimmobilien" (Hero), weitere H1: „Sie möchten einen kompetenten Spezialisten für Ihre Immobilie in und um Köln?", „Wir verkaufen für Sie in Köln und Umgebung", „Schnelle & kostenlose Marktpreiseinschätzung Ihrer Immobilie", „Häufig gestellte Fragen" → 5 H1 auf einer Seite.
- **Subline (H3):** „"Sie möchten Ihre Wohnung, Ihr Haus oder Mehrfamilienhaus in Köln/Bonn verkaufen? Oder suchen Sie eine Immobilie?""; Signatur „Philipp Weiß – Inhaber aus Köln-Lindenthal"; CTA „Jetzt Kontakt aufnehmen!".
- **Sektionen in Reihenfolge:** Hero (Portrait, Zitat-Frage, CTA) → „Experten mit lokaler Erfahrung und Spezialisierung" (Textblöcke als H2: „Ob Wohnung, Haus, Mehrfamilienhaus, Wohn- & Geschäftshaus … Wir übernehmen für Sie die Arbeit und gehen erfolgsabhängig in Vorleistung …", „Wir werden von unseren Kunden zu über 97% weiterempfohlen. …", „Unser Fokus liegt ganz klar in Kölle. Denn "in Kölle sin mir zohus".", „Sie möchten einen sicheren und strukturierten Immobilienverkauf für den richtigen Preis? Dann vereinbaren Sie jetzt einen kostenlosen Beratungstermin!") → Trustindex-Google-Widget „AUSGEZEICHNET Basierend auf 14 Bewertungen" mit Rezensionen (z. B. Silke Neuhaus: „der Verkauf unseres Hauses war für uns mehr als nur eine Transaktion; es war der Abschied eines Lebensabschnitts. …") → „Wir verkaufen für Sie in Köln und Umgebung" („… spezialisierter und kompetenter Makler für Renditeobjekte und Zinshäuser aus Köln …") → „Schnelle & kostenlose Marktpreiseinschätzung" („Für die Bewertung Ihrer Immobilie greifen wir auf einen Datensatz mit Informationen aller Immobilien spezifisch auf Renditeobjekte und Zinshäuser aus Deutschland zu …") → „Häufig gestellte Fragen" (4: „Womit unterscheidet sich Philipp Weiß Immobilien von anderen Immobilienmaklern?", „Warum sollte ich meine Immobilie über Philipp Weiß Immobilien verkaufen lassen?", „Wie viel kostet es, meine Immobilie … bewerten zu lassen? Die Immobilienbewertung mit dem Hintergrund eines Verkaufs ist bei uns kostenlos.", „Warum sollte ich hier ein Suchprofil anlegen? … Offmarket-Pool …") → „Lernen Sie uns näher kennen" (4 Kacheln Über uns / Leistungen / Ratgeber / Plattformen mit Instagram/Facebook/LinkedIn) → „Oder buchen Sie gleich einen kostenlosen Berartungstermin" (Calendly-Inline-Widget; Tippfehler im Original).
- **Persönlichkeit:** Inhaber-Portrait im Hero, Name/Ort als Signatur, Kölsch-Zitate („in Kölle sin mir zohus", „ganz der kölschen Art"), Über-uns-Story („Schon in jungen Jahren war für Philipp Weiß klar: Eine Immobilie ist weit mehr als nur Stein und Mörtel."). Kein Video. Tonalität wechselt zwischen „Wir", „Philipp Weiß" in dritter Person und auf /ueber-uns sogar „du" („… diesen Prozess für dich zu einem rundum positiven und stressfreien Erlebnis zu machen").

### 9.4 Verkaufen-Funnel
- **/wohnung-haus-und-mehrfamilienhaus-verkaufen/** – Title „Wohnung, Haus und Mehrfamilienhaus verkaufen -"; H1 „Immobilien verkaufen und vermieten" (+ weitere H1 „Wir verstehen Sie und nehmen Ihre Immobilie persönlich", „Wir geben 110% für Ihre Immobilie", „Wir haben einen strukturierten Fahrplan", „Wir sind Experten für den Kölner Immobilienmarkt und dessen Umland", „Seit vielen Jahren überzeugen wir mit Leidenschaft"); Kernaussagen: „Aktuell beträgt bei uns die durchschnittliche Vermarktungsdauer ca. 3 Monate bis zum Verkaufsabschluss. Viele Verkäufer überschätzen den Wert ihrer Immobilie und halten an falschen Preisvorstellungen fest. Andererseits suchen Kaufinteressenten nach Mängeln …"; „Feste und routinierte Abläufe sind Grundvoraussetzung für einen planbaren Erfolg …"; Zitat „"Wir pflegen mit fast allen Kunden, auch nach dem Verkauf noch Kontakt. …"". Kein Schritt-für-Schritt-Prozess, keine Unterlagenliste.
- **/verkaufs-zusicherung/ („Unser Versprechen")** – H1 „Philipp Weiß Immobilien Unsere Verkaufs-Zusicherung an Sie"; drei Säulen (H2): „Wir kennen den Immobilien-markt in und um Köln | Wir verkaufen für Sie zum richtigen Preis | Wir nehmen den Verkauf Ihrer Immobilie persönlich"; **Kennzahlen als H2:** „Zu 95% erreichen wir den verabredeten Verkaufspreis | Aktuell beträgt die durchschnittliche Vermarktungsdauer 3 Monate | Wir werden zu über 97% von unseren Kunden weiterempfohlen" (Herkunft nicht belegt → nicht prüfbar); **Provision transparent:** „Was kostet Sie der Verkauf …? 3,57% inkl. MwSt. Die Maklerprovision wird auf der Grundlage des beurkundeten Kaufpreises berechnet und ist für den Verkäufer erst zu zahlen mit Erhalt der Kaufpreiszahlung des Käufers. Wir sind ebenfalls für den Käufer tätig und schließen einen provisionspflichtigen Maklervertrag in gleicher Höhe mit Ihm ab."; Kontaktblock „Jederzeit für Sie da – Montag-Freitag: 09-18 Uhr", Formular (Vor- und Nachname, E-Mail, Telefon, Nachricht, Datenschutz), „Wir rufen Sie zurück", „Oder Buchen Sie einfach online einen Termin".
- **Bewertungstool (/immobilienbewertung/):** Seite enthält nur 25 Wörter Text → Inhalt per Iframe/JS (Anbieter nicht erkennbar) → **nicht prüfbar**; Startseite nennt „Marktpreiseinschätzung" mit Datensatz-Argument.
- **Versprechen/Besonderheiten:** „Verkaufs-Zusicherung" mit 3 Kennzahlen, Provision bei Kaufpreiseingang, „erfolgsabhängig in Vorleistung", Investoren-Datenbank („Unsere Datenbank biete Ihnen unterschiedlichste Gesuche, die häufig schnelle und unkomplizierte Verkaufsabwicklungen ermöglichen."), Tippgeber-Programm, Calendly-Terminbuchung. Kein Direktankauf, keine Festpreisgarantie.
- **Einwandbehandlung:** implizit über Datensatz-/Marktkenntnis-Argumente; kein Privatverkauf-Vergleich auf der Verkaufsseite (dafür Ratgeber „Haus oder Wohnung ohne Makler in Köln verkaufen").

### 9.5 Ratgeber-/Info-Seiten (https://www.philipp-weiss-immobilien.de/immobilien-ratgeber/)
- H1 „Ihr Immobilien Ratgeber"; Artikel mit Datum und „Lesedauer". **Themenliste (sichtbar, wörtlich):**
  1. 05. Januar 2026 · 7 Min · „Mehrfamilienhaus bewerten: Was ist die Immobilie wert?"
  2. 31. Oktober 2025 · 6 Min · „Haus oder Wohnung ohne Makler in Köln verkaufen – Schritt für Schritt"
  3. 18. August 2025 · 4 Min · „Bestellerprinzip - einfach erklärt"
  4. 08. März 2025 · 4 Min · „Immobilienbewertung bei einer Erbschaft"
  5. 01. April 2025 · 4 Min · „Immobilienbewertung bei einer Scheidung"
  6. 01. März 2025 · 5 Min · „Das Bieterverfahren beim Immobilienverkauf"
  7. 01. Februar 2025 · 4 Min · „Wie wirkt sich die Inflation auf Immobilien aus?"
  8. 01. Februar 2025 · 5 Min · „Wohnen, leben & investieren in Köln-Mülheim"
  9. 18. Januar 2025 · 4 Min · „Immobilienverkauf selbst durchführen – Was Sie wissen müssen"
  10. 21. Januar 2025 · 5 Min · „Wohnen, leben & investieren in Köln-Rodenkirchen"
  11. 25. Januar 2025 · (weitere, Liste im Extrakt abgeschnitten) + Über-uns-Teaser „Geerbtes Haus oder geerbte Wohnung verkaufen: … umfassenden Ratgeber …"
- Frequenz: 2025 ca. monatlich, 2026 nur ein Beitrag (Januar) → eingeschlafen.
- Detailanalyse der Erb-/Scheidungs-Artikel: nur Teaser erfasst („Die Bewertung einer geerbten Immobilie ist in vielen Situationen von zentraler Bedeutung – sei es für die Berechnung der Erbschaftssteuer, die Entscheidung über Verkauf oder Eigennutzung oder zur Auszahlung von Miterben."; „Eine Scheidung bringt nicht nur emotionale Herausforderungen mit sich … Soll das Haus oder die Wohnung verkauft werden? Kann einer der beiden …"); Lesedauer 4 Minuten → ca. 800–1.000 Wörter (Schätzung, nicht prüfbar). H-Struktur/FAQ der Artikel nicht abgerufen → nicht prüfbar.

### 9.6 Stadtteil-/Ortsseiten
- Keine Ortsseiten; stattdessen Ratgeber-Porträts „Wohnen, leben & investieren in Köln-Mülheim / Köln-Rodenkirchen" (Bezirksebene, Investorenblick). Marktdaten-Quelle nicht angegeben → nicht prüfbar.

### 9.7 Vertrauenselemente
- Google via Trustindex: „AUSGEZEICHNET Basierend auf 14 Bewertungen" (Volltexte mit Namen, z. B. Anja Huntemüller, Christian, Fabian, Silke Neuhaus, Anton Rill, Stefan Kohlenbeck, Julia Göhmann); ProvenExpert-Skript vorhanden (Inhalt nicht prüfbar).
- Kennzahlen „95 % / 3 Monate / 97 %" ohne Quelle; keine Referenzobjekte mit Daten; keine Siegel, keine Presse; Social-Links (Instagram, Facebook, LinkedIn).

### 9.8 Kontaktwege
- Mobil „+49 160 97550000" (Topbar, Footer-Block), E-Mail, Formular, „Wir rufen Sie zurück", **Calendly-Terminbuchung** (Inline-Widget + Menüpunkt „Terminbuchung"), Erreichbarkeit „Montag-Freitag: 09-18 Uhr". Kein WhatsApp.

### 9.9 Design & Marke (aus Quelltext abgeleitet)
- Farben: kaum feste Hex-Werte (Elementor-Globals), vereinzelt Grün „#35764d" → nicht prüfbar; keine Google Fonts. 81 Bilder, davon viele Review-Avatare/Sterne („Google star 1…").
- Tonalität: Wir + Inhaber in dritter Person + vereinzelt Du; Kölner Lokalkolorit; viele Textblöcke als H2 (ganze Absätze in Überschriften); Tippfehler („Berartungstermin", „Kontak", „Seitbeginn", „Großteiler").
- Nicht generisch: Rendite-/Zinshaus-Spezialisierung, Verkaufs-Zusicherung mit Zahlen, Provisions-Fälligkeit, Kölsch-Zitate, Tippgeber. Template-artig: Elementor-Standard, Überschriften-Inflation (5 H1), Trustindex/ProvenExpert-Widgets, keine gepflegten Metas.

### 9.10 SEO
- Start: Title „Ihr Immobilienmakler für Mehrfamilienhäuser und Wohnimmobilien in Köln, Bonn, Düsseldorf und Umgebung -" / H1 „Ihr Experte für Rendite- & Wohnimmobilien". Verkaufen: Title „Wohnung, Haus und Mehrfamilienhaus verkaufen -" / H1 „Immobilien verkaufen und vermieten". Metas ungepflegt (AIOSEO-Auto-Text). Lokale Keywords: Köln, Bonn, Düsseldorf + Städteliste. Blog-Frequenz: 2025 monatlich, 2026 eingeschlafen. Schema: AIOSEO-Graph (Organization, BreadcrumbList); kein RealEstateAgent, kein FAQPage.

### 9.11 Technik
- WordPress 7.0, Elementor 4.3.5, AIOSEO 5.0.4, Site Kit; Tracking gtag/GTM; Trustindex, ProvenExpert, Calendly; Cookie-Banner nicht erkennbar (nicht prüfbar). Ladezeit grob: mittel (81 Bilder, Widgets).

### 9.12 Rechtliches
- Impressum: „Philipp Weiß Immobilien Max-Pechstein-Str. 37 50858 Köln Vertreten durch: Philipp Weiß … Die Gewerbeanmeldung nach Immobilien- und Darlehensvermittler § 34c GewO wurde durch den Landrat des Rhein-Sieg-Kreises, Deutschland erteilt. … Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren … teilzunehmen." USt-ID/Aufsichtsbehörde im Extrakt nicht sichtbar → nicht prüfbar.

### 9.13 Stärken / Schwächen / Übernahme für Rössler
**Stärken**
- Klare Nische (Rendite-/Anlageobjekte) als Einzelmakler; „Verkaufs-Zusicherung" als eigene Seite mit drei Kennzahlen und transparenter Provision inkl. Fälligkeit; Calendly-Terminbuchung im Menü; Tippgeber-Programm; Lokalkolorit.
**Schwächen**
- SEO-Hygiene schlecht (5 H1, Auto-Metas, keine Sitemap), Zahlen ohne Beleg, Blog eingeschlafen, Du/Sie/3.-Person-Mix, Tippfehler, Bewertungstool nicht sichtbar.
**Für Rössler übernehmen**
1. Eigene Seite „Mein Versprechen" mit 3 prüfbaren Zusagen (z. B. Rückmeldung binnen 24 h, Provision erst bei Kaufpreiseingang, Einzelbesichtigungen) – aber nur mit belegbaren Zahlen.
2. Provisionsangabe mit Fälligkeit im Klartext.
3. Terminbuchung als Menüpunkt.
4. Warnbeispiel: Keine ganzen Absätze als H2/H1; Metas pflegen; Zahlen belegen.

---

## 10. Querschnitt: Was die wirklich guten Einzelmakler-Seiten von Template-Seiten unterscheidet („Muster")

Grundlage: die 9 analysierten Seiten. „Gut" meint hier: die Seite erzeugt beim Eigentümer nachvollziehbar Vertrauen und beantwortet seine Fragen, nicht nur „sieht modern aus". Die klarsten Positivbeispiele sind Härter (3), AusBlick (8), Gramzow (2) und – für Direktankauf – PORTIMMO (5); die klarsten Template-Signale zeigen aēstates (1), Baumann (4), Immo Invest (6) und Weiß (9).

### 10.1 Textstil
| Merkmal | Gute Seiten (Belege) | Template-Seiten (Belege) |
|---|---|---|
| Satzlänge/Headlines | Kurz, mit Punkt getrennte Paare: „Ihr Verkauf. Unsere Verantwortung." (Härter), „Immobilie verkaufen Berlin. Gelöst." (Gramzow), „Ein Preis, der hält – kein Auftrag um jeden Preis." (AusBlick), „Wer Immobilien richtig einordnet, trifft bessere Entscheidungen." (Oerter) | Versalien-Schritte „EXKLUSIVE VERMARKTUNG" (PORTIMMO), „WIE WIR FÜR SIE DEN HÖCHSTPREIS ERZIELEN." (Immo Invest), ganze Absätze als H2 (Weiß), englischer Kicker „THE NEW ERA" (aēstates) |
| Versprechen | Prüfbar und begrenzt: „Ihre Verkäuferprovision zahlen Sie bei uns erst, wenn der Kaufpreis vollständig bei Ihnen eingegangen ist." (Härter); „Eine feste Verkaufsfrist lässt sich vorab nicht seriös zusagen." (Härter); „Wir sagen es offen: … ein Ankaufsangebot [liegt] in der Regel unter dem Preis …" (PORTIMMO) | Absolut und unbelegt: „Wir garantieren Ihnen vollkommene Verschwiegenheit", „extrem schnell", „absolut diskret" (Immo Invest); „Zu 95% erreichen wir den verabredeten Verkaufspreis" ohne Quelle (Weiß); „Gehen Sie mit einem Lächeln aus dem Notartermin" (PORTIMMO) |
| Perspektive | Konsistent: „Ich" für den Inhaber, „Wir" für das Büro (Härter, Gramzow, Baumann); Einwand aus Kundensicht formuliert („Wir wissen, was Sie über Makler denken." AusBlick) | Du/Sie-Mix (aēstates: „Lerne Susi kennen"; Weiß: „für dich"), dritte Person über sich selbst (Weiß) |
| Fragen als Struktur | „Was soll der Verkauf erreichen?", „Wer ist beteiligt und entscheidungsbefugt?" (Oerter); „Was Eigentümer vor dem Verkauf fragen." (Gramzow); FAQ mit lokalem Bezug („Kommen Kaufinteressenten aus Stuttgart nach Leonberg?" PORTIMMO) | FAQ als Button-Liste ohne Antworten im HTML (aēstates) |
| Ehrliche Gegenrede | „Nachteile wenn Sie uns als Immobilienmakler beauftragen" (Gramzow); „Eine Bewertung ist kein Gutachten – und das ist gut so" (AusBlick); „Sind Auszeichnungen … aussagekräftig? Nur bedingt." (Gramzow) | Nur Vorteile („Wenn Sie uns für sich arbeiten lassen: …") |

### 10.2 Bildkonzept
- **Gut:** Fotos vom echten Ort und von echten Objekten mit beschreibenden Alt-Texten („Blick über die Rotlintstraße im Frankfurter Nordend", „Marc Härter im hellen Anzug auf der Terrasse einer historischen Villa"; „Die Inhaberinnen von AusBlick Immobilien im Büro an der Königsallee"); Portraits mit Namen und Funktion (aēstates-Team, Gramzow, Baumann, PORTIMMO Erik Porthun); Bewegtbild nur dort, wo es Persönlichkeit zeigt (AusBlick-Reels, PORTIMMO-Hero-Video). Transparenz bei KI-Bildern (Oerter: Impressumshinweis).
- **Template:** Symbol-Stock („Holzhaus-Modell neben Münzstapeln" Baumann), Siegel-Collagen und Google-Sterne-Grafiken als Hauptbilder (Weiß: 81 Bilder, viele Avatare), Gold/Schwarz-„Privatbank"-Optik (Immo Invest), keine Person (Immo Invest).
- **Farbe/Typo:** Die eigenständigen Seiten setzen auf reduzierte oder warme Paletten (Härter: fast nur Schwarz/Weiß; Oerter: Petrol/Sand/Creme; AusBlick: Kupfer/Creme + Serif „Cormorant Garamond"); Template-Seiten auf Signal-Gold (Immo Invest) oder Standard-Blau/Orange.

### 10.3 Struktur
1. **Verteiler nach Objekttyp und nach Anlass** (AusBlick-Menü „Nach Immobilientyp / Nach Anlass / Gut zu wissen"; PORTIMMO-Spalte „Ihre Situation"; Gramzow-Kacheln „typische Ausgangslagen") statt nur „Verkaufen / Kaufen / Über uns".
2. **Ein klarer Prozess mit 4–6 Schritten**, jeder Schritt mit einem Satz, der eine Entscheidung oder eine Leistung benennt (Härter 6 Schritte; Baumann 5 Schritte in Ich-Form; Oerter 4 Schritte). Template-Seiten füllen Schritte mit Marketing („Jede Immobilie verdient eine Bühne").
3. **Bewertung als Stufenmodell**: anonymer Sofortwert → Online-Auswertung → Vor-Ort-Termin (PORTIMMO) bzw. bewusst nur Vor-Ort mit Erklärung, warum (Härter, AusBlick, Oerter). Entscheidend ist die Erklärung, nicht das Tool.
4. **Ratgeber-Artikel mit festem Kopf und Fuß**: „Das Wichtigste in Kürze" + Inhaltsverzeichnis + Autor/Prüfer/Stand/Lesezeit (AusBlick), Quellenabschnitt + Prüfdatum (Härter), interaktives Element + FAQ + Autorenbox (Gramzow).
5. **Ortsseiten mit Daten, nicht nur Adjektiven**: Zensus/Gutachterausschuss mit Quellenzeile (AusBlick Oberkassel), Marktspannen nach Baujahr + Methodik (Härter Westend/Immobilienpreise), Pendler-/Ortsteil-Argumente (PORTIMMO Leonberg). Template: Ortsliste als Footer-Linkwolke ohne Inhalt.
6. **Direktankauf als eigener Weg mit eigener Seite** (PORTIMMO), nicht als Nebensatz.

### 10.4 Beweise
| Beweisart | Beste Umsetzung | Schwächste Umsetzung |
|---|---|---|
| Google-Bewertungen | Zahl + Datum + Volltexte + Link: „5,0 aus 178 Bewertungen Stand Oktober 2026" (Härter); „5,0 ★ 93 Bewertungen" mit Namen (PORTIMMO); „4,9 · Basierend auf 67" (Oerter) | Sterne ohne Zahl (Immo Invest), Schema-Rating 4,99/92 ohne sichtbare Quelle (Baumann), 5,0 vs. 4,9 inkonsistent (Gramzow) |
| Referenzen | Kennzahlen pro Fall: „Dauer 34 Tage · 15 Anfragen · 5 Besichtigungen · Verkauft zum Angebotspreis" (Härter); „Verkauft für 640.000 € — 45.000 € über der Einschätzung des anderen Maklers" (Gramzow); Fallstudien 4-stufig (AusBlick); Objektdaten (Oerter) | Keine Referenzen (aēstates, Immo Invest, Weiß) |
| Qualifikation | DEKRA D2 + IHK + IVD (PORTIMMO); Immobilienkaufmann/Diplom-Immobilienwirt/Bewerter nach ImmoWertV (Härter); Immobilienökonom IREBS + LL.B. (Gramzow); IHK-zertifizierte Maklerin (AusBlick) | Keine Qualifikationsangabe (aēstates, Immo Invest) |
| Externe Siegel/Presse | BELLEVUE, Capital, F.A.Z.-Institut (Härter); DIE ZEIT/FAZ/Handelsblatt/Tagesspiegel (Gramzow) | „PLATZ 1 werkenntdenBESTEN.de" ohne Kontext (Immo Invest) |
| Zahlen zum Geschäft | „350+ Verkäufe · 50M+ Volumen · 7% über Marktwert" (PORTIMMO, auf Über-uns ausgeschrieben); „1.000+ Mandate" (Oerter) | Animierte „0+"-Zähler ohne Werte im HTML (Baumann, PORTIMMO-Startseite) |
| Prüfbare Zusagen | Provision erst bei Kaufpreiseingang (Härter, Weiß); Antwort binnen 24 h (aēstates, Oerter); Rückmeldung binnen eines Werktags (PORTIMMO) | „Wir garantieren …" ohne Inhalt (Immo Invest) |

### 10.5 Was „nicht generisch" konkret ausmacht (Kurzformel)
**Ein Thema, ein Gesicht, ein Beweis pro Sektion.** Gute Seiten wählen eine Nische (Altbau, Problemfälle, Rendite, Direktankauf, Stadtteil-Daten), zeigen die Person dahinter mit Qualifikation und Zitat, und legen in jeder Sektion einen konkreten Beleg vor (Zahl, Datum, Quelle, Rezension, Fallstudie). Template-Seiten stapeln Vorteile und Superlative, verstecken Zahlen in Widgets und lassen Antworten im JavaScript.

---

## 11. Vergleichstabelle

| Website | Stadt | Typ | Bewertungstool | Ratgeber-Anzahl | Ortsseiten | Bewertungen (auf Website sichtbar) | Besonderheit |
|---|---|---|---|---|---|---|---|
| aēstates – aestates.com | Hamburg | Boutique-Büro, 8 Pers., GmbH | Mehrstufiges Lead-Formular (Objektart → Zustand → Qualität), kein Sofortwert | 0 (nur 7 FAQ) | 0 | Instagram „5.100+ Follower"; Google-Widget (Zahl nicht im HTML) | Social-Video-Vermarktung, WhatsApp-First, Newsletter, 24-h-Antwort |
| David Gramzow – david-gramzow.de | Berlin | Einzelmakler-Persona, GmbH | 6-Schritt-Formular (vdp/Sprengnetter „aus Bankensicht"), kein Sofortwert; Renditerechner im Ratgeber | ≈55 Magazin-Artikel | 2 Landingpages + ≈7 Stadtteil-Artikel | Trustindex „25 Bewertungen", Meta „5,0 Google"/„4,9" | „Problemlöser", Zwei-Schlüssel-Prinzip (Finanzierungsprüfung), Referenzen mit €-Differenz, Schnellprüfung Berliner Testament, Presse |
| Marc Härter – marchaerter-immobilien.de | Frankfurt | Einzelunternehmen (Inhaber), Boutique | Kein Online-Tool; Vor-Ort nach ImmoWertV | ≈90 Ratgeber + 3 Quartals-Marktberichte | 8 (4 Stadtteile, 4 Taunus) + Preisseite | „5,0 · 178 Bewertungen Stand Oktober 2026", ~22 Volltexte | Kennzahlen-Referenzen (Dauer/Anfragen/Besichtigungen), BELLEVUE/Capital/F.A.Z., Provision erst bei Kaufpreiseingang, Quellen + Prüfdatum |
| Baumann Immobilien – baumann-immobilien.com | Frankfurt | Einzelmakler (Inhaber), Wix | Objektart-Auswahl → Lead-Formular | 0 | 0 (Referenzkarte) | Schema 4,99/92 (Quelle unsichtbar) | Ich-Form-Prozess, Vermieter-Paket, Lead-Qualifizierung im Formular, WhatsApp |
| PORTIMMO – portimmo.de | Stuttgart (+Leonberg, Ditzingen, Pforzheim …) | Inhabergeführte GmbH, Team | Sofort-Rechner ohne E-Mail + Sprengnetter-Online + DEKRA vor Ort | ≈90 Artikel in 7 Rubriken + 7 PDF-Ratgeber + Checklisten | ≈46 (6 Bezirke + ≈40 Orte) + Hausverkauf-/Bewertungs-Ortsseiten | „5,0 ★ 93 Bewertungen" mit Namen | **Direktankauf-Seite** mit ehrlicher Preis-Einordnung, Menü „Ihre Situation", Secret Sale, Calendly, DEKRA D2, IVD |
| Immo Invest – immoinvest-stuttgart.de | Stuttgart | Makler + Ankäufer, GmbH | Zwei Funnels (Verkaufsweg-Wahl; Ankauf mit Zustand + Foto-Upload) | 0 (Wissensteil auf Bewertungsseite) | 0 (23 Bezirke als Liste) | „5,0 Google" ohne Anzahl; 6 Initialen-Zitate | Zweiwege-Positionierung Höchstpreis vs. provisionsfreier Direktankauf „mit Eigenkapital", Bieterverfahren, keine Person |
| Oerter Immobilien – oerter-immobilien.de | Nürnberg | e.K., Inhaber + kleines Team | Kein Tool; „Digitale Werteinschätzung / Einwertung auf gutachterlicher Grundlage / Preisstrategie" | 0 Artikel (Leistungsseiten mit Erklärtiefe, Infoabend) | 0 | „4,9 · 67 Bewertungen" | „Besondere Situationen"-Seite inkl. Betreuung, Vier-Preise-Modell, Infoabend mit Notar, Kontaktart-Wahl, KI-Bild-Transparenz |
| AusBlick Immobilien – ausblick-immobilien.com | Düsseldorf | eGbR, 2 Inhaberinnen | 3-Schritt-Anfrage (Objekt → Eckdaten → persönliche Einschätzung), bewusst kein Sofortwert | 44 Ratgeber in 7 Rubriken | 32 Stadtteilseiten mit Zensus-/Gutachterausschuss-Daten | „5,0 auf Google" (Anzahl nicht genannt) | Fallstudien 4-stufig, Stadtteil-Datenblock mit Quellen, „Nach Anlass"-Menü, Klartext-Einwand, Reels |
| Philipp Weiß – philipp-weiss-immobilien.de | Köln | Einzelmakler | Iframe/JS (nicht prüfbar) | ≈12–15 Artikel (2025), 1 in 2026 | 0 (2 Bezirks-Porträts im Ratgeber) | Trustindex „14 Bewertungen" | „Verkaufs-Zusicherung" (95 % / 3 Monate / 97 %), Rendite-Fokus, Provision mit Fälligkeit, Calendly, Tippgeber |

### 11.1 Hero-Headlines im Vergleich (wörtlich)
| Website | H1 | Erster CTA |
|---|---|---|
| aēstates | „Immobilien sorglos verkaufen - Persönlich. Digital. Erfolgsorientiert." | „Immobilie bewerten" |
| Gramzow | „Immobilien­probleme lösen." | „Problem schildern" |
| Härter | „Immobilienmakler Frankfurt" (+ „Eine Adresse wie Ihre verkauft man nicht nebenbei.") | „Über Ihren Verkauf sprechen" |
| Baumann | „Verkauf und Vermietung von Wohnimmobilien" | „Immobilie bewerten lassen" |
| PORTIMMO | „Ihr Immobilienmakler in Stuttgart für den sicheren Immobilienverkauf" | „Bewertung starten" |
| Immo Invest | „Immo­bilien­makler in Stuttgart. Sicher verkaufen." | Funnel „Schritt 1: Immobilienart auswählen" |
| Oerter | „Wer Immobilien richtig einordnet, trifft bessere Entscheidungen." | „Gespräch vereinbaren" |
| AusBlick | „Ihr Immobilien­makler in Düsseldorf und Umgebung." | „Was ist Ihre Immobilie wert? →" |
| Weiß | „Ihr Experte für Rendite- & Wohnimmobilien" | „Jetzt Kontakt aufnehmen!" |
| **Rössler (Ist)** | „Ihre Wohnung verkaufen. Mit einem klaren Plan." | (One-Pager; CTA nicht Teil dieser Analyse) |

Beobachtung: Die SEO-orientierten Seiten setzen das Keyword in die H1 (Härter, PORTIMMO, Immo Invest, AusBlick); die persönlichkeitsorientierten Seiten setzen eine Haltung in die H1 (Gramzow, Oerter, Rössler) und das Keyword in Title/Meta. Beides funktioniert; wichtig ist, dass Title und Meta dann das Keyword tragen (bei Rössler: Title „Rössler Immobilien — Linus Rössler" trägt kein Keyword → Verbesserungspotenzial).

### 11.2 Behandlung der drei Schlüsselthemen (Erbe / Scheidung / vermietete Wohnung)
| Website | Erbe | Scheidung | Vermietete Wohnung |
|---|---|---|---|
| aēstates | – | – | – |
| Gramzow | Kachel + Magazin „Berliner Testament" (≈3.100 Wörter, Schnellprüfung) + Fallmuster Erbengemeinschaft | Kachel + Magazin-Artikel (nicht abrufbar) + Fallmuster Trennung | Kachel + Magazin (≈1.750 Wörter, Renditerechner, Checkliste, FAQ) + FAQ auf Wohnung-Seite |
| Härter | 2 Ratgeber (≈5.400 + ≈4.600 Wörter, Freibetrags-Tabelle, Rechenbeispiel, §§) | Ratgeber ≈4.250 Wörter (4 Optionen, 5 Schritte, 5 Fehler, BFH-Zitat, Frankfurter Scheidungsstatistik) | Ratgeber ≈5.660 Wörter (Beispielrechnung Rendite, § 577a, Quellen/AG-Urteil) + FAQ auf Verkaufen-Seite |
| Baumann | – | – | – |
| PORTIMMO | Menüpunkt + Lead-Seite (≈1.100 Wörter, PDF 8 Seiten, Unterlagenliste für Erben) + 5 Artikel in Rubrik „Lebenssituationen" | Menüpunkt + Seite (≈1.470 Wörter, PDF-Verweis) | Menüpunkt + Seite (≈1.600 Wörter, PDF 7 Seiten, FAQ-Schema) |
| Immo Invest | Kachel (2 Sätze, Ankauf-Logik) | Kachel (1 Satz) | – |
| Oerter | Kachel + Seite „Besondere Situationen" (Erbengemeinschaft: 1 Absatz, keine Fristen/§§) | Kachel + Absatz | – |
| AusBlick | 6 Ratgeber (Hauptartikel ≈3.670 Wörter mit Kurzfassung, FAQ, Autorin) | 4 Ratgeber (Hauptartikel ≈3.760 Wörter) | Ratgeber ≈3.680 Wörter (6 Schritte, 4 Sonderfälle, Anlegermarkt) + Fallstudie |
| Weiß | Ratgeber „Immobilienbewertung bei einer Erbschaft" (4 Min) | Ratgeber „Immobilienbewertung bei einer Scheidung" (4 Min) | – (Rendite-Fokus allgemein) |

Für Rössler (Eigentumswohnungen, Direktankauf) sind die relevantesten Vorlagen: vermietete Wohnung → Gramzow (Rechner/Checkliste) + Härter (Rechtsdetails) + AusBlick (Sonderfälle „Wohnung geerbt, Mieter bleibt", „Mieter verweigert Besichtigungen"); Erbe → Härter (Reihenfolge/Fristen) + Gramzow (Schnellprüfung) + PORTIMMO (Unterlagenliste für Erben, Direktankauf-Verknüpfung); Scheidung → Härter (4 Optionen, Spekulationssteuer-Falle) + AusBlick (Kurzfassung).

### 11.3 Kontaktwege im Vergleich
| Website | Telefon im Header | WhatsApp | Terminbuchung | Rückruf-Option | Antwortzusage | Wochenend-Zeiten |
|---|---|---|---|---|---|---|
| aēstates | ja | ja (mehrfach) | Calendly-Skript | – | „innerhalb 24 Stunden per E-Mail" | „Sa. - So.: 10:00 - 16:00 Uhr" |
| Gramzow | Mobilnummer im Hero-Bereich | Link | – | Wunschzeit im Formular | – | – |
| Härter | ja | – | – | – | „meldet sich persönlich und zeitnah" | „Sa 08:00–18:00 Uhr" |
| Baumann | ja (+ Mobil) | ja | – | – | „zeitnah" | Samstag 09–18 |
| PORTIMMO | ja (+ Zeiten) | – | Calendly | Kontakt-FAQ | „innerhalb eines Werktags" / „am selben Werktag" | „Sa. + So. nach Vereinbarung" |
| Immo Invest | ja | Link | – | „Rückruf anfordern", Rückrufzeit im Funnel | – | – |
| Oerter | ja | Link | Option „Termin buchen" im Formular | Option „Telefonrückruf" | „Antwort innerhalb von 24 Stunden" | „Samstag [nach Vereinbarung]" |
| AusBlick | ja (+ E-Mail) | ja (wa.me) | – | Toggle „Anrufen" | „persönlich und schnell" | nicht prüfbar |
| Weiß | Mobil in Topbar | – | Calendly (Menüpunkt) | „Wir rufen Sie zurück" | – | – |

### 11.4 Technik & Recht im Vergleich
| Website | CMS/Builder | Cookie-/Consent | Tracking | Schema.org (Kern) | § 34c im Impressum | Aufsichtsbehörde |
|---|---|---|---|---|---|---|
| aēstates | Divi-basiert (nicht eindeutig) | nicht erkennbar | gtag, GTM, FB-Pixel | WebSite (ohne Name) | ja | ja (Fachamt Verbraucherschutz Hamburg-Nord) |
| Gramzow | WordPress 7.1.3 + Divi + Yoast | Eigenbau-Banner | gtag, GTM, FB-Pixel | Yoast-Graph + FAQPage | **nein** | **nein** |
| Härter | Divi-Klassen, Generator entfernt | Eigenlösung „Ihre Wahl." | GA/Ads nach Consent | RealEstateAgent, Service, FAQPage, BlogPosting | ja (Nr. 1) | Erlaubnisbehörde Vogelsbergkreis; Aufsicht genannt (Text nicht extrahiert) |
| Baumann | Wix | „Cookie-Einstellungen" | GTM | RealEstateAgent, AggregateRating | ja | ja (Ordnungsamt Frankfurt) |
| PORTIMMO | WordPress (Elementor), Sprengnetter | Banner (Anbieter unklar) | gtag, GTM, Calendly | Organization/RealEstateAgent, FAQPage, Article | ja | ja (IHK Region Stuttgart) |
| Immo Invest | WordPress 7.1 + Elementor + WP Rocket | nicht erkennbar | keines erkennbar | RealEstateAgent, LocalBusiness, Service, Offer, Review, FAQPage | ja (Nr. 1) | ja (IHK Region Stuttgart) |
| Oerter | WordPress 7.1.4 + Elementor + Yoast | Complianz | gtag, GTM | Yoast-Graph, FAQPage (Bewerten) | ja (erteilt 30.05.22) | IHK München und Oberbayern (erteilende Stelle) |
| AusBlick | eigenes Setup (Template-Literale) | Consent Mode (GCM) | gtag, GTM | RealEstateAgent (founder), Article, FAQPage, Service | nicht gefunden | ja (Ordnungsamt Düsseldorf) |
| Weiß | WordPress 7.0 + Elementor + AIOSEO | nicht erkennbar | gtag, GTM, Trustindex, ProvenExpert, Calendly | Organization, Breadcrumb | ja (Landrat Rhein-Sieg-Kreis) | nicht gefunden |

---

## 12. Konkreter Fahrplan für roessler-immo.de (abgeleitet, priorisiert)

Ausgangslage (Quelltext roessler-immo.de, 29.10.2026): Title „Rössler Immobilien — Linus Rössler"; Meta „Rössler Immobilien, Linus Rössler — Verkauf von Eigentumswohnungen in Heimsheim, Leonberg, Ditzingen, Renningen und Pforzheim."; H1 „Ihre Wohnung verkaufen. Mit einem klaren Plan."; H2 „Was wir vor dem Verkauf klären" (H3 „Welcher Preis ist realistisch?", „Welche Käufer passen zur Wohnung?", „Lohnt sich eine Vorbereitung?"); H2 „Vermittlung und Direktankauf" (H3 „Ich verkaufe für Sie"). Die Haltung („klarer Plan", Ich-Form, Fragen als Struktur) entspricht bereits dem Stil der besten Seiten (Oerter, Härter). Es fehlen Unterseiten, Beweise und Ortsbezug.

### 12.1 Seitenarchitektur (Phase 1, 8–10 Seiten)
1. **Start** – H1 beibehalten; Title ändern in Muster „Wohnung verkaufen in Leonberg, Heimsheim & Pforzheim | Rössler Immobilien" (Vorbild PORTIMMO/AusBlick-Titles); Trust-Leiste unter dem Hero (Vorbild Härter: Google-Zahl + Qualifikation + ein Versprechen).
2. **Wohnung verkaufen** – 5–6 Schritte in Ich-Form (Vorbild Baumann/Härter), Sektion „Typische Ausgangslagen" mit 6 Kacheln (Vorbild Gramzow: Erbe, Trennung, vermietet, WEG/Sonderumlage, laufender Kredit, Umzug/Alter), WEG-Unterlagenliste (Vorbild PORTIMMO), FAQ mit FAQPage-Schema.
3. **Direktankauf** – Struktur 1:1 von PORTIMMO (Wann sinnvoll → 4 Schritte → ehrliche Preis-Einordnung → Kurzformular mit Objektdaten/Zustand/Foto-Upload (Immo Invest) → „Auf einen Blick" → FAQ); Verkaufsweg-Wahl „Direktankauf / Vermittlung / Noch unsicher" (Immo Invest).
4. **Wohnung bewerten** – Vier-Preise-Modell (Oerter: Wunschpreis/Marktwert/Angebotspreis/Verkaufspreis), Erklärung „Bewertung ist kein Gutachten" (AusBlick), Stufen: Online-Anfrage → Vor-Ort (PORTIMMO).
5. **Über mich** – Portrait am echten Ort, Qualifikationen, Zitat, Arbeitsweise in 3 Grundsätzen (AusBlick „Drei Grundsätze. Keine Ausnahmen."), ehrliche „Was ich nicht mache"-Sektion (Gramzow „Nachteile").
6. **Mein Versprechen** – 3 prüfbare Zusagen (Weiß-Format, aber belegbar): Antwort binnen 24 h, Provision erst bei Kaufpreiseingang (Härter), Einzelbesichtigungen mit geprüfter Finanzierung (Gramzow/PORTIMMO).
7. **Referenzen** – ab dem ersten Abschluss: Format „Situation / Problem / Lösung / Ergebnis" (Gramzow) oder „Dauer · Anfragen · Besichtigungen · Ergebnis" (Härter).
8. **Kontakt** – Formular mit „Sind Sie Eigentümer?", „Wie aufmerksam geworden?" (Baumann), „Bevorzugte Kontaktart" (Oerter), WhatsApp + Telefon + Kontakt-FAQ mit Reaktionszeiten (PORTIMMO).
9. **Impressum** vollständig: Inhaber, Adresse, USt-ID, „Erlaubnis nach § 34c Abs. 1 Satz 1 Nr. 1 GewO erteilt durch …", zuständige Aufsichtsbehörde (für Heimsheim: Landratsamt Enzkreis bzw. IHK Nordschwarzwald – auf der Seite prüfen; Vorbild Härter/PORTIMMO/Immo Invest).

### 12.2 Ortsseiten (Phase 2, 5 Seiten: Heimsheim, Leonberg, Ditzingen, Renningen, Pforzheim)
Schablone (Kombination PORTIMMO-Leonberg + AusBlick-Oberkassel):
- H1 „Wohnung verkaufen in <Ort>" (+ Zusatz mit lokalem Argument, PORTIMMO: „die Nachfrage kommt von außen").
- Intro mit Verkehrs-/Pendlerargument und Ortsteilen (Leonberg: Eltingen, Höfingen, Gebersheim, Warmbronn – PORTIMMO; für Heimsheim/Renningen/Ditzingen eigene Ortsteile recherchieren).
- Datenblock „<Ort> in Zahlen & Fakten": Einwohner, Eigentümerquote, Ø Wohnfläche, Ø Bestandsmiete (Zensus 2022), Kaufpreise ETW nach Baujahrsklasse (Gutachterausschuss Leonberg / Böblingen / Pforzheim-Enzkreis), Zahl der Wohnungsverkäufe – mit Quellenzeile und Datenlizenz (AusBlick).
- „Was eine Wohnung in <Ort> wert macht": Stadtbezirk/Ortsteil, Eigentümergemeinschaft, Energie/Zustand, frei oder vermietet (PORTIMMO Wohnung-Seite).
- FAQ mit 4 lokalen Fragen (PORTIMMO: „Kommen Kaufinteressenten aus Stuttgart nach Leonberg?") + FAQPage-Schema.
- Referenz/Fallstudie aus dem Ort, sobald vorhanden; CTA Bewertung + Direktankauf.

### 12.3 Ratgeber (Phase 2–3, zuerst 6 Artikel)
Reihenfolge nach Relevanz für ETW + Direktankauf: (1) Vermietete Wohnung verkaufen (Ertragswert/Vervielfältiger-Rechner wie Gramzow; Sonderfälle wie AusBlick); (2) Wohnung geerbt (Reihenfolge/Fristen/Unterlagen wie Härter + PORTIMMO; Schnellprüfung wie Gramzow); (3) Wohnung bei Scheidung (4 Optionen/Spekulationssteuer wie Härter); (4) WEG-Unterlagen & Sonderumlage (Härter „Sonderumlage Eigentumswohnung", PORTIMMO-Liste); (5) Direktankauf oder Vermittlung? (PORTIMMO-Abwägung); (6) Wohnung verkaufen trotz laufendem Kredit (Härter/Gramzow).
Artikel-Schablone: „Das Wichtigste in Kürze" → Inhaltsverzeichnis → H2-Fragen → Rechenbeispiel/Tabelle → FAQ (FAQPage) → Autorenbox „Linus Rössler · Stand · zuletzt geprüft" → Quellen (Gesetze, Gutachterausschuss) → CTA passend zum Thema (Bewertung oder Direktankauf).

### 12.4 Beweise aufbauen (parallel)
- Google-Profil mit Datum zitieren („5,0 aus N Bewertungen, Stand Monat Jahr"), Rezensionen im Volltext mit Namen (Härter).
- Jede Transaktion als Referenzkarte mit Kennzahlen dokumentieren.
- Qualifikationen/Mitgliedschaften (IHK-Zertifikat, IVD, Sachverständigen-Ausbildung) sichtbar machen – das ist der stärkste Hebel der Stuttgarter Konkurrenz (PORTIMMO: DEKRA D2).
- Keine Zähler ohne Werte, keine Durchschnittsdauer ohne Grundlage, keine Siegel ohne Kontext.

### 12.5 Nicht übernehmen
- Versalien-Headlines und Superlative (Immo Invest, PORTIMMO-Schritte), englische Kicker (aēstates), Du/Sie-Mix (aēstates, Weiß), automatisierte Teaser (AusBlick-Übersicht), ganze Absätze als Überschriften (Weiß), Finanzierungs-Nebenpfade (Gramzow), Platzhalter online (Oerter), Ortsseiten außerhalb des eigenen Gebiets (PORTIMMO-Aachen).

---

## 13. Quellen und Belegdateien

Alle Zitate stammen aus den am 29.10.2026 heruntergeladenen HTML-Seiten. Rohdateien (`*.raw.html`) und extrahierte Textfassungen (`*.txt` mit Title/Meta/Tech/Headings/Volltext) liegen unter `/tmp/claude-0/-home-user/e7214d44-0169-5a35-af11-cf04a7507b2a/scratchpad/dl-staedte/<kürzel>/`; Sitemap-URL-Listen in `<kürzel>/sitemap_urls.txt`.

### 13.1 Abgerufene Seiten (Kürzel → URL)
| Kürzel/Datei | URL | Title (Auszug) | Wörter (ca.) |
|---|---|---|---|
| roessler/start.txt | https://roessler-immo.de/ | Rössler Immobilien — Linus Rössler | 2527 |
| aestates/start.txt | https://aestates.com/ | aestates GmbH / Digitale Immobilienvermittlung in Hamburg für Käufer | 1108 |
| gramzow/start.txt | https://www.david-gramzow.de/ | Ihr lokaler Experte für den Immobilienverkauf in Berlin. | 1105 |
| haerter/start.txt | https://marchaerter-immobilien.de/ | Marc Härter Immobilien: Immobilienmakler Frankfurt | 3918 |
| baumann/start.txt | https://www.baumann-immobilien.com/ | Ihr Immobilienmakler in Frankfurt am Main / Baumann Immobilien | 2579 |
| portimmo/start.txt | https://www.portimmo.de/ | Immobilienmakler Stuttgart / PORTIMMO, DEKRA-Bewertung | 4082 |
| immoinvest/start.txt | https://immoinvest-stuttgart.de/ | Immo Invest GmbH / Immobilienmakler Stuttgart | 3457 |
| oerter/start.txt | https://oerter-immobilien.de/ | Oerter Immobilien / Immobilienmakler Nürnberg | 1456 |
| ausblick/start.txt | https://ausblick-immobilien.com/ | Immobilienmakler Düsseldorf - AusBlick Immobilien | 2936 |
| pweiss/start.txt | https://www.philipp-weiss-immobilien.de/ | Ihr Immobilienmakler für Mehrfamilienhäuser und Wohnimmobilien in K | 1504 |
| aestates/verkaufen.txt | https://aestates.com/verkaufen | Immobilie verkaufen / aestates GmbH – Effizienter Immobilienverkauf  | 662 |
| aestates/bewertung.txt | https://aestates.com/immobilien-bewertung | Immobilienbewertung / aestates GmbH – Präzise Wertermittlung für m | 305 |
| aestates/ueberuns.txt | https://aestates.com/uber-uns | Über uns / aestates GmbH – Ihr Immobilienexperten-Team in Hamburg | 460 |
| aestates/kontakt.txt | https://aestates.com/kontakt | Kontakt / aestates GmbH – Ihr Immobilienmakler in Hamburg | 256 |
| aestates/impressum.txt | https://aestates.com/impressum | Impressum / aestates GmbH – Immobilienmakler Hamburg | 381 |
| aestates/immobilien.txt | https://aestates.com/immobilien | Immobilien / aestates GmbH – Passgenaue Objekte und Baugrundstücke | 110 |
| gramzow/verkaufen.txt | https://www.david-gramzow.de/immobilie-verkaufen-berlin/ | Immobilie verkaufen Berlin 2026 – Haus, Wohnung, Zinshaus | 2180 |
| gramzow/wohnungverkaufen.txt | https://www.david-gramzow.de/wohnung-verkaufen-berlin/ | Ihr Problemlöser für den Wohnungsverkauf in Berlin | 2227 |
| gramzow/bewertung.txt | https://www.david-gramzow.de/immobilienbewertung-berlin/ | Immobilienbewertung von Banken-Experten in Berlin | 3039 |
| gramzow/news.txt | https://www.david-gramzow.de/immobilien-news/ | Immobilien News / MAGAZINE von David Gramzow | 1948 |
| gramzow/vermietet.txt | https://www.david-gramzow.de/immobilien-news/vermietete-wohnung-verkaufen-berlin/ | Vermietete Wohnung verkaufen in Berlin: Rendite-Experten-Tipps | 2022 |
| gramzow/scheidung.txt | https://www.david-gramzow.de/immobilien-news/immobilie-verkaufen-bei-scheidung-in-berlin/ | nicht abrufbar | 0 |
| gramzow/testament.txt | https://www.david-gramzow.de/immobilien-news/haus-verkaufen-trotz-berliner-testament/ | Haus verkaufen trotz Berliner Testament: Was möglich ist &amp; nicht | 3094 |
| gramzow/ansprechpartner.txt | https://www.david-gramzow.de/ansprechpartner/ | nicht abrufbar | 0 |
| gramzow/makler.txt | https://www.david-gramzow.de/immobilienmakler-berlin/ | Bester Immobilienmakler Berlin – bekannt aus DIE ZEIT, FAZ, BILD | 2322 |
| gramzow/mitte.txt | https://www.david-gramzow.de/wohnung-verkaufen-berlin-mitte/ | nicht abrufbar | 0 |
| gramzow/prenzlberg.txt | https://www.david-gramzow.de/eigentumswohnung-verkaufen-berlin-prenzlauer-berg/ | Eigentumswohnung verkaufen in Berlin-Prenzlauer Berg 2026 | 4151 |
| gramzow/kapitalanlage.txt | https://www.david-gramzow.de/kapitalanlage-berlin/ | Kapitalanlage in Berlin / kaufen / verkaufen / finanzieren | 2254 |
| gramzow/impressum.txt | https://www.david-gramzow.de/impressum/ | Impressum: David Gramzow Immobilienvermittlung Baufinanzierung | 228 |
| haerter/verkaufen.txt | https://marchaerter-immobilien.de/immobilie-verkaufen-frankfurt/ | Immobilie verkaufen Frankfurt / Marc Härter Immobilien | 4205 |
| haerter/wohnungverkaufen.txt | https://marchaerter-immobilien.de/wohnung-verkaufen-frankfurt/ | Wohnung in Frankfurt verkaufen: Ablauf, WEG &amp; Kosten | 3902 |
| haerter/bewertung.txt | https://marchaerter-immobilien.de/immobilienbewertung-frankfurt/ | Immobilienbewertung Frankfurt / Marc Härter Immobilien | 1268 |
| haerter/ratgeber.txt | https://marchaerter-immobilien.de/immobilien-ratgeber/ | Immobilienratgeber: Altbau, Bewertung &amp; Verkauf in Frankfurt | 4398 |
| haerter/erben.txt | https://marchaerter-immobilien.de/immobilie-erben-was-ist-zu-tun/ | Immobilie geerbt – was tun? Fristen, Grundbuch &amp; Verkauf | 5410 |
| haerter/erbengemeinschaft.txt | https://marchaerter-immobilien.de/erbengemeinschaft-uneinig-streit-immobilie/ | Erbengemeinschaft: Haus verkaufen, wenn einer nicht will | 4588 |
| haerter/scheidung.txt | https://marchaerter-immobilien.de/scheidung-immobilie-verkaufen-frankfurt/ | Immobilie bei Scheidung verkaufen: Ablauf &amp; Entscheidungen | 4248 |
| haerter/vermietet.txt | https://marchaerter-immobilien.de/vermietete-wohnung-verkaufen-2026/ | Vermietete Wohnung verkaufen: Preis, Mieterrechte &amp; Ablauf | 5660 |
| haerter/unternehmen.txt | https://marchaerter-immobilien.de/unternehmen/ | Boutique-Makler Frankfurt / Marc Härter Immobilien | 3277 |
| haerter/nordend.txt | https://marchaerter-immobilien.de/immobilienmakler-nordend-frankfurt/ | Immobilienmakler Nordend Frankfurt / Marc Härter Immobilien | 3606 |
| haerter/westend.txt | https://marchaerter-immobilien.de/immobilienmakler-frankfurt-westend/ | Immobilienmakler Westend Frankfurt / Marc Härter Immobilien | 1512 |
| haerter/kontakt.txt | https://marchaerter-immobilien.de/kontakt/ | Kontakt Frankfurt / Marc Härter Immobilien | 491 |
| haerter/impressum.txt | https://marchaerter-immobilien.de/impressum/ | Impressum / Marc Härter Immobilien Frankfurt | 756 |
| haerter/preise.txt | https://marchaerter-immobilien.de/immobilienpreise-frankfurt/ | Immobilienpreise Frankfurt 2026: Stadtteile &amp; Entwicklung | 2806 |
| baumann/referenzen.txt | https://www.baumann-immobilien.com/referenzen/ | Referenzen: vermittelte Immobilien in Frankfurt und Umgebung / Baumann | 374 |
| baumann/kontakt.txt | https://www.baumann-immobilien.com/kontakt/ | Kontakt zu Baumann Immobilien in Frankfurt am Main / Baumann Immobilie | 505 |
| baumann/impressum.txt | https://www.baumann-immobilien.com/impressum/ | Impressum / Baumann Immobilien | 353 |
| baumann/angebote.txt | https://www.baumann-immobilien.com/immobilienangebote/ | Immobilien: Archiv / Baumann Immobilien | 854 |
| portimmo/verkaufen.txt | https://www.portimmo.de/verkaufen/ | Wir bringen die Sicherheit beim Verkaufsprozess Ihres Hauses | 1888 |
| portimmo/wohnungverkaufen.txt | https://www.portimmo.de/wohnung-verkaufen-stuttgart/ | Wohnung verkaufen in Stuttgart: sicher zum besten Preis | 1493 |
| portimmo/direktankauf.txt | https://www.portimmo.de/direktankauf/ | Immobilie direkt verkaufen: Direktankauf durch PORTIMMO | 1742 |
| portimmo/bewertung.txt | https://www.portimmo.de/immobilienbewertung-in-stuttgart/ | Immobilienbewertung Stuttgart / DEKRA-Sachverständiger | 2885 |
| portimmo/wertrechner.txt | https://www.portimmo.de/immobilienwert-rechner/ | Immobilienwert-Rechner: Sofort-Ergebnis ohne Anmeldung | 1330 |
| portimmo/ratgeber.txt | https://www.portimmo.de/ratgeber/ | Ratgeber - PORTIMMO GmbH | 1626 |
| portimmo/lebenssituationen.txt | https://www.portimmo.de/ratgeber/lebenssituationen/ | Ratgeber Erbe, Scheidung, Pflege und Alter / PORTIMMO | 1373 |
| portimmo/geerbt.txt | https://www.portimmo.de/immobilie-geerbt/ | Immobilie Geerbt - Welche Gesetze und Fristen gibt es? | 1138 |
| portimmo/scheidung.txt | https://www.portimmo.de/immobilie-im-scheidungsfall/ | Immobilie im Scheidungsfall - PORTIMMO GmbH | 1468 |
| portimmo/vermietet.txt | https://www.portimmo.de/vermietete-wohnung-verkaufen/ | Vermietete Wohnung verkaufen: Preis, Mieterrechte, Steuern | 1617 |
| portimmo/ueberuns.txt | https://www.portimmo.de/uber-uns/ | Die Portimmo GmbH - Ihr Immobilienmakler | 1312 |
| portimmo/leonberg.txt | https://www.portimmo.de/immobilienmakler-in-leonberg/ | Immobilienmakler Leonberg - Immobilie sicher verkaufen | 1623 |
| portimmo/ditzingen.txt | https://www.portimmo.de/immobilienmakler-in-ditzingen/ | Immobilienmakler Ditzingen - Verkauf im Strohgäu | 1616 |
| portimmo/pforzheim.txt | https://www.portimmo.de/immobilienmakler-in-pforzheim/ | Immobilienmakler Pforzheim - überregional vermarktet | 1668 |
| portimmo/stuttgartwest.txt | https://www.portimmo.de/immobilienmakler-stuttgart/west/ | Immobilienmakler Stuttgart-West / PORTIMMO | 1340 |
| portimmo/kundenbewertungen.txt | https://www.portimmo.de/kundenbewertungen/ | Kundenbewertungen der PORTIMMO GmbH | 1579 |
| portimmo/kontakt.txt | https://www.portimmo.de/kontakt/ | Kontakt zur PORTIMMO GmbH in Stuttgart-Mitte | 1098 |
| portimmo/impressum.txt | https://www.portimmo.de/impressum/ | Impressum der Portimmo GmbH | 1608 |
| portimmo/leistungen.txt | https://www.portimmo.de/leistungen/ | Unsere Dienstleistungen für Sie im Immobiliensektor | 1142 |
| immoinvest/bewertung.txt | https://immoinvest-stuttgart.de/immobilienbewertung-stuttgart/ | Kostenlose Immobilienbewertung Stuttgart / Seit 1989 | 3412 |
| immoinvest/kontakt.txt | https://immoinvest-stuttgart.de/kontakt/ | Schneller Kontakt / Immo Invest GmbH / Immobilienmakler 1989 | 1297 |
| immoinvest/impressum.txt | https://immoinvest-stuttgart.de/impressum/ | Wichtiges Impressum der Immo Invest GmbH 2026 | 1801 |
| immoinvest/immobilien.txt | https://immoinvest-stuttgart.de/immobilien/ | Immobilien - Immobilienmakler Stuttgart / Sicher Immobilien verkaufen | 298 |
| oerter/verkaufen.txt | https://oerter-immobilien.de/immobilie-verkaufen/ | Immobilie verkaufen / Metropolregion Nürnberg | 1374 |
| oerter/bewerten.txt | https://oerter-immobilien.de/immobilie-bewerten/ | Immobilienbewertung Nürnberg / Oerter Immobilien | 1854 |
| oerter/situationen.txt | https://oerter-immobilien.de/besondere-situationen/ | Immobilienentscheidungen in besonderen Situationen | 1441 |
| oerter/ansatz.txt | https://oerter-immobilien.de/ansatz-arbeitsweise/ | Immobilienberatung in der Metropolregion Nürnberg | 1833 |
| oerter/anlage.txt | https://oerter-immobilien.de/anlageobjekte/ | Anlageobjekte &amp; Projektvertrieb / Metropolregion Nürnberg | 1408 |
| oerter/kontakt.txt | https://oerter-immobilien.de/kontakt/ | Kontakt / Oerter Immobilien Nürnberg | 1267 |
| oerter/events.txt | https://oerter-immobilien.de/events/ | Veranstaltungen rund um Immobilien / Oerter Immobilien | 809 |
| oerter/impressum.txt | https://oerter-immobilien.de/impressum/ | Impressum / Oerter Immobilien | 585 |
| oerter/verkaufen2.txt | https://oerter-immobilien.de/immobilie-verkaufen-22-oktober-2026/ | Immobilie verkaufen? Informationsabend in Nürnberg / Oerter Immobilie | 960 |
| ausblick/verkauf.txt | https://ausblick-immobilien.com/verkauf/ | Immobilie verkaufen in Düsseldorf – Ablauf &amp; Marktwert | 2668 |
| ausblick/bewertung.txt | https://ausblick-immobilien.com/bewertung/ | Immobilienbewertung Düsseldorf / AusBlick Immobilien | 2161 |
| ausblick/ratgeber.txt | https://ausblick-immobilien.com/ratgeber/ | Ratgeber / AusBlick Immobilien | 1715 |
| ausblick/wohnungverkaufen.txt | https://ausblick-immobilien.com/ratgeber/wohnung-verkaufen/ | Wohnung verkaufen in Düsseldorf: der Leitfaden / AusBlick Immobilien | 2776 |
| ausblick/geerbt.txt | https://ausblick-immobilien.com/ratgeber/geerbte-immobilie/ | Geerbte Immobilie in Düsseldorf – Ratgeber &amp; Antworten / AusBli | 3670 |
| ausblick/scheidung.txt | https://ausblick-immobilien.com/ratgeber/immobilie-scheidung/ | Immobilie bei Scheidung verkaufen in Düsseldorf / AusBlick Immobilien | 3760 |
| ausblick/vermietet.txt | https://ausblick-immobilien.com/ratgeber/vermietete-wohnung-verkaufen/ | Vermietete Wohnung verkaufen in Düsseldorf – Ratgeber / AusBlick Im | 3676 |
| ausblick/ueberuns.txt | https://ausblick-immobilien.com/ueber-uns/ | Über uns / Immobilienmakler Düsseldorf / AusBlick Immobilien | 1977 |
| ausblick/referenzen.txt | https://ausblick-immobilien.com/referenzen/ | Referenzen &amp; Bewertungen / AusBlick Immobilien Düsseldorf | 1685 |
| ausblick/stadtteile.txt | https://ausblick-immobilien.com/ratgeber/stadtteile/ | Stadtteile Düsseldorf verkaufen – Ratgeber &amp; Marktinfos / AusBl | 2928 |
| ausblick/oberkassel.txt | https://ausblick-immobilien.com/standort/immobilienmakler-duesseldorf-oberkassel/ | Immobilienmakler Oberkassel - AusBlick Immobilien direkt vor Ort | 2547 |
| ausblick/impressum.txt | https://ausblick-immobilien.com/impressum/ | Impressum / AusBlick Immobilien | 614 |
| ausblick/kontakt.txt | https://ausblick-immobilien.com/kontakt/ | Seite nicht gefunden (404) / AusBlick Immobilien | 69 |
| pweiss/verkaufen.txt | https://www.philipp-weiss-immobilien.de/wohnung-haus-und-mehrfamilienhaus-verkaufen/ | Wohnung, Haus und Mehrfamilienhaus verkaufen - | 1571 |
| pweiss/bewertung.txt | https://www.philipp-weiss-immobilien.de/immobilienbewertung/ | Immobilienbewertung - | 25 |
| pweiss/ratgeber.txt | https://www.philipp-weiss-immobilien.de/immobilien-ratgeber/ | Immobilien Ratgeber - | 1189 |
| pweiss/ueberuns.txt | https://www.philipp-weiss-immobilien.de/ueber-uns/ | Über uns - | 1289 |
| pweiss/zusicherung.txt | https://www.philipp-weiss-immobilien.de/verkaufs-zusicherung/ | Verkaufs-Zusicherung - | 737 |
| pweiss/kontakt.txt | https://www.philipp-weiss-immobilien.de/kontaktseite/ | Kontaktseite - | 237 |
| pweiss/impressum.txt | https://www.philipp-weiss-immobilien.de/impressum/ | Impressum - | 554 |
| pweiss/tippgeber.txt | https://www.philipp-weiss-immobilien.de/immo-tippgeber-werden/ | Immo-Tippgeber werden - | 468 |

### 13.2 Weitere herangezogene Quellen (nur Suchtreffer, nicht vertieft)
- Suchtreffer zu „beste Makler-Websites": https://www.hostinger.com/de/tutorials/?p=13619 (10 Beispiele, international), https://www.magier.com/de/blog/besten-beispiele-fur-immobilien-webdesign (14 Beispiele, Hinweis auf nicht existierende Betreiber in anderen Listen), https://disq.de/wp-content/uploads/2023/05/20200707_PM_DISQ_Regionale-Immobilienmakler.pdf (DISQ-Test 2020 regionale Maklerportale: „fehlten vielen Seiten Funktionen wie einen FAQ-Bereich oder ein Glossar").
- Makler-Auszeichnungen (keine Website-Awards): ImmoScout24 ImmoAward (https://www.immobilienscout24.de/lp/immoaward/regionen/hamburg.html u. a.), BELLEVUE Best Property Agents (Pressemeldung McMakler 2019), Capital Makler-Kompass, F.A.Z.-Institut TOP Makler (auf marchaerter-immobilien.de zitiert).
- Drittportale zu Kandidaten: JACASA (aēstates „5,0 … 207 Bewertungen auf 3 Portalen"; Rheingold „4,9 … 151 Bewertungen"), aroundhome (aēstates-Profil: „inhabergeführtes Boutique-Maklerbüro"), koeln.de (Weihofen Immobilien, Rheingold), sellwerk.de (Philipp Weiß Immobilien, Bricks & Mortar).
- Nicht abrufbar/nicht prüfbar: https://www.david-gramzow.de/ansprechpartner/ (HTTP 500), https://www.david-gramzow.de/wohnung-verkaufen-berlin-mitte/ (Fehler), https://www.david-gramzow.de/immobilien-news/immobilie-verkaufen-bei-scheidung-in-berlin/ (Partner-Iframe), https://ausblick-immobilien.com/kontakt/ (404), https://duesselraum.de/ (Bot-Schutz), Domains von Rheingold/Weihofen Immobilien (nicht gefunden).

### 13.3 Hinweise zur Belastbarkeit
- Wortzahlen sind Zählungen des extrahierten Seitentexts inklusive Navigation/Footer (daher ca. 150–300 Wörter höher als der reine Artikeltext); wo ein Schema-`wordCount` vorlag, ist er zusätzlich genannt.
- Farb- und Schriftangaben beruhen auf Häufigkeiten von Hex-Werten und `font-family`/Google-Fonts-Einbindungen im Start-HTML; sie beschreiben das Design nur näherungsweise.
- Google-Bewertungszahlen sind Selbstangaben der Websites zum Abrufzeitpunkt, nicht gegen Google geprüft.
- Inhalte, die ausschließlich per JavaScript/Iframe geladen werden (FAQ-Antworten aēstates, Team-Modals, Bewertungstools Weiß/Baumann, Footer-Links Härter), konnten nicht gelesen werden und sind als „nicht prüfbar" markiert.

---

## Anhang A – Sitemap-Strukturen (wörtliche Pfade, Stand 29.10.2026)

Die Pfade zeigen, wie die Seiten ihre Inhalte organisieren (Ordnerlogik, Slug-Stil, Ortsseiten-Muster). Bild-/PDF-URLs und Objekt-Detailseiten sind ausgelassen, wo vermerkt.

### A.1 aestates.com (9 URLs, vollständig)
- /
- /datenschutz
- /immobilien
- /immobilien-bewertung
- /impressum
- /kontakt
- /social-media-managerin
- /uber-uns
- /verkaufen

### A.2 david-gramzow.de (Seiten und Magazin, ohne Objekt-/Taxonomie-Sitemaps)
- /
- /aktuelle-bauzinsen/
- /ansprechpartner/
- /banken/
- /baufinanzierung-berlin/
- /baufinanzierung-zinsen-vergleichen/
- /baufinanzierungsrechner-alt/annuitaetendarlehen-rechner/
- /baufinanzierungsrechner-alt/annuitaetendarlehen-tilgungsplan/
- /baufinanzierungsrechner/
- /baufinazierung-online/
- /bausparen-zuteilungsreif/
- /budgetrechner-immobilien/
- /buying-house-in-germany/
- /danke/
- /denkmalabschreibung/
- /denkmalimmobilie-kaufen/
- /denkmalimmobilie-kaufen/berlin/
- /denkmalimmobilie-kaufen/leipzig/
- /eigentumswohnung-verkaufen-berlin-prenzlauer-berg/
- /endfaellige-darlehen/
- /finanzierungspartner/
- /german-mortgage-calculator/
- /germany-mortgage-rates/
- /haus-verkaufen-berlin/
- /immobilie-verkaufen-berlin/
- /immobilien-news/
- /immobilien-news/abschreibung-denkmal-afa/
- /immobilien-news/annuitaetendarlehen-excel/
- /immobilien-news/babyboomer-millennials-gen-z-welche-generation-hatte-es-auf-dem-immobilienmarkt-seit-dem-zweiten-weltkrieg-am-schwersten/
- /immobilien-news/baufinanzierung-ohne-eigenkapital/
- /immobilien-news/buying-house-in-berlin/
- /immobilien-news/corona-probleme-baufinanzierung/
- /immobilien-news/darlehensarten-baufinanzierung/
- /immobilien-news/eigentumswohnung-verkaufen-berlin/
- /immobilien-news/ezb-bauzinsen/
- /immobilien-news/gas-heizung-verboten/
- /immobilien-news/guenstige-immobilien-berlin/
- /immobilien-news/haeuser-kaufen-berlin-zehlendorf/
- /immobilien-news/haus-verkaufen-berlin-2026/
- /immobilien-news/haus-verkaufen-berlin-kosten/
- /immobilien-news/haus-verkaufen-berlin-steuern/
- /immobilien-news/haus-verkaufen-berlin-trotz-kredit/
- /immobilien-news/haus-verkaufen-in-berlin-zehlendorf/
- /immobilien-news/haus-verkaufen-ohne-makler-berlin/
- /immobilien-news/haus-verkaufen-trotz-berliner-testament/
- /immobilien-news/heizungsgesetz-2026-eigentuemer-vermieter-kosten/
- /immobilien-news/immobilie-erfolgreich-verkaufen-in-berlin/
- /immobilien-news/immobilie-verkaufen-bei-scheidung-in-berlin/
- /immobilien-news/immobilie-verkaufen-berlin-haeufigsten-fragen/
- /immobilien-news/immobilien-investments/
- /immobilien-news/immobilienmarkt-2022/
- /immobilien-news/immobilienpreise-in-berlin-broeckeln/
- /immobilien-news/indian-guide-buying-house-in-germany/
- /immobilien-news/interview-mit-dem-handelsblatt/
- /immobilien-news/kfw-neubau-foerderung-2023/
- /immobilien-news/ki-immobiliensuche-mit-keymatch-ai/
- /immobilien-news/leitzinsen-europaeische-zentralbank/
- /immobilien-news/leitzinsen-ezb/
- /immobilien-news/mehrfamilienhaus-verkaufen-berlin/
- /immobilien-news/mietrechtsreform-2026/
- /immobilien-news/rich-kids-und-junge-erben-erobern-den-berliner-immobilienmarkt/
- /immobilien-news/sanierungspflicht-eu/
- /immobilien-news/tippgeber-berlin-immobilien/
- /immobilien-news/vermietete-wohnung-verkaufen-berlin/
- /immobilien-news/was-ist-ein-hypothekendarlehen/
- /immobilien-news/wie-viel-haus-kann-ich-mir-leisten/
- /immobilien-news/wohnung-kaufe-berlin/
- /immobilien-news/wohnung-kaufen-berlin-charlottenburg/
- /immobilien-news/wohnung-verkaufen-berlin-2026-steuern/
- /immobilien-news/wohnung-verkaufen-berlin-2026/
- /immobilien-news/wohnung-verkaufen-berlin-friedrichshain/
- /immobilien-news/wohnung-verkaufen-berlin-mitte-ratgeber/
- /immobilien-news/wohnung-verkaufen-berlin-prenzlauer-berg/
- /immobilien-news/wohnung-verkaufen-in-berlin-2026-kosten/
- /immobilien-news/wohnung-verkaufen-in-berlin-der-vollstaendige-ratgeber-fuer-eigentuemer-2026/
- /immobilien-news/wohnung-verkaufen-in-berlin-kreuzberg/
- /immobilien-news/wohnung-verkaufen-in-berlin-neukoelln/
- /immobilien-news/wohnung-verkaufen-in-berlin-privat/
- /immobilien-news/wohnung-verkaufen-in-charlottenburg/
- /immobilien-news/wohnungssuch-berlin/
- /immobilienbewertung-berlin/
- /immobilienmakler-berlin/
- /impressum/
- /kapitalanlage-berlin/
- /kapitalanlage-immobilien/
- /karriere-als-baufinanzierungsberater/
- /konstantdarlehen/
- /lenders/
- /loan-calculator-germany/
- /mehrfamilienhaus-verkaufen-berlin/
- /mehrfamilienhaus-verkaufen-leipzig/
- /mikroapartments-berlin/
- /presse/
- /sonder-afa/
- /studentenapartments/
- /suchergebnisse/
- /volltilger-darlehen/
- /wieviel-immobilie-kann-ich-mir-leisten/
- /wohnung-kaufen-finanzieren/
- /wohnung-verkaufen-berlin-mitte/
- /wohnung-verkaufen-berlin/
- /zwischenfinanzierung/

### A.3 marchaerter-immobilien.de (115 URLs, ohne Objektseiten)
- /
- /10-fehler-beim-immobilienverkauf/
- /altbauwohnung-verkaufen-frankfurt/
- /anzahlung-immobilienkauf/
- /arten-von-maklervertraegen/
- /ausgebautes-dachgeschoss-wohnflaeche/
- /baulasten-was-ist-das-frankfurt/
- /baum-faellen-frankfurt-genehmigung/
- /beletage-altbau/
- /besichtigungsrecht-immobilien/
- /bodenrichtwert-erklaert-grundstueckswert/
- /checkliste-immobilienbesichtigung-kaeufer/
- /datenschutz/
- /davinci-haus-verkaufen/
- /denkmalschutzimmobilie-verkaufen/
- /dichterviertel-frankfurt/
- /eigenbedarfskuendigung-nach-kauf/
- /energieausweis-immobilie-verkaufen/
- /ensembleschutz-erhaltungssatzung-baudenkmal/
- /erbbaurecht-immobilien-frankfurt/
- /erbengemeinschaft-uneinig-streit-immobilie/
- /erhaltungssatzung-milieuschutz-frankfurt/
- /erst-verkaufen-oder-erst-neu-kaufen/
- /gebaeudemodernisierungsgesetz-immobilienverkauf/
- /gesetz-teilung-maklerprovision-hessen/
- /gruenderzeit-villen-frankfurt-westend-nordend/
- /grundbuch-erklaert/
- /grundschuldbrief-verloren-aufgebotsverfahren/
- /haus-verkaufen-pflegeheim-frankfurt/
- /haus-verkaufen-und-wohnen-bleiben/
- /hausgeschichte-frankfurt/
- /hauskaufberatung-frankfurt/
- /hausschaetzung-frankfurt/
- /holzhausenviertel-frankfurt/
- /immobilie-erben-was-ist-zu-tun/
- /immobilie-finden-frankfurt-suchauftrag/
- /immobilie-fuer-verkauf-vorbereiten/
- /immobilie-gekauft-wie-gesehen-haftung/
- /immobilie-moebliert-unmoebliert-verkaufen/
- /immobilie-selbst-verkaufen/
- /immobilie-steuerfrei-verkaufen-frankfurt/
- /immobilie-verkaufen-frankfurt/
- /immobilie-verkaufen-makler-oder-privat/
- /immobilie-verkaufen-oder-behalten/
- /immobilie-verkaufen-trotz-laufender-finanzierung/
- /immobilien-bieterverfahren/
- /immobilien-ratgeber/
- /immobilien-richtig-praesentieren/
- /immobilienbewertung-frankfurt/
- /immobilienmakler-auswaehlen-frankfurt/
- /immobilienmakler-bad-homburg/
- /immobilienmakler-bockenheim/
- /immobilienmakler-frankfurt-westend/
- /immobilienmakler-koenigstein-im-taunus/
- /immobilienmakler-kronberg-im-taunus/
- /immobilienmakler-nordend-frankfurt/
- /immobilienmakler-oberursel/
- /immobilienmakler-sachsenhausen-frankfurt/
- /immobilienmakler-werden/
- /immobilienpreis-verhandeln-strategien-ratgeber-2026/
- /immobilienpreise-frankfurt/
- /immobilienpreise-westend-frankfurt-q2-2026/
- /immobilienverkauf-nach-notartermin-bis-uebergabe/
- /impressum/
- /kaufnebenkosten-grunderwerbsteuer-sparen/
- /kaufnebenkosten-immobilie-frankfurt/
- /kaufnebenkosten-notar-und-gericht/
- /kaufvertrag-welche-daten/
- /kontakt/
- /lage-lage-lage-immobilien-frankfurt/
- /luxusimmobilien-frankfurt-2026/
- /luxusimmobilienmakler-frankfurt/
- /maklernetzwerk/
- /maklervertrag-expose-besichtigung-widerrufsrecht/
- /maklervertrag-kuendingen-guide/
- /malerviertel-frankfurt/
- /marktbericht-frankfurt-westend-q1-2026/
- /marktbericht-westend-frankfurt-q3-2026/
- /mehrfamilienhaus-aufteilen-oder-komplett-verkaufen/
- /mehrfamilienhaus-verkaufen-frankfurt/
- /mietspiegel-frankfurt-2026/
- /off-market-immobilien-frankfurt/
- /paragraph-1365-bgb-zustimmung-immobilienverkauf/
- /portfolio/
- /preisstrategie-immobilienverkauf/
- /real-estate-frankfurt/
- /restnutzungsdauergutachten-frankfurt/
- /sanierungsbeduerftige-immobilien-verkaufen/
- /schaetzung-ortsgericht-hessen/
- /scheidung-immobilie-verkaufen-frankfurt/
- /setzungsrisse-haus-frankfurt/
- /sichtbarkeit-fur-immobilienmakler/
- /sonderumlage-eigentumswohnung/
- /spekulationssteuer-immobilienverkauf-frankfurt/
- /teuerste-viertel-frankfurt/
- /unternehmen/
- /vermietete-wohnung-verkaufen-2026/
- /verwalterzustimmung-wohnungsverkauf/
- /wegerecht-grundbuch/
- /wertermittlung-immobilie-hessen/
- /wichtige-unterlagen-immobilienverkauf/
- /widerrufsbelehrung-bei-maklervertraegen/
- /widerrufserklaerung-abgeben/
- /wie-viele-besichtigungen-bis-immobilienverkauf/
- /wo-wohnen-die-reichen-in-deutschland/
- /wohnflaechenberechnung-frankfurt/
- /wohnung-verkaufen-frankfurt/
- /wohnung-verkaufen-rebstockpark-frankfurt/
- /zeitpunkt-fuer-einen-immobilienverkauf/
- /zwangsversteigerung-abwehren/

### A.4 portimmo.de – Orts-, Bezirks- und Lebenssituations-Pfade (Auszug aus 222 URLs)
- /direktankauf/
- /geerbtes-haus-verkaufen-steuern/
- /haus-geerbt-sanierungspflicht/
- /haus-verkaufen-pflegeheim/
- /haus-von-eltern-erben-oder-uebertragen/
- /hausverkauf-in-boblingen/
- /hausverkauf-in-esslingen/
- /hausverkauf-in-filderstadt/
- /hausverkauf-in-ludwigsburg/
- /hausverkauf-in-pforzheim/
- /hausverkauf-in-schorndorf/
- /hausverkauf-in-schwaebisch-gmuend/
- /hausverkauf-in-stuttgart/
- /immobilie-geerbt-was-mache-ich-nun/
- /immobilie-geerbt/
- /immobilie-im-scheidungsfall/
- /immobilie-in-der-scheidung/
- /immobilien-leibrente/
- /immobilienbewertung-in-aachen/
- /immobilienbewertung-in-boblingen/
- /immobilienbewertung-in-esslingen/
- /immobilienbewertung-in-filderstadt/
- /immobilienbewertung-in-ludwigsburg/
- /immobilienbewertung-in-schorndorf/
- /immobilienbewertung-in-stuttgart/
- /immobilienbewertung-in-waiblingen/
- /immobiliengutachter-in-boeblingen/
- /immobiliengutachter-in-esslingen/
- /immobiliengutachter-in-filderstadt/
- /immobiliengutachter-in-stuttgart/
- /immobiliengutachter-in-waiblingen/
- /immobilienmakler-in-aachen/
- /immobilienmakler-in-alsdorf/
- /immobilienmakler-in-backnang/
- /immobilienmakler-in-baesweiler/
- /immobilienmakler-in-bietigheim-bissingen/
- /immobilienmakler-in-boeblingen/
- /immobilienmakler-in-bretten/
- /immobilienmakler-in-ditzingen/
- /immobilienmakler-in-eschweiler/
- /immobilienmakler-in-esslingen/
- /immobilienmakler-in-fellbach/
- /immobilienmakler-in-filderstadt/
- /immobilienmakler-in-freiberg-neckar/
- /immobilienmakler-in-gerlingen/
- /immobilienmakler-in-herrenberg/
- /immobilienmakler-in-herzogenrath/
- /immobilienmakler-in-holzgerlingen/
- /immobilienmakler-in-kirchheim-teck/
- /immobilienmakler-in-kornwestheim/
- /immobilienmakler-in-leinfelden-echterdingen/
- /immobilienmakler-in-leonberg/
- /immobilienmakler-in-ludwigsburg/
- /immobilienmakler-in-muehlacker/
- /immobilienmakler-in-nuertingen/
- /immobilienmakler-in-ostfildern/
- /immobilienmakler-in-pforzheim/
- /immobilienmakler-in-plochingen/
- /immobilienmakler-in-schorndorf/
- /immobilienmakler-in-schwaebisch-gmuend/
- /immobilienmakler-in-sindelfingen/
- /immobilienmakler-in-stolberg/
- /immobilienmakler-in-sulzfeld/
- /immobilienmakler-in-vaihingen-enz/
- /immobilienmakler-in-waiblingen/
- /immobilienmakler-in-weinstadt/
- /immobilienmakler-in-weissach/
- /immobilienmakler-in-wendlingen/
- /immobilienmakler-in-winnenden/
- /immobilienmakler-in-wuerselen/
- /immobilienmakler-stuttgart/
- /immobilienmakler-stuttgart/bad-cannstatt/
- /immobilienmakler-stuttgart/degerloch/
- /immobilienmakler-stuttgart/sued/
- /immobilienmakler-stuttgart/vaihingen/
- /immobilienmakler-stuttgart/west/
- /immobilienmakler-stuttgart/zuffenhausen/
- /immobilienwert-rechner/
- /online-wertermittlung/
- /ratgeber/
- /ratgeber/bewertung/
- /ratgeber/energie-sanierung/
- /ratgeber/kaufen-anlegen/
- /ratgeber/lebenssituationen/
- /ratgeber/markt-region/
- /ratgeber/recht-steuern/
- /ratgeber/verkaufen/
- /schonvermoegen-pflegeheim-immobilie/
- /smart-home-ki-immobilienwert/
- /vermietete-wohnung-verkaufen/
- /wohnen-im-alter-blick-in-die-zukunft/
- /wohnen-im-alter/
- /wohnung-verkaufen-aachen/
- /wohnung-verkaufen-ohne-makler/
- /wohnung-verkaufen-stuttgart/

### A.5 oerter-immobilien.de (Inhaltsseiten; 29 Objekt- und 20 Filterseiten ausgelassen)
- /
- /anlageobjekte/
- /ansatz-arbeitsweise/
- /besondere-situationen/
- /events/
- /immobilie-bewerten/
- /immobilie-verkaufen-22-oktober-2026/
- /immobilie-verkaufen/
- /immobilie-vermieten/
- /immobilie/
- /immobilien/
- /kontakt/

### A.6 ausblick-immobilien.com (86 URLs, vollständig)
- /
- /bewertung/
- /immobilienangebote/
- /karriere/
- /kooperationspartner/
- /ratgeber/
- /ratgeber/bodenrichtwert/
- /ratgeber/diskret-verkaufen/
- /ratgeber/energieausweis-pflicht-kosten/
- /ratgeber/erbengemeinschaft-haus-verkaufen/
- /ratgeber/erbschaftssteuer-freibetraege/
- /ratgeber/geerbte-immobilie/
- /ratgeber/geg-sanierungspflichten/
- /ratgeber/grundbuchberichtigung-erbfall/
- /ratgeber/grundschuld-uebergabe/
- /ratgeber/grundsteuer-grunderwerbsteuer/
- /ratgeber/grundstueck-verkaufen/
- /ratgeber/haus-geerbt-ablauf-fristen/
- /ratgeber/haus-verkaufen/
- /ratgeber/immobilie-scheidung/
- /ratgeber/immobilie-verkaufen-leitfaden/
- /ratgeber/immobilie-wert/
- /ratgeber/immobilienmarkt/
- /ratgeber/kaufpreisfaktor/
- /ratgeber/marktbericht/
- /ratgeber/mehrfamilienhaus-verkaufen/
- /ratgeber/mit-oder-ohne-makler/
- /ratgeber/online-bewertung-vs-makler/
- /ratgeber/pflichtteil-immobilie/
- /ratgeber/schenkung-statt-erbe/
- /ratgeber/spekulationssteuer-fristen/
- /ratgeber/stadtteile/
- /ratgeber/steuerfrei-verkaufen/
- /ratgeber/steuern-immobilienverkauf/
- /ratgeber/teilungsversteigerung/
- /ratgeber/teuerste-fehler-hausverkauf/
- /ratgeber/unterlagen-checkliste/
- /ratgeber/verkauf-trotz-kredit/
- /ratgeber/verkaufen-im-alter/
- /ratgeber/verkaufsdauer/
- /ratgeber/verkehrswert-verfahren/
- /ratgeber/vermietete-wohnung-verkaufen/
- /ratgeber/verrentung-niessbrauch/
- /ratgeber/versteckte-maengel/
- /ratgeber/was-kostet-der-verkauf/
- /ratgeber/wert-steigern-modernisierung/
- /ratgeber/wohnung-verkaufen/
- /ratgeber/zugewinnausgleich/
- /referenzen/
- /standort/immobilienmakler-duesseldorf-angermund/
- /standort/immobilienmakler-duesseldorf-benrath/
- /standort/immobilienmakler-duesseldorf-bilk/
- /standort/immobilienmakler-duesseldorf-derendorf/
- /standort/immobilienmakler-duesseldorf-duesseltal/
- /standort/immobilienmakler-duesseldorf-eller/
- /standort/immobilienmakler-duesseldorf-friedrichstadt/
- /standort/immobilienmakler-duesseldorf-gerresheim/
- /standort/immobilienmakler-duesseldorf-golzheim/
- /standort/immobilienmakler-duesseldorf-grafenberg/
- /standort/immobilienmakler-duesseldorf-heerdt/
- /standort/immobilienmakler-duesseldorf-himmelgeist/
- /standort/immobilienmakler-duesseldorf-holthausen/
- /standort/immobilienmakler-duesseldorf-kaiserswerth/
- /standort/immobilienmakler-duesseldorf-kalkum/
- /standort/immobilienmakler-duesseldorf-loerick/
- /standort/immobilienmakler-duesseldorf-lohausen/
- /standort/immobilienmakler-duesseldorf-ludenberg/
- /standort/immobilienmakler-duesseldorf-moersenbroich/
- /standort/immobilienmakler-duesseldorf-niederkassel/
- /standort/immobilienmakler-duesseldorf-oberbilk/
- /standort/immobilienmakler-duesseldorf-oberkassel/
- /standort/immobilienmakler-duesseldorf-pempelfort/
- /standort/immobilienmakler-duesseldorf-rath/
- /standort/immobilienmakler-duesseldorf-stockum/
- /standort/immobilienmakler-duesseldorf-unterbach/
- /standort/immobilienmakler-duesseldorf-unterbilk/
- /standort/immobilienmakler-duesseldorf-unterrath/
- /standort/immobilienmakler-duesseldorf-urdenbach/
- /standort/immobilienmakler-duesseldorf-vennhausen/
- /standort/immobilienmakler-duesseldorf-wersten/
- /standort/immobilienmakler-duesseldorf-wittlaer/
- /suchagent/
- /tippgeber/
- /ueber-uns/
- /veranstaltungen/
- /verkauf/

### A.7 immoinvest-stuttgart.de (8 URLs, vollständig)
- /
- /agb/
- /datenschutz/
- /immobilien/
- /immobilienbewertung-stuttgart/
- /impressum/
- /kontakt/
- /locations.kml

### A.8 baumann-immobilien.com (Seiten ohne Objektseiten)
- /
- /datenschutz/
- /eu-ai-act/
- /immobilienangebote/
- /impressum/
- /kontakt/
- /referenzen/
- /sitemap-immobilien.xml
- /sitemap-pages.xml
- /sitemap-routes.xml
- /vertrag-widerrufen/

### A.9 philipp-weiss-immobilien.de
- Keine Sitemap abrufbar (sitemap.xml / wp-sitemap.xml ohne Einträge). Aus der Navigation ermittelt: / · /wohnung-haus-und-mehrfamilienhaus-verkaufen/ · /immobilienbewertung/ · /immobilien-ratgeber/ · /ueber-uns/ · /verkaufs-zusicherung/ · /kontaktseite/ · /immo-tippgeber-werden/ · /suchprofil-exklusive/ · /annuitaetenrechner-fuer-ihre-immobilie-philipp-weiss-immobilien-immobilienmakler-koeln/ · /impressum/ · /datenschutz/

---

## Anhang B – FAQ-Fragenkataloge (wörtlich, als Vorlage für Rösslers FAQ-Sektionen)

### B.1 David Gramzow – /immobilie-verkaufen-berlin/ (13 Fragen, H3)
- Was ist meine Immobilie in Berlin aktuell wert?
- Was kostet ein Makler beim Immobilienverkauf in Berlin?
- Wie lange dauert ein Immobilienverkauf in Berlin?
- Wie kann ich meine Immobilie in Berlin schnell verkaufen?
- Welche Unterlagen benötige ich für den Verkauf?
- Fällt beim Immobilienverkauf in Berlin Spekulationssteuer an?
- Wie entwickeln sich die Immobilienpreise in Berlin 2026?
- Kann ich meine Immobilie in Berlin ohne Makler verkaufen?
- Welche Mängel muss ich als Verkäufer aufklären?
- Sollte ich meine Immobilie verkaufen oder vermieten?
- Wie wird ein Zinshaus in Berlin bewertet?
- Welcher Makler eignet sich für den Verkauf eines Zinshauses in Berlin?
- Wohnung, Haus oder Mehrfamilienhaus — was ist beim Verkauf anders?

### B.2 David Gramzow – /wohnung-verkaufen-berlin/ (17 Fragen, H3)
- Was ist meine Wohnung in Berlin wert?
- Was kostet der Verkauf einer Wohnung in Berlin?
- Wie verkaufe ich meine Wohnung in Berlin zum Bestpreis?
- Wie lange dauert der Wohnungsverkauf in Berlin?
- Wie kann ich meine Wohnung in Berlin schnell verkaufen?
- Wann fällt Spekulationssteuer an — und warum lohnt sich Warten?
- Welche Unterlagen brauche ich für den Verkauf?
- Vermietete Wohnung verkaufen — was ist zu beachten?
- Kann ich meine Wohnung trotz laufendem Kredit verkaufen?
- Wohnung privat oder mit Makler verkaufen?
- Was kostet eine 70-m²-Wohnung in Berlin?
- Wie entwickeln sich die Immobilienpreise in Berlin 2026?
- Ist ein Energieausweis beim Wohnungsverkauf Pflicht?
- Wann ist der beste Zeitpunkt, eine Wohnung in Berlin zu verkaufen?
- Wie läuft der Wohnungsverkauf Schritt für Schritt ab?
- Warum sind bezugsfreie Wohnungen teurer als vermietete?
- Sollte ich vor dem Verkauf renovieren oder sanieren?

### B.3 David Gramzow – /immobilienmakler-berlin/ (17 Fragen, H3)
- Was kostet ein Immobilienmakler in Berlin?
- Lohnt sich ein günstiger Makler oder ein Verkauf ohne Provision?
- Wie finde ich einen guten Immobilienmakler in Berlin?
- Wer ist der beste Immobilienmakler in Berlin?
- Woran erkenne ich einen seriösen, zuverlässigen Makler in Berlin?
- Sind Auszeichnungen bei Immobilienmaklern in Berlin aussagekräftig?
- Wie vergleiche ich Immobilienmakler in Berlin?
- Lohnt es sich, einen Immobilienmakler zu beauftragen?
- Welche Aufgaben übernimmt ein Immobilienmakler?
- Was ist meine Immobilie in Berlin aktuell wert?
- Wie lange dauert ein Immobilienverkauf in Berlin?
- Welche Unterlagen brauche ich, um meine Immobilie zu verkaufen?
- Was ist der Unterschied zwischen Alleinauftrag und einfachem Maklerauftrag?
- Kann ich meine vermietete Wohnung in Berlin verkaufen?
- Welcher Makler eignet sich für ein Mehrfamilienhaus in Berlin?
- Muss ich als Verkäufer bei Besichtigungen dabei sein?
- Berät ein Immobilienmakler auch beim Kauf in Berlin?

### B.4 David Gramzow – Stadtteilseite Prenzlauer Berg (11 Fragen, H3)
- Welche Immobilie möchten Sie bewerten?
- Wie lange dauert der Verkauf einer Wohnung in Prenzlauer Berg?
- Was ist meine Wohnung in Prenzlauer Berg wert?
- Brauche ich einen Energieausweis zum Verkauf?
- Muss ich Spekulationssteuer zahlen?
- Was kostet mich ein Makler beim Wohnungsverkauf in Prenzlauer Berg?
- Was passiert, wenn der Käufer keine Finanzierung bekommt?
- Kann ich meine Wohnung auch vermietet verkaufen?
- Welche Unterlagen brauche ich für den Wohnungsverkauf?
- Wann ist der beste Zeitpunkt für den Wohnungsverkauf in Prenzlauer Berg?
- Wie viel Eigenkapital brauchen Käufer meiner Wohnung?
- Kann ich meine Wohnung auch ohne Makler verkaufen?

### B.5 Marc Härter – /immobilie-verkaufen-frankfurt/ (8 Fragen, Akkordeon)
- Sind Erstgespräch und Besichtigung kostenfrei und unverbindlich?
- Wie lange dauert ein Immobilienverkauf in Frankfurt?
- Welche Unterlagen benötigen Sie für den Verkauf?
- Wie hoch ist die Maklerprovision und wann wird sie fällig?
- Welche weiteren Kosten können beim Verkauf entstehen?
- Kann ich eine vermietete Immobilie verkaufen?
- Können Sie meinen Verkauf betreuen, wenn ich nicht vor Ort bin?
- Kann ich den Verkauf schon vorbereiten, wenn er erst später anstehen?

### B.6 Marc Härter – /immobilie-erben-was-ist-zu-tun/ (Inhaltsverzeichnis, 14 Punkte)
- Bewerten
- Verkaufen
- Portfolio
- Über uns
- Kontakt
- 9 667748060Frankfurt · Taunus
- Immobilie geerbt: Was ist jetzt in welcher Reihenfolge zu tun?
- Erste Schritte: Immobilie, Unterlagen und laufende Kosten sichern
- Welche Fristen gelten – und wann sollte ich die Erbschaft ausschlagen?
- Wann muss ich die geerbte Immobilie dem Finanzamt melden?
- Wer erbt das Haus – und wem gehört welcher Anteil?
- Grundbuchberichtigung nach Todesfall: Antrag, Erbnachweis und Kosten
- Verstorbenen Ehepartner aus dem Grundbuch austragen: Was ändert sich?
- Kann ich das geerbte Haus ohne Erbschein verkaufen?

### B.7 AusBlick Immobilien – /verkauf/ (8 Fragen, Akkordeon)
- Ist es aktuell gut, ein Haus zu verkaufen?
- Kann ich mein Haus so billig verkaufen wie ich möchte?
- Welches ist das teuerste Viertel in Düsseldorf?
- Werden die Immobilienpreise 2026 wieder steigen?
- Wie entwickeln sich die Immobilienpreise in Düsseldorf?
- Wie entwickelt sich der Immobilienmarkt in Düsseldorf?
- Wie hoch ist der Quadratmeterpreis für Eigentumswohnungen in Düsseldorf?
- Wie kann ich am schnellsten meine Wohnung verkaufen?

### B.8 AusBlick Immobilien – /bewertung/ (8 Fragen, H3)
- Was kostet eine Immobilienbewertung in Düsseldorf?
- Wie genau sind Online-Bewertungstools?
- Welche Faktoren beeinflussen den Wert meiner Immobilie in Düsseldorf?
- Wie läuft eine professionelle Bewertung ab?
- Welche Unterlagen brauche ich?
- Kann ich meine Immobilie selbst bewerten?
- Wie funktioniert die Online-Bewertung?
- Wann ist eine Bewertung sinnvoll?

### B.9 PORTIMMO – /direktankauf/ (7 Fragen, aus dem FAQ-Fließtext extrahiert)
- Was bedeutet Direktankauf einer Immobilie?
- Welche Immobilien kauft PORTIMMO an?
- Wie schnell bekomme ich ein Angebot?
- Ist das Ankaufsangebot verbindlich für mich?
- Fällt beim Direktankauf eine Provision an?
- Erziele ich beim Direktankauf den gleichen Preis wie am Markt?
- Kann ich nach dem Verkauf noch in der Immobilie wohnen bleiben?

### B.10 PORTIMMO – Ortsseite Leonberg (4 Fragen)
- Kommen Kaufinteressenten aus Stuttgart nach Leonberg?
- Was ist bei Objekten in der Altstadt zu beachten?
- Sind Sie auch in den Ortsteilen tätig?
- Immobilienmakler, Immobilienberater oder Immobilienagentur in Leonberg: Was ist der Unterschied?

### B.11 Oerter Immobilien – /immobilie-bewerten/ (5 Fragen, H3)
- Ist eine Einwertung mit einem Verkaufsauftrag verbunden?
- Ist die Einwertung ein förmliches Verkehrswertgutachten?
- Was passiert, wenn Unterlagen fehlen?
- Warum werden drei Bewertungsverfahren angewendet?
- Wie lange bleibt eine Einwertung aktuell?

### B.12 aēstates – Startseite/Kontakt (7 Fragen, Antworten nicht im HTML)
- Wie hilft ein Makler?
- Warum nicht selbst verkaufen?
- Was kostet ein Makler?
- Wie lange dauert ein Verkauf?
- Vermarktung der Immobilie
- Was bedeutet "gekauft wie gesehen"?
- Was kommt nach dem Notartermin?

### B.13 Philipp Weiß – Startseite (4 Fragen)
- Womit unterscheidet sich Philipp Weiß Immobilien von anderen Immobilienmaklern?
- Warum sollte ich meine Immobilie über Philipp Weiß Immobilien verkaufen lassen?
- Wie viel kostet es, meine Immobilie bei Philipp Weiß Immobilien bewerten zu lassen?
- Warum sollte ich hier ein Suchprofil anlegen?

### B.14 Ableitung: FAQ-Grundstock für Rössler (Eigentumswohnung + Direktankauf), zusammengestellt aus B.1–B.13
- Was ist meine Wohnung in Leonberg / Heimsheim / Ditzingen / Renningen / Pforzheim wert? (Gramzow, AusBlick)
- Was kostet der Verkauf – und wann ist die Provision fällig? (Härter, Weiß, PORTIMMO)
- Wie lange dauert der Verkauf einer Eigentumswohnung? (Gramzow, Härter – ohne feste Zusage)
- Welche WEG-Unterlagen brauche ich? (Gramzow, PORTIMMO, Härter)
- Kann ich meine vermietete Wohnung verkaufen – und mit welchem Abschlag? (Gramzow, Härter, PORTIMMO, AusBlick)
- Was bedeutet Direktankauf, und liegt der Preis unter dem Marktpreis? (PORTIMMO)
- Fällt beim Direktankauf eine Provision an? (PORTIMMO)
- Was passiert, wenn der Käufer keine Finanzierung bekommt? (Gramzow)
- Muss ich bei Besichtigungen dabei sein? (Gramzow)
- Können Sie den Verkauf betreuen, wenn ich nicht vor Ort wohne? (Härter)
- Wann fällt Spekulationssteuer an – auch bei geerbten Wohnungen? (Gramzow, Härter, PORTIMMO)
- Wohnung geerbt: Was ist in welcher Reihenfolge zu tun? (Härter)
- Wohnung bei Trennung: Welche vier Optionen gibt es? (Härter)
- Wie schnell bekomme ich einen Termin, und was kostet die Erstberatung? (PORTIMMO)
