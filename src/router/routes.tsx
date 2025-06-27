import { Navigate } from 'react-router';
import { routes as routesConstants } from '@/constants';

import MainLayout from '@/layouts/Main.layout';
import Home from '@/views/Home.view';
import About from '@/views/About.view';

import AuthLayout from '@/layouts/Auth.layout';
import Login from '@/views/Auth/Login.view';
import Register from '@/views/Auth/Register.view';

import ComponentsLayout from '@/layouts/Components.layout';
import CustomInput from '@/views/Components/Input.view';
import CustomTable from '@/views/Components/Table.view';
import CustomToggle from '@/views/Components/Toggle.view';

const redirect = (to: string) => () => <Navigate to={to} replace />;

const {
  home,
  about,
  auth: { root: authRoot, login, register },
  components: { root: componentsRoot, input, table, toggle },
} = routesConstants;

const routes = [
  {
    path: home,
    Component: MainLayout,
    children: [
      { index: true, Component: Home },
      { path: about, Component: About },
      {
        path: authRoot,
        Component: AuthLayout,
        children: [
          { index: true, Component: redirect(login) },
          { path: login, Component: Login },
          { path: register, Component: Register },
        ],
      },
      {
        path: componentsRoot,
        Component: ComponentsLayout,
        children: [
          { index: true, Component: redirect(input) }, //TODO set loop over this routes
          { path: input, Component: CustomInput },
          { path: table, Component: CustomTable },
          { path: toggle, Component: CustomToggle },
        ],
      },
    ],
  },
];

export default routes;
