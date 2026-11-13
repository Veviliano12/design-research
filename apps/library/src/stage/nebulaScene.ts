/**
 * 分枝网络在舞台中的运行时：状态目标、镜头取景、实例化方块 + 批量曲线 + 尘点的绘制、
 * 入库生长、节点标签与悬停路径。Scene 在自己的帧循环里调用 controller.update，保证镜头先更新、标签后投影。
 *
 * 绘制全部是批量的：方块是一个 InstancedMesh（一次绘制几千个，属性一次上传），边是一个 LineSegments
 * （每条二次贝塞尔预先拆成固定段数，顶点着色器按生长进度裁剪），尘点是一个 Points。
 * 绘制序为尘点、连线、方块与根外圈：前两者叠加混合，方块与外圈用普通预乘 alpha 混合，遮住穿过它的连线。
 * 不为每个节点创建 three 对象；悬停只更新路径文字，不改写着色器数据，也不重算几何。
 */
import * as THREE from 'three';
import { DUR, RATE, VIEW } from '../motion/tokens';
import { CATEGORY_TREE } from './categoryTree';
import { chapters, type NebulaSpec } from './chapters';
import { depth, type Frame, type Rect } from './layout';
import { createForest, Level, type Forest } from './nebula';
import type { NavState } from './nav';
import { NEBULA_LABEL_COUNT, NEBULA_RING_COUNT, labelAvoidRects, rectsOverlap, scaleStatsRect, scaleTreeRects, type NebulaLabelDom } from './stageApi';
import { works } from './works';

// ---------- 状态 ----------

/** 可补间的树与镜头状态。rig 为单位状态（d=1，其余为 0）时，镜头与焦平面像素对齐。 */
export interface NebulaState {
  /** 整体透明度 */
  opacity: number;
  /** 生长进度 0–1：枝条依次画出 */
  grow: number;
  /** 聚焦强度 0–1：推进到单棵树时为 1，其余树退暗；全景与铺满为 0 */
  focus: number;
  /** 镜头距离，单位为焦平面距离 depth(frame) */
  d: number;
  /** 镜头仰角（弧度） */
  elev: number;
  /** 镜头注视点，世界坐标 */
  tx: number;
  ty: number;
}

export const idleNebula = (): NebulaState => ({ opacity: 0, grow: 0, focus: 0, d: 1, elev: 0, tx: 0, ty: 0 });

export function nebulaSpecOf(s: NavState): NebulaSpec | undefined {
  const b = s.base;
  return chapters[b.chapter]!.steps[b.step]!.nebula;
}

/** 目标状态：非树步骤镜头回到单位状态，树淡出。 */
export function nebulaTarget(spec: NebulaSpec | undefined, f: Frame, forest: Forest): NebulaState {
  if (!spec) return { ...idleNebula() };
  return { opacity: 1, grow: 1, focus: typeof spec.view === 'number' ? 1 : 0, ...nebulaView(f, spec.view, forest) };
}

// ---------- 取景 ----------

const realBoundsCache = new WeakMap<Forest, Map<number, { cx: number; cy: number } | null>>();

/** 某棵树真实作品叶（不含根、装饰节点）的外接框中心，树局部坐标；没有真实作品叶时为 null。 */
function realBounds(forest: Forest, root: number): { cx: number; cy: number } | null {
  let byRoot = realBoundsCache.get(forest);
  if (!byRoot) realBoundsCache.set(forest, (byRoot = new Map()));
  if (byRoot.has(root)) return byRoot.get(root)!;
  let x0 = Infinity;
  let y0 = Infinity;
  let x1 = -Infinity;
  let y1 = -Infinity;
  for (let i = 0; i < forest.count; i++) {
    const lv = forest.meta[i * 4]!;
    if (lv !== Level.Leaf || forest.meta[i * 4 + 1] !== root || forest.meta[i * 4 + 3]! > 0.5) continue;
    const x = forest.rect[i * 4]!;
    const y = forest.rect[i * 4 + 1]!;
    const hw = forest.rect[i * 4 + 2]! / 2;
    const hh = forest.rect[i * 4 + 3]! / 2;
    x0 = Math.min(x0, x - hw);
    x1 = Math.max(x1, x + hw);
    y0 = Math.min(y0, y - hh);
    y1 = Math.max(y1, y + hh);
  }
  const out = x0 <= x1 ? { cx: (x0 + x1) / 2, cy: (y0 + y1) / 2 } : null;
  byRoot.set(root, out);
  return out;
}

/** 标签在节点之上占用的高度（像素），取景时预留 */
const LABEL_PX = 40;

/** 铺满取景（总览的混合端之一）时，根节点离视口边缘的最小距离（像素），留出根标签的位置 */
const ROOT_EDGE_PX = { wide: 96, compact: 40 } as const;

/** 一组镜头取景：距离与注视点。 */
interface Shot {
  d: number;
  tx: number;
  ty: number;
}

/** 屏幕位置 (sx, sy) 对准世界点 (cx, cy) 时的注视点：注视点 = 世界点 − 屏幕偏移 × d */
function shotAt(f: Frame, d: number, cx: number, cy: number, sx: number, sy: number): Shot {
  const ox = sx - f.vw / 2;
  const oy = f.vh / 2 - sy;
  return { d, tx: cx - ox * d, ty: cy - oy * d };
}

