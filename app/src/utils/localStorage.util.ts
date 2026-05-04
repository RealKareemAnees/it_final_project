import type { UserInfo } from "../types/userInfo.interface";

const STORAGE_KEY = "userInfo";

export function getUSerinfoFromLocalStorage(): UserInfo | null {
  const userInfoString = localStorage.getItem(STORAGE_KEY);
  if (!userInfoString) return null;

  try {
    return JSON.parse(userInfoString) as UserInfo;
  } catch (error) {
    console.error("Error parsing user info from localStorage:", error);
    return null;
  }
}

export function saveUserInfoToLocalStorage(userInfo: UserInfo): void {
  try {
    const userInfoString = JSON.stringify(userInfo);
    localStorage.setItem(STORAGE_KEY, userInfoString);
  } catch (error) {
    console.error("Error saving user info to localStorage:", error);
  }
}

export function clearUserInfoFromLocalStorage(keepTheme = true): void {
  if (!keepTheme) {
    localStorage.removeItem(STORAGE_KEY);
    return;
  }

  const current = getUSerinfoFromLocalStorage();
  const theme = current?.theme || "light";
  saveUserInfoToLocalStorage({ theme });
}

export function ensureLocalStorageDefaults(): UserInfo {
  const current = getUSerinfoFromLocalStorage();
  if (current) return current;

  const defaults: UserInfo = { theme: "light" };
  saveUserInfoToLocalStorage(defaults);
  return defaults;
}
