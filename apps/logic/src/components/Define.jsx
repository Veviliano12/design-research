import { methodSources as S } from '../data/methodSources.js'
import { findChapter } from '../nav/deckState.js'
import { categoryStagger } from '../tokens.js'
import { ShortNav, TopBar } from './ui.jsx'
import { AccentTitle } from './Chrome.jsx'

function Src({ id, children }) {
  const src = S[id]
  return (
    <a className="src-link" href={src.href} target="_blank" rel="noopener noreferrer">
      {children || src.label}
    </a>
  )
}

const CRITERIA = [
  {
    id: 'default',
    no: '①',
    drill: 'origins',
    title: '是不是目标平台的默认能力，或规范要求每个产品都做到的',
    basic: '是',
    high: '平台默认之外、为了表现力额外加的',
  },
  {
    id: 'impl',
    no: '②',
    drill: 'origins',
    title: '实现是否超出标准 CSS',
    basic: '只用 CSS 就能做出来（含叠多层）',
    high: '需要 SVG 滤镜、Canvas、WebGL 或着色器',
  },
  {
    id: 'freq',
    no: '③',
    drill: 'bounds',
    title: '出现率校验',
    basic: '多数领域、多数产品都在用',
    high: '只有少数顶级产品在用',
    note: '校验，不单独作为入门条件',
  },
]

const DIMENSIONS = [
  {
    id: 'distinction',
    drill: 'hbr',
    name: '区分度',
    role: '价值',
    text: '是不是真能把画面从基础拉到高阶，是不是只有标杆在用。',
  },
  {
    id: 'reuse',
    drill: 'hbr',
    name: '复用面',
    role: '价值',
    text: '学会一次，能用在多少个 H5 页面上。',
  },
  {
    id: 'difficulty',
    drill: 'hbr',
    name: '难度',
    role: '投入',
    text: '人要调多久，AI 是不是很难一次写对。不单独决定它更值钱。',
  },
]

