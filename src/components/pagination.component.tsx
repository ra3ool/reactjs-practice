import { PaginationButtonProps, PaginationProps } from '@/types';
import { memo } from 'react';
import { usePagination, DOTS } from '@/hooks';

export default memo(function Pagination({
  totalItems,
  itemsPerPage,
  currentPage,
  onPageChange: goToPage,
}: PaginationProps) {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const paginationRange = usePagination({
    currentPage,
    totalItems,
    itemsPerPage,
  });

  if (currentPage === 0 || (paginationRange && paginationRange.length < 2)) {
    return null;
  }

  return (
    <div className="w-full">
      <nav className="flex justify-between items-center p-4">
        <div className="flex gap-2">
          {totalItems > 0 && (
            <>
              <PaginateButton
                onClick={() => goToPage(currentPage - 1)}
                isActive={currentPage === 1}
              >
                {'<'}
              </PaginateButton>

              {paginationRange?.map((pageNumber, index) => {
                if (pageNumber === DOTS) {
                  return (
                    <span key={DOTS + index} className="px-3 py-1">
                      ...
                    </span>
                  );
                }

                return (
                  <PaginateButton
                    key={pageNumber}
                    onClick={() => goToPage(pageNumber as number)}
                    isActive={currentPage === pageNumber}
                    activeClasses="bg-blue-500 text-white"
                  >
                    {pageNumber}
                  </PaginateButton>
                );
              })}

              <PaginateButton
                onClick={() => goToPage(currentPage + 1)}
                isActive={currentPage === totalPages}
              >
                {'>'}
              </PaginateButton>
            </>
          )}
        </div>
        <span className="text-sm text-gray-500">
          Showing {Math.min((currentPage - 1) * itemsPerPage + 1, totalItems)}{' '}
          to {Math.min(currentPage * itemsPerPage, totalItems)} of {totalItems}{' '}
          items
        </span>
      </nav>
    </div>
  );
});

function PaginateButton({
  isActive,
  activeClasses = 'bg-gray-500 text-gray-400 cursor-no-drop',
  deActiveClasses = 'bg-gray-200 text-gray-700 hover:bg-gray-300 cursor-pointer',
  onClick: onButtonClick,
  children,
}: PaginationButtonProps) {
  return (
    <button
      className={`px-3 py-1 rounded-md select-none ${
        isActive ? activeClasses : deActiveClasses
      }`}
      disabled={isActive}
      {...(!isActive && {
        onClick: onButtonClick,
      })}
    >
      {children}
    </button>
  );
}
