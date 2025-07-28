import { navigateBy, RouteType } from '@/types';

export default function flattenRoutes(
  routesObj: Record<string, RouteType>,
  by: navigateBy = 'path',
): Record<string, RouteType> {
  return Object.values(routesObj).reduce((acc, route) => {
    const key = route[by];
    if (key) {
      acc[key] = {
        label: route.label,
        path: route.path,
        meta: route.meta,
      };
    }
    return acc;
  }, {} as Record<string, RouteType>);
}
