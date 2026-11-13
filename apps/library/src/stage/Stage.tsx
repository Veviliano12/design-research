import { lazy, Suspense, useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState, type CSSProperties } from 'react';
import { gsap, prefersReducedMotion } from '../motion/gsap';
import { applyMotionTokens, COPY_DELAY, DUR, EASE } from '../motion/tokens';
import { autoplayAdvance, autoplayDelay } from './autoplay';
import { chapters, type Chapter, type Copy, type Mark } from './chapters';
import { copyRect, featureGeometry, featureNotes, measureFrame, type Arrangement, type Frame } from './layout';
import { FocusDetail } from './focus/FocusDetail';
import { StageLoader } from './StageLoader';
import { atEnd, back, chapterOfHash, fromHash, home, next, prev, chapterState, stateKey, toHash, type NavState } from './nav';
import type { SceneHandle } from './Scene';
import { CanvasErrorBoundary } from './canvasError';
import { createNebulaLabelDom, NEBULA_LABEL_COUNT, NEBULA_RING_COUNT, StageApiContext, type StageApi } from './stageApi';
import { createWallDom, WallOverlay } from './WallOverlay';
import { subscribeWorks, warmThumbs, workById } from './works';
import { wallWorkIds } from './wallWorks';

// 3D 部分（three、R3F、Scene）单独成块：首帧 DOM 绘制之后才加载与求值，不挤在首屏的主线程里
const StageCanvas = lazy(() => import('./StageCanvas'));


// 把 tokens.ts 的时长与缓动写成 :root 变量，styles.css 只引用变量
applyMotionTokens();

const stepCounts = chapters.map((c) => c.steps.length);
const chapterIds = chapters.map((c) => c.id);

/** 加载页兜底：从开始加载起这么久仍未全部就绪就直接揭幕（毫秒） */
const LOAD_TIMEOUT_MS = 15000;

const WHEEL_LOCK_MS = 700;
const WHEEL_REPEAT_MS = 1500;

/** Scene 的补间完成信号：详情播放已不等它，这里只需要一个稳定引用（内联回调会改变 Scene 的 effect 依赖） */
const ignoreSettle = () => {};


function useViewport() {
  const [size, setSize] = useState(() => ({ w: window.innerWidth, h: window.innerHeight }));
  useEffect(() => {
    let raf = 0;
    const onResize = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => setSize({ w: window.innerWidth, h: window.innerHeight }));
    };
    window.addEventListener('resize', onResize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', onResize);
    };
  }, []);
  return size;
}

function chapterArrangement(s: NavState, frame: Frame): Arrangement | undefined {
  const b = s.base;
  return chapters[b.chapter]!.steps[b.step]!.layout?.(frame);
}

