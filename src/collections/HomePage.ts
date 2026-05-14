// collections/HomePage.ts
import { ContentBlock } from '@/template-blocks/ContentBlock'
import { CtaBlock } from '@/template-blocks/CtaBlock'
import { FeaturesBlock } from '@/template-blocks/FeaturesBlock'
import { HeroBlock } from '@/template-blocks/HeroBlock'
import type { CollectionConfig } from 'payload'

export const HomePage: CollectionConfig = {
  slug: 'home-page',
  admin: {
    useAsTitle: 'title',
    group: 'Pages',
  },
  labels: {
    singular: 'Home Page',
    // plural: 'Home Pages',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
    },
    {
      name: 'template',
      type: 'relationship',
      relationTo: 'home-templates' as any,
      required: false,
      admin: {
        description: 'Select a template for your home page (content will populate after save)',
      },
    },
    {
      name: 'content',
      type: 'blocks',
      admin: {
        condition: (data, siblingData) => {
          // Only show blocks if template is selected
          return !!siblingData?.template
        },
      },
      blocks: [HeroBlock, FeaturesBlock, ContentBlock, CtaBlock],
    },
  ],
  hooks: {
    beforeChange: [
      async ({ req, data, operation, originalDoc }) => {
        // Only apply template logic when template is NEW or CHANGED
        const isTemplateChanged = data.template && data.template !== originalDoc?.template

        if (isTemplateChanged) {
          const template: any = await req.payload.findByID({
            collection: 'home-templates' as any,
            id: data.template,
          })

          if (template) {
            // Copy template blocks
            data.content = template.blocks?.map((block: any) => {
              const cleanedBlock = { ...block }

              // Only nullify for NEW documents or when template JUST changed
              // But preserve existing data if it exists
              if (operation === 'create') {
                // On create: set all upload fields to null
                if ('image' in cleanedBlock) {
                  cleanedBlock.image = null
                }
              } else if (operation === 'update' && isTemplateChanged) {
                // On update with template change: only nullify fields that don't have existing values
                // Find existing block if it exists
                const existingBlock = originalDoc?.content?.find(
                  (b: any) => b.id === block.id || b.blockType === block.blockType,
                )

                if ('image' in cleanedBlock) {
                  // Keep existing image if present, otherwise set to null
                  cleanedBlock.image = existingBlock?.image || null
                }
              }

              return cleanedBlock
            })
          }
        }

        // Preserve existing content when updating other fields
        if (
          operation === 'update' &&
          originalDoc?.content &&
          data.template === originalDoc?.template
        ) {
          data.content = originalDoc.content
        }

        return data
      },
    ],
  },
  access: {
    read: ({ req: { user } }) => {
      if (user?.role === 'superadmin') return true
      if (user?.tenant) {
        return {
          tenant: {
            equals: user.tenant,
          },
        }
      }
      return false
    },
    update: ({ req: { user } }) => {
      if (user?.role === 'superadmin') return true
      if (user?.tenant) {
        return {
          tenant: {
            equals: user.tenant,
          },
        }
      }
      return false
    },
  },
}
