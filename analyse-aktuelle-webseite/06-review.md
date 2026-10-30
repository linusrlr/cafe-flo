# Review der Textentwürfe: Lektorat und Fachprüfung

Stand: 30. Oktober 2026. Geprüft: `texte/*.md` (22 Entwürfe), `content-briefings/*.md`, `analyse-aktuelle-webseite/*.md`, `README.md`, `radar/README.md`. Nicht geprüft: `recherche/` (Rohdaten). Vorgehen: Prüfung per Skript (grep, Python), gezielte Lektüre der Fundstellen, Abgleich mit dem Live-HTML (Abschnitte `v-ankauf` und `v-verkaufen`).

## (a) Gefundene und behobene Mängel

### 1. URLs und Slugs

| Datei | Problem | Korrektur |
|---|---|---|
| texte/ratgeber-verkauf-im-alter.md | frontmatter-url `/ratgeber/wohnung-verkaufen-im-alter/`, ebenso PDF-Pfad | `/ratgeber/verkauf-im-alter/` (url und PDF-Pfad) |
| texte/ort-leonberg.md | Link auf nicht geplante Seite `/ratgeber/wohnungsbewertung/` | `/wohnung-bewerten/` |
| texte/ratgeber-wohnung-scheidung.md | Checkliste als Unterseite `/ratgeber/wohnung-scheidung/checkliste/`, alle anderen Downloads sind `.pdf` | `/ratgeber/wohnung-scheidung/checkliste.pdf` |
| content-briefings/19-verkauf-im-alter.md | URL (geplant) `/ratgeber/wohnung-verkaufen-im-alter/` | `/ratgeber/verkauf-im-alter/` |
| content-briefings/20-ohne-makler.md | URL (geplant) `/ratgeber/wohnung-ohne-makler-verkaufen/` | `/ratgeber/ohne-makler-verkaufen/` |
| content-briefings/21-sofortankauf-vs-makler.md | URL (geplant) `/ratgeber/sofortankauf-oder-makler/` | `/ratgeber/sofortankauf-vs-makler/` |
| analyse-aktuelle-webseite/04-seitenplan.md | Keine verbindliche Slug-Liste; „12 Ratgeber“ unter `/ratgeber/<slug>/`, obwohl R-08 auf `/wohnung-bewerten/` liegt | Slug-Tabelle R-01 bis R-12 mit Textdatei ergänzt; Zielstruktur auf „11 Ratgeber, R-08 unter /wohnung-bewerten/“ korrigiert |

Prüfung danach per Skript: Alle internen Links in `texte/` zeigen auf Soll-URLs aus `04-seitenplan.md` (Ausnahme: acht PDF-Downloads, siehe b).

### 2. Widersprüchliche Fakten

| Datei | Problem | Korrektur |
|---|---|---|
| texte/ueber-mich.md | Zusage 5 hatte einen Zusatzsatz („Auch wenn in einer Woche wenig passiert ist.“), Startseite nicht | Zusagen auf Start und Über mich wortgleich |
| texte/start.md (description) | „kostenlose Ersteinschätzung innerhalb eines Werktags“; überall sonst: Antwort in einem Werktag, schriftliche Ersteinschätzung in zwei Werktagen | „Antwort innerhalb eines Werktags, kostenlose Ersteinschätzung“ |
| texte/ratgeber-spekulationssteuer.md, texte/ratgeber-verkaufen-oder-vermieten.md | Freigrenze als „1.000 €, ein Euro mehr …“ formuliert; Gesetz: steuerfrei nur unter 1.000 € (bei genau 1.000 € steuerpflichtig, so auch im eigenen Abschnitt „Freigrenze“) | „steuerfrei unter 1.000 €, ab 1.000 € ist der ganze Gewinn steuerpflichtig“ |
| 6 Dateien (ort-leonberg, ort-pforzheim, ratgeber-spekulationssteuer, ratgeber-wohnung-scheidung, ratgeber-geerbte-wohnung-verkaufen, ratgeber-vermietete-wohnung-verkaufen) sowie 4 kombinierte Marker (eigentumswohnung-verkaufen, geerbte, maklerprovision, vermietete) | Platzhalter `[LINUS: Telefonnummer]`, obwohl die Nummer auf der Live-Seite und in 14 anderen Entwürfen steht | 0159 05844641 eingesetzt (10 Stellen); Restfragen der Marker (PDF erstellen) bleiben |
| texte/ratgeber-eigentumswohnung-verkaufen.md, texte/ratgeber-energieausweis.md (2×) | `[ZU PRÜFEN]` „eine Quelle nennt den 23. Juli“ zum GModG; Vorgabe und alle übrigen Texte: in Kraft seit 29.07.2026 (BGBl. 2026 I Nr. 226 vom 28.07.2026) | Marker entfernt |

