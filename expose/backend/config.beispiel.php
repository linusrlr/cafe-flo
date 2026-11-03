<?php
// Vorlage für expose-backend/config.php (NUR auf dem Server anlegen, nicht ins Repo, chmod 600).
// Liegt außerhalb des Webroots: ~/roessler-immo/expose-backend/config.php
return [
    // Öffentliche Adresse der Website (ohne Schrägstrich am Ende); für Links in E-Mails
    'basis_url'   => 'https://roessler-immo.de',
    // Erlaubter Origin-Header bei POST (Schutz gegen fremde Formulare)
    'origin'      => ['https://roessler-immo.de', 'https://www.roessler-immo.de'],
    // Geheimer Schlüssel für Tokens, IP-Prüfwerte und Freigabe-Links: mind. 32 zufällige Zeichen
    //   php -r 'echo bin2hex(random_bytes(32)), PHP_EOL;'
    // Wird er geändert, werden alle bisherigen Exposé-Links ungültig.
    'geheim'      => 'HIER-64-ZUFAELLIGE-HEX-ZEICHEN-EINTRAGEN',
    // Datenordner außerhalb des Webroots (chmod 700): Nachweise, Vorgänge, Widerrufe, Rate-Limit, Log
    'daten'       => '/home/USER/roessler-immo/expose-daten',
    'zeitzone'    => 'Europe/Berlin',

    // Exposé-Freigabe: null = Einstellung aus firma.yaml/objekt.yaml; 'automatisch' | 'manuell' erzwingt global
    'freigabe_modus' => null,
    // Höchstzahl Abrufe je Exposé-Link (gegen massenhafte Weitergabe), 0 = unbegrenzt
    'max_abrufe'  => 60,

    // Rate-Limit: [Anzahl, Sekunden]; je IP (nur als HMAC gespeichert) und je E-Mail-Adresse und Objekt
    'limits'      => ['ip' => [[5, 600], [20, 86400]], 'email' => [[3, 86400]]],

    // IP im Nachweisprotokoll: 'gekuerzt+hmac' (Standard) | 'gekuerzt' | 'keine'  (recherche.md 1.5)
    'ip_modus'    => 'gekuerzt+hmac',

    'mail' => [
        // 'smtp' (empfohlen, PHPMailer) | 'mail' (PHP mail()) | 'datei' (Test: schreibt .eml nach daten/test-mails)
        'transport'     => 'smtp',
        'absender'      => 'anfrage@roessler-immo.de',      // Envelope-From, DMARC (bauplan/02-formular-backend.md 6.2)
        'absender_name' => 'Linus Rössler',
        'antwort_an'    => 'linus@roessler-immo.de',
        'an_linus'      => 'linus@roessler-immo.de',
        'smtp' => ['host' => 'mail.roessler-immo.de', 'port' => 587, 'secure' => 'tls',
                   'user' => 'anfrage@roessler-immo.de', 'pass' => '…'],
        'phpmailer_autoload' => '/home/USER/roessler-immo/formular/vendor/autoload.php',
    ],
];
