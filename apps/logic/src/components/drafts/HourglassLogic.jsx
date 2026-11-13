import { categoryStagger, tokens } from '../../tokens.js'

const VW = 1760
const VH = 800
const CY = 400

const X = {
  source: 96,
  neckIn: 308,
  gate: 404,
  neckOut: 508,
  classify: 604,
  fan: 820,
  rejoin: 1048,
  chamberL: 1092,
  chamberR: 1372,
  coverBox: 1488,
}

const NECK_HALF = 26
const FAN = 248
const CH_TOP = 228
const CH_BOT = 572
const LIGHT_MS =
  tokens.motion.categoryStaggerBaseMs +
  3 * tokens.motion.categoryStaggerStepMs +
  tokens.motion.itemEnterMs

const COMPACT_SHORT = {
  'liquid-glass': '玻璃',
  'fluid-shader': '流体',
  light: '光',
  particles: '粒子',
  post: '后期',
  generative: '生成',
  'realtime-object': '材质',
  'realtime-world': '世界',
  physics: '物理',
}

const NODE_W = 168
const NODE_H = 48

function n(v) {
  return Number(v)
}

function contourPath() {
  const topN = CY - NECK_HALF
  const botN = CY + NECK_HALF
  const fanTop = CY - FAN - 22
  const fanBot = CY + FAN + 22
  const cL = X.chamberL
  const cR = X.chamberR
  return [
    `M 86 132`,
    `C 160 132, 236 286, ${X.neckIn} ${topN}`,
    `L ${X.neckOut} ${topN}`,
    `C 600 ${topN}, 668 ${fanTop + 16}, ${X.fan} ${fanTop}`,
    `C 968 ${fanTop + 16}, 1010 ${topN}, ${X.rejoin} ${topN}`,
    `C 1068 ${topN}, 1078 ${CH_TOP}, ${cL + 28} ${CH_TOP}`,
    `L ${cR - 28} ${CH_TOP}`,
    `C ${cR} ${CH_TOP}, ${cR} ${CH_TOP + 28}, ${cR} ${CH_TOP + 48}`,
    `L ${cR} ${CH_BOT - 48}`,
    `C ${cR} ${CH_BOT - 28}, ${cR} ${CH_BOT}, ${cR - 28} ${CH_BOT}`,
    `L ${cL + 28} ${CH_BOT}`,
    `C 1078 ${CH_BOT}, 1068 ${botN}, ${X.rejoin} ${botN}`,
    `C 1010 ${botN}, 968 ${fanBot - 16}, ${X.fan} ${fanBot}`,
    `C 668 ${fanBot - 16}, 600 ${botN}, ${X.neckOut} ${botN}`,
    `L ${X.neckIn} ${botN}`,
    `C 236 514, 160 668, 86 668`,
    `C 52 668, 40 630, 40 570`,
    `L 40 230`,
    `C 40 170, 52 132, 86 132`,
    'Z',
  ].join(' ')
}

function intakeSources() {
  const dys = [-198, -132, -66, 0, 66, 132, 198]
  return dys.map((dy, i) => {
    const x0 = X.source - Math.abs(dy) * 0.08
    const y0 = CY + dy
    return {
      i,
      x0,
      y0,
      hideCompact: i === 1 || i === 5,
      path: `M ${x0 + 40} ${y0} C ${x0 + 118} ${y0}, ${X.neckIn - 24} ${CY + dy * 0.16}, ${X.neckIn} ${CY}`,
    }
  })
}

function languageChannels(count) {
  return Array.from({ length: count }, (_, i) => {
    const t = count === 1 ? 0 : i / (count - 1)
    const midY = CY + (t - 0.5) * 2 * FAN
    const x0 = X.neckOut
    const xMid = X.fan
    const x1 = X.rejoin
    return {
      i,
      midX: xMid,
      midY,
      path: `M ${x0} ${CY} C ${x0 + 90} ${CY}, ${xMid - 90} ${midY}, ${xMid} ${midY} C ${xMid + 90} ${midY}, ${x1 - 90} ${CY}, ${x1} ${CY}`,
    }
  })
}

const SPINE = [
  `M ${X.source + 40} ${CY}`,
  `C ${X.source + 118} ${CY}, ${X.neckIn - 24} ${CY}, ${X.neckIn} ${CY}`,
  `L ${X.neckOut} ${CY}`,
  `C ${X.neckOut + 90} ${CY}, ${X.fan - 90} ${CY}, ${X.fan} ${CY}`,
  `C ${X.fan + 90} ${CY}, ${X.rejoin - 90} ${CY}, ${X.rejoin} ${CY}`,
  `L ${X.chamberR} ${CY}`,
  `L ${X.coverBox} ${CY}`,
].join(' ')

