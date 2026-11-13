/**
 * 舞台作品清单：已上墙的 124 条标杆，按 9 种语言的稳定顺序排列。
 * 树上的叶子和墙上的馆藏是同一批，不是两套收藏。
 * 缺图（threeui-dark-souls-holo）用中性底板，不冒充官方预览静帧。
 */
import { CASES, type CaseRecord } from '../data/stats';
import { LANGUAGE_HUES, LANGUAGE_ID_BY_NAME, LANGUAGE_ORDER } from '../data/languages';
import { loadPreviewImage, loadPreviewWorks, previewUrl, type PreviewItem } from './previewWorks';

export type FocusSpec = { type: 'image' };
export type WorkSource = 'loading' | 'screenshot' | 'missing';

export interface Work {
  id: string;
  index: number;
  title: string;
  industry: string;
  pageType: string;
  contentId: string;
  categoryId: string;
  hue: number;
  pageRatio: number;
  focus: FocusSpec;
  source: WorkSource;
  url: string;
  studio: string;
  scenes: string[];
  scale: string;
  kind: string;
  missingCapture: boolean;
}

const ordered: CaseRecord[] = LANGUAGE_ORDER.flatMap((name) => CASES.filter((c) => c.row === name));

export const works: Work[] = ordered.map((c, i) => {
  const categoryId = LANGUAGE_ID_BY_NAME[c.row];
  const langIndex = LANGUAGE_ORDER.indexOf(c.row);
  return {
    id: c.id,
    index: i,
    title: c.name,
    industry: c.row,
    pageType: c.scale,
    contentId: c.id,
    categoryId,
    hue: LANGUAGE_HUES[langIndex] ?? (i * 47 + 12) % 360,
    pageRatio: 1.6,
    focus: { type: 'image' },
    source: c.missingCapture ? 'missing' : 'loading',
    url: c.url,
    studio: c.studio,
    scenes: c.scenes,
    scale: c.scale,
    kind: c.kind,
    missingCapture: c.missingCapture,
  };
});

export const WORK_COUNT = works.length;
export const workById = new Map(works.map((w) => [w.id, w]));
export const INDUSTRIES: string[] = [...LANGUAGE_ORDER];
export const PAGE_TYPES: readonly string[] = ['整页', '组件'];

const previews = new Map<string, { item: PreviewItem; image: HTMLImageElement }>();
const workListeners = new Set<() => void>();

export function subscribeWorks(fn: () => void): () => void {
  workListeners.add(fn);
  return () => workListeners.delete(fn);
}

const notifyWorks = () => workListeners.forEach((fn) => fn());

export const TILE_RATIO = 1.6;

/** 低饱和主色，只给背景光晕用，不是第二条强调色。 */
export const accentColor = (w: Work) => `hsl(${w.hue} 32% 42%)`;

const NEUTRAL_BG = '#15181b';
const NEUTRAL_FONT = "system-ui, -apple-system, 'PingFang SC', sans-serif";

function drawNeutral(ctx: CanvasRenderingContext2D, width: number, height: number, label: string | null) {
  ctx.fillStyle = NEUTRAL_BG;
  ctx.fillRect(0, 0, width, height);
  ctx.strokeStyle = 'rgba(232, 233, 235, 0.10)';
  ctx.lineWidth = 1;
  ctx.strokeRect(0.5, 0.5, width - 1, height - 1);
  if (!label || width < 320) return;
  ctx.fillStyle = 'rgba(232, 233, 235, 0.42)';
  ctx.font = `500 ${Math.round(width * 0.026)}px ${NEUTRAL_FONT}`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(label, width / 2, height / 2);
}

const thumbCache = new Map<string, HTMLCanvasElement>();

function paintThumb(w: Work, width: number): HTMLCanvasElement {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = Math.round(width / TILE_RATIO);
  const ctx = canvas.getContext('2d');
  const image = previews.get(w.id)?.image;
  if (ctx && image) {
    const s = Math.max(canvas.width / image.naturalWidth, canvas.height / image.naturalHeight);
    const dw = image.naturalWidth * s;
    const dh = image.naturalHeight * s;
    ctx.drawImage(image, (canvas.width - dw) / 2, 0, dw, dh);
  } else if (ctx) {
    drawNeutral(ctx, canvas.width, canvas.height, w.missingCapture ? '暂无现场截图' : '图片暂不可用');
  }
  return canvas;
}

