---
url: /wohnung-bewerten/
title: Wohnung bewerten lassen: Leonberg, Ditzingen, Pforzheim
description: Was ist Ihre Eigentumswohnung wert? Schriftliche Einschätzung mit Preisspanne und Begründung, mit Vergleichswerten und WEG-Prüfung. Quadratmeterpreise für fünf Orte, Stand 2026.
stand: Oktober 2026
status: Entwurf, nicht veröffentlicht
---

<!-- Umsetzung: Diese Datei hat zwei Teile. Teil A ist die Lead-Seite mit dem vierstufigen Formular direkt unter der H1 (Formular als Spezifikation, nicht als Fließtext). Teil B ist der Ratgeber-Abschnitt darunter. JSON-LD: Service/Offer für die kostenlose Einschätzung, Article für Teil B, FAQPage für beide FAQ-Blöcke, BreadcrumbList; kein aggregateRating. Formular serverseitig (kontakt.php erweitern), Danke-Seite /wohnung-bewerten/danke/ mit noindex und serverseitiger Zählung, Bestätigungs-E-Mail. Kein Cookie-Banner nötig. Update-Trigger: Preistabelle quartalsweise, Zinsen monatlich (15.), vdp Q3 Mitte November 2026, Destatis Q3 Mitte Dezember 2026. -->

# Was ist meine Eigentumswohnung wert? Bewertung in Leonberg, Heimsheim, Ditzingen, Renningen und Pforzheim

*Stand: Oktober 2026 · Von Linus Rössler, Immobilienmakler für Eigentumswohnungen (Erlaubnis nach § 34c GewO beantragt)*

<!-- ===================== TEIL A: LEAD-SEITE ===================== -->

Sie erhalten von mir innerhalb von zwei Werktagen eine schriftliche Ersteinschätzung: eine Preisspanne mit Begründung, nicht eine Zahl aus einem Rechner. Dafür schaue ich mir Ihre Angaben, die aktuellen Vergleichswerte und die Besonderheiten Ihres Gebäudes an und rufe Sie einmal kurz an, wenn eine Angabe fehlt. [LINUS: Gilt die Zusage „zwei Werktage“ ab Eingang der Anfrage oder ab dem Telefonat? Bitte verbindlich festlegen.]

Was danach nicht passiert: keine Weitergabe Ihrer Daten an Portale oder andere Makler, kein Vertrag, keine Anrufe, die Sie nicht wollten. Was Sie entscheiden: ob wir uns die Wohnung gemeinsam ansehen und ob daraus ein Verkaufsplan wird.

**Persönlich geprüft · schriftlich innerhalb von zwei Werktagen · kostenlos · keine Weitergabe**

### Formular „Wohnung kostenlos einschätzen lassen“ (Spezifikation)

<!-- Vier Schritte, ein Thema pro Schritt, Fortschrittsanzeige „Schritt 1 von 4“. Pflichtfelder nur in Schritt 1 (Ort) und Schritt 4 (Name, ein Kontaktweg). Alle anderen Felder optional; fehlende Angaben erfrage ich im Telefonat. Keine versteckte Newsletter-Einwilligung. Mobile Tastatur: inputmode="numeric" für Zahlenfelder. Honeypot und JS-Marker wie auf der Live-Seite beibehalten. -->

**Schritt 1 von 4: Wo liegt die Wohnung?**
Microcopy über dem Schritt: „Vier kurze Schritte, etwa zwei Minuten. Sie können jederzeit abbrechen; gespeichert wird erst beim Absenden.“

| Feld | Typ | Optionen | Pflicht | Hilfetext |
|---|---|---|---|---|
| Ort | Auswahl | Leonberg, Heimsheim, Ditzingen, Renningen, Pforzheim, anderer Ort (Freitext erscheint) | Pflicht | „Ich arbeite in diesen fünf Orten. Liegt die Wohnung anderswo, sage ich Ihnen ehrlich, ob ich helfen kann.“ |
| Stadtteil oder Ortsteil | Text | frei, zum Beispiel Ramtel, Hirschlanden, Malmsheim, Buckenberg | optional | „Hilft bei den Vergleichswerten. Pforzheim hat 14 Stadtteile mit unterschiedlichen Preisen.“ |
| Straße | Text | frei | optional | „Ohne Hausnummer reicht. Die Adresse brauche ich erst, wenn wir uns treffen.“ |

Button: „Weiter zur Wohnung“

**Schritt 2 von 4: Die Wohnung**
Microcopy: „Ungefähre Angaben reichen. Was Sie nicht wissen, lassen Sie frei.“

| Feld | Typ | Optionen | Pflicht | Hilfetext |
|---|---|---|---|---|
| Wohnfläche | Zahl (m²) | | optional | „Wohnfläche laut Kaufvertrag oder Teilungserklärung. Balkon und Terrasse zählen in der Regel nur zu einem Viertel [3]. Keller und Stellplatz zählen nicht.“ |
| Zimmer | Auswahl | 1, 1,5, 2, 2,5, 3, 3,5, 4, 4,5, 5 und mehr | optional | „Halbe Zimmer sind Räume unter 10 m².“ |
| Etage | Auswahl | Untergeschoss/Souterrain, Erdgeschoss, 1. OG, 2. OG, 3. OG, 4. OG und höher, Dachgeschoss | optional | „Erdgeschoss mit Garten und Dachgeschoss mit Terrasse bitte unten bei Außenflächen angeben.“ |
| Aufzug | Auswahl | ja, nein, weiß nicht | optional | „Ab dem dritten Stock ohne Aufzug verändert sich der Käuferkreis.“ |
| Außenflächen | Mehrfachauswahl | Balkon, Loggia, Terrasse, Garten, keine | optional | „Mehrere Angaben möglich.“ |
| Stellplatz | Auswahl | keiner, Außenstellplatz, Carport, Garage, Tiefgarage, mehrere | optional | „Ein Tiefgaragenplatz ist in Leonberg und Ditzingen oft ein eigenes Verkaufsargument.“ |
| Baujahr | Zahl | | optional | „Das Baujahr des Gebäudes, steht im Energieausweis. Ungefähr reicht.“ |

Button: „Weiter zu Zustand und Nutzung“

**Schritt 3 von 4: Zustand, Nutzung, Zeitpunkt**
Microcopy: „Diese Angaben entscheiden über die Spanne mehr als die Lage.“

