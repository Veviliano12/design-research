# 第一阶段官方摄入（A 模型大厂 / B 平台设计体系）

调研日期：2026-11-11（America/New_York）  
对照准则：`research-criteria.md`  
对照任务书：`phase-1-plan.md`  
发现渠道一律记为 **官网 / 文档 / changelog**。出品方类型在官方站点自行声明归属时记 **大厂官方**。  
可信度一律「待诊断」，分析状态一律「待分析」，洞察一律「尚未形成洞察」。  
本轮只写 Markdown 证据，不改 `index.html`，不与 `visual-fx-atlas` 合并，不开始深挖。

星标、许可与 `pushed_at` 仅来自本轮 `gh api` 或已打开的官方页面；时间已换算为 America/New_York。无公开稳定主仓的，依据中写明「无稳定主仓」，维护与规模按低档，并结合本轮实际打开的官方更新记录保守计分。不编造未打开的价格、星标或技术细节。

## 总表（已核实新项）

| 名称 | 官网 | 发现渠道 | 出品方类型 | 主类 | 做什么 | 形态 | 技术栈（仅官网/仓已写明） | 权威性初评 | 许可 / 成本 | 可操作性 | 发现路径 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Apps SDK UI（OpenAI） | https://developers.openai.com/plugins/concepts/ui-guidelines | 官网 / 文档 / changelog | 大厂官方 | 设计系统 / 主题 / kits | OpenAI 官方的 ChatGPT Apps UI 指南，以及可选的 `@openai/apps-sdk-ui` 组件库，用于做与 ChatGPT 设计系统一致的卡片、轮播、fullscreen、PiP 等界面 | 官方文档 + 开源组件库 + Storybook；指南写有 Figma component library，本轮抓取未得到稳定超链接，不单列网址 | 官方文档与仓库 README：Tailwind、CSS variable design tokens、React；组件建在 Radix primitives 上。npm 写 React 18/19 与 Tailwind 4 | GitHub [openai/apps-sdk-ui](https://github.com/openai/apps-sdk-ui) 本轮 `gh api` 983 星，MIT，最近推送 2026-05-19 20:30（ET）。主页 https://openai.github.io/apps-sdk-ui/ 。npm `@openai/apps-sdk-ui` 0.2.2，License MIT，页面 Updated 2026-08-13 17:18（ET）。总分 4.3，四星 | MIT © OpenAI；免费开源。Figma 库链接本轮未核到稳定 URL | 可直接按官方指南与组件库做 ChatGPT App UI，不是通用营销 blocks 目录 | 第一阶段 A：打开 OpenAI 官方开发者文档 |
| Claude Artifacts / Claude Design（Anthropic） | https://claude.com/product/design | 官网 / 文档 / changelog | 大厂官方 | 生成式 / AI 搭建 | Anthropic 官方的 Artifacts 与 Claude Design：在对话中生成并编辑设计、原型、文档、幻灯片等，可导入团队设计系统，并交接给 Claude Code | 官方产品页 + 新闻稿 + Help Center + Claude Code 文档。不是公开的 Anthropic 自有组件库 | 产品页写可从 GitHub、设计文件或代码库导入设计系统；可导出 PPTX、PDF、HTML。本轮未把底层实现栈写成结论 | 无稳定主仓。官方新闻 [Introducing Claude Design](https://www.anthropic.com/news/claude-design-anthropic-labs) 标注 Apr 17, 2026；Help Center 文首写 Updated over a week ago。总分 3.8，四星 | 产品页 FAQ：Claude Design、Claude Slides、Claude Docs 含在含 Free 在内的各计划中；部分能力（如 Claude Motion、部分 Data / Sheets / Whiteboards）按计划或管理员开关。定价页全文未打开，标未核实 | 可作官方生成式设计 / Artifacts 产品与文档输入，不是可复制的官方组件套件 | 第一阶段 A：打开 Anthropic / Claude 官方产品与文档 |
| Gemini 官方设计与生成式 UI 文档（Google） | https://design.google/library/gemini-ai-visual-design | 官网 / 文档 / changelog | 大厂官方 | agent / 生成式 UI | Google 官方关于 Gemini 视觉设计与生成式 UI 的文档：Gemini 应用视觉语言（渐变、形状、有意识动效等）、生成式 UI 在 Gemini 应用与 Search AI Mode 的研究/产品说明，以及 Google AI Studio 的 UI 设计指南 | 官方设计文章 + Google Research 博文 + AI Studio 教程。不是面向第三方的公开 Gemini 组件库 | AI Studio 文中写到 Build、Edit、Design Variations、Google Fonts、`generate_image` / Nano Banana 等官方工具名。不把未打开的实现细节补全 | 无稳定主仓。已打开的注明日期页面：Research 博文 November 18, 2025；AI Studio 文 Published September 16, 2026。设计文章页未显示可核发布日期。总分 3.7，四星 | 上述页面可免费阅读；未见可复用的官方组件许可证。不编造版权条款以外的许可 | 可作官方设计主张与生成式 UI 说明，不能当公开组件 kit 使用 | 第一阶段 A：打开 Google / Gemini 官方设计与生成式 UI 页面 |
| Microsoft 365 Copilot MCP apps UX 指南 | https://learn.microsoft.com/en-us/microsoft-365/copilot/extensibility/plugin-mcp-apps-ui-guidelines | 官网 / 文档 / changelog | 大厂官方 | agent / 生成式 UI | Microsoft Learn 上的官方 UX 指南，说明如何在 Microsoft 365 Copilot 对话中做 MCP 应用的 inline widget 与可选 side-by-side 界面，并要求对齐 Fluent 2 | 官方文档。视觉层指向 Fluent 2，不另建一条 Fluent 副本 | 指南写使用 Copilot-aligned Fluent 2 组件、spacing、typography 与 tokens；app card 全局 padding 写 24 pixels | 无稳定主仓（本项按指南文档计，不以 Fluent 仓抬分）。总分 4.0，四星 | Microsoft Learn 文档可免费阅读。本轮未打开单独的许可/定价页 | 可直接作为 Copilot 扩展界面规范；实现组件以 Fluent 2 为准 | 第一阶段 A：核 Microsoft Copilot 是否有官方设计 / UI 文档 |
| Apple Human Interface Guidelines | https://developer.apple.com/design/human-interface-guidelines/ | 官网 / 文档 / changelog | 大厂官方 | 设计系统 / 主题 / kits | Apple 官方跨平台界面指南，以及配套的 Apple Design Resources（Figma / Sketch 等 UI Kit、SF Symbols、字体、产品外形等）。含 Generative AI 专页 | 官方指南 + 官方设计资源 / UI kits + What’s new 更新日志 | 指南覆盖 iOS、iPadOS、macOS、tvOS、visionOS、watchOS 等。本轮不把未打开的实现框架写成技术栈结论 | 无稳定主仓。官方 [What’s new](https://developer.apple.com/design/whats-new/) 最近记录为 November 6, 2026（New product bezels；Updated Live Activities UI kits）。Generative AI 专页 changelog 最近为 June 8, 2026。总分 4.1，四星 | 页面写 Copyright © 2026 Apple Inc. All rights reserved。文档与 Design Resources 在 developer.apple.com 公开提供；不是开源许可证 | 可直接作为 Apple 平台设计规范与官方 UI Kit 输入 | 第一阶段 B：必查 Apple HIG |
| Material Design 3 | https://m3.material.io/ | 官网 / 文档 / changelog | 大厂官方 | 设计系统 / 主题 / kits | Google 官方开源设计系统 Material Design 3（含 M3 Expressive）：基础、样式、组件、设计 token，以及 Android / Flutter / Web 的实现资源 | 官方设计系统站点 + 设计指南 + 多平台开发资源 + 站点写明的 Figma M3 Design Kit | Get started 写有 Android、Flutter、Web 的开发资源。本轮成功打开的是官网与 Get started / Foundations，不以某一个实现仓代替设计系统本体 | 无单一稳定主仓。官网首页写 Material at Google I/O 2026，日期 May 19, 2026。总分 4.0，四星 | Get started 原文：All Material 3 content, guidelines, imagery, and resources are available under the Apache 2.0 or CC BY 4.0 license | 可直接作为跨平台设计系统与官方组件实现的输入 | 第一阶段 B：必查 Google Material Design |
| Fluent 2 Design System | https://fluent2.microsoft.design/ | 官网 / 文档 / changelog | 大厂官方 | 设计系统 / 主题 / kits | Microsoft 官方 Fluent 2 设计系统：设计原则、Figma UI kits，以及 React、Web Components、iOS、Android、Windows 等平台的 Fluent UI 实现说明 | 官方设计系统站点 + 多平台组件库 + 组件文档 / Storybook | 官方 Develop 页：Fluent UI React v9（`@fluentui/react-components`，React、TypeScript，Griffel CSS-in-JS）；另有 `@fluentui/web-components`、Fluent UI Apple、Fluent UI Android；Windows 体验指向 WinUI | 官方 Web/React 主仓 [microsoft/fluentui](https://github.com/microsoft/fluentui) 本轮 `gh api` 20,399 星，最近推送 2026-11-10 17:16（ET），主页 https://react.fluentui.dev/ 。另打开官方仓 `microsoft/fluentui-apple`（980 星，MIT，最近推送 2026-11-09 04:13Z）与 `microsoft/fluentui-android`（683 星，MIT，最近推送 2026-11-11 05:24Z），维护与规模只按 `microsoft/fluentui` 计。总分 5.0，五星 | `microsoft/fluentui` 的 LICENSE 文件正文为 MIT License（Copyright (c) Microsoft Corporation），并注明 fonts and icons 另受 https://aka.ms/fluentui-assets-license 约束。GitHub SPDX 字段为 NOASSERTION，以打开的 LICENSE 正文为准。该资产许可页本轮未再打开 | 可直接作为 Microsoft 平台设计系统与官方组件库输入 | 第一阶段 B：必查 Microsoft Fluent |
| HarmonyOS 设计体系 | https://developer.huawei.com/consumer/cn/design/ | 官网 / 文档 / changelog | 大厂官方 | 设计系统 / 主题 / kits | 华为开发者联盟上的 HarmonyOS / HarmonyOS NEXT 官方设计体系：设计理念、设计原则、色彩 Token 规范，以及字体、图标、模板等设计资源 | 官方设计中心 + 设计指南 + 可下载设计资源 | 本轮未把未打开的应用框架写成技术栈结论。色彩文档为 HarmonyOS NEXT 的 Token 分层说明 | 无稳定主仓。`developer.harmonyos.com/cn/design/` 本轮 301 到上述华为设计中心。英文入口 https://developer.huawei.com/consumer/en/design/ 标题为 HarmonyOS NEXT Design - HUAWEI Developers，正文本轮几乎未稳定抓取。设计资源页可见条目日期含 2022/07/04 与 2024/01/23；指南正文本身未显示可核的最近更新日期。总分 3.7，四星 | 官方文档可免费阅读。设计资源页有「使用华为帐号快速登录」字样。本轮未见 Apache / MIT 一类开源许可证声明 | 可直接作为鸿蒙 / HarmonyOS 官方设计规范与资源输入 | 第一阶段 B：必查鸿蒙 / HarmonyOS |
| Astryx（Meta） | https://astryx.atmeta.com/ | 官网 / 文档 / changelog | 大厂官方 | 设计系统 / 主题 / kits | Meta 官方开源设计系统 Astryx：面向人与 agent 的可主题化组件、模板与 CLI / MCP 文档。官网写 Currently in Beta | 开源设计系统 + 官方站点 + GitHub | 官网写 Built on React 19+ and StyleX | GitHub [meta/astryx](https://github.com/meta/astryx) 由官网链出，本轮 `gh api` 24,050 星，MIT，最近推送 2026-11-11 05:35（ET），主页 http://astryx.atmeta.com 。官方博文 [Introducing Astryx by Meta](https://astryx.atmeta.com/blog/introducing-astryx) 标注 Jun 18, 2026。总分 4.9，五星 | MIT（`gh api` license.spdx_id）。官网标明 Beta | 可直接作为开源设计系统 / 组件与主题输入；官方标明 Beta | 第一阶段 A 同步核 Meta 官方设计系统 |
| Designing Grok Bot（x.ai） | https://x.ai/news/designing-grok-bot | 官网 / 文档 / changelog | 大厂官方 | agent / 生成式 UI | 发布在 x.ai 上的官方设计长文，说明 Grok Bot 的界面对象（Bots、Chats、Prompts、Tools、Artifacts）、名册与存在感、Bot 自己的电脑、inline cards / widgets，以及减少操作界面的设计取舍 | 官方设计文章，不是公开组件库或持续更新的规范门户 | 未在文中核到可复用的官方组件技术栈，不补写 | 无稳定主仓。本轮打开的正文未见可核发布日期。页脚写 © 2026 SpaceX Super Intelligence LLC，标题亦带 SpaceXSI；域名与 og:url 仍为 x.ai。按该官方页面收录，不另臆测公司关系。总分 3.3，三星 | 页脚版权声明如上；不是开源组件许可 | 可作官方界面设计论述，不能当可安装的设计系统或组件 kit | 第一阶段 A 同步核 xAI 是否有官方设计 / UI 文档 |

