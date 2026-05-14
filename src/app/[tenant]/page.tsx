import { BlockRenderer } from '@/components/BlockRenderer'
import { getPages } from '@/lib/api'

export default async function HomePage({ params }: { params: { tenant: string } }) {
  const p1 = await params

  const tenant = p1?.tenant

  const data = await getPages(tenant, 'home')
  const page = data?.docs?.[0]

  return (
    <div>
      <BlockRenderer blocks={page?.layout} tenant={tenant} />
    </div>
  )
}
