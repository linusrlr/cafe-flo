<?php
// Admin-Übersicht für Linus: Liste der Vorgänge, Freigabe, Sperre, Aufbewahrung, Nachweis-Export, Kettenprüfung.
// Schutz: eigenes Login (password_hash), Sitzung mit __Host-Cookie (Secure, HttpOnly, SameSite=Strict),
// Leerlauf- und Höchstdauer, CSRF-Token, Herkunftsprüfung, Rate-Limit, optional IP-Liste; zusätzlich
// empfohlen: HTTP-Basic-Auth oder IP-Sperre in nginx (expose/deploy/nginx-expose.conf).
declare(strict_types=1);

namespace Expose;

require_once __DIR__ . '/kern.php';

function admin_aktiv(): bool { return (string)(cfg()['admin']['passwort_hash'] ?? '') !== ''; }

function admin_sitzung(): void
{
    $sicher = ist_https();
    ini_set('session.use_strict_mode', '1');
    ini_set('session.use_only_cookies', '1');
    ini_set('session.use_trans_sid', '0');
    ini_set('session.cookie_httponly', '1');
    ini_set('session.gc_maxlifetime', (string)(3600 * (int)cfg()['admin']['sitzung_max_stunden']));
    session_save_path(daten('sitzungen'));
    session_name($sicher ? '__Host-expose_admin' : 'expose_admin');
    session_set_cookie_params(['lifetime' => 0, 'path' => '/', 'secure' => $sicher, 'httponly' => true, 'samesite' => 'Strict']);
    session_cache_limiter('nocache');
    session_start();
}

function admin_angemeldet(): bool
{
    $s = $_SESSION;
    if (empty($s['admin']) || !is_int($s['aktiv'] ?? null) || !is_int($s['seit'] ?? null)) return false;
    $a = cfg()['admin'];
    if (time() - $s['aktiv'] > 60 * (int)$a['sitzung_minuten'] || time() - $s['seit'] > 3600 * (int)$a['sitzung_max_stunden']) return false;
    if (!hash_equals((string)($s['ua'] ?? ''), hash('sha256', user_agent()))) return false;
    $_SESSION['aktiv'] = time();
    return true;
}

function admin_csrf_pruefen(): void
{
    $t = $_POST['csrf'] ?? '';
    if (!is_string($t) || !is_string($_SESSION['csrf'] ?? null) || !hash_equals($_SESSION['csrf'], $t)) {
        log_zeile('admin', 'csrf');
        seite(403, 'Abgelehnt', '<h1>Sitzung abgelaufen oder Anfrage ungültig</h1><p><a href="/expose-admin.php">Neu laden</a></p>');
    }
}

function admin_url(array $p = []): string { return '/expose-admin.php' . ($p ? '?' . http_build_query($p) : ''); }

function admin_formular(string $aktion, array $felder, string $knopf, string $klasse = 'btn'): string
{
    $h = '<form method="post" action="' . h(admin_url()) . '" class="inline-form"><input type="hidden" name="csrf" value="' . h($_SESSION['csrf'] ?? '') . '"><input type="hidden" name="aktion" value="' . h($aktion) . '">';
    foreach ($felder as $k => $v) $h .= '<input type="hidden" name="' . h($k) . '" value="' . h((string)$v) . '">';
    return $h . '<button class="' . h($klasse) . '" type="submit">' . h($knopf) . '</button></form>';
}

