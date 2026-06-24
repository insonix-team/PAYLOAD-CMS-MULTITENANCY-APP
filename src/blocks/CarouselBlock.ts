import { FixedToolbarFeature, HeadingFeature, InlineToolbarFeature, lexicalEditor, LinkFeature, UploadFeature } from '@payloadcms/richtext-lexical';
import type { Block } from 'payload';

export const CarouselBlock: Block = {
  slug: 'carouselBlock',
  imageURL: '/block-thumbnails/carousel.webp',
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