/**
 * 旧版全景（原规模第 1 步）：只按主簇（forest.core）取景，不把树装进树区，而是按视口宽度铺开（横向出血），
 * 纵向以树区偏下的位置为中心，枝端和尘点越过上下边沿，主簇外的树可截断或出画。
 */
function spreadShot(f: Frame, forest: Forest): Shot {
  const core = forest.core;
  const tree = scaleStatsRect(f).tree;
  // 透视投影：距离 d·D 处 1 像素约 d 个世界单位，所以 d = 外接框尺寸 / 目标尺寸
  // 桌面按视口宽度铺（横向出血）；紧凑布局取“铺满视口宽”和“铺满树区高”中更近的一个，
  // 于是宽高至少有一个方向出血，窄屏上另一个方向自然裁掉枝端
  const d = f.compact
    ? Math.min((2 * core.hw) / (f.vw * VIEW.scaleSpan), (2 * core.hh) / (tree.h * VIEW.scaleSpan))
    : (2 * core.hw) / (f.vw * VIEW.scaleSpan);
  const sx = f.vw * (0.5 + VIEW.scaleShift);
  const sy = tree.y + tree.h * (f.compact ? VIEW.scaleCenterCompact : VIEW.scaleCenter);
  return shotAt(f, d, core.cx, core.cy, sx, sy);
}

/**
 * 旧版铺满（原规模第 2 步）：整片网络装进出血大图矩形，右缘贴着细索引（紧凑布局为细索引上方的树区）。
 * 外沿树的根可能贴到视口边缘：必要时拉远镜头，让每个根离视口边缘至少 ROOT_EDGE_PX，上方再多留 LABEL_PX 放标签。
 */
function fillShot(f: Frame, forest: Forest): Shot {
  const box: Rect = scaleTreeRects(f).fill;
  const { cx, cy } = forest;
  let d = Math.max(forest.hw / (box.w / 2), forest.hh / ((box.h - LABEL_PX) / 2));
  const sx = box.x + box.w / 2;
  const sy = box.y + LABEL_PX / 2 + box.h / 2;
  const m = f.compact ? ROOT_EDGE_PX.compact : ROOT_EDGE_PX.wide;
  for (const r of forest.roots) {
    const rx = forest.rect[r.node * 4]! - cx;
    const ry = forest.rect[r.node * 4 + 1]! - cy;
    if (rx < 0) d = Math.max(d, -rx / Math.max(1, sx - m));
    if (rx > 0) d = Math.max(d, rx / Math.max(1, f.vw - m - sx));
    if (ry > 0) d = Math.max(d, ry / Math.max(1, sy - m - LABEL_PX));
    if (ry < 0) d = Math.max(d, -ry / Math.max(1, f.vh - m - sy));
  }
  return shotAt(f, d, cx, cy, sx, sy);
}

/**
 * 取景：先定画面中的目标矩形，再按要铺进去的树外接框求镜头距离。矩形全部来自 stageApi 的版面函数，
 * 与 DOM 叠加层（统计带、细索引）读的是同一份几何：
 * 'all'：规模第 1 步的总览。镜头距离与注视点取旧版全景（spreadShot）和旧版铺满（fillShot）按 VIEW.overviewMix 的线性混合，
 *       0 为旧版全景、1 为旧版铺满；
 * 'fill'：旧版铺满，保留给尚未改用总览的章节配置；
 * 数字：规模第 2 步推进到该大类的那棵树：真实枝叶的中心落在细索引左侧的 focus 矩形中心，比整树取景更近，装饰叶可出画。
 */
export function nebulaView(f: Frame, view: NebulaSpec['view'], forest: Forest) {
  const elev = 0;
  if (view === 'all') {
    const a = spreadShot(f, forest);
    const b = fillShot(f, forest);
    const k = VIEW.overviewMix;
    return { elev, d: a.d + (b.d - a.d) * k, tx: a.tx + (b.tx - a.tx) * k, ty: a.ty + (b.ty - a.ty) * k };
  }
  if (view === 'fill') return { elev, ...fillShot(f, forest) };
  // 推进到单棵树：先按整棵树装进 focus 矩形求距离，再推近 focusZoom 倍；
  // 注视中心改为真实作品叶的外接框中心，落在 focus 矩形中心，装饰叶可越出画面
  const r = forest.roots[view]!;
  const box = scaleTreeRects(f).focus;
  const d = (Math.max(r.hw / (box.w / 2), r.hh / ((box.h - LABEL_PX) / 2)) * VIEW.focusMargin) / VIEW.focusZoom;
  const real = realBounds(forest, view);
  return { elev, ...shotAt(f, d, real ? real.cx : r.x, real ? real.cy : r.y, box.x + box.w / 2, box.y + box.h / 2) };
}

// ---------- 着色器 ----------

/** 加亮后的大类色（亮度比旧簇色高约 35%）。 */
function categoryColor(i: number): THREE.Color {
  return new THREE.Color().setHSL(CATEGORY_TREE[i]!.hue / 360, 0.72, Math.min(0.92, 0.62 * 1.35));
}

