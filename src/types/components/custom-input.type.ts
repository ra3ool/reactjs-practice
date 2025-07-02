import { Ref } from 'react';
export interface CustomInputProps {
  label?: string;
  type?: string;
  id?: string;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  icon?: string;
  autoComplete?: string;
  className?: string;
  inputClassName?: string;
  inputStyle?: 'border' | 'underline' | 'floatingLabel';
  disabled?: boolean;
  required?: boolean;
  error?: string;
  ref?: Ref<HTMLInputElement> | undefined;
}
