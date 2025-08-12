import { Invoice, InvoiceStore } from './store.type';

export interface invoiceRepositoryTypes {
  fetchInvoices: (
    payload?: FetchInvoicePayload,
  ) => Promise<FetchInvoicesResponse>;
  // getInvoiceById: (payload: GetByIdPayload) => Promise<Invoice>;
  // createInvoice: (payload: createInvoice) => Promise<Invoice>;
  // updateInvoice: (payload: updateInvoice) => Promise<Invoice>;
  // deleteInvoice: (payload: deleteInvoice) => Promise<Invoice>;
}

export interface FetchInvoicesResponse {
  data: Invoice[];
  meta: InvoiceStore['meta'];
}

export interface FetchInvoicePayload {
  limit?: number;
}

// export interface GetByIdPayload {
//   id?: number;
// }

// export interface createInvoice {
//   foo?: string;
// }
// export interface updateInvoice {
//   foo?: string;
// }
// export interface deleteInvoice {
//   foo?: string;
// }