/** 树的根数 = 大类数（含占位），着色器的颜色与聚焦权重数组按它开。 */
const ROOT_COUNT = CATEGORY_TREE.length;
const COLORS: THREE.Color[] = CATEGORY_TREE.map((_, i) => categoryColor(i));

const common = /* glsl */ `
uniform float uGrow;
uniform float uTime;
uniform float uMotion;
uniform float uOpacity;
uniform vec3 uColor[${ROOT_COUNT}];
uniform float uFocusAmt;    // 聚焦强度 0–1：0 = 所有树等亮，1 = 只亮聚焦树，其余退到 uDimOthers
uniform float uDimOthers;   // 非聚焦树的亮度（VIEW.neighborDim）
uniform float uFocusW[${ROOT_COUNT}];   // 每棵树的聚焦权重 0–1（当前聚焦树 1，上一棵随补间 1→0）
float focusK(float root) {
  float w = uFocusW[int(root + 0.5)];
  return mix(1.0, mix(uDimOthers, 1.0, w), uFocusAmt);
}

// 生长：节点在自己的开始时刻之后，用 0.08 的窗口淡入并长出
float growth(float start) {
  return clamp((uGrow * 1.18 - start) / 0.08, 0.0, 1.0);
}
// 缓慢的呼吸漂移：与相位相关的小位移，减少动效时 uMotion 为 0
vec2 drift(float phase) {
  return vec2(sin(uTime * 0.45 + phase), cos(uTime * 0.38 + phase * 1.3)) * 2.2 * uMotion;
}
`;

const nodeVertex = /* glsl */ `
${common}
attribute vec4 aRect;     // x, y, w, h
attribute vec4 aMeta;     // level, 大类序号, 一级枝序号, 装饰标记（着色器只用到大类序号）
attribute vec4 aGrow;     // start, phase, parent, work
varying vec3 vColor;
varying float vAlpha;
void main() {
  float g = growth(aGrow.x);
  vec3 col = uColor[int(aMeta.y)];
  vec2 p = aRect.xy + drift(aGrow.y);
  vec2 local = position.xy * aRect.zw * g;
  vec4 mv = modelViewMatrix * vec4(p + local, 0.0, 1.0);
  gl_Position = projectionMatrix * mv;
  // 聚焦退暗压在颜色上，alpha 只表示生长与整体淡入淡出：节点按普通混合遮住下面的连线，退暗的树也一样
  vColor = col * focusK(aMeta.y);
  vAlpha = g * uOpacity;
}
`;

const nodeFragment = /* glsl */ `
varying vec3 vColor;
varying float vAlpha;
void main() {
  gl_FragColor = vec4(vColor * vAlpha, vAlpha);
}
`;

/** 根外圈：另一个实例层，只有 6 个根，各画一圈比方块大 2 倍的空心细框 */
const ringVertex = /* glsl */ `
${common}
attribute vec4 aRect;
attribute vec4 aMeta;
attribute vec4 aGrow;
varying vec3 vColor;
varying float vAlpha;
varying vec2 vUv;
void main() {
  float g = growth(aGrow.x);
  vec3 col = uColor[int(aMeta.y)];
  vec2 p = aRect.xy + drift(aGrow.y);
  vec2 local = position.xy * aRect.zw * 2.1 * g;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(p + local, 0.0, 1.0);
  // 外圈细框保持 0.7 的半透明；聚焦退暗同节点一样压在颜色上
  vColor = col * focusK(aMeta.y);
  vAlpha = g * 0.7 * uOpacity;
  vUv = position.xy;
}
`;

const ringFragment = /* glsl */ `
varying vec3 vColor;
varying float vAlpha;
varying vec2 vUv;
void main() {
  // 1 像素左右的框线：到边的距离小于 0.03（框边长约 70 像素）
  vec2 d = 0.5 - abs(vUv);
  if (min(d.x, d.y) > 0.018) discard;
  gl_FragColor = vec4(vColor * vAlpha, vAlpha);
}
`;

const edgeVertex = /* glsl */ `
${common}
attribute vec4 aA;        // x0, y0, cx, cy
attribute vec4 aB;        // x1, y1, 大类序号, level
attribute vec3 aSeg;      // t（沿曲线 0–1）, growStart, 未用
varying vec3 vColor;
varying float vAlpha;
void main() {
  float t = aSeg.x;
  vec2 p0 = aA.xy;
  vec2 c = aA.zw;
  vec2 p1 = aB.xy;
  float g = growth(aSeg.y);
  // 沿曲线只画到进度 g：枝条依次画出
  float tt = t * g;
  vec2 q = (1.0 - tt) * (1.0 - tt) * p0 + 2.0 * (1.0 - tt) * tt * c + tt * tt * p1;
  q += drift(aSeg.y * 40.0);
  vec4 mv = modelViewMatrix * vec4(q, 0.0, 1.0);
  gl_Position = projectionMatrix * mv;
  float level = aB.w;
  // 透明度按层级降低：根→一级枝最亮
  float base = level < 1.5 ? 0.85 : level < 2.5 ? 0.5 : 0.24;
  vColor = uColor[int(aB.z)];
  vAlpha = base * g * uOpacity * step(0.001, g) * focusK(aB.z);
}
`;

