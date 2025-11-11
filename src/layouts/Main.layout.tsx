import {
  Breadcrumb,
  CustomButton,
  Header,
  LayoutContent,
  Sidebar,
} from '@/components';
import { useSidebarItems } from '@/components/config/sidebar-items.components';
import { HeaderContext } from '@/contexts';
import { useTheme } from '@/hooks';
import { useState } from 'react';
import { Outlet } from 'react-router';
import { ToastContainer } from 'react-toastify';

export default function Layout() {
  const { isDarkMode } = useTheme();
  const sideBarItems = useSidebarItems();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [headerTitle, setHeaderTitle] = useState('panel header');

  const headerTitleChildren = (
    <>
      <div className="hidden md:block">{headerTitle}</div>
      <CustomButton
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="md:hidden"
        aria-label="Toggle sidebar"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          {sidebarOpen ? (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          ) : (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          )}
        </svg>
      </CustomButton>
    </>
  );

  return (
    <>
      <main className="mail-layout flex p-6 gap-6 relative">
        {sidebarOpen && (
          <div
            className="fixed inset-0 z-20 md:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        <div
          className={`fixed md:sticky md:top-6 md:shrink-0 h-[calc(100vh-theme(space.12))] w-56 z-30 md:z-auto duration-300 ${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full left-0'
          } md:translate-x-0`}
        >
          <Sidebar
            title="Simple Panel"
            items={sideBarItems}
            className="py-6 px-2 rounded-3xl bg-bg-primary text-text-primary shadow-2xl md:shadow"
            itemClassName="hover:bg-neutral-200 dark:hover:bg-neutral-700"
            activeItemClassName="bg-neutral-200 dark:bg-neutral-700"
          />
        </div>
        <div className="grow flex flex-col">
          <HeaderContext.Provider value={{ setHeaderTitle }}>
            <LayoutContent
              headerComponent={<Header title={headerTitleChildren} />}
            >
              <div className="h-full flex flex-col">
                <Breadcrumb className="mb-5" />
                <Outlet />
              </div>
            </LayoutContent>
          </HeaderContext.Provider>
        </div>
      </main>
      <ToastContainer theme={isDarkMode ? 'dark' : 'light'} stacked draggable />
    </>
  );
}
