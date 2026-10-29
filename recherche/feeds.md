# Gesetzes- und Marktradar – geprüfte RSS-/Atom-Feeds (Stand 29.10.2026)

Zielgruppe: Immobilienmakler + Fix-&-Flip-Investor in Baden-Württemberg (Leonberg/Pforzheim/Ditzingen/Renningen/Heimsheim).
Prüfmethode: `curl -sL -m 25 -A "Mozilla/5.0 …" -w "%{http_code}"` + Zählung von `<item>`/`<entry>` + Auslesen des ersten Items (Titel, pubDate).
Alle Angaben in Spalte „Status“ sind der tatsächlich gemessene HTTP-Code. „000“ = Verbindung aus dieser Umgebung nicht möglich (Proxy/CONNECT-Fehler), „403/503“ = Bot-Schutz (nicht umgangen).

Hinweis: Das WebSearch-Budget war während der Recherche ausgeschöpft; Feed-URLs wurden daher überwiegend direkt aus dem HTML der Seiten (`<link rel="alternate">`, RSS-Übersichtsseiten) extrahiert und anschließend per curl verifiziert.

Legende Relevanz: 5 = Pflicht (direkt gesetzes-/marktrelevant), 1 = Hintergrund. Prüffrequenz = empfohlenes Poll-Intervall im Reader/Radar.

---

## 1. Tabelle aller geprüften Quellen

### A. Gesetzgebung & Regierung

