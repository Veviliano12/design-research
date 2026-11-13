import { useEffect, useMemo, useRef, useState } from 'react'
import { categoryStagger, tokens } from '../tokens.js'
import { MAIN_CHANNELS } from '../data/channels.js'

const VW = 1720
const VH = 680
const CY = 338

const soft = 'rgba(232,233,235,0.42)'
const soft2 = 'rgba(232,233,235,0.16)'
const ink = 'rgba(232,233,235,0.82)'
const muted = '#8b9098'
const dim = 'rgba(232,233,235,0.28)'
const accent = '#3EC8FF'
const accentFill = 'rgba(62,200,255,0.12)'
const accentFill2 = 'rgba(62,200,255,0.22)'
const accentLine = 'rgba(62,200,255,0.55)'
const font = "system-ui, 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', sans-serif"
const titleFont =
  "'Helvetica Neue', Arial, system-ui, 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', sans-serif"

const CLASS_Y = 128
const CLASS_H = 424
const STATION_W = 248
const CLASS_W = 286
const WIN_W = 156
const WIN_H = 108
const STATION_Y = 248
const STATION_H = 184

const ST = {
  screen: { x: 236, y: STATION_Y, w: STATION_W, h: STATION_H },
  classify: { x: 520, y: CLASS_Y, w: CLASS_W, h: CLASS_H },
  review: { x: 842, y: STATION_Y, w: STATION_W, h: STATION_H },
}

const X = {
  merge: 208,
  screen: ST.screen.x + ST.screen.w / 2,
  screenOut: ST.screen.x + ST.screen.w + 8,
  classIn: ST.classify.x - 8,
  classMid: ST.classify.x + ST.classify.w / 2,
  classOut: ST.classify.x + ST.classify.w + 8,
  review: ST.review.x + ST.review.w / 2,
  reviewOut: ST.review.x + ST.review.w + 16,
  wall: 1228,
}

const TRAY_UP = { x: ST.screen.x + 40, y: ST.screen.y - 50, w: 168, h: 58 }
const TRAY_DN = { x: ST.screen.x + 40, y: ST.screen.y + ST.screen.h - 8, w: 168, h: 58 }

const PATHS = {
  officialFull: `M 48 220 C 140 220, 180 310, ${X.merge} ${CY} L ${X.wall} ${CY}`,
  ossFull: `M 48 ${CY} L ${X.wall} ${CY}`,
  xFull: `M 48 456 C 140 456, 180 366, ${X.merge} ${CY} L ${X.wall} ${CY}`,
  rejectUp: `M ${X.merge + 24} ${CY} L ${X.screen} ${CY} C ${X.screen} ${CY - 36}, ${X.screen} ${TRAY_UP.y + 30}, ${TRAY_UP.x + TRAY_UP.w / 2} ${TRAY_UP.y + 30}`,
  rejectDown: `M ${X.merge + 24} ${CY} L ${X.screen} ${CY} C ${X.screen} ${CY + 36}, ${X.screen} ${TRAY_DN.y + 30}, ${TRAY_DN.x + TRAY_DN.w / 2} ${TRAY_DN.y + 30}`,
  loopScreen: `M ${X.review} ${CY - WIN_H / 2} C ${X.review} 86, ${X.screen} 86, ${X.screen} ${CY - WIN_H / 2}`,
  loopClassify: `M ${X.review} ${CY + WIN_H / 2} C ${X.review} 590, ${X.classMid} 590, ${X.classMid} ${ST.classify.y + ST.classify.h}`,
  intakeOfficial: `M 48 220 C 140 220, 180 310, ${X.merge} ${CY}`,
  intakeOss: `M 48 ${CY} L ${X.merge} ${CY}`,
  intakeX: `M 48 456 C 140 456, 180 366, ${X.merge} ${CY}`,
  spine: `M ${X.merge} ${CY} L ${X.wall} ${CY}`,
}

