import { createRoutesGroup } from "@/helpers"

const prefix = 'components'
const componentsRoutes = Object.freeze({
    root: '/',
    input: 'input',
    table: 'table',
})
export default createRoutesGroup(prefix, componentsRoutes)