| Quelle | Kategorie | Feed-URL | Status | Items | Neuestes Item (Datum) | Alternative (Newsletter/HTML) | Relevanz | Prüffrequenz |
|---|---|---|---|---|---|---|---|---|
| Bundesgesetzblatt Teil I (recht.bund.de) | A | https://www.recht.bund.de/rss/feeds/rss_bgbl-1.xml | 200 | 500 | „Bekanntmachung über das Vorliegen der technischen Voraussetzungen …“ (2026-10-29) | Übersicht: https://www.recht.bund.de/de/serviceseiten/rss/rss_node.html | 5 | täglich |
| Bundesgesetzblatt Teil II | A | https://www.recht.bund.de/rss/feeds/rss_bgbl-2.xml | 200 | 500 | „Bekanntmachung über den Geltungsbereich der Änderung des Montrealer Protokolls …“ (2026-10-28) | – | 2 | wöchentlich |
| gesetze-im-internet.de „Aktuell“ | A | kein Feed (`/aktuell.rss` → 404) | 404 | – | – | HTML: https://www.gesetze-im-internet.de/aktuell.html (200, scrapebar); BGBl-I-Feed deckt Inhalt ab | 3 | wöchentlich (HTML) |
| Bundestag – hib „heute im bundestag“ (alle) | A | https://www.bundestag.de/static/appdata/includes/rss/hib.rss | 200 | 15 | „Schäden durch Rapserdfloh“ (29.10.2026) | RSS-Übersicht: https://www.bundestag.de/rss | 4 | täglich |
| Bundestag – hib Bauen/Wohnen/Stadtentwicklung/Kommunen | A | https://www.bundestag.de/static/appdata/includes/rss/bauwohnenstadtentwicklungkommunen.rss | 200 | 15 | „Kein Anlass zur Änderung der Baunutzungsverordnung“ (Feed ohne pubDate) | – | 5 | täglich |
| Bundestag – hib Recht | A | https://www.bundestag.de/static/appdata/includes/rss/recht.rss | 200 | 15 | „Arbeit des Bundesopferbeauftragten“ (ohne pubDate) | – | 4 | täglich |
| Bundestag – hib Finanzen | A | https://www.bundestag.de/static/appdata/includes/rss/finanzen.rss | 200 | 15 | „Zuwendungsdatenbank des Bundes kein öffentliches Register“ (ohne pubDate) | – | 3 | täglich |
| Bundestag – Pressemitteilungen | A | https://www.bundestag.de/static/appdata/includes/rss/pressemitteilungen.rss | 200 | 15 | „Öffentliche Anhörungen und Ausschusssitzungen in der Sitzungswoche vom 2. bis 6. November“ (28.10.2026) | – | 3 | täglich |
| Bundestag – Tagesordnungen (Plenum/Ausschüsse) | A | https://www.bundestag.de/static/appdata/includes/rss/tagesordnungen.rss | 200 | 15 | „Digitales, Staatsmodernisierung: Tagesordnung der 37. Sitzung …“ (04.11.2026) | – | 3 | wöchentlich |
| Bundestag – Drucksachen | A | https://www.bundestag.de/static/appdata/includes/rss/drucksachen.rss | 200 | 15 | „21/8854: Unterrichtung Haushaltsführung 2026 …“ (29.10.2026) | – | 3 | täglich (Filter: Gesetzentwurf, Miet, Bau, Grundst, WEG) |
| Bundesrat – PlenumKOMPAKT (Ergebnisse der Plenarsitzungen) | A | https://www.bundesrat.de/SiteGlobals/Functions/RSSFeed/RSSGenerator_top_plenumkompakt.xml | 200 | 28 | „16.10.2026 – Neuer Präsident, Schutz kritischer Infrastruktur und Recht auf Vergessenwerden“ (16.10.2026) | RSS-Übersicht: https://www.bundesrat.de/DE/service-navi/rss/rss-node.html | 5 | nach jeder Plenarsitzung (ca. 3-wöchig) |
| Bundesrat – Eingegangene Beratungsvorgänge | A | https://www.bundesrat.de/SiteGlobals/Functions/RSSFeed/RSSGenerator_Announcement.xml | 200 | 50 | „444/26 – Neubenennung von Beauftragten des Bundesrates …“ (pubDate 17.12.2026 = Beratungstermin) | – | 4 | täglich |
| Bundesrat – Zuletzt veröffentlichte Drucksachen | A | https://www.bundesrat.de/SiteGlobals/Functions/RSSFeed/RSSGenerator_PBPrintout.xml | 200 | 150 | „616/26 – Vorschlag für eine Verordnung des Europäischen Parlaments …“ (26.10.2026) | – | 4 | täglich |
| Bundesrat – Aktuelle Termine | A | https://www.bundesrat.de/SiteGlobals/Functions/RSSFeed/RSSGenerator_Event.xml | 200 | 33 | „16.10.2026 – Umfrage 12/26 des Ausschusses für Verteidigung“ (16.10.2026) | – | 2 | wöchentlich |
| Bundesrat – Plenarprotokolle | A | https://www.bundesrat.de/SiteGlobals/Functions/RSSFeed/RSSGenerator_Publication.xml | 200 | 5 | „Plenarprotokoll 1069. Sitzung, 16.10.2026“ (16.10.2026) | – | 2 | monatlich |
| Bundesregierung – Pressemitteilungen | A | https://www.bundesregierung.de/service/rss/breg-de/1151244/feed.xml | 200 | 20 | „Bundeskanzler Merz zum EU-Kanada-Gipfel“ (29.10.2026) | Übersicht: https://www.bundesregierung.de/breg-de/service/newsletter-und-abos/rss-newsfeed | 3 | täglich |
| Bundesregierung – kompakt (Kabinettsbeschlüsse etc.) | A | https://www.bundesregierung.de/service/rss/breg-de/1151242/feed.xml | 200 | 20 | „Bundeskanzler Merz zum EU-Kanada-Gipfel“ (29.10.2026) | – | 3 | täglich |
| Bundesregierung – Artikel | A | https://www.bundesregierung.de/service/rss/breg-de/1151246/feed.xml | 200 | 20 | „Junge Menschen debattieren Europas Zukunft“ (29.10.2026) | – | 2 | täglich |
| BMJV – Gesetzgebungsverfahren | A | https://www.bmjv.de/SiteGlobals/Functions/RSSNewsfeed/DE/RSSNewsfeed/RSSNewsfeedGesetzgebungsverfahren.xml | 200 | 81 | „Gesetz zur Modernisierung des Designrechts“ (14.11.2025 – Feed wird nur bei Verfahrensstart aktualisiert) | Übersicht: https://www.bmjv.de/DE/presse/newsletter/rssnewsfeed/rss_node.html | 5 | täglich |
| BMJV – Pressemitteilungen | A | https://www.bmjv.de/SiteGlobals/Functions/RSSNewsfeed/DE/RSSNewsfeed/RSSNewsfeedPressemitteilungen.xml | 200 | 100 | „Wohnungseigentümerinnen und -eigentümer gefragt: Muss sich im WEG etwas ändern?“ (26.10.2026); davor „Gesetzentwurf zum Bauen nach dem Gebäudetyp E vorgelegt“ (26.10.2026) | – | 5 | täglich |
| BMWSB (Bauministerium) – Newsfeed | A | https://www.bmwsb.bund.de/DE/tools-services/rssfeed/_functions/rssnewsfeed.xml | 200 | 20 | „Im Freizeitbad Issum entsteht ein neues Funktionsgebäude“ (15.10.2026) | – | 5 | täglich |
| BMF (Bundesfinanzministerium) – Feeds + BMF-Schreiben | A | laut BMF-RSS-Seite existieren Feeds „Aktuelles“, „Pressemitteilungen“, „Steuern (inkl. BMF-Schreiben)“ – **alle Abrufe (RSS-Seite, Feed-URLs, Newsletter-Seite) liefern 503 „Security Check“ (Bot-Schutz)** | 503 | – | – | Ersatz: Haufe Steuern-Feed (unten), Google-News-RSS „BMF-Schreiben Immobilien“ (200, 10 Items), LTO Steuerrecht. Newsletter-Anmeldung im Browser: https://www.bundesfinanzministerium.de/Web/DE/Service/Abonnements/Newsletter/newsletter.html (hier 503) | 4 | – (Ersatz täglich) |
| BMWE/BMWK (Wirtschaftsministerium) | A | RSS-Seite https://www.bundeswirtschaftsministerium.de/Navigation/DE/Service/RSS/rss.html liefert nur Radware-Browser-Check; Feed-URLs nicht extrahierbar | 200 (Bot-Check) | – | – | Ersatz: Bundesregierung-Feeds, Google-News-RSS „Wirtschaftsministerium Förderung Gebäude“; BMWE-Newsletter im Browser abonnieren | 2 | – |
| Landtag BW – Pressemitteilungen | A | https://www.landtag-bw.de/blueprint/servlet/service/rss/de/509988/feed.rss | 200 | 20 | „Landtagsvizepräsidentin Aras: ‚Das Verständnis der Vergangenheit …‘“ (Okt. 2026) | HTML: https://www.landtag-bw.de/de/aktuelles | 3 | täglich |
| Landtag BW – Neue Drucksachen | A | https://www.landtag-bw.de/blueprint/servlet/service/rss/de/509930/feed.rss | 200 | 20 | „Polizeibilanz des Schäferlaufs 2026 in Markgröningen“ (28.10.2026) | – | 3 | täglich (Filter: Wohnen, Bau, Grunderwerbsteuer, Mietpreis) |
| Landtag BW – Plenarprotokolle | A | https://www.landtag-bw.de/blueprint/servlet/service/rss/de/509986/feed.rss | 200 | 20 | „13. Sitzung vom 8.10.2026“ (07.10.2026) | – | 2 | monatlich |
| Landesregierung BW – alle Meldungen | A | https://www.baden-wuerttemberg.de/de/service/rss/xml/rss-alle-meldungen | 200 | 50 | „Über 1.100 neue Polizisten feierlich vereidigt“ (29.10.2026) | RSS-Übersicht: https://www.baden-wuerttemberg.de/de/service/rss/ ; Newsletter: https://www.baden-wuerttemberg.de/de/service/newsletter | 3 | täglich |
| Landesregierung BW – Wirtschaft, Arbeit, Finanzen (enthält FM-BW-Meldungen) | A | https://www.baden-wuerttemberg.de/de/service/rss/xml/rss-wirtschaft-arbeit-finanzen | 200 | 50 | „Strukturreform der Steuerverwaltung“ (28.10.2026) | – | 4 | täglich |
| Landesregierung BW – Energie, Umwelt, Verkehr | A | https://www.baden-wuerttemberg.de/de/service/rss/xml/rss-energie-umwelt-verkehr | 200 | 50 | „Carsharing-Förderung diesmal auch für Hybridfahrzeuge“ (26.10.2026) | – | 3 | täglich |
| Ministerium für Landesentwicklung und Wohnen BW (MLW) | A | https://mlw.baden-wuerttemberg.de/de/service/rss-feed/xml/rss-mlw | 200 | 50 | „Städtebaumaßnahme ‚Ortsmitte Geradstetten II‘ in Remshalden abgeschlossen“ (26.10.2026) | Übersicht: https://mlw.baden-wuerttemberg.de/de/service/rss-feed | 5 | täglich |
| Justizministerium BW | A | kein eigener Feed gefunden (alle /rss-Varianten 404) | 404 | – | – | Meldungen erscheinen im Landesportal-Feed „alle Meldungen“; HTML: https://www.justiz-bw.de/ ; Landes-Newsletter s. o. | 2 | – |
| Finanzministerium BW (Grundsteuer/GrESt) | A | kein eigener Feed gefunden (alle /rss-Varianten 404) | 404 | – | – | Meldungen erscheinen im Landesportal-Feed „Wirtschaft, Arbeit, Finanzen“; HTML: https://fm.baden-wuerttemberg.de/de/service/presse (200) | 4 | – (über Landesportal täglich) |

