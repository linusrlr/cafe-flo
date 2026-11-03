// T-FORM: alle drei Formulare ohne JS und mit JS, Fehlerseite ohne JS, Schritte und Zurück-Taste
import { test, expect } from '@playwright/test';
import { gibt, mailsFuer, zufallsName, testlauf } from './hilfe.mjs';

test.beforeEach(async ({ page }) => { await page.setExtraHTTPHeaders({ 'X-Testlauf': testlauf() }); });

test('Bewertung ohne JS absendbar, Mails korrekt', async ({ page }, info) => {
  test.skip(info.project.name !== 'nojs' || !gibt('/wohnung-bewerten/'));
  const name = zufallsName('Maria');
  await page.goto('/wohnung-bewerten/');
  await expect(page.locator('form fieldset.schritt')).toHaveCount(4);
  await page.selectOption('[name=ort]', 'leonberg');
  await page.fill('[name=wohnflaeche]', '72');
  await page.fill('[name=name]', name);
  await page.fill('[name=email]', 'maria@example.org');
  await page.click('form button[type=submit]');
  await expect(page).toHaveURL('/wohnung-bewerten/danke/');
  const m = mailsFuer(name);
  expect(m.benachrichtigung.subject).toContain('[Bewertung] Leonberg');
  expect(m.benachrichtigung.headers['reply-to']).toContain('maria@example.org');
  expect(m.benachrichtigung.headers.from).toContain('@roessler-immo.de');
  expect(m.bestaetigung.subject).toBe('Ihre Anfrage bei Rössler Immobilien');
  expect(m.bestaetigung.text).toContain('rund 72 m²');
});

test('Bewertung ohne JS: Fehlerseite', async ({ page }, info) => {
  test.skip(info.project.name !== 'nojs' || !gibt('/wohnung-bewerten/'));
  await page.goto('/wohnung-bewerten/');
  await page.selectOption('[name=ort]', 'leonberg');
  await page.fill('[name=name]', 'Maria Beispiel');
  await page.click('form button[type=submit]');
  await expect(page.locator('main')).toContainText('E-Mail-Adresse oder eine Telefonnummer');
  await expect(page.locator('a[href="/wohnung-bewerten/#formular"]')).toBeVisible();
});

test('Bewertung mit JS: Schritte, Zurück-Taste, Erfolg', async ({ page }, info) => {
  test.skip(info.project.name === 'nojs' || !gibt('/wohnung-bewerten/'));
  test.setTimeout(60_000);
  await page.goto('/wohnung-bewerten/');
  await expect(page.locator('form fieldset.schritt:visible')).toHaveCount(1);
  await page.locator('button[data-weiter]:visible').click();                  // Pflichtfeld Ort fehlt
  await expect(page.locator('[name=ort]')).toHaveAttribute('aria-invalid', 'true');
  await page.selectOption('[name=ort]', 'pforzheim');
  await page.locator('button[data-weiter]:visible').click();
  await expect(page.locator('.schritt-status')).toContainText('Schritt 2 von 4');
  await expect(page).toHaveURL(/schritt=2/);
  await page.goBack();                                                        // Browser-Zurück = Schritt zurück
  await expect(page.locator('.schritt-status')).toContainText('Schritt 1 von 4');
  await expect(page).toHaveURL(/\/wohnung-bewerten\//);
  await page.goForward();
  await expect(page.locator('.schritt-status')).toContainText('Schritt 2 von 4');
  for (let i = 0; i < 2; i++) await page.locator('button[data-weiter]:visible').click();
  await expect(page.locator('.schritt-status')).toContainText('Schritt 4 von 4');
  await page.waitForTimeout(8100);                                            // Zeitprüfung Bewertung: 8 s
  const name = zufallsName('Peter');
  await page.fill('[name=name]', name);
  await page.fill('[name=telefon]', '0711 123456');
  await page.click('form button[type=submit]');
  await expect(page).toHaveURL('/wohnung-bewerten/danke/');
  expect(mailsFuer(name).benachrichtigung.subject).toContain('[Bewertung] Pforzheim');
  await page.goBack();
  await expect(page).toHaveURL(/\/wohnung-bewerten\//);                       // zurück aufs Formular, nicht aus der Seite
});

test('Bewertung mit JS: Fehler am Feld bei leerem Kontaktweg', async ({ page }, info) => {
  test.skip(info.project.name !== 'd1366' || !gibt('/wohnung-bewerten/'));
  await page.goto('/wohnung-bewerten/');
  await page.selectOption('[name=ort]', 'leonberg');
  for (let i = 0; i < 3; i++) await page.locator('button[data-weiter]:visible').click();
  await page.fill('[name=name]', 'Maria Beispiel');
  await page.click('form button[type=submit]');
  await expect(page.locator('[name=email]')).toHaveAttribute('aria-invalid', 'true');
  await expect(page.locator('.fehler-zusammenfassung')).toBeVisible();
});

for (const [seite, danke, art] of [['/kontakt/', '/kontakt/danke/', 'Kontakt'], ['/direktankauf/', '/direktankauf/danke/', 'Ankauf']]) {
  test(`${art} ohne JS`, async ({ page }, info) => {
    test.skip(info.project.name !== 'nojs' || !gibt(seite));
    const name = zufallsName('Anna');
    await page.goto(seite);
    const f = page.locator('form');
    await f.locator('[name=name]').fill(name);
    await f.locator('[name=telefon]').fill('0159 1234567');
    if (art === 'Ankauf') await f.locator('[name=ort]').selectOption('ditzingen');
    await f.locator('button[type=submit]').click();
    await expect(page).toHaveURL(danke);
    const m = mailsFuer(name);
    expect(m.benachrichtigung.subject).toContain(`[${art}]`);
    expect(m.bestaetigung).toBeUndefined();                                   // keine E-Mail angegeben
  });
  test(`${art} mit JS`, async ({ page }, info) => {
    test.skip(info.project.name !== 'd1366' || !gibt(seite));
    const name = zufallsName('Jonas');
    await page.goto(seite);
    await page.waitForTimeout(3100);
    const f = page.locator('form');
    await f.locator('[name=name]').fill(name);
    await f.locator('[name=email]').fill('jonas@example.org');
    if (art === 'Ankauf') await f.locator('[name=ort]').selectOption('leonberg');
    await f.locator('button[type=submit]').click();
    await expect(page).toHaveURL(danke);
    expect(mailsFuer(name).bestaetigung.subject).toBe('Ihre Anfrage bei Rössler Immobilien');
  });
}
