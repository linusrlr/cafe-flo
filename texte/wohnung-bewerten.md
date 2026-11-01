---
url: /wohnung-bewerten/
title: Wohnung bewerten lassen: Leonberg, Ditzingen, Pforzheim
description: Was ist Ihre Eigentumswohnung wert? Schriftliche Einschätzung mit Preisspanne und Begründung, mit Vergleichswerten und WEG-Prüfung. Quadratmeterpreise für fünf Orte, Stand 2026.
stand: Oktober 2026
status: Entwurf, nicht veröffentlicht
---

<!-- Umsetzung: Diese Datei hat zwei Teile. Teil A ist die Lead-Seite mit dem vierstufigen Formular direkt unter der H1 (Formular als Spezifikation, nicht als Fließtext). Teil B ist der Ratgeber-Abschnitt darunter. JSON-LD: Service/Offer für die kostenlose Einschätzung, Article für Teil B, FAQPage für beide FAQ-Blöcke, BreadcrumbList; kein aggregateRating. Formular serverseitig (kontakt.php erweitern), Danke-Seite /wohnung-bewerten/danke/ mit noindex und serverseitiger Zählung, Bestätigungs-E-Mail. Kein Cookie-Banner nötig. Update-Trigger: Preistabelle quartalsweise, Zinsen monatlich (15.), vdp Q3 Mitte November 2026, Destatis Q3 Mitte Dezember 2026. Langfassung vor der Kürzung: texte/_langfassung/wohnung-bewerten.md -->

# Was ist meine Eigentumswohnung wert? Bewertung in Leonberg, Heimsheim, Ditzingen, Renningen und Pforzheim

*Stand: Oktober 2026 · Von Linus Rössler, Immobilienmakler für Eigentumswohnungen (Erlaubnis nach § 34c GewO beantragt)*

<!-- ===================== TEIL A: LEAD-SEITE ===================== -->

**Kurzantwort:** Was Ihre Eigentumswohnung wert ist, hängt neben Lage und Zustand an der Gemeinschaft: Hausgeld, Erhaltungsrücklage und beschlossene Sonderumlagen. Die Angebotspreise der Portale liegen im Oktober 2026 bei rund 2.900 bis 3.000 €/m² in Pforzheim und rund 3.700 bis 4.100 €/m² in Leonberg, Ditzingen und Renningen. Eine Spanne für Ihre Wohnung erhalten Sie von mir kostenlos und schriftlich innerhalb von zwei Werktagen.

Sie bekommen eine Preisspanne mit Begründung, keine Zahl aus einem Rechner. Ich prüfe Ihre Angaben, die aktuellen Vergleichswerte und die Besonderheiten Ihres Gebäudes. Fehlt eine Angabe, rufe ich Sie einmal kurz an. [LINUS: Gilt „zwei Werktage“ ab Eingang der Anfrage oder ab dem Telefonat? Bitte verbindlich festlegen.]

Was danach nicht passiert: keine Weitergabe Ihrer Daten an Portale oder andere Makler, kein Vertrag, keine Anrufe, die Sie nicht wollten. Ob wir uns die Wohnung gemeinsam ansehen, entscheiden Sie.

**Persönlich geprüft · schriftlich innerhalb von zwei Werktagen · kostenlos · keine Weitergabe**

<!-- ===================== SPEZIFIKATION FÜR DIE ENTWICKLUNG (zählt nicht als Seitentext) =====================

Formular „Wohnung kostenlos einschätzen lassen“, Anker #formular, an dieser Stelle einbinden.

Allgemein: Vier Schritte, ein Thema pro Schritt, Fortschrittsanzeige „Schritt 1 von 4“. Pflichtfelder nur in Schritt 1 (Ort) und Schritt 4 (Name, ein Kontaktweg). Alle anderen Felder optional; fehlende Angaben erfrage ich im Telefonat. Keine versteckte Newsletter-Einwilligung. Mobile Tastatur: inputmode="numeric" für Zahlenfelder. Honeypot und JS-Marker wie auf der Live-Seite beibehalten.

Feldformat: Feld | Typ | Optionen | Pflicht | Hilfetext

SCHRITT 1 VON 4: Wo liegt die Wohnung?
Microcopy über dem Schritt: „Vier kurze Schritte, etwa zwei Minuten. Sie können jederzeit abbrechen; gespeichert wird erst beim Absenden.“
- Ort | Auswahl | Leonberg, Heimsheim, Ditzingen, Renningen, Pforzheim, anderer Ort (Freitext erscheint) | Pflicht | „Ich arbeite in diesen fünf Orten. Liegt die Wohnung anderswo, sage ich Ihnen ehrlich, ob ich helfen kann.“
- Stadtteil oder Ortsteil | Text | frei, zum Beispiel Ramtel, Hirschlanden, Malmsheim, Buckenberg | optional | „Hilft bei den Vergleichswerten. Pforzheim hat 14 Stadtteile mit unterschiedlichen Preisen.“
- Straße | Text | frei | optional | „Ohne Hausnummer reicht. Die Adresse brauche ich erst, wenn wir uns treffen.“
Button: „Weiter zur Wohnung“

SCHRITT 2 VON 4: Die Wohnung
Microcopy: „Ungefähre Angaben reichen. Was Sie nicht wissen, lassen Sie frei.“
- Wohnfläche | Zahl (m²) | (keine) | optional | „Wohnfläche laut Kaufvertrag oder Teilungserklärung. Balkon und Terrasse zählen in der Regel nur zu einem Viertel. Keller und Stellplatz zählen nicht.“ (Beleg: Quelle [3])
- Zimmer | Auswahl | 1, 1,5, 2, 2,5, 3, 3,5, 4, 4,5, 5 und mehr | optional | „Halbe Zimmer sind Räume unter 10 m².“
- Etage | Auswahl | Untergeschoss/Souterrain, Erdgeschoss, 1. OG, 2. OG, 3. OG, 4. OG und höher, Dachgeschoss | optional | „Erdgeschoss mit Garten und Dachgeschoss mit Terrasse bitte unten bei Außenflächen angeben.“
- Aufzug | Auswahl | ja, nein, weiß nicht | optional | „Ab dem dritten Stock ohne Aufzug verändert sich der Käuferkreis.“
- Außenflächen | Mehrfachauswahl | Balkon, Loggia, Terrasse, Garten, keine | optional | „Mehrere Angaben möglich.“
- Stellplatz | Auswahl | keiner, Außenstellplatz, Carport, Garage, Tiefgarage, mehrere | optional | „Ein Tiefgaragenplatz ist in Leonberg und Ditzingen oft ein eigenes Verkaufsargument.“
- Baujahr | Zahl | (keine) | optional | „Das Baujahr des Gebäudes, steht im Energieausweis. Ungefähr reicht.“
Button: „Weiter zu Zustand und Nutzung“

