import { ContentBlock } from '@/blocks/ContentBlock'
import { CtaBlock } from '@/blocks/CtaBlock'
import { FeaturesBlock } from '@/blocks/FeaturesBlock'
import { HeroBlock } from '@/blocks/HeroBlock'
import type { CollectionConfig } from 'payload'

export const AboutTemplate: CollectionConfig = {
  slug: 'about-templates',
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
      type: 'text',
      admin: {
        components: {
          Field: '@/components/TipTapEditor',
        },
      },
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
