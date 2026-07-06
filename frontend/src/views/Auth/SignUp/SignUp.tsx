'use client'

import { useTranslations } from 'next-intl'

import { useRouter } from '@/i18n/navigation'
import { AuthLayout } from '@/widgets/auth-layout'
import { Input } from '@/shared/ui/Input/Input'
import { Button } from '@/shared/ui/Button/Button'
import { Checkbox } from '@/shared/ui/Checkbox/Checkbox'

import styles from '../Auth.module.scss'

export const SignUp = () => {
  const t = useTranslations()
  const router = useRouter()

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
          <Button onClick={() => router.push('/')} color="red">
            {t('signup')}
          </Button>
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
