import { chromium } from 'playwright';
import { readFile } from 'fs/promises';
import path from 'path';

const htmlPath = path.resolve(process.argv[2] || 'resume.html');
const outPath = process.argv[3] || 'resume.png';

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1024, height: 1400 } });
await page.setContent(await readFile(htmlPath, 'utf-8'), { waitUntil: 'networkidle' });
await page.screenshot({ path: outPath, fullPage: true });
await browser.close();
console.log(`Screenshot saved to ${outPath}`);
