/**
 * 缩略图纹理：实拍走平台 thumbs，缺图画中性底板和「暂无现场截图」。
 * 每张都带参考墙那样的细边框和底部题名条，不使用官方预览静帧或任何替补图。
 */
import * as THREE from 'three';
import { platformUrl } from '../embed';
import { FOOTER_RATIO, TILE_H, TILE_W } from './layout';

const NEUTRAL = '#15181b';
const FRAME = '#1a1c1f';
const STROKE = '#3a3f46';
const FOOTER = '#121416';
const TITLE = 'rgba(210, 214, 218, 0.72)';
const TAG = 'rgba(160, 166, 172, 0.55)';
const FONT = "system-ui, -apple-system, 'PingFang SC', 'Microsoft YaHei', sans-serif";

export const TEX_W = 1024;
export const TEX_H = Math.round(TEX_W * (TILE_H / TILE_W));

function makeCanvas(width: number, height: number): HTMLCanvasElement {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  return canvas;
}

function roundRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  const radius = Math.max(0, Math.min(r, w / 2, h / 2));
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.arcTo(x + w, y, x + w, y + h, radius);
  ctx.arcTo(x + w, y + h, x, y + h, radius);
  ctx.arcTo(x, y + h, x, y, radius);
  ctx.arcTo(x, y, x + w, y, radius);
  ctx.closePath();
}

function cover(ctx: CanvasRenderingContext2D, image: HTMLImageElement, x: number, y: number, width: number, height: number) {
  const s = Math.max(width / image.naturalWidth, height / image.naturalHeight);
  const dw = image.naturalWidth * s;
  const dh = image.naturalHeight * s;
  ctx.drawImage(image, x + (width - dw) / 2, y + (height - dh) / 2, dw, dh);
}

function truncate(ctx: CanvasRenderingContext2D, text: string, max: number): string {
  if (ctx.measureText(text).width <= max) return text;
  let s = text;
  while (s.length > 1 && ctx.measureText(`${s}…`).width > max) s = s.slice(0, -1);
  return `${s}…`;
}

/** 画带边框与题名条的展牌。image 为空时画中性底板。tag 画在题名条右侧，例如场景名。 */
export function paintFramed(
  width: number,
  height: number,
  title: string,
  image: HTMLImageElement | null,
  missingLabel: string | null,
  tag: string | null = null,
): HTMLCanvasElement {
  const canvas = makeCanvas(width, height);
  const ctx = canvas.getContext('2d');
  if (!ctx) return canvas;

  const bezel = Math.max(6, Math.round(width * 0.014));
  const radius = Math.round(width * 0.014);
  const footer = Math.round(height * FOOTER_RATIO);

  ctx.clearRect(0, 0, width, height);
  ctx.fillStyle = FRAME;
  roundRect(ctx, 0, 0, width, height, radius);
  ctx.fill();

  const ix = bezel;
  const iy = bezel;
  const iw = width - bezel * 2;
  const ih = height - footer - bezel;
  ctx.save();
  ctx.beginPath();
  ctx.rect(ix, iy, iw, ih);
  ctx.clip();
  ctx.fillStyle = NEUTRAL;
  ctx.fillRect(ix, iy, iw, ih);
  if (image) {
    cover(ctx, image, ix, iy, iw, ih);
  } else if (missingLabel) {
    ctx.fillStyle = 'rgba(232, 233, 235, 0.42)';
    ctx.font = `500 ${Math.round(width * 0.042)}px ${FONT}`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(missingLabel, width / 2, iy + ih / 2);
  }
  ctx.restore();

  ctx.fillStyle = FOOTER;
  ctx.fillRect(bezel, height - footer, width - bezel * 2, footer - bezel);

  const pad = Math.round(width * 0.03);
  const footerMid = height - footer + (footer - bezel) / 2;
  ctx.textBaseline = 'middle';
  let tagW = 0;
  if (tag) {
    ctx.fillStyle = TAG;
    ctx.font = `500 ${Math.round(width * 0.028)}px ${FONT}`;
    ctx.textAlign = 'right';
    ctx.fillText(tag, width - bezel - pad, footerMid);
    tagW = ctx.measureText(tag).width;
  }

  ctx.fillStyle = TITLE;
  ctx.font = `500 ${Math.round(width * 0.032)}px ${FONT}`;
  ctx.textAlign = 'left';
  const maxTitle = Math.max(40, width - bezel * 2 - pad * 3 - tagW);
  ctx.fillText(truncate(ctx, title, maxTitle), bezel + pad, footerMid);

  ctx.strokeStyle = STROKE;
  ctx.lineWidth = Math.max(1.5, width * 0.0035);
  roundRect(ctx, ctx.lineWidth / 2, ctx.lineWidth / 2, width - ctx.lineWidth, height - ctx.lineWidth, radius);
  ctx.stroke();

  return canvas;
}

