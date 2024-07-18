import React, { useState } from 'react'
import Card from '@/app/(MainLayout)/components/kanban-board/Card'
import AddCard from '@/app/(MainLayout)/components/kanban-board/AddCard'
import DropIndicatior from '@/app/(MainLayout)/components/kanban-board/DropIndicatior'
import Ticket from '@/app/(MainLayout)/models/Ticket'
import TicketStatus from '@/app/(MainLayout)/models/TicketStatus'
import TicketManager from '@/app/(MainLayout)/manager/TicketManager'

interface Props {
  title: string
  color: string
  borderColors: string
  cards: Ticket[]
  column: TicketStatus
  setCards: (data: any) => void
  onClickEdit: (data: Ticket) => void
  onCloseEdit: () => void
}

const Column = ({ title, color, borderColors, cards, column, setCards, onClickEdit }: Props) => {
  const [active, setActive] = useState(false)

  const handleDragStart = (e: any, card: Ticket) => {
    e.dataTransfer.setData('cardId', card.id)
  }

  const handleDragEnd = (e: any) => {
    const cardId = e.dataTransfer.getData('cardId')
    setActive(false)
    clearHighlights()

    const indicators = getIndicators()
    const { element } = getNearestIndicator(e, indicators)

    const before = element.dataset.before || '-1'
    if (before != cardId) {
      let copy = [...cards]

      let cardToTransfer = copy.find((c) => c.id == cardId)
      if (!cardToTransfer) return
      cardToTransfer = { ...cardToTransfer, status: column }

      // fetch update
      TicketManager.default.updateTicket(cardToTransfer)

      copy = copy.filter((c) => c.id != cardId)

      const moveToBack = before == '-1'

      copy.push(cardToTransfer)
      // if (moveToBack) {
      //   copy.push(cardToTransfer)
      // } else {
      //   const insertAtIndex = copy.findIndex((el) => el.id === before)
      //   if (insertAtIndex === undefined) return

      //   copy.splice(insertAtIndex, 0, cardToTransfer)
      // }

      setCards(copy)
    }
  }

  const handleDragOver = (e: any) => {
    e.preventDefault()
    highlightIndicator(e)

    setActive(true)
  }

  const clearHighlights = (els?: any) => {
    const indicators = els || getIndicators()

    indicators.forEach((i: any) => {
      i.style.opacity = '0'
    })
  }

  const highlightIndicator = (e: any) => {
    const indicators = getIndicators()

    clearHighlights(indicators)

    const el = getNearestIndicator(e, indicators)

    el.element.style.opacity = '1'
  }

  const getNearestIndicator = (e: any, indicators: any) => {
    const DISTANCE_OFFSET = 50

    const el = indicators.reduce(
      (closest: any, child: any) => {
        const box = child.getBoundingClientRect()

        const offset = e.clientY - (box.top + DISTANCE_OFFSET)

        if (offset < 0 && offset > closest.offset) {
          return { offset: offset, element: child }
        } else {
          return closest
        }
      },
      {
        offset: Number.NEGATIVE_INFINITY,
        element: indicators[indicators.length - 1],
      },
    )

    return el
  }

  const getIndicators = () => {
    return Array.from(document.querySelectorAll(`[data-column="${column.id}"]`))
  }

  const handleDragLeave = () => {
    clearHighlights()
    setActive(false)
  }

  const filteredCards = cards.filter((c: Ticket) => c.status.id == column.id)
  return (
    <div className="w-72 shrink-0">
      <div className="mb-3 flex items-center justify-between">
        <h3 className={`font-medium ${color}`}>{title}</h3>
        <span className="rounded text-sm text-neutral-400">{filteredCards.length}</span>
      </div>
      <div
        onDrop={handleDragEnd}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className={`h-full w-full transition-colors 'bg-neutral-800/0'`}
      >
        {filteredCards.map((c: Ticket) => {
          return (
            <Card
              borderColors={borderColors}
              key={c.id}
              data={c}
              column={column}
              handleDragStart={handleDragStart}
              onClickEdit={onClickEdit}
            />
          )
        })}
        <DropIndicatior beforeId={null} column={column} />
        <AddCard column={column} setCards={setCards} />
      </div>
    </div>
  )
}

export default Column
