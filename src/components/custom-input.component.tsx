import { useState, useId } from 'react';
import { CustomInputProps } from '@/types';

export default function CustomInput(props: CustomInputProps) {
  const randomId = useId();
  const {
    label,
    type = 'text',
    id = randomId,
    placeholder = '',
    value,
    onChange,
    className = '',
    inputClassName = '',
    disabled = false,
    required = false,
    inputStyle = 'border',
    ...otherProps
  } = props;

  const [isFocused, setIsFocused] = useState(false);

  if (inputStyle === 'border') {
    return (
      <div className={`flex flex-col ${className}`}>
        {label && (
          <label className="mb-1 text-gray-900 dark:text-gray-100" htmlFor={id}>
            {label}
          </label>
        )}
        <input
          id={id}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className={`border border-gray-300 dark:border-gray-600 rounded px-2 py-1 dark:bg-neutral-900 text-gray-900 dark:text-gray-100 focus:border-blue-600 dark:focus:border-blue-500 focus:outline-none ${inputClassName}`}
          disabled={disabled}
          required={required}
          {...otherProps}
        />
      </div>
    );
  }
  if (inputStyle === 'underline') {
    return (
      <div className={`flex flex-col ${className}`}>
        {label && (
          <label className="mb-1 text-gray-900 dark:text-gray-100" htmlFor={id}>
            {label}
          </label>
        )}
        <input
          {...otherProps}
          id={id}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className={`border-b border-gray-300 dark:border-gray-600 bg-transparent text-gray-900 dark:text-gray-100 focus:border-blue-600 dark:focus:border-blue-500 focus:outline-none ${inputClassName}`}
          disabled={disabled}
          required={required}
        />
      </div>
    );
  }
  if (inputStyle === 'none') {
    return (
      <div className={`flex flex-col ${className}`}>
        {label && (
          <label className="mb-1 text-gray-900 dark:text-gray-100" htmlFor={id}>
            {label}
          </label>
        )}
        <input
          {...otherProps}
          id={id}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className={`bg-transparent text-gray-900 dark:text-gray-100 focus:outline-none ${inputClassName}`}
          disabled={disabled}
          required={required}
        />
      </div>
    );
  }
  if (inputStyle === 'floatingLabel') {
    return (
      <div className={`relative flex flex-col ${className}`}>
        <input
          {...otherProps}
          id={id}
          type={type}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className={`border border-gray-300 dark:border-gray-600 rounded px-2 py-2 dark:bg-neutral-900 text-gray-900 dark:text-gray-100 focus:border-blue-600 dark:focus:border-blue-500 focus:outline-none ${inputClassName}`}
          disabled={disabled}
          required={required}
        />
        {(label || placeholder) && (
          <label
            htmlFor={id}
            className={`
              absolute left-2 top-2 px-1 transition-all duration-200
              pointer-events-none
              ${
                isFocused || value
                  ? 'text-xs text-blue-600 dark:text-blue-400 -translate-y-3 bg-white dark:bg-neutral-900'
                  : 'text-base text-gray-600 dark:text-gray-400 bg-white dark:bg-neutral-900'
              }
            `}
          >
            {label || placeholder}
          </label>
        )}
      </div>
    );
  }
}
