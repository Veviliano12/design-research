import { useFrame, useThree } from '@react-three/fiber';
import { useEffect, useMemo, useRef } from 'react';
import * as THREE from 'three';
import { gsap, prefersReducedMotion } from '../../motion/gsap';
import { CAMERA_DRIFT, DUR, EASE, RATE } from '../../motion/tokens';
import { NAME_LINES, primaryScene } from '../data/catalog';
import type { LanguageId } from '../../data/languages';
import { WALL_BY_ID, type FocusTarget } from '../data/items';
import {
  CASE_CAMERA_DIST,
  CASE_RADIUS,
  LANG_CAMERA_DIST,
  LANG_RADIUS,
  PANEL_H,
  PANEL_W,
  clusterLayout,
  nearestTileIndex,
  nearestTileIndexBounded,
  viewTheta,
  yawForTheta,
  type LanguageWallLayout,
  type PanelPose,
  type TilePose,
  type WallLayout,
} from './layout';
import { createTileMaterial } from './tileMaterial';
import { WallShell } from './WallShell';
import {
  EMPTY_PLATE_TEX,
  MISSING_TEX,
  NEUTRAL_TEX,
  loadPlateTexture,
  loadTexture,
  updatePlateCount,
  warmTextures,
} from './textures';

export interface YawState {
  value: number;
  raw: number;
  dragging: boolean;
}

export function createYaw(value = 0): YawState {
  return { value, raw: value, dragging: false };
}

export interface BlendState {
  value: number;
}

interface SceneProps {
  languageLayout: LanguageWallLayout;
  caseLayout: WallLayout | null;
  blend: BlendState;
  yaw: YawState;
  langYaw: YawState;
  layer: 'languages' | 'cases';
  languageId: LanguageId | null;
  device: 'desktop' | 'phone';
  displayCounts: Record<string, number>;
  hoverLang: LanguageId | null;
  highlightLang: LanguageId | null;
  hoverId: string | null;
  caseId: string | null;
  frozen?: boolean;
  onHoverLang: (id: LanguageId | null) => void;
  onEnterLang: (id: LanguageId) => void;
  onHoverCase: (id: string | null) => void;
  onSelectCase: (id: string) => void;
  onOpenCase: (target: FocusTarget) => void;
  onSpy: (index: number) => void;
}

const liftDir = (theta: number) => new THREE.Vector3(-Math.sin(theta), 0, Math.cos(theta));

function qaFrozen(): boolean {
  return document.documentElement.dataset.qaFreeze === '1';
}

function CameraRig({
  blend,
  frozen,
  languageId,
  languageLayout,
}: {
  blend: BlendState;
  frozen?: boolean;
  languageId: LanguageId | null;
  languageLayout: LanguageWallLayout;
}) {
  const camera = useThree((s) => s.camera);
  const midY = 0;
  const panel = languageLayout.panels.find((item) => item.id === languageId);

  const apply = (b: number) => {
    const radius = THREE.MathUtils.lerp(LANG_RADIUS, CASE_RADIUS, b);
    const dist = THREE.MathUtils.lerp(LANG_CAMERA_DIST, CASE_CAMERA_DIST, b);
    const pull = panel && b > 0.001 && b < 0.999 ? Math.sin(Math.PI * b) * 0.42 : 0;
    const tx = panel ? Math.sin(panel.theta) * pull * 0.85 : 0;
    const tz = panel ? (1 - Math.cos(panel.theta)) * pull * 0.25 : 0;
    camera.position.set(tx * 0.35, midY, -(radius - dist));
    camera.lookAt(tx, midY, -radius + tz);
  };

  useEffect(() => {
    apply(blend.value);
  }, [camera]);

  useFrame(() => {
    apply(blend.value);
    if (frozen || qaFrozen() || prefersReducedMotion()) return;
    const t = (performance.now() / 1000 / CAMERA_DRIFT.period) * Math.PI * 2;
    const yaw = THREE.MathUtils.degToRad(CAMERA_DRIFT.yaw * 0.45) * Math.sin(t);
    const pitch = THREE.MathUtils.degToRad(CAMERA_DRIFT.pitch * 0.4) * Math.sin(t * 2);
    camera.rotateY(yaw);
    camera.rotateX(pitch);
  });

  return null;
}

