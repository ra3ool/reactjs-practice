import { defineAclRules } from '@/constants';
import { useAuthStore } from '@/stores';

export const useAcl = () => {
  const { user } = useAuthStore();
  const userRole = user && user.role ? user.role : 'guest';
  const rules = defineAclRules[userRole];

  const canAccessRoute = (routeName?: string) => {
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
