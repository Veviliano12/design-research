# 第一阶段 D：X 高影响力专业账号及其官方产品

调研日期：2026-11-11（America/New_York）  
对照准则：`research-criteria.md`  
对照任务书：`phase-1-plan.md` 任务 D，以及 `execution-plan.md` 任务二 D  
对照前序：`expansion-x.md`（第一批产品核实，不改写其已核实事实）

本轮目标不是再扫合集帖里的长尾产品名，而是核验：**长期、专题性产出设计资产 / 动效 / 组件 / blocks / 生成式 UI 的专业账号**，以及他们指向的、尚未进入 82 条清单的官方产品。

账号目录与「建议入库」分开。账号只要达到头部标准即可记入，即使其产品已在 82 条中。新的清单行必须有本轮打开的官网或官方仓库。可信度一律「待诊断」，分析状态一律「待分析」，洞察一律「尚未形成洞察」。发现渠道对经这些账号核到的新产品记为 **X**。出品方类型仅在官网、许可页或官方主仓自行声明时归类。

星标、许可与 `pushed_at` 仅来自本轮 `gh api` 或已打开的官方页面 / LICENSE 正文；时间已换算为 America/New_York，并标注 ET。不编造未打开的价格、星标或技术细节。不改 `index.html`，不提交、不推送，不开始深挖。

X 公开资料一律经 Grok Bot 内置 `x` 命名空间读取（`get_users_by_usernames`、`get_users_posts`、`search_posts_all`）。本轮不发帖、不私信、不在浏览器登录 x.com。

已在 82 条清单中的产品只记入账号目录，不重复建条。

## 本轮怎么找、实际用过的检索

1. 先用 `get_users_by_usernames` 核 `expansion-x.md` 与任务书中的起始线索，以及已收录产品所暗示的作者 / 官方账号。请求的 `user.fields` 含 `created_at, description, public_metrics, verified, location, url, entities`。多数置顶帖的 `pinned_post_id` 本轮返回 Not Found，改用简介与时间线 / 检索帖。
2. 对达到或接近头部标准的账号，用 `get_users_posts` 和 / 或 `search_posts_all`（`from:`，并设 `start_time`）抽查跨时段专题帖，不只看简介。
3. 再检索补充头部专业账号（设计工程、动效 / WebGL / shader UI、官方组件与 blocks 作者、生成式 UI 实践者）。实际查询包括：
   - `("design engineer" OR "designengineering") ("component library" OR "ui components" OR "animated components" OR "ui kit") has:links -is:retweet`（relevancy；`min_likes` 被接口去掉，结果混入大量介绍机器人帖，只作线索）
   - `(WebGL OR shader OR GSAP OR "react three fiber") ("ui kit" OR "component library" OR components OR shaders) (library OR kit OR registry) has:links -is:retweet -from:boardyai`
   - `(url:cult-ui.com OR url:kokonutui.com OR url:fancycomponents.dev OR "Cult UI" OR "Kokonut UI" OR "Fancy Components") (building OR built OR creator OR author OR launching) -is:retweet`
   - `(from:mannupaaji OR from:davidhaz OR from:Ibelick OR from:emilkowalski OR from:dillionverma OR from:npm_i_shaders OR from:orcdev OR from:shadcn) (component OR components OR library OR registry OR animation OR shader OR UI) -is:retweet`（2024-01-01 起，recency）
   - 同上作者集合，窗口收束到 2024-01-01 至 2025-12-31，用于核长期产出
4. 候选官网用 WebFetch 或 `curl` 打开；GitHub 事实只用 `gh api` / `gh search repos`（`stargazers_count`、license、`pushed_at`）。维护加分锚点为 2026-11-11 ET：2026-10-12 及之后 +0.5；2025-11-11 之前 -1。
5. 未决名 OriginKit、Zepa UI 仅在现已达到头部标准时才改判；否则留在未决表并写本轮新理由。

## 达到头部标准的账号目录

关注者、发帖数等为 2026-11-11 本轮 API 观测，随后会变。`created_at` 已换算为 America/New_York。专题证据优先用本轮打开的帖或简介原文，不引用未再打开的旧记录。

