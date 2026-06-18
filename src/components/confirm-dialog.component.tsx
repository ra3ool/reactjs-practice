import { useConfirmDialogStore } from '@/stores';
import { cn } from '@/utils/cn';
import { useCallback, useEffect } from 'react';
import { CustomButton } from './custom-button.component';
import Portal from './portal';

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

  const handleBackdropClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (e.target === e.currentTarget && closeOnClickOutside) {
        cancel();
      }
    },
    [closeOnClickOutside, cancel],
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
        className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
        onClick={handleBackdropClick}
      >
        <div
          className="w-[min(400px,90vw)] rounded-lg bg-bg-primary text-text-primary p-6 shadow-2xl"
          role="alertdialog"
          aria-modal="true"
          aria-label={title}
        >
          <h2
            className={cn(
              'mb-2 text-lg font-semibold',
              variant === 'danger'
                ? 'text-red-600 dark:text-red-500'
                : 'text-gray-900 dark:text-white',
            )}
          >
            {title}
          </h2>
          <p className="text-gray-600 dark:text-gray-300">{message}</p>
          <div className="mt-5 flex justify-end gap-2">
            <CustomButton
              variant="secondary"
              disabled={isLoading}
              onClick={cancel}
            >
              {cancelText}
            </CustomButton>
            <CustomButton
              variant={variant}
              loading={isLoading}
              onClick={confirm}
            >
              {confirmText}
            </CustomButton>
          </div>
        </div>
      </div>
    </Portal>
  );
}
