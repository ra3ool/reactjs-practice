import baseRoutes from './base.routes';
import authRoutes from './auth.routes';
import componentsRoutes from './components.routes';
import panelRoutes from './panel.routes';
import MainLayout from '@/layouts/Main.layout';

const routes = [
  {
    path: '/',
    Component: MainLayout,
    children: [
      ...baseRoutes,
      ...authRoutes,
      ...componentsRoutes,
      ...panelRoutes,
    ],
  },
];

export default routes;
