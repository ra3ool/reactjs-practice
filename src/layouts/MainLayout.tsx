import { Outlet } from "react-router";
import SideBar from "@/components/SideBar";
import routes from '@/constants/routes'
import { SidebarProps } from "@/types/sidebar";

const SideBarConfig: SidebarProps = {
    title: "React Practice",
    items: [
        { title: "Home", path: routes.home },
        { title: "About", path: routes.about },
        { title: "Auth", path: routes.auth.root },
        { title: "Components", path: routes.components.root },
    ]
}

export default function Layout() {
    return (
        <main className="mail-layout h-full flex p-6 gap-6">
            <SideBar config={SideBarConfig} />
            <div className="grow-1"><Outlet /></div>
        </main>
    );
}