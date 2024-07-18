'use client'
import PageContainer from '@/app/(MainLayout)/components/container/PageContainer'
import KanbanTickets from '@/app/(MainLayout)/ui-components/kanban/KanbanTickets'
import { Grid, Box, TextField } from '@mui/material'

const Dashboard = () => {
  return (
    <PageContainer title="Dashboard" description="this is Dashboard">
      <Box mt={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} lg={12}>
            <KanbanTickets />
          </Grid>
        </Grid>
      </Box>
    </PageContainer>
  )
}

export default Dashboard
