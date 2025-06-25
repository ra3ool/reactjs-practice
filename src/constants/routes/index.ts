import authRoutes from "./auth-routes.constant";
import componentsRoutes from "./components-routes.constant";

export { authRoutes }
export { componentsRoutes }

export const routes = Object.freeze({
    home: '/',
    about: 'about',

    //auth
    auth: authRoutes,

    //components
    components: componentsRoutes,
});
