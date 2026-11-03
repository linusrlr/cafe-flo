// Nach dem Astro-Build: Formulardaten für PHP, CSP-Hash des Inline-Skripts prüfen, .gz vorkomprimieren.
// Aufruf: node scripts/nach-build.mjs <ausgabeordner>
import { readFileSync, writeFileSync, readdirSync, statSync, existsSync, mkdirSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { gzipSync } from 'node:zlib';
import path from 'node:path';
import { F } from '../src/lib/fakten.mjs';

const dist = path.resolve(process.argv[2] ?? 'dist');
const repo = path.resolve('..');
// 1. Formulardaten für den PHP-Kern
mkdirSync(path.join(dist, '_formular'), { recursive: true });
writeFileSync(path.join(dist, '_formular/formulare.json'), readFileSync('src/data/formulare.json'));
writeFileSync(path.join(dist, '_formular/fakten.json'), JSON.stringify({
  name: F.firma.name.wert, inhaber: F.firma.inhaber.wert, telefon: F.firma.telefon.wert, email: F.firma.email.wert,
  antwortzeit: F.firma.antwortzeit.wert, erlaubnis_status: F.erlaubnis.status.wert,
}, null, 1));

// 2. Inline-Skripte: nur das Hash-Weiterleitungsskript auf / ist erlaubt (CSP mit Hash, 01-technik.md 15.1)
const html = [];
const lauf = (d) => { for (const f of readdirSync(d)) { const p = path.join(d, f); if (statSync(p).isDirectory()) lauf(p); else if (f.endsWith('.html')) html.push(p); } };
lauf(dist);
const hashes = new Set();
for (const f of html) {
  const t = readFileSync(f, 'utf8');
  for (const m of t.matchAll(/<script(?![^>]*\bsrc=)(?![^>]*application\/ld\+json)[^>]*>([\s\S]*?)<\/script>/g)) {
    hashes.add(`'sha256-${createHash('sha256').update(m[1]).digest('base64')}'`);
  }
}
const hashDatei = path.join(repo, 'deploy/csp-hashes.txt');
const erwartet = existsSync(hashDatei) ? readFileSync(hashDatei, 'utf8').split('\n').map((z) => z.trim()).filter((z) => z && !z.startsWith('#')) : [];
const neu = [...hashes].filter((h) => !erwartet.includes(h));
if (neu.length) {
  if (process.argv.includes('--hash-schreiben') || !erwartet.length) {
    writeFileSync(hashDatei, '# Erlaubte Inline-Skripte (CSP script-src). Erzeugt von scripts/nach-build.mjs; in deploy/nginx-roessler-immo.conf eintragen.\n' + [...hashes].join('\n') + '\n');
    console.log(`CSP-Hash geschrieben: ${[...hashes].join(' ')} → deploy/csp-hashes.txt (auch in der nginx-Konfiguration aktualisieren)`);
  } else {
    console.error(`Unbekanntes Inline-Skript (CSP): ${neu.join(' ')}\nFalls gewollt: node scripts/nach-build.mjs ${process.argv[2]} --hash-schreiben und nginx-Konfiguration anpassen.`);
    process.exit(1);
  }
}

// 3. Vorkomprimieren (nginx gzip_static)
let n = 0;
const komp = (d) => {
  for (const f of readdirSync(d)) {
    const p = path.join(d, f);
    if (statSync(p).isDirectory()) { komp(p); continue; }
    if (!/\.(html|css|js|svg|xml|json|txt|webmanifest)$/.test(f) || p.includes('/_formular/')) continue;
    writeFileSync(p + '.gz', gzipSync(readFileSync(p), { level: 9 })); n++;
  }
};
komp(dist);
console.log(`nach-build: ${html.length} HTML-Seiten, ${n} Dateien vorkomprimiert, Inline-Skripte ok.`);
