<?php
// Testkonfiguration: Mails als Dateien, Daten unter tests/.daten, Limits je Testlauf-Kennung (Header X-Testlauf).
return [
  'transport' => 'datei',
  'test_modus' => true,
  'absender' => ['adresse' => 'anfrage@roessler-immo.de', 'name' => 'Website Rössler Immobilien'],
  'empfaenger' => 'linus@roessler-immo.de',
  'bestaetigung_absender' => ['adresse' => 'linus@roessler-immo.de', 'name' => 'Linus Rössler'],
  'hmac_geheim' => 'test-geheimnis-nur-lokal',
  'daten' => __DIR__ . '/.daten',
  'webroot' => $_SERVER['DOCUMENT_ROOT'] ?: dirname(__DIR__) . '/dist',
  'herkunft' => ['http://127.0.0.1:4321', 'http://127.0.0.1:4399', 'https://roessler-immo.de'],
  'csv_aktiv' => true,
];
