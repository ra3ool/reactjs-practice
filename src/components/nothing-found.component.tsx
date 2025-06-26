export default function NothingFound({ emptyText }: { emptyText?: string }) {
  return <div className="text-gray-900 dark:text-gray-100">{emptyText ?? 'No data available'}</div>;
}
