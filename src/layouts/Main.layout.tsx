import { Outlet } from 'react-router';
import { Sidebar, CustomToggle } from '@/components';
import {
  authRoutes,
  baseRoutes,
  componentsRoutes,
  panelRoutes,
} from '@/constants';
import { SidebarItem } from '@/types';
import { useTheme } from '@/hooks';
import { useMemo } from 'react';
import { ToastContainer } from 'react-toastify';
import { useAuthStore } from '@/stores';

export default function Layout() {
  const { isDarkMode, toggleTheme } = useTheme();
  const { isAuthenticated } = useAuthStore();

  const sideBarItems: SidebarItem[] = useMemo(() => {
    const items: SidebarItem[] = [
      {
        title: String(baseRoutes.home.label),
        path: String(baseRoutes.home.path),
      },
      {
        title: String(baseRoutes.about.label),
        path: String(baseRoutes.about.path),
      },
      {
        title: String(baseRoutes.demo.label),
        path: String(baseRoutes.demo.path),
      },
      {
        title: String(componentsRoutes.root.label),
        path: String(componentsRoutes.root.path),
      },
    ];
    if (!isAuthenticated) {
      items.push({
        title: String(authRoutes.root.label),
        group: [
          {
            title: String(authRoutes.login.label),
            path: String(authRoutes.login.path),
          },
          {
            title: String(authRoutes.register.label),
            path: String(authRoutes.register.path),
          },
        ],
      });
    }
    if (isAuthenticated) {
      //TODO add acl
      items.push({
        title: String(panelRoutes.root.label),
        path: String(panelRoutes.root.path),
      }); //TODO implement panel
    }
    items.push({
      title: 'Dark Mode',
      component: <CustomToggle isActive={isDarkMode} toggle={toggleTheme} />,
    });
    return items;
  }, [isDarkMode, toggleTheme, isAuthenticated]);

  return (
    <>
      <main className="mail-layout min-h-full flex p-6 gap-6">
        <div className="h-[calc(100vh-theme(space.12))] w-56 shrink-0 sticky top-6">
          <Sidebar
            title="Simple Panel"
            items={sideBarItems}
            className="py-6 px-2 rounded-3xl bg-bg-primary text-text-primary shadow"
            itemClassName="hover:bg-neutral-200 dark:hover:bg-neutral-700"
            activeItemClassName="bg-neutral-200 dark:bg-neutral-700"
          />
        </div>
        <div className="grow-1 flex flex-col">
          <Outlet />
        </div>
      </main>
      <ToastContainer theme={isDarkMode ? 'dark' : 'light'} stacked draggable />
    </>
  );
}
