import { createRoutesGroup } from '@/helpers';
import { RouteGroup } from '@/types';

const prefix = 'auth';
const authRoutes: RouteGroup = Object.freeze({
  root: {
    label: 'Auth',
    path: '/',
    name: 'auth',
    meta: {
      title: 'Authentication',
      description: 'User authentication pages',
      requiresAuth: false,
    },
  },
  login: {
    label: 'Login',
    path: 'login',
    name: 'auth.login',
    meta: {
      title: 'Login',
      description: 'Sign in to your account',
      requiresAuth: false,
    },
  },
  register: {
    label: 'Register',
    path: 'register',
    name: 'auth.register',
    meta: {
      title: 'Register',
      description: 'Create a new account',
      requiresAuth: false,
    },
  },
});

export default createRoutesGroup(prefix, authRoutes);
