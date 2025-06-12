import { ChangeEvent, InputHTMLAttributes } from "react";

export interface CustomInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  type?: string;
  id?: string;
  placeholder?: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  inputClassName?: string;
  inputStyle?: 'border' | 'underline' | 'none' | 'floatingLabel';
  disabled?: boolean;
}
