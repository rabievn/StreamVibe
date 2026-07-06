'use client'

import { MoonIcon, SunIcon } from '@/assets/icons'
import { useTheme } from '@/shared/lib/theme'

import styles from './ThemeSwitcher.module.scss'

export const ThemeSwitcher = () => {
  const { setMode, mode } = useTheme()

  return (
    <div className={styles.themeSwitcher}>
      <button
        className={`${mode === 'light' ? styles.active : ''}`}
        onClick={() => setMode('light')}
      >
        <SunIcon />
      </button>

      <button
        className={`${mode === 'dark' ? styles.active : ''}`}
        onClick={() => setMode('dark')}
      >
        <MoonIcon />
      </button>
    </div>
  )
}
