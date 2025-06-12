import authRoutes from "./auth.routes";
import componentsRoutes from "./components.routes";

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