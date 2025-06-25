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
    inputStyle = 'border',
    ...otherProps
  } = props;

  const [isFocused, setIsFocused] = useState(false);

  if (inputStyle === 'border') {
    return (
      <div className={`flex flex-col ${className}`}>
        {label && (
          <label className="mb-1" htmlFor={id}>
            {label}
          </label>
        )}
        <input
          id={id}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className={`border rounded px-2 py-1 ${inputClassName}`}
          disabled={disabled}
          {...otherProps}
        />
      </div>
    );
  }
  if (inputStyle === 'underline') {
    return (
      <div className={`flex flex-col ${className}`}>
        {label && (
          <label className="mb-1" htmlFor={id}>
            {label}
          </label>
        )}
        <input
          {...otherProps}
          id={id}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className={`border-b border-gray-300 focus:border-blue-500 focus:outline-none ${inputClassName}`}
          disabled={disabled}
        />
      </div>
    );
  }
  if (inputStyle === 'none') {
    return (
      <div className={`flex flex-col ${className}`}>
        {label && (
          <label className="mb-1" htmlFor={id}>
            {label}
          </label>
        )}
        <input
          {...otherProps}
          id={id}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className={`focus:outline-none ${inputClassName}`}
          disabled={disabled}
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
          onChange={onChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className={`border rounded px-2 py-2 bg-transparent ${inputClassName}`}
          disabled={disabled}
        />
        {(label || placeholder) && (
          <label
            htmlFor={id}
            className={`
              absolute left-2 top-2 px-1 transition-all duration-200
              pointer-events-none
              ${
                isFocused || value
                  ? 'text-xs text-gray-200 -translate-y-3 bg-gray-800'
                  : 'text-base text-gray-200 bg-gray-800' //TODO fix the background color
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
