# 权威性打分工作表

观测时点：2026-11-11（America/New_York）  
对照准则：`research-criteria.md`  
事实来源：`seed-inventory.md` 与 `expansion-x.md` 中已核实的字段；2026-11-11 续核的出品方补记，以及同日 GitHub 渠道批次 `expansion-github.md` 中已核实的字段。既有行除四条出品方缺口的出品方分项与类型外，不改写此前事实、也不另跑全表 `gh api` 刷新。新行的星标与 `pushed_at` 来自该 GitHub 批次当场 `gh api`。同日稍后的第一阶段官方摄入（A/B）新增行见 `expansion-official.md`：有官方主仓的星标与 `pushed_at` 来自该批次当场 `gh api`；无稳定主仓的按官方页面更新记录保守计分。不改写此前各行。 同日再后的第一阶段官方摄入（C 基础设施）新增行见 `expansion-infra.md`：星标与 `pushed_at` 来自该批次当场 `gh api`。不改写此前各行。

## 计分规则（摘自准则，本表按字面执行）

权重：出品方 30%，维护与规模 25%，被引用 20%，文档与可核验 15%，许可与获取清晰度 10%。每项 0–5，加权总分保留一位小数。

星级换算：4.5–5.0 五星；3.5–4.4 四星；2.5–3.4 三星；1.5–2.4 两星；0–1.4 一星。

维护与规模先按已核实星标定档：约 100k+ 为 5，20k+ 为 4.5，10k+ 为 4，5k+ 为 3.5，2k+ 为 3，500+ 为 2，150+ 为 1.5，低于 150 或无公开主仓为 1 或 0.5。再按最近推送微调：以 2026-11-11 为锚，2026-10-12 及之后视为约 30 天内，上调 0.5；2025-11-11 之前视为超过约 1 年，下调 1。无稳定主仓再下调，且不低于 0、不高于 5。官网仍活跃但仓已停更时，按当前官方主仓计，并写明停更或迁移事实。

公开仓只有约 150 星的来源（本表中的 HextaUI），即使官网完整，维护与规模、被引用也按低档计。

## 总览

| 名称 | 发现渠道 | 出品方类型 | 出品方 | 维护与规模 | 被引用 | 文档与可核验 | 许可与获取 | 总分 | 星级 |
| --- | --- | --- | --- | --- | --- | --- | ---: | ---: | ---: |
| ARC UI | 种子名单 | 独立作者 / 工作室 | 3 | 1.5 | 2 | 5 | 5 | 2.9 | 三星 |
| beUI | 种子名单 | 独立作者 / 工作室 | 3 | 2.5 | 2 | 4 | 3 | 2.8 | 三星 |
| Motion+ | 种子名单 | 开源主导项目 | 5 | 5 | 5 | 5 | 5 | 5.0 | 五星 |
| BoardUI | 种子名单 | 独立作者 / 工作室 | 3 | 2 | 2 | 4 | 3 | 2.7 | 三星 |
| React Bits | 种子名单 | 独立作者 / 工作室 | 4 | 5 | 4 | 4 | 5 | 4.4 | 四星 |
| ThreeUI | 种子名单 | 独立作者 / 工作室 | 3 | 3.5 | 2 | 5 | 5 | 3.4 | 三星 |
| Shadcn UI Kit | 种子名单 | 付费产品公司 | 2 | 0.5 | 2 | 3 | 3 | 1.9 | 两星 |
| TailAdmin | 种子名单 | 独立作者 / 工作室 | 3 | 3.5 | 2 | 4 | 3 | 3.1 | 三星 |
| 21st | 种子名单 | 社区合集 / 目录 | 3 | 2.5 | 3 | 4 | 3 | 3.0 | 三星 |
| ReUI | 种子名单 | 付费产品公司 | 3 | 3.5 | 3 | 5 | 5 | 3.6 | 四星 |
| Aura | 种子名单 | 独立作者 / 工作室 | 3 | 0.5 | 2 | 4 | 5 | 2.5 | 三星 |
| affectUI | 种子名单 | 独立作者 / 工作室 | 3 | 2.5 | 2 | 5 | 5 | 3.2 | 三星 |
| Efferd | 种子名单 | 独立作者 / 工作室 | 2 | 0.5 | 2 | 4 | 3 | 2.0 | 两星 |
| Shadcn Space | 种子名单 | 独立作者 / 工作室 | 3 | 2.5 | 2 | 4 | 3 | 2.8 | 三星 |
| Shadcn Studio | 种子名单 | 付费产品公司 | 3 | 2 | 2 | 4 | 3 | 2.7 | 三星 |
| Hugeicons | 种子名单 | 付费产品公司 | 3 | 2.5 | 2 | 4 | 3 | 2.8 | 三星 |
| Shadcnblocks | 种子名单 | 付费产品公司 | 3 | 0.5 | 2 | 4 | 3 | 2.3 | 两星 |
| MotionSites | 种子名单 | 依据不足 | 1 | 0.5 | 2 | 4 | 3 | 1.7 | 两星 |
| shadcn/ui | 种子名单 | 开源主导项目 | 5 | 5 | 5 | 5 | 5 | 5.0 | 五星 |
| OpenUI（Thesys） | 种子名单 | 付费产品公司 | 4 | 4.5 | 2 | 4 | 3 | 3.6 | 四星 |
| OpenUI（W&B） | 种子名单 | 大厂官方 | 5 | 5 | 3 | 1 | 5 | 4.0 | 四星 |
| CopilotKit | 种子名单 | 付费产品公司 | 4 | 5 | 3 | 4 | 3 | 4.0 | 四星 |
| Magic UI | X | 独立作者 / 工作室 | 4 | 5 | 4 | 4 | 3 | 4.2 | 四星 |
| Aceternity UI | X | 独立作者 / 工作室 | 2 | 0.5 | 4 | 4 | 5 | 2.6 | 三星 |
| coss ui（原 Origin UI） | X | 大厂官方 | 5 | 4.5 | 4 | 5 | 5 | 4.7 | 五星 |
| Kibo UI | X | 付费产品公司 | 3 | 3 | 3 | 5 | 5 | 3.5 | 四星 |
| Tailark | X | 独立作者 / 工作室 | 3 | 3 | 4 | 5 | 5 | 3.7 | 四星 |
| Motion Primitives | X | 独立作者 / 工作室 | 3 | 3.5 | 3 | 4 | 3 | 3.3 | 三星 |
| AI Elements（Vercel） | X | 大厂官方 | 5 | 3.5 | 4 | 4 | 3 | 4.1 | 四星 |
| Animate UI | X | 独立作者 / 工作室 | 3 | 3.5 | 3 | 3 | 3 | 3.1 | 三星 |
| Cult UI | X | 独立作者 / 工作室 | 3 | 4 | 3 | 4 | 3 | 3.4 | 三星 |
| SmoothUI | X | 独立作者 / 工作室 | 3 | 2.5 | 3 | 5 | 5 | 3.4 | 三星 |
| Dice UI | X | 独立作者 / 工作室 | 3 | 3.5 | 3 | 5 | 5 | 3.6 | 四星 |
| MVP Blocks | X | 独立作者 / 工作室 | 3 | 2 | 3 | 5 | 5 | 3.3 | 三星 |
| Kokonut UI | X | 独立作者 / 工作室 | 3 | 3.5 | 3 | 4 | 3 | 3.3 | 三星 |
| Blocks.so | X | 独立作者 / 工作室 | 3 | 2.5 | 3 | 5 | 5 | 3.4 | 三星 |
| UI Layouts | X | 独立作者 / 工作室 | 3 | 3.5 | 3 | 5 | 5 | 3.6 | 四星 |
| Intent UI | X | 独立作者 / 工作室 | 3 | 2.5 | 3 | 4 | 3 | 3.0 | 三星 |
| 8bitcn/ui | X | 独立作者 / 工作室 | 3 | 3.5 | 3 | 5 | 5 | 3.6 | 四星 |
| HextaUI | X | 独立作者 / 工作室 | 3 | 2 | 2 | 4 | 5 | 2.9 | 三星 |
| Fancy Components | X | 独立作者 / 工作室 | 3 | 3 | 3 | 5 | 5 | 3.5 | 四星 |
| Lightswind UI | X | 独立作者 / 工作室 | 3 | 2.5 | 2 | 3 | 3 | 2.7 | 三星 |
| Shaders | X | 付费产品公司 | 3 | 4 | 3 | 5 | 5 | 3.8 | 四星 |
| Scrolltide | X | 独立作者 / 工作室 | 3 | 0.5 | 2 | 4 | 3 | 2.3 | 两星 |
| Skiper UI | X | 独立作者 / 工作室 | 3 | 0.5 | 3 | 3 | 3 | 2.4 | 两星 |
| Cue / Cue Kit | X | 独立作者 / 工作室 | 3 | 0.5 | 2 | 3 | 3 | 2.2 | 两星 |

| assistant-ui | GitHub | 付费产品公司 | 4 | 4.5 | 4 | 4 | 3 | 4.0 | 四星 |
| Plate | GitHub | 开源主导项目 | 4 | 4.5 | 4 | 4 | 3 | 4.0 | 四星 |
| tweakcn | GitHub | 独立作者 / 工作室 | 4 | 4 | 4 | 3 | 5 | 4.0 | 四星 |
| Vaul | GitHub | 独立作者 / 工作室 | 4 | 2.5 | 4 | 4 | 5 | 3.7 | 四星 |
| Number Flow | GitHub | 独立作者 / 工作室 | 4 | 3.5 | 4 | 5 | 5 | 4.1 | 四星 |
| Inspira UI | GitHub | 开源主导项目 | 4 | 4 | 4 | 3 | 5 | 4.0 | 四星 |
| gluestack-ui | GitHub | 付费产品公司 | 3 | 3.5 | 4 | 4 | 3 | 3.5 | 四星 |
| shadcn-admin | GitHub | 独立作者 / 工作室 | 4 | 4 | 4 | 3 | 5 | 4.0 | 四星 |
| Neobrutalism components | GitHub | 独立作者 / 工作室 | 3 | 3.5 | 4 | 4 | 5 | 3.7 | 四星 |
| Animata | GitHub | 独立作者 / 工作室 | 3 | 3.5 | 4 | 4 | 5 | 3.7 | 四星 |
| Tremor | GitHub | 付费产品公司 | 3 | 2 | 4 | 4 | 3 | 3.1 | 三星 |
| tablecn | GitHub | 独立作者 / 工作室 | 3 | 4 | 4 | 5 | 5 | 4.0 | 四星 |
| Eldora UI | GitHub | 独立作者 / 工作室 | 3 | 2 | 4 | 4 | 5 | 3.3 | 三星 |
| Launch UI | GitHub | 独立作者 / 工作室 | 3 | 2.5 | 4 | 4 | 3 | 3.2 | 三星 |
| Novel | GitHub | 独立作者 / 工作室 | 4 | 3 | 4 | 4 | 5 | 3.9 | 四星 |
| TWBlocks | GitHub | 独立作者 / 工作室 | 3 | 2 | 4 | 4 | 5 | 3.3 | 三星 |
| background-snippets | GitHub | 独立作者 / 工作室 | 3 | 2 | 4 | 4 | 3 | 3.1 | 三星 |
| LiveKit Agents UI | GitHub | 大厂官方 | 5 | 2 | 4 | 4 | 5 | 3.9 | 四星 |

| Apps SDK UI（OpenAI） | 官网 / 文档 / changelog | 大厂官方 | 5 | 2 | 5 | 5 | 5 | 4.3 | 四星 |
| Claude Artifacts / Claude Design（Anthropic） | 官网 / 文档 / changelog | 大厂官方 | 5 | 1.5 | 5 | 4 | 3 | 3.8 | 四星 |
| Gemini 官方设计与生成式 UI 文档（Google） | 官网 / 文档 / changelog | 大厂官方 | 5 | 1 | 5 | 4 | 3 | 3.7 | 四星 |
| Microsoft 365 Copilot MCP apps UX 指南 | 官网 / 文档 / changelog | 大厂官方 | 5 | 1 | 5 | 5 | 5 | 4.0 | 四星 |
| Apple Human Interface Guidelines | 官网 / 文档 / changelog | 大厂官方 | 5 | 1.5 | 5 | 5 | 5 | 4.1 | 四星 |
| Material Design 3 | 官网 / 文档 / changelog | 大厂官方 | 5 | 1 | 5 | 5 | 5 | 4.0 | 四星 |
| Fluent 2 Design System | 官网 / 文档 / changelog | 大厂官方 | 5 | 5 | 5 | 5 | 5 | 5.0 | 五星 |
| HarmonyOS 设计体系 | 官网 / 文档 / changelog | 大厂官方 | 5 | 1 | 5 | 4 | 3 | 3.7 | 四星 |
| Astryx（Meta） | 官网 / 文档 / changelog | 大厂官方 | 5 | 5 | 5 | 4 | 5 | 4.9 | 五星 |
| Designing Grok Bot（x.ai） | 官网 / 文档 / changelog | 大厂官方 | 5 | 0.5 | 4 | 4 | 3 | 3.3 | 三星 |
| Tailwind CSS | 官网 / 文档 / changelog | 开源主导项目 | 5 | 5 | 5 | 5 | 5 | 5.0 | 五星 |
| Radix UI | 官网 / 文档 / changelog | 开源主导项目 | 5 | 4.5 | 5 | 5 | 5 | 4.9 | 五星 |
| Base UI | 官网 / 文档 / changelog | 开源主导项目 | 5 | 4.5 | 5 | 5 | 5 | 4.9 | 五星 |
| React Aria（Adobe） | 官网 / 文档 / changelog | 大厂官方 | 5 | 4.5 | 5 | 5 | 5 | 4.9 | 五星 |
| React Spectrum（Adobe / S2） | 官网 / 文档 / changelog | 大厂官方 | 5 | 4.5 | 5 | 5 | 5 | 4.9 | 五星 |
| GSAP | 官网 / 文档 / changelog | 大厂官方 | 5 | 5 | 5 | 5 | 5 | 5.0 | 五星 |
| Three.js | 官网 / 文档 / changelog | 开源主导项目 | 5 | 5 | 5 | 5 | 5 | 5.0 | 五星 |
| React Three Fiber | 官网 / 文档 / changelog | 开源主导项目 | 5 | 5 | 5 | 5 | 5 | 5.0 | 五星 |
出品方续核（2026-11-11）：Scrolltide、Skiper UI、Cue / Cue Kit 已能从官网具名或官方社交/创始人栏核到独立作者，出品方类型改为独立作者 / 工作室，出品方分项从 1 改为 3；其余分项沿用原核实事实，不刷新星标。MotionSites 的种子官网 https://motionsites.org/ 仍未具名运营者，出品方类型保持「依据不足」、分项仍为 1（详见该条依据）。

