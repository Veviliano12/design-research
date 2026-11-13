/**
 * 首页加载页：舞台内的 DOM 遮罩，显示站点名与真实进度条。不 import three，随 Stage 进首屏。
 * done 变真后淡出（时长与缓动取 motion tokens 的 CSS 变量），淡出结束调用 onGone 由 Stage 从 DOM 移除；
 * prefers-reduced-motion 下不淡出，直接调用 onGone。
 */
import { useEffect, useRef, type CSSProperties } from 'react';
import { prefersReducedMotion } from '../motion/gsap';
import { DUR } from '../motion/tokens';

interface Props {
  /** 0–1 */
  progress: number;
  done: boolean;
  onGone: () => void;
}

export function StageLoader({ progress, done, onGone }: Props) {
  const goneRef = useRef(onGone);
  goneRef.current = onGone;
  const pct = Math.round(Math.max(0, Math.min(1, progress)) * 100);

  useEffect(() => {
    if (!done) return;
    if (prefersReducedMotion()) {
      goneRef.current();
      return;
    }
    // transitionend 在后台标签页等情况下可能不触发：按淡出时长加余量兜底移除
    const t = window.setTimeout(() => goneRef.current(), DUR.slow * 1000 + 200);
    return () => window.clearTimeout(t);
  }, [done]);

  return (
    <div
      className={`stage-loader${done ? ' is-out' : ''}`}
      role="status"
      aria-live="polite"
      onTransitionEnd={(e) => {
        if (done && e.target === e.currentTarget && e.propertyName === 'opacity') goneRef.current();
      }}
    >
      <div className="stage-loader__body">
        <p className="stage-loader__site">高阶视效研究</p>
        <div
          className="stage-loader__bar"
          role="progressbar"
          aria-label="加载进度"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={pct}
          style={{ '--fill': `${pct}%` } as CSSProperties}
        />
        <p className="stage-loader__pct" aria-hidden="true">
          {pct}%
        </p>
      </div>
    </div>
  );
}
