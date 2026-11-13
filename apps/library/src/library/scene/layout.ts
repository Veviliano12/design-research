/**
 * 两层凹圆柱展墙。语言墙是上行 5、下行 4 错缝嵌在同一面墙上；
 * 案例墙是密铺屏幕。镜头在房间里看墙，不在圆心上看一圈正面卡片。
 * 件少时仍用同一圆柱，屏幕更大、构图完整，不拿空框或别的语言来凑。
 * 世界单位约等于米。
 */
import type { LanguageId } from '../../data/languages';
import { LANGUAGE_PANELS, type LanguagePanel } from '../data/catalog';
import type { WallItem } from '../data/items';

export const FOV = 66;
export const LANG_RADIUS = 15.47;
export const CASE_RADIUS = 10.95;

/** 16:9 截图 + 底部题名条（约 17.5% 高度）。 */
export const FOOTER_RATIO = 0.175;
export const TILE_ASPECT = 9 / 16 / (1 - FOOTER_RATIO);

export function cylinder(theta: number, y: number, radius: number) {
  return {
    x: Math.sin(theta) * radius,
    y,
    z: -Math.cos(theta) * radius,
    rotY: -theta,
  };
}

export function wrapAngle(delta: number, period: number): number {
  if (period <= 0) return 0;
  return ((delta + period / 2) % period + period) % period - period / 2;
}

// ——— 语言墙：两行，5+4 错缝 ———

export const LANG_TOP = 5;
export const LANG_BOT = 4;
export const PANEL_W = 2.55;
export const PANEL_H = 2.18;
export const PANEL_GAP_X = 0.14;
export const PANEL_GAP_Y = 0.14;
export const PANEL_BAND = 0.26;
export const LANG_ROWS = 2;
export const LANG_BLOCK_H = LANG_ROWS * PANEL_H + (LANG_ROWS - 1) * PANEL_GAP_Y;
/** 由可见弧与 5 列算出，让左右明显转过去。 */
export const LANG_STEP = 0.152;
export const LANG_FILL = 0.56;
export const LANG_CAMERA_DIST = LANG_BLOCK_H / LANG_FILL / (2 * Math.tan((FOV * Math.PI) / 360));
/** 整面墙略偏右，左沿承托目录字。 */
export const LANG_THETA_BIAS = 0.09;
/** 面的转角略大于圆柱切线，加强侧向透视，位置仍在圆柱上。 */
export const LANG_WRAP = 1.14;

export interface PanelPose {
  id: LanguageId;
  index: number;
  col: number;
  row: number;
  theta: number;
  y: number;
  x: number;
  z: number;
  rotY: number;
  w: number;
  h: number;
  panel: LanguagePanel;
}

export interface LanguageWallLayout {
  radius: number;
  dist: number;
  midY: number;
  panels: PanelPose[];
  step: number;
}

export function languageTheta(index: number): { row: number; col: number; theta: number } {
  if (index < LANG_TOP) {
    const col = index;
    return { row: 0, col, theta: (col - (LANG_TOP - 1) / 2) * LANG_STEP + LANG_THETA_BIAS };
  }
  const col = index - LANG_TOP;
  return { row: 1, col, theta: (col - (LANG_BOT - 1) / 2) * LANG_STEP + LANG_THETA_BIAS };
}

export function buildLanguageWallLayout(): LanguageWallLayout {
  const midY = 0;
  const yTop = midY + LANG_BLOCK_H / 2 - PANEL_H / 2;
  const panels: PanelPose[] = LANGUAGE_PANELS.map((panel, index) => {
    const { row, col, theta } = languageTheta(index);
    const y = yTop - row * (PANEL_H + PANEL_GAP_Y);
    const pose = cylinder(theta, y, LANG_RADIUS);
    return {
      id: panel.id,
      index,
      col,
      row,
      theta,
      w: PANEL_W,
      h: PANEL_H,
      panel,
      ...pose,
      rotY: -theta * LANG_WRAP,
    };
  });
  return { radius: LANG_RADIUS, dist: LANG_CAMERA_DIST, midY, panels, step: LANG_STEP };
}

export interface ClusterPose {
  x: number;
  y: number;
  z: number;
  rotY: number;
  w: number;
  h: number;
}