## 分项依据

以下每条写出五项分数所用的事实。星标与 `pushed_at` 已换算为 America/New_York，时点均为 2026-11-11。

### ARC UI

- 出品方 3：GitHub `arclight-digital/arc-ui`，官网 https://arcui.dev/ ，出处清楚，按独立作者 / 工作室计。7 星，达不到「生态中被广泛使用」。
- 维护与规模 1.5：7 星，低于 150，定档 1；最近推送 2026-11-10 11:47（ET），30 天内 +0.5。
- 被引用 2：来自种子名单；文件中无独立合集引用，引用证据有限。
- 文档与可核验 5：官网、入门文档、仓库与 npm `@arclux/arc-ui` 均已打开；MIT，免费。
- 许可与获取 5：MIT，免费。
- 总分 2.9，三星。依据一句：`arclight-digital/arc-ui`，7 星，最近推送 2026-11-10（ET）；引用证据有限。

### beUI

- 出品方 3：GitHub `starc007/ui-components`，官网 https://beui.dev/ ，独立作者，出处清楚。
- 维护与规模 2.5：1,960 星，未到 2k，定档 2；最近推送 2026-11-11 02:02（ET），+0.5。
- 被引用 2：种子名单；「官网展示大量 X 推荐」为站内自陈，未独立核验合集，引用证据有限。
- 文档与可核验 4：官网与仓库已打开；Pro 定价页未打开。
- 许可与获取 3：免费层 MIT（含商用）清楚；Pro 为 Lifetime，具体价格未核实。
- 总分 2.8，三星。依据一句：`starc007/ui-components`，1,960 星，最近推送 2026-11-11（ET）；Pro 定价未核实，引用证据有限。

### Motion+

- 出品方 5：Motion 团队付费层，开源核心库为 `motiondivision/motion`，属该领域官方标准项目。
- 维护与规模 5：开源库 35,067 星，20k+ 定档 4.5；最近推送 2026-11-11 01:52（ET），+0.5，封顶 5。
- 被引用 5：按 Motion 官方作为该领域默认入口计。
- 文档与可核验 5：官网、Motion UI 页、仓库与定价（Product schema 单人一次性 $399）均已核对。
- 许可与获取 5：核心库 MIT；Motion+ 单人一次性 $399，团队为年付；示例与 API 写入站点后按 MIT 使用（转售需另议 Builder’s Licence）。
- 总分 5.0，五星。依据一句：`motiondivision/motion`，35,067 星，最近推送 2026-11-11（ET）；Motion 官方。

### BoardUI

- 出品方 3：GitHub `BoardUI/boardui`，官网 https://www.boardui.com/ ，出处清楚，按独立作者 / 工作室计。
- 维护与规模 2：1,145 星，500+ 定档 2；最近推送 2026-10-02 17:59（ET），不在 30 天内，亦未满一年，不加不减。
- 被引用 2：种子名单，引用证据有限。
- 文档与可核验 4：官网与 docs/introduction、仓库已打开；Pro 定价页未打开。
- 许可与获取 3：免费层 MIT 清楚；Pro 价格未核实。
- 总分 2.7，三星。依据一句：`BoardUI/boardui`，1,145 星，最近推送 2026-10-02（ET）；Pro 定价未核实，引用证据有限。

### React Bits

- 出品方 4：GitHub `DavidHDev/react-bits`，官网与主仓清楚；51,691 星，按独立但在生态中被广泛使用计。出品方类型仍为独立作者 / 工作室。
- 维护与规模 5：51,691 星，20k+ 定档 4.5；最近推送 2026-11-10 03:14（ET），+0.5。
- 被引用 4：声量高，后续 X 扩搜亦以「React Bits 同类」为检索角度；未见「官方文档互链 / 行业默认入口」级别记录，故不为 5。
- 文档与可核验 4：官网文档与 Pro 定价页已打开；GitHub license 字段为 NOASSERTION，与官网「MIT + Commons Clause」不完全一致，故不为 5。
- 许可与获取 5：免费层可个人和商用、不可转售/再分发组件本身（官网说明）；Pro 一次性 Starter $129、Pro $249（https://pro.reactbits.dev/）。
- 总分 4.4，四星。依据一句：`DavidHDev/react-bits`，51,691 星，最近推送 2026-11-10（ET）；license 字段与官网表述不完全一致。

### ThreeUI

- 出品方 3：GitHub `MengTo/threeui`，与 Aura 同属 Meng To / Design+Code（Aura 定价页联系人 meng@designcode.io；页面多次写 “Aura team collection”）。官网与主仓清楚，按独立作者 / 工作室计，未另证「广泛使用」。
- 维护与规模 3.5：7,225 星，5k+ 定档 3.5；最近推送 2026-09-03 01:36（ET），不加不减。
- 被引用 2：种子名单；文件中无独立合集引用记录，引用证据有限。
- 文档与可核验 5：官网、目录页、定价页与仓库已打开；Community MIT，Pro 价格已核。
- 许可与获取 5：Community MIT；Pro $299 买断或 $199/年，含商用和后续更新。
- 总分 3.4，三星。依据一句：`MengTo/threeui`，7,225 星，最近推送 2026-09-03（ET）；Meng To / Design+Code；引用证据有限。

### Shadcn UI Kit

- 出品方 2：独立付费套件，官网 https://shadcnuikit.com/ 声明与官方 shadcn/ui 无隶属关系；本轮未找到可核对主产品星标的官方公开仓库，近于只靠产品站。按付费产品公司归类，但主仓缺失，出品方分按 2 计。
- 维护与规模 0.5：无稳定主仓，按低档计。
- 被引用 2：种子名单；官网自称 120K+ 月浏览、2000+ 付费客户、4K+ 社交关注，并展示围绕 @TobyBelhome 的 X 讨论，均未独立核验，引用证据有限。
- 文档与可核验 3：官网已打开；无主仓，档位价格未打开。
- 许可与获取 3：一次买断、终身更新、可商用及再分发限制已有说明；具体档位价格未核实。
- 总分 1.9，两星。依据一句：无稳定主仓；定价档位未打开，引用证据有限。

### TailAdmin

- 出品方 3：GitHub 组织 TailAdmin，官网 https://tailadmin.com/ ，出处清楚，按独立作者 / 工作室计。是否另有付费版未核实，不升为付费产品公司。
- 维护与规模 3.5：以 Next.js 仓 `TailAdmin/free-nextjs-admin-dashboard` 2,595 星为准，2k+ 定档 3；最近推送 2026-11-10 05:31（ET），+0.5。HTML 仓 2,393 星、最近推送 2026-10-29 02:15（ET），仅作对照，不另加分。
- 被引用 2：种子名单；官网自称 80k+ 用户，未独立核验，引用证据有限。
- 文档与可核验 4：官网与两座仓库已打开；是否另有付费版未打开定价页。
- 许可与获取 3：两仓均为 MIT，官网按免费开源模板推广；付费版未核实。
- 总分 3.1，三星。依据一句：`free-nextjs-admin-dashboard` 2,595 星，最近推送 2026-11-10（ET）；付费版未核实，引用证据有限。

### 21st

- 出品方 3：社区登记处，GitHub `serafimcloud/21st` 与官网 https://21st.dev/ 清楚，按社区合集 / 目录计。主仓已停滞，故不为 4。
- 维护与规模 2.5：主仓 5,557 星，5k+ 定档 3.5；最近推送 2025-05-28 11:55（ET），超过约 1 年，-1 得 2.5。官网仍在运营。相关仓 `21st-dev/magic-mcp` 6,457 星，不是主产品仓，不用来定档。
- 被引用 3：社区登记处，后续 X 扩搜中 @21st_dev 作为合集账户出现；还不算行业默认入口。
- 文档与可核验 4：官网与仓库已打开；会员价未打开。
- 许可与获取 3：浏览免费，每天 2 次免费复制；会员价未核实。
- 总分 3.0，三星。依据一句：`serafimcloud/21st` 5,557 星，公开仓停于 2025-05-28（ET），站仍在运营；会员价未打开。

### ReUI

- 出品方 3：GitHub `keenthemes/reui`，官网 https://reui.io/ ，KeenThemes 出品的付费产品，出处清楚。
- 维护与规模 3.5：4,046 星，2k+ 定档 3；最近推送 2026-10-16 06:15（ET），30 天内 +0.5。
- 被引用 3：官网展示署名为 shadcn 的评价、称属 trusted registries，为站内展示，未独立核验原帖；有产品站与仓可核，按有提及但非默认入口计。
- 文档与可核验 5：官网、仓库与定价（Pro 一次性 $249，Ultimate $499）已核对。
- 许可与获取 5：免费组件与 primitives 为 MIT；Pro / Ultimate 价格与边界清楚。
- 总分 3.6，四星。依据一句：`keenthemes/reui`，4,046 星，最近推送 2026-10-16（ET）；Pro $249 / Ultimate $499。

### Aura

- 出品方 3：与 ThreeUI 同属 Meng To / Design+Code，官网 https://www.aura.build/ 清楚，按独立作者 / 工作室计。
- 维护与规模 0.5：未找到可核对本产品星标的官方仓库，无稳定主仓，按低档计。
- 被引用 2：种子名单，引用证据有限。
- 文档与可核验 4：官网与定价页已打开；无产品主仓可核源码。
- 许可与获取 5：免费档仅个人使用、无 AI 额度；年付 Pro $12.50/月（$250/年），Max $25/月，Ultra $50/月；另有积分包。
- 总分 2.5，三星。依据一句：无稳定主仓；Meng To / Design+Code；定价已核，引用证据有限。

### affectUI

- 出品方 3：GitHub `flohoeller/affectui`，官网 https://www.affectui.com/ ，独立作者，出处清楚。
- 维护与规模 2.5：704 星，500+ 定档 2；最近推送 2026-11-10 08:17（ET），+0.5。
- 被引用 2：种子名单，引用证据有限。
- 文档与可核验 5：官网、仓库已打开；46 项 MIT，Pro 一次性起价 $249。
- 许可与获取 5：免费 / 付费边界与起价清楚。
- 总分 3.2，三星。依据一句：`flohoeller/affectui`，704 星，最近推送 2026-11-10（ET）；引用证据有限。

### Efferd

- 出品方 2：当前产品未发现仍作为主仓库维护的公开 GitHub；旧仓 `shabanhr/efferd-ui` 指向 https://legacy.efferd.com 。出处尚能对应到作者，但当前主仓缺失，近于只靠产品站。
- 维护与规模 0.5：无稳定主仓（旧仓 149 星、最近推送 2025-12-10 07:53（ET）、license 字段 NOASSERTION，不代表当前产品），按低档计。
- 被引用 2：种子名单；官网站内展示 @shadcn、Guillermo Rauch 等评价及「Trusted by people at」Vercel、Cal.com、Tesla 等，清单已注明这是「这些公司里的人」，不是已核实的公司采购，引用证据有限。
- 文档与可核验 4：官网、docs、定价页已打开；无当前主仓。
- 许可与获取 3：免费 blocks 可用，Pro $149、Team $399 一次买断，商用限制已有说明；当前产品无清晰 SPDX（旧仓 NOASSERTION）。
- 总分 2.0，两星。依据一句：无稳定主仓；旧仓 `shabanhr/efferd-ui` 149 星，指向 legacy。

### Shadcn Space

