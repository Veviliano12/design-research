/**
 * Two-layer library map QA. Writes to design-research-platform/vfx-map-qa/layers/
 * so a library build does not delete the shots.
 */
import { mkdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium, type Frame, type Page } from 'playwright-core';

const PLATFORM = 'http://127.0.0.1:4173';
const OUT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../../qa/layers');
const CHROME = process.env.CHROME ?? '/usr/bin/google-chrome';

type LibQa = {
  getYaw: () => number;
  getExtents: () => { layer: string; min: number; max: number };
  setYaw: (value: number) => void;
  panToEdge: (side: 'min' | 'max') => number;
  getBlend: () => number;
  setBlend: (value: number) => void;
};

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
  await frame.waitForSelector('[data-qa-ready="1"]', { timeout: 20000 });
  await frame.waitForFunction(
    () => {
      const el = document.querySelector('.lib-roster-total b');
      return el?.textContent?.trim() === '124';
    },
    { timeout: 8000 },
  );
  await frame.waitForTimeout(600);
}

async function waitLayer(frame: Frame, layer: 'languages' | 'cases', settle = 700) {
  await frame.waitForSelector(`[data-qa-layer="${layer}"]`, { timeout: 8000 });
  if (layer === 'cases') {
    await frame.waitForFunction(
      () => {
        const api = (window as Window & { __VFX_LIB_QA__?: { getBlend: () => number } }).__VFX_LIB_QA__;
        return !!api && api.getBlend() > 0.98;
      },
      { timeout: 8000 },
    );
  } else {
    await frame.waitForFunction(
      () => {
        const api = (window as Window & { __VFX_LIB_QA__?: { getBlend: () => number } }).__VFX_LIB_QA__;
        return !!api && api.getBlend() < 0.02;
      },
      { timeout: 8000 },
    );
  }
  await frame.waitForTimeout(settle);
}