function admin(): never
{
    cfg();
    https_pruefen();
    if (!admin_aktiv()) seite(404, 'Nicht gefunden', '<h1>Nicht gefunden</h1>');
    $erlaubt = (array)cfg()['admin']['ip_erlaubt'];
    if ($erlaubt && !array_filter($erlaubt, fn($n) => ip_in_netz(ip_roh(), (string)$n))) { log_zeile('admin', 'ip'); seite(404, 'Nicht gefunden', '<h1>Nicht gefunden</h1>'); }
    header('Cache-Control: no-store');
    admin_sitzung();
    $methode = $_SERVER['REQUEST_METHOD'] ?? 'GET';

    if ($methode === 'POST') {
        nur_post(admin_url());
        $aktion = feld('aktion');
        if ($aktion === 'anmelden') admin_anmelden();
        if (!admin_angemeldet()) admin_login_seite(401, 'Bitte melden Sie sich an.');
        admin_csrf_pruefen();
        admin_aktion($aktion);
    }
    if (!admin_angemeldet()) admin_login_seite(200);

    $seite = get_text('seite', 20) ?: 'liste';
    $v = get_text('v', 40);
    match ($seite) {
        'vorgang' => admin_vorgang($v),
        'export' => admin_export($v, get_text('format', 10)),
        'kette' => admin_kette(),
        default => admin_liste(),
    };
}

function admin_login_seite(int $status, string $meldung = ''): never
{
    $_SESSION['login_csrf'] ??= b64u(random_bytes(24));
    seite($status, 'Anmeldung', '<h1>Exposé-Übersicht</h1>' . ($meldung ? '<p class="meldung">' . h($meldung) . '</p>' : '')
        . '<form method="post" action="' . h(admin_url()) . '" class="formular mt-14"><input type="hidden" name="aktion" value="anmelden"><input type="hidden" name="csrf" value="' . h($_SESSION['login_csrf']) . '">'
        . '<div class="feld"><label for="a-benutzer">Benutzer</label><input id="a-benutzer" name="benutzer" type="text" autocomplete="username" required maxlength="40"></div>'
        . '<div class="feld"><label for="a-passwort">Passwort</label><input id="a-passwort" name="passwort" type="password" autocomplete="current-password" required maxlength="200"></div>'
        . '<div class="absenden"><button class="btn" type="submit">Anmelden</button></div></form>');
}

function admin_anmelden(): never
{
    $t = $_POST['csrf'] ?? '';
    if (!is_string($t) || !is_string($_SESSION['login_csrf'] ?? null) || !hash_equals($_SESSION['login_csrf'], $t)) admin_login_seite(403, 'Bitte laden Sie die Seite neu und melden Sie sich erneut an.');
    if (!erlaube('login:' . ip_limit_schluessel(), limit('login')) || !erlaube('login:global', limit('login_global'))) {
        log_zeile('admin', 'login:limit');
        header('Retry-After: 900');
        admin_login_seite(429, 'Zu viele Anmeldeversuche. Bitte warten Sie 15 Minuten.');
    }
    $a = cfg()['admin'];
    $benutzer = is_string($_POST['benutzer'] ?? null) ? $_POST['benutzer'] : '';
    $passwort = is_string($_POST['passwort'] ?? null) ? $_POST['passwort'] : '';
    // immer password_verify ausführen (gleiche Laufzeit bei falschem Benutzer)
    $hashOk = password_verify($passwort, (string)$a['passwort_hash']);
    $ok = hash_equals((string)$a['benutzer'], $benutzer) && $hashOk && strlen($passwort) <= 200;
    if (!$ok) { log_zeile('admin', 'login:falsch'); usleep(random_int(200000, 400000)); admin_login_seite(401, 'Benutzer oder Passwort falsch.'); }
    session_regenerate_id(true);
    $_SESSION = ['admin' => true, 'seit' => time(), 'aktiv' => time(), 'csrf' => b64u(random_bytes(32)), 'ua' => hash('sha256', user_agent())];
    log_zeile('admin', 'login:ok');
    if (password_needs_rehash((string)$a['passwort_hash'], PASSWORD_DEFAULT)) log_zeile('admin', 'hinweis:passwort-hash-veraltet');
    header('Location: ' . admin_url(), true, 303);
    exit;
}

