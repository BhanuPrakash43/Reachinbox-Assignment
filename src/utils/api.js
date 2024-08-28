import axios from "axios";

const API_BASE_URL = "https://hiring.reachinbox.xyz/api/v1";

const api = axios.create({
  baseURL: API_BASE_URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const googleLogin = (redirectTo) => {
  window.location.href = `${API_BASE_URL}/auth/google-login?redirect_to=${encodeURIComponent(
    redirectTo
  )}`;
};

export default api;