| 账号 | 显示名 | X | 注册（ET） | 本轮公开指标 | 专题证据（本轮） | 指向的官方产品 | 产品是否已在 82 条 | 收录理由 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| @orcdev | OrcDev | https://x.com/orcdev | 2012-08-07 06:58 ET | 关注者 10,738；发帖 30,376；已认证（blue） | 简介链到 https://8bitcn.com 、https://orcdev.com ；本轮帖 https://x.com/orcdev/status/2118303406007714068 （2026-11-05）写为 Videorc 做了基于 shadcn/ui 的 UI library 与 registry | 8bitcn/ui（https://www.8bitcn.com/） | 是 | 长期专题博主兼已收录产品作者，身份与官网清楚 |
| @naymur_dev | Naymur Rahman | https://x.com/naymur_dev | 2023-01-02 22:13 ET | 关注者 1,057；发帖 2,871；已认证（blue） | 简介写 Building a Frontend ecosystem，链到 https://ui-layouts.com ；个人站 https://naymur.com/ | UI Layouts（https://www.ui-layouts.com/） | 是 | 已收录产品的公开作者，持续以前端生态为主题 |
| @21st_dev | 21st | https://x.com/21st_dev | 2025-10-01 18:38 ET | 关注者 3,909；发帖 216；认证类型 business | 简介「Building blocks for AI apps」，官网 http://21st.dev ；认证为 business | 21st（https://21st.dev/） | 是（种子名单） | 已收录产品的官方账号 |
| @himanshubuildss | Himanshu Hingorani | https://x.com/himanshubuildss | 2014-01-24 12:12 ET | 关注者 4,057；发帖 717；已认证（blue） | 简介写 Founder @ scrolltide.co，协作邮箱 himanshu@scrolltide.co；官网链到 https://www.scrolltide.co/ | Scrolltide（https://www.scrolltide.co/） | 是 | 已收录产品创始人，账号长期存在且主题对应官方产品 |
| @Alok619308 | Alok | https://x.com/Alok619308 | 2025-03-29 09:09 ET | 关注者 923；发帖 1,473；已认证（blue） | 简介写 Built cuedesign.space；本轮帖 https://x.com/Alok619308/status/2094424978150092846 （2026-08-31）介绍 Cue 组件库 | Cue / Cue Kit（https://www.cuedesign.space/） | 是 | 已收录产品的公开创始人，持续发布产品帖 |
| @mannupaaji | Manu Arora | https://x.com/mannupaaji | 2019-12-29 04:27 ET | 关注者 44,039；发帖 10,522；已认证（blue） | 简介写 Building aceternity.com，并列出 ui.aceternity.com、vibrant.design、acebuilder.ai；2025-12 仍在发 Aceternity Pro 模板帖，如 https://x.com/mannupaaji/status/2005931051911372894 | Aceternity UI（https://ui.aceternity.com/）；Acebuilder（https://acebuilder.ai ，本轮新核） | Aceternity UI 是；Acebuilder 否 | 高声量设计工程作者，官方产品稳定，且另有可核验的 AI 搭建产品 |
| @aceternitylabs | Aceternity | https://x.com/aceternitylabs | 2022-10-18 11:05 ET | 关注者 4,260；发帖 555 | 简介写 UI: ui.aceternity.com、Pro: pro.aceternity.com，官网 aceternity.com | Aceternity UI | 是 | 已收录产品的官方账号 |
| @haydenbleasel | Hayden | https://x.com/haydenbleasel | 2013-07-28 11:24 ET | 关注者 18,026；发帖 6,180；已认证（blue） | 简介写 MTS @OpenAI，Prev. @Vercel；个人站 https://haydenbleasel.com/ 。本轮简介当前链出 ultracite.ai、files-sdk.dev、useblume.dev，未再把 Kibo UI 写在简介第一行 | Kibo UI（https://www.kibo-ui.com/）；Vercel AI Elements（https://elements.ai-sdk.dev/） | 皆是 | 已收录产品的公开作者，长期公开身份清楚；本轮未把简介里的新工具当作设计资产入库 |
| @sadmann17 | sadman | https://x.com/sadmann17 | 2023-02-22 14:05 ET | 关注者 5,080；发帖 1,683；已认证（blue） | 简介原文「building diceui. open-source shadcn components, data table, and pptx editor」，官网 https://diceui.com | Dice UI（https://www.diceui.com/） | 是 | 已收录产品的公开作者，简介与产品一致 |
| @Gur__vi | Guri | https://x.com/Gur__vi | 2024-03-31 15:48 ET | 关注者 3,719；发帖 1,832；已认证（blue） | 简介「Design engineer, Building @skiperUi」，个人站 http://gxuri.me | Skiper UI（https://skiper-ui.com/） | 是 | 已收录产品作者 |
| @SkiperUi | skiper-ui | https://x.com/SkiperUi | 2025-01-01 12:12 ET | 关注者 798；发帖 49 | 简介写 uncommon components + shadcn CLI，官网 https://skiper-ui.com/ | Skiper UI | 是 | 已收录产品的官方账号，与作者账号一并登记 |
| @Ibelick | Ibelick | https://x.com/Ibelick | 2009-07-09 14:21 ET | 关注者 12,093；发帖 976；已认证（blue） | 简介写 design engineer，链到 mesurer.dev、ui-skills.com，个人站 http://ibelick.com ；本轮帖 https://x.com/Ibelick/status/2118015141564260594 （2026-11-04，ui-skills 过 10k 星）、https://x.com/Ibelick/status/2112530999447806236 （create-canvas skill） | Motion Primitives（https://www.motion-primitives.com/）；background-snippets（https://bg.ibelick.com/）；UI Skills（https://www.ui-skills.com/ ，本轮新核） | 前两条是；UI Skills 否 | 长期设计工程作者，已有收录产品，并另有可核验的 skills 目录 |
| @MeschacIrung | irung | https://x.com/MeschacIrung | 2019-10-29 13:51 ET | 关注者 4,189；发帖 2,666；已认证（blue） | 简介「Building tailark.com」，个人站 http://irung.me | Tailark（https://tailark.com/） | 是 | 已收录产品的公开作者 |
| @shadcn | shadcn | https://x.com/shadcn | 2009-04-14 15:46 ET | 关注者 248,709；发帖 7,853；已认证（blue） | 简介「I own a computer. / @vercel」，官网 https://shadcn.com | 官方 shadcn/ui（https://ui.shadcn.com/） | 是 | 官方相邻账号，只登记、不重复建条 |
| @imskyleen | Skyleen | https://x.com/imskyleen | 2015-02-18 16:44 ET | 关注者 830；发帖 94；已认证（blue） | 简介「Software Engineer & Designer \| Building @animate_ui」，个人站 https://skyleen.dev | Animate UI（https://animate-ui.com/） | 是 | 已收录产品作者；发帖量较少，与官方账号一并登记 |
| @animate_ui | Animate UI | https://x.com/animate_ui | 2025-03-26 14:43 ET | 关注者 4,245；发帖 158 | 简介写明 React、TypeScript、Tailwind CSS、Motion 的开源组件分发，官网 https://animate-ui.com | Animate UI | 是 | 已收录产品的官方账号 |
| @preetsuthar17 | Preet Suthar | https://x.com/preetsuthar17 | 2023-08-26 12:19 ET | 关注者 4,334；发帖 10,400；已认证（blue） | 简介「design engineer.」，个人站 https://preetsuthar.me | HextaUI（https://hextaui.com/） | 是 | 已收录产品作者，账号产出量大、身份为设计工程 |
| @magicuidesign | Magic UI | https://x.com/magicuidesign | 2023-06-13 17:52 ET | 关注者 3,994；发帖 274 | 简介「UI Library for Design Engineers」，官网 https://magicui.design | Magic UI（https://magicui.design/） | 是 | 已收录产品的官方账号 |
| @dillionverma | Dillion | https://x.com/dillionverma | 2015-09-01 23:23 ET | 关注者 15,972；发帖 4,008；已认证（blue） | 简介原文「creator of magicui.design, 20k+ github stars」，官网链到 https://magicui.design | Magic UI | 是 | 已收录产品的公开作者 |
| @ephraimduncan | Duncan | https://x.com/ephraimduncan | 2018-08-28 17:45 ET | 关注者 6,824；发帖 21,250；已认证（blue） | 个人站 https://ephraimduncan.com ；本轮简介第一句是 building telemetry.dev，未在简介第一行重提 blocks.so。仍按已收录产品 Blocks.so 的公开仓库作者登记 | Blocks.so（https://blocks.so/） | 是 | 已收录产品的公开作者；本轮未把 telemetry.dev 当作设计资产核入库 |
| @intentui | Intent UI | https://x.com/intentui | 2024-08-07 06:32 ET | 关注者 975；发帖 912；已认证（blue） | 简介「Accessible React components made for you to copy, customize, and own.」，官网 https://intentui.com | Intent UI（https://intentui.com/） | 是 | 已收录产品的官方账号 |
| @irsyad | Irsyad A. Panjaitan | https://x.com/irsyad | 2013-10-29 02:41 ET | 关注者 2,047；发帖 5,995；已认证（blue） | 简介「Building @intentui. Open to work.」，链到 https://design.intentui.com | Intent UI | 是 | 已收录产品的公开作者（`irsyadadl` 用户名本轮不存在） |
| @motiondotdev | Motion | https://x.com/motiondotdev | 2009-03-12 09:17 ET | 关注者 16,505；发帖 1,375；认证类型 business | 简介「The complete animation toolkit for the web. Formerly Framer Motion. Made by @mattgperry。」，官网 http://motion.dev | Motion / Motion+（https://motion.dev/plus） | 是 | 已收录基础设施的官方账号，只登记、不重复建条 |
| @mattgperry | Matt Perry | https://x.com/mattgperry | 2016-11-07 05:15 ET | 关注者 24,780；发帖 7,775 | 简介「Creator of @motiondotdev」，官网 http://motion.dev | Motion / Motion+ | 是 | 官方动效库作者 |
| @emilkowalski | Emil Kowalski | https://x.com/emilkowalski | 2020-04-29 10:13 ET | 关注者 118,202；发帖 1,169；已认证（blue） | 简介写 Teaching at aiforui.dev，Previously @linear, @vercel，个人站 http://emilkowal.ski ；https://aiforui.dev 正文写 created Sonner and Vaul；本轮帖如 https://x.com/emilkowalski/status/2120236535228326252 、https://x.com/emilkowalski/status/2119780441658212842 持续讨论 UI / animation skills | Vaul（已在 GitHub 批次）；Sonner（https://sonner.emilkowal.ski/ ，本轮新核）；课程站 aiforui.dev、animations.dev 只作账号证据，不建议入库 | Vaul 是；Sonner 否 | 高影响力设计工程作者，有可核验的官方组件产品 |
| @davidhaz | David Haz | https://x.com/davidhaz | 2022-10-31 07:06 ET | 关注者 12,932；发帖 7,136；已认证（blue） | 简介列出 reactbits.dev、pro.reactbits.dev、canvasui.dev、openshaders.com，个人站 https://davidhaz.com/ ；2025-12 仍在发 React Bits 更新（如 https://x.com/davidhaz/status/2005576757789720989 ）；2026-11 仍在维护 Canvas UI（https://x.com/davidhaz/status/2119524743460126751） | React Bits（已在种子名单）；Canvas UI、Vue Bits（本轮新核） | React Bits 是；Canvas UI、Vue Bits 否 | 头部动效组件作者，长期专题产出，并指向尚未入库的官方产品 |
| @0xca0a | ☄︎ | https://x.com/0xca0a | 2017-02-24 14:27 ET | 关注者 58,887；发帖 12,814；已认证（blue） | 简介写 Founder PMNDRS，Author of Zustand、R3F、react-spring，Vercel design team | React Three Fiber（官方文档已在基础设施批次） | 是 | 已收录三维基础设施的官方作者，只登记、不重复建条。简介另链 classcad.ai，本轮未作设计资产核入库 |
| @threejs | Three.js | https://x.com/threejs | 2019-07-29 13:49 ET | 关注者 155,471；发帖 23,346；已认证（blue） | 简介「Making 3D easier since 2010.」，官网 https://threejs.org | Three.js | 是 | 已收录基础设施的官方账号 |
| @greensock | GSAP | https://x.com/greensock | 2009-03-17 12:47 ET | 关注者 38,244；发帖 10,718；已认证（blue） | 简介写 industry standard JavaScript animation library，官网 https://gsap.com | GSAP | 是 | 已收录基础设施的官方账号 |
| @npm_i_shaders | shaders | https://x.com/npm_i_shaders | 2025-06-18 16:30 ET | 关注者 9,049；发帖 290；认证类型 business | 简介「The open source shader component library」，官网 https://shaders.com | Shaders（https://shaders.com/） | 是 | 已收录产品的官方账号。@adityawaslost 本轮帖是推荐该库，不是其作者 |
| @Jakubantalik | Jakub Antalik | https://x.com/Jakubantalik | 2012-05-29 14:59 ET | 关注者 23,252；发帖 1,034；已认证（blue） | 简介列出 transitions.dev、libraries.dev，个人站 http://jakubantalik.com ；prev at frame_io、intercom。本轮帖 https://x.com/Jakubantalik/status/2120204589131870610 （2026-11-10）发布 Libraries.dev 上的 Distortion waves | Transitions.dev、Libraries.dev（本轮新核） | 否 | 长期设计工程作者，两个官方产品均有可打开站点与主仓 |
| @mikolajdobrucki | Mikolaj Dobrucki | https://x.com/mikolajdobrucki | 2015-10-25 10:18 ET | 关注者 1,600；发帖 587 | 简介未写产品句，但官网字段为 https://launchuicomponents.com | Launch UI（已在 GitHub 批次） | 是 | 已收录产品的公开作者，账号与官网对应 |
| @nolansym | Jordan | https://x.com/nolansym | 2013-01-04 10:06 ET | 关注者 4,290；发帖 3,846；已认证（blue） | 简介列出 cult-ui.com 等，个人站 https://www.nolly.studio | Cult UI（https://www.cult-ui.com/） | 是 | 已收录产品的公开作者（`nolly_studio` 本轮显示已 suspended） |
| @dorianbaffier | Dorian | https://x.com/dorianbaffier | 2024-08-21 05:39 ET | 关注者 752；发帖 640 | 简介列出 kokonutui.com、kokonutui.pro，个人站 https://dorianbaffier.com ；本轮检索命中其 2025-10-11 帖 https://x.com/dorianbaffier/status/1977003754391208397 （「Built a loader component today live on Kokonut UI」），以及 2025-12-23 致谢转发 | Kokonut UI（https://kokonutui.com/） | 是 | 已收录产品的公开作者；关注者一般，但身份与官网清楚 |
| @ajaypatel_aj | Ajay Patel | https://x.com/ajaypatel_aj | 2009-08-15 04:34 ET | 关注者 1,638；发帖 7,127 | 简介列出 shadcnstudio.com、themeselection.com、pixinvent.com、flyonui.com | Shadcn Studio（种子名单）；FlyonUI（https://flyonui.com/ ，本轮新核） | Shadcn Studio 是；FlyonUI 否 | 已收录产品作者，且另有可核验的官方 Tailwind 组件库 |
| @iamsahaj_xyz | Sahaj | https://x.com/iamsahaj_xyz | 2021-08-14 18:46 ET | 关注者 10,208；发帖 4,635；已认证（blue） | 简介「swe @vercel @v0. created tweakcn.com」，GitHub http://github.com/jnsahaj | tweakcn（已在 GitHub 批次） | 是 | 已收录产品的公开作者 |
| @raunofreiberg | rauno | https://x.com/raunofreiberg | 2018-12-03 13:51 ET | 关注者 97,232；发帖 3,427；已认证（blue） | 简介「design @vercel x devouringdetails.com」，个人站 https://rauno.me ；本轮打开 https://devouringdetails.com ，标题 Devouring Details，正文讨论动画时序与交互手感 | Devouring Details（https://devouringdetails.com/）为可引用的方法 / 出版物，**不建议作为资产库条目入库** | 否（亦不建议入库） | 高影响力设计工程账号，有可打开的官方站点；站点是方法 / 出版物而非可复制组件库 |
| @jakubkrehel | Jakub Krehel | https://x.com/jakubkrehel | 2010-10-16 09:03 ET | 关注者 25,506；发帖 739；已认证（blue） | 简介写 writing → interfaces.dev，个人站 http://jakub.kr ；本轮打开 https://interfaces.dev ，标题为 Design Engineering Magazine | interfaces.dev 为设计工程杂志，**不建议作为资产库条目入库** | 否（亦不建议入库） | 长期公开的设计工程写作者，有可打开的官方出版物，但不是组件 / blocks 产品 |

