import baseRoutes from './base-routes.constant';
import authRoutes from './auth-routes.constant';
import componentsRoutes from './components-routes.constant';
import { flattenRoutes } from '@/helpers';
// import panelRoutesConstant from './panel-routes.constant';

export { baseRoutes };
export { authRoutes };
export { componentsRoutes };
// export { panelRoutes };

const routes = {
  //base
  ...baseRoutes,

  //auth
  ...authRoutes,

  //components
  ...componentsRoutes,

  //panel
  // panel: panelRoutesConstant,
};

export const flatRoutesByPath = flattenRoutes(routes, 'path');
export const flatRoutesByName = flattenRoutes(routes, 'name');
