import { ButtonHTMLAttributes, ReactNode } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  isLoading?: boolean
}

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  isLoading,
  disabled,
  className = '',
  ...props
}: ButtonProps) {
  const baseClasses =
    'inline-flex items-center justify-center rounded-lg font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed'

  const variantClasses = {
    primary: 'bg-brand-500 text-white hover:bg-brand-600 active:scale-95',
    secondary: 'bg-gray-100 text-gray-900 hover:bg-gray-200 active:scale-95',
    ghost: 'text-gray-600 hover:bg-gray-100 active:scale-95',
  }

  const sizeClasses = {
    sm: 'px-2 py-1 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  }

  return (
    <button
      disabled={disabled || isLoading}
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      {...props}
    >
      {isLoading ? <span className="animate-spin mr-2">⟳</span> : null}
      {children}
    </button>
  )
}