- 出品方 3：GitHub `shadcnspace/shadcnspace`，官网 https://shadcnspace.com/ ，出处清楚，按独立作者 / 工作室计。
- 维护与规模 2.5：797 星，500+ 定档 2；最近推送 2026-11-05 00:13（ET），+0.5。
- 被引用 2：种子名单，引用证据有限。
- 文档与可核验 4：官网与仓库已打开；Pro 价格未打开。
- 许可与获取 3：免费 MIT 清楚；Pro 价格未核实。
- 总分 2.8，三星。依据一句：`shadcnspace/shadcnspace`，797 星，最近推送 2026-11-05（ET）；Pro 定价未打开。

### Shadcn Studio

- 出品方 3：GitHub `shadcnstudio/shadcn-studio`，官网 https://shadcnstudio.com/ ，付费平台，出处清楚。
- 维护与规模 2：1,988 星，未到 2k，定档 2；最近推送 2026-08-20 06:38（ET），不加不减。公开仓库落后于仍在更新的网站。
- 被引用 2：种子名单；官网自称 1,600+ 开发者，并展示署名为 @shadcn 的「Nice.」，未独立核验，引用证据有限。
- 文档与可核验 4：官网与定价（Pro 一次性 $249）已打开；仓库 license 字段 NOASSERTION。
- 许可与获取 3：免费档可用，Pro $249 含终身更新清楚；公开仓 SPDX 未解析。
- 总分 2.7，三星。依据一句：`shadcnstudio/shadcn-studio` 1,988 星，公开仓最近推送 2026-08-20（ET），落后于网站。

### Hugeicons

- 出品方 3：GitHub `hugeicons/hugeicons`，官网 https://hugeicons.com/ ，付费图标套件公司，出处清楚。
- 维护与规模 2.5：1,230 星，500+ 定档 2；最近推送 2026-11-11 01:53（ET），+0.5。
- 被引用 2：种子名单，引用证据有限。
- 文档与可核验 4：官网与仓库已打开；Pro 定价页未打开。
- 许可与获取 3：公开包 MIT 清楚；完整库为 Pro，价格未核实。
- 总分 2.8，三星。依据一句：`hugeicons/hugeicons`，1,230 星，最近推送 2026-11-11（ET）；Pro 定价未打开。

### Shadcnblocks

- 出品方 3：官网 https://www.shadcnblocks.com/ ，付费产品公司，出处清楚；后续记录其收购了 Kibo UI。
- 维护与规模 0.5：公开免费仓 `shadcnblocks/shadcn-ui-blocks` 413 星（150+ 定档 1.5），最近推送 2025-10-09 16:08（ET），超过约 1 年 -1，得 0.5。公开免费仓落后于商业目录。license 字段 NOASSERTION。
- 被引用 2：种子名单；收购关系在扩搜中有记录，但缺少独立高质量合集引用记录，引用证据有限。
- 文档与可核验 4：官网与定价（Pro $149、Premium $299、Elite $399，终身）已打开；免费仓 SPDX 未解析，仓已落后。
- 许可与获取 3：付费档位与终身买断清楚；免费仓 license 字段 NOASSERTION。
- 总分 2.3，两星。依据一句：免费仓 `shadcn-ui-blocks` 413 星，最近推送 2025-10-09（ET），落后于商业目录。

### MotionSites

- 出品方 1（2026-11-11 续核后仍为 1）：种子条目官网 https://motionsites.org/ 的 About、Terms、Privacy、Contact 与页脚均未具名运营者。条款只写内容 “owned by the operator of this service”；页脚为 “© 2026 MotionSites. All rights reserved.” 联系邮箱为 support@motionsites.org。另有域名 https://motionsites.ai/ ，页脚与隐私政策写 “Operated by Viktor Odainyi, sole trader”，并链到 X @viktoroddy、YouTube @ViktorOddy。该站自称 “MotionSites AI — Official Premium AI Website Prompts”，组织仓 [Motionsites-AI/claude-skill](https://github.com/Motionsites-AI/claude-skill)（1,982 星，最近推送 2026-10-26，主页指向 motionsites.ai）也只服务 .ai。本轮未在 .org 与 .ai 之间找到互相指向的官方归属声明，故不把 Viktor Odainyi 写成 motionsites.org 的已核出品方。类型保持「依据不足」，分项仍为 1。
- 维护与规模 0.5：无稳定主仓（`.ai` 上的 claude-skill 仓不是 motionsites.org 产品主仓，不用于定档），按低档计。
- 被引用 2：种子名单，引用证据有限。
- 文档与可核验 4：官网与会员页已打开；Lifetime 精确标价在本轮页面抓取中未清楚显示。
- 许可与获取 3：有免费库；月 $29、季 $69、年 $149 已核；Lifetime 标价未核清；无公开许可证。
- 总分 1.7，两星。依据一句：motionsites.org 出品方仍依据不足；无稳定主仓；Lifetime 标价未核清。邻站 motionsites.ai 页脚具名为 Viktor Odainyi，两站关系未在官网交叉声明。

### shadcn/ui

- 出品方 5：官方 `shadcn-ui/ui`，该领域公认标准项目。
- 维护与规模 5：127,881 星，100k+ 定档 5；最近推送 2026-11-11 03:44（ET），+0.5 后封顶 5。
- 被引用 5：清单写明本名单里权威性最高，也是多数第三方套件的底座，按行业默认入口计。
- 文档与可核验 5：官网、docs、blocks 与仓库均已打开；MIT，免费。
- 许可与获取 5：MIT，免费。
- 总分 5.0，五星。依据一句：`shadcn-ui/ui`，127,881 星，最近推送 2026-11-11（ET）；领域标准项目。

### OpenUI（Thesys）

- 出品方 4：GitHub `thesysdev/openui`，官网 https://www.openui.com/ ，Thesys 运营的开放标准与云服务，官网与主仓清楚，15,079 星，按独立但被广泛使用的付费产品公司项目计，不是大厂官方。
- 维护与规模 4.5：15,079 星，10k+ 定档 4；最近推送 2026-11-11 02:22（ET），+0.5。
- 被引用 2：种子名单；文件中无高质量合集或官方互链记录，引用证据有限。
- 文档与可核验 4：官网与仓库已打开；Cloud / Gateway 定价未打开。
- 许可与获取 3：框架 MIT 清楚；Cloud 是否收费未核实。
- 总分 3.6，四星。依据一句：`thesysdev/openui`，15,079 星，最近推送 2026-11-11（ET）；Cloud 定价未打开，引用证据有限。

### OpenUI（W&B）

- 出品方 5：GitHub `wandb/openui` 为 Weights & Biases 官方仓库，按大厂官方计。
- 维护与规模 5：22,748 星，20k+ 定档 4.5；最近推送 2026-11-05 01:10（ET），+0.5。
- 被引用 3：公开仓星标很高，按有可见度但文件中缺少合集/默认入口记录计；不为 4。
- 文档与可核验 1：仓库标明主页 https://openui.fly.dev/ 本轮 curl 连接失败（状态 000）；仓库页为 200。按「主页无法打开」计 1。
- 许可与获取 5：Apache-2.0，文件中未另列付费档。
- 总分 4.0，四星。依据一句：`wandb/openui`，22,748 星，最近推送 2026-11-05（ET）；标明主页本轮连接失败。

### CopilotKit

- 出品方 4：GitHub `CopilotKit/CopilotKit`，官网 https://www.copilotkit.ai/ ，官网与主仓清楚，38,625 星，按付费产品公司中被广泛使用的开源 SDK 计，不升为开源主导项目或大厂官方。
- 维护与规模 5：38,625 星，20k+ 定档 4.5；最近推送 2026-11-11 03:31（ET），+0.5。
- 被引用 3：官网引用 Docusign、Evergreen Wealth，并提到 TechCrunch Series A 与 DeepLearning.AI 课程；首页“多数 Fortune 500”为官网自我表述，本轮未独立核实，故不为 4。
- 文档与可核验 4：官网与仓库已打开；企业 / 云价格未打开。
- 许可与获取 3：MIT 清楚；企业 / 云价格未核实。
- 总分 4.0，四星。依据一句：`CopilotKit/CopilotKit`，38,625 星，最近推送 2026-11-11（ET）；企业 / 云价格未打开。

### Magic UI

- 出品方 4：GitHub `magicuidesign/magicui`，官网 https://magicui.design/ ，23,200 星，官网与主仓清楚，按独立但在生态中被广泛使用计。类型仍为独立作者 / 工作室。
- 维护与规模 5：23,200 星，20k+ 定档 4.5；最近推送 2026-11-09 10:21（ET），+0.5。
- 被引用 4：X 上与 Aceternity、shadcn 常被并称；多条「holy trinity」与 top UI 合集点名。不为 5。
- 文档与可核验 4：官网与仓库已打开；模板/周边是否另有付费未单独打开商店页。
- 许可与获取 3：开源层 MIT 清楚；周边付费未核实。
- 总分 4.2，四星。依据一句：`magicuidesign/magicui`，23,200 星，最近推送 2026-11-09（ET）；X 合集常与 Aceternity、shadcn 并称。

### Aceternity UI

- 出品方 2：作者线索为 X @mannupaaji / @aceternitylabs，官网 https://ui.aceternity.com/ 清楚；主产品无独立公开主仓可核对本轮星标（组织下多为 boilerplate），近于只靠产品站与口碑。类型按独立作者 / 工作室。
- 维护与规模 0.5：无稳定主仓，按低档计。
- 被引用 4：记录为「X 上几乎所有 shadcn 动效合集都会点名」。
- 文档与可核验 4：官网与定价页已打开；无独立主仓可核源码规模。
- 许可与获取 5：免费层可用；定价页 1 年许可 $169（原价 $249）、Lifetime $199（原价 $299）、Team $1,590（原价 $1,990），均为一次付款。
- 总分 2.6，三星。依据一句：无稳定主仓；X 合集几乎必被点名；定价页已核。

### coss ui（原 Origin UI）

- 出品方 5：GitHub `cosscom/ui`（原 origin-space/originui 已指向此仓），现为 Cal.com 设计系统，官网 https://coss.com/ui ，遗留集 https://coss.com/origin ；originui.com 重定向至此。按大厂官方计，并在依据中写明迁移。
- 维护与规模 4.5：10,823 星，10k+ 定档 4；最近推送 2026-11-09 06:36（ET），+0.5。
- 被引用 4：X 合集里仍常写「Origin UI」（@orcdev、@om_patel5、@sonorafa 等）。不为 5。
- 文档与可核验 5：现站、遗留页、仓库与重定向均已打开；MIT，官网宣称免费开源。
- 许可与获取 5：MIT，免费开源。
- 总分 4.7，五星。依据一句：`cosscom/ui`，10,823 星，最近推送 2026-11-09（ET）；Cal.com 官方，Origin UI 已迁入。

### Kibo UI

- 出品方 3：GitHub `shadcnblocks/kibo`，官网 https://www.kibo-ui.com/ ，已被 Shadcnblocks 收购（见 shadcnblocks 博客），现按付费产品公司归属；仍开源。作者 Hayden Bleasel 亦做 AI Elements，仅作备注。
- 维护与规模 3：3,983 星，2k+ 定档 3；最近推送 2026-05-04 02:00（ET），不加不减（未满一年，也不在 30 天内）。
- 被引用 3：出现在 @naymur_dev、@21st_dev、@orcdev、@haydenbleasel 相关讨论中，还不算默认入口。
- 文档与可核验 5：官网、仓库与收购说明已打开；MIT，官网写 forever 免费开源。
- 许可与获取 5：MIT，官网写免费开源。
- 总分 3.5，四星。依据一句：`shadcnblocks/kibo`，3,983 星，最近推送 2026-05-04（ET）；已被 Shadcnblocks 收购。

### Tailark

- 出品方 3：GitHub `tailark/blocks`，作者 @MeschacIrung，官网 https://tailark.com/ ，独立作者，出处清楚。
- 维护与规模 3：2,341 星，2k+ 定档 3；最近推送 2026-07-29 07:19（ET），不加不减。
- 被引用 4：记录为 X 上常进 Top 10，@orcdev Top 列表几乎必提，@naymur_dev blocks 列表亦出现。
- 文档与可核验 5：官网、开源仓与 Pro 定价页已打开。
- 许可与获取 5：开源 MIT；Pro Essentials $249、更高档 $299 / $499，一次买断（定价页；页面展示划线价更高，本表只采用现价）。
- 总分 3.7，四星。依据一句：`tailark/blocks`，2,341 星，最近推送 2026-07-29（ET）；X Top 列表几乎必提。

### Motion Primitives

- 出品方 3：GitHub `ibelick/motion-primitives`，官网 https://www.motion-primitives.com/ ，独立作者，出处清楚。
- 维护与规模 3.5：6,933 星，5k+ 定档 3.5；最近推送 2026-09-28 09:32（ET），不加不减。
- 被引用 3：出现在 @naymur_dev、@madebyluca、@tamimbuilds 等合集，还不算默认入口。
- 文档与可核验 4：官网与仓库已打开；Pro 定价页 https://pro.motion-primitives.com/ 未见清晰标价数字。
- 许可与获取 3：免费 MIT 清楚；Pro 价格未核清。
- 总分 3.3，三星。依据一句：`ibelick/motion-primitives`，6,933 星，最近推送 2026-09-28（ET）；Pro 价格未核清。

