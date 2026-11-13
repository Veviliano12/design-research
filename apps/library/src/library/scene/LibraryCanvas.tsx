import { Canvas } from '@react-three/fiber';
import { Component, type ErrorInfo, type ReactNode, useEffect, useRef, useState } from 'react';
import type { LanguageId } from '../../data/languages';
import type { FocusTarget } from '../data/items';
import { FallbackWall } from '../FallbackWall';
import { FOV, type LanguageWallLayout, type WallLayout } from './layout';
import { LibraryScene, type BlendState, type YawState } from './LibraryScene';

interface Props {
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
  onDrag: (delta: number) => void;
  onDragEnd: () => void;
}

class CanvasErrorBoundary extends Component<{ fallback: ReactNode; children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  componentDidCatch(error: Error, info: ErrorInfo) {
    console.warn('WebGL 展墙无法启动', error, info.componentStack);
  }
  render() {
    return this.state.failed ? this.props.fallback : this.props.children;
  }
}

export function LibraryCanvas(props: Props) {
  const [lost, setLost] = useState(false);
  const wrap = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);
  const lastX = useRef(0);
  const moved = useRef(0);
  const layerRef = useRef(props.layer);
  layerRef.current = props.layer;

  useEffect(() => {
    const el = wrap.current;
    if (!el) return;
    const DRAG_PX = 6;
    const activeYaw = () => (layerRef.current === 'languages' ? props.langYaw : props.yaw);

    const onDown = (event: PointerEvent) => {
      if (event.button !== 0) return;
      dragging.current = true;
      lastX.current = event.clientX;
      moved.current = 0;
      // 按下时不 capture：完整的 click 序列要交给 R3F，墙面右侧才能点中。
    };
    const onMove = (event: PointerEvent) => {
      if (!dragging.current) return;
      const dx = event.clientX - lastX.current;
      lastX.current = event.clientX;
      moved.current += Math.abs(dx);
      if (moved.current > DRAG_PX) {
        const yaw = activeYaw();
        if (!yaw.dragging) {
          yaw.dragging = true;
          el.classList.add('is-dragging');
          try {
            el.setPointerCapture(event.pointerId);
          } catch {
            /* already captured */
          }
        }
        props.onDrag(dx);
      }
    };
    const onUp = (event: PointerEvent) => {
      if (!dragging.current) return;
      dragging.current = false;
      el.classList.remove('is-dragging');
      try {
        el.releasePointerCapture(event.pointerId);
      } catch {
        /* already released */
      }
      if (moved.current > DRAG_PX) props.onDragEnd();
      window.setTimeout(() => {
        props.yaw.dragging = false;
        props.langYaw.dragging = false;
      }, 40);
    };
    const onWheel = (event: WheelEvent) => {
      const dx = Math.abs(event.deltaX) > Math.abs(event.deltaY) ? event.deltaX : event.deltaY;
      if (Math.abs(dx) < 0.5) return;
      event.preventDefault();
      props.yaw.dragging = true;
      props.onDrag(-dx);
      window.clearTimeout((onWheel as unknown as { t?: number }).t);
      (onWheel as unknown as { t?: number }).t = window.setTimeout(() => {
        props.yaw.dragging = false;
        props.onDragEnd();
      }, 80);
    };

    el.addEventListener('pointerdown', onDown);
    el.addEventListener('pointermove', onMove);
    el.addEventListener('pointerup', onUp);
    el.addEventListener('pointercancel', onUp);
    el.addEventListener('wheel', onWheel, { passive: false });
    return () => {
      el.removeEventListener('pointerdown', onDown);
      el.removeEventListener('pointermove', onMove);
      el.removeEventListener('pointerup', onUp);
      el.removeEventListener('pointercancel', onUp);
      el.removeEventListener('wheel', onWheel);
    };
  }, [props]);

  const fallback = (
    <FallbackWall
      layer={props.layer}
      languageId={props.languageId}
      caseId={props.caseId}
      hoverId={props.hoverId}
      hoverLang={props.hoverLang}
      highlightLang={props.highlightLang}
      onHoverLang={props.onHoverLang}
      onEnterLang={props.onEnterLang}
      onHoverCase={props.onHoverCase}
      onSelectCase={props.onSelectCase}
      onOpenCase={props.onOpenCase}
      note="无法创建 3D 画面，已改为平面陈列。两层目录仍可用。"
    />
  );
  if (lost) return fallback;
  return (
    <div className="lib-canvas-wrap" ref={wrap}>
      <CanvasErrorBoundary fallback={fallback}>
        <Canvas
          className="lib-canvas"
          flat
          linear
          dpr={[1, 2]}
          gl={{ antialias: true, alpha: false, powerPreference: 'high-performance' }}
          camera={{ fov: FOV, near: 0.15, far: 80, position: [0, 0, 6] }}
          onCreated={({ gl }) => {
            gl.setClearColor('#0e0f11', 1);
            const onLost = (event: Event) => {
              event.preventDefault();
              setLost(true);
            };
            gl.domElement.addEventListener('webglcontextlost', onLost, { once: true });
          }}
        >
          <LibraryScene
            languageLayout={props.languageLayout}
            caseLayout={props.caseLayout}
            blend={props.blend}
            yaw={props.yaw}
            langYaw={props.langYaw}
            layer={props.layer}
            languageId={props.languageId}
            device={props.device}
            displayCounts={props.displayCounts}
            hoverLang={props.hoverLang}
            highlightLang={props.highlightLang}
            hoverId={props.hoverId}
            caseId={props.caseId}
            frozen={props.frozen}
            onHoverLang={props.onHoverLang}
            onEnterLang={props.onEnterLang}
            onHoverCase={props.onHoverCase}
            onSelectCase={props.onSelectCase}
            onOpenCase={props.onOpenCase}
            onSpy={props.onSpy}
          />
        </Canvas>
      </CanvasErrorBoundary>
    </div>
  );
}
