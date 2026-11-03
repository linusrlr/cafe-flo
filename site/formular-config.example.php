<?php
// VORLAGE. Auf dem Server als formular-config.php NEBEN den Webroot legen (nicht hinein!), chmod 600:
//   ~/roessler-immo/web/                  ← Webroot (Inhalt von site/dist)
//   ~/roessler-immo/formular-config.php   ← diese Datei, ausgefüllt
//   ~/roessler-immo/formular-daten/       ← wird automatisch angelegt (chmod 700)
// Andere Lage: Umgebungsvariable FORMULAR_CONFIG im PHP-FPM-Pool setzen.
return [
  'transport'   => 'smtp',                       // 'smtp' oder 'datei' (nur Test: .eml nach daten/test-mails)
  'smtp'        => ['host' => 'mail.roessler-immo.de', 'port' => 587, 'secure' => 'tls',   // 'ssl' für Port 465
                    'user' => 'anfrage@roessler-immo.de', 'pass' => 'HIER-PASSWORT'],
  'absender'    => ['adresse' => 'anfrage@roessler-immo.de', 'name' => 'Website Rössler Immobilien'],
  'empfaenger'  => 'linus@roessler-immo.de',
  // Lehnt der SMTP-Server From: linus@ bei Anmeldung als anfrage@ ab, hier anfrage@ eintragen (02-formular-backend.md 6.2)
  'bestaetigung_absender' => ['adresse' => 'linus@roessler-immo.de', 'name' => 'Linus Rössler'],
  'hmac_geheim' => 'HIER-64-ZUFALLSZEICHEN',     // z. B. openssl rand -hex 32
  'daten'       => __DIR__ . '/formular-daten',
  'webroot'     => __DIR__ . '/web',
  'herkunft'    => ['https://roessler-immo.de'],
  'csv_aktiv'   => false,
];
