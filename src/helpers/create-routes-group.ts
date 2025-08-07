import { RouteGroup, RouteType } from '@/types';

const createRoutesGroup = (
  prefix: string,
  routeConstant: RouteGroup,
): RouteGroup => {
  const routes = { ...routeConstant }; //TODO check why add component to route object
  const trimmed = prefix.replace(/^\/+|\/+$/g, '');
  const normalizedPrefix = trimmed ? `/${trimmed}` : '';

  const processRoute = (
    route: RouteType | RouteGroup,
    parentPrefix: string,
  ): RouteType | RouteGroup => {
    if (!('path' in route) || typeof route?.path === 'object') {
      return Object.fromEntries(
        Object.entries(route).map(([key, nestedRoute]) => [
          key,
          processRoute(nestedRoute, parentPrefix),
        ]),
      );
    }

    const { path, ...rest } = route as RouteType;
    let cleanPath = path.replace(/^\/+|\/+$/g, '');
    cleanPath = cleanPath === '' ? '/' : cleanPath;

    //TODO check why add children to root
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
      processRoute(route, normalizedPrefix),
    ]),
  );

  return Object.freeze(processedRoutes);
};

export default createRoutesGroup;
