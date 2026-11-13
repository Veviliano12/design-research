import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { test } from 'node:test'
import {
  createInitialState,
  reduce,
  interpretKey,
  interpretWheel,
  parseHash,
  isDrilled,
  atDeckEnd,
  atDeckStart,
  VISIBLE_CHAPTER_IDS,
  START_CHAPTER_ID,
} from './deckState.js'

const catalog = JSON.parse(
  readFileSync(join(dirname(fileURLToPath(import.meta.url)), '../data/catalog.json'), 'utf8'),
)

function apply(state, type, extra) {
  return reduce(state, { type, ...extra }, catalog)
}

function key(state, k, mods) {
  const read = interpretKey(k, state, mods)
  if (!read?.action) return { state, consumed: Boolean(read?.consume), read }
  return { state: reduce(state, read.action, catalog), consumed: read.consume, read }
}

function resultsOverview() {
  return {
    ...createInitialState(),
    chapterId: 'results',
    layer: 'overview',
  }
}

test('opens on 方法管线 overview, not a table of contents or the results wall', () => {
  const s = createInitialState()
  assert.equal(s.chapterId, 'method')
  assert.equal(START_CHAPTER_ID, 'method')
  assert.equal(s.layer, 'overview')
  assert.equal(isDrilled(s), false)
  assert.equal(atDeckStart(s), true)
  // 研究逻辑现在只有一个可见内段，打开即是起点也是末步。
  assert.equal(atDeckEnd(s), true)
})

test('hash accepts only visible chapters; folded and hidden ids fall back to method', () => {
  assert.equal(parseHash('#method'), 'method')
  assert.equal(parseHash('#coverage'), 'method')
  assert.equal(parseHash('#define'), 'method')
  assert.equal(parseHash('#priority'), 'method')
  assert.equal(parseHash('#results'), 'method')
  assert.equal(parseHash('#compare'), 'method')
  assert.equal(parseHash('#foo'), 'method')
  assert.equal(parseHash(''), 'method')
  assert.ok(!VISIBLE_CHAPTER_IDS.includes('compare'))
  assert.ok(!VISIBLE_CHAPTER_IDS.includes('results'))
  assert.ok(!VISIBLE_CHAPTER_IDS.includes('priority'))
  assert.ok(!VISIBLE_CHAPTER_IDS.includes('coverage'))
  assert.ok(!VISIBLE_CHAPTER_IDS.includes('define'))
  assert.deepEqual(VISIBLE_CHAPTER_IDS, ['method'])
})

test('chapter arrows stay on the single visible chapter, no loop', () => {
  let s = createInitialState()
  assert.equal(s.chapterId, 'method')
  s = key(s, 'ArrowLeft').state
  assert.equal(s.chapterId, 'method')
  s = key(s, 'ArrowRight').state
  assert.equal(s.chapterId, 'method')
  assert.equal(atDeckEnd(s), true)
  s = key(s, 'ArrowRight').state
  assert.equal(s.chapterId, 'method')
  s = key(s, 'ArrowLeft').state
  assert.equal(s.chapterId, 'method')
  s = key(s, 'ArrowLeft').state
  assert.equal(s.chapterId, 'method')
})

test('number keys: 1 stays on the only visible chapter; 2–9 do not invent folded tabs', () => {
  let s = createInitialState()
  s = key(s, '1').state
  assert.equal(s.chapterId, 'method')
  assert.equal(s.layer, 'overview')
  s = key(s, '2').state
  assert.equal(s.chapterId, 'method')
  s = key(s, '3').state
  assert.equal(s.chapterId, 'method')
  s = key(s, '4').state
  assert.equal(s.chapterId, 'method')
})

test('B / 0 / Home / . / Esc at overview return to start', () => {
  for (const k of ['b', '0', 'Home', '.', 'Escape']) {
    let s = createInitialState()
    s = apply(s, 'OPEN_CAPABILITY', { id: 'intake' })
    s = key(s, 'Escape').state
    s = key(s, k).state
    assert.equal(s.chapterId, 'method', k)
    assert.equal(s.layer, 'overview', k)
  }
})

test('Down on the logic figure opens the first station as a drill (modal state, chapter unchanged)', () => {
  const s = key(createInitialState(), 'ArrowDown').state
  assert.equal(s.chapterId, 'method')
  assert.equal(s.layer, 'detail')
  assert.equal(s.capabilityId, 'intake')
})

test('OPEN_CAPABILITY still reaches a kept drill route', () => {
  const s = apply(createInitialState(), 'OPEN_CAPABILITY', { id: 'intake' })
  assert.equal(s.chapterId, 'method')
  assert.equal(s.layer, 'detail')
  assert.equal(s.capabilityId, 'intake')
})

test('Down drills results overview → first category', () => {
  let s = resultsOverview()
  s = key(s, 'ArrowDown').state
  assert.equal(s.layer, 'category')
  assert.equal(s.categoryId, 'benchmarks')
})

