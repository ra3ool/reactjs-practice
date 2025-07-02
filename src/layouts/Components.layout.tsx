import { Outlet } from 'react-router';
import { Sidebar } from '@/components';
import { componentsRoutes } from '@/constants';
import { SidebarItem } from '@/types';

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
    <div className="component-layout flex h-full w-full gap-4">
      <div className="h-full w-56 shrink-0">
        <Sidebar
          title="Components"
          items={sideBarItems}
          className="py-6 px-2 rounded-3xl"
        />
      </div>
      <div className="grow-1 overflow-auto px-1">
        <Outlet />
      </div>
    </div>
  );
}