function ClusterThumb({
  itemId,
  local,
  opacityRef,
  screensFade,
}: {
  itemId: string;
  local: { x: number; y: number; z: number; rotY: number; w: number; h: number };
  opacityRef: { current: number };
  screensFade: { value: number };
}) {
  const mat = useMemo(() => createTileMaterial(NEUTRAL_TEX), []);

  useEffect(() => {
    mat.uniforms.uSize!.value.set(local.w, local.h);
    mat.uniforms.uRadius!.value = 0.03;
    const item = WALL_BY_ID.get(itemId);
    const tag = item ? primaryScene(item) : null;
    if (item?.missingCapture || !item?.thumb) {
      mat.uniforms.uMap!.value = MISSING_TEX;
      void loadTexture(itemId, null, item?.title ?? '', '暂无现场截图', undefined, undefined, tag).then((tex) => {
        mat.uniforms.uMap!.value = tex;
      });
      return;
    }
    void loadTexture(itemId, item.thumb, item.title, null, undefined, undefined, tag).then((tex) => {
      mat.uniforms.uMap!.value = tex;
    });
  }, [itemId, local.h, local.w, mat]);

  useEffect(() => () => mat.dispose(), [mat]);

  useFrame(() => {
    mat.uniforms.uOpacity!.value = opacityRef.current * screensFade.value;
  });

  return (
    <mesh position={[local.x, local.y, local.z]} rotation={[0, local.rotY, 0]} scale={[local.w, local.h, 1]} material={mat}>
      <planeGeometry args={[1, 1]} />
    </mesh>
  );
}

