# Radar: Gesetzes- und Marktbeobachtung

Kleines Werkzeug ohne Abhängigkeiten (nur Python 3), das RSS-/Atom-Feeds einliest, nach Schlagwörtern filtert und einen Markdown-Digest schreibt. Es ist der „Rohstoff-Lieferant“ für den Newsletter (eigene Infrastruktur von Linus) und für Ratgeber-/SEO-Artikel.

## Dateien

| Datei | Zweck |
|---|---|
| `radar.py` | Das Skript. Liest `feeds.json` und `keywords.json`, schreibt `digests/JJJJ-MM-TT.md`, merkt sich Gesehenes in `state.json`. |
| `feeds.json` | Quellenliste: `name`, `category`, `url`, `prio` (1–5, beeinflusst Sortierung), `filter` (`false` = alle Einträge übernehmen, auch ohne Schlagwort-Treffer; sinnvoll bei reinen Immobilien-Feeds). |
| `keywords.json` | Schlagwortgruppen. Abkürzungen (GEG, WEG, KfW, EZB, BGH …) werden exakt und nur als ganzes Wort gesucht, normale Wörter am Wortanfang mit beliebiger Endung („Mieter“ trifft „Mieterhöhung“). Treffer nur in den Gruppen „Gesetz“ und „Urteil“ reichen allein nicht aus. |
| `digests/` | Ergebnisse. `2026-10-29-testlauf.md` ist der erste Probelauf (14 Tage rückwirkend). |
| `state.json` | Wird beim normalen Lauf angelegt; enthält Hashes der bereits gemeldeten Einträge. Löschen = alles gilt wieder als neu. |

## Aufruf

```bash
python3 radar.py --check          # Erreichbarkeit aller Feeds prüfen
python3 radar.py --days 7         # alles aus den letzten 7 Tagen (ohne state.json)
python3 radar.py                  # nur Neues seit dem letzten Lauf, merkt sich den Stand
python3 radar.py --all --days 3   # auch Einträge ohne Schlagwort-Treffer
```

## Einbindung in den Newsletter-Workflow

1. Wöchentlich (z. B. Montag früh) `python3 radar.py --days 7` laufen lassen, per Cron, GitHub Action oder als geplante Claude-Aufgabe.
2. Den Digest an Claude geben mit dem Auftrag: „Wähle die 5 Einträge mit der größten Bedeutung für Eigentümer von Eigentumswohnungen in Leonberg/Heimsheim/Pforzheim und für Fix-&-Flip-Investoren, fasse jeden in 3 Sätzen zusammen, nenne Quelle und Datum, schlage je einen Artikel-Titel vor.“
3. Ergebnis in die bestehende Newsletter-Infrastruktur übernehmen; Artikel-Ideen als Briefing in `content-briefings/` ablegen.

Das Konzept mit Quellenbewertung, Prüffrequenzen und Automatisierungsvorschlag steht in `../analyse-aktuelle-webseite/05-radar.md`.
