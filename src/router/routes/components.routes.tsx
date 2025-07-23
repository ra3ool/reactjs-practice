import { lazy } from 'react';
import { RouteConfig } from '@/types';
import { createRoute, transformRoutes } from '@/helpers';
import { componentsRoutes as componentsRoutesConstants } from '@/constants';

const ComponentsLayout = lazy(() => import('@/layouts/Components.layout'));
const InputView = lazy(() => import('@/views/Components/Input.view'));
const ButtonView = lazy(() => import('@/views/Components/Button.view'));
const TableView = lazy(() => import('@/views/Components/Table.view'));
const ToggleView = lazy(() => import('@/views/Components/Toggle.view'));
const DropdownView = lazy(() => import('@/views/Components/Dropdown.view'));
const ExpansionPanelView = lazy(
  () => import('@/views/Components/ExpansionPanel.view'),
);

const componentsRoutes: RouteConfig[] = [
  createRoute(componentsRoutesConstants.root)
    .withComponent(ComponentsLayout)
    .withChildren([
      createRoute(componentsRoutesConstants.input)
        .withComponent(InputView)
        .build(),
      createRoute(componentsRoutesConstants.button)
        .withComponent(ButtonView)
        .build(),
      createRoute(componentsRoutesConstants.table)
        .withComponent(TableView)
        .build(),
      createRoute(componentsRoutesConstants.toggle)
        .withComponent(ToggleView)
        .build(),
      createRoute(componentsRoutesConstants.dropdown)
        .withComponent(DropdownView)
        .build(),
      createRoute(componentsRoutesConstants.expansionPanel)
        .withComponent(ExpansionPanelView)
        .build(),
    ])
    .build(),
];

const tr = transformRoutes(componentsRoutes);
export default tr;
