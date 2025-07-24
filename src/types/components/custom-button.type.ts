import { ReactNode } from 'react';

export interface CustomButtonProps {
  children: string | ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  icon?: string;
  className?: string;
  loading?: boolean;
  disabled?: boolean;
  type?: 'submit' | 'button' | 'reset' | undefined;
}
