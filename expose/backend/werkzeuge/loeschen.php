<?php
// Löschen nach Fristen (DSGVO, recherche.md 1.5). Für Cron.
//
//   php loeschen.php --technik            täglich: Rate-Limit (24 h), Sitzungen (1 Tag), Betriebslog (90 Tage), Testmails
//   php loeschen.php                      Probelauf: zeigt, welche Vorgänge fällig sind (ändert nichts)
//   php loeschen.php --ausfuehren         löscht fällige Vorgänge: Vorgangsdatei und Mail-Kopien weg,
//                                         Inhalte in der Nachweiskette geschwärzt (Prüfwerte bleiben)
//   --bericht                             Ergebnis zusätzlich per Mail an Linus
//   --heute JJJJ-MM-TT                    Stichtag (nur für Tests)
//
// Frist (Vorschlag, [ZU PRÜFEN] mit der Anwältin): Ende des 3. Kalenderjahres nach dem letzten Kontakt
// (Vertrag, letzter Abruf, Widerruf). Mit „Aufbewahren bis“ (Admin, z. B. bei Kauf) entsprechend länger.
declare(strict_types=1);

namespace Expose;

if (PHP_SAPI !== 'cli') { http_response_code(404); exit; }
require __DIR__ . '/../lib/kern.php';

$args = array_slice($argv, 1);
$heute = new \DateTimeImmutable('today');
if (($i = array_search('--heute', $args, true)) !== false && isset($args[$i + 1])) $heute = new \DateTimeImmutable($args[$i + 1]);
$ausfuehren = in_array('--ausfuehren', $args, true);
$bericht = [];
$sag = function (string $z) use (&$bericht) { echo $z, "\n"; $bericht[] = $z; };

cfg();

// ---------- technische Daten ----------
if (in_array('--technik', $args, true)) {
    $n = aufraeumen_ratelimit();
    $s = 0; foreach (glob(daten('sitzungen/sess_*')) ?: [] as $f) if (filemtime($f) < time() - 86400 && @unlink($f)) $s++;
    $l = 0; foreach (glob(daten('log/*.log')) ?: [] as $f) if (filemtime($f) < time() - 90 * 86400 && @unlink($f)) $l++;
    $t = 0; foreach (glob(daten('test-mails/*.eml')) ?: [] as $f) if (filemtime($f) < time() - 30 * 86400 && @unlink($f)) $t++;
    foreach (glob(daten('vorgaenge/.tmp-*')) ?: [] as $f) if (filemtime($f) < time() - 3600) @unlink($f);
    $sag("Technik: $n Rate-Limit-Dateien, $s Sitzungen, $l Logdateien, $t Testmails gelöscht");
    exit(0);
}

// ---------- Vorgänge nach Frist ----------
$faellig = [];
foreach (vorgaenge_alle() as $vg) {
    $kontakt = max(array_map(fn($z) => (new \DateTimeImmutable($z))->getTimestamp(), array_filter([$vg['vertrag'], $vg['letzter_abruf'] ?? null, $vg['widerrufen_am'] ?? null, $vg['freigegeben_am'] ?? null])));
    $jahr = (int)date('Y', $kontakt);
    $frist = new \DateTimeImmutable(($jahr + 3) . '-12-31 23:59:59');
    if (!empty($vg['aufbewahren_bis'])) $frist = max($frist, new \DateTimeImmutable($vg['aufbewahren_bis'] . ' 23:59:59'));
    if ($heute > $frist) $faellig[] = ['vg' => $vg, 'frist' => $frist];
}
$sag(sprintf('%s: %d Vorgang/Vorgänge fällig (Stichtag %s)', $ausfuehren ? 'Löschlauf' : 'Probelauf', count($faellig), $heute->format('d.m.Y')));
foreach ($faellig as $f) $sag("  {$f['vg']['vorgang']}  Frist abgelaufen am {$f['frist']->format('d.m.Y')}");

// Nicht zugeordnete Einträge (Widerruf ohne Vorgang, Spamverdacht) nach derselben Frist ab ihrem Datum
$grenzeOhne = (new \DateTimeImmutable(((int)$heute->format('Y') - 4) . '-12-31 23:59:59'));

if ($ausfuehren) {
    $ids = array_fill_keys(array_map(fn($f) => $f['vg']['vorgang'], $faellig), true);
    $widerrufe = [];
    foreach (kette_lesen(daten('nachweise')) as $z) {
        $e = $z['eintrag'];
        if (($e->typ ?? '') === 'widerruf' && isset($e->inhalt->id) && (isset($ids[$e->vorgang ?? '']) || array_intersect((array)($e->inhalt->gesperrt ?? []), array_keys($ids)))) $widerrufe[$e->inhalt->id] = true;
    }
    $auswahl = function (object $e) use ($ids, $widerrufe, $grenzeOhne): bool {
        if (isset($e->vorgang) && isset($ids[$e->vorgang])) return true;
        if (is_object($e->inhalt) && array_intersect((array)($e->inhalt->gesperrt ?? []), array_keys($ids))) return true;
        if (is_object($e->inhalt) && isset($e->inhalt->widerruf) && isset($widerrufe[$e->inhalt->widerruf])) return true;
        if (($e->vorgang ?? null) === null && new \DateTimeImmutable((string)$e->zeit) < $grenzeOhne && in_array($e->typ, ['widerruf', 'widerruf_verdacht', 'eingangsbestaetigung'], true)) return true;
        return false;
    };
    // Mail-Kopien der betroffenen Einträge ermitteln, bevor die Inhalte geschwärzt werden
    $kopien = [];
    foreach (kette_lesen(daten('nachweise')) as $z) {
        $e = $z['eintrag'];
        if ($e && is_object($e->inhalt ?? null) && $auswahl($e) && isset($e->inhalt->kopie) && preg_match('#^nachweise/mails/[A-Za-z0-9-]+\.eml$#D', (string)$e->inhalt->kopie)) $kopien[] = $e->inhalt->kopie;
    }
    $n = kette_schwaerzen(daten('nachweise'), $auswahl, date(DATE_ATOM));
    $m = 0; foreach (array_unique($kopien) as $k) if (is_file(daten($k)) && @unlink(daten($k))) $m++;
    $v = 0;
    mit_sperre('vorgaenge', function () use ($ids, &$v) { foreach (array_keys($ids) as $id) if (@unlink(vorgang_datei($id))) $v++; });
    if ($n || $v) nachweis('loeschung', null, ['vorgaenge' => array_keys($ids), 'eintraege_geschwaerzt' => $n, 'mails_geloescht' => $m, 'grund' => 'Frist abgelaufen']);
    $sag("Geschwärzt: $n Einträge, gelöscht: $v Vorgangsdateien, $m Mail-Kopien. Kette bleibt prüfbar (nachweis-pruefen.php).");
}

if (in_array('--bericht', $args, true) && ($faellig || $ausfuehren)) {
    try { mail_senden(cfg()['mail']['an_linus'], '[Exposé] Löschlauf ' . $heute->format('d.m.Y'), implode("\n", $bericht) . "\n", null, 'bericht'); }
    catch (\Throwable $e) { fwrite(STDERR, "Bericht-Mail fehlgeschlagen\n"); }
}
exit(0);
