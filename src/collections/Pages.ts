import { ContentBlock } from '@/blocks/ContentBlock'
import { CtaBlock } from '@/blocks/CtaBlock'
import { FeaturesBlock } from '@/blocks/FeaturesBlock'
import { HeroBlock } from '@/blocks/HeroBlock'
import { TEMPLATE_TYPE_OPTIONS, TEMPLATE_TYPES } from '@/constants/AppOptions'
import { CollectionSlug } from 'payload'

export const Pages: any = {
  slug: 'pages',
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
      unique: true,
    },
    {
      name: 'templateType',
      type: 'select',
      required: true,
      options: TEMPLATE_TYPE_OPTIONS,
    },

    {
      name: 'homeTemplate',
      type: 'relationship',
      relationTo: 'home-templates',
      admin: {
        condition: (data: any, siblingData: any) =>
          siblingData?.templateType === TEMPLATE_TYPES.HOME,
      },
    },
    {
      name: 'aboutTemplate',
      type: 'relationship',
      relationTo: 'about-templates' as any,
      admin: {
        condition: (data: any, siblingData: any) =>
          siblingData?.templateType === TEMPLATE_TYPES.ABOUT,
      },
    },

    {
      name: 'content',
      type: 'blocks',
      blocks: [HeroBlock, FeaturesBlock, ContentBlock, CtaBlock],
      admin: {
        condition: (data: any, siblingData: any) => {
          return !!(
            siblingData?.homeTemplate ||
            siblingData?.aboutTemplate ||
            siblingData?.contactTemplate ||
            siblingData?.servicesTemplate
          )
        },
      },
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
  hooks: {
    beforeChange: [
      async ({ req, data, operation, originalDoc }: any) => {
        // Determine which template is being used
        const getActiveTemplate = (data: any) => {
          if (data.templateType === 'home' && data.homeTemplate) {
            return { collection: 'home-templates', id: data.homeTemplate, field: 'homeTemplate' }
          }
          if (data.templateType === 'about' && data.aboutTemplate) {
            return { collection: 'about-templates', id: data.aboutTemplate, field: 'aboutTemplate' }
          }
          if (data.templateType === 'contact' && data.contactTemplate) {
            return {
              collection: 'contact-templates',
              id: data.contactTemplate,
              field: 'contactTemplate',
            }
          }
          if (data.templateType === 'services' && data.servicesTemplate) {
            return {
              collection: 'services-templates',
              id: data.servicesTemplate,
              field: 'servicesTemplate',
            }
          }
          return null
        }

        const activeTemplate = getActiveTemplate(data)
        const oldTemplate = getActiveTemplate(originalDoc)
        const isTemplateChanged = activeTemplate?.id !== oldTemplate?.id

        if (isTemplateChanged && activeTemplate) {
          const template: any = await req.payload.findByID({
            collection: activeTemplate.collection as any,
            id: activeTemplate.id,
          })

          if (template?.blocks) {
            data.content = template.blocks.map((block: any) => {
              const cleanedBlock = { ...block }

              if (operation === 'create') {
                if ('image' in cleanedBlock) cleanedBlock.image = null
                if ('file' in cleanedBlock) cleanedBlock.file = null
              } else if (operation === 'update' && isTemplateChanged) {
                const existingBlock = originalDoc?.content?.find(
                  (b: any) => b.id === block.id || b.blockType === block.blockType,
                )
                if ('image' in cleanedBlock) {
                  cleanedBlock.image = existingBlock?.image || null
                }
              }

              return cleanedBlock
            })
          }
        }

        if (operation === 'update' && originalDoc?.content && !isTemplateChanged) {
          data.content = originalDoc.content
        }

        if (!data.slug && data.title) {
          data.slug = data.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')
        }

        return data
      },
    ],
  },
}
