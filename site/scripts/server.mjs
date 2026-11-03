// Startet die gebaute Seite lokal mit PHP (Formulare funktionieren, Mails landen als .eml in tests/.daten/test-mails).
// Aufruf: node scripts/server.mjs [dist|dist-vorschau] [port]
import { spawn } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const site = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dir = process.argv[2] ?? 'dist-vorschau';
const port = process.argv[3] ?? '4321';
console.log(`Seite: http://127.0.0.1:${port}/  (Ordner ${dir}, Beenden mit Strg+C)`);
const p = spawn('php', ['-S', `127.0.0.1:${port}`, '-t', path.join(site, dir), path.join(site, 'tests/router.php')], {
  stdio: 'inherit', env: { ...process.env, FORMULAR_CONFIG: path.join(site, 'tests/config.test.php') },
});
p.on('exit', (c) => process.exit(c ?? 0));
