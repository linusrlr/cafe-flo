# Gesetzes- und Marktradar: Konzept

Ziel: Linus Rössler soll als Makler und Fix-&-Flip-Investor rechtzeitig erfahren, welche Gesetze, Verordnungen, Urteile, Förderprogramme, Zinsentscheidungen und Marktdaten sein Geschäft betreffen, und daraus ohne großen Aufwand (a) Newsletter-Ausgaben und (b) Ratgeber-/SEO-Artikel ableiten. Die Newsletter-Infrastruktur existiert bereits; dieses Konzept liefert die Quellen, das Werkzeug und den Arbeitsablauf davor.

Grundlage: `../recherche/feeds.md` (Prüfprotokoll von rund 90 Quellen, Stand 29.10.2026), `../recherche/feeds.opml` (77 funktionierende Feeds), `../radar/` (Werkzeug), `../recherche/marktthemen-2026.md` (Dossier zu aktuellen Themen als erster Themenvorrat).

---

## 1. Was beobachtet werden muss (Ebenen)

| Ebene | Was dort passiert | Beispiel aus dem Probelauf vom 29.10.2026 |
|---|---|---|
| Bundesgesetzgebung | Gesetzentwürfe, Bundestag-/Bundesrat-Beratungen, Verkündung im Bundesgesetzblatt | „Gesetzentwurf zum Gebäudetyp E ist fertig: Günstiger bauen, aber erst ab Mitte 2027“ (Haufe), „Neues Geldwäschegesetz: Was Makler 2027 erwartet“ (Haufe) |
| Landesrecht BW | Verordnungen (Kündigungssperrfrist, Mietpreisbremse, Kappungsgrenze), Landesbauordnung, Grundsteuer, Förderprogramme L-Bank | Kündigungssperrfristverordnung BW vom 16.12.2025 (läuft 31.12.2026 aus, Nachfolger beobachten) |
| Gerichte | BGH (Miet-, WEG-, Maklerrecht), BFH (Steuern), BVerfG, Finanzgerichte | „BGH: Rückgabe der Mietsache durch Schlüsseleinwurf“ |
| Geld und Markt | EZB/Bundesbank, Bauzinsen, Preisindizes (Destatis, vdp, IW, Sprengnetter), Baugenehmigungen | „EZB-Rat lässt Leitzinsen unverändert“, „Bauzinsen auf 17-Jahres-Hoch“, „IW-Wohnindex Q3/2026: Kaufpreise in den sieben teuersten Städten sinken“ |
| Branche | Verbände (IVD, GdW, Haus & Grund, BVI/VDIV), Fachpresse (Haufe, Immobilienmanager, IZ) | „Vergesellschaftungsdebatte“, „Investitionsschutzgesetz“ |
| Region | Amtsblätter, Bebauungspläne, Vorkaufsrechtssatzungen, Gutachterausschüsse, Lokalpresse | Google-News-Feeds für Leonberg/Pforzheim/Ditzingen; Amtsblatt-Newsletter Leonberg und Ditzingen |

Für Fix & Flip zusätzlich: Drei-Objekt-Grenze/gewerblicher Grundstückshandel (BMF-Schreiben, BFH), Sanierungspflichten (GModG, EPBD), Förderung (BEG, KfW 261/308, L-Bank), Handwerker- und Baupreise (Destatis), Zwangsversteigerungen (regional).

---

## 2. Quellen mit Feed (im Werkzeug hinterlegt)

77 Feeds, alle am 29.10.2026 per HTTP geprüft, nach Kategorie in `../radar/feeds.json` und `../recherche/feeds.opml`:

