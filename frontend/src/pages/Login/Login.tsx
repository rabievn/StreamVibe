import React from 'react'
import { useTranslation } from 'react-i18next'
import './Login.scss'
import { StreamVibeIcon } from '../../assets/icons'

export const Login = () => {
  const { t } = useTranslation()

  return (
    <div className="login">
      <div className="login-container">
        <div className="login-header">
          <StreamVibeIcon />
          <div>123123213</div>
        </div>
        <div className="login-form">
          <div className="login-form__header">{t('login')}</div>
        </div>
      </div>
    </div>
  )
}
