# Feedback zu „Maklerauftrag zum Verkauf“, Seestraße 53, Hemmingen, Fassung v4

Geprüft am 07.11.2026 von Claude (Session „Roessler Immo property sale“). Grundlage: `Maklervertrag_Seestrasse53_v4.docx` (Textexport in `v4-text.md`), `bauplan/fakten.yaml`, `expose/rechtstexte/maklervertrag-kaeufer.md`, `recherche/expose/recherche.md`, `analyse-aktuelle-webseite/07-recht-erlaubnis.md`.

**Keine Rechtsberatung.** Eine anwaltliche Prüfung ist vor dem ersten Einsatz nicht möglich (Annika, 07.11.2026). Deshalb ist das Ziel dieser Runde: alles, was aus Gesetz und BGH-Rechtsprechung eindeutig folgt, muss sitzen; alles Strittige wird so formuliert, dass es im Zweifel für den Verbraucher ausgeht (dann ist es als AGB am wenigsten angreifbar).

## Für Codex: so bitte vorgehen

1. Befunde **A1 bis A4** umsetzen (Pflicht vor Einsatz), **B1 bis B7** umsetzen, soweit nicht ausdrücklich „optional“.
2. Stil beibehalten: kurze Absätze, keine Aufzählungen mit Spiegelstrichen im Vertragstext, keine Fachwort-Ketten, kein „der Auftraggeber verpflichtet sich hiermit unwiderruflich“. Der Vertrag soll weiter wie von einem Menschen geschrieben wirken. Die Vorschlagstexte unten sind in diesem Stil, sie dürfen übernommen oder sprachlich angepasst werden, solange der Inhalt gleich bleibt.
3. Layout nicht ändern (Schrift, Ränder, Fußzeile „Seestraße 53 Seite n / 4“, eine Unterschrift pro Auftraggeber, eigene Seite für das freiwillige Verlangen). Wenn der Text länger wird, lieber fünf Seiten als engere Zeilen.
4. Ergebnis als `Maklervertrag_Seestrasse53_v5.docx` in diesen Ordner, dazu `aenderungen-v5.md` mit je einer Zeile pro Befund: umgesetzt / abweichend umgesetzt (wie) / nicht umgesetzt (warum). Danach prüft Claude v5 noch einmal.
5. Nichts erfinden: Werte, die nur Linus kennt (Kleinunternehmer ja/nein, Provisionssatz, Angebotspreis), bleiben als Lücke oder Frage stehen, siehe „Offene Fragen an Linus“.

## Gesamturteil

Der Vertrag ist für einen Entwurf ohne Anwalt gut. Er ist kurz, verständlich, verzichtet auf die üblichen Fallen (keine Vertragsstrafe, kein Aufwendungsersatz, kein qualifizierter Alleinauftrag, keine automatische Verlängerung, kein Reservierungsgeld) und hat die Pflichtteile für Verbraucherverträge dabei: Widerrufsbelehrung nach dem gesetzlichen Muster, Muster-Widerrufsformular, getrenntes und freiwilliges Verlangen nach vorzeitigem Beginn, § 656c-Hinweis zur Halbteilung. Das Layout ist ruhig und seriös und soll so bleiben.

Was fehlt, sind vier Dinge, die bei genau dieser Konstellation (drei Miterben, Verbraucher, Kleinunternehmer, Provision erst beim Notar) im Streitfall Geld kosten: die Provision ist nicht mit den übrigen Unterlagen abgestimmt (A1), die drei Auftraggeber haften nicht klar gemeinsam (A2), Zustandekommen und Widerruf bei drei Personen sind nicht geregelt (A3), und für Käufer, die der Makler nachgewiesen hat und die erst nach Vertragsende kaufen, fehlt ein Satz (A4).

## A: vor dem ersten Einsatz ändern

### A1 Provision passt nicht zu Website und Käufervertrag

