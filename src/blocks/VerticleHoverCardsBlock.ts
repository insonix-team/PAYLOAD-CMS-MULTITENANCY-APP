import type { Block } from 'payload';

export const VerticleHoverCardsBlock: Block = {
  slug: 'verticleHoverCardsBlock',
  imageURL: '/block-thumbnails/vertical-box.webp',
  labels: {
    singular: 'Verticle Card Hover',
    plural: 'Verticle Cards Hovers',
  },

  fields: [
    {
      name: 'blockHeading',
      type: 'text',
      required: true,
    },
    {
      name: 'headingColor',
      type: 'select',
      label: 'Heading Text Color',
      defaultValue: 'black',
      options: [
        { label: 'Black', value: 'black' },
        { label: 'White', value: 'white' },
      ],
    },
    {
      name: 'cards',
      type: 'array',
      required: true,
      labels: {
        singular: 'Card',
        plural: 'Cards',
      },
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'slug',
          type: 'text',
          required: true,
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
        {
          name: 'description',
          type: 'textarea',
          required: true,
        },

        {
          name: 'cta',
          type: 'group',
          label: 'CTA Button',
          fields: [
            {
              name: 'text',
              type: 'text',
              label: 'Button Text',
              required: true,
            },
            {
              name: 'link',
              type: 'text',
              label: 'Button Link (URL or slug)',
              required: true,
            },
          ],
        },
      ],
    },

    {
      name: 'sectionColor',
      type: 'select',
      label: 'Section Background Color',
      defaultValue: 'bg',
      options: [
        { label: 'Primary', value: 'primary' },
        { label: 'Secondary', value: 'secondary' },
        { label: 'Light Background', value: 'primary' },
        { label: 'Soft Background', value: 'bg-soft' },
        { label: 'Dark Background', value: 'bg-dark' },
      ],
    },

    {
      name: 'sectionBackground',
      type: 'upload',
      relationTo: 'media',
      label: 'Section Background Image',
    },
    {
      name: 'columns',
      type: 'select',
      label: 'Number of Columns',
      defaultValue: '3',
      options: [
        { label: '2 Columns', value: '2' },
        { label: '3 Columns', value: '3' },
        { label: '4 Columns', value: '4' },
      ],
      required: true,
    },

    {
      name: 'delay',
      type: 'number',
      defaultValue: 0,
    },

    {
      name: 'loading',
      type: 'checkbox',
      defaultValue: false,
    },
  ],
};
