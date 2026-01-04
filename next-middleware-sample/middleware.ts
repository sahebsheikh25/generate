import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();

  // Only set long caching on static file requests
  if (url.pathname.startsWith('/_next/') || url.pathname.startsWith('/assets/') || url.pathname.match(/\.(js|css|png|jpg|jpeg|webp|svg)$/)) {
    const res = NextResponse.next();
    res.headers.set('Cache-Control', 'public, max-age=31536000, immutable');
    return res;
  }

  // Default for HTML / SSR responses
  const res = NextResponse.next();
  res.headers.set('Cache-Control', 'public, max-age=0, must-revalidate');
  return res;
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
