import { create } from 'zustand';

interface CommentUIState {
  expanded: Record<number, boolean>;
  toggleExpand: (id: number) => void;
}

export const useCommentsStore = create<CommentUIState>((set) => ({
  expanded: {},
  toggleExpand: (id) =>
    set((state) => ({
      expanded: {
        ...state.expanded,
        [id]: !state.expanded[id],
      },
    })),
}));
