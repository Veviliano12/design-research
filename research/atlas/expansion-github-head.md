# 第一阶段 GitHub 头部官方或标准项目（E）

调研日期：2026-11-11（America/New_York）  
对照准则：`research-criteria.md`  
对照任务书：`phase-1-plan.md` 任务 E，以及 `execution-plan.md` 任务二 E  
发现渠道一律记为 **GitHub**（本轮以 `gh search` / `gh api` 定位官方主仓，再打开官网或官方文档核验）。出品方类型仅在官方站点、官方许可页或官方主仓自行声明时归类，不臆测未在这些出处写明的公司关系。  
可信度一律「待诊断」，分析状态一律「待分析」，洞察一律「尚未形成洞察」。  
本轮只写 Markdown 证据，不改 `index.html`，不提交、不推送，不开始深挖。

星标、许可与 `pushed_at` 仅来自本轮 `gh api` 或已打开的官方页面；时间已换算为 America/New_York，并标注 ET。维护微调锚点为 2026-11-11（ET）：2026-10-12 及之后有推送 +0.5；2025-11-11 之前最近推送 -1；分项不低于 0、不高于 5。不编造未打开的价格、星标或技术细节。

本批不是 `awesome-shadcn-ui` 余量扫货。衍生套件、主题、模板，以及已在 82 条清单中的项目，只记入「已查但不写入正式表」。

已对照 `index.html` 中 `window.ATLAS_DATA.sources` 的 82 个名称，避免重复建条。

## 总表（已核实新项）

