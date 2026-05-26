import FooterColumns from './FooterColumns'
import FooterSimple from './FooterSimple'
import { FooterNewsLetterUI } from './FooterNewsLetter'

export default function FooterRenderer({ footer }: any) {
  if (!footer) {
    return null
  }

  const block = footer[0]

  switch (block?.blockType) {
    case 'footerSimple':
      return <FooterSimple {...block} />

    case 'footerColumns':
      return <FooterColumns {...block} />

    case 'footerNewsletter':
      return <FooterNewsLetterUI {...block} />

    default:
      return null
  }
}
