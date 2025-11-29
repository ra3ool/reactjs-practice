import { CustomButton } from '@/components/custom-button.component';
import { CustomInput } from '@/components/custom-input.component';
import { CustomTable } from '@/components/custom-table.component';
import { Pagination } from '@/components/pagination.component';
import { useRouteNavigation } from '@/hooks';
import { useInvoiceStore } from '@/stores';
import { FetchInvoicesResponse, Invoice, TableHeader } from '@/types';
import { useQuery } from '@tanstack/react-query';
import { ReactNode, useMemo, useState } from 'react';

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
  const { navigateTo } = useRouteNavigation();

  //TODO use useActionState instead useState
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [filters, setFilters] = useState({
    minAmount: '',
    maxAmount: '',
    startDate: '',
    endDate: '',
  });

  const [formInputs, setFormInputs] = useState({
    ...filters,
    limit: String(limit),
  });

  const applyFilters = () => {
    setCurrentPage(1);
    setFilters({
      minAmount: formInputs.minAmount,
      maxAmount: formInputs.maxAmount,
      startDate: formInputs.startDate,
      endDate: formInputs.endDate,
    });

    const parsedLimit = Number(formInputs.limit);
    if (!Number.isNaN(parsedLimit) && parsedLimit > 0) {
      setLimit(parsedLimit);
    }
  };

  const updateFormInput = (key: string, value: string) => {
    setFormInputs((prev) => ({ ...prev, [key]: value }));
  };

  const queryParams = useMemo(
    () => ({
      page: currentPage,
      limit,
      startDate: filters.startDate || undefined,
      endDate: filters.endDate || undefined,
      minAmount: filters.minAmount ? Number(filters.minAmount) : undefined,
      maxAmount: filters.maxAmount ? Number(filters.maxAmount) : undefined,
    }),
    [currentPage, limit, filters],
  );

  // use selector (getting store function) - for React Query
  const fetchInvoices = useInvoiceStore((state) => state.fetchInvoices);
  const { data, isLoading, isFetching } = useQuery<
    FetchInvoicesResponse,
    Error
  >({
    queryKey: ['invoices', queryParams],
    queryFn: () => fetchInvoices(queryParams),
    staleTime: 60_000,
  });

  const invoices = data?.data || [];
  const totalItems = data?.meta?.pagination?.total || 0;
  const itemsPerPage = data?.meta?.pagination?.limit || limit;

  // use getState (getting store function) - for fire-and-forget action
  const goToInvoiceDetails = (invoice: unknown) => {
    useInvoiceStore.getState().setCurrentInvoice(invoice as Invoice);
    navigateTo('get-invoice', {
      params: { id: (invoice as Invoice).id.toString() },
    });
  };

  return (
    <>
      <h2 className="text-2xl font-bold mb-4">Invoices</h2>

      <div className="mb-2 grid grid-cols-1 sm:grid-cols-3 md:grid-cols-6 gap-3">
        <CustomInput
          name="startDate"
          label="Start Date"
          type="date"
          value={formInputs.startDate}
          onChange={(value) => updateFormInput('startDate', value)}
        />
        <CustomInput
          name="endDate"
          label="End Date"
          type="date"
          value={formInputs.endDate}
          onChange={(value) => updateFormInput('endDate', value)}
        />
        <CustomInput
          name="minAmount"
          label="Min Amount"
          type="number"
          value={formInputs.minAmount}
          onChange={(value) => updateFormInput('minAmount', value)}
        />
        <CustomInput
          name="maxAmount"
          label="Max Amount"
          type="number"
          value={formInputs.maxAmount}
          onChange={(value) => updateFormInput('maxAmount', value)}
        />
        <CustomInput
          name="limit"
          label="Items per page"
          type="number"
          value={formInputs.limit}
          onChange={(value) => updateFormInput('limit', value)}
        />

        <CustomButton
          onClick={applyFilters}
          loading={isLoading || isFetching}
          className="h-11 self-end"
        >
          Apply Filters
        </CustomButton>
      </div>

      <CustomTable
        headers={tableHeaders}
        data={invoices}
        sort
        loading={isLoading}
        emptyText="No invoices found."
        className="grow w-full overflow-auto"
        rowClassName="cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800"
        onRowClick={goToInvoiceDetails}
      />

      <div className="mt-3">
        <Pagination
          totalItems={totalItems}
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
        />
      </div>
    </>
  );
}
