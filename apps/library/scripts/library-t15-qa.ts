/**
 * t15 QA: wall click hit-testing + spatial L3.
 * Writes 1920×1080 stills to design-research-platform/vfx-map-qa/t15/library/
 */
import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium, type Frame, type Page } from 'playwright-core';

const PLATFORM = 'http://127.0.0.1:4173';
const OUT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../../qa/t15/library');
const CHROME = process.env.CHROME ?? '/usr/bin/google-chrome';

const log: string[] = [];
function note(msg: string) {
  console.log(msg);
  log.push(msg);
}

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
    () => document.querySelector('.lib-roster-total b')?.textContent?.trim() === '124',
    { timeout: 8000 },
  );
  await frame.waitForTimeout(600);
}

async function waitLayer(frame: Frame, layer: 'languages' | 'cases', settle = 800) {
  await frame.waitForSelector(`[data-qa-layer="${layer}"]`, { timeout: 8000 });
  await frame.waitForFunction(
    (want) => {
      const api = (window as Window & { __VFX_LIB_QA__?: { getBlend: () => number } }).__VFX_LIB_QA__;
      if (!api) return false;
      return want === 'cases' ? api.getBlend() > 0.98 : api.getBlend() < 0.02;
    },
    layer,
    { timeout: 8000 },
  );
  await frame.waitForTimeout(settle);
}

async function attr(frame: Frame, name: string) {
  return (await frame.locator('[data-qa="library"]').getAttribute(name)) ?? '';
}

async function shot(page: Page, name: string) {
  const dest = path.join(OUT, name);
  await page.screenshot({ path: dest, type: 'png' });
  note(`wrote ${dest}`);
  return dest;
}

async function canvasBox(frame: Frame) {
  const canvas = frame.locator('canvas').first();
  const box = await canvas.boundingBox();
  if (!box) throw new Error('canvas 没有 boundingBox');
  return box;
}

type Probe = { x: number; y: number; hover: string };

async function probeHover(
  page: Page,
  frame: Frame,
  kind: 'lang' | 'case',
  points: { x: number; y: number }[],
): Promise<Probe | null> {
  const name = kind === 'lang' ? 'data-qa-hover-lang' : 'data-qa-hover-id';
  for (const pt of points) {
    await page.mouse.move(pt.x, pt.y);
    await frame.waitForTimeout(180);
    const hover = await attr(frame, name);
    note(`  probe ${kind} @ ${Math.round(pt.x)},${Math.round(pt.y)} hover=${hover || '(none)'}`);
    if (hover) return { ...pt, hover };
  }
  return null;
}