Ohne Befund geprüft: Sperrfrist je Ort (Leonberg, Pforzheim 5 Jahre; Heimsheim, Renningen 3; Ditzingen nicht in der Verordnung mit Mieterbund-Hinweis) in allen Texten und Briefings einheitlich; Mietpreisbremse (Leonberg, Pforzheim ja; Ditzingen, Renningen, Heimsheim nein) einheitlich; Grunderwerbsteuer überall 5 %; GEG nur noch als „ehemals GEG“ oder historisch; Alleinauftrag überall sechs Monate plus drei, vier Wochen Kündigungsfrist.

### 3. Rechenbeispiele

Geprüft per Python: 114 Prozent-Betrag-Paare automatisch, davon rund 45 Rechnungen einzeln nachgerechnet (Provision 2,98 % und 3,57 % für 221.000, 221.250, 230.000, 238.000, 257.400, 275.500, 277.500, 290.000, 292.500, 300.000, 307.500, 310.000, 320.000, 350.000, 365.500 €; Grunderwerbsteuer 5 % für 175.000, 180.000, 221.000, 230.000, 238.000, 250.000, 290.000, 292.500, 320.000, 365.500 €; Nettoerlöse, Zinseszins 2 %/3 % über zehn Jahre, Bruttorenditen, AfA-Rechnungen und Gewinne der Spekulationssteuer-Beispiele, Scheidungs-Tabelle, Ankäufer-Marge, Steuerersparnis 42 % auf 8.642 €, Annuitäten).

| Datei | Problem | Korrektur |
|---|---|---|
| texte/ratgeber-sofortankauf-vs-makler.md | „Bei 400.000 € Kredit steigt die Rate … auf rund 1.790 € bei 4 % und 2 %“: auf 400.000 € wären es 2.000 €; 1.790 € stimmt nur für die Restschuld nach zehn Jahren (rund 358.000 €) | Bezug auf die Restschuld ergänzt |

Alle übrigen geprüften Werte stimmen (z. B. 290.000 → 8.642 €; 292.500 → 8.716,50 €, gerundet 8.717 €; 221.000 → 6.585,80 €; 310.000 → 9.238 €; Gewinn Beispiel Leonberg 68.292 €; Pforzheim 50.099 €).

### 4. Stilregeln

| Datei | Problem | Korrektur |
|---|---|---|
| texte/ort-pforzheim.md | „im besten Verhältnis“ | „in einem günstigen Verhältnis“ |
| texte/ort-leonberg.md | „belegt sie am besten mit“ | „belegt sie mit“ |
| texte/wohnung-bewerten.md | Formularfeld „Beste Rückrufzeit“ | „Bevorzugte Rückrufzeit“ |
| analyse-aktuelle-webseite/03-massnahmen.md | 22 Halbgeviertstriche als Satzzeichen (Titel, 20 Überschriften M1 bis M20, Title-Formel) | Doppelpunkt bzw. Komma; Title-Formel für Ratgeber auf „ \| Rössler Immobilien“ vereinheitlicht |
| content-briefings/30 bis 34 | Halbgeviertstrich in der Überschrift | Klammerform |
| README.md, radar/README.md | Halbgeviertstrich in der Überschrift | Doppelpunkt |

Ohne Befund: keine Em-Dashes und keine Emojis in `texte/`; keine „absolut“, „garantiert“, „einzigartig“, „idyllisch“, „hervorragend“, „in der heutigen Zeit“, „rund um“. Die beiden Em-Dashes in `01-analyse.md` stehen in Zitaten des Live-Titels und bleiben.

### 5. Erlaubnis-Hinweis (höchstens einmal je Seite)

