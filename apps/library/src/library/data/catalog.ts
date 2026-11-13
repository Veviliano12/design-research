/**
 * 两层墙的目录数据：九种语言牌、代表图、按场景分组。
 * 件数全部从已导出数据计算，不手写。
 */
import type { LanguageId, LanguageName } from '../../data/languages';
import { LANGUAGE_CASE_COUNTS } from './items';
import { WALL_ITEMS, type WallItem } from './items';

export const SCENE_ORDER = [
  '落地页',
  '店铺与购买',
  '互动体验与游戏',
  '教育与展览',
  '创作工具',
  '数据可视化',
  '内部工具',
  '个人站点',
  '界面',
] as const;

export const ALL_SCENES = '全部';

/** 牌上的语言名：长名手动两行，不把词拆开。 */
export const NAME_LINES: Record<LanguageId, string[]> = {
  'liquid-glass': ['液态玻璃与光学'],
  'fluid-shader': ['流体与着色器场'],
  light: ['光与发光'],
  particles: ['粒子与点云'],
  post: ['图像与', '视频后期'],
  generative: ['生成艺术与', '程序化图形'],
  'material-object': ['实时 3D ·', '写实材质与物件'],
  'scene-world': ['实时 3D ·', '场景与世界'],
  physics: ['物理与软体模拟'],
};

export function primaryScene(item: WallItem): string {
  const distinctive = SCENE_ORDER.find((scene) => scene !== '落地页' && item.scenes.includes(scene));
  if (distinctive) return distinctive;
  if (item.scenes.includes('落地页')) return '落地页';
  return item.scenes[0] ?? '未标注';
}

function representativeCount(total: number): number {
  if (total <= 6) return total;
  if (total <= 11) return 5;
  if (total <= 19) return 6;
  return 7;
}

export interface LanguagePanel {
  id: LanguageId;
  name: LanguageName;
  count: number;
  items: WallItem[];
  representatives: WallItem[];
}

export const LANGUAGE_PANELS: LanguagePanel[] = LANGUAGE_CASE_COUNTS.map((row) => {
  const items = WALL_ITEMS.filter((item) => item.languageId === row.id);
  const withThumbs = items.filter((item) => item.thumb && !item.missingCapture);
  const pool = withThumbs.length > 0 ? withThumbs : items;
  return {
    id: row.id,
    name: row.name,
    count: row.count,
    items,
    representatives: pool.slice(0, representativeCount(pool.length)),
  };
});

export const PANEL_BY_ID = new Map(LANGUAGE_PANELS.map((panel) => [panel.id, panel]));

export function itemsForLanguage(id: LanguageId): WallItem[] {
  return PANEL_BY_ID.get(id)?.items ?? [];
}

export function filterByScene(items: WallItem[], scene: string): WallItem[] {
  if (scene === ALL_SCENES) return items;
  return items.filter((item) => item.scenes.includes(scene));
}

export function groupByScene(items: WallItem[]): { scene: string; items: WallItem[] }[] {
  const map = new Map<string, WallItem[]>();
  for (const item of items) {
    const scene = primaryScene(item);
    const list = map.get(scene);
    if (list) list.push(item);
    else map.set(scene, [item]);
  }
  const known = SCENE_ORDER.filter((scene) => map.has(scene)).map((scene) => ({
    scene,
    items: map.get(scene)!,
  }));
  const extra = [...map.entries()]
    .filter(([scene]) => !(SCENE_ORDER as readonly string[]).includes(scene))
    .map(([scene, grouped]) => ({ scene, items: grouped }));
  return [...known, ...extra];
}

export function scenesPresent(items: WallItem[]): string[] {
  const set = new Set(items.flatMap((item) => item.scenes));
  const known = SCENE_ORDER.filter((scene) => set.has(scene));
  const extra = [...set].filter((scene) => !(SCENE_ORDER as readonly string[]).includes(scene));
  return [...known, ...extra];
}

if (LANGUAGE_PANELS.length !== 9) throw new Error(`语言牌数量对不上：${LANGUAGE_PANELS.length}`);
const total = LANGUAGE_PANELS.reduce((sum, panel) => sum + panel.count, 0);
if (total !== 124) throw new Error(`语言件数之和对不上：${total}`);
for (const panel of LANGUAGE_PANELS) {
  if (panel.representatives.some((item) => item.languageId !== panel.id)) {
    throw new Error(`语言牌代表图混入了其他语言：${panel.name}`);
  }
  if (panel.count <= 2 && panel.representatives.length !== panel.items.filter((i) => i.thumb && !i.missingCapture).length && panel.items.some((i) => i.thumb && !i.missingCapture)) {
    throw new Error(`件少的语言不得省略已有实拍：${panel.name}`);
  }
}
