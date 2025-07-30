import { createRoutesGroup } from '@/helpers';
import { RouteGroup } from '@/types';

const prefix = 'components';
const componentsRoutes: RouteGroup = Object.freeze({
  root: {
    label: 'Components',
    path: '/',
    name: 'components',
  },
  index: {
    label: 'Components',
    path: '/',
    name: 'components.index',
    meta: {
      title: 'Components',
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
      description: 'Collapsible content panels',
      breadcrumb: true,
    },
  },
});

export default createRoutesGroup(prefix, componentsRoutes);
