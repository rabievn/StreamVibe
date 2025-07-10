import styles from './Input.module.scss'

type InputProps = {
  placeholder?: string
  type: 'text' | 'password' | 'email'
}

export const Input: React.FC<InputProps> = ({ placeholder, type }) => {

  return (
    <input type={type} className={styles.input} placeholder={placeholder} />
  )
}

