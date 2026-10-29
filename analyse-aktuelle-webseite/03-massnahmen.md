# Maßnahmen für roessler-immo.de – priorisiert

Stand: 29./30. Oktober 2026. Grundlage: `01-analyse.md` (Befunde), `02-wettbewerb.md` (was andere machen), `04-seitenplan.md` (welche Seiten entstehen sollen). Jede Maßnahme ist so beschrieben, dass eine spätere Session sie ohne Rückfrage umsetzen kann. Nummern (M1, M2 …) werden in den anderen Dokumenten referenziert.

Lesehilfe: **Hoch** = behebt ein Problem, das heute Anfragen oder Sichtbarkeit kostet, oder ist Voraussetzung für alles Weitere. **Mittel** = deutlicher Gewinn, aber nicht blockierend. **Niedrig** = Feinschliff.

---

## A. Hoch

### M1 – Von der One-Page-Ansicht zu echten Unterseiten (Architektur)
**Problem:** Eine HTML-Datei, sieben per JS umgeschaltete `<section hidden>`, Navigation aus `<button>`, `history.replaceState`. Nur eine indexierbare URL, kein Browser-Zurück, versteckter Inhalt (`01-analyse.md` 3.1).
**Umsetzung:**
1. Statischen Generator oder das vorhandene Next.js-Setup nutzen (statischer Export reicht; kein Client-Routing für Inhalte). Empfehlung: Astro oder Eleventy, weil die Seite reine Inhaltsseiten hat und kein React braucht. Wenn Next.js: `output: 'export'`, App Router, keine Client-Komponenten für Inhalt.
2. Jede heutige Ansicht wird eine Seite mit eigener URL, eigenem `<title>`, eigener Meta-Description, genau einer H1:
   - `/` Start
   - `/wohnung-verkaufen/` (heute „Immobilie verkaufen“)
   - `/direktankauf/`
   - `/ueber-mich/`
   - `/kontakt/`
   - `/impressum/`, `/datenschutz/`
3. Navigation als `<a href>`; aktive Seite mit `aria-current="page"`.
4. Weiterleitungen für die alten Hash-Links sind nicht nötig (Hashes erreichen den Server nicht), aber ein kleines Inline-Skript auf `/` sollte `#verkaufen` → `/wohnung-verkaufen/` usw. umleiten, damit gespeicherte Links weiter funktionieren.
5. Gemeinsame Bausteine (Kopf, Fuß, Kontakt-Band, CTA-Block) als Komponenten/Includes.
6. Das bestehende Design (Farben, Schriften, Abstände, Komponenten) 1:1 übernehmen; es ist gut. Nur die unter M4 beschriebenen Mobil-Änderungen einbauen.
**Akzeptanz:** Jede Seite hat eine eigene URL, `curl` liefert den vollständigen Inhalt ohne JS, Lighthouse-SEO 100 auf jeder Seite, Browser-Zurück funktioniert.

### M2 – Technisches SEO-Fundament
**Umsetzung (nach M1):**
1. `sitemap.xml` generieren lassen, in `robots.txt` eintragen (`Sitemap: https://roessler-immo.de/sitemap.xml`).
2. `www.roessler-immo.de` per 301 auf `https://roessler-immo.de` (nginx: eigener `server`-Block mit `return 301`). `<link rel="canonical">` auf jeder Seite.
3. Title-Formel: `<Thema> in <Ort> | Rössler Immobilien` bzw. für Ratgeber `<Frage/Thema> – Rössler Immobilien`. Startseite: `Wohnung verkaufen in Leonberg, Heimsheim & Pforzheim | Rössler Immobilien` (59 Zeichen). Meta-Descriptions mit Nutzen und Handlungsaufforderung, 140–155 Zeichen.
4. Open Graph und Twitter Card auf jeder Seite (`og:title`, `og:description`, `og:image` 1200×630 mit Logo/Portrait und Ortsnennung, `og:locale=de_DE`).
5. JSON-LD:
   - Auf allen Seiten `RealEstateAgent` (Name, Telefon, E-Mail, `areaServed` mit den fünf Orten als `City`, `url`, `image`, `founder` = Person Linus Rössler, `priceRange`, ggf. `address` erst nach Sitzklärung, siehe M6).
   - Auf FAQ-Seiten `FAQPage` mit den sichtbaren Fragen.
   - Auf Ratgeber-Seiten `Article` mit `author` = Person, `datePublished`, `dateModified`.
   - `BreadcrumbList` auf Unterseiten.
