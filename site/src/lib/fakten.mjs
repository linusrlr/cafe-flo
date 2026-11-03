// Fakten aus bauplan/fakten.yaml (einzige Quelle für veränderliche Werte).
// Platzhalter in Texten: {{fakten.pfad}}, {{fakten.pfad.feld}}, {{fakten.pfad.datum|lang}}, {{fakten.pfad.stand|monat}}
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { parse } from 'yaml';

const HIER = path.dirname(fileURLToPath(import.meta.url));
export const REPO = path.resolve(HIER, '../../..');
export const FAKTEN_DATEI = path.join(REPO, 'bauplan/fakten.yaml');

export const F = parse(readFileSync(FAKTEN_DATEI, 'utf8'));
export const PLATZHALTER = /(?<!\\)\{\{\s*fakten\.([a-z0-9_.]+)(?:\|(lang|monat))?\s*\}\}/g;

const MONATE = ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'];

function alsDatum(v) {
  if (v instanceof Date) return v;
  if (typeof v === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(v)) return new Date(v + 'T12:00:00Z');
  return null;
}

export function formatiere(v, filter) {
  const d = alsDatum(v);
  if (d) {
    const t = d.getUTCDate(), m = d.getUTCMonth(), j = d.getUTCFullYear();
    if (filter === 'lang') return `${t}. ${MONATE[m]} ${j}`;
    if (filter === 'monat') return `${MONATE[m]} ${j}`;
    return `${String(t).padStart(2, '0')}.${String(m + 1).padStart(2, '0')}.${j}`;
  }
  if (Array.isArray(v)) return v.join(', ');
  return String(v);
}

/**
 * Löst einen Pfad auf. Liefert { text, blatt, problem }.
 * problem: null | 'leer' | 'offen' | 'zu_pruefen'. Unbekannte Pfade werfen einen Fehler.
 */
export function loese(pfad, filter) {
  const teile = pfad.split('.');
  let knoten = F, blatt = null;
  const rest = [];
  for (const t of teile) {
    if (blatt) { rest.push(t); continue; }
    knoten = knoten?.[t];
    if (knoten === undefined) throw new Error(`Unbekannter Fakt: fakten.${pfad}`);
    if (knoten && typeof knoten === 'object' && 'wert' in knoten) blatt = knoten;
  }
  if (!blatt) throw new Error(`fakten.${pfad} ist kein Blatt (Objekt mit "wert")`);
  if (rest.length && !(rest[0] in blatt)) throw new Error(`Unbekanntes Feld: fakten.${pfad}`);
  const v = rest.length ? blatt[rest[0]] : blatt.wert;
  let problem = null;
  if (v === null || v === undefined) problem = 'leer';
  else if (blatt.status === 'offen' || blatt.status === 'zu_pruefen') problem = blatt.status;
  return { text: v === null || v === undefined ? '' : formatiere(v, filter), blatt, problem };
}

/** Text mit Platzhaltern auflösen. Probleme werden als Marker-Text eingesetzt, damit sie wie [LINUS]/[ZU PRÜFEN] behandelt werden. */
export function loeseText(s) {
  return String(s).replace(PLATZHALTER, (_, p, f) => {
    const r = loese(p, f);
    if (r.problem === 'leer') return `[LINUS: Wert fehlt in bauplan/fakten.yaml: ${p}]`;
    if (r.problem) return `${r.text} [ZU PRÜFEN: bauplan/fakten.yaml ${p} hat status ${r.problem}]`;
    return r.text;
  });
}

/** Wie loeseText, aber ohne Marker (für JSON-LD, Mails): Probleme ergeben null. */
export function wertOderNull(pfad) {
  try { const r = loese(pfad); return r.problem === 'leer' ? null : r.text; } catch { return null; }
}

