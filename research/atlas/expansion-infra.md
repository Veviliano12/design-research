# 第一阶段官方摄入（C 基础设施官方本体）

调研日期：2026-11-11（America/New_York）  
对照准则：`research-criteria.md`  
对照任务书：`phase-1-plan.md` 任务 C，以及 `execution-plan.md` 任务二 C  
发现渠道一律记为 **官网 / 文档 / changelog**。出品方类型仅在官方站点、官方许可页或官方主仓自行声明时归类，不臆测收购或公司关系以外的归属。  
可信度一律「待诊断」，分析状态一律「待分析」，洞察一律「尚未形成洞察」。  
本轮只写 Markdown 证据，不改 `index.html`，不提交、不推送，不开始深挖。

星标、许可与 `pushed_at` 仅来自本轮 `gh api` 或已打开的官方页面；时间已换算为 America/New_York。不编造未打开的价格、星标或技术细节。

已在 74 条清单中的官方基础设施（官方 shadcn/ui、Motion / Motion+、Vercel AI Elements）只补核、不重复建条，见文末。

## 总表（已核实新项）

| 名称 | 官网 | 发现渠道 | 出品方类型 | 主类 | 做什么 | 形态 | 技术栈（仅官网/仓已写明） | 权威性初评 | 许可 / 成本 | 可操作性 | 发现路径 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Tailwind CSS | https://tailwindcss.com/ | 官网 / 文档 / changelog | 开源主导项目 | 设计系统 / 主题 / kits | 官方 utility-first CSS 框架：用 utility class 在标记里组装界面，并用 `@theme` 把设计 token 映射成 utility | 开源框架 + 官方文档。本轮未把任何官方付费套件并入本条 | 官方文档：扫描 HTML / 组件模板中的 class 名，生成静态 CSS，zero-runtime。安装页写明 Vite 插件 `@tailwindcss/vite`、CLI `@tailwindcss/cli`、PostCSS 等；使用 `@import "tailwindcss"` | GitHub [tailwindlabs/tailwindcss](https://github.com/tailwindlabs/tailwindcss) 本轮 `gh api` 98,675 星，MIT，最近推送 2026-11-10 19:08（ET），主页 https://tailwindcss.com/ 。LICENSE 正文为 MIT License，Copyright (c) Tailwind Labs, Inc. 总分 5.0，五星 | MIT；免费开源 | 可直接作为样式与主题 token 基础设施 | 第一阶段 C：核 Tailwind CSS 官方本体 |
| Radix UI | https://www.radix-ui.com/ | 官网 / 文档 / changelog | 开源主导项目 | components | 官方无样式、可访问的 React primitives，以及同一官网上的预样式组件库 Radix Themes，用来做设计系统底层或逐步采用 | 开源组件库 + 官方文档。Primitives 与 Themes 为同一官网下的官方产品，本条按基础设施本体收录，维护与规模只按 Primitives 主仓计 | 官方 Introduction：推荐安装 `radix-ui`（可 tree-shake），或按包安装 `@radix-ui/react-dialog` 等；Themes 文档写 `npm install @radix-ui/themes`，并 `import "@radix-ui/themes/styles.css"`。官方写 unstyled，可用任意样式方案 | 官方主仓 [radix-ui/primitives](https://github.com/radix-ui/primitives) 本轮 `gh api` 19,492 星，MIT，最近推送 2026-10-14 17:52（ET），主页 https://radix-ui.com/primitives ，仓描述写 Maintained by @workos。同组织官方仓 `radix-ui/themes` 8,839 星，MIT，最近推送 2026-04-11 14:39（ET），不用于本条维护与规模。总分 4.9，五星 | 两个官方仓 LICENSE 均为 MIT。免费开源 | 可直接作为无样式 primitives 或官方 Themes 组件输入 | 第一阶段 C：核 Radix 官方本体，并与 Base UI 区分 |
| Base UI | https://base-ui.com/ | 官网 / 文档 / changelog | 开源主导项目 | components | 官方无样式、可访问的 React 组件库，用于搭建可访问的设计系统与界面。官网写 From the creators of Radix, Floating UI, and Material UI | 开源组件库 + 官方文档。与 Radix UI 为不同官方产品，已拆开 | 官网：React 库；`pnpm add @base-ui/react`，单包且可 tree-shake。官方写不捆绑 CSS，可用 Tailwind、CSS Modules、CSS-in-JS、plain CSS；也可与 Motion 或 CSS transitions 一起用。Quick start 示例为 `Popover` 等 | GitHub [mui/base-ui](https://github.com/mui/base-ui) 由官网与仓主页指出，本轮 `gh api` 11,365 星，MIT，最近推送 2026-11-10 19:33（ET），主页 https://base-ui.com 。总分 4.9，五星 | MIT。官网 FAQ 写 licensed under the MIT license, and is free for commercial use | 可直接作为无样式 React primitives；官方 Quick start 写 shadcn/ui 以其为 unstyled foundation，shadcn/ui 本身已在清单中，不在此重复建条 | 第一阶段 C：核 Base UI 官方本体，并与 Radix 拆开 |
| React Aria（Adobe） | https://react-aria.adobe.com/ | 官网 / 文档 / changelog | 大厂官方 | components | Adobe 官方的无样式 React 组件与 hooks 库：内置行为、自适应交互、无障碍与国际化，供你套用自己的样式或设计系统 | 开源库 + 官方文档。与 React Spectrum（S2）为同一 monorepo 中的不同官方库，已拆开。主仓与 Spectrum 相同，星标不重复相加 | 官方 Getting started：`npm install react-aria-components`。官网写 style-free，可用 vanilla CSS、Tailwind CSS、CSS-in-JS 等；另有低层 Hook API（如 `react-aria/useCalendar`）。页脚写 Copyright Adobe | 官方 monorepo [adobe/react-spectrum](https://github.com/adobe/react-spectrum) 本轮 `gh api` 16,024 星，Apache-2.0，最近推送 2026-11-10 22:11（ET），主页 https://react-spectrum.adobe.com 。仓库 README 把 React Aria 列为该集合中的无样式组件与 hooks 库，并链到 https://react-spectrum.adobe.com/react-aria/index.html （本轮打开后与 react-aria.adobe.com 内容一致）。总分 4.9，五星 | Apache-2.0（官方仓 LICENSE）。文档可免费阅读与安装 | 可直接作为无样式、可访问的 React primitives | 第一阶段 C：核 React Aria 官方 primitives |
| React Spectrum（Adobe / S2） | https://react-spectrum.adobe.com/ | 官网 / 文档 / changelog | 大厂官方 | 设计系统 / 主题 / kits | Adobe 官方把 Spectrum 设计系统做成 React 实现。当前 Getting started 安装的是 `@react-spectrum/s2`（Spectrum 2） | 开源设计系统 / 组件库 + 官方文档。与 React Aria 拆开；维护与规模仍按同一 monorepo `adobe/react-spectrum` 计，不把星标加两次 | 官方 Getting started：`npm install @react-spectrum/s2`，经 `Provider` 设置 locale、page background、color scheme，并加载 Spectrum fonts。`llms.txt` 写明 React Spectrum (S2) Documentation，含 style macro、Spectrum tokens，以及 `@react-spectrum/s2/icons` 与 `@react-spectrum/s2/illustrations`。v1.0.0 发行说明写 first stable version of our implementation of the updated Adobe design system，并链到 https://spectrum.adobe.com/ | 同上，[adobe/react-spectrum](https://github.com/adobe/react-spectrum) 16,024 星，Apache-2.0，最近推送 2026-11-10 22:11（ET）。总分 4.9，五星 | Apache-2.0。文档可免费阅读与安装 | 可直接作为 Adobe Spectrum 的官方 React 设计系统 / 组件输入 | 第一阶段 C：核 Adobe React Spectrum 官方本体 |
| GSAP | https://gsap.com/ | 官网 / 文档 / changelog | 大厂官方 | 动效 | 官方 JavaScript 动画库：补间、时间线、easing，以及 ScrollTrigger、SplitText、MorphSVG 等插件，用于 UI、SVG、WebGL 等 | 开源分发的官方库 + 文档 + 示例 / showcase。主仓无 GitHub License API 记录，以官方许可页为准 | 官方文档写 framework agnostic，可用于 React、Webflow、WordPress 或其他 JS/Web 框架；`npm install gsap`，`import { gsap } from "gsap"`。另有官方 `@gsap/react` 的 `useGSAP()` 钩子（README 写出）。package.json 本轮为 3.15.1 | GitHub [greensock/GSAP](https://github.com/greensock/GSAP) 本轮 `gh api` 30,453 星，`license` 字段为 null（仓内无 LICENSE 文件），最近推送 2026-11-03 19:56（ET），主页 https://gsap.com 。官网首页写 GSAP is now free for everyone, thanks to Webflow's support。官方 Standard License 由 Webflow 授权，并写知识产权归 Webflow。总分 5.0，五星 | 官方 [Standard "No Charge" GSAP License](https://gsap.com/standard-license)（与 `/community/standard-license/` 正文相同）：可在网站、web app 或 digital interface 上免费商用，含原 Club 插件；禁止用于与 Webflow 视觉无代码动画能力竞争的工具。生效日期 April 30, 2025，Last modified May 30, 2025。README 仍写 Copyright (c) 2008-2026, GreenSock. All rights reserved | 可直接作为动效基础设施；许可边界以官方 Standard License 为准 | 第一阶段 C：核 GSAP 官方本体 |
| Three.js | https://threejs.org/ | 官网 / 文档 / changelog | 开源主导项目 | 动效 | 官方 JavaScript 3D 库。仓库 README 写目标是 easy-to-use、lightweight、cross-browser、general-purpose；当前构建含 WebGL 与 WebGPU renderer，SVG 与 CSS3D renderer 作为 addons | 开源库 + 官方站点 / 文档 / examples | 官网首页标题为 three.js r187。README 示例为 `import * as THREE from 'three'`，并使用 `WebGLRenderer`、`Scene`、`PerspectiveCamera`、`BoxGeometry`、`MeshNormalMaterial` 等。官方文档目录含 Animation、Materials、Loaders、Renderers（含 WebGLRenderer / WebGPURenderer）等 | GitHub [mrdoob/three.js](https://github.com/mrdoob/three.js) 本轮 `gh api` 118,131 星，MIT，最近推送 2026-11-11 05:17（ET），主页 https://threejs.org/ 。LICENSE 正文为 The MIT License，Copyright © 2010-2026 three.js authors。总分 5.0，五星 | MIT；免费开源 | 可直接作为 Web 3D / WebGL / WebGPU 基础设施 | 第一阶段 C：核 Three.js 官方本体 |
| React Three Fiber | https://r3f.docs.pmnd.rs/getting-started/introduction | 官网 / 文档 / changelog | 开源主导项目 | 动效 | pmndrs 官方文档中的 React renderer for three.js：用声明式、可复用的 React 组件搭建 three.js 场景 | 开源库 + 官方文档。与 Three.js 为不同官方项目，已拆开 | 官方文档：`pnpm add three @types/three @react-three/fiber`；包名为 `@react-three/fiber`。写明 `@react-three/fiber@8` 对应 `react@18`，`@react-three/fiber@9` 对应 `react@19`。文档注明 v10 is in alpha（WebGPU 与新的 frame-loop scheduler）。兼容 ReactDOM 与 React Native（`@react-three/fiber/native`） | GitHub [pmndrs/react-three-fiber](https://github.com/pmndrs/react-three-fiber) 本轮 `gh api` 33,644 星，MIT，最近推送 2026-10-21 11:24（ET）。仓主页字段为 https://docs.pmnd.rs/react-three-fiber ；本轮该介绍页与 https://r3f.docs.pmnd.rs/getting-started/introduction 均可打开且正文一致。总分 5.0，五星 | MIT；免费开源 | 可直接作为 React 三维场景基础设施；需同时使用 three.js | 第一阶段 C：核 React Three Fiber 官方 / pmndrs 文档 |

