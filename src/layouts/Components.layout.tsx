import { Outlet } from 'react-router';
import { LayoutContent, Sidebar } from '@/components';
import { componentsRoutes } from '@/constants';
import { SidebarItem } from '@/types';
import { Header } from '@/components';

const sideBarItems: SidebarItem[] = [
  { title: 'input', path: componentsRoutes.input },
  { title: 'button', path: componentsRoutes.button },
  { title: 'table', path: componentsRoutes.table },
  { title: 'toggle', path: componentsRoutes.toggle },
  { title: 'dropdown', path: componentsRoutes.dropdown },
  { title: 'expansionPanel', path: componentsRoutes.expansionPanel },
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