| 名称 | 官网 | 发现渠道 | 出品方类型 | 主类 | 做什么 | 形态 | 技术栈（仅官网/仓已写明） | 权威性初评 | 许可 / 成本 | 可操作性 | 发现路径 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Ant Design | https://ant.design/ | GitHub | 大厂官方 | 设计系统 / 主题 / kits | 官方企业级设计系统，并提供遵循该规范的 React UI 库 `antd`，用于搭建现代、可主题化的界面 | 开源设计系统 + React 组件库 + 官方文档。本条只收官方本体，不把 Pro / Mobile / X 等相邻官方产品并入本条或另建条 | 官方介绍页：`npm install antd --save`；示例 `import { DatePicker } from 'antd'`；官网写使用 CSS-in-JS 提供动态与混合主题。文档目录含 Customize Theme、SSR、以及 For Agents / LLMs.txt / MCP Server / CLI | GitHub [ant-design/ant-design](https://github.com/ant-design/ant-design) 本轮 `gh api` 100,151 星，MIT，最近推送 2026-11-11 03:36（ET），主页 https://ant.design 。LICENSE 正文 Copyright (c) 2015-present Ant UED, https://xtech.antfin.com/ 。总分 5.0，五星 | MIT；免费开源 | 可直接作为企业级设计系统与 React 组件输入 | 第一阶段 E：核官方 Ant Design 作为平台级体系的同等量级候补 |
| Carbon Design System | https://www.carbondesignsystem.com/ | GitHub | 大厂官方 | 设计系统 / 主题 / kits | IBM 官方开源设计系统，面向产品与数字体验：含工作代码、设计工具与资源、人机界面指南。官方 About 写 Carbon represents the digital expression of the IBM brand | 开源设计系统 monorepo + 官方文档。本条按 Carbon 官方本体收录；Carbon for Products / Charts / AI 等扩展只作备注，不另建条 | 官方 About 与仓库 README：monorepo 含 React 与 Web Components 库、Sass、设计 token、图标、pictograms 与工具。README 列出 `@carbon/react`、`@carbon/web-components`、`@carbon/styles`、`@carbon/themes`、`@carbon/type`、`@carbon/icons`、`@carbon/motion` 等包。官网另有 Carbon MCP | GitHub [carbon-design-system/carbon](https://github.com/carbon-design-system/carbon) 本轮 `gh api` 9,614 星，Apache-2.0，最近推送 2026-11-11 06:16（ET），主页 https://www.carbondesignsystem.com 。LICENSE 附录写 Copyright 2015 IBM Corp.。总分 4.8，五星 | Apache-2.0；官方 About 写 made open source for anyone to use | 可直接作为 IBM 官方设计系统 / 组件与 token 输入 | 第一阶段 E：核 IBM 官方 Carbon |
| Material UI | https://mui.com/material-ui/ | GitHub | 开源主导项目 | components | 官方开源 React 组件库，实现 Google 的 Material Design，开箱可用于生产，也可用主题定制自己的设计系统。官方 FAQ 写 currently adopts Material Design 2，与已在清单中的 Google Material Design 3 文档不是同一官方产品 | 开源组件库 + 官方文档。与 Material Design 3（https://m3.material.io/）已拆开。MUI X、Templates、Design kits 为同一官网上的相邻官方产品，不另建条；维护与规模只按 `mui/material-ui` 计 | 官网：`$ npm install @mui/material @emotion/react @emotion/styled`。Getting started 写 prebuilt components、theming、design kits。仓库 README 写 independent implementation of Google's Material Design，并链到 MUI X 作为复杂组件扩展 | GitHub [mui/material-ui](https://github.com/mui/material-ui) 本轮 `gh api` 99,322 星，MIT，最近推送 2026-11-11 06:12（ET），主页 https://mui.com/material-ui/ 。LICENSE 正文 Copyright (c) 2014 Call-Em-All。未按约 100k+ 定档 5，先按 20k+ 定档 4.5，再因约 30 天内有推送 +0.5。总分 5.0，五星 | MIT；官方仓描述写 Free forever。本轮未把 MUI X 等付费边界写入本条精确价格 | 可直接作为 React 组件 / 主题输入；视觉规范以库自身实现为准，不替代已收录的 Google Material Design 3 文档 | 第一阶段 E：核官方 Material UI，并与已收录的 Material Design 3 拆开 |
| Bootstrap | https://getbootstrap.com/ | GitHub | 开源主导项目 | 设计系统 / 主题 / kits | 官方开源设计系统 / 前端工具包。官网首页写 Bootstrap is the open source design system for everyone；Bootstrap 6 为 framework-agnostic design toolkit，含新组件、更新的视觉设计与 CSS-first theming | 开源框架 + 官方文档 + 官方博客。本条收官方本体。首页安装示例为 `npm i bootstrap@6.0.0-alpha.1`（Alpha）。本轮成功打开的稳定入门文档为 v5.3（CDN 示例为 bootstrap@5.3.8，含 CSS 与 JS bundle / Popper）。官方博客 2026-10-08 发布 Bootstrap 6 Alpha。`https://getbootstrap.com/docs/6.0/` 正文几乎为空，见失败页表 | 官方 v5.3 入门：通过 CDN 或包管理器使用 Bootstrap 的 CSS 与 JavaScript；JS 组件含 accordion、modal、dropdown、navbar、tooltip 等，部分需要 Popper | GitHub [twbs/bootstrap](https://github.com/twbs/bootstrap) 本轮 `gh api` 175,039 星，MIT，最近推送 2026-11-11 04:58（ET），主页 https://getbootstrap.com 。LICENSE 正文 Copyright (c) 2011-2026 The Bootstrap Authors。总分 4.9，五星 | MIT；免费开源。Bootstrap 6 在官网标明为 alpha，稳定用法以已打开的 v5.3 文档为准 | 可直接作为 CSS / JS 设计系统与组件输入 | 第一阶段 E：核仍在维护的官方 Bootstrap，作为样式与设计系统领域的公认标准项目 |
| Chakra UI | https://chakra-ui.com/ | GitHub | 开源主导项目 | 设计系统 / 主题 / kits | 官方组件系统：用可访问的 React 组件快速搭建产品与设计系统。官网写 Accessible React components for building high-quality web apps and design systems，并介绍 tokens、typography、recipes | 开源组件库 / 设计系统 + 官方文档。与同组织的 Ark UI、Zag.js、Park UI、Panda CSS 为不同官方产品，已拆开核验，后四者不作为本批独立新项（见未收录表） | 官方安装页：`npm i @chakra-ui/react @emotion/react`；可用 `@chakra-ui/cli snippet add` 添加 snippets；根部用生成的 `Provider`（文档写其组合 `ChakraProvider` 与 `next-themes` 的 `ThemeProvider`）。文档写 Today, Chakra UI uses Emotion at runtime | GitHub [chakra-ui/chakra-ui](https://github.com/chakra-ui/chakra-ui) 本轮 `gh api` 40,722 星，MIT，最近推送 2026-11-11 06:15（ET），主页 https://chakra-ui.com 。LICENSE 正文 Copyright (c) 2019 Chakra Systems Inc.。总分 5.0，五星 | MIT；免费开源 | 可直接作为 React 组件系统 / 设计 token 输入 | 第一阶段 E：按可核验星标与仍在维护的官方主仓，收该领域头部组件系统 |
| Headless UI | https://headlessui.com | GitHub | 开源主导项目 | components | Tailwind Labs 官方的完全无样式、可访问 UI 组件，官网写 designed to integrate beautifully with Tailwind CSS。提供 React 与 Vue 包 | 开源无样式组件库 + 官方文档。与已收录的 Tailwind CSS 为同一出品组织下的不同官方产品，已拆开 | 官方 Menu 文档与仓库 README：`npm install @headlessui/react` 或 `npm install @headlessui/vue`；另有 `@headlessui/tailwindcss`。文档示例使用 `Menu`、`MenuButton`、`MenuItems`、`MenuItem`。官网页脚写 © 2026 Tailwind Labs Inc. | GitHub [tailwindlabs/headlessui](https://github.com/tailwindlabs/headlessui) 本轮 `gh api` 28,823 星，MIT，最近推送 2026-04-13 12:12（ET），主页 https://headlessui.com 。LICENSE 正文 Copyright (c) 2020 Tailwind Labs。20k+ 定档 4.5；最近推送在 2025-11-11 之后、2026-10-12 之前，不加不减。仓库 README 未见停更或弃用声明，官网 v2.1 文档可打开。总分 4.9，五星 | MIT；免费开源 | 可直接作为无样式、可访问的 React / Vue 组件输入 | 第一阶段 E：核 Tailwind Labs 官方 Headless UI |
| PixiJS | https://pixijs.com/ | GitHub | 开源主导项目 | 动效 | 官方 HTML5 Creation Engine：用 2D WebGPU / WebGL 渲染器创建游戏、应用与交互数字内容 | 开源 2D 渲染引擎 + 官方站点 / 发行文档。`pixi-react`、filters、sound 等为同组织相邻项目，不另建条 | 官方发行文档与仓库 README：`npm create pixi.js@latest` 或 `npm install pixi.js`；示例 `import { Application, Assets, Sprite } from 'pixi.js'`，`await app.init(...)`。文档写 WebGL & WebGPU Renderers，以及资源加载、指针交互、文本、SVG、纹理、遮罩、滤镜等 | GitHub [pixijs/pixijs](https://github.com/pixijs/pixijs) 本轮 `gh api` 48,668 星，MIT，最近推送 2026-11-10 10:14（ET），仓主页字段为 http://pixijs.com ，本轮打开的官网为 https://pixijs.com/ 。LICENSE 正文 Copyright (c) 2013-2023 Mathew Groves, Chad Engler。`https://docs.pixijs.com/` 本轮未能稳定打开，已改用 https://pixijs.download/release/docs/index.html 与 README。总分 5.0，五星 | MIT；免费开源 | 可直接作为 Web 2D / WebGL / WebGPU 基础设施 | 第一阶段 E：核官方 PixiJS 作为头部 2D 渲染基础设施 |
| Babylon.js | https://www.babylonjs.com/ | GitHub | 开源主导项目 | 动效 | 官方开源 Web 渲染引擎。官网标题写 Web-Based 3D At Its Best；当前首页欢迎 Babylon.js 9.0，用于创建交互式 Web 体验 | 开源 3D / 游戏与渲染引擎 + 官方站点 / 文档。Editor、Native 等相邻官方仓不另建条。本轮打开的 LICENSE / package.json 未写明除此之外的公司版权，出品方类型按开源主导项目计，不臆测归属 | 仓库 README：`npm install babylonjs --save`；`import * as BABYLON from 'babylonjs'` 或按需引入 `Scene`、`Engine`。官方文档入口 https://doc.babylonjs.com/ 。README 示例使用 `BABYLON.Engine`、`BABYLON.Scene`、`BABYLON.FreeCamera` | GitHub [BabylonJS/Babylon.js](https://github.com/BabylonJS/Babylon.js) 本轮 `gh api` 26,325 星，Apache-2.0，最近推送 2026-11-10 21:04（ET），仓主页字段为 http://www.babylonjs.com ，本轮打开 https://www.babylonjs.com/ 。总分 5.0，五星 | Apache-2.0；免费开源 | 可直接作为 Web 3D 渲染基础设施 | 第一阶段 E：核官方 Babylon.js |
| Anime.js | https://animejs.com | GitHub | 开源主导项目 | 动效 | 官方 JavaScript 动画引擎。官网写 A fast and flexible JavaScript library to animate the web；仓库 README 写可动画 CSS、SVG、DOM 属性与 JavaScript 对象 | 开源动画库 + 官方文档。本轮打开的安装文档标题含 4.0.0 | 官网与安装文档：`npm i animejs`。官网列出 Timer、Animation、Timeline、Draggable、Scroll Observer、SVG（morph / motion path / line drawing）、Scope、WAAPI 等 API。安装文档写 Module imports、Using with vanilla JS、Using with React | GitHub [juliangarnier/anime](https://github.com/juliangarnier/anime) 本轮 `gh api` 74,511 星，MIT，最近推送 2026-11-02 17:25（ET），主页 https://animejs.com 。LICENSE.md 正文 Copyright (c) 2025 Julian Garnier。总分 5.0，五星 | MIT；README 写 100% free | 可直接作为 JavaScript 动效基础设施 | 第一阶段 E：按可核验星标与仍在维护的官方主仓，收该领域头部 JS 动画引擎 |
| Lenis | https://lenis.dev | GitHub | 独立作者 / 工作室 | 动效 | darkroom.engineering 官方的平滑滚动库，把原生滚动变成可控制的丝滑体验，并用于同步 WebGL 与 DOM。官网写 The smooth scroll library | 开源库 + 官方站点。Locomotive Scroll 官方页写 Built on top of Lenis，故不把 Locomotive 当作并列的独立基础设施另建条 | 仓库 README：`npm i lenis`（或 yarn / pnpm）；官网写 `new Lenis()`。README 写零运行时依赖、包裹浏览器原生滚动，并有 React / Vue / Framer 与 snap 包 | GitHub [darkroomengineering/lenis](https://github.com/darkroomengineering/lenis) 本轮 `gh api` 17,190 星，MIT，最近推送 2026-11-10 06:14（ET），主页 https://lenis.dev 。LICENSE 正文 Copyright (c) 2024 darkroom.engineering。总分 4.6，五星 | MIT；官网写 free, open-source | 可直接作为平滑滚动 / 滚动同步基础设施 | 第一阶段 E：核官方 Lenis；Locomotive 官方已声明以其为底层，故只收 Lenis 本体 |

