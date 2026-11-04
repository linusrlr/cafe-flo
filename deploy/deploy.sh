#!/usr/bin/env bash
# Ausliefern von site/dist per rsync über SSH. Wird von `npm run veroeffentlichen` nach grünem `npm run pruefen` aufgerufen.
# Ziel aus Umgebungsvariablen (z. B. in ~/.roessler-deploy.env, wird automatisch gelesen):
#   DEPLOY_HOST=…  DEPLOY_USER=…  DEPLOY_PATH=/var/www/roessler-immo/web   [DEPLOY_PORT=22]  [DEPLOY_KEY=~/.ssh/id_ed25519]
set -euo pipefail
cd "$(dirname "$0")/../site"
[ -f "$HOME/.roessler-deploy.env" ] && . "$HOME/.roessler-deploy.env"
: "${DEPLOY_HOST:?DEPLOY_HOST fehlt (siehe LAPTOP-SESSION.md, Schritt Server-Zugang)}"
: "${DEPLOY_USER:?DEPLOY_USER fehlt}"
: "${DEPLOY_PATH:?DEPLOY_PATH fehlt}"
PORT="${DEPLOY_PORT:-22}"
SSH="ssh -p $PORT ${DEPLOY_KEY:+-i $DEPLOY_KEY} -o StrictHostKeyChecking=accept-new"
ZIEL="$DEPLOY_USER@$DEPLOY_HOST:$DEPLOY_PATH"
[ -f dist/index.html ] || { echo "dist/index.html fehlt: erst npm run pruefen (Startseite in veroeffentlichen.yaml?)"; exit 1; }
grep -q '/testseite/' dist/sitemap-0.xml && { echo "dist enthält die Testseite (Prüflauf). Erst npm run build:prod ohne Testliste."; exit 1; }
echo "Ausliefern nach $ZIEL"
# 1. neue gehashte Assets zuerst, ohne zu löschen; 2. HTML und Rest, alte Dateien danach entfernen
rsync -rlptz --checksum --exclude='*.html' --exclude='*.html.gz' -e "$SSH" dist/ "$ZIEL/"
# Exposé-Dateien liegen ebenfalls im Webroot und werden separat ausgeliefert: vor dem Löschen schützen (siehe expose/deploy/WEBHOSTING.md).
EXPOSE_SCHUTZ=('--filter=P /objekte/' '--filter=P /expose-recht/' '--filter=P /vertrag-widerrufen/' '--filter=P /expose-assets/' '--filter=P /anfrage.php' '--filter=P /expose.php' '--filter=P /widerruf.php' '--filter=P /freigabe.php' '--filter=P /expose-admin.php' '--filter=P /.user.ini')
rsync -rlptz --checksum --delete-after "${EXPOSE_SCHUTZ[@]}" -e "$SSH" dist/ "$ZIEL/"
echo "Rauchtest:"
curl -fsS -o /dev/null -w 'Start: HTTP %{http_code}\n' https://roessler-immo.de/ || true
curl -fsS -o /dev/null -w 'GET kontakt.php: HTTP %{http_code} (erwartet 303)\n' https://roessler-immo.de/kontakt.php || true
