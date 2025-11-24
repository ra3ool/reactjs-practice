import { useCommentsQuery } from '@/hooks';
import { useCommentsStore } from '@/stores';
import type { Comment } from '@/types';
import type { VirtualItem } from '@tanstack/react-virtual';
import { useVirtualizer } from '@tanstack/react-virtual';
import { memo, useCallback, useEffect, useMemo, useRef } from 'react';

export default function CommentsList({ pageSize }: { pageSize?: number }) {
  const parentRef = useRef<HTMLDivElement | null>(null);
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useCommentsQuery(pageSize);

  const allComments = useMemo(
    () => data?.pages.flatMap((page) => page.data) ?? [],
    [data],
  );

  const rowCount = hasNextPage ? allComments.length + 1 : allComments.length;

  const rowVirtualizer = useVirtualizer({
    count: rowCount,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 140, // 120 for comment + 20 for gap
    overscan: 5,
  });

  const virtualItems = rowVirtualizer.getVirtualItems();

  useEffect(() => {
    const lastItem = virtualItems[virtualItems.length - 1];
    if (!lastItem) return;

    if (
      lastItem.index >= allComments.length - 1 &&
      hasNextPage &&
      !isFetchingNextPage
    ) {
      fetchNextPage();
    }
  }, [virtualItems, allComments.length, hasNextPage, isFetchingNextPage, fetchNextPage]);

  if (isLoading) {
    return (
      <div className="h-[660px] flex items-center justify-center">
        <div className="text-gray-600">Loading initial comments...</div>
      </div>
    );
  }

  return (
    <>
      <p className="mb-5">
        you can see doc in{' '}
        <a
          href="https://tanstack.com/virtual/latest/docs/introduction"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 hover:underline"
        >
          tanstack.com/virtual
        </a>
      </p>
      <div ref={parentRef} className="h-[660px] overflow-auto rounded-lg">
        <div
          style={{ height: `${rowVirtualizer.getTotalSize()}px` }}
          className="w-full relative"
        >
          {virtualItems.map((virtualRow) => {
            const isLoaderRow = virtualRow.index > allComments.length - 1;
            const comment = allComments[virtualRow.index];

            if (isLoaderRow) {
              return (
                <div
                  key="loader"
                  style={{ transform: `translateY(${virtualRow.start}px)` }}
                  className="absolute top-0 right-0 w-full"
                >
                  {hasNextPage ? (
                    <div className="text-center py-4">
                      Loading more comments...
                    </div>
                  ) : (
                    <div className="text-center text-sm text-gray-500 dark:text-gray-400 py-4">
                      End of comments ({allComments.length} total)
                    </div>
                  )}
                </div>
              );
            }

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
      </div>
    </>
  );
}

interface CommentRowProps {
  virtual: VirtualItem;
  comment: Comment;
  measureElement: (element: Element | null) => void;
}

const CommentRow = memo(
  ({ virtual, comment, measureElement }: CommentRowProps) => {
    const rowRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      if (rowRef.current) {
        measureElement(rowRef.current);
      }
    }, [measureElement, virtual.size]);

    const expanded = useCommentsStore((s) => s.expanded[comment.id]);
    const toggle = useCommentsStore((s) => s.toggleExpand);

    const handleToggle = useCallback(() => {
      toggle(comment.id);
    }, [toggle, comment.id]);

    return (
      <div
        ref={rowRef}
        data-index={virtual.index}
        style={{ transform: `translateY(${virtual.start}px)` }}
        className="absolute top-0 right-0 w-full"
      >
        <div className="p-4 border rounded-xl hover:bg-gray-100 dark:hover:bg-neutral-700 transition-colors mx-2 mb-5 shadow-sm">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold truncate text-gray-800 dark:text-gray-200">
                {comment.name}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                {comment.email}
              </p>
              <p className="text-gray-700 dark:text-gray-100 whitespace-pre-wrap break-words">
                {expanded
                  ? comment.body
                  : `${comment.body.slice(0, 100)}${
                      comment.body.length > 100 ? '...' : ''
                    }`}
              </p>
            </div>
          </div>
          <button
            onClick={handleToggle}
            className="text-blue-600 hover:text-blue-700 text-sm mt-2 font-medium transition-colors"
            aria-expanded={expanded}
            aria-label={expanded ? 'Collapse comment' : 'Expand comment'}
          >
            {expanded ? 'Show Less' : 'Show More'}
          </button>
        </div>
      </div>
    );
  },
);

CommentRow.displayName = 'CommentRow';