**Stelle:** Nr. 5, Satz 1 und 2: „3 % des beurkundeten Kaufpreises als Endbetrag. Aufgrund der Kleinunternehmerregelung nach § 19 UStG wird keine Umsatzsteuer berechnet.“

**Problem:** Überall sonst im Projekt steht „2,98 % des Kaufpreises einschließlich Umsatzsteuer je Seite“ (`bauplan/fakten.yaml` → `provision.satz`, Live-Seite, Ratgeber Maklerprovision, Käufervertrag `expose/rechtstexte/maklervertrag-kaeufer.md` Nr. 2). Beides zugleich geht nicht:

- Nach § 656c Abs. 1 BGB muss der Käufer (Verbraucher) **genau** so viel zahlen wie der Verkäufer, sonst ist der Käufervertrag unwirksam (§ 656c Abs. 2). Zahlt die Erbengemeinschaft 3 % ohne USt, muss der Käufer der Seestraße 53 ebenfalls 3 % Endbetrag zahlen, nicht 2,98 % inkl. USt.
- Ist Linus Kleinunternehmer, ist „einschließlich Umsatzsteuer“ auf der Website falsch, weil gar keine anfällt. Ist er es nicht, ist der Satz hier falsch.
- Praktisches Risiko: Die Kleinunternehmerregelung fällt weg, sobald der Umsatz im laufenden Jahr 100.000 € übersteigt (§ 19 Abs. 1 UStG, ab 2025). Bei zwei bis drei Verkäufen mit beiden Seiten ist das erreichbar. Dann wäre ein Vertrag, der „keine Umsatzsteuer“ verspricht, für Linus teuer.

**Vorschlag:** Erst Frage 1 unten klären. Danach einen Satz einsetzen, der den Betrag für die Auftraggeber unabhängig vom Steuerstatus festschreibt:

> Bei Abschluss eines wirksamen notariellen Kaufvertrags infolge des Nachweises oder der Vermittlung des Maklers zahlen die Auftraggeber als Gesamtschuldner eine Provision von [3 %] des beurkundeten Kaufpreises. Dieser Betrag ist ein Endbetrag; eine etwaige Umsatzsteuer ist darin enthalten. Der Makler ist derzeit Kleinunternehmer nach § 19 UStG und weist in der Rechnung keine Umsatzsteuer aus.

Und in `fakten.yaml`, auf der Website und in der Käufervorlage denselben Satz und dieselbe Formulierung verwenden („Endbetrag“ statt „einschließlich Umsatzsteuer“, falls Kleinunternehmer). Das ist eine eigene Aufgabe außerhalb dieses Vertrags, gehört aber zwingend dazu.

### A2 Drei Auftraggeber, aber keine gemeinsame Haftung

**Stelle:** Nr. 5: „zahlen die Auftraggeber zusammen eine Provision“.

**Problem:** „Zusammen“ sagt nicht, ob jeder Erbe nur seinen Anteil (zum Beispiel ein Drittel) oder den ganzen Betrag schuldet. Im Streit müsste Linus sonst drei Teilbeträge einzeln einklagen, und wenn ein Erbe nicht zahlt, fehlt das Geld. Bei Erbengemeinschaften ist das der Normalfall für Ärger.

**Vorschlag:** „zusammen“ durch „als Gesamtschuldner“ ersetzen (siehe Text in A1). Das ist ein üblicher, verständlicher Rechtsbegriff: jeder haftet für den ganzen Betrag, Linus darf sich aussuchen, von wem er ihn verlangt; die Erben gleichen intern aus. Zusätzlich in Nr. 1 nach der Liste ein Satz:

> Die Auftraggeber bilden die Erbengemeinschaft nach [Name der Erblasserin/des Erblassers] und erklären, dass es keine weiteren Miterben gibt.

Grund: Der Verkauf braucht alle Miterben (§ 2040 BGB). Fehlt einer, läuft die ganze Vermarktung ins Leere. Der Satz zwingt die drei, das vorher zu klären. Name der Erblasserin/des Erblassers als Lücke lassen.

