// src/lib/api.ts

const BASE_URL = process.env.NEXT_PUBLIC_API_URL
// log for debugging during development

export const getTenant = async (slug: string) => {
  const res = await fetch(`${BASE_URL}/api/tenants?where[slug][equals]=${slug}`, {
    cache: 'no-store',
  })
  const data = await res.json()
  console.log(data)

  return data?.docs?.[0]
}

export const getPages = async (tenantSlug: string, slug: string) => {
  const tenant = await getTenant(tenantSlug)

  if (!tenant) {
    console.log('Tenant not found')
    return { docs: [] }
  }

  const res = await fetch(
    `${BASE_URL}/api/pages?where[tenant][equals]=${tenant.id}&where[slug][equals]=${slug}`,
    { cache: 'no-store' },
  )

  return res.json()
}

export const getLayout = async (tenant: string, type: 'header' | 'footer') => {
  if (!tenant || tenant.includes('.') || tenant === 'favicon.ico') return null

  // If running on the server, prefer using Payload's server SDK to query the
  // `layouts` collection directly with `overrideAccess: true` so we don't hit
  // REST auth/access-control restrictions for internal requests.
  if (typeof window === 'undefined') {
    try {
      const { getPayload } = await import('payload')
      const payloadConfig = (await import('@/payload.config')).default
      const payload = await getPayload({ config: payloadConfig })

      const result = await payload.find({
        collection: 'layouts',
        depth: 0,
        limit: 1,
        where: {
          and: [{ type: { equals: type } }, { 'tenant.slug': { equals: tenant } }],
        },
        overrideAccess: true,
      })

      return result
    } catch (err) {
      console.log('getLayout (payload SDK) error', err)
      // fallthrough to REST fallback
    }
  }

  // Client-side or SDK fallback: call the REST endpoint. Keep headers minimal
  // — client requests shouldn't include the secret.
  const base = BASE_URL || ''
  const url = `${base}/api/layouts?where[type][equals]=${type}&where[tenant.slug][equals]=${encodeURIComponent(
    tenant,
  )}`

  const res = await fetch(url, { cache: 'no-store' })

  if (!res.ok) {
    try {
      const body = await res.json()
      console.log('getLayout error', res.status, body)
      return body
    } catch (e) {
      console.log('getLayout unknown error', res.status)
      return { errors: [{ message: `HTTP ${res.status}` }] }
    }
  }

  return res.json()
}