/** 语言牌舞台区里的代表图扇面。件少则只摆真实的那几张。 */
export function clusterLayout(count: number): ClusterPose[] {
  const band = PANEL_H * PANEL_BAND;
  const insetX = PANEL_W * 0.07;
  const insetTop = PANEL_H * 0.05;
  const stageW = PANEL_W - insetX * 2;
  const stageH = PANEL_H - band - insetTop * 2;
  const cx = 0;
  const cy = -PANEL_H / 2 + band + insetTop + stageH / 2;
  const aspect = TILE_ASPECT;

  const make = (w: number, x: number, y: number, z: number, rotY: number): ClusterPose => ({
    x,
    y,
    z,
    rotY,
    w,
    h: w * aspect,
  });

  if (count <= 0) return [];
  if (count === 1) return [make(stageW * 0.58, cx, cy + stageH * 0.02, 0.1, 0)];
  if (count === 2) {
    const w = stageW * 0.4;
    return [
      make(w, cx - stageW * 0.22, cy, 0.09, 0.07),
      make(w, cx + stageW * 0.22, cy, 0.11, -0.07),
    ];
  }

  const heroW = stageW * (count >= 6 ? 0.48 : 0.52);
  const smallW = stageW * 0.25;
  const hero = make(heroW, cx + stageW * 0.02, cy + stageH * 0.03, 0.12, 0);
  const slots = [
    { x: -stageW * 0.3, y: stageH * 0.2, z: 0.07, r: 0.11 },
    { x: stageW * 0.32, y: stageH * 0.16, z: 0.08, r: -0.13 },
    { x: -stageW * 0.28, y: -stageH * 0.16, z: 0.09, r: 0.09 },
    { x: stageW * 0.3, y: -stageH * 0.14, z: 0.07, r: -0.09 },
    { x: -stageW * 0.08, y: stageH * 0.3, z: 0.06, r: 0.04 },
    { x: stageW * 0.1, y: -stageH * 0.28, z: 0.06, r: -0.05 },
  ];
  return [hero, ...slots.slice(0, count - 1).map((s) => make(smallW, cx + s.x, cy + s.y, s.z, s.r))];
}

// ——— 案例墙 ———

export const TILE_W = 1.48;
export const TILE_H = TILE_W * TILE_ASPECT;
export const CASE_GAP_X = 0.075;
export const CASE_GAP_Y = 0.075;
export const CASE_STEP = (TILE_W + CASE_GAP_X) / CASE_RADIUS;
export const CASE_ROWS_MAX = 3;
export const CASE_BLOCK_H = CASE_ROWS_MAX * TILE_H + (CASE_ROWS_MAX - 1) * CASE_GAP_Y;
export const CASE_FILL = 0.58;
export const CASE_CAMERA_DIST = CASE_BLOCK_H / CASE_FILL / (2 * Math.tan((FOV * Math.PI) / 360));
/** 选中案例略偏右，把可读槽位让出左侧目录。 */
export const CASE_VIEW_BIAS = 0.18;
export const CASE_WRAP = 1.12;

export type TileKind = 'benchmark';

export interface TilePose {
  id: string;
  index: number;
  col: number;
  row: number;
  theta: number;
  y: number;
  x: number;
  z: number;
  rotY: number;
  w: number;
  h: number;
  item: WallItem;
}

export interface WallLayout {
  radius: number;
  dist: number;
  midY: number;
  tiles: TilePose[];
  cols: number;
  rows: number;
  step: number;
}

export function rowCountFor(n: number): number {
  if (n <= 3) return 1;
  if (n <= 6) return 2;
  return 3;
}

/** 1–3 件时用更大的屏幕，仍落在同一圆柱上，不铺满 32 件那种密度。 */
export function caseTileSize(n: number): { w: number; h: number; gap: number; step: number } {
  if (n <= 0) return { w: TILE_W, h: TILE_H, gap: CASE_GAP_X, step: CASE_STEP };
  if (n === 1) {
    const w = 2.9;
    return { w, h: w * TILE_ASPECT, gap: CASE_GAP_X, step: (w + 0.16) / CASE_RADIUS };
  }
  if (n === 2) {
    const w = 2.5;
    return { w, h: w * TILE_ASPECT, gap: 0.16, step: (w + 0.16) / CASE_RADIUS };
  }
  if (n === 3) {
    const w = 2.15;
    return { w, h: w * TILE_ASPECT, gap: 0.14, step: (w + 0.14) / CASE_RADIUS };
  }
  return { w: TILE_W, h: TILE_H, gap: CASE_GAP_X, step: CASE_STEP };
}

