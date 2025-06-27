import { lazy } from 'react';
import { Navigate } from 'react-router';
import { componentsRoutes } from '@/constants';

const { root, input, table, toggle } = componentsRoutes;

const ComponentsLayout = lazy(() => import('@/layouts/Components.layout'));

const componentsMap = {
  [input]: lazy(() => import('@/views/Components/Input.view')),
  [table]: lazy(() => import('@/views/Components/Table.view')),
  [toggle]: lazy(() => import('@/views/Components/Toggle.view')),
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
