import { Block } from 'payload'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { HeadingFeature, LinkFeature, UploadFeature } from '@payloadcms/richtext-lexical'

export const MediaBlockContent: Block = {
  slug: 'mediaBlockcontent',
  imageURL: '/block-thumbnails/content-with-image.png',
  labels: {
    singular: 'Media Block Content',
    plural: 'Media Blocks Content',
  },

  fields: [
    {
      name: 'media',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },

    {
      name: 'imageName',
      type: 'text',
      label: 'Image Name',
      required: false,
    },

    {
      name: 'imageShortDescription',
      type: 'text',
      label: 'Image Short Description',
      required: false,
    },

    {
      name: 'availabilityText',
      type: 'text',
      label: 'Availability Text',
      required: false,
    },

    {
      name: 'relatedText',
      type: 'text',
      label: 'Related Text',
      required: false,
    },

    {
      name: 'position',
      type: 'select',
      required: true,
      defaultValue: 'left',
      options: [
        { label: 'Left', value: 'left' },
        { label: 'Right', value: 'right' },
      ],
    },

    {
      name: 'content',
      type: 'richText',
      editor: lexicalEditor({
        features: ({ rootFeatures }) => [...rootFeatures, HeadingFeature(), LinkFeature(), UploadFeature()],
      }),
    },

    {
      name: 'backgroundColor',
      type: 'select',
      defaultValue: 'white',
      options: [
        { label: 'White', value: 'white' },
        { label: 'Light Gray', value: 'bg-card' },
      ],
    },

    {
      name: 'padding',
      type: 'select',
      defaultValue: 'lg',
      options: [
        { label: 'Small', value: 'sm' },
        { label: 'Medium', value: 'md' },
        { label: 'Large', value: 'lg' },
      ],
    },
  ],
}
