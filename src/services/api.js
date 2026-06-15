import axios from "axios";

const api = axios.create({
  baseURL: "https://api.mentholatumarabia.com/",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    if (typeof window !== "undefined") {
      const pathLang = window.location.pathname.split("/")[1];
      const lang =
        pathLang === "ar" || pathLang === "en"
          ? pathLang
          : localStorage.getItem("lang") || "en";
      config.headers["Accept-Language"] = lang;
    } else {
      config.headers["Accept-Language"] = "en";
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
