/**
 * 从设计研究的两份真实源导出舞台数据，并生成不放大的多档截图。
 * 只在本地构建时读取源目录；写出的 JSON 与 public/generated 不引用源路径。
 */
import { mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const SRC_PLATFORM = path.resolve(ROOT, '../../site');
const MAP_JS = path.join(SRC_PLATFORM, 'data/vfx/map-cases.js');
const LIGHTUP_JS = path.join(SRC_PLATFORM, 'data/vfx/lightup.js');
const OUT_PUBLIC = path.join(ROOT, 'public/generated');
const OUT_RAW = path.join(ROOT, 'src/data/raw');
const WIDTHS = [480, 960, 1920, 2880] as const;

function parseWindowAssign(source: string, name: string): unknown {
  const re = new RegExp(`window\\.${name}\\s*=\\s*`);
  const start = source.search(re);
  if (start < 0) throw new Error(`找不到 window.${name}`);
  const after = source.slice(start).replace(re, '');
  const trimmed = after.trim().replace(/;\s*$/, '');
  return JSON.parse(trimmed);
}

interface RawCase {
  id: string;
  name: string;
  url: string;
  studio: string;
  row: string;
  scenes: string[];
  scale: string;
  kind: string;
  core: string;
  reason?: string;
  note?: string;
  capture_failed?: boolean;
  capture_note?: string;
  image_note?: string;
  thumb?: string | null;
  thumb_full?: string | null;
}

interface RawMap {
  rows: { name: string; desc: string }[];
  scenes: { name: string; desc: string; kind: string }[];
  scales: string[];
  cases: RawCase[];
  counts: { ok: number; in_map: number; capture_failed: number; visual_ref: number };
}

interface LightupPage {
  id: string;
  presence: string;
  note: string;
}

interface RawLightup {
  updated_at: string;
  timezone: string;
  reviewed: number;
  source: string;
  counts: {
    present: number;
    near_benchmark: number;
    attempted: number;
    none: number;
    pages_with_coverage: number;
  };
  rows: { name: string; pages: LightupPage[] }[];
  pages: Record<string, { title: string; thumb: string }>;
}

interface ImageRef {
  src: string;
  width: number;
  height: number;
}

async function variantsFor(
  abs: string,
  relDir: string,
  prefix: string,
): Promise<{ thumb: ImageRef; full: ImageRef; files: { dest: string; width: number; height: number }[] }> {
  const img = sharp(abs);
  const meta = await img.metadata();
  const ow = meta.width;
  const oh = meta.height;
  if (!ow || !oh) throw new Error(`无法读取尺寸：${abs}`);
  const ext = path.extname(abs).toLowerCase() === '.jpg' || path.extname(abs).toLowerCase() === '.jpeg' ? 'jpg' : 'webp';
  const usable = WIDTHS.filter((w) => w <= ow);
  const widths = usable.length ? usable : [ow]; // 原图比最小档还窄时只保留原宽，不放大
  const files: { dest: string; width: number; height: number }[] = [];
  await mkdir(path.join(OUT_PUBLIC, relDir), { recursive: true });
  for (const w of widths) {
    const h = Math.round((oh / ow) * w);
    const destRel = path.posix.join('generated', relDir, `${prefix}-${w}.${ext}`);
    const destAbs = path.join(ROOT, 'public', destRel);
    const pipeline = sharp(abs).resize({ width: w, height: h, fit: 'fill' });
    if (ext === 'jpg') await pipeline.jpeg({ quality: 82, mozjpeg: true }).toFile(destAbs);
    else await pipeline.webp({ quality: 82 }).toFile(destAbs);
    files.push({ dest: destRel, width: w, height: h });
  }
  const thumb = files.find((f) => f.width <= 960) ?? files[0]!;
  const thumbRef = files.filter((f) => f.width <= 960).at(-1) ?? files[0]!;
  const fullRef = files.at(-1)!;
  void thumb;
  return {
    thumb: { src: `/${thumbRef.dest}`, width: thumbRef.width, height: thumbRef.height },
    full: { src: `/${fullRef.dest}`, width: fullRef.width, height: fullRef.height },
    files,
  };
}

async function main() {
  const map = parseWindowAssign(await readFile(MAP_JS, 'utf8'), 'VFX_MAP_DATA') as RawMap;
  const lightup = parseWindowAssign(await readFile(LIGHTUP_JS, 'utf8'), 'VFX_LIGHTUP') as RawLightup;

  if (map.cases.length !== 124) throw new Error(`标杆条数不是 124，而是 ${map.cases.length}`);
  const failed = map.cases.filter((c) => c.capture_failed);
  const withThumb = map.cases.filter((c) => c.thumb);
  if (failed.length !== 1) throw new Error(`缺图条数不是 1，而是 ${failed.length}`);
  if (withThumb.length !== 123) throw new Error(`有截图条数不是 123，而是 ${withThumb.length}`);
  if (lightup.reviewed !== 94) throw new Error(`抽样页数不是 94，而是 ${lightup.reviewed}`);
  if (lightup.counts.attempted !== 36) throw new Error(`attempted 不是 36`);
  if (lightup.counts.present !== 0 || lightup.counts.near_benchmark !== 0) {
    throw new Error('点亮或接近标杆不是 0');
  }

  if (existsSync(OUT_PUBLIC)) await rm(OUT_PUBLIC, { recursive: true, force: true });
  await mkdir(OUT_PUBLIC, { recursive: true });
  await mkdir(OUT_RAW, { recursive: true });

  const previewItems: {
    id: string;
    title: string;
    thumbnail: ImageRef;
    full: ImageRef;
  }[] = [];

  const casesOut = [];
  for (const c of map.cases) {
    const missing = Boolean(c.capture_failed) || !c.thumb;
    if (!missing && c.thumb) {
      const thumbAbs = path.join(SRC_PLATFORM, c.thumb);
      if (!existsSync(thumbAbs)) throw new Error(`缺截图文件：${c.thumb}（${c.id}）`);
      const fullSrc = c.thumb_full && c.thumb_full !== c.thumb ? c.thumb_full : c.thumb;
      const fullAbs = path.join(SRC_PLATFORM, fullSrc);
      if (!existsSync(fullAbs)) throw new Error(`缺整页截图文件：${fullSrc}（${c.id}）`);
      const thumbVars = await variantsFor(thumbAbs, `cases/${c.id}`, 'thumb');
      const fullVars = fullAbs === thumbAbs ? thumbVars : await variantsFor(fullAbs, `cases/${c.id}`, 'full');
      previewItems.push({
        id: c.id,
        title: c.name,
        thumbnail: thumbVars.thumb,
        full: fullVars.full,
      });
    }
    casesOut.push({
      id: c.id,
      name: c.name,
      url: c.url,
      studio: c.studio || '',
      row: c.row,
      scenes: c.scenes,
      scale: c.scale,
      kind: c.kind,
      core: c.core,
      reason: c.reason || '',
      note: c.note || '',
      capture_note: c.capture_note || '',
      image_note: c.image_note || '',
      missingCapture: missing,
      missingLabel: missing ? '暂无现场截图' : '',
    });
  }

  const lightupPages: Record<string, { title: string; thumb: ImageRef | null }> = {};
  for (const [id, meta] of Object.entries(lightup.pages)) {
    const abs = path.join(SRC_PLATFORM, meta.thumb);
    if (!existsSync(abs)) throw new Error(`缺现状截图：${meta.thumb}`);
    const vars = await variantsFor(abs, `lightup/${id}`, 'hero');
    lightupPages[id] = { title: meta.title, thumb: vars.thumb };
  }

  const casesJson = {
    title: '已上墙标杆',
    source_id: 'vfx-map-cases',
    rows: map.rows,
    scenes: map.scenes,
    scales: map.scales,
    cases: casesOut,
  };
  const lightupJson = {
    title: '自身抽样现状',
    source_id: 'vfx-lightup',
    updated_at: lightup.updated_at,
    timezone: lightup.timezone,
    reviewed: lightup.reviewed,
    source: lightup.source,
    counts: lightup.counts,
    rows: lightup.rows,
    pages: lightupPages,
  };

  await writeFile(path.join(OUT_RAW, 'cases.json'), JSON.stringify(casesJson, null, 2) + '\n');
  await writeFile(path.join(OUT_RAW, 'lightup.json'), JSON.stringify(lightupJson, null, 2) + '\n');
  await writeFile(
    path.join(OUT_PUBLIC, 'preview-works.json'),
    JSON.stringify({ items: previewItems }, null, 2) + '\n',
  );

  // 部署包里也放一份 JSON，便于核对；站点代码从 src/data/raw 静态导入，不读源目录。
  await writeFile(path.join(OUT_PUBLIC, 'cases.json'), JSON.stringify(casesJson) + '\n');
  await writeFile(path.join(OUT_PUBLIC, 'lightup.json'), JSON.stringify(lightupJson) + '\n');

  console.log(
    `assets: 标杆 ${casesOut.length}（实拍 ${previewItems.length}，缺图 ${casesOut.filter((c) => c.missingCapture).length}），现状页 ${Object.keys(lightupPages).length}`,
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
