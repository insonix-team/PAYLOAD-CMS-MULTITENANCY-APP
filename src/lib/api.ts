import { getCurrentDomain } from './tenant'

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || process.env.NEXT_PUBLIC_SITE_URL || `http://localhost:${process.env.PORT || 3000}`
const isServer = typeof window === 'undefined'
const isLocal = process.env.NODE_ENV === 'development'

console.log('---->', isLocal, isServer, BASE_URL)
export const getTenant = async (tenantSlug: string | null = null) => {
  const query = isLocal
    ? {
        field: 'slug',
        value: tenantSlug,
      }
    : {
        field: 'domain',
        value: await getCurrentDomain(),
      }

  const where = {
    [query.field]: {
      equals: query.value,
    },
  }
  console.log('where--->', where)

  // Server-side
  if (isServer) {
    console.log('isServer--->', isServer)

    const { getPayload } = await import('payload')
    const configModule = await import('@payload-config')

    const payload = await getPayload({
      config: (configModule as any).default,
    })

    const result = await payload.find({
      collection: 'tenants',
      where,
      depth: 0,
    })
    console.log('Result--->', result)
    return result?.docs?.[0]
  }

  // Client-side
  const encodedValue = encodeURIComponent(query.value || '')

  const res = await fetch(`${BASE_URL}/api/tenants?where[${query.field}][equals]=${encodedValue}`, {
    cache: 'no-store',
  })
  console.log('encodedValue--->', encodedValue)

  const data = await res.json()
  console.log('data--->', data)

  return data?.docs?.[0]
}

export const getHeader = async (tenantSlug: string | null = null) => {
  const tenant = await getTenant(tenantSlug || undefined)

  if (!tenant) {
    return null
  }

  const { getPayload } = await import('payload')
  const configModule = await import('@payload-config')

  const payload = await getPayload({
    config: (configModule as any).default,
  })

  const result = await payload.find({
    collection: 'headers',
    where: {
      tenant: {
        equals: tenant.id,
      },
    },

    limit: 1,
    depth: 2,
  })

  return result?.docs[0]?.layout || null
}

export const getFooter = async (tenantSlug: string | null = null) => {
  const tenant = await getTenant(tenantSlug || undefined)

  if (!tenant) {
    return null
  }

  const { getPayload } = await import('payload')
  const configModule = await import('@payload-config')

  const payload = await getPayload({
    config: (configModule as any).default,
  })

  const result = await payload.find({
    collection: 'footers',

    where: {
      tenant: {
        equals: tenant.id,
      },
    },

    limit: 1,
    depth: 2,
  })

  return result.docs[0]?.layout || null
}

export const getPages = async (slug: string, tenantSlug: string | null = null) => {
  const tenant = await getTenant(tenantSlug || undefined)

  if (!tenant) {
    console.log('Tenant not found')
    return { docs: [] }
  }

  if (isServer) {
    const { getPayload } = await import('payload')
    const configModule = await import('@payload-config')
    const payload = await getPayload({ config: (configModule as any).default })
    const result = await payload.find({
      collection: 'pages',
      where: { tenant: { equals: tenant.id }, slug: { equals: slug } },
      depth: 3,
    })
    return result
  }

  const encodedSlug = encodeURIComponent(slug || '')
  const res = await fetch(`${BASE_URL}/api/pages?where[tenant][equals]=${tenant.id}&where[slug][equals]=${encodedSlug}`, { cache: 'no-store' })

  return res.json()
}