const edgeFragment = nodeFragment;

const dustVertex = /* glsl */ `
${common}
attribute vec4 aDust;     // x, y, 大类序号, 呼吸相位
uniform float uPixel;
varying vec3 vColor;
varying float vAlpha;
void main() {
  float g = clamp((uGrow - 0.55) / 0.45, 0.0, 1.0);
  vec2 p = aDust.xy + drift(aDust.w) * 1.5;
  vec4 mv = modelViewMatrix * vec4(p, 0.0, 1.0);
  gl_Position = projectionMatrix * mv;
  gl_PointSize = max(1.0, floor(1.6 * uPixel / -mv.z + 0.5));
  vColor = uColor[int(aDust.z)];
  vAlpha = g * 0.5 * uOpacity * focusK(aDust.z);
}
`;

const dustFragment = nodeFragment;

// ---------- 标签 ----------

/**
 * 标签等级对应的节点层级。只有根（大类）带标签。
 */
const LABEL_LEVELS: Record<NebulaSpec['labels'], number> = { none: -1, root: Level.Root };

/** 一步要标注的节点：根（大类）。装饰枝与叶子不标注。 */
function labelIdsOf(fo: Forest, spec: NebulaSpec | undefined): number[] {
  const level = spec ? LABEL_LEVELS[spec.labels] : -1;
  const ids: number[] = [];
  if (level < 0) return ids;
  for (let i = 0; i < fo.count; i++) {
    if (fo.meta[i * 4]! !== Level.Root) continue;
    // 推进到某棵树时，只给这棵树加标签：其余树已退暗，它们的标签留着会漂在暗树上，靠画面边缘时还会被切半
    if (typeof spec!.view === 'number' && fo.meta[i * 4 + 1] !== spec!.view) continue;
    ids.push(i);
  }
  return ids;
}

/**
 * 悬停路径的纯函数：大类 › 作品标题。
 * 只有真实作品的叶子才写标题（与点击打开的作品同一件）；装饰节点标“示意节点”，根只写大类名。
 */
export function pathText(forest: Forest, node: number): string {
  const m = (k: number) => forest.meta[node * 4 + k]!;
  const level = m(0);
  const cat = CATEGORY_TREE[m(1)]!;
  const parts: string[] = [cat.label];
  if (level === Level.Root) return cat.label;
  const w = level === Level.Leaf && m(3) < 0.5 ? works[forest.grow[node * 4 + 3]!] : undefined;
  parts.push(w ? (w.studio ? `${w.title} · ${w.studio}` : w.title) : '示意节点');
  return parts.join(' › ');
}

/** 入库动画：新方块在树末端长出。 */
interface Ingest {
  node: number;
  start: number;
  resolve: () => void;
  done: boolean;
}

/** 曲线批量几何的分段数 */
const SEGMENTS = 14;

export class NebulaController {
  readonly forest: Forest;
  readonly group = new THREE.Group();
  readonly nodes: THREE.InstancedMesh;
  readonly rings: THREE.InstancedMesh;
  readonly edges: THREE.LineSegments;
  readonly dust: THREE.Points;
  /**
   * 作品序号 → 它的作品叶节点序号（没有叶子为 -1）。只是 forest 里已有对应关系（叶子的作品序号）的反查表，
   * 供作品墙从作品叶展开、收回时定位每件作品。
   */
  readonly leafOfWork: Int32Array;
  private uniforms: Record<string, THREE.IUniform>;
  private hoverNode = -1;
  private ingests: Ingest[] = [];
  private now = 0;
  private visible = false;
  private reduced = false;
  /** 标签层当前内容对应的步骤（labels:view）与候选节点；只在收起后换 */
  private labelKey = '';
  private labelIds: number[] = [];
  /** 上一帧标签层是否显示，及最近一次开始收起的时间（与 now 同一时钟）；初始视为很早就已收起 */
  private labelOn = false;
  private labelHideT = -Infinity;
  private warm = 2;
  private sizes: ({ w: number; h: number } | undefined)[] = [];
  private v = new THREE.Vector3();