### A3 Zustandekommen und Widerruf bei drei Personen

**Stelle:** Nr. 3 Absatz 2: „Der Auftrag kommt zustande, sobald alle drei Auftraggeber und der Makler in Textform zugestimmt haben.“ Nr. 6 mit vier Unterschriftszeilen.

**Problem:** Beides zusammen ist widersprüchlich: Nr. 3 sagt E-Mail reicht, Nr. 6 sieht Unterschriften vor. Außerdem fehlt die Antwort auf die naheliegende Frage: Was ist, wenn nur zwei unterschreiben, oder einer von dreien innerhalb der 14 Tage widerruft? Dann kann Linus nicht verkaufen, hätte aber einen Vertrag mit den anderen beiden und müsste womöglich weiterarbeiten.

**Vorschlag für Nr. 3 Absatz 2:**

> Der Vertrag kommt zustande, wenn alle drei Auftraggeber und der Makler ihn unterschrieben oder ihre Zustimmung in Textform, zum Beispiel per E-Mail, erklärt haben. Er läuft ab diesem Zeitpunkt sechs Monate und endet ohne automatische Verlängerung. Eine Fortsetzung wird in Textform vereinbart. Das Recht zur Kündigung aus wichtigem Grund bleibt bestehen.

**Neuer Absatz in Nr. 3 (am Ende):**

> Widerruft oder kündigt einer der Auftraggeber, kann der Makler den Vertrag auch gegenüber den übrigen Auftraggebern beenden, weil der Verkauf nur gemeinsam möglich ist. Ansprüche für bis dahin erbrachte Leistungen richten sich nach diesem Vertrag und dem Gesetz.

**Nr. 6 ergänzen:** Jeder Auftraggeber bekommt eine eigene Widerrufsbelehrung ausgehändigt, nicht nur eine Ausfertigung „für alle“. Satz 2 in Nr. 6 so ändern:

> Jeder Auftraggeber erhält eine vollständige Ausfertigung des abgeschlossenen Vertrags einschließlich Widerrufsbelehrung und Muster-Widerrufsformular.

Grund: Die Widerrufsfrist läuft für jeden Verbraucher einzeln und erst ab seiner Belehrung (§ 356 Abs. 3 BGB). Ohne eigene Belehrung läuft sie bis zu zwölf Monate und 14 Tage.

### A4 Provision nach Ende der Laufzeit

**Stelle:** Nr. 3 und Nr. 5, fehlt.

**Problem:** Typischer Fall: Linus zeigt die Wohnung im Monat 5, die Erben lassen den Vertrag im Monat 6 auslaufen und verkaufen im Monat 8 an genau diesen Interessenten. Nach dem Gesetz steht Linus die Provision zu, weil sein Nachweis ursächlich war. Ohne einen Satz im Vertrag muss er das aber beweisen, und die Erben werden sagen, der Vertrag sei doch zu Ende gewesen.

**Vorschlag, neuer Absatz in Nr. 5:**

> Die Provision ist auch dann zu zahlen, wenn der Kaufvertrag erst nach Ende der Laufzeit zustande kommt, der Käufer aber vom Makler während der Laufzeit nachgewiesen wurde. Zum Ende der Laufzeit nennt der Makler den Auftraggebern in Textform die Interessenten, die er nachgewiesen hat.

Der zweite Satz ist die Beweissicherung. Er ist auch für die Erben fair, weil sie dann wissen, bei wem Provision anfällt und bei wem nicht. Keine Frist („innerhalb von zwölf Monaten“) anfügen; lange Nachwirkungsfristen sind in AGB angreifbar, der schlichte Kausalitätssatz nicht.

## B: sollte vor dem Einsatz hinein

### B1 Unterlagen konkret nennen, vor allem Energieausweis

