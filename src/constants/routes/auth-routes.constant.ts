import { createRoutesGroup } from "@/helpers"

const prefix = 'auth'
const authRoutes = Object.freeze({
    root: '/',
    login: 'login',
    register: 'register',
})
export default createRoutesGroup(prefix, authRoutes);