<?php
// Nachweis-Kette: fortlaufend nummerierte, per SHA-256 verkettete Protokolleinträge (JSON Lines).
//
// Jeder Eintrag: seq, zeit, typ, vorgang, inhalt, inhalt_sha256, vorher, hash
//   inhalt_sha256 = SHA-256 über den kanonischen JSON-Text des Inhalts
//   hash          = SHA-256 über den kanonischen JSON-Text von {seq, zeit, typ, vorgang, inhalt_sha256, vorher}
//   vorher        = hash des vorigen Eintrags (beim ersten Eintrag 64 Nullen)
//
// Wird ein Eintrag verändert, eingefügt oder gelöscht, passt die Kette nicht mehr. Personendaten lassen sich
// nach Ablauf der Frist schwärzen (inhalt = null): Der Prüfwert inhalt_sha256 bleibt, die Kette bleibt prüfbar.
//
// Diese Datei hängt nicht von config.php ab, damit nachweis-pruefen.php auch auf einer Sicherungskopie
// (z. B. auf dem Laptop) läuft.
declare(strict_types=1);

namespace Expose;

const KETTE_START = '0000000000000000000000000000000000000000000000000000000000000000';
const KETTE_JSON = JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_INVALID_UTF8_SUBSTITUTE | JSON_THROW_ON_ERROR;

ini_set('serialize_precision', '-1');   // Zahlen überall gleich darstellen (Server und Laptop)

/** Kanonisches JSON: Objektschlüssel sortiert, keine Leerzeichen, feste Zahlendarstellung. */
function kanonisch(mixed $v): string
{
    if ($v instanceof \stdClass) {
        $a = (array)$v;
        ksort($a, SORT_STRING);
        $teile = [];
        foreach ($a as $k => $x) $teile[] = json_encode((string)$k, KETTE_JSON) . ':' . kanonisch($x);
        return '{' . implode(',', $teile) . '}';
    }
    if (is_array($v)) {
        if (array_is_list($v)) return '[' . implode(',', array_map(__NAMESPACE__ . '\kanonisch', $v)) . ']';
        ksort($v, SORT_STRING);
        $teile = [];
        foreach ($v as $k => $x) $teile[] = json_encode((string)$k, KETTE_JSON) . ':' . kanonisch($x);
        return '{' . implode(',', $teile) . '}';
    }
    if (is_object($v)) throw new \InvalidArgumentException('Objekt im Nachweis nicht erlaubt');
    return json_encode($v, KETTE_JSON);
}

function kette_eintrag_hash(object|array $e): string
{
    $e = (object)$e;
    return hash('sha256', kanonisch([
        'seq' => $e->seq, 'zeit' => $e->zeit, 'typ' => $e->typ, 'vorgang' => $e->vorgang,
        'inhalt_sha256' => $e->inhalt_sha256, 'vorher' => $e->vorher,
    ]));
}

function kette_dateien(string $ordner): array
{
    $d = glob(rtrim($ordner, '/') . '/[0-9][0-9][0-9][0-9]-[0-9][0-9].jsonl') ?: [];
    sort($d, SORT_STRING);
    return $d;
}

/** Letzter Eintrag der Kette (seq, hash) oder Startwert. */
function kette_kopf(string $ordner): array
{
    foreach (array_reverse(kette_dateien($ordner)) as $datei) {
        $letzte = '';
        $fh = fopen($datei, 'rb');
        if (!$fh) throw new \RuntimeException('Nachweisdatei nicht lesbar');
        while (($z = fgets($fh)) !== false) if (trim($z) !== '') $letzte = $z;
        fclose($fh);
        if ($letzte === '') continue;
        $e = json_decode($letzte);
        if (!is_object($e) || !isset($e->seq, $e->hash)) throw new \RuntimeException('Nachweiskette: letzte Zeile unlesbar (' . basename($datei) . ')');
        return ['seq' => (int)$e->seq, 'hash' => (string)$e->hash];
    }
    return ['seq' => 0, 'hash' => KETTE_START];
}

