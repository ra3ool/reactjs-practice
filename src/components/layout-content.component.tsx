import { ReactNode } from 'react';

export default function LayoutContent({
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
        className={`grow w-full bg-bg-primary text-text-primary shadow p-3 rounded-xl ${className}`}
      >
        {children}
      </div>
    </div>
  );
}