| Feld | Typ | Optionen | Pflicht | Hilfetext |
|---|---|---|---|---|
| Zustand der Wohnung | Auswahl (drei Stufen) | in den letzten zehn Jahren modernisiert (Bad, Böden, Elektrik oder Fenster) / gepflegt, weitgehend Originalzustand / renovierungsbedürftig | optional | „Es gibt keine falsche Antwort. Eine renovierungsbedürftige Wohnung hat andere Käufer, nicht keine.“ |
| Nutzung | Auswahl | selbst bewohnt, vermietet, leer | optional | „Bei vermieteten Wohnungen rechne ich zusätzlich mit der Miete.“ |
| Kaltmiete je Monat | Zahl (€) | erscheint nur bei „vermietet“ | optional | „Nettokaltmiete ohne Nebenkosten, aus dem Mietvertrag oder der letzten Mieterhöhung.“ |
| Hausgeld je Monat | Zahl (€) | | optional | „Steht im Wirtschaftsplan oder auf dem Kontoauszug. Wichtig, weil Käufer den nicht umlagefähigen Anteil einrechnen.“ |
| Zeitpunkt | Auswahl | möglichst bald / in den nächsten sechs Monaten / zunächst orientieren | optional | „‚Zunächst orientieren‘ ist eine ehrliche Antwort. Dann bekommen Sie die Einschätzung und keinen Anruf alle zwei Wochen.“ |
| Anlass | Auswahl | Verkauf geplant, Wohnung geerbt, Trennung oder Scheidung, Umzug oder Alter, Kapitalanlage auflösen, Direktankauf prüfen, nur orientieren, Sonstiges | optional | „Der Anlass ändert, worauf ich achte: Bei einem Erbfall zum Beispiel auf den Wert fürs Finanzamt, bei einer Trennung auf eine Zahl, die beide prüfen können.“ |

Button: „Weiter zu Ihren Kontaktdaten“

**Schritt 4 von 4: Wie erreiche ich Sie?**
Microcopy: „Letzter Schritt. Name und ein Kontaktweg genügen.“

| Feld | Typ | Optionen | Pflicht | Hilfetext |
|---|---|---|---|---|
| Name | Text | | Pflicht | „Vor- und Nachname, damit ich Sie richtig anspreche.“ |
| E-Mail | E-Mail | | Pflicht, wenn kein Telefon | „Für die schriftliche Einschätzung als PDF.“ |
| Telefon | Telefon | | Pflicht, wenn keine E-Mail | „Für Rückfragen. Ein Anruf, kein Verkaufsgespräch.“ |
| Beste Rückrufzeit | Auswahl | vormittags, nachmittags, abends 18 bis 20 Uhr, samstags, egal | optional | „Ich rufe nur in diesem Fenster an.“ [LINUS: Erreichbarkeit abends und samstags verbindlich?] |
| Nachricht | Textfeld | | optional | „Was ich noch wissen sollte: beschlossene Sonderumlage, geplante Arbeiten, Streit in der Gemeinschaft, Wunschtermin.“ |
| Datenschutz | Hinweistext, kein Häkchen nötig | | | Satz siehe unten |

Button: „Wohnung kostenlos einschätzen lassen“
Unter dem Button: „Rückruf innerhalb eines Werktags. Keine Weitergabe an Portale oder Dritte.“
Daneben: „Lieber anrufen? 0159 05844641, auch abends.“ [LINUS: „auch abends“ bestätigen]

Datenschutz-Satz am Formular (wörtlich): „Ihre Angaben verwende ich nur, um Ihre Anfrage zu beantworten und die Einschätzung zu erstellen. Ich gebe sie nicht an Portale, andere Makler oder sonstige Dritte weiter und lösche sie, wenn Sie das wünschen. Details in der [Datenschutzerklärung](/datenschutz/).“

Fehlerfall (wörtlich): „Die Anfrage konnte nicht gesendet werden. Rufen Sie mich an unter 0159 05844641 oder schreiben Sie an linus@roessler-immo.de.“

### So geht es weiter

1. **Innerhalb eines Werktags** melde ich mich, meist telefonisch, und kläre offene Angaben. Dauer: zehn Minuten.
2. **Innerhalb von zwei Werktagen** erhalten Sie die schriftliche Ersteinschätzung: Preisspanne, die Vergleichswerte dahinter, die Punkte, die Ihre Wohnung nach oben oder unten bewegen, und die Fragen, die ich erst am Gebäude beantworten kann.
3. **Wenn Sie wollen, ein Termin vor Ort.** 60 bis 90 Minuten, auch abends oder samstags [LINUS: bestätigen]. Danach prüfe ich die Spanne an Wohnung, Gebäude und Unterlagen. Was dann steht, wird Teil des schriftlichen Verkaufsplans. Ob es dazu kommt, entscheiden Sie.

### Warum keine Sofortzahl?

Weil ich sie nicht glaubwürdig liefern kann, und ein Rechner auch nicht. Bei einer Eigentumswohnung hängt der Preis an Dingen, die in keinem Rechner stehen: Wie hoch ist das Hausgeld, und welcher Teil davon ist nicht umlagefähig? Wie viel liegt in der Erhaltungsrücklage, und geht dieser Anteil beim Verkauf mit der Wohnung auf den Käufer über [19]? Ist eine Sonderumlage beschlossen, und wann wird sie fällig [20]? Steht im Protokoll der letzten Versammlung ein Heizungstausch oder eine Fassadensanierung? Hat die Gemeinschaft einen Verwalter, und streitet sie?

Diese Punkte verschieben den Preis um fünfstellige Beträge, in beide Richtungen. Ein Portal kennt sie nicht, deshalb liefern zwei Portale für dieselbe Wohnung zwei Zahlen, die weit auseinanderliegen. Für eine 75-Quadratmeter-Wohnung in Leonberg ergeben allein die Durchschnittswerte zweier Portale 280.000 € und 303.000 € [5][6]. Ich sage Ihnen lieber nach zwei Werktagen eine Spanne mit Begründung als nach zwei Minuten eine Zahl ohne.

### Häufige Fragen zur Anfrage

<!-- FAQPage-Schema, Block 1 -->

**Geht das anonym?**
Fast. Sie können die Straße weglassen und nur Ort und Stadtteil nennen; die Einschätzung wird dann etwas gröber. Einen Namen und einen Kontaktweg brauche ich, sonst kann ich Ihnen nichts schicken. Ihre Nachbarn, Ihr Mieter oder Ihre Hausverwaltung erfahren von mir nichts, solange Sie das nicht wollen.

**Bin ich danach gebunden?**
Nein. Die Einschätzung ist kostenlos und verpflichtet Sie zu nichts. Ein Maklervertrag entsteht erst, wenn Sie ihn in Textform unterschreiben (§ 656a BGB), und auch dann nur mit Widerrufsrecht [30]. Die Provision von 2,98 % des Kaufpreises inklusive Umsatzsteuer fällt nur an, wenn ein Notarvertrag zustande kommt [30].

**Was kostet die Einschätzung?**
Nichts. Sie ist Teil meiner Vorbereitung. Wenn Sie später verkaufen, verdiene ich an der Provision; wenn nicht, habe ich zwei Stunden investiert und Sie wissen mehr.

**Wie genau ist die Einschätzung?**
Es ist eine Spanne, keine Zahl auf den Euro. Nach dem Termin vor Ort und mit den WEG-Unterlagen wird sie enger. Sie ist nicht gerichtsfest und ersetzt kein Gutachten; wann Sie eines brauchen, steht weiter unten.

**Kann ich auch anrufen statt das Formular auszufüllen?**
Ja, 0159 05844641. Ich frage dann dieselben Dinge, und Sie bekommen dieselbe schriftliche Einschätzung.

**Ich will gar nicht verkaufen, nur wissen, was die Wohnung wert ist. Geht das?**
Ja. Wählen Sie bei Zeitpunkt „zunächst orientieren“. Dann bekommen Sie die Einschätzung und ich melde mich nicht wieder, außer Sie fragen. Wer 2020 gekauft hat und wissen will, ob die Wohnung seitdem gestiegen ist, ist bei mir kein Störfall, sondern ein häufiger Fall.

