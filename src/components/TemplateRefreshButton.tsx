'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@payloadcms/ui';
import { useFormFields, useDocumentInfo } from '@payloadcms/ui';

export const TemplateRefreshButton: React.FC = () => {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [needsRefresh, setNeedsRefresh] = useState(false);

  // Get document ID from useDocumentInfo hook
  const { id: docId } = useDocumentInfo();

  const templateType = useFormFields(([fields]) => fields.templateType?.value);
  const homeTemplate = useFormFields(([fields]) => fields.homeTemplate?.value);
  const aboutTemplate = useFormFields(([fields]) => fields.aboutTemplate?.value);

  const getTemplateInfo = () => {
    if (templateType === 'home' && homeTemplate) {
      return { collection: 'home-templates', id: homeTemplate };
    }
    if (templateType === 'about' && aboutTemplate) {
      return { collection: 'about-templates', id: aboutTemplate };
    }
    return null;
  };

  useEffect(() => {
    const checkTemplateUpdate = async () => {
      const template = getTemplateInfo();
      if (!template || !docId) return;

      try {
        const templateRes = await fetch(`/api/${template.collection}/${template.id}`);
        const templateData = await templateRes.json();

        // Get current page data via API
        const pageRes = await fetch(`/api/pages/${docId}`);
        const pageData = await pageRes.json();
        const currentContent = pageData.content || [];

        // Check if lengths differ or if block types changed at same positions
        let needsUpdate = false;

        if (templateData?.blocks?.length !== currentContent.length) {
          needsUpdate = true;
        } else {
          // Check if any block type changed at same position
          for (let i = 0; i < templateData.blocks.length; i++) {
            if (templateData.blocks[i]?.blockType !== currentContent[i]?.blockType) {
              needsUpdate = true;
              break;
            }
          }
        }

        if (needsUpdate) {
          setNeedsRefresh(true);
        }
      } catch (error) {
        console.error('Failed to check template::', error);
      }
    };

    if (docId) {
      checkTemplateUpdate();
    }
  }, [templateType, homeTemplate, aboutTemplate, docId]);

  const handleRefresh = async () => {
    const template = getTemplateInfo();
    if (!template || !docId) return;

    setIsRefreshing(true);
    try {
      // Fetch template blocks
      const templateRes = await fetch(`/api/${template.collection}/${template.id}`);
      const templateData = await templateRes.json();

      // Fetch current page
      const pageRes = await fetch(`/api/pages/${docId}`);
      const pageData = await pageRes.json();

      // Create a map of existing blocks by blockType + position
      const existingBlocksMap = new Map();
      pageData.content?.forEach((block: any, index: number) => {
        existingBlocksMap.set(`${block.blockType}_${index}`, block);
      });

      // Merge blocks using position-based matching
      const refreshedBlocks = templateData.blocks.map((newBlock: any, index: number) => {
        const key = `${newBlock.blockType}_${index}`;
        const existingBlock = existingBlocksMap.get(key);

        if (existingBlock) {
          // Same position and same block type - keep user's custom content
          return existingBlock;
        }

        // Brand new block or different block type at this position
        // For new blocks, remove the id to prevent duplicates
        const { id, ...blockWithoutId } = newBlock;
        return { ...blockWithoutId };
      });

      // Update page via API
      const updateRes = await fetch(`/api/pages/${docId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content: refreshedBlocks,
        }),
      });

      if (updateRes.ok) {
        setNeedsRefresh(false); // Reset the refresh flag
        window.location.reload();
      } else {
        console.error('Update failed:', await updateRes.text());
      }
    } catch (error) {
      console.error('Refresh failed:', error);
    } finally {
      setIsRefreshing(false);
    }
  };

  const template = getTemplateInfo();
  if (!template) return null;

  return (
    <div style={{ marginBottom: '20px' }}>
      <Button
        onClick={handleRefresh}
        disabled={isRefreshing || !needsRefresh}
        buttonStyle={needsRefresh ? 'primary' : 'secondary'}
      >
        {isRefreshing ? 'Refreshing...' : needsRefresh ? '🔄 Refresh Available!' : '✓ Up to Date'}
      </Button>
      {needsRefresh && (
        <p style={{ fontSize: '12px', color: '#f39c12', marginTop: '5px' }}>
          Template has been updated. Click to refresh.
        </p>
      )}
    </div>
  );
};
