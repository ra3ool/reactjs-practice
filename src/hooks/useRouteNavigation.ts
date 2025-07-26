import { useNavigate, useLocation } from 'react-router';
import { routes } from '@/constants';
import { flattenRoutes } from '@/helpers';
import { useMemo } from 'react';
import type { RouteType } from '@/types';

type RoutesKey = keyof typeof routes;
type RouteName = RoutesKey | string;

export function useRouteNavigation() {
  const navigate = useNavigate();
  const location = useLocation();

  const routeMap = useMemo(() => flattenRoutes(routes, 'name'), []);

  const findRoute = (routeName: RouteName): RouteType | undefined => {
    if (!routeName.includes('.') && routeMap[`/${routeName}`]) {
      return routeMap[`/${routeName}`];
    }

    if (routeName.includes('.')) {
      const [parent, child] = routeName.split('.');
      const parentRoute = routes[parent as RoutesKey];
      if (parentRoute && child) {
        const childRoute = parentRoute[child];
        if (childRoute?.path) {
          return routeMap[childRoute.path] || childRoute;
        }
      }
    } else {
      return routes.base[routeName];
    }
  };

  const navigateTo = (
    routeName: RouteName,
    options?: { replace?: boolean; state?: Record<string, unknown> },
  ) => {
    const route = findRoute(routeName);
    const path = route?.path ? route.path : '/';

    if (options?.replace) {
      navigate(path, { replace: true, state: options.state });
    } else {
      navigate(path, { state: options?.state });
    }
  };

  const goBack = () => {
    navigate(-1);
  };

  const goForward = () => {
    navigate(1);
  };

  const isCurrentRoute = (routeName: RouteName) => {
    const route = findRoute(routeName);
    return route ? location.pathname === route.path : false;
  };

  return {
    navigateTo,
    goBack,
    goForward,
    isCurrentRoute,
    currentPath: location.pathname,
  };
}
