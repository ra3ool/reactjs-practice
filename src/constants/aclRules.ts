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
      panelRoutes?.index?.name as string,
      panelRoutes?.profile?.name as string, //TODO fine better way to declare
    ],
    actions: [],
  },
  guest: {
    routes: publicRouteNames,
    actions: [],
  },
};
