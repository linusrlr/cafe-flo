# Maklerverträge

Ablage für die Vertragsmuster und die objektbezogenen Verträge von Rössler Immobilien, mit Prüf-Feedback. Keine Rechtsberatung; Prüfstand steht in jeder Feedback-Datei.

## Struktur

| Ordner | Inhalt |
|---|---|
| `verkaeufer/<objekt>/` | Maklerauftrag zum Verkauf (Verkäuferseite) je Objekt: Fassungen als `.docx`, Textexport `vN-text.md`, Feedback `feedback-vN.md`, Änderungsprotokoll `aenderungen-vN.md`. |
| `kaeufer/` | Noch leer. Die Käuferseite läuft heute über die Exposé-Freigabe, Vorlage in `../expose/rechtstexte/maklervertrag-kaeufer.md`. Ein objektbezogener Käufervertrag auf Papier gehört hierher. |

## Ablauf je Fassung

1. Neue Fassung `Maklervertrag_<Objekt>_vN.docx` ablegen, Text mit `pandoc <datei>.docx -t gfm --wrap=none -o vN-text.md` exportieren (damit Diffs lesbar sind).
2. Prüfung schreibt `feedback-vN.md` (Befunde A = Pflicht, B = sollte, C = optional, mit Vorschlagstext).
3. Überarbeitung erzeugt v(N+1) und `aenderungen-v(N+1).md` (je Befund: umgesetzt / abweichend / nicht umgesetzt, warum).
4. Erneute Prüfung, bis keine A- und B-Befunde offen sind.

## Zusammenhang mit dem Rest des Repos

- Provision, Erlaubnis, Anschrift, Behörde: `../bauplan/fakten.yaml` ist die Quelle. Verträge, Website und Käufervertrag müssen denselben Provisionssatz und dieselbe Umsatzsteuer-Formulierung tragen (§ 656c BGB, Halbteilung).
- Rechtsgrundlagen und BGH-Urteile zu Textform, Widerruf, Button-Lösung, Wertersatz: `../recherche/expose/recherche.md`.
- Widerrufsbelehrung für Online-Abschluss (mit Widerrufsfunktion nach § 356a BGB): `../expose/rechtstexte/widerrufsbelehrung.md`.

## Stand

- `verkaeufer/seestrasse-53-hemmingen/`: v4 (Linus, Erbengemeinschaft mit drei Miterben) geprüft am 07.11.2026, Feedback liegt vor, v5 offen.
