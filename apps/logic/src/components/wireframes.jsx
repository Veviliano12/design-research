const soft = 'rgba(232,233,235,0.42)'
const soft2 = 'rgba(232,233,235,0.16)'
const ink = 'rgba(232,233,235,0.78)'
const accent = '#3EC8FF'
const accentFill = 'rgba(62,200,255,0.12)'
const accentFill2 = 'rgba(62,200,255,0.22)'
const font = "system-ui, 'PingFang SC', 'Microsoft YaHei', sans-serif"

function Svg({ className, children, wide }) {
  return (
    <svg
      className={`wire ${className || ''}`}
      viewBox={wide ? '0 0 360 180' : '0 0 300 180'}
      fill="none"
      aria-hidden="true"
    >
      {children}
    </svg>
  )
}

function Label({ x, y, children, fill = ink, anchor = 'middle', size = 9, weight = 600, strike, spacing = '0.02em' }) {
  return (
    <text
      x={x}
      y={y}
      fill={fill}
      textAnchor={anchor}
      fontSize={size}
      fontWeight={weight}
      fontFamily={font}
      style={{ letterSpacing: spacing }}
    >
      {strike ? <tspan textDecoration="line-through">{children}</tspan> : children}
    </text>
  )
}

function FlowLine({ d, wide }) {
  return (
    <path
      d={d}
      stroke={accent}
      strokeWidth={wide ? 1.5 : 1.35}
      strokeDasharray="3.5 4"
      strokeLinecap="round"
      fill="none"
      className="wire-flow"
    />
  )
}

/** A small page glyph: chrome bar + body lines. */
function Page({ x, y, w = 30, h = 40, lit = false, mute = false, mark }) {
  const stroke = lit ? accent : mute ? 'rgba(232,233,235,0.28)' : soft
  const bar = lit ? accentFill2 : soft2
  return (
    <g transform={`translate(${x},${y})`}>
      <rect
        width={w}
        height={h}
        rx="2.8"
        stroke={stroke}
        strokeWidth="1.25"
        fill={lit ? accentFill : 'rgba(255,255,255,0.025)'}
      />
      <path
        d={`M0 2.8a2.8 2.8 0 0 1 2.8-2.8H${w - 2.8}A2.8 2.8 0 0 1 ${w} 2.8V7H0Z`}
        fill={bar}
        stroke={stroke}
        strokeWidth="1.25"
      />
      <line x1="5" y1={h * 0.38} x2={w - 5} y2={h * 0.38} stroke={stroke} strokeWidth="1.15" opacity="0.85" />
      <line x1="5" y1={h * 0.52} x2={w - 8} y2={h * 0.52} stroke={stroke} strokeWidth="1.05" opacity="0.5" />
      <line x1="5" y1={h * 0.66} x2={w - 6} y2={h * 0.66} stroke={stroke} strokeWidth="1.05" opacity="0.5" />
      {mark === 'pass' ? (
        <path
          d={`M${w - 11} 11.5l2.2 2.3 4.4-5`}
          stroke={accent}
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      ) : null}
      {mark === 'fail' ? (
        <path
          d={`M${w - 12} 8.5l6.5 6.5M${w - 5.5} 8.5l-6.5 6.5`}
          stroke="rgba(232,233,235,0.45)"
          strokeWidth="1.35"
          strokeLinecap="round"
        />
      ) : null}
    </g>
  )
}

