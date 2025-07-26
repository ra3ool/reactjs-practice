import { RouteType } from '@/types';

export default function flattenRoutes(
  routesObj: Record<string, Record<string, RouteType>>,
  by: string = 'path',
) {
  const map: Record<string, RouteType> = {};
  for (const group of Object.values(routesObj)) {
    for (const route of Object.values(group)) {
      if (route && typeof route.path === 'string') {
        const key =
          (by === 'path'
            ? route.path
            : by === 'name'
            ? route.path.split('/').filter(Boolean).join('.')
            : '') || 'home';
        map[key] = {
          name: route.name,
          path: route.path,
          meta: route.meta,
        };
      }
    }
  }
  return map;
}
