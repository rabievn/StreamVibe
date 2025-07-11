import { useTranslation } from 'react-i18next'
import styles from './Login.module.scss'
import { StreamVibeIcon } from '../../assets/icons'
import { Input } from '../../shared/ui/Input/Input'
import { Button } from '../../shared/ui/Button/Button'

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
          <div className={styles.loginFormInputs}>
            <Input type="text" placeholder={t('email')} />
            <Input type="password" placeholder={t('password')} />
          </div>
          <div className={styles.loginFormEnter}>
            <Button onClick={() => {
            }} color="red">{t('login')}</Button>
            <span>{t('or')}</span>
            <Button onClick={() => {
            }} color="gray">{t('signup')}</Button>
          </div>
        </div>
      </div>
    </div>
  )
}
