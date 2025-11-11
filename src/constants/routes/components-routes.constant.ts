import { createRoutesGroup } from '@/helpers';
import { RouteGroup } from '@/types';

const prefix = 'components';
const componentsRoutes: RouteGroup = Object.freeze({
  root: {
    label: 'Components',
    path: '/',
    name: 'components',
    meta: {
      requiresAuth: true,
    },
  },
  index: {
    label: 'Components',
    path: '/',
    name: 'components.index',
    meta: {
      title: 'Components',
      headerTitle: 'Components page',
      description: 'UI Components showcase',
      breadcrumb: true,
    },
  },
  input: {
    label: 'Input',
    path: 'input',
    name: 'components.input',
    meta: {
      title: 'Input Component',
      headerTitle: 'Input Component page',
      description: 'Form input components',
      breadcrumb: true,
    },
  },
  button: {
    label: 'Button',
    path: 'button',
    name: 'components.button',
    meta: {
      title: 'Button Component',
      headerTitle: 'Button Component page',
      description: 'Button components',
      breadcrumb: true,
    },
  },
  table: {
    label: 'Table',
    path: 'table',
    name: 'components.table',
    meta: {
      title: 'Table Component',
      headerTitle: 'Table Component page',
      description: 'Data table components',
      breadcrumb: true,
    },
  },
  toggle: {
    label: 'Toggle',
    path: 'toggle',
    name: 'components.toggle',
    meta: {
      title: 'Toggle Component',
      headerTitle: 'Toggle Component page',
      description: 'Toggle switch components',
      breadcrumb: true,
    },
  },
  dropdown: {
    label: 'Dropdown',
    path: 'dropdown',
    name: 'components.dropdown',
    meta: {
      title: 'Dropdown Component',
      headerTitle: 'Dropdown Component page',
      description: 'Dropdown menu components',
      breadcrumb: true,
    },
  },
  expansionPanel: {
    label: 'Expansion panel',
    path: 'expansion-panel',
    name: 'components.expansion-panel',
    meta: {
      title: 'Expansion Panel Component',
      headerTitle: 'Expansion Panel Component page',
      description: 'Collapsible content panels',
      breadcrumb: true,
    },
  },
});

export default createRoutesGroup(prefix, componentsRoutes);
