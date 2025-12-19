import axios from "axios";
import store from "~/utils/store";

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API,
});

instance.interceptors.request.use(
  async (config: any) => {
    const token = store.get("token");
    config.headers.Authorization = token && `Bearer ${token}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;
