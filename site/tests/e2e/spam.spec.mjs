// T-SPAM: Honeypot, Zeitprüfung, Rate-Limit, GET, Validierung (direkte POSTs)
import { test, expect } from '@playwright/test';
import { mailsFuer, zufallsName, testlauf } from './hilfe.mjs';
test.beforeEach(({}, info) => test.skip(info.project.name !== 'd1366', 'einmal reicht'));

test('Honeypot: Erfolg vortäuschen, keine Mail', async ({ request }) => {
  const name = zufallsName('Bot');
  const r = await request.post('/kontakt.php', { headers: { 'X-Testlauf': testlauf() }, form: { formular: 'kontakt', name, telefon: '0123456789', website: 'x' }, maxRedirects: 0 });
  expect(r.status()).toBe(303);
  expect(r.headers().location).toBe('/kontakt/danke/');
  expect(mailsFuer(name).benachrichtigung).toBeUndefined();
});
test('Zeitprüfung', async ({ request }) => {
  const name = zufallsName('Schnell');
  const r = await request.post('/kontakt.php', { headers: { accept: 'application/json', 'X-Testlauf': testlauf() }, form: { formular: 'kontakt', name, telefon: '0123456789', t: '500', js: '1' } });
  expect((await r.json()).ok).toBe(true);
  expect(mailsFuer(name).benachrichtigung).toBeUndefined();
});
test('Rate-Limit: 4. Anfrage in 10 Minuten', async ({ request }) => {
  const h = { 'X-Testlauf': testlauf() };
  const f = { formular: 'kontakt', name: 'Limit Test', telefon: '0123456789', website: 'x' };
  for (let i = 0; i < 3; i++) expect((await request.post('/kontakt.php', { headers: h, form: f, maxRedirects: 0 })).status()).toBe(303);
  expect((await request.post('/kontakt.php', { headers: h, form: f, maxRedirects: 0 })).status()).toBe(429);
});
test('GET kontakt.php leitet um', async ({ request }) => {
  expect((await request.get('/kontakt.php', { maxRedirects: 0 })).status()).toBe(303);
});
test('fremde Herkunft abgelehnt', async ({ request }) => {
  const r = await request.post('/kontakt.php', { headers: { origin: 'https://boese.example', 'X-Testlauf': testlauf() }, form: { formular: 'kontakt', name: 'X Y', telefon: '0123456789' }, maxRedirects: 0 });
  expect(r.status()).toBe(403);
});
test('Validierung JSON', async ({ request }) => {
  const r = await request.post('/bewertung.php', { headers: { accept: 'application/json', 'X-Testlauf': testlauf() }, form: { formular: 'bewertung', name: 'X' } });
  expect(r.status()).toBe(422);
  const j = await r.json();
  expect(Object.keys(j.fehler)).toEqual(expect.arrayContaining(['ort', 'email', 'telefon', 'name']));
});
test('Kern und Daten nicht über HTTP erreichbar', async ({ request }) => {
  for (const u of ['/_formular/kern.php', '/_formular/formulare.json', '/phpinfo.php']) expect((await request.get(u)).status(), u).toBe(404);
});
