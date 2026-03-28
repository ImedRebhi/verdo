const trimTrailingSlash = (value) => String(value || "").replace(/\/+$/, "");

const fallbackBaseUrl = import.meta.env.DEV
  ? "http://localhost:5000/api"
  : "https://verdo-back.vercel.app/api";

export const API_BASE_URL = trimTrailingSlash(
  import.meta.env.VITE_API_URL || fallbackBaseUrl
);

export const AUTH_API_URL = `${API_BASE_URL}/auth`;
export const GEOAI_API_URL = `${API_BASE_URL}/geoai`;
