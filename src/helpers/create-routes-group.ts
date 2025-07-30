import { RouteGroup, RouteType } from '@/types';

const createRoutesGroup = (prefix: string, routes: RouteGroup): RouteGroup => {
  const trimmed = prefix.replace(/^\/+|\/+$/g, '');
  const normalizedPrefix = trimmed ? `/${trimmed}` : '';

  const processRoute = (
    route: RouteType | RouteGroup,
    parentPrefix: string,
    parentName: string,
  ): RouteType | RouteGroup => {
    if (!('path' in route) || typeof route?.path === 'object') {
      return Object.fromEntries(
        Object.entries(route).map(([key, nestedRoute]) => [
          key,
          processRoute(nestedRoute, parentPrefix, parentName),
        ]),
      ) as RouteGroup;
    }

    const { path, ...rest } = route as RouteType;
    let cleanPath = path.replace(/^\/+|\/+$/g, '');
    cleanPath = cleanPath === '' ? '/' : cleanPath;

    return {
      ...rest,
      path:
        cleanPath === '/'
          ? parentPrefix || '/'
          : `${parentPrefix}/${cleanPath}`.replace(/\/+/g, '/'),
    };
  };

  const processedRoutes = Object.fromEntries(
    Object.entries(routes).map(([key, route]) => [
      key,
      processRoute(route, normalizedPrefix, prefix),
    ]),
  ) as RouteGroup;

  return Object.freeze(processedRoutes);
};

export default createRoutesGroup;
