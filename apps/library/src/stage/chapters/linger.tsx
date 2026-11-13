/**
 * 章节内容层的“离场保留”。舞台在离开章节时立即卸载 Overlay，而内容层需要淡出后才能消失，
 * 所以内容渲染到挂在 .stage 下的独立 React 根里：Overlay 卸载时以 leaving=true 再渲染一次，
 * 过 ms 毫秒后才销毁根。保留期内重新进入同一章会复用该根，不闪烁。
 * 目的地是作品墙时改走快速淡出（DUR.wallExit）：整个宿主节点及登记过的额外节点一起淡到 0，
 * 淡完才销毁根，名单浮现时章节内容已经清场。
 * 独立根里取不到舞台的 context；需要 useStageApi 的逻辑留在 Overlay 本体里。
 */
import { useEffect, useLayoutEffect, useRef, useState, type ReactNode } from 'react';
import { gsap, prefersReducedMotion } from '../../motion/gsap';
import { DUR, EASE } from '../../motion/tokens';
import { createRoot, type Root } from 'react-dom/client';
import './chapters.css';

interface Host {
  el: HTMLDivElement;
  root: Root;
  timer: number | undefined;
  /** 已离场，等待销毁 */
  leaving: boolean;
  /** 不在宿主节点内、但要随章节一起淡出的节点（如挂进 Stage 文案框的结论数字） */
  extras: Set<HTMLElement>;
}

const hosts = new Map<string, Host>();

function acquire(id: string, parent: Element): Host {
  let h = hosts.get(id);
  if (h) {
    window.clearTimeout(h.timer);
    h.timer = undefined;
    h.leaving = false;
    // 快速淡出进行到一半又回到本章：恢复显示，不留半透明残影
    const targets = [h.el, ...h.extras];
    gsap.killTweensOf(targets);
    gsap.set(targets, { clearProps: 'opacity' });
    if (h.el.parentElement !== parent) parent.appendChild(h.el);
    return h;
  }
  const el = document.createElement('div');
  el.className = 'ch-host';
  el.dataset.chapterHost = id;
  parent.appendChild(el);
  h = { el, root: createRoot(el), timer: undefined, leaving: false, extras: new Set() };
  hosts.set(id, h);
  return h;
}

function destroy(id: string, h: Host) {
  if (hosts.get(id) !== h || !h.leaving) return;
  hosts.delete(id);
  h.root.unmount();
  h.el.remove();
}

function release(id: string, ms: number) {
  const h = hosts.get(id);
  if (!h) return;
  h.leaving = true;
  h.timer = window.setTimeout(() => destroy(id, h), ms);
}

/** 快速淡出：宿主与额外节点同时降到 0，淡完才销毁。 */
function exitFast(id: string) {
  const h = hosts.get(id);
  if (!h || !h.leaving) return;
  window.clearTimeout(h.timer);
  if (prefersReducedMotion()) {
    destroy(id, h);
    return;
  }
  const targets = [h.el, ...h.extras];
  gsap.killTweensOf(targets);
  // 与淡完时刻对齐：销毁放在补间完成回调里，补间被回到本章打断时 leaving 已清除，destroy 不会执行
  gsap.to(targets, { opacity: 0, duration: DUR.wallExit, ease: EASE.out.gsap, onComplete: () => destroy(id, h) });
}

/** 登记一个要随章节快速淡出的节点（卸载时自动注销）。 */
export function useExitTarget(id: string) {
  const el = useRef<HTMLElement | null>(null);
  return (node: HTMLElement | null) => {
    const h = hosts.get(id);
    if (el.current && h) h.extras.delete(el.current);
    el.current = node;
    if (node && h) h.extras.add(node);
  };
}

interface Props {
  id: string;
  /** 离场后保留的毫秒数，需大于内容的淡出时长 */
  ms: number;
  /** 舞台的离场信号（ChapterOverlayProps.leavingTo）：目的地章节 id 或 'wall'；没有离开时为 null */
  leavingTo: string | null;
  children: (leaving: boolean) => ReactNode;
}

export function Linger({ id, ms, leavingTo, children }: Props) {
  const anchor = useRef<HTMLSpanElement>(null);
  const latest = useRef(children);
  latest.current = children;
  // 卸载清理里要读到的是离开那次提交的值：Stage 先带着目的地再渲染一次，随后才卸载
  const dest = useRef(leavingTo);
  dest.current = leavingTo;

  useLayoutEffect(() => {
    const parent = anchor.current?.closest('.stage') ?? document.body;
    const host = acquire(id, parent);
    return () => {
      host.root.render(latest.current(true));
      release(id, ms);
      if (dest.current === 'wall') exitFast(id);
    };
  }, [id, ms]);

  // 每次渲染都同步内容（根的渲染是异步批处理，最后一次为准）
  useLayoutEffect(() => {
    hosts.get(id)?.root.render(children(false));
  });

  return <span ref={anchor} hidden />;
}

/** 挂载后延迟 ms 毫秒才为 true，用来等作品飞位过半再显示内容；减少动效时立即为 true。 */
export function useReadyAfter(ms: number): boolean {
  const [ready, setReady] = useState(() => prefersReducedMotion());
  useEffect(() => {
    if (ready) return;
    const t = window.setTimeout(() => setReady(true), ms);
    return () => window.clearTimeout(t);
  }, [ready, ms]);
  return ready;
}