**Stelle:** Nr. 4 Absatz 2: „Die Auftraggeber stellen vorhandene Unterlagen bereit“.

**Problem:** Der Energieausweis ist keine „vorhandene Unterlage“, sondern Pflicht: Die Pflichtangaben müssen in jeder Anzeige stehen (§ 87 GModG, früher GEG) und der Ausweis muss spätestens bei der Besichtigung vorgelegt werden (§ 80 Abs. 4 GModG). Bußgeldpflichtig ist der Makler mit. Bei einer Erbengemeinschaft fehlt außerdem oft der Nachweis, dass sie überhaupt verkaufen darf.

**Vorschlag, Nr. 4 Absatz 2 ersetzen:**

> Die Auftraggeber stellen die Unterlagen bereit, die für Exposé, Anzeigen und Kaufvertrag nötig sind, insbesondere Teilungserklärung mit Aufteilungsplan, Protokolle der letzten drei Eigentümerversammlungen, aktuellen Wirtschaftsplan und letzte Jahresabrechnung, Grundrisse, Grundbuchauszug, Nachweis der Erbfolge (Erbschein oder notarielles Testament mit Eröffnungsprotokoll) sowie einen gültigen Energieausweis. Fehlt der Energieausweis, darf der Makler ihn im Namen und auf Rechnung der Auftraggeber bestellen, nach Rücksprache über die Kosten. Die Auftraggeber informieren nach bestem Wissen über das Objekt, bekannte Mängel, WEG-Beschlüsse, laufende Verfahren und Sonderumlagen; der Makler darf diese Angaben im Exposé verwenden. Besichtigungen erfolgen nach Absprache. Zur Beschaffung von Unterlagen legen die Auftraggeber die erforderlichen Vollmachten vor.

Der Halbsatz „der Makler darf diese Angaben im Exposé verwenden“ ist wichtig: Wenn ein Käufer später wegen falscher Exposé-Angaben Ärger macht, muss klar sein, dass die Angaben von den Verkäufern stammen.

### B2 Identifizierung nach Geldwäschegesetz

**Stelle:** fehlt.

**Problem:** Linus muss als Makler beide Vertragsparteien identifizieren, die Verkäufer beim Abschluss des Maklervertrags (§ 10 Abs. 1 Nr. 1, § 11 Abs. 1 GwG), per Ausweis und Kopie (§ 8 Abs. 2 GwG). Steht das nicht im Vertrag, kommt die Frage später und wirkt dann misstrauisch.

**Vorschlag, ein Satz am Ende von Nr. 4:**

> Der Makler ist nach dem Geldwäschegesetz verpflichtet, die Auftraggeber anhand eines gültigen Personalausweises oder Reisepasses zu identifizieren und eine Kopie aufzubewahren. Die Auftraggeber legen den Ausweis bei Vertragsschluss vor.

### B3 Datenschutzhinweis

**Stelle:** fehlt.

**Problem:** Art. 13 DSGVO verlangt eine Information bei Erhebung der Daten. Ein Satz mit Verweis reicht, weil die Datenschutzerklärung der Website die Einzelheiten enthält (sobald sie den Abschnitt für Maklerverträge hat, siehe `expose/rechtstexte/datenschutz-expose.md` als Vorbild).

**Vorschlag, Nr. 6 ergänzen:**

> Der Makler verarbeitet die Daten der Auftraggeber zur Durchführung dieses Vertrags (Art. 6 Abs. 1 Buchstabe b DSGVO). Einzelheiten, Speicherdauer und Rechte stehen in den Datenschutzhinweisen unter roessler-immo.de/datenschutz; auf Wunsch händigt der Makler sie auf Papier aus.

### B4 Doppeltätigkeit sauber formulieren

**Stelle:** Nr. 5 Absatz 3.

**Problem:** Inhaltlich richtig, aber es fehlt das Wort, auf das Gerichte achten: Der Makler für beide Seiten muss „unparteiisch“ sein (ehrlicher Makler). Außerdem muss die Käuferprovision zu A1 passen.

