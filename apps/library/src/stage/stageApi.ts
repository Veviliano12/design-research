/**
 * 章节接入点：章节 DOM 叠加组件的属性，以及章节可调用的舞台能力。
 * iterate/、quality/ 等章节模块只依赖本文件，不直接引用 Stage 或 Scene。
 */
import { createContext, useContext } from 'react';
import { VIEW } from '../motion/tokens';
import { pageGrid } from './composition';
import { copyRect, type Frame, type Rect } from './layout';

/** 章节 DOM 叠加组件的属性。组件在本章激活期间常驻，换步时只更新 step，不重新挂载。 */
export interface ChapterOverlayProps {
  /** 当前步序号，从 0 开始 */
  step: number;
  /** 舞台尺寸与版面划分（视口像素） */
  frame: Frame;
  /** 本章处于聚焦层（作品放大到设备框）时为 true，叠加层应隐藏或让位 */
  focused: boolean;
  /**
   * 本章正在离开时的目的地：章节 id，或 'wall'（进入作品墙这一步，即规模章节的最后一步）；没有离开时为 null。
   * Stage 在离开的那次提交里先用这个值再渲染一次本章叠加层，下一次提交才卸载它，
   * 所以叠加层能在卸载清理里读到最后一次的 leavingTo，据此决定离场方式。
   */
  leavingTo: string | null;
  /**
   * 可选：本步的内容播完时调用一次，参数是播完的步序号。供自动播放等 awaitSettled 的步判断何时可以前进；
   * Stage 丢弃与当前章、步不符的过期信号，所以叠加层不必在换步或离场时取消。
   */
  onSettled?: (step: number) => void;
}

/**
 * 章节排布里的 Placement 可附带的姿态提示（结构兼容，layout.ts 的类型不变）。
 * exact：舞台不对位置和尺寸取整，用于与同样未取整的 SVG 小方块逐像素对齐；
 * radius：覆盖默认圆角（像素）；
 * saturate：覆盖作品纹理的饱和度（0–1，缺省 1 为原图），用于把一章的图片统一降饱和；
 * exitFade：离开这个排布时，作品在原位淡出，不参与下一步的位置补间；用于质量分布页；
 * entry：按质量分布页的统一入场规则飞入，order 是格子在整个分布图中的下标，total 是格子总数；
 * inert：该作品不可点击、不参与翻页聚焦（章节拿它当背景或图表元素时使用）。
 * 带 exact 的 opacity 是真实透明度，0 表示隐藏；不带 exact 时 opacity ≤ 0.5 表示退到背景。
 */
export interface PlacementHint {
  exact?: true;
  radius?: number;
  saturate?: number;
  exitFade?: true;
  entry?: { order: number; total: number };
  inert?: true;
}

/** 章节可调用的舞台能力。 */
export interface StageApi {
  /** 让某个大类树上已有的一个作品叶子重新长出（入库外圈），生长完成时 resolve。树不可见时立即 resolve。 */
  nebulaIngest(root: number): Promise<void>;
}

/** 节点标签 DOM 的数量上限：根（大类）远少于这个数，留出将来新增大类的余量 */
export const NEBULA_LABEL_COUNT = 48;

/** 树的节点标签与悬停路径提示的 DOM：Stage 渲染固定数量的节点，树控制器每帧写入位置与文字。 */
export interface NebulaLabelDom {
  root: HTMLDivElement | null;
  items: (HTMLSpanElement | null)[];
  /** 左下角的悬停路径，如“阅读型页面 › 雨后 · 菌圈” */
  path: HTMLDivElement | null;
  /** 入库时扩散的外圈细框，同时至多 4 个 */
  rings: (HTMLSpanElement | null)[];
}

export const createNebulaLabelDom = (): NebulaLabelDom => ({ root: null, items: [], path: null, rings: [] });

/** 同时进行的入库动画上限（也是外圈节点数） */
export const NEBULA_RING_COUNT = 4;

/**
 * 规模章节的版面，像素坐标，全部来自 composition 的 pageGrid。取景与 DOM 叠加层都读这里，几何只有一份；
 * 放在这里是因为 DOM 叠加层要用，而它不能依赖 three。
 * - band：第 1 步（总览）的下部统计带，y 处是发丝线；左侧 SFT 累计组数，右侧分类统计。
 * - index：右侧细索引。第 1 步列 6 个大类，第 2 步（阅读型网页树）列这一大类的数量与质量，两步共用同一矩形。
 *   桌面在右侧 indexCols 栏、从网格上沿到统计带发丝线之上；紧凑布局是统计带上方的一条横带。
 * - tree：第 1 步的树区。桌面全景把网络铺到视口之外（出血），只借它的上沿与高度定竖直中心；紧凑布局是细索引上方的矩形。
 * - title：第 2 步左下大标题的避让区（节点标签不进入），紧凑布局为空。
 * - fill：旧版铺满取景的目标矩形（左、上、下出血，右缘贴着细索引），是总览混合取景的一端。
 * - focus：第 2 步推进到单棵树时的目标矩形。
 */
