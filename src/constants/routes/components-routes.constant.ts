import { createRoutesGroup } from '@/helpers';
import { RouteGroup } from '@/types';

const prefix = 'components';
const componentsRoutes: RouteGroup = Object.freeze({
  root: {
    name: 'Components',
    path: '/',
  },
  index: {
    name: 'Components',
    path: '/',
    meta: {
      title: 'Components',
      description: 'UI Components showcase',
      breadcrumb: true,
    },
  },
  input: {
    name: 'Input',
    path: 'input',
    meta: {
      title: 'Input Component',
      description: 'Form input components',
      breadcrumb: true,
    },
  },
  button: {
    name: 'Button',
    path: 'button',
    meta: {
      title: 'Button Component',
      description: 'Button components',
      breadcrumb: true,
    },
  },
  table: {
    name: 'Table',
    path: 'table',
    meta: {
      title: 'Table Component',
      description: 'Data table components',
      breadcrumb: true,
    },
  },
  toggle: {
    name: 'Toggle',
    path: 'toggle',
    meta: {
      title: 'Toggle Component',
      description: 'Toggle switch components',
      breadcrumb: true,
    },
  },
  dropdown: {
    name: 'Dropdown',
    path: 'dropdown',
    meta: {
      title: 'Dropdown Component',
      description: 'Dropdown menu components',
      breadcrumb: true,
    },
  },
  expansionPanel: {
    name: 'Expansion panel',
    path: 'expansion-panel',
    meta: {
      title: 'Expansion Panel Component',
      description: 'Collapsible content panels',
      breadcrumb: true,
    },
  },
});
export default createRoutesGroup(prefix, componentsRoutes);
