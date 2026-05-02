import {
  getUSerinfoFromLocalStorage,
  saveUserInfoToLocalStorage,
} from "./localStorage.util";

export function switchTheme(): void {
  const root = document.body;

  if (root.classList.contains("darktheme")) {
    root.classList.remove("darktheme");
    saveUserInfoToLocalStorage({
      ...getUSerinfoFromLocalStorage(),
      theme: "light",
    } as any);
  } else {
    root.classList.add("darktheme");
    saveUserInfoToLocalStorage({
      ...getUSerinfoFromLocalStorage(),
      theme: "dark",
    } as any);
  }
}

export function applyThemeFromLocalStorage(): void {
  const savedTheme = getUSerinfoFromLocalStorage()?.theme;
  if (savedTheme && savedTheme === "dark") {
    document.body.classList.add("darktheme");
  }
}
