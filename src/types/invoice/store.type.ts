export interface Invoice {
  id: string | number;
  customer: string;
  amount: number;
  status: 'paid' | 'unpaid' | 'overdue';
  date: string;
  [key: string]: unknown;
}

export interface InvoiceStore {
  invoices: Invoice[];
  meta: object;
  currentInvoice: Invoice | null;
  isLoading: boolean;

  fetchInvoices: (data: object) => Promise<void>;
  getInvoiceById: (id: string) => Promise<void>;
  createInvoice: (invoice: Invoice) => Promise<void>;
  updateInvoice: (invoice: Invoice) => Promise<void>;
  deleteInvoice: (id: string) => Promise<void>;
  clearCurrentInvoice: () => void;
  clearInvoiceList: () => void;
}
