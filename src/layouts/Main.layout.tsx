import { CustomToggle, Sidebar } from '@/components';
import {
  authRoutes,
  baseRoutes,
  componentsRoutes,
  panelRoutes,
} from '@/constants';
import { useRouteNavigation, useTheme } from '@/hooks';
import { useAuthStore } from '@/stores';
import { SidebarItem } from '@/types';
import { useCallback, useMemo } from 'react';
import { Outlet } from 'react-router';
import { toast, ToastContainer } from 'react-toastify';

export default function Layout() {
  const { isDarkMode, toggleTheme } = useTheme();
  const { isAuthenticated, logout } = useAuthStore();
  const { navigateTo } = useRouteNavigation();

  const handleLogout = useCallback(async () => {
    const response = await logout();
    if (response.status) {
      toast.success(response.message);
      navigateTo('home', { replace: true });
    }
  }, [logout, navigateTo]);

  const sideBarItems: SidebarItem[] = useMemo(() => {
    const items: SidebarItem[] = [
      {
        title: baseRoutes.home.label as string,
        path: baseRoutes.home.path as string,
      },
      {
        title: baseRoutes.about.label as string,
        path: baseRoutes.about.path as string,
      },
      {
        title: baseRoutes.demo.label as string,
        path: baseRoutes.demo.path as string,
      },
      {
        title: componentsRoutes.root.label as string,
        path: componentsRoutes.root.path as string,
      },
    ];
    if (!isAuthenticated) {
      items.push({
        title: authRoutes.root.label as string,
        group: [
          {
            title: authRoutes.login.label as string,
            path: authRoutes.login.path as string,
          },
          {
            title: authRoutes.register.label as string,
            path: authRoutes.register.path as string,
          },
        ],
      });
    }
    if (isAuthenticated) {
      //TODO add acl
      items.push({
        title: panelRoutes.root.label as string,
        path: panelRoutes.root.path as string,
      });
    }
    items.push({
      title: 'Dark Mode',
      component: <CustomToggle isActive={isDarkMode} toggle={toggleTheme} />,
    });
    if (isAuthenticated) {
      //TODO add confirmation later
      items.push({
        title: 'logout',
        className:
          'cursor-pointer text-red-500 hover:bg-red-200 dark:hover:bg-red-950',
        actions: {
          onClick: handleLogout,
        },
      });
    }
    return items;
  }, [handleLogout, isAuthenticated, isDarkMode, toggleTheme]);

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
