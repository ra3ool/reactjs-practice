import MainLayout from '@/layouts/Main.layout';
import NotFoundPageView from '@/views/Errors/NotFound.view';
import authRoutes from './auth.routes';
import baseRoutes from './base.routes';
import componentsRoutes from './components.routes';
import panelRoutes from './panel.routes';

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
  {
    path: '*',
    element: <NotFoundPageView />,
  },
];

export default routes;