  constructor(vh: number) {
    this.forest = createForest(vh);
    const f = this.forest;
    this.leafOfWork = new Int32Array(works.length).fill(-1);
    for (let i = 0; i < f.count; i++) {
      if (f.meta[i * 4] !== Level.Leaf || f.meta[i * 4 + 3]! > 0.5) continue;
      const w = f.grow[i * 4 + 3]!;
      if (w >= 0 && w < works.length) this.leafOfWork[w] = i;
    }

    this.uniforms = {
      uGrow: { value: 0 },
      uTime: { value: 0 },
      uMotion: { value: 1 },
      uOpacity: { value: 0 },
      uPixel: { value: vh },
      uColor: { value: COLORS },
      uFocusW: { value: CATEGORY_TREE.map(() => 0) },
      uFocusAmt: { value: 0 },
      uDimOthers: { value: VIEW.neighborDim },
    };

    // 方块：单位正方形实例化（中心为原点）
    const quad = new THREE.PlaneGeometry(1, 1);
    const geo = new THREE.InstancedBufferGeometry();
    geo.index = quad.index;
    geo.setAttribute('position', quad.getAttribute('position'));
    geo.setAttribute('aRect', new THREE.InstancedBufferAttribute(f.rect, 4));
    geo.setAttribute('aMeta', new THREE.InstancedBufferAttribute(f.meta, 4));
    geo.setAttribute('aGrow', new THREE.InstancedBufferAttribute(f.grow, 4));
    geo.instanceCount = f.count;
    // 连线与尘点叠加混合（片元输出已预乘 alpha）；节点与根外圈用普通预乘 alpha 混合，遮住先画的连线与尘点
    const additive = {
      transparent: true,
      depthWrite: false,
      depthTest: false,
      blending: THREE.CustomBlending,
      blendSrc: THREE.OneFactor,
      blendDst: THREE.OneFactor,
      toneMapped: false,
    } as const;
    const opaque = { ...additive, blendDst: THREE.OneMinusSrcAlphaFactor } as const;
    this.nodes = new THREE.InstancedMesh(geo as unknown as THREE.BufferGeometry, new THREE.ShaderMaterial({ vertexShader: nodeVertex, fragmentShader: nodeFragment, uniforms: this.uniforms, ...opaque }), f.count);
    this.nodes.frustumCulled = false;
    this.nodes.renderOrder = 6;

    // 根外圈：只取各根节点的属性，另一个小实例层
    const rootIdx = f.roots.map((r) => r.node);
    const pick4 = (src: Float32Array) => {
      const out = new Float32Array(rootIdx.length * 4);
      rootIdx.forEach((n, k) => out.set(src.subarray(n * 4, n * 4 + 4), k * 4));
      return out;
    };
    const rg = new THREE.InstancedBufferGeometry();
    rg.index = quad.index;
    rg.setAttribute('position', quad.getAttribute('position'));
    rg.setAttribute('aRect', new THREE.InstancedBufferAttribute(pick4(f.rect), 4));
    rg.setAttribute('aMeta', new THREE.InstancedBufferAttribute(pick4(f.meta), 4));
    rg.setAttribute('aGrow', new THREE.InstancedBufferAttribute(pick4(f.grow), 4));
    rg.instanceCount = rootIdx.length;
    this.rings = new THREE.InstancedMesh(rg as unknown as THREE.BufferGeometry, new THREE.ShaderMaterial({ vertexShader: ringVertex, fragmentShader: ringFragment, uniforms: this.uniforms, ...opaque }), rootIdx.length);
    this.rings.frustumCulled = false;
    this.rings.renderOrder = 6;

    // 边：每条曲线拆成 SEGMENTS 段线段，批量一个 LineSegments
    const segCount = f.edgeCount * SEGMENTS;
    const aA = new Float32Array(segCount * 2 * 4);
    const aB = new Float32Array(segCount * 2 * 4);
    const aSeg = new Float32Array(segCount * 2 * 3);
    const pos = new Float32Array(segCount * 2 * 3);
    for (let e = 0; e < f.edgeCount; e++) {
      for (let s = 0; s < SEGMENTS; s++) {
        for (let k = 0; k < 2; k++) {
          const v = (e * SEGMENTS + s) * 2 + k;
          aA.set(f.edgeA.subarray(e * 4, e * 4 + 4), v * 4);
          aB.set(f.edgeB.subarray(e * 4, e * 4 + 4), v * 4);
          aSeg[v * 3] = (s + k) / SEGMENTS;
          aSeg[v * 3 + 1] = f.edgeGrow[e]!;
          aSeg[v * 3 + 2] = 0;
        }
      }
    }
    const eg = new THREE.BufferGeometry();
    eg.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    eg.setAttribute('aA', new THREE.BufferAttribute(aA, 4));
    eg.setAttribute('aB', new THREE.BufferAttribute(aB, 4));
    eg.setAttribute('aSeg', new THREE.BufferAttribute(aSeg, 3));
    eg.boundingSphere = new THREE.Sphere(new THREE.Vector3(), 1e6);
    this.edges = new THREE.LineSegments(eg, new THREE.ShaderMaterial({ vertexShader: edgeVertex, fragmentShader: edgeFragment, uniforms: this.uniforms, ...additive }));
    this.edges.frustumCulled = false;
    this.edges.renderOrder = 5;

    // 尘点
    const dg = new THREE.BufferGeometry();
    dg.setAttribute('position', new THREE.BufferAttribute(new Float32Array(f.dustCount * 3), 3));
    dg.setAttribute('aDust', new THREE.BufferAttribute(f.dust, 4));
    dg.boundingSphere = new THREE.Sphere(new THREE.Vector3(), 1e6);
    this.dust = new THREE.Points(dg, new THREE.ShaderMaterial({ vertexShader: dustVertex, fragmentShader: dustFragment, uniforms: this.uniforms, ...additive }));
    this.dust.frustumCulled = false;
    this.dust.renderOrder = 4;

    this.group.add(this.dust, this.edges, this.nodes, this.rings);
  }

