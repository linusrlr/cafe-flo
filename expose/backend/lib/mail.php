<?php
// E-Mail ohne Fremdbibliothek: Nachricht bauen (text/plain, UTF-8, quoted-printable) und versenden
// per SMTP (STARTTLS oder TLS, Zertifikat wird geprüft, AUTH PLAIN/LOGIN), per PHP mail() oder
// im Testmodus als .eml-Datei. Warum kein PHPMailer: siehe SICHERHEIT.md, Abschnitt E-Mail.
declare(strict_types=1);

namespace Expose;

/**
 * Strenge Adressprüfung: nur „Punkt-Atom“-Adressen mit üblichen Zeichen, Domain mit Punkt und
 * Buchstaben-TLD. Keine Anführungszeichen, keine Kommas, keine IP-Literale, keine Steuerzeichen.
 * Internationalisierte Domains werden nach Punycode umgewandelt. Rückgabe: normalisierte Adresse oder null.
 */
function adresse_normalisieren(string $a): ?string
{
    if ($a === '' || strlen($a) > 254 || preg_match('/[\x00-\x20\x7F]/', $a)) return null;
    $at = strrpos($a, '@');
    if ($at === false) return null;
    $lokal = substr($a, 0, $at);
    $domain = substr($a, $at + 1);
    if (preg_match('/[^\x21-\x7E]/', $domain)) {
        if (!function_exists('idn_to_ascii')) return null;
        $d = idn_to_ascii($domain, IDNA_NONTRANSITIONAL_TO_ASCII, INTL_IDNA_VARIANT_UTS46);
        if ($d === false) return null;
        $domain = $d;
    }
    $domain = strtolower($domain);
    if (!preg_match("/^[A-Za-z0-9._%+'\\-]{1,64}$/D", $lokal)) return null;
    if (str_starts_with($lokal, '.') || str_ends_with($lokal, '.') || str_contains($lokal, '..')) return null;
    if (strlen($domain) > 253 || !preg_match('/^(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+(?:[a-z]{2,63}|xn--[a-z0-9-]{1,59})$/D', $domain)) return null;
    $voll = $lokal . '@' . $domain;
    if (strlen($voll) > 254 || filter_var($voll, FILTER_VALIDATE_EMAIL) === false) return null;
    return $voll;
}

function kopfzeile_sicher(string $wert): string
{
    if (preg_match('/[\r\n\x00]/', $wert)) throw new \RuntimeException('Header-Injektion abgewehrt');
    return $wert;
}

/** Baut die vollständige Nachricht (RFC 5322) mit CRLF. */
function nachricht_bauen(array $m, string $an, string $betreff, string $text, ?string $antwortAn, string $messageId): array
{
    foreach ([$an, $m['absender'], $antwortAn ?? $m['antwort_an']] as $adr) {
        if (adresse_normalisieren($adr) !== $adr) throw new \RuntimeException('Ungültige Adresse im Mailkopf');
    }
    $kopf = [
        'Date' => date(DATE_RFC2822),
        'From' => mb_encode_mimeheader((string)$m['absender_name'], 'UTF-8', 'Q', "\r\n") . ' <' . $m['absender'] . '>',
        'To' => $an,
        'Reply-To' => $antwortAn ?? $m['antwort_an'],
        'Subject' => mb_encode_mimeheader($betreff, 'UTF-8', 'Q', "\r\n"),
        'Message-ID' => $messageId,
        'MIME-Version' => '1.0',
        'Content-Type' => 'text/plain; charset=UTF-8',
        'Content-Transfer-Encoding' => 'quoted-printable',
        'Auto-Submitted' => 'auto-generated',
    ];
    foreach ($kopf as $k => $v) kopfzeile_sicher(str_replace("\r\n ", ' ', $v));   // Faltung von mb_encode_mimeheader ist erlaubt
    $text = str_replace(["\r\n", "\r"], "\n", $text);
    $koerper = quoted_printable_encode(str_replace("\n", "\r\n", $text));
    $kopfText = '';
    foreach ($kopf as $k => $v) $kopfText .= "$k: $v\r\n";
    return ['kopf' => $kopf, 'koerper' => $koerper, 'eml' => $kopfText . "\r\n" . $koerper . "\r\n"];
}

