import { FetchInvoicesResponse } from '@/types';
import { User } from '../user';

export interface InvoiceStore {
  invoices: Invoice[];
  meta: {
    date?: string;
    pagination?: {
      limit: number;
      page: number;
      total: number;
      totalPage: number;
    };
  };
  currentInvoice: Invoice | null;
  isLoading: boolean;

  fetchInvoices: (data?: object) => Promise<FetchInvoicesResponse>;
  getInvoiceById: (id: number) => Promise<void>;
  createInvoice: (invoice: Invoice) => Promise<void>;
  updateInvoice: (invoice: Invoice) => Promise<void>;
  deleteInvoice: (id: number) => Promise<void>;
  clearCurrentInvoice: () => void;
  clearInvoiceList: () => void;
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
