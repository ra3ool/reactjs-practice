import { Outlet } from 'react-router';
import { Sidebar, CustomToggle } from '@/components';
import { routes } from '@/constants';
import { SidebarProps } from '@/types';
import { useTheme } from '@/hooks';
import { useMemo } from 'react';

export default function Layout() {
  const { isDarkMode, toggleTheme } = useTheme();

  const sideBarConfig: SidebarProps = useMemo(
    () => ({
      title: 'React Practice',
      items: [
        { title: 'Home', path: routes.home },
        { title: 'About', path: routes.about },
        {
          title: 'Auth',
          group: [
            { title: 'Login', path: routes.auth.login },
            { title: 'Register', path: routes.auth.register },
          ],
        },
        { title: 'Components', path: routes.components.root },
        {
          title: 'Dark Mode',
          component: (
            <CustomToggle isActive={isDarkMode} toggle={toggleTheme} />
          ),
        },
      ],
    }),
    [isDarkMode, toggleTheme],
  );

  return (
    <main className="mail-layout h-full flex p-6 gap-6">
      <Sidebar config={sideBarConfig} />
      <div className="grow-1 overflow-auto">
        <Outlet />
      </div>
    </main>
  );
}
