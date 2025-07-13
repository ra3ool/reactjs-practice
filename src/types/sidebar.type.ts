export interface SidebarItem {
  title: string;
  path?: string;
  component?: React.ReactNode;
  group?: Omit<SidebarItem, 'group'>[]; // Prevent infinite nesting
}

export interface SidebarProps {
  title?: string;
  items: SidebarItem[];
  className?: string;
  itemClassName?: string;
  activeItemClassName?: string;
}
