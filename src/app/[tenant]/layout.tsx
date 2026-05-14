import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import { getLayout, getTenant } from '@/lib/api'
import ThemeRegistry from '@/providers/ThemeRegistry'

export default async function TenantLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: any
}) {
  const p1 = await params
  const tenant = p1?.tenant

  const header = await getLayout(tenant, 'header')
  const footer = await getLayout(tenant, 'footer')
  const tenantDetails = await getTenant(tenant)
  console.log('tenant', tenantDetails)

  const headerData = header?.docs?.[0]?.layout?.[0]
  const footerData = footer?.docs?.[0]?.layout?.[0]

  return (
    <html>
      <body>
        <ThemeRegistry themeKey={tenantDetails?.theme || 'green'}>
          <Header data={headerData} tenant={tenant} />
          {children}
          <Footer data={footerData} />
        </ThemeRegistry>
      </body>
    </html>
  )
}