const PARCELS = [
  { id: 'o1', path: 'officialFull', phase: 0.04, kind: 'page', w: 30, h: 40, rot: -4 },
  { id: 'o2', path: 'officialFull', phase: 0.26, kind: 'page', w: 28, h: 38, rot: 3 },
  { id: 'o3', path: 'officialFull', phase: 0.52, kind: 'page', w: 32, h: 42, rot: -2 },
  { id: 'o4', path: 'officialFull', phase: 0.78, kind: 'page', w: 28, h: 38, rot: 4 },
  { id: 's1', path: 'ossFull', phase: 0.12, kind: 'page', w: 30, h: 40, rot: 2 },
  { id: 's2', path: 'ossFull', phase: 0.38, kind: 'page', w: 28, h: 36, rot: -5 },
  { id: 's3', path: 'ossFull', phase: 0.64, kind: 'page', w: 31, h: 41, rot: 4 },
  { id: 's4', path: 'ossFull', phase: 0.88, kind: 'page', w: 28, h: 37, rot: -3 },
  { id: 'x1', path: 'xFull', phase: 0.18, kind: 'page', w: 29, h: 39, rot: 5 },
  { id: 'x2', path: 'xFull', phase: 0.46, kind: 'page', w: 30, h: 40, rot: -3 },
  { id: 'x3', path: 'xFull', phase: 0.72, kind: 'page', w: 28, h: 37, rot: 2 },
  { id: 'ru', path: 'rejectUp', phase: 0.55, kind: 'reject', w: 26, h: 34, rot: -8, period: 18 },
  { id: 'rd', path: 'rejectDown', phase: 0.7, kind: 'reject', w: 26, h: 34, rot: 8, period: 18 },
  { id: 'fs', path: 'loopScreen', phase: 0.18, kind: 'signal', w: 18, h: 22, rot: 0, period: 11 },
  { id: 'fs2', path: 'loopScreen', phase: 0.62, kind: 'signal', w: 16, h: 20, rot: 0, period: 11 },
  { id: 'fc', path: 'loopClassify', phase: 0.28, kind: 'signal', w: 18, h: 22, rot: 0, period: 11 },
  { id: 'fc2', path: 'loopClassify', phase: 0.74, kind: 'signal', w: 16, h: 20, rot: 0, period: 11 },
]

function n(v) {
  return Number(v)
}

function Label({
  x,
  y,
  children,
  fill = ink,
  anchor = 'middle',
  size = 13,
  weight = 600,
  strike = false,
  spacing = '0.02em',
  family = font,
  className,
}) {
  return (
    <text
      x={x}
      y={y}
      fill={fill}
      textAnchor={anchor}
      fontSize={size}
      fontWeight={weight}
      fontFamily={family}
      className={className}
      style={{ letterSpacing: spacing }}
    >
      {strike ? <tspan textDecoration="line-through">{children}</tspan> : children}
    </text>
  )
}

function Page({ x, y, w = 30, h = 40, lit = false, mute = false, mark, rot = 0, kind = 'page' }) {
  const x0 = n(x)
  const y0 = n(y)
  const w0 = n(w)
  const h0 = n(h)
  const isSignal = kind === 'signal'
  const isReject = kind === 'reject' || mute
  const stroke = lit || isSignal ? accent : isReject ? dim : soft
  const fill = lit || isSignal ? accentFill : isReject ? 'rgba(255,255,255,0.02)' : 'rgba(255,255,255,0.035)'
  const bar = lit || isSignal ? accentFill2 : soft2
  const sw = lit || isSignal ? 1.6 : 1.25
  return (
    <g
      transform={`translate(${x0},${y0})${rot ? ` rotate(${rot} ${w0 / 2} ${h0 / 2})` : ''}`}
      pointerEvents="none"
    >
      <rect width={w0} height={h0} rx="3.5" stroke={stroke} strokeWidth={sw} fill={fill} />
      <path
        d={`M0 3.5a3.5 3.5 0 0 1 3.5-3.5H${w0 - 3.5}A3.5 3.5 0 0 1 ${w0} 3.5V${Math.max(6, h0 * 0.18)}H0Z`}
        fill={bar}
        stroke={stroke}
        strokeWidth={sw}
      />
      {!isSignal ? (
        <>
          <line
            x1="5"
            y1={h0 * 0.4}
            x2={w0 - 5}
            y2={h0 * 0.4}
            stroke={stroke}
            strokeWidth="1.05"
            opacity="0.85"
          />
          <line
            x1="5"
            y1={h0 * 0.56}
            x2={w0 - 8}
            y2={h0 * 0.56}
            stroke={stroke}
            strokeWidth="1"
            opacity="0.4"
          />
        </>
      ) : (
        <circle cx={w0 / 2} cy={h0 * 0.62} r="2.2" fill={accent} opacity="0.9" />
      )}
      {mark === 'fail' || isReject ? (
        <path
          d={`M${w0 - 13} 8l7.5 7.5M${w0 - 5.5} 8l-7.5 7.5`}
          stroke="rgba(232,233,235,0.5)"
          strokeWidth="1.35"
          strokeLinecap="round"
        />
      ) : null}
    </g>
  )
}

