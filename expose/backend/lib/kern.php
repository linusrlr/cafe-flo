<?php
// Exposé-Freigabe: Vertragsschluss mit Nachweisprotokoll, Freigabe-Links, Widerrufsfunktion (§ 356a BGB).
// Keine Datenbank, keine Cookies, keine Sitzung. Rechtliche Grundlagen: recherche/expose/recherche.md.
// [ENTWURF: Ablauf und Texte vor Einsatz anwaltlich prüfen lassen.]
declare(strict_types=1);

namespace Expose;

const BACKEND = __DIR__ . '/..';

// ======================================================================
// Grundlagen
// ======================================================================

function cfg(): array
{
    static $c = null;
    if ($c !== null) return $c;
    $p = getenv('EXPOSE_CONFIG') ?: BACKEND . '/config.php';
    if (!is_file($p)) { http_response_code(500); exit('Konfiguration fehlt (expose-backend/config.php).'); }
    $c = require $p;
    if (strlen((string)($c['geheim'] ?? '')) < 32 || str_contains($c['geheim'], 'HIER-')) {
        http_response_code(500); exit('Konfiguration: geheim fehlt oder zu kurz.');
    }
    date_default_timezone_set($c['zeitzone'] ?? 'Europe/Berlin');
    foreach (['', '/nachweise', '/nachweise/mails', '/vorgaenge', '/widerrufe', '/zugriffe', '/ratelimit', '/log'] as $d) {
        $dir = $c['daten'] . $d;
        if (!is_dir($dir)) mkdir($dir, 0700, true);
    }
    return $c;
}

function daten(string $rel): string { return cfg()['daten'] . '/' . $rel; }

function schluessel(string $zweck): string { return hash_hmac('sha256', $zweck, cfg()['geheim'], true); }

function b64u(string $s): string { return rtrim(strtr(base64_encode($s), '+/', '-_'), '='); }
function b64u_dec(string $s): string|false { return base64_decode(strtr($s, '-_', '+/'), true); }

