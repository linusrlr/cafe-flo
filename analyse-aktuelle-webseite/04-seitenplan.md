# Seitenplan: Welche Seiten entstehen, in welcher Reihenfolge, nach welchem Muster

Stand: 30. Oktober 2026. Abgeleitet aus `02-wettbewerb.md`, den Themen-Benchmarks in `../recherche/themen-und-lokal.md`, den Blueprints in `../recherche/muenchen.md` (Abschnitt „Übertrag auf Rössler“), `../recherche/staedte.md` (Abschnitt 12) und `../recherche/national.md` (Abschnitt 10). Für jede Seite existiert oder entsteht ein Briefing unter `../content-briefings/`; Textentwürfe kommen nach `../texte/`.

---

## 1. Prinzipien

1. **Wenige Seiten mit Substanz statt vieler Templates.** 5 Ortsseiten, 12 Ratgeber (R-08 als Lead-Seite `/wohnung-bewerten/`), 6 Leistungs- und Personenseiten im ersten Jahr. Keine Straßen- oder PLZ-Seiten, keine Glossare, keine News.
2. **Jede Seite hat einen Anlass, einen Beweis und einen nächsten Schritt.** Anlass = Lebenssituation oder Frage; Beweis = Zahl mit Quelle, Beispiel, Referenz; nächster Schritt = Einschätzung anfordern, anrufen, Direktankauf prüfen.
3. **Eigentumswohnung ist das Thema jeder Seite.** Haus-Themen kommen nur als Abgrenzung vor.
4. **Fakten nur mit Quelle und Stand.** Rechtsgrundlagen mit Paragraf, Marktzahlen mit Portal/Stichtag, Prüfpunkte sichtbar markiert, bis sie geklärt sind.
5. **Ich-Form.** Linus spricht; „wir“ nur, wenn Linus und der Eigentümer gemeinsam handeln.
6. **Kein Text ohne Linus.** Jede Seite enthält mindestens eine eigene Beobachtung aus seiner Praxis (die Briefings fragen sie in Abschnitt 7 ab).

## 2. Zielstruktur

```
/                                   Start
/wohnung-verkaufen/                 Leistung: Vermittlung (Hub)
/wohnung-verkaufen/leonberg/        Ortsseite
/wohnung-verkaufen/pforzheim/       Ortsseite
/wohnung-verkaufen/heimsheim/       Ortsseite (inkl. Heckengäu)
/wohnung-verkaufen/ditzingen/       Ortsseite
/wohnung-verkaufen/renningen/       Ortsseite (inkl. Malmsheim)
/direktankauf/                      Leistung: Ankauf (mit Entscheidungshilfe Sofortankauf vs. Makler)
/wohnung-bewerten/                  Lead-Seite mit mehrstufigem Formular
/wohnung-bewerten/danke/            Bestätigung (noindex)
/ratgeber/                          Hub mit vier Rubriken
/ratgeber/<slug>/                   11 Ratgeber (Slugs unten; R-08 liegt unter /wohnung-bewerten/)
/ueber-mich/                        Person, Werdegang, Arbeitsweise, Zusagen
/kontakt/                           Telefon, Formular, Erreichbarkeit, Rückrufwunsch
/impressum/  /datenschutz/  /widerruf/   Pflichtseiten (Widerrufsbelehrung Maklervertrag als eigene Seite)
```

Verbindliche Slugs der Ratgeber (Stand Oktober 2026, in allen Texten unter `texte/` so verlinkt):