**Vorschlag:**

> Der Makler darf auch für den Käufer tätig werden und vereinbart mit ihm eine Provision in gleicher Höhe. Er verhält sich beiden Seiten gegenüber unparteiisch. Ein Erlass oder eine Ermäßigung zugunsten einer Seite wirkt in gleicher Weise zugunsten der anderen Seite (§ 656c BGB).

### B5 Eigener Verkauf: Mitteilungspflicht

**Stelle:** Nr. 3 Absatz 1 und Nr. 5 letzter Absatz.

**Problem:** Der eigene Verkauf bleibt erlaubt, gut. Aber Linus erfährt davon womöglich erst, wenn er den nächsten Besichtigungstermin macht. Ein Satz spart Ärger und ist für die Erben kein Nachteil.

**Vorschlag, Nr. 3 Absatz 1 ergänzen:**

> Verkaufen die Auftraggeber selbst oder nehmen sie Verhandlungen mit einem eigenen Interessenten auf, teilen sie das dem Makler unverzüglich in Textform mit.

### B6 Ansprechpartner der Erbengemeinschaft

**Stelle:** Nr. 2 Absatz 2 („vereinbaren die Auftraggeber mit dem Makler in Textform“).

**Problem:** Bei drei Personen braucht jede Preisänderung drei E-Mails, und bei Widersprüchen ist unklar, was gilt. Optional, aber sehr praktisch.

**Vorschlag, in Nr. 1 nach den drei Auftraggebern eine Zeile:**

> Ansprechpartner, der Erklärungen zum Angebotspreis, zu Besichtigungen und Verhandlungen für alle Auftraggeber abgeben und empfangen darf: ____________________ (Auftraggeber Nr. __). Die Entscheidung über Käufer und endgültigen Kaufpreis treffen alle Auftraggeber gemeinsam.

Der zweite Satz ersetzt dann den letzten Satz in Nr. 2 Absatz 2.

### B7 Vorzeitiger Beginn: drei Fristen, ein Start

**Stelle:** Seite 4, Erklärung zum vorzeitigen Beginn, plus Nr. 3.

**Problem:** Die Erklärung ist richtig aufgebaut (freiwillig, eigene Unterschrift, Kenntnis vom Erlöschen, Hinweis auf Wertersatz). Ein praktischer Punkt fehlt: Unterschreiben nur zwei von drei die Erklärung, darf Linus trotzdem erst nach Ablauf der Frist des dritten beginnen, weil er sonst für diesen ohne Verlangen arbeitet und im Widerrufsfall keinen Wertersatz hat.

**Vorschlag, Satz 2 des Einleitungsabsatzes auf Seite 4 ersetzen:**

> Ohne diese Erklärung aller drei Auftraggeber beginnt der Makler erst nach Ablauf der Widerrufsfrist des letzten Auftraggebers mit der Ausführung des Auftrags.

Dazu, nur als Hinweis für Linus, nicht in den Vertrag: Die 14 Tage laufen pro Person ab dem Tag, an dem sie Vertrag und Belehrung in Händen hat. Bei Unterschrift an drei verschiedenen Tagen also bis 14 Tage nach der letzten.

## C: Kleinigkeiten, optional

