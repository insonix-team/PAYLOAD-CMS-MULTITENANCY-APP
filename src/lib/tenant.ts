import { headers } from 'next/headers'

export const getCurrentDomain = async () => {
  const headersList = await headers()
  const host = headersList.get('x-forwarded-host') || headersList.get('host')
  return host
}
