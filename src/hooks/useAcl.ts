import { defineAclRules, userRoles } from '@/constants';
import { useAuthStore } from '@/stores';

export const useAcl = () => {
  const user = useAuthStore((s) => s.user);
  const userRole = user && user.role ? user.role : userRoles.guest;
  const rules = defineAclRules[userRole];

  const canAccessRoute = (routeName?: string): boolean => {
    if (!routeName) return false;
    return rules.routes.includes(routeName);
  };

  const canPerformAction = (actionName: string): boolean => {
    return rules.actions.includes(actionName);
  };

  return {
    canAccessRoute,
    canPerformAction,
  };
};