### AI Elements（Vercel）

- 出品方 5：GitHub `vercel/ai-elements`，Vercel 官方。仍可在 https://elements.ai-sdk.dev/ 使用；官方文档 https://ui.shadcn.com/docs/ai-elements 说明新项目应改用 shadcn/ui 上的 AI Elements 模式。
- 维护与规模 3.5：2,515 星，2k+ 定档 3；最近推送 2026-10-14 13:04（ET），30 天内 +0.5。
- 被引用 4：有官方文档互链（指向 shadcn 上的新模式），并出现在 @orcdev Top 10、@haydenbleasel、@sonorafa 等讨论中。因官方引导新项目改走 shadcn 模式，本项不按「该仓库仍是默认入口」给 5。
- 文档与可核验 4：原站与 shadcn 文档已打开；仓库 license 字段 NOASSERTION。
- 许可与获取 3：免费可装；license 字段未解析为 SPDX，使用以文档与仓库说明为准。
- 总分 4.1，四星。依据一句：`vercel/ai-elements`，2,515 星，最近推送 2026-10-14（ET）；新项目官方指向 https://ui.shadcn.com/docs/ai-elements 。

### Animate UI

- 出品方 3：GitHub `imskyleen/animate-ui`，官网 https://animate-ui.com/ ，独立作者，出处清楚。
- 维护与规模 3.5：4,966 星，2k+ 定档 3；最近推送 2026-11-09 04:15（ET），+0.5。
- 被引用 3：出现在 @madebyluca、@orcdev 等列表。
- 文档与可核验 3：官网与仓库已打开；license 字段 NOASSERTION，具体 SPDX 以仓库文件为准，细节不全。
- 许可与获取 3：官网按开源推广；SPDX 未解析。
- 总分 3.1，三星。依据一句：`imskyleen/animate-ui`，4,966 星，最近推送 2026-11-09（ET）；license 字段 NOASSERTION。

### Cult UI

- 出品方 3：GitHub `nolly-studio/cult-ui`，官网 https://www.cult-ui.com/ ，独立工作室，出处清楚。
- 维护与规模 4：7,086 星，5k+ 定档 3.5；最近推送 2026-10-28 23:57（ET），+0.5。
- 被引用 3：出现在 @orcdev、@21st_dev、@alibey_10 等讨论。
- 文档与可核验 4：官网与仓库已打开；`/pricing` 为 404，agent blocks 具体价未打开独立定价页。
- 许可与获取 3：组件层 MIT 清楚；AI agent blocks 为一次购买，价格未核实。
- 总分 3.4，三星。依据一句：`nolly-studio/cult-ui`，7,086 星，最近推送 2026-10-28（ET）；agent blocks 定价未打开。

### SmoothUI

- 出品方 3：GitHub `educlopez/smoothui`，官网 https://smoothui.dev/ ，独立作者，出处清楚。
- 维护与规模 2.5：1,054 星，500+ 定档 2；最近推送 2026-11-10 13:54（ET），+0.5。
- 被引用 3：出现在 @naymur_dev、@orcdev、@21st_dev 动画库列表。
- 文档与可核验 5：官网与仓库已打开；MIT，免费。
- 许可与获取 5：MIT，免费。
- 总分 3.4，三星。依据一句：`educlopez/smoothui`，1,054 星，最近推送 2026-11-10（ET）；MIT 免费。

### Dice UI

- 出品方 3：GitHub `sadmann7/diceui`，作者 @sadmann17，官网 https://www.diceui.com/ ，出处清楚。
- 维护与规模 3.5：2,111 星，2k+ 定档 3；最近推送 2026-11-10 08:31（ET），+0.5。
- 被引用 3：出现在 @sonorafa、@ajaypatel_aj、@orcdev 等讨论。
- 文档与可核验 5：官网与仓库已打开；MIT，免费。
- 许可与获取 5：MIT，免费。
- 总分 3.6，四星。依据一句：`sadmann7/diceui`，2,111 星，最近推送 2026-11-10（ET）；MIT 免费。

### MVP Blocks

- 出品方 3：GitHub `subhadeeproy3902/mvpblocks`，官网 https://blocks.mvp-subha.me/ ，独立作者，出处清楚。
- 维护与规模 2：835 星，500+ 定档 2；最近推送 2026-10-08 15:48（ET），不在 30 天内，不加不减。
- 被引用 3：出现在 @om_patel5、@trillionclues、@shakkkkkkklol 等讨论。
- 文档与可核验 5：官网与仓库已打开；BSD-3-Clause，免费开源。
- 许可与获取 5：BSD-3-Clause，免费开源。
- 总分 3.3，三星。依据一句：`subhadeeproy3902/mvpblocks`，835 星，最近推送 2026-10-08（ET）；BSD-3-Clause。

### Kokonut UI

- 出品方 3：GitHub `kokonut-labs/kokonutui`，官网 https://kokonutui.com/ ，独立作者 / 工作室。页脚写 Backed by Vercel OSS，为官网自称，不据此写成 Vercel 官方产品。
- 维护与规模 3.5：2,295 星，2k+ 定档 3；最近推送 2026-11-10 07:47（ET），+0.5。
- 被引用 3：@21st_dev 多条合集置顶 Kokonut。
- 文档与可核验 4：官网与仓库已打开；Pro 价格未打开。
- 许可与获取 3：开源 MIT 清楚；Pro 价格未核实。
- 总分 3.3，三星。依据一句：`kokonut-labs/kokonutui`，2,295 星，最近推送 2026-11-10（ET）；「Backed by Vercel OSS」为官网自称；Pro 定价未打开。

### Blocks.so

- 出品方 3：GitHub `ephraimduncan/blocks`，官网 https://blocks.so/ ，独立作者，出处清楚。
- 维护与规模 2.5：1,859 星，未到 2k，定档 2；最近推送 2026-10-30 15:48（ET），+0.5。
- 被引用 3：出现在 @naymur_dev「Blocks.so」、@orcdev「Blocks . so」。
- 文档与可核验 5：官网与仓库已打开；MIT，免费。
- 许可与获取 5：MIT，免费。
- 总分 3.4，三星。依据一句：`ephraimduncan/blocks`，1,859 星，最近推送 2026-10-30（ET）；MIT 免费。

### UI Layouts

- 出品方 3：GitHub `ui-layouts/uilayouts`，作者 Naymur（与合集帖 @naymur_dev 相关），官网 https://www.ui-layouts.com/ ，独立作者，出处清楚。
- 维护与规模 3.5：3,853 星，2k+ 定档 3；最近推送 2026-10-31 04:31（ET），+0.5。
- 被引用 3：出现在 @naymur_dev、@tamimbuilds；合集作者与项目相关，不升为 4。
- 文档与可核验 5：官网与仓库已打开；MIT，免费。
- 许可与获取 5：MIT，免费。
- 总分 3.6，四星。依据一句：`ui-layouts/uilayouts`，3,853 星，最近推送 2026-10-31（ET）；合集作者与项目相关。

### Intent UI

- 出品方 3：GitHub `irsyadadl/intentui`，官网 https://intentui.com/ ，独立作者，出处清楚。
- 维护与规模 2.5：1,980 星，未到 2k，定档 2；最近推送 2026-11-10 02:52（ET），+0.5。
- 被引用 3：出现在 @naymur_dev blocks 列表。
- 文档与可核验 4：官网、blocks 页与仓库已打开；付费 license 档位价未完整打开商店结账页。
- 许可与获取 3：仓库 MIT 清楚；付费档位价未完整打开。
- 总分 3.0，三星。依据一句：`irsyadadl/intentui`，1,980 星，最近推送 2026-11-10（ET）；付费档位价未完整打开。

### 8bitcn/ui

- 出品方 3：GitHub `TheOrcDev/8bitcn-ui`，作者即合集博主 @orcdev，官网 https://www.8bitcn.com/ ，出处清楚。
- 维护与规模 3.5：2,070 星，2k+ 定档 3；最近推送 2026-11-05 15:29（ET），+0.5。
- 被引用 3：作者本人合集 + @naymur_dev「8bitcn Blocks」。因部分引用为作者自列，不升为 4。
- 文档与可核验 5：官网与仓库已打开；MIT，免费。
- 许可与获取 5：MIT，免费。
- 总分 3.6，四星。依据一句：`TheOrcDev/8bitcn-ui`，2,070 星，最近推送 2026-11-05（ET）；作者亦为合集博主。

### HextaUI

- 出品方 3：GitHub `preetsuthar17/hextaui`，官网 https://hextaui.com/ ，独立作者，出处清楚。主仓弱，但不改出品方类型。
- 维护与规模 2：150 星，150+ 定档 1.5；最近推送 2026-10-31 05:30（ET），+0.5。按准则示例，约 150 星须把维护与规模打在低档。
- 被引用 2：仅记录 @21st_dev 合集点名，属少量提及；按准则示例，被引用也按低档，并注明引用证据有限。
- 文档与可核验 4：官网与仓库已打开；MIT。细节深度在原记录中着墨不多，不为 5。
- 许可与获取 5：MIT。
- 总分 2.9，三星。依据一句：`preetsuthar17/hextaui`，150 星，最近推送 2026-10-31（ET）；维护与规模、被引用按低档。

### Fancy Components

- 出品方 3：GitHub `danielpetho/fancy`，官网 https://www.fancycomponents.dev/ ，独立作者，出处清楚。
- 维护与规模 3：3,303 星，2k+ 定档 3；最近推送 2026-03-14 06:34（ET），未满一年，不下调 1，但须注明公开仓相对停更、网站仍在。
- 被引用 3：出现在 @21st_dev 动画库列表「Fancy Components」。
- 文档与可核验 5：文档站与仓库已打开；MIT，免费。
- 许可与获取 5：MIT，免费。
- 总分 3.5，四星。依据一句：`danielpetho/fancy`，3,303 星，公开仓最近推送 2026-03-14（ET），相对停更。

### Lightswind UI

- 出品方 3：GitHub `codewithMUHILAN/Lightswind-UI-Library`，官网 https://lightswind.com/ ，独立作者，出处清楚。
- 维护与规模 2.5：1,277 星，500+ 定档 2；最近推送 2026-10-30 08:24（ET），+0.5。
- 被引用 2：记录为 @pruthveeee 资源帖，属少量提及，引用证据有限。
- 文档与可核验 3：官网与仓库已打开；首页写 312+ 动画组件与 559+ UI blocks，组件页另写 260+，文案不一致；Pro / Enterprise 价格未打开。
- 许可与获取 3：开源组件 MIT 清楚；Pro / Enterprise 另有商业许可（页脚说明），价格未核实。
- 总分 2.7，三星。依据一句：`Lightswind-UI-Library`，1,277 星，最近推送 2026-10-30（ET）；组件数量文案不一致，Pro 价格未打开。

### Shaders

- 出品方 3：GitHub `shader-effects-inc/shaders`，官网 https://shaders.com/ ，组织名含 inc，开源库加订阅 / 买断 Pro，按付费产品公司计；未另证「广泛使用」，出品方分为 3。
- 维护与规模 4：5,900 星，5k+ 定档 3.5；最近推送 2026-11-09 22:52（ET），+0.5。
- 被引用 3：记录为 X @adityawaslost 等推荐帖，按有渠道提及计。
- 文档与可核验 5：官网、仓库与 Pro 定价已打开。
- 许可与获取 5：库 MIT；Pro $10/月（年付 $120）或 Lifetime $299。
- 总分 3.8，四星。依据一句：`shader-effects-inc/shaders`，5,900 星，最近推送 2026-11-09（ET）；Pro 定价已核。

### Scrolltide

- 出品方 3（2026-11-11 续核，由 1 上调）：官网 https://www.scrolltide.co/ 页脚将 X https://x.com/himanshubuildss、Instagram https://www.instagram.com/himanshubuilds、YouTube 频道作为产品社交链出；联系邮箱为 support@scrolltide.co、privacy@scrolltide.co。条款 “Who we are” 只写 “Scrolltide operates scrolltide.co”，未写法定姓名或公司。据此把出品方类型改为独立作者 / 工作室（官方社交账号可核），分项计 3；法定姓名未在官方法务页具名，不另写进依据结论。仍无稳定主仓。
- 维护与规模 0.5：无稳定主仓，按低档计。
- 被引用 2：权威性主要在 X 传播（单帖数千赞/收藏），主要为作者主推帖，引用证据有限，不为 3。
- 文档与可核验 4：官网与定价页已打开；无官方仓。
- 许可与获取 3：定价页月付促销价 $39（原价 $59）、年付 $12/月（$144/年）、Lifetime $299（原价 $449）已核；无公开软件许可证。
- 总分 2.3，两星。依据一句：官方社交链到 @himanshubuildss；无稳定主仓；条款未写法定姓名；定价页已核。

### Skiper UI

