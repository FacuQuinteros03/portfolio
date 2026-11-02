// Arma public/Quinteros_Facundo_CV.pdf a partir de cv/cv.html.
// La primera vez en una compu nueva: npx playwright-core install chromium
import { chromium } from 'playwright-core';
import { fileURLToPath, pathToFileURL } from 'node:url';
import path from 'node:path';

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const source = pathToFileURL(path.join(root, 'cv', 'cv.html')).href;
const output = path.join(root, 'public', 'Quinteros_Facundo_CV.pdf');

const browser = await chromium.launch(
  process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {},
);
const page = await browser.newPage();
await page.goto(source, { waitUntil: 'networkidle' });
await page.evaluate(() => document.fonts.ready);

const overflow = await page.evaluate(() => document.body.scrollHeight > document.querySelector('.page').offsetHeight);
if (overflow) console.warn('Ojo: el contenido no entra en una sola hoja A4.');

await page.pdf({ path: output, format: 'A4', printBackground: true, preferCSSPageSize: true });
await browser.close();
console.log(`CV listo: ${path.relative(root, output)}`);
