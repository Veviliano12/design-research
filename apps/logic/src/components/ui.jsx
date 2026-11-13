import { useState } from 'react'
import { assetSrc } from '../lib/media.js'

export function DeviceFrame({ image, alt, aspect }) {
  const [failed, setFailed] = useState(false)
  const src = assetSrc(image)
  const ratio = aspect || image?.aspect || 1.6
  if (!src || failed) {
    return <NeutralPlate label="暂无现场截图" aspect={ratio} />
  }
  return (
    <div className="device" style={{ aspectRatio: ratio }}>
      <div className="device-chrome" aria-hidden="true">
        <span className="device-dot" />
        <span className="device-dot" />
        <span className="device-dot" />
      </div>
      <div className="device-screen">
        <img src={src} alt={alt || ''} onError={() => setFailed(true)} />
      </div>
    </div>
  )
}

export function NeutralPlate({ label = '待补充', note, aspect }) {
  return (
    <div className="plate" style={aspect ? { aspectRatio: aspect } : undefined}>
      <p className="plate-label">{label}</p>
      {note ? <p className="plate-note">{note}</p> : null}
    </div>
  )
}

export function FanStack({ frames, altPrefix = '' }) {
  const n = frames?.length || 0
  if (n === 0) return <NeutralPlate label="待补充" />
  const aspect = frames[0].image?.aspect || 1.6
  const classFor = (i) => {
    if (n === 1) return 'is-mid'
    if (n === 2) return i === 0 ? 'is-left-2' : 'is-right-2'
    if (i === 0) return 'is-left-3'
    if (i === n - 1) return 'is-right-3'
    return 'is-mid'
  }
  return (
    <div className="fan">
      <div className="fan-stack" style={{ '--fan-aspect': aspect }}>
        {frames.map((frame, i) => (
          <div key={frame.id} className={`fan-item ${classFor(i)}`}>
            <DeviceFrame image={frame.image} alt={`${altPrefix}${frame.name}`} aspect={aspect} />
          </div>
        ))}
      </div>
    </div>
  )
}

export function CloseButton({ onClick, label = '关闭' }) {
  return (
    <button type="button" className="close-btn" onClick={onClick} aria-label={label} title={label}>
      <svg viewBox="0 0 16 16" aria-hidden="true">
        <path
          d="M3.2 3.2l9.6 9.6M12.8 3.2l-9.6 9.6"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
        />
      </svg>
    </button>
  )
}

export function BackButton({ onClick, label = '返回' }) {
  return (
    <button type="button" className="text-btn" onClick={onClick}>
      <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true">
        <path
          d="M7.5 2.25 3.75 6 7.5 9.75"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      {label}
    </button>
  )
}

export function TopBar({ left, center, onClose }) {
  return (
    <header className="top-bar">
      <div className="top-bar-left">{left}</div>
      <div className="top-bar-center">{center}</div>
      <div className="top-bar-right">
        <CloseButton onClick={onClose} />
      </div>
    </header>
  )
}

export function ShortNav({ items, currentId, onSelect }) {
  return (
    <nav className="short-nav" aria-label="能力">
      {items.map((item) => (
        <button
          key={item.id}
          type="button"
          className={`short-nav-item${item.id === currentId ? ' is-current' : ''}`}
          onClick={() => onSelect(item.id)}
        >
          {item.short}
        </button>
      ))}
    </nav>
  )
}

export function BottomNav({ chapters, currentId, autoplay, onChapter, onToggleAutoplay, backLink }) {
  return (
    <nav className="bottom-nav" aria-label="章节">
      <div className="bottom-nav-inner">
        {backLink ? (
          <a className="nav-back" href={backLink.href} target={backLink.target || '_parent'} rel="noreferrer">
            {backLink.label}
          </a>
        ) : null}
        <div className="bottom-nav-chapters">
          {chapters.map((ch) => (
            <button
              key={ch.id}
              type="button"
              className={`nav-chapter${ch.id === currentId ? ' is-current' : ''}`}
              onClick={() => onChapter(ch.id)}
            >
              {ch.nav}
            </button>
          ))}
        </div>
        <button
          type="button"
          className={`nav-autoplay${autoplay ? ' is-on' : ''}`}
          onClick={onToggleAutoplay}
        >
          {autoplay ? '停止播放' : '自动播放'}
        </button>
      </div>
    </nav>
  )
}

export function ChainArrow() {
  return (
    <span className="chain-arrow" aria-hidden="true">
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
    </span>
  )
}

export function LogicSegments({ chapters, currentId, onChapter }) {
  return (
    <nav className="logic-segments" aria-label="研究逻辑章节">
      {chapters.map((ch) => (
        <button
          key={ch.id}
          type="button"
          className={`logic-segment${ch.id === currentId ? ' is-current' : ''}`}
          onClick={() => onChapter(ch.id)}
        >
          {ch.nav}
        </button>
      ))}
    </nav>
  )
}
