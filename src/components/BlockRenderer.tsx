import { CardsBlockUI } from './blocks/CardsBlockUI'
import { ContentWithImageBlock } from './blocks/ContentWithImageBlocksUi'
import { CTABlockUI } from './blocks/CTABlockUI'
import { ImageBlockUI } from './blocks/ImageBlockUI'
import { ListBlockUI } from './blocks/ListBlockUI'
import { TestimonialsBlockUI } from './blocks/TestimonialsBlockUI'
import { TextBlockUI } from './blocks/TextBlockUI'
import { ContentImageComponentUI } from './ContentImageComponent'
import { FAQComponentUI } from './FaqComponent'
import { CardsWithIconsBlockUI } from './CardIconComponent'
import { FeaturesBlock } from './FeaturesBlock'
import { HeroBlock } from './HeroBlock'
import VerticleHoverCardsUI from './VerticleHoverCardsUI'
import { HeroLeftLayoutUI } from './HeroLeftLayoutUI'

type Props = {
  blocks: any[]
  tenant: string
}

export const BlockRenderer = ({ blocks, tenant }: Props) => {
  if (!blocks) return null

  return (
    <>
      {blocks?.map((block, index) => {
        switch (block?.blockType) {
          case 'contentWithImage':
            return <ContentWithImageBlock key={index} data={block} tenant={tenant} />

          case 'cards':
            return <CardsBlockUI key={index} data={block} />

          case 'mediaBlockcontent':
            return <ContentImageComponentUI key={index} data={block} tenant={tenant} />

          case 'cardsWithIcons':
            return <CardsWithIconsBlockUI key={index} data={block} tenant={tenant} />

          case 'verticleHoverCardsBlock':
            return <VerticleHoverCardsUI key={index} data={block} tenant={tenant} />

    case 'heroLeftLayoutBlock':
            return <HeroLeftLayoutUI key={index} data={block} tenant={tenant} />


          case 'list':
            return <ListBlockUI key={index} data={block} />

          case 'faqBlock':
            return <FAQComponentUI key={index} data={block} tenant={tenant} />

          case 'testimonials':
            return <TestimonialsBlockUI key={index} data={block} />

          case 'cta':
            return <CTABlockUI key={index} data={block} tenant={tenant} />

          case 'text':
            return <TextBlockUI key={index} data={block} />

          case 'image':
            return <ImageBlockUI key={index} data={block} />
          case 'hero':
            return <HeroBlock key={index} data={block} />
          case 'features':
            return <FeaturesBlock key={index} {...block} />
          default:
            return null
        }
      })}
    </>
  )
}