- **Gesetzgebung (27):** Bundesgesetzblatt I und II, Bundestag (hib gesamt und Themenfeeds Bauen/Wohnen, Recht, Finanzen; Pressemitteilungen, Tagesordnungen, Drucksachen), Bundesrat (PlenumKOMPAKT, Beratungsvorgänge, Drucksachen, Termine, Protokolle), Bundesregierung (3), BMJV (Gesetzgebungsverfahren, Presse), BMWSB, Landtag BW (Presse, Drucksachen, Protokolle), Landesregierung BW (3), Ministerium für Landesentwicklung und Wohnen BW.
- **Gerichte und Recht (11):** BGH Presse und Entscheidungen, BFH Presse und Entscheidungen, LTO (Nachrichten, Miet-/WEG-Recht, Immobilienwirtschaftsrecht, Baurecht), beck-aktuell, Haufe Recht, Haufe Steuern.
- **Wirtschaft, Zinsen, Förderung (13):** Bundesbank (5, inkl. EZB auf Deutsch), EZB, Destatis, ifo, IW Köln (2), DIW (2), BAFA.
- **Branche (10):** IVD, GdW, Haus & Grund, BVI (2), Haufe Immobilien, Immobilienmanager, Sprengnetter, test.de (2).
- **Regional (6):** Leonberger Kreiszeitung (Kreis und Stadt Ludwigsburg), IHK Region Stuttgart (3), IHK Nordschwarzwald.
- **Alert-Ersatz (10):** Google-News-RSS-Suchen (Grunderwerbsteuer, Mietrecht Gesetz, Gebäudeenergiegesetz, Wohnungseigentumsgesetz, Immobilienmarkt BW, BMF-Schreiben, Immobilien Zeitung, Bodenrichtwerte Leonberg/Pforzheim/Ditzingen), Bing News (2).

Priorität 5 (immer lesen): Bundesgesetzblatt I, BMJV-Gesetzgebungsverfahren, BGH- und BFH-Pressemitteilungen, hib Bauen/Wohnen, MLW BW, Landtag-Drucksachen, IVD, Haufe Immobilien, Bundesbank-Presse, Google News Immobilienmarkt BW und Bodenrichtwerte.

## 3. Quellen ohne Feed (Newsletter oder Seite beobachten)

Details mit URLs in `../recherche/feeds.md`, Abschnitt 3 und 4. Wichtigste Abonnements (einmalig im Browser anmelden):

1. Haus & Grund Württemberg und Deutschland (Vermieterrecht, BW-Verordnungen)
2. IVD-Newsletter (Maklerrecht, Provision, Markt)
3. Haufe Immobilien
4. vdp (Immobilienpreisindex, Finanzierung)
5. Interhyp Bauzins-Trendbarometer
6. empirica (regionale Preisindizes)
7. VDIV (WEG-Recht und Verwalterpraxis, wichtig für ETW-Flips)
8. LTO täglich
9. Statistisches Landesamt BW (Baupreise, Baugenehmigungen, Häuserpreise)
10. Amtsblatt-Newsletter Leonberg und Ditzingen (Bebauungspläne, Vorkaufsrechte, Bekanntmachungen)

Ohne Feed und ohne Newsletter, daher manuell oder per Google-News-Feed: BMF (Bot-Schutz; Ersatz Haufe Steuern + Google News „BMF-Schreiben“), BMWE, Immobilien Zeitung (403; Ersatz Google-News-site-Feed), KfW (Presse-HTML), gesetze-im-internet „Aktuell“ (HTML), BVerfG (Newsletter), OLG Stuttgart/Karlsruhe, Gutachterausschüsse (Marktberichte einmal jährlich anfordern), Stuttgarter Zeitung/Pforzheimer Zeitung (Google News).

---

## 4. Das Werkzeug (`../radar/`)

- `radar.py` liest alle Feeds, filtert nach Schlagwortgruppen (`keywords.json`: Gesetz, Mietrecht, WEG, Makler, Steuer, Energie/Sanierung, Bauen, Markt/Zinsen, Region, Urteil, Erbe/Scheidung), merkt sich Gesehenes und schreibt einen Markdown-Digest nach `digests/`.
- Reine Immobilien-Feeds (IVD, Haufe Immobilien, GdW, Haus & Grund, BVI, Sprengnetter, LTO Miet-/WEG, MLW BW, Google News) werden ungefiltert übernommen; allgemeine Feeds (Bundestag gesamt, Bundesregierung, Destatis, test.de) nur bei Schlagwort-Treffer.
- Probelauf 29.10.2026 über 7 Tage: 174 Treffer, Digest unter `../radar/digests/2026-10-29-probelauf-7-tage.md`. Rauschanteil ist noch spürbar (Immobilienmanager-Branchenmeldungen, IVD-Feed mit „Untitled“-Einträgen); die Schlagwortliste wird nach den ersten echten Wochen nachgeschärft.
- Aufruf und Optionen: `../radar/README.md`.

## 5. Arbeitsablauf (wöchentlich, ca. 45 Minuten)

