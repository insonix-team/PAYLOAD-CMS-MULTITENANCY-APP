import { ROLES } from '@/constants/AppOptions'
import { isSuperAdmin, tenantAccess } from '@/lib/utils'
import { CollectionConfig, CollectionSlug } from 'payload'

const Users: CollectionConfig = {
  slug: 'users',
  auth: true,
  admin: {
    useAsTitle: 'name',
    hidden: ({ user }) => {
      return ![ROLES.SUPERADMIN, ROLES.TENANT].includes(user?.role)
    },
  },
  access: {
    create: ({ req }) => {
      if (!req.user) return true
      return !!req.user
    },
    read: tenantAccess,
    update: tenantAccess,
    delete: tenantAccess,
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
            role: ROLES.SUPERADMIN,
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
          value: ROLES.SUPERADMIN,
        },
        {
          label: 'Tenant User',
          value: ROLES.TENANT,
        },
        {
          label: 'Designer',
          value: ROLES.DESIGNER,
        },
      ],

      admin: {
        condition: (_, __, { user }) => {
          return user?.role === ROLES.SUPERADMIN
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
              return ROLES.SUPERADMIN
            }

            if (req.user?.role === ROLES.TENANT) {
              return ROLES.DESIGNER
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
          return user?.role === ROLES.SUPERADMIN
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
              return undefined
            }

            // Auto assign tenant for tenant users
            if (req.user?.role !== ROLES.SUPERADMIN) {
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
