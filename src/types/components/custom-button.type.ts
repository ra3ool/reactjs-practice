import { ReactNode } from 'react';

export interface CustomButtonProps {
  children: string | ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  prependIcon?: string;
  appendIcon?: string;
  className?: string;
  loading?: boolean;
  disabled?: boolean;
  type?: 'submit' | 'button' | 'reset' | undefined;
}
