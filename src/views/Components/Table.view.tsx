import { useEffect, useState } from 'react';
import CustomTable from '@/components/custom-table.component';
import { TableHeader, TableRow } from '@/types/components';

const getTableData = (): Promise<TableRow[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { id: 1, name: 'Ada Lovelace', email: 'ada.lovelace@example.com' },
        { id: 2, name: 'Alan Turing', email: 'alan.turing@example.com' },
        { id: 3, name: 'Grace Hopper', email: 'grace.hopper@example.com' },
        { id: 4, name: 'Linus Torvalds', email: 'linus.torvalds@example.com' },
        { id: 5, name: 'Margaret Hamilton', email: 'margaret.hamilton@example.com' },
        { id: 6, name: 'Tim Berners-Lee', email: 'tim.bernerslee@example.com' },
        { id: 7, name: 'Donald Knuth', email: 'donald.knuth@example.com' },
        { id: 8, name: 'Barbara Liskov', email: 'barbara.liskov@example.com' },
        { id: 9, name: 'James Gosling', email: 'james.gosling@example.com' },
        { id: 10, name: 'Guido van Rossum', email: 'guido.rossum@example.com' },
        { id: 11, name: 'Bjarne Stroustrup', email: 'bjarne.stroustrup@example.com' },
        { id: 12, name: 'Dennis Ritchie', email: 'dennis.ritchie@example.com' },
        { id: 13, name: 'Ken Thompson', email: 'ken.thompson@example.com' },
        { id: 14, name: 'Brian Kernighan', email: 'brian.kernighan@example.com' },
        { id: 15, name: 'John McCarthy', email: 'john.mccarthy@example.com' },
        { id: 16, name: 'Niklaus Wirth', email: 'niklaus.wirth@example.com' },
        { id: 17, name: 'Jean Sammet', email: 'jean.sammet@example.com' },
        { id: 18, name: 'Frances Allen', email: 'frances.allen@example.com' },
        { id: 19, name: 'Radia Perlman', email: 'radia.perlman@example.com' },
        { id: 20, name: 'Yukihiro Matsumoto', email: 'yukihiro.matsumoto@example.com' },
      ]);
    }, 1000);
  });
};

const tableHeaders: TableHeader[] = [
  { key: 'id', value: 'ID' },
  { key: 'name', value: 'Name' },
  { key: 'email', value: 'Email' },
];

export default function TableView() {
  const [tableData, setTableData] = useState<TableRow[]>([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    getTableData().then((data) => setTableData(data))
    .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <div className="w-full">
        <CustomTable
          headers={tableHeaders}
          data={tableData}
          loading={loading}
        />
      </div>
    </>
  );
}