function MiniPage({ x, y, w, h, className = 'draft-muted', chrome = true }) {
  const x0 = n(x)
  const y0 = n(y)
  const w0 = n(w)
  const h0 = n(h)
  return (
    <g pointerEvents="none">
      <rect x={x0} y={y0} width={w0} height={h0} rx="6" className={className} />
      {chrome ? <path d={`M ${x0 + 5} ${y0 + h0 * 0.22} h ${w0 - 10}`} className="draft-soft" /> : null}
    </g>
  )
}

function Cross({ x, y, w, h }) {
  const x0 = n(x)
  const y0 = n(y)
  const w0 = n(w)
  const h0 = n(h)
  return (
    <path
      d={`M ${x0} ${y0} L ${x0 + w0} ${y0 + h0} M ${x0 + w0} ${y0} L ${x0} ${y0 + h0}`}
      className="draft-accent"
      strokeLinecap="round"
    />
  )
}

function SceneSketch({ x, y, w, h }) {
  const x0 = n(x)
  const y0 = n(y)
  const w0 = n(w)
  const h0 = n(h)
  const x2 = x0 + w0
  const mid = y0 + h0 * 0.62
  return (
    <g pointerEvents="none">
      <rect x={x0} y={y0} width={w0} height={h0} rx="6" className="draft-muted" />
      <path
        d={`M ${x0 + 10} ${mid} L ${x0 + w0 * 0.28} ${y0 + h0 * 0.34} L ${x0 + w0 * 0.48} ${y0 + h0 * 0.5} L ${x0 + w0 * 0.68} ${y0 + h0 * 0.3} L ${x2 - 10} ${mid}`}
        className="draft-soft"
      />
      <path d={`M ${x0 + 10} ${mid} H ${x2 - 10} V ${y0 + h0 - 10} H ${x0 + 10} Z`} className="draft-soft" />
    </g>
  )
}

const LANG_LIFT = 14

function ChannelLabel({ x, y, full, short, count }) {
  const x0 = n(x)
  const y0 = n(n(y) - LANG_LIFT)
  return (
    <g pointerEvents="none">
      <text
        x={x0}
        y={y0}
        textAnchor="middle"
        dominantBaseline="middle"
        className="draft-label-accent hg-label-full hg-lang-halo"
      >
        {full}
        <tspan className="draft-label hg-lang-count" dx="8">
          {count}
        </tspan>
      </text>
      <text
        x={x0}
        y={y0}
        textAnchor="middle"
        dominantBaseline="middle"
        className="draft-label-accent hg-label-short hg-lang-halo"
      >
        {short}
        <tspan className="draft-label hg-lang-count" dx="6">
          {count}
        </tspan>
      </text>
    </g>
  )
}

function LogicNode({ id, x, y, w, h, label, aria, onOpen, hit, children }) {
  const hx = n(hit?.x ?? x)
  const hy = n(hit?.y ?? y)
  const hw = n(hit?.w ?? w)
  const hh = n(hit?.h ?? h)
  const x0 = n(x)
  const y0 = n(y)
  const w0 = n(w)
  const h0 = n(h)
  return (
    <g
      className="hg-node"
      role="button"
      tabIndex={0}
      aria-label={aria}
      onClick={() => onOpen(id)}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault()
          onOpen(id)
        }
      }}
    >
      <rect className="hg-node-focus" x={hx - 6} y={hy - 6} width={hw + 12} height={hh + 12} rx="22" />
      {hit ? <rect className="hg-hit-frame" x={hx} y={hy} width={hw} height={hh} rx="20" /> : null}
      {children}
      <rect className="hg-node-plate" x={x0} y={y0} width={w0} height={h0} rx="20" />
      <text
        className="hg-node-label"
        x={x0 + w0 / 2}
        y={y0 + h0 / 2}
        textAnchor="middle"
        dominantBaseline="middle"
        fontWeight="700"
      >
        {label}
      </text>
    </g>
  )
}

function TravelDots({ path, count = 3 }) {
  const dur = `${tokens.motion.dashLoopMs}ms`
  const start = LIGHT_MS
  return Array.from({ length: count }, (_, i) => (
    <circle key={i} className="hg-dot" r="6.2" cx="0" cy="0">
      <animateMotion
        path={path}
        dur={dur}
        begin={`${start + i * (tokens.motion.dashLoopMs / count)}ms`}
        repeatCount="indefinite"
        calcMode="linear"
        rotate="0"
      />
    </circle>
  ))
}