## 内容勾选（概览，未做深挖）

主类已在上表。兼有情况只按本轮打开的官方页面记录，不补未看到的类。不使用「其他」。

| 名称 | blocks | 动效 | components | flows | 图标 / 插画 | 色板 / 字体 | 模板 / 落地页 | 交互 / 微交互 | 背景 / 材质 | 设计系统 / 主题 / kits | 生成式 / AI 搭建 | agent / 生成式 UI |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Ant Design | 无 | 无（本轮未打开独立动效规范页；`ant-design/ant-motion` 为相邻且已停更项目，不勾进本条） | 是 | 部分（组件总览含 Steps、Tour 等） | 是（组件总览含 Icon；介绍页链接 Ant Design Icons） | 部分（官网强调主题定制与 design guide，本轮未打开独立色板 / 字体专页） | 无（Landing / Pro 为相邻官方产品，不勾进本条） | 部分 | 无 | 是 | 部分（介绍页目录含 For Agents、LLMs.txt、MCP Server、CLI） | 部分（同上，仅按已打开的文档目录勾选，未做深挖） |
| Carbon Design System | 无 | 是（官方 Developing 导航含 Motion；README 有 `@carbon/motion`） | 是 | 部分（官方有 Patterns） | 是（Icons、Pictograms） | 是（Color、Typography、Themes、token 包） | 无 | 部分 | 无 | 是 | 部分（Carbon MCP；Carbon for AI 为扩展，本轮未把其全部能力并入本条「是」） | 部分（官方 About 写 AI chat framework 等，作为扩展提及） |
| Material UI | 无 | 无（本轮未打开专门 motion 规范页） | 是 | 部分 | 部分（官网 Design Kit 文案含 icons，未打开独立图标库专页） | 是（官方写 theming 与 design tokens） | 是（官网展示官方 Templates，含 Dashboard、Landing Pages） | 部分 | 无 | 是 | 无 | 无 |
| Bootstrap | 无 | 部分（v5.3 文档列出 carousel、collapse、transition 类 JS 组件，不是独立动效库） | 是 | 部分 | 无（官方博客导航有 Icons 入口，本轮未打开图标专页，不勾） | 部分（官网写 CSS-first theming，未打开独立色板 / 字体专页） | 部分（v5.3 文档指向 official examples） | 部分 | 无 | 是 | 部分（官网写 human or AI 都可使用；不是独立的生成式搭建产品） | 无 |
| Chakra UI | 无 | 部分（官网 token 示例含 animations，不是独立动效库） | 是 | 部分 | 无（本轮未打开图标专页） | 是（官网介绍 tokens、typography） | 无 | 部分 | 无 | 是 | 无（安装页有 Agent Skills 提示，只是文档辅助，不勾成产品能力） | 无 |
| Headless UI | 无 | 部分（官网组件列表含 Transition） | 是 | 部分（Dialog、Disclosure、Menu 等） | 无 | 无 | 无 | 是（官方 Menu 文档强调键盘导航与无样式交互） | 无 | 部分（无样式层，用来套用 Tailwind 等自有样式，不是一套视觉主题） | 无 | 无 |
| PixiJS | 无 | 是 | 无（是 2D 渲染引擎，不是 UI 组件库） | 无 | 无 | 无 | 无 | 是（发行文档写 Full Mouse & Multi-touch Support） | 是（文档含 Dynamic Textures、filters、blend modes） | 无 | 无 | 无 |
| Babylon.js | 无 | 是 | 无 | 无 | 无 | 无 | 无 | 部分（官网定位为 interactive web experiences） | 是（官网 / 文档涉及照明、材质、PBR、纹理等相关能力） | 无 | 无 | 无 |
| Anime.js | 无 | 是 | 无 | 无 | 无 | 无 | 无 | 部分（官网有 Draggable API 与 Scroll Observer） | 无 | 无 | 无 | 无 |
| Lenis | 无 | 是 | 无 | 无 | 无 | 无 | 无 | 部分（平滑滚动与滚动同步，不是通用微交互组件库） | 无 | 无 | 无 | 无 |

