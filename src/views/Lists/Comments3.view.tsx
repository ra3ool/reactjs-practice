import { Comment } from '@/types';
import { useInfiniteQuery } from '@tanstack/react-query';
import React, { useEffect, useRef } from 'react';

const ITEMS_PER_PAGE = 100;

const fetchComments = async ({ pageParam = 0 }) => {
  const start = pageParam * ITEMS_PER_PAGE;
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/comments?_start=${start}&_limit=${ITEMS_PER_PAGE}`,
  );

  if (!response.ok) throw new Error('Failed to fetch');

  const data = await response.json();
  return {
    comments: data,
    nextPage: data.length === ITEMS_PER_PAGE ? pageParam + 1 : undefined,
    hasMore: data.length === ITEMS_PER_PAGE,
  };
};

function InfiniteScrollComments() {
  const observerTarget = useRef(null);

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
    error,
  } = useInfiniteQuery({
    queryKey: ['comments'],
    queryFn: fetchComments,
    getNextPageParam: (lastPage) => lastPage.nextPage,
    initialPageParam: 0,
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 0.1 },
    );

    const currentTarget = observerTarget.current;
    if (currentTarget) {
      observer.observe(currentTarget);
    }

    return () => {
      if (currentTarget) {
        observer.unobserve(currentTarget);
      }
    };
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  const totalComments =
    data?.pages.reduce((acc, page) => acc + page.comments?.length, 0) || 0;

  if (status === 'pending') {
    return (
      <div className="flex items-center justify-center h-[700px]">
        loading...
      </div>
    );
  }

  if (status === 'error') {
    return (
      <div className="flex items-center justify-center h-[700px]">
        <div className="text-red-500">Error: {error.message}</div>
      </div>
    );
  }

  return (
    <div className="h-[700px] overflow-auto">
      <div className="space-y-4">
        {data.pages?.map((page, pageIndex) => (
          <React.Fragment key={pageIndex}>
            {page.comments?.map((comment: Comment) => (
              <div
                key={comment.id}
                className="rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex-shrink-0 flex items-center justify-center text-white font-semibold">
                    {comment.id}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-slate-800 dark:text-slate-200 truncate">
                        {comment.name}
                      </h3>
                    </div>
                    <p className="text-sm text-blue-600 mb-2 truncate">
                      {comment.email}
                    </p>
                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                      {comment.body}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </React.Fragment>
        ))}
      </div>

      <div
        ref={observerTarget}
        className="flex items-center justify-center py-8"
      >
        {isFetchingNextPage && (
          <div className="flex items-center gap-2 text-blue-500">
            loading...
            <span>Loading more comments...</span>
          </div>
        )}

        {!hasNextPage && totalComments > 0 && (
          <div className="text-slate-500 font-medium">
            🎉 You've reached the end! All {totalComments} comments loaded.
          </div>
        )}
      </div>
    </div>
  );
}

export default InfiniteScrollComments;
