import { SvgLoader } from '@/components';
import { flatRoutesByPath } from '@/constants';
import { useRouteNavigation } from '@/hooks';
import { RouteType } from '@/types';
import { useMemo } from 'react';
import { Link } from 'react-router';

export default function Breadcrumb() {
  const { currentPath } = useRouteNavigation();

  const breadcrumbs = useMemo(() => {
    const pathSegments = currentPath.split('/').filter(Boolean);
    const crumbs: RouteType[] = [];
    let accumulatedPath = '';

    const homeRoute = flatRoutesByPath['/'];
    if (homeRoute) crumbs.push(homeRoute);

    for (const segment of pathSegments) {
      accumulatedPath += `/${segment}`;
      const route = flatRoutesByPath[accumulatedPath];

      if (route?.meta?.breadcrumb !== false) {
        if (route && (route.path !== '/' || crumbs.length === 0)) {
          crumbs.push(route);
        }
      }
    }

    return crumbs.filter(Boolean);
  }, [currentPath]);

  if (breadcrumbs.length <= 1) return null;

  return (
    <nav
      className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 mb-4"
      aria-label="Breadcrumb"
    >
      {breadcrumbs.map((breadcrumb, index) => (
        <div
          key={`${breadcrumb.path}-${index}`}
          className="flex items-center gap-2"
        >
          {index > 0 && (
            <SvgLoader
              name="chevron-right"
              width={12}
              height={12}
              aria-hidden="true"
            />
          )}
          {index === breadcrumbs.length - 1 ? (
            <span
              className="font-medium text-gray-900 dark:text-gray-100"
              aria-current="page"
            >
              {breadcrumb.label}
            </span>
          ) : (
            //TODO make an wrapper for Link to get route name
            <Link
              to={breadcrumb.path}
              className="hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
            >
              {breadcrumb.label}
            </Link>
          )}
        </div>
      ))}
    </nav>
  );
}
