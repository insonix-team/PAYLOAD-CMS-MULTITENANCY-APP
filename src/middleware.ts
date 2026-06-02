// middleware.ts
import { NextRequest, NextResponse } from 'next/server';

export function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;

  const host = req.headers.get('host') || '';
  const isLocalhost = host.includes('localhost');

  // ONLY IN DEVELOPMENT
  if (isLocalhost && pathname.startsWith('/admin')) {
    // Extract potential tenant from path
    const segments = pathname.split('/').filter(Boolean);
    const possibleTenant = segments[0];

    if (possibleTenant) {
      const remainingPath = segments.slice(1).join('/');
      const url = req.nextUrl.clone();
      url.pathname = `/${possibleTenant}/${remainingPath}`;
      return NextResponse.rewrite(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
