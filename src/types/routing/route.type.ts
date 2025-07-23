import { ComponentType, LazyExoticComponent, ReactNode } from 'react';

export type UserRole = 'admin' | 'user' | 'guest';

export interface RouteMeta {
  title?: string;
  description?: string;
  icon?: string;
  roles?: UserRole[];
  requiresAuth?: boolean;
  layout?: string;
  breadcrumb?: boolean;
  cache?: boolean;
  [key: string]: string | boolean | UserRole[] | undefined;
}

export interface RouteConfig {
  name: string;
  path: string;
  component?:
    | ComponentType<Record<string, unknown>>
    | LazyExoticComponent<ComponentType<Record<string, unknown>>>;
  element?: React.ReactNode;
  meta?: RouteMeta;
  children?: RouteConfig[];
  index?: boolean;
  redirect?: string;
}

export interface NamedRoute {
  name: string;
  path: string;
  meta?: RouteMeta;
}

export interface RouteGroup {
  [key: string]: NamedRoute;
}

export interface RouteWrapperProps {
  route: RouteConfig;
  children: ReactNode;
}

export interface ProtectedRouteProps {
  children: ReactNode;
  meta?: RouteMeta;
}
