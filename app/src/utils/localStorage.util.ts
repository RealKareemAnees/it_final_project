import type { UserInfo } from "../../types/userInfo.interface";

export function getUSerinfoFromLocalStorage(): UserInfo | null {
  const userInfoString = localStorage.getItem("userInfo");
  if (userInfoString) {
    try {
      return JSON.parse(userInfoString) as UserInfo;
    } catch (error) {
      console.error("Error parsing user info from localStorage:", error);
      return null;
    }
  }
  return null;
}

export function saveUserInfoToLocalStorage(userInfo: UserInfo): void {
  try {
    const userInfoString = JSON.stringify(userInfo);
    localStorage.setItem("userInfo", userInfoString);
  } catch (error) {
    console.error("Error saving user info to localStorage:", error);
  }
}

export function clearUserInfoFromLocalStorage(): void {
  localStorage.removeItem("userInfo");
}