- C1 „Muster Widerrufsformular“ (Seite 4) → „Muster-Widerrufsformular“, so heißt es auch in Nr. 6 und in der Belehrung.
- C2 Seite 2 beginnt mit der Zwischenüberschrift „Leistungen und Provision“, Seite 3 mit „Widerrufsbelehrung“, Seite 4 mit „Formular und vorzeitiger Beginn“. Das ist in Ordnung als Seitentitel; nur auf Seite 2 wirkt es wie eine zusätzliche Gliederungsebene über „4 Leistungen und Mitwirkung“. Entweder auf allen Seiten den Seitentitel weglassen (die Fußzeile trägt schon „Seestraße 53“) oder auf Seite 1 ebenfalls einen setzen („Vertrag“). Geschmackssache, Layout sonst unverändert lassen.
- C3 Nr. 1: „Zuständige Erlaubnis- und Aufsichtsbehörde: IHK für München und Oberbayern“ stimmt mit `fakten.yaml` (Bescheid vom 05.11.2026) überein. Nicht ändern.
- C4 Nr. 5 Absatz 2 „mit Entstehung des gesetzlichen Provisionsanspruchs und Rechnungsstellung fällig“ ist korrekt. Wer es noch einfacher will: „Die Provision ist mit Abschluss des notariellen Kaufvertrags verdient und nach Zugang der Rechnung innerhalb von 14 Tagen zu zahlen.“
- C5 Die Widerrufsbelehrung folgt dem gesetzlichen Muster (Anlage 1 zu Art. 246a § 1 Abs. 2 EGBGB) in der Fassung für Dienstleistungen mit Wertersatz-Baustein. Der seit 19.06.2026 geltende Baustein zur Online-Widerrufsfunktion (§ 356a BGB) ist hier **nicht** nötig, weil der Vertrag auf Papier oder per E-Mail geschlossen wird, nicht über eine Website. Sollte der Verkäufer-Vertrag später über die Website geschlossen werden, muss der Baustein aus `expose/rechtstexte/widerrufsbelehrung.md` hinein.
- C6 Rechnung später: Als Kleinunternehmer muss die Rechnung den Hinweis auf § 19 UStG tragen, sonst schuldet Linus die ausgewiesene Steuer trotzdem (§ 14c UStG). Nur Merkposten.

## Was gut ist und bleiben soll

- Einfacher Alleinauftrag mit sechs Monaten, keine Verlängerung, eigener Verkauf erlaubt: das ist die verbraucherfreundlichste Variante und als AGB nicht angreifbar.
- Kein Aufwendungsersatz, Vermarktungskosten beim Makler, keine Vertragsstrafe, kein Reservierungsgeld.
- Freiwilliges Verlangen nach vorzeitigem Beginn auf eigener Seite mit eigener Unterschrift. Genau so verlangt es BGH I ZR 169/19 (Kenntnis vom Erlöschen) und § 357a Abs. 2 BGB (ausdrückliches Verlangen). Viele Makler machen das zur Bedingung; die Freiwilligkeit hier ist die sicherere Lösung.
- Der Satz „Die Entscheidung über Käufer und endgültigen Verkaufspreis bleibt bei den Auftraggebern“ in Nr. 2. Schafft Vertrauen, kostet nichts.
- Sprache: Ich- bzw. Makler-Form, kurze Sätze, keine Definitionen-Orgie. Nicht „verrechtlichen“.

## Offene Fragen an Linus (vor v5 beantworten)

1. **Kleinunternehmer nach § 19 UStG: ja oder nein?** (Steht auch in `FRAGEN-AN-LINUS.md` 1.7 und `LAPTOP-FRAGEBOGEN.md` 1.3.) Davon hängt A1 ab, und zwar für Website, Käufervertrag und diesen Vertrag gleichzeitig.
2. **Provisionssatz als Endbetrag:** 3 % oder 2,98 %? Beide Seiten müssen denselben Satz haben.
3. **Name der Erblasserin/des Erblassers** und Bestätigung, dass es genau drei Miterben gibt (A2).
4. Soll es einen **Ansprechpartner** in der Erbengemeinschaft geben (B6)?
5. **Wo wird unterschrieben?** Bei den Erben zu Hause oder per E-Mail: Widerrufsrecht gilt (so wie im Vertrag angenommen). In Linus' Geschäftsräumen: kein Widerrufsrecht, die Belehrung schadet aber nicht. Da Linus kein Büro vor Ort hat, bleibt es beim Entwurf.
