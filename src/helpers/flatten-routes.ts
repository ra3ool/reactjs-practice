import { navigateBy, RouteGroup, RouteType } from '@/types';
type flattenRoutes = Record<string, RouteType | RouteGroup>;

export default function flattenRoutes(
  routesObj: flattenRoutes,
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
    routes: flattenRoutes,
    acc: Record<string, RouteType> = {},
  ): Record<string, RouteType> => {
    for (const value of Object.values(routes)) {
      if (isRoute(value)) {
        const key = value[by];
        if (key) {
          acc[key] = value;
        }
      } else if (typeof value === 'object' && value !== null) {
        flatten(value as flattenRoutes, acc);
      }
    }

    return acc;
  };

  return flatten(routesObj as flattenRoutes);
}
