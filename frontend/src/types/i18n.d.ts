import 'i18next'
import { resources } from '../app/config/i18n'

declare module 'i18next' {
  interface CustomTypeOptions {
    resources: typeof resources['en']; // или ru, если основной язык ru
    defaultNS: 'translation';
  }
}
