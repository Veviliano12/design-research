/** 平台嵌入与站内去路。库页挂在 /vfx-map/ 下，链回平台根上的 hash 路由。 */

export const isEmbedded = new URLSearchParams(window.location.search).has('embed');

/** 平台根（设计研究站点），例如 http://127.0.0.1:4173/ 或 …/design-research/ */
export function platformRoot(): URL {
  return new URL('..', window.location.href);
}

/** 把相对平台根的资源（thumbs/vfx/…）解析成绝对地址。 */
export function platformUrl(rel: string): string {
  const clean = rel.replace(/^\/+/, '');
  return new URL(clean, platformRoot()).href;
}

/** 打开平台上的一条路由，供 target=_parent 使用。 */
export function platformHash(route: string): string {
  return `${platformRoot().href}#/${route}`;
}
