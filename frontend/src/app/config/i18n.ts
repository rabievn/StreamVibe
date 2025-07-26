// app/config/i18n.ts
import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

import en from '../../assets/locales/en.json'
import ru from '../../assets/locales/ru.json'

export const resources = {
  en: { translation: en },
  ru: { translation: ru }
} as const

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    interpolation: { escapeValue: false }
  })

export default i18n
