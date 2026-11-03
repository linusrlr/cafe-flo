<?php
// Lokaler Server wie nginx: /pfad/ → DOCROOT/pfad/index.html, unbekannt → 404.html mit Status 404, nur kontakt.php/bewertung.php ausführen.
$root = $_SERVER['DOCUMENT_ROOT'];
$pfad = urldecode(parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH));
if (str_contains($pfad, '..')) { http_response_code(400); exit; }
if (preg_match('#^/(kontakt|bewertung)\.php$#', $pfad)) return false;
if (str_ends_with($pfad, '.php') || str_starts_with($pfad, '/_formular/') || preg_match('#/\.#', $pfad)) { http_response_code(404); readfile("$root/404.html"); exit; }
if ($pfad === '/e') { http_response_code(204); exit; }
$datei = $root . $pfad;
if (is_dir($datei)) {
  if (!str_ends_with($pfad, '/')) { header('Location: ' . $pfad . '/', true, 301); exit; }
  $datei .= 'index.html';
}
if (is_file($datei)) {
  $typen = ['html' => 'text/html; charset=utf-8', 'css' => 'text/css', 'js' => 'text/javascript', 'svg' => 'image/svg+xml', 'xml' => 'application/xml', 'txt' => 'text/plain; charset=utf-8',
    'woff2' => 'font/woff2', 'avif' => 'image/avif', 'webp' => 'image/webp', 'jpg' => 'image/jpeg', 'png' => 'image/png', 'ico' => 'image/x-icon', 'json' => 'application/json', 'webmanifest' => 'application/manifest+json'];
  $ext = strtolower(pathinfo($datei, PATHINFO_EXTENSION));
  header('Content-Type: ' . ($typen[$ext] ?? 'application/octet-stream'));
  readfile($datei);
  exit;
}
http_response_code(404);
header('Content-Type: text/html; charset=utf-8');
readfile("$root/404.html");
