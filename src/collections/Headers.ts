import { CollectionConfig, CollectionSlug } from 'payload';

import { HeaderCentered } from '@/blocks/headers/HeaderCentered';
import { HeaderCTA } from '@/blocks/headers/HeaderCTA';
import { HeaderSimple } from '@/blocks/headers/HeaderSimple';
import { ROLES } from '@/constants/AppOptions';
import { tenantAccess } from '@/lib/utils';

const Headers: CollectionConfig = {
  slug: 'headers',

  admin: {
    useAsTitle: 'name',
  },

  access: {
    create: tenantAccess,
    read: tenantAccess,
    update: tenantAccess,
    delete: tenantAccess,
  },

  hooks: {
    beforeValidate: [
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ({ req, data }: any) => {
        if (req.user?.role !== ROLES.SUPERADMIN && req.user?.tenant) {
          data.tenant = typeof req.user.tenant === 'object' ? req.user.tenant.id : req.user.tenant;
        }

        return data;
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
          return user?.role === ROLES.SUPERADMIN;
        },
      },
    },

    {
      name: 'layout',
      type: 'blocks',
      blocks: [HeaderSimple, HeaderCentered, HeaderCTA],
      required: true,
    },
  ],
};

export default Headers;
