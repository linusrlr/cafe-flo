# 02 Formular-Backend: `kontakt.php` und `bewertung.php`

Stand: 1. November 2026. Grundlage: `texte/wohnung-bewerten.md` (Formular-Spezifikation, Danke-Text, Fehlertext), `texte/kontakt.md` (Feldliste, Danke-Text, Bestätigungs-Mail), `texte/direktankauf.md` (Kurzformular), M5, M10, M15 aus `03-massnahmen.md`, Ist-Zustand aus `01-analyse.md` 1 und 8.2 (heute: `kontakt.php`, POST, JSON-Antwort, GET → 303, Honeypot + JS-Marker).

Ziel: Drei Formulare, ein gemeinsamer PHP-Kern, keine Datenbank, keine Cookies, funktioniert **ohne JavaScript** (normaler POST mit Weiterleitung) und **mit JavaScript** (Fetch mit JSON-Antwort).

---

## 1. Überblick

| Formular | Seite | Endpunkt | Feld `formular` | Danke-Seite |
|---|---|---|---|---|
| Kontakt | `/kontakt/#formular` | `POST /kontakt.php` | `kontakt` | `/kontakt/danke/` |
| Direktankauf | `/direktankauf/#ankauf-formular` | `POST /kontakt.php` | `ankauf` | `/direktankauf/danke/` |
| Bewertung (4 Schritte) | `/wohnung-bewerten/#formular` | `POST /bewertung.php` | `bewertung` | `/wohnung-bewerten/danke/` |

`kontakt.php` behält seine URL (Bestand). Beide Endpunkte sind dünne Dateien im Webroot, die nur den Kern laden:

```php
<?php // public/bewertung.php
declare(strict_types=1);
require dirname(__DIR__) . '/formular/lib/bootstrap.php';   // liegt außerhalb des Webroots
Formular\verarbeite(['bewertung']);                          // kontakt.php: ['kontakt', 'ankauf']
```

Verzeichnisse auf dem Server:

```
~/roessler-immo/
├── web/                       Webroot (dist/ inkl. kontakt.php, bewertung.php, formular-fehler/index.html)
├── formular/
│   ├── lib/                   bootstrap.php, formulare.php, validierung.php, mail.php, ratelimit.php, speicher.php
│   ├── lib/formulare.json     Kopie von site/src/data/formulare.json (beim Deploy)
│   ├── lib/fakten.json        firma + erlaubnis aus fakten.yaml (beim Build erzeugt)
│   ├── vorlagen/              benachrichtigung.txt, bestaetigung-kontakt.txt, -ankauf.txt, -bewertung.txt
│   ├── vendor/                PHPMailer (composer install --no-dev)
│   └── config.php             NUR auf dem Server, nicht im Repo, chmod 600
└── formular-daten/            chmod 700, nicht im Webroot
    ├── ratelimit/             je gehashter IP eine Datei, max. 24 h
    ├── anfragen/              YYYY-MM.csv (optional), chmod 600
    └── log/formular.log       Ergebnis je Anfrage ohne Personendaten, 30 Tage
```

`config.php`:

```php
<?php return [
  'smtp'        => ['host' => 'mail.roessler-immo.de', 'port' => 587, 'secure' => 'tls',
                    'user' => 'anfrage@roessler-immo.de', 'pass' => '…'],
  'absender'    => ['adresse' => 'anfrage@roessler-immo.de', 'name' => 'Website Rössler Immobilien'],
  'empfaenger'  => 'linus@roessler-immo.de',
  'bestaetigung_absender' => ['adresse' => 'linus@roessler-immo.de', 'name' => 'Linus Rössler'],
  'hmac_geheim' => '…64 Zeichen zufällig…',      // für IP-Hash im Rate-Limit
  'daten'       => '/home/USER/roessler-immo/formular-daten',
  'webroot'     => '/home/USER/roessler-immo/web',
  'csv_aktiv'   => false,
  'fotos_aktiv' => false,                         // Ankauf-Upload, Entscheidung Linus
  'fotos_max'   => 5,
];
```

---

## 2. Felder

Die Felder sind **einmal** in `site/src/data/formulare.json` definiert. Astro rendert daraus die Formulare, PHP validiert damit. Ausschnitt:

