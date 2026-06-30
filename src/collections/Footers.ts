import { FooterColumns } from '@/blocks/footers/FooterColumns';
import { FooterNewsletter } from '@/blocks/footers/FooterNewsletter';
import { FooterSimple } from '@/blocks/footers/FooterSimple';
import { ROLES } from '@/constants/AppOptions';
import { superAdminAccess, tenantAccess } from '@/lib/utils';
import { CollectionConfig, CollectionSlug } from 'payload';

const Footers: CollectionConfig = {
  slug: 'footers',
  admin: { useAsTitle: 'name' },
  access: {
    create: superAdminAccess,
    read: tenantAccess,
    update: superAdminAccess,
    delete: superAdminAccess,
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
    { name: 'name', type: 'text', required: true },
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
      blocks: [FooterSimple, FooterColumns, FooterNewsletter],
      required: true,
    },
  ],
};

export default Footers;