function channelContinue(ch) {
  return [
    `C ${n(X.neckOut + 90)} ${n(CY)}, ${n(ch.midX - 90)} ${n(ch.midY)}, ${n(ch.midX)} ${n(ch.midY)}`,
    `C ${n(ch.midX + 90)} ${n(ch.midY)}, ${n(X.rejoin - 90)} ${n(CY)}, ${n(X.rejoin)} ${n(CY)}`,
  ].join(' ')
}

function passPath(source, channel) {
  return [
    source.path,
    `L ${n(X.neckOut)} ${n(CY)}`,
    channelContinue(channel),
    `L ${n(X.chamberL + 40)} ${n(CY)}`,
  ].join(' ')
}

function rejectPath(source, dir, targetY) {
  const bend = dir === 'up' ? -64 : 64
  return [
    source.path,
    `L ${n(X.gate)} ${n(CY)}`,
    `C ${n(X.gate)} ${n(CY + bend)}, ${n(X.gate)} ${n(targetY)}, ${n(X.gate)} ${n(targetY)}`,
  ].join(' ')
}

function coveragePath(layerY) {
  return [
    `M ${n(X.chamberR)} ${n(CY)}`,
    `C ${n(X.chamberR + 28)} ${n(CY)}, ${n(X.coverBox - 18)} ${n(layerY)}, ${n(X.coverBox + 36)} ${n(layerY)}`,
  ].join(' ')
}

function IntakePacket({ path, delayMs, cycleMs, kind = 'pass' }) {
  const dur = `${n(cycleMs)}ms`
  const begin = `${n(delayMs)}ms`
  const w = kind === 'cover' ? 16 : 18
  const h = kind === 'cover' ? 22 : 24
  const opacityValues = kind === 'reject' ? '0;1;1;0.4;0' : '0;1;1;0'
  const keyTimes = kind === 'reject' ? '0;0.08;0.55;0.78;1' : '0;0.08;0.84;1'
  return (
    <g className={`hg-packet hg-packet--${kind}`} pointerEvents="none" opacity="0">
      <MiniPage
        x={n(-w / 2)}
        y={n(-h / 2)}
        w={w}
        h={h}
        className={kind === 'reject' ? 'draft-muted hg-packet-page' : 'hg-packet-page'}
      />
      <animate
        attributeName="opacity"
        values={opacityValues}
        keyTimes={keyTimes}
        dur={dur}
        begin={begin}
        repeatCount="indefinite"
      />
      <animateMotion
        path={path}
        dur={dur}
        begin={begin}
        repeatCount="indefinite"
        calcMode="linear"
        rotate="0"
      />
    </g>
  )
}

function PipelineIntake({ sources, channels }) {
  const cycle = tokens.motion.intakeCycleMs
  const start = LIGHT_MS
  const rejectTopY = n(226 + 90 / 2)
  const rejectBotY = n(484 + 90 / 2)
  const attemptedY = n(CY)

  const passes = [
    [0, 0, 0],
    [2, 2, 1800],
    [3, 4, 3200],
    [4, 6, 4800],
    [6, 8, 6400],
    [0, 3, 8200],
    [3, 1, 10000],
    [2, 7, 11800],
  ]
  const rejects = [
    [4, 'up', 2400],
    [6, 'down', 7200],
    [2, 'up', 12800],
  ]
  const covers = [4200, 11000]

  return (
    <g className="hg-intake" pointerEvents="none">
      {passes.map(([si, ci, delay], i) => {
        const source = sources[si]
        const channel = channels[ci]
        if (!source || !channel) return null
        return (
          <g key={`pass-${i}`} className={source.hideCompact ? 'hg-hide-compact' : undefined}>
            <IntakePacket
              path={passPath(source, channel)}
              delayMs={n(start + delay)}
              cycleMs={cycle}
              kind="pass"
            />
          </g>
        )
      })}
      {rejects.map(([si, dir, delay], i) => {
        const source = sources[si]
        if (!source) return null
        return (
          <g key={`reject-${i}`} className={source.hideCompact ? 'hg-hide-compact' : undefined}>
            <IntakePacket
              path={rejectPath(source, dir, dir === 'up' ? rejectTopY : rejectBotY)}
              delayMs={n(start + delay)}
              cycleMs={cycle}
              kind="reject"
            />
          </g>
        )
      })}
      {covers.map((delay, i) => (
        <IntakePacket
          key={`cover-${i}`}
          path={coveragePath(attemptedY)}
          delayMs={n(start + delay)}
          cycleMs={cycle}
          kind="cover"
        />
      ))}
    </g>
  )
}

