/**
 * 质量第二页唯一的图片入场规则。42 件舞台作品与 78 件填充缩略图共用同一套起点、位移动画和时序：
 * 从各自格子中心下方、缩小、透明开始，按格子在整个分布图中的顺序错峰，移到最终位置并放大到原尺寸。
 * 舞台作品不再走通用布局补间；填充缩略图也不单独淡入。纯常量与函数，不依赖 React 或 three。
 */
import { DUR, EASE } from '../../motion/tokens';

export const DISTRIBUTION_ENTRY = {
  /** 位移动画时长 */
  duration: DUR.move,
  /** 位移动画缓动 */
  ease: EASE.move.gsap,
  /** 全部图片的错峰总长 */
  stagger: DUR.stagger,
  /** 起点在格子中心下方的距离，按格子高度计 */
  rise: 1.8,
  /** 起点缩放 */
  scale: 0.82,
} as const;

/**
 * 某格图片的入场延迟。order 是该格在整个分布图中的下标（0–299），
 * 舞台作品与填充缩略图都按同一格子下标取延迟，因此两套图片共享同一条错峰编排。
 */
export function distributionEntryDelay(order: number, total: number): number {
  if (total <= 0 || order < 0) return 0;
  return (((order * 7) % total) / total) * DISTRIBUTION_ENTRY.stagger;
}
