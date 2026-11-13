import { useEffect, useState } from 'react'
import { assetSrc } from '../../lib/media.js'

export function wallSrc(item) {
  if (!item) return null
  if (import.meta.env.VITE_LOGIC_ONLY === 'true' && item.id) {
    return `../thumbs/vfx/${item.id}.webp`
  }
  return assetSrc(item.image)
}

export function lightupSrc(id) {
  return `../thumbs/vfx/lightup/${id}-hero.jpg`
}

export function findCase(catalog, id) {
  for (const lang of catalog.languages) {
    const found = lang.cases.find((c) => c.id === id)
    if (found) return found
  }
  return null
}

export function casesByIds(catalog, ids) {
  return ids.map((id) => findCase(catalog, id)).filter(Boolean)
}

export function useReducedMotion() {
  const [reduced, setReduced] = useState(() =>
    typeof window !== 'undefined'
      ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
      : false,
  )
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const on = () => setReduced(mq.matches)
    mq.addEventListener('change', on)
    return () => mq.removeEventListener('change', on)
  }, [])
  return reduced
}

export function HangThumb({ item, className = '', alt, styleVars }) {
  const src = wallSrc(item)
  return (
    <figure className={`legend-thumb ${className}`.trim()} style={styleVars}>
      {src ? <img src={src} alt={alt || item.name || ''} /> : <span className="legend-thumb-empty" />}
    </figure>
  )
}
