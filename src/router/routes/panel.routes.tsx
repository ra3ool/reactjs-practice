import { panelRoutes as PRC } from '@/constants';
import { createRoute, transformRoutes } from '@/helpers';
import { RouteConfig } from '@/types';
import { lazy } from 'react';

const PanelLayout = lazy(() => import('@/layouts/Panel.layout'));
const PanelIndex = lazy(() => import('@/views/Panel/Index.view'));
const ProfileView = lazy(() => import('@/views/Panel/Profile.view'));
// const InvoicesView = lazy(() => import('@/views/Panel/Invoices/Index.view'));

const panelRoutes: RouteConfig[] = [
  createRoute(PRC.root)
    .withComponent(PanelLayout)
    .withChildren([
      createRoute(PRC.index).withComponent(PanelIndex).build(),
      createRoute(PRC.profile).withComponent(ProfileView).build(),
      // createRoute(PRC.invoices).withComponent(InvoicesView).build(),
    ])
    .build(),
];

const tr = transformRoutes(panelRoutes);
export default tr;
