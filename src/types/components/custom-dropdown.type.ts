import { ReactElement, ReactNode } from 'react';

export interface DropdownProps {
  trigger?: ReactElement;
  triggerText?: ReactNode;
  children: ReactNode;
  align?: 'left' | 'right';
  className?: string;
}

export interface DropdownItemProps {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
}