function texFromCanvas(canvas: HTMLCanvasElement, anisotropy = 4): THREE.CanvasTexture {
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.NoColorSpace;
  tex.generateMipmaps = true;
  tex.minFilter = THREE.LinearMipmapLinearFilter;
  tex.magFilter = THREE.LinearFilter;
  tex.anisotropy = anisotropy;
  tex.needsUpdate = true;
  return tex;
}

const cache = new Map<string, THREE.CanvasTexture>();
const inflight = new Map<string, Promise<THREE.CanvasTexture>>();

export const NEUTRAL_TEX = texFromCanvas(paintFramed(16, 10, '', null, null), 1);
export const MISSING_TEX = texFromCanvas(paintFramed(TEX_W, TEX_H, '', null, '暂无现场截图'));

export function cachedTexture(key: string): THREE.CanvasTexture | undefined {
  return cache.get(key);
}

function loadImage(url: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.decoding = 'async';
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error(`图片加载失败：${url}`));
    img.src = url;
  });
}

export function loadTexture(
  key: string,
  src: string | null,
  title: string,
  missingLabel: string | null = '暂无现场截图',
  width = TEX_W,
  height = TEX_H,
  tag: string | null = null,
): Promise<THREE.CanvasTexture> {
  const cacheKey = tag ? `${key}::${tag}` : key;
  const hit = cache.get(cacheKey);
  if (hit) return Promise.resolve(hit);
  const pending = inflight.get(cacheKey);
  if (pending) return pending;

  const job = (async () => {
    if (!src) {
      const tex = texFromCanvas(paintFramed(width, height, title, null, missingLabel, tag));
      cache.set(cacheKey, tex);
      return tex;
    }
    try {
      const image = await loadImage(platformUrl(src));
      const tex = texFromCanvas(paintFramed(width, height, title, image, null, tag));
      cache.set(cacheKey, tex);
      return tex;
    } catch (err) {
      console.warn(err);
      const tex = texFromCanvas(paintFramed(width, height, title, null, '图片暂不可用', tag));
      cache.set(cacheKey, tex);
      return tex;
    } finally {
      inflight.delete(cacheKey);
    }
  })();

  inflight.set(cacheKey, job);
  return job;
}

export async function warmTextures(
  jobs: { key: string; src: string | null; title: string; label: string | null; tag?: string | null }[],
  concurrency = 8,
  onEach?: (key: string, tex: THREE.CanvasTexture) => void,
): Promise<void> {
  let i = 0;
  const workers = Array.from({ length: Math.min(concurrency, jobs.length) }, async () => {
    while (i < jobs.length) {
      const job = jobs[i]!;
      i += 1;
      const tex = await loadTexture(job.key, job.src, job.title, job.label, TEX_W, TEX_H, job.tag ?? null);
      onEach?.(job.key, tex);
      await new Promise((resolve) => setTimeout(resolve, 0));
    }
  });
  await Promise.all(workers);
}

const PLATE_W = 1536;
const PLATE_H = Math.round(PLATE_W * (2.18 / 2.55));
const plateCache = new Map<string, THREE.CanvasTexture>();
const plateInflight = new Map<string, Promise<THREE.CanvasTexture>>();

