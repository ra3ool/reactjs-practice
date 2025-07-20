import { createRoutesGroup } from '@/helpers';
import { RouteGroup } from '@/types';

const prefix = 'auth';
const authRoutes: RouteGroup = Object.freeze({
  root: {
    name: 'Auth',
    path: '/',
    meta: {
      title: 'Authentication',
      description: 'User authentication pages',
      requiresAuth: false,
      layout: 'auth',
    },
  },
  login: {
    name: 'Login',
    path: 'login',
    meta: {
      title: 'Login',
      description: 'Sign in to your account',
      requiresAuth: false,
      layout: 'auth',
      icon: 'login',
    },
  },
  register: {
    name: 'Register',
    path: 'register',
    meta: {
      title: 'Register',
      description: 'Create a new account',
      requiresAuth: false,
      layout: 'auth',
      icon: 'register',
    },
  },
});

export default createRoutesGroup(prefix, authRoutes);
