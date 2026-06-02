import { Block } from 'payload';

export const NavigationLinks: Block = {
  slug: 'navigationLinks',

  labels: {
    singular: 'Navigation Links',
    plural: 'Navigation Links',
  },

  fields: [
    {
      name: 'links',
      type: 'array',
      required: true,
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
        {
          name: 'openInNewTab',
          type: 'checkbox',
          defaultValue: false,
        },
      ],
    },
  ],
};
