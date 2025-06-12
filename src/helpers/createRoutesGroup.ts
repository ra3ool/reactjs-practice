type Routes = Record<string, string>;

const createRoutesGroup = (prefix: string, routes: Routes) => {
    const trimmed = prefix.replace(/^\/+|\/+$/g, "");
    const normalizedPrefix =  `/${trimmed}`;
    const newRoutes = Object.fromEntries(
        Object.entries(routes).map(([key, value]) => [
            key,
            value === "" || value === "/"
                ? normalizedPrefix
                : `${normalizedPrefix}${value.startsWith("/") ? "" : "/"}${value}`,
        ])
    );
    return newRoutes
};

export default createRoutesGroup;