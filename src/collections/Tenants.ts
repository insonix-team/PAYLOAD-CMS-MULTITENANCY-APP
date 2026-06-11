import { COLOR_OPTIONS, FONT_FAMILY_OPTIONS, ROLES } from '@/constants/AppOptions';
import { CollectionConfig } from 'payload';

const Tenants: CollectionConfig = {
  slug: 'tenants',

  admin: {
    useAsTitle: 'name',
    hidden: ({ user }) => {
      return user?.role !== ROLES.SUPERADMIN && user?.role !== ROLES.TENANT;
    },
  },

  access: {
    read: ({ req: { user } }) => {
      if (!user) return false;

      // Super admin can see all
      if (user.role === ROLES.SUPERADMIN) return true;

      // Tenant admin can only see their own
      if (user.role === ROLES.TENANT) {
        return {
          id: {
            equals: typeof user.tenant === 'object' ? user.tenant?.id : user.tenant,
          },
        };
      }

      return false;
    },

    create: ({ req: { user } }) => {
      // Only super admin can create tenants
      return user?.role === ROLES.SUPERADMIN;
    },

    update: ({ req: { user } }) => {
      if (!user) return false;

      // Super admin can update any
      if (user.role === ROLES.SUPERADMIN) return true;

      // Tenant admin can only update their own
      if (user.role === ROLES.TENANT) {
        return {
          id: {
            equals: typeof user.tenant === 'object' ? user.tenant?.id : user.tenant,
          },
        };
      }

      return false;
    },

    delete: ({ req: { user } }) => {
      // Only super admin can delete
      return user?.role === ROLES.SUPERADMIN;
    },
  },

  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
    },
    {
      name: 'smtpUser',
      type: 'text',
    },
    {
      name: 'smtpPassword',
      type: 'text',
    },
    {
      name: 'domain',
      type: 'text',
    },

    {
      name: 'primaryColor',
      label: 'Primary Color',
      type: 'select',
      defaultValue: 'blue',
      options: COLOR_OPTIONS,
    },
    {
      name: 'secondaryColor',
      label: 'Secondary Color',
      type: 'select',
      defaultValue: 'gray',
      options: COLOR_OPTIONS,
    },
    {
      name: 'fontFamily',
      label: 'Font Family',
      type: 'select',
      defaultValue: 'Inter',
      options: FONT_FAMILY_OPTIONS,
    },
    {
      name: 'googleAnalyticsId',
      type: 'text',
      label: 'Google Analytics Measurement ID',
      admin: {
        description: 'Enter GA4 Measurement ID (e.g., G-XXXXXXXXXX)',
        placeholder: 'G-XXXXXXXXXX',
      },
    },

    // {
    //   name: 'theme',
    //   type: 'text',
    //   defaultValue: 'blue',
    //   admin: {
    //     components: {
    //       Field: '@/components/admin/ThemeSelector',
    //     },
    //     description: 'Select UI theme for this tenant',
    //   },
    // },
  ],
};

export default Tenants;
