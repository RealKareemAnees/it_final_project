export interface UserInfo {
  username: string;
  email: string;
  wishlist: string[];
  theme: "light" | "dark";
}

export interface UserInfoWithPassword extends UserInfo {
  password: string;
}
