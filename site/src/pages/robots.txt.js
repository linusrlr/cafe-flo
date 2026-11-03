import { VORSCHAU } from '../lib/inhalte.mjs';
export function GET() {
  const t = VORSCHAU ? 'User-agent: *\nDisallow: /\n' : 'User-agent: *\nAllow: /\n\nSitemap: https://roessler-immo.de/sitemap-index.xml\n';
  return new Response(t, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
}
