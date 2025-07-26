import { Link, useLocation } from 'react-router';
import { routes } from '@/constants';
import { RouteType } from '@/types';
import { SvgLoader } from '.';
import { useMemo } from 'react';
import { flattenRoutes } from '@/helpers';

export default function Breadcrumb() {
  const location = useLocation();

  const routeMap = useMemo(() => flattenRoutes(routes, 'path'), []);

  const breadcrumbs = useMemo(() => {
    const pathSegments = location.pathname.split('/').filter(Boolean);
    const crumbs: RouteType[] = [];
    let currentPath = '';

    if (routeMap['/']) {
      crumbs.push(routeMap['/']);
    }
    for (const segment of pathSegments) {
      currentPath += `/${segment}`;
      const route = routeMap[currentPath];
      if (route && route.meta?.breadcrumb) {
        // Avoid duplicate home
        if (route.path !== '/' || crumbs.length === 0) {
          crumbs.push(route);
        }
      }
    }
    return crumbs;
  }, [location.pathname, routeMap]);

  if (breadcrumbs.length <= 1) return null;

  return (
    <nav className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 mb-4">
      {breadcrumbs.map((breadcrumb, index) => (
        <div key={breadcrumb.path} className="flex items-center gap-2">
          {index > 0 && (
            <SvgLoader name="chevron-right" width={12} height={12} />
          )}
          {index === breadcrumbs.length - 1 ? (
            <span className="font-medium text-gray-900 dark:text-gray-100">
              {breadcrumb.name}
            </span>
          ) : (
            <Link
              to={breadcrumb.path}
              className="hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
            >
              {breadcrumb.name}
            </Link>
          )}
        </div>
      ))}
    </nav>
  );
}
