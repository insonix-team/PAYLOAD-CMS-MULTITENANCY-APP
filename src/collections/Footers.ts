import { CollectionConfig, CollectionSlug } from 'payload'

import { FooterSimple } from '@/blocks/footers/FooterSimple'
import { FooterColumns } from '@/blocks/footers/FooterColumns'
import { FooterNewsletter } from '@/blocks/footers/FooterNewsletter'

const Footers: CollectionConfig = {
  slug: 'footers',

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
      blocks: [FooterSimple, FooterColumns, FooterNewsletter],
      required: true,
    },
  ],
}

export default Footers