官方产品小号关注者偏低、但与作者账号对应的，已附在上表（@SkiperUi、@animate_ui、@aceternitylabs、@intentui、@magicuidesign、@motiondotdev、@npm_i_shaders、@21st_dev、@threejs、@greensock）。@canvasui 本轮存在（122 位关注者，简介 Tasteful html-in-canvas components，官网 canvasui.dev），作为 Canvas UI 官方小号记在建议入库备注，不单独当成「高影响力」账号。

## 已核但未纳入账号目录

| 账号或线索 | 本轮事实 | 不纳入理由 |
| --- | --- | --- |
| @sonorafa | 关注者 19；注册 2025-10-30；简介与官网为 Apple 应用 Streetwise Safety | 不是设计资产专业账号，只是前序合集帖作者 |
| @pruthveeee | 关注者 1,537；简介为 agentlaun.ch / clarvivo.com 等 SaaS 分发与分析工具 | 当前公开身份不是设计资产 / 动效专业作者，前序只是推荐帖作者 |
| @adityawaslost | 关注者 2,487；简介为 building palletism.art ；本轮帖 https://x.com/adityawaslost/status/2112194227438240203 介绍 Shaders，并写 created by @npm_i_shaders | 不是 Shaders 作者。https://palletism.art 标题为「images and the prompts behind them」，不是可入库的 UI 资产库 |
| @educlopez | 关注者 1；发帖 0 | 不是 SmoothUI 作者账号 |
| @DanielPetho | 关注者 12；发帖 1 | 未能核到 Fancy Components 的有效官方 X 账号 |
| @nolly / @subhadeeproy | 简介或可见性对不上产品（后者 protected，关注者 23） | 不是 Cult UI / MVP Blocks 的有效公开作者账号 |
| @ReactBits | 关注者 8；发帖 0 | 空号，不能代替 @davidhaz |
| @zepaui | 关注者 82；注册 2026-06-14；简介 Building Zepa | 声量不足，达不到头部标准；产品仍见未决表 |
| @AAishakar / venstyler.com | 关注者 416 | 关注者与引用均不足以列为头部专业账号 |
| @phucbm_ / ui.phucbm.com | 关注者 23 | 不足以列为头部 |
| @didkodev / didko.dev | 关注者 2 | 不足以列为头部 |
| @varde_abhi / @syncuidesign | 关注者 606 / 35 | Sync UI 官方账号声量很低，不按头部收入 |
| @obrastudio_ / @wolfr_2 | 工作室账号关注者 57；@wolfr_2 关注者 3,487，简介写 Creator Obra shadcn/ui kit | 已打开 https://obra.studio/ 首页（页脚出现 Figma shadcn/ui kit、Obra Icons），但本轮未打开 kit 专页，产品不当作已核实新项 |
| @MaximeHeckel | 关注者 15,243；简介为 building @linear，并写作 blog.maximeheckel.com | 本轮未把个人博客当作可入库的官方资产产品，也不单凭高关注者收入 |
| @pqoqubbw | 关注者 9,767；已打开 https://pqoqubbw.dev ，列出 zriz、lucide-animated 等 | zriz 官网写 headless image cropper；lucide-animated 本轮未打开专页。不在证据不足时收入目录或建议入库 |
| @shadergradient | 关注者 1,467；官网 https://www.shadergradient.co/ | `curl` 后可见正文几乎只有标题「Shader Gradient」，不足以核成稳定产品说明 |
| @flyonui | 关注者 227 | 官方小号声量低，产品改记在作者 @ajaypatel_aj 下 |
| @om_patel5 等合集账号 | 关注者可以很高，但简介是增长 / 产品目录类 | 高关注者的通用科技或合集账号不够，不单列入 |
| @boardyai | 检索噪声来源，做介绍机器人 | 与本任务无关 |
| Fancy Components / SmoothUI 作者 X | 按常见用户名查找失败或对不上人 | 产品已在 82 条中，作者账号本轮无法核实，不编造 handle |
| Origin UI / coss 官方 X | `originui`、`coss_ui`、`cosscom` 等用户名本轮不存在或对不上 | 产品已在 82 条中，本轮未登记到有效官方 X |

