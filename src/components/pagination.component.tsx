import { PaginationButtonProps, PaginationProps } from '@/types/components';
import { memo } from 'react';

export default memo(function Pagination({
  totalItems,
  itemsPerPage,
  currentPage,
  onPageChange: goToPage,
}: PaginationProps) {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  //FIXME fix pagination rerender! React.memo
  // const pages = [...Array(totalPages).keys()];
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  return (
    <div className="w-full">
      <nav className="flex justify-between items-center p-4">
        <div className="flex space-x-2">
          {pages.length > 0 && (
            <>
              <PaginateButton
                onClick={() => goToPage(currentPage - 1)}
                isActive={currentPage === 1}
              >
                {'<'}
              </PaginateButton>

              {pages.map((page) => {
                const isItemActive = currentPage === page;
                return (
                  <PaginateButton
                    key={page}
                    onClick={() => goToPage(page)}
                    isActive={isItemActive}
                    activeClasses="bg-blue-500 text-white"
                  >
                    {page}
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
