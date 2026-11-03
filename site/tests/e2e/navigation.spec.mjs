// T-NAV: echte Links, Zurück-Taste, alte #hash-Links, Inhalt ohne JS
import { test, expect } from '@playwright/test';
import { gibt, seiten } from './hilfe.mjs';

test('Navigation sind Links, Zurück funktioniert', async ({ page }, info) => {
  test.skip(!gibt('/') || !gibt('/wohnung-verkaufen/'));
  await page.goto('/');
  expect(await page.locator('nav[aria-label="Hauptnavigation"] button').count()).toBe(0);
  if (info.project.name.startsWith('m') && info.project.name !== 'nojs') await page.locator('header button[aria-controls]').click();
  if (info.project.name === 'nojs') await page.locator('#fussnav a[href="/wohnung-verkaufen/"]').click();
  else await page.locator('nav[aria-label="Hauptnavigation"] a[href="/wohnung-verkaufen/"]').click();
  await expect(page).toHaveURL('/wohnung-verkaufen/');
  await expect(page.locator('nav[aria-label="Hauptnavigation"] a[aria-current="page"]')).toHaveAttribute('href', '/wohnung-verkaufen/');
  await page.goBack();
  await expect(page).toHaveURL('/');
});

for (const [hash, ziel] of [['verkaufen', '/wohnung-verkaufen/'], ['ankauf', '/direktankauf/'], ['person', '/ueber-mich/'],
  ['kontakt', '/kontakt/'], ['impressum', '/impressum/'], ['datenschutz', '/datenschutz/']]) {
  test(`alter Link #${hash}`, async ({ page }, info) => {
    test.skip(info.project.name === 'nojs' || !gibt('/'));
    await page.goto(`/#${hash}`);
    await expect(page).toHaveURL(ziel);
  });
}

test('Inhalt ohne JS vollständig, Menü-Link führt zur Seitenliste', async ({ page }, info) => {
  test.skip(info.project.name !== 'nojs');
  const url = gibt('/wohnung-verkaufen/') ? '/wohnung-verkaufen/' : (seiten()[0] ?? '/gibt-es-nicht/');
  await page.goto(url);
  await expect(page.locator('h1')).toHaveCount(1);
  if (url === '/wohnung-verkaufen/') await expect(page.locator('.faq details').first()).toBeAttached();
  const menue = page.locator('header a.burger-link');
  if (await menue.count()) await expect(menue).toHaveAttribute('href', '#fussnav');
});

test('404 ist deutsch und liefert Status 404', async ({ page }) => {
  const r = await page.goto('/gibt-es-nicht/');
  expect(r.status()).toBe(404);
  await expect(page.locator('html')).toHaveAttribute('lang', 'de');
  await expect(page.locator('h1')).toContainText('gibt es nicht');
});
