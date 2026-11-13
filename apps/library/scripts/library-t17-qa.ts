/**
 * t17 QA: cinematic L3 stage + honest public source.
 * Writes 1920×1080 stills to design-research-platform/vfx-map-qa/t17/library/
 */
import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium, type Frame, type Page } from 'playwright-core';

const PLATFORM = 'http://127.0.0.1:4173';
const OUT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../../qa/t17/library');
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

async function backToLanguages(frame: Frame) {
  if ((await attr(frame, 'data-qa-layer')) !== 'cases') return;
  const detail = frame.locator('[data-qa="detail"]');
  if (await detail.count()) {
    await frame.page().keyboard.press('Escape');
    await frame.waitForSelector('[data-qa="detail"]', { state: 'detached', timeout: 4000 }).catch(() => null);
  }
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

async function openCase(frame: Frame, languageId: string, caseId: string) {
  await backToLanguages(frame);
  if ((await attr(frame, 'data-qa-layer')) !== 'languages') {
    // already languages
  }
  await frame.locator(`.lib-roster-lang[data-qa-language="${languageId}"]`).click();
  await waitLayer(frame, 'cases', 700);
  const item = frame.locator(`[data-qa-case="${caseId}"]`);
  if ((await item.count()) === 0) throw new Error(`目录里没有 ${caseId}`);
  await item.click();
  await frame.waitForSelector('[data-qa="detail"]', { timeout: 4000 });
  await frame.waitForTimeout(1200);
  return frame.locator('[data-qa="detail"]');
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

  // 1. Sparse overlay: Apple iPhone 18 Pro — no public source, type centered on the image.
  const apple = await openCase(frame, 'liquid-glass', 'apple-iphone-18-pro');
  const appleLayout = await apple.getAttribute('data-qa-layout');
  const appleKind = await apple.getAttribute('data-qa-artifact');
  const appleMissing = await apple.getAttribute('data-qa-missing');
  check(appleLayout === 'overlay', `稀疏条目用居中叠加，不是左右分栏（layout=${appleLayout}）`);
  check(appleKind === 'none' && appleMissing === '0', `Apple 有实拍、无公开源码（artifact=${appleKind}, missing=${appleMissing}）`);
  check((await apple.locator('.lib-detail-mate, .lib-detail-actions').count()) === 0, 'L3 不再使用传统 mate 面板和按钮栏');
  await shot(page, '01-l3-sparse-overlay.png');

  // 2. ThreeUI Pro honest state, same language wall (has capture).
  await page.keyboard.press('Escape');
  await frame.waitForSelector('[data-qa="detail"]', { state: 'detached', timeout: 4000 });
  const proItem = frame.locator('[data-qa-case="threeui-liquid-glass"]');
  check((await proItem.count()) > 0, '目录里能找到 ThreeUI Liquid Glass（Pro）');
  await proItem.click();
  await frame.waitForSelector('[data-qa="detail"]', { timeout: 4000 });
  await frame.waitForTimeout(1200);
  const pro = frame.locator('[data-qa="detail"]');
  const proKind = await pro.getAttribute('data-qa-artifact');
  const proLayout = await pro.getAttribute('data-qa-layout');
  check(proKind === 'official-only', `ThreeUI Pro 诚实标明需官方许可（artifact=${proKind}）`);
  check(proLayout === 'overlay', `Pro 条目也是舞台叠加，不是空的右栏（layout=${proLayout}）`);
  const proText = (await pro.innerText()).replace(/\s+/g, ' ');
  check(proText.includes('Pro') || proText.includes('付费'), `Pro 文案讲清许可（snippet=${proText.slice(0, 180)}）`);
  await shot(page, '03-l3-threeui-pro.png');

  await page.keyboard.press('Escape');
  await frame.waitForSelector('[data-qa="detail"]', { state: 'detached', timeout: 4000 });

  // 3. React Bits Ghost Fibers with real public excerpt, still stage-like.
  const fibers = await openCase(frame, 'particles', 'react-bits-backgrounds-ghost-fibers');
  const fibLayout = await fibers.getAttribute('data-qa-layout');
  const fibKind = await fibers.getAttribute('data-qa-artifact');
  const codeText = (await fibers.locator('.lib-detail-code').innerText().catch(() => '')) || '';
  check(fibKind === 'code' && fibLayout === 'stage-code', `Ghost Fibers 展示真实摘录（artifact=${fibKind}, layout=${fibLayout}）`);
  check(codeText.includes('uTwist') || codeText.includes('precision highp'), `摘录来自公开 shader（len=${codeText.length}）`);
  check((await fibers.locator('.lib-detail-mate').count()) === 0, '有代码时也不是传统 GUI 分栏面板');
  await shot(page, '02-l3-reactbits-code.png');

  // 4. Esc back to L2, hash unchanged.
  await page.keyboard.press('Escape');
  await frame.waitForTimeout(500);
  const detailGone = (await frame.locator('[data-qa="detail"]').count()) === 0;
  const layer = await attr(frame, 'data-qa-layer');
  const hash = new URL(page.url()).hash;
  check(detailGone && layer === 'cases', `Esc 从 L3 回到 L2（detailGone=${detailGone}, layer=${layer}）`);
  check(hash === '#/vfx/overview', `Esc 后 hash 仍是 #/vfx/overview（实际 ${hash}）`);
  await page.mouse.move(16, 16);
  await shot(page, '04-esc-back-l2.png');

  const hashEnd = new URL(page.url()).hash;
  check(hashEnd === '#/vfx/overview', `全程 hash 仍是 #/vfx/overview（实际 ${hashEnd}）`);

  const readme = `# t17 视效库 L3 舞台感与公开源码

时间：2026-11-12（America/New_York）
预览：http://127.0.0.1:4173/#/vfx/overview
未发布、未 git push、未同步到 Mac、未开隧道。

## 这层怎么做

第三层不再是左图右栏的设置面板。样例在当前墙上放大成一块舞台：截图铺开，字悬在画面上，带底部渐隐。材料少时（没有可展示源码），文案在画面下部水平居中，不再剩一列空的右栏。有公开源码时，标题仍压在画面左侧，摘录作为一块悬浮的字，待在右侧，没有「材料」标题、dt/dd 或工具条按钮。Esc / 关闭 / 点暗处回到第二层，hash 仍是 \`#/vfx/overview\`。顶栏和底栏留着，还是同一座舞台。

## 源码盘点（124）

公开可引用摘录：**27**
官方 / 付费墙 / 仅预览：**67**
Cue Kit 仅有 prompt、无 React 源码：**2**
查过仍没有公开实现：**28**

完整名单与仓库 SHA 见 \`../../site/data/vfx/code-sources.json\`。

有公开源码的 id：

- React Bits（10，MIT + Commons Clause）：\`react-bits-backgrounds-ghost-fibers\` 等
- Inspira UI（5，MIT）
- Kokonut UI（2，MIT）
- SmoothUI（2，MIT）
- Lightswind Satin Flow（1，MIT；Volumetric Fractal 公开仓库里没有）
- ThreeUI Community（3，MIT）：\`threeui-portal-field\`、\`threeui-sylva-living-world\`、\`threeui-kage\`
- Cue Kit 有源码的（2，MIT）：fisheye、phantom
- pmndrs/examples Lens（1，MIT）
- kepler.gl 星空层（1，MIT）

ThreeUI 其余 22 条在 Community 目录之外，属 Pro：弹窗写明需官方许可 / 付费获取，不转载。shaders.com 的 17 条收藏按官方许可不是开源内容（引擎才是 MIT）。Scrolltide、Aura.build、Cue+、Aceternity 等按官方状态如实写。

摘录是片段加完整文件链接，不是整文件，也不编造。

## 交互验证

${passed.map((s) => `- [x] ${s}`).join('\n')}
${failed.length ? failed.map((s) => `- [ ] ${s}`).join('\n') : ''}

通过 ${passed.length}，失败 ${failed.length}。

## 静帧（1920×1080）

| 文件 | 内容 |
| --- | --- |
| 01-l3-sparse-overlay.png | Apple iPhone 18 Pro：字压在图上、水平居中（Ghost Fibers 已有公开源码，稀疏态改用这条） |
| 02-l3-reactbits-code.png | Ghost Fibers：真实 React Bits 摘录，仍是舞台而不是设置面板 |
| 03-l3-threeui-pro.png | ThreeUI Liquid Glass：诚实标明源码在 Pro，需官方许可 |
| 04-esc-back-l2.png | Esc 回到第二层，hash 不变 |

## 日志

\`\`\`
${log.join('\n')}
\`\`\`
`;
  await writeFile(path.join(OUT, 'README.md'), readme);
  note(`wrote ${path.join(OUT, 'README.md')}`);
  await browser.close();
  if (failed.length) process.exitCode = 1;
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
