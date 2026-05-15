import { CollectionConfig, CollectionSlug } from 'payload'

import { HeaderSimple } from '@/blocks/headers/HeaderSimple'
import { HeaderCentered } from '@/blocks/headers/HeaderCentered'

const Headers: CollectionConfig = {
  slug: 'headers',

  admin: {
    useAsTitle: 'name',
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
      },
    },

    {
      name: 'layout',
      type: 'blocks',
      blocks: [HeaderSimple, HeaderCentered],
      required: true,
    },
  ],
}

export default Headers
