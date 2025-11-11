import { HeaderProps } from '@/types';
import { memo } from 'react';

const Header = memo(({ className, title, action }: HeaderProps) => {
  return (
    <div
      className={`flex justify-between items-center shrink-0 bg-bg-primary text-text-primary shadow px-5 min-h-16 rounded-xl ${className}`}
    >
      {title}
      {action && <div>{action}</div>}
    </div>
  );
});

export default Header;
