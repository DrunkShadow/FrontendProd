import { CoreMenu } from '@core/types'

export const menu: CoreMenu[] = [
  {
    id: 'sample',
    title: 'Objects',
    translate: 'MENU.SAMPLE',
    type: 'item',
    icon: 'file',
    url: 'sample'
  },
  {
    id: 'Models',
    title: 'Models',
    type: 'item',
    url: 'model'
  },
  {
    id: 'EmailHistory',
    title: 'Email History',
    type: 'item',
    url: 'History'
  },
]
