# 设计研究

这是把原先散落的几块收成的一份工作目录，给后续设计和重构用。打开这一个文件夹即可。

线上书发布在 [veviliano12.github.io/design-research](https://veviliano12.github.io/design-research/)，对应的发布仓库是 [Veviliano12/design-research](https://github.com/Veviliano12/design-research)，内容等于这里的 `site/`。这个工作目录还没有另推成新的 GitHub 仓库。

## 目录怎么读

- `site/`：整本书的静态站点。壳子、数据、缩略图，以及已经构建好的视效库地图和研究逻辑页都在这里。本地预览：在仓库根目录执行 `npm run dev:site`，打开 http://127.0.0.1:4173/#/vfx/overview
- `apps/library/`：视效库墙面的源码（React + Three.js / R3F）。改墙面、第三层、交互，在这里改，然后 `npm run build:library`，产物写回 `site/vfx-map/`
- `apps/logic/`：研究逻辑页的源码。`npm run build:logic` 写回 `site/vfx-logic/`
- `research/atlas/`：来源权威表、渠道扩充和研究准则

数据在 `site/data/vfx/`，缩略图在 `site/thumbs/vfx/`。

## 现在这本书在讲什么

顶栏是「视效库 / 研究逻辑 / 来源」。评判空间挂在来源下面，地址是 `#/vfx/review`，不是第四个顶级栏目。

研究逻辑是一条固定方法：来源汇入 → 机器初筛 → 视效分类 → 人审 → 视效库。机器初筛只有三条规则：好看是门槛；视效必须发生在完整页面或组件里；孤立的引擎演示或 playground 截图不收。人审有两个回路：规则不对就改初筛，分类不对就改分类。点亮和排期是进库之后对照自身的事，不是前面又一道工序。

产品文案不要写「关口」或「上墙」，用「初筛 / 筛选」和「视效库」。书名是「设计研究」，强调色是 `#3EC8FF`，背景是 `#0e0f11`。

## 数据纪律（重构时也不要破）

- 墙上是 124 条标杆，不要擅自合并、删改或改状态。其中 123 条有截图，缺的是 `threeui-dark-souls-holo`，用中性底板，不要用官方预览图冒充。
- 候审 30、本轮评判队列 23，都不计入 124。标记写在浏览器本地，不要自动写回 `map-cases.js`。
- 不要编造截图、源码、权威分或状态。公开源码以 `site/data/vfx/code-sources.json` 为准；ThreeUI 的 Pro 项和 shaders.com 预设不要绕过付费墙转载。
- 权威分是「这个来源够不够格进研究池」，不是给每条视效打的分。已核过的表在 `site/data/vfx/authority-scores.js` 和 `research/atlas/authority-scores.md`。没有表里的行，就写尚未打分，不要编。
- 被判为不合适的旧条目不要再送回候审或 124。

## 本地怎么跑

第一次先在对应应用里装依赖：`npm --prefix apps/library ci`，`npm --prefix apps/logic ci`。

```bash
npm run dev:site        # 整本书，http://127.0.0.1:4173/
npm run dev:library     # 只跑墙面源码，端口 5181
npm run dev:logic       # 只跑研究逻辑源码，端口 5190
npm run build:library   # 构建墙面到 site/vfx-map/
npm run build:logic     # 构建研究逻辑到 site/vfx-logic/
```

旧文档里如果还写着 `/workspace/design-research-platform`、`/workspace/vfx-cinematic-stage` 或 `/workspace/vfx-presentation-pages`，那是收拢前的路径，以本目录为准。
