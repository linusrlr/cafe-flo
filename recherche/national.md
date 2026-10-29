# Überregionale Verkäufer-Funnels und Ratgeber in Deutschland – Benchmark-Recherche für Rössler Immobilien

Stand der Erhebung: 29.10.2026. Zweck: Lernvorlage für die Unterseiten-Strategie (Ratgeber/Info-Seiten, Ortsseiten, Bewertungs-Funnel) von Linus Rössler / Rössler Immobilien (https://roessler-immo.de/), Einzelmakler für Eigentumswohnungen in Heimsheim, Leonberg, Ditzingen, Renningen und Pforzheim.

## 0. Methodik, Quellen, Grenzen

### 0.1 Vorgehen
- Jede Seite wurde zweimal erfasst: (a) Roh-HTML per `curl` (Standard-Browser-User-Agent, keine Umgehung von Bot-Schutz) → Auswertung von `<title>`, Meta-Description, Canonical, H1–H3, JSON-LD-Typen (FAQPage, Article, Product/AggregateRating …), Autor/Datum, Technik-Marker (CMS, Cookie-Banner, Tracking), Telefonnummern, interne Links; (b) gerendert über WebFetch mit gezielten Lese-Prompts (Funnel, Hero, Sektionen, FAQ, CTAs).
- Sitemaps (`sitemap.xml` + Sub-Sitemaps) wurden vollständig heruntergeladen und nach Pfaden ausgezählt, um die Ratgeber-Themen und die Anzahl lokaler Landingpages belastbar zu erfassen.
- Alle Downloads liegen unter `/tmp/claude-0/-home-user/e7214d44-0169-5a35-af11-cf04a7507b2a/scratchpad/dl-national/` (Rohseiten in `pages/`, Sitemaps und URL-Listen im Wurzelverzeichnis, Auswertungen in `reports/`).
- Formulare der Bewertungs-Funnels sind bei allen Anbietern JavaScript-gerendert. Die exakte Reihenfolge der Eingabefelder konnte daher nur dort belegt werden, wo die Feldbezeichnungen im HTML/JS-Payload oder in der Selbstbeschreibung des Anbieters stehen (Homeday, Engel & Völkers, Von Poll, immoverkauf24). Wo das nicht möglich war, steht ausdrücklich „nicht prüfbar“.
- Wortzahlen sind grobe Schätzungen (sichtbarer Text abzüglich Navigation/Footer).

### 0.2 Anbieterauswahl (8 Anbieter) und Ausschlüsse
| Anbieter | Status | Begründung |
|---|---|---|
| Homeday (homeday.de) | aufgenommen | HTTP 200, Sitemap vollständig lesbar |
| immoverkauf24 (immoverkauf24.de) | aufgenommen | HTTP 200, Sitemap mit 15.977 URLs |
| Von Poll Immobilien (von-poll.com) | aufgenommen | HTTP 200; Sitemap-Index lesbar, DE-Sitemap 1.963 URLs; zwei in der Index-Sitemap gelistete Sub-Sitemaps (`sitemap_VPI_Immobilien-verkaufen_DE_m.xml`, `sitemap_VPI_Immobilienbewertung_DE_m.xml`) liefern 404 |
| Engel & Völkers (engelvoelkers.com/de) | aufgenommen | HTTP 200, DE-Sitemap 2.016 URLs |
| Dahler (dahlercompany.com; dahler.com leitet dorthin um) | aufgenommen | HTTP 200, Drupal-Sitemap 4.204 URLs |
| ImmoScout24 „Verkaufen“ + „Wissen“ (immobilienscout24.de) | aufgenommen | HTTP 200; `/immobilienpreise/…` liefert 401 „Ich bin kein Roboter“ und wurde nicht umgangen |
| Immowelt Ratgeber (immowelt.de/ratgeber) | nur Ratgeber | Startseite, `/verkaufen` und `/immobilienbewertung` liefern 403 (Bot-Schutz) → ausgelassen; `/ratgeber/` ist erreichbar (TYPO3) und wird nur als Ratgeber-Benchmark genutzt |
| Finanztip (finanztip.de) | aufgenommen | HTTP 200; unabhängiger Verbraucher-Ratgeber als Gegenpol zu Makler-Content |
| McMakler (mcmakler.de) | ausgeschlossen | HTTP 403 auf Startseite und Sitemaps – nicht umgangen |
| Postbank Immobilien | ausgeschlossen | Verbindung nicht möglich (CONNECT-Fehler 502) |
| Sparkassen-Immobilien | ausgeschlossen | die geprüften URLs unter sparkasse.de liefern 404; nicht weiter verfolgt |

### 0.3 Leitfragen pro Anbieter
Geschäftsmodell · Navigation · Startseite · Bewertungs-/Verkaufs-Funnel Schritt für Schritt · Verkaufen-Seite (H-Struktur, Argumentationslogik, Einwandbehandlung, Rechner, Vergleichstabellen) · Ratgeber (Themenliste, 3+ Artikel im Detail) · Vertrauenselemente · Kontaktwege · Design/Tonalität/Mobile · SEO (Title/Meta, interne Verlinkung, lokale Landingpages) · Technik · Übertragbarkeit auf Rössler.

---

## 1. Homeday – https://www.homeday.de/

### 1.1 Geschäftsmodell, Reichweite
- Hybrid-Makler (Berlin): zentrale Lead-Generierung über kostenlose Online-Bewertung, Abwicklung durch selbstständige „Homeday-Partnermakler“ vor Ort. Eigenbeschreibung Title: „Homeday – Der Immobilienmakler für Ihren Immobilienverkauf“.
- Reichweite laut Sitemap: 667 URLs (666 unter `/de/`). Trustpilot laut Suche: TrustScore 4,5/5 bei rund 14.000 Bewertungen (Quelle: Trustpilot-Snapshot via WebSearch, Datum nicht sichtbar). Focus-Money-Auszeichnung „fairster Immobilienmakler“ (Homeday-Pressemeldung 03.02.2026, nicht unabhängig geprüft).
- Partnerprogramm und Sponsoring (Hertha BSC) als Markenaufbau; Finanzierung/Baufinanzierung als Zusatzprodukt; Affiliate-Verlinkungen (z. B. aroundhome auf der Seite „Immobilie im Alter“).

### 1.2 Navigation (wörtlich aus Roh-HTML der Startseite)
Hauptnavigation (Mega-Menü):
- „Verkaufen“ → Immobilie verkaufen
- „Kaufen“ → Immobilie kaufen
- „Finanzieren“ → Immobilie finanzieren
- „Makler“: Homeday-Partnermakler finden · Maklerkosten · Maklerprovision · Maklervertrag kündigen
- „Immobilie bewerten“: Alles zur Immobilienbewertung · Haus bewerten · Wohnung bewerten · Grundstück bewerten · Verkehrswert ermitteln
- „Immobilie verkaufen“: Alles zum Immobilienverkauf · Haus verkaufen · Wohnung verkaufen · Grundstück verkaufen · Steuer beim Immobilienverkauf
- „Finanzierung“: Immobilienfinanzierung · Baufinanzierung · Preisatlas
- „Ratgeber“: Immobilienwissen · Blog · Immobilienlexikon · Musterdokumente · Immobilienkauf · Immobilien vermieten · Erbschaft
- „Karriere“: Alle Stellenangebote · Partnermakler werden · Immobilienmakler werden · Partnerfotograf werden · Eigentümer werben · Homeday × Hertha BSC
Footer (wörtlich): „0800 5 800 555 Für kostenfreie Anrufe.“ · „kontakt@homeday.de Für alle, die lieber schreiben.“ · „Rückruf-Service Wir rufen Sie gerne zurück.“ · Über uns · Presse · Jobs und Karriere · Homeday Erfahrungen · FAQ (hilfe.homeday.de) · AGB & Rechtliche Hinweise · Vertrag kündigen · Hauswertrechner · Immobilien Blog · Musterdokumente · Vertrag widerrufen · Impressum · Datenschutz. Zusätzlich im Footer ein Linkblock „Warum ist eine Immobilienbewertung wichtig?“, „Haus bewerten: Was ist Ihr Haus in 2026 wert?“, „Haus verkaufen: Alle Schritte auf einen Blick“, „Wohnungswert ermitteln: Kostenlos und Online“, „Wohnung verkaufen leicht gemacht: Das ist 2026 wichtig“, „Immobilienwertrechner: Kostenloser Online-Preisrechner“, „Verkehrswert Immobilie: Infos und Gratis Rechner“.

Zahl der Ratgeber-Seiten laut Sitemap (`sitemap-website.xml`, Pfad-Auszählung unter `/de/`):
- immobilienlexikon 128 · blog 80 · immobilienverkauf 71 · immobilienwissen 52 · musterdokumente 41 · immobilienkauf 37 · immobilie-kaufen 37 · immobilienfinanzierung 32 · immobilienbewertung 26 · baufinanzierung 24 · immobilienvermietung 21 · erbschaft 16 · immobilienpreise 12 · homeday-makler 9 · checklisten 7.
- Summe redaktioneller Inhalte (Lexikon, Blog, Verkauf, Wissen, Kauf, Bewertung, Vermietung, Erbschaft, Finanzierung, Musterdokumente, Checklisten) ≈ 530 Seiten.
- Separate Instapage-Landingpages (`sitemap-instapage.xml`): `immobilien.homeday.de/immobilienwertrechner/` und `/immobilienwertrechner/stuttgart/` – letztere liefert aktuell „Pageserver 404“ (Instapage), also eine verwaiste Kampagnenseite.

### 1.3 Startseite
- Title: „Homeday – Der Immobilienmakler für Ihren Immobilienverkauf“; Meta: „Warum mit Homeday verkaufen? ➤ Voller Service ✓ Erfahrene Makler vor Ort ✓ Kostenlose Immobilienbewertung ✓ Verkaufserfolg ✓“.
- H1: „Immobilie verkaufen mit Homeday“. Primärer CTA (Header und Hero): „Kostenlose Bewertung starten“. Hero-Bullets: „Hochwertige Analyse · Aktuelle Marktpreise · 100% kostenlos & unverbindlich“.
- Sektionen (H2 in Reihenfolge): „Ihre Vorteile bei Homeday“ (H3: Lokale Makler · Digitaler Komfort · Optimale Vermarktung · Finanzierung) → „Das sagen Medien über uns“ → „Lernen Sie Ihren Makler vor Ort kennen“ → „Unser Service für Sie“ (H3: Immobilie verkaufen · Immobilie kaufen · Immobilie finanzieren) → „Jetzt als Partnermakler durchstarten“ → „Bleiben Sie informiert“ (Blog-Teaser: „Sanierungspflicht beim Hauskauf“, „Interview: Georg Ortner“) → „Häufig gestellte Fragen“.
- Sichtbarer Text ca. 1.700 Wörter; Trustpilot-Block „Ausgezeichnet“ (Logo, keine Zahl im HTML); JSON-LD: Organization.

### 1.4 Bewertungs-Funnel (Schritt für Schritt)
Quelle A – Seite `/de/immobilienbewertung/` (Roh-HTML + WebFetch): Title „Immobilienbewertung kostenlos – sofort, ohne E-Mail“; H1 „Immobilienbewertung kostenlos, sofort & unverbindlich“; Button „Kostenlose Bewertung starten“. „So funktioniert's“ (H3): 1. „Immobilie beschreiben“ („Um den Wert Ihrer Immobilie zu erfahren, geben Sie einfach die entsprechenden Eckdaten in unser Formular ein.“) → 2. „Vor-Ort-Termin vereinbaren“ (Homeday-Mitarbeiter wertet aus, meldet sich, vereinbart Termin mit Makler in der Nähe) → 3. „Verkaufspreis erfahren“ (Makler begutachtet vor Ort, „kostenlos und unverbindlich“).
Quelle B – Seite `/de/immobilienbewertung/immobilienwertrechner/` (Autor „Volker Binnenböse, Immobilienredakteur, 23. Juni 2025“): „Mit dem Immobilienwert-Rechner sofort erhalten Sie eine erste realistische Einschätzung Ihres Immobilienwerts in nur 3 einfachen Schritten: Adresse eingeben … Objektdetails angeben: Wählen Sie Immobilientyp, Wohnfläche, Zimmeranzahl, Baujahr und Zustand aus. Ergebnis abrufen …“ und „Der Wert Ihrer Immobilie wird Ihnen bereits wenige Sekunden später direkt angezeigt.“ sowie „schnell, kostenlos und ohne Registrierung“.
Quelle C – Fragenkatalog, der im Roh-HTML der Bewertungsseite als Vorbereitungs-Checkliste steht (Abschnitt „10.1 Welche Daten sollte ich für die Immobilienbewertung zur Hand haben?“): „Um welche Art von Immobilie handelt es sich? (z. B. Reihenhaus, Einfamilienhaus, Eigentumswohnung) · Wie groß ist die Wohnfläche Ihrer Immobilie (Anzahl der Quadratmeter)? · Wie groß ist die zur Immobilie gehörige Grundstücksfläche? · Über wie viele Etagen verfügt Ihre Immobilie? · Wann wurde das Gebäude errichtet? · Wann wurde Ihre Immobilie zuletzt saniert? · Über wie viele Zimmer verfügt Ihre Immobilie? · Wie wird Ihre Immobilie derzeit genutzt? · Gehören zu Ihrer Immobilie ein Keller/Stellplatz/eine Terrasse/ein Balkon/Garten? …“ (Liste bricht im Extrakt ab).
Quelle D – Homeday-Unterseiten via WebSearch (hauswertrechner, wohnungsbewertung): abgefragt werden Immobilientyp, Etagenzahl, Wohnfläche, Zimmer, Baujahr, letzte Modernisierung, Ausstattungsqualität, Ausstattungsdetails (Balkon, Keller), Kaufdatum und Kaufpreis, Adresse; bei Wohnungen zusätzlich Wohnungstyp (Erdgeschoss/Dachgeschoss/sonstige) und Nutzung (leer/selbst genutzt/vermietet). Ergebnis „erscheint in Sekunden auf dem Bildschirm und wird zusätzlich per E-Mail versendet“, als grobe Preisspanne.
Bewertung des Funnels:
- Reihenfolge lt. Selbstbeschreibung: Adresse → Objektdaten → (Kontaktdaten) → Sofortergebnis als Preisspanne; der exakte Zeitpunkt der Kontaktabfrage im Formular ist nicht prüfbar (JS). Der Title „ohne E-Mail“ und die Aussage „zusätzlich per E-Mail“ widersprechen sich auf Homedays eigenen Seiten; FAQ-Abschnitt 11–14 („Immobilienbewertung online anonym – geht das?“, „Warum werden trotzdem Daten … benötigt?“, „Homeday Immobilienbewertung – Datenschutz“) zeigt, dass das Thema Anonymität als Einwand gezielt bearbeitet wird.
- Microcopy/Trust direkt am Funnel: „100% kostenlos & unverbindlich“, „Hochwertige Analyse“, „Aktuelle Marktpreise“, Datenbasis „mehr als 300 verschiedenen Portalen und Zeitungen“, Vergleich zu Gutachterkosten „zwischen 1.500 und 3.000 Euro“, Hotline „Montag bis Freitag von 09:00-18:00 Uhr“.
- Nachgelagert: Telefonischer Kontakt durch Kundenberater, Vor-Ort-Termin „in zwei bis drei Tagen“, Ergebnisvorstellung über „Homeday-Preisassistenten“.

### 1.5 Verkaufen-Seite `/de/immobilienverkauf/`
- Title „Immobilie verkaufen: alle Tipps & Infos für 2026 | Homeday“; Meta „Immobilienverkauf 2026 – alle Tipps & Infos ✓ Vorbereitung und Ablauf ✓ Einfach und erfolgreich verkaufen ➤ Hier informieren“.
- Zwei H1 (technischer Fehler): „Ihr Partner für den Immobilienverkauf“ und „Immobilienverkauf: So verkaufen Sie Ihre Immobilie erfolgreich“.
- H2: „Jetzt Makler vor Ort finden“
    - „Immobilienverkauf Schritt für Schritt erklärt“
    - „Den Immobilienwert ermitteln und den Angebotspreis festlegen“
    - „Immobilie professionell vermarkten“
    - „Tipps für einen erfolgreichen Immobilienverkauf“
    - „Immobilienmarkt 2026: Marktentwicklung richtig einordnen“
    - „Vermietete Immobilie verkaufen“
    - „Immobilie ohne Makler verkaufen: Aufgaben und Abwägungen“
    - „Kosten und rechtliche Schritte beim Immobilienverkauf“
    - „… – FAQ“.
- H3 (Auswahl): „Wie bereite ich den Immobilienverkauf vor?“
    - „Verkaufsunterlagen: Quelle, Dauer, Kosten“
    - „Steuerliche Einordnung nach § 23 EStG“
    - „Finanzierungsnachweise und Bonität“
    - „Bewertungsverfahren: welches passt zu welcher Immobilie?“
    - „Verkehrswert, Angebotspreis und Kaufpreis unterscheiden“
    - „Was gehört in ein vollständiges Exposé?“
    - „Energieausweis: Pflichten im Verkaufsprozess“
    - „Was sich beim Energieausweis zum 1. Januar 2027 ändert“
    - „Preisstrategie nachvollziehbar begründen“
    - „Preisentwicklung für Wohnimmobilien im ersten Quartal 2026 gegenüber dem Vorjahresquartal“
    - „Eigenleistung beim Privatverkauf realistisch einschätzen“
    - „Maklerkosten beim Verkauf von Wohnungen und Einfamilienhäusern“
    - „Notarielle Beurkundung und Eigentumsübergang“.
- Umfang ≈ 6.500 Wörter. JSON-LD: Product + AggregateRating (Bewertungs-Sterne im Snippet), kein FAQPage-Schema trotz FAQ-Abschnitt.
- Argumentationslogik: Prozess-Erklärung (Schritte) → Preisfindung → Vermarktung → Marktlage 2026 → Sonderfall vermietet → Einwand „ohne Makler“ (Aufgabenliste, Eigenleistung) → Kosten/Recht → FAQ. Jeder Block endet in einem Bewertungs-CTA („Jetzt Makler vor Ort finden“, „Kostenlose Bewertung starten“). Keine Vergleichstabelle „mit/ohne Makler“ auf dieser Seite; Kostenrechner als „Kostenrechner: berechnen Sie ihren ungefähren Nettoerlös“ auf der Kosten-Seite (siehe 1.6).

### 1.6 Ratgeber – Themenliste (gruppiert, aus Sitemap) und gelesene Artikel
Verkauf (`/immobilienverkauf/`, 71 Seiten): Haus verkaufen · Wohnung verkaufen · Grundstücksverkauf · Mehrfamilienhaus verkaufen · Gewerbeimmobilie verkaufen · Haus verkaufen ohne Makler · Fehler beim Immobilienverkauf · Verkaufspreis · Zeitpunkt Immobilienverkauf · Verweildauer · Renovieren · Energieausweis-Pflicht · Kaufvertrag · Hausbesichtigung · Wohnungsbesichtigung · Exposé · Mängelhaftung · Notaranderkonto · Grundbuchauszug · Flurkarte · Verwalterzustimmung · Wohnrecht · Teilungsversteigerung · Spekulationssteuer · Steuern beim Immobilienverkauf · Kosten beim Immobilienverkauf · Wohnungsverkauf-Nebenkosten · Notarkosten Wohnungsverkauf · Vorfälligkeitsentschädigung · Zwischenfinanzierung · Haushaltsauflösung · rechtliche Risiken · Teilverkauf Haus · Immobilie im Alter · Haus Eltern verkaufen Pflegefall · Zugewinngemeinschaft · Haus und Scheidung · Trennungsjahr · vermietete Immobilie (Haus/Wohnung) · 18 Städte-Landingpages „immobilie-verkaufen-<stadt>“ (Berlin, Hamburg, München, Köln, Frankfurt, Stuttgart, Düsseldorf, Leipzig, Dortmund, Essen, Dresden, Hannover, Nürnberg, Bielefeld, Mannheim, Karlsruhe, Münster, Augsburg, Bonn, Wuppertal).
Bewertung (`/immobilienbewertung/`, 26): Hauswertrechner · Wohnungsbewertung · Grundstücksbewertung · Immobilienwertrechner · Verkehrswert · Marktwert · Vergleichswert-/Sachwert-/Ertragswertverfahren · Bodenrichtwert · Gutachter · Wertgutachten · ImmoWertV · Kaufpreisfaktor · Liegenschaftszins · Marktanpassungsfaktor · Reallast · Baulastenverzeichnis · Einheitswert · Zeitwert · Gemeiner Wert · Grundstückspreise · Bedeutung Immobilienpreis.
Recht/Steuern: Steuern beim Immobilienverkauf · Spekulationssteuer · Grunderwerbsteuer (Kauf) · Erbschaftssteuer · Schenkung · Grundsteuer-Hebesätze (Blog).
Lebenssituationen: Erbschaft-Hub (16 Seiten: Erbschein, Erbschaftssteuer, Erbbaurecht, Schenkungssteuer, Erbengemeinschaft, Haus vererben, Erbauseinandersetzung, gesetzliche Erbfolge, Erbe ausschlagen, Enterben, Erbteil verkaufen, Schenkungsvertrag, Nachlassverzeichnis, Testament, Abschichtung) · Scheidung/Zugewinn/Trennungsjahr · Immobilie im Alter · Pflegefall · Vorsorge im Alter · Leibrente/Umkehrhypothek (Wissen).
Vermietung (21): wohnung vermieten · Mieter kündigen · Mietpreis berechnen · Kappungsgrenze · Mieteinnahmen versteuern · Modernisierung/-umlage · vermieten oder verkaufen · Rechte und Pflichten Vermieter · Nebenkostenabrechnung.
Kauf (37+37): Hauskauf, Wohnungskauf, Kaufnebenkosten, Käuferprovision, kaufen oder mieten, Kapitalanlage, Teilungserklärung, Eigentümergemeinschaft, Löschungsbewilligung …
Wissen/Blog/Lexikon: 52 + 80 + 128 (Begriffe von „Achsraster“ bis „Zession“ – hier klar Masse statt Fokus). Musterdokumente 41 (z. B. Kündigung wegen Eigenbedarf, Wohnungsmietvertrag, Formular Wohnflächenberechnung), Checklisten 7 (PDF, z. B. `/de/checklisten/unterlagen-wohnungsverkauf.pdf`).

Gelesene Artikel:
1) „Wohnung verkaufen“ (`/de/immobilienverkauf/wohnung-verkaufen/`): Title „Wohnung verkaufen leicht gemacht: Das ist 2026 wichtig | Homeday“; H1 „Wohnung verkaufen mit Homeday“; Box „Das Wichtigste zusammengefasst“ (3 Punkte: Vorbereitung; „durchschnittlich 6 bis 12 Monate“ Dauer; bester Zeitpunkt Frühjahr/Sommer). H2 nummeriert 1–11: „Wann bietet es sich an, eine Wohnung zu verkaufen?“ · „Wie verkauft Homeday meine Wohnung?“ · „Wie schnell lässt sich eine Wohnung verkaufen?“ · „Wie bereite ich den Wohnungsverkauf vor?“ (H3 4.1 Angebotspreis, 4.2 Zielgruppe) · „Eigentumswohnung verkaufen – vermietet oder unvermietet?“ · „Was ist ein Vorkaufsrecht?“ (H3 6.1–6.3) · „Welche Dokumente sind notwendig …“ · „Wie läuft der Verkauf einer Eigentumswohnung ab?“ (H3 8.1–8.3) · „Wie unterscheidet sich der Wohnungsverkauf vom Hausverkauf?“ (H3 9.1 geerbte Wohnung) · „Welche Kosten fallen beim Wohnungsverkauf an?“ · „Eigentumswohnung verkaufen – mit oder ohne Makler?“ · FAQ · „Lesen Sie jetzt“. ≈ 4.100 Wörter. Kostentabelle (Kostenart/Wie hoch?/Zahlungspflichtiger; Maklergebühren „je 3,57 % des Kaufpreises (bei 19 % MwSt.) pro Partei“), Listen „Vorteile Privatverkauf“/„Vorteile Makler“, Preisminderung vermietet „bis zu 30 Prozent“. Lead-Magnet: „Checkliste Unterlagen Wohnungsverkauf“ (PDF). CTAs: „Kostenlose Wohnungsbewertung starten“, „Jetzt Makler vor Ort finden“, „Jetzt Verkaufswert berechnen“. FAQ (7): „Wann ist ein guter Zeitpunkt …?“ · „Welche Unterlagen …?“ · „Wann kann ich eine Wohnung steuerfrei verkaufen?“ · „Wann muss ich Spekulationssteuer bezahlen?“ · „… wenn sie noch nicht abbezahlt ist?“ · „Wie wirkt sich der Verkauf einer vermieteten Wohnung auf den Preis aus?“ · „Wann ist der Verkauf einer vermieteten Wohnung sinnvoll?“. Kein Autor, kein Datum; JSON-LD Product/AggregateRating, kein FAQPage.
2) „Vermietete Wohnung verkaufen“ (`/de/immobilienverkauf/vermietete-immobilie/wohnung/`): Title „Vermietete Wohnung verkaufen: Rechte & Pflichten | Homeday“; H1 „Vermietete Wohnung verkaufen: Informationen und hilfreiche Tipps“; H2: „Welche Käufergruppe interessiert sich …?“
    - „… welcher Kaufpreis ist angemessen?“
    - „Wie bereite ich mich vor …?“
    - „Welche Unterlagen …?“
    - „Welche Rechte und Pflichten …?“
    - „… muss die Verwalterin zustimmen?“
    - „Was gilt es bei der Vermarktung zu beachten …?“
    - „Was gilt es bei Besichtigungsterminen zu beachten?“
    - „Welche Steuern …?“
    - FAQ. ≈ 2.200 Wörter, keine H3, kein Autor/Datum; Links zu Musterdokument „Kündigung wegen Eigenbedarfs“, Kaufpreisfaktor, Verwalterzustimmung, Vorkaufsrecht.
3) „Haus bei Scheidung“ (`/de/immobilienverkauf/haus-und-scheidung/`): H1 „Haus bei Scheidung: Was passiert bei einer Trennung mit der Immobilie?“; Autorin „Clara Hoffmann, Immobilienexpertin“, 18. Dezember 2025; ≈ 2.000–2.500 Wörter; H2: „Was passiert bei einer Scheidung mit dem Haus?“ · „Welche Rolle spielen Güterstand und Zugewinnausgleich …?“ · „Wie werden die Eigentumsanteile … übertragen?“ · „… Kinder und die familiären Bedürfnisse …?“ · „… Wann kommt es zur Teilungsversteigerung?“ · „Was gilt es steuerlich zu beachten?“ · „Wertermittlung bei Scheidung …“ · „… Immobilienkredit … noch nicht abbezahlt …?“ · „Umgang mit Wohnrecht, Nießbrauch und Nutzungsrecht …“ · FAQ (5). Optionen als fett gesetzte Labels mit „Vorteile/Nachteile/Praxis“; Rechenbeispiel 300.000 € − 120.000 € → 90.000 € Auszahlung; kein interaktiver Rechner. Disclaimer „keine Rechts-, Steuer- oder Finanzberatung“.
4) „Erbschaft“-Hub (`/de/erbschaft/`): H1 „Erbschaft: Was tun, wenn Sie ein Haus oder eine Wohnung erben?“; 16 H2 von „Was passiert bei der Erbschaft einer Immobilie?“ bis „Was ist eine Erbauseinandersetzung?“; Freibeträge, Erbschein, Grundbuchberichtigung „innerhalb von zwei Jahren … kostenfrei“; CTAs „Jetzt kostenlosen Online-Rechner starten!“ und Exit-Popup „Einen Moment noch... Sichern Sie sich jetzt Ihre kostenlose Immobilienbewertung.“; 15 verlinkte Unterartikel.
5) „Maklerprovision“ (`/de/homeday-makler/maklerprovision/`): H1 „Maklerprovision, Maklergebühren & Maklerkosten: Wer zahlt?“; „Redaktion, Homeday GmbH“, 10. Februar 2026; ≈ 3.000–3.500 Wörter; 19 H2 inkl. „Wie hoch sind die Maklerkosten 2026?“, „Lässt sich die Maklerprovision verhandeln?“, „Maklerprovision umgehen – geht das?“, „Das Maklergesetz“, „Sind Homeday-Partnermakler auch gute Makler?“; Baden-Württemberg 7,14 % gesamt / je 3,57 %; Beispielrechnungen 200/400/600 T€; Ländervergleich-Tabelle; kein eigener Rechner, nur Link „Maklerprovision anhand des Immobilienwerts berechnen“ (→ Bewertungsfunnel).
6) „Kosten beim Immobilienverkauf“ (`/de/immobilienverkauf/kosten-beim-immobilienverkauf/`): H1 „Hausverkauf: Kosten für den Eigentümer im Überblick:“; H2 u. a. „Kostenrechner: berechnen Sie ihren ungefähren Nettoerlös“, „Gesamtkostenübersicht: Verkäufer versus Käufer“, „Verifizierte Fallstudie aus der Homeday-Transaktionspraxis:“; JSON-LD enthält Article + FAQPage + WebApplication (Rechner) – der einzige Homeday-Artikel in der Stichprobe mit FAQPage-Schema; datePublished 2024-04-12, dateModified 2026-09-18.
7) „Steuern beim Immobilienverkauf“: H1 „Steuern beim Immobilienverkauf: Infos und Berechnung“; H2 „Spekulationssteuer-Rechner & Beispielrechnung“, „Die Drei-Objekte-Grenze …“, „Neue Rechtsprechung zur Zehn-Jahres-Frist“ (H3 „Drei-Jahres-Frist genügt auch bei Zweitwohnungen“, „Anteilige Besteuerung von vermieteten Räumen“); ≈ 4.500 Wörter.
8) „Nebenkosten Wohnungsverkauf“: H1 „Nebenkosten Wohnungsverkauf: Das fällt 2026 an“; H2 „Verwalterzustimmung beim Wohnungskauf – welche Kosten fallen an?“, „Wiederkehrende Kosten beim Wohnungsverkauf …“, „… steuerlich absetzbar?“ – wohnungsspezifisch (Hausgeld, Verwalterzustimmung, Teilungserklärung verlinkt).

### 1.7 Vertrauenselemente
Trustpilot (Logo/Link, keine Zahl im Roh-HTML; extern ≈ 14.000 Bewertungen) · „Das sagen Medien über uns“ (Startseite) · kostenfreie 0800-Hotline mit Öffnungszeiten · „100% kostenlos & unverbindlich“ · Autorenboxen nur bei neueren Artikeln · Disclaimer bei Rechtsthemen · Hertha-BSC-Sponsoring · Product/AggregateRating-Schema auf Verkaufs- und Bewertungsseiten (Sterne in SERP).

### 1.8 Kontaktwege
Telefon 0800 5 800 555 (Mo–Fr 9–18 Uhr) · E-Mail kontakt@homeday.de · „Rückruf-Service“ (`/de/kontakt-aufnehmen/`) · Hilfecenter (Zendesk) · kein Chat sichtbar · Bewertungsformular als Hauptkanal; Exit-Intent-Popup auf Ratgeberseiten.

### 1.9 Design & Tonalität, Mobile
Sachlich-serviceorientiert, „Sie“-Form, lange nummerierte Ratgeber mit Inhaltsverzeichnis, Vorteils-Icons, viele Wiederholungs-CTAs. Responsive Vue/Nuxt-Frontend (Viewport-Meta vorhanden); mobile Darstellung nicht prüfbar.

### 1.10 SEO
- Titles: Start „Homeday – Der Immobilienmakler für Ihren Immobilienverkauf“
    - Verkaufen „Immobilie verkaufen: alle Tipps & Infos für 2026 | Homeday“
    - Bewertung „Immobilienbewertung kostenlos – sofort, ohne E-Mail“
    - Wohnung „Wohnung verkaufen leicht gemacht: Das ist 2026 wichtig | Homeday“
    - Ratgeber-Hub „Wissenwertes zum Thema Immobilie für Eigentümer | Homeday“ (Tippfehler im Title).
- Muster: Jahreszahl im Title („2026“), Haken-Symbole in Metas, Canonicals sauber, Breadcrumb-Schema.
- Interne Verlinkung: Mega-Menü + „Lesen Sie jetzt:“-Block am Artikelende + kontextuelle Links auf Lexikon/Musterdokumente; jeder Artikel verlinkt mehrfach auf `/immobilienbewertung/`.
- Lokale Landingpage „Immobilie verkaufen Stuttgart“ (`/de/immobilienverkauf/immobilie-verkaufen-stuttgart/`): Title „Immobilie verkaufen Stuttgart | Homeday-Partnermakler“; H1 „Immobilie verkaufen in Stuttgart : Jetzt den Wert erfahren“; H2: „Immobilie verkaufen in Stuttgart – Bestandsimmobilien sind gefragt wie nie“
    - „Warum ist Stuttgart für Immobilienkäufer attraktiv?“
    - „Wann ist der richtige Zeitpunkt …?“
    - „Wie funktioniert der Immobilienverkauf in Stuttgart mit Homeday?“
    - „Warum … mit einem Makler verkaufen?“
    - „Wie finde ich meinen Homeday-Partnermakler in Stuttgart?“
    - „Jetzt Makler vor Ort finden“
    - FAQ
    - „Lesen Sie jetzt“. H3 u. a. „In welchen Stuttgarter Stadtteilen lohnt sich der Immobilienverkauf 2023?“ (veraltet) und fünf Prozess-H3 („Der Stuttgarter Makler ermittelt den Wert der Immobilie“ … „Homeday begleitet Sie bis zum Verkaufsabschluss“). ≈ 2.500 Wörter, generisch, keine Ansprechperson, keine Adresse; Querverlinkung zu Leipzig/Hannover/Bonn-Seiten. Schema nur Breadcrumb.

### 1.11 Technik
Nuxt/Vue-Frontend, Cookiebot (CMP), Google Tag Manager + GA4, Trustpilot-Widget, Zendesk-Hilfecenter, Instapage für Kampagnen-LPs, Cloudflare auf Instapage.

### 1.12 Was Rössler übernehmen kann – und was nicht
Übernehmen: (1) Dreischritt „Immobilie beschreiben → Termin → Verkaufspreis erfahren“ als klare Erwartungssteuerung; (2) wohnungsspezifische Ratgeber (Nebenkosten Wohnungsverkauf, Verwalterzustimmung, Vorkaufsrecht, vermietete Wohnung) – genau Rösslers Nische; (3) „Das Wichtigste zusammengefasst“-Box + nummerierte H2 + FAQ; (4) ein echter Nettoerlös-Rechner (Homeday markiert ihn sogar als WebApplication-Schema); (5) offene Antwort auf den Einwand „anonym bewerten lassen“.
Nicht übernehmen: 128 Lexikon-Begriffe und 80 Blogposts (Skalierungsfalle, „AI-Slop“-Gefahr bei Themen wie „Achsraster“); Städte-LPs ohne lokale Substanz (Stuttgart-Seite nennt Stadtteile von 2023, keine Person); doppelte H1; Exit-Popups; Affiliate-Banner in Ratgebern.

---


## 2. immoverkauf24 – https://www.immoverkauf24.de/

### 2.1 Geschäftsmodell, Reichweite
- Lead-Portal (immoverkauf24 GmbH, Hamburg, „seit 2011“), gehört zum Scout24-Umfeld (der Bewertungs-Flow heißt im Title „RLE Conversion Flow Test“ = Realtor-Lead-Engine, Anzeigen „Jetzt inserieren“ auf immobilienscout24.de mit `utm_source=immoverkauf24`).
- Monetarisierung wörtlich auf der Startseite: „Wir finanzieren diesen Service über die Provision unserer Immobilienprofis“; Bewertungsseite: „immoverkauf24 erhält ggf. eine Vergütung, wenn Nutzer einen Verkauf mit dem Experten wählen“.
- Eigene Zahlen (Startseite/Bewertung): „30 qualifizierte Immobilienfachleute“, „rund 500 aktiven“ Partner-Maklern; Bewertungs-Widget „4.2 / 5“ bei „2109 Bewertungen seit 22.12.2010“ (Seitenbewertung, nicht Trustpilot); Trustpilot-Link ohne Zahl.
- Sitemap: 15.977 URLs, davon 15.351 unter `/immobilienpreise/` (programmatische Preisseiten bis auf Stadtteil-Ebene, z. B. `/immobilienpreise/baden-wuerttemberg/enzkreis/heimsheim/`, `/boeblingen-kreis/leonberg/`, `/boeblingen-kreis/renningen/`, `/ludwigsburg-kreis/ditzingen/`, `/pforzheim/weststadt/`), 216 `/immobilienverkauf/`, 208 `/services/`, 103 `/immobilienmakler/`, 41 `/immobilienbewertung/`, 37 `/presse/`. Redaktionelle Ratgeber ohne Preisseiten ≈ 626.
- robots.txt sperrt GPTBot/ClaudeBot nur für `/immobilienpreise` (Datenschutz der Sprengnetter-Daten).

### 2.2 Navigation (laut WebFetch Startseite, wörtlich)
- „Immobilie bewerten“: Immobilienbewertung · Wertermittlung · Immobilienbewertung A-Z
- „Verkaufen“: Immobilienverkauf · Haus verkaufen · Immobilienverkauf A-Z · Immobilienpreise
- „Makler finden“: Maklersuche · Immobilienmakler · Makler beauftragen
- „Services“: Eigentümer-Services · Vermietung · weitere Services
- Footer: Unternehmen (Über uns · Presse · Karriere · Partner-Makler werden · OneSystem)
    - Kundenservice (Kontakt · FAQ)
    - Unsere Leistungen (Maklerempfehlung · Immobilienbewertung · Immobilienverkauf · Immobilienpreise · Immobilienfinanzierung)
    - Facebook/Instagram/Xing
    - Datenschutz
    - Impressum
    - Sitemap
    - immoverkauf24.at
    - „© 2026 immoverkauf24 GmbH – die Experten für Ihren Immobilienverkauf“.
- Sticky-Leiste mit Hotline, E-Mail und Kontaktformular.

### 2.3 Startseite
- Title „Hausverkauf Makler Immobilienbewertung | immoverkauf24“; Meta „Sie möchten Ihre Immobilie verkaufen? immoverkauf24 bietet Immobilienpreise, Immobilienbewertung, Tipps zum Hausverkauf und eine Maklersuche.“
- Hero (gerendert): Headline „Immobilienverkauf mit immoverkauf24“, Subline „Bewertung in nur 3 Minuten“, Frage „Um welche Immobilie handelt es sich?“ mit Kacheln Haus · Wohnung · Grundstück · Gewerbe, CTA „Kostenlose Bewertung starten“, Bullets „professionelle Bewertung“, „präzise Wertermittlung“, „individuelle Beratung von unseren Experten“; Siegel ausgezeichnet.org und TÜV Saar (SC46158).
- H1 im HTML: „Wir stehen Ihnen beim Immobilienverkauf als Experte zur Seite“ (H3 „Wir beraten immer fair, kostenfrei und sehr persönlich!“).
- Sektionen: drei Karten (Immobilienbewertung „Jetzt Immobilie bewerten“ · Maklersuche „Makler finden“ · PDF-Ratgeber „Jetzt anfordern“) → H2 „Warum mit immoverkauf24 verkaufen?“ („Profitieren Sie von unserer Expertise seit 2011“, drei Häkchen-Punkte, CTA „Jetzt Kontakt aufnehmen!“) → H2 „Das sagen unsere Kunden:“ (nur Trustpilot-Link) → H2 „Ratgeber & Tipps“ (H3 „Vorlagen, Checklisten, Rechner & vieles mehr“; sechs Teaser: Steuer beim Hausverkauf · Vorfälligkeitsentschädigung · Verkauf vermietete Immobilie · Hausverkauf nach Scheidung · Aktuelle Bauzinsen · Haus geerbt – was nun?) → PDF-Block „Kostenlos & unverbindlich als PDF downloaden!“ („25 Praxistipps“, CTA „Jetzt PDF-Ratgeber anfordern“) → H2 „Services & Leistungen von immoverkauf24“ (Grundbuchauszug „Hier erfahren“ · Energieausweis „Hier erstellen“ · Immobilienpreise „Aktuelle Preise“) → H2 „Ihre Experten für den Immobilienverkauf“ → Newsletter „Kostenlosen Newsletter anfordern“.
- Nur ≈ 890 Wörter – die Startseite ist ein Funnel-Einstieg, keine Textwüste.

### 2.4 Bewertungs-Funnel
- Einstieg auf `/immobilienbewertung/` (Title „Immobilienbewertung: Immobilie kostenlos online bewerten“; H1 „Kostenlose Immobilienbewertung online: Wie viel ist Ihre Immobilie wert?“; gerendert: „Was ist meine Immobilie wert?“ / „Bewertung in nur 3 Minuten“).
- Schritt 0: Objektart-Kacheln Haus/Wohnung/Grundstück/Gewerbe → Link `https://www.immoverkauf24.de/maklerempfehlung-flow?property=apartment` (noindex, Title „RLE Conversion Flow Test“). Der Flow ist vollständig JS-gerendert; Feldreihenfolge nicht prüfbar.
- „So funktioniert unsere kostenlose Immobilienbewertung“ (wörtlich): 1. „Angaben zu Ihrer Immobilie“ – „Geben Sie die Postleitzahl der zu bewertenden Immobilie in das obige Eingabefeld ein.“ 2. „Kostenlos Immobilienwert erhalten“ – „Nach wenigen Minuten erhalten Sie Ihre Analyse mit dem aktuellen Immobilienwert als PDF per E-Mail.“ 3. „Bewertung vor Ort“ – „Ein Immobilienexperte wird sich bei Ihnen melden.“
- FAQ-Aussagen zum Funnel: „Welche Angaben muss ich bei der Online-Immobilienbewertung machen?“ → Lage, Immobilienart, Wohnfläche; „Ist eine Immobilienbewertung online anonym möglich?“ → „teilweise anonym“; „Wir bitten Sie auch nur um die Übermittlung derjenigen Daten, die für die Bewertung Ihrer Immobilie unverzichtbar sind.“
- Ergebnis: mehrseitiges PDF per E-Mail („Marktwertspanne“, Marktentwicklung, Berechnungsdetails, als „Ersteinschätzung“ markiert) + telefonische Nachfassung; Unternehmensantwort auf Bewertungsportalen (WebSearch): Kundenberater arbeiten „nur im persönlichen Telefongespräch“, wer nur online möchte, nutzt die „kostenfreie Wohnmarktanalyse“ (PDF per E-Mail). Kritik auf Bewertungsportalen: Telefonnummer sei faktisch Pflicht, Werbeanrufe (Quelle: ausgezeichnet.org/trustami-Zusammenfassung via WebSearch, nicht unabhängig verifiziert).
- Vertrauens-Microcopy am Funnel: „100 % kostenlos und unverbindlich“, Expertenzitat Willi Kluge (Makler, ESDI Immobilien), Siegel, „Als 2011 gegründetes Expertenportal“.
- Bewertungsseite selbst: ≈ 4.600 Wörter Ratgeber unterhalb des Formulars, H2 „Tabelle: Welche Immobilienbewertung passt zu welcher Situation?“, „8. Was ist der aktuelle Immobilienwert für Q1 in 2026?“, Lead-Magnet PDF „36 Wichtige Wertfaktoren“ (`/media/immobilienbewertung_checkliste.pdf`), Autorin Jasmin Löhr, „Zuletzt aktualisiert am 09.10.2026“, JSON-LD FAQPage (6 Fragen) + Product/AggregateRating.
- Wohnungs-Variante `/immobilienbewertung/wohnungsbewertung/`: H1 „Wohnungsbewertung: So berechnen Sie den Wert Ihrer Wohnung“, H2 u. a. „10. Freie Wohnung versus vermietete Wohnung: Welcher Wert ist höher?“, H3 „Welche Rolle spielt Gemeinschaftseigentum bei der Bewertung einer Wohnung?“, Checkliste-PDF „Wohnung selbst bewerten“ (`/media/immoverkauf24-checkliste-wohnungsbewertung.pdf`), FAQPage-Schema (5 Fragen), Expertenzitat Andreas Wäscher.

### 2.5 Verkaufen-Seite `/immobilienverkauf/`
- Title „Immobilie verkaufen: So wird der Immobilienverkauf zum Erfolg“; H1 „Immobilie verkaufen: So gelingt der erfolgreiche Immobilienverkauf 2026“; Autorin Jasmin Löhr; „Zuletzt aktualisiert am 11.09.2026“; datePublished 2010-12-22; ≈ 6.250 Wörter; JSON-LD FAQPage (7 Fragen) + Product/AggregateRating.
- H2 (nummeriert): „1. Schritt für Schritt: Wie läuft der Immobilienverkauf ab?“
    - „2. Immobilie verkaufen mit oder ohne Makler?“
    - „3. Welche Kosten fallen beim Immobilienverkauf an?“
    - „4. Welche Steuern …?“
    - „5. Mit welcher Dauer … ist zu rechnen?“
    - „6. Wann sollte ich meine Immobilie verkaufen?“
    - „7. Aktuelle Marktlage 2026: Ist es sinnvoll, jetzt eine Immobilie zu veräußern?“
    - „8. Zu welchem Preis kann ich meine Immobilie verkaufen?“
    - „9. Wie finde ich den richtigen Käufer …?“
    - „10. Die wichtigsten Tipps …“
    - „11. Fazit …“
    - „Immobilie verkaufen - Ratgeber mit 25 Praxistipps herunterladen“.
- H3 (Auswahl): „Chancen und Risiken, wenn Sie Ihre Immobilie ohne Makler verkaufen“
    - „Wie finde ich einen Makler …?“
    - „Wer trägt welche Kosten …?“
    - „Beispiel: Kosten beim Immobilienverkauf berechnen“
    - „Wann fällt die Spekulationssteuer an?“
    - „Immobilie verkaufen: Rechner für den idealen Verkaufspreis“
    - „Online-Vermarktung der Immobilie“
    - „Lokale Vermarktungsmaßnahmen“
    - „Diskrete Vermarktung der Immobilie“
    - „Die 3 häufigsten Fehler, wenn Sie Ihre Immobilie privat verkaufen“
    - „Kostenlos und unverbindlich den Ratgeber anfrodern“ (Tippfehler im Original).
- Logik: Ablauf → Makler-Entscheidung → Kosten/Steuern → Dauer/Zeitpunkt/Markt → Preis → Käufer → Tipps → Fazit → Lead-Magnet. Jeder zweite Abschnitt enthält eine Objektart-Auswahl oder „Jetzt Wert ermitteln“ (→ `/maklerempfehlung-flow`). Experten-Zitat Constanze Zumbaum („Vom Verkäufermarkt zum Käufermarkt“). Kein interaktiver Rechner auf der Seite; „Rechner“ meint den Bewertungs-Flow.
- Wohnungs-Variante `/immobilienverkauf/wohnungsverkauf/` (Title „Wohnung verkaufen: Ablauf, Kosten & Checkliste für 2026“; H1 „Wohnung verkaufen: So gelingt der erfolgreiche Wohnungsverkauf in 2026“; Jasmin Löhr, 12.10.2026; ≈ 5.400 Wörter; FAQPage 6 Fragen). H2: „1. Wohnung verkaufen – wann lohnt es sich wirklich?“ · „2. Schritt für Schritt …“ (H3 Vorbereitung · Vermarktung · Verkauf · „Wie lange dauert es, eine Eigentumswohnung zu verkaufen?“) · Anzeige „Jetzt ab 0€ Mieter oder Käufer finden bei ImmoScout24“ · „3. Welche Unterlagen …“ (H3 „Wohnungsverkauf Checkliste: Diese Unterlagen brauchen Sie“, „Welche Unterlagen sind beim Wohnungsverkauf anders als beim Hausverkauf?“, „Wo bekommen Sie die Dokumente …?“) · „4. Welche Kosten …“ (Tabelle Kostenposition/durchschnittliche Kosten/Wer zahlt; „500 Euro bis etwa 4 Prozent des Verkaufspreises“) · „5. Welche Steuern …“ · „6. Wohnung verkaufen ohne Makler oder mit Unterstützung?“ (Listen „Wohnung privat verkaufen, wenn …“ / „Wohnung mit Makler verkaufen, wenn …“) · „7. … Was ist Ihre Immobilie wert?“ · „8. … schnell zu verkaufen?“ · „9. Eigentumswohnung verkaufen oder vermieten …?“ · „10. Wann sollten Sie Ihre Wohnung vermietet und wann unvermietet verkaufen?“ (Pro/Contra-Tabelle; H3 „Was ist bei der Veräußerung einer Wohnung mit Eigentümergemeinschaft zu beachten?“, „Wie beeinflusst das Vorkaufsrecht den Wohnungsverkauf?“) · „11. Fazit“ · „12. Tipps zum Wohnungsverkauf: Ratgeber kostenlos downloaden“. Lead-Magnete: „Wohnungsverkauf Checkliste“ (Unterlagen), „30 Käuferfragen Checkliste“ (`/media/immoverkauf24_checkliste_kaeuferfragen.pdf`), „25 Praxistipps zum Wohnungsverkauf“ (per Formular), Preisspiegel-Ratgeber (Formular). FAQ: „Was muss man beachten, wenn man eine Eigentumswohnung verkauft?“ · „Ist es sinnvoll, 2026 eine Eigentumswohnung zu veräußern?“ · „Welche Kosten …?“ · „Wie viel Steuer …?“ · „Wie unterscheidet sich der Wohnungsverkauf vom Hausverkauf?“ · „Was muss ich beim Verkauf einer geerbten Wohnung beachten?“.

### 2.6 Ratgeber – vollständige Themenstruktur (Sitemap)
Die Ratgeber sind in thematische Silos mit „A-Z“-Glossaren organisiert:
- `/immobilienverkauf/hausverkauf/` (≈ 45): Steuer
    - Makler
    - privat
    - Vertrag
    - Kosten
    - Checkliste
    - Unterlagen
    - Vollmacht
    - Energieausweis
    - Vorfälligkeitsentschädigung
    - Rentenbasis
    - verkaufen oder vermieten
    - innerhalb der Familie
    - kaufen und verkaufen
    - Hausanteil verkaufen
    - im Alter
    - verkaufen und wohnen bleiben
    - Fehler
    - mit Grundschuld
    - 20 Städte-Seiten (`hausverkauf-staedte/haus-verkaufen-stuttgart/` usw.).
- `/immobilienverkauf/wohnungsverkauf/`, `/grundstuecksverkauf/`, `/verkauf-kapitalanlage/` (vermietetes Haus · vermietete Wohnung · Mehrfamilienhaus · Pflegeimmobilie · Ferienhaus · Gewerbe: Hotel/Restaurant/Halle/Büro/Laden/Supermarkt).
- `/immobilienverkauf/immobilienverkauf-a-z/` (≈ 110 Glossar-Artikel, u. a. Spekulationssteuer · Verkäufercourtage · Käufercourtage · Makleralleinauftrag · Teilungserklärung · Sondereigentum · Sondernutzungsrecht · Gemeinschaftseigentum · Hausgeld · Wohngeldabrechnung · Wirtschaftsplan · Protokoll Eigentümerversammlung · Verwalterzustimmung · Instandhaltungsrücklage · Sonderumlage · Teileigentum · Miteigentumsanteil · Abgeschlossenheitsbescheinigung · Aufteilungsplan · Wohnungseigentumsgesetz · Wohnungspreise · Leibrente · Teilverkauf · Nießbrauch · Umkehrhypothek · Rückmietverkauf · Notarkostenrechner · Kaufnebenkostenrechner · Bieterverfahren · Homestaging · Exposé · Besichtigungen · diskrete Vermarktung · versteckter Mangel · Gewährleistung · Zwangsversteigerung).
- `/immobilienverkauf/scheidung-haus/` + `/zugewinnausgleich/`.
- `/immobilienverkauf/erbschaft/` (≈ 45): haus-erben (vererben, geerbtes Haus verkaufen, geerbtes Haus vermieten)
    - wohnung-erben (wohnung vererben, Mietvertrag erben)
    - immobilie-erben
    - grundstueck-erben
    - erbrecht (Erbfolge, Pflichtteil, Erbe ausschlagen, Erbschein, Erbauseinandersetzung, Erbengemeinschaft, Testament, Erbvertrag, Erbschaftssteuer, Schenkungssteuer)
    - erben-a-z (Abschichtung, Alleinerbe, Berliner Testament, Enterben, Erbteil verkaufen, Erbenhaftung, Nachlass, Nachlassverwalter, Nachlassverzeichnis, Teilungsversteigerung, Testamentseröffnung, Testament anfechten, Vor-/Nacherbe …).
- `/immobilienverkauf/schenkung/` (Schenkungsvertrag, Pflichtteilsergänzungsanspruch, Schenkung an Kinder) · `/wertsteigerung-immobilie/`.
- `/immobilienbewertung/` (41): Haus-/Wohnungs-/Grundstücksbewertung · Verkehrswert · Wertermittlung (Ertragswert, Sachwert, Vergleichswert) · Wertgutachten · Wohnmarktanalyse · Hauswertrechner · Gewerbe · A-Z (Bodenrichtwert, Bodenwert, Marktanpassungsfaktor, Liegenschaftszins, Erbbaurecht, Wohnrecht, Wegerecht, Baulast, ImmoWertV, Gutachter …).
- `/services/` (208): Energieausweis (8)
    - Entrümpelung/Haushaltsauflösung
    - Grundbuchauszug anfordern
    - Vermietung (Miete, Mieter kündigen, Tipps für Vermieter, Vermietung A-Z)
    - Sanierung/Sanierungsrechner
    - Immobilienfinanzierung/Bauzinsen
    - Expertenrat (Autorenprofile + Fachartikel, z. B. „Immobilienverkauf scheitert kurz vor Vertragsunterzeichnung“, „Immobilienverkauf mit Mängeln“).
- `/immobilienmakler/` (103): Maklersuche nach Bundesland/Stadt (z. B. `immobilienmakler-stuttgart/`), Maklervertrag (Muster, Widerrufsrecht), Makler beauftragen, Aufgaben, Maklerprovision, Makler-Bewertung, Makler-Empfehlung.

Gelesene Artikel:
1) „Wohnung erben“ (`/immobilienverkauf/erbschaft/wohnung-erben/`): Title „Wohnung erben: Infos & Tipps zu Kosten, Steuer & Verkauf“; H1 „Wohnung erben: Alles Wichtige zu Kosten, Steuer & Verkauf“; datePublished 2019-04-24, dateModified 2026-10-07 (kein sichtbarer Autor); ≈ 4.400 Wörter sichtbar (≈ 2.500–3.000 Haupttext). H2 1–8: „Wohnung geerbt – Erbe annehmen oder ausschlagen?“ · „Wie werde ich als Erbe Eigentümer der Wohnung?“ · „Wie verhält es sich mit den Miterben …?“ (H3: (Weiter-)Vermietung · Verkauf · Selbstnutzung/Auszahlen der Miterben · Teilungsversteigerung) · „… muss ich Erbschaftssteuer zahlen?“ · „Welche Kosten entstehen und wie kann ich Kosten sparen?“ · „Wie viel habe ich geerbt, was ist die Wohnung wert?“ · „Geerbte Wohnung verkaufen, vermieten oder selbst nutzen?“ · „Hilfreiche Praxistipps …“. Kernaussagen: Ausschlagungsfrist sechs Wochen (§ 1944 BGB); Spekulationsfrist läuft ab Erwerb des Erblassers; Finanzamt setzt bei vermieteten Objekten 10 % ab; § 198 BewG-Gutachten; Grundbuch zwei Jahre gebührenfrei; WEG-Prüfpunkte Protokoll/Instandhaltungsrücklage/Sonderumlage. Gesetzeslinks (gesetze-im-internet.de). CTAs: „Was ist meine geerbte Wohnung wert? Jetzt kostenlos Wert ermitteln!“, „Erbteil verkaufen? Jetzt informieren!“, „Jetzt kostenlosen Ratgeber erhalten!“ (PDF „Immobilie erben“ per E-Mail-Formular). Kein FAQ-Block, kein FAQPage-Schema.
2) „Scheidung mit Haus“ (`/immobilienverkauf/scheidung-haus/`): H1 „Scheidung mit Haus: Was passiert mit der Immobilie bei einer Trennung?“; Jasmin Löhr; „Zuletzt aktualisiert am 24.07.2026“ (datePublished 2012-03-02); ≈ 4.800 Wörter; 10 nummerierte H2 + 20 H3 (u. a. „Haus verkaufen bei Scheidung“ mit H4 „Hausverkauf ohne/mit Ehevertrag“, „Das Haus bei Scheidung auszahlen“, „Realteilung“, „Übertragung … auf gemeinsame Kinder (mit Wohnrecht)“, „Teilungsversteigerung“, „Spekulationssteuer beim Hausverkauf nach Scheidung“, „Grunderwerbsteuer vermeiden durch rechtzeitige Übertragung“, „Beispiel: Berechnung der Kosten bei Scheidung mit Haus“, „Wichtiger Unterschied: Immobilienverkauf während und nach der Trennung“). FAQPage-Schema (6 Fragen: „Wie wird bei einer Scheidung das Haus aufgeteilt?“ …). CTAs „Jetzt kostenlose Maklerempfehlung bei Trennung & Scheidung einholen!“ – situationsspezifischer CTA-Text. Fazit als 5-Schritte-Ablauf.
3) „Spekulationssteuer“ (`/immobilienverkauf-a-z/spekulationssteuer/`): H1 „Spekulationssteuer: Das gilt es bei Immobilien zu beachten!“; David Stange „Experte für Immobilienfinanzierung“; 04.08.2026; ≈ 3.200 Wörter; H2 „5. Spekulationssteuer mit Spekulationssteuer-Rechner selbst berechnen“ (Rechner angekündigt, Felder im Text nicht benannt – nicht prüfbar); Beispieltabelle Steuerklasse (alleinstehend 27,45 % → 20.588 € vs. verheiratet 17,42 % → 13.066 € bei 40 T€ Gewinn, „Stand März 2025“); H3 „Fall 2: Spekulationssteuer bei Erbschaft & Schenkung“; FAQPage-Schema (5); Links auf FG-Urteil und § 23 EStG.
4) „Innenprovision/Verkäufercourtage“: H1 „Innenprovision: Alle wichtigen Infos zur Verkäuferprovision“; Bernd Benno Herrfurth (Schreibweise im Text „Herrfuhrth“ – Inkonsistenz); 31.08.2026; nur ≈ 900 Wörter, 4 H2, kein Rechner, keine Tabelle; BW nur als Beispiel für „7,14 Prozent inkl. Mehrwertsteuer“.
5) „Hausverkauf Kosten“: H1 „Hausverkauf Kosten: Mit welchen Kosten müssen Verkäufer rechnen?“; Jasmin Löhr; 09.09.2026; ≈ 3.800 Wörter; 7 H2/12 H3; FAQPage (5); Links auf „Vorfälligkeitsrechner“, „Spekulationssteuer-Rechner“, „Sanierungsrechner Kosten & Wertsteigerung berechnen!“, Kooperations-Anzeige ImmoScout24.
6) „Vermietetes Haus verkaufen“: H1 „Vermietetes Haus verkaufen: Preisabschlag, Kündigung & Rechte“; 11 H2 inkl. „4. Mieter kündigen und Haus verkaufen – ist das erlaubt?“, „8. Gibt es Alternativlösungen …?“ (H3 „Mietaufhebungsvertrag mit Abfindung“, „Hausverkauf an den Mieter“); FAQPage (6); §§ 566/573/577 BGB verlinkt.

### 2.7 Vertrauenselemente
TÜV Saar und ausgezeichnet.org-Siegel · Trustpilot-Link · Seiten-Bewertungswidget („Bewerten Sie diese Seite“, 4/5 bei 700 Bewertungen auf der Wohnungsseite) · Autorenprofile unter `/services/expertenrat/experten/` (ca. 25 Personen) · „Zuletzt aktualisiert am …“ sichtbar · Gesetzesverweise · Expertenzitate (Makler, Immobilienkauffrau) · kostenfreie Hotline mit langen Zeiten (Mo–Fr 08:30–20:00, Sa 09:30–18:00) · Transparenzhinweis zur Provisionsfinanzierung.

### 2.8 Kontaktwege
0800 - 1004215 (kostenlos) · info@immoverkauf24.de · Kontaktformular „Anfrage senden“ · Newsletter · Sticky-Kontaktleiste · auf Stuttgart-LP zusätzlich Festnetz +49 40 3003965-0 · kein Chat.

### 2.9 Design & Tonalität, Mobile
Portal-Look (Bootstrap), dichte Textseiten mit Inhaltsverzeichnis („Direkt zum Wunschthema“), Hinweiskästen, Tabellen, Werbe-Einschübe („Anzeige“). Tonalität: erklärend-neutral, „Sie“, jedoch in jedem Abschnitt Makler-/Bewertungs-CTA. Mobile nicht prüfbar (Bootstrap-Grid, Viewport vorhanden).

### 2.10 SEO
- Titles: Start s. o. · Verkaufen „Immobilie verkaufen: So wird der Immobilienverkauf zum Erfolg“ · Bewertung „Immobilienbewertung: Immobilie kostenlos online bewerten“ · Wohnung „Wohnung verkaufen: Ablauf, Kosten & Checkliste für 2026“ · Leonberg-Preise „Immobilienpreise in Leonberg: Quadratmeterpreise Stand 2026 | immoverkauf24“ (Meta nennt konkrete €/m²).
- Interne Verlinkung: Breadcrumb, „Direkt zum Wunschthema“, Querverweis-Kästen (z. B. „Hausverkauf nach Scheidung? Hier vertrauenswürdigen Makler finden!“), Glossar-Verlinkung in jedem Absatz; sehr tiefe Silo-Struktur.
- Lokale Seiten: (a) `/immobilienverkauf/hausverkauf/hausverkauf-staedte/haus-verkaufen-stuttgart/`: H1 „Immobilie verkaufen Stuttgart: Tipps für den Hausverkauf in Stuttgart“; 7 H2 (Preise, Stadtteile, Zeitpunkt, Ablauf mit immoverkauf24, Kosten, privat/Makler, Wert); Daten „Stand 3. Quartal 2022“ (Häuser Ø 6.587 €/m², Killesberg 8.529 €/m² …) – veraltet; Makler-Teaser „Ihre Maklerin in Frauenkopf“, „Ihr Makler in Bad Cannstatt“; kein FAQ; ≈ 3.000 Wörter. (b) Preisseite Leonberg (`/immobilienpreise/baden-wuerttemberg/boeblingen-kreis/leonberg/`): H1 „Immobilienpreise für Leonberg in 2026“; H2 „Entwicklung der Quadratmeterpreise in Leonberg“
    - „Preisatlas für Leonberg“
    - „Immobilienpreisentwicklung im Vergleich zum Vorquartal im Umkreis von Leonberg“
    - „Wie viel Gewinn würde ich beim Verkauf meiner Immobilie heute wahrscheinlich erzielen?“
    - „Das sagen unsere Kunden“
    - „Quadratmeterpreise im Umkreis von Leonberg“; Daten „Powered by Sprengnetter“, Q2 2026: Wohnungen Ø 4.042,68 €/m² (+0,20 %), Häuser Ø 4.732,59 €/m² (−1,44 %); FAQPage-Schema mit drei programmatischen Fragen („Was kostet eine Wohnung in Leonberg?“ …, mit Zahlendreher-Inkonsistenz „gefallen“ vs. „+0,20 %“); Canonical zeigt fälschlich auf `/immobilienpreise/` (SEO-Fehler, der die Seite praktisch aus dem Index nimmt). Nachbarorte Rutesheim, Weissach, Ditzingen, Korntal-Münchingen, Schwieberdingen, Grafenau verlinkt.

### 2.11 Technik
REDAXO (yrewrite-Stylesheet in Sitemap), Bootstrap, Tealium (Tag-Management), GA4, Hotjar, Optimizely (A/B-Tests auf Bewertungsseite), Trustpilot; Cookie-Banner: kein bekannter CMP-Marker im HTML (vermutlich Tealium Consent) – nicht eindeutig prüfbar.

### 2.12 Übertragbarkeit auf Rössler
Übernehmen: die Silo-Idee in klein (Verkauf · Bewertung · Erbe · Scheidung · WEG-Begriffe), situative CTA-Texte („… bei Trennung & Scheidung“), sichtbares „Zuletzt aktualisiert“, Gesetzesverweise, PDF-Checklisten als Lead-Magnet (Unterlagen Wohnungsverkauf, Käuferfragen), Preisdaten pro Ort als Tabelle mit Quelle.
Nicht übernehmen: 15.000 programmatische Preisseiten (ohne Lizenzdaten nicht machbar, Canonical-Fehler zeigt Risiko), 110-teilige Glossare, Telefon-Pflicht im Funnel (negative Bewertungen), Fremdwerbung in Ratgebern, veraltete Stadtseiten.


## 3. Von Poll Immobilien – https://www.von-poll.com/de

### 3.1 Geschäftsmodell, Reichweite
- Franchise-/Lizenzsystem mit „400+ Shops in Europa“, „1.500+ Immobilienprofis“, Premium-Positionierung „Immobilien in den besten Lagen“; Zusatzmarken VON POLL FINANCE (Finanzierung), Hausverwaltung, Sanierungsplaner (`sanieren.von-poll.com`), Kundenportal `home.von-poll.com` (Bewertung, Käuferfinder, Suchprofil).
- Sitemap DE: 1.963 URLs; davon 919 `/de/immobilienmakler/…` (Shop-Seiten), 340 Jobs, 150 Unternehmen, 80 Blog, 46 Ratgeber, 16 Maklerprovision-Länderseiten, 16 Kaufnebenkosten, 16 Grundsteuer, 16 Grunderwerbsteuer, 12 Immobilienmarkt, 207 lokale „immobilienbewertung-<ort>“-Landingpages (inkl. `immobilienbewertung-leonberg`, `-stuttgart`, `-pforzheim`, `-boeblingen`, `-herrenberg`, `-fellbach`).
- Zwei in der Index-Sitemap gelistete Sub-Sitemaps für „Immobilien-verkaufen“ und „Immobilienbewertung“ liefern 404 (technische Inkonsistenz).

### 3.2 Navigation
- Header (gerendert): „KI-Modus“, „Suchen“, „Bewerten“ (→ `home.von-poll.com/de-de/immobilie-bewerten`), „Sanieren“ (→ Sanierungsplaner-Wizard), „Verwalten“; Sprachwahl DE/AT/CH/EN/ES/FR/GR/HU/IT/PT.
- Footer-Struktur (aus Roh-HTML-Links): Immobilien entdecken · Hauskauf · Wohnungskauf · „Verkauf Ihrer Immobilie“ · Kontakt aufnehmen · Standorte („Zu den Shops“) · Länderseiten · Beste-Lage-Magazin · Blog · Datenschutzerklärung; auf Ratgeberseiten Kontaktblock „ZENTRALE FRANKFURT AM MAIN“ mit „+49 69 26 91 57-0“ / „info@von-poll.com“ und „ZUR SHOP-ÜBERSICHT“.
- Zahl Ratgeber laut Sitemap: 45 Artikel unter `/de/immobilien-ratgeber/` + 79 unter `/de/immobilienblog/` (Lifestyle/Markt) + 6 Tech-Blog.

### 3.3 Startseite
- Title „VON POLL IMMOBILIEN – Ihr Immobilienmakler in den besten Lagen“; Meta „VON POLL IMMOBILIEN gehört zu den größten Immobilienmaklern in Europa. Wir vermitteln hochwertige Immobilien in bevorzugten Wohnlagen.“
- H1 „Entdecken Sie exklusive Immobilien in den besten Lagen“ – Käufer-Fokus (Suchleiste mit „Suchen“/„KI-Modus“). Verkäufer-Einstieg nur über „Bewerten“ und spätere Sektionen.
- Sektionen (H2): „Aktuelle Immobilienangebote“ → „Exklusive Immobilien in den besten Lagen Europas“ → „Unsere Stärken - Ihre Vorteile“ (H3 „Europaweites Netzwerk, lokale Marktexpertise“, „Digitale Premiumleistungen für alle Belange“, „Professionelles Marketing für Ihren Verkaufserfolg“) → „Unsere digitalen Premiumleistungen“ (H3 „Online-Immobilienbewertung mit laufenden Updates“ CTA „Jetzt Immobilie bewerten“; „Erfolgreicher Immobilienverkauf dank digitaler Premiumleistungen“ CTA „Verkaufssimulator starten“; Suchprofil; Finanzierung; Verwaltung) → „Das sagen unsere Kunden über uns“ (drei 5-Sterne-Zitate aus ProvenExpert, Trustpilot, Google) → Magazin „BESTE LAGE“ → „Neueste Artikel aus unseren Blogs“ → „Frühzeitig von neuen Immobilienangeboten erfahren“ → „Wer wir sind und wofür wir stehen“ → „Unsere Unternehmenswerte“ (Vertrauen, Begeisterung, Bestleistung, Innovationskraft) → „Mehr als 400-mal in Europa vertreten“ → „Eine gute Entscheidung“ (Zitat Beata von Poll, CTA „Jetzt Immobilie bewerten“) → „VON POLL IMMOBILIEN Vermarktungskompetenz“ (Kennzahlen „8.901 aktuelle Immobilienangebote“, „mehr als 550.000 potenziellen Käufern“, „über 700 Banken, Sparkassen und Versicherungen“) → Newsletter → „Ihr Immobilienmakler in den besten Lagen“ (Städte-Linklisten) → „Wir sind für Sie da“ (Rückruf-/Kontaktformular).
- ≈ 3.300 Wörter; JSON-LD RealEstateAgent, ReserveAction (Terminbuchung), SearchAction.

### 3.4 Bewertungs-Funnel
- Landingpage `/de/immobilienbewertung/`: Title „Immobilienbewertung: Lassen Sie Ihre Immobilie bewerten“; Meta „Immobilienbewertung unverbindlich & kostenfrei ✓ Vergleichsobjektanalyse ✓ Insights zur Lage und Preisentwicklung ✓ Jetzt Immobilie bewerten lassen“; H1 im HTML „Immobilienbewertung: Ihre Mehrwerte bei VON POLL IMMOBILIEN“ (gerendert: „Immobilienbewertung: Lassen Sie Ihre Immobilie bewerten“, Subline „Online-Immobilienbewertung: exklusiv und professionell.“). Objektart-Buttons verlinken auf `home.von-poll.com/de-de/immobilie-bewerten?haus=true|wohnung=true|mehrfamilienhaus=true`.
- Funnel-Seite `home.von-poll.com/de-de/immobilie-bewerten` (Title „Immobilie bewerten lassen - VON POLL IMMOBILIEN“): H1 „Wissen, was Ihre Immobilie wert ist.“; H2 „Welche Immobilie möchten Sie bewerten?“ (Wohnung · Haus · Mehrfamilienhaus) · „Was ist meine Immobilie wert?“ · „Moderne Technologien und regionales Markt-Know-How“ · „Ihr direkter Zugang zu vorgeprüften Kaufinteressenten“ (Käuferfinder) · „Ihre Vorteile im Überblick“ · „Alle Funktionen auf einen Blick“ (H3 „Wert und Entwicklung“, „Lage und Umfeld“, „Markt und Nachfrage“, „Portfolio und Weitergabe“) · „Wissenswertes“ · „Sie haben eine Frage?“. JSON-LD enthält FAQPage + Service + VideoObject.
- Im JS-Bundle des Funnels (js/vp_flow/11.js) belegte Strings: „Schritt {current} von {total}“ (Fortschrittsanzeige), „Zurück zur Auswahl der Objektart“, „Weiter“, „Zurück“, „Vorname“, „Nachname“, „E-Mail-Adresse“, „Bitte geben Sie eine gültige E-Mail-Adresse ein.“, „Passende Angebote per E-Mail“. Auf der Leonberg-LP: „Bitte Straße mit gültiger Hausnummer angeben.“ Daraus belegbar: mehrstufiger Wizard (Objektart → Adresse mit Hausnummer → Eckdaten/„grobe Einschätzung zu ihrem Zustand“ → Vorname/Nachname/E-Mail). Exakte Reihenfolge der Objektfelder nicht prüfbar.
- Versprechen (wörtlich): „Kostenfrei und unverbindlich“, „Sofortige Ergebnisanzeige“, „Marktpreiseinschätzung in wenigen Minuten online ermitteln“, „Ihre Daten werden von uns weder veröffentlicht, noch ohne Ihre explizite Erlaubnis an Dritte weitergegeben.“, laufende „Updates zur Preisentwicklung“ (deaktivierbar), „Bewertungsexposé“ nur nach persönlicher Bewertung. Ergebnis: sofort online („erste Indikation“ aus Vergleichsangeboten der letzten fünf Jahre), dauerhaft im Kundenportal/App; keine Preisspanne per Mail belegt.
- Besonderheiten: Verkaufssimulator, Käuferfinder („Passende Käufer entdecken → Kontakt herstellen → Professionell verkaufen“), VON-POLL-App mit Eigentümer-Tracking, Terminbuchung („Termin buchen“, „Video- oder Telefonberatung“).
- FAQ der Bewertungsseite (H2 „Immobilienbewertung online durchführen: Ihr praktisches FAQ“, 11 + 6 Fragen, z. B. „Was unterscheidet das Ergebnis eines Online-Bewertungs-Tools („Automated Valuation Model“ / „AVM“) vom Verkehrswert nach Paragraph 194 BauGB?“, „Sind die Online-Immobilienbewertung und eine persönliche Marktpreiseinschätzung durch einen Immobilienmakler wirklich kostenlos?“) – kein FAQPage-Schema auf der Marketingseite, wohl aber auf der Funnel-Seite.

### 3.5 Verkaufen-Seite `/de/immobilie-verkaufen`
- Title „Immobilie verkaufen - VON POLL IMMOBILIEN“; Meta „Sie möchten Ihre Immobilie verkaufen? ✓ Expertentipps für Eigentümer ✓ Verkaufsprozess im Überblick ✓ ► Alles lesen zum erfolgreichen Immobilienverkauf“.
- H1 „Immobilie verkaufen – wir sind für Sie da“; Vorspann „Das digitale Zuhause rund um Ihre Immobilie“.
- H2 (wörtlich, Reihenfolge): „Ihr ausführlicher Ratgeber zum Immobilienverkauf“ (im HTML ist der komplette Einleitungsabsatz Teil des H2-Tags – Markup-Fehler) · „Immobilien erfolgreich verkaufen: sechs Tipps zur optimalen Vorbereitung“ (H3 „1. Immobilie über unseren Online-Bewertungsservice … bewerten lassen.“ · „2. Das „Geheimnis“ des Verkaufserfolgs: Rahmenstrategie zurechtlegen.“ · „3. Zusätzlich benötigte Unterlagen zusammenstellen.“ · „4. Startklar machen für Besichtigungstermine.“ · „5. Klärung der Ablöse Ihres Immobiliendarlehens.“ – ein sechster Tipp fehlt als H3) · „Bestmögliche Beratung durch technologiebasierte Bewertungen und regionale Expertise“ · „Warum mit VON POLL IMMOBILIEN verkaufen?“ · „Marktgerechter Verkaufspreis“ · „Beschleunigte Vermarktung“ · „Individuelle Immobilienberatung“ · „Zum Ablauf des Immobilienverkaufs: Ihre hilfreiche Checkliste“ · „Mit VON POLL IMMOBILIEN in der Verkaufsphase – wertvolle Erfahrungswerte“ · „Diese Vorteile bietet Ihnen ein Immobilienverkauf mit unseren Maklern:“ · „Unser 5-Schritte Modell für einen erfolgreichen Immobilienverkauf“ (Vorbereitet · Sicher · Werbewirksam · Digital · Verlässlich) · „Folgende Besonderheiten bietet der Immobilienverkauf mit VON POLL IMMOBILIEN:“ · H3 „Die wichtigsten Fragen rund um den Immobilienverkauf“ (FAQ, 9 Fragen).
- ≈ 5.500 Wörter. Argumentation: Problem (Aufwand, Preisfindung, typische Privatverkäufer-Fehler, belegt mit eigener Umfrage „November 2021 unter 259 Immobilienexperten“, elf Fehlerpunkte) → Lösung (Makler übernimmt alles) → Beweis (PersCert®/WertCert®-Sachverständige, IHK-Ausbildung, Auszeichnungen 2022 „Qualitätssiegel ‚Höchste Kompetenz‘“, „begehrtester Immobilienmakler“, ProvenExpert) → CTA (Online-Bewertung, Kontakt, Telefon, Terminbuchung).
- Einwandbehandlung (im Text, keine Tabelle): Provision („Käufer und Verkäufer teilen … meist 50/50“, fällig nur bei Kaufvertrag), Kontrollverlust (Alleinauftrag), „Kann ich den Wert meiner eigenen Immobilie am besten einschätzen?“ (verneint, Emotion), Online-Tools (AVM nur Orientierung, keine Bewertung „nach ImmoWert-V 2022“), kleinerer Käuferkreis durch Provision („dafür kaufkräftiger und ernsthafter“).
- FAQ (wörtlich): „Fallen bei einem privaten Immobilienverkauf Steuern an?“
    - „Lässt sich die Maklerprovision steuerlich absetzen?“
    - „Wie hoch sind die Kosten bei einem Immobilienverkauf?“
    - „Wie viele Immobilien darf ich privat verkaufen?“
    - „Sollen Mängel im Kaufvertrag erwähnt werden bzw. welche?“
    - „Was bedeutet „freihändiger Verkauf einer Immobilie“?“
    - „Welche Werbewege sind zu empfehlen, um den richtigen Käufer zu finden?“
    - „Kann ich den Wert meiner eigenen Immobilie am besten einschätzen?“
    - „Was kostet eine Online-Immobilienbewertung und eine persönliche durch einen Immobilienmakler?“.
- Keine Vergleichstabelle mit/ohne Makler, kein Rechner; YouTube-Video „Immobilienverkauf mit VON POLL IMMOBILIEN“.

### 3.6 Ratgeber
Hub `/de/immobilien-ratgeber` (Title „Immobilien Ratgeber - VON POLL IMMOBILIEN“; H1 „Ratgeber-Blog“; H2 „Hier finden Sie umfassende Erläuterungen zu Themen aus dem Immobilienbereich.“): chronologische Teaser-Liste (Bild, Titel, Datum, Byline „VON POLL IMMOBILIEN“ oder „Wolfram Gast“, Anreißer, „Weiterlesen“), keine Kategorien, keine Filter, keine Lesezeit auf der Übersicht (im Artikel schon).
Vollständige Themenliste (49 gelistet, 45 in Sitemap), gruppiert:
- Verkauf: Hausverkauf Checkliste (10 Schritte) · Hausverkauf Vertrag · Geerbtes Haus verkaufen · Hausverkauf auf Rentenbasis · Immobilienkaufvertrag · Notartermin · Grundschuld löschen · Maklerprovision · Wohnflächenberechnung · Nutzfläche DIN 277 · Grundbuchauszug anfordern · Grundbuch · Auflassungsvormerkung · Teilungserklärung · Sondernutzungsrecht · Eigentümergemeinschaft.
- Recht/Steuern: Grunderwerbsteuer · Kaufnebenkosten · Schenkungsvertrag · Güterstand Zugewinngemeinschaft · Erbengemeinschaft auflösen · Zweitwohnsitz anmelden · Sanierungspflicht · Notwegerecht · Nutzungsänderung · Heizkostenverordnung · Mietpreisbremse 2026 · Kündigungsfrist Wohnung.
- Lebenssituationen: Erbe (2) · Scheidung/Zugewinn (1) · Alter (Rentenbasis, Immobilie als Altersvorsorge).
- Vermietung: Wie viel Miete kann ich verlangen? · Betriebskostenabrechnung · Umlagefähige Nebenkosten · Nebenkostenabrechnung · Kaufpreisfaktor-Tabelle.
- Finanzierung/Markt: Hypothek aufs Haus · Hausfinanzierung (VON POLL FINANCE) · Modernisierungskredit · Bauzinsen · Wohngeld · Kaufen oder Mieten · Checkliste Hauskauf.
- Energie/Lifestyle: Energetische Sanierung · Energiesparende Modernisierungen · Hitzeschutz · Nachhaltiges Bauen · Nachhaltige Immobilien · Haus mit Pool · Haus aus dem 3D-Drucker · Herbstlaub.
- Kein Artikel zu „Spekulationssteuer“, „vermietete Wohnung verkaufen“ oder „Wohnung verkaufen“ im Ratgeber (nur FAQ-Antworten auf der Verkaufen-Seite).
Gelesene Artikel:
1) „Geerbtes Haus verkaufen“ (`/de/immobilien-ratgeber/geerbtes-haus-verkaufen`): Title „Geerbtes Haus verkaufen | Ratgeber & Bewertung“ (keine Meta-Description!); H1 „Geerbtes Haus verkaufen: Ihr umfassender Leitfaden für Erben und Erbengemeinschaften“; 22.04.2026; „6 min. Lesezeit“; Autor „VON POLL IMMOBILIEN“; ≈ 2.400 Wörter sichtbar. H2: „Inhalt dieses Artikels“ · „Kurz zusammengefasst: Das Wichtigste zum Verkauf Ihrer Erbimmobilie“ · „Die erste Weichenstellung: Behalten, vermieten oder verkaufen?“ · „Vergleich der Optionen für Erben“ · „Rechtliche Voraussetzungen: Der Weg zum rechtmäßigen Verkauf“ · „Steuern beim Immobilienverkauf: Erbschafts- und Spekulationssteuer“ (H3 „Erbschaftssteuer und Freibeträge“, „Die Spekulationssteuer vermeiden“) · „Die Erbengemeinschaft: Gemeinsam entscheiden, Konflikte vermeiden“ · „Schritt für Schritt: Der Prozess des Hausverkaufs nach einem Erbe“ · „Warum die Wertermittlung der wichtigste Faktor ist“ · „FAQ: Die 5 häufigsten Fragen zum Verkauf geerbter Häuser“ (H3 „Muss ich das Erbe annehmen, um das Haus zu verkaufen?“ · „Was kostet der Verkauf einer Erbimmobilie?“ · „Kann ich meinen Anteil an der Erbengemeinschaft einzeln verkaufen?“ · „Wie lange dauert der Verkauf nach einem Erbe?“ · „Benötige ich einen Energieausweis für ein geerbtes Haus?“) · „Mit Expertise zum Verkaufserfolg“ · „Das könnte Sie auch interessieren“. Kein FAQPage-Schema; Link zu „kostenfreie Online-Bewertung“; Erbschaftssteuer-Link führt auf die Schweizer Presseseite (Fehlverlinkung).
2) „Maklerprovision: Wie hoch? Wer zahlt?“: 08.11.2024, 5 Min., ≈ 700–800 Wörter; H2 „Neuregelung der Maklerprovision: Wer zahlt wieviel?“ · „Ausnahmen der Neuregelung“ · „Wann wird die Maklerprovision fällig?“ · „Alle Bundesländer im Überblick“ (16 Länder-Links `/de/maklerprovision/baden-wuerttemberg` …; die generische `/de/maklerprovision` liefert 404); Spanne „zwischen 5,95 und 7,14 Prozent“; kein Rechner, keine Tabelle, kein FAQ.
3) „Güterstand Zugewinngemeinschaft: Was Paare mit Immobilie wissen sollten“: 25.09.2026, 8 Min., ≈ 1.500–1.800 Wörter; 8 H2 / 20 H3 (u. a. „Verkauf der Immobilie bei Scheidung“ → „Gemeinsamer Verkauf“, „Wenn keine Einigung möglich ist“, „Immobilie übernehmen statt verkaufen“; zwei Beispieltabellen zum Zugewinn); CTAs ausschließlich als Textlinks mit Title-Attributen („Jetzt kostenfrei den Wert Ihrer Immobilie ermitteln“); kein FAQ.
4) „Hausverkauf Checkliste: In 10 Schritten …“: ≈ 2.300 Wörter, 10 Schritt-H2 von „Die Wertermittlung: Den realistischen Marktpreis finden“ bis „Objektübergabe und Abschluss“, Meta verspricht „Jetzt PDF kostenlos downloaden!“ (PDF im Extrakt nicht auffindbar – nicht prüfbar).
5) „Erbengemeinschaft auflösen: Geschwisterstreit und Hausverkauf meistern“: ≈ 2.400 Wörter, 4 inhaltliche H2, in 10 Sprachen (hreflang-Varianten).
Autor/Datum: immer Datum + Lesezeit + „Über den Autor“-Box (Unternehmen); keine Personen-Autoren außer „Wolfram Gast“. Lead-Magnete: Marktberichte (`/de/unternehmen/marktberichte`), Beste-Lage-Magazin, App. Schema: RealEstateAgent + ReserveAction auf jeder Seite, kein Article/FAQPage auf Ratgebern.

### 3.7 Vertrauenselemente
Kennzahlen (400+ Shops, 1.500+ Profis, 550.000 Käufer, 700 Banken) · Zertifikate (IHK-Makler, DEKRA/PersCert®/WertCert®-Sachverständige) · Auszeichnungen 2022 (Pressemeldungen verlinkt) · ProvenExpert/Trustpilot/Google-Zitate · Geschäftsleitungs-Zitat · Compliance-Hinweise (Geldwäsche, Rechtssicherheit) · eigene Umfrage · Marktberichte.

### 3.8 Kontaktwege
Servicenummer „00800 - 333 333 09“, Zentrale +49 69 26 91 57-0 (Mo–Fr 9–18, Sa 10–15), Shop-Nummern auf lokalen LPs (Leonberg +49 7152 - 90 71 13 0, leonberg@von-poll.com; Stuttgart +49 711 - 24 83 749 0), Rückruf-/Kontaktformular, Online-Terminbuchung (ReserveAction), „Video- oder Telefonberatung“, Chatbot-Link mit `utm_source=chatbot`.

### 3.9 Design & Tonalität, Mobile
Premium-Ästhetik (großformatige Objektfotos, Magazin), lange, förmliche Sätze, Markenname in Versalien, viele Wiederholungen („digitale Premiumleistungen“). Zielgruppe eher Käufer/Objektsuche als Verkäufer. Astro/Vue-Frontend, responsive; mobile Darstellung nicht prüfbar.

### 3.10 SEO
- Titles: Start s. o.
    - Verkaufen „Immobilie verkaufen - VON POLL IMMOBILIEN“
    - Bewertung „Immobilienbewertung: Lassen Sie Ihre Immobilie bewerten“
    - Ratgeber-Hub „Immobilien Ratgeber - VON POLL IMMOBILIEN“
    - Leonberg „Immobilienbewertung Leonberg VON POLL IMMOBILIEN“ (Meta „Sie wünschen eine Immobilienbewertung in Leonberg? Kostenfreie Immobilienbewertung jetzt unverbindlich anfordern ➤ Jetzt aktuellen Marktwert ermitteln!“).
- Lokale Landingpage Leonberg (`/de/immobilienbewertung-leonberg`): H1 „Immobilienbewertung in Leonberg und Umgebung“; Hero-Block doppelt gerendert (H3 + H1); H3 „Was ist meine Immobilie in Leonberg wert?“, „Marktwert ermitteln lassen durch geprüfte Sachverständige.“; H2 „Marktgerechter Verkaufspreis“ · „Beschleunigte Vermarktung“ · „Individuelle Immobilienberatung“ · „Bestmögliche Beratung durch technologiebasierte Bewertungen und regionale Expertise“ · „Marktbericht“ (Link führt auf die allgemeine Marktberichtsseite) · H3 „Unser 5-Schritte Modell für einen erfolgreichen Verkauf“ · „VON POLL IMMOBILIEN-App“ · „Die wichtigsten Fragen zu unserer Online-Immobilienbewertung“ (9 FAQ). Lokal sind nur Telefon/E-Mail; keine Adresse, keine Person, keine Preise, keine Stadtteile; identischer Text wie Stuttgart-Seite (Template mit Ortsnamen-Platzhalter). ≈ 2.500 Wörter sichtbar.
- Interne Verlinkung: Ratgeber → Ratgeber („Das könnte Sie auch interessieren“, „Lesen Sie auch“), Ratgeber → Bewertung als Textlink; Städte-Linklisten im Footer; hreflang auf 10 Sprachen.

### 3.11 Technik
Astro-Frontend (+ Vue-Komponenten), Cloudflare (Turnstile-Captcha), Cookiebot, GTM + gtag/GA4, Meta Pixel, Segment, ProvenExpert-Widget, Bootstrap; Kundenportal `home.von-poll.com` als separate App.

### 3.12 Übertragbarkeit auf Rössler
Übernehmen: Terminbuchung (Video-/Telefonberatung) als niedrigschwelliger Kanal neben dem Bewertungsformular; „Kurz zusammengefasst“-Box + „Inhalt dieses Artikels“; FAQ mit echten Kundenfragen („Muss ich das Erbe annehmen, um das Haus zu verkaufen?“); Datum + Lesezeit + Autorbox; die Idee laufender Preis-Updates (bei Rössler als persönlicher jährlicher „Wert-Check“ per Mail statt App).
Nicht übernehmen: 207 identische Orts-Templates ohne lokale Substanz (Leonberg = Stuttgart = Pforzheim), Käufer-fokussierte Startseite, Markup-Fehler (Absatz im H2), fehlende Meta-Descriptions, Fehlverlinkung ins Ausland, Lifestyle-Themen („Haus mit Pool“, „Herbstlaub“) als Füllmasse.


## 4. Engel & Völkers – https://www.engelvoelkers.com/de/de/

### 4.1 Geschäftsmodell, Reichweite
- Globale Premium-Franchise-Marke (Hamburg): „Über 1.100 Standorten“, „in mehr als 35 Ländern“, „49 Jahre Branchenerfahrung“, „Weltweit 265.000+ Immobilien in den letzten 5 Jahren verkauft“, „Durchschnittliche Verkaufszeit: Weniger als 3 Monate“ („Basierend auf Daten von Engel & Völkers“). Geschäftsbereiche Residential, Commercial, Private Office, Finance, GG-Magazin, Academy/Franchise-Recruiting.
- Sitemap `/de/sitemap.xml`: 2.016 URLs (1.005 DE, 1.011 EN). Ratgeber: 465 URLs unter `/de/de/ressourcen/` (davon 153 `regional/`), 32 `/de/de/hamburg/ressourcen/`, 28 Commercial-Ratgeber. Lokale Verkaufs-LPs nur zwei (Berlin, Hamburg); Shop-Seiten liegen in separaten Sitemaps (`sitemap_shop_profile.xml`, nicht ausgewertet).

### 4.2 Navigation (wörtlich)
Hauptnavigation: „Kaufen & Mieten“ · „Immobilie verkaufen“ · „Immobilienmakler“ · „Commercial“ · „Unternehmen“ · „DE“ · „Standorte“; Header-CTA „Jetzt kontaktieren“; Banner „Die neue GG-Website: … Jetzt entdecken.“
Footer: „Immobilienangebote“ (Haus kaufen · Wohnung kaufen · Grundstück kaufen · Haus mieten · Wohnung mieten) · „Immobilien verkaufen“ (Immobilie bewerten · Immobilie verkaufen) · „Immobilienmakler finden“ (Berlin · Hamburg · München · Frankfurt · Düsseldorf · Mallorca) · „Unternehmen“ (Über uns · Makler finden · Immobilienmakler werden · Franchisepartner werden · Erklärung zur Barrierefreiheit · Nutzungsbedingungen · Digital Services Act · Maklervertrag widerrufen) · Rechtliches (Cookie-Einstellungen verwalten · Cookie-Hinweise · Datenschutzhinweise · Impressum).

### 4.3 Startseite
- Title „Engel & Völkers | Ihr Immobilienmakler an über 1.100 Standorten“; Meta „Engel & Völkers ist Ihr weltweit aktiver Immobilienmakler für die zuverlässige Vermarktung von Häusern & Wohnungen ► Jetzt Traumimmobilie finden!“.
- Hero (gerendert): „Finden Sie Ihre Traumimmobilie!“ mit Suchauswahl „Wählen Sie eine Vermarktungsart“ (Kaufen · Mieten · KI-Suche). H1 im HTML: „Ihre Immobilie verdient den bestmöglichen Preis“ (Verkäufer-Block).
- Sektionen: Kacheln „Traumimmobilie kaufen“, „Erfolgreich verkaufen“, „Immobilienberater werden“ → H2 „Ihre Immobilie verdient den bestmöglichen Preis“ (H2/H3 „Lokales Marktwissen“, „Weltweite Vermarktung“, „Individueller Service“; Button „Jetzt erfolgreich verkaufen“) → Finance-Banner → H2 „Finden Sie Immobilien in Deutschland“ (H3 Berlin · München · Hamburg · Frankfurt · Stuttgart · Köln) → H2 „Ihr Erfolg als Immobilienmakler im Premiumsegment“ / „Lokal arbeiten – global wirken“ → H2 „Wir kennen die Welt unserer Kunden“ (Kacheln „Erstklassig auch im Zweitwohnsitz“, „Diskretion via Private Office“, „Maritime Welten erleben“ …) → H2 „Lifestyle und Lebenskunst …“ / „GG Magazin“ → H2 „Bleiben Sie informiert“ (Newsletter) → H2 „Das könnte Sie auch interessieren“ → H2 „Kontaktieren Sie uns jetzt – persönlich“.
- Nur ≈ 1.250 Wörter; keine Siegel/Bewertungszahlen auf der Startseite.

### 4.4 Bewertungs-Funnel (am besten belegter Funnel der Stichprobe, Strings aus Next.js-Payload des Roh-HTML)
- Landingpage `/de/de/verkauf/immobilienbewertung`: Title „Immobilienbewertung Online | Engel & Völkers“; Meta „Kostenlose Immobilienbewertung online für Eigentümer von privaten Wohnimmobilien ✓ Schnell, präzise & unverbindlich ► Jetzt Immobilie bewerten!“; H1 „Wertschätzung als Philosophie“; Subline „Wir wissen die Individualität und Geschichte jeder einzelnen Immobilie zu schätzen.“; H2 „Online Bewertung“ („Für eine erste schnelle Einschätzung ist unsere Online-Bewertung ein einfacher und unkomplizierter Startpunkt.“) · „Persönliche Bewertung“ · „Lokale Expertise“ · „Jede Immobilie hat ihren individuellen Wert“ · „Top 6 Faktoren für die Immobilienbewertung“ (H3 Lage · Baujahr · Baulicher Zustand, Energieeffizienz · Art der Immobilie · Ausstattung · Angebot & Nachfrage) · „Verkauf – mit oder ohne Makler?“ (H3 „Verkauf mit Makler“ / „Verkauf ohne Makler“, je „Mehr anzeigen“) · „Antworten auf häufige Fragen“ (7 H3-Fragen) · „Immobilienbewertung in Ihrer Stadt“ (16 Bundesländer als H3 mit Ortslisten – über 5.500 Links!) · „Kontaktieren Sie uns jetzt – persönlich“.
- Widget-Einstieg (wörtlich): Überschrift „Wie viel ist meine Immobilie wert?“ / „Welche Immobilie besitzen Sie?“ · Optionen Haus · Wohnung · Mehrfamilienhaus (Values `house`, `flat`, `multiFamilyHouse`) · Microcopy „Kostenlos, vertraulich, unverbindlich“ · „Erhalten Sie sofort Ihre digitale Immobilienbewertung“ · Button „Bewertung starten“ / „Online-Bewertung starten“.
- Belegte Formularfelder und Hilfetexte (Reihenfolge nach Auftreten im Payload, Schrittlogik teilweise erkennbar):
  - Adresse: „Adresse Ihrer Immobilie“, „Stadt, Stadtteil, Postleitzahl“, „Bitte geben Sie eine gültige Adresse in Deutschland ein“, „Wir benötigen Ihre vollständige Adresse, um eine genauere Preisspanne zu berechnen.“, „Ihr aktueller Standort konnte nicht gefunden werden. Bitte geben Sie die Adresse manuell ein.“ (Geolocation-Option).
  - Objekt: „Etagenwohnung“ (Wohnungstyp), „Etage“ / „Mittlere Etage“, „Etagenanzahl“ (+/− Stepper „Etagenanzahl verringern“), „Anzahl Zimmer“ (Stepper „Anzahl der Zimmer erhöhen/verringern“), „Wohnfläche: in m²“ / „Gesamte Netto-Wohnfläche in m²“ mit Hilfetext „Nutzbare Wohnfläche, inkl. Küche und Flure. Ausgenommen sind Balkon, Loggia, unbeheizter Wintergarten und Aussenräume.“, „Balkon-/Terrassenfläche“ („Falls die genaue Zahl unbekannt ist, tragen Sie einen Schätzwert ein. Bei Balkon und Terrasse addieren Sie die Flächen und geben die Summe an.“), „Grundstücksfläche“ („Gesamtfläche des Grundstücks …“), „Baujahr“ („Bitte geben Sie ein gültiges Baujahr ein“).
  - Zustand/Standard: „Wie ist der Zustand Ihrer Immobilie?“ mit Optionen „Sanierungsbedürftig“ („Dies bezieht sich auf Immobilien, die nicht im besten Zustand sind. Wählen Sie diese Option, wenn Ihre Immobilie gewartet und/oder renoviert werden muss.“), „Renoviert / in ausgezeichnetem Zustand“; „Der Standard berücksichtigt die Ausstattung der Immobilie und die Qualität der verwendeten Materialien:“.
  - Nutzung: „Wie nutzen Sie Ihre Immobilie?“ (Optionen im Extrakt nicht sichtbar).
  - Kontakt (letzter Schritt): „Letzter Schritt“
      - „Teilen Sie uns Ihre Daten mit, um sofort eine kostenlose und unverbindliche Bewertung per E-Mail zu erhalten.“
      - „Vorname“, „Nachname“, „Ihre E-Mail Adresse“, „Telefonnummer (optional)“, „Wann sind Sie am besten erreichbar?“
      - Validierungen „Bitte geben Sie Ihren Vornamen ein“, „Bitte geben Sie eine gültige Telefonnummer an“
      - Abschluss „Bewertung abgeschlossen“, „Ihre digitale Bewertung“, „Eine persönliche Bewertung ist der beste nächste Schritt“, „Nächste Schritte“, „Warum eine Vor-Ort-Bewertung?“, „Wir melden uns bei Ihnen, um Ihre Immobilie zu besprechen und Ihnen eine realistische Marktbewertung zu geben – unverbindlich und kostenlos“, „Klicken Sie hier, um eine Vor-Ort-Bewertung anzufordern“.
- Ergebnis: „Sie erhalten eine erste Bewertung schnell und bequem per E-Mail.“ (Preisspanne – „genauere Preisspanne“ wird in der Adress-Hilfe erwähnt); FAQ: Telefonnummer optional, Vor-Ort-Bewertung „in der Regel bis zu drei Wochen“; FAQ-Frage „Ich möchte nur eine unverbindliche Einwertung und gerne anonym bleiben. Wie steht es um meine persönlichen Daten?“ wird gestellt, Anonymität aber nicht zugesagt (Name + E-Mail Pflicht).
- Trust direkt am Widget: „Weltweit 265.000+ Immobilien in den letzten 5 Jahren verkauft“, „Durchschnittliche Verkaufszeit: Weniger als 3 Monate“, „49 Jahre Branchenerfahrung“.

### 4.5 Verkaufen-Seite `/de/de/verkauf/immobilie-verkaufen`
- Title „Immobilie verkaufen | Engel & Völkers“; Meta „Immobilie verkaufen in 8 Schritten ✓ So verkaufen Sie Ihre Immobilie schnell & zum bestmöglichen Preis ► Jetzt informieren!“.
- Hero: „Erfolgreich verkaufen – mit Engel & Völkers“, CTAs „Jetzt kontaktieren“, „Online-Bewertung“. H1 „Ihre Vorteile bei einem Verkauf mit Engel & Völkers“.
- H2: „Qualifizierte Beratung“ · „Realistische Bewertung“ · „Individuelle Vermarktung“ · „Exklusive Kundschaft“ · „Transparenter Prozess“ · „Finden Sie Engel & Völkers in Ihrer Nähe“ · „In 8 Schritten zum Erfolg“ (H3 „Persönliche Erstberatung“ · „Bestmögliche Bewertung“ · „Überzeugendes Exposé“ · „Individuelles Marketing“ · „Suchkunden & Besichtigungen“ · „Transparente Vermarktung“ · „Vertragsverhandlungen & Abschluss“ · „Service nach dem Verkauf“) · „Ihr Eintritt in ein weltweites Kunden-Netzwerk“ · „Lifestyle und Lebenskunst …“ · „Antworten auf Ihre wichtigsten Fragen“ (10 H3-FAQ) · „Immobilie in Ihrer Stadt erfolgreich verkaufen“ (16 Bundesland-H3 mit Ortslisten) · „Kontaktieren Sie uns jetzt – persönlich“.
- FAQ (wörtlich): „Wann ist der beste Zeitpunkt, um eine Immobilie zu verkaufen?“
    - „Wie kann ich den Wert meiner Immobilie ermitteln?“
    - „Wie lange dauert der Verkauf meiner Immobilie?“
    - „Sollte ich einen Immobilienmakler beauftragen …?“
    - „Was sind die wichtigsten Dokumente …?“
    - „Muss ich Steuern auf den Verkaufserlös zahlen?“
    - „Unterscheidet sich der Hausverkauf vom Verkauf einer Wohnung?“
    - „Kann ich meine Immobilie auch verkaufen, wenn sie vermietet ist?“
    - „Wie verkaufe ich eine geerbte Immobilie?“
    - „Kann ich meine Immobilie trotz noch laufender Finanzierung verkaufen?“ – die FAQ deckt genau die Lebenssituationen ab (vermietet, Erbe, Kredit, Wohnung vs. Haus).
- Logik: Vorteile (5 Icons) → Prozess (8 Schritte) → Netzwerk → Magazin → FAQ als Einwandbehandlung → Städte → Kontakt. Keine Vergleichstabelle, kein Rechner; Seite ist durch die Städtelisten 8.700 Wörter/2,3 MB groß.

### 4.6 Ratgeber („Ressourcen“)
- Hub `/de/de/ressourcen` (Title „Infos aus der Immobilienwelt | Engel & Völkers“; H1 „Ihr Immobilien-Ratgeber – Expertise, Trends & Insights“) mit Filter „Alle · Käufer · Verkäufer · Makler · Regionen · Lifestyle“; Verkäufer-Liste `/de/de/ressourcen/verkaeufer` (H1 „Verkäufer“, 12 Artikel pro Seite, 11 Seiten ≈ 130 Verkäufer-Artikel), je Artikel Bild, Titel, Teaser, Lesezeit, Datum, kein Autor.
- Themenliste Verkäufer (aus Sitemap, gruppiert):
  - Verkauf: Wohnung verkaufen
      - Einfamilienhaus verkaufen
      - Grundstück verkaufen
      - Elternhaus verkaufen
      - Checkliste Hausverkauf
      - Hausverkauf Unterlagen
      - Hausverkauf Vertrag
      - Hausverkauf Kosten
      - Hausverkauf Energieausweis
      - Hausverkauf Vorfälligkeitsentschädigung
      - Hausverkauf Rentenbasis
      - Maklervertrag
      - Maklerprovision wie hoch
      - Provisionsmodell
      - Notarvertrag „4 Dinge“
      - Notarbeauftragung und Übergabe
      - Eigenheimwechsel (kaufen und verkaufen gleichzeitig)
      - Grundschuld – belastete Immobilie verkaufen
      - Immobilienbewertung: Diese Faktoren …
      - Immobilienwert ermitteln: Online oder vor Ort
      - Wertsteigerung.
  - Recht/Steuern: Spekulationssteuer · Spekulationsfrist · Immobilie steuerfrei verkaufen · Hausverkauf Steuern · Grundstücksverkauf Steuern · Erbschaftssteuer · Haus vererben steuerfrei · Immobilie vererben · Erbschaft Immobilie Ausland · GmbH vererben · Was erhalten gesetzliche Erben · Frühzeitig schenken statt vererben · Nutzungsänderung.
  - Lebenssituationen: Geerbtes Haus verkaufen (Steuer) · Elternhaus verkaufen · regional „Was tun mit einer geerbten Immobilie?“ · Commercial „Halbe Immobilie geerbt“.
  - Vermietung/Investment: Vermietung von Wohnimmobilien · Tipps gewerbliche Vermietung · Kapitalanlage Studentenwohnung · Immobilien als Kapitalanlage 2026.
  - Markt/Regional (153 Seiten): „Hausverkauf in Bochum“, „Kaufen oder verkaufen Lüneburg“, „Verkehrswert vs. Verkaufspreis“, „Premium-Immobilien verkaufen“, Ortsporträts; Hamburg-Ressourcen (32) mit sehr wohnungsspezifischen Titeln („Die Teilungserklärung als zentrales Dokument für Eigentumswohnungen – nicht nur beim Verkauf“, „Eine Immobilie, mehrere Eigentümer: die Besonderheiten beim Verkauf“, „Die Maklercourtage beim Immobilienverkauf: Wissenswertes zur Aufteilung der Kosten“, „Wie lange dauert Ihr Immobilienverkauf in Hamburg …“).
  - Lifestyle: Outdoor-Trends, Herbst, Hochzeit – Füllcontent.
- Gelesene Artikel:
  1) „Geerbtes Haus verkaufen: Steuer beachten“ (`/ressourcen/geerbtes-haus-verkaufen-steuer`): Title „Geerbtes Haus verkaufen - Welche Steuern fallen wann an?“; 2.11.2022 (dateModified 2026-01-23), 10 Min., ≈ 2.000 Wörter; H2 „Das Wichtigste zur Steuer beim Verkauf von einem geerbten Haus“ · „Sie haben ein Haus geerbt – und jetzt?“ · „Geerbtes Haus verkaufen: Diese Steuern fallen an“ (H3 Erbschaftssteuer · Spekulationssteuer) · „So fällt keine Steuer beim Verkauf geerbter Immobilien an“ (H3 „Spekulationsfristen für den steuerfreien Verkauf“) · „Erbe versus Schenkung …“ · „Darum ist die Immobilienbewertung wichtig“ · „Fazit: Was lohnt sich mehr …“ (H3 selbst nutzen · vermieten · verkaufen) · „Häufig gestellte Fragen“ (H3 „Wo finde ich die gesetzlichen Vorgaben zur Spekulationssteuer?“ · „Benötige ich beim Verkauf einen Erbschein?“ · „Was passiert, wenn sich eine Erbengemeinschaft nicht einigen kann?“ · „Darf ich ein geerbtes Haus sofort verkaufen?“). Freibetrags-Tabelle (500.000 / 400.000 / 100.000 / 20.000 €); Fehler: nennt Freigrenze „600 Euro“ (seit 2024: 1.000 €) und verwechselt an einer Stelle Erbschafts- und Spekulationssteuer. JSON-LD BlogPosting, kein FAQPage. CTA-Widget „Erhalten Sie sofort Ihre digitale Immobilienbewertung“ im Artikel.
  2) „Spekulationssteuer bei Immobilien: Frist, Höhe & Steueroptimierung“: 27.02.2026, 7 Min., ≈ 1.500–1.800 Wörter; H2 „Was ist die Spekulationssteuer?“ · „Die Spekulationsfrist …“ (H3 „Praxis-Check: Fällt Spekulationssteuer bei Ihrem Verkauf an?“, Beginn, Ende) · „Wie hoch …“ · „Steueroptimierung …“ (H3 „Option 1: Spekulationsfrist abwarten“ … „Option 5: Timing im Einkommensteuerjahr berücksichtigen“) · „Sonderfälle und Praxis …“ (H3 „Spekulationsfrist bei Eigennutzung: Wann gilt ‚selbst bewohnt‘ wirklich?“, „Eigennutzung durch Familie: Welche Angehörigen zählen?“) · Fazit · „Häufige Fragen …“ (7 H3, u. a. „Gilt die Spekulationssteuer auch für Wohnungen und Eigentumswohnungen?“). Beispiel 200 → 300 T€, 30 % → 30.000 €; Freigrenze 1.000 € korrekt, im FAQ aber „Freibetrag“ genannt; kein Rechner.
  3) „Maklerprovision - alles Wissenswerte zur Maklercourtage 2026“: 27.01.2026, 4 Min., ≈ 1.000 Wörter; H2 „Reform der Maklerprovision 2020 …“ · „Wer zahlt die Maklerprovision?“ · „Wie hoch sind Maklergebühren? Übliche Maklerprovision 2026“ (H3 „Rechenbeispiel:“ 350.000 € × 7,14 % → 12.495 € je Partei) · „Maklerkosten verstehen …“ · „So zahlen Sie nicht zu viel Maklerprovision“ · „Fälligkeit …“ · „Überlassen Sie Ihren Verkaufserfolg nicht irgendwem“ · „Auf der Suche nach den Profis?“ · „FAQ zur Maklerprovision“ (6 H3 inkl. „Maklerprovision Sparkasse/Bankmakler: Gibt es Unterschiede?“); kein Rechner, keine Tabelle.
  4) „Wohnung verkaufen: Tipps und Tricks für den erfolgreichen Verkauf“: 08.11.2022 (modified 2026-01-30), 13 Min., ≈ 3.000–3.500 Wörter; H2 „Das Wichtigste in Kürze:“ · „Wann ist ein guter Zeitpunkt …?“ · „Wohnung verkaufen mit oder ohne Maklerin oder Makler?“ · „Was kostet der Verkauf einer Wohnung über eine Maklerin …?“ · „Wie läuft der Verkauf einer Wohnung ab?“ (H3 Vorbereitung → Wertermittlung → Vorfälligkeitsentschädigung → Hauptphase → Abwicklung → Kaufvertrag aufsetzen → Übergabe → Notartermin; H4 Unterlagen, Gutachten, Vermarktung, Exposé & Anzeigen, Besichtigungstermine, Verkaufsverhandlungen, Bonitätsprüfung, Ablauf Notartermin, Grundbucheintragung) · „FAQ“ (H3 „Welche Kosten fallen an …?“ · „Welche Steuern …?“ · „Wann handelt es sich um gewerblichen Immobilienverkauf?“ · „Warum ist die Eigentümergemeinschaft wichtig, wenn man eine Wohnung verkauft?“). Konkrete Preisstrategie-Zahlen („105 bis 110 Prozent des Wohnungswerts“, bei offener Besichtigung „120 bis 140 Prozent“), Unterlagenlisten (Grundbuchauszug < 3 Monate, Teilungserklärung, Wirtschaftsplan, Protokolle); Behauptung einer „Zustimmung der Eigentümergemeinschaft“ ist juristisch ungenau (Verwalterzustimmung lt. Teilungserklärung).
  5) „Hausverkauf-Kosten“ und „Elternhaus verkaufen“: je ≈ 1.700 Wörter, 4–6 H2, keine H3; „Elternhaus verkaufen“ mit nummerierten H2 „1. Wer darf das Elternhaus verkaufen?“ · „2. Als Elternteil das Haus ans Kind verkaufen“ · „3. Als Kind das geerbte Elternhaus verkaufen“ · „4. Elternhaus: Verkaufen, vermieten oder sanieren und behalten?“ – ein seltenes, sehr situatives Thema.
- Lead-Magnete: Newsletter („Bleiben Sie informiert“ auf jeder Seite), Bewertungs-Widget in Artikeln, „Verkäufer-Guide“ und „Immobilien-Webinare“ (`/de/de/ratgeber/immobilien-webinare`), Private-Office-Marktbericht; keine PDF-Checklisten gefunden.

### 4.7 Vertrauenselemente
Zahlen (1.100 Standorte, 265.000+ Verkäufe, < 3 Monate, 49 Jahre) · Google-Bewertungen-Widget („Alle Bewertungen auf Google anzeigen“, pro Shop) · Private Office/Diskretion · GG-Magazin als Marken-Content · keine Siegel, keine Presse-Logos, keine Autoren.

### 4.8 Kontaktwege
„Jetzt kontaktieren“ (Formular mit „Wie können wir Ihnen helfen?“, Freitext „Bitte geben Sie uns nähere Informationen darüber, wie wir Sie bei Ihrem Verkaufsprozess unterstützen können.“) · Telefon +49 40 361310 (Hamburg-Zentrale) · „Lokale Expert:innen finden“ (Shop-Finder) · Rückruf mit Terminvorschlag · kein Chat.

### 4.9 Design & Tonalität, Mobile
Hochwertig, bildstark, viel Weißraum, „Sie“, gendergerechte Schreibweise („Makler:in“), kurze Artikel mit Lesezeit. Next.js, responsive; Seiten mit Ortslisten sehr schwer (2,3 MB HTML) – mobile Performance fraglich, nicht prüfbar.

### 4.10 SEO
- Titles: Start s. o. · Verkaufen „Immobilie verkaufen | Engel & Völkers“ · Bewertung „Immobilienbewertung Online | Engel & Völkers“ · Ratgeber-Hub „Infos aus der Immobilienwelt | Engel & Völkers“ · Verkäufer-Liste „Expertentipps für Immobilienverkäufer | Engel & Völkers“ · Hamburg-LP „Immobilie in Hamburg erfolgreich verkaufen“.
- Interne Verlinkung: riesige Ortslisten auf Verkaufen-/Bewertungsseite (5.500+ Links) = Linkjuice-Verteilung an Shop-Seiten; Artikel verlinken auf Bewertung, Shop-Finder, verwandte Artikel; Breadcrumb-Schema.
- Lokale LP Hamburg (`/de/de/hamburg/verkaufen-vermieten/immobilie-verkaufen`): H1 „Immobilie verkaufen in Hamburg“; H2 „Globales Netzwerk“ · „Individueller Service“ · „Präzise Wertermittlung“ · „Unsere 8 Schritte zum Erfolg“ (H3 Individuelle Beratung · Präzise Wertermittlung · Strategischer Marketingplan · Professionelle Präsentation · Kaufinteressenten & Besichtigungen · Transparenter Verkaufsprozess · Gezielte Präsentation · Umfassender After-Sales-Service) · „Wie profitieren Sie von einem Verkauf mit Engel & Völkers Hamburg?“ · „Ihr Zugang zu einem weltweiten Kundennetzwerk“ · Lifestyle · „FAQ – Antworten auf Ihre wichtigsten Fragen“ (5 H3: Wertermittlung, Unterlagen, diskret verkaufen, Homestaging, Anwesenheit) · Kontakt. Lokal: Adresse Vancouverstraße 2a, „16 Standorten in der Region“, Stadtteile Winterhude/Elbchaussee/HafenCity im Fließtext, Bezirks-Navigation; keine Personen, keine Preise, keine Referenzen; Zahlen widersprüchlich („49 Jahre“ vs. „über 35 Jahre lokale Markterfahrung“); ≈ 1.100 Wörter.

### 4.11 Technik
Next.js + Storyblok (Headless CMS), Astro-Teile, Friendly Captcha, GA4, Criteo (Retargeting), Google-Reviews-Widget; Cookie-Banner: Eigenlösung „Cookie-Einstellungen verwalten“ (kein Standard-CMP-Marker erkennbar – nicht prüfbar).

### 4.12 Übertragbarkeit auf Rössler
Übernehmen: der Funnel-Aufbau (Objektart → Adresse → wenige Objektfelder mit Hilfetexten → Zustand in 2–3 Stufen → Nutzung → Kontakt mit optionaler Telefonnummer und „Wann sind Sie am besten erreichbar?“) ist der klarste Blueprint; wohnungsspezifische Felder (Etage, Balkonfläche, Netto-Wohnfläche-Definition); 8-Schritte-Prozess als vertrauensbildende Prozessdarstellung; FAQ auf der Verkaufen-Seite mit Lebenssituationen; wohnungsspezifische Ratgeber-Titel aus Hamburg („Teilungserklärung … nicht nur beim Verkauf“, „mehrere Eigentümer“).
Nicht übernehmen: 5.500-Link-Ortslisten, Lifestyle-Content, Artikel ohne Autor/Quellen mit sachlichen Fehlern (Freigrenze, Zustimmung WEG), widersprüchliche Zahlen, Retargeting-Pixel.


## 5. Dahler – https://www.dahlercompany.com/de (dahler.com leitet hierher)

### 5.1 Geschäftsmodell, Reichweite
- Franchise-System für „hochwertige Wohnimmobilien in bevorzugten Lagen“ (Hamburg, inhabergeführt „von Kirsten und Björn Dahler“, „mehr als 30 Jahre“); Standortzahlen widersprüchlich („über 100 Standorten“ / „Über 90 internationale Standorte“ / „über 80 Immobilienshops“); „mehr als 400 ausgebildete Makler“, „Mehr als 20.000 Suchkunden“, „Über 4.000 vermittelte Immobilien“.
- Sitemap (Drupal, 3 Seiten): 4.204 URLs (2.976 DE); Ratgeber: 8 unter `/de/immobilie-verkaufen/ratgeber/`, 180 unter `/de/immobilie-kaufen/ratgeber/` (davon ein großer Teil Lifestyle/Prominenten-Content: „Joe Biden und seine Leidenschaft für Immobilien“, „Die luxuriösesten Hotels auf den Malediven“, „So gelingt der perfekte Rasen“), 2 unter `/de/immobilienbewertung/ratgeber/`, 1 `/de/immobilienwissen`, 57 `/de/immobilienpreise/…`; lokale LPs: 70 `/de/immobilie-verkaufen/wohnimmobilien/<ort>` + 70 `/de/immobilienbewertung/<ort>` (inkl. Stuttgart, Ludwigsburg, Karlsruhe, Heilbronn).

### 5.2 Navigation (wörtlich)
Hauptnavigation: „Kaufen“ · „Verkaufen“ · „Bewerten“ · „Standorte“ · „Unternehmen“; Sprachen EN/ES, Länder Deutschland/Spanien/Österreich.
Footer-Spalten: „Kaufen“ · „Verkaufen“ · „Bewertung“ · „Makler“ · „Ratgeber“ · „Unternehmen“ (Transparenzinformationen · Datenschutz · Impressum · Barrierefreiheit); Footer-Formular-Links (aus HTML): /de/immobilie-verkaufen/wohnimmobilien · /de/anlageimmobilien/immobilie-verkaufen · /de/immobilienbewertung · /de/immobilienpreise · /de/immobilienwissen · /de/immobilie-kaufen/ratgeber/immobilien-glossar · /de/unternehmen/franchise · /de/unternehmen/presse · jobs.dahlercompany.com.

### 5.3 Startseite
- Title „DAHLER & COMPANY | Ihr Immobilienmakler für Luxusimmobilien“; Meta „Jetzt Luxusimmobilien über DAHLER & COMPANY kaufen und verkaufen! ✔ 4x "Bester Immobilienmakler Deutschlands" ➤ Jetzt Kontakt aufnehmen!“.
- H1 „Herzlich willkommen in der Welt exklusiver Immobilien“; H2 „Willkommen bei DAHLER“ („DAHLER ist auf die Vermittlung von hochwertigen Wohnimmobilien in bevorzugten Lagen spezialisiert.“) → „Unsere aktuellen Immobilienangebote“ → „An einem von über 100 Standorten auch für Sie da.“ (ProvenExpert „8282 Bewertungen“) → „Ein sicherer Partner an Ihrer Seite“ („Siegel Immobilienmakler 2026“) → H3 „Aktuelle Marktzahlen & Immobilienpreise in Ihrer Region“ → H2 „Wie können wir Ihnen helfen?“ (H3 „Verkaufen“, „Bewerten“, „Kaufen“) → Spanien-Teaser → H2 „Unser aktuelles Immobilien-Highlight“ (Villa Wannsee) → Standorte/Preise/Franchise-Teaser → H2 „DAHLERs Finest: Spanien“ → Partner-Logos (Finvia, Immobilie1, Immoscout, Immowelt, Welt, Süddeutsche Zeitung, Bellevue, Franchise Portal, igenda, ioe) → „Nehmen Sie jetzt Kontakt mit DAHLER auf.“ / „Kontakt aufnehmen“ → H2 „Ihr Kontakt zu uns“ → H2 „Der DAHLER Newsletter“.
- Primärer CTA: „Kontakt aufnehmen“ (kein Bewertungs-Funnel im Hero). ≈ 770 Wörter.

### 5.4 Bewertungs-„Funnel“
- `/de/immobilienbewertung`: Title „Immobilienbewertung mit DAHLER“; Meta „Was ist Ihre Immobilie wert? ⭐ An über 80 Standorten stehen Ihnen unsere Experten zur Verfügung ✅ Mehrfacher Testsieger ➤ Jetzt Kontakt aufnehmen!“; H1 „Was ist Ihre Immobilie wert?“; Intro „Wer seine Immobilie veräußern möchte, weiß genau, was er will.“
- H2 „Drei Möglichkeiten der Bewertung“: „Online Bewertung“ (nach Eingabe von Objekt- und Lagedaten erste Einschätzung per E-Mail „innerhalb kürzester Zeit“), H3 „Video Bewertung“ (30-minütiger kostenloser Zoom-Call, Wert direkt im Anschluss), H3 „Vor-Ort Bewertung“ (ca. eine Stunde, kostenfrei, Abgleich mit Datenbank).
- H2 „Ablauf einer Immobilienbewertung“: H3 „Kontaktaufnahme & Termin-Abstimmung“ → „Vor-Ort Besichtigung der Immobilie“ → „Erstellung der Wertermittlung“ (Vergleichs-, Ertrags-, Sachwert) → „Vorstellung der Ergebnisse“.
- H2 „Vorteile einer professionellen Wertermittlung“ (H3 „Geringer Aufwand für Eigentümer“ · „Transparente Wertermittlung“ · „Kostenfrei und unverbindlich“ · „Detaillierte Markteinblicke“ · „Überblick wertbeeinflussender Faktoren“ · „Optimaler Verkaufspreis“) · „Vertrauen Sie den Experten“ · „Warum DAHLER?“ · „FAQs“ (4: „Bei welchen Anlässen bietet sich eine Immobilienbewertung an?“ · „Welche Faktoren beeinflussen den Preis einer Immobilie?“ · „Welche Verfahren gibt es bei der Wertermittlung?“ · „Warum ist der richtige Marktwert für den Immobilienverkauf wichtig?“) · „Ihr Kontakt zu uns“ (H3 „Sebastian Lembke“, immobilienbewertung@dahler.com).
- Buttons „Online-Bewertung starten“ (`#bewertung`) und „Kontakt aufnehmen“ (`#kontakt`). Das eingebettete Formular ist JS-gerendert (React in Drupal, reCAPTCHA); Felder nicht prüfbar. Im HTML nur Begriffe Baujahr/Wohnfläche/Zustand als Faktoren-Text. Kein Sofortergebnis belegt; Ergebnis per E-Mail bzw. Termin.
- Besonderheit: eigener Abschnitt zu Risiken falscher Preisfindung (H3 „Schlechte Marktposition im Konkurrenzvergleich“ · „Längere Verkaufszeit“ · „Image-Schaden“ · „Schlechte Verhandlungsbasis“ · „Berufung auf marktübliche Standard Preisermittlungsverfahren“ · „Fazit“) – Einwandbehandlung „zu hoher Angebotspreis“.
- Testimonial „J. Randerah“: „Der finale Kaufpreis entsprach exakt der ermittelten Kaufpreisspanne!“; Siegel „DISQ Testsieger 2026“, „Luxury Lifestyle Award Winner 2025“, „igenda Gold Award 2026“; JSON-LD Product/AggregateRating.

### 5.5 Verkaufen-Seite `/de/immobilie-verkaufen` → `/wohnimmobilien`
- Title „Wohnimmobilien verkaufen | Dahler“; Meta „Wohnimmobilie mit DAHLER & Company jetzt verkaufen ✅ Mehr als 80 Standorte ✔ Lokale Beratung und Ansprechpartner ➤ Jetzt online informieren!“; H1 „Ihr sicherer Partner“ (gerendert darüber „Wohnimmobilie verkaufen“).
- H2 „So funktioniert der Verkauf mit DAHLER“ (8 Listenpunkte: Individuelle Beratung · Professionelle Bewertung · Hochwertige Aufbereitung · Individuelle Vermarktung · Optimale Besichtigungsplanung · Regelmäßiges Reporting · Professionelle Verhandlungen · Begleitung der Übergabe) · H3 „Individuelle Verkaufsberatung“ (+ auf Wohnungsseite „Optimaler Verkaufspreis“, „Beschleunigte Vermarktung“) · H2 „Erfahren Sie, was Ihre Immobilie wert ist“ · „Mit Expertise zu Ihrem Erfolg“ · „Warum mit DAHLER verkaufen?“ (H3 „Klare Premium-Spezialisierung“ · „Mehr als 30 Jahre Erfahrung“ · „Mehr als 20.000 Suchkunden“ · „State-Of-The-Art Vermarktung“; H2 „Vielfacher Testsieger“, „Über 90 internationale Standorte“) · H2 „Diskrete Vermarktung“ (H3 „Sie wünschen eine diskrete Vermarktung Ihrer Immobilie?“) · H2 „Ein Auszug unserer Referenzen“ (≈ 40–60 verkaufte Objekte als H3, z. B. „Lichtdurchflutete Penthouse-Wohnung mit Elbblick“) · „Ihr Kontakt zu uns“ · „Der DAHLER Newsletter“.
- Argumentation: Positionierung (Premium, Servicemakler) → Prozess → Nutzen (Preis, Tempo, Beratung) → Beweise (Siegel, Referenzen, ProvenExpert-Zitat „DAHLER fand nach nur vier Wochen einen Käufer für meine Immobilie“ – H. Flebbe) → Kontakt. Einwände: „Ich will meine Immobilie nicht online sehen“ (diskrete Vermarktung, „Mehr als die Hälfte unserer Verkäufe erfolgt an Kunden, die wir bereits persönlich kennen.“), „zu hoher Preis“ (typischer Fehler). Lead-Magnet: „Maklercheck herunterladen“ (PDF `RZ_DAHLER_Maklercheck_04_2023.pdf`, Vergleichskriterien gegen Wettbewerber). Kein FAQ, kein Rechner, keine Vergleichstabelle.
- Wohnungs-Seite `/de/immobilie-verkaufen/wohnimmobilien/wohnung` (Title „Wohnung erfolgreich verkaufen | DAHLER“): identische Struktur; H2 „Erfahren Sie, was Ihre Wohnung wert ist“, „Wohnung sicher verkaufen“; WEG, Teilungserklärung, Hausgeld werden nicht erwähnt – inhaltlich kein Wohnungs-Spezialwissen.

### 5.6 Ratgeber
- Hubs `/de/immobilie-verkaufen/ratgeber` (H1 „Ratgeber - Immobilie verkaufen“, 296 Wörter, keine Meta-Description) und `/de/immobilie-kaufen/ratgeber` (H1 „Immobilien Ratgeber“); Listung JS-gerendert, Artikelliste nicht prüfbar; keine Kategorien, keine Datums-/Autorenangaben, keine Lesezeit.
- Verkaufs-Ratgeber (alle 8): „Soll ich einen Makler mit dem Verkauf beauftragen?“
    - „So bereiten Sie Ihre Immobilie für den Verkauf vor“
    - „Wie bereite ich mich auf den Verkauf vor?“
    - „Was passiert nach der notariellen Beurkundung“
    - „Ist ein Verkauf mit Grundschuld sinnvoll“
    - „Energieausweis – was Eigentümer wissen müssen“
    - „So finden Sie den richtigen Immobilienmakler“
    - „Was bedeutet die Datenschutzverordnung für Verkäufer und Vermieter“. Bewertungs-Ratgeber: „Worauf muss ich bei einer Immobilienbewertung achten?“ (+1). Kauf-Ratgeber mit Verkäuferbezug: „Ich habe eine Immobilie geerbt – was muss ich tun?“
    - „Das Bestellerprinzip“
    - „Widerrufsrecht bei Maklerverträgen“
    - „Das steht im Grundbuch“
    - „Der Kaufvertrag“
    - „Das Geldwäschegesetz“
    - „Brauche ich einen Gutachter beim Immobilienkauf“
    - „Mietkaution“
    - „Mieter/Vermieter: wer zahlt welche Reparaturen“; Rest Interior/Garten/Reise/Prominente.
- Keine Artikel zu Spekulationssteuer, Scheidung, vermieteter Wohnung, Maklerprovision (Höhe) – deutliche Lücken.
- Gelesene Artikel:
  1) „Immobilie geerbt - Was gibt es zu beachten?“: ≈ 900 Wörter, nur H3 („Wer wird bei einer Erbschaft Eigentümer der Immobilie?“ · „Erschaftssteuer - Welche Steuer-Abgaben gelten für den Nachlass?“ [Tippfehler im Original] · „So erben Sie steuerfrei“ · „Fazit“); kein Autor/Datum (JSON-LD author „DAHLER & COMPANY Franchise GmbH & Co. KG“), keine Spekulationsfrist, kein FAQ, kein CTA im Text (nur Seitenmenü „Jetzt Immobilie bewerten“).
  2) „Soll ich einen Makler mit dem Verkauf beauftragen?“: ≈ 800 Wörter, H3 „Warum einen Immobilienmakler nutzen?“ · „Den richtigen Makler finden“ · „18 Gründe für einen erfolgreichen Verkauf mit DAHLER“; Selbsttest-Liste mit acht Fragen („Was ist meine Immobilie wert?“ … „Was muss ich beim Kaufvertrag beachten?“); „Kurz: Makler sind eine Entlastung.“; keine Provisionsangabe.
  3) „Verkauf mit Grundschuld: Vorteile, Nachteile & Kosten“: ≈ 600 Wörter, 3 H3.
  4) „Das Bestellerprinzip“: ≈ 900 Wörter, keine H2/H3.
- Schema: BreadcrumbList + Person + WebSite; keine Article/FAQPage.

### 5.7 Vertrauenselemente
DISQ-Testsieger („zum fünften/sechsten Mal in Folge“, Pressemeldung), Luxury Lifestyle Award, igenda Gold Award, „Siegel Immobilienmakler 2026“, ProvenExpert 8.282–8.292 Bewertungen, Partner-/Presse-Logos, Referenzobjekte mit „Verkauft“-Badge, Kundenzitate (H. Flebbe, Ralf B., J. Randerah), Transparenzpflichten-PDF je Standort (§ 34c GewO, IHK-Aufsicht), Real Estate School (eigene Ausbildung), Maklercheck-PDF.

### 5.8 Kontaktwege
Telefon +49 40 6000 37 300 (Zentrale), Standort-Nummern (Stuttgart +49 711 184 247 20, Mo–Fr 09–18), E-Mails (info@, stuttgart@, immobilienbewertung@dahler.com), WhatsApp-Link („DAHLER auf Whatsapp“), Kontaktformular (`#kontakt`), Video-Bewertung per Zoom, Newsletter.

### 5.9 Design & Tonalität, Mobile
Luxus-Ästhetik (Schwarz/Weiß, große Objektfotos), kurze Marketingtexte, „Sie“; Ratgeber sehr knapp und ohne Formatierung. Drupal 11 + React-Komponenten, responsive; mobile Darstellung nicht prüfbar.

### 5.10 SEO
- Titles: Start s. o.
    - Verkaufen „Wohnimmobilien verkaufen | Dahler“
    - Wohnung „Wohnung erfolgreich verkaufen | DAHLER“
    - Bewertung „Immobilienbewertung mit DAHLER“
    - Stuttgart-Verkauf „Immobilie verkaufen in Stuttgart | DAHLER Stuttgart“ (Meta „Wohnung oder Haus in Stuttgart und Umgebung verkaufen ➤ Mehr als 30 Jahre im Markt ✔ Lokale Beratung und Ansprechpartner ➤ Jetzt mehr erfahren!“)
    - Stuttgart-Bewertung „Immobilienbewertung in Stuttgart | DAHLER Stuttgart“.
- Meta-Robots fehlt auf vielen Seiten (kein Problem), Meta-Description auf Ratgeber-Hub fehlt; Emojis in Metas.
- Lokale LP Stuttgart (`/de/immobilie-verkaufen/wohnimmobilien/stuttgart`) – das beste lokale Beispiel der Stichprobe: H1 „Verkaufen Sie Ihre Immobilie mit dem Testsieger“; H2 „Immobilienverkauf mit DAHLER Stuttgart“ · „So funktioniert der Verkauf mit DAHLER“ · „DAHLER Stuttgart“ (H3 Team: Boris Mayer (Inhaber), Jennifer Lynn Carroll, Susanne Crosetto, Sven Tinne-Balls, Jacques Braun – mit Foto, Rolle, Direktdurchwahlen `tel:071118424726` …) · „Warum mit DAHLER verkaufen?“ · „Vielfacher Testsieger“ · „Über 90 internationale Standorte“ · „Diskrete Vermarktung“ · „Immobilie in Stuttgart sicher verkaufen“ · „Ein Auszug unserer Referenzen“ (12+ verkaufte Objekte mit Stadtteil: Killesberg, Schönberg, Sonnenberg, Degerloch, Möhringen, Vaihingen, Kaltental, Plattenhardt, Bad Cannstatt; Umland Waiblingen, Ludwigsburg, Kornwestheim, Schwieberdingen, Steinenbronn, Neckartenzlingen) · „Immobiliengesuche“ (Preisklassen bis/über 1 Mio. €, Wohnungen, Investoren) · „Ihr Kontakt zu uns“ (Mörikestraße 12a, 70178 Stuttgart, Öffnungszeiten, Transparenzpflichten-PDF, Kundenzitat „Ralf B.“). Keine €/m²-Daten, kein FAQ, kein Formular (nur Anker). ≈ 1.500–2.000 Wörter.
- Interne Verlinkung: Footer-Formulare (Select-Navigation), Breadcrumbs, Querverweise Standort ↔ Bewertung ↔ Immobilienpreise; Ratgeber kaum verlinkt.

### 5.11 Technik
Drupal 11 (Generator-Meta), React/Vue-Widgets, Usercentrics (CMP; zusätzlich Klaro-Marker), gtag/GA4, reCAPTCHA, ProvenExpert-Widget.

### 5.12 Übertragbarkeit auf Rössler
Übernehmen: die Stuttgart-Seite als Vorbild für Ortsseiten (Team mit Foto/Durchwahl, verkaufte Referenzen nach Stadtteil, konkrete Gesuche, Adresse/Öffnungszeiten, Transparenz-PDF); „Drei Möglichkeiten der Bewertung“ (Online / Video / Vor Ort) – Video-Call ist für einen Einzelmakler sehr gut umsetzbar; Abschnitt „Risiken eines zu hohen Angebotspreises“; Maklercheck-Idee (Vergleichsraster „Woran erkenne ich einen guten Makler?“).
Nicht übernehmen: Ratgeber ohne Struktur/Autor/Datum, 180 Lifestyle-Artikel, widersprüchliche Standortzahlen, Wohnungs-Seite ohne WEG-Wissen, fehlende FAQ.


## 6. ImmoScout24 – Verkaufen-Bereich & „Wissen“ – https://www.immobilienscout24.de/verkaufen

### 6.1 Geschäftsmodell, Reichweite
- Marktführer-Portal („Die Nr. 1 für Immobilien.“, „Deutschlands größte Immobiliendatenbank“); für Verkäufer zwei Produkte: (a) Selbst inserieren („Inserieren ab 0 €“) und (b) „Maklerempfehlung“/Realtor Lead Engine (RLE): „Wir empfehlen dir 3 geprüfte Makler* aus deiner Region.“ – „Über 2.000 geprüfte Makler:innen“, finanziert „durch Provisionen der empfohlenen Makler“. Dazu kostenlose Online-Bewertung (IBW) als Lead-Quelle.
- `/verkaufen` leitet auf `/immobilienmakler/` (Canonical) – die „Verkaufen“-Seite ist faktisch die Makler-Lead-Seite.
- Wissen-Sitemap (`/wissen/sitemap.xml`): 1.906 URLs – vermieten 732 · verkaufen 333 · kaufen 265 · bauen 254 · mieten 236 · modernisieren 66 · Redaktion 12. Zusätzlich `/immobilienpreise/` (Preisatlas, 401 für Bots) und `/regional/`.

### 6.2 Navigation (gerendert, Wissen-Bereich)
- Header-CTAs: „Inserieren ab 0 €“ · „Makler:in finden“ · „Marktwert berechnen“; Menü „Jetzt loslegen“: Immobilie bewerten · Immobilie inserieren · Maklerempfehlung erhalten · Makler selbst finden · Preisatlas · Haus verkaufen Leitfaden · Grundsteuer berechnen · Energieausweis erstellen · Vorlagen & Downloads.
- Ratgeber-Hubs: „Ratgeber Immobilienverkauf“ · „Ratgeber Vermietung“ · „Ratgeber Mieten“ · „Ratgeber Hausbau“ · „Ratgeber Modernisierung“ (+ Kaufen).
- Footer: Über uns · Kontakt & Hilfe · Impressum · AGB & Rechtliche Hinweise · Datenschutz · Verbraucherinformationen · Sicherheit · Verträge hier kündigen · Vertrag widerrufen · Zum Privacy-Manager · Barrierefreiheit · „IT & Entwicklung“ (API).

### 6.3 Einstiegsseiten
- Wissen-Home `/wissen/`: Title „Immobilien Ratgeber » Antworten auf Ihre Fragen | ImmoScout24“; H1 „Mehr über Immobilien wissen“; H2 „Hol dir das Wissen, das du brauchst“ · „Aktuelle Themen“ · „Neue Top-Artikel für Immobilienverkäufer:innen“ (H3 „Hausübergabe & Hausübergabeprotokoll“, „Steuern bei Hausverkauf“) · Hausbau · Mieter · Käufer · Vermieter · „Interessiert an mehr?“ (Newsletter) · App.
- Verkaufs-Hub `/wissen/verkaufen.html`: Title „Ratgeber Immobilienverkauf » Tipps für Eigentümer - ImmoScout24“; H1 „Gut informiert. Erfolgreich verkauft.“; Einstieg „In welcher Verkaufsphase befindest du dich?“ mit vier Phasen-Kacheln: „Verkauf abwägen“ („Dauer, Zeitpunkt, Wertermittlung, …“ – „Lohnt sich der Verkauf?“) · „Verkauf vorbereiten“ („Dokumente, Kosten, Steuern, …“) · „Verkauf abwickeln“ („Bonitätsprüfung, Besichtigung, Preisverhandlung, …“) · „Verkauf abschließen“ („Notartermin, Zahlung, Schlüsselübergabe, …“); dann „Aktuelle News für Verkäufer:innen“, Newsletter („Kostenlose Immobilien-News, aktuelle Gerichtsurteile und nützliche Tipps.“), „Meist gelesene Artikel“ („Haus innerhalb der Familie verkaufen: Grunderwerbsteuer, Pflichtteil & Anfechtung“, „Haus verkaufen: Ablauf & Tipps – Hausverkauf im Oktober 2026“, „Hausverkauf Steuern“, „Hausübergabeprotokoll – Vorlage & Muster zum Download“, „Haus schätzen lassen …“, „Grundstückswert ermitteln“), Quiz „Welcher Verkäufer-Typ bin ich?“ („Der Selbstvermarkter“ → „Jetzt Anzeige schalten“ / „Der Effiziente“ → „Jetzt passenden Makler finden“), Kontakt („Service-Experten Mo–So 10–22 Uhr; persönliche Beratung Mo–Fr 8–18 Uhr“, „per Telefon, Live-Chat und E-Mail“).

### 6.4 Bewertungs-Funnel (IBW)
- LP `/immobilienbewertung/`: Title „Immobilienbewertung: Immobilie kostenlos online bewerten | ImmoScout24“; Meta „Marktwert schnell in 3 Minuten ermitteln ✓ kostenlos ✓ basierend auf echten Verkaufsdaten ✓ Für Häuser, Wohnungen & Grundstücke“; H1 „Immobilienbewertung: Was ist deine Immobilie wert?“; Autorin Nadine Kunert, „Aktualisiert: 14.10.2026“.
- Schritt 0: „Immobilientyp auswählen“ – Kacheln Haus · Wohnung · Grundstück · Gewerbe → `https://www.immobilienscout24.de/immobilie-bewerten/?property=apartment&cmp_…` (noindex-Seite, Title „Immobilie bewerten beim Marktführer für Immobilien“). Formular JS-gerendert; Feldreihenfolge nicht prüfbar; Web-Recherche liefert keine unabhängige Beschreibung der Pflichtfelder.
- „So funktioniert die Immobilienbewertung“ (H3): „Immobilie beschreiben“ (Adresse, Wohnfläche, Baujahr, Ausstattung; „nur wenige Minuten“) → „Wert wird berechnet“ (Vergleichswertverfahren) → „Bewertung sofort erhalten“ („übersichtliches PDF“ per E-Mail mit „realistische Marktwertspanne“ und Vergleichsobjekten; „Auf Wunsch persönliche Einschätzung durch Expert:innen“).
- Microcopy/Trust (H3): „100% kostenlos & unverbindlich“ · „Schnell zur Online-Bewertung als PDF“ · „Basierend auf echten Marktdaten“ · „Ergebnis in 3 Minuten“ · „Keine Wartezeiten, keine Dokumente, kein Sachverständiger-Termin.“ · „Basierend auf Millionen echter Marktdaten“ · eKomi-Siegel „Silber“ · drei Kundenstimmen (datiert 2025) · „Jetzt Bewertungsbeispiel ansehen“ (Muster-PDF `ImmoScout24_Bewertungs-PDF_Beispiel.pdf`) – das Muster-Ergebnis als Vertrauenselement ist einzigartig in der Stichprobe.
- Unterhalb: Ratgeber „Immobilie bewerten: Wichtige Fragen & Tipps“ (H2 „Immobilienwert im Oktober 2026“, „Online Immobilienbewertung vs. Wertgutachten“, „Wie genau ist eine Online-Immobilienbewertung?“, Faktoren, Verfahren, FAQ mit FAQPage-Schema (4 Fragen), „Weiterführende Themen“), Kontakt marktwert@scout24.com / 030 24 301 14 50, „Zur Verkaufsberatung“. JSON-LD: Product/AggregateRating, FAQPage, Service, VideoObject.
- Lead-Weiterleitung: Alle Wissen-Artikel haben ein Sticky-Widget (Haus/Wohnung/Grundstück) und Sticky-Footer „➔ Immobilienbewertung starten“ bzw. „➔ Makler finden“ mit Kampagnen-IDs (`cmp_position=homeseller_hub_article`).

### 6.5 Verkaufen-/Makler-Seite `/verkaufen` → `/immobilienmakler/`
- Title „Maklerempfehlung: Maklervergleich von ImmoScout24“; Meta „Mit der Maklerempfehlung von ImmoScout24 findest du 3 passende Immobilienmakler aus deiner Region. ✓ 100% kostenlos ✓ inkl. Immobilienbewertung.“; H1 „Erfolgreich verkaufen – mit Makler“; Subline „Wir empfehlen dir 3 geprüfte Makler* aus deiner Region.“; Objektwahl Haus/Wohnung/Grundstück/Gewerbe (→ `/maklervergleich/?property=…`); Bullets „Kostenlos & ohne Registrierung“, „Unverbindliche Empfehlung“, „Nur geprüfte Makler“; CTA „Jetzt kostenlos Maklerempfehlung erhalten“.
- H2: „Um welche Immobilie handelt es sich?“ · „Wie funktioniert die Maklerempfehlung?“ · „So läuft die Maklerempfehlung ab“ (H3 „Immobilie beschreiben“ → „Maklerempfehlung erhalten“ (drei Makler per E-Mail) → „Wunsch-Makler auswählen“) · „Das sind deine Vorteile:“ (H3 „Schnell und zeitsparend“, „Ohne Verpflichtung“, „Kostenfrei“) · „Maklerempfehlung – das sagen unsere Immobilienverkäufer dazu“ (zwei 5-Sterne-Stimmen) · Ratgeber „Maklervergleich: Wie du den richtigen Immobilienmakler in der Nähe findest“ (Nadine Kunert, 27.07.2026, 5 Min.) mit H2 „Auf welche Kriterien solltest du bei der Maklersuche achten?“, „Was zeichnet einen guten Makler aus?“ (H3 „1. Erfahrung und Lokalkenntnis“ · „Expertenkommentar“ · „2. Vertrauen und Transparenz“ · „3. Dienstleistungen und Netzwerke“ · „4. Provision und Kosten“ · „Formelle Kriterien für einen guten Makler“: § 34c GewO, IHK, Verband) · „Maklervergleich: Wie findest du den besten Makler für dich?“ (Checkliste 8 Fragen) · „Fazit …“ · „FAQ: Häufige Fragen zur Wahl des passenden Immobilienmaklers“ (5: „Wie finde ich einen guten Immobilienmakler?“ · „Was kostet ein Immobilienmakler?“ (3–7 %, Verkäufer trägt mindestens 50 %) · „Welche Dienstleistungen bietet ein Makler?“ · „Wie wichtig ist die Lokalkenntnis eines Maklers?“ · „Muss ich Dokumente vorbereiten?“).
- Keine Preise, keine Vergleichstabelle, kein Rechner; ≈ 1.900 Wörter; kein JSON-LD.

### 6.6 Ratgeber „Wissen/Verkaufen“ – Themenliste (333 URLs, gruppiert)
- Phasen-Hubs: verkauf-abwaegen · verkauf-vorbereiten · verkauf-abwickeln · verkauf-abschliessen · zeitstrahl-richtig-verkaufen · hausverkauf-ablauf · immobilie-verkaufen · haus-verkaufen · eigentumswohnung-verkaufen · grundstueck-verkaufen · gewerbeimmobilie-verkaufen · doppelhaushaelfte/einliegerwohnung/haus-mit-einliegerwohnung verkaufen.
- Makler: mit-oder-ohne-makler-verkaufen
    - haus-verkaufen-makler
    - haus-privat-verkaufen
    - maklerprovision
    - maklerprovision-verhandeln
    - wann-wird-eine-maklerprovision-faellig
    - maklergebuehren-umgehen
    - maklergebuehren-steuerlich-absetzen
    - maklerauftrag
    - maklervertrag-kuendigen (+ „wenn man selbst Käufer gefunden hat“)
    - Alleinauftrag einfach/qualifiziert
    - Doppeltätigkeit
    - mehrere Makler
    - Maklerleistungen
    - Maklerverband
    - Maklerbewertung
    - Tipps Maklersuche
    - Tricks unseriöser Makler
    - Bestellerprinzip
    - Nachweisbestätigung
    - Luxusimmobilienmakler
    - Haftung Makler für Mängel.
- Steuern (sehr granular): hausverkauf-steuern
    - spekulationssteuer-berechnung
    - beginn-spekulationsfrist
    - spekulationsfrist-berechnung
    - spekulationsfrist-umgehen
    - spekulationsfrist-selbstgenutzte-immobilien
    - spekulationsfrist-nach-erbschaft
    - spekulationsfrist-nach-scheidung
    - spekulationssteuer-scheidung
    - spekulationsfrist-schenkung
    - spekulationsfrist-bei-aufteilung-in-eigentumswohnungen
    - spekulationsfrist-gewerbeimmobilien
    - spekulationssteuer-unbebautes-grundstueck
    - immobilie-nach-10-jahren/3-4-5-jahren/2-jahren verkaufen
    - innerhalb der Spekulationsfrist
    - umsatzsteuer
    - hausverkauf-in-steuererklaerung-angeben
    - hausverkauf-steuerlich-absetzen
    - Verlust absetzbar
    - Renovierung absetzbar
    - wann gewerblich
    - Erbschaftssteuer
    - Feststellung Grundbesitz Erbschaftssteuer
    - Steuer Hausverkauf an Kinder
    - innerhalb Familie Steuern
    - BFH-Urteil Familie
    - Zweitwohnsitz
    - Ausland.
- Erbe: haus-erben-und-verkaufen
    - geerbtes-haus-verkaufen-steuer
    - haus-verkaufen-ohne-erbschein
    - immobilie-verkaufen-nach-todesfall
    - immobilie-verkaufen-trotz-erbvertrag/testament
    - erbrecht
    - erbengemeinschaft
    - kann-erbe-aus-erbengemeinschaft-immobilie-alleine-verkaufen
    - erbauseinandersetzung
    - kosten-der-erbaufteilung-steuerlich-abziehbar
    - immobilienbewertung-bei-erbschaft
    - schenkung-erbschaft-vor-ableben
    - immobilienschenkung-widerruf
    - haus-nach-schenkung-verkaufen.
- Scheidung/Familie: hausverkauf-nach-scheidung-auszahlung
    - verteilung-verkaufserloes-bei-scheidung
    - partner-will-gemeinsame-immobilie-nicht-verkaufen
    - haus-gekauft-jetzt-trennung
    - immobilie-an-ehepartner-verkaufen
    - haus-verkaufen-zwei-eigentuemer
    - haus-innerhalb-der-familie-verkaufen
    - immobilie-an-kinder-verkaufen
    - immobilie-unter-geschwister-verkaufen
    - Teilungsversteigerung.
- Alter/Pflege/Sonderfälle: immobilie-im-alter-verkaufen
    - hausverkauf-wegen-pflegekosten
    - haus-verkaufen-wohnen-bleiben
    - haus-verkaufen-und-zurueckmieten
    - haus-verkaufen-auf-rentenbasis
    - Leibrente(berechnen)
    - Immobilien-Verrentung
    - Nießbrauch
    - Wohnrecht
    - immobilie-mit-wohnrecht-verkaufen
    - immobilie-bei-demenz-verkaufen
    - immobilie-durch-betreuer-verkaufen
    - haus-mit-vollmacht/vorsorgevollmacht verkaufen
    - Privatinsolvenz
    - haus-an-die-bank-verkaufen
    - Zwangsversteigerung
    - immobilie-schnell-verkaufen
    - immobilie-diskret-verkaufen
    - immobilie-mit-verlust-verkaufen
    - zu teuer gekauft.
- Vermietet/WEG: vermietete-wohnung-verkaufen
    - vermietetes-haus-verkaufen
    - immobilie-vermietet-oder-unvermietet-verkaufen
    - wohnung-an-mieter-verkaufen
    - mieter-kuendigen-wohnungsverkauf
    - wohnung-als-kapitalanlage-verkaufen
    - wohnungsverkauf-auswirkung-auf-eigentuemergemeinschaft
    - wohnung-ohne-teilungserklaerung-verkaufen
    - teilungserklaerung
    - aufteilungsplan
    - sondereigentum
    - was-passiert-mit-instandhaltungsruecklage
    - wer-haftet-fuer-abrechnungsspitze
    - wohnung-mit-schimmel/nachbarn/wohnbaufoerderung verkaufen
    - sozialwohnung.
- Prozess/Recht: Unterlagen Hausverkauf
    - Unterlagen Notar
    - Energieausweis
    - ohne Energieausweis
    - Exposé
    - falsche Flächenangaben
    - Besichtigungstermin
    - Fotos zulassen
    - Reservierungsgebühr/-dauer
    - Vorvertrag
    - Kaufvertrag (Anwalt prüfen, Rücktritt, Rücktrittsklausel)
    - Notar (Aufgaben, wer beauftragt, wer zahlt, Bezahlung, ohne Notar, Vollmacht)
    - Auflassung(svormerkung)
    - Besitzübergang
    - Kaufpreisfälligkeit
    - Zahlungsabwicklung
    - Käufer zahlt nicht
    - Bonität prüfen
    - Barzahlung
    - Hausübergabe (Ablauf, Protokoll, Unterlagen, Kosten, Zählerstände, Mängel, vor Zahlung, an Kinder, Vollmacht)
    - Mängelhaftung
    - Haftungsausschluss
    - Geldstrafen
    - Versicherungen nach Verkauf (5 Artikel)
    - Grundschuld/laufender Kredit/Kredit mitnehmen/Sonderkündigungsrecht/Vorfälligkeitsentschädigung absetzen.
- Bewertung (als Glossar): Verkehrswertgutachten
    - Immobilienschätzung
    - Gutachter
    - Bewertung Dauer/Gültigkeit/Kosten
    - Vergleichswert/Ertragswert/Sachwert
    - Bodenrichtwert
    - Gutachterausschuss
    - Wertermittlungsstichtag
    - Altersabschlag
    - Zeitwert
    - Marktwert
    - Gemeiner Wert
    - Baujahr
    - Lage
    - Wohnfläche
    - DIN 277
    - Hauspreise
    - „so-viel-bekommen-sie-fuer-50-quadratmeter“
    - Immobilienblase
    - Preiskommentar
    - Zinskommentar
    - Städteranking.
- News/Politik: Sanierungspflicht · Gebäudemodernisierungsgesetz Juli 2026 · Koalitionsvertrag 2025 · Lastenausgleichsgesetz · Wahlergebnisse · „Das ändert sich 2025/2026 für Verkäufer:innen“ · Demografie · Energieeffizienz als Verkaufsfaktor · Geisterhaus.
- Gelesene Artikel:
  1) „Wohnung verkaufen: Vorbereitung, Unterlagen und Ablauf“ (`eigentumswohnung-verkaufen.html`): Title „Wohnung verkaufen in 2026: Ablauf, Kosten & Checkliste - ImmoScout24“; Nadine Kunert „Expertin für Verkauf & Vermietung“; „Aktualisiert: 02.01.2026“; ≈ 2.000–2.500 Wörter; Box „Das Wichtigste in Kürze“ (Wohnungsverkauf planen · Ablauf · Steuern); H2 „Wie kann ich am besten eine Wohnung verkaufen?“
      - „Was muss ich beachten, wenn ich eine Wohnung verkaufe?“
      - „Wie ermittle ich den Wert meiner Wohnung?“
      - „Wohnungsverkauf: Kennst du deine Käuferzielgruppe?“
      - „Wohnung verkaufen – wann lohnt es sich?“
      - „Wie lange dauert der Verkauf einer Eigentumswohnung?“
      - „Welche Unterlagen …?“
      - „Wie präsentiere ich die Wohnung am besten?“
      - „Wie viel kostes es, eine Eigentumswohnung zu verkaufen?“ [Tippfehler]
      - „Fazit: Gut vorbereitet ist halb verkauft“
      - „FAQ …“ (5, mit FAQPage-Schema)
      - zusätzlich HowTo/HowToStep-Schema. Kostentabelle (Beispiel 200.000 €: Verkäufer 10.040 €, Käufer 23.140 €), Vorkaufsrecht Mieter bei erstmaligem Verkauf nach Aufteilung, „Checkliste Immobilienverkauf“ PDF, Infografik „Ablauf Immobilienverkauf“, Buttons „Selbst verkaufen“ / „Mit Makler verkaufen“, „Artikel herunterladen“. Inkonsistenzen (Eigennutzung „mindestens“ vs. „mehr als zwei Jahre“, Dauer 3–5 vs. 3–4 Monate). Hausgeld nicht erwähnt.
  2) „Geerbtes Haus verkaufen“ (`haus-erben-und-verkaufen.html`): „ImmoScout24 Redaktion“, 20.08.2026, ≈ 900–1.000 Wörter; H2 „Das Wichtigste in Kürze“ · „Nicht kopf- und planlos handeln“ · „Der nächste Schritt: Hausverkauf mit Erbschein“ · „Kosten des Erbscheins“ (Tabelle § 34 GNotKG: 300 € bei 125 T€, 935 € bei 500 T€, 1.335 € bei 750 T€) · „Haus verkaufen ohne Erbschein“ (OLG Hamm 15 W 248/13) · „Option: Haus verkaufen vor dem Erbe“; keine Freibeträge, kein FAQ; Links auf Erbrecht/Erbengemeinschaft/Erbauseinandersetzung/Erbschaftssteuer; CTAs „Jetzt kostenlose Bewertung starten →“, „Makler finden →“.
  3) „Auszahlung bei Hausverkauf nach Scheidung“: Redaktion, 20.08.2026, ≈ 700 Wörter; H2 „Scheidung: Gemeinsames Haus auszahlen lassen“ · „Nutzen Sie vor der Scheidung den Rechner: Haus auszahlen nach Scheidung“ (kein eigener Rechner verlinkt!) · „Wann lässt sich durch Scheidung der Hausverkauf erzwingen?“ · „Wie lassen sich … Steuern sparen?“; Beispiel 400.000 − 80.000 − 100.000 („geschätzter Verlust durch Scheidung“) = 220.000 → 110.000 € je Partner; inhaltlich teils widersprüchlich (Teilungsversteigerung mit/ohne Zustimmung); kein FAQ; „Sie“-Form (älterer Artikel).
  4) „Vermietete Wohnung verkaufen: Was du wissen musst“: Nadine Kunert, 27.08.2026, ≈ 2.500–3.000 Wörter; 11 H2 (s. Report) inkl. „Kauf bricht nicht Miete …“, „Vermietet verkaufen – Vorkaufsrecht der Mieter beachten“, „Mit oder ohne Mieter verkaufen: Strategie und Timing“, „Besichtigung einer vermieteten Wohnung“, „Spekulationssteuer beim Verkauf“, FAQ (5: „Welche Rechte haben die Mieter …?“ · „Gibt es eine Wertminderung …?“ · „Kann ich Mietern kündigen …?“ · „Wie lange hat ein Mieter Kündigungsschutz bei Verkauf?“ · „Wie lange muss man vermieten, um steuerfrei zu verkaufen?“); Abschlag „20 bis 30 Prozent“, Sperrfrist 3 bis 10 Jahre, § 577 BGB zwei Monate, Besichtigung „maximal ein Termin pro Woche“; kein FAQPage-Schema (Person + Article).
  5) „Wie wird die Steuer beim Verkauf einer Immobilie berechnet?“ (`spekulationssteuer-berechnung.html`): Redaktion, 01.08.2023 (veraltet: Freigrenze „600 Euro“), ≈ 650 Wörter; Beispiel 400.000 − 250.000 − 20.000 = 130.000 × 30 % = 39.000 €; kein Rechner.
  6) „Maklerprovision beim Immobilienverkauf: Wer zahlt?“: Nadine Kunert, 09.09.2026, ≈ 1.800 Wörter; 13 H2; eingebetteter „Provisionsrechner Verkauf“ (Felder: Bundesland-Dropdown, „Verkaufspreis“, „Auftragsart“ [Teilung der Provision / Volle Provision / Provision selbst festlegen], „Provision (in Prozent)“ → „Ergebnis der Berechnung“ → Button „Profi finden →“; Hinweis „Bei den Berechnungen handelt es sich lediglich um unverbindliche Richtwerte.“); Expertenkommentar Nadine Kunert; FAQPage-Schema (4); keine BW-spezifische Zahl.
  7) „Haus verkaufen ohne Makler: Tipps, Vorteile & Nachteile“ (`mit-oder-ohne-makler-verkaufen.html`): Nadine Kunert, 30.07.2026, ≈ 2.700 Wörter; Selbsttest-Listen („Ein Privatverkauf ist für dich sinnvoll, wenn du folgende Fragen mit „Ja“ bestätigen kannst:“ / „Ein Verkauf über professionelle Immobilienmakler:innen kommt infrage, wenn …“), Wortpaar-Vergleich „Ohne Makler | Mit Makler“: „keine Provision | Provision“ · „hoher Zinsaufwand | geringer Zinsaufwand“ (sic) · „volle Kontrolle | professionelle Unterstützung“ · „Preisfindung selbst | Marktkenntnis vorhanden“; Rechenbeispiel 350.000 € × 7,14 % = 24.990 €; FAQPage (4); Buttons „Selbst verkaufen“/„Mit Makler verkaufen“, Quiz-Widget.
- Formatmuster aller Artikel: „Das Wichtigste in Kürze“ → Inhaltsverzeichnis → H2-Fragen → Werbe-Blöcke „Du möchtest deine Immobilie bewerten lassen?“ (H3, 1–2× pro Artikel) → Fazit → FAQ → „Ähnliche Artikel“/„Diese Makler-Themen könnten dich auch interessieren“ → Sharing (WhatsApp, Facebook, Twitter, LinkedIn, E-Mail) → „Artikel herunterladen“, „Artikel melden“, „Feedback senden“ („War dieser Artikel hilfreich?“). Autorenbox mit Vita (Nadine Kunert: „12 Jahre Praxis als Vermieterin“).

### 6.7 Vertrauenselemente
eKomi-Siegel · „Nr. 1 für Immobilien“ · „Millionen echter Transaktionen“ · Muster-Bewertungs-PDF · Autorenprofile (`/wissen/immoscout24-redaktion/`) · „Aktualisiert“-Datum · Expertenkommentare · Gesetzes-/Urteilsverweise · Kundenstimmen · Newsletter mit „Gerichtsurteilen“.

### 6.8 Kontaktwege
Telefon 030 24 301 14 50 (Bewertung), marktwert@scout24.com, „Kontakt & Hilfe“ (Telefon, Live-Chat, E-Mail), Service-Zeiten Mo–So 10–22 Uhr; kein Rückruf-Button auf Wissen-Seiten.

### 6.9 Design & Tonalität, Mobile
Du-Ansprache („deine Immobilie“), gendergerecht („Makler:in“), kurze Absätze, farbige Hinweis-/Tipp-Boxen, Infografiken, Sticky-Widgets; sehr CTA-dicht (Sticky-Footer). AEM + Astro; responsive; mobile nicht prüfbar.

### 6.10 SEO
- Titles: Hub „Ratgeber Immobilienverkauf » Tipps für Eigentümer - ImmoScout24“ · Wohnung „Wohnung verkaufen in 2026: Ablauf, Kosten & Checkliste - ImmoScout24“ · Provision „Maklerprovision 2026: Höhe, Berechnung & wer zahlt | ImmoScout24“ · ohne Makler „Haus verkaufen ohne Makler: Tipps, Vorteile & Nachteile | ImmoScout24“ · Bewertung s. o.
- Long-Tail-Strategie: hunderte Frage-URLs („darf-man-reservierungsgebuehr-…“, „haus-gekauft-jetzt-schimmel“) – klassisches People-also-ask-Harvesting; Schema HowTo/FAQPage/Article/Person; Kampagnen-Parameter in jedem CTA-Link (Attribution).
- Lokale Seiten: Preisatlas `/immobilienpreise/<land>/<stadt>` (für Bots 401 – nicht geprüft) und `/regional/`; keine lokalen Verkaufs-LPs im Wissen-Bereich.

### 6.11 Technik
Adobe Experience Manager (Wissen), Next.js/Contentful/Astro (Bewertungs-LP), Tealium (Consent/Tag-Management, „Privacy-Manager“), GA4, eKomi.

### 6.12 Übertragbarkeit auf Rössler
Übernehmen: Phasen-Navigation „abwägen → vorbereiten → abwickeln → abschließen“ als Ratgeber-Architektur; „Das Wichtigste in Kürze“ + Fazit + FAQ (mit FAQPage-Schema) + Autorenbox mit echter Vita; Selbsttest „Privat oder mit Makler?“ als ehrlicher Entscheidungshelfer; Provisionsrechner mit Bundesland-Logik (für Rössler: BW-Standard 3,57 %/3,57 % fest); Muster-Ergebnis (Beispiel-Wertgutachten als PDF-Vorschau); Frage-Formate aus echten Kundensituationen („Kann ich meine Wohnung verkaufen, wenn sie noch nicht abbezahlt ist?“).
Nicht übernehmen: 333 Verkaufs-Artikel (bei Rössler reichen 20–25), Sticky-CTAs an jeder Stelle, veraltete Steuerangaben (600 € Freigrenze), inhaltliche Widersprüche durch viele Autoren, Kampagnen-Parameter-Wildwuchs.


## 7. Immowelt Ratgeber (nur Ratgeber-Benchmark) – https://www.immowelt.de/ratgeber

Hinweis: Startseite, `/verkaufen` und `/immobilienbewertung` von immowelt.de liefern HTTP 403 (Bot-Schutz) und wurden nicht umgangen. Ausgewertet wurde ausschließlich der frei erreichbare Ratgeber-Bereich (TYPO3) samt seiner Sitemaps.

### 7.1 Geschäftsmodell, Reichweite
- Portal (AVIV Group); Ratgeber dient als SEO-Zubringer für Inserate („Immobilienanzeige kostenlos aufgeben“, „Ab 0,- € vermieten“), Bewertung („Immobilie schätzen lassen“), Dokumentenbestellung, Baufinanzierung (Interhyp-Kooperation), KfW-Förderung, Umzugspreisvergleich.
- Ratgeber-Sitemap (3 Teile): 2.388 URLs – news 1.946 · mieten 108 · wohnen 87 · vermieten 57 · kaufen 54 · verkaufen 43 · finanzieren 27 · immobilienprofis 20 · umziehen 13 · autoren 13 · preisreport 6.

### 7.2 Navigation (Ratgeber)
- Breadcrumb „immowelt › Immobilien Ratgeber“; Zielgruppen-Kacheln „Für Eigentümer“ · „Für Suchende“ · „Für Immobilienprofis“; Rubriken „Mieten · Verkaufen · Vermieten · Finanzieren · Kaufen · Wohnen“ (+ Umziehen); „Schnellsuche im Ratgeber“; „Das sind deine Experten“ (Autorenseiten); Footer im Extrakt nicht enthalten.

### 7.3 Hub-Seiten
- `/ratgeber`: Title „Immobilien-Ratgeber: Tipps und Wissen von immowelt“; Meta „Der Immobilien-Ratgeber von immowelt bietet wertvolle Informationen für Mieter ✓ Vermieter ✓ Käufer ✓ Verkäufer ✓ und Immobilienprofis ✓“; H1 „immowelt Ratgeber“; H2 „Schnellsuche im Ratgeber“ · „Neu im Ratgeber“ (5 datierte Teaser, z. B. 29.10.2026 „Zwangsversteigerung abwenden: Was Eigentümer tun können“, „Haus privat verkaufen ohne Makler: Ablauf, Kosten und Checkliste“) · „Der neue immowelt Werbespot“ · „News und Trends“ · „Weitere Empfehlungen“ · „Umziehen …“ · „Immobilienanzeige kostenlos aufgeben“ · „Immobilienthemen für dich auf den Punkt gebracht“ · „Realistischer Schätzwert für deine Immobilie“ (CTA „Bewertung starten →“) · „Kontakt“. Nur ≈ 260 Wörter – reiner Verteiler.
- `/ratgeber/verkaufen`: Title „Wissen rund um das Verkaufen von Immobilien“; H1 identisch; H2 „Neue Artikel für Eigentümer, die verkaufen wollen“ (7 Teaser mit Datum, davon einer „Anzeige“: „Die ideale Scoperty Alternative …“)
    - „Immobilienanzeige aufgeben“
    - „Wichtig für Immobilienverkäufer“
    - „Lokale Immobilienbewertung“ (15 Stadtseiten)
    - „immowelt App herunterladen“; Sticky-CTA „Immobilie schätzen lassen“; JSON-LD CollectionPage.

### 7.4 Vollständige Verkaufs-Themenliste (43 URLs, Sitemap)
- Prozess/Allgemein: immobilienverkauf
    - haus-privat-verkaufen
    - dauer-hausverkauf
    - expose-erstellen
    - bieterverfahren
    - abgeschlossenheitsbescheinigung
    - haus-verkaufen-wohnrecht
    - haus-an-kind-verkaufen
    - verkaufen-oder-vermieten
    - teilverkauf
    - mehrfamilienhaus
    - vermietetes-haus
    - vermietete-wohnung-verkaufen
    - wertsteigerung-immobilien
    - immobilienblase
    - scoperty-alternative (Anzeige).
- Steuern: spekulationssteuer · steuern-immobilienverkauf · immobilie-steuerfrei-verkaufen · grundstuecksverkauf-steuer · ehegattenschaukel · provisionssplit-neuvertrag.
- Bewertung: ertragswertverfahren · sachwertverfahren · vergleichswertverfahren · liegenschaftszins · zeitwert-haus-berechnen · 15 × immobilienbewertung-<stadt> (Berlin, Bonn, Braunschweig, Bremen, Dresden, Düsseldorf, Essen, Frankfurt, Hamburg, Hannover, Karlsruhe, Köln, Leipzig, München, Nürnberg).
- Erbe/Familie liegen teils unter „wohnen“: erbengemeinschaft · erbschaftssteuer · haus-erben; Makler-Themen unter „vermieten“/„immobilienprofis“ (maklerprovision-wer-zahlt · maklervertrag-tipps · maklerhaftung · maklerprovision-fallen-vermeiden · nachweismakler-vermittlungsmakler).

### 7.5 Gelesene Artikel
1) „Vermietete Wohnung verkaufen: Käufer, Mieterrechte und Steuern“: Autor Andreas Steger, aktualisiert 27.10.2026, ≈ 1.900 Wörter; H2 „Das Wichtigste in Kürze“ · „Übersicht“ · „Wie läuft der Verkauf einer vermieteten Eigentumswohnung ab?“ (H3 „Welche Unterlagen werden für den Verkauf benötigt?“) · Werbeblock „Dokumente für Immobilienkauf oder -verkauf benötigt?“ · „An welche Käufer lässt sich eine vermietete Wohnung verkaufen?“ (H3 Kapitalanleger · bisherige Mieter · Eigennutzer; Vergleichstabelle Interesse/Aufwand/Preisniveau) · „Wann hat der Mieter ein Vorkaufsrecht …?“ · „Darf dem Mieter wegen des Verkaufs gekündigt werden?“ (H3 „Sonderfall Eigenbedarfskündigung“, „Alternative: Mietaufhebungsvertrag“) · „Welche Rechte hat der Mieter …?“ (Tabelle) · „Wann fällt beim Verkauf Spekulationssteuer an?“ · „Hinweis: Umwandlung von Mietshäusern …“ · „Häufige Fragen …“ (10 H3) · „Das könnte dich auch interessieren“ · „immowelt Redaktionskodex“. Kernzahlen: Abschlag „in Einzelfällen bis zu 30 Prozent“, Sperrfrist 3 bzw. bis 10 Jahre (§ 577a BGB), Freigrenze 1.000 €. 5-Schritte-Checkliste, Unterlagenliste inkl. Teilungserklärung/Wirtschaftsplan/Protokolle. Leserfeedback „88 % Weiterempfehlung“. CTAs „Immobilie schätzen lassen“, „Einfach online bestellen →“.
2) „Geerbtes Haus verkaufen: Steuern und Fristen beachten“: Autorin Regine Curth, 23.10.2024, ≈ 2.500–3.000 Wörter; 18 H2 (u. a. „Geerbtes Haus verkaufen: Wie viel Steuern muss ich zahlen?“, „Wie funktioniert die Erbschaftssteuer?“ (H3 „Individueller Steuersatz und Freibeträge bei Erbschaft“), „Welchen Verkehrswert hat meine Immobilie?“, „Beispiele: Erbschaftssteuer beim Kind und Enkelkind“, „Geerbtes Haus verkaufen: Erbschaftssteuer umgehen“, „Erbschaftssteuer Nachzahlung bei Verkauf“, „… Wann zahle ich Spekulationssteuer?“, „… Was muss ich bei einer Erbengemeinschaft beachten?“, „… So gehst du vor“, „Kann ich ein geerbtes Haus sofort verkaufen?“, „Welche Unterlagen …?“, „Welche Kosten fallen zusätzlich an?“, „FAQ …“ (6 H3)); Tabellen: Freibeträge (500/400/200/100/20 T€), Versorgungsfreibeträge (256.000 € Ehegatte; Kinder gestaffelt 52.000–10.300 €), Steuersätze 7–50 %; BFH IX R 13/22; Checkliste-PDF „Checkliste hier downloaden“; Werbeblöcke (KfW „Staatliche Förderung jetzt sichern“, Preisrechner, Bewertung).
3) „Spekulationssteuer bei Immobilien: Wann sie fällig wird und wie du sie vermeidest“: Autor Kilian Treß, 02.04.2025, ≈ 2.500–3.000 Wörter; 17 H2 inkl. „Spekulationssteuerrechner“ – zweistufiger interaktiver Rechner: Schritt 1 Fristprüfung (Kaufdatum; Nutzung „Seit Kauf/Fertigstellung ausschließlich selbst genutzt“ / „Erst vermietet, dann selbst genutzt“ / „Ausschließlich vermietet“; Einzugsdatum; „Berechnen“), Schritt 2 Steuerhöhe (Kaufpreis, Verkaufspreis, Nebenkosten des Kaufs, Nebenkosten des Verkaufs, Renovierungskosten, geltend gemachte AfA, zu versteuerndes Einkommen, Familienstand Ledig/Verheiratet; „Berechnen“). Beispiel 620.000 − 530.000 − 50.000 = 40.000 € (Einzelposten summieren sich jedoch auf 55.000 € – Rechenfehler im Original). FAQ (5 H3). Hinweis auf fehlerhafte Zitierung eines Aktenzeichens (BFH vs. FG Köln „8 K 3825/11“).
4) „Notartermin beim Immobilienverkauf: Ablauf, Unterlagen, Tipps“ (`/ratgeber/verkaufen/immobilienverkauf` leitet thematisch hierauf): Kilian Treß, 26.11.2024, ≈ 1.500–1.700 Wörter; H2 „Wer wählt den Notar …?“ · „Vorbereitung des Notartermins“ (H3 Unterlagen, Vertragsinhalte, Vertragsentwurf, prüfen lassen) · „Vertragsunterzeichnung: So ist der Ablauf des Notartermins“ (H3 Vertretung, Vollmacht, Dauer, Kosten „0,5 bis 1,0 % des Kaufpreises“, Absage) · „Das passiert nach dem Notartermin“; Werbe-H2 „Immobilienanzeige aufgeben“, „Baufinanzierung mit Interhyp“, „Staatliche Förderung jetzt sichern“.
5) Lokale Seite „Immobilienbewertung in Karlsruhe“ (`/ratgeber/verkaufen/immobilienbewertung-karlsruhe`): Title „Immobilienbewertung Karlsruhe – Marktwert kostenlos ermitteln“; H1 „Immobilienbewertung in Karlsruhe“; H2 „Realistischer Schätzwert für deine Immobilie“ · „Der Immobilienmarkt in Karlsruhe“ (H3 „Entwicklung der durchschnittlichen Quadratmeterpreise für Wohnungen und Häuser in Karlsruhe“ – Tabelle 2017–2024, 2024: Wohnungen 4.118 €/m², Häuser 4.570 €/m², Spanne 2.807–6.571 €/m², „Stichtag 01.01. des jeweiligen Jahres“) · „Was beeinflusst den Wert einer Immobilie in Karlsruhe?“ · „Darum lohnt sich unsere kostenlose Online-Immobilienbewertung in Karlsruhe“ · „So funktioniert die Bewertung“ (Lage/Größe/Ausstattung eingeben → berechnen → Ergebnis per E-Mail) · H3 „Weitere Hinweise …“ (H4 „Gutachten für verschiedene Zwecke“, „Warum Expertise unverzichtbar ist“, „Karlsruhe: Ein vielfältiger Immobilienmarkt“) · FAQ (3 H3) · wiederholter Bewertungs-CTA „In 3 Minuten – 100% kostenlos“ / „Bewertung starten“. ≈ 1.100 Wörter, keine Stadtteile, kein Autor/Datum, keine Quelle – Template mit Zahlen-Slot.

### 7.6 Formatmuster, Vertrauen, Technik
- Jeder Artikel: Autorname mit Profilseite (`/ratgeber/autoren/…`), „Aktualisiert“-Datum, „Das Wichtigste in Kürze“, „Übersicht“ (Inhaltsverzeichnis), Frage-H2, Tabellen, FAQ als H3, „immowelt Redaktionskodex“, Feedback („War dieser Artikel hilfreich?“, Weiterempfehlungsquote), Kommentarfunktion, Haftungshinweis („keine rechtsgültige Beratung“); 2–4 Werbe-Einschübe pro Artikel (Inserat, Bewertung, Interhyp, KfW, Dokumentenbestellung).
- Technik: TYPO3 CMS, Usercentrics, GTM/GA4, React-Widgets (Rechner), Bootstrap; JSON-LD Breadcrumb/CollectionPage/WebPage (Artikel-Schema im Extrakt nicht geprüft).
- Du-Ansprache, sachlich, kurze Absätze; stark monetarisiert.

### 7.7 Übertragbarkeit auf Rössler
Übernehmen: Spekulationssteuer-Rechner-Logik (erst Frist prüfen, dann Höhe), Käufergruppen-Tabelle für vermietete Wohnungen (Kapitalanleger/Mieter/Eigennutzer), Mieterrechte-Tabelle, Redaktionskodex/Haftungshinweis als Vertrauensbaustein, Feedback-Frage am Artikelende, Preis-Tabelle mit Stichtag und Quelle auf Ortsseiten.
Nicht übernehmen: 1.946 News-Artikel, Werbe-Einschübe von Drittanbietern, Stadtseiten ohne lokale Substanz, Rechenfehler durch fehlende Prüfung.

---

## 8. Finanztip (Wohnung/Haus verkaufen) – https://www.finanztip.de/

### 8.1 Geschäftsmodell, Reichweite
- Gemeinnützig getragener Verbraucher-Ratgeber (Finanztip Verbraucherinformation gGmbH), finanziert über Affiliate-Links („*“), Deals, Academy, Unterstützer; Newsletter „über 850.000 Abonnenten“ bzw. „über einer Million Lesern“ (beide Zahlen auf derselben Seite). Kein Makler, keine Lead-Weitergabe – aber explizite Maklerempfehlung (Homeday, McMakler) mit Affiliate-Kennzeichnung.
- Sitemap: `guidesSitemap.xml` 1.134 Ratgeber, davon ≈ 108 immobiliennah; Rechner-Sitemap 23 Rechner (Hypothekenrechner, Tilgungsrechner, Budgetrechner Hauskauf …), kein Spekulationssteuer-Rechner.

### 8.2 Startseite / Navigation
- Title „Finanztip - Deutschlands Finanz-Ratgeber“; H1 „Finanzen kannst Du selbst. Mit unseren Empfehlungen.“; Rubriken Finanzen
    - Versicherung
    - Energie
    - Recht
    - Steuern
    - Sparen im Alltag; Immobilien-Ratgeber unter „Baufinanzierung“ (Haus verkaufen, Hauskauf Checkliste, Teilverkauf, Immobilienbewertung, Mieten oder Kaufen …) und „Steuern“ (Spekulationssteuer, Erbschaftssteuer Immobilien, Grunderwerbsteuer, Grundsteuer); Menü mit mehreren hundert Links („Mein Finanztip“-Login, App).

### 8.3 Gelesene Artikel (als Benchmark für Tiefe und Verbraucherperspektive)
1) „Haus verkaufen – Warum sich ein Hausverkauf 2026 wieder lohnt“ (`/haus-verkaufen/`): Title „Haus verkaufen – Immobilie clever verkaufen“; Autor Dirk Eilinghoff „Experte Immobilien & Baufi“; „Stand: 30. April 2026“ (datePublished 2019-03-22); ≈ 5.000 Wörter Haupttext (10.300 sichtbar). Boxen „Das Wichtigste in Kürze“ (Preise steigen wieder; privat oder Makler; Makler = Service gegen Provision) und „So gehst Du vor“ (früh entscheiden; auf „Chemie“ achten, mehrere Unternehmen kontaktieren; Empfehlung Homeday und McMakler „weil sie digitale Prozesse mit Beratern vor Ort verbinden“). 15 H2: „Wann ist der richtige Zeitpunkt …?“ · „Was ist besser: Hausverkauf über den Makler oder von privat?“ (H3 „Bei diesen Schritten unterstützt Dich ein Makler“ · „So viel kostet der Makler“ · „So hoch ist die Maklerprovision im Jahr 2025“ · „Durchschnittliche Maklerprovision nach Bundesland“ · „Die Maklerprovision kann den Verkaufspreis verringern“ · „Maklerprovision bei einem festen Käuferbudget (Beispiel NRW)“ · „Mach Dir am besten selbst ein Bild“) · „Wie findest Du den besten Makler …?“ (H3 „Das sind die drei wichtigen Gruppen von Maklern“ [Banken/Bausparkassen, unabhängige Makler, Online-Makler] · „So sieht der passende Maklervertrag aus“ [Laufzeit „drei bis sechs Monate“]) · „Wie verkaufst Du Dein Haus oder Deine Wohnung Schritt für Schritt?“ · Unterlagen · Bewertung · Angebotspreis („Hochpreisstrategie“ vs. realistisch) · Exposé · Vermarktung · Anfragen · Kaufpreis verhandeln · Notartermin (Zwei-Wochen-Frist bei Verbraucherverträgen) · Übergabe und Zahlung · „Was solltest Du beim Hausverkauf noch beachten?“ (H3 Miteigentümer · Steuern auf den Verkaufserlös · Verkauf einer vermieteten Immobilie · Ablösung des alten Baukredits · Verkauf gegen Leibrente oder Teilverkauf) · „So sind wir zu unserer Maklerempfehlung gekommen“ (H3 „Auswertung der Fragebögen“, „Diese Kriterien halten wir wichtig und verbraucherfreundlich“: bundesweit einheitliche Standards, ≥ 4.000 Objekte/Jahr, eigene Bewertungssoftware, digitales Reporting, ortsübliche Courtage, vorgelegter Maklervertrag, Interessentendatenbank > 100.000). Quellen: Homeday-Auswertung 28.000 Inserate (Okt. 2021), Finanztip-Berechnung 10.09.2025, BORIS NRW, BeurkG § 17, ZVG § 180, BGB § 577. Kein FAQ, kein eigener Rechner (Links auf Budget-/Nebenkosten-Rechner, Checklisten Hauskauf/Hausbesichtigung, Übergabeprotokoll).
2) „Spekulationssteuer Immobilien – So vermeidest Du Steuern beim Immobilienverkauf“: Jörg Leine „Experte Steuern“, Stand 09.07.2026, ≈ 3.500–4.000 Wörter; „So gehst Du vor“ empfiehlt Steuersoftware (Wiso Steuer*, Check24 Steuer*, Tax 2026*); 7 H2/17 H3 (u. a. „Warum reichen ein Jahr und zwei Tage der Selbstnutzung?“, „Was ist mit der Spekulationsfrist bei einem Erbe?“, „Gibt es einen Freibetrag bei der Spekulationssteuer?“, „Was ist mit dem Inventar beim Verkauf einer Immobilie?“, „Was passiert mit dem Arbeitszimmer beim Verkauf?“, „Was bringt eine Vorab-Schenkung in der Familie?“); sieben personalisierte Beispiele („Utta“, „Christine“, „Dennis“, „Jean“ …); Scheidung: Verkauf einer Hälfte an Ex-Partner startet neue Zehnjahresfrist; Freigrenze 1.000 € (seit 2024) korrekt; Quellen: § 23 EStG, § 42 AO, fünf BFH-Urteile, FG BW, FG Münster, Wachstumschancengesetz, BMF-Schreiben; kein Rechner, kein FAQ.
3) „Erbschaftssteuer Immobilien – So funktioniert die Steuer bei Deinem geerbten Haus“: Jörg Leine, Stand 17.08.2026 (datePublished 2012), ≈ 2.500–3.000 Wörter; „Das Wichtigste in Kürze“ wörtlich: „Wer eine Immobilie erbt oder geschenkt bekommt, muss Erbschaftssteuer oder Schenkungssteuer zahlen.“ · „Es gibt aber Freibeträge von 20.000 bis 500.000 Euro.“ · „Eine Befreiung … kann es für Ehepartner und Kinder bei selbst genutztem Wohneigentum geben.“; „So gehst Du vor“: „Wende Dich an eine Steuerberaterin oder einen Fachanwalt für Steuerrecht.“ + Checkliste „Erbschaftssteuer vermeiden“ (PDF); 8 H2/15 H3 inkl. „Bis wann musst Du als Kind ins Familienheim eingezogen sein?“, „Wie hoch ist die Erbschaftssteuer auf eine vermietete Immobilie?“ (90 %-Ansatz § 13d ErbStG), „Gibt es eine Steuerstundung …?“, „Wie wird eine Immobilie bewertet?“ (Vergleichs-/Ertrags-/Sachwert, Gutachterausschüsse), „Was änderte sich beim Sachwertverfahren 2023?“ (Beispiele Stadt/Land), „Warum klagt Bayern vor dem Verfassungsgericht?“ (1 BvF 1/23); Beispielrechnungen (Caroline: ETW 350.000 € von der Tante); umfangreiche Quellenliste (ErbStG, BewG, BFH II R 46/19, II R 27/23 …).
4) „Tipps zum Wohnungskauf – Worauf Wohnungskäufer achten sollten“ (`/eigentumswohnung/`): Dirk Eilinghoff, Stand 06.03.2026, ≈ 1.500–2.000 Wörter; H2 „Was musst Du über Eigentümergemeinschaft und Teilungserklärung wissen?“ (H3 „Was regelt die Teilungserklärung genau?“), Hausgeld-Definition („der monatliche Vorschuss für die Betriebskosten“), Sondereigentum/Gemeinschaftseigentum, Sondernutzungsrechte, Nebenkosten „fünf bis zwölf Prozent“; Unterartikel Hausgeld, Sondereigentum, Sondernutzungsrecht, Eigentümerversammlung, Auflassungsvormerkung; Budgetrechner eingebettet; Checkliste Wohnungskauf (PDF); Affiliate: Interhyp, Baufi24, Dr. Klein, Hüttig & Rompf, Hypofriend.
5) „Immobilienbewertung – Was bestimmt den Wert einer Immobilie?“ (`/baufinanzierung/immobilienbewertung/`): Dirk Eilinghoff, Stand 09.01.2026; H2 „Welche Immobilienwerte gibt es?“ · „Welche Faktoren …?“ · „Welche Bewertungsverfahren …?“ · „Wer bewertet Immobilien?“ · „Wie kannst Du Deine Immobilie selbst bewerten?“ (H3 Portale recherchieren · Ertragswertverfahren nutzen · Berichte der Gutachterausschüsse) · „Was bringen kostenlose Immobilienbewertungen?“ · „Was bringt die Immobilienbewertung durch Gutachter?“ · „Welche Immobilienbewertung ist die richtige?“ – die Verbraucherperspektive auf Makler-Gratisbewertungen.
6) „Scheidungskosten“ (`/kosten-einer-scheidung/`): Dr. Britta Beate Schön „Expertin Recht“, 30.07.2026; mit „Scheidungskostenrechner“ (Verfahrenswert aus Einkommen + Vermögen inkl. Immobilie); „Haus überschreiben“ (`/haus-ueberschreiben/`): 21.10.2025, 7 H2/21 H3 (Wohnrecht/Nießbrauch, stufenweise Schenkung, Kettenschenkung, Pflichtteilsergänzung, Beispielrechnung).

### 8.4 Formatmuster, Vertrauen, Technik
- Immer: H1 mit Dachzeile, Autorbox (Name, Rolle, Foto), „Stand: Datum“, „Das Wichtigste in Kürze“, „So gehst Du vor“, Frage-H2/H3, personalisierte Beispiele, Gesetzes- und Urteilsquellen, Newsletter-Boxen, Affiliate-Sternchen mit Transparenzhinweis; kein FAQPage-Schema (Article + Person); Du-Ansprache.
- Technik: TYPO3 (WordPress-Marker für Blog), consentmanager (CMP), GTM/GA4, Trustpilot, Typeform, Tailwind/React.
- Trust: Expertenredaktion, Community („Das sagt unsere Community“), Trustpilot, Transparenz zu Vergütung, Quellenlisten, Rechenbeispiele mit Datum.

### 8.5 Übertragbarkeit auf Rössler
Übernehmen: „Das Wichtigste in Kürze“ + „So gehst Du vor“ (bei Rössler in „Sie“-Form: „So gehen Sie vor“) als Doppelbox am Artikelanfang; personalisierte Rechenbeispiele mit Datum; Quellenangaben (§§, Urteile, Gutachterausschuss BW); ehrliche Makler-Auswahlkriterien (Rössler kann sie als „Prüfen Sie mich an diesen Kriterien“ spiegeln); Hinweis, dass Gratisbewertungen Lead-Instrumente sind – Rössler kann dies offen benennen und sich damit abheben.
Nicht übernehmen: Affiliate-Logik, Steuer-Software-Werbung, 5.000-Wörter-Monolithen (für einen Einzelmakler reichen 1.200–2.000 Wörter mit klarer Gliederung).


---

## 9. Muster über alle überregionalen Anbieter

### 9.1 Funnel-Muster
1. Objektart zuerst, immer als Kacheln (Haus · Wohnung · Grundstück · Gewerbe bzw. Haus · Wohnung · Mehrfamilienhaus). Die Kachel ist der eigentliche „Start“-Button; der Klick führt in eine separate, noindex-Funnelseite (Homeday, immoverkauf24, ImmoScout24, Von Poll) oder ein Overlay (E&V, Dahler).
2. Adresse vor Objektdaten (E&V: „Wir benötigen Ihre vollständige Adresse, um eine genauere Preisspanne zu berechnen.“; Homeday: „Adresse eingeben“ als Schritt 1; immoverkauf24: „Postleitzahl … in das obige Eingabefeld“).
3. Wenige Objektfelder mit Hilfetexten: Wohnfläche (mit Definition), Zimmer, Baujahr, Zustand in 2–3 Stufen, Etage/Balkon bei Wohnungen (E&V), Nutzung (selbst/vermietet/leer – Homeday, E&V), Modernisierung (Homeday).
4. Kontaktdaten am Ende („Letzter Schritt“), E-Mail Pflicht, Telefon „optional“ (E&V) bzw. faktisch erwartet (immoverkauf24, Homeday-Rückruf). Frage „Wann sind Sie am besten erreichbar?“ (E&V).
5. Ergebnis: Homeday „sofort angezeigt“ (Spanne) + E-Mail; Von Poll „Sofortige Ergebnisanzeige“ im Kundenportal; ImmoScout24/immoverkauf24/E&V „PDF/E-Mail in wenigen Minuten“; Dahler per E-Mail oder Video/Vor-Ort-Termin. Alle: Ergebnis ist ausdrücklich „Ersteinschätzung“, Vor-Ort-Termin ist der eigentliche Lead-Schritt.
6. Standard-Microcopy: „100 % kostenlos & unverbindlich“ (alle), „in 3 Minuten“ (immoverkauf24, ImmoScout24, Immowelt), „ohne Registrierung/ohne E-Mail“ (Homeday), „Kostenlos, vertraulich, unverbindlich“ (E&V), „Kostenfrei und unverbindlich“ (Von Poll, Dahler), Datenschutz-Satz (Von Poll: „weder veröffentlicht, noch ohne Ihre explizite Erlaubnis an Dritte weitergegeben“).
7. Vertrauen direkt am Formular: Zahlen (E&V 265.000+ Verkäufe, < 3 Monate; immoverkauf24 „seit 2011“), Siegel (TÜV Saar, eKomi, DISQ), Testimonial (Dahler „Der finale Kaufpreis entsprach exakt der ermittelten Kaufpreisspanne!“), Muster-PDF (ImmoScout24).
8. Dreischritt-Erklärung „So funktioniert's“ unter dem Formular (alle außer Dahler, der „Drei Möglichkeiten“ + 4-Schritte-Ablauf zeigt).
9. Einwand „anonym“ wird aktiv bearbeitet (Homeday-FAQ 11–14, E&V-FAQ, immoverkauf24-FAQ, Von Poll-Datenschutzsatz).
10. Alternative Kanäle neben dem Formular: Hotline (0800 bei Homeday/immoverkauf24), Terminbuchung/Video (Von Poll, Dahler), WhatsApp (Dahler), Rückruf-Service (Homeday).

### 9.2 Verkaufen-Seiten-Muster
- H1 ist entweder Keyword („Immobilie verkaufen …“) oder Nutzenversprechen („Ihre Vorteile bei einem Verkauf mit …“, „Ihr sicherer Partner“, „Erfolgreich verkaufen – mit Makler“).
- Fester Ablauf: Vorteile (3–5 Icons) → Prozess in 5–8 Schritten (E&V 8, Dahler 8, Von Poll 5, Homeday „Schritt für Schritt“) → Beweise (Zahlen, Siegel, Referenzen, Zitate) → FAQ mit Lebenssituationen (E&V: vermietet, geerbt, laufender Kredit, Wohnung vs. Haus) → Kontakt/Bewertung.
- Einwandbehandlung ist überall Text, nirgends eine echte Vergleichstabelle „mit vs. ohne Makler“ auf der Verkaufen-Seite; Tabellen/Listen gibt es nur in Ratgeberartikeln (ImmoScout24 Wortpaare, Homeday Listen, immoverkauf24 „wenn …“-Listen, E&V Pro/Contra).
- Rechner: nur ImmoScout24 (Provisionsrechner mit Bundesland), Immowelt (Spekulationssteuer, zweistufig), Homeday (Nettoerlös-Kostenrechner, Spekulationssteuer-Beispiel), immoverkauf24 (angekündigter Spekulationssteuer-/Sanierungsrechner; Notar-/Kaufnebenkostenrechner im Glossar). E&V, Von Poll, Dahler: keine Rechner.
- Lead-Magnete: PDF-Checklisten (Homeday 7, immoverkauf24 mehrere, ImmoScout24 „Checkliste Immobilienverkauf“, Immowelt Checkliste Erbe, Finanztip Checklisten), Maklercheck (Dahler), Marktberichte (Von Poll), Muster-Bewertung (ImmoScout24), Newsletter (alle).

### 9.3 Ratgeber-Muster
- Architektur: entweder Phasen (ImmoScout24: abwägen/vorbereiten/abwickeln/abschließen), Silos mit Glossar (immoverkauf24, Homeday), Zielgruppen (Immowelt: Eigentümer/Suchende/Profis; E&V: Käufer/Verkäufer/Makler/Regionen/Lifestyle) oder chronologischer Blog (Von Poll, Dahler).
- Artikel-Standard: „Das Wichtigste in Kürze“ (ImmoScout24, Immowelt, Finanztip, E&V, Von Poll „Kurz zusammengefasst“, Homeday „Das Wichtigste zusammengefasst“, immoverkauf24) → Inhaltsverzeichnis → H2 als Fragen → Tabellen/Beispielrechnungen → Fazit → FAQ → verwandte Artikel → CTA-Widget. Autor + Datum bei ImmoScout24, Immowelt, Finanztip, immoverkauf24 (teils), Homeday (neuere Artikel); fehlend bei E&V, Dahler; Von Poll nur Unternehmens-Autor.
- Schema: FAQPage bei immoverkauf24 und ImmoScout24 konsequent, bei Homeday nur vereinzelt, bei E&V/Von Poll/Dahler/Finanztip/Immowelt nicht (Immowelt nicht geprüft). HowTo nur ImmoScout24. Product/AggregateRating (Sterne) bei Homeday, immoverkauf24, Dahler, ImmoScout24.
- Länge: 2.000–5.000 Wörter bei Portalen/Finanztip, 700–2.500 bei Maklern; Dahler-Artikel oft < 1.000 Wörter ohne Struktur.
- Qualitätsrisiken, die sich wiederholen: veraltete Zahlen (Freigrenze 600 statt 1.000 €, Stadtteil-Daten 2022/2023), Widersprüche zwischen Haupttext und FAQ, Tipp-/Rechenfehler, juristische Ungenauigkeiten (WEG-Zustimmung), Lifestyle-Füllcontent.

### 9.4 Lokale Landingpages – Muster
- Templates mit Ortsnamen-Slot dominieren (Von Poll 207 Bewertungs-LPs, Dahler 70+70, Homeday 18, immoverkauf24 20 + 15.000 Preisseiten, Immowelt 15, E&V 2 echte + Ortslisten). Inhalte: „Immobilienbewertung in <Ort> und Umgebung“, 5-Schritte-Modell, FAQ, Kontakt.
- Echte lokale Substanz nur bei Dahler Stuttgart (Team mit Namen/Fotos/Durchwahlen, Adresse, Referenzen nach Stadtteil, Gesuche) und – datenseitig – bei immoverkauf24/Immowelt (€/m²-Tabellen mit Quelle/Stichtag). Homeday/immoverkauf24-Stuttgart-Seiten enthalten Stadtteil-Prosa mit alten Daten.
- Aufbau einer guten lokalen Verkaufen-Seite (Synthese): H1 „Wohnung verkaufen in <Ort>“ → kurzer Markt-Absatz mit 3–5 Zahlen (Quelle, Stichtag) → Ansprechpartner mit Foto/Telefon → Ablauf (5–8 Schritte) → Referenzen/verkaufte Objekte im Ort → lokale Besonderheiten (Stadtteile, typische Baujahre/Wohnungstypen, WEG-Themen) → FAQ (lokal: Dauer, Preise, Unterlagen, Verwalter) → Kontakt/Bewertung → Transparenz (Adresse, § 34c-Aufsicht).

### 9.5 Vergleichstabelle
| Anbieter | Bewertungsfunnel-Schritte (belegt) | Ergebnis sofort? | Ratgeber-Anzahl (Sitemap) | Lokale Landingpages | Rechner | Besonderheit |
|---|---|---|---|---|---|---|
| Homeday | Objektart → Adresse → Typ/Wohnfläche/Zimmer/Baujahr/Zustand (+ Etagen, Modernisierung, Ausstattung, Nutzung, Kaufdatum/-preis lt. Unterseiten) → Kontakt → Spanne; Reihenfolge im Formular nicht prüfbar | Ja, Spanne auf dem Bildschirm (+ E-Mail), dann Rückruf/Vor-Ort | ≈ 530 redaktionelle Seiten (71 Verkauf, 26 Bewertung, 16 Erbe, 128 Lexikon, 80 Blog …) | 18 „immobilie-verkaufen-<stadt>“ + 12 Preisseiten | Nettoerlös-Kostenrechner (WebApplication-Schema), Spekulationssteuer-Beispiel, Annuitätenrechner | Hybrid-Makler; Exit-Popup; Title „ohne E-Mail“ |
| immoverkauf24 | Objektart-Kachel → PLZ → Eckdaten (Lage, Art, Wohnfläche) → E-Mail (PDF) → Telefon-Nachfassung; Felder nicht prüfbar | Nein, PDF per E-Mail „nach wenigen Minuten“ + Anruf | 626 redaktionelle Seiten (216 Verkauf inkl. 45 Erbe, 41 Bewertung, 208 Services, 103 Makler) + 15.351 Preisseiten | 20 Städte-Verkaufsseiten + 15.351 Preisseiten bis Stadtteil (inkl. Heimsheim, Leonberg, Renningen, Ditzingen, Pforzheim) | Spekulationssteuer-, Sanierungs-, Notar-, Kaufnebenkosten-, Leibrente-Rechner (im Glossar) | Lead-Portal (Scout24-nah), TÜV-Saar-Siegel, Autorenprofile, PDF-Lead-Magnete |
| Von Poll | Objektart (Wohnung/Haus/MFH) → Adresse mit Hausnummer → Eckdaten/Zustand → Vorname/Nachname/E-Mail („Schritt x von y“) | Ja, „Sofortige Ergebnisanzeige“ im Kundenportal/App, laufende Updates | 45 Ratgeber + 79 Blog + 16 Provisions-Länderseiten | 207 „immobilienbewertung-<ort>“ (inkl. Leonberg, Stuttgart, Pforzheim) – Template | Verkaufssimulator, Sanierungsplaner, Finanzierungsrechner; kein Steuer-/Provisionsrechner | Käuferfinder, Terminbuchung, Video-Beratung, Marktberichte, Premium-Marke |
| Engel & Völkers | Objektart (Haus/Wohnung/MFH) → Adresse → Wohnungstyp/Etage/Zimmer/Wohnfläche/Balkon/Grundstück/Baujahr → Zustand (2 Stufen) → Nutzung → „Letzter Schritt“ Vorname/Nachname/E-Mail/Telefon (optional)/Erreichbarkeit | Nein, Spanne per E-Mail; Vor-Ort „bis zu drei Wochen“ | 465 Ressourcen (≈ 130 Verkäufer-Artikel, 153 regional) + 32 Hamburg + 28 Commercial | 2 echte Stadt-LPs (Berlin, Hamburg) + Ortslisten mit 5.500 Links | keine (nur Budgetrechner Finance) | 8-Schritte-Prozess, FAQ mit Lebenssituationen, Private Office/Diskretion, GG-Magazin |
| Dahler | Objektart → Formular (JS, nicht prüfbar) → E-Mail; alternativ Video-Call (30 Min) oder Vor-Ort (1 Std.) | Nein (E-Mail/Termin) | 8 Verkaufs- + 2 Bewertungs- + 180 Kauf-/Lifestyle-Ratgeber | 70 Verkaufs- + 70 Bewertungs-LPs (Stuttgart mit Team/Referenzen) | keine | DISQ-Testsieger, ProvenExpert 8.282, Maklercheck-PDF, Referenzen, WhatsApp |
| ImmoScout24 | Objektart → separate IBW-Seite (Adresse, Wohnfläche, Baujahr, Ausstattung lt. Selbstbeschreibung; Felder nicht prüfbar) → PDF; Maklerempfehlung: Immobilie beschreiben → 3 Makler per E-Mail → auswählen | Nein, „Ergebnis in 3 Minuten“ als PDF per E-Mail | 1.906 Wissen-Artikel (333 Verkauf) | Preisatlas (401 für Bots), keine Verkaufs-LPs | Provisionsrechner (Bundesland, Preis, Auftragsart), Grundsteuer-Rechner, Budgetrechner | Phasen-Hub, Verkäufer-Typ-Quiz, Muster-Bewertungs-PDF, HowTo/FAQ-Schema, Autorenvita |
| Immowelt (Ratgeber) | Bewertung nicht erreichbar (403); Ratgeber beschreibt: Lage/Größe/Ausstattung → Ergebnis per E-Mail „In 3 Minuten – 100% kostenlos“ | nicht prüfbar | 2.388 Ratgeber-URLs (43 Verkauf, 1.946 News) | 15 „immobilienbewertung-<stadt>“ mit Preistabellen 2017–2024 | zweistufiger Spekulationssteuer-Rechner, Scheidungskosten-/Grunderwerbsteuer-Links | Redaktionskodex, Autorenprofile, Feedbackquote, Käufergruppen-Tabellen |
| Finanztip | kein Funnel (Verbraucher-Ratgeber) | – | 1.134 Ratgeber, ≈ 108 immobiliennah | keine | 23 Finanzrechner (Budget, Hypothek, Tilgung), Scheidungskostenrechner; kein Spekulationssteuer-Rechner | „So gehst Du vor“, Quellen/Urteile, transparente Makler-Auswahlkriterien, Affiliate-Kennzeichnung |

### 9.6 Ratgeber-Themen nach Häufigkeit (Anzahl Anbieter mit eigener Seite, von 8; Homeday, immoverkauf24, Von Poll, E&V, Dahler, ImmoScout24, Immowelt, Finanztip)
1. Maklerprovision / Kosten des Verkaufs – 8/8 (Finanztip innerhalb „Haus verkaufen“)
2. Spekulationssteuer / Steuern beim Verkauf – 7/8 (fehlt bei Dahler; Von Poll nur als FAQ)
3. Geerbte Immobilie verkaufen / Erbschaft – 8/8 (Dahler nur knapp)
4. Wohnung verkaufen (eigene Seite) – 6/8 (Homeday, immoverkauf24, E&V, Dahler, ImmoScout24; Finanztip nur Kauf; Von Poll/Immowelt nicht)
5. Vermietete Wohnung/Immobilie verkaufen – 5/8 (Homeday, immoverkauf24, ImmoScout24, Immowelt, Finanztip-Abschnitt; E&V nur FAQ)
6. Scheidung / Zugewinn – 5/8 (Homeday, immoverkauf24, Von Poll, ImmoScout24, Finanztip-Scheidungskosten)
7. Mit oder ohne Makler / Makler finden – 7/8
8. Unterlagen / Checkliste Verkauf – 7/8
9. Immobilienbewertung (Verfahren, online vs. Gutachter) – 8/8
10. Energieausweis – 6/8
11. Notartermin / Kaufvertrag – 6/8
12. Teilungserklärung / WEG / Eigentümergemeinschaft – 5/8 (immoverkauf24, Von Poll, Homeday, ImmoScout24, Finanztip)
13. Verkaufen oder vermieten – 4/8
14. Immobilie im Alter / Rentenbasis / Leibrente / Teilverkauf – 5/8
15. Haus innerhalb der Familie / an Kinder verkaufen / Schenkung – 6/8
16. Grundschuld / laufender Kredit / Vorfälligkeitsentschädigung – 6/8
17. Verkaufsdauer / Zeitpunkt / Marktlage 2026 – 6/8
18. Vorkaufsrecht (Mieter) – 4/8
19. Grundbuchauszug / Grundbuch – 5/8
20. Diskreter Verkauf / Bieterverfahren / Homestaging – 4/8
21. Verwalterzustimmung / Hausgeld / Instandhaltungsrücklage beim Verkauf – 3/8 (immoverkauf24, Homeday, ImmoScout24) – hier ist die geringste Konkurrenz bei hoher Relevanz für Wohnungsverkäufer.
22. Lokale Preisseiten / Bewertung in <Ort> – 6/8.

---

## 10. Vorschlag: 15–25 Ratgeber-/Info-Seiten für einen Wohnungs-Spezialisten in Heimsheim/Leonberg

Prinzipien aus der Recherche: (a) nur Themen, die bei ≥ 5 Anbietern vorkommen oder die Wohnungs-Nische bedienen, (b) jede Seite mit „Das Wichtigste in Kürze“ + „So gehen Sie vor“ + 4–6 FAQ (FAQPage-Schema) + Autorbox (Linus Rössler, Foto, Qualifikation, § 34c-Aufsicht) + Datum + 1 situativer CTA, (c) 1.200–2.000 Wörter, keine Lexika, keine News, keine Lifestyle-Themen, (d) jede Zahl mit Quelle (Gutachterausschuss Leonberg/Enzkreis/Pforzheim, BORIS-BW, § 23 EStG, § 577 BGB …), (e) Ortsseiten nur mit echter lokaler Substanz.

A. Kern-Funnel-Seiten (3)
1. „Wohnung verkaufen in Leonberg, Heimsheim & Umgebung“ – Hauptverkaufsseite (Vorbild: E&V-Struktur 5 Vorteile → 8 Schritte → FAQ mit Lebenssituationen; Dahler-Prozess „Reporting/Übergabe“; immoverkauf24-Kostentabelle). Enthält Vergleich „privat vs. mit Rössler“ als echte Tabelle (fehlt bei allen Großen auf der Verkaufen-Seite).
2. „Wohnungsbewertung – kostenlos, in 3 Minuten, mit Ergebnis sofort“ – Funnel nach E&V-Blueprint (Objekttyp fest „Wohnung“, Adresse, Etage, Wohnfläche mit Definition, Zimmer, Baujahr, Balkon/Stellplatz, Zustand 3 Stufen, Nutzung selbst/vermietet/leer, Verkaufszeitpunkt, dann Name/E-Mail, Telefon optional + „Wann erreichbar?“); Dreischritt „Beschreiben → Spanne sofort → persönliches Gespräch“; Muster-Ergebnis als PDF-Vorschau (ImmoScout24-Idee); FAQ „Geht das anonym?“ ehrlich beantworten.
3. „Direktankauf vs. Verkauf am Markt – wann lohnt sich was?“ – bestehende Direktankauf-Seite als Entscheidungshilfe ausbauen (kein Großer hat das; Abgrenzung zu Teilverkauf/Leibrente aus Homeday/ImmoScout24).

B. Lebenssituationen (6) – höchste Nachfrage bei allen Anbietern, situativer CTA
4. „Geerbte Wohnung verkaufen: Erbschein, Erbengemeinschaft, Steuern“ (Vorbild immoverkauf24 „Wohnung erben“ + Von Poll-FAQ „Muss ich das Erbe annehmen …?“ + Finanztip-Freibeträge; Besonderheit: WEG-Unterlagen, Hausgeld-Rückstände, Verwalterzustimmung).
5. „Wohnung bei Scheidung oder Trennung: verkaufen, auszahlen oder behalten?“ (Homeday/immoverkauf24-Optionen, Von Poll-Zugewinn-Beispiel, Finanztip-Hinweis auf neue Spekulationsfrist beim Verkauf der Hälfte).
6. „Vermietete Wohnung verkaufen: Abschlag, Käufergruppen, Mieterrechte“ (Immowelt-Käufergruppen-Tabelle, ImmoScout24-Sperrfristen, § 577 BGB, Kaufpreisfaktor für Leonberg/Pforzheim).
7. „Wohnung im Alter verkaufen: Verkleinern, Pflege, wohnen bleiben“ (Homeday „Immobilie im Alter“, ImmoScout24 „Pflegekosten“, Rentenbasis/Teilverkauf als Warnung).
8. „Wohnung verkaufen trotz laufendem Kredit: Vorfälligkeitsentschädigung & Grundschuld“ (6/8 Anbieter).
9. „Wohnung innerhalb der Familie verkaufen oder verschenken“ (ImmoScout24 „meistgelesen“, Finanztip „Haus überschreiben“).

C. Recht & Steuern (4)
10. „Spekulationssteuer beim Wohnungsverkauf – Frist prüfen, Höhe berechnen“ mit zweistufigem Rechner (Immowelt-Logik), korrekte Freigrenze 1.000 €, Beispiele Leonberg.
11. „Maklerprovision in Baden-Württemberg: 3,57 % + 3,57 % – was Sie wirklich zahlen“ mit Provisions-/Nettoerlös-Rechner (ImmoScout24 + Homeday), eigene Konditionen offen nennen (Finanztip-Kriterium „vorgelegter Maklervertrag“).
12. „Kosten beim Wohnungsverkauf: Energieausweis, Notar, Grundschuldlöschung, Verwalter“ (Homeday-Nebenkosten-Seite als Vorbild, Tabelle wer-zahlt-was).
13. „Unterlagen für den Wohnungsverkauf – Checkliste (PDF)“ mit Teilungserklärung, Aufteilungsplan, Wirtschaftsplan, Hausgeldabrechnungen, Protokolle der letzten 3 Eigentümerversammlungen, Beschlusssammlung, Energieausweis (Lead-Magnet; bei allen Anbietern vorhanden, aber selten wohnungsspezifisch).

D. WEG-/Wohnungs-Spezialwissen (4) – geringste Konkurrenz, höchste Passung
14. „Verwalterzustimmung beim Wohnungsverkauf: Ablauf, Dauer, Kosten“ (nur Homeday/immoverkauf24 haben Seiten).
15. „Hausgeld, Instandhaltungsrücklage und Sonderumlage beim Verkauf – wer zahlt was?“ (ImmoScout24 „Instandhaltungsrücklage“, Finanztip „Hausgeld“).
16. „Teilungserklärung & Protokolle lesen: Was Käufer prüfen – und was Sie vorher klären sollten“ (E&V-Hamburg-Titel als Vorbild).
17. „Vermietet oder leer verkaufen? Eigenbedarf, Vorkaufsrecht, Timing“ (immoverkauf24-Pro/Contra-Tabelle, ImmoScout24-Zahlen).

E. Prozess (3)
18. „Ablauf Wohnungsverkauf in 8 Schritten – von der Bewertung bis zur Übergabe“ (ImmoScout24-Phasen, Immowelt-Notartermin, Übergabeprotokoll als Download).
19. „Mit Makler oder privat verkaufen? Selbsttest in 8 Fragen“ (ImmoScout24-Selbsttest, Dahler-Fragenliste, Finanztip-Maklerkriterien – ehrlich formuliert).
20. „Angebotspreis festlegen: Warum ‚zu hoch‘ Geld kostet“ (Dahler-Risikoabschnitt, E&V-Preisstrategie 105–110 %).

F. Ortsseiten (3–5) – nur mit Substanz nach Dahler-Stuttgart-Vorbild
21. „Wohnung verkaufen in Leonberg“ (Stadtteile Eltingen, Ramtel, Silberberg, Warmbronn, Gebersheim, Höfingen; Preise mit Quelle/Stichtag wie immoverkauf24/Immowelt-Tabellen; eigene Referenzen; FAQ).
22. „Wohnung verkaufen in Heimsheim“ (Enzkreis; Pendlerlage A8; typische Wohnanlagen der 1970er–2000er).
23. „Wohnung verkaufen in Ditzingen“ und 24. „… in Renningen“ (Kreis Ludwigsburg/Böblingen; S-Bahn-Lagen).
25. „Wohnung verkaufen in Pforzheim“ (größter Markt; Stadtteile; Kapitalanleger-Nachfrage).
Diese Ortsseiten erst veröffentlichen, wenn pro Ort mindestens: 3–5 geprüfte Marktzahlen, 1–3 Referenzen (anonymisiert möglich), ein lokaler Absatz mit WEG-Besonderheiten und ein lokales FAQ vorhanden sind – sonst wirken sie wie die Von-Poll-Templates.

Begründung in einem Satz: Die Großen gewinnen über Masse (300–2.000 Artikel) und programmatische Ortsseiten; ein Einzelmakler gewinnt über die sechs bis acht WEG-/Wohnungs-Themen, die bei den Großen nur oberflächlich oder gar nicht existieren (Verwalterzustimmung, Hausgeld/Rücklage, Teilungserklärung, vermietet vs. leer), über echte lokale Substanz auf wenigen Ortsseiten und über die Kombination aus Sofort-Ergebnis im Funnel (Homeday/Von Poll) mit persönlicher Erreichbarkeit (Dahler: Video-Termin, WhatsApp).

### 10.1 Nicht nachbauen (Skalierungsfallen / AI-Slop-Gefahr)
- Glossare mit 100+ Begriffen, News-Feeds, Lifestyle-Artikel, Prominenten-Immobilien (Dahler), „Herbstlaub“ (Von Poll).
- Programmatische Preisseiten ohne Datenlizenz; Orts-Templates mit Platzhalter-Ortsnamen; Städte-Seiten mit Daten von 2022.
- Mehrere widersprüchliche Zahlen (E&V „49 Jahre“ vs. „35 Jahre“; Dahler 80/90/100 Standorte).
- Sticky-CTAs und Exit-Popups auf jeder Seite; Telefon-Pflicht im Funnel.
- Steuerartikel ohne Datum/Quelle (Freigrenze-Fehler bei E&V, ImmoScout24 2023).

---

## 11. Anhang A – Geprüfte URLs (Status, Datei)
Alle Rohseiten liegen unter `/tmp/claude-0/-home-user/e7214d44-0169-5a35-af11-cf04a7507b2a/scratchpad/dl-national/pages/`.


| Datei | Title (gekürzt) | Canonical/URL |
|---|---|---|
| da_bestellerprinzip.html | Das Bestellerprinzip | https://www.dahlercompany.com/de/immobilie-kaufen/ratgeber/das-bestellerprinzip |
| da_bew_stuttgart.html | Immobilienbewertung in Stuttgart / DAHLER Stuttgart | https://www.dahlercompany.com/de/immobilienbewertung/stuttgart |
| da_bewertung.html | Immobilienbewertung mit DAHLER | https://www.dahlercompany.com/de/immobilienbewertung |
| da_erbe.html | Immobilie geerbt - Was gibt es zu beachten? | https://www.dahlercompany.com/de/immobilie-kaufen/ratgeber/ich-habe-eine-immobilie-geerbt-was-muss-ich-tun |
| da_grundschuld.html | Verkauf mit Grundschuld - Vorteile, Nachteile & Kosten | https://www.dahlercompany.com/de/immobilie-verkaufen/ratgeber/ist-ein-verkauf-mit-grundschuld-sinnvoll |
| da_home.html | DAHLER & COMPANY / Ihr Immobilienmakler für Luxusimmobilien | https://www.dahlercompany.com/de |
| da_makler.html | Soll ich einen Makler mit dem Verkauf beauftragen? | https://www.dahlercompany.com/de/immobilie-verkaufen/ratgeber/soll-ich-einen-makler-mit-dem-verkauf-beauftragen |
| da_ratgeber_k.html | Ratgeber Immobilienkauf – Experten-Tipps von DAHLER | https://www.dahlercompany.com/de/immobilie-kaufen/ratgeber |
| da_ratgeber_v.html | Ratgeber - Immobilie verkaufen | https://www.dahlercompany.com/de/immobilie-verkaufen/ratgeber |
| da_stuttgart.html | Immobilie verkaufen in Stuttgart / DAHLER Stuttgart | https://www.dahlercompany.com/de/immobilie-verkaufen/wohnimmobilien/stuttgart |
| da_verkauf.html | Wohnimmobilien verkaufen / Dahler | https://www.dahlercompany.com/de/immobilie-verkaufen/wohnimmobilien |
| da_wohnung.html | Wohnung erfolgreich verkaufen / DAHLER | https://www.dahlercompany.com/de/immobilie-verkaufen/wohnimmobilien/wohnung |
| ev_bewertung.html | Immobilienbewertung Online / Engel & Völkers | https://www.engelvoelkers.com/de/de/verkauf/immobilienbewertung |
| ev_elternhaus.html | Elternhaus verkaufen: Wichtige Tipps und Überlegungen. / E&V | https://www.engelvoelkers.com/de/de/ressourcen/elternhaus-verkaufen |
| ev_erbe.html | Geerbtes Haus verkaufen - Welche Steuern fallen wann an? | https://www.engelvoelkers.com/de/de/ressourcen/geerbtes-haus-verkaufen-steuer |
| ev_hamburg.html | Immobilie in Hamburg erfolgreich verkaufen | https://www.engelvoelkers.com/de/de/hamburg/verkaufen-vermieten/immobilie-verkaufen |
| ev_home.html | Engel & Völkers / Ihr Immobilienmakler an über 1.100 Standorten | https://www.engelvoelkers.com/de/de |
| ev_kosten.html | Hausverkauf-Kosten: Das müssen Sie wissen! | https://www.engelvoelkers.com/de/de/ressourcen/hausverkauf-kosten |
| ev_provision.html | Maklercourtage 2026: Wer zahlt Maklerprovision & Kostenhöhe? | https://www.engelvoelkers.com/de/de/ressourcen/maklerprovision-wie-hoch |
| ev_ressourcen.html | Infos aus der Immobilienwelt / Engel & Völkers | https://www.engelvoelkers.com/de/de/ressourcen |
| ev_seller.html | Expertentipps für Immobilienverkäufer / Engel & Völkers | https://www.engelvoelkers.com/de/de/ressourcen/verkaeufer |
| ev_spek.html | Spekulationssteuer bei Immobilien: Frist, Höhe & Optionen | https://www.engelvoelkers.com/de/de/ressourcen/spekulationssteuer |
| ev_verkauf.html | Immobilie verkaufen / Engel & Völkers | https://www.engelvoelkers.com/de/de/verkauf/immobilie-verkaufen |
| ev_wohnung.html | Wohnung verkaufen - Alle Schritte im Überblick | https://www.engelvoelkers.com/de/de/ressourcen/wohnung-verkaufen |
| ft_bewertung.html | Immobilienbewertung - So bewertest Du Deine Immobilie | https://www.finanztip.de/baufinanzierung/immobilienbewertung/ |
| ft_erbimmo.html | Erbschaftssteuer Immobilien und das eigene Haus | https://www.finanztip.de/erbschaftssteuer/immobilien/ |
| ft_etw.html | Wohnung kaufen - Was musst Du beachten? | https://www.finanztip.de/eigentumswohnung/ |
| ft_hausverkauf.html | Haus verkaufen – Immobilie clever verkaufen | https://www.finanztip.de/haus-verkaufen/ |
| ft_home.html | Finanztip - Deutschlands Finanz-Ratgeber | https://www.finanztip.de/ |
| ft_scheidung.html | Was kostet eine Scheidung? Scheidungskosten berechnen | https://www.finanztip.de/kosten-einer-scheidung/ |
| ft_spek.html | Spekulationssteuer Immobilien & wie Du sie vermeidest | https://www.finanztip.de/spekulationssteuer/ |
| ft_ueberschreiben.html | Schenkung zu Lebzeiten / Haus an Kinder überschreiben | https://www.finanztip.de/haus-ueberschreiben/ |
| hd_alter.html | Immobilie im Alter: Verkaufen oder behalten? | https://www.homeday.de/de/immobilienverkauf/immobilie-im-alter/ |
| hd_bewertung.html | Immobilienbewertung kostenlos – sofort, ohne E-Mail | https://www.homeday.de/de/immobilienbewertung/ |
| hd_erbschaft.html | Erbschaft von Immobilien: Das müssen Sie wissen / Homeday | https://www.homeday.de/de/erbschaft/ |
| hd_home.html | Homeday – Der Immobilienmakler für Ihren Immobilienverkauf | https://www.homeday.de/de/ |
| hd_immowertrechner.html | Immobilienwert ermitteln: Online & kostenlos | https://www.homeday.de/de/immobilienbewertung/immobilienwertrechner/ |
| hd_kontakt.html | Kontakt aufnehmen / Homeday | https://www.homeday.de/de/kontakt-aufnehmen/ |
| hd_kosten.html | Hausverkauf: Kosten für Eigentümer im Überblick | https://www.homeday.de/de/immobilienverkauf/kosten-beim-immobilienverkauf/ |
| hd_maklerprovision.html | Maklerprovision 2026: Jetzt berechnen und aufteilen | https://www.homeday.de/de/homeday-makler/maklerprovision/ |
| hd_nebenkosten.html | Wohnungsverkauf Nebenkosten: Das fällt 2026 an / Homeday | https://www.homeday.de/de/immobilienverkauf/wohnungsverkauf-nebenkosten/ |
| hd_ratgeber_tov.html | Immobilien Ratgeber / Homeday | https://www.homeday.de/de/ratgeber-inhaltsverzeichnis/ |
| hd_rechner.html | Pageserver 404 | https://pageserver-404.instapage.com |
| hd_scheidung.html | Haus bei Scheidung: Was passiert mit der Immobilie? / Homeday | https://www.homeday.de/de/immobilienverkauf/haus-und-scheidung/ |
| hd_steuern.html | Hausverkauf Steuern 2026: Alle Tipps & Infos / Homeday | https://www.homeday.de/de/immobilienverkauf/steuern-beim-immobilienverkauf/ |
| hd_stuttgart.html | Immobilie verkaufen Stuttgart / Homeday-Partnermakler | https://www.homeday.de/de/immobilienverkauf/immobilie-verkaufen-stuttgart/ |
| hd_verkauf.html | Immobilie verkaufen: alle Tipps & Infos für 2026 / Homeday | https://www.homeday.de/de/immobilienverkauf/ |
| hd_vermietet_whg.html | Vermietete Wohnung verkaufen: Rechte & Pflichten / Homeday | https://www.homeday.de/de/immobilienverkauf/vermietete-immobilie/wohnung/ |
| hd_wissen.html | Wissenwertes zum Thema Immobilie für Eigentümer / Homeday | https://www.homeday.de/de/immobilienwissen/ |
| hd_wohnung.html | Wohnung verkaufen leicht gemacht: Das ist 2026 wichtig / Homeday | https://www.homeday.de/de/immobilienverkauf/wohnung-verkaufen/ |
| hd_wohnungsbewertung.html | Wohnung bewerten in 2 Min. – Gratis, anonym & aktuell | https://www.homeday.de/de/immobilienbewertung/wohnungsbewertung/ |
| hd_zugewinn.html | Zugewinngemeinschaft Haus: Alle Infos für 2026 / Homeday | https://www.homeday.de/de/immobilienverkauf/zugewinngemeinschaft/ |
| is_bewertung.html | Immobilienbewertung: Immobilie kostenlos online bewerten / ImmoScout24 | https://www.immobilienscout24.de/immobilienbewertung/ |
| is_erbe.html | Geerbtes Haus verkaufen: Haus erben & verkaufen - ImmoScout24 | https://www.immobilienscout24.de/wissen/verkaufen/haus-erben-und-verkaufen.html |
| is_flow.html | Immobilie bewerten beim Marktführer für Immobilien | https://www.immobilienscout24.de/immobilie-bewerten/ |
| is_mitohne.html | Haus verkaufen ohne Makler: Tipps, Vorteile & Nachteile / ImmoScout24 | https://www.immobilienscout24.de/wissen/verkaufen/mit-oder-ohne-makler-verkaufen.html |
| is_preise_leonberg.html | Ich bin kein Roboter - ImmobilienScout24 | - |
| is_provision.html | Maklerprovision 2026: Höhe, Berechnung & wer zahlt / ImmoScout24 | https://www.immobilienscout24.de/wissen/verkaufen/maklerprovision.html |
| is_scheidung.html | Auszahlung bei Hausverkauf nach Scheidung - ImmobilienScout24 | https://www.immobilienscout24.de/wissen/verkaufen/hausverkauf-nach-scheidung-auszahlung.html |
| is_spek.html | Hausverkauf Steuer berechnen: Wie wird die Steuer berechnet? | https://www.immobilienscout24.de/wissen/verkaufen/spekulationssteuer-berechnung.html |
| is_verkaufen.html | Maklerempfehlung: Maklervergleich von ImmoScout24 | https://www.immobilienscout24.de/immobilienmakler/ |
| is_vermietet.html | Vermietete Wohnung verkaufen / ImmoScout24 | https://www.immobilienscout24.de/wissen/verkaufen/vermietete-wohnung-verkaufen.html |
| is_whg.html | Wohnung verkaufen in 2026: Ablauf, Kosten & Checkliste - ImmoScout24 | https://www.immobilienscout24.de/wissen/verkaufen/eigentumswohnung-verkaufen.html |
| is_wissen.html | Ratgeber Immobilienverkauf » Tipps für Eigentümer - ImmoScout24 | https://www.immobilienscout24.de/wissen/verkaufen.html |
| is_wissen_home.html | Immobilien Ratgeber » Antworten auf Ihre Fragen / ImmoScout24 | https://www.immobilienscout24.de/wissen.html |
| is_wohnung_verkaufen.html | Die gewünschte Seite konnte leider nicht gefunden werden. | https://www.immobilienscout24.de/utils/error/404.html |
| iv_bewertung.html | Immobilienbewertung: Immobilie kostenlos online bewerten | https://www.immoverkauf24.de/immobilienbewertung/ |
| iv_courtage.html | Innenprovision: Höhe der Verkäuferprovision | https://www.immoverkauf24.de/immobilienverkauf/immobilienverkauf-a-z/verkaeufercourtage/ |
| iv_erbschaft.html | Erbe: Alle Infos zum Erben & Vererben von Immobilien | https://www.immoverkauf24.de/immobilienverkauf/erbschaft/ |
| iv_flow.html | RLE Conversion Flow Test | - |
| iv_home.html | Hausverkauf Makler Immobilienbewertung / immoverkauf24 | https://www.immoverkauf24.de/ |
| iv_kosten.html | Hausverkauf Kosten: Welche Kosten zahlen Verkäufer? | https://www.immoverkauf24.de/immobilienverkauf/hausverkauf/hausverkauf-kosten/ |
| iv_leonberg.html | Immobilienpreise in Leonberg: Quadratmeterpreise Stand 2026 / immoverkauf24 | https://www.immoverkauf24.de/immobilienpreise/ |
| iv_scheidung.html | Haus bei Scheidung: Was passiert mit dem gemeinsamen Haus? | https://www.immoverkauf24.de/immobilienverkauf/scheidung-haus/ |
| iv_spekulation.html | Spekulationssteuer bei Immobilien: Wann & wie berechnen? | https://www.immoverkauf24.de/immobilienverkauf/immobilienverkauf-a-z/spekulationssteuer/ |
| iv_stuttgart.html | Immobilie verkaufen Stuttgart: So gelingt der Hausverkauf | https://www.immoverkauf24.de/immobilienverkauf/hausverkauf/hausverkauf-staedte/haus-verkaufen-stuttgart/ |
| iv_verkauf.html | Immobilie verkaufen: So wird der Immobilienverkauf zum Erfolg | https://www.immoverkauf24.de/immobilienverkauf/ |
| iv_vermietet.html | Vermietetes Haus verkaufen: Regeln & Tipps für Vermieter | https://www.immoverkauf24.de/immobilienverkauf/verkauf-kapitalanlage/vermietetes-haus/ |
| iv_whgbewertung.html | Wohnungsbewertung: Kostenlos & online Wohnungswert ermitteln / immoverkauf24 | https://www.immoverkauf24.de/immobilienbewertung/wohnungsbewertung/ |
| iv_wohnung.html | Wohnung verkaufen: Ablauf, Kosten & Checkliste für 2026 | https://www.immoverkauf24.de/immobilienverkauf/wohnungsverkauf/ |
| iv_wohnung_erben.html | Wohnung erben: Infos & Tipps zu Kosten, Steuer & Verkauf | https://www.immoverkauf24.de/immobilienverkauf/erbschaft/wohnung-erben/ |
| iw_bewertung.html | immowelt.de | - |
| iw_home.html | immowelt.de | - |
| iw_ratgeber.html | Immobilien-Ratgeber: Tipps und Wissen von immowelt | https://www.immowelt.de/ratgeber/ |
| iw_ratgeber_v.html | Wissen rund um das Verkaufen von Immobilien | https://www.immowelt.de/ratgeber/verkaufen |
| iw_sitemap_ratgeber.html | - | - |
| iw_verkaufen.html | immowelt.de | - |
| sp_bewertung.html | - | https://www.sparkasse.de/_404.html |
| sp_immo.html | - | https://www.sparkasse.de/_404.html |
| sp_ratgeber.html | - | https://www.sparkasse.de/_404.html |
| sp_verkaufen.html | - | https://www.sparkasse.de/_404.html |
| vp_bewertung.html | Immobilienbewertung: Lassen Sie Ihre Immobilie bewerten | https://www.von-poll.com/de/immobilienbewertung |
| vp_checkliste.html | Checkliste Hausverkauf: In 10 Schritten zum Erfolg | https://www.von-poll.com/de/immobilien-ratgeber/hausverkauf-checkliste |
| vp_erbe.html | Geerbtes Haus verkaufen / Ratgeber & Bewertung | https://www.von-poll.com/de/immobilien-ratgeber/geerbtes-haus-verkaufen |
| vp_erbengemeinschaft.html | Erbengemeinschaft auflösen mit Geschwistern – So geht’s | https://www.von-poll.com/de/immobilien-ratgeber/erbengemeinschaft-aufloesen |
| vp_flow.html | Immobilie bewerten lassen - VON POLL IMMOBILIEN | https://home.von-poll.com/de-de/immobilie-bewerten |
| vp_home.html | VON POLL IMMOBILIEN – Ihr Immobilienmakler in den besten Lagen | https://www.von-poll.com/de |
| vp_leonberg.html | Immobilienbewertung Leonberg VON POLL IMMOBILIEN | https://www.von-poll.com/de/immobilienbewertung-leonberg |
| vp_maklerprovision.html | 404 - VON POLL IMMOBILIEN | https://www.von-poll.com/de/maklerprovision |
| vp_provision.html | Maklerprovision: Wie hoch? Wer zahlt? | https://www.von-poll.com/de/immobilien-ratgeber/maklerprovision-wie-hoch-wer-zahlt |
| vp_ratgeber.html | Immobilien Ratgeber - VON POLL IMMOBILIEN | https://www.von-poll.com/de/immobilien-ratgeber |
| vp_stuttgart.html | Immobilienbewertung Stuttgart VON POLL IMMOBILIEN | https://www.von-poll.com/de/immobilienbewertung-stuttgart |
| vp_verkauf.html | Immobilie verkaufen - VON POLL IMMOBILIEN | https://www.von-poll.com/de/immobilie-verkaufen |
| vp_zugewinn.html | Zugewinngemeinschaft: Das sollten Paare wissen | https://www.von-poll.com/de/immobilien-ratgeber/zugewinngemeinschaft-gueterstand-immobilienverkauf |

Nicht erreichbar / ausgeschlossen: https://www.mcmakler.de/ (403), https://www.postbank-immobilien.de/ (CONNECT 502), https://www.sparkasse.de/immobilien.html u. a. (404), https://www.immowelt.de/ (403), https://www.immowelt.de/verkaufen (403), https://www.immowelt.de/immobilienbewertung (403), https://www.immobilienscout24.de/immobilienpreise/baden-wuerttemberg/leonberg (401 Bot-Check), https://immobilien.homeday.de/immobilienwertrechner/stuttgart/ (404 Instapage), https://www.von-poll.com/de/maklerprovision (404).

Sitemap-Dateien: homeday.de_sitemap.xml, homeday_website.xml, homeday_instapage.xml, immoverkauf24.de_sitemap.xml (iv24_urls.txt), von-poll.com_sitemap.xml, vonpoll_DE.xml (vonpoll_urls.txt), ev_de.xml (ev_urls.txt), dahler_1-3.xml (dahler_urls.txt), is24_wissen.xml (is24_urls.txt), iw_sm_1-3.xml (iw_urls.txt), finanztip_guides.xml (finanztip_urls.txt), finanztip_calc.xml, robots.txt aller Domains.

## 12. Anhang B – Vollständige Ratgeber-URL-Listen aus den Sitemaps (Belegmaterial)

### B.1 Homeday – /de/immobilienverkauf/ (Verkauf) (71 URLs)
- /de/immobilienverkauf/
- /de/immobilienverkauf/teilungsversteigerung/
- /de/immobilienverkauf/wohnrecht/
- /de/immobilienverkauf/kosten-beim-immobilienverkauf/
- /de/immobilienverkauf/immobilie-im-alter/
- /de/immobilienverkauf/immobilie-verkaufen-berlin/
- /de/immobilienverkauf/haus-eltern-verkaufen-pflegefall/
- /de/immobilienverkauf/steuern-beim-immobilienverkauf/
- /de/immobilienverkauf/zugewinngemeinschaft/
- /de/immobilienverkauf/haus-verkaufen/haus-verkaufen-hamburg/
- /de/immobilienverkauf/teilverkauf-haus/
- /de/immobilienverkauf/zeitpunkt-immobilienverkauf/
- /de/immobilienverkauf/wohnung-verkaufen/
- /de/immobilienverkauf/notarkosten-wohnungsverkauf/
- /de/immobilienverkauf/haus-verkaufen/
- /de/immobilienverkauf/wohnungsverkauf-nebenkosten/
- /de/immobilienverkauf/vermietete-immobilie/haus/
- /de/immobilienverkauf/mehrfamilienhaus-verkaufen/
- /de/immobilienverkauf/immobilie-verkaufen-duesseldorf/
- /de/immobilienverkauf/grundstuecksverkauf/
- /de/immobilienverkauf/gewerbeimmobilie-verkaufen/
- /de/immobilienverkauf/haus-verkaufen-ohne-makler/
- /de/immobilienverkauf/renovieren/
- /de/immobilienverkauf/immobilie-verkaufen-hannover/
- /de/immobilienverkauf/immobilie-verkaufen-augsburg/
- /de/immobilienverkauf/immobilie-verkaufen-bonn/
- /de/immobilienverkauf/immobilie-verkaufen-mannheim/
- /de/immobilienverkauf/immobilie-verkaufen-muenster/
- /de/immobilienverkauf/immobilie-verkaufen-karlsruhe/
- /de/immobilienverkauf/immobilie-verkaufen-hamburg/
- /de/immobilienverkauf/immobilie-verkaufen-frankfurt-am-main/
- /de/immobilienverkauf/immobilie-verkaufen-dortmund/
- /de/immobilienverkauf/immobilie-verkaufen-stuttgart/
- /de/immobilienverkauf/immobilie-verkaufen-essen/
- /de/immobilienverkauf/immobilie-verkaufen-dresden/
- /de/immobilienverkauf/immobilie-verkaufen-muenchen/
- /de/immobilienverkauf/immobilie-verkaufen-nuernberg/
- /de/immobilienverkauf/immobilie-verkaufen-leipzig/
- /de/immobilienverkauf/immobilie-verkaufen-bielefeld/
- /de/immobilienverkauf/immobilie-verkaufen-koeln/
- /de/immobilienverkauf/immobilie-verkaufen-wuppertal/
- /de/immobilienverkauf/verkaufspreis/
- /de/immobilienverkauf/vermietete-immobilie/
- /de/immobilienverkauf/vermietete-immobilie/wohnung/
- /de/immobilienverkauf/fehler-beim-immobilienverkauf/
- /de/immobilienverkauf/flurkarte/
- /de/immobilienverkauf/kaufvertrag/
- /de/immobilienverkauf/bruchteilseigentum/
- /de/immobilienverkauf/trennungsjahr/
- /de/immobilienverkauf/bieterverfahren/
- /de/immobilienverkauf/rechtliche-risiken/
- /de/immobilienverkauf/wohnungsbesichtigung/
- /de/immobilienverkauf/notaranderkonto/
- /de/immobilienverkauf/vorvertrag/
- /de/immobilienverkauf/grundbuchauszug/
- /de/immobilienverkauf/bruchteilsgemeinschaft/
- /de/immobilienverkauf/maengelhaftung/
- /de/immobilienverkauf/energieausweis-pflicht/
- /de/immobilienverkauf/verweildauer/
- /de/immobilienverkauf/pflegeimmobilie-verkaufen/
- /de/immobilienverkauf/immobilientausch/
- /de/immobilienverkauf/haushaltsaufloesung/
- /de/immobilienverkauf/haus-und-scheidung/
- /de/immobilienverkauf/expose-immobilien/
- /de/immobilienverkauf/hausbesichtigung/
- /de/immobilienverkauf/verwalterzustimmung/
- /de/immobilienverkauf/zwischenfinanzierung/
- /de/immobilienverkauf/spekulationssteuer/
- /de/immobilienverkauf/unbedenklichkeitsbescheinigung/
- /de/immobilienverkauf/vorfaelligkeitsentschaedigung/
- /de/immobilienverkauf/haus-schnell-verkaufen/

### B.2 Homeday – /de/immobilienbewertung/ (26 URLs)
- /de/immobilienbewertung/marktwert-immobilie/
- /de/immobilienbewertung/
- /de/immobilienbewertung/immobiliengutachter/
- /de/immobilienbewertung/hauswertrechner/
- /de/immobilienbewertung/vervielfaeltiger-kaufpreisfaktor/
- /de/immobilienbewertung/grundstueckspreise/
- /de/immobilienbewertung/liegenschaftszins/
- /de/immobilienbewertung/grundstuecksbewertung/
- /de/immobilienbewertung/bedeutung-immobilienpreis/
- /de/immobilienbewertung/marktanpassungsfaktor/
- /de/immobilienbewertung/sachwertverfahren/
- /de/immobilienbewertung/immobilienwertgutachten/
- /de/immobilienbewertung/immowertv/
- /de/immobilienbewertung/ertragswertverfahren/
- /de/immobilienbewertung/vergleichswertverfahren/
- /de/immobilienbewertung/reallast/
- /de/immobilienbewertung/bodenrichtwert/
- /de/immobilienbewertung/zeitwert-berechnen/
- /de/immobilienbewertung/wohnungsbewertung/
- /de/immobilienbewertung/immobilienwertrechner/
- /de/immobilienbewertung/verkehrswert-immobilie/
- /de/immobilienbewertung/immobilienbewertung-programm-kostenlos/
- /de/immobilienbewertung/einheitswert/
- /de/immobilienbewertung/objektanalyse/
- /de/immobilienbewertung/gemeiner-wert/
- /de/immobilienbewertung/baulastenverzeichnis/

### B.3 Homeday – /de/erbschaft/ und /de/immobilienvermietung/ (37 URLs)
- /de/immobilienvermietung/mieter-kuendigen/
- /de/immobilienvermietung/mietpreis-berechnen/
- /de/immobilienvermietung/rechte-und-pflichten-vermieter/
- /de/immobilienvermietung/kappungsgrenze/
- /de/immobilienvermietung/wohnung-vermieten/
- /de/immobilienvermietung/mieteinnahmen-versteuern/
- /de/immobilienvermietung/modernisierung/
- /de/immobilienvermietung/vermieten-oder-verkaufen/
- /de/immobilienvermietung/
- /de/immobilienvermietung/modernisierungsumlage/
- /de/erbschaft/enterben/
- /de/erbschaft/erbauseinandersetzung/
- /de/erbschaft/erbengemeinschaft/
- /de/erbschaft/haus-vererben/
- /de/erbschaft/gesetzliche-erbfolge/
- /de/erbschaft/
- /de/erbschaft/nachlassverzeichnis/
- /de/immobilienvermietung/mietkaution/
- /de/immobilienvermietung/vermieterbescheinigung/
- /de/erbschaft/erbe-ausschlagen/
- /de/immobilienvermietung/gewerbliche-mietkaution/
- /de/immobilienvermietung/haus-vermieten/
- /de/erbschaft/erbbaurecht-und-erbpacht/
- /de/immobilienvermietung/wohnungsbewerbung/
- /de/immobilienvermietung/betriebskostenabrechnung/
- /de/erbschaft/testament-fuer-immobilieneigentuemer/
- /de/immobilienvermietung/nebenkostenabrechnung/
- /de/erbschaft/erbschein/
- /de/immobilienvermietung/tod-des-mieters/
- /de/erbschaft/schenkung-haus/
- /de/erbschaft/schenkungsvertrag/
- /de/erbschaft/erbschaftssteuer/
- /de/erbschaft/erbteil-verkaufen/
- /de/erbschaft/abschichtung-erbgemeinschaft/
- /de/immobilienvermietung/nachmieter-gesucht/
- /de/immobilienvermietung/mietminderung/
- /de/immobilienvermietung/mietnomaden/

### B.4 Homeday – /de/immobilienwissen/ und /de/checklisten/ (59 URLs)
- /de/immobilienwissen/zweitwohnsitz/
- /de/immobilienwissen/haus-ueberschreiben-kinder/
- /de/immobilienwissen/steuern-sparen/
- /de/immobilienwissen/enteignung/
- /de/immobilienwissen/vorkaufsrecht/
- /de/immobilienwissen/nachbarschaftsrecht/
- /de/immobilienwissen/solaranlage/
- /de/immobilienwissen/instandhaltungskosten-haus/
- /de/immobilienwissen/denkmalschutz/
- /de/immobilienwissen/vorsorge-im-alter/
- /de/immobilienwissen/smart-home/
- /de/immobilienwissen/wohngebaeudeversicherung/
- /de/immobilienwissen/barrierefreiheit/
- /de/immobilienwissen/hausbau/
- /de/immobilienwissen/heizung-kaufen/
- /de/immobilienwissen/baugenehmigungen/
- /de/immobilienwissen/geld-anlegen/
- /de/immobilienwissen/eigentuemerversammlung/
- /de/immobilienwissen/wohnungseigentumsgesetz/
- /de/immobilienwissen/niessbrauchrecht/
- /de/immobilienwissen/zwangsraeumungen/
- /de/immobilienwissen/abgeschlossenheitsbescheinigung/
- /de/immobilienwissen/eigentum-verpflichtet/
- /de/immobilienwissen/leibrente/
- /de/immobilienwissen/was-macht-ein-notar/
- /de/immobilienwissen/leitungsrecht/
- /de/immobilienwissen/umzugstipps/
- /de/immobilienwissen/bewirtschaftungskosten/
- /de/immobilienwissen/aufzugskosten/
- /de/immobilienwissen/hausgeld/
- /de/immobilienwissen/hauskauf-energieausweis/
- /de/immobilienwissen/umzugskostenpauschale/
- /de/immobilienwissen/nutzflaeche/
- /de/immobilienwissen/instandhaltungsruecklage/
- /de/immobilienwissen/pachtvertrag-grundstueck/
- /de/immobilienwissen/umkehrhypothek/
- /de/immobilienwissen/generalvollmacht/
- /de/immobilienwissen/grundflaechenzahl/
- /de/immobilienwissen/gueterstand/
- /de/checklisten/
- /de/immobilienwissen/grundbesitzabgaben/
- /de/immobilienwissen/teileigentum/
- /de/immobilienwissen/Grundbuch/
- /de/immobilienwissen/heizkostenrechner/
- /de/immobilienwissen/grundsteuermessbetrag/
- /de/immobilienwissen/ausbauhaus/
- /de/immobilienwissen/hausverwaltung/
- /de/immobilienwissen/haus-abriss-kosten/
- /de/immobilienwissen/nettogrundflaeche/
- /de/immobilienwissen/sturmschaeden/
- /de/immobilienwissen/wohnungssuche-fuer-studierende/
- /de/immobilienwissen/
- /de/immobilienwissen/umbaumassnahmen/
- /de/checklisten/makler.pdf
- /de/checklisten/checkliste-hauskauf.pdf
- /de/checklisten/unterlagen-wohnungsverkauf.pdf
- /de/checklisten/hausverkauf-checkliste.pdf
- /de/checklisten/unterlagen-hausverkauf.pdf
- /de/checklisten/immobilienbesichtigung.pdf

### B.5 immoverkauf24 – /immobilienverkauf/ (216) (216 URLs)
- /immobilienverkauf/hausverkauf/hausverkauf-steuer/
- /immobilienverkauf/hausverkauf/ratgeber-hausverkauf-steuer/
- /immobilienverkauf/hausverkauf/hausverkauf-makler/
- /immobilienverkauf/hausverkauf/hausverkauf-privat/
- /immobilienverkauf/hausverkauf/hausverkauf-vertrag/
- /immobilienverkauf/hausverkauf/hausverkauf-kosten/
- /immobilienverkauf/hausverkauf/hausverkauf-checkliste/
- /immobilienverkauf/hausverkauf/hausverkauf-staedte/
- /immobilienverkauf/hausverkauf/hausverkauf-staedte/haus-verkaufen-bonn/
- /immobilienverkauf/hausverkauf/hausverkauf-staedte/haus-verkaufen-dortmund/
- /immobilienverkauf/hausverkauf/hausverkauf-staedte/haus-verkaufen-freiburg/
- /immobilienverkauf/hausverkauf/hausverkauf-staedte/haus-verkaufen-bremen/
- /immobilienverkauf/hausverkauf/hausverkauf-staedte/haus-verkaufen-stuttgart/
- /immobilienverkauf/hausverkauf/hausverkauf-staedte/haus-verkaufen-muenchen/
- /immobilienverkauf/hausverkauf/hausverkauf-staedte/hausverkauf-nuernberg/
- /immobilienverkauf/hausverkauf/hausverkauf-staedte/hausverkauf-koeln/
- /immobilienverkauf/hausverkauf/hausverkauf-staedte/hausverkauf-hannover/
- /immobilienverkauf/hausverkauf/hausverkauf-staedte/haus-verkaufen-darmstadt/
- /immobilienverkauf/hausverkauf/hausverkauf-staedte/hausverkauf-erfurt/
- /immobilienverkauf/hausverkauf/hausverkauf-staedte/haus-verkaufen-duesseldorf/
- /immobilienverkauf/hausverkauf/hausverkauf-staedte/haus-verkaufen-frankfurt/
- /immobilienverkauf/hausverkauf/hausverkauf-staedte/hausverkauf-leipzig/
- /immobilienverkauf/hausverkauf/hausverkauf-staedte/hausverkauf-regensburg/
- /immobilienverkauf/hausverkauf/hausverkauf-staedte/hausverkauf-dresden/
- /immobilienverkauf/hausverkauf/hausverkauf-staedte/hausverkauf-muenster/
- /immobilienverkauf/hausverkauf/hausverkauf-staedte/hausverkauf-lueneburg/
- /immobilienverkauf/hausverkauf/hausverkauf-staedte/hausverkauf-hamburg/
- /immobilienverkauf/hausverkauf/hausverkauf-staedte/hausverkauf-berlin/
- /immobilienverkauf/hausverkauf/vorfaelligkeitsentschaedigung-bei-hausverkauf/
- /immobilienverkauf/hausverkauf/energieausweis-hausverkauf/
- /immobilienverkauf/hausverkauf/hausverkauf-auf-rentenbasis/
- /immobilienverkauf/hausverkauf/hausverkauf-unterlagen/
- /immobilienverkauf/hausverkauf/vollmacht-hausverkauf/
- /immobilienverkauf/hausverkauf/verkaufen-oder-vermieten/
- /immobilienverkauf/hausverkauf/hausverkauf-innerhalb-der-familie/
- /immobilienverkauf/hausverkauf/kaufen-und-verkaufen/
- /immobilienverkauf/hausverkauf/hausanteil-verkaufen
- /immobilienverkauf/hausverkauf/hausverkauf-im-alter/
- /immobilienverkauf/hausverkauf/haus-verkaufen-und-wohnen-bleiben/
- /immobilienverkauf/hausverkauf/hausverkauf-fehler/
- /immobilienverkauf/hausverkauf/haus-mit-grundschuld-verkaufen/
- /immobilienverkauf/hausverkauf/
- /immobilienverkauf/hausverkauf/ratgeber-tipps/
- /immobilienverkauf/wohnungsverkauf/
- /immobilienverkauf/grundstuecksverkauf/
- /immobilienverkauf/verkauf-kapitalanlage/mehrfamilienhaus-verkaufen/
- /immobilienverkauf/verkauf-kapitalanlage/gewerbe-verkaufen/hotel-verkaufen/
- /immobilienverkauf/verkauf-kapitalanlage/gewerbe-verkaufen/restaurant-verkaufen/
- /immobilienverkauf/verkauf-kapitalanlage/gewerbe-verkaufen/halle-verkaufen/
- /immobilienverkauf/verkauf-kapitalanlage/gewerbe-verkaufen/buero-verkaufen/
- /immobilienverkauf/verkauf-kapitalanlage/gewerbe-verkaufen/ladengeschaeft-verkaufen/
- /immobilienverkauf/verkauf-kapitalanlage/gewerbe-verkaufen/supermarkt-verkaufen/
- /immobilienverkauf/verkauf-kapitalanlage/gewerbe-verkaufen/
- /immobilienverkauf/verkauf-kapitalanlage/vermietetes-haus/
- /immobilienverkauf/verkauf-kapitalanlage/pflegeimmobilie-verkaufen/
- /immobilienverkauf/verkauf-kapitalanlage/ferienhaus-verkaufen/
- /immobilienverkauf/verkauf-kapitalanlage/
- /immobilienverkauf/immobilienverkauf-a-z/zwangsvollstreckung/
- /immobilienverkauf/immobilienverkauf-a-z/leibrente/leibrente-berechnen/
- /immobilienverkauf/immobilienverkauf-a-z/leibrente/
- /immobilienverkauf/immobilienverkauf-a-z/teilverkauf/
- /immobilienverkauf/immobilienverkauf-a-z/grundsteuer/
- /immobilienverkauf/immobilienverkauf-a-z/bonitaetspruefung/
- /immobilienverkauf/immobilienverkauf-a-z/bonitaetspruefung/schufa-auskunft-online/
- /immobilienverkauf/immobilienverkauf-a-z/kaufnebenkostenrechner/
- /immobilienverkauf/immobilienverkauf-a-z/notarkostenrechner/
- /immobilienverkauf/immobilienverkauf-a-z/
- /immobilienverkauf/immobilienverkauf-a-z/zwangsversteigerung/
- /immobilienverkauf/immobilienverkauf-a-z/wohngeldabrechnung/
- /immobilienverkauf/immobilienverkauf-a-z/wohnflaechenberechnung/
- /immobilienverkauf/immobilienverkauf-a-z/vorkaufsrecht/
- /immobilienverkauf/immobilienverkauf-a-z/verwalterzustimmung/
- /immobilienverkauf/immobilienverkauf-a-z/versteckter-mangel/
- /immobilienverkauf/immobilienverkauf-a-z/verkaufszeitpunkt/
- /immobilienverkauf/immobilienverkauf-a-z/verkaufsverhandlungen/
- /immobilienverkauf/immobilienverkauf-a-z/verkaufspreis/
- /immobilienverkauf/immobilienverkauf-a-z/verkaeufercourtage/
- /immobilienverkauf/immobilienverkauf-a-z/unbedenklichkeits-bescheinigung/
- /immobilienverkauf/immobilienverkauf-a-z/teilungserklaerung/
- /immobilienverkauf/immobilienverkauf-a-z/sondernutzungsrecht/
- /immobilienverkauf/immobilienverkauf-a-z/sondereigentum/
- /immobilienverkauf/immobilienverkauf-a-z/realteilung/
- /immobilienverkauf/immobilienverkauf-a-z/quadratmeterpreise/
- /immobilienverkauf/immobilienverkauf-a-z/provisionsfrei/
- /immobilienverkauf/immobilienverkauf-a-z/protokoll-eigentuemerversammlung/
- /immobilienverkauf/immobilienverkauf-a-z/notarkosten-und-grundbuchkosten/
- /immobilienverkauf/immobilienverkauf-a-z/notarielle-beurkundung/
- /immobilienverkauf/immobilienverkauf-a-z/notaranderkonto/
- /immobilienverkauf/immobilienverkauf-a-z/niessbrauch/
- /immobilienverkauf/immobilienverkauf-a-z/modernisierungskosten/
- /immobilienverkauf/immobilienverkauf-a-z/loeschungsbewilligung/
- /immobilienverkauf/immobilienverkauf-a-z/lastenfreiheit/
- /immobilienverkauf/immobilienverkauf-a-z/lage-lage-lage/
- /immobilienverkauf/immobilienverkauf-a-z/kreditzinsen/
- /immobilienverkauf/immobilienverkauf-a-z/kaufpreisfaktor/
- /immobilienverkauf/immobilienverkauf-a-z/kaufnebenkosten/
- /immobilienverkauf/immobilienverkauf-a-z/kaeufercourtage/
- /immobilienverkauf/immobilienverkauf-a-z/instandhaltungsruecklage/
- /immobilienverkauf/immobilienverkauf-a-z/instandhaltungskosten/
- /immobilienverkauf/immobilienverkauf-a-z/immobilienportale/
- /immobilienverkauf/immobilienverkauf-a-z/homestaging/
- /immobilienverkauf/immobilienverkauf-a-z/gutachterausschuss/
- /immobilienverkauf/immobilienverkauf-a-z/grundstueckspreise/
- /immobilienverkauf/immobilienverkauf-a-z/grundriss/
- /immobilienverkauf/immobilienverkauf-a-z/grundflaechenzahl/
- /immobilienverkauf/immobilienverkauf-a-z/grunderwerbsteuer/
- /immobilienverkauf/immobilienverkauf-a-z/grundbuch-und-grundbuchauszug/
- /immobilienverkauf/immobilienverkauf-a-z/gewerblicher-grundstueckshandel/
- /immobilienverkauf/immobilienverkauf-a-z/gewaehrleistungsanspruch/
- /immobilienverkauf/immobilienverkauf-a-z/geschossflaechenzahl/
- /immobilienverkauf/immobilienverkauf-a-z/gemeinschaftseigentum/
- /immobilienverkauf/immobilienverkauf-a-z/flurkarte/
- /immobilienverkauf/immobilienverkauf-a-z/einkuenfte-aus-vermietung-und-verpachtung/
- /immobilienverkauf/immobilienverkauf-a-z/einheitswert/
- /immobilienverkauf/immobilienverkauf-a-z/eigentumsuebergang/
- /immobilienverkauf/immobilienverkauf-a-z/bieterverfahren/
- /immobilienverkauf/immobilienverkauf-a-z/besichtigungen/
- /immobilienverkauf/immobilienverkauf-a-z/bebauungsplan/
- /immobilienverkauf/immobilienverkauf-a-z/bauvoranfrage/
- /immobilienverkauf/immobilienverkauf-a-z/aufteilungsplan/
- /immobilienverkauf/immobilienverkauf-a-z/auflassung-und-auflassungsvormerkung/
- /immobilienverkauf/immobilienverkauf-a-z/angebotspreis/
- /immobilienverkauf/immobilienverkauf-a-z/makleralleinauftrag/
- /immobilienverkauf/immobilienverkauf-a-z/abgeschlossenheitsbescheinigung/
- /immobilienverkauf/immobilienverkauf-a-z/expose/
- /immobilienverkauf/immobilienverkauf-a-z/umkehrhypothek/
- /immobilienverkauf/immobilienverkauf-a-z/spekulationssteuer/
- /immobilienverkauf/immobilienverkauf-a-z/uebergabeprotokoll/
- /immobilienverkauf/immobilienverkauf-a-z/wohnungseigentumsgesetz/
- /immobilienverkauf/immobilienverkauf-a-z/hauspreise/
- /immobilienverkauf/immobilienverkauf-a-z/wohnungspreise/
- /immobilienverkauf/immobilienverkauf-a-z/grundsteuer-hebesatz/
- /immobilienverkauf/immobilienverkauf-a-z/immobilienservice/
- /immobilienverkauf/immobilienverkauf-a-z/immobilienagentur/
- /immobilienverkauf/immobilienverkauf-a-z/immobilienvermittler/
- /immobilienverkauf/immobilienverkauf-a-z/immobilientausch/
- /immobilienverkauf/immobilienverkauf-a-z/enteignung/
- /immobilienverkauf/immobilienverkauf-a-z/notar/
- /immobilienverkauf/immobilienverkauf-a-z/nutzflaeche/
- /immobilienverkauf/immobilienverkauf-a-z/hausverwaltung/
- /immobilienverkauf/immobilienverkauf-a-z/flurstueck/
- /immobilienverkauf/immobilienverkauf-a-z/immobilienbuero/
- /immobilienverkauf/immobilienverkauf-a-z/miteigentumsanteil/
- /immobilienverkauf/immobilienverkauf-a-z/privates-veraeusserungsgeschaeft/
- /immobilienverkauf/immobilienverkauf-a-z/hausgeld/
- /immobilienverkauf/immobilienverkauf-a-z/abrisskosten-haus/
- /immobilienverkauf/immobilienverkauf-a-z/grundbucheintrag/
- /immobilienverkauf/immobilienverkauf-a-z/gemarkung/
- /immobilienverkauf/immobilienverkauf-a-z/sonderumlage/
- /immobilienverkauf/immobilienverkauf-a-z/flaechennutzungsplan/
- /immobilienverkauf/immobilienverkauf-a-z/teileigentum/
- /immobilienverkauf/immobilienverkauf-a-z/wirtschaftsplan/
- /immobilienverkauf/immobilienverkauf-a-z/zweitwohnsitz/
- /immobilienverkauf/immobilienverkauf-a-z/baugenehmigung/
- /immobilienverkauf/immobilienverkauf-a-z/kataster/
- /immobilienverkauf/immobilienverkauf-a-z/bruchteilseigentum/
- /immobilienverkauf/immobilienverkauf-a-z/bruchteilsgemeinschaft/
- /immobilienverkauf/immobilienverkauf-a-z/grundbesitzabgaben/
- /immobilienverkauf/immobilienverkauf-a-z/diskrete-vermarktung/
- /immobilienverkauf/immobilienverkauf-a-z/rueckmietverkauf/
- /immobilienverkauf/immobilienverkauf-a-z/immobilienvermarktung/
- /immobilienverkauf/immobilienverkauf-a-z/grundbuchamt/
- /immobilienverkauf/immobilienverkauf-a-z/abschreibung-immobilie/
- /immobilienverkauf/immobilienverkauf-a-z/vorfaelligkeitszinsen/
- /immobilienverkauf/immobilienverkauf-a-z/grundpfandrecht/
- /immobilienverkauf/immobilienverkauf-a-z/beleihungswert/
- /immobilienverkauf/immobilienverkauf-a-z/grundschuldbestellung/
- /immobilienverkauf/immobilienverkauf-a-z/finanzierungszusage/
- /immobilienverkauf/scheidung-haus/zugewinnausgleich/
- /immobilienverkauf/scheidung-haus/
- /immobilienverkauf/erbschaft/haus-erben/haus-vererben/
- /immobilienverkauf/erbschaft/haus-erben/geerbtes-haus-verkaufen/
- /immobilienverkauf/erbschaft/haus-erben/geerbtes-haus-vermieten/
- /immobilienverkauf/erbschaft/haus-erben/
- /immobilienverkauf/erbschaft/wohnung-erben/wohnung-vererben/
- /immobilienverkauf/erbschaft/wohnung-erben/mietvertrag-erben/
- /immobilienverkauf/erbschaft/wohnung-erben/
- /immobilienverkauf/erbschaft/immobilie-erben/
- /immobilienverkauf/erbschaft/grundstueck-erben/grundstueck-vererben/
- /immobilienverkauf/erbschaft/grundstueck-erben/
- /immobilienverkauf/erbschaft/erbrecht/erbfolge/
- /immobilienverkauf/erbschaft/erbrecht/pflichtteil/
- /immobilienverkauf/erbschaft/erbrecht/erbe-ausschlagen/
- /immobilienverkauf/erbschaft/erbrecht/erbschein/
- /immobilienverkauf/erbschaft/erbrecht/erbauseinandersetzung/
- /immobilienverkauf/erbschaft/erbrecht/erbengemeinschaft/
- /immobilienverkauf/erbschaft/erbrecht/testament/
- /immobilienverkauf/erbschaft/erbrecht/erbvertrag/
- /immobilienverkauf/erbschaft/erbrecht/erbschaftssteuer/
- /immobilienverkauf/erbschaft/erbrecht/schenkungssteuer/
- /immobilienverkauf/erbschaft/erbrecht/
- /immobilienverkauf/erbschaft/erben-a-z/abschichtung/
- /immobilienverkauf/erbschaft/erben-a-z/alleinerbe/
- /immobilienverkauf/erbschaft/erben-a-z/berliner-testament/
- /immobilienverkauf/erbschaft/erben-a-z/enterben/
- /immobilienverkauf/erbschaft/erben-a-z/erbteil-verkaufen/
- /immobilienverkauf/erbschaft/erben-a-z/erbenhaftung/
- /immobilienverkauf/erbschaft/erben-a-z/erblasser/
- /immobilienverkauf/erbschaft/erben-a-z/hofuebergabevertrag/
- /immobilienverkauf/erbschaft/erben-a-z/nachlass/
- /immobilienverkauf/erbschaft/erben-a-z/nachlassglaeubiger/
- /immobilienverkauf/erbschaft/erben-a-z/nachlassverwalter/
- /immobilienverkauf/erbschaft/erben-a-z/nachlassverzeichnis/
- /immobilienverkauf/erbschaft/erben-a-z/sterbeurkunde/
- /immobilienverkauf/erbschaft/erben-a-z/teilungsversteigerung/
- /immobilienverkauf/erbschaft/erben-a-z/testamentseroeffnung/
- /immobilienverkauf/erbschaft/erben-a-z/testament-anfechten/
- /immobilienverkauf/erbschaft/erben-a-z/vorerbe-und-nacherbe/
- /immobilienverkauf/erbschaft/erben-a-z/
- /immobilienverkauf/erbschaft/
- /immobilienverkauf/schenkung/schenkungsvertrag/
- /immobilienverkauf/schenkung/pflichtteilsergaenzungsanspruch/
- /immobilienverkauf/schenkung/schenkung-an-kinder/
- /immobilienverkauf/schenkung/
- /immobilienverkauf/wertsteigerung-immobilie/
- /immobilienverkauf/

### B.6 immoverkauf24 – /immobilienbewertung/ (41) (41 URLs)
- /immobilienbewertung/hausbewertung/
- /immobilienbewertung/wohnungsbewertung/
- /immobilienbewertung/grundstuecksbewertung/
- /immobilienbewertung/verkehrswert-immobilie/verkehrswert-grundstueck/
- /immobilienbewertung/verkehrswert-immobilie/
- /immobilienbewertung/immobilienbewertung-a-z/marktanpassungsfaktor/
- /immobilienbewertung/immobilienbewertung-a-z/erbbaurecht/
- /immobilienbewertung/immobilienbewertung-a-z/grundschuld/
- /immobilienbewertung/immobilienbewertung-a-z/
- /immobilienbewertung/immobilienbewertung-a-z/normalherstellungskosten/
- /immobilienbewertung/immobilienbewertung-a-z/liegenschaftszins/
- /immobilienbewertung/immobilienbewertung-a-z/baulast/
- /immobilienbewertung/immobilienbewertung-a-z/baumaengel/
- /immobilienbewertung/immobilienbewertung-a-z/umbauter-raum/
- /immobilienbewertung/immobilienbewertung-a-z/mietausfallwagnis/
- /immobilienbewertung/immobilienbewertung-a-z/wohnrecht/
- /immobilienbewertung/immobilienbewertung-a-z/bodenwert/
- /immobilienbewertung/immobilienbewertung-a-z/wegerecht/
- /immobilienbewertung/immobilienbewertung-a-z/grunddienstbarkeit/
- /immobilienbewertung/immobilienbewertung-a-z/immowertv/
- /immobilienbewertung/immobilienbewertung-a-z/hoai/
- /immobilienbewertung/immobilienbewertung-a-z/gemeiner-wert/
- /immobilienbewertung/immobilienbewertung-a-z/marktwert/
- /immobilienbewertung/immobilienbewertung-a-z/reallast/
- /immobilienbewertung/immobilienbewertung-a-z/immobiliengutachter/
- /immobilienbewertung/immobilienbewertung-a-z/immobilienblase/
- /immobilienbewertung/immobilienbewertung-a-z/bewirtschaftungskosten/
- /immobilienbewertung/immobilienbewertung-a-z/bodenrichtwert/
- /immobilienbewertung/immobilienbewertung-a-z/baulastenverzeichnis/
- /immobilienbewertung/immobilienbewertung-a-z/leitungsrecht/
- /immobilienbewertung/wertermittlung/ertragswertverfahren/
- /immobilienbewertung/wertermittlung/ertragswertverfahren-bewertung/
- /immobilienbewertung/wertermittlung/sachwertverfahren/
- /immobilienbewertung/wertermittlung/vergleichswertverfahren/
- /immobilienbewertung/wertermittlung/
- /immobilienbewertung/wertgutachten/
- /immobilienbewertung/gewerbeimmobilie-bewerten/
- /immobilienbewertung/wohnmarktanalyse/
- /immobilienbewertung/hauswertrechner/
- /immobilienbewertung/
- /immobilienbewertung/bewertung-hamburg

### B.7 immoverkauf24 – Preisseiten in Rösslers Region (Auszug) (112 URLs)
- /immobilienpreise/baden-wuerttemberg/boeblingen-kreis/rutesheim/
- /immobilienpreise/baden-wuerttemberg/boeblingen-kreis/steinenbronn/
- /immobilienpreise/baden-wuerttemberg/boeblingen-kreis/weil-der-stadt/
- /immobilienpreise/baden-wuerttemberg/ludwigsburg-kreis/moeglingen/
- /immobilienpreise/baden-wuerttemberg/ludwigsburg-kreis/pleidelsheim/
- /immobilienpreise/baden-wuerttemberg/ludwigsburg-kreis/schwieberdingen/
- /immobilienpreise/baden-wuerttemberg/ludwigsburg-kreis/tamm/
- /immobilienpreise/baden-wuerttemberg/pforzheim/au/
- /immobilienpreise/baden-wuerttemberg/ludwigsburg-kreis/benningen-am-neckar/
- /immobilienpreise/baden-wuerttemberg/ludwigsburg-kreis/boennigheim/
- /immobilienpreise/baden-wuerttemberg/ludwigsburg-kreis/erdmannhausen/
- /immobilienpreise/baden-wuerttemberg/ludwigsburg-kreis/remseck-am-neckar/
- /immobilienpreise/baden-wuerttemberg/ludwigsburg-kreis/sersheim/
- /immobilienpreise/baden-wuerttemberg/ludwigsburg-kreis/vaihingen-an-der-enz/
- /immobilienpreise/baden-wuerttemberg/enzkreis/neuenbuerg/
- /immobilienpreise/baden-wuerttemberg/enzkreis/niefern-oeschelbronn/
- /immobilienpreise/baden-wuerttemberg/enzkreis/straubenhardt/
- /immobilienpreise/baden-wuerttemberg/boeblingen-kreis/hildrizhausen/
- /immobilienpreise/baden-wuerttemberg/boeblingen-kreis/leonberg/
- /immobilienpreise/baden-wuerttemberg/boeblingen-kreis/nufringen/
- /immobilienpreise/baden-wuerttemberg/enzkreis/engelsbrand/
- /immobilienpreise/baden-wuerttemberg/enzkreis/illingen/
- /immobilienpreise/baden-wuerttemberg/boeblingen-kreis/grafenau/
- /immobilienpreise/baden-wuerttemberg/boeblingen-kreis/herrenberg/
- /immobilienpreise/baden-wuerttemberg/boeblingen-kreis/jettingen/
- /immobilienpreise/baden-wuerttemberg/enzkreis/friolzheim/
- /immobilienpreise/baden-wuerttemberg/enzkreis/ispringen/
- /immobilienpreise/baden-wuerttemberg/enzkreis/knittlingen/
- /immobilienpreise/baden-wuerttemberg/pforzheim/weststadt/
- /immobilienpreise/baden-wuerttemberg/pforzheim/suedweststadt/
- /immobilienpreise/baden-wuerttemberg/boeblingen-kreis/holzgerlingen/
- /immobilienpreise/baden-wuerttemberg/ludwigsburg-kreis/freudental/
- /immobilienpreise/baden-wuerttemberg/ludwigsburg-kreis/grossbottwar/
- /immobilienpreise/baden-wuerttemberg/ludwigsburg-kreis/ingersheim/
- /immobilienpreise/baden-wuerttemberg/ludwigsburg-kreis/kornwestheim/
- /immobilienpreise/baden-wuerttemberg/ludwigsburg-kreis/affalterbach/
- /immobilienpreise/baden-wuerttemberg/ludwigsburg-kreis/marbach-am-neckar/
- /immobilienpreise/baden-wuerttemberg/ludwigsburg-kreis/murr/
- /immobilienpreise/baden-wuerttemberg/ludwigsburg-kreis/oberstenfeld/
- /immobilienpreise/baden-wuerttemberg/ludwigsburg-kreis/sachsenheim/
- /immobilienpreise/baden-wuerttemberg/ludwigsburg-kreis/hemmingen/
- /immobilienpreise/baden-wuerttemberg/ludwigsburg-kreis/kirchheim-am-neckar/
- /immobilienpreise/baden-wuerttemberg/ludwigsburg-kreis/ludwigsburg/
- /immobilienpreise/baden-wuerttemberg/ludwigsburg-kreis/markgroeningen/
- /immobilienpreise/baden-wuerttemberg/pforzheim/hohenwart/
- /immobilienpreise/baden-wuerttemberg/pforzheim/broetzingen/
- /immobilienpreise/baden-wuerttemberg/pforzheim/oststadt/
- /immobilienpreise/baden-wuerttemberg/pforzheim/suedoststadt/
- /immobilienpreise/baden-wuerttemberg/enzkreis/kieselbronn/
- /immobilienpreise/baden-wuerttemberg/boeblingen-kreis/magstadt/
- /immobilienpreise/baden-wuerttemberg/boeblingen-kreis/renningen/
- /immobilienpreise/baden-wuerttemberg/boeblingen-kreis/sindelfingen/
- /immobilienpreise/baden-wuerttemberg/enzkreis/keltern/
- /immobilienpreise/baden-wuerttemberg/enzkreis/kaempfelbach/
- /immobilienpreise/baden-wuerttemberg/enzkreis/moensheim/
- /immobilienpreise/baden-wuerttemberg/enzkreis/heimsheim/
- /immobilienpreise/baden-wuerttemberg/enzkreis/koenigsbach-stein/
- /immobilienpreise/baden-wuerttemberg/enzkreis/muehlacker/
- /immobilienpreise/baden-wuerttemberg/enzkreis/neulingen/
- /immobilienpreise/baden-wuerttemberg/boeblingen-kreis/aidlingen/
- /immobilienpreise/baden-wuerttemberg/boeblingen-kreis/boeblingen/
- /immobilienpreise/baden-wuerttemberg/boeblingen-kreis/weil-im-schoenbuch/
- /immobilienpreise/baden-wuerttemberg/enzkreis/birkenfeld/
- /immobilienpreise/baden-wuerttemberg/enzkreis/sternenfels/
- /immobilienpreise/baden-wuerttemberg/enzkreis/wiernsheim/
- /immobilienpreise/baden-wuerttemberg/enzkreis/oelbronn-duerrn/
- /immobilienpreise/baden-wuerttemberg/boeblingen-kreis/bondorf/
- /immobilienpreise/baden-wuerttemberg/boeblingen-kreis/ehningen/
- /immobilienpreise/baden-wuerttemberg/boeblingen-kreis/gaeufelden/
- /immobilienpreise/baden-wuerttemberg/ludwigsburg-kreis/eberdingen/
- /immobilienpreise/baden-wuerttemberg/ludwigsburg-kreis/freiberg-am-neckar/
- /immobilienpreise/baden-wuerttemberg/ludwigsburg-kreis/gerlingen/
- /immobilienpreise/baden-wuerttemberg/ludwigsburg-kreis/hessigheim/
- /immobilienpreise/baden-wuerttemberg/boeblingen-kreis/schoenaich/
- /immobilienpreise/baden-wuerttemberg/boeblingen-kreis/waldenbuch/
- /immobilienpreise/baden-wuerttemberg/boeblingen-kreis/weissach/
- /immobilienpreise/baden-wuerttemberg/enzkreis/neuhausen/
- /immobilienpreise/baden-wuerttemberg/enzkreis/remchingen/
- /immobilienpreise/baden-wuerttemberg/enzkreis/tiefenbronn/
- /immobilienpreise/baden-wuerttemberg/enzkreis/wurmberg/
- … (32 weitere in der Datei)

### B.8 Von Poll – /de/immobilien-ratgeber/ (45) (45 URLs)
- /de/immobilien-ratgeber/haus-mit-pool
- /de/immobilien-ratgeber/nachhaltiges-bauen-effekte-dimensionen-guetesiegel
- /de/immobilien-ratgeber/nachhaltige-immobilien-vorteile-und-moeglichkeiten
- /de/immobilien-ratgeber/notartermin-hauskauf
- /de/immobilien-ratgeber/wohnflaechenberechnung
- /de/immobilien-ratgeber/zweitwohnsitz-anmelden
- /de/immobilien-ratgeber/nebenkostenabrechnung
- /de/immobilien-ratgeber/auflassungsvormerkung-grundbuch
- /de/immobilien-ratgeber/erbengemeinschaft-aufloesen
- /de/immobilien-ratgeber/sanierungspflicht
- /de/immobilien-ratgeber/grundbuch
- /de/immobilien-ratgeber/maklerprovision-wie-hoch-wer-zahlt
- /de/immobilien-ratgeber/notwegerecht
- /de/immobilien-ratgeber/eigentuemergemeinschaft
- /de/immobilien-ratgeber/haus-aus-dem-3d-drucker
- /de/immobilien-ratgeber/aktuelle-heizkostenverordnung
- /de/immobilien-ratgeber/grunderwerbsteuer
- /de/immobilien-ratgeber/kaufen-oder-mieten
- /de/immobilien-ratgeber/nutzflaeche-nach-din-277
- /de/immobilien-ratgeber/checkliste-hauskauf
- /de/immobilien-ratgeber/nutzungsaenderung-beantragen
- /de/immobilien-ratgeber/mietpreisbremse-2026
- /de/immobilien-ratgeber/wohngeld
- /de/immobilien-ratgeber/energetische-sanierung
- /de/immobilien-ratgeber/bauzinsen-entwicklung-prognosen
- /de/immobilien-ratgeber/umlagefaehige-nebenkosten
- /de/immobilien-ratgeber/energiesparende-modernisierungen
- /de/immobilien-ratgeber/immobilie-als-altersvorsorge
- /de/immobilien-ratgeber/kuendigungsfrist-wohnung
- /de/immobilien-ratgeber/kaufpreisfaktor-berechnen-tabelle
- /de/immobilien-ratgeber/hausverkauf-auf-rentenbasis
- /de/immobilien-ratgeber/betriebskostenabrechnung-was-zaehlt-zu-betriebskosten
- /de/immobilien-ratgeber/teilungserklaerung
- /de/immobilien-ratgeber/hausverkauf-checkliste
- /de/immobilien-ratgeber/geerbtes-haus-verkaufen
- /de/immobilien-ratgeber/hausverkauf-vertrag
- /de/immobilien-ratgeber/schenkungsvertrag-immobilie
- /de/immobilien-ratgeber/wohnung-haus-kuehlen-ohne-klimaanlage
- /de/immobilien-ratgeber/modernisierungskredit
- /de/immobilien-ratgeber/wie-viel-miete-kann-ich-verlangen
- /de/immobilien-ratgeber/grundschuld-loeschen
- /de/immobilien-ratgeber/immobilienkaufvertrag-worauf-achten
- /de/immobilien-ratgeber/zugewinngemeinschaft-gueterstand-immobilienverkauf
- /de/immobilien-ratgeber/sondernutzungsrecht-garten-stellplatz
- /de/immobilien-ratgeber/grundbuchauszug-anfordern

### B.9 Von Poll – lokale Bewertungs-LPs in Baden-Württemberg (Auszug) (24 URLs)
- /de/immobilienbewertung-aalen
- /de/immobilienbewertung-achern
- /de/immobilienbewertung-balingen
- /de/immobilienbewertung-biberach
- /de/immobilienbewertung-boeblingen
- /de/immobilienbewertung-bruchsal
- /de/immobilienbewertung-fellbach
- /de/immobilienbewertung-herrenberg
- /de/immobilienbewertung-kirchheim-unter-teck
- /de/immobilienbewertung-konstanz
- /de/immobilienbewertung-leonberg
- /de/immobilienbewertung-loerrach
- /de/immobilienbewertung-markdorf
- /de/immobilienbewertung-offenburg
- /de/immobilienbewertung-ortenaukreis
- /de/immobilienbewertung-schwaebisch-gmuend
- /de/immobilienbewertung-schwaebisch-hall
- /de/immobilienbewertung-singen
- /de/immobilienbewertung-stuttgart
- /de/immobilienbewertung-ueberlingen
- /de/immobilienbewertung-ulm
- /de/immobilienbewertung-villingen-schwenningen
- /de/immobilienbewertung-ravensburg
- /de/immobilienbewertung-pforzheim

### B.10 Engel & Völkers – /de/de/ressourcen/ (ohne regional, ohne EN) (279 URLs)
- /de/de/ressourcen/5-design-regeln-fuer-ein-minimalistisches-wohnzimmer
- /de/de/ressourcen/5-gut-umsetzbare-tipps-um-eine-dachgeschosswohnung-im-sommer-vor-zu-grosser-hitzeentwicklung-zu-schuetzen
- /de/de/ressourcen/5-tipps-fuer-die-immobilienfinanzierung-ohne-eigenkapital
- /de/de/ressourcen/6-tipps-fuer-das-perfekte-heim-fitnessstudio
- /de/de/ressourcen/7-clevere-ideen-fuer-die-raumaufteilung-im-wohnzimmer
- /de/de/ressourcen/7-zuverlaessige-tipps-um-kunden-zu-gewinnen
- /de/de/ressourcen/ablauf-hauskauf
- /de/de/ressourcen/academy
- /de/de/ressourcen/altbau-oder-neubau-kaufen-welche-investition-ist-sinnvoller
- /de/de/ressourcen/alternative-berufe-fuer-architekten-eine-karriere-als-immobilienmakler
- /de/de/ressourcen/alternative-berufe-fuer-juristen-im-immobilienbereich
- /de/de/ressourcen/altersgerechtes-wohnen
- /de/de/ressourcen/apartment-penthouse-loft-was-verbirgt-sich-hinter-den-verschiedenen-wohnungstypen
- /de/de/ressourcen/architektur-die-spektakulaersten-opernhaeuser-der-welt
- /de/de/ressourcen/auslandsimmobilie-kaufen
- /de/de/ressourcen/auslandsimmobilien-vorteile-tipps-und-laender-im-fokus
- /de/de/ressourcen/auswandern-als-rentner-traumziele-fuer-den-ruhestand
- /de/de/ressourcen/baeume-auf-dem-eigenen-grundstueck-faellen
- /de/de/ressourcen/bauen-auf-fremdem-grundstueck-7-haeufige-fragen-zum-erbbaurecht
- /de/de/ressourcen/bauverzoegerung-6-gruende-warum-der-hausbau-laenger-dauern-kann
- /de/de/ressourcen/beruf-des-immobilienassistenten
- /de/de/ressourcen/besichtigungstermin
- /de/de/ressourcen/beste-wege-zur-hausfinanzierung
- /de/de/ressourcen/bestellerprinzip
- /de/de/ressourcen/bett-unter-dem-fenster-der-beste-ort-fuer-erholsamen-schlaf
- /de/de/ressourcen/biopool-umweltfreundliche-alternativen-zum-herkoemmlichen-schwimmbecken
- /de/de/ressourcen/blumen-selber-binden-in-4-schritten-zum-perfekten-blumenstrauss
- /de/de/ressourcen/branded-residences
- /de/de/ressourcen/buero-zu-wohnraum-umwandeln
- /de/de/ressourcen/build-to-rent-investitionen
- /de/de/ressourcen/bungalow-der-ratgeber-fuer-ihre-traumimmobilie
- /de/de/ressourcen/checkliste-hausverkauf
- /de/de/ressourcen/co-living
- /de/de/ressourcen/darlehen-und-finanzierung
- /de/de/ressourcen/das-ferienhaus-als-kapitalanlage
- /de/de/ressourcen/das-gebaeudeenergiegesetz-geg-und-seine-bedeutung-fuer-bestandsgebaeude
- /de/de/ressourcen/das-shoppingcenter-der-zukunft
- /de/de/ressourcen/das-smart-home-was-gehoert-zur-grundausstattung-und-welche-geraete-sind-zusaetzlich-sinnvoll
- /de/de/ressourcen/den-herbst-zu-hause-mit-allen-sinnen-geniessen
- /de/de/ressourcen/development-services/projektvertrieb-berlin-brandenburg-project-sales-hub
- /de/de/ressourcen/die-15-minuten-stadt-infrastrukturelle-entwicklungen
- /de/de/ressourcen/die-besonderheiten-eines-pachtvertrages-und-das-erbbaurecht
- /de/de/ressourcen/die-besten-smart-locks-sicherheit-und-komfort
- /de/de/ressourcen/die-betriebskostenabrechnung-worauf-muss-ich-achten
- /de/de/ressourcen/die-ci-als-essentieller-bestandteil-des-immobilien-franchise
- /de/de/ressourcen/die-gbr-im-grundstuecksverkehr
- /de/de/ressourcen/die-geschichte-des-st-patricks-day
- /de/de/ressourcen/die-geschichte-von-engel-voelkers-vom-hamburger-immobilienbuero-zum-internationalen-franchise-netzwerk
- /de/de/ressourcen/die-immobilienpreise-in-portugal
- /de/de/ressourcen/die-rolle-als-franchisenehmer-und-geschaeftsfuehrer-im-ueberblick
- /de/de/ressourcen/die-suche-nach-der-korrekten-energieeffizienzklasse-was-macht-ein-haus-wirklich-energieeffizient
- /de/de/ressourcen/die-top-5-der-exklusivsten-skigebiete-weltweit
- /de/de/ressourcen/die-vorteile-eines-franchise-systems-gegenueber-der-klassischen-neugruendung
- /de/de/ressourcen/dubai-immobilienpreise
- /de/de/ressourcen/durch-immobilieninvestments-doppelte-staatsbuergerschaften-kaufen-von-oesterreich-bis-malta
- /de/de/ressourcen/eden-rock-die-spannende-geschichte-eines-legendaeren-hotels
- /de/de/ressourcen/eigenheimwechsel-wie-sie-gleichzeitig-ein-haus-kaufen-und-verkaufen
- /de/de/ressourcen/eigenschaften-eines-erfolgreichen-franchisenehmers
- /de/de/ressourcen/ein-traum-wird-wahr-einblicke-in-das-leben-im-schloss
- /de/de/ressourcen/ein-zweitwohnsitz-im-suedlichen-europa
- /de/de/ressourcen/einfamilienhaus-verkaufen
- /de/de/ressourcen/einheitswert-berechnen
- /de/de/ressourcen/elternhaus-verkaufen
- /de/de/ressourcen/energieausweis-aenderungen
- /de/de/ressourcen/energieausweis-kosten-und-pflichten-im-detail
- /de/de/ressourcen/energieeffizienz-immobilien
- /de/de/ressourcen/engel-voelkers-erklaert-franchise-lizenz-und-vertriebssysteme
- /de/de/ressourcen/engel-voelkers-franchise-was-ein-starker-markenname-fuer-die-geschaeftsgruendung-bedeutet
- /de/de/ressourcen/engel-voelkers-idealer-franchisegeber-im-immobiliensektor
- /de/de/ressourcen/engel-voelkers-vermarktet-einzigartiges-new-yorker-park-avenue-apartment
- /de/de/ressourcen/engel-voelkers-vermittelt-bonanza-ranch-fuer-38-millionen-us-dollar
- /de/de/ressourcen/erbschaft-immobilie-ausland
- /de/de/ressourcen/erbschaftssteuer
- /de/de/ressourcen/erfolgreicher-franchise-businessplan
- /de/de/ressourcen/erkunden-sie-das-neue-engel-voelkers-headquarter
- /de/de/ressourcen/erstkontakt-zum-mietvertrag-in-24-stunden
- /de/de/ressourcen/eu-kurzzeitvermietung-verordnung
- /de/de/ressourcen/ferienhaus-in-griechenland-kaufen
- /de/de/ressourcen/ferienhaus-kaufen
- /de/de/ressourcen/ferienhaus-mexiko
- /de/de/ressourcen/ferienhaus-nordsee-kaufen
- /de/de/ressourcen/ferienhaus-ostsee-kaufen
- /de/de/ressourcen/ferienimmobilien
- /de/de/ressourcen/ferienwohnung-an-der-ostsee-kaufen
- /de/de/ressourcen/ferienwohnung-kaufen
- /de/de/ressourcen/fortbildung-immobilienmakler
- /de/de/ressourcen/franchise-als-investment-gruendung-als-kapitalanlage
- /de/de/ressourcen/franchise-gruendung-allein-oder-mit-partner-so-koennen-sie-team-synergien-fuer-ihren-erfolg-als-immobilienmakler-nutzen
- /de/de/ressourcen/franchise-gruendung-immobilienbranche
- /de/de/ressourcen/frank-lloyd-wright-biografie-und-philosophie-der-architektur-ikone
- /de/de/ressourcen/fruehzeitig-schenken-statt-spaeter-vererben
- /de/de/ressourcen/gebietsschutz-im-engel-voelkers-franchise-system
- /de/de/ressourcen/geerbtes-haus-verkaufen-steuer
- /de/de/ressourcen/geldanlage-immobilien-investition-effizient-nutzen
- /de/de/ressourcen/gmbh-vererben
- /de/de/ressourcen/grundbuch-und-grundbucheintrag
- /de/de/ressourcen/grundlagen-eigentuemergemeinschaft
- /de/de/ressourcen/grundriss
- /de/de/ressourcen/grundschuld-kann-eine-belastete-immobilie-verkauft-werden
- /de/de/ressourcen/grundsteuer-auf-mieter-umlegen
- /de/de/ressourcen/grundsteuer-berechnen
- /de/de/ressourcen/grundsteuer-berechnen-bayern
- /de/de/ressourcen/grundsteuer-berechnen-bw
- /de/de/ressourcen/grundsteuer-berechnen-hamburg
- /de/de/ressourcen/grundsteuer-berechnen-niedersachsen
- /de/de/ressourcen/grundsteuer-berechnen-nrw
- /de/de/ressourcen/grundstueck-verkaufen
- /de/de/ressourcen/grundstuecksverkauf-steuern
- /de/de/ressourcen/guenstige-energieberatung
- /de/de/ressourcen/hamburger-mietvertrag
- /de/de/ressourcen/hamburgs-vielleicht-exklusivste-wohnung-in-der-elbphilharmonie
- /de/de/ressourcen/haus-am-meer-kaufen
- /de/de/ressourcen/haus-am-meer-kaufen-nordsee
- /de/de/ressourcen/haus-am-meer-kaufen-ostsee
- /de/de/ressourcen/haus-am-mittelmeer-kaufen
- /de/de/ressourcen/haus-an-der-ostsee-kaufen
- /de/de/ressourcen/haus-kaufen-ohne-eigenkapital
- /de/de/ressourcen/haus-mit-pool
- /de/de/ressourcen/haus-vererben-steuerfrei
- /de/de/ressourcen/hauskauf-nebenkosten
- /de/de/ressourcen/hausverkauf-energieausweis
- /de/de/ressourcen/hausverkauf-kosten
- /de/de/ressourcen/hausverkauf-rentenbasis
- /de/de/ressourcen/hausverkauf-steuern
- /de/de/ressourcen/hausverkauf-unterlagen
- /de/de/ressourcen/hausverkauf-vertrag
- /de/de/ressourcen/hausverkauf-vorfaelligkeitsentschaedigung
- /de/de/ressourcen/heiraten-im-herbst-5-gruende-fuer-eine-traumhochzeit-im-september
- /de/de/ressourcen/historische-villa-komfortables-bestandshaus-oder-moderner-neubau-ein-ueberblick-zur-kaufentscheidung
- /de/de/ressourcen/hoch-hinaus-so-steigert-der-dachbodenausbau-den-immobilienwert
- /de/de/ressourcen/ihr-einkommen-als-franchise-partner-in-von-engel-voelkers
- /de/de/ressourcen/immobilie-steuerfrei-verkaufen
- /de/de/ressourcen/immobilie-vererben-das-muessen-sie-wissen
- /de/de/ressourcen/immobilien-als-kapitalanlage
- /de/de/ressourcen/immobilien-in-europa
- /de/de/ressourcen/immobilien-in-griechenland-kaufen
- /de/de/ressourcen/immobilien-in-italien
- /de/de/ressourcen/immobilien-projektentwicklung
- /de/de/ressourcen/immobilienbewertung-diese-faktoren-bestimmen-den-preis-ihrer-immobilie
- /de/de/ressourcen/immobilienfinanzierung
- /de/de/ressourcen/immobilienfinanzierung-mallorca
- /de/de/ressourcen/immobilienkauf-2026-mehr-auswahl-stabile-preise
- /de/de/ressourcen/immobilienkauf-fruehjahr
- /de/de/ressourcen/immobilienkauf-in-jungen-jahren-ja-oder-nein
- /de/de/ressourcen/immobilienkauf-mit-kryptowaehrung
- /de/de/ressourcen/immobilienkaufmann-immobilienkauffrau-ausbildung
- /de/de/ressourcen/immobilienlexikon
- /de/de/ressourcen/immobilienmakler-aufgaben
- /de/de/ressourcen/immobilienmakler-gehalt
- /de/de/ressourcen/immobilienmakler-quereinsteiger
- /de/de/ressourcen/immobilienmarkt-mallorca
- /de/de/ressourcen/immobilienmarkt-usa
- /de/de/ressourcen/immobilienpreise-griechenland
- /de/de/ressourcen/immobilienpreise-paris
- /de/de/ressourcen/immobilienpreise-rom
- /de/de/ressourcen/immobilienpreise-wien
- /de/de/ressourcen/immobilienpreise-zuerich
- /de/de/ressourcen/immobilienverrentung-modelle-im-vergleich
- /de/de/ressourcen/immobilienwert-ermitteln
- /de/de/ressourcen/in-zeiten-der-zinswende-als-immobilienkaeufer-und-verkaeufer-richtig-agieren
- /de/de/ressourcen/investment
- /de/de/ressourcen/investment-immobilienportfolio
- /de/de/ressourcen/investment-rendite
- /de/de/ressourcen/jessalyn-wanlim-wechselt-zu-engel-voelkers
- /de/de/ressourcen/joseph-eichler-modernes-offenes-design-mit-natuerlicher-note
- /de/de/ressourcen/kaminsysteme-nachtraeglich-einbauen
- /de/de/ressourcen/kanada-immobilienpreise
- /de/de/ressourcen/kaufen-oder-mieten
- /de/de/ressourcen/ki-in-der-immobilienbranche
- /de/de/ressourcen/kleiner-kaminofen-grosse-wirkung-das-upgrade-fuer-ihr-schlafzimmer
- /de/de/ressourcen/kuestenimmobilien-europa
- /de/de/ressourcen/le-corbusier-stil-und-philosophie-der-architektur-ikone
- /de/de/ressourcen/legionellenpruefung-umlagefaehig
- /de/de/ressourcen/letztwillige-verfuegung
- /de/de/ressourcen/luxus-immobilien-trends
- /de/de/ressourcen/luxusimmobilien
- /de/de/ressourcen/luxusimmobilien-in-deutschland
- /de/de/ressourcen/luxusimmobilien-weltweit
- /de/de/ressourcen/luxusvilla
- /de/de/ressourcen/luxuswohnung
- /de/de/ressourcen/maklercourtage-gesetz
- /de/de/ressourcen/maklerprovision-wie-hoch
- /de/de/ressourcen/maklerschein
- /de/de/ressourcen/maklervertrag-hausverkauf
- /de/de/ressourcen/marktbericht-griechenland
- /de/de/ressourcen/mehrgenerationenhaus-kaufen
- /de/de/ressourcen/mieten-im-ruhestand-warum-immer-mehr-rentner-neue-wege-gehen
- /de/de/ressourcen/minimalistisch-wohnen-wie-lebt-es-sich-in-einem-tiny-house
- /de/de/ressourcen/nachhaltigkeit-esg-im-immobilienbereich
- /de/de/ressourcen/netzwerkarbeit-in-der-immobilienbranche
- /de/de/ressourcen/notarvertrag-4-dinge-die-sie-beim-hausverkauf-wissen-sollten
- /de/de/ressourcen/nutzungsaenderung-beantragen
- /de/de/ressourcen/nutzungsaenderung-gastronomie
- /de/de/ressourcen/nutzungsaenderung-hotel
- /de/de/ressourcen/nutzungsaenderung-wohnen
- /de/de/ressourcen/nutzungsaenderung-wohnraum-gewerbe
- /de/de/ressourcen/online-marketing-strategie-fuer-ihr-immobilienfranchise
- /de/de/ressourcen/open-house-mit-diesen-8-tipps-wird-die-besichtigung-ein-voller-erfolg
- /de/de/ressourcen/ortsuebliche-miete
- /de/de/ressourcen/ostsee
- /de/de/ressourcen/outdoor-trends
- /de/de/ressourcen/pflichtteilsanspruch
- /de/de/ressourcen/private-untervermietung-was-ist-erlaubt-und-was-nicht
- /de/de/ressourcen/provisionsmodell
- /de/de/ressourcen/quiz-stadt-oder-land-finden-sie-den-perfekten-wohnort-fuer-sich
- /de/de/ressourcen/renditeberechnung-bei-ferienimmobilien
- /de/de/ressourcen/sanierungsfahrplan
- /de/de/ressourcen/sanierungsgebiet-vorteile-nachteile
- /de/de/ressourcen/schenkung-ihrer-immobilie
- /de/de/ressourcen/sieben-tipps-wie-sie-alte-und-neue-moebel-stylisch-kombinieren
- /de/de/ressourcen/sind-alternative-finanzierungsformen-die-neue-norm-im-immobiliensektor
- /de/de/ressourcen/smart-home-immobilienwert
- /de/de/ressourcen/smarthome-kameras-wissenswertes-zur-smarten-videoueberwachung
- /de/de/ressourcen/so-finanzieren-sie-zwei-immobilien-gleichzeitig
- /de/de/ressourcen/so-finden-sie-das-richtige-lizenzgebiet-fuer-ihre-franchise-gruendung
- /de/de/ressourcen/so-gelingt-die-kreditbewilligung-zum-investment-ins-franchising
- /de/de/ressourcen/so-machen-sie-ihr-haus-winterfest
- /de/de/ressourcen/so-steigert-gelungenes-gartendesign-den-wert-ihrer-immobilie
- /de/de/ressourcen/solarthermie-nachruesten-im-bestandsbau
- /de/de/ressourcen/spekulationsfrist-darauf-sollten-sie-beim-immobilienverkauf-achten
- /de/de/ressourcen/spekulationssteuer
- /de/de/ressourcen/st-patricks-day-warum-gruen-dazugehoert-und-weitere-spannende-fakten
- /de/de/ressourcen/staatliche-foerderungen-nutzen
- /de/de/ressourcen/staffelmiete-und-indexmiete
- /de/de/ressourcen/starthilfe-fuer-jeden-franchisenehmer-die-leistungen-des-franchisegebers
- /de/de/ressourcen/stil-und-philosophie-der-architektin-zaha-hadid
- /de/de/ressourcen/teilungserklaerung-aendern
- /de/de/ressourcen/tipps-die-helfen-dem-ruhestand-entspannt-entgegenzusehen
- /de/de/ressourcen/tipps-fuer-den-immobilienkauf-in-frankreich
- /de/de/ressourcen/tipps-fuer-die-gewerbliche-vermietung-von-wohnraum
- /de/de/ressourcen/tipps-fuer-die-moeblierte-vermietung
- /de/de/ressourcen/tipps-fuer-private-immobilieninvestoren
- /de/de/ressourcen/tipps-zur-wohnungssuche
- /de/de/ressourcen/trinkwasseruntersuchung-pflicht
- /de/de/ressourcen/umnutzung-was-ist-mit-brandschutz-und-parken
- /de/de/ressourcen/umzug-checkliste
- /de/de/ressourcen/umzug-nach-paris-die-5-besten-bezirke-fuer-ihren-wohnortwechsel
- /de/de/ressourcen/unterschied-immobilienmakler-und-immobilienkaufmann
- /de/de/ressourcen/vermeiden-sie-diese-fuenf-fehler-wenn-sie-ihr-schlafzimmer-einrichten
- /de/de/ressourcen/vermietung
- /de/de/ressourcen/villa-chalet-und-herrenhaus-was-ist-der-unterschied
- /de/de/ressourcen/virtuelle-besichtigung
- /de/de/ressourcen/vom-bauingenieur-zum-immobilienmakler
- /de/de/ressourcen/vom-profitaenzer-zum-immobilienprofi-im-gespraech-mit-oliver-tienken
- /de/de/ressourcen/wann-ist-die-ferienwohnung-ein-zweitwohnsitz
- /de/de/ressourcen/warum-das-bwl-studium-die-ideale-basis-fuer-eine-karriere-als-immobilienmakler-ist
- /de/de/ressourcen/warum-einen-makler-fuer-mietimmobilien-beauftragen
- /de/de/ressourcen/warum-immobilienmakler-beauftragen
- /de/de/ressourcen/warum-sich-die-energetische-gebaeudesanierung-lohnt
- /de/de/ressourcen/was-erhalten-gesetzliche-erben
- /de/de/ressourcen/was-ist-der-bodenrichtwert
- /de/de/ressourcen/was-ist-ein-baukredit-und-wann-sollte-man-ihn-beantragen
- /de/de/ressourcen/was-ist-micro-living-und-wieso-nennt-man-es-das-urbane-wohnkonzept-der-zukunft
- /de/de/ressourcen/was-macht-ein-immobilienmakler
- /de/de/ressourcen/was-sind-co2-neutrale-immobilien
- /de/de/ressourcen/welche-ist-die-beste-heizung-fuer-die-sanierung-eines-altbaus
- /de/de/ressourcen/welche-sind-die-heizsysteme-der-zukunft
- /de/de/ressourcen/welches-alter-ist-das-beste-um-franchisenehmer-in-zu-werden
- /de/de/ressourcen/wellness-immobilien
- /de/de/ressourcen/wertsteigerung-fuer-immobilien
- /de/de/ressourcen/wie-immobilienmakler-martin-rouleau-die-sozialen-netzwerke-eroberte
- /de/de/ressourcen/wie-sich-der-einstieg-ins-immobilien-franchise-finanzieren-laesst
- /de/de/ressourcen/wie-sie-den-passenden-energieberater-finden
- /de/de/ressourcen/wie-sie-den-umzug-in-eine-kleinere-wohnung-reibungslos-gestalten
- /de/de/ressourcen/wissenswertes-zur-green-building-zertifizierung
- /de/de/ressourcen/wissenswertes-zur-kapitalanlage-studentenwohnung
- /de/de/ressourcen/wo-lohnt-sich-der-ferienhauskauf-im-europaeischen-ausland
- /de/de/ressourcen/wohnen-auf-dem-wasser-der-neueste-trend-heisst-floating-house
- /de/de/ressourcen/wohnflaechenberechnung-so-gehts-richtig
- /de/de/ressourcen/wohnung-verkaufen
- /de/de/ressourcen/wohnungsbesichtigung
- /de/de/ressourcen/young-professionals
- /de/de/ressourcen/zusatzeinkommen-wie-sie-dachboden-keller-oder-garage-vermieten
- /de/de/ressourcen/zweitwohnsitzsteuer-hamburg
- /de/de/ressourcen/kaeufer
- /de/de/ressourcen/verkaeufer
- /de/de/ressourcen/makler
- /de/de/ressourcen/regionen
- /de/de/ressourcen/lifestyle

### B.11 Engel & Völkers – Hamburg-Ressourcen (32) (32 URLs)
- /de/de/hamburg/ressourcen/alternative-kapitalanlage-in-wohnimmobilien-dank-mikro-apartment-trend
- /de/de/hamburg/ressourcen/bauliche-veraenderungen-nach-dem-immobilienkauf-brauchen-sie-eine-genehmigung
- /de/de/hamburg/ressourcen/das-engel-voelkers-expose-ein-entscheidender-vorteil-fuer-ihren-immobilienverkauf-in-hamburg
- /de/de/hamburg/ressourcen/denkmalgeschuetzte-immobilien-in-hamburg-kaufen-wissenswerte-informationen-im-ueberblick
- /de/de/hamburg/ressourcen/der-notartermin-als-abschluss-ihres-erfolgreichen-immobilienverkaufs-in-hamburg
- /de/de/hamburg/ressourcen/die-7-hamburger-bezirke-und-ihre-highlights
- /de/de/hamburg/ressourcen/die-beliebtesten-stadtteile-hamburgs
- /de/de/hamburg/ressourcen/die-erweiterung-der-wohnflaeche-als-attraktive-option-fuer-ihre-immobilie-in-hamburg
- /de/de/hamburg/ressourcen/die-kuendigung-welche-voraussetzungen-gelten-fuer-mieter-und-vermieter
- /de/de/hamburg/ressourcen/die-maklercourtage-beim-immobilienverkauf-wissenswertes-zur-aufteilung-der-kosten
- /de/de/hamburg/ressourcen/die-staerksten-argumente-fuer-ihren-immobilienverkauf-in-hittfeld-waldesruh-bei-hamburg
- /de/de/hamburg/ressourcen/die-teilungserklaerung-als-zentrales-dokument-fuer-eigentumswohnungen-nicht-nur-beim-verkauf
- /de/de/hamburg/ressourcen/ein-mietverhaeltnis-kuendigen-in-hamburg-voraussetzungen-fuer-mieter-und-vermieter-erklaert
- /de/de/hamburg/ressourcen/eine-immobilie-innerhalb-der-familie-verkaufen-nutzen-und-hintergruende-der-transaktion
- /de/de/hamburg/ressourcen/eine-immobilie-mehrere-eigentuemer-die-besonderheiten-beim-verkauf
- /de/de/hamburg/ressourcen/eine-immobilie-moebliert-oder-unmoebliert-verkaufen-wozu-unsere-immobilienmakler-raten
- /de/de/hamburg/ressourcen/engel-voelkers-hamburg-erklaert-wie-funktioniert-die-staffelmieterhoehung
- /de/de/hamburg/ressourcen/gutachten-vor-dem-immobilienkauf-mehr-sicherheit-fuer-ihr-investment
- /de/de/hamburg/ressourcen/gutachter-vor-dem-immobilienkauf-beauftragen-eine-sinnvolle-entscheidung
- /de/de/hamburg/ressourcen/haeuser-und-wohnungen-in-der-gemeinde-rosengarten-ihr-immobilienverkauf-im-gruenen
- /de/de/hamburg/ressourcen/hamburg-bergedorf-verspricht-strukturstaerke-und-kulturalitaet-beim-immobilienverkauf
- /de/de/hamburg/ressourcen/historische-immobilien-in-barmbek-was-sie-beim-kauf-beachten-sollten
- /de/de/hamburg/ressourcen/immobilienverkauf-mit-mehreren-eigentuemern-hinweise-zu-rechtslage-und-praxis
- /de/de/hamburg/ressourcen/kauf-statt-miete-ihre-nachhaltige-zweitwohnsitz-strategie-in-hamburg
- /de/de/hamburg/ressourcen/mietpreisbremse-in-hamburg-aktuelle-informationen-fuer-vermieter-von-immobilien
- /de/de/hamburg/ressourcen/nutzungsflaeche-und-wohnflaeche-bei-haeusern-und-wohnungen-in-hamburg-richtig-berechnen
- /de/de/hamburg/ressourcen/sicherheit-durch-gutachten-ist-die-entscheidung-vor-dem-immobilienkauf-sinnvoll
- /de/de/hamburg/ressourcen/sind-vorvertraege-und-reservierungsvereinbarungen-fuer-ihren-immobilienverkauf-von-vorteil
- /de/de/hamburg/ressourcen/tipps-fuer-vermieter-mieterhoehung-auf-ortsuebliche-vergleichsmiete-in-hamburg
- /de/de/hamburg/ressourcen/was-es-bei-der-schluesseluebergabe-nach-einem-immobilienverkauf-zu-beachten-gilt
- /de/de/hamburg/ressourcen/welche-rolle-spielen-reservierungen-und-vorvertraege-beim-immobilienverkauf-in-hamburg
- /de/de/hamburg/ressourcen/wie-lange-dauert-ihr-immobilienverkauf-in-hamburg-die-wichtigsten-faktoren-zusammengefasst

### B.12 Dahler – Verkaufs-/Bewertungs-Ratgeber (10) (10 URLs)
- /de/immobilie-verkaufen/ratgeber/soll-ich-einen-makler-mit-dem-verkauf-beauftragen
- /de/immobilie-verkaufen/ratgeber/so-bereiten-sie-ihre-immobilie-fuer-den-verkauf-vor
- /de/immobilienbewertung/ratgeber/worauf-muss-ich-bei-einer-immobilienbewertung-achten
- /de/immobilie-verkaufen/ratgeber/wie-bereite-ich-mich-auf-den-verkauf-vor
- /de/immobilie-verkaufen/ratgeber/was-passiert-nach-der-notariellen-beurkundung
- /de/immobilie-verkaufen/ratgeber/ist-ein-verkauf-mit-grundschuld-sinnvoll
- /de/immobilie-verkaufen/ratgeber/energieausweis-was-eigentuemer-wissen-muessen
- /de/immobilie-verkaufen/ratgeber/so-finden-sie-den-richtigen-immobilienmakler
- /de/immobilie-verkaufen/ratgeber/was-bedeutet-die-datenschutzverordnung-fuer-verkaeufer-und-vermieter
- /de/immobilienbewertung/ratgeber/was-ist-eine-immobilienbewertung

### B.13 Dahler – lokale Verkaufs-LPs Baden-Württemberg/Bayern (Auszug) (8 URLs)
- /de/immobilie-verkaufen/wohnimmobilien/baden-baden
- /de/immobilie-verkaufen/wohnimmobilien/heilbronn
- /de/immobilie-verkaufen/wohnimmobilien/karlsruhe
- /de/immobilie-verkaufen/wohnimmobilien/lindau-friedrichshafen
- /de/immobilie-verkaufen/wohnimmobilien/ludwigsburg
- /de/immobilie-verkaufen/wohnimmobilien/stuttgart
- /de/immobilie-verkaufen/wohnimmobilien/ueberlingen
- /de/immobilie-verkaufen/wohnimmobilien/ulm

### B.14 ImmoScout24 – /wissen/verkaufen/ (333) (333 URLs)
- /wissen/verkaufen/zeitwert-berechnen.html
- /wissen/verkaufen/vermieten-oder-verkaufen.html
- /wissen/verkaufen/gebaeudemodernisierungsgesetz-juli-2026.html
- /wissen/verkaufen/preiskommentar.html
- /wissen/verkaufen/was-du-wissen-musst-wenn-du-ein-geisterhaus-verkaufst.html
- /wissen/verkaufen/das-aendert-sich-2025-fuer-veraeuferinnen.html
- /wissen/verkaufen/wahlergebnisse-immobilienmarkt.html
- /wissen/verkaufen/koalitionsvertrag-2025.html
- /wissen/verkaufen/sanierungspflicht-was-du-als-eigentuemerin-wissen-musst.html
- /wissen/verkaufen/zinskommentar-2025.html
- /wissen/verkaufen/warum-zwei-drittel-aller-immobilien-mit-maklerin-verkauft-werden.html
- /wissen/verkaufen/verkauf-verhandlungsspielraum-schrumpft.html
- /wissen/verkaufen/viele-eigentuemer-kennen-energieeffizienzklasse-nicht.html
- /wissen/verkaufen/kaufpreisminderung-wegen-schwieriger-zufahrt.html
- /wissen/verkaufen/staedteranking-2025.html
- /wissen/verkaufen/das-aendert-ich-2026-fuer-verkaeuferinnen.html
- /wissen/verkaufen/was-ist-dran-am-lastenausgleichsgesetz.html
- /wissen/verkaufen/grundstueck-verkaufen.html
- /wissen/verkaufen/welchen-einfluss-hat-der-demografische-wandel-und-die-bevoelkerungsentwicklung-auf-die-Immobilienpreise.html
- /wissen/verkaufen/hotel-verkaufen.html
- /wissen/verkaufen/restaurant-verkaufen.html
- /wissen/verkaufen/niessbrauch.html
- /wissen/verkaufen/wann-haftung-trotz-haftungsausschluss.html
- /wissen/verkaufen/geerbtes-haus-verkaufen-steuer.html
- /wissen/verkaufen/heizkosten-sparen.html
- /wissen/verkaufen/verkehrswertgutachten.html
- /wissen/verkaufen/leibrente-berechnen.html
- /wissen/verkaufen/immobilienblase.html
- /wissen/verkaufen/energieeffizienz-als-verkaufsfaktor.html
- /wissen/verkaufen/preisnachlaesse-beim-verkauf.html
- /wissen/verkaufen/haus-verkaufen.html
- /wissen/verkaufen/-kosten-der-erbaufteilung-steuerlich-abziehbar.html
- /wissen/verkaufen/schenkung--erbschaft-vor-ableben.html
- /wissen/verkaufen/teilungsversteigerung.html
- /wissen/verkaufen/erbrecht.html
- /wissen/verkaufen/wohnrecht.html
- /wissen/verkaufen/ertragswertverfahren.html
- /wissen/verkaufen/hausverkauf-wegen-pflegekosten.html
- /wissen/verkaufen/eigentumsuebertragung-abschliessen.html
- /wissen/verkaufen/immobilie-an-auslaender-verkaufen.html
- /wissen/verkaufen/wann-muss-maklerprovision-nicht-gezahlt-werden.html
- /wissen/verkaufen/lohnt-sich-energetische-sanierung-vor-immobilienverkauf.html
- /wissen/verkaufen/nachweisbestaetigung-definition.html
- /wissen/verkaufen/immobilienbewertung-bei-erbschaft.html
- /wissen/verkaufen/maklervertrag-kuendigen-wenn-man-selbst-kaeufer-gefunden-hat.html
- /wissen/verkaufen/kann-erbe-aus-erbengemeinschaft-immobilie-alleine-verkaufen.html
- /wissen/verkaufen/verkaufspreis-immobilie-bestimmen.html
- /wissen/verkaufen/immobilie-vermietet-oder-unvermietet-verkaufen.html
- /wissen/verkaufen/immobilie-moebliert-oder-leer-beim-verkauf-praesentieren.html
- /wissen/verkaufen/darf-man-reservierungsgebuehr-beim-immobilienverkauf-verlangen.html
- /wissen/verkaufen/neue-immobilie-vor-oder-nach-verkauf-erwerben.html
- /wissen/verkaufen/darf-makler-ohne-zustimmung-kontaktdaten-des-verkaeufers-weitergeben.html
- /wissen/verkaufen/partner-will-gemeinsame-immobilie-nicht-verkaufen.html
- /wissen/verkaufen/immobilie-versteigern.html
- /wissen/verkaufen/verkaufsgespraech-immobilienverkauf-tipps.html
- /wissen/verkaufen/muss-ich-kaeufervorschlaege-vom-makler-annehmen.html
- /wissen/verkaufen/fragen-vor-immobilienverkauf.html
- /wissen/verkaufen/haftet-makler-fuer-maengel-beim-immobilienverkauf.html
- /wissen/verkaufen/wie-lange-sollte-man-kaufinteressenten-immobilie-maximal-reservieren.html
- /wissen/verkaufen/wie-erzielt-man-den-hoechsten-verkaufspreis-fuer-seine-immobilie.html
- /wissen/verkaufen/verteilung-verkaufserloes-immobilie-bei-scheidung.html
- /wissen/verkaufen/barzahlung-kaufbetrag-immobilie.html
- /wissen/verkaufen/wann-ist-ein-immobilienverkauf-gewerblich.html
- /wissen/verkaufen/kaufvertrag-immobilie-von-anwalt-pruefen.html
- /wissen/verkaufen/ruecktritt-unterschriebener-kaufvertrag.html
- /wissen/verkaufen/darf-immobilienpreis-bis-zum-vertragsabschluss-erhoeht-werden.html
- /wissen/verkaufen/vertragspartei-minderjaehrig-bei-hausverkauf.html
- /wissen/verkaufen/besitzuebergang-immobilienverkauf.html
- /wissen/verkaufen/wer-haftet-fuer-abrechnungsspitze.html
- /wissen/verkaufen/falsche-flaechenangaben-expose.html
- /wissen/verkaufen/wohnungsverkauf-auswirkung-auf-eigentuemergemeinschaft.html
- /wissen/verkaufen/tricks-unserioeser-makler.html
- /wissen/verkaufen/unterschied-einfacher-qualifizierter-makleralleinauftrag.html
- /wissen/verkaufen/darf-makler-ohne-auftrag-taetig-werden.html
- /wissen/verkaufen/doppeltaetigkeit-makler.html
- /wissen/verkaufen/immobilie-ueber-mehrere-makler-anbieten.html
- /wissen/verkaufen/wie-lange-sichert-vorvertrag-immobilie.html
- /wissen/verkaufen/unterschied-vorvertrag-und-reservierungsvereinbarung.html
- /wissen/verkaufen/unterschied-zwischen-werterhaltenden-und-wertsteigernden-massnahmen.html
- /wissen/verkaufen/darf-ich-denkmalgeschuetztes-haus-vor-verkauf-sanieren.html
- /wissen/verkaufen/ist-renovierung-vor-verkauf-steuerlich-absetzbar.html
- /wissen/verkaufen/immobilienverkauf-verlust-steuerlich-absetzbar.html
- /wissen/verkaufen/was-passiert-mit-instandhaltungsruecklage-bei-immobilienverkauf.html
- /wissen/verkaufen/muss-ich-gebaeudeversicherung-bei-hausverkauf-kuendigen.html
- /wissen/verkaufen/haus-und-grundbesitzerhaftpflichtversicherung-nach-verkauf-kuendigen.html
- /wissen/verkaufen/kann-ich-hausratsversicherung-nach-hausverkauf-kuendigen.html
- /wissen/verkaufen/welche-versicherungen-sind-vom-eigentumswechsel-betroffen.html
- /wissen/verkaufen/bezahlte-gebaeudeversicherung-praemie-nach-hausverkauf.html
- /wissen/verkaufen/wie-verkaufe-ich-zu-teuer-gekaufte-immobilie-ohne-verlust.html
- /wissen/verkaufen/wohnung-kaufen-renovieren-weiterverkaufen.html
- /wissen/verkaufen/mieter-kuendigen-wohnungsverkauf.html
- /wissen/verkaufen/teilungserklaerung.html
- /wissen/verkaufen/notar.html
- /wissen/verkaufen/kleinanzeigen-immobilien.html
- /wissen/verkaufen/maklerauftrag.html
- /wissen/verkaufen/luxusimmobilienmakler.html
- /wissen/verkaufen/kaufpreis.html
- /wissen/verkaufen/finanzierungsvollmacht.html
- /wissen/verkaufen/maklerleistungen.html
- /wissen/verkaufen/vollstreckungsunterwerfung.html
- /wissen/verkaufen/expose.html
- /wissen/verkaufen/kaufvertrag.html
- /wissen/verkaufen/sachwert.html
- /wissen/verkaufen/marktwert-immobilie.html
- /wissen/verkaufen/ruecktrittsklausel.html
- /wissen/verkaufen/auflassung.html
- /wissen/verkaufen/besichtigungstermin.html
- /wissen/verkaufen/angebotspreis.html
- /wissen/verkaufen/aufteilungsplan.html
- /wissen/verkaufen/falscher-grundbucheintrag.html
- /wissen/verkaufen/diese-geldstrafen-drohen-beim-verkauf.html
- /wissen/verkaufen/schadenersatzforderungen-bei-falschen-mieteinnahmen.html
- /wissen/verkaufen/abstraktionsprinzip.html
- /wissen/verkaufen/maklerverband.html
- /wissen/verkaufen/maklerbewertung.html
- /wissen/verkaufen/sondereigentum.html
- /wissen/verkaufen/immobiliengutachter.html
- /wissen/verkaufen/maklervertrag-kuendigen.html
- /wissen/verkaufen/grundeigentuemer.html
- /wissen/verkaufen/grundbucheintragung.html
- /wissen/verkaufen/grundbuchauszug-anfordern.html
- /wissen/verkaufen/maklerprovision.html
- /wissen/verkaufen/arrondierung.html
- /wissen/verkaufen/ausstattung.html
- /wissen/verkaufen/baulast.html
- /wissen/verkaufen/barwert.html
- /wissen/verkaufen/gebaeudewertermittlung.html
- /wissen/verkaufen/baujahr.html
- /wissen/verkaufen/wertermittlungsverordnung-wertv.html
- /wissen/verkaufen/abstandszahlung.html
- /wissen/verkaufen/baupreisindex.html
- /wissen/verkaufen/bewertungsgesetz.html
- /wissen/verkaufen/erbauseinandersetzung.html
- /wissen/verkaufen/bauwich.html
- /wissen/verkaufen/beleihungsgrenze.html
- /wissen/verkaufen/bauschaeden.html
- /wissen/verkaufen/aufgebotsverfahren.html
- /wissen/verkaufen/abzinsung.html
- /wissen/verkaufen/fair-value.html
- /wissen/verkaufen/bewirtschaftungskosten.html
- /wissen/verkaufen/tipps-maklersuche.html
- /wissen/verkaufen/bodenrichtwert.html
- /wissen/verkaufen/ackerzahl.html
- /wissen/verkaufen/gemeiner-wert.html
- /wissen/verkaufen/wertermittlungsstichtag.html
- /wissen/verkaufen/flurkarte.html
- /wissen/verkaufen/flurstueck.html
- /wissen/verkaufen/grundstuecksflaeche.html
- /wissen/verkaufen/gutachterausschuss.html
- /wissen/verkaufen/hauspreise.html
- /wissen/verkaufen/gemengelage.html
- /wissen/verkaufen/grunddienstbarkeit.html
- /wissen/verkaufen/immobilienboerse.html
- /wissen/verkaufen/einheitswert-eines-grundstuecks.html
- /wissen/verkaufen/nettogrundflaeche.html
- /wissen/verkaufen/liegenschaftszinssatz.html
- /wissen/verkaufen/merkantiler-minderwert.html
- /wissen/verkaufen/kubatur.html
- /wissen/verkaufen/lage.html
- /wissen/verkaufen/wohnflaeche.html
- /wissen/verkaufen/parterre.html
- /wissen/verkaufen/lebensdauer.html
- /wissen/verkaufen/immobilienspiegel.html
- /wissen/verkaufen/grundstuecksmarktbericht.html
- /wissen/verkaufen/veraenderungssperre.html
- /wissen/verkaufen/reallast.html
- /wissen/verkaufen/din277-instanz-fuer-wohn-und-nutzflaechen.html
- /wissen/verkaufen/mietdatenbank.html
- /wissen/verkaufen/souterrain.html
- /wissen/verkaufen/richtwerte.html
- /wissen/verkaufen/wertsteigerung-immobilien.html
- /wissen/verkaufen/erbengemeinschaft.html
- /wissen/verkaufen/immobilie-verkaufen.html
- /wissen/verkaufen/abbruchkosten.html
- /wissen/verkaufen/immobilienverkaeufer-kann-notartermin-nicht-persoenlich-wahrnehmen.html
- /wissen/verkaufen/haus-gekauft-jetzt-trennung.html
- /wissen/verkaufen/haus-gekauft-jetzt-arbeitslos.html
- /wissen/verkaufen/haus-gekauft-jetzt-finanzielle-probleme-wegen-unterhaltszahlung.html
- /wissen/verkaufen/haus-gekauft-jetzt-schimmel.html
- /wissen/verkaufen/haus-gekauft-jetzt-ungluecklich.html
- /wissen/verkaufen/haus-gekauft-jetzt-heizung-kaputt.html
- /wissen/verkaufen/immobilienschenkung-widerruf.html
- /wissen/verkaufen/tipp-immobilie-verkaufen-bietverfahren.html
- /wissen/verkaufen/immobilien-verrentung.html
- /wissen/verkaufen/feststellung-des-grundbesitzes-zur-erbschaftssteuer.html
- /wissen/verkaufen/vergleichswertverfahren.html
- /wissen/verkaufen/vermietete-wohnung-verkaufen.html
- /wissen/verkaufen/vermietetes-haus-verkaufen.html
- /wissen/verkaufen/vorsicht-so-verbrennt-ihre-immobilie-am-markt.html
- /wissen/verkaufen/immobilie-an-ehepartner-verkaufen.html
- /wissen/verkaufen/haus-mit-einliegerwohnung-verkaufen.html
- /wissen/verkaufen/vorfaelligkeitsentschaedigung-bei-hausverkauf-absetzen.html
- /wissen/verkaufen/mit-oder-ohne-makler-verkaufen.html
- /wissen/verkaufen/zahlungsabwicklung-beim-hausverkauf.html
- /wissen/verkaufen/haus-verkaufen-ohne-erbschein.html
- /wissen/verkaufen/hausverkauf-kaeufer-zahlt-nicht.html
- /wissen/verkaufen/hausverkauf-nach-scheidung-auszahlung.html
- /wissen/verkaufen/immobilie-im-alter-verkaufen.html
- /wissen/verkaufen/immobilienbewertung-dauer.html
- /wissen/verkaufen/immobilienbewertung-gueltigkeit.html
- /wissen/verkaufen/hausverkauf-steuerlich-absetzen.html
- /wissen/verkaufen/immobilie-verkaufen-trotz-erbvertrag.html
- /wissen/verkaufen/immobilie-nach-10-jahren-verkaufen.html
- /wissen/verkaufen/hausverkauf-in-steuererklaerung-angeben.html
- /wissen/verkaufen/doppelhaushaelfte-verkaufen.html
- /wissen/verkaufen/grundstueck-an-bautraeger-verkaufen.html
- /wissen/verkaufen/grundstueck-im-naturschutzgebiet-verkaufen.html
- /wissen/verkaufen/grundstueck-mit-vorkaufsrecht-verkaufen.html
- /wissen/verkaufen/immobilie-auf-raten-verkaufen.html
- /wissen/verkaufen/immobilie-mit-wohnrecht-verkaufen.html
- /wissen/verkaufen/wohnung-an-mieter-verkaufen.html
- /wissen/verkaufen/hausverkauf-ablauf.html
- /wissen/verkaufen/gekaufte-immobilie-nach-kauf-wieder-verkaufen.html
- /wissen/verkaufen/grundstueck-an-gesellschafter-verkaufen.html
- /wissen/verkaufen/grundstueck-bauen-und-verkaufen.html
- /wissen/verkaufen/immobilie-an-kinder-verkaufen.html
- /wissen/verkaufen/immobilie-bei-demenz-verkaufen.html
- /wissen/verkaufen/immobilie-kostenlos-verkaufen.html
- /wissen/verkaufen/immobilie-mit-verlust-verkaufen.html
- /wissen/verkaufen/immobilie-trotz-testament-verkaufen.html
- /wissen/verkaufen/immobilie-ohne-grundbucheintrag-verkaufen.html
- /wissen/verkaufen/immobilie-durch-betreuer-verkaufen.html
- /wissen/verkaufen/immobilie-verkaufen-nach-todesfall.html
- /wissen/verkaufen/sozialwohnung-verkaufen.html
- /wissen/verkaufen/wohnung-renovieren-und-verkaufen.html
- /wissen/verkaufen/anleitung-inserat-erstellen.html
- /wissen/verkaufen/maklergebuehren-beim-hausverkauf-umgehen.html
- /wissen/verkaufen/muss-man-fotos-der-privatimmobilie-zulassen.html
- /wissen/verkaufen/sonderkuendigungsrecht-fuer-darlehen-bei-hausverkauf.html
- /wissen/verkaufen/kaufpreisfaelligkeit-immobilienverkauf.html
- /wissen/verkaufen/maklergebuehren-steuerlich-absetzen.html
- /wissen/verkaufen/wie-ermittelt-sich-der-verkaufspreis-einer-immobilie.html
- /wissen/verkaufen/grundstueck-kaufen-und-anteilig-verkaufen.html
- /wissen/verkaufen/immobilie-nach-3-4-5-jahren-verkaufen.html
- /wissen/verkaufen/spekulationssteuer-unbebautes-grundstueck.html
- /wissen/verkaufen/haus-verkaufen-zweitwohnsitz-steuern.html
- /wissen/verkaufen/steuer-immobilienverkauf-im-ausland.html
- /wissen/verkaufen/wie-viel-kostet-eine-immobilienbewertung.html
- /wissen/verkaufen/notar-aufgaben-hausverkauf.html
- /wissen/verkaufen/unterlagen-notar-immobilienverkauf.html
- /wissen/verkaufen/wann-muss-der-notar-beim-hausverkauf-bezahlt-werden.html
- /wissen/verkaufen/wer-beauftragt-den-notar-beim-hausverkauf.html
- /wissen/verkaufen/verkauf-abwaegen.html
- /wissen/verkaufen/verkauf-vorbereiten.html
- /wissen/verkaufen/verkauf-abwickeln.html
- /wissen/verkaufen/verkauf-abschliessen.html
- /wissen/verkaufen/haus-verkaufen-wohnen-bleiben.html
- /wissen/verkaufen/haus-verkaufen-zu-welchem-zeitpunkt.html
- /wissen/verkaufen/haus-verkaufen-ohne-energieausweis.html
- /wissen/verkaufen/haus-erben-und-verkaufen.html
- /wissen/verkaufen/haus-verkaufen-auf-rentenbasis.html
- /wissen/verkaufen/haus-mit-vollmacht-verkaufen.html
- /wissen/verkaufen/haus-nach-schenkung-verkaufen.html
- /wissen/verkaufen/haus-verkaufen-bei-laufendem-kredit.html
- /wissen/verkaufen/haus-verkaufen-mit-grundschuld.html
- /wissen/verkaufen/haus-verkaufen-zwei-eigentuemer.html
- /wissen/verkaufen/haus-an-die-bank-verkaufen.html
- /wissen/verkaufen/haus-innerhalb-der-familie-verkaufen.html
- /wissen/verkaufen/haus-verkaufen-kredit-mitnehmen.html
- /wissen/verkaufen/haus-verkaufen-wer-zahlt-notar.html
- /wissen/verkaufen/haus-verkaufen-privatinsolvenz.html
- /wissen/verkaufen/haus-verkaufen-nach-2-jahren.html
- /wissen/verkaufen/haus-verkaufen-grundstueck-behalten.html
- /wissen/verkaufen/haus-verkaufen-mit-vorsorgevollmacht.html
- /wissen/verkaufen/haus-verkaufen-und-zurueckmieten.html
- /wissen/verkaufen/einliegerwohnung-verkaufen.html
- /wissen/verkaufen/muss-die-maklerprovision-bei-nichtzustandekommen-des-hauskaufs-gezahlt-werden.html
- /wissen/verkaufen/wie-lange-dauert-der-verkauf-einer-immobilie.html
- /wissen/verkaufen/steuer-hausverkauf-an-kinder.html
- /wissen/verkaufen/immobilie-innerhalb-der-spekulationsfrist-verkaufen.html
- /wissen/verkaufen/immobilie-unter-geschwister-verkaufen.html
- /wissen/verkaufen/moeblierte-immobilie-verkaufen.html
- /wissen/verkaufen/spekulationsfrist-bei-aufteilung-in-eigentumswohnungen.html
- /wissen/verkaufen/spekulationsfrist-gewerbeimmobilien.html
- /wissen/verkaufen/spekulationsfrist-schenkung-von-immobilien.html
- /wissen/verkaufen/spekulationsfrist-selbstgenutzte-immobilien.html
- /wissen/verkaufen/spekulationsfrist-nach-erbschaft.html
- /wissen/verkaufen/spekulationsfrist-nach-scheidung.html
- /wissen/verkaufen/spekulationssteuer-scheidung.html
- /wissen/verkaufen/haus-innerhalb-der-familie-verkaufen-steuern.html
- /wissen/verkaufen/umsatzsteuer-immobilienverkauf.html
- /wissen/verkaufen/beginn-spekulationsfrist.html
- /wissen/verkaufen/spekulationsfrist-umgehen.html
- /wissen/verkaufen/spekulationsfrist-berechnung.html
- /wissen/verkaufen/wohnung-als-kapitalanlage-verkaufen.html
- /wissen/verkaufen/wohnung-mit-schimmel-verkaufen.html
- /wissen/verkaufen/wohnung-mit-wohnbaufoerderung-verkaufen.html
- /wissen/verkaufen/wohnung-ohne-teilungserklaerung-verkaufen.html
- /wissen/verkaufen/wohnung-wegen-nachbarn-verkaufen.html
- /wissen/verkaufen/hausverkauf-bonitaet-kaeufer-pruefen.html
- /wissen/verkaufen/immobilie-schnell-verkaufen.html
- /wissen/verkaufen/maklerprovision-verhandeln.html
- /wissen/verkaufen/spekulationssteuer-berechnung.html
- /wissen/verkaufen/wann-kommt-ein-maklervertrag-zustande.html
- /wissen/verkaufen/wann-wird-eine-maklerprovision-faellig.html
- /wissen/verkaufen/hausuebergabe-ablauf.html
- /wissen/verkaufen/hausuebergabe-an-kinder.html
- /wissen/verkaufen/hausuebergabe-kosten.html
- /wissen/verkaufen/hausuebergabe-unterlagen.html
- /wissen/verkaufen/hausuebergabe-vor-zahlung.html
- /wissen/verkaufen/hausverkauf-mit-notar.html
- /wissen/verkaufen/immobilienverkauf-ohne-notar.html
- /wissen/verkaufen/maengel-bei-der-hausuebergabe.html
- /wissen/verkaufen/maengelhaftung-beim-hausverkauf.html
- /wissen/verkaufen/unterlagen-nach-hausverkauf-aufheben.html
- /wissen/verkaufen/verkaufspreis-verhandeln.html
- /wissen/verkaufen/vollmacht-zur-hausuebergabe.html
- /wissen/verkaufen/wer-bestimmt-den-notar-beim-hausverkauf.html
- /wissen/verkaufen/zaehlerstaende-bei-hausuebergabe.html
- /wissen/verkaufen/grundstueck-mit-erbbaurecht-verkaufen.html
- /wissen/verkaufen/energieausweis-hausverkauf.html
- /wissen/verkaufen/hausuebergabeprotokoll.html
- /wissen/verkaufen/unterlagen-hausverkauf.html
- /wissen/verkaufen/schluesseluebergabeprotokoll.html
- /wissen/verkaufen/hausverkauf-steuern.html
- /wissen/verkaufen/altersabschlag.html
- /wissen/verkaufen/auflassungsvormerkung.html
- /wissen/verkaufen/hausverkauf-kosten.html
- /wissen/verkaufen/gewerbeimmobilie-verkaufen.html
- /wissen/verkaufen/immobilie-diskret-verkaufen.html
- /wissen/verkaufen/zeitstrahl-richtig-verkaufen.html
- /wissen/verkaufen/bestellerprinzip.html
- /wissen/verkaufen/7-todsuenden-beim-immobilienverkauf.html
- /wissen/verkaufen/zwangsversteigerung.html
- /wissen/verkaufen/so-viel-bekommen-sie-fuer-50-quadratmeter.html
- /wissen/verkaufen/leibrente.html
- /wissen/verkaufen/erbschaftssteuer.html
- /wissen/verkaufen/grundstueckswertermittlung.html
- /wissen/verkaufen/immobilienschaetzung.html
- /wissen/verkaufen/eigentumswohnung-verkaufen.html
- /wissen/verkaufen/haus-privat-verkaufen.html
- /wissen/verkaufen/haus-verkaufen-makler.html
- /wissen/verkaufen/bfh-urteil-immobilienverkauf-innerhalb-der-familie.html

### B.15 Immowelt – /ratgeber/verkaufen/ (43) (43 URLs)
- /ratgeber/verkaufen/abgeschlossenheitsbescheinigung
- /ratgeber/verkaufen/bieterverfahren
- /ratgeber/verkaufen/dauer-hausverkauf
- /ratgeber/verkaufen/ehegattenschaukel
- /ratgeber/verkaufen/ertragswertverfahren
- /ratgeber/verkaufen/expose-erstellen
- /ratgeber/verkaufen/geerbtes-haus-verkaufen
- /ratgeber/verkaufen/grundstuecksverkauf-steuer
- /ratgeber/verkaufen/haus-an-kind-verkaufen
- /ratgeber/verkaufen/haus-privat-verkaufen
- /ratgeber/verkaufen/haus-verkaufen-wohnrecht
- /ratgeber/verkaufen/immobilie-steuerfrei-verkaufen
- /ratgeber/verkaufen/immobilienbewertung-berlin
- /ratgeber/verkaufen/immobilienbewertung-bonn
- /ratgeber/verkaufen/immobilienbewertung-braunschweig
- /ratgeber/verkaufen/immobilienbewertung-bremen
- /ratgeber/verkaufen/immobilienbewertung-dresden
- /ratgeber/verkaufen/immobilienbewertung-duesseldorf
- /ratgeber/verkaufen/immobilienbewertung-essen
- /ratgeber/verkaufen/immobilienbewertung-frankfurt-am-main
- /ratgeber/verkaufen/immobilienbewertung-hamburg
- /ratgeber/verkaufen/immobilienbewertung-hannover
- /ratgeber/verkaufen/immobilienbewertung-karlsruhe
- /ratgeber/verkaufen/immobilienbewertung-koeln
- /ratgeber/verkaufen/immobilienbewertung-leipzig
- /ratgeber/verkaufen/immobilienbewertung-muenchen
- /ratgeber/verkaufen/immobilienbewertung-nuernberg
- /ratgeber/verkaufen/immobilienblase
- /ratgeber/verkaufen/immobilienverkauf
- /ratgeber/verkaufen/liegenschaftszins
- /ratgeber/verkaufen/mehrfamilienhaus
- /ratgeber/verkaufen/provisionssplit-neuvertrag
- /ratgeber/verkaufen/sachwertverfahren
- /ratgeber/verkaufen/scoperty-alternative
- /ratgeber/verkaufen/spekulationssteuer
- /ratgeber/verkaufen/steuern-immobilienverkauf
- /ratgeber/verkaufen/teilverkauf
- /ratgeber/verkaufen/vergleichswertverfahren
- /ratgeber/verkaufen/verkaufen-oder-vermieten
- /ratgeber/verkaufen/vermietete-wohnung-verkaufen
- /ratgeber/verkaufen/vermietetes-haus
- /ratgeber/verkaufen/wertsteigerung-immobilien
- /ratgeber/verkaufen/zeitwert-haus-berechnen

### B.16 Immowelt – Erbe/Makler-Themen in anderen Rubriken (9 URLs)
- /ratgeber/immobilienprofis/maklerhaftung
- /ratgeber/immobilienprofis/maklerprovision-fallen-vermeiden
- /ratgeber/immobilienprofis/maklervertrag-fehler-vermeiden
- /ratgeber/kaufen/nachweismakler-vermittlungsmakler
- /ratgeber/vermieten/maklerprovision-wer-zahlt
- /ratgeber/vermieten/maklervertrag-tipps
- /ratgeber/wohnen/erbengemeinschaft
- /ratgeber/wohnen/erbschaftssteuer
- /ratgeber/wohnen/haus-erben

### B.17 Finanztip – immobiliennahe Ratgeber (Auszug) (28 URLs)
- /baufinanzierung/vorfaelligkeitsentschaedigung/
- /erbschaftssteuer/immobilien/
- /spekulationssteuer/
- /immobilienverrentung/umkehrhypothek/
- /erbschein/
- /vorweggenommene-erbfolge/
- /erbschaftssteuer/erbschaftssteuererklaerung/
- /erbschaftssteuer/
- /eigentumswohnung/
- /erbschaftssteuer/berliner-testament/
- /grundsteuer/
- /haus-verkaufen/
- /haus-verkaufen/energieausweis/
- /grunderwerbsteuer/
- /immobilienverrentung/
- /immobilienverrentung/teilverkauf/
- /immobilienverrentung/leibrente/
- /haus-ueberschreiben/
- /erbschaftssteuer/kinder/
- /grundsteuer/hebesatz-grundsteuer/
- /kosten-einer-scheidung/
- /baufinanzierung/nebenkosten-hauskauf/
- /baufinanzierung/immobilienbewertung/
- /eigentumswohnung/hausgeld/
- /baufinanzierung/notarkosten-haus/
- /eigentumswohnung/sondereigentum/
- /eigentumswohnung/sondernutzungsrecht/
- /eigentumswohnung/eigentuemerversammlung/
