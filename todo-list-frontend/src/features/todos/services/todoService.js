import api, { unwrap } from "@/services/api.js";

export const todoService = {
  list: (params) => api.get("/todos", { params }).then(unwrap),
  stats: () => api.get("/todos/stats").then(unwrap),
  getById: (id) => api.get(`/todos/${id}`).then(unwrap),
  create: (payload) => api.post("/todos", payload).then(unwrap),
  update: (id, payload) => api.put(`/todos/${id}`, payload).then(unwrap),
  updateStatus: (id, completed) => api.patch(`/todos/${id}/status`, { completed }).then(unwrap),
  remove: (id) => api.delete(`/todos/${id}`),
};

export default todoService;