/**
 * Versendet eine Nachricht. Gibt Prüfwerte zurück (message_id, sha256_text, sha256_eml, eml, antwort).
 * $m: Konfiguration 'mail', $testmodus: erlaubt SMTP ohne TLS (nur für den lokalen Test-Server).
 */
function nachricht_senden(array $m, string $an, string $betreff, string $text, ?string $antwortAn, string $art, string $hostname, string $ablage, bool $testmodus): array
{
    $id = sprintf('<%s.%s@%s>', date('YmdHis'), bin2hex(random_bytes(8)), $hostname);
    $n = nachricht_bauen($m, $an, $betreff, $text, $antwortAn, $id);
    $antwort = '';
    switch ($m['transport']) {
        case 'datei':
            if (!$testmodus) throw new \RuntimeException('Transport „datei“ nur im Testmodus');
            if (!is_dir($ablage)) mkdir($ablage, 0700, true);
            $datei = $ablage . '/' . date('Ymd-His') . '-' . substr(hash('sha256', $id), 0, 8) . "-$art.eml";
            file_put_contents($datei, $n['eml'], LOCK_EX);
            $antwort = 'datei:' . basename($datei);
            break;
        case 'mail':
            $h = $n['kopf']; unset($h['To'], $h['Subject']);
            $hz = ''; foreach ($h as $k => $v) $hz .= "$k: $v\r\n";
            if (!mail($an, $n['kopf']['Subject'], $n['koerper'], rtrim($hz), '-f' . $m['absender'])) throw new \RuntimeException('mail() fehlgeschlagen');
            $antwort = 'mail(): übergeben';
            break;
        case 'smtp':
            $antwort = smtp_senden($m['smtp'] ?? [], $m['absender'], $an, $n['eml'], $hostname, $testmodus);
            break;
        default:
            throw new \RuntimeException('Mail-Transport unbekannt');
    }
    return ['message_id' => $id, 'sha256_text' => hash('sha256', $text), 'sha256_eml' => hash('sha256', $n['eml']), 'eml' => $n['eml'], 'antwort' => $antwort];
}

// ---------------------------------------------------------------------------------------------
// SMTP-Client (RFC 5321, 3207, 4954). Ein Empfänger je Nachricht, Punkt-Maskierung im DATA-Teil.
// ---------------------------------------------------------------------------------------------

function smtp_lesen($fp): array
{
    $text = '';
    while (($z = fgets($fp, 2048)) !== false) {
        $text .= $z;
        if (strlen($z) < 4 || $z[3] === ' ') return [(int)substr($z, 0, 3), $text];
    }
    $meta = stream_get_meta_data($fp);
    throw new \RuntimeException('SMTP: Verbindung abgebrochen' . (!empty($meta['timed_out']) ? ' (Zeitüberschreitung)' : ''));
}

function smtp_befehl($fp, string $befehl, array $erwartet, ?string $anzeige = null): string
{
    if (preg_match('/[\r\n\x00]/', $befehl)) throw new \RuntimeException('SMTP-Injektion abgewehrt');
    fwrite($fp, $befehl . "\r\n");
    [$code, $text] = smtp_lesen($fp);
    if (!in_array($code, $erwartet, true)) {
        $wort = $anzeige ?? strtok($befehl, ' :');
        throw new \RuntimeException("SMTP $wort: Antwort $code " . trim(mb_substr(preg_replace('/\s+/', ' ', $text), 0, 160)));
    }
    return $text;
}

