# 设计研究

统一的文档式 HTML 平台壳。左侧是文档目录，把「来源清单」和「高阶视效」放进同一套页面里。视觉以设计资产清单为准：纸色、钴蓝、极简。本目录目前只在本地，尚未发布。

页面标题是「设计研究」，不要另起品牌或口号。

## 本地打开

需要一个静态服务器（页面要用 `fetch` 装载文档，清单以 iframe 嵌入）。在本目录执行：

```bash
python3 -m http.server 4173
```

然后打开 `http://localhost:4173/`。若 4173 已被占用，换一个空闲端口即可。默认进入「来源清单 / 清单总览」。路由是 hash（如 `#/vfx/overview`、`#/sources/scoring`），之后放到 GitHub Pages 也能用。

高阶视效已经接入本壳：全景总览、待吸收预览、定义与优先级，以及视效来源（官方渠道、开源与组件库、X）。数据与缩略图在 `data/vfx/`、`thumbs/vfx/`，页面脚本在 `js/vfx-*.js`、`css/vfx.css`。视觉只引用本平台令牌，不另起皮肤。

「研究逻辑」（`#/vfx/logic`）是一张横向的动态管线总览：纸色底、钴蓝强调，与平台令牌一致。来源页从左向右缓缓送入，过关口、按语言分流、上墙后再对照自身。可全屏打开 [`vfx-logic/`](https://veviliano12.github.io/design-research/vfx-logic/)，或从目录进入；壳内用独立 iframe（`vfx-logic/index.html?embed=1`）嵌入，不占用清单总览的 iframe。嵌入时隐藏演示页自己的底栏。

## 目录

```
css/tokens.css          设计令牌（从设计资产清单原样抽出，供共用）
css/shell.css           壳、目录树、文档排印
js/nav.js               信息架构
js/shell.js             展开、路由、当前项
index.html              壳
sections/               打分规则、北极星问题，以及视效空位页
vendor/design-atlas/    清单快照（嵌入用）
robots.txt              User-agent: * / Disallow: /
.nojekyll
```

## 给「好看的视效」：如何引用令牌、如何接入页面

1. **只引用本平台的令牌，不要另起皮肤。** 在视效页里引入 `css/tokens.css`（路径按你的文件位置写，例如 `../css/tokens.css`）。颜色、字阶（11 / 13 / 15 / 17 / 20 / 24 / 30）、圆角、阴影、缓动都以这个文件为准。默认浅色是 `#f7f7f5` 纸色加 `#2f43ff` 钴蓝；深色块已经按清单原样收在同一文件里，随系统偏好切换。不要用酒红、衬线标题或其他强调色。
2. **排印和空位可参考** `css/shell.css` 里的 `.doc`、`.empty`、`.doc-head`。不必整页硬编码进壳。
3. **把做好的页面接到目录里。** 打开 `js/nav.js`，找到「高阶视效」下对应条目（`vfx/overview`、`vfx/preview`、`vfx/sources/official`、`vfx/sources/oss`、`vfx/sources/x`），把 `type` 从 `"placeholder"` 改成 `"doc"`（若要整页 iframe，也可以把 `type` 设为 `"inventory"` 同类的整页并新增一种 frame 类型——当前推荐仍用 `"doc"`，把页面写成带 `data-page` 的 HTML 片段），并把 `src` 指到你的文件。不要把 8–11MB 的旧活页生硬塞进壳里改皮肤。
4. **「设计资产来源」不要复制一份清单。** 这一项已经是别名，会跳到「来源清单 / 清单总览」。
5. **数据不要混库。** 不改清单里的权威分和尚未核验字段，不写回 visual-fx-atlas。视效结论仍写在视效一侧。

## 清单总览怎么嵌进来

权威的可独立打开的清单仍是 `/workspace/design-resource-atlas/index.html`（已发布的地址是 https://veviliano12.github.io/design-atlas/ ）。独立打开时行为不变。

该文件增加了一种向后兼容的嵌入模式：`?embed=1` 会给根节点加上 `data-embed`，只隐藏清单自己的侧栏品牌块（「设计资产清单」标题），过滤、列表、抽屉、「看过了」、可信度勾选都保留。本地存储键仍是 `design-atlas-review-v1` 和 `design-atlas-ui-v1`，没有改名，也不会和平台目录的 `design-research-ui-v1` 混用。

平台里的清单总览加载的是本目录的快照 `vendor/design-atlas/index.html?embed=1`，避免清单数据和壳各维护一份。刷新快照（在嵌入模式已经写入权威清单之后）只需：

```bash
cp /workspace/design-resource-atlas/index.html /workspace/design-research-platform/vendor/design-atlas/index.html
```

## 托管说明

以后对外发布时，采用**公开的 GitHub Pages**，并保留 `robots.txt` 与 `<meta name="robots" content="noindex,nofollow">`，做法与 design-atlas 活页相同。不要用私有仓库的 GitHub Pages 来挂这个壳。

不要把私有仓库 `Veviliano12/design-resource-atlas` 改成公开。研究底稿仍留在那个私有仓库里。

## 约定

- 不编造事实、分数、洞察或产品品牌。
- 打分规则与北极星问题来自 `design-resource-atlas/research-criteria.md`，未确认的改动不得写成已采纳。
- 准则或清单有更新时，先改权威来源，再视情况刷新本文档页或清单快照。