function LanguagePanelMesh({
  pose,
  hover,
  current,
  blend,
  entering,
  displayCount,
  screensFade,
  langYaw,
  onHover,
  onEnter,
}: {
  pose: PanelPose;
  hover: boolean;
  current: boolean;
  blend: BlendState;
  entering: boolean;
  displayCount: number;
  screensFade: { value: number };
  langYaw: YawState;
  onHover: (id: LanguageId | null) => void;
  onEnter: (id: LanguageId) => void;
}) {
  const group = useRef<THREE.Group>(null);
  const mat = useMemo(() => createTileMaterial(EMPTY_PLATE_TEX), []);
  const lift = useRef(0);
  const dimRef = useRef(1);
  const opacityRef = useRef(1);
  const scaleRef = useRef(1);
  const clusters = useMemo(() => clusterLayout(pose.panel.representatives.length), [pose.panel.representatives.length]);

  useEffect(() => {
    mat.uniforms.uSize!.value.set(pose.w, pose.h);
    mat.uniforms.uRadius!.value = 0.04;
    mat.uniforms.uTitleProtect!.value = 1;
    void loadPlateTexture(pose.id, NAME_LINES[pose.id], displayCount).then((tex) => {
      mat.uniforms.uMap!.value = tex;
      updatePlateCount(tex, NAME_LINES[pose.id], displayCount);
    });
  }, [mat, pose]);

  useEffect(() => {
    const tex = mat.uniforms.uMap!.value as THREE.CanvasTexture | undefined;
    if (!tex || tex === EMPTY_PLATE_TEX) return;
    updatePlateCount(tex, NAME_LINES[pose.id], displayCount);
  }, [displayCount, mat, pose.id]);

  useEffect(() => () => mat.dispose(), [mat]);

  useFrame((_, dt) => {
    const g = group.current;
    if (!g) return;
    const b = blend.value;
    const otherFade = 1 - THREE.MathUtils.smoothstep(b, 0.16, 0.64);
    const selfFade = 1 - THREE.MathUtils.smoothstep(b, 0.55, 0.92);
    // Fade from the plate's left edge, not its center, so titles die before
    // they run under the catalog typography. Body lag slightly so a ghost of
    // the wall can still continue behind the list.
    const leftViewed = viewTheta(pose.theta, langYaw.value) - PANEL_W / 2 / LANG_RADIUS;
    const titleVis = THREE.MathUtils.smoothstep(leftViewed, -0.38, -0.30);
    const catalogHide = THREE.MathUtils.smoothstep(leftViewed, -0.44, -0.26);
    const targetOpacity = (entering ? selfFade : otherFade) * catalogHide;
    const targetScale = entering ? 1 + 0.16 * THREE.MathUtils.smoothstep(b, 0, 0.55) : 1 - 0.08 * THREE.MathUtils.smoothstep(b, 0, 0.4);
    const inwardBoost = entering ? 0.55 * THREE.MathUtils.smoothstep(b, 0, 0.6) : -0.35 * THREE.MathUtils.smoothstep(b, 0, 0.4);
    const ang = Math.abs(pose.theta - 0.09);
    const falloff = THREE.MathUtils.clamp(1 - Math.max(0, ang - 0.1) * 1.15, 0.52, 1);
    const underList = catalogHide < 0.88;
    const targetDim = underList
      ? Math.min(falloff, current ? 0.7 : hover ? 0.55 : 0.36)
      : current
        ? 1
        : hover
          ? 0.88
          : THREE.MathUtils.lerp(0.46, 0.76, (falloff - 0.52) / 0.48);
    const targetLift = current ? 0.09 : hover ? 0.045 : 0;
    dimRef.current = THREE.MathUtils.damp(dimRef.current, targetDim, RATE.focusFade, dt);
    lift.current = THREE.MathUtils.damp(lift.current, targetLift, RATE.hover, dt);
    // 进出层时透明度/缩放跟镜头同一条补间，不要再阻尼出一拍滞后叠影。
    if (b > 0.02 && b < 0.98) {
      opacityRef.current = targetOpacity;
      scaleRef.current = targetScale;
    } else {
      opacityRef.current = THREE.MathUtils.damp(opacityRef.current, targetOpacity, RATE.focusFade, dt);
      scaleRef.current = THREE.MathUtils.damp(scaleRef.current, targetScale, RATE.focusFade, dt);
    }
    mat.uniforms.uDim!.value = dimRef.current;
    mat.uniforms.uOpacity!.value = opacityRef.current;
    mat.uniforms.uTitleProtect!.value = titleVis;
    mat.uniforms.uOutline!.value = underList ? 0 : current ? 0.78 : 0;
    mat.uniforms.uMute!.value = current ? 0 : hover ? 0.04 : 0.18;
    const inward = liftDir(pose.theta);
    g.position.set(pose.x, pose.y, pose.z);
    g.position.addScaledVector(inward, lift.current + inwardBoost);
    g.scale.setScalar(scaleRef.current);
    g.visible = opacityRef.current > 0.02;
  });

  return (
    <group
      ref={group}
      position={[pose.x, pose.y, pose.z]}
      rotation={[0, pose.rotY, 0]}
      onPointerOver={(e) => {
        e.stopPropagation();
        if (blend.value > 0.5) return;
        onHover(pose.id);
        document.body.style.cursor = 'pointer';
      }}
      onPointerOut={(e) => {
        e.stopPropagation();
        onHover(null);
        document.body.style.cursor = '';
      }}
      onClick={(e) => {
        e.stopPropagation();
        if (langYaw.dragging || blend.value > 0.2) return;
        onEnter(pose.id);
      }}
    >
      <mesh scale={[pose.w, pose.h, 1]} material={mat} userData={{ languageId: pose.id }}>
        <planeGeometry args={[1, 1]} />
      </mesh>
      {pose.panel.representatives.map((item, i) => {
        const local = clusters[i];
        if (!local) return null;
        return (
          <ClusterThumb
            key={item.id}
            itemId={item.id}
            local={local}
            opacityRef={opacityRef}
            screensFade={screensFade}
          />
        );
      })}
    </group>
  );
}

