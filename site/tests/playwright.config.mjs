// Playwright (04-tests.md 2). DIST=dist (Standard, Produktions-Build) oder DIST=dist-vorschau.
// Browser: vorinstalliertes Chromium (PLAYWRIGHT_BROWSERS_PATH); am Laptop einmalig `npx playwright install chromium`.
import { defineConfig, devices } from '@playwright/test';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const KONFIG = path.join(path.dirname(fileURLToPath(import.meta.url)), 'config.test.php');
const DIST = process.env.DIST ?? 'dist';
export default defineConfig({
  testDir: './e2e',
  timeout: 45_000,
  retries: 0,
  workers: 4,
  reporter: [['list'], ['html', { open: 'never', outputFolder: '../playwright-report' }]],
  outputDir: '../test-results',
  use: { baseURL: 'http://127.0.0.1:4321', trace: 'retain-on-failure', locale: 'de-DE' },
  webServer: {
    command: `PHP_CLI_SERVER_WORKERS=4 FORMULAR_CONFIG=${KONFIG} php -S 127.0.0.1:4321 -t ${DIST} tests/router.php`,
    cwd: '..', url: 'http://127.0.0.1:4321/404.html', reuseExistingServer: false, stdout: 'ignore', stderr: 'pipe',
  },
  projects: [
    { name: 'm360', use: { ...devices['Galaxy S9+'], viewport: { width: 360, height: 640 } } },
    { name: 'm390', use: { ...devices['iPhone 13'], viewport: { width: 390, height: 664 }, browserName: 'chromium', defaultBrowserType: 'chromium' } },
    { name: 'd1366', use: { viewport: { width: 1366, height: 768 } } },
    { name: 'nojs', use: { viewport: { width: 390, height: 664 }, javaScriptEnabled: false } },
  ],
});
