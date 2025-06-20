import { Outlet } from 'react-router';
import { Sidebar, Toggle } from '@/components';
import routes from '@/constants/routes';
import { SidebarProps } from '@/types';

const toggleTheme = (isDarkMode: boolean) => {
  document.documentElement.classList.toggle('dark');
  console.log(`theme changes to ${isDarkMode ? 'dark' : 'light'}`);
};

const SideBarConfig: SidebarProps = {
  title: 'React Practice',
  items: [
    { title: 'Home', path: routes.home },
    { title: 'About', path: routes.about },
    { title: 'Auth', path: routes.auth.root },
    { title: 'Components', path: routes.components.root },
    {
      title: 'Theme',
      component: <Toggle toggle={toggleTheme} />,
    },
  ],
};

export default function Layout() {
  return (
    <main className="mail-layout h-full flex p-6 gap-6">
      <Sidebar config={SideBarConfig} />
      <div className="grow-1 overflow-auto">
        <Outlet />
      </div>
    </main>
  );
}
