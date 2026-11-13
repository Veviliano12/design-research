import { useEffect, useRef } from 'react'
import { categoryStagger, sceneStagger, variantStagger, tokens } from '../tokens.js'
import { assetSrc, caseUrls, languageHeroUrls, preload } from '../lib/media.js'
import { findChapter } from '../nav/deckState.js'
import {
  BackButton,
  DeviceFrame,
  FanStack,
  NeutralPlate,
  TopBar,
} from './ui.jsx'

export function ResultsOverview({ catalog, onOpen }) {
  return (
    <section className="overview" aria-label="成果展总览">
      <header className="overview-head">
        <p className="kicker">{findChapter(catalog, 'results').subtitle}</p>
        <h1 className="display-title">{findChapter(catalog, 'results').title}</h1>
      </header>
      <div className="overview-row">
        {catalog.categories.map((cat, i) => (
          <button
            key={cat.id}
            type="button"
            className="overview-card enter-item"
            style={{ '--enter-delay': `${categoryStagger(i)}ms` }}
            onClick={() => onOpen(cat.id)}
          >
            <span className="card-no">{cat.no}</span>
            <div className="card-media">
              <FanStack frames={cat.fan} altPrefix={`${cat.name}：`} />
            </div>
            <h2 className="card-title">
              {cat.no} {cat.name}
            </h2>
            <p className="card-meta">
              {cat.sceneCount} 个场景 · {cat.sceneLabel}
            </p>
            {cat.tease ? <p className="card-caption">{cat.tease}</p> : null}
          </button>
        ))}
      </div>
    </section>
  )
}