function admin_aktion(string $aktion): never
{
    $v = feld('v');
    if ($aktion === 'abmelden') {
        $_SESSION = [];
        session_destroy();
        log_zeile('admin', 'logout');
        header('Location: ' . admin_url(), true, 303);
        exit;
    }
    if (!vorgang_id_ok($v) || !vorgang_laden($v)) seite(404, 'Nicht gefunden', '<h1>Vorgang nicht gefunden</h1>');
    $zurueck = admin_url(['seite' => 'vorgang', 'v' => $v]);
    switch ($aktion) {
        case 'freigeben':
            $r = freigeben($v, 'admin');
            log_zeile('admin', 'freigabe:' . $r['status']);
            break;
        case 'sperren':
        case 'entsperren':
            $sperren = $aktion === 'sperren';
            vorgang_aendern($v, function (array $vg) use ($sperren) {
                $vg['gesperrt'] = $sperren;
                return $vg;
            });
            nachweis($aktion === 'sperren' ? 'sperre' : 'entsperrt', $v, ['durch' => 'admin']);
            break;
        case 'aufbewahren':
            $jahr = feld('jahr');
            if (!preg_match('/^20\d\d$/D', $jahr) || (int)$jahr < (int)date('Y')) seite(422, 'Bitte prüfen', '<h1>Jahr ungültig</h1>');
            vorgang_aendern($v, function (array $vg) use ($jahr) { $vg['aufbewahren_bis'] = "$jahr-12-31"; return $vg; });
            nachweis('aufbewahrung', $v, ['bis' => "$jahr-12-31", 'grund' => mb_substr(feld('grund'), 0, 200), 'durch' => 'admin']);
            break;
        default:
            seite(400, 'Ungültig', '<h1>Unbekannte Aktion</h1>');
    }
    header('Location: ' . $zurueck, true, 303);
    exit;
}

function admin_kopf(string $titel): string
{
    return '<p class="eyebrow">Exposé-Übersicht · nur für Linus</p><h1>' . h($titel) . '</h1>'
        . '<p class="klein"><a href="' . h(admin_url()) . '">Vorgänge</a> · <a href="' . h(admin_url(['seite' => 'kette'])) . '">Nachweiskette prüfen</a> · '
        . admin_formular('abmelden', [], 'Abmelden', 'link-knopf') . '</p>';
}

function admin_liste(): never
{
    $zeilen = '';
    foreach (vorgaenge_alle() as $vg) {
        $zeilen .= '<tr><td><a href="' . h(admin_url(['seite' => 'vorgang', 'v' => $vg['vorgang']])) . '">' . h($vg['vorgang']) . '</a></td>'
            . '<td>' . h(fmt(new \DateTimeImmutable($vg['vertrag']))) . '</td><td>' . h($vg['nummer']) . '</td>'
            . '<td>' . h($vg['name']) . '<br><span class="klein">' . h($vg['email']) . '</span></td>'
            . '<td>' . h($vg['beginn'] === 'sofort' ? 'sofort' : 'nach Frist') . '</td><td>' . h(vorgang_status($vg)) . '</td><td>' . h((string)$vg['abrufe']) . '</td></tr>';
    }
    seite(200, 'Vorgänge', admin_kopf('Vorgänge')
        . '<div class="tabelle-scroll"><table class="daten"><thead><tr><th>Vorgang</th><th>Vertrag</th><th>Objekt</th><th>Interessent</th><th>Exposé</th><th>Status</th><th>Abrufe</th></tr></thead><tbody>'
        . ($zeilen ?: '<tr><td colspan="7">Noch keine Vorgänge.</td></tr>') . '</tbody></table></div>');
}

/** Alle Nachweis-Einträge, die zu einem Vorgang gehören (auch Widerrufe, die mehrere Vorgänge betreffen). */
function eintraege_fuer(string $v): array
{
    $r = []; $widerrufe = [];
    foreach (kette_lesen(daten('nachweise')) as $z) {
        $e = $z['eintrag'];
        if (!$e) continue;
        $gehoert = ($e->vorgang ?? null) === $v
            || (is_object($e->inhalt ?? null) && is_array($e->inhalt->gesperrt ?? null) && in_array($v, $e->inhalt->gesperrt, true))
            || (is_object($e->inhalt ?? null) && isset($e->inhalt->widerruf) && in_array($e->inhalt->widerruf, $widerrufe, true));
        if ($gehoert) {
            $r[] = $e;
            if (($e->typ ?? '') === 'widerruf' && isset($e->inhalt->id)) $widerrufe[] = $e->inhalt->id;
        }
    }
    return $r;
}

