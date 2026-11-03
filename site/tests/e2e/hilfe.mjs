import { readdirSync, statSync, existsSync, readFileSync, mkdirSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const SITE = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
export const DIST = path.join(SITE, process.env.DIST ?? 'dist');
export const VORSCHAU = (process.env.DIST ?? 'dist').includes('vorschau');

/** Alle gebauten Seiten (URL-Pfade) aus dem Ausgabeordner. */
export function seiten({ mitDanke = true } = {}) {
  const out = [];
  const lauf = (d) => {
    for (const f of readdirSync(d)) {
      const p = path.join(d, f);
      if (statSync(p).isDirectory()) { if (!f.startsWith('_')) lauf(p); }
      else if (f === 'index.html') out.push('/' + path.relative(DIST, d).replace(/\\/g, '/') + (d === DIST ? '' : '/'));
    }
  };
  lauf(DIST);
  return out.map((u) => u.replace(/^\/\//, '/')).filter((u) => u !== '/formular-fehler/' && (mitDanke || !u.endsWith('/danke/'))).sort();
}
export const gibt = (url) => existsSync(path.join(DIST, url, 'index.html'));

// Mails (Transport "datei"): Zuordnung über den eindeutigen Namen je Test
const MAILS = path.join(SITE, 'tests/.daten/test-mails');
const qp = (s) => s.replace(/=\r?\n/g, '').replace(/=([0-9A-F]{2})/g, (_, h) => String.fromCharCode(parseInt(h, 16)));
function lies(f) {
  const roh = readFileSync(path.join(MAILS, f), 'latin1');
  const [kopf, ...rumpf] = roh.split('\r\n\r\n');
  const headers = {};
  for (const z of kopf.split('\r\n')) { const i = z.indexOf(':'); headers[z.slice(0, i).toLowerCase()] = z.slice(i + 1).trim(); }
  const dec = (v) => v.replace(/=\?UTF-8\?B\?([^?]+)\?=/g, (_, b) => Buffer.from(b, 'base64').toString('utf8'));
  for (const k of Object.keys(headers)) headers[k] = dec(headers[k]);
  return { headers, subject: headers.subject, text: Buffer.from(qp(rumpf.join('\r\n\r\n')), 'latin1').toString('utf8') };
}
export function mailsFuer(name) {
  if (!existsSync(MAILS)) return {};
  const r = {};
  for (const f of readdirSync(MAILS)) {
    const m = lies(f);
    if (!m.text.includes(name)) continue;
    r[f.includes('benachrichtigung') ? 'benachrichtigung' : 'bestaetigung'] = m;
  }
  return r;
}
export const zufallsName = (vor) => `${vor} ${'Test' + Array.from({ length: 6 }, () => 'abcdefghijklmnopqrstuvwxyz'[Math.floor(Math.random() * 26)]).join('')}`;
export const testlauf = () => 'lauf-' + Math.random().toString(36).slice(2);
mkdirSync(MAILS, { recursive: true });
