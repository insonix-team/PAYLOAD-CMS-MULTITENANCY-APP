import { Block } from 'payload'

export const Content: Block = {
  slug: 'content',

  fields: [
    {
      name: 'text',
      type: 'richText',
    },
  ],
}
