import React from 'react'
import { StreamVibeIcon } from '../../assets/icons'
import { SchemeButton } from '../../shared/ui/SchemeButton/SchemeButton'
import styles from './AuthLayout.module.scss'

type LoginLayoutProps = {
  children: React.ReactNode;
}

export const AuthLayout: React.FC<LoginLayoutProps> = ({ children }) => {

  return (
    <div className={styles.auth}>
      <div className={styles.authContainer}>
        <div className={styles.authHeader}>
          <StreamVibeIcon />
          <div className={styles.authHeaderScheme}>
            <SchemeButton />
          </div>
        </div>
        {children}
      </div>
    </div>
  )
}



