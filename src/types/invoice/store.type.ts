import { FetchInvoicesResponse } from '@/types';
import { User } from '../user';

export interface InvoiceStore {
  currentInvoice: Invoice | null;

  fetchInvoices: (data?: object) => Promise<FetchInvoicesResponse>;
  getInvoiceById: (id: number) => Promise<void>;
  createInvoice: (invoice: Invoice) => Promise<void>;
  updateInvoice: (invoice: Invoice) => Promise<void>;
  deleteInvoice: (id: number) => Promise<void>;
  setCurrentInvoice: (invoice: Invoice) => void;
  clearCurrentInvoice: () => void;
}

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
