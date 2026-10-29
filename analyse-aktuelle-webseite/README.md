# Analyse der aktuellen Webseite roessler-immo.de

Bestandsaufnahme der Live-Seite https://roessler-immo.de/ (Rössler Immobilien, Linus Rössler) vom 29./30. Oktober 2026 mit Wettbewerbsvergleich, Maßnahmenliste, Seitenplan und Radar-Konzept. Der Ordner ist die Arbeitsgrundlage für den Umbau, sobald der Quellcode der Seite im Repo liegt.

## Dateien und Lesereihenfolge

| Datei | Inhalt | Lesen, wenn … |
|---|---|---|
| `01-analyse.md` | Analyse der Live-Seite in zehn Abschnitten (Inhalte, Struktur, Design, Mobil, Funnel, SEO, Technik inkl. Lighthouse/axe/Validator/DNS, Recht) mit Zitaten, Messwerten, Befundliste nach Schwere. Screenshots in `screenshots/`. | … man wissen will, was die Seite heute kann und wo sie schwach ist. |
| `02-wettbewerb.md` | Auswertung von 37 Maklerseiten (Region, München, Großstädte, überregional): direkte Wettbewerber, Vorbilder je Thema, Muster, Vergleichsmatrix, was Rössler besser macht, was nicht nachgebaut werden soll. | … man Entscheidungen über Funnel, Beweise, Inhalte und Tonalität begründen will. |
| `03-massnahmen.md` | 20 priorisierte Maßnahmen (Hoch/Mittel/Niedrig) mit Umsetzungsschritten, Akzeptanzkriterien, Session-Reihenfolge und Erfolgskriterien. | … man umsetzt. Jede Maßnahme (M1 bis M20) ist eigenständig abarbeitbar. |
| `04-seitenplan.md` | Zielstruktur, Seitenliste mit Priorität und Wellen, Templates für Ratgeber, Ortsseiten, Leistungsseiten, Funnel, „Über mich“, Direktankauf; Pflichtbausteine. | … man eine Seite baut oder plant. |
| `05-radar.md` | Konzept für die Gesetzes- und Marktbeobachtung: Ebenen, 77 geprüfte Feeds, Newsletter ohne Feed, Werkzeug `../radar/`, Wochenablauf, Automatisierungsvorschlag, erster Themenvorrat. | … man Newsletter und aktuelle Artikel aufsetzt. |

## Zugehörige Ordner im Repo

- `../content-briefings/`: je geplante Seite ein Briefing mit Zielgruppe, Suchintention, Faktentabelle mit Quellen, Gliederung, Elementen, Anti-Slop-Regeln und offenen Fragen an Linus. Vorlage `_vorlage.md`.
- `../texte/`: Textentwürfe der Seiten auf Basis der Briefings (Ich-Form, Fakten mit Quelle, Platzhalter `[LINUS: …]` für Praxiswissen, `[ZU PRÜFEN: …]` für ungeklärte Angaben).
- `../recherche/`: Rohdaten aller Recherchen mit Zitaten, URLs, Sitemaps, Funnel-Protokollen, lokalen Marktdaten, Feed-Prüfprotokoll und Marktthemen-Dossier 2026.
- `../radar/`: lauffähiges Radar-Werkzeug (Python, ohne Abhängigkeiten) mit Feeds, Schlagwörtern und Digests.

## So liest man den Ordner
1. Wenig Zeit: `01-analyse.md` Abschnitt 10 (Befunde nach Schwere), `02-wettbewerb.md` Abschnitt 1, `03-massnahmen.md` Abschnitt D (Reihenfolge).
2. Vor einer Umsetzungs-Session: `03-massnahmen.md` (Maßnahmen der Session), `04-seitenplan.md` (Template der Seite), das passende Briefing, der Textentwurf.
3. Vor einem Newsletter: `05-radar.md` Abschnitt 5 und der neueste Digest in `../radar/digests/`.

## Offene Entscheidungen für Linus (vor Session 1)
- Standort und Impressum: Geschäftsadresse in der Region oder Niederlauer beibehalten und erklären (M6).
- WhatsApp als Kontaktweg ja/nein (M10).
- Persönlicher Bezug zu Heimsheim/Leonberg in einem Satz (Briefing 32, Frage 1).
- Welche Hausverwaltungen, Baujahre, Hausgeld-Spannen er aus der Praxis kennt (Fragen in Abschnitt 7 jedes Briefings).

## Was nicht geprüft werden konnte
- Websites von Bannasch (Leonberg), Niggel (Pforzheim), Domizil (Ditzingen), McMakler, Aigner, Kensington: aus der Cloud nicht erreichbar; am Laptop nachholen.
- `kontakt.php` nur von außen (GET liefert 303); Mailversand, SPF/DKIM-Wirkung und Bestätigungsmail nicht getestet.
- Amtliche Kaufpreise der Gutachterausschüsse (nur Angebotspreise der Portale liegen vor).
- Google-Unternehmensprofil und Rankings (keine Search-Console-Daten).

## Hinweis zur parallelen Session
Am 29.10.2026 hat eine zweite Session eine kompaktere Analyse mit gleichen Dateinamen erstellt. Ihre Fassungen liegen unter `../recherche/parallel-session/`; ihr Wettbewerbsvergleich (Gäu/Wohntreu, Von Poll Leonberg, Wurtz, Apfel, Homeday) ist in `02-wettbewerb.md` eingearbeitet. Die Dateien in diesem Ordner sind die Referenz.
