"use client";

import { Refine, AuthProvider } from "@refinedev/core";
import Cookies from "js-cookie";


export const authProviderClient : AuthProvider = {
  // login: async ({ phone, password }: { phone: string; password: string }) => {
  //   try {
  //     const response = await fetch("http://192.168.1.12:3000/auth/login", 
  //       {
  //         method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({ phone, password }),
  //     });

  //     if (response.ok) {
  //       const data = await response.json();
  //       Cookies.set("token", data.token,{ expires: 0.0200 });
  //       Cookies.set("user", JSON.stringify(data.user), { expires: 0.0200 });

  //       return {
  //         success: true,
  //         redirectTo: "/dashboard",
  //       };
  //     }

  //     return {
  //       success: false,
  //       error: {
  //         message: "Đăng nhập thất bại",
  //         name: "Sai số điện thoại hoặc mật khẩu",
  //       },
  //     };
  //   } catch (error: any) {
  //     return {
  //       success: false,
  //       error: {
  //         message: error.message,
  //         name: "Lỗi hệ thống",
  //       },
  //     };
  //   }
  // },
  
login: async ({ phone, password }) => {
  if (phone === "0358355555" && password === "Admin@123") {
    const fakeUser = { id: 1, name: "Admin", phone };

    Cookies.set("token", "fake-token-123", { expires: 0.0200 }); 
    Cookies.set("user", JSON.stringify(fakeUser), { expires: 0.0200 });

    return {
      success: true,
      redirectTo: "/dashboard",
    };
  }

  return {
    success: false,
    error: {
      message: "Đăng nhập thất bại",
      name: "Sai số điện thoại hoặc mật khẩu",
    },
  };
},


  logout: async () => {
    Cookies.remove("token");
    Cookies.remove("user");
    return {
      success: true,
      redirectTo: "/login",
    };
  },

  check: async () => {
    const token = Cookies.get("token");

    if (token) {
      return { authenticated: true };
    }

    return {
      authenticated: false,
      redirectTo: "/login",
    };
  },

  getIdentity: async () => {
    const user = Cookies.get("user");
    if (user) {
      return JSON.parse(user);
    }
    return null;
  },

  getPermissions: async () => {
    const user = Cookies.get("user");
    if (user) {
      const parsed = JSON.parse(user);
      return parsed.roles || [];
    }
    return null;
  },

  onError: async (error) => {
    if (error?.status === 401) {
      return {
        logout: true,
        redirectTo: "/login",
      };
    }
    return { error };
  },

};
