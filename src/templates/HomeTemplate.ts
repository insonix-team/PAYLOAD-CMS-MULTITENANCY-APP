import { CardsWithIcons } from '@/blocks/CardsIconBlock';
import { CarouselBlock } from '@/blocks/CarouselBlock';
import { ContentBlock } from '@/blocks/ContentBlock';
import { MediaBlockContent } from '@/blocks/ContentImageConfig';
import { CtaBlock } from '@/blocks/CtaBlock';
import { FAQBlock } from '@/blocks/FaqConfig';
import { FeaturesBlock } from '@/blocks/FeaturesBlock';
import { HeroBlock } from '@/blocks/HeroBlock';
import { HeroLeftLayoutBlock } from '@/blocks/HeroLeftLayoutBlock';
import { IconFeatureBlock } from '@/blocks/IconFeatureBlock';
import { MapInfoBlock } from '@/blocks/MapInfoBlock';
import { StepPocessBlock } from '@/blocks/StepPocessBlock';
import { TeamCarousalBlock } from '@/blocks/TeamCarousalBlock';
import { VerticleHoverCardsBlock } from '@/blocks/VerticleHoverCardsBlock';
import type { CollectionConfig } from 'payload';

export const HomeTemplate: CollectionConfig = {
  slug: 'home-templates',
  admin: {
    useAsTitle: 'name',
    group: 'Templates',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
    },
    {
      name: 'blocks',
      type: 'blocks',
      blocks: [
        HeroBlock,
        FeaturesBlock,
        ContentBlock,
        CtaBlock,
        MediaBlockContent,
        FAQBlock,
        CardsWithIcons,
        VerticleHoverCardsBlock,
        HeroLeftLayoutBlock,
        MapInfoBlock,
        CarouselBlock,
        TeamCarousalBlock,
        IconFeatureBlock,
        StepPocessBlock,
      ],
      admin: {
        description: 'Predefined blocks structure for this template',
      },
    },
  ],
};
