import { BlockRenderer } from '@/components/BlockRenderer'
import FooterRenderer from '@/components/footer/FooterRenderer'
import HeaderRenderer from '@/components/headers/HeaderRenderer'
import { getFooter, getHeader, getPages, getTenant } from '@/lib/api'
import ThemeRegistry from '@/providers/ThemeRegistry'
import { notFound } from 'next/navigation'
import '../../globals.css'

export default async function DynamicPage({ params }: { params: { slug?: string[] } }) {
  const p = await params

  const slugArr = p?.slug || []

  const pageSlug = slugArr?.join('/') || 'home'

  // tenant auto-detected from domain
  const tenantDetails = await getTenant()

  if (!tenantDetails) {
    return notFound()
  }

  const data = await getPages(pageSlug)

  const page = data?.docs?.[0]

  if (!page) {
    return notFound()
  }

  const header = await getHeader()
  const footer = await getFooter()

  return (
    <html lang="en">
      <body>
        <ThemeRegistry themeKey={tenantDetails?.theme || 'green'}>
          <HeaderRenderer header={header} />

          <BlockRenderer blocks={page?.layout || page?.content} tenant={tenantDetails?.slug} />

          <FooterRenderer footer={footer} />
        </ThemeRegistry>
      </body>
    </html>
  )
}
