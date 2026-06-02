import { Block } from 'payload';

export const HeaderCentered: Block = {
  slug: 'headerCentered',

  labels: {
    singular: 'Centered Header',
    plural: 'Centered Headers',
  },

  fields: [
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
    },

    {
      name: 'announcementText',
      type: 'text',
    },

    {
      name: 'menuItems',
      type: 'array',
      fields: [
        {
          name: 'label',
          type: 'text',
        },
        {
          name: 'url',
          type: 'text',
        },
      ],
    },
  ],
};