```json
{
  "bewertung": {
    "version": 1,
    "schritte": [
      { "legende": "Schritt 1 von 4: Wo liegt die Wohnung?", "felder": ["ort", "ort_sonst", "stadtteil", "strasse"] },
      { "legende": "Schritt 2 von 4: Die Wohnung", "felder": ["wohnflaeche", "zimmer", "etage", "aufzug", "aussenflaechen", "stellplatz", "baujahr"] },
      { "legende": "Schritt 3 von 4: Zustand, Nutzung, Zeitpunkt", "felder": ["zustand", "nutzung", "kaltmiete", "hausgeld", "zeitpunkt", "anlass"] },
      { "legende": "Schritt 4 von 4: Wie erreiche ich Sie?", "felder": ["name", "email", "telefon", "rueckruf", "nachricht"] }
    ],
    "felder": {
      "ort": { "typ": "auswahl", "label": "Ort", "pflicht": true,
               "optionen": { "leonberg": "Leonberg", "heimsheim": "Heimsheim", "ditzingen": "Ditzingen",
                             "renningen": "Renningen", "pforzheim": "Pforzheim", "anderer": "anderer Ort" },
               "hilfe": "Ich arbeite in diesen fünf Orten. Liegt die Wohnung anderswo, sage ich Ihnen ehrlich, ob ich helfen kann." },
      "ort_sonst": { "typ": "text", "label": "Welcher Ort?", "max": 80, "pflicht_wenn": { "ort": "anderer" } },
      "wohnflaeche": { "typ": "zahl", "label": "Wohnfläche", "einheit": "m²", "min": 10, "max": 500, "dezimal": true },
      "kaltmiete": { "typ": "zahl", "label": "Kaltmiete je Monat", "einheit": "€", "min": 0, "max": 10000,
                     "sichtbar_wenn": { "nutzung": "vermietet" } }
    }
  }
}
```

Hilfetexte, Microcopy und Button-Texte stehen wörtlich in `texte/wohnung-bewerten.md`, `kontakt.md`, `direktankauf.md` und werden bei der Migration in die JSON übernommen.

### 2.1 Bewertung (`formular=bewertung`)

| Feld | Typ | Werte / Grenzen | Pflicht |
|---|---|---|---|
| `ort` | Auswahl | `leonberg`, `heimsheim`, `ditzingen`, `renningen`, `pforzheim`, `anderer` | ja |
| `ort_sonst` | Text | 2 bis 80 Zeichen | wenn `ort=anderer` |
| `stadtteil` | Text | ≤ 80 | nein |
| `strasse` | Text | ≤ 120, Hausnummer optional | nein |
| `wohnflaeche` | Zahl | 10 bis 500, Komma oder Punkt, max. 1 Nachkommastelle | nein |
| `zimmer` | Auswahl | `1`, `1.5`, `2`, `2.5`, `3`, `3.5`, `4`, `4.5`, `5plus` | nein |
| `etage` | Auswahl | `ug`, `eg`, `og1`, `og2`, `og3`, `og4plus`, `dg` | nein |
| `aufzug` | Auswahl | `ja`, `nein`, `unbekannt` | nein |
| `aussenflaechen[]` | Mehrfach | `balkon`, `loggia`, `terrasse`, `garten`, `keine` (`keine` schließt andere aus) | nein |
| `stellplatz` | Auswahl | `keiner`, `aussen`, `carport`, `garage`, `tiefgarage`, `mehrere` | nein |
| `baujahr` | Zahl | 1800 bis aktuelles Jahr + 3, ganzzahlig | nein |
| `zustand` | Auswahl | `modernisiert`, `gepflegt`, `renovierungsbeduerftig` | nein |
| `nutzung` | Auswahl | `selbst`, `vermietet`, `leer` | nein |
| `kaltmiete` | Zahl | 0 bis 10.000; wird verworfen, wenn `nutzung` ≠ `vermietet` | nein |
| `hausgeld` | Zahl | 0 bis 3.000 | nein |
| `zeitpunkt` | Auswahl | `bald`, `sechs_monate`, `orientieren` | nein |
| `anlass` | Auswahl | `verkauf`, `erbe`, `trennung`, `umzug_alter`, `anlage`, `direktankauf`, `orientieren`, `sonstiges` | nein |
| `name` | Text | 2 bis 80, Buchstaben inkl. Umlaute, Leerzeichen, `-`, `'`, `.`; keine Ziffern, kein `://` | ja |
| `email` | E-Mail | ≤ 254, `FILTER_VALIDATE_EMAIL`, kein CR/LF | ja, wenn kein `telefon` |
| `telefon` | Telefon | 6 bis 30 Zeichen aus `0-9 +()/-` und Leerzeichen, mind. 6 Ziffern | ja, wenn keine `email` |
| `rueckruf` | Auswahl | `vormittags`, `nachmittags`, `abends`, `samstags`, `egal` | nein |
| `nachricht` | Textfeld | ≤ 3.000 | nein |

### 2.2 Kontakt (`formular=kontakt`)

| Feld | Typ | Werte / Grenzen | Pflicht |
|---|---|---|---|
| `name` | Text | wie oben | ja |
| `telefon`, `email` | | wie oben | eines von beiden |
| `ort` | Text | ≤ 80 (Freitext wie heute) | nein |
| `wohnflaeche` | Zahl | 10 bis 500 (`type="number"`, `inputmode="numeric"`, Einheit als Suffix, M18) | nein |
| `vermietet` | Auswahl | `vermietet`, `frei`, `wird_frei` | nein |
| `vorhaben` | Auswahl | `verkaufen`, `ankauf`, `orientieren` | nein |
| `rueckruf` | Auswahl | `vormittags`, `nachmittags`, `abends` | nein |
| `anlass` | Auswahl | `geerbt`, `trennung`, `umzug`, `alter`, `anlage`, `sonstiges` | nein |
| `nachricht` | Textfeld | ≤ 3.000 | nein |

