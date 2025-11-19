import type { Comment, CommentsPage } from '@/types';
import { useInfiniteQuery } from '@tanstack/react-query';

const PAGE_SIZE = 50;

export function useCommentsQuery() {
  return useInfiniteQuery<CommentsPage, Error>({
    queryKey: ['comments'],
    queryFn: async ({ pageParam = 0 }): Promise<CommentsPage> => {
      const res = await fetch(
        `https://jsonplaceholder.typicode.com/comments?_start=${pageParam}&_limit=${PAGE_SIZE}`,
      );

      if (!res.ok) throw new Error('Failed to fetch comments');

      const data: Comment[] = await res.json();
      return {
        data,
        nextCursor:
          data.length === PAGE_SIZE
            ? (pageParam as number) + PAGE_SIZE
            : undefined,
      };
    },
    getNextPageParam: (lastPage) => lastPage.nextCursor,
    initialPageParam: 0,
    // Remove maxPages or increase it to handle all data
    // maxPages: 10, // This was limiting to 10 pages (500 items)
  });
}
