import { useConfirmDialogStore } from '@/stores';
import { cn } from '@/utils/cn';
import { useEffect } from 'react';
import Portal from './portal';
import { SvgLoader } from './svg-loader.component';

export function ConfirmDialog() {
  const isOpen = useConfirmDialogStore((s) => s.isOpen);
  const isLoading = useConfirmDialogStore((s) => s.isLoading);
  const title = useConfirmDialogStore((s) => s.title);
  const message = useConfirmDialogStore((s) => s.message);
  const confirmText = useConfirmDialogStore((s) => s.confirmText);
  const cancelText = useConfirmDialogStore((s) => s.cancelText);
  const variant = useConfirmDialogStore((s) => s.variant);
  const confirm = useConfirmDialogStore((s) => s.confirm);
  const cancel = useConfirmDialogStore((s) => s.cancel);
  const confirmOnEnter = useConfirmDialogStore((s) => s.confirmOnEnter);
  const cancelByEscape = useConfirmDialogStore((s) => s.cancelByEscape);
  const closeOnClickOutside = useConfirmDialogStore(
    (s) => s.closeOnClickOutside,
  );

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const onKeydown = (e: KeyboardEvent) => {
      if (isLoading) return;
      if (e.key === 'Escape' && cancelByEscape) cancel();
      if (e.key === 'Enter' && confirmOnEnter) confirm();
    };
    document.addEventListener('keydown', onKeydown);
    return () => document.removeEventListener('keydown', onKeydown);
  }, [isOpen, isLoading, confirm, cancel, cancelByEscape, confirmOnEnter]);

  if (!isOpen) return null;

  return (
    <Portal>
      <div
        className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/50"
        onClick={(e) =>
          e.target === e.currentTarget && closeOnClickOutside && cancel()
        }
      >
        <div
          className="w-[min(400px,90vw)] rounded-lg bg-white p-6"
          role="alertdialog"
          aria-modal="true"
          aria-label={title}
        >
          <h2 className="mb-2 text-lg font-semibold text-gray-900">{title}</h2>
          <p className="text-gray-600">{message}</p>
          <div className="mt-5 flex justify-end gap-2">
            <button
              type="button"
              disabled={isLoading}
              className="rounded-md border border-gray-300 px-4 py-2 font-medium hover:bg-gray-50 disabled:opacity-50"
              onClick={cancel}
            >
              {cancelText}
            </button>
            <button
              type="button"
              disabled={isLoading}
              className={cn(
                'inline-flex items-center gap-2 rounded-md px-4 py-2 font-medium text-white disabled:opacity-70',
                variant === 'danger'
                  ? 'bg-red-500 hover:bg-red-600'
                  : 'bg-blue-500 hover:bg-blue-600',
              )}
              onClick={confirm}
            >
              {isLoading && <SvgLoader width={24} height={24} name="spinner" />}
              {confirmText}
            </button>
          </div>
        </div>
      </div>
    </Portal>
  );
}
