import { isSuperAdmin } from '@/lib/utils'
import { CollectionConfig } from 'payload'

const Tenants: CollectionConfig = {
  slug: 'tenants',
  admin: {
    useAsTitle: 'name',
    hidden: !isSuperAdmin,
  },
  access: {
    read: isSuperAdmin,
    create: isSuperAdmin,
    update: isSuperAdmin,
    delete: isSuperAdmin,
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