  dispose() {
    this.nodes.geometry.dispose();
    (this.nodes.material as THREE.Material).dispose();
    this.rings.geometry.dispose();
    (this.rings.material as THREE.Material).dispose();
    this.edges.geometry.dispose();
    (this.edges.material as THREE.Material).dispose();
    this.dust.geometry.dispose();
    (this.dust.material as THREE.Material).dispose();
    this.ingests.forEach((i) => i.resolve());
  }

  /**
   * 每帧调用，镜头已更新。s 为当前状态，spec 为当前步骤配置（决定标签）。
   * pointer 为屏幕坐标下的鼠标位置（像素），用于悬停命中；null 表示指针不在舞台内。
   * cameraMoving 为镜头补间仍在进行：此时命中会随镜头逐帧变，悬停暂停（见 updateHover）。
   */
  update(s: NebulaState, spec: NebulaSpec | undefined, f: Frame, camera: THREE.PerspectiveCamera, dpr: number, time: number, dt: number, reduced: boolean, labels: NebulaLabelDom, pointer: { x: number; y: number } | null, cameraMoving: boolean) {
    this.now = time;
    this.reduced = reduced;
    const u = this.uniforms;
    u.uOpacity!.value = s.opacity;
    u.uGrow!.value = s.grow;
    // 聚焦权重：当前聚焦树 → 1，其余树逐帧阻尼衰减到 0。镜头从一棵树平移到下一棵时，旧树的亮度随之平滑退下去
    const target = typeof spec?.view === 'number' ? spec.view : -1;
    const fw = u.uFocusW!.value as number[];
    for (let i = 0; i < fw.length; i++) {
      const to = i === target ? 1 : 0;
      fw[i] = reduced ? to : fw[i]! + (to - fw[i]!) * (1 - Math.exp(-RATE.focusFade * dt));
    }
    u.uFocusAmt!.value = s.focus;
    u.uTime!.value = time;
    u.uMotion!.value = reduced ? 0 : 1;
    u.uPixel!.value = depth(f) * dpr;
    this.visible = s.opacity > 0.01;
    // 前两帧以透明度 0 绘制一次，提前上传顶点数据，第一次进入时不卡顿
    this.group.visible = this.visible || this.warm-- > 0;
    this.updateIngests();
    this.updateHover(spec, f, camera, pointer, labels, cameraMoving);
    this.updateLabels(spec, s, f, camera, labels, cameraMoving);
    this.updateRings(f, camera, labels);
  }

  /** 入库外圈：方块长成之后，一道细框从方块位置向外扩散并淡出（DOM 节点，整像素定位）。 */
  private updateRings(f: Frame, camera: THREE.PerspectiveCamera, dom: NebulaLabelDom) {
    const states = this.ingestStates();
    this.group.updateMatrixWorld();
    camera.updateMatrixWorld();
    for (let k = 0; k < NEBULA_RING_COUNT; k++) {
      const el = dom.rings[k];
      if (!el) continue;
      const st = states[k];
      if (!st || st.ring <= 0) {
        el.style.opacity = '0';
        continue;
      }
      this.v.set(st.x, st.y, 0).applyMatrix4(this.group.matrixWorld).project(camera);
      const x = Math.round((this.v.x * 0.5 + 0.5) * f.vw);
      const y = Math.round((0.5 - this.v.y * 0.5) * f.vh);
      const size = Math.round(16 + st.ring * 56);
      el.style.width = el.style.height = `${size}px`;
      el.style.transform = `translate3d(${x - size / 2}px, ${y - size / 2}px, 0)`;
      el.style.opacity = String(0.9 * (1 - st.ring));
      el.style.borderColor = `#${COLORS[st.root]!.getHexString()}`;
    }
  }

  // ---------- 入库 ----------

  /**
   * 保留的舞台能力：让某个大类树上已有的一个作品叶子重新长出并扩散外圈，生长完成时 resolve。
   * 当前没有调用方（规模章节不再模拟入库），保留给后续的真实入库数据源。
   */
  ingest(root: number): Promise<void> {
    return new Promise((resolve) => {
      if (!this.visible || this.reduced || this.ingests.length >= 4) {
        resolve();
        return;
      }
      // 选一个这棵树上的真实作品叶子：它已存在，入库动画只是把它“重新长出”并扩散外圈
      const f = this.forest;
      const cands: number[] = [];
      for (let i = 0; i < f.count; i++) {
        if (f.meta[i * 4] === Level.Leaf && f.meta[i * 4 + 1] === root && f.meta[i * 4 + 3]! < 0.5) cands.push(i);
      }
      if (!cands.length) {
        resolve();
        return;
      }
      const node = cands[Math.floor(Math.random() * cands.length)]!;
      this.ingests.push({ node, start: this.now, resolve, done: false });
    });
  }

  private updateIngests() {
    this.ingests = this.ingests.filter((ig) => {
      const t = (this.now - ig.start) / DUR.ingestGrow;
      if (t >= 1 && !ig.done) {
        ig.done = true;
        ig.resolve();
      }
      return (this.now - ig.start) / (DUR.ingestGrow + DUR.ingestRing) < 1;
    });
  }

