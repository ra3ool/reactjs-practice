import { baseRoutes as BRC } from '@/constants';
import { createRoute, transformRoutes } from '@/helpers';
import { RouteConfig, RouteGroup } from '@/types';
import { lazy } from 'react';

const HomeView = lazy(() => import('@/views/Home.view'));
const AboutView = lazy(() => import('@/views/About.view'));
const DemoView = lazy(() => import('@/views/Demo.view'));
const CommentView = lazy(() => import('@/views/Lists/Comments/Comments.view'));
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
          createRoute((BRC.lists as RouteGroup)?.comments)
            .withComponent(CommentView)
            .build(),
        ])
        .build(),
      createRoute(BRC.chat).withComponent(ChatView).build(),
    ])
    .build(),
];

const tr = transformRoutes(baseRoutes);
export default tr;
