import { Outlet } from 'react-router';
import { Sidebar, CustomToggle, Breadcrumb } from '@/components';
import { routes } from '@/constants';
import { SidebarItem } from '@/types';
import { useTheme } from '@/hooks';
import { useMemo } from 'react';
import { ToastContainer } from 'react-toastify';
import { useAuthStore } from '@/stores';

export default function Layout() {
  const { isDarkMode, toggleTheme } = useTheme();
  const { user, isAuthenticated } = useAuthStore();

  const sideBarItems: SidebarItem[] = useMemo(() => {
    const items: SidebarItem[] = [
      { title: routes.home.name, path: routes.home.path },
      { title: routes.about.name, path: routes.about.path },
      { title: routes.demo.name, path: routes.demo.path },
    ];
    if (!isAuthenticated) {
      items.push({
        title: 'Auth',
        group: [
          { title: routes.auth.login.name, path: routes.auth.login.path },
          { title: routes.auth.register.name, path: routes.auth.register.path },
        ],
      });
    } else {
      items.push(
        {
          title: routes.components.root.name,
          path: routes.components.root.path,
        }, // write root for remain active while components routes change
      );
    }
    if (isAuthenticated && user?.roles?.includes('admin')) {
      items.push({ title: routes.demo.name, path: routes.demo.path }); //TODO implement panel
    }
    items.push({
      title: 'Dark Mode',
      component: <CustomToggle isActive={isDarkMode} toggle={toggleTheme} />,
    });
    return items;
  }, [isDarkMode, toggleTheme, user, isAuthenticated]);

  return (
    <>
      <main className="mail-layout min-h-full flex p-6 gap-6">
        <div className="h-[calc(100vh-theme(space.12))] w-56 shrink-0 sticky top-6">
          <Sidebar
            title="Simple Panel"
            items={sideBarItems}
            className="py-6 px-2 rounded-3xl bg-bg-primary text-text-primary"
            itemClassName="hover:bg-neutral-200 dark:hover:bg-neutral-700"
            activeItemClassName="bg-neutral-200 dark:bg-neutral-700"
          />
        </div>
        <div className="grow-1 flex flex-col">
          <Breadcrumb />
          <Outlet />
        </div>
      </main>
      <ToastContainer theme={isDarkMode ? 'dark' : 'light'} stacked draggable />
    </>
  );
}