### B. Gerichte & Rechtsnachrichten

| Quelle | Kategorie | Feed-URL | Status | Items | Neuestes Item (Datum) | Alternative (Newsletter/HTML) | Relevanz | Prüffrequenz |
|---|---|---|---|---|---|---|---|---|
| BGH – Pressemitteilungen | B | https://www.bundesgerichtshof.de/DE/Service/RSSFeed/Function/RSS_PM.xml | 200 | 100 | „Ansprüche gegen den Abschlussprüfer fallen nicht in den Anwendungsbereich des KapMuG“ (29.10.2026) | – | 5 | täglich (Filter: „V ZR“, „VIII ZR“, „I ZR“ Makler, Miet, WEG) |
| BGH – Entscheidungen (Volltexte) | B | https://www.bundesgerichtshof.de/DE/Service/RSSFeed/Function/RSS_EN.xml | 200 | 100 | „6 StR 309/26, Entscheidung vom 14.10.2026“ (29.10.2026) | – | 4 | täglich (Filter auf „V ZR“/„VIII ZR“) |
| BFH – Pressemitteilungen | B | https://www.bundesfinanzhof.de/de/news.rss | 200 | 30 | „Voraussetzungen für den Eintritt der Ablaufhemmung durch den Beginn von Ermittlungen der Steuerfahndung“ (29.10.2026) | Übersicht: https://www.bundesfinanzhof.de/de/rss-feed/ | 4 | täglich |
| BFH – Entscheidungen | B | https://www.bundesfinanzhof.de/de/precedent.rss | 200 | 6 | „VI R 4/25“ (29.10.2026) | – | 3 | wöchentlich (Filter: „II R“ GrESt/ErbSt, „IX R“ V+V, „X R“ gewerblicher Grundstückshandel) |
| BVerfG | B | kein RSS-Feed vorhanden (Startseite verweist nur auf Newsletter) | – | – | – | Newsletter: https://www.bundesverfassungsgericht.de/DE/Service/Newsletter/newsletter_node.html (200) | 2 | – |
| OLG Stuttgart / OLG Karlsruhe | B | olg-stuttgart.justiz-bw.de / olg-karlsruhe.justiz-bw.de aus dieser Umgebung nicht erreichbar (CONNECT 502 → „000“); kein Feed bekannt | 000 | – | – | HTML-Pressemitteilungen auf den OLG-Seiten; Ersatz: LTO/beck-aktuell/Haufe-Feeds + Google-News-RSS „OLG Stuttgart Urteil Immobilie“ | 3 | wöchentlich |
| Finanzgericht BW | B | https://finanzgericht-bw.justiz-bw.de/ erreichbar (200), kein Feed gefunden | 200 (HTML) | – | – | HTML-Pressemitteilungen; Ersatz: Haufe Steuern, LTO | 2 | monatlich |
| LTO – Nachrichten | B | https://www.lto.de/rss/nachrichten-rss/feed.xml | 200 | 30 | „BFH zur Verjährung im Steuerrecht: Steuerfahndung schweigt – Finanzamt geht leer aus“ (29.10.2026) | Übersicht: https://www.lto.de/rss ; Newsletter: https://www.lto.de/newsletter | 4 | täglich |
| LTO – Rechtsgebiet Miet- und WEG-Recht | B | https://www.lto.de/?type=200&tx_ltorss_pi1%5Brechtsgebiet%5D=16 | 200 | 5 | „LG Berlin II gegen den BGH: Der ewige Streit um die Schonfristzahlung“ (23.10.2026) | – | 5 | täglich |
| LTO – Rechtsgebiet Immobilienwirtschaftsrecht | B | https://www.lto.de/?type=200&tx_ltorss_pi1%5Brechtsgebiet%5D=127 | 200 | 5 | „Bau- und Immobilienrecht: Doppelzugang bei Forvis Mazars“ (01.10.2026) | – | 3 | täglich |
| LTO – Rechtsgebiet Bau- und Architektenrecht | B | https://www.lto.de/?type=200&tx_ltorss_pi1%5Brechtsgebiet%5D=04 | 200 | 5 | (Feed funktioniert; Zuordnung „04 = Bau- und Architektenrecht“ laut LTO-RSS-Übersicht) | – | 3 | täglich |
| beck-aktuell | B | https://www.beck-aktuell.de/rss.xml | 200 | 20 | „BND darf Auskunft zu Corona-Ursprung verweigern“ (29.10.2026) | Newsletter: https://www.beck-aktuell.de/newsletter (200) | 4 | täglich |
| juris Nachrichten | B | www.juris.de aus dieser Umgebung nicht erreichbar (000); kein öffentlicher Feed bekannt | 000 | – | – | juris-Newsletter (kostenlos, Anmeldung auf juris.de); Ersatz: beck-aktuell + LTO | 2 | – |
| anwalt.de Rechtstipps | B | https://www.anwalt.de/ → 403 (Bot-Schutz) | 403 | – | – | Ersatz: Google-News-RSS „site:anwalt.de Mietrecht“ | 2 | – |
| Haufe Recht | B | https://www.haufe.de/xml/rss_129128.xml | 200 | 30 | „BGH: Rückgabe der Mietsache durch Schlüsseleinwurf“ (29.10.2026) | Übersicht: https://www.haufe.de/rss-haufe_24_129208.html | 5 | täglich |
| Haufe Steuern (Ersatz für BMF-Schreiben) | B | https://www.haufe.de/xml/rss_129148.xml | 200 | 30 | „BFH Pressemitteilung: Flugzeug am Stationierungsflughafen …“ (29.10.2026) | – | 4 | täglich |

### C. Wirtschaft, Zinsen, Förderung

