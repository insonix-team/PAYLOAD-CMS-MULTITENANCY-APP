'use client';
import React, { useState, useEffect, useCallback } from 'react';
import { Button } from '@payloadcms/ui';
import { useFormFields, useDocumentInfo } from '@payloadcms/ui';

// ========== INTERFACES ==========

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
  [key: string]: unknown;
}

interface PageData {
  content?: Block[];
  templateSyncInfo?: {
    lastSyncedTemplateId?: string;
    lastSyncedTemplateUpdatedAt?: string;
    templateBlockIds?: { id: string; blockType: string; position?: number }[];
    manualBlockSignatures?: { blockType: string }[];
  };
}

interface TemplateData {
  id: string;
  updatedAt: string;
  blocks?: Block[];
}

interface ManualBlockWithIndex {
  block: Block;
  idx: number;
}

// ========== COMPONENT ==========

export const TemplateRefreshButton: React.FC = () => {
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [needsRefresh, setNeedsRefresh] = useState<boolean>(false);
  const [currentTemplateId, setCurrentTemplateId] = useState<string | null>(null);
  const [currentTemplateUpdatedAt, setCurrentTemplateUpdatedAt] = useState<string | null>(null);

  const { id: docId } = useDocumentInfo();
  const templateType = useFormFields(([fields]) => fields.templateType?.value);
  const homeTemplate = useFormFields(([fields]) => fields.homeTemplate?.value);
  const aboutTemplate = useFormFields(([fields]) => fields.aboutTemplate?.value);
  const contactTemplate = useFormFields(([fields]) => fields.contactTemplate?.value);
  const serviceTemplate = useFormFields(([fields]) => fields.serviceTemplate?.value);

  // Helper function to extract template ID
  const extractTemplateId = (template: unknown): string | undefined => {
    if (!template) return undefined;
    if (typeof template === 'string') return template;
    if (typeof template === 'object' && 'id' in template) {
      const id = (template as { id: unknown }).id;
      return typeof id === 'string' ? id : undefined;
    }
    return undefined;
  };

  const getTemplateInfo = useCallback((): TemplateInfo | null => {
    if (templateType === 'home' && homeTemplate) {
      const templateId = extractTemplateId(homeTemplate);
      return templateId ? { collection: 'home-templates', id: templateId } : null;
    }
    if (templateType === 'about' && aboutTemplate) {
      const templateId = extractTemplateId(aboutTemplate);
      return templateId ? { collection: 'about-templates', id: templateId } : null;
    }
    if (templateType === 'contact' && contactTemplate) {
      const templateId = extractTemplateId(contactTemplate);
      return templateId ? { collection: 'contact-templates', id: templateId } : null;
    }
    if (templateType === 'services' && serviceTemplate) {
      const templateId = extractTemplateId(serviceTemplate);
      return templateId ? { collection: 'service-templates', id: templateId } : null;
    }
    return null;
  }, [templateType, homeTemplate, aboutTemplate, contactTemplate, serviceTemplate]);
  // Fetch current template's updatedAt

  useEffect(() => {
    const fetchCurrentTemplate = async (): Promise<void> => {
      const template = getTemplateInfo();

      if (!template) {
        setCurrentTemplateId(null);
        setCurrentTemplateUpdatedAt(null);
        return;
      }

      try {
        const templateRes = await fetch(`/api/${template.collection}/${template.id}`);
        const templateData = (await templateRes.json()) as TemplateData;
        setCurrentTemplateId(template.id);
        setCurrentTemplateUpdatedAt(templateData.updatedAt);
      } catch (error) {
        console.error('[fetchCurrentTemplate] Failed:', error);
      }
    };

    fetchCurrentTemplate();
  }, []);

  // Check if refresh is needed
  useEffect(() => {
    const checkTemplateUpdates = async (): Promise<void> => {
      const template = getTemplateInfo();

      if (!template || !docId) {
        setNeedsRefresh(false);
        return;
      }

      if (!currentTemplateId || !currentTemplateUpdatedAt) {
        return;
      }

      try {
        const pageRes = await fetch(`/api/pages/${docId}?draft=true`);
        const pageData = (await pageRes.json()) as PageData;

        const lastSyncedTemplateId = pageData?.templateSyncInfo?.lastSyncedTemplateId;
        const lastSyncedUpdatedAt = pageData?.templateSyncInfo?.lastSyncedTemplateUpdatedAt;

        if (lastSyncedTemplateId !== template.id) {
          setNeedsRefresh(false);
          return;
        }

        if (currentTemplateUpdatedAt && lastSyncedUpdatedAt) {
          const currentDate = new Date(currentTemplateUpdatedAt);
          const syncedDate = new Date(lastSyncedUpdatedAt);
          setNeedsRefresh(currentDate > syncedDate);
        } else {
          setNeedsRefresh(false);
        }
      } catch (error) {
        console.error('[checkTemplateUpdates] Failed:', error);
        setNeedsRefresh(false);
      }
    };

    if (docId && currentTemplateId && currentTemplateUpdatedAt) {
      checkTemplateUpdates();
    }
  }, [docId, currentTemplateId, currentTemplateUpdatedAt]);

  const handleRefresh = useCallback(async (): Promise<void> => {
    const template = getTemplateInfo();
    if (!template || !docId) return;

    setIsRefreshing(true);
    try {
      // Fetch latest template
      const templateRes = await fetch(`/api/${template.collection}/${template.id}`);
      const templateData = (await templateRes.json()) as TemplateData;
      const newTemplateBlocks: Block[] = templateData.blocks || [];

      // Get current page data
      const pageRes = await fetch(`/api/pages/${docId}?draft=true`);
      const pageData = (await pageRes.json()) as PageData;
      let currentContent: Block[] = pageData.content || [];

      // Remove duplicate template blocks
      const seenTemplateIds = new Set<string>();
      const cleanedContent: Block[] = [];

      for (const block of currentContent) {
        if (block._templateBlockId) {
          if (!seenTemplateIds.has(block._templateBlockId)) {
            seenTemplateIds.add(block._templateBlockId);
            cleanedContent.push(block);
          }
        } else {
          cleanedContent.push(block);
        }
      }
      currentContent = cleanedContent;

      // Create new template blocks in new order
      const newTemplateQueue: Block[] = newTemplateBlocks.map((block: Block, index: number) => {
        const { id: _id, ...blockWithoutId } = block;
        return {
          ...blockWithoutId,
          _blockId: undefined,
          _templateBlockId: `tpl_${template.id}_${index}_${block.blockType}`,
          _originalPosition: index,
        };
      });

      // Find manual blocks with their original positions
      const manualBlocksWithIndex: ManualBlockWithIndex[] = currentContent.map((block: Block, idx: number) => ({ block, idx })).filter(({ block }: ManualBlockWithIndex) => !block._templateBlockId);

      const manualIndices = new Set<number>(manualBlocksWithIndex.map(({ idx }: ManualBlockWithIndex) => idx));

      const finalContent: Block[] = [];
      let templateQueuePointer = 0;

      for (let i = 0; i < currentContent.length; i++) {
        if (manualIndices.has(i)) {
          // Put manual block back at its original position
          const found = manualBlocksWithIndex.find(({ idx }: ManualBlockWithIndex) => idx === i);
          if (found) {
            const { _templateBlockId, _originalPosition, ...cleanBlock } = found.block;
            finalContent.push(cleanBlock as Block);
          }
        } else {
          // Fill with next template block in new order
          if (templateQueuePointer < newTemplateQueue.length) {
            finalContent.push(newTemplateQueue[templateQueuePointer]);
            templateQueuePointer++;
          }
        }
      }

      // Append any remaining template blocks at the end
      while (templateQueuePointer < newTemplateQueue.length) {
        finalContent.push(newTemplateQueue[templateQueuePointer]);
        templateQueuePointer++;
      }

      // Save
      const updatePayload = {
        content: finalContent,
        templateSyncInfo: {
          lastSyncedTemplateId: template.id,
          lastSyncedTemplateUpdatedAt: templateData.updatedAt,
          templateBlockIds: newTemplateQueue.map((block: Block, idx: number) => ({
            id: block._templateBlockId || '',
            blockType: block.blockType,
            position: idx,
          })),
          manualBlockSignatures: finalContent.filter((block: Block) => !block._templateBlockId).map((block: Block) => ({ blockType: block.blockType })),
        },
        _isRefresh: true,
      };

      const updateRes = await fetch(`/api/pages/${docId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatePayload),
      });

      if (updateRes.ok) {
        window.location.reload();
      } else {
        const errorText = await updateRes.text();
        console.error('Update failed:', errorText);
      }
    } catch (error) {
      console.error('Refresh failed:', error);
    } finally {
      setIsRefreshing(false);
    }
  }, [docId]);

  const template = getTemplateInfo();
  if (!template) return null;

  return (
    <div
      style={{
        marginBottom: '20px',
        padding: '10px',
        borderTop: '1px solid #e2e8f0',
        marginTop: '20px',
      }}
    >
      <Button onClick={handleRefresh} disabled={isRefreshing || !needsRefresh} buttonStyle={needsRefresh ? 'primary' : 'secondary'} size="medium">
        {isRefreshing ? '🔄 Refreshing...' : needsRefresh ? '📥 Update Template Layout' : '✅ Template Synced'}
      </Button>
      {needsRefresh && (
        <div style={{ marginTop: '8px', fontSize: '12px', color: '#e67e22' }}>
          <p>Template has been updated.</p>
          <p style={{ fontSize: '11px', marginTop: '4px' }}>Click to update template blocks while keeping your custom blocks.</p>
        </div>
      )}
    </div>
  );
};
