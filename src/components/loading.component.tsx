export function Loading({ loadingText }: { loadingText?: string }) {
  if (loadingText) return loadingText;
  return (
    <div className="text-gray-900 dark:text-gray-100 flex items-center justify-center h-full">
      <span>Loading data ...</span>
    </div>
  );
}
