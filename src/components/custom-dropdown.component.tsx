import { DropdownContext, useDropdown } from '@/contexts/DropdownContext';
import { DropdownItemProps, DropdownProps } from '@/types';
import {
  cloneElement,
  MouseEvent as ReactMouseEvent,
  useEffect,
  useRef,
  useState,
} from 'react';

export function CustomDropdown({
  trigger,
  triggerText = 'dropdown',
  children,
  align = 'left',
  className = '',
  ListClassName = '',
}: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Create default trigger if not provided
  const defaultTrigger = (
    <button
      type="button"
      className="inline-flex items-center justify-center w-full"
    >
      {triggerText}
    </button>
  );

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: globalThis.MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close dropdown when pressing Escape key
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Get the trigger element with proper props
  const getTriggerWithProps = () => {
    const element = trigger || defaultTrigger;
    return cloneElement(element, {
      onClick: (e: ReactMouseEvent) => {
        element.props.onClick?.(e);
        setIsOpen(!isOpen);
      },
      'aria-expanded': isOpen,
      'aria-haspopup': true,
    });
  };

  return (
    <DropdownContext.Provider value={{ close: () => setIsOpen(false) }}>
      <div className={`relative inline-block ${className}`} ref={dropdownRef}>
        {getTriggerWithProps()}
        <div
          className={`absolute z-10 mt-2 rounded-md shadow-lg bg-bg-primary ring-black dark:bg-bg-primary dark:ring-white ring-1 ring-opacity-5 focus:outline-none transition-all duration-100 ${
            isOpen
              ? 'transform opacity-100 scale-100'
              : 'transform opacity-0 scale-95 pointer-events-none'
          } ${align === 'right' ? 'right-0' : 'left-0'} ${ListClassName}`}
          role="menu"
          tabIndex={-1}
        >
          <div className="py-1" role="none">
            {children}
          </div>
        </div>
      </div>
    </DropdownContext.Provider>
  );
}

export function DropdownItem({
  children,
  onClick,
  className = '',
}: DropdownItemProps) {
  const { close } = useDropdown();

  const handleClick = (e: ReactMouseEvent<HTMLButtonElement>) => {
    onClick?.(e);
    close();
  };

  return (
    <button
      type="button"
      className={`block w-full px-4 py-2 text-sm text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 ${className}`}
      role="menuitem"
      tabIndex={-1}
      onClick={handleClick}
    >
      {children}
    </button>
  );
}