| Quelle | Kategorie | Feed-URL | Status | Items | Neuestes Item (Datum) | Alternative (Newsletter/HTML) | Relevanz | Prüffrequenz |
|---|---|---|---|---|---|---|---|---|
| Bundesbank – Pressemitteilungen | C | https://www.bundesbank.de/service/rss/de/633286/feed.rss | 200 | 10 | „Pressekonferenz am 29. Oktober 2026 – Erklärung zur Geldpolitik“ (29.10.2026) | Übersicht: https://www.bundesbank.de/de/startseite/rss | 4 | täglich |
| Bundesbank – Themen (Monatsbericht-Themen, Wohnimmobilienpreise, Statistik) | C | https://www.bundesbank.de/service/rss/de/633288/feed.rss | 200 | 10 | „Insurance corporations“ (29.10.2026) | – | 3 | täglich |
| Bundesbank – Reden/Interviews | C | https://www.bundesbank.de/service/rss/de/633282/feed.rss | 200 | 10 | „Capital needs AI, and AI needs capital …“ (29.10.2026) | – | 2 | wöchentlich |
| Bundesbank – EZB-Veröffentlichungen (deutsch, inkl. geldpolitische Sitzungszusammenfassung) | C | https://www.bundesbank.de/service/rss/de/633278/feed.rss | 200 | 1 | „Zusammenfassung der geldpolitischen Sitzung des EZB-Rates am 9.–10.9.“ (08.10.2026) | https://www.bundesbank.de/service/rss/de/800838/feed.rss (EZB-Wirtschaftsbericht, 4 Items) | 3 | wöchentlich |
| EZB – Press releases (EN) | C | https://www.ecb.europa.eu/rss/press.html | 200 | 15 | „Piero Cipollone: Next-day securities settlement …“ (29.10.2026) | Deutsch (HTML): https://www.ecb.europa.eu/press/pr/html/index.de.html (200); RSS-Übersicht https://www.ecb.europa.eu/rss/ | 4 | täglich (Zinsentscheide an EZB-Ratstagen) |
| Destatis – Aktuell (alle Pressemitteilungen, inkl. Häuserpreisindex, Baupreise, Baugenehmigungen) | C | https://www.destatis.de/SiteGlobals/Functions/RSSFeed/DE/RSSNewsfeed/Aktuell.xml | 200 | 10 | „65 Jahre Anwerbeabkommen mit der Türkei …“ (29.10.2026) | nur dieser eine Feed auf https://www.destatis.de/DE/Service/RSS/_inhalt.html ; Themen-Feeds (Preise/Bauen) existieren nicht (404) | 4 | täglich (Filter: Häuserpreis, Baupreis, Baugenehmig, Wohnung) |
| ifo Institut | C | https://www.ifo.de/rss | 200 | 50 | „IT-Azubis können mit KI Aufgaben auf Hochschulniveau lösen“ (29.10.2026) | – | 2 | wöchentlich (Filter: Wohnungsbau, Geschäftsklima) |
| IW Köln – Immobilienmärkte | C | https://www.iwkoeln.de/rss/immobilienmaerkte.xml | 200 | 10 | „IW-Wohnindex: Kaufpreise in den sieben teuersten Städten sinken“ (23.10.2026) | Übersicht: https://www.iwkoeln.de/rss.html | 4 | wöchentlich |
| IW Köln – Pressemitteilungen | C | https://www.iwkoeln.de/rss/iw-pressemitteilungen.xml | 200 | 10 | „IW-Wohnindex: Kaufpreise in den sieben teuersten Städten sinken“ (23.10.2026) | – | 3 | wöchentlich |
| DIW – Presse | C | https://www.diw.de/de/rss_press.xml | 200 | 20 | „DIW-Konjunkturbarometer springt im Oktober über 100-Punkte-Marke“ (28.10.2026) | https://www.diw.de/de/rss_news.xml (20 Items); Übersicht https://www.diw.de/de/diw_01.c.441092.de/seiten/rss-feeds.html | 2 | wöchentlich |
| empirica | C | kein Feed | – | – | – | Newsletter: https://www.empirica-institut.de/newsletter/ (200) | 3 | Newsletter |
| vdp (Pfandbriefbanken, Immobilienpreisindex) | C | kein Feed | – | – | – | Newsletter: https://www.pfandbrief.de/vdp-newsletter/ (200); Presse-HTML: https://www.pfandbrief.de/presse/ | 4 | Newsletter / HTML quartalsweise |
| Interhyp (Zinskommentar) | C | kein Feed | – | – | – | Newsletter: https://www.interhyp.de/newsletter/ (200); News-HTML: https://www.interhyp.de/ratgeber/news/ | 3 | Newsletter / HTML wöchentlich |
| Dr. Klein (Zinskommentar) | C | kein Feed | – | – | – | Zinskommentar-HTML: https://www.drklein.de/zinskommentar.html (200); Presse: https://www.drklein.de/presse.html | 3 | HTML monatlich |
| KfW (Förderprogramme) | C | kein Feed (alle RSS-Pfade 404; Newsroom verlinkt keinen) | 404 | – | – | Presse-HTML: https://www.kfw.de/Über-die-KfW/Newsroom/Aktuelles/Pressemitteilungen/index.jsp (200); Förderübersicht: https://www.kfw.de/inlandsfoerderung/ ; Ersatz-Feed: Google-News-RSS „KfW Förderung Wohngebäude“ | 4 | HTML wöchentlich |
| BAFA (Heizung/Sanierung) | C | https://www.bafa.de/DE/Service/RSSNewsfeed/_functions/rssnewsfeed.xml | 200 | 3 | „Neues Onlineportal für Antragstellung erweitert“ (Feed ohne Datum) | Übersicht: https://www.bafa.de/DE/Service/RSSNewsfeed/rssnewsfeed_node.html | 3 | wöchentlich |
| dena | C | kein Feed | – | – | – | Newsletter „dena kompakt“: https://www.dena.de/newsletter-dena-kompakt-anmeldung/ (200); Presse: https://www.dena.de/infocenter/pressebereich/ | 2 | Newsletter |

### D. Branche & Verbände

