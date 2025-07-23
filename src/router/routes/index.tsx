import { lazy } from 'react';
import baseRoutes from './base.routes';
import authRoutes from './auth.routes';
import componentsRoutes from './components.routes';

const routes = [
  {
    path: '/',
    Component: lazy(() => import('@/layouts/Main.layout')),
    children: [...baseRoutes, ...authRoutes, ...componentsRoutes],
  },
];

export default routes;
