type Routes = Record<string, string>;

const createRoutesGroup = (prefix: string, routes: Routes) => {
    const normalizedPrefix = prefix.replaceAll('/', '')
    const newRoutes = Object.fromEntries(
        Object.entries(routes).map(([key, value]) => [
            key,
            value === "" || value === "/"
                ? normalizedPrefix
                : `${normalizedPrefix}${value.startsWith("/") ? "" : "/"}${value}`,
        ])
    );
    console.log('newRoutes :', newRoutes);
    return newRoutes
};

export default createRoutesGroup;