export function HourglassOverview({ catalog, onOpen }) {
  const caps = Object.fromEntries(catalog.capabilities.map((c) => [c.id, c]))
  const c = catalog.counts
  const langs = catalog.languages
  const channels = languageChannels(c.languages)
  const sources = intakeSources()
  const unseen = catalog.selfScenes.find((s) => s.id === 'unseen')
  const nodeLabel = (id) => `${caps[id].no} ${caps[id].short}`
  const nodeAria = (id) =>
    `${caps[id].no} ${caps[id].short}：${caps[id].full}。${caps[id].role} 打开详页。`

  const rejectW = 118
  const rejectH = 90
  const rejectX = X.gate - rejectW / 2
  const rejectTopY = 226
  const rejectBotY = 484

  return (
    <svg
      className="hourglass hourglass--h"
      viewBox={`0 0 ${VW} ${VH}`}
      preserveAspectRatio="xMidYMid meet"
      role="group"
      aria-label="研究逻辑图：来源页从左汇入，经关口、分类、上墙，再到右侧三层对照自身。"
    >
      <defs>
        <filter id="hg-card-shadow" x="-25%" y="-25%" width="150%" height="150%">
          <feDropShadow dx="0" dy="3" stdDeviation="5" floodColor="rgb(17 17 30)" floodOpacity="0.08" />
        </filter>
        <mask id="hg-dot-mask" maskUnits="userSpaceOnUse">
          <rect x="0" y="0" width={VW} height={VH} fill="white" />
          <rect
            x={n(X.gate - NODE_W / 2 - 8)}
            y={n(CY - NODE_H / 2 - 8)}
            width={n(NODE_W + 16)}
            height={n(NODE_H + 16)}
            rx="24"
            fill="black"
          />
          <rect
            x={n(X.classify - NODE_W / 2 - 8)}
            y={n(CY - NODE_H / 2 - 8)}
            width={n(NODE_W + 16)}
            height={n(NODE_H + 16)}
            rx="24"
            fill="black"
          />
        </mask>
      </defs>
      <path d={contourPath()} className="hg-silhouette" />

      <g className="hg-context" pointerEvents="none">
        <text
          x={X.source + 10}
          y="104"
          textAnchor="middle"
          dominantBaseline="middle"
          className="draft-label hg-kicker"
          fontWeight="700"
        >
          来源页
        </text>
        {sources.map((s) => (
          <g key={s.i} className={s.hideCompact ? 'hg-hide-compact' : undefined}>
            <MiniPage x={s.x0 - 20} y={s.y0 - 26} w={40} h={52} />
          </g>
        ))}
        {sources.map((s) => (
          <path key={`p-${s.i}`} d={s.path} className="draft-muted" />
        ))}
      </g>

      <g className="hg-stage" style={{ '--enter-delay': `${categoryStagger(0)}ms` }}>
        <path d={`M ${X.neckIn} ${CY} L ${X.neckOut} ${CY}`} className="draft-accent hg-flow" />
        <path
          d={`M ${X.gate} ${CY - NECK_HALF} C ${X.gate} 300, ${X.gate} ${rejectTopY + rejectH}, ${X.gate} ${rejectTopY + rejectH}`}
          className="draft-muted"
        />
        <SceneSketch x={rejectX} y={rejectTopY} w={rejectW} h={rejectH} />
        <Cross x={rejectX + 8} y={rejectTopY + 8} w={rejectW - 16} h={rejectH - 16} />
        <text x={X.gate} y={rejectTopY - 28} textAnchor="middle" className="draft-label hg-text-sm">
          引擎场景照
        </text>
        <text x={X.gate} y={rejectTopY - 8} textAnchor="middle" className="draft-label-accent hg-text-sm">
          过不了关
        </text>
        <path
          d={`M ${X.gate} ${CY + NECK_HALF} C ${X.gate} 500, ${X.gate} ${rejectBotY}, ${X.gate} ${rejectBotY}`}
          className="draft-muted"
        />
        <SceneSketch x={rejectX} y={rejectBotY} w={rejectW} h={rejectH} />
        <Cross x={rejectX + 8} y={rejectBotY + 8} w={rejectW - 16} h={rejectH - 16} />
        <text x={X.gate} y={rejectBotY + rejectH + 22} textAnchor="middle" className="draft-label hg-text-sm">
          playground
        </text>
        <text
          x={X.gate}
          y={rejectBotY + rejectH + 42}
          textAnchor="middle"
          className="draft-label-accent hg-text-sm"
        >
          过不了关
        </text>
        <LogicNode
          id="gate"
          x={X.gate - NODE_W / 2}
          y={CY - NODE_H / 2}
          w={NODE_W}
          h={NODE_H}
          label={nodeLabel('gate')}
          aria={nodeAria('gate')}
          onOpen={onOpen}
        />
      </g>

      <g className="hg-stage" style={{ '--enter-delay': `${categoryStagger(1)}ms` }}>
        {channels.map((ch) => (
          <path key={ch.i} d={ch.path} className="draft-accent hg-flow" />
        ))}
        {langs.map((lang, i) => (
          <ChannelLabel
            key={lang.id}
            x={channels[i].midX}
            y={channels[i].midY}
            full={lang.short}
            short={COMPACT_SHORT[lang.id] || lang.short}
            count={lang.count}
          />
        ))}
        <g className="hg-motion-out" pointerEvents="none">
          <rect x={X.fan - 55} y={48} width={110} height={40} rx="6" className="draft-muted" />
          <text
            x={X.fan}
            y={68}
            textAnchor="middle"
            dominantBaseline="middle"
            className="draft-label"
          >
            动效
          </text>
          <Cross x={X.fan - 45} y={56} w={90} h={24} />
          <text x={X.fan} y={106} textAnchor="middle" className="draft-label-accent hg-text-sm">
            不是分类轴
          </text>
        </g>
        <LogicNode
          id="classify"
          x={X.classify - NODE_W / 2}
          y={CY - NODE_H / 2}
          w={NODE_W}
          h={NODE_H}
          label={nodeLabel('classify')}
          aria={nodeAria('classify')}
          onOpen={onOpen}
        />
      </g>

      <g className="hg-stage" style={{ '--enter-delay': `${categoryStagger(2)}ms` }}>
        <path d={`M ${X.rejoin} ${CY} L ${X.chamberL} ${CY}`} className="draft-accent hg-flow" />
        <LogicNode
          id="wall"
          x={(X.chamberL + X.chamberR) / 2 - NODE_W / 2}
          y={CH_TOP - NODE_H / 2}
          w={NODE_W}
          h={NODE_H}
          label={nodeLabel('wall')}
          aria={nodeAria('wall')}
          onOpen={onOpen}
          hit={{
            x: X.chamberL,
            y: CH_TOP,
            w: X.chamberR - X.chamberL,
            h: CH_BOT - CH_TOP,
          }}
        >
          <rect
            className="hg-chamber"
            x={X.chamberL}
            y={CH_TOP}
            width={X.chamberR - X.chamberL}
            height={CH_BOT - CH_TOP}
            rx="24"
          />
          <text
            x={(X.chamberL + X.chamberR) / 2}
            y={CY - 6}
            textAnchor="middle"
            dominantBaseline="middle"
            className="draft-label-accent hg-wall-num"
            fontWeight="700"
          >
            {c.onWall}
          </text>
          <text
            x={(X.chamberL + X.chamberR) / 2}
            y={CY + 62}
            textAnchor="middle"
            className="draft-label-accent"
            fontWeight="700"
          >
            已上墙标杆
          </text>
          <g className="hg-hide-compact" pointerEvents="none">
            {Array.from({ length: 7 }, (_, i) => (
              <rect
                key={i}
                x={X.chamberL + 28 + i * 36}
                y={CH_BOT - 48}
                width={26}
                height={20}
                rx="4"
                className="draft-soft"
              />
            ))}
          </g>
        </LogicNode>
      </g>

      <g className="hg-stage" style={{ '--enter-delay': `${categoryStagger(3)}ms` }}>
        <CoverageOutlets
          counts={c}
          unseen={unseen}
          onOpen={onOpen}
          cap={caps.coverage}
          aria={nodeAria('coverage')}
        />
      </g>

      <g mask="url(#hg-dot-mask)">
        <PipelineIntake sources={sources} channels={channels} />
      </g>
    </svg>
  )
}

