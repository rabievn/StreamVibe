import React from 'react'
import { useTranslation } from 'react-i18next'
import styles from './Login.module.scss'
import { StreamVibeIcon } from '../../assets/icons'

export const Login = () => {
  const { t } = useTranslation()

  return (
    <div className={styles.login}>
      <div className={styles.loginContainer}>
        <div className={styles.loginHeader}>
          <StreamVibeIcon />
          <div>123123213</div>
        </div>
        <div className={styles.loginForm}>
          <div className={styles.loginFormHeader}>
            <div className={styles.loginFormHeaderTitle}>{t('login')}</div>
          </div>
        </div>
      </div>
    </div>
  )
}
