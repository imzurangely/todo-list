import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL;
const TOKEN_KEY = "todo_list_token";

export const tokenStorage = {
  get: () => localStorage.getItem(TOKEN_KEY),
  set: (token) => localStorage.setItem(TOKEN_KEY, token),
  clear: () => localStorage.removeItem(TOKEN_KEY),
};

const api = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
  timeout: 15000,
});

api.interceptors.request.use((config) => {
  const token = tokenStorage.get();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

/** Traduce cualquier fallo de red o de la API a un mensaje amigable. */
const friendlyMessage = (error) => {
  if (error.code === "ECONNABORTED") {
    return "La solicitud tardó demasiado. Intenta de nuevo.";
  }
  if (!error.response) {
    return "No pudimos conectar con el servidor. Revisa tu conexión e intenta de nuevo.";
  }

  const { status, data } = error.response;
  if (data && typeof data.message === "string" && data.message.trim()) return data.message;

  const byStatus = {
    400: "Revisa los datos ingresados e intenta de nuevo.",
    401: "Tu sesión ha expirado. Inicia sesión nuevamente.",
    403: "No tienes permiso para realizar esta acción.",
    404: "No encontramos la información solicitada.",
    409: "Ese registro ya existe.",
    500: "Ocurrió un problema en el servidor. Intenta mas tarde.",
  };
  return byStatus[status] || "Algo no salió como esperábamos. Intenta de nuevo.";
};

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const normalized = new Error(friendlyMessage(error));
    normalized.status = error.response?.status ?? null;
    normalized.fieldErrors = error.response?.data?.errors ?? null;

    if (normalized.status === 401 && !error.config?.url?.includes("/auth/")) {
      tokenStorage.clear();
      window.dispatchEvent(new Event("auth:unauthorized"));
    }
    return Promise.reject(normalized);
  },
);

/** Desempaqueta la respuesta { success, data, message } de la API. */
export const unwrap = (response) => response?.data?.data ?? null;

export default api;