## 建议入库（本轮新核、且不在 82 条中）

只收录同时满足第一阶段门槛、并且本轮打开了官方出处的产品。相关但未单独建条的官方仓（如 Svelte Bits、thinking-orbs / metal-fx 分仓）写在备注，避免把同一目录拆成多条充数。

| 名称 | 官网 | 发现渠道 | 出品方类型 | 主类 | 做什么 | 形态 | 技术栈（仅官网/仓已写明） | 权威性初评 | 许可 / 成本 | 可操作性 | 发现路径 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Canvas UI | https://canvasui.dev/ | X | 独立作者 / 工作室 | 动效 | 开源的 html-in-canvas 创意组件库：把真实 HTML 画在 canvas 上，并用 WebGL 或 WebGPU 做 GPU 特效 | 开源登记处（shadcn CLI / MCP）。官网写 Free forever | 官网 / 文档：React、Solid、Preact、Vue、Svelte 与无依赖 vanilla TypeScript 六种实现；WebGL 或 WebGPU（经 vgpu）；安装例 `npx shadcn@latest add @canvas-ui/particle-reveal-react`。README 写 WebGL 默认构建除 object 效果外仅以 `three` 为依赖 | GitHub [DavidHDev/canvas-ui](https://github.com/DavidHDev/canvas-ui) 本轮 5,398 星，`license` 字段 NOASSERTION，最近推送 2026-11-08 16:49（ET），主页 https://canvasui.dev/ 。LICENSE.md 正文为 MIT + Commons Clause。总分 3.6，四星 | LICENSE.md：可在应用 / 网站 / 产品中免费商用；禁止单独、打包或移植后再出售、再许可或再分发这些组件本身。GitHub SPDX 未解析 | 可经 shadcn CLI 复制源码使用 | X：@davidhaz 简介与 2026-11 维护帖；官网亦展示 @shadcn、@ChromiumDev 等评价（本轮未打开这些原帖） |
| Vue Bits | https://vue-bits.dev/ | X | 独立作者 / 工作室 | 动效 | React Bits 的官方 Vue 移植：面向创意开发者的可定制动画组件与背景，源码落入项目而不依赖 vue-bits 包 | 开源组件集 + 文档站。官网页写 Free forever、209+ components | 官网：Vue 3、TypeScript、Tailwind；可用 jsrepo 或 shadcn 安装。正文写组件直接使用 ogl、GSAP 等，没有 vue-bits 运行时依赖。仓库 README 另写「official Vue port of React Bits」，以及 90+ components（与官网 209+ 并存，均已打开，不自行折中） | GitHub [DavidHDev/vue-bits](https://github.com/DavidHDev/vue-bits) 本轮 4,646 星，`license` 字段 NOASSERTION，最近推送 2026-10-19 06:00（ET），主页 https://vue-bits.dev/ 。LICENSE.md 正文为 MIT + Commons Clause。总分 3.5，四星 | LICENSE.md：可在应用 / 网站 / 产品中免费商用；禁止单独、打包、作为模板或移植后再出售、再许可或再分发组件本身 | 可复制源码到项目中使用 | X：@davidhaz 同一作者；官方仓 README 写明是 React Bits 的 Vue 移植 |
| UI Skills | https://www.ui-skills.com/ | X | 独立作者 / 工作室 | 生成式 / AI 搭建 | 面向设计工程的精选 skills 目录：用 CLI 或 MCP 把 UI / 动效等技能交给编码代理 | 开源目录 + CLI + MCP。官网有 Sign in，本轮未见独立定价数字 | 官网与 README：`npx ui-skills start` / `categories` / `list --category motion` / `get baseline-ui`；MCP 地址 https://www.ui-skills.com/mcp ，工具为 `list_skills`、`get_skill`。目录中可见 ibelick、anthropics、emilkowalski 等来源的 skills（本轮按目录展示记录，不把第三方 skill 本体并入本条） | GitHub [ibelick/ui-skills](https://github.com/ibelick/ui-skills) 本轮 10,953 星，MIT，最近推送 2026-11-11 05:37（ET），主页 https://www.ui-skills.com/ 。LICENSE 正文 Copyright (c) 2026 Julien Thibeaut。总分 3.7，四星 | MIT；README 写 Licensed under the MIT license。CLI / MCP 可免费使用。Sign in 的付费边界本轮未打开 | 可直接作为给代理用的 UI skills 输入，不是组件源码库 | X：@Ibelick 简介与 https://x.com/Ibelick/status/2118015141564260594 |
| Transitions.dev | https://transitions.dev/ | X | 独立作者 / 工作室 | 动效 | 面向 AI 代理与开发者的 UI 过渡库：官网写 43+ crafted transitions，以及 component builder、Motion Agent、Motion Skill、MCP | 开源 / 产品站 + 代理技能。站内有 Get Pro，精确价格本轮未打开（`/pricing` 返回 404） | 官网：可在 Builder 里用 HTML/CSS 描述组件，并「Add skill / Add library」。LICENSE 写 transitions 与 skills 可用在个人与商业项目，tooling 为 MIT | GitHub [Jakubantalik/transitions.dev](https://github.com/Jakubantalik/transitions.dev) 本轮 6,244 星，`license` 字段 NOASSERTION，最近推送 2026-11-08 06:03（ET），主页 https://transitions.dev/ 。LICENSE 正文为 Transitions.dev License（Copyright 2026 Jakub Antalik / Transitions.dev）。总分 3.4，三星 | 许可正文：可在不限数量的个人与商业项目中使用、修改并随自己的产品发布；禁止把该库本身再包装成竞争性的 transitions / motion pack。Pro、Business 或 Lifetime 方案与模板再分发条件写在 LICENSE 中。精确售价本轮未核到 | 可把过渡与 skill 当作动效输入；Pro 边界以未打开的定价页为准 | X：@Jakubantalik 简介 |
| Libraries.dev | https://libraries.dev | X | 独立作者 / 工作室 | 动效 | 面向下一代 / AI 界面的效果库与模型目录。FAQ 写 Beam、Orb、Gooey、Metal、Image 五个库在 npm 上 MIT 免费；另有 Pro / Studio | 开源 npm 包集合 + 官方目录 + 付费 Studio。`https://libraries.dev/pricing` 本轮 404，未见价格数字 | FAQ：React 18+；各库零运行时依赖，唯 Image generation 需要 `three` 作为 peer。安装例 `npm install border-beam`、`thinking-orbs`、`liquid-gooey`、`metal-fx`、`img-fx`。Beam 与 Orb 另有 SwiftUI 与 React Native 版本。本轮另打开 https://libraries.dev/orbs 、https://libraries.dev/beam | GitHub [Jakubantalik/Libraries.dev](https://github.com/Jakubantalik/Libraries.dev) 本轮 4,703 星，MIT，最近推送 2026-11-10 10:18（ET），主页 https://libraries.dev 。总分 3.3，三星。相关分仓（不并入本分项星标）例：`Jakubantalik/thinking-orbs` 4,003 星，最近推送 2026-08-16 04:19（ET）；`Jakubantalik/metal-fx` 506 星，最近推送 2026-10-15 09:56（ET） | 五个库 FAQ 写 MIT、免费 npm。Pro 解锁 Studio、预设与后续库，价格未打开。仓库 LICENSE 为 MIT，Copyright (c) 2026 Jakub Antalik | 可直接安装效果库；Studio / Pro 未核价 | X：@Jakubantalik 简介与 https://x.com/Jakubantalik/status/2120204589131870610 。该名在 `expansion-x.md` 未决表出现过，本轮已打开官网与主仓 |
| Sonner | https://sonner.emilkowal.ski/ | X | 独立作者 / 工作室 | components | 面向 React 的意见化 toast 组件 | 开源组件 + 文档站 | 官网 Getting Started：`pnpm i sonner`，在应用根节点渲染 `Toaster`，并 `import { Toaster, toast } from 'sonner'`。类型含 Success / Info / Warning / Error / Action / Promise 等 | GitHub [emilkowalski/sonner](https://github.com/emilkowalski/sonner) 本轮 13,190 星，MIT，最近推送 2026-08-10 07:13（ET），主页 https://sonner.emilkowal.ski 。总分 3.6，四星 | MIT；免费安装 | 可直接作为 toast 组件资产。不是高视效 blocks 库 | X：@emilkowalski ；官方课程站 https://aiforui.dev 亦写其 created Sonner and Vaul |
| Acebuilder | https://acebuilder.ai | X | 独立作者 / 工作室 | 生成式 / AI 搭建 | Aceternity 官方的 AI 落地页搭建器：用模板、blocks、skills 和对话编辑，而不是从空白页开始 | 付费 AI 搭建工具（页面标明 beta）。无本轮可核的公开主仓 | 官网写 Powered by Aceternity UI；可导入 Aceternity UI Pro 模板，在编辑器里改 blocks 与组件，并用 skills 调整版式与文案。未打开到可核验的框架版本清单，故不编造具体技术栈版本 | 无稳定公开主仓。定价页已打开。总分 2.5，三星 | 定价页（https://www.acebuilder.ai/pricing ）：Pro $25/月（1000 credits、10 projects）、Business $50/月（2500 credits、50 projects）、Studio $129/月（6000 credits、100 projects），均可使用全部 Aceternity 组件与 Pro 模板。许可条款页本轮未打开 | 可直接用于生成 / 编辑落地页；不是开源组件登记处 | X：@mannupaaji 简介 |
| FlyonUI | https://flyonui.com/ | X | 付费产品公司 | components | 开源 Tailwind CSS 组件库：语义化 class 与 JS 插件，并提供 blocks、模板、Figma 设计系统与 MCP 等 | 开源库 + 文档 / 组件 / blocks / 模板；另有 Pro Version。精确 Pro 价本轮未打开 | 官网首页写 Tailwind CSS v4.0，并列出 HTML、React、Nextjs、Vue、Nuxt、Angular、Svelte。LICENSE 写原始代码为 MIT，同时捆绑 Preline UI 与 daisyUI，须遵守其各自许可（含 Preline Fair Use） | GitHub [themeselection/flyonui](https://github.com/themeselection/flyonui) 本轮 2,540 星，`license` 字段 NOASSERTION，最近推送 2026-03-20 02:34（ET），主页 https://flyonui.com/ 。官网另写 FlyonUI v2.4.1，不替代仓的 `pushed_at`。总分 3.0，三星 | 仓内 LICENSE：FlyonUI 原始代码 MIT（Copyright (c) 2024 ThemeSelection）；捆绑的 Preline / daisyUI 另有许可。Pro 价格未打开 | 可作 Tailwind 组件 / blocks 输入；使用时需同时阅读捆绑组件的许可 | X：@ajaypatel_aj 简介 |

