import authRoutes from './auth-routes.constant';
import componentsRoutes from './components-routes.constant';
// import panelRoutesConstant from './panel-routes.constant';

export { authRoutes };
export { componentsRoutes };
// export { panelRoutes };

export const routes = Object.freeze({
  home: {
    name: 'Home',
    path: '/',
    meta: {
      title: 'Home',
      description: 'Welcome to the application',
      requiresAuth: false,
      layout: 'main',
      icon: 'home',
      breadcrumb: true,
    },
  },
  about: {
    name: 'About',
    path: 'about',
    meta: {
      title: 'About',
      description: 'About our application',
      requiresAuth: false,
      layout: 'main',
      icon: 'about',
      breadcrumb: true,
    },
  },
  demo: {
    name: 'Demo',
    path: 'demo',
    meta: {
      title: 'Demo',
      description: 'Routing system demo',
      requiresAuth: false,
      layout: 'main',
      icon: 'demo',
      breadcrumb: true,
    },
  },

  //auth
  auth: authRoutes,

  //components
  components: componentsRoutes,

  //panel
  // panel: panelRoutesConstant,
});
