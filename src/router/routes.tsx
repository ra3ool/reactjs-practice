import { Navigate } from "react-router";

import Layout from "@views/Layout";
import Home from "@views/Home";
import About from "@views/About";

import AuthLayout from "@views/Auth/AuthLayout";
import Login from "@views/Auth/Login";
import Register from "@views/Auth/Register";

import ComponentsLayout from "@views/Components/ComponentsLayout";
import CustomInput from "@views/Components/CustomInput";
import CustomTable from "@views/Components/CustomTable";

const redirect = (path: string) => <Navigate to={path} replace />

const routes = [
    {
        path: "/",
        Component: Layout,
        children: [
            { index: true, Component: Home },
            { path: "about", Component: About },
            {
                path: "auth",
                Component: AuthLayout,
                children: [
                    { index: true, Component: () =>  redirect('login')},
                    { path: "login", Component: Login },
                    { path: "register", Component: Register },
                ],
            },
            {
                path: "components",
                Component: ComponentsLayout,
                children: [
                    { index: true, Component: () =>  redirect('input')},
                    { path: "input", Component: CustomInput },
                    { path: "table", Component: CustomTable },
                ],
            },
        ],
    },
]

export default routes