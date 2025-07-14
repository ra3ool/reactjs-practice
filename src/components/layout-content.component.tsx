import { ReactNode } from 'react';

export default function Header({
  className,
  children,
}: {
  className: string;
  children: ReactNode;
}) {
  return (
    <div
      className={`grow-1 w-full bg-bg-primary text-text-primary p-3 rounded-xl ${className}`}
    >
      {children}
    </div>
  );
}
