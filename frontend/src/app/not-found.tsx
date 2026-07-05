import { routing } from '@/i18n/routing'

export default function RootNotFound() {
  return (
    <html lang={routing.defaultLocale}>
      <body>
        <h1>404 - Page Not Found</h1>
      </body>
    </html>
  )
}
