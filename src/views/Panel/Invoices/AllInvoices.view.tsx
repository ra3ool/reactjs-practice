import { useInvoiceStore } from '@/stores';
import { useEffect } from 'react';

export default function AllInvoicesView() {
  const { invoices, fetchInvoices, isLoading } = useInvoiceStore();

  useEffect(() => {
    fetchInvoices();
  }, [fetchInvoices]);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Invoices</h2>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <ul className="space-y-2">
          {invoices.map((invoice) => (
            <li key={invoice.id} className="p-4 rounded bg-bg-primary shadow">
              <strong>{invoice.customer}</strong> – ${invoice.amount} (
              {invoice.status})
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
