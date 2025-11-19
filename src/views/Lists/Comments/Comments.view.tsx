import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

interface Comment {
  id: number;
  postId: number;
  name: string;
  email: string;
  body: string;
}

interface CommentItemProps {
  comment: Comment & { actualIndex: number; top: number };
  style: React.CSSProperties;
  formatText: (text: string, maxLength?: number) => string;
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

  const ITEM_HEIGHT = 120;
  const BUFFER_ITEMS = 3;
  const BATCH_SIZE = 50;
  const containerRef = useRef<HTMLDivElement>(null);
  const isFetchingRef = useRef<boolean>(false);

  const { visibleComments, totalHeight } = useMemo(() => {
    const startIndex = Math.max(
      0,
      Math.floor(scrollTop / ITEM_HEIGHT) - BUFFER_ITEMS,
    );
    const visibleItemCount =
      Math.ceil(containerHeight / ITEM_HEIGHT) + 2 * BUFFER_ITEMS;
    const endIndex = Math.min(comments.length, startIndex + visibleItemCount);

    const visibleComments: VisibleComment[] = comments
      .slice(startIndex, endIndex)
      .map((comment, index) => ({
        ...comment,
        actualIndex: startIndex + index,
        top: (startIndex + index) * ITEM_HEIGHT,
      }));

    const totalHeight = comments.length * ITEM_HEIGHT;

    return { visibleComments, totalHeight };
  }, [comments, scrollTop, containerHeight]);

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
    fetchComments(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleScroll = useCallback(
    (e: React.UIEvent<HTMLDivElement>) => {
      const scrollTop = e.currentTarget.scrollTop;
      setScrollTop(scrollTop);

      if (loading || !hasMore || isFetchingRef.current) return;

      const scrollBottom = scrollTop + containerHeight;
      const totalHeight = comments.length * ITEM_HEIGHT;

      const triggerThreshold = 0.8 * containerHeight;

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
    };
  }, []);

  const formatText = useCallback(
    (text: string, maxLength: number = 100): string => {
      if (text.length <= maxLength) return text;
      return text.substring(0, maxLength) + '...';
    },
    [],
  );

  return (
    <div className="flex flex-col h-screen bg-gray-50 p-4">
      <header className="bg-white rounded-lg shadow-sm p-4 mb-4">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
          <h1 className="text-xl font-bold text-gray-800">
            لیست کامنت‌ها ({comments.length.toLocaleString()} کامنت)
          </h1>
          <div className="flex gap-4 text-sm text-gray-600">
            <span className="bg-gray-100 px-2 py-1 rounded">
              ارتفاع کل: {Math.round(totalHeight / 1000)}k px
            </span>
            <span className="bg-gray-100 px-2 py-1 rounded">
              کامنت‌های visible: {visibleComments.length}
            </span>
          </div>
        </div>
      </header>

      <div
        ref={containerRef}
        className="flex-1 bg-white rounded-lg shadow-sm overflow-auto relative border border-gray-200"
        onScroll={handleScroll}
      >
        <div className="relative w-full" style={{ height: `${totalHeight}px` }}>
          {visibleComments.map((comment, index) => (
            <CommentItem
              key={comment.id}
              comment={comment}
              style={{
                position: 'absolute',
                top: `${comment.top + (index + 1) * 10}px`,
                height: `${ITEM_HEIGHT}px`,
                width: 'calc(100% - 2rem)',
                left: '1rem',
                right: '1rem',
              }}
              formatText={formatText}
            />
          ))}
        </div>

        {loading && (
          <div className="sticky bottom-4 left-1/2 transform -translate-x-1/2 bg-blue-500 text-white px-4 py-2 rounded-lg shadow-lg flex items-center gap-2 w-fit mx-auto">
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />{' '}
            در حال بارگذاری کامنت‌های بیشتر...
          </div>
        )}

        {!hasMore && comments.length > 0 && (
          <div className="sticky bottom-4 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg w-fit mx-auto">
            🎉 به انتهای لیست رسیدید! ({comments.length.toLocaleString()} کامنت)
          </div>
        )}
      </div>
    </div>
  );
};

const CommentItem: React.FC<CommentItemProps> = React.memo(
  ({ comment, style, formatText }) => (
    <div
      className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow duration-200 hover:border-blue-300"
      style={style}
      data-comment-id={comment.id}
    >
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 mb-3">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded">
            #{comment.id}
          </span>
          <h3 className="text-sm font-semibold text-gray-800 break-words">
            {formatText(comment.name, 40)}
          </h3>
        </div>
        <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded break-all">
          {comment.email}
        </span>
      </div>

      <div className="mb-3">
        <p className="text-sm text-gray-700 leading-relaxed">
          {formatText(comment.body)}
        </p>
      </div>

      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
        <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded w-fit">
          پست: {comment.postId}
        </span>
        <div className="flex gap-2">
          <button
            className="p-1 hover:bg-red-50 rounded transition-colors duration-200"
            aria-label="لایک"
          >
            <span className="text-lg">❤️</span>
          </button>
          <button
            className="p-1 hover:bg-blue-50 rounded transition-colors duration-200"
            aria-label="پاسخ"
          >
            <span className="text-lg">↩️</span>
          </button>
        </div>
      </div>
    </div>
  ),
);

CommentItem.displayName = 'CommentItem';

export default CommentsVirtualList;
