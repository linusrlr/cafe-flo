// Nur gebaute, indexierbare Seiten (Produktion: nur veroeffentlichen.yaml)
import { alleSeiten, VORSCHAU } from '../lib/inhalte.mjs';
export function GET() {
  const urls = VORSCHAU ? [] : alleSeiten().filter((s) => s.gebaut && !s.noindex && s.typ !== 'fehler');
  const body = urls.map((s) => `<url><loc>https://roessler-immo.de${s.url}</loc><lastmod>${s.aktualisiertAm ?? s.standIso}</lastmod></url>`).join('');
  return new Response(`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${body}</urlset>\n`, { headers: { 'Content-Type': 'application/xml' } });
}
