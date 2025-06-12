import { Navigate } from "react-router";
import routesConstants from '@/constants/routes';

import MainLayout from "@/layouts/MainLayout";
import Home from "@views/Home";
import About from "@views/About";

import AuthLayout from "@/layouts/AuthLayout";
import Login from "@views/Auth/Login";
import Register from "@views/Auth/Register";

import ComponentsLayout from "@/layouts/ComponentsLayout";
import CustomInput from "@views/Components/CustomInput";
import CustomTable from "@views/Components/CustomTable";

const redirect = (to: string) => () => <Navigate to={to} replace />;

const {
  home,
  about,
  auth: { root: authRoot, login, register },
  components: { root: componentsRoot, input, table },
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
          { index: true, Component: redirect(input) },
          { path: input, Component: CustomInput },
          { path: table, Component: CustomTable },
        ],
      },
    ],
  },
];

export default routes;
