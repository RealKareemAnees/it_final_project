// Router utility functions

export interface RouteState {
  currentRoute: string;
  params?: Record<string, string>;
}

/**
 * Parse the current route from window.location.pathname
 */
export function getCurrentRoute(): RouteState {
  const path = window.location.pathname || "it_final_project";
  const segments = path.split("/").filter(Boolean).slice(1); // Remove leading empty segment

  // Default to home if root
  if (
    path === "/it_final_project" ||
    path === "/" ||
    segments.length === 0 ||
    path === "it_final_project" ||
    segments.length === 1
  ) {
    return { currentRoute: "home" };
  }

  const route = segments[0];
  const state: RouteState = {
    currentRoute: route,
    params: {},
  };

  // Extract params based on route
  if (route === "cars" && segments[1]) {
    state.currentRoute = "single-car";
    state.params = { id: segments[1] };
  }

  return state;
}

/**
 * Navigate to a new path and update the route
 */
export function navigate(path: string): void {
  window.history.pushState({}, "", path);
  window.dispatchEvent(new Event("popstate"));
}
