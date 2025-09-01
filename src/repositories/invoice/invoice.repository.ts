import { apiClient } from '@/clients';
import { invoiceRepositoryTypes } from '@/types';

export const invoiceRepository: invoiceRepositoryTypes = {
  fetchInvoices: async (payload) => {
    const response = await apiClient.get('invoices', {
      params: payload,
    });
    return response.data;
  },

  getInvoiceById: async (id) => {
    const response = await apiClient.get(`invoices/${id}`);
    return response.data;
  },

  // createInvoice: async (payload) => {
  //   const response = await apiClient.post('', payload);
  //   return response.data;
  // },

  // updateInvoice: async (payload) => {
  //   const response = await apiClient.post('', payload);
  //   return response.data;
  // },

  // deleteInvoice: async (payload) => {
  //   const response = await apiClient.post('', payload);
  //   return response.data;
  // },
};