### 2.3 Direktankauf (`formular=ankauf`)

| Feld | Typ | Werte / Grenzen | Pflicht |
|---|---|---|---|
| `name` | Text | wie oben | ja |
| `telefon`, `email` | | wie oben (die Vorlage nennt ein Feld „Telefon oder E-Mail“; zwei Felder erlauben Validierung und Reply-To) | eines von beiden |
| `ort` | Auswahl | `heimsheim`, `leonberg`, `ditzingen`, `renningen`, `pforzheim`, `anderer` | ja |
| `ort_sonst` | Text | ≤ 80 | wenn `anderer` |
| `baujahr` | Zahl | wie oben | nein |
| `wohnflaeche` | Zahl | wie oben | nein |
| `etage` | Auswahl | `eg`, `og1_3`, `og4plus`, `dg` | nein |
| `zustand` | Auswahl | `gepflegt`, `renovierungsbeduerftig`, `sanierungsbeduerftig`, `unbekannt` | nein |
| `nutzung` | Auswahl | `vermietet`, `frei` | nein |
| `kaltmiete` | Zahl | 0 bis 10.000, nur bei `vermietet` | nein |
| `hausgeld` | Zahl | 0 bis 3.000 | nein |
| `zeitpunkt` | Auswahl | `bald`, `drei_monate`, `spaeter`, `offen` | nein |
| `vermittlung_zuerst` | Kontrollkästchen | Wert `ja`; Label „Ich möchte zuerst wissen, was eine Vermittlung bringt.“ | [LINUS: Pflicht oder vorausgewählt?] Default: nicht Pflicht, vorausgewählt |
| `fotos[]` | Datei | nur wenn `fotos_aktiv`; max. `fotos_max` (Default 5) Dateien, je ≤ 8 MB, zusammen ≤ 20 MB; `image/jpeg`, `image/png`, `image/webp`, `image/heic` per `finfo`, nicht per Dateiendung | nein |
| `nachricht` | Textfeld | ≤ 3.000 | nein |

Bei aktivem Upload: `enctype="multipart/form-data"`, `accept="image/jpeg,image/png,image/webp,image/heic"`, `multiple`.

### 2.4 Systemfelder (alle Formulare)

| Feld | Herkunft | Zweck |
|---|---|---|
| `formular` | `<input type="hidden">`, statisch | Formularart; nur Werte aus der Endpunkt-Liste erlaubt |
| `v` | hidden, statisch (`version` aus JSON) | Formularversion, erscheint in Mail und CSV |
| `seite` | hidden, statisch (`url` der Seite) | Herkunftsseite (nur Pfad, gegen Liste der eigenen URLs geprüft) |
| `website` | Honeypot (Abschnitt 4.1) | Spam |
| `t` | von JS gesetzt: Millisekunden seit `DOMContentLoaded` | Zeitprüfung (Abschnitt 4.2) |
| `js` | von JS auf `1` gesetzt | nur Statistik, kein Ausschlusskriterium |

---

## 3. Serverseitige Validierung

Reihenfolge (jede Stufe kann abbrechen):

1. **Methode.** Nur `POST`. `GET`/`HEAD` → `303 See Other` auf `seite` (falls gültig) oder `/kontakt/`. Andere Methoden → `405` mit `Allow: POST`.
2. **Größe und Typ.** `Content-Type` `application/x-www-form-urlencoded` oder `multipart/form-data`; sonst `415`. `$_SERVER['CONTENT_LENGTH']` > 64 kB ohne Upload bzw. > 21 MB mit Upload → `413`.
3. **Herkunft.** Wenn `Origin` gesetzt ist, muss er `https://roessler-immo.de` sein; sonst `403`. (Kein CSRF-Token nötig: keine Sitzung, keine Cookies, nichts Privilegiertes; `Origin`-Prüfung verhindert fremde Formular-Posts aus Browsern.)
4. **Formularart.** `formular` muss zu den erlaubten Werten des Endpunkts passen; sonst `400`.
5. **Rate-Limit** (Abschnitt 5). Überschritten → `429`.
6. **Spam-Prüfungen** (Abschnitt 4). Treffer → **scheinbarer Erfolg** (gleiche Antwort wie bei Erfolg), aber kein Versand, Logzeile `spam:<grund>`.
7. **Normalisierung** jedes Werts: `trim`, Unicode NFC (`Normalizer::normalize`), Steuerzeichen außer `\n` (nur in `nachricht`) entfernen, mehrfache Leerzeichen zusammenfassen, Zahlen: Tausenderpunkt entfernen, Komma → Punkt.
8. **Feldregeln** aus `formulare.json`: Pflicht, `pflicht_wenn`, Typ, Länge, Bereich, Enum-Whitelist. Unbekannte Felder werden verworfen. Felder mit `sichtbar_wenn`, deren Bedingung nicht erfüllt ist, werden verworfen.
9. **Kreuzregeln:** mindestens `email` oder `telefon`; `aussenflaechen` darf `keine` nicht mit anderen kombinieren.
10. Fehler gesammelt zurückgeben, je Feld genau eine Meldung.

