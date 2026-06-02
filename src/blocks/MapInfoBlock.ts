import { Block } from 'payload'

export const MapInfoBlock: Block = {
  slug: 'mapInfoBlock',
  interfaceName: 'MapInfoBlockType',
  labels: {
    singular: 'Map + Info Block',
    plural: 'Map + Info Blocks',
  },

  fields: [
    {
      name: 'title',
      type: 'text',
      required: false,
    },
    {
      name: 'address',
      type: 'textarea',
      required: true,
      admin: {
        description: 'Full clinic address',
      },
    },
    {
      name: 'googleMapLink',
      type: 'text',
      required: true,
      admin: {
        description: 'Google Maps direct link (used for the Location button)',
      },
    },
    {
      name: 'mapEmbedUrl',
      type: 'text',
      required: true,
      admin: {
        description: 'Google Maps Embed iframe URL',
      },
    },
    {
      name: 'phone',
      type: 'text',
      required: true,
    },
    {
      name: 'email',
      type: 'text',
      required: true,
    },

    {
      type: 'row',
      fields: [
        {
          name: 'parking',
          type: 'checkbox',
          label: 'Parking Available',
        },
        {
          name: 'accessibility',
          type: 'checkbox',
          label: 'Wheelchair Accessible',
        },
      ],
    },

    {
      name: 'officeHoursSection',
      type: 'group',
      label: 'Office Hours Section',

      fields: [
        {
          name: 'officetitle',
          type: 'text',
          label: 'Section Title',
          required: true,
        },

        {
          name: 'officeHours',
          type: 'array',
          label: 'Office Hours',
          labels: {
            singular: 'Office Hour',
            plural: 'Office Hours',
          },
          fields: [
            {
              name: 'day',
              type: 'text',
              label: 'Day',
              required: true,
            },
            {
              name: 'time',
              type: 'text',
              label: 'Time',
              required: true,
            },
          ],
        },
      ],
    },
  ],
}
