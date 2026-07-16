import { chromium } from 'playwright';
import { mkdirSync } from 'node:fs';
import { resolve } from 'node:path';

const outDir = resolve(process.cwd(), 'public/screenshots');
mkdirSync(outDir, { recursive: true });

const sites = [
  { slug: 'lumen', url: 'https://lumen-seven-dusky.vercel.app/' },
  { slug: 'shopping-web', url: 'https://shopping-web-phi-amber.vercel.app/' },
  { slug: 'motor', url: 'https://motor-self.vercel.app/' },
  { slug: 'sneaker', url: 'https://sneaker-veloce.vercel.app/' },
  { slug: 'aura-drink', url: 'https://aura-drink.vercel.app/' },
  { slug: 'funeral-site', url: 'https://funeral-site-navy.vercel.app/' },
  { slug: 'gym-site', url: 'https://gym-site-xi-roan.vercel.app/' },
  { slug: 'food-res', url: 'https://food-res-bice.vercel.app/' },
  { slug: 'nirveevisa', url: 'https://nirveevisa.com/' },
];

const browser = await chromium.launch();
const results = [];

for (const site of sites) {
  const page = await browser.newPage({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 1,
  });
  try {
    await page.goto(site.url, { waitUntil: 'networkidle', timeout: 45000 }).catch(async () => {
      await page.waitForLoadState('load', { timeout: 20000 }).catch(() => {});
    });
    await page.waitForTimeout(5000);
    await page.mouse.wheel(0, 400);
    await page.waitForTimeout(800);
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(1200);

    const info = await page.evaluate(() => ({
      title: document.title,
      description: document.querySelector('meta[name="description"]')?.content ?? '',
      h1: document.querySelector('h1')?.innerText?.replace(/\s+/g, ' ').trim() ?? '',
      bodySnippet: document.body.innerText.replace(/\s+/g, ' ').slice(0, 400),
    }));

    await page.screenshot({
      path: `${outDir}/${site.slug}.jpg`,
      type: 'jpeg',
      quality: 78,
    });
    results.push({ ...site, ...info, ok: true });
    console.log(`OK  ${site.slug}`);
  } catch (err) {
    results.push({ ...site, ok: false, error: String(err).slice(0, 200) });
    console.log(`ERR ${site.slug}: ${err}`);
  } finally {
    await page.close();
  }
}

await browser.close();
console.log('\n===INFO===');
console.log(JSON.stringify(results, null, 2));
