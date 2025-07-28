import { HeaderProps } from '@/types';

export default function Header({ className, title }: HeaderProps) {
  return (
    <div
      className={`flex justify-between items-center shrink-0 bg-bg-primary text-text-primary shadow p-5 rounded-xl ${className}`}
    >
      <div>{title}</div>
      <div>action</div>
    </div>
  );
}
