import type { Comment, CommentsPage } from '@/types';
import { useInfiniteQuery } from '@tanstack/react-query';

export function useCommentsQuery(pageSize: number | undefined = 50) {
  return useInfiniteQuery<CommentsPage, Error>({
    queryKey: ['comments'],
    queryFn: async ({ pageParam = 0 }): Promise<CommentsPage> => {
      const res = await fetch(
        `https://jsonplaceholder.typicode.com/comments?_start=${pageParam}&_limit=${pageSize}`,
      );

      if (!res.ok) throw new Error('Failed to fetch comments');

      const data: Comment[] = await res.json();
      return {
        data,
        nextCursor:
          data.length === pageSize
            ? (pageParam as number) + pageSize
            : undefined,
      };
    },
    getNextPageParam: (lastPage) => lastPage.nextCursor,
    initialPageParam: 0,
  });
}
