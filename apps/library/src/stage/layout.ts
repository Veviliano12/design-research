/**
 * 排布与世界坐标。
 * 章节排布函数输出视口像素矩形，用 rectPose 映射到 z=0 的焦平面：镜头正对时 1 个世界单位等于 1 个 CSS 像素，
 * DOM 叠加层（标签、标注、设备框）与焦平面上的作品像素对齐。作品墙是沿 z 轴的纵深流，由 flowPose 给出。
 * 所有排布都覆盖全部作品，不参与当前排布的作品保留位置但降低透明度，补间始终在同一批作品间进行。
 */
import { pageGrid } from './composition';
import { NAV_H } from '../motion/tokens';
import { TILE_RATIO, works } from './works';
import { WALL_COUNT } from './wallWorks';

export interface Rect {
  x: number;
  y: number;
  w: number;
  h: number;
}

export interface Placement extends Rect {
  opacity: number;
}

export interface Label {
  x: number;
  y: number;
  text: string;
}

export interface Arrangement {
  placements: Map<string, Placement>;
  labels?: Label[];
}

/** 舞台框架：文案区与作品区的划分。 */
export interface Frame {
  vw: number;
  vh: number;
  compact: boolean;
  /** 底部导航高度 */
  nav: number;
  /** 章节文案区 */
  copy: Rect;
  /** 章节作品区 */
  area: Rect;
}

export type LayoutFn = (frame: Frame) => Arrangement;

export const DIM = 0.06;

export function measureFrame(vw: number, vh: number): Frame {
  const compact = vw < 900 || vw / vh < 1.1;
  const nav = compact ? NAV_H.compact : NAV_H.desktop;
  const pad = compact ? 16 : Math.round(vw * 0.04);
  if (compact) {
    const copyH = Math.round((vh - nav) * 0.32);
    return {
      vw, vh, compact, nav,
      copy: { x: pad, y: pad, w: vw - pad * 2, h: copyH - pad },
      area: { x: pad, y: copyH + 8, w: vw - pad * 2, h: vh - nav - copyH - 8 - pad },
    };
  }
  const copyW = Math.round(vw * 0.27);
  const top = Math.round(vh * 0.08);
  return {
    vw, vh, compact, nav,
    copy: { x: pad, y: top, w: copyW, h: vh - nav - top * 2 },
    area: { x: pad + copyW + pad, y: top, w: vw - copyW - pad * 3, h: vh - nav - top * 2 },
  };
}

/** 通用文案在各章的构图：scale 左上小标题，headline 左下大标题，quality 质量章节单件质量分段的单件上方标题，其余沿用 frame.copy。 */
export type CopyVariant = 'default' | 'scale' | 'headline' | 'quality';

export function copyRect(variant: CopyVariant, f: Frame): Rect {
  if (f.compact || variant === 'default') return f.copy;
  const c = pageGrid(f);
  if (variant === 'scale') return { x: Math.round(c.x(0)), y: Math.round(c.top), w: Math.round(c.span(4)), h: Math.round(f.vh * 0.22) };
  if (variant === 'headline') {
    const h = Math.round(f.vh * 0.34);
    return { x: Math.round(c.x(0)), y: Math.round(c.bottom) - h, w: Math.round(c.span(6)), h };
  }
  return featureGeometry(f).title;
}

const place = (r: Rect, opacity = 1): Placement => ({ ...r, opacity });

/** 在矩形内居中放一组网格，返回每格位置。 */
function gridIn(area: Rect, n: number, cols: number, gap: number): Rect[] {
  const rows = Math.ceil(n / cols);
  const tw = Math.min((area.w - gap * (cols - 1)) / cols, ((area.h - gap * (rows - 1)) / rows) * TILE_RATIO);
  const th = tw / TILE_RATIO;
  const totalW = cols * tw + (cols - 1) * gap;
  const totalH = rows * th + (rows - 1) * gap;
  const x0 = area.x + (area.w - totalW) / 2;
  const y0 = area.y + (area.h - totalH) / 2;
  return Array.from({ length: n }, (_, i) => ({
    x: x0 + (i % cols) * (tw + gap),
    y: y0 + Math.floor(i / cols) * (th + gap),
    w: tw,
    h: th,
  }));
}

// ---------- 章节排布 ----------

/** 规模：全部作品收拢成整齐网格。 */
export const gridLayout: LayoutFn = (f) => {
  const cols = f.compact ? 4 : 6;
  const cells = gridIn(f.area, works.length, cols, f.compact ? 6 : 14);
  return { placements: new Map(works.map((w, i) => [w.id, place(cells[i]!)])) };
};

