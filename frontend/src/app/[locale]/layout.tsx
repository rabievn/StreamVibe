import type { Metadata } from 'next'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages, setRequestLocale } from 'next-intl/server'
import { notFound } from 'next/navigation'

import { manrope } from '@/_app/fonts'
import { Providers } from '@/_app/providers'
import { routing, type Locale } from '@/i18n/routing'

import '@/_app/styles/globals.scss'

export const metadata: Metadata = {
  title: 'StreamVibe',
  description:
    'StreamVibe — современный стриминговый сервис с лучшими функциями и удобным интерфейсом.',
  keywords: ['StreamVibe', 'видео', 'стриминг', 'фильмы', 'сериалы', 'музыка'],
}

type LocaleLayoutProps = {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const { locale } = await params

  if (!routing.locales.includes(locale as Locale)) {
    notFound()
  }

  const currentLocale = locale as Locale

  setRequestLocale(currentLocale)
  const messages = await getMessages()

  return (
    <html
      lang={currentLocale}
      className={`dark ${manrope.variable}`}
      suppressHydrationWarning
    >
      <body className={manrope.className}>
        <NextIntlClientProvider messages={messages}>
          <Providers>
            <div className="app-root">{children}</div>
          </Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