| Nr. | URL | Textdatei |
|---|---|---|
| R-01 | `/ratgeber/eigentumswohnung-verkaufen/` | texte/ratgeber-eigentumswohnung-verkaufen.md |
| R-02 | `/ratgeber/vermietete-wohnung-verkaufen/` | texte/ratgeber-vermietete-wohnung-verkaufen.md |
| R-03 | `/ratgeber/geerbte-wohnung-verkaufen/` | texte/ratgeber-geerbte-wohnung-verkaufen.md |
| R-04 | `/ratgeber/wohnung-scheidung/` | texte/ratgeber-wohnung-scheidung.md |
| R-05 | `/ratgeber/spekulationssteuer/` | texte/ratgeber-spekulationssteuer.md |
| R-06 | `/ratgeber/maklerprovision/` | texte/ratgeber-maklerprovision.md |
| R-07 | `/ratgeber/energieausweis/` | texte/ratgeber-energieausweis.md |
| R-08 | `/wohnung-bewerten/` (Bewertungsratgeber ist in die Lead-Seite integriert, kein eigener Ratgeber-Slug) | texte/wohnung-bewerten.md |
| R-09 | `/ratgeber/verkaufen-oder-vermieten/` | texte/ratgeber-verkaufen-oder-vermieten.md |
| R-10 | `/ratgeber/verkauf-im-alter/` | texte/ratgeber-verkauf-im-alter.md |
| R-11 | `/ratgeber/ohne-makler-verkaufen/` | texte/ratgeber-ohne-makler.md |
| R-12 | `/ratgeber/sofortankauf-vs-makler/` | texte/ratgeber-sofortankauf-vs-makler.md |

Ortsseiten: `/wohnung-verkaufen/<ort>/` mit `leonberg`, `pforzheim`, `heimsheim`, `ditzingen`, `renningen`.

Navigation (Desktop, 6 Punkte): Wohnung verkaufen · Wohnung bewerten · Direktankauf · Ratgeber · Über mich · Kontakt, dazu Telefonnummer. Mobil zusätzlich Telefon-Icon dauerhaft.

Footer: NAP, Einzugsgebiet mit fünf Ortslinks, Ratgeber-Rubriken, Impressum/Datenschutz/Widerruf, „Stand“ der Marktdaten.

## 3. Seitenliste mit Priorität

| Nr. | Seite | Briefing | Priorität | Welle |
|---|---|---|---|---|
| S-01 | Start (Umbau: Hero mobil, „Was führt Sie zu mir?“-Kacheln, Zusagen, Orte, Ratgeber-Teaser, FAQ) | kein eigenes Briefing; Text `texte/start.md` | Hoch | 1 |
| S-02 | Wohnung verkaufen (Hub: Ablauf, Verkaufsplan, Provision, Unterlagen, FAQ, Lebenssituationen) | kein eigenes Briefing, Basis 10; Text `texte/wohnung-verkaufen.md` | Hoch | 1 |
| S-03 | Wohnung bewerten (Funnel) | 17-wohnungsbewertung | Hoch | 1 |
| S-04 | Direktankauf (Umbau) | 21-sofortankauf-vs-makler | Hoch | 1 |
| S-05 | Über mich (Ausbau) | kein eigenes Briefing; Text `texte/ueber-mich.md` | Hoch | 1 |
| S-06 | Kontakt (Erreichbarkeit, Rückruf) | kein eigenes Briefing; Text `texte/kontakt.md` | Hoch | 1 |
| O-01 | Ortsseite Leonberg | 30 | Hoch | 2 |
| O-02 | Ortsseite Pforzheim | 31 | Hoch | 2 |
| O-03 | Ortsseite Heimsheim | 32 | Mittel | 2 |
| O-04 | Ortsseite Ditzingen | 33 | Mittel | 3 |
| O-05 | Ortsseite Renningen | 34 | Mittel | 3 |
| R-01 | Eigentumswohnung verkaufen: Ablauf, Unterlagen, Kosten | 10 | Hoch | 2 |
| R-02 | Vermietete Wohnung verkaufen | 11 | Hoch | 2 |
| R-03 | Geerbte Wohnung verkaufen | 12 | Hoch | 2 |
| R-04 | Wohnung bei Scheidung/Trennung | 13 | Hoch | 3 |
| R-05 | Spekulationssteuer bei der Eigentumswohnung | 14 | Hoch | 3 |
| R-06 | Maklerprovision in Baden-Württemberg | 15 | Hoch | 2 |
| R-07 | Energieausweis bei der Eigentumswohnung | 16 | Mittel | 3 |
| R-08 | Was ist meine Wohnung wert? (Bewertung, Preisfaktoren) | 17 | Hoch | 2 |
| R-09 | Verkaufen oder vermieten? | 18 | Mittel | 3 |
| R-10 | Wohnung verkaufen im Alter / Pflegefall / Wohnrecht | 19 | Mittel | 4 |
| R-11 | Ohne Makler verkaufen (ehrliche Rechnung, Hybrid-Angebot) | 20 | Mittel | 4 |
| R-12 | Sofortankauf vs. Makler | 21 | Mittel | 3 |

