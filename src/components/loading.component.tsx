export default function Loading({ loadingText }: { loadingText?: string }) {
  return <div>{loadingText ?? 'Loading data ...'}</div>;
}