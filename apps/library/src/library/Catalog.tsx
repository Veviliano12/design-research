import { useEffect, useRef } from 'react';
import type { LanguageId } from '../data/languages';
import { STATS } from '../data/stats';
import {
  ALL_SCENES,
  LANGUAGE_PANELS,
  PANEL_BY_ID,
  filterByScene,
  groupByScene,
  primaryScene,
  scenesPresent,
} from './data/catalog';

interface Props {
  layer: 'languages' | 'cases';
  languageId: LanguageId | null;
  highlightLang: LanguageId | null;
  hoverLang: LanguageId | null;
  caseId: string | null;
  hoverId: string | null;
  scene: string;
  onEnterLang: (id: LanguageId) => void;
  onHoverLang: (id: LanguageId | null) => void;
  onBack: () => void;
  onSelectCase: (id: string) => void;
  onHoverCase: (id: string | null) => void;
  onScene: (scene: string) => void;
  displayCounts: Record<string, number>;
}

export function Catalog({
  layer,
  languageId,
  highlightLang,
  hoverLang,
  caseId,
  hoverId,
  scene,
  onEnterLang,
  onHoverLang,
  onBack,
  onSelectCase,
  onHoverCase,
  onScene,
  displayCounts,
}: Props) {
  const list = useRef<HTMLDivElement>(null);
  const panel = languageId ? PANEL_BY_ID.get(languageId) : undefined;
  const items = panel?.items ?? [];
  const groups = groupByScene(items);
  const scenes = scenesPresent(items);

  useEffect(() => {
    const root = list.current;
    if (!root || layer !== 'cases' || !caseId) return;
    const el = root.querySelector(`[data-qa-row="${CSS.escape(caseId)}"]`);
    if (el instanceof HTMLElement) {
      el.scrollIntoView({ block: 'nearest', inline: 'nearest', behavior: 'instant' as ScrollBehavior });
    }
  }, [caseId, layer, scene]);

  if (layer === 'languages') {
    return (
      <nav className="lib-roster" data-qa="catalog" data-qa-layer="languages" aria-label="视效语言">
        <div className="lib-roster-list" ref={list}>
          <p className="lib-roster-kicker">九种视效语言</p>
          <p className="lib-roster-total">
            <b>{displayCounts.total ?? STATS.benchmarkCount}</b> 件
          </p>
          {LANGUAGE_PANELS.map((item) => {
            const current = highlightLang === item.id;
            const hover = hoverLang === item.id;
            return (
              <button
                type="button"
                key={item.id}
                className={`lib-roster-lang${current ? ' is-current' : ''}${hover ? ' is-hover' : ''}`}
                data-qa-language={item.id}
                onClick={() => onEnterLang(item.id)}
                onMouseEnter={() => onHoverLang(item.id)}
                onMouseLeave={() => onHoverLang(null)}
              >
                <span className="lib-roster-name">{item.name}</span>
                <span className="lib-roster-count">{displayCounts[item.id] ?? item.count}</span>
              </button>
            );
          })}
        </div>
      </nav>
    );
  }

  if (!panel) return null;

  return (
    <nav className="lib-roster" data-qa="catalog" data-qa-layer="cases" aria-label={`${panel.name}案例`}>
      <div className="lib-roster-head">
        <button type="button" className="lib-roster-back" data-qa="back-languages" onClick={onBack}>
          <BackIcon />
          全部语言
        </button>
        <h2 className="lib-roster-heading">{panel.name}</h2>
        <p className="lib-roster-total">
          <b>{panel.count}</b> 件
        </p>
        {scenes.length > 1 && (
          <div className="lib-scene-chips" data-qa="scene-chips">
            <button
              type="button"
              className={`lib-chip${scene === ALL_SCENES ? ' is-on' : ''}`}
              data-qa-scene={ALL_SCENES}
              onClick={() => onScene(ALL_SCENES)}
            >
              全部 {items.length}
            </button>
            {scenes.map((name) => {
              const n = filterByScene(items, name).length;
              return (
                <button
                  type="button"
                  key={name}
                  className={`lib-chip${scene === name ? ' is-on' : ''}`}
                  data-qa-scene={name}
                  onClick={() => onScene(scene === name ? ALL_SCENES : name)}
                >
                  {name} {n}
                </button>
              );
            })}
          </div>
        )}
      </div>
      <div className="lib-roster-list" ref={list}>
        {groups.map((group) => {
          const visible = group.items.filter((item) => scene === ALL_SCENES || item.scenes.includes(scene));
          if (visible.length === 0) return null;
          return (
          <div className="lib-scene-group" key={group.scene} data-qa-group={group.scene}>
            <p className="lib-scene-label">
              {group.scene}
              <span>{visible.length}</span>
            </p>
            {visible.map((item) => {
              const current = caseId === item.id;
              const hover = hoverId === item.id;
              return (
                <button
                  type="button"
                  key={item.id}
                  className={`lib-roster-item${current ? ' is-current' : ''}${hover ? ' is-hover' : ''}`}
                  data-qa-row={item.id}
                  data-qa-case={item.id}
                  data-qa-missing={item.missingCapture ? '1' : '0'}
                  onClick={() => onSelectCase(item.id)}
                  onMouseEnter={() => onHoverCase(item.id)}
                  onMouseLeave={() => onHoverCase(null)}
                >
                  <span className="lib-roster-name">{item.title}</span>
                  <span className="lib-roster-meta">{primaryScene(item)}</span>
                </button>
              );
            })}
          </div>
          );
        })}
      </div>
    </nav>
  );
}

function BackIcon() {
  return (
    <svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M14 5l-7 7 7 7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
