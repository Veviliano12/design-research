/**
 * 3D 舞台：作品网格、地面网格、视效语言星云、镜头；同时驱动作品墙 DOM 层（名单、悬停信息）与星云簇标签。
 * 每件作品的姿态在帧循环里直接写入 mesh 与 uniform，React 只在状态切换时触发补间。
 */
import { Grid } from '@react-three/drei';
import { useFrame, useThree, type ThreeEvent } from '@react-three/fiber';
import { forwardRef, useEffect, useImperativeHandle, useLayoutEffect, useMemo, useRef } from 'react';
import * as THREE from 'three';
import { gsap, prefersReducedMotion } from '../motion/gsap';
import { CAMERA_DRIFT, DUR, EASE, LAYOUT_ENTRY, RATE, VIEW } from '../motion/tokens';
import { CATEGORY_TREE, DEFAULT_ROOT_INDEX, categoryLabel, rootIndexOfWork } from './categoryTree';
import { chapters } from './chapters';
import {
  arrivalCount,
  arrivalOf,
  arrivalSeq,
  depth,
  emptyPose,
  flowGeometry,
  flowPose,
  focusGeometry,
  rectPose,
  DIM,
  FOV,
  type Frame,
  type Placement,
  type Pose,
} from './layout';
import { BASE_TEX, createWorkMaterial, hiresWidth, PENDING_TEX, workTexture } from './material';
import type { NavState } from './nav';
import { stateKey } from './nav';
import { idleNebula, nebulaSpecOf, nebulaTarget, nebulaView, NebulaController, type NebulaState } from './nebulaScene';
import { DISTRIBUTION_ENTRY, distributionEntryDelay } from './quality/distributionMotion';
import type { NebulaLabelDom, PlacementHint } from './stageApi';
import { layoutRoster } from './rosterDom';
import { WALL_COUNT } from './wallWorks';
import type { WallDom } from './WallOverlay';
import { accentColor, thumbReady, TILE_RATIO, works } from './works';

export interface SceneHandle {
  /** 当前可聚焦作品的顺序：作品墙按名单顺序，章节按阅读顺序 */
  order: () => string[];
  nebulaIngest: (root: number) => Promise<void>;
}

interface Props {
  state: NavState;
  frame: Frame;
  /** 当前状态的过渡完成 */
  onSettled: (key: string) => void;
  onOpen: (id: string) => void;
  glow: React.RefObject<HTMLDivElement | null>;
  wall: WallDom;
  nebulaLabels: NebulaLabelDom;
  /** 分帧着色器预热全部完成后调用；视口高度变化重建星云时会再次预热并再次调用 */
  onCompiled?: () => void;
  /**
   * 进入作品墙（圆墙）第一段：state 仍是离开前的一步，作品在该步姿态基础上整体向上飞出屏幕（DUR.wallLeave），
   * 树同时淡出，镜头不动。由 Stage 在飞出期间置真；之后舞台暂停，由圆墙接管画面。
   */
  leaving?: boolean;
  /** 作品墙场景筛选；「全部」显示全部 124 条，其余只保留匹配场景的作品 */
  wallFilter?: string;
}

interface Tile {
  mesh: THREE.Mesh | null;
  /** 常态缩略图已换上。在此之前用占位纹理且完全透明；换上后 reveal 从 0 淡到 1，位置不动 */
  loaded: boolean;
  reveal: number;
  mat: THREE.ShaderMaterial;
  cur: Pose;
  from: Pose;
  to: Pose;
  t: number;
  /** 作品墙常态：姿态每帧由流动偏移计算 */
  follow: boolean;
  hover: number;
  /** 参考镜头下的屏幕坐标与平滑速度 */
  sx: number;
  sy: number;
  vel: number;
  dir: THREE.Vector2;
  front: boolean;
  texW: number;
  outline: number;
  /** 章节用作背景或图表元素的槽位：不参与点击、悬停与翻页聚焦 */
  inert: boolean;
  /** 上一次目标排布要求离场时原位淡出（质量分布页） */
  exitFade: boolean;
  /** 质量分布页统一入场的延迟；null 表示当前排布不要求这套入场 */
  entryDelay: number | null;
  /** 阅读型页面树步骤里停在作品叶上的缩略图：点击与悬停仍由树的节点命中处理，不走网格射线 */
  thumb: 'big' | 'small' | null;
  /** 缩略图绘制序：作品曾作为缩略图停在作品叶上且树仍可见时保持（见 THUMB_ORDER），树淡出后归 0 */
  lift: number;
}

/** 不取整的 rectPose，供与未取整的 SVG 小方块对齐。 */
const exactPose = (r: Placement, f: Frame, radius: number): Pose => ({
  ...emptyPose(),
  x: r.x + r.w / 2 - f.vw / 2,
  y: f.vh / 2 - (r.y + r.h / 2),
  w: r.w,
  h: r.h,
  o: 1,
  r: radius,
});

const lerpPose = (a: Pose, b: Pose, t: number, out: Pose) => {
  for (const k of Object.keys(out) as (keyof Pose)[]) {
    if (k !== 'mute' && k !== 'sat') out[k] = a[k] + (b[k] - a[k]) * t;
  }
  // mute / sat 为可选字段，缺省分别按 0 / 1 插值；out 可能没有这些键，需单独处理
  const m0 = a.mute ?? 0;
  const m1 = b.mute ?? 0;
  out.mute = m0 + (m1 - m0) * t;
  const s0 = a.sat ?? 1;
  const s1 = b.sat ?? 1;
  out.sat = s0 + (s1 - s0) * t;
  return out;
};
const copyPose = (p: Pose): Pose => ({ ...p });
const damp = THREE.MathUtils.damp;

/** 状态对应的章节步骤。 */
function stepOf(s: NavState) {
  const b = s.base;
  return chapters[b.chapter]!.steps[b.step]!;
}

