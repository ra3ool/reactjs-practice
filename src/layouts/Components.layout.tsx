import { Outlet } from "react-router";
import { Sidebar } from "@/components";
import { componentsRoutes } from "@/constants";
import { SidebarProps } from "@/types";

const SideBarConfig : SidebarProps = {
    title: "Components",
    items: [
        { title: "input", path: componentsRoutes.input },
        { title: "table", path: componentsRoutes.table },
        { title: "toggle", path: componentsRoutes.toggle },
    ]
}

export default function ComponentsLayout() {
    return (
        <div className="component-layout flex h-full w-full gap-4">
            <Sidebar config={SideBarConfig} />
            <div className="grow-1 overflow-auto"><Outlet /></div>
        </div>
    );
}