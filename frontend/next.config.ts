import path from 'node:path'
import { fileURLToPath } from 'node:url'
import type { NextConfig } from 'next'
import createNextIntlPlugin from 'next-intl/plugin'

const rootDir = path.dirname(fileURLToPath(import.meta.url))
const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts')

const nextConfig: NextConfig = {
  sassOptions: {},
  turbopack: {
    root: rootDir,
  },
  allowedDevOrigins: ['192.168.1.105', 'localhost'],
  async redirects() {
    return [
      { source: '/', destination: '/en', permanent: false },
      { source: '/sign-in', destination: '/en/sign-in', permanent: false },
      { source: '/sign-up', destination: '/en/sign-up', permanent: false },
      { source: '/explore', destination: '/en/explore', permanent: false },
      { source: '/library', destination: '/en/library', permanent: false },
      { source: '/search', destination: '/en/search', permanent: false },
      { source: '/signin', destination: '/en/sign-in', permanent: false },
      { source: '/signIn', destination: '/en/sign-in', permanent: false },
      { source: '/signup', destination: '/en/sign-up', permanent: false },
      { source: '/signUp', destination: '/en/sign-up', permanent: false },
    ]
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://localhost:5000/api/:path*',
      },
    ]
  },
}

export default withNextIntl(nextConfig)
