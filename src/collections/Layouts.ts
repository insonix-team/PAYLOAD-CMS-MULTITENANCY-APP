import { CollectionConfig } from 'payload'
import { HeaderBlock } from '../blocks/Header'
import { FooterBlock } from '../blocks/Footer'
import { addTenant } from '../hooks/addTenant'

export const Layouts: CollectionConfig = {
  slug: 'layouts',

  access: {
    read: ({ req }) => {
      if (req.user?.role === 'superadmin') return true

      return {
        tenant: {
          equals: req.user?.tenant,
        },
      }
    },

    create: ({ req }) => {
      return !!req.user
    },

    update: ({ req }) => {
      if (req.user?.role === 'superadmin') return true

      return {
        tenant: {
          equals: req.user?.tenant,
        },
      }
    },

    delete: ({ req }) => {
      if (req.user?.role === 'superadmin') return true

      return {
        tenant: {
          equals: req.user?.tenant,
        },
      }
    },
  },

  hooks: {
    beforeChange: [addTenant],
  },

  fields: [
    {
      name: 'type',
      type: 'select',
      required: true,
      options: [
        { label: 'Header', value: 'header' },
        { label: 'Footer', value: 'footer' },
      ],
    },

    {
      name: 'layout',
      type: 'blocks',
      blocks: [HeaderBlock, FooterBlock],
      required: true,
    },

    {
      name: 'tenant',
      type: 'relationship',
      relationTo: 'tenants',
      required: true,

      admin: {
        condition: (_, { user }) => user?.role === 'superadmin',
      },
    },
  ],
}
