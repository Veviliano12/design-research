# 设计资源全景地图：渠道扩搜任务计划

制定时间：2026-11-11（America/New_York）  
对照准则：`research-criteria.md`  
已核实起点：`seed-inventory.md`（21 个产品名，OpenUI 拆成两条）

本计划把「去哪找、找什么、怎么判定新发现」写清楚。核心过滤仍是：**高视效动效**（motion / 3D / WebGL / shader / 沉浸式页面）和 **blocks**（可安装区块 / 页面片段）；同时兼顾组件、flows、模板、图标、设计系统。

已覆盖、扩搜时不要再当新项加入：ARC UI、beUI、Motion+、BoardUI、React Bits、ThreeUI、Shadcn UI Kit（shadcnuikit.com）、TailAdmin、21st.dev、ReUI、Aura（aura.build）、affectUI、Efferd、Shadcn Space、Shadcn Studio、Hugeicons、Shadcnblocks、MotionSites、官方 shadcn/ui、OpenUI（Thesys）、OpenUI（W&B）、CopilotKit。

每条新候选仍按起点轮同一套核实：打开官网与 GitHub（若有），记录做什么、内容类型、权威性来源；星标、许可、最近推送只用 `gh api` 或已打开的仓库页，不编造。无法核实官网的名字记入「未决」，不进正式清单。

---

## 优先级总览

| 优先级 | 渠道 | 本轮状态 | 目标产出 |
| --- | --- | --- | --- |
| P0 | X（公开帖与账号） | **本轮已执行**（2026-11-11） | 已核实 24 条新来源，详见 `expansion-x.md`；未决名称另列 |
| P1 | GitHub（awesome 列表、topic、registry、星标） | **第一批已执行**（2026-11-11）：已按 `birobirobiro/awesome-shadcn-ui`（本轮观测 20,806 星，主页 https://awesomeshadcn.dev/，最近推送 2026-11-10 15:53 ET）筛选并核实 18 条新来源，详见 `expansion-github.md`。列表其余条目、官方 registry 目录、topic 检索仍排队 | 继续对照该列表未收录项，并开官方 registry / topic 检索 |
| P2 | 官方文档 / changelog / registry / npm | 排队 | 登记处目录、官方 blocks、被引用的第三方 registry |
| P3 | 设计社区（Mobbin、Dribbble、Layer、Figma Community） | 排队 | 偏 flows / 设计稿 / 模式参考，和代码资产交叉验证 |
| P3 | 目录站、榜单、Newsletter、Discord | 排队 | 发现渠道本身，以及被多次点名的产品 |
| P4 | 付费市场（ThemeForest、Lemon Squeezy、Gumroad 等） | 排队 | 买断套件与模板，标清许可与可操作性 |

---

## 1. X（本轮执行）

**目的**：从推荐帖、合集帖、作者账号里抽出产品名和网址，再落地核实。只读公开内容，不发帖、不写草稿、不私信。

**检索角度（可改写，不机械套用）：**

- shadcn blocks / registry / kit 推荐、`best shadcn blocks`、`X alternatives`
- React Bits / Three.js 组件 / WebGL shader UI kit
- motion.dev、animated components library、landing page animation component library
- UI animation libraries 2025 / 2026
- 围绕这些账号的讨论与转发：`@shadcn`、Meng To / Design+Code、`@motiondotdev`、DavidHDev、21st.dev 相关账号

**具体任务：**

1. 用 X 全文检索（`search_posts_all`，优先 relevancy，带 `has:links` 或明确产品名；`-is:retweet`；需要时加 `min_likes:`）拉推荐帖与合集帖。
2. 对高频出现的产品名做去重，去掉已在起点名单中的项。
3. 从帖文、个人简介、官方账号提取候选官网 / GitHub，再 WebSearch + WebFetch + `gh api` 核实。
4. 记录发现路径：哪条帖或哪个账号，便于回溯。
5. 只收录能成为设计输入的来源（可复制代码、registry、套件、高视效目录），不收孤立 CodePen 或没有产品的单条推文。
6. 未核实的名字单独列入未决，不编造网址或星标。

**完成标准：** 一批高质量已核实新项写入扩搜清单，并更新同一份 Page；诊断列仍全部为「待诊断」。

---

## 2. GitHub（P1，本轮可轻量初探，其余排队）

**目的：** 用 awesome 列表、topic、星标和 registry 索引补上 X 上不一定被点名、但在开源圈已是大名称的库。

**具体任务（排队，可先做前两项）：**

