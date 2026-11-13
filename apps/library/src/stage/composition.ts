/**
 * 公共舞台构图：12 列页面网格。
 * 各章节的 DOM 内容、作品排布和结构线都从这里取列位与上下边界，使跨章切换时左右边距、标题基线和底边保持一致。
 * 纯函数，只依赖视口尺寸；返回的数值不取整，由使用方按需取整。
 */

import { NAV_H } from '../motion/tokens';

export interface PageGrid {
  /** 窄屏或竖屏：沿用 measureFrame 的判断，网格降级为窄边距 */
  compact: boolean;
  /** 左右边距 */
  margin: number;
  /** 列间距 */
  gap: number;
  /** 单列宽度 */
  column: number;
  /** 内容区上沿（标题栏之下） */
  top: number;
  /** 内容区下沿（底部导航之上） */
  bottom: number;
  /** 第 index 列（从 0 起）的左边缘 */
  x(index: number): number;
  /** 连续 count 列的总宽（含其间的列间距） */
  span(count: number): number;
}

export const GRID_COLUMNS = 12;

export function pageGrid({ vw, vh }: { vw: number; vh: number }): PageGrid {
  const compact = vw < 900 || vw / vh < 1.1;
  const nav = compact ? NAV_H.compact : NAV_H.desktop;
  // 窄屏：边距 16、列间距 8；上沿让出 72 的标题栏，下沿让出底部导航，各再留 16
  const margin = compact ? 16 : vw * 0.05;
  const gap = compact ? 8 : vw * 0.0125;
  const top = compact ? 72 : vh * 0.14;
  // 桌面：导航之上留 2% 视口高（与导航加高前导航上方约 18px 的间隙一致）
  const bottom = compact ? vh - nav - 16 : vh - nav - Math.round(vh * 0.02);
  const column = (vw - 2 * margin - (GRID_COLUMNS - 1) * gap) / GRID_COLUMNS;
  return {
    compact,
    margin,
    gap,
    column,
    top,
    bottom,
    x: (index) => margin + index * (column + gap),
    span: (count) => count * column + (count - 1) * gap,
  };
}