## 内容勾选（概览，未做深挖）

主类已在上表。兼有情况只按本轮打开的官方页面记录，不补未看到的类，也不把未打开的类一律打成「无」，除非已打开本会展示该类的页面。不使用「其他」。

| 名称 | blocks | 动效 | components | flows | 图标 / 插画 | 色板 / 字体 | 模板 / 落地页 | 交互 / 微交互 | 背景 / 材质 | 设计系统 / 主题 / kits | 生成式 / AI 搭建 | agent / 生成式 UI |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Canvas UI | 无（文档与组件目录是效果组件，不是页面区块目录） | 是 | 是（官网写 35 components；文档目录含 Particle Reveal、Liquid、Glass 等） | 未在已打开页看到任务流产品 | 未在已打开页看到图标库 | 未在已打开页看到色板产品 | 无 | 部分（效果含指针 / 滚动驱动） | 部分（Clouds、Liquid、Ripple 等覆盖在内容上的 GPU 层） | 无 | 部分（MCP / 代理安装流程） | 部分（Built for agents、shadcn MCP） |
| Vue Bits | 无 | 是 | 是 | 未在已打开页看到 | 未在已打开页看到 | 未在已打开页看到 | 无 | 部分（cursor、dock 等交互示例） | 是（官网分类含 Backgrounds，如 ShapeGrid、Aurora） | 无 | 部分（官网页写 AI-Ready，可与 Cursor / Copilot / v0 一起用） | 未作为 agent UI 协议或工具产品出现 |
| UI Skills | 无 | 部分（目录含 motion 分类与 improve-animations 等 skill，本身不是动效库） | 无（是 skills 目录，不是 UI 组件库） | 未在已打开页看到独立 flow 库 | 未在已打开页看到 | 未在已打开页看到 | 无 | 部分（playbook / skills 涉及微交互原则） | 无 | 无（官网是 skills 目录，用来改进界面质量，不是可安装的设计系统或主题包） | 是 | 部分（MCP 把目录交给编码代理，不是 agent 界面组件） |
| Transitions.dev | 无 | 是 | 部分（有 component builder，主体是 transitions 库） | 未在已打开页看到完整任务流库 | 未在已打开页看到 | 未在已打开页看到 | 无 | 是 | 无 | 无 | 部分（Motion Skill、MCP、Builder 面向代理） | 部分（Motion Agent / skill） |
| Libraries.dev | 无 | 是 | 是（效果组件库） | 未在已打开页看到 | 未在已打开页看到独立图标库 | 未在已打开页看到 | 无 | 部分（Magnetic UI、Voice 等） | 无 | 无 | 部分（Copy the prompt 给 coding agent；Pro 含 skills） | 部分（FAQ 与文案面向 AI 界面；有 Bot avatars、Thinking orbs） |
| Sonner | 无 | 部分（文档有位置、滑动方向等交互动画，不是动效库） | 是 | 无 | 无 | 无 | 无 | 部分（toast 交互） | 无 | 无 | 无 | 无 |
| Acebuilder | 是（可在编辑器中放入并修改 blocks） | 未在已打开页单独作为产品类出现，尽管底层是 Aceternity UI | 部分（使用 Aceternity 组件，但本条是搭建器） | 未在已打开页看到 | 未在已打开页看到 | 未在已打开页看到 | 是 | 未在已打开页看到独立微交互库 | 部分（可生成图像并用作背景） | 无 | 是 | 无（不是 agent 界面协议产品） |
| FlyonUI | 是 | 未在已打开的首页写成独立动效库 | 是 | 未在已打开页看到 | 未在已打开页看到独立图标库 | 部分（首页写 10+ Themes） | 是 | 未在已打开页逐项核 | 无 | 部分（Figma design system、多主题） | 部分（FlyonUI MCP、AI Tools 出现在导航） | 无 |

