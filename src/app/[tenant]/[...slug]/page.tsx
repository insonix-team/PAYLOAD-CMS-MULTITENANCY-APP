import { BlockRenderer } from '@/components/BlockRenderer'
import FooterRenderer from '@/components/footer/FooterRenderer'
import HeaderRenderer from '@/components/headers/HeaderRenderer'
import { getFooter, getHeader, getPages, getTenant } from '@/lib/api'
import ThemeRegistry from '@/providers/ThemeRegistry'
import { notFound } from 'next/navigation'

export default async function DynamicPage({ params }: { params: { tenant: string; slug?: string[] } }) {
  const p = await params
  const tenant = p?.tenant
  if (!tenant || tenant.includes('.')) return null

  const slugArr = p?.slug || []
  const pageSlug = slugArr.join('/')

  const data = await getPages(tenant, pageSlug)
  const page = data?.docs?.[0]

  if (!page) return notFound()

  const tenantDetails = await getTenant(tenant)
  const header = await getHeader(tenantDetails?.slug || '')
  const footer = await getFooter(tenantDetails?.slug || '')
  return (
    <html>
      <body style={{ margin: 0, padding: 0, boxSizing: 'border-box' }}>
        <ThemeRegistry themeKey={tenantDetails?.theme || 'green'}>
          <HeaderRenderer header={header} />
          <BlockRenderer blocks={page?.layout || page?.content} tenant={tenant} />
          <FooterRenderer footer={footer} />
        </ThemeRegistry>
      </body>
    </html>
  )
}
