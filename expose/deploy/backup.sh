#!/usr/bin/env bash
# Verschlüsselte Sicherung der Exposé-Daten (Nachweiskette, Mail-Kopien, Vorgänge).
# Verschlüsselt wird mit einem ÖFFENTLICHEN Schlüssel (X.509-Zertifikat, OpenSSL CMS, AES-256).
# Der private Schlüssel liegt nur bei Linus (Laptop/Passwortmanager), nie auf dem Server:
# Wer den Server übernimmt, kann alte Sicherungen nicht lesen.
#
#   backup.sh schluessel <ordner>                    (LAPTOP, einmalig) Schlüsselpaar erzeugen, privat mit Passwort
#   backup.sh sichern <expose-daten> <backup-ordner> <backup-zertifikat.pem> [anzahl=30]   (SERVER, Cron)
#   backup.sh entschluesseln <datei.tar.gz.cms> <backup-privat.pem> [zielordner]          (LAPTOP)
#
# Abholen (LAPTOP, z. B. wöchentlich): rsync -av USER@SERVER:expose-backup/ ~/Sicherungen/expose/
# Danach prüfen: backup.sh entschluesseln … && php expose-backend/werkzeuge/nachweis-pruefen.php --daten <ziel>/expose-daten
set -euo pipefail
umask 077

befehl="${1:-}"; shift || true
case "$befehl" in
  schluessel)
    ordner="${1:?Ordner angeben}"
    mkdir -p "$ordner"
    openssl req -x509 -newkey rsa:4096 -sha256 -days 36500 -subj "/CN=roessler-expose-backup" \
      -keyout "$ordner/backup-privat.pem" -out "$ordner/backup-zertifikat.pem" ${BACKUP_OHNE_PASSWORT:+-nodes}
    chmod 600 "$ordner/backup-privat.pem"
    echo "Erzeugt: $ordner/backup-zertifikat.pem (auf den Server kopieren) und $ordner/backup-privat.pem (NUR auf dem Laptop + Passwortmanager)."
    ;;
  sichern)
    daten="${1:?Datenordner}"; ziel="${2:?Backup-Ordner}"; zert="${3:?Zertifikat}"; behalten="${4:-30}"
    [ -d "$daten/nachweise" ] || { echo "Kein Datenordner: $daten" >&2; exit 2; }
    mkdir -p "$ziel"
    stempel="$(date +%Y%m%d-%H%M%S)"
    kopf="$(cat "$daten"/nachweise/[0-9]*.jsonl 2>/dev/null | tail -n 1 | sed -n 's/.*"hash":"\([0-9a-f]\{64\}\)".*/\1/p' | cut -c1-12)"
    datei="$ziel/expose-daten-$stempel-${kopf:-leer}.tar.gz.cms"
    # Lesesperre auf die Nachweiskette (gleiche Sperrdatei wie PHP), damit keine halbe Zeile gesichert wird
    sperre="$daten/nachweise/.lock"; touch "$sperre"
    packen() { tar -C "$(dirname "$daten")" --exclude="$(basename "$daten")/ratelimit" --exclude="$(basename "$daten")/sitzungen" -czf - "$(basename "$daten")"; }
    if command -v flock >/dev/null 2>&1; then
      exec 9<"$sperre"; flock -s 9
      packen > "$datei.tar.tmp"
      flock -u 9
    else
      packen > "$datei.tar.tmp"
    fi
    openssl cms -encrypt -binary -aes256 -outform DER -in "$datei.tar.tmp" -out "$datei.tmp" "$zert"
    rm -f "$datei.tar.tmp"
    mv "$datei.tmp" "$datei"
    ( cd "$ziel" && sha256sum "$(basename "$datei")" > "$(basename "$datei").sha256" )
    # alte Sicherungen entfernen (die neuesten $behalten bleiben)
    ls -1t "$ziel"/expose-daten-*.tar.gz.cms 2>/dev/null | tail -n +"$((behalten + 1))" | while read -r alt; do rm -f "$alt" "$alt.sha256"; done
    echo "Gesichert: $datei"
    ;;
  entschluesseln)
    datei="${1:?Datei}"; schl="${2:?privater Schlüssel}"; ziel="${3:-.}"
    if [ -f "$datei.sha256" ]; then ( cd "$(dirname "$datei")" && sha256sum -c "$(basename "$datei").sha256" ); fi
    mkdir -p "$ziel"
    openssl cms -decrypt -binary -inform DER -in "$datei" -inkey "$schl" ${BACKUP_PASSWORT_DATEI:+-passin file:$BACKUP_PASSWORT_DATEI} | tar -C "$ziel" -xzf -
    echo "Entpackt nach $ziel"
    ;;
  *)
    sed -n '2,14p' "$0"; exit 2 ;;
esac
