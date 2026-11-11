/* 设计研究 · 信息架构
 * 目录数据驱动左侧文档树。增改条目即可，不必改壳的 DOM。
 *
 * type:
 *   inventory   — 嵌入来源清单（vendor 快照，?embed=1）
 *   doc         — 平台文档页（sections/*.html 片段）
 *   placeholder — 空位
 *   alias       — 跳到已有路由，不另做一页（「设计资产来源」→ 清单总览）
 *   group       — 仅分组，不可打开
 *
 * scripts: 装载该页后按序加载的脚本（已加载的不会重复）。
 * wide: 内容区取消文档栏宽，供全景地图等宽版页使用。
 */
window.PLATFORM_NAV = {
  title: "设计研究",
  defaultRoute: "sources/list",
  tree: [
    {
      id: "vfx",
      label: "高阶视效",
      type: "group",
      children: [
        {
          id: "vfx/overview",
          label: "全景总览",
          type: "doc",
          src: "sections/vfx-overview.html",
          wide: true,
          scripts: ["data/vfx/map-cases.js", "js/vfx-util.js", "js/vfx-map.js"]
        },
        {
          id: "vfx/preview",
          label: "待吸收预览",
          type: "doc",
          src: "sections/vfx-preview.html",
          wide: true,
          scripts: ["data/vfx/preview-cases.js", "js/vfx-util.js", "js/vfx-preview.js"]
        },
        {
          id: "vfx/method",
          label: "定义与优先级",
          type: "doc",
          src: "sections/vfx-method.html"
        },
        {
          id: "vfx/sources",
          label: "视效来源",
          type: "group",
          children: [
            {
              id: "vfx/sources/official",
              label: "官方渠道",
              type: "doc",
              src: "sections/vfx-sources-official.html",
              wide: true,
              scripts: ["data/vfx/blocks.js", "data/vfx/sources-core.js", "js/vfx-util.js", "js/vfx-sources.js"]
            },
            {
              id: "vfx/sources/oss",
              label: "开源与组件库",
              type: "doc",
              src: "sections/vfx-sources-oss.html",
              wide: true,
              scripts: [
                "data/vfx/blocks.js",
                "data/vfx/sources-core.js",
                "data/vfx/sources-sites.js",
                "js/vfx-util.js",
                "js/vfx-sources.js"
              ]
            },
            {
              id: "vfx/sources/x",
              label: "X",
              type: "doc",
              src: "sections/vfx-sources-x.html",
              wide: true,
              scripts: ["data/vfx/blocks.js", "data/vfx/sources-x.js", "js/vfx-util.js", "js/vfx-sources.js"]
            },
            {
              id: "vfx/sources/atlas",
              label: "设计资产来源",
              type: "alias",
              to: "sources/list",
              jump: "清单总览"
            }
          ]
        }
      ]
    },
    {
      id: "sources",
      label: "来源清单",
      type: "group",
      children: [
        {
          id: "sources/list",
          label: "清单总览",
          type: "inventory",
          src: "vendor/design-atlas/index.html?embed=1"
        },
        {
          id: "sources/scoring",
          label: "打分规则",
          type: "doc",
          src: "sections/sources-scoring.html"
        },
        {
          id: "sources/northstar",
          label: "北极星问题",
          type: "doc",
          src: "sections/sources-northstar.html"
        }
      ]
    }
  ]
};
