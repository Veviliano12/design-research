function n(v) {
  return Number(v)
}

function PageFrame({ x, y, w, h, className = 'draft-muted', chrome = true }) {
  const x0 = n(x)
  const y0 = n(y)
  const w0 = n(w)
  const h0 = n(h)
  return (
    <g>
      <rect x={x0} y={y0} width={w0} height={h0} rx="3" className={className} />
      {chrome ? (
        <>
          <line x1={x0} y1={y0 + 8} x2={x0 + w0} y2={y0 + 8} className="draft-soft" />
          <circle cx={x0 + 6} cy={y0 + 4} r="1.1" className="draft-soft" />
          <circle cx={x0 + 11} cy={y0 + 4} r="1.1" className="draft-soft" />
          <circle cx={x0 + 16} cy={y0 + 4} r="1.1" className="draft-soft" />
        </>
      ) : null}
    </g>
  )
}

export function GateDraft() {
  return (
    <svg className="draft" viewBox="0 0 360 200" role="img" aria-label="完整页面里的视效可以通过，孤立的引擎场景照过不了关">
      <PageFrame x="22" y="28" w="168" h="132" className="draft-muted" />
      <rect x="36" y="52" width="140" height="92" rx="2" className="draft-fill-muted" />
      {/* Effect happening inside the finished page */}
      <ellipse cx="106" cy="98" rx="36" ry="22" className="draft-accent" />
      <path d="M80 98c8-16 18-24 26-24s18 8 26 24-18 24-26 24-18-8-26-24z" className="draft-accent" />
      <path d="M92 90c10-4 22-4 32 0" className="draft-accent" />
      <text x="106" y="176" textAnchor="middle" className="draft-label">页面 / 组件</text>

      {/* Isolated engine scene, crossed out */}
      <rect x="226" y="48" width="108" height="88" rx="3" className="draft-muted" />
      <path d="M248 108l20-28 20 16 18-24 22 36" className="draft-soft" />
      <path d="M248 116h64" className="draft-soft" />
      <path d="M238 56l84 72M322 56l-84 72" className="draft-accent" />
      <text x="280" y="156" textAnchor="middle" className="draft-label">引擎场景照</text>
      <text x="280" y="176" textAnchor="middle" className="draft-label-accent">过不了关</text>
    </svg>
  )
}

export function ClassifyDraft() {
  return (
    <svg className="draft" viewBox="0 0 360 200" role="img" aria-label="案例流向视效语言轴，动效不是分类轴">
      {/* Cases */}
      <rect x="18" y="36" width="44" height="28" rx="2" className="draft-muted" />
      <rect x="18" y="76" width="44" height="28" rx="2" className="draft-muted" />
      <rect x="18" y="116" width="44" height="28" rx="2" className="draft-muted" />
      <text x="40" y="176" textAnchor="middle" className="draft-label">案例</text>

      <path d="M66 50h46" className="draft-accent draft-flow" />
      <path d="M66 90h46" className="draft-accent draft-flow" />
      <path d="M66 130h46" className="draft-accent draft-flow" />

      {/* Language axis */}
      <line x1="128" y1="28" x2="128" y2="160" className="draft-accent" />
      <text x="138" y="24" className="draft-label-accent">语言</text>
      {[
        [40, '液态玻璃'],
        [70, '流体'],
        [100, '光与发光'],
        [130, '粒子'],
        [160, '后期'],
      ].map(([y, label]) => (
        <g key={label}>
          <line x1="124" y1={y} x2="132" y2={y} className="draft-accent" />
          <text x="138" y={y + 3} className="draft-label">
            {label}
          </text>
        </g>
      ))}

      {/* Motion is not an axis */}
      <rect x="248" y="78" width="92" height="36" rx="3" className="draft-muted" />
      <text x="294" y="100" textAnchor="middle" className="draft-label">
        动效
      </text>
      <path d="M258 86l72 20M330 86l-72 20" className="draft-accent" />
      <text x="294" y="132" textAnchor="middle" className="draft-label-accent">
        不是分类轴
      </text>
    </svg>
  )
}

export function WallDraft() {
  const pages = [
    { x: 16, pass: true },
    { x: 72, pass: true },
    { x: 128, pass: false },
    { x: 184, pass: true },
    { x: 240, pass: false },
  ]
  return (
    <svg className="draft" viewBox="0 0 360 200" role="img" aria-label="逐页检视，通过的进入墙，其余留在外面">
      <rect x="70" y="16" width="220" height="64" rx="3" className="draft-accent" />
      <text x="180" y="52" textAnchor="middle" className="draft-label-accent">
        已上墙
      </text>

      {pages.map((p, i) => (
        <g key={i}>
          <PageFrame x={p.x} y="118" w="46" h="44" className={p.pass ? 'draft-accent' : 'draft-muted'} />
          {p.pass ? (
            <>
              <path
                d={`M${p.x + 23} 118 V 80`}
                className="draft-accent draft-flow"
              />
              <path
                d={`M${p.x + 14} 140 l8 7 14-16`}
                className="draft-accent"
                strokeLinejoin="round"
                strokeLinecap="round"
              />
            </>
          ) : null}
        </g>
      ))}

      {/* Inspection flow along the row */}
      <path d="M16 176h270" className="draft-muted draft-flow" />
      <text x="84" y="192" className="draft-label">
        逐页看
      </text>
      <text x="300" y="146" className="draft-label">
        留在外面
      </text>
    </svg>
  )
}

export function CoverageDraft() {
  const steps = [
    { x: 16, label: '点亮' },
    { x: 118, label: '做了但不够' },
    { x: 220, label: '接近标杆' },
  ]
  return (
    <svg className="draft" viewBox="0 0 360 200" role="img" aria-label="对照自身分三层，已掌握被划掉">
      {steps.map((s, i) => (
        <g key={s.label}>
          <rect x={s.x} y="58" width="88" height="70" rx="3" className="draft-accent" />
          <text x={s.x + 44} y="98" textAnchor="middle" className="draft-label-accent">
            {s.label}
          </text>
          {i < steps.length - 1 ? (
            <path
              d={`M${s.x + 88} 93 h14`}
              className="draft-accent draft-flow"
            />
          ) : null}
        </g>
      ))}
      <rect x="86" y="148" width="188" height="32" rx="3" className="draft-muted" />
      <text x="180" y="168" textAnchor="middle" className="draft-label">
        已掌握
      </text>
      <path d="M98 156l164 16M262 156L98 172" className="draft-accent" />
    </svg>
  )
}

const DRAFTS = {
  gate: GateDraft,
  classify: ClassifyDraft,
  wall: WallDraft,
  coverage: CoverageDraft,
}

export function LineDraft({ id }) {
  const Comp = DRAFTS[id]
  return Comp ? <Comp /> : null
}
