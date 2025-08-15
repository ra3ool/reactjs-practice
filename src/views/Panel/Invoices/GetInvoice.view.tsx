import { useInvoiceStore } from '@/stores';
import { FetchInvoiceByIdResponse } from '@/types';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router';

export default function GetInvoiceView() {
  const { id } = useParams();
  const paramId = Number(id);
  const currentInvoice = useInvoiceStore((state) => state.currentInvoice);
  const getInvoiceById = useInvoiceStore((state) => state.getInvoiceById);

  const hasMatchingInvoice = currentInvoice?.id === paramId;

  const { data, isLoading, error } = useQuery<FetchInvoiceByIdResponse, Error>({
    queryKey: ['invoice', id],
    queryFn: () => getInvoiceById(paramId),
    enabled: !hasMatchingInvoice, // Only fetch if we don't have matching invoice
    staleTime: 60_000,
  });

  const invoice = hasMatchingInvoice ? currentInvoice : data;

  if (isLoading) {
    return <div>Loading invoice...</div>;
  }

  if (error) {
    return <div>Error loading invoice: {error.message}</div>;
  }

  if (!invoice) {
    return <div>Invoice not found</div>;
  }

  return (
    <div>
      <h1>Invoice Details</h1>
      <div>{JSON.stringify(invoice, null, 2)}</div>
    </div>
  );
}
