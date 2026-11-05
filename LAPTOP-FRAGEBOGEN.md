# Laptop-Fragebogen für Linus

Stand: 4. November 2026. Dieser Bogen ersetzt Teil 1 und 2 von `FRAGEN-AN-LINUS.md` als Arbeitsliste für die Laptop-Session (`LAPTOP-SESSION.md`). Er enthält nur noch, was den Livegang blockiert: **9 Fragen** in vier Gruppen. Dazu kommen ein Abschnitt zum Ablesen am Veröffentlichungstag, die Punkte für den Anwalt und eine Liste für die Zeit nach dem Livegang.

**So funktioniert es.** Jede Antwort wird an genau einer Stelle eingetragen, meist als `wert` in `bauplan/fakten.yaml`. Dazu `status: geprueft` und `stand:` auf das heutige Datum setzen. Die Texte holen den Wert per `{{fakten.…}}` an alle Stellen. Danach `cd site && npm run offen`: Jede offene Stelle ist einer Frage hier zugeordnet und verschwindet, sobald das Feld gefüllt ist. Werte sind Satzteile oder ganze Sätze. Die Beispiele stehen beim jeweiligen Feld im `hinweis` in `fakten.yaml`.

Ausgangslage: 143 offene Stellen auf 28 Seiten (`npm run offen`, Stand 3.11.2026). Jetzt sind es 43 Stellen auf 19 Seiten. 41 davon sind Platzhalter für die 9 Fragen, die übrigen 2 gehören zu Anwaltspunkt A1. `[ZU PRÜFEN]` steht nirgends mehr: Die Stellen sind entweder mit Quelle belegt, ehrlich umformuliert oder gestrichen. Was dafür vor der Veröffentlichung abzulesen ist, steht im Abschnitt „Am Veröffentlichungstag kurz ablesen“.

---

## 1. Impressum und Erlaubnis (Pflicht für jede Seite)

- [ ] **1.1 Geschäftssitz.** Welche Anschrift kommt ins Impressum? Davon hängen auch die zuständige IHK und die Datenschutzaufsicht ab.
  ☐ bleibt: Am Rück 19, 97618 Niederlauer ☐ neu: …………………………………………… ab ………
  Antwort Kammer (nur bei neuer Adresse): ………………………………
  *Trägt ein:* `firma.anschrift` (eine Zeile), `firma.kammer`, `firma.datenschutzaufsicht` in `bauplan/fakten.yaml`. Bei „bleibt“ die Werte aus dem jeweiligen `hinweis` übernehmen (IHK Würzburg-Schweinfurt; Bayerisches Landesamt für Datenschutzaufsicht). Bei Sitz in Baden-Württemberg: IHK Region Stuttgart (Leonberg, Renningen, Ditzingen) oder IHK Nordschwarzwald (Heimsheim, Pforzheim) und der Landesbeauftragte für den Datenschutz Baden-Württemberg.
  *Erscheint in:* Impressum, Datenschutz, Kontakt, NAP-Block der fünf Ortsseiten.

- [ ] **1.2 Erteilungsdatum des Erlaubnisbescheids nach § 34c GewO.** IHK (München und Oberbayern, Max-Joseph-Straße 2, 80333 München) und Antragsdatum (09.09.2026) sind seit 05.11.2026 eingetragen; ein Aktenzeichen nennt der Bescheid nicht. Offen ist nur das Datum oben rechts auf Seite 1.
  Erteilt am: ………………
  (Der Antrag lief laut `analyse-aktuelle-webseite/07-recht-erlaubnis.md` und `recherche/34i-baufinanzierung.md` bei der IHK für München und Oberbayern, Balanstraße 55–59, 81541 München. Bitte nicht übernehmen, ohne den Bescheid geprüft zu haben.)
  *Trägt ein:* `erlaubnis.erteilt_am` (Format `2026-10-15`), `erlaubnis.aktenzeichen`, `erlaubnis.behoerde` (`wert` = Name der IHK, `anschrift`), jeweils `status: geprueft`.
  *Erscheint in:* Impressum (Baustein E, Aufsichtsbehörde), Über mich. Solange die Felder leer sind, bleibt das Impressum blockiert.

