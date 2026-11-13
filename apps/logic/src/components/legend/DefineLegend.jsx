import { useEffect, useState } from 'react'
import { useReducedMotion } from './media.jsx'

function Specimen({ mode }) {
  return (
    <div className={`specimen is-${mode}`} aria-hidden="true">
      <div className="specimen-object">
        <span className="specimen-sheet" />
        <span className="specimen-veil" />
        <span className="specimen-lens" />
        <span className="specimen-sheen" />
        <span className="specimen-edge" />
      </div>
    </div>
  )
}

export function DefineLegend({ onOpen }) {
  const reduced = useReducedMotion()
  const [mode, setMode] = useState('basic')
  const [locked, setLocked] = useState(false)

  useEffect(() => {
    if (reduced || locked) return undefined
    const timer = window.setInterval(() => {
      setMode((m) => (m === 'basic' ? 'high' : 'basic'))
    }, 3800)
    return () => window.clearInterval(timer)
  }, [reduced, locked])

  const choose = (next) => {
    setLocked(true)
    setMode(next)
  }

  if (reduced) {
    return (
      <section className="legend legend--define is-still" aria-label="定义">
        <div className="specimen-sequence">
          <div className="specimen-still">
            <Specimen mode="basic" />
            <p className="specimen-label">基础</p>
          </div>
          <div className="specimen-still">
            <Specimen mode="high" />
            <p className="specimen-label">高阶</p>
          </div>
        </div>
        <button type="button" className="legend-source" onClick={() => onOpen('origins')}>
          来源与推理
        </button>
      </section>
    )
  }

  return (
    <section className="legend legend--define" aria-label="定义">
      <Specimen mode={mode} />
      <div className="specimen-states">
        <button
          type="button"
          className={mode === 'basic' ? 'is-on' : ''}
          aria-pressed={mode === 'basic'}
          onClick={() => choose('basic')}
        >
          基础
        </button>
        <button
          type="button"
          className={mode === 'high' ? 'is-on' : ''}
          aria-pressed={mode === 'high'}
          onClick={() => choose('high')}
        >
          高阶
        </button>
      </div>
      <button type="button" className="legend-source" onClick={() => onOpen('origins')}>
        来源与推理
      </button>
    </section>
  )
}
