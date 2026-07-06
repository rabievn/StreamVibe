import React from 'react'

import { LanguageSwitcher } from '@/features/language/switch-language'
import { ThemeSwitcher } from '@/features/theme/switch-theme'
import { StreamVibeIcon } from '@/assets/icons'

import styles from './AuthLayout.module.scss'

type LoginLayoutProps = {
  children: React.ReactNode
}

export const AuthLayout: React.FC<LoginLayoutProps> = ({ children }) => {
  return (
    <div className={styles.auth}>
      <div className={styles.authContainer}>
        <div className={styles.authHeader}>
          <StreamVibeIcon />
          <div className={styles.authHeaderSwitchers}>
            <ThemeSwitcher />
            <LanguageSwitcher />
          </div>
        </div>
        {children}
      </div>
      <div className={styles.authBackground} aria-hidden="true" />
    </div>
  )
}
