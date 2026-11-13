# 给视效分析线的取用说明

本文件说明：其他人或另一个 AI 如何从「设计资产来源库」拿走与视效相关的来源，去做自己的梳理和全景地图。

## 本库是输入，不是视效结论

- 路径：`/workspace/design-resource-atlas`
- 审阅界面：`index.html`
- 准则与打分依据：`research-criteria.md`、`authority-scores.md`
- 每条来源的已核实事实在 `seed-inventory.md`、`expansion-x.md`、`expansion-github.md`

请把本库当作**来源输入**：用这里已经核实的官网、出品方、内容勾选和权威性，去做你们自己的分析。不要把本库的概览句直接写成视效结论，也不要在证据不足时补写技术细节或洞察。

可信度由委托方标注；未经委托方说明，不要改可信度。权威分和依据若要修正，应回到来源库线，依据官方出处更新，而不是在分析稿里改写。

## 和 visual-fx-atlas 的关系

[visual-fx-atlas](https://github.com/Veviliano12/visual-fx-atlas) 是已有的视效对标与评测仓库。其 README 写明范围是材质、光、空间与深度、氛围、图像处理、字效，**不含动效**。

本库里大量相关来源的主类是动效、背景 / 材质，或高视效的生成式搭建。若视效线要做的全景地图包含这些网站和动效类资产，建议作为独立分析交付，不要直接改写 `visual-fx-atlas` 已定的范围定义。需要共用证据时，标明出处，避免两套地图 silently 合并。

## 建议怎么取用

1. 先读本文件和下表，再打开对应官网；事实以各扩搜文档和打分表为准。
2. 优先处理「核心」表：主类就是动效或背景 / 材质的来源。
3. 再看「动效是主内容之一、但主类不是动效」的来源（例如 Aura、Shaders 已在核心或本表、以及生成式高视效站点）。
4. 「仅部分涉及动效」的来源多为 blocks / 组件套件，适合当配角，不要当成视效全景的主体。
5. 来源库第一阶段还会补平台设计体系、模型大厂官方文档等头部来源；新条目入库后，以本文件的更新或增量通知为准。

当前清单共 64 条。下表是按内容勾选筛出的相关来源，时间为 2026-11-11（America/New_York），权威性来自已核实打分，分析状态均为待分析。

## 核心：主类为动效或背景 / 材质

| 名称 | 权威性 | 主类 | 动效 | 背景 / 材质 | 官网 |
| --- | --- | --- | --- | --- | --- |
| Motion+ | 5.0 / 5星 | 动效 | 是 | 无 | https://motion.dev/plus |
| React Bits | 4.4 / 4星 | 动效 | 是 | 是 | https://reactbits.dev/ |
| Magic UI | 4.2 / 4星 | 动效 | 是 | 无 | https://magicui.design/ |
| Number Flow | 4.1 / 4星 | 动效 | 是 | 无 | https://number-flow.barvian.me/ |
| Inspira UI | 4.0 / 4星 | 动效 | 是 | 部分 | https://inspira-ui.com/ |
| Shaders | 3.8 / 4星 | 动效 | 是 | 是 | https://shaders.com/ |
| Animata | 3.7 / 4星 | 动效 | 是 | 部分 | https://animata.design/ |
| UI Layouts | 3.6 / 4星 | 动效 | 是 | 无 | https://www.ui-layouts.com/ |
| Fancy Components | 3.5 / 4星 | 动效 | 是 | 无 | https://www.fancycomponents.dev/ |
| ThreeUI | 3.4 / 3星 | 动效 | 是 | 是 | https://threeui.com/ |
| Cult UI | 3.4 / 3星 | 动效 | 是 | 无 | https://www.cult-ui.com/ |
| SmoothUI | 3.4 / 3星 | 动效 | 是 | 无 | https://smoothui.dev/ |
| Motion Primitives | 3.3 / 3星 | 动效 | 是 | 无 | https://www.motion-primitives.com/ |
| Kokonut UI | 3.3 / 3星 | 动效 | 是 | 无 | https://kokonutui.com/ |
| Eldora UI | 3.3 / 3星 | 动效 | 是 | 无 | https://www.eldoraui.site/ |
| Animate UI | 3.1 / 3星 | 动效 | 是 | 部分 | https://animate-ui.com/ |
| background-snippets | 3.1 / 3星 | 背景 / 材质 | 部分 | 是 | https://bg.ibelick.com/ |
| beUI | 2.8 / 3星 | 动效 | 是 | 无 | https://beui.dev/ |
| Lightswind UI | 2.7 / 3星 | 动效 | 是 | 无 | https://lightswind.com/ |
| Aceternity UI | 2.6 / 3星 | 动效 | 是 | 无 | https://ui.aceternity.com/ |

## 动效勾选为「是」，但主类不是动效

这些更偏生成式搭建或交互，但官网内容明确包含动效，适合视效线一并查看。

| 名称 | 权威性 | 主类 | 动效 | 背景 / 材质 | 官网 |
| --- | --- | --- | --- | --- | --- |
| Aura | 2.5 / 3星 | 生成式 / AI 搭建 | 是 | 部分 | https://www.aura.build/ |
| Skiper UI | 2.4 / 2星 | 交互 / 微交互 | 是 | 无 | https://skiper-ui.com/ |
| Scrolltide | 2.3 / 2星 | 生成式 / AI 搭建 | 是 | 部分 | https://www.scrolltide.co/ |
| Cue / Cue Kit | 2.2 / 2星 | 生成式 / AI 搭建 | 是 | 无 | https://www.cuedesign.space/ |
| MotionSites | 1.7 / 2星 | 生成式 / AI 搭建 | 是 | 部分 | https://motionsites.org/ |

## 仅部分涉及动效（配角）

| 名称 | 权威性 | 主类 | 动效 | 背景 / 材质 | 官网 |
| --- | --- | --- | --- | --- | --- |
| LiveKit Agents UI | 3.9 / 4星 | agent / 生成式 UI | 部分 | 无 | https://livekit.com/products/agents-ui |
| Tailark | 3.7 / 4星 | blocks | 部分 | 无 | https://tailark.com/ |
| Vaul | 3.7 / 4星 | components | 部分 | 无 | https://vaul.emilkowal.ski/ |
| ReUI | 3.6 / 4星 | components | 部分 | 无 | https://reui.io/ |
| 8bitcn/ui | 3.6 / 4星 | components | 部分 | 无 | https://www.8bitcn.com/ |
| Kibo UI | 3.5 / 4星 | components | 部分 | 无 | https://www.kibo-ui.com/ |
| MVP Blocks | 3.3 / 3星 | blocks | 部分 | 无 | https://blocks.mvp-subha.me/ |
| TWBlocks | 3.3 / 3星 | blocks | 部分 | 无 | https://www.twblocks.com/ |
| affectUI | 3.2 / 3星 | agent / 生成式 UI | 部分 | 无 | https://www.affectui.com/ |
| Launch UI | 3.2 / 3星 | blocks | 部分 | 无 | https://www.launchuicomponents.com/ |
| 21st | 3.0 / 3星 | blocks | 部分 | 无 | https://21st.dev/ |
| HextaUI | 2.9 / 3星 | components | 部分 | 无 | https://hextaui.com/ |
| Shadcn Space | 2.8 / 3星 | blocks | 部分 | 无 | https://shadcnspace.com/ |
| BoardUI | 2.7 / 3星 | 设计系统 / 主题 / kits | 部分 | 无 | https://www.boardui.com/ |
| Shadcn Studio | 2.7 / 3星 | blocks | 部分 | 无 | https://shadcnstudio.com/ |
| Shadcnblocks | 2.3 / 2星 | blocks | 部分 | 无 | https://www.shadcnblocks.com/ |
| Shadcn UI Kit | 1.9 / 2星 | blocks | 部分 | 无 | https://shadcnuikit.com/ |

## 取用时请遵守

- 不编造；只用官网、官方文档、公开仓库或本库已写明的依据。
- 需要补充某个来源的出品方或分数时，反馈给来源库线，不要分叉改一份互不相同的清单。
- 你们的全景地图和分析结论，请写在自己的交付目录或仓库里，并引用本库来源名称与官方 URL。


## 第一阶段官方来源中与动效相关的增量（2026-11-11）

模型大厂与平台设计体系已入库 10 条，详见 `expansion-official.md`。其中与动效直接相关、可供视效线增量取用的是：

| 名称 | 权威性 | 主类 | 动效 | 官网 |
| --- | --- | --- | --- | --- |
| Gemini 官方设计与生成式 UI 文档（Google） | 3.7 / 四星 | agent / 生成式 UI | 是 | https://design.google/library/gemini-ai-visual-design |
| Apple Human Interface Guidelines | 4.1 / 四星 | 设计系统 / 主题 / kits | 是 | https://developer.apple.com/design/human-interface-guidelines/ |
| Material Design 3 | 4.0 / 四星 | 设计系统 / 主题 / kits | 是 | https://m3.material.io/ |
| Claude Artifacts / Claude Design（Anthropic） | 3.8 / 四星 | 生成式 / AI 搭建 | 部分 | https://claude.com/product/design |
| HarmonyOS 设计体系 | 3.7 / 四星 | 设计系统 / 主题 / kits | 部分 | https://developer.huawei.com/consumer/cn/design/ |
| Astryx（Meta） | 4.9 / 五星 | 设计系统 / 主题 / kits | 部分 | https://astryx.atmeta.com/ |
| Designing Grok Bot（x.ai） | 3.3 / 三星 | agent / 生成式 UI | 部分 | https://x.ai/news/designing-grok-bot |

「是」表示本轮打开的官方页面写明了动效规范或有意识动效；「部分」表示只在概述里提到，专页尚未打开。其余官方条目（OpenAI Apps SDK UI、Copilot UX 指南、Fluent 2）本轮未勾动效，不作为视效线的优先增量。


## 第一阶段基础设施中与动效相关的增量（2026-11-11）

任务 C 官方基础设施已入库 8 条。其中主类为动效、可供视效线优先取用的是：

| 名称 | 权威性 | 主类 | 动效 | 背景 / 材质 | 官网 |
| --- | --- | --- | --- | --- | --- |
| GSAP | 5.0 / 五星 | 动效 | 是 | 无 | https://gsap.com/ |
| Three.js | 5.0 / 五星 | 动效 | 是 | 是 | https://threejs.org/ |
| React Three Fiber | 5.0 / 五星 | 动效 | 是 | 部分 | https://r3f.docs.pmnd.rs/getting-started/introduction |

Tailwind CSS 的动效勾选为「部分」（utility 含 transitions / animations / 3D transforms，不是独立动效库），不作视效线优先增量。Radix UI、Base UI、React Aria、React Spectrum 本轮未把动效勾为「是」。


## 第一阶段 D / E 中与动效相关的增量（2026-11-11）

任务 D（X 专业账号产品）与任务 E（GitHub 头部官方项目）已入库。其中主类为动效、可供视效线优先取用的是：

| 名称 | 权威性 | 主类 | 动效 | 背景 / 材质 | 官网 |
| --- | --- | --- | --- | --- | --- |
| Canvas UI | 3.6 / 四星 | 动效 | 是 | 部分 | https://canvasui.dev/ |
| Vue Bits | 3.5 / 四星 | 动效 | 是 | 是 | https://vue-bits.dev/ |
| Transitions.dev | 3.4 / 三星 | 动效 | 是 | 无 | https://transitions.dev/ |
| Libraries.dev | 3.3 / 三星 | 动效 | 是 | 无 | https://libraries.dev |
| PixiJS | 5.0 / 五星 | 动效 | 是 | 是 | https://pixijs.com/ |
| Babylon.js | 5.0 / 五星 | 动效 | 是 | 是 | https://www.babylonjs.com/ |
| Anime.js | 5.0 / 五星 | 动效 | 是 | 无 | https://animejs.com |
| Lenis | 4.6 / 五星 | 动效 | 是 | 无 | https://lenis.dev |

Carbon Design System 的动效勾选为「是」（官方有 Motion 导航与 `@carbon/motion`），但主类是设计系统，可作为支持项，不必当作视效线优先增量。Theatre.js 与 airbnb/lottie-web 本轮因最近推送早于 2025-11-11，未入库。