  /** 当前入库动画的屏幕位置与进度，供 DOM 覆盖层（外圈细框）使用。 */
  ingestStates(): { node: number; grow: number; ring: number; x: number; y: number; root: number }[] {
    const f = this.forest;
    return this.ingests.map((ig) => {
      const t = (this.now - ig.start) / DUR.ingestGrow;
      return {
        node: ig.node,
        grow: Math.min(1, Math.max(0, t)),
        ring: Math.min(1, Math.max(0, (this.now - ig.start - DUR.ingestGrow) / DUR.ingestRing)),
        x: f.rect[ig.node * 4]!,
        y: f.rect[ig.node * 4 + 1]!,
        root: f.meta[ig.node * 4 + 1]!,
      };
    });
  }

  // ---------- 悬停 ----------

  /**
   * 屏幕空间距离命中：把全部可点击节点投影到屏幕，取离指针最近且在其半径内的一个。
   * 只显示悬停路径，不改变网络明暗。镜头补间期间不做命中并清掉旧路径：投射用的是当帧矩阵，
   * 镜头一动指针下的节点就逐帧换一个，路径文字会反复跳。停稳后按指针位置重新命中。
   */
  private updateHover(spec: NebulaSpec | undefined, f: Frame, camera: THREE.PerspectiveCamera, pointer: { x: number; y: number } | null, labels: NebulaLabelDom, cameraMoving: boolean) {
    let hit = -1;
    if (spec && pointer && !cameraMoving && this.visible && this.uniforms.uGrow!.value > 0.98) {
      hit = this.pick(f, camera, pointer.x, pointer.y);
    }
    if (hit !== this.hoverNode) {
      this.hoverNode = hit;
      if (labels.path) {
        labels.path.textContent = hit >= 0 ? pathText(this.forest, hit) : '';
        labels.path.dataset.on = hit >= 0 ? '1' : '0';
      }
    }
  }

  /** 当前悬停的节点序号，-1 为无。 */
  get hovered() {
    return this.hoverNode;
  }

  /** 悬停节点的作品序号（真实作品叶子），-1 为无（装饰叶与枝不算作品）。 */
  hoveredWork(): number {
    const n = this.hoverNode;
    if (n < 0 || this.forest.meta[n * 4] !== Level.Leaf || this.forest.meta[n * 4 + 3]! > 0.5) return -1;
    return this.forest.grow[n * 4 + 3]!;
  }

  private pick(f: Frame, camera: THREE.PerspectiveCamera, px: number, py: number): number {
    const fo = this.forest;
    this.group.updateMatrixWorld();
    camera.updateMatrixWorld();
    const e = camera.matrixWorldInverse.elements;
    const pm = camera.projectionMatrix.elements;
    // 摄像机每帧都在动（呼吸、取景补间）：这里逐帧投影全部节点（几千个，约 0.1ms 量级），不做缓存
    let best = -1;
    let bestD = Infinity;
    for (let i = 0; i < fo.count; i++) {
      const wx = fo.rect[i * 4]!;
      const wy = fo.rect[i * 4 + 1]!;
      // 视图坐标
      const vx = e[0]! * wx + e[4]! * wy + e[12]!;
      const vy = e[1]! * wx + e[5]! * wy + e[13]!;
      const vz = e[2]! * wx + e[6]! * wy + e[14]!;
      const w = -vz;
      if (w <= 0) continue;
      const sx = ((pm[0]! * vx) / w * 0.5 + 0.5) * f.vw;
      const sy = (0.5 - ((pm[5]! * vy) / w) * 0.5) * f.vh;
      const dx = sx - px;
      const dy = sy - py;
      // 命中半径：节点屏幕尺寸的一半加 6 像素容差，叶子也容易点中
      const scale = (pm[5]! * f.vh * 0.5) / w;
      const r = Math.max(fo.rect[i * 4 + 2]!, fo.rect[i * 4 + 3]!) * scale * 0.5 + 6;
      const d2 = dx * dx + dy * dy;
      if (d2 > r * r) continue;
      // 层级高的优先（根 > 枝 > 叶），同层取最近；真实作品叶再优先一点，装饰叶不抢命中
      const lv = fo.meta[i * 4]!;
      const realLeaf = lv === Level.Leaf && fo.meta[i * 4 + 3]! < 0.5;
      const key = d2 - (3 - lv) * 4000 - (realLeaf ? 900 : 0);
      if (key < bestD) {
        bestD = key;
        best = i;
      }
    }
    return best;
  }

  // ---------- 标签 ----------

