import { Sidebar } from '@/components';
import { useSidebarItems } from '@/components/config/sidebar-items.components';
import { useTheme } from '@/hooks';
import { Outlet } from 'react-router';
import { ToastContainer } from 'react-toastify';

export default function Layout() {
  const { isDarkMode } = useTheme();
  const sideBarItems = useSidebarItems();

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
