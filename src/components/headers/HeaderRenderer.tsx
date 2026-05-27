import HeaderCentered from './HeaderCentered'
import { HeaderCTA } from './HeaderCTA'
import HeaderSimple from './HeaderSimple'
export default function HeaderRenderer({ header }: any) {
  if (!header) {
    return null
  }

  const block = header[0]
  switch (block?.blockType) {
    case 'headerSimple':
      return <HeaderSimple {...block} />

    case 'headerCentered':
      return <HeaderCentered {...block} />

    case 'headerCTA':
      return <HeaderCTA {...block} />

    default:
      return null
  }
}