Fehlermeldungen (deutsch, je Feld):

| Fall | Meldung |
|---|---|
| Pflichtfeld leer | „Bitte geben Sie {Label} an.“ |
| `ort` fehlt | „Bitte wählen Sie den Ort der Wohnung.“ |
| weder E-Mail noch Telefon | an beiden Feldern: „Bitte geben Sie eine E-Mail-Adresse oder eine Telefonnummer an.“ |
| E-Mail ungültig | „Bitte prüfen Sie die E-Mail-Adresse, zum Beispiel name@beispiel.de.“ |
| Telefon ungültig | „Bitte prüfen Sie die Telefonnummer. Erlaubt sind Ziffern, Leerzeichen und + ( ) / -.“ |
| Zahl außerhalb Bereich | „Bitte geben Sie einen Wert zwischen {min} und {max} {einheit} an.“ |
| Text zu lang | „Bitte kürzen Sie auf höchstens {max} Zeichen.“ |
| Foto ungültig | „Bitte nur Fotos (JPEG, PNG, WebP, HEIC) bis 8 MB, höchstens {n} Stück.“ |

Dieselben Regeln setzt das Frontend als HTML-Attribute (`required`, `min`, `max`, `maxlength`, `type="email"`, `pattern` für Telefon). Der Server verlässt sich nie darauf.

---

## 4. Spam-Schutz ohne Captcha

### 4.1 Honeypot

```html
<div class="hp" aria-hidden="true">
  <label for="f-website">Bitte leer lassen</label>
  <input id="f-website" name="website" type="text" tabindex="-1" autocomplete="off">
</div>
```

`.hp { position: absolute; left: -9999px; width: 1px; height: 1px; overflow: hidden; }` (nicht `display: none`, damit einfache Bots das Feld ausfüllen). Server: `website` nicht leer → Spam.

### 4.2 Zeitprüfung

Die Seiten sind statisch; ein serverseitiger Zeitstempel beim Ausliefern ist nicht möglich. Deshalb misst das Frontend:

```js
const start = performance.now();
form.addEventListener('submit', () => { form.elements.t.value = String(Math.round(performance.now() - start)); form.elements.js.value = '1'; });
```

Server: `t` vorhanden und < 3000 ms → Spam (Bewertung: < 8000 ms, vier Schritte sind in drei Sekunden nicht ausfüllbar). `t` fehlt (kein JS) → keine Zeitprüfung, dafür strengere Inhaltsprüfung (4.3) und Rate-Limit. Das erfüllt die Vorgabe aus `kontakt.md` („nicht unter drei Sekunden absendbar“) für alle Browser mit JS, ohne Nutzer ohne JS auszusperren.

### 4.3 Inhaltsprüfung

Spam, wenn eines zutrifft:

- `nachricht` enthält mehr als 2 URLs (`https?://` oder `www.`), ohne JS mehr als 0 URLs;
- `name` enthält `://`, `@` oder Ziffern;
- ein Feld enthält `[url=`, `<a href`, `[link`;
- mehr als 30 % der Buchstaben in `nachricht` sind kyrillisch, chinesisch oder arabisch und die Nachricht ist länger als 40 Zeichen (Logzeile mit Grund, damit Fehlalarme sichtbar werden).

---

## 5. Rate-Limit

Zwei Ebenen:

1. **nginx** (`limit_req zone=formulare rate=6r/m burst=5`, 01-technik.md 15.3) gegen Massenanfragen. Antwort `429`.
2. **PHP**, dateibasiert mit `flock`:

| Schlüssel | Grenze | Wirkung bei Überschreitung |
|---|---|---|
| IP (HMAC-SHA256 mit `hmac_geheim` und Tagesdatum) | 3 Anfragen je 10 Minuten, 10 je 24 h | `429`, Meldung „Sie haben in kurzer Zeit mehrere Anfragen gesendet. Bitte rufen Sie mich an: 0159 05844641.“, `Retry-After: 600` |
| Empfänger der Bestätigungsmail (HMAC der E-Mail) | 2 je 24 h | Anfrage wird angenommen, aber **keine** weitere Bestätigungsmail |
| global | 100 Anfragen je 24 h, 50 Bestätigungen je 24 h | darüber: Anfragen weiter an Linus, keine Bestätigungen; Logzeile `limit:global` |

Die IP selbst wird nie gespeichert, nur der HMAC. Dateien in `ratelimit/` älter als 24 h löscht der Kern bei jeder 50. Anfrage (`random_int(1, 50) === 1`) und ein täglicher Cron.

---

## 6. Mailversand

### 6.1 Technik

- **PHPMailer 6** über **SMTP mit Authentifizierung** (Port 587, STARTTLS) am netcup-Mailserver, nicht `mail()`. Grund: definierter Envelope-Absender, DKIM-Signatur durch den Mailserver, saubere Fehlerbehandlung.
- Neues Postfach **`anfrage@roessler-immo.de`** nur für den Versand (Passwort in `config.php`).
- `CharSet = 'UTF-8'`, `Encoding = 'quoted-printable'`, nur `text/plain`. Keine HTML-Mail.
- Header-Injection: PHPMailer prüft Adressen; zusätzlich verwirft die Validierung CR/LF in `name` und `email`.

