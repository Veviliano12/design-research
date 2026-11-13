/**
 * 墙上的标杆与自身抽样，全部从已导出的 raw 数据加路径清单计算。
 * 不手写件数，不把抽样算进 124。
 */
import {
  LANGUAGE_ID_BY_NAME,
  LANGUAGE_ORDER,
  type LanguageId,
  type LanguageName,
} from '../../data/languages';
import {
  CASES,
  LANGUAGE_ATTEMPTS,
  LANGUAGE_CASE_COUNTS,
  LIGHTUP,
  SCENE_FILTERS,
  STATS,
  type CaseRecord,
} from '../../data/stats';
import paths from './paths.json';

export { LANGUAGE_ORDER, LANGUAGE_ID_BY_NAME, LANGUAGE_CASE_COUNTS, LANGUAGE_ATTEMPTS, SCENE_FILTERS, STATS };
export type { LanguageId, LanguageName };

interface PathEntry {
  thumb: string | null;
  full: string | null;
}

interface LightupPath {
  title: string;
  thumb: string | null;
}

const CASE_PATHS = paths.cases as Record<string, PathEntry>;
const LIGHTUP_PATHS = paths.lightup as Record<string, LightupPath>;

export interface WallItem {
  kind: 'benchmark';
  id: string;
  title: string;
  url: string;
  studio: string;
  language: LanguageName;
  languageId: LanguageId;
  scenes: string[];
  scale: string;
  kindLabel: string;
  core: string;
  reason: string;
  note: string;
  missingCapture: boolean;
  thumb: string | null;
  full: string | null;
}

export interface OwnItem {
  kind: 'own';
  /** 同一页可出现在多种语言里，用 pageId + languageId 区分。 */
  id: string;
  pageId: string;
  title: string;
  language: LanguageName;
  languageId: LanguageId;
  presence: 'attempted' | 'present' | 'near_benchmark';
  note: string;
  thumb: string | null;
}

function wallFrom(c: CaseRecord): WallItem {
  const languageId = LANGUAGE_ID_BY_NAME[c.row];
  const p = CASE_PATHS[c.id];
  return {
    kind: 'benchmark',
    id: c.id,
    title: c.name,
    url: c.url,
    studio: c.studio,
    language: c.row,
    languageId,
    scenes: c.scenes,
    scale: c.scale,
    kindLabel: c.kind,
    core: c.core,
    reason: c.reason,
    note: c.note,
    missingCapture: c.missingCapture,
    thumb: c.missingCapture ? null : (p?.thumb ?? null),
    full: c.missingCapture ? null : (p?.full ?? p?.thumb ?? null),
  };
}

export const WALL_ITEMS: WallItem[] = LANGUAGE_ORDER.flatMap((name) =>
  CASES.filter((c) => c.row === name).map(wallFrom),
);

export const WALL_BY_ID = new Map(WALL_ITEMS.map((item) => [item.id, item]));

export const OWN_ITEMS: OwnItem[] = LANGUAGE_ORDER.flatMap((name) => {
  const languageId = LANGUAGE_ID_BY_NAME[name];
  const row = LIGHTUP.rows.find((r) => r.name === name);
  return (row?.pages ?? []).map((page) => {
    const meta = LIGHTUP_PATHS[page.id] ?? LIGHTUP.pages[page.id];
    return {
      kind: 'own' as const,
      id: `${page.id}::${languageId}`,
      pageId: page.id,
      title: meta?.title ?? page.id,
      language: name,
      languageId,
      presence: page.presence,
      note: page.note,
      thumb: (meta && 'thumb' in meta && typeof meta.thumb === 'string' ? meta.thumb : LIGHTUP_PATHS[page.id]?.thumb) ?? null,
    };
  });
});

export const OWN_BY_ID = new Map(OWN_ITEMS.map((item) => [item.id, item]));

export const UNSEEN_LANGUAGES: LanguageName[] = STATS.unseenLanguages;

export type CoverageMark = { type: 'unseen' } | { type: 'attempted'; count: number };

export function coverageMark(name: LanguageName): CoverageMark {
  const row = LANGUAGE_ATTEMPTS.find((r) => r.name === name);
  const count = row?.count ?? 0;
  return count === 0 ? { type: 'unseen' } : { type: 'attempted', count };
}

export function coverageLabel(mark: CoverageMark): string {
  return mark.type === 'unseen' ? '未见' : `做了但不够 ${mark.count}`;
}

export const ALL_SCENES = '全部';
export const ALL_SCALES = '全部';

export function matchesFilter(item: WallItem, scene: string, scale: string): boolean {
  const sceneOk = scene === ALL_SCENES || item.scenes.includes(scene);
  const scaleOk = scale === ALL_SCALES || item.scale === scale;
  return sceneOk && scaleOk;
}

export type FocusTarget =
  | { kind: 'benchmark'; id: string }
  | { kind: 'own'; id: string };

/** 场景筛选：官方表 + 案例里出现过但不在表中的项。内部工具在表里但墙上为 0，不当作开场主轴。 */
export const SCENE_CHIPS: string[] = SCENE_FILTERS.filter((name) =>
  WALL_ITEMS.some((item) => item.scenes.includes(name)),
);
