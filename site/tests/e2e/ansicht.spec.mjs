// T-VIEW: kein horizontaler Scroll, H1 und CTA im ersten Bildschirm mobil, Telefon-Icon
import { test, expect } from '@playwright/test';
import { seiten, gibt } from './hilfe.mjs';

for (const url of seiten()) {
  test(`kein horizontaler Scroll: ${url}`, async ({ page }) => {
    await page.goto(url);
    const [sw, cw] = await page.evaluate(() => [document.documentElement.scrollWidth, document.documentElement.clientWidth]);
    expect(sw).toBeLessThanOrEqual(cw);
  });
}

test('kein horizontaler Scroll bei 320 px (Startseite bzw. erste Seite)', async ({ page }, info) => {
  test.skip(info.project.name !== 'm360');
  await page.setViewportSize({ width: 320, height: 640 });
  for (const url of seiten().slice(0, 40)) {
    await page.goto(url);
    const [sw, cw] = await page.evaluate(() => [document.documentElement.scrollWidth, document.documentElement.clientWidth]);
    expect(sw, url).toBeLessThanOrEqual(cw);
  }
});

const ERSTER_SCREEN = ['/', '/wohnung-verkaufen/', '/wohnung-bewerten/', '/direktankauf/', '/wohnung-verkaufen/leonberg/', '/testseite/'];
for (const url of ERSTER_SCREEN) {
  test(`H1 und CTA im ersten Bildschirm: ${url}`, async ({ page }, info) => {
    test.skip(!info.project.name.startsWith('m') || !gibt(url), 'nur mobil, nur gebaute Seiten');
    await page.goto(url);
    // In der Vorschau zählt das gelbe Banner nicht mit (gibt es live nicht)
    const b = page.locator('.vorschau-banner');
    const banner = (await b.count()) ? (await b.boundingBox()).height : 0;
    const h = page.viewportSize().height + banner;
    const h1 = await page.locator('h1').boundingBox();
    const cta = await page.locator('main .btn-primaer, main form legend').first().boundingBox();
    expect(h1.y + h1.height).toBeLessThanOrEqual(h);
    expect(cta.y + cta.height).toBeLessThanOrEqual(h);
  });
}

test('Telefon-Icon mobil sichtbar, Text vor Bild', async ({ page }, info) => {
  test.skip(!info.project.name.startsWith('m'));
  const url = gibt('/') ? '/' : (seiten()[0] ?? '/gibt-es-nicht/');
  await page.goto(url);
  await expect(page.locator('header a.telicon[href^="tel:"]')).toBeVisible();
  const bild = page.locator('.hero .pic img');
  if (await bild.count()) expect((await bild.boundingBox()).y).toBeGreaterThan((await page.locator('h1').boundingBox()).y);
});
