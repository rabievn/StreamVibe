import { forwardRef, ComponentProps } from 'react'

import { CheckIcon } from '@/assets/icons'

import styles from './Checkbox.module.scss'

type CheckboxProps = {
  className?: string
} & ComponentProps<'input'>

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, checked, ...props }, ref) => {
    return (
      <label className={`${styles.checkbox} ${className || ''}`}>
        <input ref={ref} type="checkbox" checked={checked} {...props} />
        {checked && <CheckIcon />}
      </label>
    )
  },
)
