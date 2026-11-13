import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { gsap, prefersReducedMotion } from '../motion/gsap';
import { applyMotionTokens, DUR, EASE } from '../motion/tokens';
import { STATS } from '../data/stats';
import type { LanguageId } from '../data/languages';
import { Catalog } from './Catalog';
import { Chrome, type DeviceKind } from './Chrome';
import { Detail } from './Detail';
import { ALL_SCENES, LANGUAGE_PANELS, PANEL_BY_ID, filterByScene } from './data/catalog';
import { type FocusTarget } from './data/items';
import { useWallCounts } from './hooks';
import { LibraryCanvas } from './scene/LibraryCanvas';
import {
  applyRubber,
  buildCaseWallLayout,
  buildLanguageWallLayout,
  caseYawExtents,
  clampYaw,
  LANG_YAW_RUBBER,
  languageYawExtents,
  nearestTileIndexBounded,
  yawForTheta,
  type WallLayout,
} from './scene/layout';
import { createYaw, tweenBlend, tweenYaw, type BlendState } from './scene/LibraryScene';
import './library.css';

applyMotionTokens();

function statusText(layer: 'languages' | 'cases', languageId: LanguageId | null, playing: boolean): string {
  if (layer === 'languages') return playing ? '视效库 · 九种语言 · 浏览中' : '视效库 · 九种语言';
  const name = languageId ? PANEL_BY_ID.get(languageId)?.name : '';
  return playing ? `视效库 · ${name} · 浏览中` : `视效库 · ${name}`;
}

const COUNT_TARGETS = Object.fromEntries([
  ['total', STATS.benchmarkCount],
  ...LANGUAGE_PANELS.map((panel) => [panel.id, panel.count]),
]) as Record<string, number>;

