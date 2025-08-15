import { Invoice } from '@/types';

export interface invoiceRepositoryTypes {
  fetchInvoices: (
    payload?: FetchInvoicePayload,
  ) => Promise<FetchInvoicesResponse>;
  getInvoiceById: (id: number) => Promise<FetchInvoiceByIdResponse>;
  // createInvoice: (payload: createInvoice) => Promise<Invoice>;
  // updateInvoice: (payload: updateInvoice) => Promise<Invoice>;
  // deleteInvoice: (payload: deleteInvoice) => Promise<Invoice>;
}

export interface Meta {
  date?: string;
  pagination?: {
    limit: number;
    page: number;
    total: number;
    totalPage: number;
  };
}

export interface FetchInvoicesResponse {
  data: Invoice[];
  meta: Meta;
}

export interface FetchInvoiceByIdResponse {
  data: Invoice;
  meta: Meta;
}

export interface FetchInvoicePayload {
  page?: number;
  limit?: number;
  startDate?: string; // ISO date or YYYY-MM-DD
  endDate?: string; // ISO date or YYYY-MM-DD
  minAmount?: number;
  maxAmount?: number;
}

// export interface createInvoice {
//   foo?: string;
// }
// export interface updateInvoice {
//   foo?: string;
// }
// export interface deleteInvoice {
//   foo?: string;
// }