/** 质量章节单件质量分段的版面：居中单件、上方标题块、下方规格行，左右留给旁注。DOM 注释与作品排布共用，数值均为整数像素。 */
export interface FeatureGeometry {
  /** 紧凑布局：旁注退回成作品上的标注点，没有规格行 */
  compact: boolean;
  piece: Rect;
  title: Rect;
  specs: Rect;
  /** 旁注：文字靠作品一侧的边缘（左列右对齐于 left.edge，右列左对齐于 right.edge）与文字可用宽度 */
  notes: { left: { edge: number; w: number }; right: { edge: number; w: number }; lead: number };
}

const featureCache = new WeakMap<Frame, FeatureGeometry>();

export function featureGeometry(f: Frame): FeatureGeometry {
  let g = featureCache.get(f);
  if (g) return g;
  if (f.compact) {
    const w = Math.round(Math.min(f.area.w * 0.86, f.area.h * 0.86 * TILE_RATIO));
    const h = Math.round(w / TILE_RATIO);
    const piece = { x: Math.round(f.area.x + (f.area.w - w) / 2), y: Math.round(f.area.y + (f.area.h - h) / 2), w, h };
    g = { compact: true, piece, title: f.copy, specs: { x: 0, y: 0, w: 0, h: 0 }, notes: { left: { edge: piece.x, w: 0 }, right: { edge: piece.x + w, w: 0 }, lead: 0 } };
    featureCache.set(f, g);
    return g;
  }
  const c = pageGrid(f);
  const top = Math.round(c.top);
  const bottom = Math.round(c.bottom);
  const titleH = Math.round(f.vh * 0.14);
  const specH = Math.round(f.vh * 0.05);
  const gapY = Math.round(f.vh * 0.025);
  const y0 = top + titleH;
  const y1 = bottom - specH - gapY;
  const w = Math.round(Math.min(c.span(6), (y1 - y0) * TILE_RATIO));
  const h = Math.round(w / TILE_RATIO);
  const piece = { x: Math.round((f.vw - w) / 2), y: Math.round(y0 + (y1 - y0 - h) / 2), w, h };
  const lead = Math.round(f.vw * 0.03);
  const left = piece.x - lead;
  const right = piece.x + piece.w + lead;
  const x0 = Math.round(c.x(0));
  g = {
    compact: false,
    piece,
    title: { x: x0, y: top, w: Math.round(c.span(8)), h: titleH },
    specs: { x: x0, y: bottom - specH, w: Math.round(c.span(12)), h: specH },
    notes: { left: { edge: left, w: left - x0 }, right: { edge: right, w: Math.round(c.x(12) - c.gap) - right }, lead },
  };
  featureCache.set(f, g);
  return g;
}

/** 旁注与标注点的几何。dot 是作品上的真实相对位置，note 是旁注文字的锚点（靠作品一侧的边缘），lines 是引线折点。 */
export interface FeatureNote {
  side: 'left' | 'right';
  dot: { x: number; y: number };
  note: { x: number; y: number };
  /** 引线：旁注锚点 → 作品边缘（水平）→ 标注点 */
  elbow: { x: number; y: number };
}

/** 把标注（作品内相对坐标 0–1）按左右分栏，同侧旁注在竖直方向上互相错开，引线不交叉。紧凑布局返回空数组（沿用作品上的标注点）。 */
export function featureNotes(f: Frame, marks: readonly { x: number; y: number }[]): FeatureNote[] {
  const g = featureGeometry(f);
  if (g.compact) return [];
  const { piece } = g;
  const minGap = Math.round(f.vh * 0.07);
  const out: (FeatureNote | undefined)[] = marks.map(() => undefined);
  for (const side of ['left', 'right'] as const) {
    const idx = marks.map((m, i) => ({ m, i })).filter(({ m }) => (m.x < 0.5) === (side === 'left')).sort((a, b) => a.m.y - b.m.y);
    const ys = idx.map(({ m }) => Math.round(piece.y + m.y * piece.h));
    for (let k = 1; k < ys.length; k++) ys[k] = Math.max(ys[k]!, ys[k - 1]! + minGap);
    // 下方溢出作品范围时整体上移
    const over = (ys[ys.length - 1] ?? 0) - (piece.y + piece.h);
    if (over > 0) for (let k = 0; k < ys.length; k++) ys[k] = ys[k]! - over;
    idx.forEach(({ m, i }, k) => {
      const edge = side === 'left' ? g.notes.left.edge : g.notes.right.edge;
      const y = ys[k]!;
      out[i] = {
        side,
        dot: { x: Math.round(piece.x + m.x * piece.w), y: Math.round(piece.y + m.y * piece.h) },
        note: { x: edge, y },
        elbow: { x: side === 'left' ? piece.x : piece.x + piece.w, y },
      };
    });
  }
  return out as FeatureNote[];
}