- [ ] **1.3 Umsatzsteuer und Gewerbe.** Hast du eine Umsatzsteuer-Identifikationsnummer?
  ☐ nein ☐ ja: DE ………………  Gewerbe angemeldet: ☐ ja, am ……… ☐ nein (nur zur Kontrolle, kommt nicht auf die Seite)
  *Trägt ein:* `firma.ust_idnr` (ganzer Satz, beide Fassungen stehen im `hinweis`).
  *Erscheint in:* Impressum.

## 2. Erreichbarkeit und Zusagen (Welle-1-Seiten)

- [ ] **2.1 Telefonzeiten und Termine vor Ort.**
  Telefonisch erreichbar: Mo bis Fr ……… bis ……… Uhr, Sa ……… bis ……… Uhr, So ☐ nein ☐ ………
  Termine vor Ort: ☐ abends ☐ samstags ☐ sonntags. „Termin innerhalb einer Woche“ (Wohnung verkaufen): ☐ stimmt ☐ ändern: ………
  *Trägt ein:* `firma.erreichbarkeit` (z. B. „Montag bis Freitag 9 bis 20 Uhr, Samstag 10 bis 16 Uhr“) und `firma.termine_vor_ort` (z. B. „auch abends und samstags“). Falls „innerhalb einer Woche“ nicht stimmt: `texte/wohnung-verkaufen.md`, Schritt 1. Falls abends oder samstags wegfällt: Rückrufzeiten in `site/src/data/formulare.json` (Feld `rueckruf`) anpassen.
  *Erscheint in:* Start, Kontakt, Wohnung bewerten, Wohnung verkaufen, fünf Ortsseiten, Footer.

- [ ] **2.2 Frist der schriftlichen Ersteinschätzung.** „Innerhalb von zwei Werktagen“ steht auf mehreren Seiten. Ab wann zählt die Frist?
  Bewertungsformular: ☐ ab Eingang der Anfrage ☐ ab unserem Telefonat. Nach einem Termin vor Ort: ☐ zwei Werktage nach dem Termin ☐ ………
  *Trägt ein:* `firma.einschaetzung_frist.ab` (z. B. „Eingang Ihrer Anfrage“) und `firma.einschaetzung_frist.nach_termin` (z. B. „zwei Werktagen nach dem Termin“).
  *Erscheint in:* Wohnung bewerten, Kontakt.

- [ ] **2.3 Finanzierungsnachweis der Käufer.** Zusage 4 auf der Startseite: Wann verlangst du den Nachweis?
  ☐ vor dem Einzeltermin ☐ spätestens vor dem Kaufangebot
  *Trägt ein:* `zusagen.finanzierungsnachweis` (Satzteil, z. B. „vor dem Einzeltermin“).
  *Erscheint in:* Start.

## 3. Provision (Ratgeberseiten der Welle 2)

- [ ] **3.1 Gilt 2,98 % ausnahmslos?**
  ☐ fest, bei jedem Kaufpreis, keine Mindestprovision ☐ Mindestprovision ……… € unter ……… € Kaufpreis ☐ verhandelbar
  Verkauf an den Mieter: ☐ ebenfalls 2,98 % ☐ reduziert auf ……… %
  *Trägt ein:* `provision.festsatz` und `provision.mieterverkauf` (je ein ganzer Satz, Beispiele im `hinweis`).
  *Erscheint in:* Ratgeber Maklerprovision, Ratgeber vermietete Wohnung.