async function shot(page: Page, name: string) {
  const dest = path.join(OUT, name);
  await page.screenshot({ path: dest, type: 'png' });
  console.log('wrote', dest);
  return dest;
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
  page.on('response', (r) => {
    if (r.status() >= 400 && !r.url().includes('favicon')) console.log('HTTP', r.status(), r.url());
  });

  await page.goto(`${PLATFORM}/#/vfx/overview`, { waitUntil: 'domcontentloaded', timeout: 30000 });
  const frame = await libraryFrame(page);
  await freeze(frame);
  await waitReady(frame);
  await page.mouse.move(16, 16);

  const glFail = await frame.locator('[data-qa="fallback-wall"]').count();
  if (glFail) console.log('WARNING: WebGL fallback was used');

  await shot(page, '01-language-wall.png');

  // L1 bounded pan: go to the right edge, must still show plates, not a void.
  const before = await frame.evaluate(() => {
    const api = (window as Window & { __VFX_LIB_QA__?: LibQa }).__VFX_LIB_QA__;
    if (!api) return null;
    const dest = api.panToEdge('max');
    return { dest, extents: api.getExtents(), yaw: api.getYaw() };
  });
  console.log('L1 pan edge', before);
  await frame.waitForTimeout(400);
  await page.mouse.move(16, 16);
  await shot(page, '02-language-wall-pan.png');

  // Reset L1 yaw for a clean selected/unselected comparison, highlight a side plate.
  await frame.evaluate(() => {
    const api = (window as Window & { __VFX_LIB_QA__?: LibQa }).__VFX_LIB_QA__;
    api?.setYaw(0);
  });
  const particles = frame.locator('.lib-roster-lang[data-qa-language="particles"]');
  await particles.hover();
  await frame.waitForTimeout(500);
  await shot(page, '07-selected-unselected.png');
  await page.mouse.move(16, 16);

  // Mid-transition: enter a language, freeze blend mid-dolly.
  await frame.evaluate(() => {
    const api = (window as Window & { __VFX_LIB_QA__?: LibQa }).__VFX_LIB_QA__;
    api?.setYaw(0);
  });
  const material = frame.locator('.lib-roster-lang[data-qa-language="material-object"]');
  await material.click();
  await waitLayer(frame, 'cases');
  await page.mouse.move(16, 16);
  await shot(page, '03-enter-language.png');

  const edge = await frame.evaluate(() => {
    const api = (window as Window & { __VFX_LIB_QA__?: LibQa }).__VFX_LIB_QA__;
    if (!api) return null;
    const dest = api.panToEdge('max');
    return { dest, extents: api.getExtents(), yaw: api.getYaw() };
  });
  console.log('L2 pan edge', edge);
  await frame.waitForTimeout(400);
  await page.mouse.move(16, 16);
  await shot(page, '04-case-wall-edge.png');

  // Scene filter still works.
  await frame.evaluate(() => {
    const api = (window as Window & { __VFX_LIB_QA__?: LibQa }).__VFX_LIB_QA__;
    api?.setYaw(0);
  });
  const chip = frame.locator('[data-qa-scene="互动体验与游戏"]');
  if (await chip.count()) {
    await chip.click();
    await frame.waitForTimeout(900);
  } else {
    console.log('scene chip 互动体验与游戏 not present; trying 个人站点');
    const alt = frame.locator('[data-qa-scene="个人站点"]');
    if (await alt.count()) {
      await alt.click();
      await frame.waitForTimeout(900);
    }
  }
  await page.mouse.move(16, 16);
  await shot(page, '08-scene-or-list.png');

  await frame.locator('[data-qa="back-languages"]').click();
  await waitLayer(frame, 'languages');
  // Returning to L1 retriggers the 0→124 count-up; wait it out so mid stills stay honest.
  await frame.waitForFunction(
    () => document.querySelector('.lib-roster-total b')?.textContent?.trim() === '124',
    { timeout: 8000 },
  );
  await frame.waitForTimeout(200);

  // Mid-transition frame on a fresh enter, after L2 first-look shots are already safe.
  await frame.locator('.lib-roster-lang[data-qa-language="material-object"]').click();
  await frame.waitForTimeout(200);
  const mid = await frame.evaluate(() => {
    const api = (window as Window & { __VFX_LIB_QA__?: LibQa }).__VFX_LIB_QA__;
    if (!api) return null;
    api.setBlend(0.5);
    return api.getBlend();
  });
  console.log('mid blend', mid);
  await frame.waitForTimeout(400);
  await page.mouse.move(16, 16);
  await shot(page, '05-enter-mid-transition.png');

  // Mid-frame keeps the L1 catalog (swap waits for blend ~0.68), so return
  // by snapping the dolly home instead of clicking a back control that is not up yet.
  await frame.evaluate(() => {
    const api = (window as Window & { __VFX_LIB_QA__?: LibQa }).__VFX_LIB_QA__;
    api?.setBlend(0);
  });
  await waitLayer(frame, 'languages');
  const generative = frame.locator('.lib-roster-lang[data-qa-language="generative"]');
  await generative.click();
  await waitLayer(frame, 'cases');
  await page.mouse.move(16, 16);
  await shot(page, '09-small-language.png');

  await frame.locator('[data-qa="back-languages"]').click();
  await waitLayer(frame, 'languages');
  await frame.locator('.lib-roster-lang[data-qa-language="liquid-glass"]').click();
  await waitLayer(frame, 'cases');
  const missing = frame.locator('.lib-roster-item[data-qa-case="threeui-dark-souls-holo"]');
  if (await missing.count()) {
    await missing.click();
    await frame.waitForTimeout(1200);
    await frame.locator('body').press('Enter');
    await frame.waitForSelector('[data-qa="detail"][data-qa-missing="1"]', { timeout: 5000 });
    await frame.waitForTimeout(400);
  } else {
    console.log('missing case not in list');
  }
  await page.mouse.move(16, 16);
  await shot(page, '10-missing.png');

  // Mobile empty wall. Close detail first if open.
  if (await frame.locator('[data-qa="detail"]').count()) {
    await frame.locator('body').press('Escape');
    await frame.waitForTimeout(400);
  }
  await frame.locator('[data-qa="device-phone"]').click();
  await frame.waitForSelector('[data-qa="phone-empty"]', { timeout: 5000 });
  await frame.waitForTimeout(800);
  await page.mouse.move(16, 16);
  await shot(page, '06-mobile-empty.png');

  if (await frame.locator('[data-qa="fallback-wall"]').count()) {
    console.log('WARNING: WebGL fallback was used at end');
  }

  await browser.close();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