function CaseTile({
  pose,
  origin,
  blend,
  index,
  total,
  yaw,
  hover,
  current,
  screensFade,
  onHover,
  onSelect,
  onOpen,
}: {
  pose: TilePose;
  origin: THREE.Vector3;
  blend: BlendState;
  index: number;
  total: number;
  yaw: YawState;
  hover: boolean;
  current: boolean;
  screensFade: { value: number };
  onHover: (id: string | null) => void;
  onSelect: (id: string) => void;
  onOpen: () => void;
}) {
  const mesh = useRef<THREE.Mesh>(null);
  const lift = useRef(0);
  const dimRef = useRef(1);
  const mat = useMemo(() => createTileMaterial(NEUTRAL_TEX), []);
  const delay = total <= 1 ? 0 : (index / Math.max(1, total - 1)) * 0.22;

  useEffect(() => {
    mat.uniforms.uSize!.value.set(pose.w, pose.h);
    mat.uniforms.uRadius!.value = 0.045;
    const item = pose.item;
    const tag = primaryScene(item);
    if (item.missingCapture || !item.thumb) {
      mat.uniforms.uMap!.value = MISSING_TEX;
      void loadTexture(pose.id, null, item.title, '暂无现场截图', undefined, undefined, tag).then((tex) => {
        mat.uniforms.uMap!.value = tex;
      });
      return;
    }
    void loadTexture(pose.id, item.thumb, item.title, null, undefined, undefined, tag).then((tex) => {
      mat.uniforms.uMap!.value = tex;
    });
  }, [mat, pose]);

  useEffect(() => () => mat.dispose(), [mat]);

  useFrame((_, dt) => {
    const m = mesh.current;
    if (!m) return;
    const appear = 0.06;
    const localT = THREE.MathUtils.clamp((blend.value - appear - delay) / 0.7, 0, 1);
    const t = localT * localT * (3 - 2 * localT);
    const reveal = THREE.MathUtils.smoothstep(t, 0.06, 0.28);
    const x = THREE.MathUtils.lerp(origin.x, pose.x, t);
    const y = THREE.MathUtils.lerp(origin.y, pose.y, t);
    const z = THREE.MathUtils.lerp(origin.z, pose.z, t);
    const viewed = viewTheta(pose.theta, yaw.value);
    const ang = Math.abs(viewed);
    const falloff = viewed < 0
      ? THREE.MathUtils.clamp(1 - Math.max(0, ang - 0.1) * 1.1, 0.42, 1)
      : THREE.MathUtils.clamp(1 - Math.max(0, ang - 0.28) * 1.35, 0.2, 1);
    const targetDim = current ? 1 : hover ? 0.9 : falloff * 0.88;
    const targetLift = current ? 0.055 : hover ? 0.03 : 0;
    dimRef.current = THREE.MathUtils.damp(dimRef.current, targetDim, RATE.focusFade, dt);
    lift.current = THREE.MathUtils.damp(lift.current, targetLift, RATE.hover, dt);
    // 视向角：墙在目录后柔和消隐（透明度到 0，不留黑框），右侧同样收干净。
    const leftFade = THREE.MathUtils.smoothstep(viewed, -0.46, -0.14);
    const rightFade = 1 - THREE.MathUtils.smoothstep(viewed, 0.48, 0.86);
    const fade = reveal * screensFade.value * leftFade * rightFade;
    mat.uniforms.uOpacity!.value = fade;
    mat.uniforms.uDim!.value = dimRef.current;
    mat.uniforms.uMute!.value = current ? 0 : hover ? 0.04 : 0.12;
    mat.uniforms.uOutline!.value = current ? 0.75 : 0;
    const inward = liftDir(pose.theta);
    m.position.set(x, y, z);
    m.position.addScaledVector(inward, lift.current);
    m.rotation.y = pose.rotY;
    m.visible = fade > 0.02;
  });

  return (
    <mesh
      ref={mesh}
      name={pose.id}
      position={[pose.x, pose.y, pose.z]}
      rotation={[0, pose.rotY, 0]}
      scale={[pose.w, pose.h, 1]}
      material={mat}
      userData={{ caseId: pose.id }}
      onPointerOver={(e) => {
        e.stopPropagation();
        if (blend.value < 0.55) return;
        onHover(pose.id);
        document.body.style.cursor = 'pointer';
      }}
      onPointerOut={(e) => {
        e.stopPropagation();
        onHover(null);
        document.body.style.cursor = '';
      }}
      onClick={(e) => {
        e.stopPropagation();
        if (yaw.dragging || blend.value < 0.7) return;
        onSelect(pose.id);
        onOpen();
      }}
    >
      <planeGeometry args={[1, 1]} />
    </mesh>
  );
}

