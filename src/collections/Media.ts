import type { CollectionConfig } from 'payload';
import { ROLES } from '@/constants/AppOptions';
import { tenantAccess } from '@/lib/utils';

export const Media: CollectionConfig = {
  slug: 'media',
  admin: {
    defaultColumns: ['filename', 'alt', 'tenantName', 'createdAt'],
  },
  access: {
    read: ({ req: { user } }) => {
      if (!user) return true;
      if (user?.role === ROLES.SUPERADMIN) return true;

      const tenantId = typeof user.tenant === 'object' ? user?.tenant?.id : user.tenant;
      return {
        or: [
          { tenant: { equals: tenantId } },
          { tenant: { equals: null } },
          { tenant: { exists: false } },
        ],
      };
    },
    create: tenantAccess,
    update: tenantAccess,
    delete: tenantAccess,
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
    },
    {
      name: 'tenant',
      type: 'relationship',
      relationTo: 'tenants',
      required: false,
      admin: {
        position: 'sidebar',
        condition: (_, __, { user }) => {
          return user?.role === ROLES.SUPERADMIN;
        },
      },
      defaultValue: ({ user }) => {
        if (user?.tenant && user?.role !== ROLES.SUPERADMIN) {
          return typeof user.tenant === 'object' ? user.tenant.id : user.tenant;
        }
        return undefined;
      },
    },
    {
      name: 'tenantName',
      type: 'text',
      admin: {
        readOnly: true,
        hidden: true,
      },
      hooks: {
        afterRead: [
          async ({ data, req }) => {
            if (!data?.tenant) {
              return 'Super Admin';
            }
            if (typeof data.tenant === 'string' && req?.payload) {
              try {
                const tenant = await req.payload.findByID({
                  collection: 'tenants',
                  id: data.tenant,
                });
                return tenant?.name || data.tenant;
              } catch (error) {
                console.error('Error fetching tenant:', error);
              }
            }

            return 'unknown tenant';
          },
        ],
      },
    },
  ],
  upload: true,
  // Add hooks to ensure tenant is set correctly
  hooks: {
    beforeChange: [
      ({ data, req: { user } }) => {
        if (user?.tenant && user?.role !== ROLES.SUPERADMIN) {
          data.tenant = typeof user.tenant === 'object' ? user.tenant.id : user.tenant;
        }
        return data;
      },
    ],
  },
};