export function buildCaseWallLayout(items: WallItem[]): WallLayout {
  const n = items.length;
  const rows = rowCountFor(n);
  const cols = Math.max(1, Math.ceil(Math.max(n, 1) / rows));
  const { w, h, gap, step } = caseTileSize(n);
  const midY = 0;
  const usedH = rows * h + Math.max(0, rows - 1) * (n <= 3 ? gap : CASE_GAP_Y);
  const yTop = midY + usedH / 2 - h / 2;
  const tiles: TilePose[] = items.map((item, index) => {
    const col = Math.floor(index / rows);
    const row = index % rows;
    const theta = (col - (cols - 1) / 2) * step;
    const y = yTop - row * (h + (n <= 3 ? gap : CASE_GAP_Y));
    const pose = cylinder(theta, y, CASE_RADIUS);
    return {
      id: item.id,
      index,
      col,
      row,
      theta,
      w,
      h,
      item,
      ...pose,
      rotY: -theta * CASE_WRAP,
    };
  });
  return { radius: CASE_RADIUS, dist: CASE_CAMERA_DIST, midY, tiles, cols, rows, step };
}

export function yawForTheta(theta: number, bias = CASE_VIEW_BIAS): number {
  return -theta - bias;
}

export function nearestTileIndex(yaw: number, layout: WallLayout): number {
  if (layout.tiles.length === 0) return 0;
  let best = 0;
  let bestDist = Infinity;
  const seen = new Set<number>();
  for (const tile of layout.tiles) {
    if (seen.has(tile.col)) continue;
    seen.add(tile.col);
    const target = yawForTheta(tile.theta);
    const dist = Math.abs(wrapAngle(yaw - target, Math.max(layout.cols * layout.step, 0.0001)));
    if (dist < bestDist) {
      bestDist = dist;
      best = tile.index;
    }
  }
  return best;
}

export function tileIndexAtYaw(yaw: number, layout: WallLayout, currentRow = 0): number {
  const base = nearestTileIndex(yaw, layout);
  const tile = layout.tiles[base];
  if (!tile) return 0;
  const sameCol = layout.tiles.find((t) => t.col === tile.col && t.row === currentRow);
  return sameCol?.index ?? base;
}

/** 越出墙沿时的橡皮筋极限（弧度）。视觉上不会走进空黑场。 */
export const YAW_RUBBER = 0.11;

export function clampYaw(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

/** 把无约束的 raw 映射到带橡皮筋阻力的可视偏航。 */
export function applyRubber(raw: number, min: number, max: number, rubber = YAW_RUBBER): number {
  if (raw >= min && raw <= max) return raw;
  if (raw < min) {
    const over = min - raw;
    return min - rubber * (1 - Math.exp(-over / Math.max(rubber, 0.0001)));
  }
  const over = raw - max;
  return max + rubber * (1 - Math.exp(-over / Math.max(rubber, 0.0001)));
}

/**
 * 语言墙可平移范围：够左右看看透视，到头回弹。
 * 右沿夹得更早，避免下行左侧牌（生成艺术、流体）的标题压进目录字。
 * 默认偏航 0 仍是 5+4 错缝的首屏构图。
 * 群组绕 Y 旋转 yaw 后，牌的视向角约为 theta - yaw。
 */
export const LANG_YAW_RUBBER = 0.055;

export function languageYawExtents(layout: LanguageWallLayout): { min: number; max: number } {
  void layout;
  return { min: -0.16, max: 0.075 };
}

/** 展墙上一点绕 Y 旋转 yaw 之后的视向角（左负右正）。 */
export function viewTheta(theta: number, yaw: number): number {
  const a = theta - yaw;
  return ((a + Math.PI) % (Math.PI * 2) + Math.PI * 2) % (Math.PI * 2) - Math.PI;
}

/**
 * 案例墙可平移范围：夹在首尾列的取景偏航之间，不允许转出墙外。
 * 1–3 件时区间很窄，只留橡皮筋，松手回中。
 */
export function caseYawExtents(layout: WallLayout): { min: number; max: number } {
  if (layout.tiles.length === 0) return { min: 0, max: 0 };
  let minTheta = Infinity;
  let maxTheta = -Infinity;
  for (const tile of layout.tiles) {
    if (tile.theta < minTheta) minTheta = tile.theta;
    if (tile.theta > maxTheta) maxTheta = tile.theta;
  }
  const max = yawForTheta(minTheta);
  const min = yawForTheta(maxTheta);
  return min <= max ? { min, max } : { min: max, max: min };
}

/** 最近一列（不把墙当成环，避免在墙外“绕到另一头”）。 */
export function nearestTileIndexBounded(yaw: number, layout: WallLayout): number {
  if (layout.tiles.length === 0) return 0;
  let best = 0;
  let bestDist = Infinity;
  const seen = new Set<number>();
  for (const tile of layout.tiles) {
    if (seen.has(tile.col)) continue;
    seen.add(tile.col);
    const target = yawForTheta(tile.theta);
    const dist = Math.abs(yaw - target);
    if (dist < bestDist) {
      bestDist = dist;
      best = tile.index;
    }
  }
  return best;
}
