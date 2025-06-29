import { useState, useRef, useEffect } from 'react';
import { ExpansionPanelProps } from '@/types';

export default function ExpansionPanel({
  title = 'Panel Title',
  children,
  isExpanded: isExpandedProp = false,
  className = '',
  headerClassName = '',
}: ExpansionPanelProps) {
  const [isExpanded, setIsExpanded] = useState<boolean>(isExpandedProp);
  const [contentHeight, setContentHeight] = useState<number>(0);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsExpanded(isExpandedProp);
  }, [isExpandedProp]);

  useEffect(() => {
    if (contentRef.current) {
      setContentHeight(contentRef.current.scrollHeight);
    }
  }, [children]);

  const handleToggle = () => setIsExpanded(!isExpanded);

  return (
    <div
      className={`w-full border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm overflow-hidden ${className}`}
    >
      <div
        className={`border-gray-200 dark:border-gray-700 ${
          children && isExpanded ? 'border-b-1' : ''
        } ${headerClassName}`}
      >
        <div
          className="w-full flex justify-between items-center p-4 text-left focus:outline-none transition-colors duration-200 cursor-pointer select-none"
          onClick={handleToggle}
          aria-expanded={isExpanded}
        >
          <span className="text-gray-900 dark:text-gray-100">{title}</span>
          <span
            className={`text-gray-900 dark:text-gray-100 text-sm duration-500 ${
              isExpanded ? 'rotate-180' : ''
            }`}
          >
            ▼
          </span>
        </div>
      </div>
      {children && (
        <div
          style={{
            height: isExpanded ? `${contentHeight}px` : '0',
            opacity: isExpanded ? 1 : 0,
            overflow: 'hidden',
            transition: 'height 0.3s ease-in-out, opacity 0.3s ease-in-out',
          }}
        >
          <div
            ref={contentRef}
            className="p-4 text-gray-900 dark:text-gray-100"
          >
            {children}
          </div>
        </div>
      )}
    </div>
  );
}
