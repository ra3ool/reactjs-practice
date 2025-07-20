import { RouteGroup } from '@/types';

const createRoutesGroup = (prefix: string, routes: RouteGroup): RouteGroup => {
  const trimmed = prefix.replace(/^\/+|\/+$/g, '');
  const normalizedPrefix = `/${trimmed}`;

  const newRoutes = Object.fromEntries(
    Object.entries(routes).map(([key, route]) => {
      const { path, ...rest } = route;
      return [
        key,
        {
          ...rest,
          path:
            path === '' || path === '/'
              ? normalizedPrefix
              : `${normalizedPrefix}${path.startsWith('/') ? '' : '/'}${path}`,
        },
      ];
    }),
  );

  return newRoutes;
};

export default createRoutesGroup;
