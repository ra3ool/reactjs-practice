import { useState, useEffect, useCallback } from 'react';
import { TableRow, UseTableOptions } from '@/types';

export function useTable<T extends TableRow>({
  fetchData,
  itemsPerPage,
}: UseTableOptions<T>) {
  const [data, setData] = useState<T[]>([]);
  const [totalLength, setTotalLength] = useState(0);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const handleFetchData = useCallback(() => {
    setLoading(true);
    fetchData(currentPage, itemsPerPage)
      .then((response) => {
        setData(response.result);
        setTotalLength(response.totalLength);
      })
      .finally(() => setLoading(false));
  }, [currentPage, itemsPerPage, fetchData]);

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
