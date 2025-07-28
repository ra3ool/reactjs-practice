import { createRoutesGroup } from '@/helpers';
import { RouteGroup } from '@/types';

const prefix = '';
const baseRoutes: RouteGroup = Object.freeze({
  home: {
    label: 'Home',
    path: '/',
    name: 'home',
    meta: {
      title: 'Home',
      description: 'Welcome to the application',
      breadcrumb: true,
    },
  },
  about: {
    label: 'About',
    path: 'about',
    name: 'about',
    meta: {
      title: 'About',
      description: 'About our application',
      breadcrumb: true,
    },
  },
  demo: {
    label: 'Demo',
    path: 'demo',
    name: 'demo',
    meta: {
      title: 'Demo',
      description: 'Routing system demo',
      breadcrumb: true,
    },
  },
});

export default createRoutesGroup(prefix, baseRoutes);