## 内容勾选（概览，未做深挖）

主类已在上表。兼有情况只按本轮打开的官方页面记录，不补未看到的类。

| 名称 | blocks | 动效 | components | flows | 图标 / 插画 | 色板 / 字体 | 模板 / 落地页 | 设计系统 / 主题 / kits | 生成式 / AI 搭建 | agent / 生成式 UI |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Apps SDK UI（OpenAI） | 无 | 无 | 是 | 部分（display modes 与多步 fullscreen 工作流） | 部分（系统图标与 imagery 规则） | 是（系统色、字体、spacing） | 无 | 是 | 无 | 是 |
| Claude Artifacts / Claude Design（Anthropic） | 无 | 部分（产品家族含 Claude Motion；本轮未打开 Motion 专页） | 部分（可导入并使用团队组件，不是 Anthropic 公开组件库） | 部分（可做 clickable flow） | 无 | 部分（导入或生成设计系统中的色与字体） | 部分（落地页、一页纸等生成结果） | 部分（导入/管理团队设计系统，不是 Anthropic 自有对外设计系统） | 是 | 部分 |
| Gemini 官方设计与生成式 UI 文档（Google） | 无 | 是（官方视觉设计文写明 intentional motion） | 无 | 无 | 部分（官方插画/渐变/形状系统论述） | 部分（视觉语言论述，不是可下载色板包） | 无 | 无 | 部分（AI Studio 设计教程） | 是 |
| Microsoft 365 Copilot MCP apps UX 指南 | 无 | 无 | 部分（要求使用 Fluent 2 组件） | 部分（conversation-first、inline / side-by-side） | 部分（指向 Fluent 2 Iconography） | 部分（指向 Fluent 2 Color / Typography） | 无 | 部分（对齐 Fluent 2，本项不是 Fluent 本体） | 无 | 是 |
| Apple Human Interface Guidelines | 无 | 是（指南含 Motion 等页；What’s new 有相关更新） | 是（组件规范 + 官方 UI Kit） | 部分 | 是（SF Symbols、图标与插画相关资源） | 是（系统字体、颜色指南） | 无 | 是 | 部分（官方 Generative AI 专页） | 部分 |
| Material Design 3 | 无 | 是（Get started 写 M3 Expressive 的 motion physics system） | 是 | 部分（Foundations 含 layout / interaction） | 是（站点含 icons 等样式系统） | 是（color、type、tokens） | 无 | 是 | 无 | 无 |
| Fluent 2 Design System | 无 | 无（本轮未打开专门的 motion 规范页，不勾「是」） | 是 | 部分 | 是（设计站 Resources 含 icon 工具；LICENSE 亦提及 icons） | 是 | 无 | 是 | 无 | 无 |
| HarmonyOS 设计体系 | 无 | 部分（设计理念页写「动效流畅而生动」；本轮未打开动效专页） | 部分（理念与色彩文档涉及系统组件；本轮未打开完整组件目录） | 部分 | 是（设计资源含图标库） | 是（色彩 Token 专页 + HarmonyOS Sans 等字体资源） | 部分（资源页写界面模版） | 是 | 无 | 无 |
| Astryx（Meta） | 无 | 部分（介绍文写可在 token 层自定义 motion；本轮未打开 motion 专页） | 是（介绍文写 150+ accessible components） | 无 | 无 | 是（主题 / token：color、typography、radius、motion） | 是（官网写 ready-to-ship templates） | 是 | 部分（agent-ready docs / CLI / MCP） | 部分 |
| Designing Grok Bot（x.ai） | 无 | 部分（文中有 avatar motion system 论述） | 部分（inline cards / widgets 论述，不是开源组件库） | 部分 | 部分（Bot avatar 视觉系统论述） | 无 | 无 | 无 | 无 | 是 |

