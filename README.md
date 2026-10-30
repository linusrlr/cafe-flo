# Rössler Immobilien: Arbeits- und Recherche-Repo

Dieses Repository (ehemals „Café Flo“, alter Inhalt entfernt) dient als Arbeits- und Recherche-Ablage für die Webseite https://roessler-immo.de/ (Rössler Immobilien, Linus Rössler). Der Code der Live-Seite liegt noch lokal und wird später hier abgelegt.

## Ordner

| Ordner | Inhalt |
|---|---|
| `analyse-aktuelle-webseite/` | Analyse der bestehenden Seite, Wettbewerbsvergleich, priorisierte Maßnahmen, Seitenplan, Radar-Konzept. **Hier anfangen** (`README.md` dort). |
| `recherche/` | Rohdaten der Wettbewerbs- und Themenrecherche (regional, München, Großstädte, überregional, Ratgeber-Themen, lokale Marktdaten, Feeds, aktuelle Marktthemen). Lang, belegt mit Zitaten und URLs. |
| `content-briefings/` | Je geplante Unterseite ein Briefing: Ziel, Suchintention, Gliederung, Pflichtfakten mit Rechtsgrundlagen, Quellen, CTAs. Grundlage für die Texte. |
| `texte/` | 22 Textentwürfe (Stand 30.10.2026, Prüfbericht in `analyse-aktuelle-webseite/06-review.md`) je Seite auf Basis der Briefings (Ich-Form, Fakten mit Quelle, Platzhalter `[LINUS: …]` und `[ZU PRÜFEN: …]`). Werden beim Bauen der Seiten übernommen und von Linus ergänzt. |
| `radar/` | Werkzeug zur Gesetzes- und Marktbeobachtung (RSS-Aggregator mit Schlagwortfilter) samt Digests. |

## Deployment

Das Repo ist kein Web-Projekt mehr. Automatische Vercel-Deployments für `master` sind per `vercel.json` (`git.deploymentEnabled.master: false`) deaktiviert. Wenn der Code der Live-Seite hier abgelegt wird, diese Einstellung bewusst ändern.

## Arbeitsweise

- Alles auf Deutsch.
- Recherche vor Umsetzung: Unterseiten werden erst gebaut, wenn Briefing und Quellen vorliegen (gegen generische KI-Texte).
- Jede Behauptung in den Dokumenten ist mit Quelle oder wörtlichem Zitat belegt; Unklares ist als „nicht prüfbar“ markiert.