- [ ] **3.2 Alleinauftrag, Rückzug, kostenlose Einschätzung.**
  Dein Alleinauftrag ist: ☐ einfach (Eigenverkauf durch den Verkäufer provisionsfrei) ☐ qualifiziert. Findet der Verkäufer selbst einen Käufer: ☐ keine Provision ☐ volle ☐ reduziert ……… %
  Rückzug des Verkäufers: ☐ keine Aufwandsentschädigung ☐ ……… €. Die kostenlose Einschätzung bleibt kostenlos, auch wenn der Eigentümer danach allein verkauft: ☐ ja ☐ nein
  *Trägt ein:* `provision.eigenverkauf` und `provision.ohne_abschluss` (je ein ganzer Satz). Falls es eine Aufwandsentschädigung gibt, auch die Sätze „keine Pauschale, wenn die Wohnung nicht verkauft wird“ in `texte/ratgeber-maklerprovision.md` und „kein Honorar ohne Abschluss“ in `texte/start.md` (Zusage 3) anpassen.
  *Erscheint in:* Ratgeber Maklerprovision, Ratgeber ohne Makler.

## 4. Direktankauf

- [ ] **4.1 Bedenkzeit und Ankaufsregeln.** Wie lange hat ein Verkäufer Bedenkzeit für dein Ankaufsangebot (Vorschlag: mindestens 14 Tage)?
  Bedenkzeit: ……… Tage. Die Regeln auf Direktankauf und „Sofortankauf oder Makler?“ gelten so (erst Einschätzung als Makler, Abschlag in Prozent, Bedenkzeit, Empfehlung einer zweiten Meinung, keine 24-Stunden-Fristen): ☐ ja ☐ ändern: ………
  *Trägt ein:* `ankauf.bedenkzeit` (Satzteil, z. B. „mindestens 14 Tage“). Bei „ändern“: die Regellisten in `texte/direktankauf.md` und `texte/ratgeber-sofortankauf-vs-makler.md` anpassen.
  *Erscheint in:* Direktankauf, Ratgeber Sofortankauf, Ratgeber Verkauf im Alter.

---

## Am Veröffentlichungstag kurz ablesen

Kein Fragebogen-Punkt. Diese Werte gelten nur tagesaktuell. Sie sind mit dem besten heute belegten Stand eingetragen und blockieren nicht. Vor `npm run veroeffentlichen` ablesen, in `fakten.yaml` `wert` und `stand` setzen bzw. den Text anpassen.

