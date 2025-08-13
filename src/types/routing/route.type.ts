import { ComponentType, LazyExoticComponent, ReactNode } from 'react';
import { UserRole } from '../user';

export type navigateBy = 'name' | 'path';

export interface RouteMeta {
  title?: string;
  description?: string;
  icon?: string;
  role?: UserRole;
  requiresAuth?: boolean;
  layout?: string;
  breadcrumb?: boolean;
  cache?: boolean;
  [key: string]: string | boolean | undefined;
}

export interface RouteConfig {
  label: string;
  path: string;
  name?: string;
  component?:
    | ComponentType<Record<string, unknown>>
    | LazyExoticComponent<ComponentType<Record<string, unknown>>>;
  element?: React.ReactNode;
  meta?: RouteMeta;
  preload?: boolean;
  children?: RouteConfig[];
  index?: boolean;
  redirect?: string;
}

export interface RouteType {
  label: string;
  path: string;
  name?: string;
  meta?: RouteMeta;
}

export interface RouteGroup {
  [key: string]: RouteType | RouteGroup;
}

export interface RouteWrapperProps {
  route: RouteConfig;
  children: ReactNode;
}

export interface ProtectedRouteProps {
  children: ReactNode;
  routMeta?: RouteMeta;
  routeName?: string;
}

export interface NavigationOptions {
  by?: navigateBy;
  replace?: boolean;
  state?: Record<string, unknown>;
  params?: Record<string, string>;
  query?: Record<string, string>;
}