import {
  ensureLocalStorageDefaults,
  getUSerinfoFromLocalStorage,
  saveUserInfoToLocalStorage,
} from "./localStorage.util";

export function setTheme(theme: "light" | "dark"): void {
  const dark = theme === "dark";
  document.documentElement.classList.toggle("darktheme", dark);
  document.body.classList.toggle("darktheme", dark);

  const current = getUSerinfoFromLocalStorage() || ensureLocalStorageDefaults();
  saveUserInfoToLocalStorage({ ...current, theme });
}

export function switchTheme(): "light" | "dark" {
  const isDark = document.documentElement.classList.contains("darktheme");
  const next: "light" | "dark" = isDark ? "light" : "dark";
  setTheme(next);
  return next;
}

export function applyThemeFromLocalStorage(): void {
  const savedTheme = getUSerinfoFromLocalStorage()?.theme || "light";
  setTheme(savedTheme);
}