## 已查但不写入正式表，或未能作为独立新项的对象

| 对象 | 结论 |
| --- | --- |
| OpenAI ChatGPT Canvas 作为独立设计体系 | 官方 UI 指南仅在 fullscreen 用例中提到 “a rich editing canvas”，本轮未打开单独的 Canvas 设计系统或组件库，不另建条。 |
| Anthropic 自有对外视觉设计系统 / 组件 kit | 打开的官方材料是 Artifacts / Claude Design 产品与文档，以及如何导入「你的」设计系统。本轮没有打开一份 Anthropic 自有的、可供第三方实现的公开设计系统或组件库。GitHub 上的官方 frontend-design skill 未作为独立来源入库（它是生成指导，不是设计系统站点）。 |
| docs.x.ai Theming（https://docs.x.ai/build/features/theming） | 已打开。内容是 Grok CLI / 终端主题（`/theme`、GrokNight、GrokDay 等），不是产品设计系统或界面规范，不入库。 |
| x.ai Brand Guidelines（https://x.ai/legal/brand-guidelines） | 本轮请求返回 HTTP 403，未能打开。 |
| 华为文档中心 UX 指南总览 https://developer.huawei.com/consumer/cn/doc/design-guides/ux-guidelines-overview-0000001900422910 | 本轮 WebFetch 超时，随后 `curl` 响应 HTTP 403。已改用成功打开的设计中心、理念、原则、色彩与资源页。 |
| https://m3.material.io/develop | 本轮 WebFetch 返回空正文，不据此写实现状态。Get started 已覆盖 Android / Flutter / Web 开发资源入口。 |
| https://developer.apple.com/design/human-interface-guidelines/ （HTML 目录）与 https://developer.apple.com/design/human-interface-guidelines/generative-ai/ | HTML 目录本轮几乎无可用正文；已改用可打开的 `.md` 页面（Getting started、Generative AI）以及 Design 总入口、What’s new、Design Resources。 |
| https://developer.huawei.com/consumer/en/design/ | 已打开，标题为 HarmonyOS NEXT Design - HUAWEI Developers，正文几乎未稳定抓取；中文设计中心与指南页作为主要依据。 |
| https://openai.github.io/apps-sdk-ui/ 与 https://react.fluentui.dev/ | 均已打开。Storybook 出现 “No Preview”，但页面仍有设计系统 / 组件库介绍正文，可作为文档入口，不作为组件预览失败的否定依据。 |
| Microsoft Learn 上其它 Copilot / Agents 设计页（检索曾出现 human-centered design 等） | 本轮未打开全文，不写入来源，也不当依据。 |
| Apple 作为「模型大厂」的独立条目 | Apple Intelligence / Generative AI 官方设计要求已写在 HIG 的 Generative AI 专页中，不与 HIG 重复建条。 |

