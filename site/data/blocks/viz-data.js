window.BLOCKS_VIZ = {
  "meta": {
    "research_id": "blocks-research-pass1",
    "date": "2026-11-11",
    "timezone": "America/Toronto",
    "title_zh": "Blocks 第一步对照：定义、粒度、响应模型与场景/组件族",
    "disclaimer": "跨源数字在未标注 unit、grain、本轮是否核实之前不可比较，也不得做成排行榜。本文件不回答“我们需要 N 个 blocks”。56 条 draft query 本轮未复算，不得用于覆盖结论。",
    "synthesis": {
      "insights_author": "DeepSeek V4.1 Flash via 火山 ucd2012 gateway (dsh headless)",
      "viz_data_author": "executor, strictly from the same evidence pack after dsh did not finish this file",
      "verified_by": "executor"
    }
  },
  "sources": [
    {
      "slug": "hos7",
      "name": "HOS7",
      "kind": "baseline",
      "official_urls": [
        "/workspace/repos/HOS7/docs/blocks.md",
        "/workspace/repos/HOS7/docs/llms.txt",
        "/workspace/repos/HOS7/registry.json"
      ],
      "has_traditional_block_catalog": true,
      "grain": [
        "region",
        "page"
      ],
      "grain_notes": "同一 69 目录混有整页、区域，以及接近卡片单元的条目（如 big-image-card）。",
      "response_model": [
        "catalog-select",
        "compose-regions"
      ],
      "interface_contract": "mixed",
      "official_counts": [
        {
          "value": 69,
          "unit": "blocks",
          "grain": "mixed page+region",
          "source_url": "/workspace/repos/HOS7/docs/blocks.md",
          "verified": true,
          "notes": "14 page-type 全部 demo + 55 region（53 component, 2 demo）"
        },
        {
          "value": 14,
          "unit": "page-type blocks",
          "grain": "page",
          "source_url": "/workspace/repos/HOS7/docs/blocks.md",
          "verified": true,
          "notes": "全部 kind=demo，供 ds.py route 选择"
        },
        {
          "value": 55,
          "unit": "region blocks",
          "grain": "region (heterogeneous)",
          "source_url": "/workspace/repos/HOS7/docs/blocks.md",
          "verified": true,
          "notes": "53 component + 2 demo"
        },
        {
          "value": 87,
          "unit": "components (registry:ui)",
          "grain": "primitive",
          "source_url": "/workspace/repos/HOS7/docs/llms.txt",
          "verified": true,
          "notes": "不是 blocks"
        },
        {
          "value": 10,
          "unit": "layout blueprints",
          "grain": "page arrangement guide, not a block",
          "source_url": "/workspace/repos/HOS7/docs/llms.txt",
          "verified": true,
          "notes": "与 page-type 分层"
        }
      ],
      "taxonomy": [
        {
          "name": "page-type",
          "count": 14
        },
        {
          "name": "region",
          "count": 55
        },
        {
          "name": "kind: demo",
          "count": 16
        },
        {
          "name": "kind: component",
          "count": 53
        }
      ],
      "scenes": [
        "mobile-shell",
        "settings",
        "cloud-services",
        "music",
        "movies",
        "books",
        "games",
        "search-filter",
        "profile",
        "data-display"
      ],
      "component_families": [
        "icon",
        "button",
        "image",
        "list",
        "card",
        "section-header",
        "badge",
        "app-shell",
        "navigation-bar",
        "search-field",
        "sheet",
        "avatar",
        "empty",
        "tab-bar",
        "mini-player"
      ],
      "coverage_claim": "仓内没有“覆盖所有应用”的声称。实际偏移动内容消费与系统设置。"
    },
    {
      "slug": "shadcn",
      "name": "shadcn/ui official Blocks",
      "kind": "official-standard",
      "official_urls": [
        "https://ui.shadcn.com/blocks",
        "https://ui.shadcn.com/docs/changelog/2024-03-blocks",
        "https://github.com/shadcn-ui/ui/blob/main/apps/v4/registry/__blocks__.json",
        "https://ui.shadcn.com/r/styles/new-york-v4/registry.json"
      ],
      "has_traditional_block_catalog": true,
      "grain": [
        "page",
        "region"
      ],
      "grain_notes": "公开库以 page/app-shell 为主；registry:block 另含大量 chart 变体。",
      "response_model": [
        "catalog-select",
        "prompt-to-code"
      ],
      "interface_contract": "baked-demo",
      "official_counts": [
        {
          "value": 27,
          "unit": "named starting-layout blocks with categories",
          "grain": "page/app-shell",
          "source_url": "https://github.com/shadcn-ui/ui/blob/main/apps/v4/registry/__blocks__.json",
          "verified": true,
          "notes": "dashboard-01 + login-01..05 + signup-01..05 + sidebar-01..16"
        },
        {
          "value": 30,
          "unit": "entries in official __blocks__.json",
          "grain": "page/app-shell + 3 previews",
          "source_url": "https://github.com/shadcn-ui/ui/blob/main/apps/v4/registry/__blocks__.json",
          "verified": true,
          "notes": "含 preview / preview-02 / preview-03，官方未说明这 3 条是否算公开库"
        },
        {
          "value": 97,
          "unit": "registry:block items (new-york-v4)",
          "grain": "includes many chart variants",
          "source_url": "https://ui.shadcn.com/r/styles/new-york-v4/registry.json",
          "verified": true,
          "notes": "不得当作 /blocks 页规模"
        }
      ],
      "taxonomy": [
        {
          "name": "dashboard",
          "count": 1
        },
        {
          "name": "sidebar",
          "count": 16
        },
        {
          "name": "login",
          "count": 5
        },
        {
          "name": "signup",
          "count": 5
        }
      ],
      "scenes": [
        "dashboard-admin",
        "auth"
      ],
      "component_families": [
        "sidebar",
        "breadcrumb",
        "chart",
        "data-table",
        "card",
        "form",
        "input",
        "button"
      ],
      "coverage_claim": "没有覆盖各种应用的声称。官方从 dashboard layouts 与 authentication pages 起步。"
    },
    {
      "slug": "copilotkit",
      "name": "CopilotKit",
      "kind": "generative-ui",
      "official_urls": [
        "https://www.copilotkit.ai/",
        "https://docs.copilotkit.ai/agno/concepts/generative-ui-overview",
        "https://docs.copilotkit.ai/ag2/generative-ui/components"
      ],
      "has_traditional_block_catalog": false,
      "grain": [
        "runtime-composed",
        "primitive"
      ],
      "response_model": [
        "runtime-generate",
        "compose-regions"
      ],
      "interface_contract": "runtime-props",
      "official_counts": [
        {
          "value": 69,
          "unit": "standard catalog components (NOT blocks)",
          "grain": "runtime-composed primitives",
          "source_url": "https://docs.copilotkit.ai/ag2/generative-ui/components",
          "verified": true,
          "notes": "与 HOS7 的 69 blocks 数字碰巧相同，对象不同，禁止并列"
        }
      ],
      "taxonomy": [
        {
          "name": "Components as Tools"
        },
        {
          "name": "Tool Call Rendering"
        },
        {
          "name": "State Rendering"
        },
        {
          "name": "Reasoning"
        },
        {
          "name": "A2UI"
        },
        {
          "name": "MCP Apps"
        }
      ],
      "scenes": [
        "agent-chat",
        "knowledge-base",
        "customer-support",
        "saas-embedded-agent",
        "data-display"
      ],
      "component_families": [
        "layout",
        "text",
        "inputs",
        "tables",
        "charts",
        "maps",
        "chat"
      ],
      "coverage_claim": "无 N 个 blocks 覆盖全部 query 的主张。灵活性来自运行时原语。"
    },
    {
      "slug": "openui-thesys",
      "name": "Thesys OpenUI",
      "kind": "generative-ui",
      "official_urls": [
        "https://www.openui.com/",
        "https://www.openui.com/docs/openui-lang",
        "https://www.openui.com/docs/openui-lang/defining-components",
        "https://github.com/thesysdev/openui"
      ],
      "has_traditional_block_catalog": false,
      "grain": [
        "runtime-composed"
      ],
      "response_model": [
        "runtime-generate"
      ],
      "interface_contract": "runtime-props",
      "official_counts": [
        {
          "value": null,
          "unit": null,
          "grain": "runtime-composed",
          "source_url": "https://www.openui.com/",
          "verified": false,
          "notes": "无传统 block 目录；内置库组件精确个数本轮未核实"
        }
      ],
      "taxonomy": [
        {
          "name": "openuiLibrary (root=Stack)"
        },
        {
          "name": "openuiChatLibrary (root=Card)"
        }
      ],
      "scenes": [
        "agent-chat",
        "dashboards-apps",
        "forms",
        "charts",
        "travel-concierge-demo"
      ],
      "component_families": [
        "charts",
        "forms",
        "tables",
        "layouts"
      ],
      "coverage_claim": "覆盖范围取决于你注册的组件库，不是自带巨大目录。官方要求 Limit library size。",
      "name_clash": [
        "wandb/openui",
        "W3C Open UI"
      ]
    },
    {
      "slug": "shadcnblocks",
      "name": "Shadcnblocks",
      "kind": "catalog",
      "official_urls": [
        "https://www.shadcnblocks.com/",
        "https://www.shadcnblocks.com/blocks"
      ],
      "has_traditional_block_catalog": true,
      "grain": [
        "region",
        "page"
      ],
      "response_model": [
        "catalog-select"
      ],
      "interface_contract": "baked-demo",
      "official_counts": [
        {
          "value": 2866,
          "unit": "blocks",
          "grain": "mostly section variants",
          "source_url": "https://www.shadcnblocks.com/blocks",
          "verified": true,
          "notes": "133 类目加总等于 2866"
        },
        {
          "value": 2697,
          "unit": "Pro Blocks (pricing copy, plus sign in source: 2697+)",
          "grain": "paid subset",
          "source_url": "https://www.shadcnblocks.com/",
          "verified": true,
          "notes": "不得与 2866 混成同一官方数；保留为定价文案"
        },
        {
          "value": 2241,
          "unit": "components",
          "grain": "primitive/examples, not blocks",
          "source_url": "https://www.shadcnblocks.com/",
          "verified": true,
          "notes": "与 blocks 分开计数"
        },
        {
          "value": 22,
          "unit": "templates",
          "grain": "template",
          "source_url": "https://www.shadcnblocks.com/",
          "verified": true,
          "notes": null
        },
        {
          "value": 97,
          "unit": "pages",
          "grain": "page",
          "source_url": "https://www.shadcnblocks.com/",
          "verified": true,
          "notes": "页脚 Shadcn Pages 97"
        }
      ],
      "taxonomy": [
        {
          "name": "Hero",
          "count": 292
        },
        {
          "name": "Feature",
          "count": 334
        },
        {
          "name": "Background Pattern",
          "count": 145
        },
        {
          "name": "Gallery",
          "count": 142
        },
        {
          "name": "Blog",
          "count": 134
        },
        {
          "name": "Pricing",
          "count": 96
        },
        {
          "name": "Cta",
          "count": 56
        },
        {
          "name": "Application Shell",
          "count": 47
        },
        {
          "name": "Contact",
          "count": 46
        },
        {
          "name": "Product Detail",
          "count": 52
        },
        {
          "name": "Product List",
          "count": 44
        },
        {
          "name": "Dashboard",
          "count": 31
        },
        {
          "name": "Data Table",
          "count": 32
        },
        {
          "name": "Sidebar",
          "count": 21
        },
        {
          "name": "Navbar",
          "count": 21
        },
        {
          "name": "Login",
          "count": 8
        },
        {
          "name": "Signup",
          "count": 10
        },
        {
          "name": "Gantt",
          "count": 1
        },
        {
          "name": "Kanban",
          "count": 3
        },
        {
          "name": "Onboarding",
          "count": 2
        },
        {
          "name": "Checkout",
          "count": 11
        },
        {
          "name": "Shopping Cart",
          "count": 17
        },
        {
          "name": "Chart Card",
          "count": 27
        },
        {
          "name": "Chart Group",
          "count": 15
        },
        {
          "name": "Settings Profile",
          "count": 9
        }
      ],
      "scenes": [
        "marketing-landing",
        "commerce",
        "dashboard-admin",
        "auth",
        "media-content",
        "settings"
      ],
      "component_families": [
        "hero",
        "feature",
        "pricing",
        "app-shell",
        "data-table",
        "chart",
        "navbar"
      ],
      "coverage_claim": "自称最大付费 block 集，覆盖 landing/marketing/dashboard/storefront。深度在复杂应用表面不均匀（Gantt 1、Kanban 3）。"
    },
    {
      "slug": "aceternity",
      "name": "Aceternity UI",
      "kind": "catalog",
      "official_urls": [
        "https://ui.aceternity.com/",
        "https://ui.aceternity.com/blocks"
      ],
      "has_traditional_block_catalog": true,
      "grain": [
        "region",
        "page",
        "template"
      ],
      "response_model": [
        "catalog-select",
        "prompt-to-code"
      ],
      "interface_contract": "baked-demo",
      "official_counts": [
        {
          "value": null,
          "display": "183+",
          "unit": "blocks",
          "grain": "marketing sections",
          "source_url": "https://ui.aceternity.com/",
          "verified": true,
          "notes": "首页文案 183+ blocks"
        },
        {
          "value": 182,
          "unit": "blocks",
          "grain": "marketing sections",
          "source_url": "https://ui.aceternity.com/components",
          "verified": true,
          "notes": "All-Access copy: 17 templates, 182 blocks and 5 pages。与 183+ 冲突，两处都保留"
        },
        {
          "value": null,
          "display": "118+",
          "unit": "components",
          "grain": "primitive",
          "source_url": "https://ui.aceternity.com/",
          "verified": true,
          "notes": null
        },
        {
          "value": 17,
          "unit": "templates",
          "grain": "template",
          "source_url": "https://ui.aceternity.com/",
          "verified": true,
          "notes": null
        },
        {
          "value": 5,
          "unit": "pages",
          "grain": "page",
          "source_url": "https://ui.aceternity.com/",
          "verified": true,
          "notes": null
        }
      ],
      "taxonomy": [
        {
          "name": "Hero Sections",
          "count_display": "27+"
        },
        {
          "name": "Feature Sections",
          "count_display": "24+"
        },
        {
          "name": "Illustrations",
          "count_display": "22+"
        },
        {
          "name": "Pricing sections",
          "count_display": "7+"
        },
        {
          "name": "CTA Sections",
          "count_display": "7+"
        },
        {
          "name": "Navbars",
          "count_display": "7+"
        },
        {
          "name": "Login and Signup Sections",
          "count_display": "7+"
        },
        {
          "name": "Blog Sections",
          "count_display": "4+"
        },
        {
          "name": "Blog Content Sections",
          "count_display": "2+"
        },
        {
          "name": "Stats Sections",
          "count_display": "4+"
        }
      ],
      "scenes": [
        "marketing-landing",
        "auth",
        "media-content"
      ],
      "component_families": [
        "hero",
        "motion-shader",
        "feature",
        "pricing",
        "navbar",
        "cta"
      ],
      "coverage_claim": "覆盖营销/落地页/作品集视效，不是应用后台。"
    },
    {
      "slug": "tailark",
      "name": "Tailark",
      "kind": "catalog",
      "official_urls": [
        "https://tailark.com/",
        "https://tailark.com/docs",
        "https://tailark.com/r/registry.json",
        "https://pro.tailark.com/"
      ],
      "has_traditional_block_catalog": true,
      "grain": [
        "region",
        "page"
      ],
      "response_model": [
        "catalog-select",
        "prompt-to-code"
      ],
      "interface_contract": "baked-demo",
      "official_counts": [
        {
          "value": 264,
          "unit": "registry:block items in public Base UI registry",
          "grain": "marketing section variants",
          "source_url": "https://tailark.com/r/registry.json",
          "verified": true,
          "notes": "不等于已核实的 Pro 全集；Pro 页只写 Hundreds of blocks"
        },
        {
          "value": 476,
          "unit": "registry items (all types)",
          "grain": "mixed",
          "source_url": "https://tailark.com/r/registry.json",
          "verified": true,
          "notes": "含 131 component + 79 ui + 264 block 等"
        }
      ],
      "taxonomy": [
        {
          "name": "expandable-features",
          "count": 22
        },
        {
          "name": "hero-section",
          "count": 20
        },
        {
          "name": "secondary-hero",
          "count": 20
        },
        {
          "name": "features",
          "count": 16
        },
        {
          "name": "team",
          "count": 16
        },
        {
          "name": "bento",
          "count": 14
        },
        {
          "name": "login-blocks",
          "count": 11
        },
        {
          "name": "sign-up",
          "count": 11
        },
        {
          "name": "contact",
          "count": 10
        },
        {
          "name": "logo-cloud",
          "count": 10
        }
      ],
      "scenes": [
        "marketing-landing",
        "auth"
      ],
      "component_families": [
        "hero",
        "features",
        "logo-cloud",
        "pricing",
        "testimonials",
        "login"
      ],
      "coverage_claim": "面向营销网站的 blocks/pages/illustrations，不是复杂后台。"
    },
    {
      "slug": "21st",
      "name": "21st.dev",
      "kind": "catalog-community",
      "official_urls": [
        "https://21st.dev/",
        "https://github.com/serafimcloud/21st"
      ],
      "has_traditional_block_catalog": false,
      "grain": [
        "primitive",
        "region",
        "template"
      ],
      "response_model": [
        "catalog-select",
        "prompt-to-code"
      ],
      "interface_contract": "mixed",
      "official_counts": [
        {
          "value": null,
          "display": "12,000+",
          "unit": "crafted UI (components, templates, and themes — NOT a blocks count)",
          "grain": "mixed",
          "source_url": "https://21st.dev/",
          "verified": true,
          "notes": "本轮未能从官方页核实 blocks 数量。12,000+ 不得标成 blocks。"
        }
      ],
      "taxonomy": [
        {
          "name": "Hero sections",
          "count_display": "1.2K",
          "mixed": true
        },
        {
          "name": "Shaders",
          "count": 633
        },
        {
          "name": "Backgrounds",
          "count": 538
        },
        {
          "name": "Buttons",
          "count_display": "1.7K",
          "mixed": true
        },
        {
          "name": "AI chats",
          "count": 339
        },
        {
          "name": "Cards & grids",
          "count_display": "1.3K",
          "mixed": true
        },
        {
          "name": "Navigation",
          "count": 518
        },
        {
          "name": "Sign ins & widgets",
          "count": 84
        }
      ],
      "scenes": [
        "marketing-landing",
        "auth",
        "agent-chat",
        "media-content"
      ],
      "component_families": [
        "hero",
        "shader",
        "button",
        "ai-chat",
        "card",
        "navigation"
      ],
      "coverage_claim": "社区超大手工 UI 库；无统一粒度与统一数据接口。"
    },
    {
      "slug": "reui",
      "name": "ReUI",
      "kind": "catalog",
      "official_urls": [
        "https://reui.io/",
        "https://reui.io/docs",
        "https://reui.io/blocks"
      ],
      "has_traditional_block_catalog": true,
      "grain": [
        "primitive",
        "region",
        "template"
      ],
      "response_model": [
        "catalog-select",
        "prompt-to-code"
      ],
      "interface_contract": "mixed",
      "official_counts": [
        {
          "value": 678,
          "unit": "Pro blocks",
          "grain": "complete sections across 7 product-surface groups",
          "source_url": "https://reui.io/docs",
          "verified": true,
          "notes": "Application 305 + Data Grid 61 + Charts 54 + Solutions 82 + AI & Agents 22 + eCommerce 87 + Marketing 67 = 678"
        },
        {
          "value": 1265,
          "unit": "free component examples",
          "grain": "example, not block",
          "source_url": "https://reui.io/docs",
          "verified": true,
          "notes": "README 仍写 1,264，以官网/docs 为准"
        },
        {
          "value": 27,
          "unit": "in-house primitives",
          "grain": "primitive",
          "source_url": "https://github.com/keenthemes/reui",
          "verified": true,
          "notes": null
        }
      ],
      "taxonomy": [
        {
          "name": "Application",
          "count": 305
        },
        {
          "name": "Data Grid",
          "count": 61
        },
        {
          "name": "Charts",
          "count": 54
        },
        {
          "name": "Solutions",
          "count": 82
        },
        {
          "name": "AI & Agents",
          "count": 22
        },
        {
          "name": "eCommerce",
          "count": 87
        },
        {
          "name": "Marketing",
          "count": 67
        },
        {
          "name": "App Shell (under Application)",
          "count": 36
        },
        {
          "name": "Auth",
          "count": 20
        },
        {
          "name": "Dashboard",
          "count": 8
        },
        {
          "name": "Settings",
          "count": 16
        },
        {
          "name": "Onboarding",
          "count": 9
        },
        {
          "name": "Gantt",
          "count": 4
        },
        {
          "name": "Kanban Board",
          "count": 10
        }
      ],
      "scenes": [
        "dashboard-admin",
        "auth",
        "commerce",
        "marketing-landing",
        "agent-chat",
        "settings",
        "onboarding"
      ],
      "component_families": [
        "app-shell",
        "data-grid",
        "chart",
        "gantt",
        "kanban",
        "auth",
        "marketing"
      ],
      "coverage_claim": "声称覆盖 SaaS、marketing、AI、eCommerce、fintech、dashboards、developer tools。复杂应用表面相对更厚。"
    },
    {
      "slug": "efferd",
      "name": "Efferd",
      "kind": "catalog",
      "official_urls": [
        "https://efferd.com/",
        "https://efferd.com/docs",
        "https://efferd.com/pricing"
      ],
      "has_traditional_block_catalog": true,
      "grain": [
        "region",
        "page"
      ],
      "response_model": [
        "catalog-select",
        "prompt-to-code"
      ],
      "interface_contract": "baked-demo",
      "official_counts": [
        {
          "value": null,
          "display": "197+",
          "unit": "blocks (pricing-page wording)",
          "grain": "region / starting layout",
          "source_url": "https://efferd.com/pricing",
          "verified": false,
          "notes": "带加号，不是精确点算；首页可见分类加总约 137，对不上。本轮未能核实精确总数。"
        }
      ],
      "taxonomy": [
        {
          "name": "Auth",
          "count": 14
        },
        {
          "name": "Hero Sections",
          "count": 9,
          "notes": "+3 Free also mentioned"
        },
        {
          "name": "Features",
          "count": 10
        },
        {
          "name": "Dashboard",
          "count": 14
        },
        {
          "name": "App Shell",
          "count": 14
        },
        {
          "name": "Header Footer",
          "count": 14
        },
        {
          "name": "Call to Action",
          "count": 20
        },
        {
          "name": "Integrations",
          "count": 12
        },
        {
          "name": "Logo Cloud",
          "count": 11
        },
        {
          "name": "Faqs",
          "count": 8
        },
        {
          "name": "Contact",
          "count": 11
        }
      ],
      "scenes": [
        "marketing-landing",
        "auth",
        "dashboard-admin"
      ],
      "component_families": [
        "auth",
        "hero",
        "features",
        "app-shell",
        "cta"
      ],
      "coverage_claim": "精选 shadcn 起始块 + agent 安装，不是巨型目录。"
    },
    {
      "slug": "kibo",
      "name": "Kibo UI",
      "kind": "catalog",
      "official_urls": [
        "https://www.kibo-ui.com/",
        "https://www.kibo-ui.com/docs",
        "https://www.kibo-ui.com/blocks"
      ],
      "has_traditional_block_catalog": true,
      "grain": [
        "primitive",
        "region"
      ],
      "response_model": [
        "catalog-select"
      ],
      "interface_contract": "baked-demo",
      "official_counts": [
        {
          "value": 28,
          "unit": "blocks",
          "grain": "prebuilt sections",
          "source_url": "https://www.kibo-ui.com/blocks",
          "verified": true,
          "notes": "导航与 /blocks 链接数均为 28"
        },
        {
          "value": 41,
          "unit": "components",
          "grain": "higher-level primitives",
          "source_url": "https://www.kibo-ui.com/components",
          "verified": true,
          "notes": "41 条 /components 链接"
        },
        {
          "value": 1101,
          "unit": "patterns",
          "grain": "unverified",
          "source_url": "https://www.kibo-ui.com/",
          "verified": false,
          "notes": "导航文案 1101；粒度本轮未打开专页核实，不得画成 1101 blocks"
        }
      ],
      "taxonomy": [
        {
          "name": "Applications (collaborative-canvas, codebase, roadmap)"
        },
        {
          "name": "Websites (hero, pricing, faq, feature, footer, …)"
        }
      ],
      "scenes": [
        "marketing-landing",
        "dashboard-admin"
      ],
      "component_families": [
        "gantt",
        "kanban",
        "dropzone",
        "editor",
        "table",
        "ai-chat",
        "hero"
      ],
      "coverage_claim": "组件层补 shadcn 缺口；28 个 blocks 多为营销 section + 少数应用演示。"
    },
    {
      "slug": "ai-elements",
      "name": "AI Elements",
      "kind": "optional-contrast",
      "official_urls": [
        "https://ui.shadcn.com/docs/ai-elements",
        "https://elements.ai-sdk.dev/"
      ],
      "has_traditional_block_catalog": false,
      "grain": [
        "region"
      ],
      "grain_notes": "官方单位是 pattern，不是 block。",
      "response_model": [
        "catalog-select"
      ],
      "interface_contract": "baked-demo",
      "official_counts": [
        {
          "value": null,
          "unit": "patterns (not blocks)",
          "grain": "agentic UI patterns",
          "source_url": "https://ui.shadcn.com/docs/ai-elements",
          "verified": false,
          "notes": "本轮不对 pattern 做数量统计；原站称 2026-11 月底弃用并迁往 shadcn/ui"
        }
      ],
      "taxonomy": [
        {
          "name": "Chat"
        },
        {
          "name": "Message"
        },
        {
          "name": "Reasoning"
        },
        {
          "name": "Tool"
        },
        {
          "name": "Plan"
        },
        {
          "name": "Queue"
        }
      ],
      "scenes": [
        "agent-chat"
      ],
      "component_families": [
        "chat",
        "message",
        "reasoning",
        "tool",
        "plan"
      ],
      "coverage_claim": "可复制的 agent 界面模式，不是 query 运行时生成，也不是营销 block 目录。"
    }
  ],
  "scene_clusters": [
    {
      "id": "marketing-landing",
      "label_zh": "营销 / 落地页",
      "reading_zh": "最拥挤的簇；数字最大，但几乎全是 section 变体，不能与 page 数并列。",
      "members": [
        {
          "slug": "shadcnblocks",
          "note": "Hero 292、Feature 334、Pricing 96、CTA 56"
        },
        {
          "slug": "aceternity",
          "note": "Hero 27+、Feature 24+、Pricing 7+、CTA 7+（均带加号）"
        },
        {
          "slug": "tailark",
          "note": "公开 registry：hero-section 20、features 16 等全部为变体"
        },
        {
          "slug": "efferd",
          "note": "Hero 9（+3 Free）、Features 10、CTA 20"
        },
        {
          "slug": "kibo",
          "note": "hero / pricing / cta / feature 等预组合 section，无逐类计数"
        },
        {
          "slug": "reui",
          "note": "Marketing 组 67"
        },
        {
          "slug": "21st",
          "note": "Hero sections 1.2K，混合库存，不是 blocks 数"
        }
      ],
      "non_members_note": "HOS7 只有通用 top-banner，没有 pricing/CTA/testimonial 营销目录。官方 shadcn 与生成式栈也不是这个市场。"
    },
    {
      "id": "auth",
      "label_zh": "登录 / 注册",
      "reading_zh": "跨源最稳定的近整页簇；但最小可安装单位仍不同。",
      "members": [
        {
          "slug": "shadcn",
          "note": "login 5 + signup 5 整页起始布局"
        },
        {
          "slug": "shadcnblocks",
          "note": "Login 8、Signup 10，另有 Forgot Password 等分散变体，不要加总冒充单一 auth 数"
        },
        {
          "slug": "tailark",
          "note": "login-blocks 11、sign-up 11"
        },
        {
          "slug": "aceternity",
          "note": "Login and Signup Sections 7+"
        },
        {
          "slug": "efferd",
          "note": "Auth 14"
        },
        {
          "slug": "reui",
          "note": "Auth 20"
        },
        {
          "slug": "21st",
          "note": "Sign ins & widgets 84，混合组件"
        }
      ]
    },
    {
      "id": "dashboard-admin",
      "label_zh": "后台 / 应用壳",
      "reading_zh": "深度分化最大：有人只给壳，有人给 Data Grid / Gantt / Kanban。ReUI 的 Data Grid 是与 Application 并列的组，不是 Application 的子集。",
      "members": [
        {
          "slug": "shadcn",
          "note": "dashboard-01 + sidebar-01…16"
        },
        {
          "slug": "shadcnblocks",
          "note": "Application Shell 47、Dashboard 31、Data Table 32、Sidebar 21、Kanban 3、Gantt 1"
        },
        {
          "slug": "reui",
          "note": "Application 305（其中 App Shell 36、Dashboard 8）；并列组 Data Grid 61、Charts 54、Gantt 4、Kanban 10"
        },
        {
          "slug": "efferd",
          "note": "Dashboard 14、App Shell 14"
        },
        {
          "slug": "kibo",
          "note": "collaborative-canvas、codebase、roadmap；组件层含 Gantt/Kanban/Table"
        }
      ],
      "non_members_note": "HOS7 是移动 settings/list/page-shell，不是桌面后台。CopilotKit/OpenUI 可在运行时组合仪表盘，但没有 dashboard block 目录。"
    },
    {
      "id": "commerce",
      "label_zh": "电商 / 交易",
      "reading_zh": "几乎只有商业套件在做；HOS7 的书/游戏货架是内容消费，不是交易链。",
      "members": [
        {
          "slug": "shadcnblocks",
          "note": "Product List 44、Product Detail 52、Checkout 11、Shopping Cart 17 等"
        },
        {
          "slug": "reui",
          "note": "eCommerce 组 87"
        }
      ]
    },
    {
      "id": "media-content",
      "label_zh": "媒体 / 内容",
      "reading_zh": "同名不同义：HOS7 是消费界面，其余多是营销内容区，不能合并计数。",
      "members": [
        {
          "slug": "hos7",
          "note": "music-recommended、top-songs、movie-grid-card、today-movie-list、new-book-preview、my-game-review"
        },
        {
          "slug": "shadcnblocks",
          "note": "Blog 134、Blog Post 42、Gallery 142"
        },
        {
          "slug": "aceternity",
          "note": "Blog 4+、Blog Content 2+、Illustrations 22+"
        },
        {
          "slug": "tailark",
          "note": "blog-blocks、content 变体族"
        },
        {
          "slug": "kibo",
          "note": "blog、blogpost"
        },
        {
          "slug": "21st",
          "note": "Galleries & 3D、Cards & grids 1.3K（混合）"
        }
      ]
    },
    {
      "id": "settings",
      "label_zh": "设置",
      "reading_zh": "跨源存在但薄；HOS7 是移动设置页，商业套件是后台设置区。",
      "members": [
        {
          "slug": "hos7",
          "note": "settings-page、mobile-settings、services-setting（均为 demo page-type 或相关）"
        },
        {
          "slug": "shadcnblocks",
          "note": "Settings Profile 9、Members 5、Notifications 4、Integrations 10"
        },
        {
          "slug": "reui",
          "note": "Settings 16"
        }
      ]
    },
    {
      "id": "agent-chat",
      "label_zh": "Agent / 生成式界面",
      "reading_zh": "唯一一个目录规模几乎不相关的簇；能力由运行时或协议决定。",
      "members": [
        {
          "slug": "copilotkit",
          "note": "六种生成式 UI 原语；standard catalog 69 个组件（非 blocks）"
        },
        {
          "slug": "openui-thesys",
          "note": "OpenUI Lang + 开发者提供的 component library；无 block 计数"
        },
        {
          "slug": "ai-elements",
          "note": "Chat/Message/Reasoning/Tool/Plan/Queue 等 pattern"
        },
        {
          "slug": "21st",
          "note": "AI chats 339"
        },
        {
          "slug": "reui",
          "note": "AI & Agents 组 22"
        },
        {
          "slug": "kibo",
          "note": "文档提到 AI chat primitives，组件层，无独立 block 计数"
        }
      ]
    }
  ],
  "component_families_crosswalk": [
    {
      "family_id": "app-shell",
      "label_zh": "应用壳",
      "comparability": "相对最高：都指可承载页面的壳，但移动底栏壳 ≠ 桌面 sidebar 壳",
      "sources": [
        {
          "slug": "hos7",
          "note": "app-shell 出现在 16 个 block 的 registryDependencies"
        },
        {
          "slug": "shadcn",
          "note": "sidebar-01..16"
        },
        {
          "slug": "shadcnblocks",
          "note": "Application Shell 47、Sidebar 21"
        },
        {
          "slug": "reui",
          "note": "App Shell 36"
        },
        {
          "slug": "efferd",
          "note": "App Shell 14"
        }
      ]
    },
    {
      "family_id": "hero",
      "label_zh": "Hero / 首屏",
      "comparability": "低：营销 hero 变体库存 vs HOS7 通用 top-banner",
      "sources": [
        {
          "slug": "hos7",
          "note": "top-banner / big-image-card，无营销 hero 计数"
        },
        {
          "slug": "shadcnblocks",
          "note": "Hero 292"
        },
        {
          "slug": "aceternity",
          "note": "Hero Sections 27+"
        },
        {
          "slug": "tailark",
          "note": "hero-section 20"
        },
        {
          "slug": "efferd",
          "note": "Hero 9"
        }
      ]
    },
    {
      "family_id": "auth-form",
      "label_zh": "认证表单",
      "comparability": "产品表面一致，粒度仍不同（整页 vs section 变体）",
      "sources": [
        {
          "slug": "shadcn",
          "note": "login 5 + signup 5"
        },
        {
          "slug": "shadcnblocks",
          "note": "Login 8、Signup 10"
        },
        {
          "slug": "tailark",
          "note": "11 + 11"
        },
        {
          "slug": "efferd",
          "note": "Auth 14"
        },
        {
          "slug": "reui",
          "note": "Auth 20"
        },
        {
          "slug": "aceternity",
          "note": "7+"
        }
      ]
    },
    {
      "family_id": "data-grid",
      "label_zh": "表格 / Data Grid",
      "comparability": "桌面后台深度族；HOS7 无对应物",
      "sources": [
        {
          "slug": "shadcn",
          "note": "dashboard-01 内含 DataTable"
        },
        {
          "slug": "shadcnblocks",
          "note": "Data Table 32"
        },
        {
          "slug": "reui",
          "note": "Data Grid 组 61"
        },
        {
          "slug": "kibo",
          "note": "Table 组件（无独立 block 计数）"
        }
      ]
    },
    {
      "family_id": "gantt-kanban",
      "label_zh": "Gantt / Kanban",
      "comparability": "复杂应用表面的试金石；大目录在这里往往很薄",
      "sources": [
        {
          "slug": "shadcnblocks",
          "note": "Gantt 1、Kanban 3"
        },
        {
          "slug": "reui",
          "note": "Gantt 4、Kanban Board 10"
        },
        {
          "slug": "kibo",
          "note": "有 Gantt、Kanban 组件"
        }
      ]
    },
    {
      "family_id": "chart",
      "label_zh": "图表",
      "comparability": "横切族；shadcn 把大量 chart 变体放进 registry:block",
      "sources": [
        {
          "slug": "shadcn",
          "note": "new-york-v4 的 97 个 registry:block 含大量 chart-*"
        },
        {
          "slug": "reui",
          "note": "Charts 组 54"
        },
        {
          "slug": "shadcnblocks",
          "note": "Chart Card 27 + Chart Group 15"
        },
        {
          "slug": "hos7",
          "note": "无 chart block；数据展示是 stat-summary / heatmap / timeline / world-map"
        },
        {
          "slug": "copilotkit",
          "note": "标准目录含 charts"
        }
      ]
    },
    {
      "family_id": "chat-message",
      "label_zh": "Chat / Message",
      "comparability": "运行时族，不能用静态 block 数衡量",
      "sources": [
        {
          "slug": "copilotkit",
          "note": "六原语 + 可换肤聊天组件"
        },
        {
          "slug": "openui-thesys",
          "note": "openuiChatLibrary 等运行时库"
        },
        {
          "slug": "ai-elements",
          "note": "pattern 层"
        },
        {
          "slug": "21st",
          "note": "AI chats 339"
        },
        {
          "slug": "reui",
          "note": "AI & Agents 22"
        }
      ]
    }
  ],
  "insight_cards": [
    {
      "id": "i1-69-coincidence",
      "title_zh": "“69 对 69”是巧合，不是同类",
      "status": "established",
      "body_zh": "HOS7 的 69 是混粒度 blocks；CopilotKit 的 69 是 standard catalog 组件。禁止并列成同一量纲。",
      "evidence_pointers": [
        "evidence/hos7.md",
        "evidence/copilotkit.md",
        "NOTES.md"
      ]
    },
    {
      "id": "i2-grain-mismatch",
      "title_zh": "Block 不是同一个计量单位",
      "status": "established",
      "body_zh": "同一词可能指卡片、section、整页或模板。跨源计数在粒度对齐前不可读。",
      "evidence_pointers": [
        "evidence/hos7.md",
        "evidence/shadcn.md",
        "evidence/reui.md",
        "evidence/shadcnblocks.md"
      ]
    },
    {
      "id": "i3-shadcn-small-by-design",
      "title_zh": "官方 shadcn 的“小”是产品选择",
      "status": "established",
      "body_zh": "从 dashboard 与 authentication 起始布局起步，公开具名块 27（索引 30 含 preview）。不是覆盖失败。",
      "evidence_pointers": [
        "https://ui.shadcn.com/docs/changelog/2024-03-blocks",
        "evidence/shadcn.md"
      ]
    },
    {
      "id": "i4-variant-inflation",
      "title_zh": "商业数字膨胀的可见机制是变体堆叠",
      "status": "established",
      "body_zh": "Tailark 264 个 block 全是序号变体；Shadcnblocks Hero 292、Feature 334。这度量的是视觉库存，不是 2866 种互斥场景。去重后差距有多大仍是假设。",
      "evidence_pointers": [
        "evidence/tailark.md",
        "evidence/shadcnblocks.md"
      ]
    },
    {
      "id": "i5-official-n-not-census",
      "title_zh": "“官方 N”经常不是可复现测量",
      "status": "established",
      "body_zh": "Aceternity 183+/182 冲突；Efferd 197+ 与首页加总对不上；能加总对上的主要是 HOS7 69、ReUI 678、Kibo 28。",
      "evidence_pointers": [
        "evidence/aceternity.md",
        "evidence/efferd.md",
        "evidence/reui.md",
        "evidence/kibo.md"
      ]
    },
    {
      "id": "i6-runtime-not-catalog",
      "title_zh": "生成式 UI 的灵活性来自运行时，不来自目录规模",
      "status": "established",
      "body_zh": "CopilotKit / OpenUI 没有传统 block 目录。OpenUI 官方要求 Limit library size：组件越多，提示词与选择噪声越大。",
      "evidence_pointers": [
        "evidence/copilotkit.md",
        "https://www.openui.com/docs/openui-lang/defining-components"
      ]
    },
    {
      "id": "i7-layer-split",
      "title_zh": "层级拆得越清楚，数字越可比",
      "status": "established",
      "body_zh": "ReUI 的 example / block / template 梯子是本轮最干净的定义。HOS7 已有 ui / block / blueprint 雏形，但 block 内部仍混层。",
      "evidence_pointers": [
        "evidence/reui.md",
        "evidence/hos7.md"
      ]
    },
    {
      "id": "i8-hos7-mixed-grain",
      "title_zh": "HOS7 的 69 是混粒度目录",
      "status": "established",
      "body_zh": "14 整页 + 55 区域；区域里还有卡片单元。69 既不能读成 69 个屏幕，也不能读成 69 个 section。",
      "evidence_pointers": [
        "/workspace/repos/HOS7/docs/blocks.md",
        "evidence/hos7.md"
      ]
    },
    {
      "id": "i9-demo-route-tension",
      "title_zh": "page-type 全是 demo，与 route 入口存在张力",
      "status": "established",
      "body_zh": "事实已成立：14 个可路由整页全部 baked demo。安装后要改多少才可运行，仍是假设 H4。",
      "evidence_pointers": [
        "evidence/hos7.md",
        "/workspace/repos/HOS7/docs/blocks.md"
      ]
    },
    {
      "id": "i10-hos7-mobile-bias",
      "title_zh": "HOS7 场景偏置是移动内容消费",
      "status": "established",
      "body_zh": "音乐/影视/图书/云服务与移动壳是主簇，没有营销落地页家族。",
      "evidence_pointers": [
        "evidence/hos7.md"
      ]
    },
    {
      "id": "i11-width-vs-depth",
      "title_zh": "目录“覆盖”是宽度叙事，深度极不均匀",
      "status": "established",
      "body_zh": "Shadcnblocks 有 2866 但 Gantt 仅 1、Kanban 3。ReUI 在 Data Grid / Gantt / Agents 上明显更厚。",
      "evidence_pointers": [
        "evidence/shadcnblocks.md",
        "evidence/reui.md"
      ]
    },
    {
      "id": "i12-clusters-not-counts",
      "title_zh": "场景簇可以组织导航，不能做跨源计数",
      "status": "established",
      "body_zh": "auth、dashboard、marketing 等簇真实存在，但簇内粒度不同质。簇是分析映射，不是官方 taxonomy。",
      "evidence_pointers": [
        "insights.md §1.12",
        "viz-data.json#scene_clusters"
      ]
    },
    {
      "id": "i13-three-contracts",
      "title_zh": "接口已分成源码复制、data-props、runtime-props 三条路",
      "status": "established",
      "body_zh": "HOS7 是唯一把 component|demo 做成官方 kind 的样本，但最高层 page-type 全是 demo。排列组合只在粒度一致且 data-driven 时才成立——后半句作为机制仍待 H2 证伪。",
      "evidence_pointers": [
        "evidence/hos7.md",
        "evidence/reui.md",
        "evidence/copilotkit.md"
      ]
    }
  ],
  "unverified_or_do_not_merge": [
    {
      "id": "no-leaderboard",
      "display": "任何跨源 blocks 排行榜",
      "visual_action": "禁止无 grain/unit/verified 标注的条形排行；如需对照，用分组小 multiples 并分层标注"
    },
    {
      "id": "shadcn-27-30-97",
      "display": "27 / 30 / 97",
      "visual_action": "必须分层显示，不得合成一个官方 N"
    },
    {
      "id": "aceternity-182-183",
      "display": "183+ / 182",
      "visual_action": "并列两处官方文案，不取单一值"
    },
    {
      "id": "efferd-197plus",
      "display": "197+",
      "visual_action": "标为定价页用语；标注精确总数未核实"
    },
    {
      "id": "21st-12000",
      "display": "12,000+",
      "visual_action": "不得标成 blocks"
    },
    {
      "id": "tailark-264",
      "display": "264",
      "visual_action": "必须标明“公开 Base UI registry”，不得写成 Pro 全集"
    },
    {
      "id": "kibo-1101",
      "display": "1,101 patterns",
      "visual_action": "不得画成 1,101 blocks；粒度未核实"
    },
    {
      "id": "copilotkit-69-vs-hos7-69",
      "display": "69 vs 69",
      "visual_action": "禁止作为同量纲对比；一侧是 components，一侧是 blocks"
    },
    {
      "id": "reui-1264-1265",
      "display": "1,265（官网）/ 1,264（README）",
      "visual_action": "以官网为准并注明差 1"
    },
    {
      "id": "openui-lib-size",
      "display": "OpenUI 内置库大小",
      "visual_action": "显示为未核实，不填数字"
    },
    {
      "id": "agui-56",
      "display": "56 draft queries",
      "visual_action": "标注本轮未复算，不得用于覆盖率"
    },
    {
      "id": "shadcnblocks-2697-vs-2866",
      "display": "2,697+ Pro vs 2,866 总目录",
      "visual_action": "分开标注，不要混成一个数"
    }
  ],
  "next_step_hypotheses": [
    {
      "id": "H1",
      "hypothesis_zh": "粒度归一后，商业目录与官方 shadcn 的有效差距会大幅收缩",
      "falsify_if": "抽样映射到同一 archetype 后，互不重叠数仍相差 ≥5 倍",
      "related_insight_ids": [
        "i4-variant-inflation",
        "i2-grain-mismatch"
      ]
    },
    {
      "id": "H2",
      "hypothesis_zh": "垂类 demo 块的跨场景置换率显著低于通用 data-driven region",
      "falsify_if": "10 个垂类块 × 3 个非原生场景中，超过一半只换数据即可复用",
      "related_insight_ids": [
        "i13-three-contracts",
        "i10-hos7-mobile-bias"
      ]
    },
    {
      "id": "H3",
      "hypothesis_zh": "Query 覆盖会在少量高质量 frame 上饱和，新增变体主要提高长尾命中",
      "falsify_if": "覆盖随目录规模近似线性上升",
      "related_insight_ids": [
        "i4-variant-inflation"
      ],
      "blocker": "56 条 draft query 本轮未复算"
    },
    {
      "id": "H4",
      "hypothesis_zh": "page-type demo 路由在数据型 query 上需要重写大半内容",
      "falsify_if": "安装后达到可运行的文件改动比例中位数 <30%",
      "related_insight_ids": [
        "i9-demo-route-tension"
      ]
    },
    {
      "id": "H5",
      "hypothesis_zh": "Agent 选择准确率随目录增大而下降，除非有场景过滤或检索",
      "falsify_if": "在 28 / 69 / 264 / 678 上 top-1/top-3 不随 N 下降",
      "related_insight_ids": [
        "i6-runtime-not-catalog"
      ]
    },
    {
      "id": "H6",
      "hypothesis_zh": "场景簇在产品表面层稳定，在 section 层不稳定",
      "falsify_if": "section 层双人编码一致性并不低（例如 κ≥0.6）——按 insights 设计，κ<0.6 则假设成立",
      "related_insight_ids": [
        "i12-clusters-not-counts"
      ]
    },
    {
      "id": "H7",
      "hypothesis_zh": "data-props 块更适合装完即用，demo 块更适合抄结构",
      "falsify_if": "同一批任务下 demo 块更快且改动更少",
      "related_insight_ids": [
        "i13-three-contracts"
      ]
    }
  ],
  "query_coverage": {
    "status": "not_in_this_pass",
    "agui_test_set_draft_queries": {
      "claimed_in_plan": 56,
      "recounted_this_round": false,
      "may_use_for_coverage_conclusion": false
    },
    "do_not_answer": "我们需要 N 个 blocks"
  }
};