## 已在清单中、本轮只补核不重复建条

| 对象 | 结论 |
| --- | --- |
| Motion 开源库（https://motion.dev/ ，仓 `motiondivision/motion`）与已收录的 Motion+（https://motion.dev/plus） | 本轮打开 https://motion.dev/ ：官网把 **Motion**（Start with the free animation library，`npm install motion`）和 **Motion+**（Start with components, examples and a complete editing toolkit）列为同一站点上的两个起点；Schema 将软件名写为 Motion（prev Framer Motion），免费。仓库仍是 `motiondivision/motion`（本轮 35,069 星，MIT，最近推送 2026-11-11 06:11 ET，主页 https://motion.dev ）。已在 82 条清单中以 Motion+ 收录，并已用同一主仓计分。官方页面将其视为同一产品家族的免费层与付费层，而不是尚未被代表的另一套可独立入库资产。按任务要求记录本次核对，**不另建条**。 |
| 官方 shadcn/ui、Vercel AI Elements、Tailwind CSS、Radix UI、Base UI、React Aria、React Spectrum、GSAP、Three.js、React Three Fiber | 已在 82 条清单中。本轮不重复建条。 |
| Apple HIG、Material Design 3、Fluent 2、HarmonyOS、Astryx、Apps SDK UI、Claude Design、Gemini 官方设计、M365 Copilot MCP UX、Designing Grok Bot、coss ui、LiveKit Agents UI、Plate、Vaul 等 | 已在 82 条清单中。本轮检索与对照名称后确认无重复，不改已有条目。 |