function smtp_senden(array $s, string $von, string $an, string $eml, string $helo, bool $testmodus): string
{
    $host = (string)($s['host'] ?? '');
    $sicherheit = (string)($s['sicherheit'] ?? (($s['secure'] ?? 'tls') === 'ssl' ? 'ssl' : 'starttls'));
    $port = (int)($s['port'] ?? ($sicherheit === 'ssl' ? 465 : 587));
    if ($host === '') throw new \RuntimeException('SMTP: host fehlt');
    if ($sicherheit === 'keine' && !$testmodus) throw new \RuntimeException('SMTP ohne TLS nur im Testmodus');
    if (!in_array($sicherheit, ['starttls', 'ssl', 'keine'], true)) throw new \RuntimeException('SMTP: sicherheit unbekannt');
    $tls = ['verify_peer' => true, 'verify_peer_name' => true, 'peer_name' => $host, 'allow_self_signed' => false, 'SNI_enabled' => true,
        'crypto_method' => STREAM_CRYPTO_METHOD_TLSv1_2_CLIENT | (defined('STREAM_CRYPTO_METHOD_TLSv1_3_CLIENT') ? STREAM_CRYPTO_METHOD_TLSv1_3_CLIENT : 0)];
    if (!empty($s['cafile'])) $tls['cafile'] = $s['cafile'];
    $ctx = stream_context_create(['ssl' => $tls]);
    $fp = @stream_socket_client(($sicherheit === 'ssl' ? 'tls://' : 'tcp://') . $host . ':' . $port, $errno, $errstr, (float)($s['timeout'] ?? 15), STREAM_CLIENT_CONNECT, $ctx);
    if (!$fp) throw new \RuntimeException("SMTP: keine Verbindung zu $host:$port ($errno)");
    stream_set_timeout($fp, (int)($s['timeout'] ?? 20));
    try {
        [$code] = smtp_lesen($fp);
        if ($code !== 220) throw new \RuntimeException("SMTP: Begrüßung $code");
        $ehlo = smtp_befehl($fp, 'EHLO ' . $helo, [250]);
        if ($sicherheit === 'starttls') {
            if (!preg_match('/^250[ -]STARTTLS/mi', $ehlo)) throw new \RuntimeException('SMTP: Server bietet kein STARTTLS');
            smtp_befehl($fp, 'STARTTLS', [220]);
            if (!stream_socket_enable_crypto($fp, true, $tls['crypto_method'])) throw new \RuntimeException('SMTP: TLS-Aushandlung fehlgeschlagen');
            $ehlo = smtp_befehl($fp, 'EHLO ' . $helo, [250]);
        }
        $user = (string)($s['user'] ?? '');
        if ($user !== '') {
            $pass = (string)($s['pass'] ?? '');
            if (preg_match('/^250[ -]AUTH[ =](.*)$/mi', $ehlo, $mm) && preg_match('/\bPLAIN\b/i', $mm[1])) {
                smtp_befehl($fp, 'AUTH PLAIN ' . base64_encode("\0" . $user . "\0" . $pass), [235], 'AUTH');
            } else {
                smtp_befehl($fp, 'AUTH LOGIN', [334]);
                smtp_befehl($fp, base64_encode($user), [334], 'AUTH');
                smtp_befehl($fp, base64_encode($pass), [235], 'AUTH');
            }
        }
        smtp_befehl($fp, 'MAIL FROM:<' . $von . '>', [250]);
        smtp_befehl($fp, 'RCPT TO:<' . $an . '>', [250, 251]);
        smtp_befehl($fp, 'DATA', [354]);
        // Punkt-Maskierung (RFC 5321 4.5.2): Zeilen, die mit „.“ beginnen, bekommen einen zweiten Punkt
        $daten = preg_replace('/(^|\r\n)\./', '$1..', $eml);
        if (!str_ends_with($daten, "\r\n")) $daten .= "\r\n";
        fwrite($fp, $daten . ".\r\n");
        [$code, $text] = smtp_lesen($fp);
        if ($code !== 250) throw new \RuntimeException("SMTP DATA: Antwort $code");
        try { smtp_befehl($fp, 'QUIT', [221]); } catch (\Throwable) { /* egal */ }
        return trim(mb_substr(preg_replace('/\s+/', ' ', $text), 0, 200));
    } finally {
        fclose($fp);
    }
}
