import { lazy } from 'react';
import { Navigate } from 'react-router';
import { componentsRoutes } from '@/constants';

const { root, input, table, toggle, dropdown, expansionPanel } =
  componentsRoutes;

const ComponentsLayout = lazy(() => import('@/layouts/Components.layout'));

const componentsMap = {
  [input]: lazy(() => import('@/views/Components/Input.view')),
  [table]: lazy(() => import('@/views/Components/Table.view')),
  [toggle]: lazy(() => import('@/views/Components/Toggle.view')),
  [dropdown]: lazy(() => import('@/views/Components/Dropdown.view')),
  [expansionPanel]: lazy(
    () => import('@/views/Components/ExpansionPanel.view'),
  ),
};

const routes = [
  {
    path: root,
    Component: ComponentsLayout,
    children: [
      { index: true, element: <Navigate to={input} replace /> },
      ...Object.entries(componentsMap).map(([path, Component]) => ({
        path,
        Component,
      })),
    ],
  },
];

export default routes;