## 已查但不写入正式表的对象

| 对象 | 结论 |
| --- | --- |
| Locomotive Scroll（https://scroll.locomotive.ca ，仓 `locomotivemtl/locomotive-scroll`，本轮 8,900 星，MIT，最近推送 2026-11-11 00:29 ET） | 官方页写 A lightweight scroll library… Built on top of Lenis，以及 Locomotive Scroll is a thin, opinionated wrapper around Lenis。Lenis 官网也写 even powering libraries like Locomotive Scroll。属官方维护中的 Lenis 封装，不作为与 Lenis 并列的独立头部基础设施另建条。 |
| Theatre.js（https://www.theatrejs.com ，仓 `theatre-js/theatre`，本轮 12,975 星，Apache-2.0，最近推送 2024-08-14 09:20 ET） | 官方站点仍可打开，星标也达到 10k+，但最近推送早于 2025-11-11，不满足本阶段「仍在维护」条件，不入库。 |
| airbnb/lottie-web（本轮 32,396 星，MIT，最近推送 2025-09-01 05:01 ET） | 历史 Web 运行时星标高，但最近推送早于 2025-11-11，不满足「仍在维护」。`http://airbnb.io/lottie/` 重定向到 https://lottie.airbnb.tech/ ，正文几乎只有标题「Lottie Docs」，不足以为本条提供产品说明。 |
| LottieFiles/dotlottie-web（https://lottiefiles.com/dotlottie ，本轮 942 星，MIT，最近推送 2026-11-11 05:14 ET）以及 https://www.dotlottie.io/ | 官方页确认 dotLottie 是由 LottieFiles 支持的开源动画封装格式与当前 Web 播放器（`@lottiefiles/dotlottie-web`，MIT）。主仓仍在维护，但 942 星未达到本阶段「明显处于头部」的星标线，不作为独立新项。格式本身的行业位置记入线索，不降低已核实的维护事实。 |
| Rive（https://rive.app/ ；运行时仓如 `rive-app/rive-react` 1,187 星、`rive-app/rive-wasm` 1,021 星，均 MIT 且近 30 天内有推送） | 官网确认官方产品为 agent-native 2D and 3D engine，并提供 MIT 开源运行时。没有与 Three.js / PixiJS / GSAP 同量级的单一公开主仓；各运行时星标约为 1k 级，未达到本阶段 GitHub 头部星标线，不入库。 |
| Spline（https://spline.design/ ；仓 `splinetool/react-spline` 1,430 星，MIT，最近推送 2026-11-05 12:03 ET） | 官网确认官方产品是浏览器内 3D 设计工具，可发布到 Web / iOS / Android。公开运行时仓星标未达到本阶段头部线，不把商业编辑器本身或 React 运行时另建为头部开源基础设施条。 |
| Ark UI（https://ark-ui.com/ ，仓 `chakra-ui/ark`，本轮 5,462 星，MIT，最近推送 2026-11-11 00:39 ET） | 官方无样式、跨框架组件库，仍在维护，且官方写 Chakra UI v3 以其为底层之一。作为无样式 primitives，星标未明显达到本阶段已收录的 Radix / Base UI / React Aria 同类头部线，按任务要求「须明确达到头部标准」不入库。 |
| Zag.js（https://zagjs.com / http://zagjs.com ，仓 `chakra-ui/zag`，本轮 5,252 星，MIT，最近推送 2026-11-11 05:58 ET） | 官方有限状态机组件逻辑库，Ark UI 以其为底层。官方且仍在维护，但星标未明确达到本阶段头部线；对设计资产而言更偏底层逻辑，不另建条。 |
| Park UI（https://park-ui.com ，仓 `chakra-ui/park-ui`，2,382 星，最近推送 2026-04-10） | 官方组织下「built with Ark UI and Panda CSS」的预样式组件，属衍生套件，且维护间隔较长，不入库。 |
| Panda CSS（https://panda-css.com ，仓 `chakra-ui/panda`，6,250 星，最近推送 2026-11-09） | 官方 CSS-in-JS 框架。本阶段不把未达到明确头部线的通用样式编译工具当作设计资产新项。 |
| Ant Design Pro、ant-design-mobile、ant-design/x、ant-design-landing、ant-motion | 官方组织下的相邻产品或已停更项目（`ant-motion` 最近推送 2022-07-05）。本条只收 Ant Design 官方本体，不另建条。 |
| MUI X（`mui/mui-x`，5,876 星）、MUI Toolpad（已 archived）、mui-design-kits | 同一官方组织的相邻产品。本条只收 Material UI 核心库，不另建条。 |
| pixijs/pixi-react、BabylonJS/Editor、BabylonJS/BabylonNative、darkroomengineering 的其他包 | 官方生态或相邻工具，不把生态包当作独立头部基础设施。 |
| `@react-three/drei` 及其他 R3F 生态包 | 已在 `expansion-infra.md` 推迟，本轮仍不另建条。 |
| `awesome-shadcn-ui` 中长尾 kit / 主题 / 模板 | 按任务书留在第二阶段或发现线索，本轮不扫余量入库。 |

