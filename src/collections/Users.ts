import { ROLES } from '@/constants/AppOptions';
import { tenantAccess } from '@/lib/utils';
import { CollectionConfig, CollectionSlug } from 'payload';
import { APIError } from 'payload';

const Users: CollectionConfig = {
  slug: 'users',
  auth: true,
  admin: {
    useAsTitle: 'name',
    hidden: ({ user }) => {
      return ![ROLES.SUPERADMIN, ROLES.TENANT].includes(user?.role);
    },
  },
  access: {
    create: tenantAccess,
    read: tenantAccess,
    update: tenantAccess,
    delete: tenantAccess,
  },

  hooks: {
    beforeChange: [
      async ({ data, req, operation }) => {
        if (operation !== 'create') {
          return data;
        }

        const users = await req.payload.find({
          collection: 'users',
          limit: 1,
        });

        if (users.totalDocs === 0) {
          return {
            ...data,
            role: ROLES.SUPERADMIN,
            tenant: undefined,
          };
        }

        return data;
      },
    ],
    beforeDelete: [
      async ({ req, id }) => {
        const user = req.user;
        if (!user) {
          throw new APIError('Not authenticated');
        }
        if (user?.id === id) {
          throw new APIError('You cannot delete your own account');
        }
        if (user?.role === ROLES.SUPERADMIN) {
          return;
        }
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
          label: 'Editor',
          value: ROLES.EDITOR,
        },
      ],

      admin: {
        condition: (_, __, { user }) => {
          return user?.role === ROLES.SUPERADMIN;
        },
      },

      hooks: {
        beforeValidate: [
          async ({ req, value }) => {
            const users = await req.payload.find({
              collection: 'users',
              limit: 1,
            });

            if (users.totalDocs === 0) {
              return ROLES.SUPERADMIN;
            }

            if (req.user?.role === ROLES.TENANT) {
              return ROLES.EDITOR;
            }

            return value;
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
          return user?.role === ROLES.SUPERADMIN;
        },
      },

      hooks: {
        beforeValidate: [
          async ({ req, value }) => {
            const users = await req.payload.find({
              collection: 'users',
              limit: 1,
            });

            if (users.totalDocs === 0) {
              return undefined;
            }

            if (req.user?.role !== ROLES.SUPERADMIN) {
              const tenant = req.user?.tenant;

              return typeof tenant === 'string' ? tenant : tenant?.id;
            }

            return value;
          },
        ],
      },
    },
  ],
};

export default Users;
