import { createRoutesGroup } from '@/helpers';
import { RouteGroup } from '@/types';

const prefix = 'panel';
const panelRoutes: RouteGroup = Object.freeze({
  root: {
    label: 'Panel',
    path: '/',
    name: 'panel',
  },
  index: {
    label: 'Panel',
    path: '/',
    name: 'panel',
    meta: {
      title: 'Panel',
      description: 'panel page',
      breadcrumb: true,
    },
  },
  profile: {
    label: 'Profile',
    name: 'panel.profile',
    path: 'profile',
    meta: {
      title: 'Profile',
      description: 'profile and user info',
      breadcrumb: true,
    },
  },
  invoices: createRoutesGroup('invoices', {
    all: {
      label: 'All invoice',
      name: 'panel.invoices.all-invoices',
      path: '/',
      meta: {
        title: 'All invoice',
        description: 'all user invoice',
        breadcrumb: true,
      },
    },
    get: {
      label: 'Get invoice',
      name: 'panel.invoices.get-invoice',
      path: 'get/:id',
      meta: {
        title: 'Get invoice',
        description: 'get user invoice',
        breadcrumb: true,
      },
    },
    add: {
      label: 'Add invoice',
      name: 'panel.invoices.add-invoice',
      path: 'add',
      meta: {
        title: 'Add invoice',
        description: 'add user invoice',
        breadcrumb: true,
      },
    },
    delete: {
      label: 'Delete invoice',
      name: 'panel.invoices.delete-invoice',
      path: 'delete/:id',
      meta: {
        title: 'Delete invoice',
        description: 'delete user invoice',
        breadcrumb: true,
      },
    },
    edit: {
      label: 'Edit invoice',
      name: 'panel.invoices.edit-invoice',
      path: 'edit/:id',
      meta: {
        title: 'Edit invoice',
        description: 'edit user invoice',
        breadcrumb: true,
      },
    },
  }),
});

export default createRoutesGroup(prefix, panelRoutes);
