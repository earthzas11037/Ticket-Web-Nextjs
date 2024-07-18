'use client'
import { useMediaQuery, Box, Drawer } from '@mui/material'
import SidebarItems from './SidebarItems'

interface ItemType {
  isMobileSidebarOpen: boolean
  onSidebarClose: (event: React.MouseEvent<HTMLElement>) => void
  isSidebarOpen: boolean
}

const Sidebar = ({ isMobileSidebarOpen, onSidebarClose, isSidebarOpen }: ItemType) => {
  const lgDown = useMediaQuery((theme: any) => theme.breakpoints.down('lg'))

  const sidebarWidth = '270px'

  return (
    <>
      {lgDown ? (
        <Drawer
          anchor="left"
          open={isMobileSidebarOpen}
          onClose={onSidebarClose}
          variant="temporary"
          PaperProps={{
            sx: {
              width: sidebarWidth,
              boxShadow: (theme) => theme.shadows[8],
            },
          }}
        >
          <Box px={2} py={2}></Box>
          <SidebarItems />
        </Drawer>
      ) : (
        <Box
          sx={{
            width: sidebarWidth,
            flexShrink: 0,
          }}
        >
          <Drawer
            anchor="left"
            open={isSidebarOpen}
            variant="permanent"
            PaperProps={{
              sx: {
                width: sidebarWidth,
                boxSizing: 'border-box',
                border: '0',
                boxShadow: 'rgba(113, 122, 131, 0.11) 0px 7px 30px 0px',
              },
            }}
          >
            <Box
              sx={{
                height: '100%',
              }}
              py={2}
            >
              <Box px={2}></Box>
              <Box>
                <Box mt={3}>
                  <SidebarItems />
                </Box>
              </Box>
            </Box>
          </Drawer>
        </Box>
      )}
    </>
  )
}

export default Sidebar
