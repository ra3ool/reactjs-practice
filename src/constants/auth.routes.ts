import createRoutesGroup from "@/helpers/createRoutesGroup"

export default createRoutesGroup('auth', {
    root: '/',
    login: 'login',
    register: 'register',
});