import { createRoutesGroup } from "@/helpers"

const prefix = 'components'
const componentsRoutes = Object.freeze({
    root: '/',
    input: 'input',
    table: 'table',
    toggle: 'toggle',
    dropdown: 'dropdown',
    expantionPanel: 'expantion-panel',
})
export default createRoutesGroup(prefix, componentsRoutes)