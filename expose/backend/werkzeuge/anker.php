<?php
// Tagesanker: prüft jede Nacht die Nachweiskette und schickt den aktuellen Kettenkopf (Nummer und Prüfwert)
// per Mail an Linus und optional an weitere Adressen ('anker_an' in config.php, z. B. ein Postfach bei
// einem anderen Anbieter). Damit liegt außerhalb des Servers ein datierter Beleg für den Stand der Kette;
// spätere Änderungen an älteren Einträgen fallen bei nachweis-pruefen.php --anker <prüfwert> auf.
// Ist die Kette beschädigt, kommt eine ALARM-Mail.
//
//   php anker.php            (Cron, z. B. 5 0 * * *)
declare(strict_types=1);

namespace Expose;

if (PHP_SAPI !== 'cli') { http_response_code(404); exit; }
require __DIR__ . '/../lib/kern.php';

cfg();
$r = kette_pruefen(kette_lesen(daten('nachweise')));
$kopf = $r['kopf'] ?? ['seq' => 0, 'hash' => KETTE_START, 'zeit' => '–'];
$betreff = ($r['ok'] ? '[Exposé] Tagesanker ' : '[Exposé] ALARM Nachweiskette ') . date('d.m.Y') . ': Nr. ' . $kopf['seq'];
$text = ($r['ok'] ? "Die Nachweiskette ist vollständig und unverändert.\n\n" : "Die Nachweiskette ist NICHT in Ordnung. Bitte sofort prüfen (nachweis-pruefen.php) und die letzte Sicherung zurücklegen.\n\n" . implode("\n", $r['fehler']) . "\n\n")
    . "Einträge:   {$r['anzahl']} (davon geschwärzt: {$r['geschwaerzt']})\n"
    . "Letzter:    Nr. {$kopf['seq']} vom {$kopf['zeit']}\n"
    . "Prüfwert:   {$kopf['hash']}\n\n"
    . "Diese Mail bitte nicht löschen. Sie belegt den Stand der Kette an diesem Tag.\n"
    . "Prüfen: php nachweis-pruefen.php --anker {$kopf['hash']}\n";
foreach (array_merge([cfg()['mail']['an_linus']], (array)cfg()['anker_an']) as $an) {
    try { mail_senden((string)$an, $betreff, $text, null, 'anker'); } catch (\Throwable $e) { fwrite(STDERR, "Anker-Mail an $an fehlgeschlagen\n"); }
}
@file_put_contents(daten('log/anker.log'), date('c') . " {$kopf['seq']} {$kopf['hash']} " . ($r['ok'] ? 'ok' : 'FEHLER') . "\n", FILE_APPEND | LOCK_EX);
echo $betreff, "\n";
exit($r['ok'] ? 0 : 1);
