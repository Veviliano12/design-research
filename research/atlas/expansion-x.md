# X 渠道扩搜清单（第一批核实）

调研日期：2026-11-11（America/New_York）  
对照准则：`research-criteria.md`  
起点清单：`seed-inventory.md`（本文件不覆盖起点条目）  
渠道任务计划：`channel-tasks.md`

本轮只读 X 公开帖，不发帖、不私信。候选从合集帖与推荐帖抽出，再经官网 + `gh api` 核实。星标、许可、最近推送时间均为本轮观测，会随后变化。诊断标注一律「待诊断」，不代用户打 OK / 不OK。

## 本轮怎么找

主要检索角度：shadcn blocks / registry 推荐、React Bits 同类、Magic UI / Aceternity、animated component library、Three.js / WebGL UI kit。高频合集来源包括：

- [@orcdev](https://x.com/orcdev) 的 shadcn block 合集（如 https://x.com/i/status/1975828940208902553 、https://x.com/i/status/1976244260098691288 、https://x.com/i/status/1957760517864329364）
- [@naymur_dev](https://x.com/naymur_dev) https://x.com/i/status/1987111926833508635
- [@21st_dev](https://x.com/21st_dev) https://x.com/i/status/2103324298027085942 、https://x.com/i/status/2102179671408529502
- [@himanshubuildss](https://x.com/himanshubuildss) Scrolltide 资源帖（如 https://x.com/i/status/2106411655055974640）
- [@sonorafa](https://x.com/sonorafa) https://x.com/i/status/1987515701502824773
- [@pruthveeee](https://x.com/pruthveeee) OriginKit / Lightswind https://x.com/i/status/2085852137934958778
- [@adityawaslost](https://x.com/adityawaslost) Shaders https://x.com/i/status/（检索命中帖）
- [@Alok619308](https://x.com/Alok619308) Cue https://x.com/i/status/（检索命中帖，链到 cuedesign.space）

已在起点名单中的名称一律跳过（含 React Bits、Shadcnblocks、Shadcn Studio、ReUI、Efferd、21st、官方 shadcn/ui、Aura、ThreeUI、Motion+ 等）。

## 总表（已核实新项）

| 名称 | 官网 | 做什么 | 主要内容 | 高视效 | blocks | 形态 | 技术栈 | 权威性（本轮观测） | 许可 / 成本 | 可操作性 | 发现路径 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Magic UI | https://magicui.design/ | 面向设计工程师的动效组件与特效库，定位为 shadcn/ui 的配套 | 官网写 150+ 免费开源动效组件与特效；shadcn CLI / MCP | 是 | 部分 | 开源登记处；另有模板类周边仓 | React、TypeScript、Tailwind、Motion；`@magicui` registry | GitHub [magicuidesign/magicui](https://github.com/magicuidesign/magicui) 23,200 星，MIT，最近推送 2026-11-09 10:21（ET）。X 上与 Aceternity、shadcn 常被并称 | MIT，免费开源层；模板/周边是否另有付费本轮未单独打开商店页 | 可直接当动效组件资产 | X：多条「holy trinity」与 top UI 合集（如 @SiddDevs、@imd_prashant、@lujotypes） |
| Aceternity UI | https://ui.aceternity.com/ | 面向落地页的 React 动效组件、blocks 与模板库 | 首页写 118+ 免费组件、183+ blocks、17 模板、5 整页落地页；MCP / CLI | 是 | 是 | 免费层 + 付费 All-Access | React、Next.js、Tailwind、Motion / Framer Motion | 主产品无独立公开主仓可核对本轮星标（组织下多为 boilerplate）。权威性主要在官网口碑、X（@mannupaaji / @aceternitylabs）与大量合集点名 | 免费层可用。定价页：1 年许可 $169（原价 $249）、Lifetime $199（原价 $299）、Team $1,590（原价 $1,990），均为一次付款 | 可直接复制/安装；付费层解锁大量 blocks 与模板 | X：几乎所有 shadcn 动效合集都会点名 |
| Origin UI → coss ui / coss origin | https://originui.com/ → https://coss.com/ui ；遗留集 https://coss.com/origin | 原 Origin UI 已被 coss.com 收购。现主推 coss ui（Cal.com 设计系统）；原 Radix 组件集以 origin 遗留快照保留 | coss ui：现代 React 组件库（Base UI + Tailwind）。coss origin：大量按类别编号的 copy-paste 应用 UI 组件（输入、表格、日历、导航等） | 无 | 部分 | 开源设计系统 + 遗留登记处 | React、Tailwind v4；coss ui 用 Base UI；origin 遗留偏 Radix / 部分 React Aria | GitHub [cosscom/ui](https://github.com/cosscom/ui)（原 origin-space/originui 已指向此仓）10,823 星，MIT，最近推送 2026-11-09 06:36（ET）。X 合集里仍常写「Origin UI」 | MIT（据仓库）。官网宣称免费开源 | 可直接当组件资产；记清品牌已迁到 coss，不要只搜 originui.com | X：@orcdev、@om_patel5、@sonorafa 等合集中的 Origin UI |
| Kibo UI | https://www.kibo-ui.com/ | 补 shadcn/ui 缺口的复杂可组合组件登记处（Gantt、Kanban、编辑器、Dropzone 等） | 组件 + 预组合 blocks + 1000+ patterns（官网文案）；已被 Shadcnblocks 收购，仍开源 | 部分 | 是 | 开源登记处（现属 Shadcnblocks） | React、shadcn/ui、TypeScript | GitHub [shadcnblocks/kibo](https://github.com/shadcnblocks/kibo) 3,983 星，MIT，最近推送 2026-05-04 02:00（ET）。收购说明见 shadcnblocks 博客。作者 Hayden Bleasel 亦做 AI Elements | MIT，官网写 forever 免费开源 | 可直接当复杂组件 / blocks 资产 | X：@naymur_dev、@21st_dev、@orcdev、@haydenbleasel 相关讨论 |
| Tailark | https://tailark.com/ | 面向营销站的 shadcn blocks / 页面 / 插画登记处 | 开源 registry（Base UI 与 Radix 双轨）+ 付费 Pro（数百 marketing blocks 与整页） | 部分 | 是 | 开源登记处 + 付费 Pro | React、Next.js、Tailwind、shadcn；Radix / Base UI | GitHub [tailark/blocks](https://github.com/tailark/blocks) 2,341 星，MIT，最近推送 2026-07-29 07:19（ET）。作者 @MeschacIrung。X 上常进 Top 10 | 开源 MIT。Pro 定价页：Essentials $249、更高档 $299 / $499（页面展示划线价更高），一次买断 | 可直接当 marketing blocks | X：@orcdev Top 列表几乎必提；@naymur_dev blocks 列表 |
| Motion Primitives | https://www.motion-primitives.com/ | 可复制的动效 UI kit（组件级微交互与过渡） | 开源动效组件；Pro 另有高级组件、sections、模板 | 是 | 部分 | 开源 + 付费 Pro | React、Motion、Tailwind | GitHub [ibelick/motion-primitives](https://github.com/ibelick/motion-primitives) 6,933 星，MIT，最近推送 2026-09-28 09:32（ET） | 免费 MIT；Pro 定价本轮打开 https://pro.motion-primitives.com/ 未见清晰标价数字，故不写入具体价 | 可直接当动效组件资产 | X：@naymur_dev、@madebyluca、@tamimbuilds 等合集 |
| AI Elements（Vercel） | https://elements.ai-sdk.dev/ | 建在 shadcn/ui 上的 AI 原生界面组件登记处（聊天、推理、工具调用、IDE 式界面等） | 可组合 AI UI 积木；与 AI SDK 深度集成 | 无 | 无 | 开源登记处；官方迁移叙事指向 shadcn/ui AI Elements 模式 | React、shadcn/ui、AI SDK | GitHub [vercel/ai-elements](https://github.com/vercel/ai-elements) 2,515 星，license 字段 NOASSERTION，最近推送 2026-10-14 13:04（ET）。官方文档 https://ui.shadcn.com/docs/ai-elements 说明新项目应改用 shadcn/ui 上的 AI Elements 模式；已安装副本可继续用 | 仓库 license 字段未解析为 SPDX；使用以文档与仓库说明为准。免费可装 | 可直接做 agent 界面；不是高视效或 marketing blocks。注意迁移到官方 patterns | X：@orcdev Top 10、@haydenbleasel、@sonorafa「AI Element (vercel)」 |
| Animate UI | https://animate-ui.com/ | 给已有 shadcn/ui 原语一键加 Motion 动效的分发与 CLI | 动画版 Accordion、Dialog、Carousel 等 primitives；另有 backgrounds、icons；CLI `animate all`、Skills、MCP | 是 | 无 | 开源分发 + CLI | React（亦提 Vue）、TypeScript、Tailwind、Motion、shadcn CLI | GitHub [imskyleen/animate-ui](https://github.com/imskyleen/animate-ui) 4,966 星，license 字段 NOASSERTION，最近推送 2026-11-09 04:15（ET） | license 字段未解析为 SPDX；官网按开源推广。具体 SPDX 以仓库文件为准 | 适合给现有 shadcn 界面加动效，不是 block 目录 | X：@madebyluca、@orcdev 等列表中的 Animate UI |
| Cult UI | https://www.cult-ui.com/ | 可投入 shadcn 项目的动画组件与 AI agent blocks | 官网写 154 个免费动画组件（含新加 58）；另有面向 Vercel AI SDK 的付费 full-stack agent blocks | 是 | 是 | 开源组件 + 付费 AI blocks / 模板 | React、Tailwind、Motion、shadcn/ui | GitHub [nolly-studio/cult-ui](https://github.com/nolly-studio/cult-ui) 7,086 星，MIT，最近推送 2026-10-28 23:57（ET） | 组件层 MIT。AI agent blocks 为一次购买（具体价本轮未打开独立定价页；`/pricing` 为 404） | 可直接当动效组件；agent blocks 另议 | X：@orcdev、@21st_dev、@alibey_10 |
| SmoothUI | https://smoothui.dev/ | 带 Motion / GSAP 的 shadcn 兼容动画组件集 | 官网 meta 写 181 个免费组件 | 是 | 部分 | 开源登记处 | React、Tailwind、Motion、GSAP、shadcn/ui | GitHub [educlopez/smoothui](https://github.com/educlopez/smoothui) 1,054 星，MIT，最近推送 2026-11-10 13:54（ET） | MIT，免费 | 可直接当动效组件 | X：@naymur_dev、@orcdev、@21st_dev 动画库列表 |
| Dice UI | https://www.diceui.com/ | 可组合、可访问的 shadcn 扩展组件 | 复杂交互组件（非营销视效展廊） | 无 | 部分 | 开源登记处 | React、TypeScript、Tailwind、shadcn/ui | GitHub [sadmann7/diceui](https://github.com/sadmann7/diceui) 2,111 星，MIT，最近推送 2026-11-10 08:31（ET）。作者 @sadmann17 | MIT，免费 | 可直接当组件资产 | X：@sonorafa、@ajaypatel_aj、@orcdev |
| MVP Blocks | https://blocks.mvp-subha.me/ | 开源、可复制的 MVP / 落地页 UI blocks | blocks、sections、模板；强调 Framer Motion 开箱动画 | 部分 | 是 | 开源登记处 | Next.js、React、Tailwind、Framer Motion、shadcn | GitHub [subhadeeproy3902/mvpblocks](https://github.com/subhadeeproy3902/mvpblocks) 835 星，BSD-3-Clause，最近推送 2026-10-08 15:48（ET） | BSD-3-Clause，免费开源 | 可直接当 blocks | X：@om_patel5、@trillionclues、@shakkkkkkklol |
| Kokonut UI | https://kokonutui.com/ | 开源 React 动效组件目录（含 AI 相关组件） | 首页写 Browse 116 components；另有 Pro（100+ 组件文案） | 是 | 部分 | 开源 + 付费 Pro | React、Tailwind、Motion、shadcn/ui | GitHub [kokonut-labs/kokonutui](https://github.com/kokonut-labs/kokonutui) 2,295 星，MIT，最近推送 2026-11-10 07:47（ET）。页脚写 Backed by Vercel OSS | 开源 MIT；Pro 价格本轮未打开定价页 | 可直接当动效 / AI UI 组件 | X：@21st_dev 多条合集置顶 Kokonut |
| Blocks.so | https://blocks.so/ | 开源 shadcn/ui blocks 库 | 官网写 60+ 免费 blocks（登录、仪表盘、对话框、统计等分组） | 无 | 是 | 开源登记处 | React、Tailwind、Next.js、shadcn/ui | GitHub [ephraimduncan/blocks](https://github.com/ephraimduncan/blocks) 1,859 星，MIT，最近推送 2026-10-30 15:48（ET） | MIT，免费 | 可直接当 blocks（体量小于商业大盘） | X：@naymur_dev「Blocks.so」、@orcdev「Blocks . so」 |
| UI Layouts | https://www.ui-layouts.com/ | 组件、特效与现成 blocks 的前端集合 | meta 写 60+ 组件；站内有 Hero / Feature 等 blocks 分组 | 是 | 是 | 开源库 + blocks | React、Next.js、Tailwind、Framer Motion、shadcn | GitHub [ui-layouts/uilayouts](https://github.com/ui-layouts/uilayouts) 3,853 星，MIT，最近推送 2026-10-31 04:31（ET）。作者 Naymur（与合集帖 @naymur_dev 相关） | MIT，免费 | 可直接当组件 / blocks / 特效资产 | X：@naymur_dev、@tamimbuilds |
| Intent UI | https://intentui.com/ | 建在 React Aria 上的可复制无障碍组件集，另有 blocks | 组件文档 + https://intentui.com/blocks ；另有 Design 站 | 无 | 是 | 开源组件 + 付费授权促销文案（站内 Black Friday） | React Aria Components、Tailwind、React | GitHub [irsyadadl/intentui](https://github.com/irsyadadl/intentui) 1,980 星，MIT，最近推送 2026-11-10 02:52（ET） | 仓库 MIT；站内有付费 license 促销，档位价本轮未完整打开商店结账页 | 可直接当无障碍组件 / blocks | X：@naymur_dev blocks 列表 |
| 8bitcn/ui | https://www.8bitcn.com/ | 复古 8-bit 风格的 shadcn 组件与 blocks | 组件、blocks、主题；首页提到 v2 与 35 个新 blocks | 部分 | 是 | 开源登记处 | React、shadcn/ui、Tailwind | GitHub [TheOrcDev/8bitcn-ui](https://github.com/TheOrcDev/8bitcn-ui) 2,070 星，MIT，最近推送 2026-11-05 15:29（ET）。作者即合集博主 @orcdev | MIT，免费 | 可直接用；风格很特化（复古像素） | X：作者本人合集 + @naymur_dev「8bitcn Blocks」 |
| HextaUI | https://hextaui.com/ | 建在 Base UI 上的 shadcn 风格组件、hooks 与 AI blocks | 强调 loading / error / empty 等难状态；面向 AI 应用聊天 UI | 部分 | 是 | 开源 / 产品站（体量相对小） | React、Base UI、shadcn/ui | GitHub [preetsuthar17/hextaui](https://github.com/preetsuthar17/hextaui) 150 星，MIT，最近推送 2026-10-31 05:30（ET） | MIT | 可作 AI 界面 blocks 参考；权威性低于本表多数项 | X：@21st_dev 合集 |
| Fancy Components | https://www.fancycomponents.dev/ | 开源的花式 React 组件与微交互库 | 动效 / 微交互组件，文档站可浏览 | 是 | 无 | 开源库 | React、TypeScript、Tailwind、Motion | GitHub [danielpetho/fancy](https://github.com/danielpetho/fancy) 3,303 星，MIT，最近推送 2026-03-14 06:34（ET），公开仓相对停更，网站仍在 | MIT，免费 | 可直接当微交互资产；注意仓库推送偏旧 | X：@21st_dev 动画库列表「Fancy Components」 |
| Lightswind UI | https://lightswind.com/ | 动画向 React 组件与 UI blocks 套件（CLI / MCP） | 首页写 312+ 动画组件与 559+ UI blocks；组件页另写 260+ 精选 | 是 | 是 | 开源层 + Pro / Enterprise | React、Tailwind；MCP 面向 Cursor / Claude 等 | GitHub [codewithMUHILAN/Lightswind-UI-Library](https://github.com/codewithMUHILAN/Lightswind-UI-Library) 1,277 星，MIT，最近推送 2026-10-30 08:24（ET） | 开源组件 MIT；Pro / Enterprise 另有商业许可（页脚说明）。具体价本轮未打开定价结账页 | 可直接取用；注意免费与 Pro 边界 | X：@pruthveeee 资源帖 |
| Shaders | https://shaders.com/ | WebGPU 着色器特效组件库（多框架）+ Pro 创意平台 | 免费 npm `shaders` 包；Pro 含编辑器、更多着色器、MCP（$10/月或 Lifetime $299） | 是 | 无 | 开源库 + 订阅 / 买断 Pro | React / Vue / Svelte / Solid / JS；WebGPU；亦提 Framer | GitHub [shader-effects-inc/shaders](https://github.com/shader-effects-inc/shaders) 5,900 星，MIT，最近推送 2026-11-09 22:52（ET） | 库 MIT。Pro：$10/月（年付 $120）或 Lifetime $299（官网 Pro 页） | 高视效背景 / 特效可直接用；不是 UI blocks | X：@adityawaslost 等推荐帖 |
| Scrolltide | https://www.scrolltide.co/ | 电影感、滚动驱动站点的 AI 提示词与模板库 | 首页写 145 templates、95 components、55 shaders；偏 Three.js / WebGL / GSAP / shader | 是 | 是 | 提示词 / 模板目录 + 会员 | 提示词驱动；技术栈文案含 React、Tailwind、Motion、GSAP、Three.js、WebGL | 本轮未找到可核对本产品星标的官方公开仓。权威性主要在 X 传播（单帖数千赞/收藏） | 定价页：月付促销价 $39（原价 $59）、年付 $12/月（$144/年）、Lifetime $299（原价 $449） | 主要是生成输入（类似 MotionSites），不是 shadcn 源码登记处 | X：@himanshubuildss 高互动资源帖主推 |
| Skiper UI | https://skiper-ui.com/ | 非常见交互的 shadcn 兼容组件（拖拽、滚动、Dynamic Island 等） | 免费 + Pro 组件；支持 `npx shadcn add @skiper-ui/...`；文案称属 trusted registries | 是 | 部分 | 登记处；免费 + Pro | React、Next.js、shadcn registry | 无稳定的产品主仓可核对本轮星标（GitHub 组织 skiper-ui 下无公开主产品仓；搜索到的多为克隆/旧仓）。权威性在官网与 X 合集点名 | 免费层可商用但要求署名；Pro 免署名。Pro 价格本轮未打开清晰价目表 | 可安装使用；权威性依据弱于有大星标公开仓的项 | X：@orcdev 合集常列 Skiper UI |
| Cue / Cue Kit | https://www.cuedesign.space/ ；开源子集 https://kit.cuedesign.space/ | 精选「Awwwards 级」组件与 AI 提示词；Cue Kit 为开源可安装子集 | Cue：meta 写 316+ 精选。Cue Kit：40+/54+ 免费组件，带设计用提示词；另有 Cue+ Lifetime 文案（页内见 $99 lifetime，需以结账页为准） | 是 | 部分 | 精选目录 + 开源 Kit + 付费 Cue+ | React；shadcn CLI（Kit）；提示词面向 Cursor / v0 / Bolt 等 | 本轮未找到可核对本产品星标的官方公开主仓。X 上作者推广 WebGL / Three 组件 | Kit 文案写 MIT。Cue+ 为一次买断（页内 $99 文案，建议下单前再核） | Kit 可直接装；完整 Cue 偏提示词 / 精选参考 | X：@Alok619308 等；检索命中 cuedesign.space |

## 按用户核心过滤（本批）

### 高视效动效（优先看）

- **可复制源码、声量高**：Magic UI（23,200 星）、Cult UI（7,086）、Motion Primitives（6,933）、Shaders（5,900，WebGPU）、Animate UI（4,966）、Fancy Components（3,303）、Kokonut UI（2,295）、SmoothUI（1,054）、Lightswind（1,277）。
- **落地页级动效 + blocks**：Aceternity UI（免费组件 + 付费大量 blocks/模板）。
- **提示词 / 精选，不是登记处源码**：Scrolltide、Cue（完整库）。

### blocks（优先看）

- **营销 / 页面区块**：Tailark、Aceternity（付费层）、MVP Blocks、Blocks.so、UI Layouts、Intent UI Blocks、8bitcn blocks。
- **应用 / 复杂块**：Kibo UI（且与 Shadcnblocks 生态合并）、coss origin 遗留组件集。
- **动画向 blocks**：Cult UI、Lightswind、Kokonut（部分）。

## 未决 / 降优先级（本轮不进正式表）

| 名称 | 原因 | 备注 |
| --- | --- | --- |
| OriginKit（originkit.dev） | 官网 200，但页面几乎无可用正文（重度客户端）；无稳定官方主仓可核星标（仅见第三方 MCP 相关小仓） | X @pruthveeee 推荐；待浏览器打开或找到官方仓后再核 |
| Zepa UI（zepa.design） | 仓库 zepa-ui/zepa 仅 1 星，过新/声量不足 | X 作者自推；暂不进高置信名单 |
| Solace UI、Shadcraft、Shadcndesign、NexUI、Ruixen UI、Systaliko、Serenity、Spell、SHSF UI、Watermelon、PatternCraft、Tweakcn、Codevisuals、Libraries.dev | 合集中出现，本轮未逐一打开核实 | 列入 GitHub / 下一轮 X 核对队列 |
| Chakra UI / MUI / Ant Design / Bootstrap / DaisyUI | 通用组件库，不是本轮「高视效 / shadcn blocks」核心过滤优先项 | 可作设计系统对照，不进本批扩搜表 |

## GitHub 轻量初探（非完整核对）

- 已定位对照入口：[birobirobiro/awesome-shadcn-ui](https://github.com/birobirobiro/awesome-shadcn-ui) **20,805 星**，主页 https://awesomeshadcn.dev/ ，最近推送 2026-11-10 15:53（ET）。
- 下一轮应按该列表与官方 registry 目录逐条对照，补本批未覆盖的名称，并避免与上表 24 条重复。

## 本轮实际打开 / 调用的来源（摘要）

- X：`search_posts_all` 多组查询与 conversation 跟帖；关键帖 id 见上文「本轮怎么找」。
- 官网：magicui.design、ui.aceternity.com（含 pricing）、kibo-ui.com、tailark.com、pro.tailark.com、motion-primitives.com、pro.motion-primitives.com、elements.ai-sdk.dev、ui.shadcn.com/docs/ai-elements、animate-ui.com、cult-ui.com、smoothui.dev、diceui.com、blocks.mvp-subha.me、kokonutui.com、blocks.so、ui-layouts.com、intentui.com、8bitcn.com、hextaui.com、fancycomponents.dev、lightswind.com、shaders.com、scrolltide.co（含 pricing）、skiper-ui.com、cuedesign.space、kit.cuedesign.space、coss.com/ui、coss.com/origin、originui.com（重定向）。
- GitHub `gh api`：上表各仓的 `stargazers_count` / `license.spdx_id` / `pushed_at`（时间已换算为 America/New_York）。

权威性五星初评（按 2026-11-11 已核实事实加权，不改写本文件既有事实）见同目录 `authority-scores.md`。本文件未开始其他渠道队列或深度分析。

## 出品方补核与 GitHub 对照续篇（2026-11-11）

本轮不改写上表已核实的官网、星标、定价与内容事实。仅补出品方，并指向新的 GitHub 批次。

- **Scrolltide**：官网页脚将 X [@himanshubuildss](https://x.com/himanshubuildss)、Instagram [himanshubuilds](https://www.instagram.com/himanshubuilds)、YouTube 频道作为产品社交链出；条款只写 “Scrolltide operates scrolltide.co”，未写法定姓名。出品方类型改为独立作者 / 工作室。仍无稳定主仓。
- **Skiper UI**：官网 Founder 栏标 gxuri，链到 X [@Gur__vi](https://x.com/Gur__vi)；页脚链到 [Gurvinder-Singh02](https://github.com/Gurvinder-Singh02) 与 LinkedIn `gurvindersingh02`。个人站 https://gxuri.me/ 链出 skiper-ui.com。出品方类型改为独立作者 / 工作室。仍无稳定产品主仓。
- **Cue / Cue Kit**：官方 https://cuedesign.space/llms.txt 与 llms-full.txt 写明 Alok Srivastava，independent founder（India），X @Alok619308。出品方类型改为独立作者 / 工作室。仍无稳定产品主仓。
- 更新后的出品方分与总分见 `authority-scores.md`。

GitHub 渠道第一批核实（awesome-shadcn-ui 对照，18 条新来源）已写入同目录 `expansion-github.md`。上表 24 条事实不改写。该批次亦复查了 OriginKit、Zepa UI、Solace UI、Shadcraft、Shadcndesign、NexUI、Ruixen UI、Codevisuals、Libraries.dev、PatternCraft 等未决名，仍未进正式表的原因见 `expansion-github.md`。
