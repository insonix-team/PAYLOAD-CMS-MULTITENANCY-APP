import { Block } from 'payload'

export const FooterBlock: Block = {
  slug: 'footer',

  fields: [
    {
      name: 'text',
      type: 'text',
    },
    {
      name: 'links',
      type: 'array',
      fields: [
        { name: 'label', type: 'text' },
        { name: 'url', type: 'text' },
      ],
    },
  ],
}