function admin_vorgang(string $v): never
{
    $vg = vorgang_laden($v);
    if (!$vg) seite(404, 'Nicht gefunden', admin_kopf('Nicht gefunden') . '<p>Vorgang nicht gefunden.</p>');
    $ein = '';
    foreach (eintraege_fuer($v) as $e) {
        $ein .= '<tr><td>' . h((string)$e->seq) . '</td><td>' . h((string)$e->zeit) . '</td><td>' . h((string)$e->typ) . '</td><td class="hash">' . h(substr((string)$e->hash, 0, 16)) . '…</td></tr>';
    }
    $aktionen = '';
    if (empty($vg['freigegeben']) && empty($vg['widerrufen'])) $aktionen .= admin_formular('freigeben', ['v' => $v], 'Exposé jetzt freigeben');
    $aktionen .= empty($vg['gesperrt']) ? admin_formular('sperren', ['v' => $v], 'Link sperren', 'btn btn-hell') : admin_formular('entsperren', ['v' => $v], 'Link entsperren', 'btn btn-hell');
    seite(200, "Vorgang $v", admin_kopf("Vorgang $v") . vorgang_info_html($vg)
        . '<table class="daten mt-14"><tbody><tr><th>Vertrag</th><td>' . h(fmt(new \DateTimeImmutable($vg['vertrag']))) . ' Uhr</td></tr>'
        . '<tr><th>Widerrufsfrist bis</th><td>' . h((new \DateTimeImmutable($vg['widerrufsfrist_ende']))->format('d.m.Y')) . '</td></tr>'
        . '<tr><th>Link gültig</th><td>' . h(fmt((int)$vg['ab'], 'd.m.Y') . ' bis ' . fmt((int)$vg['bis'], 'd.m.Y')) . '</td></tr>'
        . '<tr><th>Abrufe</th><td>' . h((string)$vg['abrufe']) . ($vg['letzter_abruf'] ?? null ? ', zuletzt ' . h(fmt(new \DateTimeImmutable($vg['letzter_abruf']))) : '') . '</td></tr>'
        . '<tr><th>Aufbewahren bis</th><td>' . h($vg['aufbewahren_bis'] ?? 'Standardfrist (Ende des 3. Kalenderjahres nach letztem Kontakt)') . '</td></tr></tbody></table>'
        . '<div class="aktionen mt-14">' . $aktionen . '</div>'
        . '<h2 class="mt-28">Nachweis</h2><p><a class="btn" href="' . h(admin_url(['seite' => 'export', 'v' => $v, 'format' => 'html'])) . '">Nachweis ansehen und als PDF drucken</a> '
        . '<a class="btn btn-hell" href="' . h(admin_url(['seite' => 'export', 'v' => $v, 'format' => 'json'])) . '">Nachweis-Datei herunterladen (JSON, prüfbar)</a></p>'
        . '<div class="tabelle-scroll"><table class="daten mt-14"><thead><tr><th>Nr.</th><th>Zeit</th><th>Art</th><th>Prüfwert</th></tr></thead><tbody>' . $ein . '</tbody></table></div>'
        . '<h2 class="mt-28">Aufbewahrung verlängern (z. B. Kauf)</h2>'
        . '<form method="post" action="' . h(admin_url()) . '" class="formular"><input type="hidden" name="csrf" value="' . h($_SESSION['csrf']) . '"><input type="hidden" name="aktion" value="aufbewahren"><input type="hidden" name="v" value="' . h($v) . '">'
        . '<div class="feld"><label for="a-jahr">Aufbewahren bis Ende des Jahres</label><input id="a-jahr" name="jahr" type="text" inputmode="numeric" maxlength="4" pattern="20[0-9]{2}"></div>'
        . '<div class="feld"><label for="a-grund">Grund</label><input id="a-grund" name="grund" type="text" maxlength="200"></div>'
        . '<div class="absenden"><button class="btn btn-hell" type="submit">Speichern</button></div></form>');
}

