import { Block } from 'payload';

export const StepPocessBlock: Block = {
  slug: 'stepPocessBlock',

  labels: {
    singular: 'Step Process Box',
    plural: 'Step Process Boxes',
  },

  fields: [
    // Section Content
    {
      name: 'heading',
      label: 'Section Title',
      type: 'text',
      required: true,
    },
    {
      name: 'subtitle',
      label: 'Section Subtitle',
      type: 'textarea',
    },

    // Background Image
    {
      name: 'backgroundImage',
      label: 'Background Image',
      type: 'upload',
      relationTo: 'media',
    },

    // Layout
    {
      name: 'columns',
      label: 'Columns Layout',
      type: 'select',
      defaultValue: '4',
      options: [
        {
          label: '2 Columns',
          value: '2',
        },
        {
          label: '3 Columns',
          value: '3',
        },
        {
          label: '4 Columns',
          value: '4',
        },
      ],
    },

    // Cards Repeater
    {
      name: 'cards',
      label: 'Feature Cards',
      type: 'array',
      minRows: 1,
      fields: [
        {
          name: 'title',
          label: 'Card Title',
          type: 'text',
          required: true,
        },
        {
          name: 'description',
          label: 'Card Description',
          type: 'textarea',
        },
        {
          name: 'icon',
          label: 'Icon Image',
          type: 'upload',
          relationTo: 'media',
        },
        {
          name: 'svg_icon',
          label: 'SVG Icon',
          type: 'textarea',
          admin: {
            description: 'Paste SVG code here (optional)',
          },
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