SCHRITT 3 VON 4: Zustand, Nutzung, Zeitpunkt
Microcopy: „Diese Angaben entscheiden über die Spanne mehr als die Lage.“
- Zustand der Wohnung | Auswahl (drei Stufen) | in den letzten zehn Jahren modernisiert (Bad, Böden, Elektrik oder Fenster) / gepflegt, weitgehend Originalzustand / renovierungsbedürftig | optional | „Es gibt keine falsche Antwort. Eine renovierungsbedürftige Wohnung hat andere Käufer, nicht keine.“
- Nutzung | Auswahl | selbst bewohnt, vermietet, leer | optional | „Bei vermieteten Wohnungen rechne ich zusätzlich mit der Miete.“
- Kaltmiete je Monat | Zahl (€) | erscheint nur bei „vermietet“ | optional | „Nettokaltmiete ohne Nebenkosten, aus dem Mietvertrag oder der letzten Mieterhöhung.“
- Hausgeld je Monat | Zahl (€) | (keine) | optional | „Steht im Wirtschaftsplan oder auf dem Kontoauszug. Wichtig, weil Käufer den nicht umlagefähigen Anteil einrechnen.“
- Zeitpunkt | Auswahl | möglichst bald / in den nächsten sechs Monaten / zunächst orientieren | optional | „‚Zunächst orientieren‘ ist eine ehrliche Antwort. Dann bekommen Sie die Einschätzung und keinen Anruf alle zwei Wochen.“
- Anlass | Auswahl | Verkauf geplant, Wohnung geerbt, Trennung oder Scheidung, Umzug oder Alter, Kapitalanlage auflösen, Direktankauf prüfen, nur orientieren, Sonstiges | optional | „Der Anlass ändert, worauf ich achte: Bei einem Erbfall zum Beispiel auf den Wert fürs Finanzamt, bei einer Trennung auf eine Zahl, die beide prüfen können.“
Button: „Weiter zu Ihren Kontaktdaten“

SCHRITT 4 VON 4: Wie erreiche ich Sie?
Microcopy: „Letzter Schritt. Name und ein Kontaktweg genügen.“
- Name | Text | (keine) | Pflicht | „Vor- und Nachname, damit ich Sie richtig anspreche.“
- E-Mail | E-Mail | (keine) | Pflicht, wenn kein Telefon | „Für die schriftliche Einschätzung als PDF.“
- Telefon | Telefon | (keine) | Pflicht, wenn keine E-Mail | „Für Rückfragen. Ein Anruf, kein Verkaufsgespräch.“
- Bevorzugte Rückrufzeit | Auswahl | vormittags, nachmittags, abends 18 bis 20 Uhr, samstags, egal | optional | „Ich rufe nur in diesem Fenster an.“ [LINUS: Erreichbarkeit abends und samstags verbindlich?]
- Nachricht | Textfeld | (keine) | optional | „Was ich noch wissen sollte: beschlossene Sonderumlage, geplante Arbeiten, Streit in der Gemeinschaft, Wunschtermin.“
- Datenschutz | Hinweistext, kein Häkchen nötig | (keine) | (keine) | Satz siehe unten
Button: „Wohnung kostenlos einschätzen lassen“
Unter dem Button: „Rückruf innerhalb eines Werktags. Keine Weitergabe an Portale oder Dritte.“
Daneben: „Lieber anrufen? 0159 05844641, auch abends.“ [LINUS: „auch abends“ bestätigen]

Datenschutz-Satz am Formular (wörtlich): „Ihre Angaben verwende ich nur, um Ihre Anfrage zu beantworten und die Einschätzung zu erstellen. Ich gebe sie nicht an Portale, andere Makler oder sonstige Dritte weiter und lösche sie, wenn Sie das wünschen. Details in der [Datenschutzerklärung](/datenschutz/).“

Fehlerfall (wörtlich): „Die Anfrage konnte nicht gesendet werden. Rufen Sie mich an unter 0159 05844641 oder schreiben Sie an linus@roessler-immo.de.“

TEXT FÜR DIE DANKE-SEITE (/wohnung-bewerten/danke/, noindex)
Überschrift: „Danke, Ihre Anfrage ist angekommen.“
„So geht es weiter: Ich melde mich innerhalb eines Werktags bei Ihnen, meist telefonisch im Zeitfenster, das Sie angegeben haben. Innerhalb von zwei Werktagen erhalten Sie die schriftliche Ersteinschätzung per E-Mail. Wenn Sie möchten, vereinbaren wir danach einen Termin vor Ort.“
„Bis dahin können Sie drei Dinge tun, die Zeit sparen: den letzten Wirtschaftsplan und die Jahresabrechnung heraussuchen, das Protokoll der letzten Eigentümerversammlung bereitlegen und, falls vorhanden, den Energieausweis des Gebäudes. Was Sie nicht finden, fordere ich später mit Ihrer Vollmacht bei der Verwaltung an.“
„Haben Sie etwas vergessen? Rufen Sie mich an: 0159 05844641. Linus Rössler“

Bestätigungs-E-Mail: gleicher Text in Kurzform, Betreff „Ihre Anfrage bei Rössler Immobilien“, Absender linus@roessler-immo.de.

===================== ENDE SPEZIFIKATION ===================== -->

### So geht es weiter

