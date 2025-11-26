import { FocusEvent, Ref } from 'react';
import { UseFormRegister } from 'react-hook-form';
export interface CustomInputProps {
  label?: string;
  type?: string;
  id?: string;
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  onFocus?: (event: FocusEvent<HTMLInputElement, Element>) => void;
  onBlur?: (event: FocusEvent<HTMLInputElement, Element>) => void;
  name?: string;
  icon?: string;
  autoComplete?: string;
  className?: string;
  inputClassName?: string;
  inputStyle?: 'border' | 'underline' | 'floatingLabel';
  disabled?: boolean;
  hasError?: boolean; //FieldError
  errorText?: string;
  ref?: Ref<HTMLInputElement>;
  register?: UseFormRegister<CustomInputProps>;
}
