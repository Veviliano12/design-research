/**
 * 规模章节叠加层。
 * 第 1 步：下部统计带（9 种语言 · 124 条标杆 · 123 张实拍截图）+ 右侧语言索引（上墙条数）。
 * 第 2 步：细索引改为当前这棵树的上墙条数，不写分数。
 * 第 3 步作品墙不显示本层。
 */
import { useEffect, useRef, type CSSProperties } from 'react';
import { STATS } from '../data/stats';
import { gsap, prefersReducedMotion } from '../motion/gsap';
import { DUR, EASE } from '../motion/tokens';
import { CATEGORY_TREE, DEFAULT_ROOT_INDEX } from './categoryTree';
import { scaleRects, type ChapterOverlayProps } from './stageApi';
import './network.css';

const store = { counted: false };
const fmt = (n: number) => Math.round(n).toLocaleString('zh-CN');

export function ScaleOverlay({ step, frame, focused }: ChapterOverlayProps) {
  return (
    <>
      <ScaleStats frame={frame} on={step === 0 && !focused} />
      {!focused && (step === 0 || step === 1) && <ScaleIndex step={step} frame={frame} />}
    </>
  );
}

function ScaleStats({ frame, on }: { frame: ChapterOverlayProps['frame']; on: boolean }) {
  const totalEl = useRef<HTMLElement>(null);
  const shown = useRef({ value: store.counted ? STATS.benchmarkCount : 0 });

  const writeTotal = () => {
    if (totalEl.current) totalEl.current.textContent = fmt(shown.current.value);
  };

  useEffect(() => {
    if (!on) return;
    if (store.counted || prefersReducedMotion()) {
      store.counted = true;
      shown.current.value = STATS.benchmarkCount;
      writeTotal();
      return;
    }
    store.counted = true;
    const tw = gsap.to(shown.current, {
      value: STATS.benchmarkCount,
      duration: DUR.count,
      delay: DUR.fade,
      ease: EASE.out.gsap,
      onUpdate: writeTotal,
    });
    return () => {
      tw.kill();
      shown.current.value = STATS.benchmarkCount;
    };
  }, [on]);

  const r = scaleRects(frame).band;
  return (
    <aside
      className={`net-scale${frame.compact ? ' net-scale--compact' : ''}${on ? ' is-on' : ''}`}
      style={{ left: r.x, top: r.y, width: r.w, height: r.h, '--band-h': `${r.h}px` } as CSSProperties}
      aria-hidden={!on}
    >
      <div className="net-scale__total">
        <span className="net-scale__label">已上墙标杆</span>
        <strong ref={totalEl} className="net-scale__value">
          {fmt(shown.current.value)}
        </strong>
      </div>
      <div className="net-scale__side">
        <dl className="net-scale__stats">
          <div>
            <dt>{STATS.languageCount}</dt>
            <dd>种语言</dd>
          </div>
          <div>
            <dt>{STATS.capturedCount}</dt>
            <dd>张实拍截图</dd>
          </div>
        </dl>
      </div>
    </aside>
  );
}

interface Row {
  name: string;
  hue: number;
  detail: string;
  share: number | null;
}

function rowsAt(step: number): { title: string; count: number | null; rows: Row[]; note: string | null } {
  if (step === 0) {
    return {
      title: '视效语言',
      count: CATEGORY_TREE.length,
      rows: CATEGORY_TREE.map((c) => ({
        name: c.label,
        hue: c.hue,
        detail: `${fmt(c.count)} 条`,
        share: null,
      })),
      note: null,
    };
  }
  const tree = CATEGORY_TREE[DEFAULT_ROOT_INDEX]!;
  return {
    title: tree.label,
    count: null,
    rows: [{ name: '已上墙标杆', hue: tree.hue, detail: `${fmt(tree.count)} 条`, share: null }],
    note: '其余 8 种语言这一步不展开',
  };
}

const pad2 = (n: number) => String(n).padStart(2, '0');

function ScaleIndex({ step, frame }: { step: number; frame: ChapterOverlayProps['frame'] }) {
  const { index } = scaleRects(frame);
  const { title, count, rows, note } = rowsAt(step);
  return (
    <aside
      className={`net-index${frame.compact ? ' net-index--compact' : ''}`}
      style={{ left: index.x, top: index.y, width: index.w, height: index.h }}
      aria-label={`${title}索引`}
    >
      <p className="net-index__head">
        <span>{title}</span>
        {count !== null && <b>{pad2(count)}</b>}
      </p>
      <ol key={step} className="net-index__list">
        {rows.map((r, i) => (
          <li key={r.name} className="net-index__row" style={{ '--dot': `hsl(${r.hue} 72% 84%)`, '--pct': r.share ?? 0 } as CSSProperties}>
            <span className="net-index__no">{pad2(i + 1)}</span>
            <span className="net-index__name">
              <i />
              {r.name}
            </span>
            <span className="net-index__pct">{r.detail}</span>
          </li>
        ))}
      </ol>
      {note !== null && <p className="net-index__note">{note}</p>}
    </aside>
  );
}