/**
 * 质量章节的单件质量分段：一件作品居中放大，其余作品退到背景。
 * 桌面端背景作品缩成单件后方的小网格（落在单件矩形内、被它完全遮住），左右旁注与规格行下不留作品；
 * 紧凑布局沿用作品区网格。
 */
export function featureLayout(featuredId: string): LayoutFn {
  return (f) => {
    const g = featureGeometry(f);
    const back = f.compact
      ? gridIn(f.area, works.length, 4, 6)
      : gridIn({ x: g.piece.x, y: g.piece.y, w: g.piece.w, h: g.piece.h }, works.length, 6, 6);
    const placements = new Map<string, Placement>(works.map((w, i) => [w.id, place(back[i]!, DIM)]));
    placements.set(featuredId, place(g.piece));
    return { placements };
  };
}

// ---------- 聚焦 ----------

/** 设备框中的屏幕区域与旁边元数据区。 */
export interface FocusGeometry {
  screen: Rect;
  /** 浏览器顶栏高度与边框宽度 */
  chrome: number;
  bezel: number;
  /** 设备框外沿（含浏览器顶栏） */
  device: Rect;
  meta: Rect;
}

export function focusGeometry(f: Frame): FocusGeometry {
  const chrome = f.compact ? 22 : 34;
  const bezel = f.compact ? 6 : 12;
  if (f.compact) {
    const maxW = f.vw - 32;
    const metaH = 120;
    const availH = f.vh - f.nav - metaH - 48;
    const sw = Math.round(Math.min(maxW - bezel * 2, (availH - chrome - bezel * 2) * TILE_RATIO));
    const sh = Math.round(sw / TILE_RATIO);
    const dx = Math.round((f.vw - sw - bezel * 2) / 2);
    const dy = 24;
    return {
      chrome,
      bezel,
      device: { x: dx, y: dy, w: sw + bezel * 2, h: sh + chrome + bezel * 2 },
      screen: { x: dx + bezel, y: dy + bezel + chrome, w: sw, h: sh },
      meta: { x: 16, y: dy + sh + chrome + bezel * 2 + 16, w: f.vw - 32, h: metaH },
    };
  }
  const pad = Math.round(f.vw * 0.04);
  const metaW = Math.round(f.vw * 0.22);
  const top = Math.round(f.vh * 0.06);
  const availW = f.vw - pad * 3 - metaW;
  const availH = f.vh - f.nav - top * 2;
  const sw = Math.round(Math.min(availW - bezel * 2, (availH - chrome - bezel * 2) * TILE_RATIO));
  const sh = Math.round(sw / TILE_RATIO);
  const dw = sw + bezel * 2;
  const dh = sh + chrome + bezel * 2;
  const dx = Math.round(pad + (availW - dw) / 2);
  const dy = Math.round(top + (availH - dh) / 2);
  return {
    chrome,
    bezel,
    device: { x: dx, y: dy, w: dw, h: dh },
    screen: { x: dx + bezel, y: dy + bezel + chrome, w: sw, h: sh },
    meta: { x: dx + dw + pad, y: dy, w: metaW, h: dh },
  };
}

// ---------- 世界坐标 ----------

/** 镜头竖直视角（度）。镜头距焦平面 depth(frame)，使焦平面上 1 单位 = 1 CSS 像素。 */
export const FOV = 35;

export const depth = (f: Frame) => f.vh / 2 / Math.tan((FOV * Math.PI) / 360);

/** 作品在世界中的姿态。x、y 为中心点，y 向上；w、h 为世界尺寸；o 透明度；dim 亮度；r 圆角。 */
export interface Pose {
  x: number;
  y: number;
  z: number;
  rx: number;
  ry: number;
  rz: number;
  w: number;
  h: number;
  o: number;
  dim: number;
  r: number;
  /** 远景去饱和与压暗强度 0–1；仅作品墙的纵深流设置，缺省为 0 */
  mute?: number;
  /** 纹理饱和度 0–1；缺省为 1（原图），质量分布页由章节排布降到约 0.15 */
  sat?: number;
}