Doppelte Hinweise entfernt in 14 Dateien (15 Stellen): ort-ditzingen, ort-heimsheim, ort-leonberg, ort-pforzheim, ort-renningen (Satz jeweils auf „Die Einschätzung … bekommen Sie sofort“ gekürzt), ratgeber-eigentumswohnung-verkaufen, ratgeber-energieausweis, ratgeber-geerbte-wohnung-verkaufen, ratgeber-maklerprovision (2 Stellen: Schlusshinweis und Abschnitt „Erlaubnis nach § 34c GewO“), ratgeber-verkauf-im-alter, ratgeber-verkaufen-oder-vermieten, ratgeber-vermietete-wohnung-verkaufen, wohnung-bewerten (jeweils Satz im Schlusshinweis gestrichen), ueber-mich (Werdegang-Zeile „Antrag auf die Maklererlaubnis“ gestrichen, Hinweis im Abschnitt Qualifikation bleibt). Jetzt: genau ein Hinweis je Seite. In ratgeber-maklerprovision und ratgeber-sofortankauf-vs-makler bleiben fachliche Erwähnungen von § 34c (Rechtslage), kein zweiter persönlicher Hinweis.

### 6. Erfundenes oder unmarkierte Erfahrung

| Datei | Problem | Korrektur |
|---|---|---|
| texte/ratgeber-energieausweis.md | „Eine Beobachtung aus Besichtigungen: Interessenten lesen den Ausweis selten …“ ohne Marker | `[LINUS: Beobachtung bestätigen oder streichen.]` |
| texte/ort-leonberg.md | „Nach meiner Beobachtung scheitert der Verkauf … am fehlenden Aufzug“ ohne Marker | Marker ergänzt |
| texte/ort-pforzheim.md (2 Stellen) | Beobachtungen zu Käufern und Anteil vermieteter Wohnungen ohne Marker | Marker ergänzt |
| texte/ratgeber-verkaufen-oder-vermieten.md | „Was ich daraus gelernt habe …“ (drei Lehrsätze als Linus' Erfahrung) | Marker präzisiert: Formulierungsvorschlag, bestätigen oder ersetzen |
| texte/wohnung-verkaufen.md | „dauert erfahrungsgemäß am längsten“ (Quelle ist ein Portal, keine eigene Erfahrung) | „dauert meist am längsten“ |

Ohne Befund: keine Bewertungen, Referenzen, Verkaufszahlen oder Kundenstimmen; die „Aus meiner Praxis“-Abschnitte sagen offen, dass es noch keine Referenzen gibt, und tragen `[LINUS]`-Marker.

### 7. Live-Wortlaut Direktankauf und Wohnung verkaufen

| Datei | Problem | Korrektur |
|---|---|---|
| texte/direktankauf.md | Drei Schritte neu formuliert, `[ZU PRÜFEN]` | Wortlaut der Live-Seite eingesetzt („Wohnung vorstellen“, „Objekt prüfen“, „Angebot besprechen“); Ergänzungen (Kurzformular, Einschätzung vor Angebot, Zeitangaben-Marker) als eigener Absatz darunter; Marker entfernt |
| texte/direktankauf.md | „Welche Wohnungen infrage kommen“ abweichend (u. a. Region ohne „und direkte Umgebung“) | Zeilen Objektart, Region, Zustand wörtlich; Ergänzungszeilen (Vermietung, Gemeinschaft, Kaufpreis, Anzahl) bleiben; Marker entfernt |
| texte/direktankauf.md | Vergleichstabelle ohne die drei Live-Zeilen | Zeilen Käufer, Vermarktung, Provision wörtlich übernommen, ersetzen „Wer kauft“, „Provision für Sie“, „Inserat“ |
| texte/direktankauf.md | Vier Live-FAQ fehlten, `[ZU PRÜFEN]` | Vier Fragen wörtlich vorangestellt; doppelte Ergänzungsfrage „Zahle ich beim Direktankauf Provision?“ gestrichen; Marker entfernt |
| texte/direktankauf.md | „In welcher Rolle ich stehe“: Live-Satz zur Vorstellung anderer Investoren fehlte | Satz ergänzt |
| texte/wohnung-verkaufen.md | Zehn FAQ mit Live-HTML verglichen: wortgleich bis auf zwei ersetzte Gedankenstriche (dokumentiert) und eine Ergänzung bei „Wie lange dauert ein Verkauf?“; „am besten“ war durch Punkt 4 kurz entfernt worden | „am besten“ als Live-Wortlaut wiederhergestellt; Kommentar um die Ergänzung und das Abgleichdatum erweitert |

### 8. Analyse-Dokumente und README

| Datei | Problem | Korrektur |
|---|---|---|
| 04-seitenplan.md | Briefings „01-start (folgt)“, „02-wohnung-verkaufen (folgt)“, „05-ueber-mich (folgt)“, „06-kontakt (folgt)“ veraltet; Texte existieren | „kein eigenes Briefing; Text texte/…“ |
| 03-massnahmen.md (M9) | Kein Hinweis, dass Textentwürfe vorliegen | Status ergänzt (22 Entwürfe, Verweis auf 06-review.md) |
| analyse-aktuelle-webseite/README.md | 06-review fehlte; texte/ ohne Umfang | Zeile 06-review ergänzt; texte/ mit Umfang beschrieben |
| README.md | Hinweis auf deaktivierte Vercel-Deployments fehlte; texte/ ohne Stand | Abschnitt „Deployment“ (vercel.json, `git.deploymentEnabled.master: false`) und Stand ergänzt |

Push-Probleme oder „texte/ folgt“ fanden sich in den Dokumenten nicht.

**Summe:** 7 Slug-Korrekturen plus Slug-Liste, 17 Faktenangleichungen (davon 10 Telefonnummern), 1 Rechenkorrektur bei rund 45 Nachrechnungen, 34 Stilkorrekturen, 15 entfernte doppelte Erlaubnis-Hinweise, 6 Markierungen oder Umformulierungen bei Erfahrungsbehauptungen, 5 Live-Textblöcke wörtlich eingesetzt (3 `[ZU PRÜFEN]` entfernt), 7 Doku-Aktualisierungen.

## (b) Nicht behobene Mängel

1. **Impressum gegen Texte (rechtlich klären):** Die Live-Seite sagt im Impressum „Bis zur Erteilung werden keine Maklerleistungen erbracht und keine Aufträge angenommen.“ Start, Wohnung verkaufen, Kontakt, Über mich und die Ortsseiten bieten aber „ab sofort“ Ersteinschätzungen und einen schriftlichen Verkaufsplan an. Ob das schon eine erlaubnispflichtige Tätigkeit ist, muss ein Anwalt oder die IHK beantworten; danach Impressum oder Texte angleichen.
2. **Erlaubnisbehörde:** Impressum und ueber-mich nennen die IHK für München und Oberbayern (Sitz Niederlauer, Bayern). Bei einem Sitz in Baden-Württemberg ändert sich die Behörde. Entscheidung Standort offen.
3. **Acht verlinkte PDFs existieren noch nicht** (Checkliste Unterlagen ETW, Checkliste Bewertung, Fahrplan Erben, Checkliste Betreuer, Checkliste Anleger, Checkliste Scheidung, Musterschreiben Energieausweis, Mustervertrag; dazu Checkliste Privatverkauf ohne Link). Links erst nach Erstellung aktivieren.
4. **Ablaufdatum der Landesverordnungen:** KSpVO BW, Mietpreisbegrenzungs- und Kappungsgrenzenverordnung gelten bis 31.12.2026. Fast alle Orts- und Ratgebertexte nennen Fristen „2026“. Im Januar 2027 müssen Tabellen und FAQ aller Orts- und Mietrechtsseiten aktualisiert werden.
5. **Ditzingen-Widerspruch (Mieterbund gegen Gesetzblatt)** ist inhaltlich offen; die Texte behandeln ihn einheitlich, die Klärung fehlt.
6. **Amtsgerichts-Zuständigkeiten widersprüchlich vermutet:** Heimsheim wird in ort-heimsheim mit „Maulbronn oder Pforzheim“, in ratgeber-verkauf-im-alter und ratgeber-geerbte-wohnung-verkaufen mit „Leonberg?“ verknüpft. Erst nach Klärung eine Tabelle veröffentlichen.
7. **R-08 ohne Ratgeber-URL:** Der Bewertungsratgeber steckt in `/wohnung-bewerten/`. Für den Ratgeber-Hub (Rubrik „Verkaufen“) muss die Kachel auf die Lead-Seite zeigen; bewusste Entscheidung, aber im Template 5.1 noch nicht abgebildet.
8. **Sofortankauf-Untergrenze:** Vergleichsrechnung nutzt 60 %, die Quelle nennt 40 %. Inhaltlich zu entscheiden (Marker bleibt).
9. **Gedankenstriche im Live-Wortlaut:** Zwei Live-FAQ enthalten Geviertstriche; in den Entwürfen durch Komma bzw. Punkt ersetzt. Bei wörtlicher Übernahme also minimale Abweichung, bewusst zugunsten der Stilregel.
10. **Briefings mit „(nachrechnen)“** (32, 33, 34): Werte geprüft und korrekt, die Notizen stehen noch im Briefing.

## (c) Fragenkatalog für Linus (alle offenen `[LINUS]`-Punkte, dedupliziert)

### Person, Werdegang, Region
1. Studium Wirtschaftsingenieurwesen: Hochschule, Abschluss, Jahr.
2. Stationen Projektcontrolling und Wohnungsbewertung: Arbeitgeber oder Branche, Zeitraum, Aufgaben, Zahl der bewerteten Wohnungen; Berufsjahre insgesamt.
3. Bezug zur Region in zwei bis vier Sätzen (aufgewachsen, wohnhaft, Familie, Arbeit). Je Ort ein Satz: Heimsheim (wichtigster Satz der Seite), Leonberg, Ditzingen/Hirschlanden/Heimerdingen, Renningen/Malmsheim. Kontakte in der Region?
4. Namensnähe zu Roland Rössle in Heimsheim: Absatz behalten oder streichen? Kennst du ihn?
5. Eigene Wohnung als Fallbeispiel: Ort, Stadtteil, Baujahr, Fläche, Zimmer, Kaufjahr, Kaufpreis (oder €/m²), privat oder über Makler gekauft, Renovierung (was, selbst, Kosten, Dauer), Miete heute, seit wann vermietet, letzte Mieterhöhung (Dauer), Hausgeld umlagefähig und nicht umlagefähig, Rücklagenanteil, Beschlüsse der WEG, Energieausweis der WEG (Art, Jahr, Klasse, Beschaffung), AfA-Satz und Gebäudeanteil laut Steuerbescheid, Zeitaufwand pro Jahr. Darf das anonymisiert auf die Seiten (Über mich, Eigentumswohnung verkaufen, Energieausweis, Spekulationssteuer, Vermietete Wohnung, Verkaufen oder vermieten)?
6. Die drei „Lehrsätze“ als Vermieter (Verkaufen oder vermieten): bestätigen oder ersetzen.
7. Weiterbildungen (Stunden, Anbieter, Jahr), Zertifikate, Mitgliedschaft IVD oder BVFI geplant, Vermögensschadenhaftpflicht nennbar?
8. Fototermin vor Ort planen.

### Erlaubnis, Standort, Erreichbarkeit
9. Bei welcher Behörde ist die Erlaubnis beantragt, wann wird sie erwartet? Nach Erteilung: Datum, Behörde, Nummer eintragen, Vorbehalte auf allen Seiten entfernen.
10. Geschäftsadresse nach Standortentscheidung (NAP-Block Ortsseiten, Kontakt).
11. Erreichbarkeit verbindlich: Wochentage und Uhrzeiten, abends, samstags, sonntags?
12. WhatsApp als Kontaktweg ja/nein; welches Videotool (datenschutzkonform)?
13. Fristen verbindlich: schriftliche Ersteinschätzung „zwei Werktage“ ab Eingang oder ab Telefonat? Verkaufsplan in wie vielen Tagen? Wochentag des Wochenberichts? Höchstzahl gleichzeitiger Mandate?
14. Zusage 4: Finanzierungsnachweis vor der Besichtigung oder erst vor dem Angebot?

### Provision und Vertrag
15. Ist 2,98 % fest oder verhandelbar? Gilt der Satz auch unter 150.000 € (Beispiel 105.000 € → 3.129 €)? Mindestprovision?
16. Modell B (Innenprovision) überhaupt angeboten? Sonst Abschnitt auf Halbteilung kürzen.
17. Einfacher oder qualifizierter Alleinauftrag; Provision, wenn der Verkäufer selbst einen Käufer findet (voll, reduziert, keine)?
18. Aufwandsentschädigung bei Rückzug des Verkäufers: ausgeschlossen oder beziffert?
19. Zahlungsziel nach Beurkundung; getrennte Rechnungen an Verkäufer und Käufer?
20. Provision beim Verkauf an den Mieter reduziert oder 2,98 %?
21. Mustervertrag veröffentlichen? Wer hat ihn geprüft (Anwalt, IHK-Muster)?
22. Bleibt die kostenlose Einschätzung kostenlos, wenn der Eigentümer danach allein verkauft?
23. Einzelleistungen für Privatverkäufer (Festpreise, Besichtigungsservice) und neutrale Wertermittlung gegen Honorar (Erben, Scheidung): angeboten? Preise?
24. Scheidung: Aufträge nur gemeinsam oder auch von einem Partner mit Zustimmung? Regel für Besichtigungen, wenn ein Partner noch dort wohnt?

### Vermarktung und Leistung
25. Fotos selbst oder Fotograf; Home Staging, wer zahlt?
26. Welche Portale, wer trägt die Kosten? Aktuelle Paketpreise für Privatanbieter bekannt?
27. Muster-Verkaufsplan anonymisiert bereitstellen.
28. Dokumentation der Besichtigungen für auswärtige Erben (Fotos, Protokoll, Rhythmus).
29. Vorgemerkte Interessenten oder Käuferkartei: gibt es sie, wie viele (ehrliche Zahl), Kapitalanleger mit Renditegrenzen?
30. Unterlagenbeschaffung: eigenes Angebot oder Pauschale? Tage bis Wochen für den Grundbuchauszug?
31. Eigene Einschätzung der Verkaufsdauer bis Notar in Leonberg und Pforzheim, mit Begründung.

### Direktankauf
32. Bedenkzeit in Tagen (Vorschlag 14) und Bindefrist des Angebots.
33. Zeitangaben: Rückmeldung, Einschätzung, Angebot, Notartermin; schneller ohne Bankfinanzierung?
34. Abschlag-Korridor unter der Maklereinschätzung; darf eine Spanne genannt werden?
35. Finanzierung der Ankäufe (Eigenkapital oder Bank); Obergrenze Kaufpreis; Ankäufe pro Jahr; Steuerberater und Rechtsform (Drei-Objekt-Grenze) geklärt?
36. Laufender Alleinauftrag und anschließender Eigenankauf: keine Provision? Rechtlich prüfen lassen.
37. Die festen Ankaufsregeln einzeln bestätigen; Ankauf auch von Bevollmächtigten oder Betreuern? Schwerpunkt Pforzheim? Formularfeld Pflicht oder vorausgewählt?

### Lokalwissen
38. Wohnanlagen, Baujahre, Hausgeld-Spannen je Ort: Leonberg (Kernstadt, Eltingen, Ramtel, Silberberg), Ditzingen, Hirschlanden (Neubau 2010er), Schöckingen, Heimsheim, Renningen und Malmsheim (Neubau, Hausgeld je m²), Pforzheim-Buckenberg. Markierte Beobachtungen bestätigen oder streichen.
39. Hausverwaltungen je Ort und ihre Bearbeitungszeiten für Protokolle, Wirtschaftsplan, Energieausweis, Verwalterzustimmung; Gebühren.
40. Gutachterausschüsse: Marktberichte angefordert (Leonberg, Enzkreis, Pforzheim, Böblingen, Ludwigsburg)? Kosten? Wer ist für Ditzingen und Renningen zuständig?
41. Amtsgerichte Leonberg und Pforzheim: Zuständigkeit Nachlass und Grundbuch für die fünf Orte; Dauer einer Genehmigung nach § 1850 BGB.
42. Pforzheim: alle 15 Stadtteile oder Schwerpunkt? Fahrzeiten nach Karlsruhe und Stuttgart mit Quelle.
43. Heckengäu: Häuser bewusst mit abdecken?
44. Typische Heizungen und Sanierungsthemen in den Anlagen, Sonderumlagenhöhen; Anlagen mit Aufzug oder Betreutem Wohnen (nur Belegtes).
45. Kennzahlen für Rechner: nicht umlagefähiger Hausgeldanteil (€/m²), Instandhaltung, Mietausfall, Kosten Sondereigentumsverwaltung, Vermietungsdauer, Aufpreis Tiefgaragenplatz, wie Käufer eine gefüllte Rücklage honorieren; Schwellenwert im Rechner prüfen.
46. Häufigste Käuferfragen bei Besichtigungen (wörtlich); Ankäufer-Anfragen auf Inserate erlebt? Anfragen nach Häusern in Heimsheim erlebt?

### Netzwerk (nur ohne Provision)
47. Energieausweis-Aussteller, Entrümpelung, öffentlich bestellter Sachverständiger, Steuerberater (Gegenlesen der Beispiele, Erstgespräch-Konditionen), Familienrechtsanwälte: nennbar?
48. Notar-Formulierungen: Sonderumlagen, Rücklagenanteil, Vorkaufsrecht-Mitteilung oder Verzicht; welcher Notar, nennbar?
49. Musterschreiben Energieausweis und Mustertext Mieterinformation: in wessen Namen, anwaltlich gegengelesen?

### Material, Werkzeuge, Fallbeispiele
50. PDFs erstellen oder Links streichen (siehe b3).
51. Fristenrechner Spekulationssteuer: selbst hosten ohne Cookies oder Widget? Rechner „Verkaufen oder vermieten“: Ergebnis mit Kalenderlink oder Formular?
52. Anonymisierte Fälle, falls vorhanden: Erbfall, Kreditentlassung bei Scheidung, Verkauf im Alter (Treppe, Sonderumlage), Betreuungsgericht, Pendler-Zweitwohnung, Dauer einer Verwalterzustimmung.

## (d) Wichtigste `[ZU PRÜFEN]`-Punkte (dedupliziert)

1. Nachfolgeverordnungen ab 01.01.2027 (KSpVO, Mietpreisbremse, Kappungsgrenze; Entwurf seit 22.09.2026) und Aktualisierung aller Ort- und Mietrechtstabellen.
2. Ditzingen: Mieterbund-Liste gegen Verordnungstext (frühere Verordnung oder Mietpreisbremse gemeint?).
3. Gemeindeliste der Kappungsgrenzenverordnung 2026 identisch mit der Mietpreisbremse-Kulisse?
4. Zuständige Amtsgerichte je Ort (Grundbuch, Nachlass, Betreuung, Familie, Vollstreckung), insbesondere Heimsheim.
5. Zuständige Gutachterausschüsse Ditzingen (LK Ludwigsburg) und Renningen (LK Böblingen); aktuelle Marktberichte (Pforzheim online nur 2021/22).
6. Bodenrichtwerte über BORIS-BW (Leonberg, Ditzingen, Heimsheim, Renningen; Aggregator-Abweichung 732 €/m²).
7. Einwohnerzahlen gegen Statistisches Landesamt (Ditzingen weicht um fast 3.000 ab; Heimsheim, Renningen, Leonberg, Pforzheim).
8. Grundsteuer-B-Hebesätze (Heimsheim 2026, Pforzheim amtlich, Gemeinderatsbeschlüsse 19.05.2026 Leonberg und Renningen).
9. VVS-Fahrzeiten und Takte (S6, S60, Strohgäubahn Heimerdingen).
10. GModG: Paragrafen in der verkündeten Fassung (§§ 80, 87, 88), Bußgeldbeträge, Kennwert für Verbrauchsausweise ab 2027.
11. Energieausweis-Beauftragung durch die Verwaltung ohne Beschluss (§ 27 WEG, Verwaltervertrag) und Normzitat Tagesordnungspunkt anwaltlich prüfen.
12. Wärmeplanung Leonberg (endgültiger Beschluss) und Pforzheim/SWP (Fernwärme je Stadtteil).
13. KfW 308 und KfW-Zinsen am Veröffentlichungstag; BEG-Fördersätze im Merkblatt.
14. GREIX-Primärquelle statt Sekundärzitat verlinken.
15. Maklerumfrage „70 % halten Preise für überhöht“: Urheber und Stichprobe unklar, sonst streichen (mehrere Seiten).
16. BGH- und BFH-Volltexte: V ZR 257/16, V ZR 209/12, V ZR 190/24, I ZR 138/24, BFH IX R 11/23, BFH zur Instandhaltungsrücklage, weitere nur nach Kanzleimeldung zitierte Urteile.
17. Alleinauftrag „üblich höchstens sechs Monate“: BGH-Rechtsprechung zu AGB-Laufzeiten.
18. § 34c Abs. 2a GewO (Weiterbildung) Wortlaut; Novelle vom 11.06.2026: Bundesrat, Verkündung, Inkrafttreten.
19. Erlaubnisbehörde nach Standortentscheidung (IHK München oder Behörde in Baden-Württemberg).
20. GwG-Pflichten beim Eigenankauf (Käufer, nicht Vermittler).
21. Sofortankauf: Untergrenze 60 % gegen Quelle 40 %; Annahmen aus dem Briefing ohne Beleg; immopaka-Tabelle; Vobahome-Status 2026.
22. Einzelleistungen für Privatverkäufer: Rechtsform anwaltlich prüfen (keine Provisionsfolge nach §§ 656a bis 656d BGB).
23. Spekulationssteuer: Gesetzgebungsstand (BR-Drs. 507/26(B)), AfA-Satz und Gebäudeanteil, Soli und Kirchensteuer im Beispiel, BMF-Schreiben 26.03.2004, § 7 EStG.
24. Scheidung: § 3 Nr. 4 und 5 GrEStG, § 85a ZVG, GKG-Gebühren für 290.000 €, § 1361b Abs. 3 BGB, BT-Drs. 21/6807, BR-Drs. 447/26(B).
25. Erbe: Inkrafttreten Mietrechtspaket II, KV 14110 GNotKG, Fristen der Grundbuchberichtigung, „rund 150 m²“ nicht übernehmen.
26. Verkauf im Alter: Leistungsbeträge 2026 (ImmoScout24 nennt veraltete 5.000 €), Praxis der Sozialämter, Pflegestützpunkte und Landratsämter, BGH-Aktenzeichen, Betreuungsgerichte.
27. Vermietete Wohnung: lokaler Abschlag für vermietete Wohnungen (bisher nur Stuttgart), Mietspiegel Leonberg, Vergleichsmiete der konkreten Wohnung statt Durchschnitt (Pforzheim).
28. GNotKG-Beträge für Notar, Grundbuch und Grundschuldlöschung gegenrechnen.
29. Kreistyp-Zuordnung Landkreis Böblingen und Stadtkreis Pforzheim (Preisindex).
30. Beschäftigtenzahlen der Arbeitgeber je Standort (Bosch Renningen nur Factsheet 2018).
31. immoportal Heimsheim: Stichtags- und Jahreswert gemischt? Angebotszahlen für Heimsheim, Renningen, Ditzingen notieren.
32. Heimsheim: Schleglerschloss, Fachwerkkern, Sanierungsgebiet vor Nennung prüfen.
33. Renningen und Malmsheim: Neubauprojekte 2024 bis 2026 (Bauträger, Einheiten, Preise) als Beleg für die Neubau-Erklärung.
34. Inserat- und Projekt-URLs mit Datum nachtragen (Ditzingen, Heimsheim, Pforzheim).
35. Pforzheim: IS24-Regionalseite, Studierendenzahl der Hochschule.
36. Energieausweis-Primärquellen bei Immowelt und ImmoScout24.
37. Wohnung bewerten: Pressemeldungen und Vergleiche im Volltext prüfen, Zahlen vor Veröffentlichung abgleichen.
38. Ohne Makler: Preise privater Inserate 2026; „3 bis 6 Monate Vorlauf“ für Gemeinschaftsbeschluss ohne Quelle.
39. Verbraucherzentrale BW: Preis der Vertragsprüfung.
40. Kappungsgrenze Renningen 20 % und Leonberg 15 % gegen die Gemeindeliste abgleichen (hängt an Punkt 3).
