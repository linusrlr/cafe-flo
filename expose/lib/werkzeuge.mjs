// Formatierung, Platzhalter, Prüfwerte
import crypto from 'node:crypto';

export const sha256 = (s) => crypto.createHash('sha256').update(String(s), 'utf8').digest('hex');

const zahlFmt = (min, max) => new Intl.NumberFormat('de-DE', { minimumFractionDigits: min, maximumFractionDigits: max });
export const zahl = (n, nachkomma = 0) => (n === null || n === undefined || n === '' ? '' : zahlFmt(nachkomma, nachkomma).format(Number(n)));
export const zahlFrei = (n) => (n === null || n === undefined || n === '' ? '' : zahlFmt(0, 2).format(Number(n)));
export const euro = (n, nachkomma = 0) => (n === null || n === undefined || n === '' ? '' : `${zahl(n, nachkomma)} €`);
export const prozent = (p) => `${zahlFmt(2, 2).format(Number(p))} %`;
export const flaeche = (n) => `${zahlFrei(n)} m²`;

export function datum(d) {
  if (!d) return '';
  const x = d instanceof Date ? d : new Date(String(d) + (String(d).length === 10 ? 'T12:00:00Z' : ''));
  if (Number.isNaN(x.getTime())) return String(d);
  return x.toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit', year: 'numeric', timeZone: 'Europe/Berlin' });
}

export function lookup(ctx, pfad) {
  return pfad.split('.').reduce((o, k) => (o === null || o === undefined ? undefined : o[k]), ctx);
}

// {{a.b.c}} ersetzen. Unbekannte Platzhalter sind ein Fehler (keine stillen Lücken in Rechtstexten).
export function fuelle(text, ctx, wo = '') {
  return String(text ?? '').replace(/\{\{\s*([\w.]+)\s*\}\}/g, (m, pfad) => {
    const v = lookup(ctx, pfad);
    if (v === undefined || v === null) throw new Error(`Platzhalter {{${pfad}}} ohne Wert${wo ? ' in ' + wo : ''}`);
    return String(v);
  });
}

export const MARKER_RE = /\[(LINUS|ZU PRÜFEN|ENTWURF)[^\]]*\]/g;

// Energieeffizienzklassen für Wohngebäude nach Endenergie (GEG/GModG Anlage 10), nur Plausibilitätsprüfung.
export const KLASSEN = [['A+', 30], ['A', 50], ['B', 75], ['C', 100], ['D', 130], ['E', 160], ['F', 200], ['G', 250], ['H', Infinity]];
export const KLASSEN_FARBEN = { 'A+': '#1B7A3E', A: '#2E8B3A', B: '#6DA83A', C: '#A6BF35', D: '#E3C42B', E: '#E9A32B', F: '#E07A2A', G: '#D4512A', H: '#B5262A' };
export function klasseFuer(kennwert) {
  for (const [k, max] of KLASSEN) if (Number(kennwert) <= max) return k;
  return 'H';
}