### 6.2 DMARC-konformer Absender

| Header | Benachrichtigung an Linus | Bestätigung an Absender |
|---|---|---|
| Envelope-From (Return-Path) | `anfrage@roessler-immo.de` | `anfrage@roessler-immo.de` |
| `From` | `Website Rössler Immobilien <anfrage@roessler-immo.de>` | `Linus Rössler <linus@roessler-immo.de>` (Vorgabe aus `wohnung-bewerten.md`/`kontakt.md`) |
| `Reply-To` | `Name <email des Absenders>`, nur wenn E-Mail angegeben | `Linus Rössler <linus@roessler-immo.de>` |
| `To` | `linus@roessler-immo.de` | E-Mail des Absenders |

**Nie** die Adresse des Anfragenden als `From` (heute vermutlich der Fall, M15): Das scheitert an DMARC der fremden Domain.

Prüfpunkt in Session 2: Akzeptiert der netcup-SMTP `From: linus@…` bei Anmeldung als `anfrage@…`? Wenn er mit „Sender address rejected/not owned“ ablehnt, Bestätigung mit `From: Linus Rössler <anfrage@roessler-immo.de>` und `Reply-To: linus@roessler-immo.de` senden. Beide Varianten sind DMARC-konform, weil die From-Domain `roessler-immo.de` ist.

Voraussetzungen DNS (M15), vor dem ersten Live-Versand:

```
roessler-immo.de.          TXT  "v=spf1 mx a include:_spf.webhosting.systems ~all"   (besteht)
<selector>._domainkey      TXT  (DKIM im netcup CCP aktivieren, Selektor aus dem CCP)
_dmarc.roessler-immo.de.   TXT  "v=DMARC1; p=none; rua=mailto:dmarc@roessler-immo.de; adkim=r; aspf=r"
```

Nach vier Wochen Auswertung `p=quarantine`. Test mit mail-tester.com (Ziel ≥ 9/10) und Header-Prüfung einer Testmail an Gmail: `spf=pass`, `dkim=pass header.d=roessler-immo.de`, `dmarc=pass`.

### 6.3 Benachrichtigung an Linus

Betreff (max. 120 Zeichen):

```
[Bewertung] Leonberg-Ramtel · 72 m² · vermietet · Rückruf nachmittags · Maria Beispiel
[Kontakt] Ort: Pforzheim · verkaufen lassen · Rückruf abends · Peter Muster
[Ankauf] Ditzingen · Bj. 1974 · 65 m² · so bald wie möglich · Anna Probe
```

Text (`vorlagen/benachrichtigung.txt`): alle ausgefüllten Felder mit Label in Formularreihenfolge, Auswahlwerte als Klartext (Label aus JSON), leere Felder weggelassen; danach:

```
--
Formular: bewertung v1 · Seite: /wohnung-bewerten/ · Eingang: 01.11.2026 14:32 (Europe/Berlin)
JavaScript: ja · Bestätigung an Absender: gesendet | nicht gesendet (keine E-Mail) | nicht gesendet (Limit)
Antwortzusage: innerhalb eines Werktags
```

Keine IP-Adresse, kein User-Agent in der Mail. Fotos (Ankauf) als Anhänge, Dateiname `foto-1.jpg` … (Originalname verworfen).

### 6.4 Bestätigung an den Absender

Nur wenn eine gültige E-Mail angegeben ist und die Limits es erlauben. **Inhalt ist fester Text**; aus der Eingabe erscheinen nur `name` (validiert, siehe 2.1) und Auswahlwerte, **nie** Freitext (`nachricht`, `strasse`, `stadtteil`, `ort_sonst`). So kann das Formular nicht zum Versand fremder Inhalte an Dritte missbraucht werden.

Betreff für alle drei: **„Ihre Anfrage bei Rössler Immobilien“** (Vorgabe aus den Texten).

`vorlagen/bestaetigung-bewertung.txt`:

```
Guten Tag {name},

danke, Ihre Anfrage ist angekommen.

So geht es weiter: Ich melde mich innerhalb eines Werktags bei Ihnen, meist telefonisch{rueckruf_satz}. Innerhalb von zwei Werktagen erhalten Sie die schriftliche Ersteinschätzung per E-Mail: eine Preisspanne mit Begründung. Wenn Sie möchten, vereinbaren wir danach einen Termin vor Ort.

Bis dahin sparen drei Dinge Zeit, falls Sie sie zur Hand haben:
- den letzten Wirtschaftsplan und die Jahresabrechnung,
- das Protokoll der letzten Eigentümerversammlung,
- den Energieausweis des Gebäudes.
Was fehlt, fordere ich später mit Ihrer Vollmacht bei der Verwaltung an.

Ihre Angaben: {ort_klartext}{wohnflaeche_satz}.

Haben Sie etwas vergessen? Rufen Sie mich an: 0159 05844641.

Viele Grüße
Linus Rössler
Rössler Immobilien · roessler-immo.de · 0159 05844641

Diese E-Mail wurde automatisch versendet, weil auf roessler-immo.de eine Anfrage mit Ihrer Adresse abgeschickt wurde. Waren Sie das nicht, ignorieren Sie die Nachricht; Ihre Daten lösche ich auf Zuruf: linus@roessler-immo.de. Datenschutz: https://roessler-immo.de/datenschutz/
```

