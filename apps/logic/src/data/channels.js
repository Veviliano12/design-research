/** Real source channels that feed the research. No inventory totals. */

export const MAIN_CHANNELS = [
  {
    id: 'official',
    label: '官方渠道',
    short: '官方',
    line: '厂方 · 奖项',
    role: '厂方产品与规范，以及权威评选。',
    groups: [
      { name: '厂方', items: ['苹果', '谷歌', '鸿蒙', '微软'] },
      { name: '奖项', items: ['Awwwards', 'FWA', 'CSSDA'] },
      { name: '产品与案例', items: ['产品页', '已有案例', '经典实验'] },
    ],
  },
  {
    id: 'oss',
    label: '开源与组件库',
    short: '开源',
    line: '组件 · 画廊',
    role: '可核验的开源实验、组件库与案例画廊。',
    groups: [
      { name: '组件与实验', items: ['ThreeUI', 'Codrops Webzibition', 'Chrome Experiments'] },
      { name: '画廊', items: ['mesh3d', 'MUUUUU', 'Interact Gallery', 'Berkeley 案例库', 'HOVERSTAT.ES'] },
    ],
  },
  {
    id: 'x',
    label: 'X',
    short: 'X',
    line: '讨论与收获',
    role: '讨论、转发与收获是发现方式。页仍按条进入输入池，不把 X 库存加总成来源库总数。',
    groups: [{ name: '发现渠道', items: ['X'] }],
  },
]

export const SOURCE_AUTHORITY = [
  { id: 'producer', name: '出品方', weight: 30, hint: '大厂官方或该领域公认标准接近满分。' },
  { id: 'scale', name: '维护与规模', weight: 25, hint: '以已核实的星标与最近推送为准。' },
  { id: 'citation', name: '被引用', weight: 20, hint: '官方互链或行业默认入口最高。' },
  { id: 'docs', name: '文档与可核验', weight: 15, hint: '官网、文档、示例、许可、定价能否当场核对。' },
  { id: 'license', name: '许可与获取', weight: 10, hint: '许可证和获取方式是否清楚。' },
]