  /**
   * 标签显隐与换内容。转场时标签收起：步骤变了（key !== labelKey）或镜头补间未完成，on 即为 false，
   * 每个 .nebula-label 按 styles.css 的 clip-path 从右缘向左收拢（--dur-quick）；收拢期间保留旧内容、旧 ids，继续刚性跟随旧节点。
   * 新一步的候选节点、内容与尺寸只在标签已收起（上一帧 on 已为 false）、收拢走完、镜头停稳后才换，
   * 下一帧起按 CSS 的延迟从左向右展开。key 变化本身就是收起信号，所以补间尚未起步的帧不会提前换内容或闪现。
   */
  private updateLabels(spec: NebulaSpec | undefined, s: NebulaState, f: Frame, camera: THREE.PerspectiveCamera, dom: NebulaLabelDom, cameraMoving: boolean) {
    const fo = this.forest;
    const key = spec ? `${spec.labels}:${spec.view}` : '';
    // 等待时长 DUR.quick 与 styles.css 里 .nebula-label 收起擦除的 --dur-quick 一致：收完才换内容
    const swapped = key !== this.labelKey && !cameraMoving && !this.labelOn && this.now - this.labelHideT >= (this.reduced ? 0 : DUR.quick);
    if (swapped) {
      this.labelKey = key;
      this.labelIds = labelIdsOf(fo, spec);
      this.sizes = [];
      const ids = this.labelIds;
      dom.items.forEach((el, k) => {
        if (!el) return;
        const i = ids[k];
        el.style.display = i === undefined ? 'none' : '';
        if (i === undefined) return;
        this.fillLabel(el, i);
      });
    }
    const level = spec ? LABEL_LEVELS[spec.labels] : -1;
    // on 条件：内容已换到最新、镜头停稳、树的淡入与生长已完成
    // 换内容的那一帧不展开：刚由 display:none 转为显示的标签要先以收起态渲染一帧，下一帧切 data-on 才有展开过渡
    const on = !swapped && key === this.labelKey && !cameraMoving && level >= 0 && s.grow > 0.97 && s.opacity > 0.8;
    if (dom.root) dom.root.dataset.on = on ? '1' : '0';
    // 记录最近一次从显示转为收起的时间；收拢走完就不再定位（已不可见），期间继续按旧内容跟随节点
    if (this.labelOn && !on) this.labelHideT = this.now;
    this.labelOn = on;
    if (!on && this.now - this.labelHideT > DUR.quick) return;
    const ids = this.labelIds;
    this.group.updateMatrixWorld();
    camera.updateMatrixWorld();
    // 每个标签刚性固定在自己的节点上：节点位置加树空间固定偏移，投影到屏幕后取整（文字不发虚）。
    // 位置仍跟随节点；越出画面，或与标题、统计带、语言索引、底部导航相交的标签藏起来，避免字压字。树本身仍可在边缘渐隐出血。
    const avoid = labelAvoidRects(f, spec?.view);
    for (let k = 0; k < Math.min(ids.length, NEBULA_LABEL_COUNT); k++) {
      const el = dom.items[k];
      if (!el) continue;
      const i = ids[k]!;
      const lv = fo.meta[i * 4]!;
      const half = fo.rect[i * 4 + 3]! * 0.5;
      let lx = fo.rect[i * 4]!;
      let ly = fo.rect[i * 4 + 1]! + half + 8;
      if (lv === Level.Root) {
        // 根标签放在根外沿的长度轮廓最短方向，离根 ROOT_LABEL_PX 个屏幕像素，不压在枝条上
        const ang = fo.roots[fo.meta[i * 4 + 1]!]!.labelAngle;
        const r = (half + VIEW.rootLabelPx) * s.d;
        lx += Math.cos(ang) * r;
        ly += -8 + Math.sin(ang) * r;
      }
      let hidden = false;
      if (lv === Level.Root) {
        // 根节点本身在画外（如第 1 步全景里的待定类）时不显示标签，免得标签孤零零贴在画面边缘
        this.v.set(fo.rect[i * 4]!, fo.rect[i * 4 + 1]!, 0).applyMatrix4(this.group.matrixWorld).project(camera);
        hidden = this.v.x < -1 || this.v.x > 1 || this.v.y < -1 || this.v.y > 1 || this.v.z > 1;
      }
      this.v.set(lx, ly, 0).applyMatrix4(this.group.matrixWorld).project(camera);
      if (!this.sizes[k]) this.sizes[k] = { w: el.offsetWidth, h: el.offsetHeight };
      const sz = this.sizes[k]!;
      // 锚点：x 为标签盒中心、y 为底边（盒子含 labelGap 留白），与原先的定位一致
      const x = (this.v.x * 0.5 + 0.5) * f.vw - (sz.w + VIEW.labelGap) / 2 + 5;
      const y = (0.5 - this.v.y * 0.5) * f.vh - (sz.h + VIEW.labelGap) + 3;
      el.style.transform = `translate3d(${Math.round(x)}px, ${Math.round(y)}px, 0)`;
      if (!hidden) {
        const box = { x: Math.round(x), y: Math.round(y), w: sz.w, h: sz.h };
        hidden = avoid.some((r) => rectsOverlap(box, r, 10));
      }
      el.style.visibility = hidden ? 'hidden' : '';
    }
  }

  /**
   * 标签内容：深色底、细框、左侧色块、等宽数字。
   * 根（语言）带该语言已上墙标杆数。
   */
  private fillLabel(el: HTMLElement, i: number) {
    const fo = this.forest;
    const lv = fo.meta[i * 4]!;
    const root = fo.meta[i * 4 + 1]!;
    const cat = CATEGORY_TREE[root]!;
    el.innerHTML = '';
    const name = document.createElement('b');
    name.textContent = cat.label;
    el.append(name);
    const badge = document.createElement('span');
    badge.textContent = cat.count.toLocaleString('zh-CN');
    el.append(badge);
    el.dataset.level = String(lv);
    el.style.setProperty('--dot', `#${COLORS[root]!.getHexString()}`);
  }
}
