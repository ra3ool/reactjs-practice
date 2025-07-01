export interface CustomInputProps {
  label?: string;
  type?: string;
  id?: string;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  className?: string;
  inputClassName?: string;
  inputStyle?: 'border' | 'underline' | 'none' | 'floatingLabel';
  disabled?: boolean;
  required?: boolean;
  error?: string;
}
