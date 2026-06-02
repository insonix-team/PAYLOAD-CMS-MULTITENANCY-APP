import { Block } from 'payload';

export const FooterBlock: Block = {
  slug: 'footerBlock',

  labels: {
    singular: 'Footer',
    plural: 'Footers',
  },

  fields: [
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
    },

    {
      name: 'description',
      type: 'textarea',
    },

    {
      name: 'copyrightText',
      type: 'text',
      required: true,
    },

    {
      name: 'navigationColumns',
      type: 'array',
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
        },

        {
          name: 'links',
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
      ],
    },

    {
      name: 'socialLinks',
      type: 'array',
      fields: [
        {
          name: 'platform',
          type: 'select',
          options: [
            {
              label: 'Facebook',
              value: 'facebook',
            },
            {
              label: 'Instagram',
              value: 'instagram',
            },
            {
              label: 'Twitter',
              value: 'twitter',
            },
            {
              label: 'LinkedIn',
              value: 'linkedin',
            },
            {
              label: 'YouTube',
              value: 'youtube',
            },
          ],
        },

        {
          name: 'url',
          type: 'text',
          required: true,
        },
      ],
    },

    {
      name: 'backgroundColor',
      type: 'select',
      defaultValue: 'black',
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
          label: 'Gray',
          value: 'gray',
        },
      ],
    },
  ],
};
