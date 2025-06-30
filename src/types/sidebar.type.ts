export interface SidebarItem {
  title: string;
  path?: string;
  component?: React.ReactNode;
  group?: Omit<SidebarItem, 'group'>[]; // Prevent infinite nesting
}

export interface SidebarProps {
  className?: string;
  title?: string;
  items: SidebarItem[];
}
