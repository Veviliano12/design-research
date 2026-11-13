import { useEffect, useState } from 'react';
import { gsap, prefersReducedMotion } from '../motion/gsap';
import { DUR, EASE } from '../motion/tokens';

/** 数量滚动：减少动态时直接给出终值。 */
export function useCountUp(value: number, active = true): number {
  const [shown, setShown] = useState(prefersReducedMotion() || !active ? value : 0);

  useEffect(() => {
    if (!active) {
      setShown(0);
      return;
    }
    if (prefersReducedMotion()) {
      setShown(value);
      return;
    }
    const proxy = { n: 0 };
    const tween = gsap.to(proxy, {
      n: value,
      duration: DUR.count,
      ease: EASE.out.gsap,
      onUpdate: () => setShown(Math.round(proxy.n)),
    });
    return () => {
      tween.kill();
    };
  }, [value, active]);

  return shown;
}

/** 一组件数同时从 0 滚到终值。token 变化时重播（再次进入语言墙）。 */
export function useWallCounts(
  targets: Record<string, number>,
  token: number,
  active: boolean,
): Record<string, number> {
  const keys = Object.keys(targets);
  const finals = () => Object.fromEntries(keys.map((key) => [key, targets[key] ?? 0]));
  const zeros = () => Object.fromEntries(keys.map((key) => [key, 0]));
  const [shown, setShown] = useState<Record<string, number>>(() =>
    prefersReducedMotion() || !active ? finals() : zeros(),
  );

  useEffect(() => {
    if (!active) return;
    if (prefersReducedMotion()) {
      setShown(finals());
      return;
    }
    const proxy = zeros();
    setShown(zeros());
    const tween = gsap.to(proxy, {
      ...finals(),
      duration: DUR.count,
      ease: EASE.out.gsap,
      onUpdate: () => {
        const next: Record<string, number> = {};
        for (const key of keys) next[key] = Math.round(proxy[key] ?? 0);
        setShown(next);
      },
    });
    return () => {
      tween.kill();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps -- token 是重播开关，targets 由调用方记忆
  }, [active, token]);

  return shown;
}
