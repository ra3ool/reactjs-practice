import { Outlet } from "react-router";

export default function ComponentsLayout() {
    return (
        <div className="component-layout">
            <Outlet />
        </div>
    );
}