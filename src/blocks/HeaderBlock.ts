import { Block } from 'payload';

export const HeaderBlock: Block = {
  slug: 'headerBlock',

  labels: {
    singular: 'Header',
    plural: 'Headers',
  },

  fields: [
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
    },

    {
      name: 'siteTitle',
      type: 'text',
      required: true,
    },

    {
      name: 'showSearch',
      type: 'checkbox',
      defaultValue: false,
    },

    {
      name: 'showLoginButton',
      type: 'checkbox',
      defaultValue: false,
    },

    {
      name: 'navigation',
      type: 'blocks',
      blocks: [],
    },

    {
      name: 'stickyHeader',
      type: 'checkbox',
      defaultValue: true,
    },

    {
      name: 'backgroundColor',
      type: 'select',
      defaultValue: 'white',
      options: [
        {
          label: 'White',
          value: 'white',
        },
        {
          label: 'Black',
          value: 'black',
        },
        {
          label: 'Primary',
          value: 'primary',
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