export const emptyPose = (): Pose => ({ x: 0, y: 0, z: 0, rx: 0, ry: 0, rz: 0, w: 1, h: 1, o: 0, dim: 1, r: 8 });

/** 视口像素矩形 → 焦平面姿态。取整后边缘落在像素边界上。 */
export function rectPose(r: Rect, f: Frame, opacity = 1, radius = 8): Pose {
  const x = Math.round(r.x);
  const y = Math.round(r.y);
  const w = Math.round(r.w);
  const h = Math.round(r.h);
  return { x: x + w / 2 - f.vw / 2, y: f.vh / 2 - (y + h / 2), z: 0, rx: 0, ry: 0, rz: 0, w, h, o: opacity, dim: 1, r: radius };
}

// ---------- 作品墙：纵深流 ----------

export interface FlowGeometry {
  D: number;
  /** 最远处 z = -far */
  far: number;
  /** 最近处 z = near，超过后回到远处 */
  near: number;
  span: number;
  tw: number;
  th: number;
  /** 流动速度，世界单位/秒 */
  speed: number;
  /** 焦平面上作品中心的活动区域，中心坐标系，y 向上 */
  region: { cx: number; cy: number; rx: number; ry: number };
}

const flowCache = new WeakMap<Frame, FlowGeometry>();

export function flowGeometry(f: Frame): FlowGeometry {
  let g = flowCache.get(f);
  if (g) return g;
  const D = depth(f);
  const far = 3.2 * D;
  const near = 0.55 * D;
  // 桌面基础卡片比焦平面章节里略小，给散点和近景放大留出余量
  const base = f.compact ? f.vw * 0.42 : Math.min(f.vw * 0.2, f.vh * 0.36 * TILE_RATIO);
  const tw = Math.round(base * (f.compact ? 1 : 0.85));
  const th = Math.round(tw / TILE_RATIO);
  const span = far + near;
  // 焦平面上作品中心的活动区域：整张卡片落在 wallGeometry.safe 内，让开左侧名单、底部导航与右下统计带
  const safe = wallGeometry(f).safe;
  const left = safe.x + tw / 2 - f.vw / 2;
  const right = safe.x + safe.w - tw / 2 - f.vw / 2;
  const top = f.vh / 2 - (safe.y + th / 2);
  const bottom = f.vh / 2 - (safe.y + safe.h - th / 2);
  g = {
    D, far, near, span, tw, th,
    speed: span / 42,
    region: { cx: (left + right) / 2, cy: (top + bottom) / 2, rx: Math.max(0, (right - left) / 2), ry: Math.max(0, (top - bottom) / 2) },
  };
  flowCache.set(f, g);
  return g;
}

// ---------- 作品墙版面：名单、统计块与悬停信息 ----------

/** 统计块底边到导航上沿的间隙。本舞台没有圆墙参数面板，统计块贴在导航之上。 */
const WALL_STATS_GAP = 20;

/** 与 .wall-total 内容大致同高：标签 + 超大数字 + 维度行 +「筛选中」提示预留。 */
function wallStatsHeight(f: Frame): number {
  const value = Math.min(128, Math.max(56, Math.round(f.vw * 0.066)));
  return Math.round(16 + 18 + value * 0.95 + 20 + 36 + 28);
}

export interface WallGeometry {
  /** 名单列：左边距、宽度、行高（像素），以及名单区的上下沿（上沿为内容区上沿，下沿为公共网格下沿） */
  roster: { x: number; w: number; rowH: number; top: number; bottom: number };
  /** 统计块（顶部分区线 + 总量与维度行）：右边缘到视口右的距离、宽度、下沿到视口底的距离、内容高度 */
  stats: { right: number; w: number; bottom: number; h: number };
  /** 名单左侧暗色衬底宽度 */
  scrimW: number;
  /** 悬停信息块：右上角相对视口右、上缘的距离（像素，整数）；右边距与公共网格的页边距一致 */
  info: { x: number; y: number };
  /** 墙上作品（含近景放大后的外沿）必须落在此矩形内，视口像素、y 向下；让开名单、导航与统计带 */
  safe: Rect;
}

const wallCache = new WeakMap<Frame, WallGeometry>();

