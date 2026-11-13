/**
 * 自动播放的纯逻辑：每步停留多久、到点后去哪。计时与开关在 Stage 里。
 * 到点后与手动前进共用 nav.next：章末直接进入下一章首步；末章末步回到规模第 1 步，
 * Stage 同时关闭自动播放。聚焦层不自动前进。
 */
import { AUTOPLAY_CAP_MS, AUTOPLAY_DWELL_MS, AUTOPLAY_TAIL_MS } from '../motion/tokens';
import type { Step } from './chapters';
import { next, type NavState } from './nav';

/** 这一步停留多久（毫秒）。awaitSettled 的步：已收到完成信号则只留结尾停留，否则按兜底上限等。 */
export function autoplayDelay(step: Step, settled: boolean): number {
  if (!step.awaitSettled) return step.dwell ?? AUTOPLAY_DWELL_MS;
  return settled ? AUTOPLAY_TAIL_MS : AUTOPLAY_CAP_MS;
}

/** 到点后的下一状态；聚焦时由计时暂停保证不会调用到这里。 */
export function autoplayAdvance(s: NavState, stepCounts: number[]): NavState {
  if (s.focus) return s;
  return next(s, stepCounts);
}