## 本轮未能稳定打开、或正文不足的页面

| URL | 情况 |
| --- | --- |
| https://docs.pixijs.com/ | WebFetch 返回 500；随后 `curl` 出现 TLS unexpected eof，无正文。已改用 https://pixijs.download/release/docs/index.html 与仓库 README。 |
| https://pixijs.com/8.x/guides/getting-started/installation | 本轮 HTTP 404。 |
| https://www.carbondesignsystem.com/developing/get-started/ | 第一次 WebFetch 超时。随后 `curl` 成功，并重定向到 https://www.carbondesignsystem.com/getting-started/developing/overview ，该页已作为正式依据。 |
| https://getbootstrap.com/docs/6.0/getting-started/introduction/ | WebFetch 返回 404。 |
| https://getbootstrap.com/docs/6.0/ | HTTP 200，但正文几乎只有「Bootstrap」，不足以作为 Bootstrap 6 的安装或组件说明。Bootstrap 6 的发布事实改用已打开的官网首页与 https://blog.getbootstrap.com/ ；稳定入门说明改用已打开的 v5.3 文档。 |
| https://animejs.com/documentation/ | 已打开，但正文几乎只有赞助商信息，缺少安装说明。已改用 https://animejs.com/documentation/getting-started/installation 。 |
| https://airbnb.io/lottie/ | 重定向到 https://lottie.airbnb.tech/ ，正文几乎只有「Lottie Docs」，不足以为 lottie-web 提供产品说明。 |
| `gh api repos/chakra-ui/ark-ui` | 404。官方主仓为 `chakra-ui/ark`。 |

