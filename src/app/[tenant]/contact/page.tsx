import { getPages, getTenant } from '@/lib/api'
import ContactTemplate1 from '@/templates/contact/Template1'
import ContactTemplate2 from '@/templates/contact/Template2'
import ContactTemplate3 from '@/templates/contact/Template3'

export default async function ContactPage({ params }: { params: { tenant: string } }) {
  const p1 = await params

  const tenant = await getTenant(p1?.tenant)

  const data = await getPages(p1?.tenant, 'contact')

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

  const selected = tenant?.contactTemplate || 'contact-t1'

  const templates: Record<string, any> = {
    'contact-t1': <ContactTemplate1 />,
    'contact-t2': <ContactTemplate2 />,
    'contact-t3': <ContactTemplate3 />,
  }

  return templates[selected] ?? <ContactTemplate1 />
}
