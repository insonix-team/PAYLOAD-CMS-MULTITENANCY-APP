import { Block } from 'payload'

export const FooterColumns: Block = {
  slug: 'footerColumns',

  labels: {
    singular: 'Columns Footer',
    plural: 'Columns Footers',
  },

  fields: [
    {
      name: 'columns',
      type: 'array',
      fields: [
        {
          name: 'title',
          type: 'text',
        },

        {
          name: 'links',
          type: 'array',
          fields: [
            {
              name: 'label',
              type: 'text',
            },
            {
              name: 'url',
              type: 'text',
            },
          ],
        },
      ],
    },
  ],
}
