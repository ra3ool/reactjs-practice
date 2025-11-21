import { Comment } from '@/types';
import { useEffect, useRef, useState } from 'react';

const ITEMS_PER_PAGE = 100;

function InfiniteScrollComments() {
  const [comments, setComments] = useState<Comment[]>([]);
  const [page, setPage] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const observerTarget = useRef(null);

  const fetchComments = async (pageNum: number) => {
    try {
      setLoading(true);
      setError(null);

      const start = pageNum * ITEMS_PER_PAGE;
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/comments?_start=${start}&_limit=${ITEMS_PER_PAGE}`,
      );

      if (!response.ok) throw new Error('Failed to fetch');

      const data = await response.json();

      if (data.length < ITEMS_PER_PAGE) {
        setHasMore(false);
      }

      setComments((prev) => [...prev, ...data]);
      setLoading(false);
    } catch (err) {
      setError((err.message as string) || null);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComments(0);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loading) {
          setPage((prev) => prev + 1);
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
  }, [hasMore, loading]);

  useEffect(() => {
    if (page > 0) {
      fetchComments(page);
    }
  }, [page]);

  if (error && comments.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-red-500 text-center">
          <p className="text-xl font-semibold mb-2">Error!</p>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8">
      <div className="">
        <div></div>

        {loading && comments.length === 0 && (
          <div className="flex items-center justify-center py-20">
            loading...
          </div>
        )}

        <div className="space-y-4">
          {comments.map((comment) => (
            <div
              key={comment.id}
              className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex-shrink-0 flex items-center justify-center text-white font-semibold">
                  {comment.id}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-slate-800 truncate">
                      {comment.name}
                    </h3>
                  </div>
                  <p className="text-sm text-blue-600 mb-2 truncate">
                    {comment.email}
                  </p>
                  <p className="text-slate-600 leading-relaxed">
                    {comment.body}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div
          ref={observerTarget}
          className="flex flex-col items-center justify-center py-8"
        >
          {loading && comments.length > 0 && (
            <div className="flex items-center gap-2 text-blue-500">
              loading...
              <span>Loading more comments...</span>
            </div>
          )}

          {!hasMore && comments.length > 0 && (
            <div className="text-slate-500 font-medium">
              🎉 All done! Loaded all {comments.length} comments.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default InfiniteScrollComments;
