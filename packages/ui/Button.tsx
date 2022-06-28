import React from 'react'
import clsx from 'clsx'

export type ButtonProps = {
  disabled?: boolean
  block?: boolean
  onClick?: () => void
  loading?: boolean
  children: React.ReactNode | string
}

export const Button: React.FC<ButtonProps> = ({
  disabled = false,
  onClick,
  block,
  loading,
  children,
}) => (
  <button
    type="button"
    className={clsx(
      'flex items-center justify-center rounded-md border border-transparent bg-indigo-600 py-3 px-8 text-base font-medium text-white hover:bg-indigo-700 md:py-4 md:px-10 md:text-lg',
      {
        'w-full': block,
        'cursor-not-allowed opacity-50': disabled,
        'cursor-wait': loading,
      }
    )}
    disabled={disabled || loading}
    onClick={onClick}
  >
    {children}
  </button>
)