1. **Montag, automatisch:** `python3 radar.py --days 7` erzeugt den Digest. Umsetzung wahlweise als Cron auf dem Laptop/Server, als GitHub Action im Repo (Workflow, der den Digest committet) oder als geplante Claude-Aufgabe, die das Skript ausführt und den Digest gleich auswertet. Empfehlung: GitHub Action plus geplante Claude-Aufgabe (siehe 6).
2. **Auswertung durch Claude (Prompt-Baustein):** „Lies den Digest. Wähle die fünf Einträge mit der größten Bedeutung für (a) Eigentümer von Eigentumswohnungen in Heimsheim, Leonberg, Ditzingen, Renningen, Pforzheim und (b) Fix-&-Flip-Investoren in Baden-Württemberg. Fasse jeden in drei Sätzen zusammen (was, seit wann/ab wann, was bedeutet es konkret), nenne Quelle und Datum, markiere Unsicheres. Schlage je einen Artikel-Titel mit Suchbegriff vor und sage, welche bestehende Ratgeberseite aktualisiert werden muss.“
3. **Entscheidung durch Linus (10 Minuten):** Newsletter-Thema wählen, Artikel-Idee freigeben oder verwerfen, eigene Praxisbeobachtung ergänzen.
4. **Produktion:** Newsletter-Ausgabe in der bestehenden Infrastruktur; Artikel-Briefing nach `../content-briefings/_vorlage.md` anlegen, Text schreiben, Quellen und „Stand“ eintragen, betroffene Ratgeberseite aktualisieren (`dateModified`).
5. **Monatlich:** Schlagwortliste und Feed-Liste pflegen (neue Gesetzesnamen wie „GModG“ aufnehmen, tote Feeds entfernen), Prüfpunkte aus den Briefings (ZU PRÜFEN) abarbeiten.

## 6. Automatisierungsvorschlag (noch nicht eingerichtet)

- **GitHub Action** (`.github/workflows/radar.yml`): montags 06:00, `python3 radar/radar.py --days 7`, Commit des Digests. Kein Secret nötig, nur Python.
- **Geplante Claude-Aufgabe** (wöchentlich, neue Session im Repo): liest den neuesten Digest, schreibt `radar/auswertung/JJJJ-MM-TT.md` mit den fünf wichtigsten Punkten und Artikelvorschlägen, erstellt für freigegebene Themen ein Briefing. Diese Aufgabe wird erst nach Freigabe durch Linus angelegt; sie würde auf dem Konto wöchentlich Tokens verbrauchen und Dateien ins Repo schreiben.
- **Täglicher Rechercheauftrag** (Wunsch aus der Session): dieselbe Aufgabe täglich mit `--days 1`, dafür nur Priorität-5-Feeds; sinnvoll, sobald die ersten Ratgeberseiten live sind und Aktualisierungsbedarf entsteht.

## 7. Erster Themenvorrat aus dem Probelauf (Stand 29.10.2026)

Aus Digest und Marktthemen-Dossier ergeben sich sofort Newsletter- und Artikelanlässe (Quellen in `../radar/digests/2026-10-29-probelauf-7-tage.md` und `../recherche/marktthemen-2026.md`):

- Bauzinsen auf 17-Jahres-Hoch und EZB-Zinspause: Was das für Verkäufer in Leonberg bedeutet (längere Vermarktung, Finanzierungsnachweis wichtiger).
- Gebäudetyp E: Gesetzentwurf fertig, Wirkung ab Mitte 2027; Bedeutung für Sanierung und Umbau.
- Geldwäschegesetz-Reform 2027: neue Pflichten für Makler (Identifizierung, Meldungen).
- Kündigungssperrfristverordnung BW läuft zum 31.12.2026 aus: Was Käufer vermieteter Wohnungen in Leonberg und Pforzheim 2027 erwartet.
- IW-Wohnindex Q3/2026: Kaufpreise in Metropolen sinken, Mieten steigen; Einordnung für die Region Stuttgart.
- Vergesellschaftungsdebatte und Investitionsschutzgesetz: Einordnung für Kleinvermieter.
- Rückzug von EZB-Präsidentin Lagarde zum 7. Februar 2027: Zinsausblick.
- BGH zur Rückgabe der Mietsache (Schlüsseleinwurf): Praxisfolgen bei Übergaben.
- Wärmepumpen-Test der Stiftung Warentest: Argument für Verkäufer mit Gasheizung in der WEG.

Jede dieser Meldungen ist zugleich ein Anlass, eine bestehende Ratgeberseite um einen datierten Absatz „Aktuell“ zu ergänzen. Das hält die Seiten lebendig, ohne jedes Mal einen neuen Artikel zu brauchen.