function Station({ label, children, delay, onOpen, capId, hit }) {
  const clickable = typeof onOpen === 'function' && capId
  const activate = (event) => {
    if (!clickable) return
    event.preventDefault()
    event.stopPropagation()
    onOpen(capId)
  }
  return (
    <g
      className={`mf-station enter-item${clickable ? '' : ' mf-station--static'}`}
      role={clickable ? 'button' : undefined}
      tabIndex={clickable ? 0 : undefined}
      aria-label={label}
      data-qa-station={capId || undefined}
      style={{ '--enter-delay': delay }}
      pointerEvents={clickable ? 'auto' : 'none'}
      onClick={clickable ? activate : undefined}
      onKeyDown={
        clickable
          ? (event) => {
              if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault()
                onOpen(capId)
              }
            }
          : undefined
      }
    >
      {hit ? (
        <rect
          className="mf-station-hit"
          x={hit.x}
          y={hit.y}
          width={hit.w}
          height={hit.h}
          rx={hit.rx || 16}
        />
      ) : null}
      {children}
    </g>
  )
}

function StationFrame({ x, y, w, h }) {
  return (
    <rect
      x={x}
      y={y}
      width={w}
      height={h}
      rx="16"
      stroke={accentLine}
      strokeWidth="1.7"
      fill="rgba(14,15,17,0.84)"
    />
  )
}

function StationTitle({ x, y, no, title }) {
  return (
    <>
      <Label x={x + 20} y={y + 30} size={12} weight={700} fill={accent} spacing="0.14em" family={titleFont} anchor="start">
        {no}
      </Label>
      <Label x={x + 50} y={y + 30} size={16} weight={700} fill="#fff" spacing="-0.02em" family={titleFont} anchor="start">
        {title}
      </Label>
    </>
  )
}

function InspectWindow({ cx, cy }) {
  const x = cx - WIN_W / 2
  const y = cy - WIN_H / 2
  return (
    <rect
      x={x}
      y={y}
      width={WIN_W}
      height={WIN_H}
      rx="10"
      stroke={accent}
      strokeWidth="2"
      fill="rgba(62,200,255,0.06)"
    />
  )
}

/* 规则闸门：画在窗里的线稿，不是另一套家具。 */
function GateMark({ cx, cy }) {
  const x = cx - WIN_W / 2
  const y = cy - WIN_H / 2
  const postW = 7
  const postH = 62
  const postY = cy - postH / 2
  return (
    <g pointerEvents="none">
      <rect x={cx - 28} y={postY} width={postW} height={postH} rx="2.5" stroke={accent} strokeWidth="1.8" fill={accentFill} />
      <rect x={cx + 21} y={postY} width={postW} height={postH} rx="2.5" stroke={accent} strokeWidth="1.8" fill={accentFill} />
      <path
        d={`M ${cx - 36} ${cy} H ${cx - 28} M ${cx + 28} ${cy} H ${cx + 36}`}
        stroke={accent}
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.8"
      />
      <Label x={cx} y={y + WIN_H - 12} size={11} weight={650} fill={accent} spacing="0.12em">
        规则
      </Label>
    </g>
  )
}

/* 逐页：窗里正在被看的一页，线稿，不是办公桌。 */
function ReviewMark({ cx, cy }) {
  const x = cx - WIN_W / 2
  const y = cy - WIN_H / 2
  const pw = 40
  const ph = 52
  const px = cx - pw / 2
  const py = cy - ph / 2 - 6
  const tick = 8
  return (
    <g pointerEvents="none">
      <path
        d={`M ${px - 6} ${py + tick} V ${py - 2} H ${px + tick}
            M ${px + pw - tick} ${py - 2} H ${px + pw + 2} V ${py + tick}
            M ${px + pw + 2} ${py + ph - tick} V ${py + ph + 2} H ${px + pw - tick}
            M ${px + tick} ${py + ph + 2} H ${px - 6} V ${py + ph - tick}`}
        stroke={accent}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <Page x={px} y={py} w={pw} h={ph} lit />
      <Label x={cx} y={y + WIN_H - 10} size={11} weight={650} fill={accent} spacing="0.12em">
        逐页
      </Label>
    </g>
  )
}