export function GateWire() {
  return (
    <Svg>
      {/* Complete page */}
      <rect x="10" y="10" width="168" height="136" rx="7" stroke={soft} strokeWidth="1.35" fill="rgba(255,255,255,0.02)" />
      <path d="M10 17a7 7 0 0 1 7-7h154a7 7 0 0 1 7 7v10H10Z" fill={soft2} stroke={soft} strokeWidth="1.35" />
      <circle cx="22" cy="16.5" r="2.1" fill={soft} />
      <circle cx="31" cy="16.5" r="2.1" fill={soft} />
      <circle cx="40" cy="16.5" r="2.1" fill={soft} />
      <rect x="86" y="13" width="46" height="6" rx="1.5" fill={soft2} />
      {/* nav */}
      <rect x="20" y="36" width="22" height="5" rx="1" fill={soft2} />
      <rect x="46" y="36" width="22" height="5" rx="1" fill={soft2} />
      <rect x="72" y="36" width="22" height="5" rx="1" fill={soft2} />
      {/* typographic heading */}
      <rect x="20" y="50" width="72" height="7" rx="1.5" fill={soft} opacity="0.45" />
      <rect x="20" y="62" width="48" height="4.5" rx="1" fill={soft2} />
      {/* in-page effect, accent */}
      <rect x="20" y="78" width="148" height="52" rx="5" stroke={accent} strokeWidth="1.6" fill={accentFill} />
      <path
        d="M42 120c16-20 34-28 52-8 10-18 26-22 44-2"
        stroke={accent}
        strokeWidth="1.7"
        strokeLinecap="round"
      />
      <path
        d="M54 112c10-12 22-12 34 2"
        stroke={accent}
        strokeWidth="1.35"
        strokeLinecap="round"
        opacity="0.7"
      />
      <ellipse cx="58" cy="94" rx="10" ry="7" stroke={accent} strokeWidth="1.4" fill={accentFill2} />
      <path d="M52 92.5c3 2 8 2 12 0" stroke={accent} strokeWidth="1.1" strokeLinecap="round" />
      <Label x="94" y="164" fill={accent} size={8.5}>
        完整页里的视效
      </Label>

      {/* Rejected engine shot */}
      <g transform="translate(196,14)">
        <rect width="92" height="68" rx="6" stroke={soft} strokeWidth="1.3" fill="rgba(255,255,255,0.02)" />
        <rect x="8" y="8" width="76" height="44" rx="3" stroke={soft} strokeWidth="1.15" />
        {/* simple engine solid */}
        <path d="M32 22l14-6 14 6v16l-14 6-14-6z" stroke={soft} strokeWidth="1.2" />
        <path d="M46 16v16M32 22l14 16 14-16" stroke={soft} strokeWidth="1.05" opacity="0.7" />
        <path d="M12 12l68 40M12 52l68-40" stroke={accent} strokeWidth="1.5" strokeLinecap="round" />
        <Label x="46" y="64" size={8} fill={soft} strike>
          引擎场景照
        </Label>
      </g>
      {/* Rejected playground */}
      <g transform="translate(196,92)">
        <rect width="92" height="54" rx="6" stroke={soft} strokeWidth="1.3" fill="rgba(255,255,255,0.02)" />
        <rect x="8" y="8" width="34" height="24" rx="2" stroke={soft} strokeWidth="1.1" />
        <rect x="46" y="8" width="38" height="5" rx="1" fill={soft2} />
        <rect x="46" y="16" width="28" height="5" rx="1" fill={soft2} />
        <rect x="46" y="24" width="32" height="5" rx="1" fill={soft2} />
        <path d="M12 10l26 20M12 30l26-20" stroke={accent} strokeWidth="1.5" strokeLinecap="round" />
        <Label x="46" y="46" size={8} fill={soft} strike>
          playground
        </Label>
      </g>
    </Svg>
  )
}

export function ClassifyWire() {
  const langs = ['液态玻璃', '流体', '光与发光', '粒子', '后期', '生成艺术', '写实材质', '场景与世界', '物理']
  return (
    <Svg>
      {/* Cases */}
      {[0, 1, 2].map((i) => (
        <Page key={i} x={10 + (i % 2) * 6} y={18 + i * 38} w="42" h="32" />
      ))}
      <Label x="31" y="164" size={8} fill={soft}>
        案例
      </Label>

      <FlowLine d="M54 34h28" />
      <FlowLine d="M58 72h24" />
      <FlowLine d="M54 110h28" />

      <Label x="186" y="16" fill={accent} size={8.5}>
        视效语言 · 9
      </Label>
      {langs.map((name, i) => {
        const col = i % 3
        const row = Math.floor(i / 3)
        const x = 88 + col * 68
        const y = 26 + row * 34
        return (
          <g key={name}>
            <rect
              x={x}
              y={y}
              width="62"
              height="26"
              rx="4"
              stroke={accent}
              strokeWidth="1.3"
              fill={accentFill}
            />
            <Label x={x + 31} y={y + 17} size={8} fill={accent} spacing="0">
              {name}
            </Label>
          </g>
        )
      })}

      {/* 动效 is not the axis */}
      <g transform="translate(196,136)">
        <rect width="82" height="24" rx="4" stroke={soft} strokeWidth="1.2" />
        <path d="M8 5l66 14M8 19l66-14" stroke={accent} strokeWidth="1.4" strokeLinecap="round" />
        <Label x="41" y="16" size={8.5} fill={soft} strike>
          动效
        </Label>
      </g>
    </Svg>
  )
}

export function WallWire() {
  const queue = [
    { lit: true, mark: 'pass' },
    { lit: false, mark: 'fail', mute: true },
    { lit: true, mark: 'pass' },
    { lit: true, mark: 'pass' },
    { lit: false, mark: 'fail', mute: true },
  ]
  return (
    <Svg>
      <Label x="86" y="16" size={8.5} fill={soft}>
        逐页看
      </Label>
      {queue.map((p, i) => (
        <Page key={i} x={8 + i * 34} y={28} w="30" h="42" lit={p.lit} mute={p.mute} mark={p.mark} />
      ))}

      {/* Passing paths into the wall */}
      <FlowLine d="M38 72c0 18 24 28 86 28 18 0 32-2 46-8" wide />
      <FlowLine d="M105 72c0 14 20 24 65 24 10 0 18-1 26-4" wide />
      <FlowLine d="M140 72c4 10 16 18 48 18" wide />

      {/* Wall of pages that passed — schematic cluster, not 124 tiles */}
      <g transform="translate(192,20)">
        <rect
          x="0"
          y="0"
          width="100"
          height="96"
          rx="6"
          stroke={accent}
          strokeWidth="1.55"
          fill="rgba(62,200,255,0.05)"
        />
        {[0, 1, 2].map((r) =>
          [0, 1].map((c) => (
            <Page key={`${r}-${c}`} x={8 + c * 44} y={8 + r * 28} w="38" h="24" lit />
          )),
        )}
      </g>
      <Label x="242" y="130" fill={accent} size={8.5}>
        上墙
      </Label>

      {/* Rejected stay outside */}
      <Label x="86" y="164" size={8} fill={soft}>
        未过关，不计 124
      </Label>
      <path
        d="M47 74v10M149 74v10"
        stroke="rgba(232,233,235,0.28)"
        strokeWidth="1.1"
        strokeLinecap="round"
      />
    </Svg>
  )
}