## 权威性算法说明

与 `authority-scores.md` 同一套权重（30 / 25 / 20 / 15 / 10）和星标分档。被引用项：上述官方本体的官方文档本身即是该项目的标准入口时取 5；Lenis 另有 Locomotive Scroll 官方页将其写为底层，作为第二条官方出处。维护与规模：按本轮 `gh api` 星标定档，再按 2026-11-11 锚点微调（2026-10-12 及之后 +0.5；2025-11-11 之前 -1），且不超过 5。Material UI 本轮为 99,322 星，未按「约 100k+」定档 5，先按 20k+ 定档 4.5，再 +0.5。Carbon 为 9,614 星，未按 10k+ 定档，先按 5k+ 定档 3.5，再 +0.5，为 4.0。Headless UI 最近推送为 2026-04-13（ET），不加不减，维护与规模为 4.5。Lenis 出品方按独立工作室计 4，不因其官网自述「became the standard」升到 5。Babylon.js 本轮打开的 LICENSE 与 package.json 未写明公司版权，出品方类型记开源主导项目，不臆测归属。Bootstrap 文档项因 v6 文档页正文不足记 4，不因此改许可或出品方分项。

分项与一句依据见 `authority-scores.md` 本轮新增「第一阶段 E」各节。

## 本轮实际打开 / 调用的来源

