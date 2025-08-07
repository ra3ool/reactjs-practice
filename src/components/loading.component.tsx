import { LayoutContent } from '.';

export default function Loading({ loadingText }: { loadingText?: string }) {
  if (loadingText) return loadingText;
  return (
    <LayoutContent>
      <div className="text-gray-900 dark:text-gray-100 flex items-center justify-center h-full">
        <span>Loading data ...</span>
      </div>
    </LayoutContent>
  );
}