## 内容勾选（概览，未做深挖）

主类已在上表。兼有情况只按本轮打开的官方页面记录，不补未看到的类。不使用「其他」。

| 名称 | blocks | 动效 | components | flows | 图标 / 插画 | 色板 / 字体 | 模板 / 落地页 | 交互 / 微交互 | 背景 / 材质 | 设计系统 / 主题 / kits | 生成式 / AI 搭建 | agent / 生成式 UI |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Tailwind CSS | 无 | 部分（官网展示 transitions、animations 与 3D transforms utility，不是独立动效库） | 无 | 无 | 无 | 是（官方颜色阶、`@theme` 中的 font / color token） | 无 | 无 | 无 | 是 | 无 | 无 |
| Radix UI | 无 | 无（Primitives 页提到 origin-aware / collision-aware animations，本轮未打开专门动效规范页，不勾「是」） | 是 | 部分（组件模式含 dialog、menu 等交互路径） | 无（组织下另有官方 Icons 仓，本轮未打开专页，不勾） | 无（组织下另有官方 Colors 仓，本轮未打开专页，不勾） | 无 | 部分 | 无 | 是（官方 Radix Themes：Theme、color、typography、dark mode 等） | 无 | 无 |
| Base UI | 无 | 无（官网写可与 Motion 或 CSS transitions 一起用，库本身不捆绑样式或动画方案） | 是 | 部分 | 无 | 无 | 无 | 部分 | 无 | 部分（官方定位为 building accessible design systems 的无样式层，不是一套视觉主题） | 无 | 无 |
| React Aria（Adobe） | 无 | 部分（官网示例写 built-in entry and exit animation states，本身是无样式库） | 是 | 部分 | 无 | 无 | 无 | 是（官网写 mouse / touch / keyboard / screen reader 交互与 focus 管理） | 无 | 部分（用来搭建你自己的设计系统，不是 Adobe Spectrum 视觉层） | 无 | 无 |
| React Spectrum（Adobe / S2） | 无 | 无（本轮未打开专门 motion 规范页） | 是 | 部分（Forms、Dialog、collections、drag and drop 等） | 是（`llms.txt` 含 Icons、Illustrations） | 是（Spectrum tokens、style macro、Getting started 中的 fonts / color scheme） | 无 | 部分 | 无 | 是 | 部分（`llms.txt` 含 Working with AI、Agent Skills、MCP） | 部分（`llms.txt` 含 AI Components） |
| GSAP | 无 | 是 | 无 | 无 | 无 | 无 | 无 | 部分（官网有 UI Interactions；文档含 Draggable 等插件） | 无 | 无 | 无 | 无 |
| Three.js | 无 | 是（3D / WebGL / WebGPU 与 Animation 文档） | 无 | 无 | 无 | 无 | 无 | 无 | 是（官方文档目录含 Materials、Textures 等） | 无 | 无 | 无 |
| React Three Fiber | 无 | 是 | 无（是 three.js 的 React 渲染器，不是 UI 组件库） | 无 | 无 | 无 | 无 | 部分（官方示例含指针交互；文档写 readily interactive） | 部分（经 JSX 使用 three.js 的 geometry / material） | 无 | 无 | 无 |

