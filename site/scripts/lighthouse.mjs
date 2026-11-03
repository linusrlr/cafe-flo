// npm run lighthouse [-- dist-vorschau /pfad/ /pfad2/]  Lighthouse mobil (simulierte Drosselung) gegen den lokalen Build.
import { spawn } from 'node:child_process';
import { chromium } from 'playwright';
import lighthouse from 'lighthouse';
import * as chromeLauncher from 'chrome-launcher';
const [dir = 'dist', ...urls] = process.argv.slice(2);
const liste = urls.length ? urls : ['/'];
const php = spawn('php', ['-S', '127.0.0.1:4350', '-t', dir, 'tests/router.php'], { stdio: 'ignore' });
await new Promise((r) => setTimeout(r, 800));
const chrome = await chromeLauncher.launch({ chromePath: chromium.executablePath(), chromeFlags: ['--headless=new', '--no-sandbox'] });
try {
  for (const u of liste) {
    const r = await lighthouse(`http://127.0.0.1:4350${u}`, { port: chrome.port, output: 'json', logLevel: 'error', formFactor: 'mobile', throttlingMethod: 'simulate', onlyCategories: ['performance', 'accessibility', 'best-practices', 'seo'] });
    const c = r.lhr.categories, a = r.lhr.audits;
    const p = (k) => Math.round(c[k].score * 100);
    console.log(`${u.padEnd(34)} Performance ${p('performance')} · A11y ${p('accessibility')} · Best Practices ${p('best-practices')} · SEO ${p('seo')} · LCP ${a['largest-contentful-paint'].displayValue} · CLS ${a['cumulative-layout-shift'].displayValue} · TBT ${a['total-blocking-time'].displayValue} · Gewicht ${Math.round(a['total-byte-weight'].numericValue / 1024)} kB`);
  }
} finally { await chrome.kill(); php.kill(); }
