/** Pure navigation state for the presentation deck. Hash records chapter only. */

export const VISIBLE_CHAPTER_IDS = ['method']
export const HIDDEN_CHAPTER_IDS = ['results', 'compare']
export const START_CHAPTER_ID = 'method'
export const LOGIC_CHAPTER_IDS = ['method']
/** 下钻以当前页上的大弹窗打开，不再隐藏，也不再整页替换总图。 */
export const LOGIC_DRILLS_HIDDEN = false

export function createInitialState() {
  return {
    chapterId: START_CHAPTER_ID,
    layer: 'overview',
    categoryId: null,
    capabilityId: null,
    sceneId: null,
    variantIndex: 0,
    autoplay: false,
  }
}

export function isDrilled(state) {
  return state.layer !== 'overview'
}

export function isVisibleChapter(id) {
  return VISIBLE_CHAPTER_IDS.includes(id)
}

export function chapterIndex(id) {
  return VISIBLE_CHAPTER_IDS.indexOf(id)
}

export function isLogicChapter(id) {
  return LOGIC_CHAPTER_IDS.includes(id)
}

export function findChapter(catalog, id) {
  return (
    catalog.chapters.find((c) => c.id === id) ||
    catalog.hiddenChapters.find((c) => c.id === id) ||
    null
  )
}

export function drillsOf(chapterId, catalog) {
  if (chapterId === 'define') {
    return [...(catalog.defineDrills || []), ...(catalog.priorityDrills || [])]
  }
  if (chapterId === 'method') return catalog.capabilities || []
  if (chapterId === 'coverage') return catalog.coverageDrills || []
  return []
}

function firstDrillId(chapterId, catalog) {
  return drillsOf(chapterId, catalog)[0]?.id ?? null
}

function drillIds(chapterId, catalog) {
  return drillsOf(chapterId, catalog).map((d) => d.id)
}

export function chapterOfDrill(catalog, id) {
  if ((catalog.defineDrills || []).some((d) => d.id === id)) return 'define'
  if ((catalog.priorityDrills || []).some((d) => d.id === id)) return 'define'
  if ((catalog.capabilities || []).some((d) => d.id === id)) return 'method'
  if ((catalog.coverageDrills || []).some((d) => d.id === id)) return 'coverage'
  return null
}

function resetLayer(partial = {}) {
  return {
    layer: 'overview',
    categoryId: null,
    capabilityId: null,
    sceneId: null,
    variantIndex: 0,
    ...partial,
  }
}

