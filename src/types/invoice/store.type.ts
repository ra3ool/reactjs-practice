import { User } from '../user';
import { invoiceRepositoryTypes } from './invoice-functions.type';

export interface InvoiceStore {
  currentInvoice: Invoice | null;

  fetchInvoices: invoiceRepositoryTypes['fetchInvoices'];
  getInvoiceById: invoiceRepositoryTypes['getInvoiceById'];
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
