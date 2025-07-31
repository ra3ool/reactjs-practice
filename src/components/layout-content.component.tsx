import { ReactNode } from 'react';

export default function Header({
  className,
  children,
  headerComponent = undefined,
}: {
  children: ReactNode;
  className?: string;
  headerComponent?: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-6 h-full">
      {headerComponent}
      <div
        className={`grow-1 w-full bg-bg-primary text-text-primary shadow p-3 rounded-xl ${className}`}
      >
        {children}
      </div>
    </div>
  );
}