- 出品方 3（2026-11-11 续核，由 1 上调）：官网导航将 Founder 标为 gxuri，并链到 X https://x.com/Gur__vi；页脚社交链到 LinkedIn https://www.linkedin.com/in/gurvindersingh02/ 与 GitHub https://github.com/Gurvinder-Singh02（GitHub 显示名 Gxuri，blog https://gxuri.me，twitter_username Gur__vi）。个人站 https://gxuri.me/ 写 “Yo I'm guri and i build stuff”，并链出 skiper-ui.com。隐私政策联系方式为 hello@skiper-ui.com，并写可直接联系 x.com/guri___。据此改为独立作者 / 工作室，分项计 3。Gurvinder-Singh02 名下仍无本产品主仓（公开仓为 next-inspect-ui 与一个 shadcn/ui fork）；组织 skiper-ui 亦无可用的公开主产品仓，搜索到的多为克隆/旧仓。
- 维护与规模 0.5：无稳定主仓，按低档计。
- 被引用 3：@orcdev 合集常列 Skiper UI；文案自称属 trusted registries，该自称未独立核验，不升为 4。
- 文档与可核验 3：官网已打开；无主仓，Pro 价格未打开清晰价目表。
- 许可与获取 3：免费层可商用但需署名，Pro 免署名，边界有说明；Pro 价格未核实。
- 总分 2.4，两星。依据一句：Founder 栏与官方社交核到 Gurvinder Singh / gxuri；无稳定主仓；Pro 价格未打开。

### Cue / Cue Kit

- 出品方 3（2026-11-11 续核，由 1 上调）：官方 https://cuedesign.space/llms.txt 与 https://cuedesign.space/llms-full.txt 写明 “Who makes it: Alok Srivastava, independent founder (India)”，并给出 hello@cuedesign.space 与 X @Alok619308。llms-full.txt 将 Alok Srivastava 列为 DPDP 申诉官员。据此改为独立作者 / 工作室，分项计 3。仍未找到可核对本产品星标的官方公开主仓（GitHub 用户 designedbyalok 显示名为 Alok Kumar，且无 Cue 产品仓，不把该账号等同为已核主仓或同一人，除非官网另行声明）。
- 维护与规模 0.5：无稳定主仓，按低档计。
- 被引用 2：记录为 @Alok619308 等及检索命中，属少量提及，引用证据有限。
- 文档与可核验 3：两站与 llms.txt / llms-full.txt 已打开；Cue+ 页内见 $99 lifetime，记录已写明下单前需再核，细节不能当作已结清。
- 许可与获取 3：Kit 文案写 MIT；Cue+ 为一次买断，页内 $99 文案需再核。
- 总分 2.2，两星。依据一句：官方 llms.txt 具名为 Alok Srivastava，独立创始人；无稳定主仓；Cue+ 页内 $99 文案需再核。


### assistant-ui

- 出品方 4：GitHub `assistant-ui/assistant-ui`，官网 https://www.assistant-ui.com/ ，页脚写 © 2026 AgentbaseAI Inc.，首页写 Backed by Combinator。官网与主仓清楚，13,057 星，按付费产品公司中被广泛使用的档计 4，不升为 5（非 Vercel 一类大厂官方标准项目）。
- 维护与规模 4.5：13,057 星，10k+ 定档 4；最近推送 2026-11-11 05:18（ET），+0.5。
- 被引用 4：收录于 20,806 星的 awesome-shadcn-ui；站点另展示 LangChain 等讨论，不按行业默认入口给 5。
- 文档与可核验 4：官网、文档入口与仓库已打开；Cloud / 定价页未打开。
- 许可与获取 3：MIT 清楚；商业 Cloud 价格未核实。
- 总分 4.0，四星。依据一句：`assistant-ui/assistant-ui`，13,057 星，最近推送 2026-11-11（ET）；AgentbaseAI Inc.；Cloud 定价未打开。

### Plate

- 出品方 4：GitHub `udecode/plate`，官网 https://platejs.org/ ，16,697 星，官网与主仓清楚，按开源主导且被广泛使用计 4。
- 维护与规模 4.5：16,697 星，10k+ 定档 4；最近推送 2026-11-11 03:34（ET），+0.5。
- 被引用 4：awesome-shadcn-ui。
- 文档与可核验 4：文档站与仓库已打开；license 字段 NOASSERTION；pro.platejs.org 模板未打开。
- 许可与获取 3：README 徽章写 MIT，GitHub 字段未解析；Pro / 模板价格未核实。
- 总分 4.0，四星。依据一句：`udecode/plate`，16,697 星，最近推送 2026-11-11（ET）；license 字段 NOASSERTION。

### tweakcn

- 出品方 4：GitHub `jnsahaj/tweakcn`，官网 https://tweakcn.com/ ，10,536 星，官网与主仓清楚，按独立但被广泛使用计 4。类型为独立作者 / 工作室。
- 维护与规模 4：10,536 星，10k+ 定档 4；最近推送 2026-09-03 13:06（ET），不加不减。
- 被引用 4：awesome-shadcn-ui Colors 分类；此前在 X 扩搜未决名单中。
- 文档与可核验 3：官网 HTTP 200，但本轮抓取几乎只有标题（重度客户端）；核对主要靠仓库 README。
- 许可与获取 5：Apache-2.0；README 按开源主题编辑器说明。是否另有付费档未打开独立定价页，因 SPDX 与获取方式（开源工具）已清楚，本项仍计 5。
- 总分 4.0，四星。依据一句：`jnsahaj/tweakcn`，10,536 星，最近推送 2026-09-03（ET）；官网正文抓取不足。

### Vaul

- 出品方 4：GitHub `emilkowalski/vaul`，官网 https://vaul.emilkowal.ski/ ，8,709 星，官网与主仓清楚，按独立但被广泛使用计 4。
- 维护与规模 2.5：8,709 星，5k+ 定档 3.5；最近推送 2025-10-03 15:25（ET），超过约 1 年，-1。
- 被引用 4：awesome-shadcn-ui。
- 文档与可核验 4：官网、GitHub 与 Documentation 入口已打开。
- 许可与获取 5：MIT，免费。
- 总分 3.7，四星。依据一句：`emilkowalski/vaul`，8,709 星，公开仓最近推送 2025-10-03（ET），超过约 1 年。

### Number Flow

- 出品方 4：GitHub `barvian/number-flow`，官网 https://number-flow.barvian.me/ 写 Built by Max Barvian，7,794 星，官网与主仓清楚，按独立但被广泛使用计 4。
- 维护与规模 3.5：7,794 星，5k+ 定档 3.5；最近推送 2026-09-20 09:51（ET），不加不减。
- 被引用 4：awesome-shadcn-ui Animations 分类。
- 文档与可核验 5：文档、示例、仓库与许可均可当场核对；免费。
- 许可与获取 5：MIT，免费。
- 总分 4.1，四星。依据一句：`barvian/number-flow`，7,794 星，最近推送 2026-09-20（ET）；MIT 免费。

### Inspira UI

- 出品方 4：GitHub `unovue/inspira-ui`，主页 https://inspira-ui.com/ ，5,088 星，README 定位为 Vue / Nuxt 上对 Aceternity UI 与 Magic UI 的开源对应集。官网与主仓清楚，按开源主导且在 Vue 生态中被广泛使用计 4。
- 维护与规模 4：5,088 星，5k+ 定档 3.5；最近推送 2026-10-17 15:13（ET），30 天内 +0.5。
- 被引用 4：awesome-shadcn-ui。
- 文档与可核验 3：官网本轮几乎无可用正文（重度客户端）；核对主要靠仓库 README。
- 许可与获取 5：MIT，免费。
- 总分 4.0，四星。依据一句：`unovue/inspira-ui`，5,088 星，最近推送 2026-10-17（ET）；官网正文抓取不足。

### gluestack-ui

- 出品方 3：组织 gluestack，README 写 Copyright © 2026 GeekyAnts；官网有 Pro 与公司 LinkedIn。按付费产品公司、官网与出处清楚计 3，未另证「广泛使用」到 4。
- 维护与规模 3.5：5,356 星，5k+ 定档 3.5；最近推送 2026-09-02 05:49（ET），不加不减。
- 被引用 4：awesome-shadcn-ui。
- 文档与可核验 4：官网、文档入口与仓库已打开；GitHub license 字段为空；Pro 定价页未打开。
- 许可与获取 3：README 称 MIT，字段未解析；Pro 价格未核实。
- 总分 3.5，四星。依据一句：`gluestack/gluestack-ui`，5,356 星，最近推送 2026-09-02（ET）；README 称 MIT / GeekyAnts，字段为空。

### shadcn-admin

- 出品方 4：GitHub `satnaing/shadcn-admin`，演示站 https://shadcn-admin.netlify.app/ ，16,655 星，仓与演示可核，按独立但被广泛使用计 4。
- 维护与规模 4：16,655 星，10k+ 定档 4；最近推送 2026-09-10 18:30（ET），不加不减。
- 被引用 4：awesome-shadcn-ui。
- 文档与可核验 3：演示站可打开但正文很薄；核对主要靠仓库 README。
- 许可与获取 5：MIT，免费。
- 总分 4.0，四星。依据一句：`satnaing/shadcn-admin`，16,655 星，最近推送 2026-09-10（ET）；演示站正文很薄。

### Neobrutalism components

- 出品方 3：GitHub `ekmas/neobrutalism-components`，官网 https://www.neobrutalism.dev/ ，独立作者，出处清楚。5,648 星未另升到「广泛使用」的 4。
- 维护与规模 3.5：5,648 星，5k+ 定档 3.5；最近推送 2026-09-19 08:25（ET），不加不减。
- 被引用 4：awesome-shadcn-ui。
- 文档与可核验 4：文档站与仓库已打开；MIT。
- 许可与获取 5：MIT，免费。
- 总分 3.7，四星。依据一句：`ekmas/neobrutalism-components`，5,648 星，最近推送 2026-09-19（ET）；MIT 免费。

### Animata

- 出品方 3：GitHub `codse/animata`，官网 https://animata.design/ ，独立组织/作者，出处清楚。
- 维护与规模 3.5：2,997 星，2k+ 定档 3；最近推送 2026-11-03 11:01（ET），+0.5。
- 被引用 4：awesome-shadcn-ui Animations 分类。
- 文档与可核验 4：官网与仓库已打开；MIT。官网写 Free forever。
- 许可与获取 5：MIT，免费。
- 总分 3.7，四星。依据一句：`codse/animata`，2,997 星，最近推送 2026-11-03（ET）；MIT 免费。

### Tremor

- 出品方 3：GitHub `tremorlabs/tremor`，官网 https://www.tremor.so/ ，页脚写 © 2025 Tremor Labs, Inc.。首页有 “Tremor is joining Vercel” 声明，本轮未打开公告全文，不改写为 Vercel 官方。按付费产品公司、出处清楚计 3。
- 维护与规模 2：3,698 星，2k+ 定档 3；最近推送 2025-10-10 09:08（ET），超过约 1 年，-1。
- 被引用 4：awesome-shadcn-ui；站内另有公开讨论链出。
- 文档与可核验 4：官网、文档与仓库已打开；Premium Blocks 定价未打开。
- 许可与获取 3：开源层 Apache-2.0 清楚；Premium Blocks 价格未核实。
- 总分 3.1，三星。依据一句：`tremorlabs/tremor`，3,698 星，公开仓最近推送 2025-10-10（ET）；页脚 Tremor Labs, Inc.；加盟 Vercel 声明未打开全文。

### tablecn

- 出品方 3：GitHub `sadmann7/tablecn`，官网 https://tablecn.com/ ，作者即 Dice UI 的 sadmann7，出处清楚。不因关联项目升到 4。
- 维护与规模 4：6,379 星，5k+ 定档 3.5；最近推送 2026-11-10 15:55（ET），+0.5。
- 被引用 4：awesome-shadcn-ui。
- 文档与可核验 5：演示站、Dice UI 文档链接与仓库已打开；MIT，免费。
- 许可与获取 5：MIT，免费。
- 总分 4.0，四星。依据一句：`sadmann7/tablecn`，6,379 星，最近推送 2026-11-10（ET）；与 Dice UI 同作者。

### Eldora UI

- 出品方 3：GitHub `karthikmudunuri/eldoraui`，官网 https://www.eldoraui.site/ 写 Built by Karthik Mudunuri，出处清楚。
- 维护与规模 2：1,977 星，未到 2k，定档 2；最近推送 2026-09-26 13:39（ET），不加不减。
- 被引用 4：awesome-shadcn-ui Animations 分类。
- 文档与可核验 4：官网与仓库已打开；MIT。
- 许可与获取 5：MIT，免费。
- 总分 3.3，三星。依据一句：`karthikmudunuri/eldoraui`，1,977 星，最近推送 2026-09-26（ET）；MIT 免费。

### Launch UI

- 出品方 3：GitHub `launch-ui/launch-ui`，官网 https://www.launchuicomponents.com/ ，页脚写 © 2026 mikolajdobrucki，出处清楚。
- 维护与规模 2.5：874 星，500+ 定档 2；最近推送 2026-11-04 06:11（ET），+0.5。
- 被引用 4：awesome-shadcn-ui。
- 文档与可核验 4：官网、文档与仓库已打开；定价页未打开。
- 许可与获取 3：MIT 清楚；定价页未打开。
- 总分 3.2，三星。依据一句：`launch-ui/launch-ui`，874 星，最近推送 2026-11-04（ET）；定价页未打开。

