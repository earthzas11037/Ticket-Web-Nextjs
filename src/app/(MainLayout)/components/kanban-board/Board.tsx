import React, { useEffect, useState } from 'react'
import Column from '@/app/(MainLayout)/components/kanban-board/Column'
import BurnBarrel from '@/app/(MainLayout)/components/kanban-board/BurnBarrel'
import Ticket from '@/app/(MainLayout)/models/Ticket'
import TicketStatus from '@/app/(MainLayout)/models/TicketStatus'
import {
  Box,
  Button,
  Divider,
  Drawer,
  FormControl,
  FormHelperText,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  styled,
  TextField,
  Typography,
} from '@mui/material'
import { CgClose } from 'react-icons/cg'
import { SubmitHandler, useForm } from 'react-hook-form'
import EditDrawer from '@/app/(MainLayout)/components/kanban-board/EditDrawer'
import UpdateTicketAPIReuqest from '@/app/(MainLayout)/api-request/UpdateTicketAPIReuqest'
import { fetch } from '@/app/utils/fetch-api/FetchAPI'
import { get } from 'lodash'
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
  const sidebarWidth = '270px'

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

      {/* <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={closeDrawer}
        variant="temporary"
        PaperProps={{
          sx: {
            width: '400px',
            boxShadow: (theme) => theme.shadows[8],
          },
        }}
      >
        <div className="">
          <DrawerHeader className="py-2 px-6">
            <Typography variant="h3">Edit Ticket</Typography>
            <IconButton onClick={closeDrawer}>
              <CgClose />
            </IconButton>
          </DrawerHeader>
          <Divider />
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-4 p-6">
              <TextField
                {...register('title', { required: 'Title is required' })}
                label="Title"
                error={!!errors.title?.message}
                helperText={errors.title?.message}
              />
              <TextField
                {...register('description', { required: 'Description is required' })}
                label="Description"
                multiline
                rows={4}
                error={!!errors.description?.message}
                helperText={errors.description?.message}
              />
              <TextField
                {...register('contact', { required: 'Contact is required' })}
                label="Contact"
                multiline
                rows={2}
                error={!!errors.contact?.message}
                helperText={errors.contact?.message}
              />

              <FormControl fullWidth error={!!errors.status?.id?.message}>
                <InputLabel id="demo-simple-select-label">Status</InputLabel>
                <Select
                  {...register('status.id', { required: 'Status is required' })}
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  // value={1}
                  label="Status"
                  onChange={() => {}}
                >
                  {status.map((item, index) => {
                    return (
                      <MenuItem value={item.id} key={'selection-' + item.id}>
                        {item.name.toUpperCase()}
                      </MenuItem>
                    )
                  })}
                </Select>
                {!!errors.status?.id?.message && <FormHelperText>{errors.status?.id?.message}</FormHelperText>}
              </FormControl>

              <div className="flex flex-row gap-x-3">
                <Button variant="contained" type="submit">
                  Submit
                </Button>
                <Button color="error" variant="outlined">
                  Cancel
                </Button>
              </div>
            </div>
          </form>
        </div>
      </Drawer> */}
    </div>
  )
}

export default Board
