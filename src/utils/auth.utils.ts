import type { UserInfo } from "../types/userInfo.interface";
import { apiFetch } from "./api.utils";
import {
  clearUserInfoFromLocalStorage,
  ensureLocalStorageDefaults,
  getUSerinfoFromLocalStorage,
  saveUserInfoToLocalStorage,
} from "./localStorage.util";
import { setTheme } from "./theme.utils";

const AUTH_EVENT = "auth-change";

function notifyAuthChange(user: UserInfo | null): void {
  window.dispatchEvent(new CustomEvent(AUTH_EVENT, { detail: user }));
}

export function getStoredUser(): UserInfo | null {
  return getUSerinfoFromLocalStorage();
}

export function onAuthChange(
  handler: (user: UserInfo | null) => void,
): () => void {
  const listener = (event: Event) => {
    const detail = (event as CustomEvent<UserInfo | null>).detail || null;
    handler(detail);
  };
  window.addEventListener(AUTH_EVENT, listener);
  return () => window.removeEventListener(AUTH_EVENT, listener);
}

function syncUser(user: UserInfo | null): void {
  if (user) {
    saveUserInfoToLocalStorage(user);
  } else {
    clearUserInfoFromLocalStorage(true);
  }
  notifyAuthChange(user);
}

export async function fetchCurrentUser(): Promise<UserInfo | null> {
  try {
    const data = await apiFetch<{ user: UserInfo }>("/api/users/me");
    const user = data.user;
    saveUserInfoToLocalStorage(user);
    setTheme(user.theme || "light");
    notifyAuthChange(user);
    return user;
  } catch (error) {
    const fallback =
      getUSerinfoFromLocalStorage() || ensureLocalStorageDefaults();
    setTheme(fallback.theme || "light");
    notifyAuthChange(null);
    return null;
  }
}

export async function loginUser(
  username: string,
  password: string,
): Promise<UserInfo> {
  const data = await apiFetch<{ user: UserInfo }>("/api/auth/login", {
    method: "POST",
    body: JSON.stringify({ username, password }),
  });
  syncUser(data.user);
  setTheme(data.user.theme || "light");
  return data.user;
}

export async function registerUser(
  username: string,
  password: string,
): Promise<UserInfo> {
  const data = await apiFetch<{ user: UserInfo }>("/api/auth/register", {
    method: "POST",
    body: JSON.stringify({ username, password }),
  });
  syncUser(data.user);
  setTheme(data.user.theme || "light");
  return data.user;
}

export async function logoutUser(): Promise<void> {
  await apiFetch<{ success: boolean }>("/api/auth/logout", {
    method: "POST",
  });
  syncUser(null);
}

export async function updateThemePreference(
  theme: "light" | "dark",
): Promise<UserInfo | null> {
  try {
    const data = await apiFetch<{ user: UserInfo }>("/api/users/update", {
      method: "POST",
      body: JSON.stringify({ theme }),
    });
    syncUser(data.user);
    return data.user;
  } catch {
    return null;
  }
}

export async function addToWishlist(carId: number): Promise<string[]> {
  const data = await apiFetch<{ wishList: string[] }>(
    "/api/users/wishlist/add",
    {
      method: "POST",
      body: JSON.stringify({ carId: String(carId) }),
    },
  );

  const current = getUSerinfoFromLocalStorage();
  if (current) {
    saveUserInfoToLocalStorage({ ...current, wishList: data.wishList });
    notifyAuthChange({ ...current, wishList: data.wishList });
  }

  return data.wishList;
}

export async function removeFromWishlist(carId: number): Promise<string[]> {
  const data = await apiFetch<{ wishList: string[] }>(
    "/api/users/wishlist/remove",
    {
      method: "POST",
      body: JSON.stringify({ carId: String(carId) }),
    },
  );

  const current = getUSerinfoFromLocalStorage();
  if (current) {
    saveUserInfoToLocalStorage({ ...current, wishList: data.wishList });
    notifyAuthChange({ ...current, wishList: data.wishList });
  }

  return data.wishList;
}

export function isWishlisted(carId: number): boolean {
  const user = getStoredUser();
  if (!user || !user.wishList) return false;
  return user.wishList.includes(String(carId));
}