/** 该状态处于作品墙这一步（规模章节的最后一步）。 */
const onWallStep = (s: NavState) => stepOf(s).wall === true;

const ALL_SCENES = '全部';

function wallVisible(i: number, scene: string) {
  return scene === ALL_SCENES || works[i]!.scenes.includes(scene);
}

/** 该状态推进到单棵树：作品落在各自的作品叶上，作品墙从这里展开、也收回到这里。 */
const onLeafStep = (s: NavState) => {
  const st = stepOf(s);
  return !st.layout && typeof st.nebula?.view === 'number';
};

/**
 * 某棵树（大类序号）上有真实作品叶的作品序号 → 缩略图档位（'big' | 'small'）：从分类树与叶子反查表推导。
 * 按大类内作品的稳定顺序，每 LEAF_THUMB_GROUP 件取第一件为大图，其余为小图。
 */
function leafThumbWorks(root: number, nebula: NebulaController): Map<number, 'big' | 'small'> {
  const out = new Map<number, 'big' | 'small'>();
  let k = 0;
  for (const lw of CATEGORY_TREE[root]?.works ?? []) {
    if ((nebula.leafOfWork[lw.workIndex] ?? -1) < 0) continue;
    out.set(lw.workIndex, k % LEAF_THUMB_GROUP === 0 ? 'big' : 'small');
    k++;
  }
  return out;
}

/** 作品叶缩略图的分组：每组第一件为大图。 */
const LEAF_THUMB_GROUP = 7;

/** 缩略图的绘制序：都高于树（4–6），重叠时小图压在大图之上；聚焦作品用 10。 */
const THUMB_ORDER = { big: 8, small: 9 } as const;

/** 阅读树这一步悬停真实作品缩略图时的放大倍数（中心不动，移开还原） */
const LEAF_THUMB_HOVER_SCALE = 1.15;

/** 状态的目标姿态。作品墙返回 null，表示跟随流动。thumbs 是停在作品叶上显示缩略图的作品。 */
function targets(
  s: NavState,
  f: Frame,
  offset: number,
  nebula: NebulaController,
): { poses: (Pose | null)[]; front: Set<string>; inert: Set<string>; exitFade: Set<string>; entryDelay: Map<string, number>; thumbs: Map<string, 'big' | 'small'> } {
  const front = new Set<string>();
  const inert = new Set<string>();
  const exitFade = new Set<string>();
  const entryDelay = new Map<string, number>();
  /** 精确对齐图表小方块的章节作品（质量分布步）：点击只开浮层，不进入聚焦放大姿态 */
  const flat = new Set<string>();
  const thumbs = new Map<string, 'big' | 'small'>();
  let poses: (Pose | null)[];
  const step = stepOf(s);
  if (step.wall) {
    poses = works.map(() => null);
  } else if (!step.layout && typeof step.nebula?.view === 'number') {
    // 推进到单棵树：作品停在各自的作品叶上（树的局部坐标）。树上有作品叶的作品显示缩略图（o=1，世界尺寸按当前取景距离换算）：
    // 每 LEAF_THUMB_GROUP 件一件大图（屏幕宽 VIEW.leafThumbPx × VIEW.leafThumbBig），其余小图（VIEW.leafThumbPx）；其余作品缩成叶大小并完全透明。
    // 进入作品墙时从这里展开，返回时收回；没有叶子的作品退到所属大类的根
    const fo = nebula.forest;
    const d = nebulaView(f, step.nebula!.view, fo).d;
    const shown = leafThumbWorks(step.nebula!.view as number, nebula);
    poses = works.map((w, i) => {
      const leaf = nebula.leafOfWork[i] ?? -1;
      const node = leaf >= 0 ? leaf : (fo.roots[rootIndexOfWork(w)] ?? fo.roots[DEFAULT_ROOT_INDEX] ?? fo.roots[0]!).node;
      const c = fo.rect.subarray(node * 4, node * 4 + 4);
      const tier = shown.get(i);
      if (tier) {
        thumbs.set(w.id, tier);
        const tw = VIEW.leafThumbPx * (tier === 'big' ? VIEW.leafThumbBig : 1) * d;
        return { x: c[0]!, y: c[1]!, z: 0, rx: 0, ry: 0, rz: 0, w: tw, h: tw / TILE_RATIO, o: 1, dim: 1, r: 2 * d };
      }
      const lw = Math.max(c[2]!, c[3]!);
      return { x: c[0]!, y: c[1]!, z: 0, rx: 0, ry: 0, rz: 0, w: lw, h: lw / TILE_RATIO, o: 0, dim: 1, r: 1 };
    });
  } else if (!step.layout) {
    // 树步骤：作品缩成小点，飞向所属大类的根（树的局部坐标，随镜头一起被取景，位置与树的根一致）
    const fo = nebula.forest;
    poses = works.map((w) => {
      const ri = rootIndexOfWork(w);
      const r = (ri >= 0 ? fo.roots[ri] : undefined) ?? fo.roots[DEFAULT_ROOT_INDEX] ?? fo.roots[0]!;
      const c = fo.rect.subarray(r.node * 4, r.node * 4 + 2);
      return { x: c[0]!, y: c[1]!, z: 0, rx: 0, ry: 0, rz: 0, w: 4, h: 2.5, o: 0, dim: 1, r: 1 };
    });
  } else {
    const a = step.layout(f);
    poses = works.map((w) => {
      const p = a.placements.get(w.id)!;
      const hint = p as Placement & PlacementHint;
      // 默认圆角随尺寸收缩：章节里的小方块（如质量章节质量证明分段的分数段）不能被 8px 圆角削成圆点
      const radius = hint.radius ?? Math.min(8, Math.max(1, Math.round(Math.min(p.w, p.h) * 0.2)));
      const pose = hint.exact ? exactPose(p, f, radius) : rectPose(p, f, 1, radius);
      // 退到背景的作品用亮度表示，略后移避免与主作品共面
      if (hint.exact) pose.o = p.opacity;
      else if (p.opacity <= 0.5) Object.assign(pose, { dim: 0.16, z: -2 });
      if (p.opacity <= 0) pose.o = 0;
      if (hint.saturate !== undefined) pose.sat = hint.saturate;
      if (hint.inert) inert.add(w.id);
      if (hint.exitFade) exitFade.add(w.id);
      if (hint.entry) entryDelay.set(w.id, distributionEntryDelay(hint.entry.order, hint.entry.total));
      if (hint.exact) flat.add(w.id);
      return pose;
    });
    if (step.markOn) front.add(step.markOn);
  }
  // 阅读树这一步点击作品叶、质量分布步点击图表小方块，都直接打开详情浮层，不再把该作品放大到 focusGeometry：
  // 详情是浮层，关闭后画面停在原处，不需要补间。
  if (s.focus && !onLeafStep(s) && !flat.has(s.focus.id)) {
    const geo = focusGeometry(f);
    const screen = rectPose(geo.screen, f, 1, 2);
    // 布局章节（如质量单件）的聚焦姿态：放大并移到屏幕区域；阅读树已在上面跳过，作品叶不再二次放大。
    const view = step.nebula ? nebulaView(f, step.nebula.view, nebula.forest) : null;
    const focusPose = view
      ? { ...screen, x: view.tx + screen.x * view.d, y: view.ty + screen.y * view.d, w: screen.w * view.d, h: screen.h * view.d, r: screen.r * view.d }
      : screen;
    poses = poses.map((p, i) => {
      const w = works[i]!;
      if (w.id === s.focus!.id) return focusPose;
      const base = p ?? flowPose(i, f, offset);
      return { ...base, dim: Math.min(base.dim, DIM * 1.5) };
    });
    front.clear();
    front.add(s.focus.id);
    thumbs.delete(s.focus.id);
  }
  return { poses, front, inert, exitFade, entryDelay, thumbs };
}

