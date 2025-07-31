import { lazy } from 'react';
import { RouteConfig } from '@/types';
import { createRoute, transformRoutes } from '@/helpers';
import { panelRoutes as panelRoutesConstants } from '@/constants';

const PanelLayout = lazy(() => import('@/layouts/Panel.layout'));
const ProfileView = lazy(() => import('@/views/Auth/Login.view'));
const InvoicesView = lazy(() => import('@/views/Auth/Register.view'));

const panelRoutes: RouteConfig[] = [
  createRoute(panelRoutesConstants.root)
    .withComponent(PanelLayout)
    .withChildren([
      createRoute(panelRoutesConstants.profile)
        .withComponent(ProfileView)
        .build(),
      createRoute(panelRoutesConstants.invoices)
        .withComponent(InvoicesView)
        .build(),
    ])
    .build(),
];

const tr = transformRoutes(panelRoutes);
export default tr;
