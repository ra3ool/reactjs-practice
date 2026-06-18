import { CustomToggleProps } from '@/types';
import { cn } from '@/utils/cn';

export function CustomToggle({
  toggle,
  isActive = true,
  hasBiggerBubble = false,
  activeLabelText,
  deActiveLabelText,
}: CustomToggleProps) {
  const toggleActivity = () => {
    if (toggle) toggle(!isActive);
  };

  return (
    <div className="flex gap-2 items-center">
      {deActiveLabelText && (
        <span className="text-gray-900 dark:text-gray-100">
          {deActiveLabelText}
        </span>
      )}
      <div
        className={cn(
          'rounded-2xl bg-neutral-200 dark:bg-neutral-700 w-12 flex items-center align-middle cursor-pointer',
          hasBiggerBubble ? 'h-4' : 'h-6 p-1',
        )}
        onClick={toggleActivity}
      >
        <span className={cn('duration-300', isActive ? 'grow' : '')}></span>
        <span
          className={cn(
            'flex rounded-full aspect-square duration-300',
            isActive
              ? 'bg-blue-600 dark:bg-blue-500'
              : 'bg-neutral-400 dark:bg-neutral-600',
            hasBiggerBubble ? 'h-6' : 'h-full',
          )}
        ></span>
      </div>
      {activeLabelText && (
        <span className="text-gray-900 dark:text-gray-100">
          {activeLabelText}
        </span>
      )}
    </div>
  );
}
