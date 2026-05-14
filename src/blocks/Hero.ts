import { Block } from 'payload'

export const Hero: Block = {
  slug: 'hero',

  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'subtitle',
      type: 'text',
    },
  ],
}
