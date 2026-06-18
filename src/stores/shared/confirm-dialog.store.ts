import { create } from 'zustand';

export type ConfirmVariant = 'primary' | 'danger';

export interface ConfirmOptions {
  title?: string;
  message?: string;
  confirmText?: string;
  cancelText?: string;
  variant?: ConfirmVariant;
  confirmOnEnter?: boolean;
  cancelByEscape?: boolean;
  closeOnClickOutside?: boolean;
  onConfirm?: () => Promise<void> | void;
}

interface ConfirmDialogStore extends Required<
  Omit<ConfirmOptions, 'onConfirm'>
> {
  isOpen: boolean;
  isLoading: boolean;
  onConfirm: (() => Promise<void> | void) | null;
  resolve: ((value: boolean) => void) | null;
  open: (options?: ConfirmOptions) => Promise<boolean>;
  confirm: () => Promise<void>;
  cancel: () => void;
}

const DEFAULTS: Required<Omit<ConfirmOptions, 'onConfirm'>> = {
  title: 'Are you sure?',
  message: '',
  confirmText: 'Confirm',
  cancelText: 'Cancel',
  variant: 'primary',
  confirmOnEnter: true,
  cancelByEscape: true,
  closeOnClickOutside: true,
};

export const useConfirmDialogStore = create<ConfirmDialogStore>((set, get) => ({
  ...DEFAULTS,
  isOpen: false,
  isLoading: false,
  onConfirm: null,
  resolve: null,
  open: (options = {}) =>
    new Promise<boolean>((resolve) => {
      set({ ...DEFAULTS, ...options, isOpen: true, isLoading: false, resolve });
    }),
  confirm: async () => {
    const { onConfirm, resolve, isLoading } = get();
    if (isLoading) return;

    if (onConfirm) {
      set({ isLoading: true });
      try {
        await onConfirm();
      } catch {
        set({ isLoading: false });
        return; // keep dialog open; onConfirm owns its own error toast
      }
      set({ isLoading: false });
    }

    resolve?.(true);
    set({ isOpen: false, resolve: null });
  },
  cancel: () => {
    if (get().isLoading) return;
    get().resolve?.(false);
    set({ isOpen: false, resolve: null });
  },
}));
