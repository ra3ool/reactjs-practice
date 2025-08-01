import { HeaderProps } from '@/types';

export default function Header({ className, title, action }: HeaderProps) {
  return (
    <div
      className={`flex justify-between items-center shrink-0 bg-bg-primary text-text-primary shadow px-5 min-h-16 rounded-xl ${className}`}
    >
      <div>{title}</div>
      {action && <div>{action}</div>}
    </div>
  );
}
