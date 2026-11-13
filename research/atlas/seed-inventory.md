# 设计资产起点清单（第一轮核实）

调研日期：2026-11-11（America/New_York）  
对照准则：`/workspace/design-resource-atlas/research-criteria.md`  
本轮只核实用户给出的起点名单：官网、做什么、内容类型、权威性来源。星标、许可和最近推送时间均来自本轮打开的 GitHub 页面或 `gh api`，不是搜索摘要。未核实的字段写「未核实」，不编造。

用户已提供并已去掉跟踪参数的两个地址：`https://efferd.com/`、`https://www.aura.build/`。二者均已打开主页核实。

## 本轮怎么聚类

起点大致分成五簇，彼此有重叠：

1. **shadcn blocks / 套件与登记处**：Efferd、Shadcnblocks、ReUI、Shadcn Space、Shadcn Studio、Shadcn UI Kit，以及官方 shadcn/ui 和社区目录 21st.dev。核心是可安装的区块、页面片段和组件源码。
2. **高视效动效 / 3D / shader 展示与可复制源码**：React Bits、ThreeUI、Motion+（Motion UI）、MotionSites，以及 Aura 里大量 WebGL / 粒子 / 沉浸式落地页。这是「高视效」优先要看的一簇。
3. **AI 页面生成 / 提示词目录**：Aura（导出 HTML + Tailwind + 原生 JS）、MotionSites（把带动效的整站/区块提示词贴进 Claude、Cursor、Lovable 等）。
4. **Agent / 生成式 UI 套件**：CopilotKit、affectUI、BoardUI（偏仪表盘 + agent 界面），以及名称有歧义的 OpenUI（见下文）。它们不是视效展廊。
5. **其他**：Hugeicons 是图标库；ARC UI 是 Lit 跨框架组件库；TailAdmin 是多技术栈后台模板。

「高视效动效」和「blocks」是本轮最重要的两个标签。前者看它是否以强动效、3D、WebGL、shader、沉浸式页面为主产品；后者看它是否提供可拼装的区块 / 页面片段（含 section 级营销块）。标「部分」表示有相关内容，但不是主产品或主要在付费层。

## 总表

