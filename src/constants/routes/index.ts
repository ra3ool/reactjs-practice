import authRoutes from "./auth-routes.constant";
import componentsRoutes from "./components-routes.constant";

export { authRoutes }
export { componentsRoutes }

const routes = Object.freeze({
    home: '/',
    about: 'about',

    //auth
    auth: authRoutes,

    //components
    components: componentsRoutes,
});

export default routes;