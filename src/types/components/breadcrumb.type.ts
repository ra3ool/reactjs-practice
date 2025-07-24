import { RouteMeta } from '../routing';

export interface BreadcrumbItem {
  name: string;
  path: string;
  meta?: RouteMeta;
}
