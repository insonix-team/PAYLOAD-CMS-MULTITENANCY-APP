import { BlockErrorBoundary } from './BlockErrorBoundary';
import { BLOCK_REGISTRY } from './BlockRegistry';

interface Props {
  blocks: any[];
  tenant: string;
}

export const BlockRenderer = ({ blocks, tenant }: Props) => {
  if (!blocks) return null;

  return (
    <>
      {blocks.map((block, index) => {
        const config = BLOCK_REGISTRY[block?.blockType];
        if (!config) return null;

        const { Component, useTenant } = config;

        return (
          <BlockErrorBoundary key={index} blockType={block?.blockType} blockIndex={index}>
            <Component data={block} {...(useTenant ? { tenant } : {})} />
          </BlockErrorBoundary>
        );
      })}
    </>
  );
};
