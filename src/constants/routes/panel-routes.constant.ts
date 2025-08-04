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
    root: {
      label: 'Invoices',
      name: 'panel.invoices',
      path: '/',
    },
    index: {
      label: 'All invoice',
      name: 'panel.invoices.all-invoices',
      path: '/',
    },
    add: {
      label: 'Add invoice',
      name: 'panel.invoices.add-invoice',
      path: 'add',
    },
    edit: {
      label: 'Edit invoice',
      name: 'panel.invoices.edit-invoice',
      path: 'edit/:id',
    },
    delete: {
      label: 'Delete invoice',
      name: 'panel.invoices.delete-invoice',
      path: 'delete/:id',
    },
    get: {
      label: 'Get invoice',
      name: 'panel.invoices.get-invoice',
      path: 'get/:id',
    },
  }),
});

export default createRoutesGroup(prefix, panelRoutes);
