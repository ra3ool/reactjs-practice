import { Link, useLocation } from 'react-router';
import { routes } from '@/constants';
import { RouteType } from '@/types';
import { SvgLoader } from '.';

export default function Breadcrumb() {
  const location = useLocation();
  const HOME_BREADCRUMB = (({ name, path, meta }) => ({ name, path, meta }))(
    routes.base.home,
  );

  const findRouteByPath = (path: string): RouteType | null => {
    for (const [, moduleRoutes] of Object.entries(routes)) {
      if (typeof moduleRoutes === 'object' && moduleRoutes !== null) {
        for (const [, childRoute] of Object.entries(moduleRoutes)) {
          if (childRoute.path === path) {
            return {
              name: childRoute.name,
              path: childRoute.path,
              meta: childRoute.meta,
            };
          }
        }
      }
    }

    return null;
  };

  const generateBreadcrumbs = (): RouteType[] => {
    const pathSegments = location.pathname.split('/').filter(Boolean);
    const breadcrumbs: RouteType[] = [HOME_BREADCRUMB];

    let currentPath = '';

    pathSegments.forEach((segment) => {
      currentPath += `/${segment}`;
      const routeInfo = findRouteByPath(currentPath);

      if (routeInfo && routeInfo.meta?.breadcrumb) {
        breadcrumbs.push(routeInfo);
      }
    });

    return breadcrumbs;
  };

  const breadcrumbs = generateBreadcrumbs();

  if (breadcrumbs.length <= 1) {
    return null;
  }

  return (
    <nav className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 mb-4">
      {breadcrumbs.map((breadcrumb, index) => (
        <div key={breadcrumb.path} className="flex items-center gap-2">
          {index > 0 && (
            <SvgLoader name="chevron-right" width={12} height={12} />
          )}
          {index === breadcrumbs.length /*- 1*/ ? ( //FIXME
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
