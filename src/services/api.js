import axios from "axios";

const api = axios.create({
  baseURL: "https://dev-api.mentholatumarabia.com/",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// Add request interceptor to set Accept-Language based on localStorage
api.interceptors.request.use(
  (config) => {
    if (typeof window !== "undefined") {
      const lang = localStorage.getItem("lang") || "en";
      config.headers["Accept-Language"] = lang;
    } else {
      config.headers["Accept-Language"] = "en";
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
