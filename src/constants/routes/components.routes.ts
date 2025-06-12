import createRoutesGroup from "@/helpers/createRoutesGroup"

const componentsRoutes = Object.freeze({
    root: '/',
    input: 'input',
    table: 'table',
})
export default createRoutesGroup('components', componentsRoutes)