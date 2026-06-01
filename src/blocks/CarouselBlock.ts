import type { Block } from 'payload'
import { FixedToolbarFeature, InlineToolbarFeature, lexicalEditor } from '@payloadcms/richtext-lexical'
import { HeadingFeature, LinkFeature, UploadFeature } from '@payloadcms/richtext-lexical'

export const CarouselBlock: Block = {
  slug: 'carouselBlock',
  labels: {
    singular: 'Carousel Slider Block',
    plural: 'Carousel Slider Blocks',
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
          name: 'content',
          type: 'richText',
          editor: lexicalEditor({
            features: ({ rootFeatures }) => [...rootFeatures, HeadingFeature(), LinkFeature(), UploadFeature(), FixedToolbarFeature(), InlineToolbarFeature()],
          }),
        },
      ],
    },

    // ✅ responsive CMS control
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

    // autoplay
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
  ],
}
