import TicketStatus from '@/app/(MainLayout)/models/TicketStatus'
import React from 'react'

interface Props {
  beforeId: string | null
  column: TicketStatus
}

const DropIndicatior = ({ beforeId, column }: Props) => {
  return (
    <div
      data-before={beforeId || '-1'}
      data-column={column.id}
      className="my-0.5 h-0.5 w-full bg-violet-400 opacity-0"
    />
  )
}

export default DropIndicatior