- 清单去重：从 `/workspace/design-resource-atlas/index.html` 的 `window.ATLAS_DATA.sources` 抽出全部 82 个名称与网址、主仓，确认无碰撞。
- GitHub：`gh search repos`（`--owner ant-design|carbon-design-system|mui|chakra-ui|pixijs|theatre-js|rive-app|splinetool|LottieFiles|twbs|tailwindlabs` 等）以及针对候选主仓的 `gh api repos/...`（含 license 正文与 README）。
- Ant Design：https://ant.design/ ；https://ant.design/docs/react/introduce/ ；`gh api` `ant-design/ant-design`（README、LICENSE）。
- Carbon：https://www.carbondesignsystem.com/ ；https://www.carbondesignsystem.com/all-about-carbon/what-is-carbon/ ；https://www.carbondesignsystem.com/getting-started/developing/overview ；`gh api` `carbon-design-system/carbon`（README、LICENSE）。
- Material UI：https://mui.com/ ；https://mui.com/material-ui/ ；https://mui.com/material-ui/getting-started/ ；`gh api` `mui/material-ui`（README、LICENSE）。
- Motion 核对：https://motion.dev/ ；`gh api` `motiondivision/motion`（只补核，不建条）。
- Bootstrap：https://getbootstrap.com/ ；https://getbootstrap.com/docs/5.3/getting-started/introduction/ ；https://blog.getbootstrap.com/ ；`gh api` `twbs/bootstrap`（LICENSE）。v6 文档页见失败页表。
- Chakra UI：https://chakra-ui.com/ ；https://www.chakra-ui.com/docs/get-started/installation ；`gh api` `chakra-ui/chakra-ui`（LICENSE）。
- Headless UI：https://headlessui.com ；https://headlessui.com/react/menu ；`gh api` `tailwindlabs/headlessui`（README、LICENSE）。
- PixiJS：https://pixijs.com/ ；https://pixijs.download/release/docs/index.html ；`gh api` `pixijs/pixijs`（README、LICENSE）。`docs.pixijs.com` 未能打开，见上表。
- Babylon.js：https://www.babylonjs.com/ ；https://doc.babylonjs.com/ ；`gh api` `BabylonJS/Babylon.js`（README、license.md）。
- Anime.js：https://animejs.com ；https://animejs.com/documentation/getting-started/installation ；`gh api` `juliangarnier/anime`（README、LICENSE.md）。文档总目录页正文不足，见上表。
- Lenis：https://lenis.dev ；`gh api` `darkroomengineering/lenis`（README、LICENSE）。
- 未收录但已打开：https://scroll.locomotive.ca ；https://www.theatrejs.com ；https://ark-ui.com/ ；https://zagjs.com ；https://rive.app/ ；https://spline.design/ ；https://lottiefiles.com/dotlottie ；https://www.dotlottie.io/ ；以及对应主仓的 `gh api`。

本文件未开始深挖或填写洞察。