function kette_sperre(string $ordner, int $art = LOCK_EX)
{
    $fh = fopen(rtrim($ordner, '/') . '/.lock', 'c');
    if (!$fh || !flock($fh, $art)) throw new \RuntimeException('Nachweiskette: Sperre nicht möglich');
    return $fh;
}

/**
 * Hängt einen Eintrag an. Gibt ['seq' => …, 'hash' => …, 'zeit' => …] zurück.
 * Exklusive Dateisperre: gleichzeitige Anfragen werden nacheinander geschrieben, die Kette bleibt lückenlos.
 */
function kette_anhaengen(string $ordner, string $typ, ?string $vorgang, array $inhalt, ?\DateTimeImmutable $zeit = null): array
{
    $zeit ??= new \DateTimeImmutable('now');
    $sperre = kette_sperre($ordner);
    try {
        $kopf = kette_kopf($ordner);
        $e = [
            'seq' => $kopf['seq'] + 1,
            'zeit' => $zeit->format('Y-m-d\TH:i:s.vP'),
            'typ' => $typ,
            'vorgang' => $vorgang,
            'inhalt' => $inhalt,
            'inhalt_sha256' => hash('sha256', kanonisch($inhalt)),
            'vorher' => $kopf['hash'],
        ];
        $e['hash'] = kette_eintrag_hash($e);
        $datei = rtrim($ordner, '/') . '/' . $zeit->format('Y-m') . '.jsonl';
        $fh = fopen($datei, 'ab');
        if (!$fh) throw new \RuntimeException('Nachweisdatei nicht schreibbar');
        $zeile = kanonisch($e) . "\n";
        if (fwrite($fh, $zeile) !== strlen($zeile)) { fclose($fh); throw new \RuntimeException('Nachweis unvollständig geschrieben'); }
        fflush($fh);
        if (function_exists('fsync')) @fsync($fh);
        fclose($fh);
        @chmod($datei, 0600);
        return ['seq' => $e['seq'], 'hash' => $e['hash'], 'zeit' => $e['zeit']];
    } finally {
        flock($sperre, LOCK_UN);
        fclose($sperre);
    }
}

/** Liest alle Einträge (als Objekte) in Dateireihenfolge. Unlesbare Zeilen kommen als ['fehler' => …]. */
function kette_lesen(string $ordner): \Generator
{
    foreach (kette_dateien($ordner) as $datei) {
        $fh = fopen($datei, 'rb');
        if (!$fh) throw new \RuntimeException('Nachweisdatei nicht lesbar: ' . basename($datei));
        $nr = 0;
        while (($z = fgets($fh)) !== false) {
            $nr++;
            if (trim($z) === '') continue;
            $e = json_decode($z);
            yield ['datei' => basename($datei), 'zeile' => $nr, 'eintrag' => is_object($e) ? $e : null];
        }
        fclose($fh);
    }
}

/**
 * Prüft eine Folge von Einträgen.
 *   $teilweise = true: Einträge ohne Inhalt (Export für einen Vorgang) gelten nicht als geschwärzt.
 *   $anker: Liste von Prüfwerten (z. B. aus der Bestätigungs-Mail des Interessenten oder dem Tagesanker).
 */
