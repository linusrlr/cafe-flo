// Vorabprüfung für `npm run veroeffentlichen`: keine Testlisten, Pflichtseiten freigegeben, Server-Zugang gesetzt.
import { existsSync, readFileSync } from 'node:fs';
import { homedir } from 'node:os';
import path from 'node:path';
import { parse } from 'yaml';
const fehler = [];
if (process.env.VEROEFFENTLICHEN || process.env.EXTRA_INHALTE) fehler.push('VEROEFFENTLICHEN/EXTRA_INHALTE sind gesetzt (Prüflauf). Für den echten Livegang ohne diese Variablen starten.');
const urls = (parse(readFileSync('veroeffentlichen.yaml', 'utf8')) ?? {}).seiten ?? [];
for (const u of ['/', '/impressum/', '/datenschutz/']) if (!urls.includes(u)) fehler.push(`${u} fehlt in veroeffentlichen.yaml (Pflicht für den Livegang).`);
const env = path.join(homedir(), '.roessler-deploy.env');
const hat = (k) => process.env[k] || (existsSync(env) && new RegExp(`^${k}=`, 'm').test(readFileSync(env, 'utf8')));
for (const k of ['DEPLOY_HOST', 'DEPLOY_USER', 'DEPLOY_PATH']) if (!hat(k)) fehler.push(`${k} fehlt (in ~/.roessler-deploy.env eintragen, siehe LAPTOP-SESSION.md).`);
if (fehler.length) { console.error('Nicht veröffentlicht:\n' + fehler.map((f) => '  - ' + f).join('\n')); process.exit(1); }
console.log(`Vorabprüfung ok: ${urls.length} Seiten freigegeben.`);
