import { CollectionConfig, CollectionSlug } from 'payload'
import { FooterColumns } from '@/blocks/footers/FooterColumns'
import { FooterNewsletter } from '@/blocks/footers/FooterNewsletter'
import { FooterSimple } from '@/blocks/footers/FooterSimple'

const Footers: CollectionConfig = {
  slug: 'footers',

  admin: {
    useAsTitle: 'name',
  },

  access: {
    read: ({ req: { user } }) => {
      if (user?.role === 'superadmin') {
        return true
      }

      return {
        tenant: {
          equals: user?.tenant,
        },
      }
    },

    create: ({ req: { user } }) => !!user,

    update: ({ req: { user } }) => {
      if (user?.role === 'superadmin') {
        return true
      }

      return {
        tenant: {
          equals: user?.tenant,
        },
      }
    },

    delete: ({ req: { user } }) => {
      if (user?.role === 'superadmin') {
        return true
      }

      return {
        tenant: {
          equals: user?.tenant,
        },
      }
    },
  },

  hooks: {
    beforeValidate: [
      ({ req, data }: any) => {
        if (req.user?.role !== 'superadmin' && req.user?.tenant) {
          data.tenant = typeof req.user.tenant === 'object' ? req.user.tenant.id : req.user.tenant
        }

        return data
      },
    ],
  },

  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },

    {
      name: 'tenant',
      type: 'relationship',
      relationTo: 'tenants' as CollectionSlug,
      required: true,
      admin: {
        position: 'sidebar',
        condition: (_, __, { user }) => {
          return user?.role === 'superadmin'
        },
      },
    },

    {
      name: 'layout',
      type: 'blocks',
      blocks: [FooterSimple, FooterColumns, FooterNewsletter],
      required: true,
    },
  ],
}

export default Footers
