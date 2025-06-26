import {
  CustomTableProps,
  TableHeader,
  TableRow,
  TableCell,
} from '@/types';
import { Loading, NothingFound, Pagination } from '@/components';
import PropTypes from 'prop-types';
import { ReactNode, useState, useCallback } from 'react';
import { sortData, paginateData } from '@/helpers';

const TableCellRender = ({
  header,
  row,
}: {
  header: TableHeader;
  row: TableRow;
}): ReactNode | TableCell => {
  const { key, render } = header;
  return render ? (render(row) as ReactNode) : (row[key] as TableCell);
};

export default function CustomTable(props: CustomTableProps) {
  const {
    headers,
    data,
    className,
    rowClassName,
    cellClassName,
    loading,
    emptyText,
    loadingText,
    sort,
    onRowClick,
    onCellClick,
    pagination,
  } = props;

  const [sortColumn, setSortColumn] = useState<string>('');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [currentPage, setCurrentPage] = useState(pagination?.currentPage || 1);

  const handleSort = (columnKey: string) => {
    if (sortColumn === columnKey) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(columnKey);
      setSortDirection('asc');
    }
  };

  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
  }, []);

  const paginatedData: TableRow[] = pagination
    ? paginateData(data, currentPage, pagination.itemsPerPage)
    : data;
  const sortedData: TableRow[] = sortColumn
    ? sortData(paginatedData, sortColumn, sortDirection)
    : paginatedData;
  const isEmpty = !data || !data.length;

  return (
    <div className="overflow-x-auto">
      <table
        className={`w-full border-separate border border-gray-300 dark:border-gray-600 text-left ${className}`}
        role="table"
      >
        <thead className="text-xs text-gray-900 dark:text-gray-100 uppercase bg-neutral-200 dark:bg-neutral-800">
          <tr role="row">
            {(headers as TableHeader[]).map((header) => (
              <th
                key={header.key}
                className={`p-2 border border-gray-300 dark:border-gray-600 select-none ${
                  sort && 'cursor-pointer hover:bg-neutral-300 dark:hover:bg-neutral-700'
                }`}
                {...(sort && { onClick: () => handleSort(header.key) })}
                role="columnheader"
              >
                <div className="flex justify-between">
                  <span>{header.value}</span>
                  {sortColumn === header.key && (
                    <span className="text-blue-600 dark:text-blue-400">
                      {sortDirection === 'asc' ? '▲' : '▼'}
                    </span>
                  )}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr role="row">
              <td className="text-center p-2 text-gray-900 dark:text-gray-100" colSpan={headers.length}>
                <Loading loadingText={loadingText} />
              </td>
            </tr>
          ) : isEmpty ? (
            <tr role="row">
              <td className="text-center p-2 text-gray-900 dark:text-gray-100" colSpan={headers.length}>
                <NothingFound emptyText={emptyText} />
              </td>
            </tr>
          ) : (
            sortedData.map((row) => (
              <tr
                key={row.id}
                className={`hover:bg-neutral-100 dark:hover:bg-neutral-700 odd:bg-white dark:odd:bg-neutral-900 even:bg-neutral-50 dark:even:bg-neutral-800 ${rowClassName}`}
                role="row"
                {...(onRowClick && {
                  onClick: () => onRowClick(row),
                })}
              >
                {headers.map((header) => (
                  <td
                    key={header.key}
                    className={`text-nowrap border border-gray-300 dark:border-gray-600 p-2 text-gray-900 dark:text-gray-100 ${cellClassName}`}
                    {...(onCellClick && {
                      onClick: () =>
                        onCellClick(row[header.key] as string, row),
                    })}
                  >
                    <TableCellRender header={header} row={row} />
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
      {pagination && (
        <Pagination
          totalItems={data.length}
          itemsPerPage={pagination.itemsPerPage}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
}

CustomTable.propTypes = {
  headers: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      value: PropTypes.node.isRequired,
    }),
  ).isRequired,
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    }),
  ).isRequired,
  loading: PropTypes.bool,
  emptyText: PropTypes.string,
  loadingText: PropTypes.string,
  className: PropTypes.string,
  sort: PropTypes.bool,
};

CustomTable.defaultProps = {
  loading: false,
  emptyText: 'No data found',
  loadingText: 'Loading...',
  className: '',
  rowClassName: '',
  cellClassName: '',
  sort: false,
};