| 名称 | 官网 | 做什么 | 主要内容 | 高视效 | blocks | 形态 | 技术栈 | 权威性（本轮观测） | 许可 / 成本 | 可操作性 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| ARC UI | https://arcui.dev/ | 面向真实产品界面的跨框架 Web Components 设计系统 | 169 个 dark-first 组件（布局、表单、导航、表格、App/Auth Shell 等）、设计令牌、主题工具 | 无 | 无 | 开源组件库（npm 包） | Lit；可生成 React / Vue / Svelte / Angular / Solid / Preact / HTML | GitHub [arclight-digital/arc-ui](https://github.com/arclight-digital/arc-ui) 7 星，MIT，最近推送 2026-11-10 11:47（ET）。npm：`@arclux/arc-ui`。GitHub 声量很低，官网仍在更新（本轮见到 v4.9.2，发布说明日期 2026-11-10） | MIT，免费 | 可直接当开发资产 |
| beUI | https://beui.dev/ | 给 React / React Native 的可复制动效组件库 | 官网同时写 React 组件 157、分类汇总 Components 56 / Blocks 24 / AI Agents 18 / Charts 17 / Casino 4；RN 73；Pro 另有 350+ 付费块和模板 | 是 | 是 | 开源登记处 + 可复制源码；另有付费 Pro | React 19、Tailwind CSS 4、Motion、shadcn 令牌；RN 用 Reanimated 等 | GitHub [starc007/ui-components](https://github.com/starc007/ui-components) 1,960 星，MIT，最近推送 2026-11-11 02:02（ET）。官网展示大量 X 推荐 | 免费层 MIT（含商用）；Pro 另有付费许可（Lifetime，具体价格本轮未打开定价页） | 可直接当设计/开发资产 |
| Motion+ | https://motion.dev/plus | Motion 团队的付费动效工具包：组件、示例、可视编辑、AI Kit | Motion UI：Gallery / Cursor / Carousel / Ticker / Curtains / 数字与文字动效等；约 50 个营销 sections；520+ 示例、110+ 教程 | 是 | 是 | 付费套件；开源核心库另见 Motion | React、Vue、JavaScript；sections 可走 shadcn registry | 开源库 [motiondivision/motion](https://github.com/motiondivision/motion) 35,067 星，MIT，最近推送 2026-11-11 01:52（ET）。官网 schema 列出 X：https://x.com/motiondotdev。定价页展示来自 Vercel、Sequoia 人士的推荐 | 核心库 MIT。Motion+ 单人一次性付款，官网 Product schema 标价 $399；团队为年付。示例与 API 写入站点后按 MIT 使用（转售能力需另议 Builder’s Licence） | 可直接当开发资产 |
| BoardUI | https://www.boardui.com/ | 面向仪表盘和 agent 界面的 React 设计系统，源码进入你的仓库 | 103 个组件（含 19 个图表）、10 个 Pro 模板、400+ 令牌、Figma；应用 blocks（Agent Chat、Data Table、Auth 等） | 部分 | 是 | 开源可复制 / CLI；另有付费 Pro | React 19、Tailwind CSS v4、React Aria、TypeScript；也兼容 shadcn CLI | GitHub [BoardUI/boardui](https://github.com/BoardUI/boardui) 1,145 星，MIT，最近推送 2026-10-02 17:59（ET） | 免费层 MIT；Pro 付费（具体价格本轮未打开定价页） | 可直接当开发资产 |
| React Bits | https://reactbits.dev/ | 面向创意前端的动画 React 组件与背景库 | 文字动画、组件、背景、微交互；含全息卡、WebGL 转场、3D 画廊、Fluid Glass 等。Pro：230 动画组件、300 个页面 blocks、300 个 app UI blocks、模板 | 是 | 部分 | 开源可复制 / CLI；付费 Pro | React；JS 或 TS；CSS 或 Tailwind；部分 Three/WebGL；可用 shadcn CLI | GitHub [DavidHDev/react-bits](https://github.com/DavidHDev/react-bits) 51,691 星，最近推送 2026-11-10 03:14（ET）。GitHub license 字段为 NOASSERTION；官网文档写 MIT + Commons Clause | 免费层可个人和商用，但不可转售/再分发组件本身（官网说明）。Pro 一次性：Starter $129，Pro $249（来自 https://pro.reactbits.dev/） | 可直接当资产；免费层几乎没有传统 marketing blocks，那部分在 Pro |
| ThreeUI | https://threeui.com/ | Three.js / WebGL 组件、模板、shader 与整页体验目录 | 大量 3D 场景、Hero、落地页、按钮、背景、完整产品站；Community 与 Pro 分层 | 是 | 是 | 开源 Community 目录 + 付费 Pro | Three.js、WebGL；亦有 `@designcodeio/threeui` React 包；不少条目是可适配的源码 | GitHub [MengTo/threeui](https://github.com/MengTo/threeui) 7,225 星，MIT，最近推送 2026-09-03 01:36（ET）。与 Aura 同属 Meng To / Design+Code 体系（Aura 定价页联系人 meng@designcode.io；ThreeUI 页面多次写 “Aura team collection”） | Community MIT；Pro $299 买断或 $199/年，含商用和后续更新 | 可直接复制/改造源码 |
| Shadcn UI Kit | https://shadcnuikit.com/ | 独立的 shadcn 付费套件：后台、模板、blocks、组件、Figma | 16 个后台、17 个 Web 应用模板、555 个 blocks、564 个免费组件、70 个 examples、动态插画、页面搭建和 MCP。官网声明与官方 shadcn/ui 无隶属关系 | 部分 | 是 | 付费套件（含部分免费项目） | Next.js 16、React 19、Tailwind CSS v4、shadcn/ui；支持 Radix 与 Base UI | 本轮未找到可核对其主产品星标的官方公开仓库。官网自称 120K+ 月浏览、2000+ 付费客户、4K+ 社交关注，并展示围绕 @TobyBelhome 的 X 讨论 | 一次买断、终身更新（具体档位价格本轮未打开定价页）；商用可以，不可拿去再卖成建设工具或模板市场；付费源码不可放进公开开源项目 | 可直接当资产 |
| TailAdmin | https://tailadmin.com/ | 多技术栈的 Tailwind 后台 / 仪表盘模板 | 500+ UI 元素、10 种仪表盘、邮件/聊天/发票等应用页、AI 生成类页面、图表与地图 | 无 | 部分 | 开源模板 | HTML、React、Next.js、Vue、Angular、Laravel + Tailwind；HTML 版含 Alpine.js | GitHub [TailAdmin/free-nextjs-admin-dashboard](https://github.com/TailAdmin/free-nextjs-admin-dashboard) 2,595 星，MIT，最近推送 2026-11-10 05:31（ET）；[HTML 版](https://github.com/TailAdmin/tailadmin-free-tailwind-dashboard-template) 2,393 星，最近推送 2026-10-29 02:15（ET）。官网自称 80k+ 用户 | MIT，官网按免费开源模板推广。是否另有付费版，本轮未打开定价页，未核实 | 可直接当后台模板资产 |
| 21st | https://21st.dev/ | 设计工程师社区的 React / shadcn 组件、模板、主题登记处 | 官网写 12,000+ 手写 UI；营销 blocks 与基础组件、模板、主题，以及 shaders / gradients；可发布或售卖 | 部分 | 是 | 社区登记处 + 会员 / AI 附加 | React、TypeScript、Tailwind、shadcn registry 格式 | GitHub [serafimcloud/21st](https://github.com/serafimcloud/21st) 5,557 星，MIT，最近推送 2025-05-28 11:55（ET），公开仓库明显落后于仍在运营的网站。相关 MCP 仓库 [21st-dev/magic-mcp](https://github.com/21st-dev/magic-mcp) 6,457 星 | 浏览免费；每天 2 次免费复制。会员可无限复制并获取付费模板。21st AI 为附加付费。具体会员价本轮未打开定价页 | 可直接安装或经 AI 提示词落入项目 |
| ReUI | https://reui.io/ | 面向 shadcn 的设计向平台：免费组件 + 付费 blocks / 图标 / 模板，并提供 MCP | 1,264 个免费组件、27 个自研 primitives（Data Grid、Gantt、Kanban 等）、678 个 Pro blocks、667 个付费动画图标（更高档）、多页模板、免费 Figma 设计系统 | 部分 | 是 | 开源登记处 + 付费 Pro / Ultimate | React、Tailwind、shadcn/ui、Radix、TanStack Table | GitHub [keenthemes/reui](https://github.com/keenthemes/reui) 4,046 星，MIT，最近推送 2026-10-16 06:15（ET）。官网展示署名为 shadcn 的评价：属于 trusted registries | 免费组件与 primitives 为 MIT。Pro 一次性 $249，Ultimate $499（官网定价与文案） | 可直接当资产 |
| Aura | https://www.aura.build/ | AI 落地页 / 多页站点生成工具，带大量高视效模板 | 定价页 FAQ 写 5,000+ 模板、2,800+ 组件、30,000+ 资产；含 WebGL 粒子 Hero、Aurora 背景、3D 产品页等。导出标准 HTML + Tailwind + 原生 JS，也可导出 Figma | 是 | 部分 | AI 生成 / 搭建工具 + 模板目录 | HTML、Tailwind CSS、原生 JavaScript；大量模板含 WebGL / Three.js | 未找到可核对本产品星标的官方仓库。与 ThreeUI 同属 Meng To / Design+Code 体系（见上）。用户对「视效动效、偏 H5 页面」的判断与官网和模板页相符 | 免费档仅个人使用、无 AI 额度。年付 Pro $12.50/月（$250/年），Max $25/月，Ultra $50/月；另有积分包 | 可导出真实代码直接用，也可当灵感和提示词来源 |
| affectUI | https://www.affectui.com/ | 面向 AI 产品和 SaaS 的 agent 界面 React 套件 | 177 项：组件、完整 screens、blocks、插画、Motion 效果。46 项免费。无 Tailwind、无动画库依赖，单文件 `.tsx` | 部分 | 是 | 开源子集 + 付费 Pro；shadcn CLI / MCP | React；经 shadcn CLI 安装 | GitHub [flohoeller/affectui](https://github.com/flohoeller/affectui) 704 星，MIT，最近推送 2026-11-10 08:17（ET） | 46 项 MIT 免费；其余为 Pro，一次性起价 $249 | 可直接当开发资产 |
| Efferd | https://efferd.com/ | shadcn blocks 登记处，强调给人和 agent 直接安装、换主题 | Auth、Hero、Dashboard、App Shell、Contact 等分组 blocks。定价页文案写 197+ blocks。支持 Radix 与 Base UI | 无 | 是 | 登记处；免费 + 一次买断 Pro / Team | React、shadcn/ui、Radix 或 Base UI | 当前产品未发现仍作为主仓库维护的公开 GitHub。旧仓库 [shabanhr/efferd-ui](https://github.com/shabanhr/efferd-ui) 149 星，主页指向 https://legacy.efferd.com，最近推送 2025-12-10 07:53（ET），license 字段 NOASSERTION。官网站内展示 @shadcn「Stunning. Amazing job.」、Guillermo Rauch「Clean」，以及「Trusted by people at」Vercel、Cal.com、Tesla 等（指「这些公司里的人」，不是已核实的公司采购） | 免费 blocks 可用。Pro $149、Team $399，一次买断含后续更新；付费块可商用，不可再卖成 UI kit / 模板 / 登记处 | 可直接当 blocks 资产。用户「跟 blocks 相关」的判断正确 |
| Shadcn Space | https://shadcnspace.com/ | 免费与 Pro 的 shadcn blocks、组件、模板 | 官网写 1,214+ 件：556+ blocks、118+ animated blocks、613+ 组件，另有模板、Figma kit、MCP、面向 v0 / Bolt / Lovable 的 Chrome 扩展 | 部分 | 是 | 开源 + 付费 Pro | React、TypeScript、Tailwind、Base UI 与 Radix、shadcn CLI | GitHub [shadcnspace/shadcnspace](https://github.com/shadcnspace/shadcnspace) 797 星，MIT，最近推送 2026-11-05 00:13（ET） | 免费 MIT；Pro 含更多 blocks / 模板 / 部分档位含 Figma，具体价格本轮未打开定价页 | 可直接当资产 |
| Shadcn Studio | https://shadcnstudio.com/ | 把 shadcn blocks、模板、主题生成器、搭建器和 Figma 收在一起的平台 | 1100+ blocks、30+ 模板、1000+ 组件变体、插画、主题生成器、拖拽搭建、MCP。免费档含 57 个 blocks 等 | 部分 | 是 | 免费层 + 付费套件与工具 | Next.js 16、Astro、Vite、React Router、TanStack Start、Tailwind v4、Base UI 与 Radix、Motion | GitHub [shadcnstudio/shadcn-studio](https://github.com/shadcnstudio/shadcn-studio) 1,988 星，license 字段 NOASSERTION，最近推送 2026-08-20 06:38（ET），公开仓库落后于仍在更新的网站。官网自称 1,600+ 开发者，并展示署名为 @shadcn 的「Nice.」 | 免费档可用。Pro 一次性 $249，含终身更新（官网） | 可直接当资产，也有搭建/主题工具 |
| Hugeicons | https://hugeicons.com/ | 给设计和开发用的图标库 | 60,000+ 图标；GitHub 说明写其中 6,000+ 免费。多种风格。Figma 插件及 React / Vue / Angular / Svelte / Flutter / RN / npm / CDN | 无 | 无 | 免费 + 付费 Pro 图标套件 | 多框架 SVG | GitHub [hugeicons/hugeicons](https://github.com/hugeicons/hugeicons) 1,230 星，MIT，最近推送 2026-11-11 01:53（ET） | 公开包 MIT；完整库为 Pro 付费（具体价格本轮未打开定价页） | 可直接当原子资产 |
| Shadcnblocks | https://www.shadcnblocks.com/ | 额外的 shadcn/ui blocks、组件与模板，体量最大的付费 block 集之一 | 2,866 个 blocks、2,241 个组件、22 个模板、39 个主题、Figma kit、219 页 Admin Kit、页面搭建器与 IDE 扩展。支持 Radix、Base UI、React Aria 三套 primitives | 部分 | 是 | 付费套件 + 部分免费 blocks | React、Tailwind、shadcn/ui、Radix / Base UI / React Aria | GitHub [shadcnblocks/shadcn-ui-blocks](https://github.com/shadcnblocks/shadcn-ui-blocks) 413 星，license 字段 NOASSERTION，最近推送 2025-10-09 16:08（ET）。公开免费仓落后于商业目录。官网自称约 10,000 名免费用户、2023 年成立 | Pro $149、Premium $299、Elite $399，终身（官网） | 可直接当 blocks 资产 |
| MotionSites | https://motionsites.org/ | 面向落地页、UI/UX 与网页动效的 AI 提示词和模板库 | 官网写 553 个站点提示词、559 个 sections、46 个 apps、7,181 个 UI 组件，以及动画背景、kits、Skills 与 MCP。可贴进 Claude、Cursor、Lovable、Bolt | 是 | 是 | 提示词 / 模板目录 + 会员 | 提示词驱动，在多家 AI 编辑器里生成带动效的页面 | 本轮未找到官方 GitHub。权威性主要在产品和社区，不在已核实的开源仓 | 有免费库。月付 $29、季付 $69、年付 $149；另有 Lifetime 一次买断，精确 Lifetime 标价在本轮页面抓取中没有清楚显示，故未写入 | 主要是生成输入，不是 shadcn 式源码登记处；导出结果可再改 |
| shadcn/ui | https://ui.shadcn.com/ | 官方组件与代码分发平台，用来搭建自己的设计系统 | 可访问组件、官方 Blocks（仪表盘、登录、侧栏、图表、表格等）、主题、CLI、registry | 无 | 是 | 开源登记处 / 分发系统 | React、Tailwind、Radix 或 Base UI，多框架 | GitHub [shadcn-ui/ui](https://github.com/shadcn-ui/ui) 127,881 星，MIT，最近推送 2026-11-11 03:44（ET）。本名单里权威性最高，也是多数第三方套件的底座 | MIT，免费 | 可直接当组件/官方 blocks 资产 |
| OpenUI（Thesys） | https://www.openui.com/ | 生成式 UI 的开放标准与运行时，让模型用你已有的组件出界面 | OpenUI Lang、多框架运行时、与 shadcn / MUI / Ant / Radix 等集成、Gateway / Cloud（由 Thesys 运营） | 无 | 无 | 开源标准 + SDK；另有云服务 | React、Vue、Svelte、Angular、Lynx 等 | GitHub [thesysdev/openui](https://github.com/thesysdev/openui) 15,079 星，MIT，最近推送 2026-11-11 02:22（ET） | 框架开源 MIT；Cloud / Gateway 是否收费本轮未打开定价页 | 用于在自有组件上做生成式 UI，不是视效或 block 目录 |
| OpenUI（W&B） | 仓库 https://github.com/wandb/openui ；仓库标明主页 https://openui.fly.dev/ | 用自然语言描述界面并实时渲染，再转到 React / Svelte 等 | AI UI 生成工具，不是组件登记处 | 无 | 无 | 开源生成工具 | 生成 HTML/CSS 并转换到多框架（以仓库说明为准） | GitHub [wandb/openui](https://github.com/wandb/openui) 22,748 星，Apache-2.0，最近推送 2026-11-05 01:10（ET）。主页 https://openui.fly.dev/ 本轮 curl 连接失败（状态 000），仓库页为 200 | Apache-2.0 | 偏生成与灵感，不是现成 block 库 |
| CopilotKit | https://www.copilotkit.ai/ | Agent 与生成式 UI 的前端栈，并把用户和 agent 接进真实产品。AG-UI 协议维护方 | 可换肤的聊天组件、插槽、无头 API、共享状态、人机协同、生成式 UI、模板与产品分析。不是视效展廊 | 无 | 无 | 开源 SDK + 企业 / 云 | React、Angular、Vue、移动端、Slack、Teams 等 | GitHub [CopilotKit/CopilotKit](https://github.com/CopilotKit/CopilotKit) 38,625 星，MIT，最近推送 2026-11-11 03:31（ET）。官网引用 Docusign、Evergreen Wealth 评价，并提到 TechCrunch Series A 与 DeepLearning.AI 课程。首页“多数 Fortune 500”为官网自我表述，本轮未独立核实 | MIT；另有企业 / 云选项，具体商业价格未打开定价页 | 可直接做 agent 界面，不能当高视效或 marketing blocks 输入 |

