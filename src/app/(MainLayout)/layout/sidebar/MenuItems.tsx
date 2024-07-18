import { IconLayoutKanban } from '@tabler/icons-react'

import { uniqueId } from 'lodash'

const Menuitems = [
  {
    id: uniqueId(),
    title: 'Tickets',
    icon: IconLayoutKanban,
    href: '/',
  },
]

export default Menuitems
