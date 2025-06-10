import Home from "@views/Home.tsx";
import About from "@views/About.tsx";

import AuthLayout from "@views/Auth/AuthLayout.tsx";
import Login from "@views/Auth/Login.tsx";
import Register from "@views/Auth/Register.tsx";

import ComponentsLayout from "@views/Components/ComponentsLayout.tsx";
import CustomInput from "@views/Components/CustomInput.tsx";
import CustomTable from "@views/Components/CustomTable.tsx";

const routes = [
    {
        path: "/",
        children: [
            { index: true, Component: Home },
            { path: "about", Component: About },
            {
                path: "auth",
                Component: AuthLayout,
                children: [
                    { path: "login", Component: Login },
                    { path: "register", Component: Register },
                ],
            },
            {
                path: "components",
                Component: ComponentsLayout,
                children: [
                    { index: true, Component: CustomInput },
                    { path: "input", Component: CustomInput },
                    { path: "table", Component: CustomTable },
                ],
            },
        ],
    },
]

export default routes