test('results drill: category → first scene; at deepest Down stays', () => {
  let s = resultsOverview()
  s = key(s, 'ArrowDown').state
  s = key(s, 'ArrowDown').state
  assert.equal(s.layer, 'variants')
  assert.equal(s.sceneId, catalog.languages[0].id)
  const again = key(s, 'ArrowDown').state
  assert.deepEqual(again, s)
})

test('once drilled, Left/Right/Page/Space/numbers/wheel cannot change chapter', () => {
  let s = apply(createInitialState(), 'OPEN_CAPABILITY', { id: 'intake' })
  for (const k of ['ArrowRight', 'ArrowLeft', 'PageDown', 'PageUp', ' ', '2', '1']) {
    const r = key(s, k)
    assert.equal(r.consumed, true, k)
    assert.equal(r.state.chapterId, 'method', k)
  }
  const wheelDown = interpretWheel(80, s)
  assert.notEqual(wheelDown?.type, 'NEXT_CHAPTER')
  const wheelUp = interpretWheel(-80, s)
  assert.equal(wheelUp, null)
})

test('modifier combos are ignored', () => {
  const s = createInitialState()
  assert.equal(interpretKey('ArrowRight', s, { meta: true }), null)
  assert.equal(interpretKey('ArrowRight', s, { ctrl: true }), null)
  assert.equal(interpretKey('ArrowRight', s, { alt: true }), null)
})

test('sibling switch on category layer stops at the ends and does not jump chapter', () => {
  let s = resultsOverview()
  s = key(s, 'ArrowDown').state
  s = key(s, 'ArrowRight').state
  assert.equal(s.categoryId, 'self')
  assert.equal(s.chapterId, 'results')
  const end = key(s, 'ArrowRight').state
  assert.equal(end.categoryId, 'self')
  assert.equal(end.chapterId, 'results')
  s = key(s, 'ArrowLeft').state
  assert.equal(s.categoryId, 'benchmarks')
  const start = key(s, 'ArrowLeft').state
  assert.equal(start.categoryId, 'benchmarks')
})

test('sibling switch on variant layer walks scenes and stops at last language', () => {
  let s = resultsOverview()
  s = key(s, 'ArrowDown').state
  s = key(s, 'ArrowDown').state
  const last = catalog.languages[catalog.languages.length - 1].id
  for (let i = 0; i < 20; i += 1) s = key(s, 'ArrowRight').state
  assert.equal(s.sceneId, last)
  assert.equal(s.chapterId, 'results')
  assert.equal(s.layer, 'variants')
})

test('capability siblings walk intake → lightup, stop at the last drill, and never leave the chapter', () => {
  let s = apply(createInitialState(), 'GO_CHAPTER', { id: 'method' })
  s = apply(s, 'OPEN_CAPABILITY', { id: 'intake' })
  assert.equal(s.capabilityId, 'intake')
  const order = []
  for (let i = 0; i < 8; i += 1) {
    s = key(s, 'ArrowRight').state
    order.push(s.capabilityId)
  }
  assert.deepEqual(
    [...new Set(order)],
    ['screen', 'classify', 'review', 'lightup'],
  )
  assert.equal(s.capabilityId, 'lightup')
  assert.equal(s.chapterId, 'method')
  assert.equal(s.layer, 'detail')
  const end = key(s, 'ArrowRight').state
  assert.equal(end.capabilityId, 'lightup')
})

test('Up / B go up one layer; Esc and close jump to chapter overview', () => {
  let s = resultsOverview()
  s = key(s, 'ArrowDown').state
  s = key(s, 'ArrowDown').state
  s = key(s, 'ArrowUp').state
  assert.equal(s.layer, 'category')
  assert.equal(s.categoryId, 'benchmarks')
  s = key(s, 'ArrowDown').state
  s = key(s, 'Escape').state
  assert.equal(s.layer, 'overview')
  assert.equal(s.chapterId, 'results')
  s = key(s, 'ArrowDown').state
  s = key(s, 'ArrowDown').state
  s = apply(s, 'CLOSE_TO_OVERVIEW')
  assert.equal(s.layer, 'overview')
  s = createInitialState()
  s = apply(s, 'OPEN_CAPABILITY', { id: 'intake' })
  s = key(s, 'b').state
  assert.equal(s.layer, 'overview')
  assert.equal(s.chapterId, 'method')
  s = createInitialState()
  s = apply(s, 'OPEN_CAPABILITY', { id: 'intake' })
  s = key(s, 'Escape').state
  assert.equal(s.layer, 'overview')
  assert.equal(s.chapterId, 'method')
})

test('成果展 wheel up goes up one layer; wheel down on variants stays and advances item', () => {
  let s = resultsOverview()
  s = key(s, 'ArrowDown').state
  s = key(s, 'ArrowDown').state
  s = reduce(s, interpretWheel(-40, s), catalog)
  assert.equal(s.layer, 'category')
  s = key(s, 'ArrowDown').state
  s = reduce(s, interpretWheel(40, s), catalog)
  assert.equal(s.layer, 'variants')
  assert.equal(s.variantIndex, 1)
  assert.equal(s.chapterId, 'results')
})

