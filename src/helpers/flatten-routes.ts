import { RouteGroup, navigateBy, RouteType } from '@/types';

export default function flattenRoutes(
  routesObj: RouteGroup,
  by: navigateBy = 'path',
): Record<string, RouteType> {
  const isRoute = (value: unknown): value is RouteType => {
    return (
      typeof value === 'object' &&
      value !== null &&
      'path' in value &&
      typeof (value as RouteType).path === 'string'
    );
  };

  const flatten = (
    routes: RouteGroup,
    acc: Record<string, RouteType> = {},
  ): Record<string, RouteType> => {
    for (const value of Object.values(routes)) {
      if (isRoute(value)) {
        const key = value[by];
        if (key) {
          acc[key] = value;
        }
      } else if (typeof value === 'object' && value !== null) {
        flatten(value as RouteGroup, acc);
      }
    }

    return acc;
  };

  return flatten(routesObj);
}