1. 检索并打开常见 awesome 列表，至少包括：
   - awesome-shadcn / awesome-shadcn-ui
   - awesome-react
   - awesome-threejs / awesome-WebGL
   - awesome-tailwindcss
   - 名称或描述含 `awesome` + `ui animation` / `creative frontend` 的列表
2. 用 GitHub 搜索 / topic 找：`shadcn-ui`、`shadcn-registry`、`react-three-fiber`、`webgl`、`shaders`、`animated-components`、`ui-blocks`。按 star 与最近推送排序，只深挖仍在维护的。
3. 核对官方与社区 shadcn registry 索引（如 registries 目录、`registry.json` 集合），记录被多次引用、但起点名单没有的登记处。
4. 对每个明显候选走同一套核实（官网、做什么、内容类型、star / license / `pushed_at`）。
5. 把「只在 awesome 列表里露过面、还没打开主页」的名字记入待核实队列，而不是直接进正式清单。

**本轮若有时间：** 先扫 awesome-shadcn 类列表和 star 很高的 motion / three / blocks 库，只收录一眼就能确认、且起点名单没有的大名称。

---

## 3. 官方文档 / changelog / registry / npm（P2，排队）

**具体任务：**

1. 打开官方 shadcn/ui 的 registry / blocks / changelog，记下官方推荐或新出现的第三方 registry。
2. 检索 npm 上与 `shadcn`、`registry`、`blocks`、`animated-ui` 相关、下载量或 GitHub 关联度高的包，回连到产品站。
3. 查看 Motion、Three.js、React Three Fiber、GSAP 等文档的 showcase / ecosystem 页，收集被官方点名的组件库或示例集。
4. 记录 changelog 里新增的资源类型（例如新 primitives、新 block 类别），用于判断维护状态。

---

## 4. 设计社区（P3，排队）

渠道：Mobbin、Dribbble、Layer、Figma Community。这些更偏 **flows、模式、设计稿**，用来补代码库覆盖不到的输入，也用来交叉验证「谁在被设计师反复参考」。

**具体任务：**

1. Mobbin：按 flows / 动效 / 组件模式浏览高引用产品，记下可对应到代码资产的来源（不要把单个 App 截图当资产库）。
2. Dribbble / Layer：检索 web animation、shader、3D landing、design system kit，从作品描述和作者主页提取产品或套件链接。
3. Figma Community：检索 shadcn、UI kit、motion kit、blocks、design system，记录许可、是否与某个代码库对应。
4. 只把「可下载/可复制的库或套件」收进清单；单张概念稿放参考，不充数量。

---

## 5. 目录站、榜单、Newsletter、Discord（P3，排队）

**具体任务：**

1. 找出稳定的导航 / 榜单站（如各种 awesome 网站、UI 目录、creative showcase 聚合），记录站点本身是否也应作为「发现渠道」写入准则。
2. 检索长期 newsletter（frontend / creative dev / shadcn 生态），从近期期次里摘被重复推荐的库。
3. 记录活跃 Discord（shadcn、creative frontend、Three.js 等）里被置顶或反复提到的资源，但以能公开核验的链接为准。
4. 对同一产品被多个目录同时收录的，提高优先级，进入核实队列。

---

## 6. 付费市场（P4，排队）

渠道示例：ThemeForest、Lemon Squeezy、Gumroad、官方自建商店。

**具体任务：**

1. 按「shadcn blocks / Tailwind UI kit / Three.js template / animated landing」检索畅销或新品。
2. 必须写清：许可能否商用、能否再分发、是买断还是订阅、源码能否进私有仓库。
3. 与已有开源/半开源项去重（很多付费套件只是同一产品的商店页）。
4. 权威性依据改为销量和评论、作者既有开源声量，而不是 GitHub star（若无公开仓）。

---

## 核实与写入规则（各渠道通用）

- 先发现、后核实，再写入清单。没有官网或仓库可核对的，进「未决」。
- 新项必须标明来源渠道，以及带你找到它的帖、列表或页面。
- 诊断标注一律从「待诊断」起，不代用户打 OK / 不OK。
- 更新同一份 Page，不另开新页；起点条目的已核实事实不删、不改写，除非发现明确错误。
- 类别或渠道若有新增，先改 `research-criteria.md`，再继续扩搜。



## 本轮执行记录（2026-11-11，America/New_York）

