<?php
// Exposé-Freigabe: Vertragsschluss mit Nachweisprotokoll (Hash-Kette), Freigabe-Links, Widerrufsfunktion (§ 356a BGB).
// Keine Datenbank, keine Fremdbibliothek. Öffentliche Seiten ohne Cookies; nur die Admin-Übersicht hat eine Sitzung.
// Rechtliche Grundlagen: recherche/expose/recherche.md. Sicherheitskonzept und Befunde: expose/SICHERHEIT.md.
// [ENTWURF: Ablauf und Texte vor Einsatz anwaltlich prüfen lassen.]
declare(strict_types=1);

namespace Expose;

const BACKEND = __DIR__ . '/..';
const MAX_POST = 65536;

require_once __DIR__ . '/kette.php';
require_once __DIR__ . '/mail.php';

// ======================================================================
// Fehlerbehandlung: nie Stack-Traces oder Pfade an Besucher
// ======================================================================

umask(0077);
ini_set('display_errors', '0');
ini_set('display_startup_errors', '0');
ini_set('html_errors', '0');
ini_set('log_errors', '1');
error_reporting(E_ALL);

set_error_handler(static function (int $nr, string $text, string $datei, int $zeile): bool {
    if (!(error_reporting() & $nr)) return false;                       // mit @ unterdrückt
    if ($nr & (E_DEPRECATED | E_USER_DEPRECATED)) { error_log("PHP Deprecated: $text in " . basename($datei) . ":$zeile"); return true; }
    throw new \ErrorException($text, 0, $nr, $datei, $zeile);
});
set_exception_handler(static function (\Throwable $e): void { unerwartet($e); });

final class KonfigFehler extends \RuntimeException {}

function unerwartet(\Throwable $e): never
{
    $id = strtoupper(bin2hex(random_bytes(4)));
    $zeile = sprintf('%s FEHLER %s %s: %s (%s:%d)', date('c'), $id, (new \ReflectionClass($e))->getShortName(), $e->getMessage(), basename($e->getFile()), $e->getLine());
    error_log($zeile);
    try { if (cfg_geladen()) @file_put_contents(daten('log/fehler-' . date('Y-m') . '.log'), $zeile . "\n", FILE_APPEND | LOCK_EX); } catch (\Throwable) {}
    if (PHP_SAPI === 'cli') { fwrite(STDERR, $zeile . "\n"); exit(2); }
    while (ob_get_level() > 0) ob_end_clean();
    if (!headers_sent()) {
        header_remove();
        http_response_code(500);
        header('Cache-Control: no-store');
        sicherheitsheader();
    }
    $tel = firma_telefon();
    if (will_json()) {
        if (!headers_sent()) header('Content-Type: application/json; charset=utf-8');
        echo json_encode(['ok' => false, 'meldung' => "Technischer Fehler (Nr. $id). Bitte rufen Sie mich an: $tel."], JSON_UNESCAPED_UNICODE);
        exit;
    }
    if (!headers_sent()) header('Content-Type: text/html; charset=utf-8');
    echo '<!doctype html><html lang="de"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>Technischer Fehler</title></head><body><h1>Technischer Fehler</h1><p>Das hat leider nicht geklappt. Bitte rufen Sie mich an: ' . h($tel) . '. Fehlernummer: ' . h($id) . '.</p></body></html>';
    exit;
}

// ======================================================================
// Konfiguration
// ======================================================================

function cfg_geladen(): bool { return cfg(true) !== []; }

function cfg(bool $nurWennGeladen = false): array
{
    static $c = null;
    if ($c !== null) return $c;
    if ($nurWennGeladen) return [];
    $p = getenv('EXPOSE_CONFIG') ?: BACKEND . '/config.php';
    if (!is_file($p)) throw new KonfigFehler('config.php fehlt');
    $k = require $p;
    if (!is_array($k)) throw new KonfigFehler('config.php liefert kein Array');
    $g = dirname($p) . '/geheimnisse.php';
    if (is_file($g)) { $gk = require $g; if (is_array($gk)) $k = array_replace_recursive($k, $gk); }
    $k = konfig_pruefen($k);
    date_default_timezone_set($k['zeitzone']);
    foreach (['', '/nachweise', '/nachweise/mails', '/vorgaenge', '/ratelimit', '/log', '/sitzungen'] as $d) {
        $dir = $k['daten'] . $d;
        if (!is_dir($dir) && !mkdir($dir, 0700, true) && !is_dir($dir)) throw new KonfigFehler('Datenordner nicht anlegbar');
    }
    if (!is_file($k['daten'] . '/.htaccess')) @file_put_contents($k['daten'] . '/.htaccess', "Require all denied\n");
    $c = $k;
    if ($k['modus'] === 'produktion') ini_set('error_log', $k['daten'] . '/log/php-fehler.log');
    return $c;
}

function konfig_pruefen(array $k): array
{
    $k += ['modus' => 'produktion', 'zeitzone' => 'Europe/Berlin', 'https_erzwingen' => true, 'hinter_proxy' => false,
        'hsts' => 'max-age=300; includeSubDomains', 'freigabe_modus' => null, 'max_abrufe' => 60, 'ip_modus' => 'gekuerzt+hmac',
        'geheim_alt' => [], 'limits' => [], 'min_frei_mb' => 200, 'admin' => [], 'anker_an' => []];
    $k['limits'] += [
        'ip' => [[5, 600], [20, 86400]],              // Anfragen je IP (IPv6: je /64)
        'ip_ohne_token' => [[2, 600], [6, 86400]],    // Anfragen ohne Formular-Token (ohne JavaScript oder Bot)
        'email' => [[5, 86400]],                      // je E-Mail-Adresse, alle Objekte
        'email_objekt' => [[3, 86400]],               // je E-Mail-Adresse und Objekt
        'global' => [[60, 3600], [300, 86400]],       // alle Anfragen zusammen (Schutz vor Speicher- und Mail-Flut)
        'widerruf_ip' => [[10, 600], [40, 86400]],
        'widerruf_email' => [[5, 86400]],
        'token_fehler' => [[30, 600]],                // falsche Exposé-/Freigabe-Links je IP
        'login' => [[5, 900], [20, 86400]],           // Admin-Anmeldung je IP
        'login_global' => [[30, 3600]],
    ];
    $k['admin'] += ['benutzer' => 'linus', 'passwort_hash' => '', 'ip_erlaubt' => [], 'sitzung_minuten' => 30, 'sitzung_max_stunden' => 8];
    if (!in_array($k['modus'], ['produktion', 'test'], true)) throw new KonfigFehler('modus muss produktion oder test sein');
    $geheim = (string)($k['geheim'] ?? '');
    if (strlen($geheim) < 32 || str_contains($geheim, 'HIER-')) throw new KonfigFehler('geheim fehlt oder ist zu kurz (geheimnisse-erzeugen.php ausführen)');
    if (!is_string($k['basis_url'] ?? null) || !preg_match('#^https?://[a-z0-9.-]+(:\d+)?$#iD', rtrim($k['basis_url'], '/'))) throw new KonfigFehler('basis_url ungültig');
    $k['basis_url'] = rtrim($k['basis_url'], '/');
    $k['origin'] = array_values((array)($k['origin'] ?? [$k['basis_url']]));
    if (!is_string($k['daten'] ?? null) || !str_starts_with($k['daten'], '/')) throw new KonfigFehler('daten muss ein absoluter Pfad sein');
    $k['daten'] = rtrim($k['daten'], '/');
    $m = $k['mail'] ?? null;
    if (!is_array($m)) throw new KonfigFehler('mail fehlt');
    foreach (['absender', 'antwort_an', 'an_linus'] as $f) {
        if (!is_string($m[$f] ?? null) || adresse_normalisieren($m[$f]) !== $m[$f]) throw new KonfigFehler("mail.$f ungültig");
    }
    if (!in_array($m['transport'] ?? '', ['smtp', 'mail', 'datei'], true)) throw new KonfigFehler('mail.transport unbekannt');
    if ($k['modus'] === 'produktion') {
        if (!str_starts_with($k['basis_url'], 'https://')) throw new KonfigFehler('Produktion: basis_url muss https:// sein');
        if ($m['transport'] === 'datei') throw new KonfigFehler('Produktion: mail.transport datei nicht erlaubt');
        if (($m['smtp']['sicherheit'] ?? '') === 'keine') throw new KonfigFehler('Produktion: SMTP ohne TLS nicht erlaubt');
        if (strlen($geheim) < 64) throw new KonfigFehler('Produktion: geheim muss mindestens 64 Zeichen haben');
        if (!$k['https_erzwingen']) throw new KonfigFehler('Produktion: https_erzwingen muss true sein');
        $root = realpath((string)($_SERVER['DOCUMENT_ROOT'] ?? '')) ?: '';
        if ($root !== '' && PHP_SAPI !== 'cli') {
            foreach (['daten' => $k['daten'], 'expose-backend' => BACKEND] as $was => $pfad) {
                $r = realpath($pfad) ?: $pfad;
                if ($r === $root || str_starts_with($r . '/', $root . '/')) throw new KonfigFehler("Produktion: $was liegt im Webroot");
            }
        }
    }
    return $k;
}

function testmodus(): bool { return cfg()['modus'] === 'test'; }

function daten(string $rel): string { return cfg()['daten'] . '/' . $rel; }

function schluessel(string $zweck, ?string $geheim = null): string { return hash_hmac('sha256', $zweck, $geheim ?? cfg()['geheim'], true); }

function b64u(string $s): string { return rtrim(strtr(base64_encode($s), '+/', '-_'), '='); }
function b64u_dec(string $s): string|false { return base64_decode(strtr($s, '-_', '+/'), true); }

