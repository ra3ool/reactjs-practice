import { Outlet } from 'react-router';
import { Breadcrumb, LayoutContent, Sidebar } from '@/components';
import { componentsRoutes } from '@/constants';
import { SidebarItem } from '@/types';
import { Header } from '@/components';

const sideBarItems: SidebarItem[] = [
  { title: componentsRoutes.input.label, path: componentsRoutes.input.path },
  { title: componentsRoutes.button.label, path: componentsRoutes.button.path },
  { title: componentsRoutes.table.label, path: componentsRoutes.table.path },
  { title: componentsRoutes.toggle.label, path: componentsRoutes.toggle.path },
  {
    title: componentsRoutes.dropdown.label,
    path: componentsRoutes.dropdown.path,
  },
  {
    title: componentsRoutes.expansionPanel.label,
    path: componentsRoutes.expansionPanel.path,
  },
];

export default function ComponentsLayout() {
  return (
    <div className="flex flex-col gap-6 h-full">
      <Header title="component header" />
      <LayoutContent className="component-layout flex">
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
    </div>
  );
}
