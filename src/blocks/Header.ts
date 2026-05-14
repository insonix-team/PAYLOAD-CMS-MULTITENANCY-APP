import { Block } from 'payload'

export const HeaderBlock: Block = {
  slug: 'header',

  fields: [
    {
      name: 'logo',
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
