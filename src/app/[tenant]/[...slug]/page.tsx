import { BlockRenderer } from '@/components/BlockRenderer';
import FooterRenderer from '@/components/footer/FooterRenderer';
import HeaderRenderer from '@/components/headers/HeaderRenderer';
import { getFooter, getHeader, getPages, getTenant } from '@/lib/api';

import { notFound } from 'next/navigation';
import '../../globals.css';
import { ThemeRegistry } from '@/providers/ThemeRegistry';
import { Metadata } from 'next';

// Generate dynamic metadata for SEO
export async function generateMetadata({
  params,
}: {
  params: { tenant?: string; slug?: string[] };
}): Promise<Metadata> {
  const pageParams = await params;
  const tenant = pageParams?.tenant;

  if (!tenant || tenant.includes('.')) {
    return { title: 'Not Found' };
  }

  const slugArr = pageParams?.slug || [];
  const pageSlug = slugArr.join('/');

  try {
    const [tenantDetails, pageData] = await Promise.all([
      getTenant(tenant),
      getPages(pageSlug, tenant),
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
        index: true,
        follow: true,
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
}: {
  params: { tenant?: string; slug?: string[] };
}) {
  const pageParams = await params;
  const tenant = pageParams?.tenant;
  if (!tenant || tenant.includes('.')) return null;
  const slugArr = pageParams?.slug || [];
  const pageSlug = slugArr.join('/');
  const [tenantDetails, header, footer, pageData] = await Promise.all([
    getTenant(tenant),
    getHeader(tenant),
    getFooter(tenant),
    getPages(pageSlug, tenant),
  ]);

  const page = pageData?.docs?.[0];
  if (!tenantDetails || !page) return notFound();

  return (
    <html lang="en">
      <body>
        <ThemeRegistry
          tenantTheme={{
            primaryColor: tenantDetails.primaryColor,
            secondaryColor: tenantDetails.secondaryColor,
            fontFamily: tenantDetails.fontFamily,
          }}
        >
          <HeaderRenderer header={header} />
          <BlockRenderer blocks={page?.layout || page?.content} tenant={tenantDetails?.slug} />
          <FooterRenderer footer={footer} />
        </ThemeRegistry>
      </body>
    </html>
  );
}
