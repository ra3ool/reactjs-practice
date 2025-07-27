import baseRoutes from './base-routes.constant';
import authRoutes from './auth-routes.constant';
import componentsRoutes from './components-routes.constant';
import { flattenRoutes } from '@/helpers';
// import panelRoutesConstant from './panel-routes.constant';

export { baseRoutes };
export { authRoutes };
export { componentsRoutes };
// export { panelRoutes };

export const routes = Object.freeze({
  //base
  base: baseRoutes,

  //auth
  auth: authRoutes,

  //components
  components: componentsRoutes,

  //panel
  // panel: panelRoutesConstant,
});

export const flatRoutesByPath = flattenRoutes(routes, 'path');
export const flatRoutesByName = flattenRoutes(routes, 'name'); //TODO get name in constants by user
