import { api } from '@/clients';
import { invoiceRepositoryTypes } from '@/types';

const invoiceRepository: invoiceRepositoryTypes = {
  fetchInvoices: async (payload) => {
    const response = await api.get('invoices', {
      data: payload,
    });
    return response.data;
  },

  // getInvoiceById: async (payload) => {
  //   const response = await api.post('', payload);
  //   return response.data;
  // },

  // createInvoice: async (payload) => {
  //   const response = await api.post('', payload);
  //   return response.data;
  // },

  // updateInvoice: async (payload) => {
  //   const response = await api.post('', payload);
  //   return response.data;
  // },

  // deleteInvoice: async (payload) => {
  //   const response = await api.post('', payload);
  //   return response.data;
  // },
};

export { invoiceRepository };
