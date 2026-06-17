import { create } from 'zustand';

export type ConfirmVariant = 'default' | 'danger';

export interface ConfirmOptions {
  title?: string;
  message?: string;
  confirmText?: string;
  cancelText?: string;
  variant?: ConfirmVariant;
  confirmOnEnter?: boolean;
  cancelByEscape?: boolean;
  closeOnClickOutside?: boolean;
}

interface ConfirmDialogStore extends Required<ConfirmOptions> {
  isOpen: boolean;
  resolve: ((value: boolean) => void) | null;
  open: (options?: ConfirmOptions) => Promise<boolean>;
  confirm: () => void;
  cancel: () => void;
}

const DEFAULTS: Required<ConfirmOptions> = {
  title: 'Are you sure?',
  message: '',
  confirmText: 'Confirm',
  cancelText: 'Cancel',
  variant: 'default',
  confirmOnEnter: true,
  cancelByEscape: true,
  closeOnClickOutside: true,
};

export const useConfirmDialogStore = create<ConfirmDialogStore>((set, get) => ({
  ...DEFAULTS,
  isOpen: false,
  resolve: null,
  open: (options = {}) =>
    new Promise<boolean>((resolve) => {
      set({ ...DEFAULTS, ...options, isOpen: true, resolve });
    }),
  confirm: () => {
    get().resolve?.(true);
    set({ isOpen: false, resolve: null });
  },
  cancel: () => {
    get().resolve?.(false);
    set({ isOpen: false, resolve: null });
  },
}));