function h(?string $s): string { return htmlspecialchars((string)$s, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8'); }

function jetzt(): \DateTimeImmutable { return new \DateTimeImmutable('now'); }

function fmt(\DateTimeInterface|int $t, string $f = 'd.m.Y H:i'): string
{
    if (is_int($t)) $t = (new \DateTimeImmutable('@' . $t))->setTimezone(new \DateTimeZone(date_default_timezone_get()));
    return $t->format($f);
}

function will_json(): bool { return str_contains($_SERVER['HTTP_ACCEPT'] ?? '', 'application/json'); }

function objekt(string $slug): ?array
{
    if (!preg_match('/^[a-z0-9]+(?:-[a-z0-9]+)*$/', $slug)) return null;
    $p = BACKEND . "/objekte/$slug.json";
    if (!is_file($p)) return null;
    return json_decode((string)file_get_contents($p), true, 512, JSON_THROW_ON_ERROR);
}

function anhaengen(string $datei, array $zeile): void
{
    $fh = fopen($datei, 'ab');
    if (!$fh) throw new \RuntimeException("nicht schreibbar: $datei");
    flock($fh, LOCK_EX);
    fwrite($fh, json_encode($zeile, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES) . "\n");
    fflush($fh); flock($fh, LOCK_UN); fclose($fh);
    @chmod($datei, 0600);
}

function log_zeile(string $was, string $ergebnis): void
{
    // Betriebslog ohne Personendaten
    @file_put_contents(daten('log/expose-' . date('Y-m') . '.log'), date('c') . " $was $ergebnis\n", FILE_APPEND | LOCK_EX);
}

// ---------- IP: gekürzt und/oder HMAC (recherche.md 1.5) ----------
function ip_roh(): string { return (string)($_SERVER['REMOTE_ADDR'] ?? ''); }
function ip_gekuerzt(string $ip): string
{
    $bin = @inet_pton($ip);
    if ($bin === false) return '';
    if (strlen($bin) === 4) return implode('.', array_slice(explode('.', $ip), 0, 3)) . '.0';
    return inet_ntop(substr($bin, 0, 6) . str_repeat("\0", 10)) . '/48';
}
function ip_nachweis(): array
{
    $m = cfg()['ip_modus'] ?? 'gekuerzt+hmac';
    $ip = ip_roh();
    if ($m === 'keine') return [];
    $r = ['ip_gekuerzt' => ip_gekuerzt($ip)];
    if ($m === 'gekuerzt+hmac') $r['ip_hmac'] = hash_hmac('sha256', $ip, schluessel('ip-nachweis'));
    return $r;
}

// ---------- Rate-Limit (dateibasiert, nur HMAC-Schlüssel) ----------
function erlaube(string $schluessel, array $grenzen): bool
{
    $datei = daten('ratelimit/' . hash_hmac('sha256', $schluessel, schluessel('ratelimit')) . '.json');
    $fh = fopen($datei, 'c+');
    if (!$fh) return true;
    flock($fh, LOCK_EX);
    $zeiten = json_decode((string)stream_get_contents($fh), true) ?: [];
    $t = time();
    $max = max(array_map(fn($g) => $g[1], $grenzen));
    $zeiten = array_values(array_filter($zeiten, fn($z) => $z > $t - $max));
    foreach ($grenzen as [$anzahl, $sek]) {
        if (count(array_filter($zeiten, fn($z) => $z > $t - $sek)) >= $anzahl) { flock($fh, LOCK_UN); fclose($fh); return false; }
    }
    $zeiten[] = $t;
    ftruncate($fh, 0); rewind($fh); fwrite($fh, json_encode($zeiten)); fflush($fh);
    flock($fh, LOCK_UN); fclose($fh);
    if (random_int(1, 50) === 1) aufraeumen();
    return true;
}
function aufraeumen(): void
{
    foreach (glob(daten('ratelimit/*.json')) ?: [] as $f) if (filemtime($f) < time() - 86400) @unlink($f);
}

// ======================================================================
// Antworten
// ======================================================================

function seite(int $status, string $titel, string $inhalt): never
{
    http_response_code($status);
    header('Content-Type: text/html; charset=utf-8');
    header('Cache-Control: no-store');
    header('X-Robots-Tag: noindex, nofollow');
    $vorlage = (string)@file_get_contents(BACKEND . '/vorlagen/seite.html');
    if ($vorlage === '') $vorlage = '<!doctype html><meta charset="utf-8"><title><!--TITEL--></title><!--INHALT-->';
    echo str_replace(['<!--TITEL-->', '<!--INHALT-->'], [h($titel), $inhalt], $vorlage);
    exit;
}

function json(int $status, array $daten): never
{
    http_response_code($status);
    header('Content-Type: application/json; charset=utf-8');
    header('Cache-Control: no-store');
    echo json_encode($daten, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    exit;
}

function weiter(string $url): never
{
    if (will_json()) json(200, ['ok' => true, 'weiter' => $url]);
    http_response_code(303);
    header('Location: ' . $url);
    header('Cache-Control: no-store');
    exit;
}

function fehler(int $status, string $meldung, array $felder = []): never
{
    if (will_json()) json($status, ['ok' => false, 'meldung' => $meldung, 'fehler' => (object)$felder]);
    $liste = '';
    foreach ($felder as $k => $m) $liste .= '<li>' . h($m) . '</li>';
    $tel = h(firma_telefon());
    seite($status, 'Bitte prüfen', '<h1>Bitte prüfen Sie Ihre Angaben</h1><p class="lede">' . h($meldung) . '</p>'
        . ($liste ? "<ul>$liste</ul>" : '')
        . '<p>Gehen Sie mit der Zurück-Taste Ihres Browsers zum Formular; Ihre Eingaben sind dort meist noch vorhanden.</p>'
        . "<p>Oder rufen Sie mich an: $tel.</p>");
}

function firma_telefon(): string { return '0159 05844641'; }

function nur_post(string $zurueck): void
{
    $m = $_SERVER['REQUEST_METHOD'] ?? 'GET';
    if ($m === 'GET' || $m === 'HEAD') { header('Location: ' . $zurueck, true, 303); exit; }
    if ($m !== 'POST') { header('Allow: POST'); http_response_code(405); exit; }
    $typ = $_SERVER['CONTENT_TYPE'] ?? '';
    if (!str_starts_with($typ, 'application/x-www-form-urlencoded') && !str_starts_with($typ, 'multipart/form-data')) { http_response_code(415); exit; }
    if ((int)($_SERVER['CONTENT_LENGTH'] ?? 0) > 65536) { http_response_code(413); exit; }
    $origin = $_SERVER['HTTP_ORIGIN'] ?? '';
    if ($origin !== '' && !in_array($origin, (array)cfg()['origin'], true)) fehler(403, 'Die Anfrage kam nicht von roessler-immo.de.');
}

// ======================================================================
// Validierung
// ======================================================================

function feld(string $n, int $max = 300): string
{
    $v = $_POST[$n] ?? '';
    if (!is_string($v)) return '';
    $v = preg_replace('/[\x00-\x1F\x7F]/u', ' ', $v) ?? '';
    if (class_exists(\Normalizer::class)) $v = \Normalizer::normalize($v, \Normalizer::FORM_C) ?: $v;
    $v = trim(preg_replace('/\s+/u', ' ', $v) ?? '');
    return mb_substr($v, 0, $max);
}

function pruefe_name(string $v): ?string
{
    if ($v === '') return 'Bitte geben Sie Ihren Vor- und Nachnamen an.';
    if (!preg_match("/^\\p{L}[\\p{L}\\p{M} .'\\-]{1,79}$/u", $v)) return 'Bitte nur Buchstaben, Leerzeichen, Bindestrich und Apostroph (2 bis 80 Zeichen).';
    return null;
}
function pruefe_email(string $v): ?string
{
    if ($v === '') return 'Bitte geben Sie Ihre E-Mail-Adresse an.';
    if (strlen($v) > 254 || !filter_var($v, FILTER_VALIDATE_EMAIL)) return 'Bitte prüfen Sie die E-Mail-Adresse, zum Beispiel name@beispiel.de.';
    return null;
}
function pruefe_telefon(string $v): ?string
{
    if ($v === '') return null;
    if (!preg_match('/^[0-9 +()\/\-]{6,30}$/', $v) || preg_match_all('/\d/', $v) < 6) return 'Bitte prüfen Sie die Telefonnummer. Erlaubt sind Ziffern, Leerzeichen und + ( ) / -.';
    return null;
}

function email_hash(string $email): string { return hash_hmac('sha256', mb_strtolower(trim($email)), schluessel('email')); }

// ======================================================================
// Token für den Exposé-Link: signiert, zeitlich begrenzt, nicht ratbar
// ======================================================================

function token_erzeugen(string $vorgang, string $slug, int $ab, int $bis): string
{
    $p = b64u(json_encode(['v' => $vorgang, 'o' => $slug, 'ab' => $ab, 'bis' => $bis], JSON_UNESCAPED_SLASHES));
    return $p . '.' . b64u(hash_hmac('sha256', $p, schluessel('token'), true));
}

function token_pruefen(string $t): ?array
{
    if (!preg_match('/^[A-Za-z0-9_-]{20,400}\.[A-Za-z0-9_-]{43}$/', $t)) return null;
    [$p, $sig] = explode('.', $t, 2);
    $soll = b64u(hash_hmac('sha256', $p, schluessel('token'), true));
    if (!hash_equals($soll, $sig)) return null;
    $d = json_decode((string)b64u_dec($p), true);
    return is_array($d) && isset($d['v'], $d['o'], $d['ab'], $d['bis']) ? $d : null;
}

function freigabe_sig(string $vorgang): string { return b64u(hash_hmac('sha256', 'freigabe|' . $vorgang, schluessel('freigabe'), true)); }

function vorgang_datei(string $v): string
{
    if (!preg_match('/^EX-\d{6}-[0-9A-F]{8}$/', $v)) throw new \InvalidArgumentException('Vorgangsnummer ungültig');
    return daten("vorgaenge/$v.json");
}
function vorgang_laden(string $v): ?array
{
    try { $p = vorgang_datei($v); } catch (\InvalidArgumentException) { return null; }
    return is_file($p) ? json_decode((string)file_get_contents($p), true) : null;
}
function vorgang_speichern(array $d): void
{
    $p = vorgang_datei($d['vorgang']);
    file_put_contents($p, json_encode($d, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT), LOCK_EX);
    @chmod($p, 0600);
}

function expose_link(string $token): string { return rtrim(cfg()['basis_url'], '/') . '/expose.php?t=' . $token; }

// ======================================================================
// Mail
// ======================================================================

function mail_senden(string $an, string $betreff, string $text, ?string $antwortAn = null, string $art = 'mail'): array
{
    $m = cfg()['mail'];
    $id = sprintf('<%s.%s@%s>', date('YmdHis'), bin2hex(random_bytes(6)), parse_url(cfg()['basis_url'], PHP_URL_HOST) ?: 'localhost');
    $from = sprintf('%s <%s>', mb_encode_mimeheader($m['absender_name'], 'UTF-8', 'Q'), $m['absender']);
    $kopf = [
        'Date' => date(DATE_RFC2822),
        'From' => $from,
        'To' => $an,
        'Reply-To' => $antwortAn ?? $m['antwort_an'],
        'Subject' => mb_encode_mimeheader($betreff, 'UTF-8', 'Q'),
        'Message-ID' => $id,
        'MIME-Version' => '1.0',
        'Content-Type' => 'text/plain; charset=UTF-8',
        'Content-Transfer-Encoding' => 'quoted-printable',
    ];
    if (preg_match('/[\r\n]/', $an . $betreff . ($antwortAn ?? ''))) throw new \RuntimeException('Header-Injektion');
    $koerper = quoted_printable_encode(str_replace("\n", "\r\n", $text));
    $eml = '';
    foreach ($kopf as $k => $v) $eml .= "$k: $v\r\n";
    $eml .= "\r\n" . $koerper . "\r\n";

    switch ($m['transport']) {
        case 'datei':
            $dir = daten('test-mails');
            if (!is_dir($dir)) mkdir($dir, 0700, true);
            file_put_contents($dir . '/' . date('Ymd-His') . '-' . substr(md5($id), 0, 6) . "-$art.eml", $eml);
            break;
        case 'mail':
            $h = $kopf; unset($h['To'], $h['Subject']);
            $hz = ''; foreach ($h as $k => $v) $hz .= "$k: $v\r\n";
            if (!mail($an, $kopf['Subject'], $koerper, rtrim($hz), '-f' . $m['absender'])) throw new \RuntimeException('mail() fehlgeschlagen');
            break;
        case 'smtp':
            require_once $m['phpmailer_autoload'];
            $pm = new \PHPMailer\PHPMailer\PHPMailer(true);
            $pm->isSMTP(); $pm->Host = $m['smtp']['host']; $pm->Port = $m['smtp']['port']; $pm->SMTPAuth = true;
            $pm->Username = $m['smtp']['user']; $pm->Password = $m['smtp']['pass']; $pm->SMTPSecure = $m['smtp']['secure'];
            $pm->CharSet = 'UTF-8'; $pm->Encoding = 'quoted-printable'; $pm->MessageID = $id;
            $pm->setFrom($m['absender'], $m['absender_name']); $pm->Sender = $m['absender'];
            $pm->addAddress($an); $pm->addReplyTo($antwortAn ?? $m['antwort_an']);
            $pm->Subject = $betreff; $pm->Body = $text; $pm->isHTML(false);
            $pm->send();
            break;
        default:
            throw new \RuntimeException('Mail-Transport unbekannt');
    }
    return ['message_id' => $id, 'sha256_text' => hash('sha256', $text), 'eml' => $eml];
}

function gruss(): string
{
    $b = rtrim(cfg()['basis_url'], '/');
    return "Viele Grüße\nLinus Rössler\nRössler Immobilien · " . preg_replace('#^https?://#', '', $b) . ' · Telefon ' . firma_telefon();
}

function trenner(string $titel): string { return "\n\n" . str_repeat('=', 76) . "\n" . mb_strtoupper($titel) . "\n" . str_repeat('=', 76) . "\n\n"; }

// ======================================================================
// 1. Anfrage: Vertragsschluss und Exposé-Freigabe
// ======================================================================

function anfrage(): never
{
    cfg();
    $start = microtime(true);
    nur_post('/');
    $slug = feld('objekt', 80);
    $o = objekt($slug);
    if (!$o || in_array($o['status'], ['reserviert', 'verkauft'], true)) { log_zeile('anfrage', 'fehler:objekt'); fehler(404, 'Dieses Objekt ist nicht (mehr) verfügbar.'); }

    if (!erlaube('ip:' . ip_roh(), cfg()['limits']['ip'] ?? [[5, 600], [20, 86400]])) {
        log_zeile('anfrage', 'limit:ip');
        header('Retry-After: 600');
        fehler(429, 'Sie haben in kurzer Zeit mehrere Anfragen gesendet. Bitte rufen Sie mich an: ' . firma_telefon() . '.');
    }

    // Spam: scheinbarer Erfolg, kein Vertrag, keine Mail
    $t = feld('t', 12); $js = feld('js', 2);
    if (feld('website') !== '' || ($js === '1' && $t !== '' && (int)$t < 4000)) {
        log_zeile('anfrage', 'spam');
        weiter($o['urls']['danke']['frist']);
    }

    if (feld('fassung', 80) !== $o['fassung']) {
        log_zeile('anfrage', 'fehler:fassung');
        fehler(409, 'Die Vertragstexte wurden inzwischen aktualisiert. Bitte laden Sie die Seite neu und bestätigen Sie die Erklärungen noch einmal.');
    }

    $name = feld('name', 80); $email = feld('email', 254); $tel = feld('telefon', 30);
    $f = [];
    if ($e = pruefe_name($name)) $f['name'] = $e;
    if ($e = pruefe_email($email)) $f['email'] = $e;
    if ($e = pruefe_telefon($tel)) $f['telefon'] = $e;

    $mitVertrag = (bool)$o['mit_maklervertrag'];
    $beginn = $mitVertrag ? feld('beginn', 20) : 'sofort';
    if ($mitVertrag && !in_array($beginn, $o['beginn_optionen'], true)) $f['beginn'] = 'Bitte wählen Sie, wann Sie das Exposé erhalten möchten.';

    $gesetzt = is_array($_POST['erklaerung'] ?? null) ? $_POST['erklaerung'] : [];
    $erklaerungen = [];
    foreach ($o['erklaerungen'] as $e) {
        $noetig = $e['wann'] === 'immer' || ($e['wann'] === 'sofort' && $beginn === 'sofort');
        $ja = ($gesetzt[$e['id']] ?? '') === '1';
        if ($noetig && !$ja) $f["erklaerung[{$e['id']}]"] = 'Bitte bestätigen Sie diese Erklärung, sonst kann ich das Exposé nicht freigeben.';
        if ($noetig && $ja) $erklaerungen[] = ['id' => $e['id'], 'version' => $e['version'], 'sha256' => $e['sha256'], 'text' => $e['text'], 'bestaetigt' => true];
    }
    if ($f) { log_zeile('anfrage', 'fehler:validierung'); fehler(422, 'Bitte prüfen Sie die markierten Angaben.', $f); }

    if (!erlaube('mail:' . email_hash($email) . ':' . $slug, cfg()['limits']['email'] ?? [[3, 86400]])) {
        log_zeile('anfrage', 'limit:email');
        fehler(429, 'Für diese E-Mail-Adresse liegen heute schon mehrere Anfragen zu diesem Objekt vor. Bitte schauen Sie in Ihr Postfach oder rufen Sie mich an: ' . firma_telefon() . '.');
    }

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
        'name' => $name, 'email' => $email, 'email_hash' => email_hash($email), 'telefon' => $tel,
        'beginn' => $beginn, 'modus' => $modus, 'vertrag' => $jetzt->format(DATE_ATOM),
        'widerrufsfrist_ende' => $fristEnde->format(DATE_ATOM),
        'ab' => $ab, 'bis' => $bis, 'freigegeben' => $modus === 'automatisch', 'freigegeben_am' => $modus === 'automatisch' ? $jetzt->format(DATE_ATOM) : null,
        'widerrufen' => false, 'abrufe' => 0, 'muster' => $o['muster'],
    ];
    vorgang_speichern($vg);
    $link = $modus === 'automatisch' ? expose_link(token_erzeugen($vorgang, $slug, $ab, $bis)) : null;

    // ---- E-Mail an den Interessenten: Vertragsbestätigung auf dauerhaftem Datenträger ----
    $text = mail_interessent($o, $vg, $erklaerungen, $link, $jetzt);
    $betreff = ($mitVertrag ? 'Ihr Maklervertrag und Exposé: ' : 'Ihr Exposé: ') . $o['titel'] . " (Vorgang $vorgang)";
    $mailI = null; $mailFehler = null;
    try { $mailI = mail_senden($email, $betreff, $text, null, 'interessent'); }
    catch (\Throwable $ex) { $mailFehler = $ex->getMessage(); }
    if ($mailI) { file_put_contents(daten("nachweise/mails/$vorgang-interessent.eml"), $mailI['eml']); @chmod(daten("nachweise/mails/$vorgang-interessent.eml"), 0600); }

    // ---- Nachweisprotokoll ----
    $nachweis = [
        'typ' => 'vertragsschluss', 'vorgang' => $vorgang, 'zeit' => $jetzt->format(DATE_ATOM), 'zeit_utc' => gmdate('c', $jetzt->getTimestamp()),
        'objekt' => ['slug' => $slug, 'nummer' => $o['nummer'], 'titel' => $o['titel'], 'muster' => $o['muster']],
        'person' => ['name' => $name, 'email' => $email, 'telefon' => $tel],
        'maklervertrag' => $mitVertrag, 'beginn' => $beginn, 'fassung' => $o['fassung'],
        'erklaerungen' => $erklaerungen,
        'nicht_abgegeben' => array_values(array_map(fn($e) => $e['id'], array_filter($o['erklaerungen'], fn($e) => !in_array($e['id'], array_column($erklaerungen, 'id'), true)))),
        'rechtstexte' => array_map(fn($r) => ['version' => $r['version'], 'sha256' => $r['sha256']], $o['rechtstexte']),
        'schaltflaeche' => $mitVertrag ? $o['freigabe']['button_text'] : 'Exposé anfordern',
        'provision' => $o['provision'],
        'freigabe' => ['modus' => $modus, 'ab' => date(DATE_ATOM, $ab), 'bis' => date(DATE_ATOM, $bis)],
        'mail_interessent' => $mailI ? ['an' => $email, 'message_id' => $mailI['message_id'], 'sha256_text' => $mailI['sha256_text'], 'kopie' => "nachweise/mails/$vorgang-interessent.eml"] : ['fehler' => $mailFehler],
        'technik' => array_merge(['user_agent' => mb_substr((string)($_SERVER['HTTP_USER_AGENT'] ?? ''), 0, 300), 'seite' => mb_substr((string)($_SERVER['HTTP_REFERER'] ?? ''), 0, 200), 'javascript' => $js === '1', 'formular_ms' => $t === '' ? null : (int)$t], ip_nachweis()),
    ];
    anhaengen(daten('nachweise/' . $jetzt->format('Y-m') . '.jsonl'), $nachweis);

    // ---- E-Mail an Linus ----
    try { mail_senden(cfg()['mail']['an_linus'], mail_linus_betreff($o, $vg), mail_linus($o, $vg, $mailFehler), $email, 'linus'); }
    catch (\Throwable) { log_zeile('anfrage', 'mail:linus-fehler'); }

    if ($mailFehler) {
        log_zeile('anfrage', 'mail:fehler');
        fehler(500, 'Die Bestätigungs-E-Mail konnte nicht gesendet werden. Bitte rufen Sie mich an: ' . firma_telefon() . ' oder schreiben Sie an linus@roessler-immo.de. Vorgang: ' . $vorgang);
    }
    log_zeile('anfrage', sprintf('ok %s %dms', $beginn, (int)((microtime(true) - $start) * 1000)));
    $fall = $modus === 'manuell' ? 'manuell' : ($beginn === 'sofort' ? 'sofort' : 'frist');
    weiter($o['urls']['danke'][$fall]);
}

function mail_interessent(array $o, array $vg, array $erklaerungen, ?string $link, \DateTimeImmutable $jetzt): string
{
    $b = rtrim(cfg()['basis_url'], '/');
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

function mail_linus(array $o, array $vg, ?string $mailFehler): string
{
    $b = rtrim(cfg()['basis_url'], '/');
    $t = "Neue Exposé-Anforderung\n\n";
    $t .= "Objekt:    {$o['nummer']} · {$o['titel']}\n";
    $t .= "Name:      {$vg['name']}\nE-Mail:    {$vg['email']}\nTelefon:   " . ($vg['telefon'] ?: '–') . "\n";
    $t .= 'Exposé:    ' . ($vg['beginn'] === 'sofort' ? 'sofort (vorzeitiger Beginn verlangt, Wertersatz-Hinweis bestätigt)' : 'nach Ablauf der Widerrufsfrist, ab ' . fmt($vg['ab'], 'd.m.Y')) . "\n";
    $t .= "Vorgang:   {$vg['vorgang']}\nVertrag:   " . fmt(new \DateTimeImmutable($vg['vertrag'])) . " Uhr\n";
    $t .= 'Widerrufsfrist bis: ' . (new \DateTimeImmutable($vg['widerrufsfrist_ende']))->format('d.m.Y') . "\n";
    if ($vg['modus'] === 'manuell') {
        $t .= "\nFREIGABE: Bitte prüfen und freigeben:\n$b/freigabe.php?v={$vg['vorgang']}&s=" . freigabe_sig($vg['vorgang']) . "\n";
    } else {
        $t .= "\nFreigabe: automatisch\n";
    }
    if ($mailFehler) $t .= "\nACHTUNG: Bestätigungs-E-Mail an den Interessenten ist FEHLGESCHLAGEN ($mailFehler). Bitte anrufen.\n";
    $t .= "\nNachweis: expose-daten/nachweise/" . date('Y-m') . ".jsonl, E-Mail-Kopie: nachweise/mails/{$vg['vorgang']}-interessent.eml\n";
    $t .= "GwG: Identifizierung erst bei ernsthaftem Kaufinteresse (spätestens Kaufvertragsentwurf).\n";
    if ($o['muster']) $t = "*** MUSTER-OBJEKT, nur Test ***\n\n" . $t;
    return $t;
}

// ======================================================================
// 2. Exposé ausliefern
// ======================================================================

function expose(): never
{
    cfg();
    $d = token_pruefen((string)($_GET['t'] ?? ''));
    $tel = h(firma_telefon());
    if (!$d) { log_zeile('expose', 'token:ungueltig'); seite(404, 'Link ungültig', "<h1>Dieser Link ist ungültig</h1><p class=\"lede\">Bitte nutzen Sie den Link aus Ihrer E-Mail vollständig oder rufen Sie mich an: $tel.</p>"); }
    $vg = vorgang_laden($d['v']);
    $o = objekt($d['o']);
    if (!$vg || !$o || $vg['objekt'] !== $d['o']) { log_zeile('expose', 'vorgang:fehlt'); seite(404, 'Link ungültig', "<h1>Dieser Link ist ungültig</h1><p class=\"lede\">Rufen Sie mich bitte an: $tel.</p>"); }
    if (!empty($vg['widerrufen'])) { log_zeile('expose', 'widerrufen'); seite(410, 'Vertrag widerrufen', '<h1>Sie haben den Vertrag widerrufen</h1><p class="lede">Deshalb ist das Exposé für diesen Link gesperrt. Möchten Sie es doch sehen, fordern Sie es bitte neu an.</p><p><a href="' . h($o['urls']['kurz']) . '">Zum Objekt</a></p>'); }
    if (in_array($o['status'], ['verkauft'], true)) seite(410, 'Verkauft', '<h1>Diese Wohnung ist verkauft</h1><p class="lede">Ähnliche Wohnung gesucht? Rufen Sie mich an: ' . $tel . '.</p>');
    $t = time();
    if ($t < (int)$d['ab']) {
        log_zeile('expose', 'noch-nicht');
        seite(403, 'Noch nicht freigeschaltet', '<h1>Ihr Exposé ist ab ' . h(fmt((int)$d['ab'], 'd.m.Y')) . ' freigeschaltet</h1><p class="lede">Sie haben gewählt, das Exposé erst nach Ablauf der Widerrufsfrist zu erhalten. Möchten Sie es früher? Rufen Sie mich an: ' . $tel . '.</p>');
    }
    if ($t > (int)$d['bis']) { log_zeile('expose', 'abgelaufen'); seite(410, 'Link abgelaufen', '<h1>Dieser Link ist abgelaufen</h1><p class="lede">Gern schicke ich Ihnen einen neuen. Rufen Sie mich an (' . $tel . ') oder schreiben Sie an linus@roessler-immo.de mit Ihrer Vorgangsnummer ' . h($vg['vorgang']) . '.</p>'); }
    $max = (int)(cfg()['max_abrufe'] ?? 0);
    if ($max > 0 && (int)$vg['abrufe'] >= $max) { log_zeile('expose', 'max-abrufe'); seite(429, 'Zu viele Abrufe', '<h1>Dieser Link wurde sehr oft geöffnet</h1><p class="lede">Zum Schutz des Verkäufers ist er vorerst gesperrt. Bitte rufen Sie mich an: ' . $tel . '.</p>'); }

    $html = @file_get_contents(BACKEND . '/geschuetzt/' . $o['slug'] . '.html');
    if ($html === false) seite(500, 'Fehler', '<h1>Das Exposé ist gerade nicht verfügbar</h1><p class="lede">Bitte rufen Sie mich an: ' . $tel . '.</p>');

    $vg['abrufe'] = (int)$vg['abrufe'] + 1;
    $vg['letzter_abruf'] = date(DATE_ATOM);
    vorgang_speichern($vg);
    anhaengen(daten('zugriffe/' . date('Y-m') . '.jsonl'), array_merge(['vorgang' => $vg['vorgang'], 'objekt' => $o['slug'], 'zeit' => date(DATE_ATOM), 'abruf' => $vg['abrufe']], ip_nachweis()));
    log_zeile('expose', 'ok');

    $empf = $vg['name'];
    $css = addcslashes(str_replace(["\n", "\r"], ' ', "Persönliches Exposé für $empf · Vorgang {$vg['vorgang']}"), '"\\');
    $html = str_replace(
        ['<!--EMPFAENGER-->', '<!--VORGANG-->', '<!--ABRUF-->', '<!--EMPFAENGER_CSS-->'],
        [h($empf), h($vg['vorgang']), h(date('d.m.Y H:i')), h($css)],
        $html
    );
    header('Content-Type: text/html; charset=utf-8');
    header('Cache-Control: no-store, private');
    header('X-Robots-Tag: noindex, nofollow, noarchive');
    header('Referrer-Policy: no-referrer');
    header("Content-Security-Policy: default-src 'none'; img-src data:; style-src 'unsafe-inline'; font-src data:; script-src 'unsafe-inline'; base-uri 'none'; form-action 'none'; frame-ancestors 'none'");
    echo $html;
    exit;
}

// ======================================================================
// 3. Widerrufsfunktion (§ 356a BGB): Schritt 1 Angaben, Schritt 2 „Widerruf bestätigen“
// ======================================================================

function widerruf(): never
{
    cfg();
    nur_post('/vertrag-widerrufen/');
    if (feld('website') !== '') { log_zeile('widerruf', 'spam'); seite(200, 'Widerruf', '<h1>Danke</h1>'); }
    if (!erlaube('widerruf:' . ip_roh(), [[10, 600], [40, 86400]])) fehler(429, 'Zu viele Versuche. Bitte widerrufen Sie per E-Mail an linus@roessler-immo.de; auch das wahrt die Frist.');

    $name = feld('name', 80); $email = feld('email', 254); $vorgang = strtoupper(feld('vorgang', 40)); $slug = feld('objekt', 80);
    $f = [];
    if ($e = pruefe_name($name)) $f['name'] = $e;
    if ($e = pruefe_email($email)) $f['email'] = $e;
    if ($vorgang !== '' && !preg_match('/^EX-\d{6}-[0-9A-F]{8}$/', $vorgang)) $f['vorgang'] = 'Die Vorgangsnummer hat die Form EX-261103-1A2B3C4D. Wenn Sie sie nicht haben, lassen Sie das Feld leer.';
    $o = $slug !== '' ? objekt($slug) : null;
    if ($slug !== '' && !$o) $slug = '';
    if ($f) fehler(422, 'Bitte prüfen Sie Ihre Angaben.', $f);

    $vertrag = $vorgang !== '' ? "Maklervertrag, Vorgang $vorgang" : ($o ? "Maklervertrag zum Objekt {$o['nummer']} ({$o['titel']})" : 'alle meine online geschlossenen Maklerverträge mit dieser E-Mail-Adresse');
    $erklaerung = "Hiermit widerrufe ich den von mir abgeschlossenen Vertrag über die Erbringung der folgenden Dienstleistung: $vertrag.";

    if (feld('schritt', 2) !== '2') {
        $verborgen = '';
        foreach (['name' => $name, 'email' => $email, 'vorgang' => $vorgang, 'objekt' => $slug] as $k => $v) $verborgen .= '<input type="hidden" name="' . $k . '" value="' . h($v) . '">';
        seite(200, 'Widerruf bestätigen', '<p class="eyebrow">Widerruf · Schritt 2 von 2</p><h1>Bitte bestätigen Sie Ihren Widerruf</h1>'
            . '<table class="daten" style="margin-top:20px"><tbody>'
            . '<tr><th>Name</th><td>' . h($name) . '</td></tr>'
            . '<tr><th>Vertrag</th><td>' . h($vertrag) . '</td></tr>'
            . '<tr><th>Eingangsbestätigung an</th><td>' . h($email) . '</td></tr>'
            . '<tr><th>Ihre Erklärung</th><td>' . h($erklaerung) . '</td></tr>'
            . '</tbody></table>'
            . '<form method="post" action="/widerruf.php" style="margin-top:24px"><input type="hidden" name="schritt" value="2">' . $verborgen
            . '<button class="btn" type="submit">Widerruf bestätigen</button></form>'
            . '<p class="klein" style="margin-top:14px">Etwas falsch? Gehen Sie mit der Zurück-Taste zurück und korrigieren Sie die Angaben.</p>');
    }

    // Schritt 2: Widerruf ist abgegeben. Fristwahrung mit Absenden (§ 356a Abs. 5 BGB).
    $jetzt = jetzt();
    $eh = email_hash($email);
    $betroffen = [];
    foreach (glob(daten('vorgaenge/EX-*.json')) ?: [] as $p) {
        $vg = json_decode((string)file_get_contents($p), true);
        if (!$vg || $vg['email_hash'] !== $eh) continue;
        if ($vorgang !== '' && $vg['vorgang'] !== $vorgang) continue;
        if ($vorgang === '' && $slug !== '' && $vg['objekt'] !== $slug) continue;
        if (empty($vg['widerrufen'])) { $vg['widerrufen'] = true; $vg['widerrufen_am'] = $jetzt->format(DATE_ATOM); vorgang_speichern($vg); }
        $betroffen[] = $vg['vorgang'];
    }
    $id = 'WR-' . $jetzt->format('ymd-His') . '-' . strtoupper(bin2hex(random_bytes(2)));
    $text = "Guten Tag $name,\n\nIhr Widerruf ist bei mir eingegangen.\n\n"
        . 'Eingang:        ' . $jetzt->format('d.m.Y') . ' um ' . $jetzt->format('H:i:s') . " Uhr\n"
        . "Name:           $name\nVertrag:        $vertrag\nBestätigung an: $email\nEingangsnummer: $id\n\n"
        . "Inhalt Ihrer Widerrufserklärung:\n„{$erklaerung}“\n\n"
        . "Diese E-Mail bestätigt nur den Eingang. Den Link zum Exposé habe ich für die betroffenen Verträge gesperrt"
        . ($betroffen ? ' (' . implode(', ', $betroffen) . ')' : '') . ". Ich melde mich, falls ich Ihren Vertrag nicht zuordnen kann.\n\n" . gruss() . "\n";
    $mail = null; $mf = null;
    try { $mail = mail_senden($email, 'Eingangsbestätigung Ihres Widerrufs (' . $id . ')', $text, null, 'widerruf'); } catch (\Throwable $ex) { $mf = $ex->getMessage(); }
    anhaengen(daten('widerrufe/' . $jetzt->format('Y') . '.jsonl'), array_merge([
        'typ' => 'widerruf', 'id' => $id, 'zeit' => $jetzt->format(DATE_ATOM), 'name' => $name, 'email' => $email,
        'vorgang_angegeben' => $vorgang, 'objekt_angegeben' => $slug, 'erklaerung' => $erklaerung, 'gesperrt' => $betroffen,
        'eingangsbestaetigung' => $mail ? ['message_id' => $mail['message_id'], 'sha256_text' => $mail['sha256_text']] : ['fehler' => $mf],
        'user_agent' => mb_substr((string)($_SERVER['HTTP_USER_AGENT'] ?? ''), 0, 300),
    ], ip_nachweis()));
    try {
        mail_senden(cfg()['mail']['an_linus'], "[Widerruf] $name · " . ($betroffen ? implode(', ', $betroffen) : 'NICHT ZUGEORDNET'),
            "Widerruf eingegangen am " . $jetzt->format('d.m.Y H:i:s') . "\n\nName: $name\nE-Mail: $email\nAngaben: $vertrag\nGesperrt: " . ($betroffen ? implode(', ', $betroffen) : 'keine Zuordnung, bitte prüfen') . "\nEingangsbestätigung: " . ($mail ? 'gesendet' : "FEHLER $mf") . "\n", $email, 'linus');
    } catch (\Throwable) { log_zeile('widerruf', 'mail:linus-fehler'); }
    log_zeile('widerruf', 'ok ' . count($betroffen));
    seite(200, 'Widerruf eingegangen', '<h1>Ihr Widerruf ist eingegangen</h1>'
        . '<p class="lede">Eingang am ' . h($jetzt->format('d.m.Y')) . ' um ' . h($jetzt->format('H:i:s')) . ' Uhr. '
        . ($mail ? 'Eine Eingangsbestätigung mit diesem Inhalt ist an ' . h($email) . ' unterwegs.' : 'Die Eingangsbestätigung per E-Mail konnte nicht gesendet werden; bitte speichern oder drucken Sie diese Seite.') . '</p>'
        . '<table class="daten" style="margin-top:20px"><tbody><tr><th>Eingangsnummer</th><td>' . h($id) . '</td></tr><tr><th>Name</th><td>' . h($name) . '</td></tr><tr><th>Vertrag</th><td>' . h($vertrag) . '</td></tr><tr><th>Ihre Erklärung</th><td>' . h($erklaerung) . '</td></tr></tbody></table>'
        . '<p class="klein" style="margin-top:14px">Diese Bestätigung betrifft den Eingang, nicht die rechtliche Prüfung.</p>');
}

// ======================================================================
// 4. Manuelle Freigabe durch Linus
// ======================================================================

function freigabe(): never
{
    cfg();
    $v = (string)($_GET['v'] ?? $_POST['v'] ?? '');
    $s = (string)($_GET['s'] ?? $_POST['s'] ?? '');
    $vg = vorgang_laden($v);
    if (!$vg || !hash_equals(freigabe_sig($v), $s)) seite(404, 'Ungültig', '<h1>Freigabe-Link ungültig</h1>');
    $info = '<table class="daten"><tbody><tr><th>Objekt</th><td>' . h($vg['nummer'] . ' · ' . $vg['titel']) . '</td></tr><tr><th>Interessent</th><td>' . h($vg['name']) . ', ' . h($vg['email']) . ', ' . h($vg['telefon'] ?: '–') . '</td></tr><tr><th>Exposé</th><td>' . ($vg['beginn'] === 'sofort' ? 'sofort' : 'nach Frist, ab ' . h(fmt((int)$vg['ab'], 'd.m.Y'))) . '</td></tr><tr><th>Status</th><td>' . (!empty($vg['widerrufen']) ? 'WIDERRUFEN' : (!empty($vg['freigegeben']) ? 'freigegeben am ' . h($vg['freigegeben_am']) : 'wartet auf Freigabe')) . '</td></tr></tbody></table>';
    if (($_SERVER['REQUEST_METHOD'] ?? 'GET') !== 'POST') {
        // GET zeigt nur an; erst POST gibt frei (Link-Vorschauen von Mailprogrammen lösen nichts aus)
        seite(200, 'Freigabe', '<h1>Exposé freigeben?</h1>' . $info . (empty($vg['widerrufen']) && empty($vg['freigegeben'])
            ? '<form method="post" action="/freigabe.php" style="margin-top:22px"><input type="hidden" name="v" value="' . h($v) . '"><input type="hidden" name="s" value="' . h($s) . '"><button class="btn" type="submit">Exposé jetzt freigeben</button></form>' : ''));
    }
    nur_post('/');
    if (!empty($vg['widerrufen'])) seite(409, 'Widerrufen', '<h1>Nicht freigegeben: Vertrag widerrufen</h1>' . $info);
    if (!empty($vg['freigegeben'])) seite(200, 'Schon freigegeben', '<h1>Schon freigegeben</h1>' . $info);
    $jetzt = jetzt();
    $o = objekt($vg['objekt']);
    $ab = max((int)$vg['ab'], $jetzt->getTimestamp());
    $bis = $ab + 86400 * (int)($o['freigabe']['link_gueltig_tage'] ?? 30);
    $link = expose_link(token_erzeugen($vg['vorgang'], $vg['objekt'], (int)$vg['ab'], $bis));
    $vg['freigegeben'] = true; $vg['freigegeben_am'] = $jetzt->format(DATE_ATOM); $vg['bis'] = $bis;
    vorgang_speichern($vg);
    $text = "Guten Tag {$vg['name']},\n\nhier ist Ihr persönlicher Link zum vollständigen Exposé „{$vg['titel']}“:\n$link\n\n"
        . ($vg['beginn'] === 'nach_frist' ? 'Wie gewünscht funktioniert er ab ' . fmt((int)$vg['ab'], 'd.m.Y') . ' (nach Ablauf der Widerrufsfrist), dann bis ' . fmt($bis, 'd.m.Y') . ".\n" : 'Er gilt bis ' . fmt($bis, 'd.m.Y') . ".\n")
        . "Bitte geben Sie ihn nicht weiter.\n\nVertrag widerrufen: " . rtrim(cfg()['basis_url'], '/') . "/vertrag-widerrufen/ (Vorgang {$vg['vorgang']})\n\n" . gruss() . "\n";
    try { $m = mail_senden($vg['email'], 'Ihr Exposé: ' . $vg['titel'] . " (Vorgang {$vg['vorgang']})", $text, null, 'freigabe'); }
    catch (\Throwable $ex) { seite(500, 'Fehler', '<h1>Mail an den Interessenten fehlgeschlagen</h1><p>' . h($ex->getMessage()) . '</p>'); }
    anhaengen(daten('nachweise/' . $jetzt->format('Y-m') . '.jsonl'), ['typ' => 'freigabe', 'vorgang' => $vg['vorgang'], 'zeit' => $jetzt->format(DATE_ATOM), 'mail' => ['message_id' => $m['message_id'], 'sha256_text' => $m['sha256_text']]]);
    log_zeile('freigabe', 'ok');
    seite(200, 'Freigegeben', '<h1>Freigegeben</h1><p class="lede">Der Link ist an ' . h($vg['email']) . ' unterwegs.</p>' . $info);
}
