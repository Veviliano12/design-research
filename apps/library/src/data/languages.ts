/** 9 种视效语言：顺序与地图 rows 一致，是分类树与展墙名单的唯一轴。 */
export const LANGUAGE_ORDER = [
  '液态玻璃与光学',
  '流体与着色器场',
  '光与发光',
  '粒子与点云',
  '图像与视频后期',
  '生成艺术与程序化图形',
  '实时 3D · 写实材质与物件',
  '实时 3D · 场景与世界',
  '物理与软体模拟',
] as const;

export type LanguageName = (typeof LANGUAGE_ORDER)[number];

export const LANGUAGE_IDS = [
  'liquid-glass',
  'fluid-shader',
  'light',
  'particles',
  'post',
  'generative',
  'material-object',
  'scene-world',
  'physics',
] as const;

export type LanguageId = (typeof LANGUAGE_IDS)[number];

export const LANGUAGE_ID_BY_NAME: Record<LanguageName, LanguageId> = {
  '液态玻璃与光学': 'liquid-glass',
  '流体与着色器场': 'fluid-shader',
  '光与发光': 'light',
  '粒子与点云': 'particles',
  '图像与视频后期': 'post',
  '生成艺术与程序化图形': 'generative',
  '实时 3D · 写实材质与物件': 'material-object',
  '实时 3D · 场景与世界': 'scene-world',
  '物理与软体模拟': 'physics',
};

export const LANGUAGE_NAME_BY_ID: Record<LanguageId, LanguageName> = {
  'liquid-glass': '液态玻璃与光学',
  'fluid-shader': '流体与着色器场',
  light: '光与发光',
  particles: '粒子与点云',
  post: '图像与视频后期',
  generative: '生成艺术与程序化图形',
  'material-object': '实时 3D · 写实材质与物件',
  'scene-world': '实时 3D · 场景与世界',
  physics: '物理与软体模拟',
};

/** 规模第 2 步推进的语言：条数最多的一棵。 */
export const DEFAULT_LANGUAGE_ID: LanguageId = 'material-object';

/**
 * 大类色相。强调色是荧光黄绿，避开约 45–110 度。
 * 9 个色相按语言顺序错开。
 */
export const LANGUAGE_HUES = [200, 172, 24, 312, 258, 148, 282, 188, 336] as const;

if (LANGUAGE_HUES.length !== LANGUAGE_ORDER.length) {
  throw new Error('语言色相数量与语言数不一致');
}
