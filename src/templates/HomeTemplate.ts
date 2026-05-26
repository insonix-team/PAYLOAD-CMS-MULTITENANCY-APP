// collections/HomeTemplate.ts

import { CardsWithIcons } from '@/blocks/CardsIconBlock'
import { ContentBlock } from '@/blocks/ContentBlock'
import { MediaBlockContent } from '@/blocks/ContentImageConfig'
import { CtaBlock } from '@/blocks/CtaBlock'
import { FAQBlock } from '@/blocks/FaqConfig'
import { FeaturesBlock } from '@/blocks/FeaturesBlock'
import { HeroBlock } from '@/blocks/HeroBlock'
import type { CollectionConfig } from 'payload'

export const HomeTemplate: CollectionConfig = {
  slug: 'home-templates',
  admin: {
    useAsTitle: 'name',
    group: 'Templates',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
    },
    {
      name: 'blocks',
      type: 'blocks',
      blocks: [HeroBlock, FeaturesBlock, ContentBlock, CtaBlock, MediaBlockContent, FAQBlock, CardsWithIcons],
      admin: {
        description: 'Predefined blocks structure for this template',
      },
    },
  ],
}