test('logic chapter wheel does not change chapter or drill while in detail', () => {
  let s = apply(createInitialState(), 'GO_CHAPTER', { id: 'method' })
  s = apply(s, 'OPEN_CAPABILITY', { id: 'intake' })
  assert.equal(interpretWheel(80, s), null)
  assert.equal(interpretWheel(-80, s), null)
  s = apply(createInitialState(), 'OPEN_CAPABILITY', { id: 'screen' })
  assert.equal(interpretWheel(80, s), null)
  assert.equal(interpretWheel(-80, s), null)
})

test('autoplay does not start on the only overview, and does not flip chapter while drilled', () => {
  let s = createInitialState()
  s = apply(s, 'TOGGLE_AUTOPLAY')
  assert.equal(s.chapterId, 'method')
  assert.equal(s.autoplay, false)

  s = apply(createInitialState(), 'OPEN_CAPABILITY', { id: 'intake' })
  s = apply(s, 'TOGGLE_AUTOPLAY')
  assert.equal(s.autoplay, true)
  const held = apply(s, 'AUTOPLAY_TICK')
  assert.equal(held.chapterId, 'method')
  assert.equal(held.layer, 'detail')
  assert.equal(held.autoplay, true)
})

test('R can arm autoplay from the overview; the next tick stops at the only step; P does not loop', () => {
  let s = apply(createInitialState(), 'OPEN_CAPABILITY', { id: 'intake' })
  s = apply(s, 'AUTOPLAY_FROM_START')
  assert.equal(s.chapterId, 'method')
  assert.equal(s.layer, 'overview')
  assert.equal(s.autoplay, true)
  s = apply(s, 'AUTOPLAY_TICK')
  assert.equal(s.chapterId, 'method')
  assert.equal(s.autoplay, false)
  const toggled = apply(s, 'TOGGLE_AUTOPLAY')
  assert.equal(toggled.autoplay, false)
})

test('catalog title numbers match shipped counts; 成果展 is hidden', () => {
  const c = catalog.counts
  assert.equal(c.onWall, 124)
  assert.equal(c.withCapture, 123)
  assert.equal(c.missingCapture, 1)
  assert.equal(c.languages, 9)
  assert.equal(c.reviewed, 94)
  assert.equal(c.present, 0)
  assert.equal(c.nearBenchmark, 0)
  assert.equal(c.attempted, 36)
  assert.equal(c.attemptedPages, 27)
  assert.equal(c.landingPages, 105)
  assert.equal(catalog.languages.length, 9)
  assert.equal(catalog.languages.reduce((n, l) => n + l.count, 0), 124)
  assert.equal(catalog.categories.length, 2)
  assert.equal(catalog.categories[0].sceneCount, 9)
  assert.equal(catalog.categories[1].sceneCount, 3)
  assert.equal(catalog.selfScenes.length, 3)
  assert.equal(catalog.selfScenes[0].itemCount, 36)
  assert.equal(catalog.selfScenes[0].pageCount, 27)
  assert.equal(catalog.selfScenes[0].languageCount, 6)
  assert.equal(catalog.selfScenes[1].languageCount, 3)
  assert.equal(catalog.selfScenes[2].present, 0)
  assert.equal(catalog.missing.id, 'threeui-dark-souls-holo')
  const missingCase = catalog.languages
    .flatMap((l) => l.cases)
    .filter((x) => x.missingCapture)
  assert.equal(missingCase.length, 1)
  assert.equal(missingCase[0].id, 'threeui-dark-souls-holo')
  assert.equal(missingCase[0].image, null)
  assert.equal(catalog.chapters.map((ch) => ch.id).join(','), 'method')
  assert.equal(catalog.hiddenChapters[0].id, 'results')
  assert.equal(catalog.hiddenChapters[0].hidden, true)
  assert.match(catalog.hiddenChapters[0].title, /124/)
  assert.equal(catalog.hiddenChapters[1].id, 'compare')
  assert.equal(catalog.hiddenChapters[1].hidden, true)
  assert.match(catalog.chapters.find((ch) => ch.id === 'method').title, /进入视效库/)
  assert.ok(!/关口|上墙/.test(catalog.chapters[0].title))
  assert.deepEqual(
    catalog.capabilities.map((c) => c.id),
    ['intake', 'screen', 'classify', 'review', 'lightup'],
  )
  assert.equal(catalog.counts.pendingReview, 30)
  assert.equal(catalog.defineDrills.length, 2)
  assert.equal(catalog.priorityDrills.length, 2)
  assert.ok(catalog.foldedChapters)
  assert.deepEqual(
    catalog.foldedChapters.map((ch) => ch.id),
    ['coverage', 'define'],
  )
})
