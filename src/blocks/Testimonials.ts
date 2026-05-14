import { Block } from 'payload'

export const TestimonialsBlock: Block = {
  slug: 'testimonials',

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
          name: 'name',
          type: 'text',
        },
        {
          name: 'role',
          type: 'text',
        },
        {
          name: 'review',
          type: 'textarea',
        },
        {
          name: 'rating',
          type: 'number',
          min: 1,
          max: 5,
        },
      ],
    },
  ],
}
