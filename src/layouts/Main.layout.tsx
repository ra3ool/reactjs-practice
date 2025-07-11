import { Outlet } from 'react-router';
import { Sidebar, CustomToggle } from '@/components';
import { routes } from '@/constants';
import { SidebarItem } from '@/types';
import { useTheme } from '@/hooks';
import { useMemo } from 'react';
import { ToastContainer } from 'react-toastify';

export default function Layout() {
  const { isDarkMode, toggleTheme } = useTheme();

  const sideBarItems: SidebarItem[] = useMemo(
    () => [
      { title: 'Home', path: routes.home },
      { title: 'About', path: routes.about },
      {
        title: 'Auth',
        group: [
          { title: 'Login', path: routes.auth.login },
          { title: 'Register', path: routes.auth.register },
        ],
      },
      { title: 'Components', path: routes.components.root }, //for remain active while components routes change
      {
        title: 'Dark Mode',
        component: <CustomToggle isActive={isDarkMode} toggle={toggleTheme} />,
      },
    ],
    [isDarkMode, toggleTheme],
  );

  return (
    <>
      <main className="mail-layout h-full flex p-6 gap-6">
        <div className="h-full w-56 shrink-0">
          <Sidebar
            title="Simple Panel"
            items={sideBarItems}
            className="py-6 px-2 rounded-3xl"
          />
        </div>
        <div className="grow-1 bg-neutral-200 dark:bg-neutral-800 text-gray-900 dark:text-gray-100 p-3 rounded-3xl overflow-auto">
          <Outlet />
        </div>
      </main>
      <ToastContainer theme={isDarkMode ? 'dark' : 'light'} stacked draggable />
    </>
  );
}
