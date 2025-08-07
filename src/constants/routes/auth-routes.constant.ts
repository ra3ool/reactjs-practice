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
    },
  },
  login: {
    label: 'Login',
    path: 'login',
    name: 'auth.login',
    meta: {
      title: 'Login',
      description: 'Sign in to your account',
    },
  },
  register: {
    label: 'Register',
    path: 'register',
    name: 'auth.register',
    meta: {
      title: 'Register',
      description: 'Create a new account',
    },
  },
});

export default createRoutesGroup(prefix, authRoutes);
