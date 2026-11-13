import { useEffect, useState } from 'react'
import { casesByIds, HangThumb, lightupSrc, useReducedMotion } from './media.jsx'

const STEPS = ['gate', 'classify', 'wall', 'cover']
const STEP_AT = { gate: 80, classify: 2600, wall: 5200, cover: 7800 }
const STEP_LABEL = {
  gate: '关口',
  classify: '按语言归类',
  wall: '上墙',
  cover: '对照自身',
}

const ITEMS = [
  { id: 'apple-iphone-18-pro', lang: 'liquid-glass', gx: 12, gy: 42, cx: 4, cy: 42 },
  { id: 'harmonyos-7-consumer', lang: 'liquid-glass', gx: 36, gy: 16, cx: 18, cy: 42 },
  { id: 'threeui-aureon-crystal-button', lang: 'liquid-glass', gx: 54, gy: 62, cx: 4, cy: 68 },
  { id: 'product-suno', lang: 'fluid-shader', gx: 6, gy: 70, cx: 38, cy: 42 },
  { id: 'aura-ink-landing-page-69', lang: 'fluid-shader', gx: 72, gy: 22, cx: 52, cy: 42 },
  { id: 'threeui-portal-field', lang: 'fluid-shader', gx: 28, gy: 80, cx: 38, cy: 68 },
  { id: 'studio-lusion-everswap', lang: 'realtime-world', gx: 84, gy: 66, cx: 72, cy: 42 },
  { id: 'fwa-explore-primland', lang: 'realtime-world', gx: 62, gy: 8, cx: 86, cy: 42 },
  { id: 'threeui-orrery-page', lang: 'realtime-world', gx: 44, gy: 36, cx: 72, cy: 68 },
]

const DECOYS = [
  { gx: 4, gy: 8 },
  { gx: 24, gy: 4 },
  { gx: 82, gy: 10 },
]

const LANG_SHORT = {
  'liquid-glass': '液态玻璃',
  'fluid-shader': '流体',
  'realtime-world': '场景与世界',
}

export function PipelineLegend({ catalog, onOpen }) {
  const reduced = useReducedMotion()
  const items = casesByIds(catalog, ITEMS.map((d) => d.id))
  const byId = Object.fromEntries(items.map((c) => [c.id, c]))
  const [step, setStep] = useState(reduced ? 'cover' : 'gate')

  useEffect(() => {
    if (reduced) {
      setStep('cover')
      return undefined
    }
    setStep('gate')
    const timers = STEPS.map((id) => window.setTimeout(() => setStep(id), STEP_AT[id]))
    return () => timers.forEach((t) => window.clearTimeout(t))
  }, [reduced])

  if (reduced) {
    return (
      <section className="legend legend--pipeline is-still" aria-label="管线">
        <ol className="pipe-still">
          {STEPS.map((id) => (
            <li key={id}>{STEP_LABEL[id]}</li>
          ))}
        </ol>
        <div className="pipe-still-wall">
          {ITEMS.map((slot) => {
            const item = byId[slot.id]
            if (!item) return null
            return <HangThumb key={item.id} item={item} className={`is-${slot.lang}`} />
          })}
          <figure className="legend-thumb is-own">
            <img src={lightupSrc('unused_000022_q1')} alt="" />
          </figure>
        </div>
        <button type="button" className="legend-source" onClick={() => onOpen('gate')}>
          关口到覆盖
        </button>
      </section>
    )
  }

  return (
    <section className={`legend legend--pipeline is-${step}`} aria-label="管线">
      <p className="pipe-step" aria-live="polite">
        {STEP_LABEL[step]}
      </p>
      <div className="pipe-field">
        {DECOYS.map((d, i) => (
          <div
            key={i}
            className="pipe-decoy"
            style={{ '--gx': d.gx, '--gy': d.gy }}
            aria-hidden="true"
          />
        ))}
        {ITEMS.map((slot) => {
          const item = byId[slot.id]
          if (!item) return null
          return (
            <HangThumb
              key={item.id}
              item={item}
              className={`pipe-item is-${slot.lang}`}
              styleVars={{ '--gx': slot.gx, '--gy': slot.gy, '--cx': slot.cx, '--cy': slot.cy }}
            />
          )
        })}
        <figure
          className="legend-thumb pipe-own is-own"
          style={{ '--cx': 18, '--cy': 68 }}
        >
          <img src={lightupSrc('unused_000022_q1')} alt="" />
        </figure>
        <div className="pipe-lang-marks" aria-hidden="true">
          <span className="pipe-lang is-liquid-glass">{LANG_SHORT['liquid-glass']}</span>
          <span className="pipe-lang is-fluid-shader">{LANG_SHORT['fluid-shader']}</span>
          <span className="pipe-lang is-realtime-world">{LANG_SHORT['realtime-world']}</span>
        </div>
      </div>
      <button type="button" className="legend-source" onClick={() => onOpen('gate')}>
        关口到覆盖
      </button>
    </section>
  )
}
