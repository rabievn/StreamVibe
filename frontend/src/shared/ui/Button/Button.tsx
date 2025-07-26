import styles from './Button.module.scss'

type ButtonProps = {
  color: 'gray' | 'red'
  children?: React.ReactNode
  onClick: () => void
}

export const Button: React.FC<ButtonProps> = ({ children, color, onClick }) => {
  return (
    <button onClick={onClick} className={`${styles.button} ${styles[`button--${color}`]}`}>
      {children}
    </button>
  )
}

