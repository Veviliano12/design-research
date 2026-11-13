/**
 * 动效时长、缓动与导航高度的唯一来源。
 * - TS 侧（GSAP 补间、帧循环里的计时）直接引用 DUR / EASE.*.gsap；布局引用 NAV_H。
 * - CSS 侧通过 applyMotionTokens() 把同一组数值写成 :root 变量（--dur-*、--ease-*、--delay-copy、--nav-h-*），
 *   styles.css 里只引用变量；:root 里的同名默认值只是首帧兜底，须与此处一致。
 * 时长单位为秒。
 */
export const DUR = {
  /** 悬停、按钮反馈 */
  quick: 0.2,
  /** DOM 文案淡入淡出、层级显隐 */
  fade: 0.45,
  /** 章节内容层进入作品墙这一步时的快速淡出：要在名单浮现前清场，不超过 0.22 秒 */
  wallExit: 0.2,
  /** 带延迟的层级入场（名单、标题栏、统计面板） */
  slow: 0.6,
  /** 作品排布补间、聚焦切换 */
  move: 1.1,
  /** 聚焦切换的过渡着色器、槽位换图 */
  swap: 0.9,
  /** 镜头在各取景之间的移动（树的全景、推进到某棵树） */
  camera: 2.4,
  /** 规模第 2 步（阅读型页面树）与作品墙之间：作品从作品叶展开或收回，镜头与作品姿态共用同一时长，读作一次缩放 */
  zoom: 1.8,
  /** 树步骤中作品缩小飞向所属大类的根 */
  flyToRoot: 1.0,
  /** 树从根向外生长：枝条依次画出 */
  grow: 1.6,
  /** 树整体淡入、离开时淡出 */
  forestFade: 0.8,
  /** 总量数字滚动 */
  count: 1.8,
  /** 入库动态：新方块在树的末端长出，外圈扩散一道细框 */
  ingestGrow: 1.2,
  ingestRing: 0.9,
  /** 进入作品墙（圆墙）第一段：旧舞台上已有的作品图片向上飞出屏幕，树同时淡出，镜头不动；第二段圆墙整体淡入沿用 fade */
  wallLeave: 0.4,
  /** 进入作品墙第三段：圆墙停稳后墙上每件作品飞到位的时长（圆墙目录读取） */
  wallWorkIn: 0.6,
  /** 进入作品墙第三段：墙上作品飞入的错峰总长（圆墙目录读取） */
  wallWorkStagger: 0.18,
  /** 聚焦翻页时，其余作品回到位置的补间 */
  settle: 0.4,
  /** 作品排布补间的错峰：全部作品起跳时间分散在这段时间内 */
  stagger: 0.22,
  /** 作品飞向根的过程中，树开始生长的延迟 */
  growDelay: 0.7,
  /** 对比换组：旧组退场（提示词逐字上滑、两页向中缝收拢、标题行与列表淡出） */
  distillOut: 0.3,
  /** 对比换组：提示词单字从下方入场 */
  distillChar: 0.45,
  /** 对比换组：提示词逐字入场的错峰总长 */
  distillCharSpread: 0.3,
  /** 对比换组：强调色细线从提示词落到中缝 */
  distillSeam: 0.35,
  /** 对比换组：两页从中缝展开、页面图从 1.08 倍缩回 */
  distillOpen: 0.6,
  /** 对比换组：UCD 一侧晚于普通蒸馏展开 */
  distillUcdLag: 0.12,
  /** 对比换组：标题行、标注列表单条入场 */
  distillItem: 0.35,
  /** 对比换组：评分滚动 */
  distillRoll: 0.8,
  /**
   * 对比框选：光标依次框出每个标注，单个标注的总时长 = 移向框角 + 拖出选框 + 停留 + 提交（选框淡出、列表条目淡入）。
   * 停留 = distillMark - distillMove - distillDrag - distillCommit（当前 0.6 秒，属性标签在拖完后显示）。
   * 一组最多 4 个标注：4 × distillMark + distillMarkLag + distillCursorOut 须不超过 8 秒
   */
  distillMark: 1.7,
  /** 对比框选：光标从上一处移向选框左上角 */
  distillMove: 0.5,
  /** 对比框选：从左上角拖到右下角 */
  distillDrag: 0.4,
  /** 对比框选：选框与属性标签淡出，同时列表条目淡入；之后画板上不留框 */
  distillCommit: 0.2,
  /** 对比框选：按下后选框淡入 */
  distillSelectIn: 0.08,
  /** 对比框选：右侧（UCD 生产）光标晚于左侧开始 */
  distillMarkLag: 0.45,
  /** 对比框选：光标出场淡入；最后一个标注提交后光标淡出 */
  distillCursorIn: 0.15,
  distillCursorOut: 0.3,
} as const;

