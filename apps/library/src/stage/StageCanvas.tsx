/**
 * 3D 部分的入口：R3F Canvas 加 Scene。单独成模块由 Stage 懒加载，three 与 R3F 的求值、
 * WebGLRenderer 的创建都发生在首帧 DOM 绘制之后，不挤进首屏的主线程。
 * WebGL 失败时由错误边界接住，只替换画布，不把整站卸成黑屏。
 */
import { Canvas } from '@react-three/fiber';
import { useState } from 'react';
import { GlFallback } from './canvasError';
import { depth, FOV, type Frame } from './layout';
import type { NavState } from './nav';
import { Scene, type SceneHandle } from './Scene';
import type { NebulaLabelDom } from './stageApi';
import type { WallDom } from './WallOverlay';

interface Props {
  sceneRef: (h: SceneHandle | null) => void;
  state: NavState;
  frame: Frame;
  onSettled: (key: string) => void;
  onOpen: (id: string) => void;
  glow: React.RefObject<HTMLDivElement | null>;
  wall: WallDom;
  nebulaLabels: NebulaLabelDom;
  /** 暂停帧循环：作品墙这一步未聚焦时由圆墙接管画面。Scene 保持挂载，状态、补间与回调照常进行，恢复后从当前状态继续绘制 */
  paused?: boolean;
  /** 舞台着色器分帧预热完成，见 Scene 的 onCompiled */
  onCompiled?: () => void;
  /** 进入作品墙（圆墙）第一段：在 state 的姿态上把已有作品向上飞出屏幕，见 Scene 的 leaving */
  leaving?: boolean;
  wallFilter?: string;
}

export default function StageCanvas({ sceneRef, state, frame, onSettled, onOpen, glow, wall, nebulaLabels, paused = false, onCompiled, leaving = false, wallFilter }: Props) {
  const [lost, setLost] = useState(false);
  const D = depth(frame);
  if (lost) return <GlFallback />;
  return (
    <Canvas
      className="stage__canvas"
      frameloop={paused ? 'never' : 'always'}
      flat
      linear
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      camera={{ fov: FOV, near: 1, far: D * 8, position: [0, 0, D] }}
      onCreated={({ gl }) => {
        const onLost = (e: Event) => {
          e.preventDefault();
          setLost(true);
        };
        gl.domElement.addEventListener('webglcontextlost', onLost, { once: true });
      }}
    >
      <Scene ref={sceneRef} state={state} frame={frame} onSettled={onSettled} onOpen={onOpen} glow={glow} wall={wall} nebulaLabels={nebulaLabels} onCompiled={onCompiled} leaving={leaving} wallFilter={wallFilter} />
    </Canvas>
  );
}
