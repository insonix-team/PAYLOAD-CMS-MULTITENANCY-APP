import { isSuperAdmin, tenantAccess } from '@/lib/utils'
import { CollectionConfig, CollectionSlug } from 'payload'

const Users: CollectionConfig = {
  slug: 'users',
  auth: true,
  access: {
    create: ({ req }) => {
      if (!req.user) return true
      return !!req.user
    },
    read: tenantAccess,
    update: tenantAccess,
    delete: isSuperAdmin,
  },

  hooks: {
    beforeChange: [
      async ({ data, req, operation }) => {
        if (operation !== 'create') {
          return data
        }

        // Count existing users
        const users = await req.payload.find({
          collection: 'users',
          limit: 1,
        })

        // First user becomes superadmin
        if (users.totalDocs === 0) {
          return {
            ...data,
            role: 'superadmin',
            tenant: undefined,
          }
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
      name: 'role',
      type: 'select',
      defaultValue: 'tenant',
      options: [
        {
          label: 'Super Admin',
          value: 'superadmin',
        },
        {
          label: 'Tenant User',
          value: 'tenant',
        },
      ],

      admin: {
        condition: (_, __, { user }) => {
          return user?.role === 'superadmin'
        },
      },

      hooks: {
        beforeValidate: [
          async ({ req, value }) => {
            // Check if first user
            const users = await req.payload.find({
              collection: 'users',
              limit: 1,
            })

            if (users.totalDocs === 0) {
              return 'superadmin'
            }

            // Non-superadmin users always create tenant users
            if (req.user?.role !== 'superadmin') {
              return 'tenant'
            }

            return value
          },
        ],
      },
    },

    {
      name: 'tenant',

      type: 'relationship',

      relationTo: 'tenants' as CollectionSlug,

      required: false,

      admin: {
        condition: (_, __, { user }) => {
          // Only superadmin can see tenant field
          return user?.role === 'superadmin'
        },
      },

      hooks: {
        beforeValidate: [
          async ({ req, value }) => {
            // Check if first user
            const users = await req.payload.find({
              collection: 'users',
              limit: 1,
            })

            // First superadmin doesn't need tenant
            if (users.totalDocs === 0) {
              return undefined
            }

            // Auto assign tenant for tenant users
            if (req.user?.role !== 'superadmin') {
              const tenant = req.user?.tenant

              return typeof tenant === 'string' ? tenant : tenant?.id
            }

            return value
          },
        ],
      },
    },
  ],
}

export default Users
