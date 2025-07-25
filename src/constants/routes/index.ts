import baseRoutes from './base-routes.constant';
import authRoutes from './auth-routes.constant';
import componentsRoutes from './components-routes.constant';
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
