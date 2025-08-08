import {
  Breadcrumb,
  CustomButton,
  CustomDropdown,
  DropdownItem,
  Header,
  LayoutContent,
} from '@/components';
import { panelRoutes } from '@/constants';
import { useAcl, useRouteNavigation } from '@/hooks';
import { RouteGroup } from '@/types';
import { Outlet } from 'react-router';

export default function PanelLayout() {
  const { navigateTo } = useRouteNavigation();
  const { canAccessRoute } = useAcl();
  return (
    <LayoutContent
      headerComponent={
        <Header
          title="panel header"
          action={
            <CustomDropdown
              align="right"
              trigger={<CustomButton variant="outline">options</CustomButton>}
            >
              <DropdownItem
                onClick={() =>
                  navigateTo(panelRoutes.root.path as string, { by: 'path' })
                }
                className="cursor-pointer"
              >
                panel
              </DropdownItem>
              <DropdownItem
                onClick={() => navigateTo(panelRoutes.profile.name as string)}
                className="cursor-pointer"
              >
                profile
              </DropdownItem>
              {canAccessRoute(
                (panelRoutes.invoices as RouteGroup)?.all?.name as string,
              ) && (
                <DropdownItem
                  onClick={() =>
                    navigateTo(
                      (panelRoutes.invoices as RouteGroup)?.all?.name as string,
                    )
                  }
                  className="cursor-pointer"
                >
                  invoices
                </DropdownItem>
              )}
            </CustomDropdown>
          }
        />
      }
    >
      <div className="grow-1 px-1 flex flex-col gap-6">
        <Breadcrumb />
        <Outlet />
      </div>
    </LayoutContent>
  );
}
