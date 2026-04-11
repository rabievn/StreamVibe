import { useNavigate } from 'react-router-dom'

import { useTranslation } from 'react-i18next'

import { AuthLayout } from '../../../layouts/AuthLayout/AuthLayout'
import { Input } from '../../../shared/ui/Input/Input'
import { Button } from '../../../shared/ui/Button/Button'
import { Checkbox } from '../../../shared/ui/Checkbox/Checkbox'

import styles from '../Auth.module.scss'

export const SignUp = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()

  return (
    <AuthLayout>
      <div className={styles.authForm}>
        <div className={styles.authFormHeader}>
          <div className={styles.authFormHeaderTitle}>{t('signupTitle')}</div>
        </div>
        <div className={styles.authFormInputs}>
          <Input type="text" placeholder={t('email')} />
          <Input type="password" placeholder={t('password')} />
        </div>
        <div className={styles.authFormEnter}>
          <Button onClick={() => navigate('/')} color="red">{t('signup')}</Button>
        </div>
        <div className={styles.authFormRememberMe}>
          <Checkbox />
          {t('rememberMe')}
        </div>
        <span className={styles.captchaText}>{t('captchaText')}</span>
      </div>
    </AuthLayout>
  )
}

