// auth-provider.server.ts
import type { AuthProvider } from "@refinedev/core";
import { cookies } from "next/headers";

export const authProviderServer: Pick<AuthProvider, "check"> = {
  check: async () => {
    const cookieStore = cookies(); // đọc cookie trên server
    const token = (await cookieStore).get("token");

    if (token) {
      return { authenticated: true };
    }

    return {
      authenticated: false,
      redirectTo: "/login",
    };
  },
};
