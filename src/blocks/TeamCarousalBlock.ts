import { FixedToolbarFeature, HeadingFeature, InlineToolbarFeature, lexicalEditor, LinkFeature, UploadFeature } from '@payloadcms/richtext-lexical';
import type { Block } from 'payload';

export const TeamCarousalBlock: Block = {
  slug: 'teamCarousalBlock',
  labels: {
    singular: 'Team Carousel Block',
    plural: 'Team Carousel Blocks',
  },
  fields: [
    {
      name: 'slides',
      type: 'array',
      required: true,
      minRows: 1,
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },

        {
          name: 'name',
          type: 'text',
          required: true,
        },

        {
          name: 'designation',
          type: 'text',
        },

        {
          name: 'content',
          type: 'richText',
          editor: lexicalEditor({
            features: ({ rootFeatures }) => [...rootFeatures, HeadingFeature(), LinkFeature(), UploadFeature(), FixedToolbarFeature(), InlineToolbarFeature()],
          }),
        },

        {
          name: 'ctaButtons',
          type: 'array',
          label: 'CTA Buttons',
          minRows: 0,
          maxRows: 3,
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
              name: 'newTab',
              type: 'checkbox',
              defaultValue: false,
            },
            {
              name: 'style',
              type: 'select',
              defaultValue: 'primary',
              options: [
                {
                  label: 'Primary',
                  value: 'primary',
                },
                {
                  label: 'Secondary',
                  value: 'secondary',
                },
              ],
            },
          ],
        },
      ],
    },

    {
      name: 'slidesPerMobile',
      type: 'number',
      defaultValue: 1,
    },
    {
      name: 'slidesPerTablet',
      type: 'number',
      defaultValue: 2,
    },
    {
      name: 'slidesPerDesktop',
      type: 'number',
      defaultValue: 3,
    },

    {
      name: 'autoplay',
      type: 'checkbox',
      defaultValue: true,
    },
    {
      name: 'delay',
      type: 'number',
      defaultValue: 3000,
      admin: {
        condition: (_, siblingData) => siblingData.autoplay,
      },
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