| Quelle | Kategorie | Feed-URL | Status | Items | Neuestes Item (Datum) | Alternative (Newsletter/HTML) | Relevanz | Prüffrequenz |
|---|---|---|---|---|---|---|---|---|
| IVD (Bundesverband) | D | https://ivd.net/feed/ | 200 | 10 | „Untitled_8“ (29.10.2026) – Titel im Feed teils unsauber | – | 4 | täglich |
| ZIA | D | kein Feed (`/feed/` 404) | 404 | – | – | Newsroom-HTML: https://zia-deutschland.de/newsroom (200); Newsletter: https://zia-deutschland.de/newsletter/ (200) | 3 | Newsletter |
| GdW | D | https://www.gdw.de/feed/ | 200 | 10 | „GdW Europabrief 11/2026“ (27.10.2026) | Presse: https://www.gdw.de/pressecenter/pressemeldungen/ | 2 | wöchentlich |
| Haus & Grund Deutschland | D | https://www.hausundgrund.de/rss/rss.xml | 200 | 367 | „Gebäudetyp E: Einfaches Bauen bleibt kompliziert“ (26.10.2026) | – | 5 | täglich |
| Haus & Grund Württemberg | D | kein Feed; https-Aufruf schlägt fehl, http funktioniert | 200 (http) | – | HTML: „Mietpreisbegrenzungsverordnung in Baden-Württemberg ab 2027“ (22.10.2026) | HTML: http://www.hausundgrund-wuerttemberg.de/presse.html bzw. https://www.hugw.de/presse.html (200) | 5 | HTML wöchentlich (scrapen: Links `presse_###_*.html`) |
| Deutscher Mieterbund | D | https://www.mieterbund.de/feed/ | 200 | 0 (Feed leer) | – | Presse-HTML: https://mieterbund.de/presse/ (200); Newsletter: https://mieterbund.de/aktuelles/newsletter/ (200) | 2 | Newsletter |
| BVI (Verwalter) – Pressemitteilungen | D | https://bvi-verwalter.de/share/pressemitteilungen.xml | 200 | 86 | „TKG-Novelle: BVI warnt vor Konflikten in Wohnungseigentümergemeinschaften“ (12.10.2026) | Magazin-Feed: https://bvi-verwalter.de/share/magazin.xml (13 Items) | 3 | wöchentlich |
| VDIV | D | kein Feed (`/feed`, `/rss.xml` liefern HTML) | – | – | – | Newsletter: https://vdiv.de/aktuelles/vdivnewsletter (200); Presse: https://vdiv.de/presse (200) | 3 | Newsletter |
| Immobilien Zeitung | D | 403 (Cloudflare „Just a moment“) | 403 | – | – | Ersatz-Feed: https://news.google.com/rss/search?q=site:immobilien-zeitung.de&hl=de&gl=DE&ceid=DE:de (200, 82 Items); IZ-Newsletter im Browser: https://www.immobilien-zeitung.de/newsletter | 4 | täglich (Google-News) |
| Haufe Immobilien (= immobilienwirtschaft.de) | D | https://www.haufe.de/xml/rss_129130.xml | 200 | 30 | „Iran-Krieg heizt Preise an: Zinspause: Warum die EZB nichts überstürzt“ (29.10.2026) | immobilienwirtschaft.de verlinkt denselben Feed | 5 | täglich |
| Immobilienmanager | D | https://www.immobilienmanager.de/rss | 200 | 1000 | „Kritis verändert die Immobilienwelt“ (29.10.2026) | Newsletter: https://www.immobilienmanager.de/newsletter/ | 3 | täglich |
| Sprengnetter News | D | https://www.sprengnetter.de/feed/ | 200 | 10 | „September-Analyse: Kaufpreise weiter ohne große Ausschläge“ (23.10.2026) | – | 4 | wöchentlich |
| PriceHubble | D | kein Feed (`/de/blog/rss.xml` 404) | 404 | – | – | Blog-HTML: https://www.pricehubble.com/de/blog (200) | 2 | HTML monatlich |
| ImmoScout24 Presse/Marktberichte | D | kein Feed | – | – | – | HTML: https://www.immobilienscout24.de/unternehmen/studien-pressematerial/ (200); Ersatz: Google-News-RSS „ImmoScout24 Kaufpreise“ | 3 | HTML monatlich |
| Immowelt Presse | D | 403 (Bot-Schutz) | 403 | – | – | Ersatz: Google-News-RSS „Immowelt Analyse Preise“ | 3 | Google-News täglich |
| Homeday Preisatlas | D | kein Feed | – | – | – | HTML: https://www.homeday.de/de/preisatlas/ (200) | 2 | HTML quartalsweise |
| McMakler Presse | D | 403 (Bot-Schutz) | 403 | – | – | Ersatz: Google-News-RSS „McMakler“ | 2 | Google-News |
| Finanztip | D | kein Feed (`/feed/` liefert HTML, `/rss.xml` 404) | – | – | – | Newsletter: https://www.finanztip.de/newsletter/ (200) | 3 | Newsletter |
| Stiftung Warentest / test.de – alle Inhalte | D | https://www.test.de/rss/alles/ | 200 | 200 | „DWS Grundbesitz Europa: Krise bei offenen Immobilienfonds verschärft sich“ (29.10.2026) | https://www.test.de/rss/news/ (7 Items); keine Immobilien-Rubrik als eigener Feed → im Reader filtern (Immobilie, Baufinanzierung, Grundsteuer) | 2 | täglich |
| Verbraucherzentrale BW | D | kein Feed (`/rss.xml`, `/feed` 404) | 404 | – | – | Newsletter: https://www.verbraucherzentrale-bawue.de/newsletter (200); Presse: https://www.verbraucherzentrale-bawue.de/presse | 2 | Newsletter |

### E. Regional (Region Stuttgart / Nordschwarzwald)

