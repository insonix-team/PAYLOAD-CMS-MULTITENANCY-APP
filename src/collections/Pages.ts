import { CardsWithIcons } from '@/blocks/CardsIconBlock';
import { CarouselBlock } from '@/blocks/CarouselBlock';
import { ContentBlock } from '@/blocks/ContentBlock';
import { MediaBlockContent } from '@/blocks/ContentImageConfig';
import { CtaBlock } from '@/blocks/CtaBlock';
import { FAQBlock } from '@/blocks/FaqConfig';
import { FeaturesBlock } from '@/blocks/FeaturesBlock';
import { HeroBlock } from '@/blocks/HeroBlock';
import { MapInfoBlock } from '@/blocks/MapInfoBlock';
import { TeamCarousalBlock } from '@/blocks/TeamCarousalBlock';
import { VerticleHoverCardsBlock } from '@/blocks/VerticleHoverCardsBlock';
import { ROLES, TEMPLATE_TYPE_OPTIONS, TEMPLATE_TYPES } from '@/constants/AppOptions';
import { CollectionSlug } from 'payload';
import { HeroLeftLayoutBlock } from '../blocks/HeroLeftLayoutBlock';
import { IconFeatureBlock } from '@/blocks/IconFeatureBlock';
import { StepPocessBlock } from '@/blocks/StepPocessBlock';

