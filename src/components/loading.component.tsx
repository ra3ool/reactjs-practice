export default function Loading({ loadingText }: { loadingText?: string }) {
  return <div className="text-gray-900 dark:text-gray-100">{loadingText ?? 'Loading data ...'}</div>;
}