export interface ScaleRects {
  band: Rect;
  index: Rect;
  tree: Rect;
  title: Rect;
  fill: Rect;
  focus: Rect;
}

export function scaleRects(f: Frame): ScaleRects {
  const g = pageGrid(f);
  const content = g.bottom - g.top;
  const w = f.vw - g.margin * 2;
  if (g.compact) {
    // 自下而上：统计带、细索引、树区；两条带都有最小高度，保证数字与 6 个大类在矮屏上仍放得下
    const bandH = Math.max(VIEW.scaleBandCompactMin, Math.round(content * VIEW.scaleBandCompact));
    const band = { x: g.margin, y: g.bottom - bandH, w, h: bandH };
    const indexH = Math.max(VIEW.indexCompactMin, Math.round(content * VIEW.indexCompact));
    const index = { x: g.margin, y: band.y - g.gap - indexH, w, h: indexH };
    const treeY = Math.max(g.top, Math.round(f.area.y));
    const tree = { x: g.margin, y: treeY, w, h: Math.max(0, index.y - g.gap - treeY) };
    return { band, index, tree, title: { x: 0, y: 0, w: 0, h: 0 }, fill: tree, focus: tree };
  }
  const bandH = Math.round(content * VIEW.scaleBand);
  const band = { x: g.margin, y: g.bottom - bandH, w, h: bandH };
  const tree = { x: g.x(VIEW.scaleFrom), y: g.top, w: g.span(VIEW.scaleCols), h: band.y - g.gap - g.top };
  const index = { x: g.x(12 - VIEW.indexCols), y: g.top, w: g.span(VIEW.indexCols), h: band.y - g.gap - g.top };
  const right = index.x - g.gap;
  // 左下大标题由 Stage 排版，避让区取它的矩形，保证标签与取景读的是同一份
  const title = copyRect('headline', f);
  // 出血：以内容区为准向外放大，但右缘固定在索引左侧
  const fw = Math.round((right - g.x(0)) * VIEW.fillBleed);
  const fh = Math.round(content * VIEW.fillBleed);
  const fill = { x: right - fw, y: Math.round(g.top + content / 2 - fh / 2), w: fw, h: fh };
  const focus = { x: g.x(VIEW.focusFrom), y: g.top, w: right - g.x(VIEW.focusFrom), h: content };
  return { band, index, tree, title, fill, focus };
}

/** 第 1 步统计带（x/y/w/h）与树区（tree）。 */
export function scaleStatsRect(f: Frame): Rect & { tree: Rect } {
  const { band, tree } = scaleRects(f);
  return { ...band, tree };
}

/** 细索引、大标题避让区与两种取景矩形。 */
export function scaleTreeRects(f: Frame): { index: Rect; title: Rect; fill: Rect; focus: Rect } {
  const { index, title, fill, focus } = scaleRects(f);
  return { index, title, fill, focus };
}

/**
 * 树步骤里 3D 节点标签不得进入的 DOM 文案区（视口像素，y 向下）。
 * 规模第 1 步避开左上标题、下部统计带、右侧语言索引与底部导航；
 * 第 2 步避开左下大标题、右侧索引与导航。标签越界则隐藏，不把树硬切。
 */
export function labelAvoidRects(f: Frame, view: 'all' | 'fill' | number | undefined): Rect[] {
  const nav: Rect = { x: 0, y: f.vh - f.nav, w: f.vw, h: f.nav };
  if (view === undefined) return [nav];
  const r = scaleRects(f);
  const rects: Rect[] = [nav, r.index];
  if (view === 'all' || view === 'fill') {
    rects.push(r.band, copyRect('scale', f));
  } else if (r.title.w > 0 && r.title.h > 0) {
    rects.push(r.title);
  }
  return rects;
}

/** 两个轴对齐矩形是否相交；pad 为正时把 b 向外扩大再判断。 */
export function rectsOverlap(a: Rect, b: Rect, pad = 0): boolean {
  return a.x < b.x + b.w + pad && a.x + a.w > b.x - pad && a.y < b.y + b.h + pad && a.y + a.h > b.y - pad;
}

const noop: StageApi = {
  nebulaIngest: () => Promise.resolve(),
};

export const StageApiContext = createContext<StageApi>(noop);

/** 在章节叠加组件内取得舞台能力。 */
export const useStageApi = () => useContext(StageApiContext);
