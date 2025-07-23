import { lazy } from 'react';
import { createRoute } from '@/helpers';
import { transformRoutes } from '@/helpers';
import { RouteConfig } from '@/types';
import { baseRoutes as baseRoutesConstants } from '@/constants';

const HomeView = lazy(() => import('@/views/Home.view'));
const AboutView = lazy(() => import('@/views/About.view'));
const DemoView = lazy(() => import('@/views/Demo.view'));

// Define routes using the route builder
const routes: RouteConfig[] = [
  createRoute()
    .withChildren([
      createRoute(baseRoutesConstants.home).withComponent(HomeView).build(),
      createRoute(baseRoutesConstants.about).withComponent(AboutView).build(),
      createRoute(baseRoutesConstants.demo).withComponent(DemoView).build(),
    ])
    .build(),
];

const tr = transformRoutes(routes);
export default tr;
