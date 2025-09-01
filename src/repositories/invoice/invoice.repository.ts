import repositoryApi from '@/lib/axios';
import { invoiceRepositoryTypes } from '@/types';

export const invoiceRepository: invoiceRepositoryTypes = {
  fetchInvoices: async (payload) => {
    const response = await repositoryApi.get('invoices', {
      params: payload,
    });
    return response.data;
  },

  getInvoiceById: async (id) => {
    const response = await repositoryApi.get(`invoices/${id}`);
    return response.data;
  },

  // createInvoice: async (payload) => {
  //   const response = await repositoryApi.post('', payload);
  //   return response.data;
  // },

  // updateInvoice: async (payload) => {
  //   const response = await repositoryApi.post('', payload);
  //   return response.data;
  // },

  // deleteInvoice: async (payload) => {
  //   const response = await repositoryApi.post('', payload);
  //   return response.data;
  // },
};