/**
 * 帧循环里指数阻尼的速率（THREE.MathUtils.damp 的 lambda，单位 1/秒，越大越跟手）。
 * 不是补间时长，但同样决定动效手感，所以和时长放在一起。
 */
export const RATE = {
  /** 悬停时作品墙流动减速 */
  flow: 4,
  /** 镜头漂移（作品墙）/ 回正（其他状态） */
  camera: 2.2,
  cameraReturn: 6,
  /** 名单切到悬停作品 */
  roster: 7,
  /** 悬停推近 */
  hover: 6,
  /** 描边淡出 */
  outline: 10,
  /** 作品速度平滑（驱动形变与色差） */
  velocity: 8,
  /** 地面网格显隐 */
  grid: 5,
  /** 背景光晕颜色跟随 */
  glow: 2,
  /** 推进到单棵树时，相邻树亮度的交叉过渡 */
  focusFade: 3.5,
} as const;

/**
 * 树的取景参数（不是时长，但决定镜头落点）。版面按 composition 的 pageGrid（12 栏）划分，下面的“栏”指网格栏。
 * 规模第 1 步（总览）：上图下数，右侧细索引。统计带在网格底部，树区是它上方从 scaleFrom 栏起的 scaleCols 栏，
 * 细索引占右侧 indexCols 栏、止于统计带之上。镜头取旧版全景与旧版铺满两种取景的混合（overviewMix）：
 * 旧版全景把网络横向铺到视口之外（左右出血），纵向以树区偏下的位置为中心；旧版铺满把整片网络装进细索引左侧的出血矩形。
 * 规模第 2 步推进到单棵树时，真实枝叶的中心落在索引左侧的 focus 矩形中心，镜头比整树取景再近 focusZoom 倍。
 */
export const VIEW = {
  /** 规模：统计带（发丝线至网格底边）占网格内容区（top 至 bottom）高度的比例 */
  scaleBand: 0.24,
  /** 规模紧凑布局：统计带占内容区高度的比例与最小高度（像素）；network.css 的紧凑遮罩按同一组数值写 calc，改动须同步 */
  scaleBandCompact: 0.2,
  scaleBandCompactMin: 96,
  /** 规模：树区从第几栏（0 起）开始、占几栏；只决定树区上沿与取景的竖直参照 */
  scaleFrom: 4,
  scaleCols: 8,
  /** 规模：全景下网络横向铺到视口宽度的倍数（>1 时左右两侧出血） */
  scaleSpan: 1.12,
  /** 规模：全景取景中心相对视口中心的横向偏移（视口宽度的比例，向右为正） */
  scaleShift: 0.02,
  /** 规模：全景取景中心在树区高度上的位置（0 为树区上沿，1 为统计带发丝线）；偏上让下缘枝端落进统计带渐隐、上缘出画 */
  scaleCenter: 0.56,
  /** 规模：紧凑布局的竖直中心，略低于桌面，避免上方的根落进文案区 */
  scaleCenterCompact: 0.55,
  /**
   * 规模第 1 步（总览）：镜头距离与注视点在旧版全景（0）与旧版铺满（1）之间的混合比例。
   * 两端各自按当前视口求出，再线性插值
   */
  overviewMix: 0.5,
  /** 规模第 1、2 步：右侧细索引占的栏数 */
  indexCols: 2,
  /** 规模紧凑布局：细索引横带占内容区高度的比例与最小高度（像素）；network.css 的紧凑遮罩同步 */
  indexCompact: 0.22,
  indexCompactMin: 120,
  /** 规模：旧版铺满取景相对内容区的出血放大系数（>1 时树的外缘越出内容区，由 canvas 遮罩渐隐） */
  fillBleed: 1.12,
  /** 规模第 2 步：推进到单棵树时，树的取景从第几栏（0 起）开始 */
  focusFrom: 4,
  /** 推进到单棵树时，树外接框相对目标矩形的余量系数（>1 表示更远一点） */
  focusMargin: 1.1,
  /**
   * 规模第 2 步：在“整棵树装进 focus 矩形”的取景距离上再推近的倍数（镜头距离除以它）。
   * 注视中心改对准真实作品叶的外接框，装饰叶可越出画面
   */
  focusZoom: 1.5,
  /** 规模第 2 步：作品叶上缩略图的屏幕宽度（像素），世界尺寸按当前取景距离换算，高按作品宽高比 */
  leafThumbPx: 36,
  /** 规模第 2 步：每 7 件一张大图（Scene 的 LEAF_THUMB_GROUP），屏幕宽为 leafThumbPx 的这个倍数 */
  leafThumbBig: 2,
  /** 推进到单棵树时，其余树退到的亮度（0–1）：相邻树不再是清晰的亮枝 */
  neighborDim: 0.16,
  /** 节点标签盒的外扩留白（像素）：标签锚在盒子底边中点，留白参与锚点偏移，决定标签离节点的距离 */
  labelGap: 14,
  /** 根标签离根方块外沿的屏幕距离（像素） */
  rootLabelPx: 26,
  /** 叶子在屏幕上的最小边长（像素），取景放大时据此限制 */
  minLeafPx: 3,
} as const;

