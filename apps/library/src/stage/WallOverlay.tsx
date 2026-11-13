/**
 * 作品墙 DOM 层：左侧按语言分组的名单、场景筛选、右下统计、悬停信息。
 * 名单行交给 Scene 写入位置；场景筛选同时作用于 3D 墙（不匹配的作品隐去）。
 * 底部口径统计始终写 124 / 123 / 1，不把筛选结果说成新的总量；筛选时另写「筛选中」。
 */
import { useMemo } from 'react';
import { SCENE_FILTERS, STATS } from '../data/stats';
import { CATEGORY_TREE } from './categoryTree';
import type { Frame } from './layout';
import { wallGeometry } from './layout';
import { works } from './works';

export interface WallDom {
  roster: HTMLDivElement | null;
  rows: (HTMLButtonElement | null)[];
  info: HTMLDivElement | null;
  infoIndex: HTMLElement | null;
  infoTitle: HTMLElement | null;
  infoTags: HTMLElement | null;
}

export const createWallDom = (): WallDom => ({
  roster: null,
  rows: [],
  info: null,
  infoIndex: null,
  infoTitle: null,
  infoTags: null,
});

interface Props {
  dom: WallDom;
  frame: Frame;
  on: boolean;
  onOpen: (id: string) => void;
  /** 当前场景筛选；「全部」显示墙上全部作品 */
  scene: string;
  onScene: (scene: string) => void;
}

export function WallOverlay({ dom, frame, on, onOpen, scene, onScene }: Props) {
  const g = wallGeometry(frame);
  const listH = g.roster.bottom - g.roster.top;
  const style = {
    '--roster-x': `${g.roster.x}px`,
    '--roster-w': `${g.roster.w}px`,
    '--roster-top': `${g.roster.top}px`,
    '--roster-h': `${listH}px`,
    '--row-h': `${g.roster.rowH}px`,
    '--row-top': `${Math.round(listH / 2 - g.roster.rowH / 2)}px`,
    '--scrim-w': `${g.scrimW}px`,
    '--stats-right': `${g.stats.right}px`,
    '--stats-w': `${g.stats.w}px`,
    '--stats-bottom': `${g.stats.bottom}px`,
  } as React.CSSProperties;

  const groups = useMemo(
    () =>
      CATEGORY_TREE.map((cat) => ({
        id: cat.id,
        label: cat.label,
        items: works.filter((w) => w.categoryId === cat.id),
      })),
    [],
  );
  const visibleCount = useMemo(
    () => works.filter((w) => scene === '全部' || w.scenes.includes(scene)).length,
    [scene],
  );

  return (
    <>
      <div
        ref={(el) => void (dom.roster = el)}
        className={`roster${on ? ' is-on' : ''}`}
        style={style}
        aria-hidden={!on}
      >
        <div className="roster__scrim" />
        <div className="roster__filter" data-on={on ? '1' : '0'}>
          <span className="roster__filter-label">场景</span>
          <div className="roster__chips" role="tablist" aria-label="按场景筛选">
            <button
              type="button"
              className="roster__chip"
              data-on={scene === '全部' ? '1' : '0'}
              tabIndex={on ? 0 : -1}
              onClick={() => onScene('全部')}
            >
              全部
            </button>
            {SCENE_FILTERS.map((name) => (
              <button
                key={name}
                type="button"
                className="roster__chip"
                data-on={scene === name ? '1' : '0'}
                tabIndex={on ? 0 : -1}
                onClick={() => onScene(name)}
              >
                {name}
              </button>
            ))}
          </div>
        </div>
        <ol className="roster__list" aria-label="已上墙标杆名单">
          {groups.flatMap((g) =>
            g.items.map((w, i) => {
              const match = scene === '全部' || w.scenes.includes(scene);
              return (
                <li key={w.id} data-group={i === 0 ? g.label : undefined}>
                  <button
                    ref={(el) => void (dom.rows[w.index] = el)}
                    type="button"
                    className="roster__row"
                    data-dim={match ? '0' : '1'}
                    tabIndex={on && match ? 0 : -1}
                    onClick={() => match && onOpen(w.id)}
                  >
                    <span className="roster__name">
                      {w.title}
                      {w.missingCapture ? <em className="roster__missing">暂无现场截图</em> : null}
                    </span>
                    <span className="roster__meta">{g.label}</span>
                  </button>
                </li>
              );
            }),
          )}
        </ol>
      </div>

      <div className={`wall-stats${on ? ' is-on' : ''}`} style={style} aria-hidden={!on}>
        <div className="wall-total">
          <div className="wall-rule" />
          <span className="wall-total__label">已上墙标杆</span>
          <strong className="wall-total__value">{STATS.benchmarkCount.toLocaleString('zh-CN')}</strong>
          <dl className="wall-total__dims">
            <div>
              <dt>{STATS.capturedCount}</dt>
              <dd>张实拍截图</dd>
            </div>
            <div>
              <dt>{STATS.missingCount}</dt>
              <dd>条暂无现场截图</dd>
            </div>
          </dl>
          {scene !== '全部' && (
            <p className="wall-total__filter">筛选中 · {visibleCount} 条</p>
          )}
        </div>
      </div>

      <div ref={(el) => void (dom.info = el)} className="wall-info" style={{ '--info-x': `${g.info.x}px`, '--info-y': `${g.info.y}px` } as React.CSSProperties} aria-live="polite">
        <span ref={(el) => void (dom.infoIndex = el)} className="wall-info__index" />
        <strong ref={(el) => void (dom.infoTitle = el)} className="wall-info__title" />
        <span ref={(el) => void (dom.infoTags = el)} className="wall-info__tags" />
      </div>
    </>
  );
}