function h(?string $s): string { return htmlspecialchars((string)$s, ENT_QUOTES | ENT_SUBSTITUTE | ENT_HTML5, 'UTF-8'); }

/** Für CSS-Zeichenketten (content:"…"): alles außer Buchstaben/Ziffern/Leerzeichen als \HEX escapen. */
function css_text(string $s): string
{
    $s = str_replace(["\r", "\n"], ' ', $s);
    $r = '';
    foreach (mb_str_split($s) as $z) $r .= preg_match('/^[A-Za-z0-9 .,·-]$/u', $z) ? $z : sprintf('\\%X ', mb_ord($z));
    return $r;
}

function jetzt(): \DateTimeImmutable { return new \DateTimeImmutable('now'); }

function fmt(\DateTimeInterface|int $t, string $f = 'd.m.Y H:i'): string
{
    if (is_int($t)) $t = (new \DateTimeImmutable('@' . $t))->setTimezone(new \DateTimeZone(date_default_timezone_get()));
    return $t->format($f);
}

function will_json(): bool { return str_contains((string)($_SERVER['HTTP_ACCEPT'] ?? ''), 'application/json'); }

function firma_telefon(): string { return '0159 05844641'; }

function objekt(string $slug): ?array
{
    if (!preg_match('/^[a-z0-9]+(?:-[a-z0-9]+)*$/D', $slug) || strlen($slug) > 80) return null;
    $p = BACKEND . "/objekte/$slug.json";
    if (!is_file($p)) return null;
    $o = json_decode((string)file_get_contents($p), true, 512, JSON_THROW_ON_ERROR);
    return is_array($o) && ($o['slug'] ?? null) === $slug ? $o : null;
}

// ======================================================================
// Dateien: atomar schreiben, sperren
// ======================================================================

function atomar_schreiben(string $pfad, string $inhalt): void
{
    $tmp = dirname($pfad) . '/.tmp-' . bin2hex(random_bytes(6));
    $fh = fopen($tmp, 'xb');
    if (!$fh) throw new \RuntimeException('nicht schreibbar: ' . basename($pfad));
    $ok = fwrite($fh, $inhalt) === strlen($inhalt);
    fflush($fh);
    if (function_exists('fsync')) @fsync($fh);
    fclose($fh);
    if (!$ok) { @unlink($tmp); throw new \RuntimeException('unvollständig geschrieben: ' . basename($pfad)); }
    @chmod($tmp, 0600);
    if (!rename($tmp, $pfad)) { @unlink($tmp); throw new \RuntimeException('Umbenennen fehlgeschlagen: ' . basename($pfad)); }
}

function mit_sperre(string $name, callable $f): mixed
{
    $fh = fopen(daten(".sperre-$name"), 'c');
    if (!$fh || !flock($fh, LOCK_EX)) throw new \RuntimeException("Sperre $name nicht möglich");
    try { return $f(); } finally { flock($fh, LOCK_UN); fclose($fh); }
}

function log_zeile(string $was, string $ergebnis): void
{
    // Betriebslog ohne Personendaten
    @file_put_contents(daten('log/expose-' . date('Y-m') . '.log'), date('c') . " $was $ergebnis\n", FILE_APPEND | LOCK_EX);
}

function nachweis(string $typ, ?string $vorgang, array $inhalt, ?\DateTimeImmutable $zeit = null): array
{
    return kette_anhaengen(daten('nachweise'), $typ, $vorgang, $inhalt, $zeit);
}

// ---------- IP: gekürzt und/oder HMAC (recherche.md 1.5) ----------
function ip_roh(): string
{
    $ip = (string)($_SERVER['REMOTE_ADDR'] ?? '');
    return filter_var($ip, FILTER_VALIDATE_IP) ? $ip : '0.0.0.0';
}
function ip_gekuerzt(string $ip): string
{
    $bin = @inet_pton($ip);
    if ($bin === false) return '';
    if (strlen($bin) === 4) return implode('.', array_slice(explode('.', $ip), 0, 3)) . '.0';
    return inet_ntop(substr($bin, 0, 6) . str_repeat("\0", 10)) . '/48';
}
/** Schlüssel für Rate-Limits: IPv4 voll, IPv6 je /64 (sonst wechselt ein Angreifer einfach die Adresse im eigenen Netz). */
function ip_limit_schluessel(): string
{
    $bin = @inet_pton(ip_roh());
    if ($bin === false) return 'ip:?';
    return strlen($bin) === 4 ? 'ip4:' . ip_roh() : 'ip6:' . bin2hex(substr($bin, 0, 8));
}
function ip_nachweis(): array
{
    $m = cfg()['ip_modus'];
    $ip = ip_roh();
    if ($m === 'keine') return [];
    $r = ['ip_gekuerzt' => ip_gekuerzt($ip)];
    if ($m === 'gekuerzt+hmac') $r['ip_hmac'] = hash_hmac('sha256', $ip, schluessel('ip-nachweis'));
    return $r;
}
function ip_in_netz(string $ip, string $netz): bool
{
    [$basis, $bits] = array_pad(explode('/', $netz, 2), 2, null);
    $a = @inet_pton($ip); $b = @inet_pton((string)$basis);
    if ($a === false || $b === false || strlen($a) !== strlen($b)) return false;
    $bits = $bits === null ? strlen($a) * 8 : max(0, min(strlen($a) * 8, (int)$bits));
    $voll = intdiv($bits, 8); $rest = $bits % 8;
    if (substr($a, 0, $voll) !== substr($b, 0, $voll)) return false;
    if ($rest === 0) return true;
    $maske = chr((0xFF << (8 - $rest)) & 0xFF);
    return (($a[$voll] & $maske) === ($b[$voll] & $maske));
}
function user_agent(): string { return mb_substr(mb_scrub((string)($_SERVER['HTTP_USER_AGENT'] ?? ''), 'UTF-8'), 0, 300); }

// ---------- Rate-Limit (dateibasiert, Schlüssel nur als HMAC) ----------
/** true = erlaubt. Schlägt das Dateisystem fehl, wird abgelehnt (fail closed). */
function erlaube(string $schluessel, array $grenzen): bool
{
    if (!$grenzen) return true;
    $datei = daten('ratelimit/' . hash_hmac('sha256', $schluessel, schluessel('ratelimit')) . '.json');
    $fh = @fopen($datei, 'c+');
    if (!$fh) { log_zeile('ratelimit', 'fehler:datei'); return false; }
    try {
        if (!flock($fh, LOCK_EX)) return false;
        $zeiten = json_decode((string)stream_get_contents($fh), true);
        $zeiten = is_array($zeiten) ? array_filter($zeiten, 'is_int') : [];
        $t = time();
        $max = max(array_map(fn($g) => (int)$g[1], $grenzen));
        $zeiten = array_values(array_filter($zeiten, fn($z) => $z > $t - $max));
        foreach ($grenzen as [$anzahl, $sek]) {
            if (count(array_filter($zeiten, fn($z) => $z > $t - $sek)) >= $anzahl) return false;
        }
        $zeiten[] = $t;
        if (count($zeiten) > 1000) $zeiten = array_slice($zeiten, -1000);
        ftruncate($fh, 0); rewind($fh); fwrite($fh, json_encode($zeiten)); fflush($fh);
        return true;
    } finally {
        flock($fh, LOCK_UN); fclose($fh);
        if (random_int(1, 50) === 1) aufraeumen_ratelimit();
    }
}
function ratelimit_vergessen(string $schluessel): void
{
    @unlink(daten('ratelimit/' . hash_hmac('sha256', $schluessel, schluessel('ratelimit')) . '.json'));
}
function aufraeumen_ratelimit(int $alter = 86400): int
{
    $n = 0;
    foreach (glob(daten('ratelimit/*.json')) ?: [] as $f) if (@filemtime($f) < time() - $alter && @unlink($f)) $n++;
    return $n;
}
function limit(string $name): array { return cfg()['limits'][$name] ?? []; }

function speicher_pruefen(): void
{
    $frei = @disk_free_space(cfg()['daten']);
    if ($frei !== false && $frei < cfg()['min_frei_mb'] * 1048576) {
        log_zeile('speicher', 'knapp');
        fehler(503, 'Der Dienst ist gerade nicht verfügbar. Bitte rufen Sie mich an: ' . firma_telefon() . '.');
    }
}

// ======================================================================
// Antworten und Sicherheits-Header
// ======================================================================

const CSP_SEITE = "default-src 'none'; script-src 'self'; style-src 'self'; img-src 'self' data:; font-src 'self'; connect-src 'self'; form-action 'self'; base-uri 'none'; frame-ancestors 'none'; object-src 'none'";

function ist_https(): bool
{
    $h = strtolower((string)($_SERVER['HTTPS'] ?? ''));
    if ($h !== '' && $h !== 'off') return true;
    if ((string)($_SERVER['SERVER_PORT'] ?? '') === '443') return true;
    return cfg_geladen() && cfg()['hinter_proxy'] && strtolower((string)($_SERVER['HTTP_X_FORWARDED_PROTO'] ?? '')) === 'https';
}

function sicherheitsheader(string $csp = CSP_SEITE, string $referrer = 'same-origin'): void
{
    header_remove('X-Powered-By');
    header('Content-Security-Policy: ' . $csp);
    header('X-Content-Type-Options: nosniff');
    header('X-Frame-Options: DENY');
    header('Referrer-Policy: ' . $referrer);
    header('Permissions-Policy: camera=(), microphone=(), geolocation=(), payment=(), usb=(), browsing-topics=()');
    header('Cross-Origin-Opener-Policy: same-origin');
    header('Cross-Origin-Resource-Policy: same-origin');
    header('X-Robots-Tag: noindex, nofollow, noarchive');
    if (ist_https() && cfg_geladen() && cfg()['hsts']) header('Strict-Transport-Security: ' . cfg()['hsts']);
}

