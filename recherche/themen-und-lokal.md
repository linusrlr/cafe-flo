# Recherche-Dossier: Themen-Inventar, Inhalts-Benchmarks und lokales SEO
## Projekt: Rössler Immobilien (Linus Rössler) – Eigentumswohnungen in Heimsheim, Leonberg, Ditzingen, Renningen, Pforzheim

- Stand der Recherche: 29.10.2026
- Zweck: Grundlage für Ratgeber-/Info-Unterseiten und Ortsseiten auf https://roessler-immo.de/
- Methode: Web-Suche (deutschsprachig) je Thema, anschließend Abruf der rankenden Seiten (WebFetch bzw. curl mit Browser-User-Agent; Rohdateien liegen unter `/tmp/claude-0/-home-user/e7214d44-0169-5a35-af11-cf04a7507b2a/scratchpad/dl-themen/`), Extraktion von Title, H1/H2/H3 (wörtlich), grober Wortzahl (Volltext der Seite inkl. Navigation, daher Richtwert), Schema.org-Typen, Datum/Autor, genannten Paragrafen, CTAs.
- Hinweis zu „Wortzahl“: automatisch gezählte Wörter des sichtbaren Seitentexts nach Entfernen von Skripten/Navigation; enthält teilweise Footer/Teaser. Als „grob“ zu lesen (±15 %).
- Hinweis zu „Rangplätzen“: Die genutzte Websuche liefert keine exakten Google-Positionen; „rankend“ = unter den ersten Treffern der Suche zum jeweiligen Suchbegriff. Für exakte SERP-Positionen muss Linus die Suchbegriffe selbst in Google (Standort Leonberg) prüfen.
- Grundsatz: Keine Zahl ohne Quelle. Was nicht gefunden wurde, ist als **nicht gefunden** markiert. Rechtsangaben sind mit Quelle (Gesetzestext bei gesetze-im-internet.de, dejure.org, Gesetzblatt BW) belegt.

---

## 0. Wichtige Querschnittsbefunde (vor dem Schreiben lesen)

### 0.1 Das GEG heißt inzwischen GModG
Auf gesetze-im-internet.de ist das Gebäudeenergiegesetz (GEG) als „Gesetz zur Einsparung von Energie und zur Modernisierung der Wärmeversorgung in Gebäuden (Gebäudemodernisierungsgesetz – GModG)“ geführt; die alten URLs (`/geg/__80.html`, `/geg/__87.html`) liefern die Paragrafen mit dem Titel „§ 80 GModG“ bzw. „§ 87 GModG“.
- Quelle: https://www.gesetze-im-internet.de/geg/__80.html und https://www.gesetze-im-internet.de/geg/__87.html (abgerufen 29.10.2026)
- Die Verbraucherzentrale schreibt (Stand 31.08.2026): Das Gebäudemodernisierungs-Gesetz (GModG) ist die Grundlage, „welches das Gebäudeenergie-Gesetz (GEG) abgelöst hat“. Quelle: https://www.verbraucherzentrale.de/wissen/energie/energetische-sanierung/energieausweis-wer-braucht-ihn-24054
- reduco.ai nennt als Verkündungsdatum des GModG den 28.07.2026 (nicht im Bundesgesetzblatt gegengeprüft – **Datum nur als Sekundärangabe**). Quelle: https://reduco.ai/blog/energieausweis/energieausweis-wohnung-eigentumswohnung
- Konsequenz für die Website: Überall, wo „GEG § 80 / § 87“ steht, besser „§ 80 GModG (ehemals GEG)“ schreiben. Viele Wettbewerber-Seiten (Homeday, ImmoScout24, bodenrichtwerte-deutschland.de) zitieren noch „GEG“. Das ist eine Chance, aktueller zu sein.

### 0.2 Kündigungssperrfrist in Leonberg, Pforzheim, Ditzingen: 5 Jahre statt 3 (Stand 2026)
- Die Kündigungssperrfristverordnung Baden-Württemberg (KSpVO BW) vom 16.12.2025 (GBl. 2025 Nr. 146, 19.12.2025) bestimmt in § 1 die Gebiete nach § 577a Abs. 2 S. 1 BGB. In der Liste stehen u. a. **Leonberg**, **Pforzheim**, Korntal-Münchingen, Ludwigsburg, Möglingen, Mühlacker, Sindelfingen, Böblingen, Stuttgart, Steinenbronn, Holzgerlingen.
- § 2 KSpVO BW: „Die Kündigungssperrfrist bei Wohnungsumwandlungen beträgt in den in § 1 bezeichneten Gebieten fünf Jahre.“
- § 3: „Diese Verordnung tritt am 1. Januar 2026 in Kraft und mit Ablauf des 31. Dezember 2026 außer Kraft.“
- **Ditzingen**: In der Verordnungsliste (Volltext, Gesetzblatt) ist Ditzingen **nicht** enthalten; die Liste des Deutschen Mieterbunds (Stand 6/2026) nennt laut Suchergebnis Leonberg und Ditzingen – Widerspruch; maßgeblich ist der Verordnungstext. Prüfen: https://mieterbund.de/service/mieterschutzverordnungen/kuendigungssperrfrist/
- **Renningen, Heimsheim**: nicht in der Liste → Regelfrist 3 Jahre (§ 577a Abs. 1 BGB).
- Quelle (PDF, Volltext geprüft): https://www.landtag-bw.de/resource/blob/611984/7e993deafc1547ab553a30dfe14a9333/GBl2025146.pdf
- Lokale Datei: `/tmp/claude-0/-home-user/e7214d44-0169-5a35-af11-cf04a7507b2a/scratchpad/dl-themen/pdf/GBl2025146.txt`
- Für die Website: Das ist ein echter lokaler USP-Inhalt („In Leonberg und Pforzheim gilt 2026 eine fünfjährige Sperrfrist nach Umwandlung, in Renningen und Heimsheim drei Jahre“). Keine der gefundenen Ratgeberseiten nennt das ortsbezogen. Achtung: Verordnung läuft am 31.12.2026 aus; Nachfolgeverordnung beobachten.

### 0.3 Grunderwerbsteuer Baden-Württemberg: 5,0 %
- Seit 05.11.2011 5,0 % (vorher 3,5 %). Quellen: Stadt Karlsruhe (service-bw-Verfahrensbeschreibung) https://web1.karlsruhe.de/service/Buergerdienste/leistung.php?id=413 ; https://www.finanz.de/steuern/grunderwerbsteuer/baden-wuerttemberg/ ; https://finanz-rechner-hub.de/steuer/grunderwerbsteuer/baden-wuerttemberg/
- Viele überregionale Ratgeber rechnen mit 6,5 % (z. B. ImmoScout24-Kostentabelle „Wohnung verkaufen“, Beispiel 200.000 €, Grunderwerbsteuer 6,5 % = 13.000 €). Für Leonberg/Pforzheim ist das falsch → Chance, mit 5 % korrekt zu rechnen.

### 0.4 Maklerprovision: Übliche Sätze BW
- ImmoScout24 (Makler-Verzeichnisseiten Leonberg/Heimsheim/Renningen): „in Baden-Württemberg üblicherweise zwischen 3,57 % und 7,14 % des Kaufpreises“. Quelle: https://www.immobilienscout24.de/anbieter/immobilienmakler/de/baden-wuerttemberg/boeblingen-kreis/leonberg
- ImmoScout24-Ratgeber Maklerprovision (Stand 09.09.2026): Gesamtprovision „je nach Region häufig zwischen 5,95 und 7,14 Prozent des Kaufpreises inklusive Mehrwertsteuer“; Grafik: 3,57 % je Seite. Quelle: https://www.immobilienscout24.de/wissen/verkaufen/maklerprovision.html
- IHK Bodensee-Oberschwaben: Höhe frei, „zwischen 3,57 und 7,14 Prozent“. Quelle: https://www.ihk.de/bodensee-oberschwaben/branchen/vermittlergewerbe/makler-und-bautraeger/neue-gesetzliche-regelungen-fuer-immobilienmakler-4982344
- Eine amtliche/verbandliche Statistik für Baden-Württemberg (z. B. IVD-Provisionsübersicht): **nicht gefunden**.

### 0.5 Spekulationssteuer-Freigrenze: 1.000 € (seit 2024)
- § 23 Abs. 3 S. 5 EStG: „Gewinne bleiben steuerfrei, wenn der aus den privaten Veräußerungsgeschäften erzielte Gesamtgewinn im Kalenderjahr weniger als 1 000 Euro betragen hat.“ Quelle: https://www.gesetze-im-internet.de/estg/__23.html
- Finanztip (Stand 09.07.2026): „kein Freibetrag, sondern nur eine Freigrenze“; bis 2023 600 €. Quelle: https://www.finanztip.de/spekulationssteuer-immobilienverkauf/

### 0.6 Gemeinsamer Nenner der rankenden Seiten
- Fast alle Top-Seiten sind Portale (ImmoScout24, Homeday, immoverkauf24, immoportal, wohnglück) oder Dienstleister (reduco.ai = Energieberatung, bodenrichtwerte-deutschland.de), ergänzt um Finanztip, Verbraucherzentrale, Kanzleien.
- Typische Länge: 2.500–7.000 Wörter; nahezu immer FAQ-Block (oft mit FAQPage-Schema), fast immer CTA „kostenlose Bewertung/Wertermittlung“, teils eBook/Checkliste-PDF.
- Kein einziges Ranking-Dokument hat lokalen Bezug zu Leonberg/Heimsheim/Pforzheim. Die Lücke ist durchgängig: lokale Zahlen (Preise, Sperrfrist, Grunderwerbsteuer, Gutachterausschuss, Verwalter-Praxis vor Ort), WEG-spezifische Tiefe (Hausgeld/Rücklage/Sonderumlage/Verwalterzustimmung) und ehrliche, konkrete Rechenbeispiele mit regionalen Preisen.

---

# TEIL A – THEMEN-INVENTAR UND INHALTS-BENCHMARKS

Legende Anbieter-Typ: P = Portal/Lead-Plattform, M = Makler/Hybridmakler, V = Verbraucherschutz/unabhängig, R = Rechtsanwalt/Kanzlei, S = Steuer/Finanz, D = sonstiger Dienstleister, G = Gesetzestext.

---

## Thema 1: Eigentumswohnung verkaufen (Ablauf, Unterlagen – Teilungserklärung, WEG-Protokolle, Wirtschaftsplan, Rücklagen)

### 1.1 Suchbegriffe
- „Eigentumswohnung verkaufen Ablauf Unterlagen Teilungserklärung Protokolle Wirtschaftsplan“
- Nebenbegriffe (aus Titles der Treffer): „Wohnung verkaufen“, „Wohnung verkaufen Ablauf Kosten Checkliste“, „Eigentumswohnung verkaufen 2026“

### 1.2 Rankende Seiten
| # | URL | Typ | Wortzahl (grob) | FAQ | Autor / Datum | Schema |
|---|---|---|---|---|---|---|
| 1 | https://www.anwalt.org/wohnung-verkaufen/ | R (Rechtsportal) | ca. 1.400 | ja | Murat Kilinc, Rechtsanwalt; publ. 28.01.2021, akt. 14.07.2026 | Article, Question/Answer, Person, Organization |
| 2 | https://reduco.ai/blog/immobilienverkauf/wohnung-verkaufen-ablauf | D (Energieberatung/Content) | ca. 6.900 | ja (FAQPage) | Hendrik Stotz; publ. 11.08.2026, akt. 17.08.2026 | BlogPosting, FAQPage, Organization |
| 3 | https://www.immobilienscout24.de/wissen/verkaufen/wohnung-verkaufen.html | P | ca. 3.400 | ja (FAQPage) | Nadine Kunert; online seit 14.04.2022, akt. 02.01.2026 | Article, FAQPage, HowTo, Product/AggregateRating |
| 4 | https://www.homeday.de/de/immobilienverkauf/wohnung-verkaufen/ | M (Hybridmakler) | ca. 4.000 | ja | kein Autor/Datum sichtbar | Product/AggregateRating |
| – | https://www.mcmakler.de/ratgeber/immobilienverkauf/wohnung-verkaufen | M | **nicht lesbar** (HTTP 403 Cloudflare) | – | – | – |
| – | https://www.immoportal.com/node/7867 (Käufersicht: Eigentumsverhältnisse prüfen) | P | nicht ausgewertet (Käuferperspektive) | – | – | – |

### 1.3 H-Struktur wörtlich

**anwalt.org** (Title: „Wohnung verkaufen: Was ist zu beachten? - Anwalt.org“)
- H1: Wohnung verkaufen: Ablauf, Steuern und anfallende Kosten
- H2: FAQ: Wohnung verkaufen
- H2: Unterlagen für den Wohnungsverkauf (inkl. Checkliste)
- H3: Entstehen beim Wohnungsverkauf Kosten?
- H3: Ablauf beim Wohnungskauf: Was sollten Sie beachten?
- H2: Was ist Ihre Immobilie wert?
- H3: Weitere Ratgeber
- H3: Über den Autor

**reduco.ai** (Title: „Eigentumswohnung verkaufen 2026: Ablauf, Kosten, ohne Makler | reduco.ai“; Meta: „Wohnungsverkauf in 6 Phasen: 12 WEG-Unterlagen, 90 Tage Vermarktung, Ihre Kosten und was der Privatverkauf ohne Makler bei 350.000 € wirklich spart.“)
- H1: Eigentumswohnung verkaufen 2026: Ablauf, Kosten, ohne Makler
- H2: Das Wichtigste in Kürze
- H2: Ablauf beim Verkauf einer Eigentumswohnung: sechs Phasen mit ehrlichen Zeitangaben
- H2: Phase 1: Die 12 Unterlagen und die 7, die nur die Verwaltung hat
- H2: Die Verwalterzustimmung nach § 12 WEG: kein Automatismus, aber ein Dealbreaker
  - H3: Wann sie nötig ist und was passiert, wenn sie fehlt
  - H3: Was sie kostet
  - H3: Wenn die Zustimmung verweigert wird
  - H3: Der Tipp, den kaum jemand kennt
- H2: Hausgeld, Rücklage, Sonderumlage: die drei Geldfragen, die Deals killen
  - H3: Hausgeld: nicht die Höhe entscheidet, sondern die Erklärung
  - H3: Erhaltungsrücklage: starkes Preisargument, aber kein Auszahlungsanspruch
  - H3: Sonderumlage: es zählt die Fälligkeit, nicht der Beschluss
- H2: Phase 2: Preisfindung und warum die Gemeinschaft Ihren Preis mitbestimmt
  - H3: Die Energieklasse wirkt bei Wohnungen anders als beim Haus
- H2: Der Energieausweis bei der Eigentumswohnung
- H2: Phase 3: Vermarktung und die häufigste Fehlerquelle im Exposé
- H2: Was der Verkauf Sie kostet
  - H3: Vorfälligkeitsentschädigung: der Deckel, den es nicht gibt
  - H3: Steuer: Zehnjahresfrist und Eigennutzung
- H2: Wohnung ohne Makler verkaufen: was der Privatverkauf wirklich spart
  - H3: Die Ersparnis ist Ihre Hälfte, nicht die volle Provision
  - H3: Was Ihnen auch ein Makler nicht abnimmt
  - H3: Wohnung mit oder ohne Makler verkaufen: die Entscheidungsfrage
- H2: Phase 5 und 6: Notartermin, Kaufpreis, Übergabe
- H2: Vermietete Eigentumswohnung: die drei Paragrafen, die zählen
- H2: Wovon ich abrate
- H2: Häufige Fragen (FAQ)
  - H3: Welche Unterlagen brauche ich zum Verkauf einer Eigentumswohnung?
  - H3: Brauche ich für den Verkauf wirklich die Zustimmung des Verwalters?
  - H3: Darf der Verwalter den Verkauf verweigern, und was ist ein wichtiger Grund?
  - H3: Wer zahlt eine beschlossene Sonderumlage: Käufer oder Verkäufer?
  - H3: Haftet der Käufer für meine Hausgeldrückstände, und was wird aus meiner Rücklage?
  - H3: Brauche ich einen eigenen Energieausweis für meine Wohnung?
  - H3: Wie lange dauert der Verkauf einer Eigentumswohnung insgesamt?
  - H3: Wann ist der Verkauf steuerfrei?
  - H3: Kann ich meine Eigentumswohnung privat ohne Makler verkaufen?
- H2: Nächster Schritt: erst die Unterlagen, dann der Preis
- H2: Energieberatung in Ihrer Region / H2: Verwandte Artikel (u. a. „Instandhaltungsrücklage beim Wohnungsverkauf: 3 BFH-Urteile“, „Wohnung geerbt 2026: verkaufen, vermieten oder einziehen?“)

**ImmoScout24** (Title: „Wohnung verkaufen in 2026: Ablauf, Kosten & Checkliste - ImmoScout24“)
- H1: Wohnung verkaufen: Vorbereitung, Unterlagen und Ablauf
- H3: Schnell und bequem zur Immobilienbewertung (CTA-Box)
- H2: Wie kann ich am besten eine Wohnung verkaufen?
- H2: Was muss ich beachten, wenn ich eine Wohnung verkaufe?
- H2: Wie ermittle ich den Wert meiner Wohnung?
- H3: Du möchtest deine Immobilie bewerten lassen? (CTA, 2×)
- H2: Wohnungsverkauf: Kennst du deine Käuferzielgruppe?
- H2: Wohnung verkaufen – wann lohnt es sich?
- H2: Wie lange dauert der Verkauf einer Eigentumswohnung?
- H2: Welche Unterlagen werden für den Wohnungsverkauf benötigt?
- H2: Wie präsentiere ich die Wohnung am besten?
- H2: Wie viel kostes es, eine Eigentumswohnung zu verkaufen? (Tippfehler im Original)
- H2: Fazit: Gut vorbereitet ist halb verkauft
- H2: FAQ: Häufige Fragen beim Wohnungsverkauf

**Homeday** (Title: „Wohnung verkaufen leicht gemacht: Das ist 2026 wichtig | Homeday“)
- H1: Wohnung verkaufen mit Homeday
- H2: Jetzt Makler vor Ort finden
- H2: Wohnung verkaufen: So gelingt der Wohnungsverkauf
- H2: 1. Wann bietet es sich an, eine Wohnung zu verkaufen?
- H2: 2. Wie verkauft Homeday meine Wohnung? (H3: Kostenlose Wohnungsbewertung / Moderne Bewerbung / Erfolgreicher Wohnungsverkauf)
- H2: 3. Wie schnell lässt sich eine Wohnung verkaufen?
- H2: 4. Wie bereite ich den Wohnungsverkauf vor? (H3: 4.1 Angebotspreis / 4.2 Zielgruppe)
- H2: 5. Eigentumswohnung verkaufen – vermietet oder unvermietet?
- H2: 6. Was ist ein Vorkaufsrecht? (H3: 6.1 Wann hat ein Mieter ein Vorkaufsrecht? / 6.2 Haben Nachbarn ein Vorkaufsrecht? / 6.3 Ist ein Vorkaufsrecht übertragbar?)
- H2: 7. Welche Dokumente sind notwendig um eine Wohnung zu verkaufen?
- H2: 8. Wie läuft der Verkauf einer Eigentumswohnung ab? (H3: 8.1 Bewerbung / 8.2 Besichtigungen / 8.3 Kaufvertrag)
- H2: 9. Wie unterscheidet sich der Wohnungsverkauf vom Hausverkauf? (H3: 9.1 Besonderheiten geerbte Wohnung)
- H2: 10. Welche Kosten fallen beim Wohnungsverkauf an? (H3: Ein Überblick über die Kosten beim Wohnungsverkauf:)
- H2: 11. Eigentumswohnung verkaufen – mit oder ohne Makler?
- H2: Wohnung verkaufen – FAQ
- H2: Lesen Sie jetzt:

### 1.4 Welche Fragen die Seiten beantworten
- Wann lohnt sich der Verkauf / wann ist ein guter Zeitpunkt? (IS24, Homeday)
- Wie lange dauert es? (alle; Zahlen siehe 1.5)
- Welche Unterlagen? (alle; reduco mit WEG-Tiefe)
- Verwalterzustimmung nötig? (anwalt.org: „kann erforderlich sein“; reduco: nur bei Veräußerungsbeschränkung in der Teilungserklärung, § 12 WEG)
- Wer zahlt Sonderumlage / haftet Käufer für Hausgeldrückstände / was wird aus der Rücklage? (nur reduco)
- Energieausweis für die Wohnung? (reduco: Gebäudeausweis, nicht Wohnungsausweis)
- Kosten des Verkaufs (IS24-Tabelle, Homeday-Tabelle, reduco mit GNotKG-Beträgen)
- Spekulationssteuer / steuerfrei? (alle, knapp)
- Mit oder ohne Makler? (alle)
- Vorkaufsrecht Mieter/Nachbarn, übertragbar? (Homeday)
- Unterschied Wohnung vs. Haus, geerbte Wohnung (Homeday)

### 1.5 Zahlen, Fakten, Rechtsgrundlagen (mit Quelle)

**Unterlagen (Listen im Vergleich)**
- anwalt.org (Checkliste): Grundriss, Energieausweis, Teilungserklärung, Grundbuchauszug, Protokolle von Eigentümerversammlungen, Nachweise Feuer- und Gebäudeversicherung, Baubeschreibung, Wohnflächenberechnung, Hausgeldabrechnung, Übersicht der Modernisierungs- und Sanierungsmaßnahmen; bei vermieteten Wohnungen zusätzlich: Nachweis über die Mieteinkünfte, Kopie eines beispielhaften Mietvertrages.
- reduco.ai (12 Unterlagen): Teilungserklärung, Grundbuchauszug, Protokolle der letzten drei Versammlungen, Beschluss-Sammlung, Wirtschaftsplan, Jahresabrechnungen, Vermögensbericht, Nachweis über Sonderumlagen, Hausgeldkonto, Energieausweis, Verwalterbestellung, Wohnflächenberechnung. (Die Überschrift spricht von „7, die nur die Verwaltung hat“, die Tabelle ordnet laut WebFetch 9 Positionen der Verwaltung zu – inkonsistent.)
- ImmoScout24: Grundbuchauszug, Teilungserklärung inkl. Änderungsbeschlüssen, Objektfotos mit Beschreibung, Aufstellung durchgeführter Sanierungen, Grundriss und Bauzeichnungen, Gebäudeversicherungsschein, Kubatur; zusätzlich Einblick in die Beschlusssammlung und „Verkaufserlaubnis der Verwaltung“.
- Homeday (Tabelle mit Bezugsquelle): Grundbuchauszug (max. 3 Monate alt, Amtsgericht); Teilungserklärung mit Aufteilungsplan und Gemeinschaftsordnung (Eigentümer/WEG-Verwaltung); Nachweise über Sanierungen; Bau- und Grundrisszeichnungen (Architekt, Bauträger); Nachweis Gebäudeversicherung (WEG-Verwaltung); aktuelle Wohngeldabrechnung; Protokolle der letzten drei Eigentümerversammlungen; Kubaturberechnung; Energieausweis (WEG-Verwaltung oder Energiedienstleister); Mietvertrag/Mieterhöhungen.

**Verwalterzustimmung § 12 WEG**
- Gesetzestext (dejure.org): „(1) Als Inhalt des Sondereigentums kann vereinbart werden, dass ein Wohnungseigentümer zur Veräußerung seines Wohnungseigentums der Zustimmung anderer Wohnungseigentümer oder eines Dritten bedarf. (2) Die Zustimmung darf nur aus einem wichtigen Grunde versagt werden. … (3) Ist eine Vereinbarung gemäß Absatz 1 getroffen, so ist eine Veräußerung des Wohnungseigentums und ein Vertrag, durch den sich der Wohnungseigentümer zu einer solchen Veräußerung verpflichtet, unwirksam, solange nicht die erforderliche Zustimmung erteilt ist. … (4) Die Wohnungseigentümer können beschließen, dass eine Veräußerungsbeschränkung gemäß Absatz 1 aufgehoben wird.“ Quelle: https://dejure.org/gesetze/WEG/12.html (Fassung WEMoG, in Kraft 01.12.2020)
- reduco.ai: Kosten der Zustimmung – Beglaubigung der Verwalterunterschrift 20–70 €, Verwalternachweis pauschal 20 €, ggf. Sonderhonorar 200–300 €, falls im Verwaltervertrag vereinbart; Verweigerung nur aus wichtigem Grund; keine feste Frist genannt.

**Hausgeld, Rücklage, Sonderumlage (reduco.ai, mit BGH-Zitaten)**
- Sonderumlage: maßgeblich ist die Fälligkeit, nicht der Beschluss (BGH V ZR 257/16, 15.12.2017); Käufer haftet für Sonderumlagen, die nach dem Eigentumswechsel fällig werden.
- Hausgeldrückstände des Voreigentümers: Käufer haftet nicht (BGH V ZR 209/12, 13.09.2013).
- Rücklage: „Sie bekommen Ihren Anteil an der Rücklage nicht ausgezahlt.“ – einpreisen und mit dem Vermögensbericht (§ 28 Abs. 4 WEG) belegen.
- Weitere genannte Normen: § 10 Abs. 1 Nr. 2 ZVG (Vorrecht der WEG in der Zwangsversteigerung), § 16 Abs. 2 WEG (Kostentragung), § 18 Abs. 4 WEG (Einsichtsrecht in Verwaltungsunterlagen), § 19 Abs. 2 Nr. 4 WEG (Rücklage), § 24 Abs. 6/7 WEG (Niederschrift, Beschluss-Sammlung), § 26 WEG (Verwalterbestellung), § 28 WEG (Wirtschaftsplan, Jahresabrechnung, Vermögensbericht), § 29 Abs. 1 GBO, § 311b Abs. 1 S. 1 BGB (Beurkundung), § 448 Abs. 2 BGB (Käufer trägt Beurkundungs-/Grundbuchkosten), § 4 WoFlV (Wohnfläche), § 566 / § 577 / § 577a BGB, § 656a–d BGB, § 23 EStG, § 80/§ 87 GModG.
- Hinweis: Die „3 BFH-Urteile“ zur Rücklage stehen in einem separaten reduco-Artikel (verlinkt), nicht in dieser Seite.

**Zeitangaben**
- reduco.ai: Unterlagen 2–8 Wochen; Preisfindung 1–3 Wochen; Verhandlung/Entwurf 2–6 Wochen; Notartermin bis Geldeingang 4–12 Wochen; „Die Vermarktung dauerte im ersten Quartal 2026 bei Eigentumswohnungen im Schnitt 90 Tage“ (GREIX/IfW Kiel, Durchschnitt aus 24 Städten, nicht bundesweit).
- ImmoScout24: „drei bis fünf Monate“ für die Vermarktung einplanen; in begehrter Lage „ein paar Wochen“; FAQ: „mindestens drei bis vier Monate“.
- Homeday: „sechs bis zwölf Monate“ einplanen.

**Kosten**
- reduco.ai: Käufer trägt Beurkundung, Auflassung, Grundbucheintrag (§ 448 Abs. 2 BGB); Verkäuferseite: Beglaubigung Löschungsbewilligung pauschal 20 €, Grundschuldlöschung 217,50 € (200.000 €) bzw. 342,50 € (350.000 €); Notar/Grundbuch Käuferseite ca. 3.083 € zzgl. Auslagen/USt bei 350.000 €; Vorfälligkeitsentschädigung: 1 %/0,5 %-Deckel gilt „ausdrücklich nur für Allgemein-Verbraucherdarlehensverträge“, nicht für Immobiliardarlehen; Verbrauchsausweis „teilweise schon für knapp unter 100 Euro“ (lt. Verbraucherzentrale).
- ImmoScout24 (Beispiel 200.000 €): Energieausweis 500 €, Wertgutachten 2.000 €, Grundschuldlöschung 400 €, Maklerprovision 3,57 % je Partei = 7.140 €/7.140 €, Notar 2.000 € (Käufer), Grundbuch 1.000 € (Käufer), Grunderwerbsteuer 6,5 % = 13.000 € (Käufer); Summe Verkäufer 10.040 €, Käufer 23.140 €. (Für BW: Grunderwerbsteuer 5 %, siehe 0.3.)
- Homeday (Tabelle): Grunderwerbsteuer 3,5–6,5 % (Käufer); Notar- und Grundbuchkosten ca. 1,5 % (laut Homeday „Verkäufer“ – in der Praxis Käufer, Widerspruch zu IS24/reduco); Maklergebühren üblicherweise je 3,57 % pro Partei; Grundschuldlöschung 0,2 % vom Wert der Grundschuld; Vorfälligkeitsentschädigung/Spekulationssteuer (Verkäufer).
- anwalt.org: Notar/Grundbuch/Grunderwerbsteuer trägt in der Regel der Käufer; seit 23.12.2020 Provision „jeweils zur Hälfte“.

**Preisfaktor Energieklasse (reduco.ai, Sekundärquellen)**
- immowelt (hedonische Analyse 19.03.2026): Preiseffekt gegenüber Klasse D: A+ +20 %, A +15 %, H −9 %.
- ImmoScout24 (Q1 2021–Q4 2025): Wohnungen der Klassen G und H verloren seit 2021 je 12 % pro m².

**Steuer**
- Alle Seiten: 10-Jahres-Frist § 23 EStG, Ausnahme Eigennutzung im Verkaufsjahr und den zwei Vorjahren. ImmoScout24-FAQ nennt „maximal etwa 40 %“ Steuer (persönlicher Steuersatz) – keine Rechtsquelle angegeben.

### 1.6 Lead-Magnete / CTAs
- anwalt.org: Checkliste (PDF), „Was ist Ihre Immobilie wert?“-Box (Partner-Bewertung).
- reduco.ai: kostenlose Immobilienbewertung (3×), „Sanierungspotenzial Ihres Gebäudes entdecken“, Energieberatung in Ihrer Region, Beratung.
- ImmoScout24: Kostenlose Bewertung (5×), „Checkliste Immobilienverkauf“ PDF, eBook, Rechner.
- Homeday: „Jetzt Makler vor Ort finden“, Wohnungsbewertung, Checkliste.

### 1.7 Lücke – was die Rössler-Seite haben muss, was die anderen nicht haben
1. **Lokal konkrete Unterlagenbeschaffung**: Welche Hausverwaltungen in Leonberg/Ditzingen/Renningen/Pforzheim typischerweise welche Fristen und Gebühren für Verwalterzustimmung/Unterlagen nehmen (eigene Erfahrungswerte, als solche kennzeichnen); Grundbuchamt-Zuständigkeit (Amtsgericht Leonberg bzw. Pforzheim – zu verifizieren) und Hinweis, dass der Grundbuchauszug online über das Grundbuchportal BW beantragt werden kann (zu verifizieren).
2. **WEG-Tiefe wie reduco, aber mit Praxisbezug**: Vermögensbericht nach § 28 Abs. 4 WEG als Beleg für die Rücklage; Sonderumlage-Fälligkeit (BGH V ZR 257/16); Hausgeldrückstände (BGH V ZR 209/12). Diese Punkte fehlen bei IS24, Homeday, anwalt.org komplett.
3. **Rechenbeispiel mit regionalen Preisen**: Beispiel-ETW 75 m² in Leonberg (ca. 3.700–4.050 €/m² lt. Portalen, siehe Teil B) → Kaufpreis ≈ 290.000 €; Verkäuferkosten mit 5 % Grunderwerbsteuer (Käufer), Grundschuldlöschung nach GNotKG, Provision 3,57 % je Seite. Keine der Seiten rechnet mit BW-Werten.
4. **Energieausweis als Gebäudeausweis** (WEG beschafft, Verkäufer legt vor; § 80 Abs. 3/4 GModG) – nur reduco hat das; alle anderen sind unpräzise.
5. **Kündigungssperrfrist 5 Jahre in Leonberg/Pforzheim** (KSpVO BW 2026) im Abschnitt „vermietete Wohnung“.
6. **Ehrliche Dauer-Angabe mit Begründung** (IS24: 3–5 Monate, Homeday 6–12, reduco 90 Tage Vermarktung) – eigene Zahl aus der Region nennen, sobald vorhanden; bis dahin die Spanne mit Quellen.
7. **Zielgruppen-Logik für ETW in der Region**: Pendler (S6/S60), Kapitalanleger (Faktor), Senioren (Barrierefreiheit) – mit lokalen Argumenten (siehe Teil B).

---

## Thema 2: Vermietete Wohnung verkaufen (Mieter, § 577 BGB Vorkaufsrecht, Kündigungssperrfrist, Kapitalanleger, Faktor/Rendite)

### 2.1 Suchbegriffe
- „vermietete Wohnung verkaufen Mieter Vorkaufsrecht § 577 BGB Kündigungssperrfrist“
- Nebenbegriffe: „vermietete Eigentumswohnung verkaufen“, „Kapitalanlage verkaufen Eigentumswohnung“, „Umwandlung Eigentumswohnung Mieter Rechte“

### 2.2 Rankende Seiten
| # | URL | Typ | Wortzahl | FAQ | Autor / Datum | Schema |
|---|---|---|---|---|---|---|
| 1 | https://www.immobilienscout24.de/wissen/verkaufen/vermietete-wohnung-verkaufen.html | P | ca. 3.100 | ja | Nadine Kunert; akt. 27.08.2026 | Article, Product/AggregateRating |
| 2 | https://deutschesmietrecht.de/kuendigung/eigentumswohnung-umwandlung-vorkaufsrecht/77-mieterschutz-bei-umwandlung-in-eine-eigentumswohnung.html | R/V (Mietrechtsportal, Mietersicht) | ca. 1.700 | nein | kein Autor/Datum | Article |
| 3 | https://www.immoportal.com/node/100171 („Kapitalanlage verkaufen: Eigentumswohnung richtig veräußern und Rendite sichern“) | P | ca. 1.500 | ja | kein Autor/Datum | – |
| 4 | https://reduco.ai/blog/immobilienverkauf/wohnung-verkaufen-ablauf (Abschnitt „Vermietete Eigentumswohnung: die drei Paragrafen, die zählen“) | D | (Teil von 6.900) | ja | s. o. | FAQPage |
| G | https://www.gesetze-im-internet.de/bgb/__577.html ; https://www.gesetze-im-internet.de/bgb/__577a.html | G | – | – | – | – |
| – | https://www.homeday.de/de/immobilienverkauf/vermietete-wohnung-verkaufen/ | M | **404** | – | – | – |
| – | https://www.mcmakler.de/ratgeber/immobilienverkauf/vermietete-wohnung-verkaufen | M | **403** | – | – | – |
| – | Weitere Treffer: lexetius.com (§ 577a-Text), rechtslupe.de (Sperrfristen-Urteil), bmgev.de (LG Berlin 63 S 356/12) – juristische Einzelquellen |

### 2.3 H-Struktur wörtlich

**ImmoScout24** (Title: „Vermietete Wohnung verkaufen | ImmoScout24“)
- H1: Vermietete Wohnung verkaufen: Was du wissen musst
- H2: Vermietete Wohnung verkaufen: Wie stark mindert ein Mietvertrag den Preis?
  - H3: Wertminderung bei vermieteten Immobilien realistisch einordnen
  - H3: Vermietete Wohnung verkaufen – wann lohnt es sich trotzdem?
  - H3: Wie stark mindert ein Mietvertrag den Verkaufspreis?
- H2: Zielgruppen beim Verkauf: Wer kauft vermietete Immobilien?
  - H3: Kapitalanleger als Hauptzielgruppe für sofortigen Verkauf
  - H3: Eigennutzer – nur bei Perspektive auf Eigennutzung
- H2: Kauf bricht nicht Miete: Rechte und Grenzen beim Verkauf
  - H3: Rechte der Mieter / H3: Kündigung wegen Eigenbedarf / H3: Vermietete Immobilie als Eigenheim verkaufen – geht das?
- H2: Vermietet verkaufen – Vorkaufsrecht der Mieter beachten
- H2: Mit oder ohne Mieter verkaufen: Strategie und Timing
- H2: Verkehrswert ermitteln: Basis für den Verkauf einer vermieteten Immobilie
- H2: Unterlagen für den Immobilienverkauf
- H2: Besichtigung einer vermieteten Wohnung (H3: Rechte und Pflichten bei Besichtigungen / Praxis-Tipp für effiziente Besichtigungen)
- H2: Spekulationssteuer beim Verkauf (H3: Wann fällt Spekulationssteuer an?)
- H2: Fazit: Vermietete Immobilie erfolgreich verkaufen
- H2: FAQ: Häufige Fragen zum Verkauf vermieteter Immobilie

**deutschesmietrecht.de** (Title: „Umwandlung in eine Eigentumswohnung, was passiert jetzt?“)
- H2: Umwandlung in eine Eigentumswohnung, was passiert jetzt? (fungiert als H1)
- H2: Die Umwandlung hat keine Auswirkungen auf das Mietverhältnis
- H2: Das Vorkaufsrecht des Mieters bei erstmaligem Verkauf der Wohnung
  - H3: Wann kann ich ein Vorkaufsrecht geltend machen?
  - H3: Welcher Personenkreis ist vorkaufsberechtigt?
  - H3: Informationspflichten des Vermieters
  - H3: Wie erkläre ich ein Vorkaufsrecht?
  - H3: Muss ich eine Maklerprovision zahlen?
  - H3: Kündigungssperre, wenn der Mieter nicht kaufen will
- H2: Die Wohnungen wurden schon vor Anmietung umgewandelt
  - H3: Kündigungssperre bei Sozialwohnungen

**immoportal.com „Kapitalanlage verkaufen“**
- H1: Kapitalanlage verkaufen: Eigentumswohnung richtig veräußern und Rendite sichern
- H2: Kapitalanlage: Wie hoch ist die Mietrendite bei einer Eigentumswohnung?
- H2: Wohnungsverkauf: Wichtige Unterlagen für Kapitalanleger
- H2: Netto- und Brutto-Mietrendite berechnen
- H2: Marktwert der Eigentumswohnung realistisch ermitteln
- H2: Eigentumswohnung an den Mieter verkaufen – sinnvoll oder Pflicht?
- H2: Wie und wann verkauft sich eine Eigentumswohnung am besten?
- H2: Wie überzeuge ich den Kaufinteressenten?
- H2: Was kostet mich der Wohnungsverkauf?
- H2: Wodurch vermeide ich steuerliche oder finanzielle Nachteile?
- H2: Checkliste: Eigentumswohnung verkaufen
- H2: Vorteile eines Maklers
- H2: FAQ - Verkauf einer Eigentumswohnung (H3: Was ist meine Eigentumswohnung wert? / Muss ich Steuern beim Verkauf einer Eigentumswohnung zahlen? / Ist der Wohnungsverkauf an den Mieter einfacher? / Wie berechne ich Brutto- und Nettomietrendite? / Wie bereite ich eine Wohnungsbesichtigung optimal vor? / Lohnt es sich, kleine Mängel vor dem Verkauf zu beheben?)

### 2.4 Welche Fragen beantwortet werden
- Wie stark mindert der Mietvertrag den Preis? (IS24: 20–30 %)
- Wer kauft vermietete Wohnungen (Kapitalanleger, Faktor)?
- Kauf bricht nicht Miete (§ 566 BGB), Eigenbedarf, Sperrfrist
- Vorkaufsrecht: wann, wer, Frist, Form, Provision (deutschesmietrecht sehr detailliert)
- Mit oder ohne Mieter verkaufen (Timing)
- Besichtigungsrechte gegenüber Mieter
- Spekulationssteuer bei Vermietung
- Mietrendite-Formeln, 20-fache Jahresnettokaltmiete (immoportal)

