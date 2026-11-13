import type { LanguageId } from '../data/languages';
import { LANGUAGE_PANELS, PANEL_BY_ID, primaryScene } from './data/catalog';
import type { FocusTarget } from './data/items';
import { platformUrl } from './embed';

interface Props {
  layer: 'languages' | 'cases';
  languageId: LanguageId | null;
  caseId: string | null;
  hoverId: string | null;
  hoverLang: LanguageId | null;
  highlightLang: LanguageId | null;
  onHoverLang: (id: LanguageId | null) => void;
  onEnterLang: (id: LanguageId) => void;
  onHoverCase: (id: string | null) => void;
  onSelectCase: (id: string) => void;
  onOpenCase: (target: FocusTarget) => void;
  note?: string;
}

export function FallbackWall({
  layer,
  languageId,
  caseId,
  hoverId,
  hoverLang,
  highlightLang,
  onHoverLang,
  onEnterLang,
  onHoverCase,
  onSelectCase,
  onOpenCase,
  note,
}: Props) {
  const panel = languageId ? PANEL_BY_ID.get(languageId) : undefined;

  return (
    <div className="lib-gl-fallback" data-qa="fallback-wall">
      {note && <p className="lib-gl-note">{note}</p>}
      {layer === 'languages' || !panel ? (
        <div className="lib-flat lib-flat-langs">
          {LANGUAGE_PANELS.map((item) => (
            <button
              key={item.id}
              type="button"
              className={`lib-flat-panel${highlightLang === item.id ? ' is-current' : ''}${hoverLang === item.id ? ' is-hover' : ''}`}
              data-qa-language={item.id}
              onMouseEnter={() => onHoverLang(item.id)}
              onMouseLeave={() => onHoverLang(null)}
              onClick={() => onEnterLang(item.id)}
            >
              <div className="lib-flat-cluster">
                {item.representatives.map((rep) =>
                  rep.missingCapture || !rep.thumb ? (
                    <span key={rep.id} className="lib-flat-mini is-missing">
                      暂无现场截图
                    </span>
                  ) : (
                    <img key={rep.id} src={platformUrl(rep.thumb)} alt="" />
                  ),
                )}
              </div>
              <span className="lib-flat-name">{item.name}</span>
              <span className="lib-flat-count">{item.count} 件</span>
            </button>
          ))}
        </div>
      ) : (
        <div className="lib-flat">
          <div className="lib-flat-grid">
            {panel.items.map((item) => (
              <button
                key={item.id}
                type="button"
                className={`lib-flat-tile${item.missingCapture ? ' is-missing' : ''}${hoverId === item.id ? ' is-hover' : ''}${caseId === item.id ? ' is-current' : ''}`}
                data-qa-case={item.id}
                data-qa-missing={item.missingCapture ? '1' : '0'}
                onMouseEnter={() => onHoverCase(item.id)}
                onMouseLeave={() => onHoverCase(null)}
                onClick={() => {
                  onSelectCase(item.id);
                  onOpenCase({ kind: 'benchmark', id: item.id });
                }}
              >
                {item.missingCapture || !item.thumb ? (
                  '暂无现场截图'
                ) : (
                  <img src={platformUrl(item.thumb)} alt="" />
                )}
                <span className="lib-flat-tag">{primaryScene(item)}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
