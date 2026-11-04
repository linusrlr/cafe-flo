<?php
// Router für den lokalen Test mit „php -S“ (bildet nginx grob nach): Webroot = dist/web
// Wie nginx-expose.conf: Punktdateien gesperrt, nur die bekannten PHP-Endpunkte, Sicherheits-Header für statische Seiten.
$pfad = rawurldecode((string)parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH));
if (str_contains($pfad, '/.') || str_contains($pfad, '..') || str_contains($pfad, "\0")) { http_response_code(404); echo 'Nicht gefunden'; return true; }
$datei = $_SERVER['DOCUMENT_ROOT'] . $pfad;
if (preg_match('#\.php$#', $pfad)) {
    if (in_array($pfad, ['/anfrage.php', '/expose.php', '/widerruf.php', '/freigabe.php', '/expose-admin.php'], true) && is_file($datei)) return false;
    http_response_code(404); echo 'Nicht gefunden'; return true;
}
$csp = "default-src 'self'; script-src 'self'; style-src 'self'; img-src 'self' data:; font-src 'self'; connect-src 'self'; form-action 'self'; base-uri 'none'; object-src 'none'; frame-ancestors 'none'";
$kopf = function () use ($csp) {
    header("Content-Security-Policy: $csp");
    header('X-Content-Type-Options: nosniff');
    header('X-Frame-Options: DENY');
    header('Referrer-Policy: strict-origin-when-cross-origin');
};
if (is_file($datei)) {
    $typ = ['css' => 'text/css; charset=utf-8', 'js' => 'text/javascript; charset=utf-8', 'svg' => 'image/svg+xml', 'woff2' => 'font/woff2', 'html' => 'text/html; charset=utf-8', 'txt' => 'text/plain'][pathinfo($datei, PATHINFO_EXTENSION)] ?? null;
    if ($typ === null) return false;
    $kopf();
    header("Content-Type: $typ");
    readfile($datei);
    return true;
}
if (is_dir($datei) && is_file(rtrim($datei, '/') . '/index.html')) {
    if (!str_ends_with($pfad, '/')) { header('Location: ' . $pfad . '/', true, 301); return true; }
    $kopf();
    header('Content-Type: text/html; charset=utf-8');
    readfile(rtrim($datei, '/') . '/index.html');
    return true;
}
http_response_code(404);
echo 'Nicht gefunden';
return true;