export function wallGeometry(f: Frame): WallGeometry {
  let g = wallCache.get(f);
  if (g) return g;
  const c = pageGrid(f);
  const x = Math.round(c.margin);
  const rowH = Math.round(f.vh * 0.06);
  const info = { x, y: f.compact ? 16 : Math.round(f.vh * 0.05) };
  const roster = { x, w: Math.round(c.span(3)), rowH, top: Math.round(c.top), bottom: Math.round(c.bottom) };
  const statsBottom = f.nav + WALL_STATS_GAP;
  const statsH = wallStatsHeight(f);
  const stats = { right: x, w: Math.round(c.span(4)), bottom: Math.round(statsBottom), h: statsH };
  const gap = f.compact ? 16 : 20;
  const left = roster.x + roster.w + gap;
  const right = f.vw - gap;
  const top = gap;
  const statsTop = f.vh - stats.bottom - stats.h;
  const bottom = Math.min(f.vh - f.nav - gap, statsTop - gap);
  g = {
    roster,
    stats,
    scrimW: Math.round(c.x(5)),
    info,
    safe: { x: left, y: top, w: Math.max(0, right - left), h: Math.max(0, bottom - top) },
  };
  wallCache.set(f, g);
  return g;
}

const smooth = (a: number, b: number, x: number) => {
  const t = Math.min(1, Math.max(0, (x - a) / (b - a)));
  return t * t * (3 - 2 * t);
};

function seeded(i: number, k: number) {
  const v = Math.sin(i * 127.1 + k * 311.7) * 43758.5453;
  return v - Math.floor(v);
}

/** 墙上展示的作品数；墙的相位、散点、尺寸与到达顺序都按它计算。 */
const N = WALL_COUNT;

const gcd = (a: number, b: number): number => (b ? gcd(b, a % b) : a);

/**
 * 流动相位的步长：相邻作品在纵深上隔开约 STRIDE / N 圈。步长必须与 N 互质，i ↦ i·STRIDE mod N 才是
 * 一一映射，到达顺序才能覆盖全部作品；因此从 7 起向上取第一个与 N 互质的数，件数任意都成立。
 */
const STRIDE = (() => {
  let s = 7;
  while (N > 1 && gcd(s, N) !== 1) s++;
  return s;
})();

/** 每件墙上作品的纵深流动相位；屏幕位置、尺寸与倾斜由 wallScatter、wallSize、wallTilt 给出。 */
const lanes = Array.from({ length: N }, (_, i) => ({
  // STRIDE 与墙上作品数互质（见上）：相邻作品在纵深上错开
  phase: ((i * STRIDE) % N) / N,
}));

// ---------- 作品墙的屏幕散点 ----------

