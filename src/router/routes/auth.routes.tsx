import { authRoutes as ARC } from '@/constants';
import { createRoute, transformRoutes } from '@/helpers';
import { RouteConfig } from '@/types';
import { lazy } from 'react';

const AuthLayout = lazy(() => import('@/layouts/Auth.layout'));
const LoginView = lazy(() => import('@/views/Auth/Login.view'));
const RegisterView = lazy(() => import('@/views/Auth/Register.view'));

const authRoutes: RouteConfig[] = [
  createRoute(ARC.root)
    .withComponent(AuthLayout)
    .withChildren([
      createRoute({
        path: ARC.root.path as string,
      })
        .withRedirect(ARC.login.path as string)
        .build(),
      createRoute(ARC.login).withComponent(LoginView).build(),
      createRoute(ARC.register).withComponent(RegisterView).build(),
    ])
    .build(),
];

const tr = transformRoutes(authRoutes);
export default tr;
