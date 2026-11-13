import { useCallback, useEffect, useReducer, useRef, useState } from 'react'
import catalog from './data/catalog.json'
import { tokens } from './tokens.js'
import {
  createInitialState,
  reduce,
  interpretKey,
  interpretWheel,
  parseHash,
  hashFor,
  isDrilled,
  isLogicChapter,
  LOGIC_CHAPTER_IDS,
  findChapter,
} from './nav/deckState.js'
import { BookChrome, bookStatus } from './components/Chrome.jsx'
import { LayerSwitch } from './components/LayerSwitch.jsx'
import {
  ResultsOverview,
  ResultsScenes,
  ResultsVariants,
  preloadResultsLayer,
} from './components/Results.jsx'
import { MethodOverview } from './components/Method.jsx'

const LOGIC_ONLY = import.meta.env.VITE_LOGIC_ONLY === 'true'
const LOGIC_CHAPTERS = catalog.chapters.filter((ch) => LOGIC_CHAPTER_IDS.includes(ch.id))
const WHEEL_THRESHOLD = 80
const WHEEL_COOLDOWN_MS = 520

function detectEmbed() {
  if (typeof window === 'undefined') return false
  try {
    if (new URLSearchParams(window.location.search).get('embed') === '1') return true
    return window.parent !== window
  } catch {
    return true
  }
}

function reducer(state, action) {
  return reduce(state, action, catalog)
}

