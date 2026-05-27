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

    // ⭐ NAVIGATION
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

        // 🌟 Optional Icon for main item
        {
          name: 'icon',
          type: 'upload',
          relationTo: 'media',
          label: 'Icon (optional)',
        },

        // 🌐 Link Options
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

        // 🌟 DROPDOWN CHILDREN
        {
          name: 'children',
          type: 'array',
          label: 'Dropdown Items',
          admin: {
            condition: (_, siblingData) => true, // always show
          },
          fields: [
            {
              name: 'label',
              type: 'text',
              required: true,
            },

            // child icon
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

    // ⭐ HEADER STYLE
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

    // ⭐ DYNAMIC CTA BUTTONS
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
