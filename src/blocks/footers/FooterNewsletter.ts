import type { Block } from 'payload'

export const FooterNewsletter: Block = {
  slug: 'footerNewsletter',
  labels: {
    singular: 'Footer News Letter',
    plural: 'Footer News Letters',
  },


  fields: [
    {
      type: 'tabs',
      tabs: [
        // --------------------------------------------------------------------
        // GENERAL SETTINGS
        // --------------------------------------------------------------------
        {
          label: 'General',
          fields: [
            {
              name: 'enableI18n',
              type: 'checkbox',
              label: 'Enable Multi-language Footer',
              defaultValue: false,
            },
            {
              name: 'backgroundImage',
              type: 'upload',
              relationTo: 'media',
              label: 'Background Image',
              required: false,
            },
            {
              name: 'description',
              type: 'textarea',
              label: 'Footer Description',
            },
            {
              name: 'ctaButton',
              label: 'CTA Button',
              type: 'group',
              fields: [
                {
                  name: 'text',
                  type: 'text',
                  label: 'Button Text',
                },
                {
                  name: 'link',
                  type: 'relationship',
                  relationTo: 'pages',
                  label: 'Internal Page Link',
                },
              ],
            },
          ],
        },

        // --------------------------------------------------------------------
        // SOCIAL MEDIA
        // --------------------------------------------------------------------
        {
          label: 'Social Media',
          fields: [
            {
              name: 'socialLinks',
              type: 'array',
              labels: { singular: 'Social Link', plural: 'Social Links' },
              fields: [
                {
                  name: 'platform',
                  type: 'select',
                  options: [
                    { label: 'Facebook', value: 'facebook' },
                    { label: 'Instagram', value: 'instagram' },
                    { label: 'Twitter/X', value: 'twitter' },
                    { label: 'LinkedIn', value: 'linkedin' },
                    { label: 'YouTube', value: 'youtube' },
                  ],
                },
                {
                  name: 'url',
                  type: 'text',
                  required: true,
                },
              ],
            },
          ],
        },

        // --------------------------------------------------------------------
        // OPENING HOURS
        // --------------------------------------------------------------------
        {
          label: 'Opening Hours',
          fields: [
            {
              name: 'hours',
              type: 'array',
              label: 'Opening Hours',
              minRows: 1,
              fields: [
                {
                  name: 'day',
                  type: 'text',
                },
                {
                  name: 'time',
                  type: 'text',
                },
              ],
            },
          ],
        },

        // --------------------------------------------------------------------
        // MAP EMBED
        // --------------------------------------------------------------------
        {
          label: 'Map',
          fields: [
            {
              name: 'mapEmbed',
              type: 'code',
              label: 'Embed Code (Google Maps / HERE / custom)',
              required: false,
              admin: { language: 'html' },
            },
          ],
        },
      ],
    },
  ],
}
