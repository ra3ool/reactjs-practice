import { createElement } from 'react';
import { RouteConfig } from '@/types';
import { Navigate } from 'react-router';
import { RouteWrapper } from '@/components';

export function transformRoute(route: RouteConfig): RouteConfig {
  const { component, children, redirect, meta = {}, ...rest } = route;

  // Handle redirect routes
  if (redirect) {
    return {
      ...rest,
      meta,
      element: createElement(Navigate, { to: redirect, replace: true }),
    };
  }

  // Handle routes with components
  if (component) {
    return {
      ...rest,
      meta,
      element: createElement(RouteWrapper, {
        route: { ...route, meta },
        children: createElement(component),
      }),
      children: Array.isArray(children)
        ? children.map(transformRoute)
        : undefined,
    };
  }

  // Handle layout routes (routes with children but no component)
  if (Array.isArray(children) && children.length > 0) {
    return {
      ...rest,
      meta,
      children: children.map(transformRoute),
    };
  }

  // Fallback for routes without components or children
  return {
    ...rest,
    meta,
    element: createElement(RouteWrapper, {
      route: { ...route, meta },
      children: createElement(
        'div',
        null,
        `Route ${route.name} has no component`,
      ),
    }),
  };
}

export function transformRoutes(routes: RouteConfig[]): RouteConfig[] {
  return routes.map(transformRoute);
}
