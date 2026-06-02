import type { Block } from 'payload'

export const HeaderCTA: Block = {
  slug: 'headerCTA',

  labels: {
    singular: 'Header CTA Menu',
    plural: 'Header CTA Menu',
  },

  fields: [
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
    },

    {
      name: 'navItems',
      type: 'array',
      label: 'Navigation Items',
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
        },

        {
          name: 'icon',
          type: 'upload',
          relationTo: 'media',
          label: 'Icon (optional)',
        },

        {
          type: 'row',
          fields: [
            {
              name: 'page',
              type: 'relationship',
              relationTo: 'pages',
              label: 'Link to Page',
            },
            {
              name: 'customUrl',
              type: 'text',
              label: 'External URL',
            },
          ],
        },

        {
          name: 'children',
          type: 'array',
          label: 'Dropdown Items',
          admin: {
            condition: (_, siblingData) => {
              return true
            },
          },
          fields: [
            {
              name: 'label',
              type: 'text',
              required: true,
            },
            {
              name: 'icon',
              type: 'upload',
              relationTo: 'media',
            },

            {
              type: 'row',
              fields: [
                {
                  name: 'page',
                  type: 'relationship',
                  relationTo: 'pages',
                  label: 'Link to Page',
                },
                {
                  name: 'customUrl',
                  type: 'text',
                  label: 'External URL',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      name: 'headerStyle',
      type: 'select',
      required: true,
      defaultValue: 'default',
      options: [
        { label: 'Default Header', value: 'default' },
        { label: 'Modern Header', value: 'modern' },
        { label: 'Centered Header', value: 'centered' },
      ],
    },
    {
      name: 'ctas',
      type: 'array',
      label: 'Header CTAs',
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
        },
        {
          name: 'link',
          type: 'relationship',
          relationTo: 'pages',
        },
        {
          name: 'customUrl',
          type: 'text',
        },
        {
          name: 'style',
          type: 'select',
          defaultValue: 'primary',
          options: [
            { label: 'Primary', value: 'primary' },
            { label: 'Secondary', value: 'secondary' },
            { label: 'Outline', value: 'outline' },
          ],
        },
      ],
    },
  ],
}