## 已在清单中、本轮只补核不重复建条

| 对象 | 结论 |
| --- | --- |
| 官方 shadcn/ui（https://ui.shadcn.com/ ，仓 `shadcn-ui/ui`） | 已在种子名单与 `authority-scores.md` 中，总分 5.0 / 五星。本轮不重复建条。Base UI 官方 Quick start 写 shadcn/ui uses Base UI as its unstyled foundation，记入 Base UI 备注。 |
| Motion / Motion+（https://motion.dev/plus ，仓 `motiondivision/motion`） | 已在种子名单中以 Motion+ 收录，总分 5.0 / 五星。本轮不另建 Motion 官方核心库条目。 |
| AI Elements（Vercel）（https://elements.ai-sdk.dev/ ） | 已在 `expansion-x.md` 收录。不是本批必查的样式 / 动效 / 三维基础设施本体，不重复建条。 |

## 已查但不写入正式表，或未能作为独立新项的对象

| 对象 | 结论 |
| --- | --- |
| Radix 与 Base UI 是否合并 | 不合并。Base UI 官网 FAQ 专节 How does Base UI differ from Radix UI? 把二者作为不同库比较，并写 Base UI is actively maintained and developed。官网、文档、npm 包与 GitHub 组织均不同，已拆成两条。 |
| Radix Themes 作为独立新条 | 不另建。它是 https://www.radix-ui.com/ 上的官方预样式库，Themes 文档写 If you are looking for the unstyled components, go to Radix Primitives。已写入 Radix UI 本条。维护与规模只按 `radix-ui/primitives` 计；`radix-ui/themes` 最近推送为 2026-04-11（ET），已在备注写明。 |
| `radix-ui/icons`、`radix-ui/colors` | 官方组织下的相邻项目（本轮 `gh search` 可见），不是本批必查的 primitives 本体，不另建条。本轮也未打开其文档专页，不把图标或色板勾进 Radix UI 的「是」。 |
| React Stately、Internationalized（Adobe） | 官方 monorepo README 列为同一「React Spectrum Libraries」集合中的状态管理 hooks 与国际化包，不是本批要收的设计资产 / primitives 独立条目，不另建条。 |
| `@react-three/drei` 及其他 R3F 生态包 | 官方 Fiber 文档的 Ecosystem 节列出 `@react-three/drei` 等为 helpers / 生态库。本批只收 React Three Fiber 官方本体，不把生态 kit 入库。 |
| Three.js Journey、Three.js Game Development、Three.js Resources、Needle devtools | 出现在 https://threejs.org/ 首页链接中，不是 three.js 库官方本体，不另建条。 |
| GSAP 文档 Resources 中的 Osmo、Creative Coding Club、Mastering Web Animation | 官方资源页上的课程 / 第三方内容入口，不是 GSAP 官方库本体，不另建条。 |
| 在这些基础设施上做的第三方 kit / 模板 / 主题 | 按第一阶段任务书放到后一阶段，本批不收。 |

