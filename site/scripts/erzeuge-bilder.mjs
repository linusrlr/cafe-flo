// Einmalig/bei Bedarf: Favicons, OG-Bild, Logo und Porträt für JSON-LD nach public/ schreiben.
// Aufruf: node scripts/erzeuge-bilder.mjs
import sharp from 'sharp';
import { writeFileSync, mkdirSync } from 'node:fs';
const svgIcon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" rx="6" fill="#16233D"/><text x="32" y="45" font-family="Arial, Helvetica, sans-serif" font-weight="700" font-size="38" fill="#fff" text-anchor="middle">R</text></svg>`;
mkdirSync('public/og', { recursive: true });
writeFileSync('public/favicon.svg', svgIcon);
const png = (s) => sharp(Buffer.from(svgIcon)).resize(s, s).png().toBuffer();
writeFileSync('public/apple-touch-icon.png', await png(180));
writeFileSync('public/og/logo-512.png', await png(512));
// favicon.ico: ICO-Container mit einem 32-px-PNG
const p32 = await png(32);
const kopf = Buffer.alloc(22);
kopf.writeUInt16LE(0, 0); kopf.writeUInt16LE(1, 2); kopf.writeUInt16LE(1, 4);
kopf.writeUInt8(32, 6); kopf.writeUInt8(32, 7); kopf.writeUInt8(0, 8); kopf.writeUInt8(0, 9);
kopf.writeUInt16LE(1, 10); kopf.writeUInt16LE(32, 12); kopf.writeUInt32LE(p32.length, 14); kopf.writeUInt32LE(22, 18);
writeFileSync('public/favicon.ico', Buffer.concat([kopf, p32]));
// OG-Bild 1200×630: Foto rechts, dunkelblaue Fläche mit Wortmarke links
const text = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630"><rect width="600" height="630" fill="#16233D"/>
<text x="64" y="250" font-family="Arial, Helvetica, sans-serif" font-weight="700" font-size="58" letter-spacing="3" fill="#fff">RÖSSLER</text>
<text x="66" y="292" font-family="Arial, Helvetica, sans-serif" font-size="22" letter-spacing="9" fill="#AEBCD4">IMMOBILIEN</text>
<text x="64" y="400" font-family="Arial, Helvetica, sans-serif" font-size="27" fill="#fff">Eigentumswohnungen in Heimsheim,</text>
<text x="64" y="438" font-family="Arial, Helvetica, sans-serif" font-size="27" fill="#fff">Leonberg, Ditzingen, Renningen</text>
<text x="64" y="476" font-family="Arial, Helvetica, sans-serif" font-size="27" fill="#fff">und Pforzheim</text></svg>`;
const foto = await sharp('src/assets/neubau.jpg').resize(600, 630, { fit: 'cover' }).toBuffer();
await sharp({ create: { width: 1200, height: 630, channels: 3, background: '#16233D' } })
  .composite([{ input: foto, left: 600, top: 0 }, { input: Buffer.from(text), left: 0, top: 0 }])
  .jpeg({ quality: 78, mozjpeg: true }).toFile('public/og/standard.jpg');
await sharp('src/assets/portrait.jpg').resize(600, 800, { fit: 'cover' }).jpeg({ quality: 78, mozjpeg: true }).toFile('public/og/linus-roessler.jpg');
writeFileSync('public/site.webmanifest', JSON.stringify({ name: 'Rössler Immobilien', short_name: 'Rössler', icons: [{ src: '/og/logo-512.png', sizes: '512x512', type: 'image/png' }, { src: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }], theme_color: '#16233D', background_color: '#FFFFFF', display: 'browser' }, null, 1));
console.log('Bilder erzeugt.');
