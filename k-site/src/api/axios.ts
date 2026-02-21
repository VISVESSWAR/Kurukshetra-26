import axios, {  InternalAxiosRequestConfig } from "axios";
import Cookies from "js-cookie";

const api = axios.create({
  baseURL: "https://api.kurukshetraceg.org.in/api/v1",
  withCredentials: true,
});

// Request interceptor
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = Cookies.get("token");

    if (token) {
      config.headers = config.headers ?? {};
      config.headers.Authorization = token;
      // If backend expects Bearer token, use:
      // config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error: unknown) => {
    return Promise.reject(error);
  }
);

export default api;