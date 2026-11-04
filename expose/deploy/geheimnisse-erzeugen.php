<?php
// Erzeugt expose-backend/geheimnisse.php (chmod 600): HMAC-Schlüssel, Admin-Passwort-Hash, SMTP-Passwort.
// Auf dem Server ausführen (SSH), nie ins Repo kopieren.
//
//   php geheimnisse-erzeugen.php /pfad/zu/expose-backend [Optionen]
//     --admin-passwort           Admin-Passwort verdeckt abfragen (mind. 12 Zeichen)
//     --admin-passwort-zufaellig  zufälliges Admin-Passwort erzeugen und EINMAL anzeigen
//     --smtp-passwort            SMTP-Passwort des Absender-Postfachs verdeckt abfragen
//     --neuer-schluessel         neuen HMAC-Schlüssel erzeugen; der alte wandert nach 'geheim_alt',
//                                damit bereits verschickte Exposé-Links gültig bleiben
// Ohne Optionen bei vorhandener Datei: nichts überschreiben.
declare(strict_types=1);

if (PHP_SAPI !== 'cli') { http_response_code(404); exit; }
$ziel = $argv[1] ?? '';
if ($ziel === '' || !is_dir($ziel)) { fwrite(STDERR, "Aufruf: php geheimnisse-erzeugen.php /pfad/zu/expose-backend [--admin-passwort|--admin-passwort-zufaellig] [--smtp-passwort] [--neuer-schluessel]\n"); exit(2); }
$opt = array_slice($argv, 2);
$datei = rtrim($ziel, '/') . '/geheimnisse.php';
umask(0077);

$g = is_file($datei) ? (require $datei) : [];
if (!is_array($g)) $g = [];
$neu = !is_file($datei);

function verdeckt(string $frage): string
{
    fwrite(STDOUT, $frage);
    $tty = function_exists('posix_isatty') ? posix_isatty(STDIN) : true;
    if ($tty) @shell_exec('stty -echo');
    $w = rtrim((string)fgets(STDIN), "\r\n");
    if ($tty) { @shell_exec('stty echo'); fwrite(STDOUT, "\n"); }
    return $w;
}

if (empty($g['geheim']) || in_array('--neuer-schluessel', $opt, true)) {
    if (!empty($g['geheim'])) { $g['geheim_alt'] = array_values(array_unique(array_merge([(string)$g['geheim']], (array)($g['geheim_alt'] ?? [])))); echo "Alter Schlüssel nach geheim_alt verschoben (alte Links bleiben gültig).\n"; }
    $g['geheim'] = bin2hex(random_bytes(32));
    echo "Neuer HMAC-Schlüssel erzeugt (64 Hex-Zeichen).\n";
}
if (in_array('--admin-passwort-zufaellig', $opt, true)) {
    $pw = rtrim(strtr(base64_encode(random_bytes(18)), '+/', 'Kx'), '=');
    $g['admin']['passwort_hash'] = password_hash($pw, PASSWORD_DEFAULT);
    echo "Admin-Passwort (nur jetzt sichtbar, in den Passwortmanager übernehmen): $pw\n";
} elseif (in_array('--admin-passwort', $opt, true)) {
    $pw = verdeckt('Admin-Passwort (mind. 12 Zeichen): ');
    if (mb_strlen($pw) < 12) { fwrite(STDERR, "Zu kurz.\n"); exit(1); }
    if (verdeckt('Wiederholen: ') !== $pw) { fwrite(STDERR, "Stimmt nicht überein.\n"); exit(1); }
    $g['admin']['passwort_hash'] = password_hash($pw, PASSWORD_DEFAULT);
    echo "Admin-Passwort gesetzt.\n";
}
if (in_array('--smtp-passwort', $opt, true)) {
    $g['mail']['smtp']['pass'] = verdeckt('SMTP-Passwort des Absender-Postfachs: ');
    echo "SMTP-Passwort gespeichert.\n";
}
if (!$neu && count($opt) === 0) { echo "$datei existiert schon; nichts geändert.\n"; exit(0); }

$inhalt = "<?php\n// Erzeugt von geheimnisse-erzeugen.php am " . date('c') . ". Nicht ins Repo, nicht weitergeben. chmod 600.\nreturn " . var_export($g, true) . ";\n";
$tmp = $datei . '.tmp';
file_put_contents($tmp, $inhalt);
chmod($tmp, 0600);
rename($tmp, $datei);
echo "Geschrieben: $datei (Rechte 600)\n";
