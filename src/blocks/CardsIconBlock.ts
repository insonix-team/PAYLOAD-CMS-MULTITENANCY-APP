import type { Block } from 'payload'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import {
  HeadingFeature,
  FixedToolbarFeature,
  InlineToolbarFeature,
} from '@payloadcms/richtext-lexical'

export const CardsWithIcons: Block = {
  slug: 'cardsWithIcons',
  interfaceName: 'CardsWithIcons',

  fields: [
    {
      name: 'blockHeading',
      type: 'text',
      required: true,
    },

    {
      name: 'columns',
      type: 'number',
      label: 'Number of Columns',
      defaultValue: 3,
      min: 1,
      max: 4,
    },

    {
      name: 'cards',
      type: 'array',
      required: true,
      fields: [
        {
          name: 'icon',
          type: 'relationship',
          relationTo: 'media',
          label: 'Icon (SVG/PNG)',
        },

        {
          name: 'title',
          type: 'text',
          required: true,
        },

        {
          name: 'description',
          type: 'richText',
          editor: lexicalEditor({
            features: ({ rootFeatures }) => [
              ...rootFeatures,
              HeadingFeature(),
              FixedToolbarFeature(),
              InlineToolbarFeature(),
            ],
          }),
        },

        // 🎨 Theme Gradient Colors (START)
        {
          name: 'gradientFrom',
          type: 'select',
          label: 'Gradient From (Theme Color)',
          defaultValue: 'primary',
          options: [
            { label: 'Primary', value: 'primary' },
            { label: 'Secondary', value: 'secondary' },
            { label: 'Gray', value: 'gray' },
            { label: 'White', value: 'white' },
          ],
        },

        // 🎨 Theme Gradient Colors (END)
        {
          name: 'gradientTo',
          type: 'select',
          label: 'Gradient To (Theme Color)',
          defaultValue: 'secondary',
          options: [
            { label: 'Primary', value: 'primary' },
            { label: 'Secondary', value: 'secondary' },
            { label: 'Gray', value: 'gray' },
            { label: 'White', value: 'white' },
          ],
        },

        // 🌈 Gradient Direction
        {
          name: 'gradientDirection',
          type: 'select',
          label: 'Gradient Direction',
          defaultValue: 'to-r',
          options: [
            { label: 'Left → Right', value: 'to-r' },
            { label: 'Right → Left', value: 'to-l' },
            { label: 'Top → Bottom', value: 'to-b' },
            { label: 'Bottom → Top', value: 'to-t' },
            { label: 'Radial', value: 'radial' },
          ],
        },

        // 🎛 Optional solid fallback (no picker, only theme)
        {
          name: 'solidBg',
          type: 'select',
          label: 'Solid Background (Fallback)',
          defaultValue: 'white',
          options: [
            { label: 'White', value: 'white' },
            { label: 'Primary', value: 'primary' },
            { label: 'Secondary', value: 'secondary' },
            { label: 'Gray', value: 'gray' },
          ],
        },
      ],
    },
  ],
}
