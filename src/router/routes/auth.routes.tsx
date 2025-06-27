import { lazy } from 'react';
import { Navigate } from 'react-router';
import { authRoutes } from '@/constants';

const { root, login, register } = authRoutes;

const AuthLayout = lazy(() => import('@/layouts/Auth.layout'));

const componentsMap = {
  [login]: lazy(() => import('@/views/Auth/Login.view')),
  [register]: lazy(() => import('@/views/Auth/Register.view')),
};

const routes = [
  {
    path: root,
    Component: AuthLayout,
    children: [
      { index: true, element: <Navigate to={login} replace /> },
      ...Object.entries(componentsMap).map(([path, Component]) => ({
        path,
        Component,
      })),
    ],
  },
];

export default routes;