6. Eigene 404-Seite auf Deutsch mit Navigation und Kontakt (nginx `error_page 404 /404.html`).
7. `favicon.ico` (32 px) und `apple-touch-icon.png` (180 px) ergänzen; `site.webmanifest` optional.
**Akzeptanz:** Google Search Console eingerichtet, Sitemap eingereicht, Rich-Results-Test ohne Fehler, `www` leitet um.

### M3 – Bilder und Ladezeit
**Problem:** 1,6 MB JPEG, LCP mobil 5,7 s (Lighthouse) bzw. 7 s bei 1,6 Mbit/s, Google Fonts extern.
**Umsetzung:**
1. Alle Bilder in WebP (und AVIF, wenn der Build es hergibt) in drei Breiten (640/1024/1600) mit `srcset`/`sizes`; Hero-Bild zusätzlich als mobiles Querformat (z. B. 800×500).
2. `width`/`height` an jedem `<img>`, `loading="lazy"` für alles unterhalb des ersten Bildschirms, `fetchpriority="high"` und `<link rel="preload">` für das Hero-Bild der jeweiligen Seite.
3. Schriften selbst hosten (WOFF2 der beiden Familien unter `/fonts/`, `font-display: swap`, `<link rel="preload" as="font">` für die zwei Hauptschnitte). Entfernt den Google-Request und den Datenschutz-Punkt (M7).
4. nginx: `Cache-Control: public, max-age=31536000, immutable` für Bilder/Fonts/CSS mit Hash im Dateinamen; `max-age=600` für HTML; gzip/brotli aktiv lassen.
**Akzeptanz:** Lighthouse-Mobil-Performance ≥ 90, LCP < 2,5 s, Gesamtgewicht Startseite < 500 kB.

### M4 – Mobiler Einstieg und Kontakt
**Umsetzung:**
1. Hero mobil: Text (H1, Subline, Orte, Button) vor dem Bild; Bild darunter als 16:10-Ausschnitt mit max. 220 px Höhe. Ziel: H1 und primärer Button im ersten Bildschirm (≤ 600 px).
2. Telefon-Icon mit `tel:`-Link dauerhaft in der mobilen Kopfzeile neben dem Burger. Alternativ eine schmale, fixierte Leiste unten mit „Anrufen“ und „Wohnung einschätzen lassen“ (nur mobil, erscheint nach 300 px Scroll).
3. Lange Seiten (Verkaufen, Ratgeber): Inhaltsverzeichnis am Anfang (Sprungmarken), ein Zwischen-CTA nach dem Ablauf, einer am Ende.
4. Burger-Menü beibehalten (ist gut), Telefonnummer dort lassen.
**Akzeptanz:** Playwright-Test mit iPhone-13-Viewport: `h1` und `.btn` innerhalb 664 px; kein horizontaler Überlauf bei 320 px.

