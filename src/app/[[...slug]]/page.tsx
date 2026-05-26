import { BlockRenderer } from '@/components/BlockRenderer'
import FooterRenderer from '@/components/footer/FooterRenderer'
import HeaderRenderer from '@/components/headers/HeaderRenderer'
import { getFooter, getHeader, getPages, getTenant } from '@/lib/api'
import { notFound } from 'next/navigation'
import '../globals.css'
import { ThemeRegistry } from '@/providers/ThemeRegistry'

export default async function DynamicPage({ params }: { params: { slug?: string[] } }) {
  const ppageParams = await params
  const slugArr = ppageParams?.slug || []
  const pageSlug = slugArr?.join('/') || 'home'
  const [tenant, pageData, header, footer] = await Promise.all([getTenant(), getPages(pageSlug), getHeader(), getFooter()])
  const page = pageData?.docs?.[0]

  if (!tenant || !page) return notFound()

  return (
    <html lang="en">
      <body>
        <ThemeRegistry>
          <HeaderRenderer header={header} />
          <BlockRenderer blocks={page?.layout || page?.content} tenant={tenant?.slug} />
          <FooterRenderer footer={footer} />
        </ThemeRegistry>
      </body>
    </html>
  )
}
