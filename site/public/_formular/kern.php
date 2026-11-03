<?php
// Formular-Kern für kontakt.php und bewertung.php (bauplan/02-formular-backend.md).
// PHP >= 8.2, keine Abhängigkeiten. Konfiguration: Datei AUSSERHALB des Webroots,
// Standard ../formular-config.php (neben dem Webroot-Ordner), Vorlage: formular-config.example.php.
// Abweichung von 02: eigener SMTP-Client statt PHPMailer (keine Composer-Abhängigkeit); der Kern liegt
// unter /_formular/ im Webroot, ist aber per nginx gesperrt und bricht bei direktem Aufruf ab.
declare(strict_types=1);
namespace Formular;

if (!defined('FORMULAR_EINSTIEG')) { http_response_code(404); exit; }

const ZEITZONE = 'Europe/Berlin';

function konfig(): array {
  static $cfg = null;
  if ($cfg !== null) return $cfg;
  $datei = getenv('FORMULAR_CONFIG') ?: dirname(__DIR__, 2) . '/formular-config.php';
  if (!is_file($datei)) { error_log("Formular: Konfiguration fehlt: $datei"); antworte500(wantsJson()); }
  $cfg = require $datei;
  $cfg['daten'] ??= dirname(__DIR__, 2) . '/formular-daten';
  $cfg['webroot'] ??= dirname(__DIR__);
  $cfg['transport'] ??= 'smtp';
  $cfg['csv_aktiv'] ??= false;
  $cfg['herkunft'] ??= ['https://roessler-immo.de'];
  return $cfg;
}

function wantsJson(): bool { return str_contains($_SERVER['HTTP_ACCEPT'] ?? '', 'application/json'); }

function def(): array {
  static $d = null;
  return $d ??= json_decode((string)file_get_contents(__DIR__ . '/formulare.json'), true, 32, JSON_THROW_ON_ERROR);
}
function fakten(): array {
  static $f = null;
  return $f ??= json_decode((string)file_get_contents(__DIR__ . '/fakten.json'), true, 32, JSON_THROW_ON_ERROR);
}