export function LibraryScene({
  languageLayout,
  caseLayout,
  blend,
  yaw,
  langYaw,
  layer,
  languageId,
  device,
  displayCounts,
  hoverLang,
  highlightLang,
  hoverId,
  caseId,
  frozen,
  onHoverLang,
  onEnterLang,
  onHoverCase,
  onSelectCase,
  onOpenCase,
  onSpy,
}: SceneProps) {
  const caseGroup = useRef<THREE.Group>(null);
  const langGroup = useRef<THREE.Group>(null);
  const lastSpy = useRef<number | null>(null);
  const screensFade = useRef({ value: device === 'phone' ? 0 : 1 });

  useEffect(() => {
    const clusterJobs = languageLayout.panels.flatMap((pose) =>
      pose.panel.representatives.map((item) => ({
        key: item.id,
        src: item.missingCapture ? null : (item.thumb ?? null),
        title: item.title,
        label: item.missingCapture || !item.thumb ? '暂无现场截图' : null,
        tag: primaryScene(item),
      })),
    );
    void Promise.all([
      ...languageLayout.panels.map((pose) => loadPlateTexture(pose.id, NAME_LINES[pose.id], pose.panel.count)),
      warmTextures(clusterJobs),
    ]);
  }, [languageLayout]);

  useEffect(() => {
    if (!caseLayout) return;
    const jobs = caseLayout.tiles.map((pose) => ({
      key: pose.id,
      src: pose.item.missingCapture ? null : (pose.item.thumb ?? null),
      title: pose.item.title,
      label: pose.item.missingCapture || !pose.item.thumb ? '暂无现场截图' : null,
      tag: primaryScene(pose.item),
    }));
    void warmTextures(jobs);
  }, [caseLayout]);

  useFrame((_, dt) => {
    const cases = caseGroup.current;
    if (cases) cases.rotation.y = yaw.value;
    const langs = langGroup.current;
    if (langs) langs.rotation.y = langYaw.value;
    screensFade.current.value = THREE.MathUtils.damp(
      screensFade.current.value,
      device === 'phone' ? 0 : 1,
      6,
      dt,
    );
    if (yaw.dragging && caseLayout && blend.value > 0.6) {
      const idx = nearestTileIndexBounded(yaw.value, caseLayout);
      if (lastSpy.current !== idx) {
        lastSpy.current = idx;
        onSpy(idx);
      }
    }
  });

  const origin = useMemo(() => {
    const panel = languageLayout.panels.find((p) => p.id === languageId) ?? languageLayout.panels[0];
    return panel ? new THREE.Vector3(panel.x, panel.y, panel.z) : new THREE.Vector3(0, 0, -LANG_RADIUS);
  }, [languageId, languageLayout]);

  void layer;
  void PANEL_W;
  void PANEL_H;

  return (
    <>
      <CameraRig blend={blend} frozen={frozen} languageId={languageId} languageLayout={languageLayout} />
      <WallShell blend={blend} langYaw={langYaw} caseYaw={yaw} />
      <group ref={langGroup}>
        {languageLayout.panels.map((pose) => (
          <LanguagePanelMesh
            key={pose.id}
            pose={pose}
            hover={hoverLang === pose.id}
            current={highlightLang === pose.id}
            blend={blend}
            entering={languageId === pose.id}
            displayCount={displayCounts[pose.id] ?? pose.panel.count}
            screensFade={screensFade.current}
            langYaw={langYaw}
            onHover={onHoverLang}
            onEnter={onEnterLang}
          />
        ))}
      </group>
      {caseLayout && (
        <group ref={caseGroup}>
          {caseLayout.tiles.map((pose) => (
            <CaseTile
              key={pose.id}
              pose={pose}
              origin={origin}
              blend={blend}
              index={pose.index}
              total={caseLayout.tiles.length}
              yaw={yaw}
              hover={hoverId === pose.id}
              current={caseId === pose.id}
              screensFade={screensFade.current}
              onHover={onHoverCase}
              onSelect={onSelectCase}
              onOpen={() => onOpenCase({ kind: 'benchmark', id: pose.id })}
            />
          ))}
        </group>
      )}
    </>
  );
}

export function tweenBlend(blend: BlendState, target: number, onComplete?: () => void) {
  gsap.killTweensOf(blend);
  if (prefersReducedMotion()) {
    gsap.to(blend, { value: target, duration: DUR.fade, ease: EASE.swap.gsap, onComplete });
    return;
  }
  gsap.to(blend, { value: target, duration: DUR.zoom, ease: EASE.move.gsap, onComplete });
}

export function tweenYaw(
  yaw: YawState,
  target: number,
  opts?: { duration?: number; ease?: string; onComplete?: () => void },
) {
  gsap.killTweensOf(yaw);
  if (prefersReducedMotion()) {
    yaw.value = target;
    yaw.raw = target;
    opts?.onComplete?.();
    return;
  }
  gsap.to(yaw, {
    value: target,
    raw: target,
    duration: opts?.duration ?? DUR.move,
    ease: opts?.ease ?? EASE.move.gsap,
    onComplete: opts?.onComplete,
  });
}

export { yawForTheta, nearestTileIndex };
