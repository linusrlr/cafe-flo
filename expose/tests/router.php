<?php
// Router für den lokalen Test mit „php -S“ (bildet nginx grob nach): Webroot = dist/web
$pfad = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$datei = $_SERVER['DOCUMENT_ROOT'] . $pfad;
if (preg_match('#\.php$#', $pfad) && is_file($datei)) return false;          // PHP-Endpunkt
if (is_file($datei)) return false;                                             // statische Datei
if (is_dir($datei) && is_file(rtrim($datei, '/') . '/index.html')) {
    if (!str_ends_with($pfad, '/')) { header('Location: ' . $pfad . '/', true, 301); return true; }
    header('Content-Type: text/html; charset=utf-8');
    readfile(rtrim($datei, '/') . '/index.html');
    return true;
}
http_response_code(404);
echo 'Nicht gefunden';
return true;
