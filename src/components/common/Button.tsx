import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'dark' | 'whatsapp' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
  href?: string;
  target?: string;
  rel?: string;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  leftIcon,
  rightIcon,
  fullWidth = false,
  className,
  disabled,
  href,
  target,
  rel,
  ...props
}) => {
  const baseStyles =
    'inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-charcoal-950 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer text-center';

  const sizeStyles = {
    sm: 'text-xs px-3.5 py-2 gap-1.5',
    md: 'text-sm px-5 py-2.5 gap-2',
    lg: 'text-base px-6 py-3.5 gap-2.5 font-bold',
  };

  const variantStyles = {
    primary:
      'bg-brand-700 hover:bg-brand-600 active:bg-brand-800 text-white shadow-md shadow-brand-700/20 focus:ring-brand-600 active:scale-[0.98]',
    secondary:
      'bg-charcoal-100 dark:bg-charcoal-800 hover:bg-charcoal-200 dark:hover:bg-charcoal-700 text-charcoal-900 dark:text-white border border-charcoal-200 dark:border-charcoal-700 focus:ring-charcoal-500 active:scale-[0.98]',
    outline:
      'bg-transparent hover:bg-charcoal-100 dark:hover:bg-charcoal-850 text-charcoal-800 dark:text-charcoal-200 hover:text-charcoal-950 dark:hover:text-white border border-charcoal-300 dark:border-charcoal-700 hover:border-charcoal-400 dark:hover:border-charcoal-500 focus:ring-charcoal-400',
    dark:
      'bg-charcoal-900 dark:bg-charcoal-900 hover:bg-charcoal-800 text-white border border-charcoal-800 focus:ring-brand-600',
    whatsapp:
      'bg-emerald-600 hover:bg-emerald-500 text-white shadow-md shadow-emerald-600/20 focus:ring-emerald-500 active:scale-[0.98]',
    ghost:
      'bg-transparent hover:bg-charcoal-100 dark:hover:bg-charcoal-800 text-charcoal-700 dark:text-charcoal-300 hover:text-charcoal-950 dark:hover:text-white focus:ring-charcoal-500',
  };

  const combinedClasses = twMerge(
    clsx(
      baseStyles,
      sizeStyles[size],
      variantStyles[variant],
      fullWidth && 'w-full',
      className
    )
  );

  const content = (
    <>
      {isLoading && (
        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-current" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      )}
      {!isLoading && leftIcon}
      <span>{children}</span>
      {!isLoading && rightIcon}
    </>
  );

  if (href) {
    return (
      <a
        href={href}
        target={target}
        rel={rel || (target === '_blank' ? 'noopener noreferrer' : undefined)}
        className={combinedClasses}
      >
        {content}
      </a>
    );
  }

  return (
    <button className={combinedClasses} disabled={disabled || isLoading} {...props}>
      {content}
    </button>
  );
};
