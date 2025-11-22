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
  lists: createRoutesGroup('lists', {
    root: {
      label: 'Lists',
      path: 'lists',
    },
    comments1: {
      label: 'Comments1',
      path: 'comments1',
      name: 'comments1',
      meta: {
        title: 'Comments1',
        description: 'comments1 demo page',
        headerTitle: 'Infinity scroll comments + Virtual List + react query',
        breadcrumb: true,
      },
    },
    comments2: {
      label: 'Comments2',
      path: 'comments2',
      name: 'comments2',
      meta: {
        title: 'Comments2',
        description: 'comments2 demo page',
        headerTitle:
          'Infinity scroll comments + Virtual List (no library) + fetch',
        breadcrumb: true,
      },
    },
    comments3: {
      label: 'Comments3',
      path: 'comments3',
      name: 'comments3',
      meta: {
        title: 'Comments3',
        description: 'comments3 demo page',
        headerTitle: 'Infinity scroll comments + react query',
        breadcrumb: true,
      },
    },
    comments4: {
      label: 'Comments4',
      path: 'comments4',
      name: 'comments4',
      meta: {
        title: 'Comments4',
        description: 'comments4 demo page',
        headerTitle: 'Infinity scroll comments + fetch + body scroll',
        breadcrumb: true,
      },
    },
  }),
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