| Quelle | Kategorie | Feed-URL | Status | Items | Neuestes Item (Datum) | Alternative (Newsletter/HTML) | Relevanz | Prüffrequenz |
|---|---|---|---|---|---|---|---|---|
| Stuttgarter Zeitung / Stuttgarter Nachrichten | E | kein RSS (alle gängigen Pfade 404) | 404 | – | – | Ersatz-Feeds: Google-News-RSS „site:stuttgarter-zeitung.de Immobilien“, „Leonberg Bebauungsplan“, „Böblingen Wohnungsmarkt“ | 3 | Google-News täglich |
| Leonberger Kreiszeitung | E | Teil der StZ-Plattform, kein Feed (`/rss` liefert HTML-Seite „Leonberg“) | 200 (HTML) | – | – | HTML: https://www.leonberger-kreiszeitung.de/ ; Ersatz: Google-News-RSS „site:leonberger-kreiszeitung.de“ | 3 | Google-News täglich |
| Pforzheimer Zeitung (pz-news.de) | E | kein Feed (alle Pfade 404) | 404 | – | – | Newsletter: https://www.pz-news.de/newsletter.html (200); Ersatz: Google-News-RSS „site:pz-news.de Immobilien“ | 3 | Newsletter / Google-News |
| Ludwigsburger Kreiszeitung – Kreis Ludwigsburg | E | https://www.lkz.de/feed/7-RSS_Feed_Kreis_Ludwigsburg.xml | 200 | 10 | „‚Wir sind unendlich dankbar‘: Nach dem Feuer-Schock …“ (Okt. 2026) | Stadt Ludwigsburg: https://www.lkz.de/feed/6-RSS_Feed_Stadt_Ludwigsburg.xml (200, 10); Übersicht https://www.lkz.de/rssfeed.html | 2 | täglich (Filter: Ditzingen, Bebauungsplan, Wohnbau) |
| Gutachterausschuss Leonberg (Bodenrichtwerte, Marktbericht) | E | kein Feed | – | – | – | HTML: https://www.leonberg.de/Wirtschaft-Bauen/Rund-ums-Bauen/Gutachterausschuss/ (200) | 4 | HTML quartalsweise |
| Gutachterausschuss Pforzheim | E | kein Feed | – | – | – | HTML: https://www.pforzheim.de/stadt/bauen-stadtentwicklung/gutachterausschuss.html (200) | 4 | HTML quartalsweise |
| Gemeinsamer Gutachterausschuss Strohgäu (Ditzingen) | E | kein Feed | – | – | – | HTML: https://www.ditzingen.de/bauen-wirtschaft/gutachterausschuss (200; Marktbericht 2024 als PDF verlinkt) | 4 | HTML quartalsweise |
| Renningen – Grundstücksbewertung/Gutachterausschuss | E | kein Feed | – | – | – | HTML: https://www.renningen.de/stadtentwicklung/grundstuecke-immobilien/grundstuecksbewertung/ (Seite im Site-Menü vorhanden; Direktaufruf aus dieser Umgebung 000) | 3 | HTML quartalsweise |
| BORIS-BW (Bodenrichtwerte) | E | kein Feed | – | – | – | HTML/Portal: https://www.boris-bw.de/ (200) – Bodenrichtwerte werden zum 1.1. ungerader Jahre fortgeschrieben | 4 | HTML halbjährlich |
| Stadt Leonberg – Amtsblatt / Bekanntmachungen / Presse | E | kein Feed | – | – | – | Amtsblatt-Newsletter: https://www.leonberg.de/Bürger-Stadt/Aktuelles/Amtsblatt/Newsletter-Amtsblatt/ (200); Bekanntmachungen: https://www.leonberg.de/Bürger-Stadt/Aktuelles/Nachrichten/Öffentliche-Bekanntmachungen/ ; Presse: https://www.leonberg.de/Bürger-Stadt/Aktuelles/Pressebereich/ ; Newsletter: https://www.leonberg.de/Bürger-Stadt/Aktuelles/Newsletter/ | 4 | Newsletter wöchentlich / HTML scrapen |
| Stadt Pforzheim – Pressemeldungen | E | kein Feed | – | – | – | HTML: https://www.pforzheim.de/stadt/aktuelles/pressemeldungen.html (200) | 3 | HTML wöchentlich |
| Stadt Ditzingen – Bekanntmachungen / Immobilienverkäufe | E | kein Feed | – | – | – | Bekanntmachungen: https://www.ditzingen.de/service-rathaus/oeffentliche-bekanntmachungen-1 (200); städtische Immobilien-/Grundstücksverkäufe: https://www.ditzingen.de/leben-wohnen/wohnen/immobilien-und-grundstuecksverkaeufe (200); Newsletter: https://www.ditzingen.de/info-aktuelles/nachrichten/newsletter | 4 | HTML wöchentlich |
| Stadt Renningen – Bekanntmachungen | E | kein Feed | – | – | – | HTML: https://www.renningen.de/rathaus/oeffentliche-bekanntmachungen/ (Startseite 200 via http-Redirect; Unterseiten aus dieser Umgebung 000) | 3 | HTML wöchentlich |
| Stadt Heimsheim – Amtsblatt / Bebauungspläne | E | kein Feed | – | – | – | Amtsblatt-Archiv: https://www.heimsheim.de/rathaus-service/heimsheimer-amtsblatt/archiv (200); Bebauungspläne: https://www.heimsheim.de/leben-wohnen/bauen-entwickeln/bebauungsplaene (200) | 3 | HTML wöchentlich |
| IHK Region Stuttgart – Aktuelle Meldungen | E | https://www.ihk.de/blueprint/servlet/feed/4742948 | 200 | 4 | „Erstattung zurückgezahlter Corona-Soforthilfen“ (12.02.2026) | Newsletter: https://www.ihk.de/stuttgart/newsletter (200) | 2 | wöchentlich |
| IHK Region Stuttgart – Bezirkskammer Böblingen | E | https://www.ihk.de/blueprint/servlet/feed/667526 | 200 | 15 | „Personalien – was tut sich in den Unternehmen?“ (13.01.2026) | Bezirkskammer Ludwigsburg: https://www.ihk.de/blueprint/servlet/feed/667520 (200, 20 Items, 28.10.2026) | 2 | wöchentlich |
| IHK Nordschwarzwald – Recht und Steuern News | E | https://www.ihk.de/blueprint/servlet/feed/2605484 | 200 | 6 | „Lehrgang: Compliance Officer IHK“ (22.06.2026 – Feed enthält auch Veranstaltungen) | Newsletter: https://www.ihk.de/nordschwarzwald/newsletter (200); Pressemitteilungs-Feed 2605488 ist veraltet (letztes Item 2015) | 2 | wöchentlich |
| Statistisches Landesamt BW | E | kein Feed (alle Pfade 404) | 404 | – | HTML aktuell: „Baupreise für Wohngebäude stiegen im 3. Quartal 2026 um 7,0 %“ | Newsletter: https://www.statistik-bw.de/service/newsletter/ (200); Presse-HTML: https://www.statistik-bw.de/presse/ (200) | 4 | Newsletter / HTML wöchentlich |

### F. Google-News-/Bing-News-RSS (Alert-Ersatz)