### Text für die Danke-Seite (/wohnung-bewerten/danke/, noindex)

**Danke, Ihre Anfrage ist angekommen.**

So geht es weiter: Ich melde mich innerhalb eines Werktags bei Ihnen, meist telefonisch im Zeitfenster, das Sie angegeben haben. Innerhalb von zwei Werktagen erhalten Sie die schriftliche Ersteinschätzung per E-Mail. Wenn Sie möchten, vereinbaren wir danach einen Termin vor Ort.

Bis dahin können Sie drei Dinge tun, die Zeit sparen: den letzten Wirtschaftsplan und die Jahresabrechnung heraussuchen, das Protokoll der letzten Eigentümerversammlung bereitlegen und, falls vorhanden, den Energieausweis des Gebäudes. Was Sie nicht finden, fordere ich später mit Ihrer Vollmacht bei der Verwaltung an.

Haben Sie etwas vergessen? Rufen Sie mich an: 0159 05844641. Linus Rössler

<!-- Bestätigungs-E-Mail: gleicher Text in Kurzform, Betreff „Ihre Anfrage bei Rössler Immobilien“, Absender linus@roessler-immo.de. -->

<!-- ===================== TEIL B: RATGEBER ===================== -->

## Was ist meine Wohnung wert? Preise, Faktoren und ein ehrlicher Vergleich der Bewertungswege

### Inhalt

