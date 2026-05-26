import { BlockRenderer } from '@/components/BlockRenderer'
import FooterRenderer from '@/components/footer/FooterRenderer'
import HeaderRenderer from '@/components/headers/HeaderRenderer'
import { getFooter, getHeader, getPages, getTenant } from '@/lib/api'

import { notFound } from 'next/navigation'
import '../../globals.css'
import { ThemeRegistry } from '@/providers/ThemeRegistry'

export default async function DynamicPage({ params }: { params: { tenant?: string; slug?: string[] } }) {
  const p = await params
  const tenant = p?.tenant
  if (!tenant || tenant.includes('.')) return null

  const slugArr = p?.slug || []
  const pageSlug = slugArr.join('/')
  const tenantSlug = p?.tenant ? (p?.tenant ?? null) : null

  // tenant auto-detected from domain

  const tenantDetails = await getTenant(tenantSlug)

  if (!tenantDetails) {
    return notFound()
  }

  const data = await getPages(pageSlug, tenantSlug)

  const page = data?.docs?.[0]

  if (!page) {
    return notFound()
  }

  const header = await getHeader(tenantSlug)
  const footer = await getFooter(tenantSlug)

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
  )
}
