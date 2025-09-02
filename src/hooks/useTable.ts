import { TableRow, UseTableOptions } from '@/types';
import { useCallback, useEffect, useState } from 'react';

export function useTable<T extends TableRow>({
  fetchData,
  itemsPerPage,
  isServerSidePagination = false,
}: UseTableOptions<T>) {
  const [data, setData] = useState<T[]>([]);
  const [totalLength, setTotalLength] = useState(0);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const handleFetchData = useCallback(async () => {
    setLoading(true);
    try {
      const response = isServerSidePagination
        ? await fetchData(currentPage, itemsPerPage)
        : await fetchData();
      setData(response.result);
      setTotalLength(response.totalLength);
    } finally {
      setLoading(false);
    }
  }, [isServerSidePagination, fetchData, currentPage, itemsPerPage]);

  useEffect(() => {
    handleFetchData();
  }, [handleFetchData]);

  return {
    data,
    loading,
    totalLength,
    currentPage,
    setCurrentPage,
    itemsPerPage,
  };
}
