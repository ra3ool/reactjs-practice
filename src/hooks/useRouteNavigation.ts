import { useNavigate, useLocation } from 'react-router';
import { routes } from '@/constants';

type RoutesKey = keyof typeof routes;
type RouteName = RoutesKey | string;

export function useRouteNavigation() {
  const navigate = useNavigate();
  const location = useLocation();

  const navigateTo = (
    routeName: RouteName,
    options?: { replace?: boolean; state?: Record<string, unknown> },
  ) => {
    let path = '/';

    // Handle nested route names (e.g., 'auth.login', 'components.input')
    if (routeName.includes('.')) {
      const [parent, child] = routeName.split('.');
      const parentRoute = routes[parent as RoutesKey];

      if (
        parentRoute &&
        typeof parentRoute === 'object' &&
        'path' in parentRoute
      ) {
        // Handle route groups (like auth, components)
        const childRoute = parentRoute[child as keyof typeof parentRoute];
        if (child && childRoute) {
          if (
            typeof childRoute === 'object' &&
            'path' in childRoute &&
            typeof childRoute.path === 'string'
          ) {
            path = childRoute.path;
          }
        }
      }
    } else {
      // Handle direct route names
      const route = routes[routeName as RoutesKey];
      if (route && typeof route === 'object' && 'path' in route) {
        const routePath = route.path as string;
        path = `${routePath.startsWith('/') ? '' : '/'}${routePath}`;
      }
    }

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
    let expectedPath = '/';

    // Handle nested route names
    if (routeName.includes('.')) {
      const [parent, child] = routeName.split('.');
      const parentRoute = routes[parent as RoutesKey];

      if (
        parentRoute &&
        typeof parentRoute === 'object' &&
        'path' in parentRoute
      ) {
        if (child && parentRoute[child as keyof typeof parentRoute]) {
          const childRoute = parentRoute[child as keyof typeof parentRoute];
          if (typeof childRoute === 'object' && 'path' in childRoute) {
            expectedPath = childRoute.path;
          }
        }
      }
    } else {
      // Handle direct route names
      const route = routes[routeName as RoutesKey];
      if (route && typeof route === 'object' && 'path' in route) {
        expectedPath = route.path as string;
      }
    }

    return location.pathname === expectedPath;
  };

  return {
    navigateTo,
    goBack,
    goForward,
    isCurrentRoute,
    currentPath: location.pathname,
  };
}
