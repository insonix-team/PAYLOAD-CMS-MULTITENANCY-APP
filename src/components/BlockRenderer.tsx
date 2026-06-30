import { BlockErrorBoundary } from './BlockErrorBoundary';
import { CardsBlockUI } from './blocks/CardsBlockUI';
import { ContentWithImageBlock } from './blocks/ContentWithImageBlocksUi';
import { CTABlockUI } from './blocks/CTABlockUI';
import { ImageBlockUI } from './blocks/ImageBlockUI';
import { ListBlockUI } from './blocks/ListBlockUI';
import { TestimonialsBlockUI } from './blocks/TestimonialsBlockUI';
import { TextBlockUI } from './blocks/TextBlockUI';
import { ContentImageComponentUI } from './ContentImageComponent';
import { FAQComponentUI } from './FaqComponent';
import { CardsWithIconsBlockUI } from './CardIconComponent';
import { FeaturesBlock } from './FeaturesBlock';
import { HeroBlock } from './HeroBlock';
import VerticleHoverCardsUI from './VerticleHoverCardsUI';
import { HeroLeftLayoutUI } from './HeroLeftLayoutUI';
import MapInfoBlockUI from './MapInfoBlockUI';
import { CarouselBlockUI } from './CarouselBlockUI';
import { TeamCarousalUI } from './TeamCarousalUI';
import IconFeatureBoxUI from './IconFeatureBoxUI';
import StepProcessUI from './StepProcessUI';

type Props = {
  blocks: any[];
  tenant: string;
};

export const BlockRenderer = ({ blocks, tenant }: Props) => {
  if (!blocks) return null;

  return (
    <>
      {blocks?.map((block, index) => {
        switch (block?.blockType) {
          case 'contentWithImage':
            return (
              <BlockErrorBoundary key={index} blockType="contentWithImage" blockIndex={index}>
                <ContentWithImageBlock data={block} tenant={tenant} />
              </BlockErrorBoundary>
            );

          case 'cards':
            return (
              <BlockErrorBoundary key={index} blockType="cards" blockIndex={index}>
                <CardsBlockUI data={block} />
              </BlockErrorBoundary>
            );

          case 'mediaBlockcontent':
            return (
              <BlockErrorBoundary key={index} blockType="mediaBlockcontent" blockIndex={index}>
                <ContentImageComponentUI data={block} tenant={tenant} />
              </BlockErrorBoundary>
            );

          case 'cardsWithIcons':
            return (
              <BlockErrorBoundary key={index} blockType="cardsWithIcons" blockIndex={index}>
                <CardsWithIconsBlockUI data={block} tenant={tenant} />
              </BlockErrorBoundary>
            );

          case 'verticleHoverCardsBlock':
            return (
              <BlockErrorBoundary
                key={index}
                blockType="verticleHoverCardsBlock"
                blockIndex={index}
              >
                <VerticleHoverCardsUI data={block} tenant={tenant} />
              </BlockErrorBoundary>
            );

          case 'mapInfoBlock':
            return (
              <BlockErrorBoundary key={index} blockType="mapInfoBlock" blockIndex={index}>
                <MapInfoBlockUI data={block} tenant={tenant} />
              </BlockErrorBoundary>
            );

          case 'carouselBlock':
            return (
              <BlockErrorBoundary key={index} blockType="carouselBlock" blockIndex={index}>
                <CarouselBlockUI data={block} tenant={tenant} />
              </BlockErrorBoundary>
            );

          case 'teamCarousalBlock':
            return (
              <BlockErrorBoundary key={index} blockType="teamCarousalBlock" blockIndex={index}>
                <TeamCarousalUI data={block} tenant={tenant} />
              </BlockErrorBoundary>
            );

          case 'iconFeatureBlock':
            return (
              <BlockErrorBoundary key={index} blockType="iconFeatureBlock" blockIndex={index}>
                <IconFeatureBoxUI data={block} tenant={tenant} />
              </BlockErrorBoundary>
            );

          case 'stepPocessBlock':
            return (
              <BlockErrorBoundary key={index} blockType="stepPocessBlock" blockIndex={index}>
                <StepProcessUI data={block} tenant={tenant} />
              </BlockErrorBoundary>
            );

          case 'heroLeftLayoutBlock':
            return (
              <BlockErrorBoundary key={index} blockType="heroLeftLayoutBlock" blockIndex={index}>
                <HeroLeftLayoutUI data={block} tenant={tenant} />
              </BlockErrorBoundary>
            );

          case 'list':
            return (
              <BlockErrorBoundary key={index} blockType="list" blockIndex={index}>
                <ListBlockUI data={block} />
              </BlockErrorBoundary>
            );

          case 'faqBlock':
            return (
              <BlockErrorBoundary key={index} blockType="faqBlock" blockIndex={index}>
                <FAQComponentUI data={block} tenant={tenant} />
              </BlockErrorBoundary>
            );

          case 'testimonials':
            return (
              <BlockErrorBoundary key={index} blockType="testimonials" blockIndex={index}>
                <TestimonialsBlockUI data={block} />
              </BlockErrorBoundary>
            );

          case 'cta':
            return (
              <BlockErrorBoundary key={index} blockType="cta" blockIndex={index}>
                <CTABlockUI data={block} tenant={tenant} />
              </BlockErrorBoundary>
            );

          case 'text':
            return (
              <BlockErrorBoundary key={index} blockType="text" blockIndex={index}>
                <TextBlockUI data={block} />
              </BlockErrorBoundary>
            );

          case 'image':
            return (
              <BlockErrorBoundary key={index} blockType="image" blockIndex={index}>
                <ImageBlockUI data={block} />
              </BlockErrorBoundary>
            );

          case 'hero':
            return (
              <BlockErrorBoundary key={index} blockType="hero" blockIndex={index}>
                <HeroBlock data={block} />
              </BlockErrorBoundary>
            );

          case 'features':
            return (
              <BlockErrorBoundary key={index} blockType="features" blockIndex={index}>
                <FeaturesBlock {...block} />
              </BlockErrorBoundary>
            );

          default:
            return null;
        }
      })}
    </>
  );
};
