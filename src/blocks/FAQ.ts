import { Block } from 'payload'

export const FAQBlock: Block = {
  slug: 'faq',

  fields: [
    {
      name: 'heading',
      type: 'text',
    },

    {
      name: 'faqs',
      type: 'array',
      fields: [
        {
          name: 'question',
          type: 'text',
        },
        {
          name: 'answer',
          type: 'richText',
        },
      ],
    },
  ],
}
