import { Block } from 'payload';

export const HeroBlock: Block = {
  slug: 'hero',
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'subtitle',
      type: 'textarea',
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: false,
    },
    {
      name: 'ctaText',
      type: 'text',
    },
    {
      name: 'ctaLink',
      type: 'text',
    },
    {
      name: 'alignment',
      type: 'select',
      options: [
        { label: 'Left', value: 'left' },
        { label: 'Center', value: 'center' },
        { label: 'Right', value: 'right' },
      ],
      defaultValue: 'center',
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
