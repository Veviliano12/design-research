import { methodSources as S } from '../data/methodSources.js'
import { findChapter } from '../nav/deckState.js'
import { ShortNav, TopBar } from './ui.jsx'
import { PriorityLegend } from './legend/PriorityLegend.jsx'

function Src({ id, children }) {
  const src = S[id]
  return (
    <a className="src-link" href={src.href} target="_blank" rel="noopener noreferrer">
      {children || src.label}
    </a>
  )
}

const DIMENSIONS = [
  {
    id: 'distinction',
    drill: 'hbr',
    name: '区分度',
    role: '价值',
    text: '这种视效是不是真能把画面从基础拉到高阶，是不是只有标杆在用。人人都会的，或只是平台默认的，先补没有意义。',
  },
  {
    id: 'reuse',
    drill: 'hbr',
    name: '复用面',
    role: '价值',
    text: '学会一次，能用在多少个 H5 页面上。流体着色器、液态玻璃材质通常复用面高；为一个产品定做的 3D 场景通常复用面低。',
  },
  {
    id: 'difficulty',
    drill: 'hbr',
    name: '难度',
    role: '投入',
    text: '人要调多久，AI 是不是很难一次写对。它决定要不要提前做成资产，不单独决定它更值钱。',
  },
]

export function PriorityOverview({ catalog, onOpen }) {
  if (import.meta.env.VITE_LOGIC_ONLY === 'true') {
    return <PriorityLegend catalog={catalog} onOpen={onOpen} />
  }
  const chapter = findChapter(catalog, 'priority')
  return (
    <section className="overview overview--claim overview--priority" aria-label="优先级总览">
      <header className="overview-head overview-head--claim">
        <p className="kicker">{chapter.subtitle}</p>
        <h1 className="display-title">{chapter.title}</h1>
        <p className="claim-lead">这不是「哪个更好看」。</p>
      </header>

      <p className="gate-line enter-item" style={{ '--enter-delay': '180ms' }}>
        <span className="gate-label">门禁</span>
        <span>目标场景里跑不起来的，先不进入当前补齐名单。</span>
      </p>

      <div className="priority-layout">
        <div className="dimension-grid">
          {DIMENSIONS.map((item, i) => (
            <button
              key={item.id}
              type="button"
              className={`dimension-card enter-item${item.id === 'difficulty' ? ' is-effort' : ''}`}
              style={{ '--enter-delay': `${300 + i * 120}ms` }}
              onClick={() => onOpen(item.drill)}
            >
              <span className="dimension-role">{item.role}</span>
              <h2>{item.name}</h2>
              <p>{item.text}</p>
            </button>
          ))}
        </div>
        <p className="value-formula enter-item" style={{ '--enter-delay': '520ms' }}>
          <span className="value-word">价值</span>
          <span className="value-eq">由</span>
          <span className="value-term">区分度</span>
          <span className="value-op">×</span>
          <span className="value-term">复用面</span>
          <span className="value-eq">决定</span>
        </p>
      </div>

      <div className="claim-notes enter-item" style={{ '--enter-delay': '640ms' }}>
        <p>
          液态玻璃、流体着色器、可复用的材质和布光，通常属于高杠杆。很难但只能用一次的定制 3D 场景，高级可以成立，杠杆反而不高。
        </p>
        <p>
          因此，「AI 很难写、要很久才调得好」只在区分度高、而且能复用时，才是高优先级。难但只能用一次的定制场景，优先级反而低；容易又能复用的可以很快补，但不是最稀缺的长板。
        </p>
        <button type="button" className="quiet-link" onClick={() => onOpen('hbr')}>
          来源与操作顺序
        </button>
      </div>
    </section>
  )
}

export function PriorityDetail({ catalog, capabilityId, onSelect, onClose }) {
  const drills = catalog.priorityDrills
  const cap = drills.find((c) => c.id === capabilityId) || drills[0]
  return (
    <div className="drill-shell">
      <TopBar
        left={null}
        center={<ShortNav items={drills} currentId={cap.id} onSelect={onSelect} />}
        onClose={onClose}
      />
      <div className="drill-body">
        <article className="detail-page detail-page--claim enter-item" key={cap.id}>
          <p className="kicker">
            {cap.no} {cap.short}
          </p>
          <h2>{cap.full}</h2>
          <div className="claim-detail-copy">
            {cap.id === 'hbr' ? <HbrBody /> : <ScenesBody />}
          </div>
        </article>
      </div>
    </div>
  )
}

function HbrBody() {
  return (
    <>
      <p>
        技能怎么排先后，已有可复核的做法。<Src id="hbr" /> 用两个量来排先学什么：效用（这个技能你会用得多频繁）和学会的时间。高效用、又要花较长时间的，应当专门安排去学；低效用又很费时的，要考虑是不是根本不学。
      </p>
      <p>写成目标就是：用学习或制作的时间，最大化「能用上、且能把画面从基础拉到接近标杆」的能力。把这些放到这个目标上，就得到三个排序维度，外加一道门禁。</p>
      <section className="claim-block">
        <h3>操作顺序</h3>
        <p>
          先过滤能不能在 H5 里用，再看区分度 × 复用面决定价值，用难度决定要不要提前投入。先给每个大类写定性说明，不打没有足够样本支撑的分数。
        </p>
      </section>
      <section className="claim-block">
        <h3>三个维度</h3>
        <p>区分度来自判据①、③，以及「选长板」。复用面就是上面说的效用，也是学习迁移。达到标杆的难度，就是学会的时间。</p>
      </section>
    </>
  )
}

function ScenesBody() {
  return (
    <>
      <p>
        高频或高冲击的场景可以给复用面加权，但场景仍是入口和权重，不替换视效语言分类。地图的纵轴始终是视效语言，横轴是整页 / 组件；场景用来筛选，也可以在排优先级时加重某些格子的复用面。
      </p>
      <p>
        目前场景是从 <Src id="openaiShowcase" /> 的官方用例归出来的，<Src id="claudeArtifacts" /> 只作旁证。我们并没有公开的生成量统计，所以还不能写成「大部分 H5 都是某某场景」。
      </p>
      <p>
        真要加场景权重，应该用官方分类、已收集案例的分布，以及后续拿到的自身现状名单里的场景比例来作证，而不是先估一个百分比。
      </p>
    </>
  )
}