## 未决 / 相关但不单独建议入库

| 名称 | 原因 | 备注 |
| --- | --- | --- |
| OriginKit（originkit.dev） | 本轮仍未发现达到头部标准的专业账号把它作为可核验官方主仓产品稳定指向；官网重度客户端的问题在前序记录中仍成立，本轮未把它抬进建议入库 | 留在未决，不改写 `expansion-x.md` 旧行 |
| Zepa UI（zepa.design） | 官方账号 @zepaui 本轮仅 82 位关注者，注册于 2026-06-14；自推帖互动很低。前序 GitHub 核验为 1 星。本轮未再打开 `zepa-ui/zepa` 更新星标，但现有公开身份仍达不到头部标准 | 继续留在未决 |
| OpenShaders（https://openshaders.com 、仓 `openshaders/openshaders`） | 本轮 `gh api` 291 星，MIT，最近推送 2026-09-09 13:06（ET）。官网正文几乎只有「Shaders belong on the web. What will yours look like?」与 Claim your username，不足以写成可使用的资产库概览 | 与 @davidhaz 简介有关；待官网出现可核的库说明后再议。官方 X @openshaders 为 0 关注者空号 |
| Svelte Bits（仓 `DavidHDev/svelte-bits`，主页字段 https://sveltebits.xyz ） | 本轮 `gh api` 400 星，最近推送 2026-09-21 07:41（ET）。是 David Haz 的官方相关产品，但未打开官网正文，且规模明显小于 Vue Bits / Canvas UI | 记在 @davidhaz 下，不单独建议入库 |
| Mesurer（https://mesurer.dev） | @Ibelick 简介产品。本轮打开后是在实况界面上检查、批注并指挥编码代理的工具，不是组件 / blocks / 动效资产库 | 不建议本阶段入库 |
| Vibrant Design（https://vibrant.design） | @mannupaaji 简介产品。本轮打开后是精选网站、sections、影片与 UI 截图的灵感站 | 按「只做情绪 / 灵感、没有可复制官方资产」不入库 |
| aiforui.dev / animations.dev / Lapse | @emilkowalski 的付费课程与附带工具。课程站已打开，但不是可复制的开源组件库；28 个 skills 与 Lapse 随课程提供 | 只作账号证据。Sonner / Vaul 已分别处理 |
| Devouring Details、interfaces.dev | 见账号目录。可引用的出版物 / 杂志，不是资产库 | 不入库 |
| thinking-orbs、metal-fx、img-fx、border-beam 等 | 已作为 Libraries.dev 目录中的库核实。分仓星标不并入 Libraries.dev 的维护与规模分。另：https://www.thinkingorbs.com 写 Built by Yogesh、`@yogesharc/thinking-orbs`，与 Jakub 的 libraries.dev/orbs 不是同一条目，本轮不混收 | 不另建条 |
| studio.cuedesign.space | @Alok619308 简介中的「Building」对象。本轮打开后标题为 Mockup Studio — AI 生成 mockup 视频，不是 Cue 组件库的替代说明 | 不另建条；Cue 已在 82 条中 |