## 按用户核心过滤

### 高视效动效（优先拿来看）

- **最强、且可直接取源码**：React Bits（免费层就已经是全息、WebGL、3D 背景与组件；GitHub 51,691 星），ThreeUI（Three.js / shader / 整页 3D 体验；7,225 星），Motion+ / Motion UI（Motion 团队，开源库 35,067 星，付费层是生产级动效组件和 50 个 sections）。
- **高视效，但形态是生成器或提示词**：Aura（用户判断正确：大量视效动效，导出的是可发布的 HTML 页面，不是 shadcn blocks），MotionSites（动效站点与 section 提示词）。
- **有动效，但主线不是「高视效展廊」**：beUI（产品级微交互与 3D tilt 等，很强，更偏应用界面），affectUI 的 Motion / 插画，Shadcn Space 的 118+ animated blocks，Shadcn Studio / Shadcn UI Kit 的 Motion 变体与动态插画，21st 里因作者而异的 shaders，BoardUI 里 agent 加载与光效。

### blocks（优先拿来看）

- **体量最大的第三方 shadcn block 集**：Shadcnblocks（2,866 blocks）。
- **完整平台型**：Shadcn Studio（1100+）、ReUI（678 Pro blocks + 大量免费组件，且被官网写进 trusted registries）、Shadcn Space（556+ 另加 118+ 动画块）、Shadcn UI Kit（555 blocks 另加后台与模板）。
- **更精、更「登记处」**：Efferd（用户判断正确，就是 shadcn blocks；Pro $149 一次买断；公开 GitHub 不是当前主仓），官方 shadcn/ui Blocks（数量少，但是标准本身），21st（社区多作者目录）。
- **也有 blocks，但主线不同**：beUI、BoardUI、affectUI、Motion UI 的 50 个 sections、ThreeUI 从整页拆出的 sections、React Bits Pro 的 300+300 blocks、MotionSites 的 559 个 section 提示词。