/** 固定种子 RNG（mulberry32）：散点每次加载都相同，不使用 Math.random。 */
function seededRandom(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** 散点的最小间距（归一化坐标）：best-candidate 取到该间距即停，取不到时退回当前最优候选。 */
const SCATTER_GAP = 0.285;

/**
 * 在 [-1,1]² 上用 best-candidate 取 count 个保持最小间距的点，固定种子，再按固定种子的随机顺序
 * 分配给作品序号，使 x/y 与流动相位解耦，避免到达顺序在屏幕上连成斜线。
 * 坐标是屏幕平面上的归一化偏移，flowPose 按深度补偿成世界坐标。
 */
function scatterPoints(count: number): { x: number; y: number }[] {
  const random = seededRandom(0x5eed1a7);
  const points: { x: number; y: number }[] = [];
  for (let i = 0; i < count; i++) {
    let best = { x: 0, y: 0 };
    let bestD = -1;
    for (let k = 0; k < 128; k++) {
      const p = { x: random() * 2 - 1, y: random() * 2 - 1 };
      let d = Infinity;
      for (const q of points) d = Math.min(d, Math.hypot(p.x - q.x, p.y - q.y));
      if (d > bestD) {
        bestD = d;
        best = p;
      }
      if (d >= SCATTER_GAP) break;
    }
    points.push(best);
  }
  const order = Array.from({ length: count }, (_, i) => i).sort((a, b) => seeded(a, 9) - seeded(b, 9));
  const out: { x: number; y: number }[] = new Array(count);
  order.forEach((wi, k) => (out[wi] = points[k]!));
  return out;
}

/** 墙面散点：只覆盖墙上展示的 N 件作品。 */
const wallScatter = scatterPoints(N);

/** 每件墙上作品的稳定尺寸系数与常态倾角（约 ±4°，弧度），悬停时倾角回正。 */
const wallSize = Array.from({ length: N }, (_, i) => 0.86 + seeded(i, 6) * 0.26);
const wallTilt = Array.from({ length: N }, (_, i) => [(seeded(i, 11) - 0.5) * 0.14, (seeded(i, 12) - 0.5) * 0.14] as const);

/**
 * 到达顺序。流动偏移换算成到达计数 A = offset / span × N；A 为整数 k 时，arrivalSeq[k mod N] 恰在焦平面上。
 * 名单按这个顺序排列，因此名单当前行与焦平面上的作品一致；序列只含墙上展示的作品序号。
 */
export const arrivalOf = (i: number) => (N - ((i * STRIDE) % N)) % N;
export const arrivalSeq: number[] = (() => {
  const seq = new Array<number>(N);
  for (let i = 0; i < N; i++) seq[arrivalOf(i)] = i;
  return seq;
})();
export const arrivalCount = (f: Frame, offset: number) => (offset / flowGeometry(f).span) * N;

/**
 * 纵深流：作品沿 z 从远处流向镜头。offset 为累计流动距离；flowZ = 0 时第 1 件作品恰在焦平面上。
 * 每件作品在屏幕上占一个固定散点，xy 按深度反向补偿，远景不会被透视压向中央；每件有约 ±4° 的常态微倾角，
 * 悬停时推近并摆正。两端淡入淡出，远处变暗、去饱和。
 * 不在墙上的作品不参与流动：停在墙外的深处且完全透明，进入章节时从那里开始补间。
 */
export function flowPose(i: number, f: Frame, offset: number, hover = 0): Pose {
  const g = flowGeometry(f);
  if (i >= WALL_COUNT) return { ...emptyPose(), x: 0, y: 0, z: -g.far, w: g.tw, h: g.th, o: 0, dim: 0, r: 8, mute: 1 };
  const lane = lanes[i]!;
  const z = -g.far + ((((lane.phase * g.span + offset + g.far) % g.span) + g.span) % g.span);
  const nearZ = z + hover * 0.12 * g.D;
  const spot = wallScatter[i]!;
  const safe = wallGeometry(f).safe;
  const perspZ = (g.D - z) / g.D;
  const perspNear = (g.D - nearZ) / g.D;
  // 近景投影宽度上限：不超过安全区，避免一张大卡压住名单或统计
  const capW = Math.min((f.compact ? 0.82 : 0.28) * f.vw, Math.max(8, safe.w - 8));
  const capH = Math.max(8, safe.h - 8);
  const maxScreenW = Math.min(capW, capH * TILE_RATIO);
  const w = Math.min(g.tw * wallSize[i]!, (maxScreenW * (g.D - nearZ)) / g.D);
  const h = w / TILE_RATIO;
  const screenW = w / perspNear;
  const screenH = h / perspNear;
  // 先按未悬停深度补偿到目标屏幕点，再把实际投影（含悬停推近）钳进安全区
  let px = g.region.cx + spot.x * g.region.rx + f.vw / 2;
  let py = f.vh / 2 - (g.region.cy + spot.y * g.region.ry);
  const wx0 = (px - f.vw / 2) * perspZ;
  const wy0 = (f.vh / 2 - py) * perspZ;
  px = wx0 / perspNear + f.vw / 2;
  py = f.vh / 2 - wy0 / perspNear;
  const minX = safe.x + screenW / 2;
  const maxX = safe.x + safe.w - screenW / 2;
  const minY = safe.y + screenH / 2;
  const maxY = safe.y + safe.h - screenH / 2;
  px = minX <= maxX ? Math.min(Math.max(px, minX), maxX) : safe.x + safe.w / 2;
  py = minY <= maxY ? Math.min(Math.max(py, minY), maxY) : safe.y + safe.h / 2;
  const sx = (px - f.vw / 2) * perspNear;
  const sy = (f.vh / 2 - py) * perspNear;
  const flat = 1 - hover;
  // 近景淡出推迟到 near 段的末段：作品到达 0.6 near 才开始变淡，0.95 near 时已完全透明，回绕前不可见
  const o = smooth(-g.far, -g.far + 0.12 * g.span, z) * (1 - smooth(g.near * 0.6, g.near * 0.95, z));
  return {
    x: sx,
    y: sy,
    z: nearZ,
    rx: wallTilt[i]![0] * flat,
    ry: wallTilt[i]![1] * flat,
    rz: 0,
    w,
    h,
    o,
    dim: 0.1 + 0.9 * smooth(-g.far, 0, z),
    r: 8,
    // 与 dim 反向并取平方：焦平面及更近为 0，越远越接近 1，近处更干净
    mute: (1 - smooth(-g.far, 0, z)) ** 2,
  };
}