/** 语言牌底板：类别名与件数，代表图由 3D 扇面另叠。 */
export function paintLanguagePlate(
  width: number,
  height: number,
  lines: string[],
  count: number,
  target?: HTMLCanvasElement,
): HTMLCanvasElement {
  const canvas = target ?? makeCanvas(width, height);
  if (target && (target.width !== width || target.height !== height)) {
    target.width = width;
    target.height = height;
  }
  const ctx = canvas.getContext('2d');
  if (!ctx) return canvas;

  const radius = Math.round(width * 0.014);
  const stroke = Math.max(2, width * 0.0032);
  const band = Math.round(height * 0.26);

  ctx.clearRect(0, 0, width, height);
  ctx.fillStyle = '#14161a';
  roundRect(ctx, 0, 0, width, height, radius);
  ctx.fill();

  const stage = ctx.createLinearGradient(0, 0, 0, height - band);
  stage.addColorStop(0, '#1a1d22');
  stage.addColorStop(1, '#121417');
  ctx.save();
  ctx.beginPath();
  ctx.rect(stroke, stroke, width - stroke * 2, height - band - stroke);
  ctx.clip();
  ctx.fillStyle = stage;
  ctx.fillRect(0, 0, width, height);
  const vignette = ctx.createRadialGradient(width * 0.5, height * 0.32, width * 0.1, width * 0.5, height * 0.36, width * 0.62);
  vignette.addColorStop(0, 'rgba(14, 15, 17, 0)');
  vignette.addColorStop(1, 'rgba(14, 15, 17, 0.35)');
  ctx.fillStyle = vignette;
  ctx.fillRect(0, 0, width, height);
  ctx.restore();

  ctx.fillStyle = '#101214';
  ctx.fillRect(stroke, height - band, width - stroke * 2, band - stroke);

  ctx.strokeStyle = 'rgba(255, 255, 255, 0.06)';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(Math.round(width * 0.05), height - band + 0.5);
  ctx.lineTo(width - Math.round(width * 0.05), height - band + 0.5);
  ctx.stroke();

  const pad = Math.round(width * 0.12);
  const textLeft = pad;
  const bandMid = height - band / 2;
  ctx.textAlign = 'left';
  ctx.textBaseline = 'middle';
  const lineCount = Math.max(1, lines.length);
  const nameSize = Math.round(width * (lineCount > 1 ? 0.05 : 0.058));
  ctx.shadowColor = 'rgba(0, 0, 0, 0.88)';
  ctx.shadowBlur = Math.round(width * 0.014);
  ctx.shadowOffsetY = Math.round(height * 0.004);
  ctx.fillStyle = '#f4f5f6';
  ctx.font = `600 ${nameSize}px ${FONT}`;
  let nameWidth = 0;
  if (lineCount === 1) {
    const line = lines[0] ?? '';
    ctx.fillText(line, textLeft, bandMid);
    nameWidth = ctx.measureText(line).width;
  } else {
    const gap = nameSize * 1.2;
    const start = bandMid - gap / 2;
    lines.forEach((line, i) => {
      ctx.fillText(line, textLeft, start + i * gap);
      nameWidth = Math.max(nameWidth, ctx.measureText(line).width);
    });
  }

  // 件数与「件」同一行，不上下叠成怪字。跟在名称右侧，避免侧向透视切掉右齐数字。
  const countX = textLeft + nameWidth + Math.round(width * 0.036);
  const countStr = String(count);
  const countSize = Math.round(width * 0.07);
  const unitSize = Math.round(width * 0.034);
  ctx.fillStyle = '#f4f5f6';
  ctx.font = `650 ${countSize}px ${FONT}`;
  ctx.fillText(countStr, countX, bandMid);
  const countW = ctx.measureText(countStr).width;
  ctx.fillStyle = 'rgba(232, 233, 235, 0.7)';
  ctx.font = `500 ${unitSize}px ${FONT}`;
  ctx.fillText(' 件', countX + countW, bandMid);
  ctx.shadowColor = 'transparent';
  ctx.shadowBlur = 0;
  ctx.shadowOffsetY = 0;

  ctx.strokeStyle = 'rgba(70, 76, 84, 0.95)';
  ctx.lineWidth = stroke;
  roundRect(ctx, stroke / 2, stroke / 2, width - stroke, height - stroke, radius);
  ctx.stroke();

  return canvas;
}

export function loadPlateTexture(id: string, lines: string[], count: number): Promise<THREE.CanvasTexture> {
  const hit = plateCache.get(id);
  if (hit) return Promise.resolve(hit);
  const pending = plateInflight.get(id);
  if (pending) return pending;
  const job = Promise.resolve().then(() => {
    const tex = texFromCanvas(paintLanguagePlate(PLATE_W, PLATE_H, lines, count), 8);
    plateCache.set(id, tex);
    plateInflight.delete(id);
    return tex;
  });
  plateInflight.set(id, job);
  return job;
}

/** 在已有语言牌纹理上重绘件数，供进场数字滚动使用。 */
export function updatePlateCount(tex: THREE.CanvasTexture, lines: string[], count: number): void {
  const canvas = tex.image as HTMLCanvasElement;
  paintLanguagePlate(canvas.width, canvas.height, lines, count, canvas);
  tex.needsUpdate = true;
}

export const EMPTY_PLATE_TEX = texFromCanvas(paintLanguagePlate(32, 20, [''], 0), 1);
