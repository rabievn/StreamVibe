import { forwardRef, ComponentProps } from 'react'
import styles from './Input.module.scss'

type InputProps = ComponentProps<'input'>

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={`${styles.input} ${className ?? ''}`}
        {...props}
      />
    )
  }
)

Input.displayName = 'Input'