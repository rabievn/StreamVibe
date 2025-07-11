import { MoonIcon, SunIcon } from '../../../assets/icons'
import styles from './SchemeButton.module.scss'

export const SchemeButton = () => {
  return (
    <div className={`${styles.schemeButton}`}>
      <button><SunIcon /></button>
      <button><MoonIcon /></button>
    </div>
  )
}

