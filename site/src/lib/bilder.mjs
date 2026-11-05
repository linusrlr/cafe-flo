// Fotos auf Orts-, Ratgeber- und Aktuell-Seiten.
// Zuordnung Seite → Bilder: site/bilder.yaml. Lizenzprotokoll: site/bilder-lizenzen.yaml.
// Die Texte in texte/ bleiben unverändert; die Bilder werden beim Rendern an der Position aus bilder.yaml eingefügt.
// Reines Node-ESM (ohne Astro), damit scripts/check-statisch.mjs dieselbe Prüfung nutzt.
import { readFileSync, existsSync } from 'node:fs';
import path from 'node:path';
import { parse as parseYaml } from 'yaml';
import { REPO } from './fakten.mjs';

const SITE = path.join(REPO, 'site');
export const BILDER_ORDNER = path.join(SITE, 'src/assets/bilder');
const PFLICHT_LIZENZ = ['datei', 'original_url', 'quelle', 'quelle_url', 'urheber', 'lizenz', 'lizenz_url', 'abgerufen_am'];
// Freie Lizenzen ohne NC/ND (Auftrag Linus, 05.11.2026)
const ERLAUBT = /^(CC0( 1\.0)?|Public Domain|CC BY(-SA)? (2\.0|2\.5|3\.0|4\.0)( de| DE)?|Unsplash License|Pexels License|Pixabay Content License)$/i;

let _cache = null;
export function ladeBilder() {
  if (_cache) return _cache;
  const zuordnung = parseYaml(readFileSync(path.join(SITE, 'bilder.yaml'), 'utf8')) ?? {};
  const lizenzen = parseYaml(readFileSync(path.join(SITE, 'bilder-lizenzen.yaml'), 'utf8')) ?? {};
  const lizenzVon = new Map((lizenzen.bilder ?? []).map((b) => [b.datei, b]));
  const seiten = new Map();
  for (const s of zuordnung.seiten ?? []) seiten.set(s.url, s.bilder ?? []);
  _cache = { seiten, lizenzVon, lizenzen: lizenzen.bilder ?? [] };
  return _cache;
}

/** Bilder einer Seite, je mit Lizenzeintrag. */
export function bilderFuer(url) {
  const { seiten, lizenzVon } = ladeBilder();
  return (seiten.get(url) ?? []).map((b) => ({ ...b, lizenz: lizenzVon.get(b.datei) }));
}

/** Prüft bilder.yaml und bilder-lizenzen.yaml. Gibt eine Fehlerliste zurück (leer = in Ordnung). */
export function pruefeBilder() {
  const { seiten, lizenzVon, lizenzen } = ladeBilder();
  const fehler = [];
  for (const l of lizenzen) {
    for (const k of PFLICHT_LIZENZ) if (!String(l[k] ?? '').trim()) fehler.push(`bilder-lizenzen.yaml: ${l.datei ?? '?'}: Feld „${k}“ fehlt`);
    if (l.lizenz && !ERLAUBT.test(l.lizenz)) fehler.push(`bilder-lizenzen.yaml: ${l.datei}: Lizenz „${l.lizenz}“ ist nicht freigegeben (keine NC/ND)`);
    if (/\bKI\b|AI generated/i.test(l.hinweise ?? '')) fehler.push(`bilder-lizenzen.yaml: ${l.datei}: als KI-Bild gekennzeichnet`);
    if (l.manuell_herunterladen) continue;
    if (l.datei && !existsSync(path.join(BILDER_ORDNER, l.datei))) fehler.push(`bilder-lizenzen.yaml: ${l.datei}: Datei fehlt in src/assets/bilder/`);
  }
  for (const [url, liste] of seiten) {
    let titel = 0;
    for (const b of liste) {
      const wo = `bilder.yaml: ${url}: ${b.datei ?? '?'}`;
      if (!b.datei) { fehler.push(`${wo}: Feld „datei“ fehlt`); continue; }
      const l = lizenzVon.get(b.datei);
      if (!l) fehler.push(`${wo}: kein Eintrag in bilder-lizenzen.yaml`);
      else if (l.manuell_herunterladen) fehler.push(`${wo}: noch nicht heruntergeladen (manuell_herunterladen)`);
      if (!String(b.alt ?? '').trim()) fehler.push(`${wo}: Alt-Text fehlt`);
      else if (String(b.alt).length > 180) fehler.push(`${wo}: Alt-Text länger als 180 Zeichen`);
      if (!String(b.unterschrift ?? '').trim()) fehler.push(`${wo}: Bildunterschrift fehlt`);
      if (b.position === 'titel') titel++;
      else if (!/^nach Abschnitt .+/.test(String(b.position ?? ''))) fehler.push(`${wo}: position muss „titel“ oder „nach Abschnitt …“ sein`);
    }
    if (titel > 1) fehler.push(`bilder.yaml: ${url}: mehr als ein Titelbild`);
  }
  return fehler;
}

/** Abschnitt (aus rendere()) zu „nach Abschnitt X“: X ist die H2-Überschrift (Anfang genügt) oder ihre ID. */
export function abschnittFuer(position, abschnitte) {
  const x = String(position).replace(/^nach Abschnitt\s+/, '').replace(/^[„"]|[“"]$/g, '').trim();
  return abschnitte.findIndex((a) => a.id === x || a.titel === x || a.titel.startsWith(x));
}

/** Text des Bildnachweises: „Foto: Urheber, Lizenz, via Quelle“ (Teile für die Verlinkung). */
export function nachweis(l) {
  return { urheber: l.urheber, lizenz: l.lizenz, lizenzUrl: l.lizenz_url, quelle: l.quelle, quelleUrl: l.quelle_url };
}

/** Seiten-URLs mit Fotos, die im aktuellen Build gebaut werden (für /bildnachweis/ und den Footer-Link). */
export function gebauteSeitenMitBildern(alleSeiten) {
  const { seiten } = ladeBilder();
  return alleSeiten().filter((s) => s.gebaut && (seiten.get(s.url) ?? []).length);
}
