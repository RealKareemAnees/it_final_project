import {
  ensureLocalStorageDefaults,
  getUSerinfoFromLocalStorage,
  saveUserInfoToLocalStorage,
} from "./localStorage.util";

export function setTheme(theme: "light" | "dark"): void {
  const root = document.body;
  root.classList.toggle("darktheme", theme === "dark");

  const current = getUSerinfoFromLocalStorage() || ensureLocalStorageDefaults();
  saveUserInfoToLocalStorage({ ...current, theme });
}

export function switchTheme(): "light" | "dark" {
  const next = document.body.classList.contains("darktheme") ? "light" : "dark";
  setTheme(next);
  return next;
}

export function applyThemeFromLocalStorage(): void {
  const savedTheme = getUSerinfoFromLocalStorage()?.theme || "light";
  setTheme(savedTheme);
}