export function LibraryApp() {
  const languageLayout = useMemo(() => buildLanguageWallLayout(), []);
  const caseYaw = useRef(createYaw(0)).current;
  const langYaw = useRef(createYaw(0)).current;
  const blend = useRef<BlendState>({ value: 0 }).current;

  const [layer, setLayer] = useState<'languages' | 'cases'>('languages');
  const [catalogLayer, setCatalogLayer] = useState<'languages' | 'cases'>('languages');
  const [languageId, setLanguageId] = useState<LanguageId | null>(null);
  const [highlightLang, setHighlightLang] = useState<LanguageId>(LANGUAGE_PANELS[2]!.id);
  const [hoverLang, setHoverLang] = useState<LanguageId | null>(null);
  const [caseId, setCaseId] = useState<string | null>(null);
  const caseRef = useRef(caseId);
  caseRef.current = caseId;
  const [hoverId, setHoverId] = useState<string | null>(null);
  const [scene, setScene] = useState<string>(ALL_SCENES);
  const [focus, setFocus] = useState<FocusTarget | null>(null);
  const [device, setDevice] = useState<DeviceKind>('desktop');
  const [playing, setPlaying] = useState(false);
  const [ready, setReady] = useState(false);
  const [blendFlag, setBlendFlag] = useState(0);
  const [countToken, setCountToken] = useState(0);
  const playTimer = useRef<number | null>(null);
  const playDir = useRef(1);
  const layerRef = useRef(layer);
  layerRef.current = layer;
  const languageRef = useRef(languageId);
  languageRef.current = languageId;
  const catalogTimer = useRef<number | null>(null);

  const displayCounts = useWallCounts(COUNT_TARGETS, countToken, catalogLayer === 'languages');

  const visibleItems = useMemo(() => {
    if (!languageId) return [];
    const items = PANEL_BY_ID.get(languageId)?.items ?? [];
    return filterByScene(items, scene);
  }, [languageId, scene]);

  const caseLayout: WallLayout | null = useMemo(() => {
    if (!languageId) return null;
    return buildCaseWallLayout(visibleItems);
  }, [languageId, visibleItems]);

  const CATALOG_IN = 0.68;
  const CATALOG_OUT = 0.32;

  const showCatalog = (next: 'languages' | 'cases') => {
    if (catalogTimer.current) {
      window.clearTimeout(catalogTimer.current);
      window.cancelAnimationFrame(catalogTimer.current);
      catalogTimer.current = null;
    }
    if (prefersReducedMotion()) {
      setCatalogLayer(next);
      return;
    }
    const tick = () => {
      const ready = next === 'cases' ? blend.value >= CATALOG_IN : blend.value <= CATALOG_OUT;
      if (ready) {
        setCatalogLayer(next);
        catalogTimer.current = null;
        return;
      }
      catalogTimer.current = window.requestAnimationFrame(tick);
    };
    catalogTimer.current = window.requestAnimationFrame(tick);
  };

  useEffect(() => {
    const t = window.setTimeout(() => setReady(true), 900);
    return () => window.clearTimeout(t);
  }, []);

  const enterLanguage = useCallback(
    (id: LanguageId) => {
      const items = PANEL_BY_ID.get(id)?.items ?? [];
      setPlaying(false);
      setFocus(null);
      setLanguageId(id);
      setHighlightLang(id);
      setScene(ALL_SCENES);
      setCaseId(items[0]?.id ?? null);
      setHoverId(null);
      setLayer('cases');
      showCatalog('cases');
      const opened = buildCaseWallLayout(items);
      const mid =
        opened.tiles.find((tile) => tile.col === Math.floor((opened.cols - 1) / 2) && tile.row === 0) ??
        opened.tiles[0];
      const dest = yawForTheta(mid?.theta ?? 0);
      if (mid) setCaseId(mid.id);
      setBlendFlag(0);
      tweenYaw(caseYaw, dest, { duration: prefersReducedMotion() ? DUR.fade : DUR.zoom, ease: EASE.move.gsap });
      tweenBlend(blend, 1, () => setBlendFlag(1));
    },
    [blend, caseYaw],
  );

  const backToLanguages = useCallback(() => {
    setPlaying(false);
    setFocus(null);
    setHoverId(null);
    setCaseId(null);
    setScene(ALL_SCENES);
    setLayer('languages');
    showCatalog('languages');
    if (languageId) setHighlightLang(languageId);
    setBlendFlag(1);
    setCountToken((n) => n + 1);
    tweenBlend(blend, 0, () => {
      caseYaw.value = 0;
      caseYaw.raw = 0;
      setLanguageId(null);
      setBlendFlag(0);
    });
  }, [blend, caseYaw, languageId]);

  const selectCase = useCallback(
    (id: string, tween = true) => {
      const layout = caseLayout;
      if (!layout) return;
      const pose = layout.tiles.find((tile) => tile.id === id);
      if (!pose) return;
      setCaseId(id);
      if (tween) tweenYaw(caseYaw, yawForTheta(pose.theta));
      else {
        caseYaw.value = yawForTheta(pose.theta);
        caseYaw.raw = caseYaw.value;
      }
    },
    [caseLayout, caseYaw],
  );

  const stepCase = useCallback(
    (dir: number) => {
      if (!caseLayout || caseLayout.tiles.length === 0) return;
      const i = Math.max(0, caseLayout.tiles.findIndex((tile) => tile.id === caseId));
      const nextI = i + dir;
      if (nextI < 0 || nextI >= caseLayout.tiles.length) return;
      const next = caseLayout.tiles[nextI]!;
      setPlaying(false);
      selectCase(next.id);
      if (focus?.kind === 'benchmark') setFocus({ kind: 'benchmark', id: next.id });
    },
    [caseId, caseLayout, focus, selectCase],
  );

  const stepLanguage = useCallback(
    (dir: number) => {
      const i = LANGUAGE_PANELS.findIndex((panel) => panel.id === (hoverLang ?? highlightLang));
      const nextI = i + dir;
      if (nextI < 0 || nextI >= LANGUAGE_PANELS.length) return;
      const next = LANGUAGE_PANELS[nextI]!;
      setHighlightLang(next.id);
      setHoverLang(null);
    },
    [highlightLang, hoverLang],
  );

  const replay = useCallback(() => {
    setPlaying(false);
    setFocus(null);
    setDevice('desktop');
    setScene(ALL_SCENES);
    setHoverId(null);
    setCaseId(null);
    setLayer('languages');
    showCatalog('languages');
    setHighlightLang(LANGUAGE_PANELS[2]!.id);
    setBlendFlag(1);
    setCountToken((n) => n + 1);
    tweenYaw(langYaw, 0, { duration: DUR.fade, ease: EASE.move.gsap });
    tweenBlend(blend, 0, () => {
      caseYaw.value = 0;
      caseYaw.raw = 0;
      setLanguageId(null);
      setBlendFlag(0);
    });
  }, [blend, caseYaw, langYaw]);

  useEffect(() => {
    if (!playing) {
      if (playTimer.current) window.clearInterval(playTimer.current);
      playTimer.current = null;
      return;
    }
    if (prefersReducedMotion()) {
      setPlaying(false);
      return;
    }
    playTimer.current = window.setInterval(() => {
      if (layerRef.current === 'languages') {
        const i = LANGUAGE_PANELS.findIndex((panel) => panel.id === highlightLang);
        const nextI = i + playDir.current;
        if (nextI < 0 || nextI >= LANGUAGE_PANELS.length) {
          playDir.current *= -1;
        }
        const idx = Math.min(
          LANGUAGE_PANELS.length - 1,
          Math.max(0, i + playDir.current),
        );
        setHighlightLang(LANGUAGE_PANELS[idx]!.id);
        return;
      }
      const layoutItems = PANEL_BY_ID.get(languageRef.current ?? 'liquid-glass')?.items ?? [];
      const visible = filterByScene(layoutItems, scene);
      if (visible.length === 0) return;
      const i = Math.max(0, visible.findIndex((item) => item.id === caseRef.current));
      const rows = visible.length <= 2 ? 1 : visible.length <= 5 ? 2 : 3;
      let nextI = i + rows * playDir.current;
      if (nextI >= visible.length || nextI < 0) {
        playDir.current *= -1;
        nextI = i + rows * playDir.current;
      }
      nextI = Math.min(visible.length - 1, Math.max(0, nextI));
      const next = visible[nextI]!;
      selectCase(next.id);
    }, 2800);
    return () => {
      if (playTimer.current) window.clearInterval(playTimer.current);
    };
  }, [playing, highlightLang, scene, selectCase]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.altKey || event.ctrlKey || event.metaKey) return;
      if (focus) {
        if (event.key === 'Escape') {
          event.preventDefault();
          setFocus(null);
          return;
        }
        if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
          event.preventDefault();
          stepCase(-1);
        } else if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
          event.preventDefault();
          stepCase(1);
        }
        return;
      }
      if (event.key === 'Escape') {
        event.preventDefault();
        if (layer === 'cases') backToLanguages();
        return;
      }
      if (layer === 'languages') {
        if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
          event.preventDefault();
          setPlaying(false);
          stepLanguage(-1);
        } else if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
          event.preventDefault();
          setPlaying(false);
          stepLanguage(1);
        } else if (event.key === 'Enter') {
          event.preventDefault();
          enterLanguage(highlightLang);
        }
      } else {
        if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
          event.preventDefault();
          setPlaying(false);
          stepCase(-1);
        } else if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
          event.preventDefault();
          setPlaying(false);
          stepCase(1);
        } else if (event.key === 'Enter' && caseId) {
          event.preventDefault();
          setFocus({ kind: 'benchmark', id: caseId });
        }
      }
      if (event.key === ' ' || event.key === 'p' || event.key === 'P') {
        event.preventDefault();
        setPlaying((v) => !v);
      } else if (event.key === 'r' || event.key === 'R') {
        event.preventDefault();
        replay();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [focus, layer, highlightLang, caseId, stepCase, stepLanguage, enterLanguage, backToLanguages, replay]);

  const onDrag = (dx: number) => {
    setPlaying(false);
    if (layer === 'languages') {
      gsap.killTweensOf(langYaw);
      const extents = languageYawExtents(languageLayout);
      const gain = 1 / 900;
      langYaw.raw += -dx * gain;
      langYaw.value = applyRubber(langYaw.raw, extents.min, extents.max, LANG_YAW_RUBBER);
      return;
    }
    if (!caseLayout) return;
    gsap.killTweensOf(caseYaw);
    const extents = caseYawExtents(caseLayout);
    const gain = 1 / 640;
    caseYaw.raw += -dx * gain;
    caseYaw.value = applyRubber(caseYaw.raw, extents.min, extents.max);
  };

  const onDragEnd = () => {
    if (layer === 'languages') {
      const extents = languageYawExtents(languageLayout);
      const dest = clampYaw(langYaw.raw, extents.min, extents.max);
      tweenYaw(langYaw, dest, { duration: DUR.slow, ease: EASE.out.gsap });
      return;
    }
    if (!caseLayout || caseLayout.tiles.length === 0) return;
    const extents = caseYawExtents(caseLayout);
    const visual = clampYaw(caseYaw.value, extents.min, extents.max);
    const index = nearestTileIndexBounded(visual, caseLayout);
    const item = caseLayout.tiles[index];
    if (item) selectCase(item.id, !prefersReducedMotion());
    else tweenYaw(caseYaw, visual, { duration: DUR.slow, ease: EASE.out.gsap });
  };

  const onSpy = (index: number) => {
    const item = caseLayout?.tiles[index];
    if (item && item.id !== caseId) setCaseId(item.id);
  };

  const onScene = (next: string) => {
    setScene(next);
    setPlaying(false);
    const items = languageId ? filterByScene(PANEL_BY_ID.get(languageId)?.items ?? [], next) : [];
    const keep = items.find((item) => item.id === caseId) ?? items[0];
    setCaseId(keep?.id ?? null);
    const opened = buildCaseWallLayout(items);
    const pose = keep ? opened.tiles.find((tile) => tile.id === keep.id) : undefined;
    const dest = pose ? yawForTheta(pose.theta) : 0;
    caseYaw.value = dest;
    caseYaw.raw = dest;
  };

  useEffect(() => {
    const api = {
      getYaw: () => (layerRef.current === 'languages' ? langYaw.value : caseYaw.value),
      getRaw: () => (layerRef.current === 'languages' ? langYaw.raw : caseYaw.raw),
      getExtents: () => {
        if (layerRef.current === 'languages') return { layer: 'languages', ...languageYawExtents(languageLayout) };
        if (!caseLayout) return { layer: 'cases', min: 0, max: 0 };
        return { layer: 'cases', ...caseYawExtents(caseLayout) };
      },
      setYaw: (value: number) => {
        const yaw = layerRef.current === 'languages' ? langYaw : caseYaw;
        const extents =
          layerRef.current === 'languages'
            ? languageYawExtents(languageLayout)
            : caseLayout
              ? caseYawExtents(caseLayout)
              : { min: 0, max: 0 };
        const dest = clampYaw(value, extents.min, extents.max);
        gsap.killTweensOf(yaw);
        yaw.value = dest;
        yaw.raw = dest;
      },
      panToEdge: (side: 'min' | 'max') => {
        const extents =
          layerRef.current === 'languages'
            ? languageYawExtents(languageLayout)
            : caseLayout
              ? caseYawExtents(caseLayout)
              : { min: 0, max: 0 };
        const yaw = layerRef.current === 'languages' ? langYaw : caseYaw;
        const dest = side === 'min' ? extents.min : extents.max;
        gsap.killTweensOf(yaw);
        yaw.value = dest;
        yaw.raw = dest;
        return dest;
      },
      getBlend: () => blend.value,
      setBlend: (value: number) => {
        gsap.killTweensOf(blend);
        blend.value = value;
      },
    };
    (window as Window & { __VFX_LIB_QA__?: typeof api }).__VFX_LIB_QA__ = api;
    return () => {
      delete (window as Window & { __VFX_LIB_QA__?: typeof api }).__VFX_LIB_QA__;
    };
  }, [blend, caseLayout, caseYaw, langYaw, languageLayout]);

  return (
    <div
      className={focus ? 'lib is-focus' : 'lib'}
      data-qa="library"
      data-qa-phase="library"
      data-qa-layer={layer}
      data-qa-language={languageId ?? ''}
      data-qa-active-case={caseId ?? ''}
      data-qa-scene={scene}
      data-qa-blend={String(blendFlag)}
      data-qa-ready={ready ? '1' : '0'}
      data-qa-device={device}
      data-qa-hover-lang={hoverLang ?? ''}
      data-qa-hover-id={hoverId ?? ''}
      data-qa-focus={focus?.id ?? ''}
    >
      <div className="lib-stage">
        <LibraryCanvas
          languageLayout={languageLayout}
          caseLayout={caseLayout}
          blend={blend}
          yaw={caseYaw}
          langYaw={langYaw}
          layer={layer}
          languageId={languageId}
          device={device}
          displayCounts={displayCounts}
          hoverLang={hoverLang}
          highlightLang={highlightLang}
          hoverId={hoverId}
          caseId={caseId}
          onHoverLang={setHoverLang}
          onEnterLang={enterLanguage}
          onHoverCase={setHoverId}
          onSelectCase={(id) => {
            setPlaying(false);
            selectCase(id);
          }}
          onOpenCase={(target) => {
            setFocus(target);
            if (target.kind === 'benchmark') selectCase(target.id, false);
          }}
          onSpy={onSpy}
          onDrag={onDrag}
          onDragEnd={onDragEnd}
        />
        <div className="lib-vignette" />
        <Catalog
          key={catalogLayer}
          layer={catalogLayer}
          languageId={languageId}
          highlightLang={highlightLang}
          hoverLang={hoverLang}
          caseId={caseId}
          hoverId={hoverId}
          scene={scene}
          displayCounts={displayCounts}
          onEnterLang={enterLanguage}
          onHoverLang={setHoverLang}
          onBack={backToLanguages}
          onSelectCase={(id) => {
            setPlaying(false);
            selectCase(id);
            setFocus({ kind: 'benchmark', id });
          }}
          onHoverCase={setHoverId}
          onScene={onScene}
        />
        {device === 'phone' && (
          <p className="lib-phone-caption" data-qa="phone-empty">
            目前只有桌面现场
          </p>
        )}
        <div className="lib-chrome">
          <Chrome
            playing={playing}
            status={statusText(catalogLayer, languageId, playing)}
            device={device}
            onPlay={() => setPlaying((v) => !v)}
            onReplay={replay}
            onDevice={setDevice}
          />
        </div>
        {focus && <Detail target={focus} onClose={() => setFocus(null)} />}
      </div>
    </div>
  );
}
