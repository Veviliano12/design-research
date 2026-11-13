/**
 * 聚焦详情：当前步之上的一层。放大截图（缺图则中性底板 +「暂无现场截图」），
 * 以及名称、来源、场景、语言、整页或组件、原站链接。左右翻同一名单。
 */
import { useLayoutEffect, useMemo, useRef, useState } from 'react';
import { gsap, prefersReducedMotion } from '../../motion/gsap';
import { DUR, EASE } from '../../motion/tokens';
import { LongImage } from '../LongImage';
import type { Frame, Rect } from '../layout';
import { pageGrid } from '../composition';
import { categoryLabel } from '../categoryTree';
import type { Work } from '../works';
import './focus.css';

interface Props {
  work: Work;
  active: boolean;
  frame: Frame;
  onClose: () => void;
}

const rectStyle = (r: Rect) => ({ left: r.x, top: r.y, width: r.w, height: r.h });

function detailGeometry(frame: Frame) {
  const g = pageGrid({ vw: frame.vw, vh: frame.vh });
  const x = g.x(1);
  const w = g.span(10);
  const top = g.top;
  const h = Math.max(0, g.bottom - top);
  const metaW = Math.min(280, Math.round(w * 0.28));
  const gap = 28;
  const imageW = w - metaW - gap;
  return {
    root: { x, y: top, w, h },
    image: { x, y: top, w: imageW, h },
    meta: { x: x + imageW + gap, y: top, w: metaW, h },
  };
}

export function FocusDetail({ work, active, frame, onClose }: Props) {
  const layout = useMemo(() => detailGeometry(frame), [frame]);
  const root = useRef<HTMLDivElement>(null);
  const attempt = `${work.id}:${work.source}`;
  const [failedAttempt, setFailedAttempt] = useState<string | null>(null);
  const [tracked, setTracked] = useState(attempt);
  if (tracked !== attempt) {
    setTracked(attempt);
    setFailedAttempt(null);
  }

  useLayoutEffect(() => {
    const el = root.current;
    if (!el) return;
    if (prefersReducedMotion()) {
      gsap.set(el, { opacity: 1 });
      return;
    }
    gsap.fromTo(el, { opacity: 0 }, { opacity: 1, duration: DUR.fade, ease: EASE.out.gsap });
    return () => {
      gsap.killTweensOf(el);
    };
  }, [work.id]);

  const hasImage = work.source === 'screenshot' && failedAttempt !== attempt;
  const missing = work.missingCapture || work.source === 'missing' || failedAttempt === attempt;
  const status = hasImage ? '实拍截图' : work.source === 'loading' ? '加载中' : '暂无现场截图';

  return (
    <div ref={root} className="fx-detail" style={rectStyle(layout.root)}>
      <div className="fx-board" style={{ width: layout.image.w, height: layout.image.h }}>
        {hasImage ? (
          <LongImage work={work} active={active} onFallback={() => setFailedAttempt(attempt)} />
        ) : (
          <div className="fx-plate">
            <span>{work.source === 'loading' ? '加载中' : '暂无现场截图'}</span>
          </div>
        )}
      </div>
      <aside className="fx-meta" style={{ width: layout.meta.w }}>
        <p className="fx-kicker">{status}</p>
        <h2>{work.title}</h2>
        <dl>
          <div>
            <dt>来源</dt>
            <dd>{work.studio || '未标注工作室'}</dd>
          </div>
          <div>
            <dt>语言</dt>
            <dd>{categoryLabel(work.categoryId)}</dd>
          </div>
          <div>
            <dt>场景</dt>
            <dd>{work.scenes.join('、') || '未标注'}</dd>
          </div>
          <div>
            <dt>尺度</dt>
            <dd>{work.scale}</dd>
          </div>
        </dl>
        {missing && <p className="fx-missing">暂无现场截图，不使用官方预览静帧或视频帧冒充。</p>}
        {work.url && (
          <a className="fx-link" href={work.url} target="_blank" rel="noreferrer">
            打开原站
          </a>
        )}
        <button type="button" className="fx-close" onClick={onClose}>
          关闭
        </button>
      </aside>
    </div>
  );
}
