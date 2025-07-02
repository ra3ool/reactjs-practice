import { useState, useId, memo } from 'react';
import { SvgLoader } from '@/components';
import { CustomInputProps } from '@/types';

function CustomInput({
  label,
  type = 'text',
  placeholder = '',
  value,
  onChange,
  className = '',
  inputClassName = '',
  disabled = false,
  required = false,
  inputStyle = 'border',
  icon,
  error,
  id,
  autoComplete,
  ref,
  ...otherProps
}: CustomInputProps) {
  const randomId = useId();
  const inputId = id || randomId;
  const errorId = `${inputId}-error`;
  const [isFocused, setIsFocused] = useState(false);

  const baseInputClasses = `block w-full border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 focus:outline-none duration-200 bg-transparent focus:border-indigo-500 ${inputClassName}`;
  const inputStyles = {
    border: `border px-3 py-2 rounded-md`,
    underline: `border-b-1 p-1`,
    floatingLabel: `border px-3 pt-4 pb-2 rounded-md`,
  };

  const showLabel = label && inputStyle !== 'floatingLabel';
  const ariaLabel = !showLabel ? label || placeholder : undefined;

  return (
    <div className={`flex flex-col space-y-1 ${className}`}>
      {showLabel && (
        <label
          htmlFor={inputId}
          className="text-sm font-medium text-gray-900 dark:text-gray-100"
        >
          {label}
        </label>
      )}
      <div className="relative">
        {icon && (
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <SvgLoader name={icon} color="currentColor" />
          </div>
        )}
        <input
          ref={ref}
          id={inputId}
          type={type}
          placeholder={inputStyle === 'floatingLabel' ? undefined : placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => inputStyle === 'floatingLabel' && setIsFocused(true)}
          onBlur={() => inputStyle === 'floatingLabel' && setIsFocused(false)}
          className={`${baseInputClasses} ${inputStyles[inputStyle]} ${
            icon ? 'pl-10' : ''
          } ${error ? 'border-red-500 dark:border-red-400' : ''}`}
          disabled={disabled}
          required={required}
          aria-invalid={!!error}
          aria-describedby={error ? errorId : undefined}
          aria-label={ariaLabel}
          autoComplete={autoComplete}
          {...otherProps}
        />
        {inputStyle === 'floatingLabel' && (label || placeholder) && (
          <label
            htmlFor={inputId}
            className={
              `absolute left-2 top-4 px-1 text-sm duration-200 pointer-events-none origin-top-left ` +
              `${
                isFocused || value
                  ? 'scale-75 -translate-y-3 text-indigo-600 dark:text-indigo-400'
                  : 'text-gray-600 dark:text-gray-400'
              } ` +
              `${icon ? 'left-10' : ''}`
            }
          >
            {label || placeholder}
          </label>
        )}
        {error && (
          <p id={errorId} className="mt-1 text-sm text-red-500">
            {error}
          </p>
        )}
      </div>
    </div>
  );
}

export default memo(CustomInput);
