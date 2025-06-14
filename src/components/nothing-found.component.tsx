export default function NothingFound({ emptyText }: { emptyText?: string }) {
  return <div>{emptyText ?? 'No data available'}</div>;
}
