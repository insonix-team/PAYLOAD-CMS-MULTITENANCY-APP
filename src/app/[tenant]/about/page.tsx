import { getPages, getTenant } from '@/lib/api'
import AboutTemplate1 from '@/templates/about/Template1'
import AboutTemplate2 from '@/templates/about/Template2'
import AboutTemplate3 from '@/templates/about/Template3'

export default async function AboutPage({ params }: { params: { tenant: string } }) {
  const p1 = await params

  const tenant = await getTenant(p1?.tenant)

  const data = await getPages(p1?.tenant, 'about')

  const page = data?.docs?.[0]

  if (page) {
    return (
      <div>
        <h1>{page?.title}</h1>

        <div
          dangerouslySetInnerHTML={{
            __html: page?.content || '',
          }}
        />
      </div>
    )
  }

  const selected = tenant?.aboutTemplate || 'about-t1'
  console.log(selected, page)

  const templates: Record<string, any> = {
    'about-t1': <AboutTemplate1 />,
    'about-t2': <AboutTemplate2 />,
    'about-t3': <AboutTemplate3 />,
  }

  return templates[selected] ?? <AboutTemplate1 />
}