/** Nachweis-Datei: Gerüst der ganzen Kette (ohne fremde Inhalte), volle Einträge des Vorgangs, Mail-Kopien. */
function nachweis_export(string $v): array
{
    $vg = vorgang_laden($v);
    if (!$vg) throw new \InvalidArgumentException('Vorgang fehlt');
    $eigene = [];
    foreach (eintraege_fuer($v) as $e) $eigene[(int)$e->seq] = true;
    $kette = [];
    foreach (kette_lesen(daten('nachweise')) as $z) {
        $e = $z['eintrag'];
        if (!$e) continue;
        if (!isset($eigene[(int)$e->seq])) { $e = clone $e; unset($e->inhalt); }
        $kette[] = $e;
    }
    $mails = [];
    foreach ($kette as $e) {
        $kopie = isset($e->inhalt) && is_object($e->inhalt) ? ($e->inhalt->kopie ?? null) : null;
        if (is_string($kopie) && preg_match('#^nachweise/mails/[A-Za-z0-9-]+\.eml$#D', $kopie) && is_file(daten($kopie))) {
            $eml = (string)file_get_contents(daten($kopie));
            $mails[$kopie] = ['sha256' => hash('sha256', $eml), 'eml_base64' => base64_encode($eml)];
        }
    }
    return [
        'format' => 'roessler-expose-nachweis/1',
        'erstellt' => date(DATE_ATOM),
        'vorgang' => $vg,
        'pruefung' => kette_pruefen((function () use ($kette) { foreach ($kette as $i => $e) yield ['datei' => 'Export', 'zeile' => $i + 1, 'eintrag' => $e]; })(), [], true),
        'anleitung' => 'Prüfen: php nachweis-pruefen.php --export <diese Datei>. Die Kette enthält alle Einträge; nur die Einträge dieses Vorgangs mit Inhalt.',
        'kette' => $kette,
        'mails' => $mails,
    ];
}