export const Scene = forwardRef<SceneHandle, Props>(function Scene({ state, frame, onSettled, onOpen, glow, wall, nebulaLabels, onCompiled, leaving = false, wallFilter = ALL_SCENES }, ref) {
  const { gl, camera, viewport } = useThree();
  const anisotropy = useMemo(() => gl.capabilities.getMaxAnisotropy(), [gl]);
  const dpr = viewport.dpr;

  const tiles = useMemo<Tile[]>(
    () =>
      works.map(() => ({
        mesh: null,
        loaded: false,
        reveal: 0,
        mat: createWorkMaterial(PENDING_TEX),
        cur: emptyPose(),
        from: emptyPose(),
        to: emptyPose(),
        t: 1,
        follow: true,
        hover: 0,
        sx: NaN,
        sy: NaN,
        vel: 0,
        dir: new THREE.Vector2(1, 0),
        front: false,
        texW: BASE_TEX,
        outline: 0,
        inert: false,
        exitFade: false,
        entryDelay: null,
        thumb: null,
        lift: 0,
      })),
    [],
  );
  useEffect(() => () => tiles.forEach((t) => t.mat.dispose()), [tiles]);

  // 树随视口高度重建
  const nebula = useMemo(() => new NebulaController(frame.vh), [frame.vh]);
  useEffect(() => () => nebula.dispose(), [nebula]);
  const compiledRef = useRef(onCompiled);
  compiledRef.current = onCompiled;
  // 分帧预热着色器：逐个 gl.compile，每帧至多一个，不在同一任务里一次编完。
  // 顺序：先作品材质（作品墙立刻要用，所有作品共用同一个程序），再星云点云、飞点，最后地面网格。
  useEffect(() => {
    let alive = true;
    const compileOne = (o: THREE.Object3D | null | undefined) => {
      if (!o) return;
      // gl.compile 只处理传入对象自身的子树；用临时场景包一层，不改动真实场景图
      const tmp = new THREE.Scene();
      tmp.add(o.clone());
      gl.compile(tmp, camera);
    };
    const jobs: (() => void)[] = [
      () => compileOne(new THREE.Mesh(new THREE.PlaneGeometry(1, 1), tiles[0]!.mat)),
      () => compileOne(nebula.dust),
      () => compileOne(nebula.edges),
      () => compileOne(nebula.nodes),
      () => compileOne(nebula.rings),
      () => compileOne(gridRef.current),
    ];
    const step = () => {
      if (!alive) return;
      jobs.shift()?.();
      if (jobs.length) requestAnimationFrame(() => setTimeout(step, 0));
      else compiledRef.current?.();
    };
    const t = setTimeout(step, 0);
    return () => {
      alive = false;
      clearTimeout(t);
    };
  }, [nebula, gl, camera, tiles]);
  /** 星云与镜头的当前状态，由补间驱动 */
  const neb = useRef<NebulaState>(idleNebula());
  const nebTl = useRef<gsap.core.Timeline | null>(null);
  const nebulaRef = useRef(nebula);
  nebulaRef.current = nebula;

  const offset = useRef(0);
  const flowRate = useRef(1);
  const hoverId = useRef<number | null>(null);
  const tl = useRef<gsap.core.Timeline | null>(null);
  const prev = useRef<{ key: string; frame: Frame; focus: string | null; wall: boolean; leaf: boolean } | null>(null);
  const stateRef = useRef(state);
  stateRef.current = state;
  const frameRef = useRef(frame);
  frameRef.current = frame;
  const gridVis = useRef(1);
  /** 名单位置相对到达计数的偏移：悬停时补到悬停作品，移开后回到 0 */
  const rosterShift = useRef(0);
  /** 悬停中名单目标作品所在的圈：同一件作品悬停期间不变，避免跨过半圈时目标瞬间差出一整圈 */
  const rosterTurns = useRef<{ hov: number; turns: number } | null>(null);
  /** 名单当前行（到达序号）与悬停状态，变化时才写 DOM */
  const shown = useRef({ cur: -1, hover: -2 });
  const glowColor = useRef(new THREE.Color('#203040'));
  const drag = useRef<{ x: number; y: number; moved: number; last: number; hover: number } | null>(null);
  /** 镜头漂移的相位（秒）：只累计受限后的 dt，后台恢复时不跳变 */
  const driftPhase = useRef(0);
  const cam = useRef({ yaw: 0, pitch: 0 });
  const suppressClick = useRef(false);
  /** 鼠标在舞台中的像素位置，树的悬停命中用 */
  const pointer = useRef<{ x: number; y: number } | null>(null);
  const onOpenRef = useRef(onOpen);
  onOpenRef.current = onOpen;
  const wallFilterRef = useRef(wallFilter);
  wallFilterRef.current = wallFilter;

  useImperativeHandle(ref, () => ({
    order: () => {
      const s = stateRef.current;
      if (onWallStep(s)) {
        // 与名单一致：从当前行开始，按到达顺序向下，只在墙上展示的作品里循环
        const n = WALL_COUNT;
        const cur = ((shown.current.cur % n) + n) % n;
        return Array.from({ length: n }, (_, k) => works[arrivalSeq[(cur + k) % n]!]!.id);
      }
      return tiles
        .map((t, i) => ({ i, p: t.to }))
        .filter((x) => x.p.dim > 0.5 && !tiles[x.i]!.inert)
        .sort((a, b) => (Math.abs(a.p.y - b.p.y) > 4 ? b.p.y - a.p.y : a.p.x - b.p.x))
        .map((x) => works[x.i]!.id);
    },
    nebulaIngest: (root) => nebulaRef.current.ingest(root),
  }));

  // 状态或尺寸变化：补间到目标姿态
  const key = stateKey(state);
  const focusId = state.focus?.id ?? null;
  useLayoutEffect(() => {
    const p = prev.current;
    // 飞出段与同一步的常态是两个目标：比较用带标记的键，切换 leaving 也会重新补间
    const effKey = leaving ? `${key}#leave` : key;
    const animate = p !== null && p.key !== effKey && p.frame === frame && !prefersReducedMotion();
    const switching = animate && p.focus !== null && focusId !== null && p.focus !== focusId && p.key.split('/')[0] === key.split('/')[0];
    const prevFocus = p?.focus ?? null;
    const wall = onWallStep(state);
    const leaf = onLeafStep(state);
    const focusChanged = p !== null && p.focus !== focusId;
    // 阅读型页面树与作品墙之间：作品从作品叶展开（或收回），镜头与作品同用 DUR.zoom，读作一次连续推近/拉远；
    // 聚焦切换仍用原时长
    const zoom = !leaving && animate && !switching && !focusChanged && ((wall && p?.leaf === true) || (leaf && p?.wall === true));
    prev.current = { key: effKey, frame, focus: focusId, wall, leaf };

    tl.current?.kill();
    tl.current = null;
    const { poses: base, front, inert, exitFade, entryDelay, thumbs } = targets(state, frame, offset.current, nebula);
    // 上一目标排布要求离场原位淡出、而新排布不再要求（离开质量分布页）：
    // 这些作品不参与下一步的位置补间，只在原处淡出，避免可见的飞出
    const exitFading = tiles.map((t, i) => t.exitFade && !exitFade.has(works[i]!.id));
    // 新排布要求统一入场、上一排布没有要求（进入质量分布页）：从格子下方缩小透明开始飞入，
    // 不再沿用进入前的通用布局姿态，避免同一件作品出现第二段位移
    const entering = tiles.map((t, i) => t.entryDelay === null && entryDelay.has(works[i]!.id));
    // 飞出段：镜头不动，作品沿屏幕向上平移出画面。世界单位到像素按当前镜头距离 d 换算，
    // 平移量取视口高度再加余量和作品自身高度，最底部的作品也能完全移出上缘
    const ws = neb.current.d;
    const poses = leaving
      ? base.map((p, i) => {
          const q = p ?? flowPose(i, frame, offset.current);
          return { ...q, y: q.y + frame.vh * 1.15 * ws + q.h };
        })
      : base;
    tiles.forEach((t, i) => {
      t.front = front.has(works[i]!.id);
      t.inert = inert.has(works[i]!.id);
      t.thumb = thumbs.get(works[i]!.id) ?? null;
      t.exitFade = exitFade.has(works[i]!.id);
      t.entryDelay = entryDelay.get(works[i]!.id) ?? null;
      const target = poses[i] ?? flowPose(i, frame, offset.current);
      // 质量分布页的统一起点：格子中心下方、缩小、透明；填充缩略图用同一比例
      t.from = entering[i]
        ? {
            ...target,
            y: target.y - target.h * DISTRIBUTION_ENTRY.rise,
            w: target.w * DISTRIBUTION_ENTRY.scale,
            h: target.h * DISTRIBUTION_ENTRY.scale,
            o: 0,
          }
        : copyPose(t.follow ? flowPose(i, frame, offset.current, t.hover) : t.cur);
      t.cur = copyPose(t.from);
      t.to = exitFading[i] ? { ...t.from, o: 0 } : target;
      t.follow = false;
      t.t = 0;
      t.mat.uniforms.uProgress!.value = 1;
    });

    // 树与镜头：独立于作品补间。进入树：作品飞向根，镜头后拉，随后树从根向外生长；
    // 树内换步：只补间取景；离开：树淡出、镜头回到焦平面。阅读型页面树与作品墙之间镜头沿用 DUR.zoom，
    // 树的淡入淡出跟着同一次推近或拉远走完，返回树时不重新生长。
    nebTl.current?.kill();
    const spec = nebulaSpecOf(state);
    const nt = nebulaTarget(spec, frame, nebula.forest);
    const was = neb.current.opacity > 0.01;
    if (!animate) {
      neb.current = { ...nt, grow: spec ? 1 : 0 };
      if (leaving) neb.current = { ...neb.current, opacity: 0 };
      nebTl.current = null;
    } else if (leaving) {
      // 飞出段：树与作品同时淡出，取景保持当前值
      nebTl.current = gsap.timeline().to(neb.current, { opacity: 0, duration: DUR.wallLeave, ease: EASE.in.gsap }, 0);
    } else {
      const ntl = gsap.timeline();
      const { opacity, grow, ...rest } = nt;
      const camDur = zoom ? DUR.zoom : DUR.camera;
      if (spec && zoom) {
        // 从作品墙收回到阅读型页面树：镜头拉远，树随之淡入，枝条保持已长成
        neb.current.grow = 1;
        ntl.to(neb.current, { ...rest, duration: camDur, ease: EASE.swap.gsap }, 0);
        ntl.to(neb.current, { opacity, duration: camDur, ease: EASE.out.gsap }, 0);
      } else if (spec && !was) {
        // 从其他章节进入：镜头后拉到全景，树淡入后从根向外生长
        neb.current.grow = 0;
        ntl.to(neb.current, { ...rest, duration: camDur, ease: EASE.swap.gsap }, 0);
        ntl.to(neb.current, { opacity, duration: DUR.forestFade, ease: EASE.out.gsap }, DUR.growDelay);
        ntl.to(neb.current, { grow, duration: DUR.grow, ease: EASE.out.gsap }, DUR.growDelay);
      } else if (spec) {
        // 树内换步：只补间取景
        ntl.to(neb.current, { ...rest, opacity, grow, duration: camDur, ease: EASE.swap.gsap }, 0);
      } else if (was) {
        // 离开：树淡出，镜头回到焦平面；从阅读型页面树展开到作品墙时，淡出跟着同一次推近走完
        const fade = zoom ? camDur : DUR.forestFade;
        ntl.to(neb.current, { opacity, duration: fade, ease: EASE.in.gsap }, 0);
        ntl.to(neb.current, { ...rest, duration: camDur, ease: EASE.swap.gsap }, 0);
        ntl.set(neb.current, { grow: 0 }, fade);
      } else {
        neb.current = { ...nt };
      }
      nebTl.current = ntl;
    }

    const done = () => {
      tl.current = null;
      if (onWallStep(stateRef.current) && !stateRef.current.focus) tiles.forEach((t) => (t.follow = true));
      onSettled(key);
    };

    if (!animate) {
      tiles.forEach((t) => {
        t.t = 1;
        t.cur = copyPose(t.to);
      });
      done();
      return;
    }

    const timeline = gsap.timeline({ onComplete: done });
    if (switching) {
      // 翻页笔切换作品：新作品直接占据屏幕，用过渡着色器从旧作品推进到新作品；旧作品原位退回
      const ni = works.findIndex((w) => w.id === focusId);
      const oi = works.findIndex((w) => w.id === prevFocus);
      tiles.forEach((t, i) => {
        if (i === ni || i === oi) {
          t.t = 1;
          t.cur = copyPose(t.to);
        }
      });
      const nt = tiles[ni]!;
      nt.mat.uniforms.uPrev!.value = tiles[oi]!.mat.uniforms.uMap!.value;
      nt.mat.uniforms.uProgress!.value = 0;
      timeline.to(nt.mat.uniforms.uProgress!, { value: 1, duration: DUR.swap, ease: EASE.swap.gsap }, 0);
      tiles.forEach((t, i) => {
        if (i !== ni && i !== oi) timeline.to(t, { t: 1, duration: DUR.settle, ease: EASE.out.gsap }, 0);
      });
    } else if (leaving) {
      // 飞出段：全部作品同起同止，加速离场
      tiles.forEach((t) => timeline.to(t, { t: 1, duration: DUR.wallLeave, ease: EASE.in.gsap }, 0));
    } else {
      const solo = focusId !== null || prevFocus !== null;
      // 阅读型页面树与作品墙之间，全部作品同起同止，与镜头共用 DUR.zoom；其他排布沿用统一的布局入场规则
      const stagger = solo || zoom ? 0 : LAYOUT_ENTRY.stagger;
      const duration = zoom ? DUR.zoom : LAYOUT_ENTRY.duration;
      tiles.forEach((t, i) => {
        if (exitFading[i]) {
          // 质量分布页离场：先在原位淡出，再在不可见状态换到下一步的目标姿态；
          // 目标姿态若仍可见（例如后续步骤要展示作品），才在原处淡入，绝不做位置补间
          const target = poses[i] ?? flowPose(i, frame, offset.current);
          timeline.to(t, { t: 1, duration: DUR.fade, ease: EASE.out.gsap }, 0);
          timeline.add(() => {
            t.from = copyPose({ ...target, o: 0 });
            t.to = copyPose(target);
            t.t = target.o > 0 ? 0 : 1;
            t.cur = copyPose(t.from);
          }, DUR.fade);
          if (target.o > 0) timeline.to(t, { t: 1, duration: DUR.fade, ease: EASE.out.gsap }, DUR.fade);
          return;
        }
        if (entering[i]) {
          // 与填充缩略图共用同一条入场规则和格子下标延迟；这里只执行这一条位移动画
          timeline.to(t, { t: 1, duration: DISTRIBUTION_ENTRY.duration, ease: DISTRIBUTION_ENTRY.ease }, t.entryDelay ?? 0);
          return;
        }
        const delay = stagger ? (((i * 7) % works.length) / works.length) * stagger : 0;
        timeline.to(t, { t: 1, duration, ease: LAYOUT_ENTRY.ease }, delay);
      });
    }
    tl.current = timeline;
  }, [key, frame, focusId, state, tiles, onSettled, nebula, leaving]);

  useEffect(
    () => () => {
      tl.current?.kill();
      nebTl.current?.kill();
    },
    [],
  );

  // 指针与拖动：指针位置只用于树的悬停命中，不参与镜头
  useEffect(() => {
    const el = gl.domElement;
    const onMove = (e: PointerEvent) => {
      pointer.current = { x: e.clientX, y: e.clientY };
      const d = drag.current;
      if (!d) return;
      const dx = e.clientX - d.x;
      const dy = e.clientY - d.y;
      d.moved += Math.abs(dx) + Math.abs(dy);
      d.x = e.clientX;
      d.y = e.clientY;
      const s = stateRef.current;
      if (!onWallStep(s) || s.focus || prefersReducedMotion()) return;
      // 向左或向上拖动 = 向前推进
      const delta = Math.abs(dx) > Math.abs(dy) ? -dx : -dy;
      offset.current += delta * (flowGeometry(frameRef.current).span / window.innerWidth) * 0.6;
    };
    const onDown = (e: PointerEvent) => {
      // 记下按下时的高亮节点：抬起时仍须是同一个，镜头停稳后从指针下新出现的节点不会被这次点击打开
      drag.current = { x: e.clientX, y: e.clientY, moved: 0, last: performance.now(), hover: nebulaRef.current.hovered };
      suppressClick.current = false;
    };
    const onUp = (e: PointerEvent) => {
      const d = drag.current;
      const moved = d ? d.moved : 0;
      const pressed = d ? d.hover : -1;
      if (moved > 6) suppressClick.current = true;
      drag.current = null;
      // 树上点击叶子：按屏幕空间命中的节点进入聚焦（叶子就是一件真实作品）；拖动与高亮已变的点击不触发
      if (moved <= 6 && pressed >= 0 && pressed === nebulaRef.current.hovered && e.target === el) {
        const w = nebulaRef.current.hoveredWork();
        if (w >= 0) onOpenRef.current(works[w]!.id);
      }
    };
    window.addEventListener('pointermove', onMove);
    el.addEventListener('pointerdown', onDown);
    window.addEventListener('pointerup', onUp);
    return () => {
      window.removeEventListener('pointermove', onMove);
      el.removeEventListener('pointerdown', onDown);
      window.removeEventListener('pointerup', onUp);
    };
  }, [gl]);

  const v = useMemo(() => new THREE.Vector3(), []);
  const refProj = useMemo(() => new THREE.Matrix4(), []);
  const refView = useMemo(() => new THREE.Matrix4(), []);

  useFrame((st, rawDt) => {
    const dt = Math.min(rawDt, 0.1);
    const f = frameRef.current;
    const s = stateRef.current;
    const reduced = prefersReducedMotion();
    const onWall = onWallStep(s) && !s.focus;
    // 阅读树这一步的缩略图悬停跟随树的实际叶子命中：缩略图自身不参与拾取，放大不会改变命中范围而抖动
    const leafHover = !s.focus && onLeafStep(s) ? nebulaRef.current.hoveredWork() : -1;
    const wallScene = wallFilterRef.current;
    if (hoverId.current !== null && onWall && !wallVisible(hoverId.current, wallScene)) {
      hoverId.current = null;
      document.body.style.cursor = '';
    }
    const D = depth(f);

    // 流动：悬停时减速，过渡期间冻结
    const rateTarget = hoverId.current !== null ? 0.22 : 1;
    flowRate.current = damp(flowRate.current, rateTarget, RATE.flow, dt);
    const flowing = onWall && !tl.current && !reduced;
    if (flowing && !drag.current) offset.current += flowGeometry(f).speed * flowRate.current * dt;

    // 镜头：作品墙自动轻微漂移，不随输入变化；其他状态回正，保证 DOM 叠加层像素对齐
    const c = cam.current;
    let ty = 0;
    let tp = 0;
    if (onWall && !reduced) {
      // 相位按帧累计（dt 已受上限约束）：切回前台或长时间挂起后从原处继续，不按墙钟跳相位
      driftPhase.current += dt;
      const a = (driftPhase.current / CAMERA_DRIFT.period) * Math.PI * 2;
      ty = Math.sin(a) * THREE.MathUtils.degToRad(CAMERA_DRIFT.yaw);
      tp = Math.sin(a * 2) * THREE.MathUtils.degToRad(CAMERA_DRIFT.pitch);
    }
    const camK = onWall ? RATE.camera : RATE.cameraReturn;
    c.yaw = reduced ? 0 : damp(c.yaw, ty, camK, dt);
    c.pitch = reduced ? 0 : damp(c.pitch, tp, camK, dt);
    if (Math.abs(c.yaw) < 1e-5 && ty === 0) c.yaw = 0;
    if (Math.abs(c.pitch) < 1e-5 && tp === 0) c.pitch = 0;
    // 镜头绕注视点：作品墙为自动漂移，星云为取景补间；单位状态时与焦平面像素对齐
    const rig = neb.current;
    const pc = camera as THREE.PerspectiveCamera;
    const dist = rig.d * D;
    const pitch = c.pitch + rig.elev;
    pc.position.set(rig.tx + Math.sin(c.yaw) * Math.cos(pitch) * dist, rig.ty + Math.sin(pitch) * dist, Math.cos(c.yaw) * Math.cos(pitch) * dist);
    pc.lookAt(rig.tx, rig.ty, 0);
    const far = Math.max(D * 8, dist * 3);
    if (pc.fov !== FOV || pc.far < far * 0.9) {
      pc.fov = FOV;
      pc.near = 1;
      pc.far = far;
      pc.updateProjectionMatrix();
    }
    // 参考镜头：正对焦平面，用于计算作品自身的屏幕速度，不受镜头摆动影响
    refProj.copy(pc.projectionMatrix);
    refView.makeTranslation(0, 0, -D);

    // 名单：当前行 = 此刻位于焦平面的作品；悬停时切到悬停作品。只在墙上展示的作品里循环。
    const n = WALL_COUNT;
    const A = arrivalCount(f, offset.current);
    const hov = onWall ? hoverId.current : null;
    const hovSlot = hov !== null && hov < WALL_COUNT ? arrivalOf(hov) : -1;
    let shiftTarget = 0;
    if (hovSlot >= 0) {
      // 取最近的一圈，名单走最短路径。同一件作品的圈数在悬停期间固定：逐帧按 k - A 重算时，
      // 它一旦跨过半圈，目标会瞬间差出一整圈，名单反向狂奔一整圈再回来
      const b = rosterTurns.current;
      const turns = b !== null && b.hov === hov ? b.turns : Math.round((hovSlot - A) / n);
      rosterTurns.current = { hov: hov!, turns };
      shiftTarget = hovSlot - A - turns * n;
    } else {
      rosterTurns.current = null;
    }
    rosterShift.current = reduced ? shiftTarget : damp(rosterShift.current, shiftTarget, RATE.roster, dt);
    if (Math.abs(rosterShift.current - shiftTarget) < 1e-3) rosterShift.current = shiftTarget;
    const R = A + rosterShift.current;
    const curK = Math.round(R);
    const curWork = arrivalSeq[((curK % n) + n) % n]!;

    // 作品
    let glowIdx = onWall ? curWork : -1;
    // 每帧最多换 3 张纹理，避免一次上传过多造成卡顿
    let swaps = reduced ? Infinity : 3;
    tiles.forEach((t, i) => {
      const mesh = t.mesh;
      if (!mesh) return;
      const isHover = (hoverId.current === i && onWall) || (t.thumb !== null && leafHover === i);
      t.hover = reduced ? (isHover ? 1 : 0) : damp(t.hover, isHover ? 1 : 0, RATE.hover, dt);
      if (t.hover < 1e-3 && !isHover) t.hover = 0;
      if (t.follow) {
        t.cur = flowPose(i, f, offset.current, t.hover);
        if (onWall && !wallVisible(i, wallScene)) t.cur.o = 0;
      } else lerpPose(t.from, t.to, t.t, t.cur);
      const p = t.cur;

      mesh.position.set(p.x, p.y, p.z);
      mesh.rotation.set(p.rx, p.ry, p.rz);
      // 阅读树的真实作品缩略图悬停时轻微放大（中心不动）；命中仍由叶子节点决定，不受放大尺寸影响
      const grow = t.thumb !== null ? 1 + (LEAF_THUMB_HOVER_SCALE - 1) * t.hover : 1;
      mesh.scale.set(p.w * grow, p.h * grow, 1);
      const u = t.mat.uniforms;
      // 缩略图补齐：生成好一件就换上一件（每帧最多 3 件，与高清纹理换图共用额度），位置不变，透明度 0 → 1 淡入
      if (!t.loaded && thumbReady(works[i]!) && swaps > 0) {
        swaps--;
        t.loaded = true;
        u.uMap!.value = u.uPrev!.value = workTexture(works[i]!, BASE_TEX, anisotropy);
      }
      t.reveal = t.loaded ? (reduced ? 1 : Math.min(1, t.reveal + dt / DUR.fade)) : 0;
      mesh.visible = p.o * t.reveal > 0.002;
      u.uOpacity!.value = p.o * t.reveal;
      u.uDim!.value = p.dim;
      u.uMute!.value = p.mute ?? 0;
      u.uSat!.value = p.sat ?? 1;
      u.uRadius!.value = p.r;
      (u.uSize!.value as THREE.Vector2).set(p.w, p.h);
      // 名单当前作品加白色描边
      const outlineTo = onWall && i === curWork ? 1 : 0;
      // 作品墙上随当前行即时切换，保证描边与名单始终一致；离开作品墙时淡出
      t.outline = reduced || onWall ? outlineTo : damp(t.outline, outlineTo, RATE.outline, dt);
      if (t.outline < 1e-3) t.outline = 0;
      u.uOutline!.value = t.outline;
      t.mat.depthTest = !t.front;
      // 树可见时，树上的缩略图画在点云、曲线之上（树的绘制序为 4–6）；树淡出后回到普通序
      // 收回或展开途中保持该序，直到树淡出
      if (t.thumb) t.lift = THUMB_ORDER[t.thumb];
      else if (neb.current.opacity <= 0.01) t.lift = 0;
      mesh.renderOrder = t.front ? 10 : t.lift;

      // 速度：参考镜头下中心点的屏幕位移
      v.set(p.x, p.y, p.z).applyMatrix4(refView).applyMatrix4(refProj);
      const sx = (v.x * 0.5 + 0.5) * f.vw;
      const sy = (0.5 - v.y * 0.5) * f.vh;
      const dx = sx - t.sx;
      const dy = sy - t.sy;
      t.sx = sx;
      t.sy = sy;
      const speed = dt > 0 && Number.isFinite(dx + dy) ? Math.hypot(dx, dy) / dt : 0;
      if (speed > 1) t.dir.set(dx, -dy).normalize();
      t.vel = damp(t.vel, Math.min(speed, 4000), RATE.velocity, dt);
      let strength = reduced ? 0 : Math.min(1, Math.max(0, t.vel - 40) / 1400);
      if (strength < 0.003) strength = 0;
      u.uStrength!.value = strength;
      (u.uDir!.value as THREE.Vector2).copy(t.dir);

      // 在焦平面上停稳且显示较大时，换成与设备像素等宽的纹理，纹素与像素一一对应
      // 小于 48px 的小方块（质量章节质量证明分段的分数段）沿用常态纹理，不为它生成低分辨率纹理
      const texW = !t.follow && t.t >= 1 && p.z === 0 && p.dim === 1 && p.w >= 48 && !t.thumb ? hiresWidth(p.w, dpr) : BASE_TEX;
      if (texW !== t.texW && (texW !== BASE_TEX || t.follow) && swaps-- > 0) {
        t.texW = texW;
        u.uMap!.value = workTexture(works[i]!, texW, anisotropy);
      }
    });
    updateWallDom(wall, f, R, hov, onWall, shown.current);
    // 聚焦时树让位：标签、悬停与路径都收掉
    // 镜头补间期间暂停树的悬停：取景每帧在动，指针下的节点会反复换，路径文字会逐帧跳动
    // 用进度而不是 isActive：状态切换后、时间线第一次被 gsap 推进之前的那一帧，isActive 仍为 false，
    // 而新 spec 已生效，标签会在这一帧用旧取景换成新内容
    const ntl = nebTl.current;
    const cameraMoving = ntl !== null && ntl.duration() > 0 && ntl.progress() < 1;
    nebula.update(neb.current, s.focus ? undefined : nebulaSpecOf(s), f, pc, dpr, st.clock.elapsedTime, dt, reduced, nebulaLabels, s.focus ? null : pointer.current, cameraMoving);
    if (s.focus) glowIdx = works.findIndex((w) => w.id === s.focus!.id);

    // 背景光晕取焦点作品主色
    if (glow.current) {
      const target = glowIdx >= 0 ? accentColor(works[glowIdx]!) : '#1c2530';
      glowTarget.set(target);
      glowColor.current.lerp(glowTarget, reduced ? 1 : 1 - Math.exp(-RATE.glow * dt));
      glow.current.style.setProperty('--glow', `#${glowColor.current.getHexString()}`);
    }

    // 地面网格只属于作品墙
    gridVis.current = reduced ? (onWall ? 1 : 0) : damp(gridVis.current, onWall ? 1 : 0, RATE.grid, dt);
    if (gridRef.current) {
      const section = gridSection(f);
      gridRef.current.position.z = (offset.current % section) - flowGeometry(f).far * 0.4;
      gridRef.current.visible = gridVis.current > 0.01;
      const gm = gridRef.current.material as THREE.ShaderMaterial;
      const k = gridVis.current;
      gm.uniforms.sectionColor!.value.setRGB(0.2 * k, 0.22 * k, 0.26 * k);
      gm.uniforms.cellColor!.value.setRGB(0.1 * k, 0.11 * k, 0.13 * k);
    }
  });

  const gridRef = useRef<THREE.Mesh>(null);

  const onOver = (i: number) => (e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation();
    if (onWallStep(stateRef.current) && !wallVisible(i, wallFilterRef.current)) return;
    hoverId.current = i;
    document.body.style.cursor = 'pointer';
  };
  const onOut = (i: number) => () => {
    if (hoverId.current === i) hoverId.current = null;
    document.body.style.cursor = '';
  };
  const onClick = (i: number) => (e: ThreeEvent<MouseEvent>) => {
    e.stopPropagation();
    if (suppressClick.current) return;
    if (onWallStep(stateRef.current) && !wallVisible(i, wallFilterRef.current)) return;
    onOpen(works[i]!.id);
  };

  const g = flowGeometry(frame);

  return (
    <>
      <primitive object={nebula.group} />
      <Grid
        ref={gridRef}
        renderOrder={-1}
        position={[0, -frame.vh * 0.62, 0]}
        args={[1, 1]}
        cellSize={gridSection(frame) / 4}
        sectionSize={gridSection(frame)}
        cellColor="#1a1c21"
        sectionColor="#33383f"
        cellThickness={0.6}
        sectionThickness={1}
        infiniteGrid
        fadeDistance={g.far * 1.1}
        fadeStrength={1.6}
        followCamera={false}
      />
      {tiles.map((t, i) => (
        <mesh
          key={works[i]!.id}
          ref={(m) => {
            t.mesh = m;
            if (m) m.raycast = interactiveRaycast(t);
          }}
          material={t.mat}
          onPointerOver={onOver(i)}
          onPointerOut={onOut(i)}
          onClick={onClick(i)}
        >
          <planeGeometry args={[1, 1, 24, 16]} />
        </mesh>
      ))}
    </>
  );
});