| Was | Wo ablesen | Heute eingetragen | Wo eintragen |
|---|---|---|---|
| KfW 308 „Jung kauft Alt“, Effektivzins 35 Jahre / 5 tilgungsfrei / 10 Jahre Zinsbindung | https://www.kfw-formularsammlung.de/KonditionenanzeigerINet/KonditionenAnzeiger (Programm 308, Variante 35/5/10) | 0,90 %, gültig ab 29.10.2026 (die KfW-Pressemitteilung vom 30.07.2026 nannte zum Start 0,53 %; die 1,00 % in den alten Texten stammten nur aus baukostenplan.de) | `kfw_308.zins` (`wert`, `zahl`, `stand`). Erscheint per Platzhalter auf Start, Wohnung verkaufen, Wohnung bewerten, vier Ortsseiten (ohne Heimsheim), vier Ratgebern und im Beitrag Bauzinsen. |
| Rechenbeispiel KfW in Ratgeber Energieausweis | eigene Rechnung | 160.000 € × 0,90 % = 1.440 €; Summe 3.668 €; Ersparnis 5.440 € = 160.000 × (4,30 % − 0,90 %) | `texte/ratgeber-energieausweis.md`, Tabelle „Darlehen“ und Quelle 16, wenn sich der Zins ändert |
| Bauzinsen 10 Jahre | https://www.drklein.de/zinsen.html (Topzins), https://www.interhyp.de/zinsen/ (Durchschnitt) | 4,20 % (29.10.2026), 4,42 % (15.10.2026) | `bauzins.topzins_10j`, `bauzins.durchschnitt_10j`. Die Werte stehen in den Texten noch wörtlich; Fundstellen per `muster` in `fakten.yaml`. Beitrag `texte/aktuell/bauzinsen-november-2026.md`: Tabelle mit Datum, nur bei großer Abweichung neu fassen. |
| EZB-Leitzinsen vom 29.10.2026 | https://www.ecb.europa.eu/press/govcdec/mopo/html/index.de.html | 2,50 / 2,65 / 2,90 % laut biallo und Haufe/dpa (EZB-Seite am 03.11. nicht lesbar) | `texte/aktuell/bauzinsen-november-2026.md`, Abschnitt „Warum sind die Zinsen so hoch?“ |
| Nachfolgeverordnungen Mietpreisbremse, Kappungsgrenze, Kündigungssperrfrist ab 1.1.2027 | Gesetzblatt BW (https://www.landtag-bw.de), Beteiligungsportal | am 03.11.2026 nur Entwurf | Start (Quelle 1), Beitrag Mietpreisbremse, `sperrfrist.verordnung`, `mietpreisbremse.verordnung`, `kappungsgrenze` |
| Jahressteuergesetz 2026 (Scheidungsregel), 2./3. Lesung | https://dip.bundestag.de | am 03.11.2026 noch nicht beschlossen | `texte/aktuell/spekulationsfrist-bleibt.md`, Ratgeber Spekulationssteuer und Scheidung |
| Server: IP-Kürzung und Löschung der Logs nach 14 Tagen | auf dem Server: `log_format anon` aktiv (`deploy/nginx-roessler-immo.conf`), logrotate mit `daily` und `rotate 14` für `/var/log/nginx/roessler-immo.*.log` | in der Datenschutzerklärung zugesagt | Server; falls nicht einrichtbar, Satz in `site/inhalte/recht/datenschutz.md` anpassen |

---

## Anwalt vor Livegang

Nichts davon ist erfunden oder vorformuliert. Wo eine Aussage heikel war, ist sie entschärft oder ausgeblendet. A1 blockiert die Seite `/widerruf/`. A2 sollte vor dem Livegang erledigt sein. A3 bis A5 blockieren nichts.

- [ ] **A1 Widerrufsbelehrung für Maklerverträge.** Muster-Widerrufsbelehrung (Frist 14 Tage, Folgen, vorzeitiger Leistungsbeginn, § 356 Abs. 4, § 357a Abs. 2 BGB) und Muster-Widerrufsformular nach Anlage 2 zu Art. 246a EGBGB.
  *Trägt ein:* `site/inhalte/recht/widerruf.md`, die zwei Marker „Fragebogen A1“ ersetzen. Bis dahin `/widerruf/` nicht freischalten. Der Ratgeber Maklerprovision verweist inhaltlich darauf.
- [ ] **A2 Impressum und Erlaubnis-Wortlaut.** Baustein E (`erlaubnis.baustein_e` in `fakten.yaml`), der Erlaubnissatz auf Über mich („vermittle Eigentumswohnungen an Käufer und stelle Ihnen auf Wunsch Investoren vor; von wem ich dabei eine Vergütung erhalte, erfahren Sie immer vorher“), der Investorensatz auf Direktankauf (Baustein C) und die Datenschutzerklärung insgesamt (Kommentar in `datenschutz.md`: „Mit dem Ersteller der Datenschutzerklärung abstimmen“).
  *Trägt ein:* nur Wortlaut-Änderungen in `fakten.yaml` bzw. den Textdateien; die Erkennung der Bausteine im Rendering bleibt unverändert.
- [ ] **A3 Mustertexte und Einzelleistungen.** Musterschreiben an die Hausverwaltung (Ratgeber Energieausweis, jetzt als „Formulierungshilfe, keine Rechtsberatung“ gekennzeichnet), Mustertext Terminanfrage an den Mieter (Ratgeber vermietete Wohnung, „Vorschlag, kein Rechtsrat“). Rechtsform der Einzelleistungen für Privatverkäufer (§§ 656a bis 656d BGB): Der Abschnitt „Hybrid: Einzelleistungen“ in `texte/ratgeber-ohne-makler.md` ist bis dahin als Kommentar ausgeblendet.
- [ ] **A4 Direktankauf.** Umfang der eigenen Pflichten nach dem Geldwäschegesetz beim Eigenankauf. Eigenankauf während eines laufenden Alleinauftrags: Provision, Interessenkonflikt (Kommentar in `direktankauf.md`). Mit dem Steuerberater: Drei-Objekt-Grenze und Rechtsform der Ankäufe.
- [ ] **A5 Steuerberater, Ratgeber Spekulationssteuer.** Rücklagenanteil im Kaufvertrag. Die Seite sagt jetzt nur noch, dass Fachbeiträge den Anteil nicht zum Veräußerungspreis zählen und eine Gerichtsentscheidung nicht geprüft ist; das Rechenbeispiel ohne diesen Effekt bleibt. Außerdem: Neubau (Kaufvertragsdatum), Soli und Kirchensteuer im Beispiel.

---

## Nach dem Livegang ergänzen

Diese Stellen sind umformuliert und ohne Antwort ehrlich und vollständig. Die Frage steht jeweils als `<!-- Später ergänzen (Nn): … -->` im Text. Die Kommentare werden nicht gerendert und blockieren nichts. Gern per Sprachnachricht beantworten; Teil 3 von `FRAGEN-AN-LINUS.md` gilt weiter.

- **N1 Werdegang und Qualifikation** (Über mich): Hochschule, Abschluss, Jahr; Stationen Projektcontrolling und Wohnungsbewertung mit Zeitraum und Zahl bewerteter Wohnungen; Kaufjahr der eigenen Wohnung; Berufsjahre; Weiterbildungen, IVD oder BVFI.
- **N2 Bezug zur Region** (Über mich, Start, Ortsseite Heimsheim): zwei bis vier Sätze, warum Heimsheim zuerst. Wichtig, falls das Impressum eine Adresse außerhalb der Region nennt.
- **N3 Eigene Wohnung als Beispiel** (Über mich, danach Ratgeber): Datenblatt wie in `FRAGEN-AN-LINUS.md` 2.3.
- **N4 Netzwerk** (Über mich, Wohnung bewerten): Steuerberater, Anwalt, Notar, Sachverständiger, die du nennen magst. Danach kommen die Sätze „Ich nenne Ihnen gern jemanden“ bzw. „nenne ich Ihnen einen und nehme dafür nichts“ wieder hinein.
- **N5 Erfahrungswerte zu Fristen und Dauer**: Verkaufsplan in … Werktagen (Wohnung verkaufen); Dauer je Unterlage (Tabelle Wohnung verkaufen); Verkaufsdauer Leonberg und Pforzheim (Start); Wochen bis zum Notar beim beschleunigten Verkauf (Sofortankauf); höchstens … Verkäufe gleichzeitig (Über mich); Dokumentation für auswärtige Erben (Geerbte Wohnung); Portale, Fotos und Wochentag des Berichts (Kommentar in Wohnung verkaufen).
- **N6 Beobachtungen aus der Praxis**: Aufzug in Leonberg-Ramtel und Ditzingen (Wohnung bewerten); ob Interessenten den Energieausweis lesen (Ratgeber Energieausweis); Käufer in Renningen (Beitrag Bauzinsen); Gespräche zur Spekulationsfrist (Beitrag); drei eigene Sätze aus der Vermietung, Kennzahlen und Hausgeld-Schwelle für den Vermietungsvergleich (Verkaufen oder vermieten).
- **N7 Direktankauf im Detail**: typischer Abschlag-Korridor und Finanzierung (Eigenkapital oder Bank); Dauer bis zur Einschätzung und bis zum Notartermin (Ablauf und Tabellen); Ankauf von Bevollmächtigten oder Betreuern (Verkauf im Alter); Käuferkartei und Angebot „beschleunigter Verkauf“ (Sofortankauf).
- **N8 Angebote, die noch nicht auf der Seite stehen**: Innenprovision (Modell B); Einzelleistungen mit Festpreisen (nach A3); Verkaufsauftrag bei Scheidung von nur einem Partner; WhatsApp und Videotool (Kontakt, dann Datenschutz ergänzen); PDFs und Checklisten (`FRAGEN-AN-LINUS.md` 2.19).
- **Fakten ohne Linus, nach dem Livegang**: Grundsteuer-Hebesatz Leonberg ab 2027 und Heimsheim (bei den Städten erfragen, `grundsteuer.hebesatz.*`); Grundbuchamt für Ditzingen; Marktberichte der Gutachterausschüsse Leonberg, Enzkreis, Pforzheim; Bodenrichtwerte über BORIS-BW (Heimsheim: Aggregatoren nennen 235 oder 732 €/m²); Neubürger-Indikator Renningen im Datensatz (Kommentar im Beitrag Mietpreisbremse); Preise privater Inserate (Ratgeber ohne Makler).

---

## Was in den Texten geändert wurde (Kurzprotokoll 3./4.11.2026)

- **Belegt und Marker entfernt:** KfW-Förderbeträge (Pressemitteilung vom 30.07.2026) und KfW-Zins (Konditionenanzeiger, 0,90 %); GREIX-Vermarktungsdauer 90 Tage in 24 Städten (GREIX-Bericht 2026 Q1 vom 07.05.2026); Gutachterausschuss Stuttgart 4.250 €/m² (Meldung vom 10.02.2026); BT-Drs. 21/6637 (6 Mrd. Euro, Abschnitt D) und 21/8235 (keine Änderung des § 23 EStG); Kappungsgrenze in Leonberg und Pforzheim (Mieterbund, Stand 10/2026); immoportal Heimsheim 3.212,57 €/m² (aktualisiert 01.11.2026); KfW 159 im Konditionenanzeiger gelistet.
- **Entschärft oder gestrichen:** Maklerumfrage „54,3 %“ (Urheber unklar) aus Wohnung bewerten und Ratgeber Eigentumswohnung gestrichen; S6-Fahrzeit „25 Minuten“ ersetzt durch „ohne Umsteigen“; „6 bis 10 Wochen“ beim beschleunigten Verkauf gestrichen; Sofortankauf-Untergrenze: Quelle nennt 40 %, jetzt offen benannt; Rücklagenanteil in der Spekulationssteuer nur noch als Fachmeinung; § 112 Abs. 3 GModG nicht mehr als geltende Norm zitiert; Verbraucherzentrale-Zitate durch §§ 1030, 1092, 1093 BGB ersetzt; Betreuer-Urteil ohne Aktenzeichen durch § 1850 BGB ersetzt; Vobahome, immopaka, Fernwärme Pforzheim als ungeprüft gekennzeichnet; 3.655 €/m² Heimsheim (nicht reproduzierbar) gestrichen; Einzelleistungen-Box ausgeblendet.
- **Linus-Aussagen ohne Antwort ehrlich gekürzt:** Werdegang ohne Jahre und Arbeitgeber; „Ich nenne Ihnen gern jemanden“, Sachverständigen-Satz, „keine Verrentungsprodukte“, „ab dem dritten Stock“, „Interessenten lesen den Ausweis selten“, die drei Vermieter-Lehrsätze und die Käuferkartei gestrichen; Abschlag-Spanne und Fristen beim Direktankauf durch „steht im Angebot“ ersetzt; Scheidung jetzt mit § 747 Satz 2 BGB statt einer Auftragsregel.
