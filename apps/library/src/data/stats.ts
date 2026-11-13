/**
 * 从导出的原始数据计算口径。禁止在文案里手写与这里不一致的数。
 * 标杆与自身抽样分源存放，互不推算。
 */
import { LANGUAGE_ID_BY_NAME, LANGUAGE_ORDER, type LanguageName } from './languages';
import casesData from './raw/cases.json';
import lightupData from './raw/lightup.json';

export interface CaseRecord {
  id: string;
  name: string;
  url: string;
  studio: string;
  row: LanguageName;
  scenes: string[];
  scale: string;
  kind: string;
  core: string;
  reason: string;
  note: string;
  capture_note: string;
  image_note: string;
  missingCapture: boolean;
  missingLabel: string;
}

export interface LightupEntry {
  id: string;
  presence: 'attempted' | 'present' | 'near_benchmark';
  note: string;
}

export interface LightupRow {
  name: LanguageName;
  pages: LightupEntry[];
}

export interface LightupPageMeta {
  title: string;
  thumb: { src: string; width: number; height: number } | null;
}

const rawCases = casesData as {
  rows: { name: LanguageName; desc: string }[];
  scenes: { name: string; desc: string; kind: string }[];
  scales: string[];
  cases: CaseRecord[];
};

const rawLightup = lightupData as {
  updated_at: string;
  timezone: string;
  reviewed: number;
  source: string;
  counts: {
    present: number;
    near_benchmark: number;
    attempted: number;
    none: number;
    pages_with_coverage: number;
  };
  rows: LightupRow[];
  pages: Record<string, LightupPageMeta>;
};

export const CASE_ROWS = rawCases.rows;
export const CASE_SCENES = rawCases.scenes;
export const CASE_SCALES = rawCases.scales;
export const CASES: CaseRecord[] = rawCases.cases;

export const LIGHTUP = rawLightup;

function countBy<T>(items: T[], key: (item: T) => string): Record<string, number> {
  const out: Record<string, number> = {};
  for (const item of items) {
    const k = key(item);
    out[k] = (out[k] ?? 0) + 1;
  }
  return out;
}

const byLanguage = countBy(CASES, (c) => c.row);
const byKind = countBy(CASES, (c) => c.kind);
const byCore = countBy(CASES, (c) => c.core);
const byScale = countBy(CASES, (c) => c.scale);

const missing = CASES.filter((c) => c.missingCapture);
const attemptedRows = LIGHTUP.rows.map((r) => ({
  name: r.name,
  count: r.pages.length,
  pages: r.pages,
}));
const unseenLanguages = attemptedRows.filter((r) => r.count === 0).map((r) => r.name);
const attemptedLanguages = attemptedRows.filter((r) => r.count > 0).map((r) => r.name);

export const STATS = {
  languageCount: LANGUAGE_ORDER.length,
  benchmarkCount: CASES.length,
  capturedCount: CASES.length - missing.length,
  missingCount: missing.length,
  kindVfx: byKind['视效'] ?? 0,
  kindVisualRef: byKind['视觉参考'] ?? 0,
  coreCount: byCore['核心'] ?? 0,
  decorCount: byCore['装饰'] ?? 0,
  pageScaleCount: byScale['整页'] ?? 0,
  componentScaleCount: byScale['组件'] ?? 0,
  byLanguage,
  reviewedPages: LIGHTUP.reviewed,
  present: LIGHTUP.counts.present,
  nearBenchmark: LIGHTUP.counts.near_benchmark,
  attempted: LIGHTUP.counts.attempted,
  attemptedPages: LIGHTUP.counts.pages_with_coverage,
  unseenLanguages,
  attemptedLanguages,
} as const;

if (STATS.languageCount !== 9) throw new Error(`语言数对不上：${STATS.languageCount}`);
if (STATS.benchmarkCount !== 124) throw new Error(`标杆数对不上：${STATS.benchmarkCount}`);
if (STATS.capturedCount !== 123 || STATS.missingCount !== 1) {
  throw new Error(`截图口径对不上：实拍 ${STATS.capturedCount}，缺图 ${STATS.missingCount}`);
}
if (STATS.kindVfx !== 119 || STATS.kindVisualRef !== 5) throw new Error('视效 / 视觉参考口径对不上');
if (STATS.coreCount !== 118 || STATS.decorCount !== 6) throw new Error('核心 / 装饰口径对不上');
if (STATS.pageScaleCount !== 60 || STATS.componentScaleCount !== 64) throw new Error('整页 / 组件口径对不上');
if (STATS.reviewedPages !== 94) throw new Error(`抽样页数对不上：${STATS.reviewedPages}`);
if (STATS.present !== 0 || STATS.nearBenchmark !== 0) throw new Error('点亮或接近标杆不是 0');
if (STATS.attempted !== 36 || STATS.attemptedPages !== 27) throw new Error('做了但不够口径对不上');
if (STATS.unseenLanguages.length !== 3 || STATS.attemptedLanguages.length !== 6) {
  throw new Error('未见 / 已尝试语言数对不上');
}
for (const name of LANGUAGE_ORDER) {
  if (byLanguage[name] === undefined) throw new Error(`标杆里缺少语言：${name}`);
}
for (const c of CASES) {
  if (!(c.row in LANGUAGE_ID_BY_NAME)) throw new Error(`未知语言：${c.row}（${c.id}）`);
}

export const LANGUAGE_CASE_COUNTS = LANGUAGE_ORDER.map((name) => ({
  name,
  id: LANGUAGE_ID_BY_NAME[name],
  count: byLanguage[name]!,
}));

export const LANGUAGE_ATTEMPTS = LANGUAGE_ORDER.map((name) => {
  const row = LIGHTUP.rows.find((r) => r.name === name);
  return { name, id: LANGUAGE_ID_BY_NAME[name], count: row?.pages.length ?? 0, pages: row?.pages ?? [] };
});

/** 展墙场景筛选：官方场景表 + 案例里实际出现过、但不在表中的场景。 */
export const SCENE_FILTERS: string[] = (() => {
  const named = CASE_SCENES.map((s) => s.name);
  const seen = new Set(CASES.flatMap((c) => c.scenes));
  const extra = [...seen].filter((s) => !named.includes(s)).sort();
  return [...named, ...extra];
})();
