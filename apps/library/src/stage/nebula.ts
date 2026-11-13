/**
 * 作品库的分类树几何：每个大类一棵树，根是大类，叶子是作品；大类与作品之间只有装饰枝，没有子类。
 *
 * 真实数据是已上墙的 124 条标杆：作品叶直接挂在所属大类的装饰枝上，一个真实叶对应一件作品，
 * 叶子的作品序号供悬停路径与点击共用。没有精选作品的大类只有装饰枝与装饰叶，保持整片树群的构图与规模感。
 * 装饰叶只补密度，不计入任何数量、不绑定作品、不可点击当作品。
 *
 * 节点用 meta 的第四位区分真实（0）与装饰（1）：只有根与真实叶是真实节点，
 * 只有真实叶参与点击与路径中的作品标题，标签与统计也只读 categoryTree。
 *
 * 九种视效语言各有自己的位置、大小与一级枝权重（见 SHAPES，根的顺序与 categoryTree 的语言顺序一致）。
 * 每棵树向全周长枝，伸展长度随角度按各自的长度轮廓变化（reachProfile），枝群疏密不一、彼此穿插，整体没有可辨认的外轮廓。
 * 每棵树（含它的尘点）用由大类 id 派生的独立随机序列生成，增减或改动一棵树不改变其他树的坐标。
 *
 * 本文件只生成数据，不依赖 three（Stage 的静态依赖不能引入 three）：全部是 Float32Array / Uint32Array，
 * 由 nebulaScene.ts 一次性上传成实例化属性。形状由固定种子生成，每次打开一致。
 *
 * 坐标：世界单位 = 焦平面像素（树的局部坐标，原点在各树的外接框中心），z 恒为 0 附近，
 * 因此任何视角下树与树在屏幕上不会互相遮盖。
 */
import { CATEGORY_TREE } from './categoryTree';

/**
 * 节点层级。Branch 与 PageType 都是装饰枝（一级、二级），不承载分类：
 * 真实数据只有 大类 → 作品叶子 两层，作品叶挂在一级装饰枝上，装饰叶挂在二级装饰枝上。
 */
export const enum Level {
  Root = 0,
  Branch = 1,
  PageType = 2,
  Leaf = 3,
}

/** 根、一级装饰枝与二级装饰枝的方块基准边长（像素）；叶子另有长条形状，尺寸在生成处给出。 */
export const NODE_SIZE = { root: 34, branch: 18, pageType: 11 } as const;

export interface Forest {
  /** 节点总数，含根、装饰枝、叶子（含装饰叶） */
  count: number;
  /** 每节点：x, y（树局部坐标）、宽、高 —— 4 个 float */
  rect: Float32Array;
  /**
   * 每节点：层级、大类序号、一级枝序号（树内；根为 -1）、装饰标记（1 = 装饰节点，0 = 真实） —— 4 个 float
   */
  meta: Float32Array;
  /** 每节点：生长开始时刻（0–1，占整个生长时长的比例）、呼吸相位、父节点序号、对应作品序号 —— 4 个 float */
  grow: Float32Array;
  /** 每节点的祖先位集合：bit0 为自身，bit k 为第 k 级祖先 */
  chain: Uint32Array;
  /** 节点的祖先链：到根为止的节点序号（自身在前）；定长 4，不足补 -1 */
  path: Int32Array;
  /** 边：每条边的 4 个控制点 (x0,y0,cx,cy) 与 (x1,y1,大类,层级) */
  edgeA: Float32Array;
  edgeB: Float32Array;
  edgeCount: number;
  /** 每条边生长时刻（与子节点一致）、子节点序号 */
  edgeGrow: Float32Array;
  edgeChild: Int32Array;
  /** 尘点：x, y, 大类, 呼吸相位。只是枝端外的背景颗粒，不与作品或数量对应 */
  dust: Float32Array;
  dustCount: number;
  /** 每棵树的根序号、外接框（局部坐标）与根标签方向（该树长度轮廓最短的方向），取景与标签使用 */
  roots: { node: number; x: number; y: number; hw: number; hh: number; labelAngle: number }[];
  /** 全部树的外接框半宽、半高（含枝端，不含稀疏尘点） */
  hw: number;
  hh: number;
  /** 节点包围盒的中心（树局部坐标）；各树不一定关于原点对称 */
  cx: number;
  cy: number;
  /** 主簇（SHAPES.core 为真的树）的外接框中心与半宽、半高：规模第 1 步全景按它取景，主簇外的树可以出画 */
  core: { cx: number; cy: number; hw: number; hh: number };
}

