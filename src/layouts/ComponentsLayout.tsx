import SideBar from "@/components/SideBar";
import { componentsRoutes } from "@/constants/routes";
import { SidebarProps } from "@/types/sidebar";
import { Outlet } from "react-router";

const SideBarConfig : SidebarProps = {
    title: "Components",
    items: [
        { title: "input", path: componentsRoutes.input },
        { title: "table", path: componentsRoutes.table },
    ]
}

export default function ComponentsLayout() {
    return (
        <div className="component-layout flex h-full w-full gap-4">
            <SideBar config={SideBarConfig} />
            <div className="grow-1"><Outlet /></div>
        </div>
    );
}