function kette_pruefen(iterable $eintraege, array $anker = [], bool $teilweise = false): array
{
    $r = ['ok' => true, 'anzahl' => 0, 'geschwaerzt' => 0, 'ohne_inhalt' => 0, 'fehler' => [], 'kopf' => null, 'erste_seq' => null, 'anker' => []];
    $anker = array_values(array_unique(array_map('strtolower', array_filter($anker))));
    $gefunden = [];
    $vorher = null; $seq = null;
    foreach ($eintraege as $z) {
        $wo = ($z['datei'] ?? 'Export') . ':' . ($z['zeile'] ?? '?');
        $e = $z['eintrag'] ?? null;
        if (!is_object($e)) { $r['fehler'][] = "$wo: Zeile ist kein gültiges JSON"; continue; }
        foreach (['seq', 'zeit', 'typ', 'inhalt_sha256', 'vorher', 'hash'] as $f) {
            if (!property_exists($e, $f)) { $r['fehler'][] = "$wo: Feld „$f“ fehlt"; continue 2; }
        }
        if (!property_exists($e, 'vorgang')) $e->vorgang = null;
        $r['anzahl']++;
        if ($seq === null) {
            $r['erste_seq'] = (int)$e->seq;
            if ((int)$e->seq === 1 && $e->vorher !== KETTE_START) $r['fehler'][] = "$wo: erster Eintrag hat falschen Startwert";
        } elseif ((int)$e->seq !== $seq + 1) {
            $r['fehler'][] = "$wo: Nr. {$e->seq} folgt auf Nr. $seq (Lücke, Doppelung oder Reihenfolge geändert)";
        }
        if ($vorher !== null && !hash_equals($vorher, (string)$e->vorher)) $r['fehler'][] = "$wo (Nr. {$e->seq}): Verkettung gebrochen (vorher passt nicht zum vorigen Eintrag)";
        $soll = kette_eintrag_hash($e);
        if (!hash_equals($soll, (string)$e->hash)) $r['fehler'][] = "$wo (Nr. {$e->seq}): Eintrag verändert (Prüfwert stimmt nicht)";
        if (property_exists($e, 'inhalt') && $e->inhalt !== null) {
            if (!hash_equals(hash('sha256', kanonisch($e->inhalt)), (string)$e->inhalt_sha256)) $r['fehler'][] = "$wo (Nr. {$e->seq}): Inhalt verändert (inhalt_sha256 stimmt nicht)";
        } elseif ($teilweise && !property_exists($e, 'geschwaerzt')) {
            $r['ohne_inhalt']++;
        } else {
            $r['geschwaerzt']++;
        }
        foreach ($anker as $a) if (hash_equals($a, strtolower((string)$e->hash))) $gefunden[$a] = (int)$e->seq;
        $vorher = (string)$e->hash;
        $seq = (int)$e->seq;
        $r['kopf'] = ['seq' => $seq, 'hash' => $vorher, 'zeit' => (string)$e->zeit];
    }
    foreach ($anker as $a) {
        $r['anker'][] = ['hash' => $a, 'seq' => $gefunden[$a] ?? null];
        if (!isset($gefunden[$a])) $r['fehler'][] = "Anker $a kommt in der Kette nicht vor (Eintrag gelöscht oder Kette ersetzt)";
    }
    $r['ok'] = !$r['fehler'];
    return $r;
}

/**
 * Schwärzt die Inhalte aller Einträge, für die $auswahl(object $eintrag) true liefert (DSGVO-Löschung
 * nach Fristablauf). Prüfwerte bleiben, die Kette bleibt prüfbar. Gibt die Zahl geschwärzter Einträge zurück.
 */
function kette_schwaerzen(string $ordner, callable $auswahl, string $zeit): int
{
    $n = 0;
    $sperre = kette_sperre($ordner);
    try {
        foreach (kette_dateien($ordner) as $datei) {
            $zeilen = file($datei, FILE_IGNORE_NEW_LINES);
            if ($zeilen === false) throw new \RuntimeException('Nachweisdatei nicht lesbar');
            $geaendert = false;
            foreach ($zeilen as $i => $z) {
                if (trim($z) === '') continue;
                $e = json_decode($z);
                if (!is_object($e) || ($e->inhalt ?? null) === null || !$auswahl($e)) continue;
                $e->inhalt = null;
                $e->geschwaerzt = $zeit;
                $zeilen[$i] = kanonisch($e);
                $geaendert = true; $n++;
            }
            if ($geaendert) {
                $tmp = $datei . '.tmp-' . bin2hex(random_bytes(4));
                if (file_put_contents($tmp, implode("\n", $zeilen) . "\n") === false) throw new \RuntimeException('Schwärzen: Schreiben fehlgeschlagen');
                @chmod($tmp, 0600);
                rename($tmp, $datei);
            }
        }
    } finally {
        flock($sperre, LOCK_UN);
        fclose($sperre);
    }
    return $n;
}