### 2.5 Zahlen, Fakten, Rechtsgrundlagen
**§ 577 BGB (Vorkaufsrecht des Mieters) – Gesetzestext**: „(1) Werden vermietete Wohnräume, an denen nach der Überlassung an den Mieter Wohnungseigentum begründet worden ist oder begründet werden soll, an einen Dritten verkauft, so ist der Mieter zum Vorkauf berechtigt. Dies gilt nicht, wenn der Vermieter die Wohnräume an einen Familienangehörigen oder an einen Angehörigen seines Haushalts verkauft. … (2) Die Mitteilung des Verkäufers oder des Dritten über den Inhalt des Kaufvertrags ist mit einer Unterrichtung des Mieters über sein Vorkaufsrecht zu verbinden. (3) Die Ausübung des Vorkaufsrechts erfolgt durch schriftliche Erklärung des Mieters gegenüber dem Verkäufer. (4) Stirbt der Mieter, so geht das Vorkaufsrecht auf diejenigen über, die in das Mietverhältnis nach § 563 Abs. 1 oder 2 eintreten. (5) Eine zum Nachteil des Mieters abweichende Vereinbarung ist unwirksam.“ Quelle: https://www.gesetze-im-internet.de/bgb/__577.html

**§ 577a BGB (Kündigungsbeschränkung bei Wohnungsumwandlung) – Gesetzestext**: „(1) Ist an vermieteten Wohnräumen nach der Überlassung an den Mieter Wohnungseigentum begründet und das Wohnungseigentum veräußert worden, so kann sich ein Erwerber auf berechtigte Interessen im Sinne des § 573 Abs. 2 Nr. 2 oder 3 erst nach Ablauf von drei Jahren seit der Veräußerung berufen. (1a) Die Kündigungsbeschränkung nach Absatz 1 gilt entsprechend, wenn vermieteter Wohnraum nach der Überlassung an den Mieter 1. an eine Personengesellschaft oder an mehrere Erwerber veräußert worden ist … (2) Die Frist nach Absatz 1 oder nach Absatz 1a beträgt bis zu zehn Jahre, wenn die ausreichende Versorgung der Bevölkerung mit Mietwohnungen zu angemessenen Bedingungen in einer Gemeinde oder einem Teil einer Gemeinde besonders gefährdet ist und diese Gebiete nach Satz 2 bestimmt sind. Die Landesregierungen werden ermächtigt, diese Gebiete und die Frist nach Satz 1 durch Rechtsverordnung für die Dauer von jeweils höchstens zehn Jahren zu bestimmen. … (3) Eine zum Nachteil des Mieters abweichende Vereinbarung ist unwirksam.“ Quelle: https://www.gesetze-im-internet.de/bgb/__577a.html
- Baden-Württemberg 2026: 5 Jahre in Leonberg und Pforzheim (KSpVO BW, siehe 0.2).

**Fristen/Form Vorkaufsrecht (deutschesmietrecht.de)**
- Ausübungsfrist zwei Monate (§ 469 Abs. 2 BGB i. V. m. § 577 Abs. 1 S. 3 BGB); Mitteilung „unverzüglich nach Abschluss des Kaufvertrags“; Ausübung durch einfache schriftliche Erklärung (§ 577 Abs. 3 BGB), elektronische Form zulässig (§ 126a BGB); keine notarielle Beurkundung nötig.
- Schadensersatz bei schuldhaft falscher/unvollständiger Information: BGH V ZR 137/02 (17.01.2003).
- Mieter zahlt bei Ausübung ebenfalls Maklerprovision (LG Köln 21 S 15/11, 10.01.2012) – Vorkauf zu denselben Bedingungen.
- Untermieter nicht vorkaufsberechtigt; eintretende Ehegatten/Lebenspartner nach § 563 Abs. 1 BGB schon.
- Sozialwohnungen: keine Eigenbedarfskündigung, solange Bindung besteht.
- ImmoScout24 bestätigt: „innerhalb von zwei Monaten“ nach schriftlicher Mitteilung; „Mieter:innen haben das Recht, die Immobilie zu gleichen Bedingungen selbst zu kaufen“; greift nicht bei Häusern oder Verkauf an Familienangehörige.
- immoportal: keine Pflicht zum Verkauf an den Mieter; Kaufvertrag vorlegen und „eine zweimonatige Entscheidungsfrist einräumen“.

**Preisabschlag vermietet vs. frei**
- ImmoScout24-Ratgeber: „einen durchschnittlichen Abschlag zwischen 20 und 30 Prozent“; Leerstand bringt „Aufschläge von 20 bis 30 %“.
- ImmoScout24-Pressemitteilung 10.11.2025 (Angebotsdaten Juli–Okt. 2025, Medianpreise, 42 Städte): A-Städte Ø 21 %; **Stuttgart 12 %**, München 12 %, Berlin 28 %, Köln 26 %, Düsseldorf 25 %, Frankfurt 24 %, Hamburg 22 %; Dresden 33 % (Max.); Karlsruhe 2 %; Heidelberg 22 %; Freiburg 14 %; Mannheim 8 %. Begründung (Dr. Gesa Crockford): vermietete Wohnungen „die Nutzungsmöglichkeiten einschränken“. Quelle: https://www.immobilienscout24.de/unternehmen/news-medien/news/default-title/vermietete-eigentumswohnungen-bis-zu-33-prozent-guenstiger-als-unvermietete/
- Homeday: „eine Preisminderung von bis zu 30 Prozent“; immoportal (Bewertung ETW): „bis zu 30 Prozent höherer Verkaufspreis“ bei freier Wohnung.
- Für Leonberg/Pforzheim: **nicht gefunden** (keine lokale Auswertung).

**Besichtigungsrechte (ImmoScout24)**: „maximal ein Termin pro Woche (ca. zwei Stunden) ist zumutbar“; keine Besichtigungen an Sonn-/Feiertagen ohne Zustimmung; frühzeitige Ankündigung. (Keine Urteilsangabe.)

**Rendite-Formeln (immoportal)**
- „Bruttomietrendite = (monatliche Nettokaltmiete × 12) ÷ Kaufpreis × 100“
- „Nettomietrendite = Jahresnettokaltmiete – nicht umlagefähige Kosten ÷ Anschaffungskosten × 100“
- Attraktiv für Anleger: Nettomietrendite rund 4 %, Bruttomietrendite etwa 5 %; „Wird eine Eigentumswohnung nicht teurer als das 20-Fache der jährlichen Nettokaltmiete angeboten“ → Kapitalanleger-Chance.
- Unterlagen für Kapitalanleger: aktueller Mietvertrag inkl. letzter Mieterhöhung; letzte Betriebskostenabrechnung; Abrechnung der Hausverwaltung; monatliche Nettokaltmiete und BK-Vorauszahlung; aktueller Stand der Instandhaltungsrücklage; übersichtliche Renditeberechnung.
- immoportal-Kostenangaben: Makler 3–7 % zzgl. MwSt.; Notar ca. 1,5 %; Grundbuch ca. 0,5 %; Energieausweis 50–150 €; „Spekulationssteuer bis 25 % des Gewinns“ (fachlich fragwürdig – persönlicher Steuersatz gilt; nicht übernehmen).

**Unterlagen vermietete Wohnung (ImmoScout24)**: Grundbuchauszug (aktuell), Flurkarte/Lageplan, Wohnflächenberechnung/Grundrisse, Energieausweis, Mietvertrag inkl. Nachträge & Mietaufstellung, Nebenkostenabrechnung, letzte Mieterhöhung inkl. Begründung, Modernisierungen (Datum + Nachweise), Wartungen (Heizung, Schornsteinfeger), Versicherungen; bei ETW zusätzlich Teilungserklärung inkl. Aufteilungsplan, Protokolle, Wirtschaftspläne/Jahresabrechnungen, Nachweis Instandhaltungsrücklage, Gemeinschaftsordnung, Beschlusssammlung.

**Steuer**: Datum der notariellen Beurkundung maßgeblich; Verkaufsnebenkosten (Notar, Makler) mindern den Gewinn (IS24).

### 2.6 Lead-Magnete / CTAs
- IS24: „Kostenlose Bewertung starten“ (PDF-Bewertung), „Inserieren“, „Makler:in finden“, „Marktwert berechnen“, „Selbst verkaufen“/„Mit Makler verkaufen“.
- immoportal: Wertrechner, Checkliste als PDF.
- deutschesmietrecht: keine CTAs (Informationsseite, Mieterperspektive).

### 2.7 Lücke – was die Rössler-Seite bieten muss
1. **Ortsbezogene Sperrfrist-Tabelle**: Leonberg 5 J., Pforzheim 5 J., Ditzingen (Widerspruch Mieterbund vs. Verordnung – klären), Renningen 3 J., Heimsheim 3 J.; mit Hinweis auf Verordnungslaufzeit bis 31.12.2026 (Quelle Gesetzblatt). Hat niemand.
2. **Faktor-Rechner mit regionalen Mieten**: Leonberg Ø Miete 15,78 €/m² (wohnungsboerse.net, Ende Mai 2026, lt. Suchergebnis) bzw. „mehr als 13 €/m²“ (IS24-Regional) vs. Kaufpreis Ø 3.733–4.043 €/m² → Faktor ≈ 20–25 – zeigen, was Kapitalanleger in Leonberg/Pforzheim zahlen (Pforzheim: Miete 10,88 €/m² lt. ohne-makler.net-Mietspiegel, Kaufpreis Ø 2.928–3.010 €/m² → Faktor ≈ 22–23). Quellenlage: Portaldaten, Angebotspreise.
3. **Vorkaufsrecht-Ablauf als Prozess mit Fristen** (Mitteilung unverzüglich, 2 Monate, Schriftform, Maklerprovision auch beim Mieter – LG Köln 21 S 15/11) – IS24 ist hier oberflächlich.
4. **Stuttgart-Abschlag 12 % (IS24-PM 2025)** statt pauschal „20–30 %“ – realistischer für die Region, Quelle angeben.
5. **Entscheidungshilfe „an Mieter verkaufen?“** (Vorteile: keine Besichtigungen; Nachteil: Preisanker) – immoportal streift das, kein Makler vertieft.
6. **Checkliste „Mieterunterlagen“ speziell für ETW-Anleger** (immoportal-Liste als Basis, plus Vermögensbericht § 28 Abs. 4 WEG, Rücklagenstand).
7. **Besichtigungen mit Mieter: Musterformulierung** für die Terminabstimmung (keine Quelle nötig, Praxis).

---

## Thema 3: Geerbte Wohnung / Erbimmobilie verkaufen (Erbschein, Grundbuch, Erbengemeinschaft, Erbschaftsteuer, Spekulationsfrist bei Erbe)

### 3.1 Suchbegriffe
- „geerbte Wohnung verkaufen Erbschein Erbengemeinschaft Spekulationsfrist Erbschaftsteuer“
- Nebenbegriffe: „geerbtes Haus verkaufen Steuer“, „Erbimmobilie verkaufen“, „Wohnung geerbt verkaufen“

### 3.2 Rankende Seiten
| # | URL | Typ | Wortzahl | FAQ | Autor / Datum | Schema |
|---|---|---|---|---|---|---|
| 1 | https://www.immobilienscout24.de/wissen/verkaufen/geerbtes-haus-verkaufen-steuer.html | P | ca. 2.600 | ja (FAQPage) | ImmoScout24 Redaktion; akt. 20.08.2026 | Article, FAQPage, Product |
| 2 | https://wohnglueck.de/artikel/geerbtes-haus-verkaufen-70484 | P (Impleco/Immowelt-Nähe) | ca. 3.600 | ja (ohne Schema) | Impleco GmbH; kein Datum | Organization |
| 3 | https://www.immoportal.com/verwalten/erbschaft/geerbtes-haus-verkaufen-fristen-steuern-ablauf-und-kosten | P | ca. 2.200 | ja (FAQPage) | kein Autor/Datum | FAQPage, Product |
| 4 | https://www.aroundhome.de/immobilienverkauf/geerbtes-haus-verkaufen/ | P (Lead-Portal) | ca. 2.500 | ja (FAQPage) | „Immobilienmarkt“-Redaktion; publ. 20.03.2023, akt. 04.09.2026 | Article, FAQPage |
| 5 | https://www.finanztip.de/erbschaftssteuer/ (Erbschaftsteuer allgemein) | V | ca. 3.800 | nein | Jörg Leine; publ. 13.12.2012, akt. 07.08.2026 | Article |
| – | https://nexvyra.de/fakten/geerbte-immobilie-verkaufen-spekulationsfrist-23-estg | D („Faktenseite“) | nicht abgerufen | – | – | – |
| – | https://pandotax.de/?p=4617 | S | nicht abgerufen | – | – | – |
| – | https://www.homeday.de/de/immobilienverkauf/geerbtes-haus-verkaufen/ | M | **404** | – | – | – |

### 3.3 H-Struktur wörtlich

**ImmoScout24** (Title: „Geerbtes Haus verkaufen Steuer: Erbschaftssteuer & Spekulationssteuer - ImmoScout24“)
- H1: Geerbtes Haus verkaufen: Steuern, Vorgehen & Tipps
- H2: Geerbtes Haus verkaufen, vermieten oder selbst nutzen? (H3: Geerbtes Haus verkaufen / vermieten / für private Wohnzwecke nutzen)
- H2: Was ist beim Verkauf des geerbten Hauses zu beachten? (H3: Schritt 1: Wert ermitteln / Schritt 2: Spekulationsfrist beachten / Schritt 3: mit oder ohne Makler? / Schritt 4: Konkrete Verkaufsvorbereitungen)
- H2: Geerbtes Haus verkaufen: Welche Steuern fallen an? (H3: Erbschaftssteuer / Übersicht: Freibeträge / Übersicht: Steuersätze der Erbschaftssteuerklassen / Spekulationssteuer / Grundsteuer und Grunderwerbsteuer)
- H2: Wie ermittelt das Finanzamt den Wert eines geerbten Hauses?
- H2: Geerbtes Haus verkaufen als Erbengemeinschaft: Was beachten?
- H2: FAQ: Häufige Fragen zum Verkauf eines geerbten Hauses

**wohnglück.de** (Title: „Geerbtes Haus verkaufen: Steuern und Fristen beachten“)
- H1: Geerbtes Haus verkaufen: Steuern und Fristen beachten
- H2: Jetzt passenden Makler finden!
- H2: Geerbtes Haus verkaufen: Lohnt sich das? (H3: Option: Erbe ausschlagen / Grundbuch checken / Der Weg zur Bank / Immobilienwert ermitteln / Zurück zum Grundbuch: der Grundbucheintrag)
- H2: Das solltest du vor dem Verkauf einer geerbten Immobilie beachten
- H2: Der Verkauf einer geerbten Immobilie (H3: Verkehrswert schätzen / Gibt es Fristen? / Erbschein, Erbvertrag oder Testament: Diese Dokumente brauchst du)
- H2: Steuern beim Hausverkauf: Das musst du wissen (H3: Spekulationssteuer / Wie hoch ist die Erbschaftssteuer? / Steuerklassen im Überblick)
- H2: Wann ist der Verkauf einer geerbten Immobilie steuerfrei?
- H2: Hausverkauf als Erbengemeinschaft: Das musst du beachten
- H2: Was gilt bei geschenkten Immobilien?
- H2: Geerbtes Haus verkaufen: Kosten im Überblick
- H2: Fazit: Wann lohnt sich der Verkauf aus steuerlicher Sicht?
- H2: Häufig gestellte Fragen zum Thema geerbtes Haus verkaufen

**immoportal.com** (Title: „Geerbtes Haus verkaufen: Fristen, Steuern, Kosten & Tipps“)
- H1: Geerbtes Haus verkaufen: Steuern, Verkehrswert & rechtliche Regeln
- H2: Geerbtes Haus verkaufen, vermieten oder selbst bewohnen? (H3: Selbst einziehen / verkaufen / vermieten)
- H2: Wird für den Verkauf eines geerbten Hauses ein Erbschein benötigt?
- H2: Wer darf das geerbte Haus verkaufen?
- H2: Was ist vor dem Verkauf eines geerbten Hauses zu beachten?
- H2: Welche Steuern fallen beim Verkauf eines geerbten Hauses an? (H3: Wann kann ein geerbtes Haus ohne Spekulationssteuer verkauft werden?)
- H2: Die Bedeutung des Verkehrswerts fürs Finanzamt
- H2: Mit welchen Kosten ist beim Verkauf eines geerbten Hauses zu rechnen?
- H2: Den maximalen Verkaufspreis für das geerbte Haus erzielen
- H2: FAQ - Geerbtes Haus verkaufen (H3: Muss ich ein geerbtes Haus sofort verkaufen? / Kann ich ein geerbtes Haus ohne Grundbucheintrag verkaufen? / Fällt Einkommensteuer an? / Wann fällt Erbschaftsteuer beim Verkauf an? / Verkaufspreis höher als Verkehrswert? / niedriger als Verkehrswert? / Ausland? / Wann kann ich verkaufen?)

**aroundhome.de** (Title: „Geerbtes Haus verkaufen - Ablauf, Fristen, Steuer“)
- H1: Geerbtes Haus verkaufen: Ablauf, Steuern und wichtige Fristen
- H2: Was sollten Sie vor dem Verkauf eines geerbten Hauses klären? (H3: Erbe annehmen oder ausschlagen? / Erbnachweis und Eigentumsverhältnisse klären / Darlehen, Grundschulden und andere Belastungen prüfen)
- H2: Geerbtes Haus verkaufen: Schritt für Schritt (H3: 1. Unterlagen / 2. Zustand und Wert / 3. Angebot und Vermarktung / 4. Kaufinteressierte prüfen / 5. Kaufvertrag, Kaufpreis und Übergabe)
- H2: Geerbtes Haus mit Inventar verkaufen: Was ist zu beachten?
- H2: Haus allein geerbt oder gemeinsam mit anderen Erb:innen verkaufen? (H3: Verkauf als Alleinerb:in / Verkauf durch mehrere Erb:innen)
- H2: Geerbtes Haus privat verkaufen oder Makler beauftragen?
- H2: Welche Steuern fallen beim Verkauf eines geerbten Hauses an? (H3: Erbschaftsteuer beim Erwerb / Spekulationssteuer beim Verkauf)
- H2: Welche Kosten entstehen beim Verkauf eines geerbten Hauses?
- H2: Welche Alternativen gibt es zum Verkauf?
- H2: Häufig gestellte Fragen

**Finanztip Erbschaftssteuer** (Title: „Erbschaftssteuer Rechner 2026: Freibetrag & Tabelle“)
- H1: Erbschaftssteuer Wann zahlst Du auf Dein Erbe Steuern?
- H2: Wie hoch ist Deine Erbschaftssteuer? (Rechner)
- H2: Wie hoch sind bei der Erbschaftssteuer Freibeträge? (H3: Tabelle / Steuerklasse I / 20.000-Euro-Freibetrag / Neffen und Nichten / Wann zahlen? / Schenkungen)
- H2: Welche weiteren Freibeträge gibt es beim Erbe? (H3: Versorgungsfreibetrag … / Pflegefreibetrag / Nachlassverbindlichkeiten / Hausrat / Steuerbefreiung beim Familienheim / Mehr dazu im Ratgeber Erbschaftssteuer Immobilien)
- H2: Wie berechnest Du Deine Erbschaftssteuer selbst? (H3: Steuersätze / knapp über Grenze / Beispiele 1–4)
- H2: Musst Du das Erbe beim Finanzamt melden?
- H2: Aktuelle Verfassungsklagen 2026: was kann sich ändern?
- H2: Was ist mit Betriebsvermögen …? / H2: Wie viel nimmt der Staat …?

### 3.4 Welche Fragen beantwortet werden
- Verkaufen, vermieten oder selbst nutzen?
- Erbe annehmen/ausschlagen (Frist), Erbschein nötig?, Grundbuchberichtigung
- Wer darf verkaufen (Erbengemeinschaft, Einstimmigkeit, Auszahlung, Teilungsversteigerung)
- Erbschaftsteuer (Freibeträge, Steuerklassen, Familienheim)
- Spekulationssteuer bei Erbe (Fußstapfentheorie)
- Finanzamt-Wert vs. Verkaufspreis
- Kosten des Verkaufs; Inventar; Alternativen