| Quelle | Kategorie | Feed-URL | Status | Items | Neuestes Item (Datum) | Alternative | Relevanz | Prüffrequenz |
|---|---|---|---|---|---|---|---|---|
| Google News „Grunderwerbsteuer“ | F | https://news.google.com/rss/search?q=Grunderwerbsteuer&hl=de&gl=DE&ceid=DE:de | 200 | 100 | „Portugiesische Grunderwerbsteuer bei Umstrukturierungen verstößt gegen Unionsrecht“ (Okt. 2026) | – | 4 | täglich |
| Google News „Mietrecht Gesetz“ | F | https://news.google.com/rss/search?q=Mietrecht+Gesetz&hl=de&gl=DE&ceid=DE:de | 200 | 22 | „Neues Gesetz ab 2028: Vermieter müssen ihren Mietern einen Teil der Heizkosten bezahlen“ (Okt. 2026) | – | 5 | täglich |
| Google News „Gebäudeenergiegesetz“ | F | https://news.google.com/rss/search?q=Geb%C3%A4udeenergiegesetz&hl=de&gl=DE&ceid=DE:de | 200 | 100 | „Wir erklären das Gebäudemodernisierungsgesetz – WWF Deutschland“ (Okt. 2026) | – | 5 | täglich |
| Google News „Wohnungseigentumsgesetz“ | F | https://news.google.com/rss/search?q=Wohnungseigentumsgesetz&hl=de&gl=DE&ceid=DE:de | 200 | 79 | „Beschlussfallen in der WEG 2026 vermeiden: Was Verwalter beachten müssen“ (Okt. 2026) | – | 4 | täglich |
| Google News „Immobilienmarkt Baden-Württemberg“ | F | https://news.google.com/rss/search?q=Immobilienmarkt+Baden-W%C3%BCrttemberg&hl=de&gl=DE&ceid=DE:de | 200 | 30 | „Babyboomer könnten bald ihre Häuser verkaufen“ (Okt. 2026) | – | 4 | täglich |
| Google News „BMF-Schreiben Immobilien“ (BMF-Ersatz) | F | https://news.google.com/rss/search?q=BMF-Schreiben+Immobilien&hl=de&gl=DE&ceid=DE:de | 200 | 10 | „Energetische Sanierungen: BMF-Schreiben …“ (Okt. 2026) | – | 3 | täglich |
| Google News „site:immobilien-zeitung.de“ (IZ-Ersatz) | F | https://news.google.com/rss/search?q=site:immobilien-zeitung.de&hl=de&gl=DE&ceid=DE:de | 200 | 82 | „Chinesischer Logistiker mietet …“ (Okt. 2026) | – | 4 | täglich |
| Google News „Bodenrichtwerte Leonberg OR Pforzheim OR Ditzingen“ | F | https://news.google.com/rss/search?q=Bodenrichtwerte+Leonberg+OR+Pforzheim+OR+Ditzingen&hl=de&gl=DE&ceid=DE:de | 200 | 3 | (regional, wenige Treffer) | – | 3 | wöchentlich |
| Bing News „Grunderwerbsteuer“ | F | https://www.bing.com/news/search?q=Grunderwerbsteuer&format=rss | 200 | 12 | „Grunderwerbsteuer: So teuer ist sie in den Bundesländern“ (01.07.2025 – deutlich älter als Google) | – | 2 | wöchentlich |
| Bing News „Immobilienmarkt Baden-Württemberg“ | F | https://www.bing.com/news/search?q=Immobilienmarkt+Baden-W%C3%BCrttemberg&format=RSS&setlang=de&cc=DE | 200 | 3 | „Mietspiegel und Immobilienpreise von Baden…“ | – | 2 | wöchentlich |

Empfohlene weitere Google-News-Suchbegriffe (gleiches URL-Muster, nicht einzeln getestet): „Mietpreisbremse Baden-Württemberg“, „Grundsteuer Baden-Württemberg“, „Vorkaufsrecht Satzung Leonberg“, „Bebauungsplan Pforzheim“, „Gebäudetyp E Gesetz“, „KfW Förderung Wohngebäude“, „Spekulationsfrist Immobilien“, „Maklerprovision Gesetz“, „Immowelt Preise“, „OLG Stuttgart Urteil Immobilie“.

---

## 2. OPML

Alle funktionierenden Feeds (Status 200, ≥1 Item) nach Kategorie gruppiert: `/tmp/claude-0/-home-user/e7214d44-0169-5a35-af11-cf04a7507b2a/scratchpad/research/feeds.opml`

---

## 3. Quellen ohne Feed – bester Ersatzweg

| Quelle | Problem | Bester Ersatzweg |
|---|---|---|
| BMF (Bundesfinanzministerium, BMF-Schreiben) | 503 Security Check (Bot-Schutz) auf allen Seiten inkl. RSS- und Newsletter-Seite | (1) Im Browser Newsletter abonnieren: https://www.bundesfinanzministerium.de/Web/DE/Service/Abonnements/Newsletter/newsletter.html ; (2) Haufe-Steuern-Feed https://www.haufe.de/xml/rss_129148.xml ; (3) Google-News-RSS „BMF-Schreiben Immobilien“ |
| BMWE (Wirtschaftsministerium) | Radware-Bot-Check auf RSS-Seite | Bundesregierungs-Feeds + Google-News-RSS; BMWE-Newsletter im Browser abonnieren |
| gesetze-im-internet.de „Aktuell“ | kein Feed | HTML scrapen: https://www.gesetze-im-internet.de/aktuell.html (einfache Liste); inhaltlich durch BGBl-I-Feed abgedeckt |
| BVerfG | kein Feed | E-Mail-Newsletter: https://www.bundesverfassungsgericht.de/DE/Service/Newsletter/newsletter_node.html |
| OLG Stuttgart / OLG Karlsruhe / juris | aus dieser Umgebung nicht erreichbar, kein Feed bekannt | Pressemitteilungs-Seiten der OLG im Browser; juris-Newsletter; Ersatz LTO/beck-aktuell/Haufe-Recht-Feeds + Google-News-RSS „OLG Stuttgart Urteil“ |
| anwalt.de | 403 | Google-News-RSS „site:anwalt.de Mietrecht“ |
| Justizministerium BW / Finanzministerium BW | kein eigener Feed | Landesportal-Feeds (alle Meldungen; Wirtschaft/Arbeit/Finanzen) + Landes-Newsletter https://www.baden-wuerttemberg.de/de/service/newsletter ; FM-Presse-HTML https://fm.baden-wuerttemberg.de/de/service/presse |
| empirica | kein Feed | Newsletter https://www.empirica-institut.de/newsletter/ |
| vdp | kein Feed | Newsletter https://www.pfandbrief.de/vdp-newsletter/ ; Presse-HTML https://www.pfandbrief.de/presse/ (Immobilienpreisindex quartalsweise) |
| Interhyp | kein Feed | Newsletter https://www.interhyp.de/newsletter/ ; HTML https://www.interhyp.de/ratgeber/news/ |
| Dr. Klein | kein Feed | HTML https://www.drklein.de/zinskommentar.html (monatlich) |
| KfW | kein Feed | HTML https://www.kfw.de/Über-die-KfW/Newsroom/Aktuelles/Pressemitteilungen/index.jsp ; Programmseiten https://www.kfw.de/inlandsfoerderung/ ; Google-News-RSS „KfW Förderung“ |
| dena | kein Feed | Newsletter https://www.dena.de/newsletter-dena-kompakt-anmeldung/ |
| ZIA | kein Feed | Newsletter https://zia-deutschland.de/newsletter/ ; HTML https://zia-deutschland.de/newsroom |
| Haus & Grund Württemberg | kein Feed, https defekt | HTML scrapen (http): http://www.hausundgrund-wuerttemberg.de/presse.html bzw. https://www.hugw.de/presse.html – Links folgen dem Muster `presse_<Nr>_<slug>_<JJJJMMTT>.html`, daher leicht per Regex zu überwachen |
| Deutscher Mieterbund | Feed leer (0 Items) | Newsletter https://mieterbund.de/aktuelles/newsletter/ ; HTML https://mieterbund.de/presse/ |
| VDIV | kein Feed | Newsletter https://vdiv.de/aktuelles/vdivnewsletter ; HTML https://vdiv.de/presse |
| Immobilien Zeitung | 403 Cloudflare | Google-News-RSS „site:immobilien-zeitung.de“ (82 Items); IZ-Newsletter im Browser |
| PriceHubble | kein Feed | HTML https://www.pricehubble.com/de/blog |
| ImmoScout24 | kein Feed | HTML https://www.immobilienscout24.de/unternehmen/studien-pressematerial/ ; Google-News-RSS „ImmoScout24 Kaufpreise“ |
| Immowelt / McMakler | 403 | Google-News-RSS „Immowelt Analyse“ / „McMakler“ |
| Homeday Preisatlas | kein Feed | HTML https://www.homeday.de/de/preisatlas/ (quartalsweise) |
| Finanztip | kein Feed | Newsletter https://www.finanztip.de/newsletter/ |
| Verbraucherzentrale BW | kein Feed | Newsletter https://www.verbraucherzentrale-bawue.de/newsletter |
| Stuttgarter Zeitung / Nachrichten / Leonberger Kreiszeitung | kein Feed | Google-News-RSS mit `site:`-Filter oder Ortsnamen („Leonberg Bebauungsplan“, „Böblingen Wohnungsbau“) |
| Pforzheimer Zeitung | kein Feed | Newsletter https://www.pz-news.de/newsletter.html ; Google-News-RSS „site:pz-news.de“ |
| Gutachterausschüsse Leonberg / Pforzheim / Strohgäu (Ditzingen) / Renningen | kein Feed | HTML-Seiten quartalsweise prüfen (Links in Tabelle E); Marktberichte erscheinen als PDF; Bodenrichtwerte über https://www.boris-bw.de/ |
| Städte Leonberg / Pforzheim / Ditzingen / Renningen / Heimsheim | kein Feed | Leonberg: Amtsblatt-Newsletter + Bekanntmachungs-Seite; Pforzheim: Pressemeldungs-HTML; Ditzingen: Bekanntmachungen + Newsletter + städtische Immobilienverkäufe; Renningen: Bekanntmachungs-HTML; Heimsheim: Amtsblatt-Archiv + Bebauungsplan-Seite (alle URLs in Tabelle E) |
| IHK Region Stuttgart / Nordschwarzwald | Feeds vorhanden, aber dünn/veraltet | Newsletter https://www.ihk.de/stuttgart/newsletter und https://www.ihk.de/nordschwarzwald/newsletter |
| Statistisches Landesamt BW | kein Feed | Newsletter https://www.statistik-bw.de/service/newsletter/ ; HTML https://www.statistik-bw.de/presse/ (Baupreise, Baugenehmigungen, Häuserpreise BW) |
| Bundesbank Wohnimmobilienpreise / EZB-Zinsentscheid (deutsch) | nur Sammel-Feeds | Bundesbank-Pressemitteilungs-Feed + Themen-Feed; EZB deutsch als HTML https://www.ecb.europa.eu/press/pr/html/index.de.html |