function CoverageOutlets({ counts, unseen, onOpen, cap, aria }) {
  const layers = [
    { key: 'present', name: '点亮', value: counts.present },
    { key: 'attempted', name: '做了但不够', value: counts.attempted },
    { key: 'near', name: '接近标杆', value: counts.nearBenchmark },
  ]
  const boxW = 220
  const boxH = 118
  const gap = 22
  const totalH = n(layers.length * boxH + (layers.length - 1) * gap)
  const top = n(CY - totalH / 2)
  const boxX = n(X.coverBox)
  const placed = layers.map((l, i) => ({
    ...l,
    x: boxX,
    y: n(top + i * (boxH + gap)),
  }))
  const masteredW = 100
  const masteredH = 32
  const compareW = 128
  const compareH = 56
  const pairGap = 12
  const pairY = n(top + totalH + 20)
  const masteredX = boxX
  const masteredY = n(pairY + (compareH - masteredH) / 2)
  const compareX = n(masteredX + masteredW + pairGap)
  const compareY = pairY
  const unseenLabel = unseen?.languages?.length
    ? `未见：${unseen.languages.map((l) => l.short).join('、')}`
    : ''

  return (
    <LogicNode
      id="coverage"
      x={n(boxX + (boxW - NODE_W) / 2)}
      y={n(top - NODE_H - 28)}
      w={NODE_W}
      h={NODE_H}
      label={`${cap.no} ${cap.short}`}
      aria={aria}
      onOpen={onOpen}
      hit={{ x: n(boxX - 20), y: 56, w: n(masteredW + pairGap + compareW + 48), h: 710 }}
    >
      {placed.map((l) => (
        <g key={l.key} pointerEvents="none">
          <path
            d={`M ${X.chamberR} ${CY} C ${X.chamberR + 28} ${CY}, ${l.x - 18} ${l.y + boxH / 2}, ${l.x} ${l.y + boxH / 2}`}
            className="draft-accent hg-flow"
          />
          <rect x={l.x} y={l.y} width={boxW} height={boxH} rx="16" className="hg-layer-card" />
          <text
            x={l.x + boxW / 2}
            y={l.y + 36}
            textAnchor="middle"
            className="draft-label-accent"
            fontWeight="700"
          >
            {l.name}
          </text>
          <text
            x={l.x + boxW / 2}
            y={l.y + 80}
            textAnchor="middle"
            dominantBaseline="middle"
            className="draft-label-accent hg-layer-num"
            fontWeight="700"
          >
            {l.value}
          </text>
        </g>
      ))}
      <g pointerEvents="none">
        <text
          x={boxX + boxW / 2}
          y={top - 12}
          textAnchor="middle"
          dominantBaseline="middle"
          className="draft-label hg-text-sm"
        >
          {`抽样 ${counts.reviewed} 页`}
        </text>
        <rect
          x={masteredX}
          y={masteredY}
          width={masteredW}
          height={masteredH}
          rx="6"
          className="draft-muted"
        />
        <text
          x={n(masteredX + masteredW / 2)}
          y={n(masteredY + masteredH / 2)}
          textAnchor="middle"
          dominantBaseline="middle"
          className="draft-label hg-text-sm"
        >
          已掌握
        </text>
        <Cross x={n(masteredX + 10)} y={n(masteredY + 8)} w={n(masteredW - 20)} h={n(masteredH - 16)} />
        <rect
          x={compareX}
          y={compareY}
          width={compareW}
          height={compareH}
          rx="8"
          className="draft-muted hg-dashed-box"
        />
        <text
          x={n(compareX + compareW / 2)}
          y={n(compareY + 21)}
          textAnchor="middle"
          dominantBaseline="middle"
          className="draft-label hg-text-sm"
        >
          对照
        </text>
        <text
          x={n(compareX + compareW / 2)}
          y={n(compareY + 39)}
          textAnchor="middle"
          dominantBaseline="middle"
          className="draft-label hg-text-sm"
        >
          待补充
        </text>
        {unseenLabel ? (
          <text
            x={n(boxX + boxW / 2)}
            y={n(compareY + compareH + 20)}
            textAnchor="middle"
            className="draft-label hg-text-sm"
          >
            {unseenLabel}
          </text>
        ) : null}
      </g>
    </LogicNode>
  )
}

