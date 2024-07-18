'use client'
import Footer from '@/app/(MainLayout)/layout/footer/page'
import Header from '@/app/(MainLayout)/layout/header/Header'
import Sidebar from '@/app/(MainLayout)/layout/sidebar/Sidebar'
import { styled, Container, Box, Grid } from '@mui/material'
import React, { useState } from 'react'

const MainWrapper = styled('div')(() => ({
  display: 'flex',
  minHeight: '100vh',
  width: '100%',
}))

const PageWrapper = styled('div')(() => ({
  display: 'flex',
  flexGrow: 1,
  paddingBottom: '60px',
  flexDirection: 'column',
  zIndex: 1,
  backgroundColor: 'transparent',
  overflow: 'hidden',
}))

interface Props {
  children: React.ReactNode
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setSidebarOpen] = useState(true)
  const [isMobileSidebarOpen, setMobileSidebarOpen] = useState(false)
  return (
    <MainWrapper className="mainwrapper">
      <Sidebar
        isSidebarOpen={isSidebarOpen}
        isMobileSidebarOpen={isMobileSidebarOpen}
        onSidebarClose={() => setMobileSidebarOpen(false)}
      />
      <PageWrapper className="page-wrapper">
        <Header toggleMobileSidebar={() => setMobileSidebarOpen(true)} />
        {/* <Container
          sx={{
            paddingTop: '20px',
            maxWidth: '1200px',
          }}
          fixed
        > */}
        <Grid container justifyContent="flex-start" style={{ overflow: 'scroll', width: '100%' }}>
          <Box sx={{ minHeight: 'calc(100vh - 170px)' }}>{children}</Box>
          {/* <Footer /> */}
        </Grid>

        {/* </Container> */}
      </PageWrapper>
    </MainWrapper>
  )
}
