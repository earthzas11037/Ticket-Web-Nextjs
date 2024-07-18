import React from 'react'
import { motion } from 'framer-motion'
import DropIndicatior from '@/app/(MainLayout)/components/kanban-board/DropIndicatior'
import Ticket from '@/app/(MainLayout)/models/Ticket'
import TicketStatus from '@/app/(MainLayout)/models/TicketStatus'
import { formatISODate } from '@/app/utils/date-time/DatetimeUtil'

interface Props {
  data: Ticket
  borderColors: string
  column: TicketStatus
  handleDragStart: any
  onClickEdit: (data: Ticket) => void
}

const Card = ({ data, borderColors, column, handleDragStart, onClickEdit }: Props) => {
  return (
    <>
      <DropIndicatior beforeId={String(data.id)} column={column} />
      <motion.div
        layout
        layoutId={String(data.id)}
        draggable="true"
        onDragStart={(e) => handleDragStart(e, { ...data, column })}
        className={`cursor-grab rounded-lg border grid p-4 gap-2 active:cursor-grabbing shadow-md bg-white border-l-4 ${borderColors}`}
        onClick={() => {
          onClickEdit(data)
        }}
      >
        <p className="text-md text-neutral-800 font-bold">{data.title}</p>
        {data.description && <p className="text-md text-neutral-800 line-clamp-4">{data.description}</p>}
        <div>
          <p className="text-sm text-neutral-400 ">{`Created at: ${formatISODate(data.created)}`}</p>
          <p className="text-sm text-neutral-400 ">{`Updated at: ${formatISODate(data.updated)}`}</p>
        </div>
      </motion.div>
    </>
  )
}

export default Card
