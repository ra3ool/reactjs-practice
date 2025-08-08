import { TableRow } from '@/types/components';

const sortData = (
  data: TableRow[],
  column: string,
  direction: 'asc' | 'desc',
): TableRow[] => {
  return [...data].sort((a, b) => {
    const valueA = a[column];
    const valueB = b[column];

    if (typeof valueA === 'number' && typeof valueB === 'number') {
      return direction === 'asc' ? valueA - valueB : valueB - valueA;
    } else {
      return direction === 'asc'
        ? (valueA as string).localeCompare(valueB as string)
        : (valueB as string).localeCompare(valueA as string);
    }
  });
};

export default sortData;