export function parseHash(hash) {
  const raw = String(hash || '').replace(/^#/, '').trim()
  if (isVisibleChapter(raw)) return raw
  return START_CHAPTER_ID
}

export function hashFor(chapterId) {
  return `#${chapterId}`
}

function firstCategoryId(catalog) {
  return catalog.categories[0].id
}

function scenesOf(state, catalog) {
  if (state.chapterId !== 'results' || !state.categoryId) return []
  if (state.categoryId === 'benchmarks') return catalog.languages
  return catalog.selfScenes
}

function firstSceneId(state, catalog) {
  const scenes = scenesOf({ ...state, categoryId: state.categoryId }, catalog)
  return scenes[0]?.id ?? null
}

function categoryIds(catalog) {
  return catalog.categories.map((c) => c.id)
}

function siblingShift(ids, current, dir) {
  const i = ids.indexOf(current)
  if (i < 0) return current
  const next = i + dir
  if (next < 0 || next >= ids.length) return current
  return ids[next]
}

function atSiblingEnd(ids, current, dir) {
  const i = ids.indexOf(current)
  const next = i + dir
  return i < 0 || next < 0 || next >= ids.length
}

export function goChapter(state, chapterId, { fromStart = false } = {}) {
  if (!isVisibleChapter(chapterId)) return state
  if (chapterId === state.chapterId && state.layer === 'overview' && !fromStart) {
    return state
  }
  return {
    ...state,
    chapterId,
    ...resetLayer(),
  }
}

export function reduce(state, action, catalog) {
  switch (action.type) {
    case 'NEXT_CHAPTER': {
      if (isDrilled(state)) return state
      const i = chapterIndex(state.chapterId)
      if (i < 0 || i >= VISIBLE_CHAPTER_IDS.length - 1) {
        return state.autoplay ? { ...state, autoplay: false } : state
      }
      return goChapter(state, VISIBLE_CHAPTER_IDS[i + 1])
    }
    case 'PREV_CHAPTER': {
      if (isDrilled(state)) return state
      const i = chapterIndex(state.chapterId)
      if (i <= 0) {
        return state.autoplay ? { ...state, autoplay: false } : state
      }
      return goChapter(state, VISIBLE_CHAPTER_IDS[i - 1])
    }
    case 'GO_START':
      return {
        ...goChapter(state, START_CHAPTER_ID, { fromStart: true }),
        autoplay: action.keepAutoplay ? state.autoplay : false,
      }
    case 'GO_CHAPTER':
      if (!isVisibleChapter(action.id)) return state
      return goChapter(state, action.id)
    case 'DRILL_DOWN': {
      if (state.chapterId === 'results') {
        if (state.layer === 'overview') {
          const categoryId = firstCategoryId(catalog)
          return {
            ...state,
            layer: 'category',
            categoryId,
            sceneId: null,
            variantIndex: 0,
          }
        }
        if (state.layer === 'category') {
          const sceneId = firstSceneId(state, catalog)
          if (!sceneId) return state
          return { ...state, layer: 'variants', sceneId, variantIndex: 0 }
        }
        return state
      }
      if (isLogicChapter(state.chapterId)) {
        if (state.layer === 'overview') {
          const capabilityId = firstDrillId(state.chapterId, catalog)
          if (!capabilityId) return state
          return {
            ...state,
            layer: 'detail',
            capabilityId,
          }
        }
        return state
      }
      return state
    }
    case 'OPEN_CATEGORY':
      return {
        ...state,
        chapterId: 'results',
        layer: 'category',
        categoryId: action.id,
        sceneId: null,
        variantIndex: 0,
        capabilityId: null,
      }
    case 'OPEN_SCENE':
      return {
        ...state,
        chapterId: 'results',
        layer: 'variants',
        categoryId: action.categoryId,
        sceneId: action.sceneId,
        variantIndex: 0,
        capabilityId: null,
      }
    case 'OPEN_CAPABILITY': {
      const chapterId = chapterOfDrill(catalog, action.id) || state.chapterId
      return {
        ...state,
        chapterId,
        layer: 'detail',
        capabilityId: action.id,
        categoryId: null,
        sceneId: null,
        variantIndex: 0,
      }
    }
    case 'GO_UP': {
      if (!isDrilled(state)) return state
      if (state.chapterId === 'results') {
        if (state.layer === 'variants') {
          return { ...state, layer: 'category', sceneId: null, variantIndex: 0 }
        }
        if (state.layer === 'category') {
          return { ...state, ...resetLayer() }
        }
      }
      if (isLogicChapter(state.chapterId) && state.layer === 'detail') {
        return { ...state, ...resetLayer() }
      }
      return state
    }
    case 'CLOSE_TO_OVERVIEW':
      if (!isDrilled(state)) return state
      return { ...state, ...resetLayer() }
    case 'SIBLING_PREV':
      return shiftSibling(state, catalog, -1)
    case 'SIBLING_NEXT':
      return shiftSibling(state, catalog, 1)
    case 'VARIANT_PREV':
      return shiftVariant(state, catalog, -1)
    case 'VARIANT_NEXT':
      return shiftVariant(state, catalog, 1)
    case 'SET_VARIANT':
      return { ...state, variantIndex: clampVariant(state, catalog, action.index) }
    case 'TOGGLE_AUTOPLAY': {
      if (!state.autoplay) {
        // Starting on the last overview step should not wrap; stay stopped if we
        // are already at the end and would have nowhere to go.
        const atEnd =
          !isDrilled(state) &&
          state.chapterId === VISIBLE_CHAPTER_IDS[VISIBLE_CHAPTER_IDS.length - 1]
        if (atEnd) return { ...state, autoplay: false }
        return { ...state, autoplay: true }
      }
      return { ...state, autoplay: false }
    }
    case 'AUTOPLAY_FROM_START':
      return { ...goChapter(state, START_CHAPTER_ID, { fromStart: true }), autoplay: true }
    case 'AUTOPLAY_TICK': {
      if (!state.autoplay) return state
      if (isDrilled(state)) return state
      const i = chapterIndex(state.chapterId)
      if (i >= VISIBLE_CHAPTER_IDS.length - 1) {
        return { ...state, autoplay: false }
      }
      return goChapter({ ...state, autoplay: true }, VISIBLE_CHAPTER_IDS[i + 1])
    }
    case 'AUTOPLAY_STOP':
      return { ...state, autoplay: false }
    default:
      return state
  }
}

function currentVariantCount(state, catalog) {
  if (state.layer !== 'variants' || state.chapterId !== 'results') return 0
  const scenes = scenesOf(state, catalog)
  const scene = scenes.find((s) => s.id === state.sceneId)
  if (!scene) return 0
  if (state.categoryId === 'benchmarks') return scene.cases?.length ?? 0
  return scene.items?.length ?? 0
}

function clampVariant(state, catalog, index) {
  const n = currentVariantCount(state, catalog)
  if (n <= 0) return 0
  return Math.max(0, Math.min(n - 1, index))
}

function shiftVariant(state, catalog, dir) {
  if (state.layer !== 'variants') return state
  const n = currentVariantCount(state, catalog)
  if (n <= 0) return state
  const next = state.variantIndex + dir
  if (next < 0 || next >= n) return state
  return { ...state, variantIndex: next }
}

function shiftSibling(state, catalog, dir) {
  if (!isDrilled(state)) return state
  if (isLogicChapter(state.chapterId) && state.layer === 'detail') {
    const ids = drillIds(state.chapterId, catalog)
    if (atSiblingEnd(ids, state.capabilityId, dir)) return state
    return { ...state, capabilityId: siblingShift(ids, state.capabilityId, dir) }
  }
  if (state.chapterId === 'results' && state.layer === 'category') {
    const ids = categoryIds(catalog)
    if (atSiblingEnd(ids, state.categoryId, dir)) return state
    const categoryId = siblingShift(ids, state.categoryId, dir)
    return { ...state, categoryId, sceneId: null, variantIndex: 0 }
  }
  if (state.chapterId === 'results' && state.layer === 'variants') {
    const ids = scenesOf(state, catalog).map((s) => s.id)
    if (atSiblingEnd(ids, state.sceneId, dir)) return state
    return { ...state, sceneId: siblingShift(ids, state.sceneId, dir), variantIndex: 0 }
  }
  return state
}

/**
 * Map a keyboard event to an action. Returns { action, consume } or null.
 * `consume` means the event must not reach main-nav chapter changes.
 */
export function interpretKey(key, state, { alt = false, ctrl = false, meta = false } = {}) {
  if (alt || ctrl || meta) return null
  const drilled = isDrilled(state)

  if (key === 'p' || key === 'P') {
    return { action: { type: 'TOGGLE_AUTOPLAY' }, consume: false }
  }
  if (key === 'r' || key === 'R') {
    return { action: { type: 'AUTOPLAY_FROM_START' }, consume: false }
  }

  if (drilled) {
    if (key === 'Escape') return { action: { type: 'CLOSE_TO_OVERVIEW' }, consume: true }
    if (key === 'ArrowUp' || key === 'b' || key === 'B') {
      return { action: { type: 'GO_UP' }, consume: true }
    }
    if (key === 'ArrowDown') return { action: { type: 'DRILL_DOWN' }, consume: true }
    if (key === 'ArrowLeft' || key === 'PageUp') {
      return { action: { type: 'SIBLING_PREV' }, consume: true }
    }
    if (key === 'ArrowRight' || key === 'PageDown') {
      return { action: { type: 'SIBLING_NEXT' }, consume: true }
    }
    if (key === ' ' || key === 'Spacebar' || key === 'Home' || key === '.' || key === '0') {
      return { action: null, consume: true }
    }
    if (/^[1-9]$/.test(key)) {
      return { action: null, consume: true }
    }
    return null
  }

  if (key === 'ArrowRight' || key === 'PageDown' || key === ' ' || key === 'Spacebar') {
    return { action: { type: 'NEXT_CHAPTER' }, consume: true }
  }
  if (key === 'ArrowLeft' || key === 'PageUp') {
    return { action: { type: 'PREV_CHAPTER' }, consume: true }
  }
  if (key === 'ArrowDown') {
    if (LOGIC_DRILLS_HIDDEN && isLogicChapter(state.chapterId)) {
      return { action: null, consume: true }
    }
    return { action: { type: 'DRILL_DOWN' }, consume: true }
  }
  if (key === 'b' || key === 'B' || key === '0' || key === 'Home' || key === '.') {
    return { action: { type: 'GO_START' }, consume: true }
  }
  if (key === 'Escape') return { action: { type: 'GO_START' }, consume: true }
  if (/^[1-9]$/.test(key)) {
    const id = VISIBLE_CHAPTER_IDS[Number(key) - 1]
    if (!id) return { action: null, consume: true }
    return { action: { type: 'GO_CHAPTER', id }, consume: true }
  }
  return null
}

/**
 * Wheel mapping. deltaY > 0 is down. Caller should threshold/accumulate.
 */
export function interpretWheel(deltaY, state) {
  if (!isDrilled(state)) {
    return deltaY > 0 ? { type: 'NEXT_CHAPTER' } : { type: 'PREV_CHAPTER' }
  }
  if (deltaY < 0 && state.chapterId === 'results') {
    return { type: 'GO_UP' }
  }
  if (deltaY > 0 && state.layer === 'variants') {
    return { type: 'VARIANT_NEXT' }
  }
  return null
}

export function atDeckStart(state) {
  return state.chapterId === START_CHAPTER_ID && state.layer === 'overview'
}

export function atDeckEnd(state) {
  return (
    state.chapterId === VISIBLE_CHAPTER_IDS[VISIBLE_CHAPTER_IDS.length - 1] &&
    state.layer === 'overview'
  )
}
