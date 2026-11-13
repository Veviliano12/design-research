import { useEffect, useState } from 'react'
import { casesByIds, HangThumb, useReducedMotion } from './media.jsx'

const STAY_IDS = [
  'apple-iphone-18-pro',
  'threeui-aureon-crystal-button',
  'product-suno',
  'aura-ink-landing-page-69',
  'apple-music',
  'cssda-bmw-f3',
]

const RECEDE_IDS = ['studio-lusion-everswap', 'fwa-explore-primland', 'threeui-orrery-page']

export function PriorityLegend({ catalog, onOpen }) {
  const reduced = useReducedMotion()
  const stay = casesByIds(catalog, STAY_IDS)
  const recede = casesByIds(catalog, RECEDE_IDS)
  const [settled, setSettled] = useState(reduced)

  useEffect(() => {
    if (reduced) {
      setSettled(true)
      return undefined
    }
    setSettled(false)
    const timer = window.setTimeout(() => setSettled(true), 700)
    return () => window.clearTimeout(timer)
  }, [reduced])

  return (
    <section
      className={`legend legend--priority${settled ? ' is-settled' : ''}${reduced ? ' is-still' : ''}`}
      aria-label="优先级"
    >
      <div className="priority-wall">
        {stay.map((item) => (
          <HangThumb key={item.id} item={item} className="is-stay" />
        ))}
        {recede.map((item) => (
          <HangThumb key={item.id} item={item} className="is-recede" />
        ))}
      </div>
      <button type="button" className="legend-source" onClick={() => onOpen('hbr')}>
        来源与操作顺序
      </button>
    </section>
  )
}
