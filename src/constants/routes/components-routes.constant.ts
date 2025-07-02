import { createRoutesGroup } from "@/helpers"

const prefix = 'components'
const componentsRoutes = Object.freeze({
    root: '/',
    input: 'input',
    button: 'button',
    table: 'table',
    toggle: 'toggle',
    dropdown: 'dropdown',
    expansionPanel: 'expansion-panel',
})
export default createRoutesGroup(prefix, componentsRoutes)