/** HTTPS erzwingen (zusätzlich zu nginx): GET/HEAD werden umgeleitet, alles andere abgelehnt. */
function https_pruefen(): void
{
    if (!cfg()['https_erzwingen'] || ist_https()) return;
    $m = $_SERVER['REQUEST_METHOD'] ?? 'GET';
    if ($m === 'GET' || $m === 'HEAD') {
        $uri = (string)($_SERVER['REQUEST_URI'] ?? '/');
        if (!str_starts_with($uri, '/') || str_starts_with($uri, '//') || preg_match('/[\r\n]/', $uri)) $uri = '/';
        header('Location: ' . preg_replace('#^http://#', 'https://', cfg()['basis_url']) . $uri, true, 301);
        exit;
    }
    http_response_code(403);
    exit;
}

function seite(int $status, string $titel, string $inhalt): never
{
    http_response_code($status);
    header('Content-Type: text/html; charset=utf-8');
    header('Cache-Control: no-store');
    sicherheitsheader();
    $vorlage = (string)@file_get_contents(BACKEND . '/vorlagen/seite.html');
    if ($vorlage === '') $vorlage = '<!doctype html><html lang="de"><meta charset="utf-8"><title><!--TITEL--></title><!--INHALT--></html>';
    echo str_replace(['<!--TITEL-->', '<!--INHALT-->'], [h($titel), $inhalt], $vorlage);
    exit;
}