### M5 – Einstieg „Was ist meine Wohnung wert?“ (Lead-Magnet) statt nur „Nachricht schreiben“
**Begründung:** Alle größeren Wettbewerber führen Eigentümer über eine kostenlose Einschätzung in den Kontakt (`02-wettbewerb.md`). Rössler hat mit dem „Verkaufsplan“ bereits ein besseres Produkt, bietet aber keinen passenden ersten Schritt.
**Umsetzung (ohne externes Tool, ohne Cookies):**
1. Neue Seite `/wohnung-bewerten/` mit Überschrift wie „Was ist Ihre Wohnung in Leonberg, Heimsheim oder Pforzheim heute wert?“ und einem dreistufigen Formular (Schritt 1: Ort/Straße grob, Wohnfläche, Zimmer, Baujahr, Etage, Balkon/Stellplatz; Schritt 2: Zustand, vermietet/frei, aktuelle Miete falls vermietet, Hausgeld; Schritt 3: Name, Telefon oder E-Mail, gewünschter Rückrufzeitraum). Fortschrittsanzeige, ein Feld pro Zeile, alles bis Schritt 3 ohne Kontaktdaten.
2. Versprechen klar und ehrlich: „Sie erhalten innerhalb von zwei Werktagen eine schriftliche Ersteinschätzung mit Preisspanne und Begründung, keine automatische Zahl.“ Das unterscheidet sich bewusst von den Online-Rechnern der Portale und passt zum Verkaufsplan.
3. Danke-Seite `/wohnung-bewerten/danke/` mit „Was passiert jetzt“ (3 Schritte) und Telefonnummer. Diese Seite erlaubt später cookiefreies Zählen (Serverlog oder Plausible/Matomo ohne Cookies).
4. Diesen Einstieg als primären Button auf Start, Ortsseiten und Ratgebern verwenden („Wohnung kostenlos einschätzen lassen“); „Verkauf besprechen“ bleibt sekundär.
5. Backend: `kontakt.php` um einen zweiten Endpunkt erweitern (oder generisch machen), serverseitige Validierung, Honeypot beibehalten, zusätzlich Zeitstempel-Check (Formular nicht unter 3 Sekunden absendbar), Bestätigungs-E-Mail an den Absender (siehe M8).
**Akzeptanz:** Formular funktioniert ohne JS (normaler POST mit Serverantwort) und mit JS (Inline), Testanfrage kommt per E-Mail an, Absender erhält Bestätigung.

### M6 – Erlaubnis-Vorbehalt und Standort bereinigen
**Umsetzung:**
1. Bis zur Erteilung: nur **ein** Hinweis, positiv formuliert, auf der Verkaufen-Seite und im Impressum: „Die Maklererlaubnis nach § 34c GewO ist beantragt. Ersteinschätzungen und Beratungsgespräche sind bereits möglich; Vermarktungsaufträge nehme ich ab Erteilung an.“ Alle anderen Stellen entfernen.
2. Am Tag der Erteilung: Hinweise entfernen; im Impressum Erlaubnisbehörde und Datum nennen.
3. Standort: Entscheidung von Linus nötig. Optionen: (a) Geschäftsadresse in der Region (Wohnsitz, Coworking, Büroservice in Leonberg/Pforzheim) → Impressum, Google-Unternehmensprofil, IHK-Zuständigkeit (BW: Erlaubnis durch Landratsamt/Stadt) anpassen; (b) Niederlauer beibehalten → auf „Über mich“ in einem Satz erklären, warum Heimsheim/Leonberg das Gebiet ist, und Google-Unternehmensprofil als Dienstleister ohne sichtbare Adresse mit Servicegebiet anlegen.
4. Impressums-Floskel „Berufsbezeichnung: Immobilienmakler (verliehen in der Bundesrepublik Deutschland)“ ersetzen durch „Tätigkeit: Immobilienmakler, erlaubnispflichtig nach § 34c Abs. 1 Satz 1 Nr. 1 GewO“.
**Akzeptanz:** Keine widersprüchlichen Aussagen mehr auf der Seite; Impressum und Datenschutz nennen die zum Sitz passenden Behörden.

### M7 – Datenschutz: Google Fonts lokal, Datenschutzerklärung nachziehen
**Umsetzung:** Siehe M3 Punkt 3. Danach Abschnitt „Schriftarten“ in der Datenschutzerklärung streichen. Bei Sitzwechsel Aufsichtsbehörde ändern (LfDI Baden-Württemberg). Sobald Bewertungsformular (M5) live ist: Abschnitt „Immobilien-Ersteinschätzung“ ergänzen (Zweck, Rechtsgrundlage lit. b, Speicherdauer). Kein Cookie-Banner nötig, solange keine Einwilligungs-Dienste eingebunden werden; das soll so bleiben.

