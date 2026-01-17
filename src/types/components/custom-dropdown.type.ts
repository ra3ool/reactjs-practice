import { MouseEvent, ReactElement, ReactNode } from 'react';

export interface DropdownProps {
  trigger?: ReactElement;
  triggerText?: ReactNode;
  children: ReactNode;
  align?: 'left' | 'right';
  className?: string;
  ListClassName?: string;
}

export interface DropdownItemProps {
  children: ReactNode;
  onClick?: (e: MouseEvent) => void;
  className?: string;
}
