import { Block } from 'payload';

export const CtaBlock: Block = {
  slug: 'cta',
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
    },
    {
      name: 'buttonText',
      type: 'text',
      required: true,
    },
    {
      name: 'buttonLink',
      type: 'text',
      required: true,
    },
    {
      name: 'backgroundColor',
      type: 'select',
      options: [
        { label: 'Primary', value: 'primary' },
        { label: 'Secondary', value: 'secondary' },
        { label: 'Dark', value: 'dark' },
      ],
      defaultValue: 'primary',
    },
  ],
};
