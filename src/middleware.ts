// middleware.ts
import { NextRequest, NextResponse } from 'next/server'

export function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname

  // ONLY IN DEVELOPMENT
  if (process.env.NODE_ENV === 'development') {
    const host = req.headers.get('host') || ''
    const isLocalhost = host.includes('localhost')

    if (isLocalhost) {
      // Extract potential tenant from path
      const segments = pathname.split('/').filter(Boolean)
      const possibleTenant = segments[0]
      console.log(possibleTenant, 'possibleTenant')

      if (possibleTenant) {
        const remainingPath = segments.slice(1).join('/')
        const url = req.nextUrl.clone()
        url.pathname = `/${possibleTenant}/${remainingPath}`
        console.log(`[Dev] Rewriting: ${pathname} -> ${url.pathname}`)
        return NextResponse.rewrite(url)
      }
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
}