1. **Innerhalb eines Werktags** melde ich mich, meist telefonisch, und kläre offene Angaben. Dauer: zehn Minuten.
2. **Innerhalb von zwei Werktagen** erhalten Sie die schriftliche Ersteinschätzung: Preisspanne, die Vergleichswerte dahinter, was Ihre Wohnung nach oben oder unten bewegt, und was ich erst am Gebäude klären kann.
3. **Wenn Sie wollen, ein Termin vor Ort.** 60 bis 90 Minuten, auch abends oder samstags. [LINUS: Erreichbarkeit abends und samstags verbindlich? Gilt auch für Formular und Telefon.] Danach prüfe ich die Spanne an Wohnung, Gebäude und Unterlagen. Daraus wird der schriftliche Verkaufsplan, wenn Sie das möchten.

### Warum keine Sofortzahl?

Weil weder ich noch ein Rechner sie glaubwürdig liefern kann. Bei einer Eigentumswohnung hängt der Preis an Dingen, die in keinem Rechner stehen. Wie hoch ist das Hausgeld, und welcher Teil ist nicht umlagefähig? Wie viel liegt in der Erhaltungsrücklage? Ist eine Sonderumlage beschlossen, und wann wird sie fällig? Steht im Protokoll ein Heizungstausch? Streitet die Gemeinschaft?

