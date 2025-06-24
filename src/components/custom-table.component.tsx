import {
  CustomTableProps,
  TableHeader,
  TableRow,
  TableCell,
} from '@/types/components';
import { Loading, NothingFound, Pagination } from '@/components';
import PropTypes from 'prop-types';
import { ReactNode, useState } from 'react';
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
        className={`w-full border-separate border border-gray-400 text-left ${className}`}
        role="table"
      >
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr role="row">
            {(headers as TableHeader[]).map((header) => (
              <th
                key={header.key}
                className={`p-2 border border-gray-600 select-none ${
                  sort && 'cursor-pointer'
                }`}
                {...(sort && { onClick: () => handleSort(header.key) })}
                role="columnheader"
              >
                <div className="flex justify-between">
                  <span>{header.value}</span>
                  {sortColumn === header.key && (
                    <span>{sortDirection === 'asc' ? '▲' : '▼'}</span>
                  )}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr role="row">
              <td className="text-center" colSpan={headers.length}>
                <Loading loadingText={loadingText} />
              </td>
            </tr>
          ) : isEmpty ? (
            <tr role="row">
              <td className="text-center" colSpan={headers.length}>
                <NothingFound emptyText={emptyText} />
              </td>
            </tr>
          ) : (
            sortedData.map((row) => (
              <tr
                key={row.id}
                className={`hover:bg-gray-100 dark:hover:bg-gray-800 odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 ${rowClassName}`}
                role="row"
                {...(onRowClick && {
                  onClick: () => onRowClick(row),
                })}
              >
                {headers.map((header) => (
                  <td
                    key={header.key}
                    className={`text-nowrap border border-gray-600 p-2 ${cellClassName}`}
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
          onPageChange={(page: number) => setCurrentPage(page)}
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
