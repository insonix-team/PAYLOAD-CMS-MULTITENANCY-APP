import { HeaderCTA } from '@/blocks/headers/HeaderCTA'
import HeaderCentered from './HeaderCentered'
import HeaderSimple from './HeaderSimple'
import { HeaderClient } from './HeaderCTA'

export default function HeaderRenderer({ header }: any) {
  if (!header) {
    return null
  }

  const block = header[0]
  console.log(block)

  switch (block?.blockType) {
    case 'headerSimple':
      return <HeaderSimple {...block} />

    case 'headerCentered':
      return <HeaderCentered {...block} />

    case 'headerCTA':
      return <HeaderClient {...block} />

    default:
      return null
  }
}
