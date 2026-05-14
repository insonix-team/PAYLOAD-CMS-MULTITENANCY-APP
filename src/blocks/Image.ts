import { Block } from 'payload'

export const ImageBlock: Block = {
  slug: 'image',

  fields: [
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'caption',
      type: 'text',
    },
  ],
}
