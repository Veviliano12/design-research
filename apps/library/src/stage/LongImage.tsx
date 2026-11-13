import { useEffect, useRef, useState } from 'react';
import { gsap, prefersReducedMotion } from '../motion/gsap';
import { longImageFallbackUrl, longImageUrl, type Work } from './works';

/**
 * 聚焦层整页长图：加载完成后缓慢自动滚动。减少动效时不滚动。
 * 真实长图失败时退回中性长图，不伪造页面。
 */
export function LongImage({
  work,
  active,
  onFallback,
}: {
  work: Work;
  active: boolean;
  onFallback?: () => void;
}) {
  const [url, setUrl] = useState<string>();
  const img = useRef<HTMLImageElement>(null);
  const failed = useRef(false);

  useEffect(() => {
    let alive = true;
    failed.current = false;
    setUrl(undefined);
    longImageUrl(work).then((u) => alive && setUrl(u), console.error);
    return () => {
      alive = false;
    };
  }, [work, work.source]);

  useEffect(() => {
    const el = img.current;
    if (!url || !active || !el) return;
    let tween: gsap.core.Tween | undefined;
    const start = () => {
      if (prefersReducedMotion()) return;
      const box = el.parentElement!.clientHeight;
      const travel = el.clientHeight - box;
      if (travel <= 0) return;
      tween = gsap.to(el, {
        y: -travel,
        duration: travel / 70,
        ease: 'none',
        delay: 1.2,
        repeat: -1,
        yoyo: true,
        repeatDelay: 1.5,
      });
    };
    if (el.complete) start();
    else el.addEventListener('load', start, { once: true });
    return () => {
      el.removeEventListener('load', start);
      tween?.kill();
      gsap.set(el, { y: 0 });
    };
  }, [url, active]);

  if (!url) return null;
  return (
    <span className={`long-image${active ? ' is-on' : ''}`} data-long={work.id}>
      <img
        ref={img}
        src={url}
        alt={`${work.title} 整页`}
        draggable={false}
        onError={() => {
          if (failed.current || work.source !== 'screenshot') return;
          failed.current = true;
          onFallback?.();
          longImageFallbackUrl(work).then(setUrl, console.error);
        }}
      />
    </span>
  );
}