// ---------------------------------------------------------------------------
// Antworten
function kopf(): void {
  header('Cache-Control: no-store');
  header('X-Content-Type-Options: nosniff');
}
function json(int $code, array $daten): never {
  kopf();
  http_response_code($code);
  header('Content-Type: application/json; charset=utf-8');
  echo json_encode($daten, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
  exit;
}
function weiterleiten(string $ziel): never {
  kopf();
  header('Location: ' . $ziel, true, 303);
  exit;
}
function eigeneSeite(?string $s): ?string {
  if (!is_string($s) || !preg_match('#^/[a-z0-9/-]*$#', $s) || str_contains($s, '//')) return null;
  return is_file(konfig()['webroot'] . $s . 'index.html') ? $s : null;
}
function fehlerSeite(int $code, string $listeHtml, string $seite): never {
  kopf();
  http_response_code($code);
  header('Content-Type: text/html; charset=utf-8');
  $vorlage = @file_get_contents(konfig()['webroot'] . '/formular-fehler/index.html');
  $zurueck = '<p><a class="btn btn-primaer" href="' . htmlspecialchars($seite) . '#' . (str_starts_with($seite, '/direktankauf/') ? 'ankauf-formular' : 'formular') . '">Zurück zum Formular</a></p>';
  if (!$vorlage) { echo "<!doctype html><html lang=\"de\"><meta charset=\"utf-8\"><title>Fehler</title>$listeHtml$zurueck"; exit; }
  echo str_replace(['<div class="fehler-zusammenfassung" data-platzhalter="fehlerliste"></div>', '<div data-platzhalter="zurueck"></div>'],
    ['<div class="fehler-zusammenfassung">' . $listeHtml . '</div>', $zurueck], $vorlage);
  exit;
}
function antworte500(bool $json): never {
  $text = def()['texte']['fehler_versand'] ?? 'Die Anfrage konnte nicht gesendet werden.';
  if ($json) json(500, ['ok' => false, 'meldung' => $text]);
  fehlerSeite(500, '<p>' . htmlspecialchars($text) . '</p>', '/kontakt/');
}

// ---------------------------------------------------------------------------
// Ablauf (02-formular-backend.md 10)
function verarbeite(array $erlaubt): never {
  $t0 = microtime(true);
  $json = wantsJson();
  $methode = $_SERVER['REQUEST_METHOD'] ?? 'GET';
  if ($methode === 'GET' || $methode === 'HEAD') weiterleiten(eigeneSeite($_GET['seite'] ?? null) ?? '/kontakt/');
  if ($methode !== 'POST') { header('Allow: POST'); $json ? json(405, ['ok' => false]) : fehlerSeite(405, '<p>Methode nicht erlaubt.</p>', '/kontakt/'); }
  $cfg = konfig();
  $ct = strtolower($_SERVER['CONTENT_TYPE'] ?? '');
  if (!str_starts_with($ct, 'application/x-www-form-urlencoded') && !str_starts_with($ct, 'multipart/form-data')) json(415, ['ok' => false]);
  if ((int)($_SERVER['CONTENT_LENGTH'] ?? 0) > 65536) json(413, ['ok' => false]);
  $origin = $_SERVER['HTTP_ORIGIN'] ?? null;
  if ($origin !== null && $origin !== 'null' && !in_array($origin, $cfg['herkunft'], true)) json(403, ['ok' => false]);

  $art = (string)($_POST['formular'] ?? '');
  if (!in_array($art, $erlaubt, true)) $json ? json(400, ['ok' => false]) : fehlerSeite(400, '<p>Unbekanntes Formular.</p>', '/kontakt/');
  $def = def()[$art];
  $seite = eigeneSeite($_POST['seite'] ?? null) ?? ($art === 'bewertung' ? '/wohnung-bewerten/' : ($art === 'ankauf' ? '/direktankauf/' : '/kontakt/'));

  $ipHash = hash_hmac('sha256', ($_SERVER['REMOTE_ADDR'] ?? '') . date('Y-m-d'), (string)$cfg['hmac_geheim']);
  if (!erlaube("ip-$ipHash", [[3, 600], [10, 86400]])) {
    logZeile($art, 'limit:ip', $t0);
    header('Retry-After: 600');
    $m = def()['texte']['limit'];
    $json ? json(429, ['ok' => false, 'meldung' => $m]) : fehlerSeite(429, '<p>' . htmlspecialchars($m) . '</p>', $seite);
  }
  if (!erlaube('global', [[100, 86400]])) logZeile($art, 'limit:global', $t0);

  if ($grund = spam($_POST, $art, $def)) {
    logZeile($art, "spam:$grund", $t0);
    $json ? json(200, ['ok' => true, 'weiter' => $def['danke']]) : weiterleiten($def['danke']);
  }

  [$werte, $fehler] = pruefe($def, $_POST);
  if ($fehler) {
    logZeile($art, 'fehler:validierung', $t0);
    if ($json) json(422, ['ok' => false, 'meldung' => def()['texte']['fehler_pruefen'], 'fehler' => $fehler]);
    $li = '';
    foreach ($fehler as $n => $m) $li .= '<li><strong>' . htmlspecialchars($def['felder'][$n]['label'] ?? $n) . ':</strong> ' . htmlspecialchars($m) . '</li>';
    fehlerSeite(422, '<h2>' . htmlspecialchars(def()['texte']['fehler_pruefen']) . '</h2><ul>' . $li . '</ul>', $seite);
  }

  $meta = ['js' => ($_POST['js'] ?? '0') === '1', 'seite' => $seite, 'eingang' => (new \DateTimeImmutable('now', new \DateTimeZone(ZEITZONE)))->format('d.m.Y H:i')];
  // Bestätigung erlaubt? (E-Mail-Limit 2/24 h, global 50/24 h)
  $bestStatus = 'nicht gesendet (keine E-Mail)';
  $bestOk = false;
  if (!empty($werte['email'])) {
    if (erlaube('mail-' . hash_hmac('sha256', strtolower($werte['email']), (string)$cfg['hmac_geheim']), [[2, 86400]]) && erlaube('bestaetigungen', [[50, 86400]])) $bestOk = true;
    else $bestStatus = 'nicht gesendet (Limit)';
  }
  try {
    if ($bestOk) $bestStatus = 'wird gesendet';
    sende(benachrichtigung($art, $def, $werte, $meta, $bestStatus));
  } catch (\Throwable $e) {
    error_log('Formular Mail: ' . $e->getMessage());
    notfall($art, $werte);
    logZeile($art, 'mail:fehler', $t0);
    antworte500($json);
  }
  if ($bestOk) {
    try { sende(bestaetigung($art, $def, $werte)); }
    catch (\Throwable $e) { error_log('Formular Bestätigung: ' . $e->getMessage()); logZeile($art, 'mail:bestaetigung-fehler', $t0); }
  }
  if ($cfg['csv_aktiv']) csv($art, $def, $werte, $bestOk);
  logZeile($art, 'ok', $t0);
  $json ? json(200, ['ok' => true, 'weiter' => $def['danke']]) : weiterleiten($def['danke']);
}

// ---------------------------------------------------------------------------
// Spam (02 Abschnitt 4)
function spam(array $p, string $art, array $def): ?string {
  if (trim((string)($p['website'] ?? '')) !== '') return 'honeypot';
  $js = ($p['js'] ?? '0') === '1';
  if (isset($p['t']) && $p['t'] !== '' && (int)$p['t'] < (int)($def['zeit_min_ms'] ?? 3000)) return 'zeit';
  $alles = implode("\n", array_map(fn($v) => is_array($v) ? implode(' ', $v) : (string)$v, $p));
  if (preg_match('/\[url=|<a\s+href|\[link/i', $alles)) return 'inhalt';
  $name = (string)($p['name'] ?? '');
  if (preg_match('#://|@|\d#', $name)) return 'inhalt';
  $n = (string)($p['nachricht'] ?? '');
  $urls = preg_match_all('#https?://|www\.#i', $n);
  if ($urls > ($js ? 2 : 0)) return 'inhalt';
  if (mb_strlen($n) > 40) {
    $buchst = preg_match_all('/\p{L}/u', $n);
    $fremd = preg_match_all('/[\p{Cyrillic}\p{Han}\p{Arabic}]/u', $n);
    if ($buchst > 0 && $fremd / $buchst > 0.3) return 'inhalt';
  }
  return null;
}

// ---------------------------------------------------------------------------
// Validierung (02 Abschnitt 3)
function normalisiere(string $v, bool $mehrzeilig): string {
  if (class_exists('Normalizer')) $v = \Normalizer::normalize($v, \Normalizer::FORM_C) ?: $v;
  $v = $mehrzeilig ? preg_replace('/[^\P{C}\n]/u', '', str_replace("\r\n", "\n", $v)) : preg_replace('/\p{C}/u', '', $v);
  $v = $mehrzeilig ? preg_replace('/[ \t]+/', ' ', (string)$v) : preg_replace('/\s+/u', ' ', (string)$v);
  return trim((string)$v);
}

function pruefe(array $def, array $p): array {
  $werte = [];
  $fehler = [];
  $jahr = (int)date('Y');
  $alle = $def['felder'];
  // Rohwerte normalisieren
  foreach ($alle as $n => $d) {
    if ($d['typ'] === 'mehrfach') {
      $liste = $p[$n] ?? [];
      $liste = is_array($liste) ? array_values(array_unique(array_map('strval', $liste))) : [];
      $werte[$n] = $liste;
      continue;
    }
    $roh = $p[$n] ?? '';
    if (is_array($roh)) $roh = '';
    $werte[$n] = normalisiere((string)$roh, $d['typ'] === 'textfeld');
  }
  // sichtbar_wenn: Felder verwerfen, deren Bedingung nicht erfüllt ist
  foreach ($alle as $n => $d) {
    if (!empty($d['sichtbar_wenn'])) foreach ($d['sichtbar_wenn'] as $k => $w) if (($werte[$k] ?? '') !== $w) $werte[$n] = '';
  }
  foreach ($alle as $n => $d) {
    $v = $werte[$n];
    $label = $d['label'];
    $pflicht = !empty($d['pflicht']);
    if (!empty($d['pflicht_wenn'])) foreach ($d['pflicht_wenn'] as $k => $w) if (($werte[$k] ?? '') === $w) $pflicht = true;
    if ($d['typ'] === 'mehrfach') {
      $erlaubt = array_keys($d['optionen']);
      $v = array_values(array_intersect($v, $erlaubt));
      if (in_array('keine', $v, true) && count($v) > 1) $fehler[$n] = 'Bitte wählen Sie „keine“ nur allein.';
      $werte[$n] = $v;
      continue;
    }
    if ($v === '') {
      if ($pflicht) $fehler[$n] = $n === 'ort' ? 'Bitte wählen Sie den Ort der Wohnung.' : "Bitte geben Sie $label an.";
      continue;
    }
    switch ($d['typ']) {
      case 'auswahl':
        if (!array_key_exists($v, $d['optionen'])) $fehler[$n] = $n === 'ort' ? 'Bitte wählen Sie den Ort der Wohnung.' : "Bitte wählen Sie $label aus der Liste.";
        break;
      case 'checkbox':
        $werte[$n] = $v === ($d['wert'] ?? 'ja') ? $v : '';
        break;
      case 'zahl':
        $z = str_replace(',', '.', preg_replace('/\.(?=\d{3}(\D|$))/', '', $v));
        $max = $d['max'] === 'jahr+3' ? $jahr + 3 : $d['max'];
        $ok = !empty($d['dezimal']) ? preg_match('/^\d+(\.\d)?$/', $z) : preg_match('/^\d+$/', $z);
        if (!$ok || (float)$z < $d['min'] || (float)$z > $max) $fehler[$n] = trim("Bitte geben Sie einen Wert zwischen {$d['min']} und $max " . ($d['einheit'] ?? '')) . ' an.';
        else $werte[$n] = $z;
        break;
      case 'name':
        if (mb_strlen($v) < 2 || mb_strlen($v) > 80 || !preg_match("/^[\p{L} .'\-]+$/u", $v)) $fehler[$n] = 'Bitte prüfen Sie den Namen (nur Buchstaben, Leerzeichen, Bindestrich, Apostroph, Punkt).';
        break;
      case 'email':
        if (mb_strlen($v) > 254 || preg_match('/[\r\n]/', $v) || !filter_var($v, FILTER_VALIDATE_EMAIL)) $fehler[$n] = 'Bitte prüfen Sie die E-Mail-Adresse, zum Beispiel name@beispiel.de.';
        break;
      case 'tel':
        if (!preg_match('#^[0-9+()/\- ]{6,30}$#', $v) || preg_match_all('/\d/', $v) < 6) $fehler[$n] = 'Bitte prüfen Sie die Telefonnummer. Erlaubt sind Ziffern, Leerzeichen und + ( ) / -.';
        break;
      default:
        $max = $d['max'] ?? 3000;
        if (mb_strlen($v) > $max) $fehler[$n] = "Bitte kürzen Sie auf höchstens $max Zeichen.";
        elseif ($n === 'ort_sonst' && mb_strlen($v) < 2) $fehler[$n] = "Bitte geben Sie $label an.";
    }
  }
  if (isset($alle['email'], $alle['telefon']) && ($werte['email'] ?? '') === '' && ($werte['telefon'] ?? '') === '' && !isset($fehler['email']) && !isset($fehler['telefon'])) {
    $fehler['email'] = $fehler['telefon'] = 'Bitte geben Sie eine E-Mail-Adresse oder eine Telefonnummer an.';
  }
  return [$werte, $fehler];
}

// ---------------------------------------------------------------------------
// Rate-Limit (dateibasiert mit flock, nur Hashes)
function erlaube(string $schluessel, array $grenzen): bool {
  // Testmodus (nur tests/config.test.php): Limits je Testlauf-Kennung, damit Tests unabhängig sind
  if (!empty(konfig()['test_modus'])) $schluessel .= '|' . ($_SERVER['HTTP_X_TESTLAUF'] ?? bin2hex(random_bytes(8)));
  $dir = konfig()['daten'] . '/ratelimit';
  if (!is_dir($dir)) @mkdir($dir, 0700, true);
  $datei = $dir . '/' . hash('sha256', $schluessel);
  $fh = @fopen($datei, 'c+');
  if (!$fh) return true;
  flock($fh, LOCK_EX);
  $jetzt = time();
  $max = max(array_column($grenzen, 1));
  $zeiten = array_filter(array_map('intval', explode("\n", (string)stream_get_contents($fh))), fn($t) => $t > $jetzt - $max);
  $ok = true;
  foreach ($grenzen as [$anzahl, $fenster]) if (count(array_filter($zeiten, fn($t) => $t > $jetzt - $fenster)) >= $anzahl) $ok = false;
  if ($ok) $zeiten[] = $jetzt;
  ftruncate($fh, 0); rewind($fh); fwrite($fh, implode("\n", $zeiten));
  flock($fh, LOCK_UN); fclose($fh);
  if (random_int(1, 50) === 1) foreach (glob($dir . '/*') ?: [] as $f) if (filemtime($f) < $jetzt - 86400) @unlink($f);
  return $ok;
}

// ---------------------------------------------------------------------------
// Mails
function klartext(array $d, $v): string {
  if (is_array($v)) return implode(', ', array_map(fn($x) => $d['optionen'][$x] ?? $x, $v));
  if (isset($d['optionen'])) return $d['optionen'][$v] ?? $v;
  if ($d['typ'] === 'checkbox') return $v ? 'ja' : 'nein';
  if ($d['typ'] === 'zahl') return str_replace('.', ',', $v) . (isset($d['einheit']) ? ' ' . $d['einheit'] : '');
  return (string)$v;
}

function benachrichtigung(string $art, array $def, array $w, array $meta, string $best): array {
  $cfg = konfig();
  $f = $def['felder'];
  $kurz = ['bewertung' => 'Bewertung', 'kontakt' => 'Kontakt', 'ankauf' => 'Ankauf'][$art];
  $teile = [];
  foreach ($def['betreff_felder'] as $n) {
    if (empty($w[$n])) continue;
    $t = klartext($f[$n], $w[$n]);
    if ($n === 'ort' && $art === 'kontakt') $t = "Ort: $t";
    if ($n === 'ort' && $w[$n] === 'anderer' && !empty($w['ort_sonst'])) $t = $w['ort_sonst'];
    if ($n === 'stadtteil' && $teile) { $teile[count($teile) - 1] .= '-' . $t; continue; }
    if ($n === 'baujahr') $t = "Bj. $t";
    if ($n === 'rueckruf') $t = "Rückruf $t";
    $teile[] = $t;
  }
  $betreff = mb_substr("[$kurz] " . implode(' · ', $teile), 0, 120);
  $zeilen = [];
  foreach ($def['schritte'] as $s) foreach ($s['felder'] as $n) {
    if (!isset($w[$n]) || $w[$n] === '' || $w[$n] === []) continue;
    $zeilen[] = $f[$n]['label'] . ': ' . klartext($f[$n], $w[$n]);
  }
  $text = implode("\n", $zeilen) . "\n\n--\nFormular: $art v{$def['version']} · Seite: {$meta['seite']} · Eingang: {$meta['eingang']} (Europe/Berlin)\n"
    . 'JavaScript: ' . ($meta['js'] ? 'ja' : 'nein') . " · Bestätigung an Absender: $best\n"
    . 'Antwortzusage: ' . (fakten()['antwortzeit'] ?? '') . "\n";
  $mail = ['an' => $cfg['empfaenger'], 'von' => $cfg['absender'], 'betreff' => $betreff, 'text' => $text, 'art' => 'benachrichtigung'];
  if (!empty($w['email'])) $mail['antwort'] = ['adresse' => $w['email'], 'name' => $w['name']];
  return $mail;
}

function bestaetigung(string $art, array $def, array $w): array {
  $cfg = konfig();
  $fk = fakten();
  $tel = $fk['telefon'];
  $f = $def['felder'];
  $vorlage = (string)file_get_contents(__DIR__ . "/vorlagen/bestaetigung-$art.txt");
  $fuss = (string)file_get_contents(__DIR__ . '/vorlagen/fusszeile.txt');
  $ort = !empty($w['ort']) ? ($w['ort'] === 'anderer' ? 'einem anderen Ort' : klartext($f['ort'], $w['ort'])) : 'der Region';
  $ersetze = [
    '{name}' => $w['name'],
    '{rueckruf_satz}' => !empty($w['rueckruf']) && isset($f['rueckruf']) ? ' im Zeitfenster „' . klartext($f['rueckruf'], $w['rueckruf']) . '“' : '',
    '{ort_klartext}' => $ort,
    '{wohnflaeche_satz}' => !empty($w['wohnflaeche']) ? ', rund ' . str_replace('.', ',', $w['wohnflaeche']) . ' m²' : '',
    '{telefon}' => $tel, '{antwortzeit}' => $fk['antwortzeit'], '{inhaber}' => $fk['inhaber'], '{firma}' => $fk['name'],
    '{email}' => $fk['email'], '{fusszeile}' => $fuss,
  ];
  $ersetze['{fusszeile}'] = strtr($fuss, $ersetze);
  return ['an' => $w['email'], 'von' => $cfg['bestaetigung_absender'] ?? $cfg['absender'], 'antwort' => $cfg['bestaetigung_absender'] ?? null,
    'betreff' => 'Ihre Anfrage bei Rössler Immobilien', 'text' => strtr($vorlage, $ersetze), 'art' => 'bestaetigung'];
}

function kopfAdresse(array $a): string {
  $name = preg_replace('/[\r\n"]/', '', (string)($a['name'] ?? ''));
  return $name !== '' ? '=?UTF-8?B?' . base64_encode($name) . '?= <' . $a['adresse'] . '>' : '<' . $a['adresse'] . '>';
}

function nachricht(array $m): string {
  $cfg = konfig();
  $domain = substr(strrchr($cfg['absender']['adresse'], '@'), 1);
  $h = [
    'Date: ' . date(DATE_RFC2822),
    'From: ' . kopfAdresse($m['von']),
    'To: <' . $m['an'] . '>',
    'Subject: =?UTF-8?B?' . base64_encode($m['betreff']) . '?=',
    'Message-ID: <' . bin2hex(random_bytes(12)) . '@' . $domain . '>',
    'MIME-Version: 1.0',
    'Content-Type: text/plain; charset=UTF-8',
    'Content-Transfer-Encoding: quoted-printable',
    'Auto-Submitted: auto-generated',
  ];
  if (!empty($m['antwort'])) $h[] = 'Reply-To: ' . kopfAdresse($m['antwort']);
  return implode("\r\n", $h) . "\r\n\r\n" . quoted_printable_encode(str_replace("\n", "\r\n", $m['text']));
}

function sende(array $m): void {
  foreach ([$m['an'], $m['von']['adresse']] as $a) if (preg_match('/[\r\n<>]/', $a) || !filter_var($a, FILTER_VALIDATE_EMAIL)) throw new \RuntimeException('ungültige Adresse');
  $cfg = konfig();
  $roh = nachricht($m);
  if ($cfg['transport'] === 'datei') {
    $dir = $cfg['daten'] . '/test-mails';
    if (!is_dir($dir)) mkdir($dir, 0700, true);
    file_put_contents(sprintf('%s/%s-%s-%s.eml', $dir, sprintf('%.6f', microtime(true)), $m['art'], bin2hex(random_bytes(3))), $roh);
    return;
  }
  smtp($cfg['smtp'], $cfg['absender']['adresse'], $m['an'], $roh);
}

/** Minimaler SMTP-Client: STARTTLS (587) oder TLS (465), AUTH LOGIN. */
function smtp(array $s, string $von, string $an, string $daten): void {
  $tls = ($s['secure'] ?? 'tls') === 'ssl';
  $ctx = stream_context_create(['ssl' => ['verify_peer' => true, 'verify_peer_name' => true, 'peer_name' => $s['host']]]);
  $fp = @stream_socket_client(($tls ? 'ssl://' : 'tcp://') . $s['host'] . ':' . ($s['port'] ?? 587), $en, $es, 15, STREAM_CLIENT_CONNECT, $ctx);
  if (!$fp) throw new \RuntimeException("SMTP-Verbindung: $es");
  stream_set_timeout($fp, 20);
  $lies = function (int $erwartet) use ($fp): string {
    $antwort = '';
    while (($z = fgets($fp, 1024)) !== false) { $antwort .= $z; if (isset($z[3]) && $z[3] === ' ') break; }
    if ((int)substr($antwort, 0, 3) !== $erwartet) throw new \RuntimeException('SMTP: ' . trim($antwort));
    return $antwort;
  };
  $cmd = function (string $c, int $erwartet) use ($fp, $lies): string { fwrite($fp, $c . "\r\n"); return $lies($erwartet); };
  $lies(220);
  $host = gethostname() ?: 'localhost';
  $cmd("EHLO $host", 250);
  if (!$tls) {
    $cmd('STARTTLS', 220);
    if (!stream_socket_enable_crypto($fp, true, STREAM_CRYPTO_METHOD_TLSv1_2_CLIENT | STREAM_CRYPTO_METHOD_TLSv1_3_CLIENT)) throw new \RuntimeException('STARTTLS fehlgeschlagen');
    $cmd("EHLO $host", 250);
  }
  $cmd('AUTH LOGIN', 334);
  $cmd(base64_encode($s['user']), 334);
  $cmd(base64_encode($s['pass']), 235);
  $cmd("MAIL FROM:<$von>", 250);
  $cmd("RCPT TO:<$an>", 250);
  $cmd('DATA', 354);
  $daten = preg_replace('/^\./m', '..', $daten);
  $cmd($daten . "\r\n.", 250);
  $cmd('QUIT', 221);
  fclose($fp);
}

// ---------------------------------------------------------------------------
// Speicherung, Log
function csvZeile(array $werte): string {
  return implode(';', array_map(function ($v) {
    $v = is_array($v) ? implode(',', $v) : (string)$v;
    if ($v !== '' && strpbrk($v[0], "=+-@\t\r") !== false) $v = "'" . $v;
    return '"' . str_replace('"', '""', $v) . '"';
  }, $werte)) . "\n";
}
function schreibe(string $datei, string $zeile, ?string $kopf = null): void {
  if (!is_dir(dirname($datei))) @mkdir(dirname($datei), 0700, true);
  $neu = !is_file($datei);
  $fh = @fopen($datei, 'a');
  if (!$fh) return;
  flock($fh, LOCK_EX);
  if ($neu && $kopf !== null) fwrite($fh, "\xEF\xBB\xBF" . $kopf);
  fwrite($fh, $zeile);
  flock($fh, LOCK_UN); fclose($fh);
  @chmod($datei, 0600);
}
function csv(string $art, array $def, array $w, bool $best): void {
  $felder = array_keys($def['felder']);
  $kopf = csvZeile(array_merge(['eingang', 'formular', 'version'], $felder, ['bestaetigung']));
  $zeile = csvZeile(array_merge([date('c'), $art, $def['version']], array_map(fn($n) => $w[$n] ?? '', $felder), [$best ? 'ja' : 'nein']));
  schreibe(konfig()['daten'] . '/anfragen/' . date('Y-m') . '.csv', $zeile, $kopf);
}
function notfall(string $art, array $w): void {
  schreibe(konfig()['daten'] . '/anfragen/notfall.csv', csvZeile(array_merge([date('c'), $art], array_map(fn($v) => is_array($v) ? implode(',', $v) : $v, array_values($w)))));
}
function logZeile(string $art, string $ergebnis, float $t0): void {
  schreibe(konfig()['daten'] . '/log/formular.log', sprintf("%s %s %s %dms\n", date('c'), $art, $ergebnis, (int)((microtime(true) - $t0) * 1000)));
}
