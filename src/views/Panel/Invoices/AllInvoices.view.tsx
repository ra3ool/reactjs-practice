import { CustomTable, Pagination } from '@/components';
import { useInvoiceStore } from '@/stores';
import { TableHeader } from '@/types';
import { ReactNode, useEffect, useState } from 'react';

const tableHeaders: TableHeader[] = [
  {
    key: 'id',
    value: 'Invoice ID and Reference',
    render: (invoice) => (
      <span className="inline-block max-w-40 truncate">
        {invoice.id} - {invoice.reference as ReactNode}
      </span>
    ),
  },
  {
    key: 'amount',
    value: 'Amount',
    render: ({ amount }) => (
      <span>${(amount as number).toFixed(2)}</span> // Format as currency
    ),
  },
  {
    key: 'items',
    value: 'Items Count',
    sort: false,
    render: ({ items }) => <span>{(items as object[]).length}</span>,
  },
  {
    key: 'date',
    value: 'Date',
    render: ({ date }) => {
      const formattedDate = new Date(date as string).toLocaleString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
      return <span>{formattedDate}</span>;
    },
  },
];

export default function AllInvoicesView() {
  const { invoices, meta, fetchInvoices, isLoading } = useInvoiceStore();

  const [currentPage, setCurrentPage] = useState(1); //TODO complete this

  useEffect(() => {
    fetchInvoices({
      limit: 3, //TODO implement filters
      page: currentPage,
    }); //TODO add react query
  }, [currentPage, fetchInvoices]);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Invoices</h2>
      <CustomTable
        headers={tableHeaders}
        data={invoices}
        sort
        loading={isLoading}
        emptyText="No invoices found."
      />
      <Pagination
        totalItems={meta?.pagination?.total || 0}
        itemsPerPage={meta?.pagination?.limit || 10}
        currentPage={currentPage}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </div>
  );
}
