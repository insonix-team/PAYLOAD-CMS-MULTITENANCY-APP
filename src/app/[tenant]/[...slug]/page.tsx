import { BlockRenderer } from '@/components/BlockRenderer';
import FooterRenderer from '@/components/footer/FooterRenderer';
import HeaderRenderer from '@/components/headers/HeaderRenderer';
import { getFooter, getHeader, getPages, getTenant } from '@/lib/api';

import { notFound } from 'next/navigation';
import '../../globals.css';
import { ThemeRegistry } from '@/providers/ThemeRegistry';
import { Metadata } from 'next';
import AnalyticsTracker from 'inx-next-analytics-tracker';
import AnalyticsScript from '@/components/AnalyticsScript';

// Generate dynamic metadata for SEO
export async function generateMetadata({
  params,
  searchParams,
}: {
  params: { tenant?: string; slug?: string[] };
  searchParams: { preview?: string; id?: string };
}): Promise<Metadata> {
  const pageParams = await params;
  const resolvedSearchParams = await searchParams;
  const tenant = pageParams?.tenant;
  const isPreview = resolvedSearchParams?.preview === 'true';
  const pageId = resolvedSearchParams?.id;

  if (!tenant || tenant.includes('.')) {
    return { title: 'Not Found' };
  }

  const slugArr = pageParams?.slug || [];
  const pageSlug = slugArr.join('/');

  try {
    const [tenantDetails, pageData] = await Promise.all([
      getTenant(tenant),
      getPages(pageSlug, tenant, {
        draft: isPreview,
        id: pageId,
      }),
    ]);

    const page = pageData?.docs?.[0];

    if (!page) {
      return { title: 'Page Not Found' };
    }

    // The meta field from SEO plugin
    const meta = page?.meta || {};

    // Build SEO data with proper fallbacks
    const title = meta?.title || page?.title || 'Untitled';
    const description = meta?.description || '';
    const ogImage = meta?.image?.url || meta?.image?.sizes?.og?.url || '/default-og.png';
    const siteName = tenantDetails?.siteName || tenantDetails?.name || tenant;
    const domain = tenantDetails?.domain || `${tenant}.yourdomain.com`;
    const url = `https://${domain}/${pageSlug === 'home' ? '' : pageSlug}`;

    return {
      title: `${title} | ${siteName}`,
      description,
      openGraph: {
        title: `${title} | ${siteName}`,
        description,
        images: ogImage ? [{ url: ogImage, width: 1200, height: 630 }] : [],
        type: 'website',
        url,
        siteName,
      },
      twitter: {
        card: 'summary_large_image',
        title: `${title} | ${siteName}`,
        description,
        images: ogImage ? [ogImage] : [],
      },
      robots: {
        index: !isPreview, // Don't index preview pages
        follow: !isPreview,
      },
      alternates: {
        canonical: url,
      },
    };
  } catch (error) {
    console.error('Failed to generate metadata:', error);
    return {
      title: 'Error',
      description: 'Unable to load page metadata',
    };
  }
}

export default async function DynamicPage({
  params,
  searchParams,
}: {
  params: { tenant?: string; slug?: string[] };
  searchParams: { preview?: string; id?: string };
}) {
  const pageParams = await params;
  const resolvedSearchParams = await searchParams;
  const tenant = pageParams?.tenant;
  if (!tenant || tenant.includes('.')) return null;
  const slugArr = pageParams?.slug || [];
  const pageSlug = slugArr.join('/');

  // Check if we're in preview mode
  const isPreview = resolvedSearchParams?.preview === 'true';
  const pageId = resolvedSearchParams?.id;

  const [tenantDetails, header, footer, pageData] = await Promise.all([
    getTenant(tenant),
    getHeader(tenant),
    getFooter(tenant),
    getPages(pageSlug, tenant, {
      draft: isPreview,
      id: pageId,
    }),
  ]);

  const page = pageData?.docs?.[0];
  if (!tenantDetails || !page) return notFound();

  const gaId: string | undefined = tenantDetails.googleAnalyticsId || undefined;

  // Add preview indicator if in draft mode
  const previewBadge =
    isPreview && page._status === 'draft' ? (
      <div
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          background: '#ff6b6b',
          color: 'white',
          padding: '8px 16px',
          borderRadius: '4px',
          zIndex: 9999,
          fontSize: '14px',
          fontWeight: 'bold',
          boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
        }}
      >
        🚧 DRAFT PREVIEW - Not Published
      </div>
    ) : null;

  return (
    <html lang="en">
      <body>
        <AnalyticsScript GA_ID={gaId} />
        <ThemeRegistry
          tenantTheme={{
            primaryColor: tenantDetails.primaryColor,
            secondaryColor: tenantDetails.secondaryColor,
            fontFamily: tenantDetails.fontFamily,
          }}
        >
          {gaId && <AnalyticsTracker gaId={gaId} />}
          <HeaderRenderer header={header} />
          <BlockRenderer blocks={page?.layout || page?.content} tenant={tenantDetails?.slug} />
          <FooterRenderer footer={footer} />
          {previewBadge}
        </ThemeRegistry>
      </body>
    </html>
  );
}
