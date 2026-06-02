import { COLOR_OPTIONS, FONT_FAMILY_OPTIONS, ROLES } from '@/constants/AppOptions'
import { CollectionConfig } from 'payload'

const Tenants: CollectionConfig = {
  slug: 'tenants',

  admin: {
    useAsTitle: 'name',
    hidden: ({ user }) => {
      return user?.role !== ROLES.SUPERADMIN
    },
  },

  access: {
    read: ({ req: { user } }) => user?.role === ROLES.SUPERADMIN,
    create: ({ req: { user } }) => user?.role === ROLES.SUPERADMIN,
    update: ({ req: { user } }) => user?.role === ROLES.SUPERADMIN,
    delete: ({ req: { user } }) => user?.role === ROLES.SUPERADMIN,
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
}

export default Tenants
