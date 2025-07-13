import styles from './SchemeButton.module.scss'
import { MoonIcon, SunIcon } from '../../../assets/icons'

export const SchemeButton = () => {
  return (
    <div className={`${styles.schemeButton}`}>
      <button><SunIcon /></button>
      <button><MoonIcon /></button>
    </div>
  )
}

