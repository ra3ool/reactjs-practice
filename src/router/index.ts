import { createBrowserRouter, RouteObject } from 'react-router';
import routes from './routes';

const router = createBrowserRouter(routes as RouteObject[], {
  basename: '/reactjs-practice',
});

export default router;