- **X**：已用公开检索（`search_posts_all`）跑 shadcn blocks / React Bits alternatives / Magic UI·Aceternity / 动效库 / Three.js·WebGL 等角度，并跟了 @orcdev、@naymur_dev、@21st_dev、@himanshubuildss 等高互动合集帖。只读，未发帖。
- 新项已按与起点轮相同规则核实（官网 + `gh api` 星标/许可/`pushed_at`），写入 `expansion-x.md`，并更新同一份 Page。诊断列仍全部为「待诊断」。
- **GitHub 轻量**（较早记录）：当时未逐条打开 awesome 列表，只确认对照入口 [birobirobiro/awesome-shadcn-ui](https://github.com/birobirobiro/awesome-shadcn-ui)。

### GitHub 第一批（同日稍后）

- 已按 `birobirobiro/awesome-shadcn-ui`（本轮 `gh api` 观测 20,806 星）筛选高质量候选项，打开官网并用 `gh api` 核实主仓后，写入 `expansion-github.md`（18 条正式项）。避免与起点名单和 `expansion-x.md` 24 条重复。
- 同期补核了 MotionSites、Scrolltide、Skiper UI、Cue / Cue Kit 的出品方缺口：后三条已核到独立作者，MotionSites（motionsites.org）仍为依据不足。依据写入 `authority-scores.md`，并在 `expansion-x.md` / `seed-inventory.md` 加了短注。
- **仍排队**：该 awesome 列表中未收录的其余条目；官方 shadcn registry / changelog；GitHub topic 检索；P2–P4 渠道。未决名称见 `expansion-github.md` 与 `expansion-x.md`。


### 第一阶段官方摄入 A/B（同日稍后）

- 已按 `phase-1-plan.md` 执行第一阶段 **A. 模型大厂** 与 **B. 平台设计体系** 的官方摄入：打开官方设计 / 界面 / 生成式 UI 文档或官方组件 kit 后写入 `expansion-official.md`，并在 `authority-scores.md` 追加对应打分行。不改 `index.html`（清单合并稍后进行）。
- 本批不是原表 P2 的 registry / npm / changelog 扫货，也不把 `awesome-shadcn-ui` 尚未收录的余量当作第一阶段完成条件；该 awesome 余量仍属第二阶段或发现线索，见上文 GitHub 第一批「仍排队」。
- 已核对象与未入库原因见 `expansion-official.md`。


### 第一阶段官方摄入 C（同日稍后）

- 已按 `phase-1-plan.md` 与 `execution-plan.md` 任务二 C 执行第一阶段 **C. 基础设施官方本体**：只收官方项目本身（Tailwind CSS、Radix UI、Base UI、React Aria、React Spectrum、GSAP、Three.js、React Three Fiber），写入 `expansion-infra.md`，并在 `authority-scores.md` 追加对应打分行。不改 `index.html`（视觉改版并行，清单合并稍后进行），不提交、不推送。
- 已在清单中的官方 shadcn/ui、Motion / Motion+、Vercel AI Elements 只补核、不重复建条。衍生 kit、R3F 生态包（如 `@react-three/drei`）、Radix Icons / Colors 等相邻官方项目不作为本批独立新项。
- 已核对象、未入库原因，以及未能稳定打开的页面见 `expansion-infra.md`。


### 第一阶段 D（同日稍后）

- 已按 `phase-1-plan.md` 与 `execution-plan.md` 任务二 D 核 X 上高影响力专业账号及其官方产品：证据写入 `expansion-x-authors.md`，并在 `authority-scores.md` 追加建议入库项的打分行。不改 `index.html`，不提交、不推送。
- 状态：证据已完成，待并入 HTML。

### 第一阶段 E（同日稍后）

- 已按 `phase-1-plan.md` 与 `execution-plan.md` 任务二 E 执行第一阶段 **E. GitHub 头部官方或标准项目**：只收官方组织仓、该领域标准项目，或星标已明显处于头部且仍在维护的基础设施。证据写入 `expansion-github-head.md`，并在 `authority-scores.md` 追加本批打分行（未改写任务 D 新增各节）。不改 `index.html`，不提交、不推送。
- 建议新收录 10 条：Ant Design、Carbon Design System、Material UI、Bootstrap、Chakra UI、Headless UI、PixiJS、Babylon.js、Anime.js、Lenis。已打开官方渠道但未入库的对象（含 Motion 开源库与 Motion+ 同家族核验、Locomotive Scroll、Theatre.js、Lottie / dotLottie、Rive、Spline、Ark UI、Zag.js 等）见该文件排除表。
- 本批不是 `awesome-shadcn-ui` 余量扫货；该 awesome 余量仍属第二阶段或发现线索。
- 状态：证据已完成，待并入 HTML。