### Novel

- 出品方 4：GitHub `steven-tey/novel`，官网 https://novel.sh/ ，16,466 星，官网与主仓清楚，按独立但被广泛使用计 4。
- 维护与规模 3：16,466 星，10k+ 定档 4；最近推送 2025-01-18 09:26（ET），超过约 1 年，-1。
- 被引用 4：awesome-shadcn-ui。
- 文档与可核验 4：官网、文档入口与仓库已打开；Apache-2.0。
- 许可与获取 5：Apache-2.0，免费。
- 总分 3.9，四星。依据一句：`steven-tey/novel`，16,466 星，公开仓最近推送 2025-01-18（ET），超过约 1 年。

### TWBlocks

- 出品方 3：GitHub `tommyjepsen/twblocks`，官网 https://www.twblocks.com/ ，独立作者，出处清楚。
- 维护与规模 2：780 星，500+ 定档 2；最近推送 2025-12-15 07:30（ET），不加不减。
- 被引用 4：awesome-shadcn-ui。
- 文档与可核验 4：官网与仓库已打开；MIT。
- 许可与获取 5：MIT，免费。
- 总分 3.3，三星。依据一句：`tommyjepsen/twblocks`，780 星，最近推送 2025-12-15（ET）；MIT 免费。

### background-snippets

- 出品方 3：GitHub `ibelick/background-snippets`，官网 https://bg.ibelick.com/ 写 Made by @Ibelick，出处清楚。作者亦做 Motion Primitives，不据此改变类型或升到 4。
- 维护与规模 2：2,026 星，2k+ 定档 3；最近推送 2024-09-26 10:05（ET），超过约 1 年，-1。
- 被引用 4：awesome-shadcn-ui。
- 文档与可核验 4：展示站与仓库已打开；license 字段为空。
- 许可与获取 3：站点按免费复制推广；SPDX 未解析。
- 总分 3.1，三星。依据一句：`ibelick/background-snippets`，2,026 星，公开仓最近推送 2024-09-26（ET）；license 字段为空。

### LiveKit Agents UI

- 出品方 5：LiveKit 官方产品页 https://livekit.com/products/agents-ui （由 https://livekit.io/ui 重定向），页脚 © LiveKit，地址 369 Sutter St, San Francisco, CA。按大厂官方计 5。
- 维护与规模 2：UI 代码位于 `livekit/components-js` 的 `packages/shadcn`。该仓 474 星，未到 500，按 150+ 定档 1.5；最近推送 2026-11-10 18:06（ET），+0.5。产品页展示的 livekit/agents 与 livekit 主仓星标不用于本项定档。
- 被引用 4：awesome-shadcn-ui；同时是官方产品文档中的 Agents UI。
- 文档与可核验 4：产品页、LiveKit 文档与仓库已打开；平台定价页未作为本组件库价格打开。
- 许可与获取 5：`components-js` 为 Apache-2.0；产品页写 100% open source。
- 总分 3.9，四星。依据一句：LiveKit 官方；UI 所在仓 `livekit/components-js` 474 星，最近推送 2026-11-10（ET），不按主产品仓抬分。



### Apps SDK UI（OpenAI）

- 出品方 5：OpenAI 官方开发者文档 https://developers.openai.com/plugins/concepts/ui-guidelines ，以及官方仓 `openai/apps-sdk-ui`。按大厂官方计 5。
- 维护与规模 2：本轮 `gh api` 983 星，500+ 定档 2；最近推送 2026-05-19 20:30（ET），不加不减。npm 页 Updated 为 2026-08-13 17:18（ET），不替代仓的 `pushed_at` 定档。
- 被引用 5：OpenAI 官方文档即 ChatGPT Apps UI 的标准入口。
- 文档与可核验 5：官方 UI 指南、搭建文档、仓库、Storybook 介绍与 npm 页均已打开；MIT 可核。指南提及的 Figma 库本轮未核到稳定 URL。
- 许可与获取 5：仓库与 npm 均为 MIT；npm README 写 MIT © OpenAI。免费开源。
- 总分 4.3，四星。依据一句：OpenAI 官方；`openai/apps-sdk-ui` 983 星，最近推送 2026-05-19（ET）；MIT。

### Claude Artifacts / Claude Design（Anthropic）

- 出品方 5：Anthropic 官方新闻 https://www.anthropic.com/news/claude-design-anthropic-labs ，以及 claude.com 产品页。按大厂官方计 5。
- 维护与规模 1.5：无稳定主仓，先按低档 1；Help Center 文首写 Updated over a week ago，按官方文档近 30 天内更新保守 +0.5。
- 被引用 5：Anthropic 官方 Artifacts / Claude Design 产品与文档即该类标准入口。
- 文档与可核验 4：产品页、新闻、Help Center 与 Claude Code Artifacts 文档已打开；定价页全文未打开。
- 许可与获取 3：官方 FAQ 写明 Design / Slides / Docs 含在含 Free 在内的计划中，部分能力按计划或管理员开关；精确价格未核实。
- 总分 3.8，四星。依据一句：Anthropic 官方产品与文档；无稳定主仓；Help Center 写 Updated over a week ago；定价页未打开。

### Gemini 官方设计与生成式 UI 文档（Google）

- 出品方 5：Google 官方 Design 站点、Google Research 博文与 Google AI Studio 教程。按大厂官方计 5。
- 维护与规模 1：无稳定主仓，按低档 1。已打开注明日期的页面为 Research 博文 2025-11-18、AI Studio 文 2026-09-16，均不在约 30 天内，也不按超过约 1 年下调。
- 被引用 5：上述官方页面即 Google / Gemini 在该主题上的标准公开说明。
- 文档与可核验 4：设计文章、研究博文与 AI Studio 教程已打开；不是公开组件库，也无组件许可包可核。
- 许可与获取 3：页面可免费阅读；未见可复用组件许可证。
- 总分 3.7，四星。依据一句：Google 官方设计与生成式 UI 文档；无稳定主仓；不是公开组件 kit。

### Microsoft 365 Copilot MCP apps UX 指南

- 出品方 5：Microsoft Learn 官方文档 https://learn.microsoft.com/en-us/microsoft-365/copilot/extensibility/plugin-mcp-apps-ui-guidelines 。按大厂官方计 5。
- 维护与规模 1：无稳定主仓（本项是指南文档，不以 Fluent 仓抬分），按低档 1。页面未见可核的最近更新日期。
- 被引用 5：Microsoft Learn 即 Copilot MCP 应用 UX 的官方标准入口。
- 文档与可核验 5：指南正文已打开，含原则、inline / side-by-side 规则，以及指向 Fluent 2 的视觉要求。
- 许可与获取 5：Microsoft Learn 文档可免费阅读；获取方式清楚。
- 总分 4.0，四星。依据一句：Microsoft Learn 官方 UX 指南；无稳定主仓；视觉层指向 Fluent 2。

### Apple Human Interface Guidelines

- 出品方 5：Apple 官方开发者站点 https://developer.apple.com/design/human-interface-guidelines/ 。按大厂官方计 5。
- 维护与规模 1.5：无稳定主仓，先按低档 1；官方 What’s new 最近记录为 2026-11-06，属约 30 天内，保守 +0.5。
- 被引用 5：Apple HIG 本身即 Apple 平台设计的标准入口。
- 文档与可核验 5：Design 总入口、What’s new、Design Resources、Getting started 与 Generative AI 专页均已打开。
- 许可与获取 5：页面写 Copyright © 2026 Apple Inc. All rights reserved；文档与 Design Resources 在官方站点公开提供。不是开源许可证，但许可与获取都清楚。
- 总分 4.1，四星。依据一句：Apple 官方 HIG 与 Design Resources；无稳定主仓；What’s new 最近记录 2026-11-06（ET 日期以官方页面为准）。

### Material Design 3

- 出品方 5：https://m3.material.io/ 与 Get started 写明 Material Design is a design system built and supported by Google designers and developers。按大厂官方计 5。
- 维护与规模 1：无单一稳定主仓（实现分散在多平台，不以某一个实现仓代替设计系统本体），按低档 1。官网首页写 Material at Google I/O 2026，日期 2026-05-19，不加不减。
- 被引用 5：m3.material.io 即 Material 3 的官方标准入口。
- 文档与可核验 5：官网、Foundations、Get started 已打开，并写明许可。
- 许可与获取 5：Get started 原文写 All Material 3 content, guidelines, imagery, and resources are available under the Apache 2.0 or CC BY 4.0 license。
- 总分 4.0，四星。依据一句：Google 官方 Material 3 站点；无单一稳定主仓；许可写 Apache 2.0 或 CC BY 4.0；官网更新记录 2026-05-19。

### Fluent 2 Design System

- 出品方 5：https://fluent2.microsoft.design/ 为 Microsoft 官方 Fluent 2 设计系统。按大厂官方计 5。
- 维护与规模 5：官方 Web/React 主仓 `microsoft/fluentui` 本轮 20,399 星，20k+ 定档 4.5；最近推送 2026-11-10 17:16（ET），+0.5。不以 `fluentui-apple` / `fluentui-android` 抬分。
- 被引用 5：Fluent 2 官方站点即 Microsoft 设计系统的标准入口。
- 文档与可核验 5：设计系统站点、Develop 指南、react.fluentui.dev 介绍与仓库 LICENSE 均已打开。Storybook 组件预览本轮失败，介绍正文可用。
- 许可与获取 5：仓库 LICENSE 正文为 MIT License（Copyright (c) Microsoft Corporation），并注明 fonts and icons 另受 https://aka.ms/fluentui-assets-license 约束。GitHub SPDX 字段为 NOASSERTION，以打开的 LICENSE 正文为准。该资产许可页未再打开。
- 总分 5.0，五星。依据一句：Microsoft 官方 Fluent 2；`microsoft/fluentui` 20,399 星，最近推送 2026-11-10（ET）；LICENSE 正文为 MIT，字体与图标另有资产许可。

### HarmonyOS 设计体系

- 出品方 5：华为开发者联盟官方设计中心 https://developer.huawei.com/consumer/cn/design/ ，英文入口标题为 HarmonyOS NEXT Design。`developer.harmonyos.com/cn/design/` 301 至该中文设计中心。按大厂官方计 5。
- 维护与规模 1：无稳定主仓，按低档 1。设计资源页可见日期含 2022/07/04 与 2024/01/23；指南正文本身未显示可核的最近更新日期，不据此再下调或上调。
- 被引用 5：华为官方开发者设计中心即 HarmonyOS 设计体系的标准入口。
- 文档与可核验 4：设计中心、理念、原则、色彩 Token 专页与资源页已打开；英文入口正文几乎未抓取；另一条总览文档超时 / 403。
- 许可与获取 3：官方文档可免费阅读；资源页有华为帐号登录字样；未见开源许可证声明。
- 总分 3.7，四星。依据一句：华为官方 HarmonyOS / HarmonyOS NEXT 设计文档；无稳定主仓；一条总览 URL 未能打开。

### Astryx（Meta）

- 出品方 5：官方站点 https://astryx.atmeta.com/ 与博文写 Introducing Astryx by Meta；官方仓 `meta/astryx`。按大厂官方计 5。
- 维护与规模 5：本轮 `gh api` 24,050 星，20k+ 定档 4.5；最近推送 2026-11-11 05:35（ET），+0.5。官网标明 Currently in Beta，不因此改星标定档。
- 被引用 5：Meta 官方 Astryx 站点即该设计系统的标准入口。
- 文档与可核验 4：官网、介绍博文与仓库元数据已打开；组件文档未逐页打开；官方标明 Beta。
- 许可与获取 5：`gh api` license.spdx_id 为 MIT。
- 总分 4.9，五星。依据一句：Meta 官方；`meta/astryx` 24,050 星，最近推送 2026-11-11（ET）；MIT；官网标明 Beta。

### Designing Grok Bot（x.ai）

- 出品方 5：文章发布于 https://x.ai/news/designing-grok-bot ，og:url 同此。页脚写 © 2026 SpaceX Super Intelligence LLC，标题带 SpaceXSI。按该官方站点收录，出品方计大厂官方 5，不另臆测公司关系。
- 维护与规模 0.5：无稳定主仓，且正文未见可核发布日期，按低档 0.5。
- 被引用 4：这是 x.ai 上的官方设计长文，但不是持续更新的规范门户。
- 文档与可核验 4：该文已完整打开；品牌指南页返回 403；docs.x.ai Theming 已打开但只是 CLI 主题，不能补作设计系统文档。
- 许可与获取 3：页脚有版权声明；不是开源组件许可。
- 总分 3.3，三星。依据一句：x.ai 官方设计长文；无稳定主仓，未见发布日期；品牌指南页 403。

### Tailwind CSS

