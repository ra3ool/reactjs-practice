import { lazy } from 'react';
import { Navigate } from 'react-router';
import { authRoutes } from '@/constants';

const { root, login, register } = authRoutes;

const AuthLayout = lazy(() => import('@/layouts/Auth.layout'));

const routes = [
  {
    path: root.path,
    Component: AuthLayout,
    children: [
      { index: true, element: <Navigate to={login.path} replace /> },
      {
        ...login,
        Component: lazy(() => import('@/views/Auth/Login.view')),
      },
      {
        ...register,
        Component: lazy(() => import('@/views/Auth/Register.view')),
      },
    ],
  },
];

export default routes;
