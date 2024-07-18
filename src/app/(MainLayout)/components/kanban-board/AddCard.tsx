import React, { useState } from 'react'
import { FiPlus } from 'react-icons/fi'
import { motion } from 'framer-motion'
import TicketStatus from '@/app/(MainLayout)/models/TicketStatus'
import { TextField } from '@mui/material'
import TicketManager from '@/app/(MainLayout)/manager/TicketManager'
import Ticket from '@/app/(MainLayout)/models/Ticket'

interface Props {
  column: TicketStatus
  setCards: (data: any) => void
}

const AddCard = ({ column, setCards }: Props) => {
  const [text, setText] = useState('')
  const [adding, setAdding] = useState(false)

  const handleSubmit = (e: any) => {
    e.preventDefault()

    if (!text.trim().length) return

    create()
  }

  const create = async () => {
    try {
      const newCard = {
        status: column,
        title: text.trim(),
      }
      const data = new Ticket(newCard)

      const result = await TicketManager.default.createTicket(data)

      setCards((pv: any) => [...pv, result])

      setAdding(false)
    } catch (err) {}
  }

  return (
    <>
      {adding ? (
        <motion.form layout onSubmit={handleSubmit} className="mt-3">
          <TextField
            onChange={(e) => setText(e.target.value)}
            autoFocus
            label="Add Ticket"
            placeholder="Add new ticket..."
            className="w-full"
          />
          <div className="mt-1.5 flex items-center justify-end gap-1.5">
            <button onClick={() => setAdding(false)} className="px-3 py-1.5 text-xs text-neutral-400 transition-colors">
              Close
            </button>
            <button
              type="submit"
              className="flex items-center gap-1.5 rounded bg-neutral-50 px-3 py-1.5 text-xs text-neutral-950 transition-colors"
            >
              <span>Add</span>
              <FiPlus />
            </button>
          </div>
        </motion.form>
      ) : (
        <motion.button
          layout
          onClick={() => setAdding(true)}
          className="flex w-full items-center gap-1.5 px-3 py-1.5 text-xs text-neutral-400 transition-colors"
        >
          <span>Add card</span>
          <FiPlus />
        </motion.button>
      )}
    </>
  )
}

export default AddCard
