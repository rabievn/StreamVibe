import React from 'react'
import { useTranslation } from 'react-i18next'

export const Login = () => {
  const { t } = useTranslation()


  return (
    <div>
      <p>{t('welcome')}</p>

    </div>
  )
}
