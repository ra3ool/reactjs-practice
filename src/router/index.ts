import { createBrowserRouter, RouteObject } from 'react-router';
import routes from './routes';

const router = createBrowserRouter(routes as RouteObject[]);

export default router;
