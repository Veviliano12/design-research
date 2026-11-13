import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { CloseButton } from './ui.jsx'

const FOCUSABLE =
  'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'

export function BookModal({ label, nav, onClose, children, className = '' }) {
  const panelRef = useRef(null)
  const lastFocus = useRef(null)
  const host =
    (typeof document !== 'undefined' && (document.querySelector('.stage-body') || document.body)) ||
    null

  useEffect(() => {
    lastFocus.current = document.activeElement
    const stage = document.querySelector('.stage')
    stage?.classList.add('is-modal-open')
    const panel = panelRef.current
    const start = panel?.querySelector('.close-btn, ' + FOCUSABLE) || panel
    start?.focus?.()

    const onKey = (event) => {
      if (event.key !== 'Tab' || !panel) return
      const nodes = [...panel.querySelectorAll(FOCUSABLE)].filter(
        (el) => !el.hasAttribute('disabled') && el.getAttribute('aria-hidden') !== 'true',
      )
      if (!nodes.length) {
        event.preventDefault()
        panel.focus()
        return
      }
      const first = nodes[0]
      const last = nodes[nodes.length - 1]
      const active = document.activeElement
      if (event.shiftKey && (active === first || !panel.contains(active))) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && (active === last || !panel.contains(active))) {
        event.preventDefault()
        first.focus()
      }
    }
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('keydown', onKey)
      stage?.classList.remove('is-modal-open')
      if (lastFocus.current && typeof lastFocus.current.focus === 'function') {
        lastFocus.current.focus()
      }
    }
  }, [])

  if (!host) return null

  const node = (
    <div className={`book-modal-layer${className ? ` ${className}` : ''}`} data-qa="book-modal">
      <div
        className="book-modal-backdrop"
        data-qa="book-modal-backdrop"
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        className="book-modal"
        role="dialog"
        aria-modal="true"
        aria-label={label || '详层'}
        ref={panelRef}
        tabIndex={-1}
      >
        <div className="book-modal-chrome">
          <div className="book-modal-lead">{nav}</div>
          <CloseButton onClick={onClose} label="关闭" />
        </div>
        <div className="book-modal-body" data-qa="book-modal-body">
          {children}
        </div>
      </div>
    </div>
  )

  return createPortal(node, host)
}
