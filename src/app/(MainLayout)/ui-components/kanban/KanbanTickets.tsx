'use client'
import React, { useEffect, useState } from 'react'
import { CircularProgress } from '@mui/material'
import Board from '@/app/(MainLayout)/components/kanban-board/Board'
import Ticket from '@/app/(MainLayout)/models/Ticket'
import TicketStatus from '@/app/(MainLayout)/models/TicketStatus'
import TicketManager from '@/app/(MainLayout)/manager/TicketManager'

const KanbanTickets = () => {
  const [cards, setCards] = useState<Ticket[]>([])
  const [status, setStatus] = useState<TicketStatus[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    init()
  }, [])

  const init = async () => {
    setLoading(true)
    try {
      await getTicketStatus()
      await getTicketList()
      setLoading(false)
    } catch (err) {}
  }

  const getTicketList = async () => {
    const data = await TicketManager.default.getTicketList()
    setCards(data)
  }

  const getTicketStatus = async () => {
    const data = await TicketManager.default.getTicketStatus()
    setStatus(data)
  }

  return (
    <div className="h-screen w-full text-neutral-50">
      {loading ? (
        <div className="w-full flex-1 flex align-middle items-center justify-center p-4">
          <CircularProgress />
        </div>
      ) : (
        <Board cards={cards} status={status} setCards={setCards} />
      )}
    </div>
  )
}

export default KanbanTickets
