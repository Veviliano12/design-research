window.HOS7_RELABEL = {
  "meta": {
    "document_type": "labeling_proposal",
    "not": [
      "catalog expansion",
      "a recommendation of a new N",
      "a new official HOS7 catalog"
    ],
    "sources_consulted": [
      "/workspace/repos/HOS7/docs/blocks.md",
      "/workspace/repos/HOS7/docs/llms.txt",
      "/workspace/repos/HOS7/registry.json",
      "/workspace/repos/HOS7/public/route-index.json",
      "/workspace/repos/HOS7/scripts/build-docs.ts",
      "/workspace/repos/HOS7/scripts/ds.py",
      "/workspace/repos/HOS7/skill/SKILL.md",
      "/workspace/repos/HOS7/skill/cli.md",
      "/workspace/repos/HOS7/skill/registry.md",
      "/workspace/repos/HOS7/contracts/masonry-media-wall.md",
      "/workspace/blocks-research/evidence/hos7.md",
      "/workspace/blocks-research/insights.md §4.6（及 §4.1 字段名）"
    ],
    "verified_official_counts": {
      "total_blocks": 69,
      "page_type": 14,
      "region": 55,
      "kind_component": 53,
      "kind_demo": 16,
      "kind_demo_of_which_page_type": 14,
      "kind_demo_of_which_region": 2,
      "region_demo_ids": [
        "app-shell-starter",
        "downloads-manager"
      ],
      "routeable": 14,
      "sources": [
        "docs/blocks.md 文首 “69 blocks.” 且表格点算 14 + 55 = 69",
        "docs/llms.txt “Blocks (69)”",
        "registry.json type=registry:block 共 69，kind 点算 component 53 / demo 16",
        "public/route-index.json coverage.blocks=69, coverage.routed=14，routes 条数 14，与 page-type 表同名"
      ],
      "agrees_with_evidence_hos7_md_section_2": true
    },
    "count_discrepancies": [
      {
        "value": 63,
        "where": [
          "skill/SKILL.md frontmatter description: “63 prebuilt blocks”",
          "skill/registry.md ## Blocks and blueprints: “63 blocks are whole regions and screens assembled from the components”"
        ],
        "note": "与生成的官方索引 69 不一致。本草案两数并存，不把 63 改写成 69，也不把 69 改写成 63。"
      },
      {
        "value": 62,
        "where": [
          "scripts/build-docs.ts 文件头注释： “docs/blocks.md 62 blocks, one line each”"
        ],
        "note": "该脚本生成 docs/blocks.md 时用的是 blocks.length（当前为 69）。62 只出现在过时注释里。本草案两数并存，不静默“修正”注释。"
      }
    ],
    "field_status_counts": {
      "by_status": {
        "official": 652,
        "missing": 299,
        "inferred": 15
      },
      "by_field": {
        "id": {
          "official": 69
        },
        "official_name": {
          "official": 69
        },
        "kind": {
          "official": 69
        },
        "demo_only": {
          "official": 69
        },
        "grain": {
          "official": 69
        },
        "card_unit": {
          "missing": 59,
          "inferred": 9,
          "official": 1
        },
        "scene": {
          "inferred": 6,
          "official": 28,
          "missing": 35
        },
        "routeable": {
          "official": 69
        },
        "data_contract": {
          "official": 69
        },
        "data_contract.install_mode": {
          "official": 69
        },
        "data_contract.required_props": {
          "official": 63,
          "missing": 6
        },
        "data_contract.optional_props": {
          "missing": 66,
          "official": 3
        },
        "data_contract.schema": {
          "missing": 69
        },
        "data_contract.children_take_required_data": {
          "missing": 64,
          "official": 5
        }
      },
      "row_count": 69,
      "fields_counted": [
        "id",
        "official_name",
        "kind",
        "demo_only",
        "grain",
        "card_unit",
        "scene",
        "routeable",
        "data_contract",
        "data_contract.install_mode",
        "data_contract.required_props",
        "data_contract.optional_props",
        "data_contract.schema",
        "data_contract.children_take_required_data"
      ],
      "card_unit_inferred_true": 9,
      "scene_official": 28,
      "scene_inferred": 6,
      "scene_missing": 35
    },
    "conventions": {
      "grain": "官方只有 page-type / region 两章，没有 card 或 primitive 的官方 grain 字段。proposed grain 照抄官方目录章节；卡片单元只用 card_unit 旗标，且一律标为推断。",
      "scene": "只在官方描述或官方 title 点名产品表面时标 official；从内容类型推断的标 inferred 并说明原因；否则 未在官方文档出现。不使用 registry keywords 扩写 scene。",
      "data_contract": "只抄录官方描述已点名的必填/可选 props，以及官方 docs 示例中出现的属性名。schema 一律为 null。不从 TypeScript 源码发明类型。",
      "routeable": "仅 page-type + 官方 routing rules（meta.route / route-index / ds.py route）为 true；其余为 false，并引用官方分类依据。",
      "no_new_n": "本文件不回答“应该做 N 个 blocks”，也不新增或删除 HOS7 条目。"
    }
  },
  "rows": [
    {
      "id": {
        "value": "mobile-card",
        "status": "official",
        "citation": "docs/blocks.md 表格；registry.json name"
      },
      "official_name": {
        "value": "Mobile Card",
        "status": "official",
        "citation": "registry.json title"
      },
      "kind": {
        "value": "demo",
        "status": "official",
        "citation": "docs/blocks.md Kind 列；registry.json kind"
      },
      "demo_only": {
        "value": true,
        "status": "official",
        "citation": "与官方 kind=demo 同义。insights.md §4.6 要求给 page-type 逐条标 demo_only；本草案对所有 kind=demo（含 2 个 region demo）都标，不另造含义。"
      },
      "grain": {
        "value": "page",
        "status": "official",
        "citation": "docs/blocks.md ## Page-type blocks；scripts/build-docs.ts 按是否存在 meta.route.pageType 把条目写入相应章节。"
      },
      "card_unit": {
        "value": null,
        "status": "missing",
        "note": "官方文档没有 card 层字段；本条官方描述也不把它写成单卡或单元格，本草案不推断为卡片单元。"
      },
      "scene": {
        "value": "mobile-shell",
        "status": "inferred",
        "citation": "官方描述为 “stacked content-card home page”，官方无 scene 字段；与 evidence/hos7.md §3 将 mobile-* 归入「通用手机壳」的既有口径一致，不把该归类写成官方字段。"
      },
      "routeable": {
        "value": true,
        "status": "official",
        "citation": "docs/blocks.md ## Page-type blocks：These carry routing rules, so ds.py route can pick one from a sentence. registry.json meta.route.pageType='mobile-card'；public/route-index.json coverage.routed=14，本条在 routes 中，fallbackRank=2。"
      },
      "data_contract": {
        "status": "official",
        "install_mode": "baked",
        "install_mode_status": "official",
        "install_mode_citation": "docs/blocks.md ## What the kind column means；docs/llms.txt “A block without the marker takes required data props and ships empty.” / “(demo) marks a block with fixed baked-in content”.",
        "required_props_named_in_description": [],
        "required_props_status": "official",
        "required_props_note": null,
        "optional_props_named_in_description": [],
        "optional_props_status": "missing",
        "props_in_official_docs_example": [],
        "docs_example_is_bare_component": true,
        "children_take_required_data": null,
        "children_take_required_data_status": "missing",
        "schema": null,
        "schema_status": "missing",
        "schema_note": "未在官方文档给出可独立执行的 props schema（类型、必填/可选完整表、数据形状）。本草案不发明 schema。",
        "summary_zh": "官方 kind=demo：烘焙文案与结构，安装后不是用来传数据。docs 示例为裸组件。未给出 props schema。",
        "citation": "registry.json description 与 docs 字段；docs 即 skill/registry.md / docs/llms.txt 所说的 add 输出 contract。"
      },
      "aliases": {
        "value": [
          "mobile-card-template"
        ],
        "status": "official",
        "citation": "registry.json meta.aliases"
      },
      "official_description": {
        "value": "The stacked content-card home page that replaces the legacy mobile-card template: a glass search field, swipeable hero banner, five-entry icon grid and sectioned card groups (two-column, playable thumbnails, a large feature card, poster rows and text-plate cells) under a four-tab bar. Fixed demo (Plan-035): the content is baked in on purpose — install it to copy the structure and the writing, not to feed it data.",
        "status": "official",
        "citation": "registry.json description（docs/blocks.md 表格为同一描述的截断一行）"
      },
      "notes": "page-type + kind=demo，却被官方用作 ds.py route 入口。这是 insights.md §4.6 / §1.9 已指出的结构性张力，不是数量建议。官方未测“命中后要改多少数据”，本草案不估计替换成本。"
    },
    {
      "id": {
        "value": "mobile-grid",
        "status": "official",
        "citation": "docs/blocks.md 表格；registry.json name"
      },
      "official_name": {
        "value": "Mobile Grid",
        "status": "official",
        "citation": "registry.json title"
      },
      "kind": {
        "value": "demo",
        "status": "official",
        "citation": "docs/blocks.md Kind 列；registry.json kind"
      },
      "demo_only": {
        "value": true,
        "status": "official",
        "citation": "与官方 kind=demo 同义。insights.md §4.6 要求给 page-type 逐条标 demo_only；本草案对所有 kind=demo（含 2 个 region demo）都标，不另造含义。"
      },
      "grain": {
        "value": "page",
        "status": "official",
        "citation": "docs/blocks.md ## Page-type blocks；scripts/build-docs.ts 按是否存在 meta.route.pageType 把条目写入相应章节。"
      },
      "card_unit": {
        "value": null,
        "status": "missing",
        "note": "官方文档没有 card 层字段；本条官方描述也不把它写成单卡或单元格，本草案不推断为卡片单元。"
      },
      "scene": {
        "value": "mobile-shell",
        "status": "inferred",
        "citation": "官方描述为 “grid-style mobile home/discovery page”，官方无 scene 字段；按手机壳家族推断。描述中的 song list / mini-player 不足以把本条官方标成 music。"
      },
      "routeable": {
        "value": true,
        "status": "official",
        "citation": "docs/blocks.md ## Page-type blocks：These carry routing rules, so ds.py route can pick one from a sentence. registry.json meta.route.pageType='mobile-grid'；public/route-index.json coverage.routed=14，本条在 routes 中，fallbackRank=1。"
      },
      "data_contract": {
        "status": "official",
        "install_mode": "baked",
        "install_mode_status": "official",
        "install_mode_citation": "docs/blocks.md ## What the kind column means；docs/llms.txt “A block without the marker takes required data props and ships empty.” / “(demo) marks a block with fixed baked-in content”.",
        "required_props_named_in_description": [],
        "required_props_status": "official",
        "required_props_note": null,
        "optional_props_named_in_description": [],
        "optional_props_status": "missing",
        "props_in_official_docs_example": [],
        "docs_example_is_bare_component": true,
        "children_take_required_data": null,
        "children_take_required_data_status": "missing",
        "schema": null,
        "schema_status": "missing",
        "schema_note": "未在官方文档给出可独立执行的 props schema（类型、必填/可选完整表、数据形状）。本草案不发明 schema。",
        "summary_zh": "官方 kind=demo：烘焙文案与结构，安装后不是用来传数据。docs 示例为裸组件。未给出 props schema。",
        "citation": "registry.json description 与 docs 字段；docs 即 skill/registry.md / docs/llms.txt 所说的 add 输出 contract。"
      },
      "aliases": {
        "value": [
          "mobile-grid-template"
        ],
        "status": "official",
        "citation": "registry.json meta.aliases"
      },
      "official_description": {
        "value": "A grid-style mobile home/discovery page — collapsing large title, search field, hero rail, genre chips filtering a sideways cover grid, a song list and a mini-player riding above the tab bar as its own island — replacing the legacy mobile-grid-template page. Fixed demo (Plan-035): the content is baked in on purpose — install it to copy the structure and the writing, not to feed it data.",
        "status": "official",
        "citation": "registry.json description（docs/blocks.md 表格为同一描述的截断一行）"
      },
      "notes": "同上：demo page-type 作为路由入口。描述含 song list 与 mini-player，但官方未把它标成 music 产品表面。"
    },
    {
      "id": {
        "value": "mobile-list",
        "status": "official",
        "citation": "docs/blocks.md 表格；registry.json name"
      },
      "official_name": {
        "value": "Mobile List",
        "status": "official",
        "citation": "registry.json title"
      },
      "kind": {
        "value": "demo",
        "status": "official",
        "citation": "docs/blocks.md Kind 列；registry.json kind"
      },
      "demo_only": {
        "value": true,
        "status": "official",
        "citation": "与官方 kind=demo 同义。insights.md §4.6 要求给 page-type 逐条标 demo_only；本草案对所有 kind=demo（含 2 个 region demo）都标，不另造含义。"
      },
      "grain": {
        "value": "page",
        "status": "official",
        "citation": "docs/blocks.md ## Page-type blocks；scripts/build-docs.ts 按是否存在 meta.route.pageType 把条目写入相应章节。"
      },
      "card_unit": {
        "value": null,
        "status": "missing",
        "note": "官方文档没有 card 层字段；本条官方描述也不把它写成单卡或单元格，本草案不推断为卡片单元。"
      },
      "scene": {
        "value": "mobile-shell",
        "status": "inferred",
        "citation": "官方描述为 entry-list page，并写明是 “mine / account screen”。主 scene 按手机壳家族推断；“mine / account” 是官方用词，记在备注，不另造官方 scene。"
      },
      "routeable": {
        "value": true,
        "status": "official",
        "citation": "docs/blocks.md ## Page-type blocks：These carry routing rules, so ds.py route can pick one from a sentence. registry.json meta.route.pageType='mobile-list'；public/route-index.json coverage.routed=14，本条在 routes 中，fallbackRank=2。"
      },
      "data_contract": {
        "status": "official",
        "install_mode": "baked",
        "install_mode_status": "official",
        "install_mode_citation": "docs/blocks.md ## What the kind column means；docs/llms.txt “A block without the marker takes required data props and ships empty.” / “(demo) marks a block with fixed baked-in content”.",
        "required_props_named_in_description": [],
        "required_props_status": "official",
        "required_props_note": null,
        "optional_props_named_in_description": [],
        "optional_props_status": "missing",
        "props_in_official_docs_example": [],
        "docs_example_is_bare_component": true,
        "children_take_required_data": null,
        "children_take_required_data_status": "missing",
        "schema": null,
        "schema_status": "missing",
        "schema_note": "未在官方文档给出可独立执行的 props schema（类型、必填/可选完整表、数据形状）。本草案不发明 schema。",
        "summary_zh": "官方 kind=demo：烘焙文案与结构，安装后不是用来传数据。docs 示例为裸组件。未给出 props schema。",
        "citation": "registry.json description 与 docs 字段；docs 即 skill/registry.md / docs/llms.txt 所说的 add 输出 contract。"
      },
      "aliases": {
        "value": [
          "mobile-list-template"
        ],
        "status": "official",
        "citation": "registry.json meta.aliases"
      },
      "official_description": {
        "value": "The entry-list page that replaces the legacy mobile-list template: a profile header card over grouped and single entry cards of app-icon rows with values and chevrons, plus a four-tab bar — the \"mine\" / account screen. Fixed demo (Plan-035): the content is baked in on purpose — install it to copy the structure and the writing, not to feed it data.",
        "status": "official",
        "citation": "registry.json description（docs/blocks.md 表格为同一描述的截断一行）"
      },
      "notes": "demo page-type 作为路由入口。官方 route-index 为本条配置了 companions：empty、profile-header（非本条自身可路由）。"
    },
    {
      "id": {
        "value": "mobile-settings",
        "status": "official",
        "citation": "docs/blocks.md 表格；registry.json name"
      },
      "official_name": {
        "value": "Mobile Settings",
        "status": "official",
        "citation": "registry.json title"
      },
      "kind": {
        "value": "demo",
        "status": "official",
        "citation": "docs/blocks.md Kind 列；registry.json kind"
      },
      "demo_only": {
        "value": true,
        "status": "official",
        "citation": "与官方 kind=demo 同义。insights.md §4.6 要求给 page-type 逐条标 demo_only；本草案对所有 kind=demo（含 2 个 region demo）都标，不另造含义。"
      },
      "grain": {
        "value": "page",
        "status": "official",
        "citation": "docs/blocks.md ## Page-type blocks；scripts/build-docs.ts 按是否存在 meta.route.pageType 把条目写入相应章节。"
      },
      "card_unit": {
        "value": null,
        "status": "missing",
        "note": "官方文档没有 card 层字段；本条官方描述也不把它写成单卡或单元格，本草案不推断为卡片单元。"
      },
      "scene": {
        "value": "settings",
        "status": "official",
        "citation": "官方描述原文： “A single-feature settings page”。"
      },
      "routeable": {
        "value": true,
        "status": "official",
        "citation": "docs/blocks.md ## Page-type blocks：These carry routing rules, so ds.py route can pick one from a sentence. registry.json meta.route.pageType='mobile-settings'；public/route-index.json coverage.routed=14，本条在 routes 中，fallbackRank=1。"
      },
      "data_contract": {
        "status": "official",
        "install_mode": "baked",
        "install_mode_status": "official",
        "install_mode_citation": "docs/blocks.md ## What the kind column means；docs/llms.txt “A block without the marker takes required data props and ships empty.” / “(demo) marks a block with fixed baked-in content”.",
        "required_props_named_in_description": [],
        "required_props_status": "official",
        "required_props_note": null,
        "optional_props_named_in_description": [],
        "optional_props_status": "missing",
        "props_in_official_docs_example": [],
        "docs_example_is_bare_component": true,
        "children_take_required_data": null,
        "children_take_required_data_status": "missing",
        "schema": null,
        "schema_status": "missing",
        "schema_note": "未在官方文档给出可独立执行的 props schema（类型、必填/可选完整表、数据形状）。本草案不发明 schema。",
        "summary_zh": "官方 kind=demo：烘焙文案与结构，安装后不是用来传数据。docs 示例为裸组件。未给出 props schema。",
        "citation": "registry.json description 与 docs 字段；docs 即 skill/registry.md / docs/llms.txt 所说的 add 输出 contract。"
      },
      "aliases": {
        "value": [
          "settings-page-template"
        ],
        "status": "official",
        "citation": "registry.json meta.aliases"
      },
      "official_description": {
        "value": "A single-feature settings page — hero card with status and one primary action, an entry card, grouped switch and value rows, and a footer note — replacing the legacy settings-page-template page the route index maps to the mobile-settings page type. Fixed demo (Plan-035): the content is baked in on purpose — install it to copy the structure and the writing, not to feed it data.",
        "status": "official",
        "citation": "registry.json description（docs/blocks.md 表格为同一描述的截断一行）"
      },
      "notes": "demo page-type 作为路由入口。官方写明 route index 把 legacy settings-page-template 映射到本 page type。勿与 settings-page（系统设置枢纽）混为同一表面。"
    },
    {
      "id": {
        "value": "page-shell",
        "status": "official",
        "citation": "docs/blocks.md 表格；registry.json name"
      },
      "official_name": {
        "value": "Page Shell",
        "status": "official",
        "citation": "registry.json title"
      },
      "kind": {
        "value": "demo",
        "status": "official",
        "citation": "docs/blocks.md Kind 列；registry.json kind"
      },
      "demo_only": {
        "value": true,
        "status": "official",
        "citation": "与官方 kind=demo 同义。insights.md §4.6 要求给 page-type 逐条标 demo_only；本草案对所有 kind=demo（含 2 个 region demo）都标，不另造含义。"
      },
      "grain": {
        "value": "page",
        "status": "official",
        "citation": "docs/blocks.md ## Page-type blocks；scripts/build-docs.ts 按是否存在 meta.route.pageType 把条目写入相应章节。"
      },
      "card_unit": {
        "value": null,
        "status": "missing",
        "note": "官方文档没有 card 层字段；本条官方描述也不把它写成单卡或单元格，本草案不推断为卡片单元。"
      },
      "scene": {
        "value": "mobile-shell",
        "status": "inferred",
        "citation": "官方描述为 generic fallback page，并写明取代 legacy mobile-phone-shell template 的 secondary mode；官方无 scene 字段。"
      },
      "routeable": {
        "value": true,
        "status": "official",
        "citation": "docs/blocks.md ## Page-type blocks：These carry routing rules, so ds.py route can pick one from a sentence. registry.json meta.route.pageType='page-shell'；public/route-index.json coverage.routed=14，本条在 routes 中，fallbackRank=99。"
      },
      "data_contract": {
        "status": "official",
        "install_mode": "baked",
        "install_mode_status": "official",
        "install_mode_citation": "docs/blocks.md ## What the kind column means；docs/llms.txt “A block without the marker takes required data props and ships empty.” / “(demo) marks a block with fixed baked-in content”.",
        "required_props_named_in_description": [],
        "required_props_status": "official",
        "required_props_note": null,
        "optional_props_named_in_description": [],
        "optional_props_status": "missing",
        "props_in_official_docs_example": [],
        "docs_example_is_bare_component": true,
        "children_take_required_data": null,
        "children_take_required_data_status": "missing",
        "schema": null,
        "schema_status": "missing",
        "schema_note": "未在官方文档给出可独立执行的 props schema（类型、必填/可选完整表、数据形状）。本草案不发明 schema。",
        "summary_zh": "官方 kind=demo：烘焙文案与结构，安装后不是用来传数据。docs 示例为裸组件。未给出 props schema。",
        "citation": "registry.json description 与 docs 字段；docs 即 skill/registry.md / docs/llms.txt 所说的 add 输出 contract。"
      },
      "aliases": {
        "value": [],
        "status": "official",
        "citation": "registry.json meta.aliases"
      },
      "official_description": {
        "value": "The generic fallback page that replaces the legacy mobile-phone-shell template's secondary mode: a compact title with a back affordance over an empty content region, for secondary, detail and blank carrier pages. Fixed demo (Plan-035): a whole-screen template — install it to copy the structure, not to feed it data.",
        "status": "official",
        "citation": "registry.json description（docs/blocks.md 表格为同一描述的截断一行）"
      },
      "notes": "demo page-type，且是官方 generic fallback。route-index 中 fallbackRank=99，并为它配置 companion page-stack。官方仍称 “Each is a complete screen.”"
    },
    {
      "id": {
        "value": "service-search",
        "status": "official",
        "citation": "docs/blocks.md 表格；registry.json name"
      },
      "official_name": {
        "value": "Service Search",
        "status": "official",
        "citation": "registry.json title"
      },
      "kind": {
        "value": "demo",
        "status": "official",
        "citation": "docs/blocks.md Kind 列；registry.json kind"
      },
      "demo_only": {
        "value": true,
        "status": "official",
        "citation": "与官方 kind=demo 同义。insights.md §4.6 要求给 page-type 逐条标 demo_only；本草案对所有 kind=demo（含 2 个 region demo）都标，不另造含义。"
      },
      "grain": {
        "value": "page",
        "status": "official",
        "citation": "docs/blocks.md ## Page-type blocks；scripts/build-docs.ts 按是否存在 meta.route.pageType 把条目写入相应章节。"
      },
      "card_unit": {
        "value": null,
        "status": "missing",
        "note": "官方文档没有 card 层字段；本条官方描述也不把它写成单卡或单元格，本草案不推断为卡片单元。"
      },
      "scene": {
        "value": "cloud-services",
        "status": "official",
        "citation": "官方描述原文： “The cloud-services search page”。"
      },
      "routeable": {
        "value": true,
        "status": "official",
        "citation": "docs/blocks.md ## Page-type blocks：These carry routing rules, so ds.py route can pick one from a sentence. registry.json meta.route.pageType='service-search'；public/route-index.json coverage.routed=14，本条在 routes 中，fallbackRank=1。"
      },
      "data_contract": {
        "status": "official",
        "install_mode": "baked",
        "install_mode_status": "official",
        "install_mode_citation": "docs/blocks.md ## What the kind column means；docs/llms.txt “A block without the marker takes required data props and ships empty.” / “(demo) marks a block with fixed baked-in content”.",
        "required_props_named_in_description": [],
        "required_props_status": "official",
        "required_props_note": null,
        "optional_props_named_in_description": [],
        "optional_props_status": "missing",
        "props_in_official_docs_example": [],
        "docs_example_is_bare_component": true,
        "children_take_required_data": true,
        "children_take_required_data_status": "official",
        "schema": null,
        "schema_status": "missing",
        "schema_note": "未在官方文档给出可独立执行的 props schema（类型、必填/可选完整表、数据形状）。本草案不发明 schema。",
        "summary_zh": "官方 kind=demo：烘焙文案与结构，安装后不是用来传数据。docs 示例为裸组件。官方同时写明：子 block 接受必填数据，本页喂入固定 demo set；也可抽出子块自行喂数据。未给出本页自身的 props schema。",
        "citation": "registry.json description 与 docs 字段；docs 即 skill/registry.md / docs/llms.txt 所说的 add 输出 contract。"
      },
      "aliases": {
        "value": [
          "service-search-template"
        ],
        "status": "official",
        "citation": "registry.json meta.aliases"
      },
      "official_description": {
        "value": "The cloud-services search page, replacing the legacy service-search-template page: one fixed search shell drives three composition modes — pre-search history chips and a hot-chart rail, a live suggestion list while typing, and completed results with category tabs, an artist card rail and a song list — with a mini player riding above the bottom tab bar as its own island. Fixed demo (Plan-035): its child blocks take required data, and this page feeds them a fixed demo set — copy the structure and the writing, or lift the children and feed them your own.",
        "status": "official",
        "citation": "registry.json description（docs/blocks.md 表格为同一描述的截断一行）"
      },
      "notes": "demo page-type 作为路由入口。官方明确：子 block 接受必填数据，本页喂入固定 demo set；也可抽出子块自行喂数据。这是官方已写出的改造路径，不是测得的替换成本。"
    },
    {
      "id": {
        "value": "services-categories",
        "status": "official",
        "citation": "docs/blocks.md 表格；registry.json name"
      },
      "official_name": {
        "value": "Services Categories",
        "status": "official",
        "citation": "registry.json title"
      },
      "kind": {
        "value": "demo",
        "status": "official",
        "citation": "docs/blocks.md Kind 列；registry.json kind"
      },
      "demo_only": {
        "value": true,
        "status": "official",
        "citation": "与官方 kind=demo 同义。insights.md §4.6 要求给 page-type 逐条标 demo_only；本草案对所有 kind=demo（含 2 个 region demo）都标，不另造含义。"
      },
      "grain": {
        "value": "page",
        "status": "official",
        "citation": "docs/blocks.md ## Page-type blocks；scripts/build-docs.ts 按是否存在 meta.route.pageType 把条目写入相应章节。"
      },
      "card_unit": {
        "value": null,
        "status": "missing",
        "note": "官方文档没有 card 层字段；本条官方描述也不把它写成单卡或单元格，本草案不推断为卡片单元。"
      },
      "scene": {
        "value": "cloud-services",
        "status": "official",
        "citation": "官方描述原文： “A cloud-services filter-and-browse page”。文中同时出现 three-column movie poster grid，不另把 movies 写成官方主 scene。"
      },
      "routeable": {
        "value": true,
        "status": "official",
        "citation": "docs/blocks.md ## Page-type blocks：These carry routing rules, so ds.py route can pick one from a sentence. registry.json meta.route.pageType='services-categories'；public/route-index.json coverage.routed=14，本条在 routes 中，fallbackRank=1。"
      },
      "data_contract": {
        "status": "official",
        "install_mode": "baked",
        "install_mode_status": "official",
        "install_mode_citation": "docs/blocks.md ## What the kind column means；docs/llms.txt “A block without the marker takes required data props and ships empty.” / “(demo) marks a block with fixed baked-in content”.",
        "required_props_named_in_description": [],
        "required_props_status": "official",
        "required_props_note": null,
        "optional_props_named_in_description": [],
        "optional_props_status": "missing",
        "props_in_official_docs_example": [],
        "docs_example_is_bare_component": true,
        "children_take_required_data": true,
        "children_take_required_data_status": "official",
        "schema": null,
        "schema_status": "missing",
        "schema_note": "未在官方文档给出可独立执行的 props schema（类型、必填/可选完整表、数据形状）。本草案不发明 schema。",
        "summary_zh": "官方 kind=demo：烘焙文案与结构，安装后不是用来传数据。docs 示例为裸组件。官方同时写明：子 block 接受必填数据，本页喂入固定 demo set；也可抽出子块自行喂数据。未给出本页自身的 props schema。",
        "citation": "registry.json description 与 docs 字段；docs 即 skill/registry.md / docs/llms.txt 所说的 add 输出 contract。"
      },
      "aliases": {
        "value": [
          "services-categories"
        ],
        "status": "official",
        "citation": "registry.json meta.aliases"
      },
      "official_description": {
        "value": "A cloud-services filter-and-browse page — a back/title/search bar, six rows of filter chips (sort, year, region, access, genre, platform) and a three-column movie poster grid with VIP badges and scores — replacing the legacy services-categories page. Fixed demo (Plan-035): its child blocks take required data, and this page feeds them a fixed demo set — copy the structure and the writing, or lift the children and feed them your own.",
        "status": "official",
        "citation": "registry.json description（docs/blocks.md 表格为同一描述的截断一行）"
      },
      "notes": "demo page-type 作为路由入口。官方同样写明子 block 接受必填数据、本页喂入固定 demo set。页面内容含电影海报格，主 scene 仍是 cloud-services。"
    },
    {
      "id": {
        "value": "services-home",
        "status": "official",
        "citation": "docs/blocks.md 表格；registry.json name"
      },
      "official_name": {
        "value": "Services Home",
        "status": "official",
        "citation": "registry.json title"
      },
      "kind": {
        "value": "demo",
        "status": "official",
        "citation": "docs/blocks.md Kind 列；registry.json kind"
      },
      "demo_only": {
        "value": true,
        "status": "official",
        "citation": "与官方 kind=demo 同义。insights.md §4.6 要求给 page-type 逐条标 demo_only；本草案对所有 kind=demo（含 2 个 region demo）都标，不另造含义。"
      },
      "grain": {
        "value": "page",
        "status": "official",
        "citation": "docs/blocks.md ## Page-type blocks；scripts/build-docs.ts 按是否存在 meta.route.pageType 把条目写入相应章节。"
      },
      "card_unit": {
        "value": null,
        "status": "missing",
        "note": "官方文档没有 card 层字段；本条官方描述也不把它写成单卡或单元格，本草案不推断为卡片单元。"
      },
      "scene": {
        "value": "cloud-services",
        "status": "official",
        "citation": "官方描述原文： “The cloud-services home page in its default reading form”。阅读/新书货架是该页的默认内容形态，主 scene 仍以 cloud-services 为准。"
      },
      "routeable": {
        "value": true,
        "status": "official",
        "citation": "docs/blocks.md ## Page-type blocks：These carry routing rules, so ds.py route can pick one from a sentence. registry.json meta.route.pageType='services-home'；public/route-index.json coverage.routed=14，本条在 routes 中，fallbackRank=1。"
      },
      "data_contract": {
        "status": "official",
        "install_mode": "baked",
        "install_mode_status": "official",
        "install_mode_citation": "docs/blocks.md ## What the kind column means；docs/llms.txt “A block without the marker takes required data props and ships empty.” / “(demo) marks a block with fixed baked-in content”.",
        "required_props_named_in_description": [],
        "required_props_status": "official",
        "required_props_note": null,
        "optional_props_named_in_description": [],
        "optional_props_status": "missing",
        "props_in_official_docs_example": [],
        "docs_example_is_bare_component": true,
        "children_take_required_data": true,
        "children_take_required_data_status": "official",
        "schema": null,
        "schema_status": "missing",
        "schema_note": "未在官方文档给出可独立执行的 props schema（类型、必填/可选完整表、数据形状）。本草案不发明 schema。",
        "summary_zh": "官方 kind=demo：烘焙文案与结构，安装后不是用来传数据。docs 示例为裸组件。官方同时写明：子 block 接受必填数据，本页喂入固定 demo set；也可抽出子块自行喂数据。未给出本页自身的 props schema。",
        "citation": "registry.json description 与 docs 字段；docs 即 skill/registry.md / docs/llms.txt 所说的 add 输出 contract。"
      },
      "aliases": {
        "value": [
          "services-home-template"
        ],
        "status": "official",
        "citation": "registry.json meta.aliases"
      },
      "official_description": {
        "value": "The cloud-services home page in its default reading form, replacing the legacy services-home-template page: an immersive swipeable hero (top-banner), a category pill rail, the new-book preview shelf and the recommended-new-books list, under a title bar with a search action and a four-tab bottom navigation. Fixed demo (Plan-035): its child blocks take required data, and this page feeds them a fixed demo set — copy the structure and the writing, or lift the children and feed them your own.",
        "status": "official",
        "citation": "registry.json description（docs/blocks.md 表格为同一描述的截断一行）"
      },
      "notes": "demo page-type 作为路由入口。官方同样写明子 block 接受必填数据、本页喂入固定 demo set。默认阅读形态（top-banner、新书、推荐书单）不改变 cloud-services 主 scene。"
    },
    {
      "id": {
        "value": "services-launch-page",
        "status": "official",
        "citation": "docs/blocks.md 表格；registry.json name"
      },
      "official_name": {
        "value": "Services Launch Page",
        "status": "official",
        "citation": "registry.json title"
      },
      "kind": {
        "value": "demo",
        "status": "official",
        "citation": "docs/blocks.md Kind 列；registry.json kind"
      },
      "demo_only": {
        "value": true,
        "status": "official",
        "citation": "与官方 kind=demo 同义。insights.md §4.6 要求给 page-type 逐条标 demo_only；本草案对所有 kind=demo（含 2 个 region demo）都标，不另造含义。"
      },
      "grain": {
        "value": "page",
        "status": "official",
        "citation": "docs/blocks.md ## Page-type blocks；scripts/build-docs.ts 按是否存在 meta.route.pageType 把条目写入相应章节。"
      },
      "card_unit": {
        "value": null,
        "status": "missing",
        "note": "官方文档没有 card 层字段；本条官方描述也不把它写成单卡或单元格，本草案不推断为卡片单元。"
      },
      "scene": {
        "value": "first-launch",
        "status": "official",
        "citation": "官方描述原文： “A first-launch privacy-consent page”。不用 onboarding 一词替代官方用词。"
      },
      "routeable": {
        "value": true,
        "status": "official",
        "citation": "docs/blocks.md ## Page-type blocks：These carry routing rules, so ds.py route can pick one from a sentence. registry.json meta.route.pageType='services-launch-page'；public/route-index.json coverage.routed=14，本条在 routes 中，fallbackRank=1。"
      },
      "data_contract": {
        "status": "official",
        "install_mode": "baked",
        "install_mode_status": "official",
        "install_mode_citation": "docs/blocks.md ## What the kind column means；docs/llms.txt “A block without the marker takes required data props and ships empty.” / “(demo) marks a block with fixed baked-in content”.",
        "required_props_named_in_description": [],
        "required_props_status": "official",
        "required_props_note": null,
        "optional_props_named_in_description": [],
        "optional_props_status": "missing",
        "props_in_official_docs_example": [],
        "docs_example_is_bare_component": true,
        "children_take_required_data": null,
        "children_take_required_data_status": "missing",
        "schema": null,
        "schema_status": "missing",
        "schema_note": "未在官方文档给出可独立执行的 props schema（类型、必填/可选完整表、数据形状）。本草案不发明 schema。",
        "summary_zh": "官方 kind=demo：烘焙文案与结构，安装后不是用来传数据。docs 示例为裸组件。未给出 props schema。",
        "citation": "registry.json description 与 docs 字段；docs 即 skill/registry.md / docs/llms.txt 所说的 add 输出 contract。"
      },
      "aliases": {
        "value": [
          "services-launch-page"
        ],
        "status": "official",
        "citation": "registry.json meta.aliases"
      },
      "official_description": {
        "value": "A first-launch privacy-consent page — app hero, privacy statement with an expandable link, and the agree/disagree two-button decision inside a single card — replacing the legacy services-launch-page page. Fixed demo (Plan-035): the content is baked in on purpose — install it to copy the structure and the writing, not to feed it data.",
        "status": "official",
        "citation": "registry.json description（docs/blocks.md 表格为同一描述的截断一行）"
      },
      "notes": "demo page-type 作为路由入口。官方只写内容烘焙，没有“子 block 接受必填数据”那句。"
    },
    {
      "id": {
        "value": "services-me",
        "status": "official",
        "citation": "docs/blocks.md 表格；registry.json name"
      },
      "official_name": {
        "value": "Services Me",
        "status": "official",
        "citation": "registry.json title"
      },
      "kind": {
        "value": "demo",
        "status": "official",
        "citation": "docs/blocks.md Kind 列；registry.json kind"
      },
      "demo_only": {
        "value": true,
        "status": "official",
        "citation": "与官方 kind=demo 同义。insights.md §4.6 要求给 page-type 逐条标 demo_only；本草案对所有 kind=demo（含 2 个 region demo）都标，不另造含义。"
      },
      "grain": {
        "value": "page",
        "status": "official",
        "citation": "docs/blocks.md ## Page-type blocks；scripts/build-docs.ts 按是否存在 meta.route.pageType 把条目写入相应章节。"
      },
      "card_unit": {
        "value": null,
        "status": "missing",
        "note": "官方文档没有 card 层字段；本条官方描述也不把它写成单卡或单元格，本草案不推断为卡片单元。"
      },
      "scene": {
        "value": "cloud-services",
        "status": "official",
        "citation": "官方描述原文： “The cloud-services personal centre (me) page”。"
      },
      "routeable": {
        "value": true,
        "status": "official",
        "citation": "docs/blocks.md ## Page-type blocks：These carry routing rules, so ds.py route can pick one from a sentence. registry.json meta.route.pageType='services-me'；public/route-index.json coverage.routed=14，本条在 routes 中，fallbackRank=1。"
      },
      "data_contract": {
        "status": "official",
        "install_mode": "baked",
        "install_mode_status": "official",
        "install_mode_citation": "docs/blocks.md ## What the kind column means；docs/llms.txt “A block without the marker takes required data props and ships empty.” / “(demo) marks a block with fixed baked-in content”.",
        "required_props_named_in_description": [],
        "required_props_status": "official",
        "required_props_note": null,
        "optional_props_named_in_description": [],
        "optional_props_status": "missing",
        "props_in_official_docs_example": [],
        "docs_example_is_bare_component": true,
        "children_take_required_data": true,
        "children_take_required_data_status": "official",
        "schema": null,
        "schema_status": "missing",
        "schema_note": "未在官方文档给出可独立执行的 props schema（类型、必填/可选完整表、数据形状）。本草案不发明 schema。",
        "summary_zh": "官方 kind=demo：烘焙文案与结构，安装后不是用来传数据。docs 示例为裸组件。官方同时写明：子 block 接受必填数据，本页喂入固定 demo set；也可抽出子块自行喂数据。未给出本页自身的 props schema。",
        "citation": "registry.json description 与 docs 字段；docs 即 skill/registry.md / docs/llms.txt 所说的 add 输出 contract。"
      },
      "aliases": {
        "value": [
          "services-me"
        ],
        "status": "official",
        "citation": "registry.json meta.aliases"
      },
      "official_description": {
        "value": "The cloud-services personal centre (me) page, replacing the legacy services-me page: a collapsing large title with a message entry, then the identity card, quick-entry strip, feedback card, common-services grid and account list card, over a four-tab bottom navigation with the me tab active. Fixed demo (Plan-035): its child blocks take required data, and this page feeds them a fixed demo set — copy the structure and the writing, or lift the children and feed them your own.",
        "status": "official",
        "citation": "registry.json description（docs/blocks.md 表格为同一描述的截断一行）"
      },
      "notes": "demo page-type 作为路由入口。官方写明子 block 接受必填数据、本页喂入固定 demo set；正文点名 identity-card、quick-entry、feedback-card、common-services、account list card。"
    },
    {
      "id": {
        "value": "services-ranking",
        "status": "official",
        "citation": "docs/blocks.md 表格；registry.json name"
      },
      "official_name": {
        "value": "Services Ranking",
        "status": "official",
        "citation": "registry.json title"
      },
      "kind": {
        "value": "demo",
        "status": "official",
        "citation": "docs/blocks.md Kind 列；registry.json kind"
      },
      "demo_only": {
        "value": true,
        "status": "official",
        "citation": "与官方 kind=demo 同义。insights.md §4.6 要求给 page-type 逐条标 demo_only；本草案对所有 kind=demo（含 2 个 region demo）都标，不另造含义。"
      },
      "grain": {
        "value": "page",
        "status": "official",
        "citation": "docs/blocks.md ## Page-type blocks；scripts/build-docs.ts 按是否存在 meta.route.pageType 把条目写入相应章节。"
      },
      "card_unit": {
        "value": null,
        "status": "missing",
        "note": "官方文档没有 card 层字段；本条官方描述也不把它写成单卡或单元格，本草案不推断为卡片单元。"
      },
      "scene": {
        "value": "cloud-services",
        "status": "official",
        "citation": "官方描述原文： “A cloud-services ranking page”。"
      },
      "routeable": {
        "value": true,
        "status": "official",
        "citation": "docs/blocks.md ## Page-type blocks：These carry routing rules, so ds.py route can pick one from a sentence. registry.json meta.route.pageType='services-ranking'；public/route-index.json coverage.routed=14，本条在 routes 中，fallbackRank=1。"
      },
      "data_contract": {
        "status": "official",
        "install_mode": "baked",
        "install_mode_status": "official",
        "install_mode_citation": "docs/blocks.md ## What the kind column means；docs/llms.txt “A block without the marker takes required data props and ships empty.” / “(demo) marks a block with fixed baked-in content”.",
        "required_props_named_in_description": [],
        "required_props_status": "official",
        "required_props_note": null,
        "optional_props_named_in_description": [],
        "optional_props_status": "missing",
        "props_in_official_docs_example": [],
        "docs_example_is_bare_component": true,
        "children_take_required_data": true,
        "children_take_required_data_status": "official",
        "schema": null,
        "schema_status": "missing",
        "schema_note": "未在官方文档给出可独立执行的 props schema（类型、必填/可选完整表、数据形状）。本草案不发明 schema。",
        "summary_zh": "官方 kind=demo：烘焙文案与结构，安装后不是用来传数据。docs 示例为裸组件。官方同时写明：子 block 接受必填数据，本页喂入固定 demo set；也可抽出子块自行喂数据。未给出本页自身的 props schema。",
        "citation": "registry.json description 与 docs 字段；docs 即 skill/registry.md / docs/llms.txt 所说的 add 输出 contract。"
      },
      "aliases": {
        "value": [
          "services-ranking"
        ],
        "status": "official",
        "citation": "registry.json meta.aliases"
      },
      "official_description": {
        "value": "A cloud-services ranking page — ranking-topbanner header with the wheat-flanked illustration title, a four-category chips tab bar and a vertical ranked card flow with follow actions — replacing the legacy services-ranking page. Fixed demo (Plan-035): its child blocks take required data, and this page feeds them a fixed demo set — copy the structure and the writing, or lift the children and feed them your own.",
        "status": "official",
        "citation": "registry.json description（docs/blocks.md 表格为同一描述的截断一行）"
      },
      "notes": "demo page-type 作为路由入口。官方写明子 block 接受必填数据、本页喂入固定 demo set。"
    },
    {
      "id": {
        "value": "services-setting",
        "status": "official",
        "citation": "docs/blocks.md 表格；registry.json name"
      },
      "official_name": {
        "value": "Services Setting",
        "status": "official",
        "citation": "registry.json title"
      },
      "kind": {
        "value": "demo",
        "status": "official",
        "citation": "docs/blocks.md Kind 列；registry.json kind"
      },
      "demo_only": {
        "value": true,
        "status": "official",
        "citation": "与官方 kind=demo 同义。insights.md §4.6 要求给 page-type 逐条标 demo_only；本草案对所有 kind=demo（含 2 个 region demo）都标，不另造含义。"
      },
      "grain": {
        "value": "page",
        "status": "official",
        "citation": "docs/blocks.md ## Page-type blocks；scripts/build-docs.ts 按是否存在 meta.route.pageType 把条目写入相应章节。"
      },
      "card_unit": {
        "value": null,
        "status": "missing",
        "note": "官方文档没有 card 层字段；本条官方描述也不把它写成单卡或单元格，本草案不推断为卡片单元。"
      },
      "scene": {
        "value": "cloud-services",
        "status": "official",
        "citation": "官方描述原文： “The service-app settings half-modal”。主 scene 取 service-app / cloud-services；settings 是其功能，记在备注。"
      },
      "routeable": {
        "value": true,
        "status": "official",
        "citation": "docs/blocks.md ## Page-type blocks：These carry routing rules, so ds.py route can pick one from a sentence. registry.json meta.route.pageType='services-setting'；public/route-index.json coverage.routed=14，本条在 routes 中，fallbackRank=1。"
      },
      "data_contract": {
        "status": "official",
        "install_mode": "baked",
        "install_mode_status": "official",
        "install_mode_citation": "docs/blocks.md ## What the kind column means；docs/llms.txt “A block without the marker takes required data props and ships empty.” / “(demo) marks a block with fixed baked-in content”.",
        "required_props_named_in_description": [],
        "required_props_status": "official",
        "required_props_note": null,
        "optional_props_named_in_description": [],
        "optional_props_status": "missing",
        "props_in_official_docs_example": [],
        "docs_example_is_bare_component": true,
        "children_take_required_data": null,
        "children_take_required_data_status": "missing",
        "schema": null,
        "schema_status": "missing",
        "schema_note": "未在官方文档给出可独立执行的 props schema（类型、必填/可选完整表、数据形状）。本草案不发明 schema。",
        "summary_zh": "官方 kind=demo：烘焙文案与结构，安装后不是用来传数据。docs 示例为裸组件。未给出 props schema。",
        "citation": "registry.json description 与 docs 字段；docs 即 skill/registry.md / docs/llms.txt 所说的 add 输出 contract。"
      },
      "aliases": {
        "value": [
          "services-setting"
        ],
        "status": "official",
        "citation": "registry.json meta.aliases"
      },
      "official_description": {
        "value": "The service-app settings half-modal that replaces the legacy services-setting page: a sheet titled Settings over the service surface, carrying the data-and-privacy, privacy-policy, more and about groups with red marks, a service-mode value row and a version row. Fixed demo (Plan-035): the content is baked in on purpose — install it to copy the structure and the writing, not to feed it data.",
        "status": "official",
        "citation": "registry.json description（docs/blocks.md 表格为同一描述的截断一行）"
      },
      "notes": "混粒度张力：官方 page-type 表说 “Each is a complete screen.”，本条描述却是 “service-app settings half-modal”。它可被 ds.py route 选中，但形态是半模态而非整屏。官方只写内容烘焙，没有子 block 喂数那句。"
    },
    {
      "id": {
        "value": "settings-context-list",
        "status": "official",
        "citation": "docs/blocks.md 表格；registry.json name"
      },
      "official_name": {
        "value": "Settings Context List",
        "status": "official",
        "citation": "registry.json title"
      },
      "kind": {
        "value": "demo",
        "status": "official",
        "citation": "docs/blocks.md Kind 列；registry.json kind"
      },
      "demo_only": {
        "value": true,
        "status": "official",
        "citation": "与官方 kind=demo 同义。insights.md §4.6 要求给 page-type 逐条标 demo_only；本草案对所有 kind=demo（含 2 个 region demo）都标，不另造含义。"
      },
      "grain": {
        "value": "page",
        "status": "official",
        "citation": "docs/blocks.md ## Page-type blocks；scripts/build-docs.ts 按是否存在 meta.route.pageType 把条目写入相应章节。"
      },
      "card_unit": {
        "value": null,
        "status": "missing",
        "note": "官方文档没有 card 层字段；本条官方描述也不把它写成单卡或单元格，本草案不推断为卡片单元。"
      },
      "scene": {
        "value": "settings",
        "status": "official",
        "citation": "官方描述原文： “The preview-then-tune secondary settings page”。"
      },
      "routeable": {
        "value": true,
        "status": "official",
        "citation": "docs/blocks.md ## Page-type blocks：These carry routing rules, so ds.py route can pick one from a sentence. registry.json meta.route.pageType='settings-context-list'；public/route-index.json coverage.routed=14，本条在 routes 中，fallbackRank=1。"
      },
      "data_contract": {
        "status": "official",
        "install_mode": "baked",
        "install_mode_status": "official",
        "install_mode_citation": "docs/blocks.md ## What the kind column means；docs/llms.txt “A block without the marker takes required data props and ships empty.” / “(demo) marks a block with fixed baked-in content”.",
        "required_props_named_in_description": [],
        "required_props_status": "official",
        "required_props_note": null,
        "optional_props_named_in_description": [],
        "optional_props_status": "missing",
        "props_in_official_docs_example": [],
        "docs_example_is_bare_component": true,
        "children_take_required_data": null,
        "children_take_required_data_status": "missing",
        "schema": null,
        "schema_status": "missing",
        "schema_note": "未在官方文档给出可独立执行的 props schema（类型、必填/可选完整表、数据形状）。本草案不发明 schema。",
        "summary_zh": "官方 kind=demo：烘焙文案与结构，安装后不是用来传数据。docs 示例为裸组件。未给出 props schema。",
        "citation": "registry.json description 与 docs 字段；docs 即 skill/registry.md / docs/llms.txt 所说的 add 输出 contract。"
      },
      "aliases": {
        "value": [
          "settings-context-list"
        ],
        "status": "official",
        "citation": "registry.json meta.aliases"
      },
      "official_description": {
        "value": "The preview-then-tune secondary settings page from the legacy settings-context-list layout spec: a compact title bar, a full-bleed preview carousel, then list cards of slider, switch and value rows under subheaders with footnotes. Fixed demo (Plan-035): the content is baked in on purpose — install it to copy the structure and the writing, not to feed it data.",
        "status": "official",
        "citation": "registry.json description（docs/blocks.md 表格为同一描述的截断一行）"
      },
      "notes": "demo page-type 作为路由入口。官方只写内容烘焙。"
    },
    {
      "id": {
        "value": "settings-page",
        "status": "official",
        "citation": "docs/blocks.md 表格；registry.json name"
      },
      "official_name": {
        "value": "Settings Page",
        "status": "official",
        "citation": "registry.json title"
      },
      "kind": {
        "value": "demo",
        "status": "official",
        "citation": "docs/blocks.md Kind 列；registry.json kind"
      },
      "demo_only": {
        "value": true,
        "status": "official",
        "citation": "与官方 kind=demo 同义。insights.md §4.6 要求给 page-type 逐条标 demo_only；本草案对所有 kind=demo（含 2 个 region demo）都标，不另造含义。"
      },
      "grain": {
        "value": "page",
        "status": "official",
        "citation": "docs/blocks.md ## Page-type blocks；scripts/build-docs.ts 按是否存在 meta.route.pageType 把条目写入相应章节。"
      },
      "card_unit": {
        "value": null,
        "status": "missing",
        "note": "官方文档没有 card 层字段；本条官方描述也不把它写成单卡或单元格，本草案不推断为卡片单元。"
      },
      "scene": {
        "value": "settings",
        "status": "official",
        "citation": "官方描述原文： “The general system settings hub”。"
      },
      "routeable": {
        "value": true,
        "status": "official",
        "citation": "docs/blocks.md ## Page-type blocks：These carry routing rules, so ds.py route can pick one from a sentence. registry.json meta.route.pageType='settings-page'；public/route-index.json coverage.routed=14，本条在 routes 中，fallbackRank=1。"
      },
      "data_contract": {
        "status": "official",
        "install_mode": "baked",
        "install_mode_status": "official",
        "install_mode_citation": "docs/blocks.md ## What the kind column means；docs/llms.txt “A block without the marker takes required data props and ships empty.” / “(demo) marks a block with fixed baked-in content”.",
        "required_props_named_in_description": [],
        "required_props_status": "official",
        "required_props_note": null,
        "optional_props_named_in_description": [],
        "optional_props_status": "missing",
        "props_in_official_docs_example": [],
        "docs_example_is_bare_component": true,
        "children_take_required_data": null,
        "children_take_required_data_status": "missing",
        "schema": null,
        "schema_status": "missing",
        "schema_note": "未在官方文档给出可独立执行的 props schema（类型、必填/可选完整表、数据形状）。本草案不发明 schema。",
        "summary_zh": "官方 kind=demo：烘焙文案与结构，安装后不是用来传数据。docs 示例为裸组件。未给出 props schema。",
        "citation": "registry.json description 与 docs 字段；docs 即 skill/registry.md / docs/llms.txt 所说的 add 输出 contract。"
      },
      "aliases": {
        "value": [],
        "status": "official",
        "citation": "registry.json meta.aliases"
      },
      "official_description": {
        "value": "The general system settings hub — grouped cards of switch, value, link and accent-status rows across network, display, notifications, security, storage, system and about — replacing the legacy settings-page template. Fixed demo (Plan-035): the content is baked in on purpose — install it to copy the structure and the writing, not to feed it data.",
        "status": "official",
        "citation": "registry.json description（docs/blocks.md 表格为同一描述的截断一行）"
      },
      "notes": "demo page-type 作为路由入口。与 mobile-settings（单项功能设置页）是两个不同的 page type。"
    },
    {
      "id": {
        "value": "app-shell-starter",
        "status": "official",
        "citation": "docs/blocks.md 表格；registry.json name"
      },
      "official_name": {
        "value": "App Shell Starter",
        "status": "official",
        "citation": "registry.json title"
      },
      "kind": {
        "value": "demo",
        "status": "official",
        "citation": "docs/blocks.md Kind 列；registry.json kind"
      },
      "demo_only": {
        "value": true,
        "status": "official",
        "citation": "与官方 kind=demo 同义。insights.md §4.6 要求给 page-type 逐条标 demo_only；本草案对所有 kind=demo（含 2 个 region demo）都标，不另造含义。"
      },
      "grain": {
        "value": "region",
        "status": "official",
        "citation": "docs/blocks.md ## Region blocks；scripts/build-docs.ts 按是否存在 meta.route.pageType 把条目写入相应章节。"
      },
      "card_unit": {
        "value": null,
        "status": "missing",
        "note": "官方文档没有 card 层字段；本条官方描述也不把它写成单卡或单元格，本草案不推断为卡片单元。"
      },
      "scene": {
        "value": null,
        "status": "missing",
        "note": "未在官方文档出现。官方描述未命名产品表面（如 music / movies / books / games / cloud-services / settings / mobile-shell）。"
      },
      "routeable": {
        "value": false,
        "status": "official",
        "citation": "docs/blocks.md：只有 Page-type blocks “carry routing rules”；本条在 ## Region blocks，registry 无 meta.route.pageType；public/route-index.json 的 14 条 routes 不含本条。"
      },
      "data_contract": {
        "status": "official",
        "install_mode": "baked",
        "install_mode_status": "official",
        "install_mode_citation": "docs/blocks.md ## What the kind column means；docs/llms.txt “A block without the marker takes required data props and ships empty.” / “(demo) marks a block with fixed baked-in content”.",
        "required_props_named_in_description": [],
        "required_props_status": "official",
        "required_props_note": null,
        "optional_props_named_in_description": [],
        "optional_props_status": "missing",
        "props_in_official_docs_example": [],
        "docs_example_is_bare_component": true,
        "children_take_required_data": null,
        "children_take_required_data_status": "missing",
        "schema": null,
        "schema_status": "missing",
        "schema_note": "未在官方文档给出可独立执行的 props schema（类型、必填/可选完整表、数据形状）。本草案不发明 schema。",
        "summary_zh": "官方 kind=demo：烘焙文案与结构，安装后不是用来传数据。docs 示例为裸组件。未给出 props schema。",
        "citation": "registry.json description 与 docs 字段；docs 即 skill/registry.md / docs/llms.txt 所说的 add 输出 contract。"
      },
      "aliases": {
        "value": [
          "mobile-phone-shell-template"
        ],
        "status": "official",
        "citation": "registry.json meta.aliases"
      },
      "official_description": {
        "value": "A task-list page wired to the app-shell frame: a collapsing large title, a bottom tab row, and a content-height sheet that captures a new row and prepends it — the closing-the-loop example for the shell trio. Fixed demo (Plan-035): the content is baked in on purpose — install it to copy the structure and the writing, not to feed it data.",
        "status": "official",
        "citation": "registry.json description（docs/blocks.md 表格为同一描述的截断一行）"
      },
      "notes": "官方放在 Region 表，kind=demo。描述却是 “A task-list page wired to the app-shell frame”。skill/SKILL.md 把 kind: demo 写成 “fixed whole-screen template”，与“region 里出现整页 demo”不一致。无 meta.route，不可被 ds.py route 选中。"
    },
    {
      "id": {
        "value": "artist-search-result-card",
        "status": "official",
        "citation": "docs/blocks.md 表格；registry.json name"
      },
      "official_name": {
        "value": "Artist Search Result Card",
        "status": "official",
        "citation": "registry.json title"
      },
      "kind": {
        "value": "component",
        "status": "official",
        "citation": "docs/blocks.md Kind 列；registry.json kind"
      },
      "demo_only": {
        "value": false,
        "status": "official",
        "citation": "与官方 kind=demo 同义。insights.md §4.6 要求给 page-type 逐条标 demo_only；本草案对所有 kind=demo（含 2 个 region demo）都标，不另造含义。"
      },
      "grain": {
        "value": "region",
        "status": "official",
        "citation": "docs/blocks.md ## Region blocks；scripts/build-docs.ts 按是否存在 meta.route.pageType 把条目写入相应章节。"
      },
      "card_unit": {
        "value": null,
        "status": "missing",
        "note": "官方文档没有 card 层字段；本条官方描述也不把它写成单卡或单元格，本草案不推断为卡片单元。"
      },
      "scene": {
        "value": "music",
        "status": "inferred",
        "citation": "官方描述写 artist / playlist / album，未出现 music 一词；据此推断为 music，不写成官方 scene。"
      },
      "routeable": {
        "value": false,
        "status": "official",
        "citation": "docs/blocks.md：只有 Page-type blocks “carry routing rules”；本条在 ## Region blocks，registry 无 meta.route.pageType；public/route-index.json 的 14 条 routes 不含本条。"
      },
      "data_contract": {
        "status": "official",
        "install_mode": "empty_feed",
        "install_mode_status": "official",
        "install_mode_citation": "docs/blocks.md ## What the kind column means；docs/llms.txt “A block without the marker takes required data props and ships empty.” / “(demo) marks a block with fixed baked-in content”.",
        "required_props_named_in_description": [
          "artists",
          "works"
        ],
        "required_props_status": "official",
        "required_props_note": null,
        "optional_props_named_in_description": [],
        "optional_props_status": "missing",
        "props_in_official_docs_example": [
          "artists",
          "works"
        ],
        "docs_example_is_bare_component": false,
        "children_take_required_data": null,
        "children_take_required_data_status": "missing",
        "schema": null,
        "schema_status": "missing",
        "schema_note": "未在官方文档给出可独立执行的 props schema（类型、必填/可选完整表、数据形状）。本草案不发明 schema。",
        "summary_zh": "官方 kind=component：安装为空并喂数据。官方描述点名必填标识符：artists, works。不把示例对象写成正式 schema。",
        "citation": "registry.json description 与 docs 字段；docs 即 skill/registry.md / docs/llms.txt 所说的 add 输出 contract。"
      },
      "aliases": {
        "value": [],
        "status": "official",
        "citation": "registry.json meta.aliases"
      },
      "official_description": {
        "value": "Artist search results: followable artist rows with song and album stats over a horizontal strip of playlist and album covers with play counts, replacing the legacy artist-search-result-card block. The artists and works are required props; nothing is baked in, so an install feeds it instead of discarding it.",
        "status": "official",
        "citation": "registry.json description（docs/blocks.md 表格为同一描述的截断一行）"
      },
      "notes": "官方是歌手行 + 作品横滑条，名称含 card，粒度接近搜索结果区，不标 card_unit。"
    },
    {
      "id": {
        "value": "big-image-card",
        "status": "official",
        "citation": "docs/blocks.md 表格；registry.json name"
      },
      "official_name": {
        "value": "Big Image Card",
        "status": "official",
        "citation": "registry.json title"
      },
      "kind": {
        "value": "component",
        "status": "official",
        "citation": "docs/blocks.md Kind 列；registry.json kind"
      },
      "demo_only": {
        "value": false,
        "status": "official",
        "citation": "与官方 kind=demo 同义。insights.md §4.6 要求给 page-type 逐条标 demo_only；本草案对所有 kind=demo（含 2 个 region demo）都标，不另造含义。"
      },
      "grain": {
        "value": "region",
        "status": "official",
        "citation": "docs/blocks.md ## Region blocks；scripts/build-docs.ts 按是否存在 meta.route.pageType 把条目写入相应章节。"
      },
      "card_unit": {
        "value": true,
        "status": "inferred",
        "citation": "官方描述为 “A first-screen hero image card”。insights.md §4.6 与 evidence/hos7.md §2 已点名：这是挂在 region 目录下的更细卡片单元，不是整页或货架。 官方目录没有 card 层，故不得写成官方 grain。"
      },
      "scene": {
        "value": null,
        "status": "missing",
        "note": "未在官方文档出现。官方描述未命名产品表面（如 music / movies / books / games / cloud-services / settings / mobile-shell）。"
      },
      "routeable": {
        "value": false,
        "status": "official",
        "citation": "docs/blocks.md：只有 Page-type blocks “carry routing rules”；本条在 ## Region blocks，registry 无 meta.route.pageType；public/route-index.json 的 14 条 routes 不含本条。"
      },
      "data_contract": {
        "status": "official",
        "install_mode": "empty_feed",
        "install_mode_status": "official",
        "install_mode_citation": "docs/blocks.md ## What the kind column means；docs/llms.txt “A block without the marker takes required data props and ships empty.” / “(demo) marks a block with fixed baked-in content”.",
        "required_props_named_in_description": [
          "image",
          "title",
          "recommendation",
          "placeName",
          "placeCount"
        ],
        "required_props_status": "official",
        "required_props_note": null,
        "optional_props_named_in_description": [],
        "optional_props_status": "missing",
        "props_in_official_docs_example": [
          "image",
          "title",
          "recommendation",
          "placeName",
          "placeCount"
        ],
        "docs_example_is_bare_component": false,
        "children_take_required_data": null,
        "children_take_required_data_status": "missing",
        "schema": null,
        "schema_status": "missing",
        "schema_note": "未在官方文档给出可独立执行的 props schema（类型、必填/可选完整表、数据形状）。本草案不发明 schema。",
        "summary_zh": "官方 kind=component：安装为空并喂数据。官方描述点名必填标识符：image, title, recommendation, placeName, placeCount。不把示例对象写成正式 schema。",
        "citation": "registry.json description 与 docs 字段；docs 即 skill/registry.md / docs/llms.txt 所说的 add 输出 contract。"
      },
      "aliases": {
        "value": [],
        "status": "official",
        "citation": "registry.json meta.aliases"
      },
      "official_description": {
        "value": "A first-screen hero image card — full-bleed cover, scrim title, recommendation and location row — replacing the legacy big-image-card block. The data is a required prop (image, title, recommendation, placeName, placeCount); nothing is baked in, so an install feeds it instead of discarding it.",
        "status": "official",
        "citation": "registry.json description（docs/blocks.md 表格为同一描述的截断一行）"
      },
      "notes": "混粒度：官方 grain 为 region，描述是单张英雄图卡。本草案只加 card_unit 标注，不把该条从 69 里拆出，也不新增条目。"
    },
    {
      "id": {
        "value": "big-image-card-two-column-normal",
        "status": "official",
        "citation": "docs/blocks.md 表格；registry.json name"
      },
      "official_name": {
        "value": "Big Image Card Two Column Normal",
        "status": "official",
        "citation": "registry.json title"
      },
      "kind": {
        "value": "component",
        "status": "official",
        "citation": "docs/blocks.md Kind 列；registry.json kind"
      },
      "demo_only": {
        "value": false,
        "status": "official",
        "citation": "与官方 kind=demo 同义。insights.md §4.6 要求给 page-type 逐条标 demo_only；本草案对所有 kind=demo（含 2 个 region demo）都标，不另造含义。"
      },
      "grain": {
        "value": "region",
        "status": "official",
        "citation": "docs/blocks.md ## Region blocks；scripts/build-docs.ts 按是否存在 meta.route.pageType 把条目写入相应章节。"
      },
      "card_unit": {
        "value": true,
        "status": "inferred",
        "citation": "官方描述为 “A plain two-column poster-grid cell”。单元格不是 region 货架。 官方目录没有 card 层，故不得写成官方 grain。"
      },
      "scene": {
        "value": null,
        "status": "missing",
        "note": "未在官方文档出现。官方描述未命名产品表面（如 music / movies / books / games / cloud-services / settings / mobile-shell）。"
      },
      "routeable": {
        "value": false,
        "status": "official",
        "citation": "docs/blocks.md：只有 Page-type blocks “carry routing rules”；本条在 ## Region blocks，registry 无 meta.route.pageType；public/route-index.json 的 14 条 routes 不含本条。"
      },
      "data_contract": {
        "status": "official",
        "install_mode": "empty_feed",
        "install_mode_status": "official",
        "install_mode_citation": "docs/blocks.md ## What the kind column means；docs/llms.txt “A block without the marker takes required data props and ships empty.” / “(demo) marks a block with fixed baked-in content”.",
        "required_props_named_in_description": [
          "image",
          "category",
          "title"
        ],
        "required_props_status": "official",
        "required_props_note": null,
        "optional_props_named_in_description": [],
        "optional_props_status": "missing",
        "props_in_official_docs_example": [
          "image",
          "category",
          "title"
        ],
        "docs_example_is_bare_component": false,
        "children_take_required_data": null,
        "children_take_required_data_status": "missing",
        "schema": null,
        "schema_status": "missing",
        "schema_note": "未在官方文档给出可独立执行的 props schema（类型、必填/可选完整表、数据形状）。本草案不发明 schema。",
        "summary_zh": "官方 kind=component：安装为空并喂数据。官方描述点名必填标识符：image, category, title。不把示例对象写成正式 schema。",
        "citation": "registry.json description 与 docs 字段；docs 即 skill/registry.md / docs/llms.txt 所说的 add 输出 contract。"
      },
      "aliases": {
        "value": [],
        "status": "official",
        "citation": "registry.json meta.aliases"
      },
      "official_description": {
        "value": "A plain two-column poster-grid cell — full-bleed cover with a scrim category label and two-line title — replacing the legacy big-image-card-two-column-normal block. The data is a required prop (image, category, title); nothing is baked in, so an install feeds it instead of discarding it.",
        "status": "official",
        "citation": "registry.json description（docs/blocks.md 表格为同一描述的截断一行）"
      },
      "notes": "混粒度：官方 grain 为 region，描述是两列海报格的单元格。只标注，不扩编。"
    },
    {
      "id": {
        "value": "big-image-card-two-column-rating",
        "status": "official",
        "citation": "docs/blocks.md 表格；registry.json name"
      },
      "official_name": {
        "value": "Big Image Card Two Column Rating",
        "status": "official",
        "citation": "registry.json title"
      },
      "kind": {
        "value": "component",
        "status": "official",
        "citation": "docs/blocks.md Kind 列；registry.json kind"
      },
      "demo_only": {
        "value": false,
        "status": "official",
        "citation": "与官方 kind=demo 同义。insights.md §4.6 要求给 page-type 逐条标 demo_only；本草案对所有 kind=demo（含 2 个 region demo）都标，不另造含义。"
      },
      "grain": {
        "value": "region",
        "status": "official",
        "citation": "docs/blocks.md ## Region blocks；scripts/build-docs.ts 按是否存在 meta.route.pageType 把条目写入相应章节。"
      },
      "card_unit": {
        "value": true,
        "status": "inferred",
        "citation": "官方描述为 “A rated two-column poster-grid cell”。 官方目录没有 card 层，故不得写成官方 grain。"
      },
      "scene": {
        "value": null,
        "status": "missing",
        "note": "未在官方文档出现。官方描述未命名产品表面（如 music / movies / books / games / cloud-services / settings / mobile-shell）。"
      },
      "routeable": {
        "value": false,
        "status": "official",
        "citation": "docs/blocks.md：只有 Page-type blocks “carry routing rules”；本条在 ## Region blocks，registry 无 meta.route.pageType；public/route-index.json 的 14 条 routes 不含本条。"
      },
      "data_contract": {
        "status": "official",
        "install_mode": "empty_feed",
        "install_mode_status": "official",
        "install_mode_citation": "docs/blocks.md ## What the kind column means；docs/llms.txt “A block without the marker takes required data props and ships empty.” / “(demo) marks a block with fixed baked-in content”.",
        "required_props_named_in_description": [
          "image",
          "title",
          "rating",
          "distance"
        ],
        "required_props_status": "official",
        "required_props_note": null,
        "optional_props_named_in_description": [],
        "optional_props_status": "missing",
        "props_in_official_docs_example": [
          "image",
          "title",
          "rating",
          "distance"
        ],
        "docs_example_is_bare_component": false,
        "children_take_required_data": null,
        "children_take_required_data_status": "missing",
        "schema": null,
        "schema_status": "missing",
        "schema_note": "未在官方文档给出可独立执行的 props schema（类型、必填/可选完整表、数据形状）。本草案不发明 schema。",
        "summary_zh": "官方 kind=component：安装为空并喂数据。官方描述点名必填标识符：image, title, rating, distance。不把示例对象写成正式 schema。",
        "citation": "registry.json description 与 docs 字段；docs 即 skill/registry.md / docs/llms.txt 所说的 add 输出 contract。"
      },
      "aliases": {
        "value": [],
        "status": "official",
        "citation": "registry.json meta.aliases"
      },
      "official_description": {
        "value": "A rated two-column poster-grid cell — full-bleed cover with a scrim title plus a compact star row, score and distance — replacing the legacy big-image-card-two-column-rating block. The data is a required prop (image, title, rating, distance); nothing is baked in, so an install feeds it instead of discarding it.",
        "status": "official",
        "citation": "registry.json description（docs/blocks.md 表格为同一描述的截断一行）"
      },
      "notes": "混粒度：官方 grain 为 region，描述是带评分的海报格单元格。只标注，不扩编。"
    },
    {
      "id": {
        "value": "category-rail",
        "status": "official",
        "citation": "docs/blocks.md 表格；registry.json name"
      },
      "official_name": {
        "value": "Category Rail",
        "status": "official",
        "citation": "registry.json title"
      },
      "kind": {
        "value": "component",
        "status": "official",
        "citation": "docs/blocks.md Kind 列；registry.json kind"
      },
      "demo_only": {
        "value": false,
        "status": "official",
        "citation": "与官方 kind=demo 同义。insights.md §4.6 要求给 page-type 逐条标 demo_only；本草案对所有 kind=demo（含 2 个 region demo）都标，不另造含义。"
      },
      "grain": {
        "value": "region",
        "status": "official",
        "citation": "docs/blocks.md ## Region blocks；scripts/build-docs.ts 按是否存在 meta.route.pageType 把条目写入相应章节。"
      },
      "card_unit": {
        "value": null,
        "status": "missing",
        "note": "官方文档没有 card 层字段；本条官方描述也不把它写成单卡或单元格，本草案不推断为卡片单元。"
      },
      "scene": {
        "value": null,
        "status": "missing",
        "note": "未在官方文档出现。官方描述未命名产品表面（如 music / movies / books / games / cloud-services / settings / mobile-shell）。"
      },
      "routeable": {
        "value": false,
        "status": "official",
        "citation": "docs/blocks.md：只有 Page-type blocks “carry routing rules”；本条在 ## Region blocks，registry 无 meta.route.pageType；public/route-index.json 的 14 条 routes 不含本条。"
      },
      "data_contract": {
        "status": "official",
        "install_mode": "empty_feed",
        "install_mode_status": "official",
        "install_mode_citation": "docs/blocks.md ## What the kind column means；docs/llms.txt “A block without the marker takes required data props and ships empty.” / “(demo) marks a block with fixed baked-in content”.",
        "required_props_named_in_description": [
          "categories"
        ],
        "required_props_status": "official",
        "required_props_note": null,
        "optional_props_named_in_description": [],
        "optional_props_status": "missing",
        "props_in_official_docs_example": [
          "categories",
          "orientation"
        ],
        "docs_example_is_bare_component": false,
        "children_take_required_data": null,
        "children_take_required_data_status": "missing",
        "schema": null,
        "schema_status": "missing",
        "schema_note": "未在官方文档给出可独立执行的 props schema（类型、必填/可选完整表、数据形状）。本草案不发明 schema。",
        "summary_zh": "官方 kind=component：安装为空并喂数据。官方描述点名必填标识符：categories。官方 docs 示例中还出现但未声明是否必填：orientation。不把示例对象写成正式 schema。",
        "citation": "registry.json description 与 docs 字段；docs 即 skill/registry.md / docs/llms.txt 所说的 add 输出 contract。"
      },
      "aliases": {
        "value": [],
        "status": "official",
        "citation": "registry.json meta.aliases"
      },
      "official_description": {
        "value": "Category navigation in two arrangements the caller picks between: an 84px left rail beside a content pane for a long shelf of departments, or a horizontal chips tab bar for a short set. One DOM, one selection, one keyboard path. Both arrangements work at every width — the choice is the category count and the page's job, never the screen — and it is a generalisation of the legacy ranking-categories board rather than a restoration of its dark/gold business skin. The data is a required prop (categories); nothing is baked in, so an install feeds it instead of discarding it.",
        "status": "official",
        "citation": "registry.json description（docs/blocks.md 表格为同一描述的截断一行）"
      },
      "notes": "官方写明是对 legacy ranking-categories 的一般化，调用方在 vertical rail 与 chips tab 两种 arrangement 中选择。与 ranking-categories（一条业务实例）不要算成两个官方 scene。"
    },
    {
      "id": {
        "value": "common-services",
        "status": "official",
        "citation": "docs/blocks.md 表格；registry.json name"
      },
      "official_name": {
        "value": "Common Services",
        "status": "official",
        "citation": "registry.json title"
      },
      "kind": {
        "value": "component",
        "status": "official",
        "citation": "docs/blocks.md Kind 列；registry.json kind"
      },
      "demo_only": {
        "value": false,
        "status": "official",
        "citation": "与官方 kind=demo 同义。insights.md §4.6 要求给 page-type 逐条标 demo_only；本草案对所有 kind=demo（含 2 个 region demo）都标，不另造含义。"
      },
      "grain": {
        "value": "region",
        "status": "official",
        "citation": "docs/blocks.md ## Region blocks；scripts/build-docs.ts 按是否存在 meta.route.pageType 把条目写入相应章节。"
      },
      "card_unit": {
        "value": null,
        "status": "missing",
        "note": "官方文档没有 card 层字段；本条官方描述也不把它写成单卡或单元格，本草案不推断为卡片单元。"
      },
      "scene": {
        "value": null,
        "status": "missing",
        "note": "未在官方文档出现。官方描述未命名产品表面（如 music / movies / books / games / cloud-services / settings / mobile-shell）。"
      },
      "routeable": {
        "value": false,
        "status": "official",
        "citation": "docs/blocks.md：只有 Page-type blocks “carry routing rules”；本条在 ## Region blocks，registry 无 meta.route.pageType；public/route-index.json 的 14 条 routes 不含本条。"
      },
      "data_contract": {
        "status": "official",
        "install_mode": "empty_feed",
        "install_mode_status": "official",
        "install_mode_citation": "docs/blocks.md ## What the kind column means；docs/llms.txt “A block without the marker takes required data props and ships empty.” / “(demo) marks a block with fixed baked-in content”.",
        "required_props_named_in_description": [
          "services"
        ],
        "required_props_status": "official",
        "required_props_note": null,
        "optional_props_named_in_description": [
          "onSelectService"
        ],
        "optional_props_status": "official",
        "props_in_official_docs_example": [
          "services",
          "onSelectService"
        ],
        "docs_example_is_bare_component": false,
        "children_take_required_data": null,
        "children_take_required_data_status": "missing",
        "schema": null,
        "schema_status": "missing",
        "schema_note": "未在官方文档给出可独立执行的 props schema（类型、必填/可选完整表、数据形状）。本草案不发明 schema。",
        "summary_zh": "官方 kind=component：安装为空并喂数据。官方描述点名必填标识符：services。官方描述点名可选或附加：onSelectService。不把示例对象写成正式 schema。",
        "citation": "registry.json description 与 docs 字段；docs 即 skill/registry.md / docs/llms.txt 所说的 add 输出 contract。"
      },
      "aliases": {
        "value": [],
        "status": "official",
        "citation": "registry.json meta.aliases"
      },
      "official_description": {
        "value": "An icon-grid entry section on a card: tappable services plus a \"More\" tile that opens a content-height sheet with the full list, replacing the legacy common-services block. The data is a required prop (services); nothing is baked in, so an install feeds it instead of discarding it. Tiles are navigation, so without an onSelectService handler they render disabled.",
        "status": "official",
        "citation": "registry.json description（docs/blocks.md 表格为同一描述的截断一行）"
      },
      "notes": "官方描述为 “An icon-grid entry section on a card”。这是装在卡片里的入口区，不是单卡单元格；不标 card_unit。无 handler 时磁贴禁用是官方行为说明，不是 invent 的 schema。"
    },
    {
      "id": {
        "value": "date-picker",
        "status": "official",
        "citation": "docs/blocks.md 表格；registry.json name"
      },
      "official_name": {
        "value": "Date Picker",
        "status": "official",
        "citation": "registry.json title"
      },
      "kind": {
        "value": "component",
        "status": "official",
        "citation": "docs/blocks.md Kind 列；registry.json kind"
      },
      "demo_only": {
        "value": false,
        "status": "official",
        "citation": "与官方 kind=demo 同义。insights.md §4.6 要求给 page-type 逐条标 demo_only；本草案对所有 kind=demo（含 2 个 region demo）都标，不另造含义。"
      },
      "grain": {
        "value": "region",
        "status": "official",
        "citation": "docs/blocks.md ## Region blocks；scripts/build-docs.ts 按是否存在 meta.route.pageType 把条目写入相应章节。"
      },
      "card_unit": {
        "value": null,
        "status": "missing",
        "note": "官方文档没有 card 层字段；本条官方描述也不把它写成单卡或单元格，本草案不推断为卡片单元。"
      },
      "scene": {
        "value": null,
        "status": "missing",
        "note": "未在官方文档出现。官方描述未命名产品表面（如 music / movies / books / games / cloud-services / settings / mobile-shell）。"
      },
      "routeable": {
        "value": false,
        "status": "official",
        "citation": "docs/blocks.md：只有 Page-type blocks “carry routing rules”；本条在 ## Region blocks，registry 无 meta.route.pageType；public/route-index.json 的 14 条 routes 不含本条。"
      },
      "data_contract": {
        "status": "official",
        "install_mode": "empty_feed",
        "install_mode_status": "official",
        "install_mode_citation": "docs/blocks.md ## What the kind column means；docs/llms.txt “A block without the marker takes required data props and ships empty.” / “(demo) marks a block with fixed baked-in content”.",
        "required_props_named_in_description": [],
        "required_props_status": "missing",
        "required_props_note": null,
        "optional_props_named_in_description": [],
        "optional_props_status": "missing",
        "props_in_official_docs_example": [],
        "docs_example_is_bare_component": true,
        "children_take_required_data": null,
        "children_take_required_data_status": "missing",
        "schema": null,
        "schema_status": "missing",
        "schema_note": "未在官方文档给出可独立执行的 props schema（类型、必填/可选完整表、数据形状）。本草案不发明 schema。",
        "summary_zh": "官方 kind=component：按通则应安装为空并喂数据。但本条官方 docs 示例为裸组件，描述也未列出必填 data props（只提到 locale / LocaleProvider）。具体 data props 记为未在官方文档出现，不发明 schema。此条与 kind 通则存在张力。",
        "citation": "registry.json description 与 docs 字段；docs 即 skill/registry.md / docs/llms.txt 所说的 add 输出 contract。"
      },
      "aliases": {
        "value": [
          "floating-picker-dialog"
        ],
        "status": "official",
        "citation": "registry.json meta.aliases"
      },
      "official_description": {
        "value": "A date preset over the picker wheel and a content-height sheet: year, month and a day column derived from the selected month, replacing the legacy floating-picker-dialog. The block's own words — the column names, the title, the Cancel/OK/Done row — follow the `locale` prop or the page's `LocaleProvider`, English when neither spoke.",
        "status": "official",
        "citation": "registry.json description（docs/blocks.md 表格为同一描述的截断一行）"
      },
      "notes": "kind=component，按通则应“安装为空并喂数据”；但官方 docs 示例是裸的 <DatePicker />，描述只提到 locale / LocaleProvider，未列出必填 data props。不把日期值发明成必填项。更像控件而非 region。"
    },
    {
      "id": {
        "value": "downloads-manager",
        "status": "official",
        "citation": "docs/blocks.md 表格；registry.json name"
      },
      "official_name": {
        "value": "Downloads Manager",
        "status": "official",
        "citation": "registry.json title"
      },
      "kind": {
        "value": "demo",
        "status": "official",
        "citation": "docs/blocks.md Kind 列；registry.json kind"
      },
      "demo_only": {
        "value": true,
        "status": "official",
        "citation": "与官方 kind=demo 同义。insights.md §4.6 要求给 page-type 逐条标 demo_only；本草案对所有 kind=demo（含 2 个 region demo）都标，不另造含义。"
      },
      "grain": {
        "value": "region",
        "status": "official",
        "citation": "docs/blocks.md ## Region blocks；scripts/build-docs.ts 按是否存在 meta.route.pageType 把条目写入相应章节。"
      },
      "card_unit": {
        "value": null,
        "status": "missing",
        "note": "官方文档没有 card 层字段；本条官方描述也不把它写成单卡或单元格，本草案不推断为卡片单元。"
      },
      "scene": {
        "value": "downloads",
        "status": "official",
        "citation": "官方描述原文： “A downloads screen …”。"
      },
      "routeable": {
        "value": false,
        "status": "official",
        "citation": "docs/blocks.md：只有 Page-type blocks “carry routing rules”；本条在 ## Region blocks，registry 无 meta.route.pageType；public/route-index.json 的 14 条 routes 不含本条。"
      },
      "data_contract": {
        "status": "official",
        "install_mode": "baked",
        "install_mode_status": "official",
        "install_mode_citation": "docs/blocks.md ## What the kind column means；docs/llms.txt “A block without the marker takes required data props and ships empty.” / “(demo) marks a block with fixed baked-in content”.",
        "required_props_named_in_description": [],
        "required_props_status": "official",
        "required_props_note": null,
        "optional_props_named_in_description": [],
        "optional_props_status": "missing",
        "props_in_official_docs_example": [],
        "docs_example_is_bare_component": true,
        "children_take_required_data": null,
        "children_take_required_data_status": "missing",
        "schema": null,
        "schema_status": "missing",
        "schema_note": "未在官方文档给出可独立执行的 props schema（类型、必填/可选完整表、数据形状）。本草案不发明 schema。",
        "summary_zh": "官方 kind=demo：烘焙文案与结构，安装后不是用来传数据。docs 示例为裸组件。未给出 props schema。",
        "citation": "registry.json description 与 docs 字段；docs 即 skill/registry.md / docs/llms.txt 所说的 add 输出 contract。"
      },
      "aliases": {
        "value": [],
        "status": "official",
        "citation": "registry.json meta.aliases"
      },
      "official_description": {
        "value": "A downloads screen where every row carries its own menu on a trailing icon button, an icon button in the bar opens the screen-level menu, one row opens a half sheet and one carries a switch beside its tap target — the block layer's worked example of what a row opens. Fixed demo (Plan-035): the content is baked in on purpose — install it to copy the structure and the writing, not to feed it data.",
        "status": "official",
        "citation": "registry.json description（docs/blocks.md 表格为同一描述的截断一行）"
      },
      "notes": "官方放在 Region 表，kind=demo。描述却是 “A downloads screen”。与 app-shell-starter 同属「region 目录中的整页/整屏 demo」。无 meta.route，不可路由。"
    },
    {
      "id": {
        "value": "feedback-card",
        "status": "official",
        "citation": "docs/blocks.md 表格；registry.json name"
      },
      "official_name": {
        "value": "Feedback Card",
        "status": "official",
        "citation": "registry.json title"
      },
      "kind": {
        "value": "component",
        "status": "official",
        "citation": "docs/blocks.md Kind 列；registry.json kind"
      },
      "demo_only": {
        "value": false,
        "status": "official",
        "citation": "与官方 kind=demo 同义。insights.md §4.6 要求给 page-type 逐条标 demo_only；本草案对所有 kind=demo（含 2 个 region demo）都标，不另造含义。"
      },
      "grain": {
        "value": "region",
        "status": "official",
        "citation": "docs/blocks.md ## Region blocks；scripts/build-docs.ts 按是否存在 meta.route.pageType 把条目写入相应章节。"
      },
      "card_unit": {
        "value": true,
        "status": "inferred",
        "citation": "官方描述为 “A dismissible product-feedback card”，是单张反馈卡，不是一组区域。 官方目录没有 card 层，故不得写成官方 grain。"
      },
      "scene": {
        "value": null,
        "status": "missing",
        "note": "未在官方文档出现。官方描述未命名产品表面（如 music / movies / books / games / cloud-services / settings / mobile-shell）。"
      },
      "routeable": {
        "value": false,
        "status": "official",
        "citation": "docs/blocks.md：只有 Page-type blocks “carry routing rules”；本条在 ## Region blocks，registry 无 meta.route.pageType；public/route-index.json 的 14 条 routes 不含本条。"
      },
      "data_contract": {
        "status": "official",
        "install_mode": "empty_feed",
        "install_mode_status": "official",
        "install_mode_citation": "docs/blocks.md ## What the kind column means；docs/llms.txt “A block without the marker takes required data props and ships empty.” / “(demo) marks a block with fixed baked-in content”.",
        "required_props_named_in_description": [
          "title",
          "description",
          "illustration"
        ],
        "required_props_status": "official",
        "required_props_note": null,
        "optional_props_named_in_description": [],
        "optional_props_status": "missing",
        "props_in_official_docs_example": [
          "title",
          "description",
          "illustration"
        ],
        "docs_example_is_bare_component": false,
        "children_take_required_data": null,
        "children_take_required_data_status": "missing",
        "schema": null,
        "schema_status": "missing",
        "schema_note": "未在官方文档给出可独立执行的 props schema（类型、必填/可选完整表、数据形状）。本草案不发明 schema。",
        "summary_zh": "官方 kind=component：安装为空并喂数据。官方描述点名必填标识符：title, description, illustration。不把示例对象写成正式 schema。",
        "citation": "registry.json description 与 docs 字段；docs 即 skill/registry.md / docs/llms.txt 所说的 add 输出 contract。"
      },
      "aliases": {
        "value": [],
        "status": "official",
        "citation": "registry.json meta.aliases"
      },
      "official_description": {
        "value": "A dismissible product-feedback card with a title, a description and an NPS illustration, replacing the legacy feedback-card block. The data is a required prop (title, description, illustration); nothing is baked in, so an install feeds it instead of discarding it.",
        "status": "official",
        "citation": "registry.json description（docs/blocks.md 表格为同一描述的截断一行）"
      },
      "notes": "单张反馈卡，挂在 region 目录。"
    },
    {
      "id": {
        "value": "filter-chips",
        "status": "official",
        "citation": "docs/blocks.md 表格；registry.json name"
      },
      "official_name": {
        "value": "Filter Chips",
        "status": "official",
        "citation": "registry.json title"
      },
      "kind": {
        "value": "component",
        "status": "official",
        "citation": "docs/blocks.md Kind 列；registry.json kind"
      },
      "demo_only": {
        "value": false,
        "status": "official",
        "citation": "与官方 kind=demo 同义。insights.md §4.6 要求给 page-type 逐条标 demo_only；本草案对所有 kind=demo（含 2 个 region demo）都标，不另造含义。"
      },
      "grain": {
        "value": "region",
        "status": "official",
        "citation": "docs/blocks.md ## Region blocks；scripts/build-docs.ts 按是否存在 meta.route.pageType 把条目写入相应章节。"
      },
      "card_unit": {
        "value": null,
        "status": "missing",
        "note": "官方文档没有 card 层字段；本条官方描述也不把它写成单卡或单元格，本草案不推断为卡片单元。"
      },
      "scene": {
        "value": null,
        "status": "missing",
        "note": "未在官方文档出现。官方描述未命名产品表面（如 music / movies / books / games / cloud-services / settings / mobile-shell）。"
      },
      "routeable": {
        "value": false,
        "status": "official",
        "citation": "docs/blocks.md：只有 Page-type blocks “carry routing rules”；本条在 ## Region blocks，registry 无 meta.route.pageType；public/route-index.json 的 14 条 routes 不含本条。"
      },
      "data_contract": {
        "status": "official",
        "install_mode": "empty_feed",
        "install_mode_status": "official",
        "install_mode_citation": "docs/blocks.md ## What the kind column means；docs/llms.txt “A block without the marker takes required data props and ships empty.” / “(demo) marks a block with fixed baked-in content”.",
        "required_props_named_in_description": [
          "rows"
        ],
        "required_props_status": "official",
        "required_props_note": null,
        "optional_props_named_in_description": [],
        "optional_props_status": "missing",
        "props_in_official_docs_example": [
          "rows"
        ],
        "docs_example_is_bare_component": false,
        "children_take_required_data": null,
        "children_take_required_data_status": "missing",
        "schema": null,
        "schema_status": "missing",
        "schema_note": "未在官方文档给出可独立执行的 props schema（类型、必填/可选完整表、数据形状）。本草案不发明 schema。",
        "summary_zh": "官方 kind=component：安装为空并喂数据。官方描述点名必填标识符：rows。不把示例对象写成正式 schema。",
        "citation": "registry.json description 与 docs 字段；docs 即 skill/registry.md / docs/llms.txt 所说的 add 输出 contract。"
      },
      "aliases": {
        "value": [],
        "status": "official",
        "citation": "registry.json meta.aliases"
      },
      "official_description": {
        "value": "Stacked single-select filter rows built from toggle groups, each row led by its dimension label with its opening pick carried by the data, replacing the legacy filter-chips block. The rows are a required prop; nothing is baked in, so an install feeds it instead of discarding it.",
        "status": "official",
        "citation": "registry.json description（docs/blocks.md 表格为同一描述的截断一行）"
      },
      "notes": "通用筛选行，官方未命名产品表面。"
    },
    {
      "id": {
        "value": "filter-complete",
        "status": "official",
        "citation": "docs/blocks.md 表格；registry.json name"
      },
      "official_name": {
        "value": "Filter Complete",
        "status": "official",
        "citation": "registry.json title"
      },
      "kind": {
        "value": "component",
        "status": "official",
        "citation": "docs/blocks.md Kind 列；registry.json kind"
      },
      "demo_only": {
        "value": false,
        "status": "official",
        "citation": "与官方 kind=demo 同义。insights.md §4.6 要求给 page-type 逐条标 demo_only；本草案对所有 kind=demo（含 2 个 region demo）都标，不另造含义。"
      },
      "grain": {
        "value": "region",
        "status": "official",
        "citation": "docs/blocks.md ## Region blocks；scripts/build-docs.ts 按是否存在 meta.route.pageType 把条目写入相应章节。"
      },
      "card_unit": {
        "value": null,
        "status": "missing",
        "note": "官方文档没有 card 层字段；本条官方描述也不把它写成单卡或单元格，本草案不推断为卡片单元。"
      },
      "scene": {
        "value": null,
        "status": "missing",
        "note": "未在官方文档出现。官方描述未命名产品表面（如 music / movies / books / games / cloud-services / settings / mobile-shell）。"
      },
      "routeable": {
        "value": false,
        "status": "official",
        "citation": "docs/blocks.md：只有 Page-type blocks “carry routing rules”；本条在 ## Region blocks，registry 无 meta.route.pageType；public/route-index.json 的 14 条 routes 不含本条。"
      },
      "data_contract": {
        "status": "official",
        "install_mode": "empty_feed",
        "install_mode_status": "official",
        "install_mode_citation": "docs/blocks.md ## What the kind column means；docs/llms.txt “A block without the marker takes required data props and ships empty.” / “(demo) marks a block with fixed baked-in content”.",
        "required_props_named_in_description": [
          "dimensions"
        ],
        "required_props_status": "official",
        "required_props_note": null,
        "optional_props_named_in_description": [],
        "optional_props_status": "missing",
        "props_in_official_docs_example": [
          "dimensions"
        ],
        "docs_example_is_bare_component": false,
        "children_take_required_data": null,
        "children_take_required_data_status": "missing",
        "schema": null,
        "schema_status": "missing",
        "schema_note": "未在官方文档给出可独立执行的 props schema（类型、必填/可选完整表、数据形状）。本草案不发明 schema。",
        "summary_zh": "官方 kind=component：安装为空并喂数据。官方描述点名必填标识符：dimensions。不把示例对象写成正式 schema。",
        "citation": "registry.json description 与 docs 字段；docs 即 skill/registry.md / docs/llms.txt 所说的 add 输出 contract。"
      },
      "aliases": {
        "value": [],
        "status": "official",
        "citation": "registry.json meta.aliases"
      },
      "official_description": {
        "value": "An applied-filter summary bar that joins the current picks and reopens the filter panel as a content-height sheet of toggle groups, replacing the legacy filter-complete block. The dimensions (and each one's opening pick) are a required prop; nothing is baked in, so an install feeds it instead of discarding it.",
        "status": "official",
        "citation": "registry.json description（docs/blocks.md 表格为同一描述的截断一行）"
      },
      "notes": "已选筛选摘要条，官方未命名产品表面。"
    },
    {
      "id": {
        "value": "filter-list",
        "status": "official",
        "citation": "docs/blocks.md 表格；registry.json name"
      },
      "official_name": {
        "value": "Filter List",
        "status": "official",
        "citation": "registry.json title"
      },
      "kind": {
        "value": "component",
        "status": "official",
        "citation": "docs/blocks.md Kind 列；registry.json kind"
      },
      "demo_only": {
        "value": false,
        "status": "official",
        "citation": "与官方 kind=demo 同义。insights.md §4.6 要求给 page-type 逐条标 demo_only；本草案对所有 kind=demo（含 2 个 region demo）都标，不另造含义。"
      },
      "grain": {
        "value": "region",
        "status": "official",
        "citation": "docs/blocks.md ## Region blocks；scripts/build-docs.ts 按是否存在 meta.route.pageType 把条目写入相应章节。"
      },
      "card_unit": {
        "value": null,
        "status": "missing",
        "note": "官方文档没有 card 层字段；本条官方描述也不把它写成单卡或单元格，本草案不推断为卡片单元。"
      },
      "scene": {
        "value": null,
        "status": "missing",
        "note": "未在官方文档出现。官方描述是 filter-page result list，行数据是 artist name；未命名产品表面。"
      },
      "routeable": {
        "value": false,
        "status": "official",
        "citation": "docs/blocks.md：只有 Page-type blocks “carry routing rules”；本条在 ## Region blocks，registry 无 meta.route.pageType；public/route-index.json 的 14 条 routes 不含本条。"
      },
      "data_contract": {
        "status": "official",
        "install_mode": "empty_feed",
        "install_mode_status": "official",
        "install_mode_citation": "docs/blocks.md ## What the kind column means；docs/llms.txt “A block without the marker takes required data props and ships empty.” / “(demo) marks a block with fixed baked-in content”.",
        "required_props_named_in_description": [
          "artists"
        ],
        "required_props_status": "official",
        "required_props_note": null,
        "optional_props_named_in_description": [],
        "optional_props_status": "missing",
        "props_in_official_docs_example": [
          "artists"
        ],
        "docs_example_is_bare_component": false,
        "children_take_required_data": null,
        "children_take_required_data_status": "missing",
        "schema": null,
        "schema_status": "missing",
        "schema_note": "未在官方文档给出可独立执行的 props schema（类型、必填/可选完整表、数据形状）。本草案不发明 schema。",
        "summary_zh": "官方 kind=component：安装为空并喂数据。官方描述点名必填标识符：artists。不把示例对象写成正式 schema。",
        "citation": "registry.json description 与 docs 字段；docs 即 skill/registry.md / docs/llms.txt 所说的 add 输出 contract。"
      },
      "aliases": {
        "value": [],
        "status": "official",
        "citation": "registry.json meta.aliases"
      },
      "official_description": {
        "value": "A filter-page result list of 72px rows with a circular avatar and artist name per row, where tapping a row records the filter pick, replacing the legacy filter-list block. The artists are a required prop; nothing is baked in, so an install feeds it instead of discarding it.",
        "status": "official",
        "citation": "registry.json description（docs/blocks.md 表格为同一描述的截断一行）"
      },
      "notes": "官方是 filter-page 的结果列表，行数据为 artist；未把 music 写成官方 scene。"
    },
    {
      "id": {
        "value": "heatmap-calendar",
        "status": "official",
        "citation": "docs/blocks.md 表格；registry.json name"
      },
      "official_name": {
        "value": "Heatmap Calendar",
        "status": "official",
        "citation": "registry.json title"
      },
      "kind": {
        "value": "component",
        "status": "official",
        "citation": "docs/blocks.md Kind 列；registry.json kind"
      },
      "demo_only": {
        "value": false,
        "status": "official",
        "citation": "与官方 kind=demo 同义。insights.md §4.6 要求给 page-type 逐条标 demo_only；本草案对所有 kind=demo（含 2 个 region demo）都标，不另造含义。"
      },
      "grain": {
        "value": "region",
        "status": "official",
        "citation": "docs/blocks.md ## Region blocks；scripts/build-docs.ts 按是否存在 meta.route.pageType 把条目写入相应章节。"
      },
      "card_unit": {
        "value": null,
        "status": "missing",
        "note": "官方文档没有 card 层字段；本条官方描述也不把它写成单卡或单元格，本草案不推断为卡片单元。"
      },
      "scene": {
        "value": null,
        "status": "missing",
        "note": "未在官方文档出现。官方描述未命名产品表面（如 music / movies / books / games / cloud-services / settings / mobile-shell）。"
      },
      "routeable": {
        "value": false,
        "status": "official",
        "citation": "docs/blocks.md：只有 Page-type blocks “carry routing rules”；本条在 ## Region blocks，registry 无 meta.route.pageType；public/route-index.json 的 14 条 routes 不含本条。"
      },
      "data_contract": {
        "status": "official",
        "install_mode": "empty_feed",
        "install_mode_status": "official",
        "install_mode_citation": "docs/blocks.md ## What the kind column means；docs/llms.txt “A block without the marker takes required data props and ships empty.” / “(demo) marks a block with fixed baked-in content”.",
        "required_props_named_in_description": [
          "title",
          "metrics"
        ],
        "required_props_status": "official",
        "required_props_note": null,
        "optional_props_named_in_description": [],
        "optional_props_status": "missing",
        "props_in_official_docs_example": [
          "title",
          "leadingBlanks",
          "metrics"
        ],
        "docs_example_is_bare_component": false,
        "children_take_required_data": null,
        "children_take_required_data_status": "missing",
        "schema": null,
        "schema_status": "missing",
        "schema_note": "未在官方文档给出可独立执行的 props schema（类型、必填/可选完整表、数据形状）。本草案不发明 schema。",
        "summary_zh": "官方 kind=component：安装为空并喂数据。官方描述点名必填标识符：title, metrics。官方 docs 示例中还出现但未声明是否必填：leadingBlanks。不把示例对象写成正式 schema。",
        "citation": "registry.json description 与 docs 字段；docs 即 skill/registry.md / docs/llms.txt 所说的 add 输出 contract。"
      },
      "aliases": {
        "value": [],
        "status": "official",
        "citation": "registry.json meta.aliases"
      },
      "official_description": {
        "value": "A self-drawn seven-column month grid whose day cells take opacity steps of the primary token over the muted base, with a mandatory legend and a segmented control switching the demo metric, replacing the legacy agui heatmap-calendar. The data is a required prop (title, metrics); nothing is baked in, so an install feeds it instead of discarding it.",
        "status": "official",
        "citation": "registry.json description（docs/blocks.md 表格为同一描述的截断一行）"
      },
      "notes": "官方提到 segmented control switching the demo metric，同时写 title、metrics 为必填、nothing is baked in。本草案不解释 “demo metric” 一词是否与 kind 冲突，只记录原文。"
    },
    {
      "id": {
        "value": "identity-card",
        "status": "official",
        "citation": "docs/blocks.md 表格；registry.json name"
      },
      "official_name": {
        "value": "Identity Card",
        "status": "official",
        "citation": "registry.json title"
      },
      "kind": {
        "value": "component",
        "status": "official",
        "citation": "docs/blocks.md Kind 列；registry.json kind"
      },
      "demo_only": {
        "value": false,
        "status": "official",
        "citation": "与官方 kind=demo 同义。insights.md §4.6 要求给 page-type 逐条标 demo_only；本草案对所有 kind=demo（含 2 个 region demo）都标，不另造含义。"
      },
      "grain": {
        "value": "region",
        "status": "official",
        "citation": "docs/blocks.md ## Region blocks；scripts/build-docs.ts 按是否存在 meta.route.pageType 把条目写入相应章节。"
      },
      "card_unit": {
        "value": true,
        "status": "inferred",
        "citation": "官方描述为 “A profile identity card”，单张身份卡。 官方目录没有 card 层，故不得写成官方 grain。"
      },
      "scene": {
        "value": "profile",
        "status": "official",
        "citation": "官方描述原文： “A profile identity card”。"
      },
      "routeable": {
        "value": false,
        "status": "official",
        "citation": "docs/blocks.md：只有 Page-type blocks “carry routing rules”；本条在 ## Region blocks，registry 无 meta.route.pageType；public/route-index.json 的 14 条 routes 不含本条。"
      },
      "data_contract": {
        "status": "official",
        "install_mode": "empty_feed",
        "install_mode_status": "official",
        "install_mode_citation": "docs/blocks.md ## What the kind column means；docs/llms.txt “A block without the marker takes required data props and ships empty.” / “(demo) marks a block with fixed baked-in content”.",
        "required_props_named_in_description": [
          "name",
          "avatar"
        ],
        "required_props_status": "official",
        "required_props_note": null,
        "optional_props_named_in_description": [],
        "optional_props_status": "missing",
        "props_in_official_docs_example": [
          "name",
          "avatar"
        ],
        "docs_example_is_bare_component": false,
        "children_take_required_data": null,
        "children_take_required_data_status": "missing",
        "schema": null,
        "schema_status": "missing",
        "schema_note": "未在官方文档给出可独立执行的 props schema（类型、必填/可选完整表、数据形状）。本草案不发明 schema。",
        "summary_zh": "官方 kind=component：安装为空并喂数据。官方描述点名必填标识符：name, avatar。不把示例对象写成正式 schema。",
        "citation": "registry.json description 与 docs 字段；docs 即 skill/registry.md / docs/llms.txt 所说的 add 输出 contract。"
      },
      "aliases": {
        "value": [],
        "status": "official",
        "citation": "registry.json meta.aliases"
      },
      "official_description": {
        "value": "A profile identity card — avatar, username and a membership row whose join state flips the copy, the button and a VIP chip — replacing the legacy identity-card block. The data is a required prop (name, avatar); nothing is baked in, so an install feeds it instead of discarding it.",
        "status": "official",
        "citation": "registry.json description（docs/blocks.md 表格为同一描述的截断一行）"
      },
      "notes": "官方必填为 name、avatar。描述提到 membership row 会随 join state 变化，但未把 membership 列为必填 prop，不补写。"
    },
    {
      "id": {
        "value": "list-row-select",
        "status": "official",
        "citation": "docs/blocks.md 表格；registry.json name"
      },
      "official_name": {
        "value": "List Row Select",
        "status": "official",
        "citation": "registry.json title"
      },
      "kind": {
        "value": "component",
        "status": "official",
        "citation": "docs/blocks.md Kind 列；registry.json kind"
      },
      "demo_only": {
        "value": false,
        "status": "official",
        "citation": "与官方 kind=demo 同义。insights.md §4.6 要求给 page-type 逐条标 demo_only；本草案对所有 kind=demo（含 2 个 region demo）都标，不另造含义。"
      },
      "grain": {
        "value": "region",
        "status": "official",
        "citation": "docs/blocks.md ## Region blocks；scripts/build-docs.ts 按是否存在 meta.route.pageType 把条目写入相应章节。"
      },
      "card_unit": {
        "value": null,
        "status": "missing",
        "note": "官方文档没有 card 层字段；本条官方描述也不把它写成单卡或单元格，本草案不推断为卡片单元。"
      },
      "scene": {
        "value": null,
        "status": "missing",
        "note": "未在官方文档出现。官方描述未命名产品表面（如 music / movies / books / games / cloud-services / settings / mobile-shell）。"
      },
      "routeable": {
        "value": false,
        "status": "official",
        "citation": "docs/blocks.md：只有 Page-type blocks “carry routing rules”；本条在 ## Region blocks，registry 无 meta.route.pageType；public/route-index.json 的 14 条 routes 不含本条。"
      },
      "data_contract": {
        "status": "official",
        "install_mode": "empty_feed",
        "install_mode_status": "official",
        "install_mode_citation": "docs/blocks.md ## What the kind column means；docs/llms.txt “A block without the marker takes required data props and ships empty.” / “(demo) marks a block with fixed baked-in content”.",
        "required_props_named_in_description": [],
        "required_props_status": "missing",
        "required_props_note": null,
        "optional_props_named_in_description": [],
        "optional_props_status": "missing",
        "props_in_official_docs_example": [
          "label",
          "description",
          "options",
          "value",
          "onValueChange"
        ],
        "docs_example_is_bare_component": false,
        "children_take_required_data": null,
        "children_take_required_data_status": "missing",
        "schema": null,
        "schema_status": "missing",
        "schema_note": "未在官方文档给出可独立执行的 props schema（类型、必填/可选完整表、数据形状）。本草案不发明 schema。",
        "summary_zh": "官方 kind=component：按通则安装为空并喂数据。条目描述未点名必填 data props；下列名称仅来自官方 docs 示例（skill/registry.md 称 docs 为 add 打印的 contract），不把它们发明成必填清单：label, description, options, value, onValueChange。无正式 schema。",
        "citation": "registry.json description 与 docs 字段；docs 即 skill/registry.md / docs/llms.txt 所说的 add 输出 contract。"
      },
      "aliases": {
        "value": [],
        "status": "official",
        "citation": "registry.json meta.aliases"
      },
      "official_description": {
        "value": "A single-choice setting as a list row with the picker at the trailing edge (Plan-043 #155, the designer's left-title/right-picker option): the row takes no onClick, the SelectTrigger lives in ListItemActions, and no fill plate is added.",
        "status": "official",
        "citation": "registry.json description（docs/blocks.md 表格为同一描述的截断一行）"
      },
      "notes": "官方描述为 “A single-choice setting as a list row”。挂在 region 目录下的行级单元。描述未使用 “required prop; nothing is baked in” 句式；docs 示例给出 label / description / options / value / onValueChange，不把示例写成完整 schema。"
    },
    {
      "id": {
        "value": "masonry-media-wall",
        "status": "official",
        "citation": "docs/blocks.md 表格；registry.json name"
      },
      "official_name": {
        "value": "Masonry Media Wall",
        "status": "official",
        "citation": "registry.json title"
      },
      "kind": {
        "value": "component",
        "status": "official",
        "citation": "docs/blocks.md Kind 列；registry.json kind"
      },
      "demo_only": {
        "value": false,
        "status": "official",
        "citation": "与官方 kind=demo 同义。insights.md §4.6 要求给 page-type 逐条标 demo_only；本草案对所有 kind=demo（含 2 个 region demo）都标，不另造含义。"
      },
      "grain": {
        "value": "region",
        "status": "official",
        "citation": "docs/blocks.md ## Region blocks；scripts/build-docs.ts 按是否存在 meta.route.pageType 把条目写入相应章节。"
      },
      "card_unit": {
        "value": null,
        "status": "missing",
        "note": "官方文档没有 card 层字段；本条官方描述也不把它写成单卡或单元格，本草案不推断为卡片单元。"
      },
      "scene": {
        "value": null,
        "status": "missing",
        "note": "未在官方文档出现。官方描述未命名产品表面（如 music / movies / books / games / cloud-services / settings / mobile-shell）。"
      },
      "routeable": {
        "value": false,
        "status": "official",
        "citation": "docs/blocks.md：只有 Page-type blocks “carry routing rules”；本条在 ## Region blocks，registry 无 meta.route.pageType；public/route-index.json 的 14 条 routes 不含本条。"
      },
      "data_contract": {
        "status": "official",
        "install_mode": "empty_feed",
        "install_mode_status": "official",
        "install_mode_citation": "docs/blocks.md ## What the kind column means；docs/llms.txt “A block without the marker takes required data props and ships empty.” / “(demo) marks a block with fixed baked-in content”.",
        "required_props_named_in_description": [
          "items"
        ],
        "required_props_status": "official",
        "required_props_note": null,
        "optional_props_named_in_description": [],
        "optional_props_status": "missing",
        "props_in_official_docs_example": [
          "items"
        ],
        "docs_example_is_bare_component": false,
        "children_take_required_data": null,
        "children_take_required_data_status": "missing",
        "schema": null,
        "schema_status": "missing",
        "schema_note": "未在官方文档给出可独立执行的 props schema（类型、必填/可选完整表、数据形状）。本草案不发明 schema。",
        "summary_zh": "官方 kind=component：安装为空并喂数据。描述未用 “required prop” 句式，但 contracts/masonry-media-wall.md API 表写明 items 必填；docs 示例也传入 items。不把合同表展开成发明的 schema，只记录官方已列出的必填项。",
        "citation": "contracts/masonry-media-wall.md ## API；registry.json docs"
      },
      "aliases": {
        "value": [],
        "status": "official",
        "citation": "registry.json meta.aliases"
      },
      "official_description": {
        "value": "A static browsing wall in CSS multi-column (Plan-042 T3B): the DOM order is the data order, every item's declared ratio reserves its box before the image request, and the 2/3/4 column ladder answers the wall's own container. Browsing only — no handler, no selection, no dense packing, no JS measurement; the interactive/virtualised wall is a different contract.",
        "status": "official",
        "citation": "registry.json description（docs/blocks.md 表格为同一描述的截断一行）"
      },
      "notes": "69 条里唯一同时有 contracts/masonry-media-wall.md API 表的 block。官方合同写明 items 必填。但 registry 类型是 registry:block，官方 docs 示例却从 @/components/ui/masonry-media-wall 导入。本草案只记录这一官方张力，不改注册类型。"
    },
    {
      "id": {
        "value": "movie-grid-card",
        "status": "official",
        "citation": "docs/blocks.md 表格；registry.json name"
      },
      "official_name": {
        "value": "Movie Grid Card",
        "status": "official",
        "citation": "registry.json title"
      },
      "kind": {
        "value": "component",
        "status": "official",
        "citation": "docs/blocks.md Kind 列；registry.json kind"
      },
      "demo_only": {
        "value": false,
        "status": "official",
        "citation": "与官方 kind=demo 同义。insights.md §4.6 要求给 page-type 逐条标 demo_only；本草案对所有 kind=demo（含 2 个 region demo）都标，不另造含义。"
      },
      "grain": {
        "value": "region",
        "status": "official",
        "citation": "docs/blocks.md ## Region blocks；scripts/build-docs.ts 按是否存在 meta.route.pageType 把条目写入相应章节。"
      },
      "card_unit": {
        "value": null,
        "status": "missing",
        "note": "官方文档没有 card 层字段；本条官方描述也不把它写成单卡或单元格，本草案不推断为卡片单元。"
      },
      "scene": {
        "value": "movies",
        "status": "official",
        "citation": "官方描述原文写明 “three-column grid of 3:4 movie posters”。"
      },
      "routeable": {
        "value": false,
        "status": "official",
        "citation": "docs/blocks.md：只有 Page-type blocks “carry routing rules”；本条在 ## Region blocks，registry 无 meta.route.pageType；public/route-index.json 的 14 条 routes 不含本条。"
      },
      "data_contract": {
        "status": "official",
        "install_mode": "empty_feed",
        "install_mode_status": "official",
        "install_mode_citation": "docs/blocks.md ## What the kind column means；docs/llms.txt “A block without the marker takes required data props and ships empty.” / “(demo) marks a block with fixed baked-in content”.",
        "required_props_named_in_description": [
          "movies"
        ],
        "required_props_status": "official",
        "required_props_note": null,
        "optional_props_named_in_description": [],
        "optional_props_status": "missing",
        "props_in_official_docs_example": [
          "movies"
        ],
        "docs_example_is_bare_component": false,
        "children_take_required_data": null,
        "children_take_required_data_status": "missing",
        "schema": null,
        "schema_status": "missing",
        "schema_note": "未在官方文档给出可独立执行的 props schema（类型、必填/可选完整表、数据形状）。本草案不发明 schema。",
        "summary_zh": "官方 kind=component：安装为空并喂数据。官方描述点名必填标识符：movies。不把示例对象写成正式 schema。",
        "citation": "registry.json description 与 docs 字段；docs 即 skill/registry.md / docs/llms.txt 所说的 add 输出 contract。"
      },
      "aliases": {
        "value": [],
        "status": "official",
        "citation": "registry.json meta.aliases"
      },
      "official_description": {
        "value": "A section header plus a three-column grid of 3:4 movie posters with VIP corner badges, scores in the image scrim and one-line titles, replacing the legacy movie-grid-card block. The data is a required prop (movies); nothing is baked in, so an install feeds it instead of discarding it.",
        "status": "official",
        "citation": "registry.json description（docs/blocks.md 表格为同一描述的截断一行）"
      },
      "notes": "官方是 “section header plus a three-column grid”，名称含 card，粒度是货架而不是单卡。"
    },
    {
      "id": {
        "value": "music-recommended",
        "status": "official",
        "citation": "docs/blocks.md 表格；registry.json name"
      },
      "official_name": {
        "value": "Music Recommended",
        "status": "official",
        "citation": "registry.json title"
      },
      "kind": {
        "value": "component",
        "status": "official",
        "citation": "docs/blocks.md Kind 列；registry.json kind"
      },
      "demo_only": {
        "value": false,
        "status": "official",
        "citation": "与官方 kind=demo 同义。insights.md §4.6 要求给 page-type 逐条标 demo_only；本草案对所有 kind=demo（含 2 个 region demo）都标，不另造含义。"
      },
      "grain": {
        "value": "region",
        "status": "official",
        "citation": "docs/blocks.md ## Region blocks；scripts/build-docs.ts 按是否存在 meta.route.pageType 把条目写入相应章节。"
      },
      "card_unit": {
        "value": null,
        "status": "missing",
        "note": "官方文档没有 card 层字段；本条官方描述也不把它写成单卡或单元格，本草案不推断为卡片单元。"
      },
      "scene": {
        "value": "music",
        "status": "official",
        "citation": "官方描述原文： “The music home page's recommendation shelves”。"
      },
      "routeable": {
        "value": false,
        "status": "official",
        "citation": "docs/blocks.md：只有 Page-type blocks “carry routing rules”；本条在 ## Region blocks，registry 无 meta.route.pageType；public/route-index.json 的 14 条 routes 不含本条。"
      },
      "data_contract": {
        "status": "official",
        "install_mode": "empty_feed",
        "install_mode_status": "official",
        "install_mode_citation": "docs/blocks.md ## What the kind column means；docs/llms.txt “A block without the marker takes required data props and ships empty.” / “(demo) marks a block with fixed baked-in content”.",
        "required_props_named_in_description": [
          "shelves"
        ],
        "required_props_status": "official",
        "required_props_note": null,
        "optional_props_named_in_description": [],
        "optional_props_status": "missing",
        "props_in_official_docs_example": [
          "shelves"
        ],
        "docs_example_is_bare_component": false,
        "children_take_required_data": null,
        "children_take_required_data_status": "missing",
        "schema": null,
        "schema_status": "missing",
        "schema_note": "未在官方文档给出可独立执行的 props schema（类型、必填/可选完整表、数据形状）。本草案不发明 schema。",
        "summary_zh": "官方 kind=component：安装为空并喂数据。官方描述点名必填标识符：shelves。不把示例对象写成正式 schema。",
        "citation": "registry.json description 与 docs 字段；docs 即 skill/registry.md / docs/llms.txt 所说的 add 输出 contract。"
      },
      "aliases": {
        "value": [],
        "status": "official",
        "citation": "registry.json meta.aliases"
      },
      "official_description": {
        "value": "The music home page's recommendation shelves: sideways-scrolling cover cards with play heat, a chevron that wraps a shelf open, and a docked mini-player for the tapped card. The shelves are a required prop; nothing is baked in, so an install feeds it instead of discarding it.",
        "status": "official",
        "citation": "registry.json description（docs/blocks.md 表格为同一描述的截断一行）"
      },
      "notes": "按官方 kind、目录章节与（若有）描述中的必填 props 重标；不扩编。"
    },
    {
      "id": {
        "value": "music-search-completed-result-list",
        "status": "official",
        "citation": "docs/blocks.md 表格；registry.json name"
      },
      "official_name": {
        "value": "Music Search Completed Result List",
        "status": "official",
        "citation": "registry.json title"
      },
      "kind": {
        "value": "component",
        "status": "official",
        "citation": "docs/blocks.md Kind 列；registry.json kind"
      },
      "demo_only": {
        "value": false,
        "status": "official",
        "citation": "与官方 kind=demo 同义。insights.md §4.6 要求给 page-type 逐条标 demo_only；本草案对所有 kind=demo（含 2 个 region demo）都标，不另造含义。"
      },
      "grain": {
        "value": "region",
        "status": "official",
        "citation": "docs/blocks.md ## Region blocks；scripts/build-docs.ts 按是否存在 meta.route.pageType 把条目写入相应章节。"
      },
      "card_unit": {
        "value": null,
        "status": "missing",
        "note": "官方文档没有 card 层字段；本条官方描述也不把它写成单卡或单元格，本草案不推断为卡片单元。"
      },
      "scene": {
        "value": "music",
        "status": "official",
        "citation": "官方描述原文： “The committed-search result list of the music search page”。"
      },
      "routeable": {
        "value": false,
        "status": "official",
        "citation": "docs/blocks.md：只有 Page-type blocks “carry routing rules”；本条在 ## Region blocks，registry 无 meta.route.pageType；public/route-index.json 的 14 条 routes 不含本条。"
      },
      "data_contract": {
        "status": "official",
        "install_mode": "empty_feed",
        "install_mode_status": "official",
        "install_mode_citation": "docs/blocks.md ## What the kind column means；docs/llms.txt “A block without the marker takes required data props and ships empty.” / “(demo) marks a block with fixed baked-in content”.",
        "required_props_named_in_description": [
          "songs"
        ],
        "required_props_status": "official",
        "required_props_note": null,
        "optional_props_named_in_description": [],
        "optional_props_status": "missing",
        "props_in_official_docs_example": [
          "songs"
        ],
        "docs_example_is_bare_component": false,
        "children_take_required_data": null,
        "children_take_required_data_status": "missing",
        "schema": null,
        "schema_status": "missing",
        "schema_note": "未在官方文档给出可独立执行的 props schema（类型、必填/可选完整表、数据形状）。本草案不发明 schema。",
        "summary_zh": "官方 kind=component：安装为空并喂数据。官方描述点名必填标识符：songs。不把示例对象写成正式 schema。",
        "citation": "registry.json description 与 docs 字段；docs 即 skill/registry.md / docs/llms.txt 所说的 add 输出 contract。"
      },
      "aliases": {
        "value": [],
        "status": "official",
        "citation": "registry.json meta.aliases"
      },
      "official_description": {
        "value": "The committed-search result list of the music search page: a play-all header, song rows with VIP, original and downloaded markers, expandable more-versions rows, and a docked mini-player. The catalog is a required prop (songs, with per-row saved/expanded start flags); nothing is baked in, so an install feeds it instead of discarding it.",
        "status": "official",
        "citation": "registry.json description（docs/blocks.md 表格为同一描述的截断一行）"
      },
      "notes": "按官方 kind、目录章节与（若有）描述中的必填 props 重标；不扩编。"
    },
    {
      "id": {
        "value": "music-search-history",
        "status": "official",
        "citation": "docs/blocks.md 表格；registry.json name"
      },
      "official_name": {
        "value": "Music Search History",
        "status": "official",
        "citation": "registry.json title"
      },
      "kind": {
        "value": "component",
        "status": "official",
        "citation": "docs/blocks.md Kind 列；registry.json kind"
      },
      "demo_only": {
        "value": false,
        "status": "official",
        "citation": "与官方 kind=demo 同义。insights.md §4.6 要求给 page-type 逐条标 demo_only；本草案对所有 kind=demo（含 2 个 region demo）都标，不另造含义。"
      },
      "grain": {
        "value": "region",
        "status": "official",
        "citation": "docs/blocks.md ## Region blocks；scripts/build-docs.ts 按是否存在 meta.route.pageType 把条目写入相应章节。"
      },
      "card_unit": {
        "value": null,
        "status": "missing",
        "note": "官方文档没有 card 层字段；本条官方描述也不把它写成单卡或单元格，本草案不推断为卡片单元。"
      },
      "scene": {
        "value": "music",
        "status": "official",
        "citation": "官方描述原文： “The music search page's history section”。"
      },
      "routeable": {
        "value": false,
        "status": "official",
        "citation": "docs/blocks.md：只有 Page-type blocks “carry routing rules”；本条在 ## Region blocks，registry 无 meta.route.pageType；public/route-index.json 的 14 条 routes 不含本条。"
      },
      "data_contract": {
        "status": "official",
        "install_mode": "empty_feed",
        "install_mode_status": "official",
        "install_mode_citation": "docs/blocks.md ## What the kind column means；docs/llms.txt “A block without the marker takes required data props and ships empty.” / “(demo) marks a block with fixed baked-in content”.",
        "required_props_named_in_description": [
          "history"
        ],
        "required_props_status": "official",
        "required_props_note": null,
        "optional_props_named_in_description": [],
        "optional_props_status": "missing",
        "props_in_official_docs_example": [
          "history"
        ],
        "docs_example_is_bare_component": false,
        "children_take_required_data": null,
        "children_take_required_data_status": "missing",
        "schema": null,
        "schema_status": "missing",
        "schema_note": "未在官方文档给出可独立执行的 props schema（类型、必填/可选完整表、数据形状）。本草案不发明 schema。",
        "summary_zh": "官方 kind=component：安装为空并喂数据。官方描述点名必填标识符：history。不把示例对象写成正式 schema。",
        "citation": "registry.json description 与 docs 字段；docs 即 skill/registry.md / docs/llms.txt 所说的 add 输出 contract。"
      },
      "aliases": {
        "value": [],
        "status": "official",
        "citation": "registry.json meta.aliases"
      },
      "official_description": {
        "value": "The music search page's history section: a live search field, a chip cloud of past terms with a wrap-open expand control, and a clear-all action that falls back to an empty state. The history is a required prop; nothing is baked in, so an install feeds it instead of discarding it.",
        "status": "official",
        "citation": "registry.json description（docs/blocks.md 表格为同一描述的截断一行）"
      },
      "notes": "按官方 kind、目录章节与（若有）描述中的必填 props 重标；不扩编。"
    },
    {
      "id": {
        "value": "music-searching-result-list",
        "status": "official",
        "citation": "docs/blocks.md 表格；registry.json name"
      },
      "official_name": {
        "value": "Music Searching Result List",
        "status": "official",
        "citation": "registry.json title"
      },
      "kind": {
        "value": "component",
        "status": "official",
        "citation": "docs/blocks.md Kind 列；registry.json kind"
      },
      "demo_only": {
        "value": false,
        "status": "official",
        "citation": "与官方 kind=demo 同义。insights.md §4.6 要求给 page-type 逐条标 demo_only；本草案对所有 kind=demo（含 2 个 region demo）都标，不另造含义。"
      },
      "grain": {
        "value": "region",
        "status": "official",
        "citation": "docs/blocks.md ## Region blocks；scripts/build-docs.ts 按是否存在 meta.route.pageType 把条目写入相应章节。"
      },
      "card_unit": {
        "value": null,
        "status": "missing",
        "note": "官方文档没有 card 层字段；本条官方描述也不把它写成单卡或单元格，本草案不推断为卡片单元。"
      },
      "scene": {
        "value": "music",
        "status": "official",
        "citation": "官方描述原文： “The live suggestion list of the music search page”。"
      },
      "routeable": {
        "value": false,
        "status": "official",
        "citation": "docs/blocks.md：只有 Page-type blocks “carry routing rules”；本条在 ## Region blocks，registry 无 meta.route.pageType；public/route-index.json 的 14 条 routes 不含本条。"
      },
      "data_contract": {
        "status": "official",
        "install_mode": "empty_feed",
        "install_mode_status": "official",
        "install_mode_citation": "docs/blocks.md ## What the kind column means；docs/llms.txt “A block without the marker takes required data props and ships empty.” / “(demo) marks a block with fixed baked-in content”.",
        "required_props_named_in_description": [
          "songs"
        ],
        "required_props_status": "official",
        "required_props_note": null,
        "optional_props_named_in_description": [],
        "optional_props_status": "missing",
        "props_in_official_docs_example": [
          "songs"
        ],
        "docs_example_is_bare_component": false,
        "children_take_required_data": null,
        "children_take_required_data_status": "missing",
        "schema": null,
        "schema_status": "missing",
        "schema_note": "未在官方文档给出可独立执行的 props schema（类型、必填/可选完整表、数据形状）。本草案不发明 schema。",
        "summary_zh": "官方 kind=component：安装为空并喂数据。官方描述点名必填标识符：songs。不把示例对象写成正式 schema。",
        "citation": "registry.json description 与 docs 字段；docs 即 skill/registry.md / docs/llms.txt 所说的 add 输出 contract。"
      },
      "aliases": {
        "value": [],
        "status": "official",
        "citation": "registry.json meta.aliases"
      },
      "official_description": {
        "value": "The live suggestion list of the music search page: typing in the search field re-filters song rows with VIP and spatial-audio badges, like and queue toggles, and a docked mini-player for the tapped row. The catalog is a required prop (songs, with a per-row liked start flag); nothing is baked in, so an install feeds it instead of discarding it.",
        "status": "official",
        "citation": "registry.json description（docs/blocks.md 表格为同一描述的截断一行）"
      },
      "notes": "按官方 kind、目录章节与（若有）描述中的必填 props 重标；不扩编。"
    },
    {
      "id": {
        "value": "my-game-review",
        "status": "official",
        "citation": "docs/blocks.md 表格；registry.json name"
      },
      "official_name": {
        "value": "My Game Review",
        "status": "official",
        "citation": "registry.json title"
      },
      "kind": {
        "value": "component",
        "status": "official",
        "citation": "docs/blocks.md Kind 列；registry.json kind"
      },
      "demo_only": {
        "value": false,
        "status": "official",
        "citation": "与官方 kind=demo 同义。insights.md §4.6 要求给 page-type 逐条标 demo_only；本草案对所有 kind=demo（含 2 个 region demo）都标，不另造含义。"
      },
      "grain": {
        "value": "region",
        "status": "official",
        "citation": "docs/blocks.md ## Region blocks；scripts/build-docs.ts 按是否存在 meta.route.pageType 把条目写入相应章节。"
      },
      "card_unit": {
        "value": null,
        "status": "missing",
        "note": "官方文档没有 card 层字段；本条官方描述也不把它写成单卡或单元格，本草案不推断为卡片单元。"
      },
      "scene": {
        "value": "games",
        "status": "official",
        "citation": "官方描述原文： “A horizontally scrolling row of game-update cards”。"
      },
      "routeable": {
        "value": false,
        "status": "official",
        "citation": "docs/blocks.md：只有 Page-type blocks “carry routing rules”；本条在 ## Region blocks，registry 无 meta.route.pageType；public/route-index.json 的 14 条 routes 不含本条。"
      },
      "data_contract": {
        "status": "official",
        "install_mode": "empty_feed",
        "install_mode_status": "official",
        "install_mode_citation": "docs/blocks.md ## What the kind column means；docs/llms.txt “A block without the marker takes required data props and ships empty.” / “(demo) marks a block with fixed baked-in content”.",
        "required_props_named_in_description": [
          "games"
        ],
        "required_props_status": "official",
        "required_props_note": null,
        "optional_props_named_in_description": [],
        "optional_props_status": "missing",
        "props_in_official_docs_example": [
          "games"
        ],
        "docs_example_is_bare_component": false,
        "children_take_required_data": null,
        "children_take_required_data_status": "missing",
        "schema": null,
        "schema_status": "missing",
        "schema_note": "未在官方文档给出可独立执行的 props schema（类型、必填/可选完整表、数据形状）。本草案不发明 schema。",
        "summary_zh": "官方 kind=component：安装为空并喂数据。官方描述点名必填标识符：games。不把示例对象写成正式 schema。",
        "citation": "registry.json description 与 docs 字段；docs 即 skill/registry.md / docs/llms.txt 所说的 add 输出 contract。"
      },
      "aliases": {
        "value": [],
        "status": "official",
        "citation": "registry.json meta.aliases"
      },
      "official_description": {
        "value": "A horizontally scrolling row of game-update cards — announcement tag, cover, official-link line and a community toggle per card — replacing the legacy my-game-review block. The games are a required prop; nothing is baked in, so an install feeds it instead of discarding it.",
        "status": "official",
        "citation": "registry.json description（docs/blocks.md 表格为同一描述的截断一行）"
      },
      "notes": "按官方 kind、目录章节与（若有）描述中的必填 props 重标；不扩编。"
    },
    {
      "id": {
        "value": "my-movie-review",
        "status": "official",
        "citation": "docs/blocks.md 表格；registry.json name"
      },
      "official_name": {
        "value": "My Movie Review",
        "status": "official",
        "citation": "registry.json title"
      },
      "kind": {
        "value": "component",
        "status": "official",
        "citation": "docs/blocks.md Kind 列；registry.json kind"
      },
      "demo_only": {
        "value": false,
        "status": "official",
        "citation": "与官方 kind=demo 同义。insights.md §4.6 要求给 page-type 逐条标 demo_only；本草案对所有 kind=demo（含 2 个 region demo）都标，不另造含义。"
      },
      "grain": {
        "value": "region",
        "status": "official",
        "citation": "docs/blocks.md ## Region blocks；scripts/build-docs.ts 按是否存在 meta.route.pageType 把条目写入相应章节。"
      },
      "card_unit": {
        "value": null,
        "status": "missing",
        "note": "官方文档没有 card 层字段；本条官方描述也不把它写成单卡或单元格，本草案不推断为卡片单元。"
      },
      "scene": {
        "value": "movies",
        "status": "official",
        "citation": "官方 title 为 My Movie Review；描述为 continue-watching section 与 poster cards。"
      },
      "routeable": {
        "value": false,
        "status": "official",
        "citation": "docs/blocks.md：只有 Page-type blocks “carry routing rules”；本条在 ## Region blocks，registry 无 meta.route.pageType；public/route-index.json 的 14 条 routes 不含本条。"
      },
      "data_contract": {
        "status": "official",
        "install_mode": "empty_feed",
        "install_mode_status": "official",
        "install_mode_citation": "docs/blocks.md ## What the kind column means；docs/llms.txt “A block without the marker takes required data props and ships empty.” / “(demo) marks a block with fixed baked-in content”.",
        "required_props_named_in_description": [
          "movies"
        ],
        "required_props_status": "official",
        "required_props_note": null,
        "optional_props_named_in_description": [],
        "optional_props_status": "missing",
        "props_in_official_docs_example": [
          "movies"
        ],
        "docs_example_is_bare_component": false,
        "children_take_required_data": null,
        "children_take_required_data_status": "missing",
        "schema": null,
        "schema_status": "missing",
        "schema_note": "未在官方文档给出可独立执行的 props schema（类型、必填/可选完整表、数据形状）。本草案不发明 schema。",
        "summary_zh": "官方 kind=component：安装为空并喂数据。官方描述点名必填标识符：movies。不把示例对象写成正式 schema。",
        "citation": "registry.json description 与 docs 字段；docs 即 skill/registry.md / docs/llms.txt 所说的 add 输出 contract。"
      },
      "aliases": {
        "value": [],
        "status": "official",
        "citation": "registry.json meta.aliases"
      },
      "official_description": {
        "value": "A continue-watching section: a header with a More/Less toggle over a horizontal strip of 16:9 poster cards with watching badges, replacing the legacy my-movie-review block. The movies are a required prop; nothing is baked in, so an install feeds it instead of discarding it.",
        "status": "official",
        "citation": "registry.json description（docs/blocks.md 表格为同一描述的截断一行）"
      },
      "notes": "按官方 kind、目录章节与（若有）描述中的必填 props 重标；不扩编。"
    },
    {
      "id": {
        "value": "new-book-preview",
        "status": "official",
        "citation": "docs/blocks.md 表格；registry.json name"
      },
      "official_name": {
        "value": "New Book Preview",
        "status": "official",
        "citation": "registry.json title"
      },
      "kind": {
        "value": "component",
        "status": "official",
        "citation": "docs/blocks.md Kind 列；registry.json kind"
      },
      "demo_only": {
        "value": false,
        "status": "official",
        "citation": "与官方 kind=demo 同义。insights.md §4.6 要求给 page-type 逐条标 demo_only；本草案对所有 kind=demo（含 2 个 region demo）都标，不另造含义。"
      },
      "grain": {
        "value": "region",
        "status": "official",
        "citation": "docs/blocks.md ## Region blocks；scripts/build-docs.ts 按是否存在 meta.route.pageType 把条目写入相应章节。"
      },
      "card_unit": {
        "value": null,
        "status": "missing",
        "note": "官方文档没有 card 层字段；本条官方描述也不把它写成单卡或单元格，本草案不推断为卡片单元。"
      },
      "scene": {
        "value": "books",
        "status": "official",
        "citation": "官方描述原文： “A new-book shelf”。"
      },
      "routeable": {
        "value": false,
        "status": "official",
        "citation": "docs/blocks.md：只有 Page-type blocks “carry routing rules”；本条在 ## Region blocks，registry 无 meta.route.pageType；public/route-index.json 的 14 条 routes 不含本条。"
      },
      "data_contract": {
        "status": "official",
        "install_mode": "empty_feed",
        "install_mode_status": "official",
        "install_mode_citation": "docs/blocks.md ## What the kind column means；docs/llms.txt “A block without the marker takes required data props and ships empty.” / “(demo) marks a block with fixed baked-in content”.",
        "required_props_named_in_description": [
          "books"
        ],
        "required_props_status": "official",
        "required_props_note": null,
        "optional_props_named_in_description": [],
        "optional_props_status": "missing",
        "props_in_official_docs_example": [
          "books",
          "moreBooks"
        ],
        "docs_example_is_bare_component": false,
        "children_take_required_data": null,
        "children_take_required_data_status": "missing",
        "schema": null,
        "schema_status": "missing",
        "schema_note": "未在官方文档给出可独立执行的 props schema（类型、必填/可选完整表、数据形状）。本草案不发明 schema。",
        "summary_zh": "官方 kind=component：安装为空并喂数据。官方描述点名必填标识符：books。官方 docs 示例中还出现但未声明是否必填：moreBooks。不把示例对象写成正式 schema。",
        "citation": "registry.json description 与 docs 字段；docs 即 skill/registry.md / docs/llms.txt 所说的 add 输出 contract。"
      },
      "aliases": {
        "value": [],
        "status": "official",
        "citation": "registry.json meta.aliases"
      },
      "official_description": {
        "value": "A new-book shelf with a section header, a More action and a horizontally scrolling row of 3:4 book covers, replacing the legacy new-book-preview block. The books are a required prop; nothing is baked in, so an install feeds it instead of discarding it.",
        "status": "official",
        "citation": "registry.json description（docs/blocks.md 表格为同一描述的截断一行）"
      },
      "notes": "官方描述只点名 books 为必填；docs 示例另有 moreBooks，未声明是否必填，不把它升格为必填。"
    },
    {
      "id": {
        "value": "playlist-section-card",
        "status": "official",
        "citation": "docs/blocks.md 表格；registry.json name"
      },
      "official_name": {
        "value": "Playlist Section Card",
        "status": "official",
        "citation": "registry.json title"
      },
      "kind": {
        "value": "component",
        "status": "official",
        "citation": "docs/blocks.md Kind 列；registry.json kind"
      },
      "demo_only": {
        "value": false,
        "status": "official",
        "citation": "与官方 kind=demo 同义。insights.md §4.6 要求给 page-type 逐条标 demo_only；本草案对所有 kind=demo（含 2 个 region demo）都标，不另造含义。"
      },
      "grain": {
        "value": "region",
        "status": "official",
        "citation": "docs/blocks.md ## Region blocks；scripts/build-docs.ts 按是否存在 meta.route.pageType 把条目写入相应章节。"
      },
      "card_unit": {
        "value": null,
        "status": "missing",
        "note": "官方文档没有 card 层字段；本条官方描述也不把它写成单卡或单元格，本草案不推断为卡片单元。"
      },
      "scene": {
        "value": "music",
        "status": "inferred",
        "citation": "官方描述写的是 playlist section card，未出现 music 一词；按歌单/播放列表推断为 music，不写成官方 scene。"
      },
      "routeable": {
        "value": false,
        "status": "official",
        "citation": "docs/blocks.md：只有 Page-type blocks “carry routing rules”；本条在 ## Region blocks，registry 无 meta.route.pageType；public/route-index.json 的 14 条 routes 不含本条。"
      },
      "data_contract": {
        "status": "official",
        "install_mode": "empty_feed",
        "install_mode_status": "official",
        "install_mode_citation": "docs/blocks.md ## What the kind column means；docs/llms.txt “A block without the marker takes required data props and ships empty.” / “(demo) marks a block with fixed baked-in content”.",
        "required_props_named_in_description": [
          "playlists",
          "favouritesCount"
        ],
        "required_props_status": "official",
        "required_props_note": null,
        "optional_props_named_in_description": [],
        "optional_props_status": "missing",
        "props_in_official_docs_example": [
          "favouritesCount",
          "playlists"
        ],
        "docs_example_is_bare_component": false,
        "children_take_required_data": null,
        "children_take_required_data_status": "missing",
        "schema": null,
        "schema_status": "missing",
        "schema_note": "未在官方文档给出可独立执行的 props schema（类型、必填/可选完整表、数据形状）。本草案不发明 schema。",
        "summary_zh": "官方 kind=component：安装为空并喂数据。官方描述点名必填标识符：playlists, favouritesCount。不把示例对象写成正式 schema。",
        "citation": "registry.json description 与 docs 字段；docs 即 skill/registry.md / docs/llms.txt 所说的 add 输出 contract。"
      },
      "aliases": {
        "value": [],
        "status": "official",
        "citation": "registry.json meta.aliases"
      },
      "official_description": {
        "value": "A playlist section card with a count header, add and sort actions, cover rows that mark the current playlist, and a view-all footer that expands the preview, replacing the legacy playlist-section-card block. The data is required props (playlists + favouritesCount — the header's created count derives from the rows, the favourites count is the card-level fact); nothing is baked in, so an install feeds it instead of discarding it.",
        "status": "official",
        "citation": "registry.json description（docs/blocks.md 表格为同一描述的截断一行）"
      },
      "notes": "官方称为 section card，含列表与页脚展开，按货架/区域理解，不标 card_unit。"
    },
    {
      "id": {
        "value": "profile-header",
        "status": "official",
        "citation": "docs/blocks.md 表格；registry.json name"
      },
      "official_name": {
        "value": "Profile Header",
        "status": "official",
        "citation": "registry.json title"
      },
      "kind": {
        "value": "component",
        "status": "official",
        "citation": "docs/blocks.md Kind 列；registry.json kind"
      },
      "demo_only": {
        "value": false,
        "status": "official",
        "citation": "与官方 kind=demo 同义。insights.md §4.6 要求给 page-type 逐条标 demo_only；本草案对所有 kind=demo（含 2 个 region demo）都标，不另造含义。"
      },
      "grain": {
        "value": "region",
        "status": "official",
        "citation": "docs/blocks.md ## Region blocks；scripts/build-docs.ts 按是否存在 meta.route.pageType 把条目写入相应章节。"
      },
      "card_unit": {
        "value": false,
        "status": "official",
        "citation": "registry.json / docs/blocks.md 描述原文： “A bare row on the page canvas, not a card.”"
      },
      "scene": {
        "value": "mine",
        "status": "official",
        "citation": "官方描述原文： “The profile header at the top of a mine page”。沿用官方 “mine” 用词。"
      },
      "routeable": {
        "value": false,
        "status": "official",
        "citation": "docs/blocks.md：只有 Page-type blocks “carry routing rules”；本条在 ## Region blocks，registry 无 meta.route.pageType；public/route-index.json 的 14 条 routes 不含本条。"
      },
      "data_contract": {
        "status": "official",
        "install_mode": "empty_feed",
        "install_mode_status": "official",
        "install_mode_citation": "docs/blocks.md ## What the kind column means；docs/llms.txt “A block without the marker takes required data props and ships empty.” / “(demo) marks a block with fixed baked-in content”.",
        "required_props_named_in_description": [
          "name",
          "avatar"
        ],
        "required_props_status": "official",
        "required_props_note": null,
        "optional_props_named_in_description": [
          "action"
        ],
        "optional_props_status": "official",
        "props_in_official_docs_example": [
          "action",
          "avatar",
          "description",
          "name"
        ],
        "docs_example_is_bare_component": false,
        "children_take_required_data": null,
        "children_take_required_data_status": "missing",
        "schema": null,
        "schema_status": "missing",
        "schema_note": "未在官方文档给出可独立执行的 props schema（类型、必填/可选完整表、数据形状）。本草案不发明 schema。",
        "summary_zh": "官方 kind=component：安装为空并喂数据。官方描述点名必填标识符：name, avatar。官方描述点名可选或附加：action。官方 docs 示例中还出现但未声明是否必填：description。不把示例对象写成正式 schema。",
        "citation": "registry.json description 与 docs 字段；docs 即 skill/registry.md / docs/llms.txt 所说的 add 输出 contract。"
      },
      "aliases": {
        "value": [],
        "status": "official",
        "citation": "registry.json meta.aliases"
      },
      "official_description": {
        "value": "The profile header at the top of a mine page: the 56px avatar on the left, name and one secondary line (signature, id, membership) on the right, and an optional trailing action slot for the edit entry. A bare row on the page canvas, not a card. The data is a required prop (name, avatar); nothing is baked in, so an install feeds it instead of discarding it.",
        "status": "official",
        "citation": "registry.json description（docs/blocks.md 表格为同一描述的截断一行）"
      },
      "notes": "官方写明 “A bare row on the page canvas, not a card.” 故 card_unit 不作卡片单元标注；它仍可能细于典型 region（货架/列表区）。"
    },
    {
      "id": {
        "value": "quick-entry-card",
        "status": "official",
        "citation": "docs/blocks.md 表格；registry.json name"
      },
      "official_name": {
        "value": "Quick Entry Card",
        "status": "official",
        "citation": "registry.json title"
      },
      "kind": {
        "value": "component",
        "status": "official",
        "citation": "docs/blocks.md Kind 列；registry.json kind"
      },
      "demo_only": {
        "value": false,
        "status": "official",
        "citation": "与官方 kind=demo 同义。insights.md §4.6 要求给 page-type 逐条标 demo_only；本草案对所有 kind=demo（含 2 个 region demo）都标，不另造含义。"
      },
      "grain": {
        "value": "region",
        "status": "official",
        "citation": "docs/blocks.md ## Region blocks；scripts/build-docs.ts 按是否存在 meta.route.pageType 把条目写入相应章节。"
      },
      "card_unit": {
        "value": null,
        "status": "missing",
        "note": "官方文档没有 card 层字段；本条官方描述也不把它写成单卡或单元格，本草案不推断为卡片单元。"
      },
      "scene": {
        "value": "mine",
        "status": "official",
        "citation": "官方描述原文： “for the library surfaces of a ‘mine’ page”。"
      },
      "routeable": {
        "value": false,
        "status": "official",
        "citation": "docs/blocks.md：只有 Page-type blocks “carry routing rules”；本条在 ## Region blocks，registry 无 meta.route.pageType；public/route-index.json 的 14 条 routes 不含本条。"
      },
      "data_contract": {
        "status": "official",
        "install_mode": "empty_feed",
        "install_mode_status": "official",
        "install_mode_citation": "docs/blocks.md ## What the kind column means；docs/llms.txt “A block without the marker takes required data props and ships empty.” / “(demo) marks a block with fixed baked-in content”.",
        "required_props_named_in_description": [
          "entries"
        ],
        "required_props_status": "official",
        "required_props_note": null,
        "optional_props_named_in_description": [],
        "optional_props_status": "missing",
        "props_in_official_docs_example": [
          "entries"
        ],
        "docs_example_is_bare_component": false,
        "children_take_required_data": null,
        "children_take_required_data_status": "missing",
        "schema": null,
        "schema_status": "missing",
        "schema_note": "未在官方文档给出可独立执行的 props schema（类型、必填/可选完整表、数据形状）。本草案不发明 schema。",
        "summary_zh": "官方 kind=component：安装为空并喂数据。官方描述点名必填标识符：entries。不把示例对象写成正式 schema。",
        "citation": "registry.json description 与 docs 字段；docs 即 skill/registry.md / docs/llms.txt 所说的 add 输出 contract。"
      },
      "aliases": {
        "value": [],
        "status": "official",
        "citation": "registry.json meta.aliases"
      },
      "official_description": {
        "value": "A low card of horizontally scrollable shortcut entries — glyph, label and count — for the library surfaces of a \"mine\" page, replacing the legacy quick-entry-card block. The data is a required prop (entries); nothing is baked in, so an install feeds it instead of discarding it.",
        "status": "official",
        "citation": "registry.json description（docs/blocks.md 表格为同一描述的截断一行）"
      },
      "notes": "官方是 “A low card of horizontally scrollable shortcut entries”，短横滑入口区，不标 card_unit。"
    },
    {
      "id": {
        "value": "ranking-categories",
        "status": "official",
        "citation": "docs/blocks.md 表格；registry.json name"
      },
      "official_name": {
        "value": "Ranking Categories",
        "status": "official",
        "citation": "registry.json title"
      },
      "kind": {
        "value": "component",
        "status": "official",
        "citation": "docs/blocks.md Kind 列；registry.json kind"
      },
      "demo_only": {
        "value": false,
        "status": "official",
        "citation": "与官方 kind=demo 同义。insights.md §4.6 要求给 page-type 逐条标 demo_only；本草案对所有 kind=demo（含 2 个 region demo）都标，不另造含义。"
      },
      "grain": {
        "value": "region",
        "status": "official",
        "citation": "docs/blocks.md ## Region blocks；scripts/build-docs.ts 按是否存在 meta.route.pageType 把条目写入相应章节。"
      },
      "card_unit": {
        "value": null,
        "status": "missing",
        "note": "官方文档没有 card 层字段；本条官方描述也不把它写成单卡或单元格，本草案不推断为卡片单元。"
      },
      "scene": {
        "value": null,
        "status": "missing",
        "note": "未在官方文档出现。官方描述未命名产品表面（如 music / movies / books / games / cloud-services / settings / mobile-shell）。"
      },
      "routeable": {
        "value": false,
        "status": "official",
        "citation": "docs/blocks.md：只有 Page-type blocks “carry routing rules”；本条在 ## Region blocks，registry 无 meta.route.pageType；public/route-index.json 的 14 条 routes 不含本条。"
      },
      "data_contract": {
        "status": "official",
        "install_mode": "empty_feed",
        "install_mode_status": "official",
        "install_mode_citation": "docs/blocks.md ## What the kind column means；docs/llms.txt “A block without the marker takes required data props and ships empty.” / “(demo) marks a block with fixed baked-in content”.",
        "required_props_named_in_description": [
          "categories"
        ],
        "required_props_status": "official",
        "required_props_note": "官方描述写 “The categories and their charts are required props”，但 docs 示例的属性名是 categories 与 rankings。本草案只把 categories 记为描述点名的标识符；rankings 仅列为 docs 示例中出现的名称，不把 charts 发明成 prop 名。",
        "optional_props_named_in_description": [],
        "optional_props_status": "missing",
        "props_in_official_docs_example": [
          "categories",
          "rankings"
        ],
        "docs_example_is_bare_component": false,
        "children_take_required_data": null,
        "children_take_required_data_status": "missing",
        "schema": null,
        "schema_status": "missing",
        "schema_note": "未在官方文档给出可独立执行的 props schema（类型、必填/可选完整表、数据形状）。本草案不发明 schema。",
        "summary_zh": "官方 kind=component：安装为空并喂数据。官方描述点名必填标识符：categories。官方 docs 示例中还出现但未声明是否必填：rankings。官方描述写 “The categories and their charts are required props”，但 docs 示例的属性名是 categories 与 rankings。本草案只把 categories 记为描述点名的标识符；rankings 仅列为 docs 示例中出现的名称，不把 charts 发明成 prop 名。不把示例对象写成正式 schema。",
        "citation": "registry.json description 与 docs 字段；docs 即 skill/registry.md / docs/llms.txt 所说的 add 输出 contract。"
      },
      "aliases": {
        "value": [],
        "status": "official",
        "citation": "registry.json meta.aliases"
      },
      "official_description": {
        "value": "A ranking switcher where a chips tab bar picks the chart and a plain list shows that chart's ranked entries with leading rank numbers, replacing the legacy ranking-categories block. One business instance of the category-rail pattern — reach for category-rail when you want the general category-switch shape, including its vertical rail from 600px up. The categories and their charts are required props; nothing is baked in, so an install feeds it instead of discarding it.",
        "status": "official",
        "citation": "registry.json description（docs/blocks.md 表格为同一描述的截断一行）"
      },
      "notes": "官方写明 “One business instance of the category-rail pattern — reach for category-rail when you want the general category-switch shape”。未命名垂类产品表面。"
    },
    {
      "id": {
        "value": "ranking-chipstab",
        "status": "official",
        "citation": "docs/blocks.md 表格；registry.json name"
      },
      "official_name": {
        "value": "Ranking Chips Tab",
        "status": "official",
        "citation": "registry.json title"
      },
      "kind": {
        "value": "component",
        "status": "official",
        "citation": "docs/blocks.md Kind 列；registry.json kind"
      },
      "demo_only": {
        "value": false,
        "status": "official",
        "citation": "与官方 kind=demo 同义。insights.md §4.6 要求给 page-type 逐条标 demo_only；本草案对所有 kind=demo（含 2 个 region demo）都标，不另造含义。"
      },
      "grain": {
        "value": "region",
        "status": "official",
        "citation": "docs/blocks.md ## Region blocks；scripts/build-docs.ts 按是否存在 meta.route.pageType 把条目写入相应章节。"
      },
      "card_unit": {
        "value": null,
        "status": "missing",
        "note": "官方文档没有 card 层字段；本条官方描述也不把它写成单卡或单元格，本草案不推断为卡片单元。"
      },
      "scene": {
        "value": null,
        "status": "missing",
        "note": "未在官方文档出现。官方描述未命名产品表面（如 music / movies / books / games / cloud-services / settings / mobile-shell）。"
      },
      "routeable": {
        "value": false,
        "status": "official",
        "citation": "docs/blocks.md：只有 Page-type blocks “carry routing rules”；本条在 ## Region blocks，registry 无 meta.route.pageType；public/route-index.json 的 14 条 routes 不含本条。"
      },
      "data_contract": {
        "status": "official",
        "install_mode": "empty_feed",
        "install_mode_status": "official",
        "install_mode_citation": "docs/blocks.md ## What the kind column means；docs/llms.txt “A block without the marker takes required data props and ships empty.” / “(demo) marks a block with fixed baked-in content”.",
        "required_props_named_in_description": [
          "categories",
          "charts"
        ],
        "required_props_status": "official",
        "required_props_note": null,
        "optional_props_named_in_description": [],
        "optional_props_status": "missing",
        "props_in_official_docs_example": [
          "categories",
          "charts"
        ],
        "docs_example_is_bare_component": false,
        "children_take_required_data": null,
        "children_take_required_data_status": "missing",
        "schema": null,
        "schema_status": "missing",
        "schema_note": "未在官方文档给出可独立执行的 props schema（类型、必填/可选完整表、数据形状）。本草案不发明 schema。",
        "summary_zh": "官方 kind=component：安装为空并喂数据。官方描述点名必填标识符：categories, charts。不把示例对象写成正式 schema。",
        "citation": "registry.json description 与 docs 字段；docs 即 skill/registry.md / docs/llms.txt 所说的 add 输出 contract。"
      },
      "aliases": {
        "value": [
          "ranking-chipstab-phone"
        ],
        "status": "official",
        "citation": "registry.json meta.aliases"
      },
      "official_description": {
        "value": "A tab-switched ranking section — a chips tab bar over per-category ranked rows with a rank number, portrait poster, title/cast/year·genre stack and a follow button — replacing the legacy ranking-chipstab-phone block. The categories and their charts are required props; nothing is baked in, so an install feeds it instead of discarding it.",
        "status": "official",
        "citation": "registry.json description（docs/blocks.md 表格为同一描述的截断一行）"
      },
      "notes": "产品表面未在官方文档出现。"
    },
    {
      "id": {
        "value": "ranking-hotlist-topbanner",
        "status": "official",
        "citation": "docs/blocks.md 表格；registry.json name"
      },
      "official_name": {
        "value": "Ranking Hotlist Top Banner",
        "status": "official",
        "citation": "registry.json title"
      },
      "kind": {
        "value": "component",
        "status": "official",
        "citation": "docs/blocks.md Kind 列；registry.json kind"
      },
      "demo_only": {
        "value": false,
        "status": "official",
        "citation": "与官方 kind=demo 同义。insights.md §4.6 要求给 page-type 逐条标 demo_only；本草案对所有 kind=demo（含 2 个 region demo）都标，不另造含义。"
      },
      "grain": {
        "value": "region",
        "status": "official",
        "citation": "docs/blocks.md ## Region blocks；scripts/build-docs.ts 按是否存在 meta.route.pageType 把条目写入相应章节。"
      },
      "card_unit": {
        "value": true,
        "status": "inferred",
        "citation": "官方描述为 “A hot-list hero card”，单张热榜英雄卡。 官方目录没有 card 层，故不得写成官方 grain。"
      },
      "scene": {
        "value": null,
        "status": "missing",
        "note": "未在官方文档出现。官方描述未命名产品表面（如 music / movies / books / games / cloud-services / settings / mobile-shell）。"
      },
      "routeable": {
        "value": false,
        "status": "official",
        "citation": "docs/blocks.md：只有 Page-type blocks “carry routing rules”；本条在 ## Region blocks，registry 无 meta.route.pageType；public/route-index.json 的 14 条 routes 不含本条。"
      },
      "data_contract": {
        "status": "official",
        "install_mode": "empty_feed",
        "install_mode_status": "official",
        "install_mode_citation": "docs/blocks.md ## What the kind column means；docs/llms.txt “A block without the marker takes required data props and ships empty.” / “(demo) marks a block with fixed baked-in content”.",
        "required_props_named_in_description": [],
        "required_props_status": "official",
        "required_props_note": "官方描述写 “The hot lists are a required prop”，未给出标识符 lists；lists 仅来自官方 docs 示例。",
        "optional_props_named_in_description": [],
        "optional_props_status": "missing",
        "props_in_official_docs_example": [
          "lists"
        ],
        "docs_example_is_bare_component": false,
        "children_take_required_data": null,
        "children_take_required_data_status": "missing",
        "schema": null,
        "schema_status": "missing",
        "schema_note": "未在官方文档给出可独立执行的 props schema（类型、必填/可选完整表、数据形状）。本草案不发明 schema。",
        "summary_zh": "官方 kind=component：安装为空并喂数据。官方 docs 示例中还出现但未声明是否必填：lists。官方描述写 “The hot lists are a required prop”，未给出标识符 lists；lists 仅来自官方 docs 示例。不把示例对象写成正式 schema。",
        "citation": "registry.json description 与 docs 字段；docs 即 skill/registry.md / docs/llms.txt 所说的 add 输出 contract。"
      },
      "aliases": {
        "value": [],
        "status": "official",
        "citation": "registry.json meta.aliases"
      },
      "official_description": {
        "value": "A hot-list hero card: full-bleed header image under top and bottom scrims, a single back button, and a centred label, headline and description trio, replacing the legacy ranking-hotlist-topbanner. The hot lists are a required prop; nothing is baked in, so an install feeds it instead of discarding it.",
        "status": "official",
        "citation": "registry.json description（docs/blocks.md 表格为同一描述的截断一行）"
      },
      "notes": "官方称为 hot-list hero card，挂在 region 目录。"
    },
    {
      "id": {
        "value": "ranking-list",
        "status": "official",
        "citation": "docs/blocks.md 表格；registry.json name"
      },
      "official_name": {
        "value": "Ranking List",
        "status": "official",
        "citation": "registry.json title"
      },
      "kind": {
        "value": "component",
        "status": "official",
        "citation": "docs/blocks.md Kind 列；registry.json kind"
      },
      "demo_only": {
        "value": false,
        "status": "official",
        "citation": "与官方 kind=demo 同义。insights.md §4.6 要求给 page-type 逐条标 demo_only；本草案对所有 kind=demo（含 2 个 region demo）都标，不另造含义。"
      },
      "grain": {
        "value": "region",
        "status": "official",
        "citation": "docs/blocks.md ## Region blocks；scripts/build-docs.ts 按是否存在 meta.route.pageType 把条目写入相应章节。"
      },
      "card_unit": {
        "value": null,
        "status": "missing",
        "note": "官方文档没有 card 层字段；本条官方描述也不把它写成单卡或单元格，本草案不推断为卡片单元。"
      },
      "scene": {
        "value": null,
        "status": "missing",
        "note": "未在官方文档出现。官方描述未命名产品表面（如 music / movies / books / games / cloud-services / settings / mobile-shell）。"
      },
      "routeable": {
        "value": false,
        "status": "official",
        "citation": "docs/blocks.md：只有 Page-type blocks “carry routing rules”；本条在 ## Region blocks，registry 无 meta.route.pageType；public/route-index.json 的 14 条 routes 不含本条。"
      },
      "data_contract": {
        "status": "official",
        "install_mode": "empty_feed",
        "install_mode_status": "official",
        "install_mode_citation": "docs/blocks.md ## What the kind column means；docs/llms.txt “A block without the marker takes required data props and ships empty.” / “(demo) marks a block with fixed baked-in content”.",
        "required_props_named_in_description": [
          "entries"
        ],
        "required_props_status": "official",
        "required_props_note": null,
        "optional_props_named_in_description": [],
        "optional_props_status": "missing",
        "props_in_official_docs_example": [
          "entries"
        ],
        "docs_example_is_bare_component": false,
        "children_take_required_data": null,
        "children_take_required_data_status": "missing",
        "schema": null,
        "schema_status": "missing",
        "schema_note": "未在官方文档给出可独立执行的 props schema（类型、必填/可选完整表、数据形状）。本草案不发明 schema。",
        "summary_zh": "官方 kind=component：安装为空并喂数据。官方描述点名必填标识符：entries。不把示例对象写成正式 schema。",
        "citation": "registry.json description 与 docs 字段；docs 即 skill/registry.md / docs/llms.txt 所说的 add 输出 contract。"
      },
      "aliases": {
        "value": [
          "main-chart-03"
        ],
        "status": "official",
        "citation": "registry.json meta.aliases"
      },
      "official_description": {
        "value": "A ranked chart list with poster, three-line title/cast/meta stack and a follow button per row, replacing the legacy ranking-list block (MainChart03). The entries are a required prop; nothing is baked in, so an install feeds it instead of discarding it.",
        "status": "official",
        "citation": "registry.json description（docs/blocks.md 表格为同一描述的截断一行）"
      },
      "notes": "产品表面未在官方文档出现。"
    },
    {
      "id": {
        "value": "ranking-topbanner",
        "status": "official",
        "citation": "docs/blocks.md 表格；registry.json name"
      },
      "official_name": {
        "value": "Ranking Top Banner",
        "status": "official",
        "citation": "registry.json title"
      },
      "kind": {
        "value": "component",
        "status": "official",
        "citation": "docs/blocks.md Kind 列；registry.json kind"
      },
      "demo_only": {
        "value": false,
        "status": "official",
        "citation": "与官方 kind=demo 同义。insights.md §4.6 要求给 page-type 逐条标 demo_only；本草案对所有 kind=demo（含 2 个 region demo）都标，不另造含义。"
      },
      "grain": {
        "value": "region",
        "status": "official",
        "citation": "docs/blocks.md ## Region blocks；scripts/build-docs.ts 按是否存在 meta.route.pageType 把条目写入相应章节。"
      },
      "card_unit": {
        "value": null,
        "status": "missing",
        "note": "官方文档没有 card 层字段；本条官方描述也不把它写成单卡或单元格，本草案不推断为卡片单元。"
      },
      "scene": {
        "value": null,
        "status": "missing",
        "note": "未在官方文档出现。官方描述未命名产品表面（如 music / movies / books / games / cloud-services / settings / mobile-shell）。"
      },
      "routeable": {
        "value": false,
        "status": "official",
        "citation": "docs/blocks.md：只有 Page-type blocks “carry routing rules”；本条在 ## Region blocks，registry 无 meta.route.pageType；public/route-index.json 的 14 条 routes 不含本条。"
      },
      "data_contract": {
        "status": "official",
        "install_mode": "empty_feed",
        "install_mode_status": "official",
        "install_mode_citation": "docs/blocks.md ## What the kind column means；docs/llms.txt “A block without the marker takes required data props and ships empty.” / “(demo) marks a block with fixed baked-in content”.",
        "required_props_named_in_description": [
          "boards"
        ],
        "required_props_status": "official",
        "required_props_note": null,
        "optional_props_named_in_description": [],
        "optional_props_status": "missing",
        "props_in_official_docs_example": [
          "boards"
        ],
        "docs_example_is_bare_component": false,
        "children_take_required_data": null,
        "children_take_required_data_status": "missing",
        "schema": null,
        "schema_status": "missing",
        "schema_note": "未在官方文档给出可独立执行的 props schema（类型、必填/可选完整表、数据形状）。本草案不发明 schema。",
        "summary_zh": "官方 kind=component：安装为空并喂数据。官方描述点名必填标识符：boards。不把示例对象写成正式 schema。",
        "citation": "registry.json description 与 docs 字段；docs 即 skill/registry.md / docs/llms.txt 所说的 add 输出 contract。"
      },
      "aliases": {
        "value": [],
        "status": "official",
        "citation": "registry.json meta.aliases"
      },
      "official_description": {
        "value": "A ranking-page header: navigation bar with back and search actions over an illustration title — a heavy headline flanked by wheat-stalk decorations with a muted description line, replacing the legacy ranking-topbanner. The boards are a required prop; nothing is baked in, so an install feeds it instead of discarding it.",
        "status": "official",
        "citation": "registry.json description（docs/blocks.md 表格为同一描述的截断一行）"
      },
      "notes": "产品表面未在官方文档出现。"
    },
    {
      "id": {
        "value": "rating-card",
        "status": "official",
        "citation": "docs/blocks.md 表格；registry.json name"
      },
      "official_name": {
        "value": "Rating Card",
        "status": "official",
        "citation": "registry.json title"
      },
      "kind": {
        "value": "component",
        "status": "official",
        "citation": "docs/blocks.md Kind 列；registry.json kind"
      },
      "demo_only": {
        "value": false,
        "status": "official",
        "citation": "与官方 kind=demo 同义。insights.md §4.6 要求给 page-type 逐条标 demo_only；本草案对所有 kind=demo（含 2 个 region demo）都标，不另造含义。"
      },
      "grain": {
        "value": "region",
        "status": "official",
        "citation": "docs/blocks.md ## Region blocks；scripts/build-docs.ts 按是否存在 meta.route.pageType 把条目写入相应章节。"
      },
      "card_unit": {
        "value": true,
        "status": "inferred",
        "citation": "官方描述为 “An aggregate rating summary card”，单张评分汇总卡。 官方目录没有 card 层，故不得写成官方 grain。"
      },
      "scene": {
        "value": null,
        "status": "missing",
        "note": "未在官方文档出现。官方描述未命名产品表面（如 music / movies / books / games / cloud-services / settings / mobile-shell）。"
      },
      "routeable": {
        "value": false,
        "status": "official",
        "citation": "docs/blocks.md：只有 Page-type blocks “carry routing rules”；本条在 ## Region blocks，registry 无 meta.route.pageType；public/route-index.json 的 14 条 routes 不含本条。"
      },
      "data_contract": {
        "status": "official",
        "install_mode": "empty_feed",
        "install_mode_status": "official",
        "install_mode_citation": "docs/blocks.md ## What the kind column means；docs/llms.txt “A block without the marker takes required data props and ships empty.” / “(demo) marks a block with fixed baked-in content”.",
        "required_props_named_in_description": [
          "score",
          "ratingCount"
        ],
        "required_props_status": "official",
        "required_props_note": null,
        "optional_props_named_in_description": [],
        "optional_props_status": "missing",
        "props_in_official_docs_example": [
          "score",
          "ratingCount"
        ],
        "docs_example_is_bare_component": false,
        "children_take_required_data": null,
        "children_take_required_data_status": "missing",
        "schema": null,
        "schema_status": "missing",
        "schema_note": "未在官方文档给出可独立执行的 props schema（类型、必填/可选完整表、数据形状）。本草案不发明 schema。",
        "summary_zh": "官方 kind=component：安装为空并喂数据。官方描述点名必填标识符：score, ratingCount。不把示例对象写成正式 schema。",
        "citation": "registry.json description 与 docs 字段；docs 即 skill/registry.md / docs/llms.txt 所说的 add 输出 contract。"
      },
      "aliases": {
        "value": [],
        "status": "official",
        "citation": "registry.json meta.aliases"
      },
      "official_description": {
        "value": "An aggregate rating summary card — large score numeral, read-only star row and rater count — replacing the legacy rating-card block. The data is a required prop (score, ratingCount); nothing is baked in, so an install feeds it instead of discarding it.",
        "status": "official",
        "citation": "registry.json description（docs/blocks.md 表格为同一描述的截断一行）"
      },
      "notes": "单张评分汇总卡，挂在 region 目录。"
    },
    {
      "id": {
        "value": "rating-card-detailed",
        "status": "official",
        "citation": "docs/blocks.md 表格；registry.json name"
      },
      "official_name": {
        "value": "Rating Card Detailed",
        "status": "official",
        "citation": "registry.json title"
      },
      "kind": {
        "value": "component",
        "status": "official",
        "citation": "docs/blocks.md Kind 列；registry.json kind"
      },
      "demo_only": {
        "value": false,
        "status": "official",
        "citation": "与官方 kind=demo 同义。insights.md §4.6 要求给 page-type 逐条标 demo_only；本草案对所有 kind=demo（含 2 个 region demo）都标，不另造含义。"
      },
      "grain": {
        "value": "region",
        "status": "official",
        "citation": "docs/blocks.md ## Region blocks；scripts/build-docs.ts 按是否存在 meta.route.pageType 把条目写入相应章节。"
      },
      "card_unit": {
        "value": true,
        "status": "inferred",
        "citation": "官方描述为 “A detailed user-review card”，单张用户评价卡。 官方目录没有 card 层，故不得写成官方 grain。"
      },
      "scene": {
        "value": null,
        "status": "missing",
        "note": "未在官方文档出现。官方描述未命名产品表面（如 music / movies / books / games / cloud-services / settings / mobile-shell）。"
      },
      "routeable": {
        "value": false,
        "status": "official",
        "citation": "docs/blocks.md：只有 Page-type blocks “carry routing rules”；本条在 ## Region blocks，registry 无 meta.route.pageType；public/route-index.json 的 14 条 routes 不含本条。"
      },
      "data_contract": {
        "status": "official",
        "install_mode": "empty_feed",
        "install_mode_status": "official",
        "install_mode_citation": "docs/blocks.md ## What the kind column means；docs/llms.txt “A block without the marker takes required data props and ships empty.” / “(demo) marks a block with fixed baked-in content”.",
        "required_props_named_in_description": [
          "review"
        ],
        "required_props_status": "official",
        "required_props_note": null,
        "optional_props_named_in_description": [],
        "optional_props_status": "missing",
        "props_in_official_docs_example": [
          "review"
        ],
        "docs_example_is_bare_component": false,
        "children_take_required_data": null,
        "children_take_required_data_status": "missing",
        "schema": null,
        "schema_status": "missing",
        "schema_note": "未在官方文档给出可独立执行的 props schema（类型、必填/可选完整表、数据形状）。本草案不发明 schema。",
        "summary_zh": "官方 kind=component：安装为空并喂数据。官方描述点名必填标识符：review。不把示例对象写成正式 schema。",
        "citation": "registry.json description 与 docs 字段；docs 即 skill/registry.md / docs/llms.txt 所说的 add 输出 contract。"
      },
      "aliases": {
        "value": [],
        "status": "official",
        "citation": "registry.json meta.aliases"
      },
      "official_description": {
        "value": "A detailed user-review card — avatar header, compact star row, featured tag, review body, photos and date — replacing the legacy rating-card-detailed block. The data is a required prop (review); nothing is baked in, so an install feeds it instead of discarding it.",
        "status": "official",
        "citation": "registry.json description（docs/blocks.md 表格为同一描述的截断一行）"
      },
      "notes": "单张用户评价卡，挂在 region 目录。"
    },
    {
      "id": {
        "value": "recently-watching-grid-card",
        "status": "official",
        "citation": "docs/blocks.md 表格；registry.json name"
      },
      "official_name": {
        "value": "Recently Watching Grid Card",
        "status": "official",
        "citation": "registry.json title"
      },
      "kind": {
        "value": "component",
        "status": "official",
        "citation": "docs/blocks.md Kind 列；registry.json kind"
      },
      "demo_only": {
        "value": false,
        "status": "official",
        "citation": "与官方 kind=demo 同义。insights.md §4.6 要求给 page-type 逐条标 demo_only；本草案对所有 kind=demo（含 2 个 region demo）都标，不另造含义。"
      },
      "grain": {
        "value": "region",
        "status": "official",
        "citation": "docs/blocks.md ## Region blocks；scripts/build-docs.ts 按是否存在 meta.route.pageType 把条目写入相应章节。"
      },
      "card_unit": {
        "value": null,
        "status": "missing",
        "note": "官方文档没有 card 层字段；本条官方描述也不把它写成单卡或单元格，本草案不推断为卡片单元。"
      },
      "scene": {
        "value": null,
        "status": "missing",
        "note": "未在官方文档出现。官方描述未命名产品表面（如 music / movies / books / games / cloud-services / settings / mobile-shell）。"
      },
      "routeable": {
        "value": false,
        "status": "official",
        "citation": "docs/blocks.md：只有 Page-type blocks “carry routing rules”；本条在 ## Region blocks，registry 无 meta.route.pageType；public/route-index.json 的 14 条 routes 不含本条。"
      },
      "data_contract": {
        "status": "official",
        "install_mode": "empty_feed",
        "install_mode_status": "official",
        "install_mode_citation": "docs/blocks.md ## What the kind column means；docs/llms.txt “A block without the marker takes required data props and ships empty.” / “(demo) marks a block with fixed baked-in content”.",
        "required_props_named_in_description": [
          "inProgress",
          "finished"
        ],
        "required_props_status": "official",
        "required_props_note": null,
        "optional_props_named_in_description": [],
        "optional_props_status": "missing",
        "props_in_official_docs_example": [
          "inProgress",
          "finished"
        ],
        "docs_example_is_bare_component": false,
        "children_take_required_data": null,
        "children_take_required_data_status": "missing",
        "schema": null,
        "schema_status": "missing",
        "schema_note": "未在官方文档给出可独立执行的 props schema（类型、必填/可选完整表、数据形状）。本草案不发明 schema。",
        "summary_zh": "官方 kind=component：安装为空并喂数据。官方描述点名必填标识符：inProgress, finished。不把示例对象写成正式 schema。",
        "citation": "registry.json description 与 docs 字段；docs 即 skill/registry.md / docs/llms.txt 所说的 add 输出 contract。"
      },
      "aliases": {
        "value": [],
        "status": "official",
        "citation": "registry.json meta.aliases"
      },
      "official_description": {
        "value": "A card with a header action and a three-column grid of episode covers carrying corner badges, watch-progress bars and subtitles, replacing the legacy recently-watching-grid-card block. The data is a required prop (inProgress + finished shelves); nothing is baked in, so an install feeds it instead of discarding it.",
        "status": "official",
        "citation": "registry.json description（docs/blocks.md 表格为同一描述的截断一行）"
      },
      "notes": "官方是带页头动作的三列剧集封面格。未点名 movies 产品表面，不推断。名称含 card，粒度是货架。"
    },
    {
      "id": {
        "value": "recommended-new-books",
        "status": "official",
        "citation": "docs/blocks.md 表格；registry.json name"
      },
      "official_name": {
        "value": "Recommended New Books",
        "status": "official",
        "citation": "registry.json title"
      },
      "kind": {
        "value": "component",
        "status": "official",
        "citation": "docs/blocks.md Kind 列；registry.json kind"
      },
      "demo_only": {
        "value": false,
        "status": "official",
        "citation": "与官方 kind=demo 同义。insights.md §4.6 要求给 page-type 逐条标 demo_only；本草案对所有 kind=demo（含 2 个 region demo）都标，不另造含义。"
      },
      "grain": {
        "value": "region",
        "status": "official",
        "citation": "docs/blocks.md ## Region blocks；scripts/build-docs.ts 按是否存在 meta.route.pageType 把条目写入相应章节。"
      },
      "card_unit": {
        "value": null,
        "status": "missing",
        "note": "官方文档没有 card 层字段；本条官方描述也不把它写成单卡或单元格，本草案不推断为卡片单元。"
      },
      "scene": {
        "value": "books",
        "status": "official",
        "citation": "官方描述原文： “A recommended-books section”。"
      },
      "routeable": {
        "value": false,
        "status": "official",
        "citation": "docs/blocks.md：只有 Page-type blocks “carry routing rules”；本条在 ## Region blocks，registry 无 meta.route.pageType；public/route-index.json 的 14 条 routes 不含本条。"
      },
      "data_contract": {
        "status": "official",
        "install_mode": "empty_feed",
        "install_mode_status": "official",
        "install_mode_citation": "docs/blocks.md ## What the kind column means；docs/llms.txt “A block without the marker takes required data props and ships empty.” / “(demo) marks a block with fixed baked-in content”.",
        "required_props_named_in_description": [
          "books"
        ],
        "required_props_status": "official",
        "required_props_note": null,
        "optional_props_named_in_description": [],
        "optional_props_status": "missing",
        "props_in_official_docs_example": [
          "books",
          "moreBooks"
        ],
        "docs_example_is_bare_component": false,
        "children_take_required_data": null,
        "children_take_required_data_status": "missing",
        "schema": null,
        "schema_status": "missing",
        "schema_note": "未在官方文档给出可独立执行的 props schema（类型、必填/可选完整表、数据形状）。本草案不发明 schema。",
        "summary_zh": "官方 kind=component：安装为空并喂数据。官方描述点名必填标识符：books。官方 docs 示例中还出现但未声明是否必填：moreBooks。不把示例对象写成正式 schema。",
        "citation": "registry.json description 与 docs 字段；docs 即 skill/registry.md / docs/llms.txt 所说的 add 输出 contract。"
      },
      "aliases": {
        "value": [],
        "status": "official",
        "citation": "registry.json meta.aliases"
      },
      "official_description": {
        "value": "A recommended-books section with a two-line header and a vertical list of cover, title, author, star rating and reader count, replacing the legacy recommended-new-books block. The books are a required prop; nothing is baked in, so an install feeds it instead of discarding it.",
        "status": "official",
        "citation": "registry.json description（docs/blocks.md 表格为同一描述的截断一行）"
      },
      "notes": "官方描述只点名 books 为必填；docs 示例另有 moreBooks，未声明是否必填。"
    },
    {
      "id": {
        "value": "recommended-new-games",
        "status": "official",
        "citation": "docs/blocks.md 表格；registry.json name"
      },
      "official_name": {
        "value": "Recommended New Games",
        "status": "official",
        "citation": "registry.json title"
      },
      "kind": {
        "value": "component",
        "status": "official",
        "citation": "docs/blocks.md Kind 列；registry.json kind"
      },
      "demo_only": {
        "value": false,
        "status": "official",
        "citation": "与官方 kind=demo 同义。insights.md §4.6 要求给 page-type 逐条标 demo_only；本草案对所有 kind=demo（含 2 个 region demo）都标，不另造含义。"
      },
      "grain": {
        "value": "region",
        "status": "official",
        "citation": "docs/blocks.md ## Region blocks；scripts/build-docs.ts 按是否存在 meta.route.pageType 把条目写入相应章节。"
      },
      "card_unit": {
        "value": null,
        "status": "missing",
        "note": "官方文档没有 card 层字段；本条官方描述也不把它写成单卡或单元格，本草案不推断为卡片单元。"
      },
      "scene": {
        "value": "games",
        "status": "official",
        "citation": "官方描述原文： “A new-games section”。"
      },
      "routeable": {
        "value": false,
        "status": "official",
        "citation": "docs/blocks.md：只有 Page-type blocks “carry routing rules”；本条在 ## Region blocks，registry 无 meta.route.pageType；public/route-index.json 的 14 条 routes 不含本条。"
      },
      "data_contract": {
        "status": "official",
        "install_mode": "empty_feed",
        "install_mode_status": "official",
        "install_mode_citation": "docs/blocks.md ## What the kind column means；docs/llms.txt “A block without the marker takes required data props and ships empty.” / “(demo) marks a block with fixed baked-in content”.",
        "required_props_named_in_description": [
          "featured"
        ],
        "required_props_status": "official",
        "required_props_note": "官方描述写 “The featured card and the grid are required props”。featured 可视为描述中的标识；grid 在 docs 示例中的属性名是 games，不把 games 记为描述点名的标识符。",
        "optional_props_named_in_description": [],
        "optional_props_status": "missing",
        "props_in_official_docs_example": [
          "featured",
          "games"
        ],
        "docs_example_is_bare_component": false,
        "children_take_required_data": null,
        "children_take_required_data_status": "missing",
        "schema": null,
        "schema_status": "missing",
        "schema_note": "未在官方文档给出可独立执行的 props schema（类型、必填/可选完整表、数据形状）。本草案不发明 schema。",
        "summary_zh": "官方 kind=component：安装为空并喂数据。官方描述点名必填标识符：featured。官方 docs 示例中还出现但未声明是否必填：games。官方描述写 “The featured card and the grid are required props”。featured 可视为描述中的标识；grid 在 docs 示例中的属性名是 games，不把 games 记为描述点名的标识符。不把示例对象写成正式 schema。",
        "citation": "registry.json description 与 docs 字段；docs 即 skill/registry.md / docs/llms.txt 所说的 add 输出 contract。"
      },
      "aliases": {
        "value": [],
        "status": "official",
        "citation": "registry.json meta.aliases"
      },
      "official_description": {
        "value": "A new-games section with a square featured card (badge, editorial copy, play button) and a two-column grid of tall game cards with play-preview buttons, replacing the legacy recommended-new-games block. The featured card and the grid are required props; nothing is baked in, so an install feeds it instead of discarding it.",
        "status": "official",
        "citation": "registry.json description（docs/blocks.md 表格为同一描述的截断一行）"
      },
      "notes": "按官方 kind、目录章节与（若有）描述中的必填 props 重标；不扩编。"
    },
    {
      "id": {
        "value": "scroll-list",
        "status": "official",
        "citation": "docs/blocks.md 表格；registry.json name"
      },
      "official_name": {
        "value": "Scroll List",
        "status": "official",
        "citation": "registry.json title"
      },
      "kind": {
        "value": "component",
        "status": "official",
        "citation": "docs/blocks.md Kind 列；registry.json kind"
      },
      "demo_only": {
        "value": false,
        "status": "official",
        "citation": "与官方 kind=demo 同义。insights.md §4.6 要求给 page-type 逐条标 demo_only；本草案对所有 kind=demo（含 2 个 region demo）都标，不另造含义。"
      },
      "grain": {
        "value": "region",
        "status": "official",
        "citation": "docs/blocks.md ## Region blocks；scripts/build-docs.ts 按是否存在 meta.route.pageType 把条目写入相应章节。"
      },
      "card_unit": {
        "value": null,
        "status": "missing",
        "note": "官方文档没有 card 层字段；本条官方描述也不把它写成单卡或单元格，本草案不推断为卡片单元。"
      },
      "scene": {
        "value": null,
        "status": "missing",
        "note": "未在官方文档出现。官方描述未命名产品表面（如 music / movies / books / games / cloud-services / settings / mobile-shell）。"
      },
      "routeable": {
        "value": false,
        "status": "official",
        "citation": "docs/blocks.md：只有 Page-type blocks “carry routing rules”；本条在 ## Region blocks，registry 无 meta.route.pageType；public/route-index.json 的 14 条 routes 不含本条。"
      },
      "data_contract": {
        "status": "official",
        "install_mode": "empty_feed",
        "install_mode_status": "official",
        "install_mode_citation": "docs/blocks.md ## What the kind column means；docs/llms.txt “A block without the marker takes required data props and ships empty.” / “(demo) marks a block with fixed baked-in content”.",
        "required_props_named_in_description": [
          "artists"
        ],
        "required_props_status": "official",
        "required_props_note": null,
        "optional_props_named_in_description": [],
        "optional_props_status": "missing",
        "props_in_official_docs_example": [
          "artists"
        ],
        "docs_example_is_bare_component": false,
        "children_take_required_data": null,
        "children_take_required_data_status": "missing",
        "schema": null,
        "schema_status": "missing",
        "schema_note": "未在官方文档给出可独立执行的 props schema（类型、必填/可选完整表、数据形状）。本草案不发明 schema。",
        "summary_zh": "官方 kind=component：安装为空并喂数据。官方描述点名必填标识符：artists。不把示例对象写成正式 schema。",
        "citation": "registry.json description 与 docs 字段；docs 即 skill/registry.md / docs/llms.txt 所说的 add 输出 contract。"
      },
      "aliases": {
        "value": [],
        "status": "official",
        "citation": "registry.json meta.aliases"
      },
      "official_description": {
        "value": "An alphabetically grouped, bounded scroll list with sticky letter headers, hairline-divided avatar rows and an index-bar letter rail down the trailing edge that jumps to a section on tap or drag, replacing the legacy scroll-list block. The data is a required prop (artists); nothing is baked in, so an install feeds it instead of discarding it.",
        "status": "official",
        "citation": "registry.json description（docs/blocks.md 表格为同一描述的截断一行）"
      },
      "notes": "官方必填 prop 名为 artists，但描述是按字母分组的滚动列表，未命名产品表面。"
    },
    {
      "id": {
        "value": "search-results",
        "status": "official",
        "citation": "docs/blocks.md 表格；registry.json name"
      },
      "official_name": {
        "value": "Search Results",
        "status": "official",
        "citation": "registry.json title"
      },
      "kind": {
        "value": "component",
        "status": "official",
        "citation": "docs/blocks.md Kind 列；registry.json kind"
      },
      "demo_only": {
        "value": false,
        "status": "official",
        "citation": "与官方 kind=demo 同义。insights.md §4.6 要求给 page-type 逐条标 demo_only；本草案对所有 kind=demo（含 2 个 region demo）都标，不另造含义。"
      },
      "grain": {
        "value": "region",
        "status": "official",
        "citation": "docs/blocks.md ## Region blocks；scripts/build-docs.ts 按是否存在 meta.route.pageType 把条目写入相应章节。"
      },
      "card_unit": {
        "value": null,
        "status": "missing",
        "note": "官方文档没有 card 层字段；本条官方描述也不把它写成单卡或单元格，本草案不推断为卡片单元。"
      },
      "scene": {
        "value": "search",
        "status": "official",
        "citation": "官方描述原文： “The second search page”。结果数据在描述里称为 places。"
      },
      "routeable": {
        "value": false,
        "status": "official",
        "citation": "docs/blocks.md：只有 Page-type blocks “carry routing rules”；本条在 ## Region blocks，registry 无 meta.route.pageType；public/route-index.json 的 14 条 routes 不含本条。"
      },
      "data_contract": {
        "status": "official",
        "install_mode": "empty_feed",
        "install_mode_status": "official",
        "install_mode_citation": "docs/blocks.md ## What the kind column means；docs/llms.txt “A block without the marker takes required data props and ships empty.” / “(demo) marks a block with fixed baked-in content”.",
        "required_props_named_in_description": [
          "places"
        ],
        "required_props_status": "official",
        "required_props_note": null,
        "optional_props_named_in_description": [
          "defaultQuery",
          "saved"
        ],
        "optional_props_status": "official",
        "props_in_official_docs_example": [
          "defaultQuery",
          "places"
        ],
        "docs_example_is_bare_component": false,
        "children_take_required_data": null,
        "children_take_required_data_status": "missing",
        "schema": null,
        "schema_status": "missing",
        "schema_note": "未在官方文档给出可独立执行的 props schema（类型、必填/可选完整表、数据形状）。本草案不发明 schema。",
        "summary_zh": "官方 kind=component：安装为空并喂数据。官方描述点名必填标识符：places。官方描述点名可选或附加：defaultQuery, saved。不把示例对象写成正式 schema。",
        "citation": "registry.json description 与 docs 字段；docs 即 skill/registry.md / docs/llms.txt 所说的 add 输出 contract。"
      },
      "aliases": {
        "value": [
          "floating-search-second-page-phone"
        ],
        "status": "official",
        "citation": "registry.json meta.aliases"
      },
      "official_description": {
        "value": "The second search page: a floating bar of round back button, search panel and round scan button, riding over the result rows it filters, in four steps of the floating material ramp. The places are a required prop (with an optional defaultQuery and per-row saved flag); nothing is baked in, so an install feeds it instead of discarding it.",
        "status": "official",
        "citation": "registry.json description（docs/blocks.md 表格为同一描述的截断一行）"
      },
      "notes": "官方放在 Region 表，描述却是 “The second search page”。这是挂在 region 目录下、看起来像整页的 component 块；无 routing rules，不可被 ds.py route 选中。"
    },
    {
      "id": {
        "value": "semi-modal-sheet",
        "status": "official",
        "citation": "docs/blocks.md 表格；registry.json name"
      },
      "official_name": {
        "value": "Semi Modal Sheet",
        "status": "official",
        "citation": "registry.json title"
      },
      "kind": {
        "value": "component",
        "status": "official",
        "citation": "docs/blocks.md Kind 列；registry.json kind"
      },
      "demo_only": {
        "value": false,
        "status": "official",
        "citation": "与官方 kind=demo 同义。insights.md §4.6 要求给 page-type 逐条标 demo_only；本草案对所有 kind=demo（含 2 个 region demo）都标，不另造含义。"
      },
      "grain": {
        "value": "region",
        "status": "official",
        "citation": "docs/blocks.md ## Region blocks；scripts/build-docs.ts 按是否存在 meta.route.pageType 把条目写入相应章节。"
      },
      "card_unit": {
        "value": null,
        "status": "missing",
        "note": "官方文档没有 card 层字段；本条官方描述也不把它写成单卡或单元格，本草案不推断为卡片单元。"
      },
      "scene": {
        "value": null,
        "status": "missing",
        "note": "未在官方文档出现。官方描述未命名产品表面（如 music / movies / books / games / cloud-services / settings / mobile-shell）。"
      },
      "routeable": {
        "value": false,
        "status": "official",
        "citation": "docs/blocks.md：只有 Page-type blocks “carry routing rules”；本条在 ## Region blocks，registry 无 meta.route.pageType；public/route-index.json 的 14 条 routes 不含本条。"
      },
      "data_contract": {
        "status": "official",
        "install_mode": "empty_feed",
        "install_mode_status": "official",
        "install_mode_citation": "docs/blocks.md ## What the kind column means；docs/llms.txt “A block without the marker takes required data props and ships empty.” / “(demo) marks a block with fixed baked-in content”.",
        "required_props_named_in_description": [],
        "required_props_status": "missing",
        "required_props_note": null,
        "optional_props_named_in_description": [],
        "optional_props_status": "missing",
        "props_in_official_docs_example": [
          "defaultDetent",
          "open",
          "showClose",
          "title",
          "onOpenChange"
        ],
        "docs_example_is_bare_component": false,
        "children_take_required_data": null,
        "children_take_required_data_status": "missing",
        "schema": null,
        "schema_status": "missing",
        "schema_note": "未在官方文档给出可独立执行的 props schema（类型、必填/可选完整表、数据形状）。本草案不发明 schema。",
        "summary_zh": "官方 kind=component：按通则安装为空并喂数据。条目描述未点名必填 data props；下列名称仅来自官方 docs 示例（skill/registry.md 称 docs 为 add 打印的 contract），不把它们发明成必填清单：defaultDetent, open, showClose, title, onOpenChange。无正式 schema。",
        "citation": "registry.json description 与 docs 字段；docs 即 skill/registry.md / docs/llms.txt 所说的 add 输出 contract。"
      },
      "aliases": {
        "value": [],
        "status": "official",
        "citation": "registry.json meta.aliases"
      },
      "official_description": {
        "value": "The half-modal page panel: a Sheet pinned to the phone's edges with no left, right or bottom gap, 32px top corners, and three draggable stops at 149 / 434 / 748px on a 360x792 board, whose body scrolls a whole page of content inside the panel.",
        "status": "official",
        "citation": "registry.json description（docs/blocks.md 表格为同一描述的截断一行）"
      },
      "notes": "官方描述为 “The half-modal page panel”。挂在 region 目录，更像叠加层/页面面板，而不是 hero / rail / list section。docs 示例给出的是打开态与 detent 等配置，不是内容数据契约。"
    },
    {
      "id": {
        "value": "service-list-card",
        "status": "official",
        "citation": "docs/blocks.md 表格；registry.json name"
      },
      "official_name": {
        "value": "Service List Card",
        "status": "official",
        "citation": "registry.json title"
      },
      "kind": {
        "value": "component",
        "status": "official",
        "citation": "docs/blocks.md Kind 列；registry.json kind"
      },
      "demo_only": {
        "value": false,
        "status": "official",
        "citation": "与官方 kind=demo 同义。insights.md §4.6 要求给 page-type 逐条标 demo_only；本草案对所有 kind=demo（含 2 个 region demo）都标，不另造含义。"
      },
      "grain": {
        "value": "region",
        "status": "official",
        "citation": "docs/blocks.md ## Region blocks；scripts/build-docs.ts 按是否存在 meta.route.pageType 把条目写入相应章节。"
      },
      "card_unit": {
        "value": null,
        "status": "missing",
        "note": "官方文档没有 card 层字段；本条官方描述也不把它写成单卡或单元格，本草案不推断为卡片单元。"
      },
      "scene": {
        "value": null,
        "status": "missing",
        "note": "未在官方文档出现。官方描述未命名产品表面（如 music / movies / books / games / cloud-services / settings / mobile-shell）。"
      },
      "routeable": {
        "value": false,
        "status": "official",
        "citation": "docs/blocks.md：只有 Page-type blocks “carry routing rules”；本条在 ## Region blocks，registry 无 meta.route.pageType；public/route-index.json 的 14 条 routes 不含本条。"
      },
      "data_contract": {
        "status": "official",
        "install_mode": "empty_feed",
        "install_mode_status": "official",
        "install_mode_citation": "docs/blocks.md ## What the kind column means；docs/llms.txt “A block without the marker takes required data props and ships empty.” / “(demo) marks a block with fixed baked-in content”.",
        "required_props_named_in_description": [
          "rows"
        ],
        "required_props_status": "official",
        "required_props_note": null,
        "optional_props_named_in_description": [],
        "optional_props_status": "missing",
        "props_in_official_docs_example": [
          "rows"
        ],
        "docs_example_is_bare_component": false,
        "children_take_required_data": null,
        "children_take_required_data_status": "missing",
        "schema": null,
        "schema_status": "missing",
        "schema_note": "未在官方文档给出可独立执行的 props schema（类型、必填/可选完整表、数据形状）。本草案不发明 schema。",
        "summary_zh": "官方 kind=component：安装为空并喂数据。官方描述点名必填标识符：rows。不把示例对象写成正式 schema。",
        "citation": "registry.json description 与 docs 字段；docs 即 skill/registry.md / docs/llms.txt 所说的 add 输出 contract。"
      },
      "aliases": {
        "value": [],
        "status": "official",
        "citation": "registry.json meta.aliases"
      },
      "official_description": {
        "value": "A card of whole-row service entries — leading glyph, label, trailing value and chevron — whose rows clear their \"new\" dot once visited, replacing the legacy service-list-card block. The data is a required prop (rows); nothing is baked in, so an install feeds it instead of discarding it.",
        "status": "official",
        "citation": "registry.json description（docs/blocks.md 表格为同一描述的截断一行）"
      },
      "notes": "官方是 “A card of whole-row service entries”，卡片容器里的入口列表，不标 card_unit。"
    },
    {
      "id": {
        "value": "sheet-radio-setting",
        "status": "official",
        "citation": "docs/blocks.md 表格；registry.json name"
      },
      "official_name": {
        "value": "Sheet Radio Setting",
        "status": "official",
        "citation": "registry.json title"
      },
      "kind": {
        "value": "component",
        "status": "official",
        "citation": "docs/blocks.md Kind 列；registry.json kind"
      },
      "demo_only": {
        "value": false,
        "status": "official",
        "citation": "与官方 kind=demo 同义。insights.md §4.6 要求给 page-type 逐条标 demo_only；本草案对所有 kind=demo（含 2 个 region demo）都标，不另造含义。"
      },
      "grain": {
        "value": "region",
        "status": "official",
        "citation": "docs/blocks.md ## Region blocks；scripts/build-docs.ts 按是否存在 meta.route.pageType 把条目写入相应章节。"
      },
      "card_unit": {
        "value": null,
        "status": "missing",
        "note": "官方文档没有 card 层字段；本条官方描述也不把它写成单卡或单元格，本草案不推断为卡片单元。"
      },
      "scene": {
        "value": null,
        "status": "missing",
        "note": "未在官方文档出现。官方描述未命名产品表面（如 music / movies / books / games / cloud-services / settings / mobile-shell）。"
      },
      "routeable": {
        "value": false,
        "status": "official",
        "citation": "docs/blocks.md：只有 Page-type blocks “carry routing rules”；本条在 ## Region blocks，registry 无 meta.route.pageType；public/route-index.json 的 14 条 routes 不含本条。"
      },
      "data_contract": {
        "status": "official",
        "install_mode": "empty_feed",
        "install_mode_status": "official",
        "install_mode_citation": "docs/blocks.md ## What the kind column means；docs/llms.txt “A block without the marker takes required data props and ships empty.” / “(demo) marks a block with fixed baked-in content”.",
        "required_props_named_in_description": [],
        "required_props_status": "missing",
        "required_props_note": null,
        "optional_props_named_in_description": [],
        "optional_props_status": "missing",
        "props_in_official_docs_example": [
          "label",
          "description",
          "sheetTitle",
          "options",
          "value",
          "onValueChange"
        ],
        "docs_example_is_bare_component": false,
        "children_take_required_data": null,
        "children_take_required_data_status": "missing",
        "schema": null,
        "schema_status": "missing",
        "schema_note": "未在官方文档给出可独立执行的 props schema（类型、必填/可选完整表、数据形状）。本草案不发明 schema。",
        "summary_zh": "官方 kind=component：按通则安装为空并喂数据。条目描述未点名必填 data props；下列名称仅来自官方 docs 示例（skill/registry.md 称 docs 为 add 打印的 contract），不把它们发明成必填清单：label, description, sheetTitle, options, value, onValueChange。无正式 schema。",
        "citation": "registry.json description 与 docs 字段；docs 即 skill/registry.md / docs/llms.txt 所说的 add 输出 contract。"
      },
      "aliases": {
        "value": [],
        "status": "official",
        "citation": "registry.json meta.aliases"
      },
      "official_description": {
        "value": "A single-choice setting that opens its options in a half sheet: the row's summary, the sheet's radio group and the selected dot derive from one value (Plan-043 #154). RadioGroup's own dot is the indicator; an empty option set renders a readable empty state.",
        "status": "official",
        "citation": "registry.json description（docs/blocks.md 表格为同一描述的截断一行）"
      },
      "notes": "官方描述为打开半模态的单项设置。挂在 region 目录下的行级+sheet 单元。必填 props 未在描述中点名，只出现在官方 docs 示例里。"
    },
    {
      "id": {
        "value": "stat-summary",
        "status": "official",
        "citation": "docs/blocks.md 表格；registry.json name"
      },
      "official_name": {
        "value": "Stat Summary",
        "status": "official",
        "citation": "registry.json title"
      },
      "kind": {
        "value": "component",
        "status": "official",
        "citation": "docs/blocks.md Kind 列；registry.json kind"
      },
      "demo_only": {
        "value": false,
        "status": "official",
        "citation": "与官方 kind=demo 同义。insights.md §4.6 要求给 page-type 逐条标 demo_only；本草案对所有 kind=demo（含 2 个 region demo）都标，不另造含义。"
      },
      "grain": {
        "value": "region",
        "status": "official",
        "citation": "docs/blocks.md ## Region blocks；scripts/build-docs.ts 按是否存在 meta.route.pageType 把条目写入相应章节。"
      },
      "card_unit": {
        "value": null,
        "status": "missing",
        "note": "官方文档没有 card 层字段；本条官方描述也不把它写成单卡或单元格，本草案不推断为卡片单元。"
      },
      "scene": {
        "value": null,
        "status": "missing",
        "note": "未在官方文档出现。官方描述未命名产品表面（如 music / movies / books / games / cloud-services / settings / mobile-shell）。"
      },
      "routeable": {
        "value": false,
        "status": "official",
        "citation": "docs/blocks.md：只有 Page-type blocks “carry routing rules”；本条在 ## Region blocks，registry 无 meta.route.pageType；public/route-index.json 的 14 条 routes 不含本条。"
      },
      "data_contract": {
        "status": "official",
        "install_mode": "empty_feed",
        "install_mode_status": "official",
        "install_mode_citation": "docs/blocks.md ## What the kind column means；docs/llms.txt “A block without the marker takes required data props and ships empty.” / “(demo) marks a block with fixed baked-in content”.",
        "required_props_named_in_description": [
          "bare",
          "sharedCard",
          "independentCards",
          "joined",
          "gradient"
        ],
        "required_props_status": "official",
        "required_props_note": null,
        "optional_props_named_in_description": [],
        "optional_props_status": "missing",
        "props_in_official_docs_example": [
          "bare",
          "sharedCard",
          "independentCards",
          "joined",
          "gradient"
        ],
        "docs_example_is_bare_component": false,
        "children_take_required_data": null,
        "children_take_required_data_status": "missing",
        "schema": null,
        "schema_status": "missing",
        "schema_note": "未在官方文档给出可独立执行的 props schema（类型、必填/可选完整表、数据形状）。本草案不发明 schema。",
        "summary_zh": "官方 kind=component：安装为空并喂数据。官方描述点名必填标识符：bare, sharedCard, independentCards, joined, gradient。不把示例对象写成正式 schema。",
        "citation": "registry.json description 与 docs 字段；docs 即 skill/registry.md / docs/llms.txt 所说的 add 输出 contract。"
      },
      "aliases": {
        "value": [],
        "status": "official",
        "citation": "registry.json meta.aliases"
      },
      "official_description": {
        "value": "A day's metrics shown in five containers, with eight independent-card examples covering content slots, centred layout, top visual, bottom chart and a caller-positioned corner badge. The Stat content stays portable while the container changes. The data is a required prop (bare, sharedCard, independentCards, joined, gradient); nothing is baked in, so an install feeds it instead of discarding it.",
        "status": "official",
        "citation": "registry.json description（docs/blocks.md 表格为同一描述的截断一行）"
      },
      "notes": "官方描述为 “five containers, with eight independent-card examples”。必填 props 是五组数据（bare / sharedCard / independentCards / joined / gradient），形态接近示例矩阵，仍按官方 region 收录。"
    },
    {
      "id": {
        "value": "tab-stacks",
        "status": "official",
        "citation": "docs/blocks.md 表格；registry.json name"
      },
      "official_name": {
        "value": "Tab Stacks",
        "status": "official",
        "citation": "registry.json title"
      },
      "kind": {
        "value": "component",
        "status": "official",
        "citation": "docs/blocks.md Kind 列；registry.json kind"
      },
      "demo_only": {
        "value": false,
        "status": "official",
        "citation": "与官方 kind=demo 同义。insights.md §4.6 要求给 page-type 逐条标 demo_only；本草案对所有 kind=demo（含 2 个 region demo）都标，不另造含义。"
      },
      "grain": {
        "value": "region",
        "status": "official",
        "citation": "docs/blocks.md ## Region blocks；scripts/build-docs.ts 按是否存在 meta.route.pageType 把条目写入相应章节。"
      },
      "card_unit": {
        "value": null,
        "status": "missing",
        "note": "官方文档没有 card 层字段；本条官方描述也不把它写成单卡或单元格，本草案不推断为卡片单元。"
      },
      "scene": {
        "value": null,
        "status": "missing",
        "note": "未在官方文档出现。官方描述未命名产品表面（如 music / movies / books / games / cloud-services / settings / mobile-shell）。"
      },
      "routeable": {
        "value": false,
        "status": "official",
        "citation": "docs/blocks.md：只有 Page-type blocks “carry routing rules”；本条在 ## Region blocks，registry 无 meta.route.pageType；public/route-index.json 的 14 条 routes 不含本条。"
      },
      "data_contract": {
        "status": "official",
        "install_mode": "empty_feed",
        "install_mode_status": "official",
        "install_mode_citation": "docs/blocks.md ## What the kind column means；docs/llms.txt “A block without the marker takes required data props and ships empty.” / “(demo) marks a block with fixed baked-in content”.",
        "required_props_named_in_description": [],
        "required_props_status": "missing",
        "required_props_note": null,
        "optional_props_named_in_description": [],
        "optional_props_status": "missing",
        "props_in_official_docs_example": [
          "value",
          "tabs"
        ],
        "docs_example_is_bare_component": false,
        "children_take_required_data": null,
        "children_take_required_data_status": "missing",
        "schema": null,
        "schema_status": "missing",
        "schema_note": "未在官方文档给出可独立执行的 props schema（类型、必填/可选完整表、数据形状）。本草案不发明 schema。",
        "summary_zh": "官方 kind=component：按通则安装为空并喂数据。条目描述未点名必填 data props；下列名称仅来自官方 docs 示例（skill/registry.md 称 docs 为 add 打印的 contract），不把它们发明成必填清单：value, tabs。无正式 schema。",
        "citation": "registry.json description 与 docs 字段；docs 即 skill/registry.md / docs/llms.txt 所说的 add 输出 contract。"
      },
      "aliases": {
        "value": [],
        "status": "official",
        "citation": "registry.json meta.aliases"
      },
      "official_description": {
        "value": "One PageStack per tab, all kept alive: an inactive tab hides with hidden + inert instead of unmounting, so its stack level, uncontrolled form state and subscriptions survive the switch. Only the active stack reports its depth to the shell (the bottom bar fades exactly when the visible tab is drilled in), and a tab switch can never play a push/pop transition, because no stack's value changes. Pair with the TabBar driven by the same state and AppShellContent's scrollKey set to the active tab.",
        "status": "official",
        "citation": "registry.json description（docs/blocks.md 表格为同一描述的截断一行）"
      },
      "notes": "官方描述是按 tab 保活的 PageStack 机制，并写 “Pair with the TabBar…”。挂在 region 目录，更像壳层组合，不是内容货架。"
    },
    {
      "id": {
        "value": "task-card",
        "status": "official",
        "citation": "docs/blocks.md 表格；registry.json name"
      },
      "official_name": {
        "value": "Task Card",
        "status": "official",
        "citation": "registry.json title"
      },
      "kind": {
        "value": "component",
        "status": "official",
        "citation": "docs/blocks.md Kind 列；registry.json kind"
      },
      "demo_only": {
        "value": false,
        "status": "official",
        "citation": "与官方 kind=demo 同义。insights.md §4.6 要求给 page-type 逐条标 demo_only；本草案对所有 kind=demo（含 2 个 region demo）都标，不另造含义。"
      },
      "grain": {
        "value": "region",
        "status": "official",
        "citation": "docs/blocks.md ## Region blocks；scripts/build-docs.ts 按是否存在 meta.route.pageType 把条目写入相应章节。"
      },
      "card_unit": {
        "value": true,
        "status": "inferred",
        "citation": "官方描述为 “A daily check-in card”。虽含任务行列表，官方将其自身称为一张 card；标注为卡片单元，并在备注中保留“内含任务行”这一张力。 官方目录没有 card 层，故不得写成官方 grain。"
      },
      "scene": {
        "value": null,
        "status": "missing",
        "note": "未在官方文档出现。官方描述未命名产品表面（如 music / movies / books / games / cloud-services / settings / mobile-shell）。"
      },
      "routeable": {
        "value": false,
        "status": "official",
        "citation": "docs/blocks.md：只有 Page-type blocks “carry routing rules”；本条在 ## Region blocks，registry 无 meta.route.pageType；public/route-index.json 的 14 条 routes 不含本条。"
      },
      "data_contract": {
        "status": "official",
        "install_mode": "empty_feed",
        "install_mode_status": "official",
        "install_mode_citation": "docs/blocks.md ## What the kind column means；docs/llms.txt “A block without the marker takes required data props and ships empty.” / “(demo) marks a block with fixed baked-in content”.",
        "required_props_named_in_description": [
          "tasks"
        ],
        "required_props_status": "official",
        "required_props_note": null,
        "optional_props_named_in_description": [],
        "optional_props_status": "missing",
        "props_in_official_docs_example": [
          "tasks"
        ],
        "docs_example_is_bare_component": false,
        "children_take_required_data": null,
        "children_take_required_data_status": "missing",
        "schema": null,
        "schema_status": "missing",
        "schema_note": "未在官方文档给出可独立执行的 props schema（类型、必填/可选完整表、数据形状）。本草案不发明 schema。",
        "summary_zh": "官方 kind=component：安装为空并喂数据。官方描述点名必填标识符：tasks。不把示例对象写成正式 schema。",
        "citation": "registry.json description 与 docs 字段；docs 即 skill/registry.md / docs/llms.txt 所说的 add 输出 contract。"
      },
      "aliases": {
        "value": [],
        "status": "official",
        "citation": "registry.json meta.aliases"
      },
      "official_description": {
        "value": "A daily check-in card: a header badge counts the tasks still open and each row pairs a checkbox with a title and due note, replacing the legacy agui task-card. The data is a required prop (tasks); nothing is baked in, so an install feeds it instead of discarding it.",
        "status": "official",
        "citation": "registry.json description（docs/blocks.md 表格为同一描述的截断一行）"
      },
      "notes": "官方称为 daily check-in card，内含任务行；标为卡片单元，但承认它比 big-image-card 更接近小组件区。"
    },
    {
      "id": {
        "value": "three-column-layout",
        "status": "official",
        "citation": "docs/blocks.md 表格；registry.json name"
      },
      "official_name": {
        "value": "Three Column Layout",
        "status": "official",
        "citation": "registry.json title"
      },
      "kind": {
        "value": "component",
        "status": "official",
        "citation": "docs/blocks.md Kind 列；registry.json kind"
      },
      "demo_only": {
        "value": false,
        "status": "official",
        "citation": "与官方 kind=demo 同义。insights.md §4.6 要求给 page-type 逐条标 demo_only；本草案对所有 kind=demo（含 2 个 region demo）都标，不另造含义。"
      },
      "grain": {
        "value": "region",
        "status": "official",
        "citation": "docs/blocks.md ## Region blocks；scripts/build-docs.ts 按是否存在 meta.route.pageType 把条目写入相应章节。"
      },
      "card_unit": {
        "value": null,
        "status": "missing",
        "note": "官方文档没有 card 层字段；本条官方描述也不把它写成单卡或单元格，本草案不推断为卡片单元。"
      },
      "scene": {
        "value": null,
        "status": "missing",
        "note": "未在官方文档出现。官方描述未命名产品表面（如 music / movies / books / games / cloud-services / settings / mobile-shell）。"
      },
      "routeable": {
        "value": false,
        "status": "official",
        "citation": "docs/blocks.md：只有 Page-type blocks “carry routing rules”；本条在 ## Region blocks，registry 无 meta.route.pageType；public/route-index.json 的 14 条 routes 不含本条。"
      },
      "data_contract": {
        "status": "official",
        "install_mode": "empty_feed",
        "install_mode_status": "official",
        "install_mode_citation": "docs/blocks.md ## What the kind column means；docs/llms.txt “A block without the marker takes required data props and ships empty.” / “(demo) marks a block with fixed baked-in content”.",
        "required_props_named_in_description": [
          "cards"
        ],
        "required_props_status": "official",
        "required_props_note": null,
        "optional_props_named_in_description": [],
        "optional_props_status": "missing",
        "props_in_official_docs_example": [
          "cards"
        ],
        "docs_example_is_bare_component": false,
        "children_take_required_data": null,
        "children_take_required_data_status": "missing",
        "schema": null,
        "schema_status": "missing",
        "schema_note": "未在官方文档给出可独立执行的 props schema（类型、必填/可选完整表、数据形状）。本草案不发明 schema。",
        "summary_zh": "官方 kind=component：安装为空并喂数据。官方描述点名必填标识符：cards。不把示例对象写成正式 schema。",
        "citation": "registry.json description 与 docs 字段；docs 即 skill/registry.md / docs/llms.txt 所说的 add 输出 contract。"
      },
      "aliases": {
        "value": [],
        "status": "official",
        "citation": "registry.json meta.aliases"
      },
      "official_description": {
        "value": "A section header with a view-all action above a three-up grid of square-cover content cards with author and like rows, replacing the legacy three-column-layout block. The data is a required prop (cards); nothing is baked in, so an install feeds it instead of discarding it.",
        "status": "official",
        "citation": "registry.json description（docs/blocks.md 表格为同一描述的截断一行）"
      },
      "notes": "通用三列货架，官方未命名产品表面。"
    },
    {
      "id": {
        "value": "time-picker",
        "status": "official",
        "citation": "docs/blocks.md 表格；registry.json name"
      },
      "official_name": {
        "value": "Time Picker",
        "status": "official",
        "citation": "registry.json title"
      },
      "kind": {
        "value": "component",
        "status": "official",
        "citation": "docs/blocks.md Kind 列；registry.json kind"
      },
      "demo_only": {
        "value": false,
        "status": "official",
        "citation": "与官方 kind=demo 同义。insights.md §4.6 要求给 page-type 逐条标 demo_only；本草案对所有 kind=demo（含 2 个 region demo）都标，不另造含义。"
      },
      "grain": {
        "value": "region",
        "status": "official",
        "citation": "docs/blocks.md ## Region blocks；scripts/build-docs.ts 按是否存在 meta.route.pageType 把条目写入相应章节。"
      },
      "card_unit": {
        "value": null,
        "status": "missing",
        "note": "官方文档没有 card 层字段；本条官方描述也不把它写成单卡或单元格，本草案不推断为卡片单元。"
      },
      "scene": {
        "value": null,
        "status": "missing",
        "note": "未在官方文档出现。官方描述未命名产品表面（如 music / movies / books / games / cloud-services / settings / mobile-shell）。"
      },
      "routeable": {
        "value": false,
        "status": "official",
        "citation": "docs/blocks.md：只有 Page-type blocks “carry routing rules”；本条在 ## Region blocks，registry 无 meta.route.pageType；public/route-index.json 的 14 条 routes 不含本条。"
      },
      "data_contract": {
        "status": "official",
        "install_mode": "empty_feed",
        "install_mode_status": "official",
        "install_mode_citation": "docs/blocks.md ## What the kind column means；docs/llms.txt “A block without the marker takes required data props and ships empty.” / “(demo) marks a block with fixed baked-in content”.",
        "required_props_named_in_description": [],
        "required_props_status": "missing",
        "required_props_note": null,
        "optional_props_named_in_description": [],
        "optional_props_status": "missing",
        "props_in_official_docs_example": [],
        "docs_example_is_bare_component": true,
        "children_take_required_data": null,
        "children_take_required_data_status": "missing",
        "schema": null,
        "schema_status": "missing",
        "schema_note": "未在官方文档给出可独立执行的 props schema（类型、必填/可选完整表、数据形状）。本草案不发明 schema。",
        "summary_zh": "官方 kind=component：按通则应安装为空并喂数据。但本条官方 docs 示例为裸组件，描述也未列出必填 data props（只提到 locale / LocaleProvider）。具体 data props 记为未在官方文档出现，不发明 schema。此条与 kind 通则存在张力。",
        "citation": "registry.json description 与 docs 字段；docs 即 skill/registry.md / docs/llms.txt 所说的 add 输出 contract。"
      },
      "aliases": {
        "value": [
          "floating-picker-dialog"
        ],
        "status": "official",
        "citation": "registry.json meta.aliases"
      },
      "official_description": {
        "value": "A time preset over the picker wheel and a content-height sheet: fixed 24-hour and minute columns with no cross-column derivation, replacing the legacy floating-picker-dialog. The block's own words — the column names, the title, the Cancel/OK/Done row — follow the `locale` prop or the page's `LocaleProvider`, English when neither spoke.",
        "status": "official",
        "citation": "registry.json description（docs/blocks.md 表格为同一描述的截断一行）"
      },
      "notes": "与 date-picker 相同：kind=component，官方示例为裸 <TimePicker />，只提到 locale，未列出必填 data props。更像控件而非 region。"
    },
    {
      "id": {
        "value": "timeline",
        "status": "official",
        "citation": "docs/blocks.md 表格；registry.json name"
      },
      "official_name": {
        "value": "Timeline",
        "status": "official",
        "citation": "registry.json title"
      },
      "kind": {
        "value": "component",
        "status": "official",
        "citation": "docs/blocks.md Kind 列；registry.json kind"
      },
      "demo_only": {
        "value": false,
        "status": "official",
        "citation": "与官方 kind=demo 同义。insights.md §4.6 要求给 page-type 逐条标 demo_only；本草案对所有 kind=demo（含 2 个 region demo）都标，不另造含义。"
      },
      "grain": {
        "value": "region",
        "status": "official",
        "citation": "docs/blocks.md ## Region blocks；scripts/build-docs.ts 按是否存在 meta.route.pageType 把条目写入相应章节。"
      },
      "card_unit": {
        "value": null,
        "status": "missing",
        "note": "官方文档没有 card 层字段；本条官方描述也不把它写成单卡或单元格，本草案不推断为卡片单元。"
      },
      "scene": {
        "value": null,
        "status": "missing",
        "note": "未在官方文档出现。官方描述未命名产品表面（如 music / movies / books / games / cloud-services / settings / mobile-shell）。"
      },
      "routeable": {
        "value": false,
        "status": "official",
        "citation": "docs/blocks.md：只有 Page-type blocks “carry routing rules”；本条在 ## Region blocks，registry 无 meta.route.pageType；public/route-index.json 的 14 条 routes 不含本条。"
      },
      "data_contract": {
        "status": "official",
        "install_mode": "empty_feed",
        "install_mode_status": "official",
        "install_mode_citation": "docs/blocks.md ## What the kind column means；docs/llms.txt “A block without the marker takes required data props and ships empty.” / “(demo) marks a block with fixed baked-in content”.",
        "required_props_named_in_description": [
          "title",
          "sections"
        ],
        "required_props_status": "official",
        "required_props_note": null,
        "optional_props_named_in_description": [],
        "optional_props_status": "missing",
        "props_in_official_docs_example": [
          "title",
          "sections"
        ],
        "docs_example_is_bare_component": false,
        "children_take_required_data": null,
        "children_take_required_data_status": "missing",
        "schema": null,
        "schema_status": "missing",
        "schema_note": "未在官方文档给出可独立执行的 props schema（类型、必填/可选完整表、数据形状）。本草案不发明 schema。",
        "summary_zh": "官方 kind=component：安装为空并喂数据。官方描述点名必填标识符：title, sections。不把示例对象写成正式 schema。",
        "citation": "registry.json description 与 docs 字段；docs 即 skill/registry.md / docs/llms.txt 所说的 add 输出 contract。"
      },
      "aliases": {
        "value": [],
        "status": "official",
        "citation": "registry.json meta.aliases"
      },
      "official_description": {
        "value": "A day itinerary on a self-drawn semantic-token rail — time column, node dots and a connecting hairline — with a segmented control switching between the caller's sections. The data is a required prop (title + sections); nothing is baked in, so an install feeds it instead of discarding it.",
        "status": "official",
        "citation": "registry.json description（docs/blocks.md 表格为同一描述的截断一行）"
      },
      "notes": "官方是 day itinerary，未把它归入某个产品垂类。"
    },
    {
      "id": {
        "value": "today-movie-list",
        "status": "official",
        "citation": "docs/blocks.md 表格；registry.json name"
      },
      "official_name": {
        "value": "Today Movie List",
        "status": "official",
        "citation": "registry.json title"
      },
      "kind": {
        "value": "component",
        "status": "official",
        "citation": "docs/blocks.md Kind 列；registry.json kind"
      },
      "demo_only": {
        "value": false,
        "status": "official",
        "citation": "与官方 kind=demo 同义。insights.md §4.6 要求给 page-type 逐条标 demo_only；本草案对所有 kind=demo（含 2 个 region demo）都标，不另造含义。"
      },
      "grain": {
        "value": "region",
        "status": "official",
        "citation": "docs/blocks.md ## Region blocks；scripts/build-docs.ts 按是否存在 meta.route.pageType 把条目写入相应章节。"
      },
      "card_unit": {
        "value": null,
        "status": "missing",
        "note": "官方文档没有 card 层字段；本条官方描述也不把它写成单卡或单元格，本草案不推断为卡片单元。"
      },
      "scene": {
        "value": "movies",
        "status": "official",
        "citation": "官方描述原文： “A today/this-week movie shelf”。"
      },
      "routeable": {
        "value": false,
        "status": "official",
        "citation": "docs/blocks.md：只有 Page-type blocks “carry routing rules”；本条在 ## Region blocks，registry 无 meta.route.pageType；public/route-index.json 的 14 条 routes 不含本条。"
      },
      "data_contract": {
        "status": "official",
        "install_mode": "empty_feed",
        "install_mode_status": "official",
        "install_mode_citation": "docs/blocks.md ## What the kind column means；docs/llms.txt “A block without the marker takes required data props and ships empty.” / “(demo) marks a block with fixed baked-in content”.",
        "required_props_named_in_description": [],
        "required_props_status": "official",
        "required_props_note": "官方描述写 “Both line-ups are required props”，未给出标识符；官方 docs 示例为 today、thisWeek。",
        "optional_props_named_in_description": [],
        "optional_props_status": "missing",
        "props_in_official_docs_example": [
          "today",
          "thisWeek"
        ],
        "docs_example_is_bare_component": false,
        "children_take_required_data": null,
        "children_take_required_data_status": "missing",
        "schema": null,
        "schema_status": "missing",
        "schema_note": "未在官方文档给出可独立执行的 props schema（类型、必填/可选完整表、数据形状）。本草案不发明 schema。",
        "summary_zh": "官方 kind=component：安装为空并喂数据。官方 docs 示例中还出现但未声明是否必填：today, thisWeek。官方描述写 “Both line-ups are required props”，未给出标识符；官方 docs 示例为 today、thisWeek。不把示例对象写成正式 schema。",
        "citation": "registry.json description 与 docs 字段；docs 即 skill/registry.md / docs/llms.txt 所说的 add 输出 contract。"
      },
      "aliases": {
        "value": [],
        "status": "official",
        "citation": "registry.json meta.aliases"
      },
      "official_description": {
        "value": "A today/this-week movie shelf: a section header whose action swaps the line-up over a locked row of three 3:4 posters with episode badges, two-line titles and one-line subtitles, replacing the legacy today-movie-list block. Both line-ups are required props; nothing is baked in, so an install feeds it instead of discarding it.",
        "status": "official",
        "citation": "registry.json description（docs/blocks.md 表格为同一描述的截断一行）"
      },
      "notes": "按官方 kind、目录章节与（若有）描述中的必填 props 重标；不扩编。"
    },
    {
      "id": {
        "value": "toggle-filter",
        "status": "official",
        "citation": "docs/blocks.md 表格；registry.json name"
      },
      "official_name": {
        "value": "Toggle Filter",
        "status": "official",
        "citation": "registry.json title"
      },
      "kind": {
        "value": "component",
        "status": "official",
        "citation": "docs/blocks.md Kind 列；registry.json kind"
      },
      "demo_only": {
        "value": false,
        "status": "official",
        "citation": "与官方 kind=demo 同义。insights.md §4.6 要求给 page-type 逐条标 demo_only；本草案对所有 kind=demo（含 2 个 region demo）都标，不另造含义。"
      },
      "grain": {
        "value": "region",
        "status": "official",
        "citation": "docs/blocks.md ## Region blocks；scripts/build-docs.ts 按是否存在 meta.route.pageType 把条目写入相应章节。"
      },
      "card_unit": {
        "value": null,
        "status": "missing",
        "note": "官方文档没有 card 层字段；本条官方描述也不把它写成单卡或单元格，本草案不推断为卡片单元。"
      },
      "scene": {
        "value": null,
        "status": "missing",
        "note": "未在官方文档出现。官方描述未命名产品表面（如 music / movies / books / games / cloud-services / settings / mobile-shell）。"
      },
      "routeable": {
        "value": false,
        "status": "official",
        "citation": "docs/blocks.md：只有 Page-type blocks “carry routing rules”；本条在 ## Region blocks，registry 无 meta.route.pageType；public/route-index.json 的 14 条 routes 不含本条。"
      },
      "data_contract": {
        "status": "official",
        "install_mode": "empty_feed",
        "install_mode_status": "official",
        "install_mode_citation": "docs/blocks.md ## What the kind column means；docs/llms.txt “A block without the marker takes required data props and ships empty.” / “(demo) marks a block with fixed baked-in content”.",
        "required_props_named_in_description": [
          "rows"
        ],
        "required_props_status": "official",
        "required_props_note": null,
        "optional_props_named_in_description": [],
        "optional_props_status": "missing",
        "props_in_official_docs_example": [
          "rows"
        ],
        "docs_example_is_bare_component": false,
        "children_take_required_data": null,
        "children_take_required_data_status": "missing",
        "schema": null,
        "schema_status": "missing",
        "schema_note": "未在官方文档给出可独立执行的 props schema（类型、必填/可选完整表、数据形状）。本草案不发明 schema。",
        "summary_zh": "官方 kind=component：安装为空并喂数据。官方描述点名必填标识符：rows。不把示例对象写成正式 schema。",
        "citation": "registry.json description 与 docs 字段；docs 即 skill/registry.md / docs/llms.txt 所说的 add 输出 contract。"
      },
      "aliases": {
        "value": [
          "floating-toggle-filter"
        ],
        "status": "official",
        "citation": "registry.json meta.aliases"
      },
      "official_description": {
        "value": "A multi-row floating filter with one pressed pill per row, built on the toggle group and replacing the legacy floating-toggle-filter block. The rows (and each row's opening pick) are a required prop; nothing is baked in, so an install feeds it instead of discarding it.",
        "status": "official",
        "citation": "registry.json description（docs/blocks.md 表格为同一描述的截断一行）"
      },
      "notes": "通用筛选条，官方未命名产品表面。"
    },
    {
      "id": {
        "value": "top-banner",
        "status": "official",
        "citation": "docs/blocks.md 表格；registry.json name"
      },
      "official_name": {
        "value": "Top Banner",
        "status": "official",
        "citation": "registry.json title"
      },
      "kind": {
        "value": "component",
        "status": "official",
        "citation": "docs/blocks.md Kind 列；registry.json kind"
      },
      "demo_only": {
        "value": false,
        "status": "official",
        "citation": "与官方 kind=demo 同义。insights.md §4.6 要求给 page-type 逐条标 demo_only；本草案对所有 kind=demo（含 2 个 region demo）都标，不另造含义。"
      },
      "grain": {
        "value": "region",
        "status": "official",
        "citation": "docs/blocks.md ## Region blocks；scripts/build-docs.ts 按是否存在 meta.route.pageType 把条目写入相应章节。"
      },
      "card_unit": {
        "value": null,
        "status": "missing",
        "note": "官方文档没有 card 层字段；本条官方描述也不把它写成单卡或单元格，本草案不推断为卡片单元。"
      },
      "scene": {
        "value": null,
        "status": "missing",
        "note": "未在官方文档出现。官方描述未命名产品表面（如 music / movies / books / games / cloud-services / settings / mobile-shell）。"
      },
      "routeable": {
        "value": false,
        "status": "official",
        "citation": "docs/blocks.md：只有 Page-type blocks “carry routing rules”；本条在 ## Region blocks，registry 无 meta.route.pageType；public/route-index.json 的 14 条 routes 不含本条。"
      },
      "data_contract": {
        "status": "official",
        "install_mode": "empty_feed",
        "install_mode_status": "official",
        "install_mode_citation": "docs/blocks.md ## What the kind column means；docs/llms.txt “A block without the marker takes required data props and ships empty.” / “(demo) marks a block with fixed baked-in content”.",
        "required_props_named_in_description": [
          "slides"
        ],
        "required_props_status": "official",
        "required_props_note": null,
        "optional_props_named_in_description": [],
        "optional_props_status": "missing",
        "props_in_official_docs_example": [
          "slides"
        ],
        "docs_example_is_bare_component": false,
        "children_take_required_data": null,
        "children_take_required_data_status": "missing",
        "schema": null,
        "schema_status": "missing",
        "schema_note": "未在官方文档给出可独立执行的 props schema（类型、必填/可选完整表、数据形状）。本草案不发明 schema。",
        "summary_zh": "官方 kind=component：安装为空并喂数据。官方描述点名必填标识符：slides。不把示例对象写成正式 schema。",
        "citation": "registry.json description 与 docs 字段；docs 即 skill/registry.md / docs/llms.txt 所说的 add 输出 contract。"
      },
      "aliases": {
        "value": [
          "top-banner-2"
        ],
        "status": "official",
        "citation": "registry.json meta.aliases"
      },
      "official_description": {
        "value": "An immersive recommendation hero carousel — full-bleed background, book cover or scene logo, tag and description over a bottom scrim, with the segmented progress bar; absorbs the retired top-banner-2 as its scene variant. The data is a required prop (slides, for both appearances); nothing is baked in, so an install feeds it instead of discarding it.",
        "status": "official",
        "citation": "registry.json description（docs/blocks.md 表格为同一描述的截断一行）"
      },
      "notes": "官方写明吸收已退役的 top-banner-2 作为 scene variant（book-cover 与 scene-logo 两种外观）。“scene variant” 在这里是外观变体，不是本草案的 scene 字段；不把 books 写成官方产品表面。"
    },
    {
      "id": {
        "value": "top-songs",
        "status": "official",
        "citation": "docs/blocks.md 表格；registry.json name"
      },
      "official_name": {
        "value": "Top Songs",
        "status": "official",
        "citation": "registry.json title"
      },
      "kind": {
        "value": "component",
        "status": "official",
        "citation": "docs/blocks.md Kind 列；registry.json kind"
      },
      "demo_only": {
        "value": false,
        "status": "official",
        "citation": "与官方 kind=demo 同义。insights.md §4.6 要求给 page-type 逐条标 demo_only；本草案对所有 kind=demo（含 2 个 region demo）都标，不另造含义。"
      },
      "grain": {
        "value": "region",
        "status": "official",
        "citation": "docs/blocks.md ## Region blocks；scripts/build-docs.ts 按是否存在 meta.route.pageType 把条目写入相应章节。"
      },
      "card_unit": {
        "value": null,
        "status": "missing",
        "note": "官方文档没有 card 层字段；本条官方描述也不把它写成单卡或单元格，本草案不推断为卡片单元。"
      },
      "scene": {
        "value": "music",
        "status": "official",
        "citation": "官方描述原文： “A song chart card”。"
      },
      "routeable": {
        "value": false,
        "status": "official",
        "citation": "docs/blocks.md：只有 Page-type blocks “carry routing rules”；本条在 ## Region blocks，registry 无 meta.route.pageType；public/route-index.json 的 14 条 routes 不含本条。"
      },
      "data_contract": {
        "status": "official",
        "install_mode": "empty_feed",
        "install_mode_status": "official",
        "install_mode_citation": "docs/blocks.md ## What the kind column means；docs/llms.txt “A block without the marker takes required data props and ships empty.” / “(demo) marks a block with fixed baked-in content”.",
        "required_props_named_in_description": [
          "title",
          "items"
        ],
        "required_props_status": "official",
        "required_props_note": null,
        "optional_props_named_in_description": [],
        "optional_props_status": "missing",
        "props_in_official_docs_example": [
          "title",
          "items"
        ],
        "docs_example_is_bare_component": false,
        "children_take_required_data": null,
        "children_take_required_data_status": "missing",
        "schema": null,
        "schema_status": "missing",
        "schema_note": "未在官方文档给出可独立执行的 props schema（类型、必填/可选完整表、数据形状）。本草案不发明 schema。",
        "summary_zh": "官方 kind=component：安装为空并喂数据。官方描述点名必填标识符：title, items。不把示例对象写成正式 schema。",
        "citation": "registry.json description 与 docs 字段；docs 即 skill/registry.md / docs/llms.txt 所说的 add 输出 contract。"
      },
      "aliases": {
        "value": [],
        "status": "official",
        "citation": "registry.json meta.aliases"
      },
      "official_description": {
        "value": "BREAKING (Plan-035): title and items are now required props — a call that relied on the removed defaults, such as a bare <TopSongs />, must pass its own chart name and rows. A song chart card with a play toggle in the header and a ranked run of song rows carrying Hot / Up / New badges, replacing the legacy top-songs block. Nothing is baked in, so an install feeds it instead of discarding it.",
        "status": "official",
        "citation": "registry.json description（docs/blocks.md 表格为同一描述的截断一行）"
      },
      "notes": "官方描述以 BREAKING (Plan-035) 起笔：title 与 items 现为必填，不能再写裸 <TopSongs />。官方称 “song chart card”，含多行榜单，本草案不把它标成单卡单元。"
    },
    {
      "id": {
        "value": "two-column-layout",
        "status": "official",
        "citation": "docs/blocks.md 表格；registry.json name"
      },
      "official_name": {
        "value": "Two Column Layout",
        "status": "official",
        "citation": "registry.json title"
      },
      "kind": {
        "value": "component",
        "status": "official",
        "citation": "docs/blocks.md Kind 列；registry.json kind"
      },
      "demo_only": {
        "value": false,
        "status": "official",
        "citation": "与官方 kind=demo 同义。insights.md §4.6 要求给 page-type 逐条标 demo_only；本草案对所有 kind=demo（含 2 个 region demo）都标，不另造含义。"
      },
      "grain": {
        "value": "region",
        "status": "official",
        "citation": "docs/blocks.md ## Region blocks；scripts/build-docs.ts 按是否存在 meta.route.pageType 把条目写入相应章节。"
      },
      "card_unit": {
        "value": null,
        "status": "missing",
        "note": "官方文档没有 card 层字段；本条官方描述也不把它写成单卡或单元格，本草案不推断为卡片单元。"
      },
      "scene": {
        "value": null,
        "status": "missing",
        "note": "未在官方文档出现。官方描述未命名产品表面（如 music / movies / books / games / cloud-services / settings / mobile-shell）。"
      },
      "routeable": {
        "value": false,
        "status": "official",
        "citation": "docs/blocks.md：只有 Page-type blocks “carry routing rules”；本条在 ## Region blocks，registry 无 meta.route.pageType；public/route-index.json 的 14 条 routes 不含本条。"
      },
      "data_contract": {
        "status": "official",
        "install_mode": "empty_feed",
        "install_mode_status": "official",
        "install_mode_citation": "docs/blocks.md ## What the kind column means；docs/llms.txt “A block without the marker takes required data props and ships empty.” / “(demo) marks a block with fixed baked-in content”.",
        "required_props_named_in_description": [
          "cards"
        ],
        "required_props_status": "official",
        "required_props_note": null,
        "optional_props_named_in_description": [],
        "optional_props_status": "missing",
        "props_in_official_docs_example": [
          "cards"
        ],
        "docs_example_is_bare_component": false,
        "children_take_required_data": null,
        "children_take_required_data_status": "missing",
        "schema": null,
        "schema_status": "missing",
        "schema_note": "未在官方文档给出可独立执行的 props schema（类型、必填/可选完整表、数据形状）。本草案不发明 schema。",
        "summary_zh": "官方 kind=component：安装为空并喂数据。官方描述点名必填标识符：cards。不把示例对象写成正式 schema。",
        "citation": "registry.json description 与 docs 字段；docs 即 skill/registry.md / docs/llms.txt 所说的 add 输出 contract。"
      },
      "aliases": {
        "value": [],
        "status": "official",
        "citation": "registry.json meta.aliases"
      },
      "official_description": {
        "value": "A section title above a pair of full-bleed portrait image cards with category tag and scrim title, replacing the legacy two-column-layout block. The data is a required prop (cards); nothing is baked in, so an install feeds it instead of discarding it.",
        "status": "official",
        "citation": "registry.json description（docs/blocks.md 表格为同一描述的截断一行）"
      },
      "notes": "通用双列货架，官方未命名产品表面。"
    },
    {
      "id": {
        "value": "world-map",
        "status": "official",
        "citation": "docs/blocks.md 表格；registry.json name"
      },
      "official_name": {
        "value": "World Map",
        "status": "official",
        "citation": "registry.json title"
      },
      "kind": {
        "value": "component",
        "status": "official",
        "citation": "docs/blocks.md Kind 列；registry.json kind"
      },
      "demo_only": {
        "value": false,
        "status": "official",
        "citation": "与官方 kind=demo 同义。insights.md §4.6 要求给 page-type 逐条标 demo_only；本草案对所有 kind=demo（含 2 个 region demo）都标，不另造含义。"
      },
      "grain": {
        "value": "region",
        "status": "official",
        "citation": "docs/blocks.md ## Region blocks；scripts/build-docs.ts 按是否存在 meta.route.pageType 把条目写入相应章节。"
      },
      "card_unit": {
        "value": null,
        "status": "missing",
        "note": "官方文档没有 card 层字段；本条官方描述也不把它写成单卡或单元格，本草案不推断为卡片单元。"
      },
      "scene": {
        "value": "travel",
        "status": "official",
        "citation": "官方描述原文： “A travel-footprint map”。沿用 travel-footprint 的产品表面，不改写成未出现的类目名。"
      },
      "routeable": {
        "value": false,
        "status": "official",
        "citation": "docs/blocks.md：只有 Page-type blocks “carry routing rules”；本条在 ## Region blocks，registry 无 meta.route.pageType；public/route-index.json 的 14 条 routes 不含本条。"
      },
      "data_contract": {
        "status": "official",
        "install_mode": "empty_feed",
        "install_mode_status": "official",
        "install_mode_citation": "docs/blocks.md ## What the kind column means；docs/llms.txt “A block without the marker takes required data props and ships empty.” / “(demo) marks a block with fixed baked-in content”.",
        "required_props_named_in_description": [
          "regions"
        ],
        "required_props_status": "official",
        "required_props_note": null,
        "optional_props_named_in_description": [],
        "optional_props_status": "missing",
        "props_in_official_docs_example": [
          "regions",
          "defaultVisited"
        ],
        "docs_example_is_bare_component": false,
        "children_take_required_data": null,
        "children_take_required_data_status": "missing",
        "schema": null,
        "schema_status": "missing",
        "schema_note": "未在官方文档给出可独立执行的 props schema（类型、必填/可选完整表、数据形状）。本草案不发明 schema。",
        "summary_zh": "官方 kind=component：安装为空并喂数据。官方描述点名必填标识符：regions。官方 docs 示例中还出现但未声明是否必填：defaultVisited。不把示例对象写成正式 schema。",
        "citation": "registry.json description 与 docs 字段；docs 即 skill/registry.md / docs/llms.txt 所说的 add 输出 contract。"
      },
      "aliases": {
        "value": [],
        "status": "official",
        "citation": "registry.json meta.aliases"
      },
      "official_description": {
        "value": "A travel-footprint map drawn as an abstract SVG dot grid on semantic tokens — primary dots for visited regions, muted for the rest — with a region list that toggles the same state, replacing the legacy agui world-map. The data is a required prop (regions); nothing is baked in, so an install feeds it instead of discarding it.",
        "status": "official",
        "citation": "registry.json description（docs/blocks.md 表格为同一描述的截断一行）"
      },
      "notes": "官方必填是 regions；docs 示例另有 defaultVisited，描述未将其列为必填。"
    }
  ]
};
