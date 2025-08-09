import { Invoice } from './store.type';

export interface invoiceRepositoryTypes {
  fetchInvoices: (payload: FetchInvoicePayload) => Promise<Invoice[]>;
  // getInvoiceById: (payload: GetByIdPayload) => Promise<Invoice>;
  // createInvoice: (payload: createInvoice) => Promise<Invoice>;
  // updateInvoice: (payload: updateInvoice) => Promise<Invoice>;
  // deleteInvoice: (payload: deleteInvoice) => Promise<Invoice>;
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
