<?php
// nachweis-pruefen: prüft die Nachweiskette (Hash-Kette) und die gespeicherten Mail-Kopien.
// Läuft auf dem Server oder auf einer entschlüsselten Sicherung (Laptop), braucht nur PHP 8.1+.
//
//   php nachweis-pruefen.php                          Datenordner aus ../config.php
//   php nachweis-pruefen.php --daten /pfad/expose-daten
//   php nachweis-pruefen.php --vorgang EX-261104-1A2B3C4D      zeigt die Einträge eines Vorgangs
//   php nachweis-pruefen.php --anker <prüfwert> [--anker …]     Prüfwert aus einer Mail (Interessent, Tagesanker)
//   php nachweis-pruefen.php --export nachweis-EX-….json        exportierte Nachweis-Datei prüfen (ohne Server)
//
// Ergebnis: Exit-Code 0 = in Ordnung, 1 = Fehler gefunden, 2 = Aufruf/Datei fehlerhaft.
declare(strict_types=1);

namespace Expose;

if (PHP_SAPI !== 'cli') { http_response_code(404); exit; }
require __DIR__ . '/../lib/kette.php';

$opt = ['daten' => null, 'vorgang' => null, 'anker' => [], 'export' => null, 'json' => false];
for ($i = 1; $i < $argc; $i++) {
    $a = $argv[$i];
    if ($a === '--json') { $opt['json'] = true; continue; }
    if (in_array($a, ['--daten', '--vorgang', '--anker', '--export'], true) && isset($argv[$i + 1])) {
        $k = substr($a, 2); $w = $argv[++$i];
        if ($k === 'anker') $opt['anker'][] = strtolower(trim($w)); else $opt[$k] = $w;
        continue;
    }
    fwrite(STDERR, "Unbekannte Option: $a\n"); exit(2);
}

$ausgabe = [];
$p = static function (string $z) use (&$ausgabe, $opt) { if (!$opt['json']) echo $z, "\n"; $ausgabe[] = $z; };

if ($opt['export'] !== null) {
    $x = json_decode((string)@file_get_contents($opt['export']));
    if (!is_object($x) || ($x->format ?? '') !== 'roessler-expose-nachweis/1' || !is_array($x->kette ?? null)) { fwrite(STDERR, "Keine gültige Nachweis-Datei.\n"); exit(2); }
    $r = kette_pruefen((function () use ($x) { foreach ($x->kette as $i => $e) yield ['datei' => 'Export', 'zeile' => $i + 1, 'eintrag' => $e]; })(), $opt['anker'], true);
    // Mail-Kopien gegen die Prüfwerte in der Kette
    $soll = [];
    foreach ($x->kette as $e) if (isset($e->inhalt->kopie, $e->inhalt->eml_sha256)) $soll[$e->inhalt->kopie] = $e->inhalt->eml_sha256;
    foreach ((array)($x->mails ?? []) as $datei => $m) {
        $eml = base64_decode((string)($m->eml_base64 ?? ''), true);
        if ($eml === false || !isset($soll[$datei]) || !hash_equals((string)$soll[$datei], hash('sha256', $eml))) $r['fehler'][] = "Mail-Kopie $datei passt nicht zum Prüfwert in der Kette";
    }
    $r['ok'] = !$r['fehler'];
    $p('Nachweis-Datei: ' . basename($opt['export']) . ' · Vorgang ' . ($x->vorgang->vorgang ?? '?'));
} else {
    $daten = $opt['daten'];
    if ($daten === null) {
        $cfgDatei = getenv('EXPOSE_CONFIG') ?: __DIR__ . '/../config.php';
        $c = is_file($cfgDatei) ? (require $cfgDatei) : null;
        $daten = is_array($c) ? ($c['daten'] ?? null) : null;
        if (!$daten) { fwrite(STDERR, "Datenordner unbekannt: --daten angeben.\n"); exit(2); }
    }
    $ordner = rtrim($daten, '/') . '/nachweise';
    if (!is_dir($ordner)) { fwrite(STDERR, "Ordner fehlt: $ordner\n"); exit(2); }
    $r = kette_pruefen(kette_lesen($ordner), $opt['anker']);
    // Mail-Kopien
    $mails = 0;
    foreach (kette_lesen($ordner) as $z) {
        $e = $z['eintrag'];
        if (!isset($e->inhalt->kopie, $e->inhalt->eml_sha256)) continue;
        $datei = rtrim($daten, '/') . '/' . $e->inhalt->kopie;
        if (!preg_match('#^nachweise/mails/[A-Za-z0-9-]+\.eml$#D', (string)$e->inhalt->kopie)) { $r['fehler'][] = "Nr. {$e->seq}: Pfad der Mail-Kopie ungültig"; continue; }
        if (!is_file($datei)) { $r['fehler'][] = "Nr. {$e->seq}: Mail-Kopie fehlt ({$e->inhalt->kopie})"; continue; }
        if (!hash_equals((string)$e->inhalt->eml_sha256, hash_file('sha256', $datei))) $r['fehler'][] = "Nr. {$e->seq}: Mail-Kopie verändert ({$e->inhalt->kopie})";
        $mails++;
    }
    $r['mails_geprueft'] = $mails;
    $r['ok'] = !$r['fehler'];
    $p("Nachweiskette: $ordner");
    $p("Mail-Kopien geprüft: $mails");
    if ($opt['vorgang'] !== null) {
        $p("Einträge zu {$opt['vorgang']}:");
        foreach (kette_lesen($ordner) as $z) {
            $e = $z['eintrag'];
            if (($e->vorgang ?? null) !== $opt['vorgang']) continue;
            $p(sprintf('  Nr. %d  %s  %-22s %s%s', $e->seq, $e->zeit, $e->typ, $e->hash, $e->inhalt === null ? '  (geschwärzt)' : ''));
        }
    }
}

$p(sprintf('Einträge: %d, geschwärzt: %d%s', $r['anzahl'], $r['geschwaerzt'], $r['ohne_inhalt'] ? ", ohne Inhalt (nicht im Export): {$r['ohne_inhalt']}" : ''));
if ($r['kopf']) $p("Kettenkopf: Nr. {$r['kopf']['seq']} vom {$r['kopf']['zeit']}\n            {$r['kopf']['hash']}");
foreach ($r['anker'] as $a) $p('Anker ' . $a['hash'] . ': ' . ($a['seq'] ? "gefunden bei Nr. {$a['seq']}" : 'NICHT GEFUNDEN'));
foreach ($r['fehler'] as $f) $p("FEHLER: $f");
$p($r['ok'] ? 'ERGEBNIS: in Ordnung. Kein Eintrag wurde verändert, eingefügt oder entfernt.' : 'ERGEBNIS: NICHT in Ordnung (siehe FEHLER).');
if ($opt['json']) echo json_encode($r, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT), "\n";
exit($r['ok'] ? 0 : 1);