1. [Aktuelle Quadratmeterpreise für Eigentumswohnungen (Stand Oktober 2026)](#preise)
2. [Wie ich bewerte: Vergleichswert mit Daten des Gutachterausschusses](#verfahren)
3. [Vier Preise, die oft verwechselt werden: Wunschpreis, Marktwert, Angebotspreis, Verkaufspreis](#vier-preise)
4. [Die zwölf Preisfaktoren einer Eigentumswohnung](#faktoren)
5. [Online-Rechner, meine Einschätzung, Gutachten: der ehrliche Vergleich](#vergleich)
6. [Wann ein Gutachten Pflicht ist](#gutachten)
7. [Welche Unterlagen ich für die Bewertung brauche](#unterlagen)
8. [Marktlage im Herbst 2026: Zinsen, Preise, Vermarktungsdauer](#markt)
9. [Häufige Fragen zum Wert](#faq-wert)

<a id="preise"></a>
### Aktuelle Quadratmeterpreise für Eigentumswohnungen (Stand Oktober 2026)

Diese Tabelle ersetzt keine Bewertung. Sie zeigt, in welchem Korridor Ihre Wohnung liegt, bevor ich Gebäude und Unterlagen gesehen habe. Alle Werte sind Angebotspreise aus Portalen, also das, was Verkäufer verlangen, nicht das, was Käufer gezahlt haben. Abweichungen zwischen den Quellen von 10 % und mehr sind normal [5][6][8].

| Ort | immoportal (Stichtag 1.10.2026) [5] | immoverkauf24/Sprengnetter (Q2 2026) [6] | Engel & Völkers (26.10.2026) [8] | ImmoScout24 Regional (Spanne, Anzahl Angebote) [7] | Bodenrichtwert Wohnbau (1.1.2025) [11] |
|---|---|---|---|---|---|
| Leonberg | 3.733 €/m² (2025: 3.825) | 4.042,68 €/m² | 4.028 €/m² (+1,09 %) | über 4.000 €/m², 3.700 bis 6.800 €, 175 Angebote | 766 €/m² |
| Heimsheim | 3.212 €/m² (2025: 3.243) | 3.623,00 €/m² (+2,89 % zum Vorjahr) | keine Angabe | mehr als 3.600 €/m², 3.550 bis 5.340 €, 10 Angebote | 235 €/m² [ZU PRÜFEN: ein anderer Aggregator nennt 732 €/m²; amtlich über BORIS-BW klären] |
| Ditzingen | 3.686 €/m² (2025: 3.818) | 4.065,13 €/m² | 3.843 €/m² (+0,64 %) | über 4.000 €/m², 3.590 bis 6.525 €, 101 Angebote | nicht abgerufen |
| Renningen | 4.986 €/m² (2025: 5.574; vermutlich Neubau-Ausreißer) | 4.054,25 €/m² | 3.882 €/m² (+1,33 %) | über 4.030 €/m², 3.667 bis 6.177 €, 100 Angebote | nicht abgerufen |
| Pforzheim | 2.928 €/m² (2025: 2.939) | 3.010,44 €/m² | 2.941 €/m² (−0,15 %) | Regionalseite nicht erreichbar; certa-Marktbericht Q1 2026: 3.023 €/m², Spanne 1.951 bis 4.519 € [10] | nicht abgerufen |

Zum Vergleich der Großstadt nebenan: Der Gutachterausschuss Stuttgart nennt für weiterverkaufte Eigentumswohnungen einen Durchschnitt von rund 4.250 €/m² (Februar 2026) [13] [ZU PRÜFEN: Pressemeldung im Volltext]. Das ist eine amtliche Zahl aus Kaufverträgen; sie liegt unter den Angebotspreisen der Portale für Stuttgart, die um 4.800 €/m² liegen [8]. Dieser Abstand zwischen Angebot und Abschluss ist der Grund, warum ich Portalwerte nie als Marktwert bezeichne.

Renningen fällt bei immoportal auf. 4.986 €/m² passt nicht zu den 3.882 bis 4.054 €/m² der anderen Quellen; der Wert wird von Neubauangeboten in Malmsheim oder am Ortsrand getragen [5]. Wer eine Wohnung aus den 1980er Jahren in Renningen hat, sollte sich nicht an dieser Zahl orientieren.

**Pforzheim nach Stadtteilen** (Angebotspreise Eigentumswohnungen, immoverkauf24/Sprengnetter, Q2 2026) [6]:

| Stadtteil | €/m² | Stadtteil | €/m² |
|---|---|---|---|
| Buckenberg | 3.262,81 | Au | 2.976,00 |
| Südoststadt | 3.127,89 | Nordstadt | 2.949,12 |
| Büchenbronn | 3.107,00 | Huchenfeld | 2.925,40 |
| Südweststadt | 3.079,12 | Innenstadt | 2.874,00 |
| Dillweißenstein | 3.008,60 | Weststadt | 2.863,71 |
| Brötzingen | 3.008,44 | Oststadt | 2.862,11 |
| Eutingen | 3.000,78 | Hohenwart | 2.647,60 |

Die Spanne innerhalb der Stadt ist größer als die Spanne zwischen den Portalen: Buckenberg liegt rund 23 % über Hohenwart. Modernisierte Altbauwohnungen an der Östlichen Karl-Friedrich-Straße werden laut certa bis 4.500 €/m² angeboten, in Huchenfeld beginnen Angebote bei 2.000 €/m² [10]. Für Leonberger Stadtteile wie Eltingen oder Ramtel gibt es keine getrennten Portaldaten; die bekomme ich erst aus dem Marktbericht des Gutachterausschusses.

<a id="verfahren"></a>
### Wie ich bewerte: Vergleichswert mit Daten des Gutachterausschusses

Der Verkehrswert ist der Preis, der am Stichtag im gewöhnlichen Geschäftsverkehr ohne Rücksicht auf ungewöhnliche oder persönliche Verhältnisse zu erzielen wäre (§ 194 BauGB) [1]. Für Eigentumswohnungen ist das Vergleichswertverfahren das Verfahren der Wahl: Man sucht Kaufpreise vergleichbarer Wohnungen und passt sie an die Unterschiede an (§ 15 ImmoWertV) [2][3][4]. Bei vermieteten Wohnungen rechne ich zusätzlich den Ertragswert mit der tatsächlichen und der ortsüblichen Miete, weil Anleger so rechnen [3]. Das Sachwertverfahren spielt bei Wohnungen kaum eine Rolle [3].

Die Daten kommen aus vier Schichten. Erstens die Kaufpreissammlung und der Marktbericht des Gutachterausschusses, also echte Abschlüsse: für Leonberg der Gutachterausschuss der Stadt (Belforter Platz 1, 71229 Leonberg), für Heimsheim der Gemeinsame Gutachterausschuss im Enzkreis in Mühlacker, für Pforzheim der städtische Ausschuss, dessen letzter online verfügbarer Marktbericht aus 2021/22 stammt [12]. [LINUS: Haben Sie die Marktberichte angefordert? Welche Kosten wurden genannt? Welcher Ausschuss ist für Ditzingen und Renningen zuständig?] [ZU PRÜFEN: zuständiger Gutachterausschuss für Ditzingen (Landkreis Ludwigsburg) und Renningen (Landkreis Böblingen)]. Zweitens Portaldaten mit Datum, wie in der Tabelle oben. Drittens meine Besichtigung: Grundriss, Zustand, Lichteinfall, Lärm, Treppenhaus, Keller, Heizraum. Viertens die Unterlagen der Gemeinschaft, die weiter unten aufgezählt sind.

Das Ergebnis ist eine Preisspanne mit Begründung, schriftlich. Ich nenne keinen Wert auf den Euro, weil das Scheingenauigkeit wäre. Die Spanne wird im Verkaufsplan zum Angebotspreis, und der Verkaufspreis entsteht erst in der Verhandlung.

<a id="vier-preise"></a>
### Vier Preise, die oft verwechselt werden: Wunschpreis, Marktwert, Angebotspreis, Verkaufspreis

Die meisten Gespräche über den Wert einer Wohnung scheitern daran, dass vier verschiedene Zahlen denselben Namen tragen.

**Der Wunschpreis** ist die Zahl im Kopf des Eigentümers. Sie kommt aus dem Kaufpreis von damals, aus dem, was der Nachbar angeblich bekommen hat, und aus dem Haus, das man als Nächstes kaufen will. Er ist legitim, aber er ist keine Bewertung.

**Der Marktwert** ist der Verkehrswert nach § 194 BauGB [1]: der wahrscheinlichste Preis am Stichtag, abgeleitet aus Vergleichsabschlüssen. Ihn schätze ich als Spanne; ein Sachverständiger ermittelt ihn in einem Gutachten.

**Der Angebotspreis** ist die Zahl im Inserat. Er liegt in der Regel am oberen Rand der Spanne, mit Verhandlungsspielraum, aber nicht so hoch, dass Interessenten gar nicht erst anfragen. Laut einer Maklerumfrage vom Oktober 2026 halten rund 70 % der Befragten die Angebotspreise am Markt für 10 bis 30 % überhöht, und mehr als die Hälfte der Objekte ist länger als sechs Monate in der Vermarktung [25] [ZU PRÜFEN: Urheber und Stichprobe der Umfrage]. Ein zu hoher Angebotspreis kostet Monate, und nach Monaten fragen Käufer, was mit der Wohnung nicht stimmt.

**Der Verkaufspreis** steht im Notarvertrag. Er ist das Ergebnis von Angebotspreis, Nachfrage, Finanzierung der Käufer und Verhandlung. Nur er zählt am Ende, und nur er landet in der Kaufpreissammlung des Gutachterausschusses.

Mein Verkaufsplan trennt diese vier Zahlen ausdrücklich. Wer den Unterschied einmal gesehen hat, diskutiert anders über den Preis.

<a id="faktoren"></a>
### Die zwölf Preisfaktoren einer Eigentumswohnung

| Nr. | Faktor | Wirkung | Beispiel aus der Region | Quelle |
|---|---|---|---|---|
| 1 | Lage und Stadtteil | Innerhalb einer Stadt größere Unterschiede als zwischen Portalen | Pforzheim: Buckenberg 3.263 €/m², Hohenwart 2.648 €/m², rund 23 % Abstand | [6] |
| 2 | Geschoss und Aufzug | Erdgeschoss wird niedriger bewertet als das erste Obergeschoss, Garten im Erdgeschoss gleicht das aus; obere Geschosse ohne Aufzug im Altbau mit Abschlag | Anlagen der 1960er bis 1980er Jahre in Leonberg-Ramtel und Ditzingen haben oft keinen Aufzug; ab dem dritten Stock fallen ältere Käufer weg [LINUS: Beobachtung bestätigen] | [3] |
| 3 | Balkon, Terrasse, Himmelsrichtung | Nordbalkon weniger wert als Südbalkon; Außenflächen zählen bis zu 25 % zur Wohnfläche | Südwestbalkon mit Blick ins Grüne in Heimsheim gegen Nordloggia zur Straße | [3] |
| 4 | Stellplatz und Tiefgarage | Eigener Preisbestandteil, in Pendlerorten gefragt | In Leonberger und Ditzinger Inseraten regelmäßig als Argument genannt [LINUS: typischer Aufpreis für einen Tiefgaragenplatz in der Region] | eigene Beobachtung |
| 5 | Baujahr und Restnutzungsdauer | Bei 100 Jahren Gesamtnutzungsdauer und 75 Jahren Restnutzungsdauer rechnerisch 25 % Alterswertminderung (Sachwertlogik) | Baujahr 1986 in der Pforzheimer Südweststadt gegen Baujahr 2016 in Renningen-Malmsheim | [3] |
| 6 | Zahl der Wohneinheiten | Mehr als 20 Einheiten tendenziell niedriger | Großanlagen am Buckenberg gegen Sechsfamilienhaus in Hirschlanden | [3] |
| 7 | Ausstattung und Modernisierung | Sanierung rund +10 %, Modernisierungsstau −5 bis −15 % (Beispielwerte) | Bad und Elektrik aus dem Baujahr sind bei Wohnungen der 1970er Jahre der häufigste Abschlag | [4] |
| 8 | Energieklasse | Gegenüber Klasse D: A+ +20 %, A +15 %, H −9 % (bundesweite Angebotsdaten); G und H seit 2021 je −12 %. Gegeneffekt: Klasse F bis H qualifiziert Familien für KfW 308 zu 1,00 % | Pforzheim mit vielen Klassen F bis H; dort ist die schlechte Klasse für Familien die Eintrittskarte | [16][26] |
| 9 | Hausgeld | Käufer rechnen den nicht umlagefähigen Teil (Verwaltung, Rücklage, Instandhaltung) als laufende Kosten ein | Beispielinserat Hirschlanden: 79 m², 390 € Hausgeld im Monat, also 4,94 €/m²; das Inserat lag mit 279.000 € oder 3.532 €/m² unter allen Portalmitteln für Ditzingen | [29][5][6] |
| 10 | Erhaltungsrücklage und Sonderumlage | Rücklage bleibt in der Gemeinschaft und geht mit der Wohnung über; fällige Sonderumlagen nach Übergang trägt der Käufer | Rechenbeispiel unten | [19][20] |
| 11 | Klima und Beschlusslage der Gemeinschaft | Zerstrittene Gemeinschaft, fehlender Verwalter, Sanierungsstau senken den Preis; aktuelle Protokolle und ein gefüllter Vermögensbericht stützen ihn | Käufer lesen die letzten drei Protokolle, bevor sie ein Angebot machen | [4][19] |
| 12 | Vermietet oder frei | Stuttgart: vermietete Wohnungen 12 % günstiger angeboten als freie (2025); pauschale 30 % sind nicht belegt | Für Leonberg und Pforzheim gibt es keine eigene Auswertung; ich nehme Stuttgart als Orientierung | [15] |

#### Rücklage und Sonderumlage in Euro

Ein Beispiel mit erfundenen, aber typischen Zahlen. Ausgangsspanne für eine Wohnung in Ditzingen: 280.000 bis 295.000 €. Der Vermögensbericht der Gemeinschaft (§ 28 Abs. 4 WEG) weist für diese Wohnung einen Rücklagenanteil von 8.000 € aus [19]. Dieses Geld bekommen Sie beim Verkauf nicht ausgezahlt; es bleibt in der Gemeinschaft und steht dem Käufer zur Verfügung [19]. Es stützt den Preis, aber Käufer zahlen selten den vollen Euro dafür. [LINUS: Wie honorieren Käufer in der Region eine gefüllte Rücklage? Erfahrungswert.]

Dazu hat die Versammlung eine Sonderumlage von 12.000 € für diese Wohnung beschlossen, fällig sechs Monate nach dem voraussichtlichen Übergang. Maßgeblich ist die Fälligkeit, nicht der Beschluss (BGH, 15.12.2017, V ZR 257/16) [20]: Die Umlage trifft den Käufer. Ein informierter Käufer zieht sie vom Angebot ab, und ich würde ihm nicht widersprechen. Aus 280.000 bis 295.000 € werden damit realistisch 268.000 bis 283.000 €. Wer das vorher weiß, kann entscheiden: Umlage vor dem Verkauf selbst zahlen und den vollen Preis verlangen, oder sie offen ausweisen und den Preis anpassen. Was nicht funktioniert: sie in den Protokollen stehen lassen und hoffen, dass niemand liest.

<a id="vergleich"></a>
### Online-Rechner, meine Einschätzung, Gutachten: der ehrliche Vergleich

| | Online-Rechner | Meine Einschätzung | Verkehrswertgutachten |
|---|---|---|---|
| Kosten | kostenlos | kostenlos | etwa 500 bis 2.000 €, Honorar frei vereinbar [21] |
| Dauer | Minuten | zwei Werktage schriftlich, enger nach Termin vor Ort | Wochen |
| Datenbasis | Angebotsdaten der Portale, ohne Gebäude und Gemeinschaft | Kaufpreisdaten des Gutachterausschusses, Portaldaten mit Datum, Besichtigung, WEG-Unterlagen | Kaufpreissammlung, Ortstermin, alle Unterlagen, normiertes Verfahren nach ImmoWertV |
| Grenzen | Sechs Portale, sechs Werte [22] [ZU PRÜFEN: Vergleich vor Zitat prüfen]; Hausgeld, Rücklage, Sonderumlage bleiben außen vor | interessengeleitet: Ich verdiene am Verkauf; nicht gerichtsfest; keine Steuerwirkung | teuer, dauert, für einen normalen Verkauf überflüssig |
| Geeignet für | eine erste Idee des Korridors | Verkaufsentscheidung, Angebotspreis, Erbengemeinschaft ohne Streit, Trennung mit Einigungswillen | Finanzamt, Gericht, Bank, Betreuungsgericht, Streit |

Zum mittleren Punkt noch ein Satz, weil er sonst untergeht. Eine Maklereinschätzung ist nicht neutral. Ich habe ein Interesse daran, dass Sie verkaufen, und ein zweites daran, dass die Wohnung zügig verkauft wird. Das erste könnte mich verleiten, hoch zu schätzen, um den Auftrag zu bekommen; das zweite, niedrig zu schätzen, um schnell fertig zu sein. Mein Mittel dagegen ist die schriftliche Begründung: Sie sehen jede Vergleichszahl mit Quelle und Datum und können sie prüfen. Eine Bewertung ist kein Gutachten, und für die meisten Verkäufe ist das in Ordnung. Für einige nicht, und die stehen im nächsten Abschnitt.

<a id="gutachten"></a>
### Wann ein Gutachten Pflicht ist

Ein Vollgutachten eines öffentlich bestellten oder zertifizierten Sachverständigen brauchen Sie, wenn jemand anderes als Sie und der Käufer den Wert anerkennen muss [3]:

- **Erbfall mit Finanzamt.** Das Finanzamt bewertet Eigentumswohnungen für die Erbschaft- und Schenkungsteuer vorrangig im Vergleichswertverfahren mit den Preisen der Gutachterausschüsse; der Bundesfinanzhof hat das am 11. März 2026 bestätigt (II R 6/23) [17] [ZU PRÜFEN: Volltext]. Wer einen niedrigeren Wert als den vom Finanzamt angesetzten nachweisen will, kann das nur mit einem Gutachten oder einem zeitnahen Verkauf (§ 198 BewG) [18] [ZU PRÜFEN: Wortlaut und Jahresfrist]. Meine Einschätzung hilft Ihnen beim Einspruch nicht.
- **Betreuung.** Verkauft ein Betreuer die Wohnung eines Betreuten, braucht er die Genehmigung des Betreuungsgerichts (§ 1850 BGB) [28]. Das Gericht will in der Regel einen Wertnachweis sehen [ZU PRÜFEN: Praxis der Betreuungsgerichte Leonberg, Pforzheim und Ludwigsburg]. Mein Verkaufsplan kann die Grundlage ergänzen, nicht ersetzen.
- **Gericht.** Strittige Scheidung mit Zugewinnausgleich, Erbstreit, Teilungsversteigerung, Zwangsversteigerung [3].
- **Bank, Betriebsvermögen, Baumängel.** Beleihung, Einlage ins Betriebsvermögen, Wertminderung durch Mängel [3].

Ein Kurzgutachten ist günstiger, aber nicht gerichtsfest [3]. Wenn Sie einen Sachverständigen brauchen, nenne ich Ihnen einen und nehme dafür nichts. [LINUS: Empfehlen Sie einen Sachverständigen für die Region? Name nennen?]

<a id="unterlagen"></a>
### Welche Unterlagen ich für die Bewertung brauche

Für die Ersteinschätzung reichen Ihre Angaben im Formular. Für die Spanne im Verkaufsplan brauche ich:

- Teilungserklärung mit Aufteilungsplan und Gemeinschaftsordnung (Miteigentumsanteil, Sondernutzungsrechte, Verwalterzustimmung)
- Wirtschaftsplan und die letzte Jahresabrechnung (Hausgeld, davon nicht umlagefähig)
- Protokolle der letzten drei Eigentümerversammlungen und die Beschluss-Sammlung (Sanierungen, Sonderumlagen, Streit)
- Vermögensbericht mit Ihrem Anteil an der Erhaltungsrücklage (§ 28 Abs. 4 WEG) [19]
- Energieausweis des Gebäudes
- Grundriss und Wohnflächenberechnung
- bei vermieteten Wohnungen Mietvertrag, letzte Mieterhöhung und Betriebskostenabrechnung

Etwa die Hälfte davon hat nicht Sie, sondern die Hausverwaltung. Schicken Sie, was Sie finden; den Rest fordere ich mit Ihrer Vollmacht an. Die vollständige Liste mit Bezugsquelle und typischer Dauer steht im Ratgeber [Eigentumswohnung verkaufen](/ratgeber/eigentumswohnung-verkaufen/).

**[Download: Checkliste „Unterlagen für die Bewertung“ (PDF) → /wohnung-bewerten/checkliste-unterlagen.pdf]** <!-- ohne E-Mail-Pflicht -->

<a id="markt"></a>
### Marktlage im Herbst 2026: Zinsen, Preise, Vermarktungsdauer

Drei Zahlen, die den Korridor in der Tabelle oben einordnen, mit Datum.

**Zinsen.** Zehnjährige Baufinanzierungen kosten Ende Oktober 2026 rund 4,2 bis 4,5 %: Dr. Klein nennt einen Topzins von 4,20 % (29.10.2026), Interhyp einen Durchschnitt von 4,42 % (15.10.2026). Vor einem Jahr lag der Topzins bei 3,38 % [24]. Für einen Kredit von 350.000 € sind das rund 230 € mehr Monatsrate als im Herbst 2025 [24]. Käufer rechnen schärfer, und das drückt auf die Angebotspreise, nicht auf die Wunschpreise.

**Preise.** Der Häuserpreisindex des Statistischen Bundesamts lag im zweiten Quartal 2026 um 0,6 % über dem Vorjahr. Eigentumswohnungen in den sieben größten Städten, Stuttgart eingeschlossen, lagen 0,4 % darunter, in kreisfreien Großstädten außerhalb der Metropolen 2,0 % darüber, in dicht besiedelten ländlichen Kreisen 1,8 % darunter [23]. Für Leonberg nennt Engel & Völkers +1,09 % bei Wohnungen und −5,9 % bei Häusern (26.10.2026) [8]. Kurz: Wohnungen stabil, Häuser weicher, keine Richtung, auf die man einen hohen Angebotspreis stützen könnte.

**Vermarktungsdauer.** Im ersten Quartal 2026 lag die Vermarktungsdauer von Eigentumswohnungen in 24 deutschen Städten bei rund 90 Tagen [25]. Eine Auswertung von Hausgold für das Handelsblatt zeigt für Januar bis Mai 2026 Inseratsdauern von bis zu fast neun Wochen mit großer Spreizung zwischen den Regionen [25]. Mehr dazu, mit Vorbehalt, im Abschnitt über die vier Preise.

Zwei Dinge wirken 2026 gegen den Zinseffekt. Familien bekommen für Wohnungen der Klassen F bis H bis zu 180.000 € zu 1,00 % aus dem KfW-Programm 308 [26]. Und seit dem 29. Juli 2026 gibt es keine Pflicht mehr, alte Heizungen auszutauschen [27]; das entlastet Wohnungen aus den Baujahren 1960 bis 1990 mit Gaszentralheizung, die 2023 bis 2025 mit hohen Abschlägen bewertet wurden. Diese Tabelle und diesen Abschnitt aktualisiere ich quartalsweise; das Datum steht oben.

<a id="faq-wert"></a>
### Häufige Fragen zum Wert

<!-- FAQPage-Schema, Block 2 -->

**Ist Verkehrswert gleich Kaufpreis?**
Nein. Der Verkehrswert ist der am Stichtag wahrscheinlichste Preis (§ 194 BauGB) [1], der Kaufpreis ist das Verhandlungsergebnis. Beide können auseinanderliegen, in beide Richtungen.

**Ist eine freie Wohnung mehr wert als eine vermietete?**
In der Regel ja. In Stuttgart wurden vermietete Wohnungen 2025 um 12 % günstiger angeboten als freie [15]. Pauschale 20 bis 30 % aus Ratgebern sind nicht belegt. Eine Miete nahe Marktniveau verkleinert den Abstand, eine Altmiete weit darunter vergrößert ihn.

**Wie wirken Hausgeld, Rücklage und Sonderumlage auf den Preis?**
Hohe nicht umlagefähige Kosten und fällige Sonderumlagen senken den Preis, eine gefüllte Rücklage stützt ihn [3][19][20]. Ich rechne das in Euro vor, siehe das Beispiel oben.

**Brauche ich für das Finanzamt ein Gutachten?**
Wenn Sie einen niedrigeren Wert als den vom Finanzamt angesetzten nachweisen wollen, ja (§ 198 BewG) [18] [ZU PRÜFEN]. Meine Einschätzung reicht dafür nicht.

**Woher kommen Ihre Vergleichswerte?**
Aus der Kaufpreissammlung und dem Marktbericht des Gutachterausschusses, sobald angefordert, aus Portaldaten mit Datum, aus der Besichtigung und aus den Unterlagen der Gemeinschaft [12]. Jede Zahl in der Einschätzung hat eine Quelle und ein Datum.

**Was kostet der Quadratmeter in Pforzheim-Buckenberg oder in Leonberg-Eltingen?**
Buckenberg: 3.262,81 €/m² Angebotspreis (immoverkauf24, Q2 2026) [6]. Für Leonberger Stadtteile liegen keine getrennten Portaldaten vor; die Antwort kommt aus dem Marktbericht des Gutachterausschusses, sobald er ausgewertet ist.

**Wie genau ist eine Online-Bewertung?**
Sie liefert einen Korridor aus Angebotsdaten. Verschiedene Portale weichen für dieselbe Wohnung deutlich voneinander ab [22], und Gebäude, Hausgeld und Gemeinschaft bleiben außen vor. Als erste Idee brauchbar, als Angebotspreis nicht.

## Hinweis

Ich erstelle keine Verkehrswertgutachten, das ist Sache eines Sachverständigen, und ich erbringe keine Steuer- oder Rechtsberatung, insbesondere nicht zum Wert für das Finanzamt oder zur Genehmigung durch ein Betreuungsgericht. Alle Preise auf dieser Seite sind Angebotspreise von Portalen oder Marktberichten mit dem genannten Stand, keine Kaufpreise und kein Marktwert Ihrer Wohnung. Meine Einschätzung ist interessengeleitet, weil ich am Verkauf verdiene; deshalb begründe ich sie schriftlich. Meine Erlaubnis nach § 34c GewO ist beantragt; Einschätzungen gebe ich ab sofort, Vermarktungsaufträge nehme ich nach Erteilung an.

## Nächster Schritt

Zwei Portale, zwei Zahlen, 60.000 € dazwischen? Ich schaue mir Wohnung, Gebäude und Unterlagen an und sage Ihnen, wo Ihre Wohnung in Leonberg, Ditzingen oder Pforzheim wirklich steht.

**[Button: Wohnung kostenlos einschätzen lassen → #formular]**
Rückruf innerhalb eines Werktags, schriftliche Einschätzung innerhalb von zwei Werktagen. Keine Weitergabe an Portale oder Dritte.

**[Button: Anrufen → tel:+4915905844641]**
Linus Rössler, Telefon 0159 05844641, auch abends. [LINUS: bestätigen]

## Vor Ort

- [Wohnung verkaufen in Leonberg](/wohnung-verkaufen/leonberg/): 3.733 bis 4.043 €/m² je nach Portal, Bodenrichtwert 766 €/m², Gutachterausschuss am Belforter Platz.
- [Wohnung verkaufen in Pforzheim](/wohnung-verkaufen/pforzheim/): 2.928 bis 3.023 €/m², 14 Stadtteile von 2.648 bis 3.263 €/m².
- [Wohnung verkaufen in Ditzingen](/wohnung-verkaufen/ditzingen/): 3.686 bis 4.065 €/m², Hirschlanden, Heimerdingen und Schöckingen.
- [Wohnung verkaufen in Renningen](/wohnung-verkaufen/renningen/): 3.882 bis 4.054 €/m² ohne den Neubau-Ausreißer, Malmsheim.
- [Wohnung verkaufen in Heimsheim](/wohnung-verkaufen/heimsheim/): 3.212 bis 3.623 €/m², Enzkreis, Gutachterausschuss in Mühlacker.

## Weiterführend

- [Eigentumswohnung verkaufen: Ablauf, Unterlagen, Kosten](/ratgeber/eigentumswohnung-verkaufen/)
- [Vermietete Wohnung verkaufen](/ratgeber/vermietete-wohnung-verkaufen/)
- [Geerbte Wohnung verkaufen](/ratgeber/geerbte-wohnung-verkaufen/)
- [Wohnung bei Scheidung und Trennung](/ratgeber/wohnung-scheidung/)
- [Energieausweis bei der Eigentumswohnung](/ratgeber/energieausweis/)
- [Sofortankauf oder Makler?](/ratgeber/sofortankauf-vs-makler/)

## Quellen

1. § 194 BauGB, Verkehrswert. https://www.gesetze-im-internet.de/bbaug/__194.html (abgerufen 29.10.2026)
2. § 15 ImmoWertV 2021, Vergleichswertverfahren. https://www.gesetze-im-internet.de/immowertv_2022/__15.html (abgerufen 29.10.2026) [ZU PRÜFEN: URL]
3. immoportal, „Was gilt es bei der Wertermittlung einer Eigentumswohnung zu beachten?“: Verfahren, Geschoss, Himmelsrichtung, Balkonanrechnung bis 25 %, Restnutzungsdauer, mehr als 20 Wohneinheiten, Rücklage, Sonderumlagen, Vollgutachten und Kurzgutachten. https://www.immoportal.com/gutachten/immobilienbewertung/was-gilt-es-bei-der-wertermittlung-einer-eigentumswohnung-zu-beachten
4. Homeday, „Wohnungsbewertung“: Sanierung +10 %, Modernisierungsstau −5 bis −15 % (Beispielwerte), zerstrittene Gemeinschaft, Formel Wohnfläche × €/m². https://www.homeday.de/de/immobilienbewertung/wohnungsbewertung/
5. immoportal, Immobilienpreise, Stichtag 01.10.2026: https://www.immoportal.com/immobilienpreise/leonberg ; …/heimsheim ; …/ditzingen ; …/renningen ; …/pforzheim
6. immoverkauf24 (Powered by Sprengnetter), Stand Q2 2026, inklusive Pforzheimer Stadtteile: https://www.immoverkauf24.de/immobilienpreise/baden-wuerttemberg/boeblingen-kreis/leonberg/ ; …/enzkreis/heimsheim/ ; …/ludwigsburg-kreis/ditzingen/ ; …/boeblingen-kreis/renningen/ ; https://www.immoverkauf24.de/immobilienpreise/baden-wuerttemberg/pforzheim/
7. ImmoScout24 Regional (KI-gestützte Angaben, ohne Datum): https://www.immobilienscout24.de/regional/de/baden-wuerttemberg/boeblingen-kreis/leonberg/ ; …/enzkreis/heimsheim/ ; …/ludwigsburg-kreis/ditzingen/ ; …/boeblingen-kreis/renningen/ (Pforzheim nicht erreichbar)
8. Engel & Völkers, Immobilienpreise, 26.10.2026: https://www.engelvoelkers.com/de-de/immobilienpreise/baden-wuerttemberg/leonberg/ ; …/ditzingen/ ; …/renningen/ ; …/pforzheim/ ; Stuttgart (Q3 2026, ca. 4.820 €/m²): …/stuttgart/
9. Immowelt, Leonberg 4.061 €/m² (8/2026) und Pforzheim 3.168 €/m² (10/2026): https://www.immowelt.de/immobilienpreise/baden-wurttemberg/leonberg-71229/ad08de5243 ; https://www.immowelt.de/immobilienpreise/baden-wurttemberg/pforzheim-75172/ad08de5724
10. certa Gutachten, Marktbericht Pforzheim Q1 2026 (22.04.2026, aktualisiert 06.07.2026): ETW Ø 3.023 €/m², Spanne 1.951 bis 4.519 €/m², Stadtteilwerte. https://www.certa-gutachten.de/marktberichte/pforzheim-q1-2026
11. Bodenrichtwerte (Aggregator, Stichtag 01.01.2025): Leonberg 766 €/m², Heimsheim 235 €/m². https://www.bodenrichtwerte-deutschland.de/boris/bw/leonberg ; https://www.bodenrichtwerte-deutschland.de/boris/bw/heimsheim ; abweichend miete-aktuell.de für Heimsheim ca. 732 €/m²: https://www.miete-aktuell.de/bodenrichtwert-grundstueckspreise/Heimsheim/Heimsheim/ [ZU PRÜFEN: amtlich über BORIS-BW]
12. Gutachterausschüsse: Stadt Leonberg, Belforter Platz 1, 71229 Leonberg, gutachterausschuss@leonberg.de, 07152 990-3119, https://www.leonberg.de/Rathaus/Verwaltung/Gutachterausschuss ; Zweckverband Gemeinsamer Gutachterausschuss im Enzkreis, Mühlacker, gutachter@gua-enzkreis.de ; Stadt Pforzheim, Immobilienmarktbericht 2021/22: https://www.pforzheim.de/fileadmin/user_upload/bauen/Gutachterausschuss/Immobilienmarktbericht_2021_22_Internet.pdf [ZU PRÜFEN: aktuelle Marktberichte anfordern; Zuständigkeit Ditzingen und Renningen]
13. Landeshauptstadt Stuttgart, Gutachterausschuss, Februar 2026: Durchschnittspreis weiterverkaufte Eigentumswohnungen rund 4.250 €/m² (laut Suchergebnis). https://www.stuttgart.de/service/aktuelle-meldungen/2026/februar/stuttgarter-immobilienmarkt-weiterhin-im-aufwind-gutachterausschuss-stellt-neue-auswertung-vor [ZU PRÜFEN: Volltext]
14. Angebotsmieten 2026: Leonberg 15,78 €/m² (wohnungsboerse.net, Mai 2026), 15,41 €/m² (Engel & Völkers, Juni 2026, https://www.engelvoelkers.com/de-de/mietspiegel/baden-wuerttemberg/leonberg/), 12,76 €/m² (Immowelt, Wohnungen, 7/2026); Ditzingen 15,51 €/m² (E&V); Renningen 14,08 €/m² (E&V); Heimsheim 13,10 €/m² (ohne-makler.net); Pforzheim 10,88 €/m² (ohne-makler.net), Mietspiegel 2025 Ø 8,58 €/m² nettokalt (https://www.pforzheim.de/buerger/buergerservice/kommunale-statistikstelle/statistische-veroeffentlichungen/mietspiegel.html)
15. ImmoScout24, Pressemitteilung 10.11.2025, „Vermietete Eigentumswohnungen bis zu 33 Prozent günstiger als unvermietete“: Stuttgart 12 % (Medianpreise Juli bis Oktober 2025). https://www.immobilienscout24.de/unternehmen/news-medien/news/default-title/vermietete-eigentumswohnungen-bis-zu-33-prozent-guenstiger-als-unvermietete/
16. Immowelt-Analyse 19.03.2026 (A+ +20 %, A +15 %, H −9 % gegenüber D) und ImmoScout24 (G und H je −12 % seit 2021), zitiert nach reduco.ai: https://reduco.ai/blog/energieausweis/energieausweis-wohnung-eigentumswohnung [ZU PRÜFEN: Primärquellen]
17. BFH, Urteil vom 11.03.2026, II R 6/23: Eigentumswohnungen für die Erbschaftsteuer vorrangig im Vergleichswertverfahren mit Preisen der Gutachterausschüsse; Ebner Stolz, 29.06.2026 (laut Suchergebnis) [ZU PRÜFEN: Volltext und Fundstelle]
18. § 198 BewG, Nachweis des niedrigeren gemeinen Werts durch Gutachten oder zeitnahen Verkauf. https://www.gesetze-im-internet.de/bewg/__198.html [ZU PRÜFEN: Wortlaut, Jahresfrist]
19. § 28 Abs. 4 WEG (Vermögensbericht), § 19 Abs. 2 Nr. 4 WEG (angemessene Erhaltungsrücklage); Rücklage bleibt in der Gemeinschaft und geht auf den Käufer über, kein Rückzahlungsanspruch: ImmoScout24-Lexikon Instandhaltungsrücklage; Hinweis der Notarkammer zu fehlender Rücklage und Sonderumlagenrisiko (notar.de, PDF, laut Suchergebnis). https://www.gesetze-im-internet.de/woeigg/
20. BGH, Urteil vom 15.12.2017, V ZR 257/16: Für die Zahlungspflicht einer Sonderumlage ist die Fälligkeit maßgeblich, nicht der Beschluss; zitiert nach reduco.ai, „Wohnung verkaufen: Ablauf“: https://reduco.ai/blog/immobilienverkauf/wohnung-verkaufen-ablauf [ZU PRÜFEN: Volltext]
21. Kosten Verkehrswertgutachten: ca. 500 bis 2.000 € (bodenrichtwerte-deutschland.de); ImmoScout24-Kostentabelle 2.000 € bei 200.000 € Kaufpreis; Honorar frei vereinbar. https://www.immobilienscout24.de/wissen/verkaufen/wohnung-verkaufen.html
22. portimmo.de, Vergleich von sechs Online-Bewertungen mit sechs verschiedenen Ergebnissen (laut Suchergebnis) [ZU PRÜFEN: vor Veröffentlichung Seite und Zahlen prüfen]
23. Statistisches Bundesamt, Pressemitteilung Nr. 336 vom 24.09.2026, Häuserpreisindex 2. Quartal 2026: +0,6 % zum Vorjahr; Eigentumswohnungen Top-7 −0,4 %, kreisfreie Großstädte +2,0 %, dicht besiedelte ländliche Kreise −1,8 %. https://www.destatis.de/DE/Presse/Pressemitteilungen/2026/09/PD26_336_61262.html
24. Bauzinsen: Dr. Klein Topzins 10 Jahre 4,20 % (29.10.2026; Oktober 2025: 3,38 %), https://www.drklein.de/zinsen.html ; Interhyp Durchschnitt 4,42 % (15.10.2026), https://www.interhyp.de/zinsen/ ; Mehrbelastung ca. 230 €/Monat bei 350.000 € Kredit: eigene Rechnung aus der Zinsdifferenz von 0,82 Prozentpunkten (350.000 € × 0,82 % ÷ 12 = 239 €)
25. Vermarktungsdauer: GREIX/IfW Kiel, Eigentumswohnungen Q1 2026 rund 90 Tage in 24 Städten, zitiert nach reduco.ai (Quelle 20) [ZU PRÜFEN: Primärquelle]; Hausgold-Auswertung für das Handelsblatt, Januar bis Mai 2026: https://www.handelsblatt.com/finanzen/immobilien/immobilien-in-welchen-staedten-finden-eigentuemer-am-schnellsten-einen-kaeufer/100260831.html (Paywall); Maklerumfrage Oktober 2026 (54,3 % der Objekte länger als sechs Monate, 70 % halten Angebotspreise für 10 bis 30 % überhöht): https://ad-hoc-news.de/wirtschaft/immobilienmarkt-54-3-prozent-der-verkaeufe-dauern-laenger-als-sechs-monate/70395215 [ZU PRÜFEN: Urheber und Stichprobe]
26. KfW-Programm 308 „Jung kauft Alt“: seit 03.08.2026 bis zu 140.000 / 160.000 / 180.000 €, 1,00 % effektiv (35 Jahre), nur Energieausweis Klasse F, G oder H, Antrag vor dem Notarvertrag. https://www.baukostenplan.de/ratgeber/kfw-308-jung-kauft-alt-2026-neue-kreditbetraege (Stand 07.10.2026) [ZU PRÜFEN: Zins tagesaktuell]
27. Gebäudemodernisierungsgesetz (GModG), in Kraft seit 29.07.2026: Streichung der 65-%-Pflicht und des Betriebsverbots für über 30 Jahre alte Kessel. https://www.bundesregierung.de/breg-de/aktuelles/neues-gebaeudemodernisierungsgesetz-2430284
28. § 1850 BGB, Genehmigung des Betreuungsgerichts für Verfügungen über Grundstücke. https://www.gesetze-im-internet.de/bgb/__1850.html (abgerufen 29.10.2026)
29. Beispielinserat Ditzingen-Hirschlanden, 3,5 Zimmer, 79 m², 279.000 €, Hausgeld 390 €/Monat (laut Suchergebnis, Oktober 2026); 279.000 ÷ 79 = 3.532 €/m²; 390 ÷ 79 = 4,94 €/m² und Monat.
30. Vergütungsvereinbarung Rössler Immobilien: 2,98 % des Kaufpreises inkl. Umsatzsteuer je Seite, nur bei Notarvertrag; Textform des Maklervertrags § 656a BGB; Widerrufsrecht bei Verträgen im Fernabsatz oder außerhalb von Geschäftsräumen. https://www.gesetze-im-internet.de/bgb/__656a.html
