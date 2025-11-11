import { LayoutContent, Sidebar } from '@/components';
import { componentsRoutes } from '@/constants';
import { SidebarItem } from '@/types';
import { Outlet } from 'react-router';

const sideBarItems: SidebarItem[] = [
  {
    title: componentsRoutes?.input?.label as string,
    path: componentsRoutes?.input?.path as string,
  },
  {
    title: componentsRoutes?.button?.label as string,
    path: componentsRoutes?.button?.path as string,
  },
  {
    title: componentsRoutes?.table?.label as string,
    path: componentsRoutes?.table?.path as string,
  },
  {
    title: componentsRoutes?.toggle?.label as string,
    path: componentsRoutes?.toggle?.path as string,
  },
  {
    title: componentsRoutes?.dropdown?.label as string,
    path: componentsRoutes?.dropdown?.path as string,
  },
  {
    title: componentsRoutes?.expansionPanel?.label as string,
    path: componentsRoutes?.expansionPanel?.path as string,
  },
];

export default function ComponentsLayout() {
  return (
    <LayoutContent className="component-layout flex p-0 rounded-none shadow-none">
      <div className="h-full w-56 shrink-0">
        <Sidebar
          items={sideBarItems}
          className="p-2"
          itemClassName="hover:bg-neutral-200 dark:hover:bg-neutral-700"
          activeItemClassName="bg-neutral-200 dark:bg-neutral-700"
        />
      </div>
      <div className="h-full grow flex flex-col">
        <Outlet />
      </div>
    </LayoutContent>
  );
}