function rightGrid(box: { x: number; y: number; width: number; height: number }) {
  // Prefer the far right of the wall (Gary's report: 右边的图没有反馈).
  const xs = [0.88, 0.84, 0.8, 0.76, 0.72].map((t) => box.x + box.width * t);
  const ys = [0.36, 0.44, 0.52, 0.62, 0.7].map((t) => box.y + box.height * t);
  const pts: { x: number; y: number }[] = [];
  for (const y of ys) for (const x of xs) pts.push({ x, y });
  return pts;
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
    if (msg.type() === 'error') note(`console.error: ${msg.text()}`);
  });
  page.on('pageerror', (err) => note(`pageerror: ${err.message}`));

  const failed: string[] = [];
  const passed: string[] = [];
  const check = (ok: boolean, label: string) => {
    (ok ? passed : failed).push(label);
    note(`${ok ? 'PASS' : 'FAIL'}  ${label}`);
  };

  await page.goto(`${PLATFORM}/#/vfx/overview`, { waitUntil: 'domcontentloaded', timeout: 30000 });
  const frame = await libraryFrame(page);
  await freeze(frame);
  await waitReady(frame);
  await page.mouse.move(16, 16);

  const glFail = await frame.locator('[data-qa="fallback-wall"]').count();
  if (glFail) note('WARNING: WebGL fallback was used');
  check(glFail === 0, 'WebGL 展墙可用，不是平面回退');

  const hash0 = new URL(page.url()).hash;
  check(hash0 === '#/vfx/overview', `开场 hash 是 #/vfx/overview（实际 ${hash0}）`);

  await shot(page, '01-l1-idle.png');

  const box = await canvasBox(frame);
  note(`canvas box ${JSON.stringify(box)}`);

  const l1All = [] as Probe[];
  let l1: Probe | null = null;
  for (const pt of rightGrid(box)) {
    await page.mouse.move(pt.x, pt.y);
    await frame.waitForTimeout(160);
    const hover = await attr(frame, 'data-qa-hover-lang');
    note(`  probe lang @ ${Math.round(pt.x)},${Math.round(pt.y)} hover=${hover || '(none)'}`);
    if (hover) l1All.push({ ...pt, hover });
    // Skip the default-highlighted centre plate so the hover still is visible.
    if (hover && hover !== 'light') {
      l1 = { ...pt, hover };
      break;
    }
  }
  if (!l1 && l1All[0]) l1 = l1All[0]!;
  check(!!l1, `L1 墙面右侧悬停有反馈${l1 ? `（${l1.hover}）` : ''}`);
  if (l1) {
    await page.mouse.move(l1.x, l1.y);
    await frame.waitForTimeout(320);
    await shot(page, '02-l1-right-hover.png');
    await page.mouse.click(l1.x, l1.y, { delay: 20 });
    try {
      await waitLayer(frame, 'cases', 900);
      const layer = await attr(frame, 'data-qa-layer');
      const lang = await attr(frame, 'data-qa-language');
      check(layer === 'cases', `L1 右侧点击进入 L2（layer=${layer}, language=${lang}）`);
    } catch (err) {
      check(false, `L1 右侧点击进入 L2：${(err as Error).message}`);
    }
    await page.mouse.move(16, 16);
    await shot(page, '03-l1-right-enter.png');
  } else {
    await shot(page, '02-l1-right-hover.png');
    await shot(page, '03-l1-right-enter.png');
  }

  // L2 wall click on the right, not the left list.
  if ((await attr(frame, 'data-qa-layer')) === 'cases') {
    await shot(page, '04-l2-wall-before.png');
    const l2 = await probeHover(page, frame, 'case', rightGrid(box));
    check(!!l2, `L2 墙面右侧悬停有反馈${l2 ? `（${l2.hover}）` : ''}`);
    if (l2) {
      await page.mouse.move(l2.x, l2.y);
      await frame.waitForTimeout(240);
      await page.mouse.click(l2.x, l2.y, { delay: 20 });
      try {
        await frame.waitForSelector('[data-qa="detail"]', { timeout: 4000 });
        const focus = await attr(frame, 'data-qa-focus');
        const artifact = await frame.locator('[data-qa="detail"]').getAttribute('data-qa-artifact');
        const missing = await frame.locator('[data-qa="detail"]').getAttribute('data-qa-missing');
        check(!!focus, `L2 右侧墙面点击打开 L3（focus=${focus}, artifact=${artifact}, missing=${missing}）`);
        await frame.waitForTimeout(500);
        await shot(page, '05-l3-from-wall.png');

        await page.keyboard.press('Escape');
        await frame.waitForTimeout(400);
        const detailGone = (await frame.locator('[data-qa="detail"]').count()) === 0;
        const layer = await attr(frame, 'data-qa-layer');
        const hash = new URL(page.url()).hash;
        check(detailGone && layer === 'cases', `Esc 从 L3 回到 L2（detailGone=${detailGone}, layer=${layer}）`);
        check(hash === '#/vfx/overview', `Esc 后 hash 仍是 #/vfx/overview（实际 ${hash}）`);
        await page.mouse.move(16, 16);
        await shot(page, '06-esc-back-l2.png');
      } catch (err) {
        check(false, `L2 墙面点击打开 L3：${(err as Error).message}`);
        await shot(page, '05-l3-from-wall.png');
        await shot(page, '06-esc-back-l2.png');
      }
    } else {
      await shot(page, '05-l3-from-wall.png');
      await shot(page, '06-esc-back-l2.png');
    }
  }

  // Back to L1, enter 液态玻璃 via the left list (known cases: r3f code + missing holo + typical empty).
  if ((await attr(frame, 'data-qa-layer')) === 'cases') {
    const back = frame.locator('[data-qa="back-languages"]');
    if (await back.count()) {
      await back.click();
      await waitLayer(frame, 'languages');
      await frame.waitForFunction(
        () => document.querySelector('.lib-roster-total b')?.textContent?.trim() === '124',
        { timeout: 8000 },
      );
    }
  }

  await frame.locator('.lib-roster-lang[data-qa-language="liquid-glass"]').click();
  await waitLayer(frame, 'cases', 700);

  const r3f = frame.locator('[data-qa-case="r3f-examples__scrollcontrols-and-lens-refraction"]');
  check((await r3f.count()) > 0, '目录里能找到 r3f 开源样例');
  if (await r3f.count()) {
    await r3f.click();
    await frame.waitForSelector('[data-qa="detail"]', { timeout: 4000 });
    const kind = await frame.locator('[data-qa="detail"]').getAttribute('data-qa-artifact');
    check(kind === 'code', `L3 对开源样例展示真实代码（artifact=${kind}）`);
    await frame.waitForTimeout(700);
    await shot(page, '07-l3-code.png');
    await page.keyboard.press('Escape');
    await frame.waitForSelector('[data-qa="detail"]', { state: 'detached', timeout: 4000 }).catch(() => null);
  } else {
    await shot(page, '07-l3-code.png');
  }

  const holo = frame.locator('[data-qa-case="threeui-dark-souls-holo"]');
  check((await holo.count()) > 0, '目录里能找到缺截图的 Dark Souls Holo');
  if (await holo.count()) {
    await holo.click();
    await frame.waitForSelector('[data-qa="detail"]', { timeout: 4000 });
    const missing = await frame.locator('[data-qa="detail"]').getAttribute('data-qa-missing');
    const kind = await frame.locator('[data-qa="detail"]').getAttribute('data-qa-artifact');
    check(missing === '1', `L3 缺图时用中性底板（missing=${missing}）`);
    check(kind === 'empty', `缺图条目同时诚实标明暂无代码（artifact=${kind}）`);
    await frame.waitForTimeout(500);
    await shot(page, '08-l3-missing.png');
    await page.keyboard.press('Escape');
    await frame.waitForSelector('[data-qa="detail"]', { state: 'detached', timeout: 4000 }).catch(() => null);
  } else {
    await shot(page, '08-l3-missing.png');
  }

  const apple = frame.locator('[data-qa-case="apple-iphone-18-pro"]');
  if (await apple.count()) {
    await apple.click();
    await frame.waitForSelector('[data-qa="detail"]', { timeout: 4000 });
    const missing = await frame.locator('[data-qa="detail"]').getAttribute('data-qa-missing');
    const kind = await frame.locator('[data-qa="detail"]').getAttribute('data-qa-artifact');
    check(missing === '0' && kind === 'empty', `有图但无源码时：放大实拍 +「暂无代码样例」（missing=${missing}, artifact=${kind}）`);
    await frame.waitForTimeout(700);
    await shot(page, '09-l3-empty-artifact.png');
    await page.keyboard.press('Escape');
    await frame.waitForTimeout(400);
  } else {
    await shot(page, '09-l3-empty-artifact.png');
    check(false, '没有找到 apple-iphone-18-pro');
  }

  const hashEnd = new URL(page.url()).hash;
  check(hashEnd === '#/vfx/overview', `全程 hash 仍是 #/vfx/overview（实际 ${hashEnd}）`);

  const readme = `# t15 视效库墙面点击与 L3

时间：2026-11-12（America/New_York）
预览：http://127.0.0.1:4173/#/vfx/overview
未发布、未 git push。

## 交互验证

${passed.map((s) => `- [x] ${s}`).join('\n')}
${failed.length ? failed.map((s) => `- [ ] ${s}`).join('\n') : ''}

通过 ${passed.length}，失败 ${failed.length}。

## 静帧（1920×1080）

| 文件 | 内容 |
| --- | --- |
| 01-l1-idle.png | L1 语言墙默认 |
| 02-l1-right-hover.png | 鼠标悬停在墙面右侧语言牌 |
| 03-l1-right-enter.png | 点击该牌后进入 L2 |
| 04-l2-wall-before.png | L2 案例墙，准备点右侧样例 |
| 05-l3-from-wall.png | 墙面点击打开的 L3 放大 |
| 06-esc-back-l2.png | Esc 回到 L2，hash 不变 |
| 07-l3-code.png | 唯一找到的真实代码：r3f ScrollControls + Lens |
| 08-l3-missing.png | threeui-dark-souls-holo 中性底板 + 暂无代码 |
| 09-l3-empty-artifact.png | 有实拍、无源码的诚实空态 |

## 日志

\`\`\`
${log.join('\n')}
\`\`\`
`;
  await writeFile(path.join(OUT, 'README.md'), readme);
  note(`wrote ${path.join(OUT, 'README.md')}`);
  await browser.close();
  if (failed.length) {
    process.exitCode = 1;
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
