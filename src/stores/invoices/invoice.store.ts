import { fetchInvoices } from '@/services';
import { InvoiceStore } from '@/types';
import { create } from 'zustand';

export const useInvoiceStore = create<InvoiceStore>((set, get) => ({
  invoices: [],
  meta: {},
  currentInvoice: null,
  isLoading: false,

  fetchInvoices: async (payload) => {
    set({ isLoading: true });
    const { data, meta } = await fetchInvoices(payload);
    set({ invoices: data, meta, isLoading: false });
  },

  getInvoiceById: async (id) => {
    set({ isLoading: true });
    await new Promise((res) => setTimeout(res, 300));
    const found = get().invoices.find((inv) => inv.id === id) ?? null;
    set({ currentInvoice: found, isLoading: false });
  },

  createInvoice: async (invoice) => {
    await new Promise((res) => setTimeout(res, 300));
    set((state) => ({
      invoices: [...state.invoices, invoice],
    }));
  },

  updateInvoice: async (invoice) => {
    await new Promise((res) => setTimeout(res, 300));
    set((state) => ({
      invoices: state.invoices.map((inv) =>
        inv.id === invoice.id ? invoice : inv,
      ),
    }));
  },

  deleteInvoice: async (id) => {
    await new Promise((res) => setTimeout(res, 300));
    set((state) => ({
      invoices: state.invoices.filter((inv) => inv.id !== id),
    }));
  },

  clearCurrentInvoice: () => {
    set({ currentInvoice: null });
  },
}));
