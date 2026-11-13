/**
 * 章节配置。顺序即导航顺序；hidden 的章节只占位，不进入导航、按键和 hash。
 * 文案与步数严格按 NARRATIVE.md；数字来自导出数据的统计。
 */
import type { ComponentType } from 'react';
import { STATS } from '../data/stats';
import { CATEGORY_TREE, DEFAULT_ROOT_INDEX } from './categoryTree';
import { QualityStage, QUALITY_STEPS, qualityStepLayout } from './chapters/QualityStage';
import { gridLayout, type CopyVariant, type LayoutFn } from './layout';
import { ScaleOverlay } from './ScaleOverlay';
import type { ChapterOverlayProps } from './stageApi';

export interface Stat {
  value: string;
  label: string;
}

export interface Mark {
  x: number;
  y: number;
  text: string;
}

export interface Copy {
  kicker?: string;
  title?: string;
  body?: string;
  stats?: Stat[];
  marks?: Mark[];
  variant?: CopyVariant;
}

export interface NebulaSpec {
  view: 'all' | 'fill' | number;
  labels: 'none' | 'root';
}

export interface Step {
  layout?: LayoutFn;
  nebula?: NebulaSpec;
  wall?: true;
  copy?: Copy;
  markOn?: string;
  dwell?: number;
  awaitSettled?: boolean;
}

export interface Chapter {
  id: string;
  title: string;
  hidden?: boolean;
  steps: Step[];
  Overlay?: ComponentType<ChapterOverlayProps>;
}

const placeholderStep = (title: string): Step => ({
  layout: gridLayout,
  copy: { title, body: '这一章还没准备好，先不进入导览。' },
});

const focusTree = CATEGORY_TREE[DEFAULT_ROOT_INDEX]!;

export const allChapters: Chapter[] = [
  {
    id: 'scale',
    title: '规模',
    Overlay: ScaleOverlay,
    steps: [
      {
        nebula: { view: 'all', labels: 'root' },
        copy: {
          variant: 'scale',
          kicker: '规模',
          title: `${STATS.languageCount} 种语言，${STATS.benchmarkCount} 条已上墙标杆`,
        },
      },
      {
        nebula: { view: DEFAULT_ROOT_INDEX, labels: 'root' },
        copy: {
          variant: 'headline',
          kicker: `规模 · ${focusTree.label}`,
          title: `${focusTree.count} 条`,
          body: '这是单个物件的实时 3D 与写实材质。每片真叶是一条已上墙标杆；悬停看名称与来源，点击打开详情。其余 8 种语言变暗，不在这一步展开。',
        },
      },
      { wall: true },
    ],
  },
  {
    id: 'quality',
    title: '质量',
    Overlay: QualityStage,
    steps: Array.from({ length: QUALITY_STEPS }, (_, i): Step => ({ layout: qualityStepLayout(i) })),
  },
  { id: 'compare', title: '对比', hidden: true, steps: [placeholderStep('对比')] },
  { id: 'completeness', title: '项目完整度', hidden: true, steps: [placeholderStep('项目完整度')] },
  { id: 'iterate', title: '改造前后', hidden: true, steps: [placeholderStep('改造前后')] },
  { id: 'training', title: '训练效果', hidden: true, steps: [placeholderStep('训练效果')] },
];

export const chapters = allChapters.filter((c) => !c.hidden);
