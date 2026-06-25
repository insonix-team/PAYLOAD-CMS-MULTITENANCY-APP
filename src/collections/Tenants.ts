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
      access: {
        read: ({ req: { user } }) => {
          if (!user) return false;
          return user.role === ROLES.SUPERADMIN || user.role === ROLES.TENANT;
        },
        create: ({ req: { user } }) => user?.role === ROLES.SUPERADMIN,
        update: ({ req: { user } }) => user?.role === ROLES.SUPERADMIN,
      },
      admin: {
        description: 'Note: only Administrators can change this.',
      },
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
      access: {
        read: ({ req: { user } }) => {
          if (!user) return false;
          return user.role === ROLES.SUPERADMIN || user.role === ROLES.TENANT;
        },
        create: ({ req: { user } }) => user?.role === ROLES.SUPERADMIN,
        update: ({ req: { user } }) => user?.role === ROLES.SUPERADMIN,
      },
      admin: {
        description: 'Note: only Administrators can change this.',
      },
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
    {
      name: 'gaClientEmail',
      type: 'text',
      label: 'GA Client Email',
      admin: {
        description: 'Google Analytics service account client email',
        placeholder: 'your-service-account@project.iam.gserviceaccount.com',
      },
    },
    {
      name: 'gaPrivateKey',
      type: 'text',
      label: 'GA Private Key',
      admin: {
        description: 'Google Analytics service account private key',
        placeholder: '-----BEGIN PRIVATE KEY-----',
      },
    },
    {
      name: 'gaPropertyId',
      type: 'text',
      label: 'GA Property ID',
      admin: {
        description: 'Google Analytics property ID',
        placeholder: '123456789',
      },
    },
    {
      name: 'gaProjectId',
      type: 'text',
      label: 'GA Project ID',
      admin: {
        description: 'Google Analytics project ID',
        placeholder: 'your-project-id',
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
