import { CustomButton, Sidebar } from '@/components';
import { useSidebarItems } from '@/components/config/sidebar-items.components';
import { useTheme } from '@/hooks';
import { useState } from 'react';
import { Outlet } from 'react-router';
import { ToastContainer } from 'react-toastify';

export default function Layout() {
  const { isDarkMode } = useTheme();
  const sideBarItems = useSidebarItems();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      <main className="mail-layout min-h-full flex p-6 gap-6 relative">
        {!sidebarOpen && (
          <CustomButton
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="fixed md:hidden z-10 shadow-md"
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
        )}

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
          <Outlet />
        </div>
      </main>
      <ToastContainer theme={isDarkMode ? 'dark' : 'light'} stacked draggable />
    </>
  );
}
