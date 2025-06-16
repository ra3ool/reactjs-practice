import { TableRow } from "@/types/components";

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
        ? String(valueA).localeCompare(String(valueB))
        : String(valueB).localeCompare(String(valueA));
    }
  });
};

export default sortData