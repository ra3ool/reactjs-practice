import { ReactNode } from 'react'

export type TableHeader = {
    key: string;
    value: string;
    render?: (row: TableRow) => ReactNode
}
export type TableRow = { id: string | number;[key: string]: unknown };
export type TableCell = string | number;

export interface CustomTableProps {
    headers: TableHeader[];
    data: TableRow[];
    className?: string;
    rowClassName?: string;
    cellClassName?: string;
    onRowClick?: (row: TableRow) => void;
    onCellClick?: (cell: TableCell, row: TableRow) => void;
    loading?: boolean;
    loadingText?: string;
    emptyText?: string;
    sort?: boolean;
    pagination?: {
        itemsPerPage: number;
        currentPage: number;
    };

    //for later
    headerClassName?: string;
    headerStyle?: 'default' | 'bold' | 'italic';
    footer?: ReactNode;
    footerClassName?: string;
    footerStyle?: 'default' | 'bold' | 'italic';
    emptyClassName?: string;
    emptyStyle?: 'default' | 'italic' | 'bold';
    selectable?: boolean;
    selectedRows?: TableRow[];
    onRowSelect?: (row: TableRow) => void;
    onRowDeselect?: (row: TableRow) => void;
    rowKey?: string;
    cellKey?: string;
    headerKey?: string;
    footerKey?: string;
}