<?php
// Bewertungsformular (4 Schritte). Logik: _formular/kern.php
declare(strict_types=1);
const FORMULAR_EINSTIEG = true;
require __DIR__ . '/_formular/kern.php';
Formular\verarbeite(['bewertung']);
