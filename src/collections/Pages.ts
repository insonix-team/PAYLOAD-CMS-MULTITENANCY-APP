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
import { CollectionSlug, CollectionConfig } from 'payload';
import { HeroLeftLayoutBlock } from '../blocks/HeroLeftLayoutBlock';
import { IconFeatureBlock } from '@/blocks/IconFeatureBlock';
import { StepPocessBlock } from '@/blocks/StepPocessBlock';

// ========== INTERFACES ==========

interface User {
  id?: string;
  role?: string;
  tenant?: string | { id: string };
  email?: string;
}

interface TemplateInfo {
  collection: string;
  id: string;
}

interface Block {
  id?: string;
  blockType: string;
  _blockId?: string;
  _templateBlockId?: string;
  _originalPosition?: number;
  title?: string;
  content?: unknown;
  imagePosition?: string;
  alignment?: string;
  buttonText?: string;
  buttonLink?: string;
  backgroundColor?: string;
  [key: string]: unknown;
}

interface TemplateBlockId {
  id: string;
  blockType: string;
  position?: number;
}

interface TemplateSyncInfo {
  lastSyncedTemplateId?: string;
  lastSyncedTemplateUpdatedAt?: string;
  templateBlockIds?: TemplateBlockId[];
  manualBlockSignatures?: { blockType: string; id?: string }[];
}

