import styles from './SchemeSwitcher.module.scss'
import { MoonIcon, SunIcon } from '../../../assets/icons'

export const SchemeSwitcher = () => {
  return (
    <div className={`${styles.schemeButton}`}>
      <button><SunIcon /></button>
      <button><MoonIcon /></button>
    </div>
  )
}