### M8 – Vertrauen aufbauen: Beweise sammeln und zeigen
**Problem:** Null Beweise auf der Seite (`01-analyse.md` 2.2).
**Umsetzung, sofort möglich ohne Verkäufe:**
1. Google-Unternehmensprofil anlegen und verifizieren (Kategorie „Immobilienmakler“, Servicegebiet die fünf Orte, Fotos: Portrait, Arbeitssituation, Region). Jede Ersteinschätzung und jedes Beratungsgespräch mit der Bitte um eine Google-Bewertung abschließen (Link per SMS/E-Mail). Bewertungen auf der Seite einbinden (statisch, mit Datum, ohne Google-Widget → keine Cookies).
2. Seite „Über mich“ ausbauen (`04-seitenplan.md`, Seite P-01): Werdegang mit Stationen, die eigene Wohnung als Fallbeispiel mit Zahlen (Kaufjahr, Baujahr, Maßnahmen, Kosten grob, Vermietung), Bezug zur Region, Arbeitsweise, 3–5 echte Fotos.
3. „Beispiel-Verkaufsplan“: anonymisiertes, zweiseitiges Muster-PDF (Preisspanne mit Begründung, Käufergruppen, Vorbereitung mit Kosten/Mehrerlös, Zeitplan) als Download ohne Pflicht-Kontaktdaten. Das ist der konkreteste Beweis für das eigene Versprechen.
4. Nach den ersten Verkäufen: Referenzen mit Objektdaten („3-Zimmer-Wohnung, Leonberg-Ramtel, Baujahr 1974, verkauft in 9 Wochen, 3 % über erster Preisspanne“), Zitate mit Vorname und Ort.
5. Mitgliedschaft prüfen (IVD oder BVFI): Logo, Verbands-Schlichtung, Weiterbildungsnachweis.
**Akzeptanz:** Mindestens drei echte Google-Bewertungen, Beispiel-Verkaufsplan online, „Über mich“ mit Lebenslauf und Fotos.

### M9 – Erste Ratgeber- und Ortsseiten bauen (Inhalt für die Phase vor der Verkaufsentscheidung)
**Umsetzung:** Nach den Briefings in `content-briefings/` und der Reihenfolge in `04-seitenplan.md`. Erste Welle (10 Seiten): Wohnung verkaufen (Leistungsseite ausbauen), vermietete Wohnung verkaufen, geerbte Wohnung verkaufen, Wohnung verkaufen bei Scheidung, Spekulationssteuer bei Wohnungen, Maklerprovision in Baden-Württemberg, Unterlagen für den Wohnungsverkauf (WEG), Ortsseite Leonberg, Ortsseite Pforzheim, Ortsseite Heimsheim. Jede Seite: 1.200–2.000 Wörter, lokale Beispiele, Fakten mit Quelle, FAQ, interner Link zu `/wohnung-bewerten/`.
**Regel gegen generische Texte:** Keine Seite wird veröffentlicht, deren Briefing-Abschnitt 3 (Fakten mit Quelle) oder Abschnitt 7 (Fragen an Linus) leer ist. Linus liest jede Seite und ergänzt mindestens eine eigene Beobachtung aus der Praxis.

---

## B. Mittel

### M10 – Funnel-Details: Erwartungsmanagement und Erreichbarkeit
1. Unter jedem Formular und auf der Danke-Seite: „Ich melde mich innerhalb eines Werktags, meist telefonisch. Wenn Sie einen Zeitraum nennen, rufe ich dann an.“ Feld „Rückruf am liebsten“ (vormittags/nachmittags/abends 18–20 Uhr).
2. Erreichbarkeit auf der Kontaktseite nennen (z. B. „Mo–Sa 9–20 Uhr, Besichtigungen auch sonntags“).
3. Automatische Eingangsbestätigung per E-Mail mit den nächsten Schritten und der Telefonnummer.
4. Entscheidung Linus: WhatsApp-Business-Link (`https://wa.me/4915905844641`) anbieten? Wenn ja, Datenschutzerklärung ergänzen (Meta, Drittland). Terminbuchung: statt Calendly (Cookies, US-Anbieter) ein einfaches Feld „Wunschtermin“ oder ein selbst gehostetes Tool (Cal.com self-hosted) prüfen.
5. Direktankauf: eigenes kurzes Formular (Ort, Baujahr, Wohnfläche, Etage, Zustand, Miete/Hausgeld, Zeitpunkt), damit Ankauf-Anfragen ernsthaft und vollständig ankommen.

