import i18next from 'i18next'
import { useDispatch, useSelector } from 'react-redux'
import { selectLanguage } from '../../model/languageSelectors'
import { setLanguage } from '../../model/languageSlice'
import styles from './LanguageSwitcher.module.scss'

export const LanguageSwitcher = () => {
  const dispatch = useDispatch()
  const currentLang = useSelector(selectLanguage)

  const handleChangeLanguage = (lang: 'en' | 'ru') => {
    dispatch(setLanguage(lang))
    i18next.changeLanguage(lang)
  }

  return (
    <div className={styles.languageSwitcher}>
      <button className={`${currentLang === 'en' ? styles.active : ''}`} onClick={() => handleChangeLanguage('en')}>EN
      </button>
      <button className={`${currentLang === 'ru' ? styles.active : ''}`} onClick={() => handleChangeLanguage('ru')}>RU
      </button>
    </div>

  )
}

