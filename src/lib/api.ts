/* eslint-disable @typescript-eslint/no-explicit-any */
import { getCurrentDomain } from './tenant';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || process.env.NEXT_PUBLIC_SITE_URL || `http://localhost:${process.env.PORT || 3000}`;
const isServer = typeof window === 'undefined';

export const getTenant = async (tenantSlug: string | null = null) => {
  const query = tenantSlug
    ? {
        field: 'slug',
        value: tenantSlug,
      }
    : {
        field: 'domain',
        value: await getCurrentDomain(),
      };

  const where = {
    [query.field]: {
      equals: query.value,
    },
  };

  // Server-side

  let base_url = BASE_URL;

  if (isServer) {
    const { getPayload } = await import('payload');
    const configModule = await import('@payload-config');

    const payload = await getPayload({
      config: (configModule as any).default,
    });

    const result = await payload.find({
      collection: 'tenants',
      where,
      depth: 0,
    });
    base_url = `https://${result?.docs?.[0]?.domain}`;
    return result?.docs?.[0];
  }

  const encodedValue = encodeURIComponent(query.value || '');

  const res = await fetch(`${base_url}/api/tenants?where[${query.field}][equals]=${encodedValue}`, {
    cache: 'no-store',
  });

  const data = await res.json();
  return data?.docs?.[0];
};

export const getHeader = async (tenantSlug: string | null = null) => {
  const tenant = await getTenant(tenantSlug || undefined);

  if (!tenant) {
    return null;
  }

  const { getPayload } = await import('payload');
  const configModule = await import('@payload-config');

  const payload = await getPayload({
    config: (configModule as any).default,
  });

  const result = await payload.find({
    collection: 'headers',
    where: {
      tenant: {
        equals: tenant.id,
      },
    },

    limit: 1,
    depth: 2,
  });

  return result?.docs[0]?.layout || null;
};

export const getFooter = async (tenantSlug: string | null = null) => {
  const tenant = await getTenant(tenantSlug || undefined);

  if (!tenant) {
    return null;
  }

  const { getPayload } = await import('payload');
  const configModule = await import('@payload-config');

  const payload = await getPayload({
    config: (configModule as any).default,
  });

  const result = await payload.find({
    collection: 'footers',

    where: {
      tenant: {
        equals: tenant.id,
      },
    },

    limit: 1,
    depth: 2,
  });

  return result.docs[0]?.layout || null;
};

export const getPages = async (
  slug: string,
  tenantSlug: string | null = null,
  options?: {
    draft?: boolean;
    id?: string; // The page ID for draft preview
  }
) => {
  const tenant = await getTenant(tenantSlug || undefined);

  if (!tenant) {
    return { docs: [] };
  }

  const isDraft = options?.draft === true;
  const pageId = options?.id;

  if (isServer) {
    const { getPayload } = await import('payload');
    const configModule = await import('@payload-config');
    const payload = await getPayload({ config: (configModule as any).default });

    // For draft preview, fetch by ID with draft=true
    if (isDraft && pageId) {
      try {
        const result = await payload.findByID({
          collection: 'pages',
          id: pageId,
          draft: true, // This is crucial for draft content
          depth: 3,
        });

        // Return in the same format as find method
        return { docs: [result], totalDocs: 1 };
      } catch (error) {
        console.error('Error fetching draft page:', error);
        return { docs: [] };
      }
    }

    // Normal published page fetch
    const result = await payload.find({
      collection: 'pages',
      where: {
        tenant: { equals: tenant.id },
        slug: { equals: slug },
        // Only get published versions unless draft mode
        ...(isDraft ? {} : { _status: { equals: 'published' } }),
      },
      depth: 3,
    });
    return result;
  }

  // Client-side fetching
  const base_url = BASE_URL;

  let url;
  if (isDraft && pageId) {
    // For draft preview, fetch by ID
    url = `${base_url}/api/pages/${pageId}?draft=true`;
  } else {
    // Normal published page fetch
    const encodedSlug = encodeURIComponent(slug || '');
    url = `${base_url}/api/pages?where[tenant][equals]=${tenant.id}&where[slug][equals]=${encodedSlug}&where[_status][equals]=published`;
  }

  const res = await fetch(url, {
    cache: 'no-store',
  });

  // Handle both single document and collection responses
  const data = await res.json();

  // If fetching by ID, wrap in docs array for consistency
  if (isDraft && pageId && !data.docs) {
    return { docs: [data], totalDocs: 1 };
  }

  return data;
};