### M11 – Direktankauf klar nachordnen
Auf der Startseite Vermittlung als Hauptweg (volle Breite), Direktankauf als kompakte Karte darunter mit dem Satz „Falls Sie keine öffentliche Vermarktung möchten“. Die Transparenz-Sektion „In welcher Rolle ich stehe“ auf der Ankauf-Seite oben platzieren, nicht unten. In der Navigation bleibt „Direktankauf“, aber an vierter Stelle.

### M12 – Bildsprache mit Ortsbezug
Fototermin in der Region (ein Tag): Leonberger Marktplatz/Altstadt, Heimsheim (Schleglerschloss, Altstadt), Ditzingen (Neubaugebiete), Renningen (Ortsmitte, S-Bahn), Pforzheim (Innenstadt, Wohnlagen am Hang), typische Wohnanlagen der 1960er–1990er, Linus bei der Arbeit (Besichtigung, Unterlagen, Gespräch). Diese Bilder ersetzen die vier Motivbilder und bestücken die Ortsseiten. Bildunterschriften mit Ortsnamen (hilft SEO und Vertrauen).

### M13 – Logo und Wiedererkennung
Eine einfache Wortmarke als SVG (bestehende Typografie in Dunkelblau) plus eine Bildmarke (z. B. stilisiertes „R“ oder Grundriss-Element) für Favicon, Google-Profil, Portale, Social-Vorschau (`og:image`). Eine Akzentfarbe (z. B. warmes Ocker oder gedecktes Grün) sparsam für Buttons und Hervorhebungen prüfen; Dunkelblau bleibt Hauptfarbe.

### M14 – Security- und Caching-Header (nginx)
```nginx
add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;   # erst nach funktionierender www-Umleitung
add_header X-Content-Type-Options nosniff always;
add_header Referrer-Policy strict-origin-when-cross-origin always;
add_header Permissions-Policy "camera=(), microphone=(), geolocation=()" always;
add_header Content-Security-Policy "default-src 'self'; img-src 'self' data:; style-src 'self' 'unsafe-inline'; script-src 'self' 'sha256-…'; font-src 'self'; form-action 'self'; frame-ancestors 'none'; base-uri 'self'" always;
```
Inline-Skripte entweder in eine Datei auslagern oder per Hash erlauben. Caching siehe M3. `security.txt` unter `/.well-known/` optional.

### M15 – E-Mail-Zustellbarkeit
Im netcup-CCP DKIM für `roessler-immo.de` aktivieren, DMARC-Eintrag `_dmarc` mit `v=DMARC1; p=none; rua=mailto:dmarc@roessler-immo.de;` anlegen, nach vier Wochen Auswertung auf `p=quarantine` erhöhen. Prüfen, dass `kontakt.php` mit einer Absenderadresse der eigenen Domain sendet (nicht mit der Adresse des Anfragenden als `From`), sonst scheitert DMARC. Test mit mail-tester.com.

### M16 – Barrierefreiheit nachziehen
`<nav aria-label="Hauptnavigation">` und `<nav aria-label="Rechtliches">`; H1 auf jeder Seite; Vergleichstabelle mit `scope="col"`/`scope="row"`, keine leere Kopfzelle, scrollbarer Tabellen-Container mit `tabindex="0"` und `aria-label`; Skip-Link „Zum Inhalt“; `type="button"` an allen Buttons, die keine Formulare absenden; geschützte Leerzeichen in Telefonnummern (`0159&nbsp;05844641`). Nach M1 entfällt das Fokus-Problem beim Umschalten der Ansichten von selbst.

### M17 – Messung ohne Cookies
Server-Logs auswerten (GoAccess) oder Plausible/Matomo im cookiefreien Modus (keine Einwilligung nötig, Datenschutzerklärung ergänzen). Ziele: Aufrufe pro Seite, Anfragen pro Quelle (Danke-Seiten), Telefon-Klicks (`tel:`-Link-Event). Google Search Console für Suchanfragen und Indexierung.

