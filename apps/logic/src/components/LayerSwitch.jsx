import { useEffect, useRef, useState } from 'react'
import { tokens } from '../tokens.js'

export function LayerSwitch({ fadeKey, mode = 'drill', reduced = false, children }) {
  const prevKeyRef = useRef(fadeKey)
  const prevNodeRef = useRef(children)
  const prevModeRef = useRef(mode)
  const [outgoing, setOutgoing] = useState(null)

  useEffect(() => {
    if (prevKeyRef.current !== fadeKey) {
      const leaving = {
        key: prevKeyRef.current,
        node: prevNodeRef.current,
        mode: prevModeRef.current,
      }
      prevKeyRef.current = fadeKey
      prevModeRef.current = mode
      prevNodeRef.current = children
      setOutgoing(leaving)
      const hold = reduced
        ? 0
        : mode === 'chapter'
          ? tokens.motion.chapterLeaveHoldMs
          : tokens.motion.crossfadeMs
      const timer = window.setTimeout(() => setOutgoing(null), hold)
      return () => window.clearTimeout(timer)
    }
    prevNodeRef.current = children
    prevModeRef.current = mode
    return undefined
  }, [fadeKey, children, mode, reduced])

  const incomingClass = mode === 'chapter' ? 'is-chapter-in' : 'is-drill-in'

  return (
    <>
      {outgoing ? (
        <div
          className={`layer ${mode === 'chapter' ? 'is-chapter-out' : 'is-drill-out'}`}
          aria-hidden="true"
        >
          {outgoing.node}
        </div>
      ) : null}
      <div className={`layer ${incomingClass}`} key={fadeKey}>
        {children}
      </div>
    </>
  )
}
