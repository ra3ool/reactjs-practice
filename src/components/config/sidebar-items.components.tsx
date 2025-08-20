import { useAuthBridge } from '@/bridges';
import { CustomToggle } from '@/components';
import {
  authRoutes,
  baseRoutes,
  componentsRoutes,
  panelRoutes,
} from '@/constants';
import { useAcl, useTheme } from '@/hooks';
import { useAuthStore } from '@/stores';
import { RouteGroup, SidebarItem } from '@/types';
import { useMemo } from 'react';

export function useSidebarItems(): SidebarItem[] {
  const { isDarkMode, toggleTheme } = useTheme();
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const { logoutWithToast } = useAuthBridge();
  const { canAccessRoute } = useAcl();

  return useMemo(() => {
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
    ];

    if (canAccessRoute(componentsRoutes?.root?.name as string)) {
      items.push({
        title: componentsRoutes?.root?.label as string,
        path: componentsRoutes?.root?.path as string,
      });
    }

    if (!isAuthenticated) {
      items.push({
        title: authRoutes?.root?.label as string,
        group: [
          {
            title: authRoutes?.login?.label as string,
            path: authRoutes?.login?.path as string,
          },
          {
            title: authRoutes?.register?.label as string,
            path: authRoutes?.register?.path as string,
          },
        ],
      });
    }

    if (isAuthenticated && canAccessRoute(panelRoutes?.root?.name as string)) {
      if (
        canAccessRoute(
          (panelRoutes?.invoices as RouteGroup)?.all?.name as string,
        )
      ) {
        items.push({
          title: panelRoutes?.root?.label as string,
          group: [
            {
              title: panelRoutes?.root?.label as string,
              path: panelRoutes?.root?.path as string,
            },
            {
              title: (panelRoutes?.invoices as RouteGroup)?.all
                ?.label as string,
              path: (panelRoutes?.invoices as RouteGroup)?.all?.path as string,
            },
          ],
        });
      } else {
        items.push({
          title: panelRoutes?.root?.label as string,
          path: panelRoutes?.root?.path as string,
        });
      }
    }

    items.push({
      title: 'Dark Mode',
      component: <CustomToggle isActive={isDarkMode} toggle={toggleTheme} />,
    });

    if (isAuthenticated) {
      items.push({
        title: 'logout',
        className:
          'cursor-pointer text-red-500 hover:bg-red-200 dark:hover:bg-red-950',
        actions: {
          onClick: logoutWithToast,
        },
      });
    }

    return items;
  }, [
    canAccessRoute,
    logoutWithToast,
    isAuthenticated,
    isDarkMode,
    toggleTheme,
  ]);
}
