import HeaderCentered from './HeaderCentered'
import HeaderSimple from './HeaderSimple'

export default function HeaderRenderer({ header }: any) {
  if (!header) {
    return null
  }

  const block = header[0]

  switch (block.blockType) {
    case 'headerSimple':
      return <HeaderSimple {...block} />

    case 'headerCentered':
      return <HeaderCentered {...block} />

    default:
      return null
  }
}
