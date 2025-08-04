import { navigateBy, RouteGroup, RouteType } from '@/types';

export default function flattenRoutes(
  routesObj: RouteGroup,
  by: navigateBy = 'path',
): Record<string, RouteType> {
  const flatten = (
    routes: RouteGroup,
    acc: Record<string, RouteType> = {},
  ): Record<string, RouteType> => {
    for (const route of Object.values(routes)) {
      if (!('path' in route) || typeof route?.path === 'object') {
        flatten(route as RouteGroup, acc);
      } else {
        const key = route[by];
        if (key) {
          acc[key as string] = route as RouteType;
        }
      }
    }

    return acc;
  };

  return flatten(routesObj);
}
