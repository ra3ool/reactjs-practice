import { Outlet } from 'react-router';
import { Sidebar, CustomToggle } from '@/components';
import { authRoutes, baseRoutes, componentsRoutes } from '@/constants';
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
      { title: baseRoutes.home.name, path: baseRoutes.home.path },
      { title: baseRoutes.about.name, path: baseRoutes.about.path },
      { title: baseRoutes.demo.name, path: baseRoutes.demo.path },
    ];
    if (!isAuthenticated) {
      items.push({
        title: authRoutes.root.name,
        group: [
          { title: authRoutes.login.name, path: authRoutes.login.path },
          { title: authRoutes.register.name, path: authRoutes.register.path },
        ],
      });
    }
    items.push({
      title: componentsRoutes.root.name,
      path: componentsRoutes.root.path,
    });
    if (isAuthenticated && user?.roles?.includes('admin')) {
      items.push({ title: baseRoutes.demo.name, path: baseRoutes.demo.path }); //TODO implement panel
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
          <Outlet />
        </div>
      </main>
      <ToastContainer theme={isDarkMode ? 'dark' : 'light'} stacked draggable />
    </>
  );
}