## 本轮未能稳定打开、或正文不足的页面

| URL | 情况 |
| --- | --- |
| https://react-spectrum.adobe.com/ | 已请求，正文几乎只有标题「React Spectrum」，不足以单独作为产品说明依据。已改用成功打开的 Getting started、`llms.txt` 与仓库 README。 |
| https://react-spectrum.adobe.com/react-spectrum/index.html | 同样几乎只有标题，无稳定正文。 |
| https://threejs.org/docs/index.html#manual/en/introduction/Creating-a-scene | 打开后主要是文档 API 目录，不是手册正文。 |
| https://threejs.org/manual/#en/creating-a-scene | 本轮几乎无可用正文。 |
| https://threejs.org/manual/en/creating-a-scene.html | 返回 404。创建场景的依据改用官方仓 README 中的 Usage 示例，以及已打开的 https://threejs.org/docs/ 目录与官网首页。 |

## 权威性算法说明

与 `authority-scores.md` 同一套权重（30 / 25 / 20 / 15 / 10）和星标分档。被引用项：上述官方本体的官方文档本身即是该类基础设施的标准入口时取 5。维护与规模：按本轮 `gh api` 星标定档，再按 2026-11-11 锚点微调（2026-10-12 及之后 +0.5；2025-11-11 之前 -1），且不超过 5。Tailwind CSS 本轮为 98,675 星，未按「约 100k+」定档 5，先按 20k+ 定档 4.5，再因约 30 天内有推送 +0.5，结果为 5。Radix UI 的 `radix-ui/primitives` 为 19,492 星，未按 20k+ 定档，先按 10k+ 定档 4，再 +0.5，为 4.5；不以 Themes 仓抬分或拉低。React Aria 与 React Spectrum 共用 `adobe/react-spectrum`，两条的维护与规模分项相同，星标不重复相加。GSAP 仓无 GitHub SPDX，不按「无公开主仓」降档，因官方主仓存在且星标、推送可核；许可以打开的官方 Standard License 为准。