export function ResultsScenes({ catalog, categoryId, onOpenScene, onBack, onClose }) {
  const category = catalog.categories.find((c) => c.id === categoryId) || catalog.categories[0]
  const scenes =
    category.id === 'benchmarks' ? catalog.languages : catalog.selfScenes

  return (
    <div className="drill-shell">
      <TopBar
        left={<BackButton onClick={onBack} />}
        center={<p className="top-bar-current">{category.no} {category.name}</p>}
        onClose={onClose}
      />
      <div className="drill-body">
        <div className={`scene-grid${scenes.length <= 3 ? ' is-three' : ''}`}>
          {scenes.map((scene, i) => (
            <button
              key={scene.id}
              type="button"
              className="scene-card enter-item"
              style={{ '--enter-delay': `${sceneStagger(i)}ms` }}
              onClick={() => onOpenScene(category.id, scene.id)}
            >
              <div className="scene-card-media">
                {scene.hero ? (
                  <DeviceFrame image={scene.hero} alt={scene.name} />
                ) : (
                  <NeutralPlate
                    label={scene.emptyLabel || '待补充'}
                    aspect={1.6}
                  />
                )}
              </div>
              <div className="scene-card-head">
                <h2 className="scene-card-title">
                  {scene.no} {scene.name}
                </h2>
                {category.id === 'benchmarks' ? (
                  <span className="badge">视效语言</span>
                ) : null}
              </div>
              {category.id === 'benchmarks' ? (
                <>
                  <p className="scene-card-desc">{scene.desc}</p>
                  <p className="scene-card-count">{scene.count} 条已上墙</p>
                </>
              ) : (
                <>
                  <p className="scene-card-desc">{scene.caption}</p>
                  <p className="scene-card-count">{selfSceneMeta(scene)}</p>
                </>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

function selfSceneMeta(scene) {
  if (scene.id === 'attempted') {
    return `${scene.languageCount} 种语言 · ${scene.itemCount} 条 · ${scene.pageCount} 页`
  }
  if (scene.id === 'unseen') return `${scene.languageCount} 种语言`
  return `点亮 ${scene.present} · 接近标杆 ${scene.nearBenchmark}`
}

export function ResultsVariants({
  catalog,
  categoryId,
  sceneId,
  variantIndex,
  onBack,
  onClose,
  onSelectVariant,
}) {
  const category = catalog.categories.find((c) => c.id === categoryId)
  const isBench = categoryId === 'benchmarks'
  const scenes = isBench ? catalog.languages : catalog.selfScenes
  const scene = scenes.find((s) => s.id === sceneId) || scenes[0]

  useEffect(() => {
    if (isBench) preload(caseUrls(scene.cases))
    else preload((scene.items || []).map((it) => assetSrc(it.image)))
  }, [isBench, scene])

  if (!isBench && scene.id !== 'attempted') {
    return (
      <div className="drill-shell">
        <TopBar
          left={<BackButton onClick={onBack} />}
          center={<p className="top-bar-current">{category?.name}</p>}
          onClose={onClose}
        />
        <div className="drill-body">
          <EmptySelfScene scene={scene} />
        </div>
      </div>
    )
  }

  const items = isBench ? scene.cases : scene.items
  const current = items[Math.min(variantIndex, Math.max(items.length - 1, 0))] || null

  return (
    <div className="drill-shell">
      <TopBar
        left={<BackButton onClick={onBack} />}
        center={<p className="top-bar-current">{category?.name}</p>}
        onClose={onClose}
      />
      <div className="drill-body">
        <div className="variant-view">
          <div className="variant-copy">
            <h2 className="variant-title enter-item" style={{ '--enter-delay': `${tokens.motion.variantHeroDelayMs}ms` }}>
              {isBench ? scene.name : current?.title || scene.name}
            </h2>
            <p className="variant-caption">
              {isBench ? scene.caption : scene.caption}
            </p>
            {!isBench && current?.language ? (
              <p className="variant-note">{current.language}</p>
            ) : null}
            {!isBench && current?.note ? (
              <p className="variant-note">{current.note}</p>
            ) : null}
            {isBench && current?.imageNote ? (
              <p className="variant-note">{current.imageNote}</p>
            ) : null}
          </div>
          <div
            className="variant-hero enter-item"
            style={{
              '--enter-delay': `${tokens.motion.variantHeroDelayMs}ms`,
              '--hero-aspect': current?.image?.aspect || 1.6,
            }}
          >
            {current && !current.missingCapture && current.image ? (
              <DeviceFrame
                image={current.image}
                alt={isBench ? current.name : current.title}
                aspect={current.image.aspect}
              />
            ) : (
              <NeutralPlate
                label={current?.missingLabel || '暂无现场截图'}
                aspect={1.6}
              />
            )}
          </div>
          <VariantStrip
            items={items}
            isBench={isBench}
            currentId={current?.id}
            onSelect={onSelectVariant}
          />
        </div>
      </div>
    </div>
  )
}

function VariantStrip({ items, isBench, currentId, onSelect }) {
  const scrollerRef = useRef(null)
  useEffect(() => {
    const root = scrollerRef.current
    if (!root) return
    const active = root.querySelector('.is-current')
    if (active?.scrollIntoView) {
      active.scrollIntoView({ inline: 'nearest', block: 'nearest', behavior: 'smooth' })
    }
  }, [currentId])

  return (
    <div className="variant-strip" ref={scrollerRef} role="list">
      {items.map((item, i) => {
        const name = isBench ? item.name : item.title
        const source = isBench ? item.studio || '' : item.language
        const missing = Boolean(item.missingCapture) || !item.image
        return (
          <button
            key={item.id}
            type="button"
            role="listitem"
            className={`variant-thumb enter-item${item.id === currentId ? ' is-current' : ''}`}
            style={{ '--enter-delay': `${variantStagger(i)}ms` }}
            onClick={() => onSelect(i)}
          >
            <div className="variant-thumb-frame">
              {missing ? (
                <NeutralPlate label={item.missingLabel || '暂无现场截图'} />
              ) : (
                <img src={assetSrc(item.image)} alt="" />
              )}
            </div>
            <p className="variant-thumb-name">{name}</p>
            {source ? <p className="variant-thumb-source">{source}</p> : null}
          </button>
        )
      })}
    </div>
  )
}

function EmptySelfScene({ scene }) {
  if (scene.id === 'unseen') {
    return (
      <div className="variant-empty">
        <div>
          <h2 className="variant-title">{scene.name}</h2>
          <p className="variant-caption">{scene.caption}</p>
        </div>
        <div className="variant-empty-list">
          {scene.languages.map((lang) => (
            <div key={lang.id} className="variant-empty-item">
              <NeutralPlate label="待补充" note={lang.name} aspect={1.6} />
            </div>
          ))}
        </div>
      </div>
    )
  }
  return (
    <div className="variant-empty">
      <div>
        <h2 className="variant-title">{scene.name}</h2>
        <p className="variant-caption">
          94 页里，点亮和接近标杆都是 0。还没有。
        </p>
      </div>
      <NeutralPlate label="还没有" note="待补充" aspect={1.6} />
    </div>
  )
}

export function preloadResultsLayer(catalog, state) {
  if (state.layer === 'overview') {
    preload([
      ...catalog.categories.flatMap((c) => c.fan.map((f) => assetSrc(f.image))),
      ...languageHeroUrls(catalog.languages),
      ...catalog.selfScenes.map((s) => assetSrc(s.hero)),
    ])
  }
  if (state.layer === 'category' && state.categoryId === 'benchmarks') {
    preload(languageHeroUrls(catalog.languages))
  }
  if (state.layer === 'category' && state.categoryId === 'self') {
    preload(catalog.selfScenes.map((s) => assetSrc(s.hero)))
  }
}