`{rueckruf_satz}` = „ im Zeitfenster „nachmittags““ bzw. leer. `{wohnflaeche_satz}` = „, rund 72 m²“ bzw. leer.

`vorlagen/bestaetigung-kontakt.txt` (aus `kontakt.md`):

```
Guten Tag {name},

ich habe Ihre Nachricht erhalten und melde mich innerhalb eines Werktags, meist telefonisch{rueckruf_satz}.

So geht es weiter:
1. Ich rufe Sie an. Wir sprechen etwa 15 Minuten über Ihre Wohnung, Ihren Zeitplan und Ihre Fragen. Sie müssen nichts vorbereiten.
2. Bei Bedarf vereinbaren wir einen Termin vor Ort. Hilfreich, aber nicht nötig: die letzte Hausgeldabrechnung, das letzte Protokoll der Eigentümerversammlung und der Grundriss.
3. Sie erhalten eine schriftliche Ersteinschätzung mit Preisspanne und Begründung. Kostenlos, ohne Verpflichtung, ohne Weitergabe Ihrer Daten.

Sie möchten nicht warten? Telefon 0159 05844641.

Viele Grüße
Linus Rössler
Rössler Immobilien · roessler-immo.de · 0159 05844641

{fusszeile wie oben}
```

`vorlagen/bestaetigung-ankauf.txt`:

```
Guten Tag {name},

danke für Ihre Angaben zur Wohnung in {ort_klartext}. Ich melde mich innerhalb eines Werktags, meist telefonisch.

Bevor ich ein Ankaufsangebot mache, erhalten Sie von mir eine schriftliche Einschätzung, was eine Vermittlung am Markt bringen würde. Dann entscheiden Sie, welcher Weg für Sie passt. Ein Angebot von mir erhalten Sie immer schriftlich, mit Kaufpreis, Abschlag in Prozent und Bedenkzeit. Eine zweite Meinung einzuholen, empfehle ich ausdrücklich.

Fragen vorab? Telefon 0159 05844641.

Viele Grüße
Linus Rössler
Rössler Immobilien · roessler-immo.de · 0159 05844641

{fusszeile wie oben}
```

Telefonnummer, Antwortzeit und Namen kommen zur Laufzeit aus `lib/fakten.json`, nicht literal aus der Vorlage. [LINUS]-Marker der Texte (Fristen, „auch abends“) müssen vor dem Livegang geklärt sein; die Vorlagen enthalten nur bereits geklärte Zusagen.

### 6.5 Fehler beim Versand

SMTP-Fehler bei der Benachrichtigung: Anfrage in `anfragen/notfall.csv` schreiben (auch wenn `csv_aktiv` aus ist), Logzeile `mail:fehler`, Antwort `500` mit dem wörtlichen Fehlertext aus `wohnung-bewerten.md`:

> „Die Anfrage konnte nicht gesendet werden. Rufen Sie mich an unter 0159 05844641 oder schreiben Sie an linus@roessler-immo.de.“

Fehler bei der Bestätigung: Anfrage gilt als erfolgreich, Vermerk in der Benachrichtigung („Bestätigung: Fehler“).

---

## 7. Antworten: JSON für JS, Weiterleitung ohne JS

Erkennung: JSON-Antwort, wenn `Accept` `application/json` enthält (das Frontend sendet `Accept: application/json`). Sonst HTML-Fluss.

| Fall | Mit JS (JSON) | Ohne JS (HTML) |
|---|---|---|
| Erfolg | `200` `{"ok":true,"weiter":"/wohnung-bewerten/danke/"}` | `303` `Location: /wohnung-bewerten/danke/` |
| Spam erkannt | identisch zu Erfolg | identisch zu Erfolg |
| Validierungsfehler | `422` `{"ok":false,"meldung":"Bitte prüfen Sie die markierten Angaben.","fehler":{"email":"Bitte prüfen Sie …"}}` | `422` HTML-Fehlerseite (unten) |
| Rate-Limit | `429` `{"ok":false,"meldung":"Sie haben in kurzer Zeit …"}` + `Retry-After` | `429` HTML-Fehlerseite mit derselben Meldung |
| falsche Methode/Typ/Herkunft | `405`/`415`/`403` `{"ok":false}` | GET → `303` zurück; sonst Fehlerseite |
| Serverfehler/Mail | `500` `{"ok":false,"meldung":"Die Anfrage konnte nicht gesendet werden. …"}` | `500` Fehlerseite mit diesem Text |

