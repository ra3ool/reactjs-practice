import { authRoutes as authRoutesConstants } from '@/constants';
import { createRoute, transformRoutes } from '@/helpers';
import { RouteConfig } from '@/types';
import { lazy } from 'react';

const AuthLayout = lazy(() => import('@/layouts/Auth.layout'));
const LoginView = lazy(() => import('@/views/Auth/Login.view'));
const RegisterView = lazy(() => import('@/views/Auth/Register.view'));

const authRoutes: RouteConfig[] = [
  createRoute(authRoutesConstants.root)
    .withComponent(AuthLayout)
    .withChildren([
      createRoute({
        path: authRoutesConstants.root.path as string,
      })
        .withRedirect(authRoutesConstants.login.path as string)
        .build(),
      createRoute(authRoutesConstants.login).withComponent(LoginView).build(),
      createRoute(authRoutesConstants.register)
        .withComponent(RegisterView)
        .build(),
    ])
    .build(),
];

const tr = transformRoutes(authRoutes);
export default tr;
