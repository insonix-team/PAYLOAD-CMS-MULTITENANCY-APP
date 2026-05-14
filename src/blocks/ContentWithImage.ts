import { Block } from 'payload'

export const ContentWithImage: Block = {
  slug: 'contentWithImage',

  fields: [
    {
      name: 'layoutStyle',
      type: 'select',
      defaultValue: 'side-by-side',
      options: [
        { label: 'Side by Side', value: 'side-by-side' },
        { label: 'Stacked', value: 'stacked' },
        { label: 'Overlay', value: 'overlay' },
      ],
    },

    {
      name: 'imagePosition',
      type: 'select',
      defaultValue: 'left',
      options: [
        { label: 'Left', value: 'left' },
        { label: 'Right', value: 'right' },
      ],
      admin: {
        condition: (_, siblingData) => siblingData.layoutStyle === 'side-by-side',
      },
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
    },

    {
      name: 'isBackgroundImage',
      type: 'checkbox',
      defaultValue: false,
    },
    {
      name: 'theme',
      type: 'select',
      defaultValue: 'light',
      options: [
        { label: 'Light', value: 'light' },
        { label: 'Dark', value: 'dark' },
      ],
    },

    {
      name: 'padding',
      type: 'select',
      defaultValue: 'medium',
      options: [
        { label: 'Small', value: 'small' },
        { label: 'Medium', value: 'medium' },
        { label: 'Large', value: 'large' },
      ],
    },

    {
      name: 'alignment',
      type: 'select',
      defaultValue: 'left',
      options: [
        { label: 'Left', value: 'left' },
        { label: 'Center', value: 'center' },
        { label: 'Right', value: 'right' },
      ],
    },

    {
      name: 'heading',
      type: 'richText',
    },

    {
      name: 'description',
      type: 'richText',
    },

    {
      name: 'buttons',
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
        {
          name: 'variant',
          type: 'select',
          defaultValue: 'primary',
          options: [
            { label: 'Primary', value: 'primary' },
            { label: 'Secondary', value: 'secondary' },
            { label: 'Outline', value: 'outline' },
          ],
        },
        {
          name: 'size',
          type: 'select',
          defaultValue: 'medium',
          options: [
            { label: 'Small', value: 'small' },
            { label: 'Medium', value: 'medium' },
            { label: 'Large', value: 'large' },
          ],
        },
        {
          name: 'openInNewTab',
          type: 'checkbox',
          defaultValue: false,
        },
      ],
    },

    {
      name: 'maxWidth',
      type: 'select',
      defaultValue: 'container',
      options: [
        { label: 'Full Width', value: 'full' },
        { label: 'Container', value: 'container' },
      ],
    },
  ],
}
