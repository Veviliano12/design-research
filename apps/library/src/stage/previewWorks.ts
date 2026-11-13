/**
 * 预览截图清单：public/generated/preview-works.json。
 * 按案例 id 关联首屏缩略图和整页图；缺项或加载失败时由 works.ts 显示中性底板。
 */
export interface PreviewImage {
  src: string;
  width: number;
  height: number;
}

export interface PreviewItem {
  id: string;
  title: string;
  thumbnail: PreviewImage;
  full: PreviewImage;
}

const MANIFEST_URL = `${import.meta.env.BASE_URL}generated/preview-works.json`;

let manifest: Promise<PreviewItem[]> | undefined;
let loaded: PreviewItem[] | null = null;

function isImage(v: unknown): v is PreviewImage {
  if (!v || typeof v !== 'object') return false;
  const i = v as Partial<PreviewImage>;
  return (
    typeof i.src === 'string' &&
    i.src.length > 0 &&
    typeof i.width === 'number' &&
    Number.isFinite(i.width) &&
    i.width > 0 &&
    typeof i.height === 'number' &&
    Number.isFinite(i.height) &&
    i.height > 0
  );
}

function parse(raw: unknown): PreviewItem[] {
  const items = (raw as { items?: unknown } | null)?.items;
  if (!Array.isArray(items)) throw new Error('preview-works.json 缺少 items 数组');
  const out: PreviewItem[] = [];
  for (const entry of items) {
    if (!entry || typeof entry !== 'object') continue;
    const e = entry as Partial<PreviewItem>;
    if (typeof e.id !== 'string' || !e.id || typeof e.title !== 'string' || !e.title) continue;
    if (!isImage(e.thumbnail) || !isImage(e.full)) continue;
    out.push({ id: e.id, title: e.title, thumbnail: e.thumbnail, full: e.full });
  }
  return out;
}

export function previewUrl(src: string): string {
  if (/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i.test(src)) return src;
  return `${import.meta.env.BASE_URL}${src.replace(/^\/+/, '')}`;
}

export function loadPreviewWorks(): Promise<PreviewItem[]> {
  manifest ??= fetch(MANIFEST_URL)
    .then((res) => (res.ok ? res.json() : Promise.reject(new Error(`预览截图清单加载失败：${res.status} ${MANIFEST_URL}`))))
    .then(parse)
    .then((items) => {
      loaded = items;
      return items;
    })
    .catch((e: unknown) => {
      console.error(e);
      loaded = [];
      return [];
    });
  return manifest;
}

export function loadedPreviewWorks(): PreviewItem[] | null {
  return loaded;
}

export function loadPreviewImage(src: string): Promise<HTMLImageElement> {
  const url = previewUrl(src);
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.decoding = 'async';
    img.onload = () => {
      img.decode().then(
        () => resolve(img),
        () => resolve(img),
      );
    };
    img.onerror = () => reject(new Error(`预览图片加载失败：${url}`));
    img.src = url;
  });
}
