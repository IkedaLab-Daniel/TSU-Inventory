import { NextRequest, NextResponse } from 'next/server'
import { COOKIE_NAME } from './lib/auth'

const PUBLIC_PATHS = ['/login', '/forgot-password', '/terms', '/privacy']

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const session = request.cookies.get(COOKIE_NAME)?.value

  // Allow Next.js internals and static files
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.match(/\.(ico|png|svg|jpg|jpeg|webp|css|js)$/)
  ) {
    return NextResponse.next()
  }

  const isPublicPath = PUBLIC_PATHS.some(p => pathname.startsWith(p))

  // Redirect unauthenticated users to login
  if (!isPublicPath && !session) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  // Redirect authenticated users away from login
  if (pathname === '/login' && session) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
}
