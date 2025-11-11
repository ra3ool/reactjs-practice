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
      headerTitle: 'Authentication page',
      description: 'User authentication pages',
    },
  },
  login: {
    label: 'Login',
    path: 'login',
    name: 'login',
    meta: {
      title: 'Login',
      headerTitle: 'Login page',
      description: 'Sign in to your account',
    },
  },
  register: {
    label: 'Register',
    path: 'register',
    name: 'register',
    meta: {
      title: 'Register',
      headerTitle: 'Register page',
      description: 'Create a new account',
    },
  },
});

export default createRoutesGroup(prefix, authRoutes);
