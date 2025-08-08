import { create } from 'zustand';

export type Invoice = {
  id: string;
  customer: string;
  amount: number;
  status: 'paid' | 'unpaid' | 'overdue';
  date: string;
};

type InvoiceStore = {
  invoices: Invoice[];
  currentInvoice: Invoice | null;
  isLoading: boolean;

  // Actions
  fetchInvoices: () => Promise<void>;
  getInvoiceById: (id: string) => Promise<void>;
  createInvoice: (invoice: Invoice) => Promise<void>;
  updateInvoice: (invoice: Invoice) => Promise<void>;
  deleteInvoice: (id: string) => Promise<void>;
  clearCurrentInvoice: () => void;
};

export const useInvoiceStore = create<InvoiceStore>((set, get) => ({
  invoices: [],
  currentInvoice: null,
  isLoading: false,

  fetchInvoices: async () => {
    set({ isLoading: true });
    // Replace with API call
    await new Promise((res) => setTimeout(res, 500));
    const mockData: Invoice[] = [
      {
        id: '1',
        customer: 'Alice',
        amount: 200,
        status: 'paid',
        date: '2025-08-01',
      },
      {
        id: '2',
        customer: 'Bob',
        amount: 450,
        status: 'unpaid',
        date: '2025-08-02',
      },
    ];
    set({ invoices: mockData, isLoading: false });
  },

  getInvoiceById: async (id) => {
    set({ isLoading: true });
    await new Promise((res) => setTimeout(res, 300));
    const found = get().invoices.find((inv) => inv.id === id) ?? null;
    set({ currentInvoice: found, isLoading: false });
  },

  createInvoice: async (invoice) => {
    // Simulate server response
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