Alle Antworten: `Cache-Control: no-store`, `X-Content-Type-Options: nosniff` (nginx), JSON mit `Content-Type: application/json; charset=utf-8`, `JSON_UNESCAPED_UNICODE`.

**HTML-Fehlerseite ohne JS:** Astro baut `/formular-fehler/index.html` (noindex, normales Layout) mit den Platzhaltern `<!--FEHLERLISTE-->` und `<!--ZURUECK-->`. PHP liest die Datei aus `webroot`, ersetzt:

- `<!--FEHLERLISTE-->` durch `<ul>` mit je `<li><strong>{Label}:</strong> {Meldung}</li>` (alles `htmlspecialchars`),
- `<!--ZURUECK-->` durch `<a class="btn-primaer" href="{seite}#formular">Zurück zum Formular</a>` plus Satz „Ihre Eingaben sind in den meisten Browsern noch vorhanden, wenn Sie mit der Zurück-Taste des Browsers zurückgehen.“ und Telefonnummer.

So hat die Fehlerseite dasselbe Design, dieselbe CSP und kein Inline-Skript.

---

## 8. Danke-Seiten

| URL | Text | Inhalt |
|---|---|---|
| `/wohnung-bewerten/danke/` | `texte/danke-bewertung.md` (aus `wohnung-bewerten.md`, Abschnitt „Text für die Danke-Seite“) | „Danke, Ihre Anfrage ist angekommen.“, drei nächste Schritte, Unterlagenhinweis, Telefon |
| `/kontakt/danke/` | `texte/danke-kontakt.md` (aus `kontakt.md`) | drei Schritte, Telefon, Links „wie ich eine Wohnung verkaufe“, „was in einem Verkaufsplan steht“ |
| `/direktankauf/danke/` | `texte/danke-ankauf.md` (neu, Wortlaut wie Bestätigung Ankauf) | |

Alle `typ: danke`: `noindex, follow`, nicht in der Sitemap, keine Anrufleiste, kein Formular. Nicht per `robots.txt` sperren (sonst sieht Google das `noindex` nicht). Zählung über die nginx-Logs (01-technik.md 14).

Die Danke-Seite muss auch direkt aufrufbar sein (Lesezeichen, Zurück-Taste); sie enthält keine Daten der Anfrage.

---

## 9. Speicherung

- **Keine Datenbank.** Primärer Kanal ist die Mail an `linus@roessler-immo.de`.
- **Optional CSV** (`csv_aktiv: true`), als Sicherung, falls eine Mail verloren geht:
  - Datei `formular-daten/anfragen/YYYY-MM.csv`, `chmod 600`, außerhalb des Webroots, UTF-8 mit BOM (Excel), Trennzeichen `;`.
  - Spalten: `eingang;formular;version;seite;name;email;telefon;ort;…alle Felder…;bestaetigung`.
  - Schutz gegen Formel-Injektion: Werte, die mit `=`, `+`, `-`, `@`, Tab oder CR beginnen, erhalten ein vorangestelltes `'`.
  - Schreiben mit `fopen('a')` + `flock(LOCK_EX)`.
  - **Löschfrist: sechs Monate nach Monatsende**, per Cron:

```cron
15 3 * * * find /home/USER/roessler-immo/formular-daten/anfragen -name '*.csv' -mtime +190 -delete
20 3 * * * find /home/USER/roessler-immo/formular-daten/ratelimit -type f -mmin +1440 -delete
25 3 * * * find /home/USER/roessler-immo/formular-daten/log -type f -mtime +30 -delete
```

  - Entsteht aus einer Anfrage ein Auftrag, überträgt Linus die Daten in seine Auftragsunterlagen; die CSV-Zeile läuft trotzdem nach sechs Monaten ab.
- **Log** `formular.log`, eine Zeile je Anfrage: Zeit, Formular, Ergebnis (`ok`, `spam:honeypot`, `spam:zeit`, `spam:inhalt`, `limit:ip`, `limit:global`, `fehler:validierung`, `mail:fehler`), Dauer in ms. Keine Namen, Adressen, IPs.
- **Fotos** (Ankauf) werden nur als Mail-Anhang verarbeitet und danach aus dem PHP-Temp-Verzeichnis gelöscht; keine Ablage auf dem Server.
- **Mailpostfach:** Linus löscht Anfragen, aus denen kein Auftrag wird, nach sechs Monaten (gleiche Frist wie CSV, in der Datenschutzerklärung genannt).

---

## 10. Ablauf im Kern (Skizze)

