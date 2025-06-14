export type TableHeader = {
    key: string;
    value: string;
}
export type TableRow = { id: string | number; [key: string]: unknown };

export interface CustomTableProps {
    headers: TableHeader[];
    data: TableRow[];
    className?: string;
    tableClassName?: string;
    tableStyle?: 'striped' | 'bordered' | 'hover' | 'responsive';
    onRowClick?: (row: TableRow) => void;
    onCellClick?: (cell: string, row: TableRow) => void;
    rowClassName?: (row: TableRow) => string;
    cellClassName?: (cell: string, row: TableRow) => string;
    headerClassName?: string;
    headerStyle?: 'default' | 'bold' | 'italic';
    footer?: React.ReactNode;
    footerClassName?: string;
    footerStyle?: 'default' | 'bold' | 'italic';
    loading?: boolean;
    loadingText?: string;
    emptyText?: string;
    emptyClassName?: string;
    emptyStyle?: 'default' | 'italic' | 'bold';
    pagination?: {
        currentPage: number;
        totalPages: number;
        onPageChange: (page: number) => void;
    };
    sort?: {
        column: string;
        direction: 'asc' | 'desc';
        onSortChange: (column: string, direction: 'asc' | 'desc') => void;
    };
    filter?: {
        query: string;
        onFilterChange: (query: string) => void;
    };
    selectable?: boolean;
    selectedRows?: TableRow[];
    onRowSelect?: (row: TableRow) => void;
    onRowDeselect?: (row: TableRow) => void;
    rowKey?: string;
    cellKey?: string;
    headerKey?: string;
    footerKey?: string;
}