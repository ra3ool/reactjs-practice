import { flatRoutesByName, flatRoutesByPath } from '@/constants';
import type { navigateBy, NavigationOptions, RouteType } from '@/types';
import { useCallback, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router';

type RouteName = keyof typeof flatRoutesByName;

export function useRouteNavigation() {
  const navigate = useNavigate();
  const location = useLocation();

  // Memoize current path to prevent unnecessary recalculations
  const currentPath = useMemo(() => location.pathname, [location.pathname]);

  // Memoize current route lookup
  const currentRoute = useMemo((): RouteType | undefined => {
    return flatRoutesByPath[currentPath];
  }, [currentPath]);

  const findRoute = useCallback(
    (identifier: RouteName, by: navigateBy = 'name'): RouteType | undefined => {
      return by === 'name'
        ? flatRoutesByName[identifier]
        : flatRoutesByPath[identifier];
    },
    [],
  );

  // Improved path building with better error handling
  const buildPath = useCallback(
    (
      basePath: string,
      params?: Record<string, string>,
      query?: Record<string, string>,
    ): string => {
      let path = basePath;

      // Handle dynamic params with validation
      if (params) {
        Object.entries(params).forEach(([key, value]) => {
          const paramRegex = new RegExp(`:${key}(\\?|\\b)`, 'g');
          if (!paramRegex.test(path)) {
            console.warn(`Parameter "${key}" not found in path "${path}"`);
          }
          path = path.replace(paramRegex, encodeURIComponent(value));
        });
      }

      // Check for unresolved params
      const unresolvedParams = path.match(/:(\w+)/g);
      if (unresolvedParams) {
        console.warn(
          `Unresolved parameters in path "${path}":`,
          unresolvedParams,
        );
      }

      // Handle query params with proper encoding
      if (query && Object.keys(query).length > 0) {
        const searchParams = new URLSearchParams();
        Object.entries(query).forEach(([key, value]) => {
          if (value !== undefined && value !== null && value !== '') {
            searchParams.append(key, String(value));
          }
        });

        const queryString = searchParams.toString();
        if (queryString) {
          path = `${path}?${queryString}`;
        }
      }

      return path;
    },
    [],
  );

  const navigateTo = useCallback(
    (identifier: RouteName, options?: NavigationOptions) => {
      const route = options?.by
        ? findRoute(identifier, options.by)
        : findRoute(identifier);

      if (!route && options?.by !== 'path') {
        console.warn(`Route "${String(identifier)}" not found`);
        return false; // Indicate navigation failed
      }

      const basePath = route?.path ?? String(identifier);
      const fullPath = buildPath(basePath, options?.params, options?.query);

      try {
        navigate(fullPath, {
          replace: options?.replace,
          state: options?.state,
        });
        return true; // Indicate success
      } catch (error) {
        console.error('Navigation failed:', error);
        return false;
      }
    },
    [navigate, findRoute, buildPath],
  );

  const goBack = useCallback(
    (fallbackPath?: string) => {
      // Better history state checking
      const canGoBack =
        window.history.state?.idx > 0 || window.history.length > 1;

      if (canGoBack) {
        navigate(-1);
      } else if (fallbackPath) {
        navigate(fallbackPath, { replace: true });
      } else {
        // Default fallback to home
        navigate('/', { replace: true });
      }
    },
    [navigate],
  );

  const goForward = useCallback(() => {
    navigate(1);
  }, [navigate]);

  const isCurrentRoute = useCallback(
    (
      identifier: RouteName,
      by?: navigateBy,
      exactMatch: boolean = true,
    ): boolean => {
      const route = by ? findRoute(identifier, by) : findRoute(identifier);
      const routePath = route?.path ?? String(identifier);

      if (exactMatch) {
        return currentPath === routePath;
      } else {
        // Support partial matching for nested routes
        return currentPath.startsWith(routePath);
      }
    },
    [currentPath, findRoute],
  );

  const getCurrentRoute = useCallback((): RouteType | undefined => {
    return currentRoute;
  }, [currentRoute]);

  // Enhanced route matching with pattern support
  const matchesPattern = useCallback(
    (pattern: string): boolean => {
      // Convert route pattern to regex (simple implementation)
      const regexPattern = pattern
        .replace(/:[^/]+/g, '[^/]+') // Replace :param with regex
        .replace(/\*/g, '.*'); // Replace * with regex

      const regex = new RegExp(`^${regexPattern}$`);
      return regex.test(currentPath);
    },
    [currentPath],
  );

  // Get query params as object
  const queryParams = useMemo(() => {
    const params = new URLSearchParams(location.search);
    const result: Record<string, string> = {};

    params.forEach((value, key) => {
      result[key] = value;
    });

    return result;
  }, [location.search]);

  // Get route params (for dynamic routes)
  const routeParams = useMemo((): Record<string, string> => {
    if (!currentRoute?.path) return {};

    const pathSegments = currentPath.split('/');
    const routeSegments = currentRoute.path.split('/');
    const params: Record<string, string> = {};

    routeSegments.forEach((segment, index) => {
      if (segment.startsWith(':') && pathSegments[index]) {
        const paramName = segment.slice(1); // Remove ':'
        params[paramName] = decodeURIComponent(pathSegments[index]);
      }
    });

    return params;
  }, [currentPath, currentRoute]);

  return {
    // Navigation methods
    navigateTo,
    goBack,
    goForward,

    // Route checking
    isCurrentRoute,
    matchesPattern,
    getCurrentRoute,

    // Current state
    currentPath,
    currentName: currentRoute?.name,
    currentRoute,
    currentLocation: location,

    // Parameters
    queryParams,
    routeParams,

    // Utilities
    buildPath,
    findRoute,
  };
}