const glowTarget = new THREE.Color();
const gridSection = (f: Frame) => Math.round(f.vh * 0.4);

/** 只有清晰可见的作品参与点击与悬停。 */
function interactiveRaycast(t: Tile) {
  const base = THREE.Mesh.prototype.raycast;
  return function (this: THREE.Mesh, rc: THREE.Raycaster, hits: THREE.Intersection[]) {
    if (t.inert || t.thumb || t.cur.o < 0.5 || t.cur.dim < 0.3) return;
    base.call(this, rc, hits);
  };
}

/**
 * 写入作品墙 DOM 层：名单各行位置与透明度、当前行、悬停信息。
 * R 为名单的连续位置（到达计数 + 悬停偏移），curK 为当前行的到达序号。
 */
function updateWallDom(
  dom: WallDom,
  f: Frame,
  R: number,
  hov: number | null,
  onWall: boolean,
  shown: { cur: number; hover: number },
) {
  const n = WALL_COUNT;
  // 首次写入位置后名单才显示（样式见 .roster:not([data-ready])）：Scene 比 DOM 晚挂载，之前各行叠在同一处
  if (dom.roster && !dom.roster.dataset.ready) dom.roster.dataset.ready = '';

  // 位置、透明度与当前行标记见 rosterDom.ts；离开作品墙后名单不再逐帧写入，保留最后一次的位置
  if (onWall || shown.cur === -1) layoutRoster(dom.rows, f, R, shown, WALL_COUNT);

  // 悬停：标题栏下方右侧的作品信息
  const hoverKey = onWall && hov !== null ? hov : -1;
  if (shown.hover !== hoverKey) {
    shown.hover = hoverKey;
    if (hoverKey >= 0) {
      const w = works[hoverKey]!;
      if (dom.infoIndex) dom.infoIndex.textContent = `${String(w.index + 1).padStart(3, '0')} / ${String(n).padStart(3, '0')}`;
      if (dom.infoTitle) dom.infoTitle.textContent = w.title;
      if (dom.infoTags) dom.infoTags.textContent = [categoryLabel(w.categoryId), w.studio].filter(Boolean).join(' · ');
    }
    if (dom.info) dom.info.dataset.on = hoverKey >= 0 ? '1' : '0';
  }
}
