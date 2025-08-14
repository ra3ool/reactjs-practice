import { useInvoiceStore } from '@/stores';
import { useParams } from 'react-router';

export default function GetInvoiceView() {
  // const getInvoice = useInvoiceStore((state) => state.getInvoiceById);
  // const { data, isLoading } = useQuery<FetchInvoicesResponse, Error>({
  //   queryKey: ['invoices', queryParams],
  //   queryFn: () => getInvoice(queryParams),
  //   staleTime: 60_000,
  //   placeholderData: (previousData) => previousData,
  // });

  const { id } = useParams();
  const getInvoice = () => {
    return id;
  };
  const invoice = useInvoiceStore.getState().currentInvoice ?? getInvoice();
  return <>{JSON.stringify(invoice)}</>;
}
