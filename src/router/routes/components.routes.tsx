import { componentsRoutes as CRC } from '@/constants';
import { createRoute, transformRoutes } from '@/helpers';
import { RouteConfig } from '@/types';
import { lazy } from 'react';

const ComponentsLayout = lazy(() => import('@/layouts/Components.layout'));
const IndexView = lazy(() => import('@/views/Components/Index.view'));
const InputView = lazy(() => import('@/views/Components/Input.view'));
const ButtonView = lazy(() => import('@/views/Components/Button.view'));
const TableView = lazy(() => import('@/views/Components/Table.view'));
const ToggleView = lazy(() => import('@/views/Components/Toggle.view'));
const DropdownView = lazy(() => import('@/views/Components/Dropdown.view'));
const ExpansionPanelView = lazy(
  () => import('@/views/Components/ExpansionPanel.view'),
);

const componentsRoutes: RouteConfig[] = [
  createRoute(CRC.root)
    .withComponent(ComponentsLayout)
    .withChildren([
      createRoute(CRC.index).withComponent(IndexView).build(),
      createRoute(CRC.input).withComponent(InputView).build(),
      createRoute(CRC.button).withComponent(ButtonView).build(),
      createRoute(CRC.table).withComponent(TableView).build(),
      createRoute(CRC.toggle).withComponent(ToggleView).build(),
      createRoute(CRC.dropdown).withComponent(DropdownView).build(),
      createRoute(CRC.expansionPanel).withComponent(ExpansionPanelView).build(),
    ])
    .build(),
];

const tr = transformRoutes(componentsRoutes);
export default tr;
