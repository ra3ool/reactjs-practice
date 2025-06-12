export interface SidebarItem {
    title: string,
    path: string
}

export interface SidebarProps {
    title?: string,
    items: SidebarItem[]
}