import React, { useEffect, useMemo, useState } from 'react'
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
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { formatISODate } from '@/app/utils/date-time/DatetimeUtil'

interface Props {
  open: boolean
  data: Ticket
  status: TicketStatus[]
  onSubmit: (data: Ticket) => void
  onClose: () => void
}

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: 'space-between',
}))

const EditDrawer = ({ open, data, status, onSubmit, onClose }: Props) => {
  // const [drawerOpen, setDrawerOpen] = useState(false)
  const {
    register,
    reset,
    formState: { errors },
    handleSubmit,
    control,
  } = useForm<Ticket>({
    defaultValues: useMemo(() => {
      return data
    }, [data]),
  })

  useEffect(() => {
    reset(data)
  }, [data])

  // const onSubmit: SubmitHandler<Ticket> = (data) => console.log(data)

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
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
          <IconButton onClick={onClose}>
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
              <Controller
                name="status.id"
                control={control}
                render={({ field }) => (
                  <Select {...field} labelId="demo-simple-select-label" id="demo-simple-select" label="Status">
                    {status.map((item) => (
                      <MenuItem value={item.id} key={'selection-' + item.id}>
                        {item.name.toUpperCase()}
                      </MenuItem>
                    ))}
                  </Select>
                )}
              />
              {!!errors.status?.id?.message && <FormHelperText>{errors.status?.id?.message}</FormHelperText>}
            </FormControl>

            <div>
              <p className="text-base text-neutral-400 ">{`Created at: ${formatISODate(data.created)}`}</p>
              <p className="text-base text-neutral-400 ">{`Updated at: ${formatISODate(data.updated)}`}</p>
            </div>

            <div className="flex flex-row gap-x-3">
              <Button variant="contained" type="submit" size="large">
                Submit
              </Button>
              <Button color="error" variant="outlined" size="large" onClick={onClose}>
                Cancel
              </Button>
            </div>
          </div>
        </form>
      </div>
    </Drawer>
  )
}

export default EditDrawer
