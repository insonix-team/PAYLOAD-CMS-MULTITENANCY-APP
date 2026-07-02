import { ComponentType } from 'react';
import { CardsBlockUI } from './blocks/CardsBlockUI';
import { ContentWithImageBlock } from './blocks/ContentWithImageBlocksUi';
import { CTABlockUI } from './blocks/CTABlockUI';
import { ImageBlockUI } from './blocks/ImageBlockUI';
import { ListBlockUI } from './blocks/ListBlockUI';
import { TestimonialsBlockUI } from './blocks/TestimonialsBlockUI';
import { TextBlockUI } from './blocks/TextBlockUI';
import { CardsWithIconsBlockUI } from './CardIconComponent';
import { CarouselBlockUI } from './CarouselBlockUI';
import { ContentImageComponentUI } from './ContentImageComponent';
import { FAQComponentUI } from './FaqComponent';
import { FeaturesBlock } from './FeaturesBlock';
import { HeroBlock } from './HeroBlock';
import { HeroLeftLayoutUI } from './HeroLeftLayoutUI';
import IconFeatureBoxUI from './IconFeatureBoxUI';
import MapInfoBlockUI from './MapInfoBlockUI';
import StepProcessUI from './StepProcessUI';
import { TeamCarousalUI } from './TeamCarousalUI';
import VerticleHoverCardsUI from './VerticleHoverCardsUI';

interface BlockConfig {
  Component: ComponentType<any>;
  useTenant?: boolean;
}

export const BLOCK_REGISTRY: Record<string, BlockConfig> = {
  contentWithImage: { Component: ContentWithImageBlock, useTenant: true },
  cards: { Component: CardsBlockUI },
  mediaBlockcontent: { Component: ContentImageComponentUI },
  cardsWithIcons: { Component: CardsWithIconsBlockUI },
  verticleHoverCardsBlock: { Component: VerticleHoverCardsUI },
  mapInfoBlock: { Component: MapInfoBlockUI },
  carouselBlock: { Component: CarouselBlockUI },
  teamCarousalBlock: { Component: TeamCarousalUI },
  iconFeatureBlock: { Component: IconFeatureBoxUI },
  stepPocessBlock: { Component: StepProcessUI },
  heroLeftLayoutBlock: { Component: HeroLeftLayoutUI },
  list: { Component: ListBlockUI },
  faqBlock: { Component: FAQComponentUI },
  testimonials: { Component: TestimonialsBlockUI },
  cta: { Component: CTABlockUI, useTenant: true },
  text: { Component: TextBlockUI },
  image: { Component: ImageBlockUI },
  hero: { Component: HeroBlock },
  features: { Component: FeaturesBlock },
};