function json(int $status, array $daten): never
{
    http_response_code($status);
    header('Content-Type: application/json; charset=utf-8');
    header('Cache-Control: no-store');
    sicherheitsheader();
    echo json_encode($daten, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    exit;
}

function weiter(string $url): never
{
    if (will_json()) json(200, ['ok' => true, 'weiter' => $url]);
    http_response_code(303);
    header('Location: ' . $url);
    header('Cache-Control: no-store');
    sicherheitsheader();
    exit;
}

function fehler(int $status, string $meldung, array $felder = []): never
{
    if (will_json()) json($status, ['ok' => false, 'meldung' => $meldung, 'fehler' => (object)$felder]);
    $liste = '';
    foreach ($felder as $m) $liste .= '<li>' . h($m) . '</li>';
    seite($status, 'Bitte prüfen', '<h1>Bitte prüfen Sie Ihre Angaben</h1><p class="lede">' . h($meldung) . '</p>'
        . ($liste ? "<ul>$liste</ul>" : '')
        . '<p>Gehen Sie mit der Zurück-Taste Ihres Browsers zum Formular; Ihre Eingaben sind dort meist noch vorhanden.</p>'
        . '<p>Oder rufen Sie mich an: ' . h(firma_telefon()) . '.</p>');
}

/**
 * Prüft einen Formular-POST: Methode, Inhaltstyp, Größe, Herkunft (Origin, Sec-Fetch-Site, Referer).
 * Formulare ohne Sitzung brauchen kein CSRF-Token im klassischen Sinn (es gibt nichts zu „übernehmen“);
 * die Herkunftsprüfung verhindert trotzdem, dass fremde Seiten Besucher Erklärungen absenden lassen.
 */
function nur_post(string $zurueck): void
{
    $m = $_SERVER['REQUEST_METHOD'] ?? 'GET';
    if ($m === 'GET' || $m === 'HEAD') { header('Location: ' . $zurueck, true, 303); sicherheitsheader(); exit; }
    if ($m !== 'POST') { header('Allow: GET, POST'); http_response_code(405); exit; }
    $typ = strtolower((string)($_SERVER['CONTENT_TYPE'] ?? ''));
    if (!str_starts_with($typ, 'application/x-www-form-urlencoded')) { http_response_code(415); sicherheitsheader(); exit; }
    if ((int)($_SERVER['CONTENT_LENGTH'] ?? 0) > MAX_POST) { http_response_code(413); sicherheitsheader(); exit; }
    herkunft_pruefen();
}

function herkunft_pruefen(): void
{
    $erlaubt = cfg()['origin'];
    $origin = $_SERVER['HTTP_ORIGIN'] ?? null;
    if ($origin !== null && !in_array($origin, $erlaubt, true)) { log_zeile('herkunft', 'origin'); fehler(403, 'Die Anfrage kam nicht von roessler-immo.de.'); }
    $sfs = $_SERVER['HTTP_SEC_FETCH_SITE'] ?? null;
    if ($sfs !== null && !in_array($sfs, ['same-origin', 'none'], true)) { log_zeile('herkunft', 'sec-fetch-site'); fehler(403, 'Die Anfrage kam nicht von roessler-immo.de.'); }
    $ref = $_SERVER['HTTP_REFERER'] ?? null;
    if ($origin === null && $ref !== null && $ref !== '') {
        $p = parse_url($ref);
        $herkunft = isset($p['scheme'], $p['host']) ? $p['scheme'] . '://' . $p['host'] . (isset($p['port']) ? ':' . $p['port'] : '') : '';
        if (!in_array($herkunft, $erlaubt, true)) { log_zeile('herkunft', 'referer'); fehler(403, 'Die Anfrage kam nicht von roessler-immo.de.'); }
    }
}

// ======================================================================
// Eingaben und Validierung
// ======================================================================

/** Ein Textfeld aus POST: nur Zeichenketten, gültiges UTF-8, NFC, Leerraum zusammengefasst. Keine Kürzung. */
function feld(string $n, ?array $quelle = null): string
{
    $v = ($quelle ?? $_POST)[$n] ?? '';
    if (!is_string($v) || !mb_check_encoding($v, 'UTF-8')) return "\x00";       // führt sicher zu einem Validierungsfehler
    if (class_exists(\Normalizer::class)) $v = \Normalizer::normalize($v, \Normalizer::FORM_C) ?: $v;
    return trim((string)preg_replace('/[ \t]+/u', ' ', $v));
}
function get_text(string $n, int $max = 1000): string
{
    $v = $_GET[$n] ?? '';
    return is_string($v) && strlen($v) <= $max && mb_check_encoding($v, 'UTF-8') ? $v : '';
}
function steuerzeichen(string $v): bool { return (bool)preg_match('/[\x00-\x1F\x7F\x{2028}\x{2029}\x{200E}\x{200F}\x{202A}-\x{202E}\x{2066}-\x{2069}]/u', $v); }

function pruefe_name(string $v): ?string
{
    if ($v === '') return 'Bitte geben Sie Ihren Vor- und Nachnamen an.';
    if (steuerzeichen($v) || mb_strlen($v) > 80 || !preg_match("/^\\p{L}[\\p{L}\\p{M} .'\\-]{1,79}$/uD", $v)) return 'Bitte nur Buchstaben, Leerzeichen, Bindestrich und Apostroph (2 bis 80 Zeichen).';
    return null;
}
function pruefe_email(string $v): ?string
{
    if ($v === '') return 'Bitte geben Sie Ihre E-Mail-Adresse an.';
    if (steuerzeichen($v) || adresse_normalisieren($v) === null) return 'Bitte prüfen Sie die E-Mail-Adresse, zum Beispiel name@beispiel.de.';
    return null;
}
function pruefe_telefon(string $v): ?string
{
    if ($v === '') return null;
    if (!preg_match('/^[0-9 +()\/\-]{6,30}$/D', $v) || preg_match_all('/\d/', $v) < 6) return 'Bitte prüfen Sie die Telefonnummer. Erlaubt sind Ziffern, Leerzeichen und + ( ) / -.';
    return null;
}

function email_hash(string $email): string { return hash_hmac('sha256', mb_strtolower(trim($email)), schluessel('email')); }

// ======================================================================
// Formular-Token: zeitgestempelt, signiert, nur einmal verwendbar (Replay- und Bot-Schutz ohne Drittanbieter)
// ======================================================================

const FT_MIN_SEK = 3;
const FT_MAX_SEK = 21600;

function formular_token(string $slug): string
{
    $p = b64u(json_encode(['z' => time(), 'n' => b64u(random_bytes(12)), 'o' => $slug], JSON_UNESCAPED_SLASHES));
    return $p . '.' . b64u(hash_hmac('sha256', 'ft|' . $p, schluessel('formular'), true));
}

/** Ergebnis: ['status' => ok|fehlt|ungueltig|zu_schnell|abgelaufen, 'n' => Nonce, 'alter' => Sekunden] */
function formular_token_pruefen(string $ft, string $slug): array
{
    if ($ft === '') return ['status' => 'fehlt'];
    if (!preg_match('/^[A-Za-z0-9_-]{20,200}\.[A-Za-z0-9_-]{43}$/D', $ft)) return ['status' => 'ungueltig'];
    [$p, $sig] = explode('.', $ft, 2);
    if (!hash_equals(b64u(hash_hmac('sha256', 'ft|' . $p, schluessel('formular'), true)), $sig)) return ['status' => 'ungueltig'];
    $d = json_decode((string)b64u_dec($p), true);
    if (!is_array($d) || !is_int($d['z'] ?? null) || !is_string($d['n'] ?? null) || ($d['o'] ?? null) !== $slug) return ['status' => 'ungueltig'];
    $alter = time() - $d['z'];
    if ($alter < FT_MIN_SEK) return ['status' => 'zu_schnell', 'alter' => $alter, 'n' => $d['n']];
    if ($alter > FT_MAX_SEK) return ['status' => 'abgelaufen', 'alter' => $alter, 'n' => $d['n']];
    return ['status' => 'ok', 'alter' => $alter, 'n' => $d['n']];
}

// ======================================================================
// Exposé-Link: signiert, zeitlich begrenzt, an Vorgang, Objekt und Ausstellung gebunden
// ======================================================================

function token_erzeugen(string $vorgang, string $slug, int $ab, int $bis, int $nr): string
{
    $p = b64u(json_encode(['v' => $vorgang, 'o' => $slug, 'ab' => $ab, 'bis' => $bis, 'n' => $nr], JSON_UNESCAPED_SLASHES));
    return $p . '.' . b64u(hash_hmac('sha256', 'expose|' . $p, schluessel('token'), true));
}

function token_pruefen(string $t): ?array
{
    if (!preg_match('/^[A-Za-z0-9_-]{20,400}\.[A-Za-z0-9_-]{43}$/D', $t)) return null;
    [$p, $sig] = explode('.', $t, 2);
    $ok = false;
    foreach (array_merge([cfg()['geheim']], (array)cfg()['geheim_alt']) as $g) {
        if (hash_equals(b64u(hash_hmac('sha256', 'expose|' . $p, schluessel('token', (string)$g), true)), $sig)) { $ok = true; break; }
    }
    if (!$ok) return null;
    $d = json_decode((string)b64u_dec($p), true);
    if (!is_array($d) || !is_string($d['v'] ?? null) || !is_string($d['o'] ?? null) || !is_int($d['ab'] ?? null) || !is_int($d['bis'] ?? null) || !is_int($d['n'] ?? null)) return null;
    return $d;
}

/** Freigabe-Link für Linus: HMAC über Vorgang und Ablaufzeit (Standard 14 Tage). */
function freigabe_sig(string $vorgang, int $ablauf): string { return b64u(hash_hmac('sha256', "freigabe|$vorgang|$ablauf", schluessel('freigabe'), true)); }
function freigabe_link(string $vorgang): string
{
    $e = time() + 14 * 86400;
    return cfg()['basis_url'] . '/freigabe.php?v=' . $vorgang . '&e=' . $e . '&s=' . freigabe_sig($vorgang, $e);
}

function vorgang_id_ok(string $v): bool { return preg_match('/^EX-\d{6}-[0-9A-F]{8}$/D', $v) === 1; }
function vorgang_datei(string $v): string
{
    if (!vorgang_id_ok($v)) throw new \InvalidArgumentException('Vorgangsnummer ungültig');
    return daten("vorgaenge/$v.json");
}
function vorgang_laden(string $v): ?array
{
    if (!vorgang_id_ok($v)) return null;
    $p = vorgang_datei($v);
    if (!is_file($p)) return null;
    $d = json_decode((string)file_get_contents($p), true);
    return is_array($d) && ($d['vorgang'] ?? null) === $v ? $d : null;
}
function vorgang_speichern(array $d): void
{
    atomar_schreiben(vorgang_datei($d['vorgang']), json_encode($d, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT | JSON_THROW_ON_ERROR));
}
/** Lesen, ändern, schreiben unter einer Sperre (verhindert verlorene Widerrufe bei gleichzeitigen Abrufen). */
function vorgang_aendern(string $v, callable $f): ?array
{
    return mit_sperre('vorgaenge', function () use ($v, $f) {
        $vg = vorgang_laden($v);
        if (!$vg) return null;
        $neu = $f($vg);
        if (is_array($neu)) { vorgang_speichern($neu); return $neu; }
        return $vg;
    });
}
function vorgaenge_alle(): array
{
    $r = [];
    foreach (glob(daten('vorgaenge/EX-*.json')) ?: [] as $p) {
        $vg = vorgang_laden(basename($p, '.json'));
        if ($vg) $r[] = $vg;
    }
    usort($r, fn($a, $b) => strcmp($b['vertrag'], $a['vertrag']));
    return $r;
}

function expose_link(string $token): string { return cfg()['basis_url'] . '/expose.php?t=' . $token; }

// ======================================================================
// Mail
// ======================================================================

function mail_senden(string $an, string $betreff, string $text, ?string $antwortAn = null, string $art = 'mail'): array
{
    $host = parse_url(cfg()['basis_url'], PHP_URL_HOST) ?: 'localhost';
    return nachricht_senden(cfg()['mail'], $an, $betreff, $text, $antwortAn, $art, $host, daten('test-mails'), testmodus());
}

function gruss(): string
{
    return "Viele Grüße\nLinus Rössler\nRössler Immobilien · " . preg_replace('#^https?://#', '', cfg()['basis_url']) . ' · Telefon ' . firma_telefon();
}

function trenner(string $titel): string { return "\n\n" . str_repeat('=', 76) . "\n" . mb_strtoupper($titel) . "\n" . str_repeat('=', 76) . "\n\n"; }

/** Mail-Kopie als Nachweis ablegen und Prüfwerte zurückgeben. */
function mail_ablegen(string $name, array $mail): array
{
    $rel = "nachweise/mails/$name.eml";
    atomar_schreiben(daten($rel), $mail['eml']);
    return ['kopie' => $rel, 'eml_sha256' => $mail['sha256_eml']];
}

// ======================================================================
// 1. Anfrage: Vertragsschluss und Exposé-Freigabe
// ======================================================================

function anfrage(): never
{
    cfg();
    https_pruefen();
    // GET ?ft=<slug>: frisches Formular-Token (zustandslos, kein Speicher, kein Cookie)
    if (($_SERVER['REQUEST_METHOD'] ?? '') === 'GET' && isset($_GET['ft'])) {
        $o = objekt(get_text('ft', 80));
        if (!$o) json(404, ['ok' => false]);
        json(200, ['ok' => true, 'ft' => formular_token($o['slug'])]);
    }
    $start = microtime(true);
    nur_post('/');
    $slug = feld('objekt');
    $o = objekt($slug);
    if (!$o || in_array($o['status'], ['reserviert', 'verkauft'], true)) { log_zeile('anfrage', 'fehler:objekt'); fehler(404, 'Dieses Objekt ist nicht (mehr) verfügbar.'); }

    if (!erlaube(ip_limit_schluessel(), limit('ip'))) {
        log_zeile('anfrage', 'limit:ip');
        header('Retry-After: 600');
        fehler(429, 'Sie haben in kurzer Zeit mehrere Anfragen gesendet. Bitte rufen Sie mich an: ' . firma_telefon() . '.');
    }

    // Spam: scheinbarer Erfolg, kein Vertrag, keine Mail
    if (feld('website') !== '') { log_zeile('anfrage', 'spam:honeypot'); weiter($o['urls']['danke']['frist']); }

    if (feld('fassung') !== $o['fassung']) {
        log_zeile('anfrage', 'fehler:fassung');
        fehler(409, 'Die Vertragstexte wurden inzwischen aktualisiert. Bitte laden Sie die Seite neu und bestätigen Sie die Erklärungen noch einmal.');
    }

    $name = feld('name'); $email = feld('email'); $tel = feld('telefon');
    $t = feld('t'); $js = feld('js');
    $f = [];
    if ($e = pruefe_name($name)) $f['name'] = $e;
    if ($e = pruefe_email($email)) $f['email'] = $e;
    if ($e = pruefe_telefon($tel)) $f['telefon'] = $e;

    $mitVertrag = (bool)$o['mit_maklervertrag'];
    $beginn = $mitVertrag ? feld('beginn') : 'sofort';
    if ($mitVertrag && !in_array($beginn, $o['beginn_optionen'], true)) $f['beginn'] = 'Bitte wählen Sie, wann Sie das Exposé erhalten möchten.';

    // Häkchen: serverseitig erzwungen, nur der Wert „1“ zählt, nichts wird vorausgesetzt
    $gesetzt = is_array($_POST['erklaerung'] ?? null) ? $_POST['erklaerung'] : [];
    $erklaerungen = [];
    foreach ($o['erklaerungen'] as $e) {
        $noetig = $e['wann'] === 'immer' || ($e['wann'] === 'sofort' && $beginn === 'sofort');
        $ja = ($gesetzt[$e['id']] ?? '') === '1';
        if ($noetig && !$ja) $f["erklaerung[{$e['id']}]"] = 'Bitte bestätigen Sie diese Erklärung, sonst kann ich das Exposé nicht freigeben.';
        if ($noetig && $ja) $erklaerungen[] = ['id' => $e['id'], 'version' => $e['version'], 'sha256' => $e['sha256'], 'text' => $e['text'], 'bestaetigt' => true];
    }
    if ($f) { log_zeile('anfrage', 'fehler:validierung'); fehler(422, 'Bitte prüfen Sie die markierten Angaben.', $f); }
    $email = adresse_normalisieren($email);

    // Bot-Schutz nach der Validierung: Menschen, die sich vertippen, sehen Fehlermeldungen statt eines Scheinerfolgs
    $ft = formular_token_pruefen(feld('ft'), $slug);
    if ($ft['status'] === 'zu_schnell') { log_zeile('anfrage', 'spam:zeit'); weiter($o['urls']['danke']['frist']); }
    if ($ft['status'] === 'ungueltig') { log_zeile('anfrage', 'fehler:ft'); fehler(400, 'Das Formular ist ungültig. Bitte laden Sie die Seite neu.'); }
    if ($ft['status'] === 'abgelaufen') { log_zeile('anfrage', 'fehler:ft-alt'); fehler(409, 'Das Formular war zu lange geöffnet. Bitte laden Sie die Seite neu und senden Sie es noch einmal.'); }
    if ($ft['status'] === 'fehlt' && !erlaube('ohne-token:' . ip_limit_schluessel(), limit('ip_ohne_token'))) {
        log_zeile('anfrage', 'limit:ohne-token');
        fehler(429, 'Sie haben in kurzer Zeit mehrere Anfragen gesendet. Bitte rufen Sie mich an: ' . firma_telefon() . '.');
    }

    $eh = email_hash($email);
    if (!erlaube("mail-objekt:$eh:$slug", limit('email_objekt')) || !erlaube("mail:$eh", limit('email'))) {
        log_zeile('anfrage', 'limit:email');
        fehler(429, 'Für diese E-Mail-Adresse liegen heute schon mehrere Anfragen vor. Bitte schauen Sie in Ihr Postfach oder rufen Sie mich an: ' . firma_telefon() . '.');
    }
    if (!erlaube('global:anfrage', limit('global'))) {
        log_zeile('anfrage', 'limit:global');
        fehler(503, 'Gerade gehen sehr viele Anfragen ein. Bitte versuchen Sie es später noch einmal oder rufen Sie mich an: ' . firma_telefon() . '.');
    }
    speicher_pruefen();
    // Wiederholung (Doppelklick, erneutes Senden, abgefangener POST): dasselbe Token nur einmal,
    // dieselbe Anfrage (E-Mail, Objekt, Zeitpunkt) höchstens einmal in 10 Minuten
    if ($ft['status'] === 'ok' && !erlaube('ft:' . $ft['n'], [[1, FT_MAX_SEK]])) {
        log_zeile('anfrage', 'doppelt:token');
        fehler(409, 'Dieses Formular wurde bereits abgeschickt. Bitte schauen Sie in Ihr Postfach; für eine neue Anfrage laden Sie die Seite neu.');
    }
    if (!erlaube("doppelt:$eh:$slug:$beginn", [[1, 600]])) { log_zeile('anfrage', 'doppelt:inhalt'); weiter($o['urls']['danke'][$beginn === 'sofort' ? 'sofort' : 'frist']); }

    // ---- Vertrag geschlossen: Vorgang anlegen ----
    $jetzt = jetzt();
    $vorgang = 'EX-' . $jetzt->format('ymd') . '-' . strtoupper(bin2hex(random_bytes(4)));
    $fg = $o['freigabe'];
    $modus = cfg()['freigabe_modus'] ?? $fg['modus'] ?? 'automatisch';
    if ($beginn === 'sofort') $ab = $jetzt->getTimestamp();
    else $ab = $jetzt->setTime(0, 0)->modify('+' . (15 + (int)$fg['karenz_tage']) . ' days')->getTimestamp();
    $bis = $ab + 86400 * (int)$fg['link_gueltig_tage'];
    $fristEnde = $jetzt->setTime(23, 59, 59)->modify('+14 days');

    $vg = [
        'vorgang' => $vorgang, 'objekt' => $slug, 'nummer' => $o['nummer'], 'titel' => $o['titel'],
        'name' => $name, 'email' => $email, 'email_hash' => $eh, 'telefon' => $tel,
        'beginn' => $beginn, 'modus' => $modus, 'vertrag' => $jetzt->format(DATE_ATOM),
        'widerrufsfrist_ende' => $fristEnde->format(DATE_ATOM),
        'ab' => $ab, 'bis' => $bis, 'token_nr' => 1, 'freigegeben' => $modus === 'automatisch', 'freigegeben_am' => $modus === 'automatisch' ? $jetzt->format(DATE_ATOM) : null,
        'widerrufen' => false, 'gesperrt' => false, 'abrufe' => 0, 'muster' => $o['muster'], 'aufbewahren_bis' => null,
    ];
    mit_sperre('vorgaenge', fn() => vorgang_speichern($vg));

    // ---- Nachweis: Vertragsschluss (vor der Mail, damit er auch bei Mailfehlern feststeht) ----
    // Scheitert das Protokoll, wird der Vorgang zurückgenommen: kein Vertrag ohne Nachweis, keine Mail.
    try {
        $n1 = nachweis('vertragsschluss', $vorgang, [
            'zeit_utc' => gmdate('Y-m-d\TH:i:s\Z', $jetzt->getTimestamp()),
            'objekt' => ['slug' => $slug, 'nummer' => $o['nummer'], 'titel' => $o['titel'], 'muster' => $o['muster']],
            'person' => ['name' => $name, 'email' => $email, 'telefon' => $tel],
            'maklervertrag' => $mitVertrag, 'beginn' => $beginn, 'fassung' => $o['fassung'],
            'erklaerungen' => $erklaerungen,
            'nicht_abgegeben' => array_values(array_map(fn($e) => $e['id'], array_filter($o['erklaerungen'], fn($e) => !in_array($e['id'], array_column($erklaerungen, 'id'), true)))),
            'rechtstexte' => array_map(fn($r) => ['version' => $r['version'], 'sha256' => $r['sha256']], $o['rechtstexte']),
            'schaltflaeche' => $mitVertrag ? $o['freigabe']['button_text'] : 'Exposé anfordern',
            'provision' => $o['provision'],
            'freigabe' => ['modus' => $modus, 'ab' => date(DATE_ATOM, $ab), 'bis' => date(DATE_ATOM, $bis)],
            'technik' => array_merge([
                'user_agent' => user_agent(),
                'seite' => mb_substr(mb_scrub((string)($_SERVER['HTTP_REFERER'] ?? '')), 0, 200),
                'javascript' => $js === '1', 'formular_ms' => ctype_digit($t) && strlen($t) < 10 ? (int)$t : null,
                'formular_token' => $ft['status'], 'formular_sek' => $ft['alter'] ?? null,
            ], ip_nachweis()),
        ], $jetzt);
    } catch (\Throwable $ex) {
        @unlink(vorgang_datei($vorgang));
        ratelimit_vergessen("doppelt:$eh:$slug:$beginn");
        log_zeile('anfrage', 'fehler:nachweis');
        throw $ex;
    }

    // ---- E-Mail an den Interessenten: Vertragsbestätigung auf dauerhaftem Datenträger ----
    $link = $modus === 'automatisch' ? expose_link(token_erzeugen($vorgang, $slug, $ab, $bis, 1)) : null;
    $text = mail_interessent($o, $vg, $erklaerungen, $link, $jetzt, $n1);
    $betreff = ($mitVertrag ? 'Ihr Maklervertrag und Exposé: ' : 'Ihr Exposé: ') . $o['titel'] . " (Vorgang $vorgang)";
    $mailI = null; $mailFehler = null;
    try { $mailI = mail_senden($email, $betreff, $text, null, 'interessent'); }
    catch (\Throwable $ex) { $mailFehler = $ex->getMessage(); log_zeile('anfrage', 'mail:fehler'); }
    $n2 = nachweis('bestaetigung', $vorgang, $mailI
        ? array_merge(['an' => $email, 'message_id' => $mailI['message_id'], 'sha256_text' => $mailI['sha256_text'], 'server' => $mailI['antwort']], mail_ablegen("$vorgang-interessent", $mailI))
        : ['an' => $email, 'fehler' => mb_substr($mailFehler ?? '', 0, 200)]);

    // ---- E-Mail an Linus ----
    try { mail_senden(cfg()['mail']['an_linus'], mail_linus_betreff($o, $vg), mail_linus($o, $vg, $mailFehler, $n1), $email, 'linus'); }
    catch (\Throwable) { log_zeile('anfrage', 'mail:linus-fehler'); }

    if ($mailFehler) {
        fehler(500, 'Die Bestätigungs-E-Mail konnte nicht gesendet werden. Bitte rufen Sie mich an: ' . firma_telefon() . ' oder schreiben Sie an linus@roessler-immo.de. Vorgang: ' . $vorgang);
    }
    log_zeile('anfrage', sprintf('ok %s %dms', $beginn, (int)((microtime(true) - $start) * 1000)));
    $fall = $modus === 'manuell' ? 'manuell' : ($beginn === 'sofort' ? 'sofort' : 'frist');
    weiter($o['urls']['danke'][$fall]);
}

function mail_interessent(array $o, array $vg, array $erklaerungen, ?string $link, \DateTimeImmutable $jetzt, array $nachweis): string
{
    $b = cfg()['basis_url'];
    $mit = (bool)$o['mit_maklervertrag'];
    $t = "Guten Tag {$vg['name']},\n\n";
    $t .= "danke für Ihr Interesse an der Wohnung „{$o['titel']}“ ({$o['lage_kurz']}, Nr. {$o['nummer']}).\n\n";
    if ($mit) $t .= "Mit dieser E-Mail bestätige ich den Eingang Ihrer Bestellung und unseren Maklervertrag. Bitte bewahren Sie die E-Mail auf; sie enthält den Vertragstext, Ihre Erklärungen, die Widerrufsbelehrung und das Muster-Widerrufsformular.\n";
    $t .= trenner('Ihr Exposé');
    if ($vg['modus'] === 'manuell') {
        $t .= "Ich schalte das vollständige Exposé persönlich frei und schicke Ihnen den Link in einer eigenen E-Mail, meist innerhalb eines Werktags.";
        if ($vg['beginn'] === 'nach_frist') $t .= ' Wie gewünscht funktioniert der Link erst ab ' . fmt($vg['ab'], 'd.m.Y') . ' (nach Ablauf der Widerrufsfrist).';
        $t .= "\n";
    } elseif ($vg['beginn'] === 'sofort') {
        $t .= "Ihr persönlicher Link, gültig bis " . fmt($vg['bis'], 'd.m.Y') . ":\n$link\n";
    } else {
        $t .= "Ihr persönlicher Link:\n$link\n\nWie gewünscht funktioniert er erst nach Ablauf der Widerrufsfrist, ab " . fmt($vg['ab'], 'd.m.Y') . ', und dann bis ' . fmt($vg['bis'], 'd.m.Y') . ".\n";
    }
    $t .= "\nDer Link ist Ihrem Namen zugeordnet. Bitte geben Sie ihn nicht weiter.\n";
    $t .= trenner('Ihre Erklärungen');
    $t .= 'Eingegangen am ' . $jetzt->format('d.m.Y') . ' um ' . $jetzt->format('H:i:s') . " Uhr (Vorgang {$vg['vorgang']}).\n\n";
    foreach ($erklaerungen as $e) $t .= "[x] {$e['text']}\n    (Fassung {$e['version']})\n\n";
    if ($mit) {
        $t .= 'Zeitpunkt des Exposés: ' . ($vg['beginn'] === 'sofort' ? 'sofort (vorzeitiger Beginn ausdrücklich verlangt)' : 'nach Ablauf der Widerrufsfrist') . "\n";
        $t .= "Abgeschlossen mit der Schaltfläche „{$o['freigabe']['button_text']}“.\n";
        $t .= 'Widerrufsfrist: 14 Tage ab heute, also bis einschließlich ' . (new \DateTimeImmutable($vg['widerrufsfrist_ende']))->format('d.m.Y') . ".\n";
    }
    $t .= "\nProtokolleintrag Nr. {$nachweis['seq']}, Prüfwert (SHA-256):\n{$nachweis['hash']}\n"
        . "(Mit diesem Wert lässt sich später belegen, dass der gespeicherte Eintrag zu Ihrer Bestellung unverändert ist.)\n";
    if ($mit) {
        $t .= trenner('Vertrag widerrufen');
        $t .= "Online: $b/vertrag-widerrufen/\nIhre Vorgangsnummer: {$vg['vorgang']}\nOder per E-Mail an linus@roessler-immo.de bzw. per Brief (Anschrift in der Widerrufsbelehrung).\n";
        foreach (['maklervertrag-kaeufer', 'widerrufsbelehrung', 'widerrufsformular'] as $id) {
            $r = $o['rechtstexte'][$id];
            $t .= trenner("{$r['titel']} (Fassung {$r['version']})") . $r['text'] . "\n";
        }
    } else {
        $r = $o['rechtstexte']['weitergabeverbot'];
        $t .= trenner($r['titel']) . $r['text'] . "\n";
    }
    $r = $o['rechtstexte']['datenschutz-expose'];
    $t .= trenner($r['titel']) . $r['text'] . "\n\n";
    $t .= gruss() . "\n";
    if ($o['muster']) $t = "*** MUSTER-OBJEKT: frei erfundene Angaben, nur Test ***\n\n" . $t;
    return $t;
}

function mail_linus_betreff(array $o, array $vg): string
{
    $b = ['sofort' => 'sofort', 'nach_frist' => 'nach Frist'][$vg['beginn']] ?? $vg['beginn'];
    return '[Exposé] ' . $o['nummer'] . ' · ' . $vg['name'] . ' · ' . $b . ($vg['modus'] === 'manuell' ? ' · FREIGABE NÖTIG' : '');
}

function mail_linus(array $o, array $vg, ?string $mailFehler, array $nachweis): string
{
    $t = "Neue Exposé-Anforderung\n\n";
    $t .= "Objekt:    {$o['nummer']} · {$o['titel']}\n";
    $t .= "Name:      {$vg['name']}\nE-Mail:    {$vg['email']}\nTelefon:   " . ($vg['telefon'] ?: '–') . "\n";
    $t .= 'Exposé:    ' . ($vg['beginn'] === 'sofort' ? 'sofort (vorzeitiger Beginn verlangt, Wertersatz-Hinweis bestätigt)' : 'nach Ablauf der Widerrufsfrist, ab ' . fmt($vg['ab'], 'd.m.Y')) . "\n";
    $t .= "Vorgang:   {$vg['vorgang']}\nVertrag:   " . fmt(new \DateTimeImmutable($vg['vertrag'])) . " Uhr\n";
    $t .= 'Widerrufsfrist bis: ' . (new \DateTimeImmutable($vg['widerrufsfrist_ende']))->format('d.m.Y') . "\n";
    $t .= "Nachweis:  Eintrag Nr. {$nachweis['seq']}, Prüfwert {$nachweis['hash']}\n";
    if ($vg['modus'] === 'manuell') {
        $t .= "\nFREIGABE: Bitte prüfen und freigeben (Link gilt 14 Tage):\n" . freigabe_link($vg['vorgang']) . "\n";
    } else {
        $t .= "\nFreigabe: automatisch\n";
    }
    if ($mailFehler) $t .= "\nACHTUNG: Bestätigungs-E-Mail an den Interessenten ist FEHLGESCHLAGEN. Bitte anrufen.\n";
    if (!empty(cfg()['admin']['passwort_hash'])) $t .= "\nÜbersicht: " . cfg()['basis_url'] . "/expose-admin.php\n";
    $t .= "GwG: Identifizierung erst bei ernsthaftem Kaufinteresse (spätestens Kaufvertragsentwurf).\n";
    if ($o['muster']) $t = "*** MUSTER-OBJEKT, nur Test ***\n\n" . $t;
    return $t;
}

// ======================================================================
// 2. Exposé ausliefern
// ======================================================================

function token_fehlversuch(string $wo): void
{
    log_zeile($wo, 'token:ungueltig');
    if (!erlaube('tokenfehler:' . ip_limit_schluessel(), limit('token_fehler'))) {
        header('Retry-After: 600');
        seite(429, 'Zu viele Versuche', '<h1>Zu viele ungültige Links</h1><p class="lede">Bitte versuchen Sie es später noch einmal oder rufen Sie mich an: ' . h(firma_telefon()) . '.</p>');
    }
}

function expose(): never
{
    cfg();
    https_pruefen();
    $m = $_SERVER['REQUEST_METHOD'] ?? 'GET';
    if ($m !== 'GET' && $m !== 'HEAD') { header('Allow: GET, HEAD'); http_response_code(405); exit; }
    $tel = h(firma_telefon());
    $d = token_pruefen(get_text('t', 600));
    $ungueltig = "<h1>Dieser Link ist ungültig</h1><p class=\"lede\">Bitte nutzen Sie den Link aus Ihrer E-Mail vollständig oder rufen Sie mich an: $tel.</p>";
    if (!$d) { token_fehlversuch('expose'); seite(404, 'Link ungültig', $ungueltig); }
    $o = objekt($d['o']);
    if (!$o || !vorgang_id_ok($d['v'])) { token_fehlversuch('expose'); seite(404, 'Link ungültig', $ungueltig); }

    $grund = null;
    $zeit = time();
    // Prüfen und zählen unter Sperre: ein gleichzeitiger Widerruf geht nicht verloren
    $vg = vorgang_aendern($d['v'], function (array $vg) use ($d, $o, $zeit, $m, &$grund) {
        if ($vg['objekt'] !== $d['o'] || (int)($vg['token_nr'] ?? 1) !== $d['n']) { $grund = 'fremd'; return null; }
        if (!empty($vg['widerrufen'])) { $grund = 'widerrufen'; return null; }
        if (!empty($vg['gesperrt'])) { $grund = 'gesperrt'; return null; }
        if ($o['status'] === 'verkauft') { $grund = 'verkauft'; return null; }
        if ($zeit < $d['ab']) { $grund = 'noch-nicht'; return null; }
        if ($zeit > min($d['bis'], (int)$vg['bis'])) { $grund = 'abgelaufen'; return null; }
        $max = (int)cfg()['max_abrufe'];
        if ($max > 0 && (int)$vg['abrufe'] >= $max) { $grund = 'max-abrufe'; return null; }
        if ($m === 'HEAD') return null;
        $vg['abrufe'] = (int)$vg['abrufe'] + 1;
        $vg['letzter_abruf'] = date(DATE_ATOM, $zeit);
        return $vg;
    });
    if (!$vg) { token_fehlversuch('expose'); seite(404, 'Link ungültig', $ungueltig); }
    if ($grund !== null) {
        log_zeile('expose', $grund);
        match ($grund) {
            'fremd' => seite(404, 'Link ungültig', $ungueltig),
            'widerrufen' => seite(410, 'Vertrag widerrufen', '<h1>Sie haben den Vertrag widerrufen</h1><p class="lede">Deshalb ist das Exposé für diesen Link gesperrt. Möchten Sie es doch sehen, fordern Sie es bitte neu an.</p><p><a href="' . h($o['urls']['kurz']) . '">Zum Objekt</a></p>'),
            'gesperrt' => seite(410, 'Link gesperrt', '<h1>Dieser Link ist gesperrt</h1><p class="lede">Bitte rufen Sie mich an: ' . $tel . '.</p>'),
            'verkauft' => seite(410, 'Verkauft', '<h1>Diese Wohnung ist verkauft</h1><p class="lede">Ähnliche Wohnung gesucht? Rufen Sie mich an: ' . $tel . '.</p>'),
            'noch-nicht' => seite(403, 'Noch nicht freigeschaltet', '<h1>Ihr Exposé ist ab ' . h(fmt($d['ab'], 'd.m.Y')) . ' freigeschaltet</h1><p class="lede">Sie haben gewählt, das Exposé erst nach Ablauf der Widerrufsfrist zu erhalten. Möchten Sie es früher? Rufen Sie mich an: ' . $tel . '.</p>'),
            'abgelaufen' => seite(410, 'Link abgelaufen', '<h1>Dieser Link ist abgelaufen</h1><p class="lede">Gern schicke ich Ihnen einen neuen. Rufen Sie mich an (' . $tel . ') oder schreiben Sie an linus@roessler-immo.de mit Ihrer Vorgangsnummer ' . h($vg['vorgang']) . '.</p>'),
            'max-abrufe' => seite(429, 'Zu viele Abrufe', '<h1>Dieser Link wurde sehr oft geöffnet</h1><p class="lede">Zum Schutz des Verkäufers ist er vorerst gesperrt. Bitte rufen Sie mich an: ' . $tel . '.</p>'),
        };
    }

    $html = @file_get_contents(BACKEND . '/geschuetzt/' . $o['slug'] . '.html');
    if ($html === false) seite(500, 'Fehler', '<h1>Das Exposé ist gerade nicht verfügbar</h1><p class="lede">Bitte rufen Sie mich an: ' . $tel . '.</p>');

    if ($m !== 'HEAD') {
        nachweis('abruf', $vg['vorgang'], array_merge(['objekt' => $o['slug'], 'abruf' => $vg['abrufe'], 'user_agent' => user_agent()], ip_nachweis()));
        log_zeile('expose', 'ok');
    }

    $empf = $vg['name'];
    $html = str_replace(
        ['<!--EMPFAENGER-->', '<!--VORGANG-->', '<!--ABRUF-->', '<!--EMPFAENGER_CSS-->'],
        [h($empf), h($vg['vorgang']), h(date('d.m.Y H:i', $zeit)), css_text("Persönliches Exposé für $empf · Vorgang {$vg['vorgang']}")],
        $html
    );
    // CSP mit Hashes der eingebetteten Stile: kein 'unsafe-inline', Skript nur von der eigenen Domain
    preg_match_all('#<style>(.*?)</style>#s', $html, $st);
    $hashes = implode(' ', array_map(fn($s) => "'sha256-" . base64_encode(hash('sha256', $s, true)) . "'", array_unique($st[1])));
    http_response_code(200);
    header('Content-Type: text/html; charset=utf-8');
    header('Cache-Control: no-store, private');
    sicherheitsheader("default-src 'none'; img-src data:; style-src $hashes; font-src data:; script-src 'self'; base-uri 'none'; form-action 'none'; frame-ancestors 'none'; object-src 'none'", 'no-referrer');
    if ($m !== 'HEAD') echo $html;
    exit;
}

// ======================================================================
// 3. Widerrufsfunktion (§ 356a BGB): Schritt 1 Angaben, Schritt 2 „Widerruf bestätigen“
// ======================================================================

function widerruf(): never
{
    cfg();
    https_pruefen();
    nur_post('/vertrag-widerrufen/');
    if (!erlaube('widerruf:' . ip_limit_schluessel(), limit('widerruf_ip'))) fehler(429, 'Zu viele Versuche. Bitte widerrufen Sie per E-Mail an linus@roessler-immo.de; auch das wahrt die Frist.');

    $name = feld('name'); $email = feld('email'); $vorgang = strtoupper(feld('vorgang')); $slug = feld('objekt');
    $f = [];
    if ($e = pruefe_name($name)) $f['name'] = $e;
    if ($e = pruefe_email($email)) $f['email'] = $e;
    if ($vorgang !== '' && !vorgang_id_ok($vorgang)) $f['vorgang'] = 'Die Vorgangsnummer hat die Form EX-261103-1A2B3C4D. Wenn Sie sie nicht haben, lassen Sie das Feld leer.';
    $o = $slug !== '' ? objekt($slug) : null;
    if (!$o) $slug = '';
    if ($f) fehler(422, 'Bitte prüfen Sie Ihre Angaben.', $f);
    $email = adresse_normalisieren($email);

    $vertrag = $vorgang !== '' ? "Maklervertrag, Vorgang $vorgang" : ($o ? "Maklervertrag zum Objekt {$o['nummer']} ({$o['titel']})" : 'alle meine online geschlossenen Maklerverträge mit dieser E-Mail-Adresse');
    $erklaerung = "Hiermit widerrufe ich den von mir abgeschlossenen Vertrag über die Erbringung der folgenden Dienstleistung: $vertrag.";

    if (feld('schritt') !== '2') {
        $verborgen = '';
        foreach (['name' => $name, 'email' => $email, 'vorgang' => $vorgang, 'objekt' => $slug] as $k => $v) $verborgen .= '<input type="hidden" name="' . $k . '" value="' . h($v) . '">';
        seite(200, 'Widerruf bestätigen', '<p class="eyebrow">Widerruf · Schritt 2 von 2</p><h1>Bitte bestätigen Sie Ihren Widerruf</h1>'
            . '<table class="daten mt-20"><tbody>'
            . '<tr><th>Name</th><td>' . h($name) . '</td></tr>'
            . '<tr><th>Vertrag</th><td>' . h($vertrag) . '</td></tr>'
            . '<tr><th>Eingangsbestätigung an</th><td>' . h($email) . '</td></tr>'
            . '<tr><th>Ihre Erklärung</th><td>' . h($erklaerung) . '</td></tr>'
            . '</tbody></table>'
            . '<form method="post" action="/widerruf.php" class="mt-24"><input type="hidden" name="schritt" value="2">' . $verborgen
            . '<div class="hp" aria-hidden="true"><label for="w2-website">Bitte leer lassen</label><input id="w2-website" name="website" type="text" tabindex="-1" autocomplete="off"></div>'
            . '<button class="btn" type="submit">Widerruf bestätigen</button></form>'
            . '<p class="klein mt-14">Etwas falsch? Gehen Sie mit der Zurück-Taste zurück und korrigieren Sie die Angaben.</p>');
    }

    // Schritt 2: Widerruf ist abgegeben. Fristwahrung mit Absenden (§ 356a BGB).
    $jetzt = jetzt();
    $id = 'WR-' . $jetzt->format('ymd-His') . '-' . strtoupper(bin2hex(random_bytes(2)));
    $angaben = ['id' => $id, 'name' => $name, 'email' => $email, 'vorgang_angegeben' => $vorgang, 'objekt_angegeben' => $slug, 'erklaerung' => $erklaerung, 'user_agent' => user_agent()] + ip_nachweis();

    // Honeypot: ein echter Widerruf darf nie verloren gehen. Deshalb protokollieren statt verwerfen,
    // aber ohne Mail und ohne Sperre; Linus sieht den Eintrag in der Übersicht.
    if (feld('website') !== '') {
        nachweis('widerruf_verdacht', null, $angaben + ['grund' => 'honeypot']);
        log_zeile('widerruf', 'spamverdacht');
        seite(200, 'Widerruf eingegangen', '<h1>Ihr Widerruf ist eingegangen</h1><p class="lede">Eingang am ' . h($jetzt->format('d.m.Y')) . ' um ' . h($jetzt->format('H:i:s')) . ' Uhr.</p>');
    }
    if (!erlaube('widerruf-mail:' . email_hash($email), limit('widerruf_email'))) fehler(429, 'Für diese E-Mail-Adresse liegen heute schon mehrere Widerrufe vor. Bitte widerrufen Sie per E-Mail an linus@roessler-immo.de; auch das wahrt die Frist.');

    $betroffen = mit_sperre('vorgaenge', function () use ($email, $vorgang, $slug, $jetzt) {
        $r = [];
        foreach (vorgaenge_alle() as $vg) {
            if (!hash_equals(mb_strtolower($vg['email']), mb_strtolower($email))) continue;
            if ($vorgang !== '' && $vg['vorgang'] !== $vorgang) continue;
            if ($vorgang === '' && $slug !== '' && $vg['objekt'] !== $slug) continue;
            if (empty($vg['widerrufen'])) { $vg['widerrufen'] = true; $vg['widerrufen_am'] = $jetzt->format(DATE_ATOM); vorgang_speichern($vg); }
            $r[] = $vg['vorgang'];
        }
        return $r;
    });
    $nw = nachweis('widerruf', $betroffen[0] ?? null, $angaben + ['gesperrt' => $betroffen]);

    $text = "Guten Tag $name,\n\nIhr Widerruf ist bei mir eingegangen.\n\n"
        . 'Eingang:        ' . $jetzt->format('d.m.Y') . ' um ' . $jetzt->format('H:i:s') . " Uhr\n"
        . "Name:           $name\nVertrag:        $vertrag\nBestätigung an: $email\nEingangsnummer: $id\n\n"
        . "Inhalt Ihrer Widerrufserklärung:\n„{$erklaerung}“\n\n"
        . "Diese E-Mail bestätigt nur den Eingang. Den Link zum Exposé habe ich für die betroffenen Verträge gesperrt"
        . ($betroffen ? ' (' . implode(', ', $betroffen) . ')' : '') . ". Ich melde mich, falls ich Ihren Vertrag nicht zuordnen kann.\n\n"
        . "Protokolleintrag Nr. {$nw['seq']}, Prüfwert (SHA-256): {$nw['hash']}\n\n" . gruss() . "\n";
    $mail = null; $mf = null;
    try { $mail = mail_senden($email, 'Eingangsbestätigung Ihres Widerrufs (' . $id . ')', $text, null, 'widerruf'); } catch (\Throwable $ex) { $mf = $ex->getMessage(); }
    nachweis('eingangsbestaetigung', $betroffen[0] ?? null, $mail
        ? array_merge(['widerruf' => $id, 'an' => $email, 'message_id' => $mail['message_id'], 'sha256_text' => $mail['sha256_text'], 'server' => $mail['antwort']], mail_ablegen($id, $mail))
        : ['widerruf' => $id, 'an' => $email, 'fehler' => mb_substr((string)$mf, 0, 200)]);
    try {
        mail_senden(cfg()['mail']['an_linus'], "[Widerruf] $name · " . ($betroffen ? implode(', ', $betroffen) : 'NICHT ZUGEORDNET'),
            "Widerruf eingegangen am " . $jetzt->format('d.m.Y H:i:s') . "\n\nName: $name\nE-Mail: $email\nAngaben: $vertrag\nGesperrt: " . ($betroffen ? implode(', ', $betroffen) : 'keine Zuordnung, bitte prüfen') . "\nEingangsbestätigung: " . ($mail ? 'gesendet' : 'FEHLER, bitte selbst bestätigen') . "\nNachweis: Eintrag Nr. {$nw['seq']}\n", $email, 'linus');
    } catch (\Throwable) { log_zeile('widerruf', 'mail:linus-fehler'); }
    log_zeile('widerruf', 'ok ' . count($betroffen));
    seite(200, 'Widerruf eingegangen', '<h1>Ihr Widerruf ist eingegangen</h1>'
        . '<p class="lede">Eingang am ' . h($jetzt->format('d.m.Y')) . ' um ' . h($jetzt->format('H:i:s')) . ' Uhr. '
        . ($mail ? 'Eine Eingangsbestätigung mit diesem Inhalt ist an ' . h($email) . ' unterwegs.' : 'Die Eingangsbestätigung per E-Mail konnte nicht gesendet werden; bitte speichern oder drucken Sie diese Seite.') . '</p>'
        . '<table class="daten mt-20"><tbody><tr><th>Eingangsnummer</th><td>' . h($id) . '</td></tr><tr><th>Name</th><td>' . h($name) . '</td></tr><tr><th>Vertrag</th><td>' . h($vertrag) . '</td></tr><tr><th>Ihre Erklärung</th><td>' . h($erklaerung) . '</td></tr></tbody></table>'
        . '<p class="klein mt-14">Diese Bestätigung betrifft den Eingang, nicht die rechtliche Prüfung.</p>');
}

// ======================================================================
// 4. Manuelle Freigabe durch Linus (Link aus der Mail oder Admin-Übersicht)
// ======================================================================

/** Gibt einen Vorgang frei und schickt den Link. Rückgabe: ['status' => ok|schon|widerrufen|fehlt|mailfehler, 'vg' => …] */
function freigeben(string $v, string $durch): array
{
    $jetzt = jetzt();
    $status = 'ok';
    $vg = vorgang_aendern($v, function (array $vg) use ($jetzt, &$status) {
        if (!empty($vg['widerrufen'])) { $status = 'widerrufen'; return null; }
        if (!empty($vg['freigegeben'])) { $status = 'schon'; return null; }
        $o = objekt($vg['objekt']);
        $vg['bis'] = max((int)$vg['ab'], $jetzt->getTimestamp()) + 86400 * (int)($o['freigabe']['link_gueltig_tage'] ?? 30);
        $vg['freigegeben'] = true; $vg['freigegeben_am'] = $jetzt->format(DATE_ATOM);
        return $vg;
    });
    if (!$vg) return ['status' => 'fehlt', 'vg' => null];
    if ($status !== 'ok') return ['status' => $status, 'vg' => $vg];
    $link = expose_link(token_erzeugen($vg['vorgang'], $vg['objekt'], (int)$vg['ab'], (int)$vg['bis'], (int)($vg['token_nr'] ?? 1)));
    $text = "Guten Tag {$vg['name']},\n\nhier ist Ihr persönlicher Link zum vollständigen Exposé „{$vg['titel']}“:\n$link\n\n"
        . ($vg['beginn'] === 'nach_frist' ? 'Wie gewünscht funktioniert er ab ' . fmt((int)$vg['ab'], 'd.m.Y') . ' (nach Ablauf der Widerrufsfrist), dann bis ' . fmt((int)$vg['bis'], 'd.m.Y') . ".\n" : 'Er gilt bis ' . fmt((int)$vg['bis'], 'd.m.Y') . ".\n")
        . "Bitte geben Sie ihn nicht weiter.\n\nVertrag widerrufen: " . cfg()['basis_url'] . "/vertrag-widerrufen/ (Vorgang {$vg['vorgang']})\n\n" . gruss() . "\n";
    try { $m = mail_senden($vg['email'], 'Ihr Exposé: ' . $vg['titel'] . " (Vorgang {$vg['vorgang']})", $text, null, 'freigabe'); }
    catch (\Throwable $ex) {
        nachweis('freigabe', $vg['vorgang'], ['durch' => $durch, 'fehler' => mb_substr($ex->getMessage(), 0, 200)], $jetzt);
        log_zeile('freigabe', 'mail:fehler');
        return ['status' => 'mailfehler', 'vg' => $vg];
    }
    nachweis('freigabe', $vg['vorgang'], array_merge(['durch' => $durch, 'ab' => date(DATE_ATOM, (int)$vg['ab']), 'bis' => date(DATE_ATOM, (int)$vg['bis']), 'message_id' => $m['message_id'], 'sha256_text' => $m['sha256_text']], mail_ablegen($vg['vorgang'] . '-freigabe', $m)), $jetzt);
    log_zeile('freigabe', 'ok');
    return ['status' => 'ok', 'vg' => $vg];
}

function vorgang_info_html(array $vg): string
{
    return '<table class="daten"><tbody><tr><th>Objekt</th><td>' . h($vg['nummer'] . ' · ' . $vg['titel']) . '</td></tr><tr><th>Interessent</th><td>' . h($vg['name']) . ', ' . h($vg['email']) . ', ' . h($vg['telefon'] ?: '–') . '</td></tr><tr><th>Exposé</th><td>' . ($vg['beginn'] === 'sofort' ? 'sofort' : 'nach Frist, ab ' . h(fmt((int)$vg['ab'], 'd.m.Y'))) . '</td></tr><tr><th>Status</th><td>' . h(vorgang_status($vg)) . '</td></tr></tbody></table>';
}

function vorgang_status(array $vg): string
{
    if (!empty($vg['widerrufen'])) return 'WIDERRUFEN am ' . fmt(new \DateTimeImmutable($vg['widerrufen_am'] ?? 'now'));
    if (!empty($vg['gesperrt'])) return 'Link gesperrt';
    if (empty($vg['freigegeben'])) return 'wartet auf Freigabe';
    if (time() > (int)$vg['bis']) return 'Link abgelaufen';
    if (time() < (int)$vg['ab']) return 'freigegeben ab ' . fmt((int)$vg['ab'], 'd.m.Y');
    return 'freigegeben';
}

function freigabe(): never
{
    cfg();
    https_pruefen();
    $quelle = ($_SERVER['REQUEST_METHOD'] ?? 'GET') === 'POST' ? $_POST : $_GET;
    $v = is_string($quelle['v'] ?? null) ? $quelle['v'] : '';
    $s = is_string($quelle['s'] ?? null) ? $quelle['s'] : '';
    $e = is_string($quelle['e'] ?? null) && ctype_digit($quelle['e']) && strlen($quelle['e']) < 12 ? (int)$quelle['e'] : 0;
    // Signatur zuerst prüfen (konstante Zeit), dann erst die Datei anfassen: keine Auskunft über existierende Vorgänge
    if (!vorgang_id_ok($v) || !hash_equals(freigabe_sig($v, $e), $s) || $e < time()) {
        token_fehlversuch('freigabe');
        seite(404, 'Ungültig', '<h1>Freigabe-Link ungültig oder abgelaufen</h1><p class="lede">Freigeben können Sie auch in der Übersicht.</p>');
    }
    $vg = vorgang_laden($v);
    if (!$vg) seite(404, 'Ungültig', '<h1>Freigabe-Link ungültig</h1>');
    if (($_SERVER['REQUEST_METHOD'] ?? 'GET') !== 'POST') {
        // GET zeigt nur an; erst POST gibt frei (Link-Vorschauen von Mailprogrammen lösen nichts aus)
        seite(200, 'Freigabe', '<h1>Exposé freigeben?</h1>' . vorgang_info_html($vg) . (empty($vg['widerrufen']) && empty($vg['freigegeben'])
            ? '<form method="post" action="/freigabe.php" class="mt-22"><input type="hidden" name="v" value="' . h($v) . '"><input type="hidden" name="e" value="' . h((string)$e) . '"><input type="hidden" name="s" value="' . h($s) . '"><button class="btn" type="submit">Exposé jetzt freigeben</button></form>' : ''));
    }
    nur_post('/');
    $r = freigeben($v, 'mail-link');
    $info = vorgang_info_html($r['vg'] ?? $vg);
    match ($r['status']) {
        'widerrufen' => seite(409, 'Widerrufen', '<h1>Nicht freigegeben: Vertrag widerrufen</h1>' . $info),
        'schon' => seite(200, 'Schon freigegeben', '<h1>Schon freigegeben</h1>' . $info),
        'mailfehler' => seite(500, 'Fehler', '<h1>Freigegeben, aber die Mail an den Interessenten ist fehlgeschlagen</h1><p class="lede">Bitte den Link aus der Übersicht selbst schicken oder anrufen.</p>' . $info),
        'fehlt' => seite(404, 'Ungültig', '<h1>Vorgang nicht gefunden</h1>'),
        default => seite(200, 'Freigegeben', '<h1>Freigegeben</h1><p class="lede">Der Link ist an ' . h($r['vg']['email']) . ' unterwegs.</p>' . $info),
    };
}
