
export default function removeSideBar(location, routes) {
    const restrictedPaths = [
        "/login",
        "/forgot-pass",
        "/reset-pass",
        "/"];
  
    return routes.some(
      route =>
        route.path === location.pathname &&
        !restrictedPaths.includes(route.path)
    );
  }
  