export function Stage() {
  const [state, setState] = useState<NavState>(() => fromHash(location.hash, chapterIds));
  const viewport = useViewport();
  const frame = useMemo(() => measureFrame(viewport.w, viewport.h), [viewport.w, viewport.h]);

  const stateRef = useRef(state);
  stateRef.current = state;
  /** 事件里提交新状态：同步更新 stateRef，连续事件按顺序基于最新状态推演 */
  const commit = useCallback((fn: (s: NavState) => NavState) => {
    const n = fn(stateRef.current);
    if (n === stateRef.current) return;
    stateRef.current = n;
    setState(n);
  }, []);
  const sceneRef = useRef<SceneHandle | null>(null);
  /** Scene 挂载（或卸载）时登记句柄 */
  const attachScene = useCallback((h: SceneHandle | null) => {
    sceneRef.current = h;
  }, []);
  const glowRef = useRef<HTMLDivElement>(null);

  // 首帧绘制之后才挂载 3D 部分，并开始生成缩略图
  const [canvasOn, setCanvasOn] = useState(false);
  const [compiled, setCompiled] = useState(false);
  const [thumbsWarm, setThumbsWarm] = useState(false);
  const [timedOut, setTimedOut] = useState(false);
  useEffect(() => {
    let alive = true;
    const raf = requestAnimationFrame(() =>
      setTimeout(() => {
        if (!alive) return;
        setCanvasOn(true);
        void warmThumbs().finally(() => alive && setThumbsWarm(true));
      }, 0),
    );
    const timeout = window.setTimeout(() => setTimedOut(true), LOAD_TIMEOUT_MS);
    return () => {
      alive = false;
      cancelAnimationFrame(raf);
      window.clearTimeout(timeout);
    };
  }, []);
  // 揭幕：着色器与缩略图都就绪，或超时兜底。一旦揭幕不再回到加载状态
  const [loaded, setLoaded] = useState(false);
  if (!loaded && (timedOut || (compiled && thumbsWarm))) setLoaded(true);
  const loadedRef = useRef(loaded);
  loadedRef.current = loaded;
  const [loaderGone, setLoaderGone] = useState(false);
  const onCompiled = useCallback(() => setCompiled(true), []);
  const onLoaderGone = useCallback(() => setLoaderGone(true), []);
  const loadProgress = (Number(compiled) + Number(thumbsWarm)) / 2;
  const wallDom = useMemo(createWallDom, []);
  const nebulaLabels = useMemo(createNebulaLabelDom, []);
  const rootRef = useRef<HTMLDivElement>(null);
  const [wallScene, setWallScene] = useState('全部');
  // 预览清单覆盖标题、来源后重新渲染名单与聚焦信息；缩略图就绪由 Scene 逐帧检查
  const [, bumpWorks] = useState(0);
  useEffect(() => subscribeWorks(() => bumpWorks((v) => v + 1)), []);
  /** 章节可调用的舞台能力，转发给 Scene */
  const api = useMemo<StageApi>(() => {
    return {
      nebulaIngest: (i) => sceneRef.current?.nebulaIngest(i) ?? Promise.resolve(),
    };
  }, []);
  const key = stateKey(state);
  const focusId = state.focus?.id ?? null;
  const chapter = chapters[state.base.chapter]!;
  const step = chapter.steps[state.base.step]!;
  // 作品墙是规模章节的最后一步：名单、悬停信息只在这一步且未聚焦时出现
  const onWall = step.wall === true;

  // 章节离场信号 leavingTo：叠加层卸载时读不到新状态，所以刚离开的章节先带着目的地再渲染一次（同一个实例，
  // key 不变），随后立即卸载。叠加层在卸载清理里读到的就是这一次的 leavingTo；目的地是作品墙这一步时为 'wall'。
  const cur = { chapter: state.base.chapter, step: state.base.step, focused: focusId !== null };
  const [track, setTrack] = useState(cur);
  const [leaving, setLeaving] = useState<{ chapter: number; step: number; focused: boolean; dest: string } | null>(null);
  if (track.chapter !== cur.chapter || track.step !== cur.step || track.focused !== cur.focused) {
    setTrack(cur);
    if (track.chapter !== cur.chapter) setLeaving({ ...track, dest: chapters[cur.chapter]!.steps[cur.step]!.wall ? 'wall' : chapters[cur.chapter]!.id });
  }
  useLayoutEffect(() => {
    if (leaving) setLeaving(null);
  }, [leaving]);

    // 自动播放：末章末步前进回规模第 1 步时关闭（见 forward）；作品墙这一步按默认时长停留后继续
  const [autoplay, setAutoplay] = useState(false);
  const autoplayRef = useRef(autoplay);
  autoplayRef.current = autoplay;
  /** 前进一步；从末章末步前进回到规模第 1 步时（全程结束）关闭自动播放 */
  const forward = useCallback(() => {
    const end = atEnd(stateRef.current, stepCounts);
    commit((s) => next(s, stepCounts));
    if (end) {
      autoplayRef.current = false;
      setAutoplay(false);
    }
  }, [commit]);
  /** 章节叠加层报告本步播完：记下是哪一步（当前基础状态键），换步或离开即作废 */
  const [settledFor, setSettledFor] = useState<string | null>(null);
  const baseKey = stateKey({ base: state.base, focus: null });
  const [trackedBase, setTrackedBase] = useState(baseKey);
  if (trackedBase !== baseKey) {
    setTrackedBase(baseKey);
    setSettledFor(null);
  }
  const handleSettled = useCallback((chapterIdx: number, stepIdx: number) => {
    const b = stateRef.current.base;
    // 过期信号（已换步或已离开本章）直接丢弃
    if (b.chapter !== chapterIdx || b.step !== stepIdx) return;
    setSettledFor(`c${chapterIdx}s${stepIdx}`);
  }, []);
  const toggleAutoplay = useCallback(() => {
    if (autoplayRef.current) {
      autoplayRef.current = false;
      setAutoplay(false);
      return;
    }
    autoplayRef.current = true;
    setAutoplay(true);
  }, []);
  // 从头播放：任意层、任意播放状态下都回到第 1 章第 1 步（同时清除聚焦）并开启自动播放
  const restartAutoplay = useCallback(() => {
    autoplayRef.current = true;
    setAutoplay(true);
    // 已在第 1 章第 1 步时也重新计时，不沿用本步已播完的信号
    setSettledFor(null);
    commit(() => chapterState(0));
  }, [commit]);
  const settledNow = settledFor === baseKey;
  // 每次状态变化（含重复点同一刻度）都重新计时；聚焦层暂停，退出后重新计时
  useEffect(() => {
    const b = state.base;
    if (!loaded || !autoplay || state.focus) return;
    const delay = autoplayDelay(chapters[b.chapter]!.steps[b.step]!, settledNow);
    const timer = window.setTimeout(() => {
      if (atEnd(stateRef.current, stepCounts)) forward();
      else commit((s) => autoplayAdvance(s, stepCounts));
    }, delay);
    return () => window.clearTimeout(timer);
  }, [loaded, autoplay, state, settledNow, forward, commit]);

  // URL hash 只记录章节
  useEffect(() => {
    const hash = toHash(state, chapterIds);
    if (hash !== location.hash) history.replaceState(null, '', hash || location.pathname + location.search);
  }, [state]);
  useEffect(() => {
    const onHash = () => {
      // 只响应认识的章节 hash，且只在章节变化时跳到该章首步
      const i = chapterOfHash(location.hash, chapterIds);
      if (i >= 0 && stateRef.current.base.chapter !== i) commit(() => fromHash(location.hash, chapterIds));
    };
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, [commit]);

  // 揭幕与打开详情后把键盘焦点放回舞台根节点，避免页面拿不到 keydown（快捷键仍挂在 window/document 捕获阶段）
  useEffect(() => {
    if (loaded) rootRef.current?.focus({ preventScroll: true });
  }, [loaded]);
  useEffect(() => {
    if (focusId) rootRef.current?.focus({ preventScroll: true });
  }, [focusId]);

  // 按键与滚轮
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      // 揭幕前屏蔽舞台快捷键与翻步
      if (!loadedRef.current) return;
      if (e.altKey || e.ctrlKey || e.metaKey) return;
      const k = e.key;
      if (k === 'p' || k === 'P') {
        e.preventDefault();
        if (!e.repeat) toggleAutoplay();
        return;
      }
      if (k === 'r' || k === 'R') {
        e.preventDefault();
        if (!e.repeat) restartAutoplay();
        return;
      }
      if (k === 'ArrowRight' || k === 'PageDown' || k === ' ') {
        e.preventDefault();
        forward();
        return;
      }
      let fn: ((s: NavState) => NavState) | undefined;
      if (k === 'ArrowLeft' || k === 'PageUp') fn = (s) => prev(s, stepCounts);
      else if (k === 'Escape') {
        if (e.repeat) {
          e.preventDefault();
          return;
        }
        fn = back;
      }
      else if (k === 'b' || k === 'B' || k === '.' || k === '0' || k === 'Home') fn = home;
      else if (/^[1-9]$/.test(k) && Number(k) <= chapters.length) fn = () => chapterState(Number(k) - 1);
      if (!fn) return;
      e.preventDefault();
      commit(fn);
    };
    let lockedUntil = 0;
    let lastFire = 0;
    const onWheel = (e: WheelEvent) => {
      if (!loadedRef.current) return;
      const d = Math.abs(e.deltaY) >= Math.abs(e.deltaX) ? e.deltaY : e.deltaX;
      if (Math.abs(d) < 8) return;
      const now = performance.now();
      // 惯性滚动会持续产生事件：只要事件不断就延长锁定，长时间连续滚动按间隔触发
      const continuing = now < lockedUntil;
      lockedUntil = now + WHEEL_LOCK_MS;
      if (continuing && now - lastFire < WHEEL_REPEAT_MS) return;
      lastFire = now;
      if (d > 0) forward();
      else commit((s) => prev(s, stepCounts));
    };
    let lastKey = -1;
    const onKeyOnce = (e: KeyboardEvent) => {
      if (e.timeStamp === lastKey) return;
      lastKey = e.timeStamp;
      onKey(e);
    };
    window.addEventListener('keydown', onKeyOnce, true);
    document.addEventListener('keydown', onKeyOnce, true);
    window.addEventListener('wheel', onWheel, { passive: true });
    return () => {
      window.removeEventListener('keydown', onKeyOnce, true);
      document.removeEventListener('keydown', onKeyOnce, true);
      window.removeEventListener('wheel', onWheel);
    };
  }, [toggleAutoplay, restartAutoplay, forward, commit]);

  const open = useCallback((id: string) => {
    const s = stateRef.current;
    if (s.focus?.id === id) return;
    if (s.focus) {
      commit(() => ({ ...s, focus: { ...s.focus!, id } }));
      return;
    }
    const wallStep = chapters[s.base.chapter]!.steps[s.base.step]!.wall === true;
    const list = wallStep ? wallWorkIds : (sceneRef.current?.order() ?? []);
    if (list.includes(id)) commit(() => ({ ...s, focus: { id, list } }));
  }, [commit]);
  /** 关闭详情：与 Esc 完全相同，走 nav.back 退回聚焦前的步骤 */
  const closeFocus = useCallback(() => commit(back), [commit]);

  // 导航左区：章节进度按当前章节的步数计（当前步序号从 1 起 / 总步数）；
  // 自动播放开关仍在，聚焦时计时暂停，用状态文字区分“自动播放中 / 聚焦暂停 / 已暂停”。
  const navStep = state.base.step;
  const navTotal = chapter.steps.length;
  const navPercent = Math.round(((navStep + 1) / navTotal) * 100);
  const autoplayFocusPaused = autoplay && focusId !== null;
  const overlay = useMemo(() => chapterArrangement(state, frame), [state, frame]);
  // 作品墙上聚焦的是展馆作品（archive-*），其余步骤是精选作品（w*）
  const focusWork = focusId ? workById.get(focusId) : undefined;
  // 树的步骤里，相邻的树会被画面左右边缘切开：这些步骤给 canvas 加向外渐隐的遮罩，边缘不留清晰的断枝
  const treeEdge = !focusId && step.nebula !== undefined;

  return (
    <StageApiContext.Provider value={api}>
    <div
      ref={rootRef}
      className={`stage${frame.compact ? ' stage--compact' : ''}`}
      tabIndex={-1}
      data-tree-edge={treeEdge ? '1' : '0'}
      data-chapter={chapter.id}
      data-step={state.base.step}
      data-wall={onWall ? '1' : '0'}
      data-loaded={loaded ? '1' : '0'}
      data-focus={focusWork ? '1' : '0'}
    >
      <div ref={glowRef} className="glow" aria-hidden="true" />
      {canvasOn && (
        <CanvasErrorBoundary>
          <Suspense fallback={null}>
            <StageCanvas
              sceneRef={attachScene}
              state={state}
              frame={frame}
              onSettled={ignoreSettle}
              onOpen={open}
              glow={glowRef}
              wall={wallDom}
              nebulaLabels={nebulaLabels}
              onCompiled={onCompiled}
              wallFilter={wallScene}
            />
          </Suspense>
        </CanvasErrorBoundary>
      )}
      <WallOverlay dom={wallDom} frame={frame} on={loaded && onWall && !focusId} onOpen={open} scene={wallScene} onScene={setWallScene} />
      <NebulaLabels dom={nebulaLabels} />
      {/* 章节叠加层、文案与标注都以揭幕为起点 */}
      <div className="chapter-overlay">
        {loaded && leaving && leaving.chapter !== cur.chapter && (
          <ChapterLayer key={chapters[leaving.chapter]!.id} chapter={chapters[leaving.chapter]!} step={leaving.step} focused={leaving.focused} frame={frame} leavingTo={leaving.dest} />
        )}
        {loaded && (
        <ChapterLayer
          key={chapters[cur.chapter]!.id}
          chapter={chapters[cur.chapter]!}
          step={cur.step}
          focused={cur.focused}
          frame={frame}
          leavingTo={null}
          onSettled={(st) => handleSettled(cur.chapter, st)}
        />
        )}
      </div>

      {/* 聚焦详情：挂载即开始加载与揭幕，不等旧舞台的补间完成 */}
      {focusWork && <FocusDetail key={focusWork.id} work={focusWork} active frame={frame} onClose={closeFocus} />}

      {/* 文案层 */}
      {loaded && <CopyStack id={step.copy && !focusId ? key : ''} copy={step.copy && !focusId ? step.copy : undefined} frame={frame} />}
      {loaded && step && !focusId && overlay && (
        <div key={`ov-${key}`} className="overlay">
          {overlay.labels?.map((l) => (
            <span key={l.text} className="cluster-label" style={{ left: l.x, top: l.y }}>
              {l.text}
            </span>
          ))}
          {step.markOn && frame.compact &&
            step.copy?.marks?.map((m, i) => {
              const p = overlay.placements.get(step.markOn!)!;
              return (
                <span key={m.text} className="mark" style={{ left: p.x + p.w * m.x, top: p.y + p.h * m.y, animationDelay: `${0.7 + i * 0.12}s` }}>
                  <i />
                  {m.text}
                </span>
              );
            })}
          {step.markOn && !frame.compact && step.copy?.marks && <FeatureAnnotations frame={frame} marks={step.copy.marks} workId={step.markOn} />}
        </div>
      )}

      <div className="stage-scrim" aria-hidden="true" />
      <nav className="stage-nav" aria-label="章节">
        {/* 站点标题：与章节栏共用 nav 的定位基准，落在章节项右侧、相对导航整体高度垂直居中；聚焦时让位 */}
        <h1 className={`stage-nav__site${focusId ? '' : ' is-on'}`} aria-hidden={!!focusId}>
          高阶视效研究
        </h1>
        {/* 左区固定不滚动：播放/暂停、当前章节、按步数计的章节进度；右侧章节轨独立横向滚动 */}
        <div className="stage-nav__now" data-play={autoplayFocusPaused ? 'focus' : autoplay ? 'on' : 'off'}>
          <button
            type="button"
            className="stage-nav__play"
            aria-pressed={autoplay}
            aria-label={autoplay ? '暂停自动播放' : '自动播放'}
            title={autoplay ? '暂停自动播放（P）' : '自动播放（P）'}
            onClick={toggleAutoplay}
          >
            <span className="stage-nav__play-icon" aria-hidden="true">
              {autoplay ? (
                <svg viewBox="0 0 12 12" width="12" height="12" fill="currentColor">
                  <rect x="2" y="1.5" width="2.5" height="9" rx="0.5" />
                  <rect x="7.5" y="1.5" width="2.5" height="9" rx="0.5" />
                </svg>
              ) : (
                <svg viewBox="0 0 12 12" width="12" height="12" fill="currentColor">
                  <path d="M3 1.5 10.5 6 3 10.5Z" />
                </svg>
              )}
            </span>
          </button>
          <button
            type="button"
            className="stage-nav__play stage-nav__play--restart"
            aria-label="从头播放（R）"
            title="从头播放（R）"
            onClick={restartAutoplay}
          >
            <span className="stage-nav__play-icon" aria-hidden="true">
              <svg
                viewBox="0 0 12 12"
                width="12"
                height="12"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.3"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M0.5 2V5H3.5" />
                <path d="M1.755 7.5A4.5 4.5 0 1 0 2.82 2.82L0.5 5" />
              </svg>
            </span>
          </button>
          <div className="stage-nav__now-body">
            <div className="stage-nav__now-head">
              <span className="stage-nav__now-chapter">
                <span className="stage-nav__num">{String(state.base.chapter + 1).padStart(2, '0')}</span>
                {chapter.title}
              </span>
              <span className="stage-nav__now-state">
                {autoplayFocusPaused ? '聚焦暂停' : autoplay ? '自动播放中' : '已暂停'}
              </span>
            </div>
            <div
              className="stage-nav__progress"
              role="progressbar"
              aria-label="章节进度"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={navPercent}
              aria-valuetext={`第 ${navStep + 1} / ${navTotal} 步`}
            >
              <span className="stage-nav__progress-label">章节进度</span>
              <span className="stage-nav__progress-bar" aria-hidden="true" style={{ '--fill': `${navPercent}%` } as CSSProperties} />
              <span className="stage-nav__progress-pct" aria-hidden="true">
                {navPercent}%
              </span>
            </div>
          </div>
        </div>
        <div className="stage-nav__track">
          {chapters.map((c, i) => {
            const b = state.base;
            const current = b.chapter === i;
            return (
              <div key={c.id} className={`stage-nav__group${current ? ' is-current' : ''}`}>
                <div className="stage-nav__ticks">
                  {c.steps.map((_, j) => {
                    const mark = i < b.chapter || (i === b.chapter && j < b.step) ? 'past' : i === b.chapter && j === b.step ? 'current' : 'ahead';
                    return (
                      <button
                        key={j}
                        type="button"
                        className={`stage-nav__tick is-${mark}`}
                        aria-label={c.steps.length > 1 ? `${c.title} 第 ${j + 1} 步` : c.title}
                        aria-current={mark === 'current' ? 'step' : undefined}
                        onClick={() => commit(() => chapterState(i, j))}
                      />
                    );
                  })}
                </div>
                <div className="stage-nav__label">
                  <button type="button" className="stage-nav__title" aria-current={current ? 'step' : undefined} onClick={() => commit(() => chapterState(i))}>
                    <span className="stage-nav__num">{String(i + 1).padStart(2, '0')}</span>
                    {c.title}
                  </button>
                  {current && c.steps.length > 1 && (
                    <span className="stage-nav__count" aria-hidden="true">
                      {b.step + 1}/{c.steps.length}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </nav>
      {!loaderGone && <StageLoader progress={loaded ? 1 : loadProgress} done={loaded} onGone={onLoaderGone} />}
    </div>
    </StageApiContext.Provider>
  );
}

/** 章节的 DOM 叠加层。同一章的实例在整个章节期间不变，离开前多渲染一次带 leavingTo。 */
function ChapterLayer({
  chapter,
  step,
  focused,
  frame,
  leavingTo,
  onSettled,
}: {
  chapter: Chapter;
  step: number;
  focused: boolean;
  frame: Frame;
  leavingTo: string | null;
  onSettled?: (step: number) => void;
}) {
  const Overlay = chapter.Overlay;
  return Overlay ? <Overlay step={step} frame={frame} focused={focused} leavingTo={leavingTo} onSettled={onSettled} /> : null;
}

/** 树的节点标签、入库外圈与悬停路径：固定数量的节点，位置与文字由 Scene 每帧写入。 */
function NebulaLabels({ dom }: { dom: ReturnType<typeof createNebulaLabelDom> }) {
  return (
    <>
      <div ref={(el) => void (dom.root = el)} className="nebula-labels" aria-hidden="true">
        {Array.from({ length: NEBULA_LABEL_COUNT }, (_, i) => (
          <span key={i} ref={(el) => void (dom.items[i] = el)} className="nebula-label" />
        ))}
        {Array.from({ length: NEBULA_RING_COUNT }, (_, i) => (
          <span key={`r${i}`} ref={(el) => void (dom.rings[i] = el)} className="nebula-ring" />
        ))}
      </div>
      <div ref={(el) => void (dom.path = el)} className="nebula-path" aria-hidden="true" />
    </>
  );
}

/**
 * 质量章节单件质量分段的 DOM 注释：左右旁注、细引线和底部规格行。几何全部来自 layout.ts 的 featureGeometry / featureNotes，
 * 与作品排布共用同一份矩形，引线末端的圆点落在作品上的真实相对位置。
 */
function FeatureAnnotations({ frame, marks, workId }: { frame: Frame; marks: Mark[]; workId: string }) {
  const g = featureGeometry(frame);
  const notes = featureNotes(frame, marks);
  const w = workById.get(workId);
  return (
    <>
      <svg className="feature-lines" width={frame.vw} height={frame.vh} viewBox={`0 0 ${frame.vw} ${frame.vh}`} aria-hidden="true">
        {/* 次结构线：标题块下沿与规格行上沿，跨满 12 列 */}
        <line className="feature-lines__minor" x1={g.title.x} x2={g.title.x + g.specs.w} y1={g.title.y + g.title.h} y2={g.title.y + g.title.h} />
        <line className="feature-lines__main" x1={g.specs.x} x2={g.specs.x + g.specs.w} y1={g.specs.y} y2={g.specs.y} />
        {notes.map((n, i) => (
          <g key={marks[i]!.text} className="feature-lines__leader" style={{ animationDelay: `${0.7 + i * 0.12}s` }}>
            <polyline className="feature-lines__out" points={`${n.elbow.x},${n.note.y} ${n.note.x},${n.note.y}`} />
            {/* 作品内的一段压在浅色页面上，用深色线才看得见 */}
            <polyline className="feature-lines__in" points={`${n.dot.x},${n.dot.y} ${n.elbow.x},${n.note.y}`} />
            <circle cx={n.dot.x} cy={n.dot.y} r={4} />
          </g>
        ))}
      </svg>
      {notes.map((n, i) => (
        <span
          key={marks[i]!.text}
          className={`feature-note feature-note--${n.side}`}
          style={{
            top: n.note.y,
            animationDelay: `${0.7 + i * 0.12}s`,
            ...(n.side === 'left' ? { right: frame.vw - n.note.x + 10 } : { left: n.note.x + 10 }),
          }}
        >
          {marks[i]!.text}
        </span>
      ))}
      <div className="feature-specs" style={rectStyle(g.specs)}>
        {w && (
          <>
            <span>编号 {w.id.toUpperCase()}</span>
            <span>{w.industry}</span>
            <span>{w.pageType}</span>
          </>
        )}
        <span className="feature-specs__sim">
          {w?.source === 'screenshot'
            ? '真实截图 · 作品清单'
            : w?.source === 'missing'
              ? '图片暂不可用 · 作品清单'
              : '图片加载中 · 作品清单'}
        </span>
      </div>
    </>
  );
}

const rectStyle = (r: { x: number; y: number; w: number; h: number }) => ({ left: r.x, top: r.y, width: r.w, height: r.h });

/** 一份文案的内容，不含定位。 */
function CopyBody({ copy }: { copy: Copy }) {
  return (
    <>
      {copy.kicker && <p className="chapter-copy__kicker">{copy.kicker}</p>}
      {copy.title && <h2 className="chapter-copy__title">{copy.title}</h2>}
      {copy.body && <p className="chapter-copy__body">{copy.body}</p>}
      {copy.stats && (
        <dl className="chapter-copy__stats">
          {copy.stats.map((s) => (
            <div key={s.label}>
              <dt>{s.value}</dt>
              <dd>{s.label}</dd>
            </div>
          ))}
        </dl>
      )}
    </>
  );
}

interface CopyLayer {
  id: string;
  copy: Copy;
}

/**
 * 章节文案换步交叉淡化：新旧文案叠在同一矩形里，由同一个进度 e（0→1，缓动 EASE.swap）驱动，
 * 新层不透明度 = e，旧层 = 1 − e，两层之和恒为 1，不会出现中间发暗或叠加过亮；
 * 不平移，位置取整像素，文字不跳。进度推进中再次换步时，从当前状态接力：被挤掉的更早一层直接丢弃。
 * id 为空串表示没有文案（作品墙这一步、聚焦等），此时当前层淡出。
 */
function CopyStack({ id, copy, frame }: { id: string; copy?: Copy; frame: Frame }) {
  const target = copy ? id : '';
  const [layers, setLayers] = useState<CopyLayer[]>(() => (copy ? [{ id, copy }] : []));
  // 目标变化时在渲染期同步新层（React 推荐的派生状态写法）；最多保留两层：被挤掉的更早一层此时已不可见
  const [tracked, setTracked] = useState(target);
  if (target !== tracked) {
    setTracked(target);
    // 目标 id 若还留在旧层里（刚离开又很快回来），复用这一层，不能再追加同 id 的第二层
    setLayers((ls) => (copy ? [...ls.filter((l) => l.id !== id).slice(-1), { id, copy }] : ls.slice(-1)));
  }

  const nodes = useRef(new Map<string, HTMLElement>());
  const tween = useRef<gsap.core.Tween | null>(null);
  const progress = useRef({ e: 1 });
  const targetRef = useRef(tracked);
  targetRef.current = tracked;
  const layersRef = useRef(layers);
  layersRef.current = layers;
  /** 换步瞬间旧层各自的不透明度 o0 */
  const oldFrom = useRef(new Map<string, number>());
  const started = useRef(false);

  // 新层 = e，旧层 = o0·(1 − e)；o0 ≤ 1，所以两层不透明度之和始终不超过 1，换步瞬间也不跳变
  const apply = (e: number) => {
    for (const l of layersRef.current) {
      const el = nodes.current.get(l.id);
      if (!el) continue;
      el.style.opacity = String(l.id === targetRef.current ? e : (oldFrom.current.get(l.id) ?? 1) * (1 - e));
    }
  };

  // 只在目标变化时启动一次过渡，父级重渲染不会打断
  useLayoutEffect(() => {
    tween.current?.kill();
    const p = progress.current;
    const finish = () => setLayers((ls) => ls.filter((l) => l.id === targetRef.current));
    const first = !started.current;
    started.current = true;
    if (first || prefersReducedMotion()) {
      oldFrom.current.clear();
      p.e = 1;
      apply(1);
      if (!first) finish();
      return;
    }
    oldFrom.current.clear();
    for (const l of layersRef.current) {
      if (l.id !== targetRef.current) oldFrom.current.set(l.id, Number(nodes.current.get(l.id)?.style.opacity || 1));
    }
    // 复用的旧层从当前不透明度接着淡入，不先跳到 0
    const from = Number(nodes.current.get(targetRef.current)?.style.opacity || 0);
    p.e = from;
    apply(from);
    // 有新文案：旧层先保持，等画面运动过半（COPY_DELAY）再与新层交叉淡化。
    // 没有新文案（进入作品墙这一步、进入聚焦）：旧层立刻快速淡出，不能带着延迟留在作品墙的名单上。
    const leavingOnly = targetRef.current === '';
    tween.current = gsap.to(p, {
      e: 1,
      duration: leavingOnly ? DUR.quick : DUR.fade,
      delay: leavingOnly ? 0 : COPY_DELAY,
      ease: leavingOnly ? EASE.in.gsap : EASE.swap.gsap,
      onUpdate: () => apply(p.e),
      onComplete: finish,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tracked]);

  useLayoutEffect(() => () => void tween.current?.kill(), []);

  return (
    <>
      {layers.map((l) => (
        <section
          key={l.id}
          ref={(el) => {
            if (el) nodes.current.set(l.id, el);
            else nodes.current.delete(l.id);
          }}
          className="chapter-copy"
          data-variant={l.copy.variant ?? 'default'}
          style={{ ...rectStyle(roundRect(copyRect(l.copy.variant ?? 'default', frame))), opacity: 0 }}
        >
          <CopyBody copy={l.copy} />
        </section>
      ))}
    </>
  );
}

const roundRect = (r: { x: number; y: number; w: number; h: number }) => ({ x: Math.round(r.x), y: Math.round(r.y), w: Math.round(r.w), h: Math.round(r.h) });