// ---------------------------------------------------------------------------
// Firma
export const firma = {
  name: F.firma.name.wert,
  inhaber: F.firma.inhaber.wert,
  telefon: F.firma.telefon.wert,
  telefonHref: F.firma.telefon.href,
  telefonSchema: F.firma.telefon.schema,
  email: F.firma.email.wert,
  domain: F.firma.domain.wert,
  anschrift: F.firma.anschrift.wert,
  erreichbarkeit: F.firma.erreichbarkeit.wert,
  antwortzeit: F.firma.antwortzeit.wert,
  orte: F.firma.orte.liste,
};
export const telefonNbsp = firma.telefon.replace(/ /g, ' ');

// ---------------------------------------------------------------------------
// Erlaubnis-Bausteine A bis E (07-recht-erlaubnis.md Abschnitt 9), Umschaltung nach Baustein F
export const erlaubnisStatus = F.erlaubnis.status.wert; // 'beantragt' | 'erteilt'
export const erlaubnisErteilt = erlaubnisStatus === 'erteilt';

/** Liefert den Text (noch mit Platzhaltern) oder null, wenn der Baustein entfällt. */
export function bausteinRoh(x) {
  const e = F.erlaubnis;
  if (!erlaubnisErteilt) return e[`baustein_${x}`]?.wert ?? null;
  if (x === 'a') return null;
  if (x === 'd' || x === 'e') return e.baustein_e.wert; // Impressum: fehlende Angaben werden zu Markern und blockieren
  if (x === 'b') {
    // Vertrauenszeile: solange Datum/Behörde nicht geprüft eingetragen sind, schlichter Satz ohne Marker
    const ok = e.erteilt_am.wert && e.behoerde.status === 'geprueft';
    return ok ? e.baustein_b.wert_erteilt : 'Immobilienmakler mit Erlaubnis nach § 34c GewO.';
  }
  return e[`baustein_${x}`]?.wert_erteilt ?? null;
}
export function autorzeile() {
  const t = F.erlaubnis.text_autorzeile;
  return erlaubnisErteilt ? t.wert_erteilt : t.wert;
}

/**
 * Bekannte Wortlaute der Bausteine A, B, C, wie sie heute literal in texte/*.md stehen.
 * Der Lade-Code ersetzt sie durch den zentralen Baustein (Abweichung von der Migration
 * ::erlaubnis{baustein=…}, weil texte/ derzeit nicht geändert werden darf).
 */
export function bekannteWortlaute() {
  const e = F.erlaubnis;
  const liste = [];
  for (const x of ['a', 'b', 'c']) {
    for (const feld of ['wert', 'wert_erteilt']) {
      const roh = e[`baustein_${x}`]?.[feld];
      if (!roh) continue;
      // Platzhalter durch ihre Werte ersetzen (ohne Marker), damit der Abgleich mit dem Text klappt
      const klar = roh.replace(PLATZHALTER, (_, p, f) => { try { return loese(p, f).text; } catch { return ''; } });
      if (/\{\{|\s{2}/.test(klar) || klar.includes('erteilt am  ')) continue;
      liste.push({ baustein: x, text: klar });
    }
  }
  return liste;
}

// ---------------------------------------------------------------------------
// Ortsnamen
export const ORTE = { leonberg: 'Leonberg', pforzheim: 'Pforzheim', heimsheim: 'Heimsheim', ditzingen: 'Ditzingen', renningen: 'Renningen' };

/** Jüngster Stand der Marktdaten (angebotspreise_etw) für den Footer. */
export function standMarktdaten() {
  let max = null;
  const lauf = (k) => {
    if (!k || typeof k !== 'object') return;
    if ('wert' in k && k.stand) { const d = String(k.stand); if (/^\d{4}-\d{2}-\d{2}$/.test(d) && (!max || d > max)) max = d; return; }
    for (const v of Object.values(k)) lauf(v);
  };
  lauf(F.angebotspreise_etw);
  return max ? formatiere(max, 'monat') : null;
}
