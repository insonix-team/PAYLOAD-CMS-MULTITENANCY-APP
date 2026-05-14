// collections/HomeTemplate.ts

import { ContentBlock } from '@/template-blocks/ContentBlock'
import { CtaBlock } from '@/template-blocks/CtaBlock'
import { FeaturesBlock } from '@/template-blocks/FeaturesBlock'
import { HeroBlock } from '@/template-blocks/HeroBlock'
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
      blocks: [HeroBlock, FeaturesBlock, ContentBlock, CtaBlock],
      admin: {
        description: 'Predefined blocks structure for this template',
      },
    },
  ],
}
