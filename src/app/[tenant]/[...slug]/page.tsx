import { BlockRenderer } from '@/components/BlockRenderer';
import FooterRenderer from '@/components/footer/FooterRenderer';
import HeaderRenderer from '@/components/headers/HeaderRenderer';
import { getFooter, getHeader, getPages, getTenant } from '@/lib/api';

import { notFound } from 'next/navigation';
import '../../globals.css';
import { ThemeRegistry } from '@/providers/ThemeRegistry';

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
        <ThemeRegistry>
          <HeaderRenderer header={header} />
          <BlockRenderer blocks={page?.layout || page?.content} tenant={tenantDetails?.slug} />
          <FooterRenderer footer={footer} />
        </ThemeRegistry>
      </body>
    </html>
  );
}
