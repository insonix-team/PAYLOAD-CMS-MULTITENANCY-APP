const BASE_URL = process.env.NEXT_PUBLIC_API_URL || process.env.NEXT_PUBLIC_SITE_URL || `http://localhost:${process.env.PORT || 3000}`
const isServer = typeof window === 'undefined'

export const getTenant = async (slug: string) => {
  const encoded = encodeURIComponent(slug || '')

  if (isServer) {
    const { getPayload } = await import('payload')
    const configModule = await import('@payload-config')
    const payload = await getPayload({ config: (configModule as any).default })
    const result = await payload.find({
      collection: 'tenants',
      where: { slug: { equals: slug } },
      depth: 0,
    })
    return result?.docs?.[0]
  }

  const res = await fetch(`${BASE_URL}/api/tenants?where[slug][equals]=${encoded}`, {
    cache: 'no-store',
  })
  const data = await res.json()

  return data?.docs?.[0]
}

export const getHeader = async (tenantSlug: string) => {
  const tenant = await getTenant(tenantSlug)

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

export const getFooter = async (tenantSlug: string) => {
  const tenant = await getTenant(tenantSlug)

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

export const getPages = async (tenantSlug: string, slug: string) => {
  const tenant = await getTenant(tenantSlug)

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