export function thumbCanvas(w: Work, width: number): HTMLCanvasElement {
  const key = `${w.id}@${width}`;
  let canvas = thumbCache.get(key);
  if (canvas) return canvas;
  canvas = paintThumb(w, width);
  thumbCache.set(key, canvas);
  return canvas;
}

const WARM_WIDTH = 1024;
const WARM_SLICE = 20;
const THUMB_CONCURRENCY = 4;

export const thumbReady = (w: Work) => thumbCache.has(`${w.id}@${WARM_WIDTH}`);

let warming: Promise<void> | null = null;

function setWarmThumb(w: Work) {
  for (const key of thumbCache.keys()) if (key.startsWith(`${w.id}@`)) thumbCache.delete(key);
  thumbCache.set(`${w.id}@${WARM_WIDTH}`, paintThumb(w, WARM_WIDTH));
}

export function warmThumbs(): Promise<void> {
  warming ??= (async () => {
    const yieldNow = () =>
      new Promise<void>((resolve) => {
        const ch = new MessageChannel();
        ch.port1.onmessage = () => {
          ch.port1.close();
          resolve();
        };
        ch.port2.postMessage(0);
      });
    await yieldNow();

    const items = await loadPreviewWorks();
    const byContent = new Map(items.map((item) => [item.id, item]));
    let notifyTimer: number | null = null;
    const requestNotify = () => {
      if (notifyTimer !== null) return;
      notifyTimer = window.setTimeout(() => {
        notifyTimer = null;
        notifyWorks();
      }, 120);
    };

    const markMissing = (w: Work) => {
      w.source = 'missing';
      setWarmThumb(w);
    };

    const queue: Work[] = [];
    let t0 = performance.now();
    for (const w of works) {
      if (w.missingCapture || !byContent.has(w.contentId)) {
        markMissing(w);
        requestNotify();
        if (performance.now() - t0 >= WARM_SLICE) {
          await yieldNow();
          t0 = performance.now();
        }
      } else {
        queue.push(w);
      }
    }

    let next = 0;
    const worker = async () => {
      while (next < queue.length) {
        const w = queue[next++]!;
        const item = byContent.get(w.contentId)!;
        try {
          const image = await loadPreviewImage(item.thumbnail.src);
          previews.set(w.id, { item, image });
          w.pageRatio = item.full.height / item.full.width;
          w.source = 'screenshot';
          setWarmThumb(w);
        } catch (e) {
          console.error(e);
          previews.delete(w.id);
          markMissing(w);
        }
        requestNotify();
      }
    };
    await Promise.all(Array.from({ length: Math.min(THUMB_CONCURRENCY, queue.length) }, worker));

    if (notifyTimer !== null) window.clearTimeout(notifyTimer);
    notifyWorks();
  })();
  return warming;
}

const LONG_WIDTH = 1200;
const LONG_LIMIT = 6;
const longCache = new Map<string, Promise<string>>();

export function longImageUrl(w: Work): Promise<string> {
  const real = previews.get(w.id);
  if (real) return Promise.resolve(previewUrl(real.item.full.src));
  return neutralLongImageUrl(w);
}

export const longImageFallbackUrl = (w: Work) => neutralLongImageUrl(w);

function neutralLongImageUrl(w: Work): Promise<string> {
  const hit = longCache.get(w.id);
  if (hit) {
    longCache.delete(w.id);
    longCache.set(w.id, hit);
    return hit;
  }
  const p = new Promise<string>((resolve, reject) => {
    const canvas = document.createElement('canvas');
    canvas.width = LONG_WIDTH;
    canvas.height = Math.round(LONG_WIDTH / TILE_RATIO);
    const ctx = canvas.getContext('2d');
    if (!ctx) return reject(new Error('canvas 不可用'));
    drawNeutral(ctx, canvas.width, canvas.height, w.missingCapture ? '暂无现场截图' : '图片暂不可用');
    canvas.toBlob((b) => (b ? resolve(URL.createObjectURL(b)) : reject(new Error('中性长图生成失败'))), 'image/jpeg', 0.85);
  });
  longCache.set(w.id, p);
  while (longCache.size > LONG_LIMIT) {
    const [oldId, old] = longCache.entries().next().value!;
    longCache.delete(oldId);
    old.then((u) => setTimeout(() => URL.revokeObjectURL(u), 5000)).catch(() => {});
  }
  return p;
}