/**
 * 作品墙镜头的自动漂移：一条闭合的缓慢摆动曲线，不随输入变化。
 * 幅度为半幅（度），水平轴一圈用 period 秒，竖直轴在一圈内摆动两次，回到起点时两轴相位一致，循环无跳变。
 */
export const CAMERA_DRIFT = {
  /** 一圈的秒数 */
  period: 28,
  /** 左右半幅 */
  yaw: 1.2,
  /** 上下半幅 */
  pitch: 0.6,
} as const;

export interface Ease {
  /** GSAP 缓动名 */
  gsap: string;
  /** 与之等价的 CSS cubic-bezier（GSAP 的 power 系列即 quad/cubic/quart 曲线） */
  css: string;
}

export const EASE = {
  /** 位置与镜头：easeInOutQuart */
  move: { gsap: 'power3.inOut', css: 'cubic-bezier(0.76, 0, 0.24, 1)' },
  /** 透明度进场、数值滚动：easeOutCubic */
  out: { gsap: 'power2.out', css: 'cubic-bezier(0.33, 1, 0.68, 1)' },
  /** 透明度离场：easeInCubic */
  in: { gsap: 'power2.in', css: 'cubic-bezier(0.32, 0, 0.67, 0)' },
  /** 对称过渡（交叉淡化、着色器过渡）：easeInOutCubic，f(1-t)=1-f(t)，新旧层不透明度之和恒为 1 */
  swap: { gsap: 'power2.inOut', css: 'cubic-bezier(0.65, 0, 0.35, 1)' },
} as const satisfies Record<string, Ease>;

/** DOM 文案入场延迟：等作品移动过半再出现，避免文字和画面同时跳动。 */
export const COPY_DELAY = 0.3;

/**
 * 常规章节排布入场：作品从当前姿态移到下一步目标。
 * 质量分布页的填充缩略图整体淡入也共用这里的时长与缓动，避免舞台作品与缩略图各走一套入场。
 */
export const LAYOUT_ENTRY = { duration: DUR.move, ease: EASE.move.gsap, stagger: DUR.stagger } as const;

/**
 * 底部导航高度（像素）：桌面与紧凑布局。布局的底部避让（layout.ts、composition.ts）直接引用这里；
 * applyMotionTokens() 写成 :root 的 --nav-h-desktop / --nav-h-compact，styles.css 只引用变量。
 */
export const NAV_H = {
  desktop: 100,
  compact: 88,
} as const;

/** 作品墙底部操作提示：无输入多久后淡出（毫秒） */
export const HINT_IDLE_MS = 4000;

/** 自动播放：没有完成信号的步的默认停留（毫秒），Step.dwell 可覆盖 */
export const AUTOPLAY_DWELL_MS = 7000;
/** 自动播放：等完成信号的步，信号到达后的结尾停留（毫秒） */
export const AUTOPLAY_TAIL_MS = 2000;
/** 自动播放：等完成信号的步，等不到信号时的兜底上限（毫秒） */
export const AUTOPLAY_CAP_MS = 60000;

/** 把 DUR / EASE / COPY_DELAY / NAV_H 写成 :root 变量，供 styles.css 引用。启动时调用一次。 */
export function applyMotionTokens(root: HTMLElement = document.documentElement) {
  for (const [k, v] of Object.entries(DUR)) root.style.setProperty(`--dur-${k}`, `${v}s`);
  root.style.setProperty('--ease-move', EASE.move.css);
  root.style.setProperty('--ease-out', EASE.out.css);
  root.style.setProperty('--ease-in', EASE.in.css);
  root.style.setProperty('--ease-swap', EASE.swap.css);
  root.style.setProperty('--delay-copy', `${COPY_DELAY}s`);
  root.style.setProperty('--nav-h-desktop', `${NAV_H.desktop}px`);
  root.style.setProperty('--nav-h-compact', `${NAV_H.compact}px`);
}
