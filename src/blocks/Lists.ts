import { Block } from 'payload'

export const ListBlock: Block = {
  slug: 'list',

  fields: [
    {
      name: 'heading',
      type: 'text',
    },

    {
      name: 'items',
      type: 'array',
      fields: [
        {
          name: 'text',
          type: 'text',
        },
      ],
    },

    {
      name: 'style',
      type: 'select',
      options: [
        { label: 'Bullet', value: 'bullet' },
        { label: 'Numbered', value: 'number' },
        { label: 'Checkmarks', value: 'check' },
      ],
    },
  ],
}
