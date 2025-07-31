import { lazy } from 'react';
import { RouteConfig } from '@/types';
import { createRoute, transformRoutes } from '@/helpers';
import { authRoutes as authRoutesConstants } from '@/constants';

const AuthLayout = lazy(() => import('@/layouts/Auth.layout'));
const LoginView = lazy(() => import('@/views/Auth/Login.view'));
const RegisterView = lazy(() => import('@/views/Auth/Register.view'));

const authRoutes: RouteConfig[] = [
  createRoute(authRoutesConstants.root)
    .withComponent(AuthLayout)
    .withChildren([
      createRoute({
        path: String(authRoutesConstants.root.path),
      })
        .withRedirect(String(authRoutesConstants.login.path))
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
