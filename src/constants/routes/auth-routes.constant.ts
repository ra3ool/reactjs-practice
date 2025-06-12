import { createRoutesGroup } from "@/helpers"

const authRoutes = Object.freeze({
    root: '/',
    login: 'login',
    register: 'register',
})
export default createRoutesGroup('auth', authRoutes);