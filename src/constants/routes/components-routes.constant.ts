import { createRoutesGroup } from '@/helpers';
import { RouteGroup } from '@/types';

const prefix = 'components';
const componentsRoutes: RouteGroup = Object.freeze({
  root: {
    name: 'Components',
    path: '/',
    meta: {
      title: 'Components',
      description: 'UI Components showcase',
      requiresAuth: true,
      layout: 'main',
      icon: 'components',
      breadcrumb: true,
    },
  },
  input: {
    name: 'Input',
    path: 'input',
    meta: {
      title: 'Input Component',
      description: 'Form input components',
      requiresAuth: true,
      layout: 'main',
      icon: 'input',
      breadcrumb: true,
    },
  },
  button: {
    name: 'Button',
    path: 'button',
    meta: {
      title: 'Button Component',
      description: 'Button components',
      requiresAuth: true,
      layout: 'main',
      icon: 'button',
      breadcrumb: true,
    },
  },
  table: {
    name: 'Table',
    path: 'table',
    meta: {
      title: 'Table Component',
      description: 'Data table components',
      requiresAuth: true,
      layout: 'main',
      icon: 'table',
      breadcrumb: true,
    },
  },
  toggle: {
    name: 'Toggle',
    path: 'toggle',
    meta: {
      title: 'Toggle Component',
      description: 'Toggle switch components',
      requiresAuth: true,
      layout: 'main',
      icon: 'toggle',
      breadcrumb: true,
    },
  },
  dropdown: {
    name: 'Dropdown',
    path: 'dropdown',
    meta: {
      title: 'Dropdown Component',
      description: 'Dropdown menu components',
      requiresAuth: true,
      layout: 'main',
      icon: 'dropdown',
      breadcrumb: true,
    },
  },
  expansionPanel: {
    name: 'Expansion panel',
    path: 'expansion-panel',
    meta: {
      title: 'Expansion Panel Component',
      description: 'Collapsible content panels',
      requiresAuth: true,
      layout: 'main',
      icon: 'expansion-panel',
      breadcrumb: true,
    },
  },
});
export default createRoutesGroup(prefix, componentsRoutes);