function EffectBloom({ cx, cy }) {
  return (
    <g className="draft-accent" pointerEvents="none">
      <ellipse cx={cx} cy={cy} rx="54" ry="32" />
      <path d={`M ${cx - 40} ${cy} C ${cx - 18} ${cy - 36}, ${cx + 18} ${cy - 36}, ${cx + 40} ${cy} C ${cx + 18} ${cy + 24}, ${cx - 18} ${cy + 24}, ${cx - 40} ${cy} Z`} />
      <path d={`M ${cx - 22} ${cy - 8} C ${cx - 4} ${cy - 16}, ${cx + 4} ${cy - 16}, ${cx + 22} ${cy - 8}`} />
    </g>
  )
}

export function GateZoom() {
  return (
    <svg
      className="stage-zoom"
      viewBox="0 0 1000 620"
      preserveAspectRatio="xMidYMid meet"
      role="img"
      aria-label="关口：视效必须发生在完整页面或组件里，孤立的引擎场景照过不了关"
    >
      <path d="M 500 24 V 596" className="draft-accent hg-flow" />
      <path d="M 430 24 C 390 24, 280 40, 230 80" className="draft-muted" />
      <path d="M 570 24 C 610 24, 720 40, 770 80" className="draft-muted" />
      <g>
        <rect x="80" y="110" width="280" height="400" rx="10" className="draft-muted" />
        <path d="M 80 148 H 360" className="draft-soft" />
        <circle cx="104" cy="130" r="5" className="draft-soft" />
        <circle cx="124" cy="130" r="5" className="draft-soft" />
        <circle cx="144" cy="130" r="5" className="draft-soft" />
        <rect x="108" y="176" width="224" height="280" rx="6" className="draft-fill-muted" />
        <EffectBloom cx="220" cy="316" />
        <text x="220" y="548" textAnchor="middle" className="draft-label-accent" fontSize="20" fontWeight="700">
          页面 / 组件
        </text>
      </g>
      <g>
        <rect x="430" y="268" width="140" height="52" rx="11" className="hg-node-plate is-static" />
        <text x="500" y="294" textAnchor="middle" dominantBaseline="middle" className="hg-node-label" fontSize="22" fontWeight="700">
          01 关口
        </text>
      </g>
      <g>
        <SceneSketch x="680" y="170" w="240" h="200" />
        <Cross x="700" y="186" w="200" h="168" />
        <text x="800" y="410" textAnchor="middle" className="draft-label" fontSize="18">
          引擎场景照
        </text>
        <text x="800" y="438" textAnchor="middle" className="draft-label-accent" fontSize="18" fontWeight="700">
          过不了关
        </text>
      </g>
    </svg>
  )
}