function admin_export(string $v, string $format): never
{
    if (!vorgang_id_ok($v) || !vorgang_laden($v)) seite(404, 'Nicht gefunden', admin_kopf('Nicht gefunden'));
    $x = nachweis_export($v);
    log_zeile('admin', 'export:' . ($format === 'json' ? 'json' : 'html'));
    if ($format === 'json') {
        http_response_code(200);
        header('Content-Type: application/json; charset=utf-8');
        header('Content-Disposition: attachment; filename="nachweis-' . $v . '.json"');
        header('Cache-Control: no-store');
        sicherheitsheader();
        echo json_encode($x, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT | JSON_THROW_ON_ERROR);
        exit;
    }
    $vg = $x['vorgang'];
    $p = $x['pruefung'];
    $eintraege = '';
    foreach ($x['kette'] as $e) {
        if (!property_exists($e, 'inhalt')) continue;
        $eintraege .= '<section class="nachweis-eintrag"><h3>Nr. ' . h((string)$e->seq) . ' · ' . h((string)$e->typ) . ' · ' . h((string)$e->zeit) . '</h3>'
            . '<p class="hash">Prüfwert: ' . h((string)$e->hash) . '<br>vorher: ' . h((string)$e->vorher) . '<br>Inhalt SHA-256: ' . h((string)$e->inhalt_sha256) . '</p>'
            . ($e->inhalt === null ? '<p>Inhalt geschwärzt (' . h((string)($e->geschwaerzt ?? '')) . ')</p>' : '<pre>' . h(json_encode($e->inhalt, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT)) . '</pre>') . '</section>';
    }
    $mails = '';
    foreach ($x['mails'] as $datei => $m) {
        $eml = base64_decode($m['eml_base64']);
        [$kopf, $koerper] = array_pad(explode("\r\n\r\n", $eml, 2), 2, '');
        $kz = @iconv_mime_decode_headers($kopf, ICONV_MIME_DECODE_CONTINUE_ON_ERROR, 'UTF-8') ?: [];
        $kopfText = implode("\n", array_map(fn($k, $w) => "$k: " . (is_array($w) ? implode(', ', $w) : $w), array_keys($kz), $kz));
        $mails .= '<section class="nachweis-eintrag"><h3>' . h($datei) . '</h3><p class="hash">SHA-256 der Datei: ' . h($m['sha256']) . '</p><pre>' . h($kopfText) . "\n\n" . h(quoted_printable_decode($koerper)) . '</pre></section>';
    }
    seite(200, "Nachweis $vg[vorgang]", '<p class="eyebrow">Nachweis · erstellt ' . h(fmt(new \DateTimeImmutable($x['erstellt']), 'd.m.Y H:i:s')) . '</p><h1>Nachweis zu Vorgang ' . h($vg['vorgang']) . '</h1>'
        . vorgang_info_html($vg)
        . '<h2 class="mt-28">Prüfung der Nachweiskette</h2><p class="lede">' . ($p['ok'] ? 'Kette unverändert: ' : 'FEHLER in der Kette: ') . h((string)$p['anzahl']) . ' Einträge, letzter Eintrag Nr. ' . h((string)($p['kopf']['seq'] ?? '–')) . '.</p>'
        . '<p class="hash">Kettenkopf: ' . h((string)($p['kopf']['hash'] ?? '')) . '</p>'
        . ($p['fehler'] ? '<ul>' . implode('', array_map(fn($f) => '<li>' . h($f) . '</li>', $p['fehler'])) . '</ul>' : '')
        . '<p class="klein">Unabhängig prüfen: Nachweis-Datei (JSON) herunterladen und <code>php nachweis-pruefen.php --export nachweis-' . h($vg['vorgang']) . '.json</code> ausführen. Der Prüfwert des Vertragsschlusses steht auch in der Bestätigungs-Mail an den Interessenten.</p>'
        . '<h2 class="mt-28">Einträge</h2>' . $eintraege . '<h2 class="mt-28">E-Mail-Kopien</h2>' . ($mails ?: '<p>keine</p>'));
}

function admin_kette(): never
{
    $r = kette_pruefen(kette_lesen(daten('nachweise')));
    $anker = get_text('anker', 70);
    if ($anker !== '' && preg_match('/^[0-9a-f]{64}$/D', $anker)) $r = kette_pruefen(kette_lesen(daten('nachweise')), [$anker]);
    seite(200, 'Nachweiskette', admin_kopf('Nachweiskette')
        . '<p class="lede">' . ($r['ok'] ? 'Die Kette ist vollständig und unverändert.' : 'Die Kette ist NICHT in Ordnung.') . '</p>'
        . '<table class="daten"><tbody><tr><th>Einträge</th><td>' . h((string)$r['anzahl']) . '</td></tr><tr><th>geschwärzt (gelöscht)</th><td>' . h((string)$r['geschwaerzt']) . '</td></tr>'
        . '<tr><th>Kopf</th><td class="hash">Nr. ' . h((string)($r['kopf']['seq'] ?? '–')) . '<br>' . h((string)($r['kopf']['hash'] ?? '')) . '</td></tr></tbody></table>'
        . ($r['fehler'] ? '<ul>' . implode('', array_map(fn($f) => '<li>' . h($f) . '</li>', $r['fehler'])) . '</ul>' : '')
        . ($r['anker'] ? '<p>Anker ' . h($r['anker'][0]['hash']) . ': ' . ($r['anker'][0]['seq'] ? 'gefunden bei Nr. ' . h((string)$r['anker'][0]['seq']) : 'NICHT gefunden') . '</p>' : '')
        . '<form method="get" action="/expose-admin.php" class="formular mt-14"><input type="hidden" name="seite" value="kette"><div class="feld"><label for="a-anker">Prüfwert aus einer Mail (Anker)</label><input id="a-anker" name="anker" type="text" maxlength="64"></div><div class="absenden"><button class="btn btn-hell" type="submit">Anker prüfen</button></div></form>');
}