export function CoverageWire() {
  const layers = [
    { name: '点亮', n: '0', y: 38, w: 168, on: false },
    { name: '接近标杆', n: '0', y: 74, w: 192, on: false },
    { name: '做了但不够', n: '36', y: 110, w: 216, on: true },
  ]
  return (
    <Svg>
      {/* Struck-out fourth claim, not on the stack */}
      <g transform="translate(200,14)">
        <rect width="88" height="26" rx="4" stroke={soft} strokeWidth="1.2" />
        <path d="M8 6l72 14M8 20l72-14" stroke={accent} strokeWidth="1.4" strokeLinecap="round" />
        <Label x="44" y="17.5" size={8.5} fill={soft} strike>
          已掌握
        </Label>
      </g>

      {layers.map((ly, i) => {
        const x = 24 + (216 - ly.w) / 2
        const stroke = ly.on ? accent : soft
        const face = ly.on ? accentFill : 'rgba(255,255,255,0.025)'
        return (
          <g key={ly.name}>
            {/* shallow step edge */}
            <path
              d={`M${x + 6} ${ly.y - 5}h${ly.w}l-6 5H${x}z`}
              stroke={stroke}
              strokeWidth="1.2"
              fill={ly.on ? accentFill2 : soft2}
              opacity={ly.on ? 1 : 0.7}
            />
            <rect
              x={x}
              y={ly.y}
              width={ly.w}
              height="30"
              rx="4"
              stroke={stroke}
              strokeWidth={ly.on ? 1.6 : 1.3}
              fill={face}
            />
            <Label x={x + 12} y={ly.y + 20} anchor="start" size={9.5} fill={ly.on ? accent : ink}>
              {ly.name}
            </Label>
            <Label
              x={x + ly.w - 12}
              y={ly.y + 20}
              anchor="end"
              size={13}
              weight={700}
              fill={ly.on ? accent : ink}
              spacing="-0.03em"
            >
              {ly.n}
            </Label>
          </g>
        )
      })}
    </Svg>
  )
}

export function StockWire({ languages = [] }) {
  const items = languages.slice(0, 9)
  return (
    <Svg wide>
      <rect
        x="16"
        y="8"
        width="328"
        height="164"
        rx="7"
        stroke={accent}
        strokeWidth="1.45"
        fill="rgba(62,200,255,0.04)"
      />
      {items.map((lang, i) => {
        const col = i % 3
        const row = Math.floor(i / 3)
        const x = 28 + col * 108
        const y = 20 + row * 48
        return (
          <g key={lang.id || lang.short}>
            <rect
              x={x}
              y={y}
              width="98"
              height="40"
              rx="5"
              stroke={accent}
              strokeWidth="1.3"
              fill={accentFill}
            />
            <Label x={x + 10} y={y + 16} anchor="start" size={8.5} fill={accent} spacing="0">
              {lang.short}
            </Label>
            <Label x={x + 10} y={y + 31} anchor="start" size={8} fill={ink} spacing="0">
              标杆 {lang.count}
            </Label>
          </g>
        )
      })}
    </Svg>
  )
}

export function SampleWire() {
  return <CoverageWire />
}

export function LanguageCoverWire({ rows }) {
  return (
    <svg className="wire wire--cover" viewBox="0 0 360 170" fill="none" aria-hidden="true">
      {rows.map((row, i) => {
        const col = i % 3
        const r = Math.floor(i / 3)
        const x = 12 + col * 118
        const y = 10 + r * 52
        const on = row.state === 'attempted'
        return (
          <g key={row.id} transform={`translate(${x},${y})`}>
            <rect
              x="0"
              y="0"
              width="108"
              height="44"
              rx="6"
              stroke={on ? accent : soft}
              strokeDasharray={on ? undefined : '3 3'}
              fill={on ? 'rgba(62,200,255,0.05)' : 'transparent'}
            />
            <Label x="8" y="16" anchor="start" size={8} fill={on ? accent : ink}>
              {row.short}
            </Label>
            <Label x="8" y="32" anchor="start" size={7.5} fill={on ? accent : soft}>
              {on ? `做了但不够 ${row.attempted}` : '未见'}
            </Label>
          </g>
        )
      })}
    </svg>
  )
}
