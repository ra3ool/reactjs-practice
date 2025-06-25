import { useMemo } from 'react';
import { UsePaginationParams } from '@/types';

export const DOTS = '...';

const range = (start: number, end: number) => {
  const length = end - start + 1;
  return Array.from({ length }, (_, idx) => idx + start);
};

export const usePagination = ({
  totalItems,
  itemsPerPage,
  siblingCount = 1,
  currentPage,
}: UsePaginationParams) => {
  const paginationRange = useMemo(() => {
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    const totalPageNumbersToShow = siblingCount + 5;

    if (totalPages <= totalPageNumbersToShow) {
      return range(1, totalPages);
    }

    const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
    const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPages);

    const showLeftDots = leftSiblingIndex > 2;
    const showRightDots = rightSiblingIndex < totalPages - 2;

    const firstPageIndex = 1;
    const lastPageIndex = totalPages;

    if (!showLeftDots && showRightDots) {
      const leftRange = range(1, 3 + 2 * siblingCount);
      return [...leftRange, DOTS, totalPages];
    }

    if (showLeftDots && !showRightDots) {
      const rightRange = range(
        totalPages - (3 + 2 * siblingCount) + 1,
        totalPages,
      );
      return [firstPageIndex, DOTS, ...rightRange];
    }

    if (showLeftDots && showRightDots) {
      const middleRange = range(leftSiblingIndex, rightSiblingIndex);
      return [firstPageIndex, DOTS, ...middleRange, DOTS, lastPageIndex];
    }
  }, [totalItems, itemsPerPage, siblingCount, currentPage]);

  return paginationRange;
};
