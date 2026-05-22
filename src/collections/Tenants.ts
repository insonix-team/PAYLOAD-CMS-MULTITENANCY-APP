import { CollectionConfig } from 'payload'

const Tenants: CollectionConfig = {
  slug: 'tenants',
  admin: { useAsTitle: 'name' },
  access: {
    read: ({ req: { user } }) => true,
    create: ({ req: { user } }) => user?.role === 'superadmin',
    update: ({ req: { user } }) => user?.role === 'superadmin',
    delete: ({ req: { user } }) => user?.role === 'superadmin',
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
      required: false,
    },
    {
      name: 'smtpPassword',
      type: 'text',
      required: false,
    },
    {
      name: 'domain',
      type: 'text',
      required: false,
      // unique: true,
    },
    {
      name: 'theme',
      type: 'text',
      defaultValue: 'blue',
      admin: {
        components: {
          Field: 'src/components/admin/ThemeSelector',
        },
        description: 'Select UI theme for this tenant',
      },
    },
  ],
}

export default Tenants
