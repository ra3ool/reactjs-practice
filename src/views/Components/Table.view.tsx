import { CustomTable, Pagination } from '@/components';
import { paginateData } from '@/helpers';
import { useTable } from '@/hooks';
import { TableCell, TableHeader, TableRow } from '@/types';
import { ReactNode, useCallback } from 'react';

const ITEMS_PER_PAGE = 4;
const getTableData = (
  currentPage?: number,
  itemsPerPage?: number,
): Promise<{ result: TableRow[]; totalLength: number }> => {
  const items = [
    { id: 1, name: 'Ada Lovelace', email: 'ada.lovelace@example.com' },
    { id: 2, name: 'Alan Turing', email: 'alan.turing@example.com' },
    { id: 3, name: 'Grace Hopper', email: 'grace.hopper@example.com' },
    { id: 4, name: 'Linus Torvalds', email: 'linus.torvalds@example.com' },
    {
      id: 5,
      name: 'Margaret Hamilton',
      email: 'margaret.hamilton@example.com',
    },
    { id: 6, name: 'Tim Berners-Lee', email: 'tim.bernerslee@example.com' },
    { id: 7, name: 'Donald Knuth', email: 'donald.knuth@example.com' },
    { id: 8, name: 'Barbara Liskov', email: 'barbara.liskov@example.com' },
    { id: 9, name: 'James Gosling', email: 'james.gosling@example.com' },
    { id: 10, name: 'Guido van Rossum', email: 'guido.rossum@example.com' },
    {
      id: 11,
      name: 'Bjarne Stroustrup',
      email: 'bjarne.stroustrup@example.com',
    },
    { id: 12, name: 'Dennis Ritchie', email: 'dennis.ritchie@example.com' },
    { id: 13, name: 'Ken Thompson', email: 'ken.thompson@example.com' },
    {
      id: 14,
      name: 'Brian Kernighan',
      email: 'brian.kernighan@example.com',
    },
    { id: 15, name: 'John McCarthy', email: 'john.mccarthy@example.com' },
    { id: 16, name: 'Niklaus Wirth', email: 'niklaus.wirth@example.com' },
    { id: 17, name: 'Jean Sammet', email: 'jean.sammet@example.com' },
    { id: 18, name: 'Frances Allen', email: 'frances.allen@example.com' },
    { id: 19, name: 'Radia Perlman', email: 'radia.perlman@example.com' },
    {
      id: 20,
      name: 'Yukihiro Matsumoto',
      email: 'yukihiro.matsumoto@example.com',
    },
    { id: 21, name: 'Brendan Eich', email: 'brendan.eich@example.com' },
    {
      id: 22,
      name: 'Anders Hejlsberg',
      email: 'anders.hejlsberg@example.com',
    },
    {
      id: 23,
      name: 'Guido van Rossum',
      email: 'guido.vanrossum@example.com',
    },
    { id: 24, name: 'Larry Wall', email: 'larry.wall@example.com' },
    { id: 25, name: 'John Backus', email: 'john.backus@example.com' },
    {
      id: 26,
      name: 'Robert Griesemer',
      email: 'robert.griesemer@example.com',
    },
    { id: 27, name: 'Rob Pike', email: 'rob.pike@example.com' },
    { id: 28, name: 'Ken Arnold', email: 'ken.arnold@example.com' },
    { id: 29, name: 'Martin Odersky', email: 'martin.odersky@example.com' },
    { id: 30, name: 'Yehuda Katz', email: 'yehuda.katz@example.com' },
    { id: 31, name: 'Adele Goldberg', email: 'adele.goldberg@example.com' },
    { id: 32, name: 'John Carmack', email: 'john.carmack@example.com' },
    { id: 33, name: 'Sophie Wilson', email: 'sophie.wilson@example.com' },
  ];
  const result: TableRow[] =
    currentPage && itemsPerPage
      ? paginateData(items, currentPage, itemsPerPage)
      : items;

  return new Promise((resolve) =>
    setTimeout(() => resolve({ result, totalLength: items.length }), 1000),
  );
};

const tableHeaders: TableHeader[] = [
  { key: 'id', value: 'ID' },
  { key: 'name', value: 'Name' },
  {
    key: 'email',
    value: 'Email',
    render: (row) => (
      <i>
        <b>
          <span className="text-blue-500 dark:text-blue-300">
            {row?.email as ReactNode}
          </span>
        </b>
      </i>
    ),
  },
];

const onRowClick = (row: TableRow) => {
  console.table(row);
};
const onCellClick = (cell: TableCell, row: TableRow) => {
  console.log(cell, row);
};

export default function TableView() {
  const fetchAllData = useCallback(() => getTableData(), []);
  const { data: allData, loading: loadingAllData } = useTable({
    fetchData: fetchAllData,
    itemsPerPage: ITEMS_PER_PAGE,
  });

  const fetchPaginatedData = useCallback(
    (page: number, itemsPerPage: number) => getTableData(page, itemsPerPage),
    [],
  );
  const {
    data: paginatedData,
    loading: loadingPaginatedData,
    totalLength,
    currentPage,
    setCurrentPage,
  } = useTable({
    fetchData: fetchPaginatedData,
    itemsPerPage: ITEMS_PER_PAGE,
    isServerSide: true,
  });

  return (
    <div className="w-full">
      <div className="mb-4">
        <h3 className="mb-2 font-bold text-gray-900 dark:text-gray-100">
          Client-side pagination and sorting. The component fetches all data,
          and the CustomTable handles the rest.
        </h3>
        <CustomTable
          headers={tableHeaders}
          data={allData}
          loading={loadingAllData}
          rowClassName="hover:bg-neutral-100 dark:hover:bg-neutral-700 odd:bg-neutral-100 dark:odd:bg-neutral-900 even:bg-neutral-200 dark:even:bg-neutral-800"
          sort
          onCellClick={onCellClick}
          pagination={{ itemsPerPage: ITEMS_PER_PAGE }}
          loadingText="Loading rows..."
        />
      </div>

      <div className="mb-4">
        <h3 className="mb-2 font-bold text-gray-900 dark:text-gray-100">
          Server-side pagination. The component fetches only the data for the
          current page.
        </h3>
        <CustomTable
          headers={tableHeaders}
          data={paginatedData}
          loading={loadingPaginatedData}
          rowClassName="hover:bg-neutral-100 dark:hover:bg-neutral-700 odd:bg-neutral-100 dark:odd:bg-neutral-900 even:bg-neutral-200 dark:even:bg-neutral-800"
          onRowClick={onRowClick}
          onCellClick={onCellClick}
          loadingText="Loading rows..."
        />
        <Pagination //FIXME if changed, the page will rerender!!!
          totalItems={totalLength}
          itemsPerPage={ITEMS_PER_PAGE}
          currentPage={currentPage}
          onPageChange={(page) => setCurrentPage(page)}
        />
      </div>
    </div>
  );
}