## 本轮未能稳定打开、或正文不足的页面

| URL | 情况 |
| --- | --- |
| https://canvasui.dev/docs/license | 404。许可改用仓库 `LICENSE.md` 与官网 FAQ 原文。 |
| https://vue-bits.dev/ 经 `curl` | HTTP 200，但抽到的可见正文几乎只有标题。后改用 WebFetch，得到完整首页正文（209+ components、Vue 3 / TypeScript / Tailwind、jsrepo / shadcn 等）。 |
| https://vuebits.dev/ | TLS 连接失败。 |
| https://openshaders.com | 200，但几乎只有口号与 Claim your username。 |
| https://www.shadergradient.co/ | 200，`curl` 可见正文几乎只有标题「Shader Gradient」。 |
| https://transitions.dev/pricing | WebFetch 404。许可与 Pro 档位名称改用已打开的 LICENSE 正文；精确价格不写。 |
| https://libraries.dev/pricing | `curl` 404。免费 / Pro 边界改用已打开的 FAQ；精确价格不写。 |
| https://libraries.dev/thinking-orbs | 404。正确路径为 https://libraries.dev/orbs 。 |
| https://flyonui.com/docs/introduction | 打开后为 404 页面。组件与形态依据改用已打开的官网首页与 LICENSE。 |
| https://www.thinking-orbs.com/ | TLS 失败。另打开的 https://www.thinkingorbs.com 属于不同作者，不用来给 Libraries.dev 计分。 |

