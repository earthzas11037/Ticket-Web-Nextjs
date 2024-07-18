import React, { useEffect, useState } from 'react'
import Column from '@/app/(MainLayout)/components/kanban-board/Column'
import Ticket from '@/app/(MainLayout)/models/Ticket'
import TicketStatus from '@/app/(MainLayout)/models/TicketStatus'
import { styled } from '@mui/material'
import EditDrawer from '@/app/(MainLayout)/components/kanban-board/EditDrawer'
import TicketManager from '@/app/(MainLayout)/manager/TicketManager'

interface Props {
  cards: Ticket[]
  status: TicketStatus[]
  setCards: (data: any[]) => void
}

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'space-between',
}))

const Board = ({ cards, status, setCards }: Props) => {
  const [dataEdit, setDataEdit] = useState<Ticket>(new Ticket(null))
  const [drawerOpen, setDrawerOpen] = useState(false)
  const colors = ['text-yellow-400', 'text-blue-500', 'text-green-500', 'text-red-500']
  const borderColors = ['border-l-yellow-400', 'border-l-blue-500', 'border-l-green-500', 'border-l-red-500']

  const toggleDrawer = () => {
    setDrawerOpen((value) => !value)
  }

  const openDrawer = (data: Ticket) => {
    // console.log(data)
    setDataEdit(data)
    setDrawerOpen(true)
  }

  const closeDrawer = () => {
    setDrawerOpen(false)
    setDataEdit(new Ticket(null))
  }

  const onSubmitEdit = async (value: Ticket) => {
    try {
      const data = await TicketManager.default.updateTicket(value)
      let copy = [...cards]

      let cardToTransfer = { ...data }

      copy = copy.filter((c) => c.id != cardToTransfer.id)
      copy.push(cardToTransfer)

      setCards(copy)
      closeDrawer()
    } catch (err) {}
  }

  return (
    <div className="flex h-full w-full gap-3 overflow-scroll p-12 pt-0 items-start justify-start">
      {status.map((item, index) => {
        return (
          <Column
            key={'column-' + index}
            title={item.name.toUpperCase()}
            column={item}
            color={colors[index] || 'neutral-500'}
            borderColors={borderColors[index] || 'border-l-neutral-500'}
            // headingColor={'neutral-600'}
            cards={cards}
            setCards={setCards}
            onClickEdit={openDrawer}
            onCloseEdit={closeDrawer}
          />
        )
      })}

      <EditDrawer open={drawerOpen} onClose={closeDrawer} data={dataEdit} onSubmit={onSubmitEdit} status={status} />
    </div>
  )
}

export default Board
