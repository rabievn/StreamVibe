import React from 'react'
import { StreamVibeIcon } from '../../assets/icons'
import { SchemeSwitcher } from '../../shared/ui/SchemeButton/SchemeSwitcher'
import styles from './AuthLayout.module.scss'
import { Images } from '../../assets'
import { LanguageSwitcher } from '../../shared/ui/LanguageButton/LanguageSwitcher'


type LoginLayoutProps = {
  children: React.ReactNode;
}

export const AuthLayout: React.FC<LoginLayoutProps> = ({ children }) => {

  return (
    <div className={styles.auth}>
      <div className={styles.authContainer}>
        <div className={styles.authHeader}>
          <StreamVibeIcon />
          <div className={styles.authHeaderSwitchers}>
            <SchemeSwitcher />
            <LanguageSwitcher />
          </div>
        </div>
        {children}
      </div>
      <div className={styles.authBackground}>
        <img src={Images.moviesCards} alt="Movies cards" />
        <img src={Images.blackWave} alt="Movies cards" />
      </div>
    </div>
  )
}