### 3.5 Zahlen, Fakten, Rechtsgrundlagen
- **Ausschlagungsfrist**: 6 Wochen (§ 1944 BGB) – wohnglück.
- **Erbschein**: IS24: „Um ein geerbtes Haus zu verkaufen, benötigen Sie nicht zwingend einen Erbschein“ (notariell beurkundetes Testament/Erbvertrag genügt für Grundbuch); wohnglück: handgeschriebenes Testament reicht nicht; Erbschein-Gebühren nach Nachlasswert; Erbscheinantrag = Annahme des Erbes.
- **Grundbuchberichtigung**: „innerhalb der ersten zwei Jahre nach der Erbschaft gebührenfrei“ (wohnglück; Rechtsgrundlage: Nr. 14110 KV GNotKG – auf den Seiten nicht zitiert, **eigene Verifikation nötig**); IS24: „mehrere Wochen“.
- **Erbschaftsteuer-Freibeträge** (IS24, wohnglück, Finanztip übereinstimmend): Ehegatte/eingetr. Lebenspartner 500.000 €; Kinder/Stiefkinder 400.000 €; Enkel (Eltern verstorben) 400.000 €, sonst 200.000 €; Eltern/Großeltern (Erbfall) 100.000 €; Geschwister, Nichten/Neffen, Schwiegerkinder, Sonstige 20.000 €. Finanztip nennt §§ 10, 13 Abs. 1 Nr. 9, 17, 19 ErbStG.
- **Steuersätze** (identisch bei IS24 und wohnglück): bis 75.000 €: 7 / 15 / 30 %; bis 300.000 €: 11 / 20 / 30 %; bis 600.000 €: 15 / 25 / 30 %; bis 6 Mio.: 19 / 30 / 30 %; bis 13 Mio.: 23 / 35 / 50 %; bis 26 Mio.: 27 / 40 / 50 %; darüber 30 / 43 / 50 % (Klasse I / II / III).
- **Familienheim**: IS24: „Wer eine geerbte Immobilie mindestens zehn Jahre selbst bewohnt, kann die Zahlung einer Erbschaftssteuer umgehen“; 200-m²-Grenze (Kinder, § 13 Abs. 1 Nr. 4c ErbStG) nennt aroundhome (lt. Suchergebnis); wohnglück nennt „rund 150 m²“ (falsch/ungenau). Rechtsnorm § 13 Abs. 1 Nr. 4b/4c ErbStG – **auf den Seiten nicht zitiert, direkt im ErbStG verifizieren**.
- **Spekulationsfrist bei Erbe**: § 23 Abs. 1 S. 3 EStG: „Bei unentgeltlichem Erwerb ist dem Einzelrechtsnachfolger … die Anschaffung … durch den Rechtsvorgänger zuzurechnen.“ (Gesetzestext). IS24: „Sie erben sozusagen nicht nur die Immobilie, sondern ebenso auch die Spekulationsfrist.“ Finanztip/steuertipps: Fußstapfentheorie.
- **Miterben auszahlen = teilentgeltlicher Erwerb** (steuertipps.de): „Du willst das Haus behalten und zahlst deiner Schwester 100.000 Euro als Ausgleich.“ → für diesen Anteil neue 10-Jahres-Frist; „Erbanteile beziehen sich immer auf den gesamten Nachlass, nicht auf das einzelne Grundstück“ – Kauf eines Erbanteils löst keine neue Frist aus; Übernahme des Hauses gegen Zahlung = teilweiser Kauf. Quelle: https://www.steuertipps.de/wohnen-haus-vermietung/spekulationssteuer-immobilien/themen
- **Erbengemeinschaft**: Verkauf nur mit Zustimmung aller Miterben, „Ein Mehrheitsbeschluss ist nicht möglich“ (wohnglück); IS24: Teilungsversteigerung „die finanziell schlechteste Lösung“.
- **Finanzamt-Wert**: Erbschaftsteuer nach Verkehrswert (immoportal); BFH 11.03.2026, II R 6/23: ETW primär nach Vergleichswertverfahren, Vergleichspreise des Gutachterausschusses haben Vorrang (Ebner Stolz, 29.06.2026, lt. Suchergebnis; Quelle: https://www.ebnerstolz.de/de/unser-angebot/leistungen/steuerberatung/nachfolgeplanung/vergleichspreise-immobilienbewertung-erbschaft-und-schenkungsteuer-108656.html).
- **Kosten beim Verkauf einer Erbimmobilie** (wohnglück): Haushaltsauflösung, Reparatur/Modernisierung, Wertgutachten, Makler oder private Vermarktung, Grundbuch-/Behördengebühren, Darlehensablösung/Löschung Grundpfandrechte.
- **Schenkung**: alle 10 Jahre Freibetrag nutzbar; Rückforderungsrecht beachten (wohnglück).

### 3.6 Lead-Magnete / CTAs
- IS24: eBook (3×), kostenlose Bewertung, Erbschaftsteuer-Rechner (auf Schwesterseite „Haus schätzen lassen“).
- wohnglück: „Jetzt passenden Makler finden!“, Wert ermitteln, Checkliste.
- immoportal: Wertrechner (mehrfach), FAQ.
- aroundhome: Beratung, kostenlose Bewertung, Kontaktblock.
- Finanztip: Erbschaftsteuer-Rechner (6× erwähnt), Checkliste, Download.

### 3.7 Lücke – was die Rössler-Seite bieten muss
1. **Wohnungs- statt Hausperspektive**: alle Top-Seiten heißen „geerbtes Haus“. Bei einer geerbten ETW kommen hinzu: Hausgeld läuft weiter (Erbengemeinschaft zahlt), Verwalter informieren, Vermögensbericht/Rücklage als Nachlasswert, Verwalterzustimmung, laufender Mietvertrag der ETW. Niemand hat das.
2. **Lokale Zuständigkeiten**: Nachlassgericht (Amtsgericht Leonberg für Leonberg/Renningen/Heimsheim? – **prüfen**; Amtsgericht Pforzheim; Amtsgericht Ludwigsburg für Ditzingen? – **prüfen**), Grundbuchamt (in BW zentralisiert bei Amtsgerichten – **prüfen**), Finanzamt Leonberg / Pforzheim für Erbschaftsteuer-Anzeige (Zuständigkeit Erbschaftsteuer in BW: Finanzämter mit zentraler Zuständigkeit – **prüfen**).
3. **Ablaufplan mit Fristen**: 6 Wochen Ausschlagung; 3 Monate Anzeigepflicht beim Finanzamt (§ 30 ErbStG – auf den Seiten nicht erwähnt, verifizieren); 2 Jahre gebührenfreie Grundbuchberichtigung; Fußstapfen-Frist. 
4. **Teilentgeltlicher Erwerb-Warnung** (Geschwister auszahlen → neue Frist) – nur steuertipps hat das; Makler nennen es nicht.
5. **Rechenbeispiel Erbschaftsteuer mit regionalem ETW-Wert** (z. B. 300.000 € ETW an Kind: Freibetrag 400.000 € → 0 €; an Nichte: 20.000 € Freibetrag, 280.000 € × 20 % (Klasse II bis 300.000 €) = 56.000 €).
6. **BFH II R 6/23 (2026)**: Finanzamt bewertet ETW nach Vergleichswerten des Gutachterausschusses → Hinweis auf Gutachterausschuss Leonberg / Enzkreis / Pforzheim als lokale Quelle.
7. **Mediation statt Teilungsversteigerung**: Angebot, Erbengemeinschaften durch eine neutrale Bewertung zu befrieden (Makler als Moderator) – wohnglück empfiehlt „neutrale Vermittlungsperson“, kein Makler positioniert sich so.


---

## Thema 4: Immobilie bei Scheidung / Trennung (Zugewinn, Teilungsversteigerung, Verkauf an Ex-Partner)

### 4.1 Suchbegriffe
- „Immobilie bei Scheidung Zugewinn Teilungsversteigerung Verkauf an Ex-Partner“
- Nebenbegriffe: „Haus bei Scheidung“, „Hausverkauf bei Scheidung“, „Teilungsversteigerung Scheidung“, „Verkaufserlös Scheidung Verteilung“

### 4.2 Rankende Seiten
| # | URL | Typ | Wortzahl | FAQ | Autor / Datum | Schema |
|---|---|---|---|---|---|---|
| 1 | https://www.immobilienscout24.de/wissen/verkaufen/verteilung-verkaufserloes-immobilie-bei-scheidung.html | P | ca. 1.000 | nein | ImmoScout24 Redaktion; akt. 20.08.2026 | Article |
| 2 | https://www.homeday.de/de/immobilienverkauf/haus-und-scheidung/ | M | ca. 3.300 | ja | kein Autor/Datum | BreadcrumbList |
| 3 | https://www.kanzlei-hasselbach.de/blog/teilungsversteigerung-bei-scheidung/ | R | ca. 2.900 | nein | Kanzlei Hasselbach; publ. 16.05.2024 | LocalBusiness, Person |
| 4 | https://kanzlei-herfurtner.de/immobilienteilung-scheidung-regelung/ | R | nicht abgerufen | – | – | – |
| 5 | https://www.transparent-beraten.de/immobilienteilverkauf/bei-scheidung/ | D (Teilverkauf-Vermittler) | nicht abgerufen | – | – | – |
| 6 | https://rechtecheck.de/scheidung-haus-immobilie/ | R | nicht abgerufen | – | – | – |
| – | https://www.mcmakler.de/ratgeber/immobilienverkauf/hausverkauf-bei-scheidung | M | **403** | – | – | – |
| – | Finanztip „Haus Scheidung“ | V | **404 / kein Ratgeber gefunden** (nur Forenthreads) | – | – | – |
| – | https://www.biallo.de/baufinanzierung/ratgeber/scheidung-haus/ ; https://www.jacasa.de/ratgeber/verkauf/hausverkauf-bei-scheidung | S / P | nicht abgerufen (jacasa blockt Bots) | – | – | – |

### 4.3 H-Struktur wörtlich

**ImmoScout24** (Title: „Immobilienverkauf bei Scheidung: Wie wird der Verkaufserlös verteilt?“)
- H1: Wie wird der Verkaufserlös der gemeinsamen Immobilie bei einer Scheidung verteilt?
- H2: Das Wichtigste in Kürze
- H2: Direkt zum Wunschthema
- H2: Wie erfolgt die Aufteilung bei einem Verkauf?
  - H3: Was ist zu beachten, wenn ein Ehepartner das Haus übernimmt?
  - H3: Was passiert, wenn der eine Ehegatte nicht veräußern möchte?
  - H3: Was bedeutet Zugewinnausgleich?
- H2: Was ist bei einer Teilungsversteigerung zu beachten?

**Homeday** (Title: „Haus bei Scheidung: Was passiert mit der Immobilie? | Homeday“)
- H1: Haus bei Scheidung: Was passiert bei einer Trennung mit der Immobilie?
- H2: Was passiert bei einer Scheidung mit dem Haus?
- H2: Welche Rolle spielen Güterstand und Zugewinnausgleich bei einer Scheidung mit Haus?
- H2: Wie werden die Eigentumsanteile eines Hauses bei der Scheidung übertragen?
- H2: Scheidung und Haus: Was ist im Hinblick auf Kinder und die familiären Bedürfnisse zu bedenken?
- H2: Scheidung mit Haus – Wann kommt es zur Teilungsversteigerung?
- H2: Was gilt es steuerlich zu beachten?
- H2: Wertermittlung bei Scheidung: So wird der Immobilienwert ermittelt
- H2: Was, wenn der Immobilienkredit bei der Scheidung mit Haus noch nicht abbezahlt ist?
- H2: Umgang mit Wohnrecht, Nießbrauch und Nutzungsrecht bei Scheidung
- H2: Haus bei Scheidung – FAQ
- H2: Lesen Sie jetzt:

**Kanzlei Hasselbach** (Title: „Teilungsversteigerung bei Scheidung: Ablauf - Kosten – Tricks | Kanzlei Hasselbach“)
- H1: Teilungsversteigerung bei Scheidung: Ablauf – Kosten – Tricks
- H2: 1. Was versteht man unter einer Teilungsversteigerung?
- H2: 2. Wann kommt eine Teilungsversteigerung bei Scheidung in Betracht?
- H2: 3. Wer kann eine Teilungsversteigerung beantragen? (H3: Ab Rechtskraft der Scheidung / Vor Abschluss des Scheidungsverfahrens)
- H2: 4. Ablauf einer Teilungsversteigerung (H3: Antrag / Vorübergehende Einstellung / Verkehrswert durch Sachverständigengutachten / Festlegung des Mindestgebots / Bekanntgabe des Versteigerungstermins / Versteigerungstermin / Verteilung des Erlöses)
- H2: 5. Kann die Teilungsversteigerung verhindert oder verzögert werden?
- H2: 6. Typische Tricks bei einer Teilungsversteigerung
- H2: 7. Dürfen die beteiligten Eheleute bei einer Teilungsversteigerung mitbieten?
- H2: 8. Welche Kosten entstehen bei einer Teilungsversteigerung? (H3: Gerichtskosten / Anwaltskosten)
- H2: 9. Fazit

### 4.4 Welche Fragen beantwortet werden
- Wie wird der Erlös verteilt (50/50, Kredit zuerst)?
- Übernahme durch einen Partner: Bank, Kreditentlassung, Auszahlung
- Was, wenn einer nicht verkaufen will? (§ 1365 BGB, Teilungsversteigerung)
- Zugewinnausgleich: Definition, Geldanspruch
- Teilungsversteigerung: Voraussetzungen, Ablauf, Einstellung (§ 180 ZVG), 5/10-Grenze, Kosten, Dauer, Tricks, Mitbieten
- Steuern: Spekulationssteuer bei Übertragung an Ex-Partner, Grunderwerbsteuer-Befreiung
- Wohnrecht/Nießbrauch in der Scheidung
- Kinder/Nutzungsentschädigung (Homeday streift; cash-online: hälftige ortsübliche Miete als Nutzungsentschädigung lt. Suchergebnis)

### 4.5 Zahlen, Fakten, Rechtsgrundlagen
- **Erlösverteilung** (IS24): „Beide Ehepartner erhalten beim Verkauf jeweils 50 Prozent des Erlöses.“ / „Als Erstes werden eventuell auf der Immobilie lastende Kredite zurückgezahlt.“ / „Der Zugewinnausgleich muss berücksichtigt werden.“ – unabhängig davon, wer mehr investiert hat.
- **Zugewinn** (IS24): „Der Zugewinn ist die Differenz, die sich zwischen dem Endvermögen bei Scheidung“ und dem Anfangsvermögen ergibt; Ausgleich nur auf Antrag beim Familiengericht; Geldanspruch. Homeday: „Gibt es in einer Ehe keinen Ehevertrag, leben die Partner automatisch in einer Zugewinngemeinschaft.“ / „Der Anspruch auf Zugewinnausgleich erfolgt immer als Geldzahlung.“ (Normen §§ 1363 ff., 1373 ff. BGB – von den Seiten nicht zitiert.)
- **Verfügungsbeschränkung**: In der Zugewinngemeinschaft darf ein Ehegatte seinen Anteil nicht ohne Zustimmung des anderen veräußern (IS24, sinngemäß § 1365 BGB); Hasselbach: Zustimmung nötig, wenn die Immobilie nahezu das gesamte Vermögen ausmacht (§ 1365 BGB), gerichtlich ersetzbar; Risiko vorgezogener Zugewinnausgleich (§ 1385 Nr. 2 BGB).
- **Hauswert-Beispiel** (Homeday): Wert 300.000 €, Schulden 120.000 € → 180.000 € / 2 = 90.000 € Auszahlung.
- **Grunderwerbsteuer**: Übertragung zwischen Ehegatten steuerfrei (Homeday, ohne Normzitat; Rechtsgrundlage § 3 Nr. 4 GrEStG bzw. § 3 Nr. 5 GrEStG für Vermögensauseinandersetzung nach Scheidung – **auf den Seiten nicht belegt, verifizieren**).
- **Kredit** (Homeday): „Bei Scheidung Haus bleibt der Kredit bindend. Die Bank hält beide Schuldner fest, bis neue Verträge unterschrieben sind.“ IS24: Bank informieren, ausscheidender Partner muss aus Kreditvertrag.
- **Teilungsversteigerung** (Hasselbach): nach Rechtskraft jeder Miteigentümer ohne Zustimmung; Antrag Amtsgericht; Antragsgebühr 110 €; Einstellungsantrag binnen 2 Wochen ab Zustellung; Einstellung nach § 180 Abs. 2 ZVG max. 6 Monate, einmal verlängerbar; § 180 Abs. 3 ZVG bei Kindeswohlgefährdung, wiederholbar; insgesamt max. 5 Jahre; 5/10-Grenze (Hälfte des Verkehrswerts) im ersten Termin, entfällt im zweiten; Gerichtskosten je Abschnitt 0,5-Gebühr – Beispiel 500.000 €: 1.950,50 € je Abschnitt, gesamt 5.851,50 €; Auslagen bis ca. 1.500 €; Gutachten bis ca. 5.000 €; Anwalt-Beispiel 1.142,88 € (0,4-Gebühr) bzw. 2.821,20 € (1,2); Dauer ca. ein Jahr; beide dürfen mitbieten (volle Liquidität nötig). IS24: Einwände binnen 2 Wochen, Ruhen 6 Monate; Erlös geringer als bei regulärem Verkauf (kein Prozentsatz).
- **Steuern** (Homeday): Spekulationssteuer kann anfallen, wenn die Immobilie „bei einer Scheidung oder Gütertrennung auf einen Ehepartner übertragen wird“ (Verkauf des Miteigentumsanteils an Ex-Partner = Veräußerung innerhalb 10 Jahren, sofern keine Eigennutzung; BFH IX R 11/23 vom 14.02.2023 zur Veräußerung des Miteigentumsanteils nach Auszug – **nicht auf den Seiten, aber relevant; verifizieren**).
- **Wohnrecht/Nießbrauch** (Homeday): § 1093 BGB bzw. § 1030 BGB; beide mindern den Verkaufspreis.
- Homeday-Normen im Text: § 1030, § 1093, § 1361b BGB (Ehewohnung bei Getrenntleben), §§ 22/23 EStG.

### 4.6 Lead-Magnete / CTAs
- IS24: eBook (3×). Homeday: Wert ermitteln, kostenlose Immobilienbewertung, Beratung. Hasselbach: Rechner (4×), Beratung/Kontaktformular, Standorte. transparent-beraten.de: Teilverkauf-Vergleich (Lead).

### 4.7 Lücke – was die Rössler-Seite bieten muss
1. **ETW statt Haus**: Bei einer gemeinsamen Eigentumswohnung: Hausgeld-Zahlung in der Trennungszeit, wer trägt Sonderumlage, Verwalter-Kommunikation, Mieteinnahmen bei vermieteter ETW als Zugewinn-/Unterhaltsfaktor. Keine Seite behandelt die ETW.
2. **Neutrale Wertermittlung als Streitvermeider**: Positionierung „ein gemeinsam beauftragter Wert, den beide Anwälte akzeptieren“ (Hasselbach: Privatgutachten wird im Verfahren akzeptiert, wenn beide zustimmen).
3. **Lokaler Verfahrensweg**: zuständiges Amtsgericht (Vollstreckungsgericht) für Leonberg/Renningen/Heimsheim/Ditzingen/Pforzheim – **zu prüfen** (Amtsgericht Leonberg, Amtsgericht Pforzheim, Amtsgericht Ludwigsburg für Ditzingen, Amtsgericht Maulbronn/Pforzheim für Heimsheim?), Familiengericht.
4. **Zahlenbeispiel Teilungsversteigerung vs. freier Verkauf** mit Hasselbach-Kosten (5.851,50 € Gerichtskosten bei 500.000 € + Gutachten + Anwalt) und regionalem ETW-Preis.
5. **Steuerfalle beim Verkauf an den Ex-Partner** (Miteigentumsanteil innerhalb 10 Jahren, Auszug = keine Eigennutzung mehr) – Homeday nur andeutungsweise, IS24 gar nicht.
6. **Grunderwerbsteuer-Befreiung bei Ehegattenübertragung** (§ 3 Nr. 4/5 GrEStG) korrekt zitieren – Homeday ohne Norm.
7. **Checkliste „Was in den 3 Monaten nach Trennung zu klären ist“** (Hausgeld, Kredit, Bank informieren, Wert, Ehewohnung § 1361b).

---

## Thema 5: Spekulationssteuer / Spekulationsfrist (§ 23 EStG, Eigennutzung-Ausnahme, Drei-Objekt-Grenze)

### 5.1 Suchbegriffe
- „Spekulationssteuer Immobilie § 23 EStG Spekulationsfrist Eigennutzung Drei-Objekt-Grenze“
- „finanztip Spekulationssteuer Immobilie verkaufen“
- Nebenbegriffe: „Spekulationsfrist Beginn“, „Spekulationsfrist Berechnung“, „Spekulationssteuer Rechner“

### 5.2 Rankende Seiten
| # | URL | Typ | Wortzahl | FAQ | Autor / Datum | Schema |
|---|---|---|---|---|---|---|
| 1 | https://www.finanztip.de/spekulationssteuer-immobilienverkauf/ | V | ca. 3.600 | nein | Jörg Leine; publ. 13.12.2012, akt. 09.07.2026 | Article |
| 2 | https://www.immobilienscout24.de/wissen/verkaufen/spekulationssteuer.html | P | ca. 3.100 | ja (FAQPage) | Nadine Kunert; akt. 15.09.2026 | Article, FAQPage, VideoObject |
| 3 | https://www.steuertipps.de/wohnen-haus-vermietung/spekulationssteuer-immobilien/themen | S (Akademische Arbeitsgemeinschaft) | ca. 1.400 | ja | kein Autor/Datum | – |
| 4 | https://www.drklein.de/finanzlexikon/spekulationssteuer-bei-immobilien.html | S (Finanzvertrieb) | ca. 1.000 | nein | Viviane Ohlinger; publ. 02.07.2024, akt. 14.08.2024 | Article |
| 5 | https://www.bodenrichtwerte-deutschland.de/immobilienwissen/spekulationssteuer | D | nicht abgerufen | – | – | – |
| 6 | https://steuerberater-tabak.com/steuerrechner/spekulationssteuer/ | S (Rechner) | nicht abgerufen | – | – | – |
| G | https://www.gesetze-im-internet.de/estg/__23.html | G | – | – | – | – |
| – | Weitere IS24-Seiten: /spekulationsfrist.html, /beginn-spekulationsfrist.html, /spekulationsfrist-berechnung.html (Themencluster!) |

### 5.3 H-Struktur wörtlich

**Finanztip** (Title: „Spekulationssteuer Immobilien & wie Du sie vermeidest“)
- H1: Spekulationssteuer Immobilien So vermeidest Du Steuern beim Immobilienverkauf
- H2: Wann musst Du Spekulationssteuer zahlen? (H3: Was zählt als Immobilie im Steuerrecht?)
- H2: Was ist bei Selbstnutzung der Immobilie? (H3: Wann ist eine Immobilie selbst genutzt? / Warum reichen ein Jahr und zwei Tage der Selbstnutzung? / Was gilt bei einer Zweit- oder Ferienwohnung? / Welche Ausnahmeregelung gibt es für Kinder? / Wann ist eine Immobilie nicht selbst genutzt?)
- H2: Was ist die Spekulationsfrist? (H3: Wie wird die Spekulationsfrist ermittelt? / Was ist mit der Spekulationsfrist bei einem Erbe?)
- H2: Was machst Du mit Verlusten beim Verkauf einer Immobilie? (H3: Wie berechnest Du Gewinne und Verluste …? / Wie sieht die Berechnung konkret aus? / Wie lässt sich ein Verlust verrechnen?)
- H2: Wie hoch ist die Spekulationssteuer? (H3: Gibt es einen Freibetrag bei der Spekulationssteuer?)
- H2: Wie kannst Du beim Hausverkauf noch Steuern sparen? (H3: Inventar / Arbeitszimmer / Vorab-Schenkung in der Familie / Enteignung)
- H2: Wo ist die Spekulationssteuer in der Steuererklärung? (H3: Wo findest Du mehr zur Steuersoftware?)

**ImmoScout24** (Title: „Spekulationssteuer bei Immobilien: Höhe und Frist | ImmoScout24“)
- H1: Spekulationssteuer beim Immobilienverkauf: Fristen, Ausnahmen und Berechnung
- H2: Muss ich Spekulationssteuer zahlen?
- H2: Was ist die Spekulationssteuer?
- H2: Wie entsteht die Spekulationssteuer? (H3: Ein Beispiel:)
- H2: Spekulationsfrist oder wann muss ich Spekulationssteuer zahlen?
- H2: Wie hoch ist die Spekulationssteuer? (H3: Wie wird die Steuerlast berechnet? / Spekulationssteuer berechnen: so gehst du vor / Spekulationssteuer Rechner … / Was passiert mit der Spekulationsfrist bei Schenkung oder Erbschaft? / Freibeiträge bei Erbschaft und Schenkung / Spekulationssteuer bei unbebauten Grundstücken / Gewerblicher Immobilienhandel / Spekulationssteuer auf Auslandsimmobilien / Spekulationsfrist bei Neubau: Welches Datum zählt?)
- H2: Fazit: Wann beim Immobilienverkauf Steuern anfallen
- H2: FAQ: Häufige Fragen zu Spekulationsfrist und Spekulationssteuer

**steuertipps.de** (Title: „Spekulationssteuer Immobilien: Frist & Regeln einfach erklärt“)
- H1: Spekulationssteuer Immobilien: Frist & Regeln einfach erklärt
- H2: Spekulationssteuer Immobilien: Frist, Regeln und wie du steuerfrei verkaufst
- H2: Was genau gilt bei der Spekulationssteuer?
- H2: Frist, Eigennutzung und Sonderfälle
- H2: Teilentgeltlicher Erwerb: Warum hier oft eine (anteilige) Steuer anfällt
- H2: Fußstapfentheorie
- H2: Erbanteile & Ausgleichszahlungen
- H2: Berechnung: Gewinn, Kosten und Steuersatz
- H2: Teilentgeltlichen Erwerb vermeiden (rechtssicher gestalten)
- H2: Das Wichtigste zur Spekulationssteuer auf Immobilien in Kürze
- H2: Häufige Fragen zur Spekulationssteuer bei Immobilien (H3: Wann fällt bei Immobilien überhaupt Spekulationssteuer an? / Kann ich eine Immobilie auch vor Ablauf der zehn Jahre steuerfrei verkaufen? / Was passiert steuerlich, wenn ich meine Geschwister beim Erben auszahle?)

**Dr. Klein** (Title: „Spekulationssteuer bei Immobilien: Wann fällt sie an?“)
- H1: Spekulationssteuer bei Immobilien: Wann fällt sie an und wie hoch ist sie?
- H2: Was ist die Spekulationssteuer bei Immobilien?
- H2: Wann fällt keine Spekulationssteuer bei einem Immobilienverkauf an?
- H2: Wann fällt eine Spekulationssteuer bei einem Immobilienverkauf an?
- H2: Wie hoch ist die Spekulationssteuer bei einem Immobilienverkauf?
- H2: Wie wird die Spekulationssteuer bei Immobilien berechnet?
- H2: Fällt eine Spekulationssteuer bei einem Erbe oder Schenkung an?
- H2: Baufinanzierung zu günstigen Konditionen (CTA)

### 5.4 Welche Fragen beantwortet werden
- Wann fällt die Steuer an (10 Jahre, Datum Notarvertrag)?
- Eigennutzungsausnahme (Verkaufsjahr + 2 Vorjahre; „ein Jahr und zwei Tage“)
- Kinder-Ausnahme, Zweit-/Ferienwohnung, Arbeitszimmer
- Erbe/Schenkung (Fußstapfen), teilentgeltlicher Erwerb
- Gewinnberechnung inkl. AfA-Hinzurechnung, Freigrenze, Verlustverrechnung
- Gewerblicher Grundstückshandel (Drei-Objekt-Grenze) – nur IS24 als H3 „Gewerblicher Immobilienhandel“
- Steuererklärung (Anlage SO)

### 5.5 Zahlen, Fakten, Rechtsgrundlagen
- **§ 23 Abs. 1 S. 1 Nr. 1 EStG** (Gesetzestext): „Veräußerungsgeschäfte bei Grundstücken …, bei denen der Zeitraum zwischen Anschaffung und Veräußerung nicht mehr als zehn Jahre beträgt. … Ausgenommen sind Wirtschaftsgüter, die im Zeitraum zwischen Anschaffung oder Fertigstellung und Veräußerung ausschließlich zu eigenen Wohnzwecken oder im Jahr der Veräußerung und in den beiden vorangegangenen Jahren zu eigenen Wohnzwecken genutzt wurden“. Gebäude/Eigentumswohnungen einbezogen (S. 2). Quelle: https://www.gesetze-im-internet.de/estg/__23.html
- **§ 23 Abs. 1 S. 3 EStG**: unentgeltlicher Erwerb → Anschaffung des Rechtsvorgängers wird zugerechnet (Fußstapfen).
- **§ 23 Abs. 3 EStG**: Gewinn = Veräußerungspreis − Anschaffungs-/Herstellungskosten − Werbungskosten; AfA mindert die Anschaffungskosten (S. 4) → erhöht den Gewinn; Freigrenze „weniger als 1 000 Euro“ (S. 5); Verluste nur mit Gewinnen aus privaten Veräußerungsgeschäften verrechenbar, kein § 10d-Abzug (S. 7).
- **Finanztip** (Stand 09.07.2026): „Weil das keine kompletten Kalenderjahre sein müssen, reichen schon ein Jahr und zwei Tage der Selbstnutzung“; Kinder-Ausnahme (Kindergeld/Kinderfreibetrag, unentgeltliche Überlassung) – FG Baden-Württemberg 8 K 2166/14 (04.04.2016): „Sobald es kein Kindergeld mehr gibt, ist ein Veräußerungsgewinn steuerpflichtig.“; Zweitwohnung: BFH IX R 37/16 (27.06.2017) – jederzeit nutzbar und nicht vermietet = selbst genutzt (Sylt, 2,1 Mio. € steuerfrei); Arbeitszimmer: BFH IX R 27/19 (01.03.2021) – anteiliger Gewinn steuerfrei; Vorab-Schenkung an Kinder: BFH IX R 8/20 (23.04.2021) – kein Gestaltungsmissbrauch (§ 42 AO); Enteignung: BFH IX R 28/18 (23.07.2019) – keine Veräußerung; weitere Az.: BFH IX R 10/19 (03.09.2019), FG Münster 5 K 2493/18 E (03.08.2020). Beispiel „Dennis“: Kaufpreis 270.000 € + Nebenkosten 19.000 €, Verkauf 340.000 €, Verkaufskosten 11.000 € → Gewinn 40.000 €. Anlage SO Seite 2, für 2025 Zeilen 34–43, Zeile 66 Verlustrücktrag-Verzicht. Freigrenze 1.000 € (bis 2023: 600 €).
- **ImmoScout24**: Datum des notariellen Kaufvertrags maßgeblich, nicht Grundbucheintrag; Eigennutzung „Hauptwohnsitz gemeldet“ (eigene Auslegung); Rechner-Widget; H3 „Gewerblicher Immobilienhandel“: mehr als drei Objekte in fünf Jahren → Gewerbesteuer-Risiko.
- **steuertipps.de**: Teilentgeltlicher Erwerb (Geschwister auszahlen) → neue Frist für den entgeltlichen Teil; Erbanteilskauf ≠ Grundstückskauf; Gestaltung: Vermächtnis ohne Ausgleichszahlung, Zahlungen/Schuldübernahmen vermeiden, „Lass deine Veräußerung vor dem Notartermin steuerlich checken“. Keine Aktenzeichen.
- **Drei-Objekt-Grenze**: Richterrecht des BFH (gewerblicher Grundstückshandel, § 15 EStG; BMF-Schreiben vom 26.03.2004 – **in den Seiten nicht zitiert, verifizieren**); IS24 und VR-Bank (vr.de) erwähnen das Risiko ohne Normzitat.
- **Steuersatz**: persönlicher Einkommensteuersatz (alle); IS24-FAQ „maximal etwa 40 %“ (unpräzise; Spitzensteuersatz 42 %/45 % + Soli – nicht übernehmen ohne Prüfung).

### 5.6 Lead-Magnete / CTAs
- Finanztip: keine Lead-CTAs (Steuersoftware-Empfehlungen, Newsletter). IS24: Rechner (9×), eBook, kostenlose Bewertung. steuertipps: keine. Dr. Klein: Baufinanzierungs-Beratung, eBook.

### 5.7 Lücke – was die Rössler-Seite bieten muss
1. **ETW-spezifische Berechnung**: Rücklagenanteil ist bei Erwerb kein Teil der Anschaffungskosten (ecovis-Hinweis lt. Suchergebnis; BFH-Rechtsprechung zur Instandhaltungsrücklage – reduco verlinkt „3 BFH-Urteile“) → beim Verkauf: Rücklagenanteil aus Veräußerungspreis herausrechnen. Hat kein Portal.
2. **Rechenbeispiel mit regionalem Wert**: ETW Leonberg 2018 gekauft 250.000 €, 2026 verkauft 310.000 €, vermietet (AfA 2 % p. a. hinzurechnen), Verkaufskosten → Gewinn → Steuer bei 35 % Grenzsteuersatz; und das gleiche Beispiel bei Eigennutzung (steuerfrei). 
3. **Fristenrechner als interaktives Tool** (Kaufvertragsdatum eingeben → frühester steuerfreier Verkaufstermin) – IS24 hat Rechner, Makler-Websites nicht.
4. **Die drei Sonderfälle, die in der Region häufig sind**: Erbe (Fußstapfen), Scheidung (Verkauf des Miteigentumsanteils), Pendler-Zweitwohnung in Stuttgart (BFH IX R 37/16).
5. **Klare Trennung**: Spekulationssteuer (privat) vs. gewerblicher Grundstückshandel (Drei-Objekt-Grenze) – kurzer Abschnitt mit Quelle, keine Panikmache.
6. **Hinweis Steuerberater-Kooperation vor Ort** (Leonberg/Pforzheim) statt eigener Beratung (§ 5 StBerG-Grenze) – vertrauensbildend.

---

## Thema 6: Maklerprovision / Maklerkosten (§ 656a ff. BGB seit 12/2020, übliche Sätze BW, Widerrufsrecht Maklervertrag, Alleinauftrag)

### 6.1 Suchbegriffe
- „Maklerprovision Baden-Württemberg Höhe § 656c BGB Provisionsteilung Widerrufsrecht Maklervertrag“
- „finanztip Maklerprovision Immobilienverkauf“ (kein Finanztip-Ratgeber gefunden; Finanztip-URL /maklerprovision/ leitet auf Übersichtsseite „Mietrecht & Sonstiges“)
- Nebenbegriffe: „Maklergebühren Hausverkauf“, „Courtage“, „Maklerprovision wer zahlt“

### 6.2 Rankende Seiten
| # | URL | Typ | Wortzahl | FAQ | Autor / Datum | Schema |
|---|---|---|---|---|---|---|
| 1 | https://www.immobilienscout24.de/wissen/verkaufen/maklerprovision.html | P | ca. 2.600 | ja (FAQPage) | Nadine Kunert; akt. 09.09.2026 | Article, FAQPage |
| 2 | https://www.homeday.de/de/immobilienverkauf/maklerprovision/ | M | ca. 3.700 | ja | kein Autor/Datum | BreadcrumbList |
| 3 | https://www.immoverkauf24.de/immobilienmakler/maklerprovision/ | P | ca. 3.700 | ja (FAQPage) | Jasmin Löhr; publ. 25.11.2011, akt. 23.07.2026 | FAQPage, Organization |
| 4 | https://www.ihk.de/bodensee-oberschwaben/branchen/vermittlergewerbe/makler-und-bautraeger/neue-gesetzliche-regelungen-fuer-immobilienmakler-4982344 | V/Behörde (IHK) | ca. 1.200 | nein | kein Datum | Person |
| 5 | https://www.vzbv.de/urteile/zur-maklerprovision-nach-widerruf ; https://www.otto-schmidt.de/blog/… (BGH-Besprechung) | V / R | nicht abgerufen | – | – | – |
| 6 | https://dserver.bundestag.de/btd/19/158/1915827.pdf (Gesetzentwurf BT-Drs. 19/15827) | G | nicht abgerufen | – | – | – |
| – | test.de „Hauskauf: Vorsicht vor dem Makler“ (2012) – veraltet |
| G | https://www.gesetze-im-internet.de/bgb/__656a.html … __656d.html | G | – | – | – | – |

### 6.3 H-Struktur wörtlich

**ImmoScout24** (Title: „Maklerprovision 2026: Höhe, Berechnung & wer zahlt | ImmoScout24“)
- H1: Maklerprovision beim Immobilienverkauf: Wer zahlt?
- H2: Was sind die Voraussetzungen für die Maklerprovision?
- H2: Provision oder Courtage – beides geht
- H2: Neues Gesetz zur Maklerprovision bei Immobiliengeschäften
- H2: Wie wird das Bestellerprinzip im neuen Gesetz zur Provision umgesetzt?
- H2: Bei welchen Verträgen findet das neue Provisionsgesetz Anwendung?
- H2: Wie hoch ist die Maklerprovision beim Immobilienverkauf? (H3: Rechenbeispiel / Provisionsrechner Verkauf – Bundeslandauswahl)
- H2: Wann ist eine Maklerprovision fällig?
- H2: Wann ist eine Maklerprovision unzulässig?
- H2: Ist ein Hausverkauf auch provisionsfrei möglich?
- H2: Fazit: Was muss ich zur Maklerprovision beim Immobilienverkauf wissen?
- H2: FAQ: Häufige Fragen zur Maklerprovision („Wie viel ist 3,57 % Käuferprovision?“ / „Ist eine Käuferprovision von 7,14 % üblich?“ / „Kann ich die Maklerprovision verhandeln?“ / „Muss ich Maklerprovision zahlen, wenn ich selbst eine:n Käufer:in finde?“)

**Homeday** (Title: „Maklerprovision 2026: Jetzt berechnen und aufteilen“)
- H1: Maklerprovision, Maklergebühren & Maklerkosten: Wer zahlt?
- H2: Das Wichtigste zusammengefasst / H2: Jetzt Makler vor Ort finden
- H2: Wie hoch sind die Maklerkosten 2026? (H3: Was beeinflusst die Höhe? / Gibt es eine gesetzliche Obergrenze? / Wie sieht die Maklerprovision in den Bundesländern aus?)
- H2: Wer zahlt die Maklerprovision? (H3: In der Regel zahlen Käufer und Verkäufer jeweils die Hälfte / Wer zahlt beim Verkauf von Häusern und Eigentumswohnungen? / beim Kauf …? / bei Mehrfamilienhäusern und Grundstücken? …)
- H2: Wie lässt sich die Maklerprovision berechnen? (H3: Beispielrechnung)
- H2: Wann wird die Maklerprovision fällig? (H3: Voraussetzungen / Fallen schon bei der Beauftragung Kosten an?)
- H2: Wann entfällt die Maklerprovision? / H2: Können Maklerkosten bei Nicht-Erfolg anfallen? / H2: Lässt sich die Maklerprovision verhandeln? / H2: Maklerprovision umgehen – geht das?
- H2: Maklerkosten bei Vermietung (inkl. Bestellerprinzip)
- H2: Das Maklergesetz (H3: Warum geändert? / Seit wann? / Alle Immobilienarten? / Welche Form muss ein Maklervertrag haben? / Wer zahlt zuerst?)
- H2: Was ist eine Innenprovision, was eine Außenprovision?
- H2: Lässt sich die Provision von der Steuer absetzen?
- H2: Wie hoch ist die Maklerprovision beim Hausverkauf in anderen Ländern?
- H2: Welche Aufgaben eines Immobilienmaklers deckt die Maklergebühr ab?
- H2: Maklergebühren bei Kauf einer Mietwohnung / bei Verkauf ohne Makler / Sind Homeday-Partnermakler auch gute Makler? / Maklerprovision – FAQ

**immoverkauf24** (Title: „Maklerprovision 2026: Höhe, Berechnung & wer Maklergebühren zahlt“)
- H1: Maklerprovision 2026: Höhe, neue Gesetze & wer die Maklergebühren bei Hausverkauf zahlt
- H2: 1. Wann fällt die Maklerprovision an, wann nicht?
- H2: 2. Was bedeuten Maklerprovision, Maklergebühr und Maklercourtage?
- H2: 3. Wie hoch ist die Maklerprovision 2026? (H3: Was beeinflusst die Höhe? / Von welchem Standort hängt die Höhe ab? / Wie ist die Höhe in den Bundesländern? / Gibt es eine gesetzliche Obergrenze?)
- H2: 4. Maklerprovision berechnen: So geht’s ganz einfach
- H2: 5. Wer zahlt den Makler laut neuem Gesetz?
- H2: 6. Welchen Einfluss hat das Bestellerprinzip auf die Maklergebühren?
- H2: 7. Maklerprovision bei Hausverkauf & Hauskauf (H3: Wer zahlt beim Hauskauf? / bei Mehrfamilienhäusern?)
- H2: 8. Maklerprovision für Vermieter & Mieter
- H2: 9. Wer darf den Immobilienmakler beauftragen?
- H2: 10. Wann ist die Maklerprovision fällig?
- H2: 11. Welche Aufgaben eines Immobilienmaklers sind in der Maklergebühr enthalten?
- H2: 12. Die 4 besten Spar-Tipps zur Maklerprovision (H3: verhandeln? / umgehen? / steuerlich geltend machen / zu Unrecht gezahlte Gebühren zurückfordern?)

**IHK Bodensee-Oberschwaben** (Title: „Gesetzliche Regelungen für Immobilienmakler - IHK Bodensee-Oberschwaben“)
- H1: Gesetzliche Regelungen für Immobilienmakler
- H2: Welche gesetzlichen Regelungen gelten für Immobilienmakler?
- H2: Was beschreibt das „Bestellerprinzip“?
- H2: Wann ist der Käufer Verbraucher?
- H2: Welche Varianten der Provisionsvereinbarung gibt es?
- H2: Was passiert mit dem Provisionsanspruch bei Widerruf des Vertrages durch den Verbraucher?

### 6.4 Welche Fragen beantwortet werden
- Höhe (Bundesland-Tabelle: Homeday, immoverkauf24; IS24 nur Rechner ohne Werte), Obergrenze (keine gesetzliche), Verhandelbarkeit
- Wer zahlt (Halbteilung § 656c, Abwälzung § 656d, Innenprovision)
- Textform (§ 656a), Verbraucherbegriff (§ 13 BGB), Anwendungsbereich (Wohnung/EFH)
- Fälligkeit, Nicht-Erfolg, Aufwandsentschädigung, Umgehung, Steuerabzug
- Widerruf (nur IHK ausführlich)
- Bestellerprinzip Vermietung
- Alleinauftrag/qualifizierter Alleinauftrag: **keine der Top-Seiten behandelt ihn als eigenen Abschnitt** (nur immoverkauf24 „Wer darf den Makler beauftragen?“ streift Vertragstypen) → Lücke.

### 6.5 Zahlen, Fakten, Rechtsgrundlagen
- **§ 656a BGB**: „Ein Maklervertrag, der den Nachweis der Gelegenheit zum Abschluss eines Kaufvertrags über eine Wohnung oder ein Einfamilienhaus oder die Vermittlung eines solchen Vertrags zum Gegenstand hat, bedarf der Textform.“ Quelle: https://www.gesetze-im-internet.de/bgb/__656a.html
- **§ 656c BGB** (Gesetzestext): „(1) Lässt sich der Makler von beiden Parteien des Kaufvertrags über eine Wohnung oder ein Einfamilienhaus einen Maklerlohn versprechen, so kann dies nur in der Weise erfolgen, dass sich die Parteien in gleicher Höhe verpflichten. Vereinbart der Makler mit einer Partei des Kaufvertrags, dass er für diese unentgeltlich tätig wird, kann er sich auch von der anderen Partei keinen Maklerlohn versprechen lassen. Ein Erlass wirkt auch zugunsten des jeweils anderen Vertragspartners des Maklers. Von Satz 3 kann durch Vertrag nicht abgewichen werden. (2) Ein Maklervertrag, der von Absatz 1 Satz 1 und 2 abweicht, ist unwirksam. § 654 bleibt unberührt.“ Quelle: https://www.gesetze-im-internet.de/bgb/__656c.html
- **§ 656d BGB** (Gesetzestext): „(1) Hat nur eine Partei des Kaufvertrags über eine Wohnung oder ein Einfamilienhaus einen Maklervertrag abgeschlossen, ist eine Vereinbarung, die die andere Partei zur Zahlung oder Erstattung von Maklerlohn verpflichtet, nur wirksam, wenn die Partei, die den Maklervertrag abgeschlossen hat, zur Zahlung des Maklerlohns mindestens in gleicher Höhe verpflichtet bleibt. Der Anspruch gegen die andere Partei wird erst fällig, wenn die Partei, die den Maklervertrag abgeschlossen hat, ihrer Verpflichtung zur Zahlung des Maklerlohns nachgekommen ist und sie oder der Makler einen Nachweis hierüber erbringt. (2) § 656c Absatz 1 Satz 3 und 4 gilt entsprechend.“ Quelle: https://www.gesetze-im-internet.de/bgb/__656d.html
- **§ 656b BGB**: Anwendungsbereich – Käufer muss Verbraucher (§ 13 BGB) sein (IHK).
- **Inkrafttreten**: 23.12.2020 („Gesetz über die Verteilung der Maklerkosten bei der Vermittlung von Kaufverträgen über Wohnungen und Einfamilienhäuser“, BT-Drs. 19/15827) – IS24, IHK, anwalt.org.
- **Höhe**: IS24 „häufig zwischen 5,95 und 7,14 Prozent“ gesamt, 3,57 % je Seite; Rechenbeispiel 300.000 € × 7,14 % = 21.420 € → je 10.710 €. IHK: „zwischen 3,57 und 7,14 Prozent“. Immoverkauf24-Bundeslandtabelle (lt. IS24-Verweis Stand Juni 2024): Baden-Württemberg 7,14 % gesamt. Homeday-Tabelle: Werte je Bundesland (nicht extrahiert; Homeday nennt „üblicherweise je 3,57 %“). IW Köln (iwd): Käufer zahlen im Mittel knapp 3,5 %, vor der Reform 5 % (lt. Suchergebnis https://iwd.de/pdf/geteilte-kosten-bei-der-maklerprovision-514906).
- **Fälligkeit**: mit notariell beurkundetem Kaufvertrag, wenn Leistung erbracht; Zahlungsfrist häufig ca. zwei Wochen (IS24); § 652 BGB Erfolgsprinzip (Homeday, immoverkauf24).
- **Unzulässig/entfällt**: kein Provisionsanspruch, wenn Vertragsabschluss nicht auf Maklertätigkeit zurückgeht; Aufwandsentschädigung kann vereinbart sein (IS24).
- **Widerruf** (IHK): Widerrufsfrist 14 Tage ab ordnungsgemäßer Belehrung; ohne/fehlerhafte Belehrung 1 Jahr und 14 Tage; bei Widerruf kann der Makler den Provisionsanspruch vollständig verlieren und keinen Wertersatz verlangen; anders, wenn der Verbraucher ausdrücklich verlangt hat, dass vor Fristablauf begonnen wird, und bestätigt, dass das Widerrufsrecht mit vollständiger Erfüllung erlischt (§ 356 Abs. 4 Nr. 2 BGB; Wertersatz § 357a Abs. 2 BGB – auf der IHK-Seite als „357a Absatz 2 BGG“ verschrieben). Rückzahlungsanspruch bei unzulässiger Vollabwälzung § 812 Abs. 1 S. 1 Alt. 1 BGB. Relevante Normen: § 312b/§ 312g BGB (außerhalb von Geschäftsräumen/Fernabsatz) – von IHK implizit.
- **BGH zur Provision nach Widerruf** (vzbv/Otto Schmidt, lt. Suchergebnis): Widerruf des Verkäufer-Maklervertrags lässt Provisionsanspruch gegen den Käufer nicht entfallen; Az./Datum **nicht ermittelt** – vor Verwendung Urteil prüfen: https://www.vzbv.de/urteile/zur-maklerprovision-nach-widerruf
- **Textform-Beispiele** (IHK): E-Mail, SMS, Fax genügen.
- **Steuer**: Provision als Werbungskosten bei Vermietung bzw. Veräußerungskosten bei § 23 EStG (Homeday/immoverkauf24, ohne Norm).

### 6.6 Lead-Magnete / CTAs
- IS24: Provisionsrechner (Bundeslandauswahl), eBook, kostenlose Bewertung. Homeday: Makler finden, Wert ermitteln. immoverkauf24: Checkliste, kostenlose Bewertung (sitewide). IHK: keine.

### 6.7 Lücke – was die Rössler-Seite bieten muss
1. **Transparente eigene Provision** in Euro an regionalen Beispielen (ETW 290.000 € Leonberg; ETW 200.000 € Pforzheim) – inkl. Satz „Sie sehen vorab, was Sie bezahlen“. Portale bleiben bei Spannen.
2. **Was die Provision bei Rössler konkret enthält** (Leistungskatalog: Unterlagen bei Verwaltung anfordern, Energieausweis-Koordination mit WEG, Exposé, Portale, Besichtigungen, Bonitätsprüfung, Notarkoordination, Übergabe) – Homeday/immoverkauf24 haben generische Listen, kein lokaler Makler verbindet das mit Preis.
3. **Alleinauftrag erklärt** (einfacher vs. qualifizierter Alleinauftrag, Laufzeit, Kündigung, was passiert bei Eigenverkauf) – fehlt bei allen Top-Seiten; Rechtsquellen: § 652 ff. BGB, BGH-Rechtsprechung zu AGB-Laufzeiten (max. 6 Monate üblich – **Urteil verifizieren**).
4. **Widerrufsbelehrung offen erklären** (14 Tage, § 312g, was „vorzeitiger Beginn“ bedeutet) – nur IHK hat es, kein Makler. Vertrauensvorsprung.
5. **Halbteilung vs. Innenprovision als Verkäuferentscheidung** mit Rechenbeispiel: 7,14 % Innenprovision (Käufer „provisionsfrei“ → evtl. höherer Preis) vs. 3,57/3,57 – und wann welches Modell beim ETW-Verkauf in Leonberg sinnvoll ist (eigene Einschätzung, als solche kennzeichnen). Gäu Immobilien wirbt mit „keine Verkäuferprovision“ (Meta-Description) – Wettbewerbsargument vor Ort beachten.
6. **§ 34c GewO-Erlaubnis und Weiterbildungspflicht (§ 34c Abs. 2a GewO, 20 Stunden/3 Jahre – verifizieren)** sichtbar machen (Impressum/Über uns) – Vertrauenssignal, fehlt bei Portalen naturgemäß.

---

## Thema 7: Energieausweis beim Wohnungsverkauf (GEG/GModG, Pflichtangaben in Anzeigen, Bedarfs-/Verbrauchsausweis, WEG-Zuständigkeit)

### 7.1 Suchbegriffe
- „Energieausweis Wohnungsverkauf Pflicht GEG Pflichtangaben Anzeige Bedarfsausweis Verbrauchsausweis WEG“
- „Energieausweis Eigentumswohnung WEG Verwalter Pflicht Gemeinschaftseigentum wer muss ausstellen Verkauf“

### 7.2 Rankende Seiten
| # | URL | Typ | Wortzahl | FAQ | Autor / Datum | Schema |
|---|---|---|---|---|---|---|
| 1 | https://www.verbraucherzentrale.de/wissen/energie/energetische-sanierung/energieausweis-wer-braucht-ihn-24054 | V | ca. 2.500 (Artikel; Seite inkl. Navigation) | nein | Stand 31.08.2026 | – |
| 2 | https://reduco.ai/blog/energieausweis/energieausweis-wohnung-eigentumswohnung | D | ca. 1.900 | ja (FAQPage) | Hendrik Stotz; publ. 01.04.2026, akt. 17.08.2026 | BlogPosting, FAQPage, Legislation |
| 3 | https://www.test.de/Frage-und-Antwort-Eigentuemergemeinschaft-muss-Energieausweis-bezahlen-4751159-0/ | V (Stiftung Warentest) | ca. 770 | nein | 16.09.2014 (alt) | – |
| 4 | https://vdiv.de/aktuelles/praxistipps-details/der-energieausweis-ein-muss-fuer-jeden-wohnungseigentuemer-und-verwalter | Verband (VDIV) | ca. 530 | nein | kein Datum | – |
| 5 | https://reduco.ai/blog/energieausweis-weg-hausverwaltung-2026 | D | nicht abgerufen | – | – | – |
| 6 | https://www.hausundgrund.de/verein/gelsenkirchen/leistungen/energieausweis | Verband | nicht abgerufen | – | – | – |
| 7 | https://mlp.de/lebenssituationen/wohnen/der-energieausweis-wann-ist-er-pflicht-und-wofuer-ist-er-gut/ | S | nicht abgerufen | – | – | – |
| G | https://www.gesetze-im-internet.de/geg/__80.html ; __87.html | G | – | – | – | – |
| – | ImmoScout24 /wissen/verkaufen/energieausweis.html | P | **404** | – | – | – |

### 7.3 H-Struktur wörtlich

**Verbraucherzentrale** (Title: „Für wen ein Energieausweis zur Immobilie Pflicht ist | Verbraucherzentrale.de“)
- H1: Für wen ein Energieausweis zur Immobilie Pflicht ist
- H2: Inhaltsverzeichnis
- H2: Spätestens bei Verkauf oder Neu-Vermietung brauchen Sie einen Energieausweis
- H2: Welcher Ausweis für welches Gebäude?
- H2: Wann müssen Sie den Energieausweis vorlegen?
- H2: Müssen in einer Wohnungs-Anzeige Informationen aus dem Ausweis stehen?
- H2: Muss mein Gebäude vor Ort begutachtet werden?
- H2: Betrugsversuche mit den Energieausweis-Pflichten
- H2: Welche Behörde ist für den Energieausweis zuständig?

**reduco.ai** (Title: „Energieausweis für Wohnungen 2026: Was Eigentümer und Käufer wissen müssen“)
- H1: Energieausweis für Wohnungen 2026: Was Eigentümer und Käufer wissen müssen
- H2: Das Wichtigste in Kürze
- H2: Kein Energieausweis für die einzelne Wohnung: Er gilt fürs ganze Gebäude
- H2: Wer ist für den Energieausweis der Eigentumswohnung verantwortlich?
- H2: WEG-Beschluss für den Energieausweis: So geht es formal korrekt (H3: Wenn die WEG den Energieausweis nicht beschafft: drei Eskalationsstufen)
- H2: Wer zahlt den Energieausweis? Kostenverteilung in der WEG
- H2: Energieausweis für die Mietwohnung: Pflichten des Vermieters
- H2: Einfluss der Effizienzklasse auf Wohnungspreise und Mieten
- H2: Gemischt genutzte Gebäude
- H2: EPBD-Änderungen für Wohnungseigentümer
- H2: Praktischer Leitfaden für Käufer und Verkäufer einer Eigentumswohnung (H3: Was Käufer … prüfen sollten / Was Verkäufer … vorbereiten sollten)
- H2: Häufige Fragen zum Energieausweis bei Eigentumswohnungen (H3: Kann ich einen Energieausweis nur für meine Wohnung erstellen lassen? / Was, wenn die Hausverwaltung den Energieausweis nicht beschafft? / Muss ich als Käufer die schlechte Energieeffizienz des Gebäudes hinnehmen? / Wer zahlt den Energieausweis, wenn ich ihn wegen meines Verkaufs auslöse?)
- H2: Frühzeitig handeln und Überraschungen beim Energieausweis vermeiden

**test.de** – H1: Frage und Antwort Eigentümergemeinschaft muss Energieausweis bezahlen (Leserfrage aus Ulm, 2014)
**VDIV** – H1: Der Energieausweis: Ein Muss für jeden Wohnungseigentümer und -verwalter; H2: Ein kurzer Einblick in die Geschichte; H2: Die zwei Arten des Energieausweises

### 7.4 Welche Fragen beantwortet werden
- Wann Pflicht (Verkauf/Neuvermietung), Ausnahmen (Denkmal, < 50 m²)
- Bedarfs- vs. Verbrauchsausweis, welches Gebäude welchen braucht (Bauantrag vor 01.11.1977, < 5 Wohnungen)
- Gültigkeit (10 Jahre), Vorlagepflicht bei Besichtigung, Übergabe nach Kauf
- Pflichtangaben in Anzeigen, Bußgeld
- WEG: wer beschafft, wer zahlt, Beschluss, Eskalation (reduco)
- Effizienzklasse und Preis (reduco)
- Neuerungen GModG/EPBD (reduco, VZ)

### 7.5 Zahlen, Fakten, Rechtsgrundlagen
- **§ 80 Abs. 3 GModG** (Gesetzestext): „Soll ein mit einem Gebäude bebautes Grundstück oder Wohnungs- oder Teileigentum verkauft, … werden, ist ein Energieausweis auszustellen, wenn nicht bereits ein gültiger Energieausweis für das Gebäude vorliegt. In den Fällen des Satzes 1 ist für Wohngebäude, die weniger als fünf Wohnungen haben und für die der Bauantrag vor dem 1. November 1977 gestellt worden ist, ein Energiebedarfsausweis auszustellen.“ (Ausnahme: Wärmeschutzverordnung 1977-Niveau erreicht.)
- **§ 80 Abs. 4 GModG**: „… hat der Verkäufer oder der Immobilienmakler dem potenziellen Käufer spätestens bei der Besichtigung einen Energieausweis oder eine Kopie hiervon vorzulegen. Die Vorlagepflicht wird auch durch einen deutlich sichtbaren Aushang oder ein deutlich sichtbares Auslegen während der Besichtigung erfüllt. … Unverzüglich nach Abschluss des Kaufvertrages hat der Verkäufer oder der Immobilienmakler dem Käufer den Energieausweis oder eine Kopie hiervon zu übergeben.“ (Beratungsgespräch-Pflicht nur bei Wohngebäuden mit ≤ 2 Wohnungen.) Quelle: https://www.gesetze-im-internet.de/geg/__80.html
- **§ 87 Abs. 1 GModG** (Gesetzestext): Pflichtangaben in kommerziellen Immobilienanzeigen, wenn ein Energieausweis vorliegt: „1. die Art des Energieausweises: Energiebedarfsausweis im Sinne von § 81 oder Energieverbrauchsausweis im Sinne von § 82, 2. den im Energieausweis genannten Wert des Endenergiebedarfs oder des Endenergieverbrauchs für das Gebäude, 3. die im Energieausweis genannten wesentlichen Energieträger für die Heizung des Gebäudes, 4. bei einem Wohngebäude das im Energieausweis genannte Baujahr und 5. bei einem Wohngebäude die im Energieausweis genannte Energieeffizienzklasse.“ Verantwortlich: Verkäufer, Vermieter oder Immobilienmakler, der die Anzeige verantwortet. Quelle: https://www.gesetze-im-internet.de/geg/__87.html
- **Verbraucherzentrale** (31.08.2026): Gültigkeit 10 Jahre; Bedarfsausweis Pflicht für 1–4 WE mit Bauantrag vor 01.11.1977 ohne WSchV-1977-Niveau; sonst Wahlfreiheit; ab 01.01.2027 Wahlfreiheit für Bestandswohngebäude, Verbrauchsausweis auf Basis von mind. zwei aufeinanderfolgenden Verbrauchsjahren, Abrechnungen aus drei aufeinanderfolgenden Jahren vollständig, Ende höchstens 18 Monate zurück; Bußgeld „bis zu 10.000 Euro“; Ausnahmen Baudenkmäler und Gebäude bis 50 m² Nutzfläche; nicht-kommerzielle Aushänge ausgenommen; Modernisierungsempfehlungen Teil des Ausweises; Aussteller nach § 88 GModG (BAFA-Expertenliste); WEG trägt Kosten; Vermieter dürfen Kosten nicht umlegen; Warnsignal „20 Euro“-Angebote.
- **reduco.ai (WEG)**: Ausweis immer fürs Gesamtgebäude; Vorlagepflicht beim Verkäufer, Beschaffungspflicht bei WEG/Verwaltung (§§ 79, 80 GModG); Beschluss mit einfacher Mehrheit (§ 19 Abs. 1 WEG ordnungsmäßige Verwaltung); Tagesordnungsrecht § 18 Abs. 2 WEG; außerordentliche Versammlung bei > 25 % (§ 24 Abs. 2 WEG); Beschlussersetzungsklage § 44 WEG; Kosten nach Miteigentumsanteilen (§ 16 Abs. 2 WEG), abweichender Schlüssel beschließbar; Kosten Verbrauchsausweis 50–100 €, Bedarfsausweis 300–500 € (co2online); Effizienzklassen-Tabelle (ohne Quelle!): A/B +15 % Kauf, D/E −5 bis −15 %, F/G −15 bis −25 %, H −20 bis −35 %; GModG verkündet 28.07.2026 (Sekundärangabe); Wohngebäude behalten Skala A+ bis H (Anlage 10 GModG), EU-Skala A–G ab 01.01.2027 nur Nichtwohngebäude (Anlage 10a); Sanierungspflichten § 40 GModG nur Nichtwohngebäude; Verkäufer-Checkliste: 3–6 Monate vor Verkauf Verwaltung kontaktieren.
- **Stiftung Warentest (2014)**: Eigentümergemeinschaft muss den Energieausweis bezahlen (Leserfrage) – alt, aber zitierfähig als Grundsatz.
- **Bußgeld**: VZ „bis zu 10.000 Euro“; bodenrichtwerte-deutschland.de ebenfalls (Quelle immovance.de). Norm: § 108 GModG (reduco zitiert § 108 GModG) – **Betrag im Gesetz verifizieren**.

### 7.6 Lead-Magnete / CTAs
- VZ: Energieberatung, E-Book (5×), PDF. reduco: Rechner (6×), Gebäudecheck, Energieberatung-Regionalsuche. test.de: Download/Abo. VDIV: keine.

### 7.7 Lücke – was die Rössler-Seite bieten muss
1. **Verkäufer-Fahrplan „Energieausweis über die WEG“** mit Musterschreiben an die Hausverwaltung (Antrag auf Tagesordnungspunkt § 18 Abs. 2 WEG), Zeitpuffer 3–6 Monate, Kostenverteilung – reduco hat die Theorie, kein Makler den Praxisservice („wir übernehmen die Kommunikation mit Ihrer Verwaltung“).
2. **Korrekte Normzitate GModG statt GEG** (§ 80 Abs. 3/4, § 87) – die meisten Wettbewerber sind veraltet.
3. **Anzeigen-Pflichtangaben als Beispiel-Exposé-Zeile** („Bedarfsausweis, 128 kWh/(m²·a), Gas, Bj. 1984, Klasse E“) – konkret, fehlt überall.
4. **Typische Gebäudebestände der Region**: viele ETW-Anlagen der 1960er–1990er in Leonberg-Ramtel, Ditzingen, Pforzheim-Nordstadt/Buckenberg (Baujahre aus Inseraten; z. B. Pforzheim-Südweststadt ETW Bj. 1986, Klasse D lt. wohnungsboerse-Inserat) → Hinweis, dass Verbrauchsausweis meist zulässig ist (≥ 5 WE), Bedarfsausweis nur bei kleinen Altbauten < 5 WE vor 1977.
5. **Preiseffekt der Klasse mit belastbarer Quelle** (immowelt-Analyse 19.03.2026: A+ +20 %, A +15 %, H −9 % vs. D; IS24: G/H −12 % seit 2021) statt der unbelegten reduco-Tabelle.
6. **Hinweis auf Wärmeplanung/Fernwärme vor Ort** (Pforzheim: Fernwärme SWP; Leonberg: kommunale Wärmeplanung – **lokale Fakten nicht recherchiert, nachholen**) als Käuferfrage bei Gasheizungen.

---

## Thema 8: Immobilienbewertung / Wert einer Wohnung (Vergleichswert, Ertragswert, Online-Bewertung vs. Gutachten, Einflussfaktoren bei ETW: Hausgeld, Rücklage, Sonderumlage)

### 8.1 Suchbegriffe
- „Eigentumswohnung bewerten Wert ermitteln Vergleichswertverfahren Hausgeld Rücklage Einflussfaktoren“
- „Instandhaltungsrücklage Hausgeld Sonderumlage Einfluss Kaufpreis Eigentumswohnung Verkauf“
- Nebenbegriffe: „Wohnungsbewertung“, „Wohnung bewerten kostenlos“, „Wertermittlung Eigentumswohnung“, „Immobilienwert ermitteln“

### 8.2 Rankende Seiten
| # | URL | Typ | Wortzahl | FAQ | Autor / Datum | Schema |
|---|---|---|---|---|---|---|
| 1 | https://www.homeday.de/de/immobilienbewertung/wohnungsbewertung/ | M | ca. 5.200 | ja | kein Autor/Datum | Product/AggregateRating |
| 2 | https://www.immoportal.com/gutachten/immobilienbewertung/was-gilt-es-bei-der-wertermittlung-einer-eigentumswohnung-zu-beachten | P | ca. 4.900 | nein (aber Checkliste) | kein Autor/Datum | Product/AggregateRating |
| 3 | https://www.immoverkauf24.de/immobilienbewertung/wohnungsbewertung/ | P | ca. 3.100 | ja (FAQPage) | Jasmin Löhr; publ. 13.02.2012, akt. 16.07.2026 | FAQPage |
| 4 | https://www.immobilienscout24.de/wissen/verkaufen/wertermittlung.html | P | ca. 2.700 | ja (FAQPage) | kein Autor/Datum | FAQPage, Service, Offer |
| 5 | https://www.homeday.de/de/immobilienbewertung/vergleichswertverfahren/ | M | ca. 1.400 | ja | – | – |
| 6 | https://www.mcmakler.de/immobilienlexikon/wohnungsbewertung | M | **403** | – | – | – |
| 7 | https://mlp.de/finanzen-versicherungen/immobilien-zur-kapitalanlage/themen/wohnungsbewertung/ | S | nicht abgerufen | – | – | – |
| 8 | https://www.biallo.de/baufinanzierung/ratgeber/vergleichswertverfahren/ | S | nicht abgerufen | – | – | – |
| 9 | https://www.ebnerstolz.de/… (BFH II R 6/23, ETW-Bewertung ErbSt) | S | nicht abgerufen | – | 29.06.2026 | – |
| – | ImmoScout24 /wissen/verkaufen/wohnungsbewertung.html | P | **404** | – | – | – |
| – | Verbraucherzentrale Immobilienbewertung | V | **404** (Seite nicht mehr vorhanden) | – | – | – |

### 8.3 H-Struktur wörtlich

**Homeday Wohnungsbewertung** (Title: „Wohnung bewerten in 2 Min. – Gratis, anonym & aktuell“)
- H1: Jetzt den Wohnungswert kostenlos ermitteln
- H2: Wohnungswert ermitteln: So erfahren Sie, wie viel Ihre Wohnung wert ist
- H2: Wie funktioniert die Wohnungsbewertung von Homeday? (H3: Wohnung beschreiben / Wert wird berechnet / Bewertung erhalten)
- H2: Wohnungswert ermitteln — Die Vorteile mit Homeday: (H3: Welche Angaben benötigt der Wohnungswert-Rechner? / Wie wird der Datenschutz gewährleistet?)
- H2: Wie viel kostet die Wohnungsbewertung von Homeday?
- H2: Wohnungsbewertung: Der Homeday-Ratgeber
- H2: 1. Was ist der Wohnungswert?
- H2: 2. Welche Möglichkeiten für die Wohnungsbewertung gibt es? (H3: 2.1 Vor-Ort-Bewertung durch einen Makler / 2.2 Online-Bewertung / 2.3 Das Immobiliengutachten / 2.4 Bewertung in Eigenregie / 2.5 Arten von Bewertungsverfahren)
- H2: 3. Welches Bewertungsverfahren eignet sich am besten für die Werteinschätzung einer Eigentumswohnung?
- H2: 4. In welchen Situationen sollte ich den Wohnungswert kennen? (H3: Sachverhalte, für die ein Wertgutachten erforderlich ist, sind:)
- H2: 5. Welche Rolle spielt die Lage für die Wertermittlung einer Wohnung? (H3: Makrolage / Mikrolage)
- H2: 6. Welche Faktoren beeinflussen den Wert einer Wohnung positiv?
- H2: 7. Was ist das Gemeinschaftseigentum, und warum spielt es bei der Ermittlung des Wohnungswertes eine Rolle?
- H2: 8. Freie versus vermietete Wohnung – welche ist wertvoller?
- H2: 9. Kann eigentlich jeder eine Immobilie bewerten?
- H2: 10. Wohnungswert kostenlos online ermitteln - geht das wirklich?
- H2: 11. So lässt sich der Wohnungswert selbst ermitteln
- H2: 12. Wohnungswert ermitteln - eine Checkliste?
- H2: 13. Wohnungswert ermitteln ohne E-Mail-Angabe - geht das?
- H2: 14. Unterschied: Verkehrswert, Marktwert, Kaufpreis
- H2: Wohnungswert ermitteln – FAQ (12 Fragen, u. a. „Ist eine freie oder vermietete Wohnung wertvoller?“, „Wie genau ist eine Online-Wohnungsbewertung?“)

**immoportal.com** (Title: „Wertermittlung Eigentumswohnung: Kostenlos Wert erfahren“)
- H1: Was ist bei der Wertermittlung einer Eigentumswohnung zu beachten?
- H2: Wohnungswert-Rechner: Was ist Ihre Eigentumswohnung wert? (H3: Vorteile / Kundenstimmen / Wie funktioniert …? / Welche Daten …? / Wie lange dauert …? / Für wen …?)
- H2: Allgemein Begriffe der Wertermittlung (H3: Was ist der Wohnungswert? / Unterschied Verkehrswert und Kaufpreis?)
- H2: Wertermittlung von Eigentumswohnungen – welche Verfahren gibt es?
- H2: Wertermittlung Eigentumswohnung: Welches Wertermittlungsverfahren ist am besten geeignet?
- H2: Welche Methoden der Wertermittlung gibt es?
- H2: Was ist die Wertermittlung mittels Vergleichswertverfahren?
- H2: Welche Faktoren sind bei der Anpassung der Vergleichswerte zu berücksichtigen? (H3: Lage / Himmelsrichtung / Baujahr, Alter und Restnutzungsdauer / Größe der Wohnanlage und Anzahl der Wohneinheiten / Geschosslage / Ausstattung / Balkon und Terrasse / Stellplätze / vermietet oder frei? / Gemeinschaftseigentum)
- H2: Was bedeutet Wertermittlung mittels Ertragswertverfahren?
- H2: Wertermittlungsverfahren mittels Sachwertverfahren
- H2: Ein kleiner Überblick der Wertermittlungsverfahren
- H2: Wie kann ich den Wert meiner Eigentumswohnung herausfinden? (H3: Online-Bewertung / Vor-Ort-Bewertung durch einen Makler / Sachverständiger (Wertgutachten) / Eigenständige Bewertung)
- H2: Wann muss ich den Wert meiner Eigentumswohnung wissen?
- H2: Wann brauche ich ein Wertgutachten und wann genügt eine Wertermittlung online oder durch einen Makler?
- H2: Wertermittlung Eigentumswohnung: Checkliste

**immoverkauf24** (Title: „Wohnungsbewertung: Kostenlos & online Wohnungswert ermitteln | immoverkauf24“)
- H1: Wohnungsbewertung: So berechnen Sie den Wert Ihrer Wohnung
- H2: Wohnungsbewertung: Kostenlos bei immoverkauf24
- H2: 1. Was ist eine Wohnungsbewertung? / 2. Wann sollte ich meine Wohnung bewerten lassen? / 3. Wie funktioniert die kostenlose Wohnungsbewertung von immoverkauf24? / 4. Welche Möglichkeiten gibt es, um eine Wohnung zu bewerten? (H3: Makler / online / Gutachten / Eigenregie)
- H2: 5. Welche Faktoren beeinflussen den Wert einer Wohnung? (H3: Lage / Quadratmeterpreis / Gemeinschaftseigentum)
- H2: 6. Welche Verfahren werden zur Ermittlung des Wohnungswerts genutzt
- H2: 7. Was kostet eine professionelle Wohnungsbewertung? / 8. Kann ich meine Wohnung wirklich kostenlos bewerten lassen? / 9. Mit welcher Formel kann ich den Wohnungswert selbst berechnen? / 10. Freie Wohnung versus vermietete Wohnung: Welcher Wert ist höher? / 11. Fazit

**ImmoScout24 Wertermittlung** (Title: „Immobilienwert berechnen: So wird der Hauswert ermittelt | ImmoScout24“)
- H1: Immobilienwert ermitteln
- H2: Welche Bewertungsverfahren für Immobilien gibt es? (H3: Vergleichswertverfahren / Sachwertverfahren / Ertragswertverfahren)
- H2: Diese Vorteile bietet dir die Online-Bewertung von ImmoScout24 (H3: 100% kostenlos & unverbindlich / In 3 Minuten / Basierend auf echten Marktdaten)
- H2: Das sagen zufriedene Kund:innen
- H2: Wann du den Wert deiner Immobilie kennen solltest / H2: Immobilienbewertung: Wann ist sie notwendig? (H3: Hausverkauf / Scheidung / Erbschaft)
- H2: Welche Faktoren beeinflussen den Immobilienwert? (H3: Lage und Umgebung / Zustand / Wohnfläche und Grundstücksgröße / Ausstattung / Angebot und Nachfrage / Regionale Marktentwicklung …)
- H2: Unterscheidung: Verkehrswert und Kaufpreis / H2: So kannst du den Immobilienwert steigern / H2: Wer berechnet den Wert der Immobilie? / H2: Reicht die Immobilienbewertung online beim Verkauf aus? / H2: Fazit / H2: Häufige Fragen zur Immobilienwertberechnung

### 8.4 Welche Fragen beantwortet werden
- Welches Verfahren für ETW (Vergleichswert; Ertragswert bei Vermietung; Sachwert selten)
- Online vs. Makler vs. Gutachter vs. selbst; wann Vollgutachten nötig
- Wertfaktoren: Lage, Baujahr, Geschoss, Himmelsrichtung, Balkon, Stellplatz, Anzahl WE, Ausstattung, Energie
- Gemeinschaftseigentum: Rücklage, Hausgeldzahlung, Streit in der WEG, Sonderumlagen (immoportal, Homeday, immoverkauf24 – jeweils knapp)
- frei vs. vermietet (bis zu 30 %)
- Formel „Wohnfläche × €/m² ± Zu-/Abschläge“
- Verkehrswert vs. Kaufpreis (§ 194 BauGB)
- Kosten Gutachten (meist ohne Zahl)

### 8.5 Zahlen, Fakten, Rechtsgrundlagen
- **§ 194 BauGB** (Verkehrswertdefinition) – Homeday, immoportal zitieren.
- **§ 15 ImmoWertV** (Vergleichswertverfahren, Abs. 1 direkt, Abs. 2 indirekt über Vergleichsfaktoren) – immoportal.
- **Verfahren für ETW**: Vergleichswert am besten (Homeday, immoportal, IS24); Ertragswert bei vermieteter ETW (immoportal, mlp lt. Suchergebnis); Sachwert selten (immoportal).
- **BFH 11.03.2026, II R 6/23**: ETW für ErbSt primär nach Vergleichswertverfahren; Vergleichspreise der Gutachterausschüsse vorrangig (Ebner Stolz, lt. Suchergebnis).
- **Homeday**: wertsteigernd: Energieeffizienz, Homeoffice-Zimmer, Glasfaser, ÖPNV/Grün, Balkon/Terrasse/Loggia („mehrere hundert Euro“ – unklar ob je m²), Kamin/Fußbodenheizung/Echtholz, Neubau/sanierter Altbau; Gemeinschaftseigentum: Rücklage „zu den nicht umlagefähigen Kosten gehört und Teil des Hausgeldes“; Hausgeld regelmäßig gezahlt?; zerstrittene WEG negativ; frei vs. vermietet „unter Umständen bis zu 30 Prozent mehr“; Formel „Wohnungswert = Wohnfläche × Preis pro Quadratmeter“; Sanierung +10 %, Modernisierungsstau/ungünstige Lage −5 bis −15 % (Beispielwerte); Gutachten kostenpflichtig (keine Zahl).
- **immoportal**: Erdgeschoss „niedrigerer Wert … als im ersten Obergeschoss“, Garten im EG wertsteigernd, obere Geschosse ohne Aufzug im Altbau Abschlag; Nordbalkon weniger wert als Südbalkon; Balkon/Terrasse zählen „bis zu 25 Prozent“ zur Wohnfläche; Restnutzungsdauer-Beispiel 100/75 Jahre → 25 % Alterswertminderung; „mehr als 20 Wohneinheiten“ → tendenziell niedrigerer Wert; Rücklage nicht regelmäßig bedient → „wirkt sich das negativ auf den Wert der Eigentumswohnung aus“; Sonderumlagen „vermindern sie den Wert einer Immobilie“; Vollgutachten nötig bei strittiger Scheidung, Erbstreit, Betriebsvermögen, Einspruch ErbSt/SchenkSt, Zwangsversteigerung, Beleihung, Baumängeln; Kurzgutachten nicht gerichtsfest.
- **immoverkauf24**: Faktoren Lage, Quadratmeterpreis, Gemeinschaftseigentum; kostenlose Online-Bewertung (Lead).
- **Suchergebnisse zur Rücklage**: Rücklage bleibt beim Verkauf in der WEG und geht auf den Käufer über, kein Rückzahlungsanspruch → im Preis berücksichtigen (IS24 Instandhaltungsrücklage-Lexikon, vr.de); steuerlich: Rücklagenanteil beim Kauf keine Anschaffungskosten/ bei steuerpflichtigem Verkauf abziehbar (ecovis-kso.com, IWW – lt. Suchergebnissen, Details dort prüfen); Notarkammer-Hinweis: fehlende Rücklage → Sonderumlagen-Risiko für Käufer, Protokolle/Beschlusssammlung prüfen (notar.de PDF).
- **Kosten Gutachten**: bodenrichtwerte-deutschland.de: ca. 500–2.000 € (Bewertung durch Gutachter, im Privatverkauf-Kontext); IS24 Kostentabelle: Wertgutachten 2.000 € (Beispiel 200.000 €). Honorarordnung: frei (keine HOAI mehr) – nicht auf den Seiten.
- **Lokale Vergleichsdaten**: Gutachterausschuss Leonberg (Belforter Platz 1, gutachterausschuss@leonberg.de, 07152 990-3119 lt. bodenrichtwerte-deutschland.de), Gemeinsamer Gutachterausschuss Enzkreis (Mühlacker, gutachter@gua-enzkreis.de / gutachterausschuss-enzkreis.de), Gutachterausschuss Pforzheim (Immobilienmarktbericht 2021/22 als PDF: https://www.pforzheim.de/fileadmin/user_upload/bauen/Gutachterausschuss/Immobilienmarktbericht_2021_22_Internet.pdf) – siehe Teil B.

### 8.6 Lead-Magnete / CTAs
- Homeday: Wert ermitteln (23×), Rechner (20×), Checkliste (5×), Beratung. immoportal: Rechner (20×), Checkliste, Kundenstimmen. immoverkauf24: Wert ermitteln (9×), Checkliste (5×), Beratung. IS24: Online-Bewertung (Service/Offer-Schema), PDF-Ergebnis.
- Muster: Die Bewertungsseite IST die Lead-Maschine – Formular oben, Ratgeber darunter.

### 8.7 Lücke – was die Rössler-Seite bieten muss
1. **Echte lokale Vergleichsdaten statt bundesweitem Rechner**: Tabelle Angebotspreise €/m² je Ort (immoportal/immoverkauf24/IS24-Regional, Stand Q2–Q4 2026, siehe Teil B) + Hinweis auf amtliche Kaufpreissammlung der Gutachterausschüsse (Leonberg, Enzkreis, Pforzheim) als Grundlage der eigenen Bewertung. Keine Portalseite nennt den Gutachterausschuss Leonberg.
2. **ETW-Preisfaktoren mit Zahlen aus der Region**: Geschosslage, Aufzug, Stellplatz/TG (in Leonberg/Ditzingen-Inseraten regelmäßig als Argument), Balkon, Energieklasse (immowelt-Werte), Hausgeld-Höhe (z. B. Hirschlanden-Inserat: 79 m², Hausgeld 390 €/Monat lt. Suchergebnis) – als „Was wir bei der Bewertung konkret prüfen“.
3. **Rücklage/Sonderumlage als Preisargument quantifizieren**: Beispiel – Rücklagenanteil 8.000 € im Vermögensbericht vs. beschlossene Sonderumlage 12.000 € Fälligkeit nach Übergang → Preisanpassung. Niemand rechnet das vor.
4. **„Online-Bewertung vs. Rössler-Bewertung vs. Gutachten“** ehrlich: Online-Bewertungen weichen stark ab (portimmo.de-Vergleich: sechs Portale, sechs Werte – lt. Suchergebnis), Gutachten 500–2.000 €, Maklerbewertung kostenlos aber interessengeleitet – offen benennen.
5. **BFH II R 6/23 (2026)** als Argument für Erbfälle: Finanzamt nimmt Vergleichswerte des Gutachterausschusses – eine fundierte Maklerbewertung hilft beim Einspruch nicht, dafür braucht es ein Gutachten (§ 198 BewG – **verifizieren**).
6. **Checkliste „Welche Unterlagen der Bewerter braucht“** (Teilungserklärung, Wirtschaftsplan, letzte 3 Protokolle, Vermögensbericht, Energieausweis, Grundriss, Wohnflächenberechnung).


---

## Thema 9: Verkaufen oder vermieten? (Entscheidungshilfe)

### 9.1 Suchbegriffe
- „Wohnung verkaufen oder vermieten Entscheidungshilfe Rechner“
- „Eigentumswohnung verkaufen oder vermieten Vergleich Rendite Mietrendite Entscheidung Ratgeber Makler“
- Beobachtung: Die Suche liefert überwiegend „Mieten oder Kaufen“-Rechner (Finanzfluss, CHECK24, Stiftung Warentest, cash.ch) – das Suchfeld „verkaufen oder vermieten“ ist dünn besetzt → Chance.

### 9.2 Rankende Seiten
| # | URL | Typ | Wortzahl | FAQ | Autor / Datum | Schema |
|---|---|---|---|---|---|---|
| 1 | https://www.immobilienscout24.de/wissen/verkaufen/vermieten-oder-verkaufen.html | P | ca. 3.400 | ja (FAQPage) | Nadine Kunert; akt. 16.10.2026 | Article, FAQPage |
| 2 | https://www.immoportal.com/node/98021 („Vermietung: Wichtige Fragen kurz erklärt“) | P | nicht abgerufen | – | – | – |
| 3 | https://www.cash-online.de/a/im-vergleich-immobilie-verkaufen-oder-vermieten-475368/ | S (Fachmagazin, McMakler-Content) | ca. 1.500 | nein | 19.07.2019 | – |
| 4 | https://www.immoportal.com/node/100171 (Kapitalanlage verkaufen) | P | ca. 1.500 | ja | – | – |
| 5 | https://www.test.de/Eigentumswohnungen-Wirtschaftlichkeitspruefung-Rechenschema-1131793-0/ | V | ca. 670 | nein | 17.04.2000 (sehr alt, Rechenschema als Download) | – |
| 6 | McMakler-Ratgeber „Immobilie verkaufen oder vermieten“ (Presseportal-PDF 2019) | M | nicht abgerufen | – | – | – |
| 7 | https://www.infina.at/ratgeber/verkaufen-oder-vermieten/ | S (Österreich) | nicht abgerufen | – | – | – |
| – | Homeday, immoverkauf24, Finanztip: entsprechende URLs **404** |
| – | Rechner „Mieten oder Kaufen“: https://www.finanzfluss.de/rechner/mieten-oder-kaufen/ ; https://www.test.de/shop/eigenheim-miete/mieten-oder-kaufen-sp0681/ ; CHECK24 – thematisch benachbart |

### 9.3 H-Struktur wörtlich

**ImmoScout24** (Title: „Haus verkaufen oder vermieten“)
- H1: Haus verkaufen oder vermieten – was ist für mich sinnvoller?
- H3 (CTA-Box, 5× wiederholt): Einfach vermieten oder verkaufen mit der Nr. 1
- H2: Was lohnt sich wirtschaftlich mehr: Verkaufen oder vermieten? (H3: Was spricht wirtschaftlich mehr für einen Verkauf? / Was spricht wirtschaftlich mehr für eine Vermietung? / Welche Rolle spielt die Spekulationssteuer? / Verkauf oder Vermietung? Was bedeuten die Argumente in der Praxis?)
- H2: Welche Rolle spielt die Immobilie in deiner Lebensplanung?
- H2: Passt die Vermietung zu deinem Alltag? (H3: Vermietung im Alltag: Ein Blick in die Praxis)
- H2: Checkliste: Verkaufen oder vermieten?
- H2: FAQ: Häufige Fragen zu vermieten oder verkaufen

**cash-online.de** – H1: Im Vergleich: Immobilie verkaufen oder vermieten? (Fließtext ohne Zwischenüberschriften; McMakler-Gründer Lukas Pieczonka zitiert)

**test.de** – H1: Eigentumswohnungen Wirtschaftlichkeitsprüfung (Rechenschema) – Download-Schema (2000)

### 9.4 Welche Fragen beantwortet werden
- Wirtschaftlich: Verkaufserlös vs. Mieteinnahmen, Alternativanlage, Instandhaltung, Leerstand
- Spekulationssteuer als Timing-Faktor
- Lebensplanung (Eigennutzung später, Familie), Alltag (Verwaltung, Nerven)
- Checkliste mit 10 Fragen (IS24)
- Mietrendite-Definition (cash-online, immoportal)

### 9.5 Zahlen, Fakten
- **IS24** (16.10.2026): keine Prozentwerte, keine Beispielrechnung; Argumente pro Verkauf: Erlös sofort, keine Instandhaltung/Modernisierung, kein Mietausfall/Leerstand, Erlös anders investieren; pro Vermietung: laufende Einnahmen, Spekulationsfrist abwarten, Wertentwicklung, Eigentum/Flexibilität behalten. Checkliste (wörtlich): „Benötige ich den Verkaufserlös in absehbarer Zeit?“ / „Kann ich mir größere Sanierungen oder Modernisierungen leisten?“ / „Ist die Immobilie in einer gefragten Lage gut vermietbar?“ / „Möchte ich langfristig von Mieteinnahmen profitieren?“ / „Plane ich eine spätere Eigennutzung?“ / „Soll die Immobilie in der Familie bleiben?“ / „Bin ich bereit, mich dauerhaft mit der Immobilie zu beschäftigen?“ / „Kommt eine Haus- oder Mietverwaltung für mich infrage?“ / „Spielt die Spekulationssteuer in meinem Fall eine Rolle?“ / „Welche Option unterstützt meine finanziellen und persönlichen Ziele besser?“
- **cash-online/McMakler (2019)**: Kriterien: Alter/Sanierungsbedarf, geerbt oder finanziert, Rückkehrabsicht, finanzielle Lage, Zeit/Nerven; Mietrendite = jährliche Mieteinnahmen / Kaufpreis.
- **immoportal**: Nettomietrendite ≈ 4 % / Brutto ≈ 5 % attraktiv; Faktor 20.
- **IW Köln (haufe.de, lt. Suchergebnis)**: Mietrenditen in 18 Städten 2014–2024 stark gesunken, Neuinvestitionen oft nahe null/negativ – relevant für die Entscheidung „vermieten lohnt sich bei heutigen Werten kaum“.
- **Steuer**: Vermietung – Werbungskosten (AfA, Zinsen, Reparaturen) absetzbar (wohnglück-FAQ, cash-online); Verkauf – § 23 EStG.
- **Keine Seite rechnet ein konkretes Beispiel „ETW verkaufen vs. vermieten über 10 Jahre“ vor.**

### 9.6 Lead-Magnete / CTAs
- IS24: eBook (3×), Bewertung, Rechner (Verweis), Checkliste (im Text). cash-online: keine. test.de: Rechenschema (kostenpflichtig/Download).

### 9.7 Lücke – was die Rössler-Seite bieten muss
1. **Echter Rechner/Beispiel „Verkaufen vs. Vermieten“ mit regionalen Zahlen**: ETW Leonberg 75 m²: Verkauf ≈ 75 × 3.900 €/m² = 292.500 € (Portal-Mittel Q3/Q4 2026) vs. Vermietung 75 × 13–15,78 €/m² = 975–1.180 €/Monat kalt → Bruttorendite ≈ 4,0–4,8 %; abzüglich nicht umlagefähiger Hausgeldanteile, Instandhaltung, Mietausfallwagnis; Alternative: Erlös am Kapitalmarkt (als Annahme kennzeichnen). Für Pforzheim: 75 × 2.950 € = 221.000 € vs. 75 × 10,88 € = 816 €/Monat → ≈ 4,4 % brutto. (Alle Eingangswerte = Angebotsdaten der Portale, Stand 2026, Quellen Teil B.)
2. **Entscheidungsmatrix speziell ETW**: Hausgeld-Entwicklung, anstehende Sanierungen der WEG (Dach, Heizung/Wärmepumpe), Sonderumlagen – ein Vermieter trägt das; ein Verkäufer gibt es ab. Haus-Ratgeber ignorieren die WEG-Dimension.
3. **Kündigungssperrfrist-Logik**: Wer jetzt vermietet und später verkaufen will, verkauft an Anleger mit 12 % Abschlag (Stuttgart, IS24-PM) und Sperrfrist 5 Jahre (Leonberg/Pforzheim) – das muss in die Entscheidung. Hat niemand.
4. **Steuer-Timing**: Spekulationsfrist-Ende als Datum, Eigennutzungs-Regel (Verkaufsjahr + 2 Vorjahre), AfA-Hinzurechnung bei Vermietung – mit Beispiel.
5. **Pendler-/Nachfrage-Argumente vor Ort**: Mietnachfrage durch Bosch Renningen, Trumpf Ditzingen, Porsche Weissach, Pforzheimer Hochschule (Mietnachfrage „hoch“ lt. IVD-CityReport 7/2026 für Pforzheim, lt. Suchergebnis) – als qualitative Einordnung mit Quelle.
6. **Interaktiver Fragebogen** (die 10 IS24-Fragen als Scoring) mit Ergebnis „eher verkaufen / eher vermieten / Beratung“.

---

## Thema 10: Wohnung verkaufen im Alter / Pflegefall / Verkauf mit Wohnrecht / Nießbrauch

### 10.1 Suchbegriffe
- „Wohnung verkaufen im Alter Wohnrecht Nießbrauch Pflegefall Immobilie verkaufen“
- „Verbraucherzentrale Immobilienverrentung Leibrente Teilverkauf Wohnrecht Nießbrauch Ratgeber“
- „Haus verkaufen Pflegefall Sozialamt Schonvermögen …“ / „Immobilie verkaufen Betreuer Genehmigung Betreuungsgericht § 1850 BGB Vorsorgevollmacht“
- Nebenbegriffe: „Haus verkaufen und wohnen bleiben“, „Immobilienrente“, „Leibrente Immobilie“, „Teilverkauf Haus“, „Umzug ins Pflegeheim Haus verkaufen“

### 10.2 Rankende Seiten
| # | URL | Typ | Wortzahl | FAQ | Autor / Datum | Schema |
|---|---|---|---|---|---|---|
| 1 | https://reduco.ai/blog/immobilienverkauf/haus-verkaufen-wohnen-bleiben | D | ca. 6.500 | ja (FAQPage) | Hendrik Stotz; publ. 11.08.2026, akt. 16.08.2026 | BlogPosting, FAQPage |
| 2 | https://www.verbraucherzentrale.de/wissen/geld-versicherungen/altersvorsorge/verkauf-der-immobilie-gegen-rentenzahlung-leibrente-102201 | V | ca. 2.600 (Artikel) | nein | Stand 16.12.2024 | – |
| 3 | https://immo.info/immobilienrente-teilverkauf/teilverkauf-haus/ | V (gemeinnütziges Portal) | ca. 3.500 | nein | Tobias Valdenaire; publ. 09.11.2021, akt. 22.10.2026 | Article |
| 4 | https://www.immobilienscout24.de/wissen/verkaufen/hausverkauf-bei-pflegefall.html | P | ca. 4.000 | ja | Nadine Kunert; akt. 22.08.2023 | – |
| 5 | https://www.immobilienscout24.de/wissen/verkaufen/immobilie-durch-betreuer-verkaufen.html | P | ca. 1.260 | nein | – | – |
| 6 | https://www.immobilienscout24.de/wissen/verkaufen/immobilie-bei-demenz-verkaufen.html | P | ca. 1.100 | nein | – | – |
| 7 | https://www.vzhh.de/sites/default/files/medien/136/dokumente/2023-2024_Verbraucherzentrale_Broschuere_Immobilienrente_Web_0.pdf | V (Broschüre PDF) | nicht ausgewertet | – | 2023/2024 | – |
| 8 | https://www.steuertipps.de/download/Leseprobe/Leseprobe_Immobilie_verkaufen_verrenten.pdf | S | nicht ausgewertet | – | – | – |
| 9 | https://www.deutsche-handwerks-zeitung.de/immobilienverrentung-klingt-gut-aber-passt-selten-355735/ | Presse | nicht abgerufen | – | – | – |
| 10 | gegen-hartz.de (mehrere Artikel „Rentner muss ins Pflegeheim … Hausverkauf“) | Presse/Ratgeber (Sozialrecht) | nicht abgerufen | – | – | – |
| 11 | https://pflege-helfer24.de/vorsorge-vollmachten/immobilienverkauf-zur-pflegefinanzierung-reicht-die-vorsorgevollmacht ; https://rechtsanwalt-krau.de/immobilienverkauf-durch-eltern-und-betreuer/ ; https://www.lexikon-betreuungsrecht.de/Immobilie | D / R | nicht abgerufen | – | – | – |
| – | Finanztip Immobilienrente, IS24 „Haus verkaufen und wohnen bleiben“, immoverkauf24 Wohnrecht/Nießbrauch, vzhh Themenseite: **404** |
| G | https://www.gesetze-im-internet.de/bgb/__1850.html | G | – | – | – | – |

### 10.3 H-Struktur wörtlich

**reduco.ai** (Title: „Haus verkaufen und wohnen bleiben 2026: 4 Modelle im Vergleich“; Meta: „Nießbrauch, Rückmietverkauf, Teilverkauf oder Leibrente: Was jedes Modell wirklich kostet – von 16 % bis 55 % Abschlag. Mit Rechnung, was den Erben bleibt.“)
- H1: Haus verkaufen und wohnen bleiben 2026: 4 Modelle im Vergleich
- H2: Das Wichtigste in Kürze
- H2: Die Entscheidungsmatrix: fünf harte Spalten
- H2: Modell 1: Verkauf mit Nießbrauch oder Wohnrecht (H3: Nießbrauch und Wohnungsrecht sind nicht dasselbe / So rechnet das Bewertungsrecht: Schritt für Schritt / Warum der Verbleib für „junge Alte“ am teuersten ist / Der wichtigste Vorbehalt: Steuerwert ist nicht Marktpreis)
- H2: Modell 2: Rückmietverkauf (Sale-and-lease-back)
- H2: Modell 3: Teilverkauf und die Gesamtkosten-Rechnung (H3: Was in der Kritik gesichert ist und was streitig)
- H2: Modell 4: Leibrente
- H2: Für wen welches Modell infrage kommt
- H2: Die drei größten Fallen (H3: Falle 1: Die Klauseln machen den Preis … / Falle 2: Die Instandhaltungslast, die niemand einpreist / Falle 3: Die Rückkaufs-Illusion)
- H2: Die Alternative, die selten angeboten wird: Kredit im Alter
- H2: Was am Ende bei den Erben ankommt
- H2: Die ehrliche Rechnung: Vollverkauf und Umzug
- H2: Was ich rate und wovon ich abrate
- H2: Häufige Fragen (FAQ) (9 H3-Fragen, u. a. „Wie viel weniger bekomme ich mit lebenslangem Wohnrecht oder Nießbrauch?“, „Was ist besser: Nießbrauch oder Wohnrecht?“, „Wer zahlt Reparaturen, Grundsteuer und Gebäudeversicherung, wenn ich mit Wohnrecht wohnen bleibe?“, „Was bleibt meinen Kindern, wenn ich verkaufe und wohnen bleibe?“)
- H2: Nächster Schritt: erst die Zahl, dann das Modell

**Verbraucherzentrale Leibrente** (Title: „Verkauf der Immobilie gegen Rentenzahlung (Leibrente) | Verbraucherzentrale.de“)
- H1: Verkauf der Immobilie gegen Rentenzahlung (Leibrente)
- H2: Was ist eine (Leib-) Rentenzahlung aus der Immobilie?
- H2: Was sind die Vorteile eines Immobilienverkaufs gegen (Leib-) Rentenzahlung?
- H2: Welche Nachteile ergeben sich aus dem Verkauf gegen (Leib-) Rentenzahlung?
- H2: Wonach richtet sich die zu erwartende Zahlung aus der Immobilie?
- H2: Wie gestaltet sich der Verkauf gegen (Leib-) Rentenzahlung?
- H2: Was ist beim Verkauf gegen (Leib-) Rentenzahlung zu beachten?
- H2: Für wen kommt der Verkauf gegen (Leib-) Rentenzahlung in Frage?

**immo.info Teilverkauf** (Title: „Teilverkauf Anbieter: Konditionen & Kosten im Vergleich“)
- H1: Teilverkauf-Anbieter: Aktuelle Konditionen und Kosten
- H2: Welche Kosten fallen bei Teilverkauf von Haus oder Wohnung an?
- H2: Welche Unternehmen bieten einen Teilverkauf an?
- H2: Wertfaktor, Deutsche Teilkauf, EV Liquidhome und Volksbank: Geschäft reduziert oder eingestellt
- H2: Übersichtstabelle: Kosten und Konditionen im Teilverkauf (H3: Vergleichstabelle Teilverkauf von Haus oder Wohnung)
- H2: Wichtiger Hinweis: Treffen Sie keine Entscheidung alleine aufgrund der Kosten!
- H2: Teilverkauf Haus: Drum prüfe, wer sich ewig bindet

**ImmoScout24 Pflegefall** (Title: „Umzug ins Pflegeheim: Haus verkaufen oder nicht? - ImmoScout24“)
- H1: Umzug ins Pflegeheim: Haus verkaufen oder behalten?
- H2: Pflegefall – was passiert mit dem Haus? (H3: Was kostet ein Platz im Pflegeheim? / Wie wird der Platz im Pflegeheim finanziert?)
- H2: Ausnahmen von der Regel: wann findet keine Vermögensverwertung statt? (H3: Schonvermögen – was der Pflegebedürftige behalten darf / Angehörigen-Entlastungsgesetz – zahlen meine Kinder mit? / Wie ist Haftung der Erben … definiert? / Aufhebung der Erbenhaftung … / Was ist mit 100.000 brutto genau gemeint? / Wann es zum Unterhaltsrückgriff … kommt)
- H2: Haus gegen Pflegeplatz – wie kann ich das verhindern? (H3: Option 1: Schenkung / Option 2: Kind kauft Eltern Haus ab / Option 3: Kind bezahlt die Pflege / Option 4: Vermietung / Option 5: Verkauf des Hauses)
- H2: Zugriff durch Sozialamt verhindern durch Schenkung – was muss ich beachten? (H3: Wie sichere ich das Haus zusätzlich ab?)
- H2: Umzug ins Pflegeheim: Wer darf das Haus verkaufen?
- H2: Mit oder ohne Makler verkaufen?
- H2: Fazit / H2: FAQ: Haus verkaufen wegen Pflegekosten

**ImmoScout24 Betreuer** – H1: Immobilienverkauf durch Betreuer; H2: Das Wichtigste in Kürze; H2: Wann darf ein Betreuer meine Immobilie verkaufen?; H2: Was darf ein Betreuer nicht tun?; H2: Welche Rolle spielt das Betreuungsgericht?; H2: Wer erstellt das Wertgutachten …?; H2: Wie läuft der Immobilienverkauf durch den Betreuer ab?; H2: Was passiert, wenn der Betreuer die Immobilie unter Wert verkauft?
**ImmoScout24 Demenz** – H1: Immobilie bei Demenz verkaufen; H2: Das Wichtigste in Kürze; H2: Verlauf des Immobilienverkauf bei Demenz; H2: Generalvollmacht & Betreuungsvollmacht; H2: Haus überschreiben bei Demenzerkrankung?

### 10.4 Welche Fragen beantwortet werden
- Modelle: Nießbrauch/Wohnrecht-Verkauf, Rückmietverkauf, Teilverkauf, Leibrente, Kredit im Alter (reduco, VZ, immo.info)
- Abschläge nach Alter, Kostenfallen, Instandhaltungslast, was Erben bleibt
- Pflegefall: Schonvermögen, Verwertung, Angehörigen-Entlastungsgesetz, Schenkung/10 Jahre, wer darf verkaufen (IS24)
- Betreuer/Vollmacht: Betreuungsgericht, Gutachten, Demenz/Geschäftsfähigkeit (IS24, Notar-PM)

### 10.5 Zahlen, Fakten, Rechtsgrundlagen
- **Nießbrauch vs. Wohnungsrecht** (reduco): § 1030 BGB (alle Nutzungen, Vermietung erlaubt) vs. § 1093 BGB (nur Bewohnen; Vermietung nur mit Gestattung § 1092 Abs. 1 BGB); öffentliche Lasten/Grundsteuer beim Nießbraucher (§ 1047 BGB), beim Wohnungsrecht grundsätzlich Eigentümer; gewöhnliche Instandhaltung Berechtigter (§ 1041 BGB); größere Erneuerungen Eigentümer; alles dispositiv. VZ: Wohnrecht = geringerer Wertabzug; Nießbrauch = höherer Abzug, nur bei realistischer Vermietung wählen; im Pflegefall verliert ein reines Wohnrecht seinen Nutzen (Umzug ins Heim), Nießbrauch erlaubt Vermietung (Suchergebnis).
- **Abschlag nach Alter** (reduco, Modellfall Frau, Wert 450.000 €, Miete 1.100 €/Monat = 13.200 €/Jahr, § 14 BewG Vervielfältiger, BMF-Schreiben 21.10.2025): 65 J. 36,9 % (Vervielf. 12,583); 72 J. 30,6 % (10,447); 80 J. 22,0 % (7,490); 85 J. 16,2 % (5,512); Mann 72 J. 27,3 %. Hinweis reduco: Steuerwert ≠ Marktpreis.
- **Teilverkauf** (reduco/VZ/immo.info): max. 50 % Verkauf; Nutzungsentgelt ab 4,99 % p. a. (ca. 5 %), 10 Jahre fest; Servicepauschale bis 5,5 % des Gesamterlöses beim Gesamtverkauf; Mindestvergütung i. d. R. 117 % des Teilkaufpreises; Erwerbsnebenkosten bei Anbietern „auf 17 % fixiert“; SVRV-Gutachten Gsell/Artz (25.11.2024): bei 200.000 € bleiben 72.000 € (36 %); immo.info: Wertfaktor, Deutsche Teilkauf, EV Liquidhome, Volksbank haben Teilverkauf reduziert/eingestellt (Stand 22.10.2026); vzhh: Teilverkauf „teuer … Risiko einseitig“.
- **Leibrente** (VZ, 16.12.2024): Rechenformel Nettowert − Wohnwert (gesparte Miete); Beispiel 250.000 € − 144.000 € (800 × 12 × 15) = 106.000 € einmalig oder ca. 588 €/Monat; echte Leibrenten kaum erhältlich, meist Zeitrenten (10/15/20 Jahre); Absicherung durch erstrangige Grundbucheintragung (Reallast + Wohnrecht); Leibrente nur mit Ertragsanteil steuerpflichtig (reduco: 18 % mit 65/66, 15 % mit 70, 11 % mit 75, 8 % mit 80, 5 % mit 85–87 – § 22 Nr. 1 S. 3 EStG), Zeitrente i. d. R. voll; SVRV-Beispiel: Mann 76 J., Haus 600.000 € → 270.000 € (45 %); Stiftung Warentest: mit 65 oft nur wenige Hundert Euro/Monat.
- **Rückmietverkauf**: Mietvertrag, kein dingliches Recht; Eigenbedarfskündigung möglich, sofern nicht ausgeschlossen (§ 573 BGB) (reduco).
- **Kredit im Alter** (reduco): tilgungsfreies Darlehen ab 3,3 % p. a. (VZ, Jan. 2026); § 505a BGB Kreditwürdigkeitsprüfung als Hürde; Umkehrhypothek rechtlich möglich (§ 491 Abs. 3 S. 4 BGB), kaum angeboten (ca. 35 % Auszahlung lt. SVRV); Justizministerkonferenz 07.11.2025 fordert Erleichterung; KfW 159 bis 50.000 € je WE altersgerechter Umbau; 15-Jahres-Vergleich: Darlehen ca. 69.000 € günstiger als Teilverkauf bei 120.000 € Bedarf.
- **Pflegefall / Sozialhilfe**: Hilfe zur Pflege nachrangig (SGB XII); Schonvermögen § 90 Abs. 2 Nr. 9 SGB XII: 10.000 € je Person, 20.000 € Ehepaare (Pflegewegweiser NRW, 2024; IS24 nennt veraltet 5.000 €); angemessenes Hausgrundstück § 90 Abs. 2 Nr. 8 SGB XII (IS24-Orientierung: 130 m² Haus/120 m² Wohnung für 4 Personen, −20 m² je fehlender Person; Ehepartner allein ≤ 70 m²); Darlehensgewährung mit Grundschuld statt Sofortverkauf (§ 91 SGB XII, gegen-hartz.de); Erbenhaftung § 102 SGB XII (3 Jahre nach Tod); Angehörigen-Entlastungsgesetz seit 01.01.2020: Elternunterhalt erst ab 100.000 € Bruttojahreseinkommen je Kind (IS24); Schenkungsrückforderung § 528 BGB, 10-Jahres-Frist (IS24).
- **Betreuung / Vollmacht**: § 1850 BGB (Gesetzestext): „Der Betreuer bedarf der Genehmigung des Betreuungsgerichts 1. zur Verfügung über ein Grundstück oder über ein Recht an einem Grundstück …, 5. zur Eingehung einer Verpflichtung zu einer der in den Nummern 1 bis 3 bezeichneten Verfügungen …“ Quelle: https://www.gesetze-im-internet.de/bgb/__1850.html. Notar-PM: Kaufvertrag „schwebend unwirksam“ bis Genehmigung, Gericht prüft Kaufpreis gutachterlich, Verfahren zeitaufwendig; privatschriftliche Vorsorgevollmacht reicht fürs Grundbuch nicht (§ 29 Abs. 1 GBO – öffentliche/beglaubigte Urkunde nötig); BGH: Betreuer muss Verkehrswert sorgfältig ermitteln, i. d. R. Verkehrswertgutachten (Az. lt. IWW-Auszug, **nicht ermittelt**); IS24 Demenz: Überschreibung nur bei Geschäftsfähigkeit bei Beurkundung wirksam. Quellen: https://notar.de/fileadmin/user_upload_notarde/pressemitteilungen/presseportal_auf-eine-notarielle-vorsorgevollmacht-sollten-immo_3810744.pdf ; IS24 Betreuer/Demenz-Seiten.

### 10.6 Lead-Magnete / CTAs
- reduco: Rechner (5×), kostenlose Immobilienbewertung (3×), Beratung (7×). VZ: Beratung, E-Book (4×). immo.info: Rechner (6×), Beratung (gemeinnützig, provisionsfrei-Hinweis). IS24: Bewertung, eBook.

### 10.7 Lücke – was die Rössler-Seite bieten muss
1. **ETW-Perspektive im Alter**: Verkauf der ETW zugunsten barrierefreier Wohnung/Betreutes Wohnen in Leonberg/Ditzingen/Pforzheim (Nachfrage-Seite: Senioren-ETW mit Aufzug); Hausgeld/Rücklage als laufende Belastung im Alter; WEG-Sanierungsbeschlüsse (Heizungstausch) als Verkaufsauslöser. Alle Top-Seiten reden vom Haus.
2. **„Vollverkauf + Umzug“ ehrlich gegenrechnen** (reduco macht es, kein Makler): Erlös 100 % vs. Nießbrauch-Abschlag 22–37 %, vs. Teilverkauf real 36 %.
3. **Pflegefall-Fahrplan mit Zuständigkeiten vor Ort**: Betreuungsgericht = Amtsgericht (Leonberg/Pforzheim/Ludwigsburg – **prüfen**), Sozialamt Landratsamt Böblingen / Ludwigsburg / Enzkreis / Stadt Pforzheim; Schonvermögen 10.000 €; Darlehenslösung § 91 SGB XII; § 1850 BGB-Genehmigung (Dauer: „mehrere Monate“ lt. Notar-PM) → Verkaufsdauer realistisch planen.
4. **Vollmacht-Check als Service**: Notarielle Vorsorgevollmacht nötig (§ 29 GBO) – Hinweis + Kooperation mit Notaren in Leonberg/Pforzheim (ohne Rechtsberatung).
5. **Warnung vor Teilverkauf/Sofortankauf-Modellen für Senioren** mit VZ/SVRV-Quellen – positioniert Rössler als ehrlichen Berater.
6. **Checkliste „Unterlagen, die der Betreuer/Bevollmächtigte für den ETW-Verkauf braucht“** inkl. WEG-Unterlagen und Verkehrswertgutachten-Anforderung des Gerichts.

---

## Thema 11: Privatverkauf vs. Makler (ohne Makler verkaufen – Risiken, Zeitaufwand)

### 11.1 Suchbegriffe
- „Wohnung ohne Makler verkaufen Privatverkauf Risiken Zeitaufwand“
- Beobachtung: Viele Treffer aus der Schweiz (neho.ch, comparis.ch) – deutsche Treffer: Homeday, reduco, bodenrichtwerte-deutschland.de, McMakler (403), uamr.de (Käufersicht).

### 11.2 Rankende Seiten
| # | URL | Typ | Wortzahl | FAQ | Autor / Datum | Schema |
|---|---|---|---|---|---|---|
| 1 | https://www.homeday.de/de/immobilienverkauf/haus-verkaufen-ohne-makler/ | M | ca. 3.400 | ja | kein Autor/Datum | BreadcrumbList |
| 2 | https://reduco.ai/blog/immobilienverkauf/haus-verkaufen-ohne-makler | D | ca. 5.400 | ja (FAQPage) | Hendrik Stotz; publ. 11.08.2026, akt. 17.08.2026 | BlogPosting, FAQPage, Legislation |
| 3 | https://www.bodenrichtwerte-deutschland.de/immobilienwissen/haus-verkaufen-ohne-makler | D | ca. 3.000 | ja | kein Autor/Datum („2026“) | Product/AggregateRating |
| 4 | https://www.mcmakler.de/exp/haus-verkaufen-ohne-makler | M | **403** | – | – | – |
| 5 | https://www.uamr.de/wohnung-kaufen-mit-makler-oder-ohne-… (Käufersicht) | D | nicht abgerufen | – | – | – |
| 6 | neho.ch / comparis.ch | CH | nicht relevant (Schweiz) | – | – | – |
| – | ImmoScout24 /wohnung-verkaufen-ohne-makler.html, /haus-verkaufen-ohne-makler.html; immoverkauf24: **404** |

### 11.3 H-Struktur wörtlich

**Homeday** (Title: „Haus verkaufen ohne Makler: Tipps zum Hausverkauf | Homeday“)
- H1: Haus verkaufen ohne Makler
- H2: Haus verkaufen ohne Makler: Welche Risiken drohen?
- H2: Haus verkaufen ohne Makler – Checkliste
- H2: Welche Kosten fallen für den Hausverkauf ohne Makler an?
- H2: Wie verkaufe ich ein Haus ohne Makler? (H3: Vorbereitung / Vermarktung / Verkaufsabschluss samt Abwicklung)
- H2: Haus verkaufen ohne Makler – geht das? (H3: Was sind die größten Risiken …? / Welche Gründe sprechen dafür?)
- H2: Immobilie verkaufen – mit oder ohne Makler?
- H2: Haus verkaufen ohne Makler – FAQ
- H2: Jetzt Makler vor Ort finden

**reduco.ai** (Title: „Haus privat verkaufen ohne Makler 2026: Ablauf in 9 Schritten“; Meta: „Sie sparen nur Ihren Provisionsanteil, bei 400.000 € rund 14.280 €. …“)
- H1: Haus privat verkaufen ohne Makler 2026: Ablauf in 9 Schritten
- H2: Das Wichtigste in Kürze
- H2: Privatverkauf, Verkauf von privat, Hausverkauf ohne Makler: ein Weg, drei Namen (H3: Immobilienverkauf ohne Makler: Haus, Wohnung oder Grundstück privat verkaufen)
- H2: Was Sie wirklich sparen: die Rechnung ohne Schönfärberei (H3: Die drei Fälle, in denen Sie weniger sparen als gedacht)
- H2: Was der Privatverkauf kostet (H3: Der Posten, den keine Tabelle abbildet: Zeit)
- H2: Ablauf beim Hausverkauf ohne Makler: die Anleitung in neun Schritten (H3: Schritt 1: Unterlagen … / 2: Preis ohne Makler-Werkzeuge / 3: Energieausweis vor dem ersten Inserat / 4: Exposé / 5: Wo inserieren, zu welchem Preis / 6: Anfragen filtern / 7: Besichtigungen)
- H2: Was Käufer 2026 in der Besichtigung fragen und was rechtlich wirklich gilt (H3: Schritt 8: Bonität des Käufers prüfen (den fast alle auslassen) / Schritt 9: Den Notar koordinieren)
- H2: Von privat an privat verkaufen: was ohne Profi auf beiden Seiten anders läuft
- H2: Die sieben häufigsten Fehler von Privatverkäufern
- H2: Rechtsfallen: Widerruf, Maklerklauseln, Arglist (H3: Gibt es ein Widerrufsrecht? / Was gilt, wenn ich parallel einen Makler beauftragt habe? / Der Haftungsausschluss und seine Grenze)
- H2: Haus mit oder ohne Makler verkaufen: wann sich der Alleingang lohnt
- H2: Steuern: die zwei Fristen, die Sie kennen müssen
- H2: Häufige Fragen (FAQ) (9 H3)

**bodenrichtwerte-deutschland.de** (Title: „Haus verkaufen ohne Makler 2026: Kosten, Ablauf, Risiken“)
- H1: Haus verkaufen ohne Makler: Ablauf, Kosten und rechtliche Pflichten 2026
- H3: Zusammenfassung / Inhaltsverzeichnis
- H2: Kann ich mein Haus ohne Makler verkaufen? (H3: Rechtliche Grundlagen / Für wen eignet sich der Privatverkauf? / Marktdaten: Wie häufig wird privat verkauft?)
- H2: Vor- und Nachteile: Hausverkauf ohne Makler im Vergleich (H3: Vorteile / Nachteile und Risiken / Direkter Vergleich)
- H2: Was kostet ein Hausverkauf ohne Makler wirklich? (H3: Kostenübersicht / Zeitwert berechnen / Versteckte Kosten)
- H2: Haus verkaufen ohne Makler: Schritt-für-Schritt-Anleitung (H3: Phase 1 Vorbereitung (Woche 1–4) / Phase 2 Vermarktung (Woche 5–12) / Phase 3 Verkaufsabschluss (Woche 13+))
- H2: Die 10 häufigsten Fehler beim Hausverkauf ohne Makler
- H2: Rechtliche & steuerliche Aspekte beim Privatverkauf (H3: Grundschuldlöschung & Vorfälligkeitsentschädigung)
- H2: Alternative: Hybrid-Modelle & Teilservice (H3: Nur Immobilienbewertung beauftragen / Einzelne Maklerleistungen buchen)
- H2: Checkliste: Ist Privatverkauf für Sie geeignet?
- H2: Häufige Fragen zum Thema Haus verkaufen ohne Makler

### 11.4 Welche Fragen beantwortet werden
- Darf ich privat verkaufen (ja; § 311b BGB Notar), für wen geeignet
- Was spare ich wirklich (nur Verkäuferhälfte), was kostet der Privatverkauf (Tabellen), Zeitaufwand (Stunden), Dauer
- Ablauf in Schritten/Phasen; die häufigsten Fehler; Bonitätsprüfung; Rechtsfallen (Widerruf, Maklerklausel, Arglist § 444 BGB)
- Hybrid-Modelle (nur Bewertung, Einzelleistungen)

### 11.5 Zahlen, Fakten, Rechtsgrundlagen
- **Ersparnis**: reduco: bei 400.000 € „rund 14.280 €“ (= 3,57 %); bei 350.000 € 10.430–12.495 € (2,98–3,57 %); „Die Ersparnis ist Ihre Hälfte, nicht die volle Provision“. bodenrichtwerte-deutschland: ca. 3–3,5 %.
- **Kosten Privatverkauf** (bodenrichtwerte-deutschland): Bewertung/Gutachter 500–2.000 €; Energieausweis 50–500 €; Grundbuchauszug 10–20 €; Fotos 200–800 €; Inserate 100–900 €; Rechtsberatung 300–1.000 €; Home Staging optional 1.000–5.000 €; gesamt ca. 2.000–10.000 €. reduco: Portal + Fotos 130–700 €.
- **Zeitaufwand**: 100–160 Stunden; Opportunitätskosten 5.000–8.000 € bei 50 €/h (bodenrichtwerte-deutschland). Vermarktungsdauer: mit Makler 3–6 Monate, ohne 6–12 Monate (ebd.; Quelle nicht genannt → „Richtwert“).
- **Marktanteil Privatverkauf**: bodenrichtwerte-deutschland: „zweistelliger Prozentsatz“ ohne Quelle; immostage.ai: KSK-Immobilien-Umfrage 2025 (ca. 500 Eigentümer): 67 % wählen den Maklerweg. Amtliche Zahl: **nicht gefunden**.
- **Rechtsnormen** (reduco): § 311b Abs. 1 BGB; § 444 BGB (Arglist, Grenze des Haftungsausschlusses); § 438 Abs. 1 Nr. 2 / Abs. 3 BGB (Verjährung); § 312g/§ 355 BGB (Widerruf – beim notariellen Kaufvertrag kein Widerrufsrecht; Maklervertrag ja); § 656a/§ 656c/§ 656d BGB; § 16a GwG (Geldwäsche-Identifizierung, betrifft Makler/Notar); § 196 BauGB (Bodenrichtwerte), § 193/§ 195 BauGB (Gutachterausschuss, Kaufpreissammlung); § 12 GBO (Grundbucheinsicht); § 80/§ 87 GModG; § 108 GModG (Bußgeld); § 794 Abs. 1 Nr. 5 ZPO (Zwangsvollstreckungsunterwerfung im Kaufvertrag); § 23 EStG.
- **10 häufigste Fehler** (bodenrichtwerte-deutschland): falscher Preis; Zeitaufwand unterschätzt; unvollständige Unterlagen; mangelnde Aufbereitung; amateurhaftes Exposé; Bonität nicht geprüft; schwache Verhandlungsposition; rechtliche Mängel; schwaches Marketing; Schnäppchenjäger.
- **Bußgeld Energieausweis**: bis 10.000 € (beide).

### 11.6 Lead-Magnete / CTAs
- Homeday: Checkliste (6×), Makler finden, Bewertung. reduco: Bewertung, PDF, Beratung. bodenrichtwerte-deutschland: Checkliste (3×), Bodenrichtwert-Abfrage (Lead), Rechner.

### 11.7 Lücke – was die Rössler-Seite bieten muss
1. **Ehrliche Rechnung mit eigener Provision** (reduco-Stil: „Sie sparen nur Ihre Hälfte“) – mit regionalem Beispiel 290.000 € ETW Leonberg: Ersparnis ≈ 10.353 € (3,57 %) vs. Kosten/Zeit/Preisrisiko. Ein Makler, der das offen rechnet, gewinnt Vertrauen.
2. **ETW-spezifische Privatverkaufs-Hürden**: Verwalterunterlagen, Verwalterzustimmung, Energieausweis über WEG, § 577-Vorkaufsrecht, Käuferfragen nach Protokollen/Sonderumlagen – Haus-Ratgeber lassen das aus.
3. **Hybrid-Angebot** (Bewertung + Exposé + Notarkoordination als Einzelleistungen) – bodenrichtwerte-deutschland beschreibt es, lokale Makler bieten es nicht sichtbar an.
4. **Lokale Vermarktungsdauer** sobald eigene Daten vorliegen; bis dahin reduco (90 Tage ETW-Vermarktung Q1 2026, 24 Städte) und bodenrichtwerte-deutschland (3–6 vs. 6–12 Monate) als Spannen mit Quelle.
5. **Bonitätsprüfung konkret** (Finanzierungsbestätigung, Eigenkapitalnachweis, Selbstauskunft; § 16a GwG-Identifizierung beim Notar) – reduco gut, Homeday schwach.
6. **Käuferfragen-Simulation 2026** (Heizung/GModG, Hausgeld, Sonderumlagen, Rücklage, Sperrfrist) – als „Was Käufer in Leonberg aktuell fragen“ (eigene Erfahrung, so kennzeichnen).

---

## Thema 12: Direktankauf / Sofortankauf Wohnung (wie Ankäufer arbeiten, Preisabschlag, Transparenz) – Anbieter in Deutschland

### 12.1 Suchbegriffe
- „Wohnung Sofortankauf Direktankauf Anbieter Preisabschlag Deutschland“ (keine Anbieter in den Top-Treffern)
- „Immobilie Sofortankauf Anbieter Deutschland Homeday Sofortverkauf McMakler Direktankauf Abschlag Verkehrswert“ (keine Treffer zu Homeday/McMakler-Angeboten – deren Sofortkauf-Produkte sind in den Suchergebnissen **nicht auffindbar**; ob sie 2026 noch existieren: **nicht gefunden**)
- „Immobilien Ankauf Unternehmen Sofortankauf Haus Wohnung Ankaufsangebot innerhalb 24 Stunden …“ (liefert Anbieterliste)
- „Immobilie Sofortankauf Anbieter Erfahrungen Test Verbraucherzentrale …“ (kein VZ-Test gefunden)

### 12.2 Rankende/relevante Seiten
| # | URL | Typ | Wortzahl | FAQ | Autor / Datum | Schema |
|---|---|---|---|---|---|---|
| 1 | https://www.immostage.ai/bewertung/immobilie-verkaufen-strategien/ („Immobilie verkaufen 2026 — Strategien verglichen“) | D (KI-Staging-Tool) | ca. 2.000 | ja (FAQPage) | Eugen Görtz; 2025 | Article, FAQPage, SoftwareApplication |
| 2 | https://www.immobilien-erfahrung.de/immobilien-sofort-ankauf-nrw-berlin-wohnung-haus-mehrfamilienhaus/ | Ankäufer (NRW/Berlin) | nicht abgerufen | – | – | – |
| 3 | https://www.deutsche-grund-invest.de/leistungen/sofortkauf | Ankäufer (bundesweit, Darmstadt-Vorwahl 06151) | – | – | – | – |
| 4 | https://immobiliendirektankauf.de/ueber-uns | Ankäufer (bundesweit; Kundenberichte Schleswig-Holstein) | – | – | – | – |
| 5 | http://www.immopaka.de/ („Wir kaufen Deine Wohnung. Und die Deiner Eltern!“; Stuttgart lt. ProvenExpert) | Ankäufer | ca. 1.800 | nein | – | – |
| 6 | https://www.immobilien-sofortkauf.de/ | Ankäufer/Vermarkter | ca. 9.000 | nein | – | GeoCoordinates, PostalAddress |
| 7 | https://www.sofortkaufimmobilien.de/ (Rhein-Main) ; https://deinimmokaeufer.de/ ; https://www.immofly.de/hausankauf.html (Kreis Heinsberg) ; https://www.immobilien-kraus.com/sofortankauf (Deggendorf) ; https://imdira.de/ (Dresden) ; https://www.distler-gruppe.de/immobilienankauf/ | Ankäufer regional | nicht abgerufen | – | – | – |
| 8 | ImmoScout24-Analysen (Verhandlungsspielraum Angebots- vs. Kaufpreis; vermietete vs. unvermietete ETW) | P | – | – | 2025 | – |
| 9 | https://ch.trustpilot.com/review/immobilien-sofortkauf.de (TrustScore 2,9/5, nicht repräsentativ) | Bewertungsportal | – | – | – | – |

### 12.3 H-Struktur wörtlich

**immostage.ai** (Title: „Immobilie verkaufen 2026 — Strategien verglichen | ImmoStage“; Meta: „Mit Makler, ohne Makler, Sofortankauf oder Auktion? 67 % der Eigentümer wählen den Maklerweg. …“)
- H1: Immobilie verkaufen 2026: 4 Strategien, 1 klare Entscheidung
- H2: Die 4 Verkaufsstrategien im Vergleich
- H2: Strategie 1: Mit Makler verkaufen — der Standardweg
- H2: Strategie 2: Privatverkauf ohne Makler
- H2: Strategie 3: Sofortankauf — Tempo statt Maximumpreis
- H2: Strategie 4: Auktion und Bieterverfahren
- H2: KI-Staging als Strategie-Beschleuniger (H3: Staging-Effekt / Erzielbarer Preis nach Verkaufsstrategie (% des Marktwerts) / Wie verkaufen Eigentümer ihre Immobilie? (Deutschland 2025))
- H2: Welche Strategie passt zu Ihnen? (H3: Zeitdruck: Ja / Zeitdruck: Nein + Maximaler Preis / Zeitdruck: Nein + Provision sparen / Schwer bewertbares Objekt)
- H2: Häufige Fragen zur Verkaufsstrategie

**immopaka.de** (Title: „immopaka. - Wir kaufen Deine Immobilie. Und die Deiner Eltern!“; Meta: „Wir kaufen Deine Immobilie und geben Dir sogar innerhalb von 24h eine schriftliche & verbindliche Kaufpreiszusage.“)
- H1: Wir kaufen Deine Wohnung. Und die Deiner Eltern!
- H2: immopaka funktioniert ganz einfach
- H2: Verkaufe an uns und mache Familien glücklich
- H2: Unsere Kunden lieben uns
- H2: immopaka ist einfach besser als die Konkurrenz
- H2: Verkauf mit Makler / H2: Verkauf an immopaka (Vergleich)
- H2: Verkaufe uns jetzt Deine Immobilie!
- H2: Noch Fragen?!
(Inhalt der Vergleichstabelle konnte wegen Redirect nicht extrahiert werden – **nicht gelesen**.)

**immobilien-sofortkauf.de**
- H2: Wir kaufen Ihre Immobilie sofort oder bewerben Sie bundesweit.
- H2: Verkaufen Sie Ihre Immobilie an uns oder ohne Makler von privat an privat!
- H2: In Deutschlands größtem Immobiliennetzwerk mit bis zu 70 Millionen Besuchern monatlich
- H2: Top-Preise für private Immobilienverkäufer / H2: Wir kaufen Ihre Immobilie selbst / H2: Vollverkauf plus+ / H2: Bundesweite Bewerbung / H2: Finanzierung / H2: In 2 Schritten zum Erfolg… / H2: Schritt 1 – Rufen Sie uns an! / H2: Schritt 2 -Ihr Erfolgstermin / H2: Kundenmeinungen
(Mischmodell Ankauf + Vermarktung; keine Preis-/Abschlagsangaben auf der Startseite; 44× „Beratung“.)

### 12.4 Wie die Ankäufer arbeiten und sich darstellen (Befunde)
- **Deutsche Grundinvest** (Sofortkauf-Seite): Erstgespräch → Begehung „am nächsten Tag“ → Kaufangebot ca. 24 h später → Geld „eine Woche später“ auf dem Konto; Versprechen „zahlen wir immer marktgerechte Preise“, „kostet Sie keinen Cent“; keine Region, keine Abschlagsangabe; kauft auch Rohbauten, Scheunen, Gewerbe.
- **Immobiliendirektankauf.de**: Ortstermin → unverbindliches schriftliches Angebot „innerhalb von 24 Stunden nach Ortstermin“; Angebote „nicht verhandelbar“, 10 Werktage gültig; Bewertung nach Sachwert-/Ertrags-/Vergleichswertverfahren + Grundstücksmarktberichte; „Bestpreise durch spätere Mehrwertschaffung“; kein Energieausweis nötig, keine Mängelhaftung; DGuSV-Siegel; Tippgeber-Provision (1.800 € in Kundenbericht); keine Abschlagsangabe.
- **immopaka (Stuttgart)**: verbindliche Kaufpreiszusage in 24 h; Zielgruppe Erben/„Eltern“; Vergleich „Makler vs. immopaka“ (Inhalt nicht lesbar).
- **immobilien-sofortkauf.de**: Hybrid (Ankauf oder bundesweite Bewerbung), Trustpilot 2,9/5 (nicht repräsentativ), Beschwerde über Druck zum Filialbesuch (Einzelstimme).
- **Vobahome (Volksbank-Modell, lt. FinanceFwd via immostage)**: sofort 40 % des geschätzten Marktwerts + 4,5 % Sicherheitseinbehalt; Beispiel 500.000 € → netto ca. 177.500 €; Rückzahlungsklausel: wird die Immobilie nicht binnen 13 Monaten weiterverkauft, muss der Verkäufer 200.000 € zurückzahlen oder die Immobilie geht zu 40 % an den Anbieter; Voraussetzungen Bj. ab 1980, lastenfrei, Sprengnetter-Lage ≥ 3+. (Sekundärquelle; Produktstatus 2026 **nicht geprüft**.)
- **Regionale Ankäufer** (Rhein-Main, NRW/Berlin, Heinsberg, Deggendorf, Dresden): 24-h-Angebote, regional begrenzt. **Für Region Stuttgart/Pforzheim: außer immopaka (Stuttgart) kein spezialisierter Ankäufer gefunden.**
- **Homeday Sofortkauf / McMakler Sofortverkauf**: in der Suche **nicht auffindbar** (vermutlich eingestellt – nicht bestätigt).

### 12.5 Zahlen zum Preisabschlag
- immostage.ai-Tabelle: Sofortankauf 40–90 % des Marktwerts, Dauer Tage bis Wochen, „~8 %+ Gebühren“; FAQ: Abschläge „10 bis 60 % unter Marktwert“ (inkonsistent); immobilien-erfahrung.de (lt. immostage): typischer Abschlag bis 10 %; Makler 95–100 %, Privat 85–100 %, Auktion/Bieterverfahren 80–105 %. Quellen lt. Seite: immoverkauf24.de, FinanceFwd.com, DGA AG, heid-immobilienbewertung.de.
- Marktkontext: ImmoScout24/Sprengnetter (Juli 2025, lt. biallo.de): Differenz Angebots- zu Kaufpreis bei ETW: Hamburg 10 %, Köln 9 %, Leipzig < 4 %; Spielraum seit Ende 2023 um ca. 2 Prozentpunkte geschrumpft. Stuttgart-Wert **nicht gefunden**.
- Verbraucherzentralen: Warnungen beziehen sich auf Teilverkauf (vzhh), nicht explizit auf Sofortankauf; VZ-Vertragsprüfung 100–300 € (IS24 lt. Suchergebnis).
- Belastbare, unabhängige Statistik zu Sofortankauf-Abschlägen in Deutschland: **nicht gefunden**.

### 12.6 Lead-Magnete / CTAs der Ankäufer
- „Kostenlose Bewertung“, „Angebot in 24 h“, Telefon-Hotline, „kostet Sie keinen Cent“, Kundenstimmen, Siegel (DGuSV, ProvenExpert), E-Book (immopaka 2×). Transparenz über Abschläge: bei keinem Anbieter auf der Seite.

### 12.7 Lücke – was die Rössler-Seite bieten muss (als Aufklärungs-/Vergleichsseite)
1. **Nüchterne Erklärung des Geschäftsmodells** (Ankauf unter Marktwert, Weiterverkauf nach Aufwertung; 24-h-Angebote; nicht verhandelbar; Rückzahlungsklauseln wie bei Vobahome) mit Quellen – kein Makler vor Ort macht das.
2. **Rechenvergleich für eine Leonberger/Pforzheimer ETW**: Marktwert 290.000 € → Sofortankauf 60–90 % = 174.000–261.000 € sofort vs. Maklerverkauf ~95–100 % abzgl. 3,57 % Provision in 3–5 Monaten. Transparenz über die eigene Provision gehört dazu.
3. **Wann Sofortankauf trotzdem sinnvoll sein kann** (Zeitdruck Scheidung/Erbstreit/Auslandsumzug – immostage) und **Alternative „beschleunigter Maklerverkauf“** (Vorab-Käuferkartei, Bieterverfahren) als Rössler-Angebot.
4. **Checkliste Seriosität**: Impressum/Sitz, § 34c GewO, schriftliches Angebot mit Bindefrist, kein Vorab-Honorar, unabhängige Bewertung einholen (Gutachterausschuss/BORIS-BW), VZ-Vertragsprüfung 100–300 €, Notarvertrag lesen (Rücktritts-/Rückkaufklauseln).
5. **Hinweis auf fehlende regionale Anbieter** (nur immopaka Stuttgart gefunden) – Verkäufer in Heimsheim/Leonberg landen bei bundesweiten Ankäufern ohne Ortskenntnis.
6. Title-Idee: „Wohnung sofort verkaufen in Leonberg – Sofortankauf oder Makler? Ehrlicher Vergleich“.


---

# TEIL B – LOKALES SEO UND ORTSSEITEN

## B1. Lokale Suchen: Wer rankt, welche Seitentypen

Hinweis: Die genutzte Suche gibt keine Google-Positionen aus; nachfolgend die Top-Treffer je Suchbegriff in der gelieferten Reihenfolge. Linus sollte die sechs Suchen zusätzlich selbst in Google (Standort Leonberg, Inkognito) prüfen und das Local Pack (Maps-3er-Block) protokollieren – das Local Pack ist in dieser Recherche **nicht sichtbar**.

### B1.1 „Wohnung verkaufen Leonberg“
Top-Treffer (Reihenfolge der Suche):
1. von-poll.com – Exposé-PDF (Objektangebot) – Typ: Makler-Objektseite
2. wohnglueck.de/property/1339301 – Etagenwohnung in Leonberg – Typ: Portal-Inserat
3. realestate.bnpparibas.de – Pressemitteilung Wohninvestment Leonberg 2020 – Typ: PDF/News
4. wohnglueck.de/property/1842289 – Inserat
5. immosuchmaschine.de – „günstige Wohnung kaufen 71229 Leonberg“ – Typ: Aggregator-Kategorieseite
6. immobilo.de – Mehrfamilienhaus kaufen Leonberg – Aggregator
7. immosuchmaschine.de – Dachgeschosswohnung kaufen – Aggregator
8. nestoria.de – „1.967 Wohnungen kaufen in Leonberg“ – Aggregator
9. stuttgarter-zeitung.de – Unternehmensprofil Bauexpert Wohnbau GmbH (Römerstraße 33, Leonberg; „kostenlose Bewertung“) – Typ: Verzeichnis/Unternehmensprofil
- Befund: **Keine einzige Makler-Ratgeber- oder Ortsseite „Wohnung verkaufen in Leonberg“** unter den Treffern; die Intention wird von Kauf-Inseraten dominiert (Google interpretiert „Wohnung verkaufen Leonberg“ gemischt als Kauf-/Verkaufsabsicht). Ein lokaler Makler erwähnt: Bauexpert Wohnbau (Leonberg), Volksbank Leonberg-Strohgäu (kostenlose Wertermittlung im Inserat).
- Chance: Eine dedizierte Verkäufer-Ortsseite mit Marktdaten, WEG-Bezug und klarer Verkaufs-Intention hat kaum direkte Konkurrenz im organischen Bereich.

### B1.2 „Immobilienmakler Leonberg“
1. immobilienscout24.de/anbieter/immobilienmakler/de/baden-wuerttemberg/boeblingen-kreis/leonberg – Portal-Verzeichnis („Es wurden 203 Immobilienmakler in Leonberg (Kreis Böblingen) gefunden.“ – Seitenstand beim Abruf; die Suche nannte 178)
2. immoportal.com/immobilienmakler/leonberg – Portal-Verzeichnis (98 bzw. 111 Makler; nennt Mittler Real Estate, KLINGENSTEIN, Alpha Immobilien, Simanok Immobilien mit Leonberger Adresse)
3. von-poll.com/de/immobilien/leonberg – Makler-Ortsseite (Angebote + Shop Leonberg)
4. immoportal.com/immobilienmakler/baden-wuerttemberg/leonberg – Verzeichnis
5. mcmakler.de/standorte/stuttgart/pietro-leggieri – Makler-Personenprofil
6. jacasa.de/immobilienmakler/mcmakler-leonberg – Verzeichnis (McMakler, Rutesheimer Straße 40, 4,8 Sterne aus 148 Bewertungen)
7. mcmakler.de/standorte/stuttgart/annabella-guerriero – Personenprofil
8. jacasa.de/immobilienmakler/iep-wohnen-leonberg – Verzeichnis (iep wohnen, Röntgenstraße 26, > 15 Jahre, 20 Mitarbeiter)
9. stuttgarter-zeitung.de – Artikel „teuerste Immobilie in Leonberg“ (Engel & Völkers)
- Befund: Verzeichnisse (IS24, immoportal, jacasa) + Franchise/Hybrid (von Poll, McMakler). Lokale Einzelmakler erscheinen nur über Verzeichnisse. 
- Struktur von-poll.com/de/immobilien/leonberg (abgerufen): Title „Immobilien in Leonberg – Aktuelle Angebote“; H1: Immobilien in Leonberg – Aktuelle Angebote; H2: VON POLL IMMOBILIEN – Ihr Partner für die Immobiliensuche in Leonberg; H2: Schneller und erfolgreicher bei Suche nach der passenden Immobilie; H2: Kontakt; H2: Neueste Artikel aus unseren Blogs; ca. 1.800 Wörter; FAQ ja; Schema: RealEstateAgent, PostalAddress, GeoCoordinates, ItemList, Offer. → Ortsseite = Objektliste + Shop-Kontakt + Blog-Teaser, **keine Marktdaten**.
- Struktur IS24-Verzeichnisseite: H1 „Es wurden 203 Immobilienmakler in Leonberg (Kreis Böblingen) gefunden.“; H2: Wir finden für Sie den passenden Makler aus Ihrer Region; H2: Immobilienmakler Leonberg - Finden Sie Ihren lokalen Experten; H2: Qualifizierte Immobilienmakler in Leonberg; ca. 620 Wörter; Provisionshinweis 3,57–7,14 %.

### B1.3 „Wohnung verkaufen Pforzheim“
1. wohnungsboerse.net/immodetail-k/39634248 – Inserat (EG-Wohnung Südweststadt, 44 m², Bj. 1986, Klasse D, 164.000 €)
2. huebsch.karlsruhe.de – irrelevant (Stellenanzeige)
3. von-poll.com – Exposé-PDF
4./5. wohnglueck.de/property/… – Inserate
6. immowelt.de – Suchergebnisseite „Wohnung mit Keller Pforzheim Innenstadt“
7./8. landtag-bw.de – Drucksache 17/9410 (Wohnungsmarkt Stadtkreis Pforzheim, parlamentarische Anfrage) – Typ: amtliches PDF
9. immobilo.de – Aggregator Pforzheim-Nordstadt
- Befund: Inserate/Aggregatoren; keine Makler-Ortsseite; amtliche Quelle (Landtagsdrucksache) als Datenquelle für Ortsseite nutzbar (Inhalt nicht ausgewertet – **nachholen**: https://www.landtag-bw.de/resource/blob/594668/5139a27b9c42942fb2e9d026dfe7cc7e/17_9410_D.pdf).

### B1.4 „Immobilienmakler Heimsheim“
1. immobilienscout24.de/anbieter/immobilienmakler/de/baden-wuerttemberg/enzkreis/heimsheim – Verzeichnis (38 bzw. „mehr als 40“ Makler)
2. jacasa.de/immobilienmakler/bw/heimsheim – Verzeichnis (1 Makler: Heß & Wapler Immobilienverwaltung, Jakob-Hornung-Straße 1, 2,9 Sterne; Stand 30.06.2026)
3./4. ohne-makler.net – Inserate Heimsheim (Miete/Haus kaufen)
5. IS24-Verzeichnis Eimsheim (Rheinland-Pfalz – Fehlzuordnung)
6. wko.at – irrelevant
7. stepstone – irrelevant
8. dastelefonbuch.de – „Immobilien Roland Rössle, Alte Mönsheimer Str. 92, Heimsheim, 07033 53 39 95“ (Mietobjektvermittlung) – Verzeichnis
9. noe.bic.at – irrelevant
- Befund: Extrem dünner Wettbewerb; nur Verzeichnisse. **Namensnähe „Rössle Immobilien“ (Heimsheim) vs. „Rössler Immobilien“** – Verwechslungsgefahr in Google-Profil/Verzeichnissen aktiv managen (eindeutiger Name, Logo, Adresse).

### B1.5 „Wohnung verkaufen Ditzingen“
1. von-poll.com – Exposé-PDF
2. wohnungsboerse.net/Ditzingen/1-zimmer-wohnung-kaufen – Kategorieseite
3. monteurzimmer.de – irrelevant
4. von-poll.com – Exposé
5. wohnglueck.de – Maisonette Ditzingen (Inserat)
6. monteurzimmer.at – irrelevant
7. wohnglueck.de – Zinshaus Ditzingen
8. immosuchmaschine.de/g/71254-ditzingen/wohnung-kaufen – Aggregator („84 Eigentumswohnungen … Penthouse 1.030.000 €, 3–4-Zi. 329.000 €“)
9. ohne-makler.net – „142 provisionsfreie Wohnungen Ditzingen und Umgebung“
- Beispiel-Inserat lt. Suchergebnis: Hirschlanden, kernsanierte 3,5-Zi., 79 m², 279.000 €, Hausgeld 390 €.
- Befund: keine Makler-Ortsseite, keine Ratgeber.

### B1.6 „Immobilienmakler Renningen“
1./2. immoportal.com/immobilienmakler/(baden-wuerttemberg/)renningen – Verzeichnis (36 bzw. 44 Makler; nennt Kirchberger Immobilien, Lange Str. 4; Gäu Immobilien, Kirchstr. 5; DC Immobilien & Verwaltung, Heimsheimer Str. 23; Jasmin Kauffmann GmbH, Wielandstraße 13)
3. immobilienscout24.de/anbieter/…/renningen – Verzeichnis (144 Makler)
4. kennstdueinen.de – Bewertungsverzeichnis
5. jacasa.de/immobilienmakler/bw/renningen – Verzeichnis (Gäu Immobilien 4,9 Sterne / 59 Bewertungen)
6. jacasa.de/…/dc-immobilien-verwaltung-renningen
7. trustlocal.de – „Top 10 Immobilienmakler Renningen“
8. golocal.de/renningen/immobilien/
9. gelbeseiten.de – RENNER Immobilien
- Befund: nur Verzeichnisse. Lokaler Wettbewerber mit SEO-Aktivität: **Gäu Immobilien (Jan Braun, DEKRA-Sachverständiger D1)** – Startseite (gaeu-immobilien.de, Schema Organization/WebSite, zuletzt geändert 01.10.2026): H1 „Ihr Immobilienmakler Jan Braun“; H2 „Rundum-Sorglospaket vom Sachverständigen.“; H2 „100 % kostenlose Immobilienbewertung vom Experten“; H2 „Gäu Immobilien Podcast“; H2 „Gründe für den Verkauf mit Immobilienmakler“ (H3: 96 % Vermittlungsquote / Professionelle Wertermittlung / Marktkenntnis und Erfahrung / Zeitersparnis und Erreichbarkeit / Exposé-Erstellung und Vermarktung / Ruhige Nächte und maximaler Erlös / Moderation und Vermittlung / Gäu Profiwissen und Beratung); H2 „Unser Service als Immobilienmakler“ (H3: Lokal engagierte Makler mit über zehn Jahren Erfahrung vor Ort / Verkäufer und Käufer bezahlen eine moderate Provision / … ); Meta: „✓keine Verkäuferprovision ✓Homestaging ✓IHK zertifiziert“ (Widerspruch zur H3 „Verkäufer und Käufer bezahlen eine moderate Provision“ – offenbar Modellwechsel); CTAs: eBook, Checkliste, kostenlose Bewertung. Sitemap verweist auf wohntreu.de (Domainwechsel/zweite Marke). Ortsseiten in der Sitemap: **nicht erkennbar** (nur Objekt-/Personen-Sitemaps).
- iep wohnen (Leonberg): Bauträger/Makler; Startseite H1 „Bauen . Wohnen . Leben !“, Projekte in Leonberg-Warmbronn (Wohnquartier Gartenstraße), Ditzingen-Heimerdingen; keine Ortsseiten/Ratgeber erkennbar.
- Kirchberger-immobilien.de ist ein anderer Makler (Kirchberg/Sachsen) – nicht der Renninger (Domain-Verwechslung; lokaler Kirchberger Immobilien-Webauftritt **nicht gefunden**).
- Mittler Real Estate, Simanok, Alpha Immobilien Leonberg: Websites **nicht erreichbar/nicht gefunden** (Proxy 502 bzw. Domain unbekannt) – manuell prüfen.

### B1.7 Zusammenfassung B1
- Organische Top-Treffer für Verkaufs-Keywords: fast ausschließlich Inserate/Aggregatoren (wohnglück, immosuchmaschine, nestoria, immobilo, von-Poll-Exposé-PDFs).
- Für Makler-Keywords: Verzeichnisse (IS24, immoportal, jacasa, trustlocal, golocal, gelbeseiten) + Franchise (von Poll, McMakler).
- Keine lokale Makler-Ortsseite mit Marktdaten/Ratgebercharakter gefunden → Eine gut gemachte „Wohnung verkaufen in {Ort}“-Seite mit echten Zahlen, WEG-Bezug und lokaler Rechtslage (Sperrfrist, Grunderwerbsteuer 5 %) hat realistische Chancen; parallel muss das Google-Unternehmensprofil (Local Pack) besetzt werden, weil „Immobilienmakler {Ort}“ stark Maps-getrieben ist.
- Eintrag in die Verzeichnisse, die ranken (IS24-Maklerverzeichnis, immoportal, jacasa, trustlocal, golocal, gelbeseiten, kennstdueinen) = NAP-Zitate (siehe B3).

## B2. Lokale Markt- und Ortsdaten (mit Quelle und Stand)

Vorbemerkung: Alle Preisangaben der Portale sind **Angebotspreise** (keine Transaktionspreise), Methodik je Portal unterschiedlich; Abweichungen zwischen Portalen von bis zu ~30 % (Renningen) sind normal. Amtliche Kaufpreise liefern nur die Gutachterausschüsse (Kaufpreissammlung, Immobilienmarktbericht) – für Leonberg/Enzkreis/Pforzheim/Ditzingen/Renningen wurden aktuelle Marktberichte **nicht online gefunden** (Pforzheim nur 2021/22-PDF). Empfehlung: Marktberichte direkt anfordern (Kontakte unten) und auf der Website als „amtliche Quelle“ zitieren.

### B2.1 Preisübersicht Eigentumswohnungen (Angebotspreise €/m²)

| Ort | immoportal.com (Stichtag 01.10.2026, Ø / Spanne / Vorjahr) | immoverkauf24 (Sprengnetter, Q2 2026, Ø Wohnung / Trend Q / Vorjahr) | ImmoScout24 Regional (Text, ohne Datum) | weitere |
|---|---|---|---|---|
| Leonberg | 3.733 € (3.093–4.814); 2025: 3.825 € | 4.042,68 € (+0,20 % z. Vorquartal; +0,17 % z. Vorjahr); Top 4.187,14 € | „im Schnitt über 4.000 €/m², Preise zwischen 3.700 und 6.800 €“; 175 ETW-Angebote | McMakler Ø 3.898 € (2.793–6.833); miet-check.de 4.623 € (12 Mon., 220 Angebote); ohne-makler.net 3.994 € (2026); Homeday Preisatlas Q3: teuerste Angebote 6.950/6.150/5.950/5.850 €/m², günstigste 2.200/3.650/3.900/4.400 €/m² |
| Heimsheim | 3.212 € (2.479–4.218); 2025: 3.243 € | 3.623,00 € (+0,93 %; +2,89 % z. Vorjahr) | „im Mittel mehr als 3.600 €/m², zwischen 3.550 und 5.340 €“; 10 ETW-Angebote | immobilienpreise-2026.de 3.626 € (+3,1 %) |
| Ditzingen | 3.686 € (2.961–4.848); 2025: 3.818 € | 4.065,13 € (−0,68 %; +0,84 % z. Vorjahr) | „über 4.000 €/m², 3.590–6.525 €“; 101 ETW-Angebote | wohnungsboerse.net 4.795,73 € (Ende Mai 2026, alle Kaufobjekte); Homeday Preisatlas Umgebungstabelle: Wohnungen 4.200 €/m², Miete 14,5 €/m² |
| Renningen | 4.986 € (4.130–6.429); 2025: 5.574 € (Ausreißer durch Neubau?) | 4.054,25 € (+0,75 %; +0,74 % z. Vorjahr) | „über 4.030 €/m², 3.667–6.177 €“; 100 ETW-Angebote | immobilienpreise-2026.de 4.031 € (+0,8 %); wohnungsboerse.net 5.082,36 €; Homeday Umgebungstabelle: Wohnungen 4.700 €/m², Miete 15,6 €/m² |
| Pforzheim | 2.928 € (2.283–3.621); 2025: 2.939 €; Stadtteile: Eutingen 2.987 €, Huchenfeld 2.928 €, Würm 2.730 € (lt. Suchergebnis) | 3.010,44 € (+1,11 %; +0,82 % z. Vorjahr); Stadtteile: Buckenberg 3.262,81 €, Südoststadt 3.127,89 €, Büchenbronn 3.107 €, Südweststadt 3.079,12 €, Brötzingen 3.008,44 €, Dillweißenstein 3.008,60 €, Eutingen 3.000,78 €, Au 2.976 €, Nordstadt 2.949,12 €, Huchenfeld 2.925,40 €, Innenstadt 2.874 €, Weststadt 2.863,71 €, Oststadt 2.862,11 €, Hohenwart 2.647,60 € | **404** (IS24-Regionalseite Pforzheim nicht erreichbar) | ohne-makler.net 2.993 € (−0,45 %); miete-aktuell.de 2.912,61 € (2026) / 2.909,32 € (2025); IVD-CityReport 7/2026: Kaufmarkt verhalten, Mietnachfrage hoch; IVD H2/2025: Großteil des Angebots unter 4.000 €/m² |

Quellen:
- immoportal: https://www.immoportal.com/immobilienpreise/leonberg , …/heimsheim , …/ditzingen , …/renningen , …/pforzheim (FAQ-Block „Was kostet eine Wohnung in …?“, Stichtag 01.10.2026)
- immoverkauf24: https://www.immoverkauf24.de/immobilienpreise/baden-wuerttemberg/boeblingen-kreis/leonberg/ ; …/ludwigsburg-kreis/ditzingen/ ; …/boeblingen-kreis/renningen/ ; …/enzkreis/heimsheim/ ; …/baden-wuerttemberg/pforzheim/ („Quelle: Powered by Sprengnetter | Stand: Q2 2026“)
- IS24 Regional: https://www.immobilienscout24.de/regional/de/baden-wuerttemberg/boeblingen-kreis/leonberg/ ; …/ludwigsburg-kreis/ditzingen/ ; …/boeblingen-kreis/renningen/ ; …/enzkreis/heimsheim/ (Hinweis auf der Seite: „KI-gestützt … Einige Angaben können ungenau sein“)
- Homeday Preisatlas: https://www.homeday.de/de/preisatlas/leonberg/
- McMakler: https://www.mcmakler.de/immobilienpreise/baden-wuerttemberg/leonberg (403 beim Abruf; Werte aus Suchergebnis)
- miet-check.de, ohne-makler.net, immobilienpreise-2026.de, wohnungsboerse.net, miete-aktuell.de: Werte aus Suchergebnissen (Seiten nicht vollständig abgerufen; wohnungsboerse.net blockt mit Captcha)
- IVD-CityReport Pforzheim: https://www.konii.de/?p=211416 (lt. Suchergebnis, Juli 2026) und https://www.konii.de/?p=197000 (H2/2025)

### B2.2 Häuser (Angebotspreise €/m²) – für Kontext auf Ortsseiten
| Ort | immoportal 01.10.2026 | immoverkauf24 Q2 2026 | IS24 Regional |
|---|---|---|---|
| Leonberg | 4.288 € (3.143–5.585); 2025: 4.527 € | 4.732,59 € (−1,44 % z. Vorquartal) | „mehr als 4.700 €/m², 4.200–7.500 €“ |
| Heimsheim | 4.021 € (2.717–5.466); 2025: 3.775 € | 3.980,33 € (−2,24 %) | „über 3.970 €/m², 3.850–5.190 €“ |
| Ditzingen | 4.104 € (2.875–5.526); 2025: 4.302 € | 4.871,42 € (−0,30 %) | „über 4.840 €/m², 4.380–6.660 €“ |
| Renningen | 4.365 € (3.200–5.686); 2025: 4.382 € | 4.690,50 € (+0,19 %) | „über 4.680 €/m², 4.281–6.512 €“ |
| Pforzheim | 3.131 € (2.133–4.253); 2025: 3.082 € | 3.516,68 € (−1,50 %) | – |

### B2.3 Mieten (Angebotsmieten €/m² kalt)
- Leonberg: 15,78 €/m² (wohnungsboerse.net, Ende Mai 2026, lt. Suchergebnis); „mehr als 13 €/m², Spanne 12–19 €“ (IS24 Regional); Häuser „über 14 €/m²“.
- Heimsheim: „etwa 12 €/m², Spanne 12–16 €“ (IS24 Regional).
- Ditzingen: „mehr als 13 €/m², 11,60–18,30 €“ (IS24 Regional); 14,5 €/m² (Homeday-Umgebungstabelle).
- Renningen: „mehr als 13 €/m², 12,65–17,38 €“ (IS24 Regional); 15,6 €/m² (Homeday).
- Pforzheim: 10,88 €/m² (2026, konstant z. Vorjahr; ohne-makler.net Mietspiegel lt. Suchergebnis); 8,58 €/m² Genossenschaftswohnungen (lt. Suchergebnis, Quelle unklar).
- Qualifizierter Mietspiegel: Pforzheim hat einen (Stadt-Website – **nicht abgerufen**); Leonberg: **nicht gefunden**; Ditzingen/Renningen/Heimsheim: **nicht gefunden**.

### B2.4 Bodenrichtwerte (bodenrichtwerte-deutschland.de, Aggregator; amtliche Werte über BORIS-BW)
- Leonberg: Ø 766 €/m² Wohn-/Mischbebauung (Stichtag 01.01.2025, veröffentlicht 25.06.2025; −5,2 % z. Vorjahr 808 €); Spanne 100–1.600 €/m²; Höchststand 2021: 862 €/m²; seit 2000 +149 %; Gewerbe Ø 389 €/m². Seite „Letzte Änderung 19.10.2026“; Werte zum 01.01.2026 „planungsgemäß zwischen März und Juni 2026“ – auf der Seite noch nicht eingepflegt. Quelle: https://www.bodenrichtwerte-deutschland.de/boris/bw/leonberg
- Heimsheim: Ø 235 €/m² (Stichtag 01.01.2025; −0,8 % z. Vorjahr 237 €); Spanne 30–870 €/m²; Höchststand 2021: 252 €/m²; seit 2000 von 90 €/m². Quelle: https://www.bodenrichtwerte-deutschland.de/boris/bw/heimsheim
- Ditzingen, Renningen, Pforzheim: **nicht abgerufen** (analoge Seiten existieren; amtlich: BORIS-BW https://www.gutachterausschuesse-bw.de/borisbw – URL zu verifizieren).
- Gutachterausschüsse (Kontakte lt. Aggregator/Suche): Gutachterausschuss der Stadt Leonberg, Belforter Platz 1, 71229 Leonberg, gutachterausschuss@leonberg.de, 07152 990-3119 (Stadtseite: https://www.leonberg.de/Rathaus/Verwaltung/Gutachterausschuss – Aufgaben/Mitglieder, kein Marktbericht online gefunden); Zweckverband Gemeinsamer Gutachterausschuss im Enzkreis (Mühlacker), gutachter@gua-enzkreis.de, gutachterausschuss-enzkreis.de (zuständig Heimsheim); Gutachterausschuss Stadt Pforzheim (Immobilienmarktbericht 2021/22: https://www.pforzheim.de/fileadmin/user_upload/bauen/Gutachterausschuss/Immobilienmarktbericht_2021_22_Internet.pdf ; neuere Berichte **nicht gefunden**); Ditzingen (Landkreis Ludwigsburg) und Renningen (Landkreis Böblingen): zuständiger Ausschuss **nicht ermittelt** (ggf. gemeinsamer Gutachterausschuss des Landkreises – prüfen).
- Zum Vergleich Stuttgart (Gutachterausschuss, Feb. 2026): Durchschnittspreis weiterverkaufte ETW rund 4.250 €/m² (lt. Suchergebnis https://www.stuttgart.de/service/aktuelle-meldungen/2026/februar/stuttgarter-immobilienmarkt-weiterhin-im-aufwind-gutachterausschuss-stellt-neue-auswertung-vor).

### B2.5 Ortsdaten je Stadt

**Leonberg (Landkreis Böblingen, PLZ 71229)**
- Einwohner: 49.514 (31.12.2025; de.wikipedia.org/wiki/Leonberg, Quelle dort: Statistisches Landesamt BW); Stadt-Stellenanzeige 2024: „ca. 49 000 Einwohner“; Homeday: „Rund 48.000 Einwohner … rund 49 Quadratkilometern“; IS24 Regional: 48,1 km², 8 Schulen, 18 Kindergärten, 66 ÖPNV-Verbindungen (KI-generierte Angaben).
- Stadtgliederung (Wikipedia): Kernstadt, Eltingen (1938 eingemeindet, mit Kernstadt zusammengewachsen), Gebersheim, Höfingen, Warmbronn (1975); Stadtteile Silberberg (räumlich getrennt) und Ramtel, Wohngebiet Gartenstadt; Wohnplätze Eichenhof, Glemseck, Hinter Ehrenberg, Mahdental, Rappenhof; Höfingen und Gebersheim zählen zum Strohgäu.
- Verkehr (Wikipedia): S-Bahn S6, S60, S62 auf der Württembergischen Schwarzwaldbahn; Bahnhof Leonberg (S6 bedient innerhalb Leonbergs nur den Bahnhof; Höfingen eigener Halt lt. Fahrplanquelle); A 8 und A 81; Anschlussstelle Leonberg-West (2008) mit B 295; VVS-Tarif. Fahrzeit S6 Leonberg–Stuttgart Hbf (tief): ca. 25 Minuten (Beispielfahrt S6 7669, 21:47→22:12, Jan. 2026, signal.eu.org – Einzelbeleg, VVS prüfen). Zuverlässigkeit: Stuttgarter Zeitung berichtet, am Bahnhof Leonberg komme in manchen Wochen fast jeder vierte Zug verspätet (Datum unklar).
- Wirtschaft (Wikipedia): GEZE (Türtechnik) Stammsitz, rund 1.100 Mitarbeiter in Leonberg, weltweit > 3.000 (Stand 2025); Leonberger Bausparkasse (gegr. 1924), rund 560 Mitarbeiter in Leonberg; weitere **nicht ausgewertet**.
- Recht: Kündigungssperrfrist 5 Jahre (KSpVO BW 2026, § 1); Mietpreisbremse/Kappungsgrenze: Leonberg in früherer Gebietskulisse (haufe.de lt. Suchergebnis) – aktuelle Mietpreisbremsen-VO BW **nicht geprüft**.
- Gutachterausschuss: s. B2.4. Bodenrichtwert Ø 766 €/m².
- Pendlerzahlen: **nicht gefunden** (Quelle wäre Bundesagentur für Arbeit, Pendleratlas).

**Heimsheim (Enzkreis, PLZ 71296)**
- Einwohner: 5.531 (31.12.2025; Wikipedia); 5.608 (31.12.2023; onlinestreet/wikivoyage). Fläche 14,3 km² (Wikipedia) / 14,2 km² (IS24).
- Lage: Heckengäu, südöstlicher Rand des Enzkreises; Stadtrecht; historischer Stadtkern mit Fachwerk, „Schleglerschloss“ (**nicht verifiziert**).
- Verkehr (Wikipedia): Anschlussstelle 46 Heimsheim der A 8 (Gewerbegebiet Egelsee); kein Bahnhof, nächster: Renningen-Malmsheim; Buslinien 652/653 nach Leonberg (VVS), Verkehrsverbund Pforzheim-Enzkreis (VPE); Pforzheim ca. 15 km (Exposé-Angabe). Radweg entlang der Autobahn Heimsheim–Mönsheim geplant (StZ).
- Wirtschaft: **nicht ausgewertet** (Gewerbegebiet Egelsee).
- Recht: Kündigungssperrfrist 3 Jahre (nicht in KSpVO BW).
- Makler vor Ort (Verzeichnisse): Heß & Wapler Immobilienverwaltung (Jakob-Hornung-Str. 1), Immobilien Roland Rössle (Alte Mönsheimer Str. 92).
- Bodenrichtwert Ø 235 €/m² (01.01.2025).

**Ditzingen (Landkreis Ludwigsburg, PLZ 71254)**
- Einwohner: 22.551 (31.12.2025; Wikipedia); 25.318 (31.12.2023; onlinestreet – abweichende Abgrenzung?); Stadtbroschüre „mehr als 24.000“. Große Kreisstadt. Fläche 30,2 km² (IS24).
- Stadtteile (Wikipedia/Stadtbroschüre): Ditzingen, Heimerdingen, Hirschlanden, Schöckingen; Heimerdingen und Schöckingen 1971, Hirschlanden 1975 eingemeindet (Stadtbroschüre; andere Broschüre nennt 1975 für alle); Ortschaftsräte.
- Verkehr (Wikipedia): Bahnhof Ditzingen (S-Bahn Stuttgart; S6 und S62 Weil der Stadt–Stuttgart-Feuerbach); „Der Bahnhof wird von über 8000 Pendlern täglich genutzt“ (Wikipedia, Beleg [19]); A 81 Ausfahrt Stuttgart-Feuerbach.
- Wirtschaft (Wikipedia/Presse): TRUMPF Stammsitz; weltweit 16.960 Mitarbeiter (Ende Juni 2026; Vorjahr 18.303), ca. 8.600 in Deutschland, rund 6.500 am Stammsitz Ditzingen und weiteren Standorten der Region Stuttgart (Stuttgarter Zeitung, 2026); Umsatz GJ 2025/26 4,34 Mrd. €, EBIT 480 Mio. € (industrial-production.de); Wikipedia: Gebäudekomplex an der A 81 für bis zu 1.800 Mitarbeiter.
- Recht: Kündigungssperrfrist – **nicht in der KSpVO-BW-Liste** (3 Jahre), Mieterbund-Liste nennt Ditzingen (Widerspruch, Verordnung maßgeblich).
- Beispiel-Inserat: Hirschlanden 3,5 Zi., 79 m², 279.000 €, Hausgeld 390 €/Monat (Suchergebnis).

**Renningen (Landkreis Böblingen, PLZ 71272)**
- Einwohner: 18.728 (31.12.2025; Wikipedia); 18.655 (2023; wikivoyage). Stadtrecht 1982. Fläche 30,1 km² (IS24).
- Stadtteile (Wikipedia): Renningen und Malmsheim (seit 1972), Weiler/Höfe (Ihinger Hof).
- Verkehr (Wikipedia): S6 Weil der Stadt–Renningen–Leonberg–Stuttgart und S60 Böblingen–Sindelfingen–Renningen (–Stuttgart); Bahnhöfe Renningen und Malmsheim; Bus 637 zum Robert-Bosch-Campus. Fahrzeit S6 Renningen–Stuttgart Hbf ca. 31 Minuten (Einzelbeleg Jan. 2026).
- Wirtschaft (Wikipedia/Bosch): Forschungszentrum der Robert Bosch GmbH (Robert-Bosch-Campus 1); Bosch-Factsheet April 2018: „Rund 1 900 Mitarbeiter (am Standort inkl. Betriebsteil Böblingen)“ (https://www.bosch-presse.de/pressportal/de/media/dam_images/pi9990/factsheet_bosch-forschungscampus_renningen_de.pdf); Wikipedia: „Rund 1700 Mitarbeiter arbeiten im neuen Entwicklungszentrum“; aktuelle Zahl **nicht gefunden**; Wikipedia: „ein großer Teil der Beschäftigten arbeitet auswärts, zum Beispiel bei Daimler in Sindelfingen oder in Stuttgart“.
- Recht: Kündigungssperrfrist 3 Jahre (nicht in KSpVO BW).
- Makler vor Ort: Gäu Immobilien (Kirchstr. 5), Kirchberger Immobilien (Lange Str. 4), DC Immobilien & Verwaltung (Heimsheimer Str. 23), Jasmin Kauffmann GmbH (Wielandstr. 13), RENNER Immobilien (Gelbe Seiten).

**Pforzheim (Stadtkreis, PLZ 75172–75181)**
- Einwohner: 134.422 (31.12.2025; Wikipedia); Statistisches Landesamt BW 30.06.2024: 134.973 (lt. Suchergebnis, Tabelle garbled – prüfen); Bitkom-Profil 127.849, Zensus-2022-Basis 128.992 (ältere/andere Basis). Fläche 97 km² (Bitkom).
- Stadtgliederung (Wikipedia): Kernstadt + eingemeindete Büchenbronn, Eutingen an der Enz, Hohenwart, Huchenfeld, Würm (Ortschaftsräte); zur Kernstadt gehören Brötzingen und Dillweißenstein; „15 Stadtteile“ lt. Infobox. Stadtteile mit Preisdaten (immoverkauf24): Au, Weststadt, Südweststadt, Hohenwart, Brötzingen, Oststadt, Südoststadt, Eutingen, Buckenberg, Nordstadt, Büchenbronn, Innenstadt, Huchenfeld, Dillweißenstein (+ Würm bei immoportal).
- Verkehr (Wikipedia): Hauptbahnhof an der Bahnstrecke Karlsruhe–Mühlacker (IC/RE/S-Bahn Karlsruhe – **Details nicht ausgewertet**); A 8 Karlsruhe–Stuttgart mit vier Ausfahrten; Flughafen Stuttgart 24 km südöstlich, Karlsruhe/Baden-Baden 46 km.
- Wirtschaft: Schmuck-/Uhrenindustrie („Goldstadt“), Hochschule Pforzheim – **Beschäftigtenzahlen nicht ausgewertet**; Wikipedia: Beschäftigte nach Wirtschaftsabteilungen vorhanden (nicht extrahiert).
- Wohnungsmarkt: Landtagsdrucksache 17/9410 (Wohnungsmarkt Stadtkreis Pforzheim, gefördert, 15 Jahre) – auswerten; IVD-CityReport 7/2026: „zweigeteilt – Kaufmarkt verhalten, Mietnachfrage hoch“.
- Recht: Kündigungssperrfrist 5 Jahre (KSpVO BW 2026).
- Beispiel-Inserate: Südweststadt EG 44 m², Bj. 1986, Klasse D, 164.000 € (3.727 €/m²); Nordstadt 2 Zi. 105.000 €; Südweststadt 4 Zi. 399.950 €; Zwangsversteigerungen (Argetra) 113.000 € / 50.000 €.

**Porsche Weissach (für Heimsheim/Renningen/Leonberg relevant)**
- Entwicklungszentrum Weissach: „6.500 Mitarbeiter am Standort beschäftigt, rund 80 Prozent davon in der Entwicklung“ (Porsche Newsroom Standortseite, ohne Datum: https://newsroom.porsche.com/de_CH/unternehmen/standorte/weissach.html); 2021: 6.700 (50-Jahre-Jubiläum); Porsche Region Stuttgart Ende 2025: ca. 20.600 Beschäftigte (Vorjahr 22.200; dpa lt. StZ); Berichte über Kapazitätsabbau in Weissach (Handelsblatt, ~30 %, unbestätigt). Für Ortsseiten: Zahl 6.500 mit „laut Porsche“ nennen und Restrukturierung erwähnen.

### B2.6 Was noch fehlt (To-do für Ortsseiten-Daten)
- Amtliche Kaufpreise ETW je Ort (Gutachterausschuss-Marktberichte Leonberg, Enzkreis, Pforzheim, LK Ludwigsburg/Böblingen) – anfordern.
- Einwohner amtlich: Statistisches Landesamt BW, Tabelle Bevölkerung Gemeinden 31.12.2025 (Wikipedia-Werte stammen laut Fußnote daher; Direktlink **nicht abgerufen**).
- Pendlerstatistik (BA Pendleratlas) je Gemeinde.
- Mietspiegel Pforzheim (qualifiziert), Leonberg (?), Mietpreisbremsen-/Kappungsgrenzen-VO BW aktuell.
- Wärmeplanung/Fernwärme je Ort (Relevanz Energieausweis/Heizungsfrage).
- Zahl der Wohnungen/Wohngebäude (Zensus 2022, Gebäude- und Wohnungszählung) je Gemeinde – für „ETW-Anteil“ auf Ortsseiten.
- S-Bahn-Takt (VVS) und Fahrzeiten offiziell.

## B3. Best Practices lokales SEO für einen Einzelmakler

### B3.1 Google Unternehmensprofil (GBP)
Quelle (Richtlinien, wörtlich/zusammengefasst): https://support.google.com/business/answer/3038177?hl=de (Stand: „© 2026 Google“, kein Datum)
- **Name**: „Verwenden Sie für Ihr Unternehmen einheitlich den Namen“ wie offline/Website; keine Slogans, Öffnungszeiten, Telefonnummern, URLs, Standortzusätze oder Produktbeschreibungen im Namen → **„Rössler Immobilien“**, nicht „Rössler Immobilien – Immobilienmakler Leonberg Heimsheim“.
- **Adresse**: tatsächlicher Standort; „Postfächer oder Briefkästen an unternehmensfremden Standorten sind nicht zulässig“; virtuelle Büros nicht zulässig; Co-Working nur mit Beschilderung und Personal; ganzjährige Beschilderung nötig, wenn Adresse angezeigt wird.
- **Einzugsgebiet** (Unternehmen ohne Ladengeschäft/Kundenverkehr): Adresse ausblenden („sollten Sie den Kunden Ihre Geschäftsadresse nicht anzeigen“), Einzugsgebiet „nicht mehr als ca. zwei Autostunden vom Standort“; Hybrid (Adresse + Einzugsgebiet) zulässig, wenn Kundenempfang vor Ort mit Personal → Empfehlung: Als Einzelmakler ohne Ladenlokal **Einzugsgebiet** mit Heimsheim, Leonberg, Ditzingen, Renningen, Pforzheim (+ ggf. Rutesheim, Weil der Stadt, Mönsheim, Friolzheim, Wimsheim, Gerlingen) hinterlegen; Adresse nur anzeigen, wenn es ein beschildertes Büro gibt.
- **Kategorien**: „Wählen Sie zur Beschreibung Ihres Kerngeschäfts so wenige Kategorien wie möglich“, möglichst spezifisch; Kategorie beschreibt, was das Unternehmen „IST“. → Primär „Immobilienmakler“; sekundär ggf. „Immobilienbewerter/Gutachter“ nur, wenn tatsächlich angeboten (nicht als Keyword-Trick). Weitere Kategorien-Optionen (Immobilienbüro, Immobilienberater) sind in der Google-Kategorienliste zu prüfen – **Liste nicht abgerufen**.
- **Telefon**: lokale Nummer bevorzugt, keine Weiterleitungs-/Sonderrufnummern; **Website**: keine Verweis-URLs (keine Social-Links als Website).
- **Ein Profil pro Unternehmen** („Es sollte nur ein Profil pro Unternehmen angelegt werden“); keine Mehrfachprofile je Ort → statt 5 Profilen 1 Profil + 5 Ortsseiten auf der Website.
- **Bewertungen**: Richtlinienseite enthält keine Regel zu Anreizen; Googles separate Rezensionsrichtlinien verbieten Anreize für Bewertungen (**nicht abgerufen – vor Kampagnen prüfen**). Praxis (jacasa/bottimmo/taggbox lt. Suchergebnissen, keine Primärquelle): nach jedem Notartermin Bewertungslink senden, auf alle Bewertungen antworten, Leistungen (Immobilienbewertung, Verkauf, Vermietung) als „Leistungen“ pflegen, Fotos, regelmäßige Beiträge, Fragen & Antworten vorbefüllen. Rankingfaktoren laut Google-Hilfe allgemein: Relevanz, Entfernung, Bekanntheit (**Google-Hilfeseite „Wie Google lokale Ergebnisse ermittelt“ nicht abgerufen – zitieren nach Prüfung**).

### B3.2 NAP-Konsistenz
- NAP = Name, Adresse, Telefonnummer – überall identisch (Schreibweise Straße, Rufnummernformat): Google-Profil, Website (Impressum, Kontakt, Footer, Ortsseiten), Verzeichnisse (IS24-Maklerverzeichnis, immoportal, jacasa, trustlocal, golocal, Gelbe Seiten, Das Telefonbuch, kennstdueinen, 11880), Social-Profile. Quellen (allgemein, englisch): https://www.semrush.com/blog/does-nap-consistency-matter-for-local-seo/ ; https://www.localfalcon.com/blog/what-is-nap-consistency-in-local-seo ; https://carrot.com/blog/nap-name-address-phone-number-local-seo/ (Beispiel: „123 Main St.“ vs. „123 Main Street“ zählt als Abweichung).
- Lokaler Sonderfall: „Immobilien Roland Rössle“ in Heimsheim existiert in Verzeichnissen → eigenen Namen konsequent „Rössler Immobilien“ + Vorname schreiben, Logo/Foto in allen Profilen, damit Google die Entitäten trennt.
- Empfehlung: zentrale NAP-Zeile als Textbaustein; Telefonnummer im Format „+49 7033 …“ (E.164 in Schema) und „07033 …“ im Fließtext konsistent.

### B3.3 Schema.org – RealEstateAgent / LocalBusiness
Quellen: https://schema.org/RealEstateAgent (Typhierarchie: Thing > Organization > LocalBusiness > RealEstateAgent und Thing > Place > LocalBusiness > RealEstateAgent; `areaServed` ersetzt `serviceArea`); https://developers.google.com/search/docs/appearance/structured-data/local-business (Pflicht: `name`, `address`; empfohlen: `geo` (5 Dezimalstellen), `openingHoursSpecification`, `priceRange` (< 100 Zeichen), `telephone` (mit Ländervorwahl), `url`, `image`; „Use the most specific LocalBusiness sub-type“; `aggregateRating`/`review` nur für Seiten, die Bewertungen *anderer* Unternehmen erfassen – also **keine Selbstbewertung auswerfen**).

Konkretes JSON-LD-Beispiel (Platzhalter in GROSSBUCHSTABEN ersetzen; `areaServed` mit den fünf Orten; `address` nur, wenn eine echte Geschäftsadresse veröffentlicht wird):

```json
{
  "@context": "https://schema.org",
  "@type": "RealEstateAgent",
  "@id": "https://roessler-immo.de/#organization",
  "name": "Rössler Immobilien",
  "legalName": "RECHTSFORM/VOLLER NAME LT. IMPRESSUM",
  "url": "https://roessler-immo.de/",
  "logo": "https://roessler-immo.de/PFAD/logo.png",
  "image": "https://roessler-immo.de/PFAD/linus-roessler.jpg",
  "telephone": "+49-7033-XXXXXX",
  "email": "info@roessler-immo.de",
  "founder": { "@type": "Person", "name": "Linus Rössler" },
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "STRASSE HAUSNUMMER",
    "addressLocality": "Heimsheim",
    "postalCode": "71296",
    "addressRegion": "BW",
    "addressCountry": "DE"
  },
  "geo": { "@type": "GeoCoordinates", "latitude": 48.80XXX, "longitude": 8.86XXX },
  "areaServed": [
    { "@type": "City", "name": "Heimsheim" },
    { "@type": "City", "name": "Leonberg" },
    { "@type": "City", "name": "Ditzingen" },
    { "@type": "City", "name": "Renningen" },
    { "@type": "City", "name": "Pforzheim" }
  ],
  "knowsAbout": ["Eigentumswohnung verkaufen", "Wohnungsbewertung", "WEG-Unterlagen", "Vermietete Wohnung verkaufen"],
  "makesOffer": [
    { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Kostenlose Wohnungsbewertung", "areaServed": "Leonberg, Heimsheim, Ditzingen, Renningen, Pforzheim" } },
    { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Verkauf von Eigentumswohnungen" } }
  ],
  "openingHoursSpecification": [
    { "@type": "OpeningHoursSpecification", "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday"], "opens": "09:00", "closes": "18:00" }
  ],
  "priceRange": "Provision auf Anfrage",
  "sameAs": [
    "https://www.google.com/maps/place/GBP-URL",
    "https://www.linkedin.com/in/…",
    "https://www.instagram.com/…"
  ],
  "hasMap": "https://www.google.com/maps/place/GBP-URL"
}
```
- Ergänzend je Ratgeberseite: `Article` (mit `author` → Person Linus Rössler, `datePublished`, `dateModified`) und `FAQPage` für den FAQ-Block (Google zeigt FAQ-Rich-Results seit 2023 nur noch eingeschränkt – **aktuelle Google-Doku prüfen**); `BreadcrumbList` sitewide. Die Wettbewerber (IS24, reduco, immoverkauf24) nutzen genau diese Kombination (Article/BlogPosting + FAQPage + BreadcrumbList + Organization).
- Je Ortsseite: dieselbe RealEstateAgent-Entität per `@id` referenzieren (nicht fünf verschiedene Organisationen), plus `WebPage` mit `about`: { "@type": "City", "name": "Leonberg" } und optional `Dataset`/Tabellen als HTML.
- Geo-Koordinaten mit mind. 5 Dezimalstellen (Google-Doku). Koordinaten für Heimsheim **nicht ermittelt** – aus Google Maps übernehmen.

### B3.4 Ortsseiten-Aufbau (und Abgrenzung zu Doorway Pages)
Google Spam-Richtlinien (wörtlich, https://developers.google.com/search/docs/essentials/spam-policies): „Doorway abuse is when sites or pages are created to rank for specific, similar search queries.“ Beispiele: „Having multiple domain names or pages targeted at specific regions or cities that funnel users to one page“; „Creating substantially similar pages that are closer to search results than a clearly defined, browseable hierarchy“. „Scaled content abuse“: „Using generative AI tools or other similar tools to generate many pages without adding value for users“.
→ Konsequenz: Fünf Ortsseiten sind nur dann sicher, wenn jede **eigene, nicht austauschbare Inhalte** hat. Vorschlag je Ortsseite (URL-Muster `/wohnung-verkaufen/leonberg/` o. ä.):
1. H1: „Wohnung verkaufen in Leonberg – Eigentumswohnungen mit lokaler Marktkenntnis“ (Keyword + Nutzen, einmalig je Ort)
2. Kurz-Intro mit konkretem Ortsbezug (Stadtteile Eltingen/Ramtel/Höfingen/Warmbronn/Gebersheim/Silberberg; S6/S60/S62; A 8/A 81; GEZE, Bausparkasse) – 100–150 Wörter
3. H2 „Der Markt für Eigentumswohnungen in Leonberg (Stand Monat/Jahr)“ – Tabelle mit 3–4 Quellen (immoportal, immoverkauf24/Sprengnetter, IS24-Regional, Gutachterausschuss sobald vorhanden), Angebots- vs. Kaufpreis-Hinweis, Bodenrichtwert, Entwicklung Vorjahr; Mietniveau; Faktor-Hinweis für Anleger
4. H2 „Besonderheiten beim Wohnungsverkauf in Leonberg“ – Kündigungssperrfrist 5 Jahre (KSpVO BW, bis 31.12.2026), Grunderwerbsteuer 5 %, zuständiges Grundbuchamt/Notare (zu verifizieren), typische Baujahre/Anlagen je Stadtteil, Hausgeld-Spannen (eigene Erfahrung), Energieausweis über WEG
5. H2 „Wer kauft Wohnungen in Leonberg?“ – Pendler (Fahrzeit ca. 25 Min. Hbf), Mitarbeiter GEZE/Bosch/Porsche/Trumpf, Kapitalanleger (Faktor), Senioren → Vermarktungsstrategie
6. H2 „So verkaufe ich Ihre Wohnung in Leonberg“ – Ablauf (verlinkt zum Ratgeber Thema 1), Leistungen, Provision transparent
7. H2 „Referenzen/Verkäufe in Leonberg“ (sobald vorhanden; sonst weglassen – nicht erfinden)
8. H2 „Häufige Fragen zum Wohnungsverkauf in Leonberg“ – 5–8 ortsspezifische FAQ (Sperrfrist, Preise, Dauer, Verwalter, Gutachterausschuss)
9. CTA: kostenlose Wohnungsbewertung (Formular) + Telefon; NAP-Block; Karte des Einzugsgebiets
10. Interne Links: zu allen 12 Ratgebern (kontextuell), zu Nachbar-Ortsseiten (Leonberg ↔ Renningen ↔ Ditzingen), zurück zur Übersicht „Einzugsgebiet“.
- Pforzheim-Seite zusätzlich: Stadtteil-Tabelle (14 Stadtteile mit €/m², immoverkauf24 Q2 2026), IVD-Einordnung, Hinweis Mietspiegel.
- Heimsheim-Seite: kleine Datenbasis (10 ETW-Angebote bei IS24) ehrlich benennen; Nähe zu Porsche Weissach, A 8, Bus nach Leonberg; Bodenrichtwert 235 €/m².

### B3.5 Title-/Meta-Formeln
Google-Best-Practices (wörtlich, https://developers.google.com/search/docs/appearance/title-link): „Write descriptive and concise text for your <title> elements.“ / „Avoid keyword stuffing.“ / „Avoid repeated or boilerplate text in <title> elements.“ / „Brand your titles concisely.“ / Site-Name „just your site name at the beginning or end of each <title> element“; Google „may omit the site name from the title link, if it's repetitive“.
Vorschläge (≤ 60 Zeichen Kernaussage + Brand):
- Ortsseite: „Wohnung verkaufen in Leonberg | Rössler Immobilien“ ; „Immobilienmakler Heimsheim für Eigentumswohnungen | Rössler Immobilien“ ; „Eigentumswohnung verkaufen Pforzheim: Preise 2026 & Ablauf | Rössler Immobilien“
- Ratgeber: „Eigentumswohnung verkaufen: Ablauf & WEG-Unterlagen (2026) | Rössler Immobilien“ ; „Vermietete Wohnung verkaufen: § 577 BGB, Sperrfrist, Faktor | Rössler Immobilien“ ; „Spekulationssteuer bei der Eigentumswohnung: Frist & Beispiel | Rössler Immobilien“ ; „Maklerprovision in Baden-Württemberg: Was Sie 2026 zahlen | Rössler Immobilien“ ; „Energieausweis für die Eigentumswohnung: WEG & Pflichtangaben | Rössler Immobilien“ ; „Wohnung sofort verkaufen? Sofortankauf vs. Makler im Vergleich | Rössler Immobilien“
- Meta-Description: 140–155 Zeichen, Ort + konkreter Nutzen + Zahl (z. B. „Leonberg: Ø 3.700–4.050 €/m² (Angebote 2026), 5 Jahre Sperrfrist bei Umwandlung, 5 % Grunderwerbsteuer. So verkaufen Sie Ihre Wohnung – kostenlose Bewertung.“)
- Wettbewerber-Muster zum Vergleich: IS24 „… in 2026: Ablauf, Kosten & Checkliste - ImmoScout24“; Homeday „… leicht gemacht: Das ist 2026 wichtig | Homeday“; reduco „… 2026: Ablauf, Kosten, ohne Makler | reduco.ai“; immoverkauf24 „Maklerprovision 2026: Höhe, Berechnung & wer Maklergebühren zahlt“. → Jahreszahl im Title ist Standard; Pflege jährlich.

### B3.6 Interne Verlinkung / Informationsarchitektur
- Hub-Seite „Ratgeber Wohnungsverkauf“ (12 Themen) + Hub „Einzugsgebiet“ (5 Ortsseiten); jede Ortsseite verlinkt kontextuell auf 4–6 Ratgeber (Sperrfrist → Thema 2; Energieausweis → Thema 7; Preise → Thema 8; Provision → Thema 6), jeder Ratgeber verlinkt auf die Ortsseiten in einem „Vor Ort“-Block (z. B. im Spekulationssteuer-Ratgeber: „Beispielrechnung mit Leonberger Preisen“).
- Silo-Logik wie reduco („Alles zu Immobilie & Grundstück verkaufen“, „Verwandte Artikel“) und IS24 („Weiterführende Themen“) – Breadcrumbs (BreadcrumbList) sitewide.
- Themencluster-Vorbild IS24: Spekulationssteuer, Spekulationsfrist, Beginn Spekulationsfrist, Spekulationsfrist-Berechnung als vier Seiten – für einen Einzelmakler besser **eine** tiefe Seite mit Sprungmarken, um Kannibalisierung zu vermeiden.
- Autorenbox mit Person-Schema (Linus Rössler, § 34c GewO, Weiterbildung, Foto) auf jedem Ratgeber (E-E-A-T-Signal; Wettbewerber: IS24 „Nadine Kunert, Expertin für Verkauf & Vermietung“, reduco „Hendrik Stotz“, Finanztip „Jörg Leine, Experte Steuern“, anwalt.org „Murat Kilinc, Rechtsanwalt“).
- „Stand: Monat Jahr“ + „zuletzt geprüft“ sichtbar; Quellenliste am Seitenende (Gesetze, Gutachterausschuss, Portale) – kein Wettbewerber außer Finanztip/reduco macht das konsequent.

### B3.7 Verzeichnisse/Zitate, in denen die Wettbewerber auftauchen (Eintrag prüfen)
- immobilienscout24.de Maklerverzeichnis (Leonberg 178–203, Heimsheim 38, Renningen 144 Einträge)
- immoportal.com/immobilienmakler/{ort}
- jacasa.de/immobilienmakler/bw/{ort}
- trustlocal.de, golocal.de, gelbeseiten.de, dastelefonbuch.de, kennstdueinen.de, 11880 (nicht geprüft), ProvenExpert (immopaka nutzt es)
- Lokalpresse: Stuttgarter Zeitung/Leonberger Kreiszeitung (Unternehmensprofile), Pforzheimer Zeitung – PR-Chance.


---

# ANHANG

## A1. Gesetzestexte (wörtlich, abgerufen 29.10.2026)

### § 577 BGB – Vorkaufsrecht des Mieters (https://www.gesetze-im-internet.de/bgb/__577.html)
„(1) Werden vermietete Wohnräume, an denen nach der Überlassung an den Mieter Wohnungseigentum begründet worden ist oder begründet werden soll, an einen Dritten verkauft, so ist der Mieter zum Vorkauf berechtigt. Dies gilt nicht, wenn der Vermieter die Wohnräume an einen Familienangehörigen oder an einen Angehörigen seines Haushalts verkauft. Soweit sich nicht aus den nachfolgenden Absätzen etwas anderes ergibt, finden auf das Vorkaufsrecht die Vorschriften über den Vorkauf Anwendung.
(2) Die Mitteilung des Verkäufers oder des Dritten über den Inhalt des Kaufvertrags ist mit einer Unterrichtung des Mieters über sein Vorkaufsrecht zu verbinden.
(3) Die Ausübung des Vorkaufsrechts erfolgt durch schriftliche Erklärung des Mieters gegenüber dem Verkäufer.
(4) Stirbt der Mieter, so geht das Vorkaufsrecht auf diejenigen über, die in das Mietverhältnis nach § 563 Abs. 1 oder 2 eintreten.
(5) Eine zum Nachteil des Mieters abweichende Vereinbarung ist unwirksam.“

### § 577a BGB – Kündigungsbeschränkung bei Wohnungsumwandlung (https://www.gesetze-im-internet.de/bgb/__577a.html)
„(1) Ist an vermieteten Wohnräumen nach der Überlassung an den Mieter Wohnungseigentum begründet und das Wohnungseigentum veräußert worden, so kann sich ein Erwerber auf berechtigte Interessen im Sinne des § 573 Abs. 2 Nr. 2 oder 3 erst nach Ablauf von drei Jahren seit der Veräußerung berufen.
(1a) Die Kündigungsbeschränkung nach Absatz 1 gilt entsprechend, wenn vermieteter Wohnraum nach der Überlassung an den Mieter 1. an eine Personengesellschaft oder an mehrere Erwerber veräußert worden ist oder 2. zu Gunsten einer Personengesellschaft oder mehrerer Erwerber mit einem Recht belastet worden ist, durch dessen Ausübung dem Mieter der vertragsgemäße Gebrauch entzogen wird. Satz 1 ist nicht anzuwenden, wenn die Gesellschafter oder Erwerber derselben Familie oder demselben Haushalt angehören oder vor Überlassung des Wohnraums an den Mieter Wohnungseigentum begründet worden ist.
(2) Die Frist nach Absatz 1 oder nach Absatz 1a beträgt bis zu zehn Jahre, wenn die ausreichende Versorgung der Bevölkerung mit Mietwohnungen zu angemessenen Bedingungen in einer Gemeinde oder einem Teil einer Gemeinde besonders gefährdet ist und diese Gebiete nach Satz 2 bestimmt sind. Die Landesregierungen werden ermächtigt, diese Gebiete und die Frist nach Satz 1 durch Rechtsverordnung für die Dauer von jeweils höchstens zehn Jahren zu bestimmen.
(2a) Wird nach einer Veräußerung oder Belastung im Sinne des Absatzes 1a Wohnungseigentum begründet, so beginnt die Frist, innerhalb der eine Kündigung nach § 573 Absatz 2 Nummer 2 oder 3 ausgeschlossen ist, bereits mit der Veräußerung oder Belastung nach Absatz 1a.
(3) Eine zum Nachteil des Mieters abweichende Vereinbarung ist unwirksam.“

### KSpVO BW (GBl. 2025 Nr. 146, 19.12.2025; https://www.landtag-bw.de/resource/blob/611984/7e993deafc1547ab553a30dfe14a9333/GBl2025146.pdf)
„Verordnung der Landesregierung zur Bestimmung der Gebiete mit verlängerter Kündigungssperrfrist bei Wohnungsumwandlungen in Eigentumswohnungen (Kündigungssperrfristverordnung Baden-Württemberg – KSpVO BW) Vom 16. Dezember 2025 … § 1 Anwendungsbereich: Die Städte und Gemeinden Achern, Aitrach, Altbach, Asperg, Backnang, Bad Bellingen, Bad Krozingen, Bad Schussenried, Baienfurt, Böblingen, Bodman-Ludwigshafen, Bötzingen, Deggenhausertal, Denkendorf, Dettingen an der Erms, Dielheim, Dietenheim, Edingen-Neckarhausen, Ehrenkirchen, Eisenbach (Hochschwarzwald), Eislingen/Fils, Ellhofen, Emmendingen, Eningen u. Achalm, Esslingen am Neckar, Fellbach, Filderstadt, Freiamt, Freiburg i. Br., Frickingen, Friedrichshafen, Friesenheim, Göppingen, Gottenheim, Graben-Neudorf, Güglingen, Gundelfingen, Häg-Ehrsberg, Heddesheim, Heidelberg, Heilbronn, Heiligenberg, Heitersheim, Holzgerlingen, Hoßkirch, Hülben, Ittlingen, Jagsthausen, Kappel-Grafenhausen, Karlsruhe, Kenzingen, Kernen im Remstal, Kippenheim, Kirchardt, Kirchheim unter Teck, Kirchzarten, Kißlegg, Korb, Korntal-Münchingen, Kornwestheim, Lahr/Schwarzwald, Leonberg, Lichtenstein, Lörrach, Ludwigsburg, Mahlberg, Mahlstetten, Malsburg-Marzell, Malterdingen, March, Maselheim, Massenbachhausen, Meckenbeuren, Meißenheim, Merklingen, Merzhausen, Metzingen, Möglingen, Mühlacker, Mühlhausen-Ehingen, Mühlingen, Neuhausen auf den Fildern, Neulußheim, Nürtingen, Oberhausen-Rheinhausen, Offenburg, Ostfildern, Pfaffenhofen, Pfaffenweiler, Pfedelbach, Pforzheim, Philippsburg, Reichenau, Reilingen, Reutlingen, Rheinhausen, Riederich, Riegel am Kaiserstuhl, Salach, Sasbach, Sasbach am Kaiserstuhl, Schallstadt, Schutterwald, Schwaikheim, Schwarzach, Sindelfingen, St. Leon-Rot, Stegen, Steinenbronn, Stockach, Stuttgart, Teningen, Tübingen, Ulm, Umkirch, Untermarchtal, Utzenfeld, Vogt, Vogtsburg im Kaiserstuhl, Waldkirch, Weil am Rhein, Weingarten, Wembach, Wernau (Neckar), Widdern, Wiesloch, Wittnau, Wolfegg, Wutach und Zwiefalten sind Gebiete im Sinne des § 577a Absatz 2 Satz 1 des Bürgerlichen Gesetzbuches. § 2 Dauer der Kündigungssperrfrist: Die Kündigungssperrfrist bei Wohnungsumwandlungen beträgt in den in § 1 bezeichneten Gebieten fünf Jahre. § 3 Inkrafttreten, Außerkrafttreten: Diese Verordnung tritt am 1. Januar 2026 in Kraft und mit Ablauf des 31. Dezember 2026 außer Kraft.“

### § 656a BGB – Textform (https://www.gesetze-im-internet.de/bgb/__656a.html)
„Ein Maklervertrag, der den Nachweis der Gelegenheit zum Abschluss eines Kaufvertrags über eine Wohnung oder ein Einfamilienhaus oder die Vermittlung eines solchen Vertrags zum Gegenstand hat, bedarf der Textform.“

### § 656c BGB – Lohnanspruch bei Tätigkeit für beide Parteien (https://www.gesetze-im-internet.de/bgb/__656c.html)
„(1) Lässt sich der Makler von beiden Parteien des Kaufvertrags über eine Wohnung oder ein Einfamilienhaus einen Maklerlohn versprechen, so kann dies nur in der Weise erfolgen, dass sich die Parteien in gleicher Höhe verpflichten. Vereinbart der Makler mit einer Partei des Kaufvertrags, dass er für diese unentgeltlich tätig wird, kann er sich auch von der anderen Partei keinen Maklerlohn versprechen lassen. Ein Erlass wirkt auch zugunsten des jeweils anderen Vertragspartners des Maklers. Von Satz 3 kann durch Vertrag nicht abgewichen werden.
(2) Ein Maklervertrag, der von Absatz 1 Satz 1 und 2 abweicht, ist unwirksam. § 654 bleibt unberührt.“

### § 656d BGB – Vereinbarungen über die Maklerkosten (https://www.gesetze-im-internet.de/bgb/__656d.html)
„(1) Hat nur eine Partei des Kaufvertrags über eine Wohnung oder ein Einfamilienhaus einen Maklervertrag abgeschlossen, ist eine Vereinbarung, die die andere Partei zur Zahlung oder Erstattung von Maklerlohn verpflichtet, nur wirksam, wenn die Partei, die den Maklervertrag abgeschlossen hat, zur Zahlung des Maklerlohns mindestens in gleicher Höhe verpflichtet bleibt. Der Anspruch gegen die andere Partei wird erst fällig, wenn die Partei, die den Maklervertrag abgeschlossen hat, ihrer Verpflichtung zur Zahlung des Maklerlohns nachgekommen ist und sie oder der Makler einen Nachweis hierüber erbringt.
(2) § 656c Absatz 1 Satz 3 und 4 gilt entsprechend.“

### § 23 EStG – Private Veräußerungsgeschäfte (Auszug; https://www.gesetze-im-internet.de/estg/__23.html)
„(1) Private Veräußerungsgeschäfte (§ 22 Nummer 2) sind 1. Veräußerungsgeschäfte bei Grundstücken und Rechten, die den Vorschriften des bürgerlichen Rechts über Grundstücke unterliegen (z. B. Erbbaurecht, Mineralgewinnungsrecht), bei denen der Zeitraum zwischen Anschaffung und Veräußerung nicht mehr als zehn Jahre beträgt. Gebäude und Außenanlagen sind einzubeziehen, soweit sie innerhalb dieses Zeitraums errichtet, ausgebaut oder erweitert werden; dies gilt entsprechend für Gebäudeteile, die selbständige unbewegliche Wirtschaftsgüter sind, sowie für Eigentumswohnungen und im Teileigentum stehende Räume. Ausgenommen sind Wirtschaftsgüter, die im Zeitraum zwischen Anschaffung oder Fertigstellung und Veräußerung ausschließlich zu eigenen Wohnzwecken oder im Jahr der Veräußerung und in den beiden vorangegangenen Jahren zu eigenen Wohnzwecken genutzt wurden; … Bei unentgeltlichem Erwerb ist dem Einzelrechtsnachfolger für Zwecke dieser Vorschrift die Anschaffung oder die Überführung des Wirtschaftsguts in das Privatvermögen durch den Rechtsvorgänger zuzurechnen. …
(3) Gewinn oder Verlust aus Veräußerungsgeschäften nach Absatz 1 ist der Unterschied zwischen Veräußerungspreis einerseits und den Anschaffungs- oder Herstellungskosten und den Werbungskosten andererseits. … Die Anschaffungs- oder Herstellungskosten mindern sich um Absetzungen für Abnutzung, erhöhte Absetzungen und Sonderabschreibungen, soweit sie bei der Ermittlung der Einkünfte im Sinne des § 2 Absatz 1 Satz 1 Nummer 4 bis 7 abgezogen worden sind. Gewinne bleiben steuerfrei, wenn der aus den privaten Veräußerungsgeschäften erzielte Gesamtgewinn im Kalenderjahr weniger als 1 000 Euro betragen hat. … Verluste dürfen nur bis zur Höhe des Gewinns, den der Steuerpflichtige im gleichen Kalenderjahr aus privaten Veräußerungsgeschäften erzielt hat, ausgeglichen werden; sie dürfen nicht nach § 10d abgezogen werden.“

### § 80 GModG (ehem. GEG) – Ausstellung und Verwendung von Energieausweisen (Auszug Abs. 3 und 4; https://www.gesetze-im-internet.de/geg/__80.html)
„(3) Soll ein mit einem Gebäude bebautes Grundstück oder Wohnungs- oder Teileigentum verkauft, ein Erbbaurecht an einem bebauten Grundstück begründet oder übertragen oder ein Gebäude, eine Wohnung oder eine sonstige selbständige Nutzungseinheit vermietet, verpachtet oder verleast werden, ist ein Energieausweis auszustellen, wenn nicht bereits ein gültiger Energieausweis für das Gebäude vorliegt. In den Fällen des Satzes 1 ist für Wohngebäude, die weniger als fünf Wohnungen haben und für die der Bauantrag vor dem 1. November 1977 gestellt worden ist, ein Energiebedarfsausweis auszustellen. Satz 2 ist nicht anzuwenden, wenn das Wohngebäude 1. schon bei der Baufertigstellung das Anforderungsniveau der Wärmeschutzverordnung vom 11. August 1977 (BGBl. I S. 1554) erfüllt hat oder 2. durch spätere Änderungen mindestens auf das in Nummer 1 bezeichnete Anforderungsniveau gebracht worden ist. …
(4) Im Falle eines Verkaufs oder der Bestellung eines Rechts im Sinne des Absatzes 3 Satz 1 hat der Verkäufer oder der Immobilienmakler dem potenziellen Käufer spätestens bei der Besichtigung einen Energieausweis oder eine Kopie hiervon vorzulegen. Die Vorlagepflicht wird auch durch einen deutlich sichtbaren Aushang oder ein deutlich sichtbares Auslegen während der Besichtigung erfüllt. Findet keine Besichtigung statt, haben der Verkäufer oder der Immobilienmakler den Energieausweis oder eine Kopie hiervon dem potenziellen Käufer unverzüglich vorzulegen. Der Energieausweis oder eine Kopie hiervon ist spätestens dann unverzüglich vorzulegen, wenn der potenzielle Käufer zur Vorlage auffordert. Unverzüglich nach Abschluss des Kaufvertrages hat der Verkäufer oder der Immobilienmakler dem Käufer den Energieausweis oder eine Kopie hiervon zu übergeben. Im Falle des Verkaufs eines Wohngebäudes mit nicht mehr als zwei Wohnungen hat der Käufer nach Übergabe des Energieausweises ein informatorisches Beratungsgespräch zum Energieausweis mit einer nach § 88 zur Ausstellung von Energieausweisen berechtigten Person zu führen, wenn ein solches Beratungsgespräch als einzelne Leistung unentgeltlich angeboten wird.“

### § 87 GModG (ehem. GEG) – Pflichtangaben in einer Immobilienanzeige (https://www.gesetze-im-internet.de/geg/__87.html)
„(1) Wird vor dem Verkauf, der Vermietung, der Verpachtung oder dem Leasing eines Gebäudes, einer Wohnung oder einer sonstigen selbständigen Nutzungseinheit eine Immobilienanzeige in kommerziellen Medien aufgegeben und liegt zu diesem Zeitpunkt ein Energieausweis vor, so hat der Verkäufer, der Vermieter, der Verpächter, der Leasinggeber oder der Immobilienmakler, wenn eine dieser Personen die Veröffentlichung der Immobilienanzeige verantwortet, sicherzustellen, dass die Immobilienanzeige folgende Pflichtangaben enthält: 1. die Art des Energieausweises: Energiebedarfsausweis im Sinne von § 81 oder Energieverbrauchsausweis im Sinne von § 82, 2. den im Energieausweis genannten Wert des Endenergiebedarfs oder des Endenergieverbrauchs für das Gebäude, 3. die im Energieausweis genannten wesentlichen Energieträger für die Heizung des Gebäudes, 4. bei einem Wohngebäude das im Energieausweis genannte Baujahr und 5. bei einem Wohngebäude die im Energieausweis genannte Energieeffizienzklasse.
(2) Bei einem Nichtwohngebäude ist … der Endenergiebedarf oder Endenergieverbrauch sowohl für Wärme als auch für Strom jeweils getrennt aufzuführen.
(3) Bei Energieausweisen, die nach dem 30. September 2007 und vor dem 1. Mai 2014 ausgestellt worden sind, und bei Energieausweisen nach § 112 Absatz 2 sind die Pflichten der Absätze 1 und 2 nach Maßgabe des § 112 Absatz 3 und 4 zu erfüllen.“

### § 12 WEG – Veräußerungsbeschränkung (https://dejure.org/gesetze/WEG/12.html; Fassung WEMoG, in Kraft 01.12.2020)
„(1) Als Inhalt des Sondereigentums kann vereinbart werden, dass ein Wohnungseigentümer zur Veräußerung seines Wohnungseigentums der Zustimmung anderer Wohnungseigentümer oder eines Dritten bedarf.
(2) Die Zustimmung darf nur aus einem wichtigen Grunde versagt werden. Durch Vereinbarung gemäß Absatz 1 kann dem Wohnungseigentümer darüber hinaus für bestimmte Fälle ein Anspruch auf Erteilung der Zustimmung eingeräumt werden.
(3) Ist eine Vereinbarung gemäß Absatz 1 getroffen, so ist eine Veräußerung des Wohnungseigentums und ein Vertrag, durch den sich der Wohnungseigentümer zu einer solchen Veräußerung verpflichtet, unwirksam, solange nicht die erforderliche Zustimmung erteilt ist. Einer rechtsgeschäftlichen Veräußerung steht eine Veräußerung im Wege der Zwangsvollstreckung oder durch den Insolvenzverwalter gleich.
(4) Die Wohnungseigentümer können beschließen, dass eine Veräußerungsbeschränkung gemäß Absatz 1 aufgehoben wird. Ist ein Beschluss gemäß Satz 1 gefasst, kann die Veräußerungsbeschränkung im Grundbuch gelöscht werden. § 7 Absatz 2 gilt entsprechend.“

### § 1850 BGB – Genehmigung für Rechtsgeschäfte über Grundstücke und Schiffe (https://www.gesetze-im-internet.de/bgb/__1850.html)
„Der Betreuer bedarf der Genehmigung des Betreuungsgerichts 1. zur Verfügung über ein Grundstück oder über ein Recht an einem Grundstück, sofern die Genehmigung nicht bereits nach § 1833 Absatz 3 Satz 1 Nummer 4 erforderlich ist, 2. zur Verfügung über eine Forderung, die auf Übertragung des Eigentums an einem Grundstück, auf Begründung oder Übertragung eines Rechts an einem Grundstück oder auf Befreiung eines Grundstücks von einem solchen Recht gerichtet ist, … 4. zu einem Rechtsgeschäft, durch das der Betreute unentgeltlich Wohnungs- oder Teileigentum erwirbt, 5. zur Eingehung einer Verpflichtung zu einer der in den Nummern 1 bis 3 bezeichneten Verfügungen oder des in Nummer 4 bezeichneten Erwerbs sowie 6. zu einem Rechtsgeschäft, durch das der Betreute zum entgeltlichen Erwerb eines Grundstücks … verpflichtet wird …“

### § 34c GewO – Immobilienmakler … (Auszug Abs. 1; https://www.gesetze-im-internet.de/gewo/__34c.html)
„(1) Wer gewerbsmäßig 1. den Abschluss von Verträgen über Grundstücke, grundstücksgleiche Rechte, gewerbliche Räume oder Wohnräume vermitteln oder die Gelegenheit zum Abschluss solcher Verträge nachweisen, … 4. das gemeinschaftliche Eigentum von Wohnungseigentümern … oder für Dritte Mietverhältnisse über Wohnräume … verwalten (Wohnimmobilienverwalter) will, bedarf der Erlaubnis der zuständigen Behörde.“ (Rest des Paragrafen inkl. Weiterbildungspflicht Abs. 2a nicht extrahiert – vor Zitat prüfen.)

## A2. Offene Prüfpunkte (vor Veröffentlichung verifizieren)
1. GModG: Verkündungsdatum/BGBl.-Fundstelle; Bußgeldnorm und -höhe (§ 108 GModG?); § 88 GModG Ausstellungsberechtigte.
2. KSpVO BW: Ditzingen (nicht in Liste) vs. Mieterbund; Nachfolgeverordnung ab 01.01.2027.
3. Mietpreisbremsen-/Kappungsgrenzenverordnung BW: welche der fünf Orte enthalten.
4. Grunderwerbsteuer-Befreiung bei Ehegatten/Scheidung: § 3 Nr. 4, Nr. 5 GrEStG.
5. Gebührenfreiheit Grundbuchberichtigung 2 Jahre (GNotKG KV 14110 Abs. 2).
6. Anzeigepflicht Erbschaft 3 Monate (§ 30 ErbStG); Familienheim § 13 Abs. 1 Nr. 4b/4c ErbStG (200 m²).
7. BFH IX R 11/23 (Veräußerung Miteigentumsanteil an Ex-Ehegatten); BFH II R 6/23 (ETW-Bewertung ErbSt) – Volltexte.
8. BGH-Entscheidung zur Provision nach Widerruf (vzbv-Meldung) – Az./Datum.
9. Drei-Objekt-Grenze: BMF-Schreiben 26.03.2004 (IV A 6 – S 2240 – 46/04).
10. § 34c Abs. 2a GewO Weiterbildungspflicht (20 Std./3 Jahre).
11. Zuständige Amtsgerichte (Grundbuch, Nachlass, Betreuung, Vollstreckung) für die fünf Orte; Finanzämter.
12. Gutachterausschüsse: aktuelle Marktberichte/Kaufpreise ETW je Ort; BORIS-BW-Link.
13. Einwohnerzahlen aus Statistik-BW-Originaltabelle.
14. Google-Kategorienliste (exakter Kategoriename „Immobilienmakler“) und Rezensionsrichtlinien (Anreize).
15. Homeday/McMakler-Sofortkauf-Angebote: existieren sie 2026?
16. Immopaka-Vergleichstabelle (Redirect www.immopaka.de) – lesen.
17. Landtagsdrucksache 17/9410 Pforzheim Wohnungsmarkt – auswerten.

## A3. Quellenverzeichnis (alle abgerufenen bzw. in Suchergebnissen genutzten URLs)

**Gesetze / amtlich**
- https://www.gesetze-im-internet.de/bgb/__577.html
- https://www.gesetze-im-internet.de/bgb/__577a.html
- https://www.gesetze-im-internet.de/bgb/__656a.html
- https://www.gesetze-im-internet.de/bgb/__656c.html
- https://www.gesetze-im-internet.de/bgb/__656d.html
- https://www.gesetze-im-internet.de/bgb/__1850.html
- https://www.gesetze-im-internet.de/estg/__23.html
- https://www.gesetze-im-internet.de/geg/__80.html
- https://www.gesetze-im-internet.de/geg/__87.html
- https://www.gesetze-im-internet.de/gewo/__34c.html
- https://dejure.org/gesetze/WEG/12.html
- https://www.landtag-bw.de/resource/blob/611984/7e993deafc1547ab553a30dfe14a9333/GBl2025146.pdf (KSpVO BW)
- https://www.landtag-bw.de/resource/blob/594668/5139a27b9c42942fb2e9d026dfe7cc7e/17_9410_D.pdf (Pforzheim Wohnungsmarkt, nicht ausgewertet)
- https://dserver.bundestag.de/btd/19/158/1915827.pdf (Gesetzentwurf Maklerkosten)
- https://web1.karlsruhe.de/service/Buergerdienste/leistung.php?id=413 (Grunderwerbsteuer BW)
- https://www.pforzheim.de/fileadmin/user_upload/bauen/Gutachterausschuss/Immobilienmarktbericht_2021_22_Internet.pdf
- https://www.leonberg.de/Rathaus/Verwaltung/Gutachterausschuss
- https://www.bosch-presse.de/pressportal/de/media/dam_images/pi9990/factsheet_bosch-forschungscampus_renningen_de.pdf
- https://newsroom.porsche.com/de_CH/unternehmen/standorte/weissach.html
- https://notar.de/fileadmin/user_upload_notarde/pressemitteilungen/presseportal_auf-eine-notarielle-vorsorgevollmacht-sollten-immo_3810744.pdf

**Verbraucherschutz / unabhängig**
- https://www.verbraucherzentrale.de/wissen/energie/energetische-sanierung/energieausweis-wer-braucht-ihn-24054
- https://www.verbraucherzentrale.de/wissen/geld-versicherungen/altersvorsorge/verkauf-der-immobilie-gegen-rentenzahlung-leibrente-102201
- https://www.vzhh.de/presse/teilverkauf-immobilienverzehr-vielen-nachteilen
- https://www.vzhh.de/sites/default/files/medien/136/dokumente/2023-2024_Verbraucherzentrale_Broschuere_Immobilienrente_Web_0.pdf
- https://www.finanztip.de/spekulationssteuer-immobilienverkauf/
- https://www.finanztip.de/erbschaftssteuer/
- https://www.test.de/Frage-und-Antwort-Eigentuemergemeinschaft-muss-Energieausweis-bezahlen-4751159-0/
- https://www.test.de/Eigentumswohnungen-Wirtschaftlichkeitspruefung-Rechenschema-1131793-0/
- https://immo.info/immobilienrente-teilverkauf/teilverkauf-haus/
- https://www.ihk.de/bodensee-oberschwaben/branchen/vermittlergewerbe/makler-und-bautraeger/neue-gesetzliche-regelungen-fuer-immobilienmakler-4982344
- https://www.vzbv.de/urteile/zur-maklerprovision-nach-widerruf
- https://mieterbund.de/service/mieterschutzverordnungen/kuendigungssperrfrist/
- https://vdiv.de/aktuelles/praxistipps-details/der-energieausweis-ein-muss-fuer-jeden-wohnungseigentuemer-und-verwalter

**Portale**
- https://www.immobilienscout24.de/wissen/verkaufen/wohnung-verkaufen.html
- https://www.immobilienscout24.de/wissen/verkaufen/vermietete-wohnung-verkaufen.html
- https://www.immobilienscout24.de/wissen/verkaufen/geerbtes-haus-verkaufen-steuer.html
- https://www.immobilienscout24.de/wissen/verkaufen/verteilung-verkaufserloes-immobilie-bei-scheidung.html
- https://www.immobilienscout24.de/wissen/verkaufen/spekulationssteuer.html
- https://www.immobilienscout24.de/wissen/verkaufen/maklerprovision.html
- https://www.immobilienscout24.de/wissen/verkaufen/wertermittlung.html
- https://www.immobilienscout24.de/wissen/verkaufen/immobilienschaetzung.html
- https://www.immobilienscout24.de/wissen/verkaufen/vermieten-oder-verkaufen.html
- https://www.immobilienscout24.de/wissen/verkaufen/hausverkauf-bei-pflegefall.html
- https://www.immobilienscout24.de/wissen/verkaufen/immobilie-durch-betreuer-verkaufen.html
- https://www.immobilienscout24.de/wissen/verkaufen/immobilie-bei-demenz-verkaufen.html
- https://www.immobilienscout24.de/unternehmen/news-medien/news/default-title/vermietete-eigentumswohnungen-bis-zu-33-prozent-guenstiger-als-unvermietete/
- https://www.immobilienscout24.de/anbieter/immobilienmakler/de/baden-wuerttemberg/boeblingen-kreis/leonberg
- https://www.immobilienscout24.de/anbieter/immobilienmakler/de/baden-wuerttemberg/enzkreis/heimsheim
- https://www.immobilienscout24.de/anbieter/immobilienmakler/de/baden-wuerttemberg/boeblingen-kreis/renningen
- https://www.immobilienscout24.de/regional/de/baden-wuerttemberg/enzkreis/heimsheim/
- https://www.immobilienscout24.de/regional/de/baden-wuerttemberg/boeblingen-kreis/leonberg/
- https://www.immobilienscout24.de/regional/de/baden-wuerttemberg/ludwigsburg-kreis/ditzingen/
- https://www.immobilienscout24.de/regional/de/baden-wuerttemberg/boeblingen-kreis/renningen/
- https://www.homeday.de/de/immobilienverkauf/wohnung-verkaufen/
- https://www.homeday.de/de/immobilienverkauf/haus-und-scheidung/
- https://www.homeday.de/de/immobilienverkauf/maklerprovision/
- https://www.homeday.de/de/immobilienverkauf/haus-verkaufen-ohne-makler/
- https://www.homeday.de/de/immobilienbewertung/wohnungsbewertung/
- https://www.homeday.de/de/immobilienbewertung/vergleichswertverfahren/
- https://www.homeday.de/de/preisatlas/leonberg/
- https://www.immoverkauf24.de/immobilienmakler/maklerprovision/
- https://www.immoverkauf24.de/immobilienbewertung/wohnungsbewertung/
- https://www.immoverkauf24.de/immobilienpreise/baden-wuerttemberg/boeblingen-kreis/leonberg/
- https://www.immoverkauf24.de/immobilienpreise/baden-wuerttemberg/ludwigsburg-kreis/ditzingen/
- https://www.immoverkauf24.de/immobilienpreise/baden-wuerttemberg/boeblingen-kreis/renningen/
- https://www.immoverkauf24.de/immobilienpreise/baden-wuerttemberg/enzkreis/heimsheim/
- https://www.immoverkauf24.de/immobilienpreise/baden-wuerttemberg/pforzheim/
- https://www.immoportal.com/verwalten/erbschaft/geerbtes-haus-verkaufen-fristen-steuern-ablauf-und-kosten
- https://www.immoportal.com/gutachten/immobilienbewertung/was-gilt-es-bei-der-wertermittlung-einer-eigentumswohnung-zu-beachten
- https://www.immoportal.com/node/100171
- https://www.immoportal.com/immobilienpreise/leonberg ; …/heimsheim ; …/ditzingen ; …/renningen ; …/pforzheim
- https://www.immoportal.com/immobilienmakler/leonberg ; …/renningen
- https://wohnglueck.de/artikel/geerbtes-haus-verkaufen-70484
- https://www.aroundhome.de/immobilienverkauf/geerbtes-haus-verkaufen/
- https://www.von-poll.com/de/immobilien/leonberg
- https://www.bodenrichtwerte-deutschland.de/boris/bw/leonberg ; …/heimsheim ; https://www.bodenrichtwerte-deutschland.de/gutachterausschuss/bw/leonberg
- https://www.bodenrichtwerte-deutschland.de/immobilienwissen/haus-verkaufen-ohne-makler
- https://www.jacasa.de/immobilienmakler/bw/heimsheim ; …/bw/renningen ; https://www.jacasa.de/immobilienmakler/mcmakler-leonberg ; …/iep-wohnen-leonberg (Suchergebnisse; Site blockt Bots)
- https://www.miet-check.de/immobilienpreise/leonberg/ ; https://www.ohne-makler.net/immobilienpreise/baden-wurttemberg/leonberg/ ; https://www.ohne-makler.net/mietspiegel/baden-wurttemberg/pforzheim/ ; https://www.immobilienpreise-2026.de/bw/heimsheim ; …/ditzingen ; …/renningen ; https://www.wohnungsboerse.net/mietspiegel-Leonberg/176 ; https://www.wohnungsboerse.net/immobilienpreise-Ditzingen/501 ; https://www.wohnungsboerse.net/immobilienpreise-Renningen/180 ; https://www.miete-aktuell.de/immobilienpreise-quadratmeterpreise/Pforzheim/Pforzheim/ (Suchergebnisse)
- https://www.konii.de/?p=211416 ; https://www.konii.de/?p=197000 (IVD Pforzheim, Suchergebnisse)

**Makler / Dienstleister / Fachseiten**
- https://reduco.ai/blog/immobilienverkauf/wohnung-verkaufen-ablauf
- https://reduco.ai/blog/energieausweis/energieausweis-wohnung-eigentumswohnung
- https://reduco.ai/blog/immobilienverkauf/haus-verkaufen-wohnen-bleiben
- https://reduco.ai/blog/immobilienverkauf/haus-verkaufen-ohne-makler
- https://www.anwalt.org/wohnung-verkaufen/
- https://deutschesmietrecht.de/kuendigung/eigentumswohnung-umwandlung-vorkaufsrecht/77-mieterschutz-bei-umwandlung-in-eine-eigentumswohnung.html
- https://www.kanzlei-hasselbach.de/blog/teilungsversteigerung-bei-scheidung/
- https://www.steuertipps.de/wohnen-haus-vermietung/spekulationssteuer-immobilien/themen
- https://www.drklein.de/finanzlexikon/spekulationssteuer-bei-immobilien.html
- https://www.cash-online.de/a/im-vergleich-immobilie-verkaufen-oder-vermieten-475368/
- https://www.immostage.ai/bewertung/immobilie-verkaufen-strategien/
- https://www.ebnerstolz.de/de/unser-angebot/leistungen/steuerberatung/nachfolgeplanung/vergleichspreise-immobilienbewertung-erbschaft-und-schenkungsteuer-108656.html (Suchergebnis)
- https://www.gaeu-immobilien.de/ ; https://www.iep-wohnen.de/ ; https://www.bauexpert-wohnbau.de/
- https://www.deutsche-grund-invest.de/leistungen/sofortkauf ; https://immobiliendirektankauf.de/ueber-uns ; https://immopaka.de/ ; https://www.immobilien-sofortkauf.de/ ; https://www.sofortkaufimmobilien.de/ ; https://deinimmokaeufer.de/ ; https://www.immofly.de/hausankauf.html ; https://www.immobilien-kraus.com/sofortankauf ; https://imdira.de/ ; https://www.distler-gruppe.de/immobilienankauf/ ; https://www.immobilien-erfahrung.de/immobilien-sofort-ankauf-nrw-berlin-wohnung-haus-mehrfamilienhaus/
- https://ch.trustpilot.com/review/immobilien-sofortkauf.de ; https://www.provenexpert.com/immopaka/
- https://www.biallo.de/bauen/news/immobilienpreise-verhandeln-2025/ (IS24/Sprengnetter-Analyse)
- https://www.haufe.de/immobilien/entwicklung-vermarktung/marktanalysen/iw-koeln-junge-menschen-koennen-kaum-noch-wohneigentum-bilden_84324_496482.html
- https://iwd.de/pdf/geteilte-kosten-bei-der-maklerprovision-514906
- https://pflegewegweiser-nrw.de/sites/default/files/pdf/5789-frage-des-monats-februar-2024.pdf ; https://www.gegen-hartz.de/news/rente-wann-das-sozialamt-den-hausverkauf-verlangen-kann
- https://www.dasinvestment.com/in-der-google-suche-auf-seite-1-wie-makler-von-google-besser-gefunden-werden/ (2015, nur Teaser)

**SEO / Google / Schema**
- https://support.google.com/business/answer/3038177?hl=de
- https://developers.google.com/search/docs/appearance/structured-data/local-business
- https://developers.google.com/search/docs/essentials/spam-policies
- https://developers.google.com/search/docs/appearance/title-link
- https://schema.org/RealEstateAgent
- https://www.semrush.com/blog/does-nap-consistency-matter-for-local-seo/ ; https://www.localfalcon.com/blog/what-is-nap-consistency-in-local-seo ; https://carrot.com/blog/nap-name-address-phone-number-local-seo/
- https://kitemetric.com/blogs/real-estate-seo-dominate-local-search-with-schema ; https://searchatlas.com/blog/real-estate-seo-guide/ (Suchergebnisse)

**Ortsdaten**
- https://de.wikipedia.org/wiki/Leonberg ; …/Heimsheim ; …/Ditzingen ; …/Renningen ; …/Pforzheim
- https://www.stuttgarter-zeitung.de/wirtschaft/bonuszahlung-aufschwung-bei-trumpf-so-viel-zahlt-der-konzern-seinen-beschaeftigten-79574006.html ; https://www.industrial-production.de/wirtschaft---unternehmen/trumpf-steigert-gewinn-und-auftragseingang-im-geschaeftsjahr-2025-26.htm
- https://www.stuttgarter-zeitung.de/wirtschaft/stuttgarter-sportwagenhersteller-bei-porsche-stehen-offenbar-bis-zu-4000-weitere-jobs-auf-der-kippe-79276118.html
- https://signal.eu.org/rail/train/de/S6%207669 (Fahrzeit-Einzelbeleg)
- https://onlinestreet.de/orte/heimsheim ; https://de.wikivoyage.org/wiki/Renningen ; https://www.ditzingen.de/fileadmin/Dateien/Dateien/Daten_Fakten/Imagebroschuere.pdf (Suchergebnisse)

## A4. Rohdaten
- HTML-Rohdateien aller abgerufenen Seiten (MD5-benannt): `/tmp/claude-0/-home-user/e7214d44-0169-5a35-af11-cf04a7507b2a/scratchpad/dl-themen/`
- KSpVO-BW-Volltext: `/tmp/claude-0/-home-user/e7214d44-0169-5a35-af11-cf04a7507b2a/scratchpad/dl-themen/pdf/GBl2025146.txt`
- Extraktionsskript (Headings/Wortzahl/Schema): `/tmp/claude-0/-home-user/e7214d44-0169-5a35-af11-cf04a7507b2a/scratchpad/tools/extract.py`

---

# ANHANG B – ARBEITSMATERIAL FÜR DIE TEXTERSTELLUNG

## A5. FAQ-Fragenbank (wörtlich von den rankenden Seiten übernommen, nach Thema; für eigene FAQ-Blöcke umformulieren und lokal zuspitzen)

### Thema 1 – Eigentumswohnung verkaufen
- „Welche Unterlagen brauche ich zum Verkauf einer Eigentumswohnung?“ (reduco)
- „Brauche ich für den Verkauf wirklich die Zustimmung des Verwalters?“ (reduco)
- „Darf der Verwalter den Verkauf verweigern, und was ist ein wichtiger Grund?“ (reduco)
- „Wer zahlt eine beschlossene Sonderumlage: Käufer oder Verkäufer?“ (reduco)
- „Haftet der Käufer für meine Hausgeldrückstände, und was wird aus meiner Rücklage?“ (reduco)
- „Brauche ich einen eigenen Energieausweis für meine Wohnung?“ (reduco)
- „Wie lange dauert der Verkauf einer Eigentumswohnung insgesamt?“ (reduco)
- „Wann ist der Verkauf steuerfrei?“ (reduco)
- „Kann ich meine Eigentumswohnung privat ohne Makler verkaufen?“ (reduco)
- „Was muss ich beachten, wenn ich eine Wohnung verkaufe?“ (IS24)
- „Wie verkaufe ich meine Wohnung am besten?“ (IS24)
- „Wie viel Steuern muss ich bezahlen, wenn ich eine Wohnung verkaufe?“ (IS24)
- „Wann kann ich eine Wohnung steuerfrei verkaufen?“ (IS24, Homeday)
- „Wie lange dauert der Wohnungsverkauf in der Regel?“ (IS24)
- „Wann ist ein guter Zeitpunkt, um eine Wohnung zu verkaufen?“ (Homeday)
- „Welche Unterlagen brauche ich, um eine Wohnung zu verkaufen?“ (Homeday)
- „Wann muss ich Spekulationssteuer bezahlen?“ (Homeday)
- „Kann ich meine Wohnung verkaufen, wenn sie noch nicht abbezahlt ist?“ (Homeday)
- „Wie wirkt sich der Verkauf einer vermieteten Wohnung auf den Preis aus?“ (Homeday)
- „Wann ist der Verkauf einer vermieteten Wohnung sinnvoll?“ (Homeday)
- Ist ein Notar nötig? / Ist privater Verkauf möglich? / Gibt es einen festen Ablauf? / Eigenbedarf durch neue Eigentümer? (anwalt.org, sinngemäß)
- Lokale Ergänzungen (Vorschlag): „Welche Hausverwaltungen in Leonberg stellen die Unterlagen wie schnell aus?“ / „Wie lange dauert ein Wohnungsverkauf in Leonberg aktuell?“ / „Welches Grundbuchamt ist für Heimsheim zuständig?“

### Thema 2 – Vermietete Wohnung
- „Welche Rechte haben die Mieter, wenn die vermietete Eigentumswohnung verkauft wird?“ (IS24)
- „Gibt es eine Wertminderung, wenn ich eine vermietete Eigentumswohnung verkaufe?“ (IS24)
- „Kann ich Mietern kündigen, wenn ich die Wohnung verkaufen will?“ (IS24)
- „Wie lange hat ein Mieter Kündigungsschutz bei Verkauf?“ (IS24)
- „Wie lange muss man vermieten, um steuerfrei zu verkaufen?“ (IS24)
- „Wann kann ich ein Vorkaufsrecht geltend machen?“ / „Welcher Personenkreis ist vorkaufsberechtigt?“ / „Wie erkläre ich ein Vorkaufsrecht?“ / „Muss ich eine Maklerprovision zahlen?“ (deutschesmietrecht, Mietersicht)
- „Ist der Wohnungsverkauf an den Mieter einfacher?“ / „Wie berechne ich Brutto- und Nettomietrendite?“ (immoportal)
- Lokale Ergänzungen: „Gilt in Leonberg die verlängerte Kündigungssperrfrist?“ (5 Jahre, KSpVO BW 2026) / „Welchen Faktor zahlen Kapitalanleger in Pforzheim?“

### Thema 3 – Erbimmobilie
- „Wann kann man eine geerbte Immobilie steuerfrei verkaufen?“ / „Kann man ein geerbtes Haus sofort verkaufen?“ / „Ist der Verkauf einer geerbten Immobilie steuerfrei?“ / „Wie schnell kann man ein geerbtes Haus verkaufen?“ / „Wie verkauft man ein geerbtes Haus?“ (IS24)
- „Muss ich ein geerbtes Haus sofort verkaufen?“ / „Kann ich ein geerbtes Haus ohne Grundbucheintrag verkaufen?“ / „Fällt beim Verkauf eines geerbten Hauses Einkommensteuer an?“ / „Wann fällt Erbschaftsteuer beim Verkauf an?“ / „Was passiert, wenn der Verkaufspreis höher als der Verkehrswert ist?“ / „… niedriger als der Verkehrswert ist?“ / „Kann ich ein geerbtes Haus im Ausland verkaufen?“ / „Wann kann ich ein geerbtes Haus verkaufen?“ (immoportal)
- Erbschein nötig? / Makler nötig? / Steuerlast senken? (wohnglück, sinngemäß)
- Lokale Ergänzungen: „Welches Nachlassgericht ist für Renningen zuständig?“ / „Wie bewertet das Finanzamt eine geerbte Wohnung in Leonberg?“ (Gutachterausschuss-Vergleichswerte, BFH II R 6/23)

### Thema 4 – Scheidung
- „Was passiert bei einer Scheidung mit dem Haus?“ / „Was, wenn der Immobilienkredit bei der Scheidung mit Haus noch nicht abbezahlt ist?“ / „Wie werden die Eigentumsanteile eines Hauses bei der Scheidung übertragen?“ / „Was passiert, wenn ein Partner im Haus wohnen bleiben möchte?“ / „Welche steuerlichen Folgen hat die Auszahlung des anderen Partners?“ (Homeday)
- „Was ist zu beachten, wenn ein Ehepartner das Haus übernimmt?“ / „Was passiert, wenn der eine Ehegatte nicht veräußern möchte?“ / „Was bedeutet Zugewinnausgleich?“ (IS24, als H3)
- Lokale/ETW-Ergänzungen: „Wer zahlt das Hausgeld während der Trennung?“ / „Was kostet eine Teilungsversteigerung beim Amtsgericht Leonberg?“ (Kostenbeispiel Hasselbach)

### Thema 5 – Spekulationssteuer
- „Wann fällt bei Immobilien überhaupt Spekulationssteuer an?“ / „Kann ich eine Immobilie auch vor Ablauf der zehn Jahre steuerfrei verkaufen?“ / „Was passiert steuerlich, wenn ich meine Geschwister beim Erben auszahle?“ (steuertipps)
- „Muss ich Spekulationssteuer zahlen?“ / „Wie hoch ist die Spekulationssteuer?“ / „Spekulationsfrist bei Neubau: Welches Datum zählt?“ / „Was passiert mit der Spekulationsfrist bei Schenkung oder Erbschaft?“ (IS24, als Überschriften)
- „Warum reichen ein Jahr und zwei Tage der Selbstnutzung?“ / „Was gilt bei einer Zweit- oder Ferienwohnung?“ / „Welche Ausnahmeregelung gibt es für Kinder?“ / „Was passiert mit dem Arbeitszimmer beim Verkauf?“ (Finanztip, als Überschriften)
- ETW-Ergänzung: „Zählt der Rücklagenanteil zum Veräußerungspreis?“

### Thema 6 – Maklerprovision
- „Wie viel ist 3,57 % Käuferprovision?“ / „Ist eine Käuferprovision von 7,14 % üblich?“ / „Kann ich die Maklerprovision verhandeln?“ / „Muss ich Maklerprovision zahlen, wenn ich selbst eine:n Käufer:in finde?“ (IS24)
- „Gibt es eine gesetzliche Obergrenze?“ / „Fallen schon bei der Beauftragung Kosten an?“ / „Können Maklerkosten bei Nicht-Erfolg anfallen?“ / „Welche Form muss ein Maklervertrag haben?“ / „Wer zahlt zuerst?“ (Homeday)
- „Kann man die Maklerprovision verhandeln?“ / „Maklerprovision umgehen: Ist das möglich?“ / „Kann ich zu Unrecht gezahlte Maklergebühren zurückfordern?“ (immoverkauf24)
- „Was passiert mit dem Provisionsanspruch bei Widerruf des Vertrages durch den Verbraucher?“ (IHK)
- Lokale Ergänzung: „Was kostet Rössler Immobilien beim Verkauf einer 290.000-€-Wohnung in Leonberg?“ / „Was ist ein qualifizierter Alleinauftrag?“

### Thema 7 – Energieausweis
- „Kann ich einen Energieausweis nur für meine Wohnung erstellen lassen?“ / „Was, wenn die Hausverwaltung den Energieausweis nicht beschafft?“ / „Muss ich als Käufer die schlechte Energieeffizienz des Gebäudes hinnehmen?“ / „Wer zahlt den Energieausweis, wenn ich ihn wegen meines Verkaufs auslöse?“ (reduco)
- „Welcher Ausweis für welches Gebäude?“ / „Wann müssen Sie den Energieausweis vorlegen?“ / „Müssen in einer Wohnungs-Anzeige Informationen aus dem Ausweis stehen?“ / „Muss mein Gebäude vor Ort begutachtet werden?“ (VZ, als H2)

### Thema 8 – Bewertung
- „Wie lässt sich der Wert einer Wohnung berechnen?“ / „Was ist meine Wohnung wert anhand ihrer Lage?“ / „Welches Bewertungsverfahren eignet sich am besten, um eine Wohnung zu bewerten?“ / „Welche Faktoren beeinflussen den Wohnungswert …?“ / „Ist eine freie oder vermietete Wohnung wertvoller?“ / „Wie kann ich kostenlos den Wert meiner Wohnung ermitteln?“ / „Welche Formel gibt es zur Berechnung des Wohnungswertes?“ / „Ist der Verkehrswert gleich dem Kaufpreis?“ / „Wo bekomme ich den Verkehrswert meiner Wohnung her?“ / „Wie erfahre ich den Wert meiner Eigentumswohnung?“ / „Wer darf eine Wohnung professionell bewerten?“ / „Wie genau ist eine Online-Wohnungsbewertung?“ (Homeday)
- Lokale Ergänzung: „Was kostet der Quadratmeter in Leonberg-Eltingen vs. Ramtel?“ (nur beantworten, wenn Daten vorhanden)

### Thema 9 – Verkaufen oder vermieten
- „Was ist finanziell sinnvoller: Immobilie verkaufen oder vermieten?“ / „Wann ist eine Vermietung rentabel?“ / „Warum verlieren Privatvermieter manchmal Geld?“ / „Wann ist ein Verkauf die bessere Entscheidung?“ / „Welche Rolle spielt die Spekulationssteuer bei der Entscheidung?“ / „Wie berechne ich, ob sich Vermieten oder Verkaufen mehr lohnt?“ / „Ist eine Immobilie als Altersvorsorge besser geeignet als ein Verkauf?“ / „Welche Kosten entstehen bei einer Vermietung?“ (IS24)

### Thema 10 – Alter/Pflege/Wohnrecht
- „Kann ich mein Haus verkaufen und trotzdem darin wohnen bleiben?“ / „Wie viel weniger bekomme ich mit lebenslangem Wohnrecht oder Nießbrauch?“ / „Was ist besser: Nießbrauch oder Wohnrecht?“ / „Was kostet ein Immobilien-Teilverkauf wirklich, und was bleibt von meinem Anteil?“ / „Kann mir nach einem Rückmietverkauf wegen Eigenbedarf gekündigt werden?“ / „Wer zahlt Reparaturen, Grundsteuer und Gebäudeversicherung, wenn ich mit Wohnrecht wohnen bleibe?“ / „Wie hoch ist die Rente bei einer Leibrente, und was passiert, wenn ich früh sterbe?“ / „Gibt es eine günstigere Alternative, zum Beispiel einen Kredit im Alter?“ / „Was bleibt meinen Kindern, wenn ich verkaufe und wohnen bleibe?“ (reduco)
- „Kann das Sozialamt mich zwingen, mein Haus zu verkaufen?“ / „Was passiert mit dem Haus, wenn ich ins Pflegeheim muss?“ / „Wird Mutter zum Pflegefall, droht der Verlust des Hauses?“ / „Was zählt zum Schonvermögen im Pflegefall?“ / „Kann das Pflegeheim mein Haus pfänden?“ (IS24)
- „Wann darf ein Betreuer meine Immobilie verkaufen?“ / „Welche Rolle spielt das Betreuungsgericht?“ / „Was passiert, wenn der Betreuer die Immobilie unter Wert verkauft?“ (IS24 Betreuer, als H2)

### Thema 11 – Ohne Makler
- „Kann ich mein Haus wirklich komplett ohne Makler selber verkaufen?“ / „Wie viel Geld spare ich beim Hausverkauf ohne Makler tatsächlich?“ / „Wie finde ich beim Privatverkauf ohne Makler den richtigen Preis?“ / „Kann ich mein Haus bei ImmobilienScout24 ohne Makler inserieren und was kostet das?“ / „Wie prüfe ich beim Verkauf privat an privat die Bonität des Käufers?“ / „Brauche ich zwingend einen Energieausweis und was passiert ohne?“ / „Kann der Käufer den notariellen Kaufvertrag noch widerrufen?“ / „Wie lange dauert ein privater Hausverkauf ohne Makler realistisch?“ / „Fällt beim privaten Hausverkauf Spekulationssteuer an?“ (reduco)
- „Kann man sein Haus ohne Makler verkaufen?“ / „Wie viel kostet es, ein Haus ohne Makler zu verkaufen?“ / „Wie lange dauert ein Hausverkauf ohne Makler?“ / „Was muss ich beachten, wenn ich mein Haus privat verkaufe?“ / „Wann lohnt sich ein Makler doch?“ (bodenrichtwerte-deutschland)

### Thema 12 – Sofortankauf
- „Welche Verkaufsstrategie erzielt den höchsten Preis?“ / „Wie lange dauert ein Immobilienverkauf in Deutschland?“ / „Wann lohnt sich ein Sofortankauf wirklich?“ / „Ist ein Bieterverfahren legal und sicher?“ (immostage)
- Ergänzungen: „Wie erkenne ich einen seriösen Ankäufer?“ / „Wie weit unter Marktwert liegen Sofortankauf-Angebote?“ / „Gibt es Sofortankäufer in Leonberg oder Pforzheim?“

## A6. Vorschlag: H-Gliederung je Rössler-Ratgeber (ETW-fokussiert, lokal, quellenbasiert)

### R1 – Eigentumswohnung verkaufen: Ablauf, WEG-Unterlagen, Kosten (Leonberg & Region)
- H1: Eigentumswohnung verkaufen: Ablauf, Unterlagen und Kosten – Leitfaden für Leonberg, Heimsheim, Ditzingen, Renningen und Pforzheim
- H2: Das Wichtigste in Kürze (5 Bullet-Points mit Zahlen)
- H2: Ablauf in 6 Phasen – mit realistischen Zeitangaben (Quellen: reduco 90 Tage Vermarktung; IS24 3–5 Monate)
- H2: Die WEG-Unterlagen: 12 Dokumente und wer sie hat (Tabelle: Dokument / Quelle / Frist / Kosten)
  - H3: Teilungserklärung & Gemeinschaftsordnung / H3: Protokolle der letzten 3 Versammlungen & Beschluss-Sammlung / H3: Wirtschaftsplan, Jahresabrechnung, Vermögensbericht (§ 28 WEG) / H3: Energieausweis (über die WEG, § 80 GModG)
- H2: Verwalterzustimmung nach § 12 WEG – wann nötig, was sie kostet
- H2: Hausgeld, Rücklage, Sonderumlage: So wirken sie auf Preis und Vertrag (BGH V ZR 257/16; V ZR 209/12)
- H2: Was der Verkauf kostet – Beispiel 290.000 € in Leonberg (5 % Grunderwerbsteuer beim Käufer, Grundschuldlöschung, Provision)
- H2: Steuern: 10-Jahres-Frist und Eigennutzung (Link R5)
- H2: Vermietet verkaufen? Sperrfrist 5 Jahre in Leonberg/Pforzheim (Link R2)
- H2: Mit oder ohne Makler (Link R11) / H2: Häufige Fragen / H2: Nächster Schritt: kostenlose Wohnungsbewertung

### R2 – Vermietete Eigentumswohnung verkaufen
- H1: Vermietete Wohnung verkaufen: Vorkaufsrecht, Kündigungssperrfrist, Preis und Käufer in der Region Stuttgart/Pforzheim
- H2: Das Wichtigste in Kürze
- H2: Kauf bricht nicht Miete (§ 566 BGB) – was der Käufer übernimmt
- H2: Vorkaufsrecht des Mieters (§ 577 BGB): Ablauf mit Fristen (Mitteilung, 2 Monate, Schriftform, Provision)
- H2: Kündigungssperrfrist (§ 577a BGB): 3 Jahre – und 5 Jahre in Leonberg und Pforzheim (KSpVO BW 2026, Tabelle für alle fünf Orte)
- H2: Wie viel weniger bringt eine vermietete Wohnung? (IS24-PM: Stuttgart 12 %; Ratgeber 20–30 %)
- H2: Zielgruppe Kapitalanleger: Faktor und Rendite mit lokalen Mieten (Formeln immoportal)
- H2: Unterlagen für Anleger (Checkliste) / H2: Besichtigungen mit Mieter / H2: Steuer / H2: Oder an den Mieter verkaufen? / H2: FAQ / CTA

### R3 – Geerbte Wohnung verkaufen
- H1: Geerbte Eigentumswohnung verkaufen: Erbschein, Grundbuch, Erbengemeinschaft, Steuern – Schritt für Schritt
- H2: In Kürze / H2: Erste 6 Wochen: Annahme oder Ausschlagung (§ 1944 BGB) / H2: Nachweis: Erbschein oder notarielles Testament (Grundbuch 2 Jahre gebührenfrei – prüfen) / H2: Die Wohnung in der WEG: Hausgeld, Verwalter, Rücklage im Nachlass / H2: Erbengemeinschaft: Einstimmigkeit, Auszahlung, Teilungsversteigerung – und die Steuerfalle „teilentgeltlicher Erwerb“ / H2: Erbschaftsteuer: Freibeträge und Sätze (Tabelle) mit Beispiel / H2: Spekulationssteuer: Fußstapfentheorie / H2: Wert für das Finanzamt (BFH II R 6/23, Gutachterausschuss) / H2: Verkaufen, vermieten, einziehen? / H2: FAQ / CTA

### R4 – Wohnung bei Scheidung
- H1: Eigentumswohnung bei Trennung und Scheidung: Zugewinn, Übernahme, Verkauf oder Teilungsversteigerung
- H2: In Kürze / H2: Wem gehört was: Grundbuch vs. Zugewinn / H2: Die vier Wege (Verkauf, Übernahme, Vermietung, Teilungsversteigerung) mit Kosten (Hasselbach-Zahlen) / H2: Hausgeld, Kredit, Bank während der Trennung / H2: Steuern: Spekulationssteuer beim Verkauf an den Ex-Partner, Grunderwerbsteuer-Befreiung / H2: Neutrale Bewertung als Streitvermeider / H2: FAQ / CTA

### R5 – Spekulationssteuer
- H1: Spekulationssteuer beim Verkauf der Eigentumswohnung: Frist, Ausnahmen, Rechenbeispiel (Stand 2026)
- H2: In Kürze / H2: Die 10-Jahres-Frist (Datum Notarvertrag) / H2: Eigennutzung: Verkaufsjahr + 2 Vorjahre („ein Jahr und zwei Tage“, Finanztip) / H2: Sonderfälle: Erbe, Schenkung, Geschwister auszahlen, Scheidung, Pendler-Zweitwohnung (BFH-Az.) / H2: So wird der Gewinn berechnet – Beispiel Leonberg mit AfA und Rücklage / H2: Freigrenze 1.000 € und Verluste / H2: Drei-Objekt-Grenze kurz erklärt / H2: Anlage SO / H2: FAQ / Hinweis Steuerberatung

### R6 – Maklerprovision
- H1: Maklerprovision in Baden-Württemberg: Höhe, Aufteilung, Vertrag – und was Rössler Immobilien kostet
- H2: In Kürze / H2: Das Gesetz seit 23.12.2020 (§§ 656a–d BGB) in drei Sätzen / H2: Übliche Sätze in BW (3,57 % je Seite; Quellen) / H2: Beispielrechnung Leonberg und Pforzheim / H2: Was in der Provision enthalten ist (Leistungskatalog) / H2: Maklervertrag: Textform, Alleinauftrag, Laufzeit, Widerruf (14 Tage) / H2: Halbteilung oder Innenprovision? / H2: Wann keine Provision anfällt / H2: FAQ / CTA

### R7 – Energieausweis
- H1: Energieausweis beim Verkauf der Eigentumswohnung: WEG-Zuständigkeit, Pflichtangaben, Fristen (GModG 2026)
- H2: In Kürze / H2: Ein Ausweis fürs Gebäude – nicht für die Wohnung / H2: Wer beschafft, wer zahlt, wer legt vor (§ 80 GModG, §§ 16, 18, 19, 24, 44 WEG) / H2: Bedarfs- oder Verbrauchsausweis? / H2: Pflichtangaben in der Anzeige (§ 87 GModG) mit Musterzeile / H2: Bußgeld bis 10.000 € / H2: Zeitplan: 3–6 Monate vorher mit der Verwaltung sprechen – Musterschreiben / H2: Effizienzklasse und Preis (immowelt, IS24) / H2: FAQ / CTA

### R8 – Wohnungsbewertung
- H1: Was ist meine Eigentumswohnung wert? Bewertung in Leonberg, Heimsheim, Ditzingen, Renningen, Pforzheim
- H2: Formular (Lead) / H2: Aktuelle Quadratmeterpreise je Ort (Tabelle, Quellen, Stand) / H2: Wie wir bewerten: Vergleichswert (§ 15 ImmoWertV) mit Gutachterausschuss-Daten / H2: Die 12 Preisfaktoren einer ETW (Geschoss, Aufzug, Stellplatz, Balkon, Energieklasse, Hausgeld, Rücklage, Sonderumlage, WEG-Klima, Baujahr, Anzahl WE, vermietet/frei) / H2: Online-Rechner vs. Maklerbewertung vs. Gutachten – ehrlich / H2: Wann ein Gutachten Pflicht ist / H2: Unterlagen für die Bewertung / H2: FAQ

### R9 – Verkaufen oder vermieten
- H1: Eigentumswohnung verkaufen oder vermieten? Entscheidungshilfe mit Zahlen aus der Region
- H2: In Kürze / H2: Rechenbeispiel Leonberg und Pforzheim (Rendite vs. Erlös) / H2: Was ein Vermieter in der WEG trägt (Hausgeld, Sanierungen, Sonderumlagen) / H2: Später verkaufen = an Anleger mit Abschlag und Sperrfrist / H2: Steuer-Timing / H2: 10-Fragen-Checkliste (interaktiv) / H2: FAQ / CTA

### R10 – Verkauf im Alter / Pflegefall / Wohnrecht
- H1: Wohnung verkaufen im Alter: Vollverkauf, Wohnrecht, Nießbrauch, Teilverkauf oder Leibrente – ehrlicher Vergleich
- H2: In Kürze / H2: Entscheidungsmatrix (reduco-Logik) / H2: Nießbrauch vs. Wohnungsrecht (§ 1030 / § 1093 BGB) und was es kostet (Abschläge nach Alter) / H2: Teilverkauf und Leibrente: Zahlen von Verbraucherzentrale und SVRV / H2: Kredit im Alter als Alternative / H2: Pflegefall: Schonvermögen (10.000 €), Sozialamt, § 91 SGB XII-Darlehen, Angehörigen-Entlastungsgesetz / H2: Vollmacht, Betreuung, § 1850 BGB – Zeitbedarf / H2: Barrierefrei umziehen: Nachfrage und Angebot in der Region / H2: FAQ / CTA

### R11 – Ohne Makler
- H1: Eigentumswohnung ohne Makler verkaufen: Was Sie wirklich sparen, was Sie riskieren – und ein Hybrid-Angebot
- H2: In Kürze / H2: Die ehrliche Rechnung (nur Ihre Provisionshälfte) / H2: Kosten und Zeit des Privatverkaufs (Tabellen) / H2: Die 9 Schritte – mit ETW-Besonderheiten / H2: Die 10 häufigsten Fehler / H2: Rechtsfallen (§ 444 BGB, Maklerklausel, Energieausweis-Bußgeld) / H2: Hybrid: Einzelleistungen bei Rössler / H2: FAQ / CTA

### R12 – Sofortankauf
- H1: Wohnung sofort verkaufen: Sofortankauf vs. Makler – was Ankäufer zahlen und wie Sie seriöse Anbieter erkennen
- H2: In Kürze / H2: So arbeiten Ankäufer (24-h-Angebote, Weiterverkauf, Klauseln) / H2: Preisabschläge laut Quellen (40–90 %; Vobahome-Beispiel) / H2: Rechenvergleich Leonberg / H2: Wann Tempo wichtiger ist als Preis / H2: Seriositäts-Checkliste / H2: Schneller Maklerverkauf als Alternative / H2: FAQ / CTA

## A7. Wettbewerber-Matrix (alle ausgewerteten Ranking-Seiten)

| Seite | Typ | Wörter | FAQ | FAQPage-Schema | Autor | Datum | Lokalbezug | WEG-Tiefe |
|---|---|---|---|---|---|---|---|---|
| anwalt.org Wohnung verkaufen | R | 1.400 | ja | nein (Q/A einzeln) | ja (RA) | 07/2026 | nein | gering |
| reduco.ai Wohnung verkaufen | D | 6.900 | ja | ja | ja | 08/2026 | nein | hoch |
| IS24 Wohnung verkaufen | P | 3.400 | ja | ja | ja | 01/2026 | nein | mittel |
| Homeday Wohnung verkaufen | M | 4.000 | ja | nein | nein | – | nein | mittel |
| IS24 Vermietete Wohnung | P | 3.100 | ja | nein | ja | 08/2026 | nein | mittel |
| deutschesmietrecht Umwandlung | R/V | 1.700 | nein | nein | nein | – | nein | – |
| immoportal Kapitalanlage | P | 1.500 | ja | nein | nein | – | nein | gering |
| IS24 Geerbtes Haus | P | 2.600 | ja | ja | Redaktion | 08/2026 | nein | nein |
| wohnglück Geerbtes Haus | P | 3.600 | ja | nein | Firma | – | nein | nein |
| immoportal Geerbtes Haus | P | 2.200 | ja | ja | nein | – | nein | nein |
| aroundhome Geerbtes Haus | P | 2.500 | ja | ja | Redaktion | 09/2026 | nein | nein |
| Finanztip Erbschaftssteuer | V | 3.800 | nein | nein | ja | 08/2026 | nein | nein |
| IS24 Scheidung Erlös | P | 1.000 | nein | nein | Redaktion | 08/2026 | nein | nein |
| Homeday Scheidung | M | 3.300 | ja | nein | nein | – | nein | nein |
| Hasselbach Teilungsversteigerung | R | 2.900 | nein | nein | Kanzlei | 05/2024 | Standorte | nein |
| Finanztip Spekulationssteuer | V | 3.600 | nein | nein | ja | 07/2026 | nein | nein |
| IS24 Spekulationssteuer | P | 3.100 | ja | ja | ja | 09/2026 | nein | nein |
| steuertipps Spekulationssteuer | S | 1.400 | ja | nein | nein | – | nein | nein |
| Dr. Klein Spekulationssteuer | S | 1.000 | nein | nein | ja | 08/2024 | nein | nein |
| IS24 Maklerprovision | P | 2.600 | ja | ja | ja | 09/2026 | Bundesland-Rechner | nein |
| Homeday Maklerprovision | M | 3.700 | ja | nein | nein | – | Bundesland-Tabelle | nein |
| immoverkauf24 Maklerprovision | P | 3.700 | ja | ja | ja | 07/2026 | Bundesland-Tabelle | nein |
| IHK Maklerrecht | V | 1.200 | nein | nein | nein | – | nein | nein |
| VZ Energieausweis | V | 2.500 | nein | nein | nein | 08/2026 | nein | gering |
| reduco Energieausweis ETW | D | 1.900 | ja | ja | ja | 08/2026 | nein | hoch |
| Homeday Wohnungsbewertung | M | 5.200 | ja | nein | nein | – | nein | mittel |
| immoportal Wertermittlung ETW | P | 4.900 | nein | nein | nein | – | nein | mittel |
| immoverkauf24 Wohnungsbewertung | P | 3.100 | ja | ja | ja | 07/2026 | nein | gering |
| IS24 Wertermittlung | P | 2.700 | ja | ja | nein | – | nein | nein |
| IS24 Verkaufen oder vermieten | P | 3.400 | ja | ja | ja | 10/2026 | nein | nein |
| reduco Wohnen bleiben | D | 6.500 | ja | ja | ja | 08/2026 | nein | nein |
| VZ Leibrente | V | 2.600 | nein | nein | nein | 12/2024 | nein | nein |
| immo.info Teilverkauf | V | 3.500 | nein | nein | ja | 10/2026 | nein | nein |
| IS24 Pflegefall | P | 4.000 | ja | nein | ja | 08/2023 | nein | nein |
| Homeday Ohne Makler | M | 3.400 | ja | nein | nein | – | nein | nein |
| reduco Ohne Makler | D | 5.400 | ja | ja | ja | 08/2026 | nein | gering |
| bodenrichtwerte-deutschland Ohne Makler | D | 3.000 | ja | nein | nein | 2026 | nein | nein |
| immostage Strategien | D | 2.000 | ja | ja | ja | 2025 | nein | nein |
| von Poll Leonberg | M | 1.800 | ja | nein | nein | – | ja (Objekte) | nein |
| Gäu Immobilien Start | M | 1.000 | nein | nein | nein | 10/2026 | ja (Renningen) | nein |

Ableitung: Zielwerte für Rössler-Ratgeber: 2.500–4.500 Wörter, FAQ mit FAQPage-Schema, Autorenbox, Datum, mindestens ein lokaler Zahlenblock, WEG-Tiefe „hoch“ – damit wäre jede Seite in mindestens zwei Spalten (Lokalbezug, WEG-Tiefe) allein im Feld.

