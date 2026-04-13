import axios from "axios";

const baseURL =
  import.meta.env.VITE_API_URL?.replace(/\/$/, "") || "/api";

export const api = axios.create({
  baseURL,
  headers: { "Content-Type": "application/json" },
  timeout: 120000,
});

api.interceptors.request.use((config) => {
  const token = (localStorage.getItem("token") || "").trim();
  console.log("[api] request", config.method?.toUpperCase(), config.url, {
    token,
  });
  if (token) {
    // Backend expects the raw session token in Authorization (not Bearer).
    config.headers.Authorization = token;
  }
  return config;
});

api.interceptors.response.use(
  (response) => {
    console.log("[api] response", response.config?.url, response.status, response.data);
    return response;
  },
  (error) => {
    console.error("[api] error", error.response?.status, error.response?.data || error.message);
    return Promise.reject(error);
  },
);