---

## 4. Top-10-Newsletter für Makler/Fix-&-Flip-Investoren in BW

1. **Haus & Grund Württemberg / Haus & Grund Deutschland** – Vermieter-/Eigentümer-Recht, Mietpreisbremse BW, Gebäudetyp E: https://www.hugw.de/ (Presse) bzw. RSS https://www.hausundgrund.de/rss/rss.xml
2. **IVD-Newsletter (Bundesverband + Region Süd)** – Maklerrecht, Provision, Markt: https://ivd.net/ (Feed https://ivd.net/feed/)
3. **Haufe Immobilien Newsletter** – Immobilienwirtschaft, Recht, Steuern: https://www.haufe.de/immobilien/ (Feeds 129130/129128/129148)
4. **vdp-Newsletter** – Immobilienpreisindex, Finanzierungsmarkt: https://www.pfandbrief.de/vdp-newsletter/
5. **Interhyp-Newsletter (Bauzins-Trendbarometer)** – Zinsentwicklung: https://www.interhyp.de/newsletter/
6. **empirica-Newsletter** – Regionale Preisindizes, Blasenindex: https://www.empirica-institut.de/newsletter/
7. **VDIV-Newsletter** – WEG-Recht und Verwalterpraxis (für Eigentumswohnungs-Flips): https://vdiv.de/aktuelles/vdivnewsletter
8. **LTO-Newsletter** – täglich Rechtsnachrichten inkl. BGH-Miet-/WEG-Urteile: https://www.lto.de/newsletter
9. **Statistisches Landesamt BW – Newsletter** – Baupreise, Baugenehmigungen, Häuserpreise in BW: https://www.statistik-bw.de/service/newsletter/
10. **Stadt Leonberg – Amtsblatt-Newsletter** (plus Ditzingen-Newsletter) – Bebauungspläne, Vorkaufsrechtssatzungen, Bekanntmachungen: https://www.leonberg.de/Bürger-Stadt/Aktuelles/Amtsblatt/Newsletter-Amtsblatt/ ; https://www.ditzingen.de/info-aktuelles/nachrichten/newsletter

Ergänzend sinnvoll: BMF-Newsletter (nur im Browser abonnierbar), dena kompakt, ZIA-Newsletter, Finanztip, beck-aktuell-Newsletter, Landesportal-BW-Newsletter.

---

## 5. Kurz-Zusammenfassung

- **Geprüft:** ca. 90 Quellen/URLs; **funktionierende Feeds: 77** (siehe OPML), davon mit höchster Relevanz (5): BGBl I, Bundestag hib Bauen/Wohnen, Bundesrat PlenumKOMPAKT, BMJV Gesetzgebung + Presse, BMWSB, MLW BW, BGH-Pressemitteilungen, LTO Miet-/WEG-Recht, Haufe Recht + Immobilien, Haus & Grund, Google-News „Mietrecht Gesetz“/„Gebäudeenergiegesetz“.
- **Bot-Schutz/nicht erreichbar:** BMF (503), BMWE (Radware), Immobilien Zeitung (403), Immowelt (403), McMakler (403), anwalt.de (403), OLG Stuttgart/Karlsruhe und juris (Proxy 000). Für alle gibt es Ersatz über Google-News-RSS, Haufe/LTO/beck-aktuell oder Newsletter.
- **Regional** gibt es praktisch keine Feeds (StZ/StN/LKZ Leonberg/PZ/Städte/Gutachterausschüsse). Ersatz: Google-News-RSS mit Orts-/`site:`-Filtern, kommunale Newsletter (Leonberg Amtsblatt, Ditzingen) und quartalsweises HTML-Monitoring der Gutachterausschuss-Seiten + BORIS-BW.
- **Google-News-RSS** funktioniert zuverlässig (alle 8 Tests 200, 3–100 Items, tagesaktuell); Bing-News-RSS liefert deutlich weniger und ältere Treffer.