interface PageData {
  id?: string;
  title?: string;
  slug?: string;
  templateType?: string;
  homeTemplate?: string | { id: string };
  aboutTemplate?: string | { id: string };
  contactTemplate?: string | { id: string };
  serviceTemplate?: string | { id: string };
  content?: Block[];
  tenant?: string | { id: string };
  templateSyncInfo?: TemplateSyncInfo;
  _status?: string;
  _isRefresh?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

interface TemplateData {
  id: string;
  updatedAt: string;
  name?: string;
  blocks?: Block[];
}

interface siblingData {
  templateType?: string;
  homeTemplate?: string;
  aboutTemplate?: string;
  contactTemplate?: string;
  serviceTemplate?: string;
}

// ========== COLLECTION CONFIG ==========

export const Pages: CollectionConfig = {
  slug: 'pages',
  versions: {
    drafts: true,
  },

  access: {
    create: ({ req: { user } }) => {
      if (!user) return false;
      if (user.role === ROLES.SUPERADMIN) return true;
      return {
        tenant: {
          equals: typeof user.tenant === 'object' ? user?.tenant?.id : user.tenant,
        },
      };
    },
    read: ({ req: { user } }) => {
      if (!user) {
        return false;
      }

      if (user.role === ROLES.SUPERADMIN) {
        return true;
      }

      return {
        tenant: {
          equals: typeof user.tenant === 'object' ? user?.tenant?.id : user.tenant,
        },
      };
    },

    update: ({ req: { user } }) => {
      if (!user) {
        return false;
      }

      if (user.role === ROLES.SUPERADMIN) {
        return true;
      }

      return {
        tenant: {
          equals: typeof user.tenant === 'object' ? user?.tenant?.id : user.tenant,
        },
      };
    },

    delete: ({ req: { user } }) => {
      if (!user) {
        return false;
      }

      if (user.role === ROLES.SUPERADMIN) {
        return true;
      }

      return {
        tenant: {
          equals: typeof user.tenant === 'object' ? user?.tenant?.id : user.tenant,
        },
      };
    },
  },

  admin: {
    livePreview: {
      url: async ({ data, req }) => {
        let tenantSlug = '';
        let tenantDomain = '';

        if (data.tenant) {
          try {
            const tenantId = typeof data.tenant === 'object' ? data.tenant.id : data.tenant;
            const tenant = await req.payload.findByID({
              collection: 'tenants',
              id: tenantId,
            });
            tenantSlug = tenant?.slug || '';
            tenantDomain = tenant?.domain || '';
          } catch (error) {
            console.error('Failed to fetch tenant:', error);
          }
        }

        // Check if running locally based on request host
        const requestHost = req?.headers?.get?.('host') || '';
        const isLocalDev = requestHost.includes('localhost') || requestHost.includes('127.0.0.1');

        let slug;
        const timestamp = Date.now();

        let previewUrl;

        if (isLocalDev) {
          slug = data.slug;
          previewUrl = `${process.env.NEXT_PUBLIC_API_URL}/${tenantSlug}/${slug}?preview=true&id=${data?.id}&t=${timestamp}`;
        } else {
          slug = data?.slug === 'home' ? '' : data?.slug;
          previewUrl = `https://${tenantDomain}/${slug}?preview=true&id=${data?.id}&t=${timestamp}`;
        }

        return previewUrl;
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
      validate: async (value: any, args: any) => {
        try {
          const { req, data, id } = args;

          if (!value || Array.isArray(value)) {
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
        condition: (_data: unknown, siblingData: siblingData) =>
          siblingData?.templateType === TEMPLATE_TYPES.HOME,
      },
    },
    {
      name: 'aboutTemplate',
      type: 'relationship',
      relationTo: 'about-templates',
      admin: {
        condition: (_data: unknown, siblingData: siblingData) =>
          siblingData?.templateType === TEMPLATE_TYPES.ABOUT,
      },
    },
    {
      name: 'serviceTemplate',
      type: 'relationship',
      relationTo: 'service-templates',
      admin: {
        condition: (_data: unknown, siblingData: siblingData) =>
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
        condition: (_data: unknown, siblingData: siblingData) => {
          return !!(
            siblingData?.homeTemplate ||
            siblingData?.aboutTemplate ||
            siblingData?.contactTemplate ||
            siblingData?.serviceTemplate
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
        condition: (_data, _siblingData, user) => {
          return (user as { role?: string })?.role === ROLES.SUPERADMIN;
        },
      },
      defaultValue: ({ user }: { user?: User }) => {
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
    {
      name: 'templateSyncInfo',
      type: 'group',
      admin: {
        hidden: true,
      },
      fields: [
        {
          name: 'lastSyncedTemplateId',
          type: 'text',
        },
        {
          name: 'lastSyncedTemplateUpdatedAt',
          type: 'date',
        },
        {
          name: 'templateBlockIds',
          type: 'array',
          fields: [
            {
              name: 'id',
              type: 'text',
            },
            {
              name: 'blockType',
              type: 'text',
            },
          ],
        },
        {
          name: 'manualBlockSignatures',
          type: 'array',
          fields: [
            {
              name: 'blockType',
              type: 'text',
            },
          ],
        },
      ],
    },
  ],

  hooks: {
    beforeChange: [
      async ({ req, data, operation, originalDoc }: any) => {
        // ========== HELPER FUNCTIONS ==========

        const normalizeId = (val: unknown): string | undefined => {
          if (typeof val === 'object' && val !== null && 'id' in val) {
            return (val as { id: string }).id;
          }
          return typeof val === 'string' ? val : undefined;
        };

        // ========== DETECT REFRESH OPERATION ==========
        const isRefreshOperation = data._isRefresh === true;

        if (isRefreshOperation && data.templateSyncInfo?.templateBlockIds) {
          req.context.incomingTemplateBlockIds = data.templateSyncInfo.templateBlockIds;
        }

        // ========== GET ACTIVE TEMPLATE ==========
        const getActiveTemplate = (doc: PageData): TemplateInfo | null => {
          if (doc?.templateType === 'home' && doc?.homeTemplate) {
            const id = normalizeId(doc.homeTemplate);
            return id ? { collection: 'home-templates', id } : null;
          }
          if (doc?.templateType === 'about' && doc?.aboutTemplate) {
            const id = normalizeId(doc.aboutTemplate);
            return id ? { collection: 'about-templates', id } : null;
          }
          if (doc?.templateType === 'contact' && doc?.contactTemplate) {
            const id = normalizeId(doc.contactTemplate);
            return id ? { collection: 'contact-templates', id } : null;
          }
          if (doc?.templateType === 'services' && doc?.serviceTemplate) {
            const id = normalizeId(doc.serviceTemplate);
            return id ? { collection: 'service-templates', id } : null;
          }
          return null;
        };

        // ========== NORMALIZE RELATIONSHIPS ==========
        const normalizeRelationships = (obj: unknown): unknown => {
          if (Array.isArray(obj)) {
            return obj.map(normalizeRelationships);
          }
          if (obj && typeof obj === 'object') {
            const newObj: Record<string, unknown> = {};
            const relationshipFields = ['media', 'image', 'icon', 'file'];

            for (const key in obj) {
              const value = (obj as Record<string, unknown>)[key];
              if (
                relationshipFields.includes(key) &&
                value &&
                typeof value === 'object' &&
                'id' in value
              ) {
                newObj[key] = (value as { id: string }).id;
              } else {
                newObj[key] = normalizeRelationships(value);
              }
            }
            return newObj;
          }
          return obj;
        };

        // ========== ENSURE BLOCK IDS ==========
        const ensureBlockIds = (blocks: Block[]): Block[] => {
          return blocks.map((block) => {
            if (block._templateBlockId) return block;
            if (!block._blockId) {
              const newId = `block_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
              return { ...block, _blockId: newId };
            }
            return block;
          });
        };

        // ========== RESOLVE TEMPLATE IDS ==========
        const activeTemplate = getActiveTemplate(data);
        const oldTemplate = getActiveTemplate(originalDoc);

        const activeTemplateId = activeTemplate?.id;
        const oldTemplateId = oldTemplate?.id;

        const isTemplateChanged = operation === 'create' || activeTemplateId !== oldTemplateId;

        const existingContent = ensureBlockIds(Array.isArray(data.content) ? data.content : []);

        // ========== CASE 1: TEMPLATE CHANGED OR NEW DOC ==========
        if (activeTemplate && isTemplateChanged) {
          const template = (await req.payload.findByID({
            collection: activeTemplate.collection,
            id: activeTemplateId as string,
            depth: 2,
          })) as TemplateData;

          const templateBlocks: Block[] = Array.isArray(template?.blocks)
            ? template.blocks.map((block: Block, index: number) => {
                const { id: _id, ...blockWithoutId } = block;
                const templateBlockId = `tpl_${activeTemplateId}_${index}_${block.blockType}`;

                return {
                  ...(normalizeRelationships(blockWithoutId) as Block),
                  _blockId: undefined,
                  _templateBlockId: templateBlockId,
                  _originalPosition: index,
                };
              })
            : [];

          const manualBlocks: Block[] = existingContent.filter((b: Block) => !b._templateBlockId);

          data.content = [...templateBlocks, ...manualBlocks];

          data.templateSyncInfo = {
            lastSyncedTemplateId: activeTemplateId,
            lastSyncedTemplateUpdatedAt: template.updatedAt,
            templateBlockIds: templateBlocks.map((b: Block) => ({
              id: b._templateBlockId || '',
              blockType: b.blockType,
            })),
            manualBlockSignatures: manualBlocks.map((b: Block) => ({
              blockType: b.blockType,
            })),
          };
        }
        // ========== CASE 2: SAME TEMPLATE AND MAKE CHANGES ==========
        else {
          const reliableSyncInfo = originalDoc?.templateSyncInfo;

          let templateBlockIds: TemplateBlockId[] | undefined;

          if (isRefreshOperation && req.context.incomingTemplateBlockIds) {
            templateBlockIds = req.context.incomingTemplateBlockIds;
          } else {
            templateBlockIds = reliableSyncInfo?.templateBlockIds;
          }

          const validTemplateBlockIds = new Set(
            (templateBlockIds || []).map((b: TemplateBlockId) => b.id)
          );

          const seenTemplateIds = new Set<string>();
          const seenBlockIds = new Set<string>();

          data.content = existingContent.filter((block: Block) => {
            if (block._templateBlockId) {
              const isValid = validTemplateBlockIds.has(block._templateBlockId);
              if (!isValid) return false;
              if (seenTemplateIds.has(block._templateBlockId)) return false;
              seenTemplateIds.add(block._templateBlockId);
              return true;
            }
            if (block._blockId) {
              if (seenBlockIds.has(block._blockId)) return false;
              seenBlockIds.add(block._blockId);
              return true;
            }
            return false;
          });

          if (!isRefreshOperation || !data.templateSyncInfo) {
            data.templateSyncInfo = {
              ...reliableSyncInfo,
              manualBlockSignatures: data.content
                ?.filter((b: Block) => !!b._blockId)
                .map((b: Block) => ({ blockType: b.blockType })),
            };
          }
        }

        // ========== AUTO SLUG ==========
        if (!data.slug && data.title) {
          data.slug = data.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
        }

        // ========== REMOVE TEMPORARY FLAG ==========
        if (data._isRefresh) {
          delete data._isRefresh;
        }

        return data;
      },
    ],
  },
};
