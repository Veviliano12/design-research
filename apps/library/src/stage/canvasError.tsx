/**
 * WebGL 画布的错误边界与失败说明。只替换 3D 画布，导航与文案仍留在 Stage 上。
 */
import { Component, type ErrorInfo, type ReactNode } from 'react';

export function GlFallback() {
  return (
    <div className="stage-gl-fallback" role="alert">
      <p>无法创建 3D 画面。请换用新版浏览器，或在设置里允许硬件加速。下方导航与文案仍可使用。</p>
    </div>
  );
}

export class CanvasErrorBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  componentDidCatch(error: Error, info: ErrorInfo) {
    console.warn('WebGL 舞台无法启动', error, info.componentStack);
  }
  render() {
    return this.state.failed ? <GlFallback /> : this.props.children;
  }
}
