import { SvgLoader } from '@/components/svg-loader.component';
import { CustomButtonProps } from '@/types';
import { memo } from 'react';

const baseButtonClasses =
  'flex items-center justify-center gap-2 rounded-md font-medium focus:outline-none focus:ring-2 transition-colors duration-200 disabled:cursor-not-allowed cursor-pointer';
const variantStyles = {
  primary:
    'bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-indigo-500 disabled:bg-indigo-400',
  secondary:
    'bg-gray-600 text-white hover:bg-gray-700 focus:ring-gray-500 disabled:bg-gray-400',
  outline:
    'border border-indigo-600 text-indigo-600 hover:bg-indigo-50 dark:hover:bg-neutral-800 focus:ring-indigo-500 disabled:border-indigo-300 disabled:text-indigo-300',
};

const sizeStyles = {
  sm: 'px-3 py-1 text-sm',
  md: 'px-4 py-2 text-base',
  lg: 'px-6 py-3 text-lg',
};

export const CustomButton = memo(
  ({
    children,
    variant = 'primary',
    size = 'md',
    prependIcon,
    appendIcon,
    className = '',
    disabled = false,
    loading = false,
    type = 'button',
    ...otherProps
  }: CustomButtonProps) => {
    return (
      <button
        className={`${baseButtonClasses} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
        disabled={disabled || loading}
        aria-busy={loading}
        type={type}
        {...otherProps}
      >
        {loading ? (
          <SvgLoader width={24} height={24} name="spinner" />
        ) : (
          <>
            {prependIcon && <SvgLoader name={prependIcon} />}
            {children}
            {appendIcon && <SvgLoader name={appendIcon} />}
          </>
        )}
      </button>
    );
  },
);
