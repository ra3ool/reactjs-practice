import { flattenRoutes } from '@/helpers';
import { UserRole } from '@/types';
import { authRoutes, baseRoutes, componentsRoutes, panelRoutes } from '.';

type AclRuleType = Record<UserRole, { routes: string[]; actions: string[] }>;

const publicRouteNames = [
  ...Object.keys(flattenRoutes(baseRoutes, 'name')),
  ...Object.keys(flattenRoutes(authRoutes, 'name')),
];
const componentsRouteNames = Object.keys(
  flattenRoutes(componentsRoutes, 'name'),
);
const panelRouteNames = Object.keys(flattenRoutes(panelRoutes, 'name'));

export const defineAclRules: AclRuleType = {
  admin: {
    routes: [...publicRouteNames, ...componentsRouteNames, ...panelRouteNames],
    actions: [], //TODO implement actions
  },
  user: {
    routes: [
      ...publicRouteNames,
      ...componentsRouteNames,
      'panel',
      'panel.profile', //TODO do better f.e use filter on constants
    ],
    actions: [],
  },
  guest: {
    routes: publicRouteNames,
    actions: [],
  },
};
