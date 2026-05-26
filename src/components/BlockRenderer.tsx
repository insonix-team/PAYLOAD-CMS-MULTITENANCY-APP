import { CardsBlockUI } from './blocks/CardsBlockUI'
import { ListBlockUI } from './blocks/ListBlockUI'
import { FAQBlockUI } from './blocks/FAQBlockUI'
import { TestimonialsBlockUI } from './blocks/TestimonialsBlockUI'
import { CTABlockUI } from './blocks/CTABlockUI'
import { TextBlockUI } from './blocks/TextBlockUI'
import { ImageBlockUI } from './blocks/ImageBlockUI'
import { ContentWithImageBlock } from './blocks/ContentWithImageBlocksUi'
import { HeroBlock } from './HeroBlock'
import { FeaturesBlock } from './FeaturesBlock'
import { ContentImageComponentUI } from './ContentImageComponent'
import { FAQComponentUI } from './FaqComponent'

type Props = {
  blocks: any[]
  tenant: string
}

export const BlockRenderer = ({ blocks, tenant }: Props) => {
  if (!blocks) return null

  return (
    <>
      {blocks.map((block, index) => {
        switch (block.blockType) {
          case 'contentWithImage':
            return <ContentWithImageBlock key={index} data={block} tenant={tenant} />

          case 'cards':
            return <CardsBlockUI key={index} data={block} />

          case 'mediaBlockcontent':
            return <ContentImageComponentUI key={index} data={block} tenant={tenant} />

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