function RejectTray({ box, label }) {
  return (
    <g pointerEvents="none">
      <rect
        x={box.x}
        y={box.y}
        width={box.w}
        height={box.h}
        rx="8"
        stroke={dim}
        strokeWidth="1.35"
        fill="rgba(255,255,255,0.02)"
      />
      <Page x={box.x + 16} y={box.y + 12} w={22} h={30} kind="reject" rot={-6} />
      <Page x={box.x + 42} y={box.y + 14} w={22} h={30} kind="reject" rot={5} />
      <Label x={box.x + box.w - 14} y={box.y + 34} size={12} weight={650} fill={muted} anchor="end" strike>
        {label}
      </Label>
    </g>
  )
}

function usePrefersReduced() {
  const [reduced, setReduced] = useState(() =>
    typeof window !== 'undefined'
      ? document.documentElement.classList.contains('stage--reduced') ||
        window.matchMedia('(prefers-reduced-motion: reduce)').matches
      : false,
  )
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const sync = () =>
      setReduced(mq.matches || document.documentElement.classList.contains('stage--reduced'))
    mq.addEventListener('change', sync)
    const mo = new MutationObserver(sync)
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })
    sync()
    return () => {
      mq.removeEventListener('change', sync)
      mo.disconnect()
    }
  }, [])
  return reduced
}

function usePathSampler(pathMap) {
  const nodes = useRef({})
  const cache = useRef({})
  const sample = (id, t) => {
    let rec = cache.current[id]
    if (!rec) {
      const el = nodes.current[id]
      if (!el) return null
      rec = { el, len: el.getTotalLength() }
      cache.current[id] = rec
    }
    const u = ((t % 1) + 1) % 1
    const pt = rec.el.getPointAtLength(u * rec.len)
    return { x: pt.x, y: pt.y, u }
  }
  const setRef = (id) => (el) => {
    if (el) nodes.current[id] = el
  }
  return { setRef, sample, pathMap }
}

