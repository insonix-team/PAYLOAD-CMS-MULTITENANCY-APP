import type { Block } from 'payload';

export const FAQBlock: Block = {
  slug: 'faqBlock',
  imageURL: '/block-thumbnails/faq.webp',
  labels: {
    singular: 'FAQ Section',
    plural: 'FAQ Sections',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'FAQ Title',
    },
    {
      name: 'items',
      type: 'array',
      required: true,
      label: 'FAQ Items',
      minRows: 1,
      fields: [
        {
          name: 'question',
          type: 'text',
          required: true,
        },
        {
          name: 'answer',
          type: 'richText',
          required: true,
        },
      ],
    },
    {
      name: '_templateBlockId',
      type: 'text',
      admin: {
        hidden: true,
      },
    },
    {
      name: '_blockId',
      type: 'text',
      admin: { hidden: true },
    },
    {
      name: '_originalPosition',
      type: 'number',
      admin: {
        hidden: true,
      },
    },
  ],
};
