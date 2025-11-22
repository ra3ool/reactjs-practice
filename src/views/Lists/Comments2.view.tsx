import type { Comment } from '@/types';
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

interface CommentItemProps {
  comment: Comment & { actualIndex: number; top: number };
  style: React.CSSProperties;
  onHeightChange: (index: number, height: number) => void;
}

interface VisibleComment extends Comment {
  actualIndex: number;
  top: number;
}

const CommentsVirtualList: React.FC = () => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [scrollTop, setScrollTop] = useState<number>(0);
  const [containerHeight, setContainerHeight] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [lastFetchIndex, setLastFetchIndex] = useState<number>(0);

  // Dynamic height tracking
  const [itemHeights, setItemHeights] = useState<Map<number, number>>(
    new Map(),
  );
  const ESTIMATED_ITEM_HEIGHT = 140; // Initial estimate
  const BUFFER_ITEMS = 3;
  const BATCH_SIZE = 100;
  const GAP = 50; // Gap between items

  const containerRef = useRef<HTMLDivElement>(null);
  const isFetchingRef = useRef<boolean>(false);
  const hasFetchedInitial = useRef<boolean>(false);
  const rafRef = useRef<number>(null);

  // Calculate positions based on actual heights
  const itemPositions = useMemo(() => {
    const positions: number[] = [];
    let currentTop = 0;

    comments.forEach((_, index) => {
      positions.push(currentTop);
      const height = itemHeights.get(index) || ESTIMATED_ITEM_HEIGHT;
      currentTop += height + GAP;
    });

    return positions;
  }, [comments, itemHeights]);

  const totalHeight = useMemo(() => {
    if (itemPositions.length === 0) return 0;
    const lastIndex = itemPositions.length - 1;
    const lastHeight = itemHeights.get(lastIndex) || ESTIMATED_ITEM_HEIGHT;
    return itemPositions[lastIndex] + lastHeight;
  }, [itemPositions, itemHeights]);

  // Find visible items using binary search for performance
  const { visibleComments, startIndex, endIndex } = useMemo(() => {
    if (itemPositions.length === 0) {
      return { visibleComments: [], startIndex: 0, endIndex: 0 };
    }

    // Binary search for start index
    let start = 0;
    let end = itemPositions.length - 1;
    const viewportTop = scrollTop;
    const viewportBottom = scrollTop + containerHeight;

    while (start < end) {
      const mid = Math.floor((start + end) / 2);
      if (itemPositions[mid] < viewportTop) {
        start = mid + 1;
      } else {
        end = mid;
      }
    }

    const startIndex = Math.max(0, start - BUFFER_ITEMS);

    // Find end index
    let endIdx = startIndex;
    while (
      endIdx < itemPositions.length &&
      itemPositions[endIdx] < viewportBottom
    ) {
      endIdx++;
    }
    const endIndex = Math.min(itemPositions.length, endIdx + BUFFER_ITEMS);

    const visibleComments: VisibleComment[] = comments
      .slice(startIndex, endIndex)
      .map((comment, index) => ({
        ...comment,
        actualIndex: startIndex + index,
        top: itemPositions[startIndex + index],
      }));

    return { visibleComments, startIndex, endIndex };
  }, [comments, scrollTop, containerHeight, itemPositions]);

  // Callback when item height is measured
  const handleHeightChange = useCallback((index: number, height: number) => {
    setItemHeights((prev) => {
      const newMap = new Map(prev);
      if (newMap.get(index) !== height) {
        newMap.set(index, height);
        return newMap;
      }
      return prev;
    });
  }, []);

  const fetchComments = useCallback(
    async (startId: number = 1): Promise<void> => {
      if (loading || isFetchingRef.current || !hasMore) return;

      isFetchingRef.current = true;
      setLoading(true);

      try {
        const response = await fetch(
          `https://jsonplaceholder.typicode.com/comments?_start=${
            startId - 1
          }&_limit=${BATCH_SIZE}`,
        );

        if (!response.ok) throw new Error('Failed to fetch comments');

        const newComments: Comment[] = await response.json();

        if (newComments.length === 0) {
          setHasMore(false);
          return;
        }

        setComments((prev) => {
          const existingIds = new Set(prev.map((comment) => comment.id));
          const uniqueNewComments = newComments.filter(
            (comment) => !existingIds.has(comment.id),
          );
          return [...prev, ...uniqueNewComments];
        });

        setLastFetchIndex(startId);

        if (newComments.length < BATCH_SIZE) {
          setHasMore(false);
        }
      } catch (error) {
        console.error('Error loading comments:', error);
      } finally {
        setLoading(false);
        isFetchingRef.current = false;
      }
    },
    [loading, hasMore],
  );

  useEffect(() => {
    if (!hasFetchedInitial.current) {
      hasFetchedInitial.current = true;
      fetchComments(1);
    }
  }, [fetchComments]);

  const handleScroll = useCallback(
    (e: React.UIEvent<HTMLDivElement>) => {
      const scrollTop = e.currentTarget.scrollTop;

      // Cancel previous RAF
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }

      // Use RAF for smooth updates
      rafRef.current = requestAnimationFrame(() => {
        setScrollTop(scrollTop);
      });

      if (loading || !hasMore || isFetchingRef.current) return;

      const scrollBottom = scrollTop + containerHeight;
      const triggerThreshold = containerHeight * 0.8;

      if (scrollBottom >= totalHeight - triggerThreshold) {
        const nextStartId = comments.length + 1;

        if (nextStartId > lastFetchIndex) {
          fetchComments(nextStartId);
        }
      }
    },
    [
      containerHeight,
      comments.length,
      hasMore,
      loading,
      fetchComments,
      lastFetchIndex,
      totalHeight,
    ],
  );

  useEffect(() => {
    const updateContainerHeight = () => {
      if (containerRef.current) {
        setContainerHeight(containerRef.current.clientHeight);
      }
    };

    updateContainerHeight();
    window.addEventListener('resize', updateContainerHeight);

    return () => {
      window.removeEventListener('resize', updateContainerHeight);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="h-[700px] overflow-auto relative"
      onScroll={handleScroll}
    >
      <div className="relative w-full" style={{ height: `${totalHeight}px` }}>
        {visibleComments.map((comment) => (
          <CommentItem
            key={comment.id}
            comment={comment}
            style={{
              position: 'absolute',
              top: `${comment.top}px`,
              width: 'calc(100% - 2rem)',
              left: '1rem',
              right: '1rem',
            }}
            onHeightChange={handleHeightChange}
          />
        ))}
      </div>

      {loading && (
        <div className="fixed bottom-8 left-1/2 transform bg-blue-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-3 z-50">
          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
          <span className="font-medium">Loading comments...</span>
        </div>
      )}

      {!hasMore && comments.length > 0 && (
        <div className="fixed bottom-8 left-1/2 transform bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50">
          🎉 All {comments.length} comments loaded!
        </div>
      )}

      {/* Debug info */}
      <div className="fixed top-4 right-4 bg-bg-primary p-3 rounded shadow text-xs font-mono z-50">
        <div>Rendered: {visibleComments.length} items</div>
        <div>
          Range: {startIndex} - {endIndex}
        </div>
        <div>Total: {comments.length} items</div>
        <div>Heights cached: {itemHeights.size}</div>
      </div>
    </div>
  );
};

// Dynamic height measurement component
const CommentItem: React.FC<CommentItemProps> = React.memo(
  ({ comment, style, onHeightChange }) => {
    const itemRef = useRef<HTMLDivElement>(null);
    const resizeObserverRef = useRef<ResizeObserver | null>(null);

    useEffect(() => {
      if (!itemRef.current) return;

      // Create ResizeObserver to watch height changes
      resizeObserverRef.current = new ResizeObserver((entries) => {
        const entry = entries[0];
        if (entry) {
          const height = entry.contentRect.height;
          onHeightChange(comment.actualIndex, height);
        }
      });

      resizeObserverRef.current.observe(itemRef.current);

      return () => {
        if (resizeObserverRef.current) {
          resizeObserverRef.current.disconnect();
        }
      };
    }, [comment.actualIndex, onHeightChange]);

    return (
      <div
        ref={itemRef}
        className="border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow duration-200 hover:border-blue-300"
        style={style}
      >
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 mb-3">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded">
              #{comment.id}
            </span>
            <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-200 break-words">
              {comment.name}
            </h3>
          </div>
          <span className="text-xs text-gray-500 dark:text-gray-400 px-2 py-1 rounded break-all">
            {comment.email}
          </span>
        </div>

        <div className="mb-3">
          <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
            {comment.body}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
          <span className="text-xs text-gray-500 dark:text-gray-300 px-2 py-1 rounded w-fit">
            Post: {comment.postId}
          </span>
          <div className="flex gap-2">
            <button className="p-1 hover:bg-red-50 rounded transition-colors duration-200">
              <span className="text-lg">❤️</span>
            </button>
            <button className="p-1 hover:bg-blue-50 rounded transition-colors duration-200">
              <span className="text-lg">↩️</span>
            </button>
          </div>
        </div>
      </div>
    );
  },
);

CommentItem.displayName = 'CommentItem';

export default CommentsVirtualList;
