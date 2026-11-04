<?php
// Vorlage für expose-backend/config.php (NUR auf dem Server anlegen, nicht ins Repo, chmod 600).
// Liegt außerhalb des Webroots: z. B. /var/www/vhosts/roessler-immo.de/expose-backend/config.php (netcup Webhosting)
// oder /var/www/roessler-immo/expose-backend/config.php (vServer).
//
// GEHEIMNISSE stehen NICHT hier, sondern in geheimnisse.php daneben (chmod 600). Erzeugen mit
//   php deploy/geheimnisse-erzeugen.php /pfad/zu/expose-backend --admin-passwort --smtp-passwort
// geheimnisse.php enthält: 'geheim' (HMAC-Schlüssel), 'admin' => ['passwort_hash'], 'mail' => ['smtp' => ['pass']].
return [
    // 'produktion' (Standard, prüft HTTPS, Schlüssellänge, Datenordner außerhalb des Webroots) | 'test' (nur lokal)
    'modus'       => 'produktion',
    // Öffentliche Adresse der Website (ohne Schrägstrich am Ende); für Links in E-Mails
    'basis_url'   => 'https://roessler-immo.de',
    // Erlaubte Herkunft (Origin/Referer) bei POST
    'origin'      => ['https://roessler-immo.de', 'https://www.roessler-immo.de'],
    // HTTPS zusätzlich in PHP erzwingen (nginx leitet ohnehin um). Hinter einem fremden Proxy: 'hinter_proxy' => true
    'https_erzwingen' => true,
    'hinter_proxy'    => false,
    // HSTS für PHP-Antworten; wie die Hauptseite erst kurz, nach einer Woche ohne Fehler 'max-age=31536000; includeSubDomains'
    'hsts'        => 'max-age=300; includeSubDomains',
    // Datenordner außerhalb des Webroots (chmod 700): Nachweise, Vorgänge, Rate-Limit, Sitzungen, Log
    'daten'       => '/var/www/vhosts/roessler-immo.de/expose-daten',
    'zeitzone'    => 'Europe/Berlin',
    // Mindestens so viel freier Speicher, sonst nimmt das Formular nichts mehr an (Schutz vor vollem Datenträger)
    'min_frei_mb' => 200,

    // Exposé-Freigabe: null = Einstellung aus firma.yaml/objekt.yaml; 'automatisch' | 'manuell' erzwingt global
    'freigabe_modus' => null,
    // Höchstzahl Abrufe je Exposé-Link (gegen massenhafte Weitergabe), 0 = unbegrenzt
    'max_abrufe'  => 60,

    // Rate-Limits [Anzahl, Sekunden]; Standardwerte stehen in backend/lib/kern.php (konfig_pruefen). Nur Abweichungen eintragen:
    'limits'      => [
        // 'ip' => [[5, 600], [20, 86400]],
        // 'global' => [[60, 3600], [300, 86400]],
    ],

    // IP im Nachweisprotokoll: 'gekuerzt+hmac' (Standard) | 'gekuerzt' | 'keine'  (recherche.md 1.5)
    'ip_modus'    => 'gekuerzt+hmac',

    // Admin-Übersicht /expose-admin.php: aktiv, sobald geheimnisse.php einen passwort_hash enthält.
    'admin' => [
        'benutzer'       => 'linus',
        // Nur diese Netze dürfen die Übersicht öffnen (leer = alle). Beispiel: ['203.0.113.17', '2001:db8:1234::/48']
        'ip_erlaubt'     => [],
        'sitzung_minuten'     => 30,   // Abmeldung nach Leerlauf
        'sitzung_max_stunden' => 8,    // Abmeldung spätestens nach
    ],

    // Tagesanker (werkzeuge/anker.php): zusätzliche Empfänger, am besten ein Postfach bei einem anderen Anbieter
    'anker_an'    => [],

    'mail' => [
        // 'smtp' (empfohlen) | 'mail' (PHP mail(), nur wenn der Server selbst DKIM signiert) | 'datei' (nur Test)
        'transport'     => 'smtp',
        'absender'      => 'anfrage@roessler-immo.de',      // From und Envelope-From (SPF/DKIM/DMARC: deploy/DNS-MAIL.md)
        'absender_name' => 'Linus Rössler',
        'antwort_an'    => 'linus@roessler-immo.de',
        'an_linus'      => 'linus@roessler-immo.de',
        // netcup: Postausgangsserver aus dem Webhosting-/Mail-Panel (z. B. mxNNNN.netcup.net); Port 587 mit STARTTLS
        // oder 465 mit 'sicherheit' => 'ssl'. Das Zertifikat wird immer geprüft.
        'smtp' => ['host' => 'mxXXXX.netcup.net', 'port' => 587, 'sicherheit' => 'starttls',
                   'user' => 'anfrage@roessler-immo.de' /* 'pass' steht in geheimnisse.php */],
    ],
];
