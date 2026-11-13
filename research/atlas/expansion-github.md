# GitHub 渠道扩搜清单（awesome-shadcn-ui 对照，第一批核实）

调研日期：2026-11-11（America/New_York）  
对照准则：`research-criteria.md`  
起点清单：`seed-inventory.md`  
X 扩搜：`expansion-x.md`（本文件不覆盖已有条目）  
渠道任务计划：`channel-tasks.md`

本轮按排队的 GitHub 对照入口 [birobirobiro/awesome-shadcn-ui](https://github.com/birobirobiro/awesome-shadcn-ui) 逐条筛选后核实。观测时该仓 **20,806** 星，MIT，最近推送 2026-11-10 15:53（ET），主页 https://awesomeshadcn.dev/ 。发现渠道记为 **GitHub**（经该高星 awesome 列表进入）；引用分项按「稳定出现在高质量合集」计。已在起点或 `expansion-x.md` 中的名称一律跳过。星标、许可、`pushed_at` 均来自本轮 `gh api`，时间已换算为 America/New_York。可信度一律「待诊断」，分析状态一律「待分析」，洞察一律「尚未形成洞察」。不编造未打开的定价与技术细节。

筛选原则是质量优先：优先收录官网与主仓可核、且明显提供 blocks / 动效 / 组件或相邻主类的来源；不把低星、单组件 demo 或星标约 150 以下的套件批量写入正式表。

## 总表（已核实新项）

| 名称 | 官网 | 发现渠道 | 出品方类型 | 主类 | 做什么 | 形态 | 技术栈（仅官网/仓已写明） | 权威性初评 | 许可 / 成本 | 可操作性 | 发现路径 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| assistant-ui | https://www.assistant-ui.com/ | GitHub | 付费产品公司 | agent / 生成式 UI | AI agent 前端库：聊天 primitives 与 runtime，适配多种后端 | 开源库 + Cloud / 定价页（价格未打开） | React；亦提 React Native、Ink、Vue。页内写 AI SDK / LangGraph / LangChain / Mastra 适配 | GitHub [assistant-ui/assistant-ui](https://github.com/assistant-ui/assistant-ui) 13,057 星，MIT，最近推送 2026-11-11 05:18（ET）。页脚写 © 2026 AgentbaseAI Inc.；首页写 Backed by Combinator。总分 4.0，四星 | MIT 清楚；Cloud / 定价页未打开，标未核实 | 可直接做 agent 聊天界面，不是营销 blocks 或高视效展廊 | [awesome-shadcn-ui](https://github.com/birobirobiro/awesome-shadcn-ui) Libs and Components：assistant-ui |
| Plate | https://platejs.org/ | GitHub | 开源主导项目 | components | 可拼装的富文本编辑器框架，含 AI 编辑器示例与 shadcn 组件起点 | 开源框架 + 文档；另有 Templates（含 pro.platejs.org，未打开） | 文档与 README 写 Plate CLI / shadcn/ui；安装示例为 `npx shadcn@latest add @plate/editor-ai` | GitHub [udecode/plate](https://github.com/udecode/plate) 16,697 星，license 字段 NOASSERTION（README 徽章写 MIT，以仓库文件为准），最近推送 2026-11-11 03:34（ET）。总分 4.0，四星 | SPDX 字段未解析；Templates / Pro 价格未核实 | 可直接当编辑器 / 编辑器组件资产 | 同上列表：plate |
| tweakcn | https://tweakcn.com/ | GitHub | 独立作者 / 工作室 | 设计系统 / 主题 / kits | 面向 Tailwind CSS 与 shadcn/ui 的可视化主题编辑器，带预设与自定义 | 开源主题编辑 / 生成工具 | README：visual theme editor for Tailwind CSS & shadcn/ui。本轮官网多为客户端渲染，正文未稳定抓取 | GitHub [jnsahaj/tweakcn](https://github.com/jnsahaj/tweakcn) 10,536 星，Apache-2.0，最近推送 2026-09-03 13:06（ET）。作者账号线索为 X @iamsahaj_xyz（README 徽章）。总分 4.0，四星 | Apache-2.0；是否另有付费档本轮未打开定价页，标未核实 | 可直接导出/应用主题，不是 block 目录 | 同上列表 Colors and Customizations：tweakcn（亦为 X 扩搜未决名） |
| Vaul | https://vaul.emilkowal.ski/ | GitHub | 独立作者 / 工作室 | components | React 抽屉（drawer）组件 | 开源单组件库 | React（官网文案） | GitHub [emilkowalski/vaul](https://github.com/emilkowalski/vaul) 8,709 星，MIT，最近推送 2025-10-03 15:25（ET），公开仓超过约 1 年无明显更新。总分 3.7，四星 | MIT，免费 | 可直接当抽屉组件；注意公开仓相对停更 | 同上列表：vaul |
| Number Flow | https://number-flow.barvian.me/ | GitHub | 独立作者 / 工作室 | 动效 | 数字滚动/过渡动画组件，多框架 | 开源组件 | 站点提供 React 包 `@number-flow/react`；仓库说明亦覆盖 Vue、Svelte、TS/JS | GitHub [barvian/number-flow](https://github.com/barvian/number-flow) 7,794 星，MIT，最近推送 2026-09-20 09:51（ET）。官网写 Built by Max Barvian。总分 4.1，四星 | MIT，免费 | 可直接当动效数字组件，不是 blocks | 同上列表 Animations：number-flow |
| Inspira UI | https://inspira-ui.com/ | GitHub | 开源主导项目 | 动效 | 面向 Vue / Nuxt 的可复制动效组件集，README 写明借鉴 Aceternity UI 与 Magic UI，并含自有组件 | 开源可复制组件集 | Vue、Nuxt（仓库 README） | GitHub [unovue/inspira-ui](https://github.com/unovue/inspira-ui) 5,088 星，MIT，最近推送 2026-10-17 15:13（ET）。本轮官网几乎无可用正文（重度客户端）。总分 4.0，四星 | MIT，免费 | 可直接当 Vue 动效组件；核验主要靠仓库与 README | 同上列表：inspira-ui |
| gluestack-ui | https://gluestack.io/ | GitHub | 付费产品公司 | components | 面向 Web 与 React Native 的复制式组件与 patterns 库 | 开源组件库 + Pro（pro.gluestack.io，未打开） | React、React Native、Tailwind CSS（NativeWind）；文档站已链出 | GitHub [gluestack/gluestack-ui](https://github.com/gluestack/gluestack-ui) 5,356 星，GitHub license 字段为空；README 写 Licensed under the MIT License, Copyright © 2026 GeekyAnts。最近推送 2026-09-02 05:49（ET）。另有 LinkedIn 公司页与 X @gluestack。总分 3.5，四星 | README 称 MIT，字段未解析；Pro 价格未核实 | 可直接当跨平台组件资产 | 同上列表：gluestack-ui |
| shadcn-admin | https://shadcn-admin.netlify.app/ | GitHub | 独立作者 / 工作室 | 模板 / 落地页 | 用 shadcn 与 Vite 做的管理后台 Dashboard UI（README 写明这不是 starter 模板） | 开源后台界面项目 / 示例 | Vite、shadcn/ui；README 列 sidebar、全局搜索、10+ pages、RTL 等 | GitHub [satnaing/shadcn-admin](https://github.com/satnaing/shadcn-admin) 16,655 星，MIT，最近推送 2026-09-10 18:30（ET）。演示站本轮可打开但正文很薄。总分 4.0，四星 | MIT，免费 | 可作后台界面参考或改造起点，不是 marketing blocks 库 | 同上列表相关项：shadcn-admin |
| Neobrutalism components | https://www.neobrutalism.dev/ | GitHub | 独立作者 / 工作室 | components | 建在 shadcn/ui 与 Base UI 上的新粗野主义风格组件、图表与星形装饰 | 开源组件集 + 文档 | React、Tailwind v4、shadcn/ui、Base UI（官网文案） | GitHub [ekmas/neobrutalism-components](https://github.com/ekmas/neobrutalism-components) 5,648 星，MIT，最近推送 2026-09-19 08:25（ET）。站点链到 X @samuelbreznjak。总分 3.7，四星 | MIT，免费 | 可直接当风格化组件资产 | 同上列表：neobrutalism-components |
| Animata | https://animata.design/ | GitHub | 独立作者 / 工作室 | 动效 | 可复制的动画 React 组件（官网写 157+），含背景、bento、按钮等分类 | 开源可复制组件 | React（官网） | GitHub [codse/animata](https://github.com/codse/animata) 2,997 星，MIT，最近推送 2026-11-03 11:01（ET）。总分 3.7，四星 | MIT；官网写 Free forever | 可直接当动效组件；部分分类接近 blocks，主类仍为动效 | 同上列表 Animations：animata |
| Tremor | https://www.tremor.so/ | GitHub | 付费产品公司 | components | 用于图表与仪表盘的复制式 React 组件（官网写 35+ 开源组件；另有 300+ Premium Blocks 文案） | 开源组件 + 付费 Blocks / Templates（价格未打开） | React、Tailwind CSS、Radix UI；文案亦提 Recharts | GitHub [tremorlabs/tremor](https://github.com/tremorlabs/tremor) 3,698 星，Apache-2.0，最近推送 2025-10-10 09:08（ET），超过约 1 年。页脚写 © 2025 Tremor Labs, Inc.。首页有 “Tremor is joining Vercel” 声明，本轮未打开该公告全文，不据此改写出品方为 Vercel 官方。总分 3.1，三星 | 开源层 Apache-2.0 清楚；Premium Blocks 价格未核实 | 可直接当仪表盘 / 图表组件；付费 blocks 另议 | 同上列表：tremor |
| tablecn | https://tablecn.com/ | GitHub | 独立作者 / 工作室 | components | 建在 shadcn/ui 上的数据表 / 数据网格，含排序、筛选、分页、无限滚动与多人协作示例 | 开源组件 / 演示站 | README：Next.js、Tailwind、shadcn/ui、TanStack Table / DB。文档链到 https://diceui.com/docs/components/base/data-table 。作者即 Dice UI 的 sadmann7 | GitHub [sadmann7/tablecn](https://github.com/sadmann7/tablecn) 6,379 星，MIT，最近推送 2026-11-10 15:55（ET）。总分 4.0，四星 | MIT，免费 | 可直接当复杂表格组件 | 同上列表相关：sadmann7/tablecn（列表中或作 shadcn-table 等名） |
| Eldora UI | https://www.eldoraui.site/ | GitHub | 独立作者 / 工作室 | 动效 | 面向设计工程师的动画组件、特效、blocks 与模板；官网写 150+ 免费开源动画组件，定位 shadcn/ui 配套 | 开源登记处式组件 + templates / blocks | React、TypeScript、Tailwind CSS、Motion（官网） | GitHub [karthikmudunuri/eldoraui](https://github.com/karthikmudunuri/eldoraui) 1,977 星，MIT，最近推送 2026-09-26 13:39（ET）。页脚写 Built by Karthik Mudunuri。总分 3.3，三星 | MIT，免费 | 可直接当动效组件；blocks / 模板为兼有 | 同上列表 Animations：eldora-ui |
| Launch UI | https://www.launchuicomponents.com/ | GitHub | 独立作者 / 工作室 | blocks | 面向落地页与营销站的专业设计 blocks、组件与模板 | 开源 + 定价页（未打开） | React、shadcn/ui、Tailwind；文档列 Hero / Bento / Footer 等 sections，亦提 Figma | GitHub [launch-ui/launch-ui](https://github.com/launch-ui/launch-ui) 874 星，MIT，最近推送 2026-11-04 06:11（ET）。页脚写 © 2026 mikolajdobrucki。总分 3.2，三星 | MIT 清楚；定价页未打开 | 可直接当 marketing blocks / 模板 | 同上列表：launch-ui |
| Novel | https://novel.sh/ | GitHub | 独立作者 / 工作室 | components | Notion 风格的 WYSIWYG 编辑器，带 AI 自动补全 | 开源编辑器 | 仓库与标题：Notion-style WYSIWYG editor with AI-powered autocompletion | GitHub [steven-tey/novel](https://github.com/steven-tey/novel) 16,466 星，Apache-2.0，最近推送 2025-01-18 09:26（ET），公开仓超过约 1 年。总分 3.9，四星 | Apache-2.0，免费 | 可作编辑器资产；注意公开仓已停更一年以上 | 同上列表：novel |
| TWBlocks | https://www.twblocks.com/ | GitHub | 独立作者 / 工作室 | blocks | 可复制到 React / SaaS 站点的网站区块（Header、Hero、Feature、Pricing、Footer 等） | 开源可复制 blocks | React、shadcn-ui themes；Hero 文案写 Animated using Framer Motion | GitHub [tommyjepsen/twblocks](https://github.com/tommyjepsen/twblocks) 780 星，MIT，最近推送 2025-12-15 07:30（ET）。总分 3.3，三星 | MIT，免费 | 可直接当 marketing blocks | 同上列表：twblocks |
| background-snippets | https://bg.ibelick.com/ | GitHub | 独立作者 / 工作室 | 背景 / 材质 | 可复制的现代页面背景片段 | 开源 snippets 展示站 | 官网写 Tailwind CSS 与 Vanilla CSS | GitHub [ibelick/background-snippets](https://github.com/ibelick/background-snippets) 2,026 星，license 字段为空，最近推送 2024-09-26 10:05（ET），超过约 1 年。作者 @Ibelick（亦为 Motion Primitives 作者）。总分 3.1，三星 | SPDX 未解析；站点按免费复制推广 | 可直接复制背景代码；公开仓已久未更新 | 同上列表：ibelick/background-snippets |
| LiveKit Agents UI | https://livekit.com/products/agents-ui （https://livekit.io/ui 重定向至此） | GitHub | 大厂官方 | agent / 生成式 UI | LiveKit 官方的语音 agent 界面组件库，含多种音频可视化与会话 blocks，走 shadcn CLI | 开源官方组件（位于 components-js 的 shadcn 包） | React、shadcn；文档示例含 WebGL shader 可视化（Aura，文案称与 Unicorn Studio 合作） | 产品页指向 [livekit/components-js](https://github.com/livekit/components-js) 下 `packages/shadcn`。该仓 474 星，Apache-2.0，最近推送 2026-11-10 18:06（ET）。页脚 © LiveKit，地址 369 Sutter St, San Francisco, CA。产品页另展示 livekit/agents、livekit 主仓星标，本表维护与规模按 UI 所在仓 `components-js` 计，不拿主产品仓抬分。总分 3.9，四星 | Apache-2.0；平台定价页未作为本组件库价格打开，标未核实 | 可直接做语音 agent 界面；不是营销 blocks 目录 | 同上列表：agents-ui → livekit.io/ui |

## 内容勾选（概览，未做深挖）

主类已在上表。兼有情况只按本轮打开的官网/README 记录，不补未看到的类。

| 名称 | blocks | 动效 | components | 模板 / 落地页 | 背景 / 材质 | agent / 生成式 UI | 设计系统 / 主题 / kits |
| --- | --- | --- | --- | --- | --- | --- | --- |
| assistant-ui | 无 | 无 | 部分 | 无 | 无 | 是 | 无 |
| Plate | 无 | 无 | 是 | 部分（Templates，含未打开的 Pro） | 无 | 部分（AI 编辑器示例） | 无 |
| tweakcn | 无 | 无 | 无 | 无 | 无 | 无 | 是 |
| Vaul | 无 | 部分（抽屉动效，但是单组件） | 是 | 无 | 无 | 无 | 无 |
| Number Flow | 无 | 是 | 是（单组件） | 无 | 无 | 无 | 无 |
| Inspira UI | 部分（README 未在本轮逐条打开分类） | 是 | 是 | 无 | 部分（同类库常见，本轮未逐页勾选，不升为「是」） | 无 | 无 |
| gluestack-ui | 无 | 无 | 是 | 部分（Templates / starter kits 有链出，未深翻） | 无 | 无 | 部分 |
| shadcn-admin | 部分（后台页面片段） | 无 | 部分 | 是 | 无 | 无 | 无 |
| Neobrutalism components | 无 | 无 | 是 | 无 | 无 | 无 | 部分（风格体系 / 调色） |
| Animata | 部分（bento 等分类） | 是 | 是 | 无 | 部分（Background 分类） | 无 | 无 |
| Tremor | 部分（Premium Blocks 文案，价格未打开） | 无 | 是 | 部分 | 无 | 无 | 无 |
| tablecn | 无 | 无 | 是 | 无 | 无 | 无 | 无 |
| Eldora UI | 是（导航写 Blocks） | 是 | 是 | 部分（Templates） | 无 | 无 | 无 |
| Launch UI | 是 | 部分 | 部分 | 是 | 无 | 无 | 无 |
| Novel | 无 | 无 | 是 | 无 | 无 | 部分（AI 自动补全） | 无 |
| TWBlocks | 是 | 部分（Hero 文案含 Framer Motion） | 无 | 部分 | 无 | 无 | 无 |
| background-snippets | 无 | 部分（背景动效视具体片段） | 无 | 无 | 是 | 无 | 无 |
| LiveKit Agents UI | 部分（产品页有 agent session view 等 block 文档） | 部分（WebGL 可视化） | 是 | 无 | 无 | 是 | 无 |

Inspira UI 的「部分」背景未在本轮打开分类页核清，故不升为「是」。

## 已查但不写入正式表的名称

| 名称 | 原因 |
| --- | --- |
| OriginKit（originkit.dev 等） | 仍无稳定官方主产品仓可核星标。搜到的 [vellum-ai/originkit](https://github.com/vellum-ai/originkit) 为第三方 MCP（31 星），不能当官方主仓。维持未决。 |
| Zepa UI | 此前已因仓只有约 1 星未进正式表；本轮不重复收录。 |
| Solace UI | 未找到与产品对应的、可核验的官方主仓或高置信官网条目。 |
| Shadcraft | GitHub 名称检索本轮无可用高置信主仓命中。 |
| Shadcndesign | 检索命中多为无关或低星仓，未对齐到一个可核的官方产品。 |
| NexUI | 名称检索被大量无关 Next.js 项目淹没，未核到与该产品名对应的官方站 + 主仓。 |
| Ruixen UI | 找到 [ruixenui/ruixen.com](https://github.com/ruixenui/ruixen.com)（214 星，主页 https://ruixen.com，最近推送 2026-09-12）。未达本轮「质量优先、不收低权威套件」的收录线，暂不进正式表。 |
| Codevisuals | 检索仓星标极低（约 0–1），无法对应高质量官方产品。 |
| Libraries.dev | 名称检索无可用产品主仓。 |
| PatternCraft | 检索命中与设计资产库无关或星标约 0–1，未核到官方产品。 |
| Pace UI（paceui.com） | 在 awesome 登记处列表中出现。组织下多为模板 / GSAP 子集仓（例如 `paceui/gsap` 281 星），未见可代表主产品的高星稳定主仓，本轮不进正式表。 |
| BundUI（bundui.io） | `bundui/components` 411 星，低于本轮优先线。另，`bundui/shadcn-ui-kit` 主页指向已在起点名单中的 shadcnuikit.com，不作为新项。 |
| invoify、maily.to、autoform、spectrum-ui 等 | 已在 awesome 列表中见到且部分星标不低，但或是完整应用（发票工具）、或是对其他库的再汇编，本轮不优先于上述核心组件 / 动效 / blocks / agent UI 项。可留在后续队列。 |
| shadcn-admin-kit（marmelab） | 仓 [marmelab/shadcn-admin-kit](https://github.com/marmelab/shadcn-admin-kit) 1,147 星，MIT，最近推送 2026-11-05。文档页 https://marmelab.com/shadcn-admin-kit/ 本轮几乎无可用正文，暂不进正式表，列入待补打开。 |

## 权威性算法说明

与 `authority-scores.md` 同一套权重（30 / 25 / 20 / 15 / 10）和星标分档。被引用项对本批取 4：来源是 20,806 星的 awesome-shadcn-ui 列表。维护与规模按本轮 `gh api` 的产品主仓星标，再按 2026-11-11 锚点微调：约 30 天内（2026-10-12 及之后，ET）+0.5；超过约 1 年（2025-11-11 之前）-1。LiveKit Agents UI 虽然产品页展示了 LiveKit 主仓星标，维护与规模只按 UI 代码所在的 `livekit/components-js`（474 星）计。

分项与一句依据见 `authority-scores.md` 本轮新增行。

## 本轮实际打开 / 调用的来源（摘要）

- GitHub：`birobirobiro/awesome-shadcn-ui` README 与 `gh api`；上表各仓的 `stargazers_count` / `license.spdx_id` / `pushed_at` / 组织与 README（含 gluestack README 中的 MIT / GeekyAnts 声明）。
- 官网：assistant-ui.com、platejs.org、tweakcn.com（客户端渲染、标题可核）、vaul.emilkowal.ski、number-flow.barvian.me、inspira-ui.com（正文几乎不可用）、gluestack.io、shadcn-admin.netlify.app（正文很薄）、neobrutalism.dev、animata.design、tremor.so、tablecn.com、eldoraui.site、launchuicomponents.com、novel.sh、twblocks.com、bg.ibelick.com、livekit.io/ui → livekit.com/products/agents-ui。
- 未打开：各产品的完整定价结账页、Tremor「joining Vercel」公告全文、Plate Pro 模板店、Inspira 与 tweakcn 的深层文档页。

本文件未开始深挖或填写洞察。
