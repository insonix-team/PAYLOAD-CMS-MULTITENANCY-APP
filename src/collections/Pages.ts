import { CardsBlock } from '@/blocks/Cards'
import { ContactForm } from '@/blocks/ContactForm'
import { Content } from '@/blocks/Content'
import { ContentWithImage } from '@/blocks/ContentWithImage'
import { CTABlock } from '@/blocks/CTA'
import { FAQBlock } from '@/blocks/FAQ'
import { Hero } from '@/blocks/Hero'
import { ImageBlock } from '@/blocks/Image'
import { ListBlock } from '@/blocks/Lists'
import { TestimonialsBlock } from '@/blocks/Testimonials'
import { TextBlock } from '@/blocks/Text'
import { addTenant } from '@/hooks/addTenant'
import { CollectionConfig, CollectionSlug } from 'payload'

const Pages: CollectionConfig = {
  slug: 'pages',

  // ✅ Automatically attach tenant
  hooks: {
    beforeChange: [addTenant],
  },

  // ✅ FIXED ACCESS CONTROL
  access: {
    read: ({ req }) => {
      // 🔓 Allow public (frontend access)
      if (!req.user) return true

      // 👑 Super Admin → full access
      if (req.user.role === 'superadmin') return true

      // 🏢 Tenant Users → only their data
      return {
        tenant: {
          equals: req.user.tenant,
        },
      }
    },

    create: ({ req }) => {
      if (req.user?.role === 'superadmin') return true
      return !!req.user
    },

    update: ({ req }) => {
      if (req.user?.role === 'superadmin') return true

      return {
        tenant: {
          equals: req.user?.tenant,
        },
      }
    },

    delete: ({ req }) => {
      if (req.user?.role === 'superadmin') return true

      return {
        tenant: {
          equals: req.user?.tenant,
        },
      }
    },
  },

  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },

    {
      name: 'slug',
      type: 'text',
      required: true,
      index: true,
    },

    {
      name: 'layout',
      type: 'blocks',
      blocks: [
        Hero,
        Content,
        ContactForm,
        ContentWithImage,
        TextBlock,
        ImageBlock,
        TestimonialsBlock,
        CTABlock,
        ListBlock,
        FAQBlock,
        CardsBlock,
      ],
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
  ],
}

export default Pages