export function ClassifyZoom({ catalog }) {
  const c = catalog.counts
  const langs = catalog.languages
  const left = 80
  const axis = 280
  const top = 70
  const bot = 500
  const step = (bot - top) / (langs.length - 1)
  return (
    <svg
      className="stage-zoom"
      viewBox="0 0 1000 620"
      preserveAspectRatio="xMidYMid meet"
      role="img"
      aria-label={`分类：案例流向 ${c.languages} 种视效语言，动效不是分类轴`}
    >
      {[0, 1, 2].map((i) => (
        <g key={i}>
          <MiniPage x={left} y={140 + i * 90} w="64" h="52" />
          <path
            d={`M ${left + 64} ${166 + i * 90} H ${axis - 8}`}
            className="draft-accent hg-flow"
          />
        </g>
      ))}
      <text x={left + 32} y="430" textAnchor="middle" className="draft-label" fontSize="16">
        案例
      </text>
      <line x1={axis} y1="50" x2={axis} y2="530" className="draft-accent" />
      <text x={axis + 16} y="42" className="draft-label-accent" fontSize="18" fontWeight="700">
        语言
      </text>
      {langs.map((lang, i) => {
        const y = top + i * step
        return (
          <g key={lang.id}>
            <line x1={axis - 8} y1={y} x2={axis + 8} y2={y} className="draft-accent" />
            <text x={axis + 18} y={y} dominantBaseline="middle" className="draft-label-accent" fontSize="17">
              {lang.short}
            </text>
          </g>
        )
      })}
      <g>
        <rect x="760" y="210" width="160" height="56" rx="6" className="draft-muted" />
        <text x="840" y="238" textAnchor="middle" dominantBaseline="middle" className="draft-label" fontSize="20">
          动效
        </text>
        <Cross x="776" y="222" w="128" h="32" />
        <text x="840" y="290" textAnchor="middle" className="draft-label-accent" fontSize="16">
          不是分类轴
        </text>
      </g>
      <text x="500" y="580" textAnchor="middle" className="draft-label-accent" fontSize="16">
        {`${c.onWall} 里有 ${c.landingPages} 条是落地页，所以场景不是开场主轴`}
      </text>
    </svg>
  )
}

