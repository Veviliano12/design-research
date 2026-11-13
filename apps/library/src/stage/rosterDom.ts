/**
 * 作品墙名单的 DOM 写入：各行按与当前位置 R 的距离（取最近的一圈）纵向排开、弧线外凸、远处渐淡，
 * 当前行（Math.round(R)）加 data-current。旧纵深流由 Scene 帧循环调用；正式墙（新馆）由 WallOverlay 自带的轻量动画循环调用。
 * 行的下标 k 是名单行号，即 WallOverlay 名单的 DOM 顺序：旧纵深流按到达顺序（arrivalSeq，精选 42 件），
 * 行数由调用方给出（count），与作品稳定顺序一致。
 * 不依赖 three，可留在首屏依赖链上。
 */
import { arrivalSeq, wallGeometry, type Frame } from './layout';

/** 旧纵深流名单各行对应的作品序号（wallWorks 下标），按到达顺序。 */
export const flowRosterSeq: readonly number[] = arrivalSeq;

/** 写入各行位置与透明度，并更新当前行标记。count 是名单行数；shown.cur 记录已标记的行（未取模），-1 表示尚未写入。 */
export function layoutRoster(rows: (HTMLElement | null)[], f: Frame, R: number, shown: { cur: number }, count: number) {
  const n = count;
  const rowH = wallGeometry(f).roster.rowH;
  for (let k = 0; k < n; k++) {
    const el = rows[k];
    if (!el) continue;
    // 行相对当前位置的距离，取最近的一圈
    let d = k - R;
    d -= Math.round(d / n) * n;
    const ad = Math.abs(d);
    // 位移保留小数：名单连续推进时逐帧取整会让每行按整像素断续挪动，看起来在抖。
    // 横向的弧线偏移与纵向位移同帧变化，两者都取整时还会叠出斜向的锯齿。
    const x = Math.max(0, 1 - ad) * 14;
    el.style.transform = `translate3d(${x}px, ${d * rowH}px, 0)`;
    // 远离当前行的行逐渐变淡，但近处几行保持足够不透明，避免低透明度下文字发灰发糊
    el.style.opacity = String(Math.max(0, 1 - ad * 0.14) ** 1.3);
  }
  const curK = Math.round(R);
  const ci = ((curK % n) + n) % n;
  // 两种名单切换时行会整体换掉：当前行没有标记时也要重写，清掉换位后留在别的行上的旧标记
  if (shown.cur !== curK || (rows[ci] && rows[ci]!.dataset.current === undefined)) {
    // 用 data 属性而非 class：React 重渲染时会重写 className。
    // 全部行一起重写：Scene 与新馆名单各自记录 shown，另一方留下的标记也要清掉
    rows.forEach((el, k) => {
      if (!el) return;
      if (k === ci) el.dataset.current = '';
      else delete el.dataset.current;
    });
    shown.cur = curK;
  }
}

/** 从 from 走到目标行 slot 的最近一圈目标值（未取模），名单沿最短路径滚动。count 是名单行数。 */
export function nearestSlot(from: number, slot: number, count: number) {
  return slot + Math.round((from - slot) / count) * count;
}
