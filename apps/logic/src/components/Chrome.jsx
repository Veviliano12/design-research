import { isDrilled } from '../nav/deckState.js'

function platformHref(route) {
  return `../#/${route}`
}

export function BookChrome({
  chapters,
  chapterId,
  autoplay,
  onChapter,
  onToggleAutoplay,
  drilled,
  status,
}) {
  const parent = '_parent'
  return (
    <>
      <header className="book-topbar">
        <nav className="book-tabs" aria-label="平台章节">
          <a className="book-tab" href={platformHref('vfx/overview')} target={parent} rel="noopener">
            视效库
          </a>
          <span className="book-tab is-current">研究逻辑</span>
          <a className="book-tab" href={platformHref('sources/review')} target={parent} rel="noopener">
            来源
          </a>
        </nav>
      </header>
      {!drilled && chapters.length > 1 ? (
        <nav className="book-segments" aria-label="研究逻辑内段">
          {chapters.map((ch) => (
            <button
              key={ch.id}
              type="button"
              className={`book-segment${ch.id === chapterId ? ' is-current' : ''}`}
              onClick={() => onChapter(ch.id)}
            >
              {ch.nav}
            </button>
          ))}
        </nav>
      ) : null}
      <footer className="book-deckbar">
        <div className="book-deck-left">
          <button
            type="button"
            className={`book-deck-btn${autoplay ? ' is-on' : ''}`}
            aria-label={autoplay ? '暂停' : '播放'}
            onClick={onToggleAutoplay}
          >
            {autoplay ? <PauseIcon /> : <PlayIcon />}
          </button>
          <span className="book-deck-status">{status}</span>
        </div>
        <nav className="book-chapters" aria-label="章节进度">
          <a className="book-chapter" href={platformHref('vfx/overview')} target={parent} rel="noopener">
            01 视效库
          </a>
          <span className="book-chapter is-current">02 研究逻辑</span>
          <a className="book-chapter" href={platformHref('sources/review')} target={parent} rel="noopener">
            03 来源
          </a>
        </nav>
        <div className="book-wordmark">设计研究</div>
      </footer>
    </>
  )
}

export function bookStatus(chapter) {
  if (!chapter || chapter.id === 'method') return '02 研究逻辑'
  return `02 研究逻辑 · ${chapter.nav}`
}

export function AccentTitle({ text, accent }) {
  if (!accent || !text.includes(accent)) {
    return <h1 className="display-title">{text}</h1>
  }
  const i = text.indexOf(accent)
  return (
    <h1 className="display-title">
      {text.slice(0, i)}
      <em className="title-accent">{accent}</em>
      {text.slice(i + accent.length)}
    </h1>
  )
}

export function ProcessCard({ no, title, role, badge, foot, children, onClick, delay, as = 'button' }) {
  const Tag = as
  const clickable = Tag === 'button'
  return (
    <Tag
      type={clickable ? 'button' : undefined}
      className={`overview-card process-card enter-item${clickable ? '' : ' is-static'}`}
      style={{ '--enter-delay': delay }}
      onClick={clickable ? onClick : undefined}
    >
      <header className="card-head">
        <span className="card-no">{no}</span>
        {badge ? <span className="card-badge">{badge}</span> : null}
      </header>
      <h2 className="card-title">{title}</h2>
      {role ? <p className="card-role">{role}</p> : null}
      <div className="card-media">{children}</div>
      {foot}
    </Tag>
  )
}

export function KpiFoot({ items }) {
  return (
    <div className="card-foot">
      {items.map((it) => (
        <div className="kpi" key={it.label}>
          <b>{it.value}</b>
          <span>{it.label}</span>
        </div>
      ))}
    </div>
  )
}

export function Chain({ children }) {
  const nodes = []
  const items = Array.isArray(children) ? children : [children]
  items.filter(Boolean).forEach((child, i) => {
    if (i > 0) {
      nodes.push(
        <span className="chain-arrow" aria-hidden="true" key={`arrow-${i}`}>
          <svg viewBox="0 0 24 24">
            <path
              d="M4 12h14M14 6l6 6-6 6"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.35"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>,
      )
    }
    nodes.push(child)
  })
  return <div className="overview-row">{nodes}</div>
}

function PlayIcon() {
  return (
    <svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true" fill="currentColor">
      <path d="M9 7.2v9.6l8-4.8z" />
    </svg>
  )
}

function PauseIcon() {
  return (
    <svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true" fill="currentColor">
      <path d="M8 7h3v10H8zM13 7h3v10h-3z" />
    </svg>
  )
}

export { isDrilled, platformHref }
