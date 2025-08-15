import { invoiceRepository } from '@/repositories';
import { invoiceRepositoryTypes } from '@/types';

export const invoiceService: invoiceRepositoryTypes = {
  fetchInvoices: async (data) => {
    const result = await invoiceRepository.fetchInvoices(data);
    return result;
  },

  getInvoiceById: async (data) => {
    const result = await invoiceRepository.getInvoiceById(data);
    return result;
  },

  // createInvoice: async (data) => {
  //   const result = await invoiceRepository.createInvoice(data);
  //   return result;
  // },

  // updateInvoice: async (data) => {
  //   const result = await invoiceRepository.updateInvoice(data);
  //   return result;
  // },

  // deleteInvoice: async (data) => {
  //   const result = await invoiceRepository.deleteInvoice(data);
  //   return result;
  // },
};
