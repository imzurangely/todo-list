import api, { unwrap } from "@/services/api.js";

export const authService = {
  register: (payload) => api.post("/auth/register", payload).then(unwrap),
  login: (credentials) => api.post("/auth/login", credentials).then(unwrap),
  profile: () => api.get("/auth/me").then(unwrap),
};

export default authService;