```php
<?php // formular/lib/bootstrap.php (Auszug)
declare(strict_types=1);
namespace Formular;

function verarbeite(array $erlaubt): never {
  $cfg  = require __DIR__ . '/../config.php';
  $json = str_contains($_SERVER['HTTP_ACCEPT'] ?? '', 'application/json');
  $def  = json_decode(file_get_contents(__DIR__ . '/formulare.json'), true, flags: JSON_THROW_ON_ERROR);

  if ($_SERVER['REQUEST_METHOD'] !== 'POST') zurueck303($_GET['seite'] ?? '/kontakt/');
  pruefeGroesseTypHerkunft();                                   // 413/415/403
  $art = $_POST['formular'] ?? '';
  if (!in_array($art, $erlaubt, true)) antworte(400, ['ok' => false], $json);

  $ip = hash_hmac('sha256', $_SERVER['REMOTE_ADDR'] . date('Y-m-d'), $cfg['hmac_geheim']);
  if (!RateLimit\erlaube($cfg, "ip:$ip", [[3, 600], [10, 86400]])) antworteLimit($json);

  $weiter = $def[$art]['danke'];                                // z. B. /wohnung-bewerten/danke/
  if ($grund = Spam\pruefe($_POST, $art)) { Log\schreibe($cfg, $art, "spam:$grund"); erfolg($weiter, $json); }

  [$werte, $fehler] = Validierung\pruefe($def[$art], $_POST, $_FILES);
  if ($fehler) { Log\schreibe($cfg, $art, 'fehler:validierung'); antworteFehler($fehler, $def[$art], $json); }

  try { Mail\benachrichtige($cfg, $art, $werte); }
  catch (\Throwable $e) { Speicher\notfall($cfg, $art, $werte); Log\schreibe($cfg, $art, 'mail:fehler'); antworte500($json); }

  $bestaetigt = Mail\bestaetige($cfg, $art, $werte);           // prüft E-Mail-Limit und globales Limit
  if ($cfg['csv_aktiv']) Speicher\csv($cfg, $art, $werte, $bestaetigt);
  Log\schreibe($cfg, $art, 'ok');
  erfolg($weiter, $json);                                       // 200 JSON oder 303
}
```

Lokale Entwicklung und Tests: `config.php` mit `'transport' => 'datei'` schreibt Mails als `.eml` nach `formular-daten/test-mails/` statt SMTP; Playwright startet `php -S 127.0.0.1:4321 -t dist tests/router.php` (04-tests.md).

---

## 11. Datenschutz-Hinweise

Kein Rechtsrat; Formulierungen in der Datenschutzerklärung mit dem Ersteller der Datenschutzerklärung abstimmen.

1. **Rechtsgrundlage** der Formulare: Art. 6 Abs. 1 lit. b DSGVO (Anfrage zu einer Leistung, vorvertragliche Maßnahme). Keine Einwilligungs-Checkbox, kein Newsletter-Häkchen (Vorgabe `wohnung-bewerten.md`: „Hinweistext, kein Häkchen nötig“). Datenschutz-Satz wörtlich aus `wohnung-bewerten.md` unter jedem Formular.
2. **Spam-Schutz und Rate-Limit:** Art. 6 Abs. 1 lit. f DSGVO; nur HMAC der IP mit täglich wechselndem Bestandteil, Löschung nach 24 h.
3. **Server-Logs:** anonymisierte IP (01-technik.md 14), 14 Tage.
4. **Empfänger:** netcup GmbH als Hoster und Mailserver (Auftragsverarbeitungsvertrag im CCP abschließen und ablegen). Keine Weitergabe an Portale, Makler oder sonstige Dritte (Zusage im Formulartext).
5. **Speicherdauer:** Anfragen ohne Auftrag sechs Monate (Mail, CSV); mit Auftrag nach den gesetzlichen Aufbewahrungsfristen.
6. **Bestätigungsmail** enthält nur feste Texte, Namen und Auswahlwerte.
7. **Keine Cookies, kein Tracking, keine externen Schriften.** Abschnitte in der Datenschutzerklärung: „Kontaktformular“, „Formular Ersteinschätzung“, „Formular Direktankauf“ (inkl. Fotos, falls aktiv), „E-Mail-Bestätigung“, „Server-Logdateien“, „Keine Cookies“; Abschnitt „Google Fonts“ streichen (M7). Aufsichtsbehörde je nach Sitzentscheidung (M6), bei Sitz in Baden-Württemberg der LfDI BW.
8. **Betroffenenrechte:** Löschung auf Zuruf per E-Mail; Linus löscht dann Mail und CSV-Zeile (CSV per `grep -v` der E-Mail-Adresse).
9. **WhatsApp** nur nach Entscheidung (M10); dann eigener Abschnitt (Meta, Drittlandübermittlung).

---

## 12. Abnahme (Kurzfassung, Details in 04-tests.md)

- Alle drei Formulare ohne JS absendbar, landen auf der Danke-Seite, Mail kommt an.
- Mit JS: Schritte, Zurück-Taste geht einen Schritt zurück, Fehler erscheinen am Feld, Erfolg leitet weiter.
- Honeypot gefüllt → Danke-Seite, aber keine Mail.
- `t=500` mit JS → keine Mail.
- 4. Anfrage innerhalb 10 Minuten von derselben IP → 429.
- Testmail an Gmail: SPF, DKIM, DMARC `pass`; Bestätigung kommt an, nicht im Spam.
- `GET /kontakt.php` → 303.
- Keine Datei unter `formular-daten/` ist über HTTP erreichbar (`curl` auf geratene Pfade → 404).