Wellen: 1 = Umbau der bestehenden Seiten (Sessions 1–3 aus `03-massnahmen.md`), 2 = erste Inhalte mit höchster Nachfrage und lokaler Lücke, 3 und 4 = Ausbau. Je Session 3 bis 4 Seiten.

Später (Jahr 2, nur bei Bedarf): Verwalterzustimmung, Hausgeld/Rücklage/Sonderumlage, Teilungserklärung lesen, Verkauf trotz laufendem Kredit, Wohnung in der Familie verkaufen/verschenken, Notartermin und Übergabe, Angebotspreis festlegen, Checkliste Unterlagen als PDF-Lead-Magnet. Diese Themen haben laut Zählung die geringste Konkurrenz; sie können auch als Abschnitte in R-01 beginnen und später ausgegliedert werden.

## 4. Ratgeber-Rubriken (Hub `/ratgeber/`)

1. **Verkaufen** (R-01, R-06, R-08, R-11, R-12)
2. **Lebenssituationen** (R-02, R-03, R-04, R-10)
3. **Recht und Steuern** (R-05, R-07)
4. **Entscheiden** (R-09, Direktankauf-Entscheidungshilfe)

Jede Ortsseite verlinkt kontextuell auf 4 bis 6 Ratgeber (Sperrfrist → R-02, Energieausweis → R-07, Preise → R-08, Provision → R-06); jeder Ratgeber hat einen Block „Vor Ort“ mit Links zu den Ortsseiten.

## 5. Seiten-Templates

### 5.1 Ratgeber (RIEDEL + Engel & Völkers + Finanztip kombiniert)
1. H1 mit Objektart und Region; darunter Datum „Stand“, „zuletzt geprüft“, Lesezeit, Autorenbox (Foto, Linus Rössler, § 34c, Spezialisierung).
2. „Das Wichtigste in Kürze“ (3–5 Punkte mit Zahlen).
3. Inhaltsverzeichnis (Sprungmarken).
4. 6–9 H2, davon mindestens drei als Frage formuliert; Paragrafen zitiert; eine Tabelle oder ein Rechenbeispiel mit regionalen Werten; ein Abschnitt „Was bei Eigentumswohnungen anders ist“.
5. Zwischen-CTA nach dem dritten H2 („Wohnung kostenlos einschätzen lassen“), End-CTA mit Telefon.
6. „Aus meiner Praxis“: 1–2 anonymisierte Fälle (erst wenn vorhanden; sonst Beobachtung aus Besichtigungen).
7. FAQ mit 5–7 Fragen (FAQPage-Schema).
8. Hinweis: keine Rechts- oder Steuerberatung, Verweis auf Steuerberater/Anwalt.
9. „Vor Ort“: Links zu den Ortsseiten; „Weiterführend“: 3–5 Ratgeber.
10. Quellenliste (Gesetze, Urteile, Portale mit Stichtag).
Umfang: 2.000–3.500 Wörter. Keine Emojis, keine Jahreszahl in der URL, Jahreszahl im Title erlaubt und jährlich zu pflegen.

### 5.2 Ortsseite (PORTIMMO Leonberg + AusBlick + Von Poll)
Siehe Briefings 30–34, Abschnitt 4. Kurzform: H1 „Wohnung verkaufen in <Ort>“ → Intro mit Ortsbezug → Markt-Tabelle mit 3–5 Quellen und Stand → Stadtteile aus Verkäufersicht → Besonderheiten (Sperrfrist, Grunderwerbsteuer, WEG) → Wer kauft → So verkaufe ich → Verkäufe/Stimmen (nur echt) → lokale FAQ → CTA, NAP, Nachbarorte, Quellen. 1.500–2.800 Wörter. Veröffentlichung erst, wenn pro Ort mindestens drei geprüfte Marktzahlen, ein lokaler WEG-Absatz und ein lokales FAQ vorhanden sind.