export function WallZoom({ catalog }) {
  const c = catalog.counts
  const pages = [
    { x: 70, pass: true },
    { x: 200, pass: true },
    { x: 330, pass: false },
    { x: 460, pass: true },
    { x: 590, pass: false },
  ]
  return (
    <svg
      className="stage-zoom"
      viewBox="0 0 1000 620"
      preserveAspectRatio="xMidYMid meet"
      role="img"
      aria-label={`上墙：逐页检视，通过的进入墙，地图上的 ${c.onWall} 只是已上墙标杆，不是来源库全集`}
    >
      <rect x="180" y="48" width="640" height="210" rx="14" className="hg-chamber" />
      <text
        x="500"
        y="132"
        textAnchor="middle"
        dominantBaseline="middle"
        className="draft-label-accent hg-wall-num"
        fontWeight="700"
      >
        {c.onWall}
      </text>
      <text x="500" y="198" textAnchor="middle" className="draft-label-accent" fontSize="20" fontWeight="700">
        已上墙标杆
      </text>
      <text x="500" y="228" textAnchor="middle" className="draft-label" fontSize="15">
        不是来源库全集
      </text>
      {pages.map((p, i) => (
        <g key={i}>
          <MiniPage
            x={p.x}
            y="390"
            w="96"
            h="84"
            className={p.pass ? 'draft-accent' : 'draft-muted'}
          />
          {p.pass ? (
            <>
              <path d={`M ${p.x + 48} 390 V 258`} className="draft-accent hg-flow" />
              <path
                d={`M ${p.x + 28} 430 l 16 14 28-30`}
                className="draft-accent"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </>
          ) : null}
        </g>
      ))}
      <path d="M 70 520 H 820" className="draft-muted hg-flow" />
      <text x="70" y="548" className="draft-label" fontSize="16">
        逐页看
      </text>
      <text x="820" y="440" textAnchor="start" className="draft-label" fontSize="16">
        留在外面
      </text>
    </svg>
  )
}

export function CoverageZoom({ catalog }) {
  const c = catalog.counts
  const unseen = catalog.selfScenes.find((s) => s.id === 'unseen')
  const layers = [
    { name: '点亮', value: c.present, x: 200 },
    { name: '做了但不够', value: c.attempted, x: 420 },
    { name: '接近标杆', value: c.nearBenchmark, x: 640 },
  ]
  return (
    <svg
      className="stage-zoom"
      viewBox="0 0 1000 620"
      preserveAspectRatio="xMidYMid meet"
      role="img"
      aria-label={`覆盖：点亮 ${c.present}，做了但不够 ${c.attempted}，接近标杆 ${c.nearBenchmark}；抽样 ${c.reviewed} 页。已掌握被划掉，对照待补充。`}
    >
      {layers.map((l, i) => (
        <g key={l.name}>
          <rect x={l.x} y="80" width="170" height="210" rx="10" className="draft-accent" />
          <text
            x={l.x + 85}
            y="140"
            textAnchor="middle"
            className="draft-label-accent"
            fontSize="18"
            fontWeight="700"
          >
            {l.name}
          </text>
          <text
            x={l.x + 85}
            y="210"
            textAnchor="middle"
            dominantBaseline="middle"
            className="draft-label-accent hg-zoom-num"
            fontWeight="700"
          >
            {l.value}
          </text>
          {i < layers.length - 1 ? (
            <path d={`M ${l.x + 170} 185 H ${layers[i + 1].x}`} className="draft-accent hg-flow" />
          ) : null}
        </g>
      ))}
      <rect x="40" y="120" width="120" height="120" rx="8" className="draft-muted hg-dashed-box" />
      <text x="100" y="168" textAnchor="middle" className="draft-label" fontSize="16">
        对照
      </text>
      <text x="100" y="196" textAnchor="middle" className="draft-label" fontSize="16">
        待补充
      </text>
      <rect x="840" y="120" width="120" height="120" rx="8" className="draft-muted hg-dashed-box" />
      <text x="900" y="168" textAnchor="middle" className="draft-label" fontSize="16">
        对照
      </text>
      <text x="900" y="196" textAnchor="middle" className="draft-label" fontSize="16">
        待补充
      </text>
      <text x="500" y="330" textAnchor="middle" className="draft-label" fontSize="16">
        {`抽样 ${c.reviewed} 页`}
      </text>
      <rect x="360" y="360" width="280" height="48" rx="6" className="draft-muted" />
      <text x="500" y="384" textAnchor="middle" dominantBaseline="middle" className="draft-label" fontSize="18">
        已掌握
      </text>
      <Cross x="376" y="370" w="248" h="28" />
      <text x="500" y="450" textAnchor="middle" className="draft-label" fontSize="16">
        {`未见：${unseen.languages.map((l) => l.short).join('、')}`}
      </text>
    </svg>
  )
}

const ZOOMS = {
  gate: GateZoom,
  classify: ClassifyZoom,
  wall: WallZoom,
  coverage: CoverageZoom,
}

export function StageZoom({ id, catalog }) {
  const Comp = ZOOMS[id]
  if (!Comp) return null
  return <Comp catalog={catalog} />
}