export const Pages: any = {
  slug: 'pages',
  versions: {
    drafts: true,
  },

  access: {
    read: ({ req: { user } }: { req: { user?: any } }) => {
      if (!user) {
        return false;
      }

      if (user.role === ROLES.SUPERADMIN) {
        return true;
      }

      return {
        tenant: {
          equals: typeof user.tenant === 'object' ? user.tenant.id : user.tenant,
        },
      };
    },

    update: ({ req: { user } }: { req: { user?: any } }) => {
      if (!user) {
        return false;
      }

      if (user.role === ROLES.SUPERADMIN) {
        return true;
      }

      return {
        tenant: {
          equals: typeof user.tenant === 'object' ? user.tenant.id : user.tenant,
        },
      };
    },

    delete: ({ req: { user } }: { req: { user?: any } }) => {
      if (!user) {
        return false;
      }

      if (user.role === ROLES.SUPERADMIN) {
        return true;
      }

      return {
        tenant: {
          equals: typeof user.tenant === 'object' ? user.tenant.id : user.tenant,
        },
      };
    },
  },

  admin: {
    livePreview: {
      url: async ({ data, req }: { data: any; req: any }) => {
        let tenantSlug = '';

        if (data.tenant) {
          try {
            const tenant = await req.payload.findByID({
              collection: 'tenants',
              id: data.tenant,
            });
            tenantSlug = tenant?.slug;
          } catch (error) {
            console.error('Failed to fetch tenant:', error);
          }
        }

        return `/api/live-preview?slug=${data?.slug}&tenant=${tenantSlug}&t=${Date.now()}`;
      },
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
      admin: {
        description: 'Slug must be unique within the selected tenant',
      },
      validate: async (value: string, args: any) => {
        try {
          const { req, data, id } = args;

          if (!value) {
            return 'Slug is required';
          }

          const tenantId =
            typeof data?.tenant === 'object'
              ? data?.tenant?.value || data?.tenant?.id
              : data?.tenant;

          if (!tenantId) {
            return 'Tenant is required';
          }

          const existing = await req.payload.find({
            collection: 'pages',
            draft: false,
            overrideAccess: true,
            where: {
              and: [
                {
                  slug: {
                    equals: value,
                  },
                },
                {
                  tenant: {
                    equals: tenantId,
                  },
                },
              ],
            },
            limit: 1,
          });

          const existingDoc = existing?.docs?.[0];

          if (existingDoc && existingDoc.id !== id) {
            return `Slug "${value}" already exists for this tenant`;
          }

          return true;
        } catch (err) {
          console.error('SLUG VALIDATION ERROR:', err);
          return 'Validation failed';
        }
      },
    },
    {
      name: 'templateType',
      type: 'select',
      required: true,
      options: TEMPLATE_TYPE_OPTIONS,
      admin: {
        components: {
          Field: '@/components/TemplateTypeSelect#TemplateTypeSelect',
        },
      },
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
      name: 'serviceTemplate',
      type: 'relationship',
      relationTo: 'service-templates',
      admin: {
        condition: (data: any, siblingData: any) =>
          siblingData?.templateType === TEMPLATE_TYPES.SERVICES,
      },
    },

    {
      name: 'content',
      type: 'blocks',
      blocks: [
        HeroBlock,
        FeaturesBlock,
        ContentBlock,
        CtaBlock,
        MediaBlockContent,
        CardsWithIcons,
        VerticleHoverCardsBlock,
        FAQBlock,
        HeroLeftLayoutBlock,
        MapInfoBlock,
        CarouselBlock,
        TeamCarousalBlock,
        IconFeatureBlock,
        StepPocessBlock,
      ],
      admin: {
        condition: (data: any, siblingData: any) => {
          return !!(
            siblingData?.homeTemplate ||
            siblingData?.aboutTemplate ||
            siblingData?.contactTemplate ||
            siblingData?.servicesTemplate
          );
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
        condition: (_data: any, _siblingData: any, { user }: any) => {
          return user?.role === ROLES.SUPERADMIN;
        },
      },
      defaultValue: ({ user }: any) => {
        if (user?.role !== ROLES.SUPERADMIN) {
          return typeof user?.tenant === 'object' ? user.tenant.id : user?.tenant;
        }

        return undefined;
      },
    },
    {
      name: 'templateUpdated',
      type: 'ui',
      admin: {
        components: {
          Field: '@/components/TemplateRefreshButton#TemplateRefreshButton',
        },
        position: 'sidebar',
      },
    },
  ],
  hooks: {
    beforeChange: [
      async ({ req, data, operation, originalDoc }: any) => {
        const getActiveTemplate = (data: any) => {
          if (data.templateType === 'home' && data.homeTemplate) {
            return { collection: 'home-templates', id: data.homeTemplate, field: 'homeTemplate' };
          }
          if (data.templateType === 'about' && data.aboutTemplate) {
            return {
              collection: 'about-templates',
              id: data.aboutTemplate,
              field: 'aboutTemplate',
            };
          }
          if (data.templateType === 'contact' && data.contactTemplate) {
            return {
              collection: 'contact-templates',
              id: data.contactTemplate,
              field: 'contactTemplate',
            };
          }
          if (data.templateType === 'services' && data.servicesTemplate) {
            return {
              collection: 'services-templates',
              id: data.servicesTemplate,
              field: 'servicesTemplate',
            };
          }
          return null;
        };

        const normalizeRelationships = (obj: any): any => {
          if (Array.isArray(obj)) {
            return obj.map(normalizeRelationships);
          }

          if (obj && typeof obj === 'object') {
            const newObj: any = {};

            for (const key in obj) {
              const value = obj[key];

              if (
                RELATIONSHIP_FIELDS.includes(key) &&
                value &&
                typeof value === 'object' &&
                'id' in value
              ) {
                newObj[key] = value.id;
              } else {
                newObj[key] = normalizeRelationships(value);
              }
            }

            return newObj;
          }

          return obj;
        };

        const RELATIONSHIP_FIELDS = ['media', 'image', 'icon', 'file'];

        const activeTemplate = getActiveTemplate(data);
        const oldTemplate = getActiveTemplate(originalDoc);

        const activeTemplateId =
          typeof activeTemplate?.id === 'object' ? activeTemplate?.id?.id : activeTemplate?.id;

        const oldTemplateId =
          typeof oldTemplate?.id === 'object' ? oldTemplate?.id?.id : oldTemplate?.id;

        const isTemplateChanged = operation === 'create' || activeTemplateId !== oldTemplateId;

        if (activeTemplate && isTemplateChanged) {
          const template: any = await req.payload.findByID({
            collection: activeTemplate.collection as any,
            id: activeTemplateId,
            depth: 2,
          });

          data.content = Array.isArray(template?.blocks)
            ? template.blocks.map((block: any) =>
                normalizeRelationships({
                  ...block,
                })
              )
            : [];
        }

        if (!data.slug && data.title) {
          data.slug = data.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
        }

        return data;
      },
    ],
  },
};
