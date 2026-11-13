import { findChapter } from '../nav/deckState.js'
import { ShortNav } from './ui.jsx'
import { AccentTitle } from './Chrome.jsx'
import { MethodFigure } from './MethodFigure.jsx'
import { LogicDrill, WallDrill } from './LogicDrills.jsx'
import { BookModal } from './BookModal.jsx'

export function MethodOverview({
  catalog,
  compact = false,
  onOpen,
  modalId = null,
  onCloseModal,
  onSelect,
}) {
  const chapter = findChapter(catalog, 'method')
  const cap = modalId && modalId !== 'wall'
    ? catalog.capabilities.find((item) => item.id === modalId)
    : null
  const label =
    modalId === 'wall' ? '视效库' : cap ? `${cap.no} ${cap.full}` : '详层'

  return (
    <section className="overview overview--method overview--method-figure" aria-label="研究逻辑">
      <header className="overview-head overview-head--method">
        <p className="kicker">{chapter.subtitle}</p>
        <AccentTitle text={chapter.title} accent={chapter.accent} />
      </header>
      <MethodFigure catalog={catalog} compact={compact} onOpen={onOpen} />
      {modalId ? (
        <BookModal
          label={label}
          nav={
            cap ? (
              <ShortNav items={catalog.capabilities} currentId={cap.id} onSelect={onSelect} />
            ) : null
          }
          onClose={onCloseModal}
          className="book-modal-layer--logic"
        >
          {modalId === 'wall' ? (
            <WallDrill catalog={catalog} />
          ) : cap ? (
            <LogicDrill catalog={catalog} cap={cap} />
          ) : (
            <article className="logic-drill">
              <div className="pending-slot">待补充</div>
            </article>
          )}
        </BookModal>
      ) : null}
    </section>
  )
}
