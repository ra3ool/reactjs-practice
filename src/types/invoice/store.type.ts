import { User } from '../user';

export interface Invoice {
  id: number;
  customer: User;
  amount: number;
  date: string;
  reference: string;
  items: InvoiceItems[];
  [key: string]: unknown;
}

export interface InvoiceItems {
  id: number;
  qt: number;
  sku: string;
}

export interface InvoiceStore {
  invoices: Invoice[];
  meta: object;
  currentInvoice: Invoice | null;
  isLoading: boolean;

  fetchInvoices: (data: object) => Promise<void>;
  getInvoiceById: (id: number) => Promise<void>;
  createInvoice: (invoice: Invoice) => Promise<void>;
  updateInvoice: (invoice: Invoice) => Promise<void>;
  deleteInvoice: (id: number) => Promise<void>;
  clearCurrentInvoice: () => void;
  clearInvoiceList: () => void;
}
