import { ButtonProps, ButtonVariant } from './types'
import { styles } from '@/utils/styles'

export const Button = ({ 
  children, 
  variant = 'primary', 
  className = '',
  ...props 
}: ButtonProps) => {
  const buttonStyles: Record<ButtonVariant, string> = {
    primary: 'bg-indigo-600 text-white hover:bg-indigo-700',
    secondary: 'bg-gray-200 text-gray-900 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-100 dark:hover:bg-gray-600',
    ghost: 'bg-transparent hover:bg-gray-100 dark:hover:bg-gray-800'
  }

  return (
    <button 
      className={`${styles.button.base} ${buttonStyles[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
} 