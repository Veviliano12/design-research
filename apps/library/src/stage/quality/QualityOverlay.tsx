/**
 * 质量内容层。数字全部来自 LIGHTUP / STATS，不为现状打分，不写「已掌握」。
 */
import type { CSSProperties } from 'react';
import { LANGUAGE_ATTEMPTS, LIGHTUP, STATS } from '../../data/stats';
import { previewUrl } from '../previewWorks';
import type { Frame } from '../layout';
import { pageGrid } from '../composition';
import './quality.css';

interface Props {
  step: number;
  frame: Frame;
  focused: boolean;
  ready: boolean;
}

const CRITERIA = [
  {
    title: '关口是「好看」',
    body: '而且必须像在完整页面或组件里，不是引擎或 playground 的场景照。',
  },
  {
    title: '按视效语言分类',
    body: '分类轴是语言，不是动效。',
  },
  {
    title: '覆盖分三层，都不等于已掌握',
    body: '点亮：这种语言已经出现，哪怕还不够标杆。做了但不够。接近标杆。',
  },
  {
    title: '对照没有就写待补充',
    body: '不为现状打分，不用别的图或生成图代替缺失的对照。',
  },
] as const;

export function QualityOverlay({ step, frame, focused, ready }: Props) {
  const on = ready && !focused && (step === 0 || step === 1);
  const g = pageGrid({ vw: frame.vw, vh: frame.vh });
  const style = {
    left: g.x(0),
    top: g.top,
    width: g.span(12),
    height: Math.max(0, g.bottom - g.top),
  } as CSSProperties;

  return (
    <div className={`qfx${on ? ' is-on' : ''}${frame.compact ? ' qfx--compact' : ''}`} style={style} aria-hidden={!on}>
      {step === 0 && <SetupPage />}
      {step === 1 && <CoveragePage compact={frame.compact} />}
    </div>
  );
}

function SetupPage() {
  return (
    <section className="qfx-setup">
      <p className="qfx-kicker">质量 · 评价基准</p>
      <h2 className="qfx-title">先看是不是高阶语言</h2>
      <ol className="qfx-criteria">
        {CRITERIA.map((c, i) => (
          <li key={c.title}>
            <span className="qfx-no">{String(i + 1).padStart(2, '0')}</span>
            <div>
              <h3>{c.title}</h3>
              <p>{c.body}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}

function CoveragePage({ compact }: { compact: boolean }) {
  return (
    <section className="qfx-cover">
      <header className="qfx-cover-head">
        <p className="qfx-kicker">质量 · 覆盖</p>
        <h2 className="qfx-title">还没有点亮的语言</h2>
      </header>
      <div className={`qfx-langs${compact ? ' is-compact' : ''}`}>
        {LANGUAGE_ATTEMPTS.map((lang) => (
          <article key={lang.id} className="qfx-lang" data-empty={lang.count === 0 ? '1' : '0'}>
            <header>
              <h3>{lang.name}</h3>
              <span>{lang.count === 0 ? '未见' : `${lang.count} 条 · 做了但不够`}</span>
            </header>
            {lang.count === 0 ? (
              <p className="qfx-empty">抽样里还没见到这种语言，不拿标杆图填上。</p>
            ) : (
              <ul>
                {lang.pages.map((p) => {
                  const meta = LIGHTUP.pages[p.id];
                  const note = lang.id === 'post' ? '产品演示样张，不是页内后期语言。' : p.note;
                  return (
                    <li key={`${lang.id}-${p.id}`}>
                      {meta?.thumb ? (
                        <img src={previewUrl(meta.thumb.src)} alt="" width={meta.thumb.width} height={meta.thumb.height} />
                      ) : (
                        <span className="qfx-plate">暂无现场截图</span>
                      )}
                      <div>
                        <strong>{meta?.title ?? p.id}</strong>
                        <em>做了但不够</em>
                        {lang.id === 'post' && <p className="qfx-note">{note}</p>}
                      </div>
                    </li>
                  );
                })}
              </ul>
            )}
          </article>
        ))}
      </div>
      <p className="qfx-foot">
        {STATS.reviewedPages} 页抽样里，点亮和接近标杆都是 {STATS.present}；{STATS.attempted} 条做了但不够，分布在{' '}
        {STATS.attemptedPages} 页，写实材质最多；流体、场景与世界、物理与软体还没见到。
      </p>
    </section>
  );
}
