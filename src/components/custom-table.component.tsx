import { CustomTableProps, TableHeader, TableRow } from '@/types/components';
import { Loading, NothingFound } from '@/components';
import PropTypes from 'prop-types';

export default function CustomTable(props: CustomTableProps) {
  const { headers, data, className, loading, emptyText, loadingText } = props;

  let tableRows;
  if (loading || !data || !data.length) {
    tableRows = (
      <tr>
        <td className="text-center" colSpan={headers.length}>
          {loading ? (
            <Loading loadingText={loadingText} />
          ) : (
            <NothingFound emptyText={emptyText} />
          )}
        </td>
      </tr>
    );
  } else {
    tableRows = (data as TableRow[]).map((row) => (
      <tr
        key={row.id}
        className="hover:bg-gray-100 dark:hover:bg-gray-800 odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800"
      >
        {headers.map((header) => (
          <td
            key={header.key}
            className="text-nowrap border border-gray-600 p-2"
          >
            {row[header.key] as React.ReactNode}
          </td>
        ))}
      </tr>
    ));
  }

  return (
    <div className="overflow-x-auto">
      <table
        className={`w-full border-separate border border-gray-400 text-left ${className}`}
      >
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            {(headers as TableHeader[]).map((header) => (
              <th key={header.key} className="p-2 border border-gray-600">
                {header.value}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>{tableRows}</tbody>
      </table>
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
};
