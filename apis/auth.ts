import { apiConfig } from "@/data/api";
import { CookieValueTypes } from "cookies-next";
const auth = {
  async login(username: string, password: string) {
    const res = await fetch(`${apiConfig.authorization.login}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: username,
        password: password,
        // expiresInMins: 30, // optional, defaults to 60
      }),
      credentials: "include", // Include cookies (e.g., accessToken) in the request
    });
    return res;
  },

  async getAuthUser(token: CookieValueTypes | Promise<CookieValueTypes>) {
    const res = await fetch(`${apiConfig.authorization.currentUser}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`, // Pass JWT via Authorization header
      },
      // credentials: "include", // Include cookies (e.g., accessToken) in the request
    });
    return res;
  },
};

export default auth;
