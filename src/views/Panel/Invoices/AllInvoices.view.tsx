import {
  CustomButton,
  CustomInput,
  CustomTable,
  Pagination,
} from '@/components';
import { invoiceService } from '@/services';
import { useInvoiceStore } from '@/stores';
import { FetchInvoicesResponse, TableHeader } from '@/types';
import { useQuery } from '@tanstack/react-query';
import { ReactNode, useEffect, useMemo, useState } from 'react';

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
    render: ({ amount }) => <span>${(amount as number).toFixed(2)}</span>,
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
  const { invoices, meta, isLoading, clearInvoiceList } = useInvoiceStore();

  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(10);

  // Applied filters used by query
  const [minAmount, setMinAmount] = useState<string>('');
  const [maxAmount, setMaxAmount] = useState<string>('');
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');

  // Form inputs (pending changes until submit)
  const [minAmountInput, setMinAmountInput] = useState<string>('');
  const [maxAmountInput, setMaxAmountInput] = useState<string>('');
  const [startDateInput, setStartDateInput] = useState<string>('');
  const [endDateInput, setEndDateInput] = useState<string>('');
  const [limitInput, setLimitInput] = useState<string>(String(limit));

  const applyFilters = () => {
    setCurrentPage(1);
    setStartDate(startDateInput || '');
    setEndDate(endDateInput || '');
    setMinAmount(minAmountInput);
    setMaxAmount(maxAmountInput);

    const parsedLimit = Number(limitInput);
    if (!Number.isNaN(parsedLimit) && parsedLimit > 0) {
      setLimit(parsedLimit);
    }
  };

  // Build query params memoized
  const queryParams = useMemo(
    () => ({
      page: currentPage,
      limit,
      startDate: startDate || undefined,
      endDate: endDate || undefined,
      minAmount: minAmount ? Number(minAmount) : undefined,
      maxAmount: maxAmount ? Number(maxAmount) : undefined,
    }),
    [currentPage, limit, startDate, endDate, minAmount, maxAmount],
  );

  // React Query fetch
  const { data, isLoading: isQueryLoading } = useQuery<
    FetchInvoicesResponse,
    Error
  >({
    queryKey: ['invoices', queryParams],
    queryFn: () => invoiceService.fetchInvoices(queryParams),
    staleTime: 60_000,
    placeholderData: (previousData) => previousData,
  });

  // Sync query loading state to store
  useEffect(() => {
    useInvoiceStore.setState({ isLoading: isQueryLoading });
  }, [isQueryLoading]);

  // Sync query result into store for component consumption and other views
  useEffect(() => {
    if (data?.data) {
      useInvoiceStore.setState({ invoices: data.data, meta: data.meta });
    } else {
      clearInvoiceList();
    }
  }, [data, clearInvoiceList]);

  const totalItems =
    data?.meta?.pagination?.total || meta?.pagination?.total || 0;
  const itemsPerPage = data?.meta?.pagination?.limit || limit;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Invoices</h2>

      <div className="mb-2 grid grid-cols-1 md:grid-cols-5 gap-3">
        <CustomInput
          name="startDate"
          label="Start Date"
          type="date"
          value={startDateInput}
          onChange={setStartDateInput}
        />
        <CustomInput
          name="endDate"
          label="End Date"
          type="date"
          value={endDateInput}
          onChange={setEndDateInput}
        />
        <CustomInput
          name="minAmount"
          label="Min Amount"
          type="number"
          value={minAmountInput}
          onChange={setMinAmountInput}
        />
        <CustomInput
          name="maxAmount"
          label="Max Amount"
          type="number"
          value={maxAmountInput}
          onChange={setMaxAmountInput}
        />
        <CustomInput
          name="limit"
          label="Items per page"
          type="number"
          value={limitInput}
          onChange={setLimitInput}
        />
      </div>

      <div className="mb-4 flex justify-end">
        <CustomButton onClick={applyFilters} className="w-auto">
          Apply Filters
        </CustomButton>
      </div>

      <CustomTable
        headers={tableHeaders}
        data={invoices}
        sort
        loading={isLoading || isQueryLoading}
        emptyText="No invoices found."
      />

      <div className="mt-3">
        <Pagination
          totalItems={totalItems}
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
          onPageChange={(page) => setCurrentPage(page)}
        />
      </div>
    </div>
  );
}
