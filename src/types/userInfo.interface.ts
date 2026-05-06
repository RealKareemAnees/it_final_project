export type UserRole = "user" | "admin";

export interface UserInfo {
  username?: string;
  wishList?: string[];
  theme: "light" | "dark";
  role?: UserRole;
}
