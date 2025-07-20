import { Outlet } from 'react-router';
import { LayoutContent, Sidebar } from '@/components';
import { componentsRoutes } from '@/constants';
import { SidebarItem } from '@/types';
import { Header } from '@/components';

const sideBarItems: SidebarItem[] = [
  { title: componentsRoutes.input.name, path: componentsRoutes.input.path },
  { title: componentsRoutes.button.name, path: componentsRoutes.button.path },
  { title: componentsRoutes.table.name, path: componentsRoutes.table.path },
  { title: componentsRoutes.toggle.name, path: componentsRoutes.toggle.path },
  { title: componentsRoutes.dropdown.name, path: componentsRoutes.dropdown.path },
  { title: componentsRoutes.expansionPanel.name, path: componentsRoutes.expansionPanel.path },
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
          <Outlet />
        </div>
      </LayoutContent>
    </div>
  );
}
