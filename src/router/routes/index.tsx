import baseRoutes from './base.routes';
import authRoutes from './auth.routes';
import componentsRoutes from './components.routes';
import panelRoutes from './panel.routes';

const routes = [
  {
    path: '/',
    Component: '@/layouts/Main.layout',
    children: [
      ...baseRoutes,
      ...authRoutes,
      ...componentsRoutes,
      ...panelRoutes,
    ],
  },
];

export default routes;
