export interface SidebarItem {
    title: string,
    path?: string
    component?: React.ReactNode
}

export interface SidebarProps {
    title?: string,
    items: SidebarItem[]
}