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
      headerTitle: 'Home page',
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
      headerTitle: 'About page',
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
      headerTitle: 'Demo page',
      breadcrumb: true,
    },
  },
  chat: {
    label: 'Chat',
    path: 'chat',
    name: 'chat',
    meta: {
      title: 'Chat',
      description: 'chat app',
      headerTitle: 'Chat page',
    },
  },
});

export default createRoutesGroup(prefix, baseRoutes);