## 权威性算法说明

与 `authority-scores.md` 同一套权重（30 / 25 / 20 / 15 / 10）和星标分档。出品方：上述新项均不是大厂官方或该领域唯一标准入口，独立作者或付费产品公司在官网与主仓清楚时取 3，不因单一高星仓升到 4，除非本轮另有独立的广泛生态使用证据。维护与规模：按本轮 `gh api` 星标定档，再按 2026-11-11 ET 锚点微调（2026-10-12 及之后 +0.5；2025-11-11 之前 -1），且不超过 5。无稳定公开主仓（Acebuilder）按低档 1，不以营销文案中的用户数抬分。被引用：本轮对新项取保守分（多为 3 或 2），产品站上的推荐语若未打开原帖，不把它当成 4 或 5 的独立引用。Vue Bits 4,646 星未按 5k+ 定档；Libraries.dev 4,703 星同样未按 5k+ 定档。Sonner 最近推送 2026-08-10（ET），不加不减。FlyonUI 最近推送 2026-03-20（ET），不加不减，也不用官网版本号代替 `pushed_at`。

分项与一句依据见 `authority-scores.md` 本轮新增行。

## 本轮实际打开 / 调用的来源（摘要）

- X：`get_users_by_usernames`（起始线索、产品作者、官方账号与补查用户名）；`get_users_posts`（至少包括 @Ibelick、@emilkowalski、@Jakubantalik）；`search_posts_all`（上文查询）。`verified_followers_count` 字段本轮无权限，未使用。
- 官网 / 文档：canvasui.dev（含 /docs、/components；/docs/license 404）、vue-bits.dev、www.ui-skills.com、transitions.dev、libraries.dev（含 /orbs、/beam；/pricing 404）、sonner.emilkowal.ski 与 /getting-started、acebuilder.ai 与 /pricing、flyonui.com、aiforui.dev、mesurer.dev、vibrant.design、openshaders.com、shadergradient.co、devouringdetails.com、interfaces.dev、pqoqubbw.dev、obra.studio、palletism.art、studio.cuedesign.space、thinkingorbs.com（仅用于区分作者）。
- GitHub：`DavidHDev/canvas-ui`、`DavidHDev/vue-bits`、`DavidHDev/svelte-bits`、`ibelick/ui-skills`、`emilkowalski/sonner`、`Jakubantalik/transitions.dev`、`Jakubantalik/Libraries.dev`、`Jakubantalik/thinking-orbs`、`Jakubantalik/metal-fx`、`themeselection/flyonui`、`openshaders/openshaders` 的 `gh api` 与相关 LICENSE / README。

本文件未开始深挖或填写洞察，也未修改 `index.html`。
