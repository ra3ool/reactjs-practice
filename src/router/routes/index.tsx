import { lazy } from 'react';
import { routes as routesConstants } from '@/constants';

const MainLayout = lazy(() => import('@/layouts/Main.layout'));
const Home = lazy(() => import('@/views/Home.view'));
const About = lazy(() => import('@/views/About.view'));

import authRoutes from './auth.routes';
import componentsRoutes from './components.routes';

const { home, about } = routesConstants;

const routes = [
  {
    path: home,
    Component: MainLayout,
    children: [
      { index: true, Component: Home },
      { path: about, Component: About },
      ...authRoutes,
      ...componentsRoutes,
    ],
  },
];

export default routes;
