import { Outlet } from "react-router";
import { Sidebar } from "@/components";
import { authRoutes } from "@/constants";
import { SidebarProps } from "@/types";

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
            <Sidebar config={SideBarConfig} />
            <div className="grow-1 overflow-auto"><Outlet /></div>
        </div>
    );
}