import SideBar from "@/components/SideBar";
import { authRoutes } from "@/constants/routes";
import { SidebarProps } from "@/types/sidebar";
import { Outlet } from "react-router";

const SideBarConfig : SidebarProps = {
    title: "Auth Forms",
    items: [
        { title: "login", path: authRoutes.login },
        { title: "register", path: authRoutes.register },
    ]
}

export default function AuthLayout() {
    return (
        <div className="auth-layout flex h-full w-full gap-4">
            <SideBar config={SideBarConfig} />
            <div className="grow-1"><Outlet /></div>
        </div>
    );
}