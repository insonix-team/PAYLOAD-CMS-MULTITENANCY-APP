import type { CollectionConfig } from 'payload';
import { ROLES } from '@/constants/AppOptions';
import { tenantAccess } from '@/lib/utils';

export const Media: CollectionConfig = {
  slug: 'media',
  access: {
    create: tenantAccess,
    read: tenantAccess,
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
      required: true,
      admin: {
        position: 'sidebar',
        condition: (_, __, { user }) => {
          return user?.role === ROLES.SUPERADMIN;
        },
      },
      defaultValue: ({ user }) => {
        if (user?.tenant) {
          return user.tenant;
        }
        return undefined;
      },
    },
  ],
  upload: true,
  // Add hooks to ensure tenant is set correctly
  hooks: {
    beforeChange: [
      ({ data, req: { user } }) => {
        if (user?.tenant && user?.role !== ROLES.SUPERADMIN) {
          data.tenant = user.tenant;
        }
        return data;
      },
    ],
  },
};
