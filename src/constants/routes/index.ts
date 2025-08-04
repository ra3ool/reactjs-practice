import { flattenRoutes } from '@/helpers';
import authRoutes from './auth-routes.constant';
import baseRoutes from './base-routes.constant';
import componentsRoutes from './components-routes.constant';
import panelRoutes from './panel-routes.constant';

export { authRoutes, baseRoutes, componentsRoutes, panelRoutes };

const routes = {
  //base
  base: baseRoutes,

  //auth
  auth: authRoutes,

  //components
  component: componentsRoutes,

  //panel
  panel: panelRoutes,
};

export const flatRoutesByPath = flattenRoutes(routes, 'path');
export const flatRoutesByName = flattenRoutes(routes, 'name');
