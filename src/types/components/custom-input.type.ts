import { Ref } from 'react';
import { FieldError, UseFormRegister } from 'react-hook-form';
export interface CustomInputProps {
  label?: string;
  type?: string;
  id?: string;
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  name: string;
  icon?: string;
  autoComplete?: string;
  className?: string;
  inputClassName?: string;
  inputStyle?: 'border' | 'underline' | 'floatingLabel';
  disabled?: boolean;
  required?: boolean;
  hasError?: FieldError;
  errorText?: string;
  ref?: Ref<HTMLInputElement>;
  register?: UseFormRegister<CustomInputProps>;
}
