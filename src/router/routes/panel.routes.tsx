import { panelRoutes as PRC } from '@/constants';
import { createRoute, transformRoutes } from '@/helpers';
import { RouteConfig, RouteGroup } from '@/types';
import { lazy } from 'react';

const PanelIndex = lazy(() => import('@/views/Panel/Index.view'));
const ProfileView = lazy(() => import('@/views/Panel/Profile.view'));
const InvoicesView = lazy(
  () => import('@/views/Panel/Invoices/AllInvoices.view'),
);
const GetInvoice = lazy(() => import('@/views/Panel/Invoices/GetInvoice.view'));
const AddInvoice = lazy(() => import('@/views/Panel/Invoices/AddInvoice.view'));
const EditInvoice = lazy(
  () => import('@/views/Panel/Invoices/EditInvoice.view'),
);

const panelRoutes: RouteConfig[] = [
  createRoute(PRC.root)
    .withChildren([
      createRoute(PRC.index).withComponent(PanelIndex).asIndex().build(),
      createRoute(PRC.profile).withComponent(ProfileView).build(),
      createRoute()
        .withChildren([
          createRoute((PRC.invoices as RouteGroup)?.all)
            .withComponent(InvoicesView)
            .build(),
          createRoute((PRC.invoices as RouteGroup)?.get)
            .withComponent(GetInvoice)
            .build(),
          createRoute((PRC.invoices as RouteGroup)?.add)
            .withComponent(AddInvoice)
            .build(),
          createRoute((PRC.invoices as RouteGroup)?.edit)
            .withComponent(EditInvoice)
            .build(),
        ])
        .build(),
    ])
    .build(),
];

const tr = transformRoutes(panelRoutes);
export default tr;
