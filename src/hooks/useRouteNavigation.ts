import { flatRoutesByName, flatRoutesByPath } from '@/constants';
import type { navigateBy, RouteType } from '@/types';
import { useLocation, useNavigate } from 'react-router';

type RouteName = keyof typeof flatRoutesByName;

export function useRouteNavigation() {
  const navigate = useNavigate();
  const location = useLocation();

  const findRoute = (
    identifier: RouteName,
    by: navigateBy = 'name',
  ): RouteType | undefined => {
    return by === 'name'
      ? flatRoutesByName[identifier]
      : flatRoutesByPath[identifier];
  };

  const navigateTo = (
    identifier: RouteName,
    options?: {
      by?: navigateBy;
      replace?: boolean;
      state?: Record<string, unknown>;
      params?: Record<string, string>;
      query?: Record<string, string>;
    },
  ) => {
    const route = options?.by
      ? findRoute(identifier, options.by)
      : findRoute(identifier);

    let path = route?.path ?? identifier; // Fallback to using identifier as path if route not found

    // Handle dynamic params if provided
    if (options?.params) {
      Object.entries(options.params).forEach(([key, value]) => {
        path = path.replace(new RegExp(`:${key}(\\?|\\b)`), value);
      });
    }

    // Handle query params if provided
    const searchParams = new URLSearchParams(options?.query).toString();
    const fullPath = searchParams ? `${path}?${searchParams}` : path;

    navigate(fullPath, {
      replace: options?.replace,
      state: options?.state,
    });
  };

  const goBack = (fallbackPath?: string) => {
    if (window.history.state?.idx > 0) {
      navigate(-1);
    } else if (fallbackPath) {
      navigate(fallbackPath, { replace: true });
    }
  };

  const goForward = () => navigate(1);

  const isCurrentRoute = (identifier: RouteName, by?: navigateBy) => {
    const route = by ? findRoute(identifier, by) : findRoute(identifier);
    return route ? currentPath === route.path : false;
  };

  const getCurrentRoute = (): RouteType | undefined => {
    return findRoute(currentPath, 'path');
  };

  const currentPath = location.pathname;

  const currentName = getCurrentRoute()?.name;

  return {
    navigateTo,
    goBack,
    goForward,
    isCurrentRoute,
    getCurrentRoute,
    currentPath,
    currentName,
    currentLocation: location,
  };
}
