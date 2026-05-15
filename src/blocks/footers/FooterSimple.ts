import { Block } from 'payload'

export const FooterSimple: Block = {
  slug: 'footerSimple',

  labels: {
    singular: 'Simple Footer',
    plural: 'Simple Footers',
  },

  fields: [
    {
      name: 'copyrightText',
      type: 'text',
    },

    {
      name: 'socialLinks',
      type: 'array',
      fields: [
        {
          name: 'platform',
          type: 'text',
        },
        {
          name: 'url',
          type: 'text',
        },
      ],
    },
  ],
}
