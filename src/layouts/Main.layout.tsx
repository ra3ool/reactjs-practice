import { Breadcrumb } from '@/components/breadcrumb.component';
import { useSidebarItems } from '@/components/config/sidebar-items.components';
import { CustomButton } from '@/components/custom-button.component';
import { TheHeader } from '@/components/the-header.component';
import { TheSidebar } from '@/components/the-sidebar.component';
import { HeaderContext } from '@/contexts';
import { useRouteNavigation, useTheme } from '@/hooks';
import { useEffect, useState } from 'react';
import { Outlet } from 'react-router';
import { ToastContainer } from 'react-toastify';

export default function Layout() {
  const { isDarkMode } = useTheme();
  const sideBarItems = useSidebarItems();
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const [headerTitle, setHeaderTitle] = useState<string>('');
  const { currentRoute } = useRouteNavigation();

  useEffect(() => {
    setHeaderTitle(
      (currentRoute?.meta?.headerTitle as string) || 'panel header',
    );
    setSidebarOpen(false);
  }, [currentRoute]);

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
      <main className="mail-layout flex flex-1 p-6 gap-6 relative">
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
          <TheSidebar
            title="Simple Panel"
            items={sideBarItems}
            className="py-6 px-2 rounded-3xl bg-bg-primary text-text-primary shadow-2xl md:shadow"
            itemClassName="hover:bg-neutral-200 dark:hover:bg-neutral-700"
            activeItemClassName="bg-neutral-200 dark:bg-neutral-700"
          />
        </div>
        <div className="grow flex flex-col">
          <HeaderContext.Provider value={{ setHeaderTitle }}>
            <div className="layout-content flex flex-col gap-6 h-full">
              <TheHeader title={headerTitleChildren} />
              <div className="flex flex-col grow w-full bg-bg-primary text-text-primary shadow p-3 rounded-xl">
                <Breadcrumb className="mb-5" />
                <Outlet />
              </div>
            </div>
          </HeaderContext.Provider>
        </div>
      </main>
      <ToastContainer theme={isDarkMode ? 'dark' : 'light'} stacked draggable />
    </>
  );
}