- 出品方 5：官方 utility-first CSS 框架本体，属该领域公认的标准项目。出品方类型记开源主导项目；LICENSE 写 Copyright (c) Tailwind Labs, Inc.，不因此改成大厂官方。
- 维护与规模 5：本轮 `gh api` `tailwindlabs/tailwindcss` 98,675 星。未按约 100k+ 定档 5，先按 20k+ 定档 4.5；最近推送 2026-11-10 19:08（ET），+0.5。
- 被引用 5：https://tailwindcss.com/ 与官方文档即该类样式基础设施的标准入口。
- 文档与可核验 5：官网、安装文档与 LICENSE 正文均已打开。
- 许可与获取 5：LICENSE 正文为 MIT License；免费开源。
- 总分 5.0，五星。依据一句：官方 Tailwind CSS；`tailwindlabs/tailwindcss` 98,675 星，最近推送 2026-11-10（ET）；MIT。

### Radix UI

- 出品方 5：官方无样式 React primitives，属该领域公认的标准项目。出品方类型记开源主导项目。官方仓描述写 Maintained by @workos，本轮未把官网未展开的公司关系写成大厂官方。
- 维护与规模 4.5：官方主仓 `radix-ui/primitives` 本轮 19,492 星，未按 20k+ 定档，先按 10k+ 定档 4；最近推送 2026-10-14 17:52（ET），+0.5。同组织 `radix-ui/themes`（8,839 星，最近推送 2026-04-11 14:39 ET）只作备注，不用于本分项。
- 被引用 5：https://www.radix-ui.com/primitives 即 Radix primitives 的官方标准入口。
- 文档与可核验 5：官网、Primitives Introduction、Themes Getting started 与 LICENSE 均已打开。
- 许可与获取 5：`radix-ui/primitives` 与 `radix-ui/themes` 的 LICENSE 均为 MIT。
- 总分 4.9，五星。依据一句：官方 Radix UI；主仓 `radix-ui/primitives` 19,492 星，最近推送 2026-10-14（ET）；MIT；Themes 另仓不并入本分项。

### Base UI

- 出品方 5：官方无样式 React 组件库，官网写 From the creators of Radix, Floating UI, and Material UI；官方 Quick start 写 shadcn/ui 以其为 unstyled foundation。按该领域官方基础设施本体计 5。出品方类型记开源主导项目（官方主仓为 `mui/base-ui`，不另臆测为大厂官方）。
- 维护与规模 4.5：本轮 `gh api` 11,365 星，10k+ 定档 4；最近推送 2026-11-10 19:33（ET），+0.5。
- 被引用 5：https://base-ui.com/ 即 Base UI 的官方标准入口。
- 文档与可核验 5：官网、Quick start、FAQ 与 LICENSE 均已打开。
- 许可与获取 5：MIT；官网 FAQ 写 free for commercial use。
- 总分 4.9，五星。依据一句：官方 Base UI；`mui/base-ui` 11,365 星，最近推送 2026-11-10（ET）；MIT；与 Radix UI 已拆开。

### React Aria（Adobe）

- 出品方 5：Adobe 官方无样式组件与 hooks 库，站点为 react-aria.adobe.com，页脚写 Copyright Adobe。按大厂官方计 5。
- 维护与规模 4.5：官方 monorepo `adobe/react-spectrum` 本轮 16,024 星，10k+ 定档 4；最近推送 2026-11-10 22:11（ET），+0.5。与 React Spectrum 共用同一主仓，星标不重复相加。
- 被引用 5：Adobe 官方 React Aria 文档即该类无样式 primitives 的标准入口。
- 文档与可核验 5：官方站点、Getting started、同源文档页与仓库 README / LICENSE 均已打开。
- 许可与获取 5：官方仓 LICENSE 为 Apache-2.0；可免费安装使用。
- 总分 4.9，五星。依据一句：Adobe 官方 React Aria；共用 `adobe/react-spectrum` 16,024 星，最近推送 2026-11-10（ET）；Apache-2.0。

### React Spectrum（Adobe / S2）

- 出品方 5：Adobe 官方 Spectrum 设计系统的 React 实现。当前 Getting started 安装 `@react-spectrum/s2`；`llms.txt` 发行说明写 implementation of the updated Adobe design system。按大厂官方计 5。
- 维护与规模 4.5：与 React Aria 相同，按 `adobe/react-spectrum` 16,024 星计，10k+ 定档 4，最近推送 2026-11-10 22:11（ET），+0.5。不把星标加两次。
- 被引用 5：https://react-spectrum.adobe.com/ 即该官方实现的标准入口。
- 文档与可核验 5：Getting started 与官方 `llms.txt`（S2 文档目录，含组件、icons、illustrations、style macro、AI Components）以及仓库 README / LICENSE 已打开。官网首页与 `/react-spectrum/index.html` 本轮几乎无可用正文，已改用上述页面。
- 许可与获取 5：Apache-2.0；可免费安装使用。
- 总分 4.9，五星。依据一句：Adobe 官方 React Spectrum S2；共用 `adobe/react-spectrum` 16,024 星，最近推送 2026-11-10（ET）；Apache-2.0；首页正文不足已改用 Getting started 与 llms.txt。

### GSAP

- 出品方 5：该领域公认的标准 JavaScript 动画库。官方 Standard License 写由 Webflow 授权，知识产权归 Webflow，出品方类型记大厂官方。仓库仍为 `greensock/GSAP`，README 仍写 Copyright (c) 2008-2026, GreenSock. All rights reserved，已在依据中写明，不另臆测除此之外的公司关系。
- 维护与规模 5：本轮 `gh api` 30,453 星，20k+ 定档 4.5；最近推送 2026-11-03 19:56（ET），+0.5。仓内无 LICENSE 文件、GitHub license 字段为 null，但不按「无公开主仓」降档。
- 被引用 5：https://gsap.com/ 与官方文档即该类动效基础设施的标准入口。
- 文档与可核验 5：官网、安装文档、官方 Standard License 与仓库 README / package.json 均已打开。
- 许可与获取 5：官方 Standard "No Charge" GSAP License 已打开：可免费商用，禁止用于与 Webflow 视觉无代码动画能力竞争的工具；Last modified May 30, 2025。
- 总分 5.0，五星。依据一句：官方 GSAP；`greensock/GSAP` 30,453 星，最近推送 2026-11-03（ET）；官方 Standard License（Webflow 授权），仓内无 GitHub SPDX。

### Three.js

- 出品方 5：官方 JavaScript 3D 库，属该领域公认的标准项目。出品方类型记开源主导项目。
- 维护与规模 5：本轮 `gh api` `mrdoob/three.js` 118,131 星，100k+ 定档 5；最近推送 2026-11-11 05:17（ET），+0.5 后封顶 5。
- 被引用 5：https://threejs.org/ 与官方文档即该类 3D 基础设施的标准入口。
- 文档与可核验 5：官网（标题 three.js r187）、文档目录、仓库 README 中的 Usage 示例与 LICENSE 均已打开。手册 URL（`/manual/#en/creating-a-scene` 正文不足，`/manual/en/creating-a-scene.html` 404）未能作为依据。
- 许可与获取 5：LICENSE 正文为 The MIT License，Copyright © 2010-2026 three.js authors。
- 总分 5.0，五星。依据一句：官方 Three.js；`mrdoob/three.js` 118,131 星，最近推送 2026-11-11（ET）；MIT；手册专页本轮未能打开。

### React Three Fiber

- 出品方 5：pmndrs 官方的 three.js React renderer，属该领域公认的标准项目。出品方类型记开源主导项目。
- 维护与规模 5：本轮 `gh api` `pmndrs/react-three-fiber` 33,644 星，20k+ 定档 4.5；最近推送 2026-10-21 11:24（ET），+0.5。
- 被引用 5：官方文档即 R3F 的标准入口。
- 文档与可核验 5：https://r3f.docs.pmnd.rs/getting-started/introduction 与 https://docs.pmnd.rs/react-three-fiber/getting-started/introduction 均已打开且正文一致；LICENSE 为 MIT。
- 许可与获取 5：MIT；免费开源。
- 总分 5.0，五星。依据一句：pmndrs 官方 React Three Fiber；`pmndrs/react-three-fiber` 33,644 星，最近推送 2026-10-21（ET）；MIT。



### Canvas UI

- 出品方 3：GitHub `DavidHDev/canvas-ui`，官网 https://canvasui.dev/ ，LICENSE.md 写 Copyright (c) 2026 David Haz。独立作者，官网与主仓清楚。不升到 4。
- 维护与规模 4：本轮 `gh api` 5,398 星，5k+ 定档 3.5；最近推送 2026-11-08 16:49（ET），+0.5。
- 被引用 3：本轮在 X 与官网看到提及；官网展示的 @shadcn / @ChromiumDev 评价本轮未打开原帖，不据此抬到 4。引用证据有限，取 3。
- 文档与可核验 4：官网首页、Introduction、组件目录、README 与 LICENSE.md 已打开。`/docs/license` 本轮 404，已改用仓库许可文件。
- 许可与获取 5：LICENSE.md 为 MIT + Commons Clause：可在应用 / 网站 / 产品中免费商用，禁止再分发组件本身。获取方式（shadcn CLI，免费）清楚。
- 总分 3.6，四星。依据一句：`DavidHDev/canvas-ui`，5,398 星，最近推送 2026-11-08（ET）；MIT + Commons Clause。

### Vue Bits

- 出品方 3：GitHub `DavidHDev/vue-bits`，官网 https://vue-bits.dev/ ，LICENSE.md 写 Copyright (c) 2025 David Haz。README 写 official Vue port of React Bits。独立作者，官网与主仓清楚。不因与已收录的 React Bits 同作者升到 4。
- 维护与规模 3.5：本轮 4,646 星，未按 5k+ 定档，先按 2k+ 定档 3；最近推送 2026-10-19 06:00（ET），+0.5。
- 被引用 3：作为 React Bits 官方 Vue 移植出现；本轮未把它当成默认行业入口。引用证据有限，取 3。
- 文档与可核验 4：WebFetch 打开的官网首页、仓库 README 与 LICENSE.md 已核。直接 `curl` 官网时可见正文几乎只有标题，已改用 WebFetch。
- 许可与获取 5：LICENSE.md 为 MIT + Commons Clause：可在应用 / 网站 / 产品中免费商用，禁止再分发组件本身。官网写 Free forever。
- 总分 3.5，四星。依据一句：`DavidHDev/vue-bits`，4,646 星，最近推送 2026-10-19（ET）；MIT + Commons Clause；是 React Bits 的官方 Vue 移植。

### UI Skills

- 出品方 3：GitHub `ibelick/ui-skills`，官网 https://www.ui-skills.com/ ，LICENSE 写 Copyright (c) 2026 Julien Thibeaut。独立作者，官网与主仓清楚。
- 维护与规模 4.5：本轮 10,953 星，10k+ 定档 4；最近推送 2026-11-11 05:37（ET），+0.5。
- 被引用 3：作者本人宣布过星标里程碑，目录也收录了其他来源的 skills；还不算该类默认入口。取 3。
- 文档与可核验 4：官网、README（CLI / MCP）与 MIT LICENSE 已打开。站内有 Sign in，付费边界未另开专页。
- 许可与获取 5：MIT；README 写明 MIT。CLI 与 MCP 可免费使用。
- 总分 3.7，四星。依据一句：`ibelick/ui-skills`，10,953 星，最近推送 2026-11-11（ET）；MIT。

### Transitions.dev

- 出品方 3：GitHub `Jakubantalik/transitions.dev`，官网 https://transitions.dev/ ，LICENSE 写 Copyright (c) 2026 Jakub Antalik / Transitions.dev。独立作者，官网与主仓清楚。
- 维护与规模 4：本轮 6,244 星，5k+ 定档 3.5；最近推送 2026-11-08 06:03（ET），+0.5。
- 被引用 3：本轮主要来自作者账号与官网本身。引用证据有限，取 3。
- 文档与可核验 4：官网首页与 LICENSE 正文已打开。`https://transitions.dev/pricing` 本轮 404，精确价格未核。
- 许可与获取 3：自定义 Transitions.dev License 已打开（可用在商业项目，禁止再分发为竞争性 motion pack；tooling 为 MIT）。Pro / Business / Lifetime 在许可中出现，精确售价未核。
- 总分 3.4，三星。依据一句：`Jakubantalik/transitions.dev`，6,244 星，最近推送 2026-11-08（ET）；自定义许可已打开，定价页 404。

### Libraries.dev

- 出品方 3：GitHub `Jakubantalik/Libraries.dev`，官网 https://libraries.dev ，LICENSE 写 Copyright (c) 2026 Jakub Antalik。独立作者，官网与主仓清楚。
- 维护与规模 3.5：本轮 4,703 星，未按 5k+ 定档，先按 2k+ 定档 3；最近推送 2026-11-10 10:18（ET），+0.5。不以 `thinking-orbs` / `metal-fx` 等分仓星标抬分。
- 被引用 3：该名曾出现在合集线索中，本轮已打开官网；还不算默认入口。取 3。
- 文档与可核验 4：官网首页、FAQ、`/orbs`、`/beam` 与 MIT LICENSE 已打开。`/pricing` 本轮 404。
- 许可与获取 3：五个库的 FAQ 写 MIT、免费 npm；仓库亦为 MIT。Pro / Studio 价格未打开。
- 总分 3.3，三星。依据一句：`Jakubantalik/Libraries.dev`，4,703 星，最近推送 2026-11-10（ET）；库层 MIT，Pro 价格未打开。

