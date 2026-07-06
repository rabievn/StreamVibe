'use client'

import { useTranslations } from 'next-intl'
import { useForm } from 'react-hook-form'

import { useRouter } from '@/i18n/navigation'
import { Input } from '@/shared/ui/Input/Input'
import { Button } from '@/shared/ui/Button/Button'
import { Checkbox } from '@/shared/ui/Checkbox/Checkbox'
import { AuthLayout } from '@/widgets/auth-layout'

import styles from '../Auth.module.scss'

type SignInFormValues = {
  userName: string
  password: string
  rememberMe: boolean
}

export const SignIn = () => {
  const t = useTranslations()
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignInFormValues>({
    defaultValues: {
      userName: '',
      password: '',
      rememberMe: false,
    },
    mode: 'onBlur',
  })

  const onSubmit = async (data: SignInFormValues) => {
    console.log('form data:', data)
    router.push('/')
  }

  return (
    <AuthLayout>
      <form className={styles.authForm} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.authFormHeader}>
          <div className={styles.authFormHeaderTitle}>{t('signIn')}</div>
        </div>

        <div className={styles.authFormInputs}>
          <div>
            <Input
              type="text"
              placeholder={t('email')}
              {...register('userName', {
                required: t('validation.usernameRequired'),
                pattern: {
                  value: /^[a-zA-Z0-9_]{3,20}$/,
                  message: t('validation.usernameInvalid'),
                },
              })}
            />
            {errors.userName && (
              <div className={styles.errorText}>{errors.userName.message}</div>
            )}
          </div>

          <div>
            <Input
              type="password"
              placeholder={t('password')}
              {...register('password', {
                required: t('validation.passwordRequired'),
                minLength: {
                  value: 6,
                  message: t('validation.passwordMinLength', { count: 6 }),
                },
              })}
            />
            {errors.password && (
              <div className={styles.errorText}>{errors.password.message}</div>
            )}
          </div>
        </div>

        <div className={styles.authFormEnter}>
          <Button type="submit" color="red" disabled={isSubmitting}>
            {t('signIn')}
          </Button>

          <span>{t('or')}</span>

          <Button
            type="button"
            onClick={() => router.push('/sign-up')}
            color="gray"
          >
            {t('signup')}
          </Button>
        </div>

        <label className={styles.authFormRememberMe}>
          <Checkbox {...register('rememberMe')} />
          {t('rememberMe')}
        </label>

        <span className={styles.captchaText}>{t('captchaText')}</span>
      </form>
    </AuthLayout>
  )
}
