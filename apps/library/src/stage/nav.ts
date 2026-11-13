/**
 * 舞台状态：章节 → 聚焦两层。纯函数，便于单独推演按键顺序。
 * 作品墙是规模章节的最后一步，不再是独立层；站点默认停在规模第 1 步。
 * 章节之间直接切换：非末章末步前进进入下一章首步，章节首步后退进入上一章末步；
 * 末章末步前进回到规模第 1 步，第一章首步后退回到末章末步。
 */

export interface Base {
  chapter: number;
  step: number;
}

export interface Focus {
  id: string;
  /** 本层可切换的作品顺序 */
  list: string[];
}

export interface NavState {
  base: Base;
  focus: Focus | null;
}

export const chapterState = (chapter: number, step = 0): NavState => ({ base: { chapter, step }, focus: null });

/** 起点：规模第 1 步。初始状态、Esc、回到起点都落在这里。 */
export const startState = (): NavState => chapterState(0);

/** 处于末章末步且未聚焦：此时前进会回到起点（全程结束）。stepCounts[i] 是第 i 章的步数。 */
export function atEnd(s: NavState, stepCounts: number[]): boolean {
  const last = stepCounts.length - 1;
  return !s.focus && s.base.chapter === last && s.base.step === stepCounts[last]! - 1;
}

export function next(s: NavState, stepCounts: number[]): NavState {
  const n = stepCounts.length;
  if (s.focus) {
    const i = s.focus.list.indexOf(s.focus.id);
    const id = s.focus.list[i + 1];
    return id ? { ...s, focus: { ...s.focus, id } } : s;
  }
  const b = s.base;
  if (b.step + 1 < stepCounts[b.chapter]!) return chapterState(b.chapter, b.step + 1);
  // 章末直接进入下一章首步；最后一章末步回到起点
  return b.chapter + 1 < n ? chapterState(b.chapter + 1) : startState();
}

export function prev(s: NavState, stepCounts: number[]): NavState {
  const n = stepCounts.length;
  if (s.focus) {
    const i = s.focus.list.indexOf(s.focus.id);
    const id = i > 0 ? s.focus.list[i - 1] : undefined;
    return id ? { ...s, focus: { ...s.focus, id } } : s;
  }
  const b = s.base;
  if (b.step > 0) return chapterState(b.chapter, b.step - 1);
  // 章首直接后退到上一章末步；第一章首步退回末章末步，与末章末步前进回起点的循环一致
  const c = b.chapter > 0 ? b.chapter - 1 : n - 1;
  return chapterState(c, stepCounts[c]! - 1);
}

/** Esc：聚焦 → 所在步；未聚焦 → 起点。 */
export function back(s: NavState): NavState {
  if (s.focus) return { ...s, focus: null };
  return home();
}

/** 回到起点（规模第 1 步）。 */
export function home(): NavState {
  return startState();
}

export function stateKey(s: NavState): string {
  const b = s.base;
  const base = `c${b.chapter}s${b.step}`;
  return s.focus ? `${base}/f:${s.focus.id}` : base;
}

/** hash 对应的章节序号；没有或不认识时为 -1。 */
export function chapterOfHash(hash: string, ids: string[]): number {
  return ids.indexOf(decodeURIComponent(hash.replace(/^#/, '')));
}

export function fromHash(hash: string, ids: string[]): NavState {
  const i = chapterOfHash(hash, ids);
  return i >= 0 ? chapterState(i) : startState();
}

export function toHash(s: NavState, ids: string[]): string {
  return `#${ids[s.base.chapter]}`;
}
