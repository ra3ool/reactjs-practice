import { invoiceService } from '@/services';
import { Invoice, InvoiceStore } from '@/types';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useInvoiceStore = create<InvoiceStore>()(
  persist(
    (set) => ({
      currentInvoice: null,

      fetchInvoices: async (payload) => {
        const response = await invoiceService.fetchInvoices(payload);
        return response;
      },

      // update this later
      getInvoiceById: async (id) => {
        await new Promise((res) => setTimeout(res, 300));
        console.log('id :', id);
        set({ currentInvoice: {} as Invoice });
      },

      // update this later
      createInvoice: async (invoice) => {
        await new Promise((res) => setTimeout(res, 300));
        console.log('invoice :', invoice);
      },

      // update this later
      updateInvoice: async (invoice) => {
        await new Promise((res) => setTimeout(res, 300));
        console.log('invoice :', invoice);
      },

      // update this later
      deleteInvoice: async (id) => {
        await new Promise((res) => setTimeout(res, 300));
        console.log('id :', id);
      },

      setCurrentInvoice: (invoice: Invoice | null) => {
        set({ currentInvoice: invoice });
      },
      clearCurrentInvoice: () => {
        set({ currentInvoice: null });
      },
    }),
    {
      name: 'invoice',
    },
  ),
);
