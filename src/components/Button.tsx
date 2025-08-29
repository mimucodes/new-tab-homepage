import styles from './Button.module.css'
import { ButtonHTMLAttributes, ReactNode } from 'react'

type ButtonVariant = 'primary' | 'secondary' | 'icon'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  children: ReactNode
  showOnHover?: boolean
  absolutePosition?: boolean
}

export function Button({
  type = 'button',
  variant = 'secondary',
  children,
  showOnHover = false,
  absolutePosition = false,
  ...props
}: ButtonProps) {
  const showClass = showOnHover ? 'hover-show' : ''
  const positionClass = absolutePosition ? 'top-right' : ''
  const merged = `${styles[variant]} ${showClass} ${positionClass}`.trim()

  return (
    <button type={type} className={merged} {...props}>
      {children}
    </button>
  )
}
