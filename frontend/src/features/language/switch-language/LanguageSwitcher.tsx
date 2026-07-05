'use client'

import { useLocale } from 'next-intl'

import { usePathname, useRouter } from '@/i18n/navigation'
import type { Locale } from '@/i18n/routing'

import styles from './LanguageSwitcher.module.scss'

export const LanguageSwitcher = () => {
  const locale = useLocale() as Locale
  const router = useRouter()
  const pathname = usePathname()

  const handleChangeLanguage = (lang: Locale) => {
    router.replace(pathname, { locale: lang })
  }

  return (
    <div className={styles.languageSwitcher}>
      <button
        className={locale === 'en' ? styles.active : ''}
        onClick={() => handleChangeLanguage('en')}
      >
        EN
      </button>
      <button
        className={locale === 'ru' ? styles.active : ''}
        onClick={() => handleChangeLanguage('ru')}
      >
        RU
      </button>
    </div>
  )
}
