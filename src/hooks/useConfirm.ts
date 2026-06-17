import { useConfirmDialogStore } from '@/stores';

export function useConfirm() {
  const open = useConfirmDialogStore((s) => s.open);
  return { confirm: open };
}
