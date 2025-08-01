import { UserRole } from '@/types';
import { baseRoutes, authRoutes, componentsRoutes, panelRoutes } from '.';
import { flattenRoutes } from '@/helpers';

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
      ...panelRouteNames.filter(
        (name) => !name.includes(panelRoutes.invoices.root.name),
      ),
    ],
    actions: [],
  },
  guest: {
    routes: publicRouteNames,
    actions: [],
  },
};