function mulberry32(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** 尘点总量上限。 */
export const DUST_MAX = 30_000;

/**
 * 装饰叶的总预算：只决定树形的疏密和伸展，不代表任何真实数量。
 * 每棵树按自己的 decor（预算的绝对比例，不做归一）取装饰叶，挂在二级装饰枝上；作品叶另挂在一级装饰枝上，不占这份预算。
 */
const DECOR_LEAF_TOTAL = 2_600;
const DECOR_PAGE_SHARE = [0.27, 0.18, 0.21, 0.15, 0.19] as const;

/** 每片叶子平均配的尘点数；每棵树的尘点只按自己的叶子数计，增减大类不影响其他树。 */
const DUST_PER_LEAF = 10.5;

/** 每棵树的形态。位置与尺寸以 R（基准半径）为单位，手写而非随机，保证构图固定且不对称。 */
interface Shape {
  /** 根位置 */
  x: number;
  y: number;
  /** 枝长与叶簇的整体缩放 */
  scale: number;
  /** 主方向（弧度）：叶簇轻微拉长的方向；一级枝本身分布在全周 */
  dir: number;
  /** 叶簇沿主方向拉长的倍数 */
  stretch: number;
  /** 叶簇横向压扁的倍数 */
  squash: number;
  /** 叶子数量的疏密系数 */
  density: number;
  /** 尘点散布半径的系数 */
  haze: number;
  /** 装饰叶占 DECOR_LEAF_TOTAL 的比例（绝对值，各树互不影响） */
  decor: number;
  /**
   * 一级枝的权重，长度即一级枝数。有精选作品的树按它把作品叶分到各枝（最大余数法，总数始终等于作品数），
   * 装饰叶也按它分到各枝，于是作品多的枝也更密。
   */
  weights: readonly number[];
  /** 是否属于主簇：规模第 1 步的全景只按主簇取景，不在主簇的树可以出画 */
  core: boolean;
  /**
   * 长度轮廓的半幅：伸展倍数在 1 ± lobe 之间。叶子的随机伸展本身已带来约 1.2–1.6 的方向差，
   * 半幅只补到各树各方向最远伸展比都落在约 1.3–1.6；叶少的小树随机起伏大，半幅取 0。
   */
  lobe: number;
}

/**
 * 九种视效语言的形态，都属于主簇，全景按全部树取景。
 * 根的顺序与 categoryTree / 语言表一致；较大的语言（写实材质、图像后期）占更靠中心、更大的枝群。
 */
const SHAPES: readonly Shape[] = [
  // 液态玻璃与光学 19
  { x: -1.72, y: -0.18, scale: 1.08, dir: -2.35, stretch: 1.14, squash: 0.88, density: 0.96, haze: 1.02, decor: 0.18, weights: [8, 4, 6, 3, 5], core: true, lobe: 0.12 },
  // 流体与着色器场 11
  { x: -0.95, y: 0.68, scale: 0.86, dir: 0.85, stretch: 1.12, squash: 0.9, density: 1.1, haze: 0.88, decor: 0.14, weights: [5, 2, 4, 2], core: true, lobe: 0.2 },
  // 光与发光 15
  { x: 0.15, y: 0.62, scale: 0.98, dir: 0.35, stretch: 1.08, squash: 0.92, density: 1.05, haze: 0.9, decor: 0.15, weights: [6, 3, 4, 2, 3], core: true, lobe: 0.1 },
  // 粒子与点云 9
  { x: 1.28, y: 0.52, scale: 0.8, dir: 0.2, stretch: 1.1, squash: 0.9, density: 1.12, haze: 0.82, decor: 0.12, weights: [4, 2, 3, 1], core: true, lobe: 0.08 },
  // 图像与视频后期 24
  { x: 0.95, y: -0.42, scale: 1.18, dir: 2.9, stretch: 1.16, squash: 0.87, density: 0.94, haze: 1.08, decor: 0.18, weights: [8, 4, 6, 3, 5, 2], core: true, lobe: 0.1 },
  // 生成艺术与程序化图形 1
  { x: 2.48, y: 0.58, scale: 0.58, dir: -0.3, stretch: 1.08, squash: 0.92, density: 0.9, haze: 0.7, decor: 0.08, weights: [1, 1], core: true, lobe: 0.0 },
  // 实时 3D · 写实材质与物件 32（最大）
  { x: -0.18, y: -0.38, scale: 1.36, dir: -0.7, stretch: 1.2, squash: 0.86, density: 0.9, haze: 1.16, decor: 0.22, weights: [8, 4, 7, 3, 6, 4], core: true, lobe: 0.12 },
  // 实时 3D · 场景与世界 11
  { x: 1.95, y: -0.12, scale: 0.88, dir: 2.4, stretch: 1.12, squash: 0.9, density: 0.98, haze: 0.95, decor: 0.13, weights: [5, 2, 3, 2], core: true, lobe: 0.08 },
  // 物理与软体模拟 2
  { x: 2.58, y: -0.52, scale: 0.62, dir: -0.5, stretch: 1.1, squash: 0.9, density: 0.85, haze: 0.75, decor: 0.08, weights: [1, 1], core: true, lobe: 0.0 },
];

/**
 * 每棵树的长度轮廓：随角度平滑变化的伸展倍数，几个低频正弦叠加后线性映射到 [1 − lobe, 1 + lobe]。
 * 一级枝长度、装饰叶与作品叶的伸展距离、尘点半径都乘它，于是树向全周长枝，各方向长短略有差异，轮廓不是圆形。
 * 振幅与相位取自该树自己的随机序列。
 */
function reachProfile(rand: () => number, lobe: number): (ang: number) => number {
  const terms = [1, 2, 3].map((k) => ({ k, a: (k === 1 ? 0.6 : k === 2 ? 0.4 : 0.18) * (0.6 + rand() * 0.8), ph: rand() * Math.PI * 2 }));
  const raw = (t: number) => terms.reduce((v, { k, a, ph }) => v + a * Math.sin(k * t + ph), 0);
  let lo = Infinity;
  let hi = -Infinity;
  for (let i = 0; i < 360; i++) {
    const v = raw((i / 360) * Math.PI * 2);
    lo = Math.min(lo, v);
    hi = Math.max(hi, v);
  }
  return (t: number) => 1 - lobe + ((raw(t) - lo) / (hi - lo || 1)) * 2 * lobe;
}

if (SHAPES.length !== CATEGORY_TREE.length) {
  throw new Error('分类树几何：SHAPES 与大类数量不一致');
}

/** 按权重把 n 件分到各枝（最大余数法），总数恰为 n。 */
function apportion(n: number, weights: readonly number[]): number[] {
  const sum = weights.reduce((a, b) => a + b, 0);
  const raw = weights.map((w) => (n * w) / sum);
  const out = raw.map(Math.floor);
  let left = n - out.reduce((a, b) => a + b, 0);
  const order = raw.map((r, i) => [r - Math.floor(r), i] as const).sort((a, b) => b[0] - a[0] || a[1] - b[1]);
  for (let k = 0; left > 0; k = (k + 1) % order.length, left--) out[order[k]![1]]!++;
  return out;
}

/** 由大类 id 派生的随机种子（FNV-1a）：每棵树独立取数，增减或改动别的树不影响它。 */
function seedOf(id: string): number {
  let h = 0x811c9dc5;
  for (let i = 0; i < id.length; i++) h = Math.imul(h ^ id.charCodeAt(i), 0x01000193);
  return (h ^ 20261107) >>> 0;
}

/**
 * 生成分类树。vh 为视口高度，决定树的像素尺度；种子固定。
 * 同步生成不超过几千个节点与几万个尘点，耗时在几毫秒量级；调用方可放在空闲时执行。
 */
export function createForest(vh: number): Forest {
  // 当前树的随机数：每棵树开始生成时换成由大类 id 派生的独立序列
  let rand = mulberry32(20261107);
  const R = vh * 0.5;

  const nodes: {
    x: number; y: number; w: number; h: number;
    level: number; ind: number; sub: number; decor: number;
    start: number; parent: number; work: number; phase?: number;
  }[] = [];
  const edges: { x0: number; y0: number; cx: number; cy: number; x1: number; y1: number; ind: number; level: number; start: number; child: number }[] = [];

  // 呼吸相位在建节点时取自当前树的序列，不再在全体节点上顺序取数
  const addNode = (n: (typeof nodes)[number]) => nodes.push({ ...n, phase: rand() * Math.PI * 2 }) - 1;
  const addEdge = (parent: number, child: number) => {
    const a = nodes[parent]!;
    const b = nodes[child]!;
    // 二次贝塞尔：控制点取中点沿法线随机偏移，带随机弯曲
    const mx = (a.x + b.x) / 2;
    const my = (a.y + b.y) / 2;
    const dx = b.x - a.x;
    const dy = b.y - a.y;
    const len = Math.hypot(dx, dy) || 1;
    const bend = (rand() - 0.5) * 0.55 * len;
    edges.push({ x0: a.x, y0: a.y, cx: mx - (dy / len) * bend, cy: my + (dx / len) * bend, x1: b.x, y1: b.y, ind: b.ind, level: b.level, start: b.start, child: child });
  };

  const pol = (x: number, y: number, ang: number, r: number) => ({ x: x + Math.cos(ang) * r, y: y + Math.sin(ang) * r });

  const dustParts: Float32Array[] = [];
  /** 每棵树根标签的方向：长度轮廓最短的方向，标签落在枝最短的一侧，不压在长枝上 */
  const labelAngles: number[] = [];

  CATEGORY_TREE.forEach((cat, ind) => {
    rand = mulberry32(seedOf(cat.id));
    const sh = SHAPES[ind]!;
    const prof = reachProfile(rand, sh.lobe);
    let shortest = 0;
    for (let i = 1; i < 360; i++) if (prof((i / 360) * Math.PI * 2) < prof((shortest / 360) * Math.PI * 2)) shortest = i;
    labelAngles.push((shortest / 360) * Math.PI * 2);
    const S = R * sh.scale;
    const ux = Math.cos(sh.dir);
    const uy = Math.sin(sh.dir);
    const rootX = sh.x * R;
    const rootY = sh.y * R;
    const rootIdx = addNode({ x: rootX, y: rootY, w: NODE_SIZE.root, h: NODE_SIZE.root, level: Level.Root, ind, sub: -1, decor: 0, start: 0, parent: -1, work: -1 });

    // 一级枝全是装饰枝，枝数与权重来自 SHAPES.weights：作品叶按权重不均地分到各枝，装饰叶也按同一权重分
    const leaves = cat.works;
    const branchCount = sh.weights.length;
    const perBranch = apportion(leaves.length, sh.weights);
    const weightSum = sh.weights.reduce((a, b) => a + b, 0);
    const leafBudget = Math.round(DECOR_LEAF_TOTAL * sh.decor);
    // 一级枝分布在全周，起始角取自该树的随机序列
    const branchStart = rand() * Math.PI * 2;
    const firstNode = nodes.length;

    /** 一片叶子。decor=1 是装饰叶，decor=0 是一片真实作品（work 为作品序号）。叶簇沿树的主方向拉长、横向收窄。 */
    const addLeaf = (parent: number, sub: number, ang: number, decor: number, work: number) => {
      const p = nodes[parent]!;
      // 少量长枝：伸得更远，落进相邻枝群之间
      const stray = rand() < 0.07;
      const la = ang + (rand() - 0.5) * 1.3;
      const reach = S * (0.05 + Math.pow(rand(), 0.9) * (stray ? 0.5 : 0.32)) * prof(la);
      const dx = Math.cos(la) * reach;
      const dy = Math.sin(la) * reach;
      const along = dx * ux + dy * uy;
      const across = -dx * uy + dy * ux;
      // 长条像一行文字，宽 9–21、高 2.5；方块边长 4.5–8.5
      const strip = rand() < 0.45;
      const w = strip ? 9 + rand() * 12 : 4.5 + rand() * 4;
      const h = strip ? 2.5 : w;
      const idx = addNode({
        x: p.x + ux * along * sh.stretch - uy * across * sh.squash,
        y: p.y + uy * along * sh.stretch + ux * across * sh.squash,
        w,
        h,
        level: Level.Leaf,
        ind,
        sub,
        decor,
        start: 0.52 + rand() * 0.46,
        parent,
        work,
      });
      addEdge(parent, idx);
    };

    let workFrom = 0;
    for (let b = 0; b < branchCount; b++) {
      // 全周不均匀分布：每枝在均分位置上再抖动 ±0.2 个间隔，枝间距宽窄不一，但不留整片空扇区
      const slot = (b + 0.5) / branchCount + (rand() - 0.5) * (0.4 / branchCount);
      const ang = branchStart + slot * Math.PI * 2;
      // 一级枝长度：乘长度轮廓，权重高的枝略长
      const wk = sh.weights[b]! / weightSum;
      const sp = pol(rootX, rootY, ang, S * (0.16 + rand() * 0.1 + wk * 0.2) * prof(ang));
      const bIdx = addNode({
        x: sp.x,
        y: sp.y,
        w: NODE_SIZE.branch,
        h: NODE_SIZE.branch,
        level: Level.Branch,
        ind,
        sub: b,
        decor: 1,
        start: 0.14 + rand() * 0.06,
        parent: rootIdx,
        work: -1,
      });
      addEdge(rootIdx, bIdx);

      // 装饰的二级枝（旧页面类型的位置）：2–5 个，枝下挂装饰叶，只负责树形与密度；权重高的枝二级枝更多
      const branchShare = wk;
      const pageCount = Math.min(5, 2 + Math.floor(rand() * 2) + Math.round(wk * 6));
      const spread = 0.45 + rand() * 0.55;
      for (let g = 0; g < pageCount; g++) {
        const pageAng = ang + ((g - (pageCount - 1) / 2) / Math.max(1, pageCount - 1)) * spread * 2 + (rand() - 0.5) * 0.22;
        const pp = pol(sp.x, sp.y, pageAng, S * (0.22 + rand() * 0.2) * prof(pageAng));
        const pIdx = addNode({
          x: pp.x,
          y: pp.y,
          w: NODE_SIZE.pageType,
          h: NODE_SIZE.pageType,
          level: Level.PageType,
          ind,
          sub: b,
          decor: 1,
          start: 0.34 + rand() * 0.1,
          parent: bIdx,
          work: -1,
        });
        addEdge(bIdx, pIdx);
        const n = Math.max(4, Math.round(((leafBudget * branchShare * DECOR_PAGE_SHARE[g % DECOR_PAGE_SHARE.length]!) / (pageCount * 0.2)) * sh.density));
        for (let l = 0; l < n; l++) addLeaf(pIdx, b, pageAng, 1, -1);
      }

      // 真实作品叶：一个叶子一件精选作品，按稳定顺序分成连续的段，第 b 段（perBranch[b] 件）挂在第 b 个一级枝上
      for (let k = workFrom; k < workFrom + perBranch[b]!; k++) addLeaf(bIdx, b, ang, 0, leaves[k]!.workIndex);
      workFrom += perBranch[b]!;
    }

    // 尘点：一部分围绕叶子成雾，一部分落到枝群之间的空档，把各棵树连成一片。只是背景颗粒，不与作品或数量对应。
    // 每棵树只用自己的叶子和随机序列生成，数量按叶子数计
    const hosts: number[] = [];
    for (let i = firstNode; i < nodes.length; i++) if (nodes[i]!.level === Level.Leaf) hosts.push(i);
    const dc = Math.round(hosts.length * DUST_PER_LEAF);
    const part = new Float32Array(dc * 4);
    for (let i = 0; i < dc; i++) {
      const host = nodes[hosts[Math.floor(rand() * hosts.length)]!]!;
      const a = rand() * Math.PI * 2;
      // 约 16% 是远尘：半径更大，落在叶端之外、两棵树之间；其余贴着叶端，沿主方向拉长
      const far = rand() < 0.16;
      const t = Math.pow(rand(), far ? 0.7 : 1.7);
      const r = S * (0.015 + t * (far ? 0.95 : 0.4)) * sh.haze * prof(a);
      const dx = Math.cos(a) * r;
      const dy = Math.sin(a) * r;
      const along = dx * ux + dy * uy;
      const across = -dx * uy + dy * ux;
      part.set([host.x + ux * along * sh.stretch - uy * across * sh.squash, host.y + uy * along * sh.stretch + ux * across * sh.squash, ind, rand() * Math.PI * 2], i * 4);
    }
    dustParts.push(part);
  });

  const count = nodes.length;
  const rect = new Float32Array(count * 4);
  const meta = new Float32Array(count * 4);
  const grow = new Float32Array(count * 4);
  const chain = new Uint32Array(count);
  const path = new Int32Array(count * 4).fill(-1);
  nodes.forEach((n, i) => {
    rect.set([n.x, n.y, n.w, n.h], i * 4);
    meta.set([n.level, n.ind, n.sub, n.decor], i * 4);
    grow.set([n.start, n.phase!, n.parent, n.work], i * 4);
    let c = 0;
    let k = 0;
    for (let a = i; a >= 0 && k < 4; a = nodes[a]!.parent) {
      path[i * 4 + k] = a;
      c |= 1 << k;
      k++;
    }
    chain[i] = c;
  });

  const edgeCount = edges.length;
  const edgeA = new Float32Array(edgeCount * 4);
  const edgeB = new Float32Array(edgeCount * 4);
  const edgeGrow = new Float32Array(edgeCount);
  const edgeChild = new Int32Array(edgeCount);
  edges.forEach((e, i) => {
    edgeA.set([e.x0, e.y0, e.cx, e.cy], i * 4);
    edgeB.set([e.x1, e.y1, e.ind, e.level], i * 4);
    edgeGrow[i] = e.start;
    edgeChild[i] = e.child;
  });

  // 尘点按树顺序拼接，超过 DUST_MAX 时截掉末尾
  const dustAll = dustParts.reduce((n, p) => n + p.length / 4, 0);
  const dustCount = Math.min(DUST_MAX, dustAll);
  const dust = new Float32Array(dustCount * 4);
  let off = 0;
  for (const p of dustParts) {
    const take = Math.min(p.length, dust.length - off);
    if (take <= 0) break;
    dust.set(p.subarray(0, take), off);
    off += take;
  }

  // 外接框
  const roots = CATEGORY_TREE.map((_, ind) => {
    const labelAngle = labelAngles[ind]!;
    let x0 = Infinity, x1 = -Infinity, y0 = Infinity, y1 = -Infinity;
    nodes.forEach((n) => {
      if (n.ind !== ind) return;
      // 取景只按节点（根、枝、叶）算，稀疏的尘点可以出框；再留 8% 余量放标签
      x0 = Math.min(x0, n.x - n.w); x1 = Math.max(x1, n.x + n.w);
      y0 = Math.min(y0, n.y - n.h); y1 = Math.max(y1, n.y + n.h);
    });
    const rootNode = nodes.findIndex((n) => n.level === Level.Root && n.ind === ind);
    return { node: rootNode, x: (x0 + x1) / 2, y: (y0 + y1) / 2, hw: (x1 - x0) / 2, hh: (y1 - y0) / 2, labelAngle };
  });
  const box = (list: typeof roots) => {
    let ax0 = Infinity, ax1 = -Infinity, ay0 = Infinity, ay1 = -Infinity;
    for (const r of list) {
      ax0 = Math.min(ax0, r.x - r.hw); ax1 = Math.max(ax1, r.x + r.hw);
      ay0 = Math.min(ay0, r.y - r.hh); ay1 = Math.max(ay1, r.y + r.hh);
    }
    return { cx: (ax0 + ax1) / 2, cy: (ay0 + ay1) / 2, hw: (ax1 - ax0) / 2, hh: (ay1 - ay0) / 2 };
  };
  const all = box(roots);
  const core = box(roots.filter((_, i) => SHAPES[i]!.core));
  return { ...all, core, count, rect, meta, grow, chain, path, edgeA, edgeB, edgeCount, edgeGrow, edgeChild, dust, dustCount, roots };
}
