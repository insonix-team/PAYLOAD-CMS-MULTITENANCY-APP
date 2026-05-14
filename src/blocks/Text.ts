import { Block } from 'payload'

export const TextBlock: Block = {
  slug: 'text',

  fields: [
    {
      name: 'content',
      type: 'richText',
    },
  ],
}
