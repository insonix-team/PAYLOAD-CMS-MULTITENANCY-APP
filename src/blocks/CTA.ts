import { Block } from 'payload'

export const CTABlock: Block = {
  slug: 'cta',

  fields: [
    {
      name: 'heading',
      type: 'text',
    },
    {
      name: 'subtext',
      type: 'textarea',
    },
    {
      name: 'buttonText',
      type: 'text',
    },
    {
      name: 'buttonLink',
      type: 'text',
    },
  ],
}
