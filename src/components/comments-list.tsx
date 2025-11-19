import { useCommentsQuery } from '@/hooks';
import { useCommentsStore } from '@/stores';
import type { Comment } from '@/types';
import type { VirtualItem } from '@tanstack/react-virtual';
import { useVirtualizer } from '@tanstack/react-virtual';
import { memo, useCallback, useEffect, useMemo, useRef } from 'react';

export default function CommentsList() {
  const parentRef = useRef<HTMLDivElement | null>(null);
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useCommentsQuery();

  const allComments = useMemo(
    () => data?.pages.flatMap((page) => page.data) ?? [],
    [data],
  );

  const rowVirtualizer = useVirtualizer({
    count: allComments.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 120,
    overscan: 5,
    measureElement:
      typeof window !== 'undefined' &&
      navigator.userAgent.indexOf('Firefox') === -1
        ? (element) => element?.getBoundingClientRect().height
        : undefined,
  });

  const virtualItems = rowVirtualizer.getVirtualItems();
  const lastItem = virtualItems[virtualItems.length - 1];

  useEffect(() => {
    if (!lastItem) return;

    const shouldLoadMore =
      lastItem.index >= allComments.length - 10 &&
      hasNextPage &&
      !isFetchingNextPage;

    if (shouldLoadMore) {
      fetchNextPage();
    }
  }, [
    lastItem,
    allComments.length,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  ]);

  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center border rounded bg-white">
        <div className="text-gray-600">Loading comments...</div>
      </div>
    );
  }

  return (
    <div
      ref={parentRef}
      className="h-screen overflow-auto border rounded bg-white"
    >
      <div
        style={{
          height: rowVirtualizer.getTotalSize(),
          width: '100%',
          position: 'relative',
        }}
      >
        {virtualItems.map((virtualRow) => {
          const comment = allComments[virtualRow.index];
          if (!comment) return null;

          return (
            <CommentRow
              key={comment.id}
              virtual={virtualRow}
              comment={comment}
              measureElement={rowVirtualizer.measureElement}
            />
          );
        })}
      </div>

      {/* Loading indicator at the bottom */}
      {isFetchingNextPage && (
        <div className="py-4 text-center text-gray-500 bg-gray-50">
          Loading more comments...
        </div>
      )}

      {/* End of list indicator */}
      {!hasNextPage && allComments.length > 0 && (
        <div className="py-4 text-center text-gray-400 text-sm bg-gray-50">
          End of comments ({allComments.length} total)
        </div>
      )}
    </div>
  );
}

interface CommentRowProps {
  virtual: VirtualItem;
  comment: Comment;
  measureElement: (element: Element | null) => void;
}

const CommentRow = memo(
  ({ virtual, comment, measureElement }: CommentRowProps) => {
    const expanded = useCommentsStore((s) => s.expanded[comment.id]);
    const toggle = useCommentsStore((s) => s.toggleExpand);

    const handleToggle = useCallback(() => {
      toggle(comment.id);
    }, [toggle, comment.id]);

    return (
      <div
        ref={measureElement}
        data-index={virtual.index}
        style={{ transform: `translateY(${virtual.start}px)` }}
        className="p-4 border-b bg-white hover:bg-gray-50 transition-colors w-full absolute"
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-gray-900 truncate">
              {comment.name}
            </h3>
            <p className="text-sm text-gray-500 mb-2">{comment.email}</p>
            <p className="text-gray-700 whitespace-pre-wrap break-words">
              {expanded ? comment.body : `${comment.body.slice(0, 100)}...`}
            </p>
          </div>
        </div>
        <button
          onClick={handleToggle}
          className="text-blue-600 hover:text-blue-700 text-sm mt-2 font-medium transition-colors"
          aria-expanded={expanded}
          aria-label={expanded ? 'Collapse comment' : 'Expand comment'}
        >
          {expanded ? '← Collapse' : 'Expand →'}
        </button>
      </div>
    );
  },
);

CommentRow.displayName = 'CommentRow';
