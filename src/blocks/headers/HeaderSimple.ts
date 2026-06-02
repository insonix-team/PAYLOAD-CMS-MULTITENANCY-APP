import { Block } from 'payload';

export const HeaderSimple: Block = {
  slug: 'headerSimple',

  labels: {
    singular: 'Simple Header',
    plural: 'Simple Headers',
  },

  fields: [
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
    },

    {
      name: 'menuItems',
      type: 'array',
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
        },
        {
          name: 'url',
          type: 'text',
          required: true,
        },
      ],
    },

    {
      name: 'showButton',
      type: 'checkbox',
      defaultValue: false,
    },

    {
      name: 'buttonLabel',
      type: 'text',
      admin: {
        condition: (_, siblingData) => siblingData.showButton,
      },
    },
  ],
};