### Sonner

- 出品方 3：GitHub `emilkowalski/sonner`，官网 https://sonner.emilkowal.ski ，独立作者，官网与主仓清楚。不在未打开 shadcn 文档互链的情况下升到 4。
- 维护与规模 4：本轮 13,190 星，10k+ 定档 4；最近推送 2026-08-10 07:13（ET），不加不减。
- 被引用 3：本轮打开了官网与课程站中的作者自述。未另开高质量合集或官方文档互链页，取 3。
- 文档与可核验 4：官网、Getting Started 与 MIT 仓库元数据已打开。
- 许可与获取 5：MIT；免费安装。
- 总分 3.6，四星。依据一句：`emilkowalski/sonner`，13,190 星，最近推送 2026-08-10（ET）；MIT。

### Acebuilder

- 出品方 3：官网 https://acebuilder.ai 写 Powered by Aceternity UI，由 @mannupaaji 简介指向。独立作者 / 工作室，出处清楚。无公开主仓，不升到 4。
- 维护与规模 1：无稳定公开主仓，按低档 1。不以官网「Used by over 120,000 people」文案抬分。
- 被引用 2：主要来自作者简介与产品官网。引用证据有限，取 2。
- 文档与可核验 4：官网与定价页已打开。无公开仓，许可条款页未打开。
- 许可与获取 3：定价页数字已核（Pro $25/月、Business $50/月、Studio $129/月）；许可条款未打开。
- 总分 2.5，三星。依据一句：Aceternity 官方 AI 搭建器；无稳定公开主仓；定价页已打开，许可条款未打开。

### FlyonUI

- 出品方 3：GitHub `themeselection/flyonui`，官网 https://flyonui.com/ ，LICENSE 写 Copyright (c) 2024 ThemeSelection。出品方类型记付费产品公司。官网与主仓清楚。
- 维护与规模 3：本轮 2,540 星，2k+ 定档 3；最近推送 2026-03-20 02:34（ET），不加不减。官网写 v2.4.1，不替代 `pushed_at`。
- 被引用 2：本轮主要来自作者 @ajaypatel_aj 简介与官网。引用证据有限，取 2。
- 文档与可核验 4：官网首页与 LICENSE 正文已打开。`/docs/introduction` 本轮为 404 页。
- 许可与获取 3：原始代码 MIT，但 LICENSE 写明捆绑 Preline UI 与 daisyUI，并要求遵守 Preline Fair Use 等条款。站内有 Pro Version，精确价格未打开。
- 总分 3.0，三星。依据一句：`themeselection/flyonui`，2,540 星，最近推送 2026-03-20（ET）；原始代码 MIT，捆绑组件另有许可；Pro 价格未打开。



## 第一阶段 E：GitHub 头部官方或标准项目（2026-11-11）

以下各节为本轮任务 E 新增打分，不改写此前条目（含任务 D 新增的 Canvas UI、Vue Bits、UI Skills、Transitions.dev、Libraries.dev、Sonner、Acebuilder、FlyonUI）。星标与 `pushed_at` 已换算为 America/New_York，时点均为 2026-11-11。

### Ant Design

- 出品方 5：官方企业级设计系统与 React UI 库本体。LICENSE 写 Copyright (c) 2015-present Ant UED, https://xtech.antfin.com/ ，出品方类型记大厂官方。
- 维护与规模 5：本轮 `gh api` `ant-design/ant-design` 100,151 星，100k+ 定档 5；最近推送 2026-11-11 03:36（ET），+0.5 后封顶 5。
- 被引用 5：https://ant.design/ 与官方 React 介绍页即该设计系统的标准入口。
- 文档与可核验 5：官网、https://ant.design/docs/react/introduce/ 与 LICENSE 正文均已打开。
- 许可与获取 5：LICENSE 正文为 MIT License；免费开源。
- 总分 5.0，五星。依据一句：官方 Ant Design；`ant-design/ant-design` 100,151 星，最近推送 2026-11-11（ET）；MIT。

### Carbon Design System

- 出品方 5：官方 About 页写 Carbon Design System is IBM’s open-source design system；LICENSE 附录写 Copyright 2015 IBM Corp.。按大厂官方计 5。
- 维护与规模 4.0：本轮 `gh api` `carbon-design-system/carbon` 9,614 星，未按 10k+ 定档，先按 5k+ 定档 3.5；最近推送 2026-11-11 06:16（ET），+0.5。
- 被引用 5：https://www.carbondesignsystem.com/ 即 IBM 官方设计系统入口。
- 文档与可核验 5：官网、About、Developing overview 与 LICENSE / README 均已打开。`/developing/get-started/` 第一次请求超时，已改用成功打开的重定向页。
- 许可与获取 5：Apache-2.0；官方 About 写 made open source for anyone to use。
- 总分 4.8，五星。依据一句：IBM 官方 Carbon Design System；`carbon-design-system/carbon` 9,614 星，最近推送 2026-11-11（ET）；Apache-2.0。

### Material UI

- 出品方 5：官方 Material UI 是实现 Material Design 的 React 组件库本体，属该领域公认的标准项目。出品方类型记开源主导项目；不因实现 Google 规范而改成大厂官方。官方 FAQ 写 currently adopts Material Design 2，与已收录的 Material Design 3 文档已拆开。
- 维护与规模 5：本轮 `gh api` `mui/material-ui` 99,322 星。未按约 100k+ 定档 5，先按 20k+ 定档 4.5；最近推送 2026-11-11 06:12（ET），+0.5。
- 被引用 5：https://mui.com/material-ui/ 即该官方库的标准入口。
- 文档与可核验 5：官网、Getting started 与 LICENSE 正文均已打开。
- 许可与获取 5：LICENSE 正文为 MIT License，Copyright (c) 2014 Call-Em-All；官方仓描述写 Free forever。本轮未打开 MUI X 等付费层的精确价格，不写入本条。
- 总分 5.0，五星。依据一句：官方 Material UI；`mui/material-ui` 99,322 星，最近推送 2026-11-11（ET）；MIT；与 Material Design 3 已拆开。

### Bootstrap

- 出品方 5：官方开源设计系统本体。官网写 Bootstrap is the open source design system for everyone。出品方类型记开源主导项目。LICENSE 写 Copyright (c) 2011-2026 The Bootstrap Authors，不另臆测公司归属。
- 维护与规模 5：本轮 `gh api` `twbs/bootstrap` 175,039 星，100k+ 定档 5；最近推送 2026-11-11 04:58（ET），+0.5 后封顶 5。
- 被引用 5：https://getbootstrap.com/ 与官方文档即该类设计系统的标准入口。
- 文档与可核验 4：官网首页、v5.3 Getting started、官方博客与 LICENSE 已打开。`/docs/6.0/` 与 `/docs/6.0/getting-started/introduction/` 本轮正文不足或 404，故不给 5。
- 许可与获取 5：MIT；免费开源。官网将 Bootstrap 6 标为 alpha（`bootstrap@6.0.0-alpha.1`），稳定用法以已打开的 v5.3 文档为准。
- 总分 4.9，五星。依据一句：官方 Bootstrap；`twbs/bootstrap` 175,039 星，最近推送 2026-11-11（ET）；MIT；v6 文档页本轮正文不足，已改用首页、博客与 v5.3 入门文档。

### Chakra UI

- 出品方 5：官方组件系统本体，属该领域公认的标准项目。出品方类型记开源主导项目。LICENSE 写 Copyright (c) 2019 Chakra Systems Inc.。
- 维护与规模 5：本轮 `gh api` `chakra-ui/chakra-ui` 40,722 星，20k+ 定档 4.5；最近推送 2026-11-11 06:15（ET），+0.5。
- 被引用 5：https://chakra-ui.com/ 即官方标准入口。
- 文档与可核验 5：官网、安装文档与 LICENSE 均已打开。
- 许可与获取 5：MIT；免费开源。
- 总分 5.0，五星。依据一句：官方 Chakra UI；`chakra-ui/chakra-ui` 40,722 星，最近推送 2026-11-11（ET）；MIT。

### Headless UI

- 出品方 5：Tailwind Labs 官方无样式组件库本体，属该领域公认的标准项目。出品方类型记开源主导项目（与 Tailwind CSS 相同，不改成大厂官方）。官网页脚写 © 2026 Tailwind Labs Inc.。
- 维护与规模 4.5：本轮 `gh api` `tailwindlabs/headlessui` 28,823 星，20k+ 定档 4.5；最近推送 2026-04-13 12:12（ET），在 2025-11-11 之后、2026-10-12 之前，不加不减。仓库 README 未见停更或弃用声明，官网 v2.1 文档可打开。
- 被引用 5：https://headlessui.com 即官方标准入口。
- 文档与可核验 5：官网、React Menu 文档、README 与 LICENSE 均已打开。
- 许可与获取 5：MIT；免费开源。
- 总分 4.9，五星。依据一句：Tailwind Labs 官方 Headless UI；`tailwindlabs/headlessui` 28,823 星，最近推送 2026-04-13（ET）；MIT。

### PixiJS

- 出品方 5：官方 HTML5 / 2D WebGL 与 WebGPU 渲染引擎，属该领域公认的标准项目。出品方类型记开源主导项目。LICENSE 写 Copyright (c) 2013-2023 Mathew Groves, Chad Engler。
- 维护与规模 5：本轮 `gh api` `pixijs/pixijs` 48,668 星，20k+ 定档 4.5；最近推送 2026-11-10 10:14（ET），+0.5。
- 被引用 5：https://pixijs.com/ 与官方发行文档即该类 2D 基础设施的标准入口。
- 文档与可核验 5：官网、https://pixijs.download/release/docs/index.html 、README 与 LICENSE 已打开。`https://docs.pixijs.com/` 本轮未能稳定打开，已改用上述发行文档。
- 许可与获取 5：MIT；免费开源。
- 总分 5.0，五星。依据一句：官方 PixiJS；`pixijs/pixijs` 48,668 星，最近推送 2026-11-10（ET）；MIT；docs.pixijs.com 本轮未能打开。

### Babylon.js

- 出品方 5：官方 Web 3D 渲染引擎本体，属该领域公认的标准项目。出品方类型记开源主导项目。本轮打开的 license.md 与 package.json 未写明除此之外的公司版权，不臆测归属。
- 维护与规模 5：本轮 `gh api` `BabylonJS/Babylon.js` 26,325 星，20k+ 定档 4.5；最近推送 2026-11-10 21:04（ET），+0.5。
- 被引用 5：https://www.babylonjs.com/ 与 https://doc.babylonjs.com/ 即官方标准入口。
- 文档与可核验 5：官网、官方文档首页、README 与 Apache-2.0 license.md 均已打开。
- 许可与获取 5：Apache-2.0；免费开源。
- 总分 5.0，五星。依据一句：官方 Babylon.js；`BabylonJS/Babylon.js` 26,325 星，最近推送 2026-11-10（ET）；Apache-2.0。

### Anime.js

- 出品方 5：官方 JavaScript 动画引擎本体，属该领域公认的标准项目。出品方类型记开源主导项目。LICENSE.md 写 Copyright (c) 2025 Julian Garnier，已在依据中写明，不另改出品方类型。
- 维护与规模 5：本轮 `gh api` `juliangarnier/anime` 74,511 星，20k+ 定档 4.5；最近推送 2026-11-02 17:25（ET），+0.5。
- 被引用 5：https://animejs.com 与官方文档即该类 JS 动画库的标准入口。
- 文档与可核验 5：官网、https://animejs.com/documentation/getting-started/installation 与 LICENSE.md 均已打开。文档总目录页正文不足，已改用安装页。
- 许可与获取 5：MIT；README 写 100% free。
- 总分 5.0，五星。依据一句：官方 Anime.js；`juliangarnier/anime` 74,511 星，最近推送 2026-11-02（ET）；MIT。

### Lenis

- 出品方 4：darkroom.engineering 的官方平滑滚动库，官网与主仓都清楚，在生态中被广泛使用（本轮 17,190 星；Locomotive Scroll 官方页写 Built on top of Lenis）。出品方类型记独立作者 / 工作室。不因其官网自述「became the standard」升到 5。
- 维护与规模 4.5：本轮 `gh api` `darkroomengineering/lenis` 17,190 星，10k+ 定档 4；最近推送 2026-11-10 06:14（ET），+0.5。
- 被引用 5：https://lenis.dev 为官方入口；Locomotive Scroll 官方页将其写为底层，作为第二条官方出处。
- 文档与可核验 5：官网、README 与 LICENSE 均已打开。
- 许可与获取 5：MIT；官网写 free, open-source。
- 总分 4.6，五星。依据一句：darkroom.engineering 官方 Lenis；`darkroomengineering/lenis` 17,190 星，最近推送 2026-11-10（ET）；MIT；Locomotive 官方声明以其为底层。


## 使用说明

本表只服务概览层的权威性初评。星级不能代替委托方的可信度标注。深挖层（技术栈与组装分析、北极星问题、开放式洞察）不在本表范围内，相应结论不得从这些分数倒推。