export function DefineOverview({ catalog, onOpen }) {
  const chapter = findChapter(catalog, 'define')
  return (
    <section className="overview overview--define" aria-label="定义与优先级">
      <header className="overview-head">
        <p className="kicker">{chapter.subtitle}</p>
        <AccentTitle text={chapter.title} accent={chapter.accent} />
      </header>

      <div className="define-board">
        <div className="define-pane enter-item" style={{ '--enter-delay': `${categoryStagger(0)}ms` }}>
          <header className="pane-head">
            <span className="card-no">01</span>
            <h2>什么算高阶视效</h2>
          </header>
          <div className="criteria-list">
            {CRITERIA.map((item) => (
              <button
                key={item.id}
                type="button"
                className="criterion-row"
                onClick={() => onOpen(item.drill)}
              >
                <span className="mini-no">{item.no}</span>
                <div className="criterion-main">
                  <h3>
                    {item.title}
                    {item.note ? <span className="mini-note">{item.note}</span> : null}
                  </h3>
                  <div className="criterion-poles">
                    <div className="pole is-basic">
                      <span className="col-label">基础</span>
                      <p>{item.basic}</p>
                    </div>
                    <div className="pole is-high">
                      <span className="col-label">高阶</span>
                      <p>{item.high}</p>
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
          <p className="verdict">
            <span>① 和 ② 都判基础</span>
            <span className="verdict-arrow" aria-hidden="true">
              →
            </span>
            <em>基础</em>
            <span className="verdict-sep">；</span>
            <span>有一条判高阶</span>
            <span className="verdict-arrow" aria-hidden="true">
              →
            </span>
            <em>高阶</em>
          </p>
        </div>

        <div className="define-pane enter-item" style={{ '--enter-delay': `${categoryStagger(1)}ms` }}>
          <header className="pane-head">
            <span className="card-no">02</span>
            <h2>先补什么</h2>
          </header>
          <p className="gate-line">
            <span className="gate-label">门禁</span>
            <span>目标场景里跑不起来的，先不进入当前补齐名单。</span>
          </p>
          <div className="dimension-row">
            {DIMENSIONS.map((item) => (
              <button
                key={item.id}
                type="button"
                className={`mini-card is-dim${item.id === 'difficulty' ? ' is-effort' : ''}`}
                onClick={() => onOpen(item.drill)}
              >
                <span className="dimension-role">{item.role}</span>
                <h3>{item.name}</h3>
                <p>{item.text}</p>
              </button>
            ))}
          </div>
          <p className="value-formula">
            <span>价值</span>
            <span className="value-eq">由</span>
            <em>区分度</em>
            <span className="value-op">×</span>
            <em>复用面</em>
            <span className="value-eq">决定</span>
          </p>
          <button type="button" className="quiet-link" onClick={() => onOpen('scenes')}>
            场景可以加权，但不替换分类
          </button>
        </div>
      </div>
    </section>
  )
}

export function DefineDetail({ catalog, capabilityId, onSelect, onClose }) {
  const drills = [...(catalog.defineDrills || []), ...(catalog.priorityDrills || [])]
  const cap = drills.find((item) => item.id === capabilityId) || drills[0]
  return (
    <div className="drill-shell">
      <TopBar
        left={null}
        center={<ShortNav items={drills} currentId={cap.id} onSelect={onSelect} />}
        onClose={onClose}
      />
      <div className="drill-body">
        <article className="detail-page detail-page--cap enter-item" key={cap.id}>
          <p className="kicker">
            {cap.no} {cap.short}
          </p>
          <h2>{cap.full}</h2>
          <div className="claim-detail-copy">
            {cap.id === 'origins' ? <OriginsBody /> : null}
            {cap.id === 'bounds' ? <BoundsBody /> : null}
            {cap.id === 'hbr' ? <HbrBody /> : null}
            {cap.id === 'scenes' ? <ScenesBody /> : null}
          </div>
        </article>
      </div>
    </div>
  )
}

function OriginsBody() {
  return (
    <>
      <p>
        Visual Effects Society 在 <Src id="ves" /> 里定义的是「视效」本身：为动态影像创造、改变或增强，且无法用常规实拍完成的画面。它不区分高阶还是基础。所以，高阶和基础的区分，必须是我们为 H5 落地页和轻应用立下的工作定义。
      </p>
      <p>同一套视觉语言，在系统里可能是默认能力，在 H5 里却要自己实现，判定以目标平台为准。</p>
      <section className="claim-block">
        <h3>为什么这样分得开</h3>
        <p>
          Apple 在 <Src id="appleHig" /> 里把材料分成标准材料和 Liquid Glass。<Src id="wwdc25" /> 写得很清楚：以往材料是散射光线，Liquid Glass 是实时弯曲、塑造和汇聚光线（lensing）。所以普通毛玻璃是基础，光学透镜语言不是。但要注意平台差异：在 iOS 上，Liquid Glass 已经是系统默认，按①它在苹果平台上是基础能力；在 H5 上浏览器并不提供这种透镜材质，要自己用着色器做，所以同一套视觉语言在这张地图里仍是高阶。
        </p>
        <p>
          Google 把 Material 3 分成 baseline 和 <Src id="materialExpressive" />，并写明 Expressive 是为了更有情绪冲击力的体验，不是系统最低要求。这是「默认规范」和「为表现力额外加强」的官方分法。
        </p>
        <p>
          Microsoft <Src id="fluentMaterial" /> 把 Acrylic、Mica 写成系统材料，用于临时层、窗口背景等常规层级。在 Windows 上调用系统 Acrylic 是平台默认；在 H5 里手写同等光学效果则不是。
        </p>
      </section>
      <p className="claim-src-row">
        实现路径可对照 <Src id="mdnBackdrop" />、<Src id="mdnCanvas" />、<Src id="mdnWebgl" />。
      </p>
    </>
  )
}

function BoundsBody() {
  return (
    <>
      <section className="claim-block">
        <h3>故意不放进这个定义的一条</h3>
        <p>
          「把效果去掉，页面还能否成立」区分的是核心还是装饰，不是高阶还是基础。装饰性的流体可以是高阶，核心的 3D 产品展示也可以是高阶。案例上可以注明「核心 / 装饰」，但不用来判定高阶。
        </p>
      </section>
      <section className="claim-block">
        <h3>什么算「顶级」标杆</h3>
        <p>依据仍是三条，至少满足其一：官方范例、权威评选（Apple Design Awards、Awwwards、FWA、CSS Design Awards 等）、你点名的产品或案例。</p>
      </section>
      <p>好看仍然是入图门槛。技术难或官方完整，本身都不够。</p>
      <p>
        什么算视效、什么不算，继续沿用已有结论：着色器、流体这类持续存在于画面里的算视效；页面转场和交互动画不算。这和 VES「创造、改变或增强画面」一致，也避免把动效、叙事做成分类。
      </p>
    </>
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
        <p>先过滤能不能在 H5 里用，再看区分度 × 复用面决定价值，用难度决定要不要提前投入。先给每个大类写定性说明，不打没有足够样本支撑的分数。</p>
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
      <p>真要加场景权重，应该用官方分类、已收集案例的分布，以及后续拿到的自身现状名单里的场景比例来作证，而不是先估一个百分比。</p>
    </>
  )
}