Diese Punkte verschieben den Preis um fünfstellige Beträge, in beide Richtungen. Ein Portal kennt sie nicht. Für eine 75-Quadratmeter-Wohnung in Leonberg ergeben allein die Durchschnittswerte von immoportal und immoverkauf24 rund 280.000 € und 303.000 € (siehe [Preistabelle](#preise)). Ich nenne Ihnen lieber nach zwei Werktagen eine Spanne mit Begründung als nach zwei Minuten eine Zahl ohne.

### Häufige Fragen zur Anfrage

<!-- FAQPage-Schema, Block 1 -->

**Geht das anonym?**
Fast. Sie können die Straße weglassen; die Einschätzung wird dann etwas gröber. Name und ein Kontaktweg sind nötig, sonst kann ich Ihnen nichts schicken. Nachbarn, Mieter oder Hausverwaltung erfahren von mir nichts, solange Sie das nicht wollen.

**Bin ich danach gebunden?**
Nein. Ein Maklervertrag entsteht erst, wenn Sie ihn in Textform unterschreiben (§ 656a BGB), und auch dann mit Widerrufsrecht. Die Provision von 2,98 % des Kaufpreises inklusive Umsatzsteuer fällt nur an, wenn ein Notarvertrag zustande kommt [28].

**Was kostet die Einschätzung?**
Nichts. Wenn Sie später verkaufen, verdiene ich an der Provision. Wenn nicht, wissen Sie mehr.

**Wie genau ist die Einschätzung?**
Es ist eine Spanne, keine Zahl auf den Euro. Nach dem Termin vor Ort und mit den WEG-Unterlagen wird sie enger. Sie ersetzt kein Gutachten; wann Sie eines brauchen, steht [weiter unten](#gutachten).

**Kann ich auch anrufen?**
Ja, unter 0159 05844641. Sie bekommen dieselbe schriftliche Einschätzung.

**Ich will nur wissen, was die Wohnung wert ist. Geht das?**
Ja. Wählen Sie bei Zeitpunkt „zunächst orientieren“. Dann bekommen Sie die Einschätzung, und ich melde mich nicht wieder, außer Sie fragen.

<!-- ===================== TEIL B: RATGEBER ===================== -->

## Was ist meine Wohnung wert? Preise, Faktoren und die Bewertungswege im Vergleich

### Inhalt

1. [Quadratmeterpreise (Stand Oktober 2026)](#preise)
2. [Wie ich bewerte](#verfahren)
3. [Vier Preise, die oft verwechselt werden](#vier-preise)
4. [Die zwölf Preisfaktoren einer Eigentumswohnung](#faktoren)
5. [Online-Rechner, Einschätzung, Gutachten](#vergleich)
6. [Wann ein Gutachten Pflicht ist](#gutachten)
7. [Welche Unterlagen ich brauche](#unterlagen)
8. [Marktlage im Herbst 2026](#markt)
9. [Häufige Fragen zum Wert](#faq-wert)

<a id="preise"></a>
### Aktuelle Quadratmeterpreise für Eigentumswohnungen (Stand Oktober 2026)

Die Tabelle zeigt den Korridor, bevor ich Gebäude und Unterlagen gesehen habe. Alle Werte sind Angebotspreise, also das, was Verkäufer verlangen, nicht das, was Käufer gezahlt haben. Abweichungen zwischen den Quellen von 10 % und mehr sind normal.

| Ort | immoportal (1.10.2026) [5] | immoverkauf24/Sprengnetter (Q2 2026) [6] | Engel & Völkers (26.10.2026) [8] | ImmoScout24 Regional (Spanne, Angebote) [7] | Bodenrichtwert Wohnbau (1.1.2025) [10] |
|---|---|---|---|---|---|
| Leonberg | 3.733 €/m² (2025: 3.825) | 4.042,68 €/m² | 4.028 €/m² (+1,09 %) | über 4.000 €/m², 3.700 bis 6.800 €, 175 Angebote | 766 €/m² |
| Heimsheim | 3.212 €/m² (2025: 3.243) | 3.623,00 €/m² (+2,89 % zum Vorjahr) | keine Angabe | mehr als 3.600 €/m², 3.550 bis 5.340 €, 10 Angebote | 235 €/m² [ZU PRÜFEN: ein anderer Aggregator nennt 732 €/m²; amtlich über BORIS-BW klären] |
| Ditzingen | 3.686 €/m² (2025: 3.818) | 4.065,13 €/m² | 3.843 €/m² (+0,64 %) | über 4.000 €/m², 3.590 bis 6.525 €, 101 Angebote | nicht abgerufen |
| Renningen | 4.986 €/m² (2025: 5.574; vermutlich Neubau-Ausreißer) | 4.054,25 €/m² | 3.882 €/m² (+1,33 %) | über 4.030 €/m², 3.667 bis 6.177 €, 100 Angebote | nicht abgerufen |
| Pforzheim | 2.928 €/m² (2025: 2.939) | 3.010,44 €/m² | 2.941 €/m² (−0,15 %) | Regionalseite nicht erreichbar; certa Q1 2026: 3.023 €/m², Spanne 1.951 bis 4.519 € [9] | nicht abgerufen |

Zum Vergleich: Der Gutachterausschuss Stuttgart nennt für weiterverkaufte Eigentumswohnungen rund 4.250 €/m² (Februar 2026) [12] [ZU PRÜFEN: Pressemeldung im Volltext]. Das ist eine amtliche Zahl aus Kaufverträgen.

Die Portale bieten Stuttgart um 4.800 €/m² an [8]. Dieser Abstand zwischen Angebot und Abschluss ist der Grund, warum ich Portalwerte nie als Marktwert bezeichne.

Renningen fällt bei immoportal auf. 4.986 €/m² passt nicht zu den 3.882 bis 4.054 €/m² der anderen Quellen; der Wert wird von Neubauangeboten in Malmsheim oder am Ortsrand getragen [5]. Für eine Wohnung aus den 1980er Jahren ist diese Zahl kein Maßstab.

**Pforzheim nach Stadtteilen** (Angebotspreise, immoverkauf24/Sprengnetter, Q2 2026) [6]:

| Stadtteil | €/m² | Stadtteil | €/m² |
|---|---|---|---|
| Buckenberg | 3.262,81 | Au | 2.976,00 |
| Südoststadt | 3.127,89 | Nordstadt | 2.949,12 |
| Büchenbronn | 3.107,00 | Huchenfeld | 2.925,40 |
| Südweststadt | 3.079,12 | Innenstadt | 2.874,00 |
| Dillweißenstein | 3.008,60 | Weststadt | 2.863,71 |
| Brötzingen | 3.008,44 | Oststadt | 2.862,11 |
| Eutingen | 3.000,78 | Hohenwart | 2.647,60 |

Die Spanne innerhalb der Stadt ist größer als die zwischen den Portalen: Buckenberg liegt rund 23 % über Hohenwart. Modernisierte Altbauwohnungen an der Östlichen Karl-Friedrich-Straße werden laut certa bis 4.500 €/m² angeboten, in Huchenfeld beginnen Angebote bei 2.000 €/m² [9]. Für Leonberger Stadtteile wie Eltingen oder Ramtel gibt es keine getrennten Portaldaten.

<a id="verfahren"></a>
### Wie ich bewerte: Vergleichswert mit Daten des Gutachterausschusses

Der Verkehrswert ist der Preis, der am Stichtag im gewöhnlichen Geschäftsverkehr ohne Rücksicht auf ungewöhnliche oder persönliche Verhältnisse zu erzielen wäre (§ 194 BauGB) [1].

Für Eigentumswohnungen ist das Vergleichswertverfahren das Verfahren der Wahl: Kaufpreise vergleichbarer Wohnungen, angepasst an die Unterschiede (§ 15 ImmoWertV) [2]. Bei vermieteten Wohnungen rechne ich zusätzlich den Ertragswert mit der tatsächlichen und der ortsüblichen Miete, weil Anleger so rechnen. Das Sachwertverfahren spielt bei Wohnungen kaum eine Rolle.

Die Daten kommen aus vier Schichten. Erstens die Kaufpreissammlung und der Marktbericht des Gutachterausschusses: für Leonberg der Ausschuss der Stadt am Belforter Platz 1, für Heimsheim der Gemeinsame Gutachterausschuss im Enzkreis in Mühlacker, für Pforzheim der städtische Ausschuss, dessen letzter online verfügbarer Marktbericht aus 2021/22 stammt [11]. Zweitens Portaldaten mit Datum. Drittens meine Besichtigung: Grundriss, Zustand, Licht, Lärm, Treppenhaus, Keller, Heizraum. Viertens die Unterlagen der Gemeinschaft.

Das Ergebnis ist eine schriftliche Preisspanne mit Begründung, kein Wert auf den Euro.

<a id="vier-preise"></a>
### Vier Preise, die oft verwechselt werden

**Der Wunschpreis** ist die Zahl im Kopf des Eigentümers: Kaufpreis von damals, der angebliche Preis des Nachbarn, das nächste Zuhause. Er ist legitim, aber keine Bewertung.

**Der Marktwert** ist der Verkehrswert nach § 194 BauGB, abgeleitet aus Vergleichsabschlüssen. Ich schätze ihn als Spanne; ein Sachverständiger ermittelt ihn im Gutachten.

**Der Angebotspreis** steht im Inserat. Er liegt meist am oberen Rand der Spanne. Laut einer Maklerumfrage vom Oktober 2026 halten rund 70 % der Befragten die Angebotspreise für 10 bis 30 % überhöht, und mehr als die Hälfte der Objekte ist länger als sechs Monate in der Vermarktung [23] [ZU PRÜFEN: Urheber und Stichprobe der Umfrage]. Nach Monaten fragen Käufer, was mit der Wohnung nicht stimmt.

**Der Verkaufspreis** steht im Notarvertrag. Nur er zählt am Ende, und nur er landet in der Kaufpreissammlung des Gutachterausschusses. Mein Verkaufsplan trennt diese vier Zahlen ausdrücklich.

<a id="faktoren"></a>
### Die zwölf Preisfaktoren einer Eigentumswohnung

| Nr. | Faktor | Wirkung | Beispiel aus der Region | Quelle |
|---|---|---|---|---|
| 1 | Lage und Stadtteil | Innerhalb einer Stadt größere Unterschiede als zwischen Portalen | Pforzheim: Buckenberg 3.263 €/m², Hohenwart 2.648 €/m² | [6] |
| 2 | Geschoss und Aufzug | Erdgeschoss niedriger als 1. OG, Garten gleicht aus; obere Geschosse ohne Aufzug im Altbau mit Abschlag | Anlagen der 1960er bis 1980er Jahre in Leonberg-Ramtel und Ditzingen haben oft keinen Aufzug; ab dem dritten Stock fallen ältere Käufer weg [LINUS: Beobachtung bestätigen] | [3] |
| 3 | Balkon, Himmelsrichtung | Nordbalkon weniger wert als Südbalkon; Außenflächen zählen bis zu 25 % zur Wohnfläche | Südwestbalkon ins Grüne in Heimsheim gegen Nordloggia zur Straße | [3] |
| 4 | Stellplatz und Tiefgarage | Eigener Preisbestandteil, in Pendlerorten gefragt | In Leonberger und Ditzinger Inseraten regelmäßig als Argument genannt | eigene Beobachtung |
| 5 | Baujahr und Restnutzungsdauer | Bei 100 Jahren Gesamt- und 75 Jahren Restnutzungsdauer rechnerisch 25 % Alterswertminderung (Sachwertlogik) | Baujahr 1986 in der Pforzheimer Südweststadt gegen 2016 in Renningen-Malmsheim | [3] |
| 6 | Zahl der Wohneinheiten | Mehr als 20 Einheiten tendenziell niedriger | Großanlagen am Buckenberg gegen Sechsfamilienhaus in Hirschlanden | [3] |
| 7 | Ausstattung und Modernisierung | Sanierung rund +10 %, Modernisierungsstau −5 bis −15 % (Beispielwerte) | Bad und Elektrik aus dem Baujahr sind bei Wohnungen der 1970er Jahre ein häufiger Abschlag | [4] |
| 8 | Energieklasse | Gegenüber Klasse D: A+ +20 %, A +15 %, H −9 % (bundesweite Angebotsdaten); G und H seit 2021 je −12 % | Gegeneffekt in Pforzheim mit vielen Klassen F bis H: Familien bekommen dafür KfW 308 zu 1,00 % [24] | [14] |
| 9 | Hausgeld | Käufer rechnen den nicht umlagefähigen Teil als laufende Kosten ein | Inserat Hirschlanden: 79 m², 390 € Hausgeld im Monat (4,94 €/m²); mit 279.000 € oder 3.532 €/m² unter allen Portalmitteln für Ditzingen | [27] |
| 10 | Rücklage und Sonderumlage | Rücklage geht mit der Wohnung über; nach Übergang fällige Sonderumlagen trägt der Käufer | Rechenbeispiel unten | [17] |
| 11 | Klima der Gemeinschaft | Streit, fehlender Verwalter, Sanierungsstau senken den Preis; aktuelle Protokolle stützen ihn | Käufer lesen die letzten drei Protokolle, bevor sie ein Angebot machen | [4] |
| 12 | Vermietet oder frei | Stuttgart: vermietete Wohnungen 12 % günstiger angeboten (2025); pauschale 30 % sind nicht belegt | Für Leonberg und Pforzheim gibt es keine eigene Auswertung | [13] |

#### Rücklage und Sonderumlage in Euro

Ein Beispiel mit erfundenen, aber typischen Zahlen. Ausgangsspanne für eine Wohnung in Ditzingen: 280.000 bis 295.000 €. Der Vermögensbericht (§ 28 Abs. 4 WEG) weist für diese Wohnung 8.000 € Rücklagenanteil aus. Dieses Geld bekommen Sie beim Verkauf nicht ausgezahlt; es bleibt in der Gemeinschaft und steht dem Käufer zur Verfügung [17]. Es stützt den Preis, aber Käufer zahlen selten den vollen Euro dafür.

Dazu ist eine Sonderumlage von 12.000 € für diese Wohnung beschlossen, fällig sechs Monate nach dem voraussichtlichen Übergang. Maßgeblich ist die Fälligkeit, nicht der Beschluss (BGH, 15.12.2017, V ZR 257/16) [18]. Die Umlage trifft also den Käufer, und er zieht sie vom Angebot ab. Aus 280.000 bis 295.000 € werden realistisch 268.000 bis 283.000 €. Sie können die Umlage vorher selbst zahlen und den vollen Preis verlangen oder sie offen ausweisen und den Preis anpassen. Was nicht funktioniert: hoffen, dass niemand die Protokolle liest.

<a id="vergleich"></a>
### Online-Rechner, meine Einschätzung, Gutachten im Vergleich

| | Online-Rechner | Meine Einschätzung | Verkehrswertgutachten |
|---|---|---|---|
| Kosten | kostenlos | kostenlos | etwa 500 bis 2.000 €, Honorar frei vereinbar [19] |
| Dauer | Minuten | zwei Werktage, enger nach Termin vor Ort | Wochen |
| Datenbasis | Angebotsdaten, ohne Gebäude und Gemeinschaft | Gutachterausschuss, Portaldaten mit Datum, Besichtigung, WEG-Unterlagen | Kaufpreissammlung, Ortstermin, alle Unterlagen, Verfahren nach ImmoWertV |
| Grenzen | Sechs Portale, sechs Werte [20] [ZU PRÜFEN: Vergleich vor Zitat prüfen]; Hausgeld, Rücklage, Sonderumlage bleiben außen vor | interessengeleitet; nicht gerichtsfest; keine Steuerwirkung | teuer, dauert, für einen normalen Verkauf überflüssig |
| Geeignet für | eine erste Idee des Korridors | Verkaufsentscheidung, Angebotspreis, Erbengemeinschaft ohne Streit, Trennung mit Einigungswillen | Finanzamt, Gericht, Bank, Betreuungsgericht, Streit |

Eine Maklereinschätzung ist nicht neutral. Ich verdiene am Verkauf. Das könnte mich verleiten, hoch zu schätzen, um den Auftrag zu bekommen, oder niedrig, um schnell fertig zu sein. Mein Mittel dagegen ist die schriftliche Begründung: Sie sehen jede Vergleichszahl mit Quelle und Datum und können sie prüfen.

<a id="gutachten"></a>
### Wann ist ein Gutachten Pflicht?

Ein Vollgutachten eines öffentlich bestellten oder zertifizierten Sachverständigen brauchen Sie, wenn jemand anderes als Sie und der Käufer den Wert anerkennen muss [3]:

- **Erbfall mit Finanzamt.** Das Finanzamt bewertet Eigentumswohnungen vorrangig im Vergleichswertverfahren mit den Preisen der Gutachterausschüsse; der Bundesfinanzhof hat das am 11. März 2026 bestätigt (II R 6/23) [15]. Einen niedrigeren Wert weisen Sie nur mit einem Gutachten oder einem zeitnahen Verkauf nach (§ 198 BewG). Meine Einschätzung hilft beim Einspruch nicht.
- **Betreuung.** Verkauft ein Betreuer die Wohnung eines Betreuten, braucht er die Genehmigung des Betreuungsgerichts (§ 1850 BGB) [26]. Das Gericht will in der Regel einen Wertnachweis sehen.
- **Gericht.** Strittige Scheidung mit Zugewinnausgleich, Erbstreit, Teilungs- oder Zwangsversteigerung.
- **Bank, Betriebsvermögen, Baumängel.** Beleihung, Einlage ins Betriebsvermögen, Wertminderung durch Mängel.

Ein Kurzgutachten ist günstiger, aber nicht gerichtsfest. Wenn Sie einen Sachverständigen brauchen, nenne ich Ihnen einen und nehme dafür nichts. [LINUS: Welchen Sachverständigen für die Region empfehlen Sie? Ohne Namen Satz streichen.]

<a id="unterlagen"></a>
### Welche Unterlagen brauche ich für die Bewertung?

Für die Ersteinschätzung reichen Ihre Angaben im Formular. Für die Spanne im Verkaufsplan brauche ich:

- Teilungserklärung mit Aufteilungsplan und Gemeinschaftsordnung
- Wirtschaftsplan und letzte Jahresabrechnung
- Protokolle der letzten drei Eigentümerversammlungen und die Beschluss-Sammlung
- Vermögensbericht mit Ihrem Anteil an der Erhaltungsrücklage
- Energieausweis des Gebäudes
- Grundriss und Wohnflächenberechnung
- bei vermieteten Wohnungen Mietvertrag, letzte Mieterhöhung, Betriebskostenabrechnung

Etwa die Hälfte davon hat die Hausverwaltung. Den Rest fordere ich mit Ihrer Vollmacht an. Die vollständige Liste mit Bezugsquelle steht im Ratgeber [Eigentumswohnung verkaufen](/ratgeber/eigentumswohnung-verkaufen/).

<a id="markt"></a>
### Marktlage im Herbst 2026

**Zinsen.** Zehnjährige Baufinanzierungen kosten Ende Oktober 2026 rund 4,2 bis 4,5 %: Dr. Klein nennt 4,20 % (29.10.2026), Interhyp im Schnitt 4,42 % (15.10.2026), vor einem Jahr lag der Topzins bei 3,38 %. Für einen Kredit von 350.000 € sind das rund 240 € mehr Monatsrate als im Herbst 2025 [22].

**Preise.** Der Häuserpreisindex des Statistischen Bundesamts lag im zweiten Quartal 2026 um 0,6 % über dem Vorjahr. Eigentumswohnungen in den sieben Metropolen (Top 7), Stuttgart eingeschlossen, lagen 0,4 % darunter, in kreisfreien Großstädten 2,0 % darüber, in dicht besiedelten ländlichen Kreisen 1,8 % darunter [21]. Kurz: Wohnungen stabil, keine Richtung, auf die man einen hohen Angebotspreis stützen könnte.

**Vermarktungsdauer.** Im ersten Quartal 2026 lag sie für Eigentumswohnungen in 24 deutschen Städten bei rund 90 Tagen [23].

Gegen den Zinseffekt wirkt die KfW: Familien bekommen für Wohnungen der Klassen F bis H bis zu 180.000 € zu 1,00 % aus dem Programm 308 [24].

Seit dem 29. Juli 2026 gibt es keine Pflicht mehr, alte Heizungen auszutauschen [25]. Das entlastet Wohnungen der Baujahre 1960 bis 1990 mit Gaszentralheizung. Tabelle und Marktlage aktualisiere ich quartalsweise.

<a id="faq-wert"></a>
### Häufige Fragen zum Wert

<!-- FAQPage-Schema, Block 2 -->

**Ist Verkehrswert gleich Kaufpreis?**
Nein. Der Verkehrswert ist der am Stichtag wahrscheinlichste Preis (§ 194 BauGB) [1], der Kaufpreis das Verhandlungsergebnis. Beide können auseinanderliegen.

**Ist eine freie Wohnung mehr wert als eine vermietete?**
In der Regel ja. In Stuttgart wurden vermietete Wohnungen 2025 um 12 % günstiger angeboten als freie [13]. Eine Miete nahe Marktniveau verkleinert den Abstand, eine Altmiete weit darunter vergrößert ihn.

**Wie wirken Hausgeld, Rücklage und Sonderumlage?**
Hohe nicht umlagefähige Kosten und fällige Sonderumlagen senken den Preis, eine gefüllte Rücklage stützt ihn [17]. Das Beispiel oben zeigt es in Euro.

**Brauche ich für das Finanzamt ein Gutachten?**
Wenn Sie einen niedrigeren Wert als den vom Finanzamt angesetzten nachweisen wollen, ja (§ 198 BewG) [16]. Meine Einschätzung reicht dafür nicht.

**Was kostet der Quadratmeter in Pforzheim-Buckenberg oder Leonberg-Eltingen?**
Buckenberg: 3.262,81 €/m² Angebotspreis (Q2 2026) [6]. Für Leonberger Stadtteile gibt es keine getrennten Portaldaten; die Antwort kommt aus dem Marktbericht des Gutachterausschusses.

**Wie genau ist eine Online-Bewertung?**
Sie liefert einen Korridor aus Angebotsdaten. Gebäude, Hausgeld und Gemeinschaft bleiben außen vor. Als erste Idee brauchbar, als Angebotspreis nicht.

## Hinweis

Ich erstelle keine Verkehrswertgutachten und erbringe keine Steuer- oder Rechtsberatung, auch nicht zum Wert für das Finanzamt oder zur Genehmigung durch ein Betreuungsgericht. Alle Preise auf dieser Seite sind Angebotspreise mit dem genannten Stand, nicht der Marktwert Ihrer Wohnung. Meine Einschätzung ist interessengeleitet; deshalb begründe ich sie schriftlich.

## Nächster Schritt

Zwei Portale, zwei Zahlen? Ich schaue mir Wohnung, Gebäude und Unterlagen an und sage Ihnen, wo Ihre Wohnung in Leonberg, Ditzingen oder Pforzheim steht.

**[Button: Wohnung kostenlos einschätzen lassen → #formular]**
Rückruf innerhalb eines Werktags, schriftliche Einschätzung innerhalb von zwei Werktagen. Keine Weitergabe an Portale oder Dritte.

**[Button: Anrufen → tel:+4915905844641]**
Linus Rössler, Telefon 0159 05844641, auch abends.

## Vor Ort

- [Wohnung verkaufen in Leonberg](/wohnung-verkaufen/leonberg/): 3.733 bis 4.043 €/m² je nach Portal, Bodenrichtwert 766 €/m².
- [Wohnung verkaufen in Pforzheim](/wohnung-verkaufen/pforzheim/): 2.928 bis 3.023 €/m², Stadtteile von 2.648 bis 3.263 €/m².
- [Wohnung verkaufen in Ditzingen](/wohnung-verkaufen/ditzingen/): 3.686 bis 4.065 €/m², mit Hirschlanden, Heimerdingen und Schöckingen.
- [Wohnung verkaufen in Renningen](/wohnung-verkaufen/renningen/): 3.882 bis 4.054 €/m² ohne den Neubau-Ausreißer.
- [Wohnung verkaufen in Heimsheim](/wohnung-verkaufen/heimsheim/): 3.212 bis 3.623 €/m², Gutachterausschuss in Mühlacker.

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
9. certa Gutachten, Marktbericht Pforzheim Q1 2026 (22.04.2026, aktualisiert 06.07.2026): ETW Ø 3.023 €/m², Spanne 1.951 bis 4.519 €/m², Stadtteilwerte. https://www.certa-gutachten.de/marktberichte/pforzheim-q1-2026
10. Bodenrichtwerte (Aggregator, Stichtag 01.01.2025): Leonberg 766 €/m², Heimsheim 235 €/m². https://www.bodenrichtwerte-deutschland.de/boris/bw/leonberg ; https://www.bodenrichtwerte-deutschland.de/boris/bw/heimsheim ; abweichend miete-aktuell.de für Heimsheim ca. 732 €/m²: https://www.miete-aktuell.de/bodenrichtwert-grundstueckspreise/Heimsheim/Heimsheim/ [ZU PRÜFEN: amtlich über BORIS-BW]
11. Gutachterausschüsse: Stadt Leonberg, Belforter Platz 1, 71229 Leonberg, gutachterausschuss@leonberg.de, 07152 990-3119, https://www.leonberg.de/Rathaus/Verwaltung/Gutachterausschuss ; Zweckverband Gemeinsamer Gutachterausschuss im Enzkreis, Mühlacker, gutachter@gua-enzkreis.de ; Stadt Pforzheim, Immobilienmarktbericht 2021/22: https://www.pforzheim.de/fileadmin/user_upload/bauen/Gutachterausschuss/Immobilienmarktbericht_2021_22_Internet.pdf [ZU PRÜFEN: aktuelle Marktberichte anfordern; Zuständigkeit Ditzingen und Renningen]
12. Landeshauptstadt Stuttgart, Gutachterausschuss, Februar 2026: Durchschnittspreis weiterverkaufte Eigentumswohnungen rund 4.250 €/m² (laut Suchergebnis). https://www.stuttgart.de/service/aktuelle-meldungen/2026/februar/stuttgarter-immobilienmarkt-weiterhin-im-aufwind-gutachterausschuss-stellt-neue-auswertung-vor [ZU PRÜFEN: Volltext]
13. ImmoScout24, Pressemitteilung 10.11.2025, „Vermietete Eigentumswohnungen bis zu 33 Prozent günstiger als unvermietete“: Stuttgart 12 % (Medianpreise Juli bis Oktober 2025). https://www.immobilienscout24.de/unternehmen/news-medien/news/default-title/vermietete-eigentumswohnungen-bis-zu-33-prozent-guenstiger-als-unvermietete/
14. Immowelt-Analyse 19.03.2026 (A+ +20 %, A +15 %, H −9 % gegenüber D) und ImmoScout24 (G und H je −12 % seit 2021), zitiert nach reduco.ai: https://reduco.ai/blog/energieausweis/energieausweis-wohnung-eigentumswohnung [ZU PRÜFEN: Primärquellen]
15. BFH, Urteil vom 11.03.2026, II R 6/23: Eigentumswohnungen für die Erbschaftsteuer vorrangig im Vergleichswertverfahren mit Preisen der Gutachterausschüsse; Ebner Stolz, 29.06.2026 (laut Suchergebnis) [ZU PRÜFEN: Volltext und Fundstelle]
16. § 198 BewG, Nachweis des niedrigeren gemeinen Werts durch Gutachten oder zeitnahen Verkauf. https://www.gesetze-im-internet.de/bewg/__198.html [ZU PRÜFEN: Wortlaut, Jahresfrist]
17. § 28 Abs. 4 WEG (Vermögensbericht), § 19 Abs. 2 Nr. 4 WEG (angemessene Erhaltungsrücklage); Rücklage bleibt in der Gemeinschaft und geht auf den Käufer über, kein Rückzahlungsanspruch: ImmoScout24-Lexikon Instandhaltungsrücklage; Hinweis der Notarkammer zu fehlender Rücklage und Sonderumlagenrisiko (notar.de, PDF, laut Suchergebnis). https://www.gesetze-im-internet.de/woeigg/
18. BGH, Urteil vom 15.12.2017, V ZR 257/16: Für die Zahlungspflicht einer Sonderumlage ist die Fälligkeit maßgeblich, nicht der Beschluss; zitiert nach reduco.ai, „Wohnung verkaufen: Ablauf“: https://reduco.ai/blog/immobilienverkauf/wohnung-verkaufen-ablauf [ZU PRÜFEN: Volltext]
19. Kosten Verkehrswertgutachten: ca. 500 bis 2.000 € (bodenrichtwerte-deutschland.de); ImmoScout24-Kostentabelle 2.000 € bei 200.000 € Kaufpreis; Honorar frei vereinbar. https://www.immobilienscout24.de/wissen/verkaufen/wohnung-verkaufen.html
20. portimmo.de, Vergleich von sechs Online-Bewertungen mit sechs verschiedenen Ergebnissen (laut Suchergebnis) [ZU PRÜFEN: vor Veröffentlichung Seite und Zahlen prüfen]
21. Statistisches Bundesamt, Pressemitteilung Nr. 336 vom 24.09.2026, Häuserpreisindex 2. Quartal 2026: +0,6 % zum Vorjahr; Eigentumswohnungen Top-7 −0,4 %, kreisfreie Großstädte +2,0 %, dicht besiedelte ländliche Kreise −1,8 %. https://www.destatis.de/DE/Presse/Pressemitteilungen/2026/09/PD26_336_61262.html
22. Bauzinsen: Dr. Klein Topzins 10 Jahre 4,20 % (29.10.2026; Oktober 2025: 3,38 %), https://www.drklein.de/zinsen.html ; Interhyp Durchschnitt 4,42 % (15.10.2026), https://www.interhyp.de/zinsen/ ; Mehrbelastung ca. 230 €/Monat bei 350.000 € Kredit: eigene Rechnung aus der Zinsdifferenz von 0,82 Prozentpunkten (350.000 € × 0,82 % ÷ 12 = 239 €)
23. Vermarktungsdauer: GREIX/IfW Kiel, Eigentumswohnungen Q1 2026 rund 90 Tage in 24 Städten, zitiert nach reduco.ai [ZU PRÜFEN: Primärquelle]; Hausgold-Auswertung für das Handelsblatt, Januar bis Mai 2026: https://www.handelsblatt.com/finanzen/immobilien/immobilien-in-welchen-staedten-finden-eigentuemer-am-schnellsten-einen-kaeufer/100260831.html (Paywall); Maklerumfrage Oktober 2026 (54,3 % der Objekte länger als sechs Monate, 70 % halten Angebotspreise für 10 bis 30 % überhöht): https://ad-hoc-news.de/wirtschaft/immobilienmarkt-54-3-prozent-der-verkaeufe-dauern-laenger-als-sechs-monate/70395215 [ZU PRÜFEN: Urheber und Stichprobe]
24. KfW-Programm 308 „Jung kauft Alt“: seit 03.08.2026 bis zu 140.000 / 160.000 / 180.000 €, 1,00 % effektiv (35 Jahre), nur Energieausweis Klasse F, G oder H, Antrag vor dem Notarvertrag. https://www.baukostenplan.de/ratgeber/kfw-308-jung-kauft-alt-2026-neue-kreditbetraege (Stand 07.10.2026) [ZU PRÜFEN: Zins tagesaktuell]
25. Gebäudemodernisierungsgesetz (GModG), in Kraft seit 29.07.2026: Streichung der 65-%-Pflicht und des Betriebsverbots für über 30 Jahre alte Kessel. https://www.bundesregierung.de/breg-de/aktuelles/neues-gebaeudemodernisierungsgesetz-2430284
26. § 1850 BGB, Genehmigung des Betreuungsgerichts für Verfügungen über Grundstücke. https://www.gesetze-im-internet.de/bgb/__1850.html (abgerufen 29.10.2026)
27. Beispielinserat Ditzingen-Hirschlanden, 3,5 Zimmer, 79 m², 279.000 €, Hausgeld 390 €/Monat (laut Suchergebnis, Oktober 2026); 279.000 ÷ 79 = 3.532 €/m²; 390 ÷ 79 = 4,94 €/m² und Monat.
28. Vergütungsvereinbarung Rössler Immobilien: 2,98 % des Kaufpreises inkl. Umsatzsteuer je Seite, nur bei Notarvertrag; Textform des Maklervertrags § 656a BGB; Widerrufsrecht bei Verträgen im Fernabsatz oder außerhalb von Geschäftsräumen. https://www.gesetze-im-internet.de/bgb/__656a.html

<!-- Fragen an Linus:
- Marktberichte der Gutachterausschüsse: Haben Sie sie angefordert? Welche Kosten wurden genannt? Welcher Ausschuss ist für Ditzingen und Renningen zuständig?
- Faktor 4 Stellplatz: typischer Aufpreis für einen Tiefgaragenplatz in der Region? Dann als Zahl in die Tabelle.
- Rücklage: Wie honorieren Käufer in der Region eine gefüllte Rücklage? Erfahrungswert für das Rechenbeispiel.
- Checkliste „Unterlagen für die Bewertung“ als PDF (ohne E-Mail-Pflicht) war als Download unter /wohnung-bewerten/checkliste-unterlagen.pdf geplant. Der Pfad steht nicht im Seitenplan; Link entfernt. Soll das PDF entstehen? Dann Seitenplan ergänzen und Link wieder einsetzen.
- „auch abends“ im End-CTA und im Formular: hängt an derselben Zusage wie der sichtbare Marker unter „So geht es weiter“.
-->

<!-- Prüfpunkte:
- Zuständiger Gutachterausschuss für Ditzingen (Landkreis Ludwigsburg) und Renningen (Landkreis Böblingen).
- BFH II R 6/23 vom 11.03.2026: Volltext prüfen.
- § 198 BewG: Wortlaut und Jahresfrist prüfen.
- Praxis der Betreuungsgerichte Leonberg, Pforzheim und Ludwigsburg zum Wertnachweis.
- Quelle Bauzinsen: Quellentext nennt „ca. 230 €/Monat“, Seitentext und Rechnung 239 € („rund 240 €“). Angleichen.
-->