function useNow(running, period = tokens.motion.intakeCycleMs) {
  const [now, setNow] = useState(0)
  useEffect(() => {
    if (!running) return undefined
    let raf = 0
    const origin = performance.now()
    const loop = (t) => {
      setNow(((t - origin) / period) % 8)
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(raf)
  }, [running, period])
  return now
}

function ParcelLayer({ sample, reduced }) {
  const clock = useNow(!reduced)
  const [ready, setReady] = useState(false)
  useEffect(() => {
    const id = requestAnimationFrame(() => setReady(true))
    return () => cancelAnimationFrame(id)
  }, [])
  const poses = useMemo(() => {
    if (!ready) return []
    return PARCELS.map((p) => {
      const period = p.period || 16
      const cycle = reduced ? 0 : clock * (tokens.motion.intakeCycleMs / 1000)
      const t = reduced ? p.phase : (cycle / period + p.phase) % 1
      const pt = sample(p.path, t)
      if (!pt) return null
      let opacity = 1
      if (!reduced) {
        if (pt.u < 0.06) opacity = pt.u / 0.06
        else if (pt.u > 0.92) opacity = (1 - pt.u) / 0.08
      }
      return { ...p, x: pt.x - p.w / 2, y: pt.y - p.h / 2, opacity }
    })
  }, [clock, sample, reduced, ready])

  return (
    <g className="mf-parcels" pointerEvents="none">
      {poses.map((p) =>
        p ? (
          <g key={p.id} opacity={p.opacity}>
            <Page x={p.x} y={p.y} w={p.w} h={p.h} rot={p.rot} kind={p.kind} mute={p.kind === 'reject'} lit={p.kind === 'signal'} />
          </g>
        ) : null,
      )}
    </g>
  )
}

export function MethodFigure({ catalog, compact = false, onOpen }) {
  const langs = catalog.languages || []
  const c = catalog.counts
  const reduced = usePrefersReduced()
  const { setRef, sample, pathMap } = usePathSampler(PATHS)

  const listTop = ST.classify.y + 52
  const listBot = ST.classify.y + ST.classify.h - 58
  const rowH = langs.length ? (listBot - listTop) / langs.length : 32
  const listX = ST.classify.x + 16
  const listW = ST.classify.w - 32

  return (
    <div className="method-figure-frame" aria-label="研究逻辑总图：来源汇入，机器初筛，视效分类，人审，进入视效库">
      <div className="method-figure">
        <svg
          className="method-figure-svg"
          viewBox={`0 0 ${VW} ${VH}`}
          fill="none"
          role="img"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="mf-intake-fade" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0" stopColor={accent} stopOpacity="0.04" />
              <stop offset="1" stopColor={accent} stopOpacity="0.5" />
            </linearGradient>
            {Object.entries(pathMap).map(([id, d]) => (
              <path key={id} id={`mf-path-${id}`} d={d} ref={setRef(id)} />
            ))}
          </defs>

          <path
            d={PATHS.spine}
            stroke={accentLine}
            strokeWidth="2"
            fill="none"
            opacity="0.36"
          />
          <path
            d={PATHS.loopScreen}
            className="mf-loop"
            stroke={accentLine}
            strokeWidth="1.55"
            fill="none"
            strokeDasharray="5 6"
            strokeLinecap="round"
            pointerEvents="none"
          />
          <path
            d={PATHS.loopClassify}
            className="mf-loop"
            stroke={accentLine}
            strokeWidth="1.55"
            fill="none"
            strokeDasharray="5 6"
            strokeLinecap="round"
            pointerEvents="none"
          />
          {/* 回流标注贴在回路上，靠近对应工位，不漂在走廊里。 */}
          <g pointerEvents="none">
            <Label x={X.screen + 36} y="100" size={12} weight={650} fill={accent} spacing="0.08em">
              规则修订
            </Label>
            <Label x={X.classMid - 8} y="614" size={12} weight={650} fill={accent} spacing="0.08em">
              分类修订
            </Label>
          </g>

          {/* ===== 01 来源汇入：三条主渠 ===== */}
          <Station label="来源汇入" delay={`${categoryStagger(0)}ms`} onOpen={onOpen} capId="intake" hit={{ x: 16, y: ST.classify.y, w: 188, h: 400 }}>
            <StationTitle x={20} y={ST.classify.y} no="01" title="来源汇入" />
            {MAIN_CHANNELS.map((ch, i) => {
              const y = [220, CY, 456][i]
              const w = compact ? 96 : 124
              return (
                <g key={ch.id}>
                  <rect
                    x="28"
                    y={y - 34}
                    width={w}
                    height="68"
                    rx="8"
                    stroke={accentLine}
                    strokeWidth="1.5"
                    fill="rgba(14,15,17,0.72)"
                  />
                  <Label x="42" y={y - 4} size={14} weight={700} fill="#f2f3f4" anchor="start" spacing="0.01em">
                    {compact ? ch.short : ch.label}
                  </Label>
                  <Label x="42" y={y + 16} size={11} weight={600} fill={muted} anchor="start" spacing="0.06em">
                    {ch.line}
                  </Label>
                </g>
              )
            })}
            <path d={PATHS.intakeOfficial} stroke="url(#mf-intake-fade)" strokeWidth="1.7" fill="none" strokeLinecap="round" />
            <path d={PATHS.intakeOss} stroke="url(#mf-intake-fade)" strokeWidth="1.7" fill="none" strokeLinecap="round" />
            <path d={PATHS.intakeX} stroke="url(#mf-intake-fade)" strokeWidth="1.7" fill="none" strokeLinecap="round" />
            {reduced
              ? [
                  { x: 148, y: 190, rot: -6 },
                  { x: 158, y: 312, rot: 3 },
                  { x: 148, y: 426, rot: 5 },
                ].map((p, i) => <Page key={`st-in-${i}`} {...p} w={30} h={40} />)
              : null}
          </Station>

          {/* ===== 02 机器初筛：与人审同一套站框与检查窗 ===== */}
          <Station label="机器初筛" delay={`${categoryStagger(1)}ms`} onOpen={onOpen} capId="screen" hit={{ x: ST.screen.x, y: TRAY_UP.y, w: ST.screen.w, h: TRAY_DN.y + TRAY_DN.h - TRAY_UP.y }}>
            <StationFrame {...ST.screen} />
            <StationTitle x={ST.screen.x} y={ST.screen.y} no="02" title="机器初筛" />
            <RejectTray box={TRAY_UP} label="引擎" />
            <RejectTray box={TRAY_DN} label="playground" />
            <InspectWindow cx={X.screen} cy={CY} />
            <GateMark cx={X.screen} cy={CY} />
          </Station>

          {/* ===== 03 视效分类：「9 种」与九行同处一个模块 ===== */}
          <Station label="视效分类" delay={`${categoryStagger(2)}ms`} onOpen={onOpen} capId="classify" hit={ST.classify}>
            <StationFrame {...ST.classify} />
            <StationTitle x={ST.classify.x} y={ST.classify.y} no="03" title="视效分类" />
            <g pointerEvents="none">
              <rect
                x={ST.classify.x + ST.classify.w - 70}
                y={ST.classify.y + 14}
                width="54"
                height="24"
                rx="12"
                stroke={accent}
                strokeWidth="1.4"
                fill={accentFill}
              />
              <Label
                x={ST.classify.x + ST.classify.w - 43}
                y={ST.classify.y + 31}
                size={12}
                weight={700}
                fill={accent}
                spacing="0.04em"
                family={titleFont}
              >
                9 种
              </Label>
            </g>
            {langs.map((lang, i) => {
              const ry = listTop + i * rowH
              const rh = rowH - 6
              return (
                <g key={lang.id} pointerEvents="none">
                  <rect
                    x={listX}
                    y={ry}
                    width={listW}
                    height={rh}
                    rx="7"
                    stroke="rgba(62,200,255,0.45)"
                    strokeWidth="1.35"
                    fill="rgba(14,15,17,0.88)"
                  />
                  <Label x={listX + 12} y={ry + rh / 2 + 5} size={13} weight={700} fill="#f2f3f4" anchor="start" spacing="0.01em">
                    {lang.short}
                  </Label>
                  <Label
                    x={listX + listW - 12}
                    y={ry + rh / 2 + 5}
                    size={15}
                    weight={700}
                    fill={accent}
                    anchor="end"
                    spacing="-0.03em"
                    family={titleFont}
                  >
                    {lang.count}
                  </Label>
                </g>
              )
            })}
            {/* 动效不是分类轴，但作为划掉芯片贴在同一模块底边。 */}
            <g pointerEvents="none">
              <rect
                x={ST.classify.x + 16}
                y={ST.classify.y + ST.classify.h - 46}
                width={ST.classify.w - 32}
                height="30"
                rx="7"
                stroke={dim}
                strokeWidth="1.3"
                fill="rgba(255,255,255,0.02)"
              />
              <Label
                x={ST.classify.x + ST.classify.w / 2}
                y={ST.classify.y + ST.classify.h - 26}
                size={12}
                weight={650}
                fill={muted}
                strike
              >
                动效 · 不是分类轴
              </Label>
            </g>
          </Station>

          {/* ===== 04 人审：同一检查窗，机制是逐页看 ===== */}
          <Station label="人审" delay={`${categoryStagger(3)}ms`} onOpen={onOpen} capId="review" hit={ST.review}>
            <StationFrame {...ST.review} />
            <StationTitle x={ST.review.x} y={ST.review.y} no="04" title="人审" />
            <InspectWindow cx={X.review} cy={CY} />
            <ReviewMark cx={X.review} cy={CY} />
          </Station>

          {/* ===== 05 视效库：124 是已入库标杆；点亮脚注单独可点 ===== */}
          <Station
            label="视效库"
            delay={`${categoryStagger(4)}ms`}
            onOpen={onOpen}
            capId="wall"
            hit={{ x: 1116, y: ST.classify.y, w: 280, h: 348 }}
          >
            <StationTitle x={1128} y={ST.classify.y} no="05" title="视效库" />
            {[0, 1, 2, 3].map((row) =>
              [0, 1, 2, 3].map((col) => (
                <Page
                  key={`w-${row}-${col}`}
                  x={1160 + col * 36 + (row % 2 ? 8 : 0)}
                  y={188 + row * 44}
                  w={28}
                  h={36}
                  lit={row < 2 && col < 3}
                  rot={((row * 3 + col) % 5) - 2}
                />
              )),
            )}
            <Label x={1230} y={400} size={56} weight={700} fill={accent} spacing="-0.06em" family={titleFont}>
              {c.onWall}
            </Label>
            <Label x={1230} y={424} size={13} weight={600} fill={muted} spacing="0.06em">
              已入库标杆
            </Label>
            <Label x={1230} y={446} size={12} weight={500} fill={muted} spacing="0.04em">
              {c.withCapture} 实拍 · 缺 {c.missingCapture}
            </Label>
          </Station>
          <Station
            label="点亮 / 排期"
            delay={`${categoryStagger(4) + 80}ms`}
            onOpen={onOpen}
            capId="lightup"
            hit={{ x: 1148, y: 478, w: 430, h: 36, rx: 8 }}
          >
            <Label x={1160} y={500} size={12} weight={600} fill={muted} spacing="0.03em" anchor="start">
              {`点亮 ${c.present}    做了但不够 ${c.attempted}（${c.attemptedPages} 页 / ${c.reviewed} 页抽样）    接近标杆 ${c.nearBenchmark}`}
            </Label>
          </Station>

          <ParcelLayer sample={sample} reduced={reduced} />
        </svg>
      </div>
    </div>
  )
}
