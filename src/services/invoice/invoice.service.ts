import { invoiceRepository } from '@/repositories';
import { FetchInvoicePayload } from '@/types';

export const fetchInvoices = async (data: FetchInvoicePayload) => {
  const result = await invoiceRepository.fetchInvoices(data);
  return result;
};

// export const getInvoiceById = async (data) => {
//   const result = await invoiceRepository.getInvoiceById(data);
//   return result;
// };

// export const createInvoice = async (data) => {
//   const result = await invoiceRepository.createInvoice(data);
//   return result;
// };

// export const updateInvoice = async (data) => {
//   const result = await invoiceRepository.updateInvoice(data);
//   return result;
// };

// export const deleteInvoice = async (data) => {
//   const result = await invoiceRepository.deleteInvoice(data);
//   return result;
// };