分项与一句依据见 `authority-scores.md` 本轮新增行。

## 本轮实际打开 / 调用的来源

- Tailwind CSS：https://tailwindcss.com/ ；https://tailwindcss.com/docs （重定向到 Vite 安装说明）；`gh api` `tailwindlabs/tailwindcss` 及其 LICENSE 正文。另参考过官方 Theme variables 文档检索摘要，正式依据以已打开的官网、安装文档与 LICENSE 为准。
- Radix UI：https://www.radix-ui.com/ ；https://www.radix-ui.com/primitives ；https://www.radix-ui.com/primitives/docs/overview/introduction ；https://www.radix-ui.com/themes/docs/overview/getting-started ；`gh api` / `gh search` `radix-ui/primitives`、`radix-ui/themes` 及 Primitives LICENSE。
- Base UI：https://base-ui.com/ ；https://base-ui.com/react/overview/quick-start ；`gh api` `mui/base-ui` 及其 LICENSE。
- React Aria / React Spectrum：https://react-aria.adobe.com/ ；https://react-aria.adobe.com/getting-started ；https://react-spectrum.adobe.com/getting-started ；https://react-spectrum.adobe.com/llms.txt ；https://react-spectrum.adobe.com/react-aria/index.html ；`gh api` `adobe/react-spectrum`（含 README 与 LICENSE）。官网首页与 `/react-spectrum/index.html` 正文不足，见上表。
- GSAP：https://gsap.com/ ；https://gsap.com/docs/v3/Installation/ ；https://gsap.com/standard-license ；https://gsap.com/community/standard-license/ ；`gh api` `greensock/GSAP`（README、`package.json`；无 LICENSE 文件，GitHub license API 404）。
- Three.js：https://threejs.org/ ；https://threejs.org/docs/ ；`gh api` `mrdoob/three.js`（README 与 LICENSE）。手册 URL 未能提供稳定正文，见上表。
- React Three Fiber：https://r3f.docs.pmnd.rs/getting-started/introduction ；https://docs.pmnd.rs/react-three-fiber/getting-started/introduction ；`gh api` `pmndrs/react-three-fiber`（README 与 LICENSE）。

本文件未开始深挖或填写洞察。
