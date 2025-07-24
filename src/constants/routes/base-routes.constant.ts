import { RouteGroup } from '@/types';

const baseRoutes: RouteGroup = Object.freeze({
  home: {
    name: 'Home',
    path: '/',
    meta: {
      title: 'Home',
      description: 'Welcome to the application',
      breadcrumb: true,
    },
  },
  about: {
    name: 'About',
    path: 'about',
    meta: {
      title: 'About',
      description: 'About our application',
      breadcrumb: true,
    },
  },
  demo: {
    name: 'Demo',
    path: 'demo',
    meta: {
      title: 'Demo',
      description: 'Routing system demo',
      breadcrumb: true,
    },
  },
});

export default baseRoutes;
