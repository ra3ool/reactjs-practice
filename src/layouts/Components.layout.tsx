import { Outlet } from 'react-router';
import { Breadcrumb, LayoutContent, Sidebar } from '@/components';
import { componentsRoutes } from '@/constants';
import { SidebarItem } from '@/types';
import { Header } from '@/components';

const sideBarItems: SidebarItem[] = [
  {
    title: String(componentsRoutes.input.label),
    path: String(componentsRoutes.input.path),
  },
  {
    title: String(componentsRoutes.button.label),
    path: String(componentsRoutes.button.path),
  },
  {
    title: String(componentsRoutes.table.label),
    path: String(componentsRoutes.table.path),
  },
  {
    title: String(componentsRoutes.toggle.label),
    path: String(componentsRoutes.toggle.path),
  },
  {
    title: String(componentsRoutes.dropdown.label),
    path: String(componentsRoutes.dropdown.path),
  },
  {
    title: String(componentsRoutes.expansionPanel.label),
    path: String(componentsRoutes.expansionPanel.path),
  },
];

export default function ComponentsLayout() {
  return (
    <LayoutContent
      className="component-layout flex"
      headerComponent={<Header title="components header" />}
    >
      <div className="h-full w-56 shrink-0">
        <Sidebar
          items={sideBarItems}
          className="p-2"
          itemClassName="hover:bg-neutral-200 dark:hover:bg-neutral-700"
          activeItemClassName="bg-neutral-200 dark:bg-neutral-700"
        />
      </div>
      <div className="grow-1 px-1">
        <Breadcrumb />
        <Outlet />
      </div>
    </LayoutContent>
  );
}