export default function App() {
  const [state, dispatch] = useReducer(reducer, undefined, () => {
    const initial = createInitialState()
    const fromHash = typeof window !== 'undefined' ? parseHash(window.location.hash) : initial.chapterId
    if (fromHash === initial.chapterId) return initial
    return reduce(initial, { type: 'GO_CHAPTER', id: fromHash }, catalog)
  })
  const stateRef = useRef(state)
  stateRef.current = state

  const embedded = detectEmbed()
  const [compact, setCompact] = useState(false)
  const [reduced, setReduced] = useState(() =>
    typeof window !== 'undefined'
      ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
      : false,
  )
  const transitionMode = useRef('chapter')
  const lastChapter = useRef(state.chapterId)

  const send = useCallback((action) => {
    if (!action) return
    if (LOGIC_ONLY) {
      if (action.type === 'GO_CHAPTER' && !isLogicChapter(action.id)) return
    }
    const current = stateRef.current
    const next = reduce(current, action, catalog)
    if (next.chapterId !== current.chapterId) transitionMode.current = 'chapter'
    else if (next.layer !== current.layer && !isLogicChapter(next.chapterId)) {
      transitionMode.current = 'drill'
    }
    lastChapter.current = next.chapterId
    dispatch(action)
  }, [])

  useEffect(() => {
    const onReduced = () => {
      const on = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      setReduced(on)
    }
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    mq.addEventListener('change', onReduced)
    onReduced()
    return () => mq.removeEventListener('change', onReduced)
  }, [])

  useEffect(() => {
    const root = document.documentElement
    if (reduced) {
      root.style.setProperty('--travel-chapter-enter', '0px')
      root.style.setProperty('--travel-item-enter', '0px')
      root.style.setProperty('--dur-crossfade', '0ms')
      root.style.setProperty('--dur-chapter-enter', '0ms')
      root.style.setProperty('--delay-chapter-enter', '0ms')
      root.style.setProperty('--dur-chapter-fade', '0ms')
      root.style.setProperty('--dur-item-enter', '0ms')
      root.style.setProperty('--dur-dash', '0ms')
    } else {
      root.style.setProperty('--travel-chapter-enter', `${tokens.motion.chapterEnterTravelPx}px`)
      root.style.setProperty('--travel-item-enter', `${tokens.motion.itemEnterTravelPx}px`)
      root.style.setProperty('--dur-crossfade', `${tokens.motion.crossfadeMs}ms`)
      root.style.setProperty('--dur-chapter-enter', `${tokens.motion.chapterEnterMs}ms`)
      root.style.setProperty('--delay-chapter-enter', `${tokens.motion.chapterEnterDelayMs}ms`)
      root.style.setProperty('--dur-chapter-fade', `${tokens.motion.chapterChangeFadeMs}ms`)
      root.style.setProperty('--dur-item-enter', `${tokens.motion.itemEnterMs}ms`)
      root.style.setProperty('--dur-dash', `${tokens.motion.dashLoopMs}ms`)
    }
  }, [reduced])

  useEffect(() => {
    const stage = document.querySelector('.stage')
    if (!stage) return undefined
    const apply = () => setCompact(stage.clientWidth < tokens.layout.compactWidthPx)
    apply()
    const ro = new ResizeObserver(apply)
    ro.observe(stage)
    return () => ro.disconnect()
  }, [])

  useEffect(() => {
    const nextHash = hashFor(state.chapterId)
    if (window.location.hash !== nextHash) {
      window.history.replaceState(null, '', nextHash)
    }
  }, [state.chapterId])

  useEffect(() => {
    const onHash = () => {
      const id = parseHash(window.location.hash)
      send({ type: 'GO_CHAPTER', id })
    }
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [send])

  useEffect(() => {
    const onKey = (event) => {
      if (event.key === 'Escape' && embedded && !isDrilled(stateRef.current)) {
        return
      }
      const read = interpretKey(event.key, stateRef.current, {
        alt: event.altKey,
        ctrl: event.ctrlKey,
        meta: event.metaKey,
      })
      if (!read) return
      if (read.consume) {
        event.preventDefault()
        event.stopPropagation()
      }
      if (read.action) send(read.action)
    }
    window.addEventListener('keydown', onKey, true)
    return () => window.removeEventListener('keydown', onKey, true)
  }, [send, embedded])

  useEffect(() => {
    let acc = 0
    let lockedUntil = 0
    const onWheel = (event) => {
      const modalBody = event.target && event.target.closest && event.target.closest('.book-modal-body')
      if (modalBody && modalBody.scrollHeight > modalBody.clientHeight) {
        event.stopPropagation()
        return
      }
      event.preventDefault()
      event.stopPropagation()
      const now = performance.now()
      if (now < lockedUntil) return
      acc += event.deltaY
      if (Math.abs(acc) < WHEEL_THRESHOLD) return
      const deltaY = acc
      acc = 0
      lockedUntil = now + WHEEL_COOLDOWN_MS
      const action = interpretWheel(deltaY, stateRef.current)
      if (action) send(action)
    }
    window.addEventListener('wheel', onWheel, { capture: true, passive: false })
    return () => window.removeEventListener('wheel', onWheel, { capture: true, passive: false })
  }, [send])

  useEffect(() => {
    if (!state.autoplay) return undefined
    if (isDrilled(state)) return undefined
    const timer = window.setTimeout(() => {
      send({ type: 'AUTOPLAY_TICK' })
    }, tokens.motion.autoplayMs)
    return () => window.clearTimeout(timer)
  }, [state.autoplay, state.chapterId, state.layer, send])

  useEffect(() => {
    if (LOGIC_ONLY) return undefined
    preloadResultsLayer(catalog, state)
  }, [state.layer, state.categoryId, state.chapterId])

  const fadeKey = isLogicChapter(state.chapterId)
    ? state.chapterId
    : `${state.chapterId}:${state.layer}`
  const drilled = isDrilled(state) && !isLogicChapter(state.chapterId)
  const chapter = findChapter(catalog, state.chapterId)

  return (
    <div
      className={[
        'stage',
        'stage--book',
        compact ? 'stage--compact' : '',
        reduced ? 'stage--reduced' : '',
        embedded ? 'stage--embed' : '',
        drilled ? 'stage--drilled' : '',
      ]
        .filter(Boolean)
        .join(' ')}
      tabIndex={-1}
    >
      <BookChrome
        chapters={LOGIC_CHAPTERS}
        chapterId={state.chapterId}
        autoplay={state.autoplay}
        onChapter={(id) => send({ type: 'GO_CHAPTER', id })}
        onToggleAutoplay={() => send({ type: 'TOGGLE_AUTOPLAY' })}
        drilled={drilled}
        status={bookStatus(chapter)}
      />
      <div className="stage-body">
        <LayerSwitch fadeKey={fadeKey} mode={transitionMode.current} reduced={reduced}>
          <ChapterView
            state={state}
            send={send}
            compact={compact}
          />
        </LayerSwitch>
      </div>
    </div>
  )
}

function ChapterView({ state, send, compact }) {
  const [wallOpen, setWallOpen] = useState(false)
  const wallRef = useRef(false)
  wallRef.current = wallOpen

  const openDrill = (id) => {
    if (id === 'wall') {
      if (state.layer === 'detail') send({ type: 'CLOSE_TO_OVERVIEW' })
      setWallOpen(true)
      return
    }
    setWallOpen(false)
    send({ type: 'OPEN_CAPABILITY', id })
  }
  const closeModal = () => {
    setWallOpen(false)
    send({ type: 'CLOSE_TO_OVERVIEW' })
  }

  useEffect(() => {
    const onKey = (event) => {
      if (!wallRef.current) return
      if (event.altKey || event.ctrlKey || event.metaKey) return
      if (event.key === 'Escape') {
        event.preventDefault()
        event.stopPropagation()
        setWallOpen(false)
        return
      }
      if (
        event.key === 'ArrowLeft' ||
        event.key === 'ArrowRight' ||
        event.key === 'ArrowUp' ||
        event.key === 'ArrowDown' ||
        event.key === 'PageUp' ||
        event.key === 'PageDown' ||
        event.key === ' ' ||
        event.key === 'Spacebar' ||
        event.key === 'Home' ||
        event.key === '.' ||
        event.key === '0' ||
        /^[1-9]$/.test(event.key)
      ) {
        event.preventDefault()
        event.stopPropagation()
      }
    }
    window.addEventListener('keydown', onKey, true)
    return () => window.removeEventListener('keydown', onKey, true)
  }, [])

  if (LOGIC_ONLY || state.chapterId === 'method') {
    const modalId = wallOpen ? 'wall' : state.layer === 'detail' ? state.capabilityId : null
    return (
      <MethodOverview
        catalog={catalog}
        onOpen={openDrill}
        compact={compact}
        modalId={modalId}
        onCloseModal={closeModal}
        onSelect={openDrill}
      />
    )
  }

  if (state.layer === 'category') {
    return (
      <ResultsScenes
        catalog={catalog}
        categoryId={state.categoryId}
        onOpenScene={(categoryId, sceneId) => send({ type: 'OPEN_SCENE', categoryId, sceneId })}
        onBack={() => send({ type: 'GO_UP' })}
        onClose={() => send({ type: 'CLOSE_TO_OVERVIEW' })}
      />
    )
  }
  if (state.layer === 'variants') {
    return (
      <ResultsVariants
        catalog={catalog}
        categoryId={state.categoryId}
        sceneId={state.sceneId}
        variantIndex={state.variantIndex}
        onBack={() => send({ type: 'GO_UP' })}
        onClose={() => send({ type: 'CLOSE_TO_OVERVIEW' })}
        onSelectVariant={(index) => send({ type: 'SET_VARIANT', index })}
      />
    )
  }
  return (
    <ResultsOverview
      catalog={catalog}
      onOpen={(id) => send({ type: 'OPEN_CATEGORY', id })}
    />
  )
}
