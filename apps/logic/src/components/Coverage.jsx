import { findChapter } from '../nav/deckState.js'
import { categoryStagger } from '../tokens.js'
import { AccentTitle, Chain, KpiFoot, ProcessCard } from './Chrome.jsx'
import { SampleWire, StockWire } from './wireframes.jsx'

const POST_NOTE = '产品演示样张，不是页内后期语言'

export function coverageRows(catalog) {
  const attempted = catalog.selfScenes.find((s) => s.id === 'attempted')
  const unseen = catalog.selfScenes.find((s) => s.id === 'unseen')
  const attemptedBy = Object.fromEntries((attempted?.languages || []).map((l) => [l.id, l]))
  const unseenIds = new Set((unseen?.languages || []).map((l) => l.id))
  return catalog.languages.map((lang) => {
    const att = attemptedBy[lang.id]
    const state = att ? 'attempted' : unseenIds.has(lang.id) ? 'unseen' : 'unseen'
    return {
      id: lang.id,
      name: lang.name,
      short: lang.short,
      wall: lang.count,
      attempted: att?.count || 0,
      present: 0,
      near: 0,
      state,
      note: lang.id === 'post' && att ? POST_NOTE : '',
    }
  })
}

export function CoverageOverview({ catalog }) {
  const chapter = findChapter(catalog, 'coverage')
  const c = catalog.counts
  const rows = coverageRows(catalog)
  const attemptedN = rows.filter((r) => r.state === 'attempted').length
  const unseenN = rows.filter((r) => r.state === 'unseen').length
  const post = rows.find((r) => r.id === 'post')

  return (
    <section className="overview overview--coverage" aria-label="覆盖评测">
      <header className="overview-head">
        <p className="kicker">{chapter.subtitle}</p>
        <AccentTitle text={chapter.title} accent={chapter.accent} />
      </header>
      <Chain>
        <ProcessCard
          as="div"
          no="01"
          title="标杆库存"
          role={`123 张实拍，缺 ${c.missingCapture}。缺的那条用中性底板，不拿别的图顶上。`}
          foot={
            <KpiFoot
              items={[
                { value: c.onWall, label: '已上墙' },
                { value: c.languages, label: '种语言' },
              ]}
            />
          }
          delay={`${categoryStagger(0)}ms`}
        >
          <StockWire languages={catalog.languages} />
        </ProcessCard>
        <ProcessCard
          as="div"
          no="02"
          title="自身抽样"
          role={`设计 query 随机采样 ${c.reviewed} 页。三层都不等于已掌握。`}
          foot={
            <KpiFoot
              items={[
                { value: c.present, label: '点亮' },
                { value: c.nearBenchmark, label: '接近标杆' },
                { value: `${c.attempted}`, label: `做了但不够 · ${c.attemptedPages} 页` },
              ]}
            />
          }
          delay={`${categoryStagger(1)}ms`}
        >
          <SampleWire />
        </ProcessCard>
        <ProcessCard
          as="div"
          no="03"
          title="九种语言"
          role={
            post
              ? `图像与视频后期 ${post.attempted} 条是${POST_NOTE}。`
              : `未见 ${unseenN} 种语言。`
          }
          foot={
            <KpiFoot
              items={[
                { value: attemptedN, label: '种有尝试' },
                { value: unseenN, label: '种未见' },
              ]}
            />
          }
          delay={`${categoryStagger(2)}ms`}
        >
          <div className="cover-grid" aria-label="九种语言覆盖">
            {rows.map((row) => (
              <div key={row.id} className={`cover-cell is-${row.state}`}>
                <span className="cover-name">{row.short}</span>
                <span className="cover-state">
                  {row.state === 'attempted' ? `做了但不够 ${row.attempted}` : '未见'}
                </span>
              </div>
            ))}
          </div>
        </ProcessCard>
      </Chain>
    </section>
  )
}
