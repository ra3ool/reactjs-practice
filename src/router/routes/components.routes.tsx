import { lazy } from 'react';
import { Navigate } from 'react-router';
import { componentsRoutes } from '@/constants';

const { root, input, button, table, toggle, dropdown, expansionPanel } =
  componentsRoutes;

const ComponentsLayout = lazy(() => import('@/layouts/Components.layout'));

const routes = [
  {
    path: root.path,
    Component: ComponentsLayout,
    children: [
      { index: true, element: <Navigate to={input.path} replace /> },
      {
        ...input,
        Component: lazy(() => import('@/views/Components/Input.view')),
      },
      {
        ...button,
        Component: lazy(() => import('@/views/Components/Button.view')),
      },
      {
        ...table,
        Component: lazy(() => import('@/views/Components/Table.view')),
      },
      {
        ...toggle,
        Component: lazy(() => import('@/views/Components/Toggle.view')),
      },
      {
        ...dropdown,
        Component: lazy(() => import('@/views/Components/Dropdown.view')),
      },
      {
        ...expansionPanel,
        Component: lazy(() => import('@/views/Components/ExpansionPanel.view')),
      },
    ],
  },
];

export default routes;
