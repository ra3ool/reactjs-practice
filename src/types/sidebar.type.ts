export interface SidebarItem {
    title: string;
    path?: string;
    component?: React.ReactNode;
    group?: Omit<SidebarItem, 'group'>[]; // Prevent infinite nesting
}

export interface SidebarProps {
    title?: string;
    items: SidebarItem[];
}