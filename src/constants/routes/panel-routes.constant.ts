import { createRoutesGroup } from '@/helpers';
import { RouteGroup } from '@/types';

const prefix = 'panel';
const panelRoutes: RouteGroup = Object.freeze({
  root: {
    label: 'Panel',
    path: '/',
    name: 'panel',
    meta: {
      requiresAuth: true,
    },
  },
  index: {
    label: 'Panel',
    path: '/',
    name: 'panel',
    meta: {
      title: 'Panel',
      headerTitle: 'Panel page',
      description: 'panel page',
      breadcrumb: true,
    },
  },
  profile: {
    label: 'Profile',
    name: 'profile',
    path: 'profile',
    meta: {
      title: 'Profile',
      headerTitle: 'Profile page',
      description: 'profile and user info',
      breadcrumb: true,
    },
  },
  invoices: createRoutesGroup('invoices', {
    all: {
      label: 'Invoices',
      name: 'invoices-list',
      path: '/',
      meta: {
        title: 'Invoices',
        headerTitle: 'Invoices page',
        description: 'all user invoice',
        breadcrumb: true,
      },
    },
    get: {
      label: 'Get invoice',
      name: 'get-invoice',
      path: ':id',
      meta: {
        title: 'Get invoice',
        headerTitle: 'Get invoice page',
        description: 'get user invoice',
        breadcrumb: true,
      },
    },
    add: {
      label: 'Add invoice',
      name: 'add-invoice',
      path: 'add',
      meta: {
        title: 'Add invoice',
        headerTitle: 'Add invoice page',
        description: 'add user invoice',
        breadcrumb: true,
      },
    },
    delete: {
      label: 'Delete invoice',
      name: 'delete-invoice',
      path: 'delete/:id',
      meta: {
        title: 'Delete invoice',
        headerTitle: 'Delete invoice page',
        description: 'delete user invoice',
        breadcrumb: true,
      },
    },
    edit: {
      label: 'Edit invoice',
      name: 'edit-invoice',
      path: 'edit/:id',
      meta: {
        title: 'Edit invoice',
        headerTitle: 'Edit invoice page',
        description: 'edit user invoice',
        breadcrumb: true,
      },
    },
  }),
});

export default createRoutesGroup(prefix, panelRoutes);
