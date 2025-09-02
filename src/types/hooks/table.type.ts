export type FetchData<T> = (
  currentPage?: number,
  itemsPerPage?: number,
) => Promise<{ result: T[]; totalLength: number }>;

export interface UseTableOptions<T> {
  fetchData: FetchData<T>;
  itemsPerPage: number;
  isServerSidePagination?: boolean;
}
