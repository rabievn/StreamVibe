import styles from './Checkbox.module.scss'
import { useState } from 'react'
import { CheckIcon } from '../../../assets/icons'

export const Checkbox = () => {
  const [checked, setChecked] = useState<boolean>(false)

  return (
    <label className={styles.checkbox}>
      <input
        type="checkbox"
        checked={checked}
        onChange={() => setChecked(!checked)}
      />
      {checked && <CheckIcon />}
    </label>
  )
}

