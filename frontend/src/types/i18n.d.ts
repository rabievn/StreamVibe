// types/i18next.d.ts
import 'i18next'
import { resources } from '../app/config/i18n'

type DefaultResources = typeof resources['en']['translation']

declare module 'i18next' {
  interface CustomTypeOptions {
    resources: {
      translation: DefaultResources
    }
    defaultNS: 'translation'
  }
}
