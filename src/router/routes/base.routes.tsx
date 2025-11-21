import { baseRoutes as BRC } from '@/constants';
import { createRoute, transformRoutes } from '@/helpers';
import { RouteConfig, RouteGroup } from '@/types';
import { lazy } from 'react';

const HomeView = lazy(() => import('@/views/Home.view'));
const AboutView = lazy(() => import('@/views/About.view'));
const DemoView = lazy(() => import('@/views/Demo.view'));
const Comment1View = lazy(() => import('@/views/Lists/Comments1.view'));
const Comment2View = lazy(() => import('@/views/Lists/Comments2.view'));
const Comment3View = lazy(() => import('@/views/Lists/Comments3.view'));
const Comment4View = lazy(() => import('@/views/Lists/Comments4.view'));
const ChatView = lazy(() => import('@/views/Chat.view'));

// Define routes using the route builder
const baseRoutes: RouteConfig[] = [
  createRoute()
    .withChildren([
      createRoute(BRC.home).withComponent(HomeView).build(),
      createRoute(BRC.about).withComponent(AboutView).build(),
      createRoute(BRC.demo).withComponent(DemoView).build(),
      createRoute()
        .withChildren([
          createRoute((BRC.lists as RouteGroup)?.comments1)
            .withComponent(Comment1View)
            .build(),
          createRoute((BRC.lists as RouteGroup)?.comments2)
            .withComponent(Comment2View)
            .build(),
          createRoute((BRC.lists as RouteGroup)?.comments3)
            .withComponent(Comment3View)
            .build(),
          createRoute((BRC.lists as RouteGroup)?.comments4)
            .withComponent(Comment4View)
            .build(),
        ])
        .build(),
      createRoute(BRC.chat).withComponent(ChatView).build(),
    ])
    .build(),
];

const tr = transformRoutes(baseRoutes);
export default tr;
