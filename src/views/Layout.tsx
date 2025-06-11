import { Outlet, NavLink } from "react-router";
import routes from '@/constants/routes'

export default function Layout() {
    return (
        <main className="h-full flex align-">
            <aside className="h-full w-56 bg-gray-900 text-white flex flex-col gap-4 p-6 shrink-0">
                <h2 className="text-xl font-bold text-blue-400 mb-4">Sidebar</h2>
                <nav className="flex flex-col gap-2">
                    <NavLink to={routes.home} className={({ isActive }) =>
                        `hover:text-blue-300 transition-colors ${isActive && "text-red-500"}`
                    }>Home</NavLink>

                    <NavLink to={routes.about} className={({ isActive }) =>
                        `hover:text-blue-300 transition-colors ${isActive && "text-red-500"}`
                    }>About</NavLink>

                    <NavLink to={routes.auth.root} className={({ isActive }) =>
                        `hover:text-blue-300 transition-colors ${isActive && "text-red-500"}`
                    }>Auth</NavLink>

                    <NavLink to={routes.components.root} className={({ isActive }) =>
                        `hover:text-blue-300 transition-colors ${isActive && "text-red-500"}`
                    }>components</NavLink>
                </nav>
            </aside>
            <div className="grow-1 p-6"><Outlet /></div>
        </main>
    );
}