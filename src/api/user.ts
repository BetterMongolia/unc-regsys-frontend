import client from "~/lib/client";
import clientLogin from "~/lib/clientLogin";

const apiUser = {
  register: (email: any, password: any) =>
    client
      .post(`/auth/signup`, { email, password })
      .then((res) => {
        if (res && res.data?.status === "error") {
          return { success: true, message: res.data?.message, data: null };
        }
        return {
          success: true,
          data: res?.data?.data,
          message: res?.data?.message,
        };
      })
      .catch((e) => {
        console.log(e);

        return {
          success: false,
          message: e.response.data?.message,
          data: null,
        };
      }),

  login: async (email: any, password: any) => {
    try {
      const res = await client.post(`/auth/signin`, { email, password });
      if (res.data?.status === "error") {
        return { success: false, e: res.data?.message };
      }
      return {
        success: true,
        data: res?.data?.data,
      };
    } catch (e) {
      console.log("error: ", e);
      return { success: false, e };
    }
  },
  me: async () => {
    try {
      const res = await client.get(`/users/me`);
      if (res.data?.status === "error") {
        return { success: false, e: res.data?.message };
      }
      return {
        success: true,
        data: res?.data?.data,
      };
    } catch (e) {
      console.log("error: ", e);
      return { success: false, e };
    }
  },
  updateInfo: async (body: any) => {
    try {
      const res = await client.patch(`/users/me`, body);
      if (res.data?.status === "error") {
        return { success: false, e: res.data?.message };
      }
      return {
        success: true,
        data: res?.data?.data,
      };
    } catch (e) {
      console.log("error: ", e);
      return { success: false, e };
    }
  },
  forgot: async (email: any) => {
    try {
      const res = await client.post(`/auth/forgot-password`, { email });
      if (res.data?.status === "error") {
        return { success: false, e: res.data?.message };
      }
      return {
        success: true,
        data: res?.data?.data,
      };
    } catch (e) {
      console.log("error: ", e);
      return { success: false, e };
    }
  },
  recovery: async (token: any, password: any) => {
    try {
      const res = await client.post(`/auth/set-password`, { token, password });
      if (res.data?.status === "error") {
        return { success: false, e: res.data?.message };
      }
      return {
        success: true,
        data: res?.data?.data,
      };
    } catch (e) {
      console.log("error: ", e);
      return { success: false, e };
    }
  },
  changePassword: async (oldPassword: any, newPassword: any) => {
    try {
      const res = await client.patch(`/users/me/password`, {
        oldPassword,
        newPassword,
      });
      if (res.data?.status === "error") {
        return { success: false, e: res.data?.message };
      }
      return {
        success: true,
        data: res?.data?.data,
      };
    } catch (e) {
      console.log("error: ", e);
      return { success: false, e };
    }
  },
};

export default apiUser;
