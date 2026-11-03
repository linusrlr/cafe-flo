import { defineConfig } from 'astro/config';

// Modus: SITE_MODE=vorschau (alle Seiten, Marker sichtbar, noindex) oder produktion (nur veroeffentlichen.yaml)
export default defineConfig({
  site: 'https://roessler-immo.de',
  trailingSlash: 'always',
  build: { format: 'directory', inlineStylesheets: 'never' },
  compressHTML: true,
  devToolbar: { enabled: false },
  vite: { build: { assetsInlineLimit: 0 }, server: { fs: { allow: ['..'] } } },
  image: { responsiveStyles: false },
});