---

## C. Niedrig

### M18 – Textpflege
- Navigation „Immobilie verkaufen“ → „Wohnung verkaufen“ (konsistent zur Spezialisierung).
- FAQ „Wie lange dauert ein Verkauf?“ mit Orientierungsspanne aus Marktdaten (Quelle in `recherche/themen-und-lokal.md`) ergänzen.
- „Wohnfläche ca.“ als `type="number"` mit `min`/`max`, Einheit als Suffix statt Platzhalter.
- Footer: Name, Telefon, E-Mail, Einsatzgebiet (fünf Orte verlinkt auf Ortsseiten), Mini-Sitemap.

### M19 – Druck- und Dark-Mode-Feinschliff
Druck-Stylesheet für Ratgeber (Navigation ausblenden, URL-Fußzeile). Dark-Mode bewusst nicht unterstützen (`color-scheme: light` beibehalten) oder vollständig gestalten; halbe Lösungen vermeiden.

### M20 – Monitoring und Routine
- Monatlich: Lighthouse (mobil), Search-Console-Abdeckung, kaputte Links (z. B. `lychee`), Formular-Testanfrage.
- Vierteljährlich: Ratgeber-Fakten gegen `radar/`-Digests prüfen (Zinsen, Gesetze, Fristen) und `dateModified` aktualisieren.
- Bei jeder Rechtsänderung aus dem Radar: betroffene Seite innerhalb einer Woche anpassen; das ist zugleich ein Newsletter-Anlass.

---

## D. Reihenfolge-Vorschlag für die Umsetzungs-Sessions

| Session | Inhalt | Maßnahmen |
|---|---|---|
| 1 | Neues Projektgerüst, Seiten 1:1 migrieren, Bilder/Fonts, SEO-Grundlagen, Header | M1, M2, M3, M7, M14, M16 |
| 2 | Mobil-Hero, Kontaktleiste, Bewertungs-Funnel mit Backend und Danke-Seite, Erlaubnis/Standort-Texte | M4, M5, M6, M10, M15 |
| 3 | Über mich, Beispiel-Verkaufsplan, Google-Profil, Direktankauf-Umbau, Logo/OG-Bild | M8, M11, M13 |
| 4–6 | Ratgeber- und Ortsseiten nach Briefings (je Session 3–4 Seiten), Fototermin einplanen | M9, M12 |
| laufend | Messung, Radar, Pflege | M17, M20 |

Vor Session 1 braucht Linus nur zwei Entscheidungen: Standort/Impressum (M6 Punkt 3) und ob WhatsApp angeboten wird (M10 Punkt 4).

---

## E. Erfolgskriterien (messbar drei Monate nach Session 2)

- Google Search Console: Impressionen für „wohnung verkaufen leonberg/heimsheim/ditzingen/renningen/pforzheim“ und „immobilienmakler <ort>“ größer null; mindestens eine Ortsseite in den Top 20.
- Google-Unternehmensprofil verifiziert, mindestens fünf echte Bewertungen.
- Lighthouse mobil: Performance ≥ 90, Accessibility ≥ 95, SEO 100, Best Practices ≥ 95; Startseite mobil < 500 kB; kein Request an Drittanbieter.
- Mindestens eine Anfrage pro Woche über Bewertungsformular oder Kontaktformular (abhängig von Erlaubnis und Saison).
- Jede veröffentlichte Ratgeberseite hat Quellenliste, „Stand“-Datum, FAQ-Block und mindestens eine eigene Praxisbeobachtung von Linus.

Hinweis: Eine parallel laufende Session hat am 29.10.2026 eine kompaktere Analyse und Maßnahmenliste erstellt (Kopien unter `../recherche/parallel-session/`). Deren Nummerierung (H1–H7, M1–M10, N1–N8) ist eine andere; inhaltlich sind beide Listen deckungsgleich, diese hier ist die ausführlichere und gilt als Referenz.