## 名称歧义与未完全对齐的项

没有完全找不到官网的名字。以下需要在清单里保留歧义，不要当成单一产品：

1. **OpenUI（最需要拆开）**  
   - 与 shadcn、CopilotKit 一起出现时，更像 Thesys 的生成式 UI 标准：https://www.openui.com/ ，仓库 https://github.com/thesysdev/openui（15,079 星）。  
   - GitHub 上更有名、星标更高的是 Weights & Biases 的 AI UI 生成器：https://github.com/wandb/openui（22,748 星）。标明主页 https://openui.fly.dev/ 本轮无法连接。  
   - 另外还有 W3C 社区的 [Open UI](https://open-ui.org/)，那是 Web 平台组件标准讨论，不是设计资产库。本轮不把它当作用户要的起点。

2. **shadcnui kit**  
   已按独立产品 https://shadcnuikit.com/ 收录。它不是官方 shadcn/ui。官方是 https://ui.shadcn.com/ 。

3. **reuipro ui**  
   已对齐为 ReUI（https://reui.io/）。Pro 是它的付费档，不是另一个站。

4. **arcui**  
   已对齐为 https://arcui.dev/（Lit 组件库）。另有一个较旧的同名 CSS 框架 https://arcui.netlify.app/ ，不是同一产品。本轮按设计系统/组件库语境选择前者。

5. **motionplus**  
   已对齐为 Motion+（https://motion.dev/plus），不是一个叫 motionplus.com 的独立站。

6. **Efferd 的 GitHub**  
   当前官网是登记处产品，权威性更多在站内传播（含展示的 X 评价），而不是一个仍作为主仓的公开仓库。`shabanhr/efferd-ui` 指向 legacy。

7. **Aura 与 ThreeUI 的关系**  
   不是同一产品，但同属 Meng To / Design+Code 体系：Aura 是 AI 建站与高视效模板；ThreeUI 是可浏览、可复制的 Three.js 目录。

## 本轮实际打开的来源

全部起点官网本轮 `curl` 为 HTTP 200，除 W&B OpenUI 标明主页 https://openui.fly.dev/ 为连接失败（000）。GitHub 仓库页（含 wandb/openui、thesysdev/openui）为 200。

- https://arcui.dev/ 、https://arcui.dev/docs/getting-started/ 、https://github.com/arclight-digital/arc-ui 、npm `@arclux/arc-ui`
- https://beui.dev/ 、https://github.com/starc007/ui-components
- https://motion.dev/plus 、https://motion.dev/ui/ 、https://github.com/motiondivision/motion
- https://www.boardui.com/ 、https://www.boardui.com/docs/introduction 、https://github.com/BoardUI/boardui
- https://reactbits.dev/ 、https://reactbits.dev/get-started/introduction 、https://pro.reactbits.dev/ 、https://github.com/DavidHDev/react-bits
- https://threeui.com/ 、https://threeui.com/three-js 、https://threeui.com/pricing 、https://github.com/MengTo/threeui
- https://shadcnuikit.com/
- https://tailadmin.com/ 、https://github.com/TailAdmin/free-nextjs-admin-dashboard 、https://github.com/TailAdmin/tailadmin-free-tailwind-dashboard-template
- https://21st.dev/ 、https://github.com/serafimcloud/21st 、https://github.com/21st-dev/magic-mcp
- https://reui.io/ 、https://github.com/keenthemes/reui
- https://www.aura.build/ 、https://www.aura.build/pricing
- https://www.affectui.com/ 、https://github.com/flohoeller/affectui
- https://efferd.com/ 、https://efferd.com/docs 、https://efferd.com/pricing 、https://github.com/shabanhr/efferd-ui
- https://shadcnspace.com/ 、https://github.com/shadcnspace/shadcnspace
- https://shadcnstudio.com/ 、https://github.com/shadcnstudio/shadcn-studio
- https://hugeicons.com/ 、https://github.com/hugeicons/hugeicons
- https://www.shadcnblocks.com/ 、https://github.com/shadcnblocks/shadcn-ui-blocks
- https://motionsites.org/ 、https://motionsites.org/unlimited
- https://ui.shadcn.com/ 、https://ui.shadcn.com/docs 、https://ui.shadcn.com/blocks 、https://github.com/shadcn-ui/ui
- https://www.openui.com/ 、https://github.com/thesysdev/openui 、https://github.com/wandb/openui
- https://www.copilotkit.ai/ 、https://github.com/CopilotKit/CopilotKit

星标与最近推送均为 2026-11-11 上午（America/New_York）经 `gh api` 观测，随后会变化。

---

## 扩搜续篇

X 渠道第一轮扩搜（2026-11-11）已写入同目录 `expansion-x.md`，并更新了同一份 Page。起点各条事实不改写。

权威性五星初评（按 2026-11-11 已核实事实加权，不改写本文件既有事实）见同目录 `authority-scores.md`。

### MotionSites 出品方续核（2026-11-11，不改写上表其他事实）

种子官网 https://motionsites.org/ 的 About / Terms / Privacy / Contact / 页脚仍未具名运营者（条款写 “the operator of this service”）。另有 https://motionsites.ai/ 页脚与隐私政策写 “Operated by Viktor Odainyi, sole trader”，并存在组织仓 [Motionsites-AI/claude-skill](https://github.com/Motionsites-AI/claude-skill)（本轮观测 1,982 星，主页指向 motionsites.ai）。本轮未在 .org 与 .ai 之间找到互相指向的官方归属声明，故种子条目出品方仍标「依据不足」，不把 Viktor Odainyi 写成 motionsites.org 的已核出品方。详见 `authority-scores.md`。

GitHub 渠道第一批扩搜见同目录 `expansion-github.md`。
