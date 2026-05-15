import { BlockRenderer } from '@/components/BlockRenderer'
import { getPages, getTenant } from '@/lib/api'
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

  console.log('tenantDetails', tenantDetails, 'page', page, pageSlug)

  return (
    <html>
      <body>
        <ThemeRegistry themeKey={tenantDetails?.theme || 'green'}>
          <BlockRenderer blocks={page?.layout || page?.content} tenant={tenant} />
        </ThemeRegistry>
      </body>
    </html>
  )
}
