import { FC, ReactNode, ComponentProps } from 'react'
import styles from './Button.module.scss'

type ButtonProps = {
  color: 'gray' | 'red'
  children?: ReactNode
} & ComponentProps<'button'>

export const Button: FC<ButtonProps> = ({ children, color, className, ...props }) => {
  return (
    <button
      {...props}
      className={`${styles.button} ${styles[`button--${color}`]} ${className || ''}`}
    >
      {children}
    </button>
  )
}
