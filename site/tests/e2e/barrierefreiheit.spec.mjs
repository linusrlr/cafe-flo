// T-A11Y (axe ohne serious/critical), Skip-Link, Menü per Tastatur; T-3P (keine fremden Requests)
import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { seiten, gibt } from './hilfe.mjs';

for (const url of seiten()) {
  test(`axe ${url}`, async ({ page }, info) => {
    test.skip(info.project.name === 'm360' || info.project.name === 'nojs', 'axe auf 390 und 1366 px');
    await page.goto(url);
    const r = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa', 'best-practice']).analyze();
    const schwer = r.violations.filter((v) => v.impact === 'serious' || v.impact === 'critical');
    expect(schwer, JSON.stringify(schwer.map((v) => [v.id, v.nodes.length, v.nodes[0]?.target]), null, 1)).toEqual([]);
  });
}

test('Skip-Link ist erstes Fokusziel', async ({ page }, info) => {
  test.skip(info.project.name !== 'd1366');
  await page.goto((seiten()[0] ?? '/gibt-es-nicht/'));
  await page.keyboard.press('Tab');
  await expect(page.locator(':focus')).toHaveText(/Zum Inhalt springen/);
  await page.keyboard.press('Enter');
  await expect(page.locator('main#inhalt')).toBeFocused();
});

test('Menü mit Tastatur', async ({ page }, info) => {
  test.skip(!['m360', 'm390'].includes(info.project.name));
  await page.goto((seiten()[0] ?? '/gibt-es-nicht/'));
  const b = page.locator('header button[aria-controls]');
  test.skip(!(await b.count()), 'keine Navigation (keine veröffentlichten Ziele)');
  await b.focus(); await page.keyboard.press('Enter');
  await expect(b).toHaveAttribute('aria-expanded', 'true');
  await page.keyboard.press('Escape');
  await expect(b).toHaveAttribute('aria-expanded', 'false');
  await expect(b).toBeFocused();
});

test('Formular-Seiten im Fehlerzustand ohne schwere axe-Befunde', async ({ page }, info) => {
  test.skip(info.project.name !== 'd1366' || !gibt('/wohnung-bewerten/'));
  await page.goto('/wohnung-bewerten/');
  await page.locator('button[data-weiter]:visible').click();
  const r = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa']).analyze();
  expect(r.violations.filter((v) => ['serious', 'critical'].includes(v.impact)).map((v) => v.id)).toEqual([]);
});

test('nur eigene Requests (T-3P)', async ({ page }, info) => {
  test.skip(info.project.name !== 'm390');
  test.setTimeout(120_000);
  const fremd = [];
  page.on('request', (r) => { const h = new URL(r.url()).host; if (h !== '127.0.0.1:4321') fremd.push(r.url()); });
  for (const url of seiten()) await page.goto(url, { waitUntil: 'networkidle' });
  expect(fremd).toEqual([]);
});
