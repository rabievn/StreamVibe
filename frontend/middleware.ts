import createMiddleware from 'next-intl/middleware'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

import { routing } from '@/i18n/routing'

const intlMiddleware = createMiddleware(routing)

const authPaths = ['/sign-in', '/sign-up']

function getPathnameWithoutLocale(pathname: string) {
  const segments = pathname.split('/').filter(Boolean)
  const firstSegment = segments[0]

  if (firstSegment && routing.locales.includes(firstSegment as 'en' | 'ru')) {
    const rest = segments.slice(1).join('/')
    return rest ? `/${rest}` : '/'
  }

  return pathname
}

export default function middleware(request: NextRequest) {
  const token = request.cookies.get('accessToken')?.value
  const { pathname } = request.nextUrl
  const pathnameWithoutLocale = getPathnameWithoutLocale(pathname)
  const isAuthPage = authPaths.some((path) => pathnameWithoutLocale.startsWith(path))

  if (token && isAuthPage) {
    const localeSegment = pathname.split('/')[1]
    const locale = routing.locales.includes(localeSegment as 'en' | 'ru')
      ? localeSegment
      : routing.defaultLocale

    return NextResponse.redirect(new URL(`/${locale}`, request.url))
  }

  return intlMiddleware(request)
}

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
}
