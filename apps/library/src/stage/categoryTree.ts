/**
 * 分类树：9 种视效语言 → 已上墙标杆。
 * count 与 featuredCount 都是上墙条数，不是来源库全集，也没有评分。
 */
import { LANGUAGE_HUES, LANGUAGE_IDS, LANGUAGE_NAME_BY_ID, DEFAULT_LANGUAGE_ID, type LanguageId } from '../data/languages';
import { LANGUAGE_CASE_COUNTS, STATS } from '../data/stats';
import { works, type Work } from './works';

export interface LeafWork {
  workIndex: number;
  contentId: string;
  title: string;
}

export interface TreeCategory {
  id: LanguageId;
  label: string;
  hue: number;
  /** 该语言已上墙标杆数（与叶子数相同） */
  count: number;
  featuredCount: number;
  works: LeafWork[];
}

function build(): TreeCategory[] {
  const byContentId = new Map<string, number>();
  works.forEach((w, i) => {
    if (!w.contentId) throw new Error(`分类树：作品 ${w.id} 缺少 contentId`);
    if (byContentId.has(w.contentId)) throw new Error(`分类树：contentId "${w.contentId}" 对应了不止一件作品`);
    byContentId.set(w.contentId, i);
  });

  const categories: TreeCategory[] = LANGUAGE_IDS.map((id, i) => {
    const rec = LANGUAGE_CASE_COUNTS.find((r) => r.id === id);
    if (!rec) throw new Error(`分类树：缺少语言 ${id}`);
    return {
      id,
      label: LANGUAGE_NAME_BY_ID[id],
      hue: LANGUAGE_HUES[i]!,
      count: rec.count,
      featuredCount: 0,
      works: [],
    };
  });
  const catById = new Map(categories.map((c) => [c.id, c]));

  for (const w of works) {
    const cat = catById.get(w.categoryId as LanguageId);
    if (!cat) throw new Error(`分类树：作品 ${w.id} 的语言 "${w.categoryId}" 不在 9 种语言中`);
    cat.works.push({ workIndex: byContentId.get(w.contentId)!, contentId: w.contentId, title: w.title });
  }

  let leafTotal = 0;
  for (const cat of categories) {
    cat.featuredCount = cat.works.length;
    if (cat.featuredCount !== cat.count) {
      throw new Error(`分类树：${cat.label} 的叶子数 ${cat.featuredCount} 与统计 ${cat.count} 不一致`);
    }
    leafTotal += cat.featuredCount;
  }
  if (leafTotal !== works.length || leafTotal !== STATS.benchmarkCount) {
    throw new Error('分类树：作品叶子数与已上墙标杆数不一致');
  }
  return categories;
}

export const CATEGORY_TREE: TreeCategory[] = build();
export const CATEGORY_COUNT = CATEGORY_TREE.length;
export const DEFAULT_ROOT_INDEX = CATEGORY_TREE.findIndex((c) => c.id === DEFAULT_LANGUAGE_ID);
if (DEFAULT_ROOT_INDEX < 0) throw new Error('分类树：没有默认语言「实时 3D · 写实材质与物件」');
export const DEFAULT_FEATURED_COUNT = CATEGORY_TREE[DEFAULT_ROOT_INDEX]!.featuredCount;
export const FEATURED_COUNT = works.length;
export const EMPTY_CATEGORY_COUNT = CATEGORY_TREE.filter((c) => c.featuredCount === 0).length;

export function rootIndexOfWork(w: Work): number {
  return CATEGORY_TREE.findIndex((c) => c.id === w.categoryId);
}

export function categoryLabel(id: string): string {
  return CATEGORY_TREE.find((c) => c.id === id)?.label ?? id;
}