## 权威性算法说明

与 `authority-scores.md` 同一套权重（30 / 25 / 20 / 15 / 10）和星标分档。被引用项：上述官方体系在官方站点本身即是该类标准入口时取 5；Grok Bot 一文是官方设计长文而非持续规范门户，取 4。维护与规模：有官方主仓的按本轮 `gh api` 星标定档，再按 2026-11-11 锚点微调（2026-10-12 及之后 +0.5；2025-11-11 之前 -1）。无稳定主仓的先按低档 1 或 0.5，再用本轮实际打开的官方更新记录保守微调，且不超过该规则上限。Material Design 3 的实现分散在多平台，不以某一个实现仓代替设计系统本体。Fluent 2 的维护与规模只按官方 Web/React 仓 `microsoft/fluentui` 计。

分项与一句依据见 `authority-scores.md` 本轮新增行。

## 本轮实际打开 / 调用的来源

- OpenAI：https://developers.openai.com/plugins/concepts/ui-guidelines 及其 `.md`；https://developers.openai.com/plugins/build/chatgpt-ui ；https://github.com/openai/apps-sdk-ui（`gh api`）；https://openai.github.io/apps-sdk-ui/ ；https://www.npmjs.com/package/@openai/apps-sdk-ui 。
- Anthropic / Claude：https://www.anthropic.com/news/claude-design-anthropic-labs ；https://claude.com/product/design ；https://claude.com/features/artifacts ；https://support.claude.com/en/articles/14604397-set-up-your-design-system-in-claude-design ；https://code.claude.com/docs/en/artifacts 。
- Google / Gemini：https://design.google/library/gemini-ai-visual-design ；https://design.google/library/the-next-interface-gemini ；https://research.google/blog/generative-ui-a-rich-custom-visual-interactive-user-experience-for-any-prompt/ ；https://aistudio.google.com/learn/ai-ui-design-google-ai-studio 。
- Microsoft Copilot：https://learn.microsoft.com/en-us/microsoft-365/copilot/extensibility/plugin-mcp-apps-ui-guidelines 。
- Apple：https://developer.apple.com/design/ ；https://developer.apple.com/design/whats-new/ ；https://developer.apple.com/design/resources/ ；https://developer.apple.com/design/human-interface-guidelines/getting-started.md ；https://developer.apple.com/design/human-interface-guidelines/generative-ai.md 。另尝试了 HIG HTML 目录与 `/generative-ai/`，正文不足，已改用 `.md`。
- Material：https://m3.material.io/ ；https://m3.material.io/foundations ；https://m3.material.io/get-started 。https://m3.material.io/develop 本轮无可用正文。
- Fluent：https://fluent2.microsoft.design/ ；https://fluent2.microsoft.design/get-started/develop ；https://fluent2.microsoft.design/design-principles/ ；https://react.fluentui.dev/ ；`gh api` `microsoft/fluentui`、`microsoft/fluentui-apple`、`microsoft/fluentui-android`；并打开 `microsoft/fluentui` 的 LICENSE 文件正文。
- HarmonyOS：https://developer.huawei.com/consumer/cn/design/ ；https://developer.huawei.com/consumer/en/design/ ；https://developer.huawei.com/consumer/cn/design/concept/ ；https://developer.huawei.com/consumer/cn/doc/doccenter-ux-design/ux-guidelines-overview-0000001900378248 ；https://developer.huawei.com/consumer/cn/doc/doccenter-ux-design/design-concepts-0000001795698445 ；https://developer.huawei.com/consumer/cn/doc/doccenter-ux-design/color-0000001776857164 ；https://developer.huawei.com/consumer/cn/design/resource-V1/ 。`https://developer.harmonyos.com/cn/design/` 301 至中文设计中心。https://developer.huawei.com/consumer/cn/doc/design-guides/ux-guidelines-overview-0000001900422910 未能打开（超时 / 403）。
- Meta：https://astryx.atmeta.com/ ；https://astryx.atmeta.com/blog/introducing-astryx ；`gh api` `meta/astryx`。
- x.ai：https://x.ai/news/designing-grok-bot ；https://docs.x.ai/build/features/theming 。https://x.ai/legal/brand-guidelines 返回 403。

本文件未开始深挖或填写洞察。