### 5.3 Leistungsseite „Wohnung verkaufen“
Vorteile in drei Sätzen → „Was führt Sie zu mir?“ (Kacheln: geerbt, Trennung, vermietet, Umzug/Alter, WEG-Ärger, laufender Kredit) → Ablauf in 7 Schritten (bestehender Text, je Schritt eine Leistung) → Verkaufsplan mit Muster-PDF → Provision mit Beispiel → Unterlagen (Liste mit „wer hat es“) → Tabelle „privat vs. mit Rössler“ (ehrlich, inkl. Nachteile) → Referenzen (sobald vorhanden) → FAQ (bestehende 10 Fragen, ergänzt um „Ich wohne nicht in der Region“, „Verkaufen Sie diskret?“) → CTA.

### 5.4 Bewertungs-Funnel „Wohnung bewerten“
Schrittfolge nach Engel-&-Völkers-Blueprint, angepasst: (1) Ort/Straße (ohne Hausnummer erlaubt), (2) Wohnfläche mit Definition, Zimmer, Etage, Aufzug, Balkon/Stellplatz, Baujahr, (3) Zustand (3 Stufen), vermietet/frei (+ Miete, Hausgeld), Zeitpunkt (sofort / 6 Monate / orientieren), Anlass (optional: Erbe, Trennung, Umzug, Anlage auflösen), (4) Name, E-Mail oder Telefon, Rückrufzeit. Fortschrittsanzeige, ein Thema pro Schritt, Vertrauenszeile („persönlich geprüft, schriftlich innerhalb von zwei Werktagen, kostenlos, keine Weitergabe“). Kein automatischer Sofortwert; stattdessen Erklärung, warum die Spanne von Linus kommt (Hausgeld, Rücklage, Sonderumlage lassen sich nicht automatisch bewerten). Danke-Seite mit drei nächsten Schritten.

### 5.5 Über mich
Portrait am echten Ort (Leonberg oder Heimsheim) → drei Grundsätze (AusBlick-Muster) → Werdegang mit Stationen und Jahren → die eigene Wohnung als Fallbeispiel mit Zahlen → Bezug zur Region (Offene Frage aus Briefing 32) → „Was ich nicht mache“ (Häuser nur mit Einschränkung, keine Steuer-/Rechtsberatung, kein Massengeschäft) → Qualifikationen und Erlaubnis → fünf prüfbare Zusagen (Antwort binnen eines Werktags, schriftlicher Verkaufsplan, Provision nur bei Notarvertrag, Einzelbesichtigungen mit Finanzierungsnachweis, wöchentlicher Stand) → CTA.

### 5.6 Direktankauf
Struktur nach PORTIMMO: Wann sinnvoll (4 Situationen) → 3 Schritte (bestehend) → ehrliche Preis-Einordnung mit Rechenvergleich zu Vermittlung → Ankaufsprofil (ETW, Region, Zustand) → Kurzformular (Ort, Baujahr, Wohnfläche, Etage, Zustand, Miete/Hausgeld, Zeitpunkt, optional Fotos) → „In welcher Rolle ich stehe“ (bestehend, nach oben) → FAQ (bestehend) → Verkaufsweg-Wahl „Vermittlung / Direktankauf / noch unsicher“.

## 6. Pflichtbausteine auf jeder Seite
- Title-Muster und Meta-Description nach `recherche/themen-und-lokal.md` B3.5.
- JSON-LD: RealEstateAgent per `@id` referenziert, BreadcrumbList, auf Ratgebern Article, auf FAQ-Seiten FAQPage, auf Ortsseiten WebPage mit `about` City.
- Autorenbox und „Stand“ auf allen Inhaltsseiten.
- CTA-Block mit Telefon, Formular-Link und Antwortzusage.
- Footer mit NAP und Widerrufs-Link.

## 7. Messbare Ziele je Welle
- Welle 1: alle sechs Seiten live, Lighthouse mobil ≥ 90, erste Anfragen über `/wohnung-bewerten/`.
- Welle 2: Ortsseiten Leonberg und Pforzheim plus R-01, R-02, R-03, R-06, R-08 live; Search Console zeigt Impressionen für „wohnung verkaufen leonberg“.
- Welle 3–4: restliche Seiten; monatliche Pflege nach Radar-Digest.
