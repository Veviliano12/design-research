/**
 * Visual QA for the reconstructed library map, served from the platform.
 * Writes screenshots to design-research-platform/vfx-map-qa/.
 */
import { mkdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium, type Frame, type Page } from 'playwright-core';
import sharp from 'sharp';

const PLATFORM = 'http://127.0.0.1:4173';
const OUT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../../qa');
const REF = '/workspace/vfx-visual-refs/ucd-goals/03-library-wall.png';
const CHROME = process.env.CHROME ?? '/usr/bin/google-chrome';

async function libraryFrame(page: Page): Promise<Frame> {
  const handle = await page.waitForSelector('iframe[data-vfx-map-embed], iframe.vfx-map-frame', { timeout: 20000 });
  const frame = await handle.contentFrame();
  if (!frame) throw new Error('视效库 iframe 没有 contentFrame');
  await frame.waitForSelector('[data-qa="library"]', { timeout: 20000 });
  return frame;
}

async function freeze(frame: Frame) {
  await frame.evaluate(() => {
    document.documentElement.dataset.qaFreeze = '1';
  });
}

async function waitReady(frame: Frame) {
  await frame.waitForSelector('[data-qa-phase="library"]', { timeout: 15000 });
  await frame.waitForSelector('[data-qa-ready="1"]', { timeout: 15000 });
  await frame.waitForTimeout(2800);
}

async function shot(page: Page, name: string) {
  const dest = path.join(OUT, name);
  await page.screenshot({ path: dest, type: 'png' });
  console.log('wrote', dest);
  return dest;
}

async function sideBySide(ourPath: string) {
  const dest = path.join(OUT, '02-side-by-side.png');
  const width = 1920;
  const ref = sharp(REF);
  const refMeta = await ref.metadata();
  const refH = Math.round(((refMeta.height ?? 868) * width) / (refMeta.width ?? 1600));
  const ours = sharp(ourPath);
  const ourMeta = await ours.metadata();
  const ourH = Math.round(((ourMeta.height ?? 1080) * width) / (ourMeta.width ?? 1920));
  const labelH = 36;
  const canvasW = width;
  const canvasH = labelH + refH + labelH + ourH;
  const refBuf = await sharp(REF).resize(width, refH).png().toBuffer();
  const ourBuf = await sharp(ourPath).resize(width, ourH).png().toBuffer();
  let topLabel: Buffer;
  let botLabel: Buffer;
  try {
    topLabel = await sharp({
      create: { width: canvasW, height: labelH, channels: 3, background: { r: 14, g: 15, b: 17 } },
    })
      .composite([
        {
          input: await sharp({
            text: { text: 'REFERENCE', width: 400, height: 22, align: 'left', rgba: true },
          })
            .png()
            .toBuffer()
            .catch(() =>
              sharp({
                create: { width: 8, height: 8, channels: 4, background: { r: 201, g: 255, b: 58, alpha: 1 } },
              })
                .png()
                .toBuffer(),
            ),
          left: 16,
          top: 8,
        },
      ])
      .png()
      .toBuffer();
    botLabel = await sharp({
      create: { width: canvasW, height: labelH, channels: 3, background: { r: 14, g: 15, b: 17 } },
    }).png().toBuffer();
  } catch {
    topLabel = await sharp({
      create: { width: canvasW, height: labelH, channels: 3, background: { r: 14, g: 15, b: 17 } },
    }).png().toBuffer();
    botLabel = topLabel;
  }

  await sharp({
    create: { width: canvasW, height: canvasH, channels: 3, background: { r: 14, g: 15, b: 17 } },
  })
    .composite([
      { input: topLabel, top: 0, left: 0 },
      { input: refBuf, top: labelH, left: 0 },
      { input: botLabel, top: labelH + refH, left: 0 },
      { input: ourBuf, top: labelH + refH + labelH, left: 0 },
    ])
    .png()
    .toFile(dest);
  console.log('wrote', dest);
}

async function main() {
  await mkdir(OUT, { recursive: true });
  const browser = await chromium.launch({
    executablePath: CHROME,
    headless: true,
    args: [
      '--use-gl=angle',
      '--use-angle=swiftshader',
      '--enable-webgl',
      '--ignore-gpu-blocklist',
      '--disable-dev-shm-usage',
      '--no-sandbox',
    ],
  });
  const page = await browser.newPage({ viewport: { width: 1920, height: 1080 }, deviceScaleFactor: 1 });
  page.on('console', (msg) => {
    if (msg.type() === 'error') console.log('console.error:', msg.text());
  });
  page.on('pageerror', (err) => console.log('pageerror:', err.message));
  page.on('response', (r) => { if (r.status() >= 400) console.log('HTTP', r.status(), r.url()); });

  await page.goto(`${PLATFORM}/#/vfx/overview`, { waitUntil: 'domcontentloaded', timeout: 30000 });
  const frame = await libraryFrame(page);
  await freeze(frame);
  await waitReady(frame);
  await page.mouse.move(16, 16);

  const defaultShot = await shot(page, '01-clone-default.png');
  await sideBySide(defaultShot);

  const pick = frame.locator('.lib-roster-item').nth(22);
  await pick.click();
  await page.mouse.move(16, 16);
  await frame.waitForTimeout(1400);
  await shot(page, '03-list-selected.png');

  const missing = frame.locator('[data-qa-case="threeui-dark-souls-holo"]');
  if (await missing.count()) {
    await missing.click();
    await page.mouse.move(16, 16);
    await frame.waitForTimeout(1400);
  } else {
    console.log('missing case not in list');
  }
  await shot(page, '04-missing.png');

  const glFail = await frame.locator('[data-qa="fallback-wall"]').count();
  if (glFail) console.log('WARNING: WebGL fallback was used');

  await browser.close();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
