# Analyse der aktuellen Webseite roessler-immo.de

Dieser Ordner enthält die Bestandsaufnahme der Live-Seite **https://roessler-immo.de/** (Rössler Immobilien, Linus Rössler) vom **29.10.2026** und die daraus abgeleiteten Maßnahmen. Er ist die Arbeitsgrundlage für den Relaunch, sobald der Quellcode der Seite in dieses Repo hochgeladen ist.

> Hintergrund: Dieses Repo hieß ursprünglich `cafe-flo` (altes Next.js-Projekt). Die Café-Flo-Inhalte werden nicht mehr gebraucht und dürfen überschrieben oder gelöscht werden. Ab jetzt ist das Repo das Arbeits- und Recherche-Repo für die Rössler-Immobilien-Webseite.

## Dateien

| Datei | Inhalt | Für wen |
|---|---|---|
| [`01-analyse.md`](01-analyse.md) | Ausführliche Analyse der Live-Seite in 8 Bereichen (Inhalte, Struktur, Design, Mobil, Kontakt/Funnel, SEO, Technik, Recht) mit Zitaten aus dem Quelltext, Messwerten und einer Gesamtbewertung. | Wer verstehen will, **was** die Seite heute kann und wo sie schwach ist |
| [`02-wettbewerb.md`](02-wettbewerb.md) | Vergleich mit 5 Makler-Webseiten (Gäu Immobilien, Von Poll Leonberg, Wurtz Immobilien, Apfel Immobilien, Homeday) plus Vergleichsmatrix; was Rössler besser macht, was fehlt. | Wer wissen will, **was in der Region Standard ist** |
| [`03-massnahmen.md`](03-massnahmen.md) | Priorisierte To-do-Liste (Hoch / Mittel / Niedrig) mit konkreten Umsetzungsschritten, Aufwand, Abhängigkeiten und einer empfohlenen Reihenfolge. **Diese Datei ist so geschrieben, dass eine spätere Session die Punkte direkt umsetzen kann.** | Wer **umsetzen** will |

## So liest man den Ordner
1. Wer wenig Zeit hat: `01-analyse.md` → Abschnitt 9 „Gesamtbewertung“ und `03-massnahmen.md` → „Priorität HOCH“ + „Reihenfolge-Empfehlung“.
2. Wer eine Maßnahme umsetzt: In `03-massnahmen.md` die Nummer (z. B. H4) lesen; der zugehörige Befund steht in `01-analyse.md` im gleichnamigen Abschnitt (z. B. Abschnitt 5 „Kontaktwege und Anfrage-Funnel“).
3. Wer Texte oder Design überarbeitet: `02-wettbewerb.md` zeigt konkrete Formulierungen und Elemente der Wettbewerber, die als Vorbild (oder Gegenbeispiel) dienen.

## Wichtigste Erkenntnisse in einem Satz
Die Seite ist eine ehrliche, fachlich starke und technisch schlanke **Visitenkarte**, aber noch kein **Akquise-Instrument**: Sie ist über Google praktisch nicht auffindbar (eine URL, Title ohne Suchbegriff, keine Ortsseiten, kein Google-Profil), bietet keinen niedrigschwelligen Einstieg („kostenlose Ersteinschätzung“) und keinen Vertrauensbeweis (Bewertungen, Referenzen, Qualifikationen). Dazu kommen zwei Pflichtpunkte: Google Fonts lokal hosten (Abmahnrisiko) und der § 34c-Hinweis, der am Tag der Erteilung raus muss.

## Was in dieser Session nicht geprüft werden konnte
- Die Webseiten von **Bannasch Immobilien** (Leonberg, stärkster Wohnungs-Makler nach Bewertungen), **Jutta Niggel Immobilien** (Pforzheim), **Domizil Immobilien** (Ditzingen) und **McMakler** waren aus der Cloud-Umgebung nicht erreichbar (DNS/Proxy bzw. 403/500). Lohnt sich am Laptop nachzuholen.
- `kontakt.php` (Formular-Backend) konnte nur von außen getestet werden (antwortet auf GET mit 303); der Code ist nicht einsehbar.
- Lighthouse/Core Web Vitals aus dem Mobilfunknetz; die Messwerte in `01-analyse.md` stammen aus einem Rechenzentrum und sind daher eher optimistisch.
- Rankings/Impressionen (keine Search-Console-Daten vorhanden).

## Nächste Schritte
1. Quellcode der Live-Seite in dieses Repo legen (Vorschlag: Ordner `site/` mit `index.html`, `bilder/`, `kontakt.php`, später die Unterseiten).
2. Mit `03-massnahmen.md` → „Reihenfolge-Empfehlung“ beginnen.
3. Diesen Ordner bei Bedarf ergänzen (z. B. `04-texte-neu.md`, `05-keywords.md`), statt die Analyse zu überschreiben – so bleibt der Ausgangszustand dokumentiert.
