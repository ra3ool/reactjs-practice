export interface PaginationProps {
    totalItems: number;
    itemsPerPage: number;
    currentPage: number;
    onPageChange: (page: number) => void;
}
export interface PaginationButtonProps {
    isActive: boolean;
    activeClasses?: string;
    deActiveClasses?: string;
    children: React.ReactNode;
    onClick